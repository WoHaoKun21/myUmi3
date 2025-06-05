define([
  'exports',
  './when-8d13db60',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './BoundingSphere-c409f092',
  './Transforms-1509c877',
  './arrayRemoveDuplicates-2869246d',
  './PolylinePipeline-65700d85',
], function (e, i, t, r, n, a, o, l) {
  var s = {},
    h = new r.Cartographic(),
    g = new r.Cartographic(),
    d = new Array(2),
    p = new Array(2),
    y = {
      positions: void 0,
      height: void 0,
      granularity: void 0,
      ellipsoid: void 0,
    };
  function u(e, i) {
    for (var t = new Array(e.length), a = 0; a < e.length; a += 3) {
      var o = new r.Cartesian3(e[a], e[a + 1], e[a + 2]);
      n.Matrix4.multiplyByPoint(i, o, o),
        (t[a] = o.x),
        (t[a + 1] = o.y),
        (t[a + 2] = o.z);
    }
    return t;
  }
  (s.computePositions = function (e, s, c, P, f, m, v) {
    var A = (function (e, n, a, l) {
      var s = (n = o.arrayRemoveDuplicates(n, r.Cartesian3.equalsEpsilon, !0))
        .length;
      if (!(s < 2)) {
        var d = i.defined(l),
          p = i.defined(a),
          y = !0,
          u = new Array(s),
          c = new Array(s),
          P = new Array(s),
          f = n[0];
        u[0] = f;
        var m = e.cartesianToCartographic(f, h);
        p && (m.height = a[0]),
          (y = y && 0 == m.height),
          (c[0] = m.height),
          (P[0] = d ? l[0] : 0);
        for (var v, A, w = 1, C = 1; C < s; ++C) {
          var F = n[C],
            M = e.cartesianToCartographic(F, g);
          p && (M.height = a[C]),
            (y = y && 0 == M.height),
            (v = m),
            (A = M),
            t.CesiumMath.equalsEpsilon(
              v.latitude,
              A.latitude,
              t.CesiumMath.EPSILON10,
            ) &&
            t.CesiumMath.equalsEpsilon(
              v.longitude,
              A.longitude,
              t.CesiumMath.EPSILON10,
            )
              ? m.height < M.height && (c[w - 1] = M.height)
              : ((u[w] = F),
                (c[w] = M.height),
                (P[w] = d ? l[C] : 0),
                r.Cartographic.clone(M, m),
                ++w);
        }
        if (!(y || w < 2))
          return (
            (u.length = w),
            (c.length = w),
            (P.length = w),
            { positions: u, topHeights: c, bottomHeights: P }
          );
      }
    })(e, s, c, P);
    if (i.defined(A)) {
      var w = a.Transforms.eastNorthUpToFixedFrame(
          A.positions[0],
          e,
          new n.Matrix4(),
        ),
        C = n.Matrix4.inverse(w, new n.Matrix4());
      (s = A.positions), (c = A.topHeights), (P = A.bottomHeights);
      var F,
        M,
        b,
        x,
        E = s.length,
        T = E - 2,
        H = t.CesiumMath.chordLength(f, e.maximumRadius),
        L = y;
      if (((L.minDistance = H), (L.ellipsoid = e), m)) {
        var q,
          D = 0;
        for (q = 0; q < E - 1; q++)
          D += l.PolylinePipeline.numberOfPoints(s[q], s[q + 1], H) + 1;
        (F = new Float64Array(3 * D)),
          (M = new Float64Array(3 * D)),
          i.defined(v) &&
            ((b = new Float64Array(3 * D)), (x = new Float64Array(3 * D)));
        var N = d,
          O = p;
        (L.positions = N), (L.height = O);
        var R = 0;
        for (q = 0; q < E - 1; q++) {
          (N[0] = s[q]), (N[1] = s[q + 1]), (O[0] = c[q]), (O[1] = c[q + 1]);
          var S = l.PolylinePipeline.generateArc(L);
          F.set(S, R),
            i.defined(v) && b.set(u(S, C), R),
            (O[0] = P[q]),
            (O[1] = P[q + 1]),
            M.set(l.PolylinePipeline.generateArc(L), R),
            i.defined(v) && x.set(u(l.PolylinePipeline.generateArc(L), C), R),
            (R += S.length);
        }
      } else
        (L.positions = s),
          (L.height = c),
          (F = new Float64Array(l.PolylinePipeline.generateArc(L))),
          i.defined(v) &&
            (b = new Float64Array(u(l.PolylinePipeline.generateArc(L)))),
          (L.height = P),
          (M = new Float64Array(l.PolylinePipeline.generateArc(L))),
          i.defined(v) &&
            (x = new Float64Array(u(l.PolylinePipeline.generateArc(L))));
      var B = { pos: { bottomPositions: M, topPositions: F, numCorners: T } };
      return (
        i.defined(v) &&
          (B.localPos = { bottomPositions: x, topPositions: b, numCorners: T }),
        B
      );
    }
  }),
    (e.WallGeometryLibrary = s);
});
