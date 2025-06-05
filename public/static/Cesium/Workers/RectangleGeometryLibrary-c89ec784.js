define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './GeometryAttribute-2243653a',
], function (t, n, a, r, e, o, i, s) {
  var h = Math.cos,
    g = Math.sin,
    u = Math.sqrt,
    C = {
      computePosition: function (t, a, r, e, o, i, s) {
        var C = a.radiiSquared,
          c = t.nwCorner,
          l = t.boundingRectangle,
          d = c.latitude - t.granYCos * e + o * t.granXSin,
          S = h(d),
          M = g(d),
          w = C.z * M,
          m = c.longitude + e * t.granYSin + o * t.granXCos,
          p = S * h(m),
          X = S * g(m),
          Y = C.x * p,
          v = C.y * X,
          O = u(Y * p + v * X + w * M);
        if (((i.x = Y / O), (i.y = v / O), (i.z = w / O), r)) {
          var R = t.stNwCorner;
          n.defined(R)
            ? ((d = R.latitude - t.stGranYCos * e + o * t.stGranXSin),
              (m = R.longitude + e * t.stGranYSin + o * t.stGranXCos),
              (s.x = (m - t.stWest) * t.lonScalar),
              (s.y = (d - t.stSouth) * t.latScalar))
            : ((s.x = (m - l.west) * t.lonScalar),
              (s.y = (d - l.south) * t.latScalar));
        }
      },
    },
    c = new s.Matrix2(),
    l = new e.Cartesian3(),
    d = new e.Cartographic(),
    S = new e.Cartesian3(),
    M = new i.GeographicProjection();
  function w(t, n, a, r, o, i, h) {
    var g = Math.cos(n),
      u = r * g,
      C = a * g,
      d = Math.sin(n),
      w = r * d,
      m = a * d;
    (l = M.project(t, l)), (l = e.Cartesian3.subtract(l, S, l));
    var p = s.Matrix2.fromRotation(n, c);
    (l = s.Matrix2.multiplyByVector(p, l, l)),
      (l = e.Cartesian3.add(l, S, l)),
      (i -= 1),
      (h -= 1);
    var X = (t = M.unproject(l, t)).latitude,
      Y = X + i * m,
      v = X - u * h,
      O = X - u * h + i * m,
      R = Math.max(X, Y, v, O),
      _ = Math.min(X, Y, v, O),
      f = t.longitude,
      G = f + i * C,
      x = f + h * w,
      P = f + h * w + i * C;
    return {
      north: R,
      south: _,
      east: Math.max(f, G, x, P),
      west: Math.min(f, G, x, P),
      granYCos: u,
      granYSin: w,
      granXCos: C,
      granXSin: m,
      nwCorner: t,
    };
  }
  (C.computeOptions = function (t, n, e, i, s, h, g) {
    var u,
      C,
      c,
      l,
      m,
      p = t.east,
      X = t.west,
      Y = t.north,
      v = t.south,
      O = !1,
      R = !1;
    Y === r.CesiumMath.PI_OVER_TWO && (O = !0),
      v === -r.CesiumMath.PI_OVER_TWO && (R = !0);
    var _ = Y - v;
    (c =
      (m = p < X ? r.CesiumMath.TWO_PI - X + p : p - X) /
      ((u = Math.ceil(m / n) + 1) - 1)),
      (l = _ / ((C = Math.ceil(_ / n) + 1) - 1));
    var f = o.Rectangle.northwest(t, h),
      G = o.Rectangle.center(t, d);
    (0 === e && 0 === i) ||
      (G.longitude < f.longitude && (G.longitude += r.CesiumMath.TWO_PI),
      (S = M.project(G, S)));
    var x = l,
      P = c,
      W = o.Rectangle.clone(t, s),
      y = {
        granYCos: x,
        granYSin: 0,
        granXCos: P,
        granXSin: 0,
        nwCorner: f,
        boundingRectangle: W,
        width: u,
        height: C,
        northCap: O,
        southCap: R,
      };
    if (0 !== e) {
      var I = w(f, e, c, l, 0, u, C);
      if (
        ((Y = I.north),
        (v = I.south),
        (p = I.east),
        (X = I.west),
        Y < -r.CesiumMath.PI_OVER_TWO ||
          Y > r.CesiumMath.PI_OVER_TWO ||
          v < -r.CesiumMath.PI_OVER_TWO ||
          v > r.CesiumMath.PI_OVER_TWO)
      )
        throw new a.DeveloperError(
          'Rotated rectangle is invalid.  It crosses over either the north or south pole.',
        );
      (y.granYCos = I.granYCos),
        (y.granYSin = I.granYSin),
        (y.granXCos = I.granXCos),
        (y.granXSin = I.granXSin),
        (W.north = Y),
        (W.south = v),
        (W.east = p),
        (W.west = X);
    }
    if (0 !== i) {
      e -= i;
      var b = o.Rectangle.northwest(W, g),
        T = w(b, e, c, l, 0, u, C);
      (y.stGranYCos = T.granYCos),
        (y.stGranXCos = T.granXCos),
        (y.stGranYSin = T.granYSin),
        (y.stGranXSin = T.granXSin),
        (y.stNwCorner = b),
        (y.stWest = T.west),
        (y.stSouth = T.south);
    }
    return y;
  }),
    (t.RectangleGeometryLibrary = C);
});
