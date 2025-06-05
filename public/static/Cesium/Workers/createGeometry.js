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
  './PrimitivePipeline-b43a6119',
  './WebMercatorProjection-bc9aa7fe',
  './createTaskProcessorWorker',
], function (
  e,
  r,
  t,
  n,
  a,
  i,
  o,
  c,
  s,
  b,
  f,
  u,
  d,
  m,
  l,
  p,
  y,
  C,
  P,
  v,
  h,
  k,
  G,
  T,
  W,
) {
  var g = {};
  function A(r) {
    var t = g[r];
    return (
      e.defined(t) ||
        ('object' == typeof exports
          ? (g[t] = t = require('Workers/' + r))
          : require(['Workers/' + r], function (e) {
              g[(t = e)] = e;
            })),
      t
    );
  }
  return W(function (r, t) {
    for (
      var n = r.subTasks, a = n.length, i = new Array(a), o = 0;
      o < a;
      o++
    ) {
      var c = n[o],
        s = c.geometry,
        b = c.moduleName;
      if (e.defined(b)) {
        var f = A(b);
        i[o] = f(s, c.offset);
      } else i[o] = s;
    }
    return e.when.all(i, function (e) {
      return G.PrimitivePipeline.packCreateGeometryResults(e, t);
    });
  });
});
