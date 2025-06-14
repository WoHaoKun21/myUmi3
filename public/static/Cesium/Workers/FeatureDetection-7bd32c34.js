define(['exports', './when-8d13db60'], function (e, n) {
  var r,
    t,
    u,
    i,
    l,
    s,
    o,
    c,
    f,
    d,
    a,
    p,
    m,
    A,
    v,
    g,
    y,
    F,
    b,
    h,
    E,
    w = {
      requestFullscreen: void 0,
      exitFullscreen: void 0,
      fullscreenEnabled: void 0,
      fullscreenElement: void 0,
      fullscreenchange: void 0,
      fullscreenerror: void 0,
    },
    x = {};
  function C(e) {
    for (var n = e.split('.'), r = 0, t = n.length; r < t; ++r)
      n[r] = parseInt(n[r], 10);
    return n;
  }
  function S() {
    if (!n.defined(u) && ((u = !1), !q())) {
      var e = / Chrome\/([\.0-9]+)/.exec(t.userAgent);
      null !== e && ((u = !0), (i = C(e[1])));
    }
    return u;
  }
  function I() {
    if (
      !n.defined(l) &&
      ((l = !1), !S() && !q() && / Safari\/[\.0-9]+/.test(t.userAgent))
    ) {
      var e = / Version\/([\.0-9]+)/.exec(t.userAgent);
      null !== e && ((l = !0), (s = C(e[1])));
    }
    return l;
  }
  function V() {
    if (!n.defined(o)) {
      o = !1;
      var e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(t.userAgent);
      null !== e && ((o = !0), ((c = C(e[1])).isNightly = !!e[2]));
    }
    return o;
  }
  function W() {
    var e;
    return (
      n.defined(f) ||
        ((f = !1),
        'Microsoft Internet Explorer' === t.appName
          ? null !== (e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(t.userAgent)) &&
            ((f = !0), (d = C(e[1])))
          : 'Netscape' === t.appName &&
            null !==
              (e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(t.userAgent)) &&
            ((f = !0), (d = C(e[1])))),
      f
    );
  }
  function q() {
    if (!n.defined(a)) {
      a = !1;
      var e = / Edge\/([\.0-9]+)/.exec(t.userAgent);
      null !== e && ((a = !0), (p = C(e[1])));
    }
    return a;
  }
  function P() {
    if (!n.defined(m)) {
      m = !1;
      var e = /Firefox\/([\.0-9]+)/.exec(t.userAgent);
      null !== e && ((m = !0), (A = C(e[1])));
    }
    return m;
  }
  function k() {
    if (!n.defined(b)) {
      var e = document.createElement('canvas');
      e.setAttribute(
        'style',
        'image-rendering: -moz-crisp-edges;image-rendering: pixelated;',
      );
      var r = e.style.imageRendering;
      (b = n.defined(r) && '' !== r) && (F = r);
    }
    return b;
  }
  function N() {
    if (n.defined(E)) return E.promise;
    (E = n.when.defer()), q() && ((h = !1), E.resolve(h));
    var e = new Image();
    return (
      (e.onload = function () {
        (h = 0 < e.width && 0 < e.height), E.resolve(h);
      }),
      (e.onerror = function () {
        (h = !1), E.resolve(h);
      }),
      (e.src =
        'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA'),
      E.promise
    );
  }
  Object.defineProperties(x, {
    element: {
      get: function () {
        if (x.supportsFullscreen()) return document[w.fullscreenElement];
      },
    },
    changeEventName: {
      get: function () {
        if (x.supportsFullscreen()) return w.fullscreenchange;
      },
    },
    errorEventName: {
      get: function () {
        if (x.supportsFullscreen()) return w.fullscreenerror;
      },
    },
    enabled: {
      get: function () {
        if (x.supportsFullscreen()) return document[w.fullscreenEnabled];
      },
    },
    fullscreen: {
      get: function () {
        if (x.supportsFullscreen()) return null !== x.element;
      },
    },
  }),
    (x.supportsFullscreen = function () {
      if (n.defined(r)) return r;
      r = !1;
      var e = document.body;
      if ('function' == typeof e.requestFullscreen)
        return (
          (w.requestFullscreen = 'requestFullscreen'),
          (w.exitFullscreen = 'exitFullscreen'),
          (w.fullscreenEnabled = 'fullscreenEnabled'),
          (w.fullscreenElement = 'fullscreenElement'),
          (w.fullscreenchange = 'fullscreenchange'),
          (w.fullscreenerror = 'fullscreenerror'),
          (r = !0)
        );
      for (
        var t, u = ['webkit', 'moz', 'o', 'ms', 'khtml'], i = 0, l = u.length;
        i < l;
        ++i
      ) {
        var s = u[i];
        ('function' == typeof e[(t = s + 'RequestFullscreen')] ||
          'function' == typeof e[(t = s + 'RequestFullScreen')]) &&
          ((w.requestFullscreen = t), (r = !0)),
          (t = s + 'ExitFullscreen'),
          'function' == typeof document[t]
            ? (w.exitFullscreen = t)
            : ((t = s + 'CancelFullScreen'),
              'function' == typeof document[t] && (w.exitFullscreen = t)),
          (t = s + 'FullscreenEnabled'),
          void 0 !== document[t]
            ? (w.fullscreenEnabled = t)
            : ((t = s + 'FullScreenEnabled'),
              void 0 !== document[t] && (w.fullscreenEnabled = t)),
          (t = s + 'FullscreenElement'),
          void 0 !== document[t]
            ? (w.fullscreenElement = t)
            : ((t = s + 'FullScreenElement'),
              void 0 !== document[t] && (w.fullscreenElement = t)),
          (t = s + 'fullscreenchange'),
          void 0 !== document['on' + t] &&
            ('ms' === s && (t = 'MSFullscreenChange'),
            (w.fullscreenchange = t)),
          (t = s + 'fullscreenerror'),
          void 0 !== document['on' + t] &&
            ('ms' === s && (t = 'MSFullscreenError'), (w.fullscreenerror = t));
      }
      return r;
    }),
    (x.requestFullscreen = function (e, n) {
      x.supportsFullscreen() && e[w.requestFullscreen]({ vrDisplay: n });
    }),
    (x.exitFullscreen = function () {
      x.supportsFullscreen() && document[w.exitFullscreen]();
    }),
    (x._names = w),
    (t = 'undefined' != typeof navigator ? navigator : {});
  var R = [];
  'undefined' != typeof ArrayBuffer &&
    (R.push(
      Int8Array,
      Uint8Array,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float32Array,
      Float64Array,
    ),
    'undefined' != typeof Uint8ClampedArray && R.push(Uint8ClampedArray),
    'undefined' != typeof CanvasPixelArray && R.push(CanvasPixelArray));
  var U = {
    isChrome: S,
    chromeVersion: function () {
      return S() && i;
    },
    isSafari: I,
    safariVersion: function () {
      return I() && s;
    },
    isWebkit: V,
    webkitVersion: function () {
      return V() && c;
    },
    isInternetExplorer: W,
    internetExplorerVersion: function () {
      return W() && d;
    },
    isEdge: q,
    edgeVersion: function () {
      return q() && p;
    },
    isFirefox: P,
    firefoxVersion: function () {
      return P() && A;
    },
    isWindows: function () {
      return n.defined(v) || (v = /Windows/i.test(t.appVersion)), v;
    },
    isNodeJs: function () {
      return (
        n.defined(g) ||
          (g =
            'object' == typeof process &&
            '[object process]' === Object.prototype.toString.call(process)),
        g
      );
    },
    hardwareConcurrency: n.defaultValue(t.hardwareConcurrency, 3),
    supportsPointerEvents: function () {
      return (
        n.defined(y) ||
          (y =
            !P() &&
            'undefined' != typeof PointerEvent &&
            (!n.defined(t.pointerEnabled) || t.pointerEnabled)),
        y
      );
    },
    supportsImageRenderingPixelated: k,
    supportsWebP: N,
    supportsWebPSync: function () {
      return n.defined(E) || N(), h;
    },
    imageRenderingValue: function () {
      return k() ? F : void 0;
    },
    typedArrayTypes: R,
    isPCBroswer: function () {
      var e = window.navigator.userAgent.toLowerCase(),
        n = 'ipad' == e.match(/ipad/i),
        r = 'iphone os' == e.match(/iphone os/i),
        t = 'midp' == e.match(/midp/i),
        u = 'rv:1.2.3.4' == e.match(/rv:1.2.3.4/i),
        i = 'ucweb' == e.match(/ucweb/i),
        l = 'android' == e.match(/android/i),
        s = 'windows ce' == e.match(/windows ce/i),
        o = 'windows mobile' == e.match(/windows mobile/i);
      return !(n || r || t || u || i || l || s || o);
    },
    supportsFullscreen: function () {
      return x.supportsFullscreen();
    },
    supportsTypedArrays: function () {
      return 'undefined' != typeof ArrayBuffer;
    },
    supportsWebWorkers: function () {
      return 'undefined' != typeof Worker;
    },
    supportsWebAssembly: function () {
      return 'undefined' != typeof WebAssembly && !U.isEdge();
    },
    supportsOffscreenCanvas: function () {
      return 'undefined' != typeof OffscreenCanvas && !U.isEdge();
    },
  };
  e.FeatureDetection = U;
});
