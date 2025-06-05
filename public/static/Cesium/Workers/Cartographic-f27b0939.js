define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
], function (e, t, n, r) {
  function a(e, n, r) {
    (this.x = t.defaultValue(e, 0)),
      (this.y = t.defaultValue(n, 0)),
      (this.z = t.defaultValue(r, 0));
  }
  (a.fromSpherical = function (e, r) {
    n.Check.typeOf.object('spherical', e), t.defined(r) || (r = new a());
    var i = e.clock,
      o = e.cone,
      u = t.defaultValue(e.magnitude, 1),
      c = u * Math.sin(o);
    return (
      (r.x = c * Math.cos(i)),
      (r.y = c * Math.sin(i)),
      (r.z = u * Math.cos(o)),
      r
    );
  }),
    (a.fromElements = function (e, n, r, i) {
      return t.defined(i)
        ? ((i.x = e), (i.y = n), (i.z = r), i)
        : new a(e, n, r);
    }),
    (a.fromCartesian4 = a.clone =
      function (e, n) {
        if (t.defined(e))
          return t.defined(n)
            ? ((n.x = e.x), (n.y = e.y), (n.z = e.z), n)
            : new a(e.x, e.y, e.z);
      }),
    (a.packedLength = 3),
    (a.pack = function (e, r, a) {
      return (
        n.Check.typeOf.object('value', e),
        n.Check.defined('array', r),
        (a = t.defaultValue(a, 0)),
        (r[a++] = e.x),
        (r[a++] = e.y),
        (r[a] = e.z),
        r
      );
    }),
    (a.unpack = function (e, r, i) {
      return (
        n.Check.defined('array', e),
        (r = t.defaultValue(r, 0)),
        t.defined(i) || (i = new a()),
        (i.x = e[r++]),
        (i.y = e[r++]),
        (i.z = e[r]),
        i
      );
    }),
    (a.packArray = function (e, r) {
      n.Check.defined('array', e);
      var i = e.length;
      t.defined(r) ? (r.length = 3 * i) : (r = new Array(3 * i));
      for (var o = 0; o < i; ++o) a.pack(e[o], r, 3 * o);
      return r;
    }),
    (a.unpackArray = function (e, r) {
      if (
        (n.Check.defined('array', e),
        n.Check.typeOf.number.greaterThanOrEquals('array.length', e.length, 3),
        e.length % 3 != 0)
      )
        throw new n.DeveloperError('array length must be a multiple of 3.');
      var i = e.length;
      t.defined(r) ? (r.length = i / 3) : (r = new Array(i / 3));
      for (var o = 0; o < i; o += 3) {
        var u = o / 3;
        r[u] = a.unpack(e, o, r[u]);
      }
      return r;
    }),
    (a.fromArray = a.unpack),
    (a.maximumComponent = function (e) {
      return n.Check.typeOf.object('cartesian', e), Math.max(e.x, e.y, e.z);
    }),
    (a.minimumComponent = function (e) {
      return n.Check.typeOf.object('cartesian', e), Math.min(e.x, e.y, e.z);
    }),
    (a.minimumByComponent = function (e, t, r) {
      return (
        n.Check.typeOf.object('first', e),
        n.Check.typeOf.object('second', t),
        n.Check.typeOf.object('result', r),
        (r.x = Math.min(e.x, t.x)),
        (r.y = Math.min(e.y, t.y)),
        (r.z = Math.min(e.z, t.z)),
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
        r
      );
    }),
    (a.magnitudeSquared = function (e) {
      return (
        n.Check.typeOf.object('cartesian', e), e.x * e.x + e.y * e.y + e.z * e.z
      );
    }),
    (a.magnitude = function (e) {
      return Math.sqrt(a.magnitudeSquared(e));
    });
  var i = new a();
  (a.distance = function (e, t) {
    return (
      n.Check.typeOf.object('left', e),
      n.Check.typeOf.object('right', t),
      a.subtract(e, t, i),
      a.magnitude(i)
    );
  }),
    (a.distanceSquared = function (e, t) {
      return (
        n.Check.typeOf.object('left', e),
        n.Check.typeOf.object('right', t),
        a.subtract(e, t, i),
        a.magnitudeSquared(i)
      );
    }),
    (a.normalize = function (e, t) {
      n.Check.typeOf.object('cartesian', e), n.Check.typeOf.object('result', t);
      var r = a.magnitude(e);
      if (
        ((t.x = e.x / r),
        (t.y = e.y / r),
        (t.z = e.z / r),
        isNaN(t.x) || isNaN(t.y) || isNaN(t.z))
      )
        throw new n.DeveloperError('normalized result is not a number');
      return t;
    }),
    (a.dot = function (e, t) {
      return (
        n.Check.typeOf.object('left', e),
        n.Check.typeOf.object('right', t),
        e.x * t.x + e.y * t.y + e.z * t.z
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
        t
      );
    });
  var o = new a();
  a.lerp = function (e, t, r, i) {
    return (
      n.Check.typeOf.object('start', e),
      n.Check.typeOf.object('end', t),
      n.Check.typeOf.number('t', r),
      n.Check.typeOf.object('result', i),
      a.multiplyByScalar(t, r, o),
      (i = a.multiplyByScalar(e, 1 - r, i)),
      a.add(o, i, i)
    );
  };
  var u = new a(),
    c = new a();
  a.angleBetween = function (e, t) {
    n.Check.typeOf.object('left', e),
      n.Check.typeOf.object('right', t),
      a.normalize(e, u),
      a.normalize(t, c);
    var r = a.dot(u, c),
      i = a.magnitude(a.cross(u, c, u));
    return Math.atan2(i, r);
  };
  var f = new a();
  (a.mostOrthogonalAxis = function (e, t) {
    n.Check.typeOf.object('cartesian', e), n.Check.typeOf.object('result', t);
    var r = a.normalize(e, f);
    return (
      a.abs(r, r),
      r.x <= r.y
        ? r.x <= r.z
          ? a.clone(a.UNIT_X, t)
          : a.clone(a.UNIT_Z, t)
        : r.y <= r.z
        ? a.clone(a.UNIT_Y, t)
        : a.clone(a.UNIT_Z, t)
    );
  }),
    (a.projectVector = function (e, t, r) {
      n.Check.defined('a', e),
        n.Check.defined('b', t),
        n.Check.defined('result', r);
      var i = a.dot(e, t) / a.dot(t, t);
      return a.multiplyByScalar(t, i, r);
    }),
    (a.equals = function (e, n) {
      return (
        e === n ||
        (t.defined(e) &&
          t.defined(n) &&
          e.x === n.x &&
          e.y === n.y &&
          e.z === n.z)
      );
    }),
    (a.equalsArray = function (e, t, n) {
      return e.x === t[n] && e.y === t[n + 1] && e.z === t[n + 2];
    }),
    (a.equalsEpsilon = function (e, n, a, i) {
      return (
        e === n ||
        (t.defined(e) &&
          t.defined(n) &&
          r.CesiumMath.equalsEpsilon(e.x, n.x, a, i) &&
          r.CesiumMath.equalsEpsilon(e.y, n.y, a, i) &&
          r.CesiumMath.equalsEpsilon(e.z, n.z, a, i))
      );
    }),
    (a.cross = function (e, t, r) {
      n.Check.typeOf.object('left', e),
        n.Check.typeOf.object('right', t),
        n.Check.typeOf.object('result', r);
      var a = e.x,
        i = e.y,
        o = e.z,
        u = t.x,
        c = t.y,
        f = t.z,
        d = i * f - o * c,
        h = o * u - a * f,
        l = a * c - i * u;
      return (r.x = d), (r.y = h), (r.z = l), r;
    }),
    (a.midpoint = function (e, t, r) {
      return (
        n.Check.typeOf.object('left', e),
        n.Check.typeOf.object('right', t),
        n.Check.typeOf.object('result', r),
        (r.x = 0.5 * (e.x + t.x)),
        (r.y = 0.5 * (e.y + t.y)),
        (r.z = 0.5 * (e.z + t.z)),
        r
      );
    }),
    (a.fromDegrees = function (e, t, i, o, u) {
      return (
        n.Check.typeOf.number('longitude', e),
        n.Check.typeOf.number('latitude', t),
        (e = r.CesiumMath.toRadians(e)),
        (t = r.CesiumMath.toRadians(t)),
        a.fromRadians(e, t, i, o, u)
      );
    });
  var d = new a(),
    h = new a(),
    l = new a(40680631590769, 40680631590769, 40408299984661.445),
    s = new a(40680631590769, 40680631590769, 40680631590769);
  (a.fromRadians = function (e, i, o, u, c) {
    n.Check.typeOf.number('longitude', e),
      n.Check.typeOf.number('latitude', i),
      (o = t.defaultValue(o, 0));
    var f = t.defined(u) ? u.radiiSquared : s;
    r.CesiumMath.equalsEpsilon(
      r.CesiumMath.Radius,
      6356752.314245179,
      r.CesiumMath.EPSILON10,
    ) && (f = t.defined(u) ? u.radiiSquared : l);
    var y = Math.cos(i);
    (d.x = y * Math.cos(e)),
      (d.y = y * Math.sin(e)),
      (d.z = Math.sin(i)),
      (d = a.normalize(d, d)),
      a.multiplyComponents(f, d, h);
    var p = Math.sqrt(a.dot(d, h));
    return (
      (h = a.divideByScalar(h, p, h)),
      (d = a.multiplyByScalar(d, o, d)),
      t.defined(c) || (c = new a()),
      a.add(h, d, c)
    );
  }),
    (a.fromDegreesArray = function (e, r, i) {
      if (
        (n.Check.defined('coordinates', e), e.length < 2 || e.length % 2 != 0)
      )
        throw new n.DeveloperError(
          'the number of coordinates must be a multiple of 2 and at least 2',
        );
      var o = e.length;
      t.defined(i) ? (i.length = o / 2) : (i = new Array(o / 2));
      for (var u = 0; u < o; u += 2) {
        var c = e[u],
          f = e[u + 1],
          d = u / 2;
        i[d] = a.fromDegrees(c, f, 0, r, i[d]);
      }
      return i;
    }),
    (a.fromRadiansArray = function (e, r, i) {
      if (
        (n.Check.defined('coordinates', e), e.length < 2 || e.length % 2 != 0)
      )
        throw new n.DeveloperError(
          'the number of coordinates must be a multiple of 2 and at least 2',
        );
      var o = e.length;
      t.defined(i) ? (i.length = o / 2) : (i = new Array(o / 2));
      for (var u = 0; u < o; u += 2) {
        var c = e[u],
          f = e[u + 1],
          d = u / 2;
        i[d] = a.fromRadians(c, f, 0, r, i[d]);
      }
      return i;
    }),
    (a.fromDegreesArrayHeights = function (e, r, i) {
      if (
        (n.Check.defined('coordinates', e), e.length < 3 || e.length % 3 != 0)
      )
        throw new n.DeveloperError(
          'the number of coordinates must be a multiple of 3 and at least 3',
        );
      var o = e.length;
      t.defined(i) ? (i.length = o / 3) : (i = new Array(o / 3));
      for (var u = 0; u < o; u += 3) {
        var c = e[u],
          f = e[u + 1],
          d = e[u + 2],
          h = u / 3;
        i[h] = a.fromDegrees(c, f, d, r, i[h]);
      }
      return i;
    }),
    (a.fromRadiansArrayHeights = function (e, r, i) {
      if (
        (n.Check.defined('coordinates', e), e.length < 3 || e.length % 3 != 0)
      )
        throw new n.DeveloperError(
          'the number of coordinates must be a multiple of 3 and at least 3',
        );
      var o = e.length;
      t.defined(i) ? (i.length = o / 3) : (i = new Array(o / 3));
      for (var u = 0; u < o; u += 3) {
        var c = e[u],
          f = e[u + 1],
          d = e[u + 2],
          h = u / 3;
        i[h] = a.fromRadians(c, f, d, r, i[h]);
      }
      return i;
    }),
    (a.ZERO = Object.freeze(new a(0, 0, 0))),
    (a.UNIT_X = Object.freeze(new a(1, 0, 0))),
    (a.UNIT_Y = Object.freeze(new a(0, 1, 0))),
    (a.UNIT_Z = Object.freeze(new a(0, 0, 1))),
    (a.UNIT_XYZ = Object.freeze(new a(1, 1, 1))),
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
      return '(' + this.x + ', ' + this.y + ', ' + this.z + ')';
    }),
    (a.globalOffset = new a(0, 0, 0));
  var y = new a(),
    p = new a();
  function m(e, i, o, u, c) {
    if (!t.defined(e)) throw new n.DeveloperError('cartesian is required.');
    if (!t.defined(i)) throw new n.DeveloperError('oneOverRadii is required.');
    if (!t.defined(o))
      throw new n.DeveloperError('oneOverRadiiSquared is required.');
    if (!t.defined(u))
      throw new n.DeveloperError('centerToleranceSquared is required.');
    var f = e.x,
      d = e.y,
      h = e.z,
      l = i.x,
      s = i.y,
      m = i.z,
      C = f * f * l * l,
      b = d * d * s * s,
      g = h * h * m * m,
      k = C + b + g,
      O = Math.sqrt(1 / k),
      z = a.multiplyByScalar(e, O, y);
    if (k < u) return isFinite(O) ? a.clone(z, c) : void 0;
    var x = o.x,
      w = o.y,
      v = o.z,
      j = p;
    (j.x = z.x * x * 2), (j.y = z.y * w * 2), (j.z = z.z * v * 2);
    var M,
      q,
      E,
      R,
      S,
      N,
      A,
      D = ((1 - O) * a.magnitude(e)) / (0.5 * a.magnitude(j)),
      B = 0;
    do {
      B =
        (M =
          C * (S = (q = 1 / (1 + (D -= B) * x)) * q) +
          b * (N = (E = 1 / (1 + D * w)) * E) +
          g * (A = (R = 1 / (1 + D * v)) * R) -
          1) /
        (-2 * (C * (S * q) * x + b * (N * E) * w + g * (A * R) * v));
    } while (Math.abs(M) > r.CesiumMath.EPSILON12);
    return t.defined(c)
      ? ((c.x = f * q), (c.y = d * E), (c.z = h * R), c)
      : new a(f * q, d * E, h * R);
  }
  function C(e, n, r) {
    (this.longitude = t.defaultValue(e, 0)),
      (this.latitude = t.defaultValue(n, 0)),
      (this.height = t.defaultValue(r, 0));
  }
  (C.fromRadians = function (e, r, a, i) {
    return (
      n.Check.typeOf.number('longitude', e),
      n.Check.typeOf.number('latitude', r),
      (a = t.defaultValue(a, 0)),
      t.defined(i)
        ? ((i.longitude = e), (i.latitude = r), (i.height = a), i)
        : new C(e, r, a)
    );
  }),
    (C.fromDegrees = function (e, t, a, i) {
      return (
        n.Check.typeOf.number('longitude', e),
        n.Check.typeOf.number('latitude', t),
        (e = r.CesiumMath.toRadians(e)),
        (t = r.CesiumMath.toRadians(t)),
        C.fromRadians(e, t, a, i)
      );
    });
  var b = new a(),
    g = new a(),
    k = new a(),
    O = new a(1 / 6378137, 1 / 6378137, 1 / 6356752.314245179),
    z = new a(1 / 6378137, 1 / 6378137, 1 / 6378137),
    x = new a(1 / 40680631590769, 1 / 40680631590769, 1 / 40408299984661.445),
    w = new a(1 / 40680631590769, 1 / 40680631590769, 1 / 40680631590769),
    v = r.CesiumMath.EPSILON1;
  (C.fromCartesian = function (e, n, i) {
    var o = t.defined(n) ? n.oneOverRadii : z,
      u = t.defined(n) ? n.oneOverRadiiSquared : w,
      c = t.defined(n) ? n._centerToleranceSquared : v;
    r.CesiumMath.equalsEpsilon(
      r.CesiumMath.Radius,
      6356752.314245179,
      r.CesiumMath.EPSILON10,
    ) &&
      ((o = t.defined(n) ? n.oneOverRadii : O),
      (u = t.defined(n) ? n.oneOverRadiiSquared : x));
    var f = m(e, o, u, c, g);
    if (t.defined(f)) {
      var d = a.multiplyComponents(f, u, b);
      d = a.normalize(d, d);
      var h = a.subtract(e, f, k),
        l = Math.atan2(d.y, d.x),
        s = Math.asin(d.z),
        y = r.CesiumMath.sign(a.dot(h, e)) * a.magnitude(h);
      return t.defined(i)
        ? ((i.longitude = l), (i.latitude = s), (i.height = y), i)
        : new C(l, s, y);
    }
  }),
    (C.toCartesian = function (e, t, r) {
      return (
        n.Check.defined('cartographic', e),
        a.fromRadians(e.longitude, e.latitude, e.height, t, r)
      );
    }),
    (C.sphericalDistance = function (e, t, a, i) {
      if (
        (n.Check.defined('longitudeA', e),
        n.Check.defined('longitudeB', a),
        n.Check.defined('latitudeA', t),
        n.Check.defined('latitudeB', i),
        e === a && t === i)
      )
        return 0;
      var o = r.CesiumMath.toRadians(t),
        u = r.CesiumMath.toRadians(i),
        c = r.CesiumMath.toRadians(e),
        f = r.CesiumMath.toRadians(a),
        d = c * c + o * o,
        h = f * f + u * u,
        l =
          (d + h - ((c - f) * (c - f) + (o - u) * (o - u))) /
          (2 * Math.sqrt(d) * Math.sqrt(h));
      return (
        (l = r.CesiumMath.clamp(l, -1, 1)), Math.acos(l) * r.CesiumMath.Radius
      );
    }),
    (C.clone = function (e, n) {
      if (t.defined(e))
        return t.defined(n)
          ? ((n.longitude = e.longitude),
            (n.latitude = e.latitude),
            (n.height = e.height),
            n)
          : new C(e.longitude, e.latitude, e.height);
    }),
    (C.equals = function (e, n) {
      return (
        e === n ||
        (t.defined(e) &&
          t.defined(n) &&
          e.longitude === n.longitude &&
          e.latitude === n.latitude &&
          e.height === n.height)
      );
    }),
    (C.equalsEpsilon = function (e, r, a) {
      return (
        n.Check.typeOf.number('epsilon', a),
        e === r ||
          (t.defined(e) &&
            t.defined(r) &&
            Math.abs(e.longitude - r.longitude) <= a &&
            Math.abs(e.latitude - r.latitude) <= a &&
            Math.abs(e.height - r.height) <= a)
      );
    }),
    (C.ZERO = Object.freeze(new C(0, 0, 0))),
    (C.prototype.clone = function (e) {
      return C.clone(this, e);
    }),
    (C.prototype.equals = function (e) {
      return C.equals(this, e);
    }),
    (C.prototype.equalsEpsilon = function (e, t) {
      return C.equalsEpsilon(this, e, t);
    }),
    (C.prototype.toString = function () {
      return (
        '(' + this.longitude + ', ' + this.latitude + ', ' + this.height + ')'
      );
    }),
    (e.Cartesian3 = a),
    (e.Cartographic = C),
    (e.scaleToGeodeticSurface = m);
});
