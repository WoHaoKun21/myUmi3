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
  './VertexFormat-fe4db402',
  './EllipsoidGeometry-d710e362',
], function (e, t, r, i, a, o, n, s, c, d, l, m, u, p, y, f, G, b, k, v, h) {
  function x(t) {
    var r = e.defaultValue(t.radius, 1),
      a = {
        radii: new i.Cartesian3(r, r, r),
        stackPartitions: t.stackPartitions,
        slicePartitions: t.slicePartitions,
        vertexFormat: t.vertexFormat,
      };
    (this._ellipsoidGeometry = new h.EllipsoidGeometry(a)),
      (this._workerName = 'createSphereGeometry');
  }
  (x.packedLength = h.EllipsoidGeometry.packedLength),
    (x.pack = function (e, r, i) {
      return (
        t.Check.typeOf.object('value', e),
        h.EllipsoidGeometry.pack(e._ellipsoidGeometry, r, i)
      );
    });
  var F = new h.EllipsoidGeometry(),
    P = {
      radius: void 0,
      radii: new i.Cartesian3(),
      vertexFormat: new v.VertexFormat(),
      stackPartitions: void 0,
      slicePartitions: void 0,
    };
  return (
    (x.unpack = function (t, r, a) {
      var o = h.EllipsoidGeometry.unpack(t, r, F);
      return (
        (P.vertexFormat = v.VertexFormat.clone(
          o._vertexFormat,
          P.vertexFormat,
        )),
        (P.stackPartitions = o._stackPartitions),
        (P.slicePartitions = o._slicePartitions),
        e.defined(a)
          ? (i.Cartesian3.clone(o._radii, P.radii),
            (a._ellipsoidGeometry = new h.EllipsoidGeometry(P)),
            a)
          : ((P.radius = o._radii.x), new x(P))
      );
    }),
    (x.createGeometry = function (e) {
      return h.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry);
    }),
    function (t, r) {
      return e.defined(r) && (t = x.unpack(t, r)), x.createGeometry(t);
    }
  );
});
