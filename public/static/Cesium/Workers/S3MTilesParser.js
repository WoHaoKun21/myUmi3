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
  './PrimitiveType-97893bc7',
  './FeatureDetection-7bd32c34',
  './IndexDatatype-9435b55f',
  './createTaskProcessorWorker',
  './BoundingRectangle-3d4f3d01',
  './Color-69f1845f',
  './pako_inflate-8ea163f9',
  './S3MCompressType-18fd745e',
], function (t, e, n, r, a, i, E, o, s, y, T, p, A, _, u, v, c, f) {
  function B(t, e, n, r, a, i) {
    (this.left = t),
      (this.bottom = e),
      (this.right = n),
      (this.top = r),
      (this.minHeight = a),
      (this.maxHeight = i),
      (this.width = n - t),
      (this.length = r - e),
      (this.height = i - a);
  }
  function m(t, e, n, r, a) {
    var i = n.getUint32(r, !0);
    r += Uint32Array.BYTES_PER_ELEMENT;
    var E = 0,
      o = {},
      s = (o.vertexAttributes = []),
      T = (o.attrLocation = {});
    o.instanceCount = 0;
    var p = (o.instanceMode = 0);
    n.getUint32(r, !0), (r += Uint32Array.BYTES_PER_ELEMENT);
    var A = n.getUint16(r, !0);
    r += Uint32Array.BYTES_PER_ELEMENT;
    var _ = A;
    4 < A && ((_ = A >> 8), (A &= 15));
    var u = n.getUint32(r, !0);
    if (((r += Uint32Array.BYTES_PER_ELEMENT), 0 < u)) {
      var v = n.getUint16(r, !0);
      (v = A * Float32Array.BYTES_PER_ELEMENT),
        (r += Uint32Array.BYTES_PER_ELEMENT),
        (E = u * v),
        (T.aPosition = p),
        s.push({
          index: T.aPosition,
          typedArray: e.subarray(r, r + E),
          componentsPerAttribute: A,
          componentDatatype: y.ComponentDatatype.FLOAT,
          offsetInBytes: 0,
          strideInBytes: v,
          normalize: !1,
        }),
        p++,
        (r += E);
    }
    var c = n.getUint32(r, !0);
    if (((r += Uint32Array.BYTES_PER_ELEMENT), 0 < c)) {
      var f = n.getUint16(r, !0);
      (f = _ * Float32Array.BYTES_PER_ELEMENT),
        (r += Uint32Array.BYTES_PER_ELEMENT),
        (E = c * f),
        t.ignoreNormal ||
          ((T.aNormal = p),
          s.push({
            index: T.aNormal,
            typedArray: e.subarray(r, r + E),
            componentsPerAttribute: _,
            componentDatatype: y.ComponentDatatype.FLOAT,
            offsetInBytes: 0,
            strideInBytes: f,
            normalize: !1,
          }),
          p++),
        (r += E);
    }
    var B = n.getUint32(r, !0);
    if (((r += Uint32Array.BYTES_PER_ELEMENT), 0 < B)) {
      var m = new Uint8Array(4 * B);
      a.push(m.buffer);
      var l = n.getUint32(r, !0);
      (l = 4 * Float32Array.BYTES_PER_ELEMENT),
        (r += Uint32Array.BYTES_PER_ELEMENT),
        (E = B * l);
      for (var U = new Float32Array(e.buffer, r, 4 * u), P = 0; P < u; P++)
        (m[4 * P] = 255 * U[4 * P]),
          (m[4 * P + 1] = 255 * U[4 * P + 1]),
          (m[4 * P + 2] = 255 * U[4 * P + 2]),
          (m[4 * P + 3] = 255 * U[4 * P + 3]);
      (r += E),
        (T.aColor = p),
        s.push({
          index: T.aColor,
          typedArray: m,
          componentsPerAttribute: 4,
          componentDatatype: y.ComponentDatatype.UNSIGNED_BYTE,
          offsetInBytes: 0,
          strideInBytes: 4,
          normalize: !0,
        }),
        p++;
    }
    var d = n.getUint32(r, !0);
    (r += Uint32Array.BYTES_PER_ELEMENT), 0 < d && (r += E = 16 * d);
    var g = n.getUint32(r, !0);
    r += Uint32Array.BYTES_PER_ELEMENT;
    for (var L, N, M = -1, S = 0; S < g; S++) {
      (L = n.getUint32(r, !0)),
        (r += Uint32Array.BYTES_PER_ELEMENT),
        (N = n.getUint16(r, !0)),
        (r += Uint16Array.BYTES_PER_ELEMENT),
        n.getUint16(r, !0),
        (r += Uint16Array.BYTES_PER_ELEMENT),
        (E = L * N * Float32Array.BYTES_PER_ELEMENT);
      var h,
        R = e.subarray(r, r + E);
      if (-1 != M || (20 != N && 35 != N))
        if (-1 !== M) o.instanceBounds = new Float32Array(e.buffer, r, L * N);
        else {
          var Y = 'aTexCoord' + S;
          (T[Y] = p++),
            s.push({
              index: T[Y],
              typedArray: R,
              componentsPerAttribute: N,
              componentDatatype: y.ComponentDatatype.FLOAT,
              offsetInBytes: 0,
              strideInBytes: N * Float32Array.BYTES_PER_ELEMENT,
              normalize: !1,
            });
        }
      else
        (M = S),
          (o.instanceCount = L),
          (o.instanceMode = N),
          (o.instanceBuffer = R),
          20 === N
            ? ((h = 20 * Float32Array.BYTES_PER_ELEMENT),
              (T.uv2 = p++),
              s.push({
                index: T.uv2,
                componentsPerAttribute: 4,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 0,
                strideInBytes: h,
                instanceDivisor: 1,
              }),
              (T.uv3 = p++),
              s.push({
                index: T.uv3,
                componentsPerAttribute: 4,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 4 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: h,
                instanceDivisor: 1,
              }),
              (T.uv4 = p++),
              s.push({
                index: T.uv4,
                componentsPerAttribute: 4,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 8 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: h,
                instanceDivisor: 1,
              }),
              (T.secondary_colour = p++),
              s.push({
                index: T.secondary_colour,
                componentsPerAttribute: 4,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 12 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: h,
                instanceDivisor: 1,
              }),
              (T.uv6 = p++),
              s.push({
                index: T.uv6,
                componentsPerAttribute: 4,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 16 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: h,
                instanceDivisor: 1,
              }))
            : 35 === N &&
              ((h = 35 * Float32Array.BYTES_PER_ELEMENT),
              (T.uv1 = p++),
              s.push({
                index: T.uv1,
                componentsPerAttribute: 4,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 0,
                strideInBytes: h,
                instanceDivisor: 1,
                byteLength: E,
              }),
              (T.uv2 = p++),
              s.push({
                index: T.uv2,
                componentsPerAttribute: 4,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 4 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: h,
                instanceDivisor: 1,
              }),
              (T.uv3 = p++),
              s.push({
                index: T.uv3,
                componentsPerAttribute: 4,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 8 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: h,
                instanceDivisor: 1,
              }),
              (T.uv4 = p++),
              s.push({
                index: T.uv4,
                componentsPerAttribute: 4,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 12 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: h,
                instanceDivisor: 1,
              }),
              (T.uv5 = p++),
              s.push({
                index: T.uv5,
                componentsPerAttribute: 4,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 16 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: h,
                instanceDivisor: 1,
              }),
              (T.uv6 = p++),
              s.push({
                index: T.uv6,
                componentsPerAttribute: 4,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 20 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: h,
                instanceDivisor: 1,
              }),
              (T.uv7 = p++),
              s.push({
                index: T.uv7,
                componentsPerAttribute: 3,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 24 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: h,
                instanceDivisor: 1,
              }),
              (T.secondary_colour = p++),
              s.push({
                index: T.secondary_colour,
                componentsPerAttribute: 4,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 27 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: h,
                instanceDivisor: 1,
              }),
              (T.uv9 = p++),
              s.push({
                index: T.uv9,
                componentsPerAttribute: 4,
                componentDatatype: y.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 31 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: h,
                instanceDivisor: 1,
              }));
      r += E;
    }
    (o.verticesCount = u), (o.instanceIndex = M);
    var D = n.getUint32(r, !0);
    r += Uint32Array.BYTES_PER_ELEMENT;
    var b = [];
    for (S = 0; S < D; S++) {
      var I = {},
        F = n.getUint32(r, !0);
      r += Uint32Array.BYTES_PER_ELEMENT;
      var x = n.getUint8(r, !0);
      (r += Uint8Array.BYTES_PER_ELEMENT),
        n.getUint8(r, !0),
        (r += Uint8Array.BYTES_PER_ELEMENT);
      var C = n.getUint8(r, !0);
      (r += Uint8Array.BYTES_PER_ELEMENT),
        (r += 1),
        (I.indicesCount = F),
        (I.indexType = x),
        (I.primitiveType = C);
      var w = r;
      0 < F &&
        (0 == x
          ? ((r += E = F * Uint16Array.BYTES_PER_ELEMENT),
            F % 2 == 1 && (r += 2))
          : (r += E = 4 * F)),
        (I.indicesTypedArray = e.subarray(w, w + E));
      var k = n.getUint32(r, !0);
      r += Uint32Array.BYTES_PER_ELEMENT;
      var O = n.getUint32(r, !0);
      (r += Uint32Array.BYTES_PER_ELEMENT * k), (I.materialCode = O), b.push(I);
    }
    return (t[i] = { vertexPackage: o, arrIndexPackage: b }), r;
  }
  function l(t, e, n) {
    var r = t.vertexAttributes,
      a = t.attrLocation,
      i = r.length;
    (a[1 === n ? 'instanceId' : 'batchId'] = i),
      r.push({
        index: i,
        typedArray: e,
        componentsPerAttribute: 1,
        componentDatatype: y.ComponentDatatype.FLOAT,
        offsetInBytes: 0,
        strideInBytes: 0,
        instanceDivisor: n,
      });
  }
  return _(function (t, e) {
    var n = t.buffer,
      r = t.supportCompressType,
      a = t.bVolume,
      i = null,
      E = null,
      o = null;
    if ((a && t.volbuffer.byteLength < 8 && (a = !1), a)) {
      var s = t.volbuffer,
        y = new Uint8Array(s, 8),
        T = c.pako.inflate(y).buffer,
        p = new Float64Array(T, 0, 1),
        A = new Uint32Array(T, 48, 1);
      if (0 === p[0] || 3200 === A[0] || 3201 === A[0]) {
        var _ = 0;
        0 === p[0] && (_ = 8), e.push(T);
        var u = new Float64Array(T, _, 6),
          v = u[0],
          U = u[1],
          P = u[2],
          d = u[3],
          g = u[4] < u[5] ? u[4] : u[5],
          L = u[4] > u[5] ? u[4] : u[5];
        E = {
          left: v,
          top: U,
          right: P,
          bottom: d,
          minHeight: g,
          maxHeight: L,
          width: (i = new B(v, d, P, U, g, L)).width,
          length: i.length,
          height: i.height,
        };
        var N = new Uint32Array(T, 48 + _, 7),
          M = N[0],
          S = N[1],
          h = N[2],
          R = N[3];
        o = {
          nFormat: M,
          nSideBlockCount: S,
          nBlockLength: h,
          nLength: R,
          nWidth: N[4],
          nHeight: N[5],
          nDepth: N[6],
          imageArray: new Uint8Array(T, 76 + _, R * R * 4),
        };
      }
    }
    var Y = 0,
      D = new Uint8Array(n, 0, 4);
    if (115 !== D[0] || 51 !== D[1] || 109 !== D[2]) return { result: !1 };
    var b = D[3],
      I = ((y = new Uint8Array(n, 4)), c.pako.inflate(y).buffer),
      F = new Uint8Array(I);
    e.push(F.buffer);
    var x = new DataView(I),
      C = x.getUint32(Y, !0);
    Y += Uint32Array.BYTES_PER_ELEMENT;
    var w = new Uint8Array(I, Y, C),
      k = C % 4;
    k && (k = 4 - k), (Y += C + k);
    var O = f.getStringFromTypedArray(w, void 0, void 0, 'gbk');
    (O = (O = O.replace(new RegExp('\r\n', 'gm'), '')).replace(
      new RegExp(':', 'gm'),
      '',
    )),
      x.getUint32(Y, !0),
      (Y += Uint32Array.BYTES_PER_ELEMENT);
    var z = x.getUint32(Y, !0);
    Y += Uint32Array.BYTES_PER_ELEMENT;
    var H = {};
    H.ignoreNormal = t.ignoreNormal;
    for (var G = 0; G < z; G++) Y = m(H, F, x, Y, e);
    x.getUint32(Y, !0), (Y += Uint32Array.BYTES_PER_ELEMENT);
    var W = x.getUint32(Y, !0);
    for (Y += Uint32Array.BYTES_PER_ELEMENT, G = 0; G < W; G++) {
      var V = x.getUint32(Y, !0);
      Y += Uint32Array.BYTES_PER_ELEMENT;
      var X = x.getUint32(Y, !0);
      Y += Uint32Array.BYTES_PER_ELEMENT;
      var j = {};
      if (-1 == H[V].vertexPackage.instanceIndex) {
        for (
          var q = new Float32Array(H[V].vertexPackage.verticesCount), J = 0;
          J < X;
          J++
        ) {
          var K = x.getUint32(Y, !0);
          Y += Uint32Array.BYTES_PER_ELEMENT;
          var Q = x.getUint32(Y, !0);
          Y += Uint32Array.BYTES_PER_ELEMENT;
          var Z = 0,
            $ = 0;
          j[K] = { batchId: J };
          for (var tt = 0; tt < Q; tt++)
            if (
              (($ = x.getUint32(Y, !0)),
              (Y += Uint32Array.BYTES_PER_ELEMENT),
              (Z = x.getUint32(Y, !0)),
              (Y += Uint32Array.BYTES_PER_ELEMENT),
              q.fill)
            )
              q.fill(J, $, $ + Z);
            else for (var et = $ + $, nt = $; nt < et; nt++) q[nt] = J;
          (j[K].vertexColorOffset = $), (j[K].vertexColorCount = Z);
        }
        l(H[V].vertexPackage, q, void 0);
      } else {
        var rt = H[V].vertexPackage.instanceCount,
          at =
            (H[V].vertexPackage.instanceBuffer,
            H[V].vertexPackage.instanceMode,
            new Float32Array(rt)),
          it = 0;
        for (J = 0; J < X; J++)
          for (
            K = x.getUint32(Y, !0),
              Y += Uint32Array.BYTES_PER_ELEMENT,
              Q = x.getUint32(Y, !0),
              Y += Uint32Array.BYTES_PER_ELEMENT,
              tt = 0;
            tt < Q;
            tt++
          ) {
            var Et = x.getUint32(Y, !0);
            (Y += Uint32Array.BYTES_PER_ELEMENT),
              (at[it] = it),
              void 0 === j[K] &&
                (j[K] = {
                  vertexColorCount: 1,
                  instanceIds: [],
                  vertexColorOffset: it,
                }),
              j[K].instanceIds.push(Et),
              it++;
          }
        l(H[V].vertexPackage, at, 1);
      }
      H[V].pickInfo = j;
    }
    x.getUint32(Y, !0), (Y += Uint32Array.BYTES_PER_ELEMENT);
    var ot = x.getUint32(Y, !0);
    Y += Uint32Array.BYTES_PER_ELEMENT;
    var st = {};
    for (G = 0; G < ot; G++) {
      var yt = x.getUint32(Y, !0);
      Y += Uint32Array.BYTES_PER_ELEMENT;
      var Tt = x.getUint32(Y, !0);
      Y += Uint32Array.BYTES_PER_ELEMENT;
      var pt = x.getUint32(Y, !0);
      Y += Uint32Array.BYTES_PER_ELEMENT;
      var At = x.getUint32(Y, !0);
      (Y += Uint32Array.BYTES_PER_ELEMENT),
        (Q = x.getUint32(Y, !0)),
        (Y += Uint32Array.BYTES_PER_ELEMENT);
      var _t = x.getUint32(Y, !0);
      Y += Uint32Array.BYTES_PER_ELEMENT;
      var ut = null;
      if (At === f.S3MCompressType.enrS3TCDXTN && 1 !== r) {
        var vt = null;
        (ut =
          _t > f.S3MPixelFormat.BGR || _t === f.S3MPixelFormat.LUMINANCE_ALPHA
            ? ((vt = new Uint8Array(I, Y, Tt * pt)),
              new Uint8Array(Tt * pt * 4))
            : ((vt = new Uint16Array(I, Y, Q / 2)), new Uint16Array(Tt * pt))),
          f.DXTTextureDecode.decode(ut, Tt, pt, vt, _t),
          e.push(ut.buffer),
          (At = 0);
      } else ut = new Uint8Array(I, Y, Q);
      (st[yt] = {
        id: yt,
        width: Tt,
        height: pt,
        compressType: At,
        nFormat: _t,
        imageBuffer: ut,
      }),
        (Y += Q);
    }
    return {
      result: !0,
      version: b,
      xmlDoc: O,
      geoPackage: H,
      texturePackage: st,
      volImageBuffer: o,
      volBounds: E,
    };
  });
});
