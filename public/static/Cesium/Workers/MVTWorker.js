define([
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './FeatureDetection-7bd32c34',
  './createTaskProcessorWorker',
  './Color-69f1845f',
  './pbf-9fe59c76',
], function (t, e, n, i, r, o, s) {
  function a() {}
  function l(t) {
    var e = null,
      n = null,
      i = null;
    return h(t[0])
      ? ((i = t[0]),
        t.length > 1 && '$' === (n = t[1])[0]
          ? null
          : (t.length > 2 && (e = t[2]),
            { filterOperator: i, filterFieldName: n, filterCompareValue: e }))
      : null;
  }
  function h(t) {
    return -1 !== ['==', '===', '>=', '<=', '>', '<', '!=', 'has'].indexOf(t);
  }
  function c(t, e, n) {
    return t[e] == n;
  }
  (a.parseLayerFilter = function (e) {
    if (!(t.defined(e) && e instanceof Array)) return null;
    var n,
      i = [];
    if (h(e[0])) (n = l(e)), t.defined(n) && i.push(n);
    else
      for (var r = 0; r < e.length; r++)
        if (e[r] instanceof Array)
          if (3 !== e[r].length)
            for (var o = 0; o < e[r].length; o++)
              e[r][o] instanceof Array &&
                3 === e[r][o].length &&
                ((n = l(e[r][o])), t.defined(n) && i.push(n));
          else (n = l(e[r])), t.defined(n) && i.push(n);
    return i;
  }),
    (a.filterTest = function (t, e) {
      for (var n = 0, i = e.length; n < i; n++) {
        var r = e[n];
        if (!u[r.filterOperator](t, r.filterFieldName, r.filterCompareValue))
          return !1;
      }
      return !0;
    });
  var u = {
    '==': c,
    '===': c,
    '>': function (t, e, n) {
      return t[e] > n;
    },
    '<': function (t, e, n) {
      return t[e] < n;
    },
    '>=': function (t, e, n) {
      return t[e] >= n;
    },
    '<=': function (t, e, n) {
      return t[e] <= n;
    },
    '!=': function (t, e, n) {
      return t[e] != n;
    },
    has: function (e, n) {
      return t.defined(e[n]);
    },
  };
  function d(t, n) {
    if (!t) throw new e.DeveloperError('need include ol-debug.js');
    (this._useOffscreen = n), (this._openlayer = t);
  }
  function f(t) {
    var e = t.substring(t.indexOf('(') + 1, t.indexOf(')'));
    e = e.split(',');
    var n = [];
    return (
      n.push(parseFloat(e[0])),
      n.push(parseFloat(e[1])),
      n.push(parseFloat(e[2])),
      n.push(parseFloat(e[3])),
      n
    );
  }
  function g(t, e) {
    if (t && void 0 !== e) {
      var n = {
        color: [
          (255 * t[0]) / t[3],
          (255 * t[1]) / t[3],
          (255 * t[2]) / t[3],
          t[3],
        ],
        opacity: t[3],
      };
      ((t = n.color)[3] = n.opacity * e), 0 === t[3] && (t = void 0);
    }
    return t;
  }
  Object.defineProperties(d.prototype, { proxy: { get: function () {} } }),
    (d.prototype.getStyle = function () {
      var t = this._openlayer,
        e = new t.style.Fill({ color: '' });
      e.setColor('#ffffff');
      var n = new t.style.Stroke({ color: '', width: 1 });
      return (
        n.setWidth(1),
        n.setColor('#000000'),
        new t.style.Style({ fill: e, stroke: n })
      );
    }),
    (d.prototype.getStyleByMapboxStyle = function (e) {
      var n = this._openlayer,
        i = e.type,
        r = e.paint,
        o = e.layout;
      if (!t.defined(i) || !t.defined(r)) return this.getStyle();
      if ('fill' == i) {
        var s = new n.style.Style({}),
          a = new n.style.Fill({ color: '[255,255,255,1]' });
        s.setFill(a);
        var l = r['fill-opacity'];
        if (t.defined(r['fill-color'])) {
          var h = f(r['fill-color']);
          t.defined(l) && (h[3] *= l), a.setColor(h);
        }
        if (t.defined(r['fill-outline-color'])) {
          var c = new n.style.Stroke({ color: '', width: 1 });
          c.setColor(r['fill-outline-color']), s.setStroke(c);
        }
        return (
          t.defined(r['fill-pattern']) &&
            (s.fillPatternName = r['fill-pattern']),
          s
        );
      }
      if ('line' == i) {
        var u = new n.style.Style({}),
          d = new n.style.Stroke({ color: '#000000', width: 1 });
        u.setStroke(d);
        var p = r['line-opacity'];
        if (t.defined(r['line-color'])) {
          var y = f(r['line-color']);
          t.defined(p) && (y[3] *= p);
        }
        if (t.defined(r['line-width'])) {
          var m = r['line-width'];
          d.setWidth(m);
        }
        if (t.defined(r['line-dasharray'])) {
          var v = r['line-dasharray'];
          d.setLineDash(v);
        }
        if (t.defined(o)) {
          if (t.defined(o['line-cap'])) {
            var _ = o['line-cap'];
            d.setLineCap(_);
          }
          if (t.defined(o['line-join'])) {
            var S = o['line-join'];
            d.setLineJoin(S);
          }
          if (t.defined(o['line-miter-limit'])) {
            var x = o['line-miter-limit'];
            d.setMiterLimit(x);
          }
        }
        return d.setColor(y), u;
      }
      if ('symbol' == i) {
        var I = new n.style.Style({});
        return (
          t.defined(o) && t.defined(o['icon-image']) && (I.hasIconImage = !0),
          t.defined(o) && t.defined(o['text-field']) && (I.hasTextStyle = !0),
          I
        );
      }
      if ('circle' == i) {
        var C = r['circle-radius'],
          T = r['circle-color'],
          R = r['circle-stroke-color'],
          L = r['circle-opacity'],
          E = r['circle-stroke-opacity'],
          O = r['circle-stroke-width'],
          G = new n.style.Circle({
            radius: C,
            stroke:
              0 === O
                ? void 0
                : new n.style.Stroke({ width: O, color: g(R, E) }),
            fill: new n.style.Fill({ color: g(T, L) }),
          }),
          M = new n.style.Style({});
        return M.setImage(G), M;
      }
      return this.getStyle();
    });
  var p = new o.Color();
  d.prototype.getIDColorStyle = function (e, n, i, r, o, s) {
    var a = this._openlayer,
      l = (function (t, e) {
        var n = Math.floor(t / 65536),
          i = t - 65536 * n,
          r = Math.floor(i / 256),
          o = i - 256 * r;
        return (
          (p.red = o / 256),
          (p.green = r / 256),
          (p.blue = n / 256),
          (p.alpha = 1),
          p
        );
      })(n),
      h = l.toCssColorString();
    if ('LineString' == e || 'LinearRing' == e || 'MultiLineString' == e) {
      var c = 4;
      return (
        t.defined(r) && (c = 2 * r + s),
        (g = new a.style.Stroke({ color: '', width: c })).setColor(h),
        new a.style.Style({ stroke: g })
      );
    }
    if ('Point' == e || 'MultiPoint' == e) {
      var u = new a.style.Circle({
          radius: o - 0.5,
          fill: new a.style.Fill({ color: h }),
        }),
        d = new a.style.Style({});
      return d.setImage(u), d;
    }
    var f = new a.style.Fill({ color: '' });
    f.setColor(h);
    var g,
      y = new a.style.Style({ fill: f });
    return (
      t.defined(r) &&
        ((g = new a.style.Stroke({
          color: '',
          width: t.defined(r) ? 2 * r : 4,
        })).setColor(h),
        y.setStroke(g)),
      y
    );
  };
  var y = /^([^]*)\{(.*)\}([^]*)$/;
  d.prototype.getTextStyle = function (e, n, i) {
    var r = this._openlayer,
      o = i.paint,
      s = i.layout,
      a = (function (t, e) {
        var n;
        do {
          if ((n = t.match(y))) {
            const i = e[n[2]] || '';
            t = n[1] + i + n[3];
          }
        } while (n);
        return t;
      })(s['text-field'], n.getProperties());
    if (t.defined(a)) {
      var l = new r.style.Style(),
        h = new r.style.Text();
      l.setText(h);
      var c = s['text-size'],
        u = t.defaultValue(s['text-font'], [
          'Open Sans Regular',
          'Arial Unicode MS Regular',
        ]),
        d = s['text-transform'];
      'uppercase' == d
        ? (a = a.toUpperCase())
        : 'lowercase' == d && (a = a.toLowerCase());
      t.defaultValue(s['text-max-width'], 10);
      var g = a;
      h.setText(g), h.setFont(u), h.setRotation(0);
      var p = t.defaultValue(s['text-anchor'], 'center'),
        m = t.defaultValue(s['symbol-placement'], 'point');
      if ((h.setPlacement(m), 'point' == m)) {
        var v = 'center';
        -1 !== p.indexOf('left')
          ? (v = 'left')
          : -1 !== p.indexOf('right') && (v = 'right'),
          h.setTextAlign(v);
      } else h.setTextAlign();
      var _ = 'middle';
      0 == p.indexOf('bottom')
        ? (_ = 'bottom')
        : 0 == p.indexOf('top') && (_ = 'top'),
        h.setTextBaseline(_);
      var S = t.defaultValue(s['text-offset'], [0, 0]),
        x = t.defaultValue(s['text-translate'], [0, 0]);
      h.setOffsetX(S[0] * c + x[0]), h.setOffsetY(S[1] * c + x[1]);
      o['text-opacity'];
      var I = new r.style.Fill(),
        C = o['text-color'];
      t.defined(C) && ((C = f(C)), I.setColor(C)), h.setFill(I);
      var T = o['text-halo-color'];
      if (t.defined(T)) {
        var R = new r.style.Stroke();
        (T = f(T)),
          R.setColor(T),
          R.setWidth(o['text-halo-width']),
          h.setStroke(R);
      } else h.setStroke(void 0);
      return (
        l.setZIndex(e.getZIndex()),
        (l.hasIconImage = e.hasIconImage),
        (l.textSize = c),
        l
      );
    }
  };
  var m = {};
  d.prototype.setIconImageForStyle = function (e, n, i) {
    var r = this._openlayer,
      o = i.paint,
      s = i.layout,
      a = t.defaultValue(s['icon-size'], 1),
      l = o['icon-color'],
      h = t.defaultValue(o['icon-translate'], [0, 0]),
      c = t.defaultValue(o['icon-translate-anchor'], 'map'),
      u = t.defaultValue(s['icon-anchor'], 'center'),
      d = (function (t) {
        var e = [0.5, 0.5];
        return (
          ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(
            t,
          ) && (e = [0, 0]),
          'left' === t && ((t = 'top-left'), (e = [0, 0.5])),
          'right' === t && ((t = 'top-left'), (e = [1, 0.5])),
          'bottom' === t && ((t = 'top-left'), (e = [0.5, 1])),
          'top' === t && ((t = 'top-left'), (e = [0.5, 0])),
          { anchorOffset: e, iconAnchor: t }
        );
      })(u),
      f = d.anchorOffset,
      g = t.defaultValue(s.iconoffset, [0, 0]),
      p = t.defaultValue(s['icon-opacity'], 1),
      y = s['icon-image'];
    if (t.defined(e[y])) {
      var v = y + '.' + a + '.' + h + '.' + c + '.' + u + '.' + g;
      t.defined(l) && (v += '.' + l);
      var _ = m[v];
      if (!t.defined(_)) {
        var S,
          x = e[y];
        this._useOffscreen
          ? (S = new OffscreenCanvas(x.width, x.height))
          : (((S = document.createElement('canvas')).width = x.width),
            (S.height = x.height)),
          S.getContext('2d').putImageData(x, 0, 0);
        var I = [h[0] / x.width, h[1] / x.height];
        (_ = new r.style.Icon({
          img: S,
          anchorOrigin: d.iconAnchor,
          anchor: [g[0] + f[0] + I[0], g[1] + f[1] - I[1]],
          imgSize: [S.width, S.height],
          scale: a,
        })).setOpacity(p),
          (m[v] = _);
      }
      n.setImage(_);
    } else console.log('miss icon-image ' + y);
  };
  var v = 4096,
    _ = ['Default', 'Polygon', 'LineString', 'Image', 'Symbol', 'Text'];
  function S(t) {
    (this._mvtStyleClass = t.mvtStyle), (this._openlayer = t.openlayer);
  }
  function x(t) {
    var e = t.getId();
    return (e -= 16777216 * Math.floor(e / 16777216));
  }
  function I() {}
  Object.defineProperties(S.prototype, {}),
    (S.prototype.renderFeatures = function (e) {
      for (
        var n = e.colorCanvas,
          i = e.idCanvas,
          r = e.transform,
          o = e.layers,
          s = e.features,
          l = e.tileLevel,
          h = e.spriteImageCanvas,
          c = e.spriteImageDatas,
          u = e.squaredTolerance,
          d = e.showBillboard,
          f = e.renderID,
          g = e.renderColor,
          p = e.lineWidthExpand,
          y = this._openlayer,
          m = n.getContext('2d'),
          S = [],
          x = [],
          I = [],
          C = null,
          T = y.ext.rbush(9),
          R = new y.render.canvas.ReplayGroup(0, [0, 0, v, v], 8, 2, !0, T),
          L = s.length,
          E = 0;
        E < L;
        E++
      ) {
        var O = s[E],
          G = O.getProperties().layer;
        O.index = G + O.getId();
        var M = !1,
          F = o[G],
          w = 0;
        for (var P in F) {
          var k = F[P],
            D = k.mapboxStyleLayer.maxzoom;
          if (!(l < k.mapboxStyleLayer.minzoom || l > D)) {
            var A = k.filterArray;
            if (t.defined(A)) {
              var b = O.getProperties();
              if (!a.filterTest(b, A)) continue;
              C = this._mvtStyleClass.getStyleByMapboxStyle(k.mapboxStyleLayer);
            } else
              C = this._mvtStyleClass.getStyleByMapboxStyle(k.mapboxStyleLayer);
            if (t.defined(C)) {
              if (
                (this.createFillPatternForStyle(C, h, c, m),
                t.defined(C.hasTextStyle))
              ) {
                var N = this._mvtStyleClass.getTextStyle(
                  C,
                  O,
                  k.mapboxStyleLayer,
                );
                N.setZIndex(w),
                  d
                    ? I.push({ feature: O, style: N })
                    : g && y.renderer.vector.renderFeature_(R, O, N, -1);
              }
              if (t.defined(C.hasIconImage) && !t.defined(C.getImage())) {
                if (d) {
                  x.push({ feature: O, style: k.mapboxStyleLayer });
                  continue;
                }
                this._mvtStyleClass.setIconImageForStyle(
                  c,
                  C,
                  k.mapboxStyleLayer,
                );
              }
              C.setZIndex(w),
                this.setPickStyleInFeature(O, C),
                w++,
                g && y.renderer.vector.renderFeature_(R, O, C, -1),
                (M = !0);
            }
          }
        }
        M && S.push(O);
      }
      if (g) {
        R.finish();
        var Y = {};
        R.replay(m, r, 0, {}, _, Y),
          Y && y.render.canvas.ReplayGroup.replayDeclutter(Y, m, 0);
      }
      return (
        (R = null),
        f && this.renderIDtoTexture(r, i, S, 0, u, p),
        { idFeatures: S, iconImageObjects: x, textObjects: I }
      );
    }),
    (S.prototype.renderIDtoTexture = function (t, e, n, i, r, o) {
      for (
        var s = this._openlayer,
          a = e.getContext('2d'),
          l = s.ext.rbush(9),
          h = new s.render.canvas.ReplayGroup(0, [0, 0, v, v], 8, 2, !0, l),
          c = n.length,
          u = 0;
        u < c;
        u++
      ) {
        var d = n[u],
          f = x(d),
          g = this._mvtStyleClass.getIDColorStyle(
            d.getGeometry().getType(),
            f,
            i,
            d.lineWidth,
            d.radius,
            o,
          );
        g.setZIndex(d.zIndex), s.renderer.vector.renderFeature_(h, d, g, -1);
      }
      h.finish();
      var p = {};
      h.replay(a, t, 0, {}, _, p),
        p && s.render.canvas.ReplayGroup.replayDeclutter(p, a, 0),
        (h = null);
    }),
    (S.prototype.createFillPatternForStyle = function (e, n, i, r) {
      if (t.defined(e.fillPatternName)) {
        var o = e.fillPatternName,
          s = null;
        if (t.defined(n[o])) s = n[o];
        else {
          var a = i[o];
          if (!t.defined(a)) return void console.log('miss sprite ' + o);
          ((s = document.createElement('canvas')).width = a.width),
            (s.height = a.height),
            s.getContext('2d').putImageData(a, 0, 0),
            (n[o] = s);
        }
        e.fill_.color_ = r.createPattern(s, 'repeat');
      }
    }),
    (S.prototype.setPickStyleInFeature = function (e, n) {
      var i = this._openlayer;
      if (((e.zIndex = n.getZIndex()), t.defined(n.getStroke()))) {
        var r = n.getStroke().getWidth();
        t.defined(e.lineWidth)
          ? (e.lineWidth = Math.max(e.lineWidth, r))
          : (e.lineWidth = r);
      }
      if (t.defined(n.getImage())) {
        var o = n.getImage(),
          s = 1;
        if (o instanceof i.style.Icon) {
          var a = o.getImageSize();
          (s = Math.max(a[0], a[1]) / 2), (s -= 1);
        } else o instanceof i.style.Circle && (s = o.getRadius());
        t.defined(e.radius)
          ? (e.radius = Math.max(e.radius, s))
          : (e.radius = s);
      }
    }),
    (I.array = {}),
    (I.array.binarySearch = function (t, e, n) {
      for (
        var i,
          r,
          o = n || I.array.numberSafeCompareFunction,
          s = 0,
          a = t.length,
          l = !1;
        s < a;

      )
        (r = +o(t[(i = s + ((a - s) >> 1))], e)) < 0
          ? (s = i + 1)
          : ((a = i), (l = !r));
      return l ? s : ~s;
    }),
    (I.array.numberSafeCompareFunction = function (t, e) {
      return t > e ? 1 : t < e ? -1 : 0;
    }),
    (I.array.includes = function (t, e) {
      return t.indexOf(e) >= 0;
    }),
    (I.array.linearFindNearest = function (t, e, n) {
      var i,
        r = t.length;
      if (t[0] <= e) return 0;
      if (e <= t[r - 1]) return r - 1;
      if (n > 0) {
        for (i = 1; i < r; ++i) if (t[i] < e) return i - 1;
      } else if (n < 0) {
        for (i = 1; i < r; ++i) if (t[i] <= e) return i;
      } else
        for (i = 1; i < r; ++i) {
          if (t[i] == e) return i;
          if (t[i] < e) return t[i - 1] - e < e - t[i] ? i - 1 : i;
        }
      return r - 1;
    }),
    (I.array.reverseSubArray = function (t, e, n) {
      for (; e < n; ) {
        var i = t[e];
        (t[e] = t[n]), (t[n] = i), ++e, --n;
      }
    }),
    (I.array.extend = function (t, e) {
      var n,
        i = Array.isArray(e) ? e : [e],
        r = i.length;
      for (n = 0; n < r; n++) t[t.length] = i[n];
    }),
    (I.array.remove = function (t, e) {
      var n = t.indexOf(e),
        i = n > -1;
      return i && t.splice(n, 1), i;
    }),
    (I.array.find = function (t, e) {
      for (var n, i = t.length >>> 0, r = 0; r < i; r++)
        if (e((n = t[r]), r, t)) return n;
      return null;
    }),
    (I.array.equals = function (t, e) {
      var n = t.length;
      if (n !== e.length) return !1;
      for (var i = 0; i < n; i++) if (t[i] !== e[i]) return !1;
      return !0;
    }),
    (I.array.stableSort = function (t, e) {
      var n,
        i = t.length,
        r = Array(t.length);
      for (n = 0; n < i; n++) r[n] = { index: n, value: t[n] };
      for (
        r.sort(function (t, n) {
          return e(t.value, n.value) || t.index - n.index;
        }),
          n = 0;
        n < t.length;
        n++
      )
        t[n] = r[n].value;
    }),
    (I.array.findIndex = function (t, e) {
      var n;
      return !t.every(function (i, r) {
        return (n = r), !e(i, r, t);
      })
        ? n
        : -1;
    }),
    (I.array.isSorted = function (t, e, n) {
      var i = e || I.array.numberSafeCompareFunction;
      return t.every(function (e, r) {
        if (0 === r) return !0;
        var o = i(t[r - 1], e);
        return !(o > 0 || (n && 0 === o));
      });
    }),
    (I.ASSUME_TOUCH = !1),
    (I.DEFAULT_MAX_ZOOM = 42),
    (I.DEFAULT_MIN_ZOOM = 0),
    (I.DEFAULT_RASTER_REPROJECTION_ERROR_THRESHOLD = 0.5),
    (I.DEFAULT_TILE_SIZE = 256),
    (I.DEFAULT_WMS_VERSION = '1.3.0'),
    (I.ENABLE_CANVAS = !0),
    (I.ENABLE_PROJ4JS = !0),
    (I.ENABLE_RASTER_REPROJECTION = !0),
    (I.ENABLE_WEBGL = !0),
    (I.DEBUG_WEBGL = !0),
    (I.INITIAL_ATLAS_SIZE = 256),
    (I.MAX_ATLAS_SIZE = -1),
    (I.MOUSEWHEELZOOM_MAXDELTA = 1),
    (I.OVERVIEWMAP_MAX_RATIO = 0.75),
    (I.OVERVIEWMAP_MIN_RATIO = 0.1),
    (I.RASTER_REPROJECTION_MAX_SOURCE_TILES = 100),
    (I.RASTER_REPROJECTION_MAX_SUBDIVISION = 10),
    (I.RASTER_REPROJECTION_MAX_TRIANGLE_WIDTH = 0.25),
    (I.SIMPLIFY_TOLERANCE = 0.5),
    (I.WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK = 1024),
    (I.VERSION = ''),
    (I.inherits = function (t, e) {
      (t.prototype = Object.create(e.prototype)), (t.prototype.constructor = t);
    }),
    (I.nullFunction = function () {}),
    (I.getUid = function (t) {
      return t.ol_uid || (t.ol_uid = ++I.uidCounter_);
    }),
    (I.asserts = {}),
    (I.asserts.assert = function (t, e) {}),
    (I.has = {});
  var C,
    T,
    R,
    L =
      'undefined' != typeof navigator ? navigator.userAgent.toLowerCase() : '';
  (I.has.FIREFOX = -1 !== L.indexOf('firefox')),
    (I.has.SAFARI = -1 !== L.indexOf('safari') && -1 == L.indexOf('chrom')),
    (I.has.WEBKIT = -1 !== L.indexOf('webkit') && -1 == L.indexOf('edge')),
    (I.has.MAC = -1 !== L.indexOf('macintosh')),
    (I.has.DEVICE_PIXEL_RATIO = 1),
    (I.has.CANVAS_LINE_DASH = !0),
    (I.structs = {}),
    (I.CollectionEventType = { ADD: 'add', REMOVE: 'remove' }),
    (I.ObjectEventType = { PROPERTYCHANGE: 'propertychange' }),
    (I.events = {}),
    (I.events.bindListener_ = function (t) {
      var e = function (e) {
        var n = t.listener,
          i = t.bindTo || t.target;
        return t.callOnce && I.events.unlistenByKey(t), n.call(i, e);
      };
      return (t.boundListener = e), e;
    }),
    (I.events.findListener_ = function (t, e, n, i) {
      for (var r, o = 0, s = t.length; o < s; ++o)
        if ((r = t[o]).listener === e && r.bindTo === n)
          return i && (r.deleteIndex = o), r;
    }),
    (I.events.getListeners = function (t, e) {
      var n = t.ol_lm;
      return n ? n[e] : void 0;
    }),
    (I.events.getListenerMap_ = function (t) {
      var e = t.ol_lm;
      return e || (e = t.ol_lm = {}), e;
    }),
    (I.events.removeListeners_ = function (t, e) {
      var n = I.events.getListeners(t, e);
      if (n) {
        for (var i = 0, r = n.length; i < r; ++i)
          t.removeEventListener(e, n[i].boundListener), I.obj.clear(n[i]);
        n.length = 0;
        var o = t.ol_lm;
        o && (delete o[e], 0 === Object.keys(o).length && delete t.ol_lm);
      }
    }),
    (I.events.listen = function (t, e, n, i, r) {
      var o = I.events.getListenerMap_(t),
        s = o[e];
      s || (s = o[e] = []);
      var a = I.events.findListener_(s, n, i, !1);
      return (
        a
          ? r || (a.callOnce = !1)
          : ((a = {
              bindTo: i,
              callOnce: !!r,
              listener: n,
              target: t,
              type: e,
            }),
            t.addEventListener(e, I.events.bindListener_(a)),
            s.push(a)),
        a
      );
    }),
    (I.events.listenOnce = function (t, e, n, i) {
      return I.events.listen(t, e, n, i, !0);
    }),
    (I.events.unlisten = function (t, e, n, i) {
      var r = I.events.getListeners(t, e);
      if (r) {
        var o = I.events.findListener_(r, n, i, !0);
        o && I.events.unlistenByKey(o);
      }
    }),
    (I.events.unlistenByKey = function (t) {
      if (t && t.target) {
        t.target.removeEventListener(t.type, t.boundListener);
        var e = I.events.getListeners(t.target, t.type);
        if (e) {
          var n = 'deleteIndex' in t ? t.deleteIndex : e.indexOf(t);
          -1 !== n && e.splice(n, 1),
            0 === e.length && I.events.removeListeners_(t.target, t.type);
        }
        I.obj.clear(t);
      }
    }),
    (I.events.unlistenAll = function (t) {
      var e = I.events.getListenerMap_(t);
      for (var n in e) I.events.removeListeners_(t, n);
    }),
    (I.Disposable = function () {}),
    (I.Disposable.prototype.disposed_ = !1),
    (I.Disposable.prototype.dispose = function () {
      this.disposed_ || ((this.disposed_ = !0), this.disposeInternal());
    }),
    (I.Disposable.prototype.disposeInternal = I.nullFunction),
    (I.events.Event = {}),
    (I.events.Event = function (t) {
      this.propagationStopped, (this.type = t), (this.target = null);
    }),
    (I.events.Event.prototype.preventDefault =
      I.events.Event.prototype.stopPropagation =
        function () {
          this.propagationStopped = !0;
        }),
    (I.events.Event.stopPropagation = function (t) {
      t.stopPropagation();
    }),
    (I.events.Event.preventDefault = function (t) {
      t.preventDefault();
    }),
    (I.events.EventTarget = {}),
    (I.events.EventTarget = function () {
      I.Disposable.call(this),
        (this.pendingRemovals_ = {}),
        (this.dispatching_ = {}),
        (this.listeners_ = {});
    }),
    I.inherits(I.events.EventTarget, I.Disposable),
    (I.events.EventTarget.prototype.addEventListener = function (t, e) {
      var n = this.listeners_[t];
      n || (n = this.listeners_[t] = []), -1 === n.indexOf(e) && n.push(e);
    }),
    (I.events.EventTarget.prototype.dispatchEvent = function (t) {
      var e = 'string' == typeof t ? new I.events.Event(t) : t,
        n = e.type;
      e.target = this;
      var i,
        r = this.listeners_[n];
      if (r) {
        n in this.dispatching_ ||
          ((this.dispatching_[n] = 0), (this.pendingRemovals_[n] = 0)),
          ++this.dispatching_[n];
        for (var o = 0, s = r.length; o < s; ++o)
          if (!1 === r[o].call(this, e) || e.propagationStopped) {
            i = !1;
            break;
          }
        if ((--this.dispatching_[n], 0 === this.dispatching_[n])) {
          var a = this.pendingRemovals_[n];
          for (delete this.pendingRemovals_[n]; a--; )
            this.removeEventListener(n, I.nullFunction);
          delete this.dispatching_[n];
        }
        return i;
      }
    }),
    (I.events.EventTarget.prototype.disposeInternal = function () {
      I.events.unlistenAll(this);
    }),
    (I.events.EventTarget.prototype.getListeners = function (t) {
      return this.listeners_[t];
    }),
    (I.events.EventTarget.prototype.hasListener = function (t) {
      return t ? t in this.listeners_ : Object.keys(this.listeners_).length > 0;
    }),
    (I.events.EventTarget.prototype.removeEventListener = function (t, e) {
      var n = this.listeners_[t];
      if (n) {
        var i = n.indexOf(e);
        t in this.pendingRemovals_
          ? ((n[i] = I.nullFunction), ++this.pendingRemovals_[t])
          : (n.splice(i, 1), 0 === n.length && delete this.listeners_[t]);
      }
    }),
    (I.events.EventType = {
      CHANGE: 'change',
      CLEAR: 'clear',
      CLICK: 'click',
      DBLCLICK: 'dblclick',
      DRAGENTER: 'dragenter',
      DRAGOVER: 'dragover',
      DROP: 'drop',
      ERROR: 'error',
      KEYDOWN: 'keydown',
      KEYPRESS: 'keypress',
      LOAD: 'load',
      MOUSEDOWN: 'mousedown',
      MOUSEMOVE: 'mousemove',
      MOUSEOUT: 'mouseout',
      MOUSEUP: 'mouseup',
      MOUSEWHEEL: 'mousewheel',
      MSPOINTERDOWN: 'MSPointerDown',
      RESIZE: 'resize',
      TOUCHSTART: 'touchstart',
      TOUCHMOVE: 'touchmove',
      TOUCHEND: 'touchend',
      WHEEL: 'wheel',
    }),
    (I.Observable = function () {
      this.revision_ = 0;
    }),
    I.inherits(I.Observable, I.events.EventTarget),
    (I.Observable.unByKey = function (t) {
      if (Array.isArray(t))
        for (var e = 0, n = t.length; e < n; ++e) I.events.unlistenByKey(t[e]);
      else I.events.unlistenByKey(t);
    }),
    (I.Observable.prototype.changed = function () {
      ++this.revision_;
    }),
    I.Observable.prototype.dispatchEvent,
    (I.Observable.prototype.getRevision = function () {
      return this.revision_;
    }),
    (I.Observable.prototype.on = function (t, e, n) {
      if (Array.isArray(t)) {
        for (var i = t.length, r = new Array(i), o = 0; o < i; ++o)
          r[o] = I.events.listen(this, t[o], e, n);
        return r;
      }
      return I.events.listen(this, t, e, n);
    }),
    (I.Observable.prototype.once = function (t, e, n) {
      if (Array.isArray(t)) {
        for (var i = t.length, r = new Array(i), o = 0; o < i; ++o)
          r[o] = I.events.listenOnce(this, t[o], e, n);
        return r;
      }
      return I.events.listenOnce(this, t, e, n);
    }),
    (I.Observable.prototype.un = function (t, e, n) {
      if (Array.isArray(t))
        for (var i = 0, r = t.length; i < r; ++i)
          I.events.unlisten(this, t[i], e, n);
      else I.events.unlisten(this, t, e, n);
    }),
    (I.uidCounter_ = 0),
    (I.Object = function (t) {
      I.Observable.call(this),
        I.getUid(this),
        (this.values_ = {}),
        void 0 !== t && this.setProperties(t);
    }),
    I.inherits(I.Object, I.Observable),
    (I.Object.changeEventTypeCache_ = {}),
    (I.Object.getChangeEventType = function (t) {
      return I.Object.changeEventTypeCache_.hasOwnProperty(t)
        ? I.Object.changeEventTypeCache_[t]
        : (I.Object.changeEventTypeCache_[t] = 'change:' + t);
    }),
    (I.Object.prototype.get = function (t) {
      var e;
      return this.values_.hasOwnProperty(t) && (e = this.values_[t]), e;
    }),
    (I.Object.prototype.getKeys = function () {
      return Object.keys(this.values_);
    }),
    (I.Object.prototype.getProperties = function () {
      return I.obj.assign({}, this.values_);
    }),
    (I.Object.prototype.notify = function (t, e) {}),
    (I.Object.prototype.set = function (t, e, n) {
      if (n) this.values_[t] = e;
      else {
        var i = this.values_[t];
        (this.values_[t] = e), i !== e && this.notify(t, i);
      }
    }),
    (I.Object.prototype.setProperties = function (t, e) {
      var n;
      for (n in t) this.set(n, t[n], e);
    }),
    (I.Object.prototype.unset = function (t, e) {
      if (t in this.values_) {
        var n = this.values_[t];
        delete this.values_[t], e || this.notify(t, n);
      }
    }),
    (I.Object.Event = function (t, e, n) {
      I.events.Event.call(this, t), (this.key = e), (this.oldValue = n);
    }),
    I.inherits(I.Object.Event, I.events.Event),
    (I.functions = {}),
    (I.functions.TRUE = function () {
      return !0;
    }),
    (I.functions.FALSE = function () {
      return !1;
    }),
    (I.math = {}),
    (I.math.clamp = function (t, e, n) {
      return Math.min(Math.max(t, e), n);
    }),
    (I.math.cosh =
      'cosh' in Math
        ? Math.cosh
        : function (t) {
            var e = Math.exp(t);
            return (e + 1 / e) / 2;
          }),
    (I.math.roundUpToPowerOfTwo = function (t) {
      return (
        I.asserts.assert(0 < t, 29),
        Math.pow(2, Math.ceil(Math.log(t) / Math.LN2))
      );
    }),
    (I.math.squaredSegmentDistance = function (t, e, n, i, r, o) {
      var s = r - n,
        a = o - i;
      if (0 !== s || 0 !== a) {
        var l = ((t - n) * s + (e - i) * a) / (s * s + a * a);
        l > 1 ? ((n = r), (i = o)) : l > 0 && ((n += s * l), (i += a * l));
      }
      return I.math.squaredDistance(t, e, n, i);
    }),
    (I.math.squaredDistance = function (t, e, n, i) {
      var r = n - t,
        o = i - e;
      return r * r + o * o;
    }),
    (I.math.solveLinearSystem = function (t) {
      for (var e = t.length, n = 0; n < e; n++) {
        for (var i = n, r = Math.abs(t[n][n]), o = n + 1; o < e; o++) {
          var s = Math.abs(t[o][n]);
          s > r && ((r = s), (i = o));
        }
        if (0 === r) return null;
        var a = t[i];
        (t[i] = t[n]), (t[n] = a);
        for (var l = n + 1; l < e; l++)
          for (var h = -t[l][n] / t[n][n], c = n; c < e + 1; c++)
            n == c ? (t[l][c] = 0) : (t[l][c] += h * t[n][c]);
      }
      for (var u = new Array(e), d = e - 1; d >= 0; d--) {
        u[d] = t[d][e] / t[d][d];
        for (var f = d - 1; f >= 0; f--) t[f][e] -= t[f][d] * u[d];
      }
      return u;
    }),
    (I.math.toDegrees = function (t) {
      return (180 * t) / Math.PI;
    }),
    (I.math.toRadians = function (t) {
      return (t * Math.PI) / 180;
    }),
    (I.math.modulo = function (t, e) {
      var n = t % e;
      return n * e < 0 ? n + e : n;
    }),
    (I.math.lerp = function (t, e, n) {
      return t + n * (e - t);
    }),
    (I.ImageState = { IDLE: 0, LOADING: 1, LOADED: 2, ERROR: 3 }),
    (I.color = {}),
    (I.color.HEX_COLOR_RE_ = /^#(?:[0-9a-f]{3,4}){1,2}$/i),
    (I.color.NAMED_COLOR_RE_ = /^([a-z]*)$/i),
    (I.color.asArray = function (t) {
      return Array.isArray(t) ? t : I.color.fromString(t);
    }),
    (I.color.asString = function (t) {
      return 'string' == typeof t ? t : I.color.toString(t);
    }),
    (I.color.fromNamed = function (t) {
      var e = document.createElement('div');
      (e.style.color = t), document.body.appendChild(e);
      var n = getComputedStyle(e).color;
      return document.body.removeChild(e), n;
    }),
    (I.color.fromString =
      ((C = {}),
      (T = 0),
      function (t) {
        var e;
        if (C.hasOwnProperty(t)) e = C[t];
        else {
          if (T >= 1024) {
            var n,
              i = 0;
            for (n in C) 0 == (3 & i++) && (delete C[n], --T);
          }
          (e = I.color.fromStringInternal_(t)), (C[t] = e), ++T;
        }
        return e;
      })),
    (I.color.fromStringInternal_ = function (t) {
      var e, n, i, r, o, s;
      if (
        (I.color.NAMED_COLOR_RE_.exec(t) && (t = I.color.fromNamed(t)),
        I.color.HEX_COLOR_RE_.exec(t))
      ) {
        var a,
          l = t.length - 1;
        a = l <= 4 ? 1 : 2;
        var h = 4 === l || 8 === l;
        (e = parseInt(t.substr(1 + 0 * a, a), 16)),
          (n = parseInt(t.substr(1 + 1 * a, a), 16)),
          (i = parseInt(t.substr(1 + 2 * a, a), 16)),
          (r = h ? parseInt(t.substr(1 + 3 * a, a), 16) : 255),
          1 == a &&
            ((e = (e << 4) + e),
            (n = (n << 4) + n),
            (i = (i << 4) + i),
            h && (r = (r << 4) + r)),
          (o = [e, n, i, r / 255]);
      } else
        0 == t.indexOf('rgba(')
          ? ((s = t.slice(5, -1).split(',').map(Number)),
            (o = I.color.normalize(s)))
          : 0 == t.indexOf('rgb(')
          ? ((s = t.slice(4, -1).split(',').map(Number)).push(1),
            (o = I.color.normalize(s)))
          : I.asserts.assert(!1, 14);
      return o;
    }),
    (I.color.normalize = function (t, e) {
      var n = e || [];
      return (
        (n[0] = I.math.clamp((t[0] + 0.5) | 0, 0, 255)),
        (n[1] = I.math.clamp((t[1] + 0.5) | 0, 0, 255)),
        (n[2] = I.math.clamp((t[2] + 0.5) | 0, 0, 255)),
        (n[3] = I.math.clamp(t[3], 0, 1)),
        n
      );
    }),
    (I.color.toString = function (t) {
      var e = t[0];
      e != (0 | e) && (e = (e + 0.5) | 0);
      var n = t[1];
      n != (0 | n) && (n = (n + 0.5) | 0);
      var i = t[2];
      return (
        i != (0 | i) && (i = (i + 0.5) | 0),
        'rgba(' +
          e +
          ',' +
          n +
          ',' +
          i +
          ',' +
          (void 0 === t[3] ? 1 : t[3]) +
          ')'
      );
    }),
    (I.colorlike = {}),
    (I.colorlike.asColorLike = function (t) {
      return I.colorlike.isColorLike(t) ? t : I.color.asString(t);
    }),
    (I.colorlike.isColorLike = function (t) {
      return (
        'string' == typeof t ||
        t instanceof CanvasPattern ||
        t instanceof CanvasGradient
      );
    }),
    (I.css = {}),
    (I.css.CLASS_HIDDEN = 'ol-hidden'),
    (I.css.CLASS_SELECTABLE = 'ol-selectable'),
    (I.css.CLASS_UNSELECTABLE = 'ol-unselectable'),
    (I.css.CLASS_UNSUPPORTED = 'ol-unsupported'),
    (I.css.CLASS_CONTROL = 'ol-control'),
    (I.css.getFontFamilies = (function () {
      var t,
        e = {};
      return function (n) {
        if ((t || (t = document.createElement('div').style), !(n in e))) {
          t.font = n;
          var i = t.fontFamily;
          if (((t.font = ''), !i)) return null;
          e[n] = i.split(/,\s?/);
        }
        return e[n];
      };
    })()),
    (I.dom = {}),
    (I.dom.createCanvasContext2D = function (t, e) {
      return (
        t && e ? new OffscreenCanvas(t, e) : new OffscreenCanvas(1, 1)
      ).getContext('2d');
    }),
    (I.dom.outerWidth = function (t) {
      var e = t.offsetWidth,
        n = getComputedStyle(t);
      return (e += parseInt(n.marginLeft, 10) + parseInt(n.marginRight, 10));
    }),
    (I.dom.outerHeight = function (t) {
      var e = t.offsetHeight,
        n = getComputedStyle(t);
      return (e += parseInt(n.marginTop, 10) + parseInt(n.marginBottom, 10));
    }),
    (I.dom.replaceNode = function (t, e) {
      var n = e.parentNode;
      n && n.replaceChild(t, e);
    }),
    (I.dom.removeNode = function (t) {
      return t && t.parentNode ? t.parentNode.removeChild(t) : null;
    }),
    (I.dom.removeChildren = function (t) {
      for (; t.lastChild; ) t.removeChild(t.lastChild);
    }),
    (I.extent = {}),
    (I.extent.Corner = {
      BOTTOM_LEFT: 'bottom-left',
      BOTTOM_RIGHT: 'bottom-right',
      TOP_LEFT: 'top-left',
      TOP_RIGHT: 'top-right',
    }),
    (I.extent.Relationship = {
      UNKNOWN: 0,
      INTERSECTING: 1,
      ABOVE: 2,
      RIGHT: 4,
      BELOW: 8,
      LEFT: 16,
    }),
    (I.extent.boundingExtent = function (t) {
      for (var e = I.extent.createEmpty(), n = 0, i = t.length; n < i; ++n)
        I.extent.extendCoordinate(e, t[n]);
      return e;
    }),
    (I.extent.boundingExtentXYs_ = function (t, e, n) {
      var i = Math.min.apply(null, t),
        r = Math.min.apply(null, e),
        o = Math.max.apply(null, t),
        s = Math.max.apply(null, e);
      return I.extent.createOrUpdate(i, r, o, s, n);
    }),
    (I.extent.buffer = function (t, e, n) {
      return n
        ? ((n[0] = t[0] - e),
          (n[1] = t[1] - e),
          (n[2] = t[2] + e),
          (n[3] = t[3] + e),
          n)
        : [t[0] - e, t[1] - e, t[2] + e, t[3] + e];
    }),
    (I.extent.clone = function (t, e) {
      return e
        ? ((e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e)
        : t.slice();
    }),
    (I.extent.closestSquaredDistanceXY = function (t, e, n) {
      var i, r;
      return (
        (i = e < t[0] ? t[0] - e : t[2] < e ? e - t[2] : 0) * i +
        (r = n < t[1] ? t[1] - n : t[3] < n ? n - t[3] : 0) * r
      );
    }),
    (I.extent.containsCoordinate = function (t, e) {
      return I.extent.containsXY(t, e[0], e[1]);
    }),
    (I.extent.containsExtent = function (t, e) {
      return t[0] <= e[0] && e[2] <= t[2] && t[1] <= e[1] && e[3] <= t[3];
    }),
    (I.extent.containsXY = function (t, e, n) {
      return t[0] <= e && e <= t[2] && t[1] <= n && n <= t[3];
    }),
    (I.extent.coordinateRelationship = function (t, e) {
      var n = t[0],
        i = t[1],
        r = t[2],
        o = t[3],
        s = e[0],
        a = e[1],
        l = I.extent.Relationship.UNKNOWN;
      return (
        s < n
          ? (l |= I.extent.Relationship.LEFT)
          : s > r && (l |= I.extent.Relationship.RIGHT),
        a < i
          ? (l |= I.extent.Relationship.BELOW)
          : a > o && (l |= I.extent.Relationship.ABOVE),
        l === I.extent.Relationship.UNKNOWN &&
          (l = I.extent.Relationship.INTERSECTING),
        l
      );
    }),
    (I.extent.createEmpty = function () {
      return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
    }),
    (I.extent.createOrUpdate = function (t, e, n, i, r) {
      return r
        ? ((r[0] = t), (r[1] = e), (r[2] = n), (r[3] = i), r)
        : [t, e, n, i];
    }),
    (I.extent.createOrUpdateEmpty = function (t) {
      return I.extent.createOrUpdate(1 / 0, 1 / 0, -1 / 0, -1 / 0, t);
    }),
    (I.extent.createOrUpdateFromCoordinate = function (t, e) {
      var n = t[0],
        i = t[1];
      return I.extent.createOrUpdate(n, i, n, i, e);
    }),
    (I.extent.createOrUpdateFromCoordinates = function (t, e) {
      var n = I.extent.createOrUpdateEmpty(e);
      return I.extent.extendCoordinates(n, t);
    }),
    (I.extent.createOrUpdateFromFlatCoordinates = function (t, e, n, i, r) {
      var o = I.extent.createOrUpdateEmpty(r);
      return I.extent.extendFlatCoordinates(o, t, e, n, i);
    }),
    (I.extent.createOrUpdateFromRings = function (t, e) {
      var n = I.extent.createOrUpdateEmpty(e);
      return I.extent.extendRings(n, t);
    }),
    (I.extent.equals = function (t, e) {
      return t[0] == e[0] && t[2] == e[2] && t[1] == e[1] && t[3] == e[3];
    }),
    (I.extent.extend = function (t, e) {
      return (
        e[0] < t[0] && (t[0] = e[0]),
        e[2] > t[2] && (t[2] = e[2]),
        e[1] < t[1] && (t[1] = e[1]),
        e[3] > t[3] && (t[3] = e[3]),
        t
      );
    }),
    (I.extent.extendCoordinate = function (t, e) {
      e[0] < t[0] && (t[0] = e[0]),
        e[0] > t[2] && (t[2] = e[0]),
        e[1] < t[1] && (t[1] = e[1]),
        e[1] > t[3] && (t[3] = e[1]);
    }),
    (I.extent.extendCoordinates = function (t, e) {
      var n, i;
      for (n = 0, i = e.length; n < i; ++n) I.extent.extendCoordinate(t, e[n]);
      return t;
    }),
    (I.extent.extendFlatCoordinates = function (t, e, n, i, r) {
      for (; n < i; n += r) I.extent.extendXY(t, e[n], e[n + 1]);
      return t;
    }),
    (I.extent.extendRings = function (t, e) {
      var n, i;
      for (n = 0, i = e.length; n < i; ++n) I.extent.extendCoordinates(t, e[n]);
      return t;
    }),
    (I.extent.extendXY = function (t, e, n) {
      (t[0] = Math.min(t[0], e)),
        (t[1] = Math.min(t[1], n)),
        (t[2] = Math.max(t[2], e)),
        (t[3] = Math.max(t[3], n));
    }),
    (I.extent.forEachCorner = function (t, e, n) {
      var i;
      return (i = e.call(n, I.extent.getBottomLeft(t))) ||
        (i = e.call(n, I.extent.getBottomRight(t))) ||
        (i = e.call(n, I.extent.getTopRight(t)))
        ? i
        : (i = e.call(n, I.extent.getTopLeft(t))) || !1;
    }),
    (I.extent.getArea = function (t) {
      var e = 0;
      return (
        I.extent.isEmpty(t) ||
          (e = I.extent.getWidth(t) * I.extent.getHeight(t)),
        e
      );
    }),
    (I.extent.getBottomLeft = function (t) {
      return [t[0], t[1]];
    }),
    (I.extent.getBottomRight = function (t) {
      return [t[2], t[1]];
    }),
    (I.extent.getCenter = function (t) {
      return [(t[0] + t[2]) / 2, (t[1] + t[3]) / 2];
    }),
    (I.extent.getCorner = function (t, e) {
      var n;
      return (
        e === I.extent.Corner.BOTTOM_LEFT
          ? (n = I.extent.getBottomLeft(t))
          : e === I.extent.Corner.BOTTOM_RIGHT
          ? (n = I.extent.getBottomRight(t))
          : e === I.extent.Corner.TOP_LEFT
          ? (n = I.extent.getTopLeft(t))
          : e === I.extent.Corner.TOP_RIGHT
          ? (n = I.extent.getTopRight(t))
          : I.asserts.assert(!1, 13),
        n
      );
    }),
    (I.extent.getEnlargedArea = function (t, e) {
      var n = Math.min(t[0], e[0]),
        i = Math.min(t[1], e[1]);
      return (Math.max(t[2], e[2]) - n) * (Math.max(t[3], e[3]) - i);
    }),
    (I.extent.getForViewAndSize = function (t, e, n, i, r) {
      var o = (e * i[0]) / 2,
        s = (e * i[1]) / 2,
        a = Math.cos(n),
        l = Math.sin(n),
        h = o * a,
        c = o * l,
        u = s * a,
        d = s * l,
        f = t[0],
        g = t[1],
        p = f - h + d,
        y = f - h - d,
        m = f + h - d,
        v = f + h + d,
        _ = g - c - u,
        S = g - c + u,
        x = g + c + u,
        C = g + c - u;
      return I.extent.createOrUpdate(
        Math.min(p, y, m, v),
        Math.min(_, S, x, C),
        Math.max(p, y, m, v),
        Math.max(_, S, x, C),
        r,
      );
    }),
    (I.extent.getHeight = function (t) {
      return t[3] - t[1];
    }),
    (I.extent.getIntersectionArea = function (t, e) {
      var n = I.extent.getIntersection(t, e);
      return I.extent.getArea(n);
    }),
    (I.extent.getIntersection = function (t, e, n) {
      var i = n || I.extent.createEmpty();
      return (
        I.extent.intersects(t, e) &&
          (t[0] > e[0] ? (i[0] = t[0]) : (i[0] = e[0]),
          t[1] > e[1] ? (i[1] = t[1]) : (i[1] = e[1]),
          t[2] < e[2] ? (i[2] = t[2]) : (i[2] = e[2]),
          t[3] < e[3] ? (i[3] = t[3]) : (i[3] = e[3])),
        i
      );
    }),
    (I.extent.getMargin = function (t) {
      return I.extent.getWidth(t) + I.extent.getHeight(t);
    }),
    (I.extent.getSize = function (t) {
      return [t[2] - t[0], t[3] - t[1]];
    }),
    (I.extent.getTopLeft = function (t) {
      return [t[0], t[3]];
    }),
    (I.extent.getTopRight = function (t) {
      return [t[2], t[3]];
    }),
    (I.extent.getWidth = function (t) {
      return t[2] - t[0];
    }),
    (I.extent.intersects = function (t, e) {
      return t[0] <= e[2] && t[2] >= e[0] && t[1] <= e[3] && t[3] >= e[1];
    }),
    (I.extent.isEmpty = function (t) {
      return t[2] < t[0] || t[3] < t[1];
    }),
    (I.extent.returnOrUpdate = function (t, e) {
      return e
        ? ((e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = t[3]), e)
        : t;
    }),
    (I.extent.scaleFromCenter = function (t, e) {
      var n = ((t[2] - t[0]) / 2) * (e - 1),
        i = ((t[3] - t[1]) / 2) * (e - 1);
      (t[0] -= n), (t[2] += n), (t[1] -= i), (t[3] += i);
    }),
    (I.extent.intersectsSegment = function (t, e, n) {
      var i = !1,
        r = I.extent.coordinateRelationship(t, e),
        o = I.extent.coordinateRelationship(t, n);
      if (
        r === I.extent.Relationship.INTERSECTING ||
        o === I.extent.Relationship.INTERSECTING
      )
        i = !0;
      else {
        var s,
          a,
          l = t[0],
          h = t[1],
          c = t[2],
          u = t[3],
          d = e[0],
          f = e[1],
          g = n[0],
          p = n[1],
          y = (p - f) / (g - d);
        o & I.extent.Relationship.ABOVE &&
          !(r & I.extent.Relationship.ABOVE) &&
          (i = (s = g - (p - u) / y) >= l && s <= c),
          i ||
            !(o & I.extent.Relationship.RIGHT) ||
            r & I.extent.Relationship.RIGHT ||
            (i = (a = p - (g - c) * y) >= h && a <= u),
          i ||
            !(o & I.extent.Relationship.BELOW) ||
            r & I.extent.Relationship.BELOW ||
            (i = (s = g - (p - h) / y) >= l && s <= c),
          i ||
            !(o & I.extent.Relationship.LEFT) ||
            r & I.extent.Relationship.LEFT ||
            (i = (a = p - (g - l) * y) >= h && a <= u);
      }
      return i;
    }),
    (I.extent.applyTransform = function (t, e, n) {
      var i = [t[0], t[1], t[0], t[3], t[2], t[1], t[2], t[3]];
      e(i, i, 2);
      var r = [i[0], i[2], i[4], i[6]],
        o = [i[1], i[3], i[5], i[7]];
      return I.extent.boundingExtentXYs_(r, o, n);
    }),
    (I.obj = {}),
    (I.obj.assign =
      'function' == typeof Object.assign
        ? Object.assign
        : function (t, e) {
            if (null == t)
              throw new TypeError('Cannot convert undefined or null to object');
            for (var n = Object(t), i = 1, r = arguments.length; i < r; ++i) {
              var o = arguments[i];
              if (null != o)
                for (var s in o) o.hasOwnProperty(s) && (n[s] = o[s]);
            }
            return n;
          }),
    (I.obj.clear = function (t) {
      for (var e in t) delete t[e];
    }),
    (I.obj.getValues = function (t) {
      var e = [];
      for (var n in t) e.push(t[n]);
      return e;
    }),
    (I.obj.isEmpty = function (t) {
      var e;
      for (e in t) return !1;
      return !e;
    }),
    (I.transform = {}),
    (I.transform.tmp_ = new Array(6)),
    (I.transform.create = function () {
      return [1, 0, 0, 1, 0, 0];
    }),
    (I.transform.reset = function (t) {
      return I.transform.set(t, 1, 0, 0, 1, 0, 0);
    }),
    (I.transform.multiply = function (t, e) {
      var n = t[0],
        i = t[1],
        r = t[2],
        o = t[3],
        s = t[4],
        a = t[5],
        l = e[0],
        h = e[1],
        c = e[2],
        u = e[3],
        d = e[4],
        f = e[5];
      return (
        (t[0] = n * l + r * h),
        (t[1] = i * l + o * h),
        (t[2] = n * c + r * u),
        (t[3] = i * c + o * u),
        (t[4] = n * d + r * f + s),
        (t[5] = i * d + o * f + a),
        t
      );
    }),
    (I.transform.set = function (t, e, n, i, r, o, s) {
      return (
        (t[0] = e),
        (t[1] = n),
        (t[2] = i),
        (t[3] = r),
        (t[4] = o),
        (t[5] = s),
        t
      );
    }),
    (I.transform.setFromArray = function (t, e) {
      return (
        (t[0] = e[0]),
        (t[1] = e[1]),
        (t[2] = e[2]),
        (t[3] = e[3]),
        (t[4] = e[4]),
        (t[5] = e[5]),
        t
      );
    }),
    (I.transform.apply = function (t, e) {
      var n = e[0],
        i = e[1];
      return (
        (e[0] = t[0] * n + t[2] * i + t[4]),
        (e[1] = t[1] * n + t[3] * i + t[5]),
        e
      );
    }),
    (I.transform.rotate = function (t, e) {
      var n = Math.cos(e),
        i = Math.sin(e);
      return I.transform.multiply(
        t,
        I.transform.set(I.transform.tmp_, n, i, -i, n, 0, 0),
      );
    }),
    (I.transform.scale = function (t, e, n) {
      return I.transform.multiply(
        t,
        I.transform.set(I.transform.tmp_, e, 0, 0, n, 0, 0),
      );
    }),
    (I.transform.translate = function (t, e, n) {
      return I.transform.multiply(
        t,
        I.transform.set(I.transform.tmp_, 1, 0, 0, 1, e, n),
      );
    }),
    (I.transform.compose = function (t, e, n, i, r, o, s, a) {
      var l = Math.sin(o),
        h = Math.cos(o);
      return (
        (t[0] = i * h),
        (t[1] = r * l),
        (t[2] = -i * l),
        (t[3] = r * h),
        (t[4] = s * i * h - a * i * l + e),
        (t[5] = s * r * l + a * r * h + n),
        t
      );
    }),
    (I.transform.invert = function (t) {
      var e = I.transform.determinant(t),
        n = t[0],
        i = t[1],
        r = t[2],
        o = t[3],
        s = t[4],
        a = t[5];
      return (
        (t[0] = o / e),
        (t[1] = -i / e),
        (t[2] = -r / e),
        (t[3] = n / e),
        (t[4] = (r * a - o * s) / e),
        (t[5] = -(n * a - i * s) / e),
        t
      );
    }),
    (I.transform.determinant = function (t) {
      return t[0] * t[3] - t[1] * t[2];
    }),
    (I.geom = {}),
    (I.geom.flat = {}),
    (I.geom.flat.center = {}),
    (I.geom.flat.reverse = {}),
    (I.geom.flat.orient = {}),
    (I.geom.flat.transform = {}),
    (I.geom.flat.transform.transform2D = function (t, e, n, i, r, o) {
      var s,
        a = o || [],
        l = 0;
      for (s = e; s < n; s += i) {
        var h = t[s],
          c = t[s + 1];
        (a[l++] = r[0] * h + r[2] * c + r[4]),
          (a[l++] = r[1] * h + r[3] * c + r[5]);
      }
      return o && a.length != l && (a.length = l), a;
    }),
    (I.geom.flat.transform.rotate = function (t, e, n, i, r, o, s) {
      for (
        var a = s || [],
          l = Math.cos(r),
          h = Math.sin(r),
          c = o[0],
          u = o[1],
          d = 0,
          f = e;
        f < n;
        f += i
      ) {
        var g = t[f] - c,
          p = t[f + 1] - u;
        (a[d++] = c + g * l - p * h), (a[d++] = u + g * h + p * l);
        for (var y = f + 2; y < f + i; ++y) a[d++] = t[y];
      }
      return s && a.length != d && (a.length = d), a;
    }),
    (I.geom.flat.transform.scale = function (t, e, n, i, r, o, s, a) {
      for (var l = a || [], h = s[0], c = s[1], u = 0, d = e; d < n; d += i) {
        var f = t[d] - h,
          g = t[d + 1] - c;
        (l[u++] = h + r * f), (l[u++] = c + o * g);
        for (var p = d + 2; p < d + i; ++p) l[u++] = t[p];
      }
      return a && l.length != u && (l.length = u), l;
    }),
    (I.geom.GeometryLayout = {
      XY: 'XY',
      XYZ: 'XYZ',
      XYM: 'XYM',
      XYZM: 'XYZM',
    }),
    (I.geom.flat.reverse.coordinates = function (t, e, n, i) {
      for (; e < n - i; ) {
        var r;
        for (r = 0; r < i; ++r) {
          var o = t[e + r];
          (t[e + r] = t[n - i + r]), (t[n - i + r] = o);
        }
        (e += i), (n -= i);
      }
    }),
    (I.geom.flat.orient.linearRingIsClockwise = function (t, e, n, i) {
      for (var r = 0, o = t[n - i], s = t[n - i + 1]; e < n; e += i) {
        var a = t[e],
          l = t[e + 1];
        (r += (a - o) * (l + s)), (o = a), (s = l);
      }
      return r > 0;
    }),
    (I.geom.flat.orient.linearRingsAreOriented = function (t, e, n, i, r) {
      var o,
        s,
        a = void 0 !== r && r;
      for (o = 0, s = n.length; o < s; ++o) {
        var l = n[o],
          h = I.geom.flat.orient.linearRingIsClockwise(t, e, l, i);
        if (0 === o) {
          if ((a && h) || (!a && !h)) return !1;
        } else if ((a && !h) || (!a && h)) return !1;
        e = l;
      }
      return !0;
    }),
    (I.geom.flat.orient.linearRingssAreOriented = function (t, e, n, i, r) {
      var o, s;
      for (o = 0, s = n.length; o < s; ++o)
        if (!I.geom.flat.orient.linearRingsAreOriented(t, e, n[o], i, r))
          return !1;
      return !0;
    }),
    (I.geom.flat.orient.orientLinearRings = function (t, e, n, i, r) {
      var o,
        s,
        a = void 0 !== r && r;
      for (o = 0, s = n.length; o < s; ++o) {
        var l = n[o],
          h = I.geom.flat.orient.linearRingIsClockwise(t, e, l, i);
        (0 === o ? (a && h) || (!a && !h) : (a && !h) || (!a && h)) &&
          I.geom.flat.reverse.coordinates(t, e, l, i),
          (e = l);
      }
      return e;
    }),
    (I.geom.flat.orient.orientLinearRingss = function (t, e, n, i, r) {
      var o, s;
      for (o = 0, s = n.length; o < s; ++o)
        e = I.geom.flat.orient.orientLinearRings(t, e, n[o], i, r);
      return e;
    }),
    (I.geom.flat.simplify = {}),
    (I.geom.flat.simplify.lineString = function (t, e, n, i, r, o, s) {
      var a = void 0 !== s ? s : [];
      return (
        o ||
          ((n = I.geom.flat.simplify.radialDistance(t, e, n, i, r, a, 0)),
          (t = a),
          (e = 0),
          (i = 2)),
        (a.length = I.geom.flat.simplify.douglasPeucker(t, e, n, i, r, a, 0)),
        a
      );
    }),
    (I.geom.flat.simplify.douglasPeucker = function (t, e, n, i, r, o, s) {
      var a = (n - e) / i;
      if (a < 3) {
        for (; e < n; e += i) (o[s++] = t[e]), (o[s++] = t[e + 1]);
        return s;
      }
      var l = new Array(a);
      (l[0] = 1), (l[a - 1] = 1);
      for (var h, c = [e, n - i], u = 0; c.length > 0; ) {
        var d = c.pop(),
          f = c.pop(),
          g = 0,
          p = t[f],
          y = t[f + 1],
          m = t[d],
          v = t[d + 1];
        for (h = f + i; h < d; h += i) {
          var _ = t[h],
            S = t[h + 1],
            x = I.math.squaredSegmentDistance(_, S, p, y, m, v);
          x > g && ((u = h), (g = x));
        }
        g > r &&
          ((l[(u - e) / i] = 1),
          f + i < u && c.push(f, u),
          u + i < d && c.push(u, d));
      }
      for (h = 0; h < a; ++h)
        l[h] && ((o[s++] = t[e + h * i]), (o[s++] = t[e + h * i + 1]));
      return s;
    }),
    (I.geom.flat.simplify.douglasPeuckers = function (t, e, n, i, r, o, s, a) {
      var l, h;
      for (l = 0, h = n.length; l < h; ++l) {
        var c = n[l];
        (s = I.geom.flat.simplify.douglasPeucker(t, e, c, i, r, o, s)),
          a.push(s),
          (e = c);
      }
      return s;
    }),
    (I.geom.flat.simplify.douglasPeuckerss = function (t, e, n, i, r, o, s, a) {
      var l, h;
      for (l = 0, h = n.length; l < h; ++l) {
        var c = n[l],
          u = [];
        (s = I.geom.flat.simplify.douglasPeuckers(t, e, c, i, r, o, s, u)),
          a.push(u),
          (e = c[c.length - 1]);
      }
      return s;
    }),
    (I.geom.flat.simplify.radialDistance = function (t, e, n, i, r, o, s) {
      if (n <= e + i) {
        for (; e < n; e += i) (o[s++] = t[e]), (o[s++] = t[e + 1]);
        return s;
      }
      var a = t[e],
        l = t[e + 1];
      (o[s++] = a), (o[s++] = l);
      var h = a,
        c = l;
      for (e += i; e < n; e += i)
        (h = t[e]),
          (c = t[e + 1]),
          I.math.squaredDistance(a, l, h, c) > r &&
            ((o[s++] = h), (o[s++] = c), (a = h), (l = c));
      return (h == a && c == l) || ((o[s++] = h), (o[s++] = c)), s;
    }),
    (I.geom.flat.simplify.snap = function (t, e) {
      return e * Math.round(t / e);
    }),
    (I.geom.flat.simplify.quantize = function (t, e, n, i, r, o, s) {
      if (e == n) return s;
      var a,
        l,
        h = I.geom.flat.simplify.snap(t[e], r),
        c = I.geom.flat.simplify.snap(t[e + 1], r);
      (e += i), (o[s++] = h), (o[s++] = c);
      do {
        if (
          ((a = I.geom.flat.simplify.snap(t[e], r)),
          (l = I.geom.flat.simplify.snap(t[e + 1], r)),
          (e += i) == n)
        )
          return (o[s++] = a), (o[s++] = l), s;
      } while (a == h && l == c);
      for (; e < n; ) {
        var u, d;
        if (
          ((u = I.geom.flat.simplify.snap(t[e], r)),
          (d = I.geom.flat.simplify.snap(t[e + 1], r)),
          (e += i),
          u != a || d != l)
        ) {
          var f = a - h,
            g = l - c,
            p = u - h,
            y = d - c;
          f * y == g * p &&
          ((f < 0 && p < f) || f == p || (f > 0 && p > f)) &&
          ((g < 0 && y < g) || g == y || (g > 0 && y > g))
            ? ((a = u), (l = d))
            : ((o[s++] = a), (o[s++] = l), (h = a), (c = l), (a = u), (l = d));
        }
      }
      return (o[s++] = a), (o[s++] = l), s;
    }),
    (I.geom.flat.simplify.quantizes = function (t, e, n, i, r, o, s, a) {
      var l, h;
      for (l = 0, h = n.length; l < h; ++l) {
        var c = n[l];
        (s = I.geom.flat.simplify.quantize(t, e, c, i, r, o, s)),
          a.push(s),
          (e = c);
      }
      return s;
    }),
    (I.geom.flat.simplify.quantizess = function (t, e, n, i, r, o, s, a) {
      var l, h;
      for (l = 0, h = n.length; l < h; ++l) {
        var c = n[l],
          u = [];
        (s = I.geom.flat.simplify.quantizes(t, e, c, i, r, o, s, u)),
          a.push(u),
          (e = c[c.length - 1]);
      }
      return s;
    }),
    (I.geom.GeometryType = {
      POINT: 'Point',
      LINE_STRING: 'LineString',
      LINEAR_RING: 'LinearRing',
      POLYGON: 'Polygon',
      MULTI_POINT: 'MultiPoint',
      MULTI_LINE_STRING: 'MultiLineString',
      MULTI_POLYGON: 'MultiPolygon',
      GEOMETRY_COLLECTION: 'GeometryCollection',
      CIRCLE: 'Circle',
    }),
    (I.geom.Geometry = function () {
      I.Object.call(this),
        (this.extent_ = I.extent.createEmpty()),
        (this.extentRevision_ = -1),
        (this.simplifiedGeometryCache = {}),
        (this.simplifiedGeometryMaxMinSquaredTolerance = 0),
        (this.simplifiedGeometryRevision = 0),
        (this.tmpTransform_ = I.transform.create());
    }),
    I.inherits(I.geom.Geometry, I.Object),
    (I.geom.Geometry.prototype.clone = function () {}),
    (I.geom.Geometry.prototype.closestPointXY = function (t, e, n, i) {}),
    (I.geom.Geometry.prototype.getClosestPoint = function (t, e) {
      var n = e || [NaN, NaN];
      return this.closestPointXY(t[0], t[1], n, 1 / 0), n;
    }),
    (I.geom.Geometry.prototype.intersectsCoordinate = function (t) {
      return this.containsXY(t[0], t[1]);
    }),
    (I.geom.Geometry.prototype.computeExtent = function (t) {}),
    (I.geom.Geometry.prototype.containsXY = I.functions.FALSE),
    (I.geom.Geometry.prototype.getExtent = function (t) {
      return (
        this.extentRevision_ != this.getRevision() &&
          ((this.extent_ = this.computeExtent(this.extent_)),
          (this.extentRevision_ = this.getRevision())),
        I.extent.returnOrUpdate(this.extent_, t)
      );
    }),
    (I.geom.Geometry.prototype.rotate = function (t, e) {}),
    (I.geom.Geometry.prototype.scale = function (t, e, n) {}),
    (I.geom.Geometry.prototype.simplify = function (t) {
      return this.getSimplifiedGeometry(t * t);
    }),
    (I.geom.Geometry.prototype.getSimplifiedGeometry = function (t) {}),
    (I.geom.Geometry.prototype.getType = function () {}),
    (I.geom.Geometry.prototype.applyTransform = function (t) {}),
    (I.geom.Geometry.prototype.intersectsExtent = function (t) {}),
    (I.geom.Geometry.prototype.translate = function (t, e) {}),
    (I.geom.Geometry.prototype.transform = function (t, e) {
      var n = this.tmpTransform_,
        i =
          (t = I.proj.get(t)).getUnits() == I.proj.Units.TILE_PIXELS
            ? function (i, r, o) {
                var s = t.getExtent(),
                  a = t.getWorldExtent(),
                  l = I.extent.getHeight(a) / I.extent.getHeight(s);
                return (
                  I.transform.compose(n, a[0], a[3], l, -l, 0, 0, 0),
                  I.geom.flat.transform.transform2D(i, 0, i.length, o, n, r),
                  I.proj.getTransform(t, e)(i, r, o)
                );
              }
            : I.proj.getTransform(t, e);
      return this.applyTransform(i), this;
    }),
    (I.geom.SimpleGeometry = function () {
      I.geom.Geometry.call(this),
        (this.layout = I.geom.GeometryLayout.XY),
        (this.stride = 2),
        (this.flatCoordinates = null);
    }),
    I.inherits(I.geom.SimpleGeometry, I.geom.Geometry),
    (I.geom.SimpleGeometry.getLayoutForStride_ = function (t) {
      var e;
      return (
        2 == t
          ? (e = I.geom.GeometryLayout.XY)
          : 3 == t
          ? (e = I.geom.GeometryLayout.XYZ)
          : 4 == t && (e = I.geom.GeometryLayout.XYZM),
        e
      );
    }),
    (I.geom.SimpleGeometry.getStrideForLayout = function (t) {
      var e;
      return (
        t == I.geom.GeometryLayout.XY
          ? (e = 2)
          : t == I.geom.GeometryLayout.XYZ || t == I.geom.GeometryLayout.XYM
          ? (e = 3)
          : t == I.geom.GeometryLayout.XYZM && (e = 4),
        e
      );
    }),
    (I.geom.SimpleGeometry.prototype.containsXY = I.functions.FALSE),
    (I.geom.SimpleGeometry.prototype.computeExtent = function (t) {
      return I.extent.createOrUpdateFromFlatCoordinates(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        t,
      );
    }),
    (I.geom.SimpleGeometry.prototype.getCoordinates = function () {}),
    (I.geom.SimpleGeometry.prototype.getFirstCoordinate = function () {
      return this.flatCoordinates.slice(0, this.stride);
    }),
    (I.geom.SimpleGeometry.prototype.getFlatCoordinates = function () {
      return this.flatCoordinates;
    }),
    (I.geom.SimpleGeometry.prototype.getLastCoordinate = function () {
      return this.flatCoordinates.slice(
        this.flatCoordinates.length - this.stride,
      );
    }),
    (I.geom.SimpleGeometry.prototype.getLayout = function () {
      return this.layout;
    }),
    (I.geom.SimpleGeometry.prototype.getSimplifiedGeometry = function (t) {
      if (
        (this.simplifiedGeometryRevision != this.getRevision() &&
          (I.obj.clear(this.simplifiedGeometryCache),
          (this.simplifiedGeometryMaxMinSquaredTolerance = 0),
          (this.simplifiedGeometryRevision = this.getRevision())),
        t < 0 ||
          (0 !== this.simplifiedGeometryMaxMinSquaredTolerance &&
            t <= this.simplifiedGeometryMaxMinSquaredTolerance))
      )
        return this;
      var e = t.toString();
      if (this.simplifiedGeometryCache.hasOwnProperty(e))
        return this.simplifiedGeometryCache[e];
      var n = this.getSimplifiedGeometryInternal(t);
      return n.getFlatCoordinates().length < this.flatCoordinates.length
        ? ((this.simplifiedGeometryCache[e] = n), n)
        : ((this.simplifiedGeometryMaxMinSquaredTolerance = t), this);
    }),
    (I.geom.SimpleGeometry.prototype.getSimplifiedGeometryInternal = function (
      t,
    ) {
      return this;
    }),
    (I.geom.SimpleGeometry.prototype.getStride = function () {
      return this.stride;
    }),
    (I.geom.SimpleGeometry.prototype.setFlatCoordinatesInternal = function (
      t,
      e,
    ) {
      (this.stride = I.geom.SimpleGeometry.getStrideForLayout(t)),
        (this.layout = t),
        (this.flatCoordinates = e);
    }),
    (I.geom.SimpleGeometry.prototype.setCoordinates = function (t, e) {}),
    (I.geom.SimpleGeometry.prototype.setLayout = function (t, e, n) {
      var i;
      if (t) i = I.geom.SimpleGeometry.getStrideForLayout(t);
      else {
        var r;
        for (r = 0; r < n; ++r) {
          if (0 === e.length)
            return (
              (this.layout = I.geom.GeometryLayout.XY), void (this.stride = 2)
            );
          e = e[0];
        }
        (i = e.length), (t = I.geom.SimpleGeometry.getLayoutForStride_(i));
      }
      (this.layout = t), (this.stride = i);
    }),
    (I.geom.SimpleGeometry.prototype.applyTransform = function (t) {
      this.flatCoordinates &&
        (t(this.flatCoordinates, this.flatCoordinates, this.stride),
        this.changed());
    }),
    (I.geom.SimpleGeometry.prototype.rotate = function (t, e) {
      var n = this.getFlatCoordinates();
      if (n) {
        var i = this.getStride();
        I.geom.flat.transform.rotate(n, 0, n.length, i, t, e, n),
          this.changed();
      }
    }),
    (I.geom.SimpleGeometry.prototype.scale = function (t, e, n) {
      var i = e;
      void 0 === i && (i = t);
      var r = n;
      r || (r = I.extent.getCenter(this.getExtent()));
      var o = this.getFlatCoordinates();
      if (o) {
        var s = this.getStride();
        I.geom.flat.transform.scale(o, 0, o.length, s, t, i, r, o),
          this.changed();
      }
    }),
    (I.geom.SimpleGeometry.prototype.translate = function (t, e) {
      var n = this.getFlatCoordinates();
      if (n) {
        var i = this.getStride();
        I.geom.flat.transform.translate(n, 0, n.length, i, t, e, n),
          this.changed();
      }
    }),
    (I.geom.SimpleGeometry.transform2D = function (t, e, n) {
      var i = t.getFlatCoordinates();
      if (i) {
        var r = t.getStride();
        return I.geom.flat.transform.transform2D(i, 0, i.length, r, e, n);
      }
      return null;
    }),
    (I.geom.Polygon = function (t, e) {
      I.geom.SimpleGeometry.call(this),
        (this.ends_ = []),
        (this.flatInteriorPointRevision_ = -1),
        (this.flatInteriorPoint_ = null),
        (this.maxDelta_ = -1),
        (this.maxDeltaRevision_ = -1),
        (this.orientedRevision_ = -1),
        (this.orientedFlatCoordinates_ = null),
        this.setCoordinates(t, e);
    }),
    I.inherits(I.geom.Polygon, I.geom.SimpleGeometry),
    (I.geom.Polygon.prototype.appendLinearRing = function (t) {
      this.flatCoordinates
        ? I.array.extend(this.flatCoordinates, t.getFlatCoordinates())
        : (this.flatCoordinates = t.getFlatCoordinates().slice()),
        this.ends_.push(this.flatCoordinates.length),
        this.changed();
    }),
    (I.geom.Polygon.prototype.clone = function () {
      var t = new I.geom.Polygon(null);
      return (
        t.setFlatCoordinates(
          this.layout,
          this.flatCoordinates.slice(),
          this.ends_.slice(),
        ),
        t
      );
    }),
    (I.geom.Polygon.prototype.closestPointXY = function (t, e, n, i) {
      return i < I.extent.closestSquaredDistanceXY(this.getExtent(), t, e)
        ? i
        : (this.maxDeltaRevision_ != this.getRevision() &&
            ((this.maxDelta_ = Math.sqrt(
              I.geom.flat.closest.getsMaxSquaredDelta(
                this.flatCoordinates,
                0,
                this.ends_,
                this.stride,
                0,
              ),
            )),
            (this.maxDeltaRevision_ = this.getRevision())),
          I.geom.flat.closest.getsClosestPoint(
            this.flatCoordinates,
            0,
            this.ends_,
            this.stride,
            this.maxDelta_,
            !0,
            t,
            e,
            n,
            i,
          ));
    }),
    (I.geom.Polygon.prototype.containsXY = function (t, e) {
      return I.geom.flat.contains.linearRingsContainsXY(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        t,
        e,
      );
    }),
    (I.geom.Polygon.prototype.getArea = function () {
      return I.geom.flat.area.linearRings(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
      );
    }),
    (I.geom.Polygon.prototype.getCoordinates = function (t) {
      var e;
      return (
        void 0 !== t
          ? ((e = this.getOrientedFlatCoordinates().slice()),
            I.geom.flat.orient.orientLinearRings(
              e,
              0,
              this.ends_,
              this.stride,
              t,
            ))
          : (e = this.flatCoordinates),
        I.geom.flat.inflate.coordinatess(e, 0, this.ends_, this.stride)
      );
    }),
    (I.geom.Polygon.prototype.getEnds = function () {
      return this.ends_;
    }),
    (I.geom.Polygon.prototype.getFlatInteriorPoint = function () {
      if (this.flatInteriorPointRevision_ != this.getRevision()) {
        var t = I.extent.getCenter(this.getExtent());
        (this.flatInteriorPoint_ = I.geom.flat.interiorpoint.linearRings(
          this.getOrientedFlatCoordinates(),
          0,
          this.ends_,
          this.stride,
          t,
          0,
        )),
          (this.flatInteriorPointRevision_ = this.getRevision());
      }
      return this.flatInteriorPoint_;
    }),
    (I.geom.Polygon.prototype.getInteriorPoint = function () {
      return new I.geom.Point(
        this.getFlatInteriorPoint(),
        I.geom.GeometryLayout.XYM,
      );
    }),
    (I.geom.Polygon.prototype.getLinearRingCount = function () {
      return this.ends_.length;
    }),
    (I.geom.Polygon.prototype.getLinearRing = function (t) {
      if (t < 0 || this.ends_.length <= t) return null;
      var e = new I.geom.LinearRing(null);
      return (
        e.setFlatCoordinates(
          this.layout,
          this.flatCoordinates.slice(
            0 === t ? 0 : this.ends_[t - 1],
            this.ends_[t],
          ),
        ),
        e
      );
    }),
    (I.geom.Polygon.prototype.getLinearRings = function () {
      var t,
        e,
        n = this.layout,
        i = this.flatCoordinates,
        r = this.ends_,
        o = [],
        s = 0;
      for (t = 0, e = r.length; t < e; ++t) {
        var a = r[t],
          l = new I.geom.LinearRing(null);
        l.setFlatCoordinates(n, i.slice(s, a)), o.push(l), (s = a);
      }
      return o;
    }),
    (I.geom.Polygon.prototype.getOrientedFlatCoordinates = function () {
      if (this.orientedRevision_ != this.getRevision()) {
        var t = this.flatCoordinates;
        I.geom.flat.orient.linearRingsAreOriented(t, 0, this.ends_, this.stride)
          ? (this.orientedFlatCoordinates_ = t)
          : ((this.orientedFlatCoordinates_ = t.slice()),
            (this.orientedFlatCoordinates_.length =
              I.geom.flat.orient.orientLinearRings(
                this.orientedFlatCoordinates_,
                0,
                this.ends_,
                this.stride,
              ))),
          (this.orientedRevision_ = this.getRevision());
      }
      return this.orientedFlatCoordinates_;
    }),
    (I.geom.Polygon.prototype.getSimplifiedGeometryInternal = function (t) {
      var e = [],
        n = [];
      e.length = I.geom.flat.simplify.quantizes(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        Math.sqrt(t),
        e,
        0,
        n,
      );
      var i = new I.geom.Polygon(null);
      return i.setFlatCoordinates(I.geom.GeometryLayout.XY, e, n), i;
    }),
    (I.geom.Polygon.prototype.getType = function () {
      return I.geom.GeometryType.POLYGON;
    }),
    (I.geom.Polygon.prototype.intersectsExtent = function (t) {
      return I.geom.flat.intersectsextent.linearRings(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        t,
      );
    }),
    (I.geom.Polygon.prototype.setCoordinates = function (t, e) {
      if (t) {
        this.setLayout(e, t, 2),
          this.flatCoordinates || (this.flatCoordinates = []);
        var n = I.geom.flat.deflate.coordinatess(
          this.flatCoordinates,
          0,
          t,
          this.stride,
          this.ends_,
        );
        this.flatCoordinates.length = 0 === n.length ? 0 : n[n.length - 1];
      } else
        this.setFlatCoordinates(I.geom.GeometryLayout.XY, null, this.ends_);
    }),
    (I.geom.Polygon.prototype.setFlatCoordinates = function (t, e, n) {
      this.setFlatCoordinatesInternal(t, e), (this.ends_ = n);
    }),
    (I.geom.Polygon.circular = function (t, e, n, i) {
      var r,
        o = i || 32,
        s = [];
      for (r = 0; r < o; ++r)
        I.array.extend(s, t.offset(e, n, (2 * Math.PI * r) / o));
      s.push(s[0], s[1]);
      var a = new I.geom.Polygon(null);
      return a.setFlatCoordinates(I.geom.GeometryLayout.XY, s, [s.length]), a;
    }),
    (I.geom.Polygon.fromExtent = function (t) {
      var e = t[0],
        n = t[1],
        i = t[2],
        r = t[3],
        o = [e, n, e, r, i, r, i, n, e, n],
        s = new I.geom.Polygon(null);
      return s.setFlatCoordinates(I.geom.GeometryLayout.XY, o, [o.length]), s;
    }),
    (I.geom.Polygon.fromCircle = function (t, e, n) {
      for (
        var i = e || 32,
          r = t.getStride(),
          o = t.getLayout(),
          s = new I.geom.Polygon(null, o),
          a = r * (i + 1),
          l = new Array(a),
          h = 0;
        h < a;
        h++
      )
        l[h] = 0;
      var c = [l.length];
      return (
        s.setFlatCoordinates(o, l, c),
        I.geom.Polygon.makeRegular(s, t.getCenter(), t.getRadius(), n),
        s
      );
    }),
    (I.geom.Polygon.makeRegular = function (t, e, n, i) {
      for (
        var r,
          o,
          s = t.getFlatCoordinates(),
          a = t.getLayout(),
          l = t.getStride(),
          h = t.getEnds(),
          c = s.length / l - 1,
          u = i || 0,
          d = 0;
        d <= c;
        ++d
      )
        (o = d * l),
          (r = u + (2 * I.math.modulo(d, c) * Math.PI) / c),
          (s[o] = e[0] + n * Math.cos(r)),
          (s[o + 1] = e[1] + n * Math.sin(r));
      t.setFlatCoordinates(a, s, h);
    }),
    (I.geom.LineString = function (t, e) {
      I.geom.SimpleGeometry.call(this),
        (this.flatMidpoint_ = null),
        (this.flatMidpointRevision_ = -1),
        (this.maxDelta_ = -1),
        (this.maxDeltaRevision_ = -1),
        this.setCoordinates(t, e);
    }),
    I.inherits(I.geom.LineString, I.geom.SimpleGeometry),
    (I.geom.LineString.prototype.appendCoordinate = function (t) {
      this.flatCoordinates
        ? I.array.extend(this.flatCoordinates, t)
        : (this.flatCoordinates = t.slice()),
        this.changed();
    }),
    (I.geom.LineString.prototype.clone = function () {
      var t = new I.geom.LineString(null);
      return t.setFlatCoordinates(this.layout, this.flatCoordinates.slice()), t;
    }),
    (I.geom.LineString.prototype.closestPointXY = function (t, e, n, i) {
      return i < I.extent.closestSquaredDistanceXY(this.getExtent(), t, e)
        ? i
        : (this.maxDeltaRevision_ != this.getRevision() &&
            ((this.maxDelta_ = Math.sqrt(
              I.geom.flat.closest.getMaxSquaredDelta(
                this.flatCoordinates,
                0,
                this.flatCoordinates.length,
                this.stride,
                0,
              ),
            )),
            (this.maxDeltaRevision_ = this.getRevision())),
          I.geom.flat.closest.getClosestPoint(
            this.flatCoordinates,
            0,
            this.flatCoordinates.length,
            this.stride,
            this.maxDelta_,
            !1,
            t,
            e,
            n,
            i,
          ));
    }),
    (I.geom.LineString.prototype.forEachSegment = function (t, e) {
      return I.geom.flat.segments.forEach(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        t,
        e,
      );
    }),
    (I.geom.LineString.prototype.getCoordinateAtM = function (t, e) {
      if (
        this.layout != I.geom.GeometryLayout.XYM &&
        this.layout != I.geom.GeometryLayout.XYZM
      )
        return null;
      var n = void 0 !== e && e;
      return I.geom.flat.interpolate.lineStringCoordinateAtM(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        t,
        n,
      );
    }),
    (I.geom.LineString.prototype.getCoordinates = function () {
      return I.geom.flat.inflate.coordinates(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
      );
    }),
    (I.geom.LineString.prototype.getCoordinateAt = function (t, e) {
      return I.geom.flat.interpolate.lineString(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        t,
        e,
      );
    }),
    (I.geom.LineString.prototype.getLength = function () {
      return I.geom.flat.length.lineString(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
      );
    }),
    (I.geom.LineString.prototype.getFlatMidpoint = function () {
      return (
        this.flatMidpointRevision_ != this.getRevision() &&
          ((this.flatMidpoint_ = this.getCoordinateAt(0.5, this.flatMidpoint_)),
          (this.flatMidpointRevision_ = this.getRevision())),
        this.flatMidpoint_
      );
    }),
    (I.geom.LineString.prototype.getSimplifiedGeometryInternal = function (t) {
      var e = [];
      e.length = I.geom.flat.simplify.douglasPeucker(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        t,
        e,
        0,
      );
      var n = new I.geom.LineString(null);
      return n.setFlatCoordinates(I.geom.GeometryLayout.XY, e), n;
    }),
    (I.geom.LineString.prototype.getType = function () {
      return I.geom.GeometryType.LINE_STRING;
    }),
    (I.geom.LineString.prototype.intersectsExtent = function (t) {
      return I.geom.flat.intersectsextent.lineString(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        t,
      );
    }),
    (I.geom.LineString.prototype.setCoordinates = function (t, e) {
      t
        ? (this.setLayout(e, t, 1),
          this.flatCoordinates || (this.flatCoordinates = []),
          (this.flatCoordinates.length = I.geom.flat.deflate.coordinates(
            this.flatCoordinates,
            0,
            t,
            this.stride,
          )),
          this.changed())
        : this.setFlatCoordinates(I.geom.GeometryLayout.XY, null);
    }),
    (I.geom.LineString.prototype.setFlatCoordinates = function (t, e) {
      this.setFlatCoordinatesInternal(t, e), this.changed();
    }),
    (I.geom.Point = function (t, e) {
      I.geom.SimpleGeometry.call(this), this.setCoordinates(t, e);
    }),
    I.inherits(I.geom.Point, I.geom.SimpleGeometry),
    (I.geom.Point.prototype.clone = function () {
      var t = new I.geom.Point(null);
      return t.setFlatCoordinates(this.layout, this.flatCoordinates.slice()), t;
    }),
    (I.geom.Point.prototype.closestPointXY = function (t, e, n, i) {
      var r = this.flatCoordinates,
        o = I.math.squaredDistance(t, e, r[0], r[1]);
      if (o < i) {
        var s,
          a = this.stride;
        for (s = 0; s < a; ++s) n[s] = r[s];
        return (n.length = a), o;
      }
      return i;
    }),
    (I.geom.Point.prototype.getCoordinates = function () {
      return this.flatCoordinates ? this.flatCoordinates.slice() : [];
    }),
    (I.geom.Point.prototype.computeExtent = function (t) {
      return I.extent.createOrUpdateFromCoordinate(this.flatCoordinates, t);
    }),
    (I.geom.Point.prototype.getType = function () {
      return I.geom.GeometryType.POINT;
    }),
    (I.geom.Point.prototype.intersectsExtent = function (t) {
      return I.extent.containsXY(
        t,
        this.flatCoordinates[0],
        this.flatCoordinates[1],
      );
    }),
    (I.geom.Point.prototype.setCoordinates = function (t, e) {
      t
        ? (this.setLayout(e, t, 0),
          this.flatCoordinates || (this.flatCoordinates = []),
          (this.flatCoordinates.length = I.geom.flat.deflate.coordinate(
            this.flatCoordinates,
            0,
            t,
            this.stride,
          )),
          this.changed())
        : this.setFlatCoordinates(I.geom.GeometryLayout.XY, null);
    }),
    (I.geom.Point.prototype.setFlatCoordinates = function (t, e) {
      this.setFlatCoordinatesInternal(t, e), this.changed();
    }),
    (I.geom.MultiLineString = function (t, e) {
      I.geom.SimpleGeometry.call(this),
        (this.ends_ = []),
        (this.maxDelta_ = -1),
        (this.maxDeltaRevision_ = -1),
        this.setCoordinates(t, e);
    }),
    I.inherits(I.geom.MultiLineString, I.geom.SimpleGeometry),
    (I.geom.MultiLineString.prototype.appendLineString = function (t) {
      this.flatCoordinates
        ? I.array.extend(this.flatCoordinates, t.getFlatCoordinates().slice())
        : (this.flatCoordinates = t.getFlatCoordinates().slice()),
        this.ends_.push(this.flatCoordinates.length),
        this.changed();
    }),
    (I.geom.MultiLineString.prototype.clone = function () {
      var t = new I.geom.MultiLineString(null);
      return (
        t.setFlatCoordinates(
          this.layout,
          this.flatCoordinates.slice(),
          this.ends_.slice(),
        ),
        t
      );
    }),
    (I.geom.MultiLineString.prototype.closestPointXY = function (t, e, n, i) {
      return i < I.extent.closestSquaredDistanceXY(this.getExtent(), t, e)
        ? i
        : (this.maxDeltaRevision_ != this.getRevision() &&
            ((this.maxDelta_ = Math.sqrt(
              I.geom.flat.closest.getsMaxSquaredDelta(
                this.flatCoordinates,
                0,
                this.ends_,
                this.stride,
                0,
              ),
            )),
            (this.maxDeltaRevision_ = this.getRevision())),
          I.geom.flat.closest.getsClosestPoint(
            this.flatCoordinates,
            0,
            this.ends_,
            this.stride,
            this.maxDelta_,
            !1,
            t,
            e,
            n,
            i,
          ));
    }),
    (I.geom.MultiLineString.prototype.getCoordinateAtM = function (t, e, n) {
      if (
        (this.layout != I.geom.GeometryLayout.XYM &&
          this.layout != I.geom.GeometryLayout.XYZM) ||
        0 === this.flatCoordinates.length
      )
        return null;
      var i = void 0 !== e && e,
        r = void 0 !== n && n;
      return I.geom.flat.interpolate.lineStringsCoordinateAtM(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        t,
        i,
        r,
      );
    }),
    (I.geom.MultiLineString.prototype.getCoordinates = function () {
      return I.geom.flat.inflate.coordinatess(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
      );
    }),
    (I.geom.MultiLineString.prototype.getEnds = function () {
      return this.ends_;
    }),
    (I.geom.MultiLineString.prototype.getLineString = function (t) {
      if (t < 0 || this.ends_.length <= t) return null;
      var e = new I.geom.LineString(null);
      return (
        e.setFlatCoordinates(
          this.layout,
          this.flatCoordinates.slice(
            0 === t ? 0 : this.ends_[t - 1],
            this.ends_[t],
          ),
        ),
        e
      );
    }),
    (I.geom.MultiLineString.prototype.getLineStrings = function () {
      var t,
        e,
        n = this.flatCoordinates,
        i = this.ends_,
        r = this.layout,
        o = [],
        s = 0;
      for (t = 0, e = i.length; t < e; ++t) {
        var a = i[t],
          l = new I.geom.LineString(null);
        l.setFlatCoordinates(r, n.slice(s, a)), o.push(l), (s = a);
      }
      return o;
    }),
    (I.geom.MultiLineString.prototype.getFlatMidpoints = function () {
      var t,
        e,
        n = [],
        i = this.flatCoordinates,
        r = 0,
        o = this.ends_,
        s = this.stride;
      for (t = 0, e = o.length; t < e; ++t) {
        var a = o[t],
          l = I.geom.flat.interpolate.lineString(i, r, a, s, 0.5);
        I.array.extend(n, l), (r = a);
      }
      return n;
    }),
    (I.geom.MultiLineString.prototype.getSimplifiedGeometryInternal = function (
      t,
    ) {
      var e = [],
        n = [];
      e.length = I.geom.flat.simplify.douglasPeuckers(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        t,
        e,
        0,
        n,
      );
      var i = new I.geom.MultiLineString(null);
      return i.setFlatCoordinates(I.geom.GeometryLayout.XY, e, n), i;
    }),
    (I.geom.MultiLineString.prototype.getType = function () {
      return I.geom.GeometryType.MULTI_LINE_STRING;
    }),
    (I.geom.MultiLineString.prototype.intersectsExtent = function (t) {
      return I.geom.flat.intersectsextent.lineStrings(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        t,
      );
    }),
    (I.geom.MultiLineString.prototype.setCoordinates = function (t, e) {
      if (t) {
        this.setLayout(e, t, 2),
          this.flatCoordinates || (this.flatCoordinates = []);
        var n = I.geom.flat.deflate.coordinatess(
          this.flatCoordinates,
          0,
          t,
          this.stride,
          this.ends_,
        );
        (this.flatCoordinates.length = 0 === n.length ? 0 : n[n.length - 1]),
          this.changed();
      } else
        this.setFlatCoordinates(I.geom.GeometryLayout.XY, null, this.ends_);
    }),
    (I.geom.MultiLineString.prototype.setFlatCoordinates = function (t, e, n) {
      this.setFlatCoordinatesInternal(t, e), (this.ends_ = n), this.changed();
    }),
    (I.geom.MultiLineString.prototype.setLineStrings = function (t) {
      var e,
        n,
        i = this.getLayout(),
        r = [],
        o = [];
      for (e = 0, n = t.length; e < n; ++e) {
        var s = t[e];
        0 === e && (i = s.getLayout()),
          I.array.extend(r, s.getFlatCoordinates()),
          o.push(r.length);
      }
      this.setFlatCoordinates(i, r, o);
    }),
    (I.geom.MultiPoint = function (t, e) {
      I.geom.SimpleGeometry.call(this), this.setCoordinates(t, e);
    }),
    I.inherits(I.geom.MultiPoint, I.geom.SimpleGeometry),
    (I.geom.MultiPoint.prototype.appendPoint = function (t) {
      this.flatCoordinates
        ? I.array.extend(this.flatCoordinates, t.getFlatCoordinates())
        : (this.flatCoordinates = t.getFlatCoordinates().slice()),
        this.changed();
    }),
    (I.geom.MultiPoint.prototype.clone = function () {
      var t = new I.geom.MultiPoint(null);
      return t.setFlatCoordinates(this.layout, this.flatCoordinates.slice()), t;
    }),
    (I.geom.MultiPoint.prototype.closestPointXY = function (t, e, n, i) {
      if (i < I.extent.closestSquaredDistanceXY(this.getExtent(), t, e))
        return i;
      var r,
        o,
        s,
        a = this.flatCoordinates,
        l = this.stride;
      for (r = 0, o = a.length; r < o; r += l) {
        var h = I.math.squaredDistance(t, e, a[r], a[r + 1]);
        if (h < i) {
          for (i = h, s = 0; s < l; ++s) n[s] = a[r + s];
          n.length = l;
        }
      }
      return i;
    }),
    (I.geom.MultiPoint.prototype.getCoordinates = function () {
      return I.geom.flat.inflate.coordinates(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
      );
    }),
    (I.geom.MultiPoint.prototype.getPoint = function (t) {
      var e = this.flatCoordinates
        ? this.flatCoordinates.length / this.stride
        : 0;
      if (t < 0 || e <= t) return null;
      var n = new I.geom.Point(null);
      return (
        n.setFlatCoordinates(
          this.layout,
          this.flatCoordinates.slice(t * this.stride, (t + 1) * this.stride),
        ),
        n
      );
    }),
    (I.geom.MultiPoint.prototype.getPoints = function () {
      var t,
        e,
        n = this.flatCoordinates,
        i = this.layout,
        r = this.stride,
        o = [];
      for (t = 0, e = n.length; t < e; t += r) {
        var s = new I.geom.Point(null);
        s.setFlatCoordinates(i, n.slice(t, t + r)), o.push(s);
      }
      return o;
    }),
    (I.geom.MultiPoint.prototype.getType = function () {
      return I.geom.GeometryType.MULTI_POINT;
    }),
    (I.geom.MultiPoint.prototype.intersectsExtent = function (t) {
      var e,
        n,
        i,
        r,
        o = this.flatCoordinates,
        s = this.stride;
      for (e = 0, n = o.length; e < n; e += s)
        if (((i = o[e]), (r = o[e + 1]), I.extent.containsXY(t, i, r)))
          return !0;
      return !1;
    }),
    (I.geom.MultiPoint.prototype.setCoordinates = function (t, e) {
      t
        ? (this.setLayout(e, t, 1),
          this.flatCoordinates || (this.flatCoordinates = []),
          (this.flatCoordinates.length = I.geom.flat.deflate.coordinates(
            this.flatCoordinates,
            0,
            t,
            this.stride,
          )),
          this.changed())
        : this.setFlatCoordinates(I.geom.GeometryLayout.XY, null);
    }),
    (I.geom.MultiPoint.prototype.setFlatCoordinates = function (t, e) {
      this.setFlatCoordinatesInternal(t, e), this.changed();
    }),
    (I.geom.flat.center.linearRingss = {}),
    (I.geom.flat.center.linearRingss = function (t, e, n, i) {
      var r,
        o,
        s = [],
        a = I.extent.createEmpty();
      for (r = 0, o = n.length; r < o; ++r) {
        var l = n[r];
        (a = I.extent.createOrUpdateFromFlatCoordinates(t, e, l[0], i)),
          s.push((a[0] + a[2]) / 2, (a[1] + a[3]) / 2),
          (e = l[l.length - 1]);
      }
      return s;
    }),
    (I.geom.MultiPolygon = function (t, e) {
      I.geom.SimpleGeometry.call(this),
        (this.endss_ = []),
        (this.flatInteriorPointsRevision_ = -1),
        (this.flatInteriorPoints_ = null),
        (this.maxDelta_ = -1),
        (this.maxDeltaRevision_ = -1),
        (this.orientedRevision_ = -1),
        (this.orientedFlatCoordinates_ = null),
        this.setCoordinates(t, e);
    }),
    I.inherits(I.geom.MultiPolygon, I.geom.SimpleGeometry),
    (I.geom.MultiPolygon.prototype.appendPolygon = function (t) {
      var e;
      if (this.flatCoordinates) {
        var n,
          i,
          r = this.flatCoordinates.length;
        for (
          I.array.extend(this.flatCoordinates, t.getFlatCoordinates()),
            n = 0,
            i = (e = t.getEnds().slice()).length;
          n < i;
          ++n
        )
          e[n] += r;
      } else
        (this.flatCoordinates = t.getFlatCoordinates().slice()),
          (e = t.getEnds().slice()),
          this.endss_.push();
      this.endss_.push(e), this.changed();
    }),
    (I.geom.MultiPolygon.prototype.clone = function () {
      for (
        var t = new I.geom.MultiPolygon(null),
          e = this.endss_.length,
          n = new Array(e),
          i = 0;
        i < e;
        ++i
      )
        n[i] = this.endss_[i].slice();
      return (
        t.setFlatCoordinates(this.layout, this.flatCoordinates.slice(), n), t
      );
    }),
    (I.geom.MultiPolygon.prototype.closestPointXY = function (t, e, n, i) {
      return i < I.extent.closestSquaredDistanceXY(this.getExtent(), t, e)
        ? i
        : (this.maxDeltaRevision_ != this.getRevision() &&
            ((this.maxDelta_ = Math.sqrt(
              I.geom.flat.closest.getssMaxSquaredDelta(
                this.flatCoordinates,
                0,
                this.endss_,
                this.stride,
                0,
              ),
            )),
            (this.maxDeltaRevision_ = this.getRevision())),
          I.geom.flat.closest.getssClosestPoint(
            this.getOrientedFlatCoordinates(),
            0,
            this.endss_,
            this.stride,
            this.maxDelta_,
            !0,
            t,
            e,
            n,
            i,
          ));
    }),
    (I.geom.MultiPolygon.prototype.containsXY = function (t, e) {
      return I.geom.flat.contains.linearRingssContainsXY(
        this.getOrientedFlatCoordinates(),
        0,
        this.endss_,
        this.stride,
        t,
        e,
      );
    }),
    (I.geom.MultiPolygon.prototype.getArea = function () {
      return I.geom.flat.area.linearRingss(
        this.getOrientedFlatCoordinates(),
        0,
        this.endss_,
        this.stride,
      );
    }),
    (I.geom.MultiPolygon.prototype.getCoordinates = function (t) {
      var e;
      return (
        void 0 !== t
          ? ((e = this.getOrientedFlatCoordinates().slice()),
            I.geom.flat.orient.orientLinearRingss(
              e,
              0,
              this.endss_,
              this.stride,
              t,
            ))
          : (e = this.flatCoordinates),
        I.geom.flat.inflate.coordinatesss(e, 0, this.endss_, this.stride)
      );
    }),
    (I.geom.MultiPolygon.prototype.getEndss = function () {
      return this.endss_;
    }),
    (I.geom.MultiPolygon.prototype.getFlatInteriorPoints = function () {
      if (this.flatInteriorPointsRevision_ != this.getRevision()) {
        var t = I.geom.flat.center.linearRingss(
          this.flatCoordinates,
          0,
          this.endss_,
          this.stride,
        );
        (this.flatInteriorPoints_ = I.geom.flat.interiorpoint.linearRingss(
          this.getOrientedFlatCoordinates(),
          0,
          this.endss_,
          this.stride,
          t,
        )),
          (this.flatInteriorPointsRevision_ = this.getRevision());
      }
      return this.flatInteriorPoints_;
    }),
    (I.geom.MultiPolygon.prototype.getInteriorPoints = function () {
      var t = new I.geom.MultiPoint(null);
      return (
        t.setFlatCoordinates(
          I.geom.GeometryLayout.XYM,
          this.getFlatInteriorPoints().slice(),
        ),
        t
      );
    }),
    (I.geom.MultiPolygon.prototype.getOrientedFlatCoordinates = function () {
      if (this.orientedRevision_ != this.getRevision()) {
        var t = this.flatCoordinates;
        I.geom.flat.orient.linearRingssAreOriented(
          t,
          0,
          this.endss_,
          this.stride,
        )
          ? (this.orientedFlatCoordinates_ = t)
          : ((this.orientedFlatCoordinates_ = t.slice()),
            (this.orientedFlatCoordinates_.length =
              I.geom.flat.orient.orientLinearRingss(
                this.orientedFlatCoordinates_,
                0,
                this.endss_,
                this.stride,
              ))),
          (this.orientedRevision_ = this.getRevision());
      }
      return this.orientedFlatCoordinates_;
    }),
    (I.geom.MultiPolygon.prototype.getSimplifiedGeometryInternal = function (
      t,
    ) {
      var e = [],
        n = [];
      e.length = I.geom.flat.simplify.quantizess(
        this.flatCoordinates,
        0,
        this.endss_,
        this.stride,
        Math.sqrt(t),
        e,
        0,
        n,
      );
      var i = new I.geom.MultiPolygon(null);
      return i.setFlatCoordinates(I.geom.GeometryLayout.XY, e, n), i;
    }),
    (I.geom.MultiPolygon.prototype.getPolygon = function (t) {
      if (t < 0 || this.endss_.length <= t) return null;
      var e;
      if (0 === t) e = 0;
      else {
        var n = this.endss_[t - 1];
        e = n[n.length - 1];
      }
      var i,
        r,
        o = this.endss_[t].slice(),
        s = o[o.length - 1];
      if (0 !== e) for (i = 0, r = o.length; i < r; ++i) o[i] -= e;
      var a = new I.geom.Polygon(null);
      return (
        a.setFlatCoordinates(this.layout, this.flatCoordinates.slice(e, s), o),
        a
      );
    }),
    (I.geom.MultiPolygon.prototype.getPolygons = function () {
      var t,
        e,
        n,
        i,
        r = this.layout,
        o = this.flatCoordinates,
        s = this.endss_,
        a = [],
        l = 0;
      for (t = 0, e = s.length; t < e; ++t) {
        var h = s[t].slice(),
          c = h[h.length - 1];
        if (0 !== l) for (n = 0, i = h.length; n < i; ++n) h[n] -= l;
        var u = new I.geom.Polygon(null);
        u.setFlatCoordinates(r, o.slice(l, c), h), a.push(u), (l = c);
      }
      return a;
    }),
    (I.geom.MultiPolygon.prototype.getType = function () {
      return I.geom.GeometryType.MULTI_POLYGON;
    }),
    (I.geom.MultiPolygon.prototype.intersectsExtent = function (t) {
      return I.geom.flat.intersectsextent.linearRingss(
        this.getOrientedFlatCoordinates(),
        0,
        this.endss_,
        this.stride,
        t,
      );
    }),
    (I.geom.MultiPolygon.prototype.setCoordinates = function (t, e) {
      if (t) {
        this.setLayout(e, t, 3),
          this.flatCoordinates || (this.flatCoordinates = []);
        var n = I.geom.flat.deflate.coordinatesss(
          this.flatCoordinates,
          0,
          t,
          this.stride,
          this.endss_,
        );
        if (0 === n.length) this.flatCoordinates.length = 0;
        else {
          var i = n[n.length - 1];
          this.flatCoordinates.length = 0 === i.length ? 0 : i[i.length - 1];
        }
        this.changed();
      } else
        this.setFlatCoordinates(I.geom.GeometryLayout.XY, null, this.endss_);
    }),
    (I.geom.MultiPolygon.prototype.setFlatCoordinates = function (t, e, n) {
      this.setFlatCoordinatesInternal(t, e), (this.endss_ = n), this.changed();
    }),
    (I.geom.MultiPolygon.prototype.setPolygons = function (t) {
      var e,
        n,
        i,
        r = this.getLayout(),
        o = [],
        s = [];
      for (e = 0, n = t.length; e < n; ++e) {
        var a = t[e];
        0 === e && (r = a.getLayout());
        var l,
          h,
          c = o.length;
        for (l = 0, h = (i = a.getEnds()).length; l < h; ++l) i[l] += c;
        I.array.extend(o, a.getFlatCoordinates()), s.push(i);
      }
      this.setFlatCoordinates(r, o, s);
    }),
    (I.Feature = function (t) {
      if (
        (I.Object.call(this),
        (this.id_ = void 0),
        (this.geometryName_ = 'geometry'),
        (this.style_ = null),
        (this.styleFunction_ = void 0),
        (this.geometryChangeKey_ = null),
        void 0 !== t)
      )
        if (t instanceof I.geom.Geometry || !t) {
          var e = t;
          this.setGeometry(e);
        } else {
          var n = t;
          this.setProperties(n);
        }
    }),
    I.inherits(I.Feature, I.Object),
    (I.Feature.prototype.clone = function () {
      var t = new I.Feature(this.getProperties());
      t.setGeometryName(this.getGeometryName());
      var e = this.getGeometry();
      e && t.setGeometry(e.clone());
      var n = this.getStyle();
      return n && t.setStyle(n), t;
    }),
    (I.Feature.prototype.getGeometry = function () {
      return this.get(this.geometryName_);
    }),
    (I.Feature.prototype.getId = function () {
      return this.id_;
    }),
    (I.Feature.prototype.getGeometryName = function () {
      return this.geometryName_;
    }),
    (I.Feature.prototype.getStyle = function () {
      return this.style_;
    }),
    (I.Feature.prototype.getStyleFunction = function () {
      return this.styleFunction_;
    }),
    (I.Feature.prototype.handleGeometryChange_ = function () {
      this.changed();
    }),
    (I.Feature.prototype.handleGeometryChanged_ = function () {
      this.geometryChangeKey_ &&
        (I.events.unlistenByKey(this.geometryChangeKey_),
        (this.geometryChangeKey_ = null));
      var t = this.getGeometry();
      t &&
        (this.geometryChangeKey_ = I.events.listen(
          t,
          I.events.EventType.CHANGE,
          this.handleGeometryChange_,
          this,
        )),
        this.changed();
    }),
    (I.Feature.prototype.setGeometry = function (t) {
      this.set(this.geometryName_, t);
    }),
    (I.Feature.prototype.setStyle = function (t) {
      (this.style_ = t),
        (this.styleFunction_ = t ? I.Feature.createStyleFunction(t) : void 0),
        this.changed();
    }),
    (I.Feature.prototype.setId = function (t) {
      (this.id_ = t), this.changed();
    }),
    (I.Feature.prototype.setGeometryName = function (t) {
      I.events.unlisten(
        this,
        I.Object.getChangeEventType(this.geometryName_),
        this.handleGeometryChanged_,
        this,
      ),
        (this.geometryName_ = t),
        I.events.listen(
          this,
          I.Object.getChangeEventType(this.geometryName_),
          this.handleGeometryChanged_,
          this,
        ),
        this.handleGeometryChanged_();
    }),
    (I.Feature.createStyleFunction = function (t) {
      var e, n;
      'function' == typeof t
        ? (e =
            2 == t.length
              ? function (e) {
                  return t(this, e);
                }
              : t)
        : (Array.isArray(t)
            ? (n = t)
            : (I.asserts.assert(t instanceof I.style.Style, 41), (n = [t])),
          (e = function () {
            return n;
          }));
      return e;
    }),
    (I.format = {}),
    (I.format.Feature = function () {
      (this.defaultDataProjection = null),
        (this.defaultFeatureProjection = null);
    }),
    (I.format.Feature.prototype.getReadOptions = function (t, e) {
      var n;
      return (
        e &&
          (n = {
            dataProjection: e.dataProjection
              ? e.dataProjection
              : this.readProjection(t),
            featureProjection: e.featureProjection,
          }),
        this.adaptOptions(n)
      );
    }),
    (I.format.Feature.prototype.adaptOptions = function (t) {
      return I.obj.assign(
        {
          dataProjection: this.defaultDataProjection,
          featureProjection: this.defaultFeatureProjection,
        },
        t,
      );
    }),
    (I.format.Feature.prototype.getLastExtent = function () {
      return null;
    }),
    (I.format.Feature.prototype.getType = function () {}),
    (I.format.Feature.prototype.readFeature = function (t, e) {}),
    (I.format.Feature.prototype.readFeatures = function (t, e) {}),
    (I.format.Feature.prototype.readGeometry = function (t, e) {}),
    (I.format.Feature.prototype.readProjection = function (t) {}),
    (I.format.Feature.prototype.writeFeature = function (t, e) {}),
    (I.format.Feature.prototype.writeFeatures = function (t, e) {}),
    (I.format.Feature.prototype.writeGeometry = function (t, e) {}),
    (I.format.Feature.transformWithOptions = function (t, e, n) {
      var i;
      if (((i = t), e && n && void 0 !== n.decimals)) {
        var r = Math.pow(10, n.decimals);
        i === t && (i = i.clone()),
          i.applyTransform(function (t) {
            for (var e = 0, n = t.length; e < n; ++e)
              t[e] = Math.round(t[e] * r) / r;
            return t;
          });
      }
      return i;
    }),
    (I.format.MVT = function (t) {
      I.format.Feature.call(this);
      var e = t || {};
      (this.featureClass_ = e.featureClass ? e.featureClass : I.render.Feature),
        (this.geometryName_ = e.geometryName),
        (this.layerName_ = e.layerName ? e.layerName : 'layer'),
        (this.layers_ = e.layers ? e.layers : null),
        (this.extent_ = null);
    }),
    I.inherits(I.format.MVT, I.format.Feature),
    (I.format.MVT.pbfReaders_ = {
      layers: function (t, e, n) {
        if (3 === t) {
          var i = { keys: [], values: [], features: [] },
            r = n.readVarint() + n.pos;
          n.readFields(I.format.MVT.pbfReaders_.layer, i, r),
            (i.length = i.features.length),
            i.length && (e[i.name] = i);
        }
      },
      layer: function (t, e, n) {
        if (15 === t) e.version = n.readVarint();
        else if (1 === t) e.name = n.readString();
        else if (5 === t) e.extent = n.readVarint();
        else if (2 === t) e.features.push(n.pos);
        else if (3 === t) e.keys.push(n.readString());
        else if (4 === t) {
          for (var i = null, r = n.readVarint() + n.pos; n.pos < r; )
            i =
              1 === (t = n.readVarint() >> 3)
                ? n.readString()
                : 2 === t
                ? n.readFloat()
                : 3 === t
                ? n.readDouble()
                : 4 === t
                ? n.readVarint64()
                : 5 === t
                ? n.readVarint()
                : 6 === t
                ? n.readSVarint()
                : 7 === t
                ? n.readBoolean()
                : null;
          e.values.push(i);
        }
      },
      feature: function (t, e, n) {
        if (1 == t) e.id = n.readVarint();
        else if (2 == t)
          for (var i = n.readVarint() + n.pos; n.pos < i; ) {
            var r = e.layer.keys[n.readVarint()],
              o = e.layer.values[n.readVarint()];
            e.properties[r] = o;
          }
        else
          3 == t ? (e.type = n.readVarint()) : 4 == t && (e.geometry = n.pos);
      },
    }),
    (I.format.MVT.readRawFeature_ = function (t, e, n) {
      t.pos = e.features[n];
      var i = t.readVarint() + t.pos,
        r = { layer: e, type: 0, properties: {} };
      return t.readFields(I.format.MVT.pbfReaders_.feature, r, i), r;
    }),
    (I.format.MVT.readRawGeometry_ = function (t, e, n, i) {
      t.pos = e.geometry;
      for (
        var r = t.readVarint() + t.pos,
          o = 1,
          s = 0,
          a = 0,
          l = 0,
          h = 0,
          c = 0;
        t.pos < r;

      ) {
        if (!s) {
          var u = t.readVarint();
          (o = 7 & u), (s = u >> 3);
        }
        s--,
          1 === o || 2 === o
            ? ((a += t.readSVarint()),
              (l += t.readSVarint()),
              1 === o && h > c && (i.push(h), (c = h)),
              n.push(a, l),
              (h += 2))
            : 7 === o
            ? h > c && (n.push(n[c], n[c + 1]), (h += 2))
            : I.asserts.assert(!1, 59);
      }
      h > c && (i.push(h), (c = h));
    }),
    (I.format.MVT.getGeometryType_ = function (t, e) {
      var n;
      return (
        1 === t
          ? (n =
              1 === e
                ? I.geom.GeometryType.POINT
                : I.geom.GeometryType.MULTI_POINT)
          : 2 === t
          ? (n =
              1 === e
                ? I.geom.GeometryType.LINE_STRING
                : I.geom.GeometryType.MULTI_LINE_STRING)
          : 3 === t && (n = I.geom.GeometryType.POLYGON),
        n
      );
    }),
    (I.format.MVT.prototype.createFeature_ = function (t, e, n) {
      var i,
        r = e.type;
      if (0 === r) return null;
      var o = e.id,
        s = e.properties;
      s[this.layerName_] = e.layer.name;
      var a = [],
        l = [];
      I.format.MVT.readRawGeometry_(t, e, a, l);
      var h,
        c = I.format.MVT.getGeometryType_(r, l.length);
      if (c == I.geom.GeometryType.POLYGON) {
        for (var u = [], d = 0, f = 0, g = 0, p = l.length; g < p; ++g) {
          var y = l[g];
          I.geom.flat.orient.linearRingIsClockwise(a, d, y, 2) ||
            (u.push(l.slice(f, g + 1)), (f = g + 1)),
            (d = y);
        }
        u.length > 1
          ? ((l = u), (h = new I.geom.MultiPolygon(null)))
          : (h = new I.geom.Polygon(null));
      } else
        h =
          c === I.geom.GeometryType.POINT
            ? new I.geom.Point(null)
            : c === I.geom.GeometryType.LINE_STRING
            ? new I.geom.LineString(null)
            : c === I.geom.GeometryType.POLYGON
            ? new I.geom.Polygon(null)
            : c === I.geom.GeometryType.MULTI_POINT
            ? new I.geom.MultiPoint(null)
            : c === I.geom.GeometryType.MULTI_LINE_STRING
            ? new I.geom.MultiLineString(null)
            : null;
      h.setFlatCoordinates(I.geom.GeometryLayout.XY, a, l),
        (i = new this.featureClass_()),
        this.geometryName_ && i.setGeometryName(this.geometryName_);
      var m = I.format.Feature.transformWithOptions(
        h,
        !1,
        this.adaptOptions(n),
      );
      return i.setGeometry(m), i.setId(o), i.setProperties(s), i;
    }),
    (I.format.MVT.prototype.readFeatures = function (t, e) {
      var n,
        i = this.layers_,
        r = new s.Protobuf(t),
        o = r.readFields(I.format.MVT.pbfReaders_.layers, {}),
        a = [];
      for (var l in o)
        if (!i || -1 != i.indexOf(l)) {
          if (void 0 !== e) {
            var h = e.needSourceLayerNames;
            if (void 0 !== h && void 0 === h[l]) continue;
          }
          for (var c, u = 0, d = (n = o[l]).length; u < d; ++u)
            (c = I.format.MVT.readRawFeature_(r, n, u)),
              a.push(this.createFeature_(r, c));
          this.extent_ = n ? [0, 0, n.extent, n.extent] : null;
        }
      return a;
    }),
    (I.style = {}),
    (I.style.IconImageCache = function () {
      (this.cache_ = {}), (this.cacheSize_ = 0), (this.maxCacheSize_ = 32);
    }),
    (I.style.IconImageCache.getKey = function (t, e, n) {
      return e + ':' + t + ':' + (n ? I.color.asString(n) : 'null');
    }),
    (I.style.IconImageCache.prototype.clear = function () {
      (this.cache_ = {}), (this.cacheSize_ = 0);
    }),
    (I.style.IconImageCache.prototype.expire = function () {
      if (this.cacheSize_ > this.maxCacheSize_) {
        var t,
          e,
          n = 0;
        for (t in this.cache_)
          (e = this.cache_[t]),
            0 != (3 & n++) ||
              e.hasListener() ||
              (delete this.cache_[t], --this.cacheSize_);
      }
    }),
    (I.style.IconImageCache.prototype.get = function (t, e, n) {
      var i = I.style.IconImageCache.getKey(t, e, n);
      return i in this.cache_ ? this.cache_[i] : null;
    }),
    (I.style.IconImageCache.prototype.set = function (t, e, n, i) {
      var r = I.style.IconImageCache.getKey(t, e, n);
      (this.cache_[r] = i), ++this.cacheSize_;
    }),
    (I.style.IconImageCache.prototype.setSize = function (t) {
      (this.maxCacheSize_ = t), this.expire();
    }),
    (I.style.iconImageCache = new I.style.IconImageCache()),
    (I.style.Image = function (t) {
      (this.opacity_ = t.opacity),
        (this.rotateWithView_ = t.rotateWithView),
        (this.rotation_ = t.rotation),
        (this.scale_ = t.scale),
        (this.snapToPixel_ = t.snapToPixel);
    }),
    (I.style.Image.prototype.getOpacity = function () {
      return this.opacity_;
    }),
    (I.style.Image.prototype.getRotateWithView = function () {
      return this.rotateWithView_;
    }),
    (I.style.Image.prototype.getRotation = function () {
      return this.rotation_;
    }),
    (I.style.Image.prototype.getScale = function () {
      return this.scale_;
    }),
    (I.style.Image.prototype.getSnapToPixel = function () {
      return this.snapToPixel_;
    }),
    (I.style.Image.prototype.getAnchor = function () {}),
    (I.style.Image.prototype.getImage = function (t) {}),
    (I.style.Image.prototype.getHitDetectionImage = function (t) {}),
    (I.style.Image.prototype.getImageState = function () {}),
    (I.style.Image.prototype.getImageSize = function () {}),
    (I.style.Image.prototype.getHitDetectionImageSize = function () {}),
    (I.style.Image.prototype.getOrigin = function () {}),
    (I.style.Image.prototype.getSize = function () {}),
    (I.style.Image.prototype.setOpacity = function (t) {
      this.opacity_ = t;
    }),
    (I.style.Image.prototype.setRotateWithView = function (t) {
      this.rotateWithView_ = t;
    }),
    (I.style.Image.prototype.setRotation = function (t) {
      this.rotation_ = t;
    }),
    (I.style.Image.prototype.setScale = function (t) {
      this.scale_ = t;
    }),
    (I.style.Image.prototype.setSnapToPixel = function (t) {
      this.snapToPixel_ = t;
    }),
    (I.style.Image.prototype.listenImageChange = function (t, e) {}),
    (I.style.Image.prototype.load = function () {}),
    (I.style.Image.prototype.unlistenImageChange = function (t, e) {}),
    (I.style.RegularShape = function (t) {
      (this.checksums_ = null),
        (this.canvas_ = null),
        (this.hitDetectionCanvas_ = null),
        (this.fill_ = void 0 !== t.fill ? t.fill : null),
        (this.origin_ = [0, 0]),
        (this.points_ = t.points),
        (this.radius_ = void 0 !== t.radius ? t.radius : t.radius1),
        (this.radius2_ = t.radius2),
        (this.angle_ = void 0 !== t.angle ? t.angle : 0),
        (this.stroke_ = void 0 !== t.stroke ? t.stroke : null),
        (this.anchor_ = null),
        (this.size_ = null),
        (this.imageSize_ = null),
        (this.hitDetectionImageSize_ = null),
        (this.atlasManager_ = t.atlasManager),
        this.render_(this.atlasManager_);
      var e = void 0 === t.snapToPixel || t.snapToPixel,
        n = void 0 !== t.rotateWithView && t.rotateWithView;
      I.style.Image.call(this, {
        opacity: 1,
        rotateWithView: n,
        rotation: void 0 !== t.rotation ? t.rotation : 0,
        scale: 1,
        snapToPixel: e,
      });
    }),
    I.inherits(I.style.RegularShape, I.style.Image),
    (I.style.RegularShape.prototype.clone = function () {
      var t = new I.style.RegularShape({
        fill: this.getFill() ? this.getFill().clone() : void 0,
        points: this.getPoints(),
        radius: this.getRadius(),
        radius2: this.getRadius2(),
        angle: this.getAngle(),
        snapToPixel: this.getSnapToPixel(),
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        atlasManager: this.atlasManager_,
      });
      return t.setOpacity(this.getOpacity()), t.setScale(this.getScale()), t;
    }),
    (I.style.RegularShape.prototype.getAnchor = function () {
      return this.anchor_;
    }),
    (I.style.RegularShape.prototype.getAngle = function () {
      return this.angle_;
    }),
    (I.style.RegularShape.prototype.getFill = function () {
      return this.fill_;
    }),
    (I.style.RegularShape.prototype.getHitDetectionImage = function (t) {
      return this.hitDetectionCanvas_;
    }),
    (I.style.RegularShape.prototype.getImage = function (t) {
      return this.canvas_;
    }),
    (I.style.RegularShape.prototype.getImageSize = function () {
      return this.imageSize_;
    }),
    (I.style.RegularShape.prototype.getHitDetectionImageSize = function () {
      return this.hitDetectionImageSize_;
    }),
    (I.style.RegularShape.prototype.getImageState = function () {
      return I.ImageState.LOADED;
    }),
    (I.style.RegularShape.prototype.getOrigin = function () {
      return this.origin_;
    }),
    (I.style.RegularShape.prototype.getPoints = function () {
      return this.points_;
    }),
    (I.style.RegularShape.prototype.getRadius = function () {
      return this.radius_;
    }),
    (I.style.RegularShape.prototype.getRadius2 = function () {
      return this.radius2_;
    }),
    (I.style.RegularShape.prototype.getSize = function () {
      return this.size_;
    }),
    (I.style.RegularShape.prototype.getStroke = function () {
      return this.stroke_;
    }),
    (I.style.RegularShape.prototype.listenImageChange = function (t, e) {}),
    (I.style.RegularShape.prototype.load = function () {}),
    (I.style.RegularShape.prototype.unlistenImageChange = function (t, e) {}),
    (I.style.RegularShape.prototype.render_ = function (t) {
      var e,
        n,
        i = '',
        r = '',
        o = 0,
        s = null,
        a = 0,
        l = 0;
      this.stroke_ &&
        (null === (n = this.stroke_.getColor()) &&
          (n = I.render.canvas.defaultStrokeStyle),
        (n = I.colorlike.asColorLike(n)),
        void 0 === (l = this.stroke_.getWidth()) &&
          (l = I.render.canvas.defaultLineWidth),
        (s = this.stroke_.getLineDash()),
        (a = this.stroke_.getLineDashOffset()),
        I.has.CANVAS_LINE_DASH || ((s = null), (a = 0)),
        void 0 === (r = this.stroke_.getLineJoin()) &&
          (r = I.render.canvas.defaultLineJoin),
        void 0 === (i = this.stroke_.getLineCap()) &&
          (i = I.render.canvas.defaultLineCap),
        void 0 === (o = this.stroke_.getMiterLimit()) &&
          (o = I.render.canvas.defaultMiterLimit));
      var h = 2 * (this.radius_ + l) + 1,
        c = {
          strokeStyle: n,
          strokeWidth: l,
          size: h,
          lineCap: i,
          lineDash: s,
          lineDashOffset: a,
          lineJoin: r,
          miterLimit: o,
        };
      if (void 0 === t) {
        var u = I.dom.createCanvasContext2D(h, h);
        (this.canvas_ = u.canvas),
          (e = h = this.canvas_.width),
          this.draw_(c, u, 0, 0),
          this.createHitDetectionCanvas_(c);
      } else {
        h = Math.round(h);
        var d,
          f = !this.fill_;
        f && (d = this.drawHitDetectionCanvas_.bind(this, c));
        var g = this.getChecksum(),
          p = t.add(g, h, h, this.draw_.bind(this, c), d);
        (this.canvas_ = p.image),
          (this.origin_ = [p.offsetX, p.offsetY]),
          (e = p.image.width),
          f
            ? ((this.hitDetectionCanvas_ = p.hitImage),
              (this.hitDetectionImageSize_ = [
                p.hitImage.width,
                p.hitImage.height,
              ]))
            : ((this.hitDetectionCanvas_ = this.canvas_),
              (this.hitDetectionImageSize_ = [e, e]));
      }
      (this.anchor_ = [h / 2, h / 2]),
        (this.size_ = [h, h]),
        (this.imageSize_ = [e, e]);
    }),
    (I.style.RegularShape.prototype.draw_ = function (t, e, n, i) {
      var r, o, s;
      e.setTransform(1, 0, 0, 1, 0, 0), e.translate(n, i), e.beginPath();
      var a = this.points_;
      if (a === 1 / 0)
        e.arc(t.size / 2, t.size / 2, this.radius_, 0, 2 * Math.PI, !0);
      else {
        var l = void 0 !== this.radius2_ ? this.radius2_ : this.radius_;
        for (l !== this.radius_ && (a *= 2), r = 0; r <= a; r++)
          (o = (2 * r * Math.PI) / a - Math.PI / 2 + this.angle_),
            (s = r % 2 == 0 ? this.radius_ : l),
            e.lineTo(
              t.size / 2 + s * Math.cos(o),
              t.size / 2 + s * Math.sin(o),
            );
      }
      if (this.fill_) {
        var h = this.fill_.getColor();
        null === h && (h = I.render.canvas.defaultFillStyle),
          (e.fillStyle = I.colorlike.asColorLike(h)),
          e.fill();
      }
      this.stroke_ &&
        ((e.strokeStyle = t.strokeStyle),
        (e.lineWidth = t.strokeWidth),
        t.lineDash &&
          (e.setLineDash(t.lineDash), (e.lineDashOffset = t.lineDashOffset)),
        (e.lineCap = t.lineCap),
        (e.lineJoin = t.lineJoin),
        (e.miterLimit = t.miterLimit),
        e.stroke()),
        e.closePath();
    }),
    (I.style.RegularShape.prototype.createHitDetectionCanvas_ = function (t) {
      if (((this.hitDetectionImageSize_ = [t.size, t.size]), this.fill_))
        this.hitDetectionCanvas_ = this.canvas_;
      else {
        var e = I.dom.createCanvasContext2D(t.size, t.size);
        (this.hitDetectionCanvas_ = e.canvas),
          this.drawHitDetectionCanvas_(t, e, 0, 0);
      }
    }),
    (I.style.RegularShape.prototype.drawHitDetectionCanvas_ = function (
      t,
      e,
      n,
      i,
    ) {
      e.setTransform(1, 0, 0, 1, 0, 0), e.translate(n, i), e.beginPath();
      var r = this.points_;
      if (r === 1 / 0)
        e.arc(t.size / 2, t.size / 2, this.radius_, 0, 2 * Math.PI, !0);
      else {
        var o,
          s,
          a,
          l = void 0 !== this.radius2_ ? this.radius2_ : this.radius_;
        for (l !== this.radius_ && (r *= 2), o = 0; o <= r; o++)
          (a = (2 * o * Math.PI) / r - Math.PI / 2 + this.angle_),
            (s = o % 2 == 0 ? this.radius_ : l),
            e.lineTo(
              t.size / 2 + s * Math.cos(a),
              t.size / 2 + s * Math.sin(a),
            );
      }
      (e.fillStyle = I.render.canvas.defaultFillStyle),
        e.fill(),
        this.stroke_ &&
          ((e.strokeStyle = t.strokeStyle),
          (e.lineWidth = t.strokeWidth),
          t.lineDash &&
            (e.setLineDash(t.lineDash), (e.lineDashOffset = t.lineDashOffset)),
          e.stroke()),
        e.closePath();
    }),
    (I.style.RegularShape.prototype.getChecksum = function () {
      var t = this.stroke_ ? this.stroke_.getChecksum() : '-',
        e = this.fill_ ? this.fill_.getChecksum() : '-';
      if (
        !this.checksums_ ||
        t != this.checksums_[1] ||
        e != this.checksums_[2] ||
        this.radius_ != this.checksums_[3] ||
        this.radius2_ != this.checksums_[4] ||
        this.angle_ != this.checksums_[5] ||
        this.points_ != this.checksums_[6]
      ) {
        var n =
          'r' +
          t +
          e +
          (void 0 !== this.radius_ ? this.radius_.toString() : '-') +
          (void 0 !== this.radius2_ ? this.radius2_.toString() : '-') +
          (void 0 !== this.angle_ ? this.angle_.toString() : '-') +
          (void 0 !== this.points_ ? this.points_.toString() : '-');
        this.checksums_ = [
          n,
          t,
          e,
          this.radius_,
          this.radius2_,
          this.angle_,
          this.points_,
        ];
      }
      return this.checksums_[0];
    }),
    (I.style.Circle = function (t) {
      var e = t || {};
      I.style.RegularShape.call(this, {
        points: 1 / 0,
        fill: e.fill,
        radius: e.radius,
        snapToPixel: e.snapToPixel,
        stroke: e.stroke,
        atlasManager: e.atlasManager,
      });
    }),
    I.inherits(I.style.Circle, I.style.RegularShape),
    (I.style.Circle.prototype.clone = function () {
      var t = new I.style.Circle({
        fill: this.getFill() ? this.getFill().clone() : void 0,
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        radius: this.getRadius(),
        snapToPixel: this.getSnapToPixel(),
        atlasManager: this.atlasManager_,
      });
      return t.setOpacity(this.getOpacity()), t.setScale(this.getScale()), t;
    }),
    (I.style.Circle.prototype.setRadius = function (t) {
      (this.radius_ = t), this.render_(this.atlasManager_);
    }),
    (I.style.Fill = function (t) {
      var e = t || {};
      (this.color_ = void 0 !== e.color ? e.color : null),
        (this.checksum_ = void 0);
    }),
    (I.style.Fill.prototype.clone = function () {
      var t = this.getColor();
      return new I.style.Fill({
        color: t && t.slice ? t.slice() : t || void 0,
      });
    }),
    (I.style.Fill.prototype.getColor = function () {
      return this.color_;
    }),
    (I.style.Fill.prototype.setColor = function (t) {
      (this.color_ = t), (this.checksum_ = void 0);
    }),
    (I.style.Fill.prototype.getChecksum = function () {
      return (
        void 0 === this.checksum_ &&
          (this.color_ instanceof CanvasPattern ||
          this.color_ instanceof CanvasGradient
            ? (this.checksum_ = I.getUid(this.color_).toString())
            : (this.checksum_ =
                'f' + (this.color_ ? I.color.asString(this.color_) : '-'))),
        this.checksum_
      );
    }),
    (I.style.Stroke = function (t) {
      var e = t || {};
      (this.color_ = void 0 !== e.color ? e.color : null),
        (this.lineCap_ = e.lineCap),
        (this.lineDash_ = void 0 !== e.lineDash ? e.lineDash : null),
        (this.lineDashOffset_ = e.lineDashOffset),
        (this.lineJoin_ = e.lineJoin),
        (this.miterLimit_ = e.miterLimit),
        (this.width_ = e.width),
        (this.checksum_ = void 0);
    }),
    (I.style.Stroke.prototype.clone = function () {
      var t = this.getColor();
      return new I.style.Stroke({
        color: t && t.slice ? t.slice() : t || void 0,
        lineCap: this.getLineCap(),
        lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
        lineDashOffset: this.getLineDashOffset(),
        lineJoin: this.getLineJoin(),
        miterLimit: this.getMiterLimit(),
        width: this.getWidth(),
      });
    }),
    (I.style.Stroke.prototype.getColor = function () {
      return this.color_;
    }),
    (I.style.Stroke.prototype.getLineCap = function () {
      return this.lineCap_;
    }),
    (I.style.Stroke.prototype.getLineDash = function () {
      return this.lineDash_;
    }),
    (I.style.Stroke.prototype.getLineDashOffset = function () {
      return this.lineDashOffset_;
    }),
    (I.style.Stroke.prototype.getLineJoin = function () {
      return this.lineJoin_;
    }),
    (I.style.Stroke.prototype.getMiterLimit = function () {
      return this.miterLimit_;
    }),
    (I.style.Stroke.prototype.getWidth = function () {
      return this.width_;
    }),
    (I.style.Stroke.prototype.setColor = function (t) {
      (this.color_ = t), (this.checksum_ = void 0);
    }),
    (I.style.Stroke.prototype.setLineCap = function (t) {
      (this.lineCap_ = t), (this.checksum_ = void 0);
    }),
    (I.style.Stroke.prototype.setLineDash = function (t) {
      (this.lineDash_ = t), (this.checksum_ = void 0);
    }),
    (I.style.Stroke.prototype.setLineDashOffset = function (t) {
      (this.lineDashOffset_ = t), (this.checksum_ = void 0);
    }),
    (I.style.Stroke.prototype.setLineJoin = function (t) {
      (this.lineJoin_ = t), (this.checksum_ = void 0);
    }),
    (I.style.Stroke.prototype.setMiterLimit = function (t) {
      (this.miterLimit_ = t), (this.checksum_ = void 0);
    }),
    (I.style.Stroke.prototype.setWidth = function (t) {
      (this.width_ = t), (this.checksum_ = void 0);
    }),
    (I.style.Stroke.prototype.getChecksum = function () {
      return (
        void 0 === this.checksum_ &&
          ((this.checksum_ = 's'),
          this.color_
            ? 'string' == typeof this.color_
              ? (this.checksum_ += this.color_)
              : (this.checksum_ += I.getUid(this.color_).toString())
            : (this.checksum_ += '-'),
          (this.checksum_ +=
            ',' +
            (void 0 !== this.lineCap_ ? this.lineCap_.toString() : '-') +
            ',' +
            (this.lineDash_ ? this.lineDash_.toString() : '-') +
            ',' +
            (void 0 !== this.lineDashOffset_ ? this.lineDashOffset_ : '-') +
            ',' +
            (void 0 !== this.lineJoin_ ? this.lineJoin_ : '-') +
            ',' +
            (void 0 !== this.miterLimit_ ? this.miterLimit_.toString() : '-') +
            ',' +
            (void 0 !== this.width_ ? this.width_.toString() : '-'))),
        this.checksum_
      );
    }),
    (I.style.IconAnchorUnits = { FRACTION: 'fraction', PIXELS: 'pixels' }),
    (I.style.IconImage = function (t, e, n, i, r, o) {
      I.events.EventTarget.call(this),
        (this.hitDetectionImage_ = null),
        (this.image_ = t || new Image()),
        null !== i && (this.image_.crossOrigin = i),
        (this.canvas_ = o ? document.createElement('CANVAS') : null),
        (this.color_ = o),
        (this.imageListenerKeys_ = null),
        (this.imageState_ = r),
        (this.size_ = n),
        (this.src_ = e),
        (this.tainting_ = !1),
        this.imageState_ == I.ImageState.LOADED && this.determineTainting_();
    }),
    I.inherits(I.style.IconImage, I.events.EventTarget),
    (I.style.IconImage.get = function (t, e, n, i, r, o) {
      var s = I.style.iconImageCache,
        a = s.get(e, i, o);
      return (
        a || ((a = new I.style.IconImage(t, e, n, i, r, o)), s.set(e, i, o, a)),
        a
      );
    }),
    (I.style.IconImage.prototype.determineTainting_ = function () {
      var t = I.dom.createCanvasContext2D(1, 1);
      try {
        t.drawImage(this.image_, 0, 0), t.getImageData(0, 0, 1, 1);
      } catch (t) {
        this.tainting_ = !0;
      }
    }),
    (I.style.IconImage.prototype.dispatchChangeEvent_ = function () {
      this.dispatchEvent(I.events.EventType.CHANGE);
    }),
    (I.style.IconImage.prototype.handleImageError_ = function () {
      (this.imageState_ = I.ImageState.ERROR),
        this.unlistenImage_(),
        this.dispatchChangeEvent_();
    }),
    (I.style.IconImage.prototype.handleImageLoad_ = function () {
      (this.imageState_ = I.ImageState.LOADED),
        this.size_ &&
          ((this.image_.width = this.size_[0]),
          (this.image_.height = this.size_[1])),
        (this.size_ = [this.image_.width, this.image_.height]),
        this.unlistenImage_(),
        this.determineTainting_(),
        this.replaceColor_(),
        this.dispatchChangeEvent_();
    }),
    (I.style.IconImage.prototype.getImage = function (t) {
      return this.canvas_ ? this.canvas_ : this.image_;
    }),
    (I.style.IconImage.prototype.getImageState = function () {
      return this.imageState_;
    }),
    (I.style.IconImage.prototype.getHitDetectionImage = function (t) {
      if (!this.hitDetectionImage_)
        if (this.tainting_) {
          var e = this.size_[0],
            n = this.size_[1],
            i = I.dom.createCanvasContext2D(e, n);
          i.fillRect(0, 0, e, n), (this.hitDetectionImage_ = i.canvas);
        } else this.hitDetectionImage_ = this.image_;
      return this.hitDetectionImage_;
    }),
    (I.style.IconImage.prototype.getSize = function () {
      return this.size_;
    }),
    (I.style.IconImage.prototype.getSrc = function () {
      return this.src_;
    }),
    (I.style.IconImage.prototype.load = function () {
      if (this.imageState_ == I.ImageState.IDLE) {
        (this.imageState_ = I.ImageState.LOADING),
          (this.imageListenerKeys_ = [
            I.events.listenOnce(
              this.image_,
              I.events.EventType.ERROR,
              this.handleImageError_,
              this,
            ),
            I.events.listenOnce(
              this.image_,
              I.events.EventType.LOAD,
              this.handleImageLoad_,
              this,
            ),
          ]);
        try {
          this.image_.src = this.src_;
        } catch (t) {
          this.handleImageError_();
        }
      }
    }),
    (I.style.IconImage.prototype.replaceColor_ = function () {
      if (!this.tainting_ && null !== this.color_) {
        (this.canvas_.width = this.image_.width),
          (this.canvas_.height = this.image_.height);
        var t = this.canvas_.getContext('2d');
        t.drawImage(this.image_, 0, 0);
        for (
          var e = t.getImageData(0, 0, this.image_.width, this.image_.height),
            n = e.data,
            i = this.color_[0] / 255,
            r = this.color_[1] / 255,
            o = this.color_[2] / 255,
            s = 0,
            a = n.length;
          s < a;
          s += 4
        )
          (n[s] *= i), (n[s + 1] *= r), (n[s + 2] *= o);
        t.putImageData(e, 0, 0);
      }
    }),
    (I.style.IconImage.prototype.unlistenImage_ = function () {
      this.imageListenerKeys_.forEach(I.events.unlistenByKey),
        (this.imageListenerKeys_ = null);
    }),
    (I.style.IconOrigin = {
      BOTTOM_LEFT: 'bottom-left',
      BOTTOM_RIGHT: 'bottom-right',
      TOP_LEFT: 'top-left',
      TOP_RIGHT: 'top-right',
    }),
    (I.style.Icon = function (t) {
      var e = t || {};
      (this.anchor_ = void 0 !== e.anchor ? e.anchor : [0.5, 0.5]),
        (this.normalizedAnchor_ = null),
        (this.anchorOrigin_ =
          void 0 !== e.anchorOrigin
            ? e.anchorOrigin
            : I.style.IconOrigin.TOP_LEFT),
        (this.anchorXUnits_ =
          void 0 !== e.anchorXUnits
            ? e.anchorXUnits
            : I.style.IconAnchorUnits.FRACTION),
        (this.anchorYUnits_ =
          void 0 !== e.anchorYUnits
            ? e.anchorYUnits
            : I.style.IconAnchorUnits.FRACTION),
        (this.crossOrigin_ = void 0 !== e.crossOrigin ? e.crossOrigin : null);
      var n = void 0 !== e.img ? e.img : null,
        i = void 0 !== e.imgSize ? e.imgSize : null,
        r = e.src;
      (void 0 !== r && 0 !== r.length) ||
        !n ||
        (r = n.src || I.getUid(n).toString());
      var o = void 0 !== e.src ? I.ImageState.IDLE : I.ImageState.LOADED;
      (this.color_ = void 0 !== e.color ? I.color.asArray(e.color) : null),
        (this.iconImage_ = I.style.IconImage.get(
          n,
          r,
          i,
          this.crossOrigin_,
          o,
          this.color_,
        )),
        (this.offset_ = void 0 !== e.offset ? e.offset : [0, 0]),
        (this.offsetOrigin_ =
          void 0 !== e.offsetOrigin
            ? e.offsetOrigin
            : I.style.IconOrigin.TOP_LEFT),
        (this.origin_ = null),
        (this.size_ = void 0 !== e.size ? e.size : null);
      var s = void 0 !== e.opacity ? e.opacity : 1,
        a = void 0 !== e.rotateWithView && e.rotateWithView,
        l = void 0 !== e.rotation ? e.rotation : 0,
        h = void 0 !== e.scale ? e.scale : 1,
        c = void 0 === e.snapToPixel || e.snapToPixel;
      I.style.Image.call(this, {
        opacity: s,
        rotation: l,
        scale: h,
        snapToPixel: c,
        rotateWithView: a,
      });
    }),
    I.inherits(I.style.Icon, I.style.Image),
    (I.style.Icon.prototype.clone = function () {
      return new I.style.Icon({
        anchor: this.anchor_.slice(),
        anchorOrigin: this.anchorOrigin_,
        anchorXUnits: this.anchorXUnits_,
        anchorYUnits: this.anchorYUnits_,
        crossOrigin: this.crossOrigin_,
        color:
          this.color_ && this.color_.slice
            ? this.color_.slice()
            : this.color_ || void 0,
        src: this.getSrc(),
        offset: this.offset_.slice(),
        offsetOrigin: this.offsetOrigin_,
        size: null !== this.size_ ? this.size_.slice() : void 0,
        opacity: this.getOpacity(),
        scale: this.getScale(),
        snapToPixel: this.getSnapToPixel(),
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
      });
    }),
    (I.style.Icon.prototype.getAnchor = function () {
      if (this.normalizedAnchor_) return this.normalizedAnchor_;
      var t = this.anchor_,
        e = this.getSize();
      if (
        this.anchorXUnits_ == I.style.IconAnchorUnits.FRACTION ||
        this.anchorYUnits_ == I.style.IconAnchorUnits.FRACTION
      ) {
        if (!e) return null;
        (t = this.anchor_.slice()),
          this.anchorXUnits_ == I.style.IconAnchorUnits.FRACTION &&
            (t[0] *= e[0]),
          this.anchorYUnits_ == I.style.IconAnchorUnits.FRACTION &&
            (t[1] *= e[1]);
      }
      if (this.anchorOrigin_ != I.style.IconOrigin.TOP_LEFT) {
        if (!e) return null;
        t === this.anchor_ && (t = this.anchor_.slice()),
          (this.anchorOrigin_ != I.style.IconOrigin.TOP_RIGHT &&
            this.anchorOrigin_ != I.style.IconOrigin.BOTTOM_RIGHT) ||
            (t[0] = -t[0] + e[0]),
          (this.anchorOrigin_ != I.style.IconOrigin.BOTTOM_LEFT &&
            this.anchorOrigin_ != I.style.IconOrigin.BOTTOM_RIGHT) ||
            (t[1] = -t[1] + e[1]);
      }
      return (this.normalizedAnchor_ = t), this.normalizedAnchor_;
    }),
    (I.style.Icon.prototype.getColor = function () {
      return this.color_;
    }),
    (I.style.Icon.prototype.getImage = function (t) {
      return this.iconImage_.getImage(t);
    }),
    (I.style.Icon.prototype.getImageSize = function () {
      return this.iconImage_.getSize();
    }),
    (I.style.Icon.prototype.getHitDetectionImageSize = function () {
      return this.getImageSize();
    }),
    (I.style.Icon.prototype.getImageState = function () {
      return this.iconImage_.getImageState();
    }),
    (I.style.Icon.prototype.getHitDetectionImage = function (t) {
      return this.iconImage_.getHitDetectionImage(t);
    }),
    (I.style.Icon.prototype.getOrigin = function () {
      if (this.origin_) return this.origin_;
      var t = this.offset_;
      if (this.offsetOrigin_ != I.style.IconOrigin.TOP_LEFT) {
        var e = this.getSize(),
          n = this.iconImage_.getSize();
        if (!e || !n) return null;
        (t = t.slice()),
          (this.offsetOrigin_ != I.style.IconOrigin.TOP_RIGHT &&
            this.offsetOrigin_ != I.style.IconOrigin.BOTTOM_RIGHT) ||
            (t[0] = n[0] - e[0] - t[0]),
          (this.offsetOrigin_ != I.style.IconOrigin.BOTTOM_LEFT &&
            this.offsetOrigin_ != I.style.IconOrigin.BOTTOM_RIGHT) ||
            (t[1] = n[1] - e[1] - t[1]);
      }
      return (this.origin_ = t), this.origin_;
    }),
    (I.style.Icon.prototype.getSrc = function () {
      return this.iconImage_.getSrc();
    }),
    (I.style.Icon.prototype.getSize = function () {
      return this.size_ ? this.size_ : this.iconImage_.getSize();
    }),
    (I.style.Icon.prototype.listenImageChange = function (t, e) {
      return I.events.listen(this.iconImage_, I.events.EventType.CHANGE, t, e);
    }),
    (I.style.Icon.prototype.load = function () {
      this.iconImage_.load();
    }),
    (I.style.Icon.prototype.unlistenImageChange = function (t, e) {
      I.events.unlisten(this.iconImage_, I.events.EventType.CHANGE, t, e);
    }),
    (I.style.Text = function (t) {
      var e = t || {};
      (this.font_ = e.font),
        (this.rotation_ = e.rotation),
        (this.rotateWithView_ = e.rotateWithView),
        (this.scale_ = e.scale),
        (this.text_ = e.text),
        (this.textAlign_ = e.textAlign),
        (this.textBaseline_ = e.textBaseline),
        (this.fill_ =
          void 0 !== e.fill
            ? e.fill
            : new I.style.Fill({ color: I.style.Text.DEFAULT_FILL_COLOR_ })),
        (this.maxAngle_ = void 0 !== e.maxAngle ? e.maxAngle : Math.PI / 4),
        (this.placement_ =
          void 0 !== e.placement ? e.placement : I.style.TextPlacement.POINT);
      var n = void 0 === e.overflow ? e.exceedLength : e.overflow;
      (this.overflow_ = void 0 !== n && n),
        (this.stroke_ = void 0 !== e.stroke ? e.stroke : null),
        (this.offsetX_ = void 0 !== e.offsetX ? e.offsetX : 0),
        (this.offsetY_ = void 0 !== e.offsetY ? e.offsetY : 0),
        (this.backgroundFill_ = e.backgroundFill ? e.backgroundFill : null),
        (this.backgroundStroke_ = e.backgroundStroke
          ? e.backgroundStroke
          : null),
        (this.padding_ = void 0 === e.padding ? null : e.padding);
    }),
    (I.style.Text.DEFAULT_FILL_COLOR_ = '#333'),
    (I.style.Text.prototype.clone = function () {
      return new I.style.Text({
        font: this.getFont(),
        placement: this.getPlacement(),
        maxAngle: this.getMaxAngle(),
        overflow: this.getOverflow(),
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        scale: this.getScale(),
        text: this.getText(),
        textAlign: this.getTextAlign(),
        textBaseline: this.getTextBaseline(),
        fill: this.getFill() ? this.getFill().clone() : void 0,
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        offsetX: this.getOffsetX(),
        offsetY: this.getOffsetY(),
      });
    }),
    (I.style.Text.prototype.getOverflow = function () {
      return this.overflow_;
    }),
    (I.style.Text.prototype.getFont = function () {
      return this.font_;
    }),
    (I.style.Text.prototype.getMaxAngle = function () {
      return this.maxAngle_;
    }),
    (I.style.Text.prototype.getPlacement = function () {
      return this.placement_;
    }),
    (I.style.Text.prototype.getOffsetX = function () {
      return this.offsetX_;
    }),
    (I.style.Text.prototype.getOffsetY = function () {
      return this.offsetY_;
    }),
    (I.style.Text.prototype.getFill = function () {
      return this.fill_;
    }),
    (I.style.Text.prototype.getRotateWithView = function () {
      return this.rotateWithView_;
    }),
    (I.style.Text.prototype.getRotation = function () {
      return this.rotation_;
    }),
    (I.style.Text.prototype.getScale = function () {
      return this.scale_;
    }),
    (I.style.Text.prototype.getStroke = function () {
      return this.stroke_;
    }),
    (I.style.Text.prototype.getText = function () {
      return this.text_;
    }),
    (I.style.Text.prototype.getTextAlign = function () {
      return this.textAlign_;
    }),
    (I.style.Text.prototype.getTextBaseline = function () {
      return this.textBaseline_;
    }),
    (I.style.Text.prototype.getBackgroundFill = function () {
      return this.backgroundFill_;
    }),
    (I.style.Text.prototype.getBackgroundStroke = function () {
      return this.backgroundStroke_;
    }),
    (I.style.Text.prototype.getPadding = function () {
      return this.padding_;
    }),
    (I.style.Text.prototype.setOverflow = function (t) {
      this.overflow_ = t;
    }),
    (I.style.Text.prototype.setFont = function (t) {
      this.font_ = t;
    }),
    (I.style.Text.prototype.setMaxAngle = function (t) {
      this.maxAngle_ = t;
    }),
    (I.style.Text.prototype.setOffsetX = function (t) {
      this.offsetX_ = t;
    }),
    (I.style.Text.prototype.setOffsetY = function (t) {
      this.offsetY_ = t;
    }),
    (I.style.Text.prototype.setPlacement = function (t) {
      this.placement_ = t;
    }),
    (I.style.Text.prototype.setFill = function (t) {
      this.fill_ = t;
    }),
    (I.style.Text.prototype.setRotation = function (t) {
      this.rotation_ = t;
    }),
    (I.style.Text.prototype.setScale = function (t) {
      this.scale_ = t;
    }),
    (I.style.Text.prototype.setStroke = function (t) {
      this.stroke_ = t;
    }),
    (I.style.Text.prototype.setText = function (t) {
      this.text_ = t;
    }),
    (I.style.Text.prototype.setTextAlign = function (t) {
      this.textAlign_ = t;
    }),
    (I.style.Text.prototype.setTextBaseline = function (t) {
      this.textBaseline_ = t;
    }),
    (I.style.Text.prototype.setBackgroundFill = function (t) {
      this.backgroundFill_ = t;
    }),
    (I.style.Text.prototype.setBackgroundStroke = function (t) {
      this.backgroundStroke_ = t;
    }),
    (I.style.Text.prototype.setPadding = function (t) {
      this.padding_ = t;
    }),
    (I.style.Style = function (t) {
      var e = t || {};
      (this.geometry_ = null),
        (this.geometryFunction_ = I.style.Style.defaultGeometryFunction),
        void 0 !== e.geometry && this.setGeometry(e.geometry),
        (this.fill_ = void 0 !== e.fill ? e.fill : null),
        (this.image_ = void 0 !== e.image ? e.image : null),
        (this.renderer_ = void 0 !== e.renderer ? e.renderer : null),
        (this.stroke_ = void 0 !== e.stroke ? e.stroke : null),
        (this.text_ = void 0 !== e.text ? e.text : null),
        (this.zIndex_ = e.zIndex);
    }),
    (I.style.Style.prototype.clone = function () {
      var t = this.getGeometry();
      return (
        t && t.clone && (t = t.clone()),
        new I.style.Style({
          geometry: t,
          fill: this.getFill() ? this.getFill().clone() : void 0,
          image: this.getImage() ? this.getImage().clone() : void 0,
          stroke: this.getStroke() ? this.getStroke().clone() : void 0,
          text: this.getText() ? this.getText().clone() : void 0,
          zIndex: this.getZIndex(),
        })
      );
    }),
    (I.style.Style.prototype.getRenderer = function () {
      return this.renderer_;
    }),
    (I.style.Style.prototype.setRenderer = function (t) {
      this.renderer_ = t;
    }),
    (I.style.Style.prototype.getGeometry = function () {
      return this.geometry_;
    }),
    (I.style.Style.prototype.getGeometryFunction = function () {
      return this.geometryFunction_;
    }),
    (I.style.Style.prototype.getFill = function () {
      return this.fill_;
    }),
    (I.style.Style.prototype.setFill = function (t) {
      this.fill_ = t;
    }),
    (I.style.Style.prototype.getImage = function () {
      return this.image_;
    }),
    (I.style.Style.prototype.setImage = function (t) {
      this.image_ = t;
    }),
    (I.style.Style.prototype.getStroke = function () {
      return this.stroke_;
    }),
    (I.style.Style.prototype.setStroke = function (t) {
      this.stroke_ = t;
    }),
    (I.style.Style.prototype.getText = function () {
      return this.text_;
    }),
    (I.style.Style.prototype.setText = function (t) {
      this.text_ = t;
    }),
    (I.style.Style.prototype.getZIndex = function () {
      return this.zIndex_;
    }),
    (I.style.Style.prototype.setGeometry = function (t) {
      'function' == typeof t
        ? (this.geometryFunction_ = t)
        : 'string' == typeof t
        ? (this.geometryFunction_ = function (e) {
            return e.get(t);
          })
        : t
        ? void 0 !== t &&
          (this.geometryFunction_ = function () {
            return t;
          })
        : (this.geometryFunction_ = I.style.Style.defaultGeometryFunction),
        (this.geometry_ = t);
    }),
    (I.style.Style.prototype.setZIndex = function (t) {
      this.zIndex_ = t;
    }),
    (I.style.Style.createFunction = function (t) {
      var e, n;
      'function' == typeof t
        ? (e = t)
        : (Array.isArray(t)
            ? (n = t)
            : (I.asserts.assert(t instanceof I.style.Style, 41), (n = [t])),
          (e = function () {
            return n;
          }));
      return e;
    }),
    (I.style.Style.default_ = null),
    (I.style.Style.defaultFunction = function (t, e) {
      if (!I.style.Style.default_) {
        var n = new I.style.Fill({ color: 'rgba(255,255,255,0.4)' }),
          i = new I.style.Stroke({ color: '#3399CC', width: 1.25 });
        I.style.Style.default_ = [
          new I.style.Style({
            image: new I.style.Circle({ fill: n, stroke: i, radius: 5 }),
            fill: n,
            stroke: i,
          }),
        ];
      }
      return I.style.Style.default_;
    }),
    (I.style.Style.createDefaultEditing = function () {
      var t = {},
        e = [255, 255, 255, 1],
        n = [0, 153, 255, 1];
      return (
        (t[I.geom.GeometryType.POLYGON] = [
          new I.style.Style({
            fill: new I.style.Fill({ color: [255, 255, 255, 0.5] }),
          }),
        ]),
        (t[I.geom.GeometryType.MULTI_POLYGON] = t[I.geom.GeometryType.POLYGON]),
        (t[I.geom.GeometryType.LINE_STRING] = [
          new I.style.Style({
            stroke: new I.style.Stroke({ color: e, width: 5 }),
          }),
          new I.style.Style({
            stroke: new I.style.Stroke({ color: n, width: 3 }),
          }),
        ]),
        (t[I.geom.GeometryType.MULTI_LINE_STRING] =
          t[I.geom.GeometryType.LINE_STRING]),
        (t[I.geom.GeometryType.CIRCLE] = t[I.geom.GeometryType.POLYGON].concat(
          t[I.geom.GeometryType.LINE_STRING],
        )),
        (t[I.geom.GeometryType.POINT] = [
          new I.style.Style({
            image: new I.style.Circle({
              radius: 6,
              fill: new I.style.Fill({ color: n }),
              stroke: new I.style.Stroke({ color: e, width: 1.5 }),
            }),
            zIndex: 1 / 0,
          }),
        ]),
        (t[I.geom.GeometryType.MULTI_POINT] = t[I.geom.GeometryType.POINT]),
        (t[I.geom.GeometryType.GEOMETRY_COLLECTION] = t[
          I.geom.GeometryType.POLYGON
        ].concat(
          t[I.geom.GeometryType.LINE_STRING],
          t[I.geom.GeometryType.POINT],
        )),
        t
      );
    }),
    (I.style.Style.defaultGeometryFunction = function (t) {
      return t.getGeometry();
    }),
    (I.ext = {}),
    (I.ext.rbush = function () {}),
    function () {
      !(function (t) {
        var e = i,
          n = i;
        function i(t, e, n, i, o) {
          r(t, e, n || 0, i || t.length - 1, o || s);
        }
        function r(t, e, n, i, s) {
          for (; i > n; ) {
            if (i - n > 600) {
              var a = i - n + 1,
                l = e - n + 1,
                h = Math.log(a),
                c = 0.5 * Math.exp((2 * h) / 3),
                u =
                  0.5 *
                  Math.sqrt((h * c * (a - c)) / a) *
                  (l - a / 2 < 0 ? -1 : 1);
              r(
                t,
                e,
                Math.max(n, Math.floor(e - (l * c) / a + u)),
                Math.min(i, Math.floor(e + ((a - l) * c) / a + u)),
                s,
              );
            }
            var d = t[e],
              f = n,
              g = i;
            for (o(t, n, e), s(t[i], d) > 0 && o(t, n, i); f < g; ) {
              for (o(t, f, g), f++, g--; s(t[f], d) < 0; ) f++;
              for (; s(t[g], d) > 0; ) g--;
            }
            0 === s(t[n], d) ? o(t, n, g) : o(t, ++g, i),
              g <= e && (n = g + 1),
              e <= g && (i = g - 1);
          }
        }
        function o(t, e, n) {
          var i = t[e];
          (t[e] = t[n]), (t[n] = i);
        }
        function s(t, e) {
          return t < e ? -1 : t > e ? 1 : 0;
        }
        e.default = n;
        var a = l;
        function l(t, e) {
          if (!(this instanceof l)) return new l(t, e);
          (this._maxEntries = Math.max(4, t || 9)),
            (this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries))),
            e && this._initFormat(e),
            this.clear();
        }
        function h(t, e, n) {
          if (!n) return e.indexOf(t);
          for (var i = 0; i < e.length; i++) if (n(t, e[i])) return i;
          return -1;
        }
        function c(t, e) {
          u(t, 0, t.children.length, e, t);
        }
        function u(t, e, n, i, r) {
          r || (r = _(null)),
            (r.minX = 1 / 0),
            (r.minY = 1 / 0),
            (r.maxX = -1 / 0),
            (r.maxY = -1 / 0);
          for (var o, s = e; s < n; s++)
            (o = t.children[s]), d(r, t.leaf ? i(o) : o);
          return r;
        }
        function d(t, e) {
          return (
            (t.minX = Math.min(t.minX, e.minX)),
            (t.minY = Math.min(t.minY, e.minY)),
            (t.maxX = Math.max(t.maxX, e.maxX)),
            (t.maxY = Math.max(t.maxY, e.maxY)),
            t
          );
        }
        function f(t, e) {
          return t.minX - e.minX;
        }
        function g(t, e) {
          return t.minY - e.minY;
        }
        function p(t) {
          return (t.maxX - t.minX) * (t.maxY - t.minY);
        }
        function y(t) {
          return t.maxX - t.minX + (t.maxY - t.minY);
        }
        function m(t, e) {
          return (
            t.minX <= e.minX &&
            t.minY <= e.minY &&
            e.maxX <= t.maxX &&
            e.maxY <= t.maxY
          );
        }
        function v(t, e) {
          return (
            e.minX <= t.maxX &&
            e.minY <= t.maxY &&
            e.maxX >= t.minX &&
            e.maxY >= t.minY
          );
        }
        function _(t) {
          return {
            children: t,
            height: 1,
            leaf: !0,
            minX: 1 / 0,
            minY: 1 / 0,
            maxX: -1 / 0,
            maxY: -1 / 0,
          };
        }
        function S(t, n, i, r, o) {
          for (var s, a = [n, i]; a.length; )
            (i = a.pop()) - (n = a.pop()) <= r ||
              ((s = n + Math.ceil((i - n) / r / 2) * r),
              e(t, s, n, i, o),
              a.push(n, s, s, i));
        }
        (l.prototype = {
          all: function () {
            return this._all(this.data, []);
          },
          search: function (t) {
            var e = this.data,
              n = [],
              i = this.toBBox;
            if (!v(t, e)) return n;
            for (var r, o, s, a, l = []; e; ) {
              for (r = 0, o = e.children.length; r < o; r++)
                (s = e.children[r]),
                  v(t, (a = e.leaf ? i(s) : s)) &&
                    (e.leaf
                      ? n.push(s)
                      : m(t, a)
                      ? this._all(s, n)
                      : l.push(s));
              e = l.pop();
            }
            return n;
          },
          collides: function (t) {
            var e = this.data,
              n = this.toBBox;
            if (!v(t, e)) return !1;
            for (var i, r, o, s, a = []; e; ) {
              for (i = 0, r = e.children.length; i < r; i++)
                if (((o = e.children[i]), v(t, (s = e.leaf ? n(o) : o)))) {
                  if (e.leaf || m(t, s)) return !0;
                  a.push(o);
                }
              e = a.pop();
            }
            return !1;
          },
          load: function (t) {
            if (!t || !t.length) return this;
            if (t.length < this._minEntries) {
              for (var e = 0, n = t.length; e < n; e++) this.insert(t[e]);
              return this;
            }
            var i = this._build(t.slice(), 0, t.length - 1, 0);
            if (this.data.children.length)
              if (this.data.height === i.height) this._splitRoot(this.data, i);
              else {
                if (this.data.height < i.height) {
                  var r = this.data;
                  (this.data = i), (i = r);
                }
                this._insert(i, this.data.height - i.height - 1, !0);
              }
            else this.data = i;
            return this;
          },
          insert: function (t) {
            return t && this._insert(t, this.data.height - 1), this;
          },
          clear: function () {
            return (this.data = _([])), this;
          },
          remove: function (t, e) {
            if (!t) return this;
            for (
              var n, i, r, o, s = this.data, a = this.toBBox(t), l = [], c = [];
              s || l.length;

            ) {
              if (
                (s ||
                  ((s = l.pop()),
                  (i = l[l.length - 1]),
                  (n = c.pop()),
                  (o = !0)),
                s.leaf && -1 !== (r = h(t, s.children, e)))
              )
                return (
                  s.children.splice(r, 1), l.push(s), this._condense(l), this
                );
              o || s.leaf || !m(s, a)
                ? i
                  ? (n++, (s = i.children[n]), (o = !1))
                  : (s = null)
                : (l.push(s), c.push(n), (n = 0), (i = s), (s = s.children[0]));
            }
            return this;
          },
          toBBox: function (t) {
            return t;
          },
          compareMinX: f,
          compareMinY: g,
          toJSON: function () {
            return this.data;
          },
          fromJSON: function (t) {
            return (this.data = t), this;
          },
          _all: function (t, e) {
            for (var n = []; t; )
              t.leaf
                ? e.push.apply(e, t.children)
                : n.push.apply(n, t.children),
                (t = n.pop());
            return e;
          },
          _build: function (t, e, n, i) {
            var r,
              o = n - e + 1,
              s = this._maxEntries;
            if (o <= s) return c((r = _(t.slice(e, n + 1))), this.toBBox), r;
            i ||
              ((i = Math.ceil(Math.log(o) / Math.log(s))),
              (s = Math.ceil(o / Math.pow(s, i - 1)))),
              ((r = _([])).leaf = !1),
              (r.height = i);
            var a,
              l,
              h,
              u,
              d = Math.ceil(o / s),
              f = d * Math.ceil(Math.sqrt(s));
            for (S(t, e, n, f, this.compareMinX), a = e; a <= n; a += f)
              for (
                S(t, a, (h = Math.min(a + f - 1, n)), d, this.compareMinY),
                  l = a;
                l <= h;
                l += d
              )
                (u = Math.min(l + d - 1, h)),
                  r.children.push(this._build(t, l, u, i - 1));
            return c(r, this.toBBox), r;
          },
          _chooseSubtree: function (t, e, n, i) {
            for (
              var r, o, s, a, l, h, c, u, d, f;
              i.push(e), !e.leaf && i.length - 1 !== n;

            ) {
              for (c = u = 1 / 0, r = 0, o = e.children.length; r < o; r++)
                (l = p((s = e.children[r]))),
                  (d = t),
                  (f = s),
                  (h =
                    (Math.max(f.maxX, d.maxX) - Math.min(f.minX, d.minX)) *
                      (Math.max(f.maxY, d.maxY) - Math.min(f.minY, d.minY)) -
                    l) < u
                    ? ((u = h), (c = l < c ? l : c), (a = s))
                    : h === u && l < c && ((c = l), (a = s));
              e = a || e.children[0];
            }
            return e;
          },
          _insert: function (t, e, n) {
            var i = this.toBBox,
              r = n ? t : i(t),
              o = [],
              s = this._chooseSubtree(r, this.data, e, o);
            for (
              s.children.push(t), d(s, r);
              e >= 0 && o[e].children.length > this._maxEntries;

            )
              this._split(o, e), e--;
            this._adjustParentBBoxes(r, o, e);
          },
          _split: function (t, e) {
            var n = t[e],
              i = n.children.length,
              r = this._minEntries;
            this._chooseSplitAxis(n, r, i);
            var o = this._chooseSplitIndex(n, r, i),
              s = _(n.children.splice(o, n.children.length - o));
            (s.height = n.height),
              (s.leaf = n.leaf),
              c(n, this.toBBox),
              c(s, this.toBBox),
              e ? t[e - 1].children.push(s) : this._splitRoot(n, s);
          },
          _splitRoot: function (t, e) {
            (this.data = _([t, e])),
              (this.data.height = t.height + 1),
              (this.data.leaf = !1),
              c(this.data, this.toBBox);
          },
          _chooseSplitIndex: function (t, e, n) {
            var i, r, o, s, a, l, h, c, d, f, g, y, m, v;
            for (l = h = 1 / 0, i = e; i <= n - e; i++)
              (r = u(t, 0, i, this.toBBox)),
                (o = u(t, i, n, this.toBBox)),
                (d = r),
                (f = o),
                (g = void 0),
                (y = void 0),
                (m = void 0),
                (v = void 0),
                (g = Math.max(d.minX, f.minX)),
                (y = Math.max(d.minY, f.minY)),
                (m = Math.min(d.maxX, f.maxX)),
                (v = Math.min(d.maxY, f.maxY)),
                (s = Math.max(0, m - g) * Math.max(0, v - y)),
                (a = p(r) + p(o)),
                s < l
                  ? ((l = s), (c = i), (h = a < h ? a : h))
                  : s === l && a < h && ((h = a), (c = i));
            return c;
          },
          _chooseSplitAxis: function (t, e, n) {
            var i = t.leaf ? this.compareMinX : f,
              r = t.leaf ? this.compareMinY : g;
            this._allDistMargin(t, e, n, i) < this._allDistMargin(t, e, n, r) &&
              t.children.sort(i);
          },
          _allDistMargin: function (t, e, n, i) {
            t.children.sort(i);
            var r,
              o,
              s = this.toBBox,
              a = u(t, 0, e, s),
              l = u(t, n - e, n, s),
              h = y(a) + y(l);
            for (r = e; r < n - e; r++)
              (o = t.children[r]), d(a, t.leaf ? s(o) : o), (h += y(a));
            for (r = n - e - 1; r >= e; r--)
              (o = t.children[r]), d(l, t.leaf ? s(o) : o), (h += y(l));
            return h;
          },
          _adjustParentBBoxes: function (t, e, n) {
            for (var i = n; i >= 0; i--) d(e[i], t);
          },
          _condense: function (t) {
            for (var e, n = t.length - 1; n >= 0; n--)
              0 === t[n].children.length
                ? n > 0
                  ? (e = t[n - 1].children).splice(e.indexOf(t[n]), 1)
                  : this.clear()
                : c(t[n], this.toBBox);
          },
          _initFormat: function (t) {
            var e = ['return a', ' - b', ';'];
            (this.compareMinX = new Function('a', 'b', e.join(t[0]))),
              (this.compareMinY = new Function('a', 'b', e.join(t[1]))),
              (this.toBBox = new Function(
                'a',
                'return {minX: a' +
                  t[0] +
                  ', minY: a' +
                  t[1] +
                  ', maxX: a' +
                  t[2] +
                  ', maxY: a' +
                  t[3] +
                  '};',
              ));
          },
        }),
          (t.default = a);
      })((this.rbush = this.rbush || {}));
    }.call(I.ext),
    (I.ext.rbush = I.ext.rbush.default),
    (I.render = {}),
    (I.render.VectorContext = function () {}),
    (I.render.VectorContext.prototype.drawCustom = function (t, e, n) {}),
    (I.render.VectorContext.prototype.drawGeometry = function (t) {}),
    (I.render.VectorContext.prototype.setStyle = function (t) {}),
    (I.render.VectorContext.prototype.drawCircle = function (t, e) {}),
    (I.render.VectorContext.prototype.drawFeature = function (t, e) {}),
    (I.render.VectorContext.prototype.drawGeometryCollection = function (
      t,
      e,
    ) {}),
    (I.render.VectorContext.prototype.drawLineString = function (t, e) {}),
    (I.render.VectorContext.prototype.drawMultiLineString = function (t, e) {}),
    (I.render.VectorContext.prototype.drawMultiPoint = function (t, e) {}),
    (I.render.VectorContext.prototype.drawMultiPolygon = function (t, e) {}),
    (I.render.VectorContext.prototype.drawPoint = function (t, e) {}),
    (I.render.VectorContext.prototype.drawPolygon = function (t, e) {}),
    (I.render.VectorContext.prototype.drawText = function (t, e) {}),
    (I.render.VectorContext.prototype.setFillStrokeStyle = function (t, e) {}),
    (I.render.VectorContext.prototype.setImageStyle = function (t, e) {}),
    (I.render.VectorContext.prototype.setTextStyle = function (t, e) {}),
    (I.render.ReplayGroup = {}),
    (I.render.ReplayGroup = function () {}),
    (I.render.ReplayGroup.prototype.getReplay = function (t, e) {}),
    (I.render.ReplayGroup.prototype.isEmpty = function () {}),
    (I.render.ReplayType = {
      CIRCLE: 'Circle',
      DEFAULT: 'Default',
      IMAGE: 'Image',
      LINE_STRING: 'LineString',
      POLYGON: 'Polygon',
      TEXT: 'Text',
    }),
    (I.geom.flat.length = {}),
    (I.geom.flat.length.lineString = function (t, e, n, i) {
      var r,
        o = t[e],
        s = t[e + 1],
        a = 0;
      for (r = e + i; r < n; r += i) {
        var l = t[r],
          h = t[r + 1];
        (a += Math.sqrt((l - o) * (l - o) + (h - s) * (h - s))),
          (o = l),
          (s = h);
      }
      return a;
    }),
    (I.geom.flat.length.linearRing = function (t, e, n, i) {
      var r = I.geom.flat.length.lineString(t, e, n, i),
        o = t[n - i] - t[e],
        s = t[n - i + 1] - t[e + 1];
      return (r += Math.sqrt(o * o + s * s));
    }),
    (I.geom.flat.textpath = {}),
    (I.geom.flat.textpath.lineString = function (t, e, n, i, r, o, s, a) {
      for (
        var l,
          h,
          c,
          u = [],
          d = t[e] > t[n - i],
          f = r.length,
          g = t[e],
          p = t[e + 1],
          y = t[(e += i)],
          m = t[e + 1],
          v = 0,
          _ = Math.sqrt(Math.pow(y - g, 2) + Math.pow(m - p, 2)),
          S = '',
          x = 0,
          C = 0;
        C < f;
        ++C
      ) {
        h = d ? f - C - 1 : C;
        var T = r.charAt(h),
          R = o((S = d ? T + S : S + T)) - x;
        x += R;
        for (var L = s + R / 2; e < n - i && v + _ < L; )
          (g = y),
            (p = m),
            (y = t[(e += i)]),
            (m = t[e + 1]),
            (v += _),
            (_ = Math.sqrt(Math.pow(y - g, 2) + Math.pow(m - p, 2)));
        var E = L - v,
          O = Math.atan2(m - p, y - g);
        if ((d && (O += O > 0 ? -Math.PI : Math.PI), void 0 !== c)) {
          var G = O - c;
          if (
            ((G += G > Math.PI ? -2 * Math.PI : G < -Math.PI ? 2 * Math.PI : 0),
            Math.abs(G) > a)
          )
            return null;
        }
        var M = E / _,
          F = I.math.lerp(g, y, M),
          w = I.math.lerp(p, m, M);
        c == O
          ? (d && ((l[0] = F), (l[1] = w), (l[2] = R / 2)), (l[4] = S))
          : ((x = R),
            (l = [F, w, R / 2, O, (S = T)]),
            d ? u.unshift(l) : u.push(l),
            (c = O)),
          (s += R);
      }
      return u;
    }),
    (I.structs.LRUCache = function (t) {
      I.events.EventTarget.call(this),
        (this.highWaterMark = void 0 !== t ? t : 2048),
        (this.count_ = 0),
        (this.entries_ = {}),
        (this.oldest_ = null),
        (this.newest_ = null);
    }),
    I.inherits(I.structs.LRUCache, I.events.EventTarget),
    (I.structs.LRUCache.prototype.canExpireCache = function () {
      return this.getCount() > this.highWaterMark;
    }),
    (I.structs.LRUCache.prototype.clear = function () {
      (this.count_ = 0),
        (this.entries_ = {}),
        (this.oldest_ = null),
        (this.newest_ = null),
        this.dispatchEvent(I.events.EventType.CLEAR);
    }),
    (I.structs.LRUCache.prototype.containsKey = function (t) {
      return this.entries_.hasOwnProperty(t);
    }),
    (I.structs.LRUCache.prototype.forEach = function (t, e) {
      for (var n = this.oldest_; n; )
        t.call(e, n.value_, n.key_, this), (n = n.newer);
    }),
    (I.structs.LRUCache.prototype.get = function (t) {
      var e = this.entries_[t];
      return (
        I.asserts.assert(void 0 !== e, 15),
        e === this.newest_ ||
          (e === this.oldest_
            ? ((this.oldest_ = this.oldest_.newer), (this.oldest_.older = null))
            : ((e.newer.older = e.older), (e.older.newer = e.newer)),
          (e.newer = null),
          (e.older = this.newest_),
          (this.newest_.newer = e),
          (this.newest_ = e)),
        e.value_
      );
    }),
    (I.structs.LRUCache.prototype.remove = function (t) {
      var e = this.entries_[t];
      return (
        I.asserts.assert(void 0 !== e, 15),
        e === this.newest_
          ? ((this.newest_ = e.older),
            this.newest_ && (this.newest_.newer = null))
          : e === this.oldest_
          ? ((this.oldest_ = e.newer),
            this.oldest_ && (this.oldest_.older = null))
          : ((e.newer.older = e.older), (e.older.newer = e.newer)),
        delete this.entries_[t],
        --this.count_,
        e.value_
      );
    }),
    (I.structs.LRUCache.prototype.getCount = function () {
      return this.count_;
    }),
    (I.structs.LRUCache.prototype.getKeys = function () {
      var t,
        e = new Array(this.count_),
        n = 0;
      for (t = this.newest_; t; t = t.older) e[n++] = t.key_;
      return e;
    }),
    (I.structs.LRUCache.prototype.getValues = function () {
      var t,
        e = new Array(this.count_),
        n = 0;
      for (t = this.newest_; t; t = t.older) e[n++] = t.value_;
      return e;
    }),
    (I.structs.LRUCache.prototype.peekLast = function () {
      return this.oldest_.value_;
    }),
    (I.structs.LRUCache.prototype.peekLastKey = function () {
      return this.oldest_.key_;
    }),
    (I.structs.LRUCache.prototype.peekFirstKey = function () {
      return this.newest_.key_;
    }),
    (I.structs.LRUCache.prototype.pop = function () {
      var t = this.oldest_;
      return (
        delete this.entries_[t.key_],
        t.newer && (t.newer.older = null),
        (this.oldest_ = t.newer),
        this.oldest_ || (this.newest_ = null),
        --this.count_,
        t.value_
      );
    }),
    (I.structs.LRUCache.prototype.replace = function (t, e) {
      this.get(t), (this.entries_[t].value_ = e);
    }),
    (I.structs.LRUCache.prototype.set = function (t, e) {
      I.asserts.assert(!(t in this.entries_), 16);
      var n = { key_: t, newer: null, older: this.newest_, value_: e };
      this.newest_ ? (this.newest_.newer = n) : (this.oldest_ = n),
        (this.newest_ = n),
        (this.entries_[t] = n),
        ++this.count_;
    }),
    (I.structs.LRUCache.prototype.prune = function () {
      for (; this.canExpireCache(); ) this.pop();
    }),
    (I.render.canvas = {}),
    (I.render.canvas.defaultFont = '10px sans-serif'),
    (I.render.canvas.defaultFillStyle = [0, 0, 0, 1]),
    (I.render.canvas.defaultLineCap = 'round'),
    (I.render.canvas.defaultLineDash = []),
    (I.render.canvas.defaultLineDashOffset = 0),
    (I.render.canvas.defaultLineJoin = 'round'),
    (I.render.canvas.defaultMiterLimit = 10),
    (I.render.canvas.defaultStrokeStyle = [0, 0, 0, 1]),
    (I.render.canvas.defaultTextAlign = 'center'),
    (I.render.canvas.defaultTextBaseline = 'middle'),
    (I.render.canvas.defaultPadding = [0, 0, 0, 0]),
    (I.render.canvas.defaultLineWidth = 1),
    (I.render.canvas.labelCache = new I.structs.LRUCache()),
    (I.render.canvas.checkedFonts_ = {}),
    (I.render.canvas.measureContext_ = null),
    (I.render.canvas.textHeights_ = {}),
    (I.render.canvas.checkFont = (function () {
      var t,
        e,
        n = I.render.canvas.checkedFonts_,
        i = I.render.canvas.labelCache,
        r = 'wmytzilWMYTZIL@#/&?$%10';
      function o(t) {
        var n = I.render.canvas.getMeasureContext();
        (n.font = '32px monospace'), (e = n.measureText(r).width);
        var i = !0;
        'monospace' != t &&
          ((n.font = '32px ' + t + ',monospace'),
          (i = n.measureText(r).width != e));
        return i;
      }
      function s() {
        var e = !0;
        for (var r in n)
          n[r] < 60 &&
            (o(r)
              ? ((n[r] = 60),
                I.obj.clear(I.render.canvas.textHeights_),
                (I.render.canvas.measureContext_ = null),
                i.clear())
              : (++n[r], (e = !1)));
        e && (window.clearInterval(t), (t = void 0));
      }
      return function (e) {
        var i = I.css.getFontFamilies(e);
        if (i)
          for (var r = 0, a = i.length; r < a; ++r) {
            var l = i[r];
            l in n ||
              ((n[l] = 60),
              o(l) ||
                ((n[l] = 0), void 0 === t && (t = window.setInterval(s, 32))));
          }
      };
    })()),
    (I.render.canvas.getMeasureContext = function () {
      var t = I.render.canvas.measureContext_;
      return (
        t ||
          (t = I.render.canvas.measureContext_ =
            I.dom.createCanvasContext2D(1, 1)),
        t
      );
    }),
    (I.render.canvas.measureTextHeight =
      ((R = I.render.canvas.textHeights_),
      function (t) {
        var e = R[t];
        return null == e && (e = R[t] = 19), e;
      })),
    (I.render.canvas.measureTextWidth = function (t, e) {
      var n = I.render.canvas.getMeasureContext();
      return t != n.font && (n.font = t), n.measureText(e).width;
    }),
    (I.render.canvas.rotateAtOffset = function (t, e, n, i) {
      0 !== e && (t.translate(n, i), t.rotate(e), t.translate(-n, -i));
    }),
    (I.render.canvas.resetTransform_ = I.transform.create()),
    (I.render.canvas.drawImage = function (t, e, n, i, r, o, s, a, l, h, c) {
      var u;
      1 != n && ((u = t.globalAlpha), (t.globalAlpha = u * n)),
        e && t.setTransform.apply(t, e),
        t.drawImage(i, r, o, s, a, l, h, s * c, a * c),
        u && (t.globalAlpha = u),
        e && t.setTransform.apply(t, I.render.canvas.resetTransform_);
    }),
    (I.render.canvas.Instruction = {
      BEGIN_GEOMETRY: 0,
      BEGIN_PATH: 1,
      CIRCLE: 2,
      CLOSE_PATH: 3,
      CUSTOM: 4,
      DRAW_CHARS: 5,
      DRAW_IMAGE: 6,
      END_GEOMETRY: 7,
      FILL: 8,
      MOVE_TO_LINE_TO: 9,
      SET_FILL_STYLE: 10,
      SET_STROKE_STYLE: 11,
      STROKE: 12,
    }),
    (I.render.replay = {}),
    (I.render.replay.ORDER = [
      I.render.ReplayType.POLYGON,
      I.render.ReplayType.CIRCLE,
      I.render.ReplayType.LINE_STRING,
      I.render.ReplayType.IMAGE,
      I.render.ReplayType.TEXT,
      I.render.ReplayType.DEFAULT,
    ]),
    (I.render.replay.TEXT_ALIGN = {}),
    (I.render.replay.TEXT_ALIGN.left = 0),
    (I.render.replay.TEXT_ALIGN.end = 0),
    (I.render.replay.TEXT_ALIGN.center = 0.5),
    (I.render.replay.TEXT_ALIGN.right = 1),
    (I.render.replay.TEXT_ALIGN.start = 1),
    (I.render.replay.TEXT_ALIGN.top = 0),
    (I.render.replay.TEXT_ALIGN.middle = 0.5),
    (I.render.replay.TEXT_ALIGN.hanging = 0.2),
    (I.render.replay.TEXT_ALIGN.alphabetic = 0.8),
    (I.render.replay.TEXT_ALIGN.ideographic = 0.8),
    (I.render.replay.TEXT_ALIGN.bottom = 1),
    (I.render.canvas.Replay = function (t, e, n, i, r, o) {
      I.render.VectorContext.call(this),
        (this.declutterTree = o),
        (this.tmpExtent_ = I.extent.createEmpty()),
        (this.tolerance = t),
        (this.maxExtent = e),
        (this.overlaps = r),
        (this.pixelRatio = i),
        (this.maxLineWidth = 0),
        (this.resolution = n),
        this.fillOrigin_,
        (this.beginGeometryInstruction1_ = null),
        (this.beginGeometryInstruction2_ = null),
        (this.bufferedMaxExtent_ = null),
        (this.instructions = []),
        (this.coordinates = []),
        (this.coordinateCache_ = {}),
        (this.renderedTransform_ = I.transform.create()),
        (this.hitDetectionInstructions = []),
        (this.pixelCoordinates_ = null),
        (this.state = {}),
        (this.viewRotation_ = 0),
        (this.tmpLocalTransform_ = I.transform.create()),
        (this.resetTransform_ = I.transform.create());
    }),
    I.inherits(I.render.canvas.Replay, I.render.VectorContext),
    (I.render.canvas.Replay.prototype.replayTextBackground_ = function (
      t,
      e,
      n,
      i,
      r,
      o,
      s,
    ) {
      t.beginPath(),
        t.moveTo.apply(t, e),
        t.lineTo.apply(t, n),
        t.lineTo.apply(t, i),
        t.lineTo.apply(t, r),
        t.lineTo.apply(t, e),
        o && ((this.fillOrigin_ = o[2]), this.fill_(t)),
        s && (this.setStrokeStyle_(t, s), t.stroke());
    }),
    (I.render.canvas.Replay.prototype.replayImage_ = function (
      t,
      e,
      n,
      i,
      r,
      o,
      s,
      a,
      l,
      h,
      c,
      u,
      d,
      f,
      g,
      p,
      y,
      m,
    ) {
      var v = y || m,
        _ = this.tmpLocalTransform_;
      (e -= r *= d),
        (n -= o *= d),
        f && ((e = Math.round(e)), (n = Math.round(n)));
      var S,
        x,
        C,
        T,
        R = g + h > i.width ? i.width - h : g,
        L = a + c > i.height ? i.height - c : a,
        E = this.tmpExtent_,
        O = p[3] + R * d + p[1],
        G = p[0] + L * d + p[2],
        M = e - p[3],
        F = n - p[0];
      (v || 0 !== u) &&
        ((S = [M, F]),
        (x = [M + O, F]),
        (C = [M + O, F + G]),
        (T = [M, F + G]));
      var w = null;
      if (0 !== u) {
        var P = e + r,
          k = n + o;
        (w = I.transform.compose(_, P, k, 1, 1, u, -P, -k)),
          I.extent.createOrUpdateEmpty(E),
          I.extent.extendCoordinate(E, I.transform.apply(_, S)),
          I.extent.extendCoordinate(E, I.transform.apply(_, x)),
          I.extent.extendCoordinate(E, I.transform.apply(_, C)),
          I.extent.extendCoordinate(E, I.transform.apply(_, T));
      } else I.extent.createOrUpdate(M, F, M + O, F + G, E);
      var D = t.canvas,
        A = E[0] <= D.width && E[2] >= 0 && E[1] <= D.height && E[3] >= 0;
      if (s) {
        if (!A && 1 == s[4]) return;
        I.extent.extend(s, E);
        var b = A
          ? [t, w ? w.slice(0) : null, l, i, h, c, R, L, e, n, d]
          : null;
        b && v && b.push(y, m, S, x, C, T), s.push(b);
      } else
        A &&
          (v && this.replayTextBackground_(t, S, x, C, T, y, m),
          I.render.canvas.drawImage(t, w, l, i, h, c, R, L, e, n, d));
    }),
    (I.render.canvas.Replay.prototype.applyPixelRatio = function (t) {
      var e = this.pixelRatio;
      return 1 == e
        ? t
        : t.map(function (t) {
            return t * e;
          });
    }),
    (I.render.canvas.Replay.prototype.appendFlatCoordinates = function (
      t,
      e,
      n,
      i,
      r,
      o,
    ) {
      var s = this.coordinates.length,
        a = this.getBufferedMaxExtent();
      o && (e += i);
      var l,
        h,
        c,
        u = [t[e], t[e + 1]],
        d = [NaN, NaN],
        f = !0;
      for (l = e + i; l < n; l += i)
        (d[0] = t[l]),
          (d[1] = t[l + 1]),
          (c = I.extent.coordinateRelationship(a, d)) !== h
            ? (f &&
                ((this.coordinates[s++] = u[0]),
                (this.coordinates[s++] = u[1])),
              (this.coordinates[s++] = d[0]),
              (this.coordinates[s++] = d[1]),
              (f = !1))
            : c === I.extent.Relationship.INTERSECTING
            ? ((this.coordinates[s++] = d[0]),
              (this.coordinates[s++] = d[1]),
              (f = !1))
            : (f = !0),
          (u[0] = d[0]),
          (u[1] = d[1]),
          (h = c);
      return (
        ((r && f) || l === e + i) &&
          ((this.coordinates[s++] = u[0]), (this.coordinates[s++] = u[1])),
        s
      );
    }),
    (I.render.canvas.Replay.prototype.drawCustomCoordinates_ = function (
      t,
      e,
      n,
      i,
      r,
    ) {
      for (var o = 0, s = n.length; o < s; ++o) {
        var a = n[o],
          l = this.appendFlatCoordinates(t, e, a, i, !1, !1);
        r.push(l), (e = a);
      }
      return e;
    }),
    (I.render.canvas.Replay.prototype.drawCustom = function (t, e, n) {
      this.beginGeometry(t, e);
      var i,
        r,
        o,
        s,
        a,
        l = t.getType(),
        h = t.getStride(),
        c = this.coordinates.length;
      if (l == I.geom.GeometryType.MULTI_POLYGON) {
        (i = (t = t).getOrientedFlatCoordinates()), (s = []);
        var u = t.getEndss();
        a = 0;
        for (var d = 0, f = u.length; d < f; ++d) {
          var g = [];
          (a = this.drawCustomCoordinates_(i, a, u[d], h, g)), s.push(g);
        }
        this.instructions.push([
          I.render.canvas.Instruction.CUSTOM,
          c,
          s,
          t,
          n,
          I.geom.flat.inflate.coordinatesss,
        ]);
      } else
        l == I.geom.GeometryType.POLYGON ||
        l == I.geom.GeometryType.MULTI_LINE_STRING
          ? ((o = []),
            (i =
              l == I.geom.GeometryType.POLYGON
                ? t.getOrientedFlatCoordinates()
                : t.getFlatCoordinates()),
            (a = this.drawCustomCoordinates_(i, 0, t.getEnds(), h, o)),
            this.instructions.push([
              I.render.canvas.Instruction.CUSTOM,
              c,
              o,
              t,
              n,
              I.geom.flat.inflate.coordinatess,
            ]))
          : l == I.geom.GeometryType.LINE_STRING ||
            l == I.geom.GeometryType.MULTI_POINT
          ? ((i = t.getFlatCoordinates()),
            (r = this.appendFlatCoordinates(i, 0, i.length, h, !1, !1)),
            this.instructions.push([
              I.render.canvas.Instruction.CUSTOM,
              c,
              r,
              t,
              n,
              I.geom.flat.inflate.coordinates,
            ]))
          : l == I.geom.GeometryType.POINT &&
            ((i = t.getFlatCoordinates()),
            this.coordinates.push(i[0], i[1]),
            (r = this.coordinates.length),
            this.instructions.push([
              I.render.canvas.Instruction.CUSTOM,
              c,
              r,
              t,
              n,
            ]));
      this.endGeometry(t, e);
    }),
    (I.render.canvas.Replay.prototype.beginGeometry = function (t, e) {
      (this.beginGeometryInstruction1_ = [
        I.render.canvas.Instruction.BEGIN_GEOMETRY,
        e,
        0,
      ]),
        this.instructions.push(this.beginGeometryInstruction1_),
        (this.beginGeometryInstruction2_ = [
          I.render.canvas.Instruction.BEGIN_GEOMETRY,
          e,
          0,
        ]),
        this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
    }),
    (I.render.canvas.Replay.prototype.fill_ = function (t) {
      if (this.fillOrigin_) {
        var e = I.transform.apply(
          this.renderedTransform_,
          this.fillOrigin_.slice(),
        );
        t.translate(e[0], e[1]), t.rotate(this.viewRotation_);
      }
      t.fill(),
        this.fillOrigin_ &&
          t.setTransform.apply(t, I.render.canvas.resetTransform_);
    }),
    (I.render.canvas.Replay.prototype.setStrokeStyle_ = function (t, e) {
      (t.strokeStyle = e[1]),
        (t.lineWidth = e[2]),
        (t.lineCap = e[3]),
        (t.lineJoin = e[4]),
        (t.miterLimit = e[5]),
        I.has.CANVAS_LINE_DASH &&
          ((t.lineDashOffset = e[7]), t.setLineDash(e[6]));
    }),
    (I.render.canvas.Replay.prototype.renderDeclutter_ = function (t, e) {
      if (t && t.length > 5) {
        var n = t[4];
        if (1 == n || n == t.length - 5) {
          var i = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3], value: e };
          if (!this.declutterTree.collides(i)) {
            this.declutterTree.insert(i);
            for (
              var r = I.render.canvas.drawImage, o = 5, s = t.length;
              o < s;
              ++o
            ) {
              var a = t[o];
              a &&
                (a.length > 11 &&
                  this.replayTextBackground_(
                    a[0],
                    a[13],
                    a[14],
                    a[15],
                    a[16],
                    a[11],
                    a[12],
                  ),
                r.apply(void 0, a));
            }
          }
          (t.length = 5), I.extent.createOrUpdateEmpty(t);
        }
      }
    }),
    (I.render.canvas.Replay.prototype.replay_ = function (t, e, n, i, r, o) {
      var s;
      this.pixelCoordinates_ && I.array.equals(e, this.renderedTransform_)
        ? (s = this.pixelCoordinates_)
        : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []),
          (s = I.geom.flat.transform.transform2D(
            this.coordinates,
            0,
            this.coordinates.length,
            2,
            e,
            this.pixelCoordinates_,
          )),
          I.transform.setFromArray(this.renderedTransform_, e));
      for (
        var a,
          l,
          h,
          c,
          u,
          d,
          f,
          g,
          p,
          y = !I.obj.isEmpty(n),
          m = 0,
          v = i.length,
          _ = 0,
          S = 0,
          x = 0,
          C = null,
          T = null,
          R = this.coordinateCache_,
          L = this.viewRotation_,
          E = {
            context: t,
            pixelRatio: this.pixelRatio,
            resolution: this.resolution,
            rotation: L,
          },
          O = this.instructions != i || this.overlaps ? 0 : 200;
        m < v;

      ) {
        var G,
          M,
          F,
          w = i[m];
        switch (w[0]) {
          case I.render.canvas.Instruction.BEGIN_GEOMETRY:
            (G = w[1]),
              (y && n[I.getUid(G).toString()]) || !G.getGeometry()
                ? (m = w[2])
                : void 0 === o ||
                  I.extent.intersects(o, G.getGeometry().getExtent())
                ? ++m
                : (m = w[2] + 1);
            break;
          case I.render.canvas.Instruction.BEGIN_PATH:
            S > O && (this.fill_(t), (S = 0)),
              x > O && (t.stroke(), (x = 0)),
              S || x || (t.beginPath(), (c = u = NaN)),
              ++m;
            break;
          case I.render.canvas.Instruction.CIRCLE:
            var P = s[(_ = w[1])],
              k = s[_ + 1],
              D = s[_ + 2] - P,
              A = s[_ + 3] - k,
              b = Math.sqrt(D * D + A * A);
            t.moveTo(P + b, k), t.arc(P, k, b, 0, 2 * Math.PI, !0), ++m;
            break;
          case I.render.canvas.Instruction.CLOSE_PATH:
            t.closePath(), ++m;
            break;
          case I.render.canvas.Instruction.CUSTOM:
            (_ = w[1]), (a = w[2]);
            var N = w[3],
              Y = w[4],
              X = 6 == w.length ? w[5] : void 0;
            (E.geometry = N), (E.feature = G), m in R || (R[m] = []);
            var B = R[m];
            X
              ? X(s, _, a, 2, B)
              : ((B[0] = s[_]), (B[1] = s[_ + 1]), (B.length = 2)),
              Y(B, E),
              ++m;
            break;
          case I.render.canvas.Instruction.DRAW_IMAGE:
            (_ = w[1]),
              (a = w[2]),
              (p = w[3]),
              (l = w[4]),
              (h = w[5]),
              (g = r ? null : w[6]);
            var W,
              U,
              V,
              z = w[7],
              H = w[8],
              j = w[9],
              K = w[10],
              Z = w[11],
              q = w[12],
              J = w[13],
              $ = w[14],
              Q = w[15];
            for (
              w.length > 16
                ? ((W = w[16]), (U = w[17]), (V = w[18]))
                : ((W = I.render.canvas.defaultPadding), (U = V = !1)),
                Z && (q += L);
              _ < a;
              _ += 2
            )
              this.replayImage_(
                t,
                s[_],
                s[_ + 1],
                p,
                l,
                h,
                g,
                z,
                H,
                j,
                K,
                q,
                J,
                $,
                Q,
                W,
                U ? C : null,
                V ? T : null,
              );
            this.renderDeclutter_(g, G), ++m;
            break;
          case I.render.canvas.Instruction.DRAW_CHARS:
            var tt = w[1],
              et = w[2],
              nt = w[3];
            g = r ? null : w[4];
            var it = w[5],
              rt = w[6],
              ot = w[7],
              st = w[8],
              at = w[9],
              lt = w[10],
              ht = w[11],
              ct = w[12],
              ut = w[13],
              dt = w[14],
              ft = I.geom.flat.length.lineString(s, tt, et, 2),
              gt = st(ct);
            if (it || gt <= ft) {
              var pt = this.textStates[ut].textAlign,
                yt = (ft - gt) * I.render.replay.TEXT_ALIGN[pt],
                mt = I.geom.flat.textpath.lineString(
                  s,
                  tt,
                  et,
                  2,
                  ct,
                  st,
                  yt,
                  ot,
                );
              if (mt) {
                var vt, _t, St, xt, It;
                if (lt)
                  for (vt = 0, _t = mt.length; vt < _t; ++vt)
                    (St = (It = mt[vt])[4]),
                      (xt = this.getImage(St, ut, '', lt)),
                      (l = It[2] + ht),
                      (h = nt * xt.height + 2 * (0.5 - nt) * ht - at),
                      this.replayImage_(
                        t,
                        It[0],
                        It[1],
                        xt,
                        l,
                        h,
                        g,
                        xt.height,
                        1,
                        0,
                        0,
                        It[3],
                        dt,
                        !1,
                        xt.width,
                        I.render.canvas.defaultPadding,
                        null,
                        null,
                      );
                if (rt)
                  for (vt = 0, _t = mt.length; vt < _t; ++vt)
                    (St = (It = mt[vt])[4]),
                      (xt = this.getImage(St, ut, rt, '')),
                      (l = It[2]),
                      (h = nt * xt.height - at),
                      this.replayImage_(
                        t,
                        It[0],
                        It[1],
                        xt,
                        l,
                        h,
                        g,
                        xt.height,
                        1,
                        0,
                        0,
                        It[3],
                        dt,
                        !1,
                        xt.width,
                        I.render.canvas.defaultPadding,
                        null,
                        null,
                      );
              }
            }
            this.renderDeclutter_(g, G), ++m;
            break;
          case I.render.canvas.Instruction.END_GEOMETRY:
            if (void 0 !== r) {
              var Ct = r((G = w[1]));
              if (Ct) return Ct;
            }
            ++m;
            break;
          case I.render.canvas.Instruction.FILL:
            O ? S++ : this.fill_(t), ++m;
            break;
          case I.render.canvas.Instruction.MOVE_TO_LINE_TO:
            for (
              _ = w[1],
                a = w[2],
                M = s[_],
                f = ((F = s[_ + 1]) + 0.5) | 0,
                ((d = (M + 0.5) | 0) === c && f === u) ||
                  (t.moveTo(M, F), (c = d), (u = f)),
                _ += 2;
              _ < a;
              _ += 2
            )
              (d = ((M = s[_]) + 0.5) | 0),
                (f = ((F = s[_ + 1]) + 0.5) | 0),
                (_ != a - 2 && d === c && f === u) ||
                  (t.lineTo(M, F), (c = d), (u = f));
            ++m;
            break;
          case I.render.canvas.Instruction.SET_FILL_STYLE:
            (C = w),
              (this.fillOrigin_ = w[2]),
              S && (this.fill_(t), (S = 0), x && (t.stroke(), (x = 0))),
              (t.fillStyle = w[1]),
              ++m;
            break;
          case I.render.canvas.Instruction.SET_STROKE_STYLE:
            (T = w),
              x && (t.stroke(), (x = 0)),
              this.setStrokeStyle_(t, w),
              ++m;
            break;
          case I.render.canvas.Instruction.STROKE:
            O ? x++ : t.stroke(), ++m;
            break;
          default:
            ++m;
        }
      }
      S && this.fill_(t), x && t.stroke();
    }),
    (I.render.canvas.Replay.prototype.replay = function (t, e, n, i) {
      (this.viewRotation_ = n),
        this.replay_(t, e, i, this.instructions, void 0, void 0);
    }),
    (I.render.canvas.Replay.prototype.replayHitDetection = function (
      t,
      e,
      n,
      i,
      r,
      o,
    ) {
      return (
        (this.viewRotation_ = n),
        this.replay_(t, e, i, this.hitDetectionInstructions, r, o)
      );
    }),
    (I.render.canvas.Replay.prototype.reverseHitDetectionInstructions =
      function () {
        var t,
          e = this.hitDetectionInstructions;
        e.reverse();
        var n,
          i,
          r = e.length,
          o = -1;
        for (t = 0; t < r; ++t)
          (i = (n = e[t])[0]) == I.render.canvas.Instruction.END_GEOMETRY
            ? (o = t)
            : i == I.render.canvas.Instruction.BEGIN_GEOMETRY &&
              ((n[2] = t),
              I.array.reverseSubArray(this.hitDetectionInstructions, o, t),
              (o = -1));
      }),
    (I.render.canvas.Replay.prototype.setFillStrokeStyle = function (t, e) {
      var n = this.state;
      if (t) {
        var i = t.getColor();
        n.fillStyle = I.colorlike.asColorLike(
          i || I.render.canvas.defaultFillStyle,
        );
      } else n.fillStyle = void 0;
      if (e) {
        var r = e.getColor();
        n.strokeStyle = I.colorlike.asColorLike(
          r || I.render.canvas.defaultStrokeStyle,
        );
        var o = e.getLineCap();
        n.lineCap = void 0 !== o ? o : I.render.canvas.defaultLineCap;
        var s = e.getLineDash();
        n.lineDash = s ? s.slice() : I.render.canvas.defaultLineDash;
        var a = e.getLineDashOffset();
        n.lineDashOffset = a || I.render.canvas.defaultLineDashOffset;
        var l = e.getLineJoin();
        n.lineJoin = void 0 !== l ? l : I.render.canvas.defaultLineJoin;
        var h = e.getWidth();
        n.lineWidth = void 0 !== h ? h : I.render.canvas.defaultLineWidth;
        var c = e.getMiterLimit();
        (n.miterLimit = void 0 !== c ? c : I.render.canvas.defaultMiterLimit),
          n.lineWidth > this.maxLineWidth &&
            ((this.maxLineWidth = n.lineWidth),
            (this.bufferedMaxExtent_ = null));
      } else
        (n.strokeStyle = void 0),
          (n.lineCap = void 0),
          (n.lineDash = null),
          (n.lineDashOffset = void 0),
          (n.lineJoin = void 0),
          (n.lineWidth = void 0),
          (n.miterLimit = void 0);
    }),
    (I.render.canvas.Replay.prototype.applyFill = function (t, e) {
      var n = t.fillStyle,
        i = [I.render.canvas.Instruction.SET_FILL_STYLE, n];
      if ('string' != typeof n) {
        var r = e.getExtent();
        i.push([r[0], r[3]]);
      }
      this.instructions.push(i);
    }),
    (I.render.canvas.Replay.prototype.applyStroke = function (t) {
      this.instructions.push([
        I.render.canvas.Instruction.SET_STROKE_STYLE,
        t.strokeStyle,
        t.lineWidth * this.pixelRatio,
        t.lineCap,
        t.lineJoin,
        t.miterLimit,
        this.applyPixelRatio(t.lineDash),
        t.lineDashOffset * this.pixelRatio,
      ]);
    }),
    (I.render.canvas.Replay.prototype.updateFillStyle = function (t, e, n) {
      var i = t.fillStyle;
      ('string' == typeof i && t.currentFillStyle == i) ||
        (e.call(this, t, n), (t.currentFillStyle = i));
    }),
    (I.render.canvas.Replay.prototype.updateStrokeStyle = function (t, e) {
      var n = t.strokeStyle,
        i = t.lineCap,
        r = t.lineDash,
        o = t.lineDashOffset,
        s = t.lineJoin,
        a = t.lineWidth,
        l = t.miterLimit;
      (t.currentStrokeStyle != n ||
        t.currentLineCap != i ||
        (r != t.currentLineDash && !I.array.equals(t.currentLineDash, r)) ||
        t.currentLineDashOffset != o ||
        t.currentLineJoin != s ||
        t.currentLineWidth != a ||
        t.currentMiterLimit != l) &&
        (e.call(this, t),
        (t.currentStrokeStyle = n),
        (t.currentLineCap = i),
        (t.currentLineDash = r),
        (t.currentLineDashOffset = o),
        (t.currentLineJoin = s),
        (t.currentLineWidth = a),
        (t.currentMiterLimit = l));
    }),
    (I.render.canvas.Replay.prototype.endGeometry = function (t, e) {
      (this.beginGeometryInstruction1_[2] = this.instructions.length),
        (this.beginGeometryInstruction1_ = null),
        (this.beginGeometryInstruction2_[2] =
          this.hitDetectionInstructions.length),
        (this.beginGeometryInstruction2_ = null);
      var n = [I.render.canvas.Instruction.END_GEOMETRY, e];
      this.instructions.push(n), this.hitDetectionInstructions.push(n);
    }),
    (I.render.canvas.Replay.prototype.finish = I.nullFunction),
    (I.render.canvas.Replay.prototype.getBufferedMaxExtent = function () {
      if (
        !this.bufferedMaxExtent_ &&
        ((this.bufferedMaxExtent_ = I.extent.clone(this.maxExtent)),
        this.maxLineWidth > 0)
      ) {
        var t = (this.resolution * (this.maxLineWidth + 1)) / 2;
        I.extent.buffer(this.bufferedMaxExtent_, t, this.bufferedMaxExtent_);
      }
      return this.bufferedMaxExtent_;
    }),
    (I.render.canvas.ImageReplay = function (t, e, n, i, r, o) {
      I.render.canvas.Replay.call(this, t, e, n, i, r, o),
        (this.declutterGroup_ = null),
        (this.hitDetectionImage_ = null),
        (this.image_ = null),
        (this.anchorX_ = void 0),
        (this.anchorY_ = void 0),
        (this.height_ = void 0),
        (this.opacity_ = void 0),
        (this.originX_ = void 0),
        (this.originY_ = void 0),
        (this.rotateWithView_ = void 0),
        (this.rotation_ = void 0),
        (this.scale_ = void 0),
        (this.snapToPixel_ = void 0),
        (this.width_ = void 0);
    }),
    I.inherits(I.render.canvas.ImageReplay, I.render.canvas.Replay),
    (I.render.canvas.ImageReplay.prototype.drawCoordinates_ = function (
      t,
      e,
      n,
      i,
    ) {
      return this.appendFlatCoordinates(t, e, n, i, !1, !1);
    }),
    (I.render.canvas.ImageReplay.prototype.drawPoint = function (t, e) {
      if (this.image_) {
        this.beginGeometry(t, e);
        var n = t.getFlatCoordinates(),
          i = t.getStride(),
          r = this.coordinates.length,
          o = this.drawCoordinates_(n, 0, n.length, i);
        this.instructions.push([
          I.render.canvas.Instruction.DRAW_IMAGE,
          r,
          o,
          this.image_,
          this.anchorX_,
          this.anchorY_,
          this.declutterGroup_,
          this.height_,
          this.opacity_,
          this.originX_,
          this.originY_,
          this.rotateWithView_,
          this.rotation_,
          this.scale_ * this.pixelRatio,
          this.snapToPixel_,
          this.width_,
        ]),
          this.hitDetectionInstructions.push([
            I.render.canvas.Instruction.DRAW_IMAGE,
            r,
            o,
            this.hitDetectionImage_,
            this.anchorX_,
            this.anchorY_,
            this.declutterGroup_,
            this.height_,
            this.opacity_,
            this.originX_,
            this.originY_,
            this.rotateWithView_,
            this.rotation_,
            this.scale_,
            this.snapToPixel_,
            this.width_,
          ]),
          this.endGeometry(t, e);
      }
    }),
    (I.render.canvas.ImageReplay.prototype.drawMultiPoint = function (t, e) {
      if (this.image_) {
        this.beginGeometry(t, e);
        var n = t.getFlatCoordinates(),
          i = t.getStride(),
          r = this.coordinates.length,
          o = this.drawCoordinates_(n, 0, n.length, i);
        this.instructions.push([
          I.render.canvas.Instruction.DRAW_IMAGE,
          r,
          o,
          this.image_,
          this.anchorX_,
          this.anchorY_,
          this.declutterGroup_,
          this.height_,
          this.opacity_,
          this.originX_,
          this.originY_,
          this.rotateWithView_,
          this.rotation_,
          this.scale_ * this.pixelRatio,
          this.snapToPixel_,
          this.width_,
        ]),
          this.hitDetectionInstructions.push([
            I.render.canvas.Instruction.DRAW_IMAGE,
            r,
            o,
            this.hitDetectionImage_,
            this.anchorX_,
            this.anchorY_,
            this.declutterGroup_,
            this.height_,
            this.opacity_,
            this.originX_,
            this.originY_,
            this.rotateWithView_,
            this.rotation_,
            this.scale_,
            this.snapToPixel_,
            this.width_,
          ]),
          this.endGeometry(t, e);
      }
    }),
    (I.render.canvas.ImageReplay.prototype.finish = function () {
      this.reverseHitDetectionInstructions(),
        (this.anchorX_ = void 0),
        (this.anchorY_ = void 0),
        (this.hitDetectionImage_ = null),
        (this.image_ = null),
        (this.height_ = void 0),
        (this.scale_ = void 0),
        (this.opacity_ = void 0),
        (this.originX_ = void 0),
        (this.originY_ = void 0),
        (this.rotateWithView_ = void 0),
        (this.rotation_ = void 0),
        (this.snapToPixel_ = void 0),
        (this.width_ = void 0);
    }),
    (I.render.canvas.ImageReplay.prototype.setImageStyle = function (t, e) {
      var n = t.getAnchor(),
        i = t.getSize(),
        r = t.getHitDetectionImage(1),
        o = t.getImage(1),
        s = t.getOrigin();
      (this.anchorX_ = n[0]),
        (this.anchorY_ = n[1]),
        (this.declutterGroup_ = e),
        (this.hitDetectionImage_ = r),
        (this.image_ = o),
        (this.height_ = i[1]),
        (this.opacity_ = t.getOpacity()),
        (this.originX_ = s[0]),
        (this.originY_ = s[1]),
        (this.rotateWithView_ = t.getRotateWithView()),
        (this.rotation_ = t.getRotation()),
        (this.scale_ = t.getScale()),
        (this.snapToPixel_ = t.getSnapToPixel()),
        (this.width_ = i[0]);
    }),
    (I.render.canvas.LineStringReplay = function (t, e, n, i, r, o) {
      I.render.canvas.Replay.call(this, t, e, n, i, r, o);
    }),
    I.inherits(I.render.canvas.LineStringReplay, I.render.canvas.Replay),
    (I.render.canvas.LineStringReplay.prototype.drawFlatCoordinates_ =
      function (t, e, n, i) {
        var r = this.coordinates.length,
          o = this.appendFlatCoordinates(t, e, n, i, !1, !1),
          s = [I.render.canvas.Instruction.MOVE_TO_LINE_TO, r, o];
        return (
          this.instructions.push(s), this.hitDetectionInstructions.push(s), n
        );
      }),
    (I.render.canvas.LineStringReplay.prototype.drawLineString = function (
      t,
      e,
    ) {
      var n = this.state,
        i = n.strokeStyle,
        r = n.lineWidth;
      if (void 0 !== i && void 0 !== r) {
        this.updateStrokeStyle(n, this.applyStroke),
          this.beginGeometry(t, e),
          this.hitDetectionInstructions.push(
            [
              I.render.canvas.Instruction.SET_STROKE_STYLE,
              n.strokeStyle,
              n.lineWidth,
              n.lineCap,
              n.lineJoin,
              n.miterLimit,
              n.lineDash,
              n.lineDashOffset,
            ],
            [I.render.canvas.Instruction.BEGIN_PATH],
          );
        var o = t.getFlatCoordinates(),
          s = t.getStride();
        this.drawFlatCoordinates_(o, 0, o.length, s),
          this.hitDetectionInstructions.push([
            I.render.canvas.Instruction.STROKE,
          ]),
          this.endGeometry(t, e);
      }
    }),
    (I.render.canvas.LineStringReplay.prototype.drawMultiLineString = function (
      t,
      e,
    ) {
      var n = this.state,
        i = n.strokeStyle,
        r = n.lineWidth;
      if (void 0 !== i && void 0 !== r) {
        this.updateStrokeStyle(n, this.applyStroke),
          this.beginGeometry(t, e),
          this.hitDetectionInstructions.push(
            [
              I.render.canvas.Instruction.SET_STROKE_STYLE,
              n.strokeStyle,
              n.lineWidth,
              n.lineCap,
              n.lineJoin,
              n.miterLimit,
              n.lineDash,
              n.lineDashOffset,
            ],
            [I.render.canvas.Instruction.BEGIN_PATH],
          );
        var o,
          s,
          a = t.getEnds(),
          l = t.getFlatCoordinates(),
          h = t.getStride(),
          c = 0;
        for (o = 0, s = a.length; o < s; ++o)
          c = this.drawFlatCoordinates_(l, c, a[o], h);
        this.hitDetectionInstructions.push([
          I.render.canvas.Instruction.STROKE,
        ]),
          this.endGeometry(t, e);
      }
    }),
    (I.render.canvas.LineStringReplay.prototype.finish = function () {
      var t = this.state;
      null != t.lastStroke &&
        t.lastStroke != this.coordinates.length &&
        this.instructions.push([I.render.canvas.Instruction.STROKE]),
        this.reverseHitDetectionInstructions(),
        (this.state = null);
    }),
    (I.render.canvas.LineStringReplay.prototype.applyStroke = function (t) {
      null != t.lastStroke &&
        t.lastStroke != this.coordinates.length &&
        (this.instructions.push([I.render.canvas.Instruction.STROKE]),
        (t.lastStroke = this.coordinates.length)),
        (t.lastStroke = 0),
        I.render.canvas.Replay.prototype.applyStroke.call(this, t),
        this.instructions.push([I.render.canvas.Instruction.BEGIN_PATH]);
    }),
    (I.render.canvas.PolygonReplay = function (t, e, n, i, r, o) {
      I.render.canvas.Replay.call(this, t, e, n, i, r, o);
    }),
    I.inherits(I.render.canvas.PolygonReplay, I.render.canvas.Replay),
    (I.render.canvas.PolygonReplay.prototype.drawFlatCoordinatess_ = function (
      t,
      e,
      n,
      i,
    ) {
      var r = this.state,
        o = void 0 !== r.fillStyle,
        s = null != r.strokeStyle,
        a = n.length,
        l = [I.render.canvas.Instruction.BEGIN_PATH];
      this.instructions.push(l), this.hitDetectionInstructions.push(l);
      for (var h = 0; h < a; ++h) {
        var c = n[h],
          u = this.coordinates.length,
          d = this.appendFlatCoordinates(t, e, c, i, !0, !s),
          f = [I.render.canvas.Instruction.MOVE_TO_LINE_TO, u, d];
        if (
          (this.instructions.push(f), this.hitDetectionInstructions.push(f), s)
        ) {
          var g = [I.render.canvas.Instruction.CLOSE_PATH];
          this.instructions.push(g), this.hitDetectionInstructions.push(g);
        }
        e = c;
      }
      var p = [I.render.canvas.Instruction.FILL];
      if (
        (this.hitDetectionInstructions.push(p),
        o && this.instructions.push(p),
        s)
      ) {
        var y = [I.render.canvas.Instruction.STROKE];
        this.instructions.push(y), this.hitDetectionInstructions.push(y);
      }
      return e;
    }),
    (I.render.canvas.PolygonReplay.prototype.drawCircle = function (t, e) {
      var n = this.state,
        i = n.fillStyle,
        r = n.strokeStyle;
      if (void 0 !== i || void 0 !== r) {
        this.setFillStrokeStyles_(t),
          this.beginGeometry(t, e),
          this.hitDetectionInstructions.push([
            I.render.canvas.Instruction.SET_FILL_STYLE,
            I.color.asString(I.render.canvas.defaultFillStyle),
          ]),
          void 0 !== n.strokeStyle &&
            this.hitDetectionInstructions.push([
              I.render.canvas.Instruction.SET_STROKE_STYLE,
              n.strokeStyle,
              n.lineWidth,
              n.lineCap,
              n.lineJoin,
              n.miterLimit,
              n.lineDash,
              n.lineDashOffset,
            ]);
        var o = t.getFlatCoordinates(),
          s = t.getStride(),
          a = this.coordinates.length;
        this.appendFlatCoordinates(o, 0, o.length, s, !1, !1);
        var l = [I.render.canvas.Instruction.BEGIN_PATH],
          h = [I.render.canvas.Instruction.CIRCLE, a];
        this.instructions.push(l, h), this.hitDetectionInstructions.push(l, h);
        var c = [I.render.canvas.Instruction.FILL];
        if (
          (this.hitDetectionInstructions.push(c),
          void 0 !== n.fillStyle && this.instructions.push(c),
          void 0 !== n.strokeStyle)
        ) {
          var u = [I.render.canvas.Instruction.STROKE];
          this.instructions.push(u), this.hitDetectionInstructions.push(u);
        }
        this.endGeometry(t, e);
      }
    }),
    (I.render.canvas.PolygonReplay.prototype.drawPolygon = function (t, e) {
      var n = this.state;
      this.setFillStrokeStyles_(t),
        this.beginGeometry(t, e),
        this.hitDetectionInstructions.push([
          I.render.canvas.Instruction.SET_FILL_STYLE,
          I.color.asString(I.render.canvas.defaultFillStyle),
        ]),
        void 0 !== n.strokeStyle &&
          this.hitDetectionInstructions.push([
            I.render.canvas.Instruction.SET_STROKE_STYLE,
            n.strokeStyle,
            n.lineWidth,
            n.lineCap,
            n.lineJoin,
            n.miterLimit,
            n.lineDash,
            n.lineDashOffset,
          ]);
      var i = t.getEnds(),
        r = t.getOrientedFlatCoordinates(),
        o = t.getStride();
      this.drawFlatCoordinatess_(r, 0, i, o), this.endGeometry(t, e);
    }),
    (I.render.canvas.PolygonReplay.prototype.drawMultiPolygon = function (
      t,
      e,
    ) {
      var n = this.state,
        i = n.fillStyle,
        r = n.strokeStyle;
      if (void 0 !== i || void 0 !== r) {
        this.setFillStrokeStyles_(t),
          this.beginGeometry(t, e),
          this.hitDetectionInstructions.push([
            I.render.canvas.Instruction.SET_FILL_STYLE,
            I.color.asString(I.render.canvas.defaultFillStyle),
          ]),
          void 0 !== n.strokeStyle &&
            this.hitDetectionInstructions.push([
              I.render.canvas.Instruction.SET_STROKE_STYLE,
              n.strokeStyle,
              n.lineWidth,
              n.lineCap,
              n.lineJoin,
              n.miterLimit,
              n.lineDash,
              n.lineDashOffset,
            ]);
        var o,
          s,
          a = t.getEndss(),
          l = t.getOrientedFlatCoordinates(),
          h = t.getStride(),
          c = 0;
        for (o = 0, s = a.length; o < s; ++o)
          c = this.drawFlatCoordinatess_(l, c, a[o], h);
        this.endGeometry(t, e);
      }
    }),
    (I.render.canvas.PolygonReplay.prototype.finish = function () {
      this.reverseHitDetectionInstructions(), (this.state = null);
      var t = this.tolerance;
      if (0 !== t) {
        var e,
          n,
          i = this.coordinates;
        for (e = 0, n = i.length; e < n; ++e)
          i[e] = I.geom.flat.simplify.snap(i[e], t);
      }
    }),
    (I.render.canvas.PolygonReplay.prototype.setFillStrokeStyles_ = function (
      t,
    ) {
      var e = this.state;
      void 0 !== e.fillStyle && this.updateFillStyle(e, this.applyFill, t),
        void 0 !== e.strokeStyle && this.updateStrokeStyle(e, this.applyStroke);
    }),
    (I.geom.flat.straightchunk = {}),
    (I.geom.flat.straightchunk.lineString = function (t, e, n, i, r) {
      var o,
        s,
        a,
        l,
        h,
        c,
        u,
        d,
        f,
        g = n,
        p = n,
        y = 0,
        m = 0,
        v = n;
      for (o = n; o < i; o += r) {
        var _ = e[o],
          S = e[o + 1];
        void 0 !== l &&
          ((d = _ - l),
          (f = S - h),
          (a = Math.sqrt(d * d + f * f)),
          void 0 !== c &&
            ((m += s),
            Math.acos((c * d + u * f) / (s * a)) > t &&
              (m > y && ((y = m), (g = v), (p = o)), (m = 0), (v = o - r))),
          (s = a),
          (c = d),
          (u = f)),
          (l = _),
          (h = S);
      }
      return (m += a) > y ? [v, o] : [g, p];
    }),
    (I.style.TextPlacement = { POINT: 'point', LINE: 'line' }),
    (I.render.canvas.TextReplay = function (t, e, n, i, r, o) {
      I.render.canvas.Replay.call(this, t, e, n, i, r, o),
        this.declutterGroup_,
        (this.labels_ = null),
        (this.text_ = ''),
        (this.textOffsetX_ = 0),
        (this.textOffsetY_ = 0),
        (this.textRotateWithView_ = void 0),
        (this.textRotation_ = 0),
        (this.textFillState_ = null),
        (this.fillStates = {}),
        (this.textStrokeState_ = null),
        (this.strokeStates = {}),
        (this.textState_ = {}),
        (this.textStates = {}),
        (this.textKey_ = ''),
        (this.fillKey_ = ''),
        (this.strokeKey_ = ''),
        (this.widths_ = {}),
        I.render.canvas.labelCache.prune();
    }),
    I.inherits(I.render.canvas.TextReplay, I.render.canvas.Replay),
    (I.render.canvas.TextReplay.measureTextWidths = function (t, e, n) {
      var i,
        r,
        o = e.length,
        s = 0;
      for (r = 0; r < o; ++r)
        (i = I.render.canvas.measureTextWidth(t, e[r])),
          (s = Math.max(s, i)),
          n.push(i);
      return s;
    }),
    (I.render.canvas.TextReplay.prototype.drawText = function (t, e) {
      var n = this.textFillState_,
        i = this.textStrokeState_,
        r = this.textState_;
      if ('' !== this.text_ && r && (n || i)) {
        var o,
          s,
          a = this.coordinates.length,
          l = t.getType(),
          h = null,
          c = 2,
          u = 2;
        if (r.placement === I.style.TextPlacement.LINE) {
          if (!I.extent.intersects(this.getBufferedMaxExtent(), t.getExtent()))
            return;
          var d;
          if (
            ((h = t.getFlatCoordinates()),
            (u = t.getStride()),
            l == I.geom.GeometryType.LINE_STRING)
          )
            d = [h.length];
          else if (l == I.geom.GeometryType.MULTI_LINE_STRING) d = t.getEnds();
          else if (l == I.geom.GeometryType.POLYGON)
            d = t.getEnds().slice(0, 1);
          else if (l == I.geom.GeometryType.MULTI_POLYGON) {
            var f = t.getEndss();
            for (d = [], o = 0, s = f.length; o < s; ++o) d.push(f[o][0]);
          }
          this.beginGeometry(t, e);
          for (var g, p = r.textAlign, y = 0, m = 0, v = d.length; m < v; ++m) {
            if (null == p) {
              var _ = I.geom.flat.straightchunk.lineString(
                r.maxAngle,
                h,
                y,
                d[m],
                u,
              );
              (y = _[0]), (g = _[1]);
            } else g = d[m];
            for (o = y; o < g; o += u) this.coordinates.push(h[o], h[o + 1]);
            (c = this.coordinates.length),
              (y = d[m]),
              this.drawChars_(a, c, this.declutterGroup_),
              (a = c);
          }
          this.endGeometry(t, e);
        } else {
          var S = this.getImage(
              this.text_,
              this.textKey_,
              this.fillKey_,
              this.strokeKey_,
            ),
            x = S.width / this.pixelRatio;
          switch (l) {
            case I.geom.GeometryType.POINT:
            case I.geom.GeometryType.MULTI_POINT:
              c = (h = t.getFlatCoordinates()).length;
              break;
            case I.geom.GeometryType.LINE_STRING:
              h = t.getFlatMidpoint();
              break;
            case I.geom.GeometryType.CIRCLE:
              h = t.getCenter();
              break;
            case I.geom.GeometryType.MULTI_LINE_STRING:
              c = (h = t.getFlatMidpoints()).length;
              break;
            case I.geom.GeometryType.POLYGON:
              if (
                ((h = t.getFlatInteriorPoint()),
                !r.overflow && h[2] / this.resolution < x)
              )
                return;
              u = 3;
              break;
            case I.geom.GeometryType.MULTI_POLYGON:
              var C = t.getFlatInteriorPoints();
              for (h = [], o = 0, s = C.length; o < s; o += 3)
                (r.overflow || C[o + 2] / this.resolution >= x) &&
                  h.push(C[o], C[o + 1]);
              if (0 == (c = h.length)) return;
          }
          (c = this.appendFlatCoordinates(h, 0, c, u, !1, !1)),
            this.beginGeometry(t, e),
            (r.backgroundFill || r.backgroundStroke) &&
              (this.setFillStrokeStyle(r.backgroundFill, r.backgroundStroke),
              this.updateFillStyle(this.state, this.applyFill, t),
              this.updateStrokeStyle(this.state, this.applyStroke)),
            this.drawTextImage_(S, a, c),
            this.endGeometry(t, e);
        }
      }
    }),
    (I.render.canvas.TextReplay.prototype.getImage = function (t, e, n, i) {
      var r,
        o = i + e + t + n + this.pixelRatio,
        s = I.render.canvas.labelCache;
      if (!s.containsKey(o)) {
        var a = i ? this.strokeStates[i] || this.textStrokeState_ : null,
          l = n ? this.fillStates[n] || this.textFillState_ : null,
          h = this.textStates[e] || this.textState_,
          c = this.pixelRatio,
          u = h.scale * c,
          d =
            I.render.replay.TEXT_ALIGN[
              h.textAlign || I.render.canvas.defaultTextAlign
            ],
          f = i && a.lineWidth ? a.lineWidth : 0,
          g = t.split('\n'),
          p = g.length,
          y = [],
          m = I.render.canvas.TextReplay.measureTextWidths(h.font, g, y),
          v = I.render.canvas.measureTextHeight(h.font),
          _ = v * p,
          S = m + f,
          x = I.dom.createCanvasContext2D(
            Math.ceil(S * u),
            Math.ceil((_ + f) * u),
          );
        (r = x.canvas),
          s.set(o, r),
          1 != u && x.scale(u, u),
          (x.font = h.font),
          i &&
            ((x.strokeStyle = a.strokeStyle),
            (x.lineWidth = f * (I.has.SAFARI ? u : 1)),
            (x.lineCap = a.lineCap),
            (x.lineJoin = a.lineJoin),
            (x.miterLimit = a.miterLimit),
            I.has.CANVAS_LINE_DASH &&
              a.lineDash.length &&
              (x.setLineDash(a.lineDash),
              (x.lineDashOffset = a.lineDashOffset))),
          n && (x.fillStyle = l.fillStyle),
          (x.textBaseline = 'middle'),
          (x.textAlign = 'center');
        var C,
          T = 0.5 - d,
          R = (d * r.width) / u + T * f;
        if (i)
          for (C = 0; C < p; ++C)
            x.strokeText(g[C], R + T * y[C], 0.5 * (f + v) + C * v);
        if (n)
          for (C = 0; C < p; ++C)
            x.fillText(g[C], R + T * y[C], 0.5 * (f + v) + C * v);
      }
      return s.get(o);
    }),
    (I.render.canvas.TextReplay.prototype.drawTextImage_ = function (t, e, n) {
      var i = this.textState_,
        r = this.textStrokeState_,
        o = this.pixelRatio,
        s =
          I.render.replay.TEXT_ALIGN[
            i.textAlign || I.render.canvas.defaultTextAlign
          ],
        a = I.render.replay.TEXT_ALIGN[i.textBaseline],
        l = r && r.lineWidth ? r.lineWidth : 0,
        h = (s * t.width) / o + 2 * (0.5 - s) * l,
        c = (a * t.height) / o + 2 * (0.5 - a) * l;
      this.instructions.push([
        I.render.canvas.Instruction.DRAW_IMAGE,
        e,
        n,
        t,
        (h - this.textOffsetX_) * o,
        (c - this.textOffsetY_) * o,
        this.declutterGroup_,
        t.height,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        1,
        !0,
        t.width,
        i.padding == I.render.canvas.defaultPadding
          ? I.render.canvas.defaultPadding
          : i.padding.map(function (t) {
              return t * o;
            }),
        !!i.backgroundFill,
        !!i.backgroundStroke,
      ]),
        this.hitDetectionInstructions.push([
          I.render.canvas.Instruction.DRAW_IMAGE,
          e,
          n,
          t,
          (h - this.textOffsetX_) * o,
          (c - this.textOffsetY_) * o,
          this.declutterGroup_,
          t.height,
          1,
          0,
          0,
          this.textRotateWithView_,
          this.textRotation_,
          1 / o,
          !0,
          t.width,
          i.padding,
          !!i.backgroundFill,
          !!i.backgroundStroke,
        ]);
    }),
    (I.render.canvas.TextReplay.prototype.drawChars_ = function (t, e, n) {
      var i = this.textStrokeState_,
        r = this.textState_,
        o = this.textFillState_,
        s = this.strokeKey_;
      i &&
        (s in this.strokeStates ||
          (this.strokeStates[s] = {
            strokeStyle: i.strokeStyle,
            lineCap: i.lineCap,
            lineDashOffset: i.lineDashOffset,
            lineWidth: i.lineWidth,
            lineJoin: i.lineJoin,
            miterLimit: i.miterLimit,
            lineDash: i.lineDash,
          }));
      var a = this.textKey_;
      this.textKey_ in this.textStates ||
        (this.textStates[this.textKey_] = {
          font: r.font,
          textAlign: r.textAlign || I.render.canvas.defaultTextAlign,
          scale: r.scale,
        });
      var l = this.fillKey_;
      o &&
        (l in this.fillStates ||
          (this.fillStates[l] = { fillStyle: o.fillStyle }));
      var h = this.pixelRatio,
        c = I.render.replay.TEXT_ALIGN[r.textBaseline],
        u = this.textOffsetY_ * h,
        d = this.text_,
        f = r.font,
        g = r.scale,
        p = i ? (i.lineWidth * g) / 2 : 0,
        y = this.widths_[f];
      y || (this.widths_[f] = y = {}),
        this.instructions.push([
          I.render.canvas.Instruction.DRAW_CHARS,
          t,
          e,
          c,
          n,
          r.overflow,
          l,
          r.maxAngle,
          function (t) {
            var e = y[t];
            return (
              e || (e = y[t] = I.render.canvas.measureTextWidth(f, t)),
              e * g * h
            );
          },
          u,
          s,
          p * h,
          d,
          a,
          1,
        ]),
        this.hitDetectionInstructions.push([
          I.render.canvas.Instruction.DRAW_CHARS,
          t,
          e,
          c,
          n,
          r.overflow,
          l,
          r.maxAngle,
          function (t) {
            var e = y[t];
            return (
              e || (e = y[t] = I.render.canvas.measureTextWidth(f, t)), e * g
            );
          },
          u,
          s,
          p,
          d,
          a,
          1 / h,
        ]);
    }),
    (I.render.canvas.TextReplay.prototype.setTextStyle = function (t, e) {
      var n, i, r;
      if (t) {
        this.declutterGroup_ = e;
        var o = t.getFill();
        o
          ? ((i = this.textFillState_) || (i = this.textFillState_ = {}),
            (i.fillStyle = I.colorlike.asColorLike(
              o.getColor() || I.render.canvas.defaultFillStyle,
            )))
          : (i = this.textFillState_ = null);
        var s = t.getStroke();
        if (s) {
          (r = this.textStrokeState_) || (r = this.textStrokeState_ = {});
          var a = s.getLineDash(),
            l = s.getLineDashOffset(),
            h = s.getWidth(),
            c = s.getMiterLimit();
          (r.lineCap = s.getLineCap() || I.render.canvas.defaultLineCap),
            (r.lineDash = a ? a.slice() : I.render.canvas.defaultLineDash),
            (r.lineDashOffset =
              void 0 === l ? I.render.canvas.defaultLineDashOffset : l),
            (r.lineJoin = s.getLineJoin() || I.render.canvas.defaultLineJoin),
            (r.lineWidth = void 0 === h ? I.render.canvas.defaultLineWidth : h),
            (r.miterLimit =
              void 0 === c ? I.render.canvas.defaultMiterLimit : c),
            (r.strokeStyle = I.colorlike.asColorLike(
              s.getColor() || I.render.canvas.defaultStrokeStyle,
            ));
        } else r = this.textStrokeState_ = null;
        n = this.textState_;
        var u = t.getFont() || I.render.canvas.defaultFont,
          d = t.getScale();
        (n.overflow = t.getOverflow()),
          (n.font = u),
          (n.maxAngle = t.getMaxAngle()),
          (n.placement = t.getPlacement()),
          (n.textAlign = t.getTextAlign()),
          (n.textBaseline =
            t.getTextBaseline() || I.render.canvas.defaultTextBaseline),
          (n.backgroundFill = t.getBackgroundFill()),
          (n.backgroundStroke = t.getBackgroundStroke()),
          (n.padding = t.getPadding() || I.render.canvas.defaultPadding),
          (n.scale = void 0 === d ? 1 : d);
        var f = t.getOffsetX(),
          g = t.getOffsetY(),
          p = t.getRotateWithView(),
          y = t.getRotation();
        (this.text_ = t.getText() || ''),
          (this.textOffsetX_ = void 0 === f ? 0 : f),
          (this.textOffsetY_ = void 0 === g ? 0 : g),
          (this.textRotateWithView_ = void 0 !== p && p),
          (this.textRotation_ = void 0 === y ? 0 : y),
          (this.strokeKey_ = r
            ? ('string' == typeof r.strokeStyle
                ? r.strokeStyle
                : I.getUid(r.strokeStyle)) +
              r.lineCap +
              r.lineDashOffset +
              '|' +
              r.lineWidth +
              r.lineJoin +
              r.miterLimit +
              '[' +
              r.lineDash.join() +
              ']'
            : ''),
          (this.textKey_ = n.font + n.scale + (n.textAlign || '?')),
          (this.fillKey_ = i
            ? 'string' == typeof i.fillStyle
              ? i.fillStyle
              : '|' + I.getUid(i.fillStyle)
            : '');
      } else this.text_ = '';
    }),
    (I.render.canvas.ReplayGroup = function (t, e, n, i, r, o, s) {
      I.render.ReplayGroup.call(this),
        (this.declutterTree_ = o),
        (this.declutterGroup_ = null),
        (this.tolerance_ = t),
        (this.maxExtent_ = e),
        (this.overlaps_ = r),
        (this.pixelRatio_ = i),
        (this.resolution_ = n),
        (this.renderBuffer_ = s),
        (this.replaysByZIndex_ = {}),
        (this.hitDetectionContext_ = null),
        (this.hitDetectionTransform_ = I.transform.create());
    }),
    I.inherits(I.render.canvas.ReplayGroup, I.render.ReplayGroup),
    (I.render.canvas.ReplayGroup.circleArrayCache_ = { 0: [[!0]] }),
    (I.render.canvas.ReplayGroup.fillCircleArrayRowToMiddle_ = function (
      t,
      e,
      n,
    ) {
      var i,
        r = Math.floor(t.length / 2);
      if (e >= r) for (i = r; i < e; i++) t[i][n] = !0;
      else if (e < r) for (i = e + 1; i < r; i++) t[i][n] = !0;
    }),
    (I.render.canvas.ReplayGroup.getCircleArray_ = function (t) {
      if (void 0 !== I.render.canvas.ReplayGroup.circleArrayCache_[t])
        return I.render.canvas.ReplayGroup.circleArrayCache_[t];
      for (var e = 2 * t + 1, n = new Array(e), i = 0; i < e; i++)
        n[i] = new Array(e);
      for (var r = t, o = 0, s = 0; r >= o; )
        I.render.canvas.ReplayGroup.fillCircleArrayRowToMiddle_(
          n,
          t + r,
          t + o,
        ),
          I.render.canvas.ReplayGroup.fillCircleArrayRowToMiddle_(
            n,
            t + o,
            t + r,
          ),
          I.render.canvas.ReplayGroup.fillCircleArrayRowToMiddle_(
            n,
            t - o,
            t + r,
          ),
          I.render.canvas.ReplayGroup.fillCircleArrayRowToMiddle_(
            n,
            t - r,
            t + o,
          ),
          I.render.canvas.ReplayGroup.fillCircleArrayRowToMiddle_(
            n,
            t - r,
            t - o,
          ),
          I.render.canvas.ReplayGroup.fillCircleArrayRowToMiddle_(
            n,
            t - o,
            t - r,
          ),
          I.render.canvas.ReplayGroup.fillCircleArrayRowToMiddle_(
            n,
            t + o,
            t - r,
          ),
          I.render.canvas.ReplayGroup.fillCircleArrayRowToMiddle_(
            n,
            t + r,
            t - o,
          ),
          2 * ((s += 1 + 2 * ++o) - r) + 1 > 0 && (s += 1 - 2 * (r -= 1));
      return (I.render.canvas.ReplayGroup.circleArrayCache_[t] = n), n;
    }),
    (I.render.canvas.ReplayGroup.replayDeclutter = function (t, e, n) {
      for (
        var i = Object.keys(t)
            .map(Number)
            .sort(I.array.numberSafeCompareFunction),
          r = {},
          o = 0,
          s = i.length;
        o < s;
        ++o
      )
        for (var a = t[i[o].toString()], l = 0, h = a.length; l < h; ) {
          var c = a[l++],
            u = a[l++];
          c.replay(e, u, n, r);
        }
    }),
    (I.render.canvas.ReplayGroup.prototype.addDeclutter = function (t) {
      var e = null;
      return (
        this.declutterTree_ &&
          (t
            ? (e = this.declutterGroup_)[4]++
            : (e = this.declutterGroup_ = I.extent.createEmpty()).push(1)),
        e
      );
    }),
    (I.render.canvas.ReplayGroup.prototype.clip = function (t, e) {
      var n = this.getClipCoords(e);
      t.beginPath(),
        t.moveTo(n[0], n[1]),
        t.lineTo(n[2], n[3]),
        t.lineTo(n[4], n[5]),
        t.lineTo(n[6], n[7]),
        t.clip();
    }),
    (I.render.canvas.ReplayGroup.prototype.hasReplays = function (t) {
      for (var e in this.replaysByZIndex_)
        for (var n = this.replaysByZIndex_[e], i = 0, r = t.length; i < r; ++i)
          if (t[i] in n) return !0;
      return !1;
    }),
    (I.render.canvas.ReplayGroup.prototype.finish = function () {
      var t;
      for (t in this.replaysByZIndex_) {
        var e,
          n = this.replaysByZIndex_[t];
        for (e in n) n[e].finish();
      }
    }),
    (I.render.canvas.ReplayGroup.prototype.forEachFeatureAtCoordinate =
      function (t, e, n, i, r, o, s) {
        var a,
          l = 2 * (i = Math.round(i)) + 1,
          h = I.transform.compose(
            this.hitDetectionTransform_,
            i + 0.5,
            i + 0.5,
            1 / e,
            -1 / e,
            -n,
            -t[0],
            -t[1],
          ),
          c = this.hitDetectionContext_;
        c.canvas.width !== l || c.canvas.height !== l
          ? ((c.canvas.width = l), (c.canvas.height = l))
          : c.clearRect(0, 0, l, l),
          void 0 !== this.renderBuffer_ &&
            ((a = I.extent.createEmpty()),
            I.extent.extendCoordinate(a, t),
            I.extent.buffer(a, e * (this.renderBuffer_ + i), a));
        var u,
          d,
          f = I.render.canvas.ReplayGroup.getCircleArray_(i);
        function g(t) {
          for (var e = c.getImageData(0, 0, l, l).data, n = 0; n < l; n++)
            for (var i = 0; i < l; i++) {
              var r;
              if (f[n][i])
                if (e[4 * (i * l + n) + 3] > 0)
                  return (
                    (!u ||
                      (d != I.render.ReplayType.IMAGE &&
                        d != I.render.ReplayType.TEXT) ||
                      -1 !== u.indexOf(t)) &&
                      (r = o(t)),
                    r || void c.clearRect(0, 0, l, l)
                  );
            }
        }
        this.declutterTree_ &&
          (u = this.declutterTree_.all().map(function (t) {
            return t.value;
          }));
        var p,
          y,
          m,
          v,
          _,
          S = Object.keys(this.replaysByZIndex_).map(Number);
        for (
          S.sort(I.array.numberSafeCompareFunction), p = S.length - 1;
          p >= 0;
          --p
        ) {
          var x = S[p].toString();
          for (
            m = this.replaysByZIndex_[x], y = I.render.replay.ORDER.length - 1;
            y >= 0;
            --y
          )
            if (void 0 !== (v = m[(d = I.render.replay.ORDER[y])]))
              if (
                !s ||
                (d != I.render.ReplayType.IMAGE &&
                  d != I.render.ReplayType.TEXT)
              ) {
                if ((_ = v.replayHitDetection(c, h, n, r, g, a))) return _;
              } else {
                var C = s[x];
                C ? C.push(v, h.slice(0)) : (s[x] = [v, h.slice(0)]);
              }
        }
      }),
    (I.render.canvas.ReplayGroup.prototype.getClipCoords = function (t) {
      var e = this.maxExtent_,
        n = e[0],
        i = e[1],
        r = e[2],
        o = e[3],
        s = [n, i, n, o, r, o, r, i];
      return I.geom.flat.transform.transform2D(s, 0, 8, 2, t, s), s;
    }),
    (I.render.canvas.ReplayGroup.prototype.getReplay = function (t, e) {
      var n = void 0 !== t ? t.toString() : '0',
        i = this.replaysByZIndex_[n];
      void 0 === i && ((i = {}), (this.replaysByZIndex_[n] = i));
      var r = i[e];
      void 0 === r &&
        ((r = new (0, I.render.canvas.ReplayGroup.BATCH_CONSTRUCTORS_[e])(
          this.tolerance_,
          this.maxExtent_,
          this.resolution_,
          this.pixelRatio_,
          this.overlaps_,
          this.declutterTree_,
        )),
        (i[e] = r));
      return r;
    }),
    (I.render.canvas.ReplayGroup.prototype.getReplays = function () {
      return this.replaysByZIndex_;
    }),
    (I.render.canvas.ReplayGroup.prototype.isEmpty = function () {
      return I.obj.isEmpty(this.replaysByZIndex_);
    }),
    (I.render.canvas.ReplayGroup.prototype.replay = function (
      t,
      e,
      n,
      i,
      r,
      o,
    ) {
      var s = Object.keys(this.replaysByZIndex_).map(Number);
      s.sort(I.array.numberSafeCompareFunction), t.save(), this.clip(t, e);
      var a,
        l,
        h,
        c,
        u,
        d,
        f = r || I.render.replay.ORDER;
      for (a = 0, l = s.length; a < l; ++a) {
        var g = s[a].toString();
        for (u = this.replaysByZIndex_[g], h = 0, c = f.length; h < c; ++h) {
          var p = f[h];
          if (void 0 !== (d = u[p]))
            if (
              !o ||
              (p != I.render.ReplayType.IMAGE && p != I.render.ReplayType.TEXT)
            )
              d.replay(t, e, n, i);
            else {
              var y = o[g];
              y ? y.push(d, e.slice(0)) : (o[g] = [d, e.slice(0)]);
            }
        }
      }
      t.restore();
    }),
    (I.render.canvas.ReplayGroup.BATCH_CONSTRUCTORS_ = {
      Circle: I.render.canvas.PolygonReplay,
      Default: I.render.canvas.Replay,
      Image: I.render.canvas.ImageReplay,
      LineString: I.render.canvas.LineStringReplay,
      Polygon: I.render.canvas.PolygonReplay,
      Text: I.render.canvas.TextReplay,
    }),
    (I.renderer = {}),
    (I.renderer.vector = {}),
    (I.renderer.vector.defaultOrder = function (t, e) {
      return I.getUid(t) - I.getUid(e);
    }),
    (I.renderer.vector.getSquaredTolerance = function (t, e) {
      var n = I.renderer.vector.getTolerance(t, e);
      return n * n;
    }),
    (I.renderer.vector.getTolerance = function (t, e) {
      return (I.SIMPLIFY_TOLERANCE * t) / e;
    }),
    (I.renderer.vector.renderCircleGeometry_ = function (t, e, n, i) {
      var r = n.getFill(),
        o = n.getStroke();
      if (r || o) {
        var s = t.getReplay(n.getZIndex(), I.render.ReplayType.CIRCLE);
        s.setFillStrokeStyle(r, o), s.drawCircle(e, i);
      }
      var a = n.getText();
      if (a) {
        var l = t.getReplay(n.getZIndex(), I.render.ReplayType.TEXT);
        l.setTextStyle(a, t.addDeclutter(!1)), l.drawText(e, i);
      }
    }),
    (I.renderer.vector.renderFeature = function (t, e, n, i, r, o) {
      var s,
        a,
        l = !1;
      return (
        (s = n.getImage()) &&
          ((a = s.getImageState()) == I.ImageState.LOADED ||
          a == I.ImageState.ERROR
            ? s.unlistenImageChange(r, o)
            : (a == I.ImageState.IDLE && s.load(),
              (a = s.getImageState()),
              s.listenImageChange(r, o),
              (l = !0))),
        I.renderer.vector.renderFeature_(t, e, n, i),
        l
      );
    }),
    (I.renderer.vector.renderFeature_ = function (t, e, n, i) {
      var r = n.getGeometryFunction()(e);
      if (r) {
        var o = r.getSimplifiedGeometry(i);
        if (n.getRenderer()) I.renderer.vector.renderGeometry_(t, o, n, e);
        else
          (0, I.renderer.vector.GEOMETRY_RENDERERS_[o.getType()])(t, o, n, e);
      }
    }),
    (I.renderer.vector.renderGeometry_ = function (t, e, n, i) {
      if (e.getType() != I.geom.GeometryType.GEOMETRY_COLLECTION)
        t.getReplay(n.getZIndex(), I.render.ReplayType.DEFAULT).drawCustom(
          e,
          i,
          n.getRenderer(),
        );
      else
        for (var r = e.getGeometries(), o = 0, s = r.length; o < s; ++o)
          I.renderer.vector.renderGeometry_(t, r[o], n, i);
    }),
    (I.renderer.vector.renderGeometryCollectionGeometry_ = function (
      t,
      e,
      n,
      i,
    ) {
      var r,
        o,
        s = e.getGeometriesArray();
      for (r = 0, o = s.length; r < o; ++r) {
        (0, I.renderer.vector.GEOMETRY_RENDERERS_[s[r].getType()])(
          t,
          s[r],
          n,
          i,
        );
      }
    }),
    (I.renderer.vector.renderLineStringGeometry_ = function (t, e, n, i) {
      var r = n.getStroke();
      if (r) {
        var o = t.getReplay(n.getZIndex(), I.render.ReplayType.LINE_STRING);
        o.setFillStrokeStyle(null, r), o.drawLineString(e, i);
      }
      var s = n.getText();
      if (s) {
        var a = t.getReplay(n.getZIndex(), I.render.ReplayType.TEXT);
        a.setTextStyle(s, t.addDeclutter(!1)), a.drawText(e, i);
      }
    }),
    (I.renderer.vector.renderMultiLineStringGeometry_ = function (t, e, n, i) {
      var r = n.getStroke();
      if (r) {
        var o = t.getReplay(n.getZIndex(), I.render.ReplayType.LINE_STRING);
        o.setFillStrokeStyle(null, r), o.drawMultiLineString(e, i);
      }
      var s = n.getText();
      if (s) {
        var a = t.getReplay(n.getZIndex(), I.render.ReplayType.TEXT);
        a.setTextStyle(s, t.addDeclutter(!1)), a.drawText(e, i);
      }
    }),
    (I.renderer.vector.renderMultiPolygonGeometry_ = function (t, e, n, i) {
      var r = n.getFill(),
        o = n.getStroke();
      if (o || r) {
        var s = t.getReplay(n.getZIndex(), I.render.ReplayType.POLYGON);
        s.setFillStrokeStyle(r, o), s.drawMultiPolygon(e, i);
      }
      var a = n.getText();
      if (a) {
        var l = t.getReplay(n.getZIndex(), I.render.ReplayType.TEXT);
        l.setTextStyle(a, t.addDeclutter(!1)), l.drawText(e, i);
      }
    }),
    (I.renderer.vector.renderPointGeometry_ = function (t, e, n, i) {
      var r = n.getImage();
      if (r) {
        if (r.getImageState() != I.ImageState.LOADED) return;
        var o = t.getReplay(n.getZIndex(), I.render.ReplayType.IMAGE);
        o.setImageStyle(r, t.addDeclutter(!1)), o.drawPoint(e, i);
      }
      var s = n.getText();
      if (s) {
        var a = t.getReplay(n.getZIndex(), I.render.ReplayType.TEXT);
        a.setTextStyle(s, t.addDeclutter(!!r)), a.drawText(e, i);
      }
    }),
    (I.renderer.vector.renderMultiPointGeometry_ = function (t, e, n, i) {
      var r = n.getImage();
      if (r) {
        if (r.getImageState() != I.ImageState.LOADED) return;
        var o = t.getReplay(n.getZIndex(), I.render.ReplayType.IMAGE);
        o.setImageStyle(r, t.addDeclutter(!1)), o.drawMultiPoint(e, i);
      }
      var s = n.getText();
      if (s) {
        var a = t.getReplay(n.getZIndex(), I.render.ReplayType.TEXT);
        a.setTextStyle(s, t.addDeclutter(!!r)), a.drawText(e, i);
      }
    }),
    (I.renderer.vector.renderPolygonGeometry_ = function (t, e, n, i) {
      var r = n.getFill(),
        o = n.getStroke();
      if (r || o) {
        var s = t.getReplay(n.getZIndex(), I.render.ReplayType.POLYGON);
        s.setFillStrokeStyle(r, o), s.drawPolygon(e, i);
      }
      var a = n.getText();
      if (a) {
        var l = t.getReplay(n.getZIndex(), I.render.ReplayType.TEXT);
        l.setTextStyle(a, t.addDeclutter(!1)), l.drawText(e, i);
      }
    }),
    (I.renderer.vector.GEOMETRY_RENDERERS_ = {
      Point: I.renderer.vector.renderPointGeometry_,
      LineString: I.renderer.vector.renderLineStringGeometry_,
      Polygon: I.renderer.vector.renderPolygonGeometry_,
      MultiPoint: I.renderer.vector.renderMultiPointGeometry_,
      MultiLineString: I.renderer.vector.renderMultiLineStringGeometry_,
      MultiPolygon: I.renderer.vector.renderMultiPolygonGeometry_,
      GeometryCollection: I.renderer.vector.renderGeometryCollectionGeometry_,
      Circle: I.renderer.vector.renderCircleGeometry_,
    });
  var E = {},
    O = new S({ mvtStyle: new d(I, !0), openlayer: I, useOffscreen: !0 });
  function G(t) {
    var e = t.getId();
    return (e -= 16777216 * Math.floor(e / 16777216));
  }
  return r(function (e, n) {
    var i = new OffscreenCanvas(e.canvasWidth, e.canvasWidth),
      r = new OffscreenCanvas(e.canvasWidth, e.canvasWidth),
      o = e.pbfData,
      s = e.layers,
      a = e.transform,
      l = e.squaredTolerance,
      h = e.spriteImageDatas,
      c = e.keepProperties,
      u = e.tileLevel,
      d = e.needSourceLayerNames,
      f = e.selectEnabled,
      g = {};
    try {
      var p = new I.format.MVT({ featureClass: I.Feature }).readFeatures(o, {
          needSourceLayerNames: d,
        }),
        y = O.renderFeatures({
          colorCanvas: i,
          idCanvas: r,
          transform: a,
          layers: s,
          features: p,
          tileLevel: u,
          spriteImageCanvas: E,
          spriteImageDatas: h,
          squaredTolerance: l,
          selectEnabled: f,
          showBillboard: !1,
        });
      if (c)
        for (var m = y.idFeatures, v = m.length, _ = 0; _ < v; _++) {
          var S = m[_],
            x = G(S),
            C = S.getProperties();
          t.defined(C.geometry) && delete C.geometry, (g[x] = C);
        }
    } catch (t) {}
    var T = i.transferToImageBitmap(),
      R = f ? r.transferToImageBitmap() : null;
    return n.push(T), { buffer: T, idBuffer: R, properties: g };
  });
});
