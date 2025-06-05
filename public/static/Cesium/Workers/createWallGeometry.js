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
  './IntersectionTests-dbfba52c',
  './Plane-2bcb9154',
  './VertexFormat-fe4db402',
  './arrayRemoveDuplicates-2869246d',
  './EllipsoidRhumbLine-6ca4b1e6',
  './EllipsoidGeodesic-db2069b3',
  './PolylinePipeline-65700d85',
  './WallGeometryLibrary-80ce00e5',
], function (
  e,
  t,
  i,
  a,
  r,
  n,
  o,
  s,
  l,
  m,
  p,
  d,
  u,
  c,
  f,
  h,
  v,
  y,
  g,
  C,
  b,
  w,
  x,
  E,
  A,
) {
  var _ = new a.Cartesian3(),
    F = new a.Cartesian3(),
    D = new a.Cartesian3(),
    k = new a.Cartesian3(),
    L = new a.Cartesian3(),
    P = new a.Cartesian3(),
    H = new a.Cartesian3(),
    T = new a.Cartesian3();
  function G(n) {
    var o = (n = e.defaultValue(n, e.defaultValue.EMPTY_OBJECT)).positions,
      s = n.maximumHeights,
      l = n.minimumHeights;
    if (!e.defined(o))
      throw new t.DeveloperError('options.positions is required.');
    if (e.defined(s) && s.length !== o.length)
      throw new t.DeveloperError(
        'options.positions and options.maximumHeights must have the same length.',
      );
    if (e.defined(l) && l.length !== o.length)
      throw new t.DeveloperError(
        'options.positions and options.minimumHeights must have the same length.',
      );
    var m = e.defaultValue(n.vertexFormat, C.VertexFormat.DEFAULT),
      p = e.defaultValue(n.granularity, i.CesiumMath.RADIANS_PER_DEGREE),
      d = e.defaultValue(n.ellipsoid, r.Ellipsoid.WGS84);
    (this._positions = o),
      (this._minimumHeights = l),
      (this._maximumHeights = s),
      (this._vertexFormat = C.VertexFormat.clone(m)),
      (this._granularity = p),
      (this._ellipsoid = r.Ellipsoid.clone(d)),
      (this._enuCenter = n.enuCenter),
      (this._workerName = 'createWallGeometry');
    var u = 1 + o.length * a.Cartesian3.packedLength + 2;
    e.defined(l) && (u += l.length),
      e.defined(s) && (u += s.length),
      (this.packedLength =
        u + r.Ellipsoid.packedLength + C.VertexFormat.packedLength + 1),
      (this.packedLength += a.Cartesian3.packedLength);
  }
  G.pack = function (i, n, o) {
    if (!e.defined(i)) throw new t.DeveloperError('value is required');
    if (!e.defined(n)) throw new t.DeveloperError('array is required');
    var s;
    o = e.defaultValue(o, 0);
    var l = i._positions,
      m = l.length;
    for (n[o++] = m, s = 0; s < m; ++s, o += a.Cartesian3.packedLength)
      a.Cartesian3.pack(l[s], n, o);
    var p = i._minimumHeights;
    if (((m = e.defined(p) ? p.length : 0), (n[o++] = m), e.defined(p)))
      for (s = 0; s < m; ++s) n[o++] = p[s];
    var d = i._maximumHeights;
    if (((m = e.defined(d) ? d.length : 0), (n[o++] = m), e.defined(d)))
      for (s = 0; s < m; ++s) n[o++] = d[s];
    return (
      r.Ellipsoid.pack(i._ellipsoid, n, o),
      (o += r.Ellipsoid.packedLength),
      C.VertexFormat.pack(i._vertexFormat, n, o),
      (o += C.VertexFormat.packedLength),
      (n[o++] = i._granularity),
      e.defined(i._enuCenter)
        ? a.Cartesian3.pack(i._enuCenter, n, o)
        : a.Cartesian3.pack(a.Cartesian3.ZERO, n, o),
      n
    );
  };
  var V = r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),
    O = new C.VertexFormat(),
    z = {
      positions: void 0,
      minimumHeights: void 0,
      maximumHeights: void 0,
      ellipsoid: V,
      vertexFormat: O,
      granularity: void 0,
      enuCenter: void 0,
    };
  return (
    (G.unpack = function (i, n, o) {
      if (!e.defined(i)) throw new t.DeveloperError('array is required');
      var s;
      n = e.defaultValue(n, 0);
      var l,
        m,
        p = i[n++],
        d = new Array(p);
      for (s = 0; s < p; ++s, n += a.Cartesian3.packedLength)
        d[s] = a.Cartesian3.unpack(i, n);
      if (0 < (p = i[n++]))
        for (l = new Array(p), s = 0; s < p; ++s) l[s] = i[n++];
      if (0 < (p = i[n++]))
        for (m = new Array(p), s = 0; s < p; ++s) m[s] = i[n++];
      var u = r.Ellipsoid.unpack(i, n, V);
      n += r.Ellipsoid.packedLength;
      var c = C.VertexFormat.unpack(i, n, O);
      n += C.VertexFormat.packedLength;
      var f = i[n++],
        h = a.Cartesian3.unpack(i, n);
      return (
        a.Cartesian3.equals(h, a.Cartesian3.ZERO) && (h = void 0),
        e.defined(o)
          ? ((o._positions = d),
            (o._minimumHeights = l),
            (o._maximumHeights = m),
            (o._ellipsoid = r.Ellipsoid.clone(u, o._ellipsoid)),
            (o._vertexFormat = C.VertexFormat.clone(c, o._vertexFormat)),
            (o._granularity = f),
            (o._enuCenter = h),
            o)
          : ((z.positions = d),
            (z.minimumHeights = l),
            (z.maximumHeights = m),
            (z.granularity = f),
            (z.enuCenter = h),
            new G(z))
      );
    }),
    (G.fromConstantHeights = function (i) {
      var a,
        r,
        n = (i = e.defaultValue(i, e.defaultValue.EMPTY_OBJECT)).positions;
      if (!e.defined(n))
        throw new t.DeveloperError('options.positions is required.');
      var o = i.minimumHeight,
        s = i.maximumHeight,
        l = e.defined(o),
        m = e.defined(s);
      if (l || m) {
        var p = n.length;
        (a = l ? new Array(p) : void 0), (r = m ? new Array(p) : void 0);
        for (var d = 0; d < p; ++d) l && (a[d] = o), m && (r[d] = s);
      }
      return new G({
        positions: n,
        maximumHeights: r,
        minimumHeights: a,
        ellipsoid: i.ellipsoid,
        vertexFormat: i.vertexFormat,
      });
    }),
    (G.createGeometry = function (t) {
      var r = t._positions,
        o = t._minimumHeights,
        s = t._maximumHeights,
        l = t._vertexFormat,
        u = t._granularity,
        f = t._ellipsoid,
        y = t._enuCenter,
        g = A.WallGeometryLibrary.computePositions(f, r, s, o, u, !0, y);
      if (e.defined(g.pos)) {
        var C;
        e.defined(y) && (C = c.Transforms.eastNorthUpToFixedFrame(y));
        var b,
          w = g.pos.bottomPositions,
          x = g.pos.topPositions,
          E = g.pos.numCorners,
          G = x.length,
          V = 2 * G,
          O = l.position ? new Float64Array(V) : void 0,
          z = l.normal ? new Float32Array(V) : void 0,
          R = l.tangent ? new Float32Array(V) : void 0,
          S = l.bitangent ? new Float32Array(V) : void 0,
          q = l.st ? new Float32Array((V / 3) * 2) : void 0,
          I = 0,
          M = 0,
          N = 0,
          B = 0,
          U = 0,
          W = T,
          Z = H,
          J = P,
          Y = !0,
          j = 0,
          K = 1 / ((G /= 3) - r.length + 1);
        for (b = 0; b < G; ++b) {
          var Q = 3 * b,
            X = a.Cartesian3.fromArray(x, Q, _),
            $ = a.Cartesian3.fromArray(w, Q, F);
          if (
            (l.position &&
              ((O[I++] = $.x),
              (O[I++] = $.y),
              (O[I++] = $.z),
              (O[I++] = X.x),
              (O[I++] = X.y),
              (O[I++] = X.z)),
            l.st && ((q[U++] = j), (q[U++] = 0), (q[U++] = j), (q[U++] = 1)),
            l.normal || l.tangent || l.bitangent)
          ) {
            var ee,
              te = a.Cartesian3.clone(a.Cartesian3.ZERO, L),
              ie = f.scaleToGeodeticSurface(a.Cartesian3.fromArray(x, Q, F), F);
            if (
              (b + 1 < G &&
                ((ee = f.scaleToGeodeticSurface(
                  a.Cartesian3.fromArray(x, Q + 3, D),
                  D,
                )),
                (te = a.Cartesian3.fromArray(x, Q + 3, L))),
              Y)
            ) {
              var ae = a.Cartesian3.subtract(te, X, k),
                re = a.Cartesian3.subtract(ie, X, _);
              (W = a.Cartesian3.normalize(a.Cartesian3.cross(re, ae, W), W)),
                (Y = !1);
            }
            a.Cartesian3.equalsEpsilon(ee, ie, i.CesiumMath.EPSILON10)
              ? (Y = !0)
              : ((j += K),
                l.tangent &&
                  (Z = a.Cartesian3.normalize(
                    a.Cartesian3.subtract(ee, ie, Z),
                    Z,
                  )),
                l.bitangent &&
                  (J = a.Cartesian3.normalize(a.Cartesian3.cross(W, Z, J), J))),
              l.normal &&
                (e.defined(y) &&
                  (n.Matrix4.multiplyByPoint(C, W, W),
                  a.Cartesian3.normalize(W, W)),
                (z[M++] = W.x),
                (z[M++] = W.y),
                (z[M++] = W.z),
                (z[M++] = W.x),
                (z[M++] = W.y),
                (z[M++] = W.z)),
              l.tangent &&
                ((R[B++] = Z.x),
                (R[B++] = Z.y),
                (R[B++] = Z.z),
                (R[B++] = Z.x),
                (R[B++] = Z.y),
                (R[B++] = Z.z)),
              l.bitangent &&
                ((S[N++] = J.x),
                (S[N++] = J.y),
                (S[N++] = J.z),
                (S[N++] = J.x),
                (S[N++] = J.y),
                (S[N++] = J.z));
          }
        }
        var ne = new h.GeometryAttributes();
        l.position &&
          (ne.position = new p.GeometryAttribute({
            componentDatatype: m.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: O,
          })),
          l.normal &&
            (ne.normal = new p.GeometryAttribute({
              componentDatatype: m.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: z,
            })),
          l.tangent &&
            (ne.tangent = new p.GeometryAttribute({
              componentDatatype: m.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: R,
            })),
          l.bitangent &&
            (ne.bitangent = new p.GeometryAttribute({
              componentDatatype: m.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: S,
            })),
          l.st &&
            (ne.st = new p.GeometryAttribute({
              componentDatatype: m.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: q,
            }));
        var oe = V / 3;
        V -= 6 * (E + 1);
        var se = v.IndexDatatype.createTypedArray(oe, V),
          le = 0;
        for (b = 0; b < oe - 2; b += 2) {
          var me = b,
            pe = b + 2,
            de = a.Cartesian3.fromArray(O, 3 * me, _),
            ue = a.Cartesian3.fromArray(O, 3 * pe, F);
          if (!a.Cartesian3.equalsEpsilon(de, ue, i.CesiumMath.EPSILON10)) {
            var ce = b + 1,
              fe = b + 3;
            (se[le++] = ce),
              (se[le++] = me),
              (se[le++] = fe),
              (se[le++] = fe),
              (se[le++] = me),
              (se[le++] = pe);
          }
        }
        var he = new p.Geometry({
          attributes: ne,
          indices: se,
          primitiveType: d.PrimitiveType.TRIANGLES,
          boundingSphere: new n.BoundingSphere.fromVertices(O),
        });
        return (
          e.defined(t._enuCenter) &&
            (he.attributes.position.values.set(g.localPos.topPositions, 0),
            he.attributes.position.values.set(
              g.localPos.bottomPositions,
              he.attributes.position.values.length / 2,
            ),
            (he.attributes.position.componentDatatype =
              m.ComponentDatatype.FLOAT)),
          he
        );
      }
    }),
    function (t, i) {
      return (
        e.defined(i) && (t = G.unpack(t, i)),
        (t._ellipsoid = r.Ellipsoid.clone(t._ellipsoid)),
        G.createGeometry(t)
      );
    }
  );
});
