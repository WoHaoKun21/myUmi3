define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './RuntimeError-ba10bc3e',
], function (e, t, r, n) {
  function i(e) {
    if (e instanceof i)
      (this.scheme = e.scheme),
        (this.authority = e.authority),
        (this.path = e.path),
        (this.query = e.query),
        (this.fragment = e.fragment);
    else if (e) {
      var t = o.exec(e);
      (this.scheme = t[1]),
        (this.authority = t[2]),
        (this.path = t[3]),
        (this.query = t[4]),
        (this.fragment = t[5]);
    }
  }
  (i.prototype.scheme = null),
    (i.prototype.authority = null),
    (i.prototype.path = ''),
    (i.prototype.query = null),
    (i.prototype.fragment = null);
  var o = new RegExp(
    '^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$',
  );
  (i.prototype.getScheme = function () {
    return this.scheme;
  }),
    (i.prototype.getAuthority = function () {
      return this.authority;
    }),
    (i.prototype.getPath = function () {
      return this.path;
    }),
    (i.prototype.getQuery = function () {
      return this.query;
    }),
    (i.prototype.getFragment = function () {
      return this.fragment;
    }),
    (i.prototype.isAbsolute = function () {
      return !!this.scheme && !this.fragment;
    }),
    (i.prototype.isSameDocumentAs = function (e) {
      return (
        e.scheme == this.scheme &&
        e.authority == this.authority &&
        e.path == this.path &&
        e.query == this.query
      );
    }),
    (i.prototype.equals = function (e) {
      return this.isSameDocumentAs(e) && e.fragment == this.fragment;
    }),
    (i.prototype.normalize = function () {
      this.removeDotSegments(),
        this.scheme && (this.scheme = this.scheme.toLowerCase()),
        this.authority &&
          (this.authority = this.authority.replace(a, c).replace(s, f)),
        this.path && (this.path = this.path.replace(s, f)),
        this.query && (this.query = this.query.replace(s, f)),
        this.fragment && (this.fragment = this.fragment.replace(s, f));
    });
  var s = /%[0-9a-z]{2}/gi,
    u = /[a-zA-Z0-9\-\._~]/,
    a = /(.*@)?([^@:]*)(:.*)?/;
  function f(e) {
    var t = unescape(e);
    return u.test(t) ? t : e.toUpperCase();
  }
  function c(e, t, r, n) {
    return (t || '') + r.toLowerCase() + (n || '');
  }
  function p(e, r) {
    if (null === e || 'object' != typeof e) return e;
    r = t.defaultValue(r, !1);
    var n = new e.constructor();
    for (var i in e)
      if (e.hasOwnProperty(i)) {
        var o = e[i];
        r && (o = p(o, r)), (n[i] = o);
      }
    return n;
  }
  function d(e, r, n) {
    n = t.defaultValue(n, !1);
    var i,
      o,
      s,
      u = {},
      a = t.defined(e),
      f = t.defined(r);
    if (a)
      for (i in e)
        e.hasOwnProperty(i) &&
          ((o = e[i]),
          f && n && 'object' == typeof o && r.hasOwnProperty(i)
            ? ((s = r[i]), (u[i] = 'object' == typeof s ? d(o, s, n) : o))
            : (u[i] = o));
    if (f)
      for (i in r)
        r.hasOwnProperty(i) && !u.hasOwnProperty(i) && ((s = r[i]), (u[i] = s));
    return u;
  }
  function h(e, t) {
    var r;
    return (
      'undefined' != typeof document && (r = document),
      h._implementation(e, t, r)
    );
  }
  (i.prototype.resolve = function (e) {
    var t = new i();
    return (
      this.scheme
        ? ((t.scheme = this.scheme),
          (t.authority = this.authority),
          (t.path = this.path),
          (t.query = this.query))
        : ((t.scheme = e.scheme),
          this.authority
            ? ((t.authority = this.authority),
              (t.path = this.path),
              (t.query = this.query))
            : ((t.authority = e.authority),
              '' == this.path
                ? ((t.path = e.path), (t.query = this.query || e.query))
                : ('/' == this.path.charAt(0)
                    ? (t.path = this.path)
                    : e.authority && '' == e.path
                    ? (t.path = '/' + this.path)
                    : (t.path =
                        e.path.substring(0, e.path.lastIndexOf('/') + 1) +
                        this.path),
                  t.removeDotSegments(),
                  (t.query = this.query)))),
      (t.fragment = this.fragment),
      t
    );
  }),
    (i.prototype.removeDotSegments = function () {
      var e,
        t = this.path.split('/'),
        r = [],
        n = '' == t[0];
      for (n && t.shift(), '' == t[0] && t.shift(); t.length; )
        '..' == (e = t.shift()) ? r.pop() : '.' != e && r.push(e);
      ('.' != e && '..' != e) || r.push(''),
        n && r.unshift(''),
        (this.path = r.join('/'));
    }),
    (i.prototype.toString = function () {
      var e = '';
      return (
        this.scheme && (e += this.scheme + ':'),
        this.authority && (e += '//' + this.authority),
        (e += this.path),
        this.query && (e += '?' + this.query),
        this.fragment && (e += '#' + this.fragment),
        e
      );
    }),
    (h._implementation = function (e, n, o) {
      if (!t.defined(e))
        throw new r.DeveloperError('relative uri is required.');
      if (!t.defined(n)) {
        if (void 0 === o) return e;
        n = t.defaultValue(o.baseURI, o.location.href);
      }
      var s = new i(n);
      return new i(e).resolve(s).toString();
    });
  var l,
    m = /^blob:/i;
  function y(e) {
    return r.Check.typeOf.string('uri', e), m.test(e);
  }
  var v = /^data:/i;
  function g(e) {
    return r.Check.typeOf.string('uri', e), v.test(e);
  }
  var q = Object.freeze({
      UNISSUED: 0,
      ISSUED: 1,
      ACTIVE: 2,
      RECEIVED: 3,
      CANCELLED: 4,
      FAILED: 5,
    }),
    b = Object.freeze({
      TERRAIN: 0,
      IMAGERY: 1,
      TILES3D: 2,
      OTHER: 3,
      PACK: 4,
      BLOCK: 5,
      BLOCKPACK: 6,
    });
  function w(e) {
    e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT);
    var r = t.defaultValue(e.throttleByServer, !1),
      n = t.defaultValue(e.throttle, !1);
    (this.url = e.url),
      (this.requestFunction = e.requestFunction),
      (this.cancelFunction = e.cancelFunction),
      (this.priorityFunction = e.priorityFunction),
      (this.priority = t.defaultValue(e.priority, 0)),
      (this.throttle = n),
      (this.throttleByServer = r),
      (this.type = t.defaultValue(e.type, b.OTHER)),
      (this.serverKey = void 0),
      (this.state = q.UNISSUED),
      (this.deferred = void 0),
      (this.cancelled = !1);
  }
  function R(e, t, r) {
    (this.statusCode = e),
      (this.response = t),
      (this.responseHeaders = r),
      'string' == typeof this.responseHeaders &&
        (this.responseHeaders = (function (e) {
          var t = {};
          if (!e) return t;
          for (var r = e.split('\r\n'), n = 0; n < r.length; ++n) {
            var i = r[n],
              o = i.indexOf(': ');
            if (0 < o) {
              var s = i.substring(0, o),
                u = i.substring(o + 2);
              t[s] = u;
            }
          }
          return t;
        })(this.responseHeaders));
  }
  function A() {
    (this._listeners = []),
      (this._scopes = []),
      (this._toRemove = []),
      (this._insideRaiseEvent = !1);
  }
  function O(e, t) {
    return t - e;
  }
  function _(e) {
    r.Check.typeOf.object('options', e),
      r.Check.defined('options.comparator', e.comparator),
      (this._comparator = e.comparator),
      (this._array = []),
      (this._length = 0),
      (this._maximumLength = void 0);
  }
  function E(e, t, r) {
    var n = e[t];
    (e[t] = e[r]), (e[r] = n);
  }
  (w.prototype.cancel = function () {
    this.cancelled = !0;
  }),
    (w.prototype.clone = function (e) {
      return t.defined(e)
        ? ((e.url = this.url),
          (e.requestFunction = this.requestFunction),
          (e.cancelFunction = this.cancelFunction),
          (e.priorityFunction = this.priorityFunction),
          (e.priority = this.priority),
          (e.throttle = this.throttle),
          (e.throttleByServer = this.throttleByServer),
          (e.type = this.type),
          (e.serverKey = this.serverKey),
          (e.state = this.RequestState.UNISSUED),
          (e.deferred = void 0),
          (e.cancelled = !1),
          e)
        : new w(this);
    }),
    (R.prototype.toString = function () {
      var e = 'Request has failed.';
      return (
        t.defined(this.statusCode) && (e += ' Status Code: ' + this.statusCode),
        e
      );
    }),
    Object.defineProperties(A.prototype, {
      numberOfListeners: {
        get: function () {
          return this._listeners.length - this._toRemove.length;
        },
      },
    }),
    (A.prototype.addEventListener = function (e, t) {
      r.Check.typeOf.func('listener', e),
        this._listeners.push(e),
        this._scopes.push(t);
      var n = this;
      return function () {
        n.removeEventListener(e, t);
      };
    }),
    (A.prototype.removeEventListener = function (e, t) {
      r.Check.typeOf.func('listener', e);
      for (
        var n = this._listeners, i = this._scopes, o = -1, s = 0;
        s < n.length;
        s++
      )
        if (n[s] === e && i[s] === t) {
          o = s;
          break;
        }
      return (
        -1 !== o &&
        (this._insideRaiseEvent
          ? (this._toRemove.push(o), (n[o] = void 0), (i[o] = void 0))
          : (n.splice(o, 1), i.splice(o, 1)),
        !0)
      );
    }),
    (A.prototype.raiseEvent = function () {
      var e;
      this._insideRaiseEvent = !0;
      var r = this._listeners,
        n = this._scopes,
        i = r.length;
      for (e = 0; e < i; e++) {
        var o = r[e];
        t.defined(o) && r[e].apply(n[e], arguments);
      }
      var s = this._toRemove;
      if (0 < (i = s.length)) {
        for (s.sort(O), e = 0; e < i; e++) {
          var u = s[e];
          r.splice(u, 1), n.splice(u, 1);
        }
        s.length = 0;
      }
      this._insideRaiseEvent = !1;
    }),
    Object.defineProperties(_.prototype, {
      length: {
        get: function () {
          return this._length;
        },
      },
      internalArray: {
        get: function () {
          return this._array;
        },
      },
      maximumLength: {
        get: function () {
          return this._maximumLength;
        },
        set: function (e) {
          (this._maximumLength = e),
            this._length > e &&
              0 < e &&
              ((this._length = e), (this._array.length = e));
        },
      },
      comparator: {
        get: function () {
          return this._comparator;
        },
      },
    }),
    (_.prototype.reserve = function (e) {
      (e = t.defaultValue(e, this._length)), (this._array.length = e);
    }),
    (_.prototype.heapify = function (e) {
      e = t.defaultValue(e, 0);
      for (
        var r = this._length,
          n = this._comparator,
          i = this._array,
          o = -1,
          s = !0;
        s;

      ) {
        var u = 2 * (e + 1),
          a = u - 1;
        (o = a < r && n(i[a], i[e]) < 0 ? a : e),
          u < r && n(i[u], i[o]) < 0 && (o = u),
          o !== e ? (E(i, o, e), (e = o)) : (s = !1);
      }
    }),
    (_.prototype.resort = function () {
      for (var e = this._length, t = Math.ceil(e / 2); 0 <= t; --t)
        this.heapify(t);
    }),
    (_.prototype.insert = function (e) {
      r.Check.defined('element', e);
      var n,
        i = this._array,
        o = this._comparator,
        s = this._maximumLength,
        u = this._length++;
      for (u < i.length ? (i[u] = e) : i.push(e); 0 !== u; ) {
        var a = Math.floor((u - 1) / 2);
        if (!(o(i[u], i[a]) < 0)) break;
        E(i, u, a), (u = a);
      }
      return (
        t.defined(s) &&
          this._length > s &&
          ((n = i[s]), i.pop(), (this._length = s)),
        n
      );
    }),
    (_.prototype.pop = function (e) {
      if (((e = t.defaultValue(e, 0)), 0 !== this._length)) {
        r.Check.typeOf.number.lessThan('index', e, this._length);
        var n = this._array,
          i = n[e];
        return (
          E(n, e, --this._length),
          (n[this._length] = void 0),
          this.heapify(e),
          i
        );
      }
    });
  var C =
    'undefined' != typeof performance &&
    'function' == typeof performance.now &&
    isFinite(performance.now())
      ? function () {
          return performance.now();
        }
      : function () {
          return Date.now();
        };
  function k(e, t) {
    return e.priority - t.priority;
  }
  var I = {
      numberOfAttemptedRequests: 0,
      numberOfActiveRequests: 0,
      numberOfCancelledRequests: 0,
      numberOfCancelledActiveRequests: 0,
      numberOfFailedRequests: 0,
      numberOfActiveRequestsEver: 0,
      lastNumberOfActiveRequests: 0,
      totalRequestTime: 0,
    },
    T = 20,
    S = new _({ comparator: k });
  (S.maximumLength = T), S.reserve(T);
  var U = [],
    x = {},
    P =
      'undefined' != typeof document ? new i(document.location.href) : new i(),
    B = new A();
  function D() {}
  function L(e) {
    t.defined(e.priorityFunction) && (e.priority = e.priorityFunction());
  }
  function K(e) {
    var r = t.defaultValue(D.requestsByServer[e], D.maximumRequestsPerServer);
    return x[e] < r;
  }
  function j(e) {
    return (
      t.defined(e.packKey) || (e.packKey = e.serverKey + '_' + e.providerName),
      e.packKey
    );
  }
  function V(e) {
    return (
      t.defined(e.blockKey) ||
        (e.blockKey =
          e.serverKey +
          '_' +
          e.providerName +
          '_' +
          e.quadKey +
          e.url.substring(e.url.indexOf('dataVersion'))),
      e.blockKey
    );
  }
  function F(e) {
    for (var t = 0, r = e.length; t < r; t++) e[t].state = q.CANCELLED;
  }
  function M(e) {
    for (var t = [], r = {}, n = 0, i = e.length; n < i; n++) {
      var o = e[n];
      if (!o.cancelled) {
        var s = o.quadKey;
        r[s] || ((r[s] = !0), t.push(s));
      }
    }
    return t;
  }
  function N(e) {
    if (e.state === q.UNISSUED)
      if (((e.state = q.ISSUED), e.type === b.PACK || e.type === b.BLOCKPACK)) {
        var r = j(e);
        t.defined(D.packRequestPromise[r]) ||
          (D.packRequestPromise[r] = t.when.defer()),
          (e.deferred = D.packRequestPromise[r]);
      } else e.deferred = t.when.defer();
    return e.deferred.promise;
  }
  function H(e, r) {
    var n,
      i,
      o = N(e);
    return (
      (e.state = q.ACTIVE),
      U.push(e),
      ++I.numberOfActiveRequests,
      ++I.numberOfActiveRequestsEver,
      ++x[e.serverKey],
      (e.startTime = C()),
      e
        .requestFunction(r)
        .then(
          ((i = e),
          function (e) {
            if (
              i.state !== q.CANCELLED &&
              (--I.numberOfActiveRequests,
              --x[i.serverKey],
              B.raiseEvent(),
              (i.state = q.RECEIVED),
              i.deferred.resolve(e),
              (i.endTime = C()),
              (0 < D.statisticRequestTime || i.type !== b.OTHER) &&
                (I.totalRequestTime += i.endTime - i.startTime),
              i.type === b.BLOCK || i.type === b.BLOCKPACK)
            ) {
              var r = V(i);
              t.defined(D.blockDefer[r]) &&
                ((D.blockDefer[r] = void 0), delete D.blockDefer[r]);
            }
          }),
        )
        .otherwise(
          ((n = e),
          function (e) {
            n.state !== q.CANCELLED &&
              (++I.numberOfFailedRequests,
              --I.numberOfActiveRequests,
              --x[n.serverKey],
              B.raiseEvent(e),
              (n.state = q.FAILED),
              n.deferred.reject(e));
          }),
        ),
      o
    );
  }
  function Y(e) {
    var r = e.state === q.ACTIVE;
    (e.state = q.CANCELLED),
      ++I.numberOfCancelledRequests,
      e.deferred.reject(),
      r &&
        (--I.numberOfActiveRequests,
        --x[e.serverKey],
        ++I.numberOfCancelledActiveRequests),
      t.defined(e.cancelFunction) && e.cancelFunction();
  }
  (D.TIMEOUT = 5e3),
    (D.CANCLE_COUNT = 3),
    (D.statisticRequestTime = -1),
    (D.maximumRequests = 50),
    (D.maximumRequestsPerServer = 6),
    (D.perPacketCount = 20),
    (D.requestsByServer = {
      'api.cesium.com:443': 18,
      'assets.cesium.com:443': 18,
    }),
    (D.throttleRequests = !0),
    (D.debugShowStatistics = !1),
    (D.requestCompletedEvent = B),
    Object.defineProperties(D, {
      activeRequestLength: {
        get: function () {
          return U.length;
        },
      },
      statistics: {
        get: function () {
          return I;
        },
      },
      priorityHeapLength: {
        get: function () {
          return T;
        },
        set: function (e) {
          if (e < T) for (; S.length > e; ) Y(S.pop());
          (T = e), (S.maximumLength = e), S.reserve(e);
        },
      },
    }),
    (D.packRequestGroup = {}),
    (D.packRequestPromise = {}),
    (D.packRequestQuadKey = {}),
    (D.quadKeyIndex = {}),
    (D.packRequestHeap = {}),
    (D.blockDefer = {}),
    (D.blockRequest = {}),
    (D.update = function () {
      var e,
        r,
        n = 0,
        o = U.length;
      for (e = 0; e < o; ++e)
        (r = U[e]).cancelled && Y(r),
          r.state === q.ACTIVE ? 0 < n && (U[e - n] = r) : ++n;
      U.length -= n;
      var s = S.internalArray,
        u = S.length;
      for (e = 0; e < u; ++e) L(s[e]);
      S.resort(),
        (function () {
          for (var e in D.packRequestHeap)
            if (D.packRequestHeap.hasOwnProperty(e)) {
              for (
                var t = D.packRequestHeap[e],
                  r = t.internalArray,
                  n = t.length,
                  i = 0;
                i < n;
                ++i
              )
                L(r[i]);
              t.resort();
            }
        })(),
        (function () {
          var e = D.blockRequest;
          for (var t in e) e.hasOwnProperty(t) && H(e[t]);
          D.blockRequest = {};
        })(),
        (function () {
          for (var e in D.packRequestHeap)
            if (D.packRequestHeap.hasOwnProperty(e))
              for (var r = D.packRequestHeap[e]; 0 < r.length; ) {
                var n = r.pop();
                n.cancelled
                  ? Y(n)
                  : ((s = j((o = n))),
                    t.defined(D.packRequestGroup[s]) ||
                      (D.packRequestGroup[s] = []),
                    t.defined(D.packRequestQuadKey[s]) ||
                      (D.packRequestQuadKey[s] = ''),
                    t.defined(D.packRequestPromise[s]) ||
                      (D.packRequestPromise[s] = t.when.defer()),
                    t.defined(D.quadKeyIndex[s]) || (D.quadKeyIndex[s] = 0),
                    (o.quadKeyIndex = D.quadKeyIndex[s]++),
                    (o.deferred = D.packRequestPromise[s]),
                    (o.state = q.ISSUED),
                    D.packRequestGroup[s].push(o),
                    o.deferred.promise);
              }
          var o, s;
          !(function () {
            var e = D.packRequestGroup;
            for (var r in e)
              if (e.hasOwnProperty(r)) {
                var n = e[r];
                if (n.length < 1) continue;
                var o = n[0].clone(),
                  s = -1 !== o.url.indexOf('rest/maps');
                (o.serverKey = n[0].serverKey), (o.state = n[0].state);
                var u = o.url,
                  a = M(n);
                if (a.length < 1) continue;
                D.packRequestQuadKey[r] = s ? a.join(',') : a.join(';');
                var f = D.packRequestQuadKey[r];
                if (o.throttleByServer && !K(o.serverKey)) {
                  F(n), D.packRequestPromise[r].reject();
                  continue;
                }
                o.deferred = D.packRequestPromise[r];
                var c = new i(u);
                (c.query = s
                  ? t.defined(c.query)
                    ? c.query + '&tiles=' + f
                    : 'tiles=' + f
                  : t.defined(c.query)
                  ? c.query + '&extratiles=' + f
                  : 'extratiles=' + f),
                  (o.url = c.toString()),
                  H(o, o.url);
              }
            (D.packRequestGroup = {}),
              (D.packRequestPromise = {}),
              (D.packRequestQuadKey = {}),
              (D.quadKeyIndex = {});
          })();
        })();
      for (
        var a = Math.max(D.maximumRequests - U.length, 0), f = 0;
        f < a && 0 < S.length;

      )
        (r = S.pop()).cancelled
          ? Y(r)
          : !r.throttleByServer || K(r.serverKey)
          ? (H(r), ++f)
          : Y(r);
      D.debugShowStatistics &&
        (0 === I.numberOfActiveRequests &&
          0 < I.lastNumberOfActiveRequests &&
          (0 < I.numberOfAttemptedRequests &&
            (console.log(
              'Number of attempted requests: ' + I.numberOfAttemptedRequests,
            ),
            (I.numberOfAttemptedRequests = 0)),
          0 < I.numberOfCancelledRequests &&
            (console.log(
              'Number of cancelled requests: ' + I.numberOfCancelledRequests,
            ),
            (I.numberOfCancelledRequests = 0)),
          0 < I.numberOfCancelledActiveRequests &&
            (console.log(
              'Number of cancelled active requests: ' +
                I.numberOfCancelledActiveRequests,
            ),
            (I.numberOfCancelledActiveRequests = 0)),
          0 < I.numberOfFailedRequests &&
            (console.log(
              'Number of failed requests: ' + I.numberOfFailedRequests,
            ),
            (I.numberOfFailedRequests = 0))),
        (I.lastNumberOfActiveRequests = I.numberOfActiveRequests));
    }),
    (D.getServerKey = function (e) {
      r.Check.typeOf.string('url', e);
      var n = new i(e).resolve(P);
      n.normalize();
      var o = n.authority;
      /:/.test(o) || (o = o + ':' + ('https' === n.scheme ? '443' : '80'));
      var s = x[o];
      return t.defined(s) || (x[o] = 0), o;
    }),
    (D.request = function (e) {
      if (
        (r.Check.typeOf.object('request', e),
        r.Check.typeOf.string('request.url', e.url),
        r.Check.typeOf.func('request.requestFunction', e.requestFunction),
        g(e.url) || y(e.url))
      )
        return B.raiseEvent(), (e.state = q.RECEIVED), e.requestFunction();
      if (
        (++I.numberOfAttemptedRequests,
        t.defined(e.serverKey) || (e.serverKey = D.getServerKey(e.url)),
        e.type === b.BLOCK)
      )
        return (
          (i = V((n = e))),
          (o = D.blockDefer[i]),
          t.defined(o) ||
            ((o = D.blockDefer[i] = t.when.defer()), (D.blockRequest[i] = n)),
          (n.deferred = o),
          (n.state = q.ISSUED),
          n.deferred.promise
        );
      var n, i, o;
      if (!e.throttleByServer || K(e.serverKey)) {
        if (!D.throttleRequests || !e.throttle) return H(e);
        if (!(U.length >= D.maximumRequests)) {
          var s, u, a;
          if ((L(e), e.type === b.PACK || e.type === b.BLOCKPACK)) {
            var f =
                ((u = j(e)),
                (a = D.packRequestHeap[u]),
                t.defined(a) ||
                  (((a = D.packRequestHeap[u] =
                    new _({ comparator: k })).maximumLength = D.perPacketCount),
                  a.reserve(T)),
                a),
              c = !0;
            if (e.type === b.BLOCKPACK)
              for (var p = 0; p < f.length; p++)
                if (f._array[p].quadKey === e.quadKey) {
                  (e.blockRequest = f._array[p]), (c = !1);
                  break;
                }
            c && (s = f.insert(e));
          } else s = S.insert(e);
          if (t.defined(s)) {
            if (s === e) return;
            Y(s);
          }
          return N(e);
        }
      }
    }),
    (D.clearForSpecs = function () {
      for (; 0 < S.length; ) Y(S.pop());
      for (var e = U.length, t = 0; t < e; ++t) Y(U[t]);
      (U.length = 0),
        (x = {}),
        (I.numberOfAttemptedRequests = 0),
        (I.numberOfActiveRequests = 0),
        (I.numberOfCancelledRequests = 0),
        (I.numberOfCancelledActiveRequests = 0),
        (I.numberOfFailedRequests = 0),
        (I.numberOfActiveRequestsEver = 0),
        (I.lastNumberOfActiveRequests = 0),
        (I.totalRequestTime = 0);
    }),
    (D.numberOfActiveRequestsByServer = function (e) {
      return x[e];
    }),
    (D.requestHeap = S);
  var J = {},
    X = {};
  (J.add = function (e, n) {
    if (!t.defined(e)) throw new r.DeveloperError('host is required.');
    if (!t.defined(n) || n <= 0)
      throw new r.DeveloperError('port is required to be greater than 0.');
    var i = e.toLowerCase() + ':' + n;
    t.defined(X[i]) || (X[i] = !0);
  }),
    (J.remove = function (e, n) {
      if (!t.defined(e)) throw new r.DeveloperError('host is required.');
      if (!t.defined(n) || n <= 0)
        throw new r.DeveloperError('port is required to be greater than 0.');
      var i = e.toLowerCase() + ':' + n;
      t.defined(X[i]) && delete X[i];
    }),
    (J.contains = function (e) {
      if (!t.defined(e)) throw new r.DeveloperError('url is required.');
      var n = (function (e) {
        var r = new i(e);
        r.normalize();
        var n = r.getAuthority();
        if (t.defined(n)) {
          if (
            (-1 !== n.indexOf('@') && (n = n.split('@')[1]),
            -1 === n.indexOf(':'))
          ) {
            var o = r.getScheme();
            if (
              (t.defined(o) ||
                (o = (o = window.location.protocol).substring(0, o.length - 1)),
              'http' === o)
            )
              n += ':80';
            else {
              if ('https' !== o) return;
              n += ':443';
            }
          }
          return n;
        }
      })(e);
      return !(!t.defined(n) || !t.defined(X[n]));
    }),
    (J.clear = function () {
      X = {};
    });
  var z = {};
  function Q(e, n) {
    if (!t.defined(e)) throw new r.DeveloperError('identifier is required.');
    t.defined(z[e]) || ((z[e] = !0), console.warn(t.defaultValue(n, e)));
  }
  (Q.geometryOutlines =
    'Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.'),
    (Q.geometryZIndex =
      'Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored'),
    (Q.geometryHeightReference =
      'Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored'),
    (Q.geometryExtrudedHeightReference =
      'Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored');
  var G,
    W = (function () {
      try {
        var e = new XMLHttpRequest();
        return (
          e.open('GET', '#', !0), (e.responseType = 'blob') === e.responseType
        );
      } catch (e) {
        return !1;
      }
    })();
  function $(e, n, i, o) {
    var s,
      u = e.query;
    if (!t.defined(u) || 0 === u.length) return {};
    if (-1 === u.indexOf('=')) {
      var a = {};
      (a[u] = void 0), (s = a);
    } else
      s = (function (e) {
        if (!t.defined(e))
          throw new r.DeveloperError('queryString is required.');
        var n = {};
        if ('' === e) return n;
        for (
          var i = e.replace(/\+/g, '%20').split(/[&;]/), o = 0, s = i.length;
          o < s;
          ++o
        ) {
          var u = i[o].split('=');
          if (2 < u.length) {
            var a = i[o].indexOf('=');
            u = [i[o].substring(0, a), i[o].substring(a + 1, i[o].length)];
          }
          var f = decodeURIComponent(u[0]),
            c = u[1];
          c = t.defined(c) ? decodeURIComponent(c) : '';
          var p = n[f];
          'string' == typeof p
            ? (n[f] = [p, c])
            : Array.isArray(p)
            ? p.push(c)
            : (n[f] = c);
        }
        return n;
      })(u);
    (n._queryParameters = i ? te(s, n._queryParameters, o) : s),
      (e.query = void 0);
  }
  function Z(e, r) {
    return t.defined(e) ? (t.defined(e.clone) ? e.clone() : p(e)) : r;
  }
  function ee(e) {
    if (e.state === q.ISSUED || e.state === q.ACTIVE)
      throw new n.RuntimeError('The Resource is already being fetched.');
    (e.state = q.UNISSUED), (e.deferred = void 0);
  }
  function te(e, r, n) {
    if (!n) return d(e, r);
    var i = p(e, !0);
    for (var o in r)
      if (r.hasOwnProperty(o)) {
        var s = i[o],
          u = r[o];
        t.defined(s)
          ? (Array.isArray(s) || (s = i[o] = [s]), (i[o] = s.concat(u)))
          : (i[o] = Array.isArray(u) ? u.slice() : u);
      }
    return i;
  }
  function re(e) {
    'string' == typeof (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)) &&
      (e = { url: e }),
      r.Check.typeOf.string('options.url', e.url),
      (this._url = void 0),
      (this._templateValues = Z(e.templateValues, {})),
      (this._queryParameters = Z(e.queryParameters, {})),
      (this.headers = Z(e.headers, {})),
      (this.request = t.defaultValue(e.request, new w())),
      (this.proxy = e.proxy),
      (this.retryCallback = e.retryCallback),
      (this.retryAttempts = t.defaultValue(e.retryAttempts, 0)),
      (this._retryCount = 0);
    var n = new i(e.url);
    $(n, this, !0, !0), (n.fragment = void 0), (this._url = n.toString());
  }
  function ne(e) {
    var r = e.resource,
      n = e.flipY,
      i = e.preferImageBitmap,
      o = r.request;
    (o.url = r.url),
      (o.requestFunction = function () {
        var e = !1;
        r.isDataUri || r.isBlobUri || (e = r.isCrossOriginUrl);
        var s = t.when.defer();
        return re._Implementations.createImage(o, e, s, n, i), s.promise;
      });
    var s = D.request(o);
    if (t.defined(s))
      return s.otherwise(function (e) {
        return o.state !== q.FAILED
          ? t.when.reject(e)
          : r.retryOnError(e).then(function (s) {
              return s
                ? ((o.state = q.UNISSUED),
                  (o.deferred = void 0),
                  ne({ resource: r, flipY: n, preferImageBitmap: i }))
                : t.when.reject(e);
            });
      });
  }
  (re.createIfNeeded = function (e) {
    return e instanceof re
      ? e.getDerivedResource({ request: e.request })
      : 'string' != typeof e
      ? e
      : new re({ url: e });
  }),
    (re.supportsImageBitmapOptions = function () {
      return t.defined(G)
        ? G
        : (G =
            'function' != typeof createImageBitmap
              ? t.when.resolve(!1)
              : re
                  .fetchBlob({
                    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg==',
                  })
                  .then(function (e) {
                    return createImageBitmap(e, {
                      imageOrientation: 'flipY',
                      premultiplyAlpha: 'none',
                    });
                  })
                  .then(function (e) {
                    return !0;
                  })
                  .otherwise(function () {
                    return !1;
                  }));
    }),
    Object.defineProperties(re, {
      isBlobSupported: {
        get: function () {
          return W;
        },
      },
    }),
    Object.defineProperties(re.prototype, {
      queryParameters: {
        get: function () {
          return this._queryParameters;
        },
      },
      templateValues: {
        get: function () {
          return this._templateValues;
        },
      },
      url: {
        get: function () {
          return this.getUrlComponent(!0, !0);
        },
        set: function (e) {
          var t = new i(e);
          $(t, this, !1), (t.fragment = void 0), (this._url = t.toString());
        },
      },
      extension: {
        get: function () {
          return (function (e) {
            if (!t.defined(e)) throw new r.DeveloperError('uri is required.');
            var n = new i(e);
            n.normalize();
            var o = n.path,
              s = o.lastIndexOf('/');
            return (
              -1 !== s && (o = o.substr(s + 1)),
              -1 === (s = o.lastIndexOf('.')) ? '' : o.substr(s + 1)
            );
          })(this._url);
        },
      },
      isDataUri: {
        get: function () {
          return g(this._url);
        },
      },
      isBlobUri: {
        get: function () {
          return y(this._url);
        },
      },
      isCrossOriginUrl: {
        get: function () {
          return (function (e) {
            t.defined(l) || (l = document.createElement('a')),
              (l.href = window.location.href);
            var r = l.host,
              n = l.protocol;
            return (
              (l.href = e), (l.href = l.href), n !== l.protocol || r !== l.host
            );
          })(this._url);
        },
      },
      hasHeaders: {
        get: function () {
          return 0 < Object.keys(this.headers).length;
        },
      },
    }),
    (re.prototype.getUrlComponent = function (e, n) {
      if (this.isDataUri) return this._url;
      var o = new i(this._url);
      e &&
        (function (e, n) {
          var i = n._queryParameters,
            o = Object.keys(i);
          1 !== o.length || t.defined(i[o[0]])
            ? (e.query = (function (e, n) {
                if (!t.defined(e))
                  throw new r.DeveloperError('obj is required.');
                var i = '';
                for (var o in e)
                  if (e.hasOwnProperty(o)) {
                    var s = e[o],
                      u = encodeURIComponent(o) + '=';
                    if (Array.isArray(s))
                      for (var a = 0, f = s.length; a < f; ++a)
                        i += u + encodeURIComponent(s[a]) + '&';
                    else i += u + encodeURIComponent(s) + '&';
                  }
                return i.slice(0, -1);
              })(i))
            : (e.query = o[0]);
        })(o, this);
      var s = o.toString().replace(/%7B/g, '{').replace(/%7D/g, '}'),
        u = this._templateValues;
      return (
        (s = s.replace(/{(.*?)}/g, function (e, r) {
          var n = u[r];
          return t.defined(n) ? encodeURIComponent(n) : e;
        })),
        n && t.defined(this.proxy) && (s = this.proxy.getURL(s)),
        s
      );
    }),
    (re.prototype.setQueryParameters = function (e, t) {
      this._queryParameters = t
        ? te(this._queryParameters, e, !1)
        : te(e, this._queryParameters, !1);
    }),
    (re.prototype.appendQueryParameters = function (e) {
      this._queryParameters = te(e, this._queryParameters, !0);
    }),
    (re.prototype.setTemplateValues = function (e, t) {
      this._templateValues = t
        ? d(this._templateValues, e)
        : d(e, this._templateValues);
    }),
    (re.prototype.getDerivedResource = function (e) {
      var r = this.clone();
      if (((r._retryCount = 0), t.defined(e.url))) {
        var n = new i(e.url);
        $(n, r, !0, t.defaultValue(e.preserveQueryParameters, !1)),
          (n.fragment = void 0),
          (r._url = n.resolve(new i(h(this._url))).toString());
      }
      return (
        t.defined(e.queryParameters) &&
          (r._queryParameters = d(e.queryParameters, r._queryParameters)),
        t.defined(e.templateValues) &&
          (r._templateValues = d(e.templateValues, r.templateValues)),
        t.defined(e.headers) && (r.headers = d(e.headers, r.headers)),
        t.defined(e.proxy) && (r.proxy = e.proxy),
        t.defined(e.request) && (r.request = e.request),
        t.defined(e.retryCallback) && (r.retryCallback = e.retryCallback),
        t.defined(e.retryAttempts) && (r.retryAttempts = e.retryAttempts),
        r
      );
    }),
    (re.prototype.retryOnError = function (e) {
      var r = this.retryCallback;
      if ('function' != typeof r || this._retryCount >= this.retryAttempts)
        return t.when(!1);
      var n = this;
      return t.when(r(this, e)).then(function (e) {
        return ++n._retryCount, e;
      });
    }),
    (re.prototype.clone = function (e) {
      return (
        t.defined(e) || (e = new re({ url: this._url })),
        (e._url = this._url),
        (e._queryParameters = p(this._queryParameters)),
        (e._templateValues = p(this._templateValues)),
        (e.headers = p(this.headers)),
        (e.proxy = this.proxy),
        (e.retryCallback = this.retryCallback),
        (e.retryAttempts = this.retryAttempts),
        (e._retryCount = 0),
        (e.request = this.request.clone()),
        e
      );
    }),
    (re.prototype.getBaseUri = function (e) {
      return (function (e, n) {
        if (!t.defined(e)) throw new r.DeveloperError('uri is required.');
        var o = '',
          s = e.lastIndexOf('/');
        return (
          -1 !== s && (o = e.substring(0, s + 1)),
          n &&
            ((e = new i(e)),
            t.defined(e.query) && (o += '?' + e.query),
            t.defined(e.fragment) && (o += '#' + e.fragment)),
          o
        );
      })(this.getUrlComponent(e), e);
    }),
    (re.prototype.appendForwardSlash = function () {
      var e;
      this._url =
        ((0 !== (e = this._url).length && '/' === e[e.length - 1]) ||
          (e += '/'),
        e);
    }),
    (re.prototype.fetchArrayBuffer = function () {
      return this.fetch({ responseType: 'arraybuffer' });
    }),
    (re.fetchArrayBuffer = function (e) {
      return new re(e).fetchArrayBuffer();
    }),
    (re.prototype.fetchBlob = function () {
      return this.fetch({ responseType: 'blob' });
    }),
    (re.fetchBlob = function (e) {
      return new re(e).fetchBlob();
    }),
    (re.prototype.fetchImage = function (e) {
      e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT);
      var r = t.defaultValue(e.preferImageBitmap, !1),
        n = t.defaultValue(e.preferBlob, !1),
        i = t.defaultValue(e.flipY, !1);
      if (
        (ee(this.request),
        !W || this.isDataUri || this.isBlobUri || (!this.hasHeaders && !n))
      )
        return ne({ resource: this, flipY: i, preferImageBitmap: r });
      var o,
        s,
        u,
        a = this.fetchBlob();
      return t.defined(a)
        ? re
            .supportsImageBitmapOptions()
            .then(function (e) {
              return (o = e && r), a;
            })
            .then(function (e) {
              if (t.defined(e)) {
                if (((u = e), o))
                  return re.createImageBitmapFromBlob(e, {
                    flipY: i,
                    premultiplyAlpha: !1,
                  });
                var r = window.URL.createObjectURL(e);
                return ne({
                  resource: (s = new re({ url: r })),
                  flipY: i,
                  preferImageBitmap: !1,
                });
              }
            })
            .then(function (e) {
              if (t.defined(e))
                return (e.blob = u), o || window.URL.revokeObjectURL(s.url), e;
            })
            .otherwise(function (e) {
              return (
                t.defined(s) && window.URL.revokeObjectURL(s.url),
                (e.blob = u),
                t.when.reject(e)
              );
            })
        : void 0;
    }),
    (re.fetchImage = function (e) {
      return new re(e).fetchImage({
        flipY: e.flipY,
        preferBlob: e.preferBlob,
        preferImageBitmap: e.preferImageBitmap,
      });
    }),
    (re.prototype.fetchText = function () {
      return this.fetch({ responseType: 'text' });
    }),
    (re.fetchText = function (e) {
      return new re(e).fetchText();
    }),
    (re.prototype.fetchJson = function () {
      var e = this.fetch({
        responseType: 'text',
        headers: { Accept: 'application/json,*/*;q=0.01' },
      });
      if (t.defined(e))
        return e.then(function (e) {
          if (t.defined(e)) return JSON.parse(e);
        });
    }),
    (re.fetchJson = function (e) {
      return new re(e).fetchJson();
    }),
    (re.prototype.fetchXML = function () {
      return this.fetch({
        responseType: 'document',
        overrideMimeType: 'text/xml',
      });
    }),
    (re.fetchXML = function (e) {
      return new re(e).fetchXML();
    }),
    (re.prototype.fetchJsonp = function (e) {
      var r;
      for (
        e = t.defaultValue(e, 'callback'), ee(this.request);
        (r = 'loadJsonp' + Math.random().toString().substring(2, 8)),
          t.defined(window[r]);

      );
      return (function e(r, n, i) {
        var o = {};
        (o[n] = i), r.setQueryParameters(o);
        var s = r.request;
        (s.url = r.url),
          (s.requestFunction = function () {
            var e = t.when.defer();
            return (
              (window[i] = function (t) {
                e.resolve(t);
                try {
                  delete window[i];
                } catch (t) {
                  window[i] = void 0;
                }
              }),
              re._Implementations.loadAndExecuteScript(r.url, i, e),
              e.promise
            );
          });
        var u = D.request(s);
        if (t.defined(u))
          return u.otherwise(function (o) {
            return s.state !== q.FAILED
              ? t.when.reject(o)
              : r.retryOnError(o).then(function (u) {
                  return u
                    ? ((s.state = q.UNISSUED),
                      (s.deferred = void 0),
                      e(r, n, i))
                    : t.when.reject(o);
                });
          });
      })(this, e, r);
    }),
    (re.fetchJsonp = function (e) {
      return new re(e).fetchJsonp(e.callbackParameterName);
    }),
    (re.prototype._makeRequest = function (e) {
      var r = this;
      ee(r.request);
      var n = r.request;
      (n.url = r.url),
        (n.requestFunction = function (i) {
          var o = e.responseType,
            s = d(e.headers, r.headers),
            u = e.overrideMimeType,
            a = e.method,
            f = e.data,
            c = t.when.defer(),
            p = t.defined(i) ? i : r.url,
            h = re._Implementations.loadWithXhr(p, o, a, f, s, c, u);
          return (
            t.defined(h) &&
              t.defined(h.abort) &&
              (n.cancelFunction = function () {
                h.abort();
              }),
            c.promise
          );
        });
      var i = D.request(n);
      if (t.defined(i))
        return i
          .then(function (e) {
            return e;
          })
          .otherwise(function (i) {
            return n.state !== q.FAILED
              ? t.when.reject(i)
              : r.retryOnError(i).then(function (o) {
                  return o
                    ? ((n.state = q.UNISSUED),
                      (n.deferred = void 0),
                      r.fetch(e))
                    : t.when.reject(i);
                });
          });
    });
  var ie = /^data:(.*?)(;base64)?,(.*)$/;
  function oe(e, t) {
    var r = decodeURIComponent(t);
    return e ? atob(r) : r;
  }
  function se(e, t) {
    for (
      var r = oe(e, t),
        n = new ArrayBuffer(r.length),
        i = new Uint8Array(n),
        o = 0;
      o < r.length;
      o++
    )
      i[o] = r.charCodeAt(o);
    return n;
  }
  function ue(e, t) {
    switch (t) {
      case 'text':
        return e.toString('utf8');
      case 'json':
        return JSON.parse(e.toString('utf8'));
      default:
        return new Uint8Array(e).buffer;
    }
  }
  (re.prototype.fetch = function (e) {
    return ((e = Z(e, {})).method = 'GET'), this._makeRequest(e);
  }),
    (re.fetch = function (e) {
      return new re(e).fetch({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (re.prototype.delete = function (e) {
      return ((e = Z(e, {})).method = 'DELETE'), this._makeRequest(e);
    }),
    (re.delete = function (e) {
      return new re(e).delete({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
        data: e.data,
      });
    }),
    (re.prototype.head = function (e) {
      return ((e = Z(e, {})).method = 'HEAD'), this._makeRequest(e);
    }),
    (re.head = function (e) {
      return new re(e).head({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (re.prototype.options = function (e) {
      return ((e = Z(e, {})).method = 'OPTIONS'), this._makeRequest(e);
    }),
    (re.options = function (e) {
      return new re(e).options({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (re.prototype.post = function (e, t) {
      return (
        r.Check.defined('data', e),
        ((t = Z(t, {})).method = 'POST'),
        (t.data = e),
        this._makeRequest(t)
      );
    }),
    (re.post = function (e) {
      return new re(e).post(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (re.prototype.put = function (e, t) {
      return (
        r.Check.defined('data', e),
        ((t = Z(t, {})).method = 'PUT'),
        (t.data = e),
        this._makeRequest(t)
      );
    }),
    (re.put = function (e) {
      return new re(e).put(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    (re.prototype.patch = function (e, t) {
      return (
        r.Check.defined('data', e),
        ((t = Z(t, {})).method = 'PATCH'),
        (t.data = e),
        this._makeRequest(t)
      );
    }),
    (re.patch = function (e) {
      return new re(e).patch(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
      });
    }),
    ((re._Implementations = {}).createImage = function (e, r, i, o, s) {
      var u = e.url;
      re.supportsImageBitmapOptions()
        .then(function (a) {
          if (!a || !s)
            return (
              (f = u),
              (c = r),
              (p = i),
              ((d = new Image()).onload = function () {
                p.resolve(d);
              }),
              (d.onerror = function (e) {
                p.reject(e);
              }),
              c &&
                (J.contains(f)
                  ? (d.crossOrigin = 'use-credentials')
                  : (d.crossOrigin = '')),
              void (d.src = f)
            );
          var f,
            c,
            p,
            d,
            h = t.when.defer(),
            l = re._Implementations.loadWithXhr(
              u,
              'blob',
              'GET',
              void 0,
              void 0,
              h,
              void 0,
              void 0,
              void 0,
            );
          return (
            t.defined(l) &&
              t.defined(l.abort) &&
              (e.cancelFunction = function () {
                l.abort();
              }),
            h.promise
              .then(function (e) {
                if (t.defined(e))
                  return re.createImageBitmapFromBlob(e, {
                    flipY: o,
                    premultiplyAlpha: !1,
                  });
                i.reject(
                  new n.RuntimeError(
                    'Successfully retrieved ' +
                      u +
                      ' but it contained no content.',
                  ),
                );
              })
              .then(i.resolve)
          );
        })
        .otherwise(i.reject);
    }),
    (re.createImageBitmapFromBlob = function (e, t) {
      return (
        r.Check.defined('options', t),
        r.Check.typeOf.bool('options.flipY', t.flipY),
        r.Check.typeOf.bool('options.premultiplyAlpha', t.premultiplyAlpha),
        createImageBitmap(e, {
          imageOrientation: t.flipY ? 'flipY' : 'none',
          premultiplyAlpha: t.premultiplyAlpha ? 'premultiply' : 'none',
        })
      );
    });
  var ae = 'undefined' == typeof XMLHttpRequest;
  (re._Implementations.loadWithXhr = function (e, i, o, s, u, a, f) {
    var c = ie.exec(e);
    if (null === c) {
      if (ae)
        return (
          (p = e),
          (d = i),
          (h = o),
          (l = u),
          (m = a),
          (v =
            'https:' === (y = require('url').parse(p)).protocol
              ? require('https')
              : require('http')),
          (g = require('zlib')),
          (q = {
            protocol: y.protocol,
            hostname: y.hostname,
            port: y.port,
            path: y.path,
            query: y.query,
            method: h,
            headers: l,
          }),
          void v
            .request(q)
            .on('response', function (e) {
              if (e.statusCode < 200 || 300 <= e.statusCode)
                m.reject(new R(e.statusCode, e, e.headers));
              else {
                var t = [];
                e.on('data', function (e) {
                  t.push(e);
                }),
                  e.on('end', function () {
                    var r = Buffer.concat(t);
                    'gzip' === e.headers['content-encoding']
                      ? g.gunzip(r, function (e, t) {
                          e
                            ? m.reject(
                                new n.RuntimeError(
                                  'Error decompressing response.',
                                ),
                              )
                            : m.resolve(ue(t, d));
                        })
                      : m.resolve(ue(r, d));
                  });
              }
            })
            .on('error', function (e) {
              m.reject(new R());
            })
            .end()
        );
      var p,
        d,
        h,
        l,
        m,
        y,
        v,
        g,
        q,
        b = new XMLHttpRequest();
      if (
        (J.contains(e) && (b.withCredentials = !0),
        (e = e.replace(/{/g, '%7B').replace(/}/g, '%7D')),
        b.open(o, e, !0),
        t.defined(f) && t.defined(b.overrideMimeType) && b.overrideMimeType(f),
        t.defined(u))
      )
        for (var w in u) u.hasOwnProperty(w) && b.setRequestHeader(w, u[w]);
      t.defined(i) && (b.responseType = i);
      var A = !1;
      return (
        'string' == typeof e &&
          (A =
            0 === e.indexOf('file://') ||
            ('undefined' != typeof window &&
              'file://' === window.location.origin)),
        (b.onload = function () {
          if (!(b.status < 200 || 300 <= b.status) || (A && 0 === b.status)) {
            var e = b.response,
              r = b.responseType;
            if ('HEAD' === o || 'OPTIONS' === o) {
              var s = b
                  .getAllResponseHeaders()
                  .trim()
                  .split(/[\r\n]+/),
                u = {};
              return (
                s.forEach(function (e) {
                  var t = e.split(': '),
                    r = t.shift();
                  u[r] = t.join(': ');
                }),
                void a.resolve(u)
              );
            }
            if (204 === b.status) a.resolve();
            else if (!t.defined(e) || (t.defined(i) && r !== i))
              if ('json' === i && 'string' == typeof e)
                try {
                  a.resolve(JSON.parse(e));
                } catch (e) {
                  a.reject(e);
                }
              else
                ('' === r || 'document' === r) &&
                t.defined(b.responseXML) &&
                b.responseXML.hasChildNodes()
                  ? a.resolve(b.responseXML)
                  : ('' !== r && 'text' !== r) || !t.defined(b.responseText)
                  ? a.reject(
                      new n.RuntimeError(
                        'Invalid XMLHttpRequest response type.',
                      ),
                    )
                  : a.resolve(b.responseText);
            else a.resolve(e);
          } else
            a.reject(new R(b.status, b.response, b.getAllResponseHeaders()));
        }),
        (b.onerror = function (e) {
          a.reject(new R());
        }),
        b.send(s),
        b
      );
    }
    a.resolve(
      (function (e, n) {
        n = t.defaultValue(n, '');
        var i = e[1],
          o = !!e[2],
          s = e[3];
        switch (n) {
          case '':
          case 'text':
            return oe(o, s);
          case 'arraybuffer':
            return se(o, s);
          case 'blob':
            var u = se(o, s);
            return new Blob([u], { type: i });
          case 'document':
            return new DOMParser().parseFromString(oe(o, s), i);
          case 'json':
            return JSON.parse(oe(o, s));
          default:
            throw new r.DeveloperError('Unhandled responseType: ' + n);
        }
      })(c, i),
    );
  }),
    (re._Implementations.loadAndExecuteScript = function (e, r, n) {
      return (function (e) {
        var r = t.when.defer(),
          n = document.createElement('script');
        (n.async = !0), (n.src = e);
        var i = document.getElementsByTagName('head')[0];
        return (
          (n.onload = function () {
            (n.onload = void 0), i.removeChild(n), r.resolve();
          }),
          (n.onerror = function (e) {
            r.reject(e);
          }),
          i.appendChild(n),
          r.promise
        );
      })(e).otherwise(n.reject);
    }),
    ((re._DefaultImplementations = {}).createImage =
      re._Implementations.createImage),
    (re._DefaultImplementations.loadWithXhr = re._Implementations.loadWithXhr),
    (re._DefaultImplementations.loadAndExecuteScript =
      re._Implementations.loadAndExecuteScript),
    (re.DEFAULT = Object.freeze(
      new re({
        url:
          'undefined' == typeof document
            ? ''
            : document.location.href.split('?')[0],
      }),
    ));
  var fe,
    ce,
    pe,
    de = /((?:.*\/)|^)Cesium\.js$/;
  function he(e) {
    return 'undefined' == typeof document
      ? e
      : (t.defined(fe) || (fe = document.createElement('a')),
        (fe.href = e),
        (fe.href = fe.href),
        fe.href);
  }
  function le() {
    if (t.defined(ce)) return ce;
    var e;
    if (
      ((e =
        'undefined' != typeof CESIUM_BASE_URL
          ? CESIUM_BASE_URL
          : 'object' == typeof define &&
            t.defined(define.amd) &&
            !define.amd.toUrlUndefined &&
            t.defined(require.toUrl)
          ? h('..', ve('Core/buildModuleUrl.js'))
          : (function () {
              for (
                var e = document.getElementsByTagName('script'),
                  t = 0,
                  r = e.length;
                t < r;
                ++t
              ) {
                var n = e[t].getAttribute('src'),
                  i = de.exec(n);
                if (null !== i) return i[1];
              }
            })()),
      !t.defined(e))
    )
      throw new r.DeveloperError(
        'Unable to determine Cesium base URL automatically, try defining a global variable called CESIUM_BASE_URL.',
      );
    return (ce = new re({ url: he(e) })).appendForwardSlash(), ce;
  }
  function me(e) {
    return he(require.toUrl('../' + e));
  }
  function ye(e) {
    return le().getDerivedResource({ url: e }).url;
  }
  function ve(e) {
    return (
      t.defined(pe) ||
        (pe =
          'object' == typeof define &&
          t.defined(define.amd) &&
          !define.amd.toUrlUndefined &&
          t.defined(require.toUrl)
            ? me
            : ye),
      pe(e)
    );
  }
  (ve._cesiumScriptRegex = de),
    (ve._buildModuleUrlFromBaseUrl = ye),
    (ve._clearBaseResource = function () {
      ce = void 0;
    }),
    (ve.setBaseUrl = function (e) {
      ce = re.DEFAULT.getDerivedResource({ url: e });
    }),
    (ve.getCesiumBaseUrl = le),
    (e.Resource = re),
    (e.buildModuleUrl = ve),
    (e.deprecationWarning = function (e, n) {
      if (!t.defined(e) || !t.defined(n))
        throw new r.DeveloperError('identifier and message are required.');
      Q(e, n);
    }),
    (e.oneTimeWarning = Q);
});
