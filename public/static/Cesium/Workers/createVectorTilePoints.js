define([
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './AttributeCompression-75ce15eb',
  './createTaskProcessorWorker',
], function (a, e, r, t, n, i, o) {
  var s = 32767,
    c = new t.Cartographic(),
    u = new t.Cartesian3(),
    p = new n.Rectangle(),
    h = new n.Ellipsoid(),
    l = { min: void 0, max: void 0 };
  return o(function (a, e) {
    var o = new Uint16Array(a.positions);
    !(function (a) {
      a = new Float64Array(a);
      var e = 0;
      (l.min = a[e++]),
        (l.max = a[e++]),
        n.Rectangle.unpack(a, e, p),
        (e += n.Rectangle.packedLength),
        n.Ellipsoid.unpack(a, e, h);
    })(a.packedBuffer);
    var f = p,
      C = h,
      d = l.min,
      g = l.max,
      m = o.length / 3,
      b = o.subarray(0, m),
      w = o.subarray(m, 2 * m),
      k = o.subarray(2 * m, 3 * m);
    i.AttributeCompression.zigZagDeltaDecode(b, w, k);
    for (var v = new Float64Array(o.length), y = 0; y < m; ++y) {
      var A = b[y],
        M = w[y],
        R = k[y],
        x = r.CesiumMath.lerp(f.west, f.east, A / s),
        D = r.CesiumMath.lerp(f.south, f.north, M / s),
        E = r.CesiumMath.lerp(d, g, R / s),
        F = t.Cartographic.fromRadians(x, D, E, c),
        T = C.cartographicToCartesian(F, u);
      t.Cartesian3.pack(T, v, 3 * y);
    }
    return e.push(v.buffer), { positions: v.buffer };
  });
});
