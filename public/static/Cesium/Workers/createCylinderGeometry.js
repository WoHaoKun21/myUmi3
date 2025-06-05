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
  './CylinderGeometryLibrary-8c0fda9f',
  './CylinderGeometry-dc527951',
], function (e, t, r, a, n, i, c, o, d, b, f, y, m, u, C, l, G, s, p, h, A, D) {
  return function (t, r) {
    return (
      e.defined(r) && (t = D.CylinderGeometry.unpack(t, r)),
      D.CylinderGeometry.createGeometry(t)
    );
  };
});
