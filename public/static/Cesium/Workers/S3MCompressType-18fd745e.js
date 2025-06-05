define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './Cartesian4-5af5bb24',
  './RuntimeError-ba10bc3e',
  './WebGLConstants-4c11ee5f',
  './ComponentDatatype-5862616f',
  './PrimitiveType-97893bc7',
  './IndexDatatype-9435b55f',
  './BoundingRectangle-3d4f3d01',
], function (e, t, r, n, a, i, o, s, f, u, y, d, c) {
  function p(e, n, a, i) {
    if (!t.defined(e)) throw new r.DeveloperError('uint8Array is required.');
    if (n < 0) throw new r.DeveloperError('byteOffset cannot be negative.');
    if (a < 0) throw new r.DeveloperError('byteLength cannot be negative.');
    if (n + a > e.byteLength)
      throw new r.DeveloperError('sub-region exceeds array bounds.');
    return (
      (n = t.defaultValue(n, 0)),
      (a = t.defaultValue(a, e.byteLength - n)),
      (i = t.defaultValue(i, 'utf-8')),
      (e = e.subarray(n, n + a)),
      p.decode(e, i)
    );
  }
  function l(e, t, r) {
    return t <= e && e <= r;
  }
  (p.decodeWithTextDecoder = function (e, t) {
    return new TextDecoder(t).decode(e);
  }),
    (p.decodeWithFromCharCode = function (e) {
      for (
        var t = '',
          r = (function (e) {
            for (
              var t = 0,
                r = 0,
                n = 0,
                a = 128,
                i = 191,
                o = [],
                f = e.length,
                u = 0;
              u < f;
              ++u
            ) {
              var y = e[u];
              if (0 === n) {
                if (l(y, 0, 127)) {
                  o.push(y);
                  continue;
                }
                if (l(y, 194, 223)) {
                  (n = 1), (t = 31 & y);
                  continue;
                }
                if (l(y, 224, 239)) {
                  224 === y && (a = 160),
                    237 === y && (i = 159),
                    (n = 2),
                    (t = 15 & y);
                  continue;
                }
                if (l(y, 240, 244)) {
                  240 === y && (a = 144),
                    244 === y && (i = 143),
                    (n = 3),
                    (t = 7 & y);
                  continue;
                }
                throw new s.RuntimeError('String decoding failed.');
              }
              l(y, a, i)
                ? ((a = 128),
                  (i = 191),
                  (t = (t << 6) | (63 & y)),
                  ++r === n && (o.push(t), (t = n = r = 0)))
                : ((t = n = r = 0), (a = 128), (i = 191), --u);
            }
            return o;
          })(e),
          n = r.length,
          a = 0;
        a < n;
        ++a
      ) {
        var i = r[a];
        i <= 65535
          ? (t += String.fromCharCode(i))
          : ((i -= 65536),
            (t += String.fromCharCode(55296 + (i >> 10), 56320 + (1023 & i))));
      }
      return t;
    }),
    'undefined' != typeof TextDecoder
      ? (p.decode = p.decodeWithTextDecoder)
      : (p.decode = p.decodeWithFromCharCode);
  var A = Object.freeze({
    LUMINANCE_8: 1,
    LUMINANCE_16: 2,
    ALPHA: 3,
    ALPHA_4_LUMINANCE_4: 4,
    LUMINANCE_ALPHA: 5,
    RGB_565: 6,
    BGR565: 7,
    RGB: 10,
    BGR: 11,
    ARGB: 12,
    ABGR: 13,
    BGRA: 14,
    WEBP: 25,
    RGBA: 28,
    DXT1: 17,
    DXT2: 18,
    DXT3: 19,
    DXT4: 20,
    DXT5: 21,
    CRN_DXT5: 26,
    STANDARD_CRN: 27,
    KTX2: 31,
  });
  function h(e, t, r, n) {
    var a = e | (t << 8),
      i = (a >> 11) & 31,
      o = (a >> 5) & 63,
      s = 31 & a;
    return (
      (r[n + 0] = (i << 3) | (i >> 2)),
      (r[n + 1] = (o << 2) | (o >> 4)),
      (r[n + 2] = (s << 3) | (s >> 2)),
      (r[n + 3] = 255),
      a
    );
  }
  function C(e, t, r, n) {
    var a = 0;
    0 != (6 & n) && (a = 8),
      (function (e, t, r, n) {
        for (
          var a = new Uint8Array(16),
            i = h(t[r + 0], t[r + 1], a, 0),
            o = h(t[r + 2], t[r + 3], a, 4),
            s = 0;
          s < 3;
          s++
        ) {
          var f = a[s],
            u = a[4 + s];
          n && i <= o
            ? ((a[8 + s] = (f + u) / 2), (a[12 + s] = 0))
            : ((a[8 + s] = (2 * f + u) / 3), (a[12 + s] = (f + 2 * u) / 3));
        }
        (a[11] = 255), (a[15] = n && i <= o ? 0 : 255);
        var y = new Uint8Array(16);
        for (s = 0; s < 4; ++s) {
          var d = t[r + 4 + s];
          (y[4 * s + 0] = 3 & d),
            (y[4 * s + 1] = (d >> 2) & 3),
            (y[4 * s + 2] = (d >> 4) & 3),
            (y[4 * s + 3] = (d >> 6) & 3);
        }
        for (s = 0; s < 16; ++s)
          for (var c = 4 * y[s], p = 0; p < 4; ++p) e[4 * s + p] = a[c + p];
      })(e, t, r + a, 0 != (1 & n)),
      0 != (2 & n)
        ? (function (e, t, r) {
            for (var n = 0; n < 8; ++n) {
              var a = bytes[r + n],
                i = 15 & a,
                o = 240 & a;
              (e[8 * n + 3] = i | (i << 4)), (e[8 * n + 7] = o | (o >> 4));
            }
          })(e, 0, r)
        : 0 != (4 & n) &&
          (function (e, t, r) {
            var n = t[r + 0],
              a = t[r + 1],
              i = new Uint8Array(8);
            if (((i[0] = n), (i[1] = a), n <= a)) {
              for (var o = 1; o < 5; ++o) i[1 + o] = ((5 - o) * n + o * a) / 5;
              (i[6] = 0), (i[7] = 255);
            } else for (o = 1; o < 7; ++o) i[1 + o] = ((7 - o) * n + o * a) / 7;
            var s = new Uint8Array(16),
              f = ((r += 2), 0);
            for (o = 0; o < 2; ++o) {
              for (var u = 0, y = 0; y < 3; ++y) u |= t[r++] << (8 * y);
              for (y = 0; y < 8; ++y) {
                var d = (u >> (3 * y)) & 7;
                s[f++] = d;
              }
            }
            for (o = 0; o < 16; ++o) e[4 * o + 3] = i[s[o]];
          })(e, t, r);
  }
  function v(e) {}
  v.decode = function (e, t, r, n, a) {
    if (null != e && null != n && 0 != r && 0 != t) {
      var i = 0;
      1 & (i = a > A.BGR || a === A.LUMINANCE_ALPHA ? 4 : 33) && 32 & i
        ? (function (e, t, r, n) {
            for (
              var a = new Uint16Array(4),
                i = e,
                o = 0,
                s = 0,
                f = 0,
                u = 0,
                y = 0,
                d = 0,
                c = 0,
                p = 0,
                l = 0,
                A = t / 4,
                h = r / 4,
                C = 0;
              C < h;
              C++
            )
              for (var v = 0; v < A; v++)
                (f = 4 * ((h - C) * A + v)),
                  (a[0] = n[f]),
                  (a[1] = n[f + 1]),
                  (u = 31 & a[0]),
                  (y = 2016 & a[0]),
                  (d = 63488 & a[0]),
                  (c = 31 & a[1]),
                  (p = 2016 & a[1]),
                  (l = 63488 & a[1]),
                  (a[2] =
                    ((5 * u + 3 * c) >> 3) |
                    (((5 * y + 3 * p) >> 3) & 2016) |
                    (((5 * d + 3 * l) >> 3) & 63488)),
                  (a[3] =
                    ((5 * c + 3 * u) >> 3) |
                    (((5 * p + 3 * y) >> 3) & 2016) |
                    (((5 * l + 3 * d) >> 3) & 63488)),
                  (o = n[f + 2]),
                  (i[(s = 4 * C * t + 4 * v)] = a[3 & o]),
                  (i[s + 1] = a[(o >> 2) & 3]),
                  (i[s + 2] = a[(o >> 4) & 3]),
                  (i[s + 3] = a[(o >> 6) & 3]),
                  (i[(s += t)] = a[(o >> 8) & 3]),
                  (i[s + 1] = a[(o >> 10) & 3]),
                  (i[s + 2] = a[(o >> 12) & 3]),
                  (i[s + 3] = a[o >> 14]),
                  (o = n[f + 3]),
                  (i[(s += t)] = a[3 & o]),
                  (i[s + 1] = a[(o >> 2) & 3]),
                  (i[s + 2] = a[(o >> 4) & 3]),
                  (i[s + 3] = a[(o >> 6) & 3]),
                  (i[(s += t)] = a[(o >> 8) & 3]),
                  (i[s + 1] = a[(o >> 10) & 3]),
                  (i[s + 2] = a[(o >> 12) & 3]),
                  (i[s + 3] = a[o >> 14]);
          })(e, t, r, n)
        : (function (e, t, r, n, a) {
            for (var i = 0 != (1 & a) ? 8 : 16, o = 0, s = 0; s < r; s += 4)
              for (var f = 0; f < t; f += 4) {
                var u = new Uint8Array(64);
                C(u, n, o, a);
                for (var y = 0, d = 0; d < 4; ++d)
                  for (var c = 0; c < 4; ++c) {
                    var p = f + c,
                      l = s + d;
                    if (p < t && l < r)
                      for (var A = 4 * (t * (r - l) + p), h = 0; h < 4; ++h)
                        e[A++] = u[y++];
                    else y += 4;
                  }
                o += i;
              }
          })(e, t, r, n, i);
    }
  };
  var b = Object.freeze({
      OSGBFile: 0,
      OSGBCacheFile: 1,
      ClampGroundPolygon: 2,
      ClampObjectPolygon: 3,
      ClampGroundLine: 4,
      ClampObjectLine: 5,
      IconPoint: 6,
      Text: 7,
      PointCloudFile: 8,
      ExtendRegion3D: 9,
      ExtendClampPolygonCache: 10,
      PolylineEffect: 11,
      RegionEffect: 12,
      ClampGroundAndObjectLineCache: 13,
      ClampGroundRealtimeRasterCache: 14,
    }),
    m = Object.freeze({
      SVC_Vertex: 1,
      SVC_Normal: 2,
      SVC_VertexColor: 4,
      SVC_SecondColor: 8,
      SVC_TexutreCoord: 16,
      SVC_TexutreCoordIsW: 32,
    });
  function x() {}
  function g(e) {
    var r = new i.BoundingSphere(),
      a = e.instanceBounds;
    if (!t.defined(a)) return r;
    var o = new n.Cartesian3(a[0], a[1], a[2]),
      s = new n.Cartesian3(a[3], a[4], a[5]),
      f = n.Cartesian3.lerp(o, s, 0.5, new n.Cartesian3()),
      u = n.Cartesian3.distance(f, o);
    return (r.center = f), (r.radius = u), r;
  }
  function w(e) {
    var r,
      a,
      o = new i.BoundingSphere(),
      s = new n.Cartesian3(),
      f = e.vertexAttributes[0],
      u = f.componentsPerAttribute,
      y =
        t.defined(e.nCompressOptions) &&
        (e.nCompressOptions & m.SVC_Vertex) === m.SVC_Vertex,
      d = 1;
    y
      ? ((d = e.vertCompressConstant),
        (r = new n.Cartesian3(
          e.minVerticesValue.x,
          e.minVerticesValue.y,
          e.minVerticesValue.z,
        )),
        (a = new Uint16Array(
          f.typedArray.buffer,
          f.typedArray.byteOffset,
          f.typedArray.byteLength / 2,
        )))
      : (a = new Float32Array(
          f.typedArray.buffer,
          f.typedArray.byteOffset,
          f.typedArray.byteLength / 4,
        ));
    for (var c = [], p = 0; p < e.verticesCount; p++)
      n.Cartesian3.fromArray(a, u * p, s),
        y &&
          ((s = n.Cartesian3.multiplyByScalar(s, d, s)),
          (s = n.Cartesian3.add(s, r, s))),
        c.push(n.Cartesian3.clone(s));
    return i.BoundingSphere.fromPoints(c, o), (c.length = 0), o;
  }
  function B(e) {
    var r,
      a,
      o = new i.BoundingSphere(),
      s = new n.Cartesian3(),
      f =
        t.defined(e.nCompressOptions) &&
        (e.nCompressOptions & m.SVC_Vertex) === m.SVC_Vertex,
      u = e.vertexAttributes[0],
      y = u.componentsPerAttribute,
      d = 1;
    f
      ? ((d = e.vertCompressConstant),
        (a = new n.Cartesian3(
          e.minVerticesValue.x,
          e.minVerticesValue.y,
          e.minVerticesValue.z,
        )),
        (r = new Uint16Array(
          u.typedArray.buffer,
          u.typedArray.byteOffset,
          u.typedArray.byteLength / 2,
        )))
      : (r = new Float32Array(
          u.typedArray.buffer,
          u.typedArray.byteOffset,
          u.typedArray.byteLength / 4,
        ));
    for (var c = [], p = 0; p < e.verticesCount; p++)
      n.Cartesian3.fromArray(r, y * p, s),
        f &&
          ((s = n.Cartesian3.multiplyByScalar(s, d, s)),
          (s = n.Cartesian3.add(s, a, s))),
        c.push(n.Cartesian3.clone(s));
    return i.BoundingSphere.fromPoints(c, o), (c.length = 0), o;
  }
  function T(e) {
    var r,
      a,
      s =
        t.defined(e.nCompressOptions) &&
        (e.nCompressOptions & m.SVC_Vertex) === m.SVC_Vertex,
      f = new i.BoundingSphere(),
      u = new n.Cartesian3(),
      y = new n.Cartesian3(),
      d = e.vertexAttributes[0],
      c = d.componentsPerAttribute,
      p = e.attrLocation.aPosition,
      l = e.vertexAttributes[p],
      A = e.attrLocation.aTexCoord5,
      h = e.vertexAttributes[A],
      C = h.componentsPerAttribute;
    s
      ? ((c = 3),
        (C = 3),
        (r = E(e, l)),
        (a = (function (e, t, r) {
          for (
            var n,
              a,
              i,
              s = t.componentsPerAttribute,
              f = e.texCoordCompressConstant[r],
              u = new o.Cartesian4(
                e.minTexCoordValue[r].x,
                e.minTexCoordValue[r].y,
                e.minTexCoordValue[r].z,
                e.minTexCoordValue[r].w,
              ),
              y = new Uint16Array(
                t.typedArray.buffer,
                t.typedArray.byteOffset,
                t.typedArray.byteLength / 2,
              ),
              d = new Float32Array(3 * e.verticesCount),
              c = 0;
            c < e.verticesCount;
            c++
          )
            (n = y[s * c] * f + u.x),
              (a = y[s * c + 1] * f + u.y),
              (i = y[s * c + 2] * f + u.z),
              (d[3 * c] = n),
              (d[3 * c + 1] = a),
              (d[3 * c + 2] = i);
          return d;
        })(e, h, 5)))
      : ((r = new Float32Array(
          d.typedArray.buffer,
          d.typedArray.byteOffset,
          d.typedArray.byteLength / 4,
        )),
        (a = new Float32Array(
          h.typedArray.buffer,
          h.typedArray.byteOffset,
          h.typedArray.byteLength / 4,
        )));
    for (var v = [], b = 0; b < e.verticesCount; b++)
      n.Cartesian3.fromArray(r, c * b, u),
        n.Cartesian3.fromArray(a, C * b, y),
        n.Cartesian3.add(u, y, u),
        v.push(n.Cartesian3.clone(u));
    return i.BoundingSphere.fromPoints(v, f), (v.length = 0), f;
  }
  function D(e) {
    var t = y.PrimitiveType.TRIANGLES;
    switch (e) {
      case 1:
        t = y.PrimitiveType.POINTS;
        break;
      case 2:
        t = y.PrimitiveType.LINES;
        break;
      case 3:
        t = y.PrimitiveType.LINE_STRIP;
        break;
      case 4:
        t = y.PrimitiveType.TRIANGLES;
    }
    return t;
  }
  function E(e, t) {
    for (
      var r,
        a,
        i,
        o = t.componentsPerAttribute,
        s = e.vertCompressConstant,
        f = new n.Cartesian3(
          e.minVerticesValue.x,
          e.minVerticesValue.y,
          e.minVerticesValue.z,
        ),
        u = new Uint16Array(
          t.typedArray.buffer,
          t.typedArray.byteOffset,
          t.typedArray.byteLength / 2,
        ),
        y = new Float32Array(3 * e.verticesCount),
        d = 0;
      d < e.verticesCount;
      d++
    )
      (r = u[o * d] * s + f.x),
        (a = u[o * d + 1] * s + f.y),
        (i = u[o * d + 2] * s + f.z),
        (y[3 * d] = r),
        (y[3 * d + 1] = a),
        (y[3 * d + 2] = i);
    return y;
  }
  function I() {
    return !0;
  }
  (x.calcBoundingSphereInWorker = function (e, r) {
    return r.instanceIndex > -1
      ? g(r)
      : t.defined(r.clampRegionEdge)
      ? T(r)
      : e >= b.ClampGroundPolygon && e <= b.ClampObjectLine
      ? B(r)
      : e == b.ClampGroundAndObjectLineCache
      ? T(r)
      : w(r);
  }),
    (x.calcBoundingSphere = function (e, r, n) {
      var a,
        o = e._fileType;
      return (
        (a =
          r.instanceIndex > -1
            ? g(r)
            : t.defined(r.clampRegionEdge)
            ? T(r)
            : o >= b.ClampGroundPolygon && o <= b.ClampObjectLine
            ? B(r)
            : o == b.ClampGroundAndObjectLineCache
            ? T(r)
            : w(r)),
        i.BoundingSphere.transform(a, n, a),
        a
      );
    }),
    (x.calcBoundingRectangle = function (e, r) {
      var i;
      return (
        e._fileType === b.ClampGroundPolygon &&
          (i = (function (e) {
            var r,
              i,
              o =
                t.defined(e.nCompressOptions) &&
                (e.nCompressOptions & m.SVC_Vertex) === m.SVC_Vertex,
              s = new c.BoundingRectangle(),
              f = e.vertexAttributes[0],
              u = f.componentsPerAttribute,
              y = 1;
            o
              ? ((y = e.vertCompressConstant),
                (i = new n.Cartesian3(
                  e.minVerticesValue.x,
                  e.minVerticesValue.y,
                  e.minVerticesValue.z,
                )),
                (r = new Uint16Array(
                  f.typedArray.buffer,
                  f.typedArray.byteOffset,
                  f.typedArray.byteLength / 2,
                )))
              : (r = new Float32Array(
                  f.typedArray.buffer,
                  f.typedArray.byteOffset,
                  f.typedArray.byteLength / 4,
                ));
            for (var d = [], p = 0; p < e.verticesCount; p++) {
              var l = r[u * p],
                A = r[u * p + 1];
              o && ((l = y * l + i.x), (A = y * A + i.y)),
                d.push(new a.Cartesian2(l, A));
            }
            return c.BoundingRectangle.fromPoints(d, s), (d.length = 0), s;
          })(r)),
        i
      );
    }),
    (x.createEdge = function (e, r) {
      if (!(r.length < 1)) {
        var a = (function (e) {
          for (var t = [], r = e.length, n = 0; n < r; n++) {
            var a = D(e[n].primitiveType);
            (a !== y.PrimitiveType.LINES && a !== y.PrimitiveType.LINE_STRIP) ||
              t.push(e[n]);
          }
          return t;
        })(r);
        if (0 != a.length) {
          var i,
            o = (function (e) {
              for (var t = 0, r = e.length, n = 0; n < r; n++) {
                var a = e[n],
                  i = D(a.primitiveType);
                i == y.PrimitiveType.LINES
                  ? (t += a.indicesCount / 2)
                  : i == y.PrimitiveType.LINE_STRIP && t++;
              }
              return t;
            })(a),
            s = e.attrLocation.aPosition,
            f = e.vertexAttributes[s],
            d =
              t.defined(e.nCompressOptions) &&
              (e.nCompressOptions & m.SVC_Vertex) === m.SVC_Vertex,
            c = f.componentsPerAttribute;
          d
            ? ((c = 3), (i = E(e, f)))
            : (i = new Float32Array(
                f.typedArray.buffer,
                f.typedArray.byteOffset,
                f.typedArray.byteLength / 4,
              ));
          for (
            var p = (function (e) {
                for (var t = 0, r = e.length, n = 0; n < r; n++)
                  t += e[n].indicesCount;
                return t;
              })(a),
              l = (function (e, t, r) {
                for (var a, i = [], o = r.length, s = 0; s < o; s++) {
                  var f,
                    u = r[s];
                  f =
                    0 === u.indexType
                      ? new Uint16Array(
                          u.indicesTypedArray.buffer,
                          u.indicesTypedArray.byteOffset,
                          u.indicesTypedArray.byteLength / 2,
                        )
                      : new Uint32Array(
                          u.indicesTypedArray.buffer,
                          u.indicesTypedArray.byteOffset,
                          u.indicesTypedArray.byteLength / 4,
                        );
                  var d = D(u.primitiveType);
                  if (d == y.PrimitiveType.LINES)
                    for (a = 0; a < u.indicesCount; a += 2) {
                      var c = [],
                        p = new n.Cartesian3();
                      (p.x = e[f[a] * t]),
                        (p.y = e[f[a] * t + 1]),
                        (p.z = e[f[a] * t + 2]),
                        c.push(p);
                      var l = new n.Cartesian3();
                      (l.x = e[f[a + 1] * t]),
                        (l.y = e[f[a + 1] * t + 1]),
                        (l.z = e[f[a + 1] * t + 2]),
                        c.push(l),
                        i.push(c);
                    }
                  else if (d == y.PrimitiveType.LINE_STRIP) {
                    for (c = [], a = 0; a < u.indicesCount; a++) {
                      var A = new n.Cartesian3();
                      (A.x = e[f[a] * t]),
                        (A.y = e[f[a] * t + 1]),
                        (A.z = e[f[a] * t + 2]),
                        c.push(A);
                    }
                    i.push(c);
                  }
                }
                return i;
              })(i, c, a),
              A = 4 * p - 4 * o,
              h = new Float32Array(3 * A),
              C = new Float32Array(3 * A),
              v = new Float32Array(3 * A),
              b = new Int8Array(2 * A),
              x = 0,
              g = 0;
            g < o;
            g++
          ) {
            for (var w = l[g].length, B = 0; B < w; B++) {
              var T = 4 * x - 4 * g,
                I = 3 * T + 12 * B,
                z = l[g][B];
              0 != B &&
                ((h[I - 6] = z.x),
                (h[I - 5] = z.y),
                (h[I - 4] = z.z),
                (h[I - 3] = z.x),
                (h[I - 2] = z.y),
                (h[I - 1] = z.z)),
                B != w - 1 &&
                  ((h[I] = z.x),
                  (h[I + 1] = z.y),
                  (h[I + 2] = z.z),
                  (h[I + 3] = z.x),
                  (h[I + 4] = z.y),
                  (h[I + 5] = z.z));
              var _ = z;
              B + 1 < w && (_ = l[g][B + 1]),
                0 != B &&
                  ((v[I - 6] = _.x),
                  (v[I - 5] = _.y),
                  (v[I - 4] = _.z),
                  (v[I - 3] = _.x),
                  (v[I - 2] = _.y),
                  (v[I - 1] = _.z)),
                B != w - 1 &&
                  ((v[I] = _.x),
                  (v[I + 1] = _.y),
                  (v[I + 2] = _.z),
                  (v[I + 3] = _.x),
                  (v[I + 4] = _.y),
                  (v[I + 5] = _.z));
              var L = z;
              B >= 1 && (L = l[g][B - 1]),
                0 != B &&
                  ((C[I - 6] = L.x),
                  (C[I - 5] = L.y),
                  (C[I - 4] = L.z),
                  (C[I - 3] = L.x),
                  (C[I - 2] = L.y),
                  (C[I - 1] = L.z)),
                B != w - 1 &&
                  ((C[I] = L.x),
                  (C[I + 1] = L.y),
                  (C[I + 2] = L.z),
                  (C[I + 3] = L.x),
                  (C[I + 4] = L.y),
                  (C[I + 5] = L.z)),
                (I = 2 * T + 8 * B),
                0 != B &&
                  ((b[I - 4] = -1),
                  (b[I - 3] = -1),
                  (b[I - 2] = 1),
                  (b[I - 1] = -1)),
                B != w - 1 &&
                  ((b[I] = -1), (b[I + 1] = 1), (b[I + 2] = 1), (b[I + 3] = 1));
            }
            x += l[g].length;
          }
          var S = { vertexAttributes: [], attrLocation: {} },
            V = S.vertexAttributes,
            P = S.attrLocation;
          (S.instanceCount = 0),
            (S.instanceMode = 0),
            (P.aPosition = 0),
            V.push({
              index: P.aPosition,
              typedArray: h,
              componentsPerAttribute: 3,
              componentDatatype: u.ComponentDatatype.FLOAT,
              offsetInBytes: 0,
              strideInBytes: 3 * Float32Array.BYTES_PER_ELEMENT,
              normalize: !1,
            }),
            (P.aNormal = 1),
            V.push({
              index: P.aNormal,
              typedArray: C,
              componentsPerAttribute: 3,
              componentDatatype: u.ComponentDatatype.FLOAT,
              offsetInBytes: 0,
              strideInBytes: 3 * Float32Array.BYTES_PER_ELEMENT,
              normalize: !1,
            }),
            (P.aTexCoord0 = 2),
            V.push({
              index: P.aTexCoord0,
              typedArray: v,
              componentsPerAttribute: 3,
              componentDatatype: u.ComponentDatatype.FLOAT,
              offsetInBytes: 0,
              strideInBytes: 3 * Float32Array.BYTES_PER_ELEMENT,
              normalize: !1,
            }),
            (P.aTexCoord1 = 3),
            V.push({
              index: P.aTexCoord1,
              typedArray: b,
              componentsPerAttribute: 2,
              componentDatatype: u.ComponentDatatype.BYTE,
              offsetInBytes: 0,
              strideInBytes: 2 * Int8Array.BYTES_PER_ELEMENT,
              normalize: !1,
            });
          for (var O = [], R = 0; R < l.length; R++) O.push(l[R].length);
          var N = (function (e, t, r, n) {
            var a,
              i = {};
            (i.indicesCount = 6 * (e - t)),
              (i.indexType = n > 65535 ? 1 : 0),
              (i.primitiveType = y.PrimitiveType.TRIANGLES),
              (a =
                0 === i.indexType
                  ? new Uint16Array(i.indicesCount)
                  : new Uint32Array(i.indicesCount));
            for (var o = 0, s = 0; s < t; s++) {
              for (var f = 0; f < r[s] - 1; f++)
                (a[6 * (o - s + f)] = 4 * (o - s + f)),
                  (a[6 * (o - s + f) + 1] = 4 * (o - s + f) + 2),
                  (a[6 * (o - s + f) + 2] = 4 * (o - s + f) + 1),
                  (a[6 * (o - s + f) + 3] = 4 * (o - s + f) + 1),
                  (a[6 * (o - s + f) + 4] = 4 * (o - s + f) + 2),
                  (a[6 * (o - s + f) + 5] = 4 * (o - s + f) + 3);
              o += r[s];
            }
            return (i.indicesTypedArray = a), i;
          })(p, o, O, A);
          return { vertexPackage: S, indexPackage: N };
        }
      }
    });
  var z = {
    STREAM_DRAW: f.WebGLConstants.STREAM_DRAW,
    STATIC_DRAW: f.WebGLConstants.STATIC_DRAW,
    DYNAMIC_DRAW: f.WebGLConstants.DYNAMIC_DRAW,
    validate: function (e) {
      return e === z.STREAM_DRAW || e === z.STATIC_DRAW || e === z.DYNAMIC_DRAW;
    },
  };
  function _(e) {
    if (
      ((e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)),
      r.Check.defined('options.context', e.context),
      !t.defined(e.typedArray) && !t.defined(e.sizeInBytes))
    )
      throw new r.DeveloperError(
        'Either options.sizeInBytes or options.typedArray is required.',
      );
    if (t.defined(e.typedArray) && t.defined(e.sizeInBytes))
      throw new r.DeveloperError(
        'Cannot pass in both options.sizeInBytes and options.typedArray.',
      );
    if (
      (t.defined(e.typedArray) &&
        (r.Check.typeOf.object('options.typedArray', e.typedArray),
        r.Check.typeOf.number(
          'options.typedArray.byteLength',
          e.typedArray.byteLength,
        )),
      !z.validate(e.usage))
    )
      throw new r.DeveloperError('usage is invalid.');
    var n = e.context._gl,
      a = e.bufferTarget,
      i = e.typedArray,
      o = e.sizeInBytes,
      s = e.usage,
      f = t.defined(i);
    f && (o = i.byteLength),
      r.Check.typeOf.number.greaterThan('sizeInBytes', o, 0);
    var u = n.createBuffer();
    n.bindBuffer(a, u),
      n.bufferData(a, f ? i : o, s),
      n.bindBuffer(a, null),
      (this._gl = n),
      (this._webgl2 = e.context._webgl2),
      (this._bufferTarget = a),
      (this._sizeInBytes = o),
      (this._usage = s),
      (this._buffer = u),
      (this.vertexArrayDestroyable = !0),
      (this.context = e.context),
      (e.context.memorySize += o);
  }
  function L() {}
  (_.createVertexBuffer = function (e) {
    return (
      r.Check.defined('options.context', e.context),
      new _({
        context: e.context,
        bufferTarget: f.WebGLConstants.ARRAY_BUFFER,
        typedArray: e.typedArray,
        sizeInBytes: e.sizeInBytes,
        usage: e.usage,
      })
    );
  }),
    (_.createIndexBuffer = function (e) {
      if (
        (r.Check.defined('options.context', e.context),
        !d.IndexDatatype.validate(e.indexDatatype))
      )
        throw new r.DeveloperError('Invalid indexDatatype.');
      if (
        e.indexDatatype === d.IndexDatatype.UNSIGNED_INT &&
        !e.context.elementIndexUint
      )
        throw new r.DeveloperError(
          'IndexDatatype.UNSIGNED_INT requires OES_element_index_uint, which is not supported on this system.  Check context.elementIndexUint.',
        );
      var t = e.context,
        n = e.indexDatatype,
        a = d.IndexDatatype.getSizeInBytes(n),
        i = new _({
          context: t,
          bufferTarget: f.WebGLConstants.ELEMENT_ARRAY_BUFFER,
          typedArray: e.typedArray,
          sizeInBytes: e.sizeInBytes,
          usage: e.usage,
        }),
        o = i.sizeInBytes / a;
      return (
        Object.defineProperties(i, {
          indexDatatype: {
            get: function () {
              return n;
            },
          },
          bytesPerIndex: {
            get: function () {
              return a;
            },
          },
          numberOfIndices: {
            get: function () {
              return o;
            },
          },
        }),
        i
      );
    }),
    Object.defineProperties(_.prototype, {
      sizeInBytes: {
        get: function () {
          return this._sizeInBytes;
        },
      },
      usage: {
        get: function () {
          return this._usage;
        },
      },
    }),
    (_.prototype._getBuffer = function () {
      return this._buffer;
    }),
    (_.prototype.copyFromArrayView = function (e, n) {
      (n = t.defaultValue(n, 0)),
        r.Check.defined('arrayView', e),
        r.Check.typeOf.number.lessThanOrEquals(
          'offsetInBytes + arrayView.byteLength',
          n + e.byteLength,
          this._sizeInBytes,
        );
      var a = this._gl,
        i = this._bufferTarget;
      a.bindBuffer(i, this._buffer),
        a.bufferSubData(i, n, e),
        a.bindBuffer(i, null);
    }),
    (_.prototype.copyFromBuffer = function (e, n, a, i) {
      if (!this._webgl2)
        throw new r.DeveloperError('A WebGL 2 context is required.');
      if (!t.defined(e))
        throw new r.DeveloperError('readBuffer must be defined.');
      if (!t.defined(i) || i <= 0)
        throw new r.DeveloperError(
          'sizeInBytes must be defined and be greater than zero.',
        );
      if (!t.defined(n) || n < 0 || n + i > e._sizeInBytes)
        throw new r.DeveloperError(
          'readOffset must be greater than or equal to zero and readOffset + sizeInBytes must be less than of equal to readBuffer.sizeInBytes.',
        );
      if (!t.defined(a) || a < 0 || a + i > this._sizeInBytes)
        throw new r.DeveloperError(
          'writeOffset must be greater than or equal to zero and writeOffset + sizeInBytes must be less than of equal to this.sizeInBytes.',
        );
      if (
        this._buffer === e._buffer &&
        ((a >= n && a < n + i) || (n > a && n < a + i))
      )
        throw new r.DeveloperError(
          'When readBuffer is equal to this, the ranges [readOffset + sizeInBytes) and [writeOffset, writeOffset + sizeInBytes) must not overlap.',
        );
      if (
        (this._bufferTarget === f.WebGLConstants.ELEMENT_ARRAY_BUFFER &&
          e._bufferTarget !== f.WebGLConstants.ELEMENT_ARRAY_BUFFER) ||
        (this._bufferTarget !== f.WebGLConstants.ELEMENT_ARRAY_BUFFER &&
          e._bufferTarget === f.WebGLConstants.ELEMENT_ARRAY_BUFFER)
      )
        throw new r.DeveloperError(
          'Can not copy an index buffer into another buffer type.',
        );
      var o = f.WebGLConstants.COPY_READ_BUFFER,
        s = f.WebGLConstants.COPY_WRITE_BUFFER,
        u = this._gl;
      u.bindBuffer(s, this._buffer),
        u.bindBuffer(o, e._buffer),
        u.copyBufferSubData(o, s, n, a, i),
        u.bindBuffer(s, null),
        u.bindBuffer(o, null);
    }),
    (_.prototype.getBufferData = function (e, n, a, i) {
      if (
        ((n = t.defaultValue(n, 0)), (a = t.defaultValue(a, 0)), !this._webgl2)
      )
        throw new r.DeveloperError('A WebGL 2 context is required.');
      if (!t.defined(e)) throw new r.DeveloperError('arrayView is required.');
      var o,
        s,
        u = e.byteLength;
      if (
        (t.defined(i)
          ? ((o = i),
            t.defined(u)
              ? (s = 1)
              : ((u = e.length), (s = e.BYTES_PER_ELEMENT)))
          : t.defined(u)
          ? ((o = u - a), (s = 1))
          : ((o = (u = e.length) - a), (s = e.BYTES_PER_ELEMENT)),
        a < 0 || a > u)
      )
        throw new r.DeveloperError(
          'destinationOffset must be greater than zero and less than the arrayView length.',
        );
      if (a + o > u)
        throw new r.DeveloperError(
          'destinationOffset + length must be less than or equal to the arrayViewLength.',
        );
      if (n < 0 || n > this._sizeInBytes)
        throw new r.DeveloperError(
          'sourceOffset must be greater than zero and less than the buffers size.',
        );
      if (n + o * s > this._sizeInBytes)
        throw new r.DeveloperError(
          'sourceOffset + length must be less than the buffers size.',
        );
      var y = this._gl,
        d = f.WebGLConstants.COPY_READ_BUFFER;
      y.bindBuffer(d, this._buffer),
        y.getBufferSubData(d, n, e, a, i),
        y.bindBuffer(d, null);
    }),
    (_.prototype.isDestroyed = function () {
      return !1;
    }),
    (_.prototype.destroy = function () {
      return (
        this._gl.deleteBuffer(this._buffer),
        (this.context.memorySize -= this.sizeInBytes),
        (function (e, n) {
          function a() {
            throw new r.DeveloperError(n);
          }
          for (var i in ((n = t.defaultValue(
            n,
            'This object was destroyed, i.e., destroy() was called.',
          )),
          e))
            'function' == typeof e[i] && (e[i] = a);
          e.isDestroyed = I;
        })(this)
      );
    }),
    (L.computeNeighbors = function (e, t) {
      for (
        var r = e.length / 3,
          n = new Uint32Array(t + 1),
          a = new Uint32Array(t + 1),
          i = function (e, t) {
            e < t ? n[e + 1]++ : a[t + 1]++;
          },
          o = 0;
        o < r;
        o++
      ) {
        var s = e[3 * o],
          f = e[3 * o + 1],
          u = e[3 * o + 2];
        i(s, f), i(f, u), i(u, s);
      }
      for (o = f = s = 0; o < t; o++)
        (u = n[o + 1]),
          (i = a[o + 1]),
          (n[o + 1] = s),
          (a[o + 1] = f),
          (s += u),
          (f += i);
      var y = new Uint32Array(6 * r),
        d = n[t];
      for (
        i = function (e, t, r) {
          if (e < t) {
            var i = n[e + 1]++;
            (y[2 * i] = t), (y[2 * i + 1] = r);
          } else
            (i = a[t + 1]++),
              (y[2 * d + 2 * i] = e),
              (y[2 * d + 2 * i + 1] = r);
        },
          o = 0;
        o < r;
        o++
      )
        (s = e[3 * o]),
          (f = e[3 * o + 1]),
          (u = e[3 * o + 2]),
          i(s, f, o),
          i(f, u, o),
          i(u, s, o);
      for (
        s = function (e, t) {
          var r = 2 * e;
          for (e = t - e, t = 1; t < e; t++) {
            for (
              var n = y[r + 2 * t], a = y[r + 2 * t + 1], i = t - 1;
              0 <= i && y[r + 2 * i] > n;
              i--
            )
              (y[r + 2 * i + 2] = y[r + 2 * i]),
                (y[r + 2 * i + 3] = y[r + 2 * i + 1]);
            (y[r + 2 * i + 2] = n), (y[r + 2 * i + 3] = a);
          }
        },
          o = 0;
        o < t;
        o++
      )
        s(n[o], n[o + 1]), s(d + a[o], d + a[o + 1]);
      var c = new Int32Array(3 * r),
        p = function (t, r) {
          return t === e[3 * r]
            ? 0
            : t === e[3 * r + 1]
            ? 1
            : t === e[3 * r + 2]
            ? 2
            : -1;
        };
      for (
        r = function (e, t) {
          (e = p(e, t)), (c[3 * t + e] = -1);
        },
          s = function (e, t, r, n) {
            (e = p(e, t)),
              (c[3 * t + e] = n),
              (r = p(r, n)),
              (c[3 * n + r] = t);
          },
          o = 0;
        o < t;
        o++
      ) {
        (f = n[o]), (u = n[o + 1]), (i = a[o]);
        for (var l = a[o + 1]; f < u && i < l; ) {
          var A = y[2 * f],
            h = y[2 * d + 2 * i];
          A === h
            ? (s(o, y[2 * f + 1], h, y[2 * d + 2 * i + 1]), f++, i++)
            : A < h
            ? (r(o, y[2 * f + 1]), f++)
            : (r(h, y[2 * d + 2 * i + 1]), i++);
        }
        for (; f < u; ) r(o, y[2 * f + 1]), f++;
        for (; i < l; ) r((h = y[2 * d + 2 * i]), y[2 * d + 2 * i + 1]), i++;
      }
      return c;
    });
  var S = null;
  function V() {}
  function P(e) {
    return (e * Math.PI) / 180;
  }
  L.deduplicate = function (e, t, r, n, a) {
    void 0 === r && (r = 0),
      void 0 === n && (n = 0),
      void 0 === a && (a = e.byteLength / (4 * t)),
      (e = new Uint32Array(e, n, a * t)),
      (n = new Uint32Array(a));
    var i = Math.floor(1.1 * a) + 1;
    (null == S || S.length < 2 * i) &&
      (S = new Uint32Array(
        (function (e) {
          --e;
          for (var t = 1; 32 > t; t <<= 1) e |= e >> t;
          return e + 1;
        })(2 * i),
      ));
    for (var o = 0; o < 2 * i; o++) S[o] = 0;
    var s = 0,
      f = 0 !== r ? Math.ceil(((7.84 * 1.96) / (r * r)) * r * (1 - r)) : a;
    for (o = 0; o < a; o++) {
      if (o === f) {
        if ((y = 1 - s / o) + 1.96 * Math.sqrt((y * (1 - y)) / o) < r)
          return null;
        f *= 2;
      }
      for (var u, y = o * t, d = (u = 0); d < t; d++)
        u = ((u = (e[y + d] + u) | 0) + (u << 11) + (u >>> 2)) | 0;
      d = (u >>>= 0) % i;
      for (var c = s; 0 !== S[2 * d + 1]; ) {
        if (S[2 * d] === u) {
          var p = S[2 * d + 1] - 1,
            l = p * t;
          e: {
            for (var A = 0; A < t; A++)
              if (e[y + A] !== e[l + A]) {
                l = !1;
                break e;
              }
            l = !0;
          }
          if (l) {
            c = n[p];
            break;
          }
        }
        ++d >= i && (d -= i);
      }
      c === s && ((S[2 * d] = u), (S[2 * d + 1] = o + 1), s++), (n[o] = c);
    }
    if (0 !== r && 1 - s / a < r) return null;
    for (r = new Uint32Array(t * s), o = s = 0; o < a; o++)
      if (n[o] === s) {
        for (i = e, f = o * t, y = r, u = s * t, d = t, c = 0; c < d; c++)
          y[u + c] = i[f + c];
        s++;
      }
    return { buffer: r.buffer, indices: n, uniqueCount: s };
  };
  var O = P(4),
    R = P(35),
    N = Math.cos(R),
    F = Math.cos(O);
  var U = {
      position0: new n.Cartesian3(),
      position1: new n.Cartesian3(),
      faceNormal0: new n.Cartesian3(),
      faceNormal1: new n.Cartesian3(),
      cosAngle: 0,
    },
    M = new n.Cartesian3(),
    G = new n.Cartesian3();
  function W(e, t) {
    var r,
      a = ((r = e.cosAngle), Math.acos(1 < r ? 1 : -1 > r ? -1 : r));
    return (
      (function (e, t, r) {
        var n = r.x - t.x,
          a = r.y - t.y;
        (r = n * n + a * a + (t = r.z - t.z) * t)
          ? ((r = 1 / Math.sqrt(r)),
            (e.x = n * r),
            (e.y = a * r),
            (e.z = t * r))
          : ((e.x = 0), (e.y = 0), (e.z = 0));
      })(G, e.position1, e.position0),
      n.Cartesian3.cross(e.faceNormal0, e.faceNormal1, M),
      a * (0 < n.Cartesian3.dot(M, G) ? -1 : 1) > t
    );
  }
  var k = new n.Cartesian3(),
    q = new n.Cartesian3(),
    Y = new n.Cartesian3();
  function j(e) {
    var t = e.x * e.x + e.y * e.y + e.z * e.z;
    t > 0 && ((t = 1 / Math.sqrt(t)), (e.x *= t), (e.y *= t), (e.z *= t));
  }
  function X(e) {}
  function H(e) {
    if (t.defined(e.cachedSidenessVertexBuffer))
      return e.cachedSidenessVertexBuffer;
    var r = new Float32Array(8),
      n = 0;
    return (
      (r[n++] = 0),
      (r[n++] = 0),
      (r[n++] = 0),
      (r[n++] = 1),
      (r[n++] = 1),
      (r[n++] = 1),
      (r[n++] = 1),
      (r[n++] = 0),
      (e.cachedSidenessVertexBuffer = _.createVertexBuffer({
        context: e,
        typedArray: r,
        usage: z.STATIC_DRAW,
      })),
      (e.cachedSidenessVertexBuffer.vertexArrayDestroyable = !1),
      e.cachedSidenessVertexBuffer
    );
  }
  function Z(e, t) {
    for (
      var r,
        a,
        i,
        o = t.componentsPerAttribute,
        s = e.vertCompressConstant,
        f = new n.Cartesian3(
          e.minVerticesValue.x,
          e.minVerticesValue.y,
          e.minVerticesValue.z,
        ),
        u = new Uint16Array(
          t.typedArray.buffer,
          t.typedArray.byteOffset,
          t.typedArray.byteLength / 2,
        ),
        y = new Float32Array(3 * e.verticesCount),
        d = 0;
      d < e.verticesCount;
      d++
    )
      (r = u[o * d] * s + f.x),
        (a = u[o * d + 1] * s + f.y),
        (i = u[o * d + 2] * s + f.z),
        (y[3 * d] = r),
        (y[3 * d + 1] = a),
        (y[3 * d + 2] = i);
    return y;
  }
  (V.extractEdges = function (e) {
    var t = e.vertices,
      r = e.dim,
      a = U,
      i = a.position0,
      o = a.position1,
      s = a.faceNormal0,
      f = a.faceNormal1,
      u = (function (e) {
        for (
          var t = e.faces.length / 3,
            r = e.vertices,
            a = e.dim,
            i = e.faces,
            o = new Float32Array(3 * t),
            s = 0;
          s < t;
          s++
        ) {
          var f = i[3 * s + 0],
            u = i[3 * s + 1],
            y = i[3 * s + 2];
          (k.x = r[a * f]),
            (k.y = r[a * f + 1]),
            (k.z = r[a * f + 2]),
            (q.x = r[a * u]),
            (q.y = r[a * u + 1]),
            (q.z = r[a * u + 2]),
            (Y.x = r[a * y]),
            (Y.y = r[a * y + 1]),
            (Y.z = r[a * y + 2]),
            n.Cartesian3.subtract(q, k, q),
            n.Cartesian3.subtract(Y, k, Y),
            n.Cartesian3.cross(q, Y, k),
            j(k),
            (o[3 * s + 0] = k.x),
            (o[3 * s + 1] = k.y),
            (o[3 * s + 2] = k.z);
        }
        return o;
      })(e),
      y = (function (e) {
        var t = e.faces.length / 3,
          r = e.faces,
          n = e.neighbors,
          a = 0,
          i = 0;
        for (i = 0; i < t; i++) {
          var o = n[3 * i + 0],
            s = n[3 * i + 1],
            f = n[3 * i + 2],
            u = r[3 * i + 0],
            y = r[3 * i + 1],
            d = r[3 * i + 2];
          (a += -1 === o || u < y ? 1 : 0),
            (a += -1 === s || y < d ? 1 : 0),
            (a += -1 === f || d < u ? 1 : 0);
        }
        var c = new Int32Array(4 * a),
          p = 0;
        for (i = 0; i < t; i++)
          (o = n[3 * i + 0]),
            (s = n[3 * i + 1]),
            (f = n[3 * i + 2]),
            (u = r[3 * i + 0]),
            (y = r[3 * i + 1]),
            (d = r[3 * i + 2]),
            (-1 === o || u < y) &&
              ((c[p++] = u), (c[p++] = y), (c[p++] = i), (c[p++] = o)),
            (-1 === s || y < d) &&
              ((c[p++] = y), (c[p++] = d), (c[p++] = i), (c[p++] = s)),
            (-1 === f || d < u) &&
              ((c[p++] = d), (c[p++] = u), (c[p++] = i), (c[p++] = f));
        return c;
      })(e),
      d = y.length / 4,
      c = new Float32Array(9 * d),
      p = 0,
      l = new Float32Array(12 * d),
      A = 0,
      h = 0,
      C = 0,
      v = (function (e, t) {
        0 === t && ((t = e), (e = 0));
        for (var r = Array(t - e), n = e; n < t; n++) r[n - e] = n;
        return r;
      })(0, d),
      b = new Float32Array(d);
    b.forEach(function (e, a, s) {
      var f = y[4 * a + 0],
        u = y[4 * a + 1];
      (i.x = t[f * r]),
        (i.y = t[f * r + 1]),
        (i.z = t[f * r + 2]),
        (o.x = t[u * r]),
        (o.y = t[u * r + 1]),
        (o.z = t[u * r + 2]),
        (s[a] = n.Cartesian3.distance(i, o));
    }),
      v.sort(function (e, t) {
        return b[t] - b[e];
      });
    for (var m = [], x = [], g = 0; g < d; g++) {
      var w = v[g],
        B = b[w],
        T = y[4 * w + 0],
        D = y[4 * w + 1],
        E = y[4 * w + 2],
        I = y[4 * w + 3],
        z = -1 === I;
      if (
        ((i.x = t[T * r]),
        (i.y = t[T * r + 1]),
        (i.z = t[T * r + 2]),
        (o.x = t[D * r]),
        (o.y = t[D * r + 1]),
        (o.z = t[D * r + 2]),
        z)
      )
        (s.x = u[3 * E]),
          (s.y = u[3 * E + 1]),
          (s.z = u[3 * E + 2]),
          (f.x = s.x),
          (f.y = s.y),
          (f.z = s.z),
          (a.cosAngle = n.Cartesian3.dot(s, f));
      else if (
        ((s.x = u[3 * E]),
        (s.y = u[3 * E + 1]),
        (s.z = u[3 * E + 2]),
        (f.x = u[3 * I]),
        (f.y = u[3 * I + 1]),
        (f.z = u[3 * I + 2]),
        (a.cosAngle = n.Cartesian3.dot(s, f)),
        a.cosAngle > F)
      )
        continue;
      (h += B),
        C++,
        z || a.cosAngle < N
          ? ((c[p++] = a.position0.x),
            (c[p++] = a.position0.y),
            (c[p++] = a.position0.z),
            (c[p++] = a.position1.x),
            (c[p++] = a.position1.y),
            (c[p++] = a.position1.z),
            (c[p++] = a.faceNormal0.x),
            (c[p++] = a.faceNormal0.y),
            (c[p++] = a.faceNormal0.z),
            m.push(B))
          : W(a, O) &&
            ((l[A++] = a.position0.x),
            (l[A++] = a.position0.y),
            (l[A++] = a.position0.z),
            (l[A++] = a.position1.x),
            (l[A++] = a.position1.y),
            (l[A++] = a.position1.z),
            (l[A++] = a.faceNormal0.x),
            (l[A++] = a.faceNormal0.y),
            (l[A++] = a.faceNormal0.z),
            (l[A++] = a.faceNormal1.x),
            (l[A++] = a.faceNormal1.y),
            (l[A++] = a.faceNormal1.z),
            x.push(B));
    }
    (c = c.slice(0, p)), (l = l.slice(0, A));
    var _ = h / C,
      L = m.length,
      S = x.length;
    return {
      regular: { instancesData: c, instanceCount: L, edgeLength: L * _ },
      silhouette: { instancesData: l, instanceCount: S, edgeLength: S * _ },
      averageEdgeLength: _,
    };
  }),
    (X.RegularInstanceStride = 11),
    (X.createEdgeData = function (e, r, n) {
      if (0 == r.length) return null;
      var a,
        i = r[0];
      a =
        0 === i.indexType
          ? new Uint16Array(
              i.indicesTypedArray.buffer,
              i.indicesTypedArray.byteOffset,
              i.indicesTypedArray.byteLength / 2,
            )
          : new Uint32Array(
              i.indicesTypedArray.buffer,
              i.indicesTypedArray.byteOffset,
              i.indicesTypedArray.byteLength / 4,
            );
      var o = X.extractEdgeInformation(e, !1, a),
        s = V.extractEdges(o);
      return (
        t.defined(n) &&
          (t.defined(s.regular.instancesData) &&
            n.push(s.regular.instancesData.buffer),
          t.defined(s.silhouette.instancesData) &&
            n.push(s.silhouette.instancesData.buffer)),
        s
      );
    }),
    (X.createIndexBuffer = function (e) {
      return (
        t.defined(e.cachedSidenessIndexBuffer) ||
          ((e.cachedSidenessIndexBuffer = _.createIndexBuffer({
            context: e,
            typedArray:
              ((r = new Uint16Array(6)),
              (n = 0),
              (r[n++] = 2),
              (r[n++] = 1),
              (r[n++] = 0),
              (r[n++] = 3),
              (r[n++] = 2),
              (r[n++] = 0),
              r),
            usage: z.STATIC_DRAW,
            indexDatatype: d.IndexDatatype.UNSIGNED_SHORT,
          })),
          (e.cachedSidenessIndexBuffer.vertexArrayDestroyable = !1)),
        e.cachedSidenessIndexBuffer
      );
      var r, n;
    }),
    (X.createRegularEdgeAttributes = function (e, r) {
      if (t.defined(r.instancesData) && 0 != r.instancesData.length) {
        var n = {},
          a = [];
        (r.attributeLocations = n), (r.attributes = a);
        var i = _.createVertexBuffer({
          context: e,
          typedArray: r.instancesData,
          usage: z.STATIC_DRAW,
        });
        r.instancesData = null;
        var o = u.ComponentDatatype.getSizeInBytes(u.ComponentDatatype.FLOAT),
          s = H(e),
          f = 0;
        (n.aSideness = f++),
          a.push({
            index: n.aSideness,
            vertexBuffer: s,
            componentsPerAttribute: 2,
            componentDatatype: u.ComponentDatatype.FLOAT,
            offsetInBytes: 0,
            strideInBytes:
              2 * u.ComponentDatatype.getSizeInBytes(u.ComponentDatatype.FLOAT),
            normalize: !1,
          });
        var y = X.RegularInstanceStride,
          d = 0;
        (n.aPosition0 = f++),
          a.push({
            index: n.aPosition0,
            vertexBuffer: i,
            componentsPerAttribute: 3,
            componentDatatype: u.ComponentDatatype.FLOAT,
            normalize: !1,
            offsetInBytes: o * d,
            strideInBytes: o * y,
            instanceDivisor: 1,
          }),
          (d += 3),
          (n.aPosition1 = f++),
          a.push({
            index: n.aPosition1,
            vertexBuffer: i,
            componentsPerAttribute: 3,
            componentDatatype: u.ComponentDatatype.FLOAT,
            normalize: !1,
            offsetInBytes: o * d,
            strideInBytes: o * y,
            instanceDivisor: 1,
          }),
          (d += 3),
          (n.aNormal = f++),
          a.push({
            index: n.aNormal,
            vertexBuffer: i,
            componentsPerAttribute: 3,
            componentDatatype: u.ComponentDatatype.FLOAT,
            normalize: !0,
            offsetInBytes: o * d,
            strideInBytes: o * y,
            instanceDivisor: 1,
          }),
          (d += 3),
          (n.aVariantStroke = f++),
          a.push({
            index: n.aVariantStroke,
            vertexBuffer: i,
            componentsPerAttribute: 1,
            componentDatatype: u.ComponentDatatype.FLOAT,
            normalize: !0,
            offsetInBytes: o * d,
            strideInBytes: o * y,
            instanceDivisor: 1,
          }),
          (d += 1),
          (n.aVariantExtension = f++),
          a.push({
            index: n.aVariantExtension,
            vertexBuffer: i,
            componentsPerAttribute: 1,
            componentDatatype: u.ComponentDatatype.FLOAT,
            normalize: !0,
            offsetInBytes: o * d,
            strideInBytes: o * y,
            instanceDivisor: 1,
          }),
          (d += 1);
      }
    }),
    (X.createSilhouetteEdgeAttributes = function (e, r) {
      if (t.defined(r.instancesData) && 0 != r.instancesData.length) {
        var n = {},
          a = [];
        (r.attributeLocations = n), (r.attributes = a);
        var i = _.createVertexBuffer({
          context: e,
          typedArray: r.instancesData,
          usage: z.STATIC_DRAW,
        });
        r.instancesData = null;
        var o = u.ComponentDatatype.getSizeInBytes(u.ComponentDatatype.FLOAT),
          s = 0;
        (n.aSideness = s++),
          a.push({
            index: n.aSideness,
            vertexBuffer: H(e),
            componentsPerAttribute: 2,
            componentDatatype: u.ComponentDatatype.FLOAT,
            offsetInBytes: 0,
            strideInBytes: 2 * o,
            normalize: !1,
          });
        var f = 14,
          y = 0;
        (n.aPosition0 = s++),
          a.push({
            index: n.aPosition0,
            vertexBuffer: i,
            componentsPerAttribute: 3,
            componentDatatype: u.ComponentDatatype.FLOAT,
            normalize: !1,
            offsetInBytes: o * y,
            strideInBytes: o * f,
            instanceDivisor: 1,
          }),
          (y += 3),
          (n.aPosition1 = s++),
          a.push({
            index: n.aPosition1,
            vertexBuffer: i,
            componentsPerAttribute: 3,
            componentDatatype: u.ComponentDatatype.FLOAT,
            normalize: !1,
            offsetInBytes: o * y,
            strideInBytes: o * f,
            instanceDivisor: 1,
          }),
          (y += 3),
          (n.aNormalA = s++),
          a.push({
            index: n.aNormalA,
            vertexBuffer: i,
            componentsPerAttribute: 3,
            componentDatatype: u.ComponentDatatype.FLOAT,
            normalize: !0,
            offsetInBytes: o * y,
            strideInBytes: o * f,
            instanceDivisor: 1,
          }),
          (y += 3),
          (n.aNormalB = s++),
          a.push({
            index: n.aNormalB,
            vertexBuffer: i,
            componentsPerAttribute: 3,
            componentDatatype: u.ComponentDatatype.FLOAT,
            normalize: !0,
            offsetInBytes: o * y,
            strideInBytes: o * f,
            instanceDivisor: 1,
          }),
          (y += 3),
          (n.aVariantStroke = s++),
          a.push({
            index: n.aVariantStroke,
            vertexBuffer: i,
            componentsPerAttribute: 1,
            componentDatatype: u.ComponentDatatype.FLOAT,
            normalize: !0,
            offsetInBytes: o * y,
            strideInBytes: o * f,
            instanceDivisor: 1,
          }),
          (y += 1),
          (n.aVariantExtension = s++),
          a.push({
            index: n.aVariantExtension,
            vertexBuffer: i,
            componentsPerAttribute: 1,
            componentDatatype: u.ComponentDatatype.FLOAT,
            normalize: !0,
            offsetInBytes: o * y,
            strideInBytes: o * f,
            instanceDivisor: 1,
          }),
          (y += 1);
      }
    }),
    (X.extractEdgeInformation = function (e, r, n) {
      var a,
        i = e.attrLocation.aPosition,
        o = e.vertexAttributes[i],
        s =
          t.defined(e.nCompressOptions) &&
          (e.nCompressOptions & m.SVC_Vertex) === m.SVC_Vertex,
        f = o.componentsPerAttribute;
      s
        ? ((f = 3), (a = Z(e, o)))
        : (a = new Float32Array(
            o.typedArray.buffer,
            o.typedArray.byteOffset,
            o.typedArray.byteLength / 4,
          ));
      var u = a.length / f;
      if (r && n)
        return {
          faces: n,
          neighbors: L.computeNeighbors(n, u),
          vertices: a,
          dim: f,
        };
      var y,
        d = o.typedArray.buffer;
      y = s
        ? a.buffer
        : d.slice(
            o.typedArray.byteOffset,
            o.typedArray.byteOffset + o.typedArray.byteLength,
          );
      var c = L.deduplicate(y, f),
        p = X.selectIndexData(c.indices, n);
      return {
        faces: p,
        neighbors: L.computeNeighbors(p, c.uniqueCount),
        vertices: new Float32Array(c.buffer),
        dim: f,
      };
    }),
    (X.selectIndexData = function (e, t) {
      if (t) {
        t = t.slice();
        for (var r = 0; r < t.length; r++) t[r] = e[t[r]];
        return t;
      }
      return e;
    });
  var J = new n.Cartesian3(),
    K = new n.Cartesian3(),
    Q = new n.Cartesian3(),
    $ = new n.Cartesian3(),
    ee = new n.Cartesian3(),
    te = new n.Cartesian3(),
    re = new n.Cartesian3(),
    ne = new n.Cartesian3();
  function ae(e, r) {
    function n(e, t, r) {
      var n = (48217 * e) % 2147483647,
        a = t + (n / 2147483647) * (r -= t);
      return { seed: n, result: Math.round(a) };
    }
    var a = (function (e, t) {
      var r = new Float32Array(6),
        n = new Uint32Array(r.buffer),
        a = new Uint32Array(1);
      (r[0] = e.x),
        (r[1] = e.y),
        (r[2] = e.z),
        (r[3] = t.x),
        (r[4] = t.y),
        (r[5] = t.z),
        (a[0] = 5381);
      for (var i = 0; i < n.length; i++) a[0] = 31 * a[0] + n[i];
      return a[0];
    })(e, r);
    t.defined(a) || (a = 2147483647 * Math.random());
    var i = n(a, 0, 255);
    a = i.seed;
    i.result;
    a = (i = n(a, 0, 5)).seed;
    var o = i.result;
    (i = (function (e) {
      var t = (48217 * e) % 2147483647;
      return { seed: t, result: t / 2147483646 };
    })(a)),
      (a = i.seed);
    var s = i.result;
    return (
      (s = -(1 - Math.min(s / 0.7, 1)) + Math.max(0, s - 0.7) / (1 - 0.7)),
      {
        variantStroke: o,
        variantExtension: (s =
          255 * (Math.abs(s) ** 1.2 * (0 > s ? -1 : 1) * 0.5 + 0.5)),
      }
    );
  }
  X.createEdgeDataByIndices = function (e, r) {
    var a,
      i,
      o = e.attrLocation.aPosition,
      s = e.vertexAttributes[o],
      f =
        t.defined(e.nCompressOptions) &&
        (e.nCompressOptions & m.SVC_Vertex) === m.SVC_Vertex,
      u = s.componentsPerAttribute;
    f
      ? ((u = 3), (a = Z(e, s)))
      : (a = new Float32Array(
          s.typedArray.buffer,
          s.typedArray.byteOffset,
          s.typedArray.byteLength / 4,
        ));
    for (
      var y = [],
        d = [],
        c = (i =
          0 === r.indexType
            ? new Uint16Array(
                r.indicesTypedArray.buffer,
                r.indicesTypedArray.byteOffset,
                r.indicesTypedArray.byteLength / 2,
              )
            : new Uint32Array(
                r.indicesTypedArray.buffer,
                r.indicesTypedArray.byteOffset,
                r.indicesTypedArray.byteLength / 4,
              )).length,
        p = 0,
        l = 0,
        A = 4 * Math.floor(c / 4);
      l < A;
      l += 4
    ) {
      var h = i[l],
        C = i[l + 1],
        v = i[l + 2],
        b = i[l + 3];
      if (
        ((J.x = a[u * h]),
        (J.y = a[u * h + 1]),
        (J.z = a[u * h + 2]),
        (K.x = a[u * C]),
        (K.y = a[u * C + 1]),
        (K.z = a[u * C + 2]),
        (Q.x = a[u * v]),
        (Q.y = a[u * v + 1]),
        (Q.z = a[u * v + 2]),
        ($.x = a[u * b]),
        ($.y = a[u * b + 1]),
        ($.z = a[u * b + 2]),
        !(
          n.Cartesian3.equals(K, Q) ||
          n.Cartesian3.equals(K, $) ||
          n.Cartesian3.equals(K, J) ||
          n.Cartesian3.equals(Q, J) ||
          n.Cartesian3.equals($, J)
        ))
      ) {
        if (v === b) {
          if (
            (n.Cartesian3.subtract(K, J, ee),
            n.Cartesian3.subtract(Q, J, te),
            n.Cartesian3.cross(ee, te, ee),
            n.Cartesian3.equals(ee, n.Cartesian3.ZERO))
          )
            continue;
          n.Cartesian3.normalize(ee, ee),
            y.push(J.x),
            y.push(J.y),
            y.push(J.z),
            y.push(K.x),
            y.push(K.y),
            y.push(K.z),
            y.push(ee.x),
            y.push(ee.y),
            y.push(ee.z);
          var x = (w = ae(J, K)).variantStroke,
            g = w.variantExtension;
          y.push(x), y.push(g);
        } else {
          if (
            (n.Cartesian3.subtract(K, J, ee),
            n.Cartesian3.subtract(Q, J, te),
            n.Cartesian3.cross(ee, te, ee),
            n.Cartesian3.equals(ee, n.Cartesian3.ZERO))
          )
            continue;
          if (
            (n.Cartesian3.normalize(ee, ee),
            n.Cartesian3.subtract(K, J, re),
            n.Cartesian3.subtract($, J, ne),
            n.Cartesian3.cross(re, ne, re),
            n.Cartesian3.equals(re, n.Cartesian3.ZERO))
          )
            continue;
          n.Cartesian3.normalize(re, re),
            d.push(J.x),
            d.push(J.y),
            d.push(J.z),
            d.push(K.x),
            d.push(K.y),
            d.push(K.z),
            d.push(ee.x),
            d.push(ee.y),
            d.push(ee.z),
            d.push(re.x),
            d.push(re.y),
            d.push(re.z);
          var w;
          (x = (w = ae(J, K)).variantStroke), (g = w.variantExtension);
          d.push(x), d.push(g);
        }
        p += n.Cartesian3.distance(J, K);
      }
    }
    var B = p / (c / 4),
      T = y.length / X.RegularInstanceStride,
      D = d.length / 12;
    return {
      regular: {
        instancesData: new Float32Array(y),
        instanceCount: T,
        edgeLength: T * B,
      },
      silhouette: {
        instancesData: new Float32Array(d),
        instanceCount: D,
        edgeLength: D,
      },
      averageEdgeLength: B,
    };
  };
  var ie = Object.freeze({
    encNONE: 0,
    enrS3TCDXTN: 14,
    enrPVRTPF_PVRTC2: 19,
    enrPVRTPF_PVRTC: 20,
    enrPVRTPF_PVRTC_4bpp: 21,
    enrPVRTPF_ETC1: 22,
  });
  (e.DXTTextureDecode = v),
    (e.S3MCompressType = ie),
    (e.S3MEdgeProcessor = X),
    (e.S3MPixelFormat = A),
    (e.S3MVertexPackage = x),
    (e.VertexCompressOption = m),
    (e.getStringFromTypedArray = p);
});
