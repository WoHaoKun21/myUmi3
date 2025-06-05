define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './ComponentDatatype-5862616f',
  './GeometryAttribute-2243653a',
  './PrimitiveType-97893bc7',
  './GeometryAttributes-aacecde6',
  './IndexDatatype-9435b55f',
  './arrayFill-9766fb2e',
  './GeometryOffsetAttribute-999fc023',
  './EllipseGeometryLibrary-d33811c0',
], function (e, t, i, r, a, n, o, s, l, u, d, f, p, c, m) {
  var h = new a.Cartesian3(),
    y = new a.Cartesian3(),
    b = new o.BoundingSphere(),
    A = new o.BoundingSphere();
  function _(e) {
    var o = (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)).center,
      s = t.defaultValue(e.ellipsoid, n.Ellipsoid.WGS84),
      l = e.semiMajorAxis,
      u = e.semiMinorAxis,
      d = t.defaultValue(e.granularity, r.CesiumMath.RADIANS_PER_DEGREE);
    if (!t.defined(o)) throw new i.DeveloperError('center is required.');
    if (!t.defined(l)) throw new i.DeveloperError('semiMajorAxis is required.');
    if (!t.defined(u)) throw new i.DeveloperError('semiMinorAxis is required.');
    if (l < u)
      throw new i.DeveloperError(
        'semiMajorAxis must be greater than or equal to the semiMinorAxis.',
      );
    if (d <= 0)
      throw new i.DeveloperError('granularity must be greater than zero.');
    var f = t.defaultValue(e.height, 0),
      p = t.defaultValue(e.extrudedHeight, f);
    (this._center = a.Cartesian3.clone(o)),
      (this._semiMajorAxis = l),
      (this._semiMinorAxis = u),
      (this._ellipsoid = n.Ellipsoid.clone(s)),
      (this._rotation = t.defaultValue(e.rotation, 0)),
      (this._height = Math.max(p, f)),
      (this._granularity = d),
      (this._extrudedHeight = Math.min(p, f)),
      (this._numberOfVerticalLines = Math.max(
        t.defaultValue(e.numberOfVerticalLines, 16),
        0,
      )),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = 'createEllipseOutlineGeometry');
  }
  (_.packedLength = a.Cartesian3.packedLength + n.Ellipsoid.packedLength + 8),
    (_.pack = function (e, r, o) {
      if (!t.defined(e)) throw new i.DeveloperError('value is required');
      if (!t.defined(r)) throw new i.DeveloperError('array is required');
      return (
        (o = t.defaultValue(o, 0)),
        a.Cartesian3.pack(e._center, r, o),
        (o += a.Cartesian3.packedLength),
        n.Ellipsoid.pack(e._ellipsoid, r, o),
        (o += n.Ellipsoid.packedLength),
        (r[o++] = e._semiMajorAxis),
        (r[o++] = e._semiMinorAxis),
        (r[o++] = e._rotation),
        (r[o++] = e._height),
        (r[o++] = e._granularity),
        (r[o++] = e._extrudedHeight),
        (r[o++] = e._numberOfVerticalLines),
        (r[o] = t.defaultValue(e._offsetAttribute, -1)),
        r
      );
    });
  var g = new a.Cartesian3(),
    v = new n.Ellipsoid(),
    E = {
      center: g,
      ellipsoid: v,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
      rotation: void 0,
      height: void 0,
      granularity: void 0,
      extrudedHeight: void 0,
      numberOfVerticalLines: void 0,
      offsetAttribute: void 0,
    };
  (_.unpack = function (e, r, o) {
    if (!t.defined(e)) throw new i.DeveloperError('array is required');
    r = t.defaultValue(r, 0);
    var s = a.Cartesian3.unpack(e, r, g);
    r += a.Cartesian3.packedLength;
    var l = n.Ellipsoid.unpack(e, r, v);
    r += n.Ellipsoid.packedLength;
    var u = e[r++],
      d = e[r++],
      f = e[r++],
      p = e[r++],
      c = e[r++],
      m = e[r++],
      h = e[r++],
      y = e[r];
    return t.defined(o)
      ? ((o._center = a.Cartesian3.clone(s, o._center)),
        (o._ellipsoid = n.Ellipsoid.clone(l, o._ellipsoid)),
        (o._semiMajorAxis = u),
        (o._semiMinorAxis = d),
        (o._rotation = f),
        (o._height = p),
        (o._granularity = c),
        (o._extrudedHeight = m),
        (o._numberOfVerticalLines = h),
        (o._offsetAttribute = -1 === y ? void 0 : y),
        o)
      : ((E.height = p),
        (E.extrudedHeight = m),
        (E.granularity = c),
        (E.rotation = f),
        (E.semiMajorAxis = u),
        (E.semiMinorAxis = d),
        (E.numberOfVerticalLines = h),
        (E.offsetAttribute = -1 === y ? void 0 : y),
        new _(E));
  }),
    (_.createGeometry = function (e) {
      if (!(e._semiMajorAxis <= 0 || e._semiMinorAxis <= 0)) {
        var i = e._height,
          n = e._extrudedHeight,
          _ = !r.CesiumMath.equalsEpsilon(i, n, 0, r.CesiumMath.EPSILON2);
        e._center = e._ellipsoid.scaleToGeodeticSurface(e._center, e._center);
        var g,
          v = {
            center: e._center,
            semiMajorAxis: e._semiMajorAxis,
            semiMinorAxis: e._semiMinorAxis,
            ellipsoid: e._ellipsoid,
            rotation: e._rotation,
            height: i,
            granularity: e._granularity,
            numberOfVerticalLines: e._numberOfVerticalLines,
          };
        if (_)
          (v.extrudedHeight = n),
            (v.offsetAttribute = e._offsetAttribute),
            (g = (function (e) {
              var i = e.center,
                n = e.ellipsoid,
                u = e.semiMajorAxis,
                y = a.Cartesian3.multiplyByScalar(
                  n.geodeticSurfaceNormal(i, h),
                  e.height,
                  h,
                );
              (b.center = a.Cartesian3.add(i, y, b.center)),
                (b.radius = u),
                (y = a.Cartesian3.multiplyByScalar(
                  n.geodeticSurfaceNormal(i, y),
                  e.extrudedHeight,
                  y,
                )),
                (A.center = a.Cartesian3.add(i, y, A.center)),
                (A.radius = u);
              var _ = m.EllipseGeometryLibrary.computeEllipsePositions(
                  e,
                  !1,
                  !0,
                ).outerPositions,
                g = new d.GeometryAttributes({
                  position: new l.GeometryAttribute({
                    componentDatatype: s.ComponentDatatype.DOUBLE,
                    componentsPerAttribute: 3,
                    values: m.EllipseGeometryLibrary.raisePositionsToHeight(
                      _,
                      e,
                      !0,
                    ),
                  }),
                });
              _ = g.position.values;
              var v = o.BoundingSphere.union(b, A),
                E = _.length / 3;
              if (t.defined(e.offsetAttribute)) {
                var x = new Uint8Array(E);
                if (e.offsetAttribute === c.GeometryOffsetAttribute.TOP)
                  x = p.arrayFill(x, 1, 0, E / 2);
                else {
                  var M =
                    e.offsetAttribute === c.GeometryOffsetAttribute.NONE
                      ? 0
                      : 1;
                  x = p.arrayFill(x, M);
                }
                g.applyOffset = new l.GeometryAttribute({
                  componentDatatype: s.ComponentDatatype.UNSIGNED_BYTE,
                  componentsPerAttribute: 1,
                  values: x,
                });
              }
              var w = t.defaultValue(e.numberOfVerticalLines, 16);
              w = r.CesiumMath.clamp(w, 0, E / 2);
              var C = f.IndexDatatype.createTypedArray(E, 2 * E + 2 * w);
              E /= 2;
              var D,
                G,
                L = 0;
              for (D = 0; D < E; ++D)
                (C[L++] = D),
                  (C[L++] = (D + 1) % E),
                  (C[L++] = D + E),
                  (C[L++] = ((D + 1) % E) + E);
              if (0 < w) {
                var O = Math.min(w, E);
                G = Math.round(E / O);
                var S = Math.min(G * w, E);
                for (D = 0; D < S; D += G) (C[L++] = D), (C[L++] = D + E);
              }
              return { boundingSphere: v, attributes: g, indices: C };
            })(v));
        else if (
          ((g = (function (e) {
            var t = e.center;
            (y = a.Cartesian3.multiplyByScalar(
              e.ellipsoid.geodeticSurfaceNormal(t, y),
              e.height,
              y,
            )),
              (y = a.Cartesian3.add(t, y, y));
            for (
              var i = new o.BoundingSphere(y, e.semiMajorAxis),
                r = m.EllipseGeometryLibrary.computeEllipsePositions(
                  e,
                  !1,
                  !0,
                ).outerPositions,
                n = new d.GeometryAttributes({
                  position: new l.GeometryAttribute({
                    componentDatatype: s.ComponentDatatype.DOUBLE,
                    componentsPerAttribute: 3,
                    values: m.EllipseGeometryLibrary.raisePositionsToHeight(
                      r,
                      e,
                      !1,
                    ),
                  }),
                }),
                u = r.length / 3,
                p = f.IndexDatatype.createTypedArray(u, 2 * u),
                c = 0,
                h = 0;
              h < u;
              ++h
            )
              (p[c++] = h), (p[c++] = (h + 1) % u);
            return { boundingSphere: i, attributes: n, indices: p };
          })(v)),
          t.defined(e._offsetAttribute))
        ) {
          var E = g.attributes.position.values.length,
            x = new Uint8Array(E / 3),
            M = e._offsetAttribute === c.GeometryOffsetAttribute.NONE ? 0 : 1;
          p.arrayFill(x, M),
            (g.attributes.applyOffset = new l.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: x,
            }));
        }
        return new l.Geometry({
          attributes: g.attributes,
          indices: g.indices,
          primitiveType: u.PrimitiveType.LINES,
          boundingSphere: g.boundingSphere,
          offsetAttribute: e._offsetAttribute,
        });
      }
    }),
    (e.EllipseOutlineGeometry = _);
});
