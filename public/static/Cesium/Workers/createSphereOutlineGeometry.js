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
  './EllipsoidOutlineGeometry-dcd209b1',
], function (e, i, t, r, n, a, o, s, d, l, c, u, p, m, y, b, f, G, k, v) {
  function h(i) {
    var t = e.defaultValue(i.radius, 1),
      n = {
        radii: new r.Cartesian3(t, t, t),
        stackPartitions: i.stackPartitions,
        slicePartitions: i.slicePartitions,
        subdivisions: i.subdivisions,
      };
    (this._ellipsoidGeometry = new v.EllipsoidOutlineGeometry(n)),
      (this._workerName = 'createSphereOutlineGeometry');
  }
  (h.packedLength = v.EllipsoidOutlineGeometry.packedLength),
    (h.pack = function (e, t, r) {
      return (
        i.Check.typeOf.object('value', e),
        v.EllipsoidOutlineGeometry.pack(e._ellipsoidGeometry, t, r)
      );
    });
  var O = new v.EllipsoidOutlineGeometry(),
    P = {
      radius: void 0,
      radii: new r.Cartesian3(),
      stackPartitions: void 0,
      slicePartitions: void 0,
      subdivisions: void 0,
    };
  return (
    (h.unpack = function (i, t, n) {
      var a = v.EllipsoidOutlineGeometry.unpack(i, t, O);
      return (
        (P.stackPartitions = a._stackPartitions),
        (P.slicePartitions = a._slicePartitions),
        (P.subdivisions = a._subdivisions),
        e.defined(n)
          ? (r.Cartesian3.clone(a._radii, P.radii),
            (n._ellipsoidGeometry = new v.EllipsoidOutlineGeometry(P)),
            n)
          : ((P.radius = a._radii.x), new h(P))
      );
    }),
    (h.createGeometry = function (e) {
      return v.EllipsoidOutlineGeometry.createGeometry(e._ellipsoidGeometry);
    }),
    function (i, t) {
      return e.defined(t) && (i = h.unpack(i, t)), h.createGeometry(i);
    }
  );
});
