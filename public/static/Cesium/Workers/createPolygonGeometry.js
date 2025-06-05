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
  './VertexFormat-fe4db402',
  './GeometryInstance-9ddb8c73',
  './arrayRemoveDuplicates-2869246d',
  './BoundingRectangle-3d4f3d01',
  './EllipsoidTangentPlane-9c25b2da',
  './ArcType-66bc286a',
  './EllipsoidRhumbLine-6ca4b1e6',
  './earcut-2.2.1-b404d9e6',
  './PolygonPipeline-cc78b34e',
  './PolygonGeometryLibrary-ec05daff',
  './EllipsoidGeodesic-db2069b3',
], function (
  e,
  t,
  r,
  o,
  a,
  i,
  n,
  s,
  l,
  u,
  p,
  c,
  y,
  d,
  g,
  m,
  h,
  f,
  b,
  v,
  _,
  P,
  C,
  T,
  w,
  x,
  A,
  E,
  I,
  G,
  H,
  V,
  F,
  O,
  N,
) {
  var R = new o.Cartographic(),
    D = new o.Cartographic();
  function L(e, t, r, o) {
    var a = o.cartesianToCartographic(e, R).height,
      i = o.cartesianToCartographic(t, D);
    (i.height = a), o.cartographicToCartesian(i, t);
    var n = o.cartesianToCartographic(r, D);
    (n.height = a - 100), o.cartographicToCartesian(n, r);
  }
  var M = new E.BoundingRectangle(),
    S = new o.Cartesian3(),
    k = new o.Cartesian3(),
    B = new o.Cartesian3(),
    z = new o.Cartesian3(),
    U = new o.Cartesian3(),
    Y = new o.Cartesian3(),
    j = new o.Cartesian3(),
    W = new o.Cartesian3(),
    Q = new o.Cartesian3(),
    q = new a.Cartesian2(),
    K = new a.Cartesian2(),
    Z = new o.Cartesian3(),
    J = new d.Quaternion(),
    X = new i.Matrix3(),
    $ = new i.Matrix3();
  function ee(t) {
    var n = t.vertexFormat,
      s = t.geometry,
      l = t.shadowVolume,
      c = s.attributes.position.values,
      y = c.length,
      g = t.wall,
      m = t.top || g,
      h = t.bottom || g;
    if (n.st || n.normal || n.tangent || n.bitangent || l) {
      var f = t.boundingRectangle,
        b = t.tangentPlane,
        v = t.ellipsoid,
        _ = t.stRotation,
        P = t.perPositionHeight,
        w = q;
      (w.x = f.x), (w.y = f.y);
      var x,
        A = n.st ? new Float32Array((y / 3) * 2) : void 0;
      n.normal &&
        (x = P && m && !g ? s.attributes.normal.values : new Float32Array(y));
      var E = n.tangent ? new Float32Array(y) : void 0,
        I = n.bitangent ? new Float32Array(y) : void 0,
        G = l ? new Float32Array(y) : void 0,
        H = 0,
        V = 0,
        F = k,
        O = B,
        N = z,
        R = !0,
        D = X,
        M = $;
      if (0 !== _) {
        var ee = d.Quaternion.fromAxisAngle(b._plane.normal, _, J);
        (D = i.Matrix3.fromQuaternion(ee, D)),
          (ee = d.Quaternion.fromAxisAngle(b._plane.normal, -_, J)),
          (M = i.Matrix3.fromQuaternion(ee, M));
      } else
        (D = i.Matrix3.clone(i.Matrix3.IDENTITY, D)),
          (M = i.Matrix3.clone(i.Matrix3.IDENTITY, M));
      var te = 0,
        re = 0;
      m && h && ((te = y / 2), (re = y / 3), (y /= 2));
      for (var oe = 0; oe < y; oe += 3) {
        var ae = o.Cartesian3.fromArray(c, oe, Z);
        if (n.st) {
          var ie = i.Matrix3.multiplyByVector(D, ae, S);
          ie = v.scaleToGeodeticSurface(ie, ie);
          var ne = b.projectPointOntoPlane(ie, K);
          a.Cartesian2.subtract(ne, w, ne);
          var se = r.CesiumMath.clamp(ne.x / f.width, 0, 1),
            le = r.CesiumMath.clamp(ne.y / f.height, 0, 1);
          h && ((A[H + re] = se), (A[H + 1 + re] = le)),
            m && ((A[H] = se), (A[H + 1] = le)),
            (H += 2);
        }
        if (n.normal || n.tangent || n.bitangent || l) {
          var ue = V + 1,
            pe = V + 2;
          if (g) {
            if (oe + 3 < y) {
              var ce = o.Cartesian3.fromArray(c, oe + 3, U);
              if (R) {
                var ye = o.Cartesian3.fromArray(c, oe + y, Y);
                P && L(ae, ce, ye, v),
                  o.Cartesian3.subtract(ce, ae, ce),
                  o.Cartesian3.subtract(ye, ae, ye),
                  (F = o.Cartesian3.normalize(
                    o.Cartesian3.cross(ye, ce, F),
                    F,
                  )),
                  (R = !1);
              }
              o.Cartesian3.equalsEpsilon(ce, ae, r.CesiumMath.EPSILON10) &&
                (R = !0);
            }
            (n.tangent || n.bitangent) &&
              ((N = v.geodeticSurfaceNormal(ae, N)),
              n.tangent &&
                (O = o.Cartesian3.normalize(o.Cartesian3.cross(N, F, O), O)));
          } else
            (F = v.geodeticSurfaceNormal(ae, F)),
              (n.tangent || n.bitangent) &&
                (P &&
                  ((j = o.Cartesian3.fromArray(x, V, j)),
                  (W = o.Cartesian3.cross(o.Cartesian3.UNIT_Z, j, W)),
                  (W = o.Cartesian3.normalize(
                    i.Matrix3.multiplyByVector(M, W, W),
                    W,
                  )),
                  n.bitangent &&
                    (Q = o.Cartesian3.normalize(
                      o.Cartesian3.cross(j, W, Q),
                      Q,
                    ))),
                (O = o.Cartesian3.cross(o.Cartesian3.UNIT_Z, F, O)),
                (O = o.Cartesian3.normalize(
                  i.Matrix3.multiplyByVector(M, O, O),
                  O,
                )),
                n.bitangent &&
                  (N = o.Cartesian3.normalize(o.Cartesian3.cross(F, O, N), N)));
          n.normal &&
            (t.wall
              ? ((x[V + te] = F.x), (x[ue + te] = F.y), (x[pe + te] = F.z))
              : h &&
                ((x[V + te] = -F.x), (x[ue + te] = -F.y), (x[pe + te] = -F.z)),
            ((m && !P) || g) && ((x[V] = F.x), (x[ue] = F.y), (x[pe] = F.z))),
            l &&
              (g && (F = v.geodeticSurfaceNormal(ae, F)),
              (G[V + te] = -F.x),
              (G[ue + te] = -F.y),
              (G[pe + te] = -F.z)),
            n.tangent &&
              (t.wall
                ? ((E[V + te] = O.x), (E[ue + te] = O.y), (E[pe + te] = O.z))
                : h &&
                  ((E[V + te] = -O.x),
                  (E[ue + te] = -O.y),
                  (E[pe + te] = -O.z)),
              m &&
                (E[pe] = P
                  ? ((E[V] = W.x), (E[ue] = W.y), W.z)
                  : ((E[V] = O.x), (E[ue] = O.y), O.z))),
            n.bitangent &&
              (h && ((I[V + te] = N.x), (I[ue + te] = N.y), (I[pe + te] = N.z)),
              m &&
                (I[pe] = P
                  ? ((I[V] = Q.x), (I[ue] = Q.y), Q.z)
                  : ((I[V] = N.x), (I[ue] = N.y), N.z))),
            (V += 3);
        }
      }
      n.st &&
        (s.attributes.st = new p.GeometryAttribute({
          componentDatatype: u.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: A,
        })),
        n.normal &&
          (s.attributes.normal = new p.GeometryAttribute({
            componentDatatype: u.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: x,
          })),
        n.tangent &&
          (s.attributes.tangent = new p.GeometryAttribute({
            componentDatatype: u.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: E,
          })),
        n.bitangent &&
          (s.attributes.bitangent = new p.GeometryAttribute({
            componentDatatype: u.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: I,
          })),
        l &&
          (s.attributes.extrudeDirection = new p.GeometryAttribute({
            componentDatatype: u.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: G,
          }));
    }
    if (t.extrude && e.defined(t.offsetAttribute)) {
      var de = c.length / 3,
        ge = new Uint8Array(de);
      if (t.offsetAttribute === T.GeometryOffsetAttribute.TOP)
        (m && h) || g
          ? (ge = C.arrayFill(ge, 1, 0, de / 2))
          : m && (ge = C.arrayFill(ge, 1));
      else {
        var me = t.offsetAttribute === T.GeometryOffsetAttribute.NONE ? 0 : 1;
        ge = C.arrayFill(ge, me);
      }
      s.attributes.applyOffset = new p.GeometryAttribute({
        componentDatatype: u.ComponentDatatype.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: ge,
      });
    }
    return s;
  }
  var te = new o.Cartographic(),
    re = new o.Cartographic(),
    oe = { west: 0, east: 0 },
    ae = new N.EllipsoidGeodesic();
  function ie(t, o, i, n, s) {
    if (
      ((s = e.defaultValue(s, new a.Rectangle())),
      !e.defined(t) || t.length < 3)
    )
      return (s.west = 0), (s.north = 0), (s.south = 0), (s.east = 0), s;
    if (i === G.ArcType.RHUMB) return a.Rectangle.fromCartesianArray(t, o, s);
    ae.ellipsoid.equals(o) || (ae = new N.EllipsoidGeodesic(void 0, void 0, o)),
      (s.west = Number.POSITIVE_INFINITY),
      (s.east = Number.NEGATIVE_INFINITY),
      (s.south = Number.POSITIVE_INFINITY),
      (s.north = Number.NEGATIVE_INFINITY),
      (oe.west = Number.POSITIVE_INFINITY),
      (oe.east = Number.NEGATIVE_INFINITY);
    for (
      var l,
        u = 1 / r.CesiumMath.chordLength(n, o.maximumRadius),
        p = t.length,
        c = o.cartesianToCartographic(t[0], re),
        y = te,
        d = 1;
      d < p;
      d++
    )
      (l = y),
        (y = c),
        (c = o.cartesianToCartographic(t[d], l)),
        ae.setEndPoints(y, c),
        se(ae, u, s, oe);
    return (
      (l = y),
      (y = c),
      (c = o.cartesianToCartographic(t[0], l)),
      ae.setEndPoints(y, c),
      se(ae, u, s, oe),
      s.east - s.west > oe.west - oe.east &&
        ((s.east = oe.east), (s.west = oe.west)),
      s
    );
  }
  var ne = new o.Cartographic();
  function se(e, t, r, o) {
    for (
      var a = e.surfaceDistance,
        i = Math.ceil(a * t),
        n = 0 < i ? a / (i - 1) : Number.POSITIVE_INFINITY,
        s = 0,
        l = 0;
      l < i;
      l++
    ) {
      var u = e.interpolateUsingSurfaceDistance(s, ne);
      s += n;
      var p = u.longitude,
        c = u.latitude;
      (r.west = Math.min(r.west, p)),
        (r.east = Math.max(r.east, p)),
        (r.south = Math.min(r.south, c)),
        (r.north = Math.max(r.north, c)),
        (o.west = 0 < p ? Math.min(p, o.west) : o.west),
        (o.east = p < 0 ? Math.max(p, o.east) : o.east);
    }
  }
  var le = [];
  function ue(e, t, r, o, a, i, n, s, l, u) {
    var p,
      c = { walls: [] };
    if (i || n) {
      var y,
        d,
        g = O.PolygonGeometryLibrary.createGeometryFromPositions(
          e,
          t,
          r,
          a,
          s,
          l,
        ),
        m = g.attributes.position.values,
        h = g.indices;
      if (i && n) {
        var f = m.concat(m);
        (y = f.length / 3),
          (d = v.IndexDatatype.createTypedArray(y, 2 * h.length)).set(h);
        var b = h.length,
          _ = y / 2;
        for (p = 0; p < b; p += 3) {
          var P = d[p] + _,
            C = d[p + 1] + _,
            T = d[p + 2] + _;
          (d[p + b] = T), (d[p + 1 + b] = C), (d[p + 2 + b] = P);
        }
        if (((g.attributes.position.values = f), a && s.normal)) {
          var w = g.attributes.normal.values;
          (g.attributes.normal.values = new Float32Array(f.length)),
            g.attributes.normal.values.set(w);
        }
        g.indices = d;
      } else if (n) {
        for (
          y = m.length / 3,
            d = v.IndexDatatype.createTypedArray(y, h.length),
            p = 0;
          p < h.length;
          p += 3
        )
          (d[p] = h[p + 2]), (d[p + 1] = h[p + 1]), (d[p + 2] = h[p]);
        g.indices = d;
      }
      c.topAndBottom = new x.GeometryInstance({ geometry: g });
    }
    var A,
      E = o.outerRing,
      G = I.EllipsoidTangentPlane.fromPoints(E, e),
      H = G.projectPointsOntoPlane(E, le),
      V = F.PolygonPipeline.computeWindingOrder2D(H);
    V === F.WindingOrder.CLOCKWISE && (E = E.slice().reverse()),
      u &&
        ((A = O.PolygonGeometryLibrary.computeWallGeometry(E, e, r, a, l)),
        c.walls.push(new x.GeometryInstance({ geometry: A })));
    var N = o.holes;
    for (p = 0; p < N.length; p++) {
      var R = N[p];
      (H = (G = I.EllipsoidTangentPlane.fromPoints(
        R,
        e,
      )).projectPointsOntoPlane(R, le)),
        (V = F.PolygonPipeline.computeWindingOrder2D(H)) ===
          F.WindingOrder.COUNTER_CLOCKWISE && (R = R.slice().reverse()),
        (A = O.PolygonGeometryLibrary.computeWallGeometry(R, e, r, a, l)),
        c.walls.push(new x.GeometryInstance({ geometry: A }));
    }
    return c;
  }
  function pe(o) {
    if (
      (t.Check.typeOf.object('options', o),
      t.Check.typeOf.object('options.polygonHierarchy', o.polygonHierarchy),
      e.defined(o.perPositionHeight) &&
        o.perPositionHeight &&
        e.defined(o.height))
    )
      throw new t.DeveloperError(
        'Cannot use both options.perPositionHeight and options.height',
      );
    if (
      e.defined(o.arcType) &&
      o.arcType !== G.ArcType.GEODESIC &&
      o.arcType !== G.ArcType.RHUMB
    )
      throw new t.DeveloperError(
        'Invalid arcType. Valid options are ArcType.GEODESIC and ArcType.RHUMB.',
      );
    var i = o.polygonHierarchy,
      n = e.defaultValue(o.vertexFormat, w.VertexFormat.DEFAULT),
      s = e.defaultValue(o.ellipsoid, a.Ellipsoid.WGS84),
      l = e.defaultValue(o.granularity, r.CesiumMath.RADIANS_PER_DEGREE),
      u = e.defaultValue(o.stRotation, 0),
      p = e.defaultValue(o.perPositionHeight, !1),
      c = p && e.defined(o.extrudedHeight),
      y = e.defaultValue(o.height, 0),
      d = e.defaultValue(o.extrudedHeight, y);
    if (!c) {
      var g = Math.max(y, d);
      (d = Math.min(y, d)), (y = g);
    }
    (this._vertexFormat = w.VertexFormat.clone(n)),
      (this._ellipsoid = a.Ellipsoid.clone(s)),
      (this._granularity = l),
      (this._stRotation = u),
      (this._height = y),
      (this._extrudedHeight = d),
      (this._closeTop = e.defaultValue(o.closeTop, !0)),
      (this._closeBottom = e.defaultValue(o.closeBottom, !0)),
      (this._extrudeOutering = e.defaultValue(o.extrudeOutering, !0)),
      (this._polygonHierarchy = i),
      (this._perPositionHeight = p),
      (this._perPositionHeightExtrude = c),
      (this._shadowVolume = e.defaultValue(o.shadowVolume, !1)),
      (this._workerName = 'createPolygonGeometry'),
      (this._offsetAttribute = o.offsetAttribute),
      (this._arcType = e.defaultValue(o.arcType, G.ArcType.GEODESIC)),
      (this._rectangle = void 0),
      (this._textureCoordinateRotationPoints = void 0),
      (this.packedLength =
        O.PolygonGeometryLibrary.computeHierarchyPackedLength(i) +
        a.Ellipsoid.packedLength +
        w.VertexFormat.packedLength +
        12);
  }
  (pe.fromPositions = function (r) {
    return (
      (r = e.defaultValue(r, e.defaultValue.EMPTY_OBJECT)),
      t.Check.defined('options.positions', r.positions),
      new pe({
        polygonHierarchy: { positions: r.positions },
        height: r.height,
        extrudedHeight: r.extrudedHeight,
        vertexFormat: r.vertexFormat,
        stRotation: r.stRotation,
        ellipsoid: r.ellipsoid,
        granularity: r.granularity,
        perPositionHeight: r.perPositionHeight,
        closeTop: r.closeTop,
        closeBottom: r.closeBottom,
        offsetAttribute: r.offsetAttribute,
        arcType: r.arcType,
      })
    );
  }),
    (pe.pack = function (r, o, i) {
      return (
        t.Check.typeOf.object('value', r),
        t.Check.defined('array', o),
        (i = e.defaultValue(i, 0)),
        (i = O.PolygonGeometryLibrary.packPolygonHierarchy(
          r._polygonHierarchy,
          o,
          i,
        )),
        a.Ellipsoid.pack(r._ellipsoid, o, i),
        (i += a.Ellipsoid.packedLength),
        w.VertexFormat.pack(r._vertexFormat, o, i),
        (i += w.VertexFormat.packedLength),
        (o[i++] = r._height),
        (o[i++] = r._extrudedHeight),
        (o[i++] = r._granularity),
        (o[i++] = r._stRotation),
        (o[i++] = r._perPositionHeightExtrude ? 1 : 0),
        (o[i++] = r._perPositionHeight ? 1 : 0),
        (o[i++] = r._closeTop ? 1 : 0),
        (o[i++] = r._closeBottom ? 1 : 0),
        (o[i++] = r._shadowVolume ? 1 : 0),
        (o[i++] = e.defaultValue(r._offsetAttribute, -1)),
        (o[i++] = r._arcType),
        (o[i] = r.packedLength),
        o
      );
    });
  var ce = a.Ellipsoid.clone(a.Ellipsoid.UNIT_SPHERE),
    ye = new w.VertexFormat(),
    de = { polygonHierarchy: {} };
  return (
    (pe.unpack = function (r, o, i) {
      t.Check.defined('array', r), (o = e.defaultValue(o, 0));
      var n = O.PolygonGeometryLibrary.unpackPolygonHierarchy(r, o);
      (o = n.startingIndex), delete n.startingIndex;
      var s = a.Ellipsoid.unpack(r, o, ce);
      o += a.Ellipsoid.packedLength;
      var l = w.VertexFormat.unpack(r, o, ye);
      o += w.VertexFormat.packedLength;
      var u = r[o++],
        p = r[o++],
        c = r[o++],
        y = r[o++],
        d = 1 === r[o++],
        g = 1 === r[o++],
        m = 1 === r[o++],
        h = 1 === r[o++],
        f = 1 === r[o++],
        b = r[o++],
        v = r[o++],
        _ = r[o];
      return (
        e.defined(i) || (i = new pe(de)),
        (i._polygonHierarchy = n),
        (i._ellipsoid = a.Ellipsoid.clone(s, i._ellipsoid)),
        (i._vertexFormat = w.VertexFormat.clone(l, i._vertexFormat)),
        (i._height = u),
        (i._extrudedHeight = p),
        (i._granularity = c),
        (i._stRotation = y),
        (i._perPositionHeightExtrude = d),
        (i._perPositionHeight = g),
        (i._closeTop = m),
        (i._closeBottom = h),
        (i._shadowVolume = f),
        (i._offsetAttribute = -1 === b ? void 0 : b),
        (i._arcType = v),
        (i.packedLength = _),
        i
      );
    }),
    (pe.computeRectangle = function (o, i) {
      t.Check.typeOf.object('options', o),
        t.Check.typeOf.object('options.polygonHierarchy', o.polygonHierarchy);
      var n = e.defaultValue(o.granularity, r.CesiumMath.RADIANS_PER_DEGREE),
        s = e.defaultValue(o.arcType, G.ArcType.GEODESIC);
      if (s !== G.ArcType.GEODESIC && s !== G.ArcType.RHUMB)
        throw new t.DeveloperError(
          'Invalid arcType. Valid options are ArcType.GEODESIC and ArcType.RHUMB.',
        );
      var l = o.polygonHierarchy,
        u = e.defaultValue(o.ellipsoid, a.Ellipsoid.WGS84);
      return ie(l.positions, u, s, n, i);
    }),
    (pe.createGeometry = function (t) {
      var o = t._vertexFormat,
        a = t._ellipsoid,
        n = t._granularity,
        s = t._stRotation,
        l = t._polygonHierarchy,
        c = t._perPositionHeight,
        y = t._closeTop,
        d = t._closeBottom,
        g = t._arcType,
        m = l.positions;
      if (!(m.length < 3)) {
        var h = I.EllipsoidTangentPlane.fromPoints(m, a),
          b = O.PolygonGeometryLibrary.polygonsFromHierarchy(
            l,
            h.projectPointsOntoPlane.bind(h),
            !c,
            a,
          ),
          _ = b.hierarchy,
          P = b.polygons;
        if (0 !== _.length) {
          m = _[0].outerRing;
          var w,
            A = O.PolygonGeometryLibrary.computeBoundingRectangle(
              h.plane.normal,
              h.projectPointOntoPlane.bind(h),
              m,
              s,
              M,
            ),
            E = [],
            G = t._height,
            H = t._extrudedHeight,
            V = {
              perPositionHeight: c,
              vertexFormat: o,
              geometry: void 0,
              tangentPlane: h,
              boundingRectangle: A,
              ellipsoid: a,
              stRotation: s,
              bottom: !1,
              top: !0,
              wall: !1,
              extrude: !1,
              arcType: g,
            };
          if (
            t._perPositionHeightExtrude ||
            !r.CesiumMath.equalsEpsilon(G, H, 0, r.CesiumMath.EPSILON2)
          )
            for (
              V.extrude = !0,
                V.top = y,
                V.bottom = d,
                V.shadowVolume = t._shadowVolume,
                V.offsetAttribute = t._offsetAttribute,
                w = 0;
              w < P.length;
              w++
            ) {
              var N,
                R = ue(a, P[w], n, _[w], c, y, d, o, g, t._extrudeOutering);
              y && d
                ? ((N = R.topAndBottom),
                  (V.geometry =
                    O.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(
                      N.geometry,
                      G,
                      H,
                      a,
                      c,
                    )))
                : y
                ? (((N = R.topAndBottom).geometry.attributes.position.values =
                    F.PolygonPipeline.scaleToGeodeticHeight(
                      N.geometry.attributes.position.values,
                      G,
                      a,
                      !c,
                    )),
                  (V.geometry = N.geometry))
                : d &&
                  (((N = R.topAndBottom).geometry.attributes.position.values =
                    F.PolygonPipeline.scaleToGeodeticHeight(
                      N.geometry.attributes.position.values,
                      H,
                      a,
                      !0,
                    )),
                  (V.geometry = N.geometry)),
                (y || d) && ((V.wall = !1), (N.geometry = ee(V)), E.push(N));
              var D = R.walls;
              V.wall = !0;
              for (var L = 0; L < D.length; L++) {
                var S = D[L];
                (V.geometry =
                  O.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(
                    S.geometry,
                    G,
                    H,
                    a,
                    c,
                  )),
                  (S.geometry = ee(V)),
                  E.push(S);
              }
            }
          else
            for (w = 0; w < P.length; w++) {
              var k = new x.GeometryInstance({
                geometry: O.PolygonGeometryLibrary.createGeometryFromPositions(
                  a,
                  P[w],
                  n,
                  c,
                  o,
                  g,
                ),
              });
              if (
                ((k.geometry.attributes.position.values =
                  F.PolygonPipeline.scaleToGeodeticHeight(
                    k.geometry.attributes.position.values,
                    G,
                    a,
                    !c,
                  )),
                (V.geometry = k.geometry),
                (k.geometry = ee(V)),
                e.defined(t._offsetAttribute))
              ) {
                var B = k.geometry.attributes.position.values.length,
                  z = new Uint8Array(B / 3),
                  U =
                    t._offsetAttribute === T.GeometryOffsetAttribute.NONE
                      ? 0
                      : 1;
                C.arrayFill(z, U),
                  (k.geometry.attributes.applyOffset = new p.GeometryAttribute({
                    componentDatatype: u.ComponentDatatype.UNSIGNED_BYTE,
                    componentsPerAttribute: 1,
                    values: z,
                  }));
              }
              E.push(k);
            }
          var Y = f.GeometryPipeline.combineInstances(E)[0];
          (Y.attributes.position.values = new Float64Array(
            Y.attributes.position.values,
          )),
            (Y.indices = v.IndexDatatype.createTypedArray(
              Y.attributes.position.values.length / 3,
              Y.indices,
            ));
          var j = Y.attributes,
            W = i.BoundingSphere.fromVertices(j.position.values);
          return (
            o.position || delete j.position,
            new p.Geometry({
              attributes: j,
              indices: Y.indices,
              primitiveType: Y.primitiveType,
              boundingSphere: W,
              offsetAttribute: t._offsetAttribute,
            })
          );
        }
      }
    }),
    (pe.createShadowVolume = function (e, t, r) {
      var o = e._granularity,
        a = e._ellipsoid,
        i = t(o, a),
        n = r(o, a);
      return new pe({
        polygonHierarchy: e._polygonHierarchy,
        ellipsoid: a,
        stRotation: e._stRotation,
        granularity: o,
        perPositionHeight: !1,
        extrudedHeight: i,
        height: n,
        vertexFormat: w.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
        arcType: e._arcType,
      });
    }),
    Object.defineProperties(pe.prototype, {
      rectangle: {
        get: function () {
          if (!e.defined(this._rectangle)) {
            var t = this._polygonHierarchy.positions;
            this._rectangle = ie(
              t,
              this._ellipsoid,
              this._arcType,
              this._granularity,
            );
          }
          return this._rectangle;
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return (
            e.defined(this._textureCoordinateRotationPoints) ||
              (this._textureCoordinateRotationPoints = (function (e) {
                var t = -e._stRotation;
                if (0 === t) return [0, 0, 0, 1, 1, 0];
                var r = e._ellipsoid,
                  o = e._polygonHierarchy.positions,
                  a = e.rectangle;
                return p.Geometry._textureCoordinateRotationPoints(o, t, r, a);
              })(this)),
            this._textureCoordinateRotationPoints
          );
        },
      },
    }),
    function (t, r) {
      return (
        e.defined(r) && (t = pe.unpack(t, r)),
        (t._ellipsoid = a.Ellipsoid.clone(t._ellipsoid)),
        pe.createGeometry(t)
      );
    }
  );
});
