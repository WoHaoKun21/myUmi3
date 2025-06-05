define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
], function (e, t, a, n, r) {
  function i(e, i, o, u) {
    (i = t.defaultValue(i, 0)),
      (o = t.defaultValue(o, 0)),
      (u = t.defaultValue(u, 0)),
      a.Check.typeOf.number.greaterThanOrEquals('x', i, 0),
      a.Check.typeOf.number.greaterThanOrEquals('y', o, 0),
      a.Check.typeOf.number.greaterThanOrEquals('z', u, 0),
      n.CesiumMath.equalsEpsilon(
        u,
        6356752.314245179,
        n.CesiumMath.EPSILON10,
      ) && (n.CesiumMath.Radius = u),
      (e._radii = new r.Cartesian3(i, o, u)),
      (e._radiiSquared = new r.Cartesian3(i * i, o * o, u * u)),
      (e._radiiToTheFourth = new r.Cartesian3(
        i * i * i * i,
        o * o * o * o,
        u * u * u * u,
      )),
      (e._oneOverRadii = new r.Cartesian3(
        0 === i ? 0 : 1 / i,
        0 === o ? 0 : 1 / o,
        0 === u ? 0 : 1 / u,
      )),
      (e._oneOverRadiiSquared = new r.Cartesian3(
        0 === i ? 0 : 1 / (i * i),
        0 === o ? 0 : 1 / (o * o),
        0 === u ? 0 : 1 / (u * u),
      )),
      (e._minimumRadius = Math.min(i, o, u)),
      (e._maximumRadius = Math.max(i, o, u)),
      (e._centerToleranceSquared = n.CesiumMath.EPSILON1),
      0 !== e._radiiSquared.z &&
        (e._squaredXOverSquaredZ = e._radiiSquared.x / e._radiiSquared.z);
  }
  function o(e, t, a) {
    (this._radii = void 0),
      (this._radiiSquared = void 0),
      (this._radiiToTheFourth = void 0),
      (this._oneOverRadii = void 0),
      (this._oneOverRadiiSquared = void 0),
      (this._minimumRadius = void 0),
      (this._maximumRadius = void 0),
      (this._centerToleranceSquared = void 0),
      (this._squaredXOverSquaredZ = void 0),
      i(this, e, t, a);
  }
  Object.defineProperties(o.prototype, {
    radii: {
      get: function () {
        return this._radii;
      },
    },
    radiiSquared: {
      get: function () {
        return this._radiiSquared;
      },
    },
    radiiToTheFourth: {
      get: function () {
        return this._radiiToTheFourth;
      },
    },
    oneOverRadii: {
      get: function () {
        return this._oneOverRadii;
      },
    },
    oneOverRadiiSquared: {
      get: function () {
        return this._oneOverRadiiSquared;
      },
    },
    minimumRadius: {
      get: function () {
        return this._minimumRadius;
      },
    },
    maximumRadius: {
      get: function () {
        return this._maximumRadius;
      },
    },
  }),
    (o.clone = function (e, a) {
      if (t.defined(e)) {
        var n = e._radii;
        return t.defined(a)
          ? (r.Cartesian3.clone(n, a._radii),
            r.Cartesian3.clone(e._radiiSquared, a._radiiSquared),
            r.Cartesian3.clone(e._radiiToTheFourth, a._radiiToTheFourth),
            r.Cartesian3.clone(e._oneOverRadii, a._oneOverRadii),
            r.Cartesian3.clone(e._oneOverRadiiSquared, a._oneOverRadiiSquared),
            (a._minimumRadius = e._minimumRadius),
            (a._maximumRadius = e._maximumRadius),
            (a._centerToleranceSquared = e._centerToleranceSquared),
            a)
          : new o(n.x, n.y, n.z);
      }
    }),
    (o.fromCartesian3 = function (e, a) {
      return (
        t.defined(a) || (a = new o()), t.defined(e) && i(a, e.x, e.y, e.z), a
      );
    }),
    (o.WGS84 = Object.freeze(new o(6378137, 6378137, n.CesiumMath.Radius))),
    (o.XIAN80 = Object.freeze(new o(6378140, 6378140, 6356755.29))),
    (o.CGCS2000 = Object.freeze(new o(6378137, 6378137, 6356752.31))),
    (o.UNIT_SPHERE = Object.freeze(new o(1, 1, 1))),
    (o.MOON = Object.freeze(
      new o(
        n.CesiumMath.LUNAR_RADIUS,
        n.CesiumMath.LUNAR_RADIUS,
        n.CesiumMath.LUNAR_RADIUS,
      ),
    )),
    (o.prototype.clone = function (e) {
      return o.clone(this, e);
    }),
    (o.packedLength = r.Cartesian3.packedLength),
    (o.pack = function (e, n, i) {
      return (
        a.Check.typeOf.object('value', e),
        a.Check.defined('array', n),
        (i = t.defaultValue(i, 0)),
        r.Cartesian3.pack(e._radii, n, i),
        n
      );
    }),
    (o.unpack = function (e, n, i) {
      a.Check.defined('array', e), (n = t.defaultValue(n, 0));
      var u = r.Cartesian3.unpack(e, n);
      return o.fromCartesian3(u, i);
    }),
    (o.prototype.geocentricSurfaceNormal = r.Cartesian3.normalize),
    (o.prototype.geodeticSurfaceNormalCartographic = function (e, n) {
      a.Check.typeOf.object('cartographic', e);
      var i = e.longitude,
        o = e.latitude,
        u = Math.cos(o),
        s = u * Math.cos(i),
        h = u * Math.sin(i),
        c = Math.sin(o);
      return (
        t.defined(n) || (n = new r.Cartesian3()),
        (n.x = s),
        (n.y = h),
        (n.z = c),
        r.Cartesian3.normalize(n, n)
      );
    }),
    (o.prototype.geodeticSurfaceNormal = function (e, a) {
      return (
        t.defined(a) || (a = new r.Cartesian3()),
        (a = r.Cartesian3.multiplyComponents(e, this._oneOverRadiiSquared, a)),
        r.Cartesian3.normalize(a, a)
      );
    });
  var u = new r.Cartesian3(),
    s = new r.Cartesian3();
  (o.prototype.cartographicToCartesian = function (e, a) {
    var n = u,
      i = s;
    this.geodeticSurfaceNormalCartographic(e, n),
      r.Cartesian3.multiplyComponents(this._radiiSquared, n, i);
    var o = Math.sqrt(r.Cartesian3.dot(n, i));
    return (
      r.Cartesian3.divideByScalar(i, o, i),
      r.Cartesian3.multiplyByScalar(n, e.height, n),
      t.defined(a) || (a = new r.Cartesian3()),
      r.Cartesian3.add(i, n, a)
    );
  }),
    (o.prototype.cartographicArrayToCartesianArray = function (e, n) {
      a.Check.defined('cartographics', e);
      var r = e.length;
      t.defined(n) ? (n.length = r) : (n = new Array(r));
      for (var i = 0; i < r; i++)
        n[i] = this.cartographicToCartesian(e[i], n[i]);
      return n;
    });
  var h = new r.Cartesian3(),
    c = new r.Cartesian3(),
    d = new r.Cartesian3();
  function f(e, a, n, r) {
    (this.west = t.defaultValue(e, 0)),
      (this.south = t.defaultValue(a, 0)),
      (this.east = t.defaultValue(n, 0)),
      (this.north = t.defaultValue(r, 0));
  }
  (o.prototype.cartesianToCartographic = function (e, a) {
    var i = this.scaleToGeodeticSurface(e, c);
    if (t.defined(i)) {
      var o = this.geodeticSurfaceNormal(i, h),
        u = r.Cartesian3.subtract(e, i, d),
        s = Math.atan2(o.y, o.x),
        f = Math.asin(o.z),
        l =
          n.CesiumMath.sign(r.Cartesian3.dot(u, e)) * r.Cartesian3.magnitude(u);
      return t.defined(a)
        ? ((a.longitude = s), (a.latitude = f), (a.height = l), a)
        : new r.Cartographic(s, f, l);
    }
  }),
    (o.prototype.cartesianArrayToCartographicArray = function (e, n) {
      a.Check.defined('cartesians', e);
      var r = e.length;
      t.defined(n) ? (n.length = r) : (n = new Array(r));
      for (var i = 0; i < r; ++i)
        n[i] = this.cartesianToCartographic(e[i], n[i]);
      return n;
    }),
    (o.prototype.scaleToGeodeticSurface = function (e, t) {
      return r.scaleToGeodeticSurface(
        e,
        this._oneOverRadii,
        this._oneOverRadiiSquared,
        this._centerToleranceSquared,
        t,
      );
    }),
    (o.prototype.scaleToGeocentricSurface = function (e, n) {
      a.Check.typeOf.object('cartesian', e),
        t.defined(n) || (n = new r.Cartesian3());
      var i = e.x,
        o = e.y,
        u = e.z,
        s = this._oneOverRadiiSquared,
        h = 1 / Math.sqrt(i * i * s.x + o * o * s.y + u * u * s.z);
      return r.Cartesian3.multiplyByScalar(e, h, n);
    }),
    (o.prototype.transformPositionToScaledSpace = function (e, a) {
      return (
        t.defined(a) || (a = new r.Cartesian3()),
        r.Cartesian3.multiplyComponents(e, this._oneOverRadii, a)
      );
    }),
    (o.prototype.transformPositionFromScaledSpace = function (e, a) {
      return (
        t.defined(a) || (a = new r.Cartesian3()),
        r.Cartesian3.multiplyComponents(e, this._radii, a)
      );
    }),
    (o.prototype.equals = function (e) {
      return (
        this === e ||
        (t.defined(e) && r.Cartesian3.equals(this._radii, e._radii))
      );
    }),
    (o.prototype.toString = function () {
      return this._radii.toString();
    }),
    (o.prototype.getSurfaceNormalIntersectionWithZAxis = function (e, i, o) {
      if (
        (a.Check.typeOf.object('position', e),
        !n.CesiumMath.equalsEpsilon(
          this._radii.x,
          this._radii.y,
          n.CesiumMath.EPSILON15,
        ))
      )
        throw new a.DeveloperError(
          'Ellipsoid must be an ellipsoid of revolution (radii.x == radii.y)',
        );
      a.Check.typeOf.number.greaterThan('Ellipsoid.radii.z', this._radii.z, 0),
        (i = t.defaultValue(i, 0));
      var u = this._squaredXOverSquaredZ;
      if (
        (t.defined(o) || (o = new r.Cartesian3()),
        (o.x = 0),
        (o.y = 0),
        (o.z = e.z * (1 - u)),
        !(Math.abs(o.z) >= this._radii.z - i))
      )
        return o;
    }),
    Object.defineProperties(f.prototype, {
      width: {
        get: function () {
          return f.computeWidth(this);
        },
      },
      height: {
        get: function () {
          return f.computeHeight(this);
        },
      },
    }),
    (f.packedLength = 4),
    (f.pack = function (e, n, r) {
      return (
        a.Check.typeOf.object('value', e),
        a.Check.defined('array', n),
        (r = t.defaultValue(r, 0)),
        (n[r++] = e.west),
        (n[r++] = e.south),
        (n[r++] = e.east),
        (n[r] = e.north),
        n
      );
    }),
    (f.unpack = function (e, n, r) {
      return (
        a.Check.defined('array', e),
        (n = t.defaultValue(n, 0)),
        t.defined(r) || (r = new f()),
        (r.west = e[n++]),
        (r.south = e[n++]),
        (r.east = e[n++]),
        (r.north = e[n]),
        r
      );
    }),
    (f.computeWidth = function (e) {
      a.Check.typeOf.object('rectangle', e);
      var t = e.east,
        r = e.west;
      return t < r && (t += n.CesiumMath.TWO_PI), t - r;
    }),
    (f.computeHeight = function (e) {
      return a.Check.typeOf.object('rectangle', e), e.north - e.south;
    }),
    (f.fromDegrees = function (e, a, r, i, o) {
      return (
        (e = n.CesiumMath.toRadians(t.defaultValue(e, 0))),
        (a = n.CesiumMath.toRadians(t.defaultValue(a, 0))),
        (r = n.CesiumMath.toRadians(t.defaultValue(r, 0))),
        (i = n.CesiumMath.toRadians(t.defaultValue(i, 0))),
        t.defined(o)
          ? ((o.west = e), (o.south = a), (o.east = r), (o.north = i), o)
          : new f(e, a, r, i)
      );
    }),
    (f.fromRadians = function (e, a, n, r, i) {
      return t.defined(i)
        ? ((i.west = t.defaultValue(e, 0)),
          (i.south = t.defaultValue(a, 0)),
          (i.east = t.defaultValue(n, 0)),
          (i.north = t.defaultValue(r, 0)),
          i)
        : new f(e, a, n, r);
    }),
    (f.fromCartographicArray = function (e, r) {
      a.Check.defined('cartographics', e);
      for (
        var i = Number.MAX_VALUE,
          o = -Number.MAX_VALUE,
          u = Number.MAX_VALUE,
          s = -Number.MAX_VALUE,
          h = Number.MAX_VALUE,
          c = -Number.MAX_VALUE,
          d = 0,
          l = e.length;
        d < l;
        d++
      ) {
        var p = e[d];
        (i = Math.min(i, p.longitude)),
          (o = Math.max(o, p.longitude)),
          (h = Math.min(h, p.latitude)),
          (c = Math.max(c, p.latitude));
        var C =
          0 <= p.longitude ? p.longitude : p.longitude + n.CesiumMath.TWO_PI;
        (u = Math.min(u, C)), (s = Math.max(s, C));
      }
      return (
        s - u < o - i &&
          ((i = u),
          (o = s) > n.CesiumMath.PI && (o -= n.CesiumMath.TWO_PI),
          i > n.CesiumMath.PI && (i -= n.CesiumMath.TWO_PI)),
        t.defined(r)
          ? ((r.west = i), (r.south = h), (r.east = o), (r.north = c), r)
          : new f(i, h, o, c)
      );
    }),
    (f.fromCartesianArray = function (e, r, i) {
      a.Check.defined('cartesians', e), (r = t.defaultValue(r, o.WGS84));
      for (
        var u = Number.MAX_VALUE,
          s = -Number.MAX_VALUE,
          h = Number.MAX_VALUE,
          c = -Number.MAX_VALUE,
          d = Number.MAX_VALUE,
          l = -Number.MAX_VALUE,
          p = 0,
          C = e.length;
        p < C;
        p++
      ) {
        var m = r.cartesianToCartographic(e[p]);
        (u = Math.min(u, m.longitude)),
          (s = Math.max(s, m.longitude)),
          (d = Math.min(d, m.latitude)),
          (l = Math.max(l, m.latitude));
        var y =
          0 <= m.longitude ? m.longitude : m.longitude + n.CesiumMath.TWO_PI;
        (h = Math.min(h, y)), (c = Math.max(c, y));
      }
      return (
        c - h < s - u &&
          ((u = h),
          (s = c) > n.CesiumMath.PI && (s -= n.CesiumMath.TWO_PI),
          u > n.CesiumMath.PI && (u -= n.CesiumMath.TWO_PI)),
        t.defined(i)
          ? ((i.west = u), (i.south = d), (i.east = s), (i.north = l), i)
          : new f(u, d, s, l)
      );
    }),
    (f.clone = function (e, a) {
      if (t.defined(e))
        return t.defined(a)
          ? ((a.west = e.west),
            (a.south = e.south),
            (a.east = e.east),
            (a.north = e.north),
            a)
          : new f(e.west, e.south, e.east, e.north);
    }),
    (f.equalsEpsilon = function (e, n, r) {
      return (
        a.Check.typeOf.number('absoluteEpsilon', r),
        e === n ||
          (t.defined(e) &&
            t.defined(n) &&
            Math.abs(e.west - n.west) <= r &&
            Math.abs(e.south - n.south) <= r &&
            Math.abs(e.east - n.east) <= r &&
            Math.abs(e.north - n.north) <= r)
      );
    }),
    (f.prototype.clone = function (e) {
      return f.clone(this, e);
    }),
    (f.prototype.equals = function (e) {
      return f.equals(this, e);
    }),
    (f.equals = function (e, a) {
      return (
        e === a ||
        (t.defined(e) &&
          t.defined(a) &&
          e.west === a.west &&
          e.south === a.south &&
          e.east === a.east &&
          e.north === a.north)
      );
    }),
    (f.prototype.equalsEpsilon = function (e, t) {
      return a.Check.typeOf.number('epsilon', t), f.equalsEpsilon(this, e, t);
    }),
    (f.validate = function (e) {
      a.Check.typeOf.object('rectangle', e);
      var t = e.north;
      a.Check.typeOf.number.greaterThanOrEquals(
        'north',
        t,
        -n.CesiumMath.PI_OVER_TWO,
      ),
        a.Check.typeOf.number.lessThanOrEquals(
          'north',
          t,
          n.CesiumMath.PI_OVER_TWO,
        );
      var r = e.south;
      a.Check.typeOf.number.greaterThanOrEquals(
        'south',
        r,
        -n.CesiumMath.PI_OVER_TWO,
      ),
        a.Check.typeOf.number.lessThanOrEquals(
          'south',
          r,
          n.CesiumMath.PI_OVER_TWO,
        );
      var i = e.west;
      a.Check.typeOf.number.greaterThanOrEquals('west', i, -Math.PI),
        a.Check.typeOf.number.lessThanOrEquals('west', i, Math.PI);
      var o = e.east;
      a.Check.typeOf.number.greaterThanOrEquals('east', o, -Math.PI),
        a.Check.typeOf.number.lessThanOrEquals('east', o, Math.PI);
    }),
    (f.southwest = function (e, n) {
      return (
        a.Check.typeOf.object('rectangle', e),
        t.defined(n)
          ? ((n.longitude = e.west), (n.latitude = e.south), (n.height = 0), n)
          : new r.Cartographic(e.west, e.south)
      );
    }),
    (f.northwest = function (e, n) {
      return (
        a.Check.typeOf.object('rectangle', e),
        t.defined(n)
          ? ((n.longitude = e.west), (n.latitude = e.north), (n.height = 0), n)
          : new r.Cartographic(e.west, e.north)
      );
    }),
    (f.northeast = function (e, n) {
      return (
        a.Check.typeOf.object('rectangle', e),
        t.defined(n)
          ? ((n.longitude = e.east), (n.latitude = e.north), (n.height = 0), n)
          : new r.Cartographic(e.east, e.north)
      );
    }),
    (f.southeast = function (e, n) {
      return (
        a.Check.typeOf.object('rectangle', e),
        t.defined(n)
          ? ((n.longitude = e.east), (n.latitude = e.south), (n.height = 0), n)
          : new r.Cartographic(e.east, e.south)
      );
    }),
    (f.center = function (e, i) {
      a.Check.typeOf.object('rectangle', e);
      var o = e.east,
        u = e.west;
      o < u && (o += n.CesiumMath.TWO_PI);
      var s = n.CesiumMath.negativePiToPi(0.5 * (u + o)),
        h = 0.5 * (e.south + e.north);
      return t.defined(i)
        ? ((i.longitude = s), (i.latitude = h), (i.height = 0), i)
        : new r.Cartographic(s, h);
    }),
    (f.intersection = function (e, r, i) {
      a.Check.typeOf.object('rectangle', e),
        a.Check.typeOf.object('otherRectangle', r);
      var o = e.east,
        u = e.west,
        s = r.east,
        h = r.west;
      o < u && 0 < s
        ? (o += n.CesiumMath.TWO_PI)
        : s < h && 0 < o && (s += n.CesiumMath.TWO_PI),
        o < u && h < 0
          ? (h += n.CesiumMath.TWO_PI)
          : s < h && u < 0 && (u += n.CesiumMath.TWO_PI);
      var c = n.CesiumMath.negativePiToPi(Math.max(u, h)),
        d = n.CesiumMath.negativePiToPi(Math.min(o, s));
      if (!((e.west < e.east || r.west < r.east) && d <= c)) {
        var l = Math.max(e.south, r.south),
          p = Math.min(e.north, r.north);
        if (!(p <= l))
          return t.defined(i)
            ? ((i.west = c), (i.south = l), (i.east = d), (i.north = p), i)
            : new f(c, l, d, p);
      }
    }),
    (f.simpleIntersection = function (e, n, r) {
      a.Check.typeOf.object('rectangle', e),
        a.Check.typeOf.object('otherRectangle', n);
      var i = Math.max(e.west, n.west),
        o = Math.max(e.south, n.south),
        u = Math.min(e.east, n.east),
        s = Math.min(e.north, n.north);
      if (!(s <= o || u <= i))
        return t.defined(r)
          ? ((r.west = i), (r.south = o), (r.east = u), (r.north = s), r)
          : new f(i, o, u, s);
    }),
    (f.union = function (e, r, i) {
      a.Check.typeOf.object('rectangle', e),
        a.Check.typeOf.object('otherRectangle', r),
        t.defined(i) || (i = new f());
      var o = e.east,
        u = e.west,
        s = r.east,
        h = r.west;
      o < u && 0 < s
        ? (o += n.CesiumMath.TWO_PI)
        : s < h && 0 < o && (s += n.CesiumMath.TWO_PI),
        o < u && h < 0
          ? (h += n.CesiumMath.TWO_PI)
          : s < h && u < 0 && (u += n.CesiumMath.TWO_PI);
      var c = n.CesiumMath.convertLongitudeRange(Math.min(u, h)),
        d = n.CesiumMath.convertLongitudeRange(Math.max(o, s));
      return (
        (i.west = c),
        (i.south = Math.min(e.south, r.south)),
        (i.east = d),
        (i.north = Math.max(e.north, r.north)),
        i
      );
    }),
    (f.expand = function (e, n, r) {
      return (
        a.Check.typeOf.object('rectangle', e),
        a.Check.typeOf.object('cartographic', n),
        t.defined(r) || (r = new f()),
        (r.west = Math.min(e.west, n.longitude)),
        (r.south = Math.min(e.south, n.latitude)),
        (r.east = Math.max(e.east, n.longitude)),
        (r.north = Math.max(e.north, n.latitude)),
        r
      );
    }),
    (f.contains = function (e, t) {
      a.Check.typeOf.object('rectangle', e),
        a.Check.typeOf.object('cartographic', t);
      var r = t.longitude,
        i = t.latitude,
        o = e.west,
        u = e.east;
      return (
        u < o &&
          ((u += n.CesiumMath.TWO_PI), r < 0 && (r += n.CesiumMath.TWO_PI)),
        (o < r || n.CesiumMath.equalsEpsilon(r, o, n.CesiumMath.EPSILON14)) &&
          (r < u || n.CesiumMath.equalsEpsilon(r, u, n.CesiumMath.EPSILON14)) &&
          i >= e.south &&
          i <= e.north
      );
    });
  var l = new r.Cartographic();
  f.subsample = function (e, r, i, u) {
    a.Check.typeOf.object('rectangle', e),
      (r = t.defaultValue(r, o.WGS84)),
      (i = t.defaultValue(i, 0)),
      t.defined(u) || (u = []);
    var s = 0,
      h = e.north,
      c = e.south,
      d = e.east,
      p = e.west,
      C = l;
    (C.height = i),
      (C.longitude = p),
      (C.latitude = h),
      (u[s] = r.cartographicToCartesian(C, u[s])),
      s++,
      (C.longitude = d),
      (u[s] = r.cartographicToCartesian(C, u[s])),
      s++,
      (C.latitude = c),
      (u[s] = r.cartographicToCartesian(C, u[s])),
      s++,
      (C.longitude = p),
      (u[s] = r.cartographicToCartesian(C, u[s])),
      s++,
      (C.latitude = h < 0 ? h : 0 < c ? c : 0);
    for (var m = 1; m < 8; ++m)
      (C.longitude = -Math.PI + m * n.CesiumMath.PI_OVER_TWO),
        f.contains(e, C) && ((u[s] = r.cartographicToCartesian(C, u[s])), s++);
    return (
      0 === C.latitude &&
        ((C.longitude = p),
        (u[s] = r.cartographicToCartesian(C, u[s])),
        s++,
        (C.longitude = d),
        (u[s] = r.cartographicToCartesian(C, u[s])),
        s++),
      (u.length = s),
      u
    );
  };
  var p = new r.Cartographic();
  function C(e, a) {
    (this.x = t.defaultValue(e, 0)), (this.y = t.defaultValue(a, 0));
  }
  (f.prototype.contains = function (e) {
    return (
      f.contains(this, f.southwest(e, p)) &&
      f.contains(this, f.northwest(e, p)) &&
      f.contains(this, f.southeast(e, p)) &&
      f.contains(this, f.northeast(e, p))
    );
  }),
    (f.MAX_VALUE = Object.freeze(
      new f(
        -Math.PI,
        -n.CesiumMath.PI_OVER_TWO,
        Math.PI,
        n.CesiumMath.PI_OVER_TWO,
      ),
    )),
    (C.fromElements = function (e, a, n) {
      return t.defined(n) ? ((n.x = e), (n.y = a), n) : new C(e, a);
    }),
    (C.fromCartesian3 = C.clone =
      function (e, a) {
        if (t.defined(e))
          return t.defined(a) ? ((a.x = e.x), (a.y = e.y), a) : new C(e.x, e.y);
      }),
    (C.fromCartesian4 = C.clone),
    (C.packedLength = 2),
    (C.pack = function (e, n, r) {
      return (
        a.Check.typeOf.object('value', e),
        a.Check.defined('array', n),
        (r = t.defaultValue(r, 0)),
        (n[r++] = e.x),
        (n[r] = e.y),
        n
      );
    }),
    (C.unpack = function (e, n, r) {
      return (
        a.Check.defined('array', e),
        (n = t.defaultValue(n, 0)),
        t.defined(r) || (r = new C()),
        (r.x = e[n++]),
        (r.y = e[n]),
        r
      );
    }),
    (C.packArray = function (e, n) {
      a.Check.defined('array', e);
      var r = e.length,
        i = 2 * r;
      if (t.defined(n)) {
        if (!Array.isArray(n) && n.length !== i)
          throw new a.DeveloperError(
            'If result is a typed array, it must have exactly array.length * 2 elements',
          );
        n.length !== i && (n.length = i);
      } else n = new Array(i);
      for (var o = 0; o < r; ++o) C.pack(e[o], n, 2 * o);
      return n;
    }),
    (C.unpackArray = function (e, n) {
      if (
        (a.Check.defined('array', e),
        a.Check.typeOf.number.greaterThanOrEquals('array.length', e.length, 2),
        e.length % 2 != 0)
      )
        throw new a.DeveloperError('array length must be a multiple of 2.');
      var r = e.length;
      t.defined(n) ? (n.length = r / 2) : (n = new Array(r / 2));
      for (var i = 0; i < r; i += 2) {
        var o = i / 2;
        n[o] = C.unpack(e, i, n[o]);
      }
      return n;
    }),
    (C.fromArray = C.unpack),
    (C.maximumComponent = function (e) {
      return a.Check.typeOf.object('cartesian', e), Math.max(e.x, e.y);
    }),
    (C.minimumComponent = function (e) {
      return a.Check.typeOf.object('cartesian', e), Math.min(e.x, e.y);
    }),
    (C.minimumByComponent = function (e, t, n) {
      return (
        a.Check.typeOf.object('first', e),
        a.Check.typeOf.object('second', t),
        a.Check.typeOf.object('result', n),
        (n.x = Math.min(e.x, t.x)),
        (n.y = Math.min(e.y, t.y)),
        n
      );
    }),
    (C.maximumByComponent = function (e, t, n) {
      return (
        a.Check.typeOf.object('first', e),
        a.Check.typeOf.object('second', t),
        a.Check.typeOf.object('result', n),
        (n.x = Math.max(e.x, t.x)),
        (n.y = Math.max(e.y, t.y)),
        n
      );
    }),
    (C.magnitudeSquared = function (e) {
      return a.Check.typeOf.object('cartesian', e), e.x * e.x + e.y * e.y;
    }),
    (C.magnitude = function (e) {
      return Math.sqrt(C.magnitudeSquared(e));
    });
  var m = new C();
  (C.distance = function (e, t) {
    return (
      a.Check.typeOf.object('left', e),
      a.Check.typeOf.object('right', t),
      C.subtract(e, t, m),
      C.magnitude(m)
    );
  }),
    (C.distanceSquared = function (e, t) {
      return (
        a.Check.typeOf.object('left', e),
        a.Check.typeOf.object('right', t),
        C.subtract(e, t, m),
        C.magnitudeSquared(m)
      );
    }),
    (C.normalize = function (e, t) {
      a.Check.typeOf.object('cartesian', e), a.Check.typeOf.object('result', t);
      var n = C.magnitude(e);
      if (((t.x = e.x / n), (t.y = e.y / n), isNaN(t.x) || isNaN(t.y)))
        throw new a.DeveloperError('normalized result is not a number');
      return t;
    }),
    (C.dot = function (e, t) {
      return (
        a.Check.typeOf.object('left', e),
        a.Check.typeOf.object('right', t),
        e.x * t.x + e.y * t.y
      );
    }),
    (C.multiplyComponents = function (e, t, n) {
      return (
        a.Check.typeOf.object('left', e),
        a.Check.typeOf.object('right', t),
        a.Check.typeOf.object('result', n),
        (n.x = e.x * t.x),
        (n.y = e.y * t.y),
        n
      );
    }),
    (C.divideComponents = function (e, t, n) {
      return (
        a.Check.typeOf.object('left', e),
        a.Check.typeOf.object('right', t),
        a.Check.typeOf.object('result', n),
        (n.x = e.x / t.x),
        (n.y = e.y / t.y),
        n
      );
    }),
    (C.add = function (e, t, n) {
      return (
        a.Check.typeOf.object('left', e),
        a.Check.typeOf.object('right', t),
        a.Check.typeOf.object('result', n),
        (n.x = e.x + t.x),
        (n.y = e.y + t.y),
        n
      );
    }),
    (C.subtract = function (e, t, n) {
      return (
        a.Check.typeOf.object('left', e),
        a.Check.typeOf.object('right', t),
        a.Check.typeOf.object('result', n),
        (n.x = e.x - t.x),
        (n.y = e.y - t.y),
        n
      );
    }),
    (C.multiplyByScalar = function (e, t, n) {
      return (
        a.Check.typeOf.object('cartesian', e),
        a.Check.typeOf.number('scalar', t),
        a.Check.typeOf.object('result', n),
        (n.x = e.x * t),
        (n.y = e.y * t),
        n
      );
    }),
    (C.divideByScalar = function (e, t, n) {
      return (
        a.Check.typeOf.object('cartesian', e),
        a.Check.typeOf.number('scalar', t),
        a.Check.typeOf.object('result', n),
        (n.x = e.x / t),
        (n.y = e.y / t),
        n
      );
    }),
    (C.negate = function (e, t) {
      return (
        a.Check.typeOf.object('cartesian', e),
        a.Check.typeOf.object('result', t),
        (t.x = -e.x),
        (t.y = -e.y),
        t
      );
    }),
    (C.abs = function (e, t) {
      return (
        a.Check.typeOf.object('cartesian', e),
        a.Check.typeOf.object('result', t),
        (t.x = Math.abs(e.x)),
        (t.y = Math.abs(e.y)),
        t
      );
    });
  var y = new C();
  C.lerp = function (e, t, n, r) {
    return (
      a.Check.typeOf.object('start', e),
      a.Check.typeOf.object('end', t),
      a.Check.typeOf.number('t', n),
      a.Check.typeOf.object('result', r),
      C.multiplyByScalar(t, n, y),
      (r = C.multiplyByScalar(e, 1 - n, r)),
      C.add(y, r, r)
    );
  };
  var O = new C(),
    g = new C();
  C.angleBetween = function (e, t) {
    return (
      a.Check.typeOf.object('left', e),
      a.Check.typeOf.object('right', t),
      C.normalize(e, O),
      C.normalize(t, g),
      n.CesiumMath.acosClamped(C.dot(O, g))
    );
  };
  var b = new C();
  (C.mostOrthogonalAxis = function (e, t) {
    a.Check.typeOf.object('cartesian', e), a.Check.typeOf.object('result', t);
    var n = C.normalize(e, b);
    return (
      C.abs(n, n), n.x <= n.y ? C.clone(C.UNIT_X, t) : C.clone(C.UNIT_Y, t)
    );
  }),
    (C.equals = function (e, a) {
      return (
        e === a || (t.defined(e) && t.defined(a) && e.x === a.x && e.y === a.y)
      );
    }),
    (C.equalsArray = function (e, t, a) {
      return e.x === t[a] && e.y === t[a + 1];
    }),
    (C.equalsEpsilon = function (e, a, r, i) {
      return (
        e === a ||
        (t.defined(e) &&
          t.defined(a) &&
          n.CesiumMath.equalsEpsilon(e.x, a.x, r, i) &&
          n.CesiumMath.equalsEpsilon(e.y, a.y, r, i))
      );
    }),
    (C.ZERO = Object.freeze(new C(0, 0))),
    (C.UNIT_X = Object.freeze(new C(1, 0))),
    (C.UNIT_Y = Object.freeze(new C(0, 1))),
    (C.prototype.clone = function (e) {
      return C.clone(this, e);
    }),
    (C.prototype.equals = function (e) {
      return C.equals(this, e);
    }),
    (C.prototype.equalsEpsilon = function (e, t, a) {
      return C.equalsEpsilon(this, e, t, a);
    }),
    (C.prototype.toString = function () {
      return '(' + this.x + ', ' + this.y + ')';
    }),
    (e.Cartesian2 = C),
    (e.Ellipsoid = o),
    (e.Rectangle = f);
});
