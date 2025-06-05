define([
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './Cartesian4-5af5bb24',
  './RuntimeError-ba10bc3e',
  './WebGLConstants-4c11ee5f',
  './FeatureDetection-7bd32c34',
  './Transforms-1509c877',
  './buildModuleUrl-392763e2',
  './AttributeCompression-75ce15eb',
  './IndexDatatype-9435b55f',
  './IntersectionTests-dbfba52c',
  './Plane-2bcb9154',
  './createTaskProcessorWorker',
  './EllipsoidTangentPlane-9c25b2da',
  './OrientedBoundingBox-7b25e901',
  './Color-69f1845f',
], function (e, a, r, n, t, i, o, s, f, d, c, u, h, l, b, g, p, C, y, I) {
  var m = new n.Cartesian3(),
    v = new t.Ellipsoid(),
    w = new t.Rectangle(),
    x = { min: void 0, max: void 0, indexBytesPerElement: void 0 };
  var A = new n.Cartesian3(),
    E = new n.Cartesian3(),
    N = new n.Cartesian3(),
    T = new n.Cartesian3(),
    k = new n.Cartesian3(),
    B = new n.Cartographic(),
    L = new t.Rectangle();
  return p(function (a, i) {
    var o, s, f, d;
    (o = a.packedBuffer),
      (s = new Float64Array(o)),
      (f = 0),
      (x.indexBytesPerElement = s[f++]),
      (x.min = s[f++]),
      (x.max = s[f++]),
      n.Cartesian3.unpack(s, f, m),
      (f += n.Cartesian3.packedLength),
      t.Ellipsoid.unpack(s, f, v),
      (f += t.Ellipsoid.packedLength),
      t.Rectangle.unpack(s, f, w),
      (d =
        2 === x.indexBytesPerElement
          ? new Uint16Array(a.indices)
          : new Uint32Array(a.indices));
    var c,
      u,
      b,
      g = new Uint16Array(a.positions),
      p = new Uint32Array(a.counts),
      C = new Uint32Array(a.indexCounts),
      O = new Uint32Array(a.batchIds),
      U = new Uint32Array(a.batchTableColors),
      F = new Array(p.length),
      P = m,
      S = v,
      D = w,
      M = x.min,
      R = x.max,
      _ = a.minimumHeights,
      G = a.maximumHeights;
    e.defined(_) &&
      e.defined(G) &&
      ((_ = new Float32Array(_)), (G = new Float32Array(G)));
    var Y = g.length / 2,
      V = g.subarray(0, Y),
      H = g.subarray(Y, 2 * Y);
    h.AttributeCompression.zigZagDeltaDecode(V, H);
    var W = new Float32Array(3 * Y);
    for (c = 0; c < Y; ++c) {
      var z = V[c],
        Z = H[c],
        j = r.CesiumMath.lerp(D.west, D.east, z / 32767),
        q = r.CesiumMath.lerp(D.south, D.north, Z / 32767),
        J = n.Cartographic.fromRadians(j, q, 0, B),
        K = S.cartographicToCartesian(J, A);
      n.Cartesian3.pack(K, W, 3 * c);
    }
    var Q = p.length,
      X = new Array(Q),
      $ = new Array(Q),
      ee = 0,
      ae = 0;
    for (c = 0; c < Q; ++c)
      (X[c] = ee), ($[c] = ae), (ee += p[c]), (ae += C[c]);
    var re,
      ne = new Float32Array(3 * Y * 2),
      te = new Uint16Array(2 * Y),
      ie = new Uint32Array($.length),
      oe = new Uint32Array(C.length),
      se = [],
      fe = {};
    for (c = 0; c < Q; ++c)
      (b = U[c]),
        e.defined(fe[b])
          ? ((fe[b].positionLength += p[c]),
            (fe[b].indexLength += C[c]),
            fe[b].batchIds.push(c))
          : (fe[b] = {
              positionLength: p[c],
              indexLength: C[c],
              offset: 0,
              indexOffset: 0,
              batchIds: [c],
            });
    var de = 0,
      ce = 0;
    for (b in fe)
      if (fe.hasOwnProperty(b)) {
        ((re = fe[b]).offset = de), (re.indexOffset = ce);
        var ue = 2 * re.positionLength,
          he = 2 * re.indexLength + 6 * re.positionLength;
        (de += ue), (ce += he), (re.indexLength = he);
      }
    var le = [];
    for (b in fe)
      fe.hasOwnProperty(b) &&
        ((re = fe[b]),
        le.push({
          color: I.Color.fromRgba(parseInt(b)),
          offset: re.indexOffset,
          count: re.indexLength,
          batchIds: re.batchIds,
        }));
    for (c = 0; c < Q; ++c) {
      var be = (re = fe[(b = U[c])]).offset,
        ge = 3 * be,
        pe = be,
        Ce = X[c],
        ye = p[c],
        Ie = O[c],
        me = M,
        ve = R;
      e.defined(_) && e.defined(G) && ((me = _[c]), (ve = G[c]));
      var we = Number.POSITIVE_INFINITY,
        xe = Number.NEGATIVE_INFINITY,
        Ae = Number.POSITIVE_INFINITY,
        Ee = Number.NEGATIVE_INFINITY;
      for (u = 0; u < ye; ++u) {
        var Ne = n.Cartesian3.unpack(W, 3 * Ce + 3 * u, A);
        S.scaleToGeodeticSurface(Ne, Ne);
        var Te = S.cartesianToCartographic(Ne, B),
          ke = Te.latitude,
          Be = Te.longitude;
        (we = Math.min(ke, we)),
          (xe = Math.max(ke, xe)),
          (Ae = Math.min(Be, Ae)),
          (Ee = Math.max(Be, Ee));
        var Le = S.geodeticSurfaceNormal(Ne, E),
          Oe = n.Cartesian3.multiplyByScalar(Le, me, N),
          Ue = n.Cartesian3.add(Ne, Oe, T);
        Oe = n.Cartesian3.multiplyByScalar(Le, ve, Oe);
        var Fe = n.Cartesian3.add(Ne, Oe, k);
        n.Cartesian3.subtract(Fe, P, Fe),
          n.Cartesian3.subtract(Ue, P, Ue),
          n.Cartesian3.pack(Fe, ne, ge),
          n.Cartesian3.pack(Ue, ne, ge + 3),
          (te[pe] = Ie),
          (te[pe + 1] = Ie),
          (ge += 6),
          (pe += 2);
      }
      ((D = L).west = Ae),
        (D.east = Ee),
        (D.south = we),
        (D.north = xe),
        (F[c] = y.OrientedBoundingBox.fromRectangle(D, M, R, S));
      var Pe = re.indexOffset,
        Se = $[c],
        De = C[c];
      for (ie[c] = Pe, u = 0; u < De; u += 3) {
        var Me = d[Se + u] - Ce,
          Re = d[Se + u + 1] - Ce,
          _e = d[Se + u + 2] - Ce;
        (se[Pe++] = 2 * Me + be),
          (se[Pe++] = 2 * Re + be),
          (se[Pe++] = 2 * _e + be),
          (se[Pe++] = 2 * _e + 1 + be),
          (se[Pe++] = 2 * Re + 1 + be),
          (se[Pe++] = 2 * Me + 1 + be);
      }
      for (u = 0; u < ye; ++u) {
        var Ge = u,
          Ye = (u + 1) % ye;
        (se[Pe++] = 2 * Ge + 1 + be),
          (se[Pe++] = 2 * Ye + be),
          (se[Pe++] = 2 * Ge + be),
          (se[Pe++] = 2 * Ge + 1 + be),
          (se[Pe++] = 2 * Ye + 1 + be),
          (se[Pe++] = 2 * Ye + be);
      }
      (re.offset += 2 * ye), (re.indexOffset = Pe), (oe[c] = Pe - ie[c]);
    }
    se = l.IndexDatatype.createTypedArray(ne.length / 3, se);
    for (var Ve = le.length, He = 0; He < Ve; ++He) {
      for (
        var We = le[He].batchIds, ze = 0, Ze = We.length, je = 0;
        je < Ze;
        ++je
      )
        ze += oe[We[je]];
      le[He].count = ze;
    }
    var qe = (function (e, a, r) {
      var n = a.length,
        t =
          2 +
          n * y.OrientedBoundingBox.packedLength +
          1 +
          (function (e) {
            for (var a = e.length, r = 0, n = 0; n < a; ++n)
              r += I.Color.packedLength + 3 + e[n].batchIds.length;
            return r;
          })(r),
        i = new Float64Array(t),
        o = 0;
      (i[o++] = e), (i[o++] = n);
      for (var s = 0; s < n; ++s)
        y.OrientedBoundingBox.pack(a[s], i, o),
          (o += y.OrientedBoundingBox.packedLength);
      var f = r.length;
      i[o++] = f;
      for (var d = 0; d < f; ++d) {
        var c = r[d];
        I.Color.pack(c.color, i, o),
          (o += I.Color.packedLength),
          (i[o++] = c.offset),
          (i[o++] = c.count);
        var u = c.batchIds,
          h = u.length;
        i[o++] = h;
        for (var l = 0; l < h; ++l) i[o++] = u[l];
      }
      return i;
    })(
      2 === se.BYTES_PER_ELEMENT
        ? l.IndexDatatype.UNSIGNED_SHORT
        : l.IndexDatatype.UNSIGNED_INT,
      F,
      le,
    );
    return (
      i.push(ne.buffer, se.buffer, ie.buffer, oe.buffer, te.buffer, qe.buffer),
      {
        positions: ne.buffer,
        indices: se.buffer,
        indexOffsets: ie.buffer,
        indexCounts: oe.buffer,
        batchIds: te.buffer,
        packedBuffer: qe.buffer,
      }
    );
  });
});
