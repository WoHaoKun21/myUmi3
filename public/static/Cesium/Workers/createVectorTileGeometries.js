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
  './ComponentDatatype-5862616f',
  './GeometryAttribute-2243653a',
  './PrimitiveType-97893bc7',
  './FeatureDetection-7bd32c34',
  './Transforms-1509c877',
  './buildModuleUrl-392763e2',
  './GeometryAttributes-aacecde6',
  './IndexDatatype-9435b55f',
  './createTaskProcessorWorker',
  './arrayFill-9766fb2e',
  './GeometryOffsetAttribute-999fc023',
  './VertexFormat-fe4db402',
  './BoxGeometry-92274cfb',
  './CylinderGeometryLibrary-8c0fda9f',
  './CylinderGeometry-dc527951',
  './EllipsoidGeometry-d710e362',
  './Color-69f1845f',
], function (
  e,
  t,
  r,
  n,
  a,
  i,
  o,
  d,
  s,
  c,
  f,
  l,
  u,
  h,
  b,
  p,
  y,
  g,
  x,
  v,
  C,
  m,
  I,
  k,
  M,
  B,
) {
  function w(e) {
    (this.offset = e.offset),
      (this.count = e.count),
      (this.color = e.color),
      (this.batchIds = e.batchIds);
  }
  var A = new n.Cartesian3(),
    O = i.Matrix4.packedLength + n.Cartesian3.packedLength,
    L = i.Matrix4.packedLength + 2,
    E = i.Matrix4.packedLength + n.Cartesian3.packedLength,
    U = n.Cartesian3.packedLength + 1,
    G = {
      modelMatrix: new i.Matrix4(),
      boundingVolume: new i.BoundingSphere(),
    };
  function S(e, t) {
    var r = t * O,
      a = n.Cartesian3.unpack(e, r, A);
    r += n.Cartesian3.packedLength;
    var o = i.Matrix4.unpack(e, r, G.modelMatrix);
    i.Matrix4.multiplyByScale(o, a, o);
    var d = G.boundingVolume;
    return (
      n.Cartesian3.clone(n.Cartesian3.ZERO, d.center),
      (d.radius = Math.sqrt(3)),
      G
    );
  }
  function F(e, t) {
    var r = t * L,
      a = e[r++],
      o = e[r++],
      d = n.Cartesian3.fromElements(a, a, o, A),
      s = i.Matrix4.unpack(e, r, G.modelMatrix);
    i.Matrix4.multiplyByScale(s, d, s);
    var c = G.boundingVolume;
    return (
      n.Cartesian3.clone(n.Cartesian3.ZERO, c.center),
      (c.radius = Math.sqrt(2)),
      G
    );
  }
  function T(e, t) {
    var r = t * E,
      a = n.Cartesian3.unpack(e, r, A);
    r += n.Cartesian3.packedLength;
    var o = i.Matrix4.unpack(e, r, G.modelMatrix);
    i.Matrix4.multiplyByScale(o, a, o);
    var d = G.boundingVolume;
    return n.Cartesian3.clone(n.Cartesian3.ZERO, d.center), (d.radius = 1), G;
  }
  function V(e, t) {
    var r = t * U,
      a = e[r++],
      o = n.Cartesian3.unpack(e, r, A),
      d = i.Matrix4.fromTranslation(o, G.modelMatrix);
    i.Matrix4.multiplyByUniformScale(d, a, d);
    var s = G.boundingVolume;
    return n.Cartesian3.clone(n.Cartesian3.ZERO, s.center), (s.radius = 1), G;
  }
  var R = new n.Cartesian3();
  function D(t, r, a, o, d) {
    if (e.defined(r)) {
      for (
        var s = a.length,
          c = o.attributes.position.values,
          f = o.indices,
          l = t.positions,
          u = t.vertexBatchIds,
          h = t.indices,
          b = t.batchIds,
          p = t.batchTableColors,
          y = t.batchedIndices,
          g = t.indexOffsets,
          x = t.indexCounts,
          v = t.boundingVolumes,
          C = t.modelMatrix,
          m = t.center,
          I = t.positionOffset,
          k = t.batchIdIndex,
          M = t.indexOffset,
          A = t.batchedIndicesOffset,
          O = 0;
        O < s;
        ++O
      ) {
        var L = d(r, O),
          E = L.modelMatrix;
        i.Matrix4.multiply(C, E, E);
        for (var U = a[O], G = c.length, S = 0; S < G; S += 3) {
          var F = n.Cartesian3.unpack(c, S, R);
          i.Matrix4.multiplyByPoint(E, F, F),
            n.Cartesian3.subtract(F, m, F),
            n.Cartesian3.pack(F, l, 3 * I + S),
            (u[k++] = U);
        }
        for (var T = f.length, V = 0; V < T; ++V) h[M + V] = f[V] + I;
        var D = O + A;
        (y[D] = new w({
          offset: M,
          count: T,
          color: B.Color.fromRgba(p[U]),
          batchIds: [U],
        })),
          (b[D] = U),
          (g[D] = M),
          (x[D] = T),
          (v[D] = i.BoundingSphere.transform(L.boundingVolume, E)),
          (I += G / 3),
          (M += T);
      }
      (t.positionOffset = I),
        (t.batchIdIndex = k),
        (t.indexOffset = M),
        (t.batchedIndicesOffset += s);
    }
  }
  var P = new n.Cartesian3(),
    Z = new i.Matrix4();
  function q(e, t, r) {
    var n = r.length,
      a =
        2 +
        n * i.BoundingSphere.packedLength +
        1 +
        (function (e) {
          for (var t = e.length, r = 0, n = 0; n < t; ++n)
            r += B.Color.packedLength + 3 + e[n].batchIds.length;
          return r;
        })(t),
      o = new Float64Array(a),
      d = 0;
    (o[d++] = e), (o[d++] = n);
    for (var s = 0; s < n; ++s)
      i.BoundingSphere.pack(r[s], o, d), (d += i.BoundingSphere.packedLength);
    var c = t.length;
    o[d++] = c;
    for (var f = 0; f < c; ++f) {
      var l = t[f];
      B.Color.pack(l.color, o, d),
        (d += B.Color.packedLength),
        (o[d++] = l.offset),
        (o[d++] = l.count);
      var u = l.batchIds,
        h = u.length;
      o[d++] = h;
      for (var b = 0; b < h; ++b) o[d++] = u[b];
    }
    return o;
  }
  return g(function (t, r) {
    var a = e.defined(t.boxes) ? new Float32Array(t.boxes) : void 0,
      o = e.defined(t.boxBatchIds) ? new Uint16Array(t.boxBatchIds) : void 0,
      d = e.defined(t.cylinders) ? new Float32Array(t.cylinders) : void 0,
      s = e.defined(t.cylinderBatchIds)
        ? new Uint16Array(t.cylinderBatchIds)
        : void 0,
      c = e.defined(t.ellipsoids) ? new Float32Array(t.ellipsoids) : void 0,
      f = e.defined(t.ellipsoidBatchIds)
        ? new Uint16Array(t.ellipsoidBatchIds)
        : void 0,
      l = e.defined(t.spheres) ? new Float32Array(t.spheres) : void 0,
      u = e.defined(t.sphereBatchIds)
        ? new Uint16Array(t.sphereBatchIds)
        : void 0,
      h = e.defined(a) ? o.length : 0,
      b = e.defined(d) ? s.length : 0,
      p = e.defined(c) ? f.length : 0,
      g = e.defined(l) ? u.length : 0,
      x = m.BoxGeometry.getUnitBox(),
      v = k.CylinderGeometry.getUnitCylinder(),
      C = M.EllipsoidGeometry.getUnitEllipsoid(),
      I = x.attributes.position.values,
      B = v.attributes.position.values,
      w = C.attributes.position.values,
      A = I.length * h;
    (A += B.length * b), (A += w.length * (p + g));
    var O = x.indices,
      L = v.indices,
      E = C.indices,
      U = O.length * h;
    (U += L.length * b), (U += E.length * (p + g));
    var G,
      R,
      W,
      _ = new Float32Array(A),
      N = new Uint16Array(A / 3),
      Y = y.IndexDatatype.createTypedArray(A / 3, U),
      j = h + b + p + g,
      z = new Uint16Array(j),
      H = new Array(j),
      J = new Uint32Array(j),
      K = new Uint32Array(j),
      Q = new Array(j);
    (G = t.packedBuffer),
      (R = new Float64Array(G)),
      (W = 0),
      n.Cartesian3.unpack(R, W, P),
      (W += n.Cartesian3.packedLength),
      i.Matrix4.unpack(R, W, Z);
    var X = {
      batchTableColors: new Uint32Array(t.batchTableColors),
      positions: _,
      vertexBatchIds: N,
      indices: Y,
      batchIds: z,
      batchedIndices: H,
      indexOffsets: J,
      indexCounts: K,
      boundingVolumes: Q,
      positionOffset: 0,
      batchIdIndex: 0,
      indexOffset: 0,
      batchedIndicesOffset: 0,
      modelMatrix: Z,
      center: P,
    };
    D(X, a, o, x, S), D(X, d, s, v, F), D(X, c, f, C, T), D(X, l, u, C, V);
    var $ = q(Y.BYTES_PER_ELEMENT, H, Q);
    return (
      r.push(_.buffer, N.buffer, Y.buffer),
      r.push(z.buffer, J.buffer, K.buffer),
      r.push($.buffer),
      {
        positions: _.buffer,
        vertexBatchIds: N.buffer,
        indices: Y.buffer,
        indexOffsets: J.buffer,
        indexCounts: K.buffer,
        batchIds: z.buffer,
        packedBuffer: $.buffer,
      }
    );
  });
});
