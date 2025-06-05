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
], function (e, t, n, r, a, i, o, c, u, d, y, p, b, f, m, s) {
  function h() {
    this._workerName = 'createPlaneOutlineGeometry';
  }
  (h.packedLength = 0),
    (h.pack = function (e, n) {
      return t.Check.defined('value', e), t.Check.defined('array', n), n;
    }),
    (h.unpack = function (n, r, a) {
      return t.Check.defined('array', n), e.defined(a) ? a : new h();
    });
  var C = new r.Cartesian3(-0.5, -0.5, 0),
    w = new r.Cartesian3(0.5, 0.5, 0);
  return (
    (h.createGeometry = function () {
      var e = new s.GeometryAttributes(),
        t = new Uint16Array(8),
        n = new Float64Array(12);
      return (
        (n[0] = C.x),
        (n[1] = C.y),
        (n[2] = C.z),
        (n[3] = w.x),
        (n[4] = C.y),
        (n[5] = C.z),
        (n[6] = w.x),
        (n[7] = w.y),
        (n[8] = C.z),
        (n[9] = C.x),
        (n[10] = w.y),
        (n[11] = C.z),
        (e.position = new y.GeometryAttribute({
          componentDatatype: d.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: n,
        })),
        (t[0] = 0),
        (t[1] = 1),
        (t[2] = 1),
        (t[3] = 2),
        (t[4] = 2),
        (t[5] = 3),
        (t[6] = 3),
        (t[7] = 0),
        new y.Geometry({
          attributes: e,
          indices: t,
          primitiveType: p.PrimitiveType.LINES,
          boundingSphere: new i.BoundingSphere(r.Cartesian3.ZERO, Math.sqrt(2)),
        })
      );
    }),
    function (t, n) {
      return e.defined(n) && (t = h.unpack(t, n)), h.createGeometry(t);
    }
  );
});
