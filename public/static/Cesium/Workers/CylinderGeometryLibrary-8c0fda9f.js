define(['exports', './Math-61ede240'], function (r, e) {
  var t = {
    computePositions: function (r, t, a, n, o) {
      var i,
        s = 0.5 * r,
        u = -s,
        c = n + n,
        f = new Float64Array(3 * (o ? 2 * c : c)),
        h = 0,
        y = 0,
        M = o ? 3 * c : 0,
        d = o ? 3 * (c + n) : 3 * n;
      for (i = 0; i < n; i++) {
        var m = (i / n) * e.CesiumMath.TWO_PI,
          v = Math.cos(m),
          l = Math.sin(m),
          p = v * a,
          C = l * a,
          P = v * t,
          b = l * t;
        (f[y + M] = p),
          (f[y + M + 1] = C),
          (f[y + M + 2] = u),
          (f[y + d] = P),
          (f[y + d + 1] = b),
          (f[y + d + 2] = s),
          (y += 3),
          o &&
            ((f[h++] = p),
            (f[h++] = C),
            (f[h++] = u),
            (f[h++] = P),
            (f[h++] = b),
            (f[h++] = s));
      }
      return f;
    },
  };
  r.CylinderGeometryLibrary = t;
});
