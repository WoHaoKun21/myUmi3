/* @preserve
 * Leaflet 1.8.0, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2022 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
!(function (t, i) {
  'object' == typeof exports && 'undefined' != typeof module
    ? i(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], i)
    : i(
        ((t =
          'undefined' != typeof globalThis ? globalThis : t || self).leaflet =
          {}),
      );
})(this, function (t) {
  'use strict';
  function l(t) {
    for (var i, e, n = 1, o = arguments.length; n < o; n++)
      for (i in (e = arguments[n])) t[i] = e[i];
    return t;
  }
  var R =
    Object.create ||
    function (t) {
      return (N.prototype = t), new N();
    };
  function N() {}
  function a(t, i) {
    var e = Array.prototype.slice;
    if (t.bind) return t.bind.apply(t, e.call(arguments, 1));
    var n = e.call(arguments, 2);
    return function () {
      return t.apply(i, n.length ? n.concat(e.call(arguments)) : arguments);
    };
  }
  var D = 0;
  function h(t) {
    return '_leaflet_id' in t || (t._leaflet_id = ++D), t._leaflet_id;
  }
  function j(t, i, e) {
    var n,
      o,
      s = function () {
        (n = !1), o && (r.apply(e, o), (o = !1));
      },
      r = function () {
        n
          ? (o = arguments)
          : (t.apply(e, arguments), setTimeout(s, i), (n = !0));
      };
    return r;
  }
  function H(t, i, e) {
    var n = i[1],
      i = i[0],
      o = n - i;
    return t === n && e ? t : ((((t - i) % o) + o) % o) + i;
  }
  function u() {
    return !1;
  }
  function e(t, i) {
    if (!1 === i) return t;
    i = Math.pow(10, void 0 === i ? 6 : i);
    return Math.round(t * i) / i;
  }
  function W(t) {
    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '');
  }
  function F(t) {
    return W(t).split(/\s+/);
  }
  function c(t, i) {
    for (var e in (Object.prototype.hasOwnProperty.call(t, 'options') ||
      (t.options = t.options ? R(t.options) : {}),
    i))
      t.options[e] = i[e];
    return t.options;
  }
  function U(t, i, e) {
    var n,
      o = [];
    for (n in t)
      o.push(
        encodeURIComponent(e ? n.toUpperCase() : n) +
          '=' +
          encodeURIComponent(t[n]),
      );
    return (i && -1 !== i.indexOf('?') ? '&' : '?') + o.join('&');
  }
  var V = /\{ *([\w_ -]+) *\}/g;
  function q(t, e) {
    return t.replace(V, function (t, i) {
      i = e[i];
      if (void 0 === i) throw new Error('No value provided for variable ' + t);
      return (i = 'function' == typeof i ? i(e) : i);
    });
  }
  var d =
    Array.isArray ||
    function (t) {
      return '[object Array]' === Object.prototype.toString.call(t);
    };
  function G(t, i) {
    for (var e = 0; e < t.length; e++) if (t[e] === i) return e;
    return -1;
  }
  var K = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  function Y(t) {
    return window['webkit' + t] || window['moz' + t] || window['ms' + t];
  }
  var X = 0;
  function J(t) {
    var i = +new Date(),
      e = Math.max(0, 16 - (i - X));
    return (X = i + e), window.setTimeout(t, e);
  }
  var $ = window.requestAnimationFrame || Y('RequestAnimationFrame') || J,
    Q =
      window.cancelAnimationFrame ||
      Y('CancelAnimationFrame') ||
      Y('CancelRequestAnimationFrame') ||
      function (t) {
        window.clearTimeout(t);
      };
  function x(t, i, e) {
    if (!e || $ !== J) return $.call(window, a(t, i));
    t.call(i);
  }
  function r(t) {
    t && Q.call(window, t);
  }
  var tt = {
    __proto__: null,
    extend: l,
    create: R,
    bind: a,
    get lastId() {
      return D;
    },
    stamp: h,
    throttle: j,
    wrapNum: H,
    falseFn: u,
    formatNum: e,
    trim: W,
    splitWords: F,
    setOptions: c,
    getParamString: U,
    template: q,
    isArray: d,
    indexOf: G,
    emptyImageUrl: K,
    requestFn: $,
    cancelFn: Q,
    requestAnimFrame: x,
    cancelAnimFrame: r,
  };
  function it() {}
  (it.extend = function (t) {
    function i() {
      c(this),
        this.initialize && this.initialize.apply(this, arguments),
        this.callInitHooks();
    }
    var e,
      n = (i.__super__ = this.prototype),
      o = R(n);
    for (e in (((o.constructor = i).prototype = o), this))
      Object.prototype.hasOwnProperty.call(this, e) &&
        'prototype' !== e &&
        '__super__' !== e &&
        (i[e] = this[e]);
    if ((t.statics && l(i, t.statics), t.includes)) {
      var s = t.includes;
      if ('undefined' != typeof L && L && L.Mixin) {
        s = d(s) ? s : [s];
        for (var r = 0; r < s.length; r++)
          s[r] === L.Mixin.Events &&
            console.warn(
              'Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.',
              new Error().stack,
            );
      }
      l.apply(null, [o].concat(t.includes));
    }
    return (
      l(o, t),
      delete o.statics,
      delete o.includes,
      o.options &&
        ((o.options = n.options ? R(n.options) : {}), l(o.options, t.options)),
      (o._initHooks = []),
      (o.callInitHooks = function () {
        if (!this._initHooksCalled) {
          n.callInitHooks && n.callInitHooks.call(this),
            (this._initHooksCalled = !0);
          for (var t = 0, i = o._initHooks.length; t < i; t++)
            o._initHooks[t].call(this);
        }
      }),
      i
    );
  }),
    (it.include = function (t) {
      var i = this.prototype.options;
      return (
        l(this.prototype, t),
        t.options &&
          ((this.prototype.options = i), this.mergeOptions(t.options)),
        this
      );
    }),
    (it.mergeOptions = function (t) {
      return l(this.prototype.options, t), this;
    }),
    (it.addInitHook = function (t) {
      var i = Array.prototype.slice.call(arguments, 1),
        e =
          'function' == typeof t
            ? t
            : function () {
                this[t].apply(this, i);
              };
      return (
        (this.prototype._initHooks = this.prototype._initHooks || []),
        this.prototype._initHooks.push(e),
        this
      );
    });
  var i = {
      on: function (t, i, e) {
        if ('object' == typeof t) for (var n in t) this._on(n, t[n], i);
        else
          for (var o = 0, s = (t = F(t)).length; o < s; o++)
            this._on(t[o], i, e);
        return this;
      },
      off: function (t, i, e) {
        if (arguments.length)
          if ('object' == typeof t) for (var n in t) this._off(n, t[n], i);
          else {
            t = F(t);
            for (
              var o = 1 === arguments.length, s = 0, r = t.length;
              s < r;
              s++
            )
              o ? this._off(t[s]) : this._off(t[s], i, e);
          }
        else delete this._events;
        return this;
      },
      _on: function (t, i, e) {
        if ('function' != typeof i)
          console.warn('wrong listener type: ' + typeof i);
        else {
          this._events = this._events || {};
          for (
            var n = this._events[t],
              t =
                (n || (this._events[t] = n = []),
                { fn: i, ctx: (e = e === this ? void 0 : e) }),
              o = n,
              s = 0,
              r = o.length;
            s < r;
            s++
          )
            if (o[s].fn === i && o[s].ctx === e) return;
          o.push(t);
        }
      },
      _off: function (t, i, e) {
        var n, o, s;
        if (this._events && (n = this._events[t]))
          if (1 === arguments.length) {
            if (this._firingCount)
              for (o = 0, s = n.length; o < s; o++) n[o].fn = u;
            delete this._events[t];
          } else if ((e === this && (e = void 0), 'function' != typeof i))
            console.warn('wrong listener type: ' + typeof i);
          else {
            for (o = 0, s = n.length; o < s; o++) {
              var r = n[o];
              if (r.ctx === e && r.fn === i)
                return (
                  this._firingCount &&
                    ((r.fn = u), (this._events[t] = n = n.slice())),
                  void n.splice(o, 1)
                );
            }
            console.warn('listener not found');
          }
      },
      fire: function (t, i, e) {
        if (!this.listens(t, e)) return this;
        var n = l({}, i, {
          type: t,
          target: this,
          sourceTarget: (i && i.sourceTarget) || this,
        });
        if (this._events) {
          var o = this._events[t];
          if (o) {
            this._firingCount = this._firingCount + 1 || 1;
            for (var s = 0, r = o.length; s < r; s++) {
              var a = o[s];
              a.fn.call(a.ctx || this, n);
            }
            this._firingCount--;
          }
        }
        return e && this._propagateEvent(n), this;
      },
      listens: function (t, i) {
        'string' != typeof t && console.warn('"string" type argument expected');
        var e = this._events && this._events[t];
        if (e && e.length) return !0;
        if (i)
          for (var n in this._eventParents)
            if (this._eventParents[n].listens(t, i)) return !0;
        return !1;
      },
      once: function (t, i, e) {
        if ('object' == typeof t) {
          for (var n in t) this.once(n, t[n], i);
          return this;
        }
        var o = a(function () {
          this.off(t, i, e).off(t, o, e);
        }, this);
        return this.on(t, i, e).on(t, o, e);
      },
      addEventParent: function (t) {
        return (
          (this._eventParents = this._eventParents || {}),
          (this._eventParents[h(t)] = t),
          this
        );
      },
      removeEventParent: function (t) {
        return this._eventParents && delete this._eventParents[h(t)], this;
      },
      _propagateEvent: function (t) {
        for (var i in this._eventParents)
          this._eventParents[i].fire(
            t.type,
            l({ layer: t.target, propagatedFrom: t.target }, t),
            !0,
          );
      },
    },
    et =
      ((i.addEventListener = i.on),
      (i.removeEventListener = i.clearAllEventListeners = i.off),
      (i.addOneTimeEventListener = i.once),
      (i.fireEvent = i.fire),
      (i.hasEventListeners = i.listens),
      it.extend(i));
  function p(t, i, e) {
    (this.x = e ? Math.round(t) : t), (this.y = e ? Math.round(i) : i);
  }
  var nt =
    Math.trunc ||
    function (t) {
      return 0 < t ? Math.floor(t) : Math.ceil(t);
    };
  function _(t, i, e) {
    return t instanceof p
      ? t
      : d(t)
      ? new p(t[0], t[1])
      : null == t
      ? t
      : 'object' == typeof t && 'x' in t && 'y' in t
      ? new p(t.x, t.y)
      : new p(t, i, e);
  }
  function m(t, i) {
    if (t)
      for (var e = i ? [t, i] : t, n = 0, o = e.length; n < o; n++)
        this.extend(e[n]);
  }
  function f(t, i) {
    return !t || t instanceof m ? t : new m(t, i);
  }
  function s(t, i) {
    if (t)
      for (var e = i ? [t, i] : t, n = 0, o = e.length; n < o; n++)
        this.extend(e[n]);
  }
  function g(t, i) {
    return t instanceof s ? t : new s(t, i);
  }
  function v(t, i, e) {
    if (isNaN(t) || isNaN(i))
      throw new Error('Invalid LatLng object: (' + t + ', ' + i + ')');
    (this.lat = +t), (this.lng = +i), void 0 !== e && (this.alt = +e);
  }
  function w(t, i, e) {
    return t instanceof v
      ? t
      : d(t) && 'object' != typeof t[0]
      ? 3 === t.length
        ? new v(t[0], t[1], t[2])
        : 2 === t.length
        ? new v(t[0], t[1])
        : null
      : null == t
      ? t
      : 'object' == typeof t && 'lat' in t
      ? new v(t.lat, 'lng' in t ? t.lng : t.lon, t.alt)
      : void 0 === i
      ? null
      : new v(t, i, e);
  }
  (p.prototype = {
    clone: function () {
      return new p(this.x, this.y);
    },
    add: function (t) {
      return this.clone()._add(_(t));
    },
    _add: function (t) {
      return (this.x += t.x), (this.y += t.y), this;
    },
    subtract: function (t) {
      return this.clone()._subtract(_(t));
    },
    _subtract: function (t) {
      return (this.x -= t.x), (this.y -= t.y), this;
    },
    divideBy: function (t) {
      return this.clone()._divideBy(t);
    },
    _divideBy: function (t) {
      return (this.x /= t), (this.y /= t), this;
    },
    multiplyBy: function (t) {
      return this.clone()._multiplyBy(t);
    },
    _multiplyBy: function (t) {
      return (this.x *= t), (this.y *= t), this;
    },
    scaleBy: function (t) {
      return new p(this.x * t.x, this.y * t.y);
    },
    unscaleBy: function (t) {
      return new p(this.x / t.x, this.y / t.y);
    },
    round: function () {
      return this.clone()._round();
    },
    _round: function () {
      return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this;
    },
    floor: function () {
      return this.clone()._floor();
    },
    _floor: function () {
      return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this;
    },
    ceil: function () {
      return this.clone()._ceil();
    },
    _ceil: function () {
      return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this;
    },
    trunc: function () {
      return this.clone()._trunc();
    },
    _trunc: function () {
      return (this.x = nt(this.x)), (this.y = nt(this.y)), this;
    },
    distanceTo: function (t) {
      var i = (t = _(t)).x - this.x,
        t = t.y - this.y;
      return Math.sqrt(i * i + t * t);
    },
    equals: function (t) {
      return (t = _(t)).x === this.x && t.y === this.y;
    },
    contains: function (t) {
      return (
        (t = _(t)),
        Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
      );
    },
    toString: function () {
      return 'Point(' + e(this.x) + ', ' + e(this.y) + ')';
    },
  }),
    (m.prototype = {
      extend: function (t) {
        return (
          (t = _(t)),
          this.min || this.max
            ? ((this.min.x = Math.min(t.x, this.min.x)),
              (this.max.x = Math.max(t.x, this.max.x)),
              (this.min.y = Math.min(t.y, this.min.y)),
              (this.max.y = Math.max(t.y, this.max.y)))
            : ((this.min = t.clone()), (this.max = t.clone())),
          this
        );
      },
      getCenter: function (t) {
        return new p(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          t,
        );
      },
      getBottomLeft: function () {
        return new p(this.min.x, this.max.y);
      },
      getTopRight: function () {
        return new p(this.max.x, this.min.y);
      },
      getTopLeft: function () {
        return this.min;
      },
      getBottomRight: function () {
        return this.max;
      },
      getSize: function () {
        return this.max.subtract(this.min);
      },
      contains: function (t) {
        var i, e;
        return (
          (t = ('number' == typeof t[0] || t instanceof p ? _ : f)(
            t,
          )) instanceof m
            ? ((i = t.min), (e = t.max))
            : (i = e = t),
          i.x >= this.min.x &&
            e.x <= this.max.x &&
            i.y >= this.min.y &&
            e.y <= this.max.y
        );
      },
      intersects: function (t) {
        t = f(t);
        var i = this.min,
          e = this.max,
          n = t.min,
          t = t.max,
          o = t.x >= i.x && n.x <= e.x,
          t = t.y >= i.y && n.y <= e.y;
        return o && t;
      },
      overlaps: function (t) {
        t = f(t);
        var i = this.min,
          e = this.max,
          n = t.min,
          t = t.max,
          o = t.x > i.x && n.x < e.x,
          t = t.y > i.y && n.y < e.y;
        return o && t;
      },
      isValid: function () {
        return !(!this.min || !this.max);
      },
    }),
    (s.prototype = {
      extend: function (t) {
        var i,
          e,
          n = this._southWest,
          o = this._northEast;
        if (t instanceof v) e = i = t;
        else {
          if (!(t instanceof s)) return t ? this.extend(w(t) || g(t)) : this;
          if (((i = t._southWest), (e = t._northEast), !i || !e)) return this;
        }
        return (
          n || o
            ? ((n.lat = Math.min(i.lat, n.lat)),
              (n.lng = Math.min(i.lng, n.lng)),
              (o.lat = Math.max(e.lat, o.lat)),
              (o.lng = Math.max(e.lng, o.lng)))
            : ((this._southWest = new v(i.lat, i.lng)),
              (this._northEast = new v(e.lat, e.lng))),
          this
        );
      },
      pad: function (t) {
        var i = this._southWest,
          e = this._northEast,
          n = Math.abs(i.lat - e.lat) * t,
          t = Math.abs(i.lng - e.lng) * t;
        return new s(new v(i.lat - n, i.lng - t), new v(e.lat + n, e.lng + t));
      },
      getCenter: function () {
        return new v(
          (this._southWest.lat + this._northEast.lat) / 2,
          (this._southWest.lng + this._northEast.lng) / 2,
        );
      },
      getSouthWest: function () {
        return this._southWest;
      },
      getNorthEast: function () {
        return this._northEast;
      },
      getNorthWest: function () {
        return new v(this.getNorth(), this.getWest());
      },
      getSouthEast: function () {
        return new v(this.getSouth(), this.getEast());
      },
      getWest: function () {
        return this._southWest.lng;
      },
      getSouth: function () {
        return this._southWest.lat;
      },
      getEast: function () {
        return this._northEast.lng;
      },
      getNorth: function () {
        return this._northEast.lat;
      },
      contains: function (t) {
        t = ('number' == typeof t[0] || t instanceof v || 'lat' in t ? w : g)(
          t,
        );
        var i,
          e,
          n = this._southWest,
          o = this._northEast;
        return (
          t instanceof s
            ? ((i = t.getSouthWest()), (e = t.getNorthEast()))
            : (i = e = t),
          i.lat >= n.lat && e.lat <= o.lat && i.lng >= n.lng && e.lng <= o.lng
        );
      },
      intersects: function (t) {
        t = g(t);
        var i = this._southWest,
          e = this._northEast,
          n = t.getSouthWest(),
          t = t.getNorthEast(),
          o = t.lat >= i.lat && n.lat <= e.lat,
          t = t.lng >= i.lng && n.lng <= e.lng;
        return o && t;
      },
      overlaps: function (t) {
        t = g(t);
        var i = this._southWest,
          e = this._northEast,
          n = t.getSouthWest(),
          t = t.getNorthEast(),
          o = t.lat > i.lat && n.lat < e.lat,
          t = t.lng > i.lng && n.lng < e.lng;
        return o && t;
      },
      toBBoxString: function () {
        return [
          this.getWest(),
          this.getSouth(),
          this.getEast(),
          this.getNorth(),
        ].join(',');
      },
      equals: function (t, i) {
        return (
          !!t &&
          ((t = g(t)),
          this._southWest.equals(t.getSouthWest(), i) &&
            this._northEast.equals(t.getNorthEast(), i))
        );
      },
      isValid: function () {
        return !(!this._southWest || !this._northEast);
      },
    });
  var ot = {
      latLngToPoint: function (t, i) {
        (t = this.projection.project(t)), (i = this.scale(i));
        return this.transformation._transform(t, i);
      },
      pointToLatLng: function (t, i) {
        (i = this.scale(i)), (t = this.transformation.untransform(t, i));
        return this.projection.unproject(t);
      },
      project: function (t) {
        return this.projection.project(t);
      },
      unproject: function (t) {
        return this.projection.unproject(t);
      },
      scale: function (t) {
        return 256 * Math.pow(2, t);
      },
      zoom: function (t) {
        return Math.log(t / 256) / Math.LN2;
      },
      getProjectedBounds: function (t) {
        if (this.infinite) return null;
        var i = this.projection.bounds,
          t = this.scale(t);
        return new m(
          this.transformation.transform(i.min, t),
          this.transformation.transform(i.max, t),
        );
      },
      infinite: !(v.prototype = {
        equals: function (t, i) {
          return (
            !!t &&
            ((t = w(t)),
            Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng)) <=
              (void 0 === i ? 1e-9 : i))
          );
        },
        toString: function (t) {
          return 'LatLng(' + e(this.lat, t) + ', ' + e(this.lng, t) + ')';
        },
        distanceTo: function (t) {
          return st.distance(this, w(t));
        },
        wrap: function () {
          return st.wrapLatLng(this);
        },
        toBounds: function (t) {
          var t = (180 * t) / 40075017,
            i = t / Math.cos((Math.PI / 180) * this.lat);
          return g([this.lat - t, this.lng - i], [this.lat + t, this.lng + i]);
        },
        clone: function () {
          return new v(this.lat, this.lng, this.alt);
        },
      }),
      wrapLatLng: function (t) {
        var i = this.wrapLng ? H(t.lng, this.wrapLng, !0) : t.lng;
        return new v(
          this.wrapLat ? H(t.lat, this.wrapLat, !0) : t.lat,
          i,
          t.alt,
        );
      },
      wrapLatLngBounds: function (t) {
        var i = t.getCenter(),
          e = this.wrapLatLng(i),
          n = i.lat - e.lat,
          i = i.lng - e.lng;
        if (0 == n && 0 == i) return t;
        (e = t.getSouthWest()), (t = t.getNorthEast());
        return new s(new v(e.lat - n, e.lng - i), new v(t.lat - n, t.lng - i));
      },
    },
    st = l({}, ot, {
      wrapLng: [-180, 180],
      R: 6371e3,
      distance: function (t, i) {
        var e = Math.PI / 180,
          n = t.lat * e,
          o = i.lat * e,
          s = Math.sin(((i.lat - t.lat) * e) / 2),
          i = Math.sin(((i.lng - t.lng) * e) / 2),
          t = s * s + Math.cos(n) * Math.cos(o) * i * i,
          e = 2 * Math.atan2(Math.sqrt(t), Math.sqrt(1 - t));
        return this.R * e;
      },
    }),
    rt = 6378137,
    rt = {
      R: rt,
      MAX_LATITUDE: 85.0511287798,
      project: function (t) {
        var i = Math.PI / 180,
          e = this.MAX_LATITUDE,
          e = Math.max(Math.min(e, t.lat), -e),
          e = Math.sin(e * i);
        return new p(
          this.R * t.lng * i,
          (this.R * Math.log((1 + e) / (1 - e))) / 2,
        );
      },
      unproject: function (t) {
        var i = 180 / Math.PI;
        return new v(
          (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * i,
          (t.x * i) / this.R,
        );
      },
      bounds: new m([-(rt = rt * Math.PI), -rt], [rt, rt]),
    };
  function at(t, i, e, n) {
    if (d(t))
      return (
        (this._a = t[0]),
        (this._b = t[1]),
        (this._c = t[2]),
        void (this._d = t[3])
      );
    (this._a = t), (this._b = i), (this._c = e), (this._d = n);
  }
  function ht(t, i, e, n) {
    return new at(t, i, e, n);
  }
  at.prototype = {
    transform: function (t, i) {
      return this._transform(t.clone(), i);
    },
    _transform: function (t, i) {
      return (
        (t.x = (i = i || 1) * (this._a * t.x + this._b)),
        (t.y = i * (this._c * t.y + this._d)),
        t
      );
    },
    untransform: function (t, i) {
      return new p(
        (t.x / (i = i || 1) - this._b) / this._a,
        (t.y / i - this._d) / this._c,
      );
    },
  };
  var lt = l({}, st, {
      code: 'EPSG:3857',
      projection: rt,
      transformation: ht((lt = 0.5 / (Math.PI * rt.R)), 0.5, -lt, 0.5),
    }),
    ut = l({}, lt, { code: 'EPSG:900913' });
  function ct(t) {
    return document.createElementNS('http://www.w3.org/2000/svg', t);
  }
  function dt(t, i) {
    for (var e, n, o, s, r = '', a = 0, h = t.length; a < h; a++) {
      for (e = 0, n = (o = t[a]).length; e < n; e++)
        r += (e ? 'L' : 'M') + (s = o[e]).x + ' ' + s.y;
      r += i ? (P.svg ? 'z' : 'x') : '';
    }
    return r || 'M0 0';
  }
  var _t = document.documentElement.style,
    pt = 'ActiveXObject' in window,
    mt = pt && !document.addEventListener,
    n = 'msLaunchUri' in navigator && !('documentMode' in document),
    ft = y('webkit'),
    gt = y('android'),
    vt = y('android 2') || y('android 3'),
    yt = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10),
    yt = gt && y('Google') && yt < 537 && !('AudioNode' in window),
    xt = !!window.opera,
    wt = !n && y('chrome'),
    Pt = y('gecko') && !ft && !xt && !pt,
    bt = !wt && y('safari'),
    Lt = y('phantom'),
    o = 'OTransition' in _t,
    Tt = 0 === navigator.platform.indexOf('Win'),
    zt = pt && 'transition' in _t,
    Mt =
      'WebKitCSSMatrix' in window &&
      'm11' in new window.WebKitCSSMatrix() &&
      !vt,
    _t = 'MozPerspective' in _t,
    Ct = !window.L_DISABLE_3D && (zt || Mt || _t) && !o && !Lt,
    Zt = 'undefined' != typeof orientation || y('mobile'),
    St = Zt && ft,
    kt = Zt && Mt,
    Et = !window.PointerEvent && window.MSPointerEvent,
    Bt = !(!window.PointerEvent && !Et),
    At = 'ontouchstart' in window || !!window.TouchEvent,
    It = !window.L_NO_TOUCH && (At || Bt),
    Ot = Zt && xt,
    Rt = Zt && Pt,
    Nt =
      1 <
      (window.devicePixelRatio ||
        window.screen.deviceXDPI / window.screen.logicalXDPI),
    Dt = (function () {
      var t = !1;
      try {
        var i = Object.defineProperty({}, 'passive', {
          get: function () {
            t = !0;
          },
        });
        window.addEventListener('testPassiveEventSupport', u, i),
          window.removeEventListener('testPassiveEventSupport', u, i);
      } catch (t) {}
      return t;
    })(),
    jt = !!document.createElement('canvas').getContext,
    Ht = !(!document.createElementNS || !ct('svg').createSVGRect),
    Wt =
      !!Ht &&
      (((Wt = document.createElement('div')).innerHTML = '<svg/>'),
      'http://www.w3.org/2000/svg' ===
        (Wt.firstChild && Wt.firstChild.namespaceURI));
  function y(t) {
    return 0 <= navigator.userAgent.toLowerCase().indexOf(t);
  }
  var P = {
      ie: pt,
      ielt9: mt,
      edge: n,
      webkit: ft,
      android: gt,
      android23: vt,
      androidStock: yt,
      opera: xt,
      chrome: wt,
      gecko: Pt,
      safari: bt,
      phantom: Lt,
      opera12: o,
      win: Tt,
      ie3d: zt,
      webkit3d: Mt,
      gecko3d: _t,
      any3d: Ct,
      mobile: Zt,
      mobileWebkit: St,
      mobileWebkit3d: kt,
      msPointer: Et,
      pointer: Bt,
      touch: It,
      touchNative: At,
      mobileOpera: Ot,
      mobileGecko: Rt,
      retina: Nt,
      passiveEvents: Dt,
      canvas: jt,
      svg: Ht,
      vml:
        !Ht &&
        (function () {
          try {
            var t = document.createElement('div'),
              i = ((t.innerHTML = '<v:shape adj="1"/>'), t.firstChild);
            return (
              (i.style.behavior = 'url(#default#VML)'),
              i && 'object' == typeof i.adj
            );
          } catch (t) {
            return !1;
          }
        })(),
      inlineSvg: Wt,
    },
    Ft = P.msPointer ? 'MSPointerDown' : 'pointerdown',
    Ut = P.msPointer ? 'MSPointerMove' : 'pointermove',
    Vt = P.msPointer ? 'MSPointerUp' : 'pointerup',
    qt = P.msPointer ? 'MSPointerCancel' : 'pointercancel',
    Gt = { touchstart: Ft, touchmove: Ut, touchend: Vt, touchcancel: qt },
    Kt = {
      touchstart: function (t, i) {
        i.MSPOINTER_TYPE_TOUCH &&
          i.pointerType === i.MSPOINTER_TYPE_TOUCH &&
          B(i);
        ii(t, i);
      },
      touchmove: ii,
      touchend: ii,
      touchcancel: ii,
    },
    Yt = {},
    Xt = !1;
  function Jt(t, i, e) {
    return (
      'touchstart' !== i ||
        Xt ||
        (document.addEventListener(Ft, $t, !0),
        document.addEventListener(Ut, Qt, !0),
        document.addEventListener(Vt, ti, !0),
        document.addEventListener(qt, ti, !0),
        (Xt = !0)),
      Kt[i]
        ? ((e = Kt[i].bind(this, e)), t.addEventListener(Gt[i], e, !1), e)
        : (console.warn('wrong event specified:', i), L.Util.falseFn)
    );
  }
  function $t(t) {
    Yt[t.pointerId] = t;
  }
  function Qt(t) {
    Yt[t.pointerId] && (Yt[t.pointerId] = t);
  }
  function ti(t) {
    delete Yt[t.pointerId];
  }
  function ii(t, i) {
    if (i.pointerType !== (i.MSPOINTER_TYPE_MOUSE || 'mouse')) {
      for (var e in ((i.touches = []), Yt)) i.touches.push(Yt[e]);
      (i.changedTouches = [i]), t(i);
    }
  }
  var ei = 200;
  function ni(t, e) {
    t.addEventListener('dblclick', e);
    var n,
      o = 0;
    function i(t) {
      var i;
      1 !== t.detail
        ? (n = t.detail)
        : 'mouse' === t.pointerType ||
          (t.sourceCapabilities && !t.sourceCapabilities.firesTouchEvents) ||
          ((i = Date.now()) - o <= ei
            ? 2 === ++n &&
              e(
                (function (t) {
                  var i,
                    e,
                    n = {};
                  for (e in t) (i = t[e]), (n[e] = i && i.bind ? i.bind(t) : i);
                  return (
                    ((t = n).type = 'dblclick'),
                    (n.detail = 2),
                    (n.isTrusted = !1),
                    (n._simulated = !0),
                    n
                  );
                })(t),
              )
            : (n = 1),
          (o = i));
    }
    return t.addEventListener('click', i), { dblclick: e, simDblclick: i };
  }
  var oi,
    si,
    ri,
    ai,
    hi,
    li,
    ui = wi([
      'transform',
      'webkitTransform',
      'OTransform',
      'MozTransform',
      'msTransform',
    ]),
    ci = wi([
      'webkitTransition',
      'transition',
      'OTransition',
      'MozTransition',
      'msTransition',
    ]),
    di =
      'webkitTransition' === ci || 'OTransition' === ci
        ? ci + 'End'
        : 'transitionend';
  function _i(t) {
    return 'string' == typeof t ? document.getElementById(t) : t;
  }
  function pi(t, i) {
    var e = t.style[i] || (t.currentStyle && t.currentStyle[i]);
    return 'auto' ===
      (e =
        (e && 'auto' !== e) || !document.defaultView
          ? e
          : (t = document.defaultView.getComputedStyle(t, null))
          ? t[i]
          : null)
      ? null
      : e;
  }
  function b(t, i, e) {
    t = document.createElement(t);
    return (t.className = i || ''), e && e.appendChild(t), t;
  }
  function T(t) {
    var i = t.parentNode;
    i && i.removeChild(t);
  }
  function mi(t) {
    for (; t.firstChild; ) t.removeChild(t.firstChild);
  }
  function fi(t) {
    var i = t.parentNode;
    i && i.lastChild !== t && i.appendChild(t);
  }
  function gi(t) {
    var i = t.parentNode;
    i && i.firstChild !== t && i.insertBefore(t, i.firstChild);
  }
  function vi(t, i) {
    if (void 0 !== t.classList) return t.classList.contains(i);
    t = xi(t);
    return 0 < t.length && new RegExp('(^|\\s)' + i + '(\\s|$)').test(t);
  }
  function z(t, i) {
    var e;
    if (void 0 !== t.classList)
      for (var n = F(i), o = 0, s = n.length; o < s; o++) t.classList.add(n[o]);
    else vi(t, i) || yi(t, ((e = xi(t)) ? e + ' ' : '') + i);
  }
  function M(t, i) {
    void 0 !== t.classList
      ? t.classList.remove(i)
      : yi(t, W((' ' + xi(t) + ' ').replace(' ' + i + ' ', ' ')));
  }
  function yi(t, i) {
    void 0 === t.className.baseVal
      ? (t.className = i)
      : (t.className.baseVal = i);
  }
  function xi(t) {
    return void 0 ===
      (t = t.correspondingElement ? t.correspondingElement : t).className
        .baseVal
      ? t.className
      : t.className.baseVal;
  }
  function C(t, i) {
    if ('opacity' in t.style) t.style.opacity = i;
    else if ('filter' in t.style) {
      var e = !1,
        n = 'DXImageTransform.Microsoft.Alpha';
      try {
        e = t.filters.item(n);
      } catch (t) {
        if (1 === i) return;
      }
      (i = Math.round(100 * i)),
        e
          ? ((e.Enabled = 100 !== i), (e.Opacity = i))
          : (t.style.filter += ' progid:' + n + '(opacity=' + i + ')');
    }
  }
  function wi(t) {
    for (var i = document.documentElement.style, e = 0; e < t.length; e++)
      if (t[e] in i) return t[e];
    return !1;
  }
  function Pi(t, i, e) {
    i = i || new p(0, 0);
    t.style[ui] =
      (P.ie3d
        ? 'translate(' + i.x + 'px,' + i.y + 'px)'
        : 'translate3d(' + i.x + 'px,' + i.y + 'px,0)') +
      (e ? ' scale(' + e + ')' : '');
  }
  function Z(t, i) {
    (t._leaflet_pos = i),
      P.any3d
        ? Pi(t, i)
        : ((t.style.left = i.x + 'px'), (t.style.top = i.y + 'px'));
  }
  function bi(t) {
    return t._leaflet_pos || new p(0, 0);
  }
  function Li() {
    S(window, 'dragstart', B);
  }
  function Ti() {
    E(window, 'dragstart', B);
  }
  function zi(t) {
    for (; -1 === t.tabIndex; ) t = t.parentNode;
    t.style &&
      (Mi(),
      (li = (hi = t).style.outline),
      (t.style.outline = 'none'),
      S(window, 'keydown', Mi));
  }
  function Mi() {
    hi &&
      ((hi.style.outline = li), (li = hi = void 0), E(window, 'keydown', Mi));
  }
  function Ci(t) {
    for (
      ;
      !(
        ((t = t.parentNode).offsetWidth && t.offsetHeight) ||
        t === document.body
      );

    );
    return t;
  }
  function Zi(t) {
    var i = t.getBoundingClientRect();
    return {
      x: i.width / t.offsetWidth || 1,
      y: i.height / t.offsetHeight || 1,
      boundingClientRect: i,
    };
  }
  ai =
    'onselectstart' in document
      ? ((ri = function () {
          S(window, 'selectstart', B);
        }),
        function () {
          E(window, 'selectstart', B);
        })
      : ((si = wi([
          'userSelect',
          'WebkitUserSelect',
          'OUserSelect',
          'MozUserSelect',
          'msUserSelect',
        ])),
        (ri = function () {
          var t;
          si &&
            ((t = document.documentElement.style),
            (oi = t[si]),
            (t[si] = 'none'));
        }),
        function () {
          si && ((document.documentElement.style[si] = oi), (oi = void 0));
        });
  pt = {
    __proto__: null,
    TRANSFORM: ui,
    TRANSITION: ci,
    TRANSITION_END: di,
    get: _i,
    getStyle: pi,
    create: b,
    remove: T,
    empty: mi,
    toFront: fi,
    toBack: gi,
    hasClass: vi,
    addClass: z,
    removeClass: M,
    setClass: yi,
    getClass: xi,
    setOpacity: C,
    testProp: wi,
    setTransform: Pi,
    setPosition: Z,
    getPosition: bi,
    get disableTextSelection() {
      return ri;
    },
    get enableTextSelection() {
      return ai;
    },
    disableImageDrag: Li,
    enableImageDrag: Ti,
    preventOutline: zi,
    restoreOutline: Mi,
    getSizedParentNode: Ci,
    getScale: Zi,
  };
  function S(t, i, e, n) {
    if (i && 'object' == typeof i) for (var o in i) Ei(t, o, i[o], e);
    else for (var s = 0, r = (i = F(i)).length; s < r; s++) Ei(t, i[s], e, n);
    return this;
  }
  var k = '_leaflet_events';
  function E(t, i, e, n) {
    if (1 === arguments.length) Si(t), delete t[k];
    else if (i && 'object' == typeof i) for (var o in i) Bi(t, o, i[o], e);
    else if (((i = F(i)), 2 === arguments.length))
      Si(t, function (t) {
        return -1 !== G(i, t);
      });
    else for (var s = 0, r = i.length; s < r; s++) Bi(t, i[s], e, n);
    return this;
  }
  function Si(t, i) {
    for (var e in t[k]) {
      var n = e.split(/\d/)[0];
      (i && !i(n)) || Bi(t, n, null, null, e);
    }
  }
  var ki = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout',
    wheel: !('onwheel' in window) && 'mousewheel',
  };
  function Ei(i, t, e, n) {
    var o,
      s,
      r = t + h(e) + (n ? '_' + h(n) : '');
    (i[k] && i[k][r]) ||
      ((s = o =
        function (t) {
          return e.call(n || i, t || window.event);
        }),
      !P.touchNative && P.pointer && 0 === t.indexOf('touch')
        ? (o = Jt(i, t, o))
        : P.touch && 'dblclick' === t
        ? (o = ni(i, o))
        : 'addEventListener' in i
        ? 'touchstart' === t ||
          'touchmove' === t ||
          'wheel' === t ||
          'mousewheel' === t
          ? i.addEventListener(
              ki[t] || t,
              o,
              !!P.passiveEvents && { passive: !1 },
            )
          : 'mouseenter' === t || 'mouseleave' === t
          ? i.addEventListener(
              ki[t],
              (o = function (t) {
                (t = t || window.event), Hi(i, t) && s(t);
              }),
              !1,
            )
          : i.addEventListener(t, s, !1)
        : i.attachEvent('on' + t, o),
      (i[k] = i[k] || {}),
      (i[k][r] = o));
  }
  function Bi(t, i, e, n, o) {
    o = o || i + h(e) + (n ? '_' + h(n) : '');
    var s,
      r,
      e = t[k] && t[k][o];
    e &&
      (!P.touchNative && P.pointer && 0 === i.indexOf('touch')
        ? ((n = t),
          (r = e),
          Gt[(s = i)]
            ? n.removeEventListener(Gt[s], r, !1)
            : console.warn('wrong event specified:', s))
        : P.touch && 'dblclick' === i
        ? ((n = e),
          (r = t).removeEventListener('dblclick', n.dblclick),
          r.removeEventListener('click', n.simDblclick))
        : 'removeEventListener' in t
        ? t.removeEventListener(ki[i] || i, e, !1)
        : t.detachEvent('on' + i, e),
      (t[k][o] = null));
  }
  function Ai(t) {
    return (
      t.stopPropagation
        ? t.stopPropagation()
        : t.originalEvent
        ? (t.originalEvent._stopped = !0)
        : (t.cancelBubble = !0),
      this
    );
  }
  function Ii(t) {
    return Ei(t, 'wheel', Ai), this;
  }
  function Oi(t) {
    return (
      S(t, 'mousedown touchstart dblclick contextmenu', Ai),
      (t._leaflet_disable_click = !0),
      this
    );
  }
  function B(t) {
    return t.preventDefault ? t.preventDefault() : (t.returnValue = !1), this;
  }
  function Ri(t) {
    return B(t), Ai(t), this;
  }
  function Ni(t, i) {
    if (!i) return new p(t.clientX, t.clientY);
    var e = Zi(i),
      n = e.boundingClientRect;
    return new p(
      (t.clientX - n.left) / e.x - i.clientLeft,
      (t.clientY - n.top) / e.y - i.clientTop,
    );
  }
  var Di =
    P.win && P.chrome
      ? 2 * window.devicePixelRatio
      : P.gecko
      ? window.devicePixelRatio
      : 1;
  function ji(t) {
    return P.edge
      ? t.wheelDeltaY / 2
      : t.deltaY && 0 === t.deltaMode
      ? -t.deltaY / Di
      : t.deltaY && 1 === t.deltaMode
      ? 20 * -t.deltaY
      : t.deltaY && 2 === t.deltaMode
      ? 60 * -t.deltaY
      : t.deltaX || t.deltaZ
      ? 0
      : t.wheelDelta
      ? (t.wheelDeltaY || t.wheelDelta) / 2
      : t.detail && Math.abs(t.detail) < 32765
      ? 20 * -t.detail
      : t.detail
      ? (t.detail / -32765) * 60
      : 0;
  }
  function Hi(t, i) {
    var e = i.relatedTarget;
    if (!e) return !0;
    try {
      for (; e && e !== t; ) e = e.parentNode;
    } catch (t) {
      return !1;
    }
    return e !== t;
  }
  var mt = {
      __proto__: null,
      on: S,
      off: E,
      stopPropagation: Ai,
      disableScrollPropagation: Ii,
      disableClickPropagation: Oi,
      preventDefault: B,
      stop: Ri,
      getMousePosition: Ni,
      getWheelDelta: ji,
      isExternalTarget: Hi,
      addListener: S,
      removeListener: E,
    },
    Wi = et.extend({
      run: function (t, i, e, n) {
        this.stop(),
          (this._el = t),
          (this._inProgress = !0),
          (this._duration = e || 0.25),
          (this._easeOutPower = 1 / Math.max(n || 0.5, 0.2)),
          (this._startPos = bi(t)),
          (this._offset = i.subtract(this._startPos)),
          (this._startTime = +new Date()),
          this.fire('start'),
          this._animate();
      },
      stop: function () {
        this._inProgress && (this._step(!0), this._complete());
      },
      _animate: function () {
        (this._animId = x(this._animate, this)), this._step();
      },
      _step: function (t) {
        var i = +new Date() - this._startTime,
          e = 1e3 * this._duration;
        i < e
          ? this._runFrame(this._easeOut(i / e), t)
          : (this._runFrame(1), this._complete());
      },
      _runFrame: function (t, i) {
        t = this._startPos.add(this._offset.multiplyBy(t));
        i && t._round(), Z(this._el, t), this.fire('step');
      },
      _complete: function () {
        r(this._animId), (this._inProgress = !1), this.fire('end');
      },
      _easeOut: function (t) {
        return 1 - Math.pow(1 - t, this._easeOutPower);
      },
    }),
    A = et.extend({
      options: {
        crs: lt,
        center: void 0,
        zoom: void 0,
        minZoom: void 0,
        maxZoom: void 0,
        layers: [],
        maxBounds: void 0,
        renderer: void 0,
        zoomAnimation: !0,
        zoomAnimationThreshold: 4,
        fadeAnimation: !0,
        markerZoomAnimation: !0,
        transform3DLimit: 8388608,
        zoomSnap: 1,
        zoomDelta: 1,
        trackResize: !0,
      },
      initialize: function (t, i) {
        (i = c(this, i)),
          (this._handlers = []),
          (this._layers = {}),
          (this._zoomBoundLayers = {}),
          (this._sizeChanged = !0),
          this._initContainer(t),
          this._initLayout(),
          (this._onResize = a(this._onResize, this)),
          this._initEvents(),
          i.maxBounds && this.setMaxBounds(i.maxBounds),
          void 0 !== i.zoom && (this._zoom = this._limitZoom(i.zoom)),
          i.center &&
            void 0 !== i.zoom &&
            this.setView(w(i.center), i.zoom, { reset: !0 }),
          this.callInitHooks(),
          (this._zoomAnimated =
            ci && P.any3d && !P.mobileOpera && this.options.zoomAnimation),
          this._zoomAnimated &&
            (this._createAnimProxy(),
            S(this._proxy, di, this._catchTransitionEnd, this)),
          this._addLayers(this.options.layers);
      },
      setView: function (t, i, e) {
        if (
          ((i = void 0 === i ? this._zoom : this._limitZoom(i)),
          (t = this._limitCenter(w(t), i, this.options.maxBounds)),
          (e = e || {}),
          this._stop(),
          this._loaded && !e.reset && !0 !== e) &&
          (void 0 !== e.animate &&
            ((e.zoom = l({ animate: e.animate }, e.zoom)),
            (e.pan = l({ animate: e.animate, duration: e.duration }, e.pan))),
          this._zoom !== i
            ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, i, e.zoom)
            : this._tryAnimatedPan(t, e.pan))
        )
          return clearTimeout(this._sizeTimer), this;
        return this._resetView(t, i), this;
      },
      setZoom: function (t, i) {
        return this._loaded
          ? this.setView(this.getCenter(), t, { zoom: i })
          : ((this._zoom = t), this);
      },
      zoomIn: function (t, i) {
        return (
          (t = t || (P.any3d ? this.options.zoomDelta : 1)),
          this.setZoom(this._zoom + t, i)
        );
      },
      zoomOut: function (t, i) {
        return (
          (t = t || (P.any3d ? this.options.zoomDelta : 1)),
          this.setZoom(this._zoom - t, i)
        );
      },
      setZoomAround: function (t, i, e) {
        var n = this.getZoomScale(i),
          o = this.getSize().divideBy(2),
          t = (t instanceof p ? t : this.latLngToContainerPoint(t))
            .subtract(o)
            .multiplyBy(1 - 1 / n),
          n = this.containerPointToLatLng(o.add(t));
        return this.setView(n, i, { zoom: e });
      },
      _getBoundsCenterZoom: function (t, i) {
        (i = i || {}), (t = t.getBounds ? t.getBounds() : g(t));
        var e = _(i.paddingTopLeft || i.padding || [0, 0]),
          n = _(i.paddingBottomRight || i.padding || [0, 0]),
          o = this.getBoundsZoom(t, !1, e.add(n));
        if (
          (o = 'number' == typeof i.maxZoom ? Math.min(i.maxZoom, o) : o) ===
          1 / 0
        )
          return { center: t.getCenter(), zoom: o };
        (i = n.subtract(e).divideBy(2)),
          (n = this.project(t.getSouthWest(), o)),
          (e = this.project(t.getNorthEast(), o));
        return {
          center: this.unproject(n.add(e).divideBy(2).add(i), o),
          zoom: o,
        };
      },
      fitBounds: function (t, i) {
        if (!(t = g(t)).isValid()) throw new Error('Bounds are not valid.');
        t = this._getBoundsCenterZoom(t, i);
        return this.setView(t.center, t.zoom, i);
      },
      fitWorld: function (t) {
        return this.fitBounds(
          [
            [-90, -180],
            [90, 180],
          ],
          t,
        );
      },
      panTo: function (t, i) {
        return this.setView(t, this._zoom, { pan: i });
      },
      panBy: function (t, i) {
        return (
          (i = i || {}),
          (t = _(t).round()).x || t.y
            ? (!0 === i.animate || this.getSize().contains(t)
                ? (this._panAnim ||
                    ((this._panAnim = new Wi()),
                    this._panAnim.on(
                      {
                        step: this._onPanTransitionStep,
                        end: this._onPanTransitionEnd,
                      },
                      this,
                    )),
                  i.noMoveStart || this.fire('movestart'),
                  !1 !== i.animate
                    ? (z(this._mapPane, 'leaflet-pan-anim'),
                      (e = this._getMapPanePos().subtract(t).round()),
                      this._panAnim.run(
                        this._mapPane,
                        e,
                        i.duration || 0.25,
                        i.easeLinearity,
                      ))
                    : (this._rawPanBy(t), this.fire('move').fire('moveend')))
                : this._resetView(
                    this.unproject(this.project(this.getCenter()).add(t)),
                    this.getZoom(),
                  ),
              this)
            : this.fire('moveend')
        );
        var e;
      },
      flyTo: function (n, o, t) {
        if (!1 === (t = t || {}).animate || !P.any3d)
          return this.setView(n, o, t);
        this._stop();
        var s = this.project(this.getCenter()),
          r = this.project(n),
          i = this.getSize(),
          a = this._zoom,
          h = ((n = w(n)), (o = void 0 === o ? a : o), Math.max(i.x, i.y)),
          e = h * this.getZoomScale(a, o),
          l = r.distanceTo(s) || 1,
          u = 1.42,
          c = u * u;
        function d(t) {
          (t =
            (e * e - h * h + (t ? -1 : 1) * c * c * l * l) /
            (2 * (t ? e : h) * c * l)),
            (t = Math.sqrt(t * t + 1) - t);
          return t < 1e-9 ? -18 : Math.log(t);
        }
        function _(t) {
          return (Math.exp(t) - Math.exp(-t)) / 2;
        }
        function p(t) {
          return (Math.exp(t) + Math.exp(-t)) / 2;
        }
        var m = d(0);
        function f(t) {
          return (h * (p(m) * (_((t = m + u * t)) / p(t)) - _(m))) / c;
        }
        var g = Date.now(),
          v = (d(1) - m) / u,
          y = t.duration ? 1e3 * t.duration : 1e3 * v * 0.8;
        return (
          this._moveStart(!0, t.noMoveStart),
          function t() {
            var i = (Date.now() - g) / y,
              e = (1 - Math.pow(1 - i, 1.5)) * v;
            i <= 1
              ? ((this._flyToFrame = x(t, this)),
                this._move(
                  this.unproject(s.add(r.subtract(s).multiplyBy(f(e) / l)), a),
                  this.getScaleZoom(
                    h / ((i = e), h * (p(m) / p(m + u * i))),
                    a,
                  ),
                  { flyTo: !0 },
                ))
              : this._move(n, o)._moveEnd(!0);
          }.call(this),
          this
        );
      },
      flyToBounds: function (t, i) {
        t = this._getBoundsCenterZoom(t, i);
        return this.flyTo(t.center, t.zoom, i);
      },
      setMaxBounds: function (t) {
        return (t = g(t)).isValid()
          ? (this.options.maxBounds &&
              this.off('moveend', this._panInsideMaxBounds),
            (this.options.maxBounds = t),
            this._loaded && this._panInsideMaxBounds(),
            this.on('moveend', this._panInsideMaxBounds))
          : ((this.options.maxBounds = null),
            this.off('moveend', this._panInsideMaxBounds));
      },
      setMinZoom: function (t) {
        var i = this.options.minZoom;
        return (
          (this.options.minZoom = t),
          this._loaded &&
          i !== t &&
          (this.fire('zoomlevelschange'), this.getZoom() < this.options.minZoom)
            ? this.setZoom(t)
            : this
        );
      },
      setMaxZoom: function (t) {
        var i = this.options.maxZoom;
        return (
          (this.options.maxZoom = t),
          this._loaded &&
          i !== t &&
          (this.fire('zoomlevelschange'), this.getZoom() > this.options.maxZoom)
            ? this.setZoom(t)
            : this
        );
      },
      panInsideBounds: function (t, i) {
        this._enforcingBounds = !0;
        var e = this.getCenter(),
          t = this._limitCenter(e, this._zoom, g(t));
        return (
          e.equals(t) || this.panTo(t, i), (this._enforcingBounds = !1), this
        );
      },
      panInside: function (t, i) {
        var e = _((i = i || {}).paddingTopLeft || i.padding || [0, 0]),
          n = _(i.paddingBottomRight || i.padding || [0, 0]),
          o = this.project(this.getCenter()),
          t = this.project(t),
          s = this.getPixelBounds(),
          e = f([s.min.add(e), s.max.subtract(n)]),
          s = e.getSize();
        return (
          e.contains(t) ||
            ((this._enforcingBounds = !0),
            (n = t.subtract(e.getCenter())),
            (e = e.extend(t).getSize().subtract(s)),
            (o.x += n.x < 0 ? -e.x : e.x),
            (o.y += n.y < 0 ? -e.y : e.y),
            this.panTo(this.unproject(o), i),
            (this._enforcingBounds = !1)),
          this
        );
      },
      invalidateSize: function (t) {
        if (!this._loaded) return this;
        t = l({ animate: !1, pan: !0 }, !0 === t ? { animate: !0 } : t);
        var i = this.getSize(),
          e =
            ((this._sizeChanged = !0),
            (this._lastCenter = null),
            this.getSize()),
          n = i.divideBy(2).round(),
          o = e.divideBy(2).round(),
          n = n.subtract(o);
        return n.x || n.y
          ? (t.animate && t.pan
              ? this.panBy(n)
              : (t.pan && this._rawPanBy(n),
                this.fire('move'),
                t.debounceMoveend
                  ? (clearTimeout(this._sizeTimer),
                    (this._sizeTimer = setTimeout(
                      a(this.fire, this, 'moveend'),
                      200,
                    )))
                  : this.fire('moveend')),
            this.fire('resize', { oldSize: i, newSize: e }))
          : this;
      },
      stop: function () {
        return (
          this.setZoom(this._limitZoom(this._zoom)),
          this.options.zoomSnap || this.fire('viewreset'),
          this._stop()
        );
      },
      locate: function (t) {
        if (
          ((t = this._locateOptions = l({ timeout: 1e4, watch: !1 }, t)),
          !('geolocation' in navigator))
        )
          return (
            this._handleGeolocationError({
              code: 0,
              message: 'Geolocation not supported.',
            }),
            this
          );
        var i = a(this._handleGeolocationResponse, this),
          e = a(this._handleGeolocationError, this);
        return (
          t.watch
            ? (this._locationWatchId = navigator.geolocation.watchPosition(
                i,
                e,
                t,
              ))
            : navigator.geolocation.getCurrentPosition(i, e, t),
          this
        );
      },
      stopLocate: function () {
        return (
          navigator.geolocation &&
            navigator.geolocation.clearWatch &&
            navigator.geolocation.clearWatch(this._locationWatchId),
          this._locateOptions && (this._locateOptions.setView = !1),
          this
        );
      },
      _handleGeolocationError: function (t) {
        var i;
        this._container._leaflet_id &&
          ((i = t.code),
          (t =
            t.message ||
            (1 === i
              ? 'permission denied'
              : 2 === i
              ? 'position unavailable'
              : 'timeout')),
          this._locateOptions.setView && !this._loaded && this.fitWorld(),
          this.fire('locationerror', {
            code: i,
            message: 'Geolocation error: ' + t + '.',
          }));
      },
      _handleGeolocationResponse: function (t) {
        if (this._container._leaflet_id) {
          var i,
            e,
            n = new v(t.coords.latitude, t.coords.longitude),
            o = n.toBounds(2 * t.coords.accuracy),
            s = this._locateOptions,
            r =
              (s.setView &&
                ((i = this.getBoundsZoom(o)),
                this.setView(n, s.maxZoom ? Math.min(i, s.maxZoom) : i)),
              { latlng: n, bounds: o, timestamp: t.timestamp });
          for (e in t.coords)
            'number' == typeof t.coords[e] && (r[e] = t.coords[e]);
          this.fire('locationfound', r);
        }
      },
      addHandler: function (t, i) {
        if (!i) return this;
        i = this[t] = new i(this);
        return this._handlers.push(i), this.options[t] && i.enable(), this;
      },
      remove: function () {
        if (
          (this._initEvents(!0),
          this.options.maxBounds &&
            this.off('moveend', this._panInsideMaxBounds),
          this._containerId !== this._container._leaflet_id)
        )
          throw new Error('Map container is being reused by another instance');
        try {
          delete this._container._leaflet_id, delete this._containerId;
        } catch (t) {
          (this._container._leaflet_id = void 0), (this._containerId = void 0);
        }
        for (var t in (void 0 !== this._locationWatchId && this.stopLocate(),
        this._stop(),
        T(this._mapPane),
        this._clearControlPos && this._clearControlPos(),
        this._resizeRequest &&
          (r(this._resizeRequest), (this._resizeRequest = null)),
        this._clearHandlers(),
        this._loaded && this.fire('unload'),
        this._layers))
          this._layers[t].remove();
        for (t in this._panes) T(this._panes[t]);
        return (
          (this._layers = []),
          (this._panes = []),
          delete this._mapPane,
          delete this._renderer,
          this
        );
      },
      createPane: function (t, i) {
        i = b(
          'div',
          'leaflet-pane' +
            (t ? ' leaflet-' + t.replace('Pane', '') + '-pane' : ''),
          i || this._mapPane,
        );
        return t && (this._panes[t] = i), i;
      },
      getCenter: function () {
        return (
          this._checkIfLoaded(),
          this._lastCenter && !this._moved()
            ? this._lastCenter
            : this.layerPointToLatLng(this._getCenterLayerPoint())
        );
      },
      getZoom: function () {
        return this._zoom;
      },
      getBounds: function () {
        var t = this.getPixelBounds();
        return new s(
          this.unproject(t.getBottomLeft()),
          this.unproject(t.getTopRight()),
        );
      },
      getMinZoom: function () {
        return void 0 === this.options.minZoom
          ? this._layersMinZoom || 0
          : this.options.minZoom;
      },
      getMaxZoom: function () {
        return void 0 === this.options.maxZoom
          ? void 0 === this._layersMaxZoom
            ? 1 / 0
            : this._layersMaxZoom
          : this.options.maxZoom;
      },
      getBoundsZoom: function (t, i, e) {
        (t = g(t)), (e = _(e || [0, 0]));
        var n = this.getZoom() || 0,
          o = this.getMinZoom(),
          s = this.getMaxZoom(),
          r = t.getNorthWest(),
          t = t.getSouthEast(),
          e = this.getSize().subtract(e),
          t = f(this.project(t, n), this.project(r, n)).getSize(),
          r = P.any3d ? this.options.zoomSnap : 1,
          a = e.x / t.x,
          e = e.y / t.y,
          t = i ? Math.max(a, e) : Math.min(a, e),
          n = this.getScaleZoom(t, n);
        return (
          r &&
            ((n = Math.round(n / (r / 100)) * (r / 100)),
            (n = i ? Math.ceil(n / r) * r : Math.floor(n / r) * r)),
          Math.max(o, Math.min(s, n))
        );
      },
      getSize: function () {
        return (
          (this._size && !this._sizeChanged) ||
            ((this._size = new p(
              this._container.clientWidth || 0,
              this._container.clientHeight || 0,
            )),
            (this._sizeChanged = !1)),
          this._size.clone()
        );
      },
      getPixelBounds: function (t, i) {
        t = this._getTopLeftPoint(t, i);
        return new m(t, t.add(this.getSize()));
      },
      getPixelOrigin: function () {
        return this._checkIfLoaded(), this._pixelOrigin;
      },
      getPixelWorldBounds: function (t) {
        return this.options.crs.getProjectedBounds(
          void 0 === t ? this.getZoom() : t,
        );
      },
      getPane: function (t) {
        return 'string' == typeof t ? this._panes[t] : t;
      },
      getPanes: function () {
        return this._panes;
      },
      getContainer: function () {
        return this._container;
      },
      getZoomScale: function (t, i) {
        var e = this.options.crs;
        return (i = void 0 === i ? this._zoom : i), e.scale(t) / e.scale(i);
      },
      getScaleZoom: function (t, i) {
        var e = this.options.crs,
          t = ((i = void 0 === i ? this._zoom : i), e.zoom(t * e.scale(i)));
        return isNaN(t) ? 1 / 0 : t;
      },
      project: function (t, i) {
        return (
          (i = void 0 === i ? this._zoom : i),
          this.options.crs.latLngToPoint(w(t), i)
        );
      },
      unproject: function (t, i) {
        return (
          (i = void 0 === i ? this._zoom : i),
          this.options.crs.pointToLatLng(_(t), i)
        );
      },
      layerPointToLatLng: function (t) {
        t = _(t).add(this.getPixelOrigin());
        return this.unproject(t);
      },
      latLngToLayerPoint: function (t) {
        return this.project(w(t))._round()._subtract(this.getPixelOrigin());
      },
      wrapLatLng: function (t) {
        return this.options.crs.wrapLatLng(w(t));
      },
      wrapLatLngBounds: function (t) {
        return this.options.crs.wrapLatLngBounds(g(t));
      },
      distance: function (t, i) {
        return this.options.crs.distance(w(t), w(i));
      },
      containerPointToLayerPoint: function (t) {
        return _(t).subtract(this._getMapPanePos());
      },
      layerPointToContainerPoint: function (t) {
        return _(t).add(this._getMapPanePos());
      },
      containerPointToLatLng: function (t) {
        t = this.containerPointToLayerPoint(_(t));
        return this.layerPointToLatLng(t);
      },
      latLngToContainerPoint: function (t) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(w(t)));
      },
      mouseEventToContainerPoint: function (t) {
        return Ni(t, this._container);
      },
      mouseEventToLayerPoint: function (t) {
        return this.containerPointToLayerPoint(
          this.mouseEventToContainerPoint(t),
        );
      },
      mouseEventToLatLng: function (t) {
        return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
      },
      _initContainer: function (t) {
        t = this._container = _i(t);
        if (!t) throw new Error('Map container not found.');
        if (t._leaflet_id)
          throw new Error('Map container is already initialized.');
        S(t, 'scroll', this._onScroll, this), (this._containerId = h(t));
      },
      _initLayout: function () {
        var t = this._container,
          i =
            ((this._fadeAnimated = this.options.fadeAnimation && P.any3d),
            z(
              t,
              'leaflet-container' +
                (P.touch ? ' leaflet-touch' : '') +
                (P.retina ? ' leaflet-retina' : '') +
                (P.ielt9 ? ' leaflet-oldie' : '') +
                (P.safari ? ' leaflet-safari' : '') +
                (this._fadeAnimated ? ' leaflet-fade-anim' : ''),
            ),
            pi(t, 'position'));
        'absolute' !== i &&
          'relative' !== i &&
          'fixed' !== i &&
          (t.style.position = 'relative'),
          this._initPanes(),
          this._initControlPos && this._initControlPos();
      },
      _initPanes: function () {
        var t = (this._panes = {});
        (this._paneRenderers = {}),
          (this._mapPane = this.createPane('mapPane', this._container)),
          Z(this._mapPane, new p(0, 0)),
          this.createPane('tilePane'),
          this.createPane('overlayPane'),
          this.createPane('shadowPane'),
          this.createPane('markerPane'),
          this.createPane('tooltipPane'),
          this.createPane('popupPane'),
          this.options.markerZoomAnimation ||
            (z(t.markerPane, 'leaflet-zoom-hide'),
            z(t.shadowPane, 'leaflet-zoom-hide'));
      },
      _resetView: function (t, i) {
        Z(this._mapPane, new p(0, 0));
        var e = !this._loaded,
          n =
            ((this._loaded = !0),
            (i = this._limitZoom(i)),
            this.fire('viewprereset'),
            this._zoom !== i);
        this._moveStart(n, !1)._move(t, i)._moveEnd(n),
          this.fire('viewreset'),
          e && this.fire('load');
      },
      _moveStart: function (t, i) {
        return t && this.fire('zoomstart'), i || this.fire('movestart'), this;
      },
      _move: function (t, i, e, n) {
        void 0 === i && (i = this._zoom);
        var o = this._zoom !== i;
        return (
          (this._zoom = i),
          (this._lastCenter = t),
          (this._pixelOrigin = this._getNewPixelOrigin(t)),
          n
            ? e && e.pinch && this.fire('zoom', e)
            : ((o || (e && e.pinch)) && this.fire('zoom', e),
              this.fire('move', e)),
          this
        );
      },
      _moveEnd: function (t) {
        return t && this.fire('zoomend'), this.fire('moveend');
      },
      _stop: function () {
        return r(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
      },
      _rawPanBy: function (t) {
        Z(this._mapPane, this._getMapPanePos().subtract(t));
      },
      _getZoomSpan: function () {
        return this.getMaxZoom() - this.getMinZoom();
      },
      _panInsideMaxBounds: function () {
        this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
      },
      _checkIfLoaded: function () {
        if (!this._loaded) throw new Error('Set map center and zoom first.');
      },
      _initEvents: function (t) {
        this._targets = {};
        var i = t ? E : S;
        i(
          (this._targets[h(this._container)] = this)._container,
          'click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup',
          this._handleDOMEvent,
          this,
        ),
          this.options.trackResize && i(window, 'resize', this._onResize, this),
          P.any3d &&
            this.options.transform3DLimit &&
            (t ? this.off : this.on).call(this, 'moveend', this._onMoveEnd);
      },
      _onResize: function () {
        r(this._resizeRequest),
          (this._resizeRequest = x(function () {
            this.invalidateSize({ debounceMoveend: !0 });
          }, this));
      },
      _onScroll: function () {
        (this._container.scrollTop = 0), (this._container.scrollLeft = 0);
      },
      _onMoveEnd: function () {
        var t = this._getMapPanePos();
        Math.max(Math.abs(t.x), Math.abs(t.y)) >=
          this.options.transform3DLimit &&
          this._resetView(this.getCenter(), this.getZoom());
      },
      _findEventTargets: function (t, i) {
        for (
          var e,
            n = [],
            o = 'mouseout' === i || 'mouseover' === i,
            s = t.target || t.srcElement,
            r = !1;
          s;

        ) {
          if (
            (e = this._targets[h(s)]) &&
            ('click' === i || 'preclick' === i) &&
            this._draggableMoved(e)
          ) {
            r = !0;
            break;
          }
          if (e && e.listens(i, !0)) {
            if (o && !Hi(s, t)) break;
            if ((n.push(e), o)) break;
          }
          if (s === this._container) break;
          s = s.parentNode;
        }
        return (n = n.length || r || o || !this.listens(i, !0) ? n : [this]);
      },
      _isClickDisabled: function (t) {
        for (; t !== this._container; ) {
          if (t._leaflet_disable_click) return !0;
          t = t.parentNode;
        }
      },
      _handleDOMEvent: function (t) {
        var i,
          e = t.target || t.srcElement;
        !this._loaded ||
          e._leaflet_disable_events ||
          ('click' === t.type && this._isClickDisabled(e)) ||
          ('mousedown' === (i = t.type) && zi(e), this._fireDOMEvent(t, i));
      },
      _mouseEvents: [
        'click',
        'dblclick',
        'mouseover',
        'mouseout',
        'contextmenu',
      ],
      _fireDOMEvent: function (t, i, e) {
        'click' === t.type &&
          (((a = l({}, t)).type = 'preclick'),
          this._fireDOMEvent(a, a.type, e));
        var n = this._findEventTargets(t, i);
        if (e) {
          for (var o = [], s = 0; s < e.length; s++)
            e[s].listens(i, !0) && o.push(e[s]);
          n = o.concat(n);
        }
        if (n.length) {
          'contextmenu' === i && B(t);
          var r,
            a = n[0],
            h = { originalEvent: t };
          for (
            'keypress' !== t.type &&
              'keydown' !== t.type &&
              'keyup' !== t.type &&
              ((r = a.getLatLng && (!a._radius || a._radius <= 10)),
              (h.containerPoint = r
                ? this.latLngToContainerPoint(a.getLatLng())
                : this.mouseEventToContainerPoint(t)),
              (h.layerPoint = this.containerPointToLayerPoint(
                h.containerPoint,
              )),
              (h.latlng = r
                ? a.getLatLng()
                : this.layerPointToLatLng(h.layerPoint))),
              s = 0;
            s < n.length;
            s++
          )
            if (
              (n[s].fire(i, h, !0),
              h.originalEvent._stopped ||
                (!1 === n[s].options.bubblingMouseEvents &&
                  -1 !== G(this._mouseEvents, i)))
            )
              return;
        }
      },
      _draggableMoved: function (t) {
        return (
          ((t = t.dragging && t.dragging.enabled() ? t : this).dragging &&
            t.dragging.moved()) ||
          (this.boxZoom && this.boxZoom.moved())
        );
      },
      _clearHandlers: function () {
        for (var t = 0, i = this._handlers.length; t < i; t++)
          this._handlers[t].disable();
      },
      whenReady: function (t, i) {
        return (
          this._loaded
            ? t.call(i || this, { target: this })
            : this.on('load', t, i),
          this
        );
      },
      _getMapPanePos: function () {
        return bi(this._mapPane) || new p(0, 0);
      },
      _moved: function () {
        var t = this._getMapPanePos();
        return t && !t.equals([0, 0]);
      },
      _getTopLeftPoint: function (t, i) {
        return (
          t && void 0 !== i
            ? this._getNewPixelOrigin(t, i)
            : this.getPixelOrigin()
        ).subtract(this._getMapPanePos());
      },
      _getNewPixelOrigin: function (t, i) {
        var e = this.getSize()._divideBy(2);
        return this.project(t, i)
          ._subtract(e)
          ._add(this._getMapPanePos())
          ._round();
      },
      _latLngToNewLayerPoint: function (t, i, e) {
        e = this._getNewPixelOrigin(e, i);
        return this.project(t, i)._subtract(e);
      },
      _latLngBoundsToNewLayerBounds: function (t, i, e) {
        e = this._getNewPixelOrigin(e, i);
        return f([
          this.project(t.getSouthWest(), i)._subtract(e),
          this.project(t.getNorthWest(), i)._subtract(e),
          this.project(t.getSouthEast(), i)._subtract(e),
          this.project(t.getNorthEast(), i)._subtract(e),
        ]);
      },
      _getCenterLayerPoint: function () {
        return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
      },
      _getCenterOffset: function (t) {
        return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint());
      },
      _limitCenter: function (t, i, e) {
        if (!e) return t;
        var n = this.project(t, i),
          o = this.getSize().divideBy(2),
          o = new m(n.subtract(o), n.add(o)),
          o = this._getBoundsOffset(o, e, i);
        return o.round().equals([0, 0]) ? t : this.unproject(n.add(o), i);
      },
      _limitOffset: function (t, i) {
        if (!i) return t;
        var e = this.getPixelBounds(),
          e = new m(e.min.add(t), e.max.add(t));
        return t.add(this._getBoundsOffset(e, i));
      },
      _getBoundsOffset: function (t, i, e) {
        (i = f(
          this.project(i.getNorthEast(), e),
          this.project(i.getSouthWest(), e),
        )),
          (e = i.min.subtract(t.min)),
          (i = i.max.subtract(t.max));
        return new p(this._rebound(e.x, -i.x), this._rebound(e.y, -i.y));
      },
      _rebound: function (t, i) {
        return 0 < t + i
          ? Math.round(t - i) / 2
          : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(i));
      },
      _limitZoom: function (t) {
        var i = this.getMinZoom(),
          e = this.getMaxZoom(),
          n = P.any3d ? this.options.zoomSnap : 1;
        return n && (t = Math.round(t / n) * n), Math.max(i, Math.min(e, t));
      },
      _onPanTransitionStep: function () {
        this.fire('move');
      },
      _onPanTransitionEnd: function () {
        M(this._mapPane, 'leaflet-pan-anim'), this.fire('moveend');
      },
      _tryAnimatedPan: function (t, i) {
        t = this._getCenterOffset(t)._trunc();
        return (
          !(!0 !== (i && i.animate) && !this.getSize().contains(t)) &&
          (this.panBy(t, i), !0)
        );
      },
      _createAnimProxy: function () {
        var t = (this._proxy = b('div', 'leaflet-proxy leaflet-zoom-animated'));
        this._panes.mapPane.appendChild(t),
          this.on(
            'zoomanim',
            function (t) {
              var i = ui,
                e = this._proxy.style[i];
              Pi(
                this._proxy,
                this.project(t.center, t.zoom),
                this.getZoomScale(t.zoom, 1),
              ),
                e === this._proxy.style[i] &&
                  this._animatingZoom &&
                  this._onZoomTransitionEnd();
            },
            this,
          ),
          this.on('load moveend', this._animMoveEnd, this),
          this._on('unload', this._destroyAnimProxy, this);
      },
      _destroyAnimProxy: function () {
        T(this._proxy),
          this.off('load moveend', this._animMoveEnd, this),
          delete this._proxy;
      },
      _animMoveEnd: function () {
        var t = this.getCenter(),
          i = this.getZoom();
        Pi(this._proxy, this.project(t, i), this.getZoomScale(i, 1));
      },
      _catchTransitionEnd: function (t) {
        this._animatingZoom &&
          0 <= t.propertyName.indexOf('transform') &&
          this._onZoomTransitionEnd();
      },
      _nothingToAnimate: function () {
        return !this._container.getElementsByClassName('leaflet-zoom-animated')
          .length;
      },
      _tryAnimatedZoom: function (t, i, e) {
        if (this._animatingZoom) return !0;
        if (
          ((e = e || {}),
          !this._zoomAnimated ||
            !1 === e.animate ||
            this._nothingToAnimate() ||
            Math.abs(i - this._zoom) > this.options.zoomAnimationThreshold)
        )
          return !1;
        var n = this.getZoomScale(i),
          n = this._getCenterOffset(t)._divideBy(1 - 1 / n);
        return (
          !(!0 !== e.animate && !this.getSize().contains(n)) &&
          (x(function () {
            this._moveStart(!0, !1)._animateZoom(t, i, !0);
          }, this),
          !0)
        );
      },
      _animateZoom: function (t, i, e, n) {
        this._mapPane &&
          (e &&
            ((this._animatingZoom = !0),
            (this._animateToCenter = t),
            (this._animateToZoom = i),
            z(this._mapPane, 'leaflet-zoom-anim')),
          this.fire('zoomanim', { center: t, zoom: i, noUpdate: n }),
          this._tempFireZoomEvent ||
            (this._tempFireZoomEvent = this._zoom !== this._animateToZoom),
          this._move(this._animateToCenter, this._animateToZoom, void 0, !0),
          setTimeout(a(this._onZoomTransitionEnd, this), 250));
      },
      _onZoomTransitionEnd: function () {
        this._animatingZoom &&
          (this._mapPane && M(this._mapPane, 'leaflet-zoom-anim'),
          (this._animatingZoom = !1),
          this._move(this._animateToCenter, this._animateToZoom, void 0, !0),
          this._tempFireZoomEvent && this.fire('zoom'),
          delete this._tempFireZoomEvent,
          this.fire('move'),
          this._moveEnd(!0));
      },
    });
  function Fi(t) {
    return new I(t);
  }
  var Ui,
    I = it.extend({
      options: { position: 'topright' },
      initialize: function (t) {
        c(this, t);
      },
      getPosition: function () {
        return this.options.position;
      },
      setPosition: function (t) {
        var i = this._map;
        return (
          i && i.removeControl(this),
          (this.options.position = t),
          i && i.addControl(this),
          this
        );
      },
      getContainer: function () {
        return this._container;
      },
      addTo: function (t) {
        this.remove(), (this._map = t);
        var i = (this._container = this.onAdd(t)),
          e = this.getPosition(),
          t = t._controlCorners[e];
        return (
          z(i, 'leaflet-control'),
          -1 !== e.indexOf('bottom')
            ? t.insertBefore(i, t.firstChild)
            : t.appendChild(i),
          this._map.on('unload', this.remove, this),
          this
        );
      },
      remove: function () {
        return (
          this._map &&
            (T(this._container),
            this.onRemove && this.onRemove(this._map),
            this._map.off('unload', this.remove, this),
            (this._map = null)),
          this
        );
      },
      _refocusOnMap: function (t) {
        this._map &&
          t &&
          0 < t.screenX &&
          0 < t.screenY &&
          this._map.getContainer().focus();
      },
    }),
    Vi =
      (A.include({
        addControl: function (t) {
          return t.addTo(this), this;
        },
        removeControl: function (t) {
          return t.remove(), this;
        },
        _initControlPos: function () {
          var e = (this._controlCorners = {}),
            n = 'leaflet-',
            o = (this._controlContainer = b(
              'div',
              n + 'control-container',
              this._container,
            ));
          function t(t, i) {
            e[t + i] = b('div', n + t + ' ' + n + i, o);
          }
          t('top', 'left'),
            t('top', 'right'),
            t('bottom', 'left'),
            t('bottom', 'right');
        },
        _clearControlPos: function () {
          for (var t in this._controlCorners) T(this._controlCorners[t]);
          T(this._controlContainer),
            delete this._controlCorners,
            delete this._controlContainer;
        },
      }),
      I.extend({
        options: {
          collapsed: !0,
          position: 'topright',
          autoZIndex: !0,
          hideSingleBase: !1,
          sortLayers: !1,
          sortFunction: function (t, i, e, n) {
            return e < n ? -1 : n < e ? 1 : 0;
          },
        },
        initialize: function (t, i, e) {
          for (var n in (c(this, e),
          (this._layerControlInputs = []),
          (this._layers = []),
          (this._lastZIndex = 0),
          (this._handlingClick = !1),
          t))
            this._addLayer(t[n], n);
          for (n in i) this._addLayer(i[n], n, !0);
        },
        onAdd: function (t) {
          this._initLayout(),
            this._update(),
            (this._map = t).on('zoomend', this._checkDisabledLayers, this);
          for (var i = 0; i < this._layers.length; i++)
            this._layers[i].layer.on('add remove', this._onLayerChange, this);
          return this._container;
        },
        addTo: function (t) {
          return I.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
        },
        onRemove: function () {
          this._map.off('zoomend', this._checkDisabledLayers, this);
          for (var t = 0; t < this._layers.length; t++)
            this._layers[t].layer.off('add remove', this._onLayerChange, this);
        },
        addBaseLayer: function (t, i) {
          return this._addLayer(t, i), this._map ? this._update() : this;
        },
        addOverlay: function (t, i) {
          return this._addLayer(t, i, !0), this._map ? this._update() : this;
        },
        removeLayer: function (t) {
          t.off('add remove', this._onLayerChange, this);
          t = this._getLayer(h(t));
          return (
            t && this._layers.splice(this._layers.indexOf(t), 1),
            this._map ? this._update() : this
          );
        },
        expand: function () {
          z(this._container, 'leaflet-control-layers-expanded'),
            (this._section.style.height = null);
          var t = this._map.getSize().y - (this._container.offsetTop + 50);
          return (
            t < this._section.clientHeight
              ? (z(this._section, 'leaflet-control-layers-scrollbar'),
                (this._section.style.height = t + 'px'))
              : M(this._section, 'leaflet-control-layers-scrollbar'),
            this._checkDisabledLayers(),
            this
          );
        },
        collapse: function () {
          return M(this._container, 'leaflet-control-layers-expanded'), this;
        },
        _initLayout: function () {
          var t = 'leaflet-control-layers',
            i = (this._container = b('div', t)),
            e = this.options.collapsed,
            n =
              (i.setAttribute('aria-haspopup', !0),
              Oi(i),
              Ii(i),
              (this._section = b('section', t + '-list'))),
            o =
              (e &&
                (this._map.on('click', this.collapse, this),
                S(
                  i,
                  {
                    mouseenter: function () {
                      S(n, 'click', B),
                        this.expand(),
                        setTimeout(function () {
                          E(n, 'click', B);
                        });
                    },
                    mouseleave: this.collapse,
                  },
                  this,
                )),
              (this._layersLink = b('a', t + '-toggle', i)));
          (o.href = '#'),
            (o.title = 'Layers'),
            o.setAttribute('role', 'button'),
            S(o, 'click', B),
            S(o, 'focus', this.expand, this),
            e || this.expand(),
            (this._baseLayersList = b('div', t + '-base', n)),
            (this._separator = b('div', t + '-separator', n)),
            (this._overlaysList = b('div', t + '-overlays', n)),
            i.appendChild(n);
        },
        _getLayer: function (t) {
          for (var i = 0; i < this._layers.length; i++)
            if (this._layers[i] && h(this._layers[i].layer) === t)
              return this._layers[i];
        },
        _addLayer: function (t, i, e) {
          this._map && t.on('add remove', this._onLayerChange, this),
            this._layers.push({ layer: t, name: i, overlay: e }),
            this.options.sortLayers &&
              this._layers.sort(
                a(function (t, i) {
                  return this.options.sortFunction(
                    t.layer,
                    i.layer,
                    t.name,
                    i.name,
                  );
                }, this),
              ),
            this.options.autoZIndex &&
              t.setZIndex &&
              (this._lastZIndex++, t.setZIndex(this._lastZIndex)),
            this._expandIfNotCollapsed();
        },
        _update: function () {
          if (!this._container) return this;
          mi(this._baseLayersList),
            mi(this._overlaysList),
            (this._layerControlInputs = []);
          for (var t, i, e, n = 0, o = 0; o < this._layers.length; o++)
            (e = this._layers[o]),
              this._addItem(e),
              (i = i || e.overlay),
              (t = t || !e.overlay),
              (n += e.overlay ? 0 : 1);
          return (
            this.options.hideSingleBase &&
              (this._baseLayersList.style.display = (t = t && 1 < n)
                ? ''
                : 'none'),
            (this._separator.style.display = i && t ? '' : 'none'),
            this
          );
        },
        _onLayerChange: function (t) {
          this._handlingClick || this._update();
          var i = this._getLayer(h(t.target)),
            t = i.overlay
              ? 'add' === t.type
                ? 'overlayadd'
                : 'overlayremove'
              : 'add' === t.type
              ? 'baselayerchange'
              : null;
          t && this._map.fire(t, i);
        },
        _createRadioElement: function (t, i) {
          (t =
            '<input type="radio" class="leaflet-control-layers-selector" name="' +
            t +
            '"' +
            (i ? ' checked="checked"' : '') +
            '/>'),
            (i = document.createElement('div'));
          return (i.innerHTML = t), i.firstChild;
        },
        _addItem: function (t) {
          var i,
            e = document.createElement('label'),
            n = this._map.hasLayer(t.layer),
            n =
              (t.overlay
                ? (((i = document.createElement('input')).type = 'checkbox'),
                  (i.className = 'leaflet-control-layers-selector'),
                  (i.defaultChecked = n))
                : (i = this._createRadioElement(
                    'leaflet-base-layers_' + h(this),
                    n,
                  )),
              this._layerControlInputs.push(i),
              (i.layerId = h(t.layer)),
              S(i, 'click', this._onInputClick, this),
              document.createElement('span')),
            o = ((n.innerHTML = ' ' + t.name), document.createElement('span'));
          return (
            e.appendChild(o),
            o.appendChild(i),
            o.appendChild(n),
            (t.overlay ? this._overlaysList : this._baseLayersList).appendChild(
              e,
            ),
            this._checkDisabledLayers(),
            e
          );
        },
        _onInputClick: function () {
          var t,
            i,
            e = this._layerControlInputs,
            n = [],
            o = [];
          this._handlingClick = !0;
          for (var s = e.length - 1; 0 <= s; s--)
            (t = e[s]),
              (i = this._getLayer(t.layerId).layer),
              t.checked ? n.push(i) : t.checked || o.push(i);
          for (s = 0; s < o.length; s++)
            this._map.hasLayer(o[s]) && this._map.removeLayer(o[s]);
          for (s = 0; s < n.length; s++)
            this._map.hasLayer(n[s]) || this._map.addLayer(n[s]);
          (this._handlingClick = !1), this._refocusOnMap();
        },
        _checkDisabledLayers: function () {
          for (
            var t,
              i,
              e = this._layerControlInputs,
              n = this._map.getZoom(),
              o = e.length - 1;
            0 <= o;
            o--
          )
            (t = e[o]),
              (i = this._getLayer(t.layerId).layer),
              (t.disabled =
                (void 0 !== i.options.minZoom && n < i.options.minZoom) ||
                (void 0 !== i.options.maxZoom && n > i.options.maxZoom));
        },
        _expandIfNotCollapsed: function () {
          return this._map && !this.options.collapsed && this.expand(), this;
        },
      })),
    qi = I.extend({
      options: {
        position: 'topleft',
        zoomInText: '<span aria-hidden="true">+</span>',
        zoomInTitle: 'Zoom in',
        zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
        zoomOutTitle: 'Zoom out',
      },
      onAdd: function (t) {
        var i = 'leaflet-control-zoom',
          e = b('div', i + ' leaflet-bar'),
          n = this.options;
        return (
          (this._zoomInButton = this._createButton(
            n.zoomInText,
            n.zoomInTitle,
            i + '-in',
            e,
            this._zoomIn,
          )),
          (this._zoomOutButton = this._createButton(
            n.zoomOutText,
            n.zoomOutTitle,
            i + '-out',
            e,
            this._zoomOut,
          )),
          this._updateDisabled(),
          t.on('zoomend zoomlevelschange', this._updateDisabled, this),
          e
        );
      },
      onRemove: function (t) {
        t.off('zoomend zoomlevelschange', this._updateDisabled, this);
      },
      disable: function () {
        return (this._disabled = !0), this._updateDisabled(), this;
      },
      enable: function () {
        return (this._disabled = !1), this._updateDisabled(), this;
      },
      _zoomIn: function (t) {
        !this._disabled &&
          this._map._zoom < this._map.getMaxZoom() &&
          this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
      },
      _zoomOut: function (t) {
        !this._disabled &&
          this._map._zoom > this._map.getMinZoom() &&
          this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
      },
      _createButton: function (t, i, e, n, o) {
        e = b('a', e, n);
        return (
          (e.innerHTML = t),
          (e.href = '#'),
          (e.title = i),
          e.setAttribute('role', 'button'),
          e.setAttribute('aria-label', i),
          Oi(e),
          S(e, 'click', Ri),
          S(e, 'click', o, this),
          S(e, 'click', this._refocusOnMap, this),
          e
        );
      },
      _updateDisabled: function () {
        var t = this._map,
          i = 'leaflet-disabled';
        M(this._zoomInButton, i),
          M(this._zoomOutButton, i),
          this._zoomInButton.setAttribute('aria-disabled', 'false'),
          this._zoomOutButton.setAttribute('aria-disabled', 'false'),
          (!this._disabled && t._zoom !== t.getMinZoom()) ||
            (z(this._zoomOutButton, i),
            this._zoomOutButton.setAttribute('aria-disabled', 'true')),
          (!this._disabled && t._zoom !== t.getMaxZoom()) ||
            (z(this._zoomInButton, i),
            this._zoomInButton.setAttribute('aria-disabled', 'true'));
      },
    }),
    Gi =
      (A.mergeOptions({ zoomControl: !0 }),
      A.addInitHook(function () {
        this.options.zoomControl &&
          ((this.zoomControl = new qi()), this.addControl(this.zoomControl));
      }),
      I.extend({
        options: {
          position: 'bottomleft',
          maxWidth: 100,
          metric: !0,
          imperial: !0,
        },
        onAdd: function (t) {
          var i = 'leaflet-control-scale',
            e = b('div', i),
            n = this.options;
          return (
            this._addScales(n, i + '-line', e),
            t.on(n.updateWhenIdle ? 'moveend' : 'move', this._update, this),
            t.whenReady(this._update, this),
            e
          );
        },
        onRemove: function (t) {
          t.off(
            this.options.updateWhenIdle ? 'moveend' : 'move',
            this._update,
            this,
          );
        },
        _addScales: function (t, i, e) {
          t.metric && (this._mScale = b('div', i, e)),
            t.imperial && (this._iScale = b('div', i, e));
        },
        _update: function () {
          var t = this._map,
            i = t.getSize().y / 2,
            t = t.distance(
              t.containerPointToLatLng([0, i]),
              t.containerPointToLatLng([this.options.maxWidth, i]),
            );
          this._updateScales(t);
        },
        _updateScales: function (t) {
          this.options.metric && t && this._updateMetric(t),
            this.options.imperial && t && this._updateImperial(t);
        },
        _updateMetric: function (t) {
          var i = this._getRoundNum(t);
          this._updateScale(
            this._mScale,
            i < 1e3 ? i + ' m' : i / 1e3 + ' km',
            i / t,
          );
        },
        _updateImperial: function (t) {
          var i,
            e,
            t = 3.2808399 * t;
          5280 < t
            ? ((e = this._getRoundNum((i = t / 5280))),
              this._updateScale(this._iScale, e + ' mi', e / i))
            : ((e = this._getRoundNum(t)),
              this._updateScale(this._iScale, e + ' ft', e / t));
        },
        _updateScale: function (t, i, e) {
          (t.style.width = Math.round(this.options.maxWidth * e) + 'px'),
            (t.innerHTML = i);
        },
        _getRoundNum: function (t) {
          var i = Math.pow(10, (Math.floor(t) + '').length - 1),
            t = t / i;
          return (
            i * (t = 10 <= t ? 10 : 5 <= t ? 5 : 3 <= t ? 3 : 2 <= t ? 2 : 1)
          );
        },
      })),
    Ki = I.extend({
      options: {
        position: 'bottomright',
        prefix:
          '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' +
          (P.inlineSvg
            ? '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg> '
            : '') +
          'Leaflet</a>',
      },
      initialize: function (t) {
        c(this, t), (this._attributions = {});
      },
      onAdd: function (t) {
        for (var i in (((t.attributionControl = this)._container = b(
          'div',
          'leaflet-control-attribution',
        )),
        Oi(this._container),
        t._layers))
          t._layers[i].getAttribution &&
            this.addAttribution(t._layers[i].getAttribution());
        return (
          this._update(),
          t.on('layeradd', this._addAttribution, this),
          this._container
        );
      },
      onRemove: function (t) {
        t.off('layeradd', this._addAttribution, this);
      },
      _addAttribution: function (t) {
        t.layer.getAttribution &&
          (this.addAttribution(t.layer.getAttribution()),
          t.layer.once(
            'remove',
            function () {
              this.removeAttribution(t.layer.getAttribution());
            },
            this,
          ));
      },
      setPrefix: function (t) {
        return (this.options.prefix = t), this._update(), this;
      },
      addAttribution: function (t) {
        return (
          t &&
            (this._attributions[t] || (this._attributions[t] = 0),
            this._attributions[t]++,
            this._update()),
          this
        );
      },
      removeAttribution: function (t) {
        return (
          t &&
            this._attributions[t] &&
            (this._attributions[t]--, this._update()),
          this
        );
      },
      _update: function () {
        if (this._map) {
          var t,
            i = [];
          for (t in this._attributions) this._attributions[t] && i.push(t);
          var e = [];
          this.options.prefix && e.push(this.options.prefix),
            i.length && e.push(i.join(', ')),
            (this._container.innerHTML = e.join(
              ' <span aria-hidden="true">|</span> ',
            ));
        }
      },
    }),
    n =
      (A.mergeOptions({ attributionControl: !0 }),
      A.addInitHook(function () {
        this.options.attributionControl && new Ki().addTo(this);
      }),
      (I.Layers = Vi),
      (I.Zoom = qi),
      (I.Scale = Gi),
      (I.Attribution = Ki),
      (Fi.layers = function (t, i, e) {
        return new Vi(t, i, e);
      }),
      (Fi.zoom = function (t) {
        return new qi(t);
      }),
      (Fi.scale = function (t) {
        return new Gi(t);
      }),
      (Fi.attribution = function (t) {
        return new Ki(t);
      }),
      it.extend({
        initialize: function (t) {
          this._map = t;
        },
        enable: function () {
          return this._enabled || ((this._enabled = !0), this.addHooks()), this;
        },
        disable: function () {
          return (
            this._enabled && ((this._enabled = !1), this.removeHooks()), this
          );
        },
        enabled: function () {
          return !!this._enabled;
        },
      })),
    ft =
      ((n.addTo = function (t, i) {
        return t.addHandler(i, this), this;
      }),
      { Events: i }),
    Yi = P.touch ? 'touchstart mousedown' : 'mousedown',
    Xi = et.extend({
      options: { clickTolerance: 3 },
      initialize: function (t, i, e, n) {
        c(this, n),
          (this._element = t),
          (this._dragStartTarget = i || t),
          (this._preventOutline = e);
      },
      enable: function () {
        this._enabled ||
          (S(this._dragStartTarget, Yi, this._onDown, this),
          (this._enabled = !0));
      },
      disable: function () {
        this._enabled &&
          (Xi._dragging === this && this.finishDrag(!0),
          E(this._dragStartTarget, Yi, this._onDown, this),
          (this._enabled = !1),
          (this._moved = !1));
      },
      _onDown: function (t) {
        var i, e;
        this._enabled &&
          ((this._moved = !1),
          vi(this._element, 'leaflet-zoom-anim') ||
            (t.touches && 1 !== t.touches.length
              ? Xi._dragging === this && this.finishDrag()
              : Xi._dragging ||
                t.shiftKey ||
                (1 !== t.which && 1 !== t.button && !t.touches) ||
                ((Xi._dragging = this)._preventOutline && zi(this._element),
                Li(),
                ri(),
                this._moving ||
                  (this.fire('down'),
                  (e = t.touches ? t.touches[0] : t),
                  (i = Ci(this._element)),
                  (this._startPoint = new p(e.clientX, e.clientY)),
                  (this._startPos = bi(this._element)),
                  (this._parentScale = Zi(i)),
                  (e = 'mousedown' === t.type),
                  S(
                    document,
                    e ? 'mousemove' : 'touchmove',
                    this._onMove,
                    this,
                  ),
                  S(
                    document,
                    e ? 'mouseup' : 'touchend touchcancel',
                    this._onUp,
                    this,
                  )))));
      },
      _onMove: function (t) {
        var i;
        this._enabled &&
          (t.touches && 1 < t.touches.length
            ? (this._moved = !0)
            : (!(i = new p(
                (i =
                  t.touches && 1 === t.touches.length
                    ? t.touches[0]
                    : t).clientX,
                i.clientY,
              )._subtract(this._startPoint)).x &&
                !i.y) ||
              Math.abs(i.x) + Math.abs(i.y) < this.options.clickTolerance ||
              ((i.x /= this._parentScale.x),
              (i.y /= this._parentScale.y),
              B(t),
              this._moved ||
                (this.fire('dragstart'),
                (this._moved = !0),
                z(document.body, 'leaflet-dragging'),
                (this._lastTarget = t.target || t.srcElement),
                window.SVGElementInstance &&
                  this._lastTarget instanceof window.SVGElementInstance &&
                  (this._lastTarget = this._lastTarget.correspondingUseElement),
                z(this._lastTarget, 'leaflet-drag-target')),
              (this._newPos = this._startPos.add(i)),
              (this._moving = !0),
              (this._lastEvent = t),
              this._updatePosition()));
      },
      _updatePosition: function () {
        var t = { originalEvent: this._lastEvent };
        this.fire('predrag', t),
          Z(this._element, this._newPos),
          this.fire('drag', t);
      },
      _onUp: function () {
        this._enabled && this.finishDrag();
      },
      finishDrag: function (t) {
        M(document.body, 'leaflet-dragging'),
          this._lastTarget &&
            (M(this._lastTarget, 'leaflet-drag-target'),
            (this._lastTarget = null)),
          E(document, 'mousemove touchmove', this._onMove, this),
          E(document, 'mouseup touchend touchcancel', this._onUp, this),
          Ti(),
          ai(),
          this._moved &&
            this._moving &&
            this.fire('dragend', {
              noInertia: t,
              distance: this._newPos.distanceTo(this._startPos),
            }),
          (this._moving = !1),
          (Xi._dragging = !1);
      },
    });
  function Ji(t, i) {
    if (!i || !t.length) return t.slice();
    i *= i;
    return (t = (function (t, i) {
      var e = t.length,
        n = new (typeof Uint8Array != void 0 + '' ? Uint8Array : Array)(e);
      (n[0] = n[e - 1] = 1),
        (function t(i, e, n, o, s) {
          var r,
            a,
            h,
            l = 0;
          for (a = o + 1; a <= s - 1; a++)
            (h = ee(i[a], i[o], i[s], !0)), l < h && ((r = a), (l = h));
          n < l && ((e[r] = 1), t(i, e, n, o, r), t(i, e, n, r, s));
        })(t, n, i, 0, e - 1);
      var o,
        s = [];
      for (o = 0; o < e; o++) n[o] && s.push(t[o]);
      return s;
    })(
      (t = (function (t, i) {
        for (var e = [t[0]], n = 1, o = 0, s = t.length; n < s; n++)
          (function (t, i) {
            var e = i.x - t.x,
              i = i.y - t.y;
            return e * e + i * i;
          })(t[n], t[o]) > i && (e.push(t[n]), (o = n));
        o < s - 1 && e.push(t[s - 1]);
        return e;
      })(t, i)),
      i,
    ));
  }
  function $i(t, i, e) {
    return Math.sqrt(ee(t, i, e, !0));
  }
  function Qi(t, i, e, n, o) {
    var s,
      r,
      a,
      h = n ? Ui : ie(t, e),
      l = ie(i, e);
    for (Ui = l; ; ) {
      if (!(h | l)) return [t, i];
      if (h & l) return !1;
      (a = ie((r = te(t, i, (s = h || l), e, o)), e)),
        s === h ? ((t = r), (h = a)) : ((i = r), (l = a));
    }
  }
  function te(t, i, e, n, o) {
    var s,
      r,
      a = i.x - t.x,
      i = i.y - t.y,
      h = n.min,
      n = n.max;
    return (
      8 & e
        ? ((s = t.x + (a * (n.y - t.y)) / i), (r = n.y))
        : 4 & e
        ? ((s = t.x + (a * (h.y - t.y)) / i), (r = h.y))
        : 2 & e
        ? ((s = n.x), (r = t.y + (i * (n.x - t.x)) / a))
        : 1 & e && ((s = h.x), (r = t.y + (i * (h.x - t.x)) / a)),
      new p(s, r, o)
    );
  }
  function ie(t, i) {
    var e = 0;
    return (
      t.x < i.min.x ? (e |= 1) : t.x > i.max.x && (e |= 2),
      t.y < i.min.y ? (e |= 4) : t.y > i.max.y && (e |= 8),
      e
    );
  }
  function ee(t, i, e, n) {
    var o = i.x,
      i = i.y,
      s = e.x - o,
      r = e.y - i,
      a = s * s + r * r;
    return (
      0 < a &&
        (1 < (a = ((t.x - o) * s + (t.y - i) * r) / a)
          ? ((o = e.x), (i = e.y))
          : 0 < a && ((o += s * a), (i += r * a))),
      (s = t.x - o),
      (r = t.y - i),
      n ? s * s + r * r : new p(o, i)
    );
  }
  function ne(t) {
    return !d(t[0]) || ('object' != typeof t[0][0] && void 0 !== t[0][0]);
  }
  function oe(t) {
    return (
      console.warn(
        'Deprecated use of _flat, please use L.LineUtil.isFlat instead.',
      ),
      ne(t)
    );
  }
  gt = {
    __proto__: null,
    simplify: Ji,
    pointToSegmentDistance: $i,
    closestPointOnSegment: function (t, i, e) {
      return ee(t, i, e);
    },
    clipSegment: Qi,
    _getEdgeIntersection: te,
    _getBitCode: ie,
    _sqClosestPointOnSegment: ee,
    isFlat: ne,
    _flat: oe,
  };
  function se(t, i, e) {
    for (
      var n, o, s, r, a, h, l, u = [1, 4, 2, 8], c = 0, d = t.length;
      c < d;
      c++
    )
      t[c]._code = ie(t[c], i);
    for (s = 0; s < 4; s++) {
      for (h = u[s], n = [], c = 0, o = (d = t.length) - 1; c < d; o = c++)
        (r = t[c]),
          (a = t[o]),
          r._code & h
            ? a._code & h ||
              (((l = te(a, r, h, i, e))._code = ie(l, i)), n.push(l))
            : (a._code & h &&
                (((l = te(a, r, h, i, e))._code = ie(l, i)), n.push(l)),
              n.push(r));
      t = n;
    }
    return t;
  }
  var vt = { __proto__: null, clipPolygon: se },
    yt = {
      project: function (t) {
        return new p(t.lng, t.lat);
      },
      unproject: function (t) {
        return new v(t.y, t.x);
      },
      bounds: new m([-180, -90], [180, 90]),
    },
    xt = {
      R: 6378137,
      R_MINOR: 6356752.314245179,
      bounds: new m(
        [-20037508.34279, -15496570.73972],
        [20037508.34279, 18764656.23138],
      ),
      project: function (t) {
        var i = Math.PI / 180,
          e = this.R,
          n = t.lat * i,
          o = this.R_MINOR / e,
          o = Math.sqrt(1 - o * o),
          s = o * Math.sin(n),
          s =
            Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - s) / (1 + s), o / 2),
          n = -e * Math.log(Math.max(s, 1e-10));
        return new p(t.lng * i * e, n);
      },
      unproject: function (t) {
        for (
          var i,
            e = 180 / Math.PI,
            n = this.R,
            o = this.R_MINOR / n,
            s = Math.sqrt(1 - o * o),
            r = Math.exp(-t.y / n),
            a = Math.PI / 2 - 2 * Math.atan(r),
            h = 0,
            l = 0.1;
          h < 15 && 1e-7 < Math.abs(l);
          h++
        )
          (i = s * Math.sin(a)),
            (i = Math.pow((1 - i) / (1 + i), s / 2)),
            (a += l = Math.PI / 2 - 2 * Math.atan(r * i) - a);
        return new v(a * e, (t.x * e) / n);
      },
    },
    wt = { __proto__: null, LonLat: yt, Mercator: xt, SphericalMercator: rt },
    bt = l({}, st, {
      code: 'EPSG:3395',
      projection: xt,
      transformation: ht((Pt = 0.5 / (Math.PI * xt.R)), 0.5, -Pt, 0.5),
    }),
    re = l({}, st, {
      code: 'EPSG:4326',
      projection: yt,
      transformation: ht(1 / 180, 1, -1 / 180, 0.5),
    }),
    Lt = l({}, ot, {
      projection: yt,
      transformation: ht(1, 0, -1, 0),
      scale: function (t) {
        return Math.pow(2, t);
      },
      zoom: function (t) {
        return Math.log(t) / Math.LN2;
      },
      distance: function (t, i) {
        var e = i.lng - t.lng,
          i = i.lat - t.lat;
        return Math.sqrt(e * e + i * i);
      },
      infinite: !0,
    }),
    o =
      ((ot.Earth = st),
      (ot.EPSG3395 = bt),
      (ot.EPSG3857 = lt),
      (ot.EPSG900913 = ut),
      (ot.EPSG4326 = re),
      (ot.Simple = Lt),
      et.extend({
        options: {
          pane: 'overlayPane',
          attribution: null,
          bubblingMouseEvents: !0,
        },
        addTo: function (t) {
          return t.addLayer(this), this;
        },
        remove: function () {
          return this.removeFrom(this._map || this._mapToAdd);
        },
        removeFrom: function (t) {
          return t && t.removeLayer(this), this;
        },
        getPane: function (t) {
          return this._map.getPane(
            t ? this.options[t] || t : this.options.pane,
          );
        },
        addInteractiveTarget: function (t) {
          return (this._map._targets[h(t)] = this);
        },
        removeInteractiveTarget: function (t) {
          return delete this._map._targets[h(t)], this;
        },
        getAttribution: function () {
          return this.options.attribution;
        },
        _layerAdd: function (t) {
          var i,
            e = t.target;
          e.hasLayer(this) &&
            ((this._map = e),
            (this._zoomAnimated = e._zoomAnimated),
            this.getEvents &&
              ((i = this.getEvents()),
              e.on(i, this),
              this.once(
                'remove',
                function () {
                  e.off(i, this);
                },
                this,
              )),
            this.onAdd(e),
            this.fire('add'),
            e.fire('layeradd', { layer: this }));
        },
      })),
    ae =
      (A.include({
        addLayer: function (t) {
          if (!t._layerAdd)
            throw new Error('The provided object is not a Layer.');
          var i = h(t);
          return (
            this._layers[i] ||
              (((this._layers[i] = t)._mapToAdd = this),
              t.beforeAdd && t.beforeAdd(this),
              this.whenReady(t._layerAdd, t)),
            this
          );
        },
        removeLayer: function (t) {
          var i = h(t);
          return (
            this._layers[i] &&
              (this._loaded && t.onRemove(this),
              delete this._layers[i],
              this._loaded &&
                (this.fire('layerremove', { layer: t }), t.fire('remove')),
              (t._map = t._mapToAdd = null)),
            this
          );
        },
        hasLayer: function (t) {
          return h(t) in this._layers;
        },
        eachLayer: function (t, i) {
          for (var e in this._layers) t.call(i, this._layers[e]);
          return this;
        },
        _addLayers: function (t) {
          for (
            var i = 0, e = (t = t ? (d(t) ? t : [t]) : []).length;
            i < e;
            i++
          )
            this.addLayer(t[i]);
        },
        _addZoomLimit: function (t) {
          (isNaN(t.options.maxZoom) && isNaN(t.options.minZoom)) ||
            ((this._zoomBoundLayers[h(t)] = t), this._updateZoomLevels());
        },
        _removeZoomLimit: function (t) {
          t = h(t);
          this._zoomBoundLayers[t] &&
            (delete this._zoomBoundLayers[t], this._updateZoomLevels());
        },
        _updateZoomLevels: function () {
          var t,
            i = 1 / 0,
            e = -1 / 0,
            n = this._getZoomSpan();
          for (t in this._zoomBoundLayers)
            var o = this._zoomBoundLayers[t].options,
              i = void 0 === o.minZoom ? i : Math.min(i, o.minZoom),
              e = void 0 === o.maxZoom ? e : Math.max(e, o.maxZoom);
          (this._layersMaxZoom = e === -1 / 0 ? void 0 : e),
            (this._layersMinZoom = i === 1 / 0 ? void 0 : i),
            n !== this._getZoomSpan() && this.fire('zoomlevelschange'),
            void 0 === this.options.maxZoom &&
              this._layersMaxZoom &&
              this.getZoom() > this._layersMaxZoom &&
              this.setZoom(this._layersMaxZoom),
            void 0 === this.options.minZoom &&
              this._layersMinZoom &&
              this.getZoom() < this._layersMinZoom &&
              this.setZoom(this._layersMinZoom);
        },
      }),
      o.extend({
        initialize: function (t, i) {
          var e, n;
          if ((c(this, i), (this._layers = {}), t))
            for (e = 0, n = t.length; e < n; e++) this.addLayer(t[e]);
        },
        addLayer: function (t) {
          var i = this.getLayerId(t);
          return (
            (this._layers[i] = t), this._map && this._map.addLayer(t), this
          );
        },
        removeLayer: function (t) {
          t = t in this._layers ? t : this.getLayerId(t);
          return (
            this._map &&
              this._layers[t] &&
              this._map.removeLayer(this._layers[t]),
            delete this._layers[t],
            this
          );
        },
        hasLayer: function (t) {
          return (
            ('number' == typeof t ? t : this.getLayerId(t)) in this._layers
          );
        },
        clearLayers: function () {
          return this.eachLayer(this.removeLayer, this);
        },
        invoke: function (t) {
          var i,
            e,
            n = Array.prototype.slice.call(arguments, 1);
          for (i in this._layers) (e = this._layers[i])[t] && e[t].apply(e, n);
          return this;
        },
        onAdd: function (t) {
          this.eachLayer(t.addLayer, t);
        },
        onRemove: function (t) {
          this.eachLayer(t.removeLayer, t);
        },
        eachLayer: function (t, i) {
          for (var e in this._layers) t.call(i, this._layers[e]);
          return this;
        },
        getLayer: function (t) {
          return this._layers[t];
        },
        getLayers: function () {
          var t = [];
          return this.eachLayer(t.push, t), t;
        },
        setZIndex: function (t) {
          return this.invoke('setZIndex', t);
        },
        getLayerId: h,
      })),
    he = ae.extend({
      addLayer: function (t) {
        return this.hasLayer(t)
          ? this
          : (t.addEventParent(this),
            ae.prototype.addLayer.call(this, t),
            this.fire('layeradd', { layer: t }));
      },
      removeLayer: function (t) {
        return this.hasLayer(t)
          ? ((t = t in this._layers ? this._layers[t] : t).removeEventParent(
              this,
            ),
            ae.prototype.removeLayer.call(this, t),
            this.fire('layerremove', { layer: t }))
          : this;
      },
      setStyle: function (t) {
        return this.invoke('setStyle', t);
      },
      bringToFront: function () {
        return this.invoke('bringToFront');
      },
      bringToBack: function () {
        return this.invoke('bringToBack');
      },
      getBounds: function () {
        var t,
          i = new s();
        for (t in this._layers) {
          var e = this._layers[t];
          i.extend(e.getBounds ? e.getBounds() : e.getLatLng());
        }
        return i;
      },
    }),
    le = it.extend({
      options: { popupAnchor: [0, 0], tooltipAnchor: [0, 0], crossOrigin: !1 },
      initialize: function (t) {
        c(this, t);
      },
      createIcon: function (t) {
        return this._createIcon('icon', t);
      },
      createShadow: function (t) {
        return this._createIcon('shadow', t);
      },
      _createIcon: function (t, i) {
        var e = this._getIconUrl(t);
        if (!e) {
          if ('icon' === t)
            throw new Error('iconUrl not set in Icon options (see the docs).');
          return null;
        }
        e = this._createImg(e, i && 'IMG' === i.tagName ? i : null);
        return (
          this._setIconStyles(e, t),
          (!this.options.crossOrigin && '' !== this.options.crossOrigin) ||
            (e.crossOrigin =
              !0 === this.options.crossOrigin ? '' : this.options.crossOrigin),
          e
        );
      },
      _setIconStyles: function (t, i) {
        var e = this.options,
          n = e[i + 'Size'],
          n = _((n = 'number' == typeof n ? [n, n] : n)),
          o = _(
            ('shadow' === i && e.shadowAnchor) ||
              e.iconAnchor ||
              (n && n.divideBy(2, !0)),
          );
        (t.className = 'leaflet-marker-' + i + ' ' + (e.className || '')),
          o &&
            ((t.style.marginLeft = -o.x + 'px'),
            (t.style.marginTop = -o.y + 'px')),
          n && ((t.style.width = n.x + 'px'), (t.style.height = n.y + 'px'));
      },
      _createImg: function (t, i) {
        return ((i = i || document.createElement('img')).src = t), i;
      },
      _getIconUrl: function (t) {
        return (
          (P.retina && this.options[t + 'RetinaUrl']) || this.options[t + 'Url']
        );
      },
    });
  var ue = le.extend({
      options: {
        iconUrl: 'marker-icon.png',
        iconRetinaUrl: 'marker-icon-2x.png',
        shadowUrl: 'marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      },
      _getIconUrl: function (t) {
        return (
          'string' != typeof ue.imagePath &&
            (ue.imagePath = this._detectIconPath()),
          (this.options.imagePath || ue.imagePath) +
            le.prototype._getIconUrl.call(this, t)
        );
      },
      _stripUrl: function (t) {
        function i(t, i, e) {
          return (i = i.exec(t)) && i[e];
        }
        return (
          (t = i(t, /^url\((['"])?(.+)\1\)$/, 2)) &&
          i(t, /^(.*)marker-icon\.png$/, 1)
        );
      },
      _detectIconPath: function () {
        var t = b('div', 'leaflet-default-icon-path', document.body),
          i = pi(t, 'background-image') || pi(t, 'backgroundImage');
        if ((document.body.removeChild(t), (i = this._stripUrl(i)))) return i;
        t = document.querySelector('link[href$="leaflet.css"]');
        return t
          ? t.href.substring(0, t.href.length - 'leaflet.css'.length - 1)
          : '';
      },
    }),
    ce = n.extend({
      initialize: function (t) {
        this._marker = t;
      },
      addHooks: function () {
        var t = this._marker._icon;
        this._draggable || (this._draggable = new Xi(t, t, !0)),
          this._draggable
            .on(
              {
                dragstart: this._onDragStart,
                predrag: this._onPreDrag,
                drag: this._onDrag,
                dragend: this._onDragEnd,
              },
              this,
            )
            .enable(),
          z(t, 'leaflet-marker-draggable');
      },
      removeHooks: function () {
        this._draggable
          .off(
            {
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd,
            },
            this,
          )
          .disable(),
          this._marker._icon &&
            M(this._marker._icon, 'leaflet-marker-draggable');
      },
      moved: function () {
        return this._draggable && this._draggable._moved;
      },
      _adjustPan: function (t) {
        var i = this._marker,
          e = i._map,
          n = this._marker.options.autoPanSpeed,
          o = this._marker.options.autoPanPadding,
          s = bi(i._icon),
          r = e.getPixelBounds(),
          a = e.getPixelOrigin(),
          a = f(r.min._subtract(a).add(o), r.max._subtract(a).subtract(o));
        a.contains(s) ||
          ((o = _(
            (Math.max(a.max.x, s.x) - a.max.x) / (r.max.x - a.max.x) -
              (Math.min(a.min.x, s.x) - a.min.x) / (r.min.x - a.min.x),
            (Math.max(a.max.y, s.y) - a.max.y) / (r.max.y - a.max.y) -
              (Math.min(a.min.y, s.y) - a.min.y) / (r.min.y - a.min.y),
          ).multiplyBy(n)),
          e.panBy(o, { animate: !1 }),
          this._draggable._newPos._add(o),
          this._draggable._startPos._add(o),
          Z(i._icon, this._draggable._newPos),
          this._onDrag(t),
          (this._panRequest = x(this._adjustPan.bind(this, t))));
      },
      _onDragStart: function () {
        (this._oldLatLng = this._marker.getLatLng()),
          this._marker.closePopup && this._marker.closePopup(),
          this._marker.fire('movestart').fire('dragstart');
      },
      _onPreDrag: function (t) {
        this._marker.options.autoPan &&
          (r(this._panRequest),
          (this._panRequest = x(this._adjustPan.bind(this, t))));
      },
      _onDrag: function (t) {
        var i = this._marker,
          e = i._shadow,
          n = bi(i._icon),
          o = i._map.layerPointToLatLng(n);
        e && Z(e, n),
          (i._latlng = o),
          (t.latlng = o),
          (t.oldLatLng = this._oldLatLng),
          i.fire('move', t).fire('drag', t);
      },
      _onDragEnd: function (t) {
        r(this._panRequest),
          delete this._oldLatLng,
          this._marker.fire('moveend').fire('dragend', t);
      },
    }),
    de = o.extend({
      options: {
        icon: new ue(),
        interactive: !0,
        keyboard: !0,
        title: '',
        alt: 'Marker',
        zIndexOffset: 0,
        opacity: 1,
        riseOnHover: !1,
        riseOffset: 250,
        pane: 'markerPane',
        shadowPane: 'shadowPane',
        bubblingMouseEvents: !1,
        autoPanOnFocus: !0,
        draggable: !1,
        autoPan: !1,
        autoPanPadding: [50, 50],
        autoPanSpeed: 10,
      },
      initialize: function (t, i) {
        c(this, i), (this._latlng = w(t));
      },
      onAdd: function (t) {
        (this._zoomAnimated =
          this._zoomAnimated && t.options.markerZoomAnimation),
          this._zoomAnimated && t.on('zoomanim', this._animateZoom, this),
          this._initIcon(),
          this.update();
      },
      onRemove: function (t) {
        this.dragging &&
          this.dragging.enabled() &&
          ((this.options.draggable = !0), this.dragging.removeHooks()),
          delete this.dragging,
          this._zoomAnimated && t.off('zoomanim', this._animateZoom, this),
          this._removeIcon(),
          this._removeShadow();
      },
      getEvents: function () {
        return { zoom: this.update, viewreset: this.update };
      },
      getLatLng: function () {
        return this._latlng;
      },
      setLatLng: function (t) {
        var i = this._latlng;
        return (
          (this._latlng = w(t)),
          this.update(),
          this.fire('move', { oldLatLng: i, latlng: this._latlng })
        );
      },
      setZIndexOffset: function (t) {
        return (this.options.zIndexOffset = t), this.update();
      },
      getIcon: function () {
        return this.options.icon;
      },
      setIcon: function (t) {
        return (
          (this.options.icon = t),
          this._map && (this._initIcon(), this.update()),
          this._popup && this.bindPopup(this._popup, this._popup.options),
          this
        );
      },
      getElement: function () {
        return this._icon;
      },
      update: function () {
        var t;
        return (
          this._icon &&
            this._map &&
            ((t = this._map.latLngToLayerPoint(this._latlng).round()),
            this._setPos(t)),
          this
        );
      },
      _initIcon: function () {
        var t = this.options,
          i = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide'),
          e = t.icon.createIcon(this._icon),
          n = !1,
          e =
            (e !== this._icon &&
              (this._icon && this._removeIcon(),
              (n = !0),
              t.title && (e.title = t.title),
              'IMG' === e.tagName && (e.alt = t.alt || '')),
            z(e, i),
            t.keyboard &&
              ((e.tabIndex = '0'), e.setAttribute('role', 'button')),
            (this._icon = e),
            t.riseOnHover &&
              this.on({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex,
              }),
            this.options.autoPanOnFocus &&
              S(e, 'focus', this._panOnFocus, this),
            t.icon.createShadow(this._shadow)),
          o = !1;
        e !== this._shadow && (this._removeShadow(), (o = !0)),
          e && (z(e, i), (e.alt = '')),
          (this._shadow = e),
          t.opacity < 1 && this._updateOpacity(),
          n && this.getPane().appendChild(this._icon),
          this._initInteraction(),
          e && o && this.getPane(t.shadowPane).appendChild(this._shadow);
      },
      _removeIcon: function () {
        this.options.riseOnHover &&
          this.off({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex,
          }),
          this.options.autoPanOnFocus &&
            E(this._icon, 'focus', this._panOnFocus, this),
          T(this._icon),
          this.removeInteractiveTarget(this._icon),
          (this._icon = null);
      },
      _removeShadow: function () {
        this._shadow && T(this._shadow), (this._shadow = null);
      },
      _setPos: function (t) {
        this._icon && Z(this._icon, t),
          this._shadow && Z(this._shadow, t),
          (this._zIndex = t.y + this.options.zIndexOffset),
          this._resetZIndex();
      },
      _updateZIndex: function (t) {
        this._icon && (this._icon.style.zIndex = this._zIndex + t);
      },
      _animateZoom: function (t) {
        t = this._map
          ._latLngToNewLayerPoint(this._latlng, t.zoom, t.center)
          .round();
        this._setPos(t);
      },
      _initInteraction: function () {
        var t;
        this.options.interactive &&
          (z(this._icon, 'leaflet-interactive'),
          this.addInteractiveTarget(this._icon),
          ce &&
            ((t = this.options.draggable),
            this.dragging &&
              ((t = this.dragging.enabled()), this.dragging.disable()),
            (this.dragging = new ce(this)),
            t && this.dragging.enable()));
      },
      setOpacity: function (t) {
        return (
          (this.options.opacity = t), this._map && this._updateOpacity(), this
        );
      },
      _updateOpacity: function () {
        var t = this.options.opacity;
        this._icon && C(this._icon, t), this._shadow && C(this._shadow, t);
      },
      _bringToFront: function () {
        this._updateZIndex(this.options.riseOffset);
      },
      _resetZIndex: function () {
        this._updateZIndex(0);
      },
      _panOnFocus: function () {
        var t,
          i,
          e = this._map;
        e &&
          ((t = (i = this.options.icon.options).iconSize
            ? _(i.iconSize)
            : _(0, 0)),
          (i = i.iconAnchor ? _(i.iconAnchor) : _(0, 0)),
          e.panInside(this._latlng, {
            paddingTopLeft: i,
            paddingBottomRight: t.subtract(i),
          }));
      },
      _getPopupAnchor: function () {
        return this.options.icon.options.popupAnchor;
      },
      _getTooltipAnchor: function () {
        return this.options.icon.options.tooltipAnchor;
      },
    });
  var _e = o.extend({
      options: {
        stroke: !0,
        color: '#3388ff',
        weight: 3,
        opacity: 1,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: null,
        dashOffset: null,
        fill: !1,
        fillColor: null,
        fillOpacity: 0.2,
        fillRule: 'evenodd',
        interactive: !0,
        bubblingMouseEvents: !0,
      },
      beforeAdd: function (t) {
        this._renderer = t.getRenderer(this);
      },
      onAdd: function () {
        this._renderer._initPath(this),
          this._reset(),
          this._renderer._addPath(this);
      },
      onRemove: function () {
        this._renderer._removePath(this);
      },
      redraw: function () {
        return this._map && this._renderer._updatePath(this), this;
      },
      setStyle: function (t) {
        return (
          c(this, t),
          this._renderer &&
            (this._renderer._updateStyle(this),
            this.options.stroke &&
              t &&
              Object.prototype.hasOwnProperty.call(t, 'weight') &&
              this._updateBounds()),
          this
        );
      },
      bringToFront: function () {
        return this._renderer && this._renderer._bringToFront(this), this;
      },
      bringToBack: function () {
        return this._renderer && this._renderer._bringToBack(this), this;
      },
      getElement: function () {
        return this._path;
      },
      _reset: function () {
        this._project(), this._update();
      },
      _clickTolerance: function () {
        return (
          (this.options.stroke ? this.options.weight / 2 : 0) +
          (this._renderer.options.tolerance || 0)
        );
      },
    }),
    pe = _e.extend({
      options: { fill: !0, radius: 10 },
      initialize: function (t, i) {
        c(this, i), (this._latlng = w(t)), (this._radius = this.options.radius);
      },
      setLatLng: function (t) {
        var i = this._latlng;
        return (
          (this._latlng = w(t)),
          this.redraw(),
          this.fire('move', { oldLatLng: i, latlng: this._latlng })
        );
      },
      getLatLng: function () {
        return this._latlng;
      },
      setRadius: function (t) {
        return (this.options.radius = this._radius = t), this.redraw();
      },
      getRadius: function () {
        return this._radius;
      },
      setStyle: function (t) {
        var i = (t && t.radius) || this._radius;
        return _e.prototype.setStyle.call(this, t), this.setRadius(i), this;
      },
      _project: function () {
        (this._point = this._map.latLngToLayerPoint(this._latlng)),
          this._updateBounds();
      },
      _updateBounds: function () {
        var t = this._radius,
          i = this._radiusY || t,
          e = this._clickTolerance(),
          t = [t + e, i + e];
        this._pxBounds = new m(this._point.subtract(t), this._point.add(t));
      },
      _update: function () {
        this._map && this._updatePath();
      },
      _updatePath: function () {
        this._renderer._updateCircle(this);
      },
      _empty: function () {
        return (
          this._radius && !this._renderer._bounds.intersects(this._pxBounds)
        );
      },
      _containsPoint: function (t) {
        return (
          t.distanceTo(this._point) <= this._radius + this._clickTolerance()
        );
      },
    });
  var me = pe.extend({
    initialize: function (t, i, e) {
      if (
        (c(this, (i = 'number' == typeof i ? l({}, e, { radius: i }) : i)),
        (this._latlng = w(t)),
        isNaN(this.options.radius))
      )
        throw new Error('Circle radius cannot be NaN');
      this._mRadius = this.options.radius;
    },
    setRadius: function (t) {
      return (this._mRadius = t), this.redraw();
    },
    getRadius: function () {
      return this._mRadius;
    },
    getBounds: function () {
      var t = [this._radius, this._radiusY || this._radius];
      return new s(
        this._map.layerPointToLatLng(this._point.subtract(t)),
        this._map.layerPointToLatLng(this._point.add(t)),
      );
    },
    setStyle: _e.prototype.setStyle,
    _project: function () {
      var t,
        i,
        e,
        n,
        o,
        s = this._latlng.lng,
        r = this._latlng.lat,
        a = this._map,
        h = a.options.crs;
      h.distance === st.distance
        ? ((n = Math.PI / 180),
          (o = this._mRadius / st.R / n),
          (t = a.project([r + o, s])),
          (i = a.project([r - o, s])),
          (i = t.add(i).divideBy(2)),
          (e = a.unproject(i).lat),
          (n =
            Math.acos(
              (Math.cos(o * n) - Math.sin(r * n) * Math.sin(e * n)) /
                (Math.cos(r * n) * Math.cos(e * n)),
            ) / n),
          (!isNaN(n) && 0 !== n) || (n = o / Math.cos((Math.PI / 180) * r)),
          (this._point = i.subtract(a.getPixelOrigin())),
          (this._radius = isNaN(n) ? 0 : i.x - a.project([e, s - n]).x),
          (this._radiusY = i.y - t.y))
        : ((o = h.unproject(
            h.project(this._latlng).subtract([this._mRadius, 0]),
          )),
          (this._point = a.latLngToLayerPoint(this._latlng)),
          (this._radius = this._point.x - a.latLngToLayerPoint(o).x)),
        this._updateBounds();
    },
  });
  var fe = _e.extend({
    options: { smoothFactor: 1, noClip: !1 },
    initialize: function (t, i) {
      c(this, i), this._setLatLngs(t);
    },
    getLatLngs: function () {
      return this._latlngs;
    },
    setLatLngs: function (t) {
      return this._setLatLngs(t), this.redraw();
    },
    isEmpty: function () {
      return !this._latlngs.length;
    },
    closestLayerPoint: function (t) {
      for (
        var i = 1 / 0, e = null, n = ee, o = 0, s = this._parts.length;
        o < s;
        o++
      )
        for (var r = this._parts[o], a = 1, h = r.length; a < h; a++) {
          var l,
            u,
            c = n(t, (l = r[a - 1]), (u = r[a]), !0);
          c < i && ((i = c), (e = n(t, l, u)));
        }
      return e && (e.distance = Math.sqrt(i)), e;
    },
    getCenter: function () {
      if (!this._map)
        throw new Error('Must add layer to map before using getCenter()');
      var t,
        i,
        e,
        n,
        o,
        s,
        r = this._rings[0],
        a = r.length;
      if (!a) return null;
      for (i = t = 0; t < a - 1; t++) i += r[t].distanceTo(r[t + 1]) / 2;
      if (0 === i) return this._map.layerPointToLatLng(r[0]);
      for (e = t = 0; t < a - 1; t++)
        if (((n = r[t]), (o = r[t + 1]), i < (e += s = n.distanceTo(o))))
          return this._map.layerPointToLatLng([
            o.x - (s = (e - i) / s) * (o.x - n.x),
            o.y - s * (o.y - n.y),
          ]);
    },
    getBounds: function () {
      return this._bounds;
    },
    addLatLng: function (t, i) {
      return (
        (i = i || this._defaultShape()),
        (t = w(t)),
        i.push(t),
        this._bounds.extend(t),
        this.redraw()
      );
    },
    _setLatLngs: function (t) {
      (this._bounds = new s()), (this._latlngs = this._convertLatLngs(t));
    },
    _defaultShape: function () {
      return ne(this._latlngs) ? this._latlngs : this._latlngs[0];
    },
    _convertLatLngs: function (t) {
      for (var i = [], e = ne(t), n = 0, o = t.length; n < o; n++)
        e
          ? ((i[n] = w(t[n])), this._bounds.extend(i[n]))
          : (i[n] = this._convertLatLngs(t[n]));
      return i;
    },
    _project: function () {
      var t = new m();
      (this._rings = []),
        this._projectLatlngs(this._latlngs, this._rings, t),
        this._bounds.isValid() &&
          t.isValid() &&
          ((this._rawPxBounds = t), this._updateBounds());
    },
    _updateBounds: function () {
      var t = this._clickTolerance(),
        t = new p(t, t);
      this._rawPxBounds &&
        (this._pxBounds = new m([
          this._rawPxBounds.min.subtract(t),
          this._rawPxBounds.max.add(t),
        ]));
    },
    _projectLatlngs: function (t, i, e) {
      var n,
        o,
        s = t[0] instanceof v,
        r = t.length;
      if (s) {
        for (o = [], n = 0; n < r; n++)
          (o[n] = this._map.latLngToLayerPoint(t[n])), e.extend(o[n]);
        i.push(o);
      } else for (n = 0; n < r; n++) this._projectLatlngs(t[n], i, e);
    },
    _clipPoints: function () {
      var t = this._renderer._bounds;
      if (((this._parts = []), this._pxBounds && this._pxBounds.intersects(t)))
        if (this.options.noClip) this._parts = this._rings;
        else
          for (
            var i,
              e,
              n,
              o,
              s = this._parts,
              r = 0,
              a = 0,
              h = this._rings.length;
            r < h;
            r++
          )
            for (i = 0, e = (o = this._rings[r]).length; i < e - 1; i++)
              (n = Qi(o[i], o[i + 1], t, i, !0)) &&
                ((s[a] = s[a] || []),
                s[a].push(n[0]),
                (n[1] === o[i + 1] && i !== e - 2) || (s[a].push(n[1]), a++));
    },
    _simplifyPoints: function () {
      for (
        var t = this._parts, i = this.options.smoothFactor, e = 0, n = t.length;
        e < n;
        e++
      )
        t[e] = Ji(t[e], i);
    },
    _update: function () {
      this._map &&
        (this._clipPoints(), this._simplifyPoints(), this._updatePath());
    },
    _updatePath: function () {
      this._renderer._updatePoly(this);
    },
    _containsPoint: function (t, i) {
      var e,
        n,
        o,
        s,
        r,
        a,
        h = this._clickTolerance();
      if (!this._pxBounds || !this._pxBounds.contains(t)) return !1;
      for (e = 0, s = this._parts.length; e < s; e++)
        for (n = 0, o = (r = (a = this._parts[e]).length) - 1; n < r; o = n++)
          if ((i || 0 !== n) && $i(t, a[o], a[n]) <= h) return !0;
      return !1;
    },
  });
  fe._flat = oe;
  var ge = fe.extend({
    options: { fill: !0 },
    isEmpty: function () {
      return !this._latlngs.length || !this._latlngs[0].length;
    },
    getCenter: function () {
      if (!this._map)
        throw new Error('Must add layer to map before using getCenter()');
      var t,
        i,
        e,
        n,
        o,
        s,
        r,
        a,
        h,
        l = this._rings[0],
        u = l.length;
      if (!u) return null;
      for (t = s = r = a = 0, i = u - 1; t < u; i = t++)
        (e = l[t]),
          (n = l[i]),
          (o = e.y * n.x - n.y * e.x),
          (r += (e.x + n.x) * o),
          (a += (e.y + n.y) * o),
          (s += 3 * o);
      return (
        (h = 0 === s ? l[0] : [r / s, a / s]), this._map.layerPointToLatLng(h)
      );
    },
    _convertLatLngs: function (t) {
      var t = fe.prototype._convertLatLngs.call(this, t),
        i = t.length;
      return 2 <= i && t[0] instanceof v && t[0].equals(t[i - 1]) && t.pop(), t;
    },
    _setLatLngs: function (t) {
      fe.prototype._setLatLngs.call(this, t),
        ne(this._latlngs) && (this._latlngs = [this._latlngs]);
    },
    _defaultShape: function () {
      return (ne(this._latlngs[0]) ? this._latlngs : this._latlngs[0])[0];
    },
    _clipPoints: function () {
      var t = this._renderer._bounds,
        i = this.options.weight,
        i = new p(i, i),
        t = new m(t.min.subtract(i), t.max.add(i));
      if (((this._parts = []), this._pxBounds && this._pxBounds.intersects(t)))
        if (this.options.noClip) this._parts = this._rings;
        else
          for (var e, n = 0, o = this._rings.length; n < o; n++)
            (e = se(this._rings[n], t, !0)).length && this._parts.push(e);
    },
    _updatePath: function () {
      this._renderer._updatePoly(this, !0);
    },
    _containsPoint: function (t) {
      var i,
        e,
        n,
        o,
        s,
        r,
        a,
        h,
        l = !1;
      if (!this._pxBounds || !this._pxBounds.contains(t)) return !1;
      for (o = 0, a = this._parts.length; o < a; o++)
        for (s = 0, r = (h = (i = this._parts[o]).length) - 1; s < h; r = s++)
          (e = i[s]),
            (n = i[r]),
            e.y > t.y != n.y > t.y &&
              t.x < ((n.x - e.x) * (t.y - e.y)) / (n.y - e.y) + e.x &&
              (l = !l);
      return l || fe.prototype._containsPoint.call(this, t, !0);
    },
  });
  var ve = he.extend({
    initialize: function (t, i) {
      c(this, i), (this._layers = {}), t && this.addData(t);
    },
    addData: function (t) {
      var i,
        e,
        n,
        o = d(t) ? t : t.features;
      if (o) {
        for (i = 0, e = o.length; i < e; i++)
          ((n = o[i]).geometries ||
            n.geometry ||
            n.features ||
            n.coordinates) &&
            this.addData(n);
        return this;
      }
      var s = this.options;
      if (s.filter && !s.filter(t)) return this;
      var r = ye(t, s);
      return r
        ? ((r.feature = ze(t)),
          (r.defaultOptions = r.options),
          this.resetStyle(r),
          s.onEachFeature && s.onEachFeature(t, r),
          this.addLayer(r))
        : this;
    },
    resetStyle: function (t) {
      return void 0 === t
        ? this.eachLayer(this.resetStyle, this)
        : ((t.options = l({}, t.defaultOptions)),
          this._setLayerStyle(t, this.options.style),
          this);
    },
    setStyle: function (i) {
      return this.eachLayer(function (t) {
        this._setLayerStyle(t, i);
      }, this);
    },
    _setLayerStyle: function (t, i) {
      t.setStyle &&
        ('function' == typeof i && (i = i(t.feature)), t.setStyle(i));
    },
  });
  function ye(t, i) {
    var e,
      n,
      o,
      s,
      r = 'Feature' === t.type ? t.geometry : t,
      a = r ? r.coordinates : null,
      h = [],
      l = i && i.pointToLayer,
      u = (i && i.coordsToLatLng) || we;
    if (!a && !r) return null;
    switch (r.type) {
      case 'Point':
        return xe(l, t, (e = u(a)), i);
      case 'MultiPoint':
        for (o = 0, s = a.length; o < s; o++)
          (e = u(a[o])), h.push(xe(l, t, e, i));
        return new he(h);
      case 'LineString':
      case 'MultiLineString':
        return (n = Pe(a, 'LineString' === r.type ? 0 : 1, u)), new fe(n, i);
      case 'Polygon':
      case 'MultiPolygon':
        return (n = Pe(a, 'Polygon' === r.type ? 1 : 2, u)), new ge(n, i);
      case 'GeometryCollection':
        for (o = 0, s = r.geometries.length; o < s; o++) {
          var c = ye(
            {
              geometry: r.geometries[o],
              type: 'Feature',
              properties: t.properties,
            },
            i,
          );
          c && h.push(c);
        }
        return new he(h);
      default:
        throw new Error('Invalid GeoJSON object.');
    }
  }
  function xe(t, i, e, n) {
    return t ? t(i, e) : new de(e, n && n.markersInheritOptions && n);
  }
  function we(t) {
    return new v(t[1], t[0], t[2]);
  }
  function Pe(t, i, e) {
    for (var n, o = [], s = 0, r = t.length; s < r; s++)
      (n = i ? Pe(t[s], i - 1, e) : (e || we)(t[s])), o.push(n);
    return o;
  }
  function be(t, i) {
    return void 0 !== (t = w(t)).alt
      ? [e(t.lng, i), e(t.lat, i), e(t.alt, i)]
      : [e(t.lng, i), e(t.lat, i)];
  }
  function Le(t, i, e, n) {
    for (var o = [], s = 0, r = t.length; s < r; s++)
      o.push(i ? Le(t[s], i - 1, e, n) : be(t[s], n));
    return !i && e && o.push(o[0]), o;
  }
  function Te(t, i) {
    return t.feature ? l({}, t.feature, { geometry: i }) : ze(i);
  }
  function ze(t) {
    return 'Feature' === t.type || 'FeatureCollection' === t.type
      ? t
      : { type: 'Feature', properties: {}, geometry: t };
  }
  Tt = {
    toGeoJSON: function (t) {
      return Te(this, { type: 'Point', coordinates: be(this.getLatLng(), t) });
    },
  };
  function Me(t, i) {
    return new ve(t, i);
  }
  de.include(Tt),
    me.include(Tt),
    pe.include(Tt),
    fe.include({
      toGeoJSON: function (t) {
        var i = !ne(this._latlngs);
        return Te(this, {
          type: (i ? 'Multi' : '') + 'LineString',
          coordinates: Le(this._latlngs, i ? 1 : 0, !1, t),
        });
      },
    }),
    ge.include({
      toGeoJSON: function (t) {
        var i = !ne(this._latlngs),
          e = i && !ne(this._latlngs[0]),
          t = Le(this._latlngs, e ? 2 : i ? 1 : 0, !0, t);
        return Te(this, {
          type: (e ? 'Multi' : '') + 'Polygon',
          coordinates: (t = i ? t : [t]),
        });
      },
    }),
    ae.include({
      toMultiPoint: function (i) {
        var e = [];
        return (
          this.eachLayer(function (t) {
            e.push(t.toGeoJSON(i).geometry.coordinates);
          }),
          Te(this, { type: 'MultiPoint', coordinates: e })
        );
      },
      toGeoJSON: function (i) {
        var t =
          this.feature && this.feature.geometry && this.feature.geometry.type;
        if ('MultiPoint' === t) return this.toMultiPoint(i);
        var e = 'GeometryCollection' === t,
          n = [];
        return (
          this.eachLayer(function (t) {
            t.toGeoJSON &&
              ((t = t.toGeoJSON(i)),
              e
                ? n.push(t.geometry)
                : 'FeatureCollection' === (t = ze(t)).type
                ? n.push.apply(n, t.features)
                : n.push(t));
          }),
          e
            ? Te(this, { geometries: n, type: 'GeometryCollection' })
            : { type: 'FeatureCollection', features: n }
        );
      },
    });
  var zt = Me,
    Ce = o.extend({
      options: {
        opacity: 1,
        alt: '',
        interactive: !1,
        crossOrigin: !1,
        errorOverlayUrl: '',
        zIndex: 1,
        className: '',
      },
      initialize: function (t, i, e) {
        (this._url = t), (this._bounds = g(i)), c(this, e);
      },
      onAdd: function () {
        this._image ||
          (this._initImage(),
          this.options.opacity < 1 && this._updateOpacity()),
          this.options.interactive &&
            (z(this._image, 'leaflet-interactive'),
            this.addInteractiveTarget(this._image)),
          this.getPane().appendChild(this._image),
          this._reset();
      },
      onRemove: function () {
        T(this._image),
          this.options.interactive && this.removeInteractiveTarget(this._image);
      },
      setOpacity: function (t) {
        return (
          (this.options.opacity = t), this._image && this._updateOpacity(), this
        );
      },
      setStyle: function (t) {
        return t.opacity && this.setOpacity(t.opacity), this;
      },
      bringToFront: function () {
        return this._map && fi(this._image), this;
      },
      bringToBack: function () {
        return this._map && gi(this._image), this;
      },
      setUrl: function (t) {
        return (this._url = t), this._image && (this._image.src = t), this;
      },
      setBounds: function (t) {
        return (this._bounds = g(t)), this._map && this._reset(), this;
      },
      getEvents: function () {
        var t = { zoom: this._reset, viewreset: this._reset };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      setZIndex: function (t) {
        return (this.options.zIndex = t), this._updateZIndex(), this;
      },
      getBounds: function () {
        return this._bounds;
      },
      getElement: function () {
        return this._image;
      },
      _initImage: function () {
        var t = 'IMG' === this._url.tagName,
          i = (this._image = t ? this._url : b('img'));
        z(i, 'leaflet-image-layer'),
          this._zoomAnimated && z(i, 'leaflet-zoom-animated'),
          this.options.className && z(i, this.options.className),
          (i.onselectstart = u),
          (i.onmousemove = u),
          (i.onload = a(this.fire, this, 'load')),
          (i.onerror = a(this._overlayOnError, this, 'error')),
          (!this.options.crossOrigin && '' !== this.options.crossOrigin) ||
            (i.crossOrigin =
              !0 === this.options.crossOrigin ? '' : this.options.crossOrigin),
          this.options.zIndex && this._updateZIndex(),
          t
            ? (this._url = i.src)
            : ((i.src = this._url), (i.alt = this.options.alt));
      },
      _animateZoom: function (t) {
        var i = this._map.getZoomScale(t.zoom),
          t = this._map._latLngBoundsToNewLayerBounds(
            this._bounds,
            t.zoom,
            t.center,
          ).min;
        Pi(this._image, t, i);
      },
      _reset: function () {
        var t = this._image,
          i = new m(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast()),
          ),
          e = i.getSize();
        Z(t, i.min),
          (t.style.width = e.x + 'px'),
          (t.style.height = e.y + 'px');
      },
      _updateOpacity: function () {
        C(this._image, this.options.opacity);
      },
      _updateZIndex: function () {
        this._image &&
          void 0 !== this.options.zIndex &&
          null !== this.options.zIndex &&
          (this._image.style.zIndex = this.options.zIndex);
      },
      _overlayOnError: function () {
        this.fire('error');
        var t = this.options.errorOverlayUrl;
        t && this._url !== t && ((this._url = t), (this._image.src = t));
      },
      getCenter: function () {
        return this._bounds.getCenter();
      },
    }),
    Ze = Ce.extend({
      options: {
        autoplay: !0,
        loop: !0,
        keepAspectRatio: !0,
        muted: !1,
        playsInline: !0,
      },
      _initImage: function () {
        var t = 'VIDEO' === this._url.tagName,
          i = (this._image = t ? this._url : b('video'));
        if (
          (z(i, 'leaflet-image-layer'),
          this._zoomAnimated && z(i, 'leaflet-zoom-animated'),
          this.options.className && z(i, this.options.className),
          (i.onselectstart = u),
          (i.onmousemove = u),
          (i.onloadeddata = a(this.fire, this, 'load')),
          t)
        ) {
          for (
            var e = i.getElementsByTagName('source'), n = [], o = 0;
            o < e.length;
            o++
          )
            n.push(e[o].src);
          this._url = 0 < e.length ? n : [i.src];
        } else {
          d(this._url) || (this._url = [this._url]),
            !this.options.keepAspectRatio &&
              Object.prototype.hasOwnProperty.call(i.style, 'objectFit') &&
              (i.style.objectFit = 'fill'),
            (i.autoplay = !!this.options.autoplay),
            (i.loop = !!this.options.loop),
            (i.muted = !!this.options.muted),
            (i.playsInline = !!this.options.playsInline);
          for (var s = 0; s < this._url.length; s++) {
            var r = b('source');
            (r.src = this._url[s]), i.appendChild(r);
          }
        }
      },
    });
  var Se = Ce.extend({
    _initImage: function () {
      var t = (this._image = this._url);
      z(t, 'leaflet-image-layer'),
        this._zoomAnimated && z(t, 'leaflet-zoom-animated'),
        this.options.className && z(t, this.options.className),
        (t.onselectstart = u),
        (t.onmousemove = u);
    },
  });
  var O = o.extend({
      options: { interactive: !1, offset: [0, 0], className: '', pane: void 0 },
      initialize: function (t, i) {
        c(this, t), (this._source = i);
      },
      openOn: function (t) {
        return (
          (t = arguments.length ? t : this._source._map).hasLayer(this) ||
            t.addLayer(this),
          this
        );
      },
      close: function () {
        return this._map && this._map.removeLayer(this), this;
      },
      toggle: function (t) {
        return (
          this._map
            ? this.close()
            : (arguments.length ? (this._source = t) : (t = this._source),
              this._prepareOpen(),
              this.openOn(t._map)),
          this
        );
      },
      onAdd: function (t) {
        (this._zoomAnimated = t._zoomAnimated),
          this._container || this._initLayout(),
          t._fadeAnimated && C(this._container, 0),
          clearTimeout(this._removeTimeout),
          this.getPane().appendChild(this._container),
          this.update(),
          t._fadeAnimated && C(this._container, 1),
          this.bringToFront(),
          this.options.interactive &&
            (z(this._container, 'leaflet-interactive'),
            this.addInteractiveTarget(this._container));
      },
      onRemove: function (t) {
        t._fadeAnimated
          ? (C(this._container, 0),
            (this._removeTimeout = setTimeout(
              a(T, void 0, this._container),
              200,
            )))
          : T(this._container),
          this.options.interactive &&
            (M(this._container, 'leaflet-interactive'),
            this.removeInteractiveTarget(this._container));
      },
      getLatLng: function () {
        return this._latlng;
      },
      setLatLng: function (t) {
        return (
          (this._latlng = w(t)),
          this._map && (this._updatePosition(), this._adjustPan()),
          this
        );
      },
      getContent: function () {
        return this._content;
      },
      setContent: function (t) {
        return (this._content = t), this.update(), this;
      },
      getElement: function () {
        return this._container;
      },
      update: function () {
        this._map &&
          ((this._container.style.visibility = 'hidden'),
          this._updateContent(),
          this._updateLayout(),
          this._updatePosition(),
          (this._container.style.visibility = ''),
          this._adjustPan());
      },
      getEvents: function () {
        var t = { zoom: this._updatePosition, viewreset: this._updatePosition };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
      },
      isOpen: function () {
        return !!this._map && this._map.hasLayer(this);
      },
      bringToFront: function () {
        return this._map && fi(this._container), this;
      },
      bringToBack: function () {
        return this._map && gi(this._container), this;
      },
      _prepareOpen: function (t) {
        if (!(e = this._source)._map) return !1;
        if (e instanceof he) {
          var i,
            e = null,
            n = this._source._layers;
          for (i in n)
            if (n[i]._map) {
              e = n[i];
              break;
            }
          if (!e) return !1;
          this._source = e;
        }
        if (!t)
          if (e.getCenter) t = e.getCenter();
          else if (e.getLatLng) t = e.getLatLng();
          else {
            if (!e.getBounds)
              throw new Error('Unable to get source layer LatLng.');
            t = e.getBounds().getCenter();
          }
        return this.setLatLng(t), this._map && this.update(), !0;
      },
      _updateContent: function () {
        if (this._content) {
          var t = this._contentNode,
            i =
              'function' == typeof this._content
                ? this._content(this._source || this)
                : this._content;
          if ('string' == typeof i) t.innerHTML = i;
          else {
            for (; t.hasChildNodes(); ) t.removeChild(t.firstChild);
            t.appendChild(i);
          }
          this.fire('contentupdate');
        }
      },
      _updatePosition: function () {
        var t, i, e;
        this._map &&
          ((i = this._map.latLngToLayerPoint(this._latlng)),
          (t = _(this.options.offset)),
          (e = this._getAnchor()),
          this._zoomAnimated
            ? Z(this._container, i.add(e))
            : (t = t.add(i).add(e)),
          (i = this._containerBottom = -t.y),
          (e = this._containerLeft =
            -Math.round(this._containerWidth / 2) + t.x),
          (this._container.style.bottom = i + 'px'),
          (this._container.style.left = e + 'px'));
      },
      _getAnchor: function () {
        return [0, 0];
      },
    }),
    ke =
      (A.include({
        _initOverlay: function (t, i, e, n) {
          var o = i;
          return (
            o instanceof t || (o = new t(n).setContent(i)),
            e && o.setLatLng(e),
            o
          );
        },
      }),
      o.include({
        _initOverlay: function (t, i, e, n) {
          var o = e;
          return (
            o instanceof t
              ? (c(o, n), (o._source = this))
              : (o = i && !n ? i : new t(n, this)).setContent(e),
            o
          );
        },
      }),
      O.extend({
        options: {
          pane: 'popupPane',
          offset: [0, 7],
          maxWidth: 300,
          minWidth: 50,
          maxHeight: null,
          autoPan: !0,
          autoPanPaddingTopLeft: null,
          autoPanPaddingBottomRight: null,
          autoPanPadding: [5, 5],
          keepInView: !1,
          closeButton: !0,
          autoClose: !0,
          closeOnEscapeKey: !0,
          className: '',
        },
        openOn: function (t) {
          return (
            !(t = arguments.length ? t : this._source._map).hasLayer(this) &&
              t._popup &&
              t._popup.options.autoClose &&
              t.removeLayer(t._popup),
            (t._popup = this),
            O.prototype.openOn.call(this, t)
          );
        },
        onAdd: function (t) {
          O.prototype.onAdd.call(this, t),
            t.fire('popupopen', { popup: this }),
            this._source &&
              (this._source.fire('popupopen', { popup: this }, !0),
              this._source instanceof _e || this._source.on('preclick', Ai));
        },
        onRemove: function (t) {
          O.prototype.onRemove.call(this, t),
            t.fire('popupclose', { popup: this }),
            this._source &&
              (this._source.fire('popupclose', { popup: this }, !0),
              this._source instanceof _e || this._source.off('preclick', Ai));
        },
        getEvents: function () {
          var t = O.prototype.getEvents.call(this);
          return (
            (void 0 !== this.options.closeOnClick
              ? this.options.closeOnClick
              : this._map.options.closePopupOnClick) &&
              (t.preclick = this.close),
            this.options.keepInView && (t.moveend = this._adjustPan),
            t
          );
        },
        _initLayout: function () {
          var t = 'leaflet-popup',
            i = (this._container = b(
              'div',
              t +
                ' ' +
                (this.options.className || '') +
                ' leaflet-zoom-animated',
            )),
            e = (this._wrapper = b('div', t + '-content-wrapper', i));
          (this._contentNode = b('div', t + '-content', e)),
            Oi(i),
            Ii(this._contentNode),
            S(i, 'contextmenu', Ai),
            (this._tipContainer = b('div', t + '-tip-container', i)),
            (this._tip = b('div', t + '-tip', this._tipContainer)),
            this.options.closeButton &&
              ((e = this._closeButton =
                b('a', t + '-close-button', i)).setAttribute('role', 'button'),
              e.setAttribute('aria-label', 'Close popup'),
              (e.href = '#close'),
              (e.innerHTML = '<span aria-hidden="true">&#215;</span>'),
              S(e, 'click', this.close, this));
        },
        _updateLayout: function () {
          var t = this._contentNode,
            i = t.style,
            e = ((i.width = ''), (i.whiteSpace = 'nowrap'), t.offsetWidth),
            e = Math.min(e, this.options.maxWidth),
            e =
              ((e = Math.max(e, this.options.minWidth)),
              (i.width = e + 1 + 'px'),
              (i.whiteSpace = ''),
              (i.height = ''),
              t.offsetHeight),
            n = this.options.maxHeight,
            o = 'leaflet-popup-scrolled';
          n && n < e ? ((i.height = n + 'px'), z(t, o)) : M(t, o),
            (this._containerWidth = this._container.offsetWidth);
        },
        _animateZoom: function (t) {
          var t = this._map._latLngToNewLayerPoint(
              this._latlng,
              t.zoom,
              t.center,
            ),
            i = this._getAnchor();
          Z(this._container, t.add(i));
        },
        _adjustPan: function (t) {
          var i, e, n, o, s, r, a, h;
          this.options.autoPan &&
            (this._map._panAnim && this._map._panAnim.stop(),
            (i = this._map),
            (e = parseInt(pi(this._container, 'marginBottom'), 10) || 0),
            (e = this._container.offsetHeight + e),
            (h = this._containerWidth),
            (n = new p(this._containerLeft, -e - this._containerBottom))._add(
              bi(this._container),
            ),
            (n = i.layerPointToContainerPoint(n)),
            (s = _(this.options.autoPanPadding)),
            (o = _(this.options.autoPanPaddingTopLeft || s)),
            (s = _(this.options.autoPanPaddingBottomRight || s)),
            (r = i.getSize()),
            (a = 0),
            n.x + h + s.x > r.x && (a = n.x + h - r.x + s.x),
            n.x - a - o.x < (h = 0) && (a = n.x - o.x),
            n.y + e + s.y > r.y && (h = n.y + e - r.y + s.y),
            n.y - h - o.y < 0 && (h = n.y - o.y),
            (a || h) &&
              i
                .fire('autopanstart')
                .panBy([a, h], { animate: t && 'moveend' === t.type }));
        },
        _getAnchor: function () {
          return _(
            this._source && this._source._getPopupAnchor
              ? this._source._getPopupAnchor()
              : [0, 0],
          );
        },
      })),
    Ee =
      (A.mergeOptions({ closePopupOnClick: !0 }),
      A.include({
        openPopup: function (t, i, e) {
          return this._initOverlay(ke, t, i, e).openOn(this), this;
        },
        closePopup: function (t) {
          return (t = arguments.length ? t : this._popup) && t.close(), this;
        },
      }),
      o.include({
        bindPopup: function (t, i) {
          return (
            (this._popup = this._initOverlay(ke, this._popup, t, i)),
            this._popupHandlersAdded ||
              (this.on({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup,
              }),
              (this._popupHandlersAdded = !0)),
            this
          );
        },
        unbindPopup: function () {
          return (
            this._popup &&
              (this.off({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup,
              }),
              (this._popupHandlersAdded = !1),
              (this._popup = null)),
            this
          );
        },
        openPopup: function (t) {
          return (
            this._popup &&
              this._popup._prepareOpen(t) &&
              this._popup.openOn(this._map),
            this
          );
        },
        closePopup: function () {
          return this._popup && this._popup.close(), this;
        },
        togglePopup: function () {
          return this._popup && this._popup.toggle(this), this;
        },
        isPopupOpen: function () {
          return !!this._popup && this._popup.isOpen();
        },
        setPopupContent: function (t) {
          return this._popup && this._popup.setContent(t), this;
        },
        getPopup: function () {
          return this._popup;
        },
        _openPopup: function (t) {
          var i;
          this._popup &&
            this._map &&
            (Ri(t),
            (i = t.layer || t.target),
            this._popup._source !== i || i instanceof _e
              ? ((this._popup._source = i), this.openPopup(t.latlng))
              : this._map.hasLayer(this._popup)
              ? this.closePopup()
              : this.openPopup(t.latlng));
        },
        _movePopup: function (t) {
          this._popup.setLatLng(t.latlng);
        },
        _onKeyPress: function (t) {
          13 === t.originalEvent.keyCode && this._openPopup(t);
        },
      }),
      O.extend({
        options: {
          pane: 'tooltipPane',
          offset: [0, 0],
          direction: 'auto',
          permanent: !1,
          sticky: !1,
          opacity: 0.9,
        },
        onAdd: function (t) {
          O.prototype.onAdd.call(this, t),
            this.setOpacity(this.options.opacity),
            t.fire('tooltipopen', { tooltip: this }),
            this._source &&
              (this.addEventParent(this._source),
              this._source.fire('tooltipopen', { tooltip: this }, !0));
        },
        onRemove: function (t) {
          O.prototype.onRemove.call(this, t),
            t.fire('tooltipclose', { tooltip: this }),
            this._source &&
              (this.removeEventParent(this._source),
              this._source.fire('tooltipclose', { tooltip: this }, !0));
        },
        getEvents: function () {
          var t = O.prototype.getEvents.call(this);
          return this.options.permanent || (t.preclick = this.close), t;
        },
        _initLayout: function () {
          var t =
            'leaflet-tooltip ' +
            (this.options.className || '') +
            ' leaflet-zoom-' +
            (this._zoomAnimated ? 'animated' : 'hide');
          this._contentNode = this._container = b('div', t);
        },
        _updateLayout: function () {},
        _adjustPan: function () {},
        _setPosition: function (t) {
          var i,
            e = this._map,
            n = this._container,
            o = e.latLngToContainerPoint(e.getCenter()),
            e = e.layerPointToContainerPoint(t),
            s = this.options.direction,
            r = n.offsetWidth,
            a = n.offsetHeight,
            h = _(this.options.offset),
            l = this._getAnchor(),
            e =
              'top' === s
                ? ((i = r / 2), a)
                : 'bottom' === s
                ? ((i = r / 2), 0)
                : ((i =
                    'center' === s
                      ? r / 2
                      : 'right' === s
                      ? 0
                      : 'left' === s
                      ? r
                      : e.x < o.x
                      ? ((s = 'right'), 0)
                      : ((s = 'left'), r + 2 * (h.x + l.x))),
                  a / 2);
          (t = t.subtract(_(i, e, !0)).add(h).add(l)),
            M(n, 'leaflet-tooltip-right'),
            M(n, 'leaflet-tooltip-left'),
            M(n, 'leaflet-tooltip-top'),
            M(n, 'leaflet-tooltip-bottom'),
            z(n, 'leaflet-tooltip-' + s),
            Z(n, t);
        },
        _updatePosition: function () {
          var t = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(t);
        },
        setOpacity: function (t) {
          (this.options.opacity = t), this._container && C(this._container, t);
        },
        _animateZoom: function (t) {
          t = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
          this._setPosition(t);
        },
        _getAnchor: function () {
          return _(
            this._source &&
              this._source._getTooltipAnchor &&
              !this.options.sticky
              ? this._source._getTooltipAnchor()
              : [0, 0],
          );
        },
      })),
    Be =
      (A.include({
        openTooltip: function (t, i, e) {
          return this._initOverlay(Ee, t, i, e).openOn(this), this;
        },
        closeTooltip: function (t) {
          return t.close(), this;
        },
      }),
      o.include({
        bindTooltip: function (t, i) {
          return (
            this._tooltip && this.isTooltipOpen() && this.unbindTooltip(),
            (this._tooltip = this._initOverlay(Ee, this._tooltip, t, i)),
            this._initTooltipInteractions(),
            this._tooltip.options.permanent &&
              this._map &&
              this._map.hasLayer(this) &&
              this.openTooltip(),
            this
          );
        },
        unbindTooltip: function () {
          return (
            this._tooltip &&
              (this._initTooltipInteractions(!0),
              this.closeTooltip(),
              (this._tooltip = null)),
            this
          );
        },
        _initTooltipInteractions: function (t) {
          var i, e;
          (!t && this._tooltipHandlersAdded) ||
            ((i = t ? 'off' : 'on'),
            (e = { remove: this.closeTooltip, move: this._moveTooltip }),
            this._tooltip.options.permanent
              ? (e.add = this._openTooltip)
              : ((e.mouseover = this._openTooltip),
                (e.mouseout = this.closeTooltip),
                (e.click = this._openTooltip)),
            this._tooltip.options.sticky && (e.mousemove = this._moveTooltip),
            this[i](e),
            (this._tooltipHandlersAdded = !t));
        },
        openTooltip: function (t) {
          return (
            this._tooltip &&
              this._tooltip._prepareOpen(t) &&
              this._tooltip.openOn(this._map),
            this
          );
        },
        closeTooltip: function () {
          if (this._tooltip) return this._tooltip.close();
        },
        toggleTooltip: function () {
          return this._tooltip && this._tooltip.toggle(this), this;
        },
        isTooltipOpen: function () {
          return this._tooltip.isOpen();
        },
        setTooltipContent: function (t) {
          return this._tooltip && this._tooltip.setContent(t), this;
        },
        getTooltip: function () {
          return this._tooltip;
        },
        _openTooltip: function (t) {
          !this._tooltip ||
            !this._map ||
            (this._map.dragging && this._map.dragging.moving()) ||
            ((this._tooltip._source = t.layer || t.target),
            this.openTooltip(this._tooltip.options.sticky ? t.latlng : void 0));
        },
        _moveTooltip: function (t) {
          var i = t.latlng;
          this._tooltip.options.sticky &&
            t.originalEvent &&
            ((t = this._map.mouseEventToContainerPoint(t.originalEvent)),
            (t = this._map.containerPointToLayerPoint(t)),
            (i = this._map.layerPointToLatLng(t))),
            this._tooltip.setLatLng(i);
        },
      }),
      le.extend({
        options: {
          iconSize: [12, 12],
          html: !1,
          bgPos: null,
          className: 'leaflet-div-icon',
        },
        createIcon: function (t) {
          var t = t && 'DIV' === t.tagName ? t : document.createElement('div'),
            i = this.options;
          return (
            i.html instanceof Element
              ? (mi(t), t.appendChild(i.html))
              : (t.innerHTML = !1 !== i.html ? i.html : ''),
            i.bgPos &&
              ((i = _(i.bgPos)),
              (t.style.backgroundPosition = -i.x + 'px ' + -i.y + 'px')),
            this._setIconStyles(t, 'icon'),
            t
          );
        },
        createShadow: function () {
          return null;
        },
      }));
  le.Default = ue;
  var Ae = o.extend({
    options: {
      tileSize: 256,
      opacity: 1,
      updateWhenIdle: P.mobile,
      updateWhenZooming: !0,
      updateInterval: 200,
      zIndex: 1,
      bounds: null,
      minZoom: 0,
      maxZoom: void 0,
      maxNativeZoom: void 0,
      minNativeZoom: void 0,
      noWrap: !1,
      pane: 'tilePane',
      className: '',
      keepBuffer: 2,
    },
    initialize: function (t) {
      c(this, t);
    },
    onAdd: function () {
      this._initContainer(),
        (this._levels = {}),
        (this._tiles = {}),
        this._resetView();
    },
    beforeAdd: function (t) {
      t._addZoomLimit(this);
    },
    onRemove: function (t) {
      this._removeAllTiles(),
        T(this._container),
        t._removeZoomLimit(this),
        (this._container = null),
        (this._tileZoom = void 0);
    },
    bringToFront: function () {
      return (
        this._map && (fi(this._container), this._setAutoZIndex(Math.max)), this
      );
    },
    bringToBack: function () {
      return (
        this._map && (gi(this._container), this._setAutoZIndex(Math.min)), this
      );
    },
    getContainer: function () {
      return this._container;
    },
    setOpacity: function (t) {
      return (this.options.opacity = t), this._updateOpacity(), this;
    },
    setZIndex: function (t) {
      return (this.options.zIndex = t), this._updateZIndex(), this;
    },
    isLoading: function () {
      return this._loading;
    },
    redraw: function () {
      var t;
      return (
        this._map &&
          (this._removeAllTiles(),
          (t = this._clampZoom(this._map.getZoom())) !== this._tileZoom &&
            ((this._tileZoom = t), this._updateLevels()),
          this._update()),
        this
      );
    },
    getEvents: function () {
      var t = {
        viewprereset: this._invalidateAll,
        viewreset: this._resetView,
        zoom: this._resetView,
        moveend: this._onMoveEnd,
      };
      return (
        this.options.updateWhenIdle ||
          (this._onMove ||
            (this._onMove = j(
              this._onMoveEnd,
              this.options.updateInterval,
              this,
            )),
          (t.move = this._onMove)),
        this._zoomAnimated && (t.zoomanim = this._animateZoom),
        t
      );
    },
    createTile: function () {
      return document.createElement('div');
    },
    getTileSize: function () {
      var t = this.options.tileSize;
      return t instanceof p ? t : new p(t, t);
    },
    _updateZIndex: function () {
      this._container &&
        void 0 !== this.options.zIndex &&
        null !== this.options.zIndex &&
        (this._container.style.zIndex = this.options.zIndex);
    },
    _setAutoZIndex: function (t) {
      for (
        var i,
          e = this.getPane().children,
          n = -t(-1 / 0, 1 / 0),
          o = 0,
          s = e.length;
        o < s;
        o++
      )
        (i = e[o].style.zIndex),
          e[o] !== this._container && i && (n = t(n, +i));
      isFinite(n) &&
        ((this.options.zIndex = n + t(-1, 1)), this._updateZIndex());
    },
    _updateOpacity: function () {
      if (this._map && !P.ielt9) {
        C(this._container, this.options.opacity);
        var t,
          i = +new Date(),
          e = !1,
          n = !1;
        for (t in this._tiles) {
          var o,
            s = this._tiles[t];
          s.current &&
            s.loaded &&
            ((o = Math.min(1, (i - s.loaded) / 200)),
            C(s.el, o),
            o < 1
              ? (e = !0)
              : (s.active ? (n = !0) : this._onOpaqueTile(s), (s.active = !0)));
        }
        n && !this._noPrune && this._pruneTiles(),
          e &&
            (r(this._fadeFrame),
            (this._fadeFrame = x(this._updateOpacity, this)));
      }
    },
    _onOpaqueTile: u,
    _initContainer: function () {
      this._container ||
        ((this._container = b(
          'div',
          'leaflet-layer ' + (this.options.className || ''),
        )),
        this._updateZIndex(),
        this.options.opacity < 1 && this._updateOpacity(),
        this.getPane().appendChild(this._container));
    },
    _updateLevels: function () {
      var t = this._tileZoom,
        i = this.options.maxZoom;
      if (void 0 !== t) {
        for (var e in this._levels)
          (e = Number(e)),
            this._levels[e].el.children.length || e === t
              ? ((this._levels[e].el.style.zIndex = i - Math.abs(t - e)),
                this._onUpdateLevel(e))
              : (T(this._levels[e].el),
                this._removeTilesAtZoom(e),
                this._onRemoveLevel(e),
                delete this._levels[e]);
        var n = this._levels[t],
          o = this._map;
        return (
          n ||
            (((n = this._levels[t] = {}).el = b(
              'div',
              'leaflet-tile-container leaflet-zoom-animated',
              this._container,
            )),
            (n.el.style.zIndex = i),
            (n.origin = o.project(o.unproject(o.getPixelOrigin()), t).round()),
            (n.zoom = t),
            this._setZoomTransform(n, o.getCenter(), o.getZoom()),
            u(n.el.offsetWidth),
            this._onCreateLevel(n)),
          (this._level = n)
        );
      }
    },
    _onUpdateLevel: u,
    _onRemoveLevel: u,
    _onCreateLevel: u,
    _pruneTiles: function () {
      if (this._map) {
        var t,
          i,
          e,
          n = this._map.getZoom();
        if (n > this.options.maxZoom || n < this.options.minZoom)
          this._removeAllTiles();
        else {
          for (t in this._tiles) (e = this._tiles[t]).retain = e.current;
          for (t in this._tiles)
            (e = this._tiles[t]).current &&
              !e.active &&
              ((i = e.coords),
              this._retainParent(i.x, i.y, i.z, i.z - 5) ||
                this._retainChildren(i.x, i.y, i.z, i.z + 2));
          for (t in this._tiles) this._tiles[t].retain || this._removeTile(t);
        }
      }
    },
    _removeTilesAtZoom: function (t) {
      for (var i in this._tiles)
        this._tiles[i].coords.z === t && this._removeTile(i);
    },
    _removeAllTiles: function () {
      for (var t in this._tiles) this._removeTile(t);
    },
    _invalidateAll: function () {
      for (var t in this._levels)
        T(this._levels[t].el),
          this._onRemoveLevel(Number(t)),
          delete this._levels[t];
      this._removeAllTiles(), (this._tileZoom = void 0);
    },
    _retainParent: function (t, i, e, n) {
      var t = Math.floor(t / 2),
        i = Math.floor(i / 2),
        e = e - 1,
        o = new p(+t, +i),
        o = ((o.z = e), this._tileCoordsToKey(o)),
        o = this._tiles[o];
      return o && o.active
        ? (o.retain = !0)
        : (o && o.loaded && (o.retain = !0),
          n < e && this._retainParent(t, i, e, n));
    },
    _retainChildren: function (t, i, e, n) {
      for (var o = 2 * t; o < 2 * t + 2; o++)
        for (var s = 2 * i; s < 2 * i + 2; s++) {
          var r = new p(o, s),
            r = ((r.z = e + 1), this._tileCoordsToKey(r)),
            r = this._tiles[r];
          r && r.active
            ? (r.retain = !0)
            : (r && r.loaded && (r.retain = !0),
              e + 1 < n && this._retainChildren(o, s, e + 1, n));
        }
    },
    _resetView: function (t) {
      t = t && (t.pinch || t.flyTo);
      this._setView(this._map.getCenter(), this._map.getZoom(), t, t);
    },
    _animateZoom: function (t) {
      this._setView(t.center, t.zoom, !0, t.noUpdate);
    },
    _clampZoom: function (t) {
      var i = this.options;
      return void 0 !== i.minNativeZoom && t < i.minNativeZoom
        ? i.minNativeZoom
        : void 0 !== i.maxNativeZoom && i.maxNativeZoom < t
        ? i.maxNativeZoom
        : t;
    },
    _setView: function (t, i, e, n) {
      var o = Math.round(i),
        o =
          (void 0 !== this.options.maxZoom && o > this.options.maxZoom) ||
          (void 0 !== this.options.minZoom && o < this.options.minZoom)
            ? void 0
            : this._clampZoom(o),
        s = this.options.updateWhenZooming && o !== this._tileZoom;
      (n && !s) ||
        ((this._tileZoom = o),
        this._abortLoading && this._abortLoading(),
        this._updateLevels(),
        this._resetGrid(),
        void 0 !== o && this._update(t),
        e || this._pruneTiles(),
        (this._noPrune = !!e)),
        this._setZoomTransforms(t, i);
    },
    _setZoomTransforms: function (t, i) {
      for (var e in this._levels) this._setZoomTransform(this._levels[e], t, i);
    },
    _setZoomTransform: function (t, i, e) {
      var n = this._map.getZoomScale(e, t.zoom),
        i = t.origin
          .multiplyBy(n)
          .subtract(this._map._getNewPixelOrigin(i, e))
          .round();
      P.any3d ? Pi(t.el, i, n) : Z(t.el, i);
    },
    _resetGrid: function () {
      var t = this._map,
        i = t.options.crs,
        e = (this._tileSize = this.getTileSize()),
        n = this._tileZoom,
        o = this._map.getPixelWorldBounds(this._tileZoom);
      o && (this._globalTileRange = this._pxBoundsToTileRange(o)),
        (this._wrapX = i.wrapLng &&
          !this.options.noWrap && [
            Math.floor(t.project([0, i.wrapLng[0]], n).x / e.x),
            Math.ceil(t.project([0, i.wrapLng[1]], n).x / e.y),
          ]),
        (this._wrapY = i.wrapLat &&
          !this.options.noWrap && [
            Math.floor(t.project([i.wrapLat[0], 0], n).y / e.x),
            Math.ceil(t.project([i.wrapLat[1], 0], n).y / e.y),
          ]);
    },
    _onMoveEnd: function () {
      this._map && !this._map._animatingZoom && this._update();
    },
    _getTiledPixelBounds: function (t) {
      var i = this._map,
        e = i._animatingZoom
          ? Math.max(i._animateToZoom, i.getZoom())
          : i.getZoom(),
        e = i.getZoomScale(e, this._tileZoom),
        t = i.project(t, this._tileZoom).floor(),
        i = i.getSize().divideBy(2 * e);
      return new m(t.subtract(i), t.add(i));
    },
    _update: function (t) {
      var i = this._map;
      if (i) {
        var e = this._clampZoom(i.getZoom());
        if ((void 0 === t && (t = i.getCenter()), void 0 !== this._tileZoom)) {
          var n,
            i = this._getTiledPixelBounds(t),
            o = this._pxBoundsToTileRange(i),
            s = o.getCenter(),
            r = [],
            i = this.options.keepBuffer,
            a = new m(
              o.getBottomLeft().subtract([i, -i]),
              o.getTopRight().add([i, -i]),
            );
          if (
            !(
              isFinite(o.min.x) &&
              isFinite(o.min.y) &&
              isFinite(o.max.x) &&
              isFinite(o.max.y)
            )
          )
            throw new Error('Attempted to load an infinite number of tiles');
          for (n in this._tiles) {
            var h = this._tiles[n].coords;
            (h.z === this._tileZoom && a.contains(new p(h.x, h.y))) ||
              (this._tiles[n].current = !1);
          }
          if (1 < Math.abs(e - this._tileZoom)) this._setView(t, e);
          else {
            for (var l = o.min.y; l <= o.max.y; l++)
              for (var u = o.min.x; u <= o.max.x; u++) {
                var c,
                  d = new p(u, l);
                (d.z = this._tileZoom),
                  this._isValidTile(d) &&
                    ((c = this._tiles[this._tileCoordsToKey(d)])
                      ? (c.current = !0)
                      : r.push(d));
              }
            if (
              (r.sort(function (t, i) {
                return t.distanceTo(s) - i.distanceTo(s);
              }),
              0 !== r.length)
            ) {
              this._loading || ((this._loading = !0), this.fire('loading'));
              for (
                var _ = document.createDocumentFragment(), u = 0;
                u < r.length;
                u++
              )
                this._addTile(r[u], _);
              this._level.el.appendChild(_);
            }
          }
        }
      }
    },
    _isValidTile: function (t) {
      var i = this._map.options.crs;
      if (!i.infinite) {
        var e = this._globalTileRange;
        if (
          (!i.wrapLng && (t.x < e.min.x || t.x > e.max.x)) ||
          (!i.wrapLat && (t.y < e.min.y || t.y > e.max.y))
        )
          return !1;
      }
      if (!this.options.bounds) return !0;
      i = this._tileCoordsToBounds(t);
      return g(this.options.bounds).overlaps(i);
    },
    _keyToBounds: function (t) {
      return this._tileCoordsToBounds(this._keyToTileCoords(t));
    },
    _tileCoordsToNwSe: function (t) {
      var i = this._map,
        e = this.getTileSize(),
        n = t.scaleBy(e),
        e = n.add(e);
      return [i.unproject(n, t.z), i.unproject(e, t.z)];
    },
    _tileCoordsToBounds: function (t) {
      (t = this._tileCoordsToNwSe(t)), (t = new s(t[0], t[1]));
      return (t = this.options.noWrap ? t : this._map.wrapLatLngBounds(t));
    },
    _tileCoordsToKey: function (t) {
      return t.x + ':' + t.y + ':' + t.z;
    },
    _keyToTileCoords: function (t) {
      var t = t.split(':'),
        i = new p(+t[0], +t[1]);
      return (i.z = +t[2]), i;
    },
    _removeTile: function (t) {
      var i = this._tiles[t];
      i &&
        (T(i.el),
        delete this._tiles[t],
        this.fire('tileunload', {
          tile: i.el,
          coords: this._keyToTileCoords(t),
        }));
    },
    _initTile: function (t) {
      z(t, 'leaflet-tile');
      var i = this.getTileSize();
      (t.style.width = i.x + 'px'),
        (t.style.height = i.y + 'px'),
        (t.onselectstart = u),
        (t.onmousemove = u),
        P.ielt9 && this.options.opacity < 1 && C(t, this.options.opacity);
    },
    _addTile: function (t, i) {
      var e = this._getTilePos(t),
        n = this._tileCoordsToKey(t),
        o = this.createTile(this._wrapCoords(t), a(this._tileReady, this, t));
      this._initTile(o),
        this.createTile.length < 2 && x(a(this._tileReady, this, t, null, o)),
        Z(o, e),
        (this._tiles[n] = { el: o, coords: t, current: !0 }),
        i.appendChild(o),
        this.fire('tileloadstart', { tile: o, coords: t });
    },
    _tileReady: function (t, i, e) {
      i && this.fire('tileerror', { error: i, tile: e, coords: t });
      var n = this._tileCoordsToKey(t);
      (e = this._tiles[n]) &&
        ((e.loaded = +new Date()),
        this._map._fadeAnimated
          ? (C(e.el, 0),
            r(this._fadeFrame),
            (this._fadeFrame = x(this._updateOpacity, this)))
          : ((e.active = !0), this._pruneTiles()),
        i ||
          (z(e.el, 'leaflet-tile-loaded'),
          this.fire('tileload', { tile: e.el, coords: t })),
        this._noTilesToLoad() &&
          ((this._loading = !1),
          this.fire('load'),
          P.ielt9 || !this._map._fadeAnimated
            ? x(this._pruneTiles, this)
            : setTimeout(a(this._pruneTiles, this), 250)));
    },
    _getTilePos: function (t) {
      return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
    },
    _wrapCoords: function (t) {
      var i = new p(
        this._wrapX ? H(t.x, this._wrapX) : t.x,
        this._wrapY ? H(t.y, this._wrapY) : t.y,
      );
      return (i.z = t.z), i;
    },
    _pxBoundsToTileRange: function (t) {
      var i = this.getTileSize();
      return new m(
        t.min.unscaleBy(i).floor(),
        t.max.unscaleBy(i).ceil().subtract([1, 1]),
      );
    },
    _noTilesToLoad: function () {
      for (var t in this._tiles) if (!this._tiles[t].loaded) return !1;
      return !0;
    },
  });
  var Ie = Ae.extend({
    options: {
      minZoom: 0,
      maxZoom: 18,
      subdomains: 'abc',
      errorTileUrl: '',
      zoomOffset: 0,
      tms: !1,
      zoomReverse: !1,
      detectRetina: !1,
      crossOrigin: !1,
      referrerPolicy: !1,
    },
    initialize: function (t, i) {
      (this._url = t),
        (i = c(this, i)).detectRetina &&
          P.retina &&
          0 < i.maxZoom &&
          ((i.tileSize = Math.floor(i.tileSize / 2)),
          i.zoomReverse
            ? (i.zoomOffset--, i.minZoom++)
            : (i.zoomOffset++, i.maxZoom--),
          (i.minZoom = Math.max(0, i.minZoom))),
        'string' == typeof i.subdomains &&
          (i.subdomains = i.subdomains.split('')),
        this.on('tileunload', this._onTileRemove);
    },
    setUrl: function (t, i) {
      return (
        this._url === t && void 0 === i && (i = !0),
        (this._url = t),
        i || this.redraw(),
        this
      );
    },
    createTile: function (t, i) {
      var e = document.createElement('img');
      return (
        S(e, 'load', a(this._tileOnLoad, this, i, e)),
        S(e, 'error', a(this._tileOnError, this, i, e)),
        (!this.options.crossOrigin && '' !== this.options.crossOrigin) ||
          (e.crossOrigin =
            !0 === this.options.crossOrigin ? '' : this.options.crossOrigin),
        'string' == typeof this.options.referrerPolicy &&
          (e.referrerPolicy = this.options.referrerPolicy),
        (e.alt = ''),
        e.setAttribute('role', 'presentation'),
        (e.src = this.getTileUrl(t)),
        e
      );
    },
    getTileUrl: function (t) {
      var i = {
        r: P.retina ? '@2x' : '',
        s: this._getSubdomain(t),
        x: t.x,
        y: t.y,
        z: this._getZoomForUrl(),
      };
      return (
        this._map &&
          !this._map.options.crs.infinite &&
          ((t = this._globalTileRange.max.y - t.y),
          this.options.tms && (i.y = t),
          (i['-y'] = t)),
        q(this._url, l(i, this.options))
      );
    },
    _tileOnLoad: function (t, i) {
      P.ielt9 ? setTimeout(a(t, this, null, i), 0) : t(null, i);
    },
    _tileOnError: function (t, i, e) {
      var n = this.options.errorTileUrl;
      n && i.getAttribute('src') !== n && (i.src = n), t(e, i);
    },
    _onTileRemove: function (t) {
      t.tile.onload = null;
    },
    _getZoomForUrl: function () {
      var t = this._tileZoom,
        i = this.options.maxZoom;
      return (
        (t = this.options.zoomReverse ? i - t : t) + this.options.zoomOffset
      );
    },
    _getSubdomain: function (t) {
      t = Math.abs(t.x + t.y) % this.options.subdomains.length;
      return this.options.subdomains[t];
    },
    _abortLoading: function () {
      var t, i, e;
      for (t in this._tiles)
        this._tiles[t].coords.z !== this._tileZoom &&
          (((e = this._tiles[t].el).onload = u),
          (e.onerror = u),
          e.complete ||
            ((e.src = K),
            (i = this._tiles[t].coords),
            T(e),
            delete this._tiles[t],
            this.fire('tileabort', { tile: e, coords: i })));
    },
    _removeTile: function (t) {
      var i = this._tiles[t];
      if (i)
        return (
          i.el.setAttribute('src', K), Ae.prototype._removeTile.call(this, t)
        );
    },
    _tileReady: function (t, i, e) {
      if (this._map && (!e || e.getAttribute('src') !== K))
        return Ae.prototype._tileReady.call(this, t, i, e);
    },
  });
  function Oe(t, i) {
    return new Ie(t, i);
  }
  var Re = Ie.extend({
    defaultWmsParams: {
      service: 'WMS',
      request: 'GetMap',
      layers: '',
      styles: '',
      format: 'image/jpeg',
      transparent: !1,
      version: '1.1.1',
    },
    options: { crs: null, uppercase: !1 },
    initialize: function (t, i) {
      this._url = t;
      var e,
        n = l({}, this.defaultWmsParams);
      for (e in i) e in this.options || (n[e] = i[e]);
      var t = (i = c(this, i)).detectRetina && P.retina ? 2 : 1,
        o = this.getTileSize();
      (n.width = o.x * t), (n.height = o.y * t), (this.wmsParams = n);
    },
    onAdd: function (t) {
      (this._crs = this.options.crs || t.options.crs),
        (this._wmsVersion = parseFloat(this.wmsParams.version));
      var i = 1.3 <= this._wmsVersion ? 'crs' : 'srs';
      (this.wmsParams[i] = this._crs.code), Ie.prototype.onAdd.call(this, t);
    },
    getTileUrl: function (t) {
      var i = this._tileCoordsToNwSe(t),
        e = this._crs,
        e = f(e.project(i[0]), e.project(i[1])),
        i = e.min,
        e = e.max,
        i = (
          1.3 <= this._wmsVersion && this._crs === re
            ? [i.y, i.x, e.y, e.x]
            : [i.x, i.y, e.x, e.y]
        ).join(','),
        e = Ie.prototype.getTileUrl.call(this, t);
      return (
        e +
        U(this.wmsParams, e, this.options.uppercase) +
        (this.options.uppercase ? '&BBOX=' : '&bbox=') +
        i
      );
    },
    setParams: function (t, i) {
      return l(this.wmsParams, t), i || this.redraw(), this;
    },
  });
  (Ie.WMS = Re),
    (Oe.wms = function (t, i) {
      return new Re(t, i);
    });
  var Ne = o.extend({
      options: { padding: 0.1 },
      initialize: function (t) {
        c(this, t), h(this), (this._layers = this._layers || {});
      },
      onAdd: function () {
        this._container ||
          (this._initContainer(),
          this._zoomAnimated && z(this._container, 'leaflet-zoom-animated')),
          this.getPane().appendChild(this._container),
          this._update(),
          this.on('update', this._updatePaths, this);
      },
      onRemove: function () {
        this.off('update', this._updatePaths, this), this._destroyContainer();
      },
      getEvents: function () {
        var t = {
          viewreset: this._reset,
          zoom: this._onZoom,
          moveend: this._update,
          zoomend: this._onZoomEnd,
        };
        return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t;
      },
      _onAnimZoom: function (t) {
        this._updateTransform(t.center, t.zoom);
      },
      _onZoom: function () {
        this._updateTransform(this._map.getCenter(), this._map.getZoom());
      },
      _updateTransform: function (t, i) {
        var e = this._map.getZoomScale(i, this._zoom),
          n = this._map.getSize().multiplyBy(0.5 + this.options.padding),
          o = this._map.project(this._center, i),
          n = n
            .multiplyBy(-e)
            .add(o)
            .subtract(this._map._getNewPixelOrigin(t, i));
        P.any3d ? Pi(this._container, n, e) : Z(this._container, n);
      },
      _reset: function () {
        for (var t in (this._update(),
        this._updateTransform(this._center, this._zoom),
        this._layers))
          this._layers[t]._reset();
      },
      _onZoomEnd: function () {
        for (var t in this._layers) this._layers[t]._project();
      },
      _updatePaths: function () {
        for (var t in this._layers) this._layers[t]._update();
      },
      _update: function () {
        var t = this.options.padding,
          i = this._map.getSize(),
          e = this._map.containerPointToLayerPoint(i.multiplyBy(-t)).round();
        (this._bounds = new m(e, e.add(i.multiplyBy(1 + 2 * t)).round())),
          (this._center = this._map.getCenter()),
          (this._zoom = this._map.getZoom());
      },
    }),
    De = Ne.extend({
      options: { tolerance: 0 },
      getEvents: function () {
        var t = Ne.prototype.getEvents.call(this);
        return (t.viewprereset = this._onViewPreReset), t;
      },
      _onViewPreReset: function () {
        this._postponeUpdatePaths = !0;
      },
      onAdd: function () {
        Ne.prototype.onAdd.call(this), this._draw();
      },
      _initContainer: function () {
        var t = (this._container = document.createElement('canvas'));
        S(t, 'mousemove', this._onMouseMove, this),
          S(
            t,
            'click dblclick mousedown mouseup contextmenu',
            this._onClick,
            this,
          ),
          S(t, 'mouseout', this._handleMouseOut, this),
          (t._leaflet_disable_events = !0),
          (this._ctx = t.getContext('2d'));
      },
      _destroyContainer: function () {
        r(this._redrawRequest),
          delete this._ctx,
          T(this._container),
          E(this._container),
          delete this._container;
      },
      _updatePaths: function () {
        if (!this._postponeUpdatePaths) {
          for (var t in ((this._redrawBounds = null), this._layers))
            this._layers[t]._update();
          this._redraw();
        }
      },
      _update: function () {
        var t, i, e, n;
        (this._map._animatingZoom && this._bounds) ||
          (Ne.prototype._update.call(this),
          (t = this._bounds),
          (i = this._container),
          (e = t.getSize()),
          (n = P.retina ? 2 : 1),
          Z(i, t.min),
          (i.width = n * e.x),
          (i.height = n * e.y),
          (i.style.width = e.x + 'px'),
          (i.style.height = e.y + 'px'),
          P.retina && this._ctx.scale(2, 2),
          this._ctx.translate(-t.min.x, -t.min.y),
          this.fire('update'));
      },
      _reset: function () {
        Ne.prototype._reset.call(this),
          this._postponeUpdatePaths &&
            ((this._postponeUpdatePaths = !1), this._updatePaths());
      },
      _initPath: function (t) {
        this._updateDashArray(t);
        t = (this._layers[h(t)] = t)._order = {
          layer: t,
          prev: this._drawLast,
          next: null,
        };
        this._drawLast && (this._drawLast.next = t),
          (this._drawLast = t),
          (this._drawFirst = this._drawFirst || this._drawLast);
      },
      _addPath: function (t) {
        this._requestRedraw(t);
      },
      _removePath: function (t) {
        var i = t._order,
          e = i.next,
          i = i.prev;
        e ? (e.prev = i) : (this._drawLast = i),
          i ? (i.next = e) : (this._drawFirst = e),
          delete t._order,
          delete this._layers[h(t)],
          this._requestRedraw(t);
      },
      _updatePath: function (t) {
        this._extendRedrawBounds(t),
          t._project(),
          t._update(),
          this._requestRedraw(t);
      },
      _updateStyle: function (t) {
        this._updateDashArray(t), this._requestRedraw(t);
      },
      _updateDashArray: function (t) {
        if ('string' == typeof t.options.dashArray) {
          for (
            var i, e = t.options.dashArray.split(/[, ]+/), n = [], o = 0;
            o < e.length;
            o++
          ) {
            if (((i = Number(e[o])), isNaN(i))) return;
            n.push(i);
          }
          t.options._dashArray = n;
        } else t.options._dashArray = t.options.dashArray;
      },
      _requestRedraw: function (t) {
        this._map &&
          (this._extendRedrawBounds(t),
          (this._redrawRequest = this._redrawRequest || x(this._redraw, this)));
      },
      _extendRedrawBounds: function (t) {
        var i;
        t._pxBounds &&
          ((i = (t.options.weight || 0) + 1),
          (this._redrawBounds = this._redrawBounds || new m()),
          this._redrawBounds.extend(t._pxBounds.min.subtract([i, i])),
          this._redrawBounds.extend(t._pxBounds.max.add([i, i])));
      },
      _redraw: function () {
        (this._redrawRequest = null),
          this._redrawBounds &&
            (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()),
          this._clear(),
          this._draw(),
          (this._redrawBounds = null);
      },
      _clear: function () {
        var t,
          i = this._redrawBounds;
        i
          ? ((t = i.getSize()), this._ctx.clearRect(i.min.x, i.min.y, t.x, t.y))
          : (this._ctx.save(),
            this._ctx.setTransform(1, 0, 0, 1, 0, 0),
            this._ctx.clearRect(
              0,
              0,
              this._container.width,
              this._container.height,
            ),
            this._ctx.restore());
      },
      _draw: function () {
        var t,
          i,
          e = this._redrawBounds;
        this._ctx.save(),
          e &&
            ((i = e.getSize()),
            this._ctx.beginPath(),
            this._ctx.rect(e.min.x, e.min.y, i.x, i.y),
            this._ctx.clip()),
          (this._drawing = !0);
        for (var n = this._drawFirst; n; n = n.next)
          (t = n.layer),
            (!e || (t._pxBounds && t._pxBounds.intersects(e))) &&
              t._updatePath();
        (this._drawing = !1), this._ctx.restore();
      },
      _updatePoly: function (t, i) {
        if (this._drawing) {
          var e,
            n,
            o,
            s,
            r = t._parts,
            a = r.length,
            h = this._ctx;
          if (a) {
            for (h.beginPath(), e = 0; e < a; e++) {
              for (n = 0, o = r[e].length; n < o; n++)
                (s = r[e][n]), h[n ? 'lineTo' : 'moveTo'](s.x, s.y);
              i && h.closePath();
            }
            this._fillStroke(h, t);
          }
        }
      },
      _updateCircle: function (t) {
        var i, e, n, o;
        this._drawing &&
          !t._empty() &&
          ((i = t._point),
          (e = this._ctx),
          (n = Math.max(Math.round(t._radius), 1)),
          1 != (o = (Math.max(Math.round(t._radiusY), 1) || n) / n) &&
            (e.save(), e.scale(1, o)),
          e.beginPath(),
          e.arc(i.x, i.y / o, n, 0, 2 * Math.PI, !1),
          1 != o && e.restore(),
          this._fillStroke(e, t));
      },
      _fillStroke: function (t, i) {
        var e = i.options;
        e.fill &&
          ((t.globalAlpha = e.fillOpacity),
          (t.fillStyle = e.fillColor || e.color),
          t.fill(e.fillRule || 'evenodd')),
          e.stroke &&
            0 !== e.weight &&
            (t.setLineDash &&
              t.setLineDash((i.options && i.options._dashArray) || []),
            (t.globalAlpha = e.opacity),
            (t.lineWidth = e.weight),
            (t.strokeStyle = e.color),
            (t.lineCap = e.lineCap),
            (t.lineJoin = e.lineJoin),
            t.stroke());
      },
      _onClick: function (t) {
        for (
          var i,
            e,
            n = this._map.mouseEventToLayerPoint(t),
            o = this._drawFirst;
          o;
          o = o.next
        )
          (i = o.layer).options.interactive &&
            i._containsPoint(n) &&
            ((('click' === t.type || 'preclick' === t.type) &&
              this._map._draggableMoved(i)) ||
              (e = i));
        this._fireEvent(!!e && [e], t);
      },
      _onMouseMove: function (t) {
        var i;
        !this._map ||
          this._map.dragging.moving() ||
          this._map._animatingZoom ||
          ((i = this._map.mouseEventToLayerPoint(t)),
          this._handleMouseHover(t, i));
      },
      _handleMouseOut: function (t) {
        var i = this._hoveredLayer;
        i &&
          (M(this._container, 'leaflet-interactive'),
          this._fireEvent([i], t, 'mouseout'),
          (this._hoveredLayer = null),
          (this._mouseHoverThrottled = !1));
      },
      _handleMouseHover: function (t, i) {
        if (!this._mouseHoverThrottled) {
          for (var e, n, o = this._drawFirst; o; o = o.next)
            (e = o.layer).options.interactive && e._containsPoint(i) && (n = e);
          n !== this._hoveredLayer &&
            (this._handleMouseOut(t),
            n &&
              (z(this._container, 'leaflet-interactive'),
              this._fireEvent([n], t, 'mouseover'),
              (this._hoveredLayer = n))),
            this._fireEvent(!!this._hoveredLayer && [this._hoveredLayer], t),
            (this._mouseHoverThrottled = !0),
            setTimeout(
              a(function () {
                this._mouseHoverThrottled = !1;
              }, this),
              32,
            );
        }
      },
      _fireEvent: function (t, i, e) {
        this._map._fireDOMEvent(i, e || i.type, t);
      },
      _bringToFront: function (t) {
        var i,
          e,
          n = t._order;
        n &&
          ((i = n.next),
          (e = n.prev),
          i &&
            ((i.prev = e) ? (e.next = i) : i && (this._drawFirst = i),
            (n.prev = this._drawLast),
            ((this._drawLast.next = n).next = null),
            (this._drawLast = n),
            this._requestRedraw(t)));
      },
      _bringToBack: function (t) {
        var i,
          e,
          n = t._order;
        n &&
          ((i = n.next),
          (e = n.prev) &&
            ((e.next = i) ? (i.prev = e) : e && (this._drawLast = e),
            (n.prev = null),
            (n.next = this._drawFirst),
            (this._drawFirst.prev = n),
            (this._drawFirst = n),
            this._requestRedraw(t)));
      },
    });
  function je(t) {
    return P.canvas ? new De(t) : null;
  }
  var He = (function () {
      try {
        return (
          document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml'),
          function (t) {
            return document.createElement('<lvml:' + t + ' class="lvml">');
          }
        );
      } catch (t) {}
      return function (t) {
        return document.createElement(
          '<' + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">',
        );
      };
    })(),
    Mt = {
      _initContainer: function () {
        this._container = b('div', 'leaflet-vml-container');
      },
      _update: function () {
        this._map._animatingZoom ||
          (Ne.prototype._update.call(this), this.fire('update'));
      },
      _initPath: function (t) {
        var i = (t._container = He('shape'));
        z(i, 'leaflet-vml-shape ' + (this.options.className || '')),
          (i.coordsize = '1 1'),
          (t._path = He('path')),
          i.appendChild(t._path),
          this._updateStyle(t),
          (this._layers[h(t)] = t);
      },
      _addPath: function (t) {
        var i = t._container;
        this._container.appendChild(i),
          t.options.interactive && t.addInteractiveTarget(i);
      },
      _removePath: function (t) {
        var i = t._container;
        T(i), t.removeInteractiveTarget(i), delete this._layers[h(t)];
      },
      _updateStyle: function (t) {
        var i = t._stroke,
          e = t._fill,
          n = t.options,
          o = t._container;
        (o.stroked = !!n.stroke),
          (o.filled = !!n.fill),
          n.stroke
            ? ((i = i || (t._stroke = He('stroke'))),
              o.appendChild(i),
              (i.weight = n.weight + 'px'),
              (i.color = n.color),
              (i.opacity = n.opacity),
              n.dashArray
                ? (i.dashStyle = d(n.dashArray)
                    ? n.dashArray.join(' ')
                    : n.dashArray.replace(/( *, *)/g, ' '))
                : (i.dashStyle = ''),
              (i.endcap = n.lineCap.replace('butt', 'flat')),
              (i.joinstyle = n.lineJoin))
            : i && (o.removeChild(i), (t._stroke = null)),
          n.fill
            ? ((e = e || (t._fill = He('fill'))),
              o.appendChild(e),
              (e.color = n.fillColor || n.color),
              (e.opacity = n.fillOpacity))
            : e && (o.removeChild(e), (t._fill = null));
      },
      _updateCircle: function (t) {
        var i = t._point.round(),
          e = Math.round(t._radius),
          n = Math.round(t._radiusY || e);
        this._setPath(
          t,
          t._empty()
            ? 'M0 0'
            : 'AL ' + i.x + ',' + i.y + ' ' + e + ',' + n + ' 0,23592600',
        );
      },
      _setPath: function (t, i) {
        t._path.v = i;
      },
      _bringToFront: function (t) {
        fi(t._container);
      },
      _bringToBack: function (t) {
        gi(t._container);
      },
    },
    We = P.vml ? He : ct,
    Fe = Ne.extend({
      _initContainer: function () {
        (this._container = We('svg')),
          this._container.setAttribute('pointer-events', 'none'),
          (this._rootGroup = We('g')),
          this._container.appendChild(this._rootGroup);
      },
      _destroyContainer: function () {
        T(this._container),
          E(this._container),
          delete this._container,
          delete this._rootGroup,
          delete this._svgSize;
      },
      _update: function () {
        var t, i, e;
        (this._map._animatingZoom && this._bounds) ||
          (Ne.prototype._update.call(this),
          (i = (t = this._bounds).getSize()),
          (e = this._container),
          (this._svgSize && this._svgSize.equals(i)) ||
            ((this._svgSize = i),
            e.setAttribute('width', i.x),
            e.setAttribute('height', i.y)),
          Z(e, t.min),
          e.setAttribute('viewBox', [t.min.x, t.min.y, i.x, i.y].join(' ')),
          this.fire('update'));
      },
      _initPath: function (t) {
        var i = (t._path = We('path'));
        t.options.className && z(i, t.options.className),
          t.options.interactive && z(i, 'leaflet-interactive'),
          this._updateStyle(t),
          (this._layers[h(t)] = t);
      },
      _addPath: function (t) {
        this._rootGroup || this._initContainer(),
          this._rootGroup.appendChild(t._path),
          t.addInteractiveTarget(t._path);
      },
      _removePath: function (t) {
        T(t._path),
          t.removeInteractiveTarget(t._path),
          delete this._layers[h(t)];
      },
      _updatePath: function (t) {
        t._project(), t._update();
      },
      _updateStyle: function (t) {
        var i = t._path,
          t = t.options;
        i &&
          (t.stroke
            ? (i.setAttribute('stroke', t.color),
              i.setAttribute('stroke-opacity', t.opacity),
              i.setAttribute('stroke-width', t.weight),
              i.setAttribute('stroke-linecap', t.lineCap),
              i.setAttribute('stroke-linejoin', t.lineJoin),
              t.dashArray
                ? i.setAttribute('stroke-dasharray', t.dashArray)
                : i.removeAttribute('stroke-dasharray'),
              t.dashOffset
                ? i.setAttribute('stroke-dashoffset', t.dashOffset)
                : i.removeAttribute('stroke-dashoffset'))
            : i.setAttribute('stroke', 'none'),
          t.fill
            ? (i.setAttribute('fill', t.fillColor || t.color),
              i.setAttribute('fill-opacity', t.fillOpacity),
              i.setAttribute('fill-rule', t.fillRule || 'evenodd'))
            : i.setAttribute('fill', 'none'));
      },
      _updatePoly: function (t, i) {
        this._setPath(t, dt(t._parts, i));
      },
      _updateCircle: function (t) {
        var i = t._point,
          e = Math.max(Math.round(t._radius), 1),
          n =
            'a' +
            e +
            ',' +
            (Math.max(Math.round(t._radiusY), 1) || e) +
            ' 0 1,0 ',
          i = t._empty()
            ? 'M0 0'
            : 'M' +
              (i.x - e) +
              ',' +
              i.y +
              n +
              2 * e +
              ',0 ' +
              n +
              2 * -e +
              ',0 ';
        this._setPath(t, i);
      },
      _setPath: function (t, i) {
        t._path.setAttribute('d', i);
      },
      _bringToFront: function (t) {
        fi(t._path);
      },
      _bringToBack: function (t) {
        gi(t._path);
      },
    });
  function Ue(t) {
    return P.svg || P.vml ? new Fe(t) : null;
  }
  P.vml && Fe.include(Mt),
    A.include({
      getRenderer: function (t) {
        t =
          (t =
            t.options.renderer ||
            this._getPaneRenderer(t.options.pane) ||
            this.options.renderer ||
            this._renderer) || (this._renderer = this._createRenderer());
        return this.hasLayer(t) || this.addLayer(t), t;
      },
      _getPaneRenderer: function (t) {
        if ('overlayPane' === t || void 0 === t) return !1;
        var i = this._paneRenderers[t];
        return (
          void 0 === i &&
            ((i = this._createRenderer({ pane: t })),
            (this._paneRenderers[t] = i)),
          i
        );
      },
      _createRenderer: function (t) {
        return (this.options.preferCanvas && je(t)) || Ue(t);
      },
    });
  var Ve = ge.extend({
    initialize: function (t, i) {
      ge.prototype.initialize.call(this, this._boundsToLatLngs(t), i);
    },
    setBounds: function (t) {
      return this.setLatLngs(this._boundsToLatLngs(t));
    },
    _boundsToLatLngs: function (t) {
      return [
        (t = g(t)).getSouthWest(),
        t.getNorthWest(),
        t.getNorthEast(),
        t.getSouthEast(),
      ];
    },
  });
  (Fe.create = We),
    (Fe.pointsToPath = dt),
    (ve.geometryToLayer = ye),
    (ve.coordsToLatLng = we),
    (ve.coordsToLatLngs = Pe),
    (ve.latLngToCoords = be),
    (ve.latLngsToCoords = Le),
    (ve.getFeature = Te),
    (ve.asFeature = ze),
    A.mergeOptions({ boxZoom: !0 });
  var _t = n.extend({
      initialize: function (t) {
        (this._map = t),
          (this._container = t._container),
          (this._pane = t._panes.overlayPane),
          (this._resetStateTimeout = 0),
          t.on('unload', this._destroy, this);
      },
      addHooks: function () {
        S(this._container, 'mousedown', this._onMouseDown, this);
      },
      removeHooks: function () {
        E(this._container, 'mousedown', this._onMouseDown, this);
      },
      moved: function () {
        return this._moved;
      },
      _destroy: function () {
        T(this._pane), delete this._pane;
      },
      _resetState: function () {
        (this._resetStateTimeout = 0), (this._moved = !1);
      },
      _clearDeferredResetState: function () {
        0 !== this._resetStateTimeout &&
          (clearTimeout(this._resetStateTimeout),
          (this._resetStateTimeout = 0));
      },
      _onMouseDown: function (t) {
        if (!t.shiftKey || (1 !== t.which && 1 !== t.button)) return !1;
        this._clearDeferredResetState(),
          this._resetState(),
          ri(),
          Li(),
          (this._startPoint = this._map.mouseEventToContainerPoint(t)),
          S(
            document,
            {
              contextmenu: Ri,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown,
            },
            this,
          );
      },
      _onMouseMove: function (t) {
        this._moved ||
          ((this._moved = !0),
          (this._box = b('div', 'leaflet-zoom-box', this._container)),
          z(this._container, 'leaflet-crosshair'),
          this._map.fire('boxzoomstart')),
          (this._point = this._map.mouseEventToContainerPoint(t));
        var t = new m(this._point, this._startPoint),
          i = t.getSize();
        Z(this._box, t.min),
          (this._box.style.width = i.x + 'px'),
          (this._box.style.height = i.y + 'px');
      },
      _finish: function () {
        this._moved && (T(this._box), M(this._container, 'leaflet-crosshair')),
          ai(),
          Ti(),
          E(
            document,
            {
              contextmenu: Ri,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown,
            },
            this,
          );
      },
      _onMouseUp: function (t) {
        (1 !== t.which && 1 !== t.button) ||
          (this._finish(),
          this._moved &&
            (this._clearDeferredResetState(),
            (this._resetStateTimeout = setTimeout(
              a(this._resetState, this),
              0,
            )),
            (t = new s(
              this._map.containerPointToLatLng(this._startPoint),
              this._map.containerPointToLatLng(this._point),
            )),
            this._map.fitBounds(t).fire('boxzoomend', { boxZoomBounds: t })));
      },
      _onKeyDown: function (t) {
        27 === t.keyCode &&
          (this._finish(), this._clearDeferredResetState(), this._resetState());
      },
    }),
    Ct =
      (A.addInitHook('addHandler', 'boxZoom', _t),
      A.mergeOptions({ doubleClickZoom: !0 }),
      n.extend({
        addHooks: function () {
          this._map.on('dblclick', this._onDoubleClick, this);
        },
        removeHooks: function () {
          this._map.off('dblclick', this._onDoubleClick, this);
        },
        _onDoubleClick: function (t) {
          var i = this._map,
            e = i.getZoom(),
            n = i.options.zoomDelta,
            e = t.originalEvent.shiftKey ? e - n : e + n;
          'center' === i.options.doubleClickZoom
            ? i.setZoom(e)
            : i.setZoomAround(t.containerPoint, e);
        },
      })),
    Zt =
      (A.addInitHook('addHandler', 'doubleClickZoom', Ct),
      A.mergeOptions({
        dragging: !0,
        inertia: !0,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        easeLinearity: 0.2,
        worldCopyJump: !1,
        maxBoundsViscosity: 0,
      }),
      n.extend({
        addHooks: function () {
          var t;
          this._draggable ||
            ((t = this._map),
            (this._draggable = new Xi(t._mapPane, t._container)),
            this._draggable.on(
              {
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd,
              },
              this,
            ),
            this._draggable.on('predrag', this._onPreDragLimit, this),
            t.options.worldCopyJump &&
              (this._draggable.on('predrag', this._onPreDragWrap, this),
              t.on('zoomend', this._onZoomEnd, this),
              t.whenReady(this._onZoomEnd, this))),
            z(this._map._container, 'leaflet-grab leaflet-touch-drag'),
            this._draggable.enable(),
            (this._positions = []),
            (this._times = []);
        },
        removeHooks: function () {
          M(this._map._container, 'leaflet-grab'),
            M(this._map._container, 'leaflet-touch-drag'),
            this._draggable.disable();
        },
        moved: function () {
          return this._draggable && this._draggable._moved;
        },
        moving: function () {
          return this._draggable && this._draggable._moving;
        },
        _onDragStart: function () {
          var t,
            i = this._map;
          i._stop(),
            this._map.options.maxBounds && this._map.options.maxBoundsViscosity
              ? ((t = g(this._map.options.maxBounds)),
                (this._offsetLimit = f(
                  this._map
                    .latLngToContainerPoint(t.getNorthWest())
                    .multiplyBy(-1),
                  this._map
                    .latLngToContainerPoint(t.getSouthEast())
                    .multiplyBy(-1)
                    .add(this._map.getSize()),
                )),
                (this._viscosity = Math.min(
                  1,
                  Math.max(0, this._map.options.maxBoundsViscosity),
                )))
              : (this._offsetLimit = null),
            i.fire('movestart').fire('dragstart'),
            i.options.inertia && ((this._positions = []), (this._times = []));
        },
        _onDrag: function (t) {
          var i, e;
          this._map.options.inertia &&
            ((i = this._lastTime = +new Date()),
            (e = this._lastPos =
              this._draggable._absPos || this._draggable._newPos),
            this._positions.push(e),
            this._times.push(i),
            this._prunePositions(i)),
            this._map.fire('move', t).fire('drag', t);
        },
        _prunePositions: function (t) {
          for (; 1 < this._positions.length && 50 < t - this._times[0]; )
            this._positions.shift(), this._times.shift();
        },
        _onZoomEnd: function () {
          var t = this._map.getSize().divideBy(2),
            i = this._map.latLngToLayerPoint([0, 0]);
          (this._initialWorldOffset = i.subtract(t).x),
            (this._worldWidth = this._map.getPixelWorldBounds().getSize().x);
        },
        _viscousLimit: function (t, i) {
          return t - (t - i) * this._viscosity;
        },
        _onPreDragLimit: function () {
          var t, i;
          this._viscosity &&
            this._offsetLimit &&
            ((t = this._draggable._newPos.subtract(this._draggable._startPos)),
            (i = this._offsetLimit),
            t.x < i.min.x && (t.x = this._viscousLimit(t.x, i.min.x)),
            t.y < i.min.y && (t.y = this._viscousLimit(t.y, i.min.y)),
            t.x > i.max.x && (t.x = this._viscousLimit(t.x, i.max.x)),
            t.y > i.max.y && (t.y = this._viscousLimit(t.y, i.max.y)),
            (this._draggable._newPos = this._draggable._startPos.add(t)));
        },
        _onPreDragWrap: function () {
          var t = this._worldWidth,
            i = Math.round(t / 2),
            e = this._initialWorldOffset,
            n = this._draggable._newPos.x,
            o = ((n - i + e) % t) + i - e,
            n = ((n + i + e) % t) - i - e,
            t = Math.abs(o + e) < Math.abs(n + e) ? o : n;
          (this._draggable._absPos = this._draggable._newPos.clone()),
            (this._draggable._newPos.x = t);
        },
        _onDragEnd: function (t) {
          var i,
            e,
            n,
            o,
            s = this._map,
            r = s.options,
            a = !r.inertia || t.noInertia || this._times.length < 2;
          s.fire('dragend', t),
            a
              ? s.fire('moveend')
              : (this._prunePositions(+new Date()),
                (t = this._lastPos.subtract(this._positions[0])),
                (a = (this._lastTime - this._times[0]) / 1e3),
                (i = r.easeLinearity),
                (a = (t = t.multiplyBy(i / a)).distanceTo([0, 0])),
                (e = Math.min(r.inertiaMaxSpeed, a)),
                (t = t.multiplyBy(e / a)),
                (n = e / (r.inertiaDeceleration * i)),
                (o = t.multiplyBy(-n / 2).round()).x || o.y
                  ? ((o = s._limitOffset(o, s.options.maxBounds)),
                    x(function () {
                      s.panBy(o, {
                        duration: n,
                        easeLinearity: i,
                        noMoveStart: !0,
                        animate: !0,
                      });
                    }))
                  : s.fire('moveend'));
        },
      })),
    St =
      (A.addInitHook('addHandler', 'dragging', Zt),
      A.mergeOptions({ keyboard: !0, keyboardPanDelta: 80 }),
      n.extend({
        keyCodes: {
          left: [37],
          right: [39],
          down: [40],
          up: [38],
          zoomIn: [187, 107, 61, 171],
          zoomOut: [189, 109, 54, 173],
        },
        initialize: function (t) {
          (this._map = t),
            this._setPanDelta(t.options.keyboardPanDelta),
            this._setZoomDelta(t.options.zoomDelta);
        },
        addHooks: function () {
          var t = this._map._container;
          t.tabIndex <= 0 && (t.tabIndex = '0'),
            S(
              t,
              {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown,
              },
              this,
            ),
            this._map.on(
              { focus: this._addHooks, blur: this._removeHooks },
              this,
            );
        },
        removeHooks: function () {
          this._removeHooks(),
            E(
              this._map._container,
              {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown,
              },
              this,
            ),
            this._map.off(
              { focus: this._addHooks, blur: this._removeHooks },
              this,
            );
        },
        _onMouseDown: function () {
          var t, i, e;
          this._focused ||
            ((e = document.body),
            (t = document.documentElement),
            (i = e.scrollTop || t.scrollTop),
            (e = e.scrollLeft || t.scrollLeft),
            this._map._container.focus(),
            window.scrollTo(e, i));
        },
        _onFocus: function () {
          (this._focused = !0), this._map.fire('focus');
        },
        _onBlur: function () {
          (this._focused = !1), this._map.fire('blur');
        },
        _setPanDelta: function (t) {
          for (
            var i = (this._panKeys = {}),
              e = this.keyCodes,
              n = 0,
              o = e.left.length;
            n < o;
            n++
          )
            i[e.left[n]] = [-1 * t, 0];
          for (n = 0, o = e.right.length; n < o; n++) i[e.right[n]] = [t, 0];
          for (n = 0, o = e.down.length; n < o; n++) i[e.down[n]] = [0, t];
          for (n = 0, o = e.up.length; n < o; n++) i[e.up[n]] = [0, -1 * t];
        },
        _setZoomDelta: function (t) {
          for (
            var i = (this._zoomKeys = {}),
              e = this.keyCodes,
              n = 0,
              o = e.zoomIn.length;
            n < o;
            n++
          )
            i[e.zoomIn[n]] = t;
          for (n = 0, o = e.zoomOut.length; n < o; n++) i[e.zoomOut[n]] = -t;
        },
        _addHooks: function () {
          S(document, 'keydown', this._onKeyDown, this);
        },
        _removeHooks: function () {
          E(document, 'keydown', this._onKeyDown, this);
        },
        _onKeyDown: function (t) {
          if (!(t.altKey || t.ctrlKey || t.metaKey)) {
            var i,
              e = t.keyCode,
              n = this._map;
            if (e in this._panKeys)
              (n._panAnim && n._panAnim._inProgress) ||
                ((i = this._panKeys[e]),
                t.shiftKey && (i = _(i).multiplyBy(3)),
                n.panBy(i),
                n.options.maxBounds && n.panInsideBounds(n.options.maxBounds));
            else if (e in this._zoomKeys)
              n.setZoom(n.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
            else {
              if (27 !== e || !n._popup || !n._popup.options.closeOnEscapeKey)
                return;
              n.closePopup();
            }
            Ri(t);
          }
        },
      })),
    kt =
      (A.addInitHook('addHandler', 'keyboard', St),
      A.mergeOptions({
        scrollWheelZoom: !0,
        wheelDebounceTime: 40,
        wheelPxPerZoomLevel: 60,
      }),
      n.extend({
        addHooks: function () {
          S(this._map._container, 'wheel', this._onWheelScroll, this),
            (this._delta = 0);
        },
        removeHooks: function () {
          E(this._map._container, 'wheel', this._onWheelScroll, this);
        },
        _onWheelScroll: function (t) {
          var i = ji(t),
            e = this._map.options.wheelDebounceTime,
            i =
              ((this._delta += i),
              (this._lastMousePos = this._map.mouseEventToContainerPoint(t)),
              this._startTime || (this._startTime = +new Date()),
              Math.max(e - (+new Date() - this._startTime), 0));
          clearTimeout(this._timer),
            (this._timer = setTimeout(a(this._performZoom, this), i)),
            Ri(t);
        },
        _performZoom: function () {
          var t = this._map,
            i = t.getZoom(),
            e = this._map.options.zoomSnap || 0,
            n =
              (t._stop(),
              this._delta / (4 * this._map.options.wheelPxPerZoomLevel)),
            n = (4 * Math.log(2 / (1 + Math.exp(-Math.abs(n))))) / Math.LN2,
            e = e ? Math.ceil(n / e) * e : n,
            n = t._limitZoom(i + (0 < this._delta ? e : -e)) - i;
          (this._delta = 0),
            (this._startTime = null),
            n &&
              ('center' === t.options.scrollWheelZoom
                ? t.setZoom(i + n)
                : t.setZoomAround(this._lastMousePos, i + n));
        },
      })),
    Et =
      (A.addInitHook('addHandler', 'scrollWheelZoom', kt),
      A.mergeOptions({
        tapHold: P.touchNative && P.safari && P.mobile,
        tapTolerance: 15,
      }),
      n.extend({
        addHooks: function () {
          S(this._map._container, 'touchstart', this._onDown, this);
        },
        removeHooks: function () {
          E(this._map._container, 'touchstart', this._onDown, this);
        },
        _onDown: function (t) {
          var i;
          clearTimeout(this._holdTimeout),
            1 === t.touches.length &&
              ((i = t.touches[0]),
              (this._startPos = this._newPos = new p(i.clientX, i.clientY)),
              (this._holdTimeout = setTimeout(
                a(function () {
                  this._cancel(),
                    this._isTapValid() &&
                      (S(document, 'touchend', B),
                      S(
                        document,
                        'touchend touchcancel',
                        this._cancelClickPrevent,
                      ),
                      this._simulateEvent('contextmenu', i));
                }, this),
                600,
              )),
              S(
                document,
                'touchend touchcancel contextmenu',
                this._cancel,
                this,
              ),
              S(document, 'touchmove', this._onMove, this));
        },
        _cancelClickPrevent: function t() {
          E(document, 'touchend', B), E(document, 'touchend touchcancel', t);
        },
        _cancel: function () {
          clearTimeout(this._holdTimeout),
            E(document, 'touchend touchcancel contextmenu', this._cancel, this),
            E(document, 'touchmove', this._onMove, this);
        },
        _onMove: function (t) {
          t = t.touches[0];
          this._newPos = new p(t.clientX, t.clientY);
        },
        _isTapValid: function () {
          return (
            this._newPos.distanceTo(this._startPos) <=
            this._map.options.tapTolerance
          );
        },
        _simulateEvent: function (t, i) {
          t = new MouseEvent(t, {
            bubbles: !0,
            cancelable: !0,
            view: window,
            screenX: i.screenX,
            screenY: i.screenY,
            clientX: i.clientX,
            clientY: i.clientY,
          });
          (t._simulated = !0), i.target.dispatchEvent(t);
        },
      })),
    Bt =
      (A.addInitHook('addHandler', 'tapHold', Et),
      A.mergeOptions({ touchZoom: P.touch, bounceAtZoomLimits: !0 }),
      n.extend({
        addHooks: function () {
          z(this._map._container, 'leaflet-touch-zoom'),
            S(this._map._container, 'touchstart', this._onTouchStart, this);
        },
        removeHooks: function () {
          M(this._map._container, 'leaflet-touch-zoom'),
            E(this._map._container, 'touchstart', this._onTouchStart, this);
        },
        _onTouchStart: function (t) {
          var i,
            e,
            n = this._map;
          !t.touches ||
            2 !== t.touches.length ||
            n._animatingZoom ||
            this._zooming ||
            ((i = n.mouseEventToContainerPoint(t.touches[0])),
            (e = n.mouseEventToContainerPoint(t.touches[1])),
            (this._centerPoint = n.getSize()._divideBy(2)),
            (this._startLatLng = n.containerPointToLatLng(this._centerPoint)),
            'center' !== n.options.touchZoom &&
              (this._pinchStartLatLng = n.containerPointToLatLng(
                i.add(e)._divideBy(2),
              )),
            (this._startDist = i.distanceTo(e)),
            (this._startZoom = n.getZoom()),
            (this._moved = !1),
            (this._zooming = !0),
            n._stop(),
            S(document, 'touchmove', this._onTouchMove, this),
            S(document, 'touchend touchcancel', this._onTouchEnd, this),
            B(t));
        },
        _onTouchMove: function (t) {
          if (t.touches && 2 === t.touches.length && this._zooming) {
            var i = this._map,
              e = i.mouseEventToContainerPoint(t.touches[0]),
              n = i.mouseEventToContainerPoint(t.touches[1]),
              o = e.distanceTo(n) / this._startDist;
            if (
              ((this._zoom = i.getScaleZoom(o, this._startZoom)),
              !i.options.bounceAtZoomLimits &&
                ((this._zoom < i.getMinZoom() && o < 1) ||
                  (this._zoom > i.getMaxZoom() && 1 < o)) &&
                (this._zoom = i._limitZoom(this._zoom)),
              'center' === i.options.touchZoom)
            ) {
              if (((this._center = this._startLatLng), 1 == o)) return;
            } else {
              e = e._add(n)._divideBy(2)._subtract(this._centerPoint);
              if (1 == o && 0 === e.x && 0 === e.y) return;
              this._center = i.unproject(
                i.project(this._pinchStartLatLng, this._zoom).subtract(e),
                this._zoom,
              );
            }
            this._moved || (i._moveStart(!0, !1), (this._moved = !0)),
              r(this._animRequest);
            n = a(i._move, i, this._center, this._zoom, {
              pinch: !0,
              round: !1,
            });
            (this._animRequest = x(n, this, !0)), B(t);
          }
        },
        _onTouchEnd: function () {
          this._moved && this._zooming
            ? ((this._zooming = !1),
              r(this._animRequest),
              E(document, 'touchmove', this._onTouchMove, this),
              E(document, 'touchend touchcancel', this._onTouchEnd, this),
              this._map.options.zoomAnimation
                ? this._map._animateZoom(
                    this._center,
                    this._map._limitZoom(this._zoom),
                    !0,
                    this._map.options.zoomSnap,
                  )
                : this._map._resetView(
                    this._center,
                    this._map._limitZoom(this._zoom),
                  ))
            : (this._zooming = !1);
        },
      })),
    qe =
      (A.addInitHook('addHandler', 'touchZoom', Bt),
      (A.BoxZoom = _t),
      (A.DoubleClickZoom = Ct),
      (A.Drag = Zt),
      (A.Keyboard = St),
      (A.ScrollWheelZoom = kt),
      (A.TapHold = Et),
      (A.TouchZoom = Bt),
      (t.Bounds = m),
      (t.Browser = P),
      (t.CRS = ot),
      (t.Canvas = De),
      (t.Circle = me),
      (t.CircleMarker = pe),
      (t.Class = it),
      (t.Control = I),
      (t.DivIcon = Be),
      (t.DivOverlay = O),
      (t.DomEvent = mt),
      (t.DomUtil = pt),
      (t.Draggable = Xi),
      (t.Evented = et),
      (t.FeatureGroup = he),
      (t.GeoJSON = ve),
      (t.GridLayer = Ae),
      (t.Handler = n),
      (t.Icon = le),
      (t.ImageOverlay = Ce),
      (t.LatLng = v),
      (t.LatLngBounds = s),
      (t.Layer = o),
      (t.LayerGroup = ae),
      (t.LineUtil = gt),
      (t.Map = A),
      (t.Marker = de),
      (t.Mixin = ft),
      (t.Path = _e),
      (t.Point = p),
      (t.PolyUtil = vt),
      (t.Polygon = ge),
      (t.Polyline = fe),
      (t.Popup = ke),
      (t.PosAnimation = Wi),
      (t.Projection = wt),
      (t.Rectangle = Ve),
      (t.Renderer = Ne),
      (t.SVG = Fe),
      (t.SVGOverlay = Se),
      (t.TileLayer = Ie),
      (t.Tooltip = Ee),
      (t.Transformation = at),
      (t.Util = tt),
      (t.VideoOverlay = Ze),
      (t.bind = a),
      (t.bounds = f),
      (t.canvas = je),
      (t.circle = function (t, i, e) {
        return new me(t, i, e);
      }),
      (t.circleMarker = function (t, i) {
        return new pe(t, i);
      }),
      (t.control = Fi),
      (t.divIcon = function (t) {
        return new Be(t);
      }),
      (t.extend = l),
      (t.featureGroup = function (t, i) {
        return new he(t, i);
      }),
      (t.geoJSON = Me),
      (t.geoJson = zt),
      (t.gridLayer = function (t) {
        return new Ae(t);
      }),
      (t.icon = function (t) {
        return new le(t);
      }),
      (t.imageOverlay = function (t, i, e) {
        return new Ce(t, i, e);
      }),
      (t.latLng = w),
      (t.latLngBounds = g),
      (t.layerGroup = function (t, i) {
        return new ae(t, i);
      }),
      (t.map = function (t, i) {
        return new A(t, i);
      }),
      (t.marker = function (t, i) {
        return new de(t, i);
      }),
      (t.point = _),
      (t.polygon = function (t, i) {
        return new ge(t, i);
      }),
      (t.polyline = function (t, i) {
        return new fe(t, i);
      }),
      (t.popup = function (t, i) {
        return new ke(t, i);
      }),
      (t.rectangle = function (t, i) {
        return new Ve(t, i);
      }),
      (t.setOptions = c),
      (t.stamp = h),
      (t.svg = Ue),
      (t.svgOverlay = function (t, i, e) {
        return new Se(t, i, e);
      }),
      (t.tileLayer = Oe),
      (t.tooltip = function (t, i) {
        return new Ee(t, i);
      }),
      (t.transformation = ht),
      (t.version = '1.8.0'),
      (t.videoOverlay = function (t, i, e) {
        return new Ze(t, i, e);
      }),
      window.L);
  (t.noConflict = function () {
    return (window.L = qe), this;
  }),
    (window.L = t);
});
//# sourceMappingURL=leaflet.js.map
