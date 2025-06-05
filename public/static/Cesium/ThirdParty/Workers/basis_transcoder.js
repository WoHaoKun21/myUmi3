var BASIS = (function () {
  var e =
    'undefined' != typeof document && document.currentScript
      ? document.currentScript.src
      : void 0;
  return (
    'undefined' != typeof __filename && (e = e || __filename),
    function (r) {
      var t,
        n,
        o = void 0 !== (r = r || {}) ? r : {};
      o.ready = new Promise(function (e, r) {
        (t = e), (readyPromiseRejectza = r);
      });
      var i,
        a = {};
      for (i in o) o.hasOwnProperty(i) && (a[i] = o[i]);
      var u,
        s,
        c = [],
        f = !1,
        l = !1;
      (f = 'object' == typeof window),
        (l = 'function' == typeof importScripts),
        (u =
          'object' == typeof process &&
          'object' == typeof process.versions &&
          'string' == typeof process.versions.node),
        (s = !f && !u && !l);
      var p,
        d,
        h,
        v,
        y,
        m = '';
      u
        ? ((m = l ? require('path').dirname(m) + '/' : __dirname + '/'),
          (p = function (e, r) {
            return (
              v || (v = require('fs')),
              y || (y = require('path')),
              (e = y.normalize(e)),
              v.readFileSync(e, r ? null : 'utf8')
            );
          }),
          (h = function (e) {
            var r = p(e, !0);
            return r.buffer || (r = new Uint8Array(r)), $(r.buffer), r;
          }),
          1 < process.argv.length && process.argv[1].replace(/\\/g, '/'),
          (c = process.argv.slice(2)),
          process.on('uncaughtException', function (e) {
            if (
              !(
                e instanceof
                function (e) {
                  (this.name = 'ExitStatus'),
                    (this.message = 'Program terminated with exit(' + e + ')'),
                    (this.status = e);
                }
              )
            )
              throw e;
          }),
          process.on('unhandledRejection', Y),
          (o.inspect = function () {
            return '[Emscripten Module object]';
          }))
        : s
        ? ('undefined' != typeof read &&
            (p = function (e) {
              return read(e);
            }),
          (h = function (e) {
            var r;
            return 'function' == typeof readbuffer
              ? new Uint8Array(readbuffer(e))
              : ($('object' == typeof (r = read(e, 'binary'))), r);
          }),
          'undefined' != typeof scriptArgs
            ? (c = scriptArgs)
            : void 0 !== arguments && (c = arguments),
          'undefined' != typeof print &&
            ('undefined' == typeof console && (console = {}),
            (console.log = print),
            (console.warn = console.error =
              'undefined' != typeof printErr ? printErr : print)))
        : (f || l) &&
          (l
            ? (m = self.location.href)
            : 'undefined' != typeof document &&
              document.currentScript &&
              (m = document.currentScript.src),
          e && (m = e),
          (m =
            0 !== m.indexOf('blob:')
              ? m.substr(0, m.lastIndexOf('/') + 1)
              : ''),
          (p = function (e) {
            var r = new XMLHttpRequest();
            return r.open('GET', e, !1), r.send(null), r.responseText;
          }),
          l &&
            (h = function (e) {
              var r = new XMLHttpRequest();
              return (
                r.open('GET', e, !1),
                (r.responseType = 'arraybuffer'),
                r.send(null),
                new Uint8Array(r.response)
              );
            }),
          (d = function (e, r, t) {
            var n = new XMLHttpRequest();
            n.open('GET', e, !0),
              (n.responseType = 'arraybuffer'),
              (n.onload = function () {
                200 == n.status || (0 == n.status && n.response)
                  ? r(n.response)
                  : t();
              }),
              (n.onerror = t),
              n.send(null);
          }));
      var g,
        w,
        T = o.print || console.log.bind(console),
        b = o.printErr || console.warn.bind(console);
      for (i in a) a.hasOwnProperty(i) && (o[i] = a[i]);
      (a = null),
        o.arguments && (c = o.arguments),
        o.thisProgram && o.thisProgram,
        o.quit && o.quit,
        o.wasmBinary && (g = o.wasmBinary),
        o.noExitRuntime,
        'object' != typeof WebAssembly && Y('no native wasm support detected');
      var C = !1;
      function $(e, r) {
        e || Y('Assertion failed: ' + r);
      }
      var P =
        'undefined' != typeof TextDecoder ? new TextDecoder('utf8') : void 0;
      function A(e, r, t) {
        for (var n = r + t, o = r; e[o] && !(n <= o); ) ++o;
        if (16 < o - r && e.subarray && P) return P.decode(e.subarray(r, o));
        for (var i = ''; r < o; ) {
          var a = e[r++];
          if (128 & a) {
            var u = 63 & e[r++];
            if (192 != (224 & a)) {
              var s = 63 & e[r++];
              if (
                (a =
                  224 == (240 & a)
                    ? ((15 & a) << 12) | (u << 6) | s
                    : ((7 & a) << 18) | (u << 12) | (s << 6) | (63 & e[r++])) <
                65536
              )
                i += String.fromCharCode(a);
              else {
                var c = a - 65536;
                i += String.fromCharCode(55296 | (c >> 10), 56320 | (1023 & c));
              }
            } else i += String.fromCharCode(((31 & a) << 6) | u);
          } else i += String.fromCharCode(a);
        }
        return i;
      }
      function _(e, r) {
        return e ? A(E, e, r) : '';
      }
      var S,
        W,
        E,
        F,
        k,
        O,
        j,
        R,
        I,
        x =
          'undefined' != typeof TextDecoder
            ? new TextDecoder('utf-16le')
            : void 0;
      function D(e, r) {
        for (var t = e, n = t >> 1, o = n + r / 2; !(o <= n) && k[n]; ) ++n;
        if (32 < (t = n << 1) - e && x) return x.decode(E.subarray(e, t));
        for (var i = '', a = 0; !(r / 2 <= a); ++a) {
          var u = F[(e + 2 * a) >> 1];
          if (0 == u) break;
          i += String.fromCharCode(u);
        }
        return i;
      }
      function U(e, r, t) {
        if ((void 0 === t && (t = 2147483647), t < 2)) return 0;
        for (
          var n = r, o = (t -= 2) < 2 * e.length ? t / 2 : e.length, i = 0;
          i < o;
          ++i
        ) {
          var a = e.charCodeAt(i);
          (F[r >> 1] = a), (r += 2);
        }
        return (F[r >> 1] = 0), r - n;
      }
      function B(e) {
        return 2 * e.length;
      }
      function M(e, r) {
        for (var t = 0, n = ''; !(r / 4 <= t); ) {
          var o = O[(e + 4 * t) >> 2];
          if (0 == o) break;
          if ((++t, 65536 <= o)) {
            var i = o - 65536;
            n += String.fromCharCode(55296 | (i >> 10), 56320 | (1023 & i));
          } else n += String.fromCharCode(o);
        }
        return n;
      }
      function V(e, r, t) {
        if ((void 0 === t && (t = 2147483647), t < 4)) return 0;
        for (var n = r, o = n + t - 4, i = 0; i < e.length; ++i) {
          var a = e.charCodeAt(i);
          if (
            (55296 <= a &&
              a <= 57343 &&
              (a = (65536 + ((1023 & a) << 10)) | (1023 & e.charCodeAt(++i))),
            (O[r >> 2] = a),
            o < (r += 4) + 4)
          )
            break;
        }
        return (O[r >> 2] = 0), r - n;
      }
      function H(e) {
        for (var r = 0, t = 0; t < e.length; ++t) {
          var n = e.charCodeAt(t);
          55296 <= n && n <= 57343 && ++t, (r += 4);
        }
        return r;
      }
      function q(e) {
        (S = e),
          (o.HEAP8 = W = new Int8Array(e)),
          (o.HEAP16 = F = new Int16Array(e)),
          (o.HEAP32 = O = new Int32Array(e)),
          (o.HEAPU8 = E = new Uint8Array(e)),
          (o.HEAPU16 = k = new Uint16Array(e)),
          (o.HEAPU32 = j = new Uint32Array(e)),
          (o.HEAPF32 = R = new Float32Array(e)),
          (o.HEAPF64 = I = new Float64Array(e));
      }
      o.INITIAL_MEMORY;
      var z,
        N = [],
        G = [],
        L = [],
        X = [],
        J = 0,
        K = null,
        Q = null;
      function Y(e) {
        o.onAbort && o.onAbort(e),
          b((e += '')),
          (C = !0),
          (e = 'abort(' + e + '). Build with -s ASSERTIONS=1 for more info.');
        var r = new WebAssembly.RuntimeError(e);
        throw (n(r), r);
      }
      function Z(e, r) {
        return String.prototype.startsWith
          ? e.startsWith(r)
          : 0 === e.indexOf(r);
      }
      (o.preloadedImages = {}), (o.preloadedAudios = {});
      var ee = 'data:application/octet-stream;base64,';
      function re(e) {
        return Z(e, ee);
      }
      var te = 'file://';
      function ne(e) {
        return Z(e, te);
      }
      var oe,
        ie = 'basis_transcoder.wasm';
      function ae(e) {
        try {
          if (e == ie && g) return new Uint8Array(g);
          if (h) return h(e);
          throw 'both async and sync fetching of the wasm failed';
        } catch (e) {
          Y(e);
        }
      }
      function ue(e) {
        for (; 0 < e.length; ) {
          var r = e.shift();
          if ('function' != typeof r) {
            var t = r.func;
            'number' == typeof t
              ? void 0 === r.arg
                ? z.get(t)()
                : z.get(t)(r.arg)
              : t(void 0 === r.arg ? null : r.arg);
          } else r(o);
        }
      }
      re(ie) || ((oe = ie), (ie = o.locateFile ? o.locateFile(oe, m) : m + oe));
      var se = {};
      function ce(e) {
        for (; e.length; ) {
          var r = e.pop();
          e.pop()(r);
        }
      }
      function fe(e) {
        return this.fromWireType(j[e >> 2]);
      }
      var le = {},
        pe = {},
        de = {},
        he = 48,
        ve = 57;
      function ye(e) {
        if (void 0 === e) return '_unknown';
        var r = (e = e.replace(/[^a-zA-Z0-9_]/g, '$')).charCodeAt(0);
        return he <= r && r <= ve ? '_' + e : e;
      }
      function me(e, r) {
        return (
          (e = ye(e)),
          new Function(
            'body',
            'return function ' +
              e +
              '() {\n    "use strict";    return body.apply(this, arguments);\n};\n',
          )(r)
        );
      }
      function ge(e, r) {
        var t = me(r, function (e) {
          (this.name = r), (this.message = e);
          var t = new Error(e).stack;
          void 0 !== t &&
            (this.stack =
              this.toString() + '\n' + t.replace(/^Error(:[^\n]*)?\n/, ''));
        });
        return (
          (t.prototype = Object.create(e.prototype)),
          ((t.prototype.constructor = t).prototype.toString = function () {
            return void 0 === this.message
              ? this.name
              : this.name + ': ' + this.message;
          }),
          t
        );
      }
      var we = void 0;
      function Te(e) {
        throw new we(e);
      }
      function be(e, r, t) {
        function n(r) {
          var n = t(r);
          n.length !== e.length && Te('Mismatched type converter count');
          for (var o = 0; o < e.length; ++o) Se(e[o], n[o]);
        }
        e.forEach(function (e) {
          de[e] = r;
        });
        var o = new Array(r.length),
          i = [],
          a = 0;
        r.forEach(function (e, r) {
          pe.hasOwnProperty(e)
            ? (o[r] = pe[e])
            : (i.push(e),
              le.hasOwnProperty(e) || (le[e] = []),
              le[e].push(function () {
                (o[r] = pe[e]), ++a === i.length && n(o);
              }));
        }),
          0 === i.length && n(o);
      }
      function Ce(e) {
        switch (e) {
          case 1:
            return 0;
          case 2:
            return 1;
          case 4:
            return 2;
          case 8:
            return 3;
          default:
            throw new TypeError('Unknown type size: ' + e);
        }
      }
      var $e = void 0;
      function Pe(e) {
        for (var r = '', t = e; E[t]; ) r += $e[E[t++]];
        return r;
      }
      var Ae = void 0;
      function _e(e) {
        throw new Ae(e);
      }
      function Se(e, r, t) {
        if (((t = t || {}), !('argPackAdvance' in r)))
          throw new TypeError(
            'registerType registeredInstance requires argPackAdvance',
          );
        var n = r.name;
        if (
          (e ||
            _e('type "' + n + '" must have a positive integer typeid pointer'),
          pe.hasOwnProperty(e))
        ) {
          if (t.ignoreDuplicateRegistrations) return;
          _e("Cannot register type '" + n + "' twice");
        }
        if (((pe[e] = r), delete de[e], le.hasOwnProperty(e))) {
          var o = le[e];
          delete le[e],
            o.forEach(function (e) {
              e();
            });
        }
      }
      function We(e) {
        if (!(this instanceof Ve)) return !1;
        if (!(e instanceof Ve)) return !1;
        for (
          var r = this.$$.ptrType.registeredClass,
            t = this.$$.ptr,
            n = e.$$.ptrType.registeredClass,
            o = e.$$.ptr;
          r.baseClass;

        )
          (t = r.upcast(t)), (r = r.baseClass);
        for (; n.baseClass; ) (o = n.upcast(o)), (n = n.baseClass);
        return r === n && t === o;
      }
      function Ee(e) {
        _e(e.$$.ptrType.registeredClass.name + ' instance already deleted');
      }
      var Fe = !1;
      function ke(e) {}
      function Oe(e) {
        var r;
        (e.count.value -= 1),
          0 === e.count.value &&
            ((r = e).smartPtr
              ? r.smartPtrType.rawDestructor(r.smartPtr)
              : r.ptrType.registeredClass.rawDestructor(r.ptr));
      }
      function je(e) {
        return 'undefined' == typeof FinalizationGroup
          ? ((je = function (e) {
              return e;
            }),
            e)
          : ((Fe = new FinalizationGroup(function (e) {
              for (var r = e.next(); !r.done; r = e.next()) {
                var t = r.value;
                t.ptr
                  ? Oe(t)
                  : console.warn('object already deleted: ' + t.ptr);
              }
            })),
            (ke = function (e) {
              Fe.unregister(e.$$);
            }),
            (je = function (e) {
              return Fe.register(e, e.$$, e.$$), e;
            })(e));
      }
      function Re() {
        if ((this.$$.ptr || Ee(this), this.$$.preservePointerOnDelete))
          return (this.$$.count.value += 1), this;
        var e,
          r = je(
            Object.create(Object.getPrototypeOf(this), {
              $$: {
                value:
                  ((e = this.$$),
                  {
                    count: e.count,
                    deleteScheduled: e.deleteScheduled,
                    preservePointerOnDelete: e.preservePointerOnDelete,
                    ptr: e.ptr,
                    ptrType: e.ptrType,
                    smartPtr: e.smartPtr,
                    smartPtrType: e.smartPtrType,
                  }),
              },
            }),
          );
        return (r.$$.count.value += 1), (r.$$.deleteScheduled = !1), r;
      }
      function Ie() {
        this.$$.ptr || Ee(this),
          this.$$.deleteScheduled &&
            !this.$$.preservePointerOnDelete &&
            _e('Object already scheduled for deletion'),
          ke(this),
          Oe(this.$$),
          this.$$.preservePointerOnDelete ||
            ((this.$$.smartPtr = void 0), (this.$$.ptr = void 0));
      }
      function xe() {
        return !this.$$.ptr;
      }
      var De = void 0,
        Ue = [];
      function Be() {
        for (; Ue.length; ) {
          var e = Ue.pop();
          (e.$$.deleteScheduled = !1), e.delete();
        }
      }
      function Me() {
        return (
          this.$$.ptr || Ee(this),
          this.$$.deleteScheduled &&
            !this.$$.preservePointerOnDelete &&
            _e('Object already scheduled for deletion'),
          Ue.push(this),
          1 === Ue.length && De && De(Be),
          (this.$$.deleteScheduled = !0),
          this
        );
      }
      function Ve() {}
      var He = {};
      function qe(e, r, t) {
        if (void 0 === e[r].overloadTable) {
          var n = e[r];
          (e[r] = function () {
            return (
              e[r].overloadTable.hasOwnProperty(arguments.length) ||
                _e(
                  "Function '" +
                    t +
                    "' called with an invalid number of arguments (" +
                    arguments.length +
                    ') - expects one of (' +
                    e[r].overloadTable +
                    ')!',
                ),
              e[r].overloadTable[arguments.length].apply(this, arguments)
            );
          }),
            (e[r].overloadTable = []),
            (e[r].overloadTable[n.argCount] = n);
        }
      }
      function ze(e, r, t) {
        o.hasOwnProperty(e)
          ? ((void 0 === t ||
              (void 0 !== o[e].overloadTable &&
                void 0 !== o[e].overloadTable[t])) &&
              _e("Cannot register public name '" + e + "' twice"),
            qe(o, e, e),
            o.hasOwnProperty(t) &&
              _e(
                'Cannot register multiple overloads of a function with the same number of arguments (' +
                  t +
                  ')!',
              ),
            (o[e].overloadTable[t] = r))
          : ((o[e] = r), void 0 !== t && (o[e].numArguments = t));
      }
      function Ne(e, r, t, n, o, i, a, u) {
        (this.name = e),
          (this.constructor = r),
          (this.instancePrototype = t),
          (this.rawDestructor = n),
          (this.baseClass = o),
          (this.getActualType = i),
          (this.upcast = a),
          (this.downcast = u),
          (this.pureVirtualFunctions = []);
      }
      function Ge(e, r, t) {
        for (; r !== t; )
          r.upcast ||
            _e(
              'Expected null or instance of ' +
                t.name +
                ', got an instance of ' +
                r.name,
            ),
            (e = r.upcast(e)),
            (r = r.baseClass);
        return e;
      }
      function Le(e, r) {
        if (null === r)
          return this.isReference && _e('null is not a valid ' + this.name), 0;
        r.$$ || _e('Cannot pass "' + $r(r) + '" as a ' + this.name),
          r.$$.ptr ||
            _e('Cannot pass deleted object as a pointer of type ' + this.name);
        var t = r.$$.ptrType.registeredClass;
        return Ge(r.$$.ptr, t, this.registeredClass);
      }
      function Xe(e, r) {
        var t;
        if (null === r)
          return (
            this.isReference && _e('null is not a valid ' + this.name),
            this.isSmartPointer
              ? ((t = this.rawConstructor()),
                null !== e && e.push(this.rawDestructor, t),
                t)
              : 0
          );
        r.$$ || _e('Cannot pass "' + $r(r) + '" as a ' + this.name),
          r.$$.ptr ||
            _e('Cannot pass deleted object as a pointer of type ' + this.name),
          !this.isConst &&
            r.$$.ptrType.isConst &&
            _e(
              'Cannot convert argument of type ' +
                (r.$$.smartPtrType
                  ? r.$$.smartPtrType.name
                  : r.$$.ptrType.name) +
                ' to parameter type ' +
                this.name,
            );
        var n = r.$$.ptrType.registeredClass;
        if (((t = Ge(r.$$.ptr, n, this.registeredClass)), this.isSmartPointer))
          switch (
            (void 0 === r.$$.smartPtr &&
              _e('Passing raw pointer to smart pointer is illegal'),
            this.sharingPolicy)
          ) {
            case 0:
              r.$$.smartPtrType === this
                ? (t = r.$$.smartPtr)
                : _e(
                    'Cannot convert argument of type ' +
                      (r.$$.smartPtrType
                        ? r.$$.smartPtrType.name
                        : r.$$.ptrType.name) +
                      ' to parameter type ' +
                      this.name,
                  );
              break;
            case 1:
              t = r.$$.smartPtr;
              break;
            case 2:
              if (r.$$.smartPtrType === this) t = r.$$.smartPtr;
              else {
                var o = r.clone();
                (t = this.rawShare(
                  t,
                  br(function () {
                    o.delete();
                  }),
                )),
                  null !== e && e.push(this.rawDestructor, t);
              }
              break;
            default:
              _e('Unsupporting sharing policy');
          }
        return t;
      }
      function Je(e, r) {
        if (null === r)
          return this.isReference && _e('null is not a valid ' + this.name), 0;
        r.$$ || _e('Cannot pass "' + $r(r) + '" as a ' + this.name),
          r.$$.ptr ||
            _e('Cannot pass deleted object as a pointer of type ' + this.name),
          r.$$.ptrType.isConst &&
            _e(
              'Cannot convert argument of type ' +
                r.$$.ptrType.name +
                ' to parameter type ' +
                this.name,
            );
        var t = r.$$.ptrType.registeredClass;
        return Ge(r.$$.ptr, t, this.registeredClass);
      }
      function Ke(e) {
        return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
      }
      function Qe(e) {
        this.rawDestructor && this.rawDestructor(e);
      }
      function Ye(e) {
        null !== e && e.delete();
      }
      function Ze() {
        return Object.keys(tr).length;
      }
      function er() {
        var e = [];
        for (var r in tr) tr.hasOwnProperty(r) && e.push(tr[r]);
        return e;
      }
      function rr(e) {
        (De = e), Ue.length && De && De(Be);
      }
      var tr = {};
      function nr(e, r) {
        return (
          (r = (function (e, r) {
            for (
              void 0 === r && _e('ptr should not be undefined');
              e.baseClass;

            )
              (r = e.upcast(r)), (e = e.baseClass);
            return r;
          })(e, r)),
          tr[r]
        );
      }
      function or(e, r) {
        return (
          (r.ptrType && r.ptr) ||
            Te('makeClassHandle requires ptr and ptrType'),
          !!r.smartPtrType != !!r.smartPtr &&
            Te('Both smartPtrType and smartPtr must be specified'),
          (r.count = { value: 1 }),
          je(Object.create(e, { $$: { value: r } }))
        );
      }
      function ir(e) {
        var r = this.getPointee(e);
        if (!r) return this.destructor(e), null;
        var t = nr(this.registeredClass, r);
        if (void 0 !== t) {
          if (0 === t.$$.count.value)
            return (t.$$.ptr = r), (t.$$.smartPtr = e), t.clone();
          var n = t.clone();
          return this.destructor(e), n;
        }
        function o() {
          return this.isSmartPointer
            ? or(this.registeredClass.instancePrototype, {
                ptrType: this.pointeeType,
                ptr: r,
                smartPtrType: this,
                smartPtr: e,
              })
            : or(this.registeredClass.instancePrototype, {
                ptrType: this,
                ptr: e,
              });
        }
        var i,
          a = this.registeredClass.getActualType(r),
          u = He[a];
        if (!u) return o.call(this);
        i = this.isConst ? u.constPointerType : u.pointerType;
        var s = (function e(r, t, n) {
          if (t === n) return r;
          if (void 0 === n.baseClass) return null;
          var o = e(r, t, n.baseClass);
          return null === o ? null : n.downcast(o);
        })(r, this.registeredClass, i.registeredClass);
        return null === s
          ? o.call(this)
          : this.isSmartPointer
          ? or(i.registeredClass.instancePrototype, {
              ptrType: i,
              ptr: s,
              smartPtrType: this,
              smartPtr: e,
            })
          : or(i.registeredClass.instancePrototype, { ptrType: i, ptr: s });
      }
      function ar(e, r, t, n, o, i, a, u, s, c, f) {
        (this.name = e),
          (this.registeredClass = r),
          (this.isReference = t),
          (this.isConst = n),
          (this.isSmartPointer = o),
          (this.pointeeType = i),
          (this.sharingPolicy = a),
          (this.rawGetPointee = u),
          (this.rawConstructor = s),
          (this.rawShare = c),
          (this.rawDestructor = f),
          o || void 0 !== r.baseClass
            ? (this.toWireType = Xe)
            : (this.destructorFunction =
                ((this.toWireType = n ? Le : Je), null));
      }
      function ur(e, r, t) {
        o.hasOwnProperty(e) || Te('Replacing nonexistant public symbol'),
          void 0 !== o[e].overloadTable && void 0 !== t
            ? (o[e].overloadTable[t] = r)
            : ((o[e] = r), (o[e].argCount = t));
      }
      function sr(e, r, t) {
        return -1 != e.indexOf('j')
          ? ((n = r),
            (i = t),
            (a = o['dynCall_' + e]),
            i && i.length ? a.apply(null, [n].concat(i)) : a.call(null, n))
          : z.get(r).apply(null, t);
        var n, i, a;
      }
      function cr(e, r) {
        var t,
          n,
          o,
          i =
            -1 != (e = Pe(e)).indexOf('j')
              ? ((t = e),
                (n = r),
                (o = []),
                function () {
                  o.length = arguments.length;
                  for (var e = 0; e < arguments.length; e++)
                    o[e] = arguments[e];
                  return sr(t, n, o);
                })
              : z.get(r);
        return (
          'function' != typeof i &&
            _e('unknown function pointer with signature ' + e + ': ' + r),
          i
        );
      }
      var fr = void 0;
      function lr(e) {
        var r = xr(e),
          t = Pe(r);
        return Ir(r), t;
      }
      function pr(e, r) {
        var t = [],
          n = {};
        throw (
          (r.forEach(function e(r) {
            n[r] ||
              pe[r] ||
              (de[r] ? de[r].forEach(e) : (t.push(r), (n[r] = !0)));
          }),
          new fr(e + ': ' + t.map(lr).join([', '])))
        );
      }
      function dr(e, r) {
        for (var t = [], n = 0; n < e; n++) t.push(O[(r >> 2) + n]);
        return t;
      }
      function hr(e, r) {
        if (!(e instanceof Function))
          throw new TypeError(
            'new_ called with constructor type ' +
              typeof e +
              ' which is not a function',
          );
        var t = me(e.name || 'unknownFunctionName', function () {});
        t.prototype = e.prototype;
        var n = new t(),
          o = e.apply(n, r);
        return o instanceof Object ? o : n;
      }
      function vr(e, r, t, n, o) {
        var i = r.length;
        i < 2 &&
          _e(
            "argTypes array size mismatch! Must at least get return value and 'this' types!",
          );
        for (
          var a = null !== r[1] && null !== t, u = !1, s = 1;
          s < r.length;
          ++s
        )
          if (null !== r[s] && void 0 === r[s].destructorFunction) {
            u = !0;
            break;
          }
        var c = 'void' !== r[0].name,
          f = '',
          l = '';
        for (s = 0; s < i - 2; ++s)
          (f += (0 !== s ? ', ' : '') + 'arg' + s),
            (l += (0 !== s ? ', ' : '') + 'arg' + s + 'Wired');
        var p =
          'return function ' +
          ye(e) +
          '(' +
          f +
          ') {\nif (arguments.length !== ' +
          (i - 2) +
          ") {\nthrowBindingError('function " +
          e +
          " called with ' + arguments.length + ' arguments, expected " +
          (i - 2) +
          " args!');\n}\n";
        u && (p += 'var destructors = [];\n');
        var d = u ? 'destructors' : 'null',
          h = [
            'throwBindingError',
            'invoker',
            'fn',
            'runDestructors',
            'retType',
            'classParam',
          ],
          v = [_e, n, o, ce, r[0], r[1]];
        for (
          a &&
            (p += 'var thisWired = classParam.toWireType(' + d + ', this);\n'),
            s = 0;
          s < i - 2;
          ++s
        )
          (p +=
            'var arg' +
            s +
            'Wired = argType' +
            s +
            '.toWireType(' +
            d +
            ', arg' +
            s +
            '); // ' +
            r[s + 2].name +
            '\n'),
            h.push('argType' + s),
            v.push(r[s + 2]);
        if (
          (a && (l = 'thisWired' + (0 < l.length ? ', ' : '') + l),
          (p +=
            (c ? 'var rv = ' : '') +
            'invoker(fn' +
            (0 < l.length ? ', ' : '') +
            l +
            ');\n'),
          u)
        )
          p += 'runDestructors(destructors);\n';
        else
          for (s = a ? 1 : 2; s < r.length; ++s) {
            var y = 1 === s ? 'thisWired' : 'arg' + (s - 2) + 'Wired';
            null !== r[s].destructorFunction &&
              ((p += y + '_dtor(' + y + '); // ' + r[s].name + '\n'),
              h.push(y + '_dtor'),
              v.push(r[s].destructorFunction));
          }
        return (
          c && (p += 'var ret = retType.fromWireType(rv);\nreturn ret;\n'),
          (p += '}\n'),
          h.push(p),
          hr(Function, h).apply(null, v)
        );
      }
      var yr = [],
        mr = [
          {},
          { value: void 0 },
          { value: null },
          { value: !0 },
          { value: !1 },
        ];
      function gr(e) {
        4 < e && 0 == --mr[e].refcount && ((mr[e] = void 0), yr.push(e));
      }
      function wr() {
        for (var e = 0, r = 5; r < mr.length; ++r) void 0 !== mr[r] && ++e;
        return e;
      }
      function Tr() {
        for (var e = 5; e < mr.length; ++e) if (void 0 !== mr[e]) return mr[e];
        return null;
      }
      function br(e) {
        switch (e) {
          case void 0:
            return 1;
          case null:
            return 2;
          case !0:
            return 3;
          case !1:
            return 4;
          default:
            var r = yr.length ? yr.pop() : mr.length;
            return (mr[r] = { refcount: 1, value: e }), r;
        }
      }
      function Cr(e, r) {
        var t = pe[e];
        return void 0 === t && _e(r + ' has unknown type ' + lr(e)), t;
      }
      function $r(e) {
        if (null === e) return 'null';
        var r = typeof e;
        return 'object' === r || 'array' === r || 'function' === r
          ? e.toString()
          : '' + e;
      }
      function Pr(e) {
        return e || _e('Cannot use deleted val. handle = ' + e), mr[e].value;
      }
      var Ar = {};
      function _r(e) {
        var r = Ar[e];
        return void 0 === r ? Pe(e) : r;
      }
      var Sr = [];
      function Wr() {
        return 'object' == typeof globalThis
          ? globalThis
          : Function('return this')();
      }
      var Er = {};
      function Fr(e) {
        try {
          return w.grow((e - S.byteLength + 65535) >>> 16), q(w.buffer), 1;
        } catch (e) {}
      }
      var kr = {
        mappings: {},
        buffers: [null, [], []],
        printChar: function (e, r) {
          var t = kr.buffers[e];
          0 === r || 10 === r
            ? ((1 === e ? T : b)(A(t, 0)), (t.length = 0))
            : t.push(r);
        },
        varargs: void 0,
        get: function () {
          return (kr.varargs += 4), O[(kr.varargs - 4) >> 2];
        },
        getStr: function (e) {
          return _(e);
        },
        get64: function (e, r) {
          return e;
        },
      };
      (we = o.InternalError = ge(Error, 'InternalError')),
        (function () {
          for (var e = new Array(256), r = 0; r < 256; ++r)
            e[r] = String.fromCharCode(r);
          $e = e;
        })(),
        (Ae = o.BindingError = ge(Error, 'BindingError')),
        (Ve.prototype.isAliasOf = We),
        (Ve.prototype.clone = Re),
        (Ve.prototype.delete = Ie),
        (Ve.prototype.isDeleted = xe),
        (Ve.prototype.deleteLater = Me),
        (ar.prototype.getPointee = Ke),
        (ar.prototype.destructor = Qe),
        (ar.prototype.argPackAdvance = 8),
        (ar.prototype.readValueFromPointer = fe),
        (ar.prototype.deleteObject = Ye),
        (ar.prototype.fromWireType = ir),
        (o.getInheritedInstanceCount = Ze),
        (o.getLiveInheritedInstances = er),
        (o.flushPendingDeletes = Be),
        (o.setDelayFunction = rr),
        (fr = o.UnboundTypeError = ge(Error, 'UnboundTypeError')),
        (o.count_emval_handles = wr),
        (o.get_first_emval = Tr);
      var Or,
        jr = {
          t: function (e) {
            var r = se[e];
            delete se[e];
            var t = r.rawConstructor,
              n = r.rawDestructor,
              o = r.fields;
            be(
              [e],
              o
                .map(function (e) {
                  return e.getterReturnType;
                })
                .concat(
                  o.map(function (e) {
                    return e.setterArgumentType;
                  }),
                ),
              function (e) {
                var i = {};
                return (
                  o.forEach(function (r, t) {
                    var n = r.fieldName,
                      a = e[t],
                      u = r.getter,
                      s = r.getterContext,
                      c = e[t + o.length],
                      f = r.setter,
                      l = r.setterContext;
                    i[n] = {
                      read: function (e) {
                        return a.fromWireType(u(s, e));
                      },
                      write: function (e, r) {
                        var t = [];
                        f(l, e, c.toWireType(t, r)), ce(t);
                      },
                    };
                  }),
                  [
                    {
                      name: r.name,
                      fromWireType: function (e) {
                        var r = {};
                        for (var t in i) r[t] = i[t].read(e);
                        return n(e), r;
                      },
                      toWireType: function (e, r) {
                        for (var o in i)
                          if (!(o in r))
                            throw new TypeError('Missing field:  "' + o + '"');
                        var a = t();
                        for (o in i) i[o].write(a, r[o]);
                        return null !== e && e.push(n, a), a;
                      },
                      argPackAdvance: 8,
                      readValueFromPointer: fe,
                      destructorFunction: n,
                    },
                  ]
                );
              },
            );
          },
          I: function (e, r, t, n, o) {
            var i = Ce(t);
            Se(e, {
              name: (r = Pe(r)),
              fromWireType: function (e) {
                return !!e;
              },
              toWireType: function (e, r) {
                return r ? n : o;
              },
              argPackAdvance: 8,
              readValueFromPointer: function (e) {
                var n;
                if (1 === t) n = W;
                else if (2 === t) n = F;
                else {
                  if (4 !== t)
                    throw new TypeError('Unknown boolean type size: ' + r);
                  n = O;
                }
                return this.fromWireType(n[e >> i]);
              },
              destructorFunction: null,
            });
          },
          x: function (e, r, t, n, o, i, a, u, s, c, f, l, p) {
            (f = Pe(f)),
              (i = cr(o, i)),
              u && (u = cr(a, u)),
              c && (c = cr(s, c)),
              (p = cr(l, p));
            var d = ye(f);
            ze(d, function () {
              pr('Cannot construct ' + f + ' due to unbound types', [n]);
            }),
              be([e, r, t], n ? [n] : [], function (r) {
                var t, o;
                (r = r[0]),
                  (o = n
                    ? (t = r.registeredClass).instancePrototype
                    : Ve.prototype);
                var a = me(d, function () {
                    if (Object.getPrototypeOf(this) !== s)
                      throw new Ae("Use 'new' to construct " + f);
                    if (void 0 === l.constructor_body)
                      throw new Ae(f + ' has no accessible constructor');
                    var e = l.constructor_body[arguments.length];
                    if (void 0 === e)
                      throw new Ae(
                        'Tried to invoke ctor of ' +
                          f +
                          ' with invalid number of parameters (' +
                          arguments.length +
                          ') - expected (' +
                          Object.keys(l.constructor_body).toString() +
                          ') parameters instead!',
                      );
                    return e.apply(this, arguments);
                  }),
                  s = Object.create(o, { constructor: { value: a } });
                a.prototype = s;
                var l = new Ne(f, a, s, p, t, i, u, c),
                  h = new ar(f, l, !0, !1, !1),
                  v = new ar(f + '*', l, !1, !1, !1),
                  y = new ar(f + ' const*', l, !1, !0, !1);
                return (
                  (He[e] = { pointerType: v, constPointerType: y }),
                  ur(d, a),
                  [h, v, y]
                );
              });
          },
          w: function (e, r, t, n, o, i) {
            $(0 < r);
            var a = dr(r, t);
            o = cr(n, o);
            var u = [i],
              s = [];
            be([], [e], function (e) {
              var t = 'constructor ' + (e = e[0]).name;
              if (
                (void 0 === e.registeredClass.constructor_body &&
                  (e.registeredClass.constructor_body = []),
                void 0 !== e.registeredClass.constructor_body[r - 1])
              )
                throw new Ae(
                  'Cannot register multiple constructors with identical number of parameters (' +
                    (r - 1) +
                    ") for class '" +
                    e.name +
                    "'! Overload resolution is currently only performed using the parameter count, not actual type info!",
                );
              return (
                (e.registeredClass.constructor_body[r - 1] = function () {
                  pr('Cannot construct ' + e.name + ' due to unbound types', a);
                }),
                be([], a, function (n) {
                  return (
                    (e.registeredClass.constructor_body[r - 1] = function () {
                      arguments.length !== r - 1 &&
                        _e(
                          t +
                            ' called with ' +
                            arguments.length +
                            ' arguments, expected ' +
                            (r - 1),
                        ),
                        (s.length = 0),
                        (u.length = r);
                      for (var e = 1; e < r; ++e)
                        u[e] = n[e].toWireType(s, arguments[e - 1]);
                      var i = o.apply(null, u);
                      return ce(s), n[0].fromWireType(i);
                    }),
                    []
                  );
                }),
                []
              );
            });
          },
          d: function (e, r, t, n, o, i, a, u) {
            var s = dr(t, n);
            (r = Pe(r)),
              (i = cr(o, i)),
              be([], [e], function (e) {
                var n = (e = e[0]).name + '.' + r;
                function o() {
                  pr('Cannot call ' + n + ' due to unbound types', s);
                }
                u && e.registeredClass.pureVirtualFunctions.push(r);
                var c = e.registeredClass.instancePrototype,
                  f = c[r];
                return (
                  void 0 === f ||
                  (void 0 === f.overloadTable &&
                    f.className !== e.name &&
                    f.argCount === t - 2)
                    ? ((o.argCount = t - 2), (o.className = e.name), (c[r] = o))
                    : (qe(c, r, n), (c[r].overloadTable[t - 2] = o)),
                  be([], s, function (o) {
                    var u = vr(n, o, e, i, a);
                    return (
                      void 0 === c[r].overloadTable
                        ? ((u.argCount = t - 2), (c[r] = u))
                        : (c[r].overloadTable[t - 2] = u),
                      []
                    );
                  }),
                  []
                );
              });
          },
          k: function (e, r, t) {
            (e = Pe(e)),
              be([], [r], function (r) {
                return (r = r[0]), (o[e] = r.fromWireType(t)), [];
              });
          },
          H: function (e, r) {
            Se(e, {
              name: (r = Pe(r)),
              fromWireType: function (e) {
                var r = mr[e].value;
                return gr(e), r;
              },
              toWireType: function (e, r) {
                return br(r);
              },
              argPackAdvance: 8,
              readValueFromPointer: fe,
              destructorFunction: null,
            });
          },
          n: function (e, r, t, n) {
            var o = Ce(t);
            function i() {}
            (r = Pe(r)),
              (i.values = {}),
              Se(e, {
                name: r,
                constructor: i,
                fromWireType: function (e) {
                  return this.constructor.values[e];
                },
                toWireType: function (e, r) {
                  return r.value;
                },
                argPackAdvance: 8,
                readValueFromPointer: (function (e, r, t) {
                  switch (r) {
                    case 0:
                      return function (e) {
                        var r = t ? W : E;
                        return this.fromWireType(r[e]);
                      };
                    case 1:
                      return function (e) {
                        var r = t ? F : k;
                        return this.fromWireType(r[e >> 1]);
                      };
                    case 2:
                      return function (e) {
                        var r = t ? O : j;
                        return this.fromWireType(r[e >> 2]);
                      };
                    default:
                      throw new TypeError('Unknown integer type: ' + e);
                  }
                })(r, o, n),
                destructorFunction: null,
              }),
              ze(r, i);
          },
          a: function (e, r, t) {
            var n = Cr(e, 'enum');
            r = Pe(r);
            var o = n.constructor,
              i = Object.create(n.constructor.prototype, {
                value: { value: t },
                constructor: { value: me(n.name + '_' + r, function () {}) },
              });
            (o.values[t] = i), (o[r] = i);
          },
          A: function (e, r, t) {
            var n = Ce(t);
            Se(e, {
              name: (r = Pe(r)),
              fromWireType: function (e) {
                return e;
              },
              toWireType: function (e, r) {
                if ('number' != typeof r && 'boolean' != typeof r)
                  throw new TypeError(
                    'Cannot convert "' + $r(r) + '" to ' + this.name,
                  );
                return r;
              },
              argPackAdvance: 8,
              readValueFromPointer: (function (e, r) {
                switch (r) {
                  case 2:
                    return function (e) {
                      return this.fromWireType(R[e >> 2]);
                    };
                  case 3:
                    return function (e) {
                      return this.fromWireType(I[e >> 3]);
                    };
                  default:
                    throw new TypeError('Unknown float type: ' + e);
                }
              })(r, n),
              destructorFunction: null,
            });
          },
          i: function (e, r, t, n, o, i) {
            var a = dr(r, t);
            (e = Pe(e)),
              (o = cr(n, o)),
              ze(
                e,
                function () {
                  pr('Cannot call ' + e + ' due to unbound types', a);
                },
                r - 1,
              ),
              be([], a, function (t) {
                var n = [t[0], null].concat(t.slice(1));
                return ur(e, vr(e, n, null, o, i), r - 1), [];
              });
          },
          j: function (e, r, t, n, o) {
            (r = Pe(r)), -1 === o && (o = 4294967295);
            var i = Ce(t),
              a = function (e) {
                return e;
              };
            if (0 === n) {
              var u = 32 - 8 * t;
              a = function (e) {
                return (e << u) >>> u;
              };
            }
            var s = -1 != r.indexOf('unsigned');
            Se(e, {
              name: r,
              fromWireType: a,
              toWireType: function (e, t) {
                if ('number' != typeof t && 'boolean' != typeof t)
                  throw new TypeError(
                    'Cannot convert "' + $r(t) + '" to ' + this.name,
                  );
                if (t < n || o < t)
                  throw new TypeError(
                    'Passing a number "' +
                      $r(t) +
                      '" from JS side to C/C++ side to an argument of type "' +
                      r +
                      '", which is outside the valid range [' +
                      n +
                      ', ' +
                      o +
                      ']!',
                  );
                return s ? t >>> 0 : 0 | t;
              },
              argPackAdvance: 8,
              readValueFromPointer: (function (e, r, t) {
                switch (r) {
                  case 0:
                    return t
                      ? function (e) {
                          return W[e];
                        }
                      : function (e) {
                          return E[e];
                        };
                  case 1:
                    return t
                      ? function (e) {
                          return F[e >> 1];
                        }
                      : function (e) {
                          return k[e >> 1];
                        };
                  case 2:
                    return t
                      ? function (e) {
                          return O[e >> 2];
                        }
                      : function (e) {
                          return j[e >> 2];
                        };
                  default:
                    throw new TypeError('Unknown integer type: ' + e);
                }
              })(r, i, 0 !== n),
              destructorFunction: null,
            });
          },
          h: function (e, r, t) {
            var n = [
              Int8Array,
              Uint8Array,
              Int16Array,
              Uint16Array,
              Int32Array,
              Uint32Array,
              Float32Array,
              Float64Array,
            ][r];
            function o(e) {
              var r = j,
                t = r[(e >>= 2)],
                o = r[e + 1];
              return new n(S, o, t);
            }
            Se(
              e,
              {
                name: (t = Pe(t)),
                fromWireType: o,
                argPackAdvance: 8,
                readValueFromPointer: o,
              },
              { ignoreDuplicateRegistrations: !0 },
            );
          },
          B: function (e, r) {
            var t = 'std::string' === (r = Pe(r));
            Se(e, {
              name: r,
              fromWireType: function (e) {
                var r,
                  n = j[e >> 2];
                if (t)
                  for (var o = e + 4, i = 0; i <= n; ++i) {
                    var a = e + 4 + i;
                    if (i == n || 0 == E[a]) {
                      var u = _(o, a - o);
                      void 0 === r
                        ? (r = u)
                        : ((r += String.fromCharCode(0)), (r += u)),
                        (o = a + 1);
                    }
                  }
                else {
                  var s = new Array(n);
                  for (i = 0; i < n; ++i)
                    s[i] = String.fromCharCode(E[e + 4 + i]);
                  r = s.join('');
                }
                return Ir(e), r;
              },
              toWireType: function (e, r) {
                r instanceof ArrayBuffer && (r = new Uint8Array(r));
                var n = 'string' == typeof r;
                n ||
                  r instanceof Uint8Array ||
                  r instanceof Uint8ClampedArray ||
                  r instanceof Int8Array ||
                  _e('Cannot pass non-string to std::string');
                var o = (
                    t && n
                      ? function () {
                          return (function (e) {
                            for (var r = 0, t = 0; t < e.length; ++t) {
                              var n = e.charCodeAt(t);
                              55296 <= n &&
                                n <= 57343 &&
                                (n =
                                  (65536 + ((1023 & n) << 10)) |
                                  (1023 & e.charCodeAt(++t))),
                                n <= 127
                                  ? ++r
                                  : (r += n <= 2047 ? 2 : n <= 65535 ? 3 : 4);
                            }
                            return r;
                          })(r);
                        }
                      : function () {
                          return r.length;
                        }
                  )(),
                  i = Rr(4 + o + 1);
                if (((j[i >> 2] = o), t && n))
                  !(function (e, r, t, n) {
                    if (0 < n) {
                      for (var o = t + n - 1, i = 0; i < e.length; ++i) {
                        var a = e.charCodeAt(i);
                        if (
                          (55296 <= a &&
                            a <= 57343 &&
                            (a =
                              (65536 + ((1023 & a) << 10)) |
                              (1023 & e.charCodeAt(++i))),
                          a <= 127)
                        ) {
                          if (o <= t) break;
                          r[t++] = a;
                        } else if (a <= 2047) {
                          if (o <= t + 1) break;
                          (r[t++] = 192 | (a >> 6)), (r[t++] = 128 | (63 & a));
                        } else if (a <= 65535) {
                          if (o <= t + 2) break;
                          (r[t++] = 224 | (a >> 12)),
                            (r[t++] = 128 | ((a >> 6) & 63)),
                            (r[t++] = 128 | (63 & a));
                        } else {
                          if (o <= t + 3) break;
                          (r[t++] = 240 | (a >> 18)),
                            (r[t++] = 128 | ((a >> 12) & 63)),
                            (r[t++] = 128 | ((a >> 6) & 63)),
                            (r[t++] = 128 | (63 & a));
                        }
                      }
                      r[t] = 0;
                    }
                  })(r, E, i + 4, o + 1);
                else if (n)
                  for (var a = 0; a < o; ++a) {
                    var u = r.charCodeAt(a);
                    255 < u &&
                      (Ir(i),
                      _e(
                        'String has UTF-16 code units that do not fit in 8 bits',
                      )),
                      (E[i + 4 + a] = u);
                  }
                else for (a = 0; a < o; ++a) E[i + 4 + a] = r[a];
                return null !== e && e.push(Ir, i), i;
              },
              argPackAdvance: 8,
              readValueFromPointer: fe,
              destructorFunction: function (e) {
                Ir(e);
              },
            });
          },
          v: function (e, r, t) {
            var n, o, i, a, u;
            (t = Pe(t)),
              2 === r
                ? ((n = D),
                  (o = U),
                  (a = B),
                  (i = function () {
                    return k;
                  }),
                  (u = 1))
                : 4 === r &&
                  ((n = M),
                  (o = V),
                  (a = H),
                  (i = function () {
                    return j;
                  }),
                  (u = 2)),
              Se(e, {
                name: t,
                fromWireType: function (e) {
                  for (
                    var t, o = j[e >> 2], a = i(), s = e + 4, c = 0;
                    c <= o;
                    ++c
                  ) {
                    var f = e + 4 + c * r;
                    if (c == o || 0 == a[f >> u]) {
                      var l = n(s, f - s);
                      void 0 === t
                        ? (t = l)
                        : ((t += String.fromCharCode(0)), (t += l)),
                        (s = f + r);
                    }
                  }
                  return Ir(e), t;
                },
                toWireType: function (e, n) {
                  'string' != typeof n &&
                    _e('Cannot pass non-string to C++ string type ' + t);
                  var i = a(n),
                    s = Rr(4 + i + r);
                  return (
                    (j[s >> 2] = i >> u),
                    o(n, s + 4, i + r),
                    null !== e && e.push(Ir, s),
                    s
                  );
                },
                argPackAdvance: 8,
                readValueFromPointer: fe,
                destructorFunction: function (e) {
                  Ir(e);
                },
              });
          },
          u: function (e, r, t, n, o, i) {
            se[e] = {
              name: Pe(r),
              rawConstructor: cr(t, n),
              rawDestructor: cr(o, i),
              fields: [],
            };
          },
          c: function (e, r, t, n, o, i, a, u, s, c) {
            se[e].fields.push({
              fieldName: Pe(r),
              getterReturnType: t,
              getter: cr(n, o),
              getterContext: i,
              setterArgumentType: a,
              setter: cr(u, s),
              setterContext: c,
            });
          },
          J: function (e, r) {
            Se(e, {
              isVoid: !0,
              name: (r = Pe(r)),
              argPackAdvance: 0,
              fromWireType: function () {},
              toWireType: function (e, r) {},
            });
          },
          m: function (e, r, t) {
            (e = Pr(e)), (r = Cr(r, 'emval::as'));
            var n = [],
              o = br(n);
            return (O[t >> 2] = o), r.toWireType(n, e);
          },
          s: function (e, r, t, n) {
            (e = Sr[e])((r = Pr(r)), (t = _r(t)), null, n);
          },
          b: gr,
          y: function (e) {
            return 0 === e ? br(Wr()) : ((e = _r(e)), br(Wr()[e]));
          },
          p: function (e, r) {
            for (
              var t = (function (e, r) {
                  for (var t = new Array(e), n = 0; n < e; ++n)
                    t[n] = Cr(O[(r >> 2) + n], 'parameter ' + n);
                  return t;
                })(e, r),
                n = t[0],
                o =
                  n.name +
                  '_$' +
                  t
                    .slice(1)
                    .map(function (e) {
                      return e.name;
                    })
                    .join('_') +
                  '$',
                i = ['retType'],
                a = [n],
                u = '',
                s = 0;
              s < e - 1;
              ++s
            )
              (u += (0 !== s ? ', ' : '') + 'arg' + s),
                i.push('argType' + s),
                a.push(t[1 + s]);
            var c,
              f,
              l =
                'return function ' +
                ye('methodCaller_' + o) +
                '(handle, name, destructors, args) {\n',
              p = 0;
            for (s = 0; s < e - 1; ++s)
              (l +=
                '    var arg' +
                s +
                ' = argType' +
                s +
                '.readValueFromPointer(args' +
                (p ? '+' + p : '') +
                ');\n'),
                (p += t[s + 1].argPackAdvance);
            for (
              l += '    var rv = handle[name](' + u + ');\n', s = 0;
              s < e - 1;
              ++s
            )
              t[s + 1].deleteObject &&
                (l += '    argType' + s + '.deleteObject(arg' + s + ');\n');
            return (
              n.isVoid ||
                (l += '    return retType.toWireType(destructors, rv);\n'),
              (l += '};\n'),
              i.push(l),
              (c = hr(Function, i).apply(null, a)),
              (f = Sr.length),
              Sr.push(c),
              f
            );
          },
          r: function (e) {
            return (e = _r(e)), br(o[e]);
          },
          e: function (e, r) {
            return br((e = Pr(e))[(r = Pr(r))]);
          },
          g: function (e) {
            4 < e && (mr[e].refcount += 1);
          },
          q: function (e, r, t, n) {
            e = Pr(e);
            var i = Er[r];
            return (
              i ||
                ((i = (function (e) {
                  for (var r = '', t = 0; t < e; ++t)
                    r += (0 !== t ? ', ' : '') + 'arg' + t;
                  var n =
                    'return function emval_allocator_' +
                    e +
                    '(constructor, argTypes, args) {\n';
                  for (t = 0; t < e; ++t)
                    n +=
                      'var argType' +
                      t +
                      " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " +
                      t +
                      '], "parameter ' +
                      t +
                      '");\nvar arg' +
                      t +
                      ' = argType' +
                      t +
                      '.readValueFromPointer(args);\nargs += argType' +
                      t +
                      "['argPackAdvance'];\n";
                  return (
                    (n +=
                      'var obj = new constructor(' +
                      r +
                      ');\nreturn __emval_register(obj);\n}\n'),
                    new Function(
                      'requireRegisteredType',
                      'Module',
                      '__emval_register',
                      n,
                    )(Cr, o, br)
                  );
                })(r)),
                (Er[r] = i)),
              i(e, t, n)
            );
          },
          f: function (e) {
            return br(_r(e));
          },
          l: function (e) {
            ce(mr[e].value), gr(e);
          },
          o: function () {
            Y();
          },
          E: function (e, r, t) {
            E.copyWithin(e, r, r + t);
          },
          F: function (e) {
            var r,
              t = E.length,
              n = 2147483648;
            if (n < (e >>>= 0)) return !1;
            for (var o = 1; o <= 4; o *= 2) {
              var i = t * (1 + 0.2 / o);
              if (
                ((i = Math.min(i, e + 100663296)),
                Fr(
                  Math.min(
                    n,
                    (0 < (r = Math.max(e, i)) % 65536 &&
                      (r += 65536 - (r % 65536)),
                    r),
                  ),
                ))
              )
                return !0;
            }
            return !1;
          },
          G: function (e) {
            return 0;
          },
          C: function (e, r, t, n, o) {},
          z: function (e, r, t, n) {
            for (var o = 0, i = 0; i < t; i++) {
              for (
                var a = O[(r + 8 * i) >> 2],
                  u = O[(r + (8 * i + 4)) >> 2],
                  s = 0;
                s < u;
                s++
              )
                kr.printChar(e, E[a + s]);
              o += u;
            }
            return (O[n >> 2] = o), 0;
          },
          D: function (e) {},
        },
        Rr =
          ((function () {
            var e = { a: jr };
            function r(e, r) {
              var t,
                n = e.exports;
              (o.asm = n),
                q((w = o.asm.K).buffer),
                (z = o.asm.O),
                (t = o.asm.L),
                G.unshift(t),
                (function (e) {
                  if (
                    (J--,
                    o.monitorRunDependencies && o.monitorRunDependencies(J),
                    0 == J && (null !== K && (clearInterval(K), (K = null)), Q))
                  ) {
                    var r = Q;
                    (Q = null), r();
                  }
                })();
            }
            function t(e) {
              r(e.instance);
            }
            function i(r) {
              return (function () {
                if (!g && (f || l)) {
                  if ('function' == typeof fetch && !ne(ie))
                    return fetch(ie, { credentials: 'same-origin' })
                      .then(function (e) {
                        if (!e.ok)
                          throw (
                            "failed to load wasm binary file at '" + ie + "'"
                          );
                        return e.arrayBuffer();
                      })
                      .catch(function () {
                        return ae(ie);
                      });
                  if (d)
                    return new Promise(function (e, r) {
                      d(
                        ie,
                        function (r) {
                          e(new Uint8Array(r));
                        },
                        r,
                      );
                    });
                }
                return Promise.resolve().then(function () {
                  return ae(ie);
                });
              })()
                .then(function (r) {
                  return WebAssembly.instantiate(r, e);
                })
                .then(r, function (e) {
                  b('failed to asynchronously prepare wasm: ' + e), Y(e);
                });
            }
            if (
              (J++,
              o.monitorRunDependencies && o.monitorRunDependencies(J),
              o.instantiateWasm)
            )
              try {
                return o.instantiateWasm(e, r);
              } catch (e) {
                return b(
                  'Module.instantiateWasm callback failed with error: ' + e,
                );
              }
            (g ||
            'function' != typeof WebAssembly.instantiateStreaming ||
            re(ie) ||
            ne(ie) ||
            'function' != typeof fetch
              ? i(t)
              : fetch(ie, { credentials: 'same-origin' }).then(function (r) {
                  return WebAssembly.instantiateStreaming(r, e).then(
                    t,
                    function (e) {
                      return (
                        b('wasm streaming compile failed: ' + e),
                        b('falling back to ArrayBuffer instantiation'),
                        i(t)
                      );
                    },
                  );
                })
            ).catch(n);
          })(),
          (o.___wasm_call_ctors = function () {
            return (o.___wasm_call_ctors = o.asm.L).apply(null, arguments);
          }),
          (o._malloc = function () {
            return (Rr = o._malloc = o.asm.M).apply(null, arguments);
          })),
        Ir = (o._free = function () {
          return (Ir = o._free = o.asm.N).apply(null, arguments);
        }),
        xr = (o.___getTypeName = function () {
          return (xr = o.___getTypeName = o.asm.P).apply(null, arguments);
        });
      function Dr(e) {
        function r() {
          Or ||
            ((Or = !0),
            (o.calledRun = !0),
            C ||
              (ue(G),
              ue(L),
              t(o),
              o.onRuntimeInitialized && o.onRuntimeInitialized(),
              (function () {
                if (o.postRun)
                  for (
                    'function' == typeof o.postRun && (o.postRun = [o.postRun]);
                    o.postRun.length;

                  )
                    (e = o.postRun.shift()), X.unshift(e);
                var e;
                ue(X);
              })()));
        }
        (e = e || c),
          0 < J ||
            ((function () {
              if (o.preRun)
                for (
                  'function' == typeof o.preRun && (o.preRun = [o.preRun]);
                  o.preRun.length;

                )
                  (e = o.preRun.shift()), N.unshift(e);
              var e;
              ue(N);
            })(),
            0 < J ||
              (o.setStatus
                ? (o.setStatus('Running...'),
                  setTimeout(function () {
                    setTimeout(function () {
                      o.setStatus('');
                    }, 1),
                      r();
                  }, 1))
                : r()));
      }
      if (
        ((o.___embind_register_native_and_builtin_types = function () {
          return (o.___embind_register_native_and_builtin_types =
            o.asm.Q).apply(null, arguments);
        }),
        (o.dynCall_jiji = function () {
          return (o.dynCall_jiji = o.asm.R).apply(null, arguments);
        }),
        (Q = function e() {
          Or || Dr(), Or || (Q = e);
        }),
        (o.run = Dr),
        o.preInit)
      )
        for (
          'function' == typeof o.preInit && (o.preInit = [o.preInit]);
          0 < o.preInit.length;

        )
          o.preInit.pop()();
      return Dr(), r.ready;
    }
  );
})();
'object' == typeof exports && 'object' == typeof module
  ? (module.exports = BASIS)
  : 'function' == typeof define && define.amd
  ? define([], function () {
      return BASIS;
    })
  : 'object' == typeof exports && (exports.BASIS = BASIS);
