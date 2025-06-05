define([
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './WebGLConstants-4c11ee5f',
  './AttributeCompression-75ce15eb',
  './IndexDatatype-9435b55f',
  './createTaskProcessorWorker',
], function (a, e, r, n, t, i, s, u, c) {
  var o = 32767,
    f = new n.Cartographic(),
    p = new n.Cartesian3(),
    C = new t.Rectangle(),
    d = new t.Ellipsoid(),
    b = new n.Cartesian3(),
    l = { min: void 0, max: void 0 },
    h = new n.Cartesian3(),
    w = new n.Cartesian3(),
    y = new n.Cartesian3(),
    k = new n.Cartesian3(),
    v = new n.Cartesian3();
  return c(function (a, e) {
    var i = new Uint16Array(a.positions),
      c = new Uint16Array(a.widths),
      g = new Uint32Array(a.counts),
      A = new Uint16Array(a.batchIds);
    !(function (a) {
      a = new Float64Array(a);
      var e = 0;
      (l.min = a[e++]),
        (l.max = a[e++]),
        t.Rectangle.unpack(a, e, C),
        (e += t.Rectangle.packedLength),
        t.Ellipsoid.unpack(a, e, d),
        (e += t.Ellipsoid.packedLength),
        n.Cartesian3.unpack(a, e, b);
    })(a.packedBuffer);
    var m,
      x = d,
      E = b,
      D = (function (a, e, t, i, u) {
        var c = a.length / 3,
          C = a.subarray(0, c),
          d = a.subarray(c, 2 * c),
          b = a.subarray(2 * c, 3 * c);
        s.AttributeCompression.zigZagDeltaDecode(C, d, b);
        for (var l = new Float32Array(a.length), h = 0; h < c; ++h) {
          var w = C[h],
            y = d[h],
            k = b[h],
            v = r.CesiumMath.lerp(e.west, e.east, w / o),
            g = r.CesiumMath.lerp(e.south, e.north, y / o),
            A = r.CesiumMath.lerp(t, i, k / o),
            m = n.Cartographic.fromRadians(v, g, A, f),
            x = u.cartographicToCartesian(m, p);
          n.Cartesian3.pack(x, l, 3 * h);
        }
        return l;
      })(i, C, l.min, l.max, x),
      I = D.length / 3,
      T = 4 * I - 4,
      U = new Float32Array(3 * T),
      F = new Float32Array(3 * T),
      N = new Float32Array(3 * T),
      R = new Float32Array(2 * T),
      M = new Uint16Array(T),
      P = 0,
      L = 0,
      S = 0,
      _ = 0,
      G = g.length;
    for (m = 0; m < G; ++m) {
      for (var W = g[m], B = c[m], z = A[m], H = 0; H < W; ++H) {
        var O;
        if (0 === H) {
          var Y = n.Cartesian3.unpack(D, 3 * _, h),
            Z = n.Cartesian3.unpack(D, 3 * (_ + 1), w);
          (O = n.Cartesian3.subtract(Y, Z, y)), n.Cartesian3.add(Y, O, O);
        } else O = n.Cartesian3.unpack(D, 3 * (_ + H - 1), y);
        var j,
          q = n.Cartesian3.unpack(D, 3 * (_ + H), k);
        if (H === W - 1) {
          var J = n.Cartesian3.unpack(D, 3 * (_ + W - 1), h),
            K = n.Cartesian3.unpack(D, 3 * (_ + W - 2), w);
          (j = n.Cartesian3.subtract(J, K, v)), n.Cartesian3.add(J, j, j);
        } else j = n.Cartesian3.unpack(D, 3 * (_ + H + 1), v);
        n.Cartesian3.subtract(O, E, O),
          n.Cartesian3.subtract(q, E, q),
          n.Cartesian3.subtract(j, E, j);
        for (var Q = H === W - 1 ? 2 : 4, V = 0 === H ? 2 : 0; V < Q; ++V) {
          n.Cartesian3.pack(q, U, P),
            n.Cartesian3.pack(O, F, P),
            n.Cartesian3.pack(j, N, P),
            (P += 3);
          var X = V - 2 < 0 ? -1 : 1;
          (R[L++] = (V % 2) * 2 - 1), (R[L++] = X * B), (M[S++] = z);
        }
      }
      _ += W;
    }
    var $ = u.IndexDatatype.createTypedArray(T, 6 * I - 6),
      aa = 0,
      ea = 0;
    for (G = I - 1, m = 0; m < G; ++m)
      ($[ea++] = aa),
        ($[ea++] = aa + 2),
        ($[ea++] = aa + 1),
        ($[ea++] = aa + 1),
        ($[ea++] = aa + 2),
        ($[ea++] = aa + 3),
        (aa += 4);
    return (
      e.push(U.buffer, F.buffer, N.buffer),
      e.push(R.buffer, M.buffer, $.buffer),
      {
        indexDatatype:
          2 === $.BYTES_PER_ELEMENT
            ? u.IndexDatatype.UNSIGNED_SHORT
            : u.IndexDatatype.UNSIGNED_INT,
        currentPositions: U.buffer,
        previousPositions: F.buffer,
        nextPositions: N.buffer,
        expandAndWidth: R.buffer,
        batchIds: M.buffer,
        indices: $.buffer,
      }
    );
  });
});
