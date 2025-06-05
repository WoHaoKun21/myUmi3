define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
], function (e, t, n, r) {
  function a(e, n, r, a) {
    (this.x = t.defaultValue(e, 0)),
      (this.y = t.defaultValue(n, 0)),
      (this.z = t.defaultValue(r, 0)),
      (this.w = t.defaultValue(a, 0));
  }
  (a.fromElements = function (e, n, r, c, o) {
    return t.defined(o)
      ? ((o.x = e), (o.y = n), (o.z = r), (o.w = c), o)
      : new a(e, n, r, c);
  }),
    (a.fromColor = function (e, r) {
      return (
        n.Check.typeOf.object('color', e),
        t.defined(r)
          ? ((r.x = e.red), (r.y = e.green), (r.z = e.blue), (r.w = e.alpha), r)
          : new a(e.red, e.green, e.blue, e.alpha)
      );
    }),
    (a.clone = function (e, n) {
      if (t.defined(e))
        return t.defined(n)
          ? ((n.x = e.x), (n.y = e.y), (n.z = e.z), (n.w = e.w), n)
          : new a(e.x, e.y, e.z, e.w);
    }),
    (a.packedLength = 4),
    (a.pack = function (e, r, a) {
      return (
        n.Check.typeOf.object('value', e),
        n.Check.defined('array', r),
        (a = t.defaultValue(a, 0)),
        (r[a++] = e.x),
        (r[a++] = e.y),
        (r[a++] = e.z),
        (r[a] = e.w),
        r
      );
    }),
    (a.unpack = function (e, r, c) {
      return (
        n.Check.defined('array', e),
        (r = t.defaultValue(r, 0)),
        t.defined(c) || (c = new a()),
        (c.x = e[r++]),
        (c.y = e[r++]),
        (c.z = e[r++]),
        (c.w = e[r]),
        c
      );
    }),
    (a.packArray = function (e, r) {
      n.Check.defined('array', e);
      var c = e.length,
        o = 4 * c;
      if (t.defined(r)) {
        if (!Array.isArray(r) && r.length !== o)
          throw new n.DeveloperError(
            'If result is a typed array, it must have exactly array.length * 4 elements',
          );
        r.length !== o && (r.length = o);
      } else r = new Array(o);
      for (var u = 0; u < c; ++u) a.pack(e[u], r, 4 * u);
      return r;
    }),
    (a.unpackArray = function (e, r) {
      if (
        (n.Check.defined('array', e),
        n.Check.typeOf.number.greaterThanOrEquals('array.length', e.length, 4),
        e.length % 4 != 0)
      )
        throw new n.DeveloperError('array length must be a multiple of 4.');
      var c = e.length;
      t.defined(r) ? (r.length = c / 4) : (r = new Array(c / 4));
      for (var o = 0; o < c; o += 4) {
        var u = o / 4;
        r[u] = a.unpack(e, o, r[u]);
      }
      return r;
    }),
    (a.fromArray = a.unpack),
    (a.maximumComponent = function (e) {
      return (
        n.Check.typeOf.object('cartesian', e), Math.max(e.x, e.y, e.z, e.w)
      );
    }),
    (a.minimumComponent = function (e) {
      return (
        n.Check.typeOf.object('cartesian', e), Math.min(e.x, e.y, e.z, e.w)
      );
    }),
    (a.minimumByComponent = function (e, t, r) {
      return (
        n.Check.typeOf.object('first', e),
        n.Check.typeOf.object('second', t),
        n.Check.typeOf.object('result', r),
        (r.x = Math.min(e.x, t.x)),
        (r.y = Math.min(e.y, t.y)),
        (r.z = Math.min(e.z, t.z)),
        (r.w = Math.min(e.w, t.w)),
        r
      );
    }),
    (a.maximumByComponent = function (e, t, r) {
      return (
        n.Check.typeOf.object('first', e),
        n.Check.typeOf.object('second', t),
        n.Check.typeOf.object('result', r),
        (r.x = Math.max(e.x, t.x)),
        (r.y = Math.max(e.y, t.y)),
        (r.z = Math.max(e.z, t.z)),
        (r.w = Math.max(e.w, t.w)),
        r
      );
    }),
    (a.magnitudeSquared = function (e) {
      return (
        n.Check.typeOf.object('cartesian', e),
        e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w
      );
    }),
    (a.magnitude = function (e) {
      return Math.sqrt(a.magnitudeSquared(e));
    });
  var c = new a();
  (a.distance = function (e, t) {
    return (
      n.Check.typeOf.object('left', e),
      n.Check.typeOf.object('right', t),
      a.subtract(e, t, c),
      a.magnitude(c)
    );
  }),
    (a.distanceSquared = function (e, t) {
      return (
        n.Check.typeOf.object('left', e),
        n.Check.typeOf.object('right', t),
        a.subtract(e, t, c),
        a.magnitudeSquared(c)
      );
    }),
    (a.normalize = function (e, t) {
      n.Check.typeOf.object('cartesian', e), n.Check.typeOf.object('result', t);
      var r = a.magnitude(e);
      if (
        ((t.x = e.x / r),
        (t.y = e.y / r),
        (t.z = e.z / r),
        (t.w = e.w / r),
        isNaN(t.x) || isNaN(t.y) || isNaN(t.z) || isNaN(t.w))
      )
        throw new n.DeveloperError('normalized result is not a number');
      return t;
    }),
    (a.dot = function (e, t) {
      return (
        n.Check.typeOf.object('left', e),
        n.Check.typeOf.object('right', t),
        e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w
      );
    }),
    (a.multiplyComponents = function (e, t, r) {
      return (
        n.Check.typeOf.object('left', e),
        n.Check.typeOf.object('right', t),
        n.Check.typeOf.object('result', r),
        (r.x = e.x * t.x),
        (r.y = e.y * t.y),
        (r.z = e.z * t.z),
        (r.w = e.w * t.w),
        r
      );
    }),
    (a.divideComponents = function (e, t, r) {
      return (
        n.Check.typeOf.object('left', e),
        n.Check.typeOf.object('right', t),
        n.Check.typeOf.object('result', r),
        (r.x = e.x / t.x),
        (r.y = e.y / t.y),
        (r.z = e.z / t.z),
        (r.w = e.w / t.w),
        r
      );
    }),
    (a.add = function (e, t, r) {
      return (
        n.Check.typeOf.object('left', e),
        n.Check.typeOf.object('right', t),
        n.Check.typeOf.object('result', r),
        (r.x = e.x + t.x),
        (r.y = e.y + t.y),
        (r.z = e.z + t.z),
        (r.w = e.w + t.w),
        r
      );
    }),
    (a.subtract = function (e, t, r) {
      return (
        n.Check.typeOf.object('left', e),
        n.Check.typeOf.object('right', t),
        n.Check.typeOf.object('result', r),
        (r.x = e.x - t.x),
        (r.y = e.y - t.y),
        (r.z = e.z - t.z),
        (r.w = e.w - t.w),
        r
      );
    }),
    (a.multiplyByScalar = function (e, t, r) {
      return (
        n.Check.typeOf.object('cartesian', e),
        n.Check.typeOf.number('scalar', t),
        n.Check.typeOf.object('result', r),
        (r.x = e.x * t),
        (r.y = e.y * t),
        (r.z = e.z * t),
        (r.w = e.w * t),
        r
      );
    }),
    (a.divideByScalar = function (e, t, r) {
      return (
        n.Check.typeOf.object('cartesian', e),
        n.Check.typeOf.number('scalar', t),
        n.Check.typeOf.object('result', r),
        (r.x = e.x / t),
        (r.y = e.y / t),
        (r.z = e.z / t),
        (r.w = e.w / t),
        r
      );
    }),
    (a.negate = function (e, t) {
      return (
        n.Check.typeOf.object('cartesian', e),
        n.Check.typeOf.object('result', t),
        (t.x = -e.x),
        (t.y = -e.y),
        (t.z = -e.z),
        (t.w = -e.w),
        t
      );
    }),
    (a.abs = function (e, t) {
      return (
        n.Check.typeOf.object('cartesian', e),
        n.Check.typeOf.object('result', t),
        (t.x = Math.abs(e.x)),
        (t.y = Math.abs(e.y)),
        (t.z = Math.abs(e.z)),
        (t.w = Math.abs(e.w)),
        t
      );
    });
  var o = new a();
  a.lerp = function (e, t, r, c) {
    return (
      n.Check.typeOf.object('start', e),
      n.Check.typeOf.object('end', t),
      n.Check.typeOf.number('t', r),
      n.Check.typeOf.object('result', c),
      a.multiplyByScalar(t, r, o),
      (c = a.multiplyByScalar(e, 1 - r, c)),
      a.add(o, c, c)
    );
  };
  var u = new a();
  (a.mostOrthogonalAxis = function (e, t) {
    n.Check.typeOf.object('cartesian', e), n.Check.typeOf.object('result', t);
    var r = a.normalize(e, u);
    return (
      a.abs(r, r),
      r.x <= r.y
        ? r.x <= r.z
          ? r.x <= r.w
            ? a.clone(a.UNIT_X, t)
            : a.clone(a.UNIT_W, t)
          : r.z <= r.w
          ? a.clone(a.UNIT_Z, t)
          : a.clone(a.UNIT_W, t)
        : r.y <= r.z
        ? r.y <= r.w
          ? a.clone(a.UNIT_Y, t)
          : a.clone(a.UNIT_W, t)
        : r.z <= r.w
        ? a.clone(a.UNIT_Z, t)
        : a.clone(a.UNIT_W, t)
    );
  }),
    (a.equals = function (e, n) {
      return (
        e === n ||
        (t.defined(e) &&
          t.defined(n) &&
          e.x === n.x &&
          e.y === n.y &&
          e.z === n.z &&
          e.w === n.w)
      );
    }),
    (a.equalsArray = function (e, t, n) {
      return (
        e.x === t[n] && e.y === t[n + 1] && e.z === t[n + 2] && e.w === t[n + 3]
      );
    }),
    (a.equalsEpsilon = function (e, n, a, c) {
      return (
        e === n ||
        (t.defined(e) &&
          t.defined(n) &&
          r.CesiumMath.equalsEpsilon(e.x, n.x, a, c) &&
          r.CesiumMath.equalsEpsilon(e.y, n.y, a, c) &&
          r.CesiumMath.equalsEpsilon(e.z, n.z, a, c) &&
          r.CesiumMath.equalsEpsilon(e.w, n.w, a, c))
      );
    }),
    (a.ZERO = Object.freeze(new a(0, 0, 0, 0))),
    (a.UNIT_X = Object.freeze(new a(1, 0, 0, 0))),
    (a.UNIT_Y = Object.freeze(new a(0, 1, 0, 0))),
    (a.UNIT_Z = Object.freeze(new a(0, 0, 1, 0))),
    (a.UNIT_W = Object.freeze(new a(0, 0, 0, 1))),
    (a.prototype.clone = function (e) {
      return a.clone(this, e);
    }),
    (a.prototype.equals = function (e) {
      return a.equals(this, e);
    }),
    (a.prototype.equalsEpsilon = function (e, t, n) {
      return a.equalsEpsilon(this, e, t, n);
    }),
    (a.prototype.toString = function () {
      return '(' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ')';
    });
  var i = new Float32Array(1);
  (a.packFloat = function (e, c) {
    if (
      (n.Check.typeOf.number('value', e),
      t.defined(c) || (c = new a()),
      (i[0] = e),
      0 === (e = i[0]))
    )
      return a.clone(a.ZERO, c);
    var o,
      u = e < 0 ? 1 : 0;
    isFinite(e)
      ? ((e = Math.abs(e)),
        (o = Math.floor(r.CesiumMath.logBase(e, 10)) + 1),
        (e /= Math.pow(10, o)))
      : ((e = 0.1), (o = 38));
    var f = 256 * e;
    return (
      (c.x = Math.floor(f)),
      (f = 256 * (f - c.x)),
      (c.y = Math.floor(f)),
      (f = 256 * (f - c.y)),
      (c.z = Math.floor(f)),
      (c.w = 2 * (o + 38) + u),
      c
    );
  }),
    (a.unpackFloat = function (e) {
      n.Check.typeOf.object('packedFloat', e);
      var t = e.w / 2,
        r = Math.floor(t),
        a = 2 * (t - r);
      if (((a = -(a = 2 * a - 1)), 38 <= (r -= 38)))
        return a < 0 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
      var c = a * e.x * 0.00390625;
      return (
        (c += a * e.y * (1 / 65536)),
        (c += a * e.z * (1 / 16777216)) * Math.pow(10, r)
      );
    }),
    (e.Cartesian4 = a);
});
