define([
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './Cartesian4-5af5bb24',
  './RuntimeError-ba10bc3e',
  './WebGLConstants-4c11ee5f',
  './ComponentDatatype-5862616f',
  './GeometryAttribute-2243653a',
  './PrimitiveType-97893bc7',
  './FeatureDetection-7bd32c34',
  './Transforms-1509c877',
  './buildModuleUrl-392763e2',
  './EncodedCartesian3-87cd0c1f',
  './IntersectionTests-dbfba52c',
  './Plane-2bcb9154',
  './WebMercatorProjection-bc9aa7fe',
  './arrayRemoveDuplicates-2869246d',
  './ArcType-66bc286a',
  './EllipsoidRhumbLine-6ca4b1e6',
  './EllipsoidGeodesic-db2069b3',
], function (
  e,
  a,
  t,
  i,
  n,
  r,
  s,
  o,
  l,
  u,
  c,
  h,
  C,
  d,
  p,
  g,
  f,
  m,
  v,
  w,
  y,
  _,
  T,
) {
  function E(a) {
    (a = e.defaultValue(a, {})),
      (this._ellipsoid = e.defaultValue(a.ellipsoid, n.Ellipsoid.WGS84)),
      (this._rectangle = e.defaultValue(a.rectangle, n.Rectangle.MAX_VALUE)),
      (this._projection = new r.GeographicProjection(this._ellipsoid)),
      (this._numberOfLevelZeroTilesX = e.defaultValue(
        a.numberOfLevelZeroTilesX,
        2,
      )),
      (this._numberOfLevelZeroTilesY = e.defaultValue(
        a.numberOfLevelZeroTilesY,
        1,
      )),
      (this._customDPI = a.customDPI),
      (this._scaleDenominators = a.scaleDenominators),
      (this._tileWidth = e.defaultValue(a.tileWidth, 256)),
      (this._tileHeight = e.defaultValue(a.tileHeight, 256)),
      (this._beginLevel = e.defaultValue(a.beginLevel, 0));
  }
  Object.defineProperties(E.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      },
    },
    rectangle: {
      get: function () {
        return this._rectangle;
      },
    },
    projection: {
      get: function () {
        return this._projection;
      },
    },
    beginLevel: {
      get: function () {
        return this._beginLevel;
      },
    },
  }),
    (E.prototype.getNumberOfXTilesAtLevel = function (e) {
      return this._numberOfLevelZeroTilesX << (e - this._beginLevel);
    }),
    (E.prototype.getNumberOfYTilesAtLevel = function (e) {
      return this._numberOfLevelZeroTilesY << (e - this._beginLevel);
    }),
    (E.prototype.rectangleToNativeRectangle = function (i, r) {
      a.Check.defined('rectangle', i);
      var s = t.CesiumMath.toDegrees(i.west),
        o = t.CesiumMath.toDegrees(i.south),
        l = t.CesiumMath.toDegrees(i.east),
        u = t.CesiumMath.toDegrees(i.north);
      return e.defined(r)
        ? ((r.west = s), (r.south = o), (r.east = l), (r.north = u), r)
        : new n.Rectangle(s, o, l, u);
    }),
    (E.prototype.tileXYToNativeRectangle = function (e, a, i, n) {
      var r = this.tileXYToRectangle(e, a, i, n);
      return (
        (r.west = t.CesiumMath.toDegrees(r.west)),
        (r.south = t.CesiumMath.toDegrees(r.south)),
        (r.east = t.CesiumMath.toDegrees(r.east)),
        (r.north = t.CesiumMath.toDegrees(r.north)),
        r
      );
    }),
    (E.prototype.tileXYToRectangle = function (a, i, r, s) {
      var o = this._rectangle;
      if (e.defined(this._customDPI) && e.defined(this._scaleDenominators)) {
        var l = this.calculateResolution(r),
          u = -t.CesiumMath.PI + a * this._tileWidth * l.x,
          c = -t.CesiumMath.PI + (a + 1) * this._tileWidth * l.x,
          h = t.CesiumMath.PI_OVER_TWO - i * this._tileHeight * l.y,
          C = t.CesiumMath.PI_OVER_TWO - (i + 1) * this._tileHeight * l.y;
        return e.defined(s)
          ? ((s.west = u), (s.south = C), (s.east = c), (s.north = h), s)
          : new n.Rectangle(u, C, c, h);
      }
      var d = this.getNumberOfXTilesAtLevel(r),
        p = this.getNumberOfYTilesAtLevel(r),
        g = o.width / d,
        f = ((u = a * g + o.west), (c = (a + 1) * g + o.west), o.height / p);
      return (
        (h = o.north - i * f),
        (C = o.north - (i + 1) * f),
        e.defined(s) || (s = new n.Rectangle(u, C, c, h)),
        (s.west = u),
        (s.south = C),
        (s.east = c),
        (s.north = h),
        s
      );
    }),
    (E.prototype.positionToTileXY = function (a, i, r) {
      var s = this._rectangle;
      if (n.Rectangle.contains(s, a)) {
        var o = this.getNumberOfXTilesAtLevel(i),
          l = this.getNumberOfYTilesAtLevel(i),
          u = s.width / o,
          c = s.height / l;
        if (e.defined(this._customDPI) && e.defined(this._scaleDenominators)) {
          var h = this.calculateResolution(i);
          (u = this._tileWidth * h.x), (c = this._tileHeight * h.y);
        }
        var C = a.longitude;
        s.east < s.west && (C += t.CesiumMath.TWO_PI);
        var d = ((C - s.west) / u) | 0;
        o <= d && (d = o - 1);
        var p = ((s.north - a.latitude) / c) | 0;
        return (
          l <= p && (p = l - 1),
          e.defined(r) ? ((r.x = d), (r.y = p), r) : new n.Cartesian2(d, p)
        );
      }
    }),
    (E.prototype.calculateResolution = function (e) {
      var a =
          (0.0254 * this._scaleDenominators[e - this._beginLevel]) /
          this._customDPI.x,
        t =
          (0.0254 * this._scaleDenominators[e - this._beginLevel]) /
          this._customDPI.y,
        i = n.Ellipsoid.WGS84.maximumRadius;
      return new n.Cartesian2(a / i, t / i);
    });
  var M = new i.Cartesian3(),
    b = new i.Cartesian3(),
    P = new i.Cartographic(),
    O = new i.Cartesian3(),
    I = new i.Cartesian3(),
    A = new r.BoundingSphere(),
    D = new E(),
    L = [
      new i.Cartographic(),
      new i.Cartographic(),
      new i.Cartographic(),
      new i.Cartographic(),
    ],
    k = new n.Cartesian2(),
    S = {};
  function x(e) {
    i.Cartographic.fromRadians(e.east, e.north, 0, L[0]),
      i.Cartographic.fromRadians(e.west, e.north, 0, L[1]),
      i.Cartographic.fromRadians(e.east, e.south, 0, L[2]),
      i.Cartographic.fromRadians(e.west, e.south, 0, L[3]);
    var a,
      t = 0,
      n = 0,
      r = 0,
      s = 0,
      o = S._terrainHeightsMaxLevel;
    for (a = 0; a <= o; ++a) {
      for (var l = !1, u = 0; u < 4; ++u) {
        var c = L[u];
        if ((D.positionToTileXY(c, a, k), 0 === u)) (r = k.x), (s = k.y);
        else if (r !== k.x || s !== k.y) {
          l = !0;
          break;
        }
      }
      if (l) break;
      (t = r), (n = s);
    }
    if (0 !== a) return { x: t, y: n, level: o < a ? o : a - 1 };
  }
  (S.initialize = function () {
    var a = S._initPromise;
    return e.defined(a)
      ? a
      : ((a = p.Resource.fetchJson(
          p.buildModuleUrl('Assets/approximateTerrainHeights.json'),
        ).then(function (e) {
          S._terrainHeights = e;
        })),
        (S._initPromise = a));
  }),
    (S.getMinimumMaximumHeights = function (t, r) {
      if ((a.Check.defined('rectangle', t), !e.defined(S._terrainHeights)))
        throw new a.DeveloperError(
          'You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function',
        );
      r = e.defaultValue(r, n.Ellipsoid.WGS84);
      var s = x(t),
        o = S._defaultMinTerrainHeight,
        l = S._defaultMaxTerrainHeight;
      if (e.defined(s)) {
        var u = s.level + '-' + s.x + '-' + s.y,
          c = S._terrainHeights[u];
        e.defined(c) && ((o = c[0]), (l = c[1])),
          r.cartographicToCartesian(n.Rectangle.northeast(t, P), M),
          r.cartographicToCartesian(n.Rectangle.southwest(t, P), b),
          i.Cartesian3.midpoint(b, M, O);
        var h = r.scaleToGeodeticSurface(O, I);
        if (e.defined(h)) {
          var C = i.Cartesian3.distance(O, h);
          o = Math.min(o, -C);
        } else o = S._defaultMinTerrainHeight;
      }
      return {
        minimumTerrainHeight: (o = Math.max(S._defaultMinTerrainHeight, o)),
        maximumTerrainHeight: l,
      };
    }),
    (S.getBoundingSphere = function (t, i) {
      if ((a.Check.defined('rectangle', t), !e.defined(S._terrainHeights)))
        throw new a.DeveloperError(
          'You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function',
        );
      i = e.defaultValue(i, n.Ellipsoid.WGS84);
      var s = x(t),
        o = S._defaultMaxTerrainHeight;
      if (e.defined(s)) {
        var l = s.level + '-' + s.x + '-' + s.y,
          u = S._terrainHeights[l];
        e.defined(u) && (o = u[1]);
      }
      var c = r.BoundingSphere.fromRectangle3D(t, i, 0);
      return (
        r.BoundingSphere.fromRectangle3D(t, i, o, A),
        r.BoundingSphere.union(c, A, c)
      );
    }),
    (S._terrainHeightsMaxLevel = 6),
    (S._defaultMaxTerrainHeight = 9e3),
    (S._defaultMinTerrainHeight = -1e5),
    (S._terrainHeights = void 0),
    (S._initPromise = void 0),
    Object.defineProperties(S, {
      initialized: {
        get: function () {
          return e.defined(S._terrainHeights);
        },
      },
    });
  var N = [r.GeographicProjection, v.WebMercatorProjection],
    R = N.length,
    H = Math.cos(t.CesiumMath.toRadians(30)),
    V = Math.cos(t.CesiumMath.toRadians(150));
  function z(t) {
    var i = (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)).positions;
    if (!e.defined(i) || i.length < 2)
      throw new a.DeveloperError('At least two positions are required.');
    if (
      e.defined(t.arcType) &&
      t.arcType !== y.ArcType.GEODESIC &&
      t.arcType !== y.ArcType.RHUMB
    )
      throw new a.DeveloperError(
        'Valid options for arcType are ArcType.GEODESIC and ArcType.RHUMB.',
      );
    (this.width = e.defaultValue(t.width, 1)),
      (this._positions = i),
      (this.granularity = e.defaultValue(t.granularity, 9999)),
      (this.loop = e.defaultValue(t.loop, !1)),
      (this.arcType = e.defaultValue(t.arcType, y.ArcType.GEODESIC)),
      (this._ellipsoid = e.defaultValue(t.ellipsoid, n.Ellipsoid.WGS84)),
      (this._projectionIndex = 0),
      (this._workerName = 'createGroundPolylineGeometry'),
      (this._scene3DOnly = !1);
  }
  Object.defineProperties(z.prototype, {
    packedLength: {
      get: function () {
        return (
          1 +
          3 * this._positions.length +
          1 +
          1 +
          1 +
          n.Ellipsoid.packedLength +
          1 +
          1
        );
      },
    },
  }),
    (z.setProjectionAndEllipsoid = function (e, a) {
      for (var t = 0, i = 0; i < R; i++)
        if (a instanceof N[i]) {
          t = i;
          break;
        }
      (e._projectionIndex = t), (e._ellipsoid = a.ellipsoid);
    });
  var B = new i.Cartesian3(),
    G = new i.Cartesian3(),
    j = new i.Cartesian3();
  function W(e, a, t, n, r) {
    var s = Q(n, e, 0, B),
      o = Q(n, e, t, G),
      l = Q(n, a, 0, j),
      u = J(o, s, G),
      c = J(l, s, j);
    return i.Cartesian3.cross(c, u, r), i.Cartesian3.normalize(r, r);
  }
  var Y = new i.Cartographic(),
    F = new i.Cartesian3(),
    q = new i.Cartesian3(),
    U = new i.Cartesian3();
  function X(e, a, t, n, r, s, o, l, u, c, h) {
    if (0 !== r) {
      var C;
      s === y.ArcType.GEODESIC
        ? (C = new T.EllipsoidGeodesic(e, a, o))
        : s === y.ArcType.RHUMB && (C = new _.EllipsoidRhumbLine(e, a, o));
      var d = C.surfaceDistance;
      if (!(d < r))
        for (
          var p = W(e, a, n, o, U),
            g = Math.ceil(d / r),
            f = d / g,
            m = f,
            v = g - 1,
            w = l.length,
            E = 0;
          E < v;
          E++
        ) {
          var M = C.interpolateUsingSurfaceDistance(m, Y),
            b = Q(o, M, t, F),
            P = Q(o, M, n, q);
          i.Cartesian3.pack(p, l, w),
            i.Cartesian3.pack(b, u, w),
            i.Cartesian3.pack(P, c, w),
            h.push(M.latitude),
            h.push(M.longitude),
            (w += 3),
            (m += f);
        }
    }
  }
  var Z = new i.Cartographic();
  function Q(e, a, t, n) {
    return (
      i.Cartographic.clone(a, Z),
      (Z.height = t),
      i.Cartographic.toCartesian(Z, e, n)
    );
  }
  function J(e, a, t) {
    return i.Cartesian3.subtract(e, a, t), i.Cartesian3.normalize(t, t), t;
  }
  (z.pack = function (t, r, s) {
    a.Check.typeOf.object('value', t), a.Check.defined('array', r);
    var o = e.defaultValue(s, 0),
      l = t._positions,
      u = l.length;
    r[o++] = u;
    for (var c = 0; c < u; ++c) {
      var h = l[c];
      i.Cartesian3.pack(h, r, o), (o += 3);
    }
    return (
      (r[o++] = t.granularity),
      (r[o++] = t.loop ? 1 : 0),
      (r[o++] = t.arcType),
      n.Ellipsoid.pack(t._ellipsoid, r, o),
      (o += n.Ellipsoid.packedLength),
      (r[o++] = t._projectionIndex),
      (r[o++] = t._scene3DOnly ? 1 : 0),
      r
    );
  }),
    (z.unpack = function (t, r, s) {
      a.Check.defined('array', t);
      for (
        var o = e.defaultValue(r, 0), l = t[o++], u = new Array(l), c = 0;
        c < l;
        c++
      )
        (u[c] = i.Cartesian3.unpack(t, o)), (o += 3);
      var h = t[o++],
        C = 1 === t[o++],
        d = t[o++],
        p = n.Ellipsoid.unpack(t, o);
      o += n.Ellipsoid.packedLength;
      var g = t[o++],
        f = 1 === t[o++];
      if (e.defined(s))
        return (
          (s._positions = u),
          (s.granularity = h),
          (s.loop = C),
          (s.arcType = d),
          (s._ellipsoid = p),
          (s._projectionIndex = g),
          (s._scene3DOnly = f),
          s
        );
      var m = new z({
        positions: u,
        granularity: h,
        loop: C,
        arcType: d,
        ellipsoid: p,
      });
      return (m._projectionIndex = g), (m._scene3DOnly = f), m;
    });
  var K = new i.Cartesian3(),
    $ = new i.Cartesian3(),
    ee = new i.Cartesian3(),
    ae = new i.Cartesian3(),
    te = new m.Plane(i.Cartesian3.UNIT_X, 0),
    ie = new i.Cartesian3();
  function ne(e, a, n, r, s) {
    var o = J(n, a, ie),
      l = J(e, a, K),
      u = J(r, a, $),
      c = i.Cartesian3.cross(o, l, ae);
    c = i.Cartesian3.normalize(c, c);
    var h = m.Plane.fromPointNormal(a, c, te),
      C = m.Plane.getPointDistance(h, r);
    if (t.CesiumMath.equalsEpsilon(C, 0, t.CesiumMath.EPSILON7))
      return i.Cartesian3.clone(c, s), s;
    (s = i.Cartesian3.add(u, l, s)), (s = i.Cartesian3.normalize(s, s));
    var d = i.Cartesian3.cross(o, s, ee);
    return (
      i.Cartesian3.normalize(d, d),
      i.Cartesian3.cross(d, o, s),
      i.Cartesian3.normalize(s, s),
      i.Cartesian3.dot(u, d) < 0 && (s = i.Cartesian3.negate(s, s)),
      s
    );
  }
  var re = m.Plane.fromPointNormal(i.Cartesian3.ZERO, i.Cartesian3.UNIT_Y),
    se = new i.Cartesian3(),
    oe = new i.Cartesian3(),
    le = new i.Cartesian3(),
    ue = new i.Cartesian3(),
    ce = new i.Cartesian3(),
    he = new i.Cartesian3(),
    Ce = new i.Cartographic(),
    de = new i.Cartographic(),
    pe = new i.Cartographic();
  z.createGeometry = function (a) {
    var s,
      o,
      l,
      h,
      C,
      d,
      p = !a._scene3DOnly,
      m = a.loop,
      v = a._ellipsoid,
      T = a.granularity,
      E = a.arcType,
      M = new N[a._projectionIndex](v),
      b = 1e3,
      P = a._positions,
      O = P.length;
    2 === O && (m = !1);
    var I,
      A,
      D,
      L = new _.EllipsoidRhumbLine(void 0, void 0, v),
      k = [P[0]];
    for (o = 0; o < O - 1; o++)
      (l = P[o]),
        (h = P[o + 1]),
        (I = f.IntersectionTests.lineSegmentPlane(l, h, re, he)),
        !e.defined(I) ||
          i.Cartesian3.equalsEpsilon(I, l, t.CesiumMath.EPSILON7) ||
          i.Cartesian3.equalsEpsilon(I, h, t.CesiumMath.EPSILON7) ||
          (a.arcType === y.ArcType.GEODESIC
            ? k.push(i.Cartesian3.clone(I))
            : a.arcType === y.ArcType.RHUMB &&
              ((D = v.cartesianToCartographic(I, Ce).longitude),
              (C = v.cartesianToCartographic(l, Ce)),
              (d = v.cartesianToCartographic(h, de)),
              L.setEndPoints(C, d),
              (A = L.findIntersectionWithLongitude(D, pe)),
              (I = v.cartographicToCartesian(A, he)),
              !e.defined(I) ||
                i.Cartesian3.equalsEpsilon(I, l, t.CesiumMath.EPSILON7) ||
                i.Cartesian3.equalsEpsilon(I, h, t.CesiumMath.EPSILON7) ||
                k.push(i.Cartesian3.clone(I)))),
        k.push(h);
    m &&
      ((l = P[O - 1]),
      (h = P[0]),
      (I = f.IntersectionTests.lineSegmentPlane(l, h, re, he)),
      !e.defined(I) ||
        i.Cartesian3.equalsEpsilon(I, l, t.CesiumMath.EPSILON7) ||
        i.Cartesian3.equalsEpsilon(I, h, t.CesiumMath.EPSILON7) ||
        (a.arcType === y.ArcType.GEODESIC
          ? k.push(i.Cartesian3.clone(I))
          : a.arcType === y.ArcType.RHUMB &&
            ((D = v.cartesianToCartographic(I, Ce).longitude),
            (C = v.cartesianToCartographic(l, Ce)),
            (d = v.cartesianToCartographic(h, de)),
            L.setEndPoints(C, d),
            (A = L.findIntersectionWithLongitude(D, pe)),
            (I = v.cartographicToCartesian(A, he)),
            !e.defined(I) ||
              i.Cartesian3.equalsEpsilon(I, l, t.CesiumMath.EPSILON7) ||
              i.Cartesian3.equalsEpsilon(I, h, t.CesiumMath.EPSILON7) ||
              k.push(i.Cartesian3.clone(I)))));
    var x = k.length,
      R = new Array(x);
    for (o = 0; o < x; o++) {
      var V = i.Cartographic.fromCartesian(k[o], v);
      (V.height = 0), (R[o] = V);
    }
    if (
      !(
        (x = (R = w.arrayRemoveDuplicates(R, i.Cartographic.equalsEpsilon))
          .length) < 2
      )
    ) {
      var z = [],
        B = [],
        G = [],
        j = [],
        Y = se,
        F = oe,
        q = le,
        U = ue,
        Z = ce,
        K = R[0],
        $ = R[1];
      for (
        Y = Q(v, R[x - 1], 0, Y),
          U = Q(v, $, 0, U),
          F = Q(v, K, 0, F),
          q = Q(v, K, b, q),
          Z = m ? ne(Y, F, q, U, Z) : W(K, $, b, v, Z),
          i.Cartesian3.pack(Z, B, 0),
          i.Cartesian3.pack(F, G, 0),
          i.Cartesian3.pack(q, j, 0),
          z.push(K.latitude),
          z.push(K.longitude),
          X(K, $, 0, b, T, E, v, B, G, j, z),
          o = 1;
        o < x - 1;
        ++o
      ) {
        (Y = i.Cartesian3.clone(F, Y)), (F = i.Cartesian3.clone(U, F));
        var ee = R[o];
        Q(v, ee, b, q),
          Q(v, R[o + 1], 0, U),
          ne(Y, F, q, U, Z),
          (s = B.length),
          i.Cartesian3.pack(Z, B, s),
          i.Cartesian3.pack(F, G, s),
          i.Cartesian3.pack(q, j, s),
          z.push(ee.latitude),
          z.push(ee.longitude),
          X(R[o], R[o + 1], 0, b, T, E, v, B, G, j, z);
      }
      var ae = R[x - 1],
        te = R[x - 2];
      if (((F = Q(v, ae, 0, F)), (q = Q(v, ae, b, q)), m)) {
        var ie = R[0];
        Z = ne((Y = Q(v, te, 0, Y)), F, q, (U = Q(v, ie, 0, U)), Z);
      } else Z = W(te, ae, b, v, Z);
      if (
        ((s = B.length),
        i.Cartesian3.pack(Z, B, s),
        i.Cartesian3.pack(F, G, s),
        i.Cartesian3.pack(q, j, s),
        z.push(ae.latitude),
        z.push(ae.longitude),
        m)
      ) {
        for (
          X(ae, K, 0, b, T, E, v, B, G, j, z), s = B.length, o = 0;
          o < 3;
          ++o
        )
          (B[s + o] = B[o]), (G[s + o] = G[o]), (j[s + o] = j[o]);
        z.push(K.latitude), z.push(K.longitude);
      }
      return (function (e, a, s, o, l, h, C) {
        var d,
          p,
          f,
          m,
          v,
          w,
          y = a._ellipsoid,
          _ = s.length / 3 - 1,
          T = 8 * _,
          E = 4 * T,
          M = 36 * _,
          b = 65535 < T ? new Uint32Array(M) : new Uint16Array(M),
          P = new Float64Array(3 * T),
          O = new Float32Array(E),
          I = new Float32Array(E),
          A = new Float32Array(E),
          D = new Float32Array(E),
          L = new Float32Array(E);
        C &&
          ((f = new Float32Array(E)),
          (m = new Float32Array(E)),
          (v = new Float32Array(E)),
          (w = new Float32Array(2 * T)));
        var k = h.length / 2,
          x = 0,
          N = Ae;
        N.height = 0;
        var R = De;
        R.height = 0;
        var V = Le,
          z = ke;
        if (C)
          for (p = 0, d = 1; d < k; d++)
            (N.latitude = h[p]),
              (N.longitude = h[p + 1]),
              (R.latitude = h[p + 2]),
              (R.longitude = h[p + 3]),
              (V = a.project(N, V)),
              (z = a.project(R, z)),
              (x += i.Cartesian3.distance(V, z)),
              (p += 2);
        var B = o.length / 3;
        z = i.Cartesian3.unpack(o, 0, z);
        var G,
          j = 0;
        for (p = 3, d = 1; d < B; d++)
          (V = i.Cartesian3.clone(z, V)),
            (z = i.Cartesian3.unpack(o, p, z)),
            (j += i.Cartesian3.distance(V, z)),
            (p += 3);
        p = 3;
        var W = 0,
          Y = 0,
          F = 0,
          q = 0,
          U = !1,
          X = i.Cartesian3.unpack(s, 0, xe),
          Z = i.Cartesian3.unpack(o, 0, ke),
          Q = i.Cartesian3.unpack(l, 0, Re);
        e &&
          ve(Q, i.Cartesian3.unpack(s, s.length - 6, Se), X, Z) &&
          (Q = i.Cartesian3.negate(Q, Q));
        var K = 0,
          $ = 0,
          ee = 0;
        for (d = 0; d < _; d++) {
          var ae,
            te,
            ie,
            ne,
            re = i.Cartesian3.clone(X, Se),
            se = i.Cartesian3.clone(Z, Le),
            oe = i.Cartesian3.clone(Q, Ne);
          if (
            (U && (oe = i.Cartesian3.negate(oe, oe)),
            (X = i.Cartesian3.unpack(s, p, xe)),
            (Z = i.Cartesian3.unpack(o, p, ke)),
            (U = ve((Q = i.Cartesian3.unpack(l, p, Re)), re, X, Z)),
            (N.latitude = h[W]),
            (N.longitude = h[W + 1]),
            (R.latitude = h[W + 2]),
            (R.longitude = h[W + 3]),
            C)
          ) {
            var le = Ie(N, R);
            ae = a.project(N, We);
            var ue = J((te = a.project(R, Ye)), ae, aa);
            (ue.y = Math.abs(ue.y)),
              (ie = Fe),
              (ne = qe),
              0 === le || i.Cartesian3.dot(ue, i.Cartesian3.UNIT_Y) > H
                ? ((ie = Te(a, N, oe, ae, Fe)), (ne = Te(a, R, Q, te, qe)))
                : 1 === le
                ? ((ne = Te(a, R, Q, te, qe)),
                  (ie.x = 0),
                  (ie.y = t.CesiumMath.sign(
                    N.longitude - Math.abs(R.longitude),
                  )),
                  (ie.z = 0))
                : ((ie = Te(a, N, oe, ae, Fe)),
                  (ne.x = 0),
                  (ne.y = t.CesiumMath.sign(N.longitude - R.longitude)),
                  (ne.z = 0));
          }
          var ce = i.Cartesian3.distance(se, Z),
            he = g.EncodedCartesian3.fromCartesian(re, $e),
            Ce = i.Cartesian3.subtract(X, re, Ue),
            de = i.Cartesian3.normalize(Ce, Qe),
            pe = i.Cartesian3.subtract(se, re, Xe);
          pe = i.Cartesian3.normalize(pe, pe);
          var ge = i.Cartesian3.cross(de, pe, Qe);
          ge = i.Cartesian3.normalize(ge, ge);
          var fe = i.Cartesian3.cross(pe, oe, Je);
          fe = i.Cartesian3.normalize(fe, fe);
          var me = i.Cartesian3.subtract(Z, X, Ze);
          me = i.Cartesian3.normalize(me, me);
          var we = i.Cartesian3.cross(Q, me, Ke);
          we = i.Cartesian3.normalize(we, we);
          var ye,
            _e,
            Ee,
            Me = ce / j,
            Pe = K / j,
            la = 0,
            ua = 0,
            ca = 0;
          if (C) {
            (la = i.Cartesian3.distance(ae, te)),
              (ye = g.EncodedCartesian3.fromCartesian(ae, ea)),
              (_e = i.Cartesian3.subtract(te, ae, aa));
            var ha = (Ee = i.Cartesian3.normalize(_e, ta)).x;
            (Ee.x = Ee.y), (Ee.y = -ha), (ua = la / x), (ca = $ / x);
          }
          for (G = 0; G < 8; G++) {
            var Ca = q + 4 * G,
              da = Y + 2 * G,
              pa = Ca + 3,
              ga = G < 4 ? 1 : -1,
              fa = 2 === G || 3 === G || 6 === G || 7 === G ? 1 : -1;
            i.Cartesian3.pack(he.high, O, Ca),
              (O[pa] = Ce.x),
              i.Cartesian3.pack(he.low, I, Ca),
              (I[pa] = Ce.y),
              i.Cartesian3.pack(fe, A, Ca),
              (A[pa] = Ce.z),
              i.Cartesian3.pack(we, D, Ca),
              (D[pa] = Me * ga),
              i.Cartesian3.pack(ge, L, Ca);
            var ma = Pe * fa;
            0 === ma && fa < 0 && (ma = Number.POSITIVE_INFINITY),
              (L[pa] = ma),
              C &&
                ((f[Ca] = ye.high.x),
                (f[Ca + 1] = ye.high.y),
                (f[Ca + 2] = ye.low.x),
                (f[Ca + 3] = ye.low.y),
                (v[Ca] = -ie.y),
                (v[Ca + 1] = ie.x),
                (v[Ca + 2] = ne.y),
                (v[Ca + 3] = -ne.x),
                (m[Ca] = _e.x),
                (m[Ca + 1] = _e.y),
                (m[Ca + 2] = Ee.x),
                (m[Ca + 3] = Ee.y),
                (w[da] = ua * ga),
                0 == (ma = ca * fa) &&
                  fa < 0 &&
                  (ma = Number.POSITIVE_INFINITY),
                (w[da + 1] = ma));
          }
          var va = Ge,
            wa = je,
            ya = ze,
            _a = Be,
            Ta = n.Rectangle.fromCartographicArray(He, Ve),
            Ea = S.getMinimumMaximumHeights(Ta, y),
            Ma = Ea.minimumTerrainHeight,
            ba = Ea.maximumTerrainHeight;
          (ee += Ma),
            (ee += ba),
            be(re, se, Ma, ba, va, ya),
            be(X, Z, Ma, ba, wa, _a);
          var Pa = i.Cartesian3.multiplyByScalar(ge, t.CesiumMath.EPSILON5, ia);
          i.Cartesian3.add(va, Pa, va),
            i.Cartesian3.add(wa, Pa, wa),
            i.Cartesian3.add(ya, Pa, ya),
            i.Cartesian3.add(_a, Pa, _a),
            Oe(va, wa),
            Oe(ya, _a),
            i.Cartesian3.pack(va, P, F),
            i.Cartesian3.pack(wa, P, F + 3),
            i.Cartesian3.pack(_a, P, F + 6),
            i.Cartesian3.pack(ya, P, F + 9),
            (Pa = i.Cartesian3.multiplyByScalar(
              ge,
              -2 * t.CesiumMath.EPSILON5,
              ia,
            )),
            i.Cartesian3.add(va, Pa, va),
            i.Cartesian3.add(wa, Pa, wa),
            i.Cartesian3.add(ya, Pa, ya),
            i.Cartesian3.add(_a, Pa, _a),
            Oe(va, wa),
            Oe(ya, _a),
            i.Cartesian3.pack(va, P, F + 12),
            i.Cartesian3.pack(wa, P, F + 15),
            i.Cartesian3.pack(_a, P, F + 18),
            i.Cartesian3.pack(ya, P, F + 21),
            (W += 2),
            (p += 3),
            (Y += 16),
            (F += 24),
            (q += 32),
            (K += ce),
            ($ += la);
        }
        var Oa = (p = 0);
        for (d = 0; d < _; d++) {
          for (G = 0; G < sa; G++) b[p + G] = ra[G] + Oa;
          (Oa += 8), (p += sa);
        }
        var Ia = na;
        r.BoundingSphere.fromVertices(s, i.Cartesian3.ZERO, 3, Ia[0]),
          r.BoundingSphere.fromVertices(o, i.Cartesian3.ZERO, 3, Ia[1]);
        var Aa = r.BoundingSphere.fromBoundingSpheres(Ia);
        Aa.radius += ee / (2 * _);
        var Da = {
          position: new c.GeometryAttribute({
            componentDatatype: u.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            normalize: !1,
            values: P,
          }),
          startHiAndForwardOffsetX: oa(O),
          startLoAndForwardOffsetY: oa(I),
          startNormalAndForwardOffsetZ: oa(A),
          endNormalAndTextureCoordinateNormalizationX: oa(D),
          rightNormalAndTextureCoordinateNormalizationY: oa(L),
        };
        return (
          C &&
            ((Da.startHiLo2D = oa(f)),
            (Da.offsetAndRight2D = oa(m)),
            (Da.startEndNormals2D = oa(v)),
            (Da.texcoordNormalization2D = new c.GeometryAttribute({
              componentDatatype: u.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              normalize: !1,
              values: w,
            }))),
          new c.Geometry({ attributes: Da, indices: b, boundingSphere: Aa })
        );
      })(m, M, G, j, B, z, p);
    }
  };
  var ge = new i.Cartesian3(),
    fe = new r.Matrix3(),
    me = new d.Quaternion();
  function ve(e, a, n, s) {
    var o = J(n, a, ge),
      l = i.Cartesian3.dot(o, e);
    if (H < l || l < V) {
      var u = J(s, n, ie),
        c = l < V ? t.CesiumMath.PI_OVER_TWO : -t.CesiumMath.PI_OVER_TWO,
        h = d.Quaternion.fromAxisAngle(u, c, me),
        C = r.Matrix3.fromQuaternion(h, fe);
      return r.Matrix3.multiplyByVector(C, e, e), !0;
    }
    return !1;
  }
  var we = new i.Cartographic(),
    ye = new i.Cartesian3(),
    _e = new i.Cartesian3();
  function Te(e, a, n, r, s) {
    var o = i.Cartographic.toCartesian(a, e._ellipsoid, ye),
      l = i.Cartesian3.add(o, n, _e),
      u = !1,
      c = e._ellipsoid,
      h = c.cartesianToCartographic(l, we);
    Math.abs(a.longitude - h.longitude) > t.CesiumMath.PI_OVER_TWO &&
      ((u = !0),
      (l = i.Cartesian3.subtract(o, n, _e)),
      (h = c.cartesianToCartographic(l, we))),
      (h.height = 0);
    var C = e.project(h, s);
    return (
      ((s = i.Cartesian3.subtract(C, r, s)).z = 0),
      (s = i.Cartesian3.normalize(s, s)),
      u && i.Cartesian3.negate(s, s),
      s
    );
  }
  var Ee = new i.Cartesian3(),
    Me = new i.Cartesian3();
  function be(e, a, t, n, r, s) {
    var o = i.Cartesian3.subtract(a, e, Ee);
    i.Cartesian3.normalize(o, o);
    var l = t - 0,
      u = i.Cartesian3.multiplyByScalar(o, l, Me);
    i.Cartesian3.add(e, u, r);
    var c = n - 1e3;
    (u = i.Cartesian3.multiplyByScalar(o, c, Me)), i.Cartesian3.add(a, u, s);
  }
  var Pe = new i.Cartesian3();
  function Oe(e, a) {
    var n = m.Plane.getPointDistance(re, e),
      r = m.Plane.getPointDistance(re, a),
      s = Pe;
    t.CesiumMath.equalsEpsilon(n, 0, t.CesiumMath.EPSILON2)
      ? ((s = J(a, e, s)),
        i.Cartesian3.multiplyByScalar(s, t.CesiumMath.EPSILON2, s),
        i.Cartesian3.add(e, s, e))
      : t.CesiumMath.equalsEpsilon(r, 0, t.CesiumMath.EPSILON2) &&
        ((s = J(e, a, s)),
        i.Cartesian3.multiplyByScalar(s, t.CesiumMath.EPSILON2, s),
        i.Cartesian3.add(a, s, a));
  }
  function Ie(e, a) {
    var i = Math.abs(e.longitude),
      n = Math.abs(a.longitude);
    if (
      t.CesiumMath.equalsEpsilon(i, t.CesiumMath.PI, t.CesiumMath.EPSILON11)
    ) {
      var r = t.CesiumMath.sign(a.longitude);
      return (e.longitude = r * (i - t.CesiumMath.EPSILON11)), 1;
    }
    if (
      t.CesiumMath.equalsEpsilon(n, t.CesiumMath.PI, t.CesiumMath.EPSILON11)
    ) {
      var s = t.CesiumMath.sign(e.longitude);
      return (a.longitude = s * (n - t.CesiumMath.EPSILON11)), 2;
    }
    return 0;
  }
  var Ae = new i.Cartographic(),
    De = new i.Cartographic(),
    Le = new i.Cartesian3(),
    ke = new i.Cartesian3(),
    Se = new i.Cartesian3(),
    xe = new i.Cartesian3(),
    Ne = new i.Cartesian3(),
    Re = new i.Cartesian3(),
    He = [Ae, De],
    Ve = new n.Rectangle(),
    ze = new i.Cartesian3(),
    Be = new i.Cartesian3(),
    Ge = new i.Cartesian3(),
    je = new i.Cartesian3(),
    We = new i.Cartesian3(),
    Ye = new i.Cartesian3(),
    Fe = new i.Cartesian3(),
    qe = new i.Cartesian3(),
    Ue = new i.Cartesian3(),
    Xe = new i.Cartesian3(),
    Ze = new i.Cartesian3(),
    Qe = new i.Cartesian3(),
    Je = new i.Cartesian3(),
    Ke = new i.Cartesian3(),
    $e = new g.EncodedCartesian3(),
    ea = new g.EncodedCartesian3(),
    aa = new i.Cartesian3(),
    ta = new i.Cartesian3(),
    ia = new i.Cartesian3(),
    na = [new r.BoundingSphere(), new r.BoundingSphere()],
    ra = [
      0, 2, 1, 0, 3, 2, 0, 7, 3, 0, 4, 7, 0, 5, 4, 0, 1, 5, 5, 7, 4, 5, 6, 7, 5,
      2, 6, 5, 1, 2, 3, 6, 2, 3, 7, 6,
    ],
    sa = ra.length;
  function oa(e) {
    return new c.GeometryAttribute({
      componentDatatype: u.ComponentDatatype.FLOAT,
      componentsPerAttribute: 4,
      normalize: !1,
      values: e,
    });
  }
  return (
    (z._projectNormal = Te),
    function (a, t) {
      return S.initialize().then(function () {
        return e.defined(t) && (a = z.unpack(a, t)), z.createGeometry(a);
      });
    }
  );
});
