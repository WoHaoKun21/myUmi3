define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './Cartesian4-5af5bb24',
  './ComponentDatatype-5862616f',
  './GeometryAttribute-2243653a',
  './PrimitiveType-97893bc7',
  './AttributeCompression-75ce15eb',
  './EncodedCartesian3-87cd0c1f',
  './IndexDatatype-9435b55f',
  './IntersectionTests-dbfba52c',
  './Plane-2bcb9154',
], function (e, t, r, i, a, n, s, o, u, p, d, l, v, f, m, y) {
  var c = new a.Cartesian3(),
    h = new a.Cartesian3(),
    C = new a.Cartesian3(),
    b = {
      calculateACMR: function (e) {
        var i = (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)).indices,
          a = e.maximumIndex,
          n = t.defaultValue(e.cacheSize, 24);
        if (!t.defined(i)) throw new r.DeveloperError('indices is required.');
        var s = i.length;
        if (s < 3 || s % 3 != 0)
          throw new r.DeveloperError(
            'indices length must be a multiple of three.',
          );
        if (a <= 0)
          throw new r.DeveloperError('maximumIndex must be greater than zero.');
        if (n < 3)
          throw new r.DeveloperError('cacheSize must be greater than two.');
        if (!t.defined(a))
          for (var o = (a = 0), u = i[o]; o < s; )
            a < u && (a = u), (u = i[++o]);
        for (var p = [], d = 0; d < a + 1; d++) p[d] = 0;
        for (var l = n + 1, v = 0; v < s; ++v)
          l - p[i[v]] > n && ((p[i[v]] = l), ++l);
        return (l - n + 1) / (s / 3);
      },
      tipsify: function (e) {
        var i,
          a = (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)).indices,
          n = e.maximumIndex,
          s = t.defaultValue(e.cacheSize, 24);
        function o(e, t, r, a, n, s, o) {
          for (var u, p = -1, d = -1, l = 0; l < r.length; ) {
            var v = r[l];
            a[v].numLiveTriangles &&
              ((u = 0),
              n - a[v].timeStamp + 2 * a[v].numLiveTriangles <= t &&
                (u = n - a[v].timeStamp),
              (d < u || -1 === d) && ((d = u), (p = v))),
              ++l;
          }
          return -1 === p
            ? (function (e, t, r, a) {
                for (; 1 <= t.length; ) {
                  var n = t[t.length - 1];
                  if ((t.splice(t.length - 1, 1), 0 < e[n].numLiveTriangles))
                    return n;
                }
                for (; i < a; ) {
                  if (0 < e[i].numLiveTriangles) return ++i - 1;
                  ++i;
                }
                return -1;
              })(a, s, 0, o)
            : p;
        }
        if (!t.defined(a)) throw new r.DeveloperError('indices is required.');
        var u = a.length;
        if (u < 3 || u % 3 != 0)
          throw new r.DeveloperError(
            'indices length must be a multiple of three.',
          );
        if (n <= 0)
          throw new r.DeveloperError('maximumIndex must be greater than zero.');
        if (s < 3)
          throw new r.DeveloperError('cacheSize must be greater than two.');
        var p = 0,
          d = 0,
          l = a[d],
          v = u;
        if (t.defined(n)) p = n + 1;
        else {
          for (; d < v; ) p < l && (p = l), (l = a[++d]);
          if (-1 === p) return 0;
          ++p;
        }
        var f,
          m = [];
        for (f = 0; f < p; f++)
          m[f] = { numLiveTriangles: 0, timeStamp: 0, vertexTriangles: [] };
        for (var y = (d = 0); d < v; )
          m[a[d]].vertexTriangles.push(y),
            ++m[a[d]].numLiveTriangles,
            m[a[d + 1]].vertexTriangles.push(y),
            ++m[a[d + 1]].numLiveTriangles,
            m[a[d + 2]].vertexTriangles.push(y),
            ++m[a[d + 2]].numLiveTriangles,
            ++y,
            (d += 3);
        var c = 0,
          h = s + 1;
        i = 1;
        var C,
          b,
          w,
          g,
          T = [],
          A = [],
          E = 0,
          D = [],
          x = u / 3,
          P = [];
        for (f = 0; f < x; f++) P[f] = !1;
        for (; -1 !== c; ) {
          (T = []), (g = (b = m[c]).vertexTriangles.length);
          for (var S = 0; S < g; ++S)
            if (!P[(y = b.vertexTriangles[S])]) {
              (P[y] = !0), (d = y + y + y);
              for (var I = 0; I < 3; ++I)
                (w = a[d]),
                  T.push(w),
                  A.push(w),
                  (D[E] = w),
                  ++E,
                  --(C = m[w]).numLiveTriangles,
                  h - C.timeStamp > s && ((C.timeStamp = h), ++h),
                  ++d;
            }
          c = o(0, s, T, m, h, A, p);
        }
        return D;
      },
    },
    w = {};
  function g(e, t, r, i, a) {
    (e[t++] = r),
      (e[t++] = i),
      (e[t++] = i),
      (e[t++] = a),
      (e[t++] = a),
      (e[t] = r);
  }
  function T(e) {
    var r = {};
    for (var i in e)
      if (e.hasOwnProperty(i) && t.defined(e[i]) && t.defined(e[i].values)) {
        var a = e[i];
        r[i] = new p.GeometryAttribute({
          componentDatatype: a.componentDatatype,
          componentsPerAttribute: a.componentsPerAttribute,
          normalize: a.normalize,
          values: [],
        });
      }
    return r;
  }
  function A(e, r, i) {
    for (var a in r)
      if (r.hasOwnProperty(a) && t.defined(r[a]) && t.defined(r[a].values))
        for (var n = r[a], s = 0; s < n.componentsPerAttribute; ++s)
          e[a].values.push(n.values[i * n.componentsPerAttribute + s]);
  }
  (w.toWireframe = function (e) {
    if (!t.defined(e)) throw new r.DeveloperError('geometry is required.');
    var i = e.indices;
    if (t.defined(i)) {
      switch (e.primitiveType) {
        case d.PrimitiveType.TRIANGLES:
          e.indices = (function (e) {
            for (
              var t = e.length,
                r = (t / 3) * 6,
                i = f.IndexDatatype.createTypedArray(t, r),
                a = 0,
                n = 0;
              n < t;
              n += 3, a += 6
            )
              g(i, a, e[n], e[n + 1], e[n + 2]);
            return i;
          })(i);
          break;
        case d.PrimitiveType.TRIANGLE_STRIP:
          e.indices = (function (e) {
            var t = e.length;
            if (3 <= t) {
              var r = 6 * (t - 2),
                i = f.IndexDatatype.createTypedArray(t, r);
              g(i, 0, e[0], e[1], e[2]);
              for (var a = 6, n = 3; n < t; ++n, a += 6)
                g(i, a, e[n - 1], e[n], e[n - 2]);
              return i;
            }
            return new Uint16Array();
          })(i);
          break;
        case d.PrimitiveType.TRIANGLE_FAN:
          e.indices = (function (e) {
            if (0 < e.length) {
              for (
                var t = e.length - 1,
                  r = 6 * (t - 1),
                  i = f.IndexDatatype.createTypedArray(t, r),
                  a = e[0],
                  n = 0,
                  s = 1;
                s < t;
                ++s, n += 6
              )
                g(i, n, a, e[s], e[s + 1]);
              return i;
            }
            return new Uint16Array();
          })(i);
          break;
        default:
          throw new r.DeveloperError(
            'geometry.primitiveType must be TRIANGLES, TRIANGLE_STRIP, or TRIANGLE_FAN.',
          );
      }
      e.primitiveType = d.PrimitiveType.LINES;
    }
    return e;
  }),
    (w.createLineSegmentsForVectors = function (e, i, a) {
      if (((i = t.defaultValue(i, 'normal')), !t.defined(e)))
        throw new r.DeveloperError('geometry is required.');
      if (!t.defined(e.attributes.position))
        throw new r.DeveloperError('geometry.attributes.position is required.');
      if (!t.defined(e.attributes[i]))
        throw new r.DeveloperError(
          'geometry.attributes must have an attribute with the same name as the attributeName parameter, ' +
            i +
            '.',
        );
      a = t.defaultValue(a, 1e4);
      for (
        var n,
          o = e.attributes.position.values,
          l = e.attributes[i].values,
          v = o.length,
          f = new Float64Array(2 * v),
          m = 0,
          y = 0;
        y < v;
        y += 3
      )
        (f[m++] = o[y]),
          (f[m++] = o[y + 1]),
          (f[m++] = o[y + 2]),
          (f[m++] = o[y] + l[y] * a),
          (f[m++] = o[y + 1] + l[y + 1] * a),
          (f[m++] = o[y + 2] + l[y + 2] * a);
      var c = e.boundingSphere;
      return (
        t.defined(c) && (n = new s.BoundingSphere(c.center, c.radius + a)),
        new p.Geometry({
          attributes: {
            position: new p.GeometryAttribute({
              componentDatatype: u.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: f,
            }),
          },
          primitiveType: d.PrimitiveType.LINES,
          boundingSphere: n,
        })
      );
    }),
    (w.createAttributeLocations = function (e) {
      if (!t.defined(e)) throw new r.DeveloperError('geometry is required.');
      var i,
        a = [
          'position',
          'positionHigh',
          'positionLow',
          'position3DHigh',
          'position3DLow',
          'position2DHigh',
          'position2DLow',
          'pickColor',
          'normal',
          'st',
          'tangent',
          'bitangent',
          'extrudeDirection',
          'compressedAttributes',
        ],
        n = e.attributes,
        s = {},
        o = 0,
        u = a.length;
      for (i = 0; i < u; ++i) {
        var p = a[i];
        t.defined(n[p]) && (s[p] = o++);
      }
      for (var d in n) n.hasOwnProperty(d) && !t.defined(s[d]) && (s[d] = o++);
      return s;
    }),
    (w.reorderForPreVertexCache = function (e) {
      if (!t.defined(e)) throw new r.DeveloperError('geometry is required.');
      var i = p.Geometry.computeNumberOfVertices(e),
        a = e.indices;
      if (t.defined(a)) {
        for (var n = new Int32Array(i), s = 0; s < i; s++) n[s] = -1;
        for (
          var o,
            d = a,
            l = d.length,
            v = f.IndexDatatype.createTypedArray(i, l),
            m = 0,
            y = 0,
            c = 0;
          m < l;

        )
          -1 !== (o = n[d[m]])
            ? (v[y] = o)
            : ((n[(o = d[m])] = c), (v[y] = c), ++c),
            ++m,
            ++y;
        e.indices = v;
        var h = e.attributes;
        for (var C in h)
          if (
            h.hasOwnProperty(C) &&
            t.defined(h[C]) &&
            t.defined(h[C].values)
          ) {
            for (
              var b = h[C],
                w = b.values,
                g = 0,
                T = b.componentsPerAttribute,
                A = u.ComponentDatatype.createTypedArray(
                  b.componentDatatype,
                  c * T,
                );
              g < i;

            ) {
              var E = n[g];
              if (-1 !== E)
                for (var D = 0; D < T; D++) A[T * E + D] = w[T * g + D];
              ++g;
            }
            b.values = A;
          }
      }
      return e;
    }),
    (w.reorderForPostVertexCache = function (e, i) {
      if (!t.defined(e)) throw new r.DeveloperError('geometry is required.');
      var a = e.indices;
      if (e.primitiveType === d.PrimitiveType.TRIANGLES && t.defined(a)) {
        for (var n = a.length, s = 0, o = 0; o < n; o++) a[o] > s && (s = a[o]);
        e.indices = b.tipsify({ indices: a, maximumIndex: s, cacheSize: i });
      }
      return e;
    }),
    (w.fitToUnsignedShortIndices = function (e) {
      if (!t.defined(e)) throw new r.DeveloperError('geometry is required.');
      if (
        t.defined(e.indices) &&
        e.primitiveType !== d.PrimitiveType.TRIANGLES &&
        e.primitiveType !== d.PrimitiveType.LINES &&
        e.primitiveType !== d.PrimitiveType.POINTS
      )
        throw new r.DeveloperError(
          'geometry.primitiveType must equal to PrimitiveType.TRIANGLES, PrimitiveType.LINES, or PrimitiveType.POINTS.',
        );
      var a = [],
        n = p.Geometry.computeNumberOfVertices(e);
      if (t.defined(e.indices) && n >= i.CesiumMath.SIXTY_FOUR_KILOBYTES) {
        var s,
          o = [],
          u = [],
          l = 0,
          v = T(e.attributes),
          f = e.indices,
          m = f.length;
        e.primitiveType === d.PrimitiveType.TRIANGLES
          ? (s = 3)
          : e.primitiveType === d.PrimitiveType.LINES
          ? (s = 2)
          : e.primitiveType === d.PrimitiveType.POINTS && (s = 1);
        for (var y = 0; y < m; y += s) {
          for (var c = 0; c < s; ++c) {
            var h = f[y + c],
              C = o[h];
            t.defined(C) || ((C = l++), (o[h] = C), A(v, e.attributes, h)),
              u.push(C);
          }
          l + s >= i.CesiumMath.SIXTY_FOUR_KILOBYTES &&
            (a.push(
              new p.Geometry({
                attributes: v,
                indices: u,
                primitiveType: e.primitiveType,
                boundingSphere: e.boundingSphere,
                boundingSphereCV: e.boundingSphereCV,
              }),
            ),
            (o = []),
            (u = []),
            (l = 0),
            (v = T(e.attributes)));
        }
        0 !== u.length &&
          a.push(
            new p.Geometry({
              attributes: v,
              indices: u,
              primitiveType: e.primitiveType,
              boundingSphere: e.boundingSphere,
              boundingSphereCV: e.boundingSphereCV,
            }),
          );
      } else a.push(e);
      return a;
    });
  var E = new a.Cartesian3(),
    D = new a.Cartographic();
  w.projectTo2D = function (e, i, n, o, d) {
    if (!t.defined(e)) throw new r.DeveloperError('geometry is required.');
    if (!t.defined(i)) throw new r.DeveloperError('attributeName is required.');
    if (!t.defined(n))
      throw new r.DeveloperError('attributeName3D is required.');
    if (!t.defined(o))
      throw new r.DeveloperError('attributeName2D is required.');
    if (!t.defined(e.attributes[i]))
      throw new r.DeveloperError(
        'geometry must have attribute matching the attributeName argument: ' +
          i +
          '.',
      );
    if (e.attributes[i].componentDatatype !== u.ComponentDatatype.DOUBLE)
      throw new r.DeveloperError(
        'The attribute componentDatatype must be ComponentDatatype.DOUBLE.',
      );
    for (
      var l = e.attributes[i],
        v = (d = t.defined(d) ? d : new s.GeographicProjection()).ellipsoid,
        f = l.values,
        m = new Float64Array(f.length),
        y = 0,
        c = 0;
      c < f.length;
      c += 3
    ) {
      var h = a.Cartesian3.fromArray(f, c, E),
        C = v.cartesianToCartographic(h, D);
      if (!t.defined(C))
        throw new r.DeveloperError(
          'Could not project point (' +
            h.x +
            ', ' +
            h.y +
            ', ' +
            h.z +
            ') to 2D.',
        );
      var b = d.project(C, E);
      (m[y++] = b.x), (m[y++] = b.y), (m[y++] = b.z);
    }
    return (
      (e.attributes[n] = l),
      (e.attributes[o] = new p.GeometryAttribute({
        componentDatatype: u.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: m,
      })),
      delete e.attributes[i],
      e
    );
  };
  var x = { high: 0, low: 0 };
  w.encodeAttribute = function (e, i, a, n) {
    if (!t.defined(e)) throw new r.DeveloperError('geometry is required.');
    if (!t.defined(i)) throw new r.DeveloperError('attributeName is required.');
    if (!t.defined(a))
      throw new r.DeveloperError('attributeHighName is required.');
    if (!t.defined(n))
      throw new r.DeveloperError('attributeLowName is required.');
    if (!t.defined(e.attributes[i]))
      throw new r.DeveloperError(
        'geometry must have attribute matching the attributeName argument: ' +
          i +
          '.',
      );
    if (e.attributes[i].componentDatatype !== u.ComponentDatatype.DOUBLE)
      throw new r.DeveloperError(
        'The attribute componentDatatype must be ComponentDatatype.DOUBLE.',
      );
    for (
      var s = e.attributes[i],
        o = s.values,
        d = o.length,
        l = new Float32Array(d),
        f = new Float32Array(d),
        m = 0;
      m < d;
      ++m
    )
      v.EncodedCartesian3.encode(o[m], x), (l[m] = x.high), (f[m] = x.low);
    var y = s.componentsPerAttribute;
    return (
      (e.attributes[a] = new p.GeometryAttribute({
        componentDatatype: u.ComponentDatatype.FLOAT,
        componentsPerAttribute: y,
        values: l,
      })),
      (e.attributes[n] = new p.GeometryAttribute({
        componentDatatype: u.ComponentDatatype.FLOAT,
        componentsPerAttribute: y,
        values: f,
      })),
      delete e.attributes[i],
      e
    );
  };
  var P = new a.Cartesian3();
  function S(e, r) {
    if (t.defined(r))
      for (var i = r.values, n = i.length, o = 0; o < n; o += 3)
        a.Cartesian3.unpack(i, o, P),
          s.Matrix4.multiplyByPoint(e, P, P),
          a.Cartesian3.pack(P, i, o);
  }
  function I(e, r) {
    if (t.defined(r))
      for (var i = r.values, n = i.length, o = 0; o < n; o += 3)
        a.Cartesian3.unpack(i, o, P),
          s.Matrix3.multiplyByVector(e, P, P),
          (P = a.Cartesian3.normalize(P, P)),
          a.Cartesian3.pack(P, i, o);
  }
  var N = new s.Matrix4(),
    O = new s.Matrix3();
  w.transformToWorldCoordinates = function (e) {
    if (!t.defined(e)) throw new r.DeveloperError('instance is required.');
    var i = e.modelMatrix;
    if (s.Matrix4.equals(i, s.Matrix4.IDENTITY)) return e;
    var a = e.geometry.attributes;
    S(i, a.position),
      S(i, a.prevPosition),
      S(i, a.nextPosition),
      (t.defined(a.normal) || t.defined(a.tangent) || t.defined(a.bitangent)) &&
        (s.Matrix4.inverse(i, N),
        s.Matrix4.transpose(N, N),
        s.Matrix4.getRotation(N, O),
        I(O, a.normal),
        I(O, a.tangent),
        I(O, a.bitangent));
    var n = e.geometry.boundingSphere;
    return (
      t.defined(n) &&
        (e.geometry.boundingSphere = s.BoundingSphere.transform(n, i, n)),
      (e.modelMatrix = s.Matrix4.clone(s.Matrix4.IDENTITY)),
      e
    );
  };
  var L = new a.Cartesian3();
  function z(e, i) {
    var n,
      o,
      l,
      v,
      m = e.length,
      y = e[0].modelMatrix,
      c = t.defined(e[0][i].indices),
      h = e[0][i].primitiveType;
    for (o = 1; o < m; ++o) {
      if (!s.Matrix4.equals(e[o].modelMatrix, y))
        throw new r.DeveloperError(
          'All instances must have the same modelMatrix.',
        );
      if (t.defined(e[o][i].indices) !== c)
        throw new r.DeveloperError(
          'All instance geometries must have an indices or not have one.',
        );
      if (e[o][i].primitiveType !== h)
        throw new r.DeveloperError(
          'All instance geometries must have the same primitiveType.',
        );
    }
    var C,
      b,
      w,
      g,
      T = (function (e, r) {
        var i,
          a = e.length,
          n = {},
          s = e[0][r].attributes;
        for (i in s)
          if (
            s.hasOwnProperty(i) &&
            t.defined(s[i]) &&
            t.defined(s[i].values)
          ) {
            for (var o = s[i], d = o.values.length, l = !0, v = 1; v < a; ++v) {
              var f = e[v][r].attributes[i];
              if (
                !t.defined(f) ||
                o.componentDatatype !== f.componentDatatype ||
                o.componentsPerAttribute !== f.componentsPerAttribute ||
                o.normalize !== f.normalize
              ) {
                l = !1;
                break;
              }
              d += f.values.length;
            }
            l &&
              (n[i] = new p.GeometryAttribute({
                componentDatatype: o.componentDatatype,
                componentsPerAttribute: o.componentsPerAttribute,
                normalize: o.normalize,
                values: u.ComponentDatatype.createTypedArray(
                  o.componentDatatype,
                  d,
                ),
              }));
          }
        return n;
      })(e, i);
    for (n in T)
      if (T.hasOwnProperty(n))
        for (C = T[n].values, o = v = 0; o < m; ++o)
          for (w = (b = e[o][i].attributes[n].values).length, l = 0; l < w; ++l)
            C[v++] = b[l];
    if (c) {
      var A = 0;
      for (o = 0; o < m; ++o) A += e[o][i].indices.length;
      var E = p.Geometry.computeNumberOfVertices(
          new p.Geometry({
            attributes: T,
            primitiveType: d.PrimitiveType.POINTS,
          }),
        ),
        D = f.IndexDatatype.createTypedArray(E, A),
        x = 0,
        P = 0;
      for (o = 0; o < m; ++o) {
        var S = e[o][i].indices,
          I = S.length;
        for (v = 0; v < I; ++v) D[x++] = P + S[v];
        P += p.Geometry.computeNumberOfVertices(e[o][i]);
      }
      g = D;
    }
    var N,
      O = new a.Cartesian3(),
      z = 0;
    for (o = 0; o < m; ++o) {
      if (((N = e[o][i].boundingSphere), !t.defined(N))) {
        O = void 0;
        break;
      }
      a.Cartesian3.add(N.center, O, O);
    }
    if (t.defined(O))
      for (a.Cartesian3.divideByScalar(O, m, O), o = 0; o < m; ++o) {
        N = e[o][i].boundingSphere;
        var G =
          a.Cartesian3.magnitude(a.Cartesian3.subtract(N.center, O, L)) +
          N.radius;
        z < G && (z = G);
      }
    return new p.Geometry({
      attributes: T,
      indices: g,
      primitiveType: h,
      boundingSphere: t.defined(O) ? new s.BoundingSphere(O, z) : void 0,
    });
  }
  w.combineInstances = function (e) {
    if (!t.defined(e) || e.length < 1)
      throw new r.DeveloperError(
        'instances is required and must have length greater than zero.',
      );
    for (var i = [], a = [], n = e.length, s = 0; s < n; ++s) {
      var o = e[s];
      t.defined(o.geometry)
        ? i.push(o)
        : t.defined(o.westHemisphereGeometry) &&
          t.defined(o.eastHemisphereGeometry) &&
          a.push(o);
    }
    var u = [];
    return (
      0 < i.length && u.push(z(i, 'geometry')),
      0 < a.length &&
        (u.push(z(a, 'westHemisphereGeometry')),
        u.push(z(a, 'eastHemisphereGeometry'))),
      u
    );
  };
  var G = new a.Cartesian3(),
    M = new a.Cartesian3(),
    q = new a.Cartesian3(),
    R = new a.Cartesian3();
  w.computeNormal = function (e) {
    if (!t.defined(e)) throw new r.DeveloperError('geometry is required.');
    if (
      !t.defined(e.attributes.position) ||
      !t.defined(e.attributes.position.values)
    )
      throw new r.DeveloperError(
        'geometry.attributes.position.values is required.',
      );
    if (!t.defined(e.indices))
      throw new r.DeveloperError('geometry.indices is required.');
    if (e.indices.length < 2 || e.indices.length % 3 != 0)
      throw new r.DeveloperError(
        'geometry.indices length must be greater than 0 and be a multiple of 3.',
      );
    if (e.primitiveType !== d.PrimitiveType.TRIANGLES)
      throw new r.DeveloperError(
        'geometry.primitiveType must be PrimitiveType.TRIANGLES.',
      );
    var n,
      s = e.indices,
      o = e.attributes,
      l = o.position.values,
      v = o.position.values.length / 3,
      f = s.length,
      m = new Array(v),
      y = new Array(f / 3),
      c = new Array(f);
    for (n = 0; n < v; n++)
      m[n] = { indexOffset: 0, count: 0, currentCount: 0 };
    var h = 0;
    for (n = 0; n < f; n += 3) {
      var C = s[n],
        b = s[n + 1],
        w = s[n + 2],
        g = 3 * C,
        T = 3 * b,
        A = 3 * w;
      (M.x = l[g]),
        (M.y = l[g + 1]),
        (M.z = l[g + 2]),
        (q.x = l[T]),
        (q.y = l[T + 1]),
        (q.z = l[T + 2]),
        (R.x = l[A]),
        (R.y = l[A + 1]),
        (R.z = l[A + 2]),
        m[C].count++,
        m[b].count++,
        m[w].count++,
        a.Cartesian3.subtract(q, M, q),
        a.Cartesian3.subtract(R, M, R),
        (y[h] = a.Cartesian3.cross(q, R, new a.Cartesian3())),
        h++;
    }
    var E,
      D = 0;
    for (n = 0; n < v; n++) (m[n].indexOffset += D), (D += m[n].count);
    for (n = h = 0; n < f; n += 3) {
      var x = (E = m[s[n]]).indexOffset + E.currentCount;
      (c[x] = h),
        E.currentCount++,
        (c[(x = (E = m[s[n + 1]]).indexOffset + E.currentCount)] = h),
        E.currentCount++,
        (c[(x = (E = m[s[n + 2]]).indexOffset + E.currentCount)] = h),
        E.currentCount++,
        h++;
    }
    var P = new Float32Array(3 * v);
    for (n = 0; n < v; n++) {
      var S = 3 * n;
      if (((E = m[n]), a.Cartesian3.clone(a.Cartesian3.ZERO, G), 0 < E.count)) {
        for (h = 0; h < E.count; h++)
          a.Cartesian3.add(G, y[c[E.indexOffset + h]], G);
        a.Cartesian3.equalsEpsilon(
          a.Cartesian3.ZERO,
          G,
          i.CesiumMath.EPSILON10,
        ) && a.Cartesian3.clone(y[c[E.indexOffset]], G);
      }
      a.Cartesian3.equalsEpsilon(
        a.Cartesian3.ZERO,
        G,
        i.CesiumMath.EPSILON10,
      ) && (G.z = 1),
        a.Cartesian3.normalize(G, G),
        (P[S] = G.x),
        (P[S + 1] = G.y),
        (P[S + 2] = G.z);
    }
    return (
      (e.attributes.normal = new p.GeometryAttribute({
        componentDatatype: u.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: P,
      })),
      e
    );
  };
  var B = new a.Cartesian3(),
    V = new a.Cartesian3(),
    k = new a.Cartesian3();
  w.computeTangentAndBitangent = function (e) {
    if (!t.defined(e)) throw new r.DeveloperError('geometry is required.');
    var i = e.attributes,
      n = e.indices;
    if (!t.defined(i.position) || !t.defined(i.position.values))
      throw new r.DeveloperError(
        'geometry.attributes.position.values is required.',
      );
    if (!t.defined(i.normal) || !t.defined(i.normal.values))
      throw new r.DeveloperError(
        'geometry.attributes.normal.values is required.',
      );
    if (!t.defined(i.st) || !t.defined(i.st.values))
      throw new r.DeveloperError('geometry.attributes.st.values is required.');
    if (!t.defined(n))
      throw new r.DeveloperError('geometry.indices is required.');
    if (n.length < 2 || n.length % 3 != 0)
      throw new r.DeveloperError(
        'geometry.indices length must be greater than 0 and be a multiple of 3.',
      );
    if (e.primitiveType !== d.PrimitiveType.TRIANGLES)
      throw new r.DeveloperError(
        'geometry.primitiveType must be PrimitiveType.TRIANGLES.',
      );
    var s,
      o,
      l,
      v,
      f = e.attributes.position.values,
      m = e.attributes.normal.values,
      y = e.attributes.st.values,
      c = e.attributes.position.values.length / 3,
      h = n.length,
      C = new Array(3 * c);
    for (s = 0; s < C.length; s++) C[s] = 0;
    for (s = 0; s < h; s += 3) {
      var b = n[s],
        w = n[s + 1],
        g = n[s + 2];
      (l = 3 * w), (v = 3 * g);
      var T = 2 * b,
        A = 2 * w,
        E = 2 * g,
        D = f[(o = 3 * b)],
        x = f[o + 1],
        P = f[o + 2],
        S = y[T],
        I = y[T + 1],
        N = y[A + 1] - I,
        O = y[E + 1] - I,
        L = 1 / ((y[A] - S) * O - (y[E] - S) * N),
        z = (O * (f[l] - D) - N * (f[v] - D)) * L,
        G = (O * (f[l + 1] - x) - N * (f[v + 1] - x)) * L,
        M = (O * (f[l + 2] - P) - N * (f[v + 2] - P)) * L;
      (C[o] += z),
        (C[o + 1] += G),
        (C[o + 2] += M),
        (C[l] += z),
        (C[l + 1] += G),
        (C[l + 2] += M),
        (C[v] += z),
        (C[v + 1] += G),
        (C[v + 2] += M);
    }
    var q = new Float32Array(3 * c),
      R = new Float32Array(3 * c);
    for (s = 0; s < c; s++) {
      (l = 1 + (o = 3 * s)), (v = o + 2);
      var F = a.Cartesian3.fromArray(m, o, B),
        _ = a.Cartesian3.fromArray(C, o, k),
        U = a.Cartesian3.dot(F, _);
      a.Cartesian3.multiplyByScalar(F, U, V),
        a.Cartesian3.normalize(a.Cartesian3.subtract(_, V, _), _),
        (q[o] = _.x),
        (q[l] = _.y),
        (q[v] = _.z),
        a.Cartesian3.normalize(a.Cartesian3.cross(F, _, _), _),
        (R[o] = _.x),
        (R[l] = _.y),
        (R[v] = _.z);
    }
    return (
      (e.attributes.tangent = new p.GeometryAttribute({
        componentDatatype: u.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: q,
      })),
      (e.attributes.bitangent = new p.GeometryAttribute({
        componentDatatype: u.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: R,
      })),
      e
    );
  };
  var F = new n.Cartesian2(),
    _ = new a.Cartesian3(),
    U = new a.Cartesian3(),
    Y = new a.Cartesian3(),
    Z = new n.Cartesian2();
  function H(e, t) {
    Math.abs(e.y) < i.CesiumMath.EPSILON6 &&
      (e.y = t ? -i.CesiumMath.EPSILON6 : i.CesiumMath.EPSILON6);
  }
  w.compressVertices = function (e) {
    if (!t.defined(e)) throw new r.DeveloperError('geometry is required.');
    var i,
      s,
      o = e.attributes.extrudeDirection;
    if (t.defined(o)) {
      var d = o.values;
      s = d.length / 3;
      var v = new Float32Array(2 * s),
        f = 0;
      for (i = 0; i < s; ++i)
        a.Cartesian3.fromArray(d, 3 * i, _),
          a.Cartesian3.equals(_, a.Cartesian3.ZERO)
            ? (f += 2)
            : ((Z = l.AttributeCompression.octEncodeInRange(_, 65535, Z)),
              (v[f++] = Z.x),
              (v[f++] = Z.y));
      return (
        (e.attributes.compressedAttributes = new p.GeometryAttribute({
          componentDatatype: u.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: v,
        })),
        delete e.attributes.extrudeDirection,
        e
      );
    }
    var m = e.attributes.normal,
      y = e.attributes.st,
      c = t.defined(m),
      h = t.defined(y);
    if (!c && !h) return e;
    var C,
      b,
      w,
      g,
      T = e.attributes.tangent,
      A = e.attributes.bitangent,
      E = t.defined(T),
      D = t.defined(A);
    c && (C = m.values),
      h && (b = y.values),
      E && (w = T.values),
      D && (g = A.values);
    var x = (s = (c ? C.length : b.length) / (c ? 3 : 2)),
      P = h && c ? 2 : 1;
    P += E || D ? 1 : 0;
    var S = new Float32Array((x *= P)),
      I = 0;
    for (i = 0; i < s; ++i) {
      h &&
        (n.Cartesian2.fromArray(b, 2 * i, F),
        (S[I++] = l.AttributeCompression.compressTextureCoordinates(F)));
      var N = 3 * i;
      c && t.defined(w) && t.defined(g)
        ? (a.Cartesian3.fromArray(C, N, _),
          a.Cartesian3.fromArray(w, N, U),
          a.Cartesian3.fromArray(g, N, Y),
          l.AttributeCompression.octPack(_, U, Y, F),
          (S[I++] = F.x),
          (S[I++] = F.y))
        : (c &&
            (a.Cartesian3.fromArray(C, N, _),
            (S[I++] = l.AttributeCompression.octEncodeFloat(_))),
          E &&
            (a.Cartesian3.fromArray(w, N, _),
            (S[I++] = l.AttributeCompression.octEncodeFloat(_))),
          D &&
            (a.Cartesian3.fromArray(g, N, _),
            (S[I++] = l.AttributeCompression.octEncodeFloat(_))));
    }
    return (
      (e.attributes.compressedAttributes = new p.GeometryAttribute({
        componentDatatype: u.ComponentDatatype.FLOAT,
        componentsPerAttribute: P,
        values: S,
      })),
      c && delete e.attributes.normal,
      h && delete e.attributes.st,
      D && delete e.attributes.bitangent,
      E && delete e.attributes.tangent,
      e
    );
  };
  var W = new a.Cartesian3();
  function X(e, t, r, i) {
    a.Cartesian3.add(
      e,
      a.Cartesian3.multiplyByScalar(
        a.Cartesian3.subtract(t, e, W),
        e.y / (e.y - t.y),
        W,
      ),
      r,
    ),
      a.Cartesian3.clone(r, i),
      H(r, !0),
      H(i, !1);
  }
  var j = new a.Cartesian3(),
    J = new a.Cartesian3(),
    K = new a.Cartesian3(),
    Q = new a.Cartesian3(),
    $ = { positions: new Array(7), indices: new Array(9) };
  function ee(e, t, r) {
    if (!(0 <= e.x || 0 <= t.x || 0 <= r.x)) {
      !(function (e, t, r) {
        if (0 !== e.y && 0 !== t.y && 0 !== r.y)
          return H(e, e.y < 0), H(t, t.y < 0), H(r, r.y < 0);
        var a = Math.abs(e.y),
          n = Math.abs(t.y),
          s = Math.abs(r.y),
          o =
            (n < a
              ? s < a
                ? i.CesiumMath.sign(e.y)
                : i.CesiumMath.sign(r.y)
              : s < n
              ? i.CesiumMath.sign(t.y)
              : i.CesiumMath.sign(r.y)) < 0;
        H(e, o), H(t, o), H(r, o);
      })(e, t, r);
      var a = e.y < 0,
        n = t.y < 0,
        s = r.y < 0,
        o = 0;
      (o += a ? 1 : 0), (o += n ? 1 : 0);
      var u = $.indices;
      1 === (o += s ? 1 : 0)
        ? ((u[1] = 3),
          (u[2] = 4),
          (u[5] = 6),
          (u[7] = 6),
          (u[8] = 5),
          a
            ? (X(e, t, j, K),
              X(e, r, J, Q),
              (u[0] = 0),
              (u[3] = 1),
              (u[4] = 2),
              (u[6] = 1))
            : n
            ? (X(t, r, j, K),
              X(t, e, J, Q),
              (u[0] = 1),
              (u[3] = 2),
              (u[4] = 0),
              (u[6] = 2))
            : s &&
              (X(r, e, j, K),
              X(r, t, J, Q),
              (u[0] = 2),
              (u[3] = 0),
              (u[4] = 1),
              (u[6] = 0)))
        : 2 === o &&
          ((u[2] = 4),
          (u[4] = 4),
          (u[5] = 3),
          (u[7] = 5),
          (u[8] = 6),
          a
            ? n
              ? s ||
                (X(r, e, j, K),
                X(r, t, J, Q),
                (u[0] = 0),
                (u[1] = 1),
                (u[3] = 0),
                (u[6] = 2))
              : (X(t, r, j, K),
                X(t, e, J, Q),
                (u[0] = 2),
                (u[1] = 0),
                (u[3] = 2),
                (u[6] = 1))
            : (X(e, t, j, K),
              X(e, r, J, Q),
              (u[0] = 1),
              (u[1] = 2),
              (u[3] = 1),
              (u[6] = 0)));
      var p = $.positions;
      return (
        (p[0] = e),
        (p[1] = t),
        (p[2] = r),
        (p.length = 3),
        (1 !== o && 2 !== o) ||
          ((p[3] = j), (p[4] = J), (p[5] = K), (p[6] = Q), (p.length = 7)),
        $
      );
    }
  }
  function te(e, r) {
    var i = e.attributes;
    if (0 !== i.position.values.length) {
      for (var a in i)
        if (i.hasOwnProperty(a) && t.defined(i[a]) && t.defined(i[a].values)) {
          var n = i[a];
          n.values = u.ComponentDatatype.createTypedArray(
            n.componentDatatype,
            n.values,
          );
        }
      var o = p.Geometry.computeNumberOfVertices(e);
      return (
        (e.indices = f.IndexDatatype.createTypedArray(o, e.indices)),
        r &&
          (e.boundingSphere = s.BoundingSphere.fromVertices(i.position.values)),
        e
      );
    }
  }
  function re(e) {
    var r = e.attributes,
      i = {};
    for (var a in r)
      if (r.hasOwnProperty(a) && t.defined(r[a]) && t.defined(r[a].values)) {
        var n = r[a];
        i[a] = new p.GeometryAttribute({
          componentDatatype: n.componentDatatype,
          componentsPerAttribute: n.componentsPerAttribute,
          normalize: n.normalize,
          values: [],
        });
      }
    return new p.Geometry({
      attributes: i,
      indices: [],
      primitiveType: e.primitiveType,
    });
  }
  function ie(e, r, i) {
    var a = t.defined(e.geometry.boundingSphere);
    (r = te(r, a)),
      (i = te(i, a)),
      t.defined(i) && !t.defined(r)
        ? (e.geometry = i)
        : !t.defined(i) && t.defined(r)
        ? (e.geometry = r)
        : ((e.westHemisphereGeometry = r),
          (e.eastHemisphereGeometry = i),
          (e.geometry = void 0));
  }
  function ae(e, t) {
    var r = new e(),
      i = new e(),
      a = new e();
    return function (n, s, o, u, p, d, l, v) {
      var f = e.fromArray(p, n * t, r),
        m = e.fromArray(p, s * t, i),
        y = e.fromArray(p, o * t, a);
      e.multiplyByScalar(f, u.x, f),
        e.multiplyByScalar(m, u.y, m),
        e.multiplyByScalar(y, u.z, y);
      var c = e.add(f, m, f);
      e.add(c, y, c), v && e.normalize(c, c), e.pack(c, d, l * t);
    };
  }
  var ne = ae(o.Cartesian4, 4),
    se = ae(a.Cartesian3, 3),
    oe = ae(n.Cartesian2, 2),
    ue = new a.Cartesian3(),
    pe = new a.Cartesian3(),
    de = new a.Cartesian3(),
    le = new a.Cartesian3();
  function ve(e, s, o, u, p, d, l, v, f, m, y, b, w, g, T, A) {
    if (
      t.defined(d) ||
      t.defined(l) ||
      t.defined(v) ||
      t.defined(f) ||
      t.defined(m) ||
      0 !== g
    ) {
      var E = (function (e, s, o, u, p) {
        var d, l, v, f, m, y, b, w;
        if (
          (r.Check.defined('point', e),
          r.Check.defined('p0', s),
          r.Check.defined('p1', o),
          r.Check.defined('p2', u),
          t.defined(p) || (p = new a.Cartesian3()),
          t.defined(s.z))
        ) {
          if (a.Cartesian3.equalsEpsilon(e, s, i.CesiumMath.EPSILON14))
            return a.Cartesian3.clone(a.Cartesian3.UNIT_X, p);
          if (a.Cartesian3.equalsEpsilon(e, o, i.CesiumMath.EPSILON14))
            return a.Cartesian3.clone(a.Cartesian3.UNIT_Y, p);
          if (a.Cartesian3.equalsEpsilon(e, u, i.CesiumMath.EPSILON14))
            return a.Cartesian3.clone(a.Cartesian3.UNIT_Z, p);
          (d = a.Cartesian3.subtract(o, s, c)),
            (l = a.Cartesian3.subtract(u, s, h)),
            (v = a.Cartesian3.subtract(e, s, C)),
            (f = a.Cartesian3.dot(d, d)),
            (m = a.Cartesian3.dot(d, l)),
            (y = a.Cartesian3.dot(d, v)),
            (b = a.Cartesian3.dot(l, l)),
            (w = a.Cartesian3.dot(l, v));
        } else {
          if (n.Cartesian2.equalsEpsilon(e, s, i.CesiumMath.EPSILON14))
            return a.Cartesian3.clone(a.Cartesian3.UNIT_X, p);
          if (n.Cartesian2.equalsEpsilon(e, o, i.CesiumMath.EPSILON14))
            return a.Cartesian3.clone(a.Cartesian3.UNIT_Y, p);
          if (n.Cartesian2.equalsEpsilon(e, u, i.CesiumMath.EPSILON14))
            return a.Cartesian3.clone(a.Cartesian3.UNIT_Z, p);
          (d = n.Cartesian2.subtract(o, s, c)),
            (l = n.Cartesian2.subtract(u, s, h)),
            (v = n.Cartesian2.subtract(e, s, C)),
            (f = n.Cartesian2.dot(d, d)),
            (m = n.Cartesian2.dot(d, l)),
            (y = n.Cartesian2.dot(d, v)),
            (b = n.Cartesian2.dot(l, l)),
            (w = n.Cartesian2.dot(l, v));
        }
        (p.y = b * y - m * w), (p.z = f * w - m * y);
        var g = f * b - m * m;
        return (
          0 !== p.y && (p.y /= g),
          0 !== p.z && (p.z /= g),
          (p.x = 1 - p.y - p.z),
          p
        );
      })(
        u,
        a.Cartesian3.fromArray(p, 3 * e, ue),
        a.Cartesian3.fromArray(p, 3 * s, pe),
        a.Cartesian3.fromArray(p, 3 * o, de),
        le,
      );
      if (
        (t.defined(d) && se(e, s, o, E, d, b.normal.values, A, !0),
        t.defined(m))
      ) {
        var D,
          x = a.Cartesian3.fromArray(m, 3 * e, ue),
          P = a.Cartesian3.fromArray(m, 3 * s, pe),
          S = a.Cartesian3.fromArray(m, 3 * o, de);
        a.Cartesian3.multiplyByScalar(x, E.x, x),
          a.Cartesian3.multiplyByScalar(P, E.y, P),
          a.Cartesian3.multiplyByScalar(S, E.z, S),
          a.Cartesian3.equals(x, a.Cartesian3.ZERO) &&
          a.Cartesian3.equals(P, a.Cartesian3.ZERO) &&
          a.Cartesian3.equals(S, a.Cartesian3.ZERO)
            ? (((D = ue).x = 0), (D.y = 0), (D.z = 0))
            : ((D = a.Cartesian3.add(x, P, x)),
              a.Cartesian3.add(D, S, D),
              a.Cartesian3.normalize(D, D)),
          a.Cartesian3.pack(D, b.extrudeDirection.values, 3 * A);
      }
      if (
        (t.defined(y) &&
          (function (e, t, r, a, n, s, o) {
            var u = n[e] * a.x,
              p = n[t] * a.y,
              d = n[r] * a.z;
            s[o] = u + p + d > i.CesiumMath.EPSILON6 ? 1 : 0;
          })(e, s, o, E, y, b.applyOffset.values, A),
        t.defined(l) && se(e, s, o, E, l, b.tangent.values, A, !0),
        t.defined(v) && se(e, s, o, E, v, b.bitangent.values, A, !0),
        t.defined(f) && oe(e, s, o, E, f, b.st.values, A),
        0 < g)
      )
        for (var I = 0; I < g; I++) {
          var N = w[I];
          fe(e, s, o, E, A, T[N], b[N]);
        }
    }
  }
  function fe(e, t, r, i, a, n, s) {
    var o = n.componentsPerAttribute,
      u = n.values,
      p = s.values;
    switch (o) {
      case 4:
        ne(e, t, r, i, u, p, a, !1);
        break;
      case 3:
        se(e, t, r, i, u, p, a, !1);
        break;
      case 2:
        oe(e, t, r, i, u, p, a, !1);
        break;
      default:
        p[a] = u[e] * i.x + u[t] * i.y + u[r] * i.z;
    }
  }
  function me(e, t, r, i, a, n) {
    var s = e.position.values.length / 3;
    if (-1 === a) return e.position.values.push(n.x, n.y, n.z), t.push(s), s;
    var o = i[a],
      u = r[o];
    return -1 === u
      ? ((r[o] = s), e.position.values.push(n.x, n.y, n.z), t.push(s), s)
      : (t.push(u), u);
  }
  var ye = {
    position: !0,
    normal: !0,
    bitangent: !0,
    tangent: !0,
    st: !0,
    extrudeDirection: !0,
    applyOffset: !0,
  };
  function ce(e) {
    var r = e.geometry,
      i = r.attributes,
      n = i.position.values,
      s = t.defined(i.normal) ? i.normal.values : void 0,
      o = t.defined(i.bitangent) ? i.bitangent.values : void 0,
      u = t.defined(i.tangent) ? i.tangent.values : void 0,
      p = t.defined(i.st) ? i.st.values : void 0,
      d = t.defined(i.extrudeDirection) ? i.extrudeDirection.values : void 0,
      l = t.defined(i.applyOffset) ? i.applyOffset.values : void 0,
      v = r.indices,
      f = [];
    for (var m in i)
      i.hasOwnProperty(m) && !ye[m] && t.defined(i[m]) && f.push(m);
    var y,
      c,
      h,
      C,
      b = f.length,
      w = re(r),
      g = re(r),
      T = [];
    T.length = n.length / 3;
    var A = [];
    for (A.length = n.length / 3, C = 0; C < T.length; ++C)
      (T[C] = -1), (A[C] = -1);
    var E = v.length;
    for (C = 0; C < E; C += 3) {
      var D = v[C],
        x = v[C + 1],
        P = v[C + 2],
        S = a.Cartesian3.fromArray(n, 3 * D),
        I = a.Cartesian3.fromArray(n, 3 * x),
        N = a.Cartesian3.fromArray(n, 3 * P),
        O = ee(S, I, N);
      if (t.defined(O) && 3 < O.positions.length)
        for (
          var L = O.positions, z = O.indices, G = z.length, M = 0;
          M < G;
          ++M
        ) {
          var q = z[M],
            R = L[q];
          ve(
            D,
            x,
            P,
            R,
            n,
            s,
            u,
            o,
            p,
            d,
            l,
            y,
            f,
            b,
            i,
            me(
              y,
              c,
              (h =
                R.y < 0
                  ? ((y = g.attributes), (c = g.indices), T)
                  : ((y = w.attributes), (c = w.indices), A)),
              v,
              q < 3 ? C + q : -1,
              R,
            ),
          );
        }
      else
        t.defined(O) &&
          ((S = O.positions[0]), (I = O.positions[1]), (N = O.positions[2])),
          ve(
            D,
            x,
            P,
            S,
            n,
            s,
            u,
            o,
            p,
            d,
            l,
            y,
            f,
            b,
            i,
            me(
              y,
              c,
              (h =
                S.y < 0
                  ? ((y = g.attributes), (c = g.indices), T)
                  : ((y = w.attributes), (c = w.indices), A)),
              v,
              C,
              S,
            ),
          ),
          ve(
            D,
            x,
            P,
            I,
            n,
            s,
            u,
            o,
            p,
            d,
            l,
            y,
            f,
            b,
            i,
            me(y, c, h, v, C + 1, I),
          ),
          ve(
            D,
            x,
            P,
            N,
            n,
            s,
            u,
            o,
            p,
            d,
            l,
            y,
            f,
            b,
            i,
            me(y, c, h, v, C + 2, N),
          );
    }
    ie(e, g, w);
  }
  var he = y.Plane.fromPointNormal(a.Cartesian3.ZERO, a.Cartesian3.UNIT_Y),
    Ce = new a.Cartesian3(),
    be = new a.Cartesian3();
  function we(e, r, n, s, o, u, p) {
    if (t.defined(p)) {
      var d = a.Cartesian3.fromArray(s, 3 * e, ue);
      a.Cartesian3.equalsEpsilon(d, n, i.CesiumMath.EPSILON10)
        ? (u.applyOffset.values[o] = p[e])
        : (u.applyOffset.values[o] = p[r]);
    }
  }
  function ge(e) {
    var r,
      n = e.geometry,
      s = n.attributes,
      o = s.position.values,
      u = t.defined(s.applyOffset) ? s.applyOffset.values : void 0,
      p = n.indices,
      d = re(n),
      l = re(n),
      v = p.length,
      f = [];
    f.length = o.length / 3;
    var y = [];
    for (y.length = o.length / 3, r = 0; r < f.length; ++r)
      (f[r] = -1), (y[r] = -1);
    for (r = 0; r < v; r += 2) {
      var c = p[r],
        h = p[r + 1],
        C = a.Cartesian3.fromArray(o, 3 * c, ue),
        b = a.Cartesian3.fromArray(o, 3 * h, pe);
      Math.abs(C.y) < i.CesiumMath.EPSILON6 &&
        (C.y < 0
          ? (C.y = -i.CesiumMath.EPSILON6)
          : (C.y = i.CesiumMath.EPSILON6)),
        Math.abs(b.y) < i.CesiumMath.EPSILON6 &&
          (b.y < 0
            ? (b.y = -i.CesiumMath.EPSILON6)
            : (b.y = i.CesiumMath.EPSILON6));
      var w = d.attributes,
        g = d.indices,
        T = y,
        A = l.attributes,
        E = l.indices,
        D = f,
        x = m.IntersectionTests.lineSegmentPlane(C, b, he, de);
      if (t.defined(x)) {
        var P = a.Cartesian3.multiplyByScalar(
          a.Cartesian3.UNIT_Y,
          5 * i.CesiumMath.EPSILON9,
          Ce,
        );
        C.y < 0 &&
          (a.Cartesian3.negate(P, P),
          (w = l.attributes),
          (g = l.indices),
          (T = f),
          (A = d.attributes),
          (E = d.indices),
          (D = y));
        var S = a.Cartesian3.add(x, P, be);
        we(c, h, C, o, me(w, g, T, p, r, C), w, u),
          we(c, h, S, o, me(w, g, T, p, -1, S), w, u),
          a.Cartesian3.negate(P, P),
          a.Cartesian3.add(x, P, S),
          we(c, h, S, o, me(A, E, D, p, -1, S), A, u),
          we(c, h, b, o, me(A, E, D, p, r + 1, b), A, u);
      } else {
        var I, N, O;
        we(
          c,
          h,
          C,
          o,
          me(
            I,
            N,
            (O =
              C.y < 0
                ? ((I = l.attributes), (N = l.indices), f)
                : ((I = d.attributes), (N = d.indices), y)),
            p,
            r,
            C,
          ),
          I,
          u,
        ),
          we(c, h, b, o, me(I, N, O, p, r + 1, b), I, u);
      }
    }
    ie(e, l, d);
  }
  var Te = new n.Cartesian2(),
    Ae = new n.Cartesian2(),
    Ee = new a.Cartesian3(),
    De = new a.Cartesian3(),
    xe = new a.Cartesian3(),
    Pe = new a.Cartesian3(),
    Se = new a.Cartesian3(),
    Ie = new a.Cartesian3(),
    Ne = new a.Cartesian3(),
    Oe = new o.Cartesian4();
  function Le(e) {
    for (
      var t = e.attributes,
        r = t.position.values,
        i = t.prevPosition.values,
        n = t.nextPosition.values,
        s = r.length,
        o = 0;
      o < s;
      o += 3
    ) {
      var u = a.Cartesian3.unpack(r, o, Ee);
      if (!(0 < u.x)) {
        var p = a.Cartesian3.unpack(i, o, De);
        ((u.y < 0 && 0 < p.y) || (0 < u.y && p.y < 0)) &&
          (0 < o - 3
            ? ((i[o] = r[o - 3]), (i[o + 1] = r[o - 2]), (i[o + 2] = r[o - 1]))
            : a.Cartesian3.pack(u, i, o));
        var d = a.Cartesian3.unpack(n, o, xe);
        ((u.y < 0 && 0 < d.y) || (0 < u.y && d.y < 0)) &&
          (o + 3 < s
            ? ((n[o] = r[o + 3]), (n[o + 1] = r[o + 4]), (n[o + 2] = r[o + 5]))
            : a.Cartesian3.pack(u, n, o));
      }
    }
  }
  var ze = 5 * i.CesiumMath.EPSILON9,
    Ge = i.CesiumMath.EPSILON6;
  (w.splitLongitude = function (e) {
    if (!t.defined(e)) throw new r.DeveloperError('instance is required.');
    var u = e.geometry,
      l = u.boundingSphere;
    if (
      t.defined(l) &&
      (0 < l.center.x - l.radius ||
        s.BoundingSphere.intersectPlane(l, y.Plane.ORIGIN_ZX_PLANE) !==
          s.Intersect.INTERSECTING)
    )
      return e;
    if (u.geometryType !== p.GeometryType.NONE)
      switch (u.geometryType) {
        case p.GeometryType.POLYLINES:
          !(function (e) {
            var r,
              s,
              u,
              p = e.geometry,
              d = p.attributes,
              l = d.position.values,
              v = d.prevPosition.values,
              f = d.nextPosition.values,
              y = d.expandAndWidth.values,
              c = t.defined(d.st) ? d.st.values : void 0,
              h = t.defined(d.color) ? d.color.values : void 0,
              C = t.defined(d.dist) ? d.dist.values : void 0,
              b = re(p),
              w = re(p),
              g = !1,
              T = l.length / 3;
            for (r = 0; r < T; r += 4) {
              var A = r,
                E = r + 2,
                D = a.Cartesian3.fromArray(l, 3 * A, Ee),
                x = a.Cartesian3.fromArray(l, 3 * E, De);
              if (Math.abs(D.y) < Ge)
                for (
                  D.y = Ge * (x.y < 0 ? -1 : 1),
                    l[3 * r + 1] = D.y,
                    l[3 * (r + 1) + 1] = D.y,
                    s = 3 * A;
                  s < 3 * A + 12;
                  s += 3
                )
                  (v[s] = l[3 * r]),
                    (v[s + 1] = l[3 * r + 1]),
                    (v[s + 2] = l[3 * r + 2]);
              if (Math.abs(x.y) < Ge)
                for (
                  x.y = Ge * (D.y < 0 ? -1 : 1),
                    l[3 * (r + 2) + 1] = x.y,
                    l[3 * (r + 3) + 1] = x.y,
                    s = 3 * A;
                  s < 3 * A + 12;
                  s += 3
                )
                  (f[s] = l[3 * (r + 2)]),
                    (f[s + 1] = l[3 * (r + 2) + 1]),
                    (f[s + 2] = l[3 * (r + 2) + 2]);
              var P = b.attributes,
                S = b.indices,
                I = w.attributes,
                N = w.indices,
                O = m.IntersectionTests.lineSegmentPlane(D, x, he, Pe);
              if (t.defined(O)) {
                g = !0;
                var L = a.Cartesian3.multiplyByScalar(
                  a.Cartesian3.UNIT_Y,
                  ze,
                  Se,
                );
                D.y < 0 &&
                  (a.Cartesian3.negate(L, L),
                  (P = w.attributes),
                  (S = w.indices),
                  (I = b.attributes),
                  (N = b.indices));
                var z = a.Cartesian3.add(O, L, Ie);
                P.position.values.push(D.x, D.y, D.z, D.x, D.y, D.z),
                  P.position.values.push(z.x, z.y, z.z),
                  P.position.values.push(z.x, z.y, z.z),
                  P.prevPosition.values.push(
                    v[3 * A],
                    v[3 * A + 1],
                    v[3 * A + 2],
                  ),
                  P.prevPosition.values.push(
                    v[3 * A + 3],
                    v[3 * A + 4],
                    v[3 * A + 5],
                  ),
                  P.prevPosition.values.push(D.x, D.y, D.z, D.x, D.y, D.z),
                  P.nextPosition.values.push(z.x, z.y, z.z),
                  P.nextPosition.values.push(z.x, z.y, z.z),
                  P.nextPosition.values.push(z.x, z.y, z.z),
                  P.nextPosition.values.push(z.x, z.y, z.z),
                  a.Cartesian3.negate(L, L),
                  a.Cartesian3.add(O, L, z),
                  I.position.values.push(z.x, z.y, z.z),
                  I.position.values.push(z.x, z.y, z.z),
                  I.position.values.push(x.x, x.y, x.z, x.x, x.y, x.z),
                  I.prevPosition.values.push(z.x, z.y, z.z),
                  I.prevPosition.values.push(z.x, z.y, z.z),
                  I.prevPosition.values.push(z.x, z.y, z.z),
                  I.prevPosition.values.push(z.x, z.y, z.z),
                  I.nextPosition.values.push(x.x, x.y, x.z, x.x, x.y, x.z),
                  I.nextPosition.values.push(
                    f[3 * E],
                    f[3 * E + 1],
                    f[3 * E + 2],
                  ),
                  I.nextPosition.values.push(
                    f[3 * E + 3],
                    f[3 * E + 4],
                    f[3 * E + 5],
                  );
                var G = n.Cartesian2.fromArray(y, 2 * A, Te),
                  M = Math.abs(G.y);
                P.expandAndWidth.values.push(-1, M, 1, M),
                  P.expandAndWidth.values.push(-1, -M, 1, -M),
                  I.expandAndWidth.values.push(-1, M, 1, M),
                  I.expandAndWidth.values.push(-1, -M, 1, -M);
                var q = a.Cartesian3.magnitudeSquared(
                  a.Cartesian3.subtract(O, D, xe),
                );
                if (
                  ((q /= a.Cartesian3.magnitudeSquared(
                    a.Cartesian3.subtract(x, D, xe),
                  )),
                  t.defined(h))
                ) {
                  var R = o.Cartesian4.fromArray(h, 4 * A, Oe),
                    B = o.Cartesian4.fromArray(h, 4 * E, Oe),
                    V = i.CesiumMath.lerp(R.x, B.x, q),
                    k = i.CesiumMath.lerp(R.y, B.y, q),
                    F = i.CesiumMath.lerp(R.z, B.z, q),
                    _ = i.CesiumMath.lerp(R.w, B.w, q);
                  for (s = 4 * A; s < 4 * A + 8; ++s) P.color.values.push(h[s]);
                  for (
                    P.color.values.push(V, k, F, _),
                      P.color.values.push(V, k, F, _),
                      I.color.values.push(V, k, F, _),
                      I.color.values.push(V, k, F, _),
                      s = 4 * E;
                    s < 4 * E + 8;
                    ++s
                  )
                    I.color.values.push(h[s]);
                }
                if (t.defined(c)) {
                  var U = n.Cartesian2.fromArray(c, 2 * A, Te),
                    Y = n.Cartesian2.fromArray(c, 2 * (r + 3), Ae),
                    Z = i.CesiumMath.lerp(U.x, Y.x, q);
                  for (s = 2 * A; s < 2 * A + 4; ++s) P.st.values.push(c[s]);
                  for (
                    P.st.values.push(Z, U.y),
                      P.st.values.push(Z, Y.y),
                      I.st.values.push(Z, U.y),
                      I.st.values.push(Z, Y.y),
                      s = 2 * E;
                    s < 2 * E + 4;
                    ++s
                  )
                    I.st.values.push(c[s]);
                }
                if (t.defined(C)) {
                  var H = a.Cartesian3.fromArray(C, 3 * A, Ne),
                    W = a.Cartesian3.fromArray(C, 3 * E, Ne),
                    X = i.CesiumMath.lerp(H.x, W.x, q);
                  for (s = 3 * A; s < 3 * A + 6; ++s) P.dist.values.push(C[s]);
                  for (
                    P.dist.values.push(X, H.y, H.z),
                      P.dist.values.push(X, H.y, H.z),
                      I.dist.values.push(X, W.y, W.z),
                      I.dist.values.push(X, W.y, W.z),
                      s = 3 * E;
                    s < 3 * E + 6;
                    ++s
                  )
                    I.dist.values.push(C[s]);
                }
                (u = P.position.values.length / 3 - 4),
                  S.push(u, u + 2, u + 1),
                  S.push(u + 1, u + 2, u + 3),
                  (u = I.position.values.length / 3 - 4),
                  N.push(u, u + 2, u + 1),
                  N.push(u + 1, u + 2, u + 3);
              } else {
                var j, J;
                for (
                  J =
                    D.y < 0
                      ? ((j = w.attributes), w.indices)
                      : ((j = b.attributes), b.indices),
                    j.position.values.push(D.x, D.y, D.z),
                    j.position.values.push(D.x, D.y, D.z),
                    j.position.values.push(x.x, x.y, x.z),
                    j.position.values.push(x.x, x.y, x.z),
                    s = 3 * r;
                  s < 3 * r + 12;
                  ++s
                )
                  j.prevPosition.values.push(v[s]),
                    j.nextPosition.values.push(f[s]);
                for (s = 2 * r; s < 2 * r + 8; ++s)
                  j.expandAndWidth.values.push(y[s]),
                    t.defined(c) && j.st.values.push(c[s]);
                if (t.defined(h))
                  for (s = 4 * r; s < 4 * r + 16; ++s)
                    j.color.values.push(h[s]);
                if (t.defined(C))
                  for (s = 3 * r; s < 3 * r + 12; ++s) j.dist.values.push(C[s]);
                (u = j.position.values.length / 3 - 4),
                  J.push(u, u + 2, u + 1),
                  J.push(u + 1, u + 2, u + 3);
              }
            }
            g && (Le(w), Le(b)), ie(e, w, b);
          })(e);
          break;
        case p.GeometryType.TRIANGLES:
          ce(e);
          break;
        case p.GeometryType.LINES:
          ge(e);
      }
    else
      (function (e) {
        switch (e.primitiveType) {
          case d.PrimitiveType.TRIANGLE_FAN:
            return (function (e) {
              var t = p.Geometry.computeNumberOfVertices(e);
              if (t < 3)
                throw new r.DeveloperError(
                  'The number of vertices must be at least three.',
                );
              var i = f.IndexDatatype.createTypedArray(t, 3 * (t - 2));
              (i[0] = 1), (i[1] = 0), (i[2] = 2);
              for (var a = 3, n = 3; n < t; ++n)
                (i[a++] = n - 1), (i[a++] = 0), (i[a++] = n);
              return (
                (e.indices = i),
                (e.primitiveType = d.PrimitiveType.TRIANGLES),
                e
              );
            })(e);
          case d.PrimitiveType.TRIANGLE_STRIP:
            return (function (e) {
              var t = p.Geometry.computeNumberOfVertices(e);
              if (t < 3)
                throw new r.DeveloperError(
                  'The number of vertices must be at least 3.',
                );
              var i = f.IndexDatatype.createTypedArray(t, 3 * (t - 2));
              (i[0] = 0),
                (i[1] = 1),
                (i[2] = 2),
                3 < t && ((i[3] = 0), (i[4] = 2), (i[5] = 3));
              for (var a = 6, n = 3; n < t - 1; n += 2)
                (i[a++] = n),
                  (i[a++] = n - 1),
                  (i[a++] = n + 1),
                  n + 2 < t &&
                    ((i[a++] = n), (i[a++] = n + 1), (i[a++] = n + 2));
              return (
                (e.indices = i),
                (e.primitiveType = d.PrimitiveType.TRIANGLES),
                e
              );
            })(e);
          case d.PrimitiveType.TRIANGLES:
            return (function (e) {
              if (t.defined(e.indices)) return e;
              var i = p.Geometry.computeNumberOfVertices(e);
              if (i < 3)
                throw new r.DeveloperError(
                  'The number of vertices must be at least three.',
                );
              if (i % 3 != 0)
                throw new r.DeveloperError(
                  'The number of vertices must be a multiple of three.',
                );
              for (
                var a = f.IndexDatatype.createTypedArray(i, i), n = 0;
                n < i;
                ++n
              )
                a[n] = n;
              return (e.indices = a), e;
            })(e);
          case d.PrimitiveType.LINE_STRIP:
            return (function (e) {
              var t = p.Geometry.computeNumberOfVertices(e);
              if (t < 2)
                throw new r.DeveloperError(
                  'The number of vertices must be at least two.',
                );
              var i = f.IndexDatatype.createTypedArray(t, 2 * (t - 1));
              (i[0] = 0), (i[1] = 1);
              for (var a = 2, n = 2; n < t; ++n) (i[a++] = n - 1), (i[a++] = n);
              return (
                (e.indices = i), (e.primitiveType = d.PrimitiveType.LINES), e
              );
            })(e);
          case d.PrimitiveType.LINE_LOOP:
            return (function (e) {
              var t = p.Geometry.computeNumberOfVertices(e);
              if (t < 2)
                throw new r.DeveloperError(
                  'The number of vertices must be at least two.',
                );
              var i = f.IndexDatatype.createTypedArray(t, 2 * t);
              (i[0] = 0), (i[1] = 1);
              for (var a = 2, n = 2; n < t; ++n) (i[a++] = n - 1), (i[a++] = n);
              return (
                (i[a++] = t - 1),
                (i[a] = 0),
                (e.indices = i),
                (e.primitiveType = d.PrimitiveType.LINES),
                e
              );
            })(e);
          case d.PrimitiveType.LINES:
            return (function (e) {
              if (t.defined(e.indices)) return e;
              var i = p.Geometry.computeNumberOfVertices(e);
              if (i < 2)
                throw new r.DeveloperError(
                  'The number of vertices must be at least two.',
                );
              if (i % 2 != 0)
                throw new r.DeveloperError(
                  'The number of vertices must be a multiple of 2.',
                );
              for (
                var a = f.IndexDatatype.createTypedArray(i, i), n = 0;
                n < i;
                ++n
              )
                a[n] = n;
              return (e.indices = a), e;
            })(e);
        }
      })(u),
        u.primitiveType === d.PrimitiveType.TRIANGLES
          ? ce(e)
          : u.primitiveType === d.PrimitiveType.LINES && ge(e);
    return e;
  }),
    (e.GeometryPipeline = w);
});
