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
  './VertexFormat-fe4db402',
], function (e, t, r, a, n, o, i, u, m, c, p, y, b, s, f, d, l) {
  function v(t) {
    t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT);
    var r = e.defaultValue(t.vertexFormat, l.VertexFormat.DEFAULT);
    (this._vertexFormat = r), (this._workerName = 'createPlaneGeometry');
  }
  (v.packedLength = l.VertexFormat.packedLength),
    (v.pack = function (r, a, n) {
      return (
        t.Check.typeOf.object('value', r),
        t.Check.defined('array', a),
        (n = e.defaultValue(n, 0)),
        l.VertexFormat.pack(r._vertexFormat, a, n),
        a
      );
    });
  var A = new l.VertexFormat(),
    F = { vertexFormat: A };
  v.unpack = function (r, a, n) {
    t.Check.defined('array', r), (a = e.defaultValue(a, 0));
    var o = l.VertexFormat.unpack(r, a, A);
    return e.defined(n)
      ? ((n._vertexFormat = l.VertexFormat.clone(o, n._vertexFormat)), n)
      : new v(F);
  };
  var w = new a.Cartesian3(-0.5, -0.5, 0),
    x = new a.Cartesian3(0.5, 0.5, 0);
  return (
    (v.createGeometry = function (e) {
      var t,
        r,
        n = e._vertexFormat,
        i = new d.GeometryAttributes();
      if (n.position) {
        if (
          (((r = new Float64Array(12))[0] = w.x),
          (r[1] = w.y),
          (r[2] = 0),
          (r[3] = x.x),
          (r[4] = w.y),
          (r[5] = 0),
          (r[6] = x.x),
          (r[7] = x.y),
          (r[8] = 0),
          (r[9] = w.x),
          (r[10] = x.y),
          (r[11] = 0),
          (i.position = new p.GeometryAttribute({
            componentDatatype: c.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: r,
          })),
          n.normal)
        ) {
          var u = new Float32Array(12);
          (u[0] = 0),
            (u[1] = 0),
            (u[2] = 1),
            (u[3] = 0),
            (u[4] = 0),
            (u[5] = 1),
            (u[6] = 0),
            (u[7] = 0),
            (u[8] = 1),
            (u[9] = 0),
            (u[10] = 0),
            (u[11] = 1),
            (i.normal = new p.GeometryAttribute({
              componentDatatype: c.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: u,
            }));
        }
        if (n.st) {
          var m = new Float32Array(8);
          (m[0] = 0),
            (m[1] = 0),
            (m[2] = 1),
            (m[3] = 0),
            (m[4] = 1),
            (m[5] = 1),
            (m[6] = 0),
            (m[7] = 1),
            (i.st = new p.GeometryAttribute({
              componentDatatype: c.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: m,
            }));
        }
        if (n.tangent) {
          var b = new Float32Array(12);
          (b[0] = 1),
            (b[1] = 0),
            (b[2] = 0),
            (b[3] = 1),
            (b[4] = 0),
            (b[5] = 0),
            (b[6] = 1),
            (b[7] = 0),
            (b[8] = 0),
            (b[9] = 1),
            (b[10] = 0),
            (b[11] = 0),
            (i.tangent = new p.GeometryAttribute({
              componentDatatype: c.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: b,
            }));
        }
        if (n.bitangent) {
          var s = new Float32Array(12);
          (s[0] = 0),
            (s[1] = 1),
            (s[2] = 0),
            (s[3] = 0),
            (s[4] = 1),
            (s[5] = 0),
            (s[6] = 0),
            (s[7] = 1),
            (s[8] = 0),
            (s[9] = 0),
            (s[10] = 1),
            (s[11] = 0),
            (i.bitangent = new p.GeometryAttribute({
              componentDatatype: c.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: s,
            }));
        }
        ((t = new Uint16Array(6))[0] = 0),
          (t[1] = 1),
          (t[2] = 2),
          (t[3] = 0),
          (t[4] = 2),
          (t[5] = 3);
      }
      return new p.Geometry({
        attributes: i,
        indices: t,
        primitiveType: y.PrimitiveType.TRIANGLES,
        boundingSphere: new o.BoundingSphere(a.Cartesian3.ZERO, Math.sqrt(2)),
      });
    }),
    function (t, r) {
      return e.defined(r) && (t = v.unpack(t, r)), v.createGeometry(t);
    }
  );
});
