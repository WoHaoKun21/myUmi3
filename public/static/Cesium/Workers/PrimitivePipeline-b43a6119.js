define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './ComponentDatatype-5862616f',
  './GeometryAttribute-2243653a',
  './GeometryAttributes-aacecde6',
  './GeometryPipeline-8e55e413',
  './IndexDatatype-9435b55f',
  './WebMercatorProjection-bc9aa7fe',
], function (e, t, r, n, i, o, a, s, d, p, f) {
  function u(e, r, n) {
    (e = t.defaultValue(e, 0)),
      (r = t.defaultValue(r, 0)),
      (n = t.defaultValue(n, 0)),
      (this.value = new Float32Array([e, r, n]));
  }
  function c(e, t) {
    var r = e.attributes,
      n = r.position,
      i = n.values.length / n.componentsPerAttribute;
    r.batchId = new a.GeometryAttribute({
      componentDatatype: o.ComponentDatatype.FLOAT,
      componentsPerAttribute: 1,
      values: new Float32Array(i),
    });
    for (var s = r.batchId.values, d = 0; d < i; ++d) s[d] = t;
  }
  function m(e, r, n, i) {
    var o,
      a,
      s,
      d = i.length - 1;
    if (0 <= d) {
      var p = i[d];
      (o = p.offset + p.count), (a = n[(s = p.index)].indices.length);
    } else a = n[(s = o = 0)].indices.length;
    for (var f = e.length, u = 0; u < f; ++u) {
      var c = e[u][r];
      if (t.defined(c)) {
        var m = c.indices.length;
        a < o + m && ((o = 0), (a = n[++s].indices.length)),
          i.push({ index: s, offset: o, count: m }),
          (o += m);
      }
    }
  }
  Object.defineProperties(u.prototype, {
    componentDatatype: {
      get: function () {
        return o.ComponentDatatype.FLOAT;
      },
    },
    componentsPerAttribute: {
      get: function () {
        return 3;
      },
    },
    normalize: {
      get: function () {
        return !1;
      },
    },
  }),
    (u.fromCartesian3 = function (e) {
      return r.Check.defined('offset', e), new u(e.x, e.y, e.z);
    }),
    (u.toValue = function (e, n) {
      return (
        r.Check.defined('offset', e),
        t.defined(n) || (n = new Float32Array([e.x, e.y, e.z])),
        (n[0] = e.x),
        (n[1] = e.y),
        (n[2] = e.z),
        n
      );
    });
  var h = {};
  function l(e, r) {
    var n = e.attributes;
    for (var i in n)
      if (n.hasOwnProperty(i)) {
        var o = n[i];
        t.defined(o) && t.defined(o.values) && r.push(o.values.buffer);
      }
    t.defined(e.indices) && r.push(e.indices.buffer);
  }
  function g(e) {
    var r = e.length,
      n = 1 + (i.BoundingSphere.packedLength + 1) * r,
      o = new Float32Array(n),
      a = 0;
    o[a++] = r;
    for (var s = 0; s < r; ++s) {
      var d = e[s];
      t.defined(d)
        ? ((o[a++] = 1), i.BoundingSphere.pack(e[s], o, a))
        : (o[a++] = 0),
        (a += i.BoundingSphere.packedLength);
    }
    return o;
  }
  function y(e) {
    for (var t = new Array(e[0]), r = 0, n = 1; n < e.length; )
      1 === e[n++] && (t[r] = i.BoundingSphere.unpack(e, n)),
        ++r,
        (n += i.BoundingSphere.packedLength);
    return t;
  }
  (h.combineGeometry = function (e) {
    var n,
      a,
      s,
      p,
      f,
      u,
      h,
      l = e.instances,
      g = l.length,
      y = !1;
    0 < g &&
      (0 <
        (n = (function (e) {
          var n,
            a,
            s,
            p = e.instances,
            f = e.projection,
            u = e.elementIndexUintSupported,
            m = e.scene3DOnly,
            h = e.vertexCacheOptimize,
            l = e.compressVertices,
            g = e.modelMatrix,
            y = p.length;
          for (n = 0; n < y; ++n)
            if (t.defined(p[n].geometry)) {
              s = p[n].geometry.primitiveType;
              break;
            }
          for (n = 1; n < y; ++n)
            if (t.defined(p[n].geometry) && p[n].geometry.primitiveType !== s)
              throw new r.DeveloperError(
                'All instance geometries must have the same primitiveType.',
              );
          if (
            ((function (e, r, n) {
              var o,
                a = !n,
                s = e.length;
              if (!a && 1 < s) {
                var p = e[0].modelMatrix;
                for (o = 1; o < s; ++o)
                  if (!i.Matrix4.equals(p, e[o].modelMatrix)) {
                    a = !0;
                    break;
                  }
              }
              if (a)
                for (o = 0; o < s; ++o)
                  t.defined(e[o].geometry) &&
                    d.GeometryPipeline.transformToWorldCoordinates(e[o]);
              else i.Matrix4.multiplyTransformation(r, e[0].modelMatrix, r);
            })(p, g, m),
            !m)
          )
            for (n = 0; n < y; ++n)
              t.defined(p[n].geometry) &&
                d.GeometryPipeline.splitLongitude(p[n]);
          if (
            ((function (e) {
              for (var r = e.length, n = 0; n < r; ++n) {
                var i = e[n];
                t.defined(i.geometry)
                  ? c(i.geometry, n)
                  : t.defined(i.westHemisphereGeometry) &&
                    t.defined(i.eastHemisphereGeometry) &&
                    (c(i.westHemisphereGeometry, n),
                    c(i.eastHemisphereGeometry, n));
              }
            })(p),
            h)
          )
            for (n = 0; n < y; ++n) {
              var v = p[n];
              t.defined(v.geometry)
                ? (d.GeometryPipeline.reorderForPostVertexCache(v.geometry),
                  d.GeometryPipeline.reorderForPreVertexCache(v.geometry))
                : t.defined(v.westHemisphereGeometry) &&
                  t.defined(v.eastHemisphereGeometry) &&
                  (d.GeometryPipeline.reorderForPostVertexCache(
                    v.westHemisphereGeometry,
                  ),
                  d.GeometryPipeline.reorderForPreVertexCache(
                    v.westHemisphereGeometry,
                  ),
                  d.GeometryPipeline.reorderForPostVertexCache(
                    v.eastHemisphereGeometry,
                  ),
                  d.GeometryPipeline.reorderForPreVertexCache(
                    v.eastHemisphereGeometry,
                  ));
            }
          var b = d.GeometryPipeline.combineInstances(p);
          for (y = b.length, n = 0; n < y; ++n) {
            var G,
              x = (a = b[n]).attributes;
            if (m)
              for (G in x)
                x.hasOwnProperty(G) &&
                  x[G].componentDatatype === o.ComponentDatatype.DOUBLE &&
                  d.GeometryPipeline.encodeAttribute(
                    a,
                    G,
                    G + '3DHigh',
                    G + '3DLow',
                  );
            else
              for (G in x)
                if (
                  x.hasOwnProperty(G) &&
                  x[G].componentDatatype === o.ComponentDatatype.DOUBLE
                ) {
                  var S = G + '3D',
                    P = G + '2D';
                  d.GeometryPipeline.projectTo2D(a, G, S, P, f),
                    t.defined(a.boundingSphere) &&
                      'position' === G &&
                      (a.boundingSphereCV = i.BoundingSphere.fromVertices(
                        a.attributes.position2D.values,
                      )),
                    d.GeometryPipeline.encodeAttribute(
                      a,
                      S,
                      S + 'High',
                      S + 'Low',
                    ),
                    d.GeometryPipeline.encodeAttribute(
                      a,
                      P,
                      P + 'High',
                      P + 'Low',
                    );
                }
            l && d.GeometryPipeline.compressVertices(a);
          }
          if (!u) {
            var k = [];
            for (y = b.length, n = 0; n < y; ++n)
              (a = b[n]),
                (k = k.concat(d.GeometryPipeline.fitToUnsignedShortIndices(a)));
            b = k;
          }
          return b;
        })(e)).length &&
        ((a = d.GeometryPipeline.createAttributeLocations(n[0])),
        e.createPickOffsets &&
          (m((f = l), 'geometry', (u = n), (h = [])),
          m(f, 'westHemisphereGeometry', u, h),
          m(f, 'eastHemisphereGeometry', u, h),
          (s = h))),
      t.defined(l[0].attributes) &&
        t.defined(l[0].attributes.offset) &&
        ((p = new Array(g)), (y = !0)));
    for (var v = new Array(g), b = new Array(g), G = 0; G < g; ++G) {
      var x = l[G],
        S = x.geometry;
      t.defined(S) &&
        ((v[G] = S.boundingSphere),
        (b[G] = S.boundingSphereCV),
        y && (p[G] = x.geometry.offsetAttribute));
      var P = x.eastHemisphereGeometry,
        k = x.westHemisphereGeometry;
      t.defined(P) &&
        t.defined(k) &&
        (t.defined(P.boundingSphere) &&
          t.defined(k.boundingSphere) &&
          (v[G] = i.BoundingSphere.union(P.boundingSphere, k.boundingSphere)),
        t.defined(P.boundingSphereCV) &&
          t.defined(k.boundingSphereCV) &&
          (b[G] = i.BoundingSphere.union(
            P.boundingSphereCV,
            k.boundingSphereCV,
          )));
    }
    return {
      geometries: n,
      modelMatrix: e.modelMatrix,
      attributeLocations: a,
      pickOffsets: s,
      offsetInstanceExtend: p,
      boundingSpheres: v,
      boundingSpheresCV: b,
    };
  }),
    (h.packCreateGeometryResults = function (e, r) {
      var n = new Float64Array(
          (function (e) {
            for (var r = 1, n = e.length, o = 0; o < n; o++) {
              var a = e[o];
              if ((++r, t.defined(a))) {
                var s = a.attributes;
                for (var d in ((r +=
                  7 +
                  2 * i.BoundingSphere.packedLength +
                  (t.defined(a.indices) ? a.indices.length : 0)),
                s))
                  s.hasOwnProperty(d) &&
                    t.defined(s[d]) &&
                    (r += 5 + s[d].values.length);
              }
            }
            return r;
          })(e),
        ),
        o = [],
        a = {},
        s = e.length,
        d = 0;
      n[d++] = s;
      for (var p = 0; p < s; p++) {
        var f = e[p],
          u = t.defined(f);
        if (((n[d++] = u ? 1 : 0), u)) {
          (n[d++] = f.primitiveType),
            (n[d++] = f.geometryType),
            (n[d++] = t.defaultValue(f.offsetAttribute, -1));
          var c = t.defined(f.boundingSphere) ? 1 : 0;
          (n[d++] = c) && i.BoundingSphere.pack(f.boundingSphere, n, d),
            (d += i.BoundingSphere.packedLength);
          var m = t.defined(f.boundingSphereCV) ? 1 : 0;
          (n[d++] = m) && i.BoundingSphere.pack(f.boundingSphereCV, n, d),
            (d += i.BoundingSphere.packedLength);
          var h = f.attributes,
            l = [];
          for (var g in h)
            h.hasOwnProperty(g) &&
              t.defined(h[g]) &&
              (l.push(g), t.defined(a[g]) || ((a[g] = o.length), o.push(g)));
          n[d++] = l.length;
          for (var y = 0; y < l.length; y++) {
            var v = l[y],
              b = h[v];
            (n[d++] = a[v]),
              (n[d++] = b.componentDatatype),
              (n[d++] = b.componentsPerAttribute),
              (n[d++] = b.normalize ? 1 : 0),
              (n[d++] = b.values.length),
              n.set(b.values, d),
              (d += b.values.length);
          }
          var G = t.defined(f.indices) ? f.indices.length : 0;
          0 < (n[d++] = G) && (n.set(f.indices, d), (d += G));
        }
      }
      return r.push(n.buffer), { stringTable: o, packedData: n };
    }),
    (h.unpackCreateGeometryResults = function (e) {
      for (
        var t,
          r = e.stringTable,
          n = e.packedData,
          d = new Array(n[0]),
          f = 0,
          u = 1;
        u < n.length;

      )
        if (1 === n[u++]) {
          var c,
            m,
            h,
            l,
            g,
            y = n[u++],
            v = n[u++],
            b = n[u++];
          -1 === b && (b = void 0),
            1 === n[u++] && (c = i.BoundingSphere.unpack(n, u)),
            (u += i.BoundingSphere.packedLength),
            1 === n[u++] && (m = i.BoundingSphere.unpack(n, u)),
            (u += i.BoundingSphere.packedLength);
          var G,
            x = new s.GeometryAttributes(),
            S = n[u++];
          for (t = 0; t < S; t++) {
            var P = r[n[u++]],
              k = n[u++];
            g = n[u++];
            var C = 0 !== n[u++];
            (h = n[u++]), (l = o.ComponentDatatype.createTypedArray(k, h));
            for (var w = 0; w < h; w++) l[w] = n[u++];
            x[P] = new a.GeometryAttribute({
              componentDatatype: k,
              componentsPerAttribute: g,
              normalize: C,
              values: l,
            });
          }
          if (0 < (h = n[u++])) {
            var A = l.length / g;
            for (G = p.IndexDatatype.createTypedArray(A, h), t = 0; t < h; t++)
              G[t] = n[u++];
          }
          d[f++] = new a.Geometry({
            primitiveType: y,
            geometryType: v,
            boundingSphere: c,
            boundingSphereCV: m,
            indices: G,
            attributes: x,
            offsetAttribute: b,
          });
        } else d[f++] = void 0;
      return d;
    }),
    (h.packCombineGeometryParameters = function (e, r) {
      for (var n = e.createGeometryResults, o = n.length, a = 0; a < o; a++)
        r.push(n[a].packedData.buffer);
      return {
        createGeometryResults: e.createGeometryResults,
        packedInstances: (function (e, r) {
          var n = e.length,
            o = new Float64Array(1 + 19 * n),
            a = 0;
          o[a++] = n;
          for (var s = 0; s < n; s++) {
            var d = e[s];
            if (
              (i.Matrix4.pack(d.modelMatrix, o, a),
              (a += i.Matrix4.packedLength),
              t.defined(d.attributes) && t.defined(d.attributes.offset))
            ) {
              var p = d.attributes.offset.value;
              (o[a] = p[0]), (o[a + 1] = p[1]), (o[a + 2] = p[2]);
            }
            a += 3;
          }
          return r.push(o.buffer), o;
        })(e.instances, r),
        ellipsoid: e.ellipsoid,
        isGeographic: e.projection instanceof i.GeographicProjection,
        elementIndexUintSupported: e.elementIndexUintSupported,
        scene3DOnly: e.scene3DOnly,
        vertexCacheOptimize: e.vertexCacheOptimize,
        compressVertices: e.compressVertices,
        modelMatrix: e.modelMatrix,
        createPickOffsets: e.createPickOffsets,
      };
    }),
    (h.unpackCombineGeometryParameters = function (e) {
      for (
        var r = (function (e) {
            for (var r = e, n = new Array(r[0]), o = 0, a = 1; a < r.length; ) {
              var s,
                d = i.Matrix4.unpack(r, a);
              (a += i.Matrix4.packedLength),
                t.defined(r[a]) &&
                  (s = { offset: new u(r[a], r[a + 1], r[a + 2]) }),
                (a += 3),
                (n[o++] = { modelMatrix: d, attributes: s });
            }
            return n;
          })(e.packedInstances),
          o = e.createGeometryResults,
          a = o.length,
          s = 0,
          d = 0;
        d < a;
        d++
      )
        for (
          var p = h.unpackCreateGeometryResults(o[d]), c = p.length, m = 0;
          m < c;
          m++
        ) {
          var l = p[m];
          (r[s].geometry = l), ++s;
        }
      var g = n.Ellipsoid.clone(e.ellipsoid);
      return {
        instances: r,
        ellipsoid: g,
        projection: e.isGeographic
          ? new i.GeographicProjection(g)
          : new f.WebMercatorProjection(g),
        elementIndexUintSupported: e.elementIndexUintSupported,
        scene3DOnly: e.scene3DOnly,
        vertexCacheOptimize: e.vertexCacheOptimize,
        compressVertices: e.compressVertices,
        modelMatrix: i.Matrix4.clone(e.modelMatrix),
        createPickOffsets: e.createPickOffsets,
      };
    }),
    (h.packCombineGeometryResults = function (e, r) {
      t.defined(e.geometries) &&
        (function (e, t) {
          for (var r = e.length, n = 0; n < r; ++n) l(e[n], t);
        })(e.geometries, r);
      var n = g(e.boundingSpheres),
        i = g(e.boundingSpheresCV);
      return (
        r.push(n.buffer, i.buffer),
        {
          geometries: e.geometries,
          attributeLocations: e.attributeLocations,
          modelMatrix: e.modelMatrix,
          pickOffsets: e.pickOffsets,
          offsetInstanceExtend: e.offsetInstanceExtend,
          boundingSpheres: n,
          boundingSpheresCV: i,
        }
      );
    }),
    (h.unpackCombineGeometryResults = function (e) {
      return {
        geometries: e.geometries,
        attributeLocations: e.attributeLocations,
        modelMatrix: e.modelMatrix,
        pickOffsets: e.pickOffsets,
        offsetInstanceExtend: e.offsetInstanceExtend,
        boundingSpheres: y(e.boundingSpheres),
        boundingSpheresCV: y(e.boundingSpheresCV),
      };
    }),
    (e.PrimitivePipeline = h);
});
