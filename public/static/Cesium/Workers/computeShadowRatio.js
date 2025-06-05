define([
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian4-5af5bb24',
  './createTaskProcessorWorker',
], function (r, e, a, t, n, i) {
  var s = new n.Cartesian4(1, 1 / 255, 1 / 65025, 1 / 160581375),
    o = new n.Cartesian4(),
    f = 1024;
  function u(r, e, i, u, h, C, c) {
    var d = r.longitude,
      v = r.latitude,
      g = r.height;
    if (
      ((d = a.CesiumMath.toDegrees(d)),
      (v = a.CesiumMath.toDegrees(v)),
      d < e[0] || d > e[2] || v < e[1] || v > e[3])
    )
      return -1;
    for (var b = !1, l = 0, p = 0.1 * u, m = 0; m <= i; m += u) {
      if (Math.abs(h + m - g) < p) {
        b = !0;
        break;
      }
      l++;
    }
    if (!b) return -1;
    if (C.length < 0) return -1;
    b = !1;
    for (var k = 0; k < C.length; k += 2) {
      var w = t.Cartesian3.fromDegrees(d, v, g),
        D = t.Cartesian3.fromDegrees(C[k + 0], C[k + 1], g);
      if (t.Cartesian3.distance(w, D) < p) {
        b = !0;
        break;
      }
    }
    if (!b) return -1;
    var M = e[2] - e[0],
      x = ((g = e[3] - e[1]), e[0] - 0.025 * M),
      y = e[1] - 0.025 * g;
    (M += 0.05 * M), (g += 0.05 * g);
    var I = parseInt(((d - x) / M) * f),
      P = parseInt(((v - y) / g) * f);
    (I = I < 1 ? 1 : I), (P = P < 1 ? 1 : P);
    var z = c[l],
      A = 0;
    for (k = -1; k < 2; k++)
      for (var B = -1; B < 2; B++) {
        var R = 4 * (f * (P + B) + (I + k));
        (o.x = z[R]),
          (o.y = z[R + 1]),
          (o.z = z[R + 2]),
          (o.w = z[R + 3]),
          n.Cartesian4.divideByScalar(o, 255, o),
          (A = Math.max(A, n.Cartesian4.dot(o, s)));
      }
    return 0.999 < A ? 1 : A;
  }
  return i(function (r, e) {
    for (
      var a = r.points,
        n = r.enuPoints,
        i = r.bounds,
        s = r.extend,
        o = r.spacing,
        f = r.bottom,
        h = r.pixelsArray,
        C = [],
        c = 0,
        d = a.length;
      c < d;
      c++
    ) {
      var v = a[c],
        g = u(t.Cartographic.fromCartesian(v), i, s, o, f, n, h);
      C.push({ position: t.Cartesian3.clone(v), shadowRatio: g });
    }
    return { resultData: C };
  });
});
