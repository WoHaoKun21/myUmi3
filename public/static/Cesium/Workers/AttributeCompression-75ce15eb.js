define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
], function (e, t, n, o, r, a) {
  var c = {
      octEncodeInRange: function (e, t, a) {
        n.Check.defined('vector', e), n.Check.defined('result', a);
        var c = r.Cartesian3.magnitudeSquared(e);
        if (Math.abs(c - 1) > o.CesiumMath.EPSILON6)
          throw new n.DeveloperError('vector must be normalized.');
        if (
          ((a.x = e.x / (Math.abs(e.x) + Math.abs(e.y) + Math.abs(e.z))),
          (a.y = e.y / (Math.abs(e.x) + Math.abs(e.y) + Math.abs(e.z))),
          e.z < 0)
        ) {
          var i = a.x,
            d = a.y;
          (a.x = (1 - Math.abs(d)) * o.CesiumMath.signNotZero(i)),
            (a.y = (1 - Math.abs(i)) * o.CesiumMath.signNotZero(d));
        }
        return (
          (a.x = o.CesiumMath.toSNorm(a.x, t)),
          (a.y = o.CesiumMath.toSNorm(a.y, t)),
          a
        );
      },
      octEncode: function (e, t) {
        return c.octEncodeInRange(e, 255, t);
      },
    },
    i = new a.Cartesian2(),
    d = new Uint8Array(1);
  function h(e) {
    return (d[0] = e), d[0];
  }
  (c.octEncodeToCartesian4 = function (e, t) {
    return (
      c.octEncodeInRange(e, 65535, i),
      (t.x = h(i.x * (1 / 256))),
      (t.y = h(i.x)),
      (t.z = h(i.y * (1 / 256))),
      (t.w = h(i.y)),
      t
    );
  }),
    (c.octDecodeInRange = function (e, t, a, c) {
      if ((n.Check.defined('result', c), e < 0 || a < e || t < 0 || a < t))
        throw new n.DeveloperError(
          'x and y must be unsigned normalized integers between 0 and ' + a,
        );
      if (
        ((c.x = o.CesiumMath.fromSNorm(e, a)),
        (c.y = o.CesiumMath.fromSNorm(t, a)),
        (c.z = 1 - (Math.abs(c.x) + Math.abs(c.y))),
        c.z < 0)
      ) {
        var i = c.x;
        (c.x = (1 - Math.abs(c.y)) * o.CesiumMath.signNotZero(i)),
          (c.y = (1 - Math.abs(i)) * o.CesiumMath.signNotZero(c.y));
      }
      return r.Cartesian3.normalize(c, c);
    }),
    (c.octDecode = function (e, t, n) {
      return c.octDecodeInRange(e, t, 255, n);
    }),
    (c.octDecodeFromCartesian4 = function (e, t) {
      n.Check.typeOf.object('encoded', e), n.Check.typeOf.object('result', t);
      var o = e.x,
        r = e.y,
        a = e.z,
        i = e.w;
      if (
        o < 0 ||
        255 < o ||
        r < 0 ||
        255 < r ||
        a < 0 ||
        255 < a ||
        i < 0 ||
        255 < i
      )
        throw new n.DeveloperError(
          'x, y, z, and w must be unsigned normalized integers between 0 and 255',
        );
      var d = 256 * o + r,
        h = 256 * a + i;
      return c.octDecodeInRange(d, h, 65535, t);
    }),
    (c.octPackFloat = function (e) {
      return n.Check.defined('encoded', e), 256 * e.x + e.y;
    });
  var u = new a.Cartesian2();
  function f(e) {
    return (e >> 1) ^ -(1 & e);
  }
  (c.octEncodeFloat = function (e) {
    return c.octEncode(e, u), c.octPackFloat(u);
  }),
    (c.octDecodeFloat = function (e, t) {
      n.Check.defined('value', e);
      var o = e / 256,
        r = Math.floor(o),
        a = 256 * (o - r);
      return c.octDecode(r, a, t);
    }),
    (c.octPack = function (e, t, o, r) {
      n.Check.defined('v1', e),
        n.Check.defined('v2', t),
        n.Check.defined('v3', o),
        n.Check.defined('result', r);
      var a = c.octEncodeFloat(e),
        i = c.octEncodeFloat(t),
        d = c.octEncode(o, u);
      return (r.x = 65536 * d.x + a), (r.y = 65536 * d.y + i), r;
    }),
    (c.octUnpack = function (e, t, o, r) {
      n.Check.defined('packed', e),
        n.Check.defined('v1', t),
        n.Check.defined('v2', o),
        n.Check.defined('v3', r);
      var a = e.x / 65536,
        i = Math.floor(a),
        d = 65536 * (a - i);
      a = e.y / 65536;
      var h = Math.floor(a),
        u = 65536 * (a - h);
      c.octDecodeFloat(d, t), c.octDecodeFloat(u, o), c.octDecode(i, h, r);
    }),
    (c.compressTextureCoordinates = function (e) {
      return (
        n.Check.defined('textureCoordinates', e),
        4096 * ((4095 * e.x) | 0) + ((4095 * e.y) | 0)
      );
    }),
    (c.decompressTextureCoordinates = function (e, t) {
      n.Check.defined('compressed', e), n.Check.defined('result', t);
      var o = e / 4096,
        r = Math.floor(o);
      return (t.x = r / 4095), (t.y = (e - 4096 * r) / 4095), t;
    }),
    (c.zigZagDeltaDecode = function (e, o, r) {
      n.Check.defined('uBuffer', e),
        n.Check.defined('vBuffer', o),
        n.Check.typeOf.number.equals(
          'uBuffer.length',
          'vBuffer.length',
          e.length,
          o.length,
        ),
        t.defined(r) &&
          n.Check.typeOf.number.equals(
            'uBuffer.length',
            'heightBuffer.length',
            e.length,
            r.length,
          );
      for (var a = e.length, c = 0, i = 0, d = 0, h = 0; h < a; ++h)
        (c += f(e[h])),
          (i += f(o[h])),
          (e[h] = c),
          (o[h] = i),
          t.defined(r) && ((d += f(r[h])), (r[h] = d));
    }),
    (c.octShortToFloat = function (e) {
      return o.CesiumMath.clamp(3051850947599719e-20 * e, -1, 1);
    }),
    (c.octShortDecode = function (e, t, a) {
      if (
        (n.Check.defined('result', a),
        (a.x = c.octShortToFloat(e)),
        (a.y = c.octShortToFloat(t)),
        (a.z = 1 - (Math.abs(a.x) + Math.abs(a.y))),
        a.z < 0)
      ) {
        var i = a.x;
        (a.x = (1 - Math.abs(a.y)) * o.CesiumMath.signNotZero(i)),
          (a.y = (1 - Math.abs(i)) * o.CesiumMath.signNotZero(a.y));
      }
      return r.Cartesian3.normalize(a, a);
    }),
    (e.AttributeCompression = c);
});
