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
  './arrayFill-9766fb2e',
  './GeometryOffsetAttribute-999fc023',
  './EllipseGeometryLibrary-d33811c0',
  './EllipseOutlineGeometry-7f7cabe3',
], function (e, i, t, r, l, n, a, o, s, c, u, d, m, p, y, f, h, b, G, _, g) {
  function E(t) {
    var r = (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)).radius;
    i.Check.typeOf.number('radius', r);
    var l = {
      center: t.center,
      semiMajorAxis: r,
      semiMinorAxis: r,
      ellipsoid: t.ellipsoid,
      height: t.height,
      extrudedHeight: t.extrudedHeight,
      granularity: t.granularity,
      numberOfVerticalLines: t.numberOfVerticalLines,
    };
    (this._ellipseGeometry = new g.EllipseOutlineGeometry(l)),
      (this._workerName = 'createCircleOutlineGeometry');
  }
  (E.packedLength = g.EllipseOutlineGeometry.packedLength),
    (E.pack = function (e, t, r) {
      return (
        i.Check.typeOf.object('value', e),
        g.EllipseOutlineGeometry.pack(e._ellipseGeometry, t, r)
      );
    });
  var O = new g.EllipseOutlineGeometry({
      center: new r.Cartesian3(),
      semiMajorAxis: 1,
      semiMinorAxis: 1,
    }),
    x = {
      center: new r.Cartesian3(),
      radius: void 0,
      ellipsoid: l.Ellipsoid.clone(l.Ellipsoid.UNIT_SPHERE),
      height: void 0,
      extrudedHeight: void 0,
      granularity: void 0,
      numberOfVerticalLines: void 0,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
    };
  return (
    (E.unpack = function (i, t, n) {
      var a = g.EllipseOutlineGeometry.unpack(i, t, O);
      return (
        (x.center = r.Cartesian3.clone(a._center, x.center)),
        (x.ellipsoid = l.Ellipsoid.clone(a._ellipsoid, x.ellipsoid)),
        (x.height = a._height),
        (x.extrudedHeight = a._extrudedHeight),
        (x.granularity = a._granularity),
        (x.numberOfVerticalLines = a._numberOfVerticalLines),
        e.defined(n)
          ? ((x.semiMajorAxis = a._semiMajorAxis),
            (x.semiMinorAxis = a._semiMinorAxis),
            (n._ellipseGeometry = new g.EllipseOutlineGeometry(x)),
            n)
          : ((x.radius = a._semiMajorAxis), new E(x))
      );
    }),
    (E.createGeometry = function (e) {
      return g.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry);
    }),
    function (i, t) {
      return (
        e.defined(t) && (i = E.unpack(i, t)),
        (i._ellipseGeometry._center = r.Cartesian3.clone(
          i._ellipseGeometry._center,
        )),
        (i._ellipseGeometry._ellipsoid = l.Ellipsoid.clone(
          i._ellipseGeometry._ellipsoid,
        )),
        E.createGeometry(i)
      );
    }
  );
});
