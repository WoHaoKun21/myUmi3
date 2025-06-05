define([
  './when-8d13db60',
  './RuntimeError-ba10bc3e',
  './WebGLConstants-4c11ee5f',
  './createTaskProcessorWorker',
  './CompressedTextureBuffer-21cababf',
  './PixelFormat-8e0e5be1',
], function (
  when,
  RuntimeError,
  WebGLConstants,
  createTaskProcessorWorker,
  CompressedTextureBuffer,
  PixelFormat,
) {
  var Module;
  Module || (Module = (void 0 !== Module ? Module : null) || {});
  var moduleOverrides = {};
  for (var key in Module)
    Module.hasOwnProperty(key) && (moduleOverrides[key] = Module[key]);
  var ENVIRONMENT_IS_WEB = !1,
    ENVIRONMENT_IS_WORKER = !1,
    ENVIRONMENT_IS_NODE = !1,
    ENVIRONMENT_IS_SHELL = !1,
    nodeFS,
    nodePath;
  if (Module.ENVIRONMENT)
    if ('WEB' === Module.ENVIRONMENT) ENVIRONMENT_IS_WEB = !0;
    else if ('WORKER' === Module.ENVIRONMENT) ENVIRONMENT_IS_WORKER = !0;
    else if ('NODE' === Module.ENVIRONMENT) ENVIRONMENT_IS_NODE = !0;
    else {
      if ('SHELL' !== Module.ENVIRONMENT)
        throw new Error(
          "The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.",
        );
      ENVIRONMENT_IS_SHELL = !0;
    }
  else
    (ENVIRONMENT_IS_WEB = 'object' == typeof window),
      (ENVIRONMENT_IS_WORKER = 'function' == typeof importScripts),
      (ENVIRONMENT_IS_NODE =
        'object' == typeof process &&
        'function' == typeof require &&
        !ENVIRONMENT_IS_WEB &&
        !ENVIRONMENT_IS_WORKER),
      (ENVIRONMENT_IS_SHELL =
        !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER);
  if (ENVIRONMENT_IS_NODE)
    Module.print || (Module.print = console.log),
      Module.printErr || (Module.printErr = console.warn),
      (Module.read = function (e, r) {
        nodeFS || (nodeFS = require('fs')),
          nodePath || (nodePath = require('path')),
          (e = nodePath.normalize(e));
        var i = nodeFS.readFileSync(e);
        return r ? i : i.toString();
      }),
      (Module.readBinary = function (e) {
        var r = Module.read(e, !0);
        return r.buffer || (r = new Uint8Array(r)), assert(r.buffer), r;
      }),
      (Module.load = function (e) {
        globalEval(read(e));
      }),
      Module.thisProgram ||
        (1 < process.argv.length
          ? (Module.thisProgram = process.argv[1].replace(/\\/g, '/'))
          : (Module.thisProgram = 'unknown-program')),
      (Module.arguments = process.argv.slice(2)),
      'undefined' != typeof module && (module.exports = Module),
      process.on('uncaughtException', function (e) {
        if (!(e instanceof ExitStatus)) throw e;
      }),
      (Module.inspect = function () {
        return '[Emscripten Module object]';
      });
  else if (ENVIRONMENT_IS_SHELL)
    Module.print || (Module.print = print),
      'undefined' != typeof printErr && (Module.printErr = printErr),
      'undefined' != typeof read
        ? (Module.read = read)
        : (Module.read = function () {
            throw 'no read() available';
          }),
      (Module.readBinary = function (e) {
        if ('function' == typeof readbuffer)
          return new Uint8Array(readbuffer(e));
        var r = read(e, 'binary');
        return assert('object' == typeof r), r;
      }),
      'undefined' != typeof scriptArgs
        ? (Module.arguments = scriptArgs)
        : void 0 !== arguments && (Module.arguments = arguments),
      'function' == typeof quit &&
        (Module.quit = function (e, r) {
          quit(e);
        });
  else {
    if (!ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER)
      throw 'Unknown runtime environment. Where are we?';
    if (
      ((Module.read = function (e) {
        var r = new XMLHttpRequest();
        return r.open('GET', e, !1), r.send(null), r.responseText;
      }),
      ENVIRONMENT_IS_WORKER &&
        (Module.readBinary = function (e) {
          var r = new XMLHttpRequest();
          return (
            r.open('GET', e, !1),
            (r.responseType = 'arraybuffer'),
            r.send(null),
            new Uint8Array(r.response)
          );
        }),
      (Module.readAsync = function (e, r, i) {
        var n = new XMLHttpRequest();
        n.open('GET', e, !0),
          (n.responseType = 'arraybuffer'),
          (n.onload = function () {
            200 == n.status || (0 == n.status && n.response)
              ? r(n.response)
              : i();
          }),
          (n.onerror = i),
          n.send(null);
      }),
      void 0 !== arguments && (Module.arguments = arguments),
      'undefined' != typeof console)
    )
      Module.print ||
        (Module.print = function (e) {
          console.log(e);
        }),
        Module.printErr ||
          (Module.printErr = function (e) {
            console.warn(e);
          });
    else {
      var TRY_USE_DUMP = !1;
      Module.print ||
        (Module.print =
          TRY_USE_DUMP && 'undefined' != typeof dump
            ? function (e) {
                dump(e);
              }
            : function (e) {});
    }
    ENVIRONMENT_IS_WORKER && (Module.load = importScripts),
      void 0 === Module.setWindowTitle &&
        (Module.setWindowTitle = function (e) {
          document.title = e;
        });
  }
  function globalEval(e) {
    eval.call(null, e);
  }
  for (var key in (!Module.load &&
    Module.read &&
    (Module.load = function (e) {
      globalEval(Module.read(e));
    }),
  Module.print || (Module.print = function () {}),
  Module.printErr || (Module.printErr = Module.print),
  Module.arguments || (Module.arguments = []),
  Module.thisProgram || (Module.thisProgram = './this.program'),
  Module.quit ||
    (Module.quit = function (e, r) {
      throw r;
    }),
  (Module.print = Module.print),
  (Module.printErr = Module.printErr),
  (Module.preRun = []),
  (Module.postRun = []),
  moduleOverrides))
    moduleOverrides.hasOwnProperty(key) && (Module[key] = moduleOverrides[key]);
  moduleOverrides = void 0;
  var Runtime = {
    setTempRet0: function (e) {
      return (tempRet0 = e);
    },
    getTempRet0: function () {
      return tempRet0;
    },
    stackSave: function () {
      return STACKTOP;
    },
    stackRestore: function (e) {
      STACKTOP = e;
    },
    getNativeTypeSize: function (e) {
      switch (e) {
        case 'i1':
        case 'i8':
          return 1;
        case 'i16':
          return 2;
        case 'i32':
        case 'float':
          return 4;
        case 'i64':
        case 'double':
          return 8;
        default:
          if ('*' === e[e.length - 1]) return Runtime.QUANTUM_SIZE;
          if ('i' !== e[0]) return 0;
          var r = parseInt(e.substr(1));
          return assert(r % 8 == 0), r / 8;
      }
    },
    getNativeFieldSize: function (e) {
      return Math.max(Runtime.getNativeTypeSize(e), Runtime.QUANTUM_SIZE);
    },
    STACK_ALIGN: 16,
    prepVararg: function (e, r) {
      return (
        'double' === r || 'i64' === r
          ? 7 & e && (assert(4 == (7 & e)), (e += 4))
          : assert(0 == (3 & e)),
        e
      );
    },
    getAlignSize: function (e, r, i) {
      return i || ('i64' != e && 'double' != e)
        ? e
          ? Math.min(
              r || (e ? Runtime.getNativeFieldSize(e) : 0),
              Runtime.QUANTUM_SIZE,
            )
          : Math.min(r, 8)
        : 8;
    },
    dynCall: function (e, r, i) {
      return i && i.length
        ? Module['dynCall_' + e].apply(null, [r].concat(i))
        : Module['dynCall_' + e].call(null, r);
    },
    functionPointers: [],
    addFunction: function (e) {
      for (var r = 0; r < Runtime.functionPointers.length; r++)
        if (!Runtime.functionPointers[r])
          return (Runtime.functionPointers[r] = e), 2 * (1 + r);
      throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
    },
    removeFunction: function (e) {
      Runtime.functionPointers[(e - 2) / 2] = null;
    },
    warnOnce: function (e) {
      Runtime.warnOnce.shown || (Runtime.warnOnce.shown = {}),
        Runtime.warnOnce.shown[e] ||
          ((Runtime.warnOnce.shown[e] = 1), Module.printErr(e));
    },
    funcWrappers: {},
    getFuncWrapper: function (e, r) {
      assert(r), Runtime.funcWrappers[r] || (Runtime.funcWrappers[r] = {});
      var i = Runtime.funcWrappers[r];
      return (
        i[e] ||
          (1 === r.length
            ? (i[e] = function () {
                return Runtime.dynCall(r, e);
              })
            : 2 === r.length
            ? (i[e] = function (i) {
                return Runtime.dynCall(r, e, [i]);
              })
            : (i[e] = function () {
                return Runtime.dynCall(
                  r,
                  e,
                  Array.prototype.slice.call(arguments),
                );
              })),
        i[e]
      );
    },
    getCompilerSetting: function (e) {
      throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
    },
    stackAlloc: function (e) {
      var r = STACKTOP;
      return (STACKTOP = (15 + (STACKTOP = (STACKTOP + e) | 0)) & -16), r;
    },
    staticAlloc: function (e) {
      var r = STATICTOP;
      return (STATICTOP = (15 + (STATICTOP = (STATICTOP + e) | 0)) & -16), r;
    },
    dynamicAlloc: function (e) {
      var r = HEAP32[DYNAMICTOP_PTR >> 2],
        i = -16 & ((r + e + 15) | 0);
      return (
        (HEAP32[DYNAMICTOP_PTR >> 2] = i),
        TOTAL_MEMORY <= i && !enlargeMemory()
          ? ((HEAP32[DYNAMICTOP_PTR >> 2] = r), 0)
          : r
      );
    },
    alignMemory: function (e, r) {
      return Math.ceil(e / (r || 16)) * (r || 16);
    },
    makeBigInt: function (e, r, i) {
      return i
        ? +(e >>> 0) + 4294967296 * +(r >>> 0)
        : +(e >>> 0) + 4294967296 * +(0 | r);
    },
    GLOBAL_BASE: 8,
    QUANTUM_SIZE: 4,
    __dummy__: 0,
  };
  Module.Runtime = Runtime;
  var ABORT = 0,
    cwrap,
    ccall;
  function assert(e, r) {
    e || abort('Assertion failed: ' + r);
  }
  function getCFunc(ident) {
    var func = Module['_' + ident];
    if (!func)
      try {
        func = eval('_' + ident);
      } catch (e) {}
    return (
      assert(
        func,
        'Cannot call unknown function ' +
          ident +
          ' (perhaps LLVM optimizations or closure removed it?)',
      ),
      func
    );
  }
  function setValue(e, r, i, n) {
    switch (('*' === (i = i || 'i8').charAt(i.length - 1) && (i = 'i32'), i)) {
      case 'i1':
      case 'i8':
        HEAP8[e >> 0] = r;
        break;
      case 'i16':
        HEAP16[e >> 1] = r;
        break;
      case 'i32':
        HEAP32[e >> 2] = r;
        break;
      case 'i64':
        (tempI64 = [
          r >>> 0,
          ((tempDouble = r),
          1 <= +Math_abs(tempDouble)
            ? 0 < tempDouble
              ? (0 |
                  Math_min(
                    +Math_floor(tempDouble / 4294967296),
                    4294967295,
                  )) >>>
                0
              : ~~+Math_ceil(
                  (tempDouble - +(~~tempDouble >>> 0)) / 4294967296,
                ) >>> 0
            : 0),
        ]),
          (HEAP32[e >> 2] = tempI64[0]),
          (HEAP32[(e + 4) >> 2] = tempI64[1]);
        break;
      case 'float':
        HEAPF32[e >> 2] = r;
        break;
      case 'double':
        HEAPF64[e >> 3] = r;
        break;
      default:
        abort('invalid type for setValue: ' + i);
    }
  }
  function getValue(e, r, i) {
    switch (('*' === (r = r || 'i8').charAt(r.length - 1) && (r = 'i32'), r)) {
      case 'i1':
      case 'i8':
        return HEAP8[e >> 0];
      case 'i16':
        return HEAP16[e >> 1];
      case 'i32':
      case 'i64':
        return HEAP32[e >> 2];
      case 'float':
        return HEAPF32[e >> 2];
      case 'double':
        return HEAPF64[e >> 3];
      default:
        abort('invalid type for setValue: ' + r);
    }
    return null;
  }
  !(function () {
    var JSfuncs = {
        stackSave: function () {
          Runtime.stackSave();
        },
        stackRestore: function () {
          Runtime.stackRestore();
        },
        arrayToC: function (e) {
          var r = Runtime.stackAlloc(e.length);
          return writeArrayToMemory(e, r), r;
        },
        stringToC: function (e) {
          var r = 0;
          if (null != e && 0 !== e) {
            var i = 1 + (e.length << 2);
            stringToUTF8(e, (r = Runtime.stackAlloc(i)), i);
          }
          return r;
        },
      },
      toC = { string: JSfuncs.stringToC, array: JSfuncs.arrayToC };
    ccall = function (e, r, i, n, t) {
      var o = getCFunc(e),
        a = [],
        u = 0;
      if (n)
        for (var f = 0; f < n.length; f++) {
          var l = toC[i[f]];
          a[f] = l ? (0 === u && (u = Runtime.stackSave()), l(n[f])) : n[f];
        }
      var c = o.apply(null, a);
      if (('string' === r && (c = Pointer_stringify(c)), 0 !== u)) {
        if (t && t.async)
          return void EmterpreterAsync.asyncFinalizers.push(function () {
            Runtime.stackRestore(u);
          });
        Runtime.stackRestore(u);
      }
      return c;
    };
    var sourceRegex =
      /^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;
    function parseJSFunc(e) {
      var r = e.toString().match(sourceRegex).slice(1);
      return { arguments: r[0], body: r[1], returnValue: r[2] };
    }
    var JSsource = null;
    function ensureJSsource() {
      if (!JSsource)
        for (var e in ((JSsource = {}), JSfuncs))
          JSfuncs.hasOwnProperty(e) && (JSsource[e] = parseJSFunc(JSfuncs[e]));
    }
    cwrap = function cwrap(ident, returnType, argTypes) {
      argTypes = argTypes || [];
      var cfunc = getCFunc(ident),
        numericArgs = argTypes.every(function (e) {
          return 'number' === e;
        }),
        numericRet = 'string' !== returnType;
      if (numericRet && numericArgs) return cfunc;
      var argNames = argTypes.map(function (e, r) {
          return '$' + r;
        }),
        funcstr = '(function(' + argNames.join(',') + ') {',
        nargs = argTypes.length;
      if (!numericArgs) {
        ensureJSsource(),
          (funcstr += 'var stack = ' + JSsource.stackSave.body + ';');
        for (var i = 0; i < nargs; i++) {
          var arg = argNames[i],
            type = argTypes[i];
          if ('number' !== type) {
            var convertCode = JSsource[type + 'ToC'];
            (funcstr += 'var ' + convertCode.arguments + ' = ' + arg + ';'),
              (funcstr += convertCode.body + ';'),
              (funcstr += arg + '=(' + convertCode.returnValue + ');');
          }
        }
      }
      var cfuncname = parseJSFunc(function () {
        return cfunc;
      }).returnValue;
      if (
        ((funcstr +=
          'var ret = ' + cfuncname + '(' + argNames.join(',') + ');'),
        !numericRet)
      ) {
        var strgfy = parseJSFunc(function () {
          return Pointer_stringify;
        }).returnValue;
        funcstr += 'ret = ' + strgfy + '(ret);';
      }
      return (
        numericArgs ||
          (ensureJSsource(),
          (funcstr +=
            JSsource.stackRestore.body.replace('()', '(stack)') + ';')),
        (funcstr += 'return ret})'),
        eval(funcstr)
      );
    };
  })(),
    (Module.ccall = ccall),
    (Module.cwrap = cwrap),
    (Module.setValue = setValue),
    (Module.getValue = getValue);
  var ALLOC_NORMAL = 0,
    ALLOC_STACK = 1,
    ALLOC_STATIC = 2,
    ALLOC_DYNAMIC = 3,
    ALLOC_NONE = 4;
  function allocate(e, r, i, n) {
    var t, o;
    o = 'number' == typeof e ? ((t = !0), e) : ((t = !1), e.length);
    var a,
      u = 'string' == typeof r ? r : null;
    if (
      ((a =
        i == ALLOC_NONE
          ? n
          : [
              'function' == typeof _malloc ? _malloc : Runtime.staticAlloc,
              Runtime.stackAlloc,
              Runtime.staticAlloc,
              Runtime.dynamicAlloc,
            ][void 0 === i ? ALLOC_STATIC : i](Math.max(o, u ? 1 : r.length))),
      t)
    ) {
      var f;
      for (n = a, assert(0 == (3 & a)), f = a + (-4 & o); n < f; n += 4)
        HEAP32[n >> 2] = 0;
      for (f = a + o; n < f; ) HEAP8[n++ >> 0] = 0;
      return a;
    }
    if ('i8' === u)
      return (
        e.subarray || e.slice
          ? HEAPU8.set(e, a)
          : HEAPU8.set(new Uint8Array(e), a),
        a
      );
    for (var l, c, s, _ = 0; _ < o; ) {
      var d = e[_];
      'function' == typeof d && (d = Runtime.getFunctionIndex(d)),
        0 !== (l = u || r[_])
          ? ('i64' == l && (l = 'i32'),
            setValue(a + _, d, l),
            s !== l && ((c = Runtime.getNativeTypeSize(l)), (s = l)),
            (_ += c))
          : _++;
    }
    return a;
  }
  function getMemory(e) {
    return staticSealed
      ? runtimeInitialized
        ? _malloc(e)
        : Runtime.dynamicAlloc(e)
      : Runtime.staticAlloc(e);
  }
  function Pointer_stringify(e, r) {
    if (0 === r || !e) return '';
    for (
      var i, n = 0, t = 0;
      (n |= i = HEAPU8[(e + t) >> 0]), (0 != i || r) && (t++, !r || t != r);

    );
    r || (r = t);
    var o = '';
    if (n < 128) {
      for (var a; 0 < r; )
        (a = String.fromCharCode.apply(
          String,
          HEAPU8.subarray(e, e + Math.min(r, 1024)),
        )),
          (o = o ? o + a : a),
          (e += 1024),
          (r -= 1024);
      return o;
    }
    return Module.UTF8ToString(e);
  }
  function AsciiToString(e) {
    for (var r = ''; ; ) {
      var i = HEAP8[e++ >> 0];
      if (!i) return r;
      r += String.fromCharCode(i);
    }
  }
  function stringToAscii(e, r) {
    return writeAsciiToMemory(e, r, !1);
  }
  (Module.ALLOC_NORMAL = ALLOC_NORMAL),
    (Module.ALLOC_STACK = ALLOC_STACK),
    (Module.ALLOC_STATIC = ALLOC_STATIC),
    (Module.ALLOC_DYNAMIC = ALLOC_DYNAMIC),
    (Module.ALLOC_NONE = ALLOC_NONE),
    (Module.allocate = allocate),
    (Module.getMemory = getMemory),
    (Module.Pointer_stringify = Pointer_stringify),
    (Module.AsciiToString = AsciiToString),
    (Module.stringToAscii = stringToAscii);
  var UTF8Decoder =
    'undefined' != typeof TextDecoder ? new TextDecoder('utf8') : void 0;
  function UTF8ArrayToString(e, r) {
    for (var i = r; e[i]; ) ++i;
    if (16 < i - r && e.subarray && UTF8Decoder)
      return UTF8Decoder.decode(e.subarray(r, i));
    for (var n, t, o, a, u, f = ''; ; ) {
      if (!(n = e[r++])) return f;
      if (128 & n)
        if (((t = 63 & e[r++]), 192 != (224 & n)))
          if (
            ((o = 63 & e[r++]),
            (n =
              224 == (240 & n)
                ? ((15 & n) << 12) | (t << 6) | o
                : ((a = 63 & e[r++]),
                  240 == (248 & n)
                    ? ((7 & n) << 18) | (t << 12) | (o << 6) | a
                    : ((u = 63 & e[r++]),
                      248 == (252 & n)
                        ? ((3 & n) << 24) | (t << 18) | (o << 12) | (a << 6) | u
                        : ((1 & n) << 30) |
                          (t << 24) |
                          (o << 18) |
                          (a << 12) |
                          (u << 6) |
                          (63 & e[r++])))) < 65536)
          )
            f += String.fromCharCode(n);
          else {
            var l = n - 65536;
            f += String.fromCharCode(55296 | (l >> 10), 56320 | (1023 & l));
          }
        else f += String.fromCharCode(((31 & n) << 6) | t);
      else f += String.fromCharCode(n);
    }
  }
  function UTF8ToString(e) {
    return UTF8ArrayToString(HEAPU8, e);
  }
  function stringToUTF8Array(e, r, i, n) {
    if (!(0 < n)) return 0;
    for (var t = i, o = i + n - 1, a = 0; a < e.length; ++a) {
      var u = e.charCodeAt(a);
      if (
        (55296 <= u &&
          u <= 57343 &&
          (u = (65536 + ((1023 & u) << 10)) | (1023 & e.charCodeAt(++a))),
        u <= 127)
      ) {
        if (o <= i) break;
        r[i++] = u;
      } else if (u <= 2047) {
        if (o <= i + 1) break;
        (r[i++] = 192 | (u >> 6)), (r[i++] = 128 | (63 & u));
      } else if (u <= 65535) {
        if (o <= i + 2) break;
        (r[i++] = 224 | (u >> 12)),
          (r[i++] = 128 | ((u >> 6) & 63)),
          (r[i++] = 128 | (63 & u));
      } else if (u <= 2097151) {
        if (o <= i + 3) break;
        (r[i++] = 240 | (u >> 18)),
          (r[i++] = 128 | ((u >> 12) & 63)),
          (r[i++] = 128 | ((u >> 6) & 63)),
          (r[i++] = 128 | (63 & u));
      } else if (u <= 67108863) {
        if (o <= i + 4) break;
        (r[i++] = 248 | (u >> 24)),
          (r[i++] = 128 | ((u >> 18) & 63)),
          (r[i++] = 128 | ((u >> 12) & 63)),
          (r[i++] = 128 | ((u >> 6) & 63)),
          (r[i++] = 128 | (63 & u));
      } else {
        if (o <= i + 5) break;
        (r[i++] = 252 | (u >> 30)),
          (r[i++] = 128 | ((u >> 24) & 63)),
          (r[i++] = 128 | ((u >> 18) & 63)),
          (r[i++] = 128 | ((u >> 12) & 63)),
          (r[i++] = 128 | ((u >> 6) & 63)),
          (r[i++] = 128 | (63 & u));
      }
    }
    return (r[i] = 0), i - t;
  }
  function stringToUTF8(e, r, i) {
    return stringToUTF8Array(e, HEAPU8, r, i);
  }
  function lengthBytesUTF8(e) {
    for (var r = 0, i = 0; i < e.length; ++i) {
      var n = e.charCodeAt(i);
      55296 <= n &&
        n <= 57343 &&
        (n = (65536 + ((1023 & n) << 10)) | (1023 & e.charCodeAt(++i))),
        n <= 127
          ? ++r
          : (r +=
              n <= 2047
                ? 2
                : n <= 65535
                ? 3
                : n <= 2097151
                ? 4
                : n <= 67108863
                ? 5
                : 6);
    }
    return r;
  }
  (Module.UTF8ArrayToString = UTF8ArrayToString),
    (Module.UTF8ToString = UTF8ToString),
    (Module.stringToUTF8Array = stringToUTF8Array),
    (Module.stringToUTF8 = stringToUTF8),
    (Module.lengthBytesUTF8 = lengthBytesUTF8);
  var UTF16Decoder =
    'undefined' != typeof TextDecoder ? new TextDecoder('utf-16le') : void 0;
  function demangle(e) {
    var r = Module.___cxa_demangle || Module.__cxa_demangle;
    if (r) {
      try {
        var i = e.substr(1),
          n = lengthBytesUTF8(i) + 1,
          t = _malloc(n);
        stringToUTF8(i, t, n);
        var o = _malloc(4),
          a = r(t, 0, 0, o);
        if (0 === getValue(o, 'i32') && a) return Pointer_stringify(a);
      } catch (e) {
      } finally {
        t && _free(t), o && _free(o), a && _free(a);
      }
      return e;
    }
    return (
      Runtime.warnOnce(
        'warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling',
      ),
      e
    );
  }
  function demangleAll(e) {
    return e.replace(/__Z[\w\d_]+/g, function (e) {
      var r = demangle(e);
      return e === r ? e : e + ' [' + r + ']';
    });
  }
  function jsStackTrace() {
    var e = new Error();
    if (!e.stack) {
      try {
        throw new Error(0);
      } catch (r) {
        e = r;
      }
      if (!e.stack) return '(no stack trace available)';
    }
    return e.stack.toString();
  }
  function stackTrace() {
    var e = jsStackTrace();
    return (
      Module.extraStackTrace && (e += '\n' + Module.extraStackTrace()),
      demangleAll(e)
    );
  }
  Module.stackTrace = stackTrace;
  var WASM_PAGE_SIZE = 65536,
    ASMJS_PAGE_SIZE = 16777216,
    MIN_TOTAL_MEMORY = 16777216,
    HEAP,
    buffer,
    HEAP8,
    HEAPU8,
    HEAP16,
    HEAPU16,
    HEAP32,
    HEAPU32,
    HEAPF32,
    HEAPF64,
    STATIC_BASE,
    STATICTOP,
    staticSealed,
    STACK_BASE,
    STACKTOP,
    STACK_MAX,
    DYNAMIC_BASE,
    DYNAMICTOP_PTR,
    byteLength;
  function alignUp(e, r) {
    return 0 < e % r && (e += r - (e % r)), e;
  }
  function updateGlobalBuffer(e) {
    Module.buffer = buffer = e;
  }
  function updateGlobalBufferViews() {
    (Module.HEAP8 = HEAP8 = new Int8Array(buffer)),
      (Module.HEAP16 = HEAP16 = new Int16Array(buffer)),
      (Module.HEAP32 = HEAP32 = new Int32Array(buffer)),
      (Module.HEAPU8 = HEAPU8 = new Uint8Array(buffer)),
      (Module.HEAPU16 = HEAPU16 = new Uint16Array(buffer)),
      (Module.HEAPU32 = HEAPU32 = new Uint32Array(buffer)),
      (Module.HEAPF32 = HEAPF32 = new Float32Array(buffer)),
      (Module.HEAPF64 = HEAPF64 = new Float64Array(buffer));
  }
  function abortOnCannotGrowMemory() {
    abort(
      'Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' +
        TOTAL_MEMORY +
        ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ',
    );
  }
  function enlargeMemory() {
    var e = Module.usingWasm ? WASM_PAGE_SIZE : ASMJS_PAGE_SIZE,
      r = 2147483648 - e;
    if (HEAP32[DYNAMICTOP_PTR >> 2] > r) return !1;
    var i = TOTAL_MEMORY;
    for (
      TOTAL_MEMORY = Math.max(TOTAL_MEMORY, MIN_TOTAL_MEMORY);
      TOTAL_MEMORY < HEAP32[DYNAMICTOP_PTR >> 2];

    )
      TOTAL_MEMORY =
        TOTAL_MEMORY <= 536870912
          ? alignUp(2 * TOTAL_MEMORY, e)
          : Math.min(alignUp((3 * TOTAL_MEMORY + 2147483648) / 4, e), r);
    var n = Module.reallocBuffer(TOTAL_MEMORY);
    return n && n.byteLength == TOTAL_MEMORY
      ? (updateGlobalBuffer(n), updateGlobalBufferViews(), !0)
      : ((TOTAL_MEMORY = i), !1);
  }
  (STATIC_BASE =
    STATICTOP =
    STACK_BASE =
    STACKTOP =
    STACK_MAX =
    DYNAMIC_BASE =
    DYNAMICTOP_PTR =
      0),
    (staticSealed = !1),
    Module.reallocBuffer ||
      (Module.reallocBuffer = function (e) {
        var r;
        try {
          if (ArrayBuffer.transfer) r = ArrayBuffer.transfer(buffer, e);
          else {
            var i = HEAP8;
            (r = new ArrayBuffer(e)), new Int8Array(r).set(i);
          }
        } catch (e) {
          return !1;
        }
        return !!_emscripten_replace_memory(r) && r;
      });
  try {
    (byteLength = Function.prototype.call.bind(
      Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength').get,
    )),
      byteLength(new ArrayBuffer(4));
  } catch (e) {
    byteLength = function (e) {
      return e.byteLength;
    };
  }
  var TOTAL_STACK = Module.TOTAL_STACK || 5242880,
    TOTAL_MEMORY = Module.TOTAL_MEMORY || 16777216;
  function getTotalMemory() {
    return TOTAL_MEMORY;
  }
  if (
    (TOTAL_MEMORY < TOTAL_STACK &&
      Module.printErr(
        'TOTAL_MEMORY should be larger than TOTAL_STACK, was ' +
          TOTAL_MEMORY +
          '! (TOTAL_STACK=' +
          TOTAL_STACK +
          ')',
      ),
    (buffer = Module.buffer ? Module.buffer : new ArrayBuffer(TOTAL_MEMORY)),
    updateGlobalBufferViews(),
    (HEAP32[0] = 1668509029),
    (HEAP16[1] = 25459),
    115 !== HEAPU8[2] || 99 !== HEAPU8[3])
  )
    throw 'Runtime error: expected the system to be little-endian!';
  function callRuntimeCallbacks(e) {
    for (; 0 < e.length; ) {
      var r = e.shift();
      if ('function' != typeof r) {
        var i = r.func;
        'number' == typeof i
          ? void 0 === r.arg
            ? Module.dynCall_v(i)
            : Module.dynCall_vi(i, r.arg)
          : i(void 0 === r.arg ? null : r.arg);
      } else r();
    }
  }
  (Module.HEAP = HEAP),
    (Module.buffer = buffer),
    (Module.HEAP8 = HEAP8),
    (Module.HEAP16 = HEAP16),
    (Module.HEAP32 = HEAP32),
    (Module.HEAPU8 = HEAPU8),
    (Module.HEAPU16 = HEAPU16),
    (Module.HEAPU32 = HEAPU32),
    (Module.HEAPF32 = HEAPF32),
    (Module.HEAPF64 = HEAPF64);
  var __ATPRERUN__ = [],
    __ATINIT__ = [],
    __ATMAIN__ = [],
    __ATEXIT__ = [],
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
  function ensureInitRuntime() {
    runtimeInitialized ||
      ((runtimeInitialized = !0), callRuntimeCallbacks(__ATINIT__));
  }
  function preMain() {
    callRuntimeCallbacks(__ATMAIN__);
  }
  function exitRuntime() {
    callRuntimeCallbacks(__ATEXIT__);
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
  function addOnInit(e) {
    __ATINIT__.unshift(e);
  }
  function addOnPreMain(e) {
    __ATMAIN__.unshift(e);
  }
  function addOnExit(e) {
    __ATEXIT__.unshift(e);
  }
  function addOnPostRun(e) {
    __ATPOSTRUN__.unshift(e);
  }
  function intArrayFromString(e, r, i) {
    var n = 0 < i ? i : lengthBytesUTF8(e) + 1,
      t = new Array(n),
      o = stringToUTF8Array(e, t, 0, t.length);
    return r && (t.length = o), t;
  }
  function intArrayToString(e) {
    for (var r = [], i = 0; i < e.length; i++) {
      var n = e[i];
      255 < n && (n &= 255), r.push(String.fromCharCode(n));
    }
    return r.join('');
  }
  function writeStringToMemory(e, r, i) {
    var n, t;
    Runtime.warnOnce(
      'writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!',
    ),
      i && ((t = r + lengthBytesUTF8(e)), (n = HEAP8[t])),
      stringToUTF8(e, r, 1 / 0),
      i && (HEAP8[t] = n);
  }
  function writeArrayToMemory(e, r) {
    HEAP8.set(e, r);
  }
  function writeAsciiToMemory(e, r, i) {
    for (var n = 0; n < e.length; ++n) HEAP8[r++ >> 0] = e.charCodeAt(n);
    i || (HEAP8[r >> 0] = 0);
  }
  (Module.addOnPreRun = addOnPreRun),
    (Module.addOnInit = addOnInit),
    (Module.addOnPreMain = addOnPreMain),
    (Module.addOnExit = addOnExit),
    (Module.addOnPostRun = addOnPostRun),
    (Module.intArrayFromString = intArrayFromString),
    (Module.intArrayToString = intArrayToString),
    (Module.writeStringToMemory = writeStringToMemory),
    (Module.writeArrayToMemory = writeArrayToMemory),
    (Module.writeAsciiToMemory = writeAsciiToMemory),
    (Math.imul && -5 === Math.imul(4294967295, 5)) ||
      (Math.imul = function (e, r) {
        var i = 65535 & e,
          n = 65535 & r;
        return (i * n + (((e >>> 16) * n + i * (r >>> 16)) << 16)) | 0;
      }),
    (Math.imul = Math.imul),
    Math.clz32 ||
      (Math.clz32 = function (e) {
        e >>>= 0;
        for (var r = 0; r < 32; r++) if (e & (1 << (31 - r))) return r;
        return 32;
      }),
    (Math.clz32 = Math.clz32),
    Math.trunc ||
      (Math.trunc = function (e) {
        return e < 0 ? Math.ceil(e) : Math.floor(e);
      }),
    (Math.trunc = Math.trunc);
  var Math_abs = Math.abs,
    Math_ceil = Math.ceil,
    Math_floor = Math.floor,
    Math_min = Math.min,
    runDependencies = 0,
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
      0 == runDependencies && dependenciesFulfilled)
    ) {
      var r = dependenciesFulfilled;
      (dependenciesFulfilled = null), r();
    }
  }
  (Module.addRunDependency = addRunDependency),
    (Module.removeRunDependency = removeRunDependency),
    (Module.preloadedImages = {}),
    (Module.preloadedAudios = {}),
    (STATIC_BASE = Runtime.GLOBAL_BASE),
    (STATICTOP = STATIC_BASE + 6192),
    __ATINIT__.push(),
    allocate(
      [
        228, 2, 0, 0, 81, 16, 0, 0, 12, 3, 0, 0, 177, 16, 0, 0, 32, 0, 0, 0, 0,
        0, 0, 0, 12, 3, 0, 0, 94, 16, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 228, 2, 0,
        0, 127, 16, 0, 0, 12, 3, 0, 0, 140, 16, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0,
        12, 3, 0, 0, 183, 17, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 12, 3, 0, 0, 147,
        17, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 108, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 32, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255,
        255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 248, 19,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 224, 1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
        0, 0, 0, 2, 0, 0, 0, 40, 20, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 255, 255, 255, 255, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255,
        255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3,
        0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 56, 0, 0, 0, 1, 0, 0, 0, 5, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0, 0, 5,
        0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 37, 115, 40, 37, 117, 41,
        58, 32, 65, 115, 115, 101, 114, 116, 105, 111, 110, 32, 102, 97, 105,
        108, 117, 114, 101, 58, 32, 34, 37, 115, 34, 10, 0, 109, 95, 115, 105,
        122, 101, 32, 60, 61, 32, 109, 95, 99, 97, 112, 97, 99, 105, 116, 121,
        0, 46, 47, 105, 110, 99, 92, 99, 114, 110, 95, 100, 101, 99, 111, 109,
        112, 46, 104, 0, 109, 105, 110, 95, 110, 101, 119, 95, 99, 97, 112, 97,
        99, 105, 116, 121, 32, 60, 32, 40, 48, 120, 55, 70, 70, 70, 48, 48, 48,
        48, 85, 32, 47, 32, 101, 108, 101, 109, 101, 110, 116, 95, 115, 105,
        122, 101, 41, 0, 110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116, 121,
        32, 38, 38, 32, 40, 110, 101, 119, 95, 99, 97, 112, 97, 99, 105, 116,
        121, 32, 62, 32, 109, 95, 99, 97, 112, 97, 99, 105, 116, 121, 41, 0,
        110, 117, 109, 95, 99, 111, 100, 101, 115, 91, 99, 93, 0, 115, 111, 114,
        116, 101, 100, 95, 112, 111, 115, 32, 60, 32, 116, 111, 116, 97, 108,
        95, 117, 115, 101, 100, 95, 115, 121, 109, 115, 0, 112, 67, 111, 100,
        101, 115, 105, 122, 101, 115, 91, 115, 121, 109, 95, 105, 110, 100, 101,
        120, 93, 32, 61, 61, 32, 99, 111, 100, 101, 115, 105, 122, 101, 0, 116,
        32, 60, 32, 40, 49, 85, 32, 60, 60, 32, 116, 97, 98, 108, 101, 95, 98,
        105, 116, 115, 41, 0, 109, 95, 108, 111, 111, 107, 117, 112, 91, 116,
        93, 32, 61, 61, 32, 99, 85, 73, 78, 84, 51, 50, 95, 77, 65, 88, 0, 99,
        114, 110, 100, 95, 109, 97, 108, 108, 111, 99, 58, 32, 115, 105, 122,
        101, 32, 116, 111, 111, 32, 98, 105, 103, 0, 99, 114, 110, 100, 95, 109,
        97, 108, 108, 111, 99, 58, 32, 111, 117, 116, 32, 111, 102, 32, 109,
        101, 109, 111, 114, 121, 0, 40, 40, 117, 105, 110, 116, 51, 50, 41, 112,
        95, 110, 101, 119, 32, 38, 32, 40, 67, 82, 78, 68, 95, 77, 73, 78, 95,
        65, 76, 76, 79, 67, 95, 65, 76, 73, 71, 78, 77, 69, 78, 84, 32, 45, 32,
        49, 41, 41, 32, 61, 61, 32, 48, 0, 99, 114, 110, 100, 95, 114, 101, 97,
        108, 108, 111, 99, 58, 32, 98, 97, 100, 32, 112, 116, 114, 0, 99, 114,
        110, 100, 95, 102, 114, 101, 101, 58, 32, 98, 97, 100, 32, 112, 116,
        114, 0, 102, 97, 108, 115, 101, 0, 40, 116, 111, 116, 97, 108, 95, 115,
        121, 109, 115, 32, 62, 61, 32, 49, 41, 32, 38, 38, 32, 40, 116, 111,
        116, 97, 108, 95, 115, 121, 109, 115, 32, 60, 61, 32, 112, 114, 101,
        102, 105, 120, 95, 99, 111, 100, 105, 110, 103, 58, 58, 99, 77, 97, 120,
        83, 117, 112, 112, 111, 114, 116, 101, 100, 83, 121, 109, 115, 41, 0,
        17, 18, 19, 20, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
        16, 48, 0, 110, 117, 109, 95, 98, 105, 116, 115, 32, 60, 61, 32, 51, 50,
        85, 0, 109, 95, 98, 105, 116, 95, 99, 111, 117, 110, 116, 32, 60, 61,
        32, 99, 66, 105, 116, 66, 117, 102, 83, 105, 122, 101, 0, 116, 32, 33,
        61, 32, 99, 85, 73, 78, 84, 51, 50, 95, 77, 65, 88, 0, 109, 111, 100,
        101, 108, 46, 109, 95, 99, 111, 100, 101, 95, 115, 105, 122, 101, 115,
        91, 115, 121, 109, 93, 32, 61, 61, 32, 108, 101, 110, 0, 0, 2, 3, 1, 0,
        2, 3, 4, 5, 6, 7, 1, 40, 108, 101, 110, 32, 62, 61, 32, 49, 41, 32, 38,
        38, 32, 40, 108, 101, 110, 32, 60, 61, 32, 99, 77, 97, 120, 69, 120,
        112, 101, 99, 116, 101, 100, 67, 111, 100, 101, 83, 105, 122, 101, 41,
        0, 105, 32, 60, 32, 109, 95, 115, 105, 122, 101, 0, 110, 101, 120, 116,
        95, 108, 101, 118, 101, 108, 95, 111, 102, 115, 32, 62, 32, 99, 117,
        114, 95, 108, 101, 118, 101, 108, 95, 111, 102, 115, 0, 1, 2, 2, 3, 3,
        3, 3, 4, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 2, 1, 2, 0, 0, 0,
        1, 0, 2, 1, 0, 2, 0, 0, 1, 2, 3, 110, 117, 109, 32, 38, 38, 32, 40, 110,
        117, 109, 32, 61, 61, 32, 126, 110, 117, 109, 95, 99, 104, 101, 99, 107,
        41, 0, 17, 0, 10, 0, 17, 17, 17, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 9, 0,
        0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 15, 10, 17, 17, 17, 3, 10,
        7, 0, 1, 19, 9, 11, 11, 0, 0, 9, 6, 11, 0, 0, 11, 0, 6, 17, 0, 0, 0, 17,
        17, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0,
        0, 0, 0, 0, 17, 0, 10, 10, 17, 17, 17, 0, 10, 0, 0, 2, 0, 9, 11, 0, 0,
        0, 9, 0, 11, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0,
        0, 0, 0, 12, 0, 0, 0, 0, 9, 12, 0, 0, 0, 0, 0, 12, 0, 0, 12, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 4, 13, 0, 0, 0, 0, 9, 14, 0, 0,
        0, 0, 0, 14, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0,
        0, 0, 0, 15, 0, 0, 0, 0, 9, 16, 0, 0, 0, 0, 0, 16, 0, 0, 16, 0, 0, 18,
        0, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 18, 18, 18, 0, 0, 0, 0, 0, 0, 9, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
        0, 0, 0, 0, 10, 0, 0, 0, 0, 9, 11, 0, 0, 0, 0, 0, 11, 0, 0, 11, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 12, 0, 0, 0, 0, 9, 12, 0,
        0, 0, 0, 0, 12, 0, 0, 12, 0, 0, 45, 43, 32, 32, 32, 48, 88, 48, 120, 0,
        40, 110, 117, 108, 108, 41, 0, 45, 48, 88, 43, 48, 88, 32, 48, 88, 45,
        48, 120, 43, 48, 120, 32, 48, 120, 0, 105, 110, 102, 0, 73, 78, 70, 0,
        110, 97, 110, 0, 78, 65, 78, 0, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
        65, 66, 67, 68, 69, 70, 46, 0, 84, 33, 34, 25, 13, 1, 2, 3, 17, 75, 28,
        12, 16, 4, 11, 29, 18, 30, 39, 104, 110, 111, 112, 113, 98, 32, 5, 6,
        15, 19, 20, 21, 26, 8, 22, 7, 40, 36, 23, 24, 9, 10, 14, 27, 31, 37, 35,
        131, 130, 125, 38, 42, 43, 60, 61, 62, 63, 67, 71, 74, 77, 88, 89, 90,
        91, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 105, 106, 107, 108,
        114, 115, 116, 121, 122, 123, 124, 0, 73, 108, 108, 101, 103, 97, 108,
        32, 98, 121, 116, 101, 32, 115, 101, 113, 117, 101, 110, 99, 101, 0, 68,
        111, 109, 97, 105, 110, 32, 101, 114, 114, 111, 114, 0, 82, 101, 115,
        117, 108, 116, 32, 110, 111, 116, 32, 114, 101, 112, 114, 101, 115, 101,
        110, 116, 97, 98, 108, 101, 0, 78, 111, 116, 32, 97, 32, 116, 116, 121,
        0, 80, 101, 114, 109, 105, 115, 115, 105, 111, 110, 32, 100, 101, 110,
        105, 101, 100, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 110,
        111, 116, 32, 112, 101, 114, 109, 105, 116, 116, 101, 100, 0, 78, 111,
        32, 115, 117, 99, 104, 32, 102, 105, 108, 101, 32, 111, 114, 32, 100,
        105, 114, 101, 99, 116, 111, 114, 121, 0, 78, 111, 32, 115, 117, 99,
        104, 32, 112, 114, 111, 99, 101, 115, 115, 0, 70, 105, 108, 101, 32,
        101, 120, 105, 115, 116, 115, 0, 86, 97, 108, 117, 101, 32, 116, 111,
        111, 32, 108, 97, 114, 103, 101, 32, 102, 111, 114, 32, 100, 97, 116,
        97, 32, 116, 121, 112, 101, 0, 78, 111, 32, 115, 112, 97, 99, 101, 32,
        108, 101, 102, 116, 32, 111, 110, 32, 100, 101, 118, 105, 99, 101, 0,
        79, 117, 116, 32, 111, 102, 32, 109, 101, 109, 111, 114, 121, 0, 82,
        101, 115, 111, 117, 114, 99, 101, 32, 98, 117, 115, 121, 0, 73, 110,
        116, 101, 114, 114, 117, 112, 116, 101, 100, 32, 115, 121, 115, 116,
        101, 109, 32, 99, 97, 108, 108, 0, 82, 101, 115, 111, 117, 114, 99, 101,
        32, 116, 101, 109, 112, 111, 114, 97, 114, 105, 108, 121, 32, 117, 110,
        97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 73, 110, 118, 97, 108, 105,
        100, 32, 115, 101, 101, 107, 0, 67, 114, 111, 115, 115, 45, 100, 101,
        118, 105, 99, 101, 32, 108, 105, 110, 107, 0, 82, 101, 97, 100, 45, 111,
        110, 108, 121, 32, 102, 105, 108, 101, 32, 115, 121, 115, 116, 101, 109,
        0, 68, 105, 114, 101, 99, 116, 111, 114, 121, 32, 110, 111, 116, 32,
        101, 109, 112, 116, 121, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111,
        110, 32, 114, 101, 115, 101, 116, 32, 98, 121, 32, 112, 101, 101, 114,
        0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 116, 105, 109, 101,
        100, 32, 111, 117, 116, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111,
        110, 32, 114, 101, 102, 117, 115, 101, 100, 0, 72, 111, 115, 116, 32,
        105, 115, 32, 100, 111, 119, 110, 0, 72, 111, 115, 116, 32, 105, 115,
        32, 117, 110, 114, 101, 97, 99, 104, 97, 98, 108, 101, 0, 65, 100, 100,
        114, 101, 115, 115, 32, 105, 110, 32, 117, 115, 101, 0, 66, 114, 111,
        107, 101, 110, 32, 112, 105, 112, 101, 0, 73, 47, 79, 32, 101, 114, 114,
        111, 114, 0, 78, 111, 32, 115, 117, 99, 104, 32, 100, 101, 118, 105, 99,
        101, 32, 111, 114, 32, 97, 100, 100, 114, 101, 115, 115, 0, 66, 108,
        111, 99, 107, 32, 100, 101, 118, 105, 99, 101, 32, 114, 101, 113, 117,
        105, 114, 101, 100, 0, 78, 111, 32, 115, 117, 99, 104, 32, 100, 101,
        118, 105, 99, 101, 0, 78, 111, 116, 32, 97, 32, 100, 105, 114, 101, 99,
        116, 111, 114, 121, 0, 73, 115, 32, 97, 32, 100, 105, 114, 101, 99, 116,
        111, 114, 121, 0, 84, 101, 120, 116, 32, 102, 105, 108, 101, 32, 98,
        117, 115, 121, 0, 69, 120, 101, 99, 32, 102, 111, 114, 109, 97, 116, 32,
        101, 114, 114, 111, 114, 0, 73, 110, 118, 97, 108, 105, 100, 32, 97,
        114, 103, 117, 109, 101, 110, 116, 0, 65, 114, 103, 117, 109, 101, 110,
        116, 32, 108, 105, 115, 116, 32, 116, 111, 111, 32, 108, 111, 110, 103,
        0, 83, 121, 109, 98, 111, 108, 105, 99, 32, 108, 105, 110, 107, 32, 108,
        111, 111, 112, 0, 70, 105, 108, 101, 110, 97, 109, 101, 32, 116, 111,
        111, 32, 108, 111, 110, 103, 0, 84, 111, 111, 32, 109, 97, 110, 121, 32,
        111, 112, 101, 110, 32, 102, 105, 108, 101, 115, 32, 105, 110, 32, 115,
        121, 115, 116, 101, 109, 0, 78, 111, 32, 102, 105, 108, 101, 32, 100,
        101, 115, 99, 114, 105, 112, 116, 111, 114, 115, 32, 97, 118, 97, 105,
        108, 97, 98, 108, 101, 0, 66, 97, 100, 32, 102, 105, 108, 101, 32, 100,
        101, 115, 99, 114, 105, 112, 116, 111, 114, 0, 78, 111, 32, 99, 104,
        105, 108, 100, 32, 112, 114, 111, 99, 101, 115, 115, 0, 66, 97, 100, 32,
        97, 100, 100, 114, 101, 115, 115, 0, 70, 105, 108, 101, 32, 116, 111,
        111, 32, 108, 97, 114, 103, 101, 0, 84, 111, 111, 32, 109, 97, 110, 121,
        32, 108, 105, 110, 107, 115, 0, 78, 111, 32, 108, 111, 99, 107, 115, 32,
        97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 82, 101, 115, 111, 117, 114,
        99, 101, 32, 100, 101, 97, 100, 108, 111, 99, 107, 32, 119, 111, 117,
        108, 100, 32, 111, 99, 99, 117, 114, 0, 83, 116, 97, 116, 101, 32, 110,
        111, 116, 32, 114, 101, 99, 111, 118, 101, 114, 97, 98, 108, 101, 0, 80,
        114, 101, 118, 105, 111, 117, 115, 32, 111, 119, 110, 101, 114, 32, 100,
        105, 101, 100, 0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 99, 97,
        110, 99, 101, 108, 101, 100, 0, 70, 117, 110, 99, 116, 105, 111, 110,
        32, 110, 111, 116, 32, 105, 109, 112, 108, 101, 109, 101, 110, 116, 101,
        100, 0, 78, 111, 32, 109, 101, 115, 115, 97, 103, 101, 32, 111, 102, 32,
        100, 101, 115, 105, 114, 101, 100, 32, 116, 121, 112, 101, 0, 73, 100,
        101, 110, 116, 105, 102, 105, 101, 114, 32, 114, 101, 109, 111, 118,
        101, 100, 0, 68, 101, 118, 105, 99, 101, 32, 110, 111, 116, 32, 97, 32,
        115, 116, 114, 101, 97, 109, 0, 78, 111, 32, 100, 97, 116, 97, 32, 97,
        118, 97, 105, 108, 97, 98, 108, 101, 0, 68, 101, 118, 105, 99, 101, 32,
        116, 105, 109, 101, 111, 117, 116, 0, 79, 117, 116, 32, 111, 102, 32,
        115, 116, 114, 101, 97, 109, 115, 32, 114, 101, 115, 111, 117, 114, 99,
        101, 115, 0, 76, 105, 110, 107, 32, 104, 97, 115, 32, 98, 101, 101, 110,
        32, 115, 101, 118, 101, 114, 101, 100, 0, 80, 114, 111, 116, 111, 99,
        111, 108, 32, 101, 114, 114, 111, 114, 0, 66, 97, 100, 32, 109, 101,
        115, 115, 97, 103, 101, 0, 70, 105, 108, 101, 32, 100, 101, 115, 99,
        114, 105, 112, 116, 111, 114, 32, 105, 110, 32, 98, 97, 100, 32, 115,
        116, 97, 116, 101, 0, 78, 111, 116, 32, 97, 32, 115, 111, 99, 107, 101,
        116, 0, 68, 101, 115, 116, 105, 110, 97, 116, 105, 111, 110, 32, 97,
        100, 100, 114, 101, 115, 115, 32, 114, 101, 113, 117, 105, 114, 101,
        100, 0, 77, 101, 115, 115, 97, 103, 101, 32, 116, 111, 111, 32, 108, 97,
        114, 103, 101, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 119, 114,
        111, 110, 103, 32, 116, 121, 112, 101, 32, 102, 111, 114, 32, 115, 111,
        99, 107, 101, 116, 0, 80, 114, 111, 116, 111, 99, 111, 108, 32, 110,
        111, 116, 32, 97, 118, 97, 105, 108, 97, 98, 108, 101, 0, 80, 114, 111,
        116, 111, 99, 111, 108, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111,
        114, 116, 101, 100, 0, 83, 111, 99, 107, 101, 116, 32, 116, 121, 112,
        101, 32, 110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100,
        0, 78, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 80,
        114, 111, 116, 111, 99, 111, 108, 32, 102, 97, 109, 105, 108, 121, 32,
        110, 111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 0, 65,
        100, 100, 114, 101, 115, 115, 32, 102, 97, 109, 105, 108, 121, 32, 110,
        111, 116, 32, 115, 117, 112, 112, 111, 114, 116, 101, 100, 32, 98, 121,
        32, 112, 114, 111, 116, 111, 99, 111, 108, 0, 65, 100, 100, 114, 101,
        115, 115, 32, 110, 111, 116, 32, 97, 118, 97, 105, 108, 97, 98, 108,
        101, 0, 78, 101, 116, 119, 111, 114, 107, 32, 105, 115, 32, 100, 111,
        119, 110, 0, 78, 101, 116, 119, 111, 114, 107, 32, 117, 110, 114, 101,
        97, 99, 104, 97, 98, 108, 101, 0, 67, 111, 110, 110, 101, 99, 116, 105,
        111, 110, 32, 114, 101, 115, 101, 116, 32, 98, 121, 32, 110, 101, 116,
        119, 111, 114, 107, 0, 67, 111, 110, 110, 101, 99, 116, 105, 111, 110,
        32, 97, 98, 111, 114, 116, 101, 100, 0, 78, 111, 32, 98, 117, 102, 102,
        101, 114, 32, 115, 112, 97, 99, 101, 32, 97, 118, 97, 105, 108, 97, 98,
        108, 101, 0, 83, 111, 99, 107, 101, 116, 32, 105, 115, 32, 99, 111, 110,
        110, 101, 99, 116, 101, 100, 0, 83, 111, 99, 107, 101, 116, 32, 110,
        111, 116, 32, 99, 111, 110, 110, 101, 99, 116, 101, 100, 0, 67, 97, 110,
        110, 111, 116, 32, 115, 101, 110, 100, 32, 97, 102, 116, 101, 114, 32,
        115, 111, 99, 107, 101, 116, 32, 115, 104, 117, 116, 100, 111, 119, 110,
        0, 79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 97, 108, 114, 101, 97,
        100, 121, 32, 105, 110, 32, 112, 114, 111, 103, 114, 101, 115, 115, 0,
        79, 112, 101, 114, 97, 116, 105, 111, 110, 32, 105, 110, 32, 112, 114,
        111, 103, 114, 101, 115, 115, 0, 83, 116, 97, 108, 101, 32, 102, 105,
        108, 101, 32, 104, 97, 110, 100, 108, 101, 0, 82, 101, 109, 111, 116,
        101, 32, 73, 47, 79, 32, 101, 114, 114, 111, 114, 0, 81, 117, 111, 116,
        97, 32, 101, 120, 99, 101, 101, 100, 101, 100, 0, 78, 111, 32, 109, 101,
        100, 105, 117, 109, 32, 102, 111, 117, 110, 100, 0, 87, 114, 111, 110,
        103, 32, 109, 101, 100, 105, 117, 109, 32, 116, 121, 112, 101, 0, 78,
        111, 32, 101, 114, 114, 111, 114, 32, 105, 110, 102, 111, 114, 109, 97,
        116, 105, 111, 110, 0, 0, 116, 101, 114, 109, 105, 110, 97, 116, 105,
        110, 103, 32, 119, 105, 116, 104, 32, 37, 115, 32, 101, 120, 99, 101,
        112, 116, 105, 111, 110, 32, 111, 102, 32, 116, 121, 112, 101, 32, 37,
        115, 58, 32, 37, 115, 0, 116, 101, 114, 109, 105, 110, 97, 116, 105,
        110, 103, 32, 119, 105, 116, 104, 32, 37, 115, 32, 101, 120, 99, 101,
        112, 116, 105, 111, 110, 32, 111, 102, 32, 116, 121, 112, 101, 32, 37,
        115, 0, 116, 101, 114, 109, 105, 110, 97, 116, 105, 110, 103, 32, 119,
        105, 116, 104, 32, 37, 115, 32, 102, 111, 114, 101, 105, 103, 110, 32,
        101, 120, 99, 101, 112, 116, 105, 111, 110, 0, 116, 101, 114, 109, 105,
        110, 97, 116, 105, 110, 103, 0, 117, 110, 99, 97, 117, 103, 104, 116, 0,
        83, 116, 57, 101, 120, 99, 101, 112, 116, 105, 111, 110, 0, 78, 49, 48,
        95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 49, 54, 95, 95, 115, 104,
        105, 109, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 83,
        116, 57, 116, 121, 112, 101, 95, 105, 110, 102, 111, 0, 78, 49, 48, 95,
        95, 99, 120, 120, 97, 98, 105, 118, 49, 50, 48, 95, 95, 115, 105, 95,
        99, 108, 97, 115, 115, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111,
        69, 0, 78, 49, 48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 49, 55,
        95, 95, 99, 108, 97, 115, 115, 95, 116, 121, 112, 101, 95, 105, 110,
        102, 111, 69, 0, 112, 116, 104, 114, 101, 97, 100, 95, 111, 110, 99,
        101, 32, 102, 97, 105, 108, 117, 114, 101, 32, 105, 110, 32, 95, 95, 99,
        120, 97, 95, 103, 101, 116, 95, 103, 108, 111, 98, 97, 108, 115, 95,
        102, 97, 115, 116, 40, 41, 0, 99, 97, 110, 110, 111, 116, 32, 99, 114,
        101, 97, 116, 101, 32, 112, 116, 104, 114, 101, 97, 100, 32, 107, 101,
        121, 32, 102, 111, 114, 32, 95, 95, 99, 120, 97, 95, 103, 101, 116, 95,
        103, 108, 111, 98, 97, 108, 115, 40, 41, 0, 99, 97, 110, 110, 111, 116,
        32, 122, 101, 114, 111, 32, 111, 117, 116, 32, 116, 104, 114, 101, 97,
        100, 32, 118, 97, 108, 117, 101, 32, 102, 111, 114, 32, 95, 95, 99, 120,
        97, 95, 103, 101, 116, 95, 103, 108, 111, 98, 97, 108, 115, 40, 41, 0,
        116, 101, 114, 109, 105, 110, 97, 116, 101, 95, 104, 97, 110, 100, 108,
        101, 114, 32, 117, 110, 101, 120, 112, 101, 99, 116, 101, 100, 108, 121,
        32, 114, 101, 116, 117, 114, 110, 101, 100, 0, 78, 49, 48, 95, 95, 99,
        120, 120, 97, 98, 105, 118, 49, 49, 57, 95, 95, 112, 111, 105, 110, 116,
        101, 114, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0, 78, 49,
        48, 95, 95, 99, 120, 120, 97, 98, 105, 118, 49, 49, 55, 95, 95, 112, 98,
        97, 115, 101, 95, 116, 121, 112, 101, 95, 105, 110, 102, 111, 69, 0,
      ],
      'i8',
      ALLOC_NONE,
      Runtime.GLOBAL_BASE,
    );
  var tempDoublePtr = STATICTOP;
  function _abort() {
    Module.abort();
  }
  function __ZSt18uncaught_exceptionv() {
    return !!__ZSt18uncaught_exceptionv.uncaught_exception;
  }
  STATICTOP += 16;
  var EXCEPTIONS = {
    last: 0,
    caught: [],
    infos: {},
    deAdjust: function (e) {
      if (!e || EXCEPTIONS.infos[e]) return e;
      for (var r in EXCEPTIONS.infos)
        if (EXCEPTIONS.infos[r].adjusted === e) return r;
      return e;
    },
    addRef: function (e) {
      e && EXCEPTIONS.infos[e].refcount++;
    },
    decRef: function (e) {
      if (e) {
        var r = EXCEPTIONS.infos[e];
        assert(0 < r.refcount),
          r.refcount--,
          0 !== r.refcount ||
            r.rethrown ||
            (r.destructor && Module.dynCall_vi(r.destructor, e),
            delete EXCEPTIONS.infos[e],
            ___cxa_free_exception(e));
      }
    },
    clearRef: function (e) {
      e && (EXCEPTIONS.infos[e].refcount = 0);
    },
  };
  function ___cxa_begin_catch(e) {
    var r = EXCEPTIONS.infos[e];
    return (
      r &&
        !r.caught &&
        ((r.caught = !0), __ZSt18uncaught_exceptionv.uncaught_exception--),
      r && (r.rethrown = !1),
      EXCEPTIONS.caught.push(e),
      EXCEPTIONS.addRef(EXCEPTIONS.deAdjust(e)),
      e
    );
  }
  function _pthread_once(e, r) {
    _pthread_once.seen || (_pthread_once.seen = {}),
      e in _pthread_once.seen ||
        (Module.dynCall_v(r), (_pthread_once.seen[e] = 1));
  }
  function _emscripten_memcpy_big(e, r, i) {
    return HEAPU8.set(HEAPU8.subarray(r, r + i), e), e;
  }
  var SYSCALLS = {
    varargs: 0,
    get: function (e) {
      return (SYSCALLS.varargs += 4), HEAP32[(SYSCALLS.varargs - 4) >> 2];
    },
    getStr: function () {
      return Pointer_stringify(SYSCALLS.get());
    },
    get64: function () {
      var e = SYSCALLS.get(),
        r = SYSCALLS.get();
      return assert(0 <= e ? 0 === r : -1 === r), e;
    },
    getZero: function () {
      assert(0 === SYSCALLS.get());
    },
  };
  function ___syscall6(e, r) {
    SYSCALLS.varargs = r;
    try {
      var i = SYSCALLS.getStreamFromFD();
      return FS.close(i), 0;
    } catch (e) {
      return (
        ('undefined' != typeof FS && e instanceof FS.ErrnoError) || abort(e),
        -e.errno
      );
    }
  }
  var cttz_i8 = allocate(
      [
        8, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0,
        3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,
        4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0,
        3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,
        5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0,
        3, 0, 1, 0, 2, 0, 1, 0, 7, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,
        4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0,
        3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,
        6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0,
        3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,
        4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0,
      ],
      'i8',
      ALLOC_STATIC,
    ),
    PTHREAD_SPECIFIC = {};
  function _pthread_getspecific(e) {
    return PTHREAD_SPECIFIC[e] || 0;
  }
  function ___setErrNo(e) {
    return (
      Module.___errno_location && (HEAP32[Module.___errno_location() >> 2] = e),
      e
    );
  }
  var PTHREAD_SPECIFIC_NEXT_KEY = 1,
    ERRNO_CODES = {
      EPERM: 1,
      ENOENT: 2,
      ESRCH: 3,
      EINTR: 4,
      EIO: 5,
      ENXIO: 6,
      E2BIG: 7,
      ENOEXEC: 8,
      EBADF: 9,
      ECHILD: 10,
      EAGAIN: 11,
      EWOULDBLOCK: 11,
      ENOMEM: 12,
      EACCES: 13,
      EFAULT: 14,
      ENOTBLK: 15,
      EBUSY: 16,
      EEXIST: 17,
      EXDEV: 18,
      ENODEV: 19,
      ENOTDIR: 20,
      EISDIR: 21,
      EINVAL: 22,
      ENFILE: 23,
      EMFILE: 24,
      ENOTTY: 25,
      ETXTBSY: 26,
      EFBIG: 27,
      ENOSPC: 28,
      ESPIPE: 29,
      EROFS: 30,
      EMLINK: 31,
      EPIPE: 32,
      EDOM: 33,
      ERANGE: 34,
      ENOMSG: 42,
      EIDRM: 43,
      ECHRNG: 44,
      EL2NSYNC: 45,
      EL3HLT: 46,
      EL3RST: 47,
      ELNRNG: 48,
      EUNATCH: 49,
      ENOCSI: 50,
      EL2HLT: 51,
      EDEADLK: 35,
      ENOLCK: 37,
      EBADE: 52,
      EBADR: 53,
      EXFULL: 54,
      ENOANO: 55,
      EBADRQC: 56,
      EBADSLT: 57,
      EDEADLOCK: 35,
      EBFONT: 59,
      ENOSTR: 60,
      ENODATA: 61,
      ETIME: 62,
      ENOSR: 63,
      ENONET: 64,
      ENOPKG: 65,
      EREMOTE: 66,
      ENOLINK: 67,
      EADV: 68,
      ESRMNT: 69,
      ECOMM: 70,
      EPROTO: 71,
      EMULTIHOP: 72,
      EDOTDOT: 73,
      EBADMSG: 74,
      ENOTUNIQ: 76,
      EBADFD: 77,
      EREMCHG: 78,
      ELIBACC: 79,
      ELIBBAD: 80,
      ELIBSCN: 81,
      ELIBMAX: 82,
      ELIBEXEC: 83,
      ENOSYS: 38,
      ENOTEMPTY: 39,
      ENAMETOOLONG: 36,
      ELOOP: 40,
      EOPNOTSUPP: 95,
      EPFNOSUPPORT: 96,
      ECONNRESET: 104,
      ENOBUFS: 105,
      EAFNOSUPPORT: 97,
      EPROTOTYPE: 91,
      ENOTSOCK: 88,
      ENOPROTOOPT: 92,
      ESHUTDOWN: 108,
      ECONNREFUSED: 111,
      EADDRINUSE: 98,
      ECONNABORTED: 103,
      ENETUNREACH: 101,
      ENETDOWN: 100,
      ETIMEDOUT: 110,
      EHOSTDOWN: 112,
      EHOSTUNREACH: 113,
      EINPROGRESS: 115,
      EALREADY: 114,
      EDESTADDRREQ: 89,
      EMSGSIZE: 90,
      EPROTONOSUPPORT: 93,
      ESOCKTNOSUPPORT: 94,
      EADDRNOTAVAIL: 99,
      ENETRESET: 102,
      EISCONN: 106,
      ENOTCONN: 107,
      ETOOMANYREFS: 109,
      EUSERS: 87,
      EDQUOT: 122,
      ESTALE: 116,
      ENOTSUP: 95,
      ENOMEDIUM: 123,
      EILSEQ: 84,
      EOVERFLOW: 75,
      ECANCELED: 125,
      ENOTRECOVERABLE: 131,
      EOWNERDEAD: 130,
      ESTRPIPE: 86,
    };
  function _pthread_key_create(e, r) {
    return 0 == e
      ? ERRNO_CODES.EINVAL
      : ((HEAP32[e >> 2] = PTHREAD_SPECIFIC_NEXT_KEY),
        (PTHREAD_SPECIFIC[PTHREAD_SPECIFIC_NEXT_KEY] = 0),
        PTHREAD_SPECIFIC_NEXT_KEY++,
        0);
  }
  function ___resumeException(e) {
    throw (
      (EXCEPTIONS.last || (EXCEPTIONS.last = e),
      e +
        ' - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.')
    );
  }
  function ___cxa_find_matching_catch() {
    var e = EXCEPTIONS.last;
    if (!e) return 0 | (Runtime.setTempRet0(0), 0);
    var r = EXCEPTIONS.infos[e],
      i = r.type;
    if (!i) return 0 | (Runtime.setTempRet0(0), e);
    var n = Array.prototype.slice.call(arguments);
    Module.___cxa_is_pointer_type(i),
      ___cxa_find_matching_catch.buffer ||
        (___cxa_find_matching_catch.buffer = _malloc(4)),
      (HEAP32[___cxa_find_matching_catch.buffer >> 2] = e),
      (e = ___cxa_find_matching_catch.buffer);
    for (var t = 0; t < n.length; t++)
      if (n[t] && Module.___cxa_can_catch(n[t], i, e))
        return (
          (e = HEAP32[e >> 2]),
          (r.adjusted = e),
          0 | (Runtime.setTempRet0(n[t]), e)
        );
    return (e = HEAP32[e >> 2]), 0 | (Runtime.setTempRet0(i), e);
  }
  function ___gxx_personality_v0() {}
  function _pthread_setspecific(e, r) {
    return e in PTHREAD_SPECIFIC
      ? ((PTHREAD_SPECIFIC[e] = r), 0)
      : ERRNO_CODES.EINVAL;
  }
  function ___syscall140(e, r) {
    SYSCALLS.varargs = r;
    try {
      var i = SYSCALLS.getStreamFromFD(),
        n = (SYSCALLS.get(), SYSCALLS.get()),
        t = SYSCALLS.get(),
        o = SYSCALLS.get(),
        a = n;
      return (
        FS.llseek(i, a, o),
        (HEAP32[t >> 2] = i.position),
        i.getdents && 0 === a && 0 === o && (i.getdents = null),
        0
      );
    } catch (e) {
      return (
        ('undefined' != typeof FS && e instanceof FS.ErrnoError) || abort(e),
        -e.errno
      );
    }
  }
  function ___syscall146(e, r) {
    SYSCALLS.varargs = r;
    try {
      var i = SYSCALLS.get(),
        n = SYSCALLS.get(),
        t = SYSCALLS.get(),
        o = 0;
      ___syscall146.buffer ||
        ((___syscall146.buffers = [null, [], []]),
        (___syscall146.printChar = function (e, r) {
          var i = ___syscall146.buffers[e];
          assert(i),
            0 === r || 10 === r
              ? ((1 === e ? Module.print : Module.printErr)(
                  UTF8ArrayToString(i, 0),
                ),
                (i.length = 0))
              : i.push(r);
        }));
      for (var a = 0; a < t; a++) {
        for (
          var u = HEAP32[(n + 8 * a) >> 2],
            f = HEAP32[(n + (8 * a + 4)) >> 2],
            l = 0;
          l < f;
          l++
        )
          ___syscall146.printChar(i, HEAPU8[u + l]);
        o += f;
      }
      return o;
    } catch (e) {
      return (
        ('undefined' != typeof FS && e instanceof FS.ErrnoError) || abort(e),
        -e.errno
      );
    }
  }
  function ___syscall54(e, r) {
    SYSCALLS.varargs = r;
    try {
      return 0;
    } catch (e) {
      return (
        ('undefined' != typeof FS && e instanceof FS.ErrnoError) || abort(e),
        -e.errno
      );
    }
  }
  function invoke_iiii(e, r, i, n) {
    try {
      return Module.dynCall_iiii(e, r, i, n);
    } catch (e) {
      if ('number' != typeof e && 'longjmp' !== e) throw e;
      Module.setThrew(1, 0);
    }
  }
  function invoke_viiiii(e, r, i, n, t, o) {
    try {
      Module.dynCall_viiiii(e, r, i, n, t, o);
    } catch (e) {
      if ('number' != typeof e && 'longjmp' !== e) throw e;
      Module.setThrew(1, 0);
    }
  }
  function invoke_vi(e, r) {
    try {
      Module.dynCall_vi(e, r);
    } catch (e) {
      if ('number' != typeof e && 'longjmp' !== e) throw e;
      Module.setThrew(1, 0);
    }
  }
  function invoke_ii(e, r) {
    try {
      return Module.dynCall_ii(e, r);
    } catch (e) {
      if ('number' != typeof e && 'longjmp' !== e) throw e;
      Module.setThrew(1, 0);
    }
  }
  function invoke_viii(e, r, i, n) {
    try {
      Module.dynCall_viii(e, r, i, n);
    } catch (e) {
      if ('number' != typeof e && 'longjmp' !== e) throw e;
      Module.setThrew(1, 0);
    }
  }
  function invoke_v(e) {
    try {
      Module.dynCall_v(e);
    } catch (e) {
      if ('number' != typeof e && 'longjmp' !== e) throw e;
      Module.setThrew(1, 0);
    }
  }
  function invoke_viiiiii(e, r, i, n, t, o, a) {
    try {
      Module.dynCall_viiiiii(e, r, i, n, t, o, a);
    } catch (e) {
      if ('number' != typeof e && 'longjmp' !== e) throw e;
      Module.setThrew(1, 0);
    }
  }
  function invoke_viiii(e, r, i, n, t) {
    try {
      Module.dynCall_viiii(e, r, i, n, t);
    } catch (e) {
      if ('number' != typeof e && 'longjmp' !== e) throw e;
      Module.setThrew(1, 0);
    }
  }
  __ATEXIT__.push(function () {
    var e = Module._fflush;
    e && e(0);
    var r = ___syscall146.printChar;
    if (r) {
      var i = ___syscall146.buffers;
      i[1].length && r(1, 10), i[2].length && r(2, 10);
    }
  }),
    (DYNAMICTOP_PTR = allocate(1, 'i32', ALLOC_STATIC)),
    (STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP)),
    (STACK_MAX = STACK_BASE + TOTAL_STACK),
    (DYNAMIC_BASE = Runtime.alignMemory(STACK_MAX)),
    (HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE),
    (staticSealed = !0),
    (Module.asmGlobalArg = {
      Math,
      Int8Array,
      Int16Array,
      Int32Array,
      Uint8Array,
      Uint16Array,
      Uint32Array,
      Float32Array,
      Float64Array,
      NaN: NaN,
      Infinity: 1 / 0,
      byteLength,
    }),
    (Module.asmLibraryArg = {
      abort,
      assert,
      enlargeMemory,
      getTotalMemory,
      abortOnCannotGrowMemory,
      invoke_iiii,
      invoke_viiiii,
      invoke_vi,
      invoke_ii,
      invoke_viii,
      invoke_v,
      invoke_viiiiii,
      invoke_viiii,
      _pthread_getspecific,
      ___syscall54,
      _pthread_setspecific,
      ___gxx_personality_v0,
      ___syscall6,
      ___setErrNo,
      _abort,
      ___cxa_begin_catch,
      _pthread_once,
      _emscripten_memcpy_big,
      _pthread_key_create,
      ___syscall140,
      ___resumeException,
      ___cxa_find_matching_catch,
      ___syscall146,
      __ZSt18uncaught_exceptionv,
      DYNAMICTOP_PTR,
      tempDoublePtr,
      ABORT,
      STACKTOP,
      STACK_MAX,
      cttz_i8,
    });
  var asm = (function (e, r, i) {
      var n = e.Int8Array,
        t = new n(i),
        o = e.Int16Array,
        a = new o(i),
        u = e.Int32Array,
        f = new u(i),
        l = e.Uint8Array,
        c = new l(i),
        s = e.Uint16Array,
        _ = new s(i),
        d = e.Uint32Array,
        E = (new d(i), e.Float32Array),
        M = (new E(i), e.Float64Array),
        T = new M(i),
        A = e.byteLength,
        b = 0 | r.DYNAMICTOP_PTR,
        h = 0 | r.tempDoublePtr,
        m = (r.ABORT, 0 | r.STACKTOP),
        p = (r.STACK_MAX, 0 | r.cttz_i8),
        v = (e.NaN, e.Infinity, 0),
        S =
          (e.Math.floor,
          e.Math.abs,
          e.Math.sqrt,
          e.Math.pow,
          e.Math.cos,
          e.Math.sin,
          e.Math.tan,
          e.Math.acos,
          e.Math.asin,
          e.Math.atan,
          e.Math.atan2,
          e.Math.exp,
          e.Math.log,
          e.Math.ceil,
          e.Math.imul),
        k = (e.Math.min, e.Math.max, e.Math.clz32),
        y = r.abort,
        R = (r.assert, r.enlargeMemory),
        g = r.getTotalMemory,
        O = r.abortOnCannotGrowMemory,
        C =
          (r.invoke_iiii,
          r.invoke_viiiii,
          r.invoke_vi,
          r.invoke_ii,
          r.invoke_viii,
          r.invoke_v,
          r.invoke_viiiiii,
          r.invoke_viiii,
          r._pthread_getspecific),
        N = r.___syscall54,
        P = r._pthread_setspecific,
        w = (r.___gxx_personality_v0, r.___syscall6),
        I = r.___setErrNo,
        L = r._abort,
        D = (r.___cxa_begin_catch, r._pthread_once),
        F = r._emscripten_memcpy_big,
        U = r._pthread_key_create,
        H = r.___syscall140,
        x =
          (r.___resumeException, r.___cxa_find_matching_catch, r.___syscall146);
      function B(e) {
        e |= 0;
        var r,
          i = 0,
          n = 0,
          t = 0,
          o = 0,
          a = 0,
          u = 0,
          l = 0,
          c = 0,
          s = 0,
          _ = 0,
          d = 0,
          E = 0,
          M = 0,
          T = 0,
          A = 0,
          b = 0,
          h = 0,
          p = 0,
          v = 0,
          S = 0;
        (m = ((r = m) + 16) | 0), (E = r);
        do {
          if (e >>> 0 < 245) {
            if (
              ((e = (s = e >>> 0 < 11 ? 16 : (e + 11) & -8) >>> 3),
              (3 & (n = (d = 0 | f[1144]) >>> e)) | 0)
            )
              return (
                (t =
                  0 |
                  f[
                    (n =
                      (8 +
                        (e =
                          (4616 + (((i = (((1 & n) ^ 1) + e) | 0) << 1) << 2)) |
                          0)) |
                      0) >> 2
                  ]),
                (0 | e) == (0 | (a = 0 | f[(o = (t + 8) | 0) >> 2]))
                  ? (f[1144] = d & ~(1 << i))
                  : ((f[(a + 12) >> 2] = e), (f[n >> 2] = a)),
                (S = i << 3),
                (f[(t + 4) >> 2] = 3 | S),
                (f[(S = (t + S + 4) | 0) >> 2] = 1 | f[S >> 2]),
                (m = r),
                0 | o
              );
            if ((_ = 0 | f[1146]) >>> 0 < s >>> 0) {
              if (0 | n)
                return (
                  (i =
                    (((i = (n << e) & ((i = 2 << e) | (0 - i))) & (0 - i)) -
                      1) |
                    0),
                  (o =
                    0 |
                    f[
                      (e =
                        (8 +
                          (i =
                            (4616 +
                              (((t =
                                (((n =
                                  ((i >>>= u = (i >>> 12) & 16) >>> 5) & 8) |
                                  u |
                                  (o = ((i >>>= n) >>> 2) & 4) |
                                  (e = ((i >>>= o) >>> 1) & 2) |
                                  (t = ((i >>>= e) >>> 1) & 1)) +
                                  (i >>> t)) |
                                0) <<
                                1) <<
                                2)) |
                            0)) |
                        0) >> 2
                    ]),
                  (0 | i) == (0 | (n = 0 | f[(u = (o + 8) | 0) >> 2]))
                    ? ((e = d & ~(1 << t)), (f[1144] = e))
                    : ((f[(n + 12) >> 2] = i), (f[e >> 2] = n), (e = d)),
                  (a = ((t << 3) - s) | 0),
                  (f[(o + 4) >> 2] = 3 | s),
                  (f[(4 + (t = (o + s) | 0)) >> 2] = 1 | a),
                  (f[(t + a) >> 2] = a),
                  0 | _ &&
                    ((o = 0 | f[1149]),
                    (n = (4616 + (((i = _ >>> 3) << 1) << 2)) | 0),
                    e & (i = 1 << i)
                      ? (i = 0 | f[(e = (n + 8) | 0) >> 2])
                      : ((f[1144] = e | i), (e = ((i = n) + 8) | 0)),
                    (f[e >> 2] = o),
                    (f[(i + 12) >> 2] = o),
                    (f[(o + 8) >> 2] = i),
                    (f[(o + 12) >> 2] = n)),
                  (f[1146] = a),
                  (f[1149] = t),
                  (m = r),
                  0 | u
                );
              if ((l = 0 | f[1145])) {
                if (
                  ((n = ((l & (0 - l)) - 1) | 0),
                  (e =
                    0 |
                    f[
                      (4880 +
                        ((((a = ((n >>>= u = (n >>> 12) & 16) >>> 5) & 8) |
                          u |
                          (c = ((n >>>= a) >>> 2) & 4) |
                          (t = ((n >>>= c) >>> 1) & 2) |
                          (e = ((n >>>= t) >>> 1) & 1)) +
                          (n >>> e)) <<
                          2)) >>
                        2
                    ]),
                  (n = ((-8 & f[(e + 4) >> 2]) - s) | 0),
                  (t =
                    0 |
                    f[
                      (e + 16 + (((0 == (0 | f[(e + 16) >> 2])) & 1) << 2)) >> 2
                    ]))
                ) {
                  for (
                    ;
                    (n = (c =
                      (u = ((-8 & f[(t + 4) >> 2]) - s) | 0) >>> 0 < n >>> 0)
                      ? u
                      : n),
                      (e = c ? t : e),
                      0 !=
                        (0 |
                          (t =
                            0 |
                            f[
                              (t +
                                16 +
                                (((0 == (0 | f[(t + 16) >> 2])) & 1) << 2)) >>
                                2
                            ]));

                  );
                  (c = e), (a = n);
                } else (c = e), (a = n);
                if (c >>> 0 < (u = (c + s) | 0) >>> 0) {
                  (o = 0 | f[(c + 24) >> 2]), (i = 0 | f[(c + 12) >> 2]);
                  do {
                    if ((0 | i) == (0 | c)) {
                      if (
                        !(i = 0 | f[(e = (c + 20) | 0) >> 2]) &&
                        !(i = 0 | f[(e = (c + 16) | 0) >> 2])
                      ) {
                        n = 0;
                        break;
                      }
                      for (;;)
                        if (0 | (t = 0 | f[(n = (i + 20) | 0) >> 2]))
                          (i = t), (e = n);
                        else {
                          if (!(t = 0 | f[(n = (i + 16) | 0) >> 2])) break;
                          (i = t), (e = n);
                        }
                      (f[e >> 2] = 0), (n = i);
                    } else
                      (n = 0 | f[(c + 8) >> 2]),
                        (f[(n + 12) >> 2] = i),
                        (f[(i + 8) >> 2] = n),
                        (n = i);
                  } while (0);
                  do {
                    if (0 | o) {
                      if (
                        ((i = 0 | f[(c + 28) >> 2]),
                        (0 | c) == (0 | f[(e = (4880 + (i << 2)) | 0) >> 2]))
                      ) {
                        if (!(f[e >> 2] = n)) {
                          f[1145] = l & ~(1 << i);
                          break;
                        }
                      } else if (
                        !(f[
                          (o +
                            16 +
                            ((((0 | f[(o + 16) >> 2]) != (0 | c)) & 1) << 2)) >>
                            2
                        ] = n)
                      )
                        break;
                      (f[(n + 24) >> 2] = o),
                        0 | (i = 0 | f[(c + 16) >> 2]) &&
                          ((f[(n + 16) >> 2] = i), (f[(i + 24) >> 2] = n)),
                        0 | (i = 0 | f[(c + 20) >> 2]) &&
                          ((f[(n + 20) >> 2] = i), (f[(i + 24) >> 2] = n));
                    }
                  } while (0);
                  return (
                    a >>> 0 < 16
                      ? ((S = (a + s) | 0),
                        (f[(c + 4) >> 2] = 3 | S),
                        (f[(S = (c + S + 4) | 0) >> 2] = 1 | f[S >> 2]))
                      : ((f[(c + 4) >> 2] = 3 | s),
                        (f[(u + 4) >> 2] = 1 | a),
                        (f[(u + a) >> 2] = a),
                        0 | _ &&
                          ((t = 0 | f[1149]),
                          (n = (4616 + (((i = _ >>> 3) << 1) << 2)) | 0),
                          d & (i = 1 << i)
                            ? (i = 0 | f[(e = (n + 8) | 0) >> 2])
                            : ((f[1144] = d | i), (e = ((i = n) + 8) | 0)),
                          (f[e >> 2] = t),
                          (f[(i + 12) >> 2] = t),
                          (f[(t + 8) >> 2] = i),
                          (f[(t + 12) >> 2] = n)),
                        (f[1146] = a),
                        (f[1149] = u)),
                    (m = r),
                    0 | (c + 8)
                  );
                }
                d = s;
              } else d = s;
            } else d = s;
          } else if (e >>> 0 <= 4294967231)
            if (((s = -8 & (e = (e + 11) | 0)), (c = 0 | f[1145]))) {
              (t = (0 - s) | 0),
                (l = (e >>>= 8)
                  ? 16777215 < s >>> 0
                    ? 31
                    : ((s >>>
                        ((7 +
                          (l =
                            (14 -
                              ((_ =
                                (((520192 +
                                  (v =
                                    e <<
                                    (d = (((e + 1048320) | 0) >>> 16) & 8))) |
                                  0) >>>
                                  16) &
                                4) |
                                d |
                                (l = (((245760 + (v <<= _)) | 0) >>> 16) & 2)) +
                              ((v << l) >>> 15)) |
                            0)) |
                          0)) &
                        1) |
                      (l << 1)
                  : 0),
                (n = 0 | f[(4880 + (l << 2)) >> 2]);
              e: do {
                if (n)
                  for (
                    u = s << (31 == ((e = 0) | l) ? 0 : (25 - (l >>> 1)) | 0),
                      a = 0;
                    ;

                  ) {
                    if (
                      (o = ((-8 & f[(n + 4) >> 2]) - s) | 0) >>> 0 <
                      t >>> 0
                    ) {
                      if (!o) {
                        (t = 0), (o = e = n), (v = 61);
                        break e;
                      }
                      (e = n), (t = o);
                    }
                    if (
                      ((a =
                        (0 == (0 | (o = 0 | f[(n + 20) >> 2]))) |
                        ((0 | o) ==
                          (0 | (n = 0 | f[(n + 16 + ((u >>> 31) << 2)) >> 2])))
                          ? a
                          : o),
                      (o = 0 == (0 | n)))
                    ) {
                      (n = a), (v = 57);
                      break;
                    }
                    u <<= 1 & (1 ^ o);
                  }
                else (e = n = 0), (v = 57);
              } while (0);
              if (57 == (0 | v)) {
                if ((0 == (0 | n)) & (0 == (0 | e))) {
                  if (!(e = c & ((e = 2 << l) | (0 - e)))) {
                    d = s;
                    break;
                  }
                  (d = ((e & (0 - e)) - 1) | 0),
                    (n =
                      (e = 0) |
                      f[
                        (4880 +
                          ((((a = ((d >>>= u = (d >>> 12) & 16) >>> 5) & 8) |
                            u |
                            (l = ((d >>>= a) >>> 2) & 4) |
                            (_ = ((d >>>= l) >>> 1) & 2) |
                            (n = ((d >>>= _) >>> 1) & 1)) +
                            (d >>> n)) <<
                            2)) >>
                          2
                      ]);
                }
                n ? ((o = n), (v = 61)) : ((l = e), (u = t));
              }
              if (61 == (0 | v))
                for (;;) {
                  if (
                    ((v = 0),
                    (n = (d =
                      (n = ((-8 & f[(o + 4) >> 2]) - s) | 0) >>> 0 < t >>> 0)
                      ? n
                      : t),
                    (e = d ? o : e),
                    !(o =
                      0 |
                      f[
                        (o + 16 + (((0 == (0 | f[(o + 16) >> 2])) & 1) << 2)) >>
                          2
                      ]))
                  ) {
                    (l = e), (u = n);
                    break;
                  }
                  (t = n), (v = 61);
                }
              if (0 != (0 | l) && u >>> 0 < (((0 | f[1146]) - s) | 0) >>> 0) {
                if ((a = (l + s) | 0) >>> 0 <= l >>> 0)
                  return (m = r), (S = 0) | S;
                (o = 0 | f[(l + 24) >> 2]), (i = 0 | f[(l + 12) >> 2]);
                do {
                  if ((0 | i) == (0 | l)) {
                    if (
                      !(i = 0 | f[(e = (l + 20) | 0) >> 2]) &&
                      !(i = 0 | f[(e = (l + 16) | 0) >> 2])
                    ) {
                      i = 0;
                      break;
                    }
                    for (;;)
                      if (0 | (t = 0 | f[(n = (i + 20) | 0) >> 2]))
                        (i = t), (e = n);
                      else {
                        if (!(t = 0 | f[(n = (i + 16) | 0) >> 2])) break;
                        (i = t), (e = n);
                      }
                    f[e >> 2] = 0;
                  } else
                    (S = 0 | f[(l + 8) >> 2]),
                      (f[(S + 12) >> 2] = i),
                      (f[(i + 8) >> 2] = S);
                } while (0);
                do {
                  if (o) {
                    if (
                      ((e = 0 | f[(l + 28) >> 2]),
                      (0 | l) == (0 | f[(n = (4880 + (e << 2)) | 0) >> 2]))
                    ) {
                      if (!(f[n >> 2] = i)) {
                        (t = c & ~(1 << e)), (f[1145] = t);
                        break;
                      }
                    } else if (
                      !(f[
                        (o +
                          16 +
                          ((((0 | f[(o + 16) >> 2]) != (0 | l)) & 1) << 2)) >>
                          2
                      ] = i)
                    ) {
                      t = c;
                      break;
                    }
                    (f[(i + 24) >> 2] = o),
                      0 | (e = 0 | f[(l + 16) >> 2]) &&
                        ((f[(i + 16) >> 2] = e), (f[(e + 24) >> 2] = i)),
                      (e = 0 | f[(l + 20) >> 2]) &&
                        ((f[(i + 20) >> 2] = e), (f[(e + 24) >> 2] = i)),
                      (t = c);
                  } else t = c;
                } while (0);
                do {
                  if (16 <= u >>> 0) {
                    if (
                      ((f[(l + 4) >> 2] = 3 | s),
                      (f[(a + 4) >> 2] = 1 | u),
                      (i = (f[(a + u) >> 2] = u) >>> 3),
                      u >>> 0 < 256)
                    ) {
                      (n = (4616 + ((i << 1) << 2)) | 0),
                        (e = 0 | f[1144]) & (i = 1 << i)
                          ? (i = 0 | f[(e = (n + 8) | 0) >> 2])
                          : ((f[1144] = e | i), (e = ((i = n) + 8) | 0)),
                        (f[e >> 2] = a),
                        (f[(i + 12) >> 2] = a),
                        (f[(a + 8) >> 2] = i),
                        (f[(a + 12) >> 2] = n);
                      break;
                    }
                    if (
                      ((n =
                        (4880 +
                          ((i = (i = u >>> 8)
                            ? 16777215 < u >>> 0
                              ? 31
                              : ((u >>>
                                  ((7 +
                                    (i =
                                      (14 -
                                        ((p =
                                          (((520192 +
                                            (S =
                                              i <<
                                              (v =
                                                (((i + 1048320) | 0) >>> 16) &
                                                8))) |
                                            0) >>>
                                            16) &
                                          4) |
                                          v |
                                          (i =
                                            (((245760 + (S <<= p)) | 0) >>>
                                              16) &
                                            2)) +
                                        ((S << i) >>> 15)) |
                                      0)) |
                                    0)) &
                                  1) |
                                (i << 1)
                            : 0) <<
                            2)) |
                        0),
                      (f[(a + 28) >> 2] = i),
                      (f[(4 + (e = (a + 16) | 0)) >> 2] = 0),
                      (f[e >> 2] = 0),
                      !(t & (e = 1 << i)))
                    ) {
                      (f[1145] = t | e),
                        (f[n >> 2] = a),
                        (f[(a + 24) >> 2] = n),
                        (f[(a + 12) >> 2] = a),
                        (f[(a + 8) >> 2] = a);
                      break;
                    }
                    for (
                      e = u << (31 == (0 | i) ? 0 : (25 - (i >>> 1)) | 0),
                        n = 0 | f[n >> 2];
                      ;

                    ) {
                      if (((-8 & f[(n + 4) >> 2]) | 0) == (0 | u)) {
                        v = 97;
                        break;
                      }
                      if (
                        !(i =
                          0 | f[(t = (n + 16 + ((e >>> 31) << 2)) | 0) >> 2])
                      ) {
                        v = 96;
                        break;
                      }
                      (e <<= 1), (n = i);
                    }
                    if (96 == (0 | v)) {
                      (f[t >> 2] = a),
                        (f[(a + 24) >> 2] = n),
                        (f[(a + 12) >> 2] = a),
                        (f[(a + 8) >> 2] = a);
                      break;
                    }
                    if (97 == (0 | v)) {
                      (S = 0 | f[(v = (n + 8) | 0) >> 2]),
                        (f[(S + 12) >> 2] = a),
                        (f[v >> 2] = a),
                        (f[(a + 8) >> 2] = S),
                        (f[(a + 12) >> 2] = n),
                        (f[(a + 24) >> 2] = 0);
                      break;
                    }
                  } else
                    (S = (u + s) | 0),
                      (f[(l + 4) >> 2] = 3 | S),
                      (f[(S = (l + S + 4) | 0) >> 2] = 1 | f[S >> 2]);
                } while (0);
                return (m = r), 0 | (l + 8);
              }
              d = s;
            } else d = s;
          else d = -1;
        } while (0);
        if (d >>> 0 <= (n = 0 | f[1146]) >>> 0)
          return (
            (i = (n - d) | 0),
            (e = 0 | f[1149]),
            15 < i >>> 0
              ? ((S = (e + d) | 0),
                (f[1149] = S),
                (f[1146] = i),
                (f[(S + 4) >> 2] = 1 | i),
                (f[(S + i) >> 2] = i),
                (f[(e + 4) >> 2] = 3 | d))
              : ((f[1146] = 0),
                (f[1149] = 0),
                (f[(e + 4) >> 2] = 3 | n),
                (f[(S = (e + n + 4) | 0) >> 2] = 1 | f[S >> 2])),
            (m = r),
            0 | (e + 8)
          );
        if (d >>> 0 < (u = 0 | f[1147]) >>> 0)
          return (
            (p = (u - d) | 0),
            (f[1147] = p),
            (v = ((S = 0 | f[1150]) + d) | 0),
            (f[1150] = v),
            (f[(v + 4) >> 2] = 1 | p),
            (f[(S + 4) >> 2] = 3 | d),
            (m = r),
            0 | (S + 8)
          );
        if (
          ((l = (d + 48) | 0),
          (s =
            (a =
              ((e =
                0 | f[1262]
                  ? 0 | f[1264]
                  : ((f[1264] = 4096),
                    (f[1263] = 4096),
                    (f[1265] = -1),
                    (f[1266] = -1),
                    (f[1267] = 0),
                    (f[1255] = 0),
                    (e = (-16 & E) ^ 1431655768),
                    (f[E >> 2] = e),
                    (f[1262] = e),
                    4096)) +
                (c = (d + 47) | 0)) |
              0) & (o = (0 - e) | 0)) >>>
            0 <=
            d >>> 0)
        )
          return (m = r), (S = 0) | S;
        if (
          0 | (e = 0 | f[1254]) &&
          ((E = ((_ = 0 | f[1252]) + s) | 0) >>> 0 <= _ >>> 0) |
            (e >>> 0 < E >>> 0)
        )
          return (m = r), (S = 0) | S;
        e: do {
          if (4 & f[1255]) (i = 0), (v = 133);
          else {
            n = 0 | f[1150];
            r: do {
              if (n) {
                for (
                  t = 5024;
                  !(
                    (e = 0 | f[t >> 2]) >>> 0 <= n >>> 0 &&
                    ((e + (0 | f[(A = (t + 4) | 0) >> 2])) | 0) >>> 0 > n >>> 0
                  );

                ) {
                  if (!(e = 0 | f[(t + 8) >> 2])) {
                    v = 118;
                    break r;
                  }
                  t = e;
                }
                if ((i = (a - u) & o) >>> 0 < 2147483647)
                  if (
                    (0 | (e = 0 | ve(0 | i))) ==
                    (((0 | f[t >> 2]) + (0 | f[A >> 2])) | 0)
                  ) {
                    if (-1 != (0 | e)) {
                      (u = i), (a = e), (v = 135);
                      break e;
                    }
                  } else (t = e), (v = 126);
                else i = 0;
              } else v = 118;
            } while (0);
            do {
              if (118 == (0 | v))
                if (
                  -1 != (0 | (n = 0 | ve(0))) &&
                  ((i = n),
                  (T =
                    ((i =
                      ((0 == (((T = ((M = 0 | f[1263]) - 1) | 0) & i) | 0)
                        ? 0
                        : (((T + i) & (0 - M)) - i) | 0) +
                        s) |
                      0) +
                      (M = 0 | f[1252])) |
                    0),
                  (d >>> 0 < i >>> 0) & (i >>> 0 < 2147483647))
                ) {
                  if (
                    0 | (A = 0 | f[1254]) &&
                    (T >>> 0 <= M >>> 0) | (A >>> 0 < T >>> 0)
                  ) {
                    i = 0;
                    break;
                  }
                  if ((0 | (e = 0 | ve(0 | i))) == (0 | n)) {
                    (u = i), (a = n), (v = 135);
                    break e;
                  }
                  (t = e), (v = 126);
                } else i = 0;
            } while (0);
            do {
              if (126 == (0 | v)) {
                if (
                  ((n = (0 - i) | 0),
                  !(
                    (i >>> 0 < l >>> 0) &
                    (i >>> 0 < 2147483647) &
                    (-1 != (0 | t))
                  ))
                ) {
                  if (-1 == (0 | t)) {
                    i = 0;
                    break;
                  }
                  (u = i), (a = t), (v = 135);
                  break e;
                }
                if (
                  2147483647 <=
                  (e = (c - i + (e = 0 | f[1264])) & (0 - e)) >>> 0
                ) {
                  (u = i), (a = t), (v = 135);
                  break e;
                }
                if (-1 == (0 | ve(0 | e))) {
                  ve(0 | n), (i = 0);
                  break;
                }
                (u = (e + i) | 0), (a = t), (v = 135);
                break e;
              }
            } while (0);
            (f[1255] = 4 | f[1255]), (v = 133);
          }
        } while (0);
        if (
          (133 == (0 | v) &&
            s >>> 0 < 2147483647 &&
            !(
              (-1 == (0 | (p = 0 | ve(0 | s)))) |
              (1 ^
                (h =
                  ((d + 40) | 0) >>> 0 <
                  (b = ((A = 0 | ve(0)) - p) | 0) >>> 0)) |
              (((p >>> 0 < A >>> 0) & (-1 != (0 | p)) & (-1 != (0 | A))) ^ 1)
            ) &&
            ((u = h ? b : i), (a = p), (v = 135)),
          135 == (0 | v))
        ) {
          (i = ((0 | f[1252]) + u) | 0),
            (f[1252] = i) >>> 0 > (0 | f[1253]) >>> 0 && (f[1253] = i),
            (c = 0 | f[1150]);
          do {
            if (c) {
              for (i = 5024; ; ) {
                if (
                  (0 | a) ==
                  (((e = 0 | f[i >> 2]) + (t = 0 | f[(n = (i + 4) | 0) >> 2])) |
                    0)
                ) {
                  v = 145;
                  break;
                }
                if (!(o = 0 | f[(i + 8) >> 2])) break;
                i = o;
              }
              if (
                145 == (0 | v) &&
                0 == ((8 & f[(i + 12) >> 2]) | 0) &&
                (c >>> 0 < a >>> 0) & (e >>> 0 <= c >>> 0)
              ) {
                (f[n >> 2] = t + u),
                  (v =
                    (c +
                      (S =
                        0 == ((7 & (S = (c + 8) | 0)) | 0) ? 0 : (0 - S) & 7)) |
                    0),
                  (S = ((0 | f[1147]) + (u - S)) | 0),
                  (f[1150] = v),
                  (f[1147] = S),
                  (f[(v + 4) >> 2] = 1 | S),
                  (f[(v + S + 4) >> 2] = 40),
                  (f[1151] = f[1266]);
                break;
              }
              for (
                a >>> 0 < (0 | f[1148]) >>> 0 && (f[1148] = a),
                  n = (a + u) | 0,
                  i = 5024;
                ;

              ) {
                if ((0 | f[i >> 2]) == (0 | n)) {
                  v = 153;
                  break;
                }
                if (!(e = 0 | f[(i + 8) >> 2])) break;
                i = e;
              }
              if (153 == (0 | v) && 0 == ((8 & f[(i + 12) >> 2]) | 0)) {
                (f[i >> 2] = a),
                  (f[(_ = (i + 4) | 0) >> 2] = (0 | f[_ >> 2]) + u),
                  (s =
                    ((_ =
                      (a +
                        (0 == ((7 & (_ = (a + 8) | 0)) | 0)
                          ? 0
                          : (0 - _) & 7)) |
                      0) +
                      d) |
                    0),
                  (l =
                    ((i =
                      (n +
                        (0 == ((7 & (i = (n + 8) | 0)) | 0)
                          ? 0
                          : (0 - i) & 7)) |
                      0) -
                      _ -
                      d) |
                    0),
                  (f[(_ + 4) >> 2] = 3 | d);
                do {
                  if ((0 | i) != (0 | c)) {
                    if ((0 | i) == (0 | f[1149])) {
                      (S = ((0 | f[1146]) + l) | 0),
                        (f[1146] = S),
                        (f[1149] = s),
                        (f[(s + 4) >> 2] = 1 | S),
                        (f[(s + S) >> 2] = S);
                      break;
                    }
                    if (1 == ((3 & (e = 0 | f[(i + 4) >> 2])) | 0)) {
                      (u = -8 & e), (t = e >>> 3);
                      e: do {
                        if (e >>> 0 < 256) {
                          if (
                            ((e = 0 | f[(i + 8) >> 2]),
                            (0 | (n = 0 | f[(i + 12) >> 2])) == (0 | e))
                          ) {
                            f[1144] = f[1144] & ~(1 << t);
                            break;
                          }
                          (f[(e + 12) >> 2] = n), (f[(n + 8) >> 2] = e);
                          break;
                        }
                        (a = 0 | f[(i + 24) >> 2]), (e = 0 | f[(i + 12) >> 2]);
                        do {
                          if ((0 | e) == (0 | i)) {
                            if (
                              !(e =
                                0 | f[(n = (4 + (t = (i + 16) | 0)) | 0) >> 2])
                            ) {
                              if (!(e = 0 | f[t >> 2])) {
                                e = 0;
                                break;
                              }
                              n = t;
                            }
                            for (;;)
                              if (0 | (o = 0 | f[(t = (e + 20) | 0) >> 2]))
                                (e = o), (n = t);
                              else {
                                if (!(o = 0 | f[(t = (e + 16) | 0) >> 2]))
                                  break;
                                (e = o), (n = t);
                              }
                            f[n >> 2] = 0;
                          } else
                            (S = 0 | f[(i + 8) >> 2]),
                              (f[(S + 12) >> 2] = e),
                              (f[(e + 8) >> 2] = S);
                        } while (0);
                        if (!a) break;
                        t = (4880 + ((n = 0 | f[(i + 28) >> 2]) << 2)) | 0;
                        do {
                          if ((0 | i) == (0 | f[t >> 2])) {
                            if (0 | (f[t >> 2] = e)) break;
                            f[1145] = f[1145] & ~(1 << n);
                            break e;
                          }
                          if (
                            !(f[
                              (a +
                                16 +
                                ((((0 | f[(a + 16) >> 2]) != (0 | i)) & 1) <<
                                  2)) >>
                                2
                            ] = e)
                          )
                            break e;
                        } while (0);
                        if (
                          ((f[(e + 24) >> 2] = a),
                          0 | (t = 0 | f[(n = (i + 16) | 0) >> 2]) &&
                            ((f[(e + 16) >> 2] = t), (f[(t + 24) >> 2] = e)),
                          !(n = 0 | f[(n + 4) >> 2]))
                        )
                          break;
                        (f[(e + 20) >> 2] = n), (f[(n + 24) >> 2] = e);
                      } while (0);
                      (i = (i + u) | 0), (o = (u + l) | 0);
                    } else o = l;
                    if (
                      ((f[(i = (i + 4) | 0) >> 2] = -2 & f[i >> 2]),
                      (f[(s + 4) >> 2] = 1 | o),
                      (i = (f[(s + o) >> 2] = o) >>> 3),
                      o >>> 0 < 256)
                    ) {
                      (n = (4616 + ((i << 1) << 2)) | 0),
                        (e = 0 | f[1144]) & (i = 1 << i)
                          ? (i = 0 | f[(e = (n + 8) | 0) >> 2])
                          : ((f[1144] = e | i), (e = ((i = n) + 8) | 0)),
                        (f[e >> 2] = s),
                        (f[(i + 12) >> 2] = s),
                        (f[(s + 8) >> 2] = i),
                        (f[(s + 12) >> 2] = n);
                      break;
                    }
                    i = o >>> 8;
                    do {
                      if (i) {
                        if (16777215 < o >>> 0) {
                          i = 31;
                          break;
                        }
                        i =
                          ((o >>>
                            ((7 +
                              (i =
                                (14 -
                                  ((p =
                                    (((520192 +
                                      (S =
                                        i <<
                                        (v =
                                          (((i + 1048320) | 0) >>> 16) & 8))) |
                                      0) >>>
                                      16) &
                                    4) |
                                    v |
                                    (i =
                                      (((245760 + (S <<= p)) | 0) >>> 16) &
                                      2)) +
                                  ((S << i) >>> 15)) |
                                0)) |
                              0)) &
                            1) |
                          (i << 1);
                      } else i = 0;
                    } while (0);
                    if (
                      ((t = (4880 + (i << 2)) | 0),
                      (f[(s + 28) >> 2] = i),
                      (f[(4 + (e = (s + 16) | 0)) >> 2] = 0),
                      !((e = (f[e >> 2] = 0) | f[1145]) & (n = 1 << i)))
                    ) {
                      (f[1145] = e | n),
                        (f[t >> 2] = s),
                        (f[(s + 24) >> 2] = t),
                        (f[(s + 12) >> 2] = s),
                        (f[(s + 8) >> 2] = s);
                      break;
                    }
                    for (
                      e = o << (31 == (0 | i) ? 0 : (25 - (i >>> 1)) | 0),
                        n = 0 | f[t >> 2];
                      ;

                    ) {
                      if (((-8 & f[(n + 4) >> 2]) | 0) == (0 | o)) {
                        v = 194;
                        break;
                      }
                      if (
                        !(i =
                          0 | f[(t = (n + 16 + ((e >>> 31) << 2)) | 0) >> 2])
                      ) {
                        v = 193;
                        break;
                      }
                      (e <<= 1), (n = i);
                    }
                    if (193 == (0 | v)) {
                      (f[t >> 2] = s),
                        (f[(s + 24) >> 2] = n),
                        (f[(s + 12) >> 2] = s),
                        (f[(s + 8) >> 2] = s);
                      break;
                    }
                    if (194 == (0 | v)) {
                      (S = 0 | f[(v = (n + 8) | 0) >> 2]),
                        (f[(S + 12) >> 2] = s),
                        (f[v >> 2] = s),
                        (f[(s + 8) >> 2] = S),
                        (f[(s + 12) >> 2] = n),
                        (f[(s + 24) >> 2] = 0);
                      break;
                    }
                  } else
                    (S = ((0 | f[1147]) + l) | 0),
                      (f[1147] = S),
                      (f[1150] = s),
                      (f[(s + 4) >> 2] = 1 | S);
                } while (0);
                return (m = r), 0 | (_ + 8);
              }
              for (
                i = 5024;
                !(
                  (e = 0 | f[i >> 2]) >>> 0 <= c >>> 0 &&
                  c >>> 0 < (S = (e + (0 | f[(i + 4) >> 2])) | 0) >>> 0
                );

              )
                i = 0 | f[(i + 8) >> 2];
              for (
                i =
                  ((e =
                    (e =
                      ((o = (S + -47) | 0) +
                        (0 == ((7 & (e = (o + 8) | 0)) | 0)
                          ? 0
                          : (0 - e) & 7)) |
                      0) >>>
                      0 <
                    (o = (c + 16) | 0) >>> 0
                      ? c
                      : e) +
                    8) |
                  0,
                  v =
                    (a +
                      (n =
                        0 == ((7 & (n = (a + 8) | 0)) | 0) ? 0 : (0 - n) & 7)) |
                    0,
                  n = (u + -40 - n) | 0,
                  f[1150] = v,
                  f[1147] = n,
                  f[(v + 4) >> 2] = 1 | n,
                  f[(v + n + 4) >> 2] = 40,
                  f[1151] = f[1266],
                  f[(n = (e + 4) | 0) >> 2] = 27,
                  f[i >> 2] = f[1256],
                  f[(i + 4) >> 2] = f[1257],
                  f[(i + 8) >> 2] = f[1258],
                  f[(i + 12) >> 2] = f[1259],
                  f[1256] = a,
                  f[1257] = u,
                  f[1259] = 0,
                  f[1258] = i,
                  i = (e + 24) | 0;
                (f[(i = ((v = i) + 4) | 0) >> 2] = 7),
                  ((v + 8) | 0) >>> 0 < S >>> 0;

              );
              if ((0 | e) != (0 | c)) {
                if (
                  ((a = (e - c) | 0),
                  (f[n >> 2] = -2 & f[n >> 2]),
                  (f[(c + 4) >> 2] = 1 | a),
                  (i = (f[e >> 2] = a) >>> 3),
                  a >>> 0 < 256)
                ) {
                  (n = (4616 + ((i << 1) << 2)) | 0),
                    (e = 0 | f[1144]) & (i = 1 << i)
                      ? (i = 0 | f[(e = (n + 8) | 0) >> 2])
                      : ((f[1144] = e | i), (e = ((i = n) + 8) | 0)),
                    (f[e >> 2] = c),
                    (f[(i + 12) >> 2] = c),
                    (f[(c + 8) >> 2] = i),
                    (f[(c + 12) >> 2] = n);
                  break;
                }
                if (
                  ((t =
                    (4880 +
                      ((n = (i = a >>> 8)
                        ? 16777215 < a >>> 0
                          ? 31
                          : ((a >>>
                              ((7 +
                                (n =
                                  (14 -
                                    ((p =
                                      (((520192 +
                                        (S =
                                          i <<
                                          (v =
                                            (((i + 1048320) | 0) >>> 16) &
                                            8))) |
                                        0) >>>
                                        16) &
                                      4) |
                                      v |
                                      (n =
                                        (((245760 + (S <<= p)) | 0) >>> 16) &
                                        2)) +
                                    ((S << n) >>> 15)) |
                                  0)) |
                                0)) &
                              1) |
                            (n << 1)
                        : 0) <<
                        2)) |
                    0),
                  (f[(c + 28) >> 2] = n),
                  (f[(c + 20) >> 2] = 0),
                  !((i = (f[o >> 2] = 0) | f[1145]) & (e = 1 << n)))
                ) {
                  (f[1145] = i | e),
                    (f[t >> 2] = c),
                    (f[(c + 24) >> 2] = t),
                    (f[(c + 12) >> 2] = c),
                    (f[(c + 8) >> 2] = c);
                  break;
                }
                for (
                  e = a << (31 == (0 | n) ? 0 : (25 - (n >>> 1)) | 0),
                    n = 0 | f[t >> 2];
                  ;

                ) {
                  if (((-8 & f[(n + 4) >> 2]) | 0) == (0 | a)) {
                    v = 216;
                    break;
                  }
                  if (
                    !(i = 0 | f[(t = (n + 16 + ((e >>> 31) << 2)) | 0) >> 2])
                  ) {
                    v = 215;
                    break;
                  }
                  (e <<= 1), (n = i);
                }
                if (215 == (0 | v)) {
                  (f[t >> 2] = c),
                    (f[(c + 24) >> 2] = n),
                    (f[(c + 12) >> 2] = c),
                    (f[(c + 8) >> 2] = c);
                  break;
                }
                if (216 == (0 | v)) {
                  (S = 0 | f[(v = (n + 8) | 0) >> 2]),
                    (f[(S + 12) >> 2] = c),
                    (f[v >> 2] = c),
                    (f[(c + 8) >> 2] = S),
                    (f[(c + 12) >> 2] = n),
                    (f[(c + 24) >> 2] = 0);
                  break;
                }
              }
            } else {
              for (
                (0 == (0 | (S = 0 | f[1148]))) | (a >>> 0 < S >>> 0) &&
                  (f[1148] = a),
                  f[1256] = a,
                  f[1257] = u,
                  f[1259] = 0,
                  f[1153] = f[1262],
                  f[1152] = -1,
                  i = 0;
                (f[(12 + (S = (4616 + ((i << 1) << 2)) | 0)) >> 2] = S),
                  (f[(S + 8) >> 2] = S),
                  32 != (0 | (i = (i + 1) | 0));

              );
              (v =
                (a +
                  (S = 0 == ((7 & (S = (a + 8) | 0)) | 0) ? 0 : (0 - S) & 7)) |
                0),
                (S = (u + -40 - S) | 0),
                (f[1150] = v),
                (f[1147] = S),
                (f[(v + 4) >> 2] = 1 | S),
                (f[(v + S + 4) >> 2] = 40),
                (f[1151] = f[1266]);
            }
          } while (0);
          if (d >>> 0 < (i = 0 | f[1147]) >>> 0)
            return (
              (p = (i - d) | 0),
              (f[1147] = p),
              (v = ((S = 0 | f[1150]) + d) | 0),
              (f[1150] = v),
              (f[(v + 4) >> 2] = 1 | p),
              (f[(S + 4) >> 2] = 3 | d),
              (m = r),
              0 | (S + 8)
            );
        }
        return (S = 0 | Qe()), (f[S >> 2] = 12), (m = r), (S = 0) | S;
      }
      function Y(e, r, i, n, o, a) {
        (e |= 0), (r = +r), (i |= 0), (n |= 0), (o |= 0), (a |= 0);
        var u,
          l,
          s = 0,
          _ = 0,
          d = 0,
          E = 0,
          M = 0,
          T = 0,
          A = 0,
          b = 0,
          h = 0,
          p = 0,
          k = 0,
          y = 0,
          R = 0,
          g = 0,
          O = 0,
          C = 0,
          N = 0,
          P = 0,
          w = 0,
          I = 0,
          L = 0;
        (m = ((u = m) + 560) | 0),
          (d = (u + 8) | 0),
          (I = L = ((k = u) + 524) | 0),
          (w = (12 + (E = (u + 512) | 0)) | (f[k >> 2] = 0)),
          De(r),
          (l =
            (0 | v) < 0
              ? ((r = -r), (N = 1), 2087)
              : ((N = (0 != ((2049 & o) | 0)) & 1),
                0 == ((2048 & o) | 0)
                  ? 0 == ((1 & o) | 0)
                    ? 2088
                    : 2093
                  : 2090)),
          De(r),
          (P = 2146435072 & v);
        do {
          if ((P >>> 0 < 2146435072) | ((2146435072 == (0 | P)) & !1)) {
            if (
              ((s = 0 != (b = 2 * +qe(r, k))) &&
                (f[k >> 2] = (0 | f[k >> 2]) - 1),
              97 == (0 | (R = 32 | a)))
            ) {
              (A = 0 == (0 | (h = 32 & a)) ? l : (l + 9) | 0),
                (T = 2 | N),
                (s = (12 - n) | 0);
              do {
                if (!((11 < n >>> 0) | (0 == (0 | s)))) {
                  for (r = 8; (r *= 16), 0 != (0 | (s = (s + -1) | 0)); );
                  if (45 == (0 | t[A >> 0])) {
                    r = -(r + (-b - r));
                    break;
                  }
                  r = b + r - r;
                  break;
                }
                r = b;
              } while (0);
              for (
                (0 |
                  (s =
                    0 |
                    Me(
                      (s = (0 | (_ = 0 | f[k >> 2])) < 0 ? (0 - _) | 0 : _),
                      (((0 | s) < 0) << 31) >> 31,
                      w,
                    ))) ==
                  (0 | w) && (t[(s = (E + 11) | 0) >> 0] = 48),
                  t[(s + -1) >> 0] = 43 + ((_ >> 31) & 2),
                  t[(M = (s + -2) | 0) >> 0] = a + 15,
                  E = (0 | n) < 1,
                  d = 0 == ((8 & o) | 0),
                  s = L;
                (P = ~~r),
                  (_ = (s + 1) | 0),
                  (t[s >> 0] = c[(2122 + P) >> 0] | h),
                  (r = 16 * (r - +(0 | P))),
                  (s =
                    1 != ((_ - I) | 0) || d & E & (0 == r)
                      ? _
                      : ((t[_ >> 0] = 46), (s + 2) | 0)),
                  0 != r;

              );
              (P = (s - I) | 0),
                he(
                  e,
                  32,
                  i,
                  (s =
                    ((I = (w - M) | 0) +
                      T +
                      (w =
                        (0 != (0 | n)) & (((P + -2) | 0) < (0 | n))
                          ? (n + 2) | 0
                          : P)) |
                    0),
                  o,
                ),
                xe(e, A, T),
                he(e, 48, i, s, 65536 ^ o),
                xe(e, L, P),
                he(e, 48, (w - P) | 0, 0, 0),
                xe(e, M, I),
                he(e, 32, i, s, 8192 ^ o);
              break;
            }
            for (
              _ = (0 | n) < 0 ? 6 : n,
                s
                  ? ((s = ((0 | f[k >> 2]) - 28) | 0),
                    (f[k >> 2] = s),
                    (r = 268435456 * b))
                  : ((r = b), (s = 0 | f[k >> 2])),
                d = P = (0 | s) < 0 ? d : (d + 288) | 0;
              (O = ~~r >>> 0),
                (f[d >> 2] = O),
                (d = (d + 4) | 0),
                0 != (r = 1e9 * (r - +(O >>> 0)));

            );
            if (0 < (0 | s))
              for (E = P, T = d; ; ) {
                if (
                  ((M = (0 | s) < 29 ? s : 29),
                  E >>> 0 <= (s = (T + -4) | 0) >>> 0)
                ) {
                  for (
                    d = 0;
                    (y =
                      0 |
                      Oe(
                        0 |
                          (g =
                            0 |
                            Fe(
                              0 | (g = 0 | Pe(0 | f[s >> 2], 0, 0 | M)),
                              0 | v,
                              0 | d,
                              0,
                            )),
                        0 | (O = v),
                        1e9,
                        0,
                      )),
                      (f[s >> 2] = y),
                      (d = 0 | Ve(0 | g, 0 | O, 1e9, 0)),
                      E >>> 0 <= (s = (s + -4) | 0) >>> 0;

                  );
                  d && (f[(E = (E + -4) | 0) >> 2] = d);
                }
                for (
                  d = T;
                  !(d >>> 0 <= E >>> 0 || 0 | f[(s = (d + -4) | 0) >> 2]);

                )
                  d = s;
                if (
                  ((s = ((0 | f[k >> 2]) - M) | 0),
                  !(0 < (0 | (f[k >> 2] = s))))
                )
                  break;
                T = d;
              }
            else E = P;
            if ((0 | s) < 0) {
              (n = (1 + ((((_ + 25) | 0) / 9) | 0)) | 0), (p = 102 == (0 | R));
              do {
                if (
                  ((h = (0 | (h = (0 - s) | 0)) < 9 ? h : 9), E >>> 0 < d >>> 0)
                ) {
                  for (
                    M = ((1 << h) - 1) | 0, T = 1e9 >>> h, A = 0, s = E;
                    (O = 0 | f[s >> 2]),
                      (f[s >> 2] = (O >>> h) + A),
                      (A = 0 | S(O & M, T)),
                      (s = (s + 4) | 0) >>> 0 < d >>> 0;

                  );
                  (s = 0 == (0 | f[E >> 2]) ? (E + 4) | 0 : E),
                    (s = A
                      ? ((f[d >> 2] = A), (E = s), (d + 4) | 0)
                      : ((E = s), d));
                } else (E = 0 == (0 | f[E >> 2]) ? (E + 4) | 0 : E), (s = d);
                (d =
                  (0 | n) < (((s - (d = p ? P : E)) >> 2) | 0)
                    ? (d + (n << 2)) | 0
                    : s),
                  (s = ((0 | f[k >> 2]) + h) | 0),
                  (f[k >> 2] = s);
              } while ((0 | s) < 0);
              (s = E), (n = d);
            } else (s = E), (n = d);
            if (((O = P), s >>> 0 < n >>> 0)) {
              if (
                ((d = (9 * ((O - s) >> 2)) | 0),
                10 <= (M = 0 | f[s >> 2]) >>> 0)
              )
                for (
                  E = 10;
                  (d = (d + 1) | 0), (E = (10 * E) | 0) >>> 0 <= M >>> 0;

                );
            } else d = 0;
            if (
              (0 |
                (E =
                  (_ -
                    (102 != (0 | R) ? d : 0) +
                    ((((y = 0 != (0 | _)) & (p = 103 == (0 | R))) << 31) >>
                      31)) |
                  0)) <
              ((((9 * ((n - O) >> 2)) | 0) - 9) | 0)
            ) {
              if (
                ((h =
                  (P +
                    4 +
                    (((((0 | (E = (E + 9216) | 0)) / 9) | 0) - 1024) << 2)) |
                  0),
                (0 | (E = (1 + ((0 | E) % 9 | 0)) | 0)) < 9)
              )
                for (
                  M = 10;
                  (M = (10 * M) | 0), 9 != (0 | (E = (E + 1) | 0));

                );
              else M = 10;
              if (
                (E = ((h + 4) | 0) == (0 | n)) &
                (0 == (0 | (A = ((T = 0 | f[h >> 2]) >>> 0) % (M >>> 0) | 0)))
              )
                E = h;
              else if (
                ((b =
                  0 == ((1 & (((T >>> 0) / (M >>> 0)) | 0)) | 0)
                    ? 9007199254740992
                    : 9007199254740994),
                (r =
                  A >>> 0 < (g = ((0 | M) / 2) | 0) >>> 0
                    ? 0.5
                    : E & ((0 | A) == (0 | g))
                    ? 1
                    : 1.5),
                N &&
                  ((r = (g = 45 == (0 | t[l >> 0])) ? -r : r),
                  (b = g ? -b : b)),
                (E = (T - A) | 0),
                (f[h >> 2] = E),
                b + r != b)
              ) {
                if (((g = (E + M) | 0), 999999999 < (f[h >> 2] = g) >>> 0))
                  for (
                    d = h;
                    (E = (d + -4) | 0) >>> (f[d >> 2] = 0) < s >>> 0 &&
                      (f[(s = (s + -4) | 0) >> 2] = 0),
                      (g = (1 + (0 | f[E >> 2])) | 0),
                      999999999 < (f[E >> 2] = g) >>> 0;

                  )
                    d = E;
                else E = h;
                if (
                  ((d = (9 * ((O - s) >> 2)) | 0),
                  10 <= (T = 0 | f[s >> 2]) >>> 0)
                )
                  for (
                    M = 10;
                    (d = (d + 1) | 0), (M = (10 * M) | 0) >>> 0 <= T >>> 0;

                  );
              } else E = h;
              (E = (E = (E + 4) | 0) >>> 0 < n >>> 0 ? E : n), (g = s);
            } else (E = n), (g = s);
            for (R = E; ; ) {
              if (R >>> 0 <= g >>> 0) {
                k = 0;
                break;
              }
              if (0 | f[(s = (R + -4) | 0) >> 2]) {
                k = 1;
                break;
              }
              R = s;
            }
            n = (0 - d) | 0;
            do {
              if (p) {
                if (
                  ((_ =
                    ((0 | d) < (0 | (s = ((1 & (1 ^ y)) + _) | 0))) &
                    (-5 < (0 | d))
                      ? ((M = (a + -1) | 0), (s + -1 - d) | 0)
                      : ((M = (a + -2) | 0), (s + -1) | 0)),
                  !(s = 8 & o))
                ) {
                  if (k && 0 != (0 | (C = 0 | f[(R + -4) >> 2])))
                    if ((C >>> 0) % 10 | 0) E = 0;
                    else
                      for (
                        E = 0, s = 10;
                        (E = (E + 1) | 0),
                          !(0 | (C >>> 0) % ((s = (10 * s) | 0) >>> 0));

                      );
                  else E = 9;
                  if (
                    ((s = (((9 * ((R - O) >> 2)) | 0) - 9) | 0),
                    102 == (32 | M))
                  ) {
                    (_ =
                      (0 | _) < (0 | (h = 0 < (0 | (h = (s - E) | 0)) ? h : 0))
                        ? _
                        : h),
                      (h = 0);
                    break;
                  }
                  (_ =
                    (0 | _) <
                    (0 | (h = 0 < (0 | (h = (s + d - E) | 0)) ? h : 0))
                      ? _
                      : h),
                    (h = 0);
                  break;
                }
                h = s;
              } else (M = a), (h = 8 & o);
            } while (0);
            if (((T = (0 != (0 | (p = _ | h))) & 1), (A = 102 == (32 | M))))
              s = (y = 0) < (0 | d) ? d : 0;
            else {
              if (
                (((E = w) -
                  (s =
                    0 |
                    Me(
                      (s = (0 | d) < 0 ? n : d),
                      (((0 | s) < 0) << 31) >> 31,
                      w,
                    ))) |
                  0) <
                2
              )
                for (; (t[(s = (s + -1) | 0) >> 0] = 48), ((E - s) | 0) < 2; );
              (t[(s + -1) >> 0] = 43 + ((d >> 31) & 2)),
                (t[(s = (s + -2) | 0) >> 0] = M),
                (s = (E - (y = s)) | 0);
            }
            if (
              (he(e, 32, i, (s = (N + 1 + _ + T + s) | 0), o),
              xe(e, l, N),
              he(e, 48, i, s, 65536 ^ o),
              A)
            ) {
              (T = h = (L + 9) | 0),
                (A = (L + 8) | 0),
                (E = M = P >>> 0 < g >>> 0 ? P : g);
              do {
                if (((d = 0 | Me(0 | f[E >> 2], 0, h)), (0 | E) == (0 | M)))
                  (0 | d) == (0 | h) && ((t[A >> 0] = 48), (d = A));
                else if (L >>> 0 < d >>> 0)
                  for (
                    se(0 | L, 48, (d - I) | 0);
                    L >>> 0 < (d = (d + -1) | 0) >>> 0;

                  );
                xe(e, d, (T - d) | 0), (E = (E + 4) | 0);
              } while (E >>> 0 <= P >>> 0);
              if (
                (0 | p && xe(e, 2138, 1), (E >>> 0 < R >>> 0) & (0 < (0 | _)))
              )
                for (;;) {
                  if (L >>> 0 < (d = 0 | Me(0 | f[E >> 2], 0, h)) >>> 0)
                    for (
                      se(0 | L, 48, (d - I) | 0);
                      L >>> 0 < (d = (d + -1) | 0) >>> 0;

                    );
                  if (
                    (xe(e, d, (0 | _) < 9 ? _ : 9),
                    (d = (_ + -9) | 0),
                    !(((E = (E + 4) | 0) >>> 0 < R >>> 0) & (9 < (0 | _))))
                  ) {
                    _ = d;
                    break;
                  }
                  _ = d;
                }
              he(e, 48, (_ + 9) | 0, 9, 0);
            } else {
              if (((p = k ? R : (g + 4) | 0), -1 < (0 | _))) {
                (h = 0 == (0 | h)),
                  (n = k = (L + 9) | 0),
                  (T = (0 - I) | 0),
                  (A = (L + 8) | 0),
                  (M = g);
                do {
                  (0 | (d = 0 | Me(0 | f[M >> 2], 0, k))) == (0 | k) &&
                    ((t[A >> 0] = 48), (d = A));
                  do {
                    if ((0 | M) == (0 | g)) {
                      if (((E = (d + 1) | 0), xe(e, d, 1), h & ((0 | _) < 1))) {
                        d = E;
                        break;
                      }
                      xe(e, 2138, 1), (d = E);
                    } else {
                      if (d >>> 0 <= L >>> 0) break;
                      for (
                        se(0 | L, 48, (d + T) | 0);
                        L >>> 0 < (d = (d + -1) | 0) >>> 0;

                      );
                    }
                  } while (0);
                  xe(e, d, (0 | (I = (n - d) | 0)) < (0 | _) ? I : _),
                    (_ = (_ - I) | 0),
                    (M = (M + 4) | 0);
                } while ((M >>> 0 < p >>> 0) & (-1 < (0 | _)));
              }
              he(e, 48, (_ + 18) | 0, 18, 0), xe(e, y, (w - y) | 0);
            }
            he(e, 32, i, s, 8192 ^ o);
          } else
            (L = 0 != ((32 & a) | 0)),
              he(e, 32, i, (s = (N + 3) | 0), -65537 & o),
              xe(e, l, N),
              xe(e, (r != r) | !1 ? (L ? 2114 : 2118) : L ? 2106 : 2110, 3),
              he(e, 32, i, s, 8192 ^ o);
        } while (0);
        return (m = u), 0 | ((0 | s) < (0 | i) ? i : s);
      }
      function X(e, r, i, n, o) {
        (e |= 0), (r |= 0), (i |= 0), (n |= 0), (o |= 0);
        var u,
          l,
          c,
          s,
          _,
          d,
          E,
          M,
          A,
          b = 0,
          h = 0,
          p = 0,
          S = 0,
          k = 0,
          y = 0,
          R = 0,
          g = 0,
          O = 0,
          C = 0,
          N = 0,
          P = 0,
          w = 0,
          I = 0;
        (m = ((A = m) + 64) | 0),
          (I = ((d = A) + 24) | 0),
          (E = (A + 8) | 0),
          (M = (A + 20) | 0),
          (f[(_ = (A + 16) | 0) >> 2] = r),
          (u = 0 != (0 | e)),
          (c = l = (I + 40) | 0),
          (I = (I + 39) | 0),
          (s = (E + 4) | 0),
          (y = b = h = 0);
        e: for (;;) {
          do {
            if (-1 < (0 | b)) {
              if (((2147483647 - b) | 0) < (0 | h)) {
                (b = 0 | Qe()), (f[b >> 2] = 75), (b = -1);
                break;
              }
              b = (h + b) | 0;
              break;
            }
          } while (0);
          if (!(((h = 0 | t[r >> 0]) << 24) >> 24)) {
            w = 87;
            break;
          }
          p = r;
          r: for (;;) {
            switch ((h << 24) >> 24) {
              case 37:
                (h = p), (w = 9);
                break r;
              case 0:
                h = p;
                break r;
            }
            (P = (p + 1) | 0), (f[_ >> 2] = P), (h = 0 | t[P >> 0]), (p = P);
          }
          r: do {
            if (9 == (0 | w))
              for (;;) {
                if (37 != ((w = 0) | t[(p + 1) >> 0])) break r;
                if (
                  ((h = (h + 1) | 0),
                  (p = (p + 2) | 0),
                  (f[_ >> 2] = p),
                  37 != (0 | t[p >> 0]))
                )
                  break;
                w = 9;
              }
          } while (0);
          if (((h = (h - r) | 0), u && xe(e, r, h), 0 | h)) r = p;
          else {
            (h = ((0 | t[(S = (p + 1) | 0) >> 0]) - 48) | 0) >>> 0 < 10
              ? ((N = (P = 36 == (0 | t[(p + 2) >> 0])) ? h : -1),
                (y = P ? 1 : y),
                (S = P ? (p + 3) | 0 : S))
              : (N = -1),
              (f[_ >> 2] = S),
              (p = ((((h = 0 | t[S >> 0]) << 24) >> 24) - 32) | 0);
            r: do {
              if (p >>> 0 < 32)
                for (k = 0, R = h; ; ) {
                  if (!(75913 & (h = 1 << p))) {
                    h = R;
                    break r;
                  }
                  if (
                    ((k |= h),
                    (S = (S + 1) | 0),
                    (f[_ >> 2] = S),
                    32 <=
                      (p = ((((h = 0 | t[S >> 0]) << 24) >> 24) - 32) | 0) >>>
                        0)
                  )
                    break;
                  R = h;
                }
              else k = 0;
            } while (0);
            if ((h << 24) >> 24 == 42) {
              if (
                (h = ((0 | t[(p = (S + 1) | 0) >> 0]) - 48) | 0) >>> 0 < 10 &&
                36 == (0 | t[(S + 2) >> 0])
              )
                (f[(o + (h << 2)) >> 2] = 10),
                  (h = 0 | f[(n + (((0 | t[p >> 0]) - 48) << 3)) >> 2]),
                  (y = 1),
                  (S = (S + 3) | 0);
              else {
                if (0 | y) {
                  b = -1;
                  break;
                }
                (y = u
                  ? ((y = (3 + (0 | f[i >> 2])) & -4),
                    (h = 0 | f[y >> 2]),
                    (f[i >> 2] = y + 4),
                    0)
                  : (h = 0)),
                  (S = p);
              }
              (f[_ >> 2] = S),
                (h = (P = (0 | h) < 0) ? (0 - h) | 0 : h),
                (k = P ? 8192 | k : k);
            } else {
              if ((0 | (h = 0 | Se(_))) < 0) {
                b = -1;
                break;
              }
              S = 0 | f[_ >> 2];
            }
            do {
              if (46 == (0 | t[S >> 0])) {
                if (42 != (0 | t[(S + 1) >> 0])) {
                  (f[_ >> 2] = S + 1), (p = 0 | Se(_)), (S = 0 | f[_ >> 2]);
                  break;
                }
                if (
                  (p = ((0 | t[(R = (S + 2) | 0) >> 0]) - 48) | 0) >>> 0 < 10 &&
                  36 == (0 | t[(S + 3) >> 0])
                ) {
                  (f[(o + (p << 2)) >> 2] = 10),
                    (p = 0 | f[(n + (((0 | t[R >> 0]) - 48) << 3)) >> 2]),
                    (S = (S + 4) | 0),
                    (f[_ >> 2] = S);
                  break;
                }
                if (0 | y) {
                  b = -1;
                  break e;
                }
                u
                  ? ((P = (3 + (0 | f[i >> 2])) & -4),
                    (p = 0 | f[P >> 2]),
                    (f[i >> 2] = P + 4))
                  : (p = 0),
                  (S = f[_ >> 2] = R);
              } else p = -1;
            } while (0);
            for (C = 0; ; ) {
              if (57 < (((0 | t[S >> 0]) - 65) | 0) >>> 0) {
                b = -1;
                break e;
              }
              if (
                ((P = (S + 1) | 0),
                (f[_ >> 2] = P),
                !(
                  (((g =
                    255 &
                    (R =
                      0 |
                      t[
                        ((0 | t[S >> 0]) - 65 + (1606 + ((58 * C) | 0))) >> 0
                      ])) -
                    1) |
                    0) >>>
                    0 <
                  8
                ))
              )
                break;
              (C = g), (S = P);
            }
            if (!((R << 24) >> 24)) {
              b = -1;
              break;
            }
            O = -1 < (0 | N);
            do {
              if ((R << 24) >> 24 == 19) {
                if (O) {
                  b = -1;
                  break e;
                }
                w = 49;
              } else {
                if (O) {
                  (f[(o + (N << 2)) >> 2] = g),
                    (N = 0 | f[(4 + (O = (n + (N << 3)) | 0)) >> 2]),
                    (f[(w = d) >> 2] = f[O >> 2]),
                    (f[(w + 4) >> 2] = N),
                    (w = 49);
                  break;
                }
                if (!u) {
                  b = 0;
                  break e;
                }
                Z(d, g, i);
              }
            } while (0);
            if (49 != (0 | w) || ((w = 0), u)) {
              (S =
                (0 != (0 | C)) & (3 == ((15 & (S = 0 | t[S >> 0])) | 0))
                  ? -33 & S
                  : S),
                (O = -65537 & k),
                (N = 0 == ((8192 & k) | 0) ? k : O);
              r: do {
                switch (0 | S) {
                  case 110:
                    switch (((255 & C) << 24) >> 24) {
                      case 0:
                      case 1:
                      case 6:
                        (f[f[d >> 2] >> 2] = b), (h = 0), (r = P);
                        continue e;
                      case 2:
                      case 7:
                        (h = 0 | f[d >> 2]),
                          (f[h >> 2] = b),
                          (f[(h + 4) >> 2] = (((0 | b) < 0) << 31) >> 31),
                          (h = 0),
                          (r = P);
                        continue e;
                      case 3:
                        (a[f[d >> 2] >> 1] = b), (h = 0), (r = P);
                        continue e;
                      case 4:
                        (t[f[d >> 2] >> 0] = b), (h = 0), (r = P);
                        continue e;
                      default:
                        (h = 0), (r = P);
                        continue e;
                    }
                  case 112:
                    (S = 120), (p = 8 < p >>> 0 ? p : 8), (r = 8 | N), (w = 61);
                    break;
                  case 88:
                  case 120:
                    (r = N), (w = 61);
                    break;
                  case 111:
                    (R = 2070),
                      (p =
                        ((k = 0) == ((8 & N) | 0)) |
                        ((0 |
                          (O =
                            (c -
                              (g =
                                0 |
                                ge(
                                  (r = 0 | f[(S = d) >> 2]),
                                  (S = 0 | f[(S + 4) >> 2]),
                                  l,
                                ))) |
                            0)) <
                          (0 | p))
                          ? p
                          : (O + 1) | 0),
                      (O = N),
                      (w = 67);
                    break;
                  case 105:
                  case 100:
                    if (
                      ((r = 0 | f[(S = d) >> 2]),
                      (0 | (S = 0 | f[(S + 4) >> 2])) < 0)
                    ) {
                      (r = 0 | Le(0, 0, 0 | r, 0 | S)),
                        (S = v),
                        (f[(k = d) >> 2] = r),
                        (f[(k + 4) >> 2] = S),
                        (k = 1),
                        (R = 2070),
                        (w = 66);
                      break r;
                    }
                    (k = (0 != ((2049 & N) | 0)) & 1),
                      (R =
                        0 == ((2048 & N) | 0)
                          ? 0 == ((1 & N) | 0)
                            ? 2070
                            : 2072
                          : 2071),
                      (w = 66);
                    break r;
                  case 117:
                    (R = 2070),
                      (r = (k = 0) | f[(S = d) >> 2]),
                      (S = 0 | f[(S + 4) >> 2]),
                      (w = 66);
                    break;
                  case 99:
                    (t[I >> 0] = f[d >> 2]),
                      (r = I),
                      (k = 0),
                      (R = 2070),
                      (g = l),
                      (S = 1),
                      (p = O);
                    break;
                  case 109:
                    (S = 0 | Qe()), (S = 0 | Be(0 | f[S >> 2])), (w = 71);
                    break;
                  case 115:
                    (S = 0 | (S = 0 | f[d >> 2]) ? S : 2080), (w = 71);
                    break;
                  case 67:
                    (f[E >> 2] = f[d >> 2]),
                      (f[s >> 2] = 0),
                      (g = -1),
                      (S = f[d >> 2] = E),
                      (w = 75);
                    break;
                  case 83:
                    (r = 0 | f[d >> 2]),
                      (w = p
                        ? ((g = p), (S = r), 75)
                        : (he(e, 32, h, 0, N), (r = 0), 84));
                    break;
                  case 65:
                  case 71:
                  case 70:
                  case 69:
                  case 97:
                  case 103:
                  case 102:
                  case 101:
                    (h = 0 | Y(e, +T[d >> 3], h, p, N, S)), (r = P);
                    continue e;
                  default:
                    (k = 0), (R = 2070), (g = l), (S = p), (p = N);
                }
              } while (0);
              r: do {
                if (61 == (0 | w))
                  (g =
                    0 |
                    ke(
                      (C = 0 | f[(N = d) >> 2]),
                      (N = 0 | f[(N + 4) >> 2]),
                      l,
                      32 & S,
                    )),
                    (k = (R =
                      (0 == ((8 & r) | 0)) | ((0 == (0 | C)) & (0 == (0 | N))))
                      ? 0
                      : 2),
                    (R = R ? 2070 : (2070 + (S >> 4)) | 0),
                    (O = r),
                    (r = C),
                    (S = N),
                    (w = 67);
                else if (66 == (0 | w))
                  (g = 0 | Me(r, S, l)), (O = N), (w = 67);
                else if (71 == (0 | w))
                  (k = w = 0),
                    (R = 2070),
                    (g = (C = 0 == (0 | (N = 0 | ae((r = S), 0, p))))
                      ? (S + p) | 0
                      : N),
                    (S = C ? p : (N - S) | 0),
                    (p = O);
                else if (75 == (0 | w)) {
                  for (
                    R = S, p = r = w = 0;
                    (k = 0 | f[R >> 2]) &&
                    !(
                      ((0 | (p = 0 | Ye(M, k))) < 0) |
                      (((g - r) | 0) >>> 0 < p >>> 0)
                    ) &&
                    (r = (p + r) | 0) >>> 0 < g >>> 0;

                  )
                    R = (R + 4) | 0;
                  if ((0 | p) < 0) {
                    b = -1;
                    break e;
                  }
                  if ((he(e, 32, h, r, N), r))
                    for (k = 0; ; ) {
                      if (!(p = 0 | f[S >> 2])) {
                        w = 84;
                        break r;
                      }
                      if ((0 | r) < (0 | (k = ((p = 0 | Ye(M, p)) + k) | 0))) {
                        w = 84;
                        break r;
                      }
                      if ((xe(e, M, p), r >>> 0 <= k >>> 0)) {
                        w = 84;
                        break;
                      }
                      S = (S + 4) | 0;
                    }
                  else (r = 0), (w = 84);
                }
              } while (0);
              if (67 == (0 | w))
                (N =
                  ((w = 0) != (0 | p)) | (S = (0 != (0 | r)) | (0 != (0 | S)))),
                  (S = (c - g + (1 & (1 ^ S))) | 0),
                  (r = N ? g : l),
                  (g = l),
                  (S = N ? ((0 | S) < (0 | p) ? p : S) : p),
                  (p = -1 < (0 | p) ? -65537 & O : O);
              else if (84 == (0 | w)) {
                (w = 0),
                  he(e, 32, h, r, 8192 ^ N),
                  (h = (0 | r) < (0 | h) ? h : r),
                  (r = P);
                continue;
              }
              he(
                e,
                32,
                (h =
                  (0 | h) <
                  (0 |
                    (N =
                      ((O = (0 | S) < (0 | (C = (g - r) | 0)) ? C : S) + k) |
                      0))
                    ? N
                    : h),
                N,
                p,
              ),
                xe(e, R, k),
                he(e, 48, h, N, 65536 ^ p),
                he(e, 48, O, C, 0),
                xe(e, r, C),
                he(e, 32, h, N, 8192 ^ p),
                (r = P);
            } else (h = 0), (r = P);
          }
        }
        e: do {
          if (87 == (0 | w) && !e)
            if (y) {
              for (b = 1; (r = 0 | f[(o + (b << 2)) >> 2]); )
                if (
                  (Z((n + (b << 3)) | 0, r, i), 10 <= (0 | (b = (b + 1) | 0)))
                ) {
                  b = 1;
                  break e;
                }
              for (;;) {
                if (0 | f[(o + (b << 2)) >> 2]) {
                  b = -1;
                  break e;
                }
                if (10 <= (0 | (b = (b + 1) | 0))) {
                  b = 1;
                  break;
                }
              }
            } else b = 0;
        } while (0);
        return (m = A), 0 | b;
      }
      function K(e, r) {
        r |= 0;
        var i,
          n,
          o,
          a,
          u,
          l,
          s,
          _,
          d,
          E,
          M,
          T,
          A,
          b,
          h,
          p = 0,
          v = 0,
          S = 0,
          k = 0,
          y = 0,
          R = 0,
          g = 0,
          O = 0,
          C = 0,
          N = 0;
        if (
          ((m = ((h = m) + 704) | 0),
          (A = (h + 144) | 0),
          (T = (h + 128) | 0),
          (M = (h + 112) | 0),
          (E = (h + 96) | 0),
          (d = (h + 80) | 0),
          (_ = (h + 64) | 0),
          (s = (h + 48) | 0),
          (b = (h + 32) | 0),
          (i = (h + 16) | 0),
          (o = ((R = h) + 184) | 0),
          (N = (h + 160) | 0),
          !(a =
            0 |
            (function (e, r) {
              e |= 0;
              var i,
                n,
                t,
                o,
                a = 0,
                u = 0,
                l = 0,
                s = 0;
              if (
                ((m = ((o = m) + 528) | 0), (i = ((n = o) + 16) | 0), !(r |= 0))
              )
                return (m = o), (s = 0) | s;
              if (r >>> 0 <= 16) return (s = 0 | oe(e, r)), (m = o), 0 | s;
              if (
                ((t = 0 | oe(e, (r + -16) | 0)),
                (0 | (r = 0 | f[(s = (e + 20) | 0) >> 2])) < 16)
              )
                for (
                  u = (e + 4) | 0, l = (e + 8) | 0, a = (e + 16) | 0;
                  (e =
                    (0 | (e = 0 | f[u >> 2])) == (0 | f[l >> 2])
                      ? 0
                      : ((f[u >> 2] = e + 1), 0 | c[e >> 0])),
                    (r = (r + 8) | 0),
                    33 <= (0 | (f[s >> 2] = r)) &&
                      ((f[n >> 2] = 866),
                      (f[(n + 4) >> 2] = 3208),
                      (f[(n + 8) >> 2] = 1366),
                      Ne(i, 812, n),
                      be(i),
                      (r = 0 | f[s >> 2])),
                    (e = (e << (32 - r)) | f[a >> 2]),
                    (f[a >> 2] = e),
                    (0 | r) < 16;

                );
              else e = 0 | f[(a = e = (e + 16) | 0) >> 2];
              return (
                (f[a >> 2] = e << 16),
                (f[s >> 2] = r + -16),
                (m = o),
                (e >>> 16) | (t << 16) | 0
              );
            })((e |= 0), 14)))
        )
          return (
            (function (e) {
              var r,
                i,
                n,
                o,
                a,
                u = 0;
              if (
                ((m = ((a = m) + 544) | 0),
                (o = (a + 16) | 0),
                (n = ((i = a) + 32) | 0),
                (f[(e |= 0) >> 2] = 0) | (r = 0 | f[(u = (e + 4) | 0) >> 2]) &&
                  (7 & r
                    ? ((f[i >> 2] = 866),
                      (f[(i + 4) >> 2] = 2506),
                      (f[(i + 8) >> 2] = 1232),
                      Ne(n, 812, i),
                      be(n))
                    : Ee(r, 0, 0, 1, 0),
                  (f[u >> 2] = 0),
                  (f[(e + 8) >> 2] = 0),
                  (f[(e + 12) >> 2] = 0)),
                (t[(e + 16) >> 0] = 0),
                !(u = 0 | f[(e = (e + 20) | 0) >> 2]))
              )
                return (m = a);
              ne(u),
                7 & u
                  ? ((f[o >> 2] = 866),
                    (f[(o + 4) >> 2] = 2506),
                    (f[(o + 8) >> 2] = 1232),
                    Ne(n, 812, o),
                    be(n))
                  : Ee(u, 0, 0, 1, 0),
                (f[e >> 2] = 0),
                (m = a);
            })(r),
            (m = h),
            1
          );
        if (
          ((u = (r + 4) | 0),
          (0 | (p = 0 | f[(l = (r + 8) | 0) >> 2])) != (0 | a))
        ) {
          if (p >>> 0 <= a >>> 0) {
            do {
              if ((0 | f[(r + 12) >> 2]) >>> 0 < a >>> 0) {
                if (0 | q(u, a, ((p + 1) | 0) == (0 | a), 1, 0)) {
                  p = 0 | f[l >> 2];
                  break;
                }
                return (t[(r + 16) >> 0] = 1), (m = h), (N = 0) | N;
              }
            } while (0);
            se(((0 | f[u >> 2]) + p) | 0, 0, (a - p) | 0);
          }
          f[l >> 2] = a;
        }
        if (
          (se(0 | f[u >> 2], 0, 0 | a),
          (0 | (p = 0 | f[(n = (e + 20) | 0) >> 2])) < 5)
        )
          for (
            k = (e + 4) | 0, y = (e + 8) | 0, S = (e + 16) | 0;
            (v =
              (0 | (v = 0 | f[k >> 2])) == (0 | f[y >> 2])
                ? 0
                : ((f[k >> 2] = v + 1), 0 | c[v >> 0])),
              (p = (p + 8) | 0),
              33 <= (0 | (f[n >> 2] = p)) &&
                ((f[R >> 2] = 866),
                (f[(R + 4) >> 2] = 3208),
                (f[(R + 8) >> 2] = 1366),
                Ne(o, 812, R),
                be(o),
                (p = 0 | f[n >> 2])),
              (v = (v << (32 - p)) | f[S >> 2]),
              (f[S >> 2] = v),
              (0 | p) < 5;

          );
        else v = 0 | f[(S = v = (e + 16) | 0) >> 2];
        if (
          ((O = v >>> 27),
          (f[S >> 2] = v << 5),
          (f[n >> 2] = p + -5),
          20 < ((O + -1) | 0) >>> 0)
        )
          return (m = h), (N = 0) | N;
        (f[(N + 20) >> 2] = 0),
          (f[N >> 2] = 0),
          (f[(N + 4) >> 2] = 0),
          (f[(N + 8) >> 2] = 0),
          (f[(N + 12) >> 2] = 0),
          (p = (N + 4) | (t[(N + 16) >> 0] = 0)),
          (v = (N + 8) | 0);
        e: do {
          if (0 | q(p, 21, 0, 1, 0)) {
            (k = 0 | f[v >> 2]),
              se(((g = 0 | f[p >> 2]) + k) | 0, 0, (21 - k) | 0),
              (f[v >> 2] = 21),
              (k = (e + 4) | 0),
              (y = (e + 8) | 0),
              (R = (e + 16) | 0),
              (S = 0);
            do {
              if ((0 | (p = 0 | f[n >> 2])) < 3)
                for (
                  ;
                  (v =
                    (0 | (v = 0 | f[k >> 2])) == (0 | f[y >> 2])
                      ? 0
                      : ((f[k >> 2] = v + 1), 0 | c[v >> 0])),
                    (p = (p + 8) | 0),
                    33 <= (0 | (f[n >> 2] = p)) &&
                      ((f[i >> 2] = 866),
                      (f[(i + 4) >> 2] = 3208),
                      (f[(i + 8) >> 2] = 1366),
                      Ne(o, 812, i),
                      be(o),
                      (p = 0 | f[n >> 2])),
                    (v = (v << (32 - p)) | f[R >> 2]),
                    (f[R >> 2] = v),
                    (0 | p) < 3;

                );
              else v = 0 | f[R >> 2];
              (f[R >> 2] = v << 3),
                (f[n >> 2] = p + -3),
                (t[(g + (0 | c[(1327 + S) >> 0])) >> 0] = v >>> 29),
                (S = (S + 1) | 0);
            } while ((0 | S) != (0 | O));
            if (0 | ie(N)) {
              (R = (e + 4) | 0), (g = (e + 8) | 0), (O = (e + 16) | 0), (p = 0);
              r: do {
                (y = (a - p) | 0), (S = 0 | j(e, N));
                i: do {
                  if (S >>> 0 < 17)
                    (0 | f[l >> 2]) >>> 0 <= p >>> 0 &&
                      ((f[b >> 2] = 866),
                      (f[(b + 4) >> 2] = 910),
                      (f[(b + 8) >> 2] = 1497),
                      Ne(o, 812, b),
                      be(o)),
                      (t[((0 | f[u >> 2]) + p) >> 0] = S),
                      (p = (p + 1) | 0);
                  else
                    switch (0 | S) {
                      case 17:
                        if ((0 | (v = 0 | f[n >> 2])) < 3)
                          for (
                            ;
                            (S =
                              (0 | (S = 0 | f[R >> 2])) == (0 | f[g >> 2])
                                ? 0
                                : ((f[R >> 2] = S + 1), 0 | c[S >> 0])),
                              (v = (v + 8) | 0),
                              33 <= (0 | (f[n >> 2] = v)) &&
                                ((f[s >> 2] = 866),
                                (f[(s + 4) >> 2] = 3208),
                                (f[(s + 8) >> 2] = 1366),
                                Ne(o, 812, s),
                                be(o),
                                (v = 0 | f[n >> 2])),
                              (S = (S << (32 - v)) | f[O >> 2]),
                              (f[O >> 2] = S),
                              (0 | v) < 3;

                          );
                        else S = 0 | f[O >> 2];
                        if (
                          ((f[O >> 2] = S << 3),
                          (f[n >> 2] = v + -3),
                          (v = y >>> 0 < (S = (3 + (S >>> 29)) | 0) >>> 0))
                        ) {
                          p = 0;
                          break e;
                        }
                        p = ((v ? 0 : S) + p) | 0;
                        break i;
                      case 18:
                        if ((0 | (v = 0 | f[n >> 2])) < 7)
                          for (
                            ;
                            (S =
                              (0 | (S = 0 | f[R >> 2])) == (0 | f[g >> 2])
                                ? 0
                                : ((f[R >> 2] = S + 1), 0 | c[S >> 0])),
                              (v = (v + 8) | 0),
                              33 <= (0 | (f[n >> 2] = v)) &&
                                ((f[_ >> 2] = 866),
                                (f[(_ + 4) >> 2] = 3208),
                                (f[(_ + 8) >> 2] = 1366),
                                Ne(o, 812, _),
                                be(o),
                                (v = 0 | f[n >> 2])),
                              (S = (S << (32 - v)) | f[O >> 2]),
                              (f[O >> 2] = S),
                              (0 | v) < 7;

                          );
                        else S = 0 | f[O >> 2];
                        if (
                          ((f[O >> 2] = S << 7),
                          (f[n >> 2] = v + -7),
                          (v = y >>> 0 < (S = (11 + (S >>> 25)) | 0) >>> 0))
                        ) {
                          p = 0;
                          break e;
                        }
                        p = ((v ? 0 : S) + p) | 0;
                        break i;
                      default:
                        if (2 <= ((S + -19) | 0) >>> 0) {
                          C = 81;
                          break r;
                        }
                        if (((v = 0 | f[n >> 2]), 19 == (0 | S))) {
                          if ((0 | v) < 2)
                            for (
                              S = v;
                              (k =
                                (0 | (v = 0 | f[R >> 2])) == (0 | f[g >> 2])
                                  ? 0
                                  : ((f[R >> 2] = v + 1), 0 | c[v >> 0])),
                                (v = (S + 8) | 0),
                                33 <= (0 | (f[n >> 2] = v)) &&
                                  ((f[d >> 2] = 866),
                                  (f[(d + 4) >> 2] = 3208),
                                  (f[(d + 8) >> 2] = 1366),
                                  Ne(o, 812, d),
                                  be(o),
                                  (v = 0 | f[n >> 2])),
                                (S = (k << (32 - v)) | f[O >> 2]),
                                (f[O >> 2] = S),
                                (0 | v) < 2;

                            )
                              S = v;
                          else S = 0 | f[O >> 2];
                          (f[O >> 2] = S << 2),
                            (S >>>= 30),
                            (k = 3),
                            (v = (v + -2) | 0);
                        } else {
                          if ((0 | v) < 6)
                            for (
                              ;
                              (S =
                                (0 | (S = 0 | f[R >> 2])) == (0 | f[g >> 2])
                                  ? 0
                                  : ((f[R >> 2] = S + 1), 0 | c[S >> 0])),
                                (v = (v + 8) | 0),
                                33 <= (0 | (f[n >> 2] = v)) &&
                                  ((f[E >> 2] = 866),
                                  (f[(E + 4) >> 2] = 3208),
                                  (f[(E + 8) >> 2] = 1366),
                                  Ne(o, 812, E),
                                  be(o),
                                  (v = 0 | f[n >> 2])),
                                (S = (S << (32 - v)) | f[O >> 2]),
                                (f[O >> 2] = S),
                                (0 | v) < 6;

                            );
                          else S = 0 | f[O >> 2];
                          (f[O >> 2] = S << 6),
                            (S >>>= 26),
                            (k = 7),
                            (v = (v + -6) | 0);
                        }
                        if (
                          ((f[n >> 2] = v),
                          (0 == (0 | p)) | (y >>> 0 < (S = (S + k) | 0) >>> 0))
                        ) {
                          p = 0;
                          break e;
                        }
                        if (
                          ((v = (p + -1) | 0),
                          (0 | f[l >> 2]) >>> 0 <= v >>> 0 &&
                            ((f[M >> 2] = 866),
                            (f[(M + 4) >> 2] = 910),
                            (f[(M + 8) >> 2] = 1497),
                            Ne(o, 812, M),
                            be(o)),
                          !(
                            ((k = 0 | t[((0 | f[u >> 2]) + v) >> 0]) << 24) >>
                            24
                          ))
                        ) {
                          p = 0;
                          break e;
                        }
                        if ((v = (S + p) | 0) >>> 0 <= p >>> 0) break i;
                        for (
                          ;
                          (0 | f[l >> 2]) >>> 0 <= p >>> 0 &&
                            ((f[T >> 2] = 866),
                            (f[(T + 4) >> 2] = 910),
                            (f[(T + 8) >> 2] = 1497),
                            Ne(o, 812, T),
                            be(o)),
                            (t[((0 | f[u >> 2]) + p) >> 0] = k),
                            (0 | (p = (p + 1) | 0)) != (0 | v);

                        );
                        p = v;
                    }
                } while (0);
              } while (p >>> 0 < a >>> 0);
              if (81 == (0 | C)) {
                (f[A >> 2] = 866),
                  (f[(A + 4) >> 2] = 3149),
                  (f[(A + 8) >> 2] = 1348),
                  Ne(o, 812, A),
                  be(o),
                  (p = 0);
                break;
              }
              p = (0 | a) == (0 | p) ? 0 | ie(r) : 0;
            } else p = 0;
          } else (t[(N + 16) >> 0] = 1), (p = 0);
        } while (0);
        return le(N), (m = h), 0 | p;
      }
      function V(e, r, i, n) {
        i |= 0;
        var o,
          u,
          l,
          s,
          d,
          E,
          M = 0,
          T = 0,
          A = 0,
          b = 0,
          h = 0,
          p = 0,
          v = 0,
          S = 0,
          k = 0,
          y = 0,
          R = 0,
          g = 0,
          O = 0,
          C = 0,
          N = 0,
          P = 0,
          w = 0,
          I = 0,
          L = 0,
          D = 0,
          F = 0,
          U = 0;
        if (
          ((m = ((E = m) + 880) | 0),
          (F = (E + 144) | 0),
          (d = (E + 128) | 0),
          (s = (E + 112) | 0),
          (l = (E + 96) | 0),
          (L = (E + 80) | 0),
          (C = (E + 64) | 0),
          (g = (E + 48) | 0),
          (O = (E + 32) | 0),
          (S = (E + 16) | 0),
          (o = ((v = E) + 360) | 0),
          (u = (E + 296) | 0),
          (U = (E + 224) | 0),
          (R = (E + 156) | 0),
          (0 == (0 | (r |= 0))) | (11 < (n |= 0) >>> 0))
        )
          return (m = E), (U = 0) | U;
        for (
          f[(e |= 0) >> 2] = r, T = ((M = U) + 68) | 0;
          (0 | (M = (M + 4) | (f[M >> 2] = 0))) < (0 | T);

        );
        for (
          M = 0;
          (T = (U + ((255 & (D = 0 | t[(i + M) >> 0])) << 2)) | 0),
            (D << 24) >> 24 && (f[T >> 2] = 1 + (0 | f[T >> 2])),
            (0 | (M = (M + 1) | 0)) != (0 | r);

        );
        for (
          b = A = T = 0, h = -1, p = 1;
          (M = 0 | f[(U + (p << 2)) >> 2])
            ? ((T = (M + (f[(u + ((k = (p + -1) | 0) << 2)) >> 2] = T)) | 0),
              (D = (16 - p) | 0),
              (f[(e + 28 + (k << 2)) >> 2] =
                1 + (((T + -1) << D) | ((1 << D) - 1))),
              (f[(e + 96 + (k << 2)) >> 2] = A),
              (k = (M + (f[(R + (p << 2)) >> 2] = A)) | 0),
              (b = p >>> 0 < b >>> 0 ? b : p),
              (h = h >>> 0 < p >>> 0 ? h : p))
            : ((f[(e + 28 + ((p + -1) << 2)) >> 2] = 0), (k = A)),
            17 != (0 | (p = (p + 1) | 0));

        )
          (T <<= 1), (A = k);
        (f[(e + 4) >> 2] = k), (T = (e + 172) | 0);
        do {
          if (k >>> 0 > (0 | f[T >> 2]) >>> 0) {
            (M =
              (M = (k + -1) | 0) & k
                ? ((M |= M >>> 16),
                  (M |= M >>> 8),
                  (M |= M >>> 4),
                  r >>> 0 < (M = (1 + (((M |= M >>> 2) >>> 1) | M)) | 0) >>> 0
                    ? r
                    : M)
                : k),
              (f[T >> 2] = M),
              (M = 0 | f[(A = (e + 176) | 0) >> 2]);
            do {
              if (0 | M) {
                if (
                  ((D = 0 | f[(M + -4) >> 2]),
                  (M = (M + -8) | 0),
                  (0 != (0 | D) && (0 | D) == (0 | ~f[M >> 2])) ||
                    ((f[v >> 2] = 866),
                    (f[(v + 4) >> 2] = 651),
                    (f[(v + 8) >> 2] = 1579),
                    Ne(o, 812, v),
                    be(o)),
                  7 & M)
                ) {
                  (f[S >> 2] = 866),
                    (f[(S + 4) >> 2] = 2506),
                    (f[(S + 8) >> 2] = 1232),
                    Ne(o, 812, S),
                    be(o);
                  break;
                }
                Ee(M, 0, 0, 1, 0);
                break;
              }
            } while (0);
            if (
              (T =
                0 |
                ce((8 + ((M = 0 | (M = 0 | f[T >> 2]) ? M : 1) << 1)) | 0, 0))
            ) {
              (f[(T + 4) >> 2] = M),
                (f[T >> 2] = ~M),
                (f[A >> 2] = T + 8),
                (y = 24);
              break;
            }
            n = f[A >> 2] = 0;
            break;
          }
          y = 24;
        } while (0);
        e: do {
          if (24 == (0 | y)) {
            for (
              t[(D = (e + 24) | 0) >> 0] = h,
                t[(e + 25) >> 0] = b,
                A = (e + 176) | 0,
                T = 0;
              (M = 255 & (I = 0 | t[(i + T) >> 0])),
                (I << 24) >> 24 &&
                  (0 | f[(U + (M << 2)) >> 2] ||
                    ((f[O >> 2] = 866),
                    (f[(O + 4) >> 2] = 2276),
                    (f[(O + 8) >> 2] = 977),
                    Ne(o, 812, O),
                    be(o)),
                  (M = 0 | f[(I = (R + (M << 2)) | 0) >> 2]),
                  (f[I >> 2] = M + 1),
                  k >>> 0 <= M >>> 0 &&
                    ((f[g >> 2] = 866),
                    (f[(g + 4) >> 2] = 2280),
                    (f[(g + 8) >> 2] = 990),
                    Ne(o, 812, g),
                    be(o)),
                  (a[((0 | f[A >> 2]) + (M << 1)) >> 1] = T)),
                (0 | (T = (T + 1) | 0)) != (0 | r);

            );
            if (
              ((w = (0 | c[D >> 0]) >>> 0 < n >>> 0 ? n : 0),
              (P = 0 != (0 | (f[(I = (e + 8) | 0) >> 2] = w))))
            ) {
              (N = 1 << w), (M = (e + 164) | 0);
              do {
                if (N >>> 0 > (0 | f[M >> 2]) >>> 0) {
                  (f[M >> 2] = N), (M = 0 | f[(A = (e + 168) | 0) >> 2]);
                  do {
                    if (0 | M) {
                      if (
                        ((O = 0 | f[(M + -4) >> 2]),
                        (M = (M + -8) | 0),
                        (0 != (0 | O) && (0 | O) == (0 | ~f[M >> 2])) ||
                          ((f[C >> 2] = 866),
                          (f[(C + 4) >> 2] = 651),
                          (f[(C + 8) >> 2] = 1579),
                          Ne(o, 812, C),
                          be(o)),
                        7 & M)
                      ) {
                        (f[L >> 2] = 866),
                          (f[(L + 4) >> 2] = 2506),
                          (f[(L + 8) >> 2] = 1232),
                          Ne(o, 812, L),
                          be(o);
                        break;
                      }
                      Ee(M, 0, 0, 1, 0);
                      break;
                    }
                  } while (0);
                  if ((T = 0 | ce((8 + (M = N << 2)) | 0, 0))) {
                    (L = (T + 8) | 0),
                      (f[(T + 4) >> 2] = N),
                      (f[T >> 2] = ~N),
                      (T = f[A >> 2] = L);
                    break;
                  }
                  n = f[A >> 2] = 0;
                  break e;
                }
                (M = N << 2), (T = 0 | f[(A = T = (e + 168) | 0) >> 2]);
              } while (0);
              se(0 | T, -1, 0 | M), (g = (e + 176) | 0), (R = 1);
              do {
                if (
                  0 | f[(U + (R << 2)) >> 2] &&
                  ((C = 1 << (O = (w - R) | 0)),
                  (T = 0 | f[(u + ((M = (R + -1) | 0) << 2)) >> 2]),
                  16 <= M >>> 0 &&
                    ((f[l >> 2] = 866),
                    (f[(l + 4) >> 2] = 1960),
                    (f[(l + 8) >> 2] = 1453),
                    Ne(o, 812, l),
                    be(o)),
                  T >>> 0 <=
                    (r =
                      0 == (0 | (r = 0 | f[(e + 28 + (M << 2)) >> 2]))
                        ? -1
                        : ((r + -1) | 0) >>> ((16 - R) | 0)) >>>
                      0)
                ) {
                  (k = ((0 | f[(e + 96 + (M << 2)) >> 2]) - T) | 0),
                    (y = R << 16);
                  do {
                    for (
                      M = 0 | _[((0 | f[g >> 2]) + ((k + T) << 1)) >> 1],
                        (0 | c[(i + M) >> 0]) != (0 | R) &&
                          ((f[s >> 2] = 866),
                          (f[(s + 4) >> 2] = 2322),
                          (f[(s + 8) >> 2] = 1019),
                          Ne(o, 812, s),
                          be(o)),
                        S = T << O,
                        p = M | y,
                        h = 0;
                      N >>> 0 <= (v = (h + S) | 0) >>> 0 &&
                        ((f[d >> 2] = 866),
                        (f[(d + 4) >> 2] = 2328),
                        (f[(d + 8) >> 2] = 1053),
                        Ne(o, 812, d),
                        be(o)),
                        (M = 0 | f[A >> 2]),
                        -1 != (0 | f[(M + (v << 2)) >> 2]) &&
                          ((f[F >> 2] = 866),
                          (f[(F + 4) >> 2] = 2330),
                          (f[(F + 8) >> 2] = 1076),
                          Ne(o, 812, F),
                          be(o),
                          (M = 0 | f[A >> 2])),
                        (f[(M + (v << 2)) >> 2] = p),
                        (h = (h + 1) | 0) >>> 0 < C >>> 0;

                    );
                    T = (T + 1) | 0;
                  } while (T >>> 0 <= r >>> 0);
                }
                R = (R + 1) | 0;
              } while (R >>> 0 <= w >>> 0);
            }
            (f[(M = (e + 96) | 0) >> 2] = (0 | f[M >> 2]) - (0 | f[u >> 2])),
              (f[(M = (e + 100) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 4) >> 2])),
              (f[(M = (e + 104) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 8) >> 2])),
              (f[(M = (e + 108) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 12) >> 2])),
              (f[(M = (e + 112) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 16) >> 2])),
              (f[(M = (e + 116) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 20) >> 2])),
              (f[(M = (e + 120) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 24) >> 2])),
              (f[(M = (e + 124) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 28) >> 2])),
              (f[(M = (e + 128) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 32) >> 2])),
              (f[(M = (e + 132) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 36) >> 2])),
              (f[(M = (e + 136) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 40) >> 2])),
              (f[(M = (e + 140) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 44) >> 2])),
              (f[(M = (e + 144) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 48) >> 2])),
              (f[(M = (e + 148) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 52) >> 2])),
              (f[(M = (e + 152) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 56) >> 2])),
              (f[(M = (e + 156) | 0) >> 2] =
                (0 | f[M >> 2]) - (0 | f[(u + 60) >> 2])),
              (f[(M = (e + 16) | 0) >> 2] = 0),
              (f[(T = (e + 20) | 0) >> 2] = c[D >> 0]);
            r: do {
              if (P) {
                do {
                  if (!n) break r;
                  n = ((F = n) + -1) | 0;
                } while (!(0 | f[(U + (F << 2)) >> 2]));
                if (
                  ((f[M >> 2] = f[(e + 28 + (n << 2)) >> 2]),
                  (n = (w + 1) | 0),
                  (f[T >> 2] = n) >>> 0 <= b >>> 0)
                ) {
                  for (; !(0 | f[(U + (n << 2)) >> 2]); )
                    if (b >>> 0 < (n = (n + 1) | 0) >>> 0) break r;
                  f[T >> 2] = n;
                }
              }
            } while (0);
            (f[(e + 92) >> 2] = -1),
              (f[(e + 160) >> 2] = 1048575),
              (f[(e + 12) >> 2] = 32 - (0 | f[I >> 2])),
              (n = 1);
          }
        } while (0);
        return (m = E), 0 | n;
      }
      function G(e) {
        var r = 0,
          i = 0,
          n = 0,
          t = 0,
          o = 0,
          a = 0,
          u = 0,
          l = 0;
        if ((e |= 0)) {
          (i = (e + -8) | 0),
            (t = 0 | f[1148]),
            (l = (i + (r = -8 & (e = 0 | f[(e + -4) >> 2]))) | 0);
          do {
            if (1 & e) a = u = i;
            else {
              if (((n = 0 | f[i >> 2]), !(3 & e))) return;
              if (((o = (n + r) | 0), (a = (i + (0 - n)) | 0) >>> 0 < t >>> 0))
                return;
              if ((0 | a) == (0 | f[1149])) {
                if (3 == ((3 & (r = 0 | f[(e = (l + 4) | 0) >> 2])) | 0))
                  return (
                    (f[1146] = o),
                    (f[e >> 2] = -2 & r),
                    (f[(a + 4) >> 2] = 1 | o),
                    void (f[(a + o) >> 2] = o)
                  );
                (u = a), (r = o);
                break;
              }
              if (((i = n >>> 3), n >>> 0 < 256)) {
                if (
                  ((e = 0 | f[(a + 8) >> 2]),
                  (0 | (r = 0 | f[(a + 12) >> 2])) == (0 | e))
                ) {
                  (f[1144] = f[1144] & ~(1 << i)), (u = a), (r = o);
                  break;
                }
                (f[(e + 12) >> 2] = r), (f[(r + 8) >> 2] = e), (u = a), (r = o);
                break;
              }
              (t = 0 | f[(a + 24) >> 2]), (e = 0 | f[(a + 12) >> 2]);
              do {
                if ((0 | e) == (0 | a)) {
                  if (!(e = 0 | f[(r = (4 + (i = (a + 16) | 0)) | 0) >> 2])) {
                    if (!(e = 0 | f[i >> 2])) {
                      e = 0;
                      break;
                    }
                    r = i;
                  }
                  for (;;)
                    if (0 | (n = 0 | f[(i = (e + 20) | 0) >> 2]))
                      (e = n), (r = i);
                    else {
                      if (!(n = 0 | f[(i = (e + 16) | 0) >> 2])) break;
                      (e = n), (r = i);
                    }
                  f[r >> 2] = 0;
                } else
                  (u = 0 | f[(a + 8) >> 2]),
                    (f[(u + 12) >> 2] = e),
                    (f[(e + 8) >> 2] = u);
              } while (0);
              if (t) {
                if (
                  ((r = 0 | f[(a + 28) >> 2]),
                  (0 | a) == (0 | f[(i = (4880 + (r << 2)) | 0) >> 2]))
                ) {
                  if (!(f[i >> 2] = e)) {
                    (f[1145] = f[1145] & ~(1 << r)), (u = a), (r = o);
                    break;
                  }
                } else if (
                  !(f[
                    (t +
                      16 +
                      ((((0 | f[(t + 16) >> 2]) != (0 | a)) & 1) << 2)) >>
                      2
                  ] = e)
                ) {
                  (u = a), (r = o);
                  break;
                }
                (f[(e + 24) >> 2] = t),
                  0 | (i = 0 | f[(r = (a + 16) | 0) >> 2]) &&
                    ((f[(e + 16) >> 2] = i), (f[(i + 24) >> 2] = e)),
                  (r = 0 | f[(r + 4) >> 2]) &&
                    ((f[(e + 20) >> 2] = r), (f[(r + 24) >> 2] = e)),
                  (u = a),
                  (r = o);
              } else (u = a), (r = o);
            }
          } while (0);
          if (
            !(l >>> 0 <= a >>> 0) &&
            1 & (n = 0 | f[(e = (l + 4) | 0) >> 2])
          ) {
            if (2 & n)
              (f[e >> 2] = -2 & n),
                (f[(u + 4) >> 2] = 1 | r),
                (t = f[(a + r) >> 2] = r);
            else {
              if (((e = 0 | f[1149]), (0 | l) == (0 | f[1150]))) {
                if (
                  ((l = ((0 | f[1147]) + r) | 0),
                  (f[1147] = l),
                  (f[1150] = u),
                  (f[(u + 4) >> 2] = 1 | l),
                  (0 | u) != (0 | e))
                )
                  return;
                return (f[1149] = 0), void (f[1146] = 0);
              }
              if ((0 | l) == (0 | e))
                return (
                  (l = ((0 | f[1146]) + r) | 0),
                  (f[1146] = l),
                  (f[1149] = a),
                  (f[(u + 4) >> 2] = 1 | l),
                  void (f[(a + l) >> 2] = l)
                );
              (t = ((-8 & n) + r) | 0), (i = n >>> 3);
              do {
                if (n >>> 0 < 256) {
                  if (
                    ((r = 0 | f[(l + 8) >> 2]),
                    (0 | (e = 0 | f[(l + 12) >> 2])) == (0 | r))
                  ) {
                    f[1144] = f[1144] & ~(1 << i);
                    break;
                  }
                  (f[(r + 12) >> 2] = e), (f[(e + 8) >> 2] = r);
                  break;
                }
                (o = 0 | f[(l + 24) >> 2]), (e = 0 | f[(l + 12) >> 2]);
                do {
                  if ((0 | e) == (0 | l)) {
                    if (!(e = 0 | f[(r = (4 + (i = (l + 16) | 0)) | 0) >> 2])) {
                      if (!(e = 0 | f[i >> 2])) {
                        i = 0;
                        break;
                      }
                      r = i;
                    }
                    for (;;)
                      if (0 | (n = 0 | f[(i = (e + 20) | 0) >> 2]))
                        (e = n), (r = i);
                      else {
                        if (!(n = 0 | f[(i = (e + 16) | 0) >> 2])) break;
                        (e = n), (r = i);
                      }
                    (f[r >> 2] = 0), (i = e);
                  } else
                    (i = 0 | f[(l + 8) >> 2]),
                      (f[(i + 12) >> 2] = e),
                      (f[(e + 8) >> 2] = i),
                      (i = e);
                } while (0);
                if (0 | o) {
                  if (
                    ((e = 0 | f[(l + 28) >> 2]),
                    (0 | l) == (0 | f[(r = (4880 + (e << 2)) | 0) >> 2]))
                  ) {
                    if (!(f[r >> 2] = i)) {
                      f[1145] = f[1145] & ~(1 << e);
                      break;
                    }
                  } else if (
                    !(f[
                      (o +
                        16 +
                        ((((0 | f[(o + 16) >> 2]) != (0 | l)) & 1) << 2)) >>
                        2
                    ] = i)
                  )
                    break;
                  (f[(i + 24) >> 2] = o),
                    0 | (r = 0 | f[(e = (l + 16) | 0) >> 2]) &&
                      ((f[(i + 16) >> 2] = r), (f[(r + 24) >> 2] = i)),
                    0 | (e = 0 | f[(e + 4) >> 2]) &&
                      ((f[(i + 20) >> 2] = e), (f[(e + 24) >> 2] = i));
                }
              } while (0);
              if (
                ((f[(u + 4) >> 2] = 1 | t),
                (f[(a + t) >> 2] = t),
                (0 | u) == (0 | f[1149]))
              )
                return void (f[1146] = t);
            }
            if (((e = t >>> 3), t >>> 0 < 256))
              return (
                (i = (4616 + ((e << 1) << 2)) | 0),
                (r = 0 | f[1144]) & (e = 1 << e)
                  ? (e = 0 | f[(r = (i + 8) | 0) >> 2])
                  : ((f[1144] = r | e), (r = ((e = i) + 8) | 0)),
                (f[r >> 2] = u),
                (f[(e + 12) >> 2] = u),
                (f[(u + 8) >> 2] = e),
                void (f[(u + 12) >> 2] = i)
              );
            (n =
              (4880 +
                ((e = (e = t >>> 8)
                  ? 16777215 < t >>> 0
                    ? 31
                    : ((t >>>
                        ((7 +
                          (e =
                            (14 -
                              ((o =
                                (((520192 +
                                  (l =
                                    e <<
                                    (a = (((e + 1048320) | 0) >>> 16) & 8))) |
                                  0) >>>
                                  16) &
                                4) |
                                a |
                                (e = (((245760 + (l <<= o)) | 0) >>> 16) & 2)) +
                              ((l << e) >>> 15)) |
                            0)) |
                          0)) &
                        1) |
                      (e << 1)
                  : 0) <<
                  2)) |
              0),
              (f[(u + 28) >> 2] = e),
              (f[(u + 20) >> 2] = 0),
              (r = (f[(u + 16) >> 2] = 0) | f[1145]),
              (i = 1 << e);
            do {
              if (r & i) {
                for (
                  r = t << (31 == (0 | e) ? 0 : (25 - (e >>> 1)) | 0),
                    i = 0 | f[n >> 2];
                  ;

                ) {
                  if (((-8 & f[(i + 4) >> 2]) | 0) == (0 | t)) {
                    e = 73;
                    break;
                  }
                  if (
                    !(e = 0 | f[(n = (i + 16 + ((r >>> 31) << 2)) | 0) >> 2])
                  ) {
                    e = 72;
                    break;
                  }
                  (r <<= 1), (i = e);
                }
                if (72 == (0 | e)) {
                  (f[n >> 2] = u),
                    (f[(u + 24) >> 2] = i),
                    (f[(u + 12) >> 2] = u),
                    (f[(u + 8) >> 2] = u);
                  break;
                }
                if (73 == (0 | e)) {
                  (l = 0 | f[(a = (i + 8) | 0) >> 2]),
                    (f[(l + 12) >> 2] = u),
                    (f[a >> 2] = u),
                    (f[(u + 8) >> 2] = l),
                    (f[(u + 12) >> 2] = i),
                    (f[(u + 24) >> 2] = 0);
                  break;
                }
              } else
                (f[1145] = r | i),
                  (f[n >> 2] = u),
                  (f[(u + 24) >> 2] = n),
                  (f[(u + 12) >> 2] = u),
                  (f[(u + 8) >> 2] = u);
            } while (0);
            if (((l = ((0 | f[1152]) - 1) | 0), !(f[1152] = l))) {
              for (e = 5032; (e = 0 | f[e >> 2]); ) e = (e + 8) | 0;
              f[1152] = -1;
            }
          }
        }
      }
      function W(e, r) {
        var i = 0,
          n = 0,
          t = 0,
          o = 0,
          a = 0,
          u = 0,
          l = 0;
        (l = ((e |= 0) + (r |= 0)) | 0), (i = 0 | f[(e + 4) >> 2]);
        do {
          if (1 & i) (u = e), (i = r);
          else {
            if (((n = 0 | f[e >> 2]), !(3 & i))) return;
            if (
              ((a = (n + r) | 0),
              (0 | (o = (e + (0 - n)) | 0)) == (0 | f[1149]))
            ) {
              if (3 == ((3 & (i = 0 | f[(e = (l + 4) | 0) >> 2])) | 0))
                return (
                  (f[1146] = a),
                  (f[e >> 2] = -2 & i),
                  (f[(o + 4) >> 2] = 1 | a),
                  void (f[(o + a) >> 2] = a)
                );
              (u = o), (i = a);
              break;
            }
            if (((r = n >>> 3), n >>> 0 < 256)) {
              if (
                ((e = 0 | f[(o + 8) >> 2]),
                (0 | (i = 0 | f[(o + 12) >> 2])) == (0 | e))
              ) {
                (f[1144] = f[1144] & ~(1 << r)), (u = o), (i = a);
                break;
              }
              (f[(e + 12) >> 2] = i), (f[(i + 8) >> 2] = e), (u = o), (i = a);
              break;
            }
            (t = 0 | f[(o + 24) >> 2]), (e = 0 | f[(o + 12) >> 2]);
            do {
              if ((0 | e) == (0 | o)) {
                if (!(e = 0 | f[(i = (4 + (r = (o + 16) | 0)) | 0) >> 2])) {
                  if (!(e = 0 | f[r >> 2])) {
                    e = 0;
                    break;
                  }
                  i = r;
                }
                for (;;)
                  if (0 | (n = 0 | f[(r = (e + 20) | 0) >> 2]))
                    (e = n), (i = r);
                  else {
                    if (!(n = 0 | f[(r = (e + 16) | 0) >> 2])) break;
                    (e = n), (i = r);
                  }
                f[i >> 2] = 0;
              } else
                (u = 0 | f[(o + 8) >> 2]),
                  (f[(u + 12) >> 2] = e),
                  (f[(e + 8) >> 2] = u);
            } while (0);
            if (t) {
              if (
                ((i = 0 | f[(o + 28) >> 2]),
                (0 | o) == (0 | f[(r = (4880 + (i << 2)) | 0) >> 2]))
              ) {
                if (!(f[r >> 2] = e)) {
                  (f[1145] = f[1145] & ~(1 << i)), (u = o), (i = a);
                  break;
                }
              } else if (
                !(f[
                  (t + 16 + ((((0 | f[(t + 16) >> 2]) != (0 | o)) & 1) << 2)) >>
                    2
                ] = e)
              ) {
                (u = o), (i = a);
                break;
              }
              (f[(e + 24) >> 2] = t),
                0 | (r = 0 | f[(i = (o + 16) | 0) >> 2]) &&
                  ((f[(e + 16) >> 2] = r), (f[(r + 24) >> 2] = e)),
                (i = 0 | f[(i + 4) >> 2]) &&
                  ((f[(e + 20) >> 2] = i), (f[(i + 24) >> 2] = e)),
                (u = o),
                (i = a);
            } else (u = o), (i = a);
          }
        } while (0);
        if (2 & (n = 0 | f[(e = (l + 4) | 0) >> 2]))
          (f[e >> 2] = -2 & n),
            (f[(u + 4) >> 2] = 1 | i),
            (f[(u + i) >> 2] = i);
        else {
          if (((e = 0 | f[1149]), (0 | l) == (0 | f[1150]))) {
            if (
              ((l = ((0 | f[1147]) + i) | 0),
              (f[1147] = l),
              (f[1150] = u),
              (f[(u + 4) >> 2] = 1 | l),
              (0 | u) != (0 | e))
            )
              return;
            return (f[1149] = 0), void (f[1146] = 0);
          }
          if ((0 | l) == (0 | e))
            return (
              (l = ((0 | f[1146]) + i) | 0),
              (f[1146] = l),
              (f[1149] = u),
              (f[(u + 4) >> 2] = 1 | l),
              void (f[(u + l) >> 2] = l)
            );
          (o = ((-8 & n) + i) | 0), (r = n >>> 3);
          do {
            if (n >>> 0 < 256) {
              if (
                ((i = 0 | f[(l + 8) >> 2]),
                (0 | (e = 0 | f[(l + 12) >> 2])) == (0 | i))
              ) {
                f[1144] = f[1144] & ~(1 << r);
                break;
              }
              (f[(i + 12) >> 2] = e), (f[(e + 8) >> 2] = i);
              break;
            }
            (t = 0 | f[(l + 24) >> 2]), (e = 0 | f[(l + 12) >> 2]);
            do {
              if ((0 | e) == (0 | l)) {
                if (!(e = 0 | f[(i = (4 + (r = (l + 16) | 0)) | 0) >> 2])) {
                  if (!(e = 0 | f[r >> 2])) {
                    r = 0;
                    break;
                  }
                  i = r;
                }
                for (;;)
                  if (0 | (n = 0 | f[(r = (e + 20) | 0) >> 2]))
                    (e = n), (i = r);
                  else {
                    if (!(n = 0 | f[(r = (e + 16) | 0) >> 2])) break;
                    (e = n), (i = r);
                  }
                (f[i >> 2] = 0), (r = e);
              } else
                (r = 0 | f[(l + 8) >> 2]),
                  (f[(r + 12) >> 2] = e),
                  (f[(e + 8) >> 2] = r),
                  (r = e);
            } while (0);
            if (0 | t) {
              if (
                ((e = 0 | f[(l + 28) >> 2]),
                (0 | l) == (0 | f[(i = (4880 + (e << 2)) | 0) >> 2]))
              ) {
                if (!(f[i >> 2] = r)) {
                  f[1145] = f[1145] & ~(1 << e);
                  break;
                }
              } else if (
                !(f[
                  (t + 16 + ((((0 | f[(t + 16) >> 2]) != (0 | l)) & 1) << 2)) >>
                    2
                ] = r)
              )
                break;
              (f[(r + 24) >> 2] = t),
                0 | (i = 0 | f[(e = (l + 16) | 0) >> 2]) &&
                  ((f[(r + 16) >> 2] = i), (f[(i + 24) >> 2] = r)),
                0 | (e = 0 | f[(e + 4) >> 2]) &&
                  ((f[(r + 20) >> 2] = e), (f[(e + 24) >> 2] = r));
            }
          } while (0);
          if (
            ((f[(u + 4) >> 2] = 1 | o),
            (f[(u + o) >> 2] = o),
            (0 | u) == (0 | f[1149]))
          )
            return void (f[1146] = o);
          i = o;
        }
        if (((e = i >>> 3), i >>> 0 < 256))
          return (
            (r = (4616 + ((e << 1) << 2)) | 0),
            (i = 0 | f[1144]) & (e = 1 << e)
              ? (e = 0 | f[(i = (r + 8) | 0) >> 2])
              : ((f[1144] = i | e), (i = ((e = r) + 8) | 0)),
            (f[i >> 2] = u),
            (f[(e + 12) >> 2] = u),
            (f[(u + 8) >> 2] = e),
            void (f[(u + 12) >> 2] = r)
          );
        if (
          ((t =
            (4880 +
              ((e = (e = i >>> 8)
                ? 16777215 < i >>> 0
                  ? 31
                  : ((i >>>
                      ((7 +
                        (e =
                          (14 -
                            ((o =
                              (((520192 +
                                (l =
                                  e <<
                                  (a = (((e + 1048320) | 0) >>> 16) & 8))) |
                                0) >>>
                                16) &
                              4) |
                              a |
                              (e = (((245760 + (l <<= o)) | 0) >>> 16) & 2)) +
                            ((l << e) >>> 15)) |
                          0)) |
                        0)) &
                      1) |
                    (e << 1)
                : 0) <<
                2)) |
            0),
          (f[(u + 28) >> 2] = e),
          (f[(u + 20) >> 2] = 0),
          !((r = (f[(u + 16) >> 2] = 0) | f[1145]) & (n = 1 << e)))
        )
          return (
            (f[1145] = r | n),
            (f[t >> 2] = u),
            (f[(u + 24) >> 2] = t),
            (f[(u + 12) >> 2] = u),
            void (f[(u + 8) >> 2] = u)
          );
        for (
          r = i << (31 == (0 | e) ? 0 : (25 - (e >>> 1)) | 0),
            n = 0 | f[t >> 2];
          ;

        ) {
          if (((-8 & f[(n + 4) >> 2]) | 0) == (0 | i)) {
            e = 69;
            break;
          }
          if (!(e = 0 | f[(t = (n + 16 + ((r >>> 31) << 2)) | 0) >> 2])) {
            e = 68;
            break;
          }
          (r <<= 1), (n = e);
        }
        return 68 == (0 | e)
          ? ((f[t >> 2] = u),
            (f[(u + 24) >> 2] = n),
            (f[(u + 12) >> 2] = u),
            void (f[(u + 8) >> 2] = u))
          : 69 == (0 | e)
          ? ((l = 0 | f[(a = (n + 8) | 0) >> 2]),
            (f[(l + 12) >> 2] = u),
            (f[a >> 2] = u),
            (f[(u + 8) >> 2] = l),
            (f[(u + 12) >> 2] = n),
            void (f[(u + 24) >> 2] = 0))
          : void 0;
      }
      function z(e, r, i, n, t) {
        t |= 0;
        var o = 0,
          a = 0,
          u = 0,
          l = 0,
          c = 0,
          s = 0,
          _ = 0,
          d = 0,
          E = 0,
          M = 0;
        if (((s = e |= 0), (a = i |= 0), (u = d = n |= 0), !(c = l = r |= 0)))
          return (
            (o = 0 != (0 | t)),
            u
              ? (o && ((f[t >> 2] = 0 | e), (f[(t + 4) >> 2] = 0 & r)),
                (t = d = 0) | ((v = d), t))
              : (o &&
                  ((f[t >> 2] = (s >>> 0) % (a >>> 0)), (f[(t + 4) >> 2] = 0)),
                (d = 0) | ((v = d), (t = ((s >>> 0) / (a >>> 0)) >>> 0)))
          );
        o = 0 == (0 | u);
        do {
          if (a) {
            if (!o) {
              if ((o = ((0 | k(0 | u)) - (0 | k(0 | c))) | 0) >>> 0 <= 31) {
                (e =
                  ((s >>> ((a = _ = (o + 1) | 0) >>> 0)) &
                    (r = (o - 31) >> 31)) |
                  (c << (u = (31 - o) | 0))),
                  (r &= c >>> (_ >>> 0)),
                  (o = 0),
                  (u = s << u);
                break;
              }
              return (
                t && ((f[t >> 2] = 0 | e), (f[(t + 4) >> 2] = l | (0 & r))),
                (t = d = 0) | ((v = d), t)
              );
            }
            if (((o = (a - 1) | 0) & a) | 0) {
              (e =
                ((((_ =
                  (32 - (u = (33 + (0 | k(0 | a)) - (0 | k(0 | c))) | 0)) | 0) -
                  1) >>
                  31) &
                  (c >>> ((E = (u - 32) | 0) >>> 0))) |
                (((c << _) | (s >>> ((a = u) >>> 0))) & (r = E >> 31))),
                (r &= c >>> (u >>> 0)),
                (o = (s << (M = (64 - u) | 0)) & (l = _ >> 31)),
                (u =
                  (((c << M) | (s >>> (E >>> 0))) & l) |
                  ((s << _) & ((u - 33) >> 31)));
              break;
            }
            return (
              0 | t && ((f[t >> 2] = o & s), (f[(t + 4) >> 2] = 0)),
              1 == (0 | a)
                ? 0 | ((v = E = l | (0 & r)), (M = 0 | e))
                : ((M = 0 | ye(0 | a)),
                  0 |
                    ((v = E = (c >>> (M >>> 0)) | 0),
                    (M = (c << (32 - M)) | (s >>> (M >>> 0)) | 0)))
            );
          }
          if (o)
            return (
              0 | t &&
                ((f[t >> 2] = (c >>> 0) % (a >>> 0)), (f[(t + 4) >> 2] = 0)),
              (E = 0) | ((v = E), ((c >>> 0) / (a >>> 0)) >>> 0)
            );
          if (!s)
            return (
              0 | t &&
                ((f[t >> 2] = 0), (f[(t + 4) >> 2] = (c >>> 0) % (u >>> 0))),
              (E = 0) | ((v = E), ((c >>> 0) / (u >>> 0)) >>> 0)
            );
          if (!((o = (u - 1) | 0) & u))
            return (
              0 | t &&
                ((f[t >> 2] = 0 | e), (f[(t + 4) >> 2] = (o & c) | (0 & r))),
              (M = c >>> (((E = 0) | ye(0 | u)) >>> 0)),
              0 | ((v = E), M)
            );
          if ((o = ((0 | k(0 | u)) - (0 | k(0 | c))) | 0) >>> 0 <= 30) {
            (e =
              (c << (u = (31 - o) | 0)) |
              (s >>> ((a = r = (o + 1) | 0) >>> 0))),
              (r = c >>> (r >>> 0)),
              (o = 0),
              (u = s << u);
            break;
          }
          return (
            t && ((f[t >> 2] = 0 | e), (f[(t + 4) >> 2] = l | (0 & r))),
            (M = E = 0) | ((v = E), M)
          );
        } while (0);
        if (a) {
          for (
            c = 0 | Fe(0 | (_ = 0 | i), 0 | (s = d | (0 & n)), -1, -1),
              i = v,
              l = u,
              u = 0;
            (l = (o >>> 31) | ((n = l) << 1)),
              (o = u | (o << 1)),
              Le(
                0 | c,
                0 | i,
                0 | (n = (e << 1) | (n >>> 31) | 0),
                0 | (d = (e >>> 31) | (r << 1) | 0),
              ),
              (u = 1 & (E = ((M = v) >> 31) | (((0 | M) < 0 ? -1 : 0) << 1))),
              (e =
                0 |
                Le(
                  0 | n,
                  0 | d,
                  (E & _) | 0,
                  (((((0 | M) < 0 ? -1 : 0) >> 31) |
                    (((0 | M) < 0 ? -1 : 0) << 1)) &
                    s) |
                    0,
                )),
              (r = v),
              0 != (0 | (a = (a - 1) | 0));

          );
          (c = l), (l = 0);
        } else (c = u), (u = l = 0);
        return (
          (a = 0) | t && ((f[t >> 2] = e), (f[(t + 4) >> 2] = r)),
          0 |
            ((v = E =
              ((0 | o) >>> 31) |
              ((c | a) << 1) |
              (0 & ((a << 1) | (o >>> 31))) |
              l),
            (-2 & ((o << 1) | 0)) | u)
        );
      }
      function j(e, r) {
        e |= 0;
        var i,
          n,
          t,
          o,
          a,
          u,
          l,
          s,
          d = 0,
          E = 0,
          M = 0,
          T = 0,
          A = 0,
          b = 0;
        (m = ((s = m) + 576) | 0),
          (t = (s + 48) | 0),
          (a = (s + 32) | 0),
          (o = (s + 16) | 0),
          (l = ((n = s) + 64) | 0),
          (u = 0 | f[(20 + (r |= 0)) >> 2]),
          (0 | (i = 0 | f[(b = (e + 20) | 0) >> 2])) < 24
            ? ((E =
                (d = 0 | f[(A = (e + 4) | 0) >> 2]) >>> 0 <
                (M = 0 | f[(e + 8) >> 2]) >>> 0),
              (0 | i) < 16
                ? (E
                    ? ((T = (0 | c[d >> 0]) << 8), (d = (d + 1) | 0))
                    : (T = 0),
                  d >>> 0 < M >>> 0
                    ? ((M = 0 | c[d >> 0]), (d = (d + 1) | 0))
                    : (M = 0),
                  (f[A >> 2] = d),
                  (f[b >> 2] = i + 16),
                  (E = 16),
                  (d = M | T))
                : ((d = E ? ((f[A >> 2] = d + 1), 0 | c[d >> 0]) : 0),
                  (f[b >> 2] = i + 8),
                  (E = 24)),
              (M = f[(A = (e + 16) | 0) >> 2] | (d << (E - i))),
              (f[A >> 2] = M))
            : (M = 0 | f[(A = M = (e + 16) | 0) >> 2]),
          (T = (1 + (M >>> 16)) | 0);
        do {
          if (!(T >>> 0 <= (0 | f[(u + 16) >> 2]) >>> 0)) {
            for (
              E = 0 | f[(u + 20) >> 2];
              T >>> 0 >
              (0 | f[(u + 28 + ((d = (E + -1) | 0) << 2)) >> 2]) >>> 0;

            )
              E = (E + 1) | 0;
            if (
              (d =
                ((M >>> ((32 - E) | 0)) + (0 | f[(u + 96 + (d << 2)) >> 2])) |
                0) >>>
                0 <
              (0 | f[r >> 2]) >>> 0
            ) {
              d = 0 | _[((0 | f[(u + 176) >> 2]) + (d << 1)) >> 1];
              break;
            }
            return (
              (f[t >> 2] = 866),
              (f[(t + 4) >> 2] = 3275),
              (f[(t + 8) >> 2] = 1348),
              Ne(l, 812, t),
              be(l),
              (m = s),
              (b = 0) | b
            );
          }
          -1 ==
            (0 |
              (E =
                0 |
                f[
                  ((0 | f[(u + 168) >> 2]) +
                    ((M >>> ((32 - (0 | f[(u + 8) >> 2])) | 0)) << 2)) >>
                    2
                ])) &&
            ((f[n >> 2] = 866),
            (f[(n + 4) >> 2] = 3253),
            (f[(n + 8) >> 2] = 1393),
            Ne(l, 812, n),
            be(l)),
            (d = 65535 & E),
            (E >>>= 16),
            (0 | f[(r + 8) >> 2]) >>> 0 <= d >>> 0 &&
              ((f[o >> 2] = 866),
              (f[(o + 4) >> 2] = 909),
              (f[(o + 8) >> 2] = 1497),
              Ne(l, 812, o),
              be(l)),
            (0 | c[((0 | f[(r + 4) >> 2]) + d) >> 0]) != (0 | E) &&
              ((f[a >> 2] = 866),
              (f[(a + 4) >> 2] = 3257),
              (f[(a + 8) >> 2] = 1410),
              Ne(l, 812, a),
              be(l));
        } while (0);
        return (
          (f[A >> 2] = f[A >> 2] << E),
          (f[b >> 2] = (0 | f[b >> 2]) - E),
          (m = s),
          0 | d
        );
      }
      function J(e) {
        var r,
          i,
          n,
          o,
          a,
          u = 0,
          l = 0,
          c = 0;
        if (
          ((m = ((a = m) + 576) | 0),
          (c = (a + 48) | 0),
          (n = (a + 32) | 0),
          (i = (a + 16) | 0),
          (o = ((r = a) + 64) | 0),
          (f[(e |= 0) >> 2] = 0) | (l = 0 | f[(u = (e + 284) | 0) >> 2]) &&
            (7 & l
              ? ((f[r >> 2] = 866),
                (f[(r + 4) >> 2] = 2506),
                (f[(r + 8) >> 2] = 1232),
                Ne(o, 812, r),
                be(o))
              : Ee(l, 0, 0, 1, 0),
            (f[u >> 2] = 0),
            (f[(e + 288) >> 2] = 0),
            (f[(e + 292) >> 2] = 0)),
          (t[(e + 296) >> 0] = 0) | (l = 0 | f[(u = (e + 268) | 0) >> 2]) &&
            (7 & l
              ? ((f[i >> 2] = 866),
                (f[(i + 4) >> 2] = 2506),
                (f[(i + 8) >> 2] = 1232),
                Ne(o, 812, i),
                be(o))
              : Ee(l, 0, 0, 1, 0),
            (f[u >> 2] = 0),
            (f[(e + 272) >> 2] = 0),
            (f[(e + 276) >> 2] = 0)),
          (t[(e + 280) >> 0] = 0) | (l = 0 | f[(u = (e + 252) | 0) >> 2]) &&
            (7 & l
              ? ((f[n >> 2] = 866),
                (f[(n + 4) >> 2] = 2506),
                (f[(n + 8) >> 2] = 1232),
                Ne(o, 812, n),
                be(o))
              : Ee(l, 0, 0, 1, 0),
            (f[u >> 2] = 0),
            (f[(e + 256) >> 2] = 0),
            (f[(e + 260) >> 2] = 0)),
          !(l = (t[(e + 264) >> 0] = 0) | f[(u = (e + 236) | 0) >> 2]))
        )
          return (
            le((c = (e + 212) | (t[(c = (e + 248) | 0) >> 0] = 0))),
            le((c = (e + 188) | 0)),
            le((c = (e + 164) | 0)),
            le((c = (e + 140) | 0)),
            le((c = (e + 116) | 0)),
            void (m = a)
          );
        7 & l
          ? ((f[c >> 2] = 866),
            (f[(c + 4) >> 2] = 2506),
            (f[(c + 8) >> 2] = 1232),
            Ne(o, 812, c),
            be(o))
          : Ee(l, 0, 0, 1, 0),
          (f[u >> 2] = 0),
          (f[(e + 240) >> 2] = 0),
          (f[(e + 244) >> 2] = 0),
          le((c = (e + 212) | (t[(c = (e + 248) | 0) >> 0] = 0))),
          le((c = (e + 188) | 0)),
          le((c = (e + 164) | 0)),
          le((c = (e + 140) | 0)),
          le((c = (e + 116) | 0)),
          (m = a);
      }
      function Z(e, r, i) {
        (e |= 0), (r |= 0), (i |= 0);
        var n = 0,
          t = 0,
          o = 0;
        e: do {
          if (r >>> 0 <= 20)
            switch (0 | r) {
              case 9:
                (n = (3 + (0 | f[i >> 2])) & -4),
                  (r = 0 | f[n >> 2]),
                  (f[i >> 2] = n + 4),
                  (f[e >> 2] = r);
                break e;
              case 10:
                (n = (3 + (0 | f[i >> 2])) & -4),
                  (r = 0 | f[n >> 2]),
                  (f[i >> 2] = n + 4),
                  (f[(n = e) >> 2] = r),
                  (f[(n + 4) >> 2] = (((0 | r) < 0) << 31) >> 31);
                break e;
              case 11:
                (n = (3 + (0 | f[i >> 2])) & -4),
                  (r = 0 | f[n >> 2]),
                  (f[i >> 2] = n + 4),
                  (f[(n = e) >> 2] = r),
                  (f[(n + 4) >> 2] = 0);
                break e;
              case 12:
                (n = (7 + (0 | f[i >> 2])) & -8),
                  (t = 0 | f[(r = n) >> 2]),
                  (r = 0 | f[(r + 4) >> 2]),
                  (f[i >> 2] = n + 8),
                  (f[(n = e) >> 2] = t),
                  (f[(n + 4) >> 2] = r);
                break e;
              case 13:
                (t = (3 + (0 | f[i >> 2])) & -4),
                  (n = 0 | f[t >> 2]),
                  (f[i >> 2] = t + 4),
                  (n = ((65535 & n) << 16) >> 16),
                  (f[(t = e) >> 2] = n),
                  (f[(t + 4) >> 2] = (((0 | n) < 0) << 31) >> 31);
                break e;
              case 14:
                (t = (3 + (0 | f[i >> 2])) & -4),
                  (n = 0 | f[t >> 2]),
                  (f[i >> 2] = t + 4),
                  (f[(t = e) >> 2] = 65535 & n),
                  (f[(t + 4) >> 2] = 0);
                break e;
              case 15:
                (t = (3 + (0 | f[i >> 2])) & -4),
                  (n = 0 | f[t >> 2]),
                  (f[i >> 2] = t + 4),
                  (n = ((255 & n) << 24) >> 24),
                  (f[(t = e) >> 2] = n),
                  (f[(t + 4) >> 2] = (((0 | n) < 0) << 31) >> 31);
                break e;
              case 16:
                (t = (3 + (0 | f[i >> 2])) & -4),
                  (n = 0 | f[t >> 2]),
                  (f[i >> 2] = t + 4),
                  (f[(t = e) >> 2] = 255 & n),
                  (f[(t + 4) >> 2] = 0);
                break e;
              case 17:
              case 18:
                (t = (7 + (0 | f[i >> 2])) & -8),
                  (o = +T[t >> 3]),
                  (f[i >> 2] = t + 8),
                  (T[e >> 3] = o);
                break e;
              default:
                break e;
            }
        } while (0);
      }
      function q(e, r, i, n, t) {
        (r |= 0), (i |= 0), (n |= 0), (t |= 0);
        var o,
          a,
          u,
          l,
          c,
          s,
          _ = 0,
          d = 0,
          E = 0,
          M = 0;
        if (
          ((m = ((s = m) + 576) | 0),
          (l = (s + 48) | 0),
          (o = (s + 32) | 0),
          (d = (s + 16) | 0),
          (u = ((_ = s) + 64) | 0),
          (c = (s + 60) | 0),
          (M = (8 + (e |= 0)) | 0),
          (0 | f[(a = (e + 4) | 0) >> 2]) >>> 0 > (0 | f[M >> 2]) >>> 0 &&
            ((f[_ >> 2] = 866),
            (f[(_ + 4) >> 2] = 2123),
            (f[(_ + 8) >> 2] = 845),
            Ne(u, 812, _),
            be(u)),
          ((2147418112 / (n >>> 0)) | 0) >>> 0 <= r >>> 0 &&
            ((f[d >> 2] = 866),
            (f[(d + 4) >> 2] = 2124),
            (f[(d + 8) >> 2] = 885),
            Ne(u, 812, d),
            be(u)),
          r >>> 0 <= (_ = 0 | f[M >> 2]) >>> 0)
        )
          return (m = s), 1;
        if (
          (9 ==
            (0 |
              (i =
                i && 0 != (((E = (r + -1) | 0) & r) | 0)
                  ? ((r = (E >>> 16) | E),
                    (r |= r >>> 8),
                    (r |= r >>> 4),
                    (r = (1 + (((r |= r >>> 2) >>> 1) | r)) | 0)
                      ? 9
                      : ((r = 0), 10))
                  : 9)) &&
            r >>> 0 <= _ >>> 0 &&
            (i = 10),
          10 == (0 | i) &&
            ((f[o >> 2] = 866),
            (f[(o + 4) >> 2] = 2133),
            (f[(o + 8) >> 2] = 933),
            Ne(u, 812, o),
            be(u)),
          (E = 0 | S(r, n)),
          t)
        )
          if ((d = 0 | ce(E, c))) {
            ar[0 & t](d, 0 | f[e >> 2], 0 | f[a >> 2]), (_ = 0 | f[e >> 2]);
            do {
              if (0 | _) {
                if (7 & _) {
                  (f[l >> 2] = 866),
                    (f[(l + 4) >> 2] = 2506),
                    (f[(l + 8) >> 2] = 1232),
                    Ne(u, 812, l),
                    be(u);
                  break;
                }
                Ee(_, 0, 0, 1, 0);
                break;
              }
            } while (0);
            (f[e >> 2] = d), (i = 20);
          } else r = 0;
        else
          (_ =
            0 |
            (function (e, r, i, n) {
              (r |= 0), (i |= 0);
              var t,
                o,
                a,
                u,
                l,
                c = 0;
              return (
                (m = ((l = m) + 560) | 0),
                (c = (l + 32) | 0),
                (o = (l + 16) | 0),
                (a = ((t = l) + 48) | 0),
                (u = (l + 44) | 0),
                (7 & (e |= 0)) | 0
                  ? ((f[t >> 2] = 866),
                    (f[(t + 4) >> 2] = 2506),
                    (f[(t + 8) >> 2] = 1210),
                    Ne(a, 812, t),
                    be(a),
                    (m = l),
                    (c = 0) | c)
                  : 2147418112 < r >>> 0
                  ? ((f[o >> 2] = 866),
                    (f[(o + 4) >> 2] = 2506),
                    (f[(o + 8) >> 2] = 1103),
                    Ne(a, 812, o),
                    be(a),
                    (m = l),
                    (c = 0) | c)
                  : ((f[u >> 2] = r),
                    (e = 0 | Ee(e, r, u, 1, 0)),
                    0 | i && (f[i >> 2] = f[u >> 2]),
                    (7 & e) | 0 &&
                      ((f[c >> 2] = 866),
                      (f[(c + 4) >> 2] = 2558),
                      (f[(c + 8) >> 2] = 1156),
                      Ne(a, 812, c),
                      be(a)),
                    (m = l),
                    0 | e)
              );
            })(0 | f[e >> 2], E, c))
            ? ((f[e >> 2] = _), (i = 20))
            : (r = 0);
        return (
          20 == (0 | i) &&
            (E >>> 0 < (_ = 0 | f[c >> 2]) >>> 0 &&
              (r = ((_ >>> 0) / (n >>> 0)) | 0),
            (f[M >> 2] = r),
            (r = 1)),
          (m = s),
          0 | r
        );
      }
      function Q(e, r, i) {
        (e |= 0), (r |= 0);
        var n,
          o,
          a = 0;
        if (8192 <= (0 | (i |= 0))) return 0 | F(0 | e, 0 | r, 0 | i);
        if (((o = 0 | e), (n = (e + i) | 0), (3 & e) == (3 & r))) {
          for (; 3 & e; ) {
            if (!i) return 0 | o;
            (t[e >> 0] = 0 | t[r >> 0]),
              (e = (e + 1) | 0),
              (r = (r + 1) | 0),
              (i = (i - 1) | 0);
          }
          for (a = ((i = (-4 & n) | 0) - 64) | 0; (0 | e) <= (0 | a); )
            (f[e >> 2] = f[r >> 2]),
              (f[(e + 4) >> 2] = f[(r + 4) >> 2]),
              (f[(e + 8) >> 2] = f[(r + 8) >> 2]),
              (f[(e + 12) >> 2] = f[(r + 12) >> 2]),
              (f[(e + 16) >> 2] = f[(r + 16) >> 2]),
              (f[(e + 20) >> 2] = f[(r + 20) >> 2]),
              (f[(e + 24) >> 2] = f[(r + 24) >> 2]),
              (f[(e + 28) >> 2] = f[(r + 28) >> 2]),
              (f[(e + 32) >> 2] = f[(r + 32) >> 2]),
              (f[(e + 36) >> 2] = f[(r + 36) >> 2]),
              (f[(e + 40) >> 2] = f[(r + 40) >> 2]),
              (f[(e + 44) >> 2] = f[(r + 44) >> 2]),
              (f[(e + 48) >> 2] = f[(r + 48) >> 2]),
              (f[(e + 52) >> 2] = f[(r + 52) >> 2]),
              (f[(e + 56) >> 2] = f[(r + 56) >> 2]),
              (f[(e + 60) >> 2] = f[(r + 60) >> 2]),
              (e = (e + 64) | 0),
              (r = (r + 64) | 0);
          for (; (0 | e) < (0 | i); )
            (f[e >> 2] = f[r >> 2]), (e = (e + 4) | 0), (r = (r + 4) | 0);
        } else
          for (i = (n - 4) | 0; (0 | e) < (0 | i); )
            (t[e >> 0] = 0 | t[r >> 0]),
              (t[(e + 1) >> 0] = 0 | t[(r + 1) >> 0]),
              (t[(e + 2) >> 0] = 0 | t[(r + 2) >> 0]),
              (t[(e + 3) >> 0] = 0 | t[(r + 3) >> 0]),
              (e = (e + 4) | 0),
              (r = (r + 4) | 0);
        for (; (0 | e) < (0 | n); )
          (t[e >> 0] = 0 | t[r >> 0]), (e = (e + 1) | 0), (r = (r + 1) | 0);
        return 0 | o;
      }
      function $(e, r, i) {
        (r |= 0), (i |= 0);
        var n,
          t,
          o,
          a,
          u,
          l = 0,
          c = 0,
          s = 0,
          _ = 0,
          d = 0,
          E = 0;
        (m = ((u = m) + 48) | 0),
          (a = (u + 16) | 0),
          (c = ((s = u) + 32) | 0),
          (l = 0 | f[(t = (28 + (e |= 0)) | 0) >> 2]),
          (f[c >> 2] = l),
          (l = ((0 | f[(o = (e + 20) | 0) >> 2]) - l) | 0),
          (f[(c + 4) >> 2] = l),
          (f[(c + 8) >> 2] = r),
          (l = (l + (f[(c + 12) >> 2] = i)) | 0),
          (n = (e + 60) | 0),
          (f[s >> 2] = f[n >> 2]),
          (f[(s + 4) >> 2] = c),
          (f[(s + 8) >> 2] = 2),
          (s = 0 | Ue(0 | x(146, 0 | s)));
        e: do {
          if ((0 | l) != (0 | s)) {
            for (r = 2; !((0 | s) < 0); )
              if (
                ((l = (l - s) | 0),
                (r =
                  ((((d = (E = 0 | f[(c + 4) >> 2]) >>> 0 < s >>> 0) << 31) >>
                    31) +
                    r) |
                  0),
                (E = (s - (d ? E : 0)) | 0),
                (f[(c = d ? (c + 8) | 0 : c) >> 2] = (0 | f[c >> 2]) + E),
                (f[(d = (c + 4) | 0) >> 2] = (0 | f[d >> 2]) - E),
                (f[a >> 2] = f[n >> 2]),
                (f[(a + 4) >> 2] = c),
                (f[(a + 8) >> 2] = r),
                (0 | l) == (0 | (s = 0 | Ue(0 | x(146, 0 | a)))))
              ) {
                _ = 3;
                break e;
              }
            (f[(e + 16) >> 2] = 0),
              (f[t >> 2] = 0),
              (f[o >> 2] = 0),
              (f[e >> 2] = 32 | f[e >> 2]),
              (i = 2 == (0 | r) ? 0 : (i - (0 | f[(c + 4) >> 2])) | 0);
          } else _ = 3;
        } while (0);
        return (
          3 == (0 | _) &&
            ((E = 0 | f[(e + 44) >> 2]),
            (f[(e + 16) >> 2] = E + (0 | f[(e + 48) >> 2])),
            (f[t >> 2] = E),
            (f[o >> 2] = E)),
          (m = u),
          0 | i
        );
      }
      function ee(e, r, i) {
        (e |= 0), (r |= 0), (i |= 0);
        var n,
          o,
          a,
          u,
          l,
          c = 0,
          s = 0,
          _ = 0,
          d = 0,
          E = 0,
          M = 0,
          T = 0;
        for (
          m = ((l = m) + 224) | 0,
            n = (l + 120) | 0,
            u = ((a = l) + 136) | 0,
            s = (40 + (c = o = (l + 80) | 0)) | 0;
          (0 | (c = (c + 4) | (f[c >> 2] = 0))) < (0 | s);

        );
        return (
          (f[n >> 2] = f[i >> 2]),
          (i =
            (0 | X(0, r, n, a, o)) < 0
              ? -1
              : (f[(e + 76) >> 2],
                (T = 32 & (i = 0 | f[e >> 2])),
                (0 | t[(e + 74) >> 0]) < 1 && (f[e >> 2] = -33 & i),
                0 | f[(c = (e + 48) | 0) >> 2]
                  ? (i = 0 | X(e, r, n, a, o))
                  : ((_ = 0 | f[(s = (e + 44) | 0) >> 2]),
                    (f[s >> 2] = u),
                    (f[(d = (e + 28) | 0) >> 2] = u),
                    (f[(E = (e + 20) | 0) >> 2] = u),
                    (f[c >> 2] = 80),
                    (f[(M = (e + 16) | 0) >> 2] = u + 80),
                    (i = 0 | X(e, r, n, a, o)),
                    _ &&
                      (ir[7 & f[(e + 36) >> 2]](e, 0, 0),
                      (i = 0 == (0 | f[E >> 2]) ? -1 : i),
                      (f[s >> 2] = _),
                      (f[c >> 2] = 0),
                      (f[M >> 2] = 0),
                      (f[d >> 2] = 0),
                      (f[E >> 2] = 0))),
                (c = 0 | f[e >> 2]),
                (f[e >> 2] = c | T),
                0 == ((32 & c) | 0) ? i : -1)),
          (m = l),
          0 | i
        );
      }
      function re(e, r, i, n) {
        (r |= 0), (i |= 0), (n |= 0);
        var o,
          u,
          l,
          c,
          s,
          _,
          d,
          E = 0,
          M = 0;
        for (
          m = ((d = m) + 64) | 0,
            s = d,
            M = 0 | f[(e |= 0) >> 2],
            _ = (e + (0 | f[(M + -8) >> 2])) | 0,
            M = 0 | f[(M + -4) >> 2],
            f[s >> 2] = i,
            f[(s + 4) >> 2] = e,
            f[(s + 8) >> 2] = r,
            f[(s + 12) >> 2] = n,
            r = (s + 20) | 0,
            n = (s + 24) | 0,
            o = (s + 28) | 0,
            u = (s + 32) | 0,
            l = (s + 40) | 0,
            c = (36 + (E = e = (s + 16) | 0)) | 0;
          (0 | (E = (E + 4) | (f[E >> 2] = 0))) < (0 | c);

        );
        (a[(e + 36) >> 1] = 0), (t[(e + 38) >> 0] = 0);
        e: do {
          if (0 | Xe(M, i))
            (f[(s + 48) >> 2] = 1),
              fr[3 & f[(20 + (0 | f[M >> 2])) >> 2]](M, s, _, _, 1, 0),
              (e = 1 == (0 | f[n >> 2]) ? _ : 0);
          else {
            switch (
              (nr[3 & f[(24 + (0 | f[M >> 2])) >> 2]](M, s, _, 1, 0),
              0 | f[(s + 36) >> 2])
            ) {
              case 0:
                e =
                  (1 == (0 | f[l >> 2])) &
                  (1 == (0 | f[o >> 2])) &
                  (1 == (0 | f[u >> 2]))
                    ? 0 | f[r >> 2]
                    : 0;
                break e;
              case 1:
                break;
              default:
                e = 0;
                break e;
            }
            if (
              1 != (0 | f[n >> 2]) &&
              !(
                (0 == (0 | f[l >> 2])) &
                (1 == (0 | f[o >> 2])) &
                (1 == (0 | f[u >> 2]))
              )
            ) {
              e = 0;
              break;
            }
            e = 0 | f[e >> 2];
          }
        } while (0);
        return (m = d), 0 | e;
      }
      function ie(e) {
        var r,
          i = 0,
          n = 0,
          t = 0,
          o = 0,
          a = 0,
          u = 0,
          l = 0;
        if (
          ((m = ((r = m) + 544) | 0),
          (u = (r + 16) | 0),
          (o = ((i = r) + 32) | 0),
          8192 <=
            (((n = 0 | f[(a = (8 + (e |= 0)) | 0) >> 2]) - 1) | 0) >>> 0 &&
            ((f[i >> 2] = 866),
            (f[(i + 4) >> 2] = 3006),
            (f[(i + 8) >> 2] = 1257),
            Ne(o, 812, i),
            be(o)),
          (f[e >> 2] = n),
          (l = (i = 0 | f[(t = (e + 20) | 0) >> 2])
            ? n
            : ((i = 0 | ce(180, 0))
                ? ((f[(l = (i + 164) | 0) >> 2] = 0),
                  (f[(l + 4) >> 2] = 0),
                  (f[(l + 8) >> 2] = 0),
                  (f[(l + 12) >> 2] = 0))
                : (i = 0),
              (f[t >> 2] = i),
              0 | f[e >> 2])),
          (u =
            0 | f[a >> 2]
              ? l
              : ((f[u >> 2] = 866),
                (f[(u + 4) >> 2] = 910),
                (f[(u + 8) >> 2] = 1497),
                Ne(o, 812, u),
                be(o),
                0 | f[e >> 2])),
          (o = 0 | f[(e + 4) >> 2]),
          !(16 < u >>> 0))
        )
          return (e = (e = 0) | V(i, l, o, e)), (m = r), 0 | e;
        for (n = u, t = 0; (a = (t + 1) | 0), 3 < n >>> 0; )
          (n >>>= 1), (t = a);
        return (
          (e =
            0 |
            V(
              i,
              l,
              o,
              (e =
                255 &
                ((e =
                  (t + 2 + ((32 != (0 | a)) & ((1 << a) >>> 0 < u >>> 0) & 1)) |
                  0) >>>
                  0 <
                11
                  ? e
                  : 11)),
            )),
          (m = r),
          0 | e
        );
      }
      function ne(e) {
        var r,
          i,
          n,
          t,
          o,
          a,
          u = 0,
          l = 0;
        (m = ((a = m) + 576) | 0),
          (t = (a + 48) | 0),
          (o = (a + 32) | 0),
          (i = (a + 16) | 0),
          (n = ((r = a) + 64) | 0),
          (u = 0 | f[(168 + (e |= 0)) >> 2]);
        do {
          if (0 | u) {
            if (
              ((l = 0 | f[(u + -4) >> 2]),
              (u = (u + -8) | 0),
              (0 != (0 | l) && (0 | l) == (0 | ~f[u >> 2])) ||
                ((f[r >> 2] = 866),
                (f[(r + 4) >> 2] = 651),
                (f[(r + 8) >> 2] = 1579),
                Ne(n, 812, r),
                be(n)),
              7 & u)
            ) {
              (f[i >> 2] = 866),
                (f[(i + 4) >> 2] = 2506),
                (f[(i + 8) >> 2] = 1232),
                Ne(n, 812, i),
                be(n);
              break;
            }
            Ee(u, 0, 0, 1, 0);
            break;
          }
        } while (0);
        if ((u = 0 | f[(e + 176) >> 2]))
          return (
            (l = 0 | f[(u + -4) >> 2]),
            (u = (u + -8) | 0),
            (0 != (0 | l) && (0 | l) == (0 | ~f[u >> 2])) ||
              ((f[o >> 2] = 866),
              (f[(o + 4) >> 2] = 651),
              (f[(o + 8) >> 2] = 1579),
              Ne(n, 812, o),
              be(n)),
            7 & u
              ? ((f[t >> 2] = 866),
                (f[(t + 4) >> 2] = 2506),
                (f[(t + 8) >> 2] = 1232),
                Ne(n, 812, t),
                be(n))
              : Ee(u, 0, 0, 1, 0),
            void (m = a)
          );
        m = a;
      }
      function te(e, r, i) {
        var n;
        return (0 != (0 | (e |= 0))) &
          (73 < (r |= 0) >>> 0) &
          (0 != (0 | (i |= 0)))
          ? 40 != (0 | f[i >> 2]) ||
            18552 != (((0 | c[e >> 0]) << 8) | 0 | c[(e + 1) >> 0] | 0) ||
            (((0 | c[(e + 2) >> 0]) << 8) | 0 | c[(e + 3) >> 0]) >>> 0 < 74 ||
            (((0 | c[(e + 7) >> 0]) << 16) |
              ((0 | c[(e + 6) >> 0]) << 24) |
              ((0 | c[(e + 8) >> 0]) << 8) |
              0 |
              c[(e + 9) >> 0]) >>>
              0 >
              r >>> 0
            ? (i = 0) | i
            : ((f[(i + 4) >> 2] =
                ((0 | c[(e + 12) >> 0]) << 8) | 0 | c[(e + 13) >> 0]),
              (f[(i + 8) >> 2] =
                ((0 | c[(e + 14) >> 0]) << 8) | 0 | c[(e + 15) >> 0]),
              (f[(i + 12) >> 2] = c[(e + 16) >> 0]),
              (f[(i + 16) >> 2] = c[(e + 17) >> 0]),
              (r = (e + 18) | 0),
              (f[(n = (i + 32) | 0) >> 2] = c[r >> 0]),
              (r = (f[(n + 4) >> 2] = 0) | t[r >> 0]),
              (f[(i + 20) >> 2] =
                ((r << 24) >> 24 == 0) | ((r << 24) >> 24 == 9) ? 8 : 16),
              (f[(i + 24) >> 2] =
                ((0 | c[(e + 26) >> 0]) << 16) |
                ((0 | c[(e + 25) >> 0]) << 24) |
                ((0 | c[(e + 27) >> 0]) << 8) |
                0 |
                c[(e + 28) >> 0]),
              (f[(i + 28) >> 2] =
                ((0 | c[(e + 30) >> 0]) << 16) |
                ((0 | c[(e + 29) >> 0]) << 24) |
                ((0 | c[(e + 31) >> 0]) << 8) |
                0 |
                c[(e + 32) >> 0]),
              0 | (i = 1))
          : (i = 0) | i;
      }
      function oe(e, r) {
        e |= 0;
        var i,
          n,
          t,
          o = 0,
          a = 0,
          u = 0,
          l = 0,
          s = 0;
        if (
          ((m = ((t = m) + 544) | 0),
          (s = (t + 16) | 0),
          (l = ((o = t) + 32) | 0),
          33 <= (r |= 0) >>> 0 &&
            ((f[o >> 2] = 866),
            (f[(o + 4) >> 2] = 3199),
            (f[(o + 8) >> 2] = 1350),
            Ne(l, 812, o),
            be(l)),
          (0 | r) <= (0 | (o = 0 | f[(n = (e + 20) | 0) >> 2])))
        )
          return (
            (l = o),
            (s =
              (a = 0 | f[(u = a = (e + 16) | 0) >> 2]) >>> (s = (32 - r) | 0)),
            (a <<= r),
            (f[u >> 2] = a),
            (r = (l - r) | 0),
            (f[n >> 2] = r),
            (m = t),
            0 | s
          );
        for (
          a = (e + 4) | 0, u = (e + 8) | 0, i = (e + 16) | 0;
          (e =
            (0 | (e = 0 | f[a >> 2])) == (0 | f[u >> 2])
              ? 0
              : ((f[a >> 2] = e + 1), 0 | c[e >> 0])),
            (o = (o + 8) | 0),
            33 <= (0 | (f[n >> 2] = o)) &&
              ((f[s >> 2] = 866),
              (f[(s + 4) >> 2] = 3208),
              (f[(s + 8) >> 2] = 1366),
              Ne(l, 812, s),
              be(l),
              (o = 0 | f[n >> 2])),
            (e = (e << (32 - o)) | f[i >> 2]),
            (f[i >> 2] = e),
            (0 | o) < (0 | r);

        );
        return (
          (s = e >>> (s = (32 - r) | 0)),
          (l = e << r),
          (f[i >> 2] = l),
          (r = (o - r) | 0),
          (f[n >> 2] = r),
          (m = t),
          0 | s
        );
      }
      function ae(e, r, i) {
        e |= 0;
        var n = 0,
          o = 0,
          a = 0,
          u = 0;
        (a = 255 & (r |= 0)), (n = 0 != (0 | (i |= 0)));
        e: do {
          if (n & (0 != ((3 & e) | 0)))
            for (o = 255 & r; ; ) {
              if ((0 | t[e >> 0]) == (o << 24) >> 24) {
                u = 6;
                break e;
              }
              if (
                !(
                  (n = 0 != (0 | (i = (i + -1) | 0))) &
                  (0 != ((3 & (e = (e + 1) | 0)) | 0))
                )
              ) {
                u = 5;
                break;
              }
            }
          else u = 5;
        } while (0);
        5 == (0 | u) && (n ? (u = 6) : (i = 0));
        e: do {
          if (
            6 == (0 | u) &&
            ((o = 255 & r), (0 | t[e >> 0]) != (o << 24) >> 24)
          ) {
            n = 0 | S(a, 16843009);
            r: do {
              if (3 < i >>> 0) {
                for (
                  ;
                  !(
                    (((-2139062144 & (a = f[e >> 2] ^ n)) ^ -2139062144) &
                      (a + -16843009)) |
                    0
                  );

                )
                  if (((e = (e + 4) | 0), (i = (i + -4) | 0) >>> 0 <= 3)) {
                    u = 11;
                    break r;
                  }
              } else u = 11;
            } while (0);
            if (11 == (0 | u) && !i) {
              i = 0;
              break;
            }
            for (;;) {
              if ((0 | t[e >> 0]) == (o << 24) >> 24) break e;
              if (((e = (e + 1) | 0), !(i = (i + -1) | 0))) {
                i = 0;
                break;
              }
            }
          }
        } while (0);
        return 0 | (0 | i ? e : 0);
      }
      function ue(e, r, i, n, o) {
        (r |= 0), (i |= 0), (n |= 0), (o |= 0);
        var a,
          u,
          l,
          s = 0,
          d = 0,
          E = 0;
        return (
          (m = ((l = m) + 528) | 0),
          (d = ((E = l) + 16) | 0),
          (a = 0 | f[(88 + (e |= 0)) >> 2]),
          (u =
            ((0 | c[(a + 70 + (o << 2) + 1) >> 0]) << 16) |
            ((0 | c[(a + 70 + (o << 2)) >> 0]) << 24) |
            ((0 | c[(a + 70 + (o << 2) + 2) >> 0]) << 8) |
            0 |
            c[(a + 70 + (o << 2) + 3) >> 0]) >>>
            0 <
            (s =
              (s = (o + 1) | 0) >>> 0 < (0 | c[(a + 16) >> 0]) >>> 0
                ? ((0 | c[(a + 70 + (s << 2) + 1) >> 0]) << 16) |
                  ((0 | c[(a + 70 + (s << 2)) >> 0]) << 24) |
                  ((0 | c[(a + 70 + (s << 2) + 2) >> 0]) << 8) |
                  0 |
                  c[(a + 70 + (s << 2) + 3) >> 0]
                : 0 | f[(e + 8) >> 2]) >>>
              0 ||
            ((f[E >> 2] = 866),
            (f[(E + 4) >> 2] = 3694),
            (f[(E + 8) >> 2] = 1508),
            Ne(d, 812, E),
            be(d)),
          (E =
            0 |
            (function (e, r, i, n, o, a, u) {
              (r |= 0), (i |= 0), (n |= 0), (o |= 0), (a |= 0), (u |= 0);
              var l,
                s = 0,
                d = 0,
                E = 0;
              if (
                ((E = 0 | f[(88 + (e |= 0)) >> 2]),
                (s =
                  (((1 <
                  (s = ((c[(E + 12) >> 0] << 8) | c[(E + 13) >> 0]) >>> u) >>> 0
                    ? s
                    : 1) +
                    3) |
                    0) >>>
                  2),
                (d =
                  (((1 <
                  (d = ((c[(E + 14) >> 0] << 8) | c[(E + 15) >> 0]) >>> u) >>> 0
                    ? d
                    : 1) +
                    3) |
                    0) >>>
                  2),
                (u = 0 | t[(E = (E + 18) | 0) >> 0]),
                (u =
                  0 |
                  S(
                    s,
                    ((u << 24) >> 24 == 0) | ((u << 24) >> 24 == 9) ? 8 : 16,
                  )),
                a)
              ) {
                if (!((0 == ((3 & a) | 0)) & (u >>> 0 <= a >>> 0)))
                  return (o = 0) | o;
                u = a;
              }
              if ((0 | S(u, d)) >>> 0 > o >>> 0) return (o = 0) | o;
              if (((a = ((s + 1) | 0) >>> 1), (l = ((d + 1) | 0) >>> 1), !i))
                return (o = 0) | o;
              switch (
                ((f[(e + 92) >> 2] = r),
                (f[(e + 96) >> 2] = r),
                (f[(e + 104) >> 2] = i),
                (f[(e + 100) >> 2] = r + i),
                (f[(e + 108) >> 2] = 0),
                (f[(e + 112) >> 2] = 0) | t[E >> 0])
              ) {
                case 0:
                  if (
                    !(
                      0 |
                      (function (e, r, i, n, o, a, u, l) {
                        (r |= 0),
                          (i |= 0),
                          (n |= 0),
                          (o |= 0),
                          (a |= 0),
                          (u |= 0),
                          (l |= 0);
                        var s,
                          _,
                          d,
                          E,
                          M,
                          T,
                          A,
                          b,
                          h,
                          p,
                          v,
                          k,
                          y,
                          R,
                          g,
                          O,
                          C,
                          N,
                          P,
                          w,
                          I,
                          L,
                          D,
                          F,
                          U,
                          H,
                          x,
                          B,
                          Y,
                          X,
                          K,
                          V,
                          G = 0,
                          W = 0,
                          z = 0,
                          J = 0,
                          Z = 0,
                          q = 0,
                          Q = 0,
                          $ = 0,
                          ee = 0,
                          re = 0,
                          ie = 0,
                          ne = 0,
                          te = 0,
                          oe = 0,
                          ae = 0,
                          ue = 0,
                          fe = 0,
                          le = 0;
                        if (
                          ((m = ((V = m) + 656) | 0),
                          (X = (V + 112) | 0),
                          (B = (V + 96) | 0),
                          (x = (V + 80) | 0),
                          (H = (V + 64) | 0),
                          (U = (V + 48) | 0),
                          (K = (V + 32) | 0),
                          (Y = (V + 16) | 0),
                          (L = ((F = V) + 144) | 0),
                          (D = (V + 128) | 0),
                          (R = 0 | f[(y = (240 + (e |= 0)) | 0) >> 2]),
                          (O = 0 | f[(g = (e + 256) | 0) >> 2]),
                          (C =
                            255 &
                            (ue = 0 | t[(17 + (0 | f[(e + 88) >> 2])) >> 0])),
                          !((ue << 24) >> 24))
                        )
                          return (m = V), 1;
                        (P = 0 == (0 | l)),
                          (I = (w = (u + -1) | 0) << 4),
                          (ue = (l + -1) | 0),
                          (A = 0 != ((1 & a) | 0)),
                          (b = n << 1),
                          (h = (e + 92) | 0),
                          (p = (e + 116) | 0),
                          (v = (e + 140) | 0),
                          (k = (e + 236) | 0),
                          (T = 0 != ((1 & o) | 0)),
                          (M = (e + 188) | 0),
                          (s = (e + 252) | 0),
                          (_ = (1 + (N = n >>> 2)) | 0),
                          (d = (N + 2) | 0),
                          (E = (N + 3) | 0),
                          (i = a = ae = 0),
                          (o = 1);
                        do {
                          if (!P)
                            for (te = 0 | f[(r + (ae << 2)) >> 2], oe = 0; ; ) {
                              if (
                                ((W = 0 == (0 | (ie = 1 & oe))),
                                (re = (((ie << 5) ^ 32) - 16) | 0),
                                (ie = (((ie << 1) ^ 2) - 1) | 0),
                                (ne = A & (e = (0 | oe) == (0 | ue))),
                                (0 | (G = W ? 0 : w)) !=
                                  (0 | (ee = W ? u : -1)))
                              )
                                for (
                                  $ = (A & e) ^ 1, Q = W ? te : (te + I) | 0;
                                  ;

                                ) {
                                  for (
                                    1 == (0 | o) && (o = 512 | j(h, p)),
                                      q = 7 & o,
                                      o >>>= 3,
                                      W = 0 | c[(1539 + q) >> 0],
                                      e = 0;
                                    (i =
                                      ((Z =
                                        (J =
                                          ((z = ((0 | j(h, v)) + i) | 0) - R) |
                                          0) >> 31) &
                                        z) |
                                      (J & ~Z)),
                                      (0 | f[y >> 2]) >>> 0 <= i >>> 0 &&
                                        ((f[F >> 2] = 866),
                                        (f[(F + 4) >> 2] = 910),
                                        (f[(F + 8) >> 2] = 1497),
                                        Ne(L, 812, F),
                                        be(L)),
                                      (f[(D + (e << 2)) >> 2] =
                                        f[((0 | f[k >> 2]) + (i << 2)) >> 2]),
                                      (e = (e + 1) | 0) >>> 0 < W >>> 0;

                                  );
                                  if (ne | (Z = T & ((0 | G) == (0 | w)))) {
                                    J = 0;
                                    do {
                                      (e = (Q + (0 | S(J, n))) | 0),
                                        (z = (0 == (0 | J)) | $),
                                        (W = J << 1),
                                        (a =
                                          ((a =
                                            (fe =
                                              ((le = ((0 | j(h, M)) + a) | 0) -
                                                O) |
                                              0) >> 31) &
                                            le) |
                                          (fe & ~a));
                                      do {
                                        if (Z) {
                                          if (!z) {
                                            a =
                                              ((a =
                                                (le =
                                                  ((fe =
                                                    ((0 | j(h, M)) + a) | 0) -
                                                    O) |
                                                  0) >> 31) &
                                                fe) |
                                              (le & ~a);
                                            break;
                                          }
                                          (f[e >> 2] =
                                            f[
                                              (D +
                                                ((0 |
                                                  c[
                                                    (1547 + (q << 2) + W) >> 0
                                                  ]) <<
                                                  2)) >>
                                                2
                                            ]),
                                            (0 | f[g >> 2]) >>> 0 <= a >>> 0 &&
                                              ((f[B >> 2] = 866),
                                              (f[(B + 4) >> 2] = 910),
                                              (f[(B + 8) >> 2] = 1497),
                                              Ne(L, 812, B),
                                              be(L)),
                                            (f[(e + 4) >> 2] =
                                              f[
                                                ((0 | f[s >> 2]) + (a << 2)) >>
                                                  2
                                              ]),
                                            (a =
                                              ((a =
                                                (le =
                                                  ((fe =
                                                    ((0 | j(h, M)) + a) | 0) -
                                                    O) |
                                                  0) >> 31) &
                                                fe) |
                                              (le & ~a));
                                        } else
                                          z &&
                                            ((f[e >> 2] =
                                              f[
                                                (D +
                                                  ((0 |
                                                    c[
                                                      (1547 + (q << 2) + W) >> 0
                                                    ]) <<
                                                    2)) >>
                                                  2
                                              ]),
                                            (0 | f[g >> 2]) >>> 0 <= a >>> 0 &&
                                              ((f[x >> 2] = 866),
                                              (f[(x + 4) >> 2] = 910),
                                              (f[(x + 8) >> 2] = 1497),
                                              Ne(L, 812, x),
                                              be(L)),
                                            (f[(e + 4) >> 2] =
                                              f[
                                                ((0 | f[s >> 2]) + (a << 2)) >>
                                                  2
                                              ])),
                                            (e = (e + 8) | 0),
                                            (a =
                                              ((a =
                                                (le =
                                                  ((fe =
                                                    ((0 | j(h, M)) + a) | 0) -
                                                    O) |
                                                  0) >> 31) &
                                                fe) |
                                              (le & ~a)),
                                            z &&
                                              ((f[e >> 2] =
                                                f[
                                                  (D +
                                                    ((0 |
                                                      c[
                                                        (1547 +
                                                          (q << 2) +
                                                          (1 | W)) >>
                                                          0
                                                      ]) <<
                                                      2)) >>
                                                    2
                                                ]),
                                              (0 | f[g >> 2]) >>> 0 <=
                                                a >>> 0 &&
                                                ((f[X >> 2] = 866),
                                                (f[(X + 4) >> 2] = 910),
                                                (f[(X + 8) >> 2] = 1497),
                                                Ne(L, 812, X),
                                                be(L)),
                                              (f[(e + 4) >> 2] =
                                                f[
                                                  ((0 | f[s >> 2]) +
                                                    (a << 2)) >>
                                                    2
                                                ]));
                                      } while (0);
                                      J = (J + 1) | 0;
                                    } while (2 != (0 | J));
                                  } else
                                    (f[Q >> 2] =
                                      f[
                                        (D +
                                          ((0 | c[(1547 + (q << 2)) >> 0]) <<
                                            2)) >>
                                          2
                                      ]),
                                      (a =
                                        ((a =
                                          (le =
                                            ((fe = ((0 | j(h, M)) + a) | 0) -
                                              O) |
                                            0) >> 31) &
                                          fe) |
                                        (le & ~a)),
                                      (0 | f[g >> 2]) >>> 0 <= a >>> 0 &&
                                        ((f[Y >> 2] = 866),
                                        (f[(Y + 4) >> 2] = 910),
                                        (f[(Y + 8) >> 2] = 1497),
                                        Ne(L, 812, Y),
                                        be(L)),
                                      (f[(Q + 4) >> 2] =
                                        f[((0 | f[s >> 2]) + (a << 2)) >> 2]),
                                      (f[(Q + 8) >> 2] =
                                        f[
                                          (D +
                                            ((0 |
                                              c[(1547 + (q << 2) + 1) >> 0]) <<
                                              2)) >>
                                            2
                                        ]),
                                      (a =
                                        ((a =
                                          (le =
                                            ((fe = ((0 | j(h, M)) + a) | 0) -
                                              O) |
                                            0) >> 31) &
                                          fe) |
                                        (le & ~a)),
                                      (0 | f[g >> 2]) >>> 0 <= a >>> 0 &&
                                        ((f[K >> 2] = 866),
                                        (f[(K + 4) >> 2] = 910),
                                        (f[(K + 8) >> 2] = 1497),
                                        Ne(L, 812, K),
                                        be(L)),
                                      (f[(Q + 12) >> 2] =
                                        f[((0 | f[s >> 2]) + (a << 2)) >> 2]),
                                      (f[(Q + (N << 2)) >> 2] =
                                        f[
                                          (D +
                                            ((0 |
                                              c[(1547 + (q << 2) + 2) >> 0]) <<
                                              2)) >>
                                            2
                                        ]),
                                      (a =
                                        ((a =
                                          (le =
                                            ((fe = ((0 | j(h, M)) + a) | 0) -
                                              O) |
                                            0) >> 31) &
                                          fe) |
                                        (le & ~a)),
                                      (0 | f[g >> 2]) >>> 0 <= a >>> 0 &&
                                        ((f[U >> 2] = 866),
                                        (f[(U + 4) >> 2] = 910),
                                        (f[(U + 8) >> 2] = 1497),
                                        Ne(L, 812, U),
                                        be(L)),
                                      (f[(Q + (_ << 2)) >> 2] =
                                        f[((0 | f[s >> 2]) + (a << 2)) >> 2]),
                                      (f[(Q + (d << 2)) >> 2] =
                                        f[
                                          (D +
                                            ((0 |
                                              c[(1547 + (q << 2) + 3) >> 0]) <<
                                              2)) >>
                                            2
                                        ]),
                                      (a =
                                        ((a =
                                          (le =
                                            ((fe = ((0 | j(h, M)) + a) | 0) -
                                              O) |
                                            0) >> 31) &
                                          fe) |
                                        (le & ~a)),
                                      (0 | f[g >> 2]) >>> 0 <= a >>> 0 &&
                                        ((f[H >> 2] = 866),
                                        (f[(H + 4) >> 2] = 910),
                                        (f[(H + 8) >> 2] = 1497),
                                        Ne(L, 812, H),
                                        be(L)),
                                      (f[(Q + (E << 2)) >> 2] =
                                        f[((0 | f[s >> 2]) + (a << 2)) >> 2]);
                                  if ((0 | (G = (ie + G) | 0)) == (0 | ee))
                                    break;
                                  Q = (Q + re) | 0;
                                }
                              if ((0 | (oe = (oe + 1) | 0)) == (0 | l)) break;
                              te = (te + b) | 0;
                            }
                          ae = (ae + 1) | 0;
                        } while ((0 | ae) != (0 | C));
                        return (m = V), 1;
                      })(e, n, o, u, s, d, a, l)
                    )
                  )
                    return (o = 0) | o;
                  break;
                case 4:
                case 6:
                case 5:
                case 3:
                case 2:
                  if (
                    !(
                      0 |
                      (function (e, r, i, n, o, a, u, l) {
                        (r |= 0),
                          (i |= 0),
                          (n |= 0),
                          (o |= 0),
                          (a |= 0),
                          (u |= 0),
                          (l |= 0);
                        var s,
                          d,
                          E,
                          M,
                          T,
                          A,
                          b,
                          h,
                          p,
                          v,
                          S,
                          k,
                          y,
                          R,
                          g,
                          O,
                          C,
                          N,
                          P,
                          w,
                          I,
                          L,
                          D,
                          F,
                          U,
                          H,
                          x,
                          B,
                          Y,
                          X,
                          K,
                          V,
                          G,
                          W,
                          z,
                          J = 0,
                          Z = 0,
                          q = 0,
                          Q = 0,
                          $ = 0,
                          ee = 0,
                          re = 0,
                          ie = 0,
                          ne = 0,
                          te = 0,
                          oe = 0,
                          ae = 0,
                          ue = 0,
                          fe = 0,
                          le = 0,
                          ce = 0,
                          se = 0,
                          _e = 0,
                          de = 0,
                          Ee = 0,
                          Me = 0,
                          Te = 0;
                        if (
                          ((m = ((z = m) + 640) | 0),
                          (V = (z + 80) | 0),
                          (K = (z + 64) | 0),
                          (X = (z + 48) | 0),
                          (W = (z + 32) | 0),
                          (G = (z + 16) | 0),
                          (x = ((Y = z) + 128) | 0),
                          (B = (z + 112) | 0),
                          (A = (z + 96) | 0),
                          (h = 0 | f[(b = (240 + (e |= 0)) | 0) >> 2]),
                          (v = 0 | f[(p = (e + 256) | 0) >> 2]),
                          (k = 0 | f[(S = (e + 272) | 0) >> 2]),
                          (Te = 0 | f[(e + 88) >> 2]),
                          (y =
                            ((0 | c[(Te + 63) >> 0]) << 8) |
                            0 |
                            c[(Te + 64) >> 0]),
                          (R = 255 & (Te = 0 | t[(Te + 17) >> 0])),
                          !((Te << 24) >> 24))
                        )
                          return (m = z), 1;
                        (g = 0 == (0 | l)),
                          (C = (O = (u + -1) | 0) << 5),
                          (N = (l + -1) | 0),
                          (P = n << 1),
                          (w = (e + 92) | 0),
                          (I = (e + 116) | 0),
                          (L = (e + 164) | 0),
                          (D = (e + 268) | 0),
                          (F = (e + 140) | 0),
                          (U = (e + 236) | 0),
                          (H = (e + 212) | 0),
                          (Te = (e + 188) | 0),
                          (T = 0 == ((1 & o) | 0)),
                          (M = 0 == ((1 & a) | 0)),
                          (d = (e + 288) | 0),
                          (E = (e + 284) | 0),
                          (s = (e + 252) | 0),
                          (i = o = a = e = Me = 0),
                          (J = 1);
                        do {
                          if (!g)
                            for (de = 0 | f[(r + (Me << 2)) >> 2], Ee = 0; ; ) {
                              if (
                                ((q = 0 == (0 | (_e = 1 & Ee))),
                                (se = (((_e << 6) ^ 64) - 32) | 0),
                                (_e = (((_e << 1) ^ 2) - 1) | 0),
                                (0 | (Z = q ? 0 : O)) !=
                                  (0 | (le = q ? u : -1)))
                              )
                                for (
                                  ce = M | ((0 | Ee) != (0 | N)),
                                    fe = q ? de : (de + C) | 0;
                                  ;

                                ) {
                                  for (
                                    1 == (0 | J) && (J = 512 | j(w, I)),
                                      ue = 7 & J,
                                      J >>>= 3,
                                      Q = 0 | c[(1539 + ue) >> 0],
                                      q = 0;
                                    (a =
                                      ((ae =
                                        (oe =
                                          ((te = ((0 | j(w, L)) + a) | 0) - k) |
                                          0) >> 31) &
                                        te) |
                                      (oe & ~ae)),
                                      (0 | f[S >> 2]) >>> 0 <= a >>> 0 &&
                                        ((f[Y >> 2] = 866),
                                        (f[(Y + 4) >> 2] = 910),
                                        (f[(Y + 8) >> 2] = 1497),
                                        Ne(x, 812, Y),
                                        be(x)),
                                      (f[(A + (q << 2)) >> 2] =
                                        _[((0 | f[D >> 2]) + (a << 1)) >> 1]),
                                      (q = (q + 1) | 0) >>> 0 < Q >>> 0;

                                  );
                                  for (
                                    q = 0;
                                    (i =
                                      ((ae =
                                        (oe =
                                          ((te = ((0 | j(w, F)) + i) | 0) - h) |
                                          0) >> 31) &
                                        te) |
                                      (oe & ~ae)),
                                      (0 | f[b >> 2]) >>> 0 <= i >>> 0 &&
                                        ((f[G >> 2] = 866),
                                        (f[(G + 4) >> 2] = 910),
                                        (f[(G + 8) >> 2] = 1497),
                                        Ne(x, 812, G),
                                        be(x)),
                                      (f[(B + (q << 2)) >> 2] =
                                        f[((0 | f[U >> 2]) + (i << 2)) >> 2]),
                                      (q = (q + 1) | 0) >>> 0 < Q >>> 0;

                                  );
                                  for (
                                    ae = T | ((0 | Z) != (0 | O)),
                                      te = 0,
                                      oe = fe;
                                    ;

                                  ) {
                                    if (
                                      ((re = ce | (0 == (0 | te))),
                                      (ie = te << 1),
                                      ae)
                                    )
                                      for (
                                        $ = 0, ee = oe;
                                        (e =
                                          ((e =
                                            (Q =
                                              ((ne = ((0 | j(w, H)) + e) | 0) -
                                                y) |
                                              0) >> 31) &
                                            ne) |
                                          (Q & ~e)),
                                          (o =
                                            ((o =
                                              (ne =
                                                ((Q =
                                                  ((0 | j(w, Te)) + o) | 0) -
                                                  v) |
                                                0) >> 31) &
                                              Q) |
                                            (ne & ~o)),
                                          re &&
                                            ((q =
                                              0 |
                                              c[
                                                ($ + ie + (1547 + (ue << 2))) >>
                                                  0
                                              ]),
                                            (Q = (3 * e) | 0),
                                            (0 | f[d >> 2]) >>> 0 <= Q >>> 0 &&
                                              ((f[W >> 2] = 866),
                                              (f[(W + 4) >> 2] = 910),
                                              (f[(W + 8) >> 2] = 1497),
                                              Ne(x, 812, W),
                                              be(x)),
                                            (ne =
                                              ((0 | f[E >> 2]) + (Q << 1)) | 0),
                                            (f[ee >> 2] =
                                              ((0 | _[ne >> 1]) << 16) |
                                              f[(A + (q << 2)) >> 2]),
                                            (f[(ee + 4) >> 2] =
                                              ((0 | _[(ne + 4) >> 1]) << 16) |
                                              0 |
                                              _[(ne + 2) >> 1]),
                                            (f[(ee + 8) >> 2] =
                                              f[(B + (q << 2)) >> 2]),
                                            (0 | f[p >> 2]) >>> 0 <= o >>> 0 &&
                                              ((f[X >> 2] = 866),
                                              (f[(X + 4) >> 2] = 910),
                                              (f[(X + 8) >> 2] = 1497),
                                              Ne(x, 812, X),
                                              be(x)),
                                            (f[(ee + 12) >> 2] =
                                              f[
                                                ((0 | f[s >> 2]) + (o << 2)) >>
                                                  2
                                              ])),
                                          2 != (0 | ($ = ($ + 1) | 0));

                                      )
                                        ee = (ee + 16) | 0;
                                    else
                                      for (
                                        ne = 1 ^ re,
                                          re = (1547 + (ue << 2) + ie) | 0,
                                          $ = 0,
                                          ee = oe;
                                        (e =
                                          ((e =
                                            (Q =
                                              ((ie = ((0 | j(w, H)) + e) | 0) -
                                                y) |
                                              0) >> 31) &
                                            ie) |
                                          (Q & ~e)),
                                          (o =
                                            ((o =
                                              (ie =
                                                ((Q =
                                                  ((0 | j(w, Te)) + o) | 0) -
                                                  v) |
                                                0) >> 31) &
                                              Q) |
                                            (ie & ~o)),
                                          (0 != (0 | $)) | ne ||
                                            ((q = 0 | c[re >> 0]),
                                            (Q = (3 * e) | 0),
                                            (0 | f[d >> 2]) >>> 0 <= Q >>> 0 &&
                                              ((f[K >> 2] = 866),
                                              (f[(K + 4) >> 2] = 910),
                                              (f[(K + 8) >> 2] = 1497),
                                              Ne(x, 812, K),
                                              be(x)),
                                            (ie =
                                              ((0 | f[E >> 2]) + (Q << 1)) | 0),
                                            (f[ee >> 2] =
                                              ((0 | _[ie >> 1]) << 16) |
                                              f[(A + (q << 2)) >> 2]),
                                            (f[(ee + 4) >> 2] =
                                              ((0 | _[(ie + 4) >> 1]) << 16) |
                                              0 |
                                              _[(ie + 2) >> 1]),
                                            (f[(ee + 8) >> 2] =
                                              f[(B + (q << 2)) >> 2]),
                                            (0 | f[p >> 2]) >>> 0 <= o >>> 0 &&
                                              ((f[V >> 2] = 866),
                                              (f[(V + 4) >> 2] = 910),
                                              (f[(V + 8) >> 2] = 1497),
                                              Ne(x, 812, V),
                                              be(x)),
                                            (f[(ee + 12) >> 2] =
                                              f[
                                                ((0 | f[s >> 2]) + (o << 2)) >>
                                                  2
                                              ])),
                                          2 != (0 | ($ = ($ + 1) | 0));

                                      )
                                        ee = (ee + 16) | 0;
                                    if (2 == (0 | (te = (te + 1) | 0))) break;
                                    oe = (oe + n) | 0;
                                  }
                                  if ((0 | (Z = (_e + Z) | 0)) == (0 | le))
                                    break;
                                  fe = (fe + se) | 0;
                                }
                              if ((0 | (Ee = (Ee + 1) | 0)) == (0 | l)) break;
                              de = (de + P) | 0;
                            }
                          Me = (Me + 1) | 0;
                        } while ((0 | Me) != (0 | R));
                        return (m = z), 1;
                      })(e, n, o, u, s, d, a, l)
                    )
                  )
                    return (o = 0) | o;
                  break;
                case 9:
                  if (
                    !(
                      0 |
                      (function (e, r, i, n, o, a, u, l) {
                        (r |= 0),
                          (i |= 0),
                          (n |= 0),
                          (o |= 0),
                          (a |= 0),
                          (u |= 0),
                          (l |= 0);
                        var s,
                          d,
                          E,
                          M,
                          T,
                          A,
                          b,
                          h,
                          p,
                          v,
                          S,
                          k,
                          y,
                          R,
                          g,
                          O,
                          C,
                          N,
                          P,
                          w,
                          I,
                          L,
                          D,
                          F,
                          U = 0,
                          H = 0,
                          x = 0,
                          B = 0,
                          Y = 0,
                          X = 0,
                          K = 0,
                          V = 0,
                          G = 0,
                          W = 0,
                          z = 0,
                          J = 0,
                          Z = 0,
                          q = 0,
                          Q = 0,
                          $ = 0,
                          ee = 0,
                          re = 0;
                        if (
                          ((m = ((F = m) + 592) | 0),
                          (I = (F + 48) | 0),
                          (D = (F + 32) | 0),
                          (L = (F + 16) | 0),
                          (N = ((w = F) + 80) | 0),
                          (P = (F + 64) | 0),
                          (A = 0 | f[(T = (272 + (e |= 0)) | 0) >> 2]),
                          (re = 0 | f[(e + 88) >> 2]),
                          (b =
                            ((0 | c[(re + 63) >> 0]) << 8) |
                            0 |
                            c[(re + 64) >> 0]),
                          (h = 255 & (re = 0 | t[(re + 17) >> 0])),
                          !((re << 24) >> 24))
                        )
                          return (m = F), 1;
                        (p = 0 == (0 | l)),
                          (S = (v = (u + -1) | 0) << 4),
                          (k = (l + -1) | 0),
                          (y = n << 1),
                          (R = (e + 92) | 0),
                          (g = (e + 116) | 0),
                          (O = (e + 164) | 0),
                          (C = (e + 268) | 0),
                          (re = (e + 212) | 0),
                          (M = 0 == ((1 & o) | 0)),
                          (E = 0 == ((1 & a) | 0)),
                          (d = (e + 288) | 0),
                          (s = (e + 284) | 0),
                          (i = o = ee = 0),
                          (a = 1);
                        do {
                          if (!p)
                            for (Q = 0 | f[(r + (ee << 2)) >> 2], $ = 0; ; ) {
                              if (
                                ((U = 0 == (0 | (q = 1 & $))),
                                (Z = (((q << 5) ^ 32) - 16) | 0),
                                (q = (((q << 1) ^ 2) - 1) | 0),
                                (0 | (e = U ? 0 : v)) != (0 | (z = U ? u : -1)))
                              )
                                for (
                                  J = E | ((0 | $) != (0 | k)),
                                    W = U ? Q : (Q + S) | 0;
                                  ;

                                ) {
                                  for (
                                    1 == (0 | a) && (a = 512 | j(R, g)),
                                      G = 7 & a,
                                      a >>>= 3,
                                      H = 0 | c[(1539 + G) >> 0],
                                      U = 0;
                                    (i =
                                      ((V =
                                        (K =
                                          ((X = ((0 | j(R, O)) + i) | 0) - A) |
                                          0) >> 31) &
                                        X) |
                                      (K & ~V)),
                                      (0 | f[T >> 2]) >>> 0 <= i >>> 0 &&
                                        ((f[w >> 2] = 866),
                                        (f[(w + 4) >> 2] = 910),
                                        (f[(w + 8) >> 2] = 1497),
                                        Ne(N, 812, w),
                                        be(N)),
                                      (f[(P + (U << 2)) >> 2] =
                                        _[((0 | f[C >> 2]) + (i << 1)) >> 1]),
                                      (U = (U + 1) | 0) >>> 0 < H >>> 0;

                                  );
                                  for (
                                    V = M | ((0 | e) != (0 | v)), X = 0, K = W;
                                    (Y = J | (0 == (0 | X))),
                                      (H = X << 1),
                                      (B =
                                        ((B =
                                          (x =
                                            ((U = ((0 | j(R, re)) + o) | 0) -
                                              b) |
                                            0) >> 31) &
                                          U) |
                                        (x & ~B)),
                                      V
                                        ? (Y &&
                                            ((o =
                                              0 |
                                              c[(1547 + (G << 2) + H) >> 0]),
                                            (U = (3 * B) | 0),
                                            (0 | f[d >> 2]) >>> 0 <= U >>> 0 &&
                                              ((f[L >> 2] = 866),
                                              (f[(L + 4) >> 2] = 910),
                                              (f[(L + 8) >> 2] = 1497),
                                              Ne(N, 812, L),
                                              be(N)),
                                            (x =
                                              ((0 | f[s >> 2]) + (U << 1)) | 0),
                                            (f[K >> 2] =
                                              ((0 | _[x >> 1]) << 16) |
                                              f[(P + (o << 2)) >> 2]),
                                            (f[(K + 4) >> 2] =
                                              ((0 | _[(x + 4) >> 1]) << 16) |
                                              0 |
                                              _[(x + 2) >> 1])),
                                          (x = (K + 8) | 0),
                                          (o =
                                            ((o =
                                              (B =
                                                ((U =
                                                  ((0 | j(R, re)) + B) | 0) -
                                                  b) |
                                                0) >> 31) &
                                              U) |
                                            (B & ~o)),
                                          Y &&
                                            ((U =
                                              0 |
                                              c[
                                                (1547 + (G << 2) + (1 | H)) >> 0
                                              ]),
                                            (H = (3 * o) | 0),
                                            (0 | f[d >> 2]) >>> 0 <= H >>> 0 &&
                                              ((f[I >> 2] = 866),
                                              (f[(I + 4) >> 2] = 910),
                                              (f[(I + 8) >> 2] = 1497),
                                              Ne(N, 812, I),
                                              be(N)),
                                            (Y =
                                              ((0 | f[s >> 2]) + (H << 1)) | 0),
                                            (f[x >> 2] =
                                              ((0 | _[Y >> 1]) << 16) |
                                              f[(P + (U << 2)) >> 2]),
                                            (f[(K + 12) >> 2] =
                                              ((0 | _[(Y + 4) >> 1]) << 16) |
                                              0 |
                                              _[(Y + 2) >> 1])))
                                        : (Y &&
                                            ((o =
                                              0 |
                                              c[(1547 + (G << 2) + H) >> 0]),
                                            (U = (3 * B) | 0),
                                            (0 | f[d >> 2]) >>> 0 <= U >>> 0 &&
                                              ((f[D >> 2] = 866),
                                              (f[(D + 4) >> 2] = 910),
                                              (f[(D + 8) >> 2] = 1497),
                                              Ne(N, 812, D),
                                              be(N)),
                                            (Y =
                                              ((0 | f[s >> 2]) + (U << 1)) | 0),
                                            (f[K >> 2] =
                                              ((0 | _[Y >> 1]) << 16) |
                                              f[(P + (o << 2)) >> 2]),
                                            (f[(K + 4) >> 2] =
                                              ((0 | _[(Y + 4) >> 1]) << 16) |
                                              0 |
                                              _[(Y + 2) >> 1])),
                                          (o =
                                            ((o =
                                              (Y =
                                                ((B =
                                                  ((0 | j(R, re)) + B) | 0) -
                                                  b) |
                                                0) >> 31) &
                                              B) |
                                            (Y & ~o))),
                                      2 != (0 | (X = (X + 1) | 0));

                                  )
                                    K = (K + n) | 0;
                                  if ((0 | (e = (q + e) | 0)) == (0 | z)) break;
                                  W = (W + Z) | 0;
                                }
                              if ((0 | ($ = ($ + 1) | 0)) == (0 | l)) break;
                              Q = (Q + y) | 0;
                            }
                          ee = (ee + 1) | 0;
                        } while ((0 | ee) != (0 | h));
                        return (m = F), 1;
                      })(e, n, o, u, s, d, a, l)
                    )
                  )
                    return (o = 0) | o;
                  break;
                case 8:
                case 7:
                  if (
                    !(
                      0 |
                      (function (e, r, i, n, o, a, u, l) {
                        (r |= 0),
                          (i |= 0),
                          (n |= 0),
                          (o |= 0),
                          (a |= 0),
                          (u |= 0),
                          (l |= 0);
                        var s,
                          d,
                          E,
                          M,
                          T,
                          A,
                          b,
                          h,
                          p,
                          v,
                          S,
                          k,
                          y,
                          R,
                          g,
                          O,
                          C,
                          N,
                          P,
                          w,
                          I,
                          L,
                          D,
                          F,
                          U,
                          H,
                          x,
                          B = 0,
                          Y = 0,
                          X = 0,
                          K = 0,
                          V = 0,
                          G = 0,
                          W = 0,
                          z = 0,
                          J = 0,
                          Z = 0,
                          q = 0,
                          Q = 0,
                          $ = 0,
                          ee = 0,
                          re = 0,
                          ie = 0,
                          ne = 0,
                          te = 0,
                          oe = 0,
                          ae = 0,
                          ue = 0,
                          fe = 0,
                          le = 0,
                          ce = 0,
                          se = 0;
                        if (
                          ((m = ((x = m) + 640) | 0),
                          (F = (x + 80) | 0),
                          (D = (x + 64) | 0),
                          (L = (x + 48) | 0),
                          (H = (x + 32) | 0),
                          (U = (x + 16) | 0),
                          (P = ((I = x) + 128) | 0),
                          (w = (x + 112) | 0),
                          (T = (x + 96) | 0),
                          (b = 0 | f[(A = (272 + (e |= 0)) | 0) >> 2]),
                          (se = 0 | f[(e + 88) >> 2]),
                          (h =
                            ((0 | c[(se + 63) >> 0]) << 8) |
                            0 |
                            c[(se + 64) >> 0]),
                          (p = 255 & (se = 0 | t[(se + 17) >> 0])),
                          !((se << 24) >> 24))
                        )
                          return (m = x), 1;
                        (v = 0 == (0 | l)),
                          (k = (S = (u + -1) | 0) << 5),
                          (y = (l + -1) | 0),
                          (R = n << 1),
                          (g = (e + 92) | 0),
                          (O = (e + 116) | 0),
                          (C = (e + 164) | 0),
                          (N = (e + 268) | 0),
                          (se = (e + 212) | 0),
                          (M = 0 == ((1 & o) | 0)),
                          (E = 0 == ((1 & a) | 0)),
                          (d = (e + 288) | 0),
                          (s = (e + 284) | 0),
                          (i = o = a = e = ce = 0),
                          (B = 1);
                        do {
                          if (!v)
                            for (fe = 0 | f[(r + (ce << 2)) >> 2], le = 0; ; ) {
                              if (
                                ((X = 0 == (0 | (ue = 1 & le))),
                                (ae = (((ue << 6) ^ 64) - 32) | 0),
                                (ue = (((ue << 1) ^ 2) - 1) | 0),
                                (0 | (Y = X ? 0 : S)) !=
                                  (0 | (te = X ? u : -1)))
                              )
                                for (
                                  oe = E | ((0 | le) != (0 | y)),
                                    ne = X ? fe : (fe + k) | 0;
                                  ;

                                ) {
                                  for (
                                    1 == (0 | B) && (B = 512 | j(g, O)),
                                      ie = 7 & B,
                                      B >>>= 3,
                                      K = 0 | c[(1539 + ie) >> 0],
                                      X = 0;
                                    (i =
                                      ((re =
                                        (ee =
                                          (($ = ((0 | j(g, C)) + i) | 0) - b) |
                                          0) >> 31) &
                                        $) |
                                      (ee & ~re)),
                                      (0 | f[A >> 2]) >>> 0 <= i >>> 0 &&
                                        ((f[I >> 2] = 866),
                                        (f[(I + 4) >> 2] = 910),
                                        (f[(I + 8) >> 2] = 1497),
                                        Ne(P, 812, I),
                                        be(P)),
                                      (f[(w + (X << 2)) >> 2] =
                                        _[((0 | f[N >> 2]) + (i << 1)) >> 1]),
                                      (X = (X + 1) | 0) >>> 0 < K >>> 0;

                                  );
                                  for (
                                    X = 0;
                                    (a =
                                      ((re =
                                        (ee =
                                          (($ = ((0 | j(g, C)) + a) | 0) - b) |
                                          0) >> 31) &
                                        $) |
                                      (ee & ~re)),
                                      (0 | f[A >> 2]) >>> 0 <= a >>> 0 &&
                                        ((f[U >> 2] = 866),
                                        (f[(U + 4) >> 2] = 910),
                                        (f[(U + 8) >> 2] = 1497),
                                        Ne(P, 812, U),
                                        be(P)),
                                      (f[(T + (X << 2)) >> 2] =
                                        _[((0 | f[N >> 2]) + (a << 1)) >> 1]),
                                      (X = (X + 1) | 0) >>> 0 < K >>> 0;

                                  );
                                  for (
                                    re = M | ((0 | Y) != (0 | S)),
                                      $ = 0,
                                      ee = ne;
                                    ;

                                  ) {
                                    if (
                                      ((Z = oe | (0 == (0 | $))),
                                      (q = $ << 1),
                                      re)
                                    )
                                      for (
                                        z = 0, J = ee;
                                        (o =
                                          ((o =
                                            (W =
                                              ((Q = ((0 | j(g, se)) + o) | 0) -
                                                h) |
                                              0) >> 31) &
                                            Q) |
                                          (W & ~o)),
                                          (e =
                                            ((e =
                                              (Q =
                                                ((W =
                                                  ((0 | j(g, se)) + e) | 0) -
                                                  h) |
                                                0) >> 31) &
                                              W) |
                                            (Q & ~e)),
                                          Z &&
                                            ((W =
                                              0 |
                                              c[
                                                (z + q + (1547 + (ie << 2))) >>
                                                  0
                                              ]),
                                            (K = (3 * o) | 0),
                                            (X = 0 | f[d >> 2]) >>> 0 <=
                                              K >>> 0 &&
                                              ((f[H >> 2] = 866),
                                              (f[(H + 4) >> 2] = 910),
                                              (f[(H + 8) >> 2] = 1497),
                                              Ne(P, 812, H),
                                              be(P),
                                              (X = 0 | f[d >> 2])),
                                            (K =
                                              ((V = 0 | f[s >> 2]) + (K << 1)) |
                                              0),
                                            (Q =
                                              ((X =
                                                (G = (3 * e) | 0) >>> 0 <
                                                X >>> 0
                                                  ? V
                                                  : ((f[L >> 2] = 866),
                                                    (f[(L + 4) >> 2] = 910),
                                                    (f[(L + 8) >> 2] = 1497),
                                                    Ne(P, 812, L),
                                                    be(P),
                                                    0 | f[s >> 2])) +
                                                (G << 1)) |
                                              0),
                                            (f[J >> 2] =
                                              ((0 | _[K >> 1]) << 16) |
                                              f[(w + (W << 2)) >> 2]),
                                            (f[(J + 4) >> 2] =
                                              ((0 | _[(K + 4) >> 1]) << 16) |
                                              0 |
                                              _[(K + 2) >> 1]),
                                            (f[(J + 8) >> 2] =
                                              ((0 | _[Q >> 1]) << 16) |
                                              f[(T + (W << 2)) >> 2]),
                                            (f[(J + 12) >> 2] =
                                              ((0 | _[(Q + 4) >> 1]) << 16) |
                                              0 |
                                              _[(Q + 2) >> 1])),
                                          2 != (0 | (z = (z + 1) | 0));

                                      )
                                        J = (J + 16) | 0;
                                    else
                                      for (
                                        Q = 1 ^ Z,
                                          Z = (1547 + (ie << 2) + q) | 0,
                                          z = 0,
                                          J = ee;
                                        (o =
                                          ((o =
                                            (W =
                                              ((q = ((0 | j(g, se)) + o) | 0) -
                                                h) |
                                              0) >> 31) &
                                            q) |
                                          (W & ~o)),
                                          (e =
                                            ((e =
                                              (q =
                                                ((W =
                                                  ((0 | j(g, se)) + e) | 0) -
                                                  h) |
                                                0) >> 31) &
                                              W) |
                                            (q & ~e)),
                                          (0 != (0 | z)) | Q ||
                                            ((W = 0 | c[Z >> 0]),
                                            (K = (3 * o) | 0),
                                            (X = 0 | f[d >> 2]) >>> 0 <=
                                              K >>> 0 &&
                                              ((f[D >> 2] = 866),
                                              (f[(D + 4) >> 2] = 910),
                                              (f[(D + 8) >> 2] = 1497),
                                              Ne(P, 812, D),
                                              be(P),
                                              (X = 0 | f[d >> 2])),
                                            (K =
                                              ((V = 0 | f[s >> 2]) + (K << 1)) |
                                              0),
                                            (q =
                                              ((X =
                                                (G = (3 * e) | 0) >>> 0 <
                                                X >>> 0
                                                  ? V
                                                  : ((f[F >> 2] = 866),
                                                    (f[(F + 4) >> 2] = 910),
                                                    (f[(F + 8) >> 2] = 1497),
                                                    Ne(P, 812, F),
                                                    be(P),
                                                    0 | f[s >> 2])) +
                                                (G << 1)) |
                                              0),
                                            (f[J >> 2] =
                                              ((0 | _[K >> 1]) << 16) |
                                              f[(w + (W << 2)) >> 2]),
                                            (f[(J + 4) >> 2] =
                                              ((0 | _[(K + 4) >> 1]) << 16) |
                                              0 |
                                              _[(K + 2) >> 1]),
                                            (f[(J + 8) >> 2] =
                                              ((0 | _[q >> 1]) << 16) |
                                              f[(T + (W << 2)) >> 2]),
                                            (f[(J + 12) >> 2] =
                                              ((0 | _[(q + 4) >> 1]) << 16) |
                                              0 |
                                              _[(q + 2) >> 1])),
                                          2 != (0 | (z = (z + 1) | 0));

                                      )
                                        J = (J + 16) | 0;
                                    if (2 == (0 | ($ = ($ + 1) | 0))) break;
                                    ee = (ee + n) | 0;
                                  }
                                  if ((0 | (Y = (ue + Y) | 0)) == (0 | te))
                                    break;
                                  ne = (ne + ae) | 0;
                                }
                              if ((0 | (le = (le + 1) | 0)) == (0 | l)) break;
                              fe = (fe + R) | 0;
                            }
                          ce = (ce + 1) | 0;
                        } while ((0 | ce) != (0 | p));
                        return (m = x), 1;
                      })(e, n, o, u, s, d, a, l)
                    )
                  )
                    return (o = 0) | o;
                  break;
                default:
                  return (o = 0) | o;
              }
              return 1;
            })(
              e,
              (d = ((d = 0 | f[(d = (e + 4) | 0) >> 2]) + u) | 0),
              (E = (s - u) | 0),
              r,
              i,
              n,
              o,
            )),
          (m = l),
          0 | E
        );
      }
      function fe(e, r, i) {
        (e |= 0), (r |= 0);
        var n = 0,
          o = 0,
          a = 0,
          u = 0,
          l = 0;
        (o = 0 | f[(n = (16 + (i |= 0)) | 0) >> 2])
          ? (a = 5)
          : 0 | me(i)
          ? (n = 0)
          : ((o = 0 | f[n >> 2]), (a = 5));
        e: do {
          if (5 == (0 | a)) {
            if (
              ((o - (n = u = 0 | f[(l = (i + 20) | 0) >> 2])) | 0) >>> 0 <
              r >>> 0
            ) {
              n = 0 | ir[7 & f[(i + 36) >> 2]](i, e, r);
              break;
            }
            r: do {
              if (-1 < (0 | t[(i + 75) >> 0])) {
                for (u = r; ; ) {
                  if (!u) {
                    (a = 0), (o = e);
                    break r;
                  }
                  if (10 == (0 | t[(e + (o = (u + -1) | 0)) >> 0])) break;
                  u = o;
                }
                if ((n = 0 | ir[7 & f[(i + 36) >> 2]](i, e, u)) >>> 0 < u >>> 0)
                  break e;
                (o = (e + (a = u)) | 0), (r = (r - u) | 0), (n = 0 | f[l >> 2]);
              } else (a = 0), (o = e);
            } while (0);
            Q(0 | n, 0 | o, 0 | r),
              (f[l >> 2] = (0 | f[l >> 2]) + r),
              (n = (a + r) | 0);
          }
        } while (0);
        return 0 | n;
      }
      function le(e) {
        var r,
          i,
          n = 0,
          o = 0,
          a = 0;
        (m = ((i = m) + 544) | 0),
          (a = (i + 16) | 0),
          (r = ((o = i) + 32) | 0),
          (n = 0 | f[(20 + (e |= 0)) >> 2]);
        do {
          if (0 | n) {
            if ((ne(n), 7 & n)) {
              (f[o >> 2] = 866),
                (f[(o + 4) >> 2] = 2506),
                (f[(o + 8) >> 2] = 1232),
                Ne(r, 812, o),
                be(r);
              break;
            }
            Ee(n, 0, 0, 1, 0);
            break;
          }
        } while (0);
        if (!(o = 0 | f[(n = (e + 4) | 0) >> 2]))
          return (t[(a = (e + 16) | 0) >> 0] = 0), void (m = i);
        7 & o
          ? ((f[a >> 2] = 866),
            (f[(a + 4) >> 2] = 2506),
            (f[(a + 8) >> 2] = 1232),
            Ne(r, 812, a),
            be(r))
          : Ee(o, 0, 0, 1, 0),
          (f[n >> 2] = 0),
          (f[(e + 8) >> 2] = 0),
          (f[(e + 12) >> 2] = 0),
          (t[(a = (e + 16) | 0) >> 0] = 0),
          (m = i);
      }
      function ce(e, r) {
        r |= 0;
        var i,
          n,
          t,
          o,
          a = 0,
          u = 0,
          l = 0;
        return (
          (m = ((o = m) + 560) | 0),
          (l = (o + 32) | 0),
          (t = (o + 16) | 0),
          (n = ((a = o) + 48) | 0),
          (i = (o + 44) | 0),
          2147418112 < (u = 0 | (u = (3 + (e |= 0)) & -4) ? u : 4) >>> 0
            ? ((f[a >> 2] = 866),
              (f[(a + 4) >> 2] = 2506),
              (f[(a + 8) >> 2] = 1103),
              Ne(n, 812, a),
              be(n),
              (m = o),
              (l = 0) | l)
            : ((e = 0 | Ee(0, (f[i >> 2] = u), i, 1, 0)),
              (a = 0 | f[i >> 2]),
              0 | r && (f[r >> 2] = a),
              (0 == (0 | e)) | (a >>> 0 < u >>> 0)
                ? ((f[t >> 2] = 866),
                  (f[(t + 4) >> 2] = 2506),
                  (f[(t + 8) >> 2] = 1129),
                  Ne(n, 812, t),
                  be(n),
                  (e = 0))
                : 7 & e &&
                  ((f[l >> 2] = 866),
                  (f[(l + 4) >> 2] = 2533),
                  (f[(l + 8) >> 2] = 1156),
                  Ne(n, 812, l),
                  be(n)),
              (m = o),
              0 | (l = e))
        );
      }
      function se(e, r, i) {
        r |= 0;
        var n,
          o = 0,
          a = 0,
          u = 0;
        if (((n = ((e |= 0) + (i |= 0)) | 0), (r &= 255), 67 <= (0 | i))) {
          for (; 3 & e; ) (t[e >> 0] = r), (e = (e + 1) | 0);
          for (
            a = ((o = (-4 & n) | 0) - 64) | 0,
              u = r | (r << 8) | (r << 16) | (r << 24);
            (0 | e) <= (0 | a);

          )
            (f[e >> 2] = u),
              (f[(e + 4) >> 2] = u),
              (f[(e + 8) >> 2] = u),
              (f[(e + 12) >> 2] = u),
              (f[(e + 16) >> 2] = u),
              (f[(e + 20) >> 2] = u),
              (f[(e + 24) >> 2] = u),
              (f[(e + 28) >> 2] = u),
              (f[(e + 32) >> 2] = u),
              (f[(e + 36) >> 2] = u),
              (f[(e + 40) >> 2] = u),
              (f[(e + 44) >> 2] = u),
              (f[(e + 48) >> 2] = u),
              (f[(e + 52) >> 2] = u),
              (f[(e + 56) >> 2] = u),
              (f[(e + 60) >> 2] = u),
              (e = (e + 64) | 0);
          for (; (0 | e) < (0 | o); ) (f[e >> 2] = u), (e = (e + 4) | 0);
        }
        for (; (0 | e) < (0 | n); ) (t[e >> 0] = r), (e = (e + 1) | 0);
        return (n - i) | 0;
      }
      function _e(e, r, i, n, o) {
        (e |= 0), (i |= 0), (n |= 0), (o |= 0);
        var a = 0,
          u = 0,
          l = 0,
          c = 0;
        t[(53 + (r |= 0)) >> 0] = 1;
        do {
          if ((0 | f[(r + 4) >> 2]) == (0 | n)) {
            if (
              ((t[(r + 52) >> 0] = 1),
              (l = (r + 54) | 0),
              (c = (r + 48) | 0),
              (u = (r + 24) | 0),
              (e = (r + 36) | 0),
              !(a = 0 | f[(n = (r + 16) | 0) >> 2]))
            ) {
              if (
                ((f[n >> 2] = i),
                (f[u >> 2] = o),
                !(((f[e >> 2] = 1) == (0 | f[c >> 2])) & (1 == (0 | o))))
              )
                break;
              t[l >> 0] = 1;
              break;
            }
            if ((0 | a) != (0 | i)) {
              (f[e >> 2] = 1 + (0 | f[e >> 2])), (t[l >> 0] = 1);
              break;
            }
            2 == (0 | (e = 0 | f[u >> 2])) && (e = f[u >> 2] = o),
              (1 == (0 | f[c >> 2])) & (1 == (0 | e)) && (t[l >> 0] = 1);
          }
        } while (0);
      }
      function de(e, r) {
        e |= 0;
        var i,
          n,
          o,
          a = 0,
          u = 0,
          l = 0,
          s = 0;
        (m = ((o = m) + 16) | 0),
          (n = 255 & (r |= 0)),
          (t[(i = o) >> 0] = n),
          (l = 0 | f[(u = (e + 16) | 0) >> 2])
            ? (s = 4)
            : 0 | me(e)
            ? (a = -1)
            : ((l = 0 | f[u >> 2]), (s = 4));
        do {
          if (4 == (0 | s)) {
            if (
              (u = 0 | f[(s = (e + 20) | 0) >> 2]) >>> 0 < l >>> 0 &&
              (0 | (a = 255 & r)) != (0 | t[(e + 75) >> 0])
            ) {
              (f[s >> 2] = u + 1), (t[u >> 0] = n);
              break;
            }
            a =
              1 == (0 | ir[7 & f[(e + 36) >> 2]](e, i, 1)) ? 0 | c[i >> 0] : -1;
          }
        } while (0);
        return (m = o), 0 | a;
      }
      function Ee(e, r, i, n, t) {
        (e |= 0), (r |= 0), (i |= 0), (n |= 0), (t |= 0);
        do {
          if (e) {
            if (!r) {
              if ((G(e), !i)) {
                r = 0;
                break;
              }
              r = f[i >> 2] = 0;
              break;
            }
            n ? (e = 0 == (0 | (r = 0 | Te(e, r))) ? e : r) : (r = 0),
              i && ((t = 0 | Ce(e)), (f[i >> 2] = t));
          } else
            (r = 0 | B(r)), i && ((e = r ? 0 | Ce(r) : 0), (f[i >> 2] = e));
        } while (0);
        return 0 | r;
      }
      function Me(e, r, i) {
        i |= 0;
        var n = 0;
        if (
          (0 < (r |= 0) >>> 0) |
          ((0 == (0 | r)) & (4294967295 < (e |= 0) >>> 0))
        ) {
          for (
            ;
            (n = 0 | Oe(0 | e, 0 | r, 10, 0)),
              (t[(i = (i + -1) | 0) >> 0] = (255 & n) | 48),
              (e = 0 | Ve(0 | (n = e), 0 | r, 10, 0)),
              (9 < r >>> 0) | ((9 == (0 | r)) & (4294967295 < n >>> 0));

          )
            r = v;
          r = e;
        } else r = e;
        if (r)
          for (
            ;
            (t[(i = (i + -1) | 0) >> 0] = 48 | (r >>> 0) % 10), !(r >>> 0 < 10);

          )
            r = ((r >>> 0) / 10) | 0;
        return 0 | i;
      }
      function Te(e, r) {
        r |= 0;
        var i = 0,
          n = 0;
        return (e |= 0)
          ? 4294967231 < r >>> 0
            ? ((r = 0 | Qe()), (f[r >> 2] = 12), (r = 0) | r)
            : 0 |
              (i =
                0 |
                (function (e, r) {
                  r |= 0;
                  var i,
                    n,
                    t = 0,
                    o = 0,
                    a = 0,
                    u = 0,
                    l = 0,
                    c = 0,
                    s = 0,
                    _ = 0;
                  if (
                    ((i =
                      ((e |= 0) +
                        (t = -8 & (s = 0 | f[(_ = (e + 4) | 0) >> 2]))) |
                      0),
                    !(3 & s))
                  )
                    return r >>> 0 < 256
                      ? (e = 0) | e
                      : ((r + 4) | 0) >>> 0 <= t >>> 0 &&
                        ((t - r) | 0) >>> 0 <= (f[1264] << 1) >>> 0
                      ? 0 | e
                      : (e = 0) | e;
                  if (r >>> 0 <= t >>> 0)
                    return (
                      (t = (t - r) | 0) >>> 0 <= 15 ||
                        ((c = (e + r) | 0),
                        (f[_ >> 2] = (1 & s) | r | 2),
                        (f[(c + 4) >> 2] = 3 | t),
                        (f[(_ = (c + t + 4) | 0) >> 2] = 1 | f[_ >> 2]),
                        W(c, t)),
                      0 | e
                    );
                  if ((0 | i) == (0 | f[1150]))
                    return (
                      (t = ((c = ((0 | f[1147]) + t) | 0) - r) | 0),
                      (o = (e + r) | 0),
                      c >>> 0 <= r >>> 0
                        ? (e = 0) | e
                        : ((f[_ >> 2] = (1 & s) | r | 2),
                          (f[(o + 4) >> 2] = 1 | t),
                          (f[1150] = o),
                          (f[1147] = t),
                          0 | e)
                    );
                  if ((0 | i) == (0 | f[1149]))
                    return (a = ((0 | f[1146]) + t) | 0) >>> 0 < r >>> 0
                      ? (e = 0) | e
                      : ((o = 1 & s),
                        15 < (t = (a - r) | 0) >>> 0
                          ? ((c = ((s = (e + r) | 0) + t) | 0),
                            (f[_ >> 2] = o | r | 2),
                            (f[(s + 4) >> 2] = 1 | t),
                            (f[c >> 2] = t),
                            (f[(o = (c + 4) | 0) >> 2] = -2 & f[o >> 2]),
                            (o = s))
                          : ((f[_ >> 2] = o | a | 2),
                            (f[(o = (e + a + 4) | 0) >> 2] = 1 | f[o >> 2]),
                            (t = o = 0)),
                        (f[1146] = t),
                        (f[1149] = o),
                        0 | e);
                  if ((2 & (o = 0 | f[(i + 4) >> 2])) | 0) return (e = 0) | e;
                  if ((n = ((-8 & o) + t) | 0) >>> 0 < r >>> 0)
                    return (e = 0) | e;
                  (c = (n - r) | 0), (a = o >>> 3);
                  do {
                    if (o >>> 0 < 256) {
                      if (
                        ((o = 0 | f[(i + 8) >> 2]),
                        (0 | (t = 0 | f[(i + 12) >> 2])) == (0 | o))
                      ) {
                        f[1144] = f[1144] & ~(1 << a);
                        break;
                      }
                      (f[(o + 12) >> 2] = t), (f[(t + 8) >> 2] = o);
                      break;
                    }
                    (l = 0 | f[(i + 24) >> 2]), (t = 0 | f[(i + 12) >> 2]);
                    do {
                      if ((0 | t) == (0 | i)) {
                        if (
                          (t = 0 | f[(o = (4 + (a = (i + 16) | 0)) | 0) >> 2])
                        )
                          u = o;
                        else {
                          if (!(t = 0 | f[a >> 2])) {
                            a = 0;
                            break;
                          }
                          u = a;
                        }
                        for (;;)
                          if (0 | (o = 0 | f[(a = (t + 20) | 0) >> 2]))
                            (t = o), (u = a);
                          else {
                            if (!(a = 0 | f[(o = (t + 16) | 0) >> 2])) break;
                            (t = a), (u = o);
                          }
                        (f[u >> 2] = 0), (a = t);
                      } else
                        (a = 0 | f[(i + 8) >> 2]),
                          (f[(a + 12) >> 2] = t),
                          (f[(t + 8) >> 2] = a),
                          (a = t);
                    } while (0);
                    if (0 | l) {
                      if (
                        ((t = 0 | f[(i + 28) >> 2]),
                        (0 | i) == (0 | f[(o = (4880 + (t << 2)) | 0) >> 2]))
                      ) {
                        if (!(f[o >> 2] = a)) {
                          f[1145] = f[1145] & ~(1 << t);
                          break;
                        }
                      } else if (
                        !(f[
                          (l +
                            16 +
                            ((((0 | f[(l + 16) >> 2]) != (0 | i)) & 1) << 2)) >>
                            2
                        ] = a)
                      )
                        break;
                      (f[(a + 24) >> 2] = l),
                        0 | (o = 0 | f[(t = (i + 16) | 0) >> 2]) &&
                          ((f[(a + 16) >> 2] = o), (f[(o + 24) >> 2] = a)),
                        0 | (t = 0 | f[(t + 4) >> 2]) &&
                          ((f[(a + 20) >> 2] = t), (f[(t + 24) >> 2] = a));
                    }
                  } while (0);
                  return (
                    (t = 1 & s),
                    c >>> 0 < 16
                      ? ((f[_ >> 2] = n | t | 2),
                        (f[(_ = (e + n + 4) | 0) >> 2] = 1 | f[_ >> 2]))
                      : ((s = (e + r) | 0),
                        (f[_ >> 2] = t | r | 2),
                        (f[(s + 4) >> 2] = 3 | c),
                        (f[(_ = (s + c + 4) | 0) >> 2] = 1 | f[_ >> 2]),
                        W(s, c)),
                    0 | e
                  );
                })((e + -8) | 0, r >>> 0 < 11 ? 16 : (r + 11) & -8))
            ? 0 | (r = (i + 8) | 0)
            : (i = 0 | B(r))
            ? (Q(
                0 | i,
                0 | e,
                0 |
                  ((n =
                    ((-8 & (n = 0 | f[(e + -4) >> 2])) -
                      (0 == ((3 & n) | 0) ? 8 : 4)) |
                    0) >>>
                    0 <
                  r >>> 0
                    ? n
                    : r),
              ),
              G(e),
              0 | (r = i))
            : (r = 0) | r
          : 0 | (r = 0 | B(r));
      }
      function Ae(e, r, i, n) {
        var o, a, u;
        (e |= 0),
          (i |= 0),
          (n |= 0),
          (o = 0 | f[(e = (16 + (r |= 0)) | 0) >> 2]),
          (a = (r + 36) | 0),
          (u = (r + 24) | 0);
        do {
          if (o) {
            if ((0 | o) != (0 | i)) {
              (f[a >> 2] = 1 + (0 | f[a >> 2])),
                (f[u >> 2] = 2),
                (t[(r + 54) >> 0] = 1);
              break;
            }
            2 == (0 | f[u >> 2]) && (f[u >> 2] = n);
          } else (f[e >> 2] = i), (f[u >> 2] = n), (f[a >> 2] = 1);
        } while (0);
      }
      function be(e) {
        e |= 0;
        var r,
          i = 0,
          n = 0;
        (r = 0 | f[119]), f[(r + 76) >> 2];
        do {
          if ((0 | He(e, r)) < 0) e = 1;
          else {
            if (
              10 != (0 | t[(r + 75) >> 0]) &&
              (n = 0 | f[(i = (r + 20) | 0) >> 2]) >>> 0 <
                (0 | f[(r + 16) >> 2]) >>> 0
            ) {
              (f[i >> 2] = n + 1), (t[n >> 0] = 10), (e = 0);
              break;
            }
            e = (0 | de(r, 10)) < 0;
          }
        } while (0);
        return ((e << 31) >> 31) | 0;
      }
      function he(e, r, i, n, t) {
        var o, a;
        if (
          ((e |= 0),
          (r |= 0),
          (m = ((a = m) + 256) | 0),
          (o = a),
          ((0 | (n |= 0)) < (0 | (i |= 0))) & (0 == ((73728 & (t |= 0)) | 0)))
        ) {
          if (
            (se(0 | o, 0 | r, 0 | ((t = (i - n) | 0) >>> 0 < 256 ? t : 256)),
            255 < t >>> 0)
          ) {
            for (
              r = (i - n) | 0;
              xe(e, o, 256), 255 < (t = (t + -256) | 0) >>> 0;

            );
            t = 255 & r;
          }
          xe(e, o, t);
        }
        m = a;
      }
      function me(e) {
        var r = 0,
          i = 0;
        return (
          (i = 0 | t[(r = (74 + (e |= 0)) | 0) >> 0]),
          (t[r >> 0] = (i + 255) | i),
          0 |
            (8 & (r = 0 | f[e >> 2])
              ? ((f[e >> 2] = 32 | r), -1)
              : ((f[(e + 8) >> 2] = 0),
                (i = (f[(e + 4) >> 2] = 0) | f[(e + 44) >> 2]),
                (f[(e + 28) >> 2] = i),
                (f[(e + 20) >> 2] = i),
                (f[(e + 16) >> 2] = i + (0 | f[(e + 48) >> 2])),
                0))
        );
      }
      function pe(e, r) {
        r |= 0;
        var i = 0,
          n = 0;
        if (
          ((i = 0 | t[(e |= 0) >> 0]),
          (n = 0 | t[r >> 0]),
          (i << 24) >> 24 == 0 || (i << 24) >> 24 != (n << 24) >> 24)
        )
          e = n;
        else {
          for (
            ;
            (r = (r + 1) | 0),
              (i = 0 | t[(e = (e + 1) | 0) >> 0]),
              (n = 0 | t[r >> 0]),
              (i << 24) >> 24 != 0 && (i << 24) >> 24 == (n << 24) >> 24;

          );
          e = n;
        }
        return ((255 & i) - (255 & e)) | 0;
      }
      function ve(e) {
        var r, i;
        return ((0 < (0 | (i = ((15 + (e |= 0)) & -16) | 0))) &
          ((0 | (e = ((r = 0 | f[b >> 2]) + i) | 0)) < (0 | r))) |
          ((0 | e) < 0)
          ? (O(), I(12), -1)
          : (0 | (f[b >> 2] = e)) > (0 | g()) && 0 == (0 | R())
          ? ((f[b >> 2] = r), I(12), -1)
          : 0 | r;
      }
      function Se(e) {
        var r = 0,
          i = 0,
          n = 0;
        if (
          ((i = 0 | f[(e |= 0) >> 2]),
          (n = ((0 | t[i >> 0]) - 48) | 0) >>> 0 < 10)
        )
          for (
            r = 0;
            (r = (n + ((10 * r) | 0)) | 0),
              (i = (i + 1) | 0),
              (f[e >> 2] = i),
              (n = ((0 | t[i >> 0]) - 48) | 0) >>> 0 < 10;

          );
        else r = 0;
        return 0 | r;
      }
      function ke(e, r, i, n) {
        if (
          ((i |= 0), (n |= 0), !((0 == (0 | (e |= 0))) & (0 == (0 | (r |= 0)))))
        )
          for (
            ;
            (t[(i = (i + -1) | 0) >> 0] = 0 | c[(2122 + (15 & e)) >> 0] | n),
              !(
                (0 == (0 | (e = 0 | we(0 | e, 0 | r, 4)))) &
                (0 == (0 | (r = v)))
              );

          );
        return 0 | i;
      }
      function ye(e) {
        var r = 0;
        return (0 | (r = 0 | t[(p + (255 & (e |= 0))) >> 0])) < 8
          ? 0 | r
          : (0 | (r = 0 | t[(p + ((e >> 8) & 255)) >> 0])) < 8
          ? (r + 8) | 0
          : (0 | (r = 0 | t[(p + ((e >> 16) & 255)) >> 0])) < 8
          ? (r + 16) | 0
          : (24 + (0 | t[(p + (e >>> 24)) >> 0])) | 0;
      }
      function Re(e, r, i, n) {
        (i |= 0), (n |= 0);
        var t = 0;
        (0 | f[(4 + (r |= 0)) >> 2]) == (0 | i) &&
          1 != (0 | f[(t = (r + 28) | 0) >> 2]) &&
          (f[t >> 2] = n);
      }
      function ge(e, r, i) {
        if (((i |= 0), !((0 == (0 | (e |= 0))) & (0 == (0 | (r |= 0))))))
          for (
            ;
            (t[(i = (i + -1) | 0) >> 0] = (7 & e) | 48),
              !(
                (0 == (0 | (e = 0 | we(0 | e, 0 | r, 3)))) &
                (0 == (0 | (r = v)))
              );

          );
        return 0 | i;
      }
      function Oe(e, r, i, n) {
        var t, o;
        return (
          (m = ((o = m) + 16) | 0),
          z((e |= 0), (r |= 0), (i |= 0), (n |= 0), (t = 0 | o)),
          (m = o),
          0 | ((v = 0 | f[(t + 4) >> 2]), 0 | f[t >> 2])
        );
      }
      function Ce(e) {
        var r = 0;
        return (e |= 0)
          ? 0 |
              (1 == (0 | (e = 3 & (r = 0 | f[(e + -4) >> 2])))
                ? 0
                : ((-8 & r) - (0 == (0 | e) ? 8 : 4)) | 0)
          : 0;
      }
      function Ne(e, r, i) {
        var n, o, a, u, l;
        return (
          (e |= 0),
          (r |= 0),
          (i |= 0),
          (m = ((n = m) + 16) | 0),
          (f[(o = n) >> 2] = i),
          (i =
            0 |
            ((a = e),
            (u = r),
            (l = o),
            0 |
              (function (e, r, i, n) {
                (e |= 0), (r |= 0), (i |= 0), (n |= 0);
                var o,
                  a,
                  u = 0,
                  l = 0,
                  c = 0,
                  s = 0,
                  _ = 0;
                for (
                  m = ((a = m) + 128) | 0,
                    u = (a + 124) | 0,
                    c = 604,
                    o = ((l = _ = a) + 124) | 0;
                  (f[l >> 2] = f[c >> 2]),
                    (c = (c + 4) | 0),
                    (0 | (l = (l + 4) | 0)) < (0 | o);

                );
                return (
                  2147483646 < ((r + -1) | 0) >>> 0
                    ? r
                      ? ((r = 0 | Qe()), (f[r >> 2] = 75), (r = -1))
                      : ((e = u), (r = 1), (s = 4))
                    : (s = 4),
                  4 == (0 | s) &&
                    ((s = (s = (-2 - e) | 0) >>> 0 < r >>> 0 ? s : r),
                    (f[(_ + 48) >> 2] = s),
                    (f[(u = (_ + 20) | 0) >> 2] = e),
                    (r = ((f[(_ + 44) >> 2] = e) + s) | 0),
                    (f[(e = (_ + 16) | 0) >> 2] = r),
                    (f[(_ + 28) >> 2] = r),
                    (r = 0 | ee(_, i, n)),
                    s &&
                      ((_ = 0 | f[u >> 2]),
                      (t[
                        (_ + ((((0 | _) == (0 | f[e >> 2])) << 31) >> 31)) >> 0
                      ] = 0))),
                  (m = a),
                  0 | r
                );
              })((a |= 0), 2147483647, (u |= 0), (l |= 0)))),
          (m = n),
          0 | i
        );
      }
      function Pe(e, r, i) {
        return (
          (e |= 0),
          (0 | (i |= 0)) < 32
            ? ((v =
                ((r |= 0) << i) |
                ((e & (((1 << i) - 1) << (32 - i))) >>> (32 - i))),
              e << i)
            : ((v = e << (i - 32)), 0)
        );
      }
      function we(e, r, i) {
        return (
          (r |= 0),
          (0 | (i |= 0)) < 32
            ? ((v = r >>> i),
              ((e |= 0) >>> i) | ((r & ((1 << i) - 1)) << (32 - i)))
            : (r >>> (i - 32)) | (v = 0)
        );
      }
      function Ie(e, r) {
        var i;
        (e |= 0),
          (r |= 0),
          (m = ((i = m) + 16) | 0),
          (f[i >> 2] = r),
          ee((r = 0 | f[26]), e, i),
          (function (e, r) {
            var i,
              n = 0,
              o = 0,
              a = 0;
            (n = i = 255 & (e |= 0)), f[(76 + (r |= 0)) >> 2];
            do {
              if (
                (0 | n) != (0 | t[(r + 75) >> 0]) &&
                (a = 0 | f[(o = (r + 20) | 0) >> 2]) >>> 0 <
                  (0 | f[(r + 16) >> 2]) >>> 0
              ) {
                (f[o >> 2] = a + 1), (t[a >> 0] = i);
                break;
              }
              n = 0 | de(r, 10);
            } while (0);
          })(10, r),
          L();
      }
      function Le(e, r, i, n) {
        return (
          0 |
          ((v = n =
            ((r |= 0) - (n |= 0) - (((e |= 0) >>> 0 < (i |= 0) >>> 0) | 0)) >>>
            0),
          ((e - i) >>> 0) | 0)
        );
      }
      function De(e) {
        var r;
        return (
          (e = +e),
          (T[h >> 3] = e),
          (r = 0 | f[h >> 2]),
          (v = 0 | f[(h + 4) >> 2]),
          0 | r
        );
      }
      function Fe(e, r, i, n) {
        return (
          0 |
          ((v =
            ((r |= 0) +
              (n |= 0) +
              (((i = ((e |= 0) + (i |= 0)) >>> 0) >>> 0 < e >>> 0) | 0)) >>>
            0),
          0 | i)
        );
      }
      function Ue(e) {
        var r = 0;
        return (
          4294963200 < (e |= 0) >>> 0 &&
            ((r = 0 | Qe()), (f[r >> 2] = 0 - e), (e = -1)),
          0 | e
        );
      }
      function He(e, r) {
        var i, n, o, a, u, l;
        return (
          (r |= 0),
          (i =
            0 |
            (function (e) {
              var r,
                i = 0,
                n = 0;
              r = e |= 0;
              e: do {
                if (3 & r)
                  for (i = r; ; ) {
                    if (!(0 | t[e >> 0])) {
                      e = i;
                      break e;
                    }
                    if (!(3 & (i = e = (e + 1) | 0))) {
                      n = 4;
                      break;
                    }
                  }
                else n = 4;
              } while (0);
              if (4 == (0 | n)) {
                for (
                  ;
                  !(
                    ((-2139062144 & (i = 0 | f[e >> 2])) ^ -2139062144) &
                    (i + -16843009)
                  );

                )
                  e = (e + 4) | 0;
                if (((255 & i) << 24) >> 24)
                  for (; 0 != (0 | t[(e = (e + 1) | 0) >> 0]); );
              }
              return (e - r) | 0;
            })((e |= 0))),
          ((((0 |
            ((n = e),
            (o = 1),
            (a = i),
            (u = r),
            (n |= 0),
            (u |= 0),
            (l = 0 | S((a |= 0), (o |= 0))),
            (a = a),
            (0 | (f[(u + 76) >> 2], (n = 0 | fe(n, l, u)))) != (0 | l) &&
              (a = ((n >>> 0) / 1) | 0),
            0 | a)) !=
            (0 | i)) <<
            31) >>
            31) |
            0
        );
      }
      function xe(e, r, i) {
        (r |= 0), (i |= 0), 32 & f[(e |= 0) >> 2] || fe(r, i, e);
      }
      function Be(e) {
        return (
          420,
          0 |
            (function (e, r) {
              (e |= 0), (r |= 0);
              var i,
                n,
                o,
                a,
                u = 0,
                l = 0;
              for (l = 0; ; ) {
                if ((0 | c[(2140 + l) >> 0]) == (0 | e)) {
                  e = 2;
                  break;
                }
                if (87 == (0 | (u = (l + 1) | 0))) {
                  (u = 2228), (l = 87), (e = 5);
                  break;
                }
                l = u;
              }
              if (
                (2 == (0 | e) && (l ? ((u = 2228), (e = 5)) : (u = 2228)),
                5 == (0 | e))
              )
                for (;;) {
                  for (; (u = ((e = u) + 1) | 0), 0 != (0 | t[e >> 0]); );
                  if (!(l = (l + -1) | 0)) break;
                  e = 5;
                }
              return (
                0 |
                ((i = u),
                (n = 0 | f[(r + 20) >> 2]),
                0 |
                  ((o = i |= 0),
                  (a = n |= 0),
                  (o |= 0),
                  0 |
                    (0 |
                    (a = (a |= 0)
                      ? 0 |
                        (function (e, r, i) {
                          (r |= 0), (i |= 0);
                          var n,
                            o = 0,
                            a = 0,
                            u = 0,
                            l = 0,
                            c = 0,
                            s = 0,
                            _ = 0,
                            d = 0,
                            E = 0;
                          (n = (1794895138 + (0 | f[(e |= 0) >> 2])) | 0),
                            (u = 0 | Ke(0 | f[(e + 8) >> 2], n)),
                            (o = 0 | Ke(0 | f[(e + 12) >> 2], n)),
                            (a = 0 | Ke(0 | f[(e + 16) >> 2], n));
                          e: do {
                            if (
                              u >>> 0 < (r >>> 2) >>> 0 &&
                              (o >>> 0 < (E = (r - (u << 2)) | 0) >>> 0) &
                                (a >>> 0 < E >>> 0) &&
                              0 == ((3 & (a | o)) | 0)
                            ) {
                              for (E = o >>> 2, d = a >>> 2, _ = 0; ; ) {
                                if (
                                  ((o =
                                    0 |
                                    Ke(
                                      0 |
                                        f[
                                          (e +
                                            ((a =
                                              ((l =
                                                (s = (_ + (c = u >>> 1)) | 0) <<
                                                1) +
                                                E) |
                                              0) <<
                                              2)) >>
                                            2
                                        ],
                                      n,
                                    )),
                                  !(
                                    ((a =
                                      0 |
                                      Ke(
                                        0 | f[(e + ((a + 1) << 2)) >> 2],
                                        n,
                                      )) >>>
                                      0 <
                                      r >>> 0) &
                                    (o >>> 0 < ((r - a) | 0) >>> 0)
                                  ))
                                ) {
                                  o = 0;
                                  break e;
                                }
                                if (0 | t[(e + (a + o)) >> 0]) {
                                  o = 0;
                                  break e;
                                }
                                if (!(o = 0 | pe(i, (e + a) | 0))) break;
                                if (((o = (0 | o) < 0), 1 == (0 | u))) {
                                  o = 0;
                                  break e;
                                }
                                (_ = o ? _ : s), (u = o ? c : (u - c) | 0);
                              }
                              (a =
                                0 |
                                Ke(
                                  0 | f[(e + ((o = (l + d) | 0) << 2)) >> 2],
                                  n,
                                )),
                                (o =
                                  ((o =
                                    0 |
                                    Ke(0 | f[(e + ((o + 1) << 2)) >> 2], n)) >>>
                                    0 <
                                    r >>> 0) &
                                    (a >>> 0 < ((r - o) | 0) >>> 0) &&
                                  0 == (0 | t[(e + (o + a)) >> 0])
                                    ? (e + o) | 0
                                    : 0);
                            } else o = 0;
                          } while (0);
                          return 0 | o;
                        })(0 | f[a >> 2], 0 | f[(a + 4) >> 2], o)
                      : 0)
                      ? a
                      : o)))
              );
            })((e |= 0), 0 | f[105])
        );
      }
      function Ye(e, r) {
        return (
          0 |
          ((e |= 0)
            ? 0 |
              (function (e, r, i) {
                (e |= 0), (r |= 0);
                do {
                  if (e) {
                    if (r >>> 0 < 128) {
                      (t[e >> 0] = r), (e = 1);
                      break;
                    }
                    if (!(0 | f[f[420 >> 2] >> 2])) {
                      if (57216 == ((-128 & r) | 0)) {
                        (t[e >> 0] = r), (e = 1);
                        break;
                      }
                      (e = 0 | Qe()), (f[e >> 2] = 84), (e = -1);
                      break;
                    }
                    if (r >>> 0 < 2048) {
                      (t[e >> 0] = (r >>> 6) | 192),
                        (t[(e + 1) >> 0] = (63 & r) | 128),
                        (e = 2);
                      break;
                    }
                    if ((r >>> 0 < 55296) | (57344 == ((-8192 & r) | 0))) {
                      (t[e >> 0] = (r >>> 12) | 224),
                        (t[(e + 1) >> 0] = ((r >>> 6) & 63) | 128),
                        (t[(e + 2) >> 0] = (63 & r) | 128),
                        (e = 3);
                      break;
                    }
                    if (((r + -65536) | 0) >>> 0 < 1048576) {
                      (t[e >> 0] = (r >>> 18) | 240),
                        (t[(e + 1) >> 0] = ((r >>> 12) & 63) | 128),
                        (t[(e + 2) >> 0] = ((r >>> 6) & 63) | 128),
                        (t[(e + 3) >> 0] = (63 & r) | 128),
                        (e = 4);
                      break;
                    }
                    (e = 0 | Qe()), (f[e >> 2] = 84), (e = -1);
                    break;
                  }
                  e = 1;
                } while (0);
                return 0 | e;
              })(e, (r |= 0))
            : 0)
        );
      }
      function Xe(e, r, i) {
        return ((0 | (e |= 0)) == (0 | (r |= 0))) | 0;
      }
      function Ke(e, r) {
        var i;
        return (r |= 0), (i = 0 | Ge(0 | (e |= 0))), 0 | (0 == (0 | r) ? e : i);
      }
      function Ve(e, r, i, n) {
        return 0 | z((e |= 0), (r |= 0), (i |= 0), (n |= 0), 0);
      }
      function Ge(e) {
        return (
          ((255 & (e |= 0)) << 24) |
          (((e >> 8) & 255) << 16) |
          (((e >> 16) & 255) << 8) |
          (e >>> 24) |
          0
        );
      }
      function We(e, r, i, n, t, o) {
        y(6);
      }
      function ze(e, r, i, n, t) {
        y(1);
      }
      function je(e) {
        var r;
        (r = e |= 0), G((r |= 0));
      }
      function Je(e, r, i, n) {
        y(7);
      }
      function Ze(e, r, i) {
        return y(0), 0;
      }
      function qe(e, r) {
        return +(+(function e(r, i) {
          (r = +r), (i |= 0);
          var n,
            t,
            o = 0;
          switch (
            ((T[h >> 3] = r),
            2047 &
              (t =
                0 |
                we(0 | (o = 0 | f[h >> 2]), 0 | (n = 0 | f[(h + 4) >> 2]), 52)))
          ) {
            case 0:
              (o =
                0 != r
                  ? ((r = +e(0x10000000000000000 * r, i)),
                    ((0 | f[i >> 2]) - 64) | 0)
                  : 0),
                (f[i >> 2] = o);
              break;
            case 2047:
              break;
            default:
              (f[i >> 2] = (2047 & t) - 1022),
                (f[h >> 2] = o),
                (f[(h + 4) >> 2] = (-2146435073 & n) | 1071644672),
                (r = +T[h >> 3]);
          }
          return +r;
        })((e = +e), (r |= 0)));
      }
      function Qe() {
        return 296;
      }
      function $e(e) {}
      function er(e) {
        y(2);
      }
      function rr() {
        y(5);
      }
      r.__ZSt18uncaught_exceptionv;
      var ir = [
          Ze,
          $,
          function (e, r, i) {
            var n, t, o;
            return (
              (e |= 0),
              (r |= 0),
              (i |= 0),
              (m = ((t = m) + 32) | 0),
              (n = ((o = t) + 20) | 0),
              (f[o >> 2] = f[(e + 60) >> 2]),
              (f[(o + 4) >> 2] = 0),
              (f[(o + 8) >> 2] = r),
              (f[(o + 12) >> 2] = n),
              (f[(o + 16) >> 2] = i),
              (e =
                (0 | Ue(0 | H(140, 0 | o))) < 0
                  ? (f[n >> 2] = -1)
                  : 0 | f[n >> 2]),
              (m = t),
              0 | e
            );
          },
          function (e, r, i) {
            (r |= 0), (i |= 0);
            var n,
              o = 0;
            return (
              (m = ((n = m) + 32) | 0),
              (o = n),
              (f[(36 + (e |= 0)) >> 2] = 1),
              0 == ((64 & f[e >> 2]) | 0) &&
                ((f[o >> 2] = f[(e + 60) >> 2]),
                (f[(o + 4) >> 2] = 21523),
                (f[(o + 8) >> 2] = n + 16),
                0 | N(54, 0 | o)) &&
                (t[(e + 75) >> 0] = -1),
              (o = 0 | $(e, r, i)),
              (m = n),
              0 | o
            );
          },
          function (e, r, i) {
            var n, t;
            return (
              (r |= 0),
              (i |= 0),
              Q(
                0 | (t = 0 | f[(n = (20 + (e |= 0)) | 0) >> 2]),
                0 | r,
                0 |
                  (e =
                    i >>> 0 < (e = ((0 | f[(e + 16) >> 2]) - t) | 0) >>> 0
                      ? i
                      : e),
              ),
              (f[n >> 2] = (0 | f[n >> 2]) + e),
              0 | i
            );
          },
          function (e, r, i) {
            i |= 0;
            var n,
              t,
              o = 0,
              a = 0;
            if (((m = ((t = m) + 64) | 0), (n = t), 0 | Xe((e |= 0), (r |= 0))))
              r = 1;
            else if (0 != (0 | r) && 0 != (0 | (a = 0 | re(r, 32, 16, 0)))) {
              for (
                o = (52 + (r = (n + 4) | 0)) | 0;
                (0 | (r = (r + 4) | (f[r >> 2] = 0))) < (0 | o);

              );
              (f[n >> 2] = a),
                (f[(n + 8) >> 2] = e),
                (f[(n + 12) >> 2] = -1),
                (f[(n + 48) >> 2] = 1),
                lr[3 & f[(28 + (0 | f[a >> 2])) >> 2]](a, n, 0 | f[i >> 2], 1),
                (r =
                  1 == (0 | f[(n + 24) >> 2])
                    ? ((f[i >> 2] = f[(n + 16) >> 2]), 1)
                    : 0);
            } else r = 0;
            return (m = t), 0 | r;
          },
          Ze,
          Ze,
        ],
        nr = [
          ze,
          function (e, r, i, n, o) {
            (e |= 0), (r |= 0), (i |= 0), (n |= 0);
            var a = 0;
            do {
              if (0 | Xe(e, 0 | f[(r + 8) >> 2])) Re(0, r, i, n);
              else if (0 | Xe(e, 0 | f[r >> 2])) {
                if (
                  ((e = (r + 32) | 0),
                  (0 | f[(r + 16) >> 2]) != (0 | i) &&
                    (0 | f[(a = (r + 20) | 0) >> 2]) != (0 | i))
                ) {
                  (f[e >> 2] = n),
                    (f[a >> 2] = i),
                    (f[(n = (r + 40) | 0) >> 2] = 1 + (0 | f[n >> 2])),
                    1 == (0 | f[(r + 36) >> 2]) &&
                      2 == (0 | f[(r + 24) >> 2]) &&
                      (t[(r + 54) >> 0] = 1),
                    (f[(r + 44) >> 2] = 4);
                  break;
                }
                1 == (0 | n) && (f[e >> 2] = 1);
              }
            } while (0);
          },
          function (e, r, i, n, o) {
            (e |= 0), (r |= 0), (i |= 0), (n |= 0), (o |= 0);
            var a = 0,
              u = 0,
              l = 0,
              c = 0;
            do {
              if (0 | Xe(e, 0 | f[(r + 8) >> 2])) Re(0, r, i, n);
              else {
                if (((a = (e + 8) | 0), !(0 | Xe(e, 0 | f[r >> 2])))) {
                  (l = 0 | f[a >> 2]),
                    nr[3 & f[(24 + (0 | f[l >> 2])) >> 2]](l, r, i, n, o);
                  break;
                }
                if (
                  ((e = (r + 32) | 0),
                  (0 | f[(r + 16) >> 2]) != (0 | i) &&
                    (0 | f[(u = (r + 20) | 0) >> 2]) != (0 | i))
                ) {
                  if (((f[e >> 2] = n), 4 == (0 | f[(n = (r + 44) | 0) >> 2])))
                    break;
                  (t[(e = (r + 52) | 0) >> 0] = 0),
                    (a = (t[(c = (r + 53) | 0) >> 0] = 0) | f[a >> 2]),
                    fr[3 & f[(20 + (0 | f[a >> 2])) >> 2]](a, r, i, i, 1, o),
                    0 | t[c >> 0]
                      ? 0 | t[e >> 0]
                        ? (e = 3)
                        : ((e = 3), (l = 11))
                      : ((e = 4), (l = 11)),
                    11 == (0 | l) &&
                      ((f[u >> 2] = i),
                      (f[(c = (r + 40) | 0) >> 2] = 1 + (0 | f[c >> 2])),
                      1 == (0 | f[(r + 36) >> 2]) &&
                        2 == (0 | f[(r + 24) >> 2]) &&
                        (t[(r + 54) >> 0] = 1)),
                    (f[n >> 2] = e);
                  break;
                }
                1 == (0 | n) && (f[e >> 2] = 1);
              }
            } while (0);
          },
          ze,
        ],
        tr = [
          er,
          $e,
          je,
          $e,
          $e,
          je,
          function (e) {
            var r;
            (m = ((r = m) + 16) | 0),
              G((e |= 0)),
              0 | P(0 | f[1285], 0) ? Ie(4406, r) : (m = r);
          },
          er,
        ],
        or = [
          function (e) {
            return y(3), 0;
          },
          function (e) {
            var r, i, n;
            return (
              (m = ((r = m) + 16) | 0),
              (i = r),
              (e = 0 | ((n = 0 | f[(60 + (e |= 0)) >> 2]), 0 | (n |= 0))),
              (f[i >> 2] = e),
              (e = 0 | Ue(0 | w(6, 0 | i))),
              (m = r),
              0 | e
            );
          },
        ],
        ar = [
          function (e, r, i) {
            y(4);
          },
        ],
        ur = [
          rr,
          function () {
            var e,
              r,
              i,
              n,
              t,
              o = 0,
              a = 0,
              u = 0,
              l = 0,
              c = 0;
            (m = ((l = m) + 48) | 0),
              (i = (l + 32) | 0),
              (e = (l + 24) | 0),
              (c = (l + 16) | 0),
              (l = ((r = l) + 36) | 0),
              0 |
                (o =
                  0 |
                  (0,
                  (t = 0),
                  (m = ((n = m) + 16) | 0),
                  0 | D(5136, 2)
                    ? (Ie(4307, n), 0)
                    : ((t = 0 | C(0 | f[1285])), (m = n), 0 | t))) &&
                0 | (u = 0 | f[o >> 2]) &&
                ((1126902528 ==
                  ((-256 & (a = 0 | f[(o = (u + 48) | 0) >> 2])) | 0)) &
                  (1129074247 == (0 | (o = 0 | f[(o + 4) >> 2]))) ||
                  ((f[e >> 2] = 4168), Ie(4118, e)),
                (o =
                  (1126902529 == (0 | a)) & (1129074247 == (0 | o))
                    ? 0 | f[(u + 44) >> 2]
                    : (u + 80) | 0),
                (f[l >> 2] = o),
                (u = 0 | f[u >> 2]),
                (o = 0 | f[(u + 4) >> 2]),
                0 | ir[7 & f[(16 + (0 | f[2])) >> 2]](8, u, l)
                  ? ((c = 0 | f[l >> 2]),
                    (c = 0 | or[1 & f[(8 + (0 | f[c >> 2])) >> 2]](c)),
                    (f[r >> 2] = 4168),
                    (f[(r + 4) >> 2] = o),
                    (f[(r + 8) >> 2] = c),
                    Ie(4032, r))
                  : ((f[c >> 2] = 4168), (f[(c + 4) >> 2] = o), Ie(4077, c))),
              Ie(4156, i);
          },
          function () {
            var e;
            (m = ((e = m) + 16) | 0), 0 | U(5140, 6) ? Ie(4356, e) : (m = e);
          },
          rr,
        ],
        fr = [
          We,
          function (e, r, i, n, t, o) {
            (i |= 0),
              (n |= 0),
              (t |= 0),
              0 | Xe((e |= 0), 0 | f[(8 + (r |= 0)) >> 2]) && _e(0, r, i, n, t);
          },
          function (e, r, i, n, t, o) {
            (i |= 0),
              (n |= 0),
              (t |= 0),
              (o |= 0),
              0 | Xe((e |= 0), 0 | f[(8 + (r |= 0)) >> 2])
                ? _e(0, r, i, n, t)
                : ((e = 0 | f[(e + 8) >> 2]),
                  fr[3 & f[(20 + (0 | f[e >> 2])) >> 2]](e, r, i, n, t, o));
          },
          We,
        ],
        lr = [
          Je,
          function (e, r, i, n) {
            (i |= 0),
              (n |= 0),
              0 | Xe((e |= 0), 0 | f[(8 + (r |= 0)) >> 2]) && Ae(0, r, i, n);
          },
          function (e, r, i, n) {
            (i |= 0),
              (n |= 0),
              0 | Xe((e |= 0), 0 | f[(8 + (r |= 0)) >> 2])
                ? Ae(0, r, i, n)
                : ((e = 0 | f[(e + 8) >> 2]),
                  lr[3 & f[(28 + (0 | f[e >> 2])) >> 2]](e, r, i, n));
          },
          Je,
        ];
      return {
        stackSave: function () {
          return 0 | m;
        },
        _i64Subtract: Le,
        _crn_get_bytes_per_block: function (e, r) {
          (e |= 0), (r |= 0);
          var i,
            n,
            t,
            o = 0;
          switch (
            ((m = ((t = m) + 576) | 0),
            (n = (t + 40) | 0),
            (i = (t + 56) | 0),
            (f[(o = t) >> 2] = 40),
            te(e, r, o),
            (e = 0 | f[(4 + (r = (o + 32) | 0)) >> 2]),
            0 | f[r >> 2])
          ) {
            case 0:
            case 9:
            case 10:
              if (!e) return (m = t), 8;
              e = 14;
              break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
              e = e ? 14 : 13;
              break;
            default:
              e = 14;
          }
          return 13 == (0 | e)
            ? ((m = t), 0 | (o = 16))
            : 14 == (0 | e)
            ? ((f[n >> 2] = 866),
              (f[(n + 4) >> 2] = 2672),
              (f[(n + 8) >> 2] = 1251),
              Ne(i, 812, n),
              be(i),
              (m = t),
              (o = 0) | o)
            : 0;
        },
        setThrew: function (e, r) {},
        dynCall_viii: function (e, r, i, n) {
          (r |= 0), (i |= 0), (n |= 0), ar[0 & (e |= 0)](0 | r, 0 | i, 0 | n);
        },
        _bitshift64Lshr: we,
        _bitshift64Shl: Pe,
        dynCall_viiii: function (e, r, i, n, t) {
          (r |= 0),
            (i |= 0),
            (n |= 0),
            (t |= 0),
            lr[3 & (e |= 0)](0 | r, 0 | i, 0 | n, 0 | t);
        },
        setTempRet0: function (e) {
          v = e |= 0;
        },
        _crn_decompress: function (e, r, i, n, o, u) {
          (e |= 0), (r |= 0), (i |= 0), (n |= 0), (o |= 0), (u |= 0);
          var l,
            s,
            _,
            d,
            E = 0,
            M = 0,
            T = 0,
            A = 0,
            b = 0;
          switch (
            ((m = ((d = m) + 592) | 0),
            (_ = (d + 56) | 0),
            (T = (d + 40) | 0),
            (l = (d + 72) | 0),
            (s = ((b = d) + 68) | 0),
            (f[b >> 2] = 40),
            te(e, r, b),
            (E = (0 | f[(b + 4) >> 2]) >>> o),
            (M = (0 | f[(b + 8) >> 2]) >>> o),
            (n = 0 | f[(4 + (b = (b + 32) | 0)) >> 2]),
            0 | f[b >> 2])
          ) {
            case 0:
            case 9:
            case 10:
              n ? (A = 14) : (b = 8);
              break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
              A = n ? 14 : 13;
              break;
            default:
              A = 14;
          }
          13 == (0 | A)
            ? (b = 16)
            : 14 == (0 | A) &&
              ((f[T >> 2] = 866),
              (f[(T + 4) >> 2] = 2672),
              (f[(T + 8) >> 2] = 1251),
              Ne(l, 812, T),
              be(l),
              (b = 0)),
            (f[s >> 2] = i),
            (A =
              0 |
              (function (e, r) {
                var i,
                  n,
                  o,
                  u,
                  l,
                  s,
                  _,
                  d,
                  E,
                  M,
                  T = 0,
                  A = 0;
                if (
                  ((m = ((M = m) + 528) | 0),
                  (s = ((E = M) + 16) | 0),
                  (0 == (0 | (e |= 0))) | ((r |= 0) >>> 0 < 62))
                )
                  return (m = M), (A = 0) | A;
                if (!(_ = 0 | ce(300, 0))) return (m = M), (A = 0) | A;
                for (
                  f[_ >> 2] = 519686845,
                    f[(_ + 4) >> 2] = 0,
                    f[(_ + 8) >> 2] = 0,
                    d = (_ + 88) | 0,
                    i = (_ + 136) | 0,
                    n = (_ + 160) | 0,
                    o = (_ + 184) | 0,
                    u = (_ + 208) | 0,
                    l = (_ + 232) | 0,
                    f[(T = (_ + 252) | 0) >> 2] = 0,
                    f[(T + 4) >> 2] = 0,
                    f[(T + 8) >> 2] = 0,
                    t[(T + 12) >> 0] = 0,
                    f[(T = (_ + 268) | 0) >> 2] = 0,
                    f[(T + 4) >> 2] = 0,
                    f[(T + 8) >> 2] = 0,
                    t[(T + 12) >> 0] = 0,
                    f[(T = (_ + 284) | 0) >> 2] = 0,
                    f[(T + 4) >> 2] = 0,
                    f[(T + 8) >> 2] = 0,
                    t[(T + 12) >> 0] = 0,
                    A = ((T = d) + 44) | 0;
                  ((f[T >> 2] = 0) | (T = (T + 4) | 0)) < (0 | A);

                );
                return (
                  (t[(d + 44) >> 0] = 0),
                  (f[i >> 2] = 0),
                  (f[(i + 4) >> 2] = 0),
                  (f[(i + 8) >> 2] = 0),
                  (f[(i + 12) >> 2] = 0),
                  (f[(i + 16) >> 2] = 0),
                  (t[(i + 20) >> 0] = 0),
                  (f[n >> 2] = 0),
                  (f[(n + 4) >> 2] = 0),
                  (f[(n + 8) >> 2] = 0),
                  (f[(n + 12) >> 2] = 0),
                  (f[(n + 16) >> 2] = 0),
                  (t[(n + 20) >> 0] = 0),
                  (f[o >> 2] = 0),
                  (f[(o + 4) >> 2] = 0),
                  (f[(o + 8) >> 2] = 0),
                  (f[(o + 12) >> 2] = 0),
                  (f[(o + 16) >> 2] = 0),
                  (t[(o + 20) >> 0] = 0),
                  (f[u >> 2] = 0),
                  (f[(u + 4) >> 2] = 0),
                  (f[(u + 8) >> 2] = 0),
                  (f[(u + 12) >> 2] = 0),
                  (f[(u + 16) >> 2] = 0),
                  (t[(u + 20) >> 0] = 0),
                  (f[l >> 2] = 0),
                  (f[(l + 4) >> 2] = 0),
                  (f[(l + 8) >> 2] = 0),
                  (f[(l + 12) >> 2] = 0),
                  (t[(l + 16) >> 0] = 0) |
                  (function (e, r, i) {
                    e |= 0;
                    var n = 0,
                      o = 0;
                    if (
                      !(
                        (0 == (0 | (r |= 0))) | ((i |= 0) >>> 0 < 74) ||
                        18552 !=
                          (((0 | c[r >> 0]) << 8) | 0 | c[(r + 1) >> 0] | 0)
                      ) &&
                      74 <=
                        (((0 | c[(r + 2) >> 0]) << 8) | 0 | c[(r + 3) >> 0]) >>>
                          0 &&
                      (((0 | c[(r + 7) >> 0]) << 16) |
                        ((0 | c[(r + 6) >> 0]) << 24) |
                        ((0 | c[(r + 8) >> 0]) << 8) |
                        0 |
                        c[(r + 9) >> 0]) >>>
                        0 <=
                        i >>> 0
                    ) {
                      if (
                        ((f[(n = (e + 88) | 0) >> 2] = r),
                        (f[(e + 4) >> 2] = r),
                        (f[(e + 8) >> 2] = i),
                        !(
                          0 |
                          (function (e) {
                            var r,
                              i = 0,
                              n = 0,
                              t = 0;
                            if (
                              ((t = (92 + (e |= 0)) | 0),
                              (n = 0 | f[(r = (e + 88) | 0) >> 2]),
                              (i =
                                ((0 | f[(e + 4) >> 2]) +
                                  (((0 | c[(n + 68) >> 0]) << 8) |
                                    ((0 | c[(n + 67) >> 0]) << 16) |
                                    0 |
                                    c[(n + 69) >> 0])) |
                                0),
                              !(n =
                                ((0 | c[(n + 65) >> 0]) << 8) |
                                0 |
                                c[(n + 66) >> 0]))
                            )
                              return (t = 0) | t;
                            if (
                              ((f[t >> 2] = i),
                              (f[(e + 96) >> 2] = i),
                              (f[(e + 104) >> 2] = n),
                              (f[(e + 100) >> 2] = i + n),
                              (f[(e + 108) >> 2] = 0),
                              !((f[(e + 112) >> 2] = 0) | K(t, (e + 116) | 0)))
                            )
                              return (t = 0) | t;
                            i = 0 | f[r >> 2];
                            do {
                              if (
                                ((0 | c[(i + 39) >> 0]) << 8) |
                                0 |
                                c[(i + 40) >> 0]
                              ) {
                                if (!(0 | K(t, (e + 140) | 0)))
                                  return (t = 0) | t;
                                if (0 | K(t, (e + 188) | 0)) {
                                  i = 0 | f[r >> 2];
                                  break;
                                }
                                return (t = 0) | t;
                              }
                              if (
                                !(
                                  ((0 | c[(i + 55) >> 0]) << 8) |
                                  0 |
                                  c[(i + 56) >> 0]
                                )
                              )
                                return (t = 0) | t;
                            } while (0);
                            if (
                              ((0 | c[(i + 55) >> 0]) << 8) |
                              0 |
                              c[(i + 56) >> 0] |
                              0
                            ) {
                              if (!(0 | K(t, (e + 164) | 0)))
                                return (t = 0) | t;
                              if (!(0 | K(t, (e + 212) | 0)))
                                return (t = 0) | t;
                            }
                            return 1;
                          })(e)
                        ))
                      )
                        return (o = 0) | o;
                      if (
                        ((r = 0 | f[n >> 2]),
                        ((0 | c[(r + 39) >> 0]) << 8) | 0 | c[(r + 40) >> 0]
                          ? 0 |
                              (function (e) {
                                var r,
                                  i,
                                  n,
                                  o,
                                  a,
                                  u = 0,
                                  l = 0,
                                  s = 0,
                                  _ = 0,
                                  d = 0,
                                  E = 0,
                                  M = 0,
                                  T = 0;
                                if (
                                  ((m = ((a = m) + 576) | 0),
                                  (_ = ((E = a) + 64) | 0),
                                  (T = (a + 16) | 0),
                                  (u = 0 | f[(s = (88 + (e |= 0)) | 0) >> 2]),
                                  (o =
                                    ((0 | c[(u + 39) >> 0]) << 8) |
                                    0 |
                                    c[(u + 40) >> 0]),
                                  (i = (e + 236) | 0),
                                  (0 | (l = 0 | f[(d = (e + 240) | 0) >> 2])) !=
                                    (0 | o))
                                ) {
                                  if (l >>> 0 <= o >>> 0) {
                                    do {
                                      if (
                                        (0 | f[(e + 244) >> 2]) >>> 0 <
                                        o >>> 0
                                      ) {
                                        if (
                                          0 |
                                          q(
                                            i,
                                            o,
                                            ((l + 1) | 0) == (0 | o),
                                            4,
                                            0,
                                          )
                                        ) {
                                          u = 0 | f[d >> 2];
                                          break;
                                        }
                                        return (
                                          (t[(e + 248) >> 0] = 1),
                                          (m = a),
                                          (T = 0) | T
                                        );
                                      }
                                      u = l;
                                    } while (0);
                                    se(
                                      ((0 | f[i >> 2]) + (u << 2)) | 0,
                                      0,
                                      ((o - u) << 2) | 0,
                                    ),
                                      (u = 0 | f[s >> 2]);
                                  }
                                  f[d >> 2] = o;
                                }
                                if (
                                  ((n = (e + 92) | 0),
                                  (l =
                                    ((0 | f[(e + 4) >> 2]) +
                                      (((0 | c[(u + 34) >> 0]) << 8) |
                                        ((0 | c[(u + 33) >> 0]) << 16) |
                                        0 |
                                        c[(u + 35) >> 0])) |
                                    0),
                                  !(u =
                                    ((0 | c[(u + 37) >> 0]) << 8) |
                                    ((0 | c[(u + 36) >> 0]) << 16) |
                                    0 |
                                    c[(u + 38) >> 0]))
                                )
                                  return (m = a), (T = 0) | T;
                                if (
                                  ((f[n >> 2] = l),
                                  (f[(e + 96) >> 2] = l),
                                  (f[(e + 104) >> 2] = u),
                                  (f[(e + 100) >> 2] = l + u),
                                  (f[(e + 108) >> 2] = 0),
                                  (f[(e + 112) >> 2] = 0),
                                  (M = (T + 20) | 0),
                                  (f[T >> 2] = 0),
                                  (f[(T + 4) >> 2] = 0),
                                  (f[(T + 8) >> 2] = 0),
                                  (f[(T + 12) >> 2] = 0),
                                  (t[(T + 16) >> 0] = 0),
                                  (r = (T + 24) | 0),
                                  (f[(T + 44) >> 2] = 0),
                                  (f[M >> 2] = 0),
                                  (f[(M + 4) >> 2] = 0),
                                  (f[(M + 8) >> 2] = 0),
                                  (f[(M + 12) >> 2] = 0),
                                  (f[(M + 16) >> 2] = 0),
                                  (t[(M + 20) >> 0] = 0) | K(n, T) &&
                                    0 | K(n, r))
                                )
                                  if (
                                    (0 | f[d >> 2] ||
                                      ((f[E >> 2] = 866),
                                      (f[(E + 4) >> 2] = 910),
                                      (f[(E + 8) >> 2] = 1497),
                                      Ne(_, 812, E),
                                      be(_)),
                                    o)
                                  )
                                    for (
                                      l = (M = E = 0) | f[i >> 2],
                                        d = _ = u = e = s = 0;
                                      ;

                                    ) {
                                      if (
                                        ((E = ((0 | j(n, T)) + E) & 31),
                                        (d = ((0 | j(n, r)) + d) & 63),
                                        (_ = ((0 | j(n, T)) + _) & 31),
                                        (u = ((0 | j(n, T)) + u) | 0),
                                        (e = ((0 | j(n, r)) + e) & 63),
                                        (s = ((0 | j(n, T)) + s) & 31),
                                        (f[l >> 2] =
                                          (d << 5) |
                                          (E << 11) |
                                          _ |
                                          (u << 27) |
                                          (e << 21) |
                                          (s << 16)),
                                        o >>> 0 <= (M = (M + 1) | 0) >>> 0)
                                      ) {
                                        u = 1;
                                        break;
                                      }
                                      (l = (l + 4) | 0), (u &= 31);
                                    }
                                  else u = 1;
                                else u = 0;
                                return le((T + 24) | 0), le(T), (m = a), 0 | u;
                              })(e) &&
                            0 |
                              (function (e) {
                                var r,
                                  i,
                                  n,
                                  o,
                                  a,
                                  u,
                                  l = 0,
                                  s = 0,
                                  _ = 0,
                                  d = 0,
                                  E = 0,
                                  M = 0,
                                  T = 0,
                                  A = 0,
                                  b = 0,
                                  h = 0,
                                  p = 0,
                                  v = 0,
                                  S = 0,
                                  k = 0,
                                  y = 0,
                                  R = 0,
                                  g = 0,
                                  O = 0,
                                  C = 0,
                                  N = 0,
                                  P = 0,
                                  w = 0,
                                  I = 0,
                                  L = 0,
                                  D = 0,
                                  F = 0,
                                  U = 0,
                                  H = 0,
                                  x = 0,
                                  B = 0,
                                  Y = 0,
                                  X = 0,
                                  V = 0;
                                if (
                                  ((m = ((u = m) + 1008) | 0),
                                  (E = ((M = u) + 496) | 0),
                                  (C = (u + 472) | 0),
                                  (n = (u + 276) | 0),
                                  (o = (u + 80) | 0),
                                  (a = (u + 16) | 0),
                                  (s = 0 | f[(88 + (e |= 0)) >> 2]),
                                  (r =
                                    ((0 | c[(s + 47) >> 0]) << 8) |
                                    0 |
                                    c[(s + 48) >> 0]),
                                  (i = (e + 92) | 0),
                                  (l =
                                    ((0 | f[(e + 4) >> 2]) +
                                      (((0 | c[(s + 42) >> 0]) << 8) |
                                        ((0 | c[(s + 41) >> 0]) << 16) |
                                        0 |
                                        c[(s + 43) >> 0])) |
                                    0),
                                  !(s =
                                    ((0 | c[(s + 45) >> 0]) << 8) |
                                    ((0 | c[(s + 44) >> 0]) << 16) |
                                    0 |
                                    c[(s + 46) >> 0]))
                                )
                                  return (m = u), (C = 0) | C;
                                if (
                                  ((f[i >> 2] = l),
                                  (f[(e + 96) >> 2] = l),
                                  (f[(e + 104) >> 2] = s),
                                  (f[(e + 100) >> 2] = l + s),
                                  (f[(e + 108) >> 2] = 0),
                                  (f[(e + 112) >> 2] = 0),
                                  (f[(C + 20) >> 2] = 0),
                                  (f[C >> 2] = 0),
                                  (f[(C + 4) >> 2] = 0),
                                  (f[(C + 8) >> 2] = 0),
                                  (f[(C + 12) >> 2] = 0),
                                  (t[(C + 16) >> 0] = 0) | K(i, C))
                                ) {
                                  for (
                                    l = 0, _ = s = -3;
                                    (f[(n + (l << 2)) >> 2] = _),
                                      (f[(o + (l << 2)) >> 2] = s),
                                      (d = 2 < (0 | _)),
                                      49 != (0 | (l = (l + 1) | 0));

                                  )
                                    (s = ((1 & d) + s) | 0),
                                      (_ = d ? -3 : (_ + 1) | 0);
                                  for (
                                    s = ((l = a) + 64) | 0;
                                    (0 | (l = (l + 4) | (f[l >> 2] = 0))) <
                                    (0 | s);

                                  );
                                  (_ = (e + 252) | 0),
                                    (l = 0 | f[(s = (e + 256) | 0) >> 2]);
                                  e: do {
                                    if ((0 | l) == (0 | r)) T = 13;
                                    else {
                                      if (l >>> 0 <= r >>> 0) {
                                        do {
                                          if (
                                            (0 | f[(e + 260) >> 2]) >>> 0 <
                                            r >>> 0
                                          ) {
                                            if (
                                              0 |
                                              q(
                                                _,
                                                r,
                                                ((l + 1) | 0) == (0 | r),
                                                4,
                                                0,
                                              )
                                            ) {
                                              l = 0 | f[s >> 2];
                                              break;
                                            }
                                            (t[(e + 264) >> 0] = 1), (l = 0);
                                            break e;
                                          }
                                        } while (0);
                                        se(
                                          ((0 | f[_ >> 2]) + (l << 2)) | 0,
                                          0,
                                          ((r - l) << 2) | 0,
                                        );
                                      }
                                      (f[s >> 2] = r), (T = 13);
                                    }
                                  } while (0);
                                  do {
                                    if (13 == (0 | T)) {
                                      if (!r) {
                                        (f[M >> 2] = 866),
                                          (f[(M + 4) >> 2] = 910),
                                          (f[(M + 8) >> 2] = 1497),
                                          Ne(E, 812, M),
                                          be(E),
                                          (l = 1);
                                        break;
                                      }
                                      for (
                                        e = (a + 4) | 0,
                                          E = (a + 8) | 0,
                                          M = (a + 12) | 0,
                                          T = (a + 16) | 0,
                                          A = (a + 20) | 0,
                                          b = (a + 24) | 0,
                                          h = (a + 28) | 0,
                                          p = (a + 32) | 0,
                                          v = (a + 36) | 0,
                                          S = (a + 40) | 0,
                                          k = (a + 44) | 0,
                                          y = (a + 48) | 0,
                                          R = (a + 52) | 0,
                                          g = (a + 56) | 0,
                                          O = (a + 60) | 0,
                                          l = (d = 0) | f[_ >> 2],
                                          s = 0 | f[e >> 2],
                                          _ = 0 | f[a >> 2];
                                        (X = 0 | j(i, C)),
                                          (_ =
                                            (_ + (0 | f[(n + (X << 2)) >> 2])) &
                                            3),
                                          (s =
                                            (s + (0 | f[(o + (X << 2)) >> 2])) &
                                            3),
                                          (X = 0 | j(i, C)),
                                          (V =
                                            ((0 | f[E >> 2]) +
                                              (0 | f[(n + (X << 2)) >> 2])) &
                                            3),
                                          (f[E >> 2] = V),
                                          (X =
                                            ((0 | f[M >> 2]) +
                                              (0 | f[(o + (X << 2)) >> 2])) &
                                            3),
                                          (f[M >> 2] = X),
                                          (B = 0 | j(i, C)),
                                          (Y =
                                            ((0 | f[T >> 2]) +
                                              (0 | f[(n + (B << 2)) >> 2])) &
                                            3),
                                          (f[T >> 2] = Y),
                                          (B =
                                            ((0 | f[A >> 2]) +
                                              (0 | f[(o + (B << 2)) >> 2])) &
                                            3),
                                          (f[A >> 2] = B),
                                          (H = 0 | j(i, C)),
                                          (x =
                                            ((0 | f[b >> 2]) +
                                              (0 | f[(n + (H << 2)) >> 2])) &
                                            3),
                                          (f[b >> 2] = x),
                                          (H =
                                            ((0 | f[h >> 2]) +
                                              (0 | f[(o + (H << 2)) >> 2])) &
                                            3),
                                          (f[h >> 2] = H),
                                          (F = 0 | j(i, C)),
                                          (U =
                                            ((0 | f[p >> 2]) +
                                              (0 | f[(n + (F << 2)) >> 2])) &
                                            3),
                                          (f[p >> 2] = U),
                                          (F =
                                            ((0 | f[v >> 2]) +
                                              (0 | f[(o + (F << 2)) >> 2])) &
                                            3),
                                          (f[v >> 2] = F),
                                          (L = 0 | j(i, C)),
                                          (D =
                                            ((0 | f[S >> 2]) +
                                              (0 | f[(n + (L << 2)) >> 2])) &
                                            3),
                                          (f[S >> 2] = D),
                                          (L =
                                            ((0 | f[k >> 2]) +
                                              (0 | f[(o + (L << 2)) >> 2])) &
                                            3),
                                          (f[k >> 2] = L),
                                          (w = 0 | j(i, C)),
                                          (I =
                                            ((0 | f[y >> 2]) +
                                              (0 | f[(n + (w << 2)) >> 2])) &
                                            3),
                                          (f[y >> 2] = I),
                                          (w =
                                            ((0 | f[R >> 2]) +
                                              (0 | f[(o + (w << 2)) >> 2])) &
                                            3),
                                          (f[R >> 2] = w),
                                          (N = 0 | j(i, C)),
                                          (P =
                                            ((0 | f[g >> 2]) +
                                              (0 | f[(n + (N << 2)) >> 2])) &
                                            3),
                                          (f[g >> 2] = P),
                                          (N =
                                            ((0 | f[O >> 2]) +
                                              (0 | f[(o + (N << 2)) >> 2])) &
                                            3),
                                          (f[O >> 2] = N),
                                          (f[l >> 2] =
                                            ((0 | c[(1441 + s) >> 0]) << 2) |
                                            0 |
                                            c[(1441 + _) >> 0] |
                                            ((0 | c[(1441 + V) >> 0]) << 4) |
                                            ((0 | c[(1441 + X) >> 0]) << 6) |
                                            ((0 | c[(1441 + Y) >> 0]) << 8) |
                                            ((0 | c[(1441 + B) >> 0]) << 10) |
                                            ((0 | c[(1441 + x) >> 0]) << 12) |
                                            ((0 | c[(1441 + H) >> 0]) << 14) |
                                            ((0 | c[(1441 + U) >> 0]) << 16) |
                                            ((0 | c[(1441 + F) >> 0]) << 18) |
                                            ((0 | c[(1441 + D) >> 0]) << 20) |
                                            ((0 | c[(1441 + L) >> 0]) << 22) |
                                            ((0 | c[(1441 + I) >> 0]) << 24) |
                                            ((0 | c[(1441 + w) >> 0]) << 26) |
                                            ((0 | c[(1441 + P) >> 0]) << 28) |
                                            ((0 | c[(1441 + N) >> 0]) << 30)),
                                          !(r >>> 0 <= (d = (d + 1) | 0) >>> 0);

                                      )
                                        l = (l + 4) | 0;
                                      (f[a >> 2] = _), (f[e >> 2] = s), (l = 1);
                                    }
                                  } while (0);
                                } else l = 0;
                                return le(C), (m = u), 0 | l;
                              })(e) &&
                            ((r = 0 | f[n >> 2]), (o = 11))
                          : (o = 11),
                        11 == (0 | o))
                      ) {
                        if (
                          !(
                            ((0 | c[(r + 55) >> 0]) << 8) |
                            0 |
                            c[(r + 56) >> 0]
                          )
                        )
                          return 1;
                        if (
                          0 |
                            (function (e) {
                              var r,
                                i,
                                n,
                                o,
                                u = 0,
                                l = 0,
                                s = 0,
                                _ = 0,
                                d = 0;
                              if (
                                ((m = ((o = m) + 560) | 0),
                                (s = ((r = o) + 40) | 0),
                                (d = (o + 16) | 0),
                                (l = 0 | f[(88 + (e |= 0)) >> 2]),
                                (i =
                                  ((0 | c[(l + 55) >> 0]) << 8) |
                                  0 |
                                  c[(l + 56) >> 0]),
                                (n = (e + 92) | 0),
                                (u =
                                  ((0 | f[(e + 4) >> 2]) +
                                    (((0 | c[(l + 50) >> 0]) << 8) |
                                      ((0 | c[(l + 49) >> 0]) << 16) |
                                      0 |
                                      c[(l + 51) >> 0])) |
                                  0),
                                !(l =
                                  ((0 | c[(l + 53) >> 0]) << 8) |
                                  ((0 | c[(l + 52) >> 0]) << 16) |
                                  0 |
                                  c[(l + 54) >> 0]))
                              )
                                return (m = o), (d = 0) | d;
                              (f[n >> 2] = u),
                                (f[(e + 96) >> 2] = u),
                                (f[(e + 104) >> 2] = l),
                                (f[(e + 100) >> 2] = u + l),
                                (f[(e + 108) >> 2] = 0),
                                (f[(e + 112) >> 2] = 0),
                                (f[(d + 20) >> 2] = 0),
                                (f[d >> 2] = 0),
                                (f[(d + 4) >> 2] = 0),
                                (f[(d + 8) >> 2] = 0),
                                (f[(d + 12) >> 2] = 0),
                                (t[(d + 16) >> 0] = 0);
                              e: do {
                                if (0 | K(n, d)) {
                                  if (
                                    ((_ = (e + 268) | 0),
                                    (0 |
                                      (u = 0 | f[(l = (e + 272) | 0) >> 2])) !=
                                      (0 | i))
                                  ) {
                                    if (u >>> 0 <= i >>> 0) {
                                      do {
                                        if (
                                          (0 | f[(e + 276) >> 2]) >>> 0 <
                                          i >>> 0
                                        ) {
                                          if (
                                            0 |
                                            q(
                                              _,
                                              i,
                                              ((u + 1) | 0) == (0 | i),
                                              2,
                                              0,
                                            )
                                          ) {
                                            u = 0 | f[l >> 2];
                                            break;
                                          }
                                          (t[(e + 280) >> 0] = 1), (u = 0);
                                          break e;
                                        }
                                      } while (0);
                                      se(
                                        ((0 | f[_ >> 2]) + (u << 1)) | 0,
                                        0,
                                        ((i - u) << 1) | 0,
                                      );
                                    }
                                    f[l >> 2] = i;
                                  }
                                  if (!i) {
                                    (f[r >> 2] = 866),
                                      (f[(r + 4) >> 2] = 910),
                                      (f[(r + 8) >> 2] = 1497),
                                      Ne(s, 812, r),
                                      be(s),
                                      (u = 1);
                                    break;
                                  }
                                  for (u = (s = e = l = 0) | f[_ >> 2]; ; ) {
                                    if (
                                      ((s = ((_ = 0 | j(n, d)) + s) & 255),
                                      (e = ((0 | j(n, d)) + e) & 255),
                                      (a[u >> 1] = (e << 8) | s),
                                      i >>> 0 <= (l = (l + 1) | 0) >>> 0)
                                    ) {
                                      u = 1;
                                      break;
                                    }
                                    u = (u + 2) | 0;
                                  }
                                } else u = 0;
                              } while (0);
                              return le(d), (m = o), 0 | u;
                            })(e) &&
                          0 |
                            (function (e) {
                              var r,
                                i,
                                n,
                                o,
                                u,
                                l,
                                s = 0,
                                _ = 0,
                                d = 0,
                                E = 0,
                                M = 0,
                                T = 0,
                                A = 0,
                                b = 0,
                                h = 0,
                                p = 0,
                                v = 0,
                                S = 0,
                                k = 0,
                                y = 0,
                                R = 0,
                                g = 0,
                                O = 0,
                                C = 0,
                                N = 0,
                                P = 0,
                                w = 0,
                                I = 0,
                                L = 0,
                                D = 0,
                                F = 0,
                                U = 0,
                                H = 0,
                                x = 0,
                                B = 0,
                                Y = 0,
                                X = 0,
                                V = 0,
                                G = 0,
                                W = 0,
                                z = 0;
                              if (
                                ((m = ((l = m) + 2416) | 0),
                                (M = ((T = l) + 1904) | 0),
                                (G = (l + 1880) | 0),
                                (n = (l + 980) | 0),
                                (o = (l + 80) | 0),
                                (u = (l + 16) | 0),
                                (_ = 0 | f[(88 + (e |= 0)) >> 2]),
                                (r =
                                  ((0 | c[(_ + 63) >> 0]) << 8) |
                                  0 |
                                  c[(_ + 64) >> 0]),
                                (i = (e + 92) | 0),
                                (s =
                                  ((0 | f[(e + 4) >> 2]) +
                                    (((0 | c[(_ + 58) >> 0]) << 8) |
                                      ((0 | c[(_ + 57) >> 0]) << 16) |
                                      0 |
                                      c[(_ + 59) >> 0])) |
                                  0),
                                !(_ =
                                  ((0 | c[(_ + 61) >> 0]) << 8) |
                                  ((0 | c[(_ + 60) >> 0]) << 16) |
                                  0 |
                                  c[(_ + 62) >> 0]))
                              )
                                return (m = l), (G = 0) | G;
                              if (
                                ((f[i >> 2] = s),
                                (f[(e + 96) >> 2] = s),
                                (f[(e + 104) >> 2] = _),
                                (f[(e + 100) >> 2] = s + _),
                                (f[(e + 108) >> 2] = 0),
                                (f[(e + 112) >> 2] = 0),
                                (f[(G + 20) >> 2] = 0),
                                (f[G >> 2] = 0),
                                (f[(G + 4) >> 2] = 0),
                                (f[(G + 8) >> 2] = 0),
                                (f[(G + 12) >> 2] = 0),
                                (t[(G + 16) >> 0] = 0) | K(i, G))
                              ) {
                                for (
                                  s = 0, d = _ = -7;
                                  (f[(n + (s << 2)) >> 2] = d),
                                    (f[(o + (s << 2)) >> 2] = _),
                                    (E = 6 < (0 | d)),
                                    225 != (0 | (s = (s + 1) | 0));

                                )
                                  (_ = ((1 & E) + _) | 0),
                                    (d = E ? -7 : (d + 1) | 0);
                                for (
                                  _ = ((s = u) + 64) | 0;
                                  (0 | (s = (s + 4) | (f[s >> 2] = 0))) <
                                  (0 | _);

                                );
                                (E = (e + 284) | 0),
                                  (_ = (3 * r) | 0),
                                  (s = 0 | f[(d = (e + 288) | 0) >> 2]);
                                e: do {
                                  if ((0 | s) == (0 | _)) A = 13;
                                  else {
                                    if (s >>> 0 <= _ >>> 0) {
                                      do {
                                        if (
                                          (0 | f[(e + 292) >> 2]) >>> 0 <
                                          _ >>> 0
                                        ) {
                                          if (
                                            0 |
                                            q(
                                              E,
                                              _,
                                              ((s + 1) | 0) == (0 | _),
                                              2,
                                              0,
                                            )
                                          ) {
                                            s = 0 | f[d >> 2];
                                            break;
                                          }
                                          (t[(e + 296) >> 0] = 1), (s = 0);
                                          break e;
                                        }
                                      } while (0);
                                      se(
                                        ((0 | f[E >> 2]) + (s << 1)) | 0,
                                        0,
                                        ((_ - s) << 1) | 0,
                                      );
                                    }
                                    (f[d >> 2] = _), (A = 13);
                                  }
                                } while (0);
                                do {
                                  if (13 == (0 | A)) {
                                    if (!r) {
                                      (f[T >> 2] = 866),
                                        (f[(T + 4) >> 2] = 910),
                                        (f[(T + 8) >> 2] = 1497),
                                        Ne(M, 812, T),
                                        be(M),
                                        (s = 1);
                                      break;
                                    }
                                    for (
                                      C = (u + 4) | 0,
                                        N = (u + 8) | 0,
                                        P = (u + 12) | 0,
                                        w = (u + 16) | 0,
                                        I = (u + 20) | 0,
                                        L = (u + 24) | 0,
                                        D = (u + 28) | 0,
                                        F = (u + 32) | 0,
                                        U = (u + 36) | 0,
                                        H = (u + 40) | 0,
                                        x = (u + 44) | 0,
                                        B = (u + 48) | 0,
                                        Y = (u + 52) | 0,
                                        X = (u + 56) | 0,
                                        V = (u + 60) | 0,
                                        s = (O = 0) | f[E >> 2],
                                        _ = 0 | f[u >> 2],
                                        d = 0 | f[C >> 2],
                                        E = 0 | f[N >> 2],
                                        e = 0 | f[P >> 2],
                                        M = 0 | f[w >> 2],
                                        T = 0 | f[I >> 2],
                                        A = 0 | f[L >> 2],
                                        b = 0 | f[D >> 2],
                                        h = 0 | f[F >> 2],
                                        p = 0 | f[U >> 2],
                                        v = 0 | f[H >> 2],
                                        S = 0 | f[x >> 2],
                                        g = R = y = k = 0;
                                      (z = 0 | j(i, G)),
                                        (_ =
                                          (_ + (0 | f[(n + (z << 2)) >> 2])) &
                                          7),
                                        (d =
                                          (d + (0 | f[(o + (z << 2)) >> 2])) &
                                          7),
                                        (z = 0 | j(i, G)),
                                        (E =
                                          (E + (0 | f[(n + (z << 2)) >> 2])) &
                                          7),
                                        (e =
                                          (e + (0 | f[(o + (z << 2)) >> 2])) &
                                          7),
                                        (z = 0 | j(i, G)),
                                        (M =
                                          (M + (0 | f[(n + (z << 2)) >> 2])) &
                                          7),
                                        (T =
                                          (T + (0 | f[(o + (z << 2)) >> 2])) &
                                          7),
                                        (z = 0 | j(i, G)),
                                        (A =
                                          (A + (0 | f[(n + (z << 2)) >> 2])) &
                                          7),
                                        (b =
                                          (b + (0 | f[(o + (z << 2)) >> 2])) &
                                          7),
                                        (z = 0 | j(i, G)),
                                        (h =
                                          (h + (0 | f[(n + (z << 2)) >> 2])) &
                                          7),
                                        (p =
                                          (p + (0 | f[(o + (z << 2)) >> 2])) &
                                          7),
                                        (z = 0 | j(i, G)),
                                        (v =
                                          (v + (0 | f[(n + (z << 2)) >> 2])) &
                                          7),
                                        (S =
                                          (S + (0 | f[(o + (z << 2)) >> 2])) &
                                          7),
                                        (z = 0 | j(i, G)),
                                        (k =
                                          (k + (0 | f[(n + (z << 2)) >> 2])) &
                                          7),
                                        (y =
                                          (y + (0 | f[(o + (z << 2)) >> 2])) &
                                          7),
                                        (z = 0 | j(i, G)),
                                        (R =
                                          (R + (0 | f[(n + (z << 2)) >> 2])) &
                                          7),
                                        (g =
                                          (g + (0 | f[(o + (z << 2)) >> 2])) &
                                          7),
                                        (z = 0 | c[(1445 + T) >> 0]),
                                        (a[s >> 1] =
                                          ((0 | c[(1445 + d) >> 0]) << 3) |
                                          0 |
                                          c[(1445 + _) >> 0] |
                                          ((0 | c[(1445 + E) >> 0]) << 6) |
                                          ((0 | c[(1445 + e) >> 0]) << 9) |
                                          ((0 | c[(1445 + M) >> 0]) << 12) |
                                          (z << 15)),
                                        (W = 0 | c[(1445 + v) >> 0]),
                                        (a[(s + 2) >> 1] =
                                          ((0 | c[(1445 + A) >> 0]) << 2) |
                                          (z >>> 1) |
                                          ((0 | c[(1445 + b) >> 0]) << 5) |
                                          ((0 | c[(1445 + h) >> 0]) << 8) |
                                          ((0 | c[(1445 + p) >> 0]) << 11) |
                                          (W << 14)),
                                        (a[(s + 4) >> 1] =
                                          ((0 | c[(1445 + S) >> 0]) << 1) |
                                          (W >>> 2) |
                                          ((0 | c[(1445 + k) >> 0]) << 4) |
                                          ((0 | c[(1445 + y) >> 0]) << 7) |
                                          ((0 | c[(1445 + R) >> 0]) << 10) |
                                          ((0 | c[(1445 + g) >> 0]) << 13)),
                                        !(r >>> 0 <= (O = (O + 1) | 0) >>> 0);

                                    )
                                      s = (s + 6) | 0;
                                    (f[u >> 2] = _),
                                      (f[C >> 2] = d),
                                      (f[N >> 2] = E),
                                      (f[P >> 2] = e),
                                      (f[w >> 2] = M),
                                      (f[I >> 2] = T),
                                      (f[L >> 2] = A),
                                      (f[D >> 2] = b),
                                      (f[F >> 2] = h),
                                      (f[U >> 2] = p),
                                      (f[H >> 2] = v),
                                      (f[x >> 2] = S),
                                      (f[B >> 2] = k),
                                      (f[Y >> 2] = y),
                                      (f[X >> 2] = R),
                                      (f[V >> 2] = g),
                                      (s = 1);
                                  }
                                } while (0);
                              } else s = 0;
                              return le(G), (m = l), 0 | s;
                            })(e)
                        )
                          return 1;
                      }
                      return (o = 0) | o;
                    }
                    return (f[(e + 88) >> 2] = 0), (o = 0) | o;
                  })(_, e, r)
                    ? ((m = M), 0 | (A = _))
                    : (J(_),
                      7 & _
                        ? ((f[E >> 2] = 866),
                          (f[(E + 4) >> 2] = 2506),
                          (f[(E + 8) >> 2] = 1232),
                          Ne(s, 812, E),
                          be(s))
                        : Ee(_, 0, 0, 1, 0),
                      (m = M),
                      (A = 0) | A)
                );
              })(e, r)),
            (r = (u + o) | 0);
          do {
            if (o >>> 0 < r >>> 0) {
              if (!A) {
                for (
                  n = i;
                  (n =
                    (n +
                      (0 |
                        S(
                          0 | S(((E + 3) | 0) >>> 2, b),
                          ((M + 3) | 0) >>> 2,
                        ))) |
                    0),
                    (0 | (o = (o + 1) | 0)) != (0 | r);

                )
                  (M >>>= 1), (E >>>= 1);
                f[s >> 2] = n;
                break;
              }
              for (
                e = M, n = i;
                (M = 0 | S(((E + 3) | 0) >>> 2, b)),
                  (15 < o >>> 0) |
                    ((T = 0 | S(M, ((e + 3) | 0) >>> 2)) >>> 0 < 8) ||
                    519686845 != (0 | f[A >> 2]) ||
                    (ue(A, s, T, M, o), (n = 0 | f[s >> 2])),
                  (n = (n + T) | 0),
                  (f[s >> 2] = n),
                  (0 | (o = (o + 1) | 0)) != (0 | r);

              )
                (e >>>= 1), (E >>>= 1);
            }
          } while (0);
          if (A) {
            if (519686845 == (0 | f[A >> 2]))
              return (
                J(A),
                7 & A
                  ? ((f[_ >> 2] = 866),
                    (f[(_ + 4) >> 2] = 2506),
                    (f[(_ + 8) >> 2] = 1232),
                    Ne(l, 812, _),
                    be(l))
                  : Ee(A, 0, 0, 1, 0),
                void (m = d)
              );
            m = d;
          } else m = d;
        },
        _memset: se,
        _sbrk: ve,
        _memcpy: Q,
        stackAlloc: function (e) {
          var r;
          return (m = (15 + (m = ((r = m) + (e |= 0)) | 0)) & -16), 0 | r;
        },
        _crn_get_height: function (e, r) {
          var i, n;
          return (
            (e |= 0),
            (r |= 0),
            (m = ((n = m) + 48) | 0),
            (f[(i = n) >> 2] = 40),
            te(e, r, i),
            (m = n),
            0 | f[(i + 8) >> 2]
          );
        },
        dynCall_vi: function (e, r) {
          (r |= 0), tr[7 & (e |= 0)](0 | r);
        },
        getTempRet0: function () {
          return 0 | v;
        },
        _crn_get_levels: function (e, r) {
          var i, n;
          return (
            (e |= 0),
            (r |= 0),
            (m = ((n = m) + 48) | 0),
            (f[(i = n) >> 2] = 40),
            te(e, r, i),
            (m = n),
            0 | f[(i + 12) >> 2]
          );
        },
        _crn_get_uncompressed_size: function (e, r, i) {
          (e |= 0), (r |= 0), (i |= 0);
          var n,
            t,
            o,
            a,
            u = 0,
            l = 0;
          switch (
            ((m = ((a = m) + 576) | 0),
            (o = (a + 40) | 0),
            (t = (a + 56) | 0),
            (f[(l = a) >> 2] = 40),
            te(e, r, l),
            (n = ((3 + ((0 | f[(l + 4) >> 2]) >>> i)) | 0) >>> 2),
            (r = ((3 + ((0 | f[(l + 8) >> 2]) >>> i)) | 0) >>> 2),
            (e = 0 | f[(4 + (i = (l + 32) | 0)) >> 2]),
            0 | f[i >> 2])
          ) {
            case 0:
            case 9:
            case 10:
              e ? (u = 14) : (e = 8);
              break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
              u = e ? 14 : 13;
              break;
            default:
              u = 14;
          }
          return (
            13 == (0 | u)
              ? (e = 16)
              : 14 == (0 | u) &&
                ((f[o >> 2] = 866),
                (f[(o + 4) >> 2] = 2672),
                (f[(o + 8) >> 2] = 1251),
                Ne(t, 812, o),
                be(t),
                (e = 0)),
            (l = 0 | S(0 | S(r, n), e)),
            (m = a),
            0 | l
          );
        },
        _i64Add: Fe,
        dynCall_iiii: function (e, r, i, n) {
          return (
            (r |= 0),
            (i |= 0),
            (n |= 0),
            0 | ir[7 & (e |= 0)](0 | r, 0 | i, 0 | n)
          );
        },
        _emscripten_get_global_libc: function () {
          return 5072;
        },
        dynCall_ii: function (e, r) {
          return (r |= 0), 0 | or[1 & (e |= 0)](0 | r);
        },
        ___udivdi3: Ve,
        _llvm_bswap_i32: Ge,
        dynCall_viiiii: function (e, r, i, n, t, o) {
          (r |= 0),
            (i |= 0),
            (n |= 0),
            (t |= 0),
            (o |= 0),
            nr[3 & (e |= 0)](0 | r, 0 | i, 0 | n, 0 | t, 0 | o);
        },
        ___cxa_can_catch: function (e, r, i) {
          var n, t;
          return (
            (e |= 0),
            (r |= 0),
            (i |= 0),
            (m = ((t = m) + 16) | 0),
            (f[(n = t) >> 2] = f[i >> 2]),
            (e = 0 | ir[7 & f[(16 + (0 | f[e >> 2])) >> 2]](e, r, n)) &&
              (f[i >> 2] = f[n >> 2]),
            (m = t),
            (1 & e) | 0
          );
        },
        _free: G,
        runPostSets: function () {},
        dynCall_viiiiii: function (e, r, i, n, t, o, a) {
          (r |= 0),
            (i |= 0),
            (n |= 0),
            (t |= 0),
            (o |= 0),
            (a |= 0),
            fr[3 & (e |= 0)](0 | r, 0 | i, 0 | n, 0 | t, 0 | o, 0 | a);
        },
        establishStackSpace: function (e, r) {
          (m = e |= 0), 0;
        },
        ___uremdi3: Oe,
        ___cxa_is_pointer_type: function (e) {
          return (1 & (e = (e |= 0) ? 0 != (0 | re(e, 32, 88, 0)) : 0)) | 0;
        },
        stackRestore: function (e) {
          m = e |= 0;
        },
        _malloc: B,
        _emscripten_replace_memory: function (e) {
          return !(
            16777215 & A(e) ||
            A(e) <= 16777215 ||
            2147483648 < A(e) ||
            ((t = new n(e)),
            (a = new o(e)),
            (f = new u(e)),
            (c = new l(e)),
            (_ = new s(e)),
            new d(e),
            new E(e),
            (T = new M(e)),
            (i = e),
            0)
          );
        },
        dynCall_v: function (e) {
          ur[3 & (e |= 0)]();
        },
        _crn_get_width: function (e, r) {
          var i, n;
          return (
            (e |= 0),
            (r |= 0),
            (m = ((n = m) + 48) | 0),
            (f[(i = n) >> 2] = 40),
            te(e, r, i),
            (m = n),
            0 | f[(i + 4) >> 2]
          );
        },
        _crn_get_dxt_format: function (e, r) {
          var i, n;
          return (
            (e |= 0),
            (r |= 0),
            (m = ((n = m) + 48) | 0),
            (f[(i = n) >> 2] = 40),
            te(e, r, i),
            (m = n),
            0 | f[(i + 32) >> 2]
          );
        },
      };
    })(Module.asmGlobalArg, Module.asmLibraryArg, buffer),
    stackSave = (Module.stackSave = asm.stackSave),
    getTempRet0 = (Module.getTempRet0 = asm.getTempRet0),
    _memset = (Module._memset = asm._memset),
    setThrew = (Module.setThrew = asm.setThrew),
    _bitshift64Lshr = (Module._bitshift64Lshr = asm._bitshift64Lshr),
    _bitshift64Shl = (Module._bitshift64Shl = asm._bitshift64Shl),
    setTempRet0 = (Module.setTempRet0 = asm.setTempRet0),
    _crn_decompress = (Module._crn_decompress = asm._crn_decompress),
    _crn_get_bytes_per_block = (Module._crn_get_bytes_per_block =
      asm._crn_get_bytes_per_block),
    _sbrk = (Module._sbrk = asm._sbrk),
    _memcpy = (Module._memcpy = asm._memcpy),
    stackAlloc = (Module.stackAlloc = asm.stackAlloc),
    _crn_get_height = (Module._crn_get_height = asm._crn_get_height),
    _i64Subtract = (Module._i64Subtract = asm._i64Subtract),
    _crn_get_levels = (Module._crn_get_levels = asm._crn_get_levels),
    _crn_get_uncompressed_size = (Module._crn_get_uncompressed_size =
      asm._crn_get_uncompressed_size),
    _i64Add = (Module._i64Add = asm._i64Add),
    _emscripten_get_global_libc = (Module._emscripten_get_global_libc =
      asm._emscripten_get_global_libc),
    ___udivdi3 = (Module.___udivdi3 = asm.___udivdi3),
    _llvm_bswap_i32 = (Module._llvm_bswap_i32 = asm._llvm_bswap_i32),
    ___cxa_can_catch = (Module.___cxa_can_catch = asm.___cxa_can_catch),
    _free = (Module._free = asm._free),
    runPostSets = (Module.runPostSets = asm.runPostSets),
    establishStackSpace = (Module.establishStackSpace =
      asm.establishStackSpace),
    ___uremdi3 = (Module.___uremdi3 = asm.___uremdi3),
    ___cxa_is_pointer_type = (Module.___cxa_is_pointer_type =
      asm.___cxa_is_pointer_type),
    stackRestore = (Module.stackRestore = asm.stackRestore),
    _malloc = (Module._malloc = asm._malloc),
    _emscripten_replace_memory = (Module._emscripten_replace_memory =
      asm._emscripten_replace_memory),
    _crn_get_width = (Module._crn_get_width = asm._crn_get_width),
    _crn_get_dxt_format = (Module._crn_get_dxt_format =
      asm._crn_get_dxt_format),
    dynCall_iiii = (Module.dynCall_iiii = asm.dynCall_iiii),
    dynCall_viiiii = (Module.dynCall_viiiii = asm.dynCall_viiiii),
    dynCall_vi = (Module.dynCall_vi = asm.dynCall_vi),
    dynCall_ii = (Module.dynCall_ii = asm.dynCall_ii),
    dynCall_viii = (Module.dynCall_viii = asm.dynCall_viii),
    dynCall_v = (Module.dynCall_v = asm.dynCall_v),
    dynCall_viiiiii = (Module.dynCall_viiiiii = asm.dynCall_viiiiii),
    dynCall_viiii = (Module.dynCall_viiii = asm.dynCall_viiii),
    initialStackTop;
  function ExitStatus(e) {
    (this.name = 'ExitStatus'),
      (this.message = 'Program terminated with exit(' + e + ')'),
      (this.status = e);
  }
  function run(e) {
    function r() {
      Module.calledRun ||
        ((Module.calledRun = !0),
        ABORT ||
          (ensureInitRuntime(),
          preMain(),
          Module.onRuntimeInitialized && Module.onRuntimeInitialized(),
          Module._main && shouldRunNow && Module.callMain(e),
          postRun()));
    }
    (e = e || Module.arguments),
      0 < runDependencies ||
        (preRun(),
        0 < runDependencies ||
          Module.calledRun ||
          (Module.setStatus
            ? (Module.setStatus('Running...'),
              setTimeout(function () {
                setTimeout(function () {
                  Module.setStatus('');
                }, 1),
                  r();
              }, 1))
            : r()));
  }
  function exit(e, r) {
    (r && Module.noExitRuntime) ||
      (Module.noExitRuntime ||
        ((ABORT = !0),
        (STACKTOP = initialStackTop),
        exitRuntime(),
        Module.onExit && Module.onExit(e)),
      ENVIRONMENT_IS_NODE && process.exit(e),
      Module.quit(e, new ExitStatus(e)));
  }
  (Runtime.stackAlloc = Module.stackAlloc),
    (Runtime.stackSave = Module.stackSave),
    (Runtime.stackRestore = Module.stackRestore),
    (Runtime.establishStackSpace = Module.establishStackSpace),
    (Runtime.setTempRet0 = Module.setTempRet0),
    (Runtime.getTempRet0 = Module.getTempRet0),
    (Module.asm = asm),
    (ExitStatus.prototype = new Error()),
    (ExitStatus.prototype.constructor = ExitStatus),
    (dependenciesFulfilled = function e() {
      Module.calledRun || run(),
        Module.calledRun || (dependenciesFulfilled = e);
    }),
    (Module.callMain = Module.callMain =
      function (e) {
        (e = e || []), ensureInitRuntime();
        var r = e.length + 1;
        function i() {
          for (var e = 0; e < 3; e++) n.push(0);
        }
        var n = [
          allocate(intArrayFromString(Module.thisProgram), 'i8', ALLOC_NORMAL),
        ];
        i();
        for (var t = 0; t < r - 1; t += 1)
          n.push(allocate(intArrayFromString(e[t]), 'i8', ALLOC_NORMAL)), i();
        n.push(0), (n = allocate(n, 'i32', ALLOC_NORMAL));
        try {
          exit(Module._main(r, n, 0), !0);
        } catch (e) {
          if (e instanceof ExitStatus) return;
          if ('SimulateInfiniteLoop' == e)
            return void (Module.noExitRuntime = !0);
          var o = e;
          e && 'object' == typeof e && e.stack && (o = [e, e.stack]),
            Module.printErr('exception thrown: ' + o),
            Module.quit(1, e);
        }
      }),
    (Module.run = Module.run = run),
    (Module.exit = Module.exit = exit);
  var abortDecorators = [];
  function abort(e) {
    Module.onAbort && Module.onAbort(e),
      (e =
        void 0 !== e
          ? (Module.print(e), Module.printErr(e), JSON.stringify(e))
          : ''),
      (ABORT = !0);
    var r =
      'abort(' +
      e +
      ') at ' +
      stackTrace() +
      '\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.';
    throw (
      (abortDecorators &&
        abortDecorators.forEach(function (i) {
          r = i(r, e);
        }),
      r)
    );
  }
  if (((Module.abort = Module.abort = abort), Module.preInit))
    for (
      'function' == typeof Module.preInit &&
      (Module.preInit = [Module.preInit]);
      0 < Module.preInit.length;

    )
      Module.preInit.pop()();
  var shouldRunNow = !0;
  Module.noInitialRun && (shouldRunNow = !1),
    (Module.noExitRuntime = !0),
    run();
  var crunch = Module,
    CRN_FORMAT = {
      cCRNFmtInvalid: -1,
      cCRNFmtDXT1: 0,
      cCRNFmtDXT3: 1,
      cCRNFmtDXT5: 2,
    },
    DXT_FORMAT_MAP = {},
    dst,
    dxtData;
  (DXT_FORMAT_MAP[CRN_FORMAT.cCRNFmtDXT1] = PixelFormat.PixelFormat.RGB_DXT1),
    (DXT_FORMAT_MAP[CRN_FORMAT.cCRNFmtDXT3] =
      PixelFormat.PixelFormat.RGBA_DXT3),
    (DXT_FORMAT_MAP[CRN_FORMAT.cCRNFmtDXT5] =
      PixelFormat.PixelFormat.RGBA_DXT5);
  var cachedDstSize = 0;
  function arrayBufferCopy(e, r, i, n) {
    var t,
      o = i / 4,
      a = n % 4,
      u = new Uint32Array(e.buffer, 0, (n - a) / 4),
      f = new Uint32Array(r.buffer);
    for (t = 0; t < u.length; t++) f[o + t] = u[t];
    for (t = n - a; t < n; t++) r[i + t] = e[t];
  }
  function transcodeCRNToDXT(e, r) {
    var i = e.byteLength,
      n = new Uint8Array(e),
      t = crunch._malloc(i);
    arrayBufferCopy(n, crunch.HEAPU8, t, i);
    var o = crunch._crn_get_dxt_format(t, i),
      a = DXT_FORMAT_MAP[o];
    if (!when.defined(a))
      throw new RuntimeError.RuntimeError('Unsupported compressed format.');
    var u,
      f = crunch._crn_get_levels(t, i),
      l = crunch._crn_get_width(t, i),
      c = crunch._crn_get_height(t, i),
      s = 0;
    for (u = 0; u < f; ++u)
      s += PixelFormat.PixelFormat.compressedTextureSizeInBytes(
        a,
        l >> u,
        c >> u,
      );
    cachedDstSize < s &&
      (when.defined(dst) && crunch._free(dst),
      (dst = crunch._malloc(s)),
      (dxtData = new Uint8Array(crunch.HEAPU8.buffer, dst, s)),
      (cachedDstSize = s)),
      crunch._crn_decompress(t, i, dst, s, 0, f),
      crunch._free(t);
    var _ = PixelFormat.PixelFormat.compressedTextureSizeInBytes(a, l, c),
      d = dxtData.subarray(0, _),
      E = new Uint8Array(_);
    return (
      E.set(d, 0),
      r.push(E.buffer),
      new CompressedTextureBuffer.CompressedTextureBuffer(a, l, c, E)
    );
  }
  var transcodeCRNToDXTprevious = createTaskProcessorWorker(transcodeCRNToDXT);
  return transcodeCRNToDXTprevious;
});
