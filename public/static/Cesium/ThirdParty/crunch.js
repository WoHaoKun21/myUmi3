if ('undefined' != typeof WebAssembly) {
  var key,
    Module = void 0 !== Module ? Module : {},
    moduleOverrides = {};
  for (key in Module)
    Module.hasOwnProperty(key) && (moduleOverrides[key] = Module[key]);
  var arguments_ = [],
    thisProgram = './this.program',
    quit_ = function (e, n) {
      throw n;
    },
    ENVIRONMENT_IS_WEB = !1,
    ENVIRONMENT_IS_WORKER = !1,
    ENVIRONMENT_IS_NODE = !1,
    ENVIRONMENT_HAS_NODE = !1,
    ENVIRONMENT_IS_SHELL = !1;
  (ENVIRONMENT_IS_WEB = 'object' == typeof window),
    (ENVIRONMENT_IS_WORKER = 'function' == typeof importScripts),
    (ENVIRONMENT_IS_NODE =
      (ENVIRONMENT_HAS_NODE =
        'object' == typeof process &&
        'object' == typeof process.versions &&
        'string' == typeof process.versions.node) &&
      !ENVIRONMENT_IS_WEB &&
      !ENVIRONMENT_IS_WORKER),
    (ENVIRONMENT_IS_SHELL =
      !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER);
  var read_,
    readAsync,
    readBinary,
    setWindowTitle,
    nodeFS,
    nodePath,
    scriptDirectory = '';
  function locateFile(e) {
    return Module.locateFile
      ? Module.locateFile(e, scriptDirectory)
      : scriptDirectory + e;
  }
  ENVIRONMENT_IS_NODE
    ? ((scriptDirectory = __dirname + '/'),
      (read_ = function (e, n) {
        return (
          nodeFS || (nodeFS = require('fs')),
          nodePath || (nodePath = require('path')),
          (e = nodePath.normalize(e)),
          nodeFS.readFileSync(e, n ? null : 'utf8')
        );
      }),
      (readBinary = function (e) {
        var n = read_(e, !0);
        return n.buffer || (n = new Uint8Array(n)), assert(n.buffer), n;
      }),
      1 < process.argv.length &&
        (thisProgram = process.argv[1].replace(/\\/g, '/')),
      (arguments_ = process.argv.slice(2)),
      'undefined' != typeof module && (module.exports = Module),
      process.on('uncaughtException', function (e) {
        if (!(e instanceof ExitStatus)) throw e;
      }),
      process.on('unhandledRejection', abort),
      (quit_ = function (e) {
        process.exit(e);
      }),
      (Module.inspect = function () {
        return '[Emscripten Module object]';
      }))
    : ENVIRONMENT_IS_SHELL
    ? ('undefined' != typeof read &&
        (read_ = function (e) {
          return read(e);
        }),
      (readBinary = function (e) {
        var n;
        return 'function' == typeof readbuffer
          ? new Uint8Array(readbuffer(e))
          : (assert('object' == typeof (n = read(e, 'binary'))), n);
      }),
      'undefined' != typeof scriptArgs
        ? (arguments_ = scriptArgs)
        : 'undefined' != typeof arguments && (arguments_ = arguments),
      'function' == typeof quit &&
        (quit_ = function (e) {
          quit(e);
        }),
      'undefined' != typeof print &&
        ('undefined' == typeof console && (console = {}),
        (console.log = print),
        (console.warn = console.error =
          'undefined' != typeof printErr ? printErr : print)))
    : (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) &&
      (ENVIRONMENT_IS_WORKER
        ? (scriptDirectory = self.location.href)
        : document.currentScript &&
          (scriptDirectory = document.currentScript.src),
      (scriptDirectory =
        0 !== scriptDirectory.indexOf('blob:')
          ? scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/') + 1)
          : ''),
      (read_ = function (e) {
        var n = new XMLHttpRequest();
        return n.open('GET', e, !1), n.send(null), n.responseText;
      }),
      ENVIRONMENT_IS_WORKER &&
        (readBinary = function (e) {
          var n = new XMLHttpRequest();
          return (
            n.open('GET', e, !1),
            (n.responseType = 'arraybuffer'),
            n.send(null),
            new Uint8Array(n.response)
          );
        }),
      (readAsync = function (e, n, r) {
        var t = new XMLHttpRequest();
        t.open('GET', e, !0),
          (t.responseType = 'arraybuffer'),
          (t.onload = function () {
            200 == t.status || (0 == t.status && t.response)
              ? n(t.response)
              : r();
          }),
          (t.onerror = r),
          t.send(null);
      }),
      (setWindowTitle = function (e) {
        document.title = e;
      }));
  var wasmBinary,
    noExitRuntime,
    wasmMemory,
    out = Module.print || console.log.bind(console),
    err = Module.printErr || console.warn.bind(console);
  for (key in moduleOverrides)
    moduleOverrides.hasOwnProperty(key) && (Module[key] = moduleOverrides[key]);
  (moduleOverrides = null),
    Module.arguments && (arguments_ = Module.arguments),
    Module.thisProgram && (thisProgram = Module.thisProgram),
    Module.quit && (quit_ = Module.quit),
    Module.wasmBinary && (wasmBinary = Module.wasmBinary),
    Module.noExitRuntime && (noExitRuntime = Module.noExitRuntime),
    'object' != typeof WebAssembly && err('no native wasm support detected');
  var wasmTable = new WebAssembly.Table({
      initial: 6,
      maximum: 6,
      element: 'anyfunc',
    }),
    ABORT = !1,
    EXITSTATUS = 0;
  function assert(e, n) {
    e || abort('Assertion failed: ' + n);
  }
  var UTF8Decoder =
    'undefined' != typeof TextDecoder ? new TextDecoder('utf8') : void 0;
  function UTF8ArrayToString(e, n, r) {
    for (var t = n + r, o = n; e[o] && !(t <= o); ) ++o;
    if (16 < o - n && e.subarray && UTF8Decoder)
      return UTF8Decoder.decode(e.subarray(n, o));
    for (var i = ''; n < o; ) {
      var u = e[n++];
      if (128 & u) {
        var a = 63 & e[n++];
        if (192 != (224 & u)) {
          var s = 63 & e[n++];
          if (
            (u =
              224 == (240 & u)
                ? ((15 & u) << 12) | (a << 6) | s
                : ((7 & u) << 18) | (a << 12) | (s << 6) | (63 & e[n++])) <
            65536
          )
            i += String.fromCharCode(u);
          else {
            var l = u - 65536;
            i += String.fromCharCode(55296 | (l >> 10), 56320 | (1023 & l));
          }
        } else i += String.fromCharCode(((31 & u) << 6) | a);
      } else i += String.fromCharCode(u);
    }
    return i;
  }
  function UTF8ToString(e, n) {
    return e ? UTF8ArrayToString(HEAPU8, e, n) : '';
  }
  var buffer,
    HEAP8,
    HEAPU8,
    HEAP16,
    HEAPU16,
    HEAP32,
    HEAPU32,
    HEAPF32,
    HEAPF64,
    UTF16Decoder =
      'undefined' != typeof TextDecoder ? new TextDecoder('utf-16le') : void 0,
    WASM_PAGE_SIZE = 65536;
  function alignUp(e, n) {
    return 0 < e % n && (e += n - (e % n)), e;
  }
  function updateGlobalBufferAndViews(e) {
    (buffer = e),
      (Module.HEAP8 = HEAP8 = new Int8Array(e)),
      (Module.HEAP16 = HEAP16 = new Int16Array(e)),
      (Module.HEAP32 = HEAP32 = new Int32Array(e)),
      (Module.HEAPU8 = HEAPU8 = new Uint8Array(e)),
      (Module.HEAPU16 = HEAPU16 = new Uint16Array(e)),
      (Module.HEAPU32 = HEAPU32 = new Uint32Array(e)),
      (Module.HEAPF32 = HEAPF32 = new Float32Array(e)),
      (Module.HEAPF64 = HEAPF64 = new Float64Array(e));
  }
  var DYNAMIC_BASE = 5247584,
    DYNAMICTOP_PTR = 4544,
    INITIAL_TOTAL_MEMORY = Module.TOTAL_MEMORY || 16777216;
  function callRuntimeCallbacks(e) {
    for (; 0 < e.length; ) {
      var n = e.shift();
      if ('function' != typeof n) {
        var r = n.func;
        'number' == typeof r
          ? void 0 === n.arg
            ? Module.dynCall_v(r)
            : Module.dynCall_vi(r, n.arg)
          : r(void 0 === n.arg ? null : n.arg);
      } else n();
    }
  }
  (wasmMemory = Module.wasmMemory
    ? Module.wasmMemory
    : new WebAssembly.Memory({
        initial: INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE,
      })) && (buffer = wasmMemory.buffer),
    (INITIAL_TOTAL_MEMORY = buffer.byteLength),
    updateGlobalBufferAndViews(buffer),
    (HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE);
  var __ATPRERUN__ = [],
    __ATINIT__ = [],
    __ATMAIN__ = [],
    __ATPOSTRUN__ = [],
    runtimeInitialized = !1;
  function preRun() {
    if (Module.preRun)
      for (
        'function' == typeof Module.preRun && (Module.preRun = [Module.preRun]);
        Module.preRun.length;

      )
        addOnPreRun(Module.preRun.shift());
    callRuntimeCallbacks(__ATPRERUN__);
  }
  function initRuntime() {
    (runtimeInitialized = !0), callRuntimeCallbacks(__ATINIT__);
  }
  function preMain() {
    callRuntimeCallbacks(__ATMAIN__);
  }
  function postRun() {
    if (Module.postRun)
      for (
        'function' == typeof Module.postRun &&
        (Module.postRun = [Module.postRun]);
        Module.postRun.length;

      )
        addOnPostRun(Module.postRun.shift());
    callRuntimeCallbacks(__ATPOSTRUN__);
  }
  function addOnPreRun(e) {
    __ATPRERUN__.unshift(e);
  }
  function addOnPostRun(e) {
    __ATPOSTRUN__.unshift(e);
  }
  var runDependencies = 0,
    runDependencyWatcher = null,
    dependenciesFulfilled = null;
  function addRunDependency(e) {
    runDependencies++,
      Module.monitorRunDependencies &&
        Module.monitorRunDependencies(runDependencies);
  }
  function removeRunDependency(e) {
    if (
      (runDependencies--,
      Module.monitorRunDependencies &&
        Module.monitorRunDependencies(runDependencies),
      0 == runDependencies &&
        (null !== runDependencyWatcher &&
          (clearInterval(runDependencyWatcher), (runDependencyWatcher = null)),
        dependenciesFulfilled))
    ) {
      var n = dependenciesFulfilled;
      (dependenciesFulfilled = null), n();
    }
  }
  function abort(e) {
    throw (
      (Module.onAbort && Module.onAbort(e),
      out((e += '')),
      err(e),
      (ABORT = !0),
      (EXITSTATUS = 1),
      (e = 'abort(' + e + '). Build with -s ASSERTIONS=1 for more info.'),
      new WebAssembly.RuntimeError(e))
    );
  }
  (Module.preloadedImages = {}), (Module.preloadedAudios = {});
  var dataURIPrefix = 'data:application/octet-stream;base64,';
  function isDataURI(e) {
    return String.prototype.startsWith
      ? e.startsWith(dataURIPrefix)
      : 0 === e.indexOf(dataURIPrefix);
  }
  var wasmBinaryFile = 'crunch.wasm';
  function getBinary() {
    try {
      if (wasmBinary) return new Uint8Array(wasmBinary);
      if (readBinary) return readBinary(wasmBinaryFile);
      throw 'both async and sync fetching of the wasm failed';
    } catch (e) {
      abort(e);
    }
  }
  function getBinaryPromise() {
    return wasmBinary ||
      (!ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER) ||
      'function' != typeof fetch
      ? new Promise(function (e, n) {
          e(getBinary());
        })
      : fetch(wasmBinaryFile, { credentials: 'same-origin' })
          .then(function (e) {
            if (!e.ok)
              throw (
                "failed to load wasm binary file at '" + wasmBinaryFile + "'"
              );
            return e.arrayBuffer();
          })
          .catch(function () {
            return getBinary();
          });
  }
  function createWasm() {
    var e = { env: asmLibraryArg, wasi_unstable: asmLibraryArg };
    function n(e, n) {
      var r = e.exports;
      (Module.asm = r), removeRunDependency('wasm-instantiate');
    }
    function r(e) {
      n(e.instance);
    }
    function t(n) {
      return getBinaryPromise()
        .then(function (n) {
          return WebAssembly.instantiate(n, e);
        })
        .then(n, function (e) {
          err('failed to asynchronously prepare wasm: ' + e), abort(e);
        });
    }
    if ((addRunDependency('wasm-instantiate'), Module.instantiateWasm))
      try {
        return Module.instantiateWasm(e, n);
      } catch (e) {
        return (
          err('Module.instantiateWasm callback failed with error: ' + e), !1
        );
      }
    return (
      (function () {
        if (
          wasmBinary ||
          'function' != typeof WebAssembly.instantiateStreaming ||
          isDataURI(wasmBinaryFile) ||
          'function' != typeof fetch
        )
          return t(r);
        fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function (
          n,
        ) {
          return WebAssembly.instantiateStreaming(n, e).then(r, function (e) {
            err('wasm streaming compile failed: ' + e),
              err('falling back to ArrayBuffer instantiation'),
              t(r);
          });
        });
      })(),
      {}
    );
  }
  function _emscripten_get_heap_size() {
    return HEAP8.length;
  }
  function _emscripten_memcpy_big(e, n, r) {
    HEAPU8.set(HEAPU8.subarray(n, n + r), e);
  }
  function emscripten_realloc_buffer(e) {
    try {
      return (
        wasmMemory.grow((e - buffer.byteLength + 65535) >> 16),
        updateGlobalBufferAndViews(wasmMemory.buffer),
        1
      );
    } catch (e) {}
  }
  function _emscripten_resize_heap(e) {
    var n = _emscripten_get_heap_size(),
      r = 2147418112;
    if (r < e) return !1;
    for (var t = Math.max(n, 16777216); t < e; )
      t =
        t <= 536870912
          ? alignUp(2 * t, 65536)
          : Math.min(alignUp((3 * t + 2147483648) / 4, 65536), r);
    return !!emscripten_realloc_buffer(t);
  }
  isDataURI(wasmBinaryFile) ||
    (wasmBinaryFile = self.CESIUM_BASE_URL + 'ThirdParty/crunch.wasm'),
    __ATINIT__.push({
      func: function () {
        ___wasm_call_ctors();
      },
    });
  var PATH = {
      splitPath: function (e) {
        return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
          .exec(e)
          .slice(1);
      },
      normalizeArray: function (e, n) {
        for (var r = 0, t = e.length - 1; 0 <= t; t--) {
          var o = e[t];
          '.' === o
            ? e.splice(t, 1)
            : '..' === o
            ? (e.splice(t, 1), r++)
            : r && (e.splice(t, 1), r--);
        }
        if (n) for (; r; r--) e.unshift('..');
        return e;
      },
      normalize: function (e) {
        var n = '/' === e.charAt(0),
          r = '/' === e.substr(-1);
        return (
          (e = PATH.normalizeArray(
            e.split('/').filter(function (e) {
              return !!e;
            }),
            !n,
          ).join('/')) ||
            n ||
            (e = '.'),
          e && r && (e += '/'),
          (n ? '/' : '') + e
        );
      },
      dirname: function (e) {
        var n = PATH.splitPath(e),
          r = n[0],
          t = n[1];
        return r || t ? (t && (t = t.substr(0, t.length - 1)), r + t) : '.';
      },
      basename: function (e) {
        if ('/' === e) return '/';
        var n = e.lastIndexOf('/');
        return -1 === n ? e : e.substr(n + 1);
      },
      extname: function (e) {
        return PATH.splitPath(e)[3];
      },
      join: function () {
        var e = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(e.join('/'));
      },
      join2: function (e, n) {
        return PATH.normalize(e + '/' + n);
      },
    },
    SYSCALLS = {
      buffers: [null, [], []],
      printChar: function (e, n) {
        var r = SYSCALLS.buffers[e];
        0 === n || 10 === n
          ? ((1 === e ? out : err)(UTF8ArrayToString(r, 0)), (r.length = 0))
          : r.push(n);
      },
      varargs: 0,
      get: function (e) {
        return (SYSCALLS.varargs += 4), HEAP32[(SYSCALLS.varargs - 4) >> 2];
      },
      getStr: function () {
        return UTF8ToString(SYSCALLS.get());
      },
      get64: function () {
        var e = SYSCALLS.get();
        return SYSCALLS.get(), e;
      },
      getZero: function () {
        SYSCALLS.get();
      },
    };
  function _fd_write(e, n, r, t) {
    try {
      for (var o = 0, i = 0; i < r; i++) {
        for (
          var u = HEAP32[(n + 8 * i) >> 2],
            a = HEAP32[(n + (8 * i + 4)) >> 2],
            s = 0;
          s < a;
          s++
        )
          SYSCALLS.printChar(e, HEAPU8[u + s]);
        o += a;
      }
      return (HEAP32[t >> 2] = o), 0;
    } catch (e) {
      return (
        ('undefined' != typeof FS && e instanceof FS.ErrnoError) || abort(e),
        e.errno
      );
    }
  }
  var asmLibraryArg = {
      a: _emscripten_memcpy_big,
      b: _emscripten_resize_heap,
      c: _fd_write,
      memory: wasmMemory,
      table: wasmTable,
    },
    asm = createWasm();
  Module.asm = asm;
  var calledRun,
    ___wasm_call_ctors = (Module.___wasm_call_ctors = function () {
      return Module.asm.d.apply(null, arguments);
    }),
    _malloc = (Module._malloc = function () {
      return Module.asm.e.apply(null, arguments);
    }),
    _free = (Module._free = function () {
      return Module.asm.f.apply(null, arguments);
    }),
    _crn_get_width = (Module._crn_get_width = function () {
      return Module.asm.g.apply(null, arguments);
    }),
    _crn_get_height = (Module._crn_get_height = function () {
      return Module.asm.h.apply(null, arguments);
    }),
    _crn_get_levels = (Module._crn_get_levels = function () {
      return Module.asm.i.apply(null, arguments);
    }),
    _crn_get_dxt_format = (Module._crn_get_dxt_format = function () {
      return Module.asm.j.apply(null, arguments);
    }),
    _crn_get_bytes_per_block = (Module._crn_get_bytes_per_block = function () {
      return Module.asm.k.apply(null, arguments);
    }),
    _crn_get_uncompressed_size = (Module._crn_get_uncompressed_size =
      function () {
        return Module.asm.l.apply(null, arguments);
      }),
    _crn_decompress = (Module._crn_decompress = function () {
      return Module.asm.m.apply(null, arguments);
    });
  function ExitStatus(e) {
    (this.name = 'ExitStatus'),
      (this.message = 'Program terminated with exit(' + e + ')'),
      (this.status = e);
  }
  function run(e) {
    function n() {
      calledRun ||
        ((calledRun = !0),
        ABORT ||
          (initRuntime(),
          preMain(),
          Module.onRuntimeInitialized && Module.onRuntimeInitialized(),
          postRun()));
    }
    (e = e || arguments_),
      0 < runDependencies ||
        (preRun(),
        0 < runDependencies ||
          (Module.setStatus
            ? (Module.setStatus('Running...'),
              setTimeout(function () {
                setTimeout(function () {
                  Module.setStatus('');
                }, 1),
                  n();
              }, 1))
            : n()));
  }
  if (
    ((Module.asm = asm),
    (dependenciesFulfilled = function e() {
      calledRun || run(), calledRun || (dependenciesFulfilled = e);
    }),
    (Module.run = run),
    Module.preInit)
  )
    for (
      'function' == typeof Module.preInit &&
      (Module.preInit = [Module.preInit]);
      0 < Module.preInit.length;

    )
      Module.preInit.pop()();
  (noExitRuntime = !0), run();
}
