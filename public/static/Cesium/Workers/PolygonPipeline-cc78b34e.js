define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './WebGLConstants-4c11ee5f',
  './ComponentDatatype-5862616f',
  './GeometryAttribute-2243653a',
  './PrimitiveType-97893bc7',
  './EllipsoidRhumbLine-6ca4b1e6',
  './earcut-2.2.1-b404d9e6',
], function (e, a, t, i, n, r, s, o, u, h, p, l) {
  var d = {
      CLOCKWISE: s.WebGLConstants.CW,
      COUNTER_CLOCKWISE: s.WebGLConstants.CCW,
      validate: function (e) {
        return e === d.CLOCKWISE || e === d.COUNTER_CLOCKWISE;
      },
    },
    c = Object.freeze(d),
    C = new n.Cartesian3(),
    m = new n.Cartesian3(),
    f = {
      computeArea2D: function (e) {
        t.Check.defined('positions', e),
          t.Check.typeOf.number.greaterThanOrEquals(
            'positions.length',
            e.length,
            3,
          );
        for (var a = e.length, i = 0, n = a - 1, r = 0; r < a; n = r++) {
          var s = e[n],
            o = e[r];
          i += s.x * o.y - o.x * s.y;
        }
        return 0.5 * i;
      },
      computeWindingOrder2D: function (e) {
        return 0 < f.computeArea2D(e) ? c.COUNTER_CLOCKWISE : c.CLOCKWISE;
      },
      triangulate: function (e, a) {
        t.Check.defined('positions', e);
        var i = r.Cartesian2.packArray(e);
        return l.earcut(i, a, 2);
      },
    },
    y = new n.Cartesian3(),
    g = new n.Cartesian3(),
    b = new n.Cartesian3(),
    v = new n.Cartesian3(),
    E = new n.Cartesian3(),
    O = new n.Cartesian3(),
    S = new n.Cartesian3();
  f.computeSubdivision = function (e, r, s, p, l) {
    (l = a.defaultValue(l, !1)),
      (p = a.defaultValue(p, i.CesiumMath.RADIANS_PER_DEGREE)),
      t.Check.typeOf.object('ellipsoid', e),
      t.Check.defined('positions', r),
      t.Check.defined('indices', s),
      t.Check.typeOf.number.greaterThanOrEquals('indices.length', s.length, 3),
      t.Check.typeOf.number.equals('indices.length % 3', '0', s.length % 3, 0),
      t.Check.typeOf.number.greaterThan('granularity', p, 0);
    var d,
      c = s.slice(0),
      C = r.length,
      m = new Array(3 * C),
      f = 0;
    for (d = 0; d < C; d++) {
      var w = r[d];
      (m[f++] = w.x), (m[f++] = w.y), (m[f++] = w.z);
    }
    for (
      var A = [],
        x = {},
        R = e.maximumRadius,
        L = i.CesiumMath.chordLength(p, R),
        T = L * L;
      0 < c.length;

    ) {
      var M,
        k,
        D = c.pop(),
        G = c.pop(),
        W = c.pop(),
        z = n.Cartesian3.fromArray(m, 3 * W, y),
        P = n.Cartesian3.fromArray(m, 3 * G, g),
        I = n.Cartesian3.fromArray(m, 3 * D, b),
        B = l
          ? z
          : n.Cartesian3.multiplyByScalar(n.Cartesian3.normalize(z, v), R, v),
        q = l
          ? P
          : n.Cartesian3.multiplyByScalar(n.Cartesian3.normalize(P, E), R, E),
        N = l
          ? I
          : n.Cartesian3.multiplyByScalar(n.Cartesian3.normalize(I, O), R, O),
        U = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(B, q, S)),
        _ = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(q, N, S)),
        K = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(N, B, S)),
        V = Math.max(U, _, K);
      T < V
        ? U === V
          ? ((d = x[(M = Math.min(W, G) + ' ' + Math.max(W, G))]),
            a.defined(d) ||
              ((k = n.Cartesian3.add(z, P, S)),
              n.Cartesian3.multiplyByScalar(k, 0.5, k),
              m.push(k.x, k.y, k.z),
              (d = m.length / 3 - 1),
              (x[M] = d)),
            c.push(W, d, D),
            c.push(d, G, D))
          : _ === V
          ? ((d = x[(M = Math.min(G, D) + ' ' + Math.max(G, D))]),
            a.defined(d) ||
              ((k = n.Cartesian3.add(P, I, S)),
              n.Cartesian3.multiplyByScalar(k, 0.5, k),
              m.push(k.x, k.y, k.z),
              (d = m.length / 3 - 1),
              (x[M] = d)),
            c.push(G, d, W),
            c.push(d, D, W))
          : K === V &&
            ((d = x[(M = Math.min(D, W) + ' ' + Math.max(D, W))]),
            a.defined(d) ||
              ((k = n.Cartesian3.add(I, z, S)),
              n.Cartesian3.multiplyByScalar(k, 0.5, k),
              m.push(k.x, k.y, k.z),
              (d = m.length / 3 - 1),
              (x[M] = d)),
            c.push(D, d, G),
            c.push(d, W, G))
        : (A.push(W), A.push(G), A.push(D));
    }
    return new u.Geometry({
      attributes: {
        position: new u.GeometryAttribute({
          componentDatatype: o.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: m,
        }),
      },
      indices: A,
      primitiveType: h.PrimitiveType.TRIANGLES,
    });
  };
  var w = new n.Cartographic(),
    A = new n.Cartographic(),
    x = new n.Cartographic(),
    R = new n.Cartographic();
  (f.computeRhumbLineSubdivision = function (e, r, s, l) {
    (l = a.defaultValue(l, i.CesiumMath.RADIANS_PER_DEGREE)),
      t.Check.typeOf.object('ellipsoid', e),
      t.Check.defined('positions', r),
      t.Check.defined('indices', s),
      t.Check.typeOf.number.greaterThanOrEquals('indices.length', s.length, 3),
      t.Check.typeOf.number.equals('indices.length % 3', '0', s.length % 3, 0),
      t.Check.typeOf.number.greaterThan('granularity', l, 0);
    var d,
      c = s.slice(0),
      C = r.length,
      m = new Array(3 * C),
      f = 0;
    for (d = 0; d < C; d++) {
      var v = r[d];
      (m[f++] = v.x), (m[f++] = v.y), (m[f++] = v.z);
    }
    for (
      var E = [],
        O = {},
        L = e.maximumRadius,
        T = i.CesiumMath.chordLength(l, L),
        M = new p.EllipsoidRhumbLine(void 0, void 0, e),
        k = new p.EllipsoidRhumbLine(void 0, void 0, e),
        D = new p.EllipsoidRhumbLine(void 0, void 0, e);
      0 < c.length;

    ) {
      var G = c.pop(),
        W = c.pop(),
        z = c.pop(),
        P = n.Cartesian3.fromArray(m, 3 * z, y),
        I = n.Cartesian3.fromArray(m, 3 * W, g),
        B = n.Cartesian3.fromArray(m, 3 * G, b),
        q = e.cartesianToCartographic(P, w),
        N = e.cartesianToCartographic(I, A),
        U = e.cartesianToCartographic(B, x);
      M.setEndPoints(q, N);
      var _ = M.surfaceDistance;
      k.setEndPoints(N, U);
      var K = k.surfaceDistance;
      D.setEndPoints(U, q);
      var V,
        j,
        F,
        H,
        J = D.surfaceDistance,
        Q = Math.max(_, K, J);
      T < Q
        ? _ === Q
          ? ((d = O[(V = Math.min(z, W) + ' ' + Math.max(z, W))]),
            a.defined(d) ||
              ((j = M.interpolateUsingFraction(0.5, R)),
              (F = 0.5 * (q.height + N.height)),
              (H = n.Cartesian3.fromRadians(j.longitude, j.latitude, F, e, S)),
              m.push(H.x, H.y, H.z),
              (d = m.length / 3 - 1),
              (O[V] = d)),
            c.push(z, d, G),
            c.push(d, W, G))
          : K === Q
          ? ((d = O[(V = Math.min(W, G) + ' ' + Math.max(W, G))]),
            a.defined(d) ||
              ((j = k.interpolateUsingFraction(0.5, R)),
              (F = 0.5 * (N.height + U.height)),
              (H = n.Cartesian3.fromRadians(j.longitude, j.latitude, F, e, S)),
              m.push(H.x, H.y, H.z),
              (d = m.length / 3 - 1),
              (O[V] = d)),
            c.push(W, d, z),
            c.push(d, G, z))
          : J === Q &&
            ((d = O[(V = Math.min(G, z) + ' ' + Math.max(G, z))]),
            a.defined(d) ||
              ((j = D.interpolateUsingFraction(0.5, R)),
              (F = 0.5 * (U.height + q.height)),
              (H = n.Cartesian3.fromRadians(j.longitude, j.latitude, F, e, S)),
              m.push(H.x, H.y, H.z),
              (d = m.length / 3 - 1),
              (O[V] = d)),
            c.push(G, d, W),
            c.push(d, z, W))
        : (E.push(z), E.push(W), E.push(G));
    }
    return new u.Geometry({
      attributes: {
        position: new u.GeometryAttribute({
          componentDatatype: o.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: m,
        }),
      },
      indices: E,
      primitiveType: h.PrimitiveType.TRIANGLES,
    });
  }),
    (f.scaleToGeodeticHeight = function (e, t, i, s) {
      i = a.defaultValue(i, r.Ellipsoid.WGS84);
      var o = C,
        u = m;
      if (
        ((t = a.defaultValue(t, 0)), (s = a.defaultValue(s, !0)), a.defined(e))
      )
        for (var h = e.length, p = 0; p < h; p += 3)
          n.Cartesian3.fromArray(e, p, u),
            s && (u = i.scaleToGeodeticSurface(u, u)),
            0 !== t &&
              ((o = i.geodeticSurfaceNormal(u, o)),
              n.Cartesian3.multiplyByScalar(o, t, o),
              n.Cartesian3.add(u, o, u)),
            (e[p] = u.x),
            (e[p + 1] = u.y),
            (e[p + 2] = u.z);
      return e;
    }),
    (e.PolygonPipeline = f),
    (e.WindingOrder = c);
});
