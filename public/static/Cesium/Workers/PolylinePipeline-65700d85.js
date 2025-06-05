define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './IntersectionTests-dbfba52c',
  './Plane-2bcb9154',
  './EllipsoidRhumbLine-6ca4b1e6',
  './EllipsoidGeodesic-db2069b3',
], function (a, e, r, i, n, t, o, s, c, l, u) {
  var h = {
      numberOfPoints: function (a, e, r) {
        var i = n.Cartesian3.distance(a, e);
        return Math.ceil(i / r);
      },
      numberOfPointsRhumbLine: function (a, e, r) {
        var i =
          Math.pow(a.longitude - e.longitude, 2) +
          Math.pow(a.latitude - e.latitude, 2);
        return Math.ceil(Math.sqrt(i / (r * r)));
      },
    },
    f = new n.Cartographic();
  h.extractHeights = function (a, e) {
    for (var r = a.length, i = new Array(r), n = 0; n < r; n++) {
      var t = a[n];
      i[n] = e.cartesianToCartographic(t, f).height;
    }
    return i;
  };
  var d = new o.Matrix4(),
    p = new n.Cartesian3(),
    g = new n.Cartesian3(),
    C = new c.Plane(n.Cartesian3.UNIT_X, 0),
    v = new n.Cartesian3(),
    m = new c.Plane(n.Cartesian3.UNIT_X, 0),
    w = new n.Cartesian3(),
    P = new n.Cartesian3(),
    T = [];
  function y(a, e, r) {
    var i,
      n = T;
    if (((n.length = a), e === r)) {
      for (i = 0; i < a; i++) n[i] = e;
      return n;
    }
    var t = (r - e) / a;
    for (i = 0; i < a; i++) {
      var o = e + i * t;
      n[i] = o;
    }
    return n;
  }
  var b = new n.Cartographic(),
    A = new n.Cartographic(),
    E = new n.Cartesian3(),
    S = new n.Cartesian3(),
    M = new n.Cartesian3(),
    R = new u.EllipsoidGeodesic(),
    D = new l.EllipsoidRhumbLine();
  function x(a, e, r, i, t, o, s, c, l) {
    var u = i.scaleToGeodeticSurface(a, S),
      f = i.scaleToGeodeticSurface(e, M),
      d = h.numberOfPoints(a, e, r),
      p = i.cartesianToCartographic(u, b),
      g = i.cartesianToCartographic(f, A),
      C = y(d, t, o);
    0 < l &&
      (C = (function (a, e) {
        var r = T;
        r.length = a;
        for (var i = 0; i < a; i++) r[i] = e * Math.sin((Math.PI * i) / a);
        return r;
      })(d, l)),
      R.setEndPoints(p, g);
    var v = R.surfaceDistance / d,
      m = c;
    p.height = t;
    var w = i.cartographicToCartesian(p, E);
    n.Cartesian3.pack(w, s, m), (m += 3);
    for (var P = 1; P < d; P++) {
      var D = R.interpolateUsingSurfaceDistance(P * v, A);
      (D.height = C[P]),
        (w = i.cartographicToCartesian(D, E)),
        n.Cartesian3.pack(w, s, m),
        (m += 3);
    }
    return m;
  }
  function G(a, e, r, i, t, o, s, c) {
    var u = i.scaleToGeodeticSurface(a, S),
      f = i.scaleToGeodeticSurface(e, M),
      d = i.cartesianToCartographic(u, b),
      p = i.cartesianToCartographic(f, A),
      g = h.numberOfPointsRhumbLine(d, p, r),
      C = y(g, t, o);
    D.ellipsoid.equals(i) || (D = new l.EllipsoidRhumbLine(void 0, void 0, i)),
      D.setEndPoints(d, p);
    var v = D.surfaceDistance / g,
      m = c;
    d.height = t;
    var w = i.cartographicToCartesian(d, E);
    n.Cartesian3.pack(w, s, m), (m += 3);
    for (var P = 1; P < g; P++) {
      var T = D.interpolateUsingSurfaceDistance(P * v, A);
      (T.height = C[P]),
        (w = i.cartographicToCartesian(T, E)),
        n.Cartesian3.pack(w, s, m),
        (m += 3);
    }
    return m;
  }
  (h.wrapLongitude = function (a, r) {
    var i = [],
      t = [];
    if (e.defined(a) && 0 < a.length) {
      r = e.defaultValue(r, o.Matrix4.IDENTITY);
      var l = o.Matrix4.inverseTransformation(r, d),
        u = o.Matrix4.multiplyByPoint(l, n.Cartesian3.ZERO, p),
        h = n.Cartesian3.normalize(
          o.Matrix4.multiplyByPointAsVector(l, n.Cartesian3.UNIT_Y, g),
          g,
        ),
        f = c.Plane.fromPointNormal(u, h, C),
        T = n.Cartesian3.normalize(
          o.Matrix4.multiplyByPointAsVector(l, n.Cartesian3.UNIT_X, v),
          v,
        ),
        y = c.Plane.fromPointNormal(u, T, m),
        b = 1;
      i.push(n.Cartesian3.clone(a[0]));
      for (var A = i[0], E = a.length, S = 1; S < E; ++S) {
        var M = a[S];
        if (
          c.Plane.getPointDistance(y, A) < 0 ||
          c.Plane.getPointDistance(y, M) < 0
        ) {
          var R = s.IntersectionTests.lineSegmentPlane(A, M, f, w);
          if (e.defined(R)) {
            var D = n.Cartesian3.multiplyByScalar(h, 5e-9, P);
            c.Plane.getPointDistance(f, A) < 0 && n.Cartesian3.negate(D, D),
              i.push(n.Cartesian3.add(R, D, new n.Cartesian3())),
              t.push(b + 1),
              n.Cartesian3.negate(D, D),
              i.push(n.Cartesian3.add(R, D, new n.Cartesian3())),
              (b = 1);
          }
        }
        i.push(n.Cartesian3.clone(a[S])), b++, (A = M);
      }
      t.push(b);
    }
    return { positions: i, lengths: t };
  }),
    (h.generateArc = function (a) {
      e.defined(a) || (a = {});
      var o = a.positions;
      if (!e.defined(o))
        throw new r.DeveloperError('options.positions is required.');
      var s = o.length,
        c = e.defaultValue(a.ellipsoid, t.Ellipsoid.WGS84),
        l = e.defaultValue(a.height, 0),
        u = Array.isArray(l);
      if (s < 1) return [];
      if (1 === s) {
        var f = c.scaleToGeodeticSurface(o[0], S);
        if (0 !== (l = u ? l[0] : l)) {
          var d = c.geodeticSurfaceNormal(f, E);
          n.Cartesian3.multiplyByScalar(d, l, d), n.Cartesian3.add(f, d, f);
        }
        return [f.x, f.y, f.z];
      }
      var p = a.minDistance;
      if (!e.defined(p)) {
        var g = e.defaultValue(a.granularity, i.CesiumMath.RADIANS_PER_DEGREE);
        p = i.CesiumMath.chordLength(g, c.maximumRadius);
      }
      var C,
        v = 0;
      for (C = 0; C < s - 1; C++) v += h.numberOfPoints(o[C], o[C + 1], p);
      var m = a.hMax,
        w = 3 * (v + 1),
        P = new Array(w),
        y = 0;
      for (C = 0; C < s - 1; C++)
        y = x(o[C], o[C + 1], p, c, u ? l[C] : l, u ? l[C + 1] : l, P, y, m);
      T.length = 0;
      var A = o[s - 1],
        M = c.cartesianToCartographic(A, b);
      M.height = u ? l[s - 1] : l;
      var R = c.cartographicToCartesian(M, E);
      return n.Cartesian3.pack(R, P, w - 3), P;
    });
  var I = new n.Cartographic(),
    N = new n.Cartographic();
  (h.generateRhumbArc = function (a) {
    e.defined(a) || (a = {});
    var o = a.positions;
    if (!e.defined(o))
      throw new r.DeveloperError('options.positions is required.');
    var s = o.length,
      c = e.defaultValue(a.ellipsoid, t.Ellipsoid.WGS84),
      l = e.defaultValue(a.height, 0),
      u = Array.isArray(l);
    if (s < 1) return [];
    if (1 === s) {
      var f = c.scaleToGeodeticSurface(o[0], S);
      if (0 !== (l = u ? l[0] : l)) {
        var d = c.geodeticSurfaceNormal(f, E);
        n.Cartesian3.multiplyByScalar(d, l, d), n.Cartesian3.add(f, d, f);
      }
      return [f.x, f.y, f.z];
    }
    var p,
      g,
      C = e.defaultValue(a.granularity, i.CesiumMath.RADIANS_PER_DEGREE),
      v = 0,
      m = c.cartesianToCartographic(o[0], I);
    for (p = 0; p < s - 1; p++)
      (g = c.cartesianToCartographic(o[p + 1], N)),
        (v += h.numberOfPointsRhumbLine(m, g, C)),
        (m = n.Cartographic.clone(g, I));
    var w = 3 * (v + 1),
      P = new Array(w),
      y = 0;
    for (p = 0; p < s - 1; p++)
      y = G(o[p], o[p + 1], C, c, u ? l[p] : l, u ? l[p + 1] : l, P, y);
    T.length = 0;
    var A = o[s - 1],
      M = c.cartesianToCartographic(A, b);
    M.height = u ? l[s - 1] : l;
    var R = c.cartographicToCartesian(M, E);
    return n.Cartesian3.pack(R, P, w - 3), P;
  }),
    (h.generateCartesianArc = function (a) {
      for (
        var e = h.generateArc(a), r = e.length / 3, i = new Array(r), t = 0;
        t < r;
        t++
      )
        i[t] = n.Cartesian3.unpack(e, 3 * t);
      return i;
    }),
    (h.generateCartesianRhumbArc = function (a) {
      for (
        var e = h.generateRhumbArc(a),
          r = e.length / 3,
          i = new Array(r),
          t = 0;
        t < r;
        t++
      )
        i[t] = n.Cartesian3.unpack(e, 3 * t);
      return i;
    }),
    (a.PolylinePipeline = h);
});
