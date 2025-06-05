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
  './IntersectionTests-dbfba52c',
  './Plane-2bcb9154',
  './arrayRemoveDuplicates-2869246d',
  './EllipsoidRhumbLine-6ca4b1e6',
  './EllipsoidGeodesic-db2069b3',
  './PolylinePipeline-65700d85',
  './WallGeometryLibrary-80ce00e5',
], function (
  e,
  i,
  t,
  r,
  n,
  a,
  o,
  s,
  l,
  d,
  m,
  p,
  u,
  f,
  h,
  c,
  g,
  y,
  v,
  E,
  b,
  w,
  _,
  C,
) {
  var H = new r.Cartesian3(),
    A = new r.Cartesian3();
  function D(a) {
    var o = (a = e.defaultValue(a, e.defaultValue.EMPTY_OBJECT)).positions,
      s = a.maximumHeights,
      l = a.minimumHeights;
    if (!e.defined(o))
      throw new i.DeveloperError('options.positions is required.');
    if (e.defined(s) && s.length !== o.length)
      throw new i.DeveloperError(
        'options.positions and options.maximumHeights must have the same length.',
      );
    if (e.defined(l) && l.length !== o.length)
      throw new i.DeveloperError(
        'options.positions and options.minimumHeights must have the same length.',
      );
    var d = e.defaultValue(a.granularity, t.CesiumMath.RADIANS_PER_DEGREE),
      m = e.defaultValue(a.ellipsoid, n.Ellipsoid.WGS84);
    (this._positions = o),
      (this._minimumHeights = l),
      (this._maximumHeights = s),
      (this._granularity = d),
      (this._ellipsoid = n.Ellipsoid.clone(m)),
      (this._workerName = 'createWallOutlineGeometry');
    var p = 1 + o.length * r.Cartesian3.packedLength + 2;
    e.defined(l) && (p += l.length),
      e.defined(s) && (p += s.length),
      (this.packedLength = p + n.Ellipsoid.packedLength + 1);
  }
  D.pack = function (t, a, o) {
    if (!e.defined(t)) throw new i.DeveloperError('value is required');
    if (!e.defined(a)) throw new i.DeveloperError('array is required');
    var s;
    o = e.defaultValue(o, 0);
    var l = t._positions,
      d = l.length;
    for (a[o++] = d, s = 0; s < d; ++s, o += r.Cartesian3.packedLength)
      r.Cartesian3.pack(l[s], a, o);
    var m = t._minimumHeights;
    if (((d = e.defined(m) ? m.length : 0), (a[o++] = d), e.defined(m)))
      for (s = 0; s < d; ++s) a[o++] = m[s];
    var p = t._maximumHeights;
    if (((d = e.defined(p) ? p.length : 0), (a[o++] = d), e.defined(p)))
      for (s = 0; s < d; ++s) a[o++] = p[s];
    return (
      n.Ellipsoid.pack(t._ellipsoid, a, o),
      (a[(o += n.Ellipsoid.packedLength)] = t._granularity),
      a
    );
  };
  var k = n.Ellipsoid.clone(n.Ellipsoid.UNIT_SPHERE),
    x = {
      positions: void 0,
      minimumHeights: void 0,
      maximumHeights: void 0,
      ellipsoid: k,
      granularity: void 0,
    };
  return (
    (D.unpack = function (t, a, o) {
      if (!e.defined(t)) throw new i.DeveloperError('array is required');
      var s;
      a = e.defaultValue(a, 0);
      var l,
        d,
        m = t[a++],
        p = new Array(m);
      for (s = 0; s < m; ++s, a += r.Cartesian3.packedLength)
        p[s] = r.Cartesian3.unpack(t, a);
      if (0 < (m = t[a++]))
        for (l = new Array(m), s = 0; s < m; ++s) l[s] = t[a++];
      if (0 < (m = t[a++]))
        for (d = new Array(m), s = 0; s < m; ++s) d[s] = t[a++];
      var u = n.Ellipsoid.unpack(t, a, k),
        f = t[(a += n.Ellipsoid.packedLength)];
      return e.defined(o)
        ? ((o._positions = p),
          (o._minimumHeights = l),
          (o._maximumHeights = d),
          (o._ellipsoid = n.Ellipsoid.clone(u, o._ellipsoid)),
          (o._granularity = f),
          o)
        : ((x.positions = p),
          (x.minimumHeights = l),
          (x.maximumHeights = d),
          (x.granularity = f),
          new D(x));
    }),
    (D.fromConstantHeights = function (t) {
      var r,
        n,
        a = (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)).positions;
      if (!e.defined(a))
        throw new i.DeveloperError('options.positions is required.');
      var o = t.minimumHeight,
        s = t.maximumHeight,
        l = e.defined(o),
        d = e.defined(s);
      if (l || d) {
        var m = a.length;
        (r = l ? new Array(m) : void 0), (n = d ? new Array(m) : void 0);
        for (var p = 0; p < m; ++p) l && (r[p] = o), d && (n[p] = s);
      }
      return new D({
        positions: a,
        maximumHeights: n,
        minimumHeights: r,
        ellipsoid: t.ellipsoid,
      });
    }),
    (D.createGeometry = function (i) {
      var n = i._positions,
        o = i._minimumHeights,
        s = i._maximumHeights,
        l = i._granularity,
        u = i._ellipsoid,
        f = C.WallGeometryLibrary.computePositions(u, n, s, o, l, !1);
      if (e.defined(f)) {
        var h,
          y = f.pos.bottomPositions,
          v = f.pos.topPositions,
          E = v.length,
          b = 2 * E,
          w = new Float64Array(b),
          _ = 0;
        for (E /= 3, h = 0; h < E; ++h) {
          var D = 3 * h,
            k = r.Cartesian3.fromArray(v, D, H),
            x = r.Cartesian3.fromArray(y, D, A);
          (w[_++] = x.x),
            (w[_++] = x.y),
            (w[_++] = x.z),
            (w[_++] = k.x),
            (w[_++] = k.y),
            (w[_++] = k.z);
        }
        var G = new c.GeometryAttributes({
            position: new m.GeometryAttribute({
              componentDatatype: d.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: w,
            }),
          }),
          L = b / 3;
        b = 2 * L - 4 + L;
        var P = g.IndexDatatype.createTypedArray(L, b),
          T = 0;
        for (h = 0; h < L - 2; h += 2) {
          var V = h,
            S = h + 2,
            I = r.Cartesian3.fromArray(w, 3 * V, H),
            R = r.Cartesian3.fromArray(w, 3 * S, A);
          if (!r.Cartesian3.equalsEpsilon(I, R, t.CesiumMath.EPSILON10)) {
            var q = h + 1,
              M = h + 3;
            (P[T++] = q),
              (P[T++] = V),
              (P[T++] = q),
              (P[T++] = M),
              (P[T++] = V),
              (P[T++] = S);
          }
        }
        return (
          (P[T++] = L - 2),
          (P[T++] = L - 1),
          new m.Geometry({
            attributes: G,
            indices: P,
            primitiveType: p.PrimitiveType.LINES,
            boundingSphere: new a.BoundingSphere.fromVertices(w),
          })
        );
      }
    }),
    function (i, t) {
      return (
        e.defined(t) && (i = D.unpack(i, t)),
        (i._ellipsoid = n.Ellipsoid.clone(i._ellipsoid)),
        D.createGeometry(i)
      );
    }
  );
});
