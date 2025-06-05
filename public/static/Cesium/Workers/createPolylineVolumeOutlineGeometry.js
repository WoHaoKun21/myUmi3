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
  i,
  r,
  n,
  t,
  o,
  a,
  l,
  s,
  p,
  d,
  c,
  u,
  y,
  h,
  f,
  g,
  v,
  m,
  b,
  E,
  P,
  _,
  C,
  k,
  D,
  w,
  L,
) {
  function T(o) {
    var a = (o = e.defaultValue(o, e.defaultValue.EMPTY_OBJECT))
        .polylinePositions,
      l = o.shapePositions;
    if (!e.defined(a))
      throw new i.DeveloperError('options.polylinePositions is required.');
    if (!e.defined(l))
      throw new i.DeveloperError('options.shapePositions is required.');
    (this._positions = a),
      (this._shape = l),
      (this._ellipsoid = t.Ellipsoid.clone(
        e.defaultValue(o.ellipsoid, t.Ellipsoid.WGS84),
      )),
      (this._cornerType = e.defaultValue(o.cornerType, D.CornerType.ROUNDED)),
      (this._granularity = e.defaultValue(
        o.granularity,
        r.CesiumMath.RADIANS_PER_DEGREE,
      )),
      (this._workerName = 'createPolylineVolumeOutlineGeometry');
    var s = 1 + a.length * n.Cartesian3.packedLength;
    (s += 1 + l.length * t.Cartesian2.packedLength),
      (this.packedLength = s + t.Ellipsoid.packedLength + 2);
  }
  T.pack = function (r, o, a) {
    if (!e.defined(r)) throw new i.DeveloperError('value is required');
    if (!e.defined(o)) throw new i.DeveloperError('array is required');
    var l;
    a = e.defaultValue(a, 0);
    var s = r._positions,
      p = s.length;
    for (o[a++] = p, l = 0; l < p; ++l, a += n.Cartesian3.packedLength)
      n.Cartesian3.pack(s[l], o, a);
    var d = r._shape;
    for (
      p = d.length, o[a++] = p, l = 0;
      l < p;
      ++l, a += t.Cartesian2.packedLength
    )
      t.Cartesian2.pack(d[l], o, a);
    return (
      t.Ellipsoid.pack(r._ellipsoid, o, a),
      (a += t.Ellipsoid.packedLength),
      (o[a++] = r._cornerType),
      (o[a] = r._granularity),
      o
    );
  };
  var G = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    R = {
      polylinePositions: void 0,
      shapePositions: void 0,
      ellipsoid: G,
      height: void 0,
      cornerType: void 0,
      granularity: void 0,
    };
  T.unpack = function (r, o, a) {
    if (!e.defined(r)) throw new i.DeveloperError('array is required');
    var l;
    o = e.defaultValue(o, 0);
    var s = r[o++],
      p = new Array(s);
    for (l = 0; l < s; ++l, o += n.Cartesian3.packedLength)
      p[l] = n.Cartesian3.unpack(r, o);
    s = r[o++];
    var d = new Array(s);
    for (l = 0; l < s; ++l, o += t.Cartesian2.packedLength)
      d[l] = t.Cartesian2.unpack(r, o);
    var c = t.Ellipsoid.unpack(r, o, G);
    o += t.Ellipsoid.packedLength;
    var u = r[o++],
      y = r[o];
    return e.defined(a)
      ? ((a._positions = p),
        (a._shape = d),
        (a._ellipsoid = t.Ellipsoid.clone(c, a._ellipsoid)),
        (a._cornerType = u),
        (a._granularity = y),
        a)
      : ((R.polylinePositions = p),
        (R.shapePositions = d),
        (R.cornerType = u),
        (R.granularity = y),
        new T(R));
  };
  var V = new E.BoundingRectangle();
  return (
    (T.createGeometry = function (e) {
      var i = e._positions,
        r = b.arrayRemoveDuplicates(i, n.Cartesian3.equalsEpsilon),
        t = e._shape;
      if (
        ((t = D.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(t)),
        !(r.length < 2 || t.length < 3))
      ) {
        k.PolygonPipeline.computeWindingOrder2D(t) ===
          k.WindingOrder.CLOCKWISE && t.reverse();
        var a = E.BoundingRectangle.fromPoints(t, V);
        return (function (e, i) {
          var r = new f.GeometryAttributes();
          r.position = new d.GeometryAttribute({
            componentDatatype: p.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: e,
          });
          var n,
            t,
            a = i.length,
            l = r.position.values.length / 3,
            s = e.length / 3 / a,
            u = g.IndexDatatype.createTypedArray(l, 2 * a * (s + 1)),
            y = 0,
            h = (n = 0) * a;
          for (t = 0; t < a - 1; t++) (u[y++] = t + h), (u[y++] = t + h + 1);
          for (
            u[y++] = a - 1 + h, u[y++] = h, h = (n = s - 1) * a, t = 0;
            t < a - 1;
            t++
          )
            (u[y++] = t + h), (u[y++] = t + h + 1);
          for (u[y++] = a - 1 + h, u[y++] = h, n = 0; n < s - 1; n++) {
            var v = a * n,
              m = v + a;
            for (t = 0; t < a; t++) (u[y++] = t + v), (u[y++] = t + m);
          }
          return new d.Geometry({
            attributes: r,
            indices: g.IndexDatatype.createTypedArray(l, u),
            boundingSphere: o.BoundingSphere.fromVertices(e),
            primitiveType: c.PrimitiveType.LINES,
          });
        })(D.PolylineVolumeGeometryLibrary.computePositions(r, t, a, e, !1), t);
      }
    }),
    function (i, r) {
      return (
        e.defined(r) && (i = T.unpack(i, r)),
        (i._ellipsoid = t.Ellipsoid.clone(i._ellipsoid)),
        T.createGeometry(i)
      );
    }
  );
});
