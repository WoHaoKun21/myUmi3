define(['exports'], function (n) {
  function t(n, t) {
    return null != n ? n : t;
  }
  var e, r, u;
  function o(n, t, e, r) {
    return i(n).then(t, e, r);
  }
  function i(n) {
    var t, e;
    return n instanceof c
      ? n
      : a(n)
      ? ((t = s()),
        n.then(
          function (n) {
            t.resolve(n);
          },
          function (n) {
            t.reject(n);
          },
          function (n) {
            t.progress(n);
          },
        ),
        t.promise)
      : ((e = n),
        new c(function (n) {
          try {
            return i(n ? n(e) : e);
          } catch (n) {
            return f(n);
          }
        }));
  }
  function c(n) {
    this.then = n;
  }
  function f(n) {
    return new c(function (t, e) {
      try {
        return e ? i(e(n)) : f(n);
      } catch (t) {
        return f(t);
      }
    });
  }
  function s() {
    var n, t, e, r, o, a;
    return (
      (n = new c(h)),
      (t = []),
      (e = []),
      (r = function (n, r, u) {
        var o, i;
        return (
          (o = s()),
          (i =
            'function' == typeof u
              ? function (n) {
                  try {
                    o.progress(u(n));
                  } catch (n) {
                    o.progress(n);
                  }
                }
              : function (n) {
                  o.progress(n);
                }),
          t.push(function (t) {
            t.then(n, r).then(o.resolve, o.reject, i);
          }),
          e.push(i),
          o.promise
        );
      }),
      (o = function (n) {
        return v(e, n), n;
      }),
      (a = function (n) {
        return (
          (n = i(n)), (r = n.then), (a = i), (o = y), v(t, n), (e = t = u), n
        );
      }),
      {
        then: h,
        resolve: l,
        reject: p,
        progress: g,
        promise: n,
        resolver: { resolve: l, reject: p, progress: g },
      }
    );
    function h(n, t, e) {
      return r(n, t, e);
    }
    function l(n) {
      return a(n);
    }
    function p(n) {
      return a(f(n));
    }
    function g(n) {
      return o(n);
    }
  }
  function a(n) {
    return n && 'function' == typeof n.then;
  }
  function h(n, t, e, r, u) {
    return (
      g(2, arguments),
      o(n, function (n) {
        var i, c, f, a, h, l, p, v, g, d;
        if (
          ((g = n.length >>> 0),
          (i = Math.max(0, Math.min(t, g))),
          (f = []),
          (c = g - i + 1),
          (a = []),
          (h = s()),
          i)
        )
          for (
            v = h.progress,
              p = function (n) {
                a.push(n), --c || ((l = p = y), h.reject(a));
              },
              l = function (n) {
                f.push(n), --i || ((l = p = y), h.resolve(f));
              },
              d = 0;
            d < g;
            ++d
          )
            d in n && o(n[d], w, j, v);
        else h.resolve(f);
        return h.then(e, r, u);
        function j(n) {
          p(n);
        }
        function w(n) {
          l(n);
        }
      })
    );
  }
  function l(n, t, e, r) {
    return g(1, arguments), p(n, d).then(t, e, r);
  }
  function p(n, t) {
    return o(n, function (n) {
      var e, r, u, i, c, f;
      if (((u = r = n.length >>> 0), (e = []), (f = s()), u))
        for (
          i = function (n, r) {
            o(n, t).then(function (n) {
              (e[r] = n), --u || f.resolve(e);
            }, f.reject);
          },
            c = 0;
          c < r;
          c++
        )
          c in n ? i(n[c], c) : --u;
      else f.resolve(e);
      return f.promise;
    });
  }
  function v(n, t) {
    for (var e, r = 0; (e = n[r++]); ) e(t);
  }
  function g(n, t) {
    for (var e, r = t.length; n < r; )
      if (null != (e = t[--r]) && 'function' != typeof e)
        throw new Error('arg ' + r + ' must be a function');
  }
  function y() {}
  function d(n) {
    return n;
  }
  (t.EMPTY_OBJECT = Object.freeze({})),
    (o.defer = s),
    (o.resolve = i),
    (o.reject = function (n) {
      return o(n, f);
    }),
    (o.join = function () {
      return p(arguments, d);
    }),
    (o.all = l),
    (o.map = p),
    (o.reduce = function (n, t) {
      var u = r.call(arguments, 1);
      return o(n, function (n) {
        var r;
        return (
          (r = n.length),
          (u[0] = function (n, e, u) {
            return o(n, function (n) {
              return o(e, function (e) {
                return t(n, e, u, r);
              });
            });
          }),
          e.apply(n, u)
        );
      });
    }),
    (o.any = function (n, t, e, r) {
      return h(
        n,
        1,
        function (n) {
          return t ? t(n[0]) : n[0];
        },
        e,
        r,
      );
    }),
    (o.some = h),
    (o.allSettled = function (n, t, e, r) {
      return (
        g(1, arguments),
        o(n, function (n) {
          var u, i, c, f, a, h, l, p, v;
          for (
            l = n.length >>> 0,
              p = n.length >>> 0,
              u = [],
              i = [],
              h = (c = s()).progress,
              a = function (n) {
                i.push(n), --p || ((f = a = y), c.resolve(u));
              },
              f = function (n, t) {
                (u[t] = n), --p || ((f = a = y), c.resolve(u));
              },
              v = 0;
            v < l;
            ++v
          )
            switch (v) {
              case 0:
                o(n[v], j, g, h);
                break;
              case 1:
                o(n[v], w, g, h);
                break;
              case 2:
                o(n[v], m, g, h);
                break;
              case 3:
                o(n[v], b, g, h);
                break;
              case 4:
                o(n[v], k, g, h);
                break;
              default:
                o(n[v], d, g, h);
            }
          return c.then(t, e, r);
          function g(n) {
            a(n);
          }
          function d(n) {
            f(n, 0);
          }
          function j(n) {
            f(n, 0);
          }
          function w(n) {
            f(n, 1);
          }
          function m(n) {
            f(n, 2);
          }
          function b(n) {
            f(n, 3);
          }
          function k(n) {
            f(n, 4);
          }
        })
      );
    }),
    (o.chain = function (n, t, e) {
      var r = 2 < arguments.length;
      return o(
        n,
        function (n) {
          return (n = r ? e : n), t.resolve(n), n;
        },
        function (n) {
          return t.reject(n), f(n);
        },
        t.progress,
      );
    }),
    (o.isPromise = a),
    (c.prototype = {
      always: function (n, t) {
        return this.then(n, n, t);
      },
      otherwise: function (n) {
        return this.then(u, n);
      },
      yield: function (n) {
        return this.then(function () {
          return n;
        });
      },
      spread: function (n) {
        return this.then(function (t) {
          return l(t, function (t) {
            return n.apply(u, t);
          });
        });
      },
    }),
    (r = [].slice),
    (e =
      [].reduce ||
      function (n) {
        var t, e, r, u, o;
        if (
          ((o = 0),
          (u = (t = Object(this)).length >>> 0),
          (e = arguments).length <= 1)
        )
          for (;;) {
            if (o in t) {
              r = t[o++];
              break;
            }
            if (++o >= u) throw new TypeError();
          }
        else r = e[1];
        for (; o < u; ++o) o in t && (r = n(r, t[o], o, t));
        return r;
      }),
    (n.defaultValue = t),
    (n.defined = function (n) {
      return null != n;
    }),
    (n.when = o);
});
