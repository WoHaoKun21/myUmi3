define(['exports'], function (e) {
  if ('undefined' != typeof WebAssembly && 'object' != typeof window) {
    var t,
      n = void 0 !== n ? n : {},
      r = {};
    for (t in n) n.hasOwnProperty(t) && (r[t] = n[t]);
    (n.arguments = []),
      (n.thisProgram = './this.program'),
      (n.quit = function (e, t) {
        throw t;
      }),
      (n.preRun = []);
    var i,
      o,
      a = !(n.postRun = []),
      s = !1;
    if (
      ((a = 'object' == typeof window),
      (s = 'function' == typeof importScripts),
      (i =
        'object' == typeof process && 'function' == typeof require && !a && !s),
      (o = !a && !i && !s),
      n.ENVIRONMENT)
    )
      throw new Error(
        'Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)',
      );
    var u,
      l,
      d = '';
    if (i)
      (d = __dirname + '/'),
        (n.read = function (e, t) {
          var n;
          return (
            u || (u = require('fs')),
            l || (l = require('path')),
            (e = l.normalize(e)),
            (n = u.readFileSync(e)),
            t ? n : n.toString()
          );
        }),
        (n.readBinary = function (e) {
          var t = n.read(e, !0);
          return t.buffer || (t = new Uint8Array(t)), m(t.buffer), t;
        }),
        1 < process.argv.length &&
          (n.thisProgram = process.argv[1].replace(/\\/g, '/')),
        (n.arguments = process.argv.slice(2)),
        'undefined' != typeof module && (module.exports = n),
        process.on('uncaughtException', function (e) {
          if (!(e instanceof Re)) throw e;
        }),
        process.on('unhandledRejection', Ae),
        (n.quit = function (e) {
          process.exit(e);
        }),
        (n.inspect = function () {
          return '[Emscripten Module object]';
        });
    else if (o)
      'undefined' != typeof read &&
        (n.read = function (e) {
          return read(e);
        }),
        (n.readBinary = function (e) {
          var t;
          return 'function' == typeof readbuffer
            ? new Uint8Array(readbuffer(e))
            : (m('object' == typeof (t = read(e, 'binary'))), t);
        }),
        'undefined' != typeof scriptArgs
          ? (n.arguments = scriptArgs)
          : void 0 !== arguments && (n.arguments = arguments),
        'function' == typeof quit &&
          (n.quit = function (e) {
            quit(e);
          });
    else {
      if (!a && !s) throw new Error('environment detection error');
      s
        ? (d = self.location.href)
        : document.currentScript && (d = document.currentScript.src),
        (d =
          0 !== d.indexOf('blob:')
            ? d.substr(0, d.indexOf('/Workers') + 1)
            : ''),
        (n.read = function (e) {
          var t = new XMLHttpRequest();
          return t.open('GET', e, !1), t.send(null), t.responseText;
        }),
        s &&
          (n.readBinary = function (e) {
            var t = new XMLHttpRequest();
            return (
              t.open('GET', e, !1),
              (t.responseType = 'arraybuffer'),
              t.send(null),
              new Uint8Array(t.response)
            );
          }),
        (n.readAsync = function (e, t, n) {
          var r = new XMLHttpRequest();
          r.open('GET', e, !0),
            (r.responseType = 'arraybuffer'),
            (r.onload = function () {
              200 == r.status || (0 == r.status && r.response)
                ? t(r.response)
                : n();
            }),
            (r.onerror = n),
            r.send(null);
        }),
        (n.setWindowTitle = function (e) {
          document.title = e;
        });
    }
    var c =
        n.print ||
        ('undefined' != typeof console
          ? console.log.bind(console)
          : 'undefined' != typeof print
          ? print
          : null),
      f =
        n.printErr ||
        ('undefined' != typeof printErr
          ? printErr
          : ('undefined' != typeof console && console.warn.bind(console)) || c);
    for (t in r) r.hasOwnProperty(t) && (n[t] = r[t]);
    function E(e) {
      E.shown || (E.shown = {}), E.shown[e] || (E.shown[e] = 1);
    }
    m(
      (r = void 0) === n.memoryInitializerPrefixURL,
      'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead',
    ),
      m(
        void 0 === n.pthreadMainPrefixURL,
        'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead',
      ),
      m(
        void 0 === n.cdInitializerPrefixURL,
        'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead',
      ),
      m(
        void 0 === n.filePackagePrefixURL,
        'Module.filePackagePrefixURL option was removed, use Module.locateFile instead',
      ),
      (ye =
        me =
        he =
          function () {
            Ae(
              'cannot use the stack before compiled code is ready to run, and has provided stack access',
            );
          });
    var T,
      _ = {
        'f64-rem': function (e, t) {
          return e % t;
        },
        debugger: function () {},
      },
      p = (new Array(0), 0);
    'object' != typeof WebAssembly &&
      Ae(
        'No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.',
      );
    var h = !1;
    function m(e, t) {
      e || Ae('Assertion failed: ' + t);
    }
    function y(e, t, r, i, o) {
      var a,
        s,
        u = {
          string: function (e) {
            var t,
              n,
              r,
              i = 0;
            if (null != e && 0 !== e) {
              var o = 1 + (e.length << 2);
              (t = e),
                (n = i = he(o)),
                m(
                  'number' == typeof (r = o),
                  'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!',
                ),
                (function (e, t, n, r) {
                  if (0 < r) {
                    for (var i = n + r - 1, o = 0; o < e.length; ++o) {
                      var a = e.charCodeAt(o);
                      if (55296 <= a && a <= 57343)
                        a =
                          (65536 + ((1023 & a) << 10)) |
                          (1023 & e.charCodeAt(++o));
                      if (a <= 127) {
                        if (i <= n) break;
                        t[n++] = a;
                      } else if (a <= 2047) {
                        if (i <= n + 1) break;
                        (t[n++] = 192 | (a >> 6)), (t[n++] = 128 | (63 & a));
                      } else if (a <= 65535) {
                        if (i <= n + 2) break;
                        (t[n++] = 224 | (a >> 12)),
                          (t[n++] = 128 | ((a >> 6) & 63)),
                          (t[n++] = 128 | (63 & a));
                      } else {
                        if (i <= n + 3) break;
                        2097152 <= a &&
                          E(
                            'Invalid Unicode code point 0x' +
                              a.toString(16) +
                              ' encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).',
                          ),
                          (t[n++] = 240 | (a >> 18)),
                          (t[n++] = 128 | ((a >> 12) & 63)),
                          (t[n++] = 128 | ((a >> 6) & 63)),
                          (t[n++] = 128 | (63 & a));
                      }
                    }
                    t[n] = 0;
                  }
                })(t, g, n, r);
            }
            return i;
          },
          array: function (e) {
            var t,
              n,
              r = he(e.length);
            return (
              (n = r),
              m(
                0 <= (t = e).length,
                'writeArrayToMemory array must have a length (should be an array or typed array)',
              ),
              w.set(t, n),
              r
            );
          },
        },
        l =
          (m(
            (s = n['_' + (a = e)]),
            'Cannot call unknown function ' + a + ', make sure it is exported',
          ),
          s),
        d = [],
        c = 0;
      if ((m('array' !== t, 'Return type should not be "array".'), i))
        for (var f = 0; f < i.length; f++) {
          var T = u[r[f]];
          d[f] = T ? (0 === c && (c = ye()), T(i[f])) : i[f];
        }
      var _,
        p = l.apply(null, d);
      return (
        (_ = p),
        (p = 'string' === t ? I(_) : 'boolean' === t ? Boolean(_) : _),
        0 !== c && me(c),
        p
      );
    }
    var R,
      w,
      g,
      A,
      O,
      M,
      S,
      b,
      F = 'undefined' != typeof TextDecoder ? new TextDecoder('utf8') : void 0;
    function v(e, t, n) {
      for (var r = t + n, i = t; e[i] && !(r <= i); ) ++i;
      if (16 < i - t && e.subarray && F) return F.decode(e.subarray(t, i));
      for (var o = ''; t < i; ) {
        var a = e[t++];
        if (128 & a) {
          var s = 63 & e[t++];
          if (192 != (224 & a)) {
            var u = 63 & e[t++];
            if (
              (a =
                224 == (240 & a)
                  ? ((15 & a) << 12) | (s << 6) | u
                  : (240 != (248 & a) &&
                      E(
                        'Invalid UTF-8 leading byte 0x' +
                          a.toString(16) +
                          ' encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!',
                      ),
                    ((7 & a) << 18) | (s << 12) | (u << 6) | (63 & e[t++]))) <
              65536
            )
              o += String.fromCharCode(a);
            else {
              var l = a - 65536;
              o += String.fromCharCode(55296 | (l >> 10), 56320 | (1023 & l));
            }
          } else o += String.fromCharCode(((31 & a) << 6) | s);
        } else o += String.fromCharCode(a);
      }
      return o;
    }
    function I(e, t) {
      return e ? v(g, e, t) : '';
    }
    function N() {
      var e = (function () {
        var e = new Error();
        if (!e.stack) {
          try {
            throw new Error(0);
          } catch (t) {
            e = t;
          }
          if (!e.stack) return '(no stack trace available)';
        }
        return e.stack.toString();
      })();
      return (
        n.extraStackTrace && (e += '\n' + n.extraStackTrace()),
        e.replace(/__Z[\w\d_]+/g, function (e) {
          return e === e ? e : e + ' [' + e + ']';
        })
      );
    }
    function x(e, t) {
      return 0 < e % t && (e += t - (e % t)), e;
    }
    function D() {
      (n.HEAP8 = w = new Int8Array(R)),
        (n.HEAP16 = A = new Int16Array(R)),
        (n.HEAP32 = O = new Int32Array(R)),
        (n.HEAPU8 = g = new Uint8Array(R)),
        (n.HEAPU16 = new Uint16Array(R)),
        (n.HEAPU32 = M = new Uint32Array(R)),
        (n.HEAPF32 = S = new Float32Array(R)),
        (n.HEAPF64 = b = new Float64Array(R));
    }
    'undefined' != typeof TextDecoder && new TextDecoder('utf-16le');
    var U = 5257984;
    m(!0, 'stack must start aligned'), m(!0, 'heap must start aligned');
    var X = 5242880;
    n.TOTAL_STACK &&
      m(
        X === n.TOTAL_STACK,
        'the stack size can no longer be determined at runtime',
      );
    var P = n.TOTAL_MEMORY || 16777216;
    function L() {
      (34821223 == M[(U >> 2) - 1] && 2310721022 == M[(U >> 2) - 2]) ||
        Ae(
          'Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x' +
            M[(U >> 2) - 2].toString(16) +
            ' ' +
            M[(U >> 2) - 1].toString(16),
        ),
        1668509029 !== O[0] &&
          Ae(
            'Runtime error: The application has corrupted its heap memory area (address zero)!',
          );
    }
    if (
      (P < X &&
        f(
          'TOTAL_MEMORY should be larger than TOTAL_STACK, was ' +
            P +
            '! (TOTAL_STACK=' +
            X +
            ')',
        ),
      m(
        'undefined' != typeof Int32Array &&
          'undefined' != typeof Float64Array &&
          void 0 !== Int32Array.prototype.subarray &&
          void 0 !== Int32Array.prototype.set,
        'JS engine does not provide full typed array support',
      ),
      n.buffer
        ? m(
            (R = n.buffer).byteLength === P,
            'provided buffer should be ' +
              P +
              ' bytes, but it is ' +
              R.byteLength,
          )
        : m(
            (R =
              'object' == typeof WebAssembly &&
              'function' == typeof WebAssembly.Memory
                ? (m(P % 65536 == 0),
                  (T = new WebAssembly.Memory({ initial: P / 65536 })).buffer)
                : new ArrayBuffer(P)).byteLength === P,
          ),
      D(),
      (O[3768] = 5257984),
      (O[0] = 1668509029),
      (A[1] = 25459),
      115 !== g[2] || 99 !== g[3])
    )
      throw 'Runtime error: expected the system to be little-endian!';
    function k(e) {
      for (; 0 < e.length; ) {
        var t = e.shift();
        if ('function' != typeof t) {
          var r = t.func;
          'number' == typeof r
            ? void 0 === t.arg
              ? n.dynCall_v(r)
              : n.dynCall_vi(r, t.arg)
            : r(void 0 === t.arg ? null : t.arg);
        } else t();
      }
    }
    var H = [],
      C = [],
      Q = [],
      B = [],
      Y = !1;
    m(
      Math.imul,
      'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill',
    ),
      m(
        Math.fround,
        'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill',
      ),
      m(
        Math.clz32,
        'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill',
      ),
      m(
        Math.trunc,
        'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill',
      );
    var W = 0,
      z = null,
      j = null,
      V = {};
    (n.preloadedImages = {}), (n.preloadedAudios = {});
    var G = {
      error: function () {
        Ae(
          'Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1',
        );
      },
      init: function () {
        G.error();
      },
      createDataFile: function () {
        G.error();
      },
      createPreloadedFile: function () {
        G.error();
      },
      createLazyFile: function () {
        G.error();
      },
      open: function () {
        G.error();
      },
      mkdev: function () {
        G.error();
      },
      registerDevice: function () {
        G.error();
      },
      analyzePath: function () {
        G.error();
      },
      loadFilesFromDB: function () {
        G.error();
      },
      ErrnoError: function () {
        G.error();
      },
    };
    (n.FS_createDataFile = G.createDataFile),
      (n.FS_createPreloadedFile = G.createPreloadedFile);
    var q = 'data:application/octet-stream;base64,';
    function J(e) {
      return String.prototype.startsWith ? e.startsWith(q) : 0 === e.indexOf(q);
    }
    var K = 'ThirdParty/unzip.wasm';
    function Z() {
      try {
        if (n.wasmBinary) return new Uint8Array(n.wasmBinary);
        if (n.readBinary) return n.readBinary(K);
        throw 'both async and sync fetching of the wasm failed';
      } catch (e) {
        Ae(e);
      }
    }
    function $(e) {
      var t,
        r = {
          env: e,
          global: { NaN: NaN, Infinity: 1 / 0 },
          'global.Math': Math,
          asm2wasm: _,
        };
      function i(e, t) {
        var r = e.exports;
        (n.asm = r),
          (function (e) {
            if (
              (W--,
              n.monitorRunDependencies && n.monitorRunDependencies(W),
              m(V[e]),
              delete V[e],
              0 == W && (null !== z && (clearInterval(z), (z = null)), j))
            ) {
              var t = j;
              (j = null), t();
            }
          })('wasm-instantiate');
      }
      (t = 'wasm-instantiate'),
        W++,
        n.monitorRunDependencies && n.monitorRunDependencies(W),
        m(!V[t]),
        (V[t] = 1),
        null === z &&
          'undefined' != typeof setInterval &&
          (z = setInterval(function () {
            if (h) return clearInterval(z), void (z = null);
          }, 1e4));
      var o = n;
      function u(e) {
        m(
          n === o,
          'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?',
        ),
          (o = null),
          i(e.instance);
      }
      function l(e) {
        return (
          n.wasmBinary || (!a && !s) || 'function' != typeof fetch
            ? new Promise(function (e, t) {
                e(Z());
              })
            : fetch(K, { credentials: 'same-origin' })
                .then(function (e) {
                  if (!e.ok)
                    throw "failed to load wasm binary file at '" + K + "'";
                  return e.arrayBuffer();
                })
                .catch(function () {
                  return Z();
                })
        )
          .then(function (e) {
            return WebAssembly.instantiate(e, r);
          })
          .then(e, function (e) {});
      }
      if (n.instantiateWasm)
        try {
          return n.instantiateWasm(r, i);
        } catch (e) {
          return !1;
        }
      return (
        (function () {
          if (
            n.wasmBinary ||
            'function' != typeof WebAssembly.instantiateStreaming ||
            J(K) ||
            'function' != typeof fetch
          )
            return l(u);
          fetch(K, { credentials: 'same-origin' }).then(function (e) {
            return WebAssembly.instantiateStreaming(e, r).then(u, function (e) {
              l(u);
            });
          });
        })(),
        {}
      );
    }
    J(K) || ((Oe = K), (K = n.locateFile ? n.locateFile(Oe, d) : d + Oe)),
      (n.asm = function (e, t, n) {
        (t.memory = T),
          (t.table = new WebAssembly.Table({
            initial: 22,
            maximum: 22,
            element: 'anyfunc',
          })),
          (t.__memory_base = 1024),
          (t.__table_base = 0);
        var r = $(t);
        return m(r, 'binaryen setup failed (no wasm support?)'), r;
      }),
      m(!0);
    var ee = {
      buffers: [null, [], []],
      printChar: function (e, t) {
        var n = ee.buffers[e];
        m(n),
          0 === t || 10 === t
            ? ((1 === e ? c : f)(v(n, 0)), (n.length = 0))
            : n.push(t);
      },
      varargs: 0,
      get: function (e) {
        return (ee.varargs += 4), O[(ee.varargs - 4) >> 2];
      },
      getStr: function () {
        return I(ee.get());
      },
      get64: function () {
        var e = ee.get(),
          t = ee.get();
        return m(0 <= e ? 0 === t : -1 === t), e;
      },
      getZero: function () {
        m(0 === ee.get());
      },
    };
    function te() {
      return w.length;
    }
    function ne(e) {
      e = x(e, 65536);
      var t = R.byteLength;
      try {
        return -1 !== T.grow((e - t) / 65536) && ((R = T.buffer), !0);
      } catch (n) {
        return (
          console.error(
            'emscripten_realloc_buffer: Attempted to grow from ' +
              t +
              ' bytes to ' +
              e +
              ' bytes, but got error: ' +
              n,
          ),
          !1
        );
      }
    }
    var re = {
        abort: Ae,
        setTempRet0: function (e) {
          p = e;
        },
        getTempRet0: function () {
          return p;
        },
        abortStackOverflow: function (e) {
          Ae(
            'Stack overflow! Attempted to allocate ' +
              e +
              ' bytes on the stack, but stack has only ' +
              (U - ye() + e) +
              ' bytes available!',
          );
        },
        nullFunc_ii: function (e) {
          f(
            "Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
          ),
            f('Build with ASSERTIONS=2 for more info.'),
            Ae(e);
        },
        nullFunc_iiii: function (e) {
          f(
            "Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
          ),
            f('Build with ASSERTIONS=2 for more info.'),
            Ae(e);
        },
        nullFunc_jiji: function (e) {
          f(
            "Invalid function pointer called with signature 'jiji'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
          ),
            f('Build with ASSERTIONS=2 for more info.'),
            Ae(e);
        },
        nullFunc_vii: function (e) {
          f(
            "Invalid function pointer called with signature 'vii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
          ),
            f('Build with ASSERTIONS=2 for more info.'),
            Ae(e);
        },
        ___lock: function () {},
        ___setErrNo: function (e) {
          return (
            n.___errno_location
              ? (O[n.___errno_location() >> 2] = e)
              : f('failed to set errno from JS'),
            e
          );
        },
        ___syscall140: function (e, t) {
          ee.varargs = t;
          try {
            return (
              ee.getStreamFromFD(),
              ee.get(),
              ee.get(),
              ee.get(),
              ee.get(),
              Ae(
                'it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM',
              ),
              0
            );
          } catch (e) {
            return (
              (void 0 !== G && e instanceof G.ErrnoError) || Ae(e), -e.errno
            );
          }
        },
        ___syscall146: function (e, t) {
          ee.varargs = t;
          try {
            for (
              var n = ee.get(), r = ee.get(), i = ee.get(), o = 0, a = 0;
              a < i;
              a++
            ) {
              for (
                var s = O[(r + 8 * a) >> 2],
                  u = O[(r + (8 * a + 4)) >> 2],
                  l = 0;
                l < u;
                l++
              )
                ee.printChar(n, g[s + l]);
              o += u;
            }
            return o;
          } catch (e) {
            return (
              (void 0 !== G && e instanceof G.ErrnoError) || Ae(e), -e.errno
            );
          }
        },
        ___syscall54: function (e, t) {
          ee.varargs = t;
          try {
            return 0;
          } catch (e) {
            return (
              (void 0 !== G && e instanceof G.ErrnoError) || Ae(e), -e.errno
            );
          }
        },
        ___syscall6: function (e, t) {
          ee.varargs = t;
          try {
            return (
              ee.getStreamFromFD(),
              Ae(
                'it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM',
              ),
              0
            );
          } catch (e) {
            return (
              (void 0 !== G && e instanceof G.ErrnoError) || Ae(e), -e.errno
            );
          }
        },
        ___unlock: function () {},
        _emscripten_get_heap_size: te,
        _emscripten_memcpy_big: function (e, t, n) {
          g.set(g.subarray(t, t + n), e);
        },
        _emscripten_resize_heap: function (e) {
          var t = te();
          m(t < e);
          var n = 2147418112;
          if (n < e)
            return (
              f(
                'Cannot enlarge memory, asked to go up to ' +
                  e +
                  ' bytes, but the limit is ' +
                  n +
                  ' bytes!',
              ),
              !1
            );
          for (var r = Math.max(t, 16777216); r < e; )
            (r =
              r <= 536870912
                ? x(2 * r, 65536)
                : Math.min(x((3 * r + 2147483648) / 4, 65536), n)) === t &&
              E(
                'Cannot ask for more memory since we reached the practical limit in browsers (which is just below 2GB), so the request would have failed. Requesting only ' +
                  w.length,
              );
          return ne(r)
            ? (D(), !0)
            : (f(
                'Failed to grow the heap from ' +
                  t +
                  ' bytes to ' +
                  r +
                  ' bytes, not enough memory!',
              ),
              !1);
        },
        abortOnCannotGrowMemory: function (e) {
          Ae(
            'Cannot enlarge memory arrays to size ' +
              e +
              ' bytes (OOM). Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' +
              w.length +
              ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ',
          );
        },
        emscripten_realloc_buffer: ne,
        flush_NO_FILESYSTEM: function () {
          var e = n._fflush;
          e && e(0);
          var t = ee.buffers;
          t[1].length && ee.printChar(1, 10),
            t[2].length && ee.printChar(2, 10);
        },
        tempDoublePtr: 15088,
        DYNAMICTOP_PTR: 15072,
      },
      ie = n.asm({}, re, R),
      oe = ie.___errno_location;
    ie.___errno_location = function () {
      return (
        m(
          Y,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        m(
          !0,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        oe.apply(null, arguments)
      );
    };
    var ae = ie._fflush;
    ie._fflush = function () {
      return (
        m(
          Y,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        m(
          !0,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        ae.apply(null, arguments)
      );
    };
    var se = ie._free;
    ie._free = function () {
      return (
        m(
          Y,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        m(
          !0,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        se.apply(null, arguments)
      );
    };
    var ue = ie._freePointer;
    ie._freePointer = function () {
      return (
        m(
          Y,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        m(
          !0,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        ue.apply(null, arguments)
      );
    };
    var le = ie._llvm_bswap_i32;
    ie._llvm_bswap_i32 = function () {
      return (
        m(
          Y,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        m(
          !0,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        le.apply(null, arguments)
      );
    };
    var de = ie._malloc;
    ie._malloc = function () {
      return (
        m(
          Y,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        m(
          !0,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        de.apply(null, arguments)
      );
    };
    var ce = ie._sbrk;
    ie._sbrk = function () {
      return (
        m(
          Y,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        m(
          !0,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        ce.apply(null, arguments)
      );
    };
    var fe = ie._unzip;
    ie._unzip = function () {
      return (
        m(
          Y,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        m(
          !0,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        fe.apply(null, arguments)
      );
    };
    var Ee = ie.establishStackSpace;
    ie.establishStackSpace = function () {
      return (
        m(
          Y,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        m(
          !0,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        Ee.apply(null, arguments)
      );
    };
    var Te = ie.stackAlloc;
    ie.stackAlloc = function () {
      return (
        m(
          Y,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        m(
          !0,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        Te.apply(null, arguments)
      );
    };
    var _e = ie.stackRestore;
    ie.stackRestore = function () {
      return (
        m(
          Y,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        m(
          !0,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        _e.apply(null, arguments)
      );
    };
    var pe = ie.stackSave;
    (ie.stackSave = function () {
      return (
        m(
          Y,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        m(
          !0,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        pe.apply(null, arguments)
      );
    }),
      (n.asm = ie),
      (n.___errno_location = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm.___errno_location.apply(null, arguments)
        );
      }),
      (n._emscripten_replace_memory = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm._emscripten_replace_memory.apply(null, arguments)
        );
      }),
      (n._fflush = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm._fflush.apply(null, arguments)
        );
      }),
      (n._free = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm._free.apply(null, arguments)
        );
      }),
      (n._freePointer = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm._freePointer.apply(null, arguments)
        );
      }),
      (n._llvm_bswap_i32 = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm._llvm_bswap_i32.apply(null, arguments)
        );
      }),
      (n._malloc = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm._malloc.apply(null, arguments)
        );
      }),
      (n._memcpy = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm._memcpy.apply(null, arguments)
        );
      }),
      (n._memset = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm._memset.apply(null, arguments)
        );
      }),
      (n._sbrk = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm._sbrk.apply(null, arguments)
        );
      }),
      (n._unzip = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm._unzip.apply(null, arguments)
        );
      }),
      (n.establishStackSpace = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm.establishStackSpace.apply(null, arguments)
        );
      });
    var he = (n.stackAlloc = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm.stackAlloc.apply(null, arguments)
        );
      }),
      me = (n.stackRestore = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm.stackRestore.apply(null, arguments)
        );
      }),
      ye = (n.stackSave = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm.stackSave.apply(null, arguments)
        );
      });
    function Re(e) {
      (this.name = 'ExitStatus'),
        (this.message = 'Program terminated with exit(' + e + ')'),
        (this.status = e);
    }
    function we(e) {
      function t() {
        n.calledRun ||
          ((n.calledRun = !0),
          h ||
            (L(),
            Y || ((Y = !0), k(C)),
            L(),
            k(Q),
            n.onRuntimeInitialized && n.onRuntimeInitialized(),
            m(
              !n._main,
              'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]',
            ),
            (function () {
              if ((L(), n.postRun))
                for (
                  'function' == typeof n.postRun && (n.postRun = [n.postRun]);
                  n.postRun.length;

                )
                  (e = n.postRun.shift()), B.unshift(e);
              var e;
              k(B);
            })()));
      }
      (e = e || n.arguments),
        0 < W ||
          (m(0 == (3 & U)),
          (M[(U >> 2) - 1] = 34821223),
          (M[(U >> 2) - 2] = 2310721022),
          (function () {
            if (n.preRun)
              for (
                'function' == typeof n.preRun && (n.preRun = [n.preRun]);
                n.preRun.length;

              )
                (e = n.preRun.shift()), H.unshift(e);
            var e;
            k(H);
          })(),
          0 < W ||
            n.calledRun ||
            (n.setStatus
              ? (n.setStatus('Running...'),
                setTimeout(function () {
                  setTimeout(function () {
                    n.setStatus('');
                  }, 1),
                    t();
                }, 1))
              : t(),
            L()));
    }
    (n.dynCall_ii = function () {
      return (
        m(
          Y,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        m(
          !0,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        n.asm.dynCall_ii.apply(null, arguments)
      );
    }),
      (n.dynCall_iiii = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm.dynCall_iiii.apply(null, arguments)
        );
      }),
      (n.dynCall_jiji = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm.dynCall_jiji.apply(null, arguments)
        );
      }),
      (n.dynCall_vii = function () {
        return (
          m(
            Y,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          m(
            !0,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          n.asm.dynCall_vii.apply(null, arguments)
        );
      }),
      (n.asm = ie),
      n.intArrayFromString ||
        (n.intArrayFromString = function () {
          Ae(
            "'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.intArrayToString ||
        (n.intArrayToString = function () {
          Ae(
            "'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      (n.ccall = y),
      (n.cwrap = function (e, t, n, r) {
        return function () {
          return y(e, t, n, arguments);
        };
      }),
      n.setValue ||
        (n.setValue = function () {
          Ae(
            "'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      (n.getValue = function (e, t, n) {
        switch (
          ('*' === (t = t || 'i8').charAt(t.length - 1) && (t = 'i32'), t)
        ) {
          case 'i1':
          case 'i8':
            return w[e >> 0];
          case 'i16':
            return A[e >> 1];
          case 'i32':
          case 'i64':
            return O[e >> 2];
          case 'float':
            return S[e >> 2];
          case 'double':
            return b[e >> 3];
          default:
            Ae('invalid type for getValue: ' + t);
        }
        return null;
      }),
      n.allocate ||
        (n.allocate = function () {
          Ae(
            "'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.getMemory ||
        (n.getMemory = function () {
          Ae(
            "'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      n.AsciiToString ||
        (n.AsciiToString = function () {
          Ae(
            "'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.stringToAscii ||
        (n.stringToAscii = function () {
          Ae(
            "'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.UTF8ArrayToString ||
        (n.UTF8ArrayToString = function () {
          Ae(
            "'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.UTF8ToString ||
        (n.UTF8ToString = function () {
          Ae(
            "'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.stringToUTF8Array ||
        (n.stringToUTF8Array = function () {
          Ae(
            "'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.stringToUTF8 ||
        (n.stringToUTF8 = function () {
          Ae(
            "'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.lengthBytesUTF8 ||
        (n.lengthBytesUTF8 = function () {
          Ae(
            "'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.UTF16ToString ||
        (n.UTF16ToString = function () {
          Ae(
            "'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.stringToUTF16 ||
        (n.stringToUTF16 = function () {
          Ae(
            "'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.lengthBytesUTF16 ||
        (n.lengthBytesUTF16 = function () {
          Ae(
            "'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.UTF32ToString ||
        (n.UTF32ToString = function () {
          Ae(
            "'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.stringToUTF32 ||
        (n.stringToUTF32 = function () {
          Ae(
            "'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.lengthBytesUTF32 ||
        (n.lengthBytesUTF32 = function () {
          Ae(
            "'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.allocateUTF8 ||
        (n.allocateUTF8 = function () {
          Ae(
            "'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.stackTrace ||
        (n.stackTrace = function () {
          Ae(
            "'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.addOnPreRun ||
        (n.addOnPreRun = function () {
          Ae(
            "'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.addOnInit ||
        (n.addOnInit = function () {
          Ae(
            "'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.addOnPreMain ||
        (n.addOnPreMain = function () {
          Ae(
            "'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.addOnExit ||
        (n.addOnExit = function () {
          Ae(
            "'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.addOnPostRun ||
        (n.addOnPostRun = function () {
          Ae(
            "'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.writeStringToMemory ||
        (n.writeStringToMemory = function () {
          Ae(
            "'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.writeArrayToMemory ||
        (n.writeArrayToMemory = function () {
          Ae(
            "'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.writeAsciiToMemory ||
        (n.writeAsciiToMemory = function () {
          Ae(
            "'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.addRunDependency ||
        (n.addRunDependency = function () {
          Ae(
            "'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      n.removeRunDependency ||
        (n.removeRunDependency = function () {
          Ae(
            "'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      n.ENV ||
        (n.ENV = function () {
          Ae(
            "'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.FS ||
        (n.FS = function () {
          Ae(
            "'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.FS_createFolder ||
        (n.FS_createFolder = function () {
          Ae(
            "'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      n.FS_createPath ||
        (n.FS_createPath = function () {
          Ae(
            "'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      n.FS_createDataFile ||
        (n.FS_createDataFile = function () {
          Ae(
            "'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      n.FS_createPreloadedFile ||
        (n.FS_createPreloadedFile = function () {
          Ae(
            "'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      n.FS_createLazyFile ||
        (n.FS_createLazyFile = function () {
          Ae(
            "'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      n.FS_createLink ||
        (n.FS_createLink = function () {
          Ae(
            "'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      n.FS_createDevice ||
        (n.FS_createDevice = function () {
          Ae(
            "'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      n.FS_unlink ||
        (n.FS_unlink = function () {
          Ae(
            "'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      n.GL ||
        (n.GL = function () {
          Ae(
            "'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.dynamicAlloc ||
        (n.dynamicAlloc = function () {
          Ae(
            "'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.warnOnce ||
        (n.warnOnce = function () {
          Ae(
            "'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.loadDynamicLibrary ||
        (n.loadDynamicLibrary = function () {
          Ae(
            "'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.loadWebAssemblyModule ||
        (n.loadWebAssemblyModule = function () {
          Ae(
            "'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.getLEB ||
        (n.getLEB = function () {
          Ae(
            "'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.getFunctionTables ||
        (n.getFunctionTables = function () {
          Ae(
            "'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.alignFunctionTables ||
        (n.alignFunctionTables = function () {
          Ae(
            "'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.registerFunctions ||
        (n.registerFunctions = function () {
          Ae(
            "'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.addFunction ||
        (n.addFunction = function () {
          Ae(
            "'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.removeFunction ||
        (n.removeFunction = function () {
          Ae(
            "'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.getFuncWrapper ||
        (n.getFuncWrapper = function () {
          Ae(
            "'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.prettyPrint ||
        (n.prettyPrint = function () {
          Ae(
            "'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.makeBigInt ||
        (n.makeBigInt = function () {
          Ae(
            "'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.dynCall ||
        (n.dynCall = function () {
          Ae(
            "'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.getCompilerSetting ||
        (n.getCompilerSetting = function () {
          Ae(
            "'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.stackSave ||
        (n.stackSave = function () {
          Ae(
            "'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.stackRestore ||
        (n.stackRestore = function () {
          Ae(
            "'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.stackAlloc ||
        (n.stackAlloc = function () {
          Ae(
            "'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.establishStackSpace ||
        (n.establishStackSpace = function () {
          Ae(
            "'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.print ||
        (n.print = function () {
          Ae(
            "'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.printErr ||
        (n.printErr = function () {
          Ae(
            "'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.getTempRet0 ||
        (n.getTempRet0 = function () {
          Ae(
            "'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.setTempRet0 ||
        (n.setTempRet0 = function () {
          Ae(
            "'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.Pointer_stringify ||
        (n.Pointer_stringify = function () {
          Ae(
            "'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      n.ALLOC_NORMAL ||
        Object.defineProperty(n, 'ALLOC_NORMAL', {
          get: function () {
            Ae(
              "'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
            );
          },
        }),
      n.ALLOC_STACK ||
        Object.defineProperty(n, 'ALLOC_STACK', {
          get: function () {
            Ae(
              "'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
            );
          },
        }),
      n.ALLOC_DYNAMIC ||
        Object.defineProperty(n, 'ALLOC_DYNAMIC', {
          get: function () {
            Ae(
              "'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
            );
          },
        }),
      n.ALLOC_NONE ||
        Object.defineProperty(n, 'ALLOC_NONE', {
          get: function () {
            Ae(
              "'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
            );
          },
        }),
      ((Re.prototype = new Error()).constructor = Re),
      (j = function e() {
        n.calledRun || we(), n.calledRun || (j = e);
      }),
      (n.run = we);
    var ge = [];
    function Ae(e) {
      n.onAbort && n.onAbort(e), (h = !0);
      var t =
        'abort(' + (e = void 0 !== e ? '"' + e + '"' : '') + ') at ' + N();
      throw (
        (ge &&
          ge.forEach(function (n) {
            t = n(t, e);
          }),
        t)
      );
    }
    if (((n.abort = Ae), n.preInit))
      for (
        'function' == typeof n.preInit && (n.preInit = [n.preInit]);
        0 < n.preInit.length;

      )
        n.preInit.pop()();
    (n.noExitRuntime = !0), we();
  } else n = null;
  var Oe,
    Me = n;
  e.unzip = Me;
});
