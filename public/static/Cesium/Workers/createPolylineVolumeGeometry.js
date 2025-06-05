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
  './AttributeCompression-75ce15eb',
  './GeometryPipeline-8e55e413',
  './EncodedCartesian3-87cd0c1f',
  './IndexDatatype-9435b55f',
  './IntersectionTests-dbfba52c',
  './Plane-2bcb9154',
  './VertexFormat-fe4db402',
  './arrayRemoveDuplicates-2869246d',
  './BoundingRectangle-3d4f3d01',
  './EllipsoidTangentPlane-9c25b2da',
  './EllipsoidRhumbLine-6ca4b1e6',
  './earcut-2.2.1-b404d9e6',
  './PolygonPipeline-cc78b34e',
  './PolylineVolumeGeometryLibrary-ac3b176f',
  './EllipsoidGeodesic-db2069b3',
  './PolylinePipeline-65700d85',
], function (
  e,
  t,
  n,
  r,
  i,
  a,
  o,
  l,
  s,
  p,
  d,
  c,
  u,
  y,
  m,
  g,
  f,
  h,
  b,
  v,
  C,
  P,
  E,
  _,
  k,
  L,
  w,
  D,
  V,
  F,
  T,
  A,
) {
  function G(a) {
    var o = (a = e.defaultValue(a, e.defaultValue.EMPTY_OBJECT))
        .polylinePositions,
      l = a.shapePositions;
    if (!e.defined(o))
      throw new t.DeveloperError('options.polylinePositions is required.');
    if (!e.defined(l))
      throw new t.DeveloperError('options.shapePositions is required.');
    (this._positions = o),
      (this._shape = l),
      (this._ellipsoid = i.Ellipsoid.clone(
        e.defaultValue(a.ellipsoid, i.Ellipsoid.WGS84),
      )),
      (this._cornerType = e.defaultValue(a.cornerType, F.CornerType.ROUNDED)),
      (this._vertexFormat = E.VertexFormat.clone(
        e.defaultValue(a.vertexFormat, E.VertexFormat.DEFAULT),
      )),
      (this._granularity = e.defaultValue(
        a.granularity,
        n.CesiumMath.RADIANS_PER_DEGREE,
      )),
      (this._workerName = 'createPolylineVolumeGeometry'),
      (this.enuCenter = e.defaultValue(a.enuCenter, r.Cartesian3.ZERO));
    var s = 1 + o.length * r.Cartesian3.packedLength;
    (s += 1 + l.length * i.Cartesian2.packedLength + r.Cartesian3.packedLength),
      (this.packedLength =
        s + i.Ellipsoid.packedLength + E.VertexFormat.packedLength + 2);
  }
  G.pack = function (n, a, o) {
    if (!e.defined(n)) throw new t.DeveloperError('value is required');
    if (!e.defined(a)) throw new t.DeveloperError('array is required');
    var l;
    o = e.defaultValue(o, 0);
    var s = n._positions,
      p = s.length;
    for (a[o++] = p, l = 0; l < p; ++l, o += r.Cartesian3.packedLength)
      r.Cartesian3.pack(s[l], a, o);
    var d = n._shape;
    for (
      p = d.length, a[o++] = p, l = 0;
      l < p;
      ++l, o += i.Cartesian2.packedLength
    )
      i.Cartesian2.pack(d[l], a, o);
    return (
      i.Ellipsoid.pack(n._ellipsoid, a, o),
      (o += i.Ellipsoid.packedLength),
      E.VertexFormat.pack(n._vertexFormat, a, o),
      (o += E.VertexFormat.packedLength),
      (a[o++] = n._cornerType),
      (a[o++] = n._granularity),
      r.Cartesian3.pack(n.enuCenter, a, o),
      a
    );
  };
  var x = i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),
    R = new E.VertexFormat(),
    O = {
      polylinePositions: void 0,
      shapePositions: void 0,
      ellipsoid: x,
      vertexFormat: R,
      cornerType: void 0,
      granularity: void 0,
      enuCenter: void 0,
    };
  G.unpack = function (n, a, o) {
    if (!e.defined(n)) throw new t.DeveloperError('array is required');
    var l;
    a = e.defaultValue(a, 0);
    var s = n[a++],
      p = new Array(s);
    for (l = 0; l < s; ++l, a += r.Cartesian3.packedLength)
      p[l] = r.Cartesian3.unpack(n, a);
    s = n[a++];
    var d = new Array(s);
    for (l = 0; l < s; ++l, a += i.Cartesian2.packedLength)
      d[l] = i.Cartesian2.unpack(n, a);
    var c = i.Ellipsoid.unpack(n, a, x);
    a += i.Ellipsoid.packedLength;
    var u = E.VertexFormat.unpack(n, a, R);
    a += E.VertexFormat.packedLength;
    var y,
      m = n[a++],
      g = n[a++];
    return (
      (y = r.Cartesian3.unpack(n, a)),
      e.defined(o)
        ? ((o._positions = p),
          (o._shape = d),
          (o._ellipsoid = i.Ellipsoid.clone(c, o._ellipsoid)),
          (o._vertexFormat = E.VertexFormat.clone(u, o._vertexFormat)),
          (o._cornerType = m),
          (o._granularity = g),
          (o.enuCenter = y),
          o)
        : ((O.polylinePositions = p),
          (O.shapePositions = d),
          (O.cornerType = m),
          (O.granularity = g),
          (O.enuCenter = y),
          new G(O))
    );
  };
  var S = new k.BoundingRectangle();
  return (
    (G.createGeometry = function (t) {
      for (
        var n = t._positions,
          i = _.arrayRemoveDuplicates(n, r.Cartesian3.equalsEpsilon),
          o = i.length,
          l = new Array(o),
          s = 0;
        s < o;
        s++
      )
        l[s] = r.Cartesian3.clone(i[s]);
      var u = t._shape;
      if (
        ((u = F.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(u)),
        !(i.length < 2 || u.length < 3))
      ) {
        V.PolygonPipeline.computeWindingOrder2D(u) ===
          V.WindingOrder.CLOCKWISE && u.reverse();
        var y = k.BoundingRectangle.fromPoints(u, S),
          f = {};
        if (
          ((f.combinedPositions =
            F.PolylineVolumeGeometryLibrary.computePositions(l, u, y, t, !0)),
          !r.Cartesian3.equals(t.enuCenter, r.Cartesian3.ZERO))
        ) {
          var b = new Array(o);
          for (s = 0; s < o; s++) b[s] = r.Cartesian3.clone(i[s]);
          f.combinedLocalPositions =
            F.PolylineVolumeGeometryLibrary.computeLocalPositions(
              b,
              u,
              y,
              t,
              !0,
              t.enuCenter,
            );
        }
        return (function (t, n, r, i) {
          var o = t.combinedPositions,
            l = t.combinedLocalPositions,
            s = new g.GeometryAttributes();
          i.position &&
            (s.position = new d.GeometryAttribute({
              componentDatatype: p.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: o,
            }));
          var u,
            y,
            f,
            b,
            C,
            P,
            E = n.length,
            _ = o.length / 3,
            k = (_ - 2 * E) / (2 * E),
            L = V.PolygonPipeline.triangulate(n),
            w = (k - 1) * E * 6 + 2 * L.length,
            D = v.IndexDatatype.createTypedArray(_, w),
            F = 2 * E,
            T = 0;
          for (u = 0; u < k - 1; u++) {
            for (y = 0; y < E - 1; y++)
              (P = (f = 2 * y + u * E * 2) + F),
                (C = (b = f + 1) + F),
                (D[T++] = b),
                (D[T++] = f),
                (D[T++] = C),
                (D[T++] = C),
                (D[T++] = f),
                (D[T++] = P);
            (C = (b = 1 + (f = 2 * E - 2 + u * E * 2)) + F),
              (P = f + F),
              (D[T++] = b),
              (D[T++] = f),
              (D[T++] = C),
              (D[T++] = C),
              (D[T++] = f),
              (D[T++] = P);
          }
          if (i.st || i.tangent || i.bitangent) {
            var A,
              G,
              x = new Float32Array(2 * _),
              R = 1 / (k - 1),
              O = 1 / r.height,
              S = r.height / 2,
              B = 0;
            for (u = 0; u < k; u++) {
              for (
                A = u * R, G = O * (n[0].y + S), x[B++] = A, x[B++] = G, y = 1;
                y < E;
                y++
              )
                (G = O * (n[y].y + S)),
                  (x[B++] = A),
                  (x[B++] = G),
                  (x[B++] = A),
                  (x[B++] = G);
              (G = O * (n[0].y + S)), (x[B++] = A), (x[B++] = G);
            }
            for (y = 0; y < E; y++)
              (A = 0), (G = O * (n[y].y + S)), (x[B++] = A), (x[B++] = G);
            for (y = 0; y < E; y++)
              (A = (k - 1) * R),
                (G = O * (n[y].y + S)),
                (x[B++] = A),
                (x[B++] = G);
            s.st = new d.GeometryAttribute({
              componentDatatype: p.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: new Float32Array(x),
            });
          }
          var q = _ - 2 * E;
          for (u = 0; u < L.length; u += 3) {
            var I = L[u] + q,
              N = L[u + 1] + q,
              U = L[u + 2] + q;
            (D[T++] = I),
              (D[T++] = N),
              (D[T++] = U),
              (D[T++] = U + E),
              (D[T++] = N + E),
              (D[T++] = I + E);
          }
          var W = new d.Geometry({
            attributes: s,
            indices: D,
            boundingSphere: a.BoundingSphere.fromVertices(o),
            primitiveType: c.PrimitiveType.TRIANGLES,
          });
          if (
            (i.normal && (W = h.GeometryPipeline.computeNormal(W)),
            i.tangent || i.bitangent)
          ) {
            try {
              W = h.GeometryPipeline.computeTangentAndBitangent(W);
            } catch (t) {
              m.oneTimeWarning(
                'polyline-volume-tangent-bitangent',
                'Unable to compute tangents and bitangents for polyline volume geometry',
              );
            }
            i.tangent || (W.attributes.tangent = void 0),
              i.bitangent || (W.attributes.bitangent = void 0),
              i.st || (W.attributes.st = void 0);
          }
          return (
            e.defined(l) &&
              ((W.attributes.position.values = l),
              (W.attributes.position.componentDatatype =
                p.ComponentDatatype.FLOAT)),
            W
          );
        })(f, u, y, t._vertexFormat);
      }
    }),
    function (t, n) {
      return (
        e.defined(n) && (t = G.unpack(t, n)),
        (t._ellipsoid = i.Ellipsoid.clone(t._ellipsoid)),
        G.createGeometry(t)
      );
    }
  );
});
