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
  './arrayFill-9766fb2e',
  './GeometryOffsetAttribute-999fc023',
  './VertexFormat-fe4db402',
  './EllipseGeometryLibrary-d33811c0',
  './GeometryInstance-9ddb8c73',
  './EllipseGeometry-736628fb',
], function (
  e,
  t,
  i,
  r,
  o,
  a,
  n,
  l,
  s,
  d,
  m,
  c,
  u,
  p,
  y,
  _,
  h,
  G,
  f,
  x,
  b,
  g,
  v,
  E,
  C,
  w,
  A,
  M,
) {
  function F(i) {
    var r = (i = e.defaultValue(i, e.defaultValue.EMPTY_OBJECT)).radius;
    t.Check.typeOf.number('radius', r);
    var o = {
      center: i.center,
      semiMajorAxis: r,
      semiMinorAxis: r,
      ellipsoid: i.ellipsoid,
      height: i.height,
      extrudedHeight: i.extrudedHeight,
      granularity: i.granularity,
      vertexFormat: i.vertexFormat,
      stRotation: i.stRotation,
      shadowVolume: i.shadowVolume,
    };
    (this._ellipseGeometry = new M.EllipseGeometry(o)),
      (this._workerName = 'createCircleGeometry');
  }
  (F.packedLength = M.EllipseGeometry.packedLength),
    (F.pack = function (e, i, r) {
      return (
        t.Check.typeOf.object('value', e),
        M.EllipseGeometry.pack(e._ellipseGeometry, i, r)
      );
    });
  var V = new M.EllipseGeometry({
      center: new r.Cartesian3(),
      semiMajorAxis: 1,
      semiMinorAxis: 1,
    }),
    k = {
      center: new r.Cartesian3(),
      radius: void 0,
      ellipsoid: o.Ellipsoid.clone(o.Ellipsoid.UNIT_SPHERE),
      height: void 0,
      extrudedHeight: void 0,
      granularity: void 0,
      vertexFormat: new C.VertexFormat(),
      stRotation: void 0,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
      shadowVolume: void 0,
    };
  return (
    (F.unpack = function (t, i, a) {
      var n = M.EllipseGeometry.unpack(t, i, V);
      return (
        (k.center = r.Cartesian3.clone(n._center, k.center)),
        (k.ellipsoid = o.Ellipsoid.clone(n._ellipsoid, k.ellipsoid)),
        (k.height = n._height),
        (k.extrudedHeight = n._extrudedHeight),
        (k.granularity = n._granularity),
        (k.vertexFormat = C.VertexFormat.clone(
          n._vertexFormat,
          k.vertexFormat,
        )),
        (k.stRotation = n._stRotation),
        (k.shadowVolume = n._shadowVolume),
        e.defined(a)
          ? ((k.semiMajorAxis = n._semiMajorAxis),
            (k.semiMinorAxis = n._semiMinorAxis),
            (a._ellipseGeometry = new M.EllipseGeometry(k)),
            a)
          : ((k.radius = n._semiMajorAxis), new F(k))
      );
    }),
    (F.createGeometry = function (e) {
      return M.EllipseGeometry.createGeometry(e._ellipseGeometry);
    }),
    (F.createShadowVolume = function (e, t, i) {
      var r = e._ellipseGeometry._granularity,
        o = e._ellipseGeometry._ellipsoid,
        a = t(r, o),
        n = i(r, o);
      return new F({
        center: e._ellipseGeometry._center,
        radius: e._ellipseGeometry._semiMajorAxis,
        ellipsoid: o,
        stRotation: e._ellipseGeometry._stRotation,
        granularity: r,
        extrudedHeight: a,
        height: n,
        vertexFormat: C.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
      });
    }),
    Object.defineProperties(F.prototype, {
      rectangle: {
        get: function () {
          return this._ellipseGeometry.rectangle;
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return this._ellipseGeometry.textureCoordinateRotationPoints;
        },
      },
    }),
    function (t, i) {
      return (
        e.defined(i) && (t = F.unpack(t, i)),
        (t._ellipseGeometry._center = r.Cartesian3.clone(
          t._ellipseGeometry._center,
        )),
        (t._ellipseGeometry._ellipsoid = o.Ellipsoid.clone(
          t._ellipseGeometry._ellipsoid,
        )),
        F.createGeometry(t)
      );
    }
  );
});
