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
  './Plane-2bcb9154',
  './VertexFormat-fe4db402',
  './FrustumGeometry-237f769a',
], function (e, t, r, a, n, c, o, u, b, i, m, d, f, s, y, G, p, C, h) {
  return function (t, r) {
    return (
      e.defined(r) && (t = h.FrustumGeometry.unpack(t, r)),
      h.FrustumGeometry.createGeometry(t)
    );
  };
});
