define([], function () {
  function t(t) {
    return 'function' == typeof t;
  }
  var e = Array.isArray
      ? Array.isArray
      : function (t) {
          return '[object Array]' === Object.prototype.toString.call(t);
        },
    n = 0,
    r = void 0,
    o = void 0,
    i = function (t, e) {
      (h[n] = t), (h[n + 1] = e), 2 === (n += 2) && (o ? o(v) : m());
    },
    s = 'undefined' != typeof window ? window : void 0,
    u = s || {},
    c = u.MutationObserver || u.WebKitMutationObserver,
    a =
      'undefined' == typeof self &&
      'undefined' != typeof process &&
      '[object process]' === {}.toString.call(process),
    f =
      'undefined' != typeof Uint8ClampedArray &&
      'undefined' != typeof importScripts &&
      'undefined' != typeof MessageChannel;
  function l() {
    var t = setTimeout;
    return function () {
      return t(v, 1);
    };
  }
  var h = new Array(1e3);
  function v() {
    for (var t = 0; t < n; t += 2)
      (0, h[t])(h[t + 1]), (h[t] = void 0), (h[t + 1] = void 0);
    n = 0;
  }
  var p,
    _,
    d,
    y,
    m = void 0;
  function b(t, e) {
    var n = this,
      r = new this.constructor(A);
    void 0 === r[g] && Y(r);
    var o = n._state;
    if (o) {
      var s = arguments[o - 1];
      i(function () {
        return x(o, r, s, n._result);
      });
    } else O(n, r, t, e);
    return r;
  }
  function w(t) {
    if (t && 'object' == typeof t && t.constructor === this) return t;
    var e = new this(A);
    return E(e, t), e;
  }
  m = a
    ? function () {
        return process.nextTick(v);
      }
    : c
    ? ((_ = 0),
      (d = new c(v)),
      (y = document.createTextNode('')),
      d.observe(y, { characterData: !0 }),
      function () {
        y.data = _ = ++_ % 2;
      })
    : f
    ? (((p = new MessageChannel()).port1.onmessage = v),
      function () {
        return p.port2.postMessage(0);
      })
    : void 0 === s && 'function' == typeof require
    ? (function () {
        try {
          var t = Function('return this')().require('vertx');
          return void 0 !== (r = t.runOnLoop || t.runOnContext)
            ? function () {
                r(v);
              }
            : l();
        } catch (t) {
          return l();
        }
      })()
    : l();
  var g = Math.random().toString(36).substring(2);
  function A() {}
  var j = void 0;
  function S(e, n, r) {
    var o, s, u, c;
    n.constructor === e.constructor && r === b && n.constructor.resolve === w
      ? ((u = e),
        1 === (c = n)._state
          ? M(u, c._result)
          : 2 === c._state
          ? C(u, c._result)
          : O(
              c,
              void 0,
              function (t) {
                return E(u, t);
              },
              function (t) {
                return C(u, t);
              },
            ))
      : void 0 === r
      ? M(e, n)
      : t(r)
      ? ((o = n),
        (s = r),
        i(function (t) {
          var e = !1,
            n = (function (t, e, n, r) {
              try {
                t.call(e, n, r);
              } catch (t) {
                return t;
              }
            })(
              s,
              o,
              function (n) {
                e || ((e = !0), o !== n ? E(t, n) : M(t, n));
              },
              function (n) {
                e || ((e = !0), C(t, n));
              },
              t._label,
            );
          !e && n && ((e = !0), C(t, n));
        }, e))
      : M(e, n);
  }
  function E(t, e) {
    if (t === e)
      C(t, new TypeError('You cannot resolve a promise with itself'));
    else if (
      ((o = typeof (r = e)), null === r || ('object' !== o && 'function' !== o))
    )
      M(t, e);
    else {
      var n = void 0;
      try {
        n = e.then;
      } catch (e) {
        return void C(t, e);
      }
      S(t, e, n);
    }
    var r, o;
  }
  function T(t) {
    t._onerror && t._onerror(t._result), P(t);
  }
  function M(t, e) {
    t._state === j &&
      ((t._result = e), (t._state = 1), 0 !== t._subscribers.length && i(P, t));
  }
  function C(t, e) {
    t._state === j && ((t._state = 2), (t._result = e), i(T, t));
  }
  function O(t, e, n, r) {
    var o = t._subscribers,
      s = o.length;
    (t._onerror = null),
      (o[s] = e),
      (o[s + 1] = n),
      (o[s + 2] = r),
      0 === s && t._state && i(P, t);
  }
  function P(t) {
    var e = t._subscribers,
      n = t._state;
    if (0 !== e.length) {
      for (
        var r = void 0, o = void 0, i = t._result, s = 0;
        s < e.length;
        s += 3
      )
        (r = e[s]), (o = e[s + n]), r ? x(n, r, o, i) : o(i);
      t._subscribers.length = 0;
    }
  }
  function x(e, n, r, o) {
    var i = t(r),
      s = void 0,
      u = void 0,
      c = !0;
    if (i) {
      try {
        s = r(o);
      } catch (e) {
        (c = !1), (u = e);
      }
      if (n === s)
        return void C(
          n,
          new TypeError('A promises callback cannot return that same promise.'),
        );
    } else s = o;
    n._state !== j ||
      (i && c
        ? E(n, s)
        : !1 === c
        ? C(n, u)
        : 1 === e
        ? M(n, s)
        : 2 === e && C(n, s));
  }
  var F = 0;
  function Y(t) {
    (t[g] = F++),
      (t._state = void 0),
      (t._result = void 0),
      (t._subscribers = []);
  }
  var k = (function () {
      function t(t, n) {
        (this._instanceConstructor = t),
          (this.promise = new t(A)),
          this.promise[g] || Y(this.promise),
          e(n)
            ? ((this.length = n.length),
              (this._remaining = n.length),
              (this._result = new Array(this.length)),
              0 === this.length
                ? M(this.promise, this._result)
                : ((this.length = this.length || 0),
                  this._enumerate(n),
                  0 === this._remaining && M(this.promise, this._result)))
            : C(
                this.promise,
                new Error('Array Methods must be provided an Array'),
              );
      }
      return (
        (t.prototype._enumerate = function (t) {
          for (var e = 0; this._state === j && e < t.length; e++)
            this._eachEntry(t[e], e);
        }),
        (t.prototype._eachEntry = function (t, e) {
          var n = this._instanceConstructor,
            r = n.resolve;
          if (r === w) {
            var o = void 0,
              i = void 0,
              s = !1;
            try {
              o = t.then;
            } catch (e) {
              (s = !0), (i = e);
            }
            if (o === b && t._state !== j)
              this._settledAt(t._state, e, t._result);
            else if ('function' != typeof o)
              this._remaining--, (this._result[e] = t);
            else if (n === q) {
              var u = new n(A);
              s ? C(u, i) : S(u, t, o), this._willSettleAt(u, e);
            } else
              this._willSettleAt(
                new n(function (e) {
                  return e(t);
                }),
                e,
              );
          } else this._willSettleAt(r(t), e);
        }),
        (t.prototype._settledAt = function (t, e, n) {
          var r = this.promise;
          r._state === j &&
            (this._remaining--, 2 === t ? C(r, n) : (this._result[e] = n)),
            0 === this._remaining && M(r, this._result);
        }),
        (t.prototype._willSettleAt = function (t, e) {
          var n = this;
          O(
            t,
            void 0,
            function (t) {
              return n._settledAt(1, e, t);
            },
            function (t) {
              return n._settledAt(2, e, t);
            },
          );
        }),
        t
      );
    })(),
    q = (function () {
      function e(t) {
        (this[g] = F++),
          (this._result = this._state = void 0),
          (this._subscribers = []),
          A !== t &&
            ('function' != typeof t &&
              (function () {
                throw new TypeError(
                  'You must pass a resolver function as the first argument to the promise constructor',
                );
              })(),
            this instanceof e
              ? (function (t, e) {
                  try {
                    e(
                      function (e) {
                        E(t, e);
                      },
                      function (e) {
                        C(t, e);
                      },
                    );
                  } catch (e) {
                    C(t, e);
                  }
                })(this, t)
              : (function () {
                  throw new TypeError(
                    "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.",
                  );
                })());
      }
      return (
        (e.prototype.catch = function (t) {
          return this.then(null, t);
        }),
        (e.prototype.finally = function (e) {
          var n = this.constructor;
          return t(e)
            ? this.then(
                function (t) {
                  return n.resolve(e()).then(function () {
                    return t;
                  });
                },
                function (t) {
                  return n.resolve(e()).then(function () {
                    throw t;
                  });
                },
              )
            : this.then(e, e);
        }),
        e
      );
    })();
  return (
    (q.prototype.then = b),
    (q.all = function (t) {
      return new k(this, t).promise;
    }),
    (q.race = function (t) {
      var n = this;
      return e(t)
        ? new n(function (e, r) {
            for (var o = t.length, i = 0; i < o; i++)
              n.resolve(t[i]).then(e, r);
          })
        : new n(function (t, e) {
            return e(new TypeError('You must pass an array to race.'));
          });
    }),
    (q.resolve = w),
    (q.reject = function (t) {
      var e = new this(A);
      return C(e, t), e;
    }),
    (q._setScheduler = function (t) {
      o = t;
    }),
    (q._setAsap = function (t) {
      i = t;
    }),
    (q._asap = i),
    (q.polyfill = function () {
      var t = void 0;
      if ('undefined' != typeof global) t = global;
      else if ('undefined' != typeof self) t = self;
      else
        try {
          t = Function('return this')();
        } catch (t) {
          throw new Error(
            'polyfill failed because global object is unavailable in this environment',
          );
        }
      var e = t.Promise;
      if (e) {
        var n = null;
        try {
          n = Object.prototype.toString.call(e.resolve());
        } catch (t) {}
        if ('[object Promise]' === n && !e.cast) return;
      }
      t.Promise = q;
    }),
    (q.Promise = q)
  );
});
