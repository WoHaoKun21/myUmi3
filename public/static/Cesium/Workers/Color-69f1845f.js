define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './FeatureDetection-7bd32c34',
], function (e, r, t, o, f) {
  function s(e, r, t) {
    return (
      t < 0 && (t += 1),
      1 < t && (t -= 1),
      6 * t < 1
        ? e + 6 * (r - e) * t
        : 2 * t < 1
        ? r
        : 3 * t < 2
        ? e + (r - e) * (2 / 3 - t) * 6
        : e
    );
  }
  function C(e, t, o, f) {
    (this.red = r.defaultValue(e, 1)),
      (this.green = r.defaultValue(t, 1)),
      (this.blue = r.defaultValue(o, 1)),
      (this.alpha = r.defaultValue(f, 1));
  }
  var n, l, a;
  (C.fromCartesian4 = function (e, o) {
    return (
      t.Check.typeOf.object('cartesian', e),
      r.defined(o)
        ? ((o.red = e.x), (o.green = e.y), (o.blue = e.z), (o.alpha = e.w), o)
        : new C(e.x, e.y, e.z, e.w)
    );
  }),
    (C.fromBytes = function (e, t, o, f, s) {
      return (
        (e = C.byteToFloat(r.defaultValue(e, 255))),
        (t = C.byteToFloat(r.defaultValue(t, 255))),
        (o = C.byteToFloat(r.defaultValue(o, 255))),
        (f = C.byteToFloat(r.defaultValue(f, 255))),
        r.defined(s)
          ? ((s.red = e), (s.green = t), (s.blue = o), (s.alpha = f), s)
          : new C(e, t, o, f)
      );
    }),
    (C.fromAlpha = function (e, o, f) {
      return (
        t.Check.typeOf.object('color', e),
        t.Check.typeOf.number('alpha', o),
        r.defined(f)
          ? ((f.red = e.red),
            (f.green = e.green),
            (f.blue = e.blue),
            (f.alpha = o),
            f)
          : new C(e.red, e.green, e.blue, o)
      );
    }),
    f.FeatureDetection.supportsTypedArrays() &&
      ((n = new ArrayBuffer(4)),
      (l = new Uint32Array(n)),
      (a = new Uint8Array(n))),
    (C.fromRgba = function (e, r) {
      return (l[0] = e), C.fromBytes(a[0], a[1], a[2], a[3], r);
    }),
    (C.byteToRgba = function (e, r, t, o) {
      return (a[0] = e), (a[1] = r), (a[2] = t), (a[3] = o), l[0];
    }),
    (C.fromHsl = function (e, t, o, f, n) {
      (e = r.defaultValue(e, 0) % 1),
        (t = r.defaultValue(t, 0)),
        (o = r.defaultValue(o, 0)),
        (f = r.defaultValue(f, 1));
      var l = o,
        a = o,
        i = o;
      if (0 !== t) {
        var c,
          O = 2 * o - (c = o < 0.5 ? o * (1 + t) : o + t - o * t);
        (l = s(O, c, e + 1 / 3)), (a = s(O, c, e)), (i = s(O, c, e - 1 / 3));
      }
      return r.defined(n)
        ? ((n.red = l), (n.green = a), (n.blue = i), (n.alpha = f), n)
        : new C(l, a, i, f);
    }),
    (C.fromRandom = function (e, f) {
      var s = (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)).red;
      if (!r.defined(s)) {
        var n = r.defaultValue(e.minimumRed, 0),
          l = r.defaultValue(e.maximumRed, 1);
        t.Check.typeOf.number.lessThanOrEquals('minimumRed', n, l),
          (s = n + o.CesiumMath.nextRandomNumber() * (l - n));
      }
      var a = e.green;
      if (!r.defined(a)) {
        var i = r.defaultValue(e.minimumGreen, 0),
          c = r.defaultValue(e.maximumGreen, 1);
        t.Check.typeOf.number.lessThanOrEquals('minimumGreen', i, c),
          (a = i + o.CesiumMath.nextRandomNumber() * (c - i));
      }
      var O = e.blue;
      if (!r.defined(O)) {
        var b = r.defaultValue(e.minimumBlue, 0),
          u = r.defaultValue(e.maximumBlue, 1);
        t.Check.typeOf.number.lessThanOrEquals('minimumBlue', b, u),
          (O = b + o.CesiumMath.nextRandomNumber() * (u - b));
      }
      var E = e.alpha;
      if (!r.defined(E)) {
        var m = r.defaultValue(e.minimumAlpha, 0),
          g = r.defaultValue(e.maximumAlpha, 1);
        t.Check.typeOf.number.lessThanOrEquals('minumumAlpha', m, g),
          (E = m + o.CesiumMath.nextRandomNumber() * (g - m));
      }
      return r.defined(f)
        ? ((f.red = s), (f.green = a), (f.blue = O), (f.alpha = E), f)
        : new C(s, a, O, E);
    });
  var i = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,
    c = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,
    O =
      /^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i,
    b =
      /^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i;
  (C.fromCssColorString = function (e, o) {
    t.Check.typeOf.string('color', e), r.defined(o) || (o = new C());
    var f = C[e.toUpperCase()];
    if (r.defined(f)) return C.clone(f, o), o;
    var s = i.exec(e);
    return null !== s
      ? ((o.red = parseInt(s[1], 16) / 15),
        (o.green = parseInt(s[2], 16) / 15),
        (o.blue = parseInt(s[3], 16) / 15),
        (o.alpha = 1),
        o)
      : null !== (s = c.exec(e))
      ? ((o.red = parseInt(s[1], 16) / 255),
        (o.green = parseInt(s[2], 16) / 255),
        (o.blue = parseInt(s[3], 16) / 255),
        (o.alpha = 1),
        o)
      : null !== (s = O.exec(e))
      ? ((o.red = parseFloat(s[1]) / ('%' === s[1].substr(-1) ? 100 : 255)),
        (o.green = parseFloat(s[2]) / ('%' === s[2].substr(-1) ? 100 : 255)),
        (o.blue = parseFloat(s[3]) / ('%' === s[3].substr(-1) ? 100 : 255)),
        (o.alpha = parseFloat(r.defaultValue(s[4], '1.0'))),
        o)
      : null !== (s = b.exec(e))
      ? C.fromHsl(
          parseFloat(s[1]) / 360,
          parseFloat(s[2]) / 100,
          parseFloat(s[3]) / 100,
          parseFloat(r.defaultValue(s[4], '1.0')),
          o,
        )
      : (o = void 0);
  }),
    (C.packedLength = 4),
    (C.pack = function (e, o, f) {
      return (
        t.Check.typeOf.object('value', e),
        t.Check.defined('array', o),
        (f = r.defaultValue(f, 0)),
        (o[f++] = e.red),
        (o[f++] = e.green),
        (o[f++] = e.blue),
        (o[f] = e.alpha),
        o
      );
    }),
    (C.unpack = function (e, o, f) {
      return (
        t.Check.defined('array', e),
        (o = r.defaultValue(o, 0)),
        r.defined(f) || (f = new C()),
        (f.red = e[o++]),
        (f.green = e[o++]),
        (f.blue = e[o++]),
        (f.alpha = e[o]),
        f
      );
    }),
    (C.byteToFloat = function (e) {
      return e / 255;
    }),
    (C.floatToByte = function (e) {
      return 1 === e ? 255 : (256 * e) | 0;
    }),
    (C.clone = function (e, t) {
      if (r.defined(e))
        return r.defined(t)
          ? ((t.red = e.red),
            (t.green = e.green),
            (t.blue = e.blue),
            (t.alpha = e.alpha),
            t)
          : new C(e.red, e.green, e.blue, e.alpha);
    }),
    (C.equals = function (e, t) {
      return (
        e === t ||
        (r.defined(e) &&
          r.defined(t) &&
          e.red === t.red &&
          e.green === t.green &&
          e.blue === t.blue &&
          e.alpha === t.alpha)
      );
    }),
    (C.equalsArray = function (e, r, t) {
      return (
        e.red === r[t] &&
        e.green === r[t + 1] &&
        e.blue === r[t + 2] &&
        e.alpha === r[t + 3]
      );
    }),
    (C.prototype.clone = function (e) {
      return C.clone(this, e);
    }),
    (C.prototype.equals = function (e) {
      return C.equals(this, e);
    }),
    (C.prototype.equalsEpsilon = function (e, t) {
      return (
        this === e ||
        (r.defined(e) &&
          Math.abs(this.red - e.red) <= t &&
          Math.abs(this.green - e.green) <= t &&
          Math.abs(this.blue - e.blue) <= t &&
          Math.abs(this.alpha - e.alpha) <= t)
      );
    }),
    (C.prototype.toString = function () {
      return (
        '(' +
        this.red +
        ', ' +
        this.green +
        ', ' +
        this.blue +
        ', ' +
        this.alpha +
        ')'
      );
    }),
    (C.prototype.toCssColorString = function () {
      var e = C.floatToByte(this.red),
        r = C.floatToByte(this.green),
        t = C.floatToByte(this.blue);
      return 1 === this.alpha
        ? 'rgb(' + e + ',' + r + ',' + t + ')'
        : 'rgba(' + e + ',' + r + ',' + t + ',' + this.alpha + ')';
    }),
    (C.prototype.toBytes = function (e) {
      var t = C.floatToByte(this.red),
        o = C.floatToByte(this.green),
        f = C.floatToByte(this.blue),
        s = C.floatToByte(this.alpha);
      return r.defined(e)
        ? ((e[0] = t), (e[1] = o), (e[2] = f), (e[3] = s), e)
        : [t, o, f, s];
    }),
    (C.prototype.toRgba = function () {
      return (
        (a[0] = C.floatToByte(this.red)),
        (a[1] = C.floatToByte(this.green)),
        (a[2] = C.floatToByte(this.blue)),
        (a[3] = C.floatToByte(this.alpha)),
        l[0]
      );
    }),
    (C.prototype.brighten = function (e, r) {
      return (
        t.Check.typeOf.number('magnitude', e),
        t.Check.typeOf.number.greaterThanOrEquals('magnitude', e, 0),
        t.Check.typeOf.object('result', r),
        (e = 1 - e),
        (r.red = 1 - (1 - this.red) * e),
        (r.green = 1 - (1 - this.green) * e),
        (r.blue = 1 - (1 - this.blue) * e),
        (r.alpha = this.alpha),
        r
      );
    }),
    (C.prototype.darken = function (e, r) {
      return (
        t.Check.typeOf.number('magnitude', e),
        t.Check.typeOf.number.greaterThanOrEquals('magnitude', e, 0),
        t.Check.typeOf.object('result', r),
        (e = 1 - e),
        (r.red = this.red * e),
        (r.green = this.green * e),
        (r.blue = this.blue * e),
        (r.alpha = this.alpha),
        r
      );
    }),
    (C.prototype.withAlpha = function (e, r) {
      return C.fromAlpha(this, e, r);
    }),
    (C.add = function (e, r, o) {
      return (
        t.Check.typeOf.object('left', e),
        t.Check.typeOf.object('right', r),
        t.Check.typeOf.object('result', o),
        (o.red = e.red + r.red),
        (o.green = e.green + r.green),
        (o.blue = e.blue + r.blue),
        (o.alpha = e.alpha + r.alpha),
        o
      );
    }),
    (C.subtract = function (e, r, o) {
      return (
        t.Check.typeOf.object('left', e),
        t.Check.typeOf.object('right', r),
        t.Check.typeOf.object('result', o),
        (o.red = e.red - r.red),
        (o.green = e.green - r.green),
        (o.blue = e.blue - r.blue),
        (o.alpha = e.alpha - r.alpha),
        o
      );
    }),
    (C.multiply = function (e, r, o) {
      return (
        t.Check.typeOf.object('left', e),
        t.Check.typeOf.object('right', r),
        t.Check.typeOf.object('result', o),
        (o.red = e.red * r.red),
        (o.green = e.green * r.green),
        (o.blue = e.blue * r.blue),
        (o.alpha = e.alpha * r.alpha),
        o
      );
    }),
    (C.divide = function (e, r, o) {
      return (
        t.Check.typeOf.object('left', e),
        t.Check.typeOf.object('right', r),
        t.Check.typeOf.object('result', o),
        (o.red = e.red / r.red),
        (o.green = e.green / r.green),
        (o.blue = e.blue / r.blue),
        (o.alpha = e.alpha / r.alpha),
        o
      );
    }),
    (C.mod = function (e, r, o) {
      return (
        t.Check.typeOf.object('left', e),
        t.Check.typeOf.object('right', r),
        t.Check.typeOf.object('result', o),
        (o.red = e.red % r.red),
        (o.green = e.green % r.green),
        (o.blue = e.blue % r.blue),
        (o.alpha = e.alpha % r.alpha),
        o
      );
    }),
    (C.lerp = function (e, r, f, s) {
      return (
        t.Check.typeOf.object('start', e),
        t.Check.typeOf.object('end', r),
        t.Check.typeOf.number('t', f),
        t.Check.typeOf.object('result', s),
        (s.red = o.CesiumMath.lerp(e.red, r.red, f)),
        (s.green = o.CesiumMath.lerp(e.green, r.green, f)),
        (s.blue = o.CesiumMath.lerp(e.blue, r.blue, f)),
        (s.alpha = o.CesiumMath.lerp(e.alpha, r.alpha, f)),
        s
      );
    }),
    (C.multiplyByScalar = function (e, r, o) {
      return (
        t.Check.typeOf.object('color', e),
        t.Check.typeOf.number('scalar', r),
        t.Check.typeOf.object('result', o),
        (o.red = e.red * r),
        (o.green = e.green * r),
        (o.blue = e.blue * r),
        (o.alpha = e.alpha * r),
        o
      );
    }),
    (C.divideByScalar = function (e, r, o) {
      return (
        t.Check.typeOf.object('color', e),
        t.Check.typeOf.number('scalar', r),
        t.Check.typeOf.object('result', o),
        (o.red = e.red / r),
        (o.green = e.green / r),
        (o.blue = e.blue / r),
        (o.alpha = e.alpha / r),
        o
      );
    }),
    (C.ALICEBLUE = Object.freeze(C.fromCssColorString('#F0F8FF'))),
    (C.ANTIQUEWHITE = Object.freeze(C.fromCssColorString('#FAEBD7'))),
    (C.AQUA = Object.freeze(C.fromCssColorString('#00FFFF'))),
    (C.AQUAMARINE = Object.freeze(C.fromCssColorString('#7FFFD4'))),
    (C.AZURE = Object.freeze(C.fromCssColorString('#F0FFFF'))),
    (C.BEIGE = Object.freeze(C.fromCssColorString('#F5F5DC'))),
    (C.BISQUE = Object.freeze(C.fromCssColorString('#FFE4C4'))),
    (C.BLACK = Object.freeze(C.fromCssColorString('#000000'))),
    (C.BLANCHEDALMOND = Object.freeze(C.fromCssColorString('#FFEBCD'))),
    (C.BLUE = Object.freeze(C.fromCssColorString('#0000FF'))),
    (C.BLUEVIOLET = Object.freeze(C.fromCssColorString('#8A2BE2'))),
    (C.BROWN = Object.freeze(C.fromCssColorString('#A52A2A'))),
    (C.BURLYWOOD = Object.freeze(C.fromCssColorString('#DEB887'))),
    (C.CADETBLUE = Object.freeze(C.fromCssColorString('#5F9EA0'))),
    (C.CHARTREUSE = Object.freeze(C.fromCssColorString('#7FFF00'))),
    (C.CHOCOLATE = Object.freeze(C.fromCssColorString('#D2691E'))),
    (C.CORAL = Object.freeze(C.fromCssColorString('#FF7F50'))),
    (C.CORNFLOWERBLUE = Object.freeze(C.fromCssColorString('#6495ED'))),
    (C.CORNSILK = Object.freeze(C.fromCssColorString('#FFF8DC'))),
    (C.CRIMSON = Object.freeze(C.fromCssColorString('#DC143C'))),
    (C.CYAN = Object.freeze(C.fromCssColorString('#00FFFF'))),
    (C.DARKBLUE = Object.freeze(C.fromCssColorString('#00008B'))),
    (C.DARKCYAN = Object.freeze(C.fromCssColorString('#008B8B'))),
    (C.DARKGOLDENROD = Object.freeze(C.fromCssColorString('#B8860B'))),
    (C.DARKGRAY = Object.freeze(C.fromCssColorString('#A9A9A9'))),
    (C.DARKGREEN = Object.freeze(C.fromCssColorString('#006400'))),
    (C.DARKGREY = C.DARKGRAY),
    (C.DARKKHAKI = Object.freeze(C.fromCssColorString('#BDB76B'))),
    (C.DARKMAGENTA = Object.freeze(C.fromCssColorString('#8B008B'))),
    (C.DARKOLIVEGREEN = Object.freeze(C.fromCssColorString('#556B2F'))),
    (C.DARKORANGE = Object.freeze(C.fromCssColorString('#FF8C00'))),
    (C.DARKORCHID = Object.freeze(C.fromCssColorString('#9932CC'))),
    (C.DARKRED = Object.freeze(C.fromCssColorString('#8B0000'))),
    (C.DARKSALMON = Object.freeze(C.fromCssColorString('#E9967A'))),
    (C.DARKSEAGREEN = Object.freeze(C.fromCssColorString('#8FBC8F'))),
    (C.DARKSLATEBLUE = Object.freeze(C.fromCssColorString('#483D8B'))),
    (C.DARKSLATEGRAY = Object.freeze(C.fromCssColorString('#2F4F4F'))),
    (C.DARKSLATEGREY = C.DARKSLATEGRAY),
    (C.DARKTURQUOISE = Object.freeze(C.fromCssColorString('#00CED1'))),
    (C.DARKVIOLET = Object.freeze(C.fromCssColorString('#9400D3'))),
    (C.DEEPPINK = Object.freeze(C.fromCssColorString('#FF1493'))),
    (C.DEEPSKYBLUE = Object.freeze(C.fromCssColorString('#00BFFF'))),
    (C.DIMGRAY = Object.freeze(C.fromCssColorString('#696969'))),
    (C.DIMGREY = C.DIMGRAY),
    (C.DODGERBLUE = Object.freeze(C.fromCssColorString('#1E90FF'))),
    (C.FIREBRICK = Object.freeze(C.fromCssColorString('#B22222'))),
    (C.FLORALWHITE = Object.freeze(C.fromCssColorString('#FFFAF0'))),
    (C.FORESTGREEN = Object.freeze(C.fromCssColorString('#228B22'))),
    (C.FUCHSIA = Object.freeze(C.fromCssColorString('#FF00FF'))),
    (C.GAINSBORO = Object.freeze(C.fromCssColorString('#DCDCDC'))),
    (C.GHOSTWHITE = Object.freeze(C.fromCssColorString('#F8F8FF'))),
    (C.GOLD = Object.freeze(C.fromCssColorString('#FFD700'))),
    (C.GOLDENROD = Object.freeze(C.fromCssColorString('#DAA520'))),
    (C.GRAY = Object.freeze(C.fromCssColorString('#808080'))),
    (C.GREEN = Object.freeze(C.fromCssColorString('#008000'))),
    (C.GREENYELLOW = Object.freeze(C.fromCssColorString('#ADFF2F'))),
    (C.GREY = C.GRAY),
    (C.HONEYDEW = Object.freeze(C.fromCssColorString('#F0FFF0'))),
    (C.HOTPINK = Object.freeze(C.fromCssColorString('#FF69B4'))),
    (C.INDIANRED = Object.freeze(C.fromCssColorString('#CD5C5C'))),
    (C.INDIGO = Object.freeze(C.fromCssColorString('#4B0082'))),
    (C.IVORY = Object.freeze(C.fromCssColorString('#FFFFF0'))),
    (C.KHAKI = Object.freeze(C.fromCssColorString('#F0E68C'))),
    (C.LAVENDER = Object.freeze(C.fromCssColorString('#E6E6FA'))),
    (C.LAVENDAR_BLUSH = Object.freeze(C.fromCssColorString('#FFF0F5'))),
    (C.LAWNGREEN = Object.freeze(C.fromCssColorString('#7CFC00'))),
    (C.LEMONCHIFFON = Object.freeze(C.fromCssColorString('#FFFACD'))),
    (C.LIGHTBLUE = Object.freeze(C.fromCssColorString('#ADD8E6'))),
    (C.LIGHTCORAL = Object.freeze(C.fromCssColorString('#F08080'))),
    (C.LIGHTCYAN = Object.freeze(C.fromCssColorString('#E0FFFF'))),
    (C.LIGHTGOLDENRODYELLOW = Object.freeze(C.fromCssColorString('#FAFAD2'))),
    (C.LIGHTGRAY = Object.freeze(C.fromCssColorString('#D3D3D3'))),
    (C.LIGHTGREEN = Object.freeze(C.fromCssColorString('#90EE90'))),
    (C.LIGHTGREY = C.LIGHTGRAY),
    (C.LIGHTPINK = Object.freeze(C.fromCssColorString('#FFB6C1'))),
    (C.LIGHTSEAGREEN = Object.freeze(C.fromCssColorString('#20B2AA'))),
    (C.LIGHTSKYBLUE = Object.freeze(C.fromCssColorString('#87CEFA'))),
    (C.LIGHTSLATEGRAY = Object.freeze(C.fromCssColorString('#778899'))),
    (C.LIGHTSLATEGREY = C.LIGHTSLATEGRAY),
    (C.LIGHTSTEELBLUE = Object.freeze(C.fromCssColorString('#B0C4DE'))),
    (C.LIGHTYELLOW = Object.freeze(C.fromCssColorString('#FFFFE0'))),
    (C.LIME = Object.freeze(C.fromCssColorString('#00FF00'))),
    (C.LIMEGREEN = Object.freeze(C.fromCssColorString('#32CD32'))),
    (C.LINEN = Object.freeze(C.fromCssColorString('#FAF0E6'))),
    (C.MAGENTA = Object.freeze(C.fromCssColorString('#FF00FF'))),
    (C.MAROON = Object.freeze(C.fromCssColorString('#800000'))),
    (C.MEDIUMAQUAMARINE = Object.freeze(C.fromCssColorString('#66CDAA'))),
    (C.MEDIUMBLUE = Object.freeze(C.fromCssColorString('#0000CD'))),
    (C.MEDIUMORCHID = Object.freeze(C.fromCssColorString('#BA55D3'))),
    (C.MEDIUMPURPLE = Object.freeze(C.fromCssColorString('#9370DB'))),
    (C.MEDIUMSEAGREEN = Object.freeze(C.fromCssColorString('#3CB371'))),
    (C.MEDIUMSLATEBLUE = Object.freeze(C.fromCssColorString('#7B68EE'))),
    (C.MEDIUMSPRINGGREEN = Object.freeze(C.fromCssColorString('#00FA9A'))),
    (C.MEDIUMTURQUOISE = Object.freeze(C.fromCssColorString('#48D1CC'))),
    (C.MEDIUMVIOLETRED = Object.freeze(C.fromCssColorString('#C71585'))),
    (C.MIDNIGHTBLUE = Object.freeze(C.fromCssColorString('#191970'))),
    (C.MINTCREAM = Object.freeze(C.fromCssColorString('#F5FFFA'))),
    (C.MISTYROSE = Object.freeze(C.fromCssColorString('#FFE4E1'))),
    (C.MOCCASIN = Object.freeze(C.fromCssColorString('#FFE4B5'))),
    (C.NAVAJOWHITE = Object.freeze(C.fromCssColorString('#FFDEAD'))),
    (C.NAVY = Object.freeze(C.fromCssColorString('#000080'))),
    (C.OLDLACE = Object.freeze(C.fromCssColorString('#FDF5E6'))),
    (C.OLIVE = Object.freeze(C.fromCssColorString('#808000'))),
    (C.OLIVEDRAB = Object.freeze(C.fromCssColorString('#6B8E23'))),
    (C.ORANGE = Object.freeze(C.fromCssColorString('#FFA500'))),
    (C.ORANGERED = Object.freeze(C.fromCssColorString('#FF4500'))),
    (C.ORCHID = Object.freeze(C.fromCssColorString('#DA70D6'))),
    (C.PALEGOLDENROD = Object.freeze(C.fromCssColorString('#EEE8AA'))),
    (C.PALEGREEN = Object.freeze(C.fromCssColorString('#98FB98'))),
    (C.PALETURQUOISE = Object.freeze(C.fromCssColorString('#AFEEEE'))),
    (C.PALEVIOLETRED = Object.freeze(C.fromCssColorString('#DB7093'))),
    (C.PAPAYAWHIP = Object.freeze(C.fromCssColorString('#FFEFD5'))),
    (C.PEACHPUFF = Object.freeze(C.fromCssColorString('#FFDAB9'))),
    (C.PERU = Object.freeze(C.fromCssColorString('#CD853F'))),
    (C.PINK = Object.freeze(C.fromCssColorString('#FFC0CB'))),
    (C.PLUM = Object.freeze(C.fromCssColorString('#DDA0DD'))),
    (C.POWDERBLUE = Object.freeze(C.fromCssColorString('#B0E0E6'))),
    (C.PURPLE = Object.freeze(C.fromCssColorString('#800080'))),
    (C.RED = Object.freeze(C.fromCssColorString('#FF0000'))),
    (C.ROSYBROWN = Object.freeze(C.fromCssColorString('#BC8F8F'))),
    (C.ROYALBLUE = Object.freeze(C.fromCssColorString('#4169E1'))),
    (C.SADDLEBROWN = Object.freeze(C.fromCssColorString('#8B4513'))),
    (C.SALMON = Object.freeze(C.fromCssColorString('#FA8072'))),
    (C.SANDYBROWN = Object.freeze(C.fromCssColorString('#F4A460'))),
    (C.SEAGREEN = Object.freeze(C.fromCssColorString('#2E8B57'))),
    (C.SEASHELL = Object.freeze(C.fromCssColorString('#FFF5EE'))),
    (C.SIENNA = Object.freeze(C.fromCssColorString('#A0522D'))),
    (C.SILVER = Object.freeze(C.fromCssColorString('#C0C0C0'))),
    (C.SKYBLUE = Object.freeze(C.fromCssColorString('#87CEEB'))),
    (C.SLATEBLUE = Object.freeze(C.fromCssColorString('#6A5ACD'))),
    (C.SLATEGRAY = Object.freeze(C.fromCssColorString('#708090'))),
    (C.SLATEGREY = C.SLATEGRAY),
    (C.SNOW = Object.freeze(C.fromCssColorString('#FFFAFA'))),
    (C.SPRINGGREEN = Object.freeze(C.fromCssColorString('#00FF7F'))),
    (C.STEELBLUE = Object.freeze(C.fromCssColorString('#4682B4'))),
    (C.TAN = Object.freeze(C.fromCssColorString('#D2B48C'))),
    (C.TEAL = Object.freeze(C.fromCssColorString('#008080'))),
    (C.THISTLE = Object.freeze(C.fromCssColorString('#D8BFD8'))),
    (C.TOMATO = Object.freeze(C.fromCssColorString('#FF6347'))),
    (C.TURQUOISE = Object.freeze(C.fromCssColorString('#40E0D0'))),
    (C.VIOLET = Object.freeze(C.fromCssColorString('#EE82EE'))),
    (C.WHEAT = Object.freeze(C.fromCssColorString('#F5DEB3'))),
    (C.WHITE = Object.freeze(C.fromCssColorString('#FFFFFF'))),
    (C.WHITESMOKE = Object.freeze(C.fromCssColorString('#F5F5F5'))),
    (C.YELLOW = Object.freeze(C.fromCssColorString('#FFFF00'))),
    (C.YELLOWGREEN = Object.freeze(C.fromCssColorString('#9ACD32'))),
    (C.TRANSPARENT = Object.freeze(new C(0, 0, 0, 0))),
    (e.Color = C);
});
