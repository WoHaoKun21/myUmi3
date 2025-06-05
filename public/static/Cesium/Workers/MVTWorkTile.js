define([
  './when-8d13db60',
  './createTaskProcessorWorker',
  './earcut-2.2.1-b404d9e6',
  './pbf-9fe59c76',
], function (t, e, r, n) {
  function i(t) {
    (this._stringToNumber = {}), (this._numberToString = []);
    for (var e = 0; e < t.length; e++) {
      var r = t[e];
      (this._stringToNumber[r] = e), (this._numberToString[e] = r);
    }
  }
  (i.prototype.encode = function (t) {
    return this._stringToNumber[t];
  }),
    (i.prototype.decode = function (t) {
      return this._numberToString[t];
    });
  var a = {
    Int8: Int8Array,
    Uint8: Uint8Array,
    Int16: Int16Array,
    Uint16: Uint16Array,
    Int32: Int32Array,
    Uint32: Uint32Array,
    Float32: Float32Array,
  };
  function o(t, e) {
    void 0 === e && (e = 1);
    var r = 0,
      n = 0;
    return {
      members: t.map(function (t) {
        var i = s(t.type),
          a = (r = u(r, Math.max(e, i))),
          o = t.components || 1;
        return (
          (n = Math.max(n, i)),
          (r += i * o),
          { name: t.name, type: t.type, components: o, offset: a }
        );
      }),
      size: u(r, Math.max(n, e)),
      alignment: e,
    };
  }
  function s(t) {
    return a[t].BYTES_PER_ELEMENT;
  }
  function u(t, e) {
    return Math.ceil(t / e) * e;
  }
  var l = 1,
    p = function (t, e) {
      var r = e.pixelRatio,
        n = e.version,
        i = e.stretchX,
        a = e.stretchY,
        o = e.content;
      (this.paddedRect = t),
        (this.pixelRatio = r),
        (this.stretchX = i),
        (this.stretchY = a),
        (this.content = o),
        (this.version = n);
    },
    c = {
      tl: { configurable: !0 },
      br: { configurable: !0 },
      tlbr: { configurable: !0 },
      displaySize: { configurable: !0 },
    };
  (c.tl.get = function () {
    return [this.paddedRect.x + l, this.paddedRect.y + l];
  }),
    (c.br.get = function () {
      return [
        this.paddedRect.x + this.paddedRect.w - l,
        this.paddedRect.y + this.paddedRect.h - l,
      ];
    }),
    (c.tlbr.get = function () {
      return this.tl.concat(this.br);
    }),
    (c.displaySize.get = function () {
      return [
        (this.paddedRect.w - 2 * l) / this.pixelRatio,
        (this.paddedRect.h - 2 * l) / this.pixelRatio,
      ];
    }),
    Object.defineProperties(p.prototype, c);
  var f = function (t, e) {
    h(this, t, 4, e);
  };
  function h(t, e, r, n) {
    var i = e.width,
      a = e.height;
    if (n) {
      if (n instanceof Uint8ClampedArray) n = new Uint8Array(n.buffer);
      else if (n.length !== i * a * r)
        throw new RangeError('mismatched image size');
    } else n = new Uint8Array(i * a * r);
    return (t.width = i), (t.height = a), (t.data = n), t;
  }
  function d(t, e, r) {
    var n = e.width,
      i = e.height;
    if (n !== t.width || i !== t.height) {
      var a = h({}, { width: n, height: i }, r);
      y(
        t,
        a,
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { width: Math.min(t.width, n), height: Math.min(t.height, i) },
        r,
      ),
        (t.width = n),
        (t.height = i),
        (t.data = a.data);
    }
  }
  function y(t, e, r, n, i, a) {
    if (0 === i.width || 0 === i.height) return e;
    if (
      i.width > t.width ||
      i.height > t.height ||
      r.x > t.width - i.width ||
      r.y > t.height - i.height
    )
      throw new RangeError('out of range source coordinates for image copy');
    if (
      i.width > e.width ||
      i.height > e.height ||
      n.x > e.width - i.width ||
      n.y > e.height - i.height
    )
      throw new RangeError(
        'out of range destination coordinates for image copy',
      );
    for (var o = t.data, s = e.data, u = 0; u < i.height; u++)
      for (
        var l = ((r.y + u) * t.width + r.x) * a,
          p = ((n.y + u) * e.width + n.x) * a,
          c = 0;
        c < i.width * a;
        c++
      )
        s[p + c] = o[l + c];
    return e;
  }
  function m(t) {
    for (var e = 0, r = 0, n = 0, i = t; n < i.length; n += 1) {
      var a = i[n];
      (e += a.w * a.h), (r = Math.max(r, a.w));
    }
    t.sort(function (t, e) {
      return e.h - t.h;
    });
    for (
      var o = [
          {
            x: 0,
            y: 0,
            w: Math.max(Math.ceil(Math.sqrt(e / 0.95)), r),
            h: 1 / 0,
          },
        ],
        s = 0,
        u = 0,
        l = 0,
        p = t;
      l < p.length;
      l += 1
    )
      for (var c = p[l], f = o.length - 1; f >= 0; f--) {
        var h = o[f];
        if (!(c.w > h.w || c.h > h.h)) {
          if (
            ((c.x = h.x),
            (c.y = h.y),
            (u = Math.max(u, c.y + c.h)),
            (s = Math.max(s, c.x + c.w)),
            c.w === h.w && c.h === h.h)
          ) {
            var d = o.pop();
            f < o.length && (o[f] = d);
          } else
            c.h === h.h
              ? ((h.x += c.w), (h.w -= c.w))
              : c.w === h.w
              ? ((h.y += c.h), (h.h -= c.h))
              : (o.push({ x: h.x + c.w, y: h.y, w: h.w - c.w, h: c.h }),
                (h.y += c.h),
                (h.h -= c.h));
          break;
        }
      }
    return { w: s, h: u, fill: e / (s * u) || 0 };
  }
  (f.prototype.resize = function (t) {
    d(this, t, 4);
  }),
    (f.prototype.replace = function (t, e) {
      e
        ? this.data.set(t)
        : t instanceof Uint8ClampedArray
        ? (this.data = new Uint8Array(t.buffer))
        : (this.data = t);
    }),
    (f.prototype.clone = function () {
      return new f(
        { width: this.width, height: this.height },
        new Uint8Array(this.data),
      );
    }),
    (f.copy = function (t, e, r, n, i) {
      y(t, e, r, n, i, 4);
    });
  var v = 1,
    g = function (t, e) {
      var r = {},
        n = {};
      this.haveRenderCallbacks = [];
      var i = [];
      this.addImages(t, r, i), this.addImages(e, n, i);
      var a = m(i),
        o = a.w,
        s = a.h,
        u = new f({ width: o || 1, height: s || 1 });
      for (var l in t) {
        var p = t[l],
          c = r[l].paddedRect;
        f.copy(p.data, u, { x: 0, y: 0 }, { x: c.x + v, y: c.y + v }, p.data);
      }
      for (var h in e) {
        var d = e[h],
          y = n[h].paddedRect,
          g = y.x + v,
          x = y.y + v,
          b = d.data.width,
          _ = d.data.height;
        f.copy(d.data, u, { x: 0, y: 0 }, { x: g, y: x }, d.data),
          f.copy(
            d.data,
            u,
            { x: 0, y: _ - 1 },
            { x: g, y: x - 1 },
            { width: b, height: 1 },
          ),
          f.copy(
            d.data,
            u,
            { x: 0, y: 0 },
            { x: g, y: x + _ },
            { width: b, height: 1 },
          ),
          f.copy(
            d.data,
            u,
            { x: b - 1, y: 0 },
            { x: g - 1, y: x },
            { width: 1, height: _ },
          ),
          f.copy(
            d.data,
            u,
            { x: 0, y: 0 },
            { x: g + b, y: x },
            { width: 1, height: _ },
          );
      }
      (this.image = u), (this.iconPositions = r), (this.patternPositions = n);
    };
  (g.prototype.addImages = function (t, e, r) {
    for (var n in t) {
      var i = t[n],
        a = { x: 0, y: 0, w: i.data.width + 2 * v, h: i.data.height + 2 * v };
      r.push(a),
        (e[n] = new p(a, i)),
        i.hasRenderCallback && this.haveRenderCallbacks.push(n);
    }
  }),
    (g.prototype.patchUpdatedImages = function (t, e) {
      for (var r in (t.dispatchRenderCallbacks(this.haveRenderCallbacks),
      t.updatedImages))
        this.patchUpdatedImage(this.iconPositions[r], t.getImage(r), e),
          this.patchUpdatedImage(this.patternPositions[r], t.getImage(r), e);
    }),
    (g.prototype.patchUpdatedImage = function (t, e, r) {
      if (t && e && t.version !== e.version) {
        t.version = e.version;
        var n = t.tl,
          i = n[0],
          a = n[1];
        r.update(e.data, void 0, { x: i, y: a });
      }
    });
  var x = {
    transparent: [0, 0, 0, 0],
    aliceblue: [240, 248, 255, 1],
    antiquewhite: [250, 235, 215, 1],
    aqua: [0, 255, 255, 1],
    aquamarine: [127, 255, 212, 1],
    azure: [240, 255, 255, 1],
    beige: [245, 245, 220, 1],
    bisque: [255, 228, 196, 1],
    black: [0, 0, 0, 1],
    blanchedalmond: [255, 235, 205, 1],
    blue: [0, 0, 255, 1],
    blueviolet: [138, 43, 226, 1],
    brown: [165, 42, 42, 1],
    burlywood: [222, 184, 135, 1],
    cadetblue: [95, 158, 160, 1],
    chartreuse: [127, 255, 0, 1],
    chocolate: [210, 105, 30, 1],
    coral: [255, 127, 80, 1],
    cornflowerblue: [100, 149, 237, 1],
    cornsilk: [255, 248, 220, 1],
    crimson: [220, 20, 60, 1],
    cyan: [0, 255, 255, 1],
    darkblue: [0, 0, 139, 1],
    darkcyan: [0, 139, 139, 1],
    darkgoldenrod: [184, 134, 11, 1],
    darkgray: [169, 169, 169, 1],
    darkgreen: [0, 100, 0, 1],
    darkgrey: [169, 169, 169, 1],
    darkkhaki: [189, 183, 107, 1],
    darkmagenta: [139, 0, 139, 1],
    darkolivegreen: [85, 107, 47, 1],
    darkorange: [255, 140, 0, 1],
    darkorchid: [153, 50, 204, 1],
    darkred: [139, 0, 0, 1],
    darksalmon: [233, 150, 122, 1],
    darkseagreen: [143, 188, 143, 1],
    darkslateblue: [72, 61, 139, 1],
    darkslategray: [47, 79, 79, 1],
    darkslategrey: [47, 79, 79, 1],
    darkturquoise: [0, 206, 209, 1],
    darkviolet: [148, 0, 211, 1],
    deeppink: [255, 20, 147, 1],
    deepskyblue: [0, 191, 255, 1],
    dimgray: [105, 105, 105, 1],
    dimgrey: [105, 105, 105, 1],
    dodgerblue: [30, 144, 255, 1],
    firebrick: [178, 34, 34, 1],
    floralwhite: [255, 250, 240, 1],
    forestgreen: [34, 139, 34, 1],
    fuchsia: [255, 0, 255, 1],
    gainsboro: [220, 220, 220, 1],
    ghostwhite: [248, 248, 255, 1],
    gold: [255, 215, 0, 1],
    goldenrod: [218, 165, 32, 1],
    gray: [128, 128, 128, 1],
    green: [0, 128, 0, 1],
    greenyellow: [173, 255, 47, 1],
    grey: [128, 128, 128, 1],
    honeydew: [240, 255, 240, 1],
    hotpink: [255, 105, 180, 1],
    indianred: [205, 92, 92, 1],
    indigo: [75, 0, 130, 1],
    ivory: [255, 255, 240, 1],
    khaki: [240, 230, 140, 1],
    lavender: [230, 230, 250, 1],
    lavenderblush: [255, 240, 245, 1],
    lawngreen: [124, 252, 0, 1],
    lemonchiffon: [255, 250, 205, 1],
    lightblue: [173, 216, 230, 1],
    lightcoral: [240, 128, 128, 1],
    lightcyan: [224, 255, 255, 1],
    lightgoldenrodyellow: [250, 250, 210, 1],
    lightgray: [211, 211, 211, 1],
    lightgreen: [144, 238, 144, 1],
    lightgrey: [211, 211, 211, 1],
    lightpink: [255, 182, 193, 1],
    lightsalmon: [255, 160, 122, 1],
    lightseagreen: [32, 178, 170, 1],
    lightskyblue: [135, 206, 250, 1],
    lightslategray: [119, 136, 153, 1],
    lightslategrey: [119, 136, 153, 1],
    lightsteelblue: [176, 196, 222, 1],
    lightyellow: [255, 255, 224, 1],
    lime: [0, 255, 0, 1],
    limegreen: [50, 205, 50, 1],
    linen: [250, 240, 230, 1],
    magenta: [255, 0, 255, 1],
    maroon: [128, 0, 0, 1],
    mediumaquamarine: [102, 205, 170, 1],
    mediumblue: [0, 0, 205, 1],
    mediumorchid: [186, 85, 211, 1],
    mediumpurple: [147, 112, 219, 1],
    mediumseagreen: [60, 179, 113, 1],
    mediumslateblue: [123, 104, 238, 1],
    mediumspringgreen: [0, 250, 154, 1],
    mediumturquoise: [72, 209, 204, 1],
    mediumvioletred: [199, 21, 133, 1],
    midnightblue: [25, 25, 112, 1],
    mintcream: [245, 255, 250, 1],
    mistyrose: [255, 228, 225, 1],
    moccasin: [255, 228, 181, 1],
    navajowhite: [255, 222, 173, 1],
    navy: [0, 0, 128, 1],
    oldlace: [253, 245, 230, 1],
    olive: [128, 128, 0, 1],
    olivedrab: [107, 142, 35, 1],
    orange: [255, 165, 0, 1],
    orangered: [255, 69, 0, 1],
    orchid: [218, 112, 214, 1],
    palegoldenrod: [238, 232, 170, 1],
    palegreen: [152, 251, 152, 1],
    paleturquoise: [175, 238, 238, 1],
    palevioletred: [219, 112, 147, 1],
    papayawhip: [255, 239, 213, 1],
    peachpuff: [255, 218, 185, 1],
    peru: [205, 133, 63, 1],
    pink: [255, 192, 203, 1],
    plum: [221, 160, 221, 1],
    powderblue: [176, 224, 230, 1],
    purple: [128, 0, 128, 1],
    rebeccapurple: [102, 51, 153, 1],
    red: [255, 0, 0, 1],
    rosybrown: [188, 143, 143, 1],
    royalblue: [65, 105, 225, 1],
    saddlebrown: [139, 69, 19, 1],
    salmon: [250, 128, 114, 1],
    sandybrown: [244, 164, 96, 1],
    seagreen: [46, 139, 87, 1],
    seashell: [255, 245, 238, 1],
    sienna: [160, 82, 45, 1],
    silver: [192, 192, 192, 1],
    skyblue: [135, 206, 235, 1],
    slateblue: [106, 90, 205, 1],
    slategray: [112, 128, 144, 1],
    slategrey: [112, 128, 144, 1],
    snow: [255, 250, 250, 1],
    springgreen: [0, 255, 127, 1],
    steelblue: [70, 130, 180, 1],
    tan: [210, 180, 140, 1],
    teal: [0, 128, 128, 1],
    thistle: [216, 191, 216, 1],
    tomato: [255, 99, 71, 1],
    turquoise: [64, 224, 208, 1],
    violet: [238, 130, 238, 1],
    wheat: [245, 222, 179, 1],
    white: [255, 255, 255, 1],
    whitesmoke: [245, 245, 245, 1],
    yellow: [255, 255, 0, 1],
    yellowgreen: [154, 205, 50, 1],
  };
  function b(t) {
    return (t = Math.round(t)) < 0 ? 0 : t > 255 ? 255 : t;
  }
  function _(t) {
    return t < 0 ? 0 : t > 1 ? 1 : t;
  }
  function w(t) {
    return '%' === t[t.length - 1]
      ? b((parseFloat(t) / 100) * 255)
      : b(parseInt(t));
  }
  function E(t) {
    return '%' === t[t.length - 1] ? _(parseFloat(t) / 100) : _(parseFloat(t));
  }
  function T(t, e, r) {
    return (
      r < 0 ? (r += 1) : r > 1 && (r -= 1),
      6 * r < 1
        ? t + (e - t) * r * 6
        : 2 * r < 1
        ? e
        : 3 * r < 2
        ? t + (e - t) * (2 / 3 - r) * 6
        : t
    );
  }
  function A(t) {
    var e,
      r = t.replace(/ /g, '').toLowerCase();
    if (r in x) return x[r].slice();
    if ('#' === r[0])
      return 4 === r.length
        ? (e = parseInt(r.substr(1), 16)) >= 0 && e <= 4095
          ? [
              ((3840 & e) >> 4) | ((3840 & e) >> 8),
              (240 & e) | ((240 & e) >> 4),
              (15 & e) | ((15 & e) << 4),
              1,
            ]
          : null
        : 7 === r.length &&
          (e = parseInt(r.substr(1), 16)) >= 0 &&
          e <= 16777215
        ? [(16711680 & e) >> 16, (65280 & e) >> 8, 255 & e, 1]
        : null;
    var n = r.indexOf('('),
      i = r.indexOf(')');
    if (-1 !== n && i + 1 === r.length) {
      var a = r.substr(0, n),
        o = r.substr(n + 1, i - (n + 1)).split(','),
        s = 1;
      switch (a) {
        case 'rgba':
          if (4 !== o.length) return null;
          s = E(o.pop());
        case 'rgb':
          return 3 !== o.length ? null : [w(o[0]), w(o[1]), w(o[2]), s];
        case 'hsla':
          if (4 !== o.length) return null;
          s = E(o.pop());
        case 'hsl':
          if (3 !== o.length) return null;
          var u = (((parseFloat(o[0]) % 360) + 360) % 360) / 360,
            l = E(o[1]),
            p = E(o[2]),
            c = p <= 0.5 ? p * (l + 1) : p + l - p * l,
            f = 2 * p - c;
          return [
            b(255 * T(f, c, u + 1 / 3)),
            b(255 * T(f, c, u)),
            b(255 * T(f, c, u - 1 / 3)),
            s,
          ];
        default:
          return null;
      }
    }
    return null;
  }
  var S = function (t, e, r, n) {
    void 0 === n && (n = 1),
      (this.r = t),
      (this.g = e),
      (this.b = r),
      (this.a = n);
  };
  (S.parse = function (t) {
    if (t) {
      if (t instanceof S) return t;
      if ('string' == typeof t) {
        var e = A(t);
        if (e)
          return new S(
            (e[0] / 255) * e[3],
            (e[1] / 255) * e[3],
            (e[2] / 255) * e[3],
            e[3],
          );
      }
    }
  }),
    (S.prototype.toString = function () {
      var t = this.toArray(),
        e = t[0],
        r = t[1],
        n = t[2],
        i = t[3];
      return (
        'rgba(' +
        Math.round(e) +
        ',' +
        Math.round(r) +
        ',' +
        Math.round(n) +
        ',' +
        i +
        ')'
      );
    }),
    (S.prototype.toArray = function () {
      var t = this,
        e = t.r,
        r = t.g,
        n = t.b,
        i = t.a;
      return 0 === i
        ? [0, 0, 0, 0]
        : [(255 * e) / i, (255 * r) / i, (255 * n) / i, i];
    }),
    (S.black = new S(0, 0, 0, 1)),
    (S.white = new S(1, 1, 1, 1)),
    (S.transparent = new S(0, 0, 0, 0)),
    (S.red = new S(1, 0, 0, 1));
  var I = { kind: 'null' },
    k = { kind: 'number' },
    M = { kind: 'string' },
    O = { kind: 'boolean' },
    P = { kind: 'color' },
    z = { kind: 'object' },
    R = { kind: 'value' },
    F = { kind: 'formatted' },
    C = { kind: 'resolvedImage' };
  function D(t, e) {
    return { kind: 'array', itemType: t, N: e };
  }
  function B(t) {
    if ('array' === t.kind) {
      var e = B(t.itemType);
      return 'number' == typeof t.N
        ? 'array<' + e + ', ' + t.N + '>'
        : 'value' === t.itemType.kind
        ? 'array'
        : 'array<' + e + '>';
    }
    return t.kind;
  }
  var U = [I, k, M, O, P, F, z, D(R), C];
  function V(t, e) {
    if ('error' === e.kind) return null;
    if ('array' === t.kind) {
      if (
        'array' === e.kind &&
        ((0 === e.N && 'value' === e.itemType.kind) ||
          !V(t.itemType, e.itemType)) &&
        ('number' != typeof t.N || t.N === e.N)
      )
        return null;
    } else {
      if (t.kind === e.kind) return null;
      if ('value' === t.kind)
        for (var r = 0, n = U; r < n.length; r += 1) {
          if (!V(n[r], e)) return null;
        }
    }
    return 'Expected ' + B(t) + ' but found ' + B(e) + ' instead.';
  }
  var N = function (t, e, r) {
    (this.sensitivity = t ? (e ? 'variant' : 'case') : e ? 'accent' : 'base'),
      (this.locale = r),
      (this.collator = new Intl.Collator(this.locale ? this.locale : [], {
        sensitivity: this.sensitivity,
        usage: 'search',
      }));
  };
  (N.prototype.compare = function (t, e) {
    return this.collator.compare(t, e);
  }),
    (N.prototype.resolvedLocale = function () {
      return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions()
        .locale;
    });
  var L = function (t, e, r, n, i) {
      (this.text = t),
        (this.image = e),
        (this.scale = r),
        (this.fontStack = n),
        (this.textColor = i);
    },
    X = function (t) {
      this.sections = t;
    };
  (X.fromString = function (t) {
    return new X([new L(t, null, null, null, null)]);
  }),
    (X.prototype.isEmpty = function () {
      return (
        0 === this.sections.length ||
        !this.sections.some(function (t) {
          return 0 !== t.text.length || (t.image && 0 !== t.image.name.length);
        })
      );
    }),
    (X.factory = function (t) {
      return t instanceof X ? t : X.fromString(t);
    }),
    (X.prototype.toString = function () {
      return 0 === this.sections.length
        ? ''
        : this.sections
            .map(function (t) {
              return t.text;
            })
            .join('');
    }),
    (X.prototype.serialize = function () {
      for (var t = ['format'], e = 0, r = this.sections; e < r.length; e += 1) {
        var n = r[e];
        if (n.image) t.push(['image', n.image.name]);
        else {
          t.push(n.text);
          var i = {};
          n.fontStack && (i['text-font'] = ['literal', n.fontStack.split(',')]),
            n.scale && (i['font-scale'] = n.scale),
            n.textColor &&
              (i['text-color'] = ['rgba'].concat(n.textColor.toArray())),
            t.push(i);
        }
      }
      return t;
    });
  var q = function (t) {
    (this.name = t.name), (this.available = t.available);
  };
  (q.prototype.toString = function () {
    return this.name;
  }),
    (q.fromString = function (t) {
      return new q({ name: t, available: !1 });
    }),
    (q.prototype.serialize = function () {
      return ['image', this.name];
    });
  var j = { kind: 'null' },
    H = { kind: 'number' },
    Y = { kind: 'string' },
    Q = { kind: 'boolean' },
    K = { kind: 'color' },
    G = { kind: 'object' },
    W = { kind: 'value' },
    J = { kind: 'collator' },
    Z = { kind: 'formatted' },
    $ = { kind: 'resolvedImage' };
  function tt(t, e) {
    return { kind: 'array', itemType: t, N: e };
  }
  function et() {}
  (et.validateRGBA = function (t, e, r, n) {
    return 'number' == typeof t &&
      t >= 0 &&
      t <= 255 &&
      'number' == typeof e &&
      e >= 0 &&
      e <= 255 &&
      'number' == typeof r &&
      r >= 0 &&
      r <= 255
      ? void 0 === n || ('number' == typeof n && n >= 0 && n <= 1)
        ? null
        : 'Invalid rgba value [' +
          [t, e, r, n].join(', ') +
          "]: 'a' must be between 0 and 1."
      : 'Invalid rgba value [' +
          ('number' == typeof n ? [t, e, r, n] : [t, e, r]).join(', ') +
          "]: 'r', 'g', and 'b' must be between 0 and 255.";
  }),
    (et.isValue = function (t) {
      if (null === t) return !0;
      if ('string' == typeof t) return !0;
      if ('boolean' == typeof t) return !0;
      if ('number' == typeof t) return !0;
      if (t instanceof S) return !0;
      if (t instanceof N) return !0;
      if (t instanceof X) return !0;
      if (t instanceof q) return !0;
      if (Array.isArray(t)) {
        for (var e = 0, r = t; e < r.length; e += 1) {
          var n = r[e];
          if (!et.isValue(n)) return !1;
        }
        return !0;
      }
      if ('object' == typeof t) {
        for (var i in t) if (!et.isValue(t[i])) return !1;
        return !0;
      }
      return !1;
    }),
    (et.typeOf = function (t) {
      if (null === t) return j;
      if ('string' == typeof t) return Y;
      if ('boolean' == typeof t) return Q;
      if ('number' == typeof t) return H;
      if (t instanceof S) return K;
      if (t instanceof N) return J;
      if (t instanceof X) return Z;
      if (t instanceof q) return $;
      if (Array.isArray(t)) {
        for (var e, r = t.length, n = 0, i = t; n < i.length; n += 1) {
          var a = i[n],
            o = et.typeOf(a);
          if (e) {
            if (e === o) continue;
            e = W;
            break;
          }
          e = o;
        }
        return tt(e || W, r);
      }
      return G;
    }),
    (et.toString$1 = function (t) {
      var e = typeof t;
      return null === t
        ? ''
        : 'string' === e || 'number' === e || 'boolean' === e
        ? String(t)
        : t instanceof S || t instanceof X || t instanceof q
        ? t.toString()
        : JSON.stringify(t);
    });
  var rt = { kind: 'number' },
    nt = { kind: 'string' },
    it = { kind: 'boolean' },
    at = { kind: 'object' },
    ot = { kind: 'value' };
  function st(t, e) {
    return { kind: 'array', itemType: t, N: e };
  }
  var ut = { string: nt, number: rt, boolean: it, object: at },
    lt = function (t, e) {
      (this.type = t), (this.args = e);
    };
  (lt.parse = function (t, e) {
    if (t.length < 2) return e.error('Expected at least one argument.');
    var r,
      n = 1,
      i = t[0];
    if ('array' === i) {
      var a, o;
      if (t.length > 2) {
        var s = t[1];
        if ('string' != typeof s || !(s in ut) || 'object' === s)
          return e.error(
            'The item type argument of "array" must be one of string, number, boolean',
            1,
          );
        (a = ut[s]), n++;
      } else a = ot;
      if (t.length > 3) {
        if (
          null !== t[2] &&
          ('number' != typeof t[2] || t[2] < 0 || t[2] !== Math.floor(t[2]))
        )
          return e.error(
            'The length argument to "array" must be a positive integer literal',
            2,
          );
        (o = t[2]), n++;
      }
      r = st(a, o);
    } else r = ut[i];
    for (var u = []; n < t.length; n++) {
      var l = e.parse(t[n], n, ot);
      if (!l) return null;
      u.push(l);
    }
    return new lt(r, u);
  }),
    (lt.prototype.evaluate = function (t) {
      for (var e = 0; e < this.args.length; e++) {
        var r = this.args[e].evaluate(t);
        if (!V(this.type, et.typeOf(r))) return r;
        if (e === this.args.length - 1)
          throw new RuntimeError(
            'Expected value to be of type ' +
              toString(this.type) +
              ', but found ' +
              toString(et.typeOf(r)) +
              ' instead.',
          );
      }
      return null;
    }),
    (lt.prototype.eachChild = function (t) {
      this.args.forEach(t);
    }),
    (lt.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat.apply(
        t,
        this.args.map(function (t) {
          return t.possibleOutputs();
        }),
      );
    }),
    (lt.prototype.serialize = function () {
      var t = this.type,
        e = [t.kind];
      if ('array' === t.kind) {
        var r = t.itemType;
        if (
          'string' === r.kind ||
          'number' === r.kind ||
          'boolean' === r.kind
        ) {
          e.push(r.kind);
          var n = t.N;
          ('number' == typeof n || this.args.length > 1) && e.push(n);
        }
      }
      return e.concat(
        this.args.map(function (t) {
          return t.serialize();
        }),
      );
    });
  var pt = { kind: 'number' },
    ct = { kind: 'value' };
  function ft(t, e) {
    return { kind: 'array', itemType: t, N: e };
  }
  var ht = function (t, e, r) {
    (this.type = t), (this.index = e), (this.input = r);
  };
  (ht.parse = function (t, e) {
    if (3 !== t.length)
      return e.error(
        'Expected 2 arguments, but found ' + (t.length - 1) + ' instead.',
      );
    var r = e.parse(t[1], 1, pt),
      n = e.parse(t[2], 2, ft(e.expectedType || ct));
    if (!r || !n) return null;
    var i = n.type;
    return new ht(i.itemType, r, n);
  }),
    (ht.prototype.evaluate = function (t) {
      var e = this.index.evaluate(t),
        r = this.input.evaluate(t);
      if (e < 0)
        throw new RuntimeError('Array index out of bounds: ' + e + ' < 0.');
      if (e >= r.length)
        throw new RuntimeError(
          'Array index out of bounds: ' + e + ' > ' + (r.length - 1) + '.',
        );
      if (e !== Math.floor(e))
        throw new RuntimeError(
          'Array index must be an integer, but found ' + e + ' instead.',
        );
      return r[e];
    }),
    (ht.prototype.eachChild = function (t) {
      t(this.index), t(this.input);
    }),
    (ht.prototype.possibleOutputs = function () {
      return [void 0];
    }),
    (ht.prototype.serialize = function () {
      return ['at', this.index.serialize(), this.input.serialize()];
    });
  var dt = { kind: 'boolean' },
    yt = function (t, e, r) {
      (this.type = t), (this.branches = e), (this.otherwise = r);
    };
  (yt.parse = function (t, e) {
    if (t.length < 4)
      return e.error(
        'Expected at least 3 arguments, but found only ' + (t.length - 1) + '.',
      );
    if (t.length % 2 != 0)
      return e.error('Expected an odd number of arguments.');
    var r;
    e.expectedType && 'value' !== e.expectedType.kind && (r = e.expectedType);
    for (var n = [], i = 1; i < t.length - 1; i += 2) {
      var a = e.parse(t[i], i, dt);
      if (!a) return null;
      var o = e.parse(t[i + 1], i + 1, r);
      if (!o) return null;
      n.push([a, o]), (r = r || o.type);
    }
    var s = e.parse(t[t.length - 1], t.length - 1, r);
    return s ? new yt(r, n, s) : null;
  }),
    (yt.prototype.evaluate = function (t) {
      for (var e = 0, r = this.branches; e < r.length; e += 1) {
        var n = r[e],
          i = n[0],
          a = n[1];
        if (i.evaluate(t)) return a.evaluate(t);
      }
      return this.otherwise.evaluate(t);
    }),
    (yt.prototype.eachChild = function (t) {
      for (var e = 0, r = this.branches; e < r.length; e += 1) {
        var n = r[e],
          i = n[0],
          a = n[1];
        t(i), t(a);
      }
      t(this.otherwise);
    }),
    (yt.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat
        .apply(
          t,
          this.branches.map(function (t) {
            t[0];
            return t[1].possibleOutputs();
          }),
        )
        .concat(this.otherwise.possibleOutputs());
    }),
    (yt.prototype.serialize = function () {
      var t = ['case'];
      return (
        this.eachChild(function (e) {
          t.push(e.serialize());
        }),
        t
      );
    });
  var mt = { kind: 'value' },
    vt = function (t, e) {
      (this.type = t), (this.args = e);
    };
  (vt.parse = function (t, e) {
    if (t.length < 2) return e.error('Expectected at least one argument.');
    var r = null,
      n = e.expectedType;
    n && 'value' !== n.kind && (r = n);
    for (var i = [], a = 0, o = t.slice(1); a < o.length; a += 1) {
      var s = o[a],
        u = e.parse(s, 1 + i.length, r, void 0, { typeAnnotation: 'omit' });
      if (!u) return null;
      (r = r || u.type), i.push(u);
    }
    var l =
      n &&
      i.some(function (t) {
        return V(n, t.type);
      });
    return new vt(l ? mt : r, i);
  }),
    (vt.prototype.evaluate = function (t) {
      for (var e, r = null, n = 0, i = 0, a = this.args; i < a.length; i += 1) {
        if (
          (n++,
          (r = a[i].evaluate(t)) &&
            r instanceof q &&
            !r.available &&
            (e || (e = r.name), (r = null), n === this.args.length && (r = e)),
          null !== r)
        )
          break;
      }
      return r;
    }),
    (vt.prototype.eachChild = function (t) {
      this.args.forEach(t);
    }),
    (vt.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat.apply(
        t,
        this.args.map(function (t) {
          return t.possibleOutputs();
        }),
      );
    }),
    (vt.prototype.serialize = function () {
      var t = ['coalesce'];
      return (
        this.eachChild(function (e) {
          t.push(e.serialize());
        }),
        t
      );
    });
  var gt = { kind: 'number' },
    xt = { kind: 'string' },
    bt = { kind: 'boolean' },
    _t = { kind: 'color' },
    wt = { kind: 'value' },
    Et = { 'to-boolean': bt, 'to-color': _t, 'to-number': gt, 'to-string': xt },
    Tt = function (t, e) {
      (this.type = t), (this.args = e);
    };
  (Tt.parse = function (t, e) {
    if (t.length < 2) return e.error('Expected at least one argument.');
    var r = t[0];
    if (('to-boolean' === r || 'to-string' === r) && 2 !== t.length)
      return e.error('Expected one argument.');
    for (var n = Et[r], i = [], a = 1; a < t.length; a++) {
      var o = e.parse(t[a], a, wt);
      if (!o) return null;
      i.push(o);
    }
    return new Tt(n, i);
  }),
    (Tt.prototype.evaluate = function (t) {
      if ('boolean' === this.type.kind)
        return Boolean(this.args[0].evaluate(t));
      if ('color' === this.type.kind) {
        for (var e, r, n = 0, i = this.args; n < i.length; n += 1) {
          if (((r = null), (e = i[n].evaluate(t)) instanceof Color)) return e;
          if ('string' == typeof e) {
            var a = t.parseColor(e);
            if (a) return a;
          } else if (
            Array.isArray(e) &&
            !(r =
              e.length < 3 || e.length > 4
                ? 'Invalid rbga value ' +
                  JSON.stringify(e) +
                  ': expected an array containing either three or four numeric values.'
                : validateRGBA(e[0], e[1], e[2], e[3]))
          )
            return new Color(e[0] / 255, e[1] / 255, e[2] / 255, e[3]);
        }
        throw new RuntimeError(
          r ||
            "Could not parse color from value '" +
              ('string' == typeof e ? e : String(JSON.stringify(e))) +
              "'",
        );
      }
      if ('number' === this.type.kind) {
        for (var o = null, s = 0, u = this.args; s < u.length; s += 1) {
          if (null === (o = u[s].evaluate(t))) return 0;
          var l = Number(o);
          if (!isNaN(l)) return l;
        }
        throw new RuntimeError(
          'Could not convert ' + JSON.stringify(o) + ' to number.',
        );
      }
      return 'formatted' === this.type.kind
        ? Formatted.fromString(et.toString$1(this.args[0].evaluate(t)))
        : 'resolvedImage' === this.type.kind
        ? q.fromString(et.toString$1(this.args[0].evaluate(t)))
        : et.toString$1(this.args[0].evaluate(t));
    }),
    (Tt.prototype.eachChild = function (t) {
      this.args.forEach(t);
    }),
    (Tt.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat.apply(
        t,
        this.args.map(function (t) {
          return t.possibleOutputs();
        }),
      );
    }),
    (Tt.prototype.serialize = function () {
      if ('formatted' === this.type.kind)
        return new FormatExpression([
          { content: this.args[0], scale: null, font: null, textColor: null },
        ]).serialize();
      if ('resolvedImage' === this.type.kind)
        return new ImageExpression(this.args[0]).serialize();
      var t = ['to-' + this.type.kind];
      return (
        this.eachChild(function (e) {
          t.push(e.serialize());
        }),
        t
      );
    });
  var At = { kind: 'string' },
    St = { kind: 'boolean' },
    It = { kind: 'collator' },
    kt = function (t, e, r) {
      (this.type = It),
        (this.locale = r),
        (this.caseSensitive = t),
        (this.diacriticSensitive = e);
    };
  (kt.parse = function (t, e) {
    if (2 !== t.length) return e.error('Expected one argument.');
    var r = t[1];
    if ('object' != typeof r || Array.isArray(r))
      return e.error('Collator options argument must be an object.');
    var n = e.parse(
      void 0 !== r['case-sensitive'] && r['case-sensitive'],
      1,
      St,
    );
    if (!n) return null;
    var i = e.parse(
      void 0 !== r['diacritic-sensitive'] && r['diacritic-sensitive'],
      1,
      St,
    );
    if (!i) return null;
    var a = null;
    return r.locale && !(a = e.parse(r.locale, 1, At)) ? null : new kt(n, i, a);
  }),
    (kt.prototype.evaluate = function (t) {
      return new N(
        this.caseSensitive.evaluate(t),
        this.diacriticSensitive.evaluate(t),
        this.locale ? this.locale.evaluate(t) : null,
      );
    }),
    (kt.prototype.eachChild = function (t) {
      t(this.caseSensitive),
        t(this.diacriticSensitive),
        this.locale && t(this.locale);
    }),
    (kt.prototype.possibleOutputs = function () {
      return [void 0];
    }),
    (kt.prototype.serialize = function () {
      var t = {};
      return (
        (t['case-sensitive'] = this.caseSensitive.serialize()),
        (t['diacritic-sensitive'] = this.diacriticSensitive.serialize()),
        this.locale && (t.locale = this.locale.serialize()),
        ['collator', t]
      );
    });
  var Mt = { kind: 'boolean' },
    Ot = { kind: 'value' },
    Pt = { kind: 'collator' };
  function zt(t, e) {
    return '==' === t || '!=' === t
      ? 'boolean' === e.kind ||
          'string' === e.kind ||
          'number' === e.kind ||
          'null' === e.kind ||
          'value' === e.kind
      : 'string' === e.kind || 'number' === e.kind || 'value' === e.kind;
  }
  function Rt(t, e, r) {
    return e === r;
  }
  function Ft(t, e, r) {
    return e !== r;
  }
  function Ct(t, e, r) {
    return e < r;
  }
  function Dt(t, e, r) {
    return e > r;
  }
  function Bt(t, e, r) {
    return e <= r;
  }
  function Ut(t, e, r) {
    return e >= r;
  }
  function Vt(t, e, r, n) {
    return 0 === n.compare(e, r);
  }
  function Nt(t, e, r, n) {
    return !Vt(0, e, r, n);
  }
  function Lt(t, e, r, n) {
    return n.compare(e, r) < 0;
  }
  function Xt(t, e, r, n) {
    return n.compare(e, r) > 0;
  }
  function qt(t, e, r, n) {
    return n.compare(e, r) <= 0;
  }
  function jt(t, e, r, n) {
    return n.compare(e, r) >= 0;
  }
  function Ht(t, e, r) {
    var n = '==' !== t && '!=' !== t;
    return (function () {
      function i(t, e, r) {
        (this.type = Mt),
          (this.lhs = t),
          (this.rhs = e),
          (this.collator = r),
          (this.hasUntypedArgument =
            'value' === t.type.kind || 'value' === e.type.kind);
      }
      return (
        (i.parse = function (t, e) {
          if (3 !== t.length && 4 !== t.length)
            return e.error('Expected two or three arguments.');
          var r = t[0],
            a = e.parse(t[1], 1, Ot);
          if (!a) return null;
          if (!zt(r, a.type))
            return e
              .concat(1)
              .error(
                '"' +
                  r +
                  '" comparisons are not supported for type \'' +
                  toString(a.type) +
                  "'.",
              );
          var o = e.parse(t[2], 2, Ot);
          if (!o) return null;
          if (!zt(r, o.type))
            return e
              .concat(2)
              .error(
                '"' +
                  r +
                  '" comparisons are not supported for type \'' +
                  toString(o.type) +
                  "'.",
              );
          if (
            a.type.kind !== o.type.kind &&
            'value' !== a.type.kind &&
            'value' !== o.type.kind
          )
            return e.error(
              "Cannot compare types '" +
                toString(a.type) +
                "' and '" +
                toString(o.type) +
                "'.",
            );
          n &&
            ('value' === a.type.kind && 'value' !== o.type.kind
              ? (a = new lt(o.type, [a]))
              : 'value' !== a.type.kind &&
                'value' === o.type.kind &&
                (o = new lt(a.type, [o])));
          var s = null;
          if (4 === t.length) {
            if (
              'string' !== a.type.kind &&
              'string' !== o.type.kind &&
              'value' !== a.type.kind &&
              'value' !== o.type.kind
            )
              return e.error(
                'Cannot use collator to compare non-string types.',
              );
            if (!(s = e.parse(t[3], 3, Pt))) return null;
          }
          return new i(a, o, s);
        }),
        (i.prototype.evaluate = function (i) {
          var a = this.lhs.evaluate(i),
            o = this.rhs.evaluate(i);
          if (n && this.hasUntypedArgument) {
            var s = et.typeOf(a),
              u = et.typeOf(o);
            if (
              s.kind !== u.kind ||
              ('string' !== s.kind && 'number' !== s.kind)
            )
              throw new RuntimeError(
                'Expected arguments for "' +
                  t +
                  '" to be (string, string) or (number, number), but found (' +
                  s.kind +
                  ', ' +
                  u.kind +
                  ') instead.',
              );
          }
          if (this.collator && !n && this.hasUntypedArgument) {
            var l = et.typeOf(a),
              p = et.typeOf(o);
            if ('string' !== l.kind || 'string' !== p.kind) return e(i, a, o);
          }
          return this.collator
            ? r(i, a, o, this.collator.evaluate(i))
            : e(i, a, o);
        }),
        (i.prototype.eachChild = function (t) {
          t(this.lhs), t(this.rhs), this.collator && t(this.collator);
        }),
        (i.prototype.possibleOutputs = function () {
          return [!0, !1];
        }),
        (i.prototype.serialize = function () {
          var e = [t];
          return (
            this.eachChild(function (t) {
              e.push(t.serialize());
            }),
            e
          );
        }),
        i
      );
    })();
  }
  var Yt = {};
  (Yt.Equals = Ht('==', Rt, Vt)),
    (Yt.NotEquals = Ht('!=', Ft, Nt)),
    (Yt.LessThan = Ht('<', Ct, Lt)),
    (Yt.GreaterThan = Ht('>', Dt, Xt)),
    (Yt.LessThanOrEqual = Ht('<=', Bt, qt)),
    (Yt.GreaterThanOrEqual = Ht('>=', Ut, jt));
  var Qt = { kind: 'number' },
    Kt = { kind: 'string' },
    Gt = { kind: 'color' },
    Wt = { kind: 'value' },
    Jt = { kind: 'formatted' },
    Zt = { kind: 'resolvedImage' };
  function $t(t, e) {
    return { kind: 'array', itemType: t, N: e };
  }
  var te = function (t) {
    (this.type = Jt), (this.sections = t);
  };
  (te.parse = function (t, e) {
    if (t.length < 2) return e.error('Expected at least one argument.');
    var r = t[1];
    if (!Array.isArray(r) && 'object' == typeof r)
      return e.error('First argument must be an image or text section.');
    for (var n = [], i = !1, a = 1; a <= t.length - 1; ++a) {
      var o = t[a];
      if (i && 'object' == typeof o && !Array.isArray(o)) {
        i = !1;
        var s = null;
        if (o['font-scale'] && !(s = e.parse(o['font-scale'], 1, Qt)))
          return null;
        var u = null;
        if (o['text-font'] && !(u = e.parse(o['text-font'], 1, $t(Kt))))
          return null;
        var l = null;
        if (o['text-color'] && !(l = e.parse(o['text-color'], 1, Gt)))
          return null;
        var p = n[n.length - 1];
        (p.scale = s), (p.font = u), (p.textColor = l);
      } else {
        var c = e.parse(t[a], 1, Wt);
        if (!c) return null;
        var f = c.type.kind;
        if (
          'string' !== f &&
          'value' !== f &&
          'null' !== f &&
          'resolvedImage' !== f
        )
          return e.error(
            "Formatted text type must be 'string', 'value', 'image' or 'null'.",
          );
        (i = !0),
          n.push({ content: c, scale: null, font: null, textColor: null });
      }
    }
    return new te(n);
  }),
    (te.prototype.evaluate = function (t) {
      return new X(
        this.sections.map(function (e) {
          var r = e.content.evaluate(t);
          return et.typeOf(r) === Zt
            ? new L('', r, null, null, null)
            : new L(
                et.toString$1(r),
                null,
                e.scale ? e.scale.evaluate(t) : null,
                e.font ? e.font.evaluate(t).join(',') : null,
                e.textColor ? e.textColor.evaluate(t) : null,
              );
        }),
      );
    }),
    (te.prototype.eachChild = function (t) {
      for (var e = 0, r = this.sections; e < r.length; e += 1) {
        var n = r[e];
        t(n.content),
          n.scale && t(n.scale),
          n.font && t(n.font),
          n.textColor && t(n.textColor);
      }
    }),
    (te.prototype.possibleOutputs = function () {
      return [void 0];
    }),
    (te.prototype.serialize = function () {
      for (var t = ['format'], e = 0, r = this.sections; e < r.length; e += 1) {
        var n = r[e];
        t.push(n.content.serialize());
        var i = {};
        n.scale && (i['font-scale'] = n.scale.serialize()),
          n.font && (i['text-font'] = n.font.serialize()),
          n.textColor && (i['text-color'] = n.textColor.serialize()),
          t.push(i);
      }
      return t;
    });
  var ee = { kind: 'string' },
    re = { kind: 'resolvedImage' },
    ne = function (t) {
      (this.type = re), (this.input = t);
    };
  (ne.parse = function (t, e) {
    if (2 !== t.length) return e.error('Expected two arguments.');
    var r = e.parse(t[1], 1, ee);
    return r ? new ne(r) : e.error('No image name provided.');
  }),
    (ne.prototype.evaluate = function (t) {
      var e = this.input.evaluate(t),
        r = !1;
      return (
        t.availableImages && t.availableImages.indexOf(e) > -1 && (r = !0),
        new q({ name: e, available: r })
      );
    }),
    (ne.prototype.eachChild = function (t) {
      t(this.input);
    }),
    (ne.prototype.possibleOutputs = function () {
      return [void 0];
    }),
    (ne.prototype.serialize = function () {
      return ['image', this.input.serialize()];
    });
  var ie = function (t, e, r, n, i) {
      (this.type = t),
        (this.operator = e),
        (this.interpolation = r),
        (this.input = n),
        (this.labels = []),
        (this.outputs = []);
      for (var a = 0, o = i; a < o.length; a += 1) {
        var s = o[a],
          u = s[0],
          l = s[1];
        this.labels.push(u), this.outputs.push(l);
      }
    },
    ae = { kind: 'number' },
    oe = { kind: 'color' };
  function se(t, e, r, n) {
    var i = n - r,
      a = t - r;
    return 0 === i
      ? 0
      : 1 === e
      ? a / i
      : (Math.pow(e, a) - 1) / (Math.pow(e, i) - 1);
  }
  (ie.interpolationFactor = function (t, e, r, n) {
    var i = 0;
    if ('exponential' === t.name) i = se(e, t.base, r, n);
    else if ('linear' === t.name) i = se(e, 1, r, n);
    else if ('cubic-bezier' === t.name) {
      var a = t.controlPoints;
      i = new unitbezier(a[0], a[1], a[2], a[3]).solve(se(e, 1, r, n));
    }
    return i;
  }),
    (ie.parse = function (t, e) {
      var r = t[0],
        n = t[1],
        i = t[2],
        a = t.slice(3);
      if (!Array.isArray(n) || 0 === n.length)
        return e.error('Expected an interpolation type expression.', 1);
      if ('linear' === n[0]) n = { name: 'linear' };
      else if ('exponential' === n[0]) {
        var o = n[1];
        if ('number' != typeof o)
          return e.error(
            'Exponential interpolation requires a numeric base.',
            1,
            1,
          );
        n = { name: 'exponential', base: o };
      } else {
        if ('cubic-bezier' !== n[0])
          return e.error('Unknown interpolation type ' + String(n[0]), 1, 0);
        var s = n.slice(1);
        if (
          4 !== s.length ||
          s.some(function (t) {
            return 'number' != typeof t || t < 0 || t > 1;
          })
        )
          return e.error(
            'Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.',
            1,
          );
        n = { name: 'cubic-bezier', controlPoints: s };
      }
      if (t.length - 1 < 4)
        return e.error(
          'Expected at least 4 arguments, but found only ' +
            (t.length - 1) +
            '.',
        );
      if ((t.length - 1) % 2 != 0)
        return e.error('Expected an even number of arguments.');
      if (!(i = e.parse(i, 2, ae))) return null;
      var u = [],
        l = null;
      'interpolate-hcl' === r || 'interpolate-lab' === r
        ? (l = oe)
        : e.expectedType &&
          'value' !== e.expectedType.kind &&
          (l = e.expectedType);
      for (var p = 0; p < a.length; p += 2) {
        var c = a[p],
          f = a[p + 1],
          h = p + 3,
          d = p + 4;
        if ('number' != typeof c)
          return e.error(
            'Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.',
            h,
          );
        if (u.length && u[u.length - 1][0] >= c)
          return e.error(
            'Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.',
            h,
          );
        var y = e.parse(f, d, l);
        if (!y) return null;
        (l = l || y.type), u.push([c, y]);
      }
      return 'number' === l.kind ||
        'color' === l.kind ||
        ('array' === l.kind &&
          'number' === l.itemType.kind &&
          'number' == typeof l.N)
        ? new ie(l, r, n, i, u)
        : e.error('Type ' + toString(l) + ' is not interpolatable.');
    }),
    (ie.prototype.evaluate = function (t) {
      var e = this.labels,
        r = this.outputs;
      if (1 === e.length) return r[0].evaluate(t);
      var n = this.input.evaluate(t);
      if (n <= e[0]) return r[0].evaluate(t);
      var i = e.length;
      if (n >= e[i - 1]) return r[i - 1].evaluate(t);
      var a = findStopLessThanOrEqualTo(e, n),
        o = e[a],
        s = e[a + 1],
        u = ie.interpolationFactor(this.interpolation, n, o, s),
        l = r[a].evaluate(t),
        p = r[a + 1].evaluate(t);
      return 'interpolate' === this.operator
        ? interpolate[this.type.kind.toLowerCase()](l, p, u)
        : 'interpolate-hcl' === this.operator
        ? hcl.reverse(hcl.interpolate(hcl.forward(l), hcl.forward(p), u))
        : lab.reverse(lab.interpolate(lab.forward(l), lab.forward(p), u));
    }),
    (ie.prototype.eachChild = function (t) {
      t(this.input);
      for (var e = 0, r = this.outputs; e < r.length; e += 1) {
        t(r[e]);
      }
    }),
    (ie.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat.apply(
        t,
        this.outputs.map(function (t) {
          return t.possibleOutputs();
        }),
      );
    }),
    (ie.prototype.serialize = function () {
      var t;
      t =
        'linear' === this.interpolation.name
          ? ['linear']
          : 'exponential' === this.interpolation.name
          ? 1 === this.interpolation.base
            ? ['linear']
            : ['exponential', this.interpolation.base]
          : ['cubic-bezier'].concat(this.interpolation.controlPoints);
      for (
        var e = [this.operator, t, this.input.serialize()], r = 0;
        r < this.labels.length;
        r++
      )
        e.push(this.labels[r], this.outputs[r].serialize());
      return e;
    });
  var ue = { kind: 'boolean' },
    le = { kind: 'value' };
  function pe(t) {
    return (
      'boolean' === t.kind ||
      'string' === t.kind ||
      'number' === t.kind ||
      'null' === t.kind ||
      'value' === t.kind
    );
  }
  function ce(t) {
    return (
      'boolean' == typeof t || 'string' == typeof t || 'number' == typeof t
    );
  }
  function fe(t) {
    return Array.isArray(t) || 'string' == typeof t;
  }
  var he = function (t, e) {
    (this.type = ue), (this.needle = t), (this.haystack = e);
  };
  (he.parse = function (t, e) {
    if (3 !== t.length)
      return e.error(
        'Expected 2 arguments, but found ' + (t.length - 1) + ' instead.',
      );
    var r = e.parse(t[1], 1, le),
      n = e.parse(t[2], 2, le);
    return r && n
      ? pe(r.type)
        ? new he(r, n)
        : e.error(
            'Expected first argument to be of type boolean, string, number or null, but found ' +
              toString(r.type) +
              ' instead',
          )
      : null;
  }),
    (he.prototype.evaluate = function (t) {
      var e = this.needle.evaluate(t),
        r = this.haystack.evaluate(t);
      if (!e || !r) return !1;
      if (!ce(e))
        throw new RuntimeError(
          'Expected first argument to be of type boolean, string or number, but found ' +
            toString(typeOf(e)) +
            ' instead.',
        );
      if (!fe(r))
        throw new RuntimeError(
          'Expected second argument to be of type array or string, but found ' +
            toString(typeOf(r)) +
            ' instead.',
        );
      return r.indexOf(e) >= 0;
    }),
    (he.prototype.eachChild = function (t) {
      t(this.needle), t(this.haystack);
    }),
    (he.prototype.possibleOutputs = function () {
      return [!0, !1];
    }),
    (he.prototype.serialize = function () {
      return ['in', this.needle.serialize(), this.haystack.serialize()];
    });
  var de = function (t, e) {
    (this.type = e.type), (this.bindings = [].concat(t)), (this.result = e);
  };
  (de.prototype.evaluate = function (t) {
    return this.result.evaluate(t);
  }),
    (de.prototype.eachChild = function (t) {
      for (var e = 0, r = this.bindings; e < r.length; e += 1) {
        t(r[e][1]);
      }
      t(this.result);
    }),
    (de.parse = function (t, e) {
      if (t.length < 4)
        return e.error(
          'Expected at least 3 arguments, but found ' +
            (t.length - 1) +
            ' instead.',
        );
      for (var r = [], n = 1; n < t.length - 1; n += 2) {
        var i = t[n];
        if ('string' != typeof i)
          return e.error(
            'Expected string, but found ' + typeof i + ' instead.',
            n,
          );
        if (/[^a-zA-Z0-9_]/.test(i))
          return e.error(
            "Variable names must contain only alphanumeric characters or '_'.",
            n,
          );
        var a = e.parse(t[n + 1], n + 1);
        if (!a) return null;
        r.push([i, a]);
      }
      var o = e.parse(t[t.length - 1], t.length - 1, e.expectedType, r);
      return o ? new de(r, o) : null;
    }),
    (de.prototype.possibleOutputs = function () {
      return this.result.possibleOutputs();
    }),
    (de.prototype.serialize = function () {
      for (var t = ['let'], e = 0, r = this.bindings; e < r.length; e += 1) {
        var n = r[e],
          i = n[0],
          a = n[1];
        t.push(i, a.serialize());
      }
      return t.push(this.result.serialize()), t;
    });
  var ye = { kind: 'number' },
    me = function (t) {
      (this.type = ye), (this.input = t);
    };
  (me.parse = function (t, e) {
    if (2 !== t.length)
      return e.error(
        'Expected 1 argument, but found ' + (t.length - 1) + ' instead.',
      );
    var r = e.parse(t[1], 1);
    return r
      ? 'array' !== r.type.kind &&
        'string' !== r.type.kind &&
        'value' !== r.type.kind
        ? e.error(
            'Expected argument of type string or array, but found ' +
              toString(r.type) +
              ' instead.',
          )
        : new me(r)
      : null;
  }),
    (me.prototype.evaluate = function (t) {
      var e = this.input.evaluate(t);
      if ('string' == typeof e) return e.length;
      if (Array.isArray(e)) return e.length;
      throw new RuntimeError(
        'Expected value to be of type string or array, but found ' +
          toString(typeOf(e)) +
          ' instead.',
      );
    }),
    (me.prototype.eachChild = function (t) {
      t(this.input);
    }),
    (me.prototype.possibleOutputs = function () {
      return [void 0];
    }),
    (me.prototype.serialize = function () {
      var t = ['length'];
      return (
        this.eachChild(function (e) {
          t.push(e.serialize());
        }),
        t
      );
    });
  var ve = function (t, e) {
    (this.type = t), (this.value = e);
  };
  (ve.parse = function (t, e) {
    if (2 !== t.length)
      return e.error(
        "'literal' expression requires exactly one argument, but found " +
          (t.length - 1) +
          ' instead.',
      );
    if (!et.isValue(t[1])) return e.error('invalid value');
    var r = t[1],
      n = et.typeOf(r),
      i = e.expectedType;
    return (
      'array' !== n.kind ||
        0 !== n.N ||
        !i ||
        'array' !== i.kind ||
        ('number' == typeof i.N && 0 !== i.N) ||
        (n = i),
      new ve(n, r)
    );
  }),
    (ve.prototype.evaluate = function () {
      return this.value;
    }),
    (ve.prototype.eachChild = function () {}),
    (ve.prototype.possibleOutputs = function () {
      return [this.value];
    }),
    (ve.prototype.serialize = function () {
      return 'array' === this.type.kind || 'object' === this.type.kind
        ? ['literal', this.value]
        : this.value instanceof Color
        ? ['rgba'].concat(this.value.toArray())
        : this.value instanceof X
        ? this.value.serialize()
        : this.value;
    });
  var ge = { kind: 'value' },
    xe = function (t, e, r, n, i, a) {
      (this.inputType = t),
        (this.type = e),
        (this.input = r),
        (this.cases = n),
        (this.outputs = i),
        (this.otherwise = a);
    };
  (xe.parse = function (t, e) {
    if (t.length < 5)
      return e.error(
        'Expected at least 4 arguments, but found only ' + (t.length - 1) + '.',
      );
    if (t.length % 2 != 1)
      return e.error('Expected an even number of arguments.');
    var r, n;
    e.expectedType && 'value' !== e.expectedType.kind && (n = e.expectedType);
    for (var i = {}, a = [], o = 2; o < t.length - 1; o += 2) {
      var s = t[o],
        u = t[o + 1];
      Array.isArray(s) || (s = [s]);
      var l = e.concat(o);
      if (0 === s.length) return l.error('Expected at least one branch label.');
      for (var p = 0, c = s; p < c.length; p += 1) {
        var f = c[p];
        if ('number' != typeof f && 'string' != typeof f)
          return l.error('Branch labels must be numbers or strings.');
        if ('number' == typeof f && Math.abs(f) > Number.MAX_SAFE_INTEGER)
          return l.error(
            'Branch labels must be integers no larger than ' +
              Number.MAX_SAFE_INTEGER +
              '.',
          );
        if ('number' == typeof f && Math.floor(f) !== f)
          return l.error('Numeric branch labels must be integer values.');
        if (r) {
          if (l.checkSubtype(r, et.typeOf(f))) return null;
        } else r = et.typeOf(f);
        if (void 0 !== i[String(f)])
          return l.error('Branch labels must be unique.');
        i[String(f)] = a.length;
      }
      var h = e.parse(u, o, n);
      if (!h) return null;
      (n = n || h.type), a.push(h);
    }
    var d = e.parse(t[1], 1, ge);
    if (!d) return null;
    var y = e.parse(t[t.length - 1], t.length - 1, n);
    return y
      ? 'value' !== d.type.kind && e.concat(1).checkSubtype(r, d.type)
        ? null
        : new xe(r, n, d, i, a, y)
      : null;
  }),
    (xe.prototype.evaluate = function (t) {
      var e = this.input.evaluate(t);
      return (
        (et.typeOf(e) === this.inputType && this.outputs[this.cases[e]]) ||
        this.otherwise
      ).evaluate(t);
    }),
    (xe.prototype.eachChild = function (t) {
      t(this.input), this.outputs.forEach(t), t(this.otherwise);
    }),
    (xe.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat
        .apply(
          t,
          this.outputs.map(function (t) {
            return t.possibleOutputs();
          }),
        )
        .concat(this.otherwise.possibleOutputs());
    }),
    (xe.prototype.serialize = function () {
      for (
        var t = this,
          e = ['match', this.input.serialize()],
          r = [],
          n = {},
          i = 0,
          a = Object.keys(this.cases).sort();
        i < a.length;
        i += 1
      ) {
        var o = a[i];
        void 0 === (c = n[this.cases[o]])
          ? ((n[this.cases[o]] = r.length), r.push([this.cases[o], [o]]))
          : r[c][1].push(o);
      }
      for (
        var s = function (e) {
            return 'number' === t.inputType.kind ? Number(e) : e;
          },
          u = 0,
          l = r;
        u < l.length;
        u += 1
      ) {
        var p = l[u],
          c = p[0],
          f = p[1];
        1 === f.length ? e.push(s(f[0])) : e.push(f.map(s)),
          e.push(this.outputs[outputIndex$1].serialize());
      }
      return e.push(this.otherwise.serialize()), e;
    });
  var be = { kind: 'number' },
    _e = { kind: 'string' },
    we = function (t, e, r, n, i) {
      (this.type = _e),
        (this.number = t),
        (this.locale = e),
        (this.currency = r),
        (this.minFractionDigits = n),
        (this.maxFractionDigits = i);
    };
  function Ee(t, e) {
    for (var r, n, i = t.length - 1, a = 0, o = i, s = 0; a <= o; )
      if (((r = t[(s = Math.floor((a + o) / 2))]), (n = t[s + 1]), r <= e)) {
        if (s === i || e < n) return s;
        a = s + 1;
      } else {
        if (!(r > e)) throw new RuntimeError('Input is not a number.');
        o = s - 1;
      }
    return 0;
  }
  (we.parse = function (t, e) {
    if (3 !== t.length) return e.error('Expected two arguments.');
    var r = e.parse(t[1], 1, be);
    if (!r) return null;
    var n = t[2];
    if ('object' != typeof n || Array.isArray(n))
      return e.error('NumberFormat options argument must be an object.');
    var i = null;
    if (n.locale && !(i = e.parse(n.locale, 1, _e))) return null;
    var a = null;
    if (n.currency && !(a = e.parse(n.currency, 1, _e))) return null;
    var o = null;
    if (
      n['min-fraction-digits'] &&
      !(o = e.parse(n['min-fraction-digits'], 1, be))
    )
      return null;
    var s = null;
    return n['max-fraction-digits'] &&
      !(s = e.parse(n['max-fraction-digits'], 1, be))
      ? null
      : new we(r, i, a, o, s);
  }),
    (we.prototype.evaluate = function (t) {
      return new Intl.NumberFormat(this.locale ? this.locale.evaluate(t) : [], {
        style: this.currency ? 'currency' : 'decimal',
        currency: this.currency ? this.currency.evaluate(t) : void 0,
        minimumFractionDigits: this.minFractionDigits
          ? this.minFractionDigits.evaluate(t)
          : void 0,
        maximumFractionDigits: this.maxFractionDigits
          ? this.maxFractionDigits.evaluate(t)
          : void 0,
      }).format(this.number.evaluate(t));
    }),
    (we.prototype.eachChild = function (t) {
      t(this.number),
        this.locale && t(this.locale),
        this.currency && t(this.currency),
        this.minFractionDigits && t(this.minFractionDigits),
        this.maxFractionDigits && t(this.maxFractionDigits);
    }),
    (we.prototype.possibleOutputs = function () {
      return [void 0];
    }),
    (we.prototype.serialize = function () {
      var t = {};
      return (
        this.locale && (t.locale = this.locale.serialize()),
        this.currency && (t.currency = this.currency.serialize()),
        this.minFractionDigits &&
          (t['min-fraction-digits'] = this.minFractionDigits.serialize()),
        this.maxFractionDigits &&
          (t['max-fraction-digits'] = this.maxFractionDigits.serialize()),
        ['number-format', this.number.serialize(), t]
      );
    });
  var Te = { kind: 'number' },
    Ae = function (t, e, r) {
      (this.type = t),
        (this.input = e),
        (this.labels = []),
        (this.outputs = []);
      for (var n = 0, i = r; n < i.length; n += 1) {
        var a = i[n],
          o = a[0],
          s = a[1];
        this.labels.push(o), this.outputs.push(s);
      }
    };
  (Ae.parse = function (t, e) {
    if (t.length - 1 < 4)
      return e.error(
        'Expected at least 4 arguments, but found only ' + (t.length - 1) + '.',
      );
    if ((t.length - 1) % 2 != 0)
      return e.error('Expected an even number of arguments.');
    var r = e.parse(t[1], 1, Te);
    if (!r) return null;
    var n = [],
      i = null;
    e.expectedType && 'value' !== e.expectedType.kind && (i = e.expectedType);
    for (var a = 1; a < t.length; a += 2) {
      var o = 1 === a ? -1 / 0 : t[a],
        s = t[a + 1],
        u = a,
        l = a + 1;
      if ('number' != typeof o)
        return e.error(
          'Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.',
          u,
        );
      if (n.length && n[n.length - 1][0] >= o)
        return e.error(
          'Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.',
          u,
        );
      var p = e.parse(s, l, i);
      if (!p) return null;
      (i = i || p.type), n.push([o, p]);
    }
    return new Ae(i, r, n);
  }),
    (Ae.prototype.evaluate = function (t) {
      var e = this.labels,
        r = this.outputs;
      if (1 === e.length) return r[0].evaluate(t);
      var n = this.input.evaluate(t);
      if (n <= e[0]) return r[0].evaluate(t);
      var i = e.length;
      return n >= e[i - 1] ? r[i - 1].evaluate(t) : r[Ee(e, n)].evaluate(t);
    }),
    (Ae.prototype.eachChild = function (t) {
      t(this.input);
      for (var e = 0, r = this.outputs; e < r.length; e += 1) {
        t(r[e]);
      }
    }),
    (Ae.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat.apply(
        t,
        this.outputs.map(function (t) {
          return t.possibleOutputs();
        }),
      );
    }),
    (Ae.prototype.serialize = function () {
      for (
        var t = ['step', this.input.serialize()], e = 0;
        e < this.labels.length;
        e++
      )
        e > 0 && t.push(this.labels[e]), t.push(this.outputs[e].serialize());
      return t;
    });
  var Se = function (t, e) {
    (this.type = e.type), (this.name = t), (this.boundExpression = e);
  };
  (Se.parse = function (t, e) {
    if (2 !== t.length || 'string' != typeof t[1])
      return e.error(
        "'var' expression requires exactly one string literal argument.",
      );
    var r = t[1];
    return e.scope.has(r)
      ? new Se(r, e.scope.get(r))
      : e.error(
          'Unknown variable "' +
            r +
            '". Make sure "' +
            r +
            '" has been bound in an enclosing "let" expression before using it.',
          1,
        );
  }),
    (Se.prototype.evaluate = function (t) {
      return this.boundExpression.evaluate(t);
    }),
    (Se.prototype.eachChild = function () {}),
    (Se.prototype.possibleOutputs = function () {
      return [void 0];
    }),
    (Se.prototype.serialize = function () {
      return ['var', this.name];
    });
  var Ie = {
    '==': Yt.Equals,
    '!=': Yt.NotEquals,
    '>': Yt.GreaterThan,
    '<': Yt.LessThan,
    '>=': Yt.GreaterThanOrEqual,
    '<=': Yt.LessThanOrEqual,
    array: lt,
    at: ht,
    boolean: lt,
    case: yt,
    coalesce: vt,
    collator: kt,
    format: te,
    image: ne,
    in: he,
    interpolate: ie,
    'interpolate-hcl': ie,
    'interpolate-lab': ie,
    length: me,
    let: de,
    literal: ve,
    match: xe,
    number: lt,
    'number-format': we,
    object: lt,
    step: Ae,
    string: lt,
    'to-boolean': Tt,
    'to-color': Tt,
    'to-number': Tt,
    'to-string': Tt,
    var: Se,
  };
  function ke() {}
  var Me = {};
  for (var Oe in ((ke.register = function (t, e, r) {
    void 0 === r && (r = {}),
      Object.defineProperty(e, '_classRegistryKey', {
        value: t,
        writeable: !1,
      }),
      (Me[t] = { klass: e, omit: r.omit || [], shallow: r.shallow || [] });
  }),
  ke.register('Object', Object),
  ke.register('Color', S),
  ke.register('ResolvedImage', q),
  ke.register('ImageAtlas', g),
  ke.register('ImagePosition', p),
  ke.register('RGBAImage', f),
  ke.register('Formatted', X),
  ke.register('FormattedSection', L),
  Ie))
    Ie[Oe]._classRegistryKey || ke.register('Expression_' + Oe, Ie[Oe]);
  function Pe(t) {
    return (
      t &&
      'undefined' != typeof ArrayBuffer &&
      (t instanceof ArrayBuffer ||
        (t.constructor && 'ArrayBuffer' === t.constructor.name))
    );
  }
  (ke.serialize = function (t, e) {
    if (
      null == t ||
      'boolean' == typeof t ||
      'number' == typeof t ||
      'string' == typeof t ||
      t instanceof Boolean ||
      t instanceof Number ||
      t instanceof String ||
      t instanceof Date ||
      t instanceof RegExp
    )
      return t;
    if (Pe(t)) return e && e.push(t), t;
    if (ArrayBuffer.isView(t)) {
      var r = t;
      return e && e.push(r.buffer), r;
    }
    if (t instanceof ImageData) return e && e.push(t.data.buffer), t;
    if (Array.isArray(t)) {
      for (var n = [], i = 0, a = t; i < a.length; i += 1) {
        var o = a[i];
        n.push(ke.serialize(o, e));
      }
      return n;
    }
    if ('object' == typeof t) {
      var s = t.constructor,
        u = s._classRegistryKey;
      if (!u) throw new Error("can't serialize object of unregistered class");
      var l = s.serialize ? s.serialize(t, e) : {};
      if (!s.serialize) {
        for (var p in t)
          if (t.hasOwnProperty(p) && !(Me[u].omit.indexOf(p) >= 0)) {
            var c = t[p];
            'function' != typeof c &&
              (l[p] = Me[u].shallow.indexOf(p) >= 0 ? c : ke.serialize(c, e));
          }
        t instanceof Error && (l.message = t.message);
      }
      if (l.$name)
        throw new Error(
          '$name property is reserved for worker serialization logic.',
        );
      return 'Object' !== u && (l.$name = u), l;
    }
    throw new Error("can't serialize object of type " + typeof t);
  }),
    (ke.deserialize = function (t) {
      if (
        null == t ||
        'boolean' == typeof t ||
        'number' == typeof t ||
        'string' == typeof t ||
        t instanceof Boolean ||
        t instanceof Number ||
        t instanceof String ||
        t instanceof Date ||
        t instanceof RegExp ||
        Pe(t) ||
        ArrayBuffer.isView(t) ||
        t instanceof ImageData
      )
        return t;
      if (Array.isArray(t)) return t.map(ke.deserialize);
      if ('object' == typeof t) {
        var e = t.$name || 'Object',
          r = Me[e].klass;
        if (!r) throw new Error("can't deserialize unregistered class " + e);
        if (r.deserialize) return r.deserialize(t);
        for (
          var n = Object.create(r.prototype), i = 0, a = Object.keys(t);
          i < a.length;
          i += 1
        ) {
          var o = a[i];
          if ('$name' !== o) {
            var s = t[o];
            n[o] = Me[e].shallow.indexOf(o) >= 0 ? s : ke.deserialize(s);
          }
        }
        return n;
      }
      throw new Error("can't deserialize object of type " + typeof t);
    });
  var ze = function () {
    this.first = !0;
  };
  ze.prototype.update = function (t, e) {
    var r = Math.floor(t);
    return this.first
      ? ((this.first = !1),
        (this.lastIntegerZoom = r),
        (this.lastIntegerZoomTime = 0),
        (this.lastZoom = t),
        (this.lastFloorZoom = r),
        !0)
      : (this.lastFloorZoom > r
          ? ((this.lastIntegerZoom = r + 1), (this.lastIntegerZoomTime = e))
          : this.lastFloorZoom < r &&
            ((this.lastIntegerZoom = r), (this.lastIntegerZoomTime = e)),
        t !== this.lastZoom &&
          ((this.lastZoom = t), (this.lastFloorZoom = r), !0));
  };
  var Re = function (t, e) {
    (this.zoom = t),
      e
        ? ((this.now = e.now),
          (this.fadeDuration = e.fadeDuration),
          (this.zoomHistory = e.zoomHistory),
          (this.transition = e.transition))
        : ((this.now = 0),
          (this.fadeDuration = 0),
          (this.zoomHistory = new ze()),
          (this.transition = {}));
  };
  (Re.prototype.isSupportedScript = function (t) {
    return !1;
  }),
    (Re.prototype.crossFadingFactor = function () {
      return 0 === this.fadeDuration
        ? 1
        : Math.min(
            (this.now - this.zoomHistory.lastIntegerZoomTime) /
              this.fadeDuration,
            1,
          );
    }),
    (Re.prototype.getCrossfadeParameters = function () {
      var t = this.zoom,
        e = t - Math.floor(t),
        r = this.crossFadingFactor();
      return t > this.zoomHistory.lastIntegerZoom
        ? { fromScale: 2, toScale: 1, t: e + (1 - e) * r }
        : { fromScale: 0.5, toScale: 1, t: 1 - (1 - r) * e };
    });
  var Fe = 8192;
  function Ce(t, e, r) {
    return Math.min(r, Math.max(e, t));
  }
  function De(t) {
    return { min: -1 * Math.pow(2, t - 1), max: Math.pow(2, t - 1) - 1 };
  }
  var Be = De(15);
  function Ue(t) {
    for (var e = Fe / t.extent, r = t.loadGeometry(), n = 0; n < r.length; n++)
      for (var i = r[n], a = 0; a < i.length; a++) {
        var o = i[a];
        (o.x = Math.round(o.x * e)),
          (o.y = Fe - Math.round(o.y * e)),
          (o.x < Be.min || o.x > Be.max || o.y < Be.min || o.y > Be.max) &&
            ((o.x = Ce(o.x, Be.min, Be.max)), (o.y = Ce(o.y, Be.min, Be.max)));
      }
    return r;
  }
  var Ve = function (t) {
    void 0 === t && (t = []), (this.segments = t);
  };
  (Ve.prototype.prepareSegment = function (t, e, r, n) {
    var i = this.segments[this.segments.length - 1];
    return (
      (!i ||
        i.vertexLength + t > Ve.MAX_VERTEX_ARRAY_LENGTH ||
        i.sortKey !== n) &&
        ((i = {
          vertexOffset: e.length,
          primitiveOffset: r.length,
          vertexLength: 0,
          primitiveLength: 0,
        }),
        void 0 !== n && (i.sortKey = n),
        this.segments.push(i)),
      i
    );
  }),
    (Ve.prototype.get = function () {
      return this.segments;
    }),
    (Ve.prototype.destroy = function () {
      for (var t = 0, e = this.segments; t < e.length; t += 1) {
        var r = e[t];
        for (var n in r.vaos) r.vaos[n].destroy();
      }
    }),
    (Ve.simpleSegment = function (t, e, r, n) {
      return new Ve([
        {
          vertexOffset: t,
          primitiveOffset: e,
          vertexLength: r,
          primitiveLength: n,
          vaos: {},
          sortKey: 0,
        },
      ]);
    }),
    (Ve.MAX_VERTEX_ARRAY_LENGTH = Math.pow(2, 16) - 1),
    ke.register('SegmentVector', Ve);
  var Ne = 128,
    Le = 5,
    Xe = function () {
      (this.isTransferred = !1), (this.capacity = -1), this.resize(0);
    };
  (Xe.serialize = function (t, e) {
    return (
      t.isTransferred && console.log('StructArray array.isTransferred.'),
      t._trim(),
      e && ((t.isTransferred = !0), e.push(t.arrayBuffer)),
      { length: t.length, arrayBuffer: t.arrayBuffer }
    );
  }),
    (Xe.deserialize = function (t) {
      var e = Object.create(this.prototype);
      return (
        (e.arrayBuffer = t.arrayBuffer),
        (e.length = t.length),
        (e.capacity = t.arrayBuffer.byteLength / e.bytesPerElement),
        e._refreshViews(),
        e
      );
    }),
    (Xe.prototype._trim = function () {
      this.length !== this.capacity &&
        ((this.capacity = this.length),
        (this.arrayBuffer = this.arrayBuffer.slice(
          0,
          this.length * this.bytesPerElement,
        )),
        this._refreshViews());
    }),
    (Xe.prototype.clear = function () {
      this.length = 0;
    }),
    (Xe.prototype.resize = function (t) {
      this.reserve(t), (this.length = t);
    }),
    (Xe.prototype.reserve = function (t) {
      if (t > this.capacity) {
        (this.capacity = Math.max(t, Math.floor(this.capacity * Le), Ne)),
          (this.arrayBuffer = new ArrayBuffer(
            this.capacity * this.bytesPerElement,
          ));
        var e = this.uint8;
        this._refreshViews(), e && this.uint8.set(e);
      }
    }),
    (Xe.prototype._refreshViews = function () {
      throw new Error(
        '_refreshViews() must be implemented by each concrete StructArray layout',
      );
    });
  var qe = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype._refreshViews = function () {
        (this.uint8 = new Uint8Array(this.arrayBuffer)),
          (this.int16 = new Int16Array(this.arrayBuffer));
      }),
      (e.prototype.emplaceBack = function (t, e, r, n, i, a) {
        var o = this.length;
        return this.resize(o + 1), this.emplace(o, t, e, r, n, i, a);
      }),
      (e.prototype.emplace = function (t, e, r, n, i, a, o) {
        var s = 4 * t,
          u = 8 * t;
        return (
          (this.int16[s + 0] = e),
          (this.int16[s + 1] = r),
          (this.uint8[u + 4] = n),
          (this.uint8[u + 5] = i),
          (this.uint8[u + 6] = a),
          (this.uint8[u + 7] = o),
          t
        );
      }),
      e
    );
  })(Xe);
  (qe.prototype.bytesPerElement = 8),
    ke.register('StructArrayLayout2i4ub8', qe);
  var je = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype._refreshViews = function () {
        (this.uint8 = new Uint8Array(this.arrayBuffer)),
          (this.uint16 = new Uint16Array(this.arrayBuffer));
      }),
      (e.prototype.emplaceBack = function (t, e, r) {
        var n = this.length;
        return this.resize(n + 1), this.emplace(n, t, e, r);
      }),
      (e.prototype.emplace = function (t, e, r, n) {
        var i = 3 * t;
        return (
          (this.uint16[i + 0] = e),
          (this.uint16[i + 1] = r),
          (this.uint16[i + 2] = n),
          t
        );
      }),
      e
    );
  })(Xe);
  (je.prototype.bytesPerElement = 6), ke.register('StructArrayLayout3ui6', je);
  var He = function () {
    (this.ids = []), (this.positions = []), (this.indexed = !1);
  };
  function Ye(t, e, r, n) {
    if (!(r >= n)) {
      for (var i = t[(r + n) >> 1], a = r - 1, o = n + 1; ; ) {
        do {
          a++;
        } while (t[a] < i);
        do {
          o--;
        } while (t[o] > i);
        if (a >= o) break;
        Qe(t, a, o),
          Qe(e, 3 * a, 3 * o),
          Qe(e, 3 * a + 1, 3 * o + 1),
          Qe(e, 3 * a + 2, 3 * o + 2);
      }
      Ye(t, e, r, o), Ye(t, e, o + 1, n);
    }
  }
  function Qe(t, e, r) {
    var n = t[e];
    (t[e] = t[r]), (t[r] = n);
  }
  (He.prototype.add = function (t, e, r, n) {
    this.ids.push(t), this.positions.push(e, r, n);
  }),
    (He.prototype.getPositions = function (t) {
      for (var e = 0, r = this.ids.length - 1; e < r; ) {
        var n = (e + r) >> 1;
        this.ids[n] >= t ? (r = n) : (e = n + 1);
      }
      for (var i = []; this.ids[e] === t; ) {
        var a = this.positions[3 * e],
          o = this.positions[3 * e + 1],
          s = this.positions[3 * e + 2];
        i.push({ index: a, start: o, end: s }), e++;
      }
      return i;
    }),
    (He.serialize = function (t, e) {
      var r = new Float64Array(t.ids),
        n = new Uint32Array(t.positions);
      return (
        Ye(r, n, 0, r.length - 1),
        e && e.push(r.buffer, n.buffer),
        { ids: r, positions: n }
      );
    }),
    (He.deserialize = function (t) {
      var e = new He();
      return (e.ids = t.ids), (e.positions = t.positions), (e.indexed = !0), e;
    }),
    ke.register('FeaturePositionMap', He);
  var Ke = function (t, e, r) {
    (this.property = t), (this.value = e), (this.parameters = r);
  };
  function Ge() {}
  (Ke.prototype.isConstant = function () {
    return 'constant' === this.value.kind;
  }),
    (Ke.prototype.constantOr = function (t) {
      return 'constant' === this.value.kind ? this.value.value : t;
    }),
    (Ke.prototype.evaluate = function (t, e, r) {
      return this.property.evaluate(this.value, this.parameters, t, e, r);
    }),
    (Ge.supportsPropertyExpression = function (t) {
      return (
        'data-driven' === t['property-type'] ||
        'cross-faded-data-driven' === t['property-type']
      );
    }),
    (Ge.supportsZoomExpression = function (t) {
      return !!t.expression && t.expression.parameters.indexOf('zoom') > -1;
    }),
    (Ge.supportsInterpolation = function (t) {
      return !!t.expression && t.expression.interpolated;
    });
  var We = {},
    Je = function (t, e) {
      (this.gl = t.gl), (this.location = e);
    };
  (We.Uniform1i = (function (t) {
    function e(e, r) {
      t.call(this, e, r), (this.current = 0);
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype.set = function (t) {
        this.current !== t &&
          ((this.current = t), this.gl.uniform1i(this.location, t));
      }),
      e
    );
  })(Je)),
    (We.Uniform1f = (function (t) {
      function e(e, r) {
        t.call(this, e, r), (this.current = 0);
      }
      return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        (e.prototype.set = function (t) {
          this.current !== t &&
            ((this.current = t), this.gl.uniform1f(this.location, t));
        }),
        e
      );
    })(Je)),
    (We.Uniform2f = (function (t) {
      function e(e, r) {
        t.call(this, e, r), (this.current = [0, 0]);
      }
      return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        (e.prototype.set = function (t) {
          (t[0] === this.current[0] && t[1] === this.current[1]) ||
            ((this.current = t), this.gl.uniform2f(this.location, t[0], t[1]));
        }),
        e
      );
    })(Je)),
    (We.Uniform3f = (function (t) {
      function e(e, r) {
        t.call(this, e, r), (this.current = [0, 0, 0]);
      }
      return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        (e.prototype.set = function (t) {
          (t[0] === this.current[0] &&
            t[1] === this.current[1] &&
            t[2] === this.current[2]) ||
            ((this.current = t),
            this.gl.uniform3f(this.location, t[0], t[1], t[2]));
        }),
        e
      );
    })(Je)),
    (We.Uniform4f = (function (t) {
      function e(e, r) {
        t.call(this, e, r), (this.current = [0, 0, 0, 0]);
      }
      return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        (e.prototype.set = function (t) {
          (t[0] === this.current[0] &&
            t[1] === this.current[1] &&
            t[2] === this.current[2] &&
            t[3] === this.current[3]) ||
            ((this.current = t),
            this.gl.uniform4f(this.location, t[0], t[1], t[2], t[3]));
        }),
        e
      );
    })(Je)),
    (We.UniformColor = (function (t) {
      function e(e, r) {
        t.call(this, e, r), (this.current = S.transparent);
      }
      return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        (e.prototype.set = function (t) {
          (t.r === this.current.r &&
            t.g === this.current.g &&
            t.b === this.current.b &&
            t.a === this.current.a) ||
            ((this.current = t),
            this.gl.uniform4f(this.location, t.r, t.g, t.b, t.a));
        }),
        e
      );
    })(Je));
  var Ze = new Float32Array(16);
  We.UniformMatrix4f = (function (t) {
    function e(e, r) {
      t.call(this, e, r), (this.current = Ze);
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype.set = function (t) {
        this.gl.uniformMatrix4fv(this.location, !1, t);
      }),
      e
    );
  })(Je);
  var $e = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype._refreshViews = function () {
        (this.uint8 = new Uint8Array(this.arrayBuffer)),
          (this.uint16 = new Uint16Array(this.arrayBuffer));
      }),
      (e.prototype.emplaceBack = function (t, e, r, n, i, a, o, s) {
        var u = this.length;
        return this.resize(u + 1), this.emplace(u, t, e, r, n, i, a, o, s);
      }),
      (e.prototype.emplace = function (t, e, r, n, i, a, o, s, u) {
        var l = 8 * t;
        return (
          (this.uint16[l + 0] = e),
          (this.uint16[l + 1] = r),
          (this.uint16[l + 2] = n),
          (this.uint16[l + 3] = i),
          (this.uint16[l + 4] = a),
          (this.uint16[l + 5] = o),
          (this.uint16[l + 6] = s),
          (this.uint16[l + 7] = u),
          t
        );
      }),
      e
    );
  })(Xe);
  ($e.prototype.bytesPerElement = 16),
    ke.register('StructArrayLayout8ui16', $e);
  var tr = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype._refreshViews = function () {
        (this.uint8 = new Uint8Array(this.arrayBuffer)),
          (this.float32 = new Float32Array(this.arrayBuffer));
      }),
      (e.prototype.emplaceBack = function (t, e) {
        var r = this.length;
        return this.resize(r + 1), this.emplace(r, t, e);
      }),
      (e.prototype.emplace = function (t, e, r) {
        var n = 2 * t;
        return (this.float32[n + 0] = e), (this.float32[n + 1] = r), t;
      }),
      e
    );
  })(Xe);
  (tr.prototype.bytesPerElement = 8), ke.register('StructArrayLayout2f8', tr);
  var er = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype._refreshViews = function () {
        (this.uint8 = new Uint8Array(this.arrayBuffer)),
          (this.float32 = new Float32Array(this.arrayBuffer));
      }),
      (e.prototype.emplaceBack = function (t, e, r, n) {
        var i = this.length;
        return this.resize(i + 1), this.emplace(i, t, e, r, n);
      }),
      (e.prototype.emplace = function (t, e, r, n, i) {
        var a = 4 * t;
        return (
          (this.float32[a + 0] = e),
          (this.float32[a + 1] = r),
          (this.float32[a + 2] = n),
          (this.float32[a + 3] = i),
          t
        );
      }),
      e
    );
  })(Xe);
  (er.prototype.bytesPerElement = 16), ke.register('StructArrayLayout4f16', er);
  var rr = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype._refreshViews = function () {
        (this.uint8 = new Uint8Array(this.arrayBuffer)),
          (this.float32 = new Float32Array(this.arrayBuffer));
      }),
      (e.prototype.emplaceBack = function (t) {
        var e = this.length;
        return this.resize(e + 1), this.emplace(e, t);
      }),
      (e.prototype.emplace = function (t, e) {
        var r = 1 * t;
        return (this.float32[r + 0] = e), t;
      }),
      e
    );
  })(Xe);
  function nr(t, e, r) {
    return Math.min(r, Math.max(e, t));
  }
  function ir(t, e) {
    return (
      256 * (t = nr(Math.floor(t), 0, 255)) + (e = nr(Math.floor(e), 0, 255))
    );
  }
  function ar(t) {
    return [ir(255 * t.r, 255 * t.g), ir(255 * t.b, 255 * t.a)];
  }
  (rr.prototype.bytesPerElement = 4), ke.register('StructArrayLayout1f4', rr);
  var or = function (t, e, r) {
    (this.value = t),
      (this.names = e),
      (this.uniformNames = this.names.map(function (t) {
        return 'u_' + t;
      })),
      (this.type = r),
      (this.maxValue = -1 / 0);
  };
  (or.prototype.defines = function () {
    return this.names.map(function (t) {
      return '#define HAS_UNIFORM_u_' + t;
    });
  }),
    (or.prototype.setConstantPatternPositions = function () {}),
    (or.prototype.populatePaintArray = function () {}),
    (or.prototype.updatePaintArray = function () {}),
    (or.prototype.upload = function () {}),
    (or.prototype.destroy = function () {}),
    (or.prototype.setUniforms = function (t, e, r, n) {
      e.set(n.constantOr(this.value));
    }),
    (or.prototype.getBinding = function (t, e) {
      return 'color' === this.type
        ? new We.UniformColor(t, e)
        : new We.Uniform1f(t, e);
    }),
    (or.serialize = function (t) {
      var e = t.value,
        r = t.names,
        n = t.type;
      return { value: ke.serialize(e), names: r, type: n };
    }),
    (or.deserialize = function (t) {
      var e = t.value,
        r = t.names,
        n = t.type;
      return new or(ke.deserialize(e), r, n);
    });
  var sr = function (t, e, r) {
    (this.value = t),
      (this.names = e),
      (this.uniformNames = this.names.map(function (t) {
        return 'u_' + t;
      })),
      (this.type = r),
      (this.maxValue = -1 / 0),
      (this.patternPositions = { patternTo: null, patternFrom: null });
  };
  (sr.prototype.defines = function () {
    return this.names.map(function (t) {
      return '#define HAS_UNIFORM_u_' + t;
    });
  }),
    (sr.prototype.populatePaintArray = function () {}),
    (sr.prototype.updatePaintArray = function () {}),
    (sr.prototype.upload = function () {}),
    (sr.prototype.destroy = function () {}),
    (sr.prototype.setConstantPatternPositions = function (t, e) {
      (this.patternPositions.patternTo = t.tlbr),
        (this.patternPositions.patternFrom = e.tlbr);
    }),
    (sr.prototype.setUniforms = function (t, e, r, n, i) {
      var a = this.patternPositions;
      'u_pattern_to' === i && a.patternTo && e.set(a.patternTo),
        'u_pattern_from' === i && a.patternFrom && e.set(a.patternFrom);
    }),
    (sr.prototype.getBinding = function (t, e) {
      return new We.Uniform4f(t, e);
    });
  var ur = function (t, e, r, n) {
    (this.expression = t),
      (this.names = e),
      (this.type = r),
      (this.uniformNames = this.names.map(function (t) {
        return 'a_' + t;
      })),
      (this.maxValue = -1 / 0),
      (this.paintVertexAttributes = e.map(function (t) {
        return {
          name: 'a_' + t,
          type: 'Float32',
          components: 'color' === r ? 2 : 1,
          offset: 0,
        };
      })),
      (this.paintVertexArray = new n());
  };
  (ur.prototype.defines = function () {
    return [];
  }),
    (ur.prototype.setConstantPatternPositions = function () {}),
    (ur.prototype.populatePaintArray = function (t, e, r, n) {
      var i = this.paintVertexArray,
        a = i.length;
      i.reserve(t);
      var o = this.expression.evaluate(
        new EvaluationParameters(0),
        e,
        {},
        [],
        n,
      );
      if ('color' === this.type)
        for (var s = ar(o), u = a; u < t; u++) i.emplaceBack(s[0], s[1]);
      else {
        for (var l = a; l < t; l++) i.emplaceBack(o);
        this.maxValue = Math.max(this.maxValue, o);
      }
    }),
    (ur.prototype.updatePaintArray = function (t, e, r, n) {
      var i = this.paintVertexArray,
        a = this.expression.evaluate({ zoom: 0 }, r, n);
      if ('color' === this.type)
        for (var o = ar(a), s = t; s < e; s++) i.emplace(s, o[0], o[1]);
      else {
        for (var u = t; u < e; u++) i.emplace(u, a);
        this.maxValue = Math.max(this.maxValue, a);
      }
    }),
    (ur.prototype.upload = function (t) {
      this.paintVertexArray &&
        this.paintVertexArray.arrayBuffer &&
        (this.paintVertexBuffer && this.paintVertexBuffer.buffer
          ? this.paintVertexBuffer.updateData(this.paintVertexArray)
          : (this.paintVertexBuffer = t.createVertexBuffer(
              this.paintVertexArray,
              this.paintVertexAttributes,
              this.expression.isStateDependent,
            )));
    }),
    (ur.prototype.destroy = function () {
      this.paintVertexBuffer && this.paintVertexBuffer.destroy();
    }),
    (ur.prototype.setUniforms = function (t, e) {
      e.set(0);
    }),
    (ur.prototype.getBinding = function (t, e) {
      return new We.Uniform1f(t, e);
    });
  var lr = function (t, e, r, n, i, a) {
    (this.expression = t),
      (this.names = e),
      (this.uniformNames = this.names.map(function (t) {
        return 'u_' + t + '_t';
      })),
      (this.type = r),
      (this.useIntegerZoom = n),
      (this.zoom = i),
      (this.maxValue = -1 / 0);
    var o = a;
    (this.paintVertexAttributes = e.map(function (t) {
      return {
        name: 'a_' + t,
        type: 'Float32',
        components: 'color' === r ? 4 : 2,
        offset: 0,
      };
    })),
      (this.paintVertexArray = new o());
  };
  (lr.prototype.defines = function () {
    return [];
  }),
    (lr.prototype.setConstantPatternPositions = function () {}),
    (lr.prototype.populatePaintArray = function (t, e, r, n) {
      var i = this.paintVertexArray,
        a = i.length;
      i.reserve(t);
      var o = this.expression.evaluate(
          new EvaluationParameters(this.zoom),
          e,
          {},
          [],
          n,
        ),
        s = this.expression.evaluate(
          new EvaluationParameters(this.zoom + 1),
          e,
          {},
          [],
          n,
        );
      if ('color' === this.type)
        for (var u = ar(o), l = ar(s), p = a; p < t; p++)
          i.emplaceBack(u[0], u[1], l[0], l[1]);
      else {
        for (var c = a; c < t; c++) i.emplaceBack(o, s);
        this.maxValue = Math.max(this.maxValue, o, s);
      }
    }),
    (lr.prototype.updatePaintArray = function (t, e, r, n) {
      var i = this.paintVertexArray,
        a = this.expression.evaluate({ zoom: this.zoom }, r, n),
        o = this.expression.evaluate({ zoom: this.zoom + 1 }, r, n);
      if ('color' === this.type)
        for (var s = ar(a), u = ar(o), l = t; l < e; l++)
          i.emplace(l, s[0], s[1], u[0], u[1]);
      else {
        for (var p = t; p < e; p++) i.emplace(p, a, o);
        this.maxValue = Math.max(this.maxValue, a, o);
      }
    }),
    (lr.prototype.upload = function (t) {
      this.paintVertexArray &&
        this.paintVertexArray.arrayBuffer &&
        (this.paintVertexBuffer && this.paintVertexBuffer.buffer
          ? this.paintVertexBuffer.updateData(this.paintVertexArray)
          : (this.paintVertexBuffer = t.createVertexBuffer(
              this.paintVertexArray,
              this.paintVertexAttributes,
              this.expression.isStateDependent,
            )));
    }),
    (lr.prototype.destroy = function () {
      this.paintVertexBuffer && this.paintVertexBuffer.destroy();
    }),
    (lr.prototype.interpolationFactor = function (t) {
      return (
        this.useIntegerZoom && (t = Math.floor(t)),
        nr(
          this.expression.interpolationFactor(t, this.zoom, this.zoom + 1),
          0,
          1,
        )
      );
    }),
    (lr.prototype.setUniforms = function (t, e, r) {
      e.set(this.interpolationFactor(r.zoom));
    }),
    (lr.prototype.getBinding = function (t, e) {
      return new We.Uniform1f(t, e);
    });
  var pr = function (t, e, r, n, i, a, o) {
    (this.expression = t),
      (this.names = e),
      (this.type = r),
      (this.uniformNames = this.names.map(function (t) {
        return 'u_' + t + '_t';
      })),
      (this.useIntegerZoom = n),
      (this.zoom = i),
      (this.maxValue = -1 / 0),
      (this.layerId = o),
      (this.paintVertexAttributes = e.map(function (t) {
        return { name: 'a_' + t, type: 'Uint16', components: 4, offset: 0 };
      })),
      (this.zoomInPaintVertexArray = new a()),
      (this.zoomOutPaintVertexArray = new a());
  };
  (pr.prototype.defines = function () {
    return [];
  }),
    (pr.prototype.setConstantPatternPositions = function () {}),
    (pr.prototype.populatePaintArray = function (t, e, r) {
      var n = this.zoomInPaintVertexArray,
        i = this.zoomOutPaintVertexArray,
        a = this.layerId,
        o = n.length;
      if ((n.reserve(t), i.reserve(t), r && e.patterns && e.patterns[a])) {
        var s = e.patterns[a],
          u = s.min,
          l = s.mid,
          p = s.max,
          c = r[u],
          f = r[l],
          h = r[p];
        if (!c || !f || !h) return;
        for (var d = o; d < t; d++)
          n.emplaceBack(
            f.tl[0],
            f.tl[1],
            f.br[0],
            f.br[1],
            c.tl[0],
            c.tl[1],
            c.br[0],
            c.br[1],
          ),
            i.emplaceBack(
              f.tl[0],
              f.tl[1],
              f.br[0],
              f.br[1],
              h.tl[0],
              h.tl[1],
              h.br[0],
              h.br[1],
            );
      }
    }),
    (pr.prototype.updatePaintArray = function (t, e, r, n, i) {
      var a = this.zoomInPaintVertexArray,
        o = this.zoomOutPaintVertexArray,
        s = this.layerId;
      if (i && r.patterns && r.patterns[s]) {
        var u = r.patterns[s],
          l = u.min,
          p = u.mid,
          c = u.max,
          f = i[l],
          h = i[p],
          d = i[c];
        if (!f || !h || !d) return;
        for (var y = t; y < e; y++)
          a.emplace(
            y,
            h.tl[0],
            h.tl[1],
            h.br[0],
            h.br[1],
            f.tl[0],
            f.tl[1],
            f.br[0],
            f.br[1],
          ),
            o.emplace(
              y,
              h.tl[0],
              h.tl[1],
              h.br[0],
              h.br[1],
              d.tl[0],
              d.tl[1],
              d.br[0],
              d.br[1],
            );
      }
    }),
    (pr.prototype.upload = function (t) {
      this.zoomInPaintVertexArray &&
        this.zoomInPaintVertexArray.arrayBuffer &&
        this.zoomOutPaintVertexArray &&
        this.zoomOutPaintVertexArray.arrayBuffer &&
        ((this.zoomInPaintVertexBuffer = t.createVertexBuffer(
          this.zoomInPaintVertexArray,
          this.paintVertexAttributes,
          this.expression.isStateDependent,
        )),
        (this.zoomOutPaintVertexBuffer = t.createVertexBuffer(
          this.zoomOutPaintVertexArray,
          this.paintVertexAttributes,
          this.expression.isStateDependent,
        )));
    }),
    (pr.prototype.destroy = function () {
      this.zoomOutPaintVertexBuffer && this.zoomOutPaintVertexBuffer.destroy(),
        this.zoomInPaintVertexBuffer && this.zoomInPaintVertexBuffer.destroy();
    }),
    (pr.prototype.setUniforms = function (t, e) {
      e.set(0);
    }),
    (pr.prototype.getBinding = function (t, e) {
      return new Uniform1f(t, e);
    });
  var cr = function () {
    (this.binders = {}), (this.cacheKey = ''), (this._buffers = []);
  };
  function fr(t, e) {
    return (
      {
        'text-opacity': ['opacity'],
        'icon-opacity': ['opacity'],
        'text-color': ['fill_color'],
        'icon-color': ['fill_color'],
        'text-halo-color': ['halo_color'],
        'icon-halo-color': ['halo_color'],
        'text-halo-blur': ['halo_blur'],
        'text-show-background': ['show-background'],
        'icon-halo-blur': ['halo_blur'],
        'text-halo-width': ['halo_width'],
        'icon-halo-width': ['halo_width'],
        'line-gap-width': ['gapwidth'],
        'line-pattern': ['pattern_to', 'pattern_from'],
        'fill-pattern': ['pattern_to', 'pattern_from'],
        'fill-extrusion-pattern': ['pattern_to', 'pattern_from'],
      }[t] || [t.replace(e + '-', '').replace(/-/g, '_')]
    );
  }
  function hr(t) {
    return {
      'line-pattern': { source: $e, composite: $e },
      'fill-pattern': { source: $e, composite: $e },
      'fill-extrusion-pattern': { source: $e, composite: $e },
    }[t];
  }
  function dr(t, e, r) {
    var n = {
        color: { source: tr, composite: er },
        number: { source: rr, composite: tr },
      },
      i = hr(t);
    return (i && i[r]) || n[e][r];
  }
  (cr.createDynamic = function (t, e, r) {
    var n = new cr(),
      i = [];
    for (var a in t.paint._values)
      if (r(a)) {
        var o = t.paint.get(a);
        if (
          o instanceof Ke &&
          Ge.supportsPropertyExpression(o.property.specification)
        ) {
          var s = fr(a, t.type),
            u = o.property.specification.type,
            l = o.property.useIntegerZoom;
          if (
            'cross-faded' === o.property.specification['property-type'] ||
            'cross-faded-data-driven' ===
              o.property.specification['property-type']
          )
            if ('constant' === o.value.kind)
              (n.binders[a] = new sr(o.value.value, s, u)), i.push('/u_' + a);
            else {
              var p = dr(a, u, 'source');
              (n.binders[a] = new pr(o.value, s, u, l, e, p, t.id)),
                i.push('/a_' + a);
            }
          else if ('constant' === o.value.kind)
            (n.binders[a] = new or(o.value.value, s, u)), i.push('/u_' + a);
          else if ('source' === o.value.kind) {
            var c = dr(a, u, 'source');
            (n.binders[a] = new ur(o.value, s, u, c)), i.push('/a_' + a);
          } else {
            var f = dr(a, u, 'composite');
            (n.binders[a] = new lr(o.value, s, u, l, e, f)), i.push('/z_' + a);
          }
        }
      }
    return (n.cacheKey = i.sort().join('')), n;
  }),
    (cr.prototype.populatePaintArrays = function (t, e, r, n, i) {
      for (var a in this.binders) {
        this.binders[a].populatePaintArray(t, e, n, i);
      }
    }),
    (cr.prototype.setConstantPatternPositions = function (t, e) {
      for (var r in this.binders) {
        this.binders[r].setConstantPatternPositions(t, e);
      }
    }),
    (cr.prototype.updatePaintArrays = function (t, e, r, n, i) {
      var a = !1;
      for (var o in t)
        for (var s = 0, u = e.getPositions(+o); s < u.length; s += 1) {
          var l = u[s],
            p = r.feature(l.index);
          for (var c in this.binders) {
            var f = this.binders[c];
            if (
              !(f instanceof or || f instanceof sr) &&
              !0 === f.expression.isStateDependent
            ) {
              var h = n.paint.get(c);
              (f.expression = h.value),
                f.updatePaintArray(l.start, l.end, p, t[o], i),
                (a = !0);
            }
          }
        }
      return a;
    }),
    (cr.prototype.defines = function () {
      var t = [];
      for (var e in this.binders) t.push.apply(t, this.binders[e].defines());
      return t;
    }),
    (cr.prototype.getPaintVertexBuffers = function () {
      return this._buffers;
    }),
    (cr.prototype.getUniforms = function (t, e) {
      var r = [];
      for (var n in this.binders)
        for (
          var i = this.binders[n], a = 0, o = i.uniformNames;
          a < o.length;
          a += 1
        ) {
          var s = o[a];
          if (e[s]) {
            var u = i.getBinding(t, e[s]);
            r.push({ name: s, property: n, binding: u });
          }
        }
      return r;
    }),
    (cr.prototype.setUniforms = function (t, e, r, n) {
      for (var i = 0, a = e; i < a.length; i += 1) {
        var o = a[i],
          s = o.name,
          u = o.property,
          l = o.binding;
        this.binders[u].setUniforms(t, l, n, r.get(u), s);
      }
    }),
    (cr.prototype.updatePatternPaintBuffers = function (t) {
      var e = [];
      for (var r in this.binders) {
        var n = this.binders[r];
        if (n instanceof pr) {
          var i =
            2 === t.fromScale
              ? n.zoomInPaintVertexBuffer
              : n.zoomOutPaintVertexBuffer;
          i && e.push(i);
        } else
          (n instanceof ur || n instanceof lr) &&
            n.paintVertexBuffer &&
            e.push(n.paintVertexBuffer);
      }
      this._buffers = e;
    }),
    (cr.prototype.upload = function (t) {
      for (var e in this.binders) this.binders[e].upload(t);
      var r = [];
      for (var n in this.binders) {
        var i = this.binders[n];
        (i instanceof ur || i instanceof lr) &&
          i.paintVertexBuffer &&
          r.push(i.paintVertexBuffer);
      }
      this._buffers = r;
    }),
    (cr.prototype.destroy = function () {
      for (var t in this.binders) this.binders[t].destroy();
    }),
    ke.register('ConstantBinder', or),
    ke.register('CrossFadedConstantBinder', sr),
    ke.register('SourceExpressionBinder', ur),
    ke.register('CrossFadedCompositeBinder', pr),
    ke.register('CompositeExpressionBinder', lr),
    ke.register('ProgramConfiguration', cr, { omit: ['_buffers'] });
  var yr = function (t, e, r, n) {
    void 0 === n &&
      (n = function () {
        return !0;
      }),
      (this.programConfigurations = {});
    for (var i = 0, a = e; i < a.length; i += 1) {
      var o = a[i];
      (this.programConfigurations[o.id] = cr.createDynamic(o, r, n)),
        (this.programConfigurations[o.id].layoutAttributes = t);
    }
    (this.needsUpload = !1),
      (this._featureMap = new He()),
      (this._bufferOffset = 0);
  };
  function mr(t, e, r, n, i) {
    for (var a = i.patternDependencies, o = 0, s = e; o < s.length; o += 1) {
      var u = s[o],
        l = u.paint.get(t + '-pattern').value;
      if ('constant' !== l.kind) {
        var p = l.evaluate({ zoom: n - 1 }, r, {}, i.availableImages),
          c = l.evaluate({ zoom: n }, r, {}, i.availableImages),
          f = l.evaluate({ zoom: n + 1 }, r, {}, i.availableImages);
        (p = p && p.name ? p.name : p),
          (c = c && c.name ? c.name : c),
          (f = f && f.name ? f.name : f),
          (a[p] = !0),
          (a[c] = !0),
          (a[f] = !0),
          (r.patterns[u.id] = { min: p, mid: c, max: f });
      }
    }
    return r;
  }
  (yr.prototype.populatePaintArrays = function (t, e, r, n, i) {
    for (var a in this.programConfigurations)
      this.programConfigurations[a].populatePaintArrays(t, e, r, n, i);
    void 0 !== e.id && this._featureMap.add(+e.id, r, this._bufferOffset, t),
      (this._bufferOffset = t),
      (this.needsUpload = !0);
  }),
    (yr.prototype.updatePaintArrays = function (t, e, r, n) {
      for (var i = 0, a = r; i < a.length; i += 1) {
        var o = a[i];
        this.needsUpload =
          this.programConfigurations[o.id].updatePaintArrays(
            t,
            this._featureMap,
            e,
            o,
            n,
          ) || this.needsUpload;
      }
    }),
    (yr.prototype.get = function (t) {
      return this.programConfigurations[t];
    }),
    (yr.prototype.upload = function (t) {
      if (this.needsUpload) {
        for (var e in this.programConfigurations)
          this.programConfigurations[e].upload(t);
        this.needsUpload = !1;
      }
    }),
    (yr.prototype.destroy = function () {
      for (var t in this.programConfigurations)
        this.programConfigurations[t].destroy();
    }),
    ke.register('ProgramConfigurationSet', yr);
  var vr = ['Unknown', 'Point', 'LineString', 'Polygon'],
    gr = o(
      [
        { name: 'a_pos_normal', components: 2, type: 'Int16' },
        { name: 'a_data', components: 4, type: 'Uint8' },
      ],
      4,
    ),
    xr = gr.members,
    br = 63,
    _r = Math.cos((Math.PI / 180) * 37.5),
    wr = 15,
    Er = 20,
    Tr = 15,
    Ar = 0.5,
    Sr = Math.pow(2, Tr - 1) / Ar,
    Ir = function (t) {
      (this.zoom = t.zoom),
        (this.overscaling = t.overscaling),
        (this.layers = t.layers),
        (this.layerIds = this.layers.map(function (t) {
          return t.id;
        })),
        (this.index = t.index),
        (this.hasPattern = !1),
        (this.patternFeatures = []),
        (this.layoutVertexArray = new qe()),
        (this.indexArray = new je()),
        (this.programConfigurations = new yr(xr, t.layers, t.zoom)),
        (this.segments = new Ve()),
        (this.stateDependentLayerIds = this.layers
          .filter(function (t) {
            return t.isStateDependent();
          })
          .map(function (t) {
            return t.id;
          }));
    };
  function kr(t, e, r, n, i) {
    Mr(t, e, r || 0, n || t.length - 1, i || Pr);
  }
  function Mr(t, e, r, n, i) {
    for (; n > r; ) {
      if (n - r > 600) {
        var a = n - r + 1,
          o = e - r + 1,
          s = Math.log(a),
          u = 0.5 * Math.exp((2 * s) / 3),
          l = 0.5 * Math.sqrt((s * u * (a - u)) / a) * (o - a / 2 < 0 ? -1 : 1);
        Mr(
          t,
          e,
          Math.max(r, Math.floor(e - (o * u) / a + l)),
          Math.min(n, Math.floor(e + ((a - o) * u) / a + l)),
          i,
        );
      }
      var p = t[e],
        c = r,
        f = n;
      for (Or(t, r, e), i(t[n], p) > 0 && Or(t, r, n); c < f; ) {
        for (Or(t, c, f), c++, f--; i(t[c], p) < 0; ) c++;
        for (; i(t[f], p) > 0; ) f--;
      }
      0 === i(t[r], p) ? Or(t, r, f) : Or(t, ++f, n),
        f <= e && (r = f + 1),
        e <= f && (n = f - 1);
    }
  }
  function Or(t, e, r) {
    var n = t[e];
    (t[e] = t[r]), (t[r] = n);
  }
  function Pr(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
  }
  function zr(t) {
    for (
      var e = 0, r = 0, n = t.length, i = n - 1, a = void 0, o = void 0;
      r < n;
      i = r++
    )
      (a = t[r]), (e += ((o = t[i]).x - a.x) * (a.y + o.y));
    return e;
  }
  function Rr(t, e) {
    var r = t.length;
    if (r <= 1) return [t];
    for (var n, i, a = [], o = 0; o < r; o++) {
      var s = zr(t[o]);
      0 !== s &&
        ((t[o].area = Math.abs(s)),
        void 0 === i && (i = s < 0),
        i === s < 0 ? (n && a.push(n), (n = [t[o]])) : n.push(t[o]));
    }
    if ((n && a.push(n), e > 1))
      for (var u = 0; u < a.length; u++)
        a[u].length <= e ||
          (kr(a[u], e, 1, a[u].length - 1, Fr), (a[u] = a[u].slice(0, e)));
    return a;
  }
  function Fr(t, e) {
    return e.area - t.area;
  }
  (Ir.prototype.populate = function (t, e) {
    this.hasPattern = !1;
    for (
      var r = this.layers[0].layout.get('line-sort-key'), n = [], i = 0, a = t;
      i < a.length;
      i += 1
    ) {
      var o = a[i],
        s = o.feature,
        u = o.index,
        l = o.sourceLayerIndex;
      if (this.layers[0]._featureFilter(new Re(0), s)) {
        var p = Ue(s),
          c = r ? r.evaluate(s, {}) : void 0,
          f = {
            id: s.id,
            properties: s.properties,
            type: s.type,
            sourceLayerIndex: l,
            index: u,
            geometry: p,
            patterns: {},
            sortKey: c,
          };
        n.push(f);
      }
    }
    r &&
      n.sort(function (t, e) {
        return t.sortKey - e.sortKey;
      });
    for (var h = 0, d = n; h < d.length; h += 1) {
      var y = d[h],
        m = y,
        v = m.geometry,
        g = m.index,
        x = m.sourceLayerIndex;
      if (this.hasPattern) {
        var b = mr('line', this.layers, y, this.zoom, e);
        this.patternFeatures.push(b);
      } else this.addFeature(y, v, g, {});
      var _ = t[g].feature;
      e.featureIndex.insert(_, v, g, x, this.index);
    }
  }),
    (Ir.prototype.update = function (t, e, r) {
      this.stateDependentLayers.length &&
        this.programConfigurations.updatePaintArrays(
          t,
          e,
          this.stateDependentLayers,
          r,
        );
    }),
    (Ir.prototype.addFeatures = function (t, e) {
      for (var r = 0, n = this.patternFeatures; r < n.length; r += 1) {
        var i = n[r];
        this.addFeature(i, i.geometry, i.index, e);
      }
    }),
    (Ir.prototype.isEmpty = function () {
      return 0 === this.layoutVertexArray.length;
    }),
    (Ir.prototype.uploadPending = function () {
      return !this.uploaded || this.programConfigurations.needsUpload;
    }),
    (Ir.prototype.upload = function (t) {
      if (!this.uploaded) {
        if (null == this.layoutVertexArray) return;
        (this.layoutVertexBuffer = t.createVertexBuffer(
          this.layoutVertexArray,
          xr,
        )),
          (this.indexBuffer = t.createIndexBuffer(this.indexArray));
      }
      this.programConfigurations.upload(t), (this.uploaded = !0);
    }),
    (Ir.prototype.destroy = function () {
      this.layoutVertexBuffer &&
        (this.layoutVertexBuffer.destroy(),
        this.indexBuffer.destroy(),
        this.programConfigurations.destroy(),
        this.segments.destroy());
    }),
    (Ir.prototype.clear = function () {
      t.defined(this.layoutVertexArray) && (this.layoutVertexArray = null),
        t.defined(this.indexArray) && (this.indexArray = null);
    }),
    (Ir.prototype.addFeature = function (t, e, r, n) {
      for (
        var i = this.layers[0].layout,
          a = i.get('line-join').evaluate(t, {}),
          o = i.get('line-cap'),
          s = i.get('line-miter-limit'),
          u = i.get('line-round-limit'),
          l = 0,
          p = e;
        l < p.length;
        l += 1
      ) {
        var c = p[l];
        this.addLine(c, t, a, o, s, u, r, n);
      }
    }),
    (Ir.prototype.addLine = function (t, e, r, n, i, a, o, s) {
      if (
        ((this.distance = 0),
        (this.scaledDistance = 0),
        (this.totalDistance = 0),
        e.properties &&
          e.properties.hasOwnProperty('mapbox_clip_start') &&
          e.properties.hasOwnProperty('mapbox_clip_end'))
      ) {
        (this.clipStart = +e.properties.mapbox_clip_start),
          (this.clipEnd = +e.properties.mapbox_clip_end);
        for (var u = 0; u < t.length - 1; u++)
          this.totalDistance += t[u].dist(t[u + 1]);
      }
      for (
        var l = 'Polygon' === vr[e.type], p = t.length;
        p >= 2 && t[p - 1].equals(t[p - 2]);

      )
        p--;
      for (var c = 0; c < p - 1 && t[c].equals(t[c + 1]); ) c++;
      if (!(p < (l ? 3 : 2))) {
        'bevel' === r && (i = 1.05);
        var f,
          h = this.overscaling <= 16 ? (wr * Fe) / (512 * this.overscaling) : 0,
          d = this.segments.prepareSegment(
            10 * p,
            this.layoutVertexArray,
            this.indexArray,
          ),
          y = void 0,
          m = void 0,
          v = void 0,
          g = void 0;
        (this.e1 = this.e2 = -1),
          l && ((f = t[p - 2]), (g = t[c].sub(f)._unit()._perp()));
        for (var x = c; x < p; x++)
          if (
            !(m = l && x === p - 1 ? t[c + 1] : t[x + 1]) ||
            !t[x].equals(m)
          ) {
            g && (v = g),
              f && (y = f),
              (f = t[x]),
              (g = m ? m.sub(f)._unit()._perp() : v);
            var b = (v = v || g).add(g);
            (0 === b.x && 0 === b.y) || b._unit();
            var _ = v.x * g.x + v.y * g.y,
              w = b.x * g.x + b.y * g.y,
              E = 0 !== w ? 1 / w : 1 / 0,
              T = 2 * Math.sqrt(2 - 2 * w),
              A = w < _r && y && m,
              S = v.x * g.y - v.y * g.x > 0;
            if (A && x > c) {
              var I = f.dist(y);
              if (I > 2 * h) {
                var k = f.sub(
                  f
                    .sub(y)
                    ._mult(h / I)
                    ._round(),
                );
                this.updateDistance(y, k),
                  this.addCurrentVertex(k, v, 0, 0, d),
                  (y = k);
              }
            }
            var M = y && m,
              O = M ? r : l ? 'butt' : n;
            if (
              (M &&
                'round' === O &&
                (E < a ? (O = 'miter') : E <= 2 && (O = 'fakeround')),
              'miter' === O && E > i && (O = 'bevel'),
              'bevel' === O &&
                (E > 2 && (O = 'flipbevel'), E < i && (O = 'miter')),
              y && this.updateDistance(y, f),
              'miter' === O)
            )
              b._mult(E), this.addCurrentVertex(f, b, 0, 0, d);
            else if ('flipbevel' === O) {
              if (E > 100) b = g.mult(-1);
              else {
                var P = (E * v.add(g).mag()) / v.sub(g).mag();
                b._perp()._mult(P * (S ? -1 : 1));
              }
              this.addCurrentVertex(f, b, 0, 0, d),
                this.addCurrentVertex(f, b.mult(-1), 0, 0, d);
            } else if ('bevel' === O || 'fakeround' === O) {
              var z = -Math.sqrt(E * E - 1),
                R = S ? z : 0,
                F = S ? 0 : z;
              if (
                (y && this.addCurrentVertex(f, v, R, F, d), 'fakeround' === O)
              )
                for (
                  var C = Math.round((180 * T) / Math.PI / Er), D = 1;
                  D < C;
                  D++
                ) {
                  var B = D / C;
                  if (0.5 !== B) {
                    var U = B - 0.5;
                    B +=
                      B *
                      U *
                      (B - 1) *
                      ((1.0904 + _ * (_ * (3.55645 - 1.43519 * _) - 3.2452)) *
                        U *
                        U +
                        (0.848013 + _ * (0.215638 * _ - 1.06021)));
                  }
                  var V = g
                    .sub(v)
                    ._mult(B)
                    ._add(v)
                    ._unit()
                    ._mult(S ? -1 : 1);
                  this.addHalfVertex(f, V.x, V.y, !1, S, 0, d);
                }
              m && this.addCurrentVertex(f, g, -R, -F, d);
            } else if ('butt' === O) this.addCurrentVertex(f, b, 0, 0, d);
            else if ('square' === O) {
              var N = y ? 1 : -1;
              this.addCurrentVertex(f, b, N, N, d);
            } else
              'round' === O &&
                (y &&
                  (this.addCurrentVertex(f, v, 0, 0, d),
                  this.addCurrentVertex(f, v, 1, 1, d, !0)),
                m &&
                  (this.addCurrentVertex(f, g, -1, -1, d, !0),
                  this.addCurrentVertex(f, g, 0, 0, d)));
            if (A && x < p - 1) {
              var L = f.dist(m);
              if (L > 2 * h) {
                var X = f.add(
                  m
                    .sub(f)
                    ._mult(h / L)
                    ._round(),
                );
                this.updateDistance(f, X),
                  this.addCurrentVertex(X, g, 0, 0, d),
                  (f = X);
              }
            }
          }
        this.programConfigurations.populatePaintArrays(
          this.layoutVertexArray.length,
          e,
          o,
          s,
        );
      }
    }),
    (Ir.prototype.addCurrentVertex = function (t, e, r, n, i, a) {
      void 0 === a && (a = !1);
      var o = e.x + e.y * r,
        s = e.y - e.x * r,
        u = -e.x + e.y * n,
        l = -e.y - e.x * n;
      this.addHalfVertex(t, o, s, a, !1, r, i),
        this.addHalfVertex(t, u, l, a, !0, -n, i),
        this.distance > Sr / 2 &&
          0 === this.totalDistance &&
          ((this.distance = 0), this.addCurrentVertex(t, e, r, n, i, a));
    }),
    (Ir.prototype.addHalfVertex = function (t, e, r, n, i, a, o) {
      var s = t.x,
        u = t.y,
        l = this.scaledDistance * Ar;
      this.layoutVertexArray.emplaceBack(
        (s << 1) + (n ? 1 : 0),
        (u << 1) + (i ? 1 : 0),
        Math.round(br * e) + 128,
        Math.round(br * r) + 128,
        (1 + (0 === a ? 0 : a < 0 ? -1 : 1)) | ((63 & l) << 2),
        l >> 6,
      );
      var p = o.vertexLength++;
      this.e1 >= 0 &&
        this.e2 >= 0 &&
        (this.indexArray.emplaceBack(this.e1, this.e2, p), o.primitiveLength++),
        i ? (this.e2 = p) : (this.e1 = p);
    }),
    (Ir.prototype.updateDistance = function (t, e) {
      (this.distance += t.dist(e)),
        (this.scaledDistance =
          this.totalDistance > 0
            ? (this.clipStart +
                ((this.clipEnd - this.clipStart) * this.distance) /
                  this.totalDistance) *
              (Sr - 1)
            : this.distance);
    }),
    ke.register('LineBucket', Ir, { omit: ['layers', 'patternFeatures'] });
  var Cr = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype._refreshViews = function () {
        (this.uint8 = new Uint8Array(this.arrayBuffer)),
          (this.int16 = new Int16Array(this.arrayBuffer));
      }),
      (e.prototype.emplaceBack = function (t, e) {
        var r = this.length;
        return this.resize(r + 1), this.emplace(r, t, e);
      }),
      (e.prototype.emplace = function (t, e, r) {
        var n = 2 * t;
        return (this.int16[n + 0] = e), (this.int16[n + 1] = r), t;
      }),
      e
    );
  })(Xe);
  (Cr.prototype.bytesPerElement = 4), ke.register('StructArrayLayout2i4', Cr);
  var Dr = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype._refreshViews = function () {
        (this.uint8 = new Uint8Array(this.arrayBuffer)),
          (this.uint16 = new Uint16Array(this.arrayBuffer));
      }),
      (e.prototype.emplaceBack = function (t, e) {
        var r = this.length;
        return this.resize(r + 1), this.emplace(r, t, e);
      }),
      (e.prototype.emplace = function (t, e, r) {
        var n = 2 * t;
        return (this.uint16[n + 0] = e), (this.uint16[n + 1] = r), t;
      }),
      e
    );
  })(Xe);
  function Br(t, e, r) {
    for (
      var n = r.patternDependencies, i = !1, a = 0, o = e;
      a < o.length;
      a += 1
    ) {
      var s = o[a].paint.get(t + '-pattern');
      s.isConstant() || (i = !0);
      var u = s.constantOr(null);
      u && ((i = !0), (n[u.to] = !0), (n[u.from] = !0));
    }
    return i;
  }
  if (
    ((Dr.prototype.bytesPerElement = 4),
    ke.register('StructArrayLayout2ui4', Dr),
    'undefined' != typeof WebAssembly)
  ) {
    var Ur,
      Vr = void 0 !== Vr ? Vr : {},
      Nr = {};
    for (Ur in Vr) Vr.hasOwnProperty(Ur) && (Nr[Ur] = Vr[Ur]);
    (Vr.arguments = []),
      (Vr.thisProgram = './this.program'),
      (Vr.quit = function (t, e) {
        throw e;
      }),
      (Vr.preRun = []),
      (Vr.postRun = []);
    var Lr = !1,
      Xr = !1,
      qr = !1,
      jr = !1;
    if (
      ((Lr = 'object' == typeof window),
      (Xr = 'function' == typeof importScripts),
      (qr =
        'object' == typeof process &&
        'function' == typeof require &&
        !Lr &&
        !Xr),
      (jr = !Lr && !qr && !Xr),
      Vr.ENVIRONMENT)
    )
      throw new Error(
        'Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)',
      );
    var Hr,
      Yr,
      Qr = '';
    function Kr(t) {
      return Vr.locateFile ? Vr.locateFile(t, Qr) : Qr + t;
    }
    if (qr)
      (Qr = __dirname + '/'),
        (Vr.read = function (t, e) {
          var r;
          return (
            Hr || (Hr = require('fs')),
            Yr || (Yr = require('path')),
            (t = Yr.normalize(t)),
            (r = Hr.readFileSync(t)),
            e ? r : r.toString()
          );
        }),
        (Vr.readBinary = function (t) {
          var e = Vr.read(t, !0);
          return e.buffer || (e = new Uint8Array(e)), on(e.buffer), e;
        }),
        process.argv.length > 1 &&
          (Vr.thisProgram = process.argv[1].replace(/\\/g, '/')),
        (Vr.arguments = process.argv.slice(2)),
        'undefined' != typeof module && (module.exports = Vr),
        process.on('uncaughtException', function (t) {
          if (!(t instanceof ya)) throw t;
        }),
        process.on('unhandledRejection', ga),
        (Vr.quit = function (t) {
          process.exit(t);
        }),
        (Vr.inspect = function () {
          return '[Emscripten Module object]';
        });
    else if (jr)
      'undefined' != typeof read &&
        (Vr.read = function (t) {
          return read(t);
        }),
        (Vr.readBinary = function (t) {
          var e;
          return 'function' == typeof readbuffer
            ? new Uint8Array(readbuffer(t))
            : (on('object' == typeof (e = read(t, 'binary'))), e);
        }),
        'undefined' != typeof scriptArgs
          ? (Vr.arguments = scriptArgs)
          : void 0 !== arguments && (Vr.arguments = arguments),
        'function' == typeof quit &&
          (Vr.quit = function (t) {
            quit(t);
          });
    else {
      if (!Lr && !Xr) throw new Error('environment detection error');
      Xr
        ? (Qr = self.location.href)
        : document.currentScript && (Qr = document.currentScript.src),
        (Qr =
          0 !== Qr.indexOf('blob:')
            ? Qr.substr(0, Qr.lastIndexOf('/') + 1)
            : ''),
        (Vr.read = function (t) {
          var e = new XMLHttpRequest();
          return e.open('GET', t, !1), e.send(null), e.responseText;
        }),
        Xr &&
          (Vr.readBinary = function (t) {
            var e = new XMLHttpRequest();
            return (
              e.open('GET', t, !1),
              (e.responseType = 'arraybuffer'),
              e.send(null),
              new Uint8Array(e.response)
            );
          }),
        (Vr.readAsync = function (t, e, r) {
          var n = new XMLHttpRequest();
          n.open('GET', t, !0),
            (n.responseType = 'arraybuffer'),
            (n.onload = function () {
              200 == n.status || (0 == n.status && n.response)
                ? e(n.response)
                : r();
            }),
            (n.onerror = r),
            n.send(null);
        }),
        (Vr.setWindowTitle = function (t) {
          document.title = t;
        });
    }
    var Gr =
        Vr.print ||
        ('undefined' != typeof console
          ? console.log.bind(console)
          : 'undefined' != typeof print
          ? print
          : null),
      Wr =
        Vr.printErr ||
        ('undefined' != typeof printErr
          ? printErr
          : ('undefined' != typeof console && console.warn.bind(console)) ||
            Gr);
    for (Ur in Nr) Nr.hasOwnProperty(Ur) && (Vr[Ur] = Nr[Ur]);
    function Jr(t) {
      Jr.shown || (Jr.shown = {}), Jr.shown[t] || (Jr.shown[t] = 1);
    }
    (Nr = void 0),
      on(
        void 0 === Vr.memoryInitializerPrefixURL,
        'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead',
      ),
      on(
        void 0 === Vr.pthreadMainPrefixURL,
        'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead',
      ),
      on(
        void 0 === Vr.cdInitializerPrefixURL,
        'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead',
      ),
      on(
        void 0 === Vr.filePackagePrefixURL,
        'Module.filePackagePrefixURL option was removed, use Module.locateFile instead',
      ),
      (da =
        ha =
        fa =
          function () {
            ga(
              'cannot use the stack before compiled code is ready to run, and has provided stack access',
            );
          });
    var Zr,
      $r = {
        'f64-rem': function (t, e) {
          return t % e;
        },
        debugger: function () {},
      },
      tn = (new Array(0), 0),
      en = function (t) {
        tn = t;
      },
      rn = function () {
        return tn;
      };
    function nn(t, e, r) {
      switch (
        ('*' === (e = e || 'i8').charAt(e.length - 1) && (e = 'i32'), e)
      ) {
        case 'i1':
        case 'i8':
          return bn[t >> 0];
        case 'i16':
          return wn[t >> 1];
        case 'i32':
        case 'i64':
          return En[t >> 2];
        case 'float':
          return An[t >> 2];
        case 'double':
          return Sn[t >> 3];
        default:
          ga('invalid type for getValue: ' + e);
      }
      return null;
    }
    'object' != typeof WebAssembly &&
      ga(
        'No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.',
      );
    var an = !1;
    function on(t, e) {
      t || ga('Assertion failed: ' + e);
    }
    function sn(t) {
      var e = Vr['_' + t];
      return (
        on(
          e,
          'Cannot call unknown function ' + t + ', make sure it is exported',
        ),
        e
      );
    }
    function un(t, e, r, n, i) {
      var a = {
        string: function (t) {
          var e = 0;
          if (null != t && 0 !== t) {
            var r = 1 + (t.length << 2);
            dn(t, (e = fa(r)), r);
          }
          return e;
        },
        array: function (t) {
          var e = fa(t.length);
          return yn(t, e), e;
        },
      };
      var o = sn(t),
        s = [],
        u = 0;
      if ((on('array' !== e, 'Return type should not be "array".'), n))
        for (var l = 0; l < n.length; l++) {
          var p = a[r[l]];
          p ? (0 === u && (u = da()), (s[l] = p(n[l]))) : (s[l] = n[l]);
        }
      var c = o.apply(null, s);
      return (
        (c = (function (t) {
          return 'string' === e ? fn(t) : 'boolean' === e ? Boolean(t) : t;
        })(c)),
        0 !== u && ha(u),
        c
      );
    }
    function ln(t, e, r, n) {
      return function () {
        return un(t, e, r, arguments);
      };
    }
    var pn =
      'undefined' != typeof TextDecoder ? new TextDecoder('utf8') : void 0;
    function cn(t, e, r) {
      for (var n = e + r, i = e; t[i] && !(i >= n); ) ++i;
      if (i - e > 16 && t.subarray && pn) return pn.decode(t.subarray(e, i));
      for (var a = ''; e < i; ) {
        var o = t[e++];
        if (128 & o) {
          var s = 63 & t[e++];
          if (192 != (224 & o)) {
            var u = 63 & t[e++];
            if (
              (224 == (240 & o)
                ? (o = ((15 & o) << 12) | (s << 6) | u)
                : (240 != (248 & o) &&
                    Jr(
                      'Invalid UTF-8 leading byte 0x' +
                        o.toString(16) +
                        ' encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!',
                    ),
                  (o = ((7 & o) << 18) | (s << 12) | (u << 6) | (63 & t[e++]))),
              o < 65536)
            )
              a += String.fromCharCode(o);
            else {
              var l = o - 65536;
              a += String.fromCharCode(55296 | (l >> 10), 56320 | (1023 & l));
            }
          } else a += String.fromCharCode(((31 & o) << 6) | s);
        } else a += String.fromCharCode(o);
      }
      return a;
    }
    function fn(t, e) {
      return t ? cn(_n, t, e) : '';
    }
    function hn(t, e, r, n) {
      if (!(n > 0)) return 0;
      for (var i = r, a = r + n - 1, o = 0; o < t.length; ++o) {
        var s = t.charCodeAt(o);
        if (s >= 55296 && s <= 57343)
          s = (65536 + ((1023 & s) << 10)) | (1023 & t.charCodeAt(++o));
        if (s <= 127) {
          if (r >= a) break;
          e[r++] = s;
        } else if (s <= 2047) {
          if (r + 1 >= a) break;
          (e[r++] = 192 | (s >> 6)), (e[r++] = 128 | (63 & s));
        } else if (s <= 65535) {
          if (r + 2 >= a) break;
          (e[r++] = 224 | (s >> 12)),
            (e[r++] = 128 | ((s >> 6) & 63)),
            (e[r++] = 128 | (63 & s));
        } else {
          if (r + 3 >= a) break;
          s >= 2097152 &&
            Jr(
              'Invalid Unicode code point 0x' +
                s.toString(16) +
                ' encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).',
            ),
            (e[r++] = 240 | (s >> 18)),
            (e[r++] = 128 | ((s >> 12) & 63)),
            (e[r++] = 128 | ((s >> 6) & 63)),
            (e[r++] = 128 | (63 & s));
        }
      }
      return (e[r] = 0), r - i;
    }
    function dn(t, e, r) {
      return (
        on(
          'number' == typeof r,
          'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!',
        ),
        hn(t, _n, e, r)
      );
    }
    'undefined' != typeof TextDecoder && new TextDecoder('utf-16le');
    function yn(t, e) {
      on(
        t.length >= 0,
        'writeArrayToMemory array must have a length (should be an array or typed array)',
      ),
        bn.set(t, e);
    }
    function mn(t) {
      return t.replace(/__Z[\w\d_]+/g, function (t) {
        return t === t ? t : t + ' [' + t + ']';
      });
    }
    function vn() {
      var t = new Error();
      if (!t.stack) {
        try {
          throw new Error(0);
        } catch (e) {
          t = e;
        }
        if (!t.stack) return '(no stack trace available)';
      }
      return t.stack.toString();
    }
    function gn() {
      var t = vn();
      return Vr.extraStackTrace && (t += '\n' + Vr.extraStackTrace()), mn(t);
    }
    var xn,
      bn,
      _n,
      wn,
      En,
      Tn,
      An,
      Sn,
      In = 65536;
    function kn(t, e) {
      return t % e > 0 && (t += e - (t % e)), t;
    }
    function Mn() {
      (Vr.HEAP8 = bn = new Int8Array(xn)),
        (Vr.HEAP16 = wn = new Int16Array(xn)),
        (Vr.HEAP32 = En = new Int32Array(xn)),
        (Vr.HEAPU8 = _n = new Uint8Array(xn)),
        (Vr.HEAPU16 = new Uint16Array(xn)),
        (Vr.HEAPU32 = Tn = new Uint32Array(xn)),
        (Vr.HEAPF32 = An = new Float32Array(xn)),
        (Vr.HEAPF64 = Sn = new Float64Array(xn));
    }
    var On = 5872,
      Pn = 5248752,
      zn = 5248752,
      Rn = 5840;
    on(On % 16 == 0, 'stack must start aligned'),
      on(zn % 16 == 0, 'heap must start aligned');
    var Fn = 5242880;
    Vr.TOTAL_STACK &&
      on(
        Fn === Vr.TOTAL_STACK,
        'the stack size can no longer be determined at runtime',
      );
    var Cn = Vr.TOTAL_MEMORY || 16777216;
    function Dn() {
      on(0 == (3 & Pn)),
        (Tn[(Pn >> 2) - 1] = 34821223),
        (Tn[(Pn >> 2) - 2] = 2310721022);
    }
    function Bn() {
      (34821223 == Tn[(Pn >> 2) - 1] && 2310721022 == Tn[(Pn >> 2) - 2]) ||
        ga(
          'Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x' +
            Tn[(Pn >> 2) - 2].toString(16) +
            ' ' +
            Tn[(Pn >> 2) - 1].toString(16),
        ),
        1668509029 !== En[0] &&
          ga(
            'Runtime error: The application has corrupted its heap memory area (address zero)!',
          );
    }
    function Un(t) {
      ga(
        'Stack overflow! Attempted to allocate ' +
          t +
          ' bytes on the stack, but stack has only ' +
          (Pn - da() + t) +
          ' bytes available!',
      );
    }
    if (
      (Cn < Fn &&
        Wr(
          'TOTAL_MEMORY should be larger than TOTAL_STACK, was ' +
            Cn +
            '! (TOTAL_STACK=' +
            Fn +
            ')',
        ),
      on(
        'undefined' != typeof Int32Array &&
          'undefined' != typeof Float64Array &&
          void 0 !== Int32Array.prototype.subarray &&
          void 0 !== Int32Array.prototype.set,
        'JS engine does not provide full typed array support',
      ),
      Vr.buffer
        ? on(
            (xn = Vr.buffer).byteLength === Cn,
            'provided buffer should be ' +
              Cn +
              ' bytes, but it is ' +
              xn.byteLength,
          )
        : ('object' == typeof WebAssembly &&
          'function' == typeof WebAssembly.Memory
            ? (on(Cn % In == 0),
              (Zr = new WebAssembly.Memory({ initial: Cn / In })),
              (xn = Zr.buffer))
            : (xn = new ArrayBuffer(Cn)),
          on(xn.byteLength === Cn)),
      Mn(),
      (En[Rn >> 2] = zn),
      (En[0] = 1668509029),
      (wn[1] = 25459),
      115 !== _n[2] || 99 !== _n[3])
    )
      throw 'Runtime error: expected the system to be little-endian!';
    function Vn(t) {
      for (; t.length > 0; ) {
        var e = t.shift();
        if ('function' != typeof e) {
          var r = e.func;
          'number' == typeof r
            ? void 0 === e.arg
              ? Vr.dynCall_v(r)
              : Vr.dynCall_vi(r, e.arg)
            : r(void 0 === e.arg ? null : e.arg);
        } else e();
      }
    }
    var Nn = [],
      Ln = [],
      Xn = [],
      qn = [],
      jn = !1,
      Hn = !1;
    function Yn() {
      if (Vr.preRun)
        for (
          'function' == typeof Vr.preRun && (Vr.preRun = [Vr.preRun]);
          Vr.preRun.length;

        )
          Wn(Vr.preRun.shift());
      Vn(Nn);
    }
    function Qn() {
      Bn(), jn || ((jn = !0), Vn(Ln));
    }
    function Kn() {
      Bn(), Vn(Xn);
    }
    function Gn() {
      if ((Bn(), Vr.postRun))
        for (
          'function' == typeof Vr.postRun && (Vr.postRun = [Vr.postRun]);
          Vr.postRun.length;

        )
          Jn(Vr.postRun.shift());
      Vn(qn);
    }
    function Wn(t) {
      Nn.unshift(t);
    }
    function Jn(t) {
      qn.unshift(t);
    }
    on(
      Math.imul,
      'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill',
    ),
      on(
        Math.fround,
        'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill',
      ),
      on(
        Math.clz32,
        'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill',
      ),
      on(
        Math.trunc,
        'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill',
      );
    var Zn = 0,
      $n = null,
      ti = null,
      ei = {};
    function ri(t) {
      Zn++,
        Vr.monitorRunDependencies && Vr.monitorRunDependencies(Zn),
        t &&
          (on(!ei[t]),
          (ei[t] = 1),
          null === $n &&
            'undefined' != typeof setInterval &&
            ($n = setInterval(function () {
              if (an) return clearInterval($n), void ($n = null);
            }, 1e4)));
    }
    function ni(t) {
      if (
        (Zn--,
        Vr.monitorRunDependencies && Vr.monitorRunDependencies(Zn),
        t && (on(ei[t]), delete ei[t]),
        0 == Zn && (null !== $n && (clearInterval($n), ($n = null)), ti))
      ) {
        var e = ti;
        (ti = null), e();
      }
    }
    (Vr.preloadedImages = {}), (Vr.preloadedAudios = {});
    var ii = {
      error: function () {
        ga(
          'Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1',
        );
      },
      init: function () {
        ii.error();
      },
      createDataFile: function () {
        ii.error();
      },
      createPreloadedFile: function () {
        ii.error();
      },
      createLazyFile: function () {
        ii.error();
      },
      open: function () {
        ii.error();
      },
      mkdev: function () {
        ii.error();
      },
      registerDevice: function () {
        ii.error();
      },
      analyzePath: function () {
        ii.error();
      },
      loadFilesFromDB: function () {
        ii.error();
      },
      ErrnoError: function () {
        ii.error();
      },
    };
    (Vr.FS_createDataFile = ii.createDataFile),
      (Vr.FS_createPreloadedFile = ii.createPreloadedFile);
    var ai = 'data:application/octet-stream;base64,';
    function oi(t) {
      return String.prototype.startsWith
        ? t.startsWith(ai)
        : 0 === t.indexOf(ai);
    }
    var si = 'ThirdParty/earcut.wasm';
    function ui() {
      try {
        if (Vr.wasmBinary) return new Uint8Array(Vr.wasmBinary);
        if (Vr.readBinary) return Vr.readBinary(si);
        throw 'both async and sync fetching of the wasm failed';
      } catch (t) {
        ga(t);
      }
    }
    function li() {
      return Vr.wasmBinary || (!Lr && !Xr) || 'function' != typeof fetch
        ? new Promise(function (t, e) {
            t(ui());
          })
        : fetch(si, { credentials: 'same-origin' })
            .then(function (t) {
              if (!t.ok)
                throw "failed to load wasm binary file at '" + si + "'";
              return t.arrayBuffer();
            })
            .catch(function () {
              return ui();
            });
    }
    function pi(t) {
      var e = {
        env: t,
        global: { NaN: NaN, Infinity: 1 / 0 },
        'global.Math': Math,
        asm2wasm: $r,
      };
      function r(t, e) {
        var r = t.exports;
        (Vr.asm = r), ni('wasm-instantiate');
      }
      ri('wasm-instantiate');
      var n = Vr;
      function i(t) {
        on(
          Vr === n,
          'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?',
        ),
          (n = null),
          r(t.instance);
      }
      function a(t) {
        return li()
          .then(function (t) {
            return WebAssembly.instantiate(t, e);
          })
          .then(t, function (t) {});
      }
      if (Vr.instantiateWasm)
        try {
          return Vr.instantiateWasm(e, r);
        } catch (t) {
          return !1;
        }
      return (
        (function () {
          if (
            Vr.wasmBinary ||
            'function' != typeof WebAssembly.instantiateStreaming ||
            oi(si) ||
            'function' != typeof fetch
          )
            return a(i);
          fetch(si, { credentials: 'same-origin' }).then(function (t) {
            return WebAssembly.instantiateStreaming(t, e).then(i, function (t) {
              a(i);
            });
          });
        })(),
        {}
      );
    }
    oi(si) || (si = Kr(si)),
      (Vr.asm = function (t, e, r) {
        (e.memory = Zr),
          (e.table = new WebAssembly.Table({
            initial: 260,
            maximum: 260,
            element: 'anyfunc',
          })),
          (e.__memory_base = 1024),
          (e.__table_base = 0);
        var n = pi(e);
        return on(n, 'binaryen setup failed (no wasm support?)'), n;
      });
    var ci = 5856;
    function fi(t) {
      return ca(t);
    }
    on(ci % 8 == 0);
    var hi = {},
      di = [];
    function yi(t) {
      t && hi[t].refcount++;
    }
    function mi(t) {
      if (!t || hi[t]) return t;
      for (var e in hi)
        for (var r = +e, n = hi[r].adjusted, i = n.length, a = 0; a < i; a++)
          if (n[a] === t) return r;
      return t;
    }
    function vi(t) {
      var e = hi[t];
      return (
        e && !e.caught && ((e.caught = !0), pa.uncaught_exception--),
        e && (e.rethrown = !1),
        di.push(t),
        yi(mi(t)),
        t
      );
    }
    function gi(t, e, r) {
      throw (
        ((hi[t] = {
          ptr: t,
          adjusted: [t],
          type: e,
          destructor: r,
          refcount: 0,
          caught: !1,
          rethrown: !1,
        }),
        'uncaught_exception' in pa
          ? pa.uncaught_exception++
          : (pa.uncaught_exception = 1),
        t +
          ' - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.')
      );
    }
    function xi() {
      return !!pa.uncaught_exception;
    }
    function bi() {}
    function _i() {}
    var wi = {
      buffers: [null, [], []],
      printChar: function (t, e) {
        var r = wi.buffers[t];
        on(r),
          0 === e || 10 === e
            ? ((1 === t ? Gr : Wr)(cn(r, 0)), (r.length = 0))
            : r.push(e);
      },
      varargs: 0,
      get: function (t) {
        return (wi.varargs += 4), En[(wi.varargs - 4) >> 2];
      },
      getStr: function () {
        return fn(wi.get());
      },
      get64: function () {
        var t = wi.get(),
          e = wi.get();
        return on(t >= 0 ? 0 === e : -1 === e), t;
      },
      getZero: function () {
        on(0 === wi.get());
      },
    };
    function Ei(t, e) {
      wi.varargs = e;
      try {
        wi.getStreamFromFD(), wi.get(), wi.get(), wi.get(), wi.get();
        return (
          ga(
            'it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM',
          ),
          0
        );
      } catch (t) {
        return (void 0 !== ii && t instanceof ii.ErrnoError) || ga(t), -t.errno;
      }
    }
    function Ti() {
      var t = Vr._fflush;
      t && t(0);
      var e = wi.buffers;
      e[1].length && wi.printChar(1, 10), e[2].length && wi.printChar(2, 10);
    }
    function Ai(t, e) {
      wi.varargs = e;
      try {
        for (
          var r = wi.get(), n = wi.get(), i = wi.get(), a = 0, o = 0;
          o < i;
          o++
        ) {
          for (
            var s = En[(n + 8 * o) >> 2], u = En[(n + (8 * o + 4)) >> 2], l = 0;
            l < u;
            l++
          )
            wi.printChar(r, _n[s + l]);
          a += u;
        }
        return a;
      } catch (t) {
        return (void 0 !== ii && t instanceof ii.ErrnoError) || ga(t), -t.errno;
      }
    }
    function Si(t, e) {
      wi.varargs = e;
      try {
        return 0;
      } catch (t) {
        return (void 0 !== ii && t instanceof ii.ErrnoError) || ga(t), -t.errno;
      }
    }
    function Ii(t, e) {
      wi.varargs = e;
      try {
        wi.getStreamFromFD();
        return (
          ga(
            'it should not be possible to operate on streams when !SYSCALLS_REQUIRE_FILESYSTEM',
          ),
          0
        );
      } catch (t) {
        return (void 0 !== ii && t instanceof ii.ErrnoError) || ga(t), -t.errno;
      }
    }
    function ki() {}
    function Mi() {
      Vr.abort();
    }
    function Oi() {
      return bn.length;
    }
    function Pi(t, e, r) {
      _n.set(_n.subarray(e, e + r), t);
    }
    function zi(t) {
      if (!Vr.___errno_location) return t;
      En[Vr.___errno_location() >> 2] = t;
    }
    function Ri(t) {
      ga(
        'Cannot enlarge memory arrays to size ' +
          t +
          ' bytes (OOM). Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' +
          bn.length +
          ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ',
      );
    }
    function Fi(t) {
      t = kn(t, 65536);
      var e = xn.byteLength;
      try {
        return -1 !== Zr.grow((t - e) / 65536) && ((xn = Zr.buffer), !0);
      } catch (r) {
        return (
          console.error(
            'emscripten_realloc_buffer: Attempted to grow from ' +
              e +
              ' bytes to ' +
              t +
              ' bytes, but got error: ' +
              r,
          ),
          !1
        );
      }
    }
    function Ci(t) {
      var e = Oi();
      on(t > e);
      var r = 65536,
        n = 2147418112;
      if (t > n) return !1;
      for (var i = Math.max(e, 16777216); i < t; )
        (i =
          i <= 536870912
            ? kn(2 * i, r)
            : Math.min(kn((3 * i + 2147483648) / 4, r), n)) === e &&
          Jr(
            'Cannot ask for more memory since we reached the practical limit in browsers (which is just below 2GB), so the request would have failed. Requesting only ' +
              bn.length,
          );
      return !!Fi(i) && (Mn(), !0);
    }
    function Di(t) {
      Wr(
        "Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
      ),
        Wr('Build with ASSERTIONS=2 for more info.'),
        ga(t);
    }
    function Bi(t) {
      Wr(
        "Invalid function pointer called with signature 'iidiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
      ),
        Wr('Build with ASSERTIONS=2 for more info.'),
        ga(t);
    }
    function Ui(t) {
      Wr(
        "Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
      ),
        Wr('Build with ASSERTIONS=2 for more info.'),
        ga(t);
    }
    function Vi(t) {
      Wr(
        "Invalid function pointer called with signature 'jiji'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
      ),
        Wr('Build with ASSERTIONS=2 for more info.'),
        ga(t);
    }
    function Ni(t) {
      Wr(
        "Invalid function pointer called with signature 'v'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
      ),
        Wr('Build with ASSERTIONS=2 for more info.'),
        ga(t);
    }
    function Li(t) {
      Wr(
        "Invalid function pointer called with signature 'vi'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
      ),
        Wr('Build with ASSERTIONS=2 for more info.'),
        ga(t);
    }
    function Xi(t) {
      Wr(
        "Invalid function pointer called with signature 'vii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
      ),
        Wr('Build with ASSERTIONS=2 for more info.'),
        ga(t);
    }
    function qi(t) {
      Wr(
        "Invalid function pointer called with signature 'viiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
      ),
        Wr('Build with ASSERTIONS=2 for more info.'),
        ga(t);
    }
    function ji(t) {
      Wr(
        "Invalid function pointer called with signature 'viiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
      ),
        Wr('Build with ASSERTIONS=2 for more info.'),
        ga(t);
    }
    function Hi(t) {
      Wr(
        "Invalid function pointer called with signature 'viiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)",
      ),
        Wr('Build with ASSERTIONS=2 for more info.'),
        ga(t);
    }
    var Yi = {},
      Qi = {
        abort: ga,
        setTempRet0: en,
        getTempRet0: rn,
        abortStackOverflow: Un,
        nullFunc_ii: Di,
        nullFunc_iidiiii: Bi,
        nullFunc_iiii: Ui,
        nullFunc_jiji: Vi,
        nullFunc_v: Ni,
        nullFunc_vi: Li,
        nullFunc_vii: Xi,
        nullFunc_viiii: qi,
        nullFunc_viiiii: ji,
        nullFunc_viiiiii: Hi,
        ___cxa_allocate_exception: fi,
        ___cxa_begin_catch: vi,
        ___cxa_throw: gi,
        ___cxa_uncaught_exception: xi,
        ___exception_addRef: yi,
        ___exception_deAdjust: mi,
        ___gxx_personality_v0: bi,
        ___lock: _i,
        ___setErrNo: zi,
        ___syscall140: Ei,
        ___syscall146: Ai,
        ___syscall54: Si,
        ___syscall6: Ii,
        ___unlock: ki,
        _abort: Mi,
        _emscripten_get_heap_size: Oi,
        _emscripten_memcpy_big: Pi,
        _emscripten_resize_heap: Ci,
        abortOnCannotGrowMemory: Ri,
        emscripten_realloc_buffer: Fi,
        flush_NO_FILESYSTEM: Ti,
        tempDoublePtr: ci,
        DYNAMICTOP_PTR: Rn,
      },
      Ki = Vr.asm(Yi, Qi, xn),
      Gi = Ki.__ZSt18uncaught_exceptionv;
    Ki.__ZSt18uncaught_exceptionv = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        Gi.apply(null, arguments)
      );
    };
    var Wi = Ki.___cxa_can_catch;
    Ki.___cxa_can_catch = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        Wi.apply(null, arguments)
      );
    };
    var Ji = Ki.___cxa_is_pointer_type;
    Ki.___cxa_is_pointer_type = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        Ji.apply(null, arguments)
      );
    };
    var Zi = Ki.___errno_location;
    Ki.___errno_location = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        Zi.apply(null, arguments)
      );
    };
    var $i = Ki._earcut;
    Ki._earcut = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        $i.apply(null, arguments)
      );
    };
    var ta = Ki._fflush;
    Ki._fflush = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        ta.apply(null, arguments)
      );
    };
    var ea = Ki._free;
    Ki._free = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        ea.apply(null, arguments)
      );
    };
    var ra = Ki._llvm_maxnum_f64;
    Ki._llvm_maxnum_f64 = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        ra.apply(null, arguments)
      );
    };
    var na = Ki._llvm_minnum_f64;
    Ki._llvm_minnum_f64 = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        na.apply(null, arguments)
      );
    };
    var ia = Ki._malloc;
    Ki._malloc = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        ia.apply(null, arguments)
      );
    };
    var aa = Ki._sbrk;
    Ki._sbrk = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        aa.apply(null, arguments)
      );
    };
    var oa = Ki.establishStackSpace;
    Ki.establishStackSpace = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        oa.apply(null, arguments)
      );
    };
    var sa = Ki.stackAlloc;
    Ki.stackAlloc = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        sa.apply(null, arguments)
      );
    };
    var ua = Ki.stackRestore;
    Ki.stackRestore = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        ua.apply(null, arguments)
      );
    };
    var la = Ki.stackSave;
    (Ki.stackSave = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        la.apply(null, arguments)
      );
    }),
      (Vr.asm = Ki);
    var pa = (Vr.__ZSt18uncaught_exceptionv = function () {
        return (
          on(
            jn,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          on(
            !Hn,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          Vr.asm.__ZSt18uncaught_exceptionv.apply(null, arguments)
        );
      }),
      ca =
        ((Vr.___cxa_can_catch = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm.___cxa_can_catch.apply(null, arguments)
          );
        }),
        (Vr.___cxa_is_pointer_type = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm.___cxa_is_pointer_type.apply(null, arguments)
          );
        }),
        (Vr.___errno_location = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm.___errno_location.apply(null, arguments)
          );
        }),
        (Vr._earcut = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm._earcut.apply(null, arguments)
          );
        }),
        (Vr._emscripten_replace_memory = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm._emscripten_replace_memory.apply(null, arguments)
          );
        }),
        (Vr._fflush = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm._fflush.apply(null, arguments)
          );
        }),
        (Vr._free = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm._free.apply(null, arguments)
          );
        }),
        (Vr._llvm_maxnum_f64 = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm._llvm_maxnum_f64.apply(null, arguments)
          );
        }),
        (Vr._llvm_minnum_f64 = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm._llvm_minnum_f64.apply(null, arguments)
          );
        }),
        (Vr._malloc = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm._malloc.apply(null, arguments)
          );
        })),
      fa =
        ((Vr._memcpy = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm._memcpy.apply(null, arguments)
          );
        }),
        (Vr._memset = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm._memset.apply(null, arguments)
          );
        }),
        (Vr._sbrk = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm._sbrk.apply(null, arguments)
          );
        }),
        (Vr.establishStackSpace = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm.establishStackSpace.apply(null, arguments)
          );
        }),
        (Vr.stackAlloc = function () {
          return (
            on(
              jn,
              'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
            ),
            on(
              !Hn,
              'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
            ),
            Vr.asm.stackAlloc.apply(null, arguments)
          );
        })),
      ha = (Vr.stackRestore = function () {
        return (
          on(
            jn,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          on(
            !Hn,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          Vr.asm.stackRestore.apply(null, arguments)
        );
      }),
      da = (Vr.stackSave = function () {
        return (
          on(
            jn,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          on(
            !Hn,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          Vr.asm.stackSave.apply(null, arguments)
        );
      });
    (Vr.dynCall_ii = function () {
      return (
        on(
          jn,
          'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
        ),
        on(
          !Hn,
          'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
        ),
        Vr.asm.dynCall_ii.apply(null, arguments)
      );
    }),
      (Vr.dynCall_iidiiii = function () {
        return (
          on(
            jn,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          on(
            !Hn,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          Vr.asm.dynCall_iidiiii.apply(null, arguments)
        );
      }),
      (Vr.dynCall_iiii = function () {
        return (
          on(
            jn,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          on(
            !Hn,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          Vr.asm.dynCall_iiii.apply(null, arguments)
        );
      }),
      (Vr.dynCall_jiji = function () {
        return (
          on(
            jn,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          on(
            !Hn,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          Vr.asm.dynCall_jiji.apply(null, arguments)
        );
      }),
      (Vr.dynCall_v = function () {
        return (
          on(
            jn,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          on(
            !Hn,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          Vr.asm.dynCall_v.apply(null, arguments)
        );
      }),
      (Vr.dynCall_vi = function () {
        return (
          on(
            jn,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          on(
            !Hn,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          Vr.asm.dynCall_vi.apply(null, arguments)
        );
      }),
      (Vr.dynCall_vii = function () {
        return (
          on(
            jn,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          on(
            !Hn,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          Vr.asm.dynCall_vii.apply(null, arguments)
        );
      }),
      (Vr.dynCall_viiii = function () {
        return (
          on(
            jn,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          on(
            !Hn,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          Vr.asm.dynCall_viiii.apply(null, arguments)
        );
      }),
      (Vr.dynCall_viiiii = function () {
        return (
          on(
            jn,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          on(
            !Hn,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          Vr.asm.dynCall_viiiii.apply(null, arguments)
        );
      }),
      (Vr.dynCall_viiiiii = function () {
        return (
          on(
            jn,
            'you need to wait for the runtime to be ready (e.g. wait for main() to be called)',
          ),
          on(
            !Hn,
            'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)',
          ),
          Vr.asm.dynCall_viiiiii.apply(null, arguments)
        );
      });
    function ya(t) {
      (this.name = 'ExitStatus'),
        (this.message = 'Program terminated with exit(' + t + ')'),
        (this.status = t);
    }
    function ma(t) {
      function e() {
        Vr.calledRun ||
          ((Vr.calledRun = !0),
          an ||
            (Qn(),
            Kn(),
            Vr.onRuntimeInitialized && Vr.onRuntimeInitialized(),
            on(
              !Vr._main,
              'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]',
            ),
            Gn()));
      }
      (t = t || Vr.arguments),
        Zn > 0 ||
          (Dn(),
          Yn(),
          Zn > 0 ||
            Vr.calledRun ||
            (Vr.setStatus
              ? (Vr.setStatus('Running...'),
                setTimeout(function () {
                  setTimeout(function () {
                    Vr.setStatus('');
                  }, 1),
                    e();
                }, 1))
              : e(),
            Bn()));
    }
    (Vr.asm = Ki),
      Vr.intArrayFromString ||
        (Vr.intArrayFromString = function () {
          ga(
            "'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.intArrayToString ||
        (Vr.intArrayToString = function () {
          ga(
            "'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      (Vr.ccall = un),
      (Vr.cwrap = ln),
      Vr.setValue ||
        (Vr.setValue = function () {
          ga(
            "'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      (Vr.getValue = nn),
      Vr.allocate ||
        (Vr.allocate = function () {
          ga(
            "'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.getMemory ||
        (Vr.getMemory = function () {
          ga(
            "'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      Vr.AsciiToString ||
        (Vr.AsciiToString = function () {
          ga(
            "'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.stringToAscii ||
        (Vr.stringToAscii = function () {
          ga(
            "'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.UTF8ArrayToString ||
        (Vr.UTF8ArrayToString = function () {
          ga(
            "'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.UTF8ToString ||
        (Vr.UTF8ToString = function () {
          ga(
            "'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.stringToUTF8Array ||
        (Vr.stringToUTF8Array = function () {
          ga(
            "'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.stringToUTF8 ||
        (Vr.stringToUTF8 = function () {
          ga(
            "'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.lengthBytesUTF8 ||
        (Vr.lengthBytesUTF8 = function () {
          ga(
            "'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.UTF16ToString ||
        (Vr.UTF16ToString = function () {
          ga(
            "'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.stringToUTF16 ||
        (Vr.stringToUTF16 = function () {
          ga(
            "'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.lengthBytesUTF16 ||
        (Vr.lengthBytesUTF16 = function () {
          ga(
            "'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.UTF32ToString ||
        (Vr.UTF32ToString = function () {
          ga(
            "'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.stringToUTF32 ||
        (Vr.stringToUTF32 = function () {
          ga(
            "'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.lengthBytesUTF32 ||
        (Vr.lengthBytesUTF32 = function () {
          ga(
            "'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.allocateUTF8 ||
        (Vr.allocateUTF8 = function () {
          ga(
            "'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.stackTrace ||
        (Vr.stackTrace = function () {
          ga(
            "'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.addOnPreRun ||
        (Vr.addOnPreRun = function () {
          ga(
            "'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.addOnInit ||
        (Vr.addOnInit = function () {
          ga(
            "'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.addOnPreMain ||
        (Vr.addOnPreMain = function () {
          ga(
            "'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.addOnExit ||
        (Vr.addOnExit = function () {
          ga(
            "'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.addOnPostRun ||
        (Vr.addOnPostRun = function () {
          ga(
            "'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.writeStringToMemory ||
        (Vr.writeStringToMemory = function () {
          ga(
            "'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.writeArrayToMemory ||
        (Vr.writeArrayToMemory = function () {
          ga(
            "'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.writeAsciiToMemory ||
        (Vr.writeAsciiToMemory = function () {
          ga(
            "'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.addRunDependency ||
        (Vr.addRunDependency = function () {
          ga(
            "'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      Vr.removeRunDependency ||
        (Vr.removeRunDependency = function () {
          ga(
            "'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      Vr.ENV ||
        (Vr.ENV = function () {
          ga(
            "'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.FS ||
        (Vr.FS = function () {
          ga(
            "'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.FS_createFolder ||
        (Vr.FS_createFolder = function () {
          ga(
            "'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      Vr.FS_createPath ||
        (Vr.FS_createPath = function () {
          ga(
            "'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      Vr.FS_createDataFile ||
        (Vr.FS_createDataFile = function () {
          ga(
            "'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      Vr.FS_createPreloadedFile ||
        (Vr.FS_createPreloadedFile = function () {
          ga(
            "'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      Vr.FS_createLazyFile ||
        (Vr.FS_createLazyFile = function () {
          ga(
            "'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      Vr.FS_createLink ||
        (Vr.FS_createLink = function () {
          ga(
            "'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      Vr.FS_createDevice ||
        (Vr.FS_createDevice = function () {
          ga(
            "'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      Vr.FS_unlink ||
        (Vr.FS_unlink = function () {
          ga(
            "'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you",
          );
        }),
      Vr.GL ||
        (Vr.GL = function () {
          ga(
            "'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.dynamicAlloc ||
        (Vr.dynamicAlloc = function () {
          ga(
            "'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.warnOnce ||
        (Vr.warnOnce = function () {
          ga(
            "'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.loadDynamicLibrary ||
        (Vr.loadDynamicLibrary = function () {
          ga(
            "'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.loadWebAssemblyModule ||
        (Vr.loadWebAssemblyModule = function () {
          ga(
            "'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.getLEB ||
        (Vr.getLEB = function () {
          ga(
            "'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.getFunctionTables ||
        (Vr.getFunctionTables = function () {
          ga(
            "'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.alignFunctionTables ||
        (Vr.alignFunctionTables = function () {
          ga(
            "'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.registerFunctions ||
        (Vr.registerFunctions = function () {
          ga(
            "'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.addFunction ||
        (Vr.addFunction = function () {
          ga(
            "'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.removeFunction ||
        (Vr.removeFunction = function () {
          ga(
            "'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.getFuncWrapper ||
        (Vr.getFuncWrapper = function () {
          ga(
            "'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.prettyPrint ||
        (Vr.prettyPrint = function () {
          ga(
            "'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.makeBigInt ||
        (Vr.makeBigInt = function () {
          ga(
            "'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.dynCall ||
        (Vr.dynCall = function () {
          ga(
            "'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.getCompilerSetting ||
        (Vr.getCompilerSetting = function () {
          ga(
            "'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.stackSave ||
        (Vr.stackSave = function () {
          ga(
            "'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.stackRestore ||
        (Vr.stackRestore = function () {
          ga(
            "'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.stackAlloc ||
        (Vr.stackAlloc = function () {
          ga(
            "'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.establishStackSpace ||
        (Vr.establishStackSpace = function () {
          ga(
            "'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.print ||
        (Vr.print = function () {
          ga(
            "'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.printErr ||
        (Vr.printErr = function () {
          ga(
            "'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.getTempRet0 ||
        (Vr.getTempRet0 = function () {
          ga(
            "'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.setTempRet0 ||
        (Vr.setTempRet0 = function () {
          ga(
            "'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.Pointer_stringify ||
        (Vr.Pointer_stringify = function () {
          ga(
            "'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
          );
        }),
      Vr.ALLOC_NORMAL ||
        Object.defineProperty(Vr, 'ALLOC_NORMAL', {
          get: function () {
            ga(
              "'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
            );
          },
        }),
      Vr.ALLOC_STACK ||
        Object.defineProperty(Vr, 'ALLOC_STACK', {
          get: function () {
            ga(
              "'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
            );
          },
        }),
      Vr.ALLOC_DYNAMIC ||
        Object.defineProperty(Vr, 'ALLOC_DYNAMIC', {
          get: function () {
            ga(
              "'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
            );
          },
        }),
      Vr.ALLOC_NONE ||
        Object.defineProperty(Vr, 'ALLOC_NONE', {
          get: function () {
            ga(
              "'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)",
            );
          },
        }),
      (ya.prototype = new Error()),
      (ya.prototype.constructor = ya),
      (ti = function t() {
        Vr.calledRun || ma(), Vr.calledRun || (ti = t);
      }),
      (Vr.run = ma);
    var va = [];
    function ga(t) {
      Vr.onAbort && Vr.onAbort(t), (an = !0);
      var e =
        'abort(' + (t = void 0 !== t ? '"' + t + '"' : '') + ') at ' + gn();
      throw (
        (va &&
          va.forEach(function (r) {
            e = r(e, t);
          }),
        e)
      );
    }
    if (((Vr.abort = ga), Vr.preInit))
      for (
        'function' == typeof Vr.preInit && (Vr.preInit = [Vr.preInit]);
        Vr.preInit.length > 0;

      )
        Vr.preInit.pop()();
    (Vr.noExitRuntime = !0), ma();
  } else Vr = null;
  var xa = Vr,
    ba = !1;
  if (t.defined(xa)) {
    xa.onRuntimeInitialized = function () {
      ba = !0;
    };
    var _a = xa.cwrap('earcut', 'number', [
      'number',
      'number',
      'number',
      'number',
      'number',
      'number',
    ]);
  }
  var wa = o([{ name: 'a_pos', components: 2, type: 'Int16' }], 4),
    Ea = wa.members,
    Ta = 500,
    Aa = function (t) {
      (this.zoom = t.zoom),
        (this.overscaling = t.overscaling),
        (this.layers = t.layers),
        (this.layerIds = this.layers.map(function (t) {
          return t.id;
        })),
        (this.index = t.index),
        (this.hasPattern = !1),
        (this.patternFeatures = []),
        (this.layoutVertexArray = new Cr()),
        (this.indexArray = new je()),
        (this.indexArray2 = new Dr()),
        (this.programConfigurations = new yr(Ea, t.layers, t.zoom)),
        (this.segments = new Ve()),
        (this.segments2 = new Ve()),
        (this.stateDependentLayerIds = this.layers
          .filter(function (t) {
            return t.isStateDependent();
          })
          .map(function (t) {
            return t.id;
          }));
    };
  (Aa.prototype.populate = function (t, e) {
    this.hasPattern = Br('fill', this.layers, e);
    for (var r = [], n = 0, i = t; n < i.length; n += 1) {
      var a = i[n],
        o = a.feature,
        s = a.index,
        u = a.sourceLayerIndex;
      if (this.layers[0]._featureFilter(new Re(0), o)) {
        var l = Ue(o),
          p = {
            id: o.id,
            properties: o.properties,
            type: o.type,
            sourceLayerIndex: u,
            index: s,
            geometry: l,
            patterns: {},
            sortKey: undefined,
          };
        r.push(p);
      }
    }
    for (var c = 0, f = r; c < f.length; c += 1) {
      var h = f[c],
        d = h,
        y = d.geometry,
        m = d.index,
        v = d.sourceLayerIndex;
      if (this.hasPattern) {
        var g = mr('fill', this.layers, h, this.zoom, e);
        this.patternFeatures.push(g);
      } else this.addFeature(h, y, m, {}, e.indexData);
      var x = t[m].feature;
      e.featureIndex.insert(x, y, m, v, this.index);
    }
  }),
    (Aa.prototype.update = function (t, e, r) {
      this.stateDependentLayers.length &&
        this.programConfigurations.updatePaintArrays(
          t,
          e,
          this.stateDependentLayers,
          r,
        );
    }),
    (Aa.prototype.addFeatures = function (t, e) {
      for (var r = 0, n = this.patternFeatures; r < n.length; r += 1) {
        var i = n[r];
        this.addFeature(i, i.geometry, i.index, e);
      }
    }),
    (Aa.prototype.isEmpty = function () {
      return 0 === this.layoutVertexArray.length;
    }),
    (Aa.prototype.uploadPending = function () {
      return !this.uploaded || this.programConfigurations.needsUpload;
    }),
    (Aa.prototype.upload = function (t) {
      if (!this.uploaded) {
        if (null == this.layoutVertexArray) return;
        (this.layoutVertexBuffer = t.createVertexBuffer(
          this.layoutVertexArray,
          Ea,
        )),
          (this.indexBuffer = t.createIndexBuffer(this.indexArray)),
          (this.indexBuffer2 = t.createIndexBuffer(this.indexArray2));
      }
      this.programConfigurations.upload(t), (this.uploaded = !0);
    }),
    (Aa.prototype.destroy = function () {
      this.layoutVertexBuffer &&
        (this.layoutVertexBuffer.destroy(),
        this.indexBuffer.destroy(),
        this.indexBuffer2.destroy(),
        this.programConfigurations.destroy(),
        this.segments.destroy(),
        this.segments2.destroy());
    }),
    (Aa.prototype.clear = function () {
      t.defined(this.layoutVertexArray) && (this.layoutVertexArray = null),
        t.defined(this.indexArray) && (this.indexArray = null),
        t.defined(this.indexArray2) && (this.indexArray2 = null);
    }),
    (Aa.prototype.addFeature = function (e, n, i, a, o) {
      for (var s = 0, u = Rr(n, Ta); s < u.length; s += 1) {
        for (var l = u[s], p = 0, c = 0, f = l; c < f.length; c += 1) {
          p += f[c].length;
        }
        for (
          var h,
            d = this.segments.prepareSegment(
              p,
              this.layoutVertexArray,
              this.indexArray,
            ),
            y = d.vertexLength,
            m = [],
            v = [],
            g = 0,
            x = l;
          g < x.length;
          g += 1
        ) {
          var b = x[g];
          if (0 !== b.length) {
            b !== l[0] && v.push(m.length / 2);
            var _ = this.segments2.prepareSegment(
                b.length,
                this.layoutVertexArray,
                this.indexArray2,
              ),
              w = _.vertexLength;
            this.layoutVertexArray.emplaceBack(b[0].x, b[0].y),
              this.indexArray2.emplaceBack(w + b.length - 1, w),
              m.push(b[0].x),
              m.push(b[0].y);
            for (var E = 1; E < b.length; E++)
              this.layoutVertexArray.emplaceBack(b[E].x, b[E].y),
                this.indexArray2.emplaceBack(w + E - 1, w + E),
                m.push(b[E].x),
                m.push(b[E].y);
            (_.vertexLength += b.length), (_.primitiveLength += b.length);
          }
        }
        if (t.defined(o) && t.defined(o[e.id])) h = o[e.id];
        else if (!0 === ba) {
          var T = new Int32Array(m),
            A = T.length,
            S = xa._malloc(Int32Array.BYTES_PER_ELEMENT * A);
          xa.HEAP32.set(T, S / Int32Array.BYTES_PER_ELEMENT);
          var I = new Int32Array(v),
            k = I.length,
            M = xa._malloc(Int32Array.BYTES_PER_ELEMENT * k);
          xa.HEAP32.set(I, M / Int32Array.BYTES_PER_ELEMENT);
          var O = new Int32Array(10 * A),
            P = xa._malloc(Int32Array.BYTES_PER_ELEMENT * A * 10);
          xa.HEAP32.set(O, P / Int32Array.BYTES_PER_ELEMENT);
          var z = _a(S, A, M, k, 2, P),
            R = new Int32Array(xa.HEAP32.buffer, P, z);
          (h = new Int32Array(R)), xa._free(S), xa._free(M), xa._free(P);
        } else h = r.earcut(m, v);
        for (var F = 0; F < h.length; F += 3)
          this.indexArray.emplaceBack(y + h[F], y + h[F + 1], y + h[F + 2]);
        (d.vertexLength += p), (d.primitiveLength += h.length / 3);
      }
      this.programConfigurations.populatePaintArrays(
        this.layoutVertexArray.length,
        e,
        i,
        a,
      );
    }),
    ke.register('FillBucket', Aa, { omit: ['layers', 'patternFeatures'] });
  var Sa = function (t, e) {
      (this._structArray = t),
        (this._pos1 = e * this.size),
        (this._pos2 = this._pos1 / 2),
        (this._pos4 = this._pos1 / 4),
        (this._pos8 = this._pos1 / 8);
    },
    Ia = 128,
    ka = 5,
    Ma = function () {
      (this.isTransferred = !1), (this.capacity = -1), this.resize(0);
    };
  (Ma.serialize = function (t, e) {
    return (
      t.isTransferred && console.log('StructArray array.isTransferred.'),
      t._trim(),
      e && ((t.isTransferred = !0), e.push(t.arrayBuffer)),
      { length: t.length, arrayBuffer: t.arrayBuffer }
    );
  }),
    (Ma.deserialize = function (t) {
      var e = Object.create(this.prototype);
      return (
        (e.arrayBuffer = t.arrayBuffer),
        (e.length = t.length),
        (e.capacity = t.arrayBuffer.byteLength / e.bytesPerElement),
        e._refreshViews(),
        e
      );
    }),
    (Ma.prototype._trim = function () {
      this.length !== this.capacity &&
        ((this.capacity = this.length),
        (this.arrayBuffer = this.arrayBuffer.slice(
          0,
          this.length * this.bytesPerElement,
        )),
        this._refreshViews());
    }),
    (Ma.prototype.clear = function () {
      this.length = 0;
    }),
    (Ma.prototype.resize = function (t) {
      this.reserve(t), (this.length = t);
    }),
    (Ma.prototype.reserve = function (t) {
      if (t > this.capacity) {
        (this.capacity = Math.max(t, Math.floor(this.capacity * ka), Ia)),
          (this.arrayBuffer = new ArrayBuffer(
            this.capacity * this.bytesPerElement,
          ));
        var e = this.uint8;
        this._refreshViews(), e && this.uint8.set(e);
      }
    }),
    (Ma.prototype._refreshViews = function () {
      throw new Error(
        '_refreshViews() must be implemented by each concrete StructArray layout',
      );
    });
  var Oa = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype._refreshViews = function () {
        (this.uint8 = new Uint8Array(this.arrayBuffer)),
          (this.uint32 = new Uint32Array(this.arrayBuffer)),
          (this.uint16 = new Uint16Array(this.arrayBuffer));
      }),
      (e.prototype.emplaceBack = function (t, e, r) {
        var n = this.length;
        return this.resize(n + 1), this.emplace(n, t, e, r);
      }),
      (e.prototype.emplace = function (t, e, r, n) {
        var i = 2 * t,
          a = 4 * t;
        return (
          (this.uint32[i + 0] = e),
          (this.uint16[a + 2] = r),
          (this.uint16[a + 3] = n),
          t
        );
      }),
      e
    );
  })(Ma);
  Oa.prototype.bytesPerElement = 8;
  var Pa = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e);
    var r = {
      featureIndex: { configurable: !0 },
      sourceLayerIndex: { configurable: !0 },
      bucketIndex: { configurable: !0 },
    };
    return (
      (r.featureIndex.get = function () {
        return this._structArray.uint32[this._pos4 + 0];
      }),
      (r.featureIndex.set = function (t) {
        this._structArray.uint32[this._pos4 + 0] = t;
      }),
      (r.sourceLayerIndex.get = function () {
        return this._structArray.uint16[this._pos2 + 2];
      }),
      (r.sourceLayerIndex.set = function (t) {
        this._structArray.uint16[this._pos2 + 2] = t;
      }),
      (r.bucketIndex.get = function () {
        return this._structArray.uint16[this._pos2 + 3];
      }),
      (r.bucketIndex.set = function (t) {
        this._structArray.uint16[this._pos2 + 3] = t;
      }),
      Object.defineProperties(e.prototype, r),
      e
    );
  })(Sa);
  Pa.prototype.size = 8;
  var za = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype.get = function (t) {
        return new Pa(this, t);
      }),
      e
    );
  })(Oa);
  ke.register('FeatureIndexArray', za, { omit: ['layers', 'patternFeatures'] });
  var Ra = { FeatureIndexArray: za };
  function Fa(t, e) {
    (this.x = t), (this.y = e);
  }
  function Ca(t, e, r, n, i) {
    (this.properties = {}),
      (this.extent = r),
      (this.type = 0),
      (this._pbf = t),
      (this._geometry = -1),
      (this._keys = n),
      (this._values = i),
      t.readFields(Da, this, e);
  }
  function Da(t, e, r) {
    1 == t
      ? (e.id = r.readVarint())
      : 2 == t
      ? Ba(r, e)
      : 3 == t
      ? (e.type = r.readVarint())
      : 4 == t && (e._geometry = r.pos);
  }
  function Ba(t, e) {
    for (var r = t.readVarint() + t.pos; t.pos < r; ) {
      var n = e._keys[t.readVarint()],
        i = e._values[t.readVarint()];
      e.properties[n] = i;
    }
  }
  function Ua(t) {
    var e = t.length;
    if (e <= 1) return [t];
    for (var r, n, i = [], a = 0; a < e; a++) {
      var o = Va(t[a]);
      0 !== o &&
        (void 0 === n && (n = o < 0),
        n === o < 0 ? (r && i.push(r), (r = [t[a]])) : r.push(t[a]));
    }
    return r && i.push(r), i;
  }
  function Va(t) {
    for (var e, r, n = 0, i = 0, a = t.length, o = a - 1; i < a; o = i++)
      (e = t[i]), (n += ((r = t[o]).x - e.x) * (e.y + r.y));
    return n;
  }
  function Na(t, e) {
    (this.version = 1),
      (this.name = null),
      (this.extent = 4096),
      (this.length = 0),
      (this._pbf = t),
      (this._keys = []),
      (this._values = []),
      (this._features = []),
      t.readFields(La, this, e),
      (this.length = this._features.length);
  }
  function La(t, e, r) {
    15 === t
      ? (e.version = r.readVarint())
      : 1 === t
      ? (e.name = r.readString())
      : 5 === t
      ? (e.extent = r.readVarint())
      : 2 === t
      ? e._features.push(r.pos)
      : 3 === t
      ? e._keys.push(r.readString())
      : 4 === t && e._values.push(Xa(r));
  }
  function Xa(t) {
    for (var e = null, r = t.readVarint() + t.pos; t.pos < r; ) {
      var n = t.readVarint() >> 3;
      e =
        1 === n
          ? t.readString()
          : 2 === n
          ? t.readFloat()
          : 3 === n
          ? t.readDouble()
          : 4 === n
          ? t.readVarint64()
          : 5 === n
          ? t.readVarint()
          : 6 === n
          ? t.readSVarint()
          : 7 === n
          ? t.readBoolean()
          : null;
    }
    return e;
  }
  function qa(t, e) {
    this.layers = t.readFields(ja, {}, e);
  }
  function ja(t, e, r) {
    if (3 === t) {
      var n = new Na(r, r.readVarint() + r.pos);
      n.length && (e[n.name] = n);
    }
  }
  (Fa.prototype = {
    clone: function () {
      return new Fa(this.x, this.y);
    },
    add: function (t) {
      return this.clone()._add(t);
    },
    sub: function (t) {
      return this.clone()._sub(t);
    },
    multByPoint: function (t) {
      return this.clone()._multByPoint(t);
    },
    divByPoint: function (t) {
      return this.clone()._divByPoint(t);
    },
    mult: function (t) {
      return this.clone()._mult(t);
    },
    div: function (t) {
      return this.clone()._div(t);
    },
    rotate: function (t) {
      return this.clone()._rotate(t);
    },
    rotateAround: function (t, e) {
      return this.clone()._rotateAround(t, e);
    },
    matMult: function (t) {
      return this.clone()._matMult(t);
    },
    unit: function () {
      return this.clone()._unit();
    },
    perp: function () {
      return this.clone()._perp();
    },
    round: function () {
      return this.clone()._round();
    },
    mag: function () {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    equals: function (t) {
      return this.x === t.x && this.y === t.y;
    },
    dist: function (t) {
      return Math.sqrt(this.distSqr(t));
    },
    distSqr: function (t) {
      var e = t.x - this.x,
        r = t.y - this.y;
      return e * e + r * r;
    },
    angle: function () {
      return Math.atan2(this.y, this.x);
    },
    angleTo: function (t) {
      return Math.atan2(this.y - t.y, this.x - t.x);
    },
    angleWith: function (t) {
      return this.angleWithSep(t.x, t.y);
    },
    angleWithSep: function (t, e) {
      return Math.atan2(this.x * e - this.y * t, this.x * t + this.y * e);
    },
    _matMult: function (t) {
      var e = t[0] * this.x + t[1] * this.y,
        r = t[2] * this.x + t[3] * this.y;
      return (this.x = e), (this.y = r), this;
    },
    _add: function (t) {
      return (this.x += t.x), (this.y += t.y), this;
    },
    _sub: function (t) {
      return (this.x -= t.x), (this.y -= t.y), this;
    },
    _mult: function (t) {
      return (this.x *= t), (this.y *= t), this;
    },
    _div: function (t) {
      return (this.x /= t), (this.y /= t), this;
    },
    _multByPoint: function (t) {
      return (this.x *= t.x), (this.y *= t.y), this;
    },
    _divByPoint: function (t) {
      return (this.x /= t.x), (this.y /= t.y), this;
    },
    _unit: function () {
      return this._div(this.mag()), this;
    },
    _perp: function () {
      var t = this.y;
      return (this.y = this.x), (this.x = -t), this;
    },
    _rotate: function (t) {
      var e = Math.cos(t),
        r = Math.sin(t),
        n = e * this.x - r * this.y,
        i = r * this.x + e * this.y;
      return (this.x = n), (this.y = i), this;
    },
    _rotateAround: function (t, e) {
      var r = Math.cos(t),
        n = Math.sin(t),
        i = e.x + r * (this.x - e.x) - n * (this.y - e.y),
        a = e.y + n * (this.x - e.x) + r * (this.y - e.y);
      return (this.x = i), (this.y = a), this;
    },
    _round: function () {
      return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this;
    },
  }),
    (Fa.convert = function (t) {
      return t instanceof Fa ? t : Array.isArray(t) ? new Fa(t[0], t[1]) : t;
    }),
    (Ca.types = ['Unknown', 'Point', 'LineString', 'Polygon']),
    (Ca.prototype.loadGeometry = function () {
      var t = this._pbf;
      t.pos = this._geometry;
      for (
        var e, r = t.readVarint() + t.pos, n = 1, i = 0, a = 0, o = 0, s = [];
        t.pos < r;

      ) {
        if (i <= 0) {
          var u = t.readVarint();
          (n = 7 & u), (i = u >> 3);
        }
        i--,
          1 === n || 2 === n
            ? ((a += t.readSVarint()),
              (o += t.readSVarint()),
              1 === n && (e && s.push(e), (e = [])),
              e.push(new Fa(a, o)))
            : 7 === n
            ? e && e.push(e[0].clone())
            : console.log(
                'VectorTileFeature loadGeometry unknown command ' + n,
              );
      }
      return e && s.push(e), s;
    }),
    (Ca.prototype.bbox = function () {
      var t = this._pbf;
      t.pos = this._geometry;
      for (
        var e = t.readVarint() + t.pos,
          r = 1,
          n = 0,
          i = 0,
          a = 0,
          o = 1 / 0,
          s = -1 / 0,
          u = 1 / 0,
          l = -1 / 0;
        t.pos < e;

      ) {
        if (n <= 0) {
          var p = t.readVarint();
          (r = 7 & p), (n = p >> 3);
        }
        if ((n--, 1 === r || 2 === r))
          (i += t.readSVarint()) < o && (o = i),
            i > s && (s = i),
            (a += t.readSVarint()) < u && (u = a),
            a > l && (l = a);
        else if (7 !== r) throw new Error('unknown command ' + r);
      }
      return [o, u, s, l];
    }),
    (Ca.prototype.toGeoJSON = function (t, e, r) {
      var n,
        i,
        a = this.extent * Math.pow(2, r),
        o = this.extent * t,
        s = this.extent * e,
        u = this.loadGeometry(),
        l = Ca.types[this.type];
      function p(t) {
        for (var e = 0; e < t.length; e++) {
          var r = t[e],
            n = 180 - (360 * (r.y + s)) / a;
          t[e] = [
            (360 * (r.x + o)) / a - 180,
            (360 / Math.PI) * Math.atan(Math.exp((n * Math.PI) / 180)) - 90,
          ];
        }
      }
      switch (this.type) {
        case 1:
          var c = [];
          for (n = 0; n < u.length; n++) c[n] = u[n][0];
          p((u = c));
          break;
        case 2:
          for (n = 0; n < u.length; n++) p(u[n]);
          break;
        case 3:
          for (u = Ua(u), n = 0; n < u.length; n++)
            for (i = 0; i < u[n].length; i++) p(u[n][i]);
      }
      1 === u.length ? (u = u[0]) : (l = 'Multi' + l);
      var f = {
        type: 'Feature',
        geometry: { type: l, coordinates: u },
        properties: this.properties,
      };
      return 'id' in this && (f.id = this.id), f;
    }),
    (Na.prototype.feature = function (t) {
      if (t < 0 || t >= this._features.length)
        throw new Error('feature index out of bounds');
      this._pbf.pos = this._features[t];
      var e = this._pbf.readVarint() + this._pbf.pos;
      return new Ca(this._pbf, e, this.extent, this._keys, this._values);
    });
  var Ha = 3;
  function Ya(t, e, r) {
    var n = (this.cells = []);
    if (t instanceof ArrayBuffer) {
      this.arrayBuffer = t;
      var i = new Int32Array(this.arrayBuffer);
      (t = i[0]), (e = i[1]), (r = i[2]), (this.d = e + 2 * r);
      for (var a = 0; a < this.d * this.d; a++) {
        var o = i[Ha + a],
          s = i[Ha + a + 1];
        n.push(o === s ? null : i.subarray(o, s));
      }
      var u = i[Ha + n.length],
        l = i[Ha + n.length + 1];
      (this.keys = i.subarray(u, l)),
        (this.bboxes = i.subarray(l)),
        (this.insert = this._insertReadonly);
    } else {
      this.d = e + 2 * r;
      for (var p = 0; p < this.d * this.d; p++) n.push([]);
      (this.keys = []), (this.bboxes = []);
    }
    (this.n = e),
      (this.extent = t),
      (this.padding = r),
      (this.scale = e / t),
      (this.uid = 0);
    var c = (r / e) * t;
    (this.min = -c), (this.max = t + c);
  }
  function Qa() {}
  (Ya.prototype.insert = function (t, e, r, n, i) {
    this._forEachCell(e, r, n, i, this._insertCell, this.uid++),
      this.keys.push(t),
      this.bboxes.push(e),
      this.bboxes.push(r),
      this.bboxes.push(n),
      this.bboxes.push(i);
  }),
    (Ya.prototype._insertReadonly = function () {
      throw 'Cannot insert into a GridIndex created from an ArrayBuffer.';
    }),
    (Ya.prototype._insertCell = function (t, e, r, n, i, a) {
      this.cells[i].push(a);
    }),
    (Ya.prototype.query = function (t, e, r, n, i) {
      var a = this.min,
        o = this.max;
      if (t <= a && e <= a && o <= r && o <= n && !i)
        return Array.prototype.slice.call(this.keys);
      var s = [];
      return this._forEachCell(t, e, r, n, this._queryCell, s, {}, i), s;
    }),
    (Ya.prototype._queryCell = function (t, e, r, n, i, a, o, s) {
      var u = this.cells[i];
      if (null !== u)
        for (var l = this.keys, p = this.bboxes, c = 0; c < u.length; c++) {
          var f = u[c];
          if (void 0 === o[f]) {
            var h = 4 * f;
            (
              s
                ? s(p[h + 0], p[h + 1], p[h + 2], p[h + 3])
                : t <= p[h + 2] &&
                  e <= p[h + 3] &&
                  r >= p[h + 0] &&
                  n >= p[h + 1]
            )
              ? ((o[f] = !0), a.push(l[f]))
              : (o[f] = !1);
          }
        }
    }),
    (Ya.prototype._forEachCell = function (t, e, r, n, i, a, o, s) {
      for (
        var u = this._convertToCellCoord(t),
          l = this._convertToCellCoord(e),
          p = this._convertToCellCoord(r),
          c = this._convertToCellCoord(n),
          f = u;
        f <= p;
        f++
      )
        for (var h = l; h <= c; h++) {
          var d = this.d * h + f;
          if (
            (!s ||
              s(
                this._convertFromCellCoord(f),
                this._convertFromCellCoord(h),
                this._convertFromCellCoord(f + 1),
                this._convertFromCellCoord(h + 1),
              )) &&
            i.call(this, t, e, r, n, d, a, o, s)
          )
            return;
        }
    }),
    (Ya.prototype._convertFromCellCoord = function (t) {
      return (t - this.padding) / this.scale;
    }),
    (Ya.prototype._convertToCellCoord = function (t) {
      return Math.max(
        0,
        Math.min(this.d - 1, Math.floor(t * this.scale) + this.padding),
      );
    }),
    (Ya.prototype.toArrayBuffer = function () {
      if (this.arrayBuffer) return this.arrayBuffer;
      for (
        var t = this.cells, e = Ha + this.cells.length + 1 + 1, r = 0, n = 0;
        n < this.cells.length;
        n++
      )
        r += this.cells[n].length;
      var i = new Int32Array(e + r + this.keys.length + this.bboxes.length);
      (i[0] = this.extent), (i[1] = this.n), (i[2] = this.padding);
      for (var a = e, o = 0; o < t.length; o++) {
        var s = t[o];
        (i[Ha + o] = a), i.set(s, a), (a += s.length);
      }
      return (
        (i[Ha + t.length] = a),
        i.set(this.keys, a),
        (a += this.keys.length),
        (i[Ha + t.length + 1] = a),
        i.set(this.bboxes, a),
        (a += this.bboxes.length),
        i.buffer
      );
    }),
    ke.register('GridIndex', Ya, { omit: ['layers', 'patternFeatures'] }),
    (Qa.easeCubicInOut = function (t) {
      if (t <= 0) return 0;
      if (t >= 1) return 1;
      var e = t * t,
        r = e * t;
      return 4 * (t < 0.5 ? r : 3 * (t - e) + r - 0.75);
    }),
    (Qa.asyncAll = function (t, e, r) {
      if (!t.length) return r(null, []);
      var n = t.length,
        i = new Array(t.length),
        a = null;
      t.forEach(function (t, o) {
        e(t, function (t, e) {
          t && (a = t), (i[o] = e), 0 == --n && r(a, i);
        });
      });
    }),
    (Qa.extend = function (t) {
      for (var e = [], r = arguments.length - 1; r-- > 0; )
        e[r] = arguments[r + 1];
      for (var n = 0, i = e; n < i.length; n += 1) {
        var a = i[n];
        for (var o in a) t[o] = a[o];
      }
      return t;
    });
  var Ka = 1;
  (Qa.uniqueId = function () {
    return Ka++;
  }),
    (Qa.uuid = function () {
      return (function t(e) {
        return e
          ? (e ^ ((16 * Math.random()) >> (e / 4))).toString(16)
          : ([1e7] + -[1e3] + -4e3 + -8e3 + -1e11).replace(/[018]/g, t);
      })();
    }),
    (Qa.validateUuid = function (t) {
      return (
        !!t &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          t,
        )
      );
    }),
    (Qa.bindAll = function (t, e) {
      t.forEach(function (t) {
        e[t] && (e[t] = e[t].bind(e));
      });
    }),
    (Qa.endsWith = function (t, e) {
      return -1 !== t.indexOf(e, t.length - e.length);
    }),
    (Qa.mapObject = function (t, e, r) {
      var n = {};
      for (var i in t) n[i] = e.call(r || this, t[i], i, t);
      return n;
    }),
    (Qa.filterObject = function (t, e, r) {
      var n = {};
      for (var i in t) e.call(r || this, t[i], i, t) && (n[i] = t[i]);
      return n;
    }),
    (Qa.clone = function (t) {
      return Array.isArray(t)
        ? t.map(Qa.clone)
        : 'object' == typeof t && t
        ? Qa.mapObject(t, Qa.clone)
        : t;
    }),
    (Qa.deepEqual = function (t, e) {
      if (Array.isArray(t)) {
        if (!Array.isArray(e) || t.length !== e.length) return !1;
        for (var r = 0; r < t.length; r++)
          if (!Qa.deepEqual(t[r], e[r])) return !1;
        return !0;
      }
      if ('object' == typeof t && null !== t && null !== e) {
        if ('object' != typeof e) return !1;
        if (Object.keys(t).length !== Object.keys(e).length) return !1;
        for (var n in t) if (!Qa.deepEqual(t[n], e[n])) return !1;
        return !0;
      }
      return t === e;
    }),
    (Qa.arraysIntersect = function (t, e) {
      for (var r = 0; r < t.length; r++) if (e.indexOf(t[r]) >= 0) return !0;
      return !1;
    }),
    (Qa.isCounterClockwise = function (t, e, r) {
      return (r.y - t.y) * (e.x - t.x) > (e.y - t.y) * (r.x - t.x);
    }),
    (Qa.isWorker = function () {
      return (
        'undefined' != typeof WorkerGlobalScope &&
        'undefined' != typeof self &&
        self instanceof WorkerGlobalScope
      );
    });
  var Ga = null;
  (Qa.isSafari = function (t) {
    if (null == Ga) {
      var e = t.navigator ? t.navigator.userAgent : null;
      Ga =
        !!t.safari ||
        !(
          !e ||
          !(
            /\b(iPad|iPhone|iPod)\b/.test(e) ||
            (e.match('Safari') && !e.match('Chrome'))
          )
        );
    }
    return Ga;
  }),
    (Qa.resolveTokens = function (t, e) {
      return e.replace(/{([^{}]+)}/g, function (e, r) {
        return r in t ? String(t[r]) : '';
      });
    });
  var Wa = function (t, e) {
    void 0 === e && (e = []), (this.parent = t), (this.bindings = {});
    for (var r = 0, n = e; r < n.length; r += 1) {
      var i = n[r],
        a = i[0],
        o = i[1];
      this.bindings[a] = o;
    }
  };
  (Wa.prototype.concat = function (t) {
    return new Wa(this, t);
  }),
    (Wa.prototype.get = function (t) {
      if (this.bindings[t]) return this.bindings[t];
      if (this.parent) return this.parent.get(t);
      throw new Error(t + ' not found in scope.');
    }),
    (Wa.prototype.has = function (t) {
      return !!this.bindings[t] || (!!this.parent && this.parent.has(t));
    });
  var Ja = (function (t) {
      function e(e, r) {
        t.call(this, r), (this.message = r), (this.key = e);
      }
      return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    })(Error),
    Za = ['Unknown', 'Point', 'LineString', 'Polygon'],
    $a = function () {
      (this.globals = null),
        (this.feature = null),
        (this.featureState = null),
        (this.formattedSection = null),
        (this._parseColorCache = {}),
        (this.availableImages = null);
    };
  function to() {}
  ($a.prototype.id = function () {
    return this.feature && 'id' in this.feature ? this.feature.id : null;
  }),
    ($a.prototype.geometryType = function () {
      return this.feature
        ? 'number' == typeof this.feature.type
          ? Za[this.feature.type]
          : this.feature.type
        : null;
    }),
    ($a.prototype.properties = function () {
      return (this.feature && this.feature.properties) || {};
    }),
    ($a.prototype.parseColor = function (t) {
      var e = this._parseColorCache[t];
      return e || (e = this._parseColorCache[t] = Color.parse(t)), e;
    }),
    ke.register('EvaluationContext', $a),
    (to.isFeatureConstant = function (t) {
      if (t instanceof eo.CompoundExpression) {
        if ('get' === t.name && 1 === t.args.length) return !1;
        if ('feature-state' === t.name) return !1;
        if ('has' === t.name && 1 === t.args.length) return !1;
        if (
          'properties' === t.name ||
          'geometry-type' === t.name ||
          'id' === t.name
        )
          return !1;
        if (/^filter-/.test(t.name)) return !1;
      }
      var e = !0;
      return (
        t.eachChild(function (t) {
          e && !to.isFeatureConstant(t) && (e = !1);
        }),
        e
      );
    }),
    (to.isStateConstant = function (t) {
      if (t instanceof eo.CompoundExpression && 'feature-state' === t.name)
        return !1;
      var e = !0;
      return (
        t.eachChild(function (t) {
          e && !to.isStateConstant(t) && (e = !1);
        }),
        e
      );
    }),
    (to.isGlobalPropertyConstant = function (t, e) {
      if (t instanceof eo.CompoundExpression && e.indexOf(t.name) >= 0)
        return !1;
      var r = !0;
      return (
        t.eachChild(function (t) {
          r && !to.isGlobalPropertyConstant(t, e) && (r = !1);
        }),
        r
      );
    });
  var eo = function (t, e, r, n, i) {
    void 0 === e && (e = []),
      void 0 === n && (n = new Wa()),
      void 0 === i && (i = []),
      (this.registry = t),
      (this.path = e),
      (this.key = e
        .map(function (t) {
          return '[' + t + ']';
        })
        .join('')),
      (this.scope = n),
      (this.errors = i),
      (this.expectedType = r);
  };
  function ro(t, e) {
    const r = e[t];
    return void 0 === r ? null : r;
  }
  (eo.prototype.parse = function (t, e, r, n, i) {
    return (
      void 0 === i && (i = {}),
      e ? this.concat(e, r, n)._parse(t, i) : this._parse(t, i)
    );
  }),
    (eo.prototype._parse = function (t, e) {
      function r(t, e, r) {
        return 'assert' === r
          ? new lt(e, [t])
          : 'coerce' === r
          ? new Tt(e, [t])
          : t;
      }
      if (
        ((null !== t &&
          'string' != typeof t &&
          'boolean' != typeof t &&
          'number' != typeof t) ||
          (t = ['literal', t]),
        Array.isArray(t))
      ) {
        if (0 === t.length)
          return this.error(
            'Expected an array with at least one element. If you wanted a literal array, use ["literal", []].',
          );
        var n = t[0];
        if ('string' != typeof n)
          return (
            this.error(
              'Expression name must be a string, but found ' +
                typeof n +
                ' instead. If you wanted a literal array, use ["literal", [...]].',
              0,
            ),
            null
          );
        var i = this.registry[n];
        if (i) {
          var a = i.parse(t, this);
          if (!a) return null;
          if (this.expectedType) {
            var o = this.expectedType,
              s = a.type;
            if (
              ('string' !== o.kind &&
                'number' !== o.kind &&
                'boolean' !== o.kind &&
                'object' !== o.kind &&
                'array' !== o.kind) ||
              'value' !== s.kind
            )
              if (
                ('color' !== o.kind &&
                  'formatted' !== o.kind &&
                  'resolvedImage' !== o.kind) ||
                ('value' !== s.kind && 'string' !== s.kind)
              ) {
                if (this.checkSubtype(o, s)) return null;
              } else a = r(a, o, e.typeAnnotation || 'coerce');
            else a = r(a, o, e.typeAnnotation || 'assert');
          }
          return !(a instanceof ve) && a.type.kind, a;
        }
        return this.error(
          'Unknown expression "' +
            n +
            '". If you wanted a literal array, use ["literal", [...]].',
          0,
        );
      }
      return void 0 === t
        ? this.error("'undefined' value invalid. Use null instead.")
        : 'object' == typeof t
        ? this.error('Bare objects invalid. Use ["literal", {...}] instead.')
        : this.error('Expected an array, but found ' + typeof t + ' instead.');
    }),
    (eo.prototype.concat = function (t, e, r) {
      var n = 'number' == typeof t ? this.path.concat(t) : this.path,
        i = r ? this.scope.concat(r) : this.scope;
      return new eo(this.registry, n, e || null, i, this.errors);
    }),
    (eo.prototype.error = function (t) {
      for (var e = [], r = arguments.length - 1; r-- > 0; )
        e[r] = arguments[r + 1];
      var n =
        '' +
        this.key +
        e
          .map(function (t) {
            return '[' + t + ']';
          })
          .join('');
      this.errors.push(new Ja(n, t));
    }),
    (eo.prototype.checkSubtype = function (t, e) {
      var r = V(t, e);
      return r && this.error(r), r;
    });
  var no = function (t, e, r, n) {
    (this.name = t), (this.type = e), (this._evaluate = r), (this.args = n);
  };
  function io(t) {
    return Array.isArray(t)
      ? '(' + t.map(toString).join(', ') + ')'
      : '(' + toString(t.type) + '...)';
  }
  (no.prototype.evaluate = function (t, e) {
    return this._evaluate(t, this.args, e);
  }),
    (no.prototype.eachChild = function (t) {
      this.args.forEach(t);
    }),
    (no.prototype.possibleOutputs = function () {
      return [void 0];
    }),
    (no.prototype.serialize = function () {
      return [this.name].concat(
        this.args.map(function (t) {
          return t.serialize();
        }),
      );
    }),
    (no.parse = function (t, e) {
      var r,
        n = t[0],
        i = no.definitions[n];
      if (!i)
        return e.error(
          'Unknown expression "' +
            n +
            '". If you wanted a literal array, use ["literal", [...]].',
          0,
        );
      for (
        var a = Array.isArray(i) ? i[0] : i.type,
          o = Array.isArray(i) ? [[i[1], i[2]]] : i.overloads,
          s = o.filter(function (e) {
            var r = e[0];
            return !Array.isArray(r) || r.length === t.length - 1;
          }),
          u = null,
          l = 0,
          p = s;
        l < p.length;
        l += 1
      ) {
        var c = p[l],
          f = c[0],
          h = c[1];
        u = new eo(e.registry, e.path, null, e.scope);
        for (var d = [], y = !1, m = 1; m < t.length; m++) {
          var v = t[m],
            g = Array.isArray(f) ? f[m - 1] : f.type,
            x = u.parse(v, 1 + d.length, g);
          if (!x) {
            y = !0;
            break;
          }
          d.push(x);
        }
        if (!y)
          if (Array.isArray(f) && f.length !== d.length)
            u.error(
              'Expected ' +
                f.length +
                ' arguments, but found ' +
                d.length +
                ' instead.',
            );
          else {
            for (var b = 0; b < d.length; b++) {
              var _ = Array.isArray(f) ? f[b] : f.type,
                w = d[b];
              u.concat(b + 1).checkSubtype(_, w.type);
            }
            if (0 === u.errors.length) return new no(n, a, h, d);
          }
      }
      if (1 === s.length) (r = e.errors).push.apply(r, u.errors);
      else {
        for (
          var E = (s.length ? s : o)
              .map(function (t) {
                return io(t[0]);
              })
              .join(' | '),
            T = [],
            A = 1;
          A < t.length;
          A++
        ) {
          var S = e.parse(t[A], 1 + T.length);
          if (!S) return null;
          T.push(toString(S.type));
        }
        e.error(
          'Expected arguments of type ' +
            E +
            ', but found (' +
            T.join(', ') +
            ') instead.',
        );
      }
      return null;
    }),
    (no.register = function (t, e) {
      for (var r in ((no.definitions = e), e)) t[r] = no;
    }),
    ke.register('CompoundExpression', no);
  var ao = { kind: 'number' },
    oo = { kind: 'string' },
    so = { kind: 'boolean' },
    uo = { kind: 'color' },
    lo = { kind: 'object' },
    po = { kind: 'value' },
    co = { kind: 'error' },
    fo = { kind: 'collator' };
  function ho(t, e) {
    return { kind: 'array', itemType: t, N: e };
  }
  function yo(t) {
    return { type: t };
  }
  function mo(t, e) {
    var r = e[0],
      n = e[1],
      i = e[2],
      a = e[3];
    (r = r.evaluate(t)), (n = n.evaluate(t)), (i = i.evaluate(t));
    var o = a ? a.evaluate(t) : 1,
      s = Values.validateRGBA(r, n, i, o);
    if (s) throw new RuntimeError(s);
    return new Color((r / 255) * o, (n / 255) * o, (i / 255) * o, o);
  }
  no.register(Ie, {
    error: [
      co,
      [oo],
      function (t, e) {
        var r = e[0];
        throw new RuntimeError(r.evaluate(t));
      },
    ],
    typeof: [
      oo,
      [po],
      function (t, e) {
        var r = e[0];
        return toString(Values.typeOf(r.evaluate(t)));
      },
    ],
    'to-rgba': [
      ho(ao, 4),
      [uo],
      function (t, e) {
        return e[0].evaluate(t).toArray();
      },
    ],
    rgb: [uo, [ao, ao, ao], mo],
    rgba: [uo, [ao, ao, ao, ao], mo],
    has: {
      type: so,
      overloads: [
        [
          [oo],
          function (t, e) {
            var r = e[0];
            return has(r.evaluate(t), t.properties());
          },
        ],
        [
          [oo, lo],
          function (t, e) {
            var r = e[0],
              n = e[1];
            return has(r.evaluate(t), n.evaluate(t));
          },
        ],
      ],
    },
    get: {
      type: po,
      overloads: [
        [
          [oo],
          function (t, e) {
            return ro(e[0].evaluate(t), t.properties());
          },
        ],
        [
          [oo, lo],
          function (t, e) {
            var r = e[0],
              n = e[1];
            return ro(r.evaluate(t), n.evaluate(t));
          },
        ],
      ],
    },
    'feature-state': [
      po,
      [oo],
      function (t, e) {
        return ro(e[0].evaluate(t), t.featureState || {});
      },
    ],
    properties: [
      lo,
      [],
      function (t) {
        return t.properties();
      },
    ],
    'geometry-type': [
      oo,
      [],
      function (t) {
        return t.geometryType();
      },
    ],
    id: [
      po,
      [],
      function (t) {
        return t.id();
      },
    ],
    zoom: [
      ao,
      [],
      function (t) {
        return t.globals.zoom;
      },
    ],
    'heatmap-density': [
      ao,
      [],
      function (t) {
        return t.globals.heatmapDensity || 0;
      },
    ],
    'line-progress': [
      ao,
      [],
      function (t) {
        return t.globals.lineProgress || 0;
      },
    ],
    accumulated: [
      po,
      [],
      function (t) {
        return void 0 === t.globals.accumulated ? null : t.globals.accumulated;
      },
    ],
    '+': [
      ao,
      yo(ao),
      function (t, e) {
        for (var r = 0, n = 0, i = e; n < i.length; n += 1) {
          r += i[n].evaluate(t);
        }
        return r;
      },
    ],
    '*': [
      ao,
      yo(ao),
      function (t, e) {
        for (var r = 1, n = 0, i = e; n < i.length; n += 1) {
          r *= i[n].evaluate(t);
        }
        return r;
      },
    ],
    '-': {
      type: ao,
      overloads: [
        [
          [ao, ao],
          function (t, e) {
            var r = e[0],
              n = e[1];
            return r.evaluate(t) - n.evaluate(t);
          },
        ],
        [
          [ao],
          function (t, e) {
            return -e[0].evaluate(t);
          },
        ],
      ],
    },
    '/': [
      ao,
      [ao, ao],
      function (t, e) {
        var r = e[0],
          n = e[1];
        return r.evaluate(t) / n.evaluate(t);
      },
    ],
    '%': [
      ao,
      [ao, ao],
      function (t, e) {
        var r = e[0],
          n = e[1];
        return r.evaluate(t) % n.evaluate(t);
      },
    ],
    ln2: [
      ao,
      [],
      function () {
        return Math.LN2;
      },
    ],
    pi: [
      ao,
      [],
      function () {
        return Math.PI;
      },
    ],
    e: [
      ao,
      [],
      function () {
        return Math.E;
      },
    ],
    '^': [
      ao,
      [ao, ao],
      function (t, e) {
        var r = e[0],
          n = e[1];
        return Math.pow(r.evaluate(t), n.evaluate(t));
      },
    ],
    sqrt: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0];
        return Math.sqrt(r.evaluate(t));
      },
    ],
    log10: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0];
        return Math.log(r.evaluate(t)) / Math.LN10;
      },
    ],
    ln: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0];
        return Math.log(r.evaluate(t));
      },
    ],
    log2: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0];
        return Math.log(r.evaluate(t)) / Math.LN2;
      },
    ],
    sin: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0];
        return Math.sin(r.evaluate(t));
      },
    ],
    cos: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0];
        return Math.cos(r.evaluate(t));
      },
    ],
    tan: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0];
        return Math.tan(r.evaluate(t));
      },
    ],
    asin: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0];
        return Math.asin(r.evaluate(t));
      },
    ],
    acos: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0];
        return Math.acos(r.evaluate(t));
      },
    ],
    atan: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0];
        return Math.atan(r.evaluate(t));
      },
    ],
    min: [
      ao,
      yo(ao),
      function (t, e) {
        return Math.min.apply(
          Math,
          e.map(function (e) {
            return e.evaluate(t);
          }),
        );
      },
    ],
    max: [
      ao,
      yo(ao),
      function (t, e) {
        return Math.max.apply(
          Math,
          e.map(function (e) {
            return e.evaluate(t);
          }),
        );
      },
    ],
    abs: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0];
        return Math.abs(r.evaluate(t));
      },
    ],
    round: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0].evaluate(t);
        return r < 0 ? -Math.round(-r) : Math.round(r);
      },
    ],
    floor: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0];
        return Math.floor(r.evaluate(t));
      },
    ],
    ceil: [
      ao,
      [ao],
      function (t, e) {
        var r = e[0];
        return Math.ceil(r.evaluate(t));
      },
    ],
    'filter-==': [
      so,
      [oo, po],
      function (t, e, r) {
        var n = e[0],
          i = e[1];
        if (r) {
          var a,
            o,
            s = n.value,
            u = i.value;
          if (/(\S*)\s*([+-])\s*(\S*)/.test(s)) {
            var l = s.match(/(\S*)\s*([+-])\s*(\S*)/),
              p = t.properties()[l[1]],
              c = l[2],
              f = t.properties()[l[3]];
            switch (c) {
              case '+':
                a = p + f;
                break;
              case '-':
                a = p - f;
            }
            return a === (o = i.value);
          }
          if (/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/.test(s)) {
            var h = s.match(/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/),
              d = h[1],
              y = ((p = t.properties()[h[2]]), h[3]);
            if (
              ((a =
                'left' == d ? p.substring(0, y) : p.substring(p.length - y)),
              /^(left|right)\s*\((.+)\s*,\s*(\d+)\)/.test(u))
            ) {
              var m = u.match(/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/),
                v = m[1],
                g = ((f = t.properties()[m[2]]), m[3]);
              o = 'left' == v ? f.substring(0, g) : f.substring(f.length - g);
            } else o = i.value;
            return a === o;
          }
          return t.properties()[n.value] === t.properties()[i.value];
        }
        return t.properties()[n.value] === i.value;
      },
    ],
    'filter-id-==': [
      so,
      [po],
      function (t, e) {
        var r = e[0];
        return t.id() === r.value;
      },
    ],
    'filter-like': [
      so,
      [oo, oo],
      function (t, e) {
        var r = e[0].value,
          n = e[1].value,
          i = t.properties();
        return (
          r in i &&
          (/^%.*[^%]$/.test(n)
            ? ((n = n.replace('%', '')), i[r].endsWith(n))
            : /^(?!%).+%$/.test(n)
            ? ((n = n.replace('%', '')), i[r].startsWith(n))
            : ((n = n.replace(/%/g, '')), i[r].indexOf(n) > -1))
        );
      },
    ],
    'filter-type-==': [
      so,
      [oo],
      function (t, e) {
        var r = e[0];
        return t.geometryType() === r.value;
      },
    ],
    'filter-<': [
      so,
      [oo, po],
      function (t, e, r) {
        var n,
          i,
          a = e[0],
          o = e[1],
          s = a.value,
          u = o.value;
        if (/(\S*)\s*([+-])\s*(\S*)/.test(s)) {
          var l = s.match(/(\S*)\s*([+-])\s*(\S*)/),
            p = t.properties()[l[1]],
            c = l[2],
            f = t.properties()[l[3]];
          switch (c) {
            case '+':
              n = p + f;
              break;
            case '-':
              n = p - f;
          }
          i = o.value;
        } else if (/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/.test(s)) {
          var h = s.match(/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/),
            d = h[1],
            y = ((p = t.properties()[h[2]]), h[3]);
          if (
            ((n = 'left' == d ? p.substring(0, y) : p.substring(p.length - y)),
            /^(left|right)\s*\((.+)\s*,\s*(\d+)\)/.test(u))
          ) {
            var m = u.match(/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/),
              v = m[1],
              g = ((f = t.properties()[m[2]]), m[3]);
            i = 'left' == v ? f.substring(0, g) : f.substring(f.length - g);
          } else i = o.value;
        } else
          (n = t.properties()[a.value]),
            (i = o.value),
            r && (i = t.properties()[i]);
        return (
          'number' != typeof i || isNaN(Number(n)) || (n = Number(n)),
          typeof n == typeof i && n < i
        );
      },
    ],
    'filter-id-<': [
      so,
      [po],
      function (t, e) {
        var r = e[0],
          n = t.id(),
          i = r.value;
        return typeof n == typeof i && n < i;
      },
    ],
    'filter->': [
      so,
      [oo, po],
      function (t, e, r) {
        var n,
          i,
          a = e[0],
          o = e[1],
          s = a.value,
          u = o.value;
        if (/(\S*)\s*([+-])\s*(\S*)/.test(s)) {
          var l = s.match(/(\S*)\s*([+-])\s*(\S*)/),
            p = t.properties()[l[1]],
            c = l[2],
            f = t.properties()[l[3]];
          switch (c) {
            case '+':
              n = p + f;
              break;
            case '-':
              n = p - f;
          }
          i = o.value;
        } else if (/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/.test(s)) {
          var h = s.match(/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/),
            d = h[1],
            y = ((p = t.properties()[h[2]]), h[3]);
          if (
            ((n = 'left' == d ? p.substring(0, y) : p.substring(p.length - y)),
            /^(left|right)\s*\((.+)\s*,\s*(\d+)\)/.test(u))
          ) {
            var m = u.match(/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/),
              v = m[1],
              g = ((f = t.properties()[m[2]]), m[3]);
            i = 'left' == v ? f.substring(0, g) : f.substring(f.length - g);
          } else i = o.value;
        } else
          (n = t.properties()[a.value]),
            (i = o.value),
            r && (i = t.properties()[i]);
        return (
          'number' != typeof i || isNaN(Number(n)) || (n = Number(n)),
          typeof n == typeof i && n > i
        );
      },
    ],
    'filter-id->': [
      so,
      [po],
      function (t, e) {
        var r = e[0],
          n = t.id(),
          i = r.value;
        return typeof n == typeof i && n > i;
      },
    ],
    'filter-<=': [
      so,
      [oo, po],
      function (t, e, r) {
        var n,
          i,
          a = e[0],
          o = e[1],
          s = a.value,
          u = o.value;
        if (/(\S*)\s*([+-])\s*(\S*)/.test(s)) {
          var l = s.match(/(\S*)\s*([+-])\s*(\S*)/),
            p = t.properties()[l[1]],
            c = l[2],
            f = t.properties()[l[3]];
          switch (c) {
            case '+':
              n = p + f;
              break;
            case '-':
              n = p - f;
          }
          i = o.value;
        } else if (/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/.test(s)) {
          var h = s.match(/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/),
            d = h[1],
            y = ((p = t.properties()[h[2]]), h[3]);
          if (
            ((n = 'left' == d ? p.substring(0, y) : p.substring(p.length - y)),
            /^(left|right)\s*\((.+)\s*,\s*(\d+)\)/.test(u))
          ) {
            var m = u.match(/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/),
              v = m[1],
              g = ((f = t.properties()[m[2]]), m[3]);
            i = 'left' == v ? f.substring(0, g) : f.substring(f.length - g);
          } else i = o.value;
        } else
          (n = t.properties()[a.value]),
            (i = o.value),
            r && (i = t.properties()[i]);
        return (
          'number' != typeof i || isNaN(Number(n)) || (n = Number(n)),
          typeof n == typeof i && n <= i
        );
      },
    ],
    'filter-id-<=': [
      so,
      [po],
      function (t, e) {
        var r = e[0],
          n = t.id(),
          i = r.value;
        return typeof n == typeof i && n <= i;
      },
    ],
    'filter->=': [
      so,
      [oo, po],
      function (t, e, r) {
        var n,
          i,
          a = e[0],
          o = e[1],
          s = a.value,
          u = o.value;
        if (/(\S*)\s*([+-])\s*(\S*)/.test(s)) {
          var l = s.match(/(\S*)\s*([+-])\s*(\S*)/),
            p = t.properties()[l[1]],
            c = l[2],
            f = t.properties()[l[3]];
          switch (c) {
            case '+':
              n = p + f;
              break;
            case '-':
              n = p - f;
          }
          i = o.value;
        } else if (/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/.test(s)) {
          var h = s.match(/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/),
            d = h[1],
            y = ((p = t.properties()[h[2]]), h[3]);
          if (
            ((n = 'left' == d ? p.substring(0, y) : p.substring(p.length - y)),
            /^(left|right)\s*\((.+)\s*,\s*(\d+)\)/.test(u))
          ) {
            var m = u.match(/^(left|right)\s*\((.+)\s*,\s*(\d+)\)/),
              v = m[1],
              g = ((f = t.properties()[m[2]]), m[3]);
            i = 'left' == v ? f.substring(0, g) : f.substring(f.length - g);
          } else i = o.value;
        } else
          (n = t.properties()[a.value]),
            (i = o.value),
            r && (i = t.properties()[i]);
        return (
          'number' != typeof i || isNaN(Number(n)) || (n = Number(n)),
          typeof n == typeof i && n >= i
        );
      },
    ],
    'filter-id->=': [
      so,
      [po],
      function (t, e) {
        var r = e[0],
          n = t.id(),
          i = r.value;
        return typeof n == typeof i && n >= i;
      },
    ],
    'filter-has': [
      so,
      [po],
      function (t, e) {
        return e[0].value in t.properties();
      },
    ],
    'filter-has-id': [
      so,
      [],
      function (t) {
        return null !== t.id();
      },
    ],
    'filter-type-in': [
      so,
      [ho(oo)],
      function (t, e) {
        return e[0].value.indexOf(t.geometryType()) >= 0;
      },
    ],
    'filter-id-in': [
      so,
      [ho(po)],
      function (t, e) {
        return e[0].value.indexOf(t.id()) >= 0;
      },
    ],
    'filter-in-small': [
      so,
      [oo, ho(po)],
      function (t, e) {
        var r = e[0];
        return e[1].value.indexOf(t.properties()[r.value]) >= 0;
      },
    ],
    'filter-in-large': [
      so,
      [oo, ho(po)],
      function (t, e) {
        var r = e[0],
          n = e[1];
        return binarySearch(
          t.properties()[r.value],
          n.value,
          0,
          n.value.length - 1,
        );
      },
    ],
    all: {
      type: so,
      overloads: [
        [
          [so, so],
          function (t, e) {
            var r = e[0],
              n = e[1];
            return r.evaluate(t) && n.evaluate(t);
          },
        ],
        [
          yo(so),
          function (t, e) {
            for (var r = 0, n = e; r < n.length; r += 1) {
              if (!n[r].evaluate(t)) return !1;
            }
            return !0;
          },
        ],
      ],
    },
    crossFields: {
      type: so,
      overloads: [
        [
          [so, so],
          function (t, e) {
            var r = e[0],
              n = e[1];
            return r.evaluate(t, !0) && n.evaluate(t, !0);
          },
        ],
        [
          yo(so),
          function (t, e) {
            for (var r = 0, n = e; r < n.length; r += 1) {
              if (!n[r].evaluate(t, !0)) return !1;
            }
            return !0;
          },
        ],
      ],
    },
    any: {
      type: so,
      overloads: [
        [
          [so, so],
          function (t, e) {
            var r = e[0],
              n = e[1];
            return r.evaluate(t) || n.evaluate(t);
          },
        ],
        [
          yo(so),
          function (t, e) {
            for (var r = 0, n = e; r < n.length; r += 1) {
              if (n[r].evaluate(t)) return !0;
            }
            return !1;
          },
        ],
      ],
    },
    '!': [
      so,
      [so],
      function (t, e, r) {
        return !e[0].evaluate(t, r);
      },
    ],
    'is-supported-script': [
      so,
      [oo],
      function (t, e) {
        var r = e[0],
          n = t.globals && t.globals.isSupportedScript;
        return !n || n(r.evaluate(t));
      },
    ],
    upcase: [
      oo,
      [oo],
      function (t, e) {
        return e[0].evaluate(t).toUpperCase();
      },
    ],
    downcase: [
      oo,
      [oo],
      function (t, e) {
        return e[0].evaluate(t).toLowerCase();
      },
    ],
    concat: [
      oo,
      yo(po),
      function (t, e) {
        return e
          .map(function (e) {
            return Values.toString$1(e.evaluate(t));
          })
          .join('');
      },
    ],
    'resolved-locale': [
      oo,
      [fo],
      function (t, e) {
        return e[0].evaluate(t).resolvedLocale();
      },
    ],
  }),
    (eo.CompoundExpression = no);
  var vo = function (t, e) {
    (this.expression = t),
      (this._warningHistory = {}),
      (this._evaluator = new $a()),
      (this._defaultValue = e ? xo(e) : null),
      (this._enumValues = e && 'enum' === e.type ? e.values : null);
  };
  function go(t) {
    return 'object' == typeof t && null !== t && !Array.isArray(t);
  }
  function xo(t) {
    return 'color' === t.type && go(t.default)
      ? new Color(0, 0, 0, 0)
      : 'color' === t.type
      ? Color.parse(t.default) || null
      : void 0 === t.default
      ? null
      : t.default;
  }
  (vo.prototype.evaluateWithoutErrorHandling = function (t, e, r, n, i) {
    return (
      (this._evaluator.globals = t),
      (this._evaluator.feature = e),
      (this._evaluator.featureState = r),
      (this._evaluator.availableImages = n || null),
      (this._evaluator.formattedSection = i),
      this.expression.evaluate(this._evaluator)
    );
  }),
    (vo.prototype.evaluate = function (t, e, r, n, i) {
      (this._evaluator.globals = t),
        (this._evaluator.feature = e || null),
        (this._evaluator.featureState = r || null),
        (this._evaluator.availableImages = n || null),
        (this._evaluator.formattedSection = i || null);
      try {
        var a = this.expression.evaluate(this._evaluator);
        if (null == a || ('number' == typeof a && a != a))
          return this._defaultValue;
        if (this._enumValues && !(a in this._enumValues))
          throw new RuntimeError(
            'Expected value to be one of ' +
              Object.keys(this._enumValues)
                .map(function (t) {
                  return JSON.stringify(t);
                })
                .join(', ') +
              ', but found ' +
              JSON.stringify(a) +
              ' instead.',
          );
        return a;
      } catch (t) {
        return (
          this._warningHistory[t.message] ||
            ((this._warningHistory[t.message] = !0),
            'undefined' != typeof console && console.warn(t.message)),
          this._defaultValue
        );
      }
    }),
    ke.register('StyleExpression', vo);
  var bo = 0.95047,
    _o = 1,
    wo = 1.08883,
    Eo = 4 / 29,
    To = 6 / 29,
    Ao = 3 * To * To,
    So = To * To * To,
    Io = Math.PI / 180,
    ko = 180 / Math.PI;
  function Mo(t) {
    return t > So ? Math.pow(t, 1 / 3) : t / Ao + Eo;
  }
  function Oo(t) {
    return t > To ? t * t * t : Ao * (t - Eo);
  }
  function Po(t) {
    return (
      255 * (t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055)
    );
  }
  function zo(t) {
    return (t /= 255) <= 0.04045
      ? t / 12.92
      : Math.pow((t + 0.055) / 1.055, 2.4);
  }
  function Ro(t) {
    var e = zo(t.r),
      r = zo(t.g),
      n = zo(t.b),
      i = Mo((0.4124564 * e + 0.3575761 * r + 0.1804375 * n) / bo),
      a = Mo((0.2126729 * e + 0.7151522 * r + 0.072175 * n) / _o);
    return {
      l: 116 * a - 16,
      a: 500 * (i - a),
      b: 200 * (a - Mo((0.0193339 * e + 0.119192 * r + 0.9503041 * n) / wo)),
      alpha: t.a,
    };
  }
  function Fo(t) {
    var e = (t.l + 16) / 116,
      r = isNaN(t.a) ? e : e + t.a / 500,
      n = isNaN(t.b) ? e : e - t.b / 200;
    return (
      (e = _o * Oo(e)),
      (r = bo * Oo(r)),
      (n = wo * Oo(n)),
      new Color(
        Po(3.2404542 * r - 1.5371385 * e - 0.4985314 * n),
        Po(-0.969266 * r + 1.8760108 * e + 0.041556 * n),
        Po(0.0556434 * r - 0.2040259 * e + 1.0572252 * n),
        t.alpha,
      )
    );
  }
  function Co(t, e, r) {
    return {
      l: number(t.l, e.l, r),
      a: number(t.a, e.a, r),
      b: number(t.b, e.b, r),
      alpha: number(t.alpha, e.alpha, r),
    };
  }
  function Do(t) {
    var e = Ro(t),
      r = e.l,
      n = e.a,
      i = e.b,
      a = Math.atan2(i, n) * ko;
    return {
      h: a < 0 ? a + 360 : a,
      c: Math.sqrt(n * n + i * i),
      l: r,
      alpha: t.a,
    };
  }
  function Bo(t) {
    var e = t.h * Io,
      r = t.c;
    return Fo({
      l: t.l,
      a: Math.cos(e) * r,
      b: Math.sin(e) * r,
      alpha: t.alpha,
    });
  }
  function Uo(t, e, r) {
    var n = e - t;
    return t + r * (n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n);
  }
  function Vo(t, e, r) {
    return {
      h: Uo(t.h, e.h, r),
      c: number(t.c, e.c, r),
      l: number(t.l, e.l, r),
      alpha: number(t.alpha, e.alpha, r),
    };
  }
  var No = { forward: Ro, reverse: Fo, interpolate: Co },
    Lo = { forward: Do, reverse: Bo, interpolate: Vo },
    Xo = Object.freeze({ __proto__: null, lab: No, hcl: Lo });
  function qo() {}
  function jo(t) {
    return { result: 'success', value: t };
  }
  function Ho(t) {
    return { result: 'error', value: t };
  }
  qo.isExpression = function (t) {
    return (
      Array.isArray(t) && t.length > 0 && 'string' == typeof t[0] && t[0] in Ie
    );
  };
  var Yo = { kind: 'number' },
    Qo = { kind: 'string' },
    Ko = { kind: 'boolean' },
    Go = { kind: 'color' },
    Wo = { kind: 'value' },
    Jo = { kind: 'formatted' },
    Zo = { kind: 'resolvedImage' };
  function $o(t, e) {
    return { kind: 'array', itemType: t, N: e };
  }
  function ts(t) {
    var e = null;
    if (t instanceof de) e = ts(t.result);
    else if (t instanceof vt) {
      for (var r of t.args) if ((e = ts(r))) break;
    } else
      (t instanceof Ae || t instanceof ie) &&
        t.input instanceof eo.CompoundExpression &&
        'zoom' === t.input.name &&
        (e = t);
    return (
      e instanceof Ja ||
        t.eachChild((t) => {
          var r = ts(t);
          r instanceof Ja
            ? (e = r)
            : !e && r
            ? (e = new Ja(
                '',
                '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.',
              ))
            : e &&
              r &&
              e !== r &&
              (e = new Ja(
                '',
                'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.',
              ));
        }),
      e
    );
  }
  function es(t) {
    var e = {
      color: Go,
      string: Qo,
      number: Yo,
      enum: Qo,
      boolean: Ko,
      formatted: Jo,
      resolvedImage: Zo,
    };
    return 'array' === t.type ? $o(e[t.value] || Wo, t.length) : e[t.type];
  }
  function rs(t) {
    return 'object' == typeof t && null !== t && !Array.isArray(t);
  }
  function ns(t) {
    return t;
  }
  function is(t) {
    for (var e = [], r = arguments.length - 1; r-- > 0; )
      e[r] = arguments[r + 1];
    for (var n = 0, i = e; n < i.length; n += 1) {
      var a = i[n];
      for (var o in a) t[o] = a[o];
    }
    return t;
  }
  function as(t, e, r) {
    var n = void 0 !== t.base ? t.base : 1;
    if ('number' !== ys(r)) return fs(t.default, e.default);
    var i = t.stops.length;
    if (1 === i) return t.stops[0][1];
    if (r <= t.stops[0][0]) return t.stops[0][1];
    if (r >= t.stops[i - 1][0]) return t.stops[i - 1][1];
    var a = Ee(
        t.stops.map((t) => t[0]),
        r,
      ),
      o = hs(r, n, t.stops[a][0], t.stops[a + 1][0]),
      s = t.stops[a][1],
      u = t.stops[a + 1][1],
      l = interpolate[e.type] || ns;
    if (t.colorSpace && 'rgb' !== t.colorSpace) {
      var p = Xo[t.colorSpace];
      l = (t, e) => p.reverse(p.interpolate(p.forward(t), p.forward(e), o));
    }
    return 'function' == typeof s.evaluate
      ? {
          evaluate(...t) {
            var e = s.evaluate.apply(void 0, t),
              r = u.evaluate.apply(void 0, t);
            if (void 0 !== e && void 0 !== r) return l(e, r, o);
          },
        }
      : l(s, u, o);
  }
  function os(t, e, r) {
    return (
      'color' === e.type
        ? (r = S.parse(r))
        : 'formatted' === e.type
        ? (r = Formatted.fromString(r.toString()))
        : 'resolvedImage' === e.type
        ? (r = ResolvedImage.fromString(r.toString()))
        : ys(r) === e.type ||
          ('enum' === e.type && e.values[r]) ||
          (r = void 0),
      fs(r, t.default, e.default)
    );
  }
  function ss(t, e) {
    var r = new eo(Ie, [], e ? es(e) : void 0),
      n = r.parse(
        t,
        void 0,
        void 0,
        void 0,
        e && 'string' === e.type ? { typeAnnotation: 'coerce' } : void 0,
      );
    return n ? jo(new vo(n, e)) : (assert(r.errors.length > 0), Ho(r.errors));
  }
  function us(t, e) {
    (this.kind = t),
      (this._styleExpression = e),
      (this.isStateDependent =
        'constant' !== t && !to.isStateConstant(e.expression));
  }
  function ls(t, e, r, n) {
    (this.kind = t),
      (this.zoomStops = r),
      (this._styleExpression = e),
      (this.isStateDependent =
        'camera' !== t && !to.isStateConstant(e.expression)),
      (this.interpolationType = n);
  }
  function ps(t, e) {
    if ('error' === (t = ss(t, e)).result) return t;
    var r = t.value.expression,
      n = to.isFeatureConstant(r);
    if (!n && !Ge.supportsPropertyExpression(e))
      return Ho([new Ja('', 'data expressions not supported')]);
    var i = to.isGlobalPropertyConstant(r, ['zoom']);
    if (!i && !Ge.supportsZoomExpression(e))
      return Ho([new Ja('', 'zoom expressions not supported')]);
    var a = ts(r);
    if (!a && !i)
      return Ho([
        new Ja(
          '',
          '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.',
        ),
      ]);
    if (a instanceof Ja) return Ho([a]);
    if (a instanceof ie && !Ge.supportsInterpolation(e))
      return Ho([
        new Ja(
          '',
          '"interpolate" expressions cannot be used with this property',
        ),
      ]);
    if (!a) return jo(new us(n ? 'constant' : 'source', t.value));
    var o = a instanceof ie ? a.interpolation : void 0;
    return jo(new ls(n ? 'camera' : 'composite', t.value, a.labels, o));
  }
  function cs(t, e) {
    var r,
      n,
      i,
      a = 'color' === e.type,
      o = t.stops && 'object' == typeof t.stops[0][0],
      s = o || void 0 !== t.property,
      u = o || !s,
      l = t.type || (Ge.supportsInterpolation(e) ? 'exponential' : 'interval');
    if (
      (a &&
        ((t = is({}, t)).stops &&
          (t.stops = t.stops.map(function (t) {
            return [t[0], S.parse(t[1])];
          })),
        t.default
          ? (t.default = S.parse(t.default))
          : (t.default = S.parse(e.default))),
      t.colorSpace && 'rgb' !== t.colorSpace && !Xo[t.colorSpace])
    )
      throw new Error('Unknown color space: ' + t.colorSpace);
    if ('exponential' === l) r = as;
    else if ('interval' === l) r = evaluateIntervalFunction;
    else if ('categorical' === l) {
      (r = evaluateCategoricalFunction), (n = Object.create(null));
      for (var p = 0, c = t.stops; p < c.length; p += 1) {
        var f = c[p];
        n[f[0]] = f[1];
      }
      i = typeof t.stops[0][0];
    } else {
      if ('identity' !== l)
        throw new Error('Unknown function type "' + l + '"');
      r = os;
    }
    if (o) {
      for (var h = {}, d = [], y = 0; y < t.stops.length; y++) {
        var m = t.stops[y],
          v = m[0].zoom;
        void 0 === h[v] &&
          ((h[v] = {
            zoom: v,
            type: t.type,
            property: t.property,
            default: t.default,
            stops: [],
          }),
          d.push(v)),
          h[v].stops.push([m[0].value, m[1]]);
      }
      for (var g = [], x = 0, b = d; x < b.length; x += 1) {
        var _ = b[x];
        g.push([h[_].zoom, cs(h[_], e)]);
      }
      var w = { name: 'linear' };
      return {
        kind: 'composite',
        interpolationType: w,
        interpolationFactor: ie.interpolationFactor.bind(void 0, w),
        zoomStops: g.map(function (t) {
          return t[0];
        }),
        evaluate: function (r, n) {
          var i = r.zoom;
          return as({ stops: g, base: t.base }, e, i).evaluate(i, n);
        },
      };
    }
    if (u) {
      var E =
        'exponential' === l
          ? { name: 'exponential', base: void 0 !== t.base ? t.base : 1 }
          : null;
      return {
        kind: 'camera',
        interpolationType: E,
        interpolationFactor: ie.interpolationFactor.bind(void 0, E),
        zoomStops: t.stops.map(function (t) {
          return t[0];
        }),
        evaluate: function (a) {
          var o = a.zoom;
          return r(t, e, o, n, i);
        },
      };
    }
    return {
      kind: 'source',
      evaluate: function (a, o) {
        var s = o && o.properties ? o.properties[t.property] : void 0;
        return void 0 === s ? fs(t.default, e.default) : r(t, e, s, n, i);
      },
    };
  }
  function fs(t, e, r) {
    return void 0 !== t ? t : void 0 !== e ? e : void 0 !== r ? r : void 0;
  }
  function hs(t, e, r, n) {
    var i = n - r,
      a = t - r;
    return 0 === i
      ? 0
      : 1 === e
      ? a / i
      : (Math.pow(e, a) - 1) / (Math.pow(e, i) - 1);
  }
  (qo.createExpression = function (t, e) {
    var r = new eo(Ie, [], e ? es(e) : void 0),
      n = r.parse(
        t,
        void 0,
        void 0,
        void 0,
        e && 'string' === e.type ? { typeAnnotation: 'coerce' } : void 0,
      );
    return n ? jo(new vo(n, e)) : Ho(r.errors);
  }),
    (us.prototype.evaluateWithoutErrorHandling = function (t, e, r, n, i, a) {
      return this._styleExpression.evaluateWithoutErrorHandling(
        t,
        e,
        r,
        n,
        i,
        a,
      );
    }),
    (us.prototype.evaluate = function (t, e, r, n, i, a) {
      return this._styleExpression.evaluate(t, e, r, n, i, a);
    }),
    ke.register('ZoomConstantExpression', us),
    (ls.prototype.evaluateWithoutErrorHandling = function (t, e, r, n, i, a) {
      return this._styleExpression.evaluateWithoutErrorHandling(
        t,
        e,
        r,
        n,
        i,
        a,
      );
    }),
    (ls.prototype.evaluate = function (t, e, r, n, i, a) {
      return this._styleExpression.evaluate(t, e, r, n, i, a);
    }),
    (ls.prototype.interpolationFactor = function (t, e, r) {
      return this.interpolationType
        ? ie.interpolationFactor(this.interpolationType, t, e, r)
        : 0;
    }),
    ke.register('ZoomDependentExpression', ls);
  var ds = function (t, e) {
    (this._parameters = t),
      (this._specification = e),
      is(this, cs(this._parameters, this._specification));
  };
  function ys(t) {
    return t instanceof Number
      ? 'number'
      : t instanceof String
      ? 'string'
      : t instanceof Boolean
      ? 'boolean'
      : Array.isArray(t)
      ? 'array'
      : null === t
      ? 'null'
      : typeof t;
  }
  function ms() {}
  (ds.deserialize = function (t) {
    return new ds(t._parameters, t._specification);
  }),
    (ds.serialize = function (t) {
      return { _parameters: t._parameters, _specification: t._specification };
    }),
    (qo.normalizePropertyExpression = function (t, e) {
      if (rs(t)) return new ds(t, e);
      if (qo.isExpression(t)) {
        var r = ps(t, e);
        if ('error' === r.result)
          throw new Error(
            r.value
              .map(function (t) {
                return t.key + ': ' + t.message;
              })
              .join(', '),
          );
        return r.value;
      }
      var n = t;
      return (
        'string' == typeof t && 'color' === e.type && (n = S.parse(t)),
        {
          kind: 'constant',
          evaluate: function () {
            return n;
          },
        }
      );
    }),
    (ms.isExpressionFilter = function (t) {
      if (!0 === t || !1 === t) return !0;
      if (!Array.isArray(t) || 0 === t.length) return !1;
      switch (t[0]) {
        case 'has':
          return t.length >= 2 && '$id' !== t[1] && '$type' !== t[1];
        case 'in':
          return t.length >= 3 && Array.isArray(t[2]);
        case '!in':
        case '!has':
        case 'none':
        case 'crossFields':
          return !1;
        case '==':
        case '!=':
        case '>':
        case '>=':
        case '<':
        case '<=':
        case 'like':
        case '!like':
          return 3 !== t.length || Array.isArray(t[1]) || Array.isArray(t[2]);
        case 'any':
        case 'all':
          for (var e = 0, r = t.slice(1); e < r.length; e += 1) {
            var n = r[e];
            if (!ms.isExpressionFilter(n) && 'boolean' != typeof n) return !1;
          }
          return !0;
        default:
          return !0;
      }
    });
  var vs = {
    type: 'boolean',
    default: !1,
    transition: !1,
    'property-type': 'data-driven',
    expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
  };
  function gs(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
  }
  function xs(t) {
    if (!t) return !0;
    var e = t[0];
    return t.length <= 1
      ? 'any' !== e
      : '==' === e
      ? bs(t[1], t[2], '==')
      : '!=' === e
      ? Ts(bs(t[1], t[2], '=='))
      : '<' === e || '>' === e || '<=' === e || '>=' === e
      ? bs(t[1], t[2], e)
      : 'any' === e
      ? _s(t.slice(1))
      : 'all' === e
      ? ['all'].concat(t.slice(1).map(xs))
      : 'crossFields' === e
      ? ['crossFields'].concat(t.slice(1).map(xs))
      : 'none' === e
      ? ['all'].concat(t.slice(1).map(xs).map(Ts))
      : 'in' === e
      ? ws(t[1], t.slice(2))
      : '!in' === e
      ? Ts(ws(t[1], t.slice(2)))
      : 'has' === e
      ? Es(t[1])
      : '!has' === e
      ? Ts(Es(t[1]))
      : 'like' === e
      ? bs(t[1], t[2], 'like')
      : '!like' !== e || Ts(bs(t[1], t[2], 'like'));
  }
  function bs(t, e, r) {
    switch (t) {
      case '$type':
        return ['filter-type-' + r, e];
      case '$id':
        return ['filter-id-' + r, e];
      default:
        return ['filter-' + r, t, e];
    }
  }
  function _s(t) {
    return ['any'].concat(t.map(xs));
  }
  function ws(t, e) {
    if (0 === e.length) return !1;
    switch (t) {
      case '$type':
        return ['filter-type-in', ['literal', e]];
      case '$id':
        return ['filter-id-in', ['literal', e]];
      default:
        return e.length > 200 &&
          !e.some(function (t) {
            return typeof t != typeof e[0];
          })
          ? ['filter-in-large', t, ['literal', e.sort(gs)]]
          : ['filter-in-small', t, ['literal', e]];
    }
  }
  function Es(t) {
    switch (t) {
      case '$type':
        return !0;
      case '$id':
        return ['filter-has-id'];
      default:
        return ['filter-has', t];
    }
  }
  function Ts(t) {
    return ['!', t];
  }
  ms.createFilter = function (t) {
    if (null == t)
      return function () {
        return !0;
      };
    ms.isExpressionFilter(t) || (t = xs(t));
    var e = qo.createExpression(t, vs);
    if ('error' === e.result)
      throw new Error(
        e.value
          .map(function (t) {
            return t.key + ': ' + t.message;
          })
          .join(', '),
      );
    return function (t, r) {
      return e.value.evaluate(t, r);
    };
  };
  var As = Ra.FeatureIndexArray,
    Ss = function (t, e, r) {
      (this.x = t.x),
        (this.y = t.y),
        (this.z = t.z),
        (this.grid = e || new Ya(Fe, 16, 0)),
        (this.featureIndexArray = r || new As());
    };
  function Is(t) {
    for (
      var e = 1 / 0, r = 1 / 0, n = -1 / 0, i = -1 / 0, a = 0, o = t;
      a < o.length;
      a += 1
    ) {
      var s = o[a];
      (e = Math.min(e, s.x)),
        (r = Math.min(r, s.y)),
        (n = Math.max(n, s.x)),
        (i = Math.max(i, s.y));
    }
    return { minX: e, minY: r, maxX: n, maxY: i };
  }
  function ks(t, e) {
    return e - t;
  }
  function Ms(e, r, n) {
    if (t.defined(n) && n.realtime && t.defined(n.zoom)) {
      var i = n.zoom - e,
        a = Fe / (r * Math.pow(2, i));
      return (a *= r / 512);
    }
    return Fe / r;
  }
  (Ss.prototype.insert = function (t, e, r, n, i, a, o) {
    var s = this.featureIndexArray.length;
    this.featureIndexArray.emplaceBack(r, n, i);
    var u = this.grid;
    o = o || 0;
    for (var l = 0; l < e.length; l++) {
      for (
        var p = e[l], c = [1 / 0, 1 / 0, -1 / 0, -1 / 0], f = 0;
        f < p.length;
        f++
      ) {
        var h = p[f];
        (c[0] = Math.min(c[0], h.x)),
          (c[1] = Math.min(c[1], h.y)),
          (c[2] = Math.max(c[2], h.x)),
          (c[3] = Math.max(c[3], h.y));
      }
      c[0] < Fe &&
        c[1] < Fe &&
        c[2] >= 0 &&
        c[3] >= 0 &&
        u.insert(s, c[0] - o, c[1] - o, c[2] + o, c[3] + o);
    }
  }),
    (Ss.prototype.loadVTLayers = function () {
      return (
        this.vtLayers ||
          ((this.vtLayers = new qa(new n.Protobuf(this.rawTileData)).layers),
          (this.sourceLayerCoder = new i(
            this.vtLayers
              ? Object.keys(this.vtLayers).sort()
              : ['_geojsonTileLayer'],
          ))),
        this.vtLayers
      );
    }),
    (Ss.prototype.query = function (e, r, n) {
      var i = this;
      this.loadVTLayers();
      var a = e.params || {},
        o = Ms(this.z, e.tileSize, a),
        s = ms.createFilter(a.filter),
        u = e.queryGeometry,
        l = 5,
        p = Is(u),
        c = [];
      t.defined(a.selectTolerance) && (l += o * a.selectTolerance),
        (c = this.grid.query(
          p.minX - l,
          p.minY - l,
          p.maxX + l,
          p.maxY + l,
        )).sort(ks);
      for (
        var f,
          h = {},
          d = function (t) {
            var n = c[t];
            if (n !== f) {
              f = n;
              var l = i.featureIndexArray.get(n),
                p = null;
              i.loadMatchingFeature(
                h,
                l.bucketIndex,
                l.sourceLayerIndex,
                l.featureIndex,
                s,
                a.layers,
                r,
                function (t, r) {
                  p || (p = Ue(t));
                  return r.queryIntersectsFeature(
                    u,
                    t,
                    {},
                    p,
                    i.z,
                    e.transform,
                    o,
                    e.pixelPosMatrix,
                    e.adjustScale,
                  );
                },
              );
            }
          },
          y = 0;
        y < c.length;
        y++
      )
        d(y);
      return h;
    }),
    (Ss.prototype.loadMatchingFeature = function (e, r, n, i, a, o, s, u) {
      if (t.defined(r) && t.defined(n) && t.defined(i)) {
        var l = this.bucketLayerIDs[r];
        if (!o || Qa.arraysIntersect(o, l)) {
          var p = this.sourceLayerCoder.decode(n),
            c = this.vtLayers[p].feature(i);
          if (a(new Re(this.z), c))
            for (var f = 0; f < l.length; f++) {
              var h = l[f];
              if (!(o && o.indexOf(h) < 0)) {
                var d = s[h];
                if (d) {
                  var y = !u || u(c, d);
                  if (y) {
                    c.layer = d.serialize();
                    var m = e[h];
                    void 0 === m && (m = e[h] = []),
                      m.push({ featureIndex: i, feature: c, intersectionZ: y });
                  }
                }
              }
            }
        }
      }
    }),
    (Ss.prototype.lookupSymbolFeatures = function (t, e, r, n, i, a) {
      var o = {};
      this.loadVTLayers();
      for (var s = createFilter(n), u = 0, l = t; u < l.length; u += 1) {
        var p = l[u];
        this.loadMatchingFeature(o, e, r, p, s, i, a);
      }
      return o;
    }),
    (Ss.prototype.hasLayer = function (t) {
      for (var e = 0, r = this.bucketLayerIDs; e < r.length; e += 1)
        for (var n = 0, i = r[e]; n < i.length; n += 1) {
          if (t === i[n]) return !0;
        }
      return !1;
    }),
    ke.register('FeatureIndex', Ss, {
      omit: ['rawTileData', 'sourceLayerCoder', 'vtLayers'],
    });
  const Os = [
    'type',
    'source',
    'source-layer',
    'minzoom',
    'maxzoom',
    'filter',
    'layout',
  ];
  function Ps(t) {
    var e = typeof t;
    if ('number' === e || 'boolean' === e || 'string' === e || null == t)
      return JSON.stringify(t);
    if (Array.isArray(t)) {
      for (var r = '[', n = 0, i = t; n < i.length; n += 1) {
        r += Ps(i[n]) + ',';
      }
      return r + ']';
    }
    for (var a = Object.keys(t).sort(), o = '{', s = 0; s < a.length; s++)
      o += JSON.stringify(a[s]) + ':' + Ps(t[a[s]]) + ',';
    return o + '}';
  }
  function zs(t) {
    for (var e = '', r = 0, n = Os; r < n.length; r += 1) {
      e += '/' + Ps(t[n[r]]);
    }
    return e;
  }
  function Rs(t, e) {
    for (var r = {}, n = 0; n < t.length; n++) {
      var i = (e && e[t[n].id]) || zs(t[n]);
      e && (e[t[n].id] = i);
      var a = r[i];
      a || (a = r[i] = []), a.push(t[n]);
    }
    var o = [];
    for (var s in r) o.push(r[s]);
    return o;
  }
  var Fs = o([{ name: 'a_pos', components: 2, type: 'Int16' }], 4),
    Cs = Fs.members;
  function Ds(t, e, r, n, i) {
    t.emplaceBack(2 * e + (n + 1) / 2, 2 * r + (i + 1) / 2);
  }
  var Bs = function (t) {
    (this.zoom = t.zoom),
      (this.overscaling = t.overscaling),
      (this.layers = t.layers),
      (this._sourceLayerIds = {});
    var e = this;
    (this.layerIds = this.layers.map(function (t, r) {
      return (e._sourceLayerIds[t.sourceLayer] = r), t.sourceLayer;
    })),
      (this.index = t.index),
      (this.hasPattern = !1),
      (this.layoutVertexArray = new Cr()),
      (this.indexArray = new je()),
      (this.segments = new Ve()),
      (this.programConfigurations = new yr(Cs, t.layers, t.zoom)),
      (this.stateDependentLayerIds = this.layers
        .filter(function (t) {
          return t.isStateDependent();
        })
        .map(function (t) {
          return t.id;
        }));
  };
  (Bs.prototype.populate = function (t, e) {
    var r = this.layers[0],
      n = [],
      i = null;
    'circle' === r.type && (i = r.layout.get('circle-sort-key'));
    for (var a = 0, o = t; a < o.length; a += 1) {
      var s = o[a],
        u = s.feature,
        l = s.index,
        p = s.sourceLayerIndex,
        c = s.sourceLayerId,
        f = this._sourceLayerIds[c],
        h = this.layers[f];
      if (h) {
        var d = Fe / 512,
          y = h.paint.get('circle-radius').value.value * d;
        if (this.layers[0]._featureFilter(new Re(0), u)) {
          var m = Ue(u),
            v = i ? i.evaluate(u, {}) : void 0,
            g = {
              id: u.id,
              properties: u.properties,
              type: u.type,
              sourceLayerIndex: p,
              index: l,
              geometry: m,
              patterns: {},
              sortKey: v,
              circleRadius: y,
            };
          n.push(g);
        }
      }
    }
    i &&
      n.sort(function (t, e) {
        return t.sortKey - e.sortKey;
      });
    for (var x = 0, b = n; x < b.length; x += 1) {
      var _ = b[x],
        w = _,
        E = w.geometry,
        T = w.index,
        A = w.sourceLayerIndex,
        S = t[T].feature;
      this.addFeature(_, E, T),
        e.featureIndex.insert(S, E, T, A, this.index, void 0, w.circleRadius);
    }
  }),
    (Bs.prototype.update = function (t, e, r) {
      this.stateDependentLayers.length &&
        this.programConfigurations.updatePaintArrays(
          t,
          e,
          this.stateDependentLayers,
          r,
        );
    }),
    (Bs.prototype.isEmpty = function () {
      return 0 === this.layoutVertexArray.length;
    }),
    (Bs.prototype.uploadPending = function () {
      return !this.uploaded || this.programConfigurations.needsUpload;
    }),
    (Bs.prototype.upload = function (t) {
      this.uploaded ||
        ((this.layoutVertexBuffer = t.createVertexBuffer(
          this.layoutVertexArray,
          Cs,
        )),
        (this.indexBuffer = t.createIndexBuffer(this.indexArray))),
        this.programConfigurations.upload(t),
        (this.uploaded = !0);
    }),
    (Bs.prototype.destroy = function () {
      this.layoutVertexBuffer &&
        (this.layoutVertexBuffer.destroy(),
        this.indexBuffer.destroy(),
        this.programConfigurations.destroy(),
        this.segments.destroy());
    }),
    (Bs.prototype.clear = function () {
      t.defined(this.layoutVertexArray) && (this.layoutVertexArray = null),
        t.defined(this.indexArray) && (this.indexArray = null);
    }),
    (Bs.prototype.addFeature = function (t, e, r) {
      for (var n = 0, i = e; n < i.length; n += 1)
        for (var a = 0, o = i[n]; a < o.length; a += 1) {
          var s = o[a],
            u = s.x,
            l = s.y;
          if (!(u < 0 || u >= Fe || l < 0 || l >= Fe)) {
            var p = this.segments.prepareSegment(
                4,
                this.layoutVertexArray,
                this.indexArray,
                t.sortKey,
              ),
              c = p.vertexLength;
            Ds(this.layoutVertexArray, u, l, -1, -1),
              Ds(this.layoutVertexArray, u, l, 1, -1),
              Ds(this.layoutVertexArray, u, l, 1, 1),
              Ds(this.layoutVertexArray, u, l, -1, 1),
              this.indexArray.emplaceBack(c, c + 1, c + 2),
              this.indexArray.emplaceBack(c, c + 3, c + 2),
              (p.vertexLength += 4),
              (p.primitiveLength += 2);
          }
        }
      this.programConfigurations.populatePaintArrays(
        this.layoutVertexArray.length,
        t,
        r,
        {},
      );
    }),
    ke.register('CircleBucket', Bs, { omit: ['layers'] });
  var Us = function (t) {
    this.specification = t;
  };
  (Us.prototype.possiblyEvaluate = function (t, e) {
    return t.expression.evaluate(e);
  }),
    (Us.prototype.interpolate = function (t, e, r) {
      var n = interpolate[this.specification.type];
      return n ? n(t, e, r) : t;
    }),
    ke.register('DataConstantProperty', Us);
  var Vs = function (t, e) {
    (this.specification = t), (this.overrides = e);
  };
  (Vs.prototype.possiblyEvaluate = function (t, e, r) {
    return 'constant' === t.expression.kind || 'camera' === t.expression.kind
      ? new Ke(
          this,
          { kind: 'constant', value: t.expression.evaluate(e, null, {}, r) },
          e,
        )
      : new Ke(this, t.expression, e);
  }),
    (Vs.prototype.interpolate = function (t, e, r) {
      if ('constant' !== t.value.kind || 'constant' !== e.value.kind) return t;
      if (void 0 === t.value.value || void 0 === e.value.value)
        return new Ke(this, { kind: 'constant', value: void 0 }, t.parameters);
      var n = interpolate[this.specification.type];
      return n
        ? new Ke(
            this,
            { kind: 'constant', value: n(t.value.value, e.value.value, r) },
            t.parameters,
          )
        : t;
    }),
    (Vs.prototype.evaluate = function (t, e, r, n, i) {
      return 'constant' === t.kind ? t.value : t.evaluate(e, r, n, i);
    }),
    ke.register('DataDrivenProperty', Vs);
  var Ns = function (t, e) {
    (this.property = t),
      (this.value = e),
      (this.expression = qo.normalizePropertyExpression(
        void 0 === e ? t.specification.default : e,
        t.specification,
      ));
  };
  function Ls(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    var e = t * t,
      r = e * t;
    return 4 * (t < 0.5 ? r : 3 * (t - e) + r - 0.75);
  }
  (Ns.prototype.isDataDriven = function () {
    return (
      'source' === this.expression.kind || 'composite' === this.expression.kind
    );
  }),
    (Ns.prototype.possiblyEvaluate = function (t, e) {
      return this.property.possiblyEvaluate(this, t, e);
    });
  var Xs = function (t, e, r, n, i) {
    (this.property = t),
      (this.value = e),
      (this.begin = i + n.delay || 0),
      (this.end = this.begin + n.duration || 0),
      t.specification.transition && (n.delay || n.duration) && (this.prior = r);
  };
  Xs.prototype.possiblyEvaluate = function (t, e) {
    var r = t.now || 0,
      n = this.value.possiblyEvaluate(t, e),
      i = this.prior;
    if (i) {
      if (r > this.end) return (this.prior = null), n;
      if (this.value.isDataDriven()) return (this.prior = null), n;
      if (r < this.begin) return i.possiblyEvaluate(t, e);
      var a = (r - this.begin) / (this.end - this.begin);
      return this.property.interpolate(i.possiblyEvaluate(t, e), n, Ls(a));
    }
    return n;
  };
  var qs = function (t) {
    (this.property = t), (this.value = new Ns(t, void 0));
  };
  (qs.prototype.transitioned = function (t, e) {
    return new Xs(
      this.property,
      this.value,
      e,
      Qa.extend({}, t.transition, this.transition),
      t.now,
    );
  }),
    (qs.prototype.untransitioned = function () {
      return new Xs(this.property, this.value, null, {}, 0);
    });
  var js = function (t) {
    for (var e in ((this.properties = t),
    (this.defaultPropertyValues = {}),
    (this.defaultTransitionablePropertyValues = {}),
    (this.defaultTransitioningPropertyValues = {}),
    (this.defaultPossiblyEvaluatedValues = {}),
    (this.overridableProperties = []),
    t)) {
      var r = t[e];
      r.specification.overridable && this.overridableProperties.push(e);
      var n = (this.defaultPropertyValues[e] = new Ns(r, void 0)),
        i = (this.defaultTransitionablePropertyValues[e] = new qs(r));
      (this.defaultTransitioningPropertyValues[e] = i.untransitioned()),
        (this.defaultPossiblyEvaluatedValues[e] = n.possiblyEvaluate({}));
    }
  };
  function Hs() {}
  (Hs.getMaximumPaintValue = function (t, e, r) {
    var n = e.paint.get(t).value;
    return 'constant' === n.kind
      ? n.value
      : r.programConfigurations.get(e.id).binders[t].maxValue;
  }),
    (Hs.translateDistance = function (t) {
      return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
    }),
    (Hs.translate = function (t, e, r, n, i) {
      if (!e[0] && !e[1]) return t;
      var a = Fa.convert(e)._mult(i);
      'viewport' === r && a._rotate(-n);
      for (var o = [], s = 0; s < t.length; s++) {
        var u = t[s];
        o.push(u.sub(a));
      }
      return o;
    });
  var Ys = function (t) {
    (this._properties = t),
      (this._values = Object.create(t.defaultPossiblyEvaluatedValues));
  };
  Ys.prototype.get = function (t) {
    return this._values[t];
  };
  var Qs = function (t) {
    (this._properties = t),
      (this._values = Object.create(t.defaultPropertyValues));
  };
  (Qs.prototype.getValue = function (t) {
    return Qa.clone(this._values[t].value);
  }),
    (Qs.prototype.setValue = function (t, e) {
      this._values[t] = new Ns(
        this._values[t].property,
        null === e ? void 0 : Qa.clone(e),
      );
    }),
    (Qs.prototype.serialize = function () {
      for (
        var t = {}, e = 0, r = Object.keys(this._values);
        e < r.length;
        e += 1
      ) {
        var n = r[e],
          i = this.getValue(n);
        void 0 !== i && (t[n] = i);
      }
      return t;
    }),
    (Qs.prototype.possiblyEvaluate = function (t, e) {
      for (
        var r = new Ys(this._properties), n = 0, i = Object.keys(this._values);
        n < i.length;
        n += 1
      ) {
        var a = i[n];
        r._values[a] = this._values[a].possiblyEvaluate(t, e);
      }
      return r;
    });
  var Ks = function (t) {
    (this._properties = t),
      (this._values = Object.create(t.defaultTransitioningPropertyValues));
  };
  (Ks.prototype.possiblyEvaluate = function (t, e) {
    for (
      var r = new Ys(this._properties), n = 0, i = Object.keys(this._values);
      n < i.length;
      n += 1
    ) {
      var a = i[n];
      r._values[a] = this._values[a].possiblyEvaluate(t, e);
    }
    return r;
  }),
    (Ks.prototype.hasTransition = function () {
      for (var t = 0, e = Object.keys(this._values); t < e.length; t += 1) {
        var r = e[t];
        if (this._values[r].prior) return !0;
      }
      return !1;
    });
  var Gs = function (t) {
    (this._properties = t),
      (this._values = Object.create(t.defaultTransitionablePropertyValues));
  };
  (Gs.prototype.getValue = function (t) {
    return Qa.clone(this._values[t].value.value);
  }),
    (Gs.prototype.setValue = function (t, e) {
      this._values.hasOwnProperty(t) ||
        (this._values[t] = new qs(this._values[t].property)),
        (this._values[t].value = new Ns(
          this._values[t].property,
          null === e ? void 0 : Qa.clone(e),
        ));
    }),
    (Gs.prototype.getTransition = function (t) {
      return Qa.clone(this._values[t].transition);
    }),
    (Gs.prototype.setTransition = function (t, e) {
      this._values.hasOwnProperty(t) ||
        (this._values[t] = new qs(this._values[t].property)),
        (this._values[t].transition = Qa.clone(e) || void 0);
    }),
    (Gs.prototype.serialize = function () {
      for (
        var t = {}, e = 0, r = Object.keys(this._values);
        e < r.length;
        e += 1
      ) {
        var n = r[e],
          i = this.getValue(n);
        void 0 !== i && (t[n] = i);
        var a = this.getTransition(n);
        void 0 !== a && (t[n + '-transition'] = a);
      }
      return t;
    }),
    (Gs.prototype.transitioned = function (t, e) {
      for (
        var r = new Ks(this._properties), n = 0, i = Object.keys(this._values);
        n < i.length;
        n += 1
      ) {
        var a = i[n];
        r._values[a] = this._values[a].transitioned(t, e._values[a]);
      }
      return r;
    }),
    (Gs.prototype.untransitioned = function () {
      for (
        var t = new Ks(this._properties), e = 0, r = Object.keys(this._values);
        e < r.length;
        e += 1
      ) {
        var n = r[e];
        t._values[n] = this._values[n].untransitioned();
      }
      return t;
    });
  var Ws = '-transition';
  function Js(t, e) {
    return -1 !== t.indexOf(e, t.length - e.length);
  }
  function Zs(t, e) {
    if (
      ((this.id = t.id),
      (this.type = t.type),
      'custom' !== t.type &&
        ((t = t),
        (this.metadata = t.metadata),
        (this.minzoom = t.minzoom),
        (this.maxzoom = t.maxzoom),
        'background' !== t.type &&
          ((this.source = t.source),
          (this.sourceLayer = t['source-layer']),
          (this.filter = t.filter)),
        e.layout && (this._unevaluatedLayout = new Qs(e.layout)),
        e.paint))
    ) {
      for (var r in ((this._transitionablePaint = new Gs(e.paint)), t.paint))
        this.setPaintProperty(r, t.paint[r], { validate: !1 });
      for (var n in t.layout)
        this.setLayoutProperty(n, t.layout[n], { validate: !1 });
      this._transitioningPaint = this._transitionablePaint.untransitioned();
    }
  }
  (Zs.prototype.getCrossfadeParameters = function () {
    return this._crossfadeParameters;
  }),
    (Zs.prototype.getLayoutProperty = function (t) {
      return 'visibility' === t
        ? this.visibility
        : this._unevaluatedLayout.getValue(t);
    }),
    (Zs.prototype.setLayoutProperty = function (t, e, r) {
      if (null != e) this.id;
      if ('visibility' === t)
        return (
          (this.visibility = e),
          void (
            this.config &&
            this.config.layout &&
            (this.config.layout.visibility = e)
          )
        );
      this._unevaluatedLayout.setValue(t, e);
    }),
    (Zs.prototype.getPaintProperty = function (t) {
      return Js(t, Ws)
        ? this._transitionablePaint.getTransition(t.slice(0, -Ws.length))
        : this._transitionablePaint.getValue(t);
    }),
    (Zs.prototype.setPaintProperty = function (t, e, r) {
      if (null != e) this.id;
      if (Js(t, Ws))
        return (
          this._transitionablePaint.setTransition(
            t.slice(0, -Ws.length),
            e || void 0,
          ),
          !1
        );
      var n = this._transitionablePaint._values[t],
        i =
          'cross-faded-data-driven' ===
          n.property.specification['property-type'],
        a = n.value.isDataDriven(),
        o = n.value;
      this._transitionablePaint.setValue(t, e),
        this._handleSpecialPaintPropertyUpdate(t);
      var s = this._transitionablePaint._values[t].value;
      return (
        s.isDataDriven() ||
        a ||
        i ||
        this._handleOverridablePaintPropertyUpdate(t, o, s)
      );
    }),
    (Zs.prototype._handleSpecialPaintPropertyUpdate = function (t) {}),
    (Zs.prototype._handleOverridablePaintPropertyUpdate = function (t, e, r) {
      return !1;
    }),
    (Zs.prototype.isHidden = function (t) {
      return (
        !!(this.minzoom && t < this.minzoom) ||
        !!(this.maxzoom && t >= this.maxzoom) ||
        'none' === this.visibility
      );
    }),
    (Zs.prototype.updateTransitions = function (t) {
      this._transitioningPaint = this._transitionablePaint.transitioned(
        t,
        this._transitioningPaint,
      );
    }),
    (Zs.prototype.hasTransition = function () {
      return this._transitioningPaint.hasTransition();
    }),
    (Zs.prototype.recalculate = function (t, e) {
      t.getCrossfadeParameters &&
        (this._crossfadeParameters = t.getCrossfadeParameters()),
        this._unevaluatedLayout &&
          (this.layout = this._unevaluatedLayout.possiblyEvaluate(t, e)),
        (this.paint = this._transitioningPaint.possiblyEvaluate(t, e));
    }),
    (Zs.prototype.serialize = function () {
      var t = {
        id: this.id,
        type: this.type,
        source: this.source,
        'source-layer': this.sourceLayer,
        metadata: this.metadata,
        minzoom: this.minzoom,
        maxzoom: this.maxzoom,
        filter: this.filter,
        layout: this._unevaluatedLayout && this._unevaluatedLayout.serialize(),
        paint:
          this._transitionablePaint && this._transitionablePaint.serialize(),
      };
      return (
        this.visibility &&
          ((t.layout = t.layout || {}),
          (t.layout.visibility = this.visibility)),
        Qa.filterObject(t, function (t, e) {
          return !(
            void 0 === t ||
            ('layout' === e && !Object.keys(t).length) ||
            ('paint' === e && !Object.keys(t).length)
          );
        })
      );
    }),
    (Zs.prototype._validate = function (t, e, r, n, i) {
      return !0;
    }),
    (Zs.prototype.is3D = function () {
      return !1;
    }),
    (Zs.prototype.isTileClipped = function () {
      return !1;
    }),
    (Zs.prototype.hasOffscreenPass = function () {
      return !1;
    }),
    (Zs.prototype.resize = function () {}),
    (Zs.prototype.isStateDependent = function () {
      return !0;
    });
  var $s = 8,
    tu = {
      version: { required: !0, type: 'enum', values: [8] },
      name: { type: 'string' },
      metadata: { type: '*' },
      center: { type: 'array', value: 'number' },
      zoom: { type: 'number' },
      bearing: { type: 'number', default: 0, period: 360, units: 'degrees' },
      pitch: { type: 'number', default: 0, units: 'degrees' },
      light: { type: 'light' },
      sources: { required: !0, type: 'sources' },
      sprite: { type: 'string' },
      glyphs: { type: 'string' },
      transition: { type: 'transition' },
      layers: { required: !0, type: 'array', value: 'layer' },
    },
    eu = { '*': { type: 'source' } },
    ru = [
      'source_vector',
      'source_raster',
      'source_raster_dem',
      'source_geojson',
      'source_video',
      'source_image',
    ],
    nu = {
      type: { required: !0, type: 'enum', values: { vector: {} } },
      url: { type: 'string' },
      tiles: { type: 'array', value: 'string' },
      bounds: {
        type: 'array',
        value: 'number',
        length: 4,
        default: [-180, -85.051129, 180, 85.051129],
      },
      scheme: { type: 'enum', values: { xyz: {}, tms: {} }, default: 'xyz' },
      minzoom: { type: 'number', default: 0 },
      maxzoom: { type: 'number', default: 22 },
      attribution: { type: 'string' },
      '*': { type: '*' },
    },
    iu = {
      type: { required: !0, type: 'enum', values: { raster: {} } },
      url: { type: 'string' },
      tiles: { type: 'array', value: 'string' },
      bounds: {
        type: 'array',
        value: 'number',
        length: 4,
        default: [-180, -85.051129, 180, 85.051129],
      },
      minzoom: { type: 'number', default: 0 },
      maxzoom: { type: 'number', default: 22 },
      tileSize: { type: 'number', default: 512, units: 'pixels' },
      scheme: { type: 'enum', values: { xyz: {}, tms: {} }, default: 'xyz' },
      attribution: { type: 'string' },
      '*': { type: '*' },
    },
    au = {
      type: { required: !0, type: 'enum', values: { 'raster-dem': {} } },
      url: { type: 'string' },
      tiles: { type: 'array', value: 'string' },
      bounds: {
        type: 'array',
        value: 'number',
        length: 4,
        default: [-180, -85.051129, 180, 85.051129],
      },
      minzoom: { type: 'number', default: 0 },
      maxzoom: { type: 'number', default: 22 },
      tileSize: { type: 'number', default: 512, units: 'pixels' },
      attribution: { type: 'string' },
      encoding: {
        type: 'enum',
        values: { terrarium: {}, mapbox: {} },
        default: 'mapbox',
      },
      '*': { type: '*' },
    },
    ou = {
      type: { required: !0, type: 'enum', values: { geojson: {} } },
      data: { type: '*' },
      maxzoom: { type: 'number', default: 18 },
      attribution: { type: 'string' },
      buffer: { type: 'number', default: 128, maximum: 512, minimum: 0 },
      tolerance: { type: 'number', default: 0.375 },
      cluster: { type: 'boolean', default: !1 },
      clusterRadius: { type: 'number', default: 50, minimum: 0 },
      clusterMaxZoom: { type: 'number' },
      clusterProperties: { type: '*' },
      lineMetrics: { type: 'boolean', default: !1 },
      generateId: { type: 'boolean', default: !1 },
    },
    su = {
      type: { required: !0, type: 'enum', values: { video: {} } },
      urls: { required: !0, type: 'array', value: 'string' },
      coordinates: {
        required: !0,
        type: 'array',
        length: 4,
        value: { type: 'array', length: 2, value: 'number' },
      },
    },
    uu = {
      type: { required: !0, type: 'enum', values: { image: {} } },
      url: { required: !0, type: 'string' },
      coordinates: {
        required: !0,
        type: 'array',
        length: 4,
        value: { type: 'array', length: 2, value: 'number' },
      },
    },
    lu = {
      id: { type: 'string', required: !0 },
      type: {
        type: 'enum',
        values: {
          fill: {},
          line: {},
          symbol: {},
          circle: {},
          heatmap: {},
          'fill-extrusion': {},
          raster: {},
          hillshade: {},
          background: {},
        },
        required: !0,
      },
      metadata: { type: '*' },
      source: { type: 'string' },
      'source-layer': { type: 'string' },
      minzoom: { type: 'number', minimum: 0, maximum: 24 },
      maxzoom: { type: 'number', minimum: 0, maximum: 24 },
      filter: { type: 'filter' },
      layout: { type: 'layout' },
      paint: { type: 'paint' },
    },
    pu = [
      'layout_fill',
      'layout_line',
      'layout_circle',
      'layout_heatmap',
      'layout_fill-extrusion',
      'layout_symbol',
      'layout_raster',
      'layout_hillshade',
      'layout_background',
    ],
    cu = {
      visibility: {
        type: 'enum',
        values: { visible: {}, none: {} },
        default: 'visible',
        'property-type': 'constant',
      },
    },
    fu = {
      'fill-sort-key': {
        type: 'number',
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      visibility: {
        type: 'enum',
        values: { visible: {}, none: {} },
        default: 'visible',
        'property-type': 'constant',
      },
    },
    hu = {
      'circle-sort-key': {
        type: 'number',
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      visibility: {
        type: 'enum',
        values: { visible: {}, none: {} },
        default: 'visible',
        'property-type': 'constant',
      },
    },
    du = {
      visibility: {
        type: 'enum',
        values: { visible: {}, none: {} },
        default: 'visible',
        'property-type': 'constant',
      },
    },
    yu = {
      'line-cap': {
        type: 'enum',
        values: { butt: {}, round: {}, square: {} },
        default: 'butt',
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'line-join': {
        type: 'enum',
        values: { bevel: {}, round: {}, miter: {} },
        default: 'miter',
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'line-miter-limit': {
        type: 'number',
        default: 2,
        requires: [{ 'line-join': 'miter' }],
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'line-round-limit': {
        type: 'number',
        default: 1.05,
        requires: [{ 'line-join': 'round' }],
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'line-sort-key': {
        type: 'number',
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      visibility: {
        type: 'enum',
        values: { visible: {}, none: {} },
        default: 'visible',
        'property-type': 'constant',
      },
    },
    mu = {
      'symbol-placement': {
        type: 'enum',
        values: { point: {}, line: {}, 'line-center': {} },
        default: 'point',
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'symbol-spacing': {
        type: 'number',
        default: 250,
        minimum: 1,
        units: 'pixels',
        requires: [{ 'symbol-placement': 'line' }],
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'symbol-avoid-edges': {
        type: 'boolean',
        default: !1,
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'symbol-sort-key': {
        type: 'number',
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'symbol-z-order': {
        type: 'enum',
        values: { auto: {}, 'viewport-y': {}, source: {} },
        default: 'auto',
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'icon-allow-overlap': {
        type: 'boolean',
        default: !1,
        requires: ['icon-image'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'icon-ignore-placement': {
        type: 'boolean',
        default: !1,
        requires: ['icon-image'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'icon-optional': {
        type: 'boolean',
        default: !1,
        requires: ['icon-image', 'text-field'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'icon-rotation-alignment': {
        type: 'enum',
        values: { map: {}, viewport: {}, auto: {} },
        default: 'auto',
        requires: ['icon-image'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'icon-size': {
        type: 'number',
        default: 1,
        minimum: 0,
        units: 'factor of the original icon size',
        requires: ['icon-image'],
        expression: { interpolated: !0, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'icon-text-fit': {
        type: 'enum',
        values: { none: {}, width: {}, height: {}, both: {} },
        default: 'none',
        requires: ['icon-image', 'text-field'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'icon-text-fit-padding': {
        type: 'array',
        value: 'number',
        length: 4,
        default: [0, 0, 0, 0],
        units: 'pixels',
        requires: [
          'icon-image',
          'text-field',
          { 'icon-text-fit': ['both', 'width', 'height'] },
        ],
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'icon-image': {
        type: 'resolvedImage',
        tokens: !0,
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'icon-rotate': {
        type: 'number',
        default: 0,
        period: 360,
        units: 'degrees',
        requires: ['icon-image'],
        expression: { interpolated: !0, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'icon-padding': {
        type: 'number',
        default: 2,
        minimum: 0,
        units: 'pixels',
        requires: ['icon-image'],
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'icon-keep-upright': {
        type: 'boolean',
        default: !1,
        requires: [
          'icon-image',
          { 'icon-rotation-alignment': 'map' },
          { 'symbol-placement': ['line', 'line-center'] },
        ],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'icon-offset': {
        type: 'array',
        value: 'number',
        length: 2,
        default: [0, 0],
        requires: ['icon-image'],
        expression: { interpolated: !0, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'icon-anchor': {
        type: 'enum',
        values: {
          center: {},
          left: {},
          right: {},
          top: {},
          bottom: {},
          'top-left': {},
          'top-right': {},
          'bottom-left': {},
          'bottom-right': {},
        },
        default: 'center',
        requires: ['icon-image'],
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'icon-pitch-alignment': {
        type: 'enum',
        values: { map: {}, viewport: {}, auto: {} },
        default: 'auto',
        requires: ['icon-image'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-pitch-alignment': {
        type: 'enum',
        values: { map: {}, viewport: {}, auto: {} },
        default: 'auto',
        requires: ['text-field'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-rotation-alignment': {
        type: 'enum',
        values: { map: {}, viewport: {}, auto: {} },
        default: 'auto',
        requires: ['text-field'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-field': {
        type: 'formatted',
        default: '',
        tokens: !0,
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'text-font': {
        type: 'array',
        value: 'string',
        default: ['Open Sans Regular', 'Arial Unicode MS Regular'],
        requires: ['text-field'],
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'text-size': {
        type: 'number',
        default: 16,
        minimum: 0,
        units: 'pixels',
        requires: ['text-field'],
        expression: { interpolated: !0, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'text-max-width': {
        type: 'number',
        default: 10,
        minimum: 0,
        units: 'ems',
        requires: ['text-field'],
        expression: { interpolated: !0, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'text-line-height': {
        type: 'number',
        default: 1.2,
        units: 'ems',
        requires: ['text-field'],
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-letter-spacing': {
        type: 'number',
        default: 0,
        units: 'ems',
        requires: ['text-field'],
        expression: { interpolated: !0, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'text-justify': {
        type: 'enum',
        values: { auto: {}, left: {}, center: {}, right: {} },
        default: 'center',
        requires: ['text-field'],
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'text-radial-offset': {
        type: 'number',
        units: 'ems',
        default: 0,
        requires: ['text-field'],
        'property-type': 'data-driven',
        expression: { interpolated: !0, parameters: ['zoom', 'feature'] },
      },
      'text-variable-anchor': {
        type: 'array',
        value: 'enum',
        values: {
          center: {},
          left: {},
          right: {},
          top: {},
          bottom: {},
          'top-left': {},
          'top-right': {},
          'bottom-left': {},
          'bottom-right': {},
        },
        requires: ['text-field', { 'symbol-placement': ['point'] }],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-anchor': {
        type: 'enum',
        values: {
          center: {},
          left: {},
          right: {},
          top: {},
          bottom: {},
          'top-left': {},
          'top-right': {},
          'bottom-left': {},
          'bottom-right': {},
        },
        default: 'center',
        requires: ['text-field', { '!': 'text-variable-anchor' }],
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'text-max-angle': {
        type: 'number',
        default: 45,
        units: 'degrees',
        requires: [
          'text-field',
          { 'symbol-placement': ['line', 'line-center'] },
        ],
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-writing-mode': {
        type: 'array',
        value: 'enum',
        values: { horizontal: {}, vertical: {} },
        requires: ['text-field', { 'symbol-placement': ['point'] }],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-rotate': {
        type: 'number',
        default: 0,
        period: 360,
        units: 'degrees',
        requires: ['text-field'],
        expression: { interpolated: !0, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'text-padding': {
        type: 'number',
        default: 2,
        minimum: 0,
        units: 'pixels',
        requires: ['text-field'],
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-keep-upright': {
        type: 'boolean',
        default: !0,
        requires: [
          'text-field',
          { 'text-rotation-alignment': 'map' },
          { 'symbol-placement': ['line', 'line-center'] },
        ],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-transform': {
        type: 'enum',
        values: { none: {}, uppercase: {}, lowercase: {} },
        default: 'none',
        requires: ['text-field'],
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'text-offset': {
        type: 'array',
        value: 'number',
        units: 'ems',
        length: 2,
        default: [0, 0],
        requires: ['text-field', { '!': 'text-radial-offset' }],
        expression: { interpolated: !0, parameters: ['zoom', 'feature'] },
        'property-type': 'data-driven',
      },
      'text-allow-overlap': {
        type: 'boolean',
        default: !1,
        requires: ['text-field'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-ignore-placement': {
        type: 'boolean',
        default: !1,
        requires: ['text-field'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-optional': {
        type: 'boolean',
        default: !1,
        requires: ['text-field', 'icon-image'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      visibility: {
        type: 'enum',
        values: { visible: {}, none: {} },
        default: 'visible',
        'property-type': 'constant',
      },
    },
    vu = {
      visibility: {
        type: 'enum',
        values: { visible: {}, none: {} },
        default: 'visible',
        'property-type': 'constant',
      },
    },
    gu = {
      visibility: {
        type: 'enum',
        values: { visible: {}, none: {} },
        default: 'visible',
        'property-type': 'constant',
      },
    },
    xu = { type: 'array', value: '*' },
    bu = {
      type: 'enum',
      values: {
        '==': {},
        '!=': {},
        '>': {},
        '>=': {},
        '<': {},
        '<=': {},
        in: {},
        '!in': {},
        all: {},
        any: {},
        none: {},
        has: {},
        '!has': {},
      },
    },
    _u = { type: 'enum', values: { Point: {}, LineString: {}, Polygon: {} } },
    wu = {
      type: 'array',
      minimum: 0,
      maximum: 24,
      value: ['number', 'color'],
      length: 2,
    },
    Eu = { type: 'array', value: '*', minimum: 1 },
    Tu = {
      type: 'enum',
      values: {
        let: { group: 'Variable binding' },
        var: { group: 'Variable binding' },
        literal: { group: 'Types' },
        array: { group: 'Types' },
        at: { group: 'Lookup' },
        in: { group: 'Lookup' },
        case: { group: 'Decision' },
        match: { group: 'Decision' },
        coalesce: { group: 'Decision' },
        step: { group: 'Ramps, scales, curves' },
        interpolate: { group: 'Ramps, scales, curves' },
        'interpolate-hcl': { group: 'Ramps, scales, curves' },
        'interpolate-lab': { group: 'Ramps, scales, curves' },
        ln2: { group: 'Math' },
        pi: { group: 'Math' },
        e: { group: 'Math' },
        typeof: { group: 'Types' },
        string: { group: 'Types' },
        number: { group: 'Types' },
        boolean: { group: 'Types' },
        object: { group: 'Types' },
        collator: { group: 'Types' },
        format: { group: 'Types' },
        image: { group: 'Types' },
        'number-format': { group: 'Types' },
        'to-string': { group: 'Types' },
        'to-number': { group: 'Types' },
        'to-boolean': { group: 'Types' },
        'to-rgba': { group: 'Color' },
        'to-color': { group: 'Types' },
        rgb: { group: 'Color' },
        rgba: { group: 'Color' },
        get: { group: 'Lookup' },
        has: { group: 'Lookup' },
        length: { group: 'Lookup' },
        properties: { group: 'Feature data' },
        'feature-state': { group: 'Feature data' },
        'geometry-type': { group: 'Feature data' },
        id: { group: 'Feature data' },
        zoom: { group: 'Zoom' },
        'heatmap-density': { group: 'Heatmap' },
        'line-progress': { group: 'Feature data' },
        accumulated: { group: 'Feature data' },
        '+': { group: 'Math' },
        '*': { group: 'Math' },
        '-': { group: 'Math' },
        '/': { group: 'Math' },
        '%': { group: 'Math' },
        '^': { group: 'Math' },
        sqrt: { group: 'Math' },
        log10: { group: 'Math' },
        ln: { group: 'Math' },
        log2: { group: 'Math' },
        sin: { group: 'Math' },
        cos: { group: 'Math' },
        tan: { group: 'Math' },
        asin: { group: 'Math' },
        acos: { group: 'Math' },
        atan: { group: 'Math' },
        min: { group: 'Math' },
        max: { group: 'Math' },
        round: { group: 'Math' },
        abs: { group: 'Math' },
        ceil: { group: 'Math' },
        floor: { group: 'Math' },
        '==': { group: 'Decision' },
        '!=': { group: 'Decision' },
        '>': { group: 'Decision' },
        '<': { group: 'Decision' },
        '>=': { group: 'Decision' },
        '<=': { group: 'Decision' },
        all: { group: 'Decision' },
        any: { group: 'Decision' },
        '!': { group: 'Decision' },
        'is-supported-script': { group: 'String' },
        upcase: { group: 'String' },
        downcase: { group: 'String' },
        concat: { group: 'String' },
        'resolved-locale': { group: 'String' },
      },
    },
    Au = {
      anchor: {
        type: 'enum',
        default: 'viewport',
        values: { map: {}, viewport: {} },
        'property-type': 'data-constant',
        transition: !1,
        expression: { interpolated: !1, parameters: ['zoom'] },
      },
      position: {
        type: 'array',
        default: [1.15, 210, 30],
        length: 3,
        value: 'number',
        'property-type': 'data-constant',
        transition: !0,
        expression: { interpolated: !0, parameters: ['zoom'] },
      },
      color: {
        type: 'color',
        'property-type': 'data-constant',
        default: '#ffffff',
        expression: { interpolated: !0, parameters: ['zoom'] },
        transition: !0,
      },
      intensity: {
        type: 'number',
        'property-type': 'data-constant',
        default: 0.5,
        minimum: 0,
        maximum: 1,
        expression: { interpolated: !0, parameters: ['zoom'] },
        transition: !0,
      },
    },
    Su = [
      'paint_fill',
      'paint_line',
      'paint_circle',
      'paint_heatmap',
      'paint_fill-extrusion',
      'paint_symbol',
      'paint_raster',
      'paint_hillshade',
      'paint_background',
    ],
    Iu = {
      'fill-antialias': {
        type: 'boolean',
        default: !0,
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'fill-opacity': {
        type: 'number',
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: !0,
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'fill-color': {
        type: 'color',
        default: '#000000',
        transition: !0,
        requires: [{ '!': 'fill-pattern' }],
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'fill-outline-color': {
        type: 'color',
        transition: !0,
        requires: [{ '!': 'fill-pattern' }, { 'fill-antialias': !0 }],
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'fill-translate': {
        type: 'array',
        value: 'number',
        length: 2,
        default: [0, 0],
        transition: !0,
        units: 'pixels',
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'fill-translate-anchor': {
        type: 'enum',
        values: { map: {}, viewport: {} },
        default: 'map',
        requires: ['fill-translate'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'fill-pattern': {
        type: 'resolvedImage',
        transition: !0,
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'cross-faded-data-driven',
      },
    },
    ku = {
      'line-opacity': {
        type: 'number',
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: !0,
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'line-color': {
        type: 'color',
        default: '#000000',
        transition: !0,
        requires: [{ '!': 'line-pattern' }],
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'line-translate': {
        type: 'array',
        value: 'number',
        length: 2,
        default: [0, 0],
        transition: !0,
        units: 'pixels',
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'line-translate-anchor': {
        type: 'enum',
        values: { map: {}, viewport: {} },
        default: 'map',
        requires: ['line-translate'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'line-width': {
        type: 'number',
        default: 1,
        minimum: 0,
        transition: !0,
        units: 'pixels',
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'line-gap-width': {
        type: 'number',
        default: 0,
        minimum: 0,
        transition: !0,
        units: 'pixels',
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'line-offset': {
        type: 'number',
        default: 0,
        transition: !0,
        units: 'pixels',
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'line-blur': {
        type: 'number',
        default: 0,
        minimum: 0,
        transition: !0,
        units: 'pixels',
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'line-dasharray': {
        type: 'array',
        value: 'number',
        minimum: 0,
        transition: !0,
        units: 'line widths',
        requires: [{ '!': 'line-pattern' }],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'cross-faded',
      },
      'line-pattern': {
        type: 'resolvedImage',
        transition: !0,
        expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
        'property-type': 'cross-faded-data-driven',
      },
      'line-gradient': {
        type: 'color',
        transition: !1,
        requires: [
          { '!': 'line-dasharray' },
          { '!': 'line-pattern' },
          { source: 'geojson', has: { lineMetrics: !0 } },
        ],
        expression: { interpolated: !0, parameters: ['line-progress'] },
        'property-type': 'color-ramp',
      },
    },
    Mu = {
      'circle-radius': {
        type: 'number',
        default: 5,
        minimum: 0,
        transition: !0,
        units: 'pixels',
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'circle-color': {
        type: 'color',
        default: '#000000',
        transition: !0,
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'circle-blur': {
        type: 'number',
        default: 0,
        transition: !0,
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'circle-opacity': {
        type: 'number',
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: !0,
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'circle-translate': {
        type: 'array',
        value: 'number',
        length: 2,
        default: [0, 0],
        transition: !0,
        units: 'pixels',
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'circle-translate-anchor': {
        type: 'enum',
        values: { map: {}, viewport: {} },
        default: 'map',
        requires: ['circle-translate'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'circle-pitch-scale': {
        type: 'enum',
        values: { map: {}, viewport: {} },
        default: 'map',
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'circle-pitch-alignment': {
        type: 'enum',
        values: { map: {}, viewport: {} },
        default: 'viewport',
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'circle-stroke-width': {
        type: 'number',
        default: 0,
        minimum: 0,
        transition: !0,
        units: 'pixels',
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'circle-stroke-color': {
        type: 'color',
        default: '#000000',
        transition: !0,
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'circle-stroke-opacity': {
        type: 'number',
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: !0,
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
    },
    Ou = {
      'heatmap-radius': {
        type: 'number',
        default: 30,
        minimum: 1,
        transition: !0,
        units: 'pixels',
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'heatmap-weight': {
        type: 'number',
        default: 1,
        minimum: 0,
        transition: !1,
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'heatmap-intensity': {
        type: 'number',
        default: 1,
        minimum: 0,
        transition: !0,
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'heatmap-color': {
        type: 'color',
        default: [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(0, 0, 255, 0)',
          0.1,
          'royalblue',
          0.3,
          'cyan',
          0.5,
          'lime',
          0.7,
          'yellow',
          1,
          'red',
        ],
        transition: !1,
        expression: { interpolated: !0, parameters: ['heatmap-density'] },
        'property-type': 'color-ramp',
      },
      'heatmap-opacity': {
        type: 'number',
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: !0,
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
    },
    Pu = {
      'icon-opacity': {
        type: 'number',
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: !0,
        requires: ['icon-image'],
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'icon-color': {
        type: 'color',
        default: '#000000',
        transition: !0,
        requires: ['icon-image'],
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'icon-halo-color': {
        type: 'color',
        default: 'rgba(0, 0, 0, 0)',
        transition: !0,
        requires: ['icon-image'],
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'icon-halo-width': {
        type: 'number',
        default: 0,
        minimum: 0,
        transition: !0,
        units: 'pixels',
        requires: ['icon-image'],
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'icon-halo-blur': {
        type: 'number',
        default: 0,
        minimum: 0,
        transition: !0,
        units: 'pixels',
        requires: ['icon-image'],
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'icon-translate': {
        type: 'array',
        value: 'number',
        length: 2,
        default: [0, 0],
        transition: !0,
        units: 'pixels',
        requires: ['icon-image'],
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'icon-translate-anchor': {
        type: 'enum',
        values: { map: {}, viewport: {} },
        default: 'map',
        requires: ['icon-image', 'icon-translate'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-opacity': {
        type: 'number',
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: !0,
        requires: ['text-field'],
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'text-color': {
        type: 'color',
        default: '#000000',
        transition: !0,
        overridable: !0,
        requires: ['text-field'],
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'text-halo-color': {
        type: 'color',
        default: 'rgba(0, 0, 0, 0)',
        transition: !0,
        requires: ['text-field'],
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'text-halo-width': {
        type: 'number',
        default: 0,
        minimum: 0,
        transition: !0,
        units: 'pixels',
        requires: ['text-field'],
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'text-show-background': {
        type: 'boolean',
        default: !1,
        transition: !1,
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-halo-blur': {
        type: 'number',
        default: 0,
        minimum: 0,
        transition: !0,
        units: 'pixels',
        requires: ['text-field'],
        expression: {
          interpolated: !0,
          parameters: ['zoom', 'feature', 'feature-state'],
        },
        'property-type': 'data-driven',
      },
      'text-translate': {
        type: 'array',
        value: 'number',
        length: 2,
        default: [0, 0],
        transition: !0,
        units: 'pixels',
        requires: ['text-field'],
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'text-translate-anchor': {
        type: 'enum',
        values: { map: {}, viewport: {} },
        default: 'map',
        requires: ['text-field', 'text-translate'],
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
    },
    zu = {
      'raster-opacity': {
        type: 'number',
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: !0,
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'raster-hue-rotate': {
        type: 'number',
        default: 0,
        period: 360,
        transition: !0,
        units: 'degrees',
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'raster-brightness-min': {
        type: 'number',
        default: 0,
        minimum: 0,
        maximum: 1,
        transition: !0,
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'raster-brightness-max': {
        type: 'number',
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: !0,
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'raster-saturation': {
        type: 'number',
        default: 0,
        minimum: -1,
        maximum: 1,
        transition: !0,
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'raster-contrast': {
        type: 'number',
        default: 0,
        minimum: -1,
        maximum: 1,
        transition: !0,
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'raster-resampling': {
        type: 'enum',
        values: { linear: {}, nearest: {} },
        default: 'linear',
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'raster-fade-duration': {
        type: 'number',
        default: 300,
        minimum: 0,
        transition: !1,
        units: 'milliseconds',
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
    },
    Ru = {
      'hillshade-illumination-direction': {
        type: 'number',
        default: 335,
        minimum: 0,
        maximum: 359,
        transition: !1,
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'hillshade-illumination-anchor': {
        type: 'enum',
        values: { map: {}, viewport: {} },
        default: 'viewport',
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'hillshade-exaggeration': {
        type: 'number',
        default: 0.5,
        minimum: 0,
        maximum: 1,
        transition: !0,
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'hillshade-shadow-color': {
        type: 'color',
        default: '#000000',
        transition: !0,
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'hillshade-highlight-color': {
        type: 'color',
        default: '#FFFFFF',
        transition: !0,
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'hillshade-accent-color': {
        type: 'color',
        default: '#000000',
        transition: !0,
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
    },
    Fu = {
      'background-color': {
        type: 'color',
        default: '#000000',
        transition: !0,
        requires: [{ '!': 'background-pattern' }],
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
      'background-pattern': {
        type: 'resolvedImage',
        transition: !0,
        expression: { interpolated: !1, parameters: ['zoom'] },
        'property-type': 'cross-faded',
      },
      'background-opacity': {
        type: 'number',
        default: 1,
        minimum: 0,
        maximum: 1,
        transition: !0,
        expression: { interpolated: !0, parameters: ['zoom'] },
        'property-type': 'data-constant',
      },
    },
    Cu = {
      duration: {
        type: 'number',
        default: 300,
        minimum: 0,
        units: 'milliseconds',
      },
      delay: { type: 'number', default: 0, minimum: 0, units: 'milliseconds' },
    },
    Du = {
      $version: $s,
      $root: tu,
      sources: eu,
      source: ru,
      source_vector: nu,
      source_raster: iu,
      source_raster_dem: au,
      source_geojson: ou,
      source_video: su,
      source_image: uu,
      layer: lu,
      layout: pu,
      layout_background: cu,
      layout_fill: fu,
      layout_circle: hu,
      layout_heatmap: du,
      'layout_fill-extrusion': {
        visibility: {
          type: 'enum',
          values: { visible: {}, none: {} },
          default: 'visible',
          'property-type': 'constant',
        },
      },
      layout_line: yu,
      layout_symbol: mu,
      layout_raster: vu,
      layout_hillshade: gu,
      filter: xu,
      filter_operator: bu,
      geometry_type: _u,
      function: {
        expression: { type: 'expression' },
        stops: { type: 'array', value: 'function_stop' },
        base: { type: 'number', default: 1, minimum: 0 },
        property: { type: 'string', default: '$zoom' },
        type: {
          type: 'enum',
          values: {
            identity: {},
            exponential: {},
            interval: {},
            categorical: {},
          },
          default: 'exponential',
        },
        colorSpace: {
          type: 'enum',
          values: { rgb: {}, lab: {}, hcl: {} },
          default: 'rgb',
        },
        default: { type: '*', required: !1 },
      },
      function_stop: wu,
      expression: Eu,
      expression_name: Tu,
      light: Au,
      paint: Su,
      paint_fill: Iu,
      'paint_fill-extrusion': {
        'fill-extrusion-opacity': {
          type: 'number',
          default: 1,
          minimum: 0,
          maximum: 1,
          transition: !0,
          expression: { interpolated: !0, parameters: ['zoom'] },
          'property-type': 'data-constant',
        },
        'fill-extrusion-color': {
          type: 'color',
          default: '#000000',
          transition: !0,
          requires: [{ '!': 'fill-extrusion-pattern' }],
          expression: {
            interpolated: !0,
            parameters: ['zoom', 'feature', 'feature-state'],
          },
          'property-type': 'data-driven',
        },
        'fill-extrusion-translate': {
          type: 'array',
          value: 'number',
          length: 2,
          default: [0, 0],
          transition: !0,
          units: 'pixels',
          expression: { interpolated: !0, parameters: ['zoom'] },
          'property-type': 'data-constant',
        },
        'fill-extrusion-translate-anchor': {
          type: 'enum',
          values: { map: {}, viewport: {} },
          default: 'map',
          requires: ['fill-extrusion-translate'],
          expression: { interpolated: !1, parameters: ['zoom'] },
          'property-type': 'data-constant',
        },
        'fill-extrusion-pattern': {
          type: 'resolvedImage',
          transition: !0,
          expression: { interpolated: !1, parameters: ['zoom', 'feature'] },
          'property-type': 'cross-faded-data-driven',
        },
        'fill-extrusion-height': {
          type: 'number',
          default: 0,
          minimum: 0,
          units: 'meters',
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ['zoom', 'feature', 'feature-state'],
          },
          'property-type': 'data-driven',
        },
        'fill-extrusion-base': {
          type: 'number',
          default: 0,
          minimum: 0,
          units: 'meters',
          transition: !0,
          requires: ['fill-extrusion-height'],
          expression: {
            interpolated: !0,
            parameters: ['zoom', 'feature', 'feature-state'],
          },
          'property-type': 'data-driven',
        },
        'fill-extrusion-vertical-gradient': {
          type: 'boolean',
          default: !0,
          transition: !1,
          expression: { interpolated: !1, parameters: ['zoom'] },
          'property-type': 'data-constant',
        },
      },
      paint_line: ku,
      paint_circle: Mu,
      paint_heatmap: Ou,
      paint_symbol: Pu,
      paint_raster: zu,
      paint_hillshade: Ru,
      paint_background: Fu,
      transition: Cu,
      'property-type': {
        'data-driven': { type: 'property-type' },
        'cross-faded': { type: 'property-type' },
        'cross-faded-data-driven': { type: 'property-type' },
        'color-ramp': { type: 'property-type' },
        'data-constant': { type: 'property-type' },
        constant: { type: 'property-type' },
      },
    };
  function Bu() {}
  function Uu(t, e, r) {
    if (t.length > 1) {
      if (Vu(t, e)) return !0;
      for (var n = 0; n < e.length; n++) if (Lu(e[n], t, r)) return !0;
    }
    for (var i = 0; i < t.length; i++) if (Lu(t[i], e, r)) return !0;
    return !1;
  }
  function Vu(t, e) {
    if (0 === t.length || 0 === e.length) return !1;
    for (var r = 0; r < t.length - 1; r++)
      for (var n = t[r], i = t[r + 1], a = 0; a < e.length - 1; a++) {
        if (Nu(n, i, e[a], e[a + 1])) return !0;
      }
    return !1;
  }
  function Nu(t, e, r, n) {
    return (
      Qa.isCounterClockwise(t, r, n) !== Qa.isCounterClockwise(e, r, n) &&
      Qa.isCounterClockwise(t, e, r) !== Qa.isCounterClockwise(t, e, n)
    );
  }
  function Lu(t, e, r) {
    var n = r * r;
    if (1 === e.length) return t.distSqr(e[0]) < n;
    for (var i = 1; i < e.length; i++) {
      var a = e[i - 1],
        o = e[i];
      if (Bu.distToSegmentSquared(t, a, o) < n) return !0;
    }
    return !1;
  }
  function Xu(t, e) {
    for (var r, n, i, a = !1, o = 0; o < t.length; o++)
      for (var s = 0, u = (r = t[o]).length - 1; s < r.length; u = s++)
        (n = r[s]),
          (i = r[u]),
          n.y > e.y != i.y > e.y &&
            e.x < ((i.x - n.x) * (e.y - n.y)) / (i.y - n.y) + n.x &&
            (a = !a);
    return a;
  }
  function qu(t, e) {
    for (var r = !1, n = 0, i = t.length - 1; n < t.length; i = n++) {
      var a = t[n],
        o = t[i];
      a.y > e.y != o.y > e.y &&
        e.x < ((o.x - a.x) * (e.y - a.y)) / (o.y - a.y) + a.x &&
        (r = !r);
    }
    return r;
  }
  (Bu.polygonIntersectsPolygon = function (t, e) {
    for (var r = 0; r < t.length; r++) if (qu(e, t[r])) return !0;
    for (var n = 0; n < e.length; n++) if (qu(t, e[n])) return !0;
    return !!Vu(t, e);
  }),
    (Bu.polygonIntersectsBufferedPoint = function (t, e, r) {
      return !!qu(t, e) || !!Lu(e, t, r);
    }),
    (Bu.polygonIntersectsMultiPolygon = function (t, e) {
      if (1 === t.length) return Xu(e, t[0]);
      for (var r = 0; r < e.length; r++)
        for (var n = e[r], i = 0; i < n.length; i++) if (qu(t, n[i])) return !0;
      for (var a = 0; a < t.length; a++) if (Xu(e, t[a])) return !0;
      for (var o = 0; o < e.length; o++) if (Vu(t, e[o])) return !0;
      return !1;
    }),
    (Bu.polygonIntersectsBufferedMultiLine = function (t, e, r) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        if (t.length >= 3)
          for (var a = 0; a < i.length; a++) if (qu(t, i[a])) return !0;
        if (Uu(t, i, r)) return !0;
      }
      return !1;
    }),
    (Bu.distToSegmentSquared = function (t, e, r) {
      var n = e.distSqr(r);
      if (0 === n) return t.distSqr(e);
      var i = ((t.x - e.x) * (r.x - e.x) + (t.y - e.y) * (r.y - e.y)) / n;
      return i < 0
        ? t.distSqr(e)
        : i > 1
        ? t.distSqr(r)
        : t.distSqr(r.sub(e)._mult(i)._add(e));
    });
  var ju = new js({
      'circle-sort-key': new Vs(Du.layout_circle['circle-sort-key']),
    }),
    Hu = new js({
      'circle-radius': new Vs(Du.paint_circle['circle-radius']),
      'circle-color': new Vs(Du.paint_circle['circle-color']),
      'circle-blur': new Vs(Du.paint_circle['circle-blur']),
      'circle-opacity': new Vs(Du.paint_circle['circle-opacity']),
      'circle-translate': new Us(Du.paint_circle['circle-translate']),
      'circle-translate-anchor': new Us(
        Du.paint_circle['circle-translate-anchor'],
      ),
      'circle-pitch-scale': new Us(Du.paint_circle['circle-pitch-scale']),
      'circle-pitch-alignment': new Us(
        Du.paint_circle['circle-pitch-alignment'],
      ),
      'circle-stroke-width': new Vs(Du.paint_circle['circle-stroke-width']),
      'circle-stroke-color': new Vs(Du.paint_circle['circle-stroke-color']),
      'circle-stroke-opacity': new Vs(Du.paint_circle['circle-stroke-opacity']),
    }),
    Yu = { paint: Hu, layout: ju },
    Qu = (function (e) {
      function r(t) {
        e.call(this, t, Yu);
      }
      return (
        e && (r.__proto__ = e),
        (r.prototype = Object.create(e && e.prototype)),
        (r.prototype.constructor = r),
        (r.prototype.createBucket = function (t) {
          return new Bs(t);
        }),
        (r.prototype.queryRadius = function (t) {
          var e = t;
          return (
            Hs.getMaximumPaintValue('circle-radius', this, e) +
            Hs.getMaximumPaintValue('circle-stroke-width', this, e) +
            Hs.translateDistance(this.paint.get('circle-translate'))
          );
        }),
        (r.prototype.queryIntersectsFeature = function (
          e,
          r,
          n,
          i,
          a,
          o,
          s,
          u,
          l,
        ) {
          u = Wu();
          for (
            var p = Hs.translate(
                e,
                this.paint.get('circle-translate'),
                this.paint.get('circle-translate-anchor'),
                0,
                s,
              ),
              c =
                this.paint.get('circle-radius').evaluate(r, n) +
                this.paint.get('circle-stroke-width').evaluate(r, n),
              f = 'map' === this.paint.get('circle-pitch-alignment'),
              h = f ? p : Gu(p, u),
              d = f ? c * s : c,
              y = 0,
              m = i;
            y < m.length;
            y += 1
          )
            for (var v = 0, g = m[y]; v < g.length; v += 1) {
              var x = g[v],
                b = f ? x : Ku(x, u),
                _ = d;
              Ju([], [x.x, x.y, 0, 1], u);
              if (
                (('viewport' === this.paint.get('circle-pitch-scale') &&
                  'map' === this.paint.get('circle-pitch-alignment')) ||
                  ('map' === this.paint.get('circle-pitch-scale') &&
                    this.paint.get('circle-pitch-alignment')),
                (l = t.defined(l) ? l : 10),
                Bu.polygonIntersectsBufferedPoint(h, b, _ * l))
              )
                return !0;
            }
          return !1;
        }),
        r
      );
    })(Zs);
  function Ku(t, e) {
    var r = Ju([], [t.x, t.y, 0, 1], e);
    return new Fa(r[0], r[1]);
  }
  function Gu(t, e) {
    return t.map(function (t) {
      return Ku(t, e);
    });
  }
  function Wu() {
    var t = new Float32Array(16);
    return (t[0] = 1), (t[5] = 1), (t[10] = 1), (t[15] = 1), t;
  }
  function Ju(t, e, r) {
    var n = e[0],
      i = e[1],
      a = e[2],
      o = r[3] * n + r[7] * i + r[11] * a + r[15];
    return (
      (o = o || 1),
      (t[0] = (r[0] * n + r[4] * i + r[8] * a + r[12]) / o),
      (t[1] = (r[1] * n + r[5] * i + r[9] * a + r[13]) / o),
      (t[2] = (r[2] * n + r[6] * i + r[10] * a + r[14]) / o),
      t
    );
  }
  var Zu = (function (t) {
    function e() {
      t.apply(this, arguments);
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype.possiblyEvaluate = function (t, e, r) {
        if (void 0 === t.value)
          return new Ke(this, { kind: 'constant', value: void 0 }, e);
        if ('constant' === t.expression.kind) {
          var n = t.expression.evaluate(e, null, {}, r),
            i =
              'resolvedImage' === t.property.specification.type &&
              'string' != typeof n
                ? n.name
                : n,
            a = this._calculate(i, i, i, e);
          return new Ke(this, { kind: 'constant', value: a }, e);
        }
        if ('camera' === t.expression.kind) {
          var o = this._calculate(
            t.expression.evaluate({ zoom: e.zoom - 1 }),
            t.expression.evaluate({ zoom: e.zoom }),
            t.expression.evaluate({ zoom: e.zoom + 1 }),
            e,
          );
          return new Ke(this, { kind: 'constant', value: o }, e);
        }
        return new Ke(this, t.expression, e);
      }),
      (e.prototype.evaluate = function (t, e, r, n, i) {
        if ('source' === t.kind) {
          var a = t.evaluate(e, r, n, i);
          return this._calculate(a, a, a, e);
        }
        return 'composite' === t.kind
          ? this._calculate(
              t.evaluate({ zoom: Math.floor(e.zoom) - 1 }, r, n),
              t.evaluate({ zoom: Math.floor(e.zoom) }, r, n),
              t.evaluate({ zoom: Math.floor(e.zoom) + 1 }, r, n),
              e,
            )
          : t.value;
      }),
      (e.prototype._calculate = function (t, e, r, n) {
        return n.zoom > n.zoomHistory.lastIntegerZoom
          ? { from: t, to: e }
          : { from: r, to: e };
      }),
      (e.prototype.interpolate = function (t) {
        return t;
      }),
      e
    );
  })(Vs);
  ke.register('DataDrivenProperty', Vs);
  var $u = new js({ 'fill-sort-key': new Vs(Du.layout_fill['fill-sort-key']) }),
    tl = new js({
      'fill-antialias': new Us(Du.paint_fill['fill-antialias']),
      'fill-opacity': new Vs(Du.paint_fill['fill-opacity']),
      'fill-color': new Vs(Du.paint_fill['fill-color']),
      'fill-outline-color': new Vs(Du.paint_fill['fill-outline-color']),
      'fill-translate': new Us(Du.paint_fill['fill-translate']),
      'fill-translate-anchor': new Us(Du.paint_fill['fill-translate-anchor']),
      'fill-pattern': new Zu(Du.paint_fill['fill-pattern']),
    }),
    el = { paint: tl, layout: $u },
    rl = (function (t) {
      function e(e) {
        t.call(this, e, el);
      }
      return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        (e.prototype.recalculate = function (e, r) {
          t.prototype.recalculate.call(this, e, r);
          var n = this.paint._values['fill-outline-color'];
          'constant' === n.value.kind &&
            void 0 === n.value.value &&
            (this.paint._values['fill-outline-color'] =
              this.paint._values['fill-color']);
        }),
        (e.prototype.createBucket = function (t) {
          return new Aa(t);
        }),
        (e.prototype.queryRadius = function () {
          return Hs.translateDistance(this.paint.get('fill-translate'));
        }),
        (e.prototype.queryIntersectsFeature = function (t, e, r, n, i, a, o) {
          var s = Hs.translate(
            t,
            this.paint.get('fill-translate'),
            this.paint.get('fill-translate-anchor'),
            0,
            o,
          );
          return Bu.polygonIntersectsMultiPolygon(s, n);
        }),
        (e.prototype.isTileClipped = function () {
          return !0;
        }),
        e
      );
    })(Zs),
    nl = function (t) {
      this.specification = t;
    };
  (nl.prototype.possiblyEvaluate = function (t, e, r) {
    if (void 0 !== t.value) {
      if ('constant' === t.expression.kind) {
        var n = t.expression.evaluate(e, null, {}, r);
        return this._calculate(n, n, n, e);
      }
      return this._calculate(
        t.expression.evaluate(
          new EvaluationParameters(Math.floor(e.zoom - 1), e),
        ),
        t.expression.evaluate(new EvaluationParameters(Math.floor(e.zoom), e)),
        t.expression.evaluate(
          new EvaluationParameters(Math.floor(e.zoom + 1), e),
        ),
        e,
      );
    }
  }),
    (nl.prototype._calculate = function (t, e, r, n) {
      return n.zoom > n.zoomHistory.lastIntegerZoom
        ? { from: t, to: e }
        : { from: r, to: e };
    }),
    (nl.prototype.interpolate = function (t) {
      return t;
    }),
    ke.register('CrossFadedProperty', nl);
  var il = function (t) {
    this.specification = t;
  };
  (il.prototype.possiblyEvaluate = function (t, e, r) {
    return !!t.expression.evaluate(e, null, {}, r);
  }),
    (il.prototype.interpolate = function () {
      return !1;
    }),
    ke.register('ColorRampProperty', il);
  var al = new js({
      'line-cap': new Us(Du.layout_line['line-cap']),
      'line-join': new Vs(Du.layout_line['line-join']),
      'line-miter-limit': new Us(Du.layout_line['line-miter-limit']),
      'line-round-limit': new Us(Du.layout_line['line-round-limit']),
      'line-sort-key': new Vs(Du.layout_line['line-sort-key']),
    }),
    ol = new js({
      'line-opacity': new Vs(Du.paint_line['line-opacity']),
      'line-color': new Vs(Du.paint_line['line-color']),
      'line-translate': new Us(Du.paint_line['line-translate']),
      'line-translate-anchor': new Us(Du.paint_line['line-translate-anchor']),
      'line-width': new Vs(Du.paint_line['line-width']),
      'line-gap-width': new Vs(Du.paint_line['line-gap-width']),
      'line-offset': new Vs(Du.paint_line['line-offset']),
      'line-blur': new Vs(Du.paint_line['line-blur']),
      'line-dasharray': new nl(Du.paint_line['line-dasharray']),
      'line-pattern': new Zu(Du.paint_line['line-pattern']),
      'line-gradient': new il(Du.paint_line['line-gradient']),
    }),
    sl = { paint: ol, layout: al },
    ul = (function (t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        (e.prototype.possiblyEvaluate = function (e, r) {
          return (
            (r = new Re(Math.floor(r.zoom), {
              now: r.now,
              fadeDuration: r.fadeDuration,
              zoomHistory: r.zoomHistory,
              transition: r.transition,
            })),
            t.prototype.possiblyEvaluate.call(this, e, r)
          );
        }),
        (e.prototype.evaluate = function (e, r, n, i) {
          return (
            (r = extend({}, r, { zoom: Math.floor(r.zoom) })),
            t.prototype.evaluate.call(this, e, r, n, i)
          );
        }),
        e
      );
    })(Vs),
    ll = new ul(sl.paint.properties['line-width'].specification);
  ll.useIntegerZoom = !0;
  var pl = (function (t) {
    function e(e) {
      t.call(this, e, sl);
    }
    function r(t, e) {
      return e > 0 ? e + 2 * t : t;
    }
    return (
      t && (e.__proto__ = t),
      (e.prototype = Object.create(t && t.prototype)),
      (e.prototype.constructor = e),
      (e.prototype._handleSpecialPaintPropertyUpdate = function (t) {
        'line-gradient' === t && this._updateGradient();
      }),
      (e.prototype._updateGradient = function () {
        var t =
          this._transitionablePaint._values['line-gradient'].value.expression;
        (this.gradient = renderColorRamp(t, 'lineProgress')),
          (this.gradientTexture = null);
      }),
      (e.prototype.recalculate = function (e, r) {
        t.prototype.recalculate.call(this, e, r),
          (this.paint._values['line-floorwidth'] = ll.possiblyEvaluate(
            this._transitioningPaint._values['line-width'].value,
            e,
          ));
      }),
      (e.prototype.createBucket = function (t) {
        return new Ir(t);
      }),
      (e.prototype.queryRadius = function (t) {
        var e = t,
          n = r(
            Hs.getMaximumPaintValue('line-width', this, e),
            Hs.getMaximumPaintValue('line-gap-width', this, e),
          ),
          i = Hs.getMaximumPaintValue('line-offset', this, e);
        return (
          n / 2 +
          Math.abs(i) +
          Hs.translateDistance(this.paint.get('line-translate'))
        );
      }),
      (e.prototype.queryIntersectsFeature = function (t, e, n, i, a, o, s) {
        var u = Hs.translate(
            t,
            this.paint.get('line-translate'),
            this.paint.get('line-translate-anchor'),
            0,
            s,
          ),
          l = r(
            this.paint.get('line-width').evaluate(e, n),
            this.paint.get('line-gap-width').evaluate(e, n),
          ),
          p = (s / 2) * (l = Math.max(l, 5)),
          c = this.paint.get('line-offset').evaluate(e, n);
        return (
          c &&
            (i = (function (t, e) {
              for (var r = [], n = new Fa(0, 0), i = 0; i < t.length; i++) {
                for (var a = t[i], o = [], s = 0; s < a.length; s++) {
                  var u = a[s - 1],
                    l = a[s],
                    p = a[s + 1],
                    c = 0 === s ? n : l.sub(u)._unit()._perp(),
                    f = s === a.length - 1 ? n : p.sub(l)._unit()._perp(),
                    h = c._add(f)._unit(),
                    d = h.x * f.x + h.y * f.y;
                  h._mult(1 / d), o.push(h._mult(e)._add(l));
                }
                r.push(o);
              }
              return r;
            })(i, c * s)),
          Bu.polygonIntersectsBufferedMultiLine(u, i, p)
        );
      }),
      (e.prototype.isTileClipped = function () {
        return !0;
      }),
      e
    );
  })(Zs);
  function cl() {}
  function fl(t) {
    var e = {},
      r = {},
      n = [],
      i = 0;
    function a(e) {
      n.push(t[e]), i++;
    }
    function o(t, e, i) {
      var a = r[t];
      return (
        delete r[t],
        (r[e] = a),
        n[a].geometry[0].pop(),
        (n[a].geometry[0] = n[a].geometry[0].concat(i[0])),
        a
      );
    }
    function s(t, r, i) {
      var a = e[r];
      return (
        delete e[r],
        (e[t] = a),
        n[a].geometry[0].shift(),
        (n[a].geometry[0] = i[0].concat(n[a].geometry[0])),
        a
      );
    }
    function u(t, e, r) {
      var n = r ? e[0][e[0].length - 1] : e[0][0];
      return t + ':' + n.x + ':' + n.y;
    }
    for (var l = 0; l < t.length; l++) {
      var p = t[l],
        c = p.geometry,
        f = p.text ? p.text.toString() : null;
      if (f) {
        var h = u(f, c),
          d = u(f, c, !0);
        if (h in r && d in e && r[h] !== e[d]) {
          var y = s(h, d, c),
            m = o(h, d, n[y].geometry);
          delete e[h],
            delete r[d],
            (r[u(f, n[m].geometry, !0)] = m),
            (n[y].geometry = null);
        } else
          h in r
            ? o(h, d, c)
            : d in e
            ? s(h, d, c)
            : (a(l), (e[h] = i - 1), (r[d] = i - 1));
      } else a(l);
    }
    return n.filter(function (t) {
      return t.geometry;
    });
  }
  (cl.symbolLayoutAttributes = o(
    [
      { name: 'a_pos_offset', components: 4, type: 'Int16' },
      { name: 'a_data', components: 4, type: 'Uint16' },
      { name: 'a_pixeloffset', components: 4, type: 'Int16' },
    ],
    4,
  )),
    (cl.dynamicLayoutAttributes = o(
      [{ name: 'a_projected_pos', components: 3, type: 'Float32' }],
      4,
    )),
    (cl.placementOpacityAttributes = o(
      [{ name: 'a_fade_opacity', components: 1, type: 'Uint32' }],
      4,
    )),
    (cl.collisionVertexAttributes = o([
      { name: 'a_placed', components: 2, type: 'Uint8' },
      { name: 'a_shift', components: 2, type: 'Float32' },
    ])),
    (cl.collisionBox = o([
      { type: 'Int16', name: 'anchorPointX' },
      { type: 'Int16', name: 'anchorPointY' },
      { type: 'Int16', name: 'x1' },
      { type: 'Int16', name: 'y1' },
      { type: 'Int16', name: 'x2' },
      { type: 'Int16', name: 'y2' },
      { type: 'Uint32', name: 'featureIndex' },
      { type: 'Uint16', name: 'sourceLayerIndex' },
      { type: 'Uint16', name: 'bucketIndex' },
      { type: 'Int16', name: 'radius' },
      { type: 'Int16', name: 'signedDistanceFromAnchor' },
    ])),
    (cl.collisionBoxLayout = o(
      [
        { name: 'a_pos', components: 2, type: 'Int16' },
        { name: 'a_anchor_pos', components: 2, type: 'Int16' },
        { name: 'a_extrude', components: 2, type: 'Int16' },
      ],
      4,
    )),
    (cl.collisionCircleLayout = o(
      [
        { name: 'a_pos', components: 2, type: 'Int16' },
        { name: 'a_anchor_pos', components: 2, type: 'Int16' },
        { name: 'a_extrude', components: 2, type: 'Int16' },
      ],
      4,
    )),
    (cl.placement = o([
      { type: 'Int16', name: 'anchorX' },
      { type: 'Int16', name: 'anchorY' },
      { type: 'Uint16', name: 'glyphStartIndex' },
      { type: 'Uint16', name: 'numGlyphs' },
      { type: 'Uint32', name: 'vertexStartIndex' },
      { type: 'Uint32', name: 'lineStartIndex' },
      { type: 'Uint32', name: 'lineLength' },
      { type: 'Uint16', name: 'segment' },
      { type: 'Uint16', name: 'lowerSize' },
      { type: 'Uint16', name: 'upperSize' },
      { type: 'Float32', name: 'lineOffsetX' },
      { type: 'Float32', name: 'lineOffsetY' },
      { type: 'Uint8', name: 'writingMode' },
      { type: 'Uint8', name: 'placedOrientation' },
      { type: 'Uint8', name: 'hidden' },
      { type: 'Uint32', name: 'crossTileID' },
      { type: 'Int16', name: 'associatedIconIndex' },
    ])),
    (cl.symbolInstance = o([
      { type: 'Int16', name: 'anchorX' },
      { type: 'Int16', name: 'anchorY' },
      { type: 'Int16', name: 'rightJustifiedTextSymbolIndex' },
      { type: 'Int16', name: 'centerJustifiedTextSymbolIndex' },
      { type: 'Int16', name: 'leftJustifiedTextSymbolIndex' },
      { type: 'Int16', name: 'verticalPlacedTextSymbolIndex' },
      { type: 'Int16', name: 'placedIconSymbolIndex' },
      { type: 'Int16', name: 'verticalPlacedIconSymbolIndex' },
      { type: 'Uint16', name: 'key' },
      { type: 'Uint16', name: 'textBoxStartIndex' },
      { type: 'Uint16', name: 'textBoxEndIndex' },
      { type: 'Uint16', name: 'verticalTextBoxStartIndex' },
      { type: 'Uint16', name: 'verticalTextBoxEndIndex' },
      { type: 'Uint16', name: 'iconBoxStartIndex' },
      { type: 'Uint16', name: 'iconBoxEndIndex' },
      { type: 'Uint16', name: 'verticalIconBoxStartIndex' },
      { type: 'Uint16', name: 'verticalIconBoxEndIndex' },
      { type: 'Uint16', name: 'featureIndex' },
      { type: 'Uint16', name: 'numHorizontalGlyphVertices' },
      { type: 'Uint16', name: 'numVerticalGlyphVertices' },
      { type: 'Uint16', name: 'numIconVertices' },
      { type: 'Uint16', name: 'numVerticalIconVertices' },
      { type: 'Uint32', name: 'crossTileID' },
      { type: 'Float32', name: 'textBoxScale' },
      { type: 'Float32', components: 2, name: 'textOffset' },
    ])),
    (cl.glyphOffset = o([{ type: 'Float32', name: 'offsetX' }])),
    (cl.lineVertex = o([
      { type: 'Int16', name: 'x' },
      { type: 'Int16', name: 'y' },
      { type: 'Int16', name: 'tileUnitDistanceFromAnchor' },
    ]));
  var hl = function () {};
  function dl(t) {
    for (var e = 0, r = t; e < r.length; e += 1) {
      if (0 !== r[e].positionedGlyphs.length) return !1;
    }
    return !0;
  }
  hl.WritingMode = { horizontal: 1, vertical: 2, horizontalOnly: 3 };
  var yl = 57344,
    ml = 63743,
    vl = function () {
      (this.scale = 1), (this.fontStack = ''), (this.imageName = null);
    };
  (vl.forText = function (t, e) {
    var r = new vl();
    return (r.scale = t || 1), (r.fontStack = e), r;
  }),
    (vl.forImage = function (t) {
      var e = new vl();
      return (e.imageName = t), e;
    });
  var gl = function () {
    (this.text = ''),
      (this.sectionIndex = []),
      (this.sections = []),
      (this.imageSectionID = null);
  };
  function xl(t, e) {
    for (var r = [], n = t.text, i = 0, a = 0, o = e; a < o.length; a += 1) {
      var s = o[a];
      r.push(t.substring(i, s)), (i = s);
    }
    return i < n.length && r.push(t.substring(i, n.length)), r;
  }
  (gl.fromFeature = function (t, e) {
    for (var r = new gl(), n = 0; n < t.sections.length; n++) {
      var i = t.sections[n];
      i.image ? r.addImageSection(i) : r.addTextSection(i, e);
    }
    return r;
  }),
    (gl.prototype.length = function () {
      return this.text.length;
    }),
    (gl.prototype.getSection = function (t) {
      return this.sections[this.sectionIndex[t]];
    }),
    (gl.prototype.getSectionIndex = function (t) {
      return this.sectionIndex[t];
    }),
    (gl.prototype.getCharCode = function (t) {
      return this.text.charCodeAt(t);
    }),
    (gl.prototype.verticalizePunctuation = function () {}),
    (gl.prototype.trim = function () {
      for (
        var t = 0, e = 0;
        e < this.text.length && bl[this.text.charCodeAt(e)];
        e++
      )
        t++;
      for (
        var r = this.text.length, n = this.text.length - 1;
        n >= 0 && n >= t && bl[this.text.charCodeAt(n)];
        n--
      )
        r--;
      (this.text = this.text.substring(t, r)),
        (this.sectionIndex = this.sectionIndex.slice(t, r));
    }),
    (gl.prototype.substring = function (t, e) {
      var r = new gl();
      return (
        (r.text = this.text.substring(t, e)),
        (r.sectionIndex = this.sectionIndex.slice(t, e)),
        (r.sections = this.sections),
        r
      );
    }),
    (gl.prototype.toString = function () {
      return this.text;
    }),
    (gl.prototype.getMaxScale = function () {
      var t = this;
      return this.sectionIndex.reduce(function (e, r) {
        return Math.max(e, t.sections[r].scale);
      }, 0);
    }),
    (gl.prototype.addTextSection = function (t, e) {
      (this.text += t.text),
        this.sections.push(vl.forText(t.scale, t.fontStack || e));
      for (var r = this.sections.length - 1, n = 0; n < t.text.length; ++n)
        this.sectionIndex.push(r);
    }),
    (gl.prototype.addImageSection = function (t) {
      var e = t.image ? t.image.name : '';
      if (0 !== e.length) {
        var r = this.getNextImageSectionCharCode();
        r &&
          ((this.text += String.fromCharCode(r)),
          this.sections.push(vl.forImage(e)),
          this.sectionIndex.push(this.sections.length - 1));
      }
    }),
    (gl.prototype.getNextImageSectionCharCode = function () {
      return this.imageSectionID
        ? this.imageSectionID >= ml
          ? null
          : ++this.imageSectionID
        : ((this.imageSectionID = yl), this.imageSectionID);
    }),
    (hl.shapeText = function (t, e, r, n, i, a, o, s, u, l, p, c, f, h, d, y) {
      var m = gl.fromFeature(t, i);
      c === hl.WritingMode.vertical && m.verticalizePunctuation(),
        xl(m, void 0);
      var v = [],
        g = {
          positionedLines: v,
          text: m.toString(),
          top: p[1],
          bottom: p[1],
          left: p[0],
          right: p[0],
          writingMode: c,
          iconsInText: !1,
          verticalizable: !1,
        };
      return !dl(v) && g;
    });
  var bl = {};
  function _l(t) {
    var e = 0.5,
      r = 0.5;
    switch (t) {
      case 'right':
      case 'top-right':
      case 'bottom-right':
        e = 1;
        break;
      case 'left':
      case 'top-left':
      case 'bottom-left':
        e = 0;
    }
    switch (t) {
      case 'bottom':
      case 'bottom-right':
      case 'bottom-left':
        r = 1;
        break;
      case 'top':
      case 'top-right':
      case 'top-left':
        r = 0;
    }
    return { horizontalAlign: e, verticalAlign: r };
  }
  (bl[9] = !0),
    (bl[10] = !0),
    (bl[11] = !0),
    (bl[12] = !0),
    (bl[13] = !0),
    (bl[32] = !0),
    (hl.shapeIcon = function (t, e, r) {
      var n = _l(r),
        i = n.horizontalAlign,
        a = n.verticalAlign,
        o = e[0],
        s = e[1],
        u = o - t.displaySize[0] * i,
        l = u + t.displaySize[0],
        p = s - t.displaySize[1] * a;
      return {
        image: t,
        top: p,
        bottom: p + t.displaySize[1],
        left: u,
        right: l,
      };
    }),
    (hl.fitIconToText = function (t, e, r, n, i, a) {
      var o,
        s = t.image;
      if (s.content) {
        var u = s.content,
          l = s.pixelRatio || 1;
        o = [
          u[0] / l,
          u[1] / l,
          s.displaySize[0] - u[2] / l,
          s.displaySize[1] - u[3] / l,
        ];
      }
      var p,
        c,
        f,
        h,
        d = e.left * a,
        y = e.right * a;
      'width' === r || 'both' === r
        ? ((h = i[0] + d - n[3]), (c = i[0] + y + n[1]))
        : (c = (h = i[0] + (d + y - s.displaySize[0]) / 2) + s.displaySize[0]);
      var m = e.top * a,
        v = e.bottom * a;
      return (
        'height' === r || 'both' === r
          ? ((p = i[1] + m - n[0]), (f = i[1] + v + n[2]))
          : (f =
              (p = i[1] + (m + v - s.displaySize[1]) / 2) + s.displaySize[1]),
        { image: s, top: p, right: c, bottom: f, left: h, collisionPadding: o }
      );
    });
  var wl = 128;
  function El(t, e) {
    var r = e.expression;
    if ('constant' === r.kind)
      return { kind: 'constant', layoutSize: r.evaluate(new Re(t + 1)) };
    if ('source' === r.kind) return { kind: 'source' };
    for (
      var n = r.zoomStops, i = r.interpolationType, a = 0;
      a < n.length && n[a] <= t;

    )
      a++;
    for (var o = (a = Math.max(0, a - 1)); o < n.length && n[o] < t + 1; ) o++;
    o = Math.min(n.length - 1, o);
    var s = n[a],
      u = n[o];
    return 'composite' === r.kind
      ? { kind: 'composite', minZoom: s, maxZoom: u, interpolationType: i }
      : {
          kind: 'camera',
          minZoom: s,
          maxZoom: u,
          minSize: r.evaluate(new Re(s)),
          maxSize: r.evaluate(new Re(u)),
          interpolationType: i,
        };
  }
  function Tl(t, e, r) {
    var n = e.uSize,
      i = e.uSizeT,
      a = r.lowerSize,
      o = r.upperSize;
    return 'source' === t.kind
      ? a / wl
      : 'composite' === t.kind
      ? number(a / wl, o / wl, i)
      : n;
  }
  function Al(t, e) {
    var r = 0,
      n = 0;
    if ('constant' === t.kind) n = t.layoutSize;
    else if ('source' !== t.kind) {
      t.interpolationType, t.minZoom, t.maxZoom;
      'camera' === t.kind ? (n = number(t.minSize, t.maxSize, 0)) : (r = 0);
    }
    return { uSizeT: r, uSize: n };
  }
  var Sl = Object.freeze({
    __proto__: null,
    getSizeData: El,
    evaluateSizeForFeature: Tl,
    evaluateSizeForZoom: Al,
    SIZE_PACK_FACTOR: wl,
  });
  function Il(t, e, r) {
    var n = e.layout.get('text-transform').evaluate(r, {});
    return (
      'uppercase' === n
        ? (t = t.toLocaleUpperCase())
        : 'lowercase' === n && (t = t.toLocaleLowerCase()),
      t
    );
  }
  function kl(t, e, r) {
    return (
      t.sections.forEach(function (t) {
        t.text = Il(t.text, e, r);
      }),
      t
    );
  }
  var Ml = {
      'Latin-1 Supplement': function (t) {
        return t >= 128 && t <= 255;
      },
      Arabic: function (t) {
        return t >= 1536 && t <= 1791;
      },
      'Arabic Supplement': function (t) {
        return t >= 1872 && t <= 1919;
      },
      'Arabic Extended-A': function (t) {
        return t >= 2208 && t <= 2303;
      },
      'Hangul Jamo': function (t) {
        return t >= 4352 && t <= 4607;
      },
      'Unified Canadian Aboriginal Syllabics': function (t) {
        return t >= 5120 && t <= 5759;
      },
      Khmer: function (t) {
        return t >= 6016 && t <= 6143;
      },
      'Unified Canadian Aboriginal Syllabics Extended': function (t) {
        return t >= 6320 && t <= 6399;
      },
      'General Punctuation': function (t) {
        return t >= 8192 && t <= 8303;
      },
      'Letterlike Symbols': function (t) {
        return t >= 8448 && t <= 8527;
      },
      'Number Forms': function (t) {
        return t >= 8528 && t <= 8591;
      },
      'Miscellaneous Technical': function (t) {
        return t >= 8960 && t <= 9215;
      },
      'Control Pictures': function (t) {
        return t >= 9216 && t <= 9279;
      },
      'Optical Character Recognition': function (t) {
        return t >= 9280 && t <= 9311;
      },
      'Enclosed Alphanumerics': function (t) {
        return t >= 9312 && t <= 9471;
      },
      'Geometric Shapes': function (t) {
        return t >= 9632 && t <= 9727;
      },
      'Miscellaneous Symbols': function (t) {
        return t >= 9728 && t <= 9983;
      },
      'Miscellaneous Symbols and Arrows': function (t) {
        return t >= 11008 && t <= 11263;
      },
      'CJK Radicals Supplement': function (t) {
        return t >= 11904 && t <= 12031;
      },
      'Kangxi Radicals': function (t) {
        return t >= 12032 && t <= 12255;
      },
      'Ideographic Description Characters': function (t) {
        return t >= 12272 && t <= 12287;
      },
      'CJK Symbols and Punctuation': function (t) {
        return t >= 12288 && t <= 12351;
      },
      Hiragana: function (t) {
        return t >= 12352 && t <= 12447;
      },
      Katakana: function (t) {
        return t >= 12448 && t <= 12543;
      },
      Bopomofo: function (t) {
        return t >= 12544 && t <= 12591;
      },
      'Hangul Compatibility Jamo': function (t) {
        return t >= 12592 && t <= 12687;
      },
      Kanbun: function (t) {
        return t >= 12688 && t <= 12703;
      },
      'Bopomofo Extended': function (t) {
        return t >= 12704 && t <= 12735;
      },
      'CJK Strokes': function (t) {
        return t >= 12736 && t <= 12783;
      },
      'Katakana Phonetic Extensions': function (t) {
        return t >= 12784 && t <= 12799;
      },
      'Enclosed CJK Letters and Months': function (t) {
        return t >= 12800 && t <= 13055;
      },
      'CJK Compatibility': function (t) {
        return t >= 13056 && t <= 13311;
      },
      'CJK Unified Ideographs Extension A': function (t) {
        return t >= 13312 && t <= 19903;
      },
      'Yijing Hexagram Symbols': function (t) {
        return t >= 19904 && t <= 19967;
      },
      'CJK Unified Ideographs': function (t) {
        return t >= 19968 && t <= 40959;
      },
      'Yi Syllables': function (t) {
        return t >= 40960 && t <= 42127;
      },
      'Yi Radicals': function (t) {
        return t >= 42128 && t <= 42191;
      },
      'Hangul Jamo Extended-A': function (t) {
        return t >= 43360 && t <= 43391;
      },
      'Hangul Syllables': function (t) {
        return t >= 44032 && t <= 55215;
      },
      'Hangul Jamo Extended-B': function (t) {
        return t >= 55216 && t <= 55295;
      },
      'Private Use Area': function (t) {
        return t >= 57344 && t <= 63743;
      },
      'CJK Compatibility Ideographs': function (t) {
        return t >= 63744 && t <= 64255;
      },
      'Arabic Presentation Forms-A': function (t) {
        return t >= 64336 && t <= 65023;
      },
      'Vertical Forms': function (t) {
        return t >= 65040 && t <= 65055;
      },
      'CJK Compatibility Forms': function (t) {
        return t >= 65072 && t <= 65103;
      },
      'Small Form Variants': function (t) {
        return t >= 65104 && t <= 65135;
      },
      'Arabic Presentation Forms-B': function (t) {
        return t >= 65136 && t <= 65279;
      },
      'Halfwidth and Fullwidth Forms': function (t) {
        return t >= 65280 && t <= 65519;
      },
    },
    Ol = function () {};
  function Pl(t) {
    return (
      !Ml.Arabic(t) &&
      !Ml['Arabic Supplement'](t) &&
      !Ml['Arabic Extended-A'](t) &&
      !Ml['Arabic Presentation Forms-A'](t) &&
      !Ml['Arabic Presentation Forms-B'](t)
    );
  }
  function zl(t) {
    return (
      746 === t ||
      747 === t ||
      (!(t < 4352) &&
        (!!Ml['Bopomofo Extended'](t) ||
          !!Ml.Bopomofo(t) ||
          !(!Ml['CJK Compatibility Forms'](t) || (t >= 65097 && t <= 65103)) ||
          !!Ml['CJK Compatibility Ideographs'](t) ||
          !!Ml['CJK Compatibility'](t) ||
          !!Ml['CJK Radicals Supplement'](t) ||
          !!Ml['CJK Strokes'](t) ||
          !(
            !Ml['CJK Symbols and Punctuation'](t) ||
            (t >= 12296 && t <= 12305) ||
            (t >= 12308 && t <= 12319) ||
            12336 === t
          ) ||
          !!Ml['CJK Unified Ideographs Extension A'](t) ||
          !!Ml['CJK Unified Ideographs'](t) ||
          !!Ml['Enclosed CJK Letters and Months'](t) ||
          !!Ml['Hangul Compatibility Jamo'](t) ||
          !!Ml['Hangul Jamo Extended-A'](t) ||
          !!Ml['Hangul Jamo Extended-B'](t) ||
          !!Ml['Hangul Jamo'](t) ||
          !!Ml['Hangul Syllables'](t) ||
          !!Ml.Hiragana(t) ||
          !!Ml['Ideographic Description Characters'](t) ||
          !!Ml.Kanbun(t) ||
          !!Ml['Kangxi Radicals'](t) ||
          !!Ml['Katakana Phonetic Extensions'](t) ||
          !(!Ml.Katakana(t) || 12540 === t) ||
          !(
            !Ml['Halfwidth and Fullwidth Forms'](t) ||
            65288 === t ||
            65289 === t ||
            65293 === t ||
            (t >= 65306 && t <= 65310) ||
            65339 === t ||
            65341 === t ||
            65343 === t ||
            (t >= 65371 && t <= 65503) ||
            65507 === t ||
            (t >= 65512 && t <= 65519)
          ) ||
          !(
            !Ml['Small Form Variants'](t) ||
            (t >= 65112 && t <= 65118) ||
            (t >= 65123 && t <= 65126)
          ) ||
          !!Ml['Unified Canadian Aboriginal Syllabics'](t) ||
          !!Ml['Unified Canadian Aboriginal Syllabics Extended'](t) ||
          !!Ml['Vertical Forms'](t) ||
          !!Ml['Yijing Hexagram Symbols'](t) ||
          !!Ml['Yi Syllables'](t) ||
          !!Ml['Yi Radicals'](t)))
    );
  }
  function Rl(t) {
    return (
      (t >= 1424 && t <= 2303) ||
      Ml['Arabic Presentation Forms-A'](t) ||
      Ml['Arabic Presentation Forms-B'](t)
    );
  }
  (Ol.allowsVerticalWritingMode = function (t) {
    for (var e = 0, r = t; e < r.length; e += 1) {
      if (zl(r[e].charCodeAt(0))) return !0;
    }
    return !1;
  }),
    (Ol.allowsLetterSpacing = function (t) {
      for (var e = 0, r = t; e < r.length; e += 1) {
        if (!Pl(r[e].charCodeAt(0))) return !1;
      }
      return !0;
    }),
    (Ol.stringContainsRTLText = function (t) {
      for (var e = 0, r = t; e < r.length; e += 1) {
        if (Rl(r[e].charCodeAt(0))) return !0;
      }
      return !1;
    });
  var Fl = ['Unknown', 'Point', 'LineString', 'Polygon'],
    Cl = [{ name: 'a_fade_opacity', components: 1, type: 'Uint8', offset: 0 }];
  function Dl(t, e, r, n, i, a, o, s, u, l, p, c, f) {
    var h = s ? Math.min(MAX_PACKED_SIZE, Math.round(s[0])) : 0,
      d = s ? Math.min(MAX_PACKED_SIZE, Math.round(s[1])) : 0;
    t.emplaceBack(
      e,
      r,
      Math.round(32 * n),
      Math.round(32 * i),
      a,
      o,
      (h << 1) + (u ? 1 : 0),
      d,
      16 * l,
      16 * p,
      256 * c,
      256 * f,
    );
  }
  function Bl(t, e, r) {
    t.emplaceBack(e.x, e.y, r),
      t.emplaceBack(e.x, e.y, r),
      t.emplaceBack(e.x, e.y, r),
      t.emplaceBack(e.x, e.y, r);
  }
  function Ul(t) {
    for (var e = 0, r = t.sections; e < r.length; e += 1) {
      var n = r[e];
      if (Ol.stringContainsRTLText(n.text)) return !0;
    }
    return !1;
  }
  var Vl = function (t) {
    (this.layoutVertexArray = new StructArrayLayout4i4ui4i24()),
      (this.indexArray = new je()),
      (this.programConfigurations = t),
      (this.segments = new Ve()),
      (this.dynamicLayoutVertexArray = new StructArrayLayout3f12()),
      (this.opacityVertexArray = new StructArrayLayout1ul4()),
      (this.placedSymbolArray = new PlacedSymbolArray());
  };
  (Vl.prototype.upload = function (t, e, r, n) {
    r &&
      ((this.layoutVertexBuffer = t.createVertexBuffer(
        this.layoutVertexArray,
        cl.symbolLayoutAttributes.members,
      )),
      (this.indexBuffer = t.createIndexBuffer(this.indexArray, e)),
      (this.dynamicLayoutVertexBuffer = t.createVertexBuffer(
        this.dynamicLayoutVertexArray,
        cl.dynamicLayoutAttributes.members,
        !0,
      )),
      (this.opacityVertexBuffer = t.createVertexBuffer(
        this.opacityVertexArray,
        Cl,
        !0,
      )),
      (this.opacityVertexBuffer.itemSize = 1)),
      (r || n) && this.programConfigurations.upload(t);
  }),
    (Vl.prototype.destroy = function () {
      this.layoutVertexBuffer &&
        (this.layoutVertexBuffer.destroy(),
        this.indexBuffer.destroy(),
        this.programConfigurations.destroy(),
        this.segments.destroy(),
        this.dynamicLayoutVertexBuffer.destroy(),
        this.opacityVertexBuffer.destroy());
    }),
    (Vl.prototype.clear = function () {}),
    ke.register('SymbolBuffers', Vl);
  var Nl = function (t, e, r) {
    (this.layoutVertexArray = new t()),
      (this.layoutAttributes = e),
      (this.indexArray = new r()),
      (this.segments = new Ve()),
      (this.collisionVertexArray = new StructArrayLayout2ub2f12());
  };
  (Nl.prototype.upload = function (t) {
    (this.layoutVertexBuffer = t.createVertexBuffer(
      this.layoutVertexArray,
      this.layoutAttributes,
    )),
      (this.indexBuffer = t.createIndexBuffer(this.indexArray)),
      (this.collisionVertexBuffer = t.createVertexBuffer(
        this.collisionVertexArray,
        collisionVertexAttributes.members,
        !0,
      ));
  }),
    (Nl.prototype.destroy = function () {
      this.layoutVertexBuffer &&
        (this.layoutVertexBuffer.destroy(),
        this.indexBuffer.destroy(),
        this.segments.destroy(),
        this.collisionVertexBuffer.destroy());
    }),
    ke.register('CollisionBuffers', Nl);
  var Ll = function (t) {
    (this.collisionBoxArray = t.collisionBoxArray),
      (this.zoom = t.zoom),
      (this.overscaling = t.overscaling),
      (this.layers = t.layers),
      (this.layerIds = this.layers.map(function (t) {
        return t.id;
      })),
      (this.index = t.index),
      (this.pixelRatio = t.pixelRatio),
      (this.sourceLayerIndex = t.sourceLayerIndex),
      (this.hasPattern = !1),
      (this.hasPaintOverrides = !1),
      (this.hasRTLText = !1);
    var e = this.layers[0]._unevaluatedLayout._values;
    (this.textSizeData = Sl.getSizeData(this.zoom, e['text-size'])),
      (this.iconSizeData = Sl.getSizeData(this.zoom, e['icon-size']));
    var r = this.layers[0].layout,
      n = r.get('symbol-sort-key'),
      i = r.get('symbol-z-order');
    this.sortFeaturesByKey = 'viewport-y' !== i && void 0 !== n.constantOr(1);
    var a = 'viewport-y' === i || ('auto' === i && !this.sortFeaturesByKey);
    (this.sortFeaturesByY =
      a &&
      (r.get('text-allow-overlap') ||
        r.get('icon-allow-overlap') ||
        r.get('text-ignore-placement') ||
        r.get('icon-ignore-placement'))),
      'point' === r.get('symbol-placement') &&
        (this.writingModes = r.get('text-writing-mode').map(function (t) {
          return hl.WritingMode[t];
        })),
      (this.stateDependentLayerIds = this.layers
        .filter(function (t) {
          return t.isStateDependent();
        })
        .map(function (t) {
          return t.id;
        })),
      (this.sourceID = t.sourceID);
  };
  (Ll.prototype.createArrays = function () {}),
    (Ll.prototype.calculateGlyphDependencies = function (t, e, r, n, i) {
      for (var a = 0; a < t.length; a++) e[t.charCodeAt(a)] = !0;
    }),
    (Ll.prototype.populate = function (t, e) {
      var r = this.layers[0],
        n = r.layout,
        i = n.get('text-font'),
        a = n.get('text-field'),
        o = n.get('icon-image'),
        s =
          ('constant' !== a.value.kind ||
            (a.value.value instanceof X && !a.value.value.isEmpty()) ||
            a.value.value.toString().length > 0) &&
          ('constant' !== i.value.kind || i.value.value.length > 0),
        u =
          ('constant' !== o.value.kind || !!o.value.value) &&
          Object.keys(o.parameters).length > 0,
        l = n.get('symbol-sort-key');
      if (((this.features = []), s || u)) {
        for (
          var p = e.iconDependencies,
            c = e.glyphDependencies,
            f = e.availableImages,
            h = new Re(this.zoom),
            d = 0,
            y = t;
          d < y.length;
          d += 1
        ) {
          var m = y[d],
            v = m.feature,
            g = m.index,
            x = m.sourceLayerIndex;
          if (r._featureFilter(h, v)) {
            var b = void 0;
            if (s) {
              var _ = r.getValueAndResolveTokens('text-field', v, f),
                w = X.factory(_);
              Ul(w) && (this.hasRTLText = !0),
                (!this.hasRTLText ||
                  'unavailable' === getRTLTextPluginStatus() ||
                  (this.hasRTLText && plugin.isParsed())) &&
                  (b = kl(w, r, v));
            }
            var E = void 0;
            if (u) {
              var T = r.getValueAndResolveTokens('icon-image', v, f);
              E = T instanceof q ? T : q.fromString(T);
            }
            if (b || E) {
              var A = this.sortFeaturesByKey ? l.evaluate(v, {}) : void 0,
                S = {
                  text: b,
                  icon: E,
                  index: g,
                  sourceLayerIndex: x,
                  geometry: Ue(v),
                  properties: v.properties,
                  type: Fl[v.type],
                  sortKey: A,
                };
              if (
                (void 0 !== v.id && (S.id = v.id),
                this.features.push(S),
                E && (p[E.name] = !0),
                b)
              ) {
                var I = i.evaluate(v, {}).join(','),
                  k =
                    'map' === n.get('text-rotation-alignment') &&
                    'point' !== n.get('symbol-placement');
                this.allowVerticalPlacement =
                  this.writingModes &&
                  this.writingModes.indexOf(hl.WritingMode.vertical) >= 0;
                for (var M = 0, O = b.sections; M < O.length; M += 1) {
                  var P = O[M];
                  if (P.image) p[P.image.name] = !0;
                  else {
                    var z = Ol.allowsVerticalWritingMode(b.toString()),
                      R = P.fontStack || I,
                      F = (c[R] = c[R] || {});
                    this.calculateGlyphDependencies(
                      P.text,
                      F,
                      k,
                      this.allowVerticalPlacement,
                      z,
                    );
                  }
                }
              }
            }
          }
        }
        'line' === n.get('symbol-placement') &&
          (this.features = fl(this.features)),
          this.sortFeaturesByKey &&
            this.features.sort(function (t, e) {
              return t.sortKey - e.sortKey;
            });
      }
    }),
    (Ll.prototype.update = function (t, e, r) {
      this.stateDependentLayers.length &&
        (this.text.programConfigurations.updatePaintArrays(
          t,
          e,
          this.layers,
          r,
        ),
        this.icon.programConfigurations.updatePaintArrays(
          t,
          e,
          this.layers,
          r,
        ));
    }),
    (Ll.prototype.isEmpty = function () {
      return 0 === this.symbolInstances.length && !this.hasRTLText;
    }),
    (Ll.prototype.uploadPending = function () {
      return (
        !this.uploaded ||
        this.text.programConfigurations.needsUpload ||
        this.icon.programConfigurations.needsUpload
      );
    }),
    (Ll.prototype.upload = function (t) {}),
    (Ll.prototype.destroy = function () {}),
    (Ll.prototype.clear = function () {}),
    (Ll.prototype.addToLineVertexArray = function (t, e) {
      var r = this.lineVertexArray.length;
      if (void 0 !== t.segment) {
        for (
          var n = t.dist(e[t.segment + 1]),
            i = t.dist(e[t.segment]),
            a = {},
            o = t.segment + 1;
          o < e.length;
          o++
        )
          (a[o] = { x: e[o].x, y: e[o].y, tileUnitDistanceFromAnchor: n }),
            o < e.length - 1 && (n += e[o + 1].dist(e[o]));
        for (var s = t.segment || 0; s >= 0; s--)
          (a[s] = { x: e[s].x, y: e[s].y, tileUnitDistanceFromAnchor: i }),
            s > 0 && (i += e[s - 1].dist(e[s]));
        for (var u = 0; u < e.length; u++) {
          var l = a[u];
          this.lineVertexArray.emplaceBack(
            l.x,
            l.y,
            l.tileUnitDistanceFromAnchor,
          );
        }
      }
      return { lineStartIndex: r, lineLength: this.lineVertexArray.length - r };
    }),
    (Ll.prototype.addSymbols = function (t, e, r, n, i, a, o, s, u, l, p) {
      var c = this,
        f = t.indexArray,
        h = t.layoutVertexArray,
        d = t.dynamicLayoutVertexArray,
        y = t.segments.prepareSegment(
          4 * e.length,
          t.layoutVertexArray,
          t.indexArray,
          a.sortKey,
        ),
        m = this.glyphOffsetArray.length,
        v = y.vertexLength,
        g =
          this.allowVerticalPlacement && o === hl.WritingMode.vertical
            ? Math.PI / 2
            : 0,
        x = function (t) {
          var e = t.tl,
            n = t.tr,
            i = t.bl,
            a = t.br,
            o = t.tex,
            u = t.pixelOffsetTL,
            l = t.pixelOffsetBR,
            p = t.minFontScaleX,
            m = t.minFontScaleY,
            v = y.vertexLength,
            x = t.glyphOffset[1];
          Dl(h, s.x, s.y, e.x, x + e.y, o.x, o.y, r, t.isSDF, u.x, u.y, p, m),
            Dl(
              h,
              s.x,
              s.y,
              n.x,
              x + n.y,
              o.x + o.w,
              o.y,
              r,
              t.isSDF,
              l.x,
              u.y,
              p,
              m,
            ),
            Dl(
              h,
              s.x,
              s.y,
              i.x,
              x + i.y,
              o.x,
              o.y + o.h,
              r,
              t.isSDF,
              u.x,
              l.y,
              p,
              m,
            ),
            Dl(
              h,
              s.x,
              s.y,
              a.x,
              x + a.y,
              o.x + o.w,
              o.y + o.h,
              r,
              t.isSDF,
              l.x,
              l.y,
              p,
              m,
            ),
            Bl(d, s, g),
            f.emplaceBack(v, v + 1, v + 2),
            f.emplaceBack(v + 1, v + 2, v + 3),
            (y.vertexLength += 4),
            (y.primitiveLength += 2),
            c.glyphOffsetArray.emplaceBack(t.glyphOffset[0]);
        };
      if (a.text && a.text.sections) {
        var b = a.text.sections;
        if (this.hasPaintOverrides) {
          for (
            var _,
              w = function (e, r) {
                void 0 === _ ||
                  (_ === e && !r) ||
                  t.programConfigurations.populatePaintArrays(
                    t.layoutVertexArray.length,
                    a,
                    a.index,
                    {},
                    b[_],
                  ),
                  (_ = e);
              },
              E = 0,
              T = e;
            E < T.length;
            E += 1
          ) {
            var A = T[E];
            w(A.sectionIndex, !1), x(A);
          }
          w(_, !0);
        } else {
          for (var S = 0, I = e; S < I.length; S += 1) {
            x(I[S]);
          }
          t.programConfigurations.populatePaintArrays(
            t.layoutVertexArray.length,
            a,
            a.index,
            {},
            b[0],
          );
        }
      } else {
        for (var k = 0, M = e; k < M.length; k += 1) {
          x(M[k]);
        }
        t.programConfigurations.populatePaintArrays(
          t.layoutVertexArray.length,
          a,
          a.index,
          {},
        );
      }
      t.placedSymbolArray.emplaceBack(
        s.x,
        s.y,
        m,
        this.glyphOffsetArray.length - m,
        v,
        u,
        l,
        s.segment,
        r ? r[0] : 0,
        r ? r[1] : 0,
        n[0],
        n[1],
        o,
        0,
        !1,
        0,
        p,
      );
    }),
    (Ll.prototype._addCollisionDebugVertex = function (t, e, r, n, i, a) {
      return (
        e.emplaceBack(0, 0),
        t.emplaceBack(r.x, r.y, n, i, Math.round(a.x), Math.round(a.y))
      );
    }),
    (Ll.prototype.addCollisionDebugVertices = function (
      t,
      e,
      r,
      n,
      i,
      a,
      o,
      s,
    ) {
      var u = i.segments.prepareSegment(4, i.layoutVertexArray, i.indexArray),
        l = u.vertexLength,
        p = i.layoutVertexArray,
        c = i.collisionVertexArray,
        f = o.anchorX,
        h = o.anchorY;
      if (
        (this._addCollisionDebugVertex(p, c, a, f, h, new pointGeometry(t, e)),
        this._addCollisionDebugVertex(p, c, a, f, h, new pointGeometry(r, e)),
        this._addCollisionDebugVertex(p, c, a, f, h, new pointGeometry(r, n)),
        this._addCollisionDebugVertex(p, c, a, f, h, new pointGeometry(t, n)),
        (u.vertexLength += 4),
        s)
      ) {
        var d = i.indexArray;
        d.emplaceBack(l, l + 1, l + 2),
          d.emplaceBack(l, l + 2, l + 3),
          (u.primitiveLength += 2);
      } else {
        var y = i.indexArray;
        y.emplaceBack(l, l + 1),
          y.emplaceBack(l + 1, l + 2),
          y.emplaceBack(l + 2, l + 3),
          y.emplaceBack(l + 3, l),
          (u.primitiveLength += 4);
      }
    }),
    (Ll.prototype.addDebugCollisionBoxes = function (t, e, r, n) {
      for (var i = t; i < e; i++) {
        var a = this.collisionBoxArray.get(i),
          o = a.x1,
          s = a.y1,
          u = a.x2,
          l = a.y2,
          p = a.radius > 0;
        this.addCollisionDebugVertices(
          o,
          s,
          u,
          l,
          p
            ? n
              ? this.textCollisionCircle
              : this.iconCollisionCircle
            : n
            ? this.textCollisionBox
            : this.iconCollisionBox,
          a.anchorPoint,
          r,
          p,
        );
      }
    }),
    (Ll.prototype.generateCollisionDebugBuffers = function () {
      for (var t = 0; t < this.symbolInstances.length; t++) {
        var e = this.symbolInstances.get(t);
        this.addDebugCollisionBoxes(
          e.textBoxStartIndex,
          e.textBoxEndIndex,
          e,
          !0,
        ),
          this.addDebugCollisionBoxes(
            e.verticalTextBoxStartIndex,
            e.verticalTextBoxEndIndex,
            e,
            !0,
          ),
          this.addDebugCollisionBoxes(
            e.iconBoxStartIndex,
            e.iconBoxEndIndex,
            e,
            !1,
          ),
          this.addDebugCollisionBoxes(
            e.verticalIconBoxStartIndex,
            e.verticalIconBoxEndIndex,
            e,
            !1,
          );
      }
    }),
    (Ll.prototype._deserializeCollisionBoxesForSymbol = function (
      t,
      e,
      r,
      n,
      i,
      a,
      o,
      s,
      u,
    ) {
      for (var l = {}, p = e; p < r; p++) {
        var c = t.get(p);
        if (0 === c.radius) {
          (l.textBox = {
            x1: c.x1,
            y1: c.y1,
            x2: c.x2,
            y2: c.y2,
            anchorPointX: c.anchorPointX,
            anchorPointY: c.anchorPointY,
          }),
            (l.textFeatureIndex = c.featureIndex);
          break;
        }
        l.textCircles ||
          ((l.textCircles = []), (l.textFeatureIndex = c.featureIndex));
        l.textCircles.push(
          c.anchorPointX,
          c.anchorPointY,
          c.radius,
          c.signedDistanceFromAnchor,
          1,
        );
      }
      for (var f = n; f < i; f++) {
        var h = t.get(f);
        if (0 === h.radius) {
          (l.verticalTextBox = {
            x1: h.x1,
            y1: h.y1,
            x2: h.x2,
            y2: h.y2,
            anchorPointX: h.anchorPointX,
            anchorPointY: h.anchorPointY,
          }),
            (l.verticalTextFeatureIndex = h.featureIndex);
          break;
        }
      }
      for (var d = a; d < o; d++) {
        var y = t.get(d);
        if (0 === y.radius) {
          (l.iconBox = {
            x1: y.x1,
            y1: y.y1,
            x2: y.x2,
            y2: y.y2,
            anchorPointX: y.anchorPointX,
            anchorPointY: y.anchorPointY,
          }),
            (l.iconFeatureIndex = y.featureIndex);
          break;
        }
      }
      for (var m = s; m < u; m++) {
        var v = t.get(m);
        if (0 === v.radius) {
          (l.verticalIconBox = {
            x1: v.x1,
            y1: v.y1,
            x2: v.x2,
            y2: v.y2,
            anchorPointX: v.anchorPointX,
            anchorPointY: v.anchorPointY,
          }),
            (l.verticalIconFeatureIndex = v.featureIndex);
          break;
        }
      }
      return l;
    }),
    (Ll.prototype.deserializeCollisionBoxes = function (t) {
      this.collisionArrays = [];
      for (var e = 0; e < this.symbolInstances.length; e++) {
        var r = this.symbolInstances.get(e);
        this.collisionArrays.push(
          this._deserializeCollisionBoxesForSymbol(
            t,
            r.textBoxStartIndex,
            r.textBoxEndIndex,
            r.verticalTextBoxStartIndex,
            r.verticalTextBoxEndIndex,
            r.iconBoxStartIndex,
            r.iconBoxEndIndex,
            r.verticalIconBoxStartIndex,
            r.verticalIconBoxEndIndex,
          ),
        );
      }
    }),
    (Ll.prototype.hasTextData = function () {
      return this.text.segments.get().length > 0;
    }),
    (Ll.prototype.hasIconData = function () {
      return this.icon.segments.get().length > 0;
    }),
    (Ll.prototype.hasTextCollisionBoxData = function () {
      return this.textCollisionBox.segments.get().length > 0;
    }),
    (Ll.prototype.hasIconCollisionBoxData = function () {
      return this.iconCollisionBox.segments.get().length > 0;
    }),
    (Ll.prototype.hasTextCollisionCircleData = function () {
      return this.textCollisionCircle.segments.get().length > 0;
    }),
    (Ll.prototype.hasIconCollisionCircleData = function () {
      return this.iconCollisionCircle.segments.get().length > 0;
    }),
    (Ll.prototype.addIndicesForPlacedSymbol = function (t, e) {
      for (
        var r = t.placedSymbolArray.get(e),
          n = r.vertexStartIndex + 4 * r.numGlyphs,
          i = r.vertexStartIndex;
        i < n;
        i += 4
      )
        t.indexArray.emplaceBack(i, i + 1, i + 2),
          t.indexArray.emplaceBack(i + 1, i + 2, i + 3);
    }),
    (Ll.prototype.getSortedSymbolIndexes = function (t) {
      if (this.sortedAngle === t && void 0 !== this.symbolInstanceIndexes)
        return this.symbolInstanceIndexes;
      for (
        var e = Math.sin(t), r = Math.cos(t), n = [], i = [], a = [], o = 0;
        o < this.symbolInstances.length;
        ++o
      ) {
        a.push(o);
        var s = this.symbolInstances.get(o);
        n.push(0 | Math.round(e * s.anchorX + r * s.anchorY)),
          i.push(s.featureIndex);
      }
      return (
        a.sort(function (t, e) {
          return n[t] - n[e] || i[e] - i[t];
        }),
        a
      );
    }),
    (Ll.prototype.sortFeatures = function (t) {
      var e = this;
      if (
        this.sortFeaturesByY &&
        this.sortedAngle !== t &&
        !(
          this.text.segments.get().length > 1 ||
          this.icon.segments.get().length > 1
        )
      ) {
        (this.symbolInstanceIndexes = this.getSortedSymbolIndexes(t)),
          (this.sortedAngle = t),
          this.text.indexArray.clear(),
          this.icon.indexArray.clear(),
          (this.featureSortOrder = []);
        for (var r = 0, n = this.symbolInstanceIndexes; r < n.length; r += 1) {
          var i = n[r],
            a = this.symbolInstances.get(i);
          this.featureSortOrder.push(a.featureIndex),
            [
              a.rightJustifiedTextSymbolIndex,
              a.centerJustifiedTextSymbolIndex,
              a.leftJustifiedTextSymbolIndex,
            ].forEach(function (t, r, n) {
              t >= 0 &&
                n.indexOf(t) === r &&
                e.addIndicesForPlacedSymbol(e.text, t);
            }),
            a.verticalPlacedTextSymbolIndex >= 0 &&
              this.addIndicesForPlacedSymbol(
                this.text,
                a.verticalPlacedTextSymbolIndex,
              ),
            a.placedIconSymbolIndex >= 0 &&
              this.addIndicesForPlacedSymbol(
                this.icon,
                a.placedIconSymbolIndex,
              ),
            a.verticalPlacedIconSymbolIndex >= 0 &&
              this.addIndicesForPlacedSymbol(
                this.icon,
                a.verticalPlacedIconSymbolIndex,
              );
        }
        this.text.indexBuffer &&
          this.text.indexBuffer.updateData(this.text.indexArray),
          this.icon.indexBuffer &&
            this.icon.indexBuffer.updateData(this.icon.indexArray);
      }
    }),
    ke.register('SymbolBucket', Ll, {
      omit: ['layers', 'collisionBoxArray', 'compareText'],
    }),
    (Ll.MAX_GLYPHS = 65535),
    (Ll.addDynamicAttributes = Bl);
  var Xl = { kind: 'color' },
    ql = { kind: 'formatted' },
    jl = new js({
      'symbol-placement': new Us(Du.layout_symbol['symbol-placement']),
      'symbol-spacing': new Us(Du.layout_symbol['symbol-spacing']),
      'symbol-avoid-edges': new Us(Du.layout_symbol['symbol-avoid-edges']),
      'symbol-sort-key': new Vs(Du.layout_symbol['symbol-sort-key']),
      'symbol-z-order': new Us(Du.layout_symbol['symbol-z-order']),
      'icon-allow-overlap': new Us(Du.layout_symbol['icon-allow-overlap']),
      'icon-ignore-placement': new Us(
        Du.layout_symbol['icon-ignore-placement'],
      ),
      'icon-optional': new Us(Du.layout_symbol['icon-optional']),
      'icon-rotation-alignment': new Us(
        Du.layout_symbol['icon-rotation-alignment'],
      ),
      'icon-size': new Vs(Du.layout_symbol['icon-size']),
      'icon-text-fit': new Us(Du.layout_symbol['icon-text-fit']),
      'icon-text-fit-padding': new Us(
        Du.layout_symbol['icon-text-fit-padding'],
      ),
      'icon-image': new Vs(Du.layout_symbol['icon-image']),
      'icon-rotate': new Vs(Du.layout_symbol['icon-rotate']),
      'icon-padding': new Us(Du.layout_symbol['icon-padding']),
      'icon-keep-upright': new Us(Du.layout_symbol['icon-keep-upright']),
      'icon-offset': new Vs(Du.layout_symbol['icon-offset']),
      'icon-anchor': new Vs(Du.layout_symbol['icon-anchor']),
      'icon-pitch-alignment': new Us(Du.layout_symbol['icon-pitch-alignment']),
      'text-pitch-alignment': new Us(Du.layout_symbol['text-pitch-alignment']),
      'text-rotation-alignment': new Us(
        Du.layout_symbol['text-rotation-alignment'],
      ),
      'text-field': new Vs(Du.layout_symbol['text-field']),
      'text-font': new Vs(Du.layout_symbol['text-font']),
      'text-size': new Vs(Du.layout_symbol['text-size']),
      'text-max-width': new Vs(Du.layout_symbol['text-max-width']),
      'text-line-height': new Us(Du.layout_symbol['text-line-height']),
      'text-letter-spacing': new Vs(Du.layout_symbol['text-letter-spacing']),
      'text-justify': new Vs(Du.layout_symbol['text-justify']),
      'text-radial-offset': new Vs(Du.layout_symbol['text-radial-offset']),
      'text-variable-anchor': new Us(Du.layout_symbol['text-variable-anchor']),
      'text-anchor': new Vs(Du.layout_symbol['text-anchor']),
      'text-max-angle': new Us(Du.layout_symbol['text-max-angle']),
      'text-writing-mode': new Us(Du.layout_symbol['text-writing-mode']),
      'text-rotate': new Vs(Du.layout_symbol['text-rotate']),
      'text-padding': new Us(Du.layout_symbol['text-padding']),
      'text-keep-upright': new Us(Du.layout_symbol['text-keep-upright']),
      'text-transform': new Vs(Du.layout_symbol['text-transform']),
      'text-offset': new Vs(Du.layout_symbol['text-offset']),
      'text-allow-overlap': new Us(Du.layout_symbol['text-allow-overlap']),
      'text-ignore-placement': new Us(
        Du.layout_symbol['text-ignore-placement'],
      ),
      'text-optional': new Us(Du.layout_symbol['text-optional']),
    }),
    Hl = new js({
      'icon-opacity': new Vs(Du.paint_symbol['icon-opacity']),
      'icon-color': new Vs(Du.paint_symbol['icon-color']),
      'icon-halo-color': new Vs(Du.paint_symbol['icon-halo-color']),
      'icon-halo-width': new Vs(Du.paint_symbol['icon-halo-width']),
      'icon-halo-blur': new Vs(Du.paint_symbol['icon-halo-blur']),
      'icon-translate': new Us(Du.paint_symbol['icon-translate']),
      'icon-translate-anchor': new Us(Du.paint_symbol['icon-translate-anchor']),
      'text-opacity': new Vs(Du.paint_symbol['text-opacity']),
      'text-color': new Vs(Du.paint_symbol['text-color'], {
        runtimeType: Xl,
        getOverride: function (t) {
          return t.textColor;
        },
        hasOverride: function (t) {
          return !!t.textColor;
        },
      }),
      'text-halo-color': new Vs(Du.paint_symbol['text-halo-color']),
      'text-halo-width': new Vs(Du.paint_symbol['text-halo-width']),
      'text-halo-blur': new Vs(Du.paint_symbol['text-halo-blur']),
      'text-show-background': new Vs(Du.paint_symbol['text-show-background']),
      'text-translate': new Us(Du.paint_symbol['text-translate']),
      'text-translate-anchor': new Us(Du.paint_symbol['text-translate-anchor']),
    }),
    Yl = { paint: Hl, layout: jl },
    Ql = (function (t) {
      function e(e) {
        t.call(this, e, Yl);
      }
      return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        (e.prototype.recalculate = function (e, r) {
          if (
            (t.prototype.recalculate.call(this, e, r),
            'auto' === this.layout.get('icon-rotation-alignment') &&
              ('point' !== this.layout.get('symbol-placement')
                ? (this.layout._values['icon-rotation-alignment'] = 'map')
                : (this.layout._values['icon-rotation-alignment'] =
                    'viewport')),
            'auto' === this.layout.get('text-rotation-alignment') &&
              ('point' !== this.layout.get('symbol-placement')
                ? (this.layout._values['text-rotation-alignment'] = 'map')
                : (this.layout._values['text-rotation-alignment'] =
                    'viewport')),
            'auto' === this.layout.get('text-pitch-alignment') &&
              (this.layout._values['text-pitch-alignment'] = this.layout.get(
                'text-rotation-alignment',
              )),
            'auto' === this.layout.get('icon-pitch-alignment') &&
              (this.layout._values['icon-pitch-alignment'] = this.layout.get(
                'icon-rotation-alignment',
              )),
            'point' === this.layout.get('symbol-placement'))
          ) {
            var n = this.layout.get('text-writing-mode');
            if (n) {
              for (var i = [], a = 0, o = n; a < o.length; a += 1) {
                var s = o[a];
                i.indexOf(s) < 0 && i.push(s);
              }
              this.layout._values['text-writing-mode'] = i;
            } else this.layout._values['text-writing-mode'] = ['horizontal'];
          }
          this._setPaintOverrides();
        }),
        (e.prototype.getValueAndResolveTokens = function (t, e, r) {
          var n = this.layout.get(t).evaluate(e, {}, r),
            i = this._unevaluatedLayout._values[t];
          return i.isDataDriven() || qo.isExpression(i.value) || !n
            ? n
            : Qa.resolveTokens(e.properties, n);
        }),
        (e.prototype.createBucket = function (t) {
          return new Ll(t);
        }),
        (e.prototype.queryRadius = function () {
          return 0;
        }),
        (e.prototype.queryIntersectsFeature = function () {
          return !1;
        }),
        (e.prototype._setPaintOverrides = function () {
          for (
            var t = 0, r = Yl.paint.overridableProperties;
            t < r.length;
            t += 1
          ) {
            var n = r[t];
            if (e.hasPaintOverride(this.layout, n)) {
              var i = this.paint.get(n);
              new FormatSectionOverride(i);
              'constant' === i.value.kind || i.value.kind,
                (this.paint._values[n] = new PossiblyEvaluatedPropertyValue(
                  i.property,
                  null,
                  i.parameters,
                ));
            }
          }
        }),
        (e.prototype._handleOverridablePaintPropertyUpdate = function (
          t,
          r,
          n,
        ) {
          return (
            !(!this.layout || r.isDataDriven() || n.isDataDriven()) &&
            e.hasPaintOverride(this.layout, t)
          );
        }),
        (e.hasPaintOverride = function (t, e) {
          var r = t.get('text-field'),
            n = Yl.paint.properties[e],
            i = !1,
            a = function (t) {
              for (var e = 0, r = t; e < r.length; e += 1) {
                var a = r[e];
                if (n.overrides && n.overrides.hasOverride(a))
                  return void (i = !0);
              }
            };
          if ('constant' === r.value.kind && r.value.value instanceof X)
            a(r.value.value.sections);
          else if ('source' === r.value.kind) {
            var o = function (t) {
                if (!i)
                  if (t instanceof ve && et.typeOf(t.value) === ql) {
                    var e = t.value;
                    a(e.sections);
                  } else t instanceof te ? a(t.sections) : t.eachChild(o);
              },
              s = r.value;
            s._styleExpression && o(s._styleExpression.expression);
          }
          return i;
        }),
        (e.hasPaintOverrides = function (t) {
          for (
            var r = 0, n = Yl.paint.overridableProperties;
            r < n.length;
            r += 1
          ) {
            var i = n[r];
            if (e.hasPaintOverride(t, i)) return !0;
          }
          return !1;
        }),
        e
      );
    })(Zs),
    Kl = { circle: Qu, fill: rl, line: pl, symbol: Ql };
  function Gl(t) {
    return Kl[t.type] ? new Kl[t.type](t) : null;
  }
  var Wl = function (t) {
    (this.keyCache = {}), t && this.replace(t);
  };
  function Jl(t) {
    var e = [];
    for (var r in t) e.push(t[r]);
    return e;
  }
  function Zl(e, r) {
    var n = e.pbfData,
      i = e.layers,
      a = e.imageMap,
      o = ke.deserialize(e.serializeObj).featureIndex,
      s = e.tileID.z;
    t.defined(o) || ((o = new Ss(e.tileID)).bucketLayerIDs = []);
    var u = {};
    try {
      var l = new Wl(i);
      (u = tp($l(n), l, a, o, s, e.indexData)), (u = ke.serialize(u, r));
    } catch (t) {}
    return (u.pickId = e.pickId), u;
  }
  function $l(e) {
    if (t.defined(e)) return new qa(new n.Protobuf(e));
  }
  function tp(e, r, n, a, o, s) {
    var u = new i(Object.keys(e.layers).sort()),
      l = {},
      p = {
        featureIndex: a,
        iconDependencies: {},
        patternDependencies: {},
        glyphDependencies: {},
      };
    for (var c in r.familiesBySource) {
      var f = r.familiesBySource[c];
      for (var h in f) {
        var d = e.layers[h];
        if (d) {
          for (var y = u.encode(h), m = [], v = 0; v < d.length; v++) {
            var x = d.feature(v);
            m.push({
              feature: x,
              index: v,
              sourceLayerIndex: y,
              sourceLayerId: h,
            });
          }
          for (var b = 0, _ = f[h]; b < _.length; b += 1) {
            var w = _[b],
              E = w[0];
            if ('none' !== E.visibility) {
              ep(w, 0, null);
              var T = (l[E.id] = E.createBucket({
                index: a.bucketLayerIDs.length,
                layers: w,
                sourceLayerIndex: y,
              }));
              t.defined(s) && t.defined(s[E.id]) && (p.indexData = s[E.id]),
                T.populate(m, p),
                a.bucketLayerIDs.push(
                  w.map(function (t) {
                    return t.id;
                  }),
                );
            }
          }
        }
      }
    }
    var A = null;
    for (var S in l) {
      (T = l[S]).hasPattern &&
        (T instanceof Ir || T instanceof Aa) &&
        (null == A && (A = new g({}, n)), T.addFeatures(p, A.patternPositions));
    }
    return { buckets: l, imageAtlas: A, featureIndex: a };
  }
  function ep(t, e, r) {
    for (var n = new Re(e), i = 0, a = t; i < a.length; i += 1) {
      a[i].recalculate(n, r);
    }
  }
  (Wl.prototype.replace = function (t) {
    (this._layerConfigs = {}), (this._layers = {}), this.update(t, []);
  }),
    (Wl.prototype.update = function (t, e) {
      for (var r = this, n = 0, i = t; n < i.length; n += 1) {
        var a = i[n];
        this._layerConfigs[a.id] = a;
        var o = Gl(a);
        null != o &&
          ((this._layers[a.id] = o),
          (o._featureFilter = ms.createFilter(o.filter)),
          this.keyCache[a.id] && delete this.keyCache[a.id]);
      }
      for (var s = 0, u = e; s < u.length; s += 1) {
        var l = u[s];
        delete this.keyCache[l],
          delete this._layerConfigs[l],
          delete this._layers[l];
      }
      this.familiesBySource = {};
      for (
        var p = 0, c = Rs(Jl(this._layerConfigs), this.keyCache);
        p < c.length;
        p += 1
      ) {
        var f = c[p].map(function (t) {
            return r._layers[t.id];
          }),
          h = f[0];
        if (null != h && 'none' !== h.visibility) {
          var d = h.source || '',
            y = this.familiesBySource[d];
          y || (y = this.familiesBySource[d] = {});
          var m = h.sourceLayer,
            v = y[m];
          v || (v = y[m] = []), v.push(f);
        }
      }
    }),
    ke.register('FeatureIndex', Ss, {
      omit: ['rawTileData', 'sourceLayerCoder'],
    });
  var rp = e(Zl);
  return rp;
});
