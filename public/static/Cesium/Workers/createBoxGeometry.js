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
  './arrayFill-9766fb2e',
  './GeometryOffsetAttribute-999fc023',
  './VertexFormat-fe4db402',
  './BoxGeometry-92274cfb',
], function (e, t, r, a, o, n, c, i, b, f, u, d, m, y, s, G, p, C, h, l) {
  return function (t, r) {
    return (
      e.defined(r) && (t = l.BoxGeometry.unpack(t, r)),
      l.BoxGeometry.createGeometry(t)
    );
  };
});
