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
  './GeometryInstance-9ddb8c73',
  './arrayRemoveDuplicates-2869246d',
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
  r,
  t,
  n,
  o,
  i,
  a,
  c,
  y,
  l,
  p,
  s,
  d,
  u,
  b,
  m,
  f,
  g,
  h,
  P,
  v,
  G,
  C,
  k,
  L,
  T,
  E,
  H,
  w,
  A,
  D,
  I,
) {
  function _(e) {
    for (
      var r = e.length,
        t = new Float64Array(3 * r),
        n = P.IndexDatatype.createTypedArray(r, 2 * r),
        o = 0,
        i = 0,
        a = 0;
      a < r;
      a++
    ) {
      var c = e[a];
      (t[o++] = c.x),
        (t[o++] = c.y),
        (t[o++] = c.z),
        (n[i++] = a),
        (n[i++] = (a + 1) % r);
    }
    var y = new m.GeometryAttributes({
      position: new p.GeometryAttribute({
        componentDatatype: l.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: t,
      }),
    });
    return new p.Geometry({
      attributes: y,
      indices: n,
      primitiveType: s.PrimitiveType.LINES,
    });
  }
  function O(t) {
    var n = (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT))
      .polygonHierarchy;
    r.Check.defined('options.polygonHierarchy', n),
      (this._polygonHierarchy = n),
      (this._workerName = 'createCoplanarPolygonOutlineGeometry'),
      (this.packedLength =
        I.PolygonGeometryLibrary.computeHierarchyPackedLength(n) + 1);
  }
  (O.fromPositions = function (t) {
    return (
      (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)),
      r.Check.defined('options.positions', t.positions),
      new O({ polygonHierarchy: { positions: t.positions } })
    );
  }),
    (O.pack = function (t, n, o) {
      return (
        r.Check.typeOf.object('value', t),
        r.Check.defined('array', n),
        (o = e.defaultValue(o, 0)),
        (n[
          (o = I.PolygonGeometryLibrary.packPolygonHierarchy(
            t._polygonHierarchy,
            n,
            o,
          ))
        ] = t.packedLength),
        n
      );
    });
  var B = { polygonHierarchy: {} };
  return (
    (O.unpack = function (t, n, o) {
      r.Check.defined('array', t), (n = e.defaultValue(n, 0));
      var i = I.PolygonGeometryLibrary.unpackPolygonHierarchy(t, n);
      (n = i.startingIndex), delete i.startingIndex;
      var a = t[n];
      return (
        e.defined(o) || (o = new O(B)),
        (o._polygonHierarchy = i),
        (o.packedLength = a),
        o
      );
    }),
    (O.createGeometry = function (e) {
      var r = e._polygonHierarchy,
        t = r.positions;
      if (
        !(
          (t = k.arrayRemoveDuplicates(t, n.Cartesian3.equalsEpsilon, !0))
            .length < 3
        ) &&
        E.CoplanarPolygonGeometryLibrary.validOutline(t)
      ) {
        var o = I.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(r, !1);
        if (0 !== o.length) {
          for (var a = [], c = 0; c < o.length; c++) {
            var y = new C.GeometryInstance({ geometry: _(o[c]) });
            a.push(y);
          }
          var l = g.GeometryPipeline.combineInstances(a)[0],
            s = i.BoundingSphere.fromPoints(r.positions);
          return new p.Geometry({
            attributes: l.attributes,
            indices: l.indices,
            primitiveType: l.primitiveType,
            boundingSphere: s,
          });
        }
      }
    }),
    function (r, t) {
      return (
        e.defined(t) && (r = O.unpack(r, t)),
        (r._ellipsoid = o.Ellipsoid.clone(r._ellipsoid)),
        O.createGeometry(r)
      );
    }
  );
});
