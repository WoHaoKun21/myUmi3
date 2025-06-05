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
], function (e, t, a, n, r, i, o, u, s, f, m, c, d, b, y, p, C, l) {
  var h = new n.Cartesian3();
  function A(a) {
    var r = (a = e.defaultValue(a, e.defaultValue.EMPTY_OBJECT)).minimum,
      i = a.maximum;
    if (
      (t.Check.typeOf.object('min', r),
      t.Check.typeOf.object('max', i),
      e.defined(a.offsetAttribute) &&
        a.offsetAttribute === l.GeometryOffsetAttribute.TOP)
    )
      throw new t.DeveloperError(
        'GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.',
      );
    (this._min = n.Cartesian3.clone(r)),
      (this._max = n.Cartesian3.clone(i)),
      (this._offsetAttribute = a.offsetAttribute),
      (this._workerName = 'createBoxOutlineGeometry');
  }
  (A.fromDimensions = function (a) {
    var r = (a = e.defaultValue(a, e.defaultValue.EMPTY_OBJECT)).dimensions;
    t.Check.typeOf.object('dimensions', r),
      t.Check.typeOf.number.greaterThanOrEquals('dimensions.x', r.x, 0),
      t.Check.typeOf.number.greaterThanOrEquals('dimensions.y', r.y, 0),
      t.Check.typeOf.number.greaterThanOrEquals('dimensions.z', r.z, 0);
    var i = n.Cartesian3.multiplyByScalar(r, 0.5, new n.Cartesian3());
    return new A({
      minimum: n.Cartesian3.negate(i, new n.Cartesian3()),
      maximum: i,
      offsetAttribute: a.offsetAttribute,
    });
  }),
    (A.fromAxisAlignedBoundingBox = function (e) {
      return (
        t.Check.typeOf.object('boundindBox', e),
        new A({ minimum: e.minimum, maximum: e.maximum })
      );
    }),
    (A.packedLength = 2 * n.Cartesian3.packedLength + 1),
    (A.pack = function (a, r, i) {
      return (
        t.Check.typeOf.object('value', a),
        t.Check.defined('array', r),
        (i = e.defaultValue(i, 0)),
        n.Cartesian3.pack(a._min, r, i),
        n.Cartesian3.pack(a._max, r, i + n.Cartesian3.packedLength),
        (r[i + 2 * n.Cartesian3.packedLength] = e.defaultValue(
          a._offsetAttribute,
          -1,
        )),
        r
      );
    });
  var k = new n.Cartesian3(),
    x = new n.Cartesian3(),
    O = { minimum: k, maximum: x, offsetAttribute: void 0 };
  return (
    (A.unpack = function (a, r, i) {
      t.Check.defined('array', a), (r = e.defaultValue(r, 0));
      var o = n.Cartesian3.unpack(a, r, k),
        u = n.Cartesian3.unpack(a, r + n.Cartesian3.packedLength, x),
        s = a[r + 2 * n.Cartesian3.packedLength];
      return e.defined(i)
        ? ((i._min = n.Cartesian3.clone(o, i._min)),
          (i._max = n.Cartesian3.clone(u, i._max)),
          (i._offsetAttribute = -1 === s ? void 0 : s),
          i)
        : ((O.offsetAttribute = -1 === s ? void 0 : s), new A(O));
    }),
    (A.createGeometry = function (t) {
      var a = t._min,
        r = t._max;
      if (!n.Cartesian3.equals(a, r)) {
        var o = new p.GeometryAttributes(),
          u = new Uint16Array(24),
          s = new Float64Array(24);
        (s[0] = a.x),
          (s[1] = a.y),
          (s[2] = a.z),
          (s[3] = r.x),
          (s[4] = a.y),
          (s[5] = a.z),
          (s[6] = r.x),
          (s[7] = r.y),
          (s[8] = a.z),
          (s[9] = a.x),
          (s[10] = r.y),
          (s[11] = a.z),
          (s[12] = a.x),
          (s[13] = a.y),
          (s[14] = r.z),
          (s[15] = r.x),
          (s[16] = a.y),
          (s[17] = r.z),
          (s[18] = r.x),
          (s[19] = r.y),
          (s[20] = r.z),
          (s[21] = a.x),
          (s[22] = r.y),
          (s[23] = r.z),
          (o.position = new m.GeometryAttribute({
            componentDatatype: f.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: s,
          })),
          (u[0] = 4),
          (u[1] = 5),
          (u[2] = 5),
          (u[3] = 6),
          (u[4] = 6),
          (u[5] = 7),
          (u[6] = 7),
          (u[7] = 4),
          (u[8] = 0),
          (u[9] = 1),
          (u[10] = 1),
          (u[11] = 2),
          (u[12] = 2),
          (u[13] = 3),
          (u[14] = 3),
          (u[15] = 0),
          (u[16] = 0),
          (u[17] = 4),
          (u[18] = 1),
          (u[19] = 5),
          (u[20] = 2),
          (u[21] = 6),
          (u[22] = 3),
          (u[23] = 7);
        var d = n.Cartesian3.subtract(r, a, h),
          b = 0.5 * n.Cartesian3.magnitude(d);
        if (e.defined(t._offsetAttribute)) {
          var y = s.length,
            A = new Uint8Array(y / 3),
            k = t._offsetAttribute === l.GeometryOffsetAttribute.NONE ? 0 : 1;
          C.arrayFill(A, k),
            (o.applyOffset = new m.GeometryAttribute({
              componentDatatype: f.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: A,
            }));
        }
        return new m.Geometry({
          attributes: o,
          indices: u,
          primitiveType: c.PrimitiveType.LINES,
          boundingSphere: new i.BoundingSphere(n.Cartesian3.ZERO, b),
          offsetAttribute: t._offsetAttribute,
        });
      }
    }),
    function (t, a) {
      return e.defined(a) && (t = A.unpack(t, a)), A.createGeometry(t);
    }
  );
});
