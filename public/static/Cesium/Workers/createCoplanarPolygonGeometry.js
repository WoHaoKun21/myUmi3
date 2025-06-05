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
  './GeometryInstance-9ddb8c73',
  './arrayRemoveDuplicates-2869246d',
  './BoundingRectangle-3d4f3d01',
  './EllipsoidTangentPlane-9c25b2da',
  './OrientedBoundingBox-7b25e901',
  './CoplanarPolygonGeometryLibrary-051a16f8',
  './ArcType-66bc286a',
  './EllipsoidRhumbLine-6ca4b1e6',
  './earcut-2.2.1-b404d9e6',
  './PolygonPipeline-cc78b34e',
  './PolygonGeometryLibrary-ec05daff',
], function (
  e,
  t,
  a,
  n,
  r,
  o,
  i,
  l,
  s,
  p,
  c,
  y,
  u,
  d,
  m,
  g,
  b,
  h,
  v,
  f,
  C,
  x,
  P,
  w,
  A,
  F,
  G,
  L,
  E,
  T,
  k,
  D,
  _,
  V,
) {
  var R = new n.Cartesian3(),
    M = new F.BoundingRectangle(),
    I = new r.Cartesian2(),
    H = new r.Cartesian2(),
    B = new n.Cartesian3(),
    O = new n.Cartesian3(),
    S = new n.Cartesian3(),
    z = new n.Cartesian3(),
    N = new n.Cartesian3(),
    Q = new n.Cartesian3(),
    j = new d.Quaternion(),
    U = new o.Matrix3(),
    Y = new o.Matrix3(),
    q = new n.Cartesian3();
  function J(e, t, i, l, s, u, m, b) {
    var h = e.positions,
      v = _.PolygonPipeline.triangulate(e.positions2D, e.holes);
    v.length < 3 && (v = [0, 1, 2]);
    var C = f.IndexDatatype.createTypedArray(h.length, v.length);
    C.set(v);
    var x = U;
    if (0 !== l) {
      var P = d.Quaternion.fromAxisAngle(u, l, j);
      if (((x = o.Matrix3.fromQuaternion(P, x)), t.tangent || t.bitangent)) {
        P = d.Quaternion.fromAxisAngle(u, -l, j);
        var w = o.Matrix3.fromQuaternion(P, Y);
        (m = n.Cartesian3.normalize(o.Matrix3.multiplyByVector(w, m, m), m)),
          t.bitangent &&
            (b = n.Cartesian3.normalize(n.Cartesian3.cross(u, m, b), b));
      }
    } else x = o.Matrix3.clone(o.Matrix3.IDENTITY, x);
    var A = H;
    t.st && ((A.x = i.x), (A.y = i.y));
    for (
      var F = h.length,
        G = 3 * F,
        L = new Float64Array(G),
        E = t.normal ? new Float32Array(G) : void 0,
        T = t.tangent ? new Float32Array(G) : void 0,
        k = t.bitangent ? new Float32Array(G) : void 0,
        D = t.st ? new Float32Array(2 * F) : void 0,
        V = 0,
        M = 0,
        B = 0,
        O = 0,
        S = 0,
        z = 0;
      z < F;
      z++
    ) {
      var N = h[z];
      if (((L[V++] = N.x), (L[V++] = N.y), (L[V++] = N.z), t.st)) {
        var Q = s(o.Matrix3.multiplyByVector(x, N, R), I);
        r.Cartesian2.subtract(Q, A, Q);
        var q = a.CesiumMath.clamp(Q.x / i.width, 0, 1),
          J = a.CesiumMath.clamp(Q.y / i.height, 0, 1);
        (D[S++] = q), (D[S++] = J);
      }
      t.normal && ((E[M++] = u.x), (E[M++] = u.y), (E[M++] = u.z)),
        t.tangent && ((T[O++] = m.x), (T[O++] = m.y), (T[O++] = m.z)),
        t.bitangent && ((k[B++] = b.x), (k[B++] = b.y), (k[B++] = b.z));
    }
    var W = new g.GeometryAttributes();
    return (
      t.position &&
        (W.position = new c.GeometryAttribute({
          componentDatatype: p.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: L,
        })),
      t.normal &&
        (W.normal = new c.GeometryAttribute({
          componentDatatype: p.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: E,
        })),
      t.tangent &&
        (W.tangent = new c.GeometryAttribute({
          componentDatatype: p.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: T,
        })),
      t.bitangent &&
        (W.bitangent = new c.GeometryAttribute({
          componentDatatype: p.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: k,
        })),
      t.st &&
        (W.st = new c.GeometryAttribute({
          componentDatatype: p.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: D,
        })),
      new c.Geometry({
        attributes: W,
        indices: C,
        primitiveType: y.PrimitiveType.TRIANGLES,
      })
    );
  }
  function W(a) {
    var n = (a = e.defaultValue(a, e.defaultValue.EMPTY_OBJECT))
      .polygonHierarchy;
    t.Check.defined('options.polygonHierarchy', n);
    var o = e.defaultValue(a.vertexFormat, P.VertexFormat.DEFAULT);
    (this._vertexFormat = P.VertexFormat.clone(o)),
      (this._polygonHierarchy = n),
      (this._stRotation = e.defaultValue(a.stRotation, 0)),
      (this._ellipsoid = r.Ellipsoid.clone(
        e.defaultValue(a.ellipsoid, r.Ellipsoid.WGS84),
      )),
      (this._workerName = 'createCoplanarPolygonGeometry'),
      (this.packedLength =
        V.PolygonGeometryLibrary.computeHierarchyPackedLength(n) +
        P.VertexFormat.packedLength +
        r.Ellipsoid.packedLength +
        2);
  }
  (W.fromPositions = function (a) {
    return (
      (a = e.defaultValue(a, e.defaultValue.EMPTY_OBJECT)),
      t.Check.defined('options.positions', a.positions),
      new W({
        polygonHierarchy: { positions: a.positions },
        vertexFormat: a.vertexFormat,
        stRotation: a.stRotation,
        ellipsoid: a.ellipsoid,
      })
    );
  }),
    (W.pack = function (a, n, o) {
      return (
        t.Check.typeOf.object('value', a),
        t.Check.defined('array', n),
        (o = e.defaultValue(o, 0)),
        (o = V.PolygonGeometryLibrary.packPolygonHierarchy(
          a._polygonHierarchy,
          n,
          o,
        )),
        r.Ellipsoid.pack(a._ellipsoid, n, o),
        (o += r.Ellipsoid.packedLength),
        P.VertexFormat.pack(a._vertexFormat, n, o),
        (o += P.VertexFormat.packedLength),
        (n[o++] = a._stRotation),
        (n[o] = a.packedLength),
        n
      );
    });
  var Z = r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),
    K = new P.VertexFormat(),
    X = { polygonHierarchy: {} };
  return (
    (W.unpack = function (a, n, o) {
      t.Check.defined('array', a), (n = e.defaultValue(n, 0));
      var i = V.PolygonGeometryLibrary.unpackPolygonHierarchy(a, n);
      (n = i.startingIndex), delete i.startingIndex;
      var l = r.Ellipsoid.unpack(a, n, Z);
      n += r.Ellipsoid.packedLength;
      var s = P.VertexFormat.unpack(a, n, K);
      n += P.VertexFormat.packedLength;
      var p = a[n++],
        c = a[n];
      return (
        e.defined(o) || (o = new W(X)),
        (o._polygonHierarchy = i),
        (o._ellipsoid = r.Ellipsoid.clone(l, o._ellipsoid)),
        (o._vertexFormat = P.VertexFormat.clone(s, o._vertexFormat)),
        (o._stRotation = p),
        (o.packedLength = c),
        o
      );
    }),
    (W.createGeometry = function (e) {
      var t = e._vertexFormat,
        r = e._polygonHierarchy,
        i = e._stRotation,
        l = r.positions;
      if (
        !(
          (l = A.arrayRemoveDuplicates(l, n.Cartesian3.equalsEpsilon, !0))
            .length < 3
        )
      ) {
        var s = B,
          p = O,
          y = S,
          u = N,
          d = Q;
        if (
          E.CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments(
            l,
            z,
            u,
            d,
          )
        ) {
          if (
            ((s = n.Cartesian3.cross(u, d, s)),
            (s = n.Cartesian3.normalize(s, s)),
            !n.Cartesian3.equalsEpsilon(
              z,
              n.Cartesian3.ZERO,
              a.CesiumMath.EPSILON6,
            ))
          ) {
            var m = e._ellipsoid.geodeticSurfaceNormal(z, q);
            n.Cartesian3.dot(s, m) < 0 &&
              ((s = n.Cartesian3.negate(s, s)),
              (u = n.Cartesian3.negate(u, u)));
          }
          var g =
              E.CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction(
                z,
                u,
                d,
              ),
            b = E.CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction(
              z,
              u,
              d,
            );
          t.tangent && (p = n.Cartesian3.clone(u, p)),
            t.bitangent && (y = n.Cartesian3.clone(d, y));
          var v = V.PolygonGeometryLibrary.polygonsFromHierarchy(r, g, !1),
            C = v.hierarchy,
            x = v.polygons;
          if (0 !== C.length) {
            l = C[0].outerRing;
            for (
              var P = o.BoundingSphere.fromPoints(l),
                F = V.PolygonGeometryLibrary.computeBoundingRectangle(
                  s,
                  b,
                  l,
                  i,
                  M,
                ),
                G = [],
                L = 0;
              L < x.length;
              L++
            ) {
              var T = new w.GeometryInstance({
                geometry: J(x[L], t, F, i, b, s, p, y),
              });
              G.push(T);
            }
            var k = h.GeometryPipeline.combineInstances(G)[0];
            (k.attributes.position.values = new Float64Array(
              k.attributes.position.values,
            )),
              (k.indices = f.IndexDatatype.createTypedArray(
                k.attributes.position.values.length / 3,
                k.indices,
              ));
            var D = k.attributes;
            return (
              t.position || delete D.position,
              new c.Geometry({
                attributes: D,
                indices: k.indices,
                primitiveType: k.primitiveType,
                boundingSphere: P,
              })
            );
          }
        }
      }
    }),
    function (t, a) {
      return e.defined(a) && (t = W.unpack(t, a)), W.createGeometry(t);
    }
  );
});
