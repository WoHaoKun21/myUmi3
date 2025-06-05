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
  './EllipsoidRhumbLine-6ca4b1e6',
  './earcut-2.2.1-b404d9e6',
  './PolygonPipeline-cc78b34e',
  './RectangleGeometryLibrary-c89ec784',
], function (
  e,
  t,
  i,
  r,
  a,
  n,
  o,
  l,
  u,
  s,
  c,
  d,
  p,
  f,
  g,
  h,
  y,
  b,
  m,
  v,
  _,
  E,
  A,
) {
  var w = new n.BoundingSphere(),
    G = new n.BoundingSphere(),
    R = new r.Cartesian3(),
    P = new a.Rectangle();
  function D(e, t) {
    var i = e._ellipsoid,
      r = t.height,
      a = t.width,
      n = t.northCap,
      o = t.southCap,
      l = r,
      u = 2,
      p = 0,
      f = 4;
    n && ((u -= 1), (l -= 1), (p += 1), (f -= 2)),
      o && ((u -= 1), (l -= 1), (p += 1), (f -= 2)),
      (p += u * a + 2 * l - f);
    var g,
      b = new Float64Array(3 * p),
      m = 0,
      v = 0,
      _ = R;
    if (n)
      A.RectangleGeometryLibrary.computePosition(t, i, !1, v, 0, _),
        (b[m++] = _.x),
        (b[m++] = _.y),
        (b[m++] = _.z);
    else
      for (g = 0; g < a; g++)
        A.RectangleGeometryLibrary.computePosition(t, i, !1, v, g, _),
          (b[m++] = _.x),
          (b[m++] = _.y),
          (b[m++] = _.z);
    for (g = a - 1, v = 1; v < r; v++)
      A.RectangleGeometryLibrary.computePosition(t, i, !1, v, g, _),
        (b[m++] = _.x),
        (b[m++] = _.y),
        (b[m++] = _.z);
    if (((v = r - 1), !o))
      for (g = a - 2; 0 <= g; g--)
        A.RectangleGeometryLibrary.computePosition(t, i, !1, v, g, _),
          (b[m++] = _.x),
          (b[m++] = _.y),
          (b[m++] = _.z);
    for (g = 0, v = r - 2; 0 < v; v--)
      A.RectangleGeometryLibrary.computePosition(t, i, !1, v, g, _),
        (b[m++] = _.x),
        (b[m++] = _.y),
        (b[m++] = _.z);
    for (
      var E = (b.length / 3) * 2,
        w = y.IndexDatatype.createTypedArray(b.length / 3, E),
        G = 0,
        P = 0;
      P < b.length / 3 - 1;
      P++
    )
      (w[G++] = P), (w[G++] = P + 1);
    (w[G++] = b.length / 3 - 1), (w[G++] = 0);
    var D = new c.Geometry({
      attributes: new h.GeometryAttributes(),
      primitiveType: d.PrimitiveType.LINES,
    });
    return (
      (D.attributes.position = new c.GeometryAttribute({
        componentDatatype: s.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: b,
      })),
      (D.indices = w),
      D
    );
  }
  function C(r) {
    var n = (r = e.defaultValue(r, e.defaultValue.EMPTY_OBJECT)).rectangle,
      o = e.defaultValue(r.granularity, i.CesiumMath.RADIANS_PER_DEGREE),
      l = e.defaultValue(r.ellipsoid, a.Ellipsoid.WGS84),
      u = e.defaultValue(r.rotation, 0);
    if (!e.defined(n)) throw new t.DeveloperError('rectangle is required.');
    if ((a.Rectangle.validate(n), n.north < n.south))
      throw new t.DeveloperError(
        'options.rectangle.north must be greater than options.rectangle.south',
      );
    var s = e.defaultValue(r.height, 0),
      c = e.defaultValue(r.extrudedHeight, s);
    (this._rectangle = a.Rectangle.clone(n)),
      (this._granularity = o),
      (this._ellipsoid = l),
      (this._surfaceHeight = Math.max(s, c)),
      (this._rotation = u),
      (this._extrudedHeight = Math.min(s, c)),
      (this._offsetAttribute = r.offsetAttribute),
      (this._workerName = 'createRectangleOutlineGeometry');
  }
  (C.packedLength = a.Rectangle.packedLength + a.Ellipsoid.packedLength + 5),
    (C.pack = function (i, r, n) {
      if (!e.defined(i)) throw new t.DeveloperError('value is required');
      if (!e.defined(r)) throw new t.DeveloperError('array is required');
      return (
        (n = e.defaultValue(n, 0)),
        a.Rectangle.pack(i._rectangle, r, n),
        (n += a.Rectangle.packedLength),
        a.Ellipsoid.pack(i._ellipsoid, r, n),
        (n += a.Ellipsoid.packedLength),
        (r[n++] = i._granularity),
        (r[n++] = i._surfaceHeight),
        (r[n++] = i._rotation),
        (r[n++] = i._extrudedHeight),
        (r[n] = e.defaultValue(i._offsetAttribute, -1)),
        r
      );
    });
  var L = new a.Rectangle(),
    S = a.Ellipsoid.clone(a.Ellipsoid.UNIT_SPHERE),
    x = {
      rectangle: L,
      ellipsoid: S,
      granularity: void 0,
      height: void 0,
      rotation: void 0,
      extrudedHeight: void 0,
      offsetAttribute: void 0,
    };
  C.unpack = function (i, r, n) {
    if (!e.defined(i)) throw new t.DeveloperError('array is required');
    r = e.defaultValue(r, 0);
    var o = a.Rectangle.unpack(i, r, L);
    r += a.Rectangle.packedLength;
    var l = a.Ellipsoid.unpack(i, r, S);
    r += a.Ellipsoid.packedLength;
    var u = i[r++],
      s = i[r++],
      c = i[r++],
      d = i[r++],
      p = i[r];
    return e.defined(n)
      ? ((n._rectangle = a.Rectangle.clone(o, n._rectangle)),
        (n._ellipsoid = a.Ellipsoid.clone(l, n._ellipsoid)),
        (n._surfaceHeight = s),
        (n._rotation = c),
        (n._extrudedHeight = d),
        (n._offsetAttribute = -1 === p ? void 0 : p),
        n)
      : ((x.granularity = u),
        (x.height = s),
        (x.rotation = c),
        (x.extrudedHeight = d),
        (x.offsetAttribute = -1 === p ? void 0 : p),
        new C(x));
  };
  var H = new r.Cartographic();
  return (
    (C.createGeometry = function (t) {
      var r,
        a,
        o = t._rectangle,
        l = t._ellipsoid,
        u = A.RectangleGeometryLibrary.computeOptions(
          o,
          t._granularity,
          t._rotation,
          0,
          P,
          H,
        );
      if (
        !i.CesiumMath.equalsEpsilon(o.north, o.south, i.CesiumMath.EPSILON10) &&
        !i.CesiumMath.equalsEpsilon(o.east, o.west, i.CesiumMath.EPSILON10)
      ) {
        var p,
          f = t._surfaceHeight,
          g = t._extrudedHeight;
        if (i.CesiumMath.equalsEpsilon(f, g, 0, i.CesiumMath.EPSILON2)) {
          if (
            (((r = D(t, u)).attributes.position.values =
              E.PolygonPipeline.scaleToGeodeticHeight(
                r.attributes.position.values,
                f,
                l,
                !1,
              )),
            e.defined(t._offsetAttribute))
          ) {
            var h = r.attributes.position.values.length,
              v = new Uint8Array(h / 3);
            (p = t._offsetAttribute === m.GeometryOffsetAttribute.NONE ? 0 : 1),
              b.arrayFill(v, p),
              (r.attributes.applyOffset = new c.GeometryAttribute({
                componentDatatype: s.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: v,
              }));
          }
          a = n.BoundingSphere.fromRectangle3D(o, l, f);
        } else {
          if (
            ((r = (function (e, t) {
              var i = e._surfaceHeight,
                r = e._extrudedHeight,
                a = e._ellipsoid,
                n = r,
                o = i,
                l = D(e, t),
                u = t.height,
                s = t.width,
                c = E.PolygonPipeline.scaleToGeodeticHeight(
                  l.attributes.position.values,
                  o,
                  a,
                  !1,
                ),
                d = c.length,
                p = new Float64Array(2 * d);
              p.set(c);
              var f = E.PolygonPipeline.scaleToGeodeticHeight(
                l.attributes.position.values,
                n,
                a,
              );
              p.set(f, d), (l.attributes.position.values = p);
              var g = t.northCap,
                h = t.southCap,
                b = 4;
              g && (b -= 1), h && (b -= 1);
              var m = 2 * (p.length / 3 + b),
                v = y.IndexDatatype.createTypedArray(p.length / 3, m);
              d = p.length / 6;
              for (var _, A = 0, w = 0; w < d - 1; w++)
                (v[A++] = w),
                  (v[A++] = w + 1),
                  (v[A++] = w + d),
                  (v[A++] = w + d + 1);
              if (
                ((v[A++] = d - 1),
                (v[A++] = 0),
                (v[A++] = d + d - 1),
                (v[A++] = d),
                (v[A++] = 0),
                (v[A++] = d),
                g)
              )
                _ = u - 1;
              else {
                var G = s - 1;
                (v[A++] = G), (v[A++] = G + d), (_ = s + u - 2);
              }
              if (((v[A++] = _), (v[A++] = _ + d), !h)) {
                var R = s + _ - 1;
                (v[A++] = R), (v[A] = R + d);
              }
              return (l.indices = v), l;
            })(t, u)),
            e.defined(t._offsetAttribute))
          ) {
            var _ = r.attributes.position.values.length / 3,
              R = new Uint8Array(_);
            (R =
              t._offsetAttribute === m.GeometryOffsetAttribute.TOP
                ? b.arrayFill(R, 1, 0, _ / 2)
                : ((p =
                    t._offsetAttribute === m.GeometryOffsetAttribute.NONE
                      ? 0
                      : 1),
                  b.arrayFill(R, p))),
              (r.attributes.applyOffset = new c.GeometryAttribute({
                componentDatatype: s.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: R,
              }));
          }
          var C = n.BoundingSphere.fromRectangle3D(o, l, f, G),
            L = n.BoundingSphere.fromRectangle3D(o, l, g, w);
          a = n.BoundingSphere.union(C, L);
        }
        return new c.Geometry({
          attributes: r.attributes,
          indices: r.indices,
          primitiveType: d.PrimitiveType.LINES,
          boundingSphere: a,
          offsetAttribute: t._offsetAttribute,
        });
      }
    }),
    function (t, i) {
      return (
        e.defined(i) && (t = C.unpack(t, i)),
        (t._ellipsoid = a.Ellipsoid.clone(t._ellipsoid)),
        (t._rectangle = a.Rectangle.clone(t._rectangle)),
        C.createGeometry(t)
      );
    }
  );
});
