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
  './FeatureDetection-7bd32c34',
  './Transforms-1509c877',
  './buildModuleUrl-392763e2',
  './AttributeCompression-75ce15eb',
  './IndexDatatype-9435b55f',
  './IntersectionTests-dbfba52c',
  './Plane-2bcb9154',
  './WebMercatorProjection-bc9aa7fe',
  './createTaskProcessorWorker',
  './EllipsoidTangentPlane-9c25b2da',
  './OrientedBoundingBox-7b25e901',
  './TerrainEncoding-3dab0ca0',
], function (e, t, r, i, n, o, a, s, d, h, c, u, l, I, m, g, f, T, p, v, E, y) {
  function w() {
    t.DeveloperError.throwInstantiationError();
  }
  Object.defineProperties(w.prototype, {
    errorEvent: { get: t.DeveloperError.throwInstantiationError },
    credit: { get: t.DeveloperError.throwInstantiationError },
    tilingScheme: { get: t.DeveloperError.throwInstantiationError },
    ready: { get: t.DeveloperError.throwInstantiationError },
    readyPromise: { get: t.DeveloperError.throwInstantiationError },
    hasWaterMask: { get: t.DeveloperError.throwInstantiationError },
    hasVertexNormals: { get: t.DeveloperError.throwInstantiationError },
    availability: { get: t.DeveloperError.throwInstantiationError },
  });
  var b = [];
  (w.getRegularGridIndices = function (i, n) {
    if (i * n >= r.CesiumMath.FOUR_GIGABYTES)
      throw new t.DeveloperError(
        'The total number of vertices (width * height) must be less than 4,294,967,296.',
      );
    var o = b[i];
    e.defined(o) || (b[i] = o = []);
    var a = o[n];
    return (
      e.defined(a) ||
        x(
          i,
          n,
          (a =
            i * n < r.CesiumMath.SIXTY_FOUR_KILOBYTES
              ? (o[n] = new Uint16Array(
                  (i - 1) * (n - 1) * 6 + 3 * (i + n - 2),
                ))
              : (o[n] = new Uint32Array(
                  (i - 1) * (n - 1) * 6 + 3 * (i + n - 2),
                ))),
          0,
        ),
      a
    );
  }),
    (w.getRegularGridIndicesForReproject = function (i, n) {
      if (i * n >= r.CesiumMath.FOUR_GIGABYTES)
        throw new t.DeveloperError(
          'The total number of vertices (width * height) must be less than 4,294,967,296.',
        );
      var o = b[i];
      e.defined(o) || (b[i] = o = []);
      var a = o[n];
      return (
        e.defined(a) ||
          x(
            i,
            n,
            (a =
              i * n < r.CesiumMath.SIXTY_FOUR_KILOBYTES
                ? (o[n] = new Uint16Array((i - 1) * (n - 1) * 6))
                : (o[n] = new Uint32Array((i - 1) * (n - 1) * 6))),
            0,
          ),
        a
      );
    });
  var N = [];
  w.getRegularGridIndicesAndEdgeIndices = function (i, n) {
    if (i * n >= r.CesiumMath.FOUR_GIGABYTES)
      throw new t.DeveloperError(
        'The total number of vertices (width * height) must be less than 4,294,967,296.',
      );
    var o = N[i];
    e.defined(o) || (N[i] = o = []);
    var a = o[n];
    if (!e.defined(a)) {
      var s = w.getRegularGridIndices(i, n),
        d = C(i, n),
        h = d.westIndicesSouthToNorth,
        c = d.southIndicesEastToWest,
        u = d.eastIndicesNorthToSouth,
        l = d.northIndicesWestToEast;
      a = o[n] = {
        indices: s,
        westIndicesSouthToNorth: h,
        southIndicesEastToWest: c,
        eastIndicesNorthToSouth: u,
        northIndicesWestToEast: l,
      };
    }
    return a;
  };
  var M = [];
  function C(e, t) {
    var r,
      i = new Array(t),
      n = new Array(e),
      o = new Array(t),
      a = new Array(e);
    for (r = 0; r < e; ++r) n[(a[r] = r)] = e * t - 1 - r;
    for (r = 0; r < t; ++r) (o[r] = (r + 1) * e - 1), (i[r] = (t - r - 1) * e);
    return {
      westIndicesSouthToNorth: i,
      southIndicesEastToWest: n,
      eastIndicesNorthToSouth: o,
      northIndicesWestToEast: a,
    };
  }
  function x(e, t, r, i) {
    for (var n = 0, o = 0; o < t - 1; ++o) {
      for (var a = 0; a < e - 1; ++a) {
        var s = n,
          d = s + e,
          h = d + 1,
          c = s + 1;
        (r[i++] = s),
          (r[i++] = d),
          (r[i++] = c),
          (r[i++] = c),
          (r[i++] = d),
          (r[i++] = h),
          ++n;
      }
      ++n;
    }
    var u = (t - 1) / 2,
      l = (e - 1) / 2;
    for (a = n = 0; a < l; a++)
      (r[i++] = n), (r[i++] = n + 1), (r[i++] = n + 2), (n += 2);
    for (n = e * (t - 1), a = 0; a < l; a++)
      (r[i++] = n + 1), (r[i++] = n), (r[i++] = n + 2), (n += 2);
    for (a = n = 0; a < u; a++)
      (r[i++] = n + e), (r[i++] = n), (r[i++] = n + 2 * e), (n += 2 * e);
    for (n = e - 1, a = 0; a < u; a++)
      (r[i++] = n), (r[i++] = n + e), (r[i++] = n + 2 * e), (n += 2 * e);
  }
  function S(t, r, i, n, o) {
    for (var a = e.defined(o), s = t[0], d = t.length, h = 1; h < d; ++h) {
      var c = t[h];
      !a || o[s + '_' + c]
        ? ((i[n++] = s),
          (i[n++] = c),
          (i[n++] = r),
          (i[n++] = r),
          (i[n++] = c),
          (i[n++] = r + 1),
          (s = c),
          ++r)
        : ((s = c), ++r);
    }
    return n;
  }
  (w.getRegularGridAndSkirtIndicesAndEdgeIndices = function (i, n) {
    if (i * n >= r.CesiumMath.FOUR_GIGABYTES)
      throw new t.DeveloperError(
        'The total number of vertices (width * height) must be less than 4,294,967,296.',
      );
    var o = M[i];
    e.defined(o) || (M[i] = o = []);
    var a = o[n];
    if (!e.defined(a)) {
      var s = i * n,
        d = (i - 1) * (n - 1) * 6,
        h = 2 * i + 2 * n,
        c = s + h,
        u = 3 * (i + n - 2),
        l = d + 6 * Math.max(0, h - 4) + u,
        I = C(i, n),
        g = I.westIndicesSouthToNorth,
        f = I.southIndicesEastToWest,
        T = I.eastIndicesNorthToSouth,
        p = I.northIndicesWestToEast,
        v = m.IndexDatatype.createTypedArray(c, l);
      x(i, n, v, 0),
        w.addSkirtIndices(g, f, T, p, s, v, d + u),
        (a = o[n] =
          {
            indices: v,
            westIndicesSouthToNorth: g,
            southIndicesEastToWest: f,
            eastIndicesNorthToSouth: T,
            northIndicesWestToEast: p,
            indexCountWithoutSkirts: d,
          });
    }
    return a;
  }),
    (w.addSkirtIndices = function (e, t, r, i, n, o, a, s) {
      var d = n;
      (a = S(e, d, o, a, s)),
        (a = S(t, (d += e.length), o, a, s)),
        (a = S(r, (d += t.length), o, a, s)),
        S(i, (d += r.length), o, a, s);
    }),
    (w.heightmapTerrainQuality = 0.25),
    (w.getEstimatedLevelZeroGeometricErrorForAHeightmap = function (e, t, r) {
      return (
        (2 * e.maximumRadius * Math.PI * w.heightmapTerrainQuality) / (t * r)
      );
    }),
    (w.prototype.requestTileGeometry =
      t.DeveloperError.throwInstantiationError),
    (w.prototype.getLevelMaximumGeometricError =
      t.DeveloperError.throwInstantiationError),
    (w.prototype.getTileDataAvailable =
      t.DeveloperError.throwInstantiationError),
    (w.prototype.loadTileDataAvailability =
      t.DeveloperError.throwInstantiationError);
  var A = 32767,
    P = new i.Cartesian3(),
    _ = new i.Cartesian3(),
    F = new i.Cartesian3(),
    B = new i.Cartographic(),
    D = new n.Cartesian2(),
    W = new i.Cartesian3(),
    G = new o.Matrix4(),
    O = new o.Matrix4();
  function Y(e, t, n, a, s, d, h, c, u) {
    var l = Number.POSITIVE_INFINITY,
      I = s.north,
      m = s.south,
      g = s.east,
      f = s.west;
    g < f && (g += r.CesiumMath.TWO_PI);
    for (var T = e.length, p = 0; p < T; ++p) {
      var v = e[p],
        E = n[v],
        y = a[v];
      (B.longitude = r.CesiumMath.lerp(f, g, y.x)),
        (B.latitude = r.CesiumMath.lerp(m, I, y.y)),
        (B.height = E - t);
      var w = d.cartographicToCartesian(B, P);
      o.Matrix4.multiplyByPoint(h, w, w),
        i.Cartesian3.minimumByComponent(w, c, c),
        i.Cartesian3.maximumByComponent(w, u, u),
        (l = Math.min(l, B.height));
    }
    return l;
  }
  function k(t, n, a, s, d, h, c, l, m, g, f, p, v, E, y) {
    var w = e.defined(c),
      b = m.north,
      N = m.south,
      M = m.east,
      C = m.west;
    M < C && (M += r.CesiumMath.TWO_PI);
    for (var x = a.length, S = 0; S < x; ++S) {
      var A = a[S],
        _ = d[A],
        F = h[A];
      (B.longitude = r.CesiumMath.lerp(C, M, F.x) + E),
        (B.latitude = r.CesiumMath.lerp(N, b, F.y) + y),
        (B.height = _ - g);
      var Y,
        k = l.cartographicToCartesian(B, P);
      if (w) {
        var V = 2 * A;
        if (((D.x = c[V]), (D.y = c[V + 1]), 1 !== f)) {
          var R = I.AttributeCompression.octDecode(D.x, D.y, W),
            U = u.Transforms.eastNorthUpToFixedFrame(P, l, O),
            H = o.Matrix4.inverseTransformation(U, G);
          o.Matrix4.multiplyByPointAsVector(H, R, R),
            (R.z *= f),
            i.Cartesian3.normalize(R, R),
            o.Matrix4.multiplyByPointAsVector(U, R, R),
            i.Cartesian3.normalize(R, R),
            I.AttributeCompression.octEncode(R, D);
        }
      }
      s.hasWebMercatorT &&
        (Y =
          (T.WebMercatorProjection.geodeticLatitudeToMercatorAngle(B.latitude) -
            p) *
          v),
        (n = s.encode(t, n, k, F, B.height, D, Y));
    }
  }
  function V(t, r) {
    var i;
    return (
      'function' == typeof t.slice &&
        'function' != typeof (i = t.slice()).sort &&
        (i = void 0),
      e.defined(i) || (i = Array.prototype.slice.call(t)),
      i.sort(r),
      i
    );
  }
  return p(function (t, a) {
    var s,
      d,
      h = t.quantizedVertices,
      c = h.length / 3,
      l = t.octEncodedNormals,
      g =
        t.westIndices.length +
        t.eastIndices.length +
        t.southIndices.length +
        t.northIndices.length,
      f = t.includeWebMercatorT,
      p = n.Rectangle.clone(t.rectangle),
      b = p.west,
      N = p.south,
      M = p.east,
      C = p.north,
      x = n.Ellipsoid.clone(t.ellipsoid),
      S = t.exaggeration,
      R = t.minimumHeight * S,
      U = t.maximumHeight * S,
      H = t.relativeToCenter,
      z = u.Transforms.eastNorthUpToFixedFrame(H, x),
      L = o.Matrix4.inverseTransformation(z, new o.Matrix4());
    f &&
      ((s = T.WebMercatorProjection.geodeticLatitudeToMercatorAngle(N)),
      (d =
        1 / (T.WebMercatorProjection.geodeticLatitudeToMercatorAngle(C) - s)));
    var j = h.subarray(0, c),
      q = h.subarray(c, 2 * c),
      K = h.subarray(2 * c, 3 * c),
      Q = e.defined(l),
      X = new Array(c),
      Z = new Array(c),
      J = new Array(c),
      $ = f ? new Array(c) : [],
      ee = _;
    (ee.x = Number.POSITIVE_INFINITY),
      (ee.y = Number.POSITIVE_INFINITY),
      (ee.z = Number.POSITIVE_INFINITY);
    var te = F;
    (te.x = Number.NEGATIVE_INFINITY),
      (te.y = Number.NEGATIVE_INFINITY),
      (te.z = Number.NEGATIVE_INFINITY);
    for (
      var re = Number.POSITIVE_INFINITY,
        ie = Number.NEGATIVE_INFINITY,
        ne = Number.POSITIVE_INFINITY,
        oe = Number.NEGATIVE_INFINITY,
        ae = 0;
      ae < c;
      ++ae
    ) {
      var se = j[ae],
        de = q[ae],
        he = se / A,
        ce = de / A,
        ue = r.CesiumMath.lerp(R, U, K[ae] / A);
      (B.longitude = r.CesiumMath.lerp(b, M, he)),
        (B.latitude = r.CesiumMath.lerp(N, C, ce)),
        (B.height = ue),
        (re = Math.min(B.longitude, re)),
        (ie = Math.max(B.longitude, ie)),
        (ne = Math.min(B.latitude, ne)),
        (oe = Math.max(B.latitude, oe));
      var le = x.cartographicToCartesian(B);
      (X[ae] = new n.Cartesian2(he, ce)),
        (Z[ae] = ue),
        (J[ae] = le),
        f &&
          ($[ae] =
            (T.WebMercatorProjection.geodeticLatitudeToMercatorAngle(
              B.latitude,
            ) -
              s) *
            d),
        o.Matrix4.multiplyByPoint(L, le, P),
        i.Cartesian3.minimumByComponent(P, ee, ee),
        i.Cartesian3.maximumByComponent(P, te, te);
    }
    var Ie,
      me,
      ge,
      fe = V(t.westIndices, function (e, t) {
        return X[e].y - X[t].y;
      }),
      Te = V(t.eastIndices, function (e, t) {
        return X[t].y - X[e].y;
      }),
      pe = V(t.southIndices, function (e, t) {
        return X[t].x - X[e].x;
      }),
      ve = V(t.northIndices, function (e, t) {
        return X[e].x - X[t].x;
      });
    (me = o.BoundingSphere.fromPoints(J)),
      (Ie = E.OrientedBoundingBox.fromRectangle(p, R, U, x)),
      (1 !== S || R < 0) &&
        (ge = new y.EllipsoidalOccluder(
          x,
        ).computeHorizonCullingPointPossiblyUnderEllipsoid(H, J, R));
    var Ee = R;
    (Ee = Math.min(
      Ee,
      Y(t.westIndices, t.westSkirtHeight, Z, X, p, x, L, ee, te),
    )),
      (Ee = Math.min(
        Ee,
        Y(t.southIndices, t.southSkirtHeight, Z, X, p, x, L, ee, te),
      )),
      (Ee = Math.min(
        Ee,
        Y(t.eastIndices, t.eastSkirtHeight, Z, X, p, x, L, ee, te),
      )),
      (Ee = Math.min(
        Ee,
        Y(t.northIndices, t.northSkirtHeight, Z, X, p, x, L, ee, te),
      ));
    for (
      var ye = new v.AxisAlignedBoundingBox(ee, te, H),
        we = new y.TerrainEncoding(ye, Ee, U, z, Q, f),
        be = we.getStride(),
        Ne = new Float32Array(c * be + g * be),
        Me = 0,
        Ce = 0;
      Ce < c;
      ++Ce
    ) {
      if (Q) {
        var xe = 2 * Ce;
        if (((D.x = l[xe]), (D.y = l[xe + 1]), 1 !== S)) {
          var Se = I.AttributeCompression.octDecode(D.x, D.y, W),
            Ae = u.Transforms.eastNorthUpToFixedFrame(J[Ce], x, O),
            Pe = o.Matrix4.inverseTransformation(Ae, G);
          o.Matrix4.multiplyByPointAsVector(Pe, Se, Se),
            (Se.z *= S),
            i.Cartesian3.normalize(Se, Se),
            o.Matrix4.multiplyByPointAsVector(Ae, Se, Se),
            i.Cartesian3.normalize(Se, Se),
            I.AttributeCompression.octEncode(Se, D);
        }
      }
      Me = we.encode(Ne, Me, J[Ce], X[Ce], Z[Ce], D, $[Ce]);
    }
    var _e = Math.max(0, 2 * (g - 4)),
      Fe = t.indices.length + 3 * _e,
      Be = m.IndexDatatype.createTypedArray(c + g, Fe);
    Be.set(t.indices, 0);
    var De = 1e-4 * (ie - re),
      We = 1e-4 * (oe - ne),
      Ge = -De,
      Oe = De,
      Ye = We,
      ke = -We,
      Ve = c * be;
    k(Ne, Ve, fe, we, Z, X, l, x, p, t.westSkirtHeight, S, s, d, Ge, 0),
      k(
        Ne,
        (Ve += t.westIndices.length * be),
        pe,
        we,
        Z,
        X,
        l,
        x,
        p,
        t.southSkirtHeight,
        S,
        s,
        d,
        0,
        ke,
      ),
      k(
        Ne,
        (Ve += t.southIndices.length * be),
        Te,
        we,
        Z,
        X,
        l,
        x,
        p,
        t.eastSkirtHeight,
        S,
        s,
        d,
        Oe,
        0,
      ),
      k(
        Ne,
        (Ve += t.eastIndices.length * be),
        ve,
        we,
        Z,
        X,
        l,
        x,
        p,
        t.northSkirtHeight,
        S,
        s,
        d,
        0,
        Ye,
      );
    var Re = (function (e, t, r, i) {
      if (!(i < 12)) {
        for (var n = {}, o = e.length, a = 0; a < o; a += 3) {
          var s = e[a],
            d = e[a + 1],
            h = e[a + 2];
          ((t[s] === A && t[d] === A) ||
            (0 === t[s] && 0 === t[d]) ||
            (r[s] === A && r[d] === A) ||
            (0 === r[s] && 0 === r[d])) &&
            ((n[s + '_' + d] = 1), (n[d + '_' + s] = 1)),
            ((t[d] === A && t[h] === A) ||
              (0 === t[d] && 0 === t[h]) ||
              (r[d] === A && r[h] === A) ||
              (0 === r[d] && 0 === r[h])) &&
              ((n[d + '_' + h] = 1), (n[h + '_' + d] = 1)),
            ((t[h] === A && t[s] === A) ||
              (0 === t[h] && 0 === t[s]) ||
              (r[h] === A && r[s] === A) ||
              (0 === r[h] && 0 === r[s])) &&
              ((n[h + '_' + s] = 1), (n[s + '_' + h] = 1));
        }
        return n;
      }
    })(t.indices, j, q, t.level);
    return (
      w.addSkirtIndices(fe, pe, Te, ve, c, Be, t.indices.length, Re),
      a.push(Ne.buffer, Be.buffer),
      {
        vertices: Ne.buffer,
        indices: Be.buffer,
        westIndicesSouthToNorth: fe,
        southIndicesEastToWest: pe,
        eastIndicesNorthToSouth: Te,
        northIndicesWestToEast: ve,
        vertexStride: be,
        center: H,
        minimumHeight: R,
        maximumHeight: U,
        boundingSphere: me,
        orientedBoundingBox: Ie,
        occludeePointInScaledSpace: ge,
        encoding: we,
        indexCountWithoutSkirts: t.indices.length,
      }
    );
  });
});
