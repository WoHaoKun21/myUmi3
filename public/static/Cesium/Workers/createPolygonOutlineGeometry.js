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
  './arrayFill-9766fb2e',
  './GeometryOffsetAttribute-999fc023',
  './GeometryInstance-9ddb8c73',
  './arrayRemoveDuplicates-2869246d',
  './EllipsoidTangentPlane-9c25b2da',
  './ArcType-66bc286a',
  './EllipsoidRhumbLine-6ca4b1e6',
  './earcut-2.2.1-b404d9e6',
  './PolygonPipeline-cc78b34e',
  './PolygonGeometryLibrary-ec05daff',
], function (
  e,
  t,
  i,
  r,
  o,
  n,
  a,
  l,
  y,
  s,
  p,
  u,
  d,
  c,
  f,
  h,
  g,
  b,
  m,
  P,
  v,
  E,
  A,
  G,
  _,
  T,
  H,
  C,
  L,
  O,
  D,
  I,
) {
  var w = [],
    x = [];
  function k(e, t, i, r, o) {
    var n,
      a,
      l = H.EllipsoidTangentPlane.fromPoints(t, e).projectPointsOntoPlane(t, w);
    D.PolygonPipeline.computeWindingOrder2D(l) === D.WindingOrder.CLOCKWISE &&
      (l.reverse(), (t = t.slice().reverse()));
    var y = t.length,
      d = 0;
    if (r)
      for (n = new Float64Array(2 * y * 3), a = 0; a < y; a++) {
        var c = t[a],
          f = t[(a + 1) % y];
        (n[d++] = c.x),
          (n[d++] = c.y),
          (n[d++] = c.z),
          (n[d++] = f.x),
          (n[d++] = f.y),
          (n[d++] = f.z);
      }
    else {
      var g = 0;
      if (o === C.ArcType.GEODESIC)
        for (a = 0; a < y; a++)
          g += I.PolygonGeometryLibrary.subdivideLineCount(
            t[a],
            t[(a + 1) % y],
            i,
          );
      else if (o === C.ArcType.RHUMB)
        for (a = 0; a < y; a++)
          g += I.PolygonGeometryLibrary.subdivideRhumbLineCount(
            e,
            t[a],
            t[(a + 1) % y],
            i,
          );
      for (n = new Float64Array(3 * g), a = 0; a < y; a++) {
        var b;
        o === C.ArcType.GEODESIC
          ? (b = I.PolygonGeometryLibrary.subdivideLine(
              t[a],
              t[(a + 1) % y],
              i,
              x,
            ))
          : o === C.ArcType.RHUMB &&
            (b = I.PolygonGeometryLibrary.subdivideRhumbLine(
              e,
              t[a],
              t[(a + 1) % y],
              i,
              x,
            ));
        for (var m = b.length, v = 0; v < m; ++v) n[d++] = b[v];
      }
    }
    var E = 2 * (y = n.length / 3),
      A = P.IndexDatatype.createTypedArray(y, E);
    for (a = d = 0; a < y - 1; a++) (A[d++] = a), (A[d++] = a + 1);
    return (
      (A[d++] = y - 1),
      (A[d++] = 0),
      new _.GeometryInstance({
        geometry: new p.Geometry({
          attributes: new h.GeometryAttributes({
            position: new p.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: n,
            }),
          }),
          indices: A,
          primitiveType: u.PrimitiveType.LINES,
        }),
      })
    );
  }
  function S(e, t, i, r, o) {
    var n,
      a,
      l = H.EllipsoidTangentPlane.fromPoints(t, e).projectPointsOntoPlane(t, w);
    D.PolygonPipeline.computeWindingOrder2D(l) === D.WindingOrder.CLOCKWISE &&
      (l.reverse(), (t = t.slice().reverse()));
    var y = t.length,
      d = new Array(y),
      c = 0;
    if (r)
      for (n = new Float64Array(2 * y * 3 * 2), a = 0; a < y; ++a) {
        d[a] = c / 3;
        var f = t[a],
          g = t[(a + 1) % y];
        (n[c++] = f.x),
          (n[c++] = f.y),
          (n[c++] = f.z),
          (n[c++] = g.x),
          (n[c++] = g.y),
          (n[c++] = g.z);
      }
    else {
      var b = 0;
      if (o === C.ArcType.GEODESIC)
        for (a = 0; a < y; a++)
          b += I.PolygonGeometryLibrary.subdivideLineCount(
            t[a],
            t[(a + 1) % y],
            i,
          );
      else if (o === C.ArcType.RHUMB)
        for (a = 0; a < y; a++)
          b += I.PolygonGeometryLibrary.subdivideRhumbLineCount(
            e,
            t[a],
            t[(a + 1) % y],
            i,
          );
      for (n = new Float64Array(3 * b * 2), a = 0; a < y; ++a) {
        var m;
        (d[a] = c / 3),
          o === C.ArcType.GEODESIC
            ? (m = I.PolygonGeometryLibrary.subdivideLine(
                t[a],
                t[(a + 1) % y],
                i,
                x,
              ))
            : o === C.ArcType.RHUMB &&
              (m = I.PolygonGeometryLibrary.subdivideRhumbLine(
                e,
                t[a],
                t[(a + 1) % y],
                i,
                x,
              ));
        for (var v = m.length, E = 0; E < v; ++E) n[c++] = m[E];
      }
    }
    y = n.length / 6;
    var A = d.length,
      G = 2 * (2 * y + A),
      T = P.IndexDatatype.createTypedArray(y, G);
    for (a = c = 0; a < y; ++a)
      (T[c++] = a),
        (T[c++] = (a + 1) % y),
        (T[c++] = a + y),
        (T[c++] = ((a + 1) % y) + y);
    for (a = 0; a < A; a++) {
      var L = d[a];
      (T[c++] = L), (T[c++] = L + y);
    }
    return new _.GeometryInstance({
      geometry: new p.Geometry({
        attributes: new h.GeometryAttributes({
          position: new p.GeometryAttribute({
            componentDatatype: s.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: n,
          }),
        }),
        indices: T,
        primitiveType: u.PrimitiveType.LINES,
      }),
    });
  }
  function R(r) {
    if (
      (t.Check.typeOf.object('options', r),
      t.Check.typeOf.object('options.polygonHierarchy', r.polygonHierarchy),
      r.perPositionHeight && e.defined(r.height))
    )
      throw new t.DeveloperError(
        'Cannot use both options.perPositionHeight and options.height',
      );
    if (
      e.defined(r.arcType) &&
      r.arcType !== C.ArcType.GEODESIC &&
      r.arcType !== C.ArcType.RHUMB
    )
      throw new t.DeveloperError(
        'Invalid arcType. Valid options are ArcType.GEODESIC and ArcType.RHUMB.',
      );
    var n = r.polygonHierarchy,
      a = e.defaultValue(r.ellipsoid, o.Ellipsoid.WGS84),
      l = e.defaultValue(r.granularity, i.CesiumMath.RADIANS_PER_DEGREE),
      y = e.defaultValue(r.perPositionHeight, !1),
      s = y && e.defined(r.extrudedHeight),
      p = e.defaultValue(r.arcType, C.ArcType.GEODESIC),
      u = e.defaultValue(r.height, 0),
      d = e.defaultValue(r.extrudedHeight, u);
    if (!s) {
      var c = Math.max(u, d);
      (d = Math.min(u, d)), (u = c);
    }
    (this._ellipsoid = o.Ellipsoid.clone(a)),
      (this._granularity = l),
      (this._height = u),
      (this._extrudedHeight = d),
      (this._arcType = p),
      (this._polygonHierarchy = n),
      (this._perPositionHeight = y),
      (this._perPositionHeightExtrude = s),
      (this._offsetAttribute = r.offsetAttribute),
      (this._workerName = 'createPolygonOutlineGeometry'),
      (this.packedLength =
        I.PolygonGeometryLibrary.computeHierarchyPackedLength(n) +
        o.Ellipsoid.packedLength +
        8);
  }
  R.pack = function (i, r, n) {
    return (
      t.Check.typeOf.object('value', i),
      t.Check.defined('array', r),
      (n = e.defaultValue(n, 0)),
      (n = I.PolygonGeometryLibrary.packPolygonHierarchy(
        i._polygonHierarchy,
        r,
        n,
      )),
      o.Ellipsoid.pack(i._ellipsoid, r, n),
      (n += o.Ellipsoid.packedLength),
      (r[n++] = i._height),
      (r[n++] = i._extrudedHeight),
      (r[n++] = i._granularity),
      (r[n++] = i._perPositionHeightExtrude ? 1 : 0),
      (r[n++] = i._perPositionHeight ? 1 : 0),
      (r[n++] = i._arcType),
      (r[n++] = e.defaultValue(i._offsetAttribute, -1)),
      (r[n] = i.packedLength),
      r
    );
  };
  var M = o.Ellipsoid.clone(o.Ellipsoid.UNIT_SPHERE),
    N = { polygonHierarchy: {} };
  return (
    (R.unpack = function (i, r, n) {
      t.Check.defined('array', i), (r = e.defaultValue(r, 0));
      var a = I.PolygonGeometryLibrary.unpackPolygonHierarchy(i, r);
      (r = a.startingIndex), delete a.startingIndex;
      var l = o.Ellipsoid.unpack(i, r, M);
      r += o.Ellipsoid.packedLength;
      var y = i[r++],
        s = i[r++],
        p = i[r++],
        u = 1 === i[r++],
        d = 1 === i[r++],
        c = i[r++],
        f = i[r++],
        h = i[r];
      return (
        e.defined(n) || (n = new R(N)),
        (n._polygonHierarchy = a),
        (n._ellipsoid = o.Ellipsoid.clone(l, n._ellipsoid)),
        (n._height = y),
        (n._extrudedHeight = s),
        (n._granularity = p),
        (n._perPositionHeight = d),
        (n._perPositionHeightExtrude = u),
        (n._arcType = c),
        (n._offsetAttribute = -1 === f ? void 0 : f),
        (n.packedLength = h),
        n
      );
    }),
    (R.fromPositions = function (i) {
      return (
        (i = e.defaultValue(i, e.defaultValue.EMPTY_OBJECT)),
        t.Check.defined('options.positions', i.positions),
        new R({
          polygonHierarchy: { positions: i.positions },
          height: i.height,
          extrudedHeight: i.extrudedHeight,
          ellipsoid: i.ellipsoid,
          granularity: i.granularity,
          perPositionHeight: i.perPositionHeight,
          arcType: i.arcType,
          offsetAttribute: i.offsetAttribute,
        })
      );
    }),
    (R.createGeometry = function (t) {
      var r = t._ellipsoid,
        o = t._granularity,
        a = t._polygonHierarchy,
        l = t._perPositionHeight,
        y = t._arcType,
        u = I.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(a, !l, r);
      if (0 !== u.length) {
        var d,
          c,
          f,
          h = [],
          g = i.CesiumMath.chordLength(o, r.maximumRadius),
          m = t._height,
          P = t._extrudedHeight;
        if (
          t._perPositionHeightExtrude ||
          !i.CesiumMath.equalsEpsilon(m, P, 0, i.CesiumMath.EPSILON2)
        )
          for (f = 0; f < u.length; f++) {
            if (
              (((d = S(r, u[f], g, l, y)).geometry =
                I.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(
                  d.geometry,
                  m,
                  P,
                  r,
                  l,
                )),
              e.defined(t._offsetAttribute))
            ) {
              var v = d.geometry.attributes.position.values.length / 3,
                E = new Uint8Array(v);
              (E =
                t._offsetAttribute === G.GeometryOffsetAttribute.TOP
                  ? A.arrayFill(E, 1, 0, v / 2)
                  : ((c =
                      t._offsetAttribute === G.GeometryOffsetAttribute.NONE
                        ? 0
                        : 1),
                    A.arrayFill(E, c))),
                (d.geometry.attributes.applyOffset = new p.GeometryAttribute({
                  componentDatatype: s.ComponentDatatype.UNSIGNED_BYTE,
                  componentsPerAttribute: 1,
                  values: E,
                }));
            }
            h.push(d);
          }
        else
          for (f = 0; f < u.length; f++) {
            if (
              (((d = k(r, u[f], g, l, y)).geometry.attributes.position.values =
                D.PolygonPipeline.scaleToGeodeticHeight(
                  d.geometry.attributes.position.values,
                  m,
                  r,
                  !l,
                )),
              e.defined(t._offsetAttribute))
            ) {
              var _ = d.geometry.attributes.position.values.length,
                T = new Uint8Array(_ / 3);
              (c =
                t._offsetAttribute === G.GeometryOffsetAttribute.NONE ? 0 : 1),
                A.arrayFill(T, c),
                (d.geometry.attributes.applyOffset = new p.GeometryAttribute({
                  componentDatatype: s.ComponentDatatype.UNSIGNED_BYTE,
                  componentsPerAttribute: 1,
                  values: T,
                }));
            }
            h.push(d);
          }
        var H = b.GeometryPipeline.combineInstances(h)[0],
          C = n.BoundingSphere.fromVertices(H.attributes.position.values);
        return new p.Geometry({
          attributes: H.attributes,
          indices: H.indices,
          primitiveType: H.primitiveType,
          boundingSphere: C,
          offsetAttribute: t._offsetAttribute,
        });
      }
    }),
    function (t, i) {
      return (
        e.defined(i) && (t = R.unpack(t, i)),
        (t._ellipsoid = o.Ellipsoid.clone(t._ellipsoid)),
        R.createGeometry(t)
      );
    }
  );
});
