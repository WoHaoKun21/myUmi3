define([
  'exports',
  './when-8d13db60',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './BoundingSphere-c409f092',
  './Transforms-1509c877',
  './PolylineVolumeGeometryLibrary-ac3b176f',
  './PolylinePipeline-65700d85',
], function (a, e, r, n, i, t, s, o) {
  var C = {},
    l = new n.Cartesian3(),
    y = new n.Cartesian3(),
    u = new n.Cartesian3(),
    c = new n.Cartesian3(),
    d = [new n.Cartesian3(), new n.Cartesian3()],
    p = new n.Cartesian3(),
    m = new n.Cartesian3(),
    g = new n.Cartesian3(),
    h = new n.Cartesian3(),
    f = new n.Cartesian3(),
    w = new n.Cartesian3(),
    z = new n.Cartesian3(),
    x = new n.Cartesian3(),
    v = new n.Cartesian3(),
    B = new n.Cartesian3(),
    P = new t.Quaternion(),
    A = new i.Matrix3();
  function S(a, e, o, C, u) {
    var c,
      d = n.Cartesian3.angleBetween(
        n.Cartesian3.subtract(e, a, l),
        n.Cartesian3.subtract(o, a, y),
      ),
      p =
        C === s.CornerType.BEVELED
          ? 1
          : Math.ceil(d / r.CesiumMath.toRadians(5)) + 1,
      m = 3 * p,
      g = new Array(m);
    (g[m - 3] = o.x),
      (g[m - 2] = o.y),
      (g[m - 1] = o.z),
      (c = u
        ? i.Matrix3.fromQuaternion(
            t.Quaternion.fromAxisAngle(n.Cartesian3.negate(a, l), d / p, P),
            A,
          )
        : i.Matrix3.fromQuaternion(t.Quaternion.fromAxisAngle(a, d / p, P), A));
    var h = 0;
    e = n.Cartesian3.clone(e, l);
    for (var f = 0; f < p; f++)
      (e = i.Matrix3.multiplyByVector(c, e, e)),
        (g[h++] = e.x),
        (g[h++] = e.y),
        (g[h++] = e.z);
    return g;
  }
  function E(a, e, r, i) {
    var t = l;
    return [
      (i || (e = n.Cartesian3.negate(e, e)), (t = n.Cartesian3.add(a, e, t))).x,
      t.y,
      t.z,
      r.x,
      r.y,
      r.z,
    ];
  }
  function b(a, e, r, i) {
    for (
      var t = new Array(a.length),
        s = new Array(a.length),
        o = n.Cartesian3.multiplyByScalar(e, r, l),
        C = n.Cartesian3.negate(o, y),
        d = 0,
        p = a.length - 1,
        m = 0;
      m < a.length;
      m += 3
    ) {
      var g = n.Cartesian3.fromArray(a, m, u),
        h = n.Cartesian3.add(g, C, c);
      (t[d++] = h.x), (t[d++] = h.y), (t[d++] = h.z);
      var f = n.Cartesian3.add(g, o, c);
      (s[p--] = f.z), (s[p--] = f.y), (s[p--] = f.x);
    }
    return i.push(t, s), i;
  }
  C.addAttribute = function (a, r, n, i) {
    var t = r.x,
      s = r.y,
      o = r.z;
    e.defined(n) && ((a[n] = t), (a[n + 1] = s), (a[n + 2] = o)),
      e.defined(i) && ((a[i] = o), (a[i - 1] = s), (a[i - 2] = t));
  };
  var D = new n.Cartesian3(),
    M = new n.Cartesian3();
  (C.computePositions = function (a) {
    var e = a.granularity,
      i = a.positions,
      t = a.ellipsoid,
      C = a.width / 2,
      y = a.cornerType,
      u = a.saveAttributes,
      c = p,
      P = m,
      A = g,
      T = h,
      N = f,
      L = w,
      O = z,
      R = x,
      V = v,
      Q = B,
      U = [],
      G = u ? [] : void 0,
      I = u ? [] : void 0,
      q = i[0],
      j = i[1];
    (P = n.Cartesian3.normalize(n.Cartesian3.subtract(j, q, P), P)),
      (c = t.geodeticSurfaceNormal(q, c)),
      (T = n.Cartesian3.normalize(n.Cartesian3.cross(c, P, T), T)),
      u && (G.push(T.x, T.y, T.z), I.push(c.x, c.y, c.z)),
      (O = n.Cartesian3.clone(q, O)),
      (q = j),
      (A = n.Cartesian3.negate(P, A));
    var k,
      F,
      H = [],
      J = i.length;
    for (k = 1; k < J - 1; k++) {
      (c = t.geodeticSurfaceNormal(q, c)),
        (j = i[k + 1]),
        (P = n.Cartesian3.normalize(n.Cartesian3.subtract(j, q, P), P)),
        (N = n.Cartesian3.normalize(n.Cartesian3.add(P, A, N), N));
      var K = n.Cartesian3.multiplyByScalar(c, n.Cartesian3.dot(P, c), D);
      n.Cartesian3.subtract(P, K, K), n.Cartesian3.normalize(K, K);
      var W = n.Cartesian3.multiplyByScalar(c, n.Cartesian3.dot(A, c), M);
      if (
        (n.Cartesian3.subtract(A, W, W),
        n.Cartesian3.normalize(W, W),
        !r.CesiumMath.equalsEpsilon(
          Math.abs(n.Cartesian3.dot(K, W)),
          1,
          r.CesiumMath.EPSILON7,
        ))
      ) {
        (N = n.Cartesian3.cross(N, c, N)),
          (N = n.Cartesian3.cross(c, N, N)),
          (N = n.Cartesian3.normalize(N, N));
        var X =
            C /
            Math.max(0.25, n.Cartesian3.magnitude(n.Cartesian3.cross(N, A, l))),
          Y = s.PolylineVolumeGeometryLibrary.angleIsGreaterThanPi(P, A, q, t);
        (N = n.Cartesian3.multiplyByScalar(N, X, N)),
          Y
            ? ((R = n.Cartesian3.add(q, N, R)),
              (Q = n.Cartesian3.add(
                R,
                n.Cartesian3.multiplyByScalar(T, C, Q),
                Q,
              )),
              (V = n.Cartesian3.add(
                R,
                n.Cartesian3.multiplyByScalar(T, 2 * C, V),
                V,
              )),
              (d[0] = n.Cartesian3.clone(O, d[0])),
              (d[1] = n.Cartesian3.clone(Q, d[1])),
              (U = b(
                o.PolylinePipeline.generateArc({
                  positions: d,
                  granularity: e,
                  ellipsoid: t,
                }),
                T,
                C,
                U,
              )),
              u && (G.push(T.x, T.y, T.z), I.push(c.x, c.y, c.z)),
              (L = n.Cartesian3.clone(V, L)),
              (T = n.Cartesian3.normalize(n.Cartesian3.cross(c, P, T), T)),
              (V = n.Cartesian3.add(
                R,
                n.Cartesian3.multiplyByScalar(T, 2 * C, V),
                V,
              )),
              (O = n.Cartesian3.add(
                R,
                n.Cartesian3.multiplyByScalar(T, C, O),
                O,
              )),
              y === s.CornerType.ROUNDED || y === s.CornerType.BEVELED
                ? H.push({ leftPositions: S(R, L, V, y, Y) })
                : H.push({
                    leftPositions: E(q, n.Cartesian3.negate(N, N), V, Y),
                  }))
            : ((V = n.Cartesian3.add(q, N, V)),
              (Q = n.Cartesian3.add(
                V,
                n.Cartesian3.negate(n.Cartesian3.multiplyByScalar(T, C, Q), Q),
                Q,
              )),
              (R = n.Cartesian3.add(
                V,
                n.Cartesian3.negate(
                  n.Cartesian3.multiplyByScalar(T, 2 * C, R),
                  R,
                ),
                R,
              )),
              (d[0] = n.Cartesian3.clone(O, d[0])),
              (d[1] = n.Cartesian3.clone(Q, d[1])),
              (U = b(
                o.PolylinePipeline.generateArc({
                  positions: d,
                  granularity: e,
                  ellipsoid: t,
                }),
                T,
                C,
                U,
              )),
              u && (G.push(T.x, T.y, T.z), I.push(c.x, c.y, c.z)),
              (L = n.Cartesian3.clone(R, L)),
              (T = n.Cartesian3.normalize(n.Cartesian3.cross(c, P, T), T)),
              (R = n.Cartesian3.add(
                V,
                n.Cartesian3.negate(
                  n.Cartesian3.multiplyByScalar(T, 2 * C, R),
                  R,
                ),
                R,
              )),
              (O = n.Cartesian3.add(
                V,
                n.Cartesian3.negate(n.Cartesian3.multiplyByScalar(T, C, O), O),
                O,
              )),
              y === s.CornerType.ROUNDED || y === s.CornerType.BEVELED
                ? H.push({ rightPositions: S(V, L, R, y, Y) })
                : H.push({ rightPositions: E(q, N, R, Y) })),
          (A = n.Cartesian3.negate(P, A));
      }
      q = j;
    }
    return (
      (c = t.geodeticSurfaceNormal(q, c)),
      (d[0] = n.Cartesian3.clone(O, d[0])),
      (d[1] = n.Cartesian3.clone(q, d[1])),
      (U = b(
        o.PolylinePipeline.generateArc({
          positions: d,
          granularity: e,
          ellipsoid: t,
        }),
        T,
        C,
        U,
      )),
      u && (G.push(T.x, T.y, T.z), I.push(c.x, c.y, c.z)),
      y === s.CornerType.ROUNDED &&
        (F = (function (a) {
          var e = p,
            r = m,
            i = g,
            t = a[1];
          (r = n.Cartesian3.fromArray(a[1], t.length - 3, r)),
            (i = n.Cartesian3.fromArray(a[0], 0, i));
          var o = S(
              (e = n.Cartesian3.midpoint(r, i, e)),
              r,
              i,
              s.CornerType.ROUNDED,
              !1,
            ),
            C = a.length - 1,
            l = a[C - 1];
          return (
            (t = a[C]),
            (r = n.Cartesian3.fromArray(l, l.length - 3, r)),
            (i = n.Cartesian3.fromArray(t, 0, i)),
            [
              o,
              S(
                (e = n.Cartesian3.midpoint(r, i, e)),
                r,
                i,
                s.CornerType.ROUNDED,
                !1,
              ),
            ]
          );
        })(U)),
      { positions: U, corners: H, lefts: G, normals: I, endPositions: F }
    );
  }),
    (a.CorridorGeometryLibrary = C);
});
