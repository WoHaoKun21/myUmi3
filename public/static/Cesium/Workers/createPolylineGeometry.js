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
  './VertexFormat-fe4db402',
  './arrayRemoveDuplicates-2869246d',
  './ArcType-66bc286a',
  './EllipsoidRhumbLine-6ca4b1e6',
  './EllipsoidGeodesic-db2069b3',
  './PolylinePipeline-65700d85',
  './Color-69f1845f',
], function (
  e,
  t,
  r,
  a,
  o,
  i,
  n,
  l,
  s,
  p,
  d,
  c,
  u,
  y,
  f,
  h,
  m,
  v,
  C,
  w,
  _,
  b,
  g,
  E,
  A,
  P,
) {
  var T = [];
  function D(e, t, r, a, o) {
    var i,
      n = T;
    n.length = o;
    var l = r.red,
      s = r.green,
      p = r.blue,
      d = r.alpha,
      c = a.red,
      u = a.green,
      y = a.blue,
      f = a.alpha;
    if (P.Color.equals(r, a)) {
      for (i = 0; i < o; i++) n[i] = P.Color.clone(r);
      return n;
    }
    var h = (c - l) / o,
      m = (u - s) / o,
      v = (y - p) / o,
      C = (f - d) / o;
    for (i = 0; i < o; i++)
      n[i] = new P.Color(l + i * h, s + i * m, p + i * v, d + i * C);
    return n;
  }
  function x(i) {
    var n = (i = e.defaultValue(i, e.defaultValue.EMPTY_OBJECT)).positions,
      l = i.colors,
      s = e.defaultValue(i.width, 1),
      p = e.defaultValue(i.hMax, -1),
      d = e.defaultValue(i.colorsPerVertex, !1);
    if (!e.defined(n) || n.length < 2)
      throw new t.DeveloperError('At least two positions are required.');
    if ('number' != typeof s)
      throw new t.DeveloperError('width must be a number');
    if (
      e.defined(l) &&
      ((d && l.length < n.length) || (!d && l.length < n.length - 1))
    )
      throw new t.DeveloperError('colors has an invalid length.');
    (this._positions = n),
      (this._colors = l),
      (this._width = s),
      (this._hMax = p),
      (this._colorsPerVertex = d),
      (this._dist = i.dist),
      (this._period = i.period),
      (this._vertexFormat = w.VertexFormat.clone(
        e.defaultValue(i.vertexFormat, w.VertexFormat.DEFAULT),
      )),
      (this._followSurface = e.defaultValue(i.followSurface, !0)),
      e.defined(i.followSurface) &&
        (f.deprecationWarning(
          'PolylineGeometry.followSurface',
          'PolylineGeometry.followSurface is deprecated and will be removed in Cesium 1.55. Use PolylineGeometry.arcType instead.',
        ),
        (i.arcType = i.followSurface ? b.ArcType.GEODESIC : b.ArcType.NONE)),
      (this._arcType = e.defaultValue(i.arcType, b.ArcType.GEODESIC)),
      (this._followSurface = this._arcType !== b.ArcType.NONE),
      (this._granularity = e.defaultValue(
        i.granularity,
        r.CesiumMath.RADIANS_PER_DEGREE,
      )),
      (this._ellipsoid = o.Ellipsoid.clone(
        e.defaultValue(i.ellipsoid, o.Ellipsoid.WGS84),
      )),
      (this._workerName = 'createPolylineGeometry');
    var c = 1 + n.length * a.Cartesian3.packedLength;
    (c += e.defined(l) ? 1 + l.length * P.Color.packedLength : 1),
      (this.packedLength =
        c + o.Ellipsoid.packedLength + w.VertexFormat.packedLength + 4 + 2);
  }
  x.pack = function (r, i, n) {
    if (!e.defined(r)) throw new t.DeveloperError('value is required');
    if (!e.defined(i)) throw new t.DeveloperError('array is required');
    var l;
    n = e.defaultValue(n, 0);
    var s = r._positions,
      p = s.length;
    for (i[n++] = p, l = 0; l < p; ++l, n += a.Cartesian3.packedLength)
      a.Cartesian3.pack(s[l], i, n);
    var d = r._colors;
    for (
      p = e.defined(d) ? d.length : 0, i[n++] = p, l = 0;
      l < p;
      ++l, n += P.Color.packedLength
    )
      P.Color.pack(d[l], i, n);
    return (
      o.Ellipsoid.pack(r._ellipsoid, i, n),
      (n += o.Ellipsoid.packedLength),
      w.VertexFormat.pack(r._vertexFormat, i, n),
      (n += w.VertexFormat.packedLength),
      (i[n++] = r._width),
      (i[n++] = r._colorsPerVertex ? 1 : 0),
      (i[n++] = r._arcType),
      (i[n++] = r._granularity),
      (i[n++] = r._hMax),
      (i[n++] = r._dist),
      (i[n] = r._period),
      i
    );
  };
  var k = o.Ellipsoid.clone(o.Ellipsoid.UNIT_SPHERE),
    G = new w.VertexFormat(),
    V = {
      positions: void 0,
      colors: void 0,
      ellipsoid: k,
      vertexFormat: G,
      width: void 0,
      colorsPerVertex: void 0,
      arcType: void 0,
      granularity: void 0,
    };
  x.unpack = function (r, i, n) {
    if (!e.defined(r)) throw new t.DeveloperError('array is required');
    var l;
    i = e.defaultValue(i, 0);
    var s = r[i++],
      p = new Array(s);
    for (l = 0; l < s; ++l, i += a.Cartesian3.packedLength)
      p[l] = a.Cartesian3.unpack(r, i);
    var d = 0 < (s = r[i++]) ? new Array(s) : void 0;
    for (l = 0; l < s; ++l, i += P.Color.packedLength)
      d[l] = P.Color.unpack(r, i);
    var c = o.Ellipsoid.unpack(r, i, k);
    i += o.Ellipsoid.packedLength;
    var u = w.VertexFormat.unpack(r, i, G);
    i += w.VertexFormat.packedLength;
    var y = r[i++],
      f = 1 === r[i++],
      h = r[i++],
      m = r[i++],
      v = r[i++],
      C = 1 == r[i++],
      _ = r[i];
    return e.defined(n)
      ? ((n._positions = p),
        (n._colors = d),
        (n._ellipsoid = o.Ellipsoid.clone(c, n._ellipsoid)),
        (n._vertexFormat = w.VertexFormat.clone(u, n._vertexFormat)),
        (n._width = y),
        (n._colorsPerVertex = f),
        (n._arcType = h),
        (n._granularity = m),
        (n._hMax = v),
        (n._dist = C),
        (n._period = _),
        n)
      : ((V.positions = p),
        (V.colors = d),
        (V.width = y),
        (V.colorsPerVertex = f),
        (V.arcType = h),
        (V.granularity = m),
        (V.hMax = v),
        (V.dist = C),
        (V.period = _),
        new x(V));
  };
  var F = new a.Cartesian3(),
    L = new a.Cartesian3(),
    S = new a.Cartesian3(),
    O = new a.Cartesian3();
  return (
    (x.createGeometry = function (t) {
      var o,
        n,
        l,
        s = t._width,
        u = t._hMax,
        y = t._vertexFormat,
        f = t._colors,
        v = t._colorsPerVertex,
        C = t._arcType,
        w = t._granularity,
        g = t._ellipsoid,
        E = t._dist,
        x = t._period,
        k = _.arrayRemoveDuplicates(t._positions, a.Cartesian3.equalsEpsilon),
        G = k.length;
      if (!(G < 2 || s <= 0)) {
        if (C === b.ArcType.GEODESIC || C === b.ArcType.RHUMB) {
          var V, M;
          M =
            C === b.ArcType.GEODESIC
              ? ((V = r.CesiumMath.chordLength(w, g.maximumRadius)),
                A.PolylinePipeline.numberOfPoints)
              : ((V = w), A.PolylinePipeline.numberOfPointsRhumbLine);
          var I = A.PolylinePipeline.extractHeights(k, g);
          if (e.defined(f)) {
            var R = 1;
            for (o = 0; o < G - 1; ++o) R += M(k[o], k[o + 1], V);
            var B = new Array(R),
              N = 0;
            for (o = 0; o < G - 1; ++o) {
              var U = k[o],
                q = k[o + 1],
                W = f[o],
                H = M(U, q, V);
              if (v && o < R) {
                var Y = D(0, 0, W, f[o + 1], H),
                  z = Y.length;
                for (n = 0; n < z; ++n) B[N++] = Y[n];
              } else for (n = 0; n < H; ++n) B[N++] = P.Color.clone(W);
            }
            (B[N] = P.Color.clone(f[f.length - 1])), (f = B), (T.length = 0);
          }
          k =
            C === b.ArcType.GEODESIC
              ? A.PolylinePipeline.generateCartesianArc({
                  positions: k,
                  minDistance: V,
                  ellipsoid: g,
                  height: I,
                  hMax: u,
                })
              : A.PolylinePipeline.generateCartesianRhumbArc({
                  positions: k,
                  granularity: V,
                  ellipsoid: g,
                  height: I,
                });
        }
        var J,
          j = 4 * (G = k.length) - 4,
          K = new Float64Array(3 * j),
          Q = new Float64Array(3 * j),
          X = new Float64Array(3 * j),
          Z = new Float32Array(2 * j),
          $ = y.st ? new Float32Array(2 * j) : void 0,
          ee = e.defined(f) ? new Uint8Array(4 * j) : void 0,
          te = E ? new Float32Array(3 * j) : void 0,
          re = 0,
          ae = 0,
          oe = 0,
          ie = 0,
          ne = 0,
          le = 0;
        for (n = 0; n < G; ++n) {
          var se, pe;
          0 === n
            ? ((J = F),
              a.Cartesian3.subtract(k[0], k[1], J),
              a.Cartesian3.add(k[0], J, J))
            : (J = k[n - 1]),
            a.Cartesian3.clone(J, S),
            a.Cartesian3.clone(k[n], L),
            n === G - 1
              ? ((J = F),
                a.Cartesian3.subtract(k[G - 1], k[G - 2], J),
                a.Cartesian3.add(k[G - 1], J, J))
              : (J = k[n + 1]),
            a.Cartesian3.clone(J, O),
            e.defined(ee) &&
              ((se = 0 === n || v ? f[n] : f[n - 1]),
              n !== G - 1 && (pe = f[n]));
          var de = n === G - 1 ? 2 : 4;
          for (l = 0 === n ? 2 : 0; l < de; ++l) {
            a.Cartesian3.pack(L, K, re),
              a.Cartesian3.pack(S, Q, re),
              a.Cartesian3.pack(O, X, re),
              (re += 3);
            var ce = l - 2 < 0 ? -1 : 1,
              ue = (l % 2) * 2 - 1,
              ye = (ue * n) / G;
            if (
              ((Z[ae++] = 0 < u ? ye : ue),
              (Z[ae++] = ce * s),
              y.st &&
                (($[oe++] = n / (G - 1)), ($[oe++] = Math.max(Z[ae - 2], 0))),
              e.defined(ee))
            ) {
              var fe = l < 2 ? se : pe;
              (ee[ie++] = P.Color.floatToByte(fe.red)),
                (ee[ie++] = P.Color.floatToByte(fe.green)),
                (ee[ie++] = P.Color.floatToByte(fe.blue)),
                (ee[ie++] = P.Color.floatToByte(fe.alpha));
            }
            E && ((te[3 * ne] = le), ne++);
          }
          le += a.Cartesian3.distance(J, k[n]);
        }
        if (E) {
          var he = le,
            me = Math.random() * (0 < x ? x : he);
          for (n = 0; n < j; n++) (te[3 * n + 1] = he), (te[3 * n + 2] = me);
        }
        var ve = new h.GeometryAttributes();
        (ve.position = new d.GeometryAttribute({
          componentDatatype: p.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: K,
        })),
          (ve.prevPosition = new d.GeometryAttribute({
            componentDatatype: p.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: Q,
          })),
          (ve.nextPosition = new d.GeometryAttribute({
            componentDatatype: p.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: X,
          })),
          (ve.expandAndWidth = new d.GeometryAttribute({
            componentDatatype: p.ComponentDatatype.FLOAT,
            componentsPerAttribute: 2,
            values: Z,
          })),
          y.st &&
            (ve.st = new d.GeometryAttribute({
              componentDatatype: p.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: $,
            })),
          e.defined(ee) &&
            (ve.color = new d.GeometryAttribute({
              componentDatatype: p.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 4,
              values: ee,
              normalize: !0,
            })),
          E &&
            (ve.dist = new d.GeometryAttribute({
              componentDatatype: p.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: te,
            }));
        var Ce = m.IndexDatatype.createTypedArray(j, 6 * G - 6),
          we = 0,
          _e = 0,
          be = G - 1;
        for (n = 0; n < be; ++n)
          (Ce[_e++] = we),
            (Ce[_e++] = we + 2),
            (Ce[_e++] = we + 1),
            (Ce[_e++] = we + 1),
            (Ce[_e++] = we + 2),
            (Ce[_e++] = we + 3),
            (we += 4);
        return new d.Geometry({
          attributes: ve,
          indices: Ce,
          primitiveType: c.PrimitiveType.TRIANGLES,
          boundingSphere: i.BoundingSphere.fromPoints(k),
          geometryType: d.GeometryType.POLYLINES,
        });
      }
    }),
    function (t, r) {
      return (
        e.defined(r) && (t = x.unpack(t, r)),
        (t._ellipsoid = o.Ellipsoid.clone(t._ellipsoid)),
        x.createGeometry(t)
      );
    }
  );
});
