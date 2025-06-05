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
  './buildModuleUrl-392763e2',
  './IndexDatatype-9435b55f',
  './createTaskProcessorWorker',
  './arrayFill-9766fb2e',
  './BoundingRectangle-3d4f3d01',
  './Color-69f1845f',
  './pako_inflate-8ea163f9',
  './S3MCompressType-18fd745e',
  './unzip-9ad5f9b4',
  './CompressedTextureBuffer-21cababf',
  './PixelFormat-8e0e5be1',
], function (
  t,
  e,
  r,
  a,
  n,
  i,
  o,
  E,
  s,
  y,
  f,
  T,
  u,
  d,
  l,
  _,
  p,
  A,
  c,
  v,
  m,
  g,
  B,
) {
  function P(r, a, n) {
    if (
      (e.Check.defined('array', r),
      t.defined(a) && e.Check.typeOf.number('begin', a),
      t.defined(n) && e.Check.typeOf.number('end', n),
      'function' == typeof r.slice)
    )
      return r.slice(a, n);
    for (
      var i = Array.prototype.slice.call(r, a, n),
        o = T.FeatureDetection.typedArrayTypes,
        E = o.length,
        s = 0;
      s < E;
      ++s
    )
      if (r instanceof o[s]) {
        i = new o[s](i);
        break;
      }
    return i;
  }
  function U() {}
  var b;
  function L(e, r, a) {
    var n,
      i = e.num_points(),
      o = a.num_components(),
      E = new b.AttributeQuantizationTransform();
    if (E.InitFromAttribute(a)) {
      for (var s = new Array(o), f = 0; f < o; ++f) s[f] = E.min_value(f);
      n = {
        quantizationBits: E.quantization_bits(),
        minValues: s,
        range: E.range(),
        octEncoded: !1,
      };
    }
    b.destroy(E),
      (E = new b.AttributeOctahedronTransform()).InitFromAttribute(a) &&
        (n = { quantizationBits: E.quantization_bits(), octEncoded: !0 }),
      b.destroy(E);
    var T,
      u = i * o;
    T = t.defined(n)
      ? (function (t, e, r, a, n) {
          var i, o;
          a.quantizationBits <= 8
            ? ((o = new b.DracoUInt8Array()),
              (i = new Uint8Array(n)),
              e.GetAttributeUInt8ForAllPoints(t, r, o))
            : ((o = new b.DracoUInt16Array()),
              (i = new Uint16Array(n)),
              e.GetAttributeUInt16ForAllPoints(t, r, o));
          for (var E = 0; E < n; ++E) i[E] = o.GetValue(E);
          return b.destroy(o), i;
        })(e, r, a, n, u)
      : (function (t, e, r, a) {
          var n, i;
          switch (r.data_type()) {
            case 1:
            case 11:
              (i = new b.DracoInt8Array()),
                (n = new Int8Array(a)),
                e.GetAttributeInt8ForAllPoints(t, r, i);
              break;
            case 2:
              (i = new b.DracoUInt8Array()),
                (n = new Uint8Array(a)),
                e.GetAttributeUInt8ForAllPoints(t, r, i);
              break;
            case 3:
              (i = new b.DracoInt16Array()),
                (n = new Int16Array(a)),
                e.GetAttributeInt16ForAllPoints(t, r, i);
              break;
            case 4:
              (i = new b.DracoUInt16Array()),
                (n = new Uint16Array(a)),
                e.GetAttributeUInt16ForAllPoints(t, r, i);
              break;
            case 5:
            case 7:
              (i = new b.DracoInt32Array()),
                (n = new Int32Array(a)),
                e.GetAttributeInt32ForAllPoints(t, r, i);
              break;
            case 6:
            case 8:
              (i = new b.DracoUInt32Array()),
                (n = new Uint32Array(a)),
                e.GetAttributeUInt32ForAllPoints(t, r, i);
              break;
            case 9:
            case 10:
              (i = new b.DracoFloat32Array()),
                (n = new Float32Array(a)),
                e.GetAttributeFloatForAllPoints(t, r, i);
          }
          for (var o = 0; o < a; ++o) n[o] = i.GetValue(o);
          return b.destroy(i), n;
        })(e, r, a, u);
    var d = y.ComponentDatatype.fromTypedArray(T);
    return {
      array: T,
      data: {
        componentsPerAttribute: o,
        componentDatatype: d,
        byteOffset: a.byte_offset(),
        byteStride: y.ComponentDatatype.getSizeInBytes(d) * o,
        normalized: a.normalized(),
        quantization: n,
      },
    };
  }
  function S(e, r, a, i) {
    var E = a.vertexAttributes,
      s = a.attrLocation;
    if (
      ((a.nCompressOptions = 0), t.defined(i.posUniqueID) && 0 <= i.posUniqueID)
    ) {
      a.nCompressOptions |= v.VertexCompressOption.SVC_Vertex;
      var y = L(e, r, r.GetAttribute(e, i.posUniqueID)),
        f = y.data.componentsPerAttribute;
      (a.verticesCount = y.array.length / f),
        (a.vertCompressConstant =
          y.data.quantization.range /
          (1 << y.data.quantization.quantizationBits));
      var T = y.data.quantization.minValues;
      (a.minVerticesValue = new o.Cartesian4(T[0], T[1], T[2], 1)),
        3 < f && (a.minVerticesValue.w = T[3]),
        (s.aPosition = E.length),
        E.push({
          index: s.aPosition,
          typedArray: y.array,
          componentsPerAttribute: f,
          componentDatatype: y.data.componentDatatype,
          offsetInBytes: y.data.byteOffset,
          strideInBytes: y.data.byteStride,
          normalize: y.data.normalized,
        });
    }
    if (t.defined(i.normalUniqueID) && 0 <= i.normalUniqueID) {
      a.nCompressOptions |= v.VertexCompressOption.SVC_Normal;
      var u = L(e, r, r.GetAttribute(e, i.normalUniqueID)),
        d = u.data.quantization;
      (a.normalRangeConstant = (1 << d.quantizationBits) - 1),
        (s.aNormal = E.length),
        E.push({
          index: s.aNormal,
          typedArray: u.array,
          componentsPerAttribute: u.data.componentsPerAttribute,
          componentDatatype: u.data.componentDatatype,
          offsetInBytes: u.data.byteOffset,
          strideInBytes: u.data.byteStride,
          normalize: u.data.normalized,
        });
    }
    if (t.defined(i.colorUniqueID) && 0 <= i.colorUniqueID) {
      a.nCompressOptions |= v.VertexCompressOption.SVC_VertexColor;
      var l = L(e, r, r.GetAttribute(e, i.colorUniqueID));
      (s.aColor = E.length),
        E.push({
          index: s.aColor,
          typedArray: l.array,
          componentsPerAttribute: l.data.componentsPerAttribute,
          componentDatatype: l.data.componentDatatype,
          offsetInBytes: l.data.byteOffset,
          strideInBytes: l.data.byteStride,
          normalize: l.data.normalized,
        });
    }
    for (var _ = 0; _ < i.texCoordUniqueIDs.length; _++) {
      (a.texCoordCompressConstant = []), (a.minTexCoordValue = []);
      var p = i.texCoordUniqueIDs[_];
      if (!(p < 0)) {
        var A = L(e, r, r.GetAttribute(e, p));
        t.defined(A.data.quantization) &&
          ((a.nCompressOptions |= v.VertexCompressOption.SVC_TexutreCoord),
          a.texCoordCompressConstant.push(
            A.data.quantization.range /
              (1 << A.data.quantization.quantizationBits),
          ),
          (T = A.data.quantization.minValues),
          a.minTexCoordValue.push(new n.Cartesian2(T[0], T[1])));
        var c = 'aTexCoord' + _;
        (s[c] = E.length),
          E.push({
            index: s[c],
            typedArray: A.array,
            componentsPerAttribute: A.data.componentsPerAttribute,
            componentDatatype: A.data.componentDatatype,
            offsetInBytes: A.data.byteOffset,
            strideInBytes: A.data.byteStride,
            normalize: A.data.normalized,
          });
      }
    }
  }
  (U.dracoDecodePointCloud = function (t, e, r, a, n) {
    for (
      var i = new (b = t).Decoder(), o = ['POSITION', 'NORMAL', 'COLOR'], s = 0;
      s < o.length;
      ++s
    )
      i.SkipAttributeTransform(b[o[s]]);
    var y = new b.DecoderBuffer();
    if ((y.Init(e, r), i.GetEncodedGeometryType(y) !== b.POINT_CLOUD))
      throw new E.RuntimeError('Draco geometry type must be POINT_CLOUD.');
    var f = new b.PointCloud(),
      T = i.DecodeBufferToPointCloud(y, f);
    if (!T.ok() || 0 === f.ptr)
      throw new E.RuntimeError(
        'Error decoding draco point cloud: ' + T.error_msg(),
      );
    b.destroy(y), S(f, i, a, n), b.destroy(f), b.destroy(i);
  }),
    (U.dracoDecodeMesh = function (t, e, r, a, n, i) {
      for (
        var o = new (b = t).Decoder(),
          s = ['POSITION', 'NORMAL', 'COLOR', 'TEX_COORD'],
          y = 0;
        y < s.length;
        ++y
      )
        o.SkipAttributeTransform(b[s[y]]);
      var T = new b.DecoderBuffer();
      if ((T.Init(e, r), o.GetEncodedGeometryType(T) !== b.TRIANGULAR_MESH))
        throw new E.RuntimeError('Unsupported draco mesh geometry type.');
      var u = new b.Mesh(),
        l = o.DecodeBufferToMesh(T, u);
      if (!l.ok() || 0 === u.ptr)
        throw new E.RuntimeError(
          'Error decoding draco mesh geometry: ' + l.error_msg(),
        );
      b.destroy(T), S(u, o, a, i);
      var _ = (function (t, e) {
        for (
          var r = t.num_points(),
            a = t.num_faces(),
            n = new b.DracoInt32Array(),
            i = 3 * a,
            o = d.IndexDatatype.createTypedArray(r, i),
            E = 0,
            s = 0;
          s < a;
          ++s
        )
          e.GetFaceFromMesh(t, s, n),
            (o[E + 0] = n.GetValue(0)),
            (o[E + 1] = n.GetValue(1)),
            (o[E + 2] = n.GetValue(2)),
            (E += 3);
        var y = d.IndexDatatype.UNSIGNED_SHORT;
        return (
          o instanceof Uint32Array && (y = d.IndexDatatype.UNSIGNED_INT),
          b.destroy(n),
          { typedArray: o, numberOfIndices: i, indexDataType: y }
        );
      })(u, o);
      (n.indicesTypedArray = _.typedArray),
        (n.indicesCount = _.numberOfIndices),
        (n.indexType = _.indexDataType),
        (n.primitiveType = f.PrimitiveType.TRIANGLES),
        b.destroy(u),
        b.destroy(o);
    });
  var M,
    N,
    h = Object.freeze({ S3M: 49, S3M4: 1 }),
    R = {};
  (R[0] = B.PixelFormat.RGB_DXT1),
    (R[1] = B.PixelFormat.RGBA_DXT3),
    (R[2] = B.PixelFormat.RGBA_DXT5);
  var x,
    Y = 0,
    I = !1;
  function F(e, r) {
    var a = e.data,
      n = a.byteLength,
      i = new Uint8Array(a),
      o = x._malloc(n);
    !(function (t, e, r, a) {
      var n,
        i = r / 4,
        o = a % 4,
        E = new Uint32Array(t.buffer, 0, (a - o) / 4),
        s = new Uint32Array(e.buffer);
      for (n = 0; n < E.length; n++) s[i + n] = E[n];
      for (n = a - o; n < a; n++) e[r + n] = t[n];
    })(i, x.HEAPU8, o, n);
    var s = x._crn_get_dxt_format(o, n),
      y = R[s];
    if (!t.defined(y))
      throw new E.RuntimeError('Unsupported compressed format.');
    var f,
      T = x._crn_get_levels(o, n),
      u = x._crn_get_width(o, n),
      d = x._crn_get_height(o, n),
      l = 0;
    for (f = 0; f < T; ++f)
      l += B.PixelFormat.compressedTextureSizeInBytes(y, u >> f, d >> f);
    if (
      (Y < l &&
        (t.defined(M) && x._free(M),
        (M = x._malloc(l)),
        (N = new Uint8Array(x.HEAPU8.buffer, M, l)),
        (Y = l)),
      x._crn_decompress(o, n, M, l, 0, T),
      x._free(o),
      t.defaultValue(e.bMipMap, !1))
    ) {
      var _ = N.slice(0, l);
      return r.push(_.buffer), new g.CompressedTextureBuffer(y, u, d, _);
    }
    var p = B.PixelFormat.compressedTextureSizeInBytes(y, u, d),
      A = N.subarray(0, p),
      c = new Uint8Array(p);
    return (
      c.set(A, 0), r.push(c.buffer), new g.CompressedTextureBuffer(y, u, d, c)
    );
  }
  var C,
    D = 1,
    O = 1,
    w = 2,
    z = 3,
    k = new A.Color(),
    V = !1;
  if (t.defined(m.unzip)) {
    m.unzip.onRuntimeInitialized = function () {
      V = !0;
    };
    var G = m.unzip.cwrap('unzip', 'number', [
        'number',
        'number',
        'number',
        'number',
      ]),
      q = m.unzip.cwrap('freePointer', null, ['number']);
  }
  function H(t, e, r, a, n, i) {
    (this.left = t),
      (this.bottom = e),
      (this.right = r),
      (this.top = a),
      (this.minHeight = n),
      (this.maxHeight = i),
      (this.width = r - t),
      (this.length = a - e),
      (this.height = i - n);
  }
  function W(t, e, r) {
    var a = r,
      n = t.getUint32(a, !0),
      i = (a += Uint32Array.BYTES_PER_ELEMENT),
      o = new Uint8Array(e, a, n);
    return {
      dataViewByteOffset: i,
      byteOffset: (a += n * Uint8Array.BYTES_PER_ELEMENT),
      buffer: o,
    };
  }
  function X(t, e, r, a) {
    var n = t.getUint32(a + e, !0);
    a += Uint32Array.BYTES_PER_ELEMENT;
    var i = r.subarray(a, a + n);
    return { string: v.getStringFromTypedArray(i), bytesOffset: (a += n) };
  }
  function j(t, e, r, a, n, i) {
    var o = r,
      E = t.getUint16(r + a, !0);
    (o += Uint16Array.BYTES_PER_ELEMENT),
      i || (o += Uint16Array.BYTES_PER_ELEMENT);
    for (var s = 0; s < E; s++) {
      var f = t.getUint32(o + a, !0);
      o += Uint32Array.BYTES_PER_ELEMENT;
      var T = t.getUint16(o + a, !0);
      if (
        ((o += Uint16Array.BYTES_PER_ELEMENT),
        t.getUint16(o + a, !0),
        (o += Uint16Array.BYTES_PER_ELEMENT),
        20 == T || 35 == T)
      );
      else {
        var u = f * T * Float32Array.BYTES_PER_ELEMENT,
          d = e.subarray(o, o + u);
        o += u;
        var l = 'aTexCoord' + s,
          _ = n.vertexAttributes,
          p = n.attrLocation;
        (p[l] = _.length),
          _.push({
            index: p[l],
            typedArray: d,
            componentsPerAttribute: T,
            componentDatatype: y.ComponentDatatype.FLOAT,
            offsetInBytes: 0,
            strideInBytes: T * Float32Array.BYTES_PER_ELEMENT,
            normalize: !1,
          });
      }
    }
    return { bytesOffset: o };
  }
  function J(t, e, r, a, n) {
    var i = r,
      o = t.getUint16(i + a, !0);
    (i += Uint16Array.BYTES_PER_ELEMENT), (i += Uint16Array.BYTES_PER_ELEMENT);
    for (var E = n.vertexAttributes, s = n.attrLocation, f = 0; f < o; f++) {
      var T = t.getUint32(i + a, !0);
      i += Uint32Array.BYTES_PER_ELEMENT;
      var u = t.getUint16(i + a, !0);
      if (((i += Uint16Array.BYTES_PER_ELEMENT), 16 === u)) {
        i -= Uint16Array.BYTES_PER_ELEMENT;
        var d =
            T *
            (u * Float32Array.BYTES_PER_ELEMENT +
              Uint16Array.BYTES_PER_ELEMENT),
          l = e.subarray(i, i + d);
        i += d;
        var _ = new Uint8Array(Float32Array.BYTES_PER_ELEMENT * u * T);
        (n.instanceCount = T),
          (n.instanceMode = u),
          (n.instanceBuffer = _),
          (n.instanceIndex = 1);
        for (
          var p =
              Float32Array.BYTES_PER_ELEMENT * u +
              Uint16Array.BYTES_PER_ELEMENT,
            A = 0;
          A < T;
          A++
        ) {
          var c = A * p + Uint16Array.BYTES_PER_ELEMENT,
            v = l.subarray(c, c + p);
          _.set(v, A * (p - Uint16Array.BYTES_PER_ELEMENT));
        }
        (m = 16 * Float32Array.BYTES_PER_ELEMENT),
          (s.uv2 = E.length),
          E.push({
            index: s.uv2,
            componentsPerAttribute: 4,
            componentDatatype: y.ComponentDatatype.FLOAT,
            normalize: !1,
            offsetInBytes: 0,
            strideInBytes: m,
            instanceDivisor: 1,
          }),
          (s.uv3 = E.length),
          E.push({
            index: s.uv3,
            componentsPerAttribute: 4,
            componentDatatype: y.ComponentDatatype.FLOAT,
            normalize: !1,
            offsetInBytes: 4 * Float32Array.BYTES_PER_ELEMENT,
            strideInBytes: m,
            instanceDivisor: 1,
          }),
          (s.uv4 = E.length),
          E.push({
            index: s.uv4,
            componentsPerAttribute: 4,
            componentDatatype: y.ComponentDatatype.FLOAT,
            normalize: !1,
            offsetInBytes: 8 * Float32Array.BYTES_PER_ELEMENT,
            strideInBytes: m,
            instanceDivisor: 1,
          }),
          (s.secondary_colour = E.length),
          E.push({
            index: s.secondary_colour,
            componentsPerAttribute: 4,
            componentDatatype: y.ComponentDatatype.FLOAT,
            normalize: !1,
            offsetInBytes: 12 * Float32Array.BYTES_PER_ELEMENT,
            strideInBytes: m,
            instanceDivisor: 1,
          });
      } else {
        if (
          (t.getUint16(i + a, !0),
          (i += Uint16Array.BYTES_PER_ELEMENT),
          (d = T * u * Float32Array.BYTES_PER_ELEMENT),
          17 === u || 29 === u)
        ) {
          var m;
          (_ = e.subarray(i, i + d)),
            (n.instanceCount = T),
            (n.instanceMode = u),
            (n.instanceBuffer = _),
            (n.instanceIndex = 1),
            17 === u
              ? ((m = 17 * Float32Array.BYTES_PER_ELEMENT),
                (s.uv2 = E.length),
                E.push({
                  index: s.uv2,
                  componentsPerAttribute: 4,
                  componentDatatype: y.ComponentDatatype.FLOAT,
                  normalize: !1,
                  offsetInBytes: 0,
                  strideInBytes: m,
                  instanceDivisor: 1,
                }),
                (s.uv3 = E.length),
                E.push({
                  index: s.uv3,
                  componentsPerAttribute: 4,
                  componentDatatype: y.ComponentDatatype.FLOAT,
                  normalize: !1,
                  offsetInBytes: 4 * Float32Array.BYTES_PER_ELEMENT,
                  strideInBytes: m,
                  instanceDivisor: 1,
                }),
                (s.uv4 = E.length),
                E.push({
                  index: s.uv4,
                  componentsPerAttribute: 4,
                  componentDatatype: y.ComponentDatatype.FLOAT,
                  normalize: !1,
                  offsetInBytes: 8 * Float32Array.BYTES_PER_ELEMENT,
                  strideInBytes: m,
                  instanceDivisor: 1,
                }),
                (s.secondary_colour = E.length),
                E.push({
                  index: s.secondary_colour,
                  componentsPerAttribute: 4,
                  componentDatatype: y.ComponentDatatype.FLOAT,
                  normalize: !1,
                  offsetInBytes: 12 * Float32Array.BYTES_PER_ELEMENT,
                  strideInBytes: m,
                  instanceDivisor: 1,
                }),
                (s.uv6 = E.length),
                E.push({
                  index: s.uv6,
                  componentsPerAttribute: 4,
                  componentDatatype: y.ComponentDatatype.UNSIGNED_BYTE,
                  normalize: !0,
                  offsetInBytes: 16 * Float32Array.BYTES_PER_ELEMENT,
                  strideInBytes: m,
                  instanceDivisor: 1,
                }))
              : 29 === u &&
                ((m = 29 * Float32Array.BYTES_PER_ELEMENT),
                (s.uv1 = E.length),
                E.push({
                  index: s.uv1,
                  componentsPerAttribute: 4,
                  componentDatatype: y.ComponentDatatype.FLOAT,
                  normalize: !1,
                  offsetInBytes: 0,
                  strideInBytes: m,
                  instanceDivisor: 1,
                  byteLength: d,
                }),
                (s.uv2 = E.length),
                E.push({
                  index: s.uv2,
                  componentsPerAttribute: 4,
                  componentDatatype: y.ComponentDatatype.FLOAT,
                  normalize: !1,
                  offsetInBytes: 4 * Float32Array.BYTES_PER_ELEMENT,
                  strideInBytes: m,
                  instanceDivisor: 1,
                }),
                (s.uv3 = E.length),
                E.push({
                  index: s.uv3,
                  componentsPerAttribute: 4,
                  componentDatatype: y.ComponentDatatype.FLOAT,
                  normalize: !1,
                  offsetInBytes: 8 * Float32Array.BYTES_PER_ELEMENT,
                  strideInBytes: m,
                  instanceDivisor: 1,
                }),
                (s.uv4 = E.length),
                E.push({
                  index: s.uv4,
                  componentsPerAttribute: 4,
                  componentDatatype: y.ComponentDatatype.FLOAT,
                  normalize: !1,
                  offsetInBytes: 12 * Float32Array.BYTES_PER_ELEMENT,
                  strideInBytes: m,
                  instanceDivisor: 1,
                }),
                (s.uv5 = E.length),
                E.push({
                  index: s.uv5,
                  componentsPerAttribute: 4,
                  componentDatatype: y.ComponentDatatype.FLOAT,
                  normalize: !1,
                  offsetInBytes: 16 * Float32Array.BYTES_PER_ELEMENT,
                  strideInBytes: m,
                  instanceDivisor: 1,
                }),
                (s.uv6 = E.length),
                E.push({
                  index: s.uv6,
                  componentsPerAttribute: 4,
                  componentDatatype: y.ComponentDatatype.FLOAT,
                  normalize: !1,
                  offsetInBytes: 20 * Float32Array.BYTES_PER_ELEMENT,
                  strideInBytes: m,
                  instanceDivisor: 1,
                }),
                (s.uv7 = E.length),
                E.push({
                  index: s.uv7,
                  componentsPerAttribute: 3,
                  componentDatatype: y.ComponentDatatype.FLOAT,
                  normalize: !1,
                  offsetInBytes: 24 * Float32Array.BYTES_PER_ELEMENT,
                  strideInBytes: m,
                  instanceDivisor: 1,
                }),
                (s.secondary_colour = E.length),
                E.push({
                  index: s.secondary_colour,
                  componentsPerAttribute: 4,
                  componentDatatype: y.ComponentDatatype.UNSIGNED_BYTE,
                  normalize: !0,
                  offsetInBytes: 27 * Float32Array.BYTES_PER_ELEMENT,
                  strideInBytes: m,
                  instanceDivisor: 1,
                }),
                (s.uv9 = E.length),
                E.push({
                  index: s.uv9,
                  componentsPerAttribute: 4,
                  componentDatatype: y.ComponentDatatype.UNSIGNED_BYTE,
                  normalize: !0,
                  offsetInBytes: 28 * Float32Array.BYTES_PER_ELEMENT,
                  strideInBytes: m,
                  instanceDivisor: 1,
                }));
        } else {
          var g = T * u;
          n.instanceBounds = new Float32Array(g);
          for (var B = 0; B < g; B++)
            n.instanceBounds[B] = t.getFloat32(
              i + a + B * Float32Array.BYTES_PER_ELEMENT,
              !0,
            );
        }
        i += d;
      }
    }
    return { bytesOffset: i };
  }
  function Z(e, r, n, o, E, s) {
    var f = o,
      T = r.getUint32(f + n, !0);
    if (((E.verticesCount = T), (f += Uint32Array.BYTES_PER_ELEMENT), T <= 0))
      return { bytesOffset: f };
    var u = r.getUint16(f + n, !0);
    f += Uint16Array.BYTES_PER_ELEMENT;
    var d = r.getUint16(f + n, !0);
    (d = u * Float32Array.BYTES_PER_ELEMENT),
      (f += Uint16Array.BYTES_PER_ELEMENT);
    var l = T * u * Float32Array.BYTES_PER_ELEMENT,
      _ = e.subarray(f, f + l);
    if (((f += l), 3 === u && t.defined(s))) {
      for (
        var p = new a.Cartesian3(),
          A = new a.Cartesian3(),
          c = new Float32Array(_.buffer, _.byteOffset, _.byteLength / 4),
          v = new Float32Array(_.byteLength / 4 + T),
          m = c.length,
          g = 0,
          B = 0;
        g < m;
        g += 3, B += 4
      )
        (v[B] = c[g]),
          (v[B + 1] = c[g + 1]),
          (v[B + 2] = c[g + 2]),
          i.Matrix4.multiplyByPoint(
            s,
            a.Cartesian3.fromElements(v[B], v[B + 1], v[B + 2], p),
            A,
          ),
          (v[B + 3] = a.Cartographic.fromCartesian(A).height);
      (_ = v), (d = (u = 4) * Float32Array.BYTES_PER_ELEMENT);
    }
    var P = E.vertexAttributes,
      U = E.attrLocation;
    return (
      (U.aPosition = P.length),
      P.push({
        index: U.aPosition,
        typedArray: _,
        componentsPerAttribute: u,
        componentDatatype: y.ComponentDatatype.FLOAT,
        offsetInBytes: 0,
        strideInBytes: d,
        normalize: !1,
      }),
      { bytesOffset: f }
    );
  }
  function Q(t, e, r, a, n) {
    var i = a,
      o = e.getUint32(i + r, !0);
    if (((i += Uint32Array.BYTES_PER_ELEMENT), o <= 0))
      return { bytesOffset: i };
    var E = e.getUint16(i + r, !0);
    i += Uint16Array.BYTES_PER_ELEMENT;
    var s = e.getUint16(i + r, !0);
    i += Uint16Array.BYTES_PER_ELEMENT;
    var f = o * E * Float32Array.BYTES_PER_ELEMENT,
      T = t.subarray(i, i + f);
    if (((i += f), !n.ignoreNormal)) {
      var u = n.vertexAttributes,
        d = n.attrLocation;
      (d.aNormal = u.length),
        u.push({
          index: d.aNormal,
          typedArray: T,
          componentsPerAttribute: E,
          componentDatatype: y.ComponentDatatype.FLOAT,
          offsetInBytes: 0,
          strideInBytes: s,
          normalize: !1,
        });
    }
    return { bytesOffset: i };
  }
  function K(t, e, r, a, n) {
    var i,
      o = a,
      E = e.getUint32(o + r, !0);
    if (((o += Uint32Array.BYTES_PER_ELEMENT), n.verticesCount, 0 < E)) {
      e.getUint16(o + r, !0),
        (o += Uint16Array.BYTES_PER_ELEMENT),
        (o += 2 * Uint8Array.BYTES_PER_ELEMENT);
      var s = E * Uint8Array.BYTES_PER_ELEMENT * 4;
      (i = P(t, o, o + s)), (o += s);
      var f = n.vertexAttributes,
        T = n.attrLocation;
      (T.aColor = f.length),
        f.push({
          index: T.aColor,
          typedArray: i,
          componentsPerAttribute: 4,
          componentDatatype: y.ComponentDatatype.UNSIGNED_BYTE,
          offsetInBytes: 0,
          strideInBytes: 4,
          normalize: !0,
        });
    }
    return { bytesOffset: o };
  }
  function $(t, e, r, a, n) {
    var i = a,
      o = e.getUint32(i + r, !0);
    return (
      (i += Uint32Array.BYTES_PER_ELEMENT),
      o <= 0
        ? { bytesOffset: i }
        : (e.getUint16(i + r, !0),
          (i += Uint16Array.BYTES_PER_ELEMENT),
          (i += 2 * Uint8Array.BYTES_PER_ELEMENT),
          { bytesOffset: (i += o * Uint8Array.BYTES_PER_ELEMENT * 4) })
    );
  }
  function tt(t, e, r, a) {
    var n = a,
      i = [],
      o = e.getUint32(n + r, !0);
    n += Uint32Array.BYTES_PER_ELEMENT;
    for (var E = 0; E < o; E++) {
      var s = {},
        y = e.getUint32(n + r, !0);
      n += Uint32Array.BYTES_PER_ELEMENT;
      var f = e.getUint8(n + r, !0);
      (n += Uint8Array.BYTES_PER_ELEMENT),
        e.getUint8(n + r, !0),
        (n += Uint8Array.BYTES_PER_ELEMENT);
      var T = e.getUint8(n + r, !0);
      if (
        ((n += Uint8Array.BYTES_PER_ELEMENT),
        (n += Uint8Array.BYTES_PER_ELEMENT),
        0 < y)
      ) {
        var u = 0,
          d = null;
        1 === f || 3 === f
          ? ((u = y * Uint32Array.BYTES_PER_ELEMENT),
            (d = t.subarray(n, n + u)))
          : ((u = y * Uint16Array.BYTES_PER_ELEMENT),
            (d = t.subarray(n, n + u)),
            y % 2 != 0 && (u += 2)),
          (s.indicesTypedArray = d),
          (n += u);
      }
      (s.indicesCount = y), (s.indexType = f), (s.primitiveType = T);
      var l = [],
        _ = e.getUint32(n + r, !0);
      n += Uint32Array.BYTES_PER_ELEMENT;
      for (var p = 0; p < _; p++) {
        var A = X(e, r, t, n),
          c = A.string;
        (n = A.bytesOffset), l.push(c), (s.materialCode = c);
      }
      i.push(s), 0 != n % 4 && (n += 4 - (n % 4));
    }
    return { bytesOffset: n, arrIndexPackage: i };
  }
  function et(t, e, r, a, n, i, E) {
    var s = a,
      f = e.getUint32(s + r, !0);
    return (
      (n.nCompressOptions = f),
      (s += Uint32Array.BYTES_PER_ELEMENT),
      (s =
        (f & v.VertexCompressOption.SVC_Vertex) ==
        v.VertexCompressOption.SVC_Vertex
          ? (function (t, e, r, a, n) {
              var i = a,
                E = e.getUint32(i + r, !0);
              if (
                ((n.verticesCount = E),
                (i += Uint32Array.BYTES_PER_ELEMENT),
                E <= 0)
              )
                return { bytesOffset: i };
              var s = e.getUint16(i + r, !0);
              i += Uint16Array.BYTES_PER_ELEMENT;
              var f = e.getUint16(i + r, !0);
              (f = s * Int16Array.BYTES_PER_ELEMENT),
                (i += Uint16Array.BYTES_PER_ELEMENT);
              var T = e.getFloat32(i + r, !0);
              i += Float32Array.BYTES_PER_ELEMENT;
              var u = new o.Cartesian4();
              (u.x = e.getFloat32(i + r, !0)),
                (i += Float32Array.BYTES_PER_ELEMENT),
                (u.y = e.getFloat32(i + r, !0)),
                (i += Float32Array.BYTES_PER_ELEMENT),
                (u.z = e.getFloat32(i + r, !0)),
                (i += Float32Array.BYTES_PER_ELEMENT),
                (u.w = e.getFloat32(i + r, !0)),
                (i += Float32Array.BYTES_PER_ELEMENT),
                (n.vertCompressConstant = T),
                (n.minVerticesValue = u);
              var d = E * s * Int16Array.BYTES_PER_ELEMENT,
                l = t.subarray(i, i + d);
              i += d;
              var _ = n.vertexAttributes,
                p = n.attrLocation;
              return (
                (p.aPosition = _.length),
                _.push({
                  index: p.aPosition,
                  typedArray: l,
                  componentsPerAttribute: s,
                  componentDatatype: y.ComponentDatatype.SHORT,
                  offsetInBytes: 0,
                  strideInBytes: f,
                  normalize: !1,
                }),
                { bytesOffset: i }
              );
            })(t, e, r, s, n).bytesOffset
          : Z(t, e, r, s, n, E).bytesOffset),
      (s = $(
        0,
        e,
        r,
        (s = K(
          t,
          e,
          r,
          (s =
            (f & v.VertexCompressOption.SVC_Normal) ==
            v.VertexCompressOption.SVC_Normal
              ? (function (t, e, r, a, n) {
                  var i = a,
                    o = e.getUint32(i + r, !0);
                  if (((i += Uint32Array.BYTES_PER_ELEMENT), o <= 0))
                    return { bytesOffset: i };
                  e.getUint16(i + r, !0), (i += Uint16Array.BYTES_PER_ELEMENT);
                  var E = e.getUint16(i + r, !0);
                  i += Uint16Array.BYTES_PER_ELEMENT;
                  var s = 2 * o * Int16Array.BYTES_PER_ELEMENT,
                    f = t.subarray(i, i + s);
                  if (((i += s), !n.ignoreNormal)) {
                    var T = n.vertexAttributes,
                      u = n.attrLocation;
                    (u.aNormal = T.length),
                      T.push({
                        index: u.aNormal,
                        typedArray: f,
                        componentsPerAttribute: 2,
                        componentDatatype: y.ComponentDatatype.SHORT,
                        offsetInBytes: 0,
                        strideInBytes: E,
                        normalize: !1,
                      });
                  }
                  return { bytesOffset: i };
                })(t, e, r, s, n).bytesOffset
              : Q(t, e, r, s, n).bytesOffset),
          n,
        ).bytesOffset),
      ).bytesOffset),
      (s =
        (f & v.VertexCompressOption.SVC_TexutreCoord) ==
        v.VertexCompressOption.SVC_TexutreCoord
          ? (function (t, e, r, a, n) {
              (n.texCoordCompressConstant = []), (n.minTexCoordValue = []);
              var i = r,
                E = t.getUint16(r + a, !0);
              (i += Uint16Array.BYTES_PER_ELEMENT),
                (i += Uint16Array.BYTES_PER_ELEMENT);
              for (var s = 0, f = 0; f < E; f++) {
                var T = t.getUint8(i + a, !0);
                (i += Uint8Array.BYTES_PER_ELEMENT),
                  (i += 3 * Uint8Array.BYTES_PER_ELEMENT);
                var u = t.getUint32(i + a, !0);
                i += Uint32Array.BYTES_PER_ELEMENT;
                var d = t.getUint16(i + a, !0);
                (i += Uint16Array.BYTES_PER_ELEMENT),
                  t.getUint16(i + a, !0),
                  (i += Uint16Array.BYTES_PER_ELEMENT);
                var l = t.getFloat32(i + a, !0);
                (i += Float32Array.BYTES_PER_ELEMENT),
                  n.texCoordCompressConstant.push(l);
                var _ = new o.Cartesian4();
                (_.x = t.getFloat32(i + a, !0)),
                  (i += Float32Array.BYTES_PER_ELEMENT),
                  (_.y = t.getFloat32(i + a, !0)),
                  (i += Float32Array.BYTES_PER_ELEMENT),
                  (_.z = t.getFloat32(i + a, !0)),
                  (i += Float32Array.BYTES_PER_ELEMENT),
                  (_.w = t.getFloat32(i + a, !0)),
                  (i += Float32Array.BYTES_PER_ELEMENT),
                  n.minTexCoordValue.push(_);
                var p = u * d * Int16Array.BYTES_PER_ELEMENT,
                  A = e.subarray(i, i + p),
                  c = (i += p) % 4;
                0 !== c && (i += 4 - c);
                var v = 'aTexCoord' + s,
                  m = n.vertexAttributes,
                  g = n.attrLocation;
                if (
                  ((g[v] = m.length),
                  m.push({
                    index: g[v],
                    typedArray: A,
                    componentsPerAttribute: d,
                    componentDatatype: y.ComponentDatatype.SHORT,
                    offsetInBytes: 0,
                    strideInBytes: d * Int16Array.BYTES_PER_ELEMENT,
                    normalize: !1,
                  }),
                  T)
                ) {
                  p = u * Float32Array.BYTES_PER_ELEMENT;
                  var B = e.subarray(i, i + p);
                  (i += p),
                    (n.texCoordZMatrix = !0),
                    (g[(v = 'aTexCoordZ' + s)] = m.length),
                    m.push({
                      index: g[v],
                      typedArray: B,
                      componentsPerAttribute: 1,
                      componentDatatype: y.ComponentDatatype.FLOAT,
                      offsetInBytes: 0,
                      strideInBytes: Float32Array.BYTES_PER_ELEMENT,
                      normalize: !1,
                    });
                }
                s++;
              }
              return { bytesOffset: i };
            })(e, t, s, r, n).bytesOffset
          : j(e, t, s, r, n, i).bytesOffset),
      (f & v.VertexCompressOption.SVC_TexutreCoordIsW) ==
        v.VertexCompressOption.SVC_TexutreCoordIsW && (n.textureCoordIsW = !0),
      { bytesOffset: (s = J(e, t, s, r, n).bytesOffset) }
    );
  }
  function rt(e, r, n, o, E, s, y, f, T, u) {
    var d = e,
      l = 0,
      _ = r.getUint32(l + n, !0);
    (l += Uint32Array.BYTES_PER_ELEMENT),
      (u = t.defaultValue(u, t.defaultValue.EMPTY_OBJECT));
    for (var p, A, c, m, g, B, b = void 0, L = 0; L < _; L++) {
      var S = X(r, n, d, l),
        M = S.string;
      if (t.defined(T)) {
        var N = t.defaultValue(u[M], i.Matrix4.IDENTITY);
        (b = new i.Matrix4()), i.Matrix4.multiply(T, N, b);
      }
      var h = (l = S.bytesOffset) % 4;
      0 !== h && (l += 4 - h);
      var R;
      if (
        ((R = r.getUint32(l + n, !0)),
        (l += Int32Array.BYTES_PER_ELEMENT),
        ((gt = {
          vertexAttributes: [],
          attrLocation: {},
          instanceCount: 0,
          instanceMode: 0,
          instanceIndex: -1,
        }).ignoreNormal = o.ignoreNormal),
        R == z)
      ) {
        2 <= f && (r.getInt32(l + n, !0), (l += Int32Array.BYTES_PER_ELEMENT));
        var x = {};
        (x.posUniqueID = r.getInt32(l + n, !0)),
          (l += Int32Array.BYTES_PER_ELEMENT),
          (x.normalUniqueID = r.getInt32(l + n, !0)),
          (l += Int32Array.BYTES_PER_ELEMENT),
          (x.colorUniqueID = r.getInt32(l + n, !0)),
          (l += Int32Array.BYTES_PER_ELEMENT),
          (x.secondColorUniqueID = r.getInt32(l + n, !0)),
          (l += Int32Array.BYTES_PER_ELEMENT);
        var Y = r.getUint16(l + n, !0);
        l += Int16Array.BYTES_PER_ELEMENT;
        for (var I = [], F = 0; F < Y; F++) {
          var D = r.getInt32(l + n, !0);
          I.push(D), (l += Int32Array.BYTES_PER_ELEMENT);
        }
        x.texCoordUniqueIDs = I;
        var k = r.getInt32(l + n, !0);
        l += Int32Array.BYTES_PER_ELEMENT;
        var V = [],
          G = {};
        if (0 < k) {
          var q = X(r, n, d, l),
            H = q.string;
          (l = q.bytesOffset), (G.materialCode = H), V.push(G);
        }
        var W = r.getUint32(l + n, !0),
          rt = P(d, (l += Int32Array.BYTES_PER_ELEMENT), l + W);
        0 < k
          ? U.dracoDecodeMesh(C, rt, W, gt, G, x)
          : U.dracoDecodePointCloud(C, rt, W, gt, x),
          (l += W),
          (o[M] = { vertexPackage: gt, arrIndexPackage: V });
      } else {
        var at;
        R == O
          ? ((B = E),
            (l = (S = {
              bytesOffset: J(
                (c = r),
                (A = d),
                j(
                  c,
                  A,
                  $(
                    0,
                    c,
                    (m = n),
                    K(
                      A,
                      c,
                      m,
                      Q(A, c, m, Z(A, c, m, l, (g = gt), b).bytesOffset, g)
                        .bytesOffset,
                      g,
                    ).bytesOffset,
                  ).bytesOffset,
                  m,
                  g,
                  B,
                ).bytesOffset,
                m,
                g,
              ).bytesOffset,
            }).bytesOffset))
          : R == w && (l = (S = et(d, r, n, l, gt, E, b)).bytesOffset),
          0 !== (p = V = (S = tt(d, r, n, l)).arrIndexPackage).length &&
            'ClampGroundAndObjectLinePass' === p[0].materialCode &&
            (gt.clampRegionEdge = !0),
          2 === V.length &&
            13 === V[1].primitiveType &&
            3 <= V[1].indicesCount &&
            (at = v.S3MEdgeProcessor.createEdgeDataByIndices(gt, V[1], s)),
          (l = S.bytesOffset),
          (o[M] = { vertexPackage: gt, arrIndexPackage: V, edgeGeometry: at });
      }
      if (t.defined(y) && y) {
        var nt = r.getUint16(l + n, !0);
        if (((l += Uint16Array.BYTES_PER_ELEMENT), 1 === nt)) {
          var it = r.getUint32(l + n, !0);
          l += Uint32Array.BYTES_PER_ELEMENT;
          var ot,
            Et = r.getUint32(l + n, !0);
          (l += Uint32Array.BYTES_PER_ELEMENT),
            r.getFloat32(l + n, !0),
            (l += Float32Array.BYTES_PER_ELEMENT);
          var st = new Array(it),
            yt = new Array(it),
            ft = new Array(it),
            Tt = new Array(it);
          for (ot = 0; ot < it; ot++) {
            var ut = r.getFloat32(l + n, !0);
            (l += Float32Array.BYTES_PER_ELEMENT), (st[ot] = ut);
            var dt = r.getUint16(l + n, !0);
            (l += Uint16Array.BYTES_PER_ELEMENT), (yt[ot] = dt);
            var lt = r.getUint16(l + n, !0);
            l += Uint16Array.BYTES_PER_ELEMENT;
            for (
              var _t = (ft[ot] = lt) * Et, pt = new Array(_t), At = 0;
              At < _t;
              At++
            ) {
              var ct = r.getFloat32(l + n, !0);
              (l += Float32Array.BYTES_PER_ELEMENT), (pt[At] = ct);
            }
            Tt[ot] = pt;
          }
        }
        var vt = new a.Cartesian3(),
          mt = new a.Cartesian3();
        (vt.x = r.getFloat64(l + n, !0)),
          (l += Float64Array.BYTES_PER_ELEMENT),
          (vt.y = r.getFloat64(l + n, !0)),
          (l += Float64Array.BYTES_PER_ELEMENT),
          (vt.z = r.getFloat64(l + n, !0)),
          (l += Float64Array.BYTES_PER_ELEMENT),
          (mt.x = r.getFloat64(l + n, !0)),
          (l += Float64Array.BYTES_PER_ELEMENT),
          (mt.y = r.getFloat64(l + n, !0)),
          (l += Float64Array.BYTES_PER_ELEMENT),
          (mt.z = r.getFloat64(l + n, !0)),
          (l += Float64Array.BYTES_PER_ELEMENT),
          (o[M].min = vt),
          (o[M].max = mt);
        var gt = o[M].vertexPackage;
        t.defined(gt.instanceBuffer) &&
          2 === f &&
          ((gt.instanceBounds = new Float32Array(6)),
          a.Cartesian3.pack(vt, gt.instanceBounds, 0),
          a.Cartesian3.pack(mt, gt.instanceBounds, 3));
      }
    }
  }
  function at(e, r, a, n, o) {
    var E = {},
      s = [],
      y = new i.Matrix4(),
      f = e;
    o = t.defaultValue(o, {});
    for (var T = 0; T < 16; T++)
      (y[T] = r.getFloat64(a + n, !0)), (a += Float64Array.BYTES_PER_ELEMENT);
    (E.matrix = y), (E.skeletonNames = s);
    var u = r.getUint32(a + n, !0);
    a += Uint32Array.BYTES_PER_ELEMENT;
    for (var d = 0; d < u; d++) {
      var l = X(r, n, f, a),
        _ = l.string;
      (a = l.bytesOffset), s.push(_), (o[_] = y);
    }
    return { byteOffset: a, geode: E };
  }
  function nt(t) {
    var e = t.indexOf('Geometry');
    if (-1 === e) return t;
    var r = t.substring(e, t.length);
    return t.replace(r, '');
  }
  function it(t, e, r, n, o) {
    var E = {},
      s = e.getFloat32(r + n, !0);
    r += Float32Array.BYTES_PER_ELEMENT;
    var y = e.getUint16(r + n, !0);
    (r += Uint16Array.BYTES_PER_ELEMENT), (E.rangeMode = y), (E.rangeList = s);
    var f = new a.Cartesian3();
    (f.x = e.getFloat64(r + n, !0)),
      (r += Float64Array.BYTES_PER_ELEMENT),
      (f.y = e.getFloat64(r + n, !0)),
      (r += Float64Array.BYTES_PER_ELEMENT),
      (f.z = e.getFloat64(r + n, !0)),
      (r += Float64Array.BYTES_PER_ELEMENT);
    var T = e.getFloat64(r + n, !0);
    (r += Float64Array.BYTES_PER_ELEMENT),
      (E.boundingSphere = new i.BoundingSphere(f, T));
    var u = (_ = X(e, n, t, r)).string;
    (r = _.bytesOffset),
      (u = nt((u = u.replace(/(\.s3mblock)|(\.s3mbz)|(\.s3mb)/gi, '')))),
      (E.childTile = u),
      (E.geodes = []);
    var d = e.getUint32(r + n, !0);
    r += Uint32Array.BYTES_PER_ELEMENT;
    for (var l = 0; l < d; l++) {
      var _;
      (r = (_ = at(t, e, r, n, o)).byteOffset), E.geodes.push(_.geode);
    }
    return { pageLOD: E, bytesOffset: r };
  }
  function ot(t, e, r, a) {
    var n = 0,
      i = {},
      o = [],
      E = e.getUint32(n + r, !0);
    n += Uint32Array.BYTES_PER_ELEMENT;
    for (var s = 0; s < E; s++) {
      var y = it(t, e, n, r, a);
      (n = y.bytesOffset), o.push(y.pageLOD);
    }
    return (i.pageLods = o), i;
  }
  function Et(e, r, a, n) {
    for (var i = a.length, o = 0; o < i; o++)
      for (
        var E = a[o],
          s = E.subName.split('_')[0],
          y = E.subVertexOffsetArr,
          f = 0;
        f < y.length;
        f++
      ) {
        var T = y[f],
          u = T.geoName,
          d = T.offset,
          l = T.count,
          p = T.texUnitIndex,
          A = r[u].vertexPackage.verticesCount,
          c = n[u];
        t.defined(c) || (c = n[u] = {});
        var v = c[p];
        t.defined(v) || ((v = c[p] = new Float32Array(A)), _.arrayFill(v, -1));
        var m = t.defined(e) ? e[s] : o;
        _.arrayFill(v, m, d, d + l);
      }
  }
  function st(t, e, r) {
    var a = t.vertexAttributes,
      n = t.attrLocation,
      i = a.length;
    (n[1 === r ? 'instanceId' : 'batchId'] = i),
      a.push({
        index: i,
        typedArray: e,
        componentsPerAttribute: 1,
        componentDatatype: y.ComponentDatatype.FLOAT,
        offsetInBytes: 0,
        strideInBytes: 0,
        instanceDivisor: r,
      });
  }
  function yt(t, e, r, a, n) {
    var i = 0,
      o = t,
      E = e.getUint32(i + r, !0);
    i += Uint32Array.BYTES_PER_ELEMENT;
    for (var s = 0; s < E; s++) {
      var y = X(e, r, o, i),
        f = y.string;
      i = y.bytesOffset;
      var T = e.getUint32(i + r, !0);
      i += Uint32Array.BYTES_PER_ELEMENT;
      var u = {};
      if (((a[f].pickInfo = u), -1 == a[f].vertexPackage.instanceIndex)) {
        for (
          var d = new Float32Array(a[f].vertexPackage.verticesCount), l = 0;
          l < T;
          l++
        ) {
          var p = e.getUint32(i + r, !0);
          i += Uint32Array.BYTES_PER_ELEMENT;
          var c = e.getUint32(i + r, !0);
          i += Uint32Array.BYTES_PER_ELEMENT;
          var v = 0,
            m = 0;
          u[p] = { batchId: l };
          for (var g = 0; g < c; g++)
            (m = e.getUint32(i + r, !0)),
              (i += Uint32Array.BYTES_PER_ELEMENT),
              (v = e.getUint32(i + r, !0)),
              (i += Uint32Array.BYTES_PER_ELEMENT),
              _.arrayFill(d, l, m, m + v);
          (u[p].vertexColorOffset = m), (u[p].vertexCount = v);
        }
        st(a[f].vertexPackage, d, void 0);
      } else {
        var B = a[f].vertexPackage.instanceCount,
          P = a[f].vertexPackage.instanceBuffer,
          U = a[f].vertexPackage.instanceMode,
          b = new Float32Array(B),
          L = [];
        for (l = 0; l < T; l++)
          for (
            p = e.getUint32(i + r, !0),
              L.push(p),
              i += Uint32Array.BYTES_PER_ELEMENT,
              c = e.getUint32(i + r, !0),
              i += Uint32Array.BYTES_PER_ELEMENT,
              g = 0;
            g < c;
            g++
          )
            e.getUint32(i + r, !0),
              (i += Uint32Array.BYTES_PER_ELEMENT),
              3 === n &&
                ((v = e.getUint32(i + r, !0)),
                (i += Uint32Array.BYTES_PER_ELEMENT));
        var S = 17 === U ? 16 : 28;
        for (S *= Float32Array.BYTES_PER_ELEMENT, l = 0; l < B; l++) {
          var M = (b[l] = l) * U * Float32Array.BYTES_PER_ELEMENT + S;
          A.Color.unpack(P, M, k);
          var N = 2 === n ? L[l] : k.red + 256 * k.green + 65536 * k.blue;
          void 0 === u[N] &&
            (u[N] = {
              vertexColorCount: 1,
              instanceIds: [],
              vertexColorOffset: l,
            }),
            u[N].instanceIds.push(l);
        }
        st(a[f].vertexPackage, b, 1);
      }
    }
  }
  function ft(t) {
    return t < 1e-10 && -1e-10 < t;
  }
  function Tt(e, r, a, n, i, o, E, s) {
    var f = new DataView(e),
      T = new Uint8Array(e),
      u = f.getUint32(a, !0);
    a += Uint32Array.BYTES_PER_ELEMENT;
    var d = v.getStringFromTypedArray(T, a, u);
    (d = d.replace(/(\.s3mblock)|(\.s3mbz)|(\.s3mb)/gi, '')), (a += u);
    var l = f.getUint32(a, !0);
    a += Uint32Array.BYTES_PER_ELEMENT;
    for (var _ = 0; _ < l; _++) {
      var p = {},
        A = f.getFloat32(a, !0);
      a += Float32Array.BYTES_PER_ELEMENT;
      var m = f.getUint16(a, !0);
      (a += Uint16Array.BYTES_PER_ELEMENT),
        (p.rangeMode = m),
        (p.rangeList = A);
      var g = {};
      (g.x = f.getFloat64(a, !0)),
        (a += Float64Array.BYTES_PER_ELEMENT),
        (g.y = f.getFloat64(a, !0)),
        (a += Float64Array.BYTES_PER_ELEMENT),
        (g.z = f.getFloat64(a, !0)),
        (a += Float64Array.BYTES_PER_ELEMENT);
      var B = f.getFloat64(a, !0);
      (a += Float64Array.BYTES_PER_ELEMENT),
        (p.boundingSphere = { center: g, radius: B }),
        (u = f.getUint32(a, !0)),
        (a += Uint32Array.BYTES_PER_ELEMENT);
      var P = v.getStringFromTypedArray(T, a, u);
      (a += u),
        (P = nt((P = P.replace(/(\.s3mblock)|(\.s3mbz)|(\.s3mb)/gi, '')))),
        (p.childTile = P);
    }
    var U = {},
      b = f.getFloat32(a, !0);
    (a += Float32Array.BYTES_PER_ELEMENT),
      f.getUint32(a, !0),
      (a += Uint32Array.BYTES_PER_ELEMENT);
    var L = f.getUint32(a, !0);
    a += Uint32Array.BYTES_PER_ELEMENT;
    var S = new Uint8Array(e, a, L),
      M = a + L,
      N = c.pako.inflate(S).buffer;
    s.push(N), (f = new DataView(N)), (T = new Uint8Array(N)), (a = 0);
    var R = f.getUint32(a, !0),
      x = W(f, N, (a += Uint32Array.BYTES_PER_ELEMENT)),
      Y = x.buffer;
    a = x.byteOffset;
    var C = ot(Y, f, x.dataViewByteOffset),
      O = a % 4;
    0 !== O && (a += 4 - O),
      rt((x = W(f, N, a)).buffer, f, x.dataViewByteOffset, U, !1),
      (x = W(f, N, (a = x.byteOffset))).buffer;
    var w = {};
    !(function (e, r, a, n, i, o, E, s, f, T) {
      var u = s,
        d = E.getUint32(u, !0);
      u += Uint32Array.BYTES_PER_ELEMENT;
      for (var l, _, p, A, c, m, g = {}, B = 0; B < d; B++) {
        var P = E.getUint32(u, !0);
        u += Uint32Array.BYTES_PER_ELEMENT;
        var U = v.getStringFromTypedArray(o, u - s, P),
          b = (u += P) % 4;
        0 !== b && (u += 4 - b),
          E.getUint32(u, !0),
          (u += Uint32Array.BYTES_PER_ELEMENT),
          E.getUint8(u, !0),
          (u += Uint8Array.BYTES_PER_ELEMENT);
        var L = E.getUint32(u, !0);
        u += Uint32Array.BYTES_PER_ELEMENT;
        var S = E.getUint32(u, !0);
        u += Uint32Array.BYTES_PER_ELEMENT;
        var M = E.getUint32(u, !0);
        u += Uint32Array.BYTES_PER_ELEMENT;
        var N = E.getUint32(u, !0);
        u += Uint32Array.BYTES_PER_ELEMENT;
        var h,
          R = E.getUint32(u, !0);
        if (((u += Uint32Array.BYTES_PER_ELEMENT), n)) {
          var x = u - s;
          (h = o.subarray(x, x + N)), (u += N);
        }
        var Y = E.getUint32(u, !0);
        u += Uint32Array.BYTES_PER_ELEMENT;
        for (var C = [], D = 0; D < Y; D++) {
          (P = E.getUint32(u, !0)), (u += Uint32Array.BYTES_PER_ELEMENT);
          var O = v.getStringFromTypedArray(o, u - s, P);
          (u += P), C.push(O), (a[O] = U);
        }
        var w = E.getUint32(u, !0);
        u += Uint32Array.BYTES_PER_ELEMENT;
        var z = [];
        for (D = 0; D < w; D++) {
          (P = E.getUint32(u, !0)), (u += Uint32Array.BYTES_PER_ELEMENT);
          var k = v.getStringFromTypedArray(o, u - s, P);
          (u += P), z.push(k);
        }
        var V = E.getUint32(u, !0);
        u += Uint32Array.BYTES_PER_ELEMENT;
        var G = [],
          q = void 0,
          H = U;
        if (n) q = r[U] = {};
        else {
          var W = a[U];
          for (H = W; t.defined(W); ) W = a[(H = W)];
          t.defined(H) && (q = r[H]);
        }
        var X = 0;
        for (D = 0; D < V; D++) {
          (P = E.getUint32(u, !0)), (u += Uint32Array.BYTES_PER_ELEMENT);
          var j = v.getStringFromTypedArray(o, u - s, P);
          if (((u += P), n)) {
            var J = j.split('_')[0];
            t.defined(q[J]) ? X++ : (q[J] = D - X);
          }
          var Z = E.getUint32(u, !0);
          u += Uint32Array.BYTES_PER_ELEMENT;
          var Q = E.getUint32(u, !0);
          u += Uint32Array.BYTES_PER_ELEMENT;
          var K = E.getUint32(u, !0);
          u += Uint32Array.BYTES_PER_ELEMENT;
          var $ = E.getUint32(u, !0);
          u += Uint32Array.BYTES_PER_ELEMENT;
          var tt = E.getUint32(u, !0);
          u += Uint32Array.BYTES_PER_ELEMENT;
          for (var et = [], rt = 0; rt < tt; rt++) {
            (P = E.getUint32(u, !0)), (u += Uint32Array.BYTES_PER_ELEMENT);
            var at = v.getStringFromTypedArray(o, u - s, P);
            u += P;
            var nt = E.getUint32(u, !0);
            u += Uint32Array.BYTES_PER_ELEMENT;
            var it = E.getUint32(u, !0);
            u += Uint32Array.BYTES_PER_ELEMENT;
            var ot = E.getUint32(u, !0);
            (u += Uint32Array.BYTES_PER_ELEMENT),
              et.push({ geoName: at, offset: nt, count: it, texUnitIndex: ot });
          }
          G.push({
            subName: j,
            offsetX: Z,
            offsetY: Q,
            width: K,
            height: $,
            subVertexOffsetArr: et,
          });
        }
        Et(q, e, G, g),
          t.defined(h) &&
            M === v.S3MPixelFormat.CRN_DXT5 &&
            I &&
            (h = F({ data: h }, T).bufferView),
          (f[U] = {
            id: U,
            rootTextureName: H,
            width: L,
            height: S,
            compressType: M,
            size: N,
            format: R,
            textureData: h,
            subTexInfos: G,
            requestNames: z,
          });
      }
      for (var at in g)
        if (g.hasOwnProperty(at)) {
          var st = e[at].vertexPackage,
            yt = g[at];
          for (var ot in yt)
            if (yt.hasOwnProperty(ot)) {
              (_ = yt[ot]),
                (p = ot),
                (c = A = void 0),
                (A = (l = st).vertexAttributes),
                (c = l.attrLocation),
                (m = A.length),
                (c['aTextureBatchId' + p] = m),
                A.push({
                  index: m,
                  typedArray: _,
                  componentsPerAttribute: 1,
                  componentDatatype: y.ComponentDatatype.FLOAT,
                  offsetInBytes: 0,
                  strideInBytes: 0,
                });
            }
        }
    })(
      U,
      n,
      i,
      o,
      0,
      (x = W(f, N, (a = x.byteOffset))).buffer,
      f,
      x.dataViewByteOffset,
      w,
      s,
    ),
      (a = x.byteOffset);
    var z = f.getUint32(a, !0);
    a += Uint32Array.BYTES_PER_ELEMENT;
    var k = T.subarray(a, a + z),
      V = v.getStringFromTypedArray(k);
    a += z;
    var G = JSON.parse(V);
    (R & D) == D &&
      (yt((x = W(f, N, a)).buffer, f, x.dataViewByteOffset, U, b),
      (a = x.byteOffset));
    var q = C.pageLods,
      H = !0;
    for (_ = 0; _ < q.length; _++) {
      var X = q[_];
      H = '' === X.childTile;
      for (var j = X.geodes, J = 0; J < j.length; J++)
        for (var Z = j[J].skeletonNames, Q = 0; Q < Z.length; Q++) {
          var K = Z[Q];
          if (H) {
            var $ = U[K].vertexPackage;
            $.boundingSphere = v.S3MVertexPackage.calcBoundingSphereInWorker(
              1,
              $,
            );
          }
        }
    }
    (E[d] = {
      result: !0,
      groupNode: C,
      geoPackage: U,
      matrials: G,
      texturePackage: w,
      version: h.S3M4,
      rootBatchIdMap: n,
      ancestorMap: i,
    }),
      M < r && Tt(e, r, M, n, i, !1, E, s);
  }
  function ut(e, r) {
    var a = e.buffer,
      n = e.isS3MZ,
      i = e.fileType,
      o = e.supportCompressType,
      E = e.bVolume,
      s = e.isS3MBlock,
      y = e.modelMatrix,
      f = e.materialType,
      T = null,
      u = null,
      d = null;
    if ((E && e.volbuffer.byteLength < 8 && (E = !1), E)) {
      var l = e.volbuffer,
        _ = new Uint8Array(l, 8),
        p = c.pako.inflate(_).buffer,
        A = new Float64Array(p, 0, 1),
        g = new Uint32Array(p, 48, 1);
      if (0 === A[0] || 3200 === g[0] || 3201 === g[0]) {
        var B = 0;
        0 == A[0] && (B = 8), r.push(p);
        var P = new Float64Array(p, B, 6),
          U = P[0],
          b = P[1],
          L = P[2],
          S = P[3],
          M = P[4] < P[5] ? P[4] : P[5],
          N = P[4] > P[5] ? P[4] : P[5];
        u = {
          left: U,
          top: b,
          right: L,
          bottom: S,
          minHeight: M,
          maxHeight: N,
          width: (T = new H(U, S, L, b, M, N)).width,
          length: T.length,
          height: T.height,
        };
        var R = new Uint32Array(p, 48 + B, 7),
          x = R[0],
          Y = R[1],
          I = R[2],
          F = R[3];
        d = {
          nFormat: x,
          nSideBlockCount: Y,
          nBlockLength: I,
          nLength: F,
          nWidth: R[4],
          nHeight: R[5],
          nDepth: R[6],
          imageArray: new Uint8Array(p, 76 + B, F * F * 4),
        };
      }
    }
    var C = 0,
      O = {};
    O.ignoreNormal = e.ignoreNormal;
    var w = e.rootBatchIdMap || {},
      z = e.ancestorMap || {},
      k = {},
      j = new DataView(a),
      J = j.getFloat32(C, !0);
    if (((C += Float32Array.BYTES_PER_ELEMENT), 2.2 < J)) return { result: !1 };
    if (s)
      return (
        j.getUint32(C, !0),
        (C += Uint32Array.BYTES_PER_ELEMENT),
        Tt(a, a.byteLength, C, w, z, e.isRoot, k, r),
        k
      );
    var Z,
      Q = !1;
    if (
      (2 <= J &&
        ((Z = j.getUint32(C, !0)), (C += Uint32Array.BYTES_PER_ELEMENT)),
      ft(J - 1) || ft(J - 2) || (2.09 < J && J < 2.11))
    ) {
      var K = j.getUint32(C, !0);
      C += Uint32Array.BYTES_PER_ELEMENT;
      var $ = new Uint8Array(a, C, K);
      (a =
        !0 === V
          ? (function (t, e) {
              var r = e || 4 * t.length,
                a = m.unzip._malloc(Uint8Array.BYTES_PER_ELEMENT * r),
                n = new Uint8Array(r);
              m.unzip.HEAPU8.set(n, a / Uint8Array.BYTES_PER_ELEMENT);
              var i,
                o = m.unzip._malloc(Uint8Array.BYTES_PER_ELEMENT * t.length);
              for (
                m.unzip.HEAPU8.set(t, o / Uint8Array.BYTES_PER_ELEMENT);
                0 == (i = G(a, r, o, t.length));

              )
                q(a),
                  (r *= 4),
                  (a = m.unzip._malloc(Uint8Array.BYTES_PER_ELEMENT * r)),
                  (n = new Uint8Array(r)),
                  m.unzip.HEAPU8.set(n, a / Uint8Array.BYTES_PER_ELEMENT);
              var E = new Uint8Array(m.unzip.HEAPU8.buffer, a, i);
              n = t = null;
              var s = new Uint8Array(E).buffer;
              return q(a), q(o), s;
            })($, Z)
          : c.pako.inflate($).buffer),
        r.push(a),
        (j = new DataView(a)),
        (C = 0);
    } else
      1.199 < J && J < 1.201
        ? ((K = j.getUint32(C, !0)),
          (C += Uint32Array.BYTES_PER_ELEMENT),
          r.push(a))
        : ((Q = !0),
          (C = 0),
          (K = j.getInt32(C, !0)),
          (C += Int32Array.BYTES_PER_ELEMENT),
          (C += Uint8Array.BYTES_PER_ELEMENT * K),
          n &&
            (j.getUint32(C, !0),
            (C += Uint32Array.BYTES_PER_ELEMENT),
            (_ = new Uint8Array(a, C)),
            (a = c.pako.inflate(_).buffer),
            r.push(a),
            (j = new DataView(a)),
            (C = 0)));
    var tt = j.getUint32(C, !0),
      et = W(j, a, (C += Uint32Array.BYTES_PER_ELEMENT)),
      at = et.buffer;
    C = et.byteOffset;
    var nt = {},
      it = ot(at, j, et.dataViewByteOffset, nt),
      Et = C % 4;
    0 !== Et && (C += 4 - Et);
    var st = 2.09 < J;
    if (
      (rt(
        (et = W(j, a, C)).buffer,
        j,
        et.dataViewByteOffset,
        O,
        Q,
        r,
        st,
        J,
        y,
        nt,
      ),
      (C = et.byteOffset),
      st)
    )
      for (var ut = 0; ut < it.pageLods.length; ut++)
        for (
          var dt = it.pageLods[ut], lt = dt.geodes, _t = 0;
          _t < lt.length;
          _t++
        )
          for (var pt = lt[_t].skeletonNames, At = 0; At < pt.length; At++) {
            var ct = pt[At];
            t.defined(O[ct].max) &&
              (t.defined(dt.max)
                ? ((dt.max.x = Math.max(O[ct].max.x, dt.max.x)),
                  (dt.max.y = Math.max(O[ct].max.y, dt.max.y)),
                  (dt.max.z = Math.max(O[ct].max.z, dt.max.z)),
                  (dt.min.x = Math.min(O[ct].min.x, dt.min.x)),
                  (dt.min.y = Math.min(O[ct].min.y, dt.min.y)),
                  (dt.min.z = Math.min(O[ct].min.z, dt.min.z)))
                : ((dt.max = O[ct].max), (dt.min = O[ct].min)));
          }
    (et = W(j, a, C)).buffer;
    var vt = {};
    !(function (t, e, r, a, n, i) {
      var o = 0,
        E = r.getUint32(o + a, !0);
      o += Uint32Array.BYTES_PER_ELEMENT;
      for (var s = 0; s < E; s++) {
        var y = X(r, a, e, o),
          f = y.string,
          T = (o = y.bytesOffset) % 4;
        0 !== T && (o += 4 - T);
        var u = r.getUint32(o + a, !0);
        o += Uint32Array.BYTES_PER_ELEMENT;
        var d = r.getUint32(o + a, !0);
        o += Uint32Array.BYTES_PER_ELEMENT;
        var l = r.getUint32(o + a, !0);
        o += Uint32Array.BYTES_PER_ELEMENT;
        var _ = r.getUint32(o + a, !0);
        o += Uint32Array.BYTES_PER_ELEMENT;
        var p = r.getUint32(o + a, !0);
        o += Uint32Array.BYTES_PER_ELEMENT;
        var A = r.getUint32(o + a, !0);
        o += Uint32Array.BYTES_PER_ELEMENT;
        var c = e.subarray(o, o + p);
        o += p;
        var m = null;
        _ === v.S3MCompressType.enrS3TCDXTN && 1 != t
          ? (v.DXTTextureDecode.decode(m, d, l, c, A),
            (m =
              A > v.S3MPixelFormat.BGR || A === v.S3MPixelFormat.LUMINANCE_ALPHA
                ? new Uint8Array(d * l * 4)
                : new Uint16Array(d * l)),
            v.DXTTextureDecode.decode(m, d, l, c, A),
            i.push(m.buffer),
            (_ = 0))
          : (m = c),
          (n[f] = {
            id: f,
            width: d,
            height: l,
            compressType: _,
            nFormat: A,
            imageBuffer: m,
            mipmapLevel: u,
          });
      }
    })(
      o,
      (et = W(j, a, (C = et.byteOffset))).buffer,
      j,
      et.dataViewByteOffset,
      vt,
      r,
    ),
      (C = et.byteOffset);
    var mt = j.getUint32(C, !0);
    C += Uint32Array.BYTES_PER_ELEMENT;
    var gt = new Uint8Array(a).subarray(C, C + mt),
      Bt = v.getStringFromTypedArray(gt);
    (C += mt), (Bt = Bt.replace(/\n\0/, ''));
    var Pt = JSON.parse(Bt);
    (tt & D) == D &&
      yt((et = W(j, a, C)).buffer, j, et.dataViewByteOffset, O, J);
    var Ut = it.pageLods,
      bt = !0;
    for (ut = 0; ut < Ut.length; ut++) {
      var Lt = Ut[ut];
      bt = '' === Lt.childTile;
      for (var St = Lt.geodes, Mt = 0; Mt < St.length; Mt++) {
        pt = St[Mt].skeletonNames;
        for (var Nt = 0; Nt < pt.length; Nt++) {
          var ht = pt[Nt];
          if (bt) {
            var Rt = O[ht].vertexPackage;
            Rt.boundingSphere = v.S3MVertexPackage.calcBoundingSphereInWorker(
              i,
              Rt,
            );
          }
        }
      }
    }
    return (
      'BatchPBR' === f &&
        (function (e, r, a) {
          for (var n in (delete e.ignoreNormal, e))
            if (e.hasOwnProperty(n)) {
              var i = e[n],
                o = i.arrIndexPackage;
              if (o.length < 1) continue;
              if (
                1 === o.length ||
                (2 === o.length && 13 === o[1].primitiveType)
              ) {
                var E = i.vertexPackage.attrLocation.aTexCoord0;
                if (void 0 !== E) {
                  var s = i.vertexPackage.vertexAttributes[E],
                    y = new Float32Array(
                      s.typedArray.buffer,
                      s.typedArray.byteOffset,
                      s.typedArray.byteLength / 4,
                    );
                  if (3 === s.componentsPerAttribute && y[2] < 0) continue;
                }
              }
              var f,
                T,
                u = 0,
                d = {},
                l = void 0;
              for (f = 0, T = o.length; f < T; f++)
                13 !== o[f].primitiveType
                  ? (u += o[f].indicesTypedArray.byteLength)
                  : (l = o[f]),
                  0 === f &&
                    ((d.indicesCount = 0),
                    (d.indexType = o[f].indexType),
                    (d.primitiveType = o[f].primitiveType),
                    (d.materialCode = o[f].materialCode));
              d.indicesCount = u / 2;
              var _ = new Uint8Array(u),
                p = 0;
              for (f = 0, T = o.length; f < T; f++)
                13 !== (N = o[f]).primitiveType &&
                  (_.set(
                    N.indicesTypedArray,
                    p,
                    p + N.indicesTypedArray.byteLength,
                  ),
                  (p += N.indicesTypedArray.byteLength));
              (d.indicesTypedArray = _),
                (i.arrIndexPackage = [d]),
                t.defined(l) &&
                  (i.arrIndexPackage.push(l),
                  (i.edgeGeometry = v.S3MEdgeProcessor.createEdgeDataByIndices(
                    i.vertexPackage,
                    l,
                  )));
              var A = 2 * o.length * 4,
                c = new Float32Array(A),
                m = {};
              for (f = 0, T = a.material.length; f < T; f++)
                m[(h = a.material[f].material).id] = h;
              for (f = 0, T = o.length; f < T; f++)
                if ((h = m[(N = o[f]).materialCode])) {
                  var g = h.pbrMetallicRoughness;
                  if (g) {
                    (c[8 * f] = g.metallicFactor),
                      (c[8 * f + 1] = g.roughnessFactor),
                      (c[8 * f + 2] = h.alphaCutoff);
                    var B = '' === h.alphaMode ? 0 : 1,
                      P = 'none' === h.cullMode ? 0 : 1;
                    (c[8 * f + 3] = P | (B << 16)),
                      (c[8 * f + 4] = g.emissiveFactor.x),
                      (c[8 * f + 5] = g.emissiveFactor.y),
                      (c[8 * f + 6] = g.emissiveFactor.z),
                      (c[8 * f + 7] = 0),
                      (h.pbrIndex = f);
                  }
                }
              var U = 'PBRMaterialParam_' + n;
              for (f = 0, T = a.material.length; f < T; f++)
                if ((h = a.material[f].material).id === d.materialCode) {
                  h.textureunitstates.push({
                    textureunitstate: {
                      addressmode: { u: 0, v: 0, w: 0 },
                      filteringoption: 0,
                      filtermax: 2,
                      filtermin: 2,
                      id: U,
                      texmodmatrix: [
                        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
                      ],
                      url: '',
                    },
                  });
                  break;
                }
              var b,
                L,
                S = i.vertexPackage,
                M = S.attrLocation.aTexCoord1;
              if (void 0 !== M) {
                s = S.vertexAttributes[M];
                (b = new Float32Array(2 * S.verticesCount)), (s.typedArray = b);
              } else
                (b = new Float32Array(2 * S.verticesCount)),
                  (M = S.vertexAttributes.length),
                  (S.attrLocation.aTexCoord1 = M),
                  S.vertexAttributes.push({
                    index: M,
                    typedArray: b,
                    componentsPerAttribute: 2,
                    componentDatatype: 5126,
                    offsetInBytes: 0,
                    strideInBytes: 8,
                    normalize: !1,
                  });
              for (
                void 0 !== (M = S.attrLocation.aColor) &&
                  (L = (s = S.vertexAttributes[M]).typedArray),
                  f = 0,
                  T = o.length;
                f < T;
                f++
              ) {
                var N, h;
                if ((h = m[(N = o[f]).materialCode]) && h.pbrMetallicRoughness)
                  for (
                    var R = h.pbrMetallicRoughness.baseColor,
                      x = void 0 !== L,
                      Y = h.pbrIndex,
                      I = ((_ = N.indicesTypedArray), 0),
                      F = (_ =
                        0 === N.indexType
                          ? new Uint16Array(
                              _.buffer,
                              _.byteOffset,
                              _.byteLength / 2,
                            )
                          : new Uint32Array(
                              _.buffer,
                              _.byteOffset,
                              _.byteLength / 4,
                            )).length;
                    I < F;
                    I++
                  ) {
                    var C = _[I];
                    (b[2 * C] = Y),
                      x &&
                        ((L[4 * C] = 255 * R.x),
                        (L[4 * C + 1] = 255 * R.y),
                        (L[4 * C + 2] = 255 * R.z),
                        (L[4 * C + 3] = 255 * R.w));
                  }
              }
              r[U] = {
                id: U,
                width: 2 * o.length,
                height: 1,
                compressType: 0,
                nFormat: 25,
                imageBuffer: c,
                mipmapLevel: 0,
              };
            }
        })(O, vt, Pt),
      {
        result: !0,
        groupNode: it,
        geoPackage: O,
        matrials: Pt,
        texturePackage: vt,
        version: h.S3M4,
        volImageBuffer: d,
        volBounds: u,
      }
    );
  }
  function dt() {
    t.defined(x) &&
      t.defined(C) &&
      ((x.onRuntimeInitialized = function () {
        I = !0;
      }),
      (self.onmessage = l(ut)),
      self.postMessage(!0));
  }
  return function (e) {
    if ('undefined' == typeof WebAssembly)
      return (self.onmessage = l(ut)), void self.postMessage(!0);
    var r = e.data.webAssemblyConfig;
    return t.defined(r)
      ? T.FeatureDetection.isInternetExplorer()
        ? require([
            u.buildModuleUrl(
              'ThirdParty/Workers/ie-webworker-promise-polyfill.js',
            ),
          ], function (e) {
            return (
              (self.Promise = e),
              -1 !== r.modulePath.indexOf('crunch')
                ? require([r.modulePath], function (e) {
                    t.defined(r.wasmBinaryFile) &&
                      (t.defined(e) || (e = self.Module)),
                      (x = e),
                      dt();
                  })
                : require([r.modulePath], function (e) {
                    t.defined(r.wasmBinaryFile)
                      ? (t.defined(e) || (e = self.DracoDecoderModule),
                        e(r).then(function (t) {
                          (C = t), dt();
                        }))
                      : ((C = e()), dt());
                  })
            );
          })
        : -1 !== r.modulePath.indexOf('crunch')
        ? require([r.modulePath], function (e) {
            t.defined(r.wasmBinaryFile) && (t.defined(e) || (e = self.Module)),
              (x = e),
              dt();
          })
        : require([r.modulePath], function (e) {
            t.defined(r.wasmBinaryFile)
              ? (t.defined(e) || (e = self.DracoDecoderModule),
                e(r).then(function (t) {
                  (C = t), dt();
                }))
              : ((C = e()), dt());
          })
      : void 0;
  };
});
