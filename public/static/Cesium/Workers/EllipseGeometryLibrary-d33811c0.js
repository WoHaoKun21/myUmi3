define([
  'exports',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './BoundingSphere-c409f092',
  './Transforms-1509c877',
], function (a, r, e, i, t) {
  var n = {},
    s = new e.Cartesian3(),
    o = new e.Cartesian3(),
    l = new t.Quaternion(),
    C = new i.Matrix3();
  function y(a, r, n, y, u, h, m, c, x, M) {
    var f = a + r;
    e.Cartesian3.multiplyByScalar(y, Math.cos(f), s),
      e.Cartesian3.multiplyByScalar(n, Math.sin(f), o),
      e.Cartesian3.add(s, o, s);
    var z = Math.cos(a);
    z *= z;
    var d = Math.sin(a);
    d *= d;
    var _ = h / Math.sqrt(m * z + u * d) / c;
    return (
      t.Quaternion.fromAxisAngle(s, _, l),
      i.Matrix3.fromQuaternion(l, C),
      i.Matrix3.multiplyByVector(C, x, M),
      e.Cartesian3.normalize(M, M),
      e.Cartesian3.multiplyByScalar(M, c, M),
      M
    );
  }
  var u = new e.Cartesian3(),
    h = new e.Cartesian3(),
    m = new e.Cartesian3(),
    c = new e.Cartesian3();
  n.raisePositionsToHeight = function (a, r, i) {
    for (
      var t = r.ellipsoid,
        n = r.height,
        s = r.extrudedHeight,
        o = i ? (a.length / 3) * 2 : a.length / 3,
        l = new Float64Array(3 * o),
        C = a.length,
        y = i ? C : 0,
        x = 0;
      x < C;
      x += 3
    ) {
      var M = x + 1,
        f = x + 2,
        z = e.Cartesian3.fromArray(a, x, u);
      t.scaleToGeodeticSurface(z, z);
      var d = e.Cartesian3.clone(z, h),
        _ = t.geodeticSurfaceNormal(z, c),
        p = e.Cartesian3.multiplyByScalar(_, n, m);
      e.Cartesian3.add(z, p, z),
        i &&
          (e.Cartesian3.multiplyByScalar(_, s, p),
          e.Cartesian3.add(d, p, d),
          (l[x + y] = d.x),
          (l[M + y] = d.y),
          (l[f + y] = d.z)),
        (l[x] = z.x),
        (l[M] = z.y),
        (l[f] = z.z);
    }
    return l;
  };
  var x = new e.Cartesian3(),
    M = new e.Cartesian3(),
    f = new e.Cartesian3();
  (n.computeEllipsePositions = function (a, i, t) {
    var n = a.semiMinorAxis,
      s = a.semiMajorAxis,
      o = a.rotation,
      l = a.center,
      C = 8 * a.granularity,
      c = n * n,
      z = s * s,
      d = s * n,
      _ = e.Cartesian3.magnitude(l),
      p = e.Cartesian3.normalize(l, x),
      v = e.Cartesian3.cross(e.Cartesian3.UNIT_Z, l, M);
    v = e.Cartesian3.normalize(v, v);
    var O = e.Cartesian3.cross(p, v, f),
      w = 1 + Math.ceil(r.CesiumMath.PI_OVER_TWO / C),
      P = r.CesiumMath.PI_OVER_TWO / (w - 1),
      g = r.CesiumMath.PI_OVER_TWO - w * P;
    g < 0 && (w -= Math.ceil(Math.abs(g) / P));
    var T,
      I,
      E,
      V,
      A,
      R = i ? new Array(w * (w + 2) * 2 * 3) : void 0,
      S = 0,
      W = u,
      B = h,
      b = 4 * w * 3,
      Q = b - 1,
      G = 0,
      H = t ? new Array(b) : void 0;
    for (
      W = y((g = r.CesiumMath.PI_OVER_TWO), o, O, v, c, d, z, _, p, W),
        i && ((R[S++] = W.x), (R[S++] = W.y), (R[S++] = W.z)),
        t && ((H[Q--] = W.z), (H[Q--] = W.y), (H[Q--] = W.x)),
        g = r.CesiumMath.PI_OVER_TWO - P,
        T = 1;
      T < w + 1;
      ++T
    ) {
      if (
        ((W = y(g, o, O, v, c, d, z, _, p, W)),
        (B = y(Math.PI - g, o, O, v, c, d, z, _, p, B)),
        i)
      ) {
        for (
          R[S++] = W.x, R[S++] = W.y, R[S++] = W.z, E = 2 * T + 2, I = 1;
          I < E - 1;
          ++I
        )
          (V = I / (E - 1)),
            (A = e.Cartesian3.lerp(W, B, V, m)),
            (R[S++] = A.x),
            (R[S++] = A.y),
            (R[S++] = A.z);
        (R[S++] = B.x), (R[S++] = B.y), (R[S++] = B.z);
      }
      t &&
        ((H[Q--] = W.z),
        (H[Q--] = W.y),
        (H[Q--] = W.x),
        (H[G++] = B.x),
        (H[G++] = B.y),
        (H[G++] = B.z)),
        (g = r.CesiumMath.PI_OVER_TWO - (T + 1) * P);
    }
    for (T = w; 1 < T; --T) {
      if (
        ((W = y(
          -(g = r.CesiumMath.PI_OVER_TWO - (T - 1) * P),
          o,
          O,
          v,
          c,
          d,
          z,
          _,
          p,
          W,
        )),
        (B = y(g + Math.PI, o, O, v, c, d, z, _, p, B)),
        i)
      ) {
        for (
          R[S++] = W.x, R[S++] = W.y, R[S++] = W.z, E = 2 * (T - 1) + 2, I = 1;
          I < E - 1;
          ++I
        )
          (V = I / (E - 1)),
            (A = e.Cartesian3.lerp(W, B, V, m)),
            (R[S++] = A.x),
            (R[S++] = A.y),
            (R[S++] = A.z);
        (R[S++] = B.x), (R[S++] = B.y), (R[S++] = B.z);
      }
      t &&
        ((H[Q--] = W.z),
        (H[Q--] = W.y),
        (H[Q--] = W.x),
        (H[G++] = B.x),
        (H[G++] = B.y),
        (H[G++] = B.z));
    }
    W = y(-(g = r.CesiumMath.PI_OVER_TWO), o, O, v, c, d, z, _, p, W);
    var N = {};
    return (
      i &&
        ((R[S++] = W.x),
        (R[S++] = W.y),
        (R[S++] = W.z),
        (N.positions = R),
        (N.numPts = w)),
      t &&
        ((H[Q--] = W.z),
        (H[Q--] = W.y),
        (H[Q--] = W.x),
        (N.outerPositions = H)),
      N
    );
  }),
    (a.EllipseGeometryLibrary = n);
});
