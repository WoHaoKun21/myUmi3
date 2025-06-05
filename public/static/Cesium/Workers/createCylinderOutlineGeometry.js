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
  './CylinderGeometryLibrary-8c0fda9f',
], function (e, t, i, r, a, o, n, s, u, f, d, b, c, l, m, p, y, h, _, v) {
  var A = new a.Cartesian2();
  function O(i) {
    var r = (i = e.defaultValue(i, e.defaultValue.EMPTY_OBJECT)).length,
      a = i.topRadius,
      o = i.bottomRadius,
      n = e.defaultValue(i.slices, 128),
      s = Math.max(e.defaultValue(i.numberOfVerticalLines, 16), 0);
    if (
      (t.Check.typeOf.number('options.positions', r),
      t.Check.typeOf.number('options.topRadius', a),
      t.Check.typeOf.number('options.bottomRadius', o),
      t.Check.typeOf.number.greaterThanOrEquals('options.slices', n, 3),
      e.defined(i.offsetAttribute) &&
        i.offsetAttribute === _.GeometryOffsetAttribute.TOP)
    )
      throw new t.DeveloperError(
        'GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.',
      );
    (this._length = r),
      (this._topRadius = a),
      (this._bottomRadius = o),
      (this._slices = n),
      (this._numberOfVerticalLines = s),
      (this._offsetAttribute = i.offsetAttribute),
      (this._workerName = 'createCylinderOutlineGeometry');
  }
  (O.packedLength = 6),
    (O.pack = function (i, r, a) {
      return (
        t.Check.typeOf.object('value', i),
        t.Check.defined('array', r),
        (a = e.defaultValue(a, 0)),
        (r[a++] = i._length),
        (r[a++] = i._topRadius),
        (r[a++] = i._bottomRadius),
        (r[a++] = i._slices),
        (r[a++] = i._numberOfVerticalLines),
        (r[a] = e.defaultValue(i._offsetAttribute, -1)),
        r
      );
    });
  var C = {
    length: void 0,
    topRadius: void 0,
    bottomRadius: void 0,
    slices: void 0,
    numberOfVerticalLines: void 0,
    offsetAttribute: void 0,
  };
  return (
    (O.unpack = function (i, r, a) {
      t.Check.defined('array', i), (r = e.defaultValue(r, 0));
      var o = i[r++],
        n = i[r++],
        s = i[r++],
        u = i[r++],
        f = i[r++],
        d = i[r];
      return e.defined(a)
        ? ((a._length = o),
          (a._topRadius = n),
          (a._bottomRadius = s),
          (a._slices = u),
          (a._numberOfVerticalLines = f),
          (a._offsetAttribute = -1 === d ? void 0 : d),
          a)
        : ((C.length = o),
          (C.topRadius = n),
          (C.bottomRadius = s),
          (C.slices = u),
          (C.numberOfVerticalLines = f),
          (C.offsetAttribute = -1 === d ? void 0 : d),
          new O(C));
    }),
    (O.createGeometry = function (t) {
      var i = t._length,
        n = t._topRadius,
        s = t._bottomRadius,
        u = t._slices,
        c = t._numberOfVerticalLines;
      if (!(i <= 0 || n < 0 || s < 0 || (0 === n && 0 === s))) {
        var l,
          m = 2 * u,
          O = v.CylinderGeometryLibrary.computePositions(i, n, s, u, !1),
          C = 2 * u;
        if (0 < c) {
          var R = Math.min(c, u);
          (l = Math.round(u / R)), (C += R);
        }
        var G,
          g = y.IndexDatatype.createTypedArray(m, 2 * C),
          V = 0;
        for (G = 0; G < u - 1; G++)
          (g[V++] = G),
            (g[V++] = G + 1),
            (g[V++] = G + u),
            (g[V++] = G + 1 + u);
        if (
          ((g[V++] = u - 1),
          (g[V++] = 0),
          (g[V++] = u + u - 1),
          (g[V++] = u),
          0 < c)
        )
          for (G = 0; G < u; G += l) (g[V++] = G), (g[V++] = G + u);
        var k = new p.GeometryAttributes();
        (k.position = new d.GeometryAttribute({
          componentDatatype: f.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: O,
        })),
          (A.x = 0.5 * i),
          (A.y = Math.max(s, n));
        var L = new o.BoundingSphere(
          r.Cartesian3.ZERO,
          a.Cartesian2.magnitude(A),
        );
        if (e.defined(t._offsetAttribute)) {
          i = O.length;
          var w = new Uint8Array(i / 3),
            D = t._offsetAttribute === _.GeometryOffsetAttribute.NONE ? 0 : 1;
          h.arrayFill(w, D),
            (k.applyOffset = new d.GeometryAttribute({
              componentDatatype: f.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: w,
            }));
        }
        return new d.Geometry({
          attributes: k,
          indices: g,
          primitiveType: b.PrimitiveType.LINES,
          boundingSphere: L,
          offsetAttribute: t._offsetAttribute,
        });
      }
    }),
    function (t, i) {
      return e.defined(i) && (t = O.unpack(t, i)), O.createGeometry(t);
    }
  );
});
