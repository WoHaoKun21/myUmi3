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
  './ArcType-66bc286a',
  './EllipsoidRhumbLine-6ca4b1e6',
  './EllipsoidGeodesic-db2069b3',
  './PolylinePipeline-65700d85',
  './Color-69f1845f',
], function (
  e,
  o,
  r,
  t,
  a,
  i,
  l,
  n,
  s,
  d,
  p,
  f,
  c,
  u,
  y,
  h,
  C,
  g,
  T,
  v,
  b,
  m,
  E,
  P,
) {
  function _(e, o, r, t, a, i, l) {
    var n,
      s = E.PolylinePipeline.numberOfPoints(e, o, a),
      d = r.red,
      p = r.green,
      f = r.blue,
      c = r.alpha,
      u = t.red,
      y = t.green,
      h = t.blue,
      C = t.alpha;
    if (P.Color.equals(r, t)) {
      for (n = 0; n < s; n++)
        (i[l++] = P.Color.floatToByte(d)),
          (i[l++] = P.Color.floatToByte(p)),
          (i[l++] = P.Color.floatToByte(f)),
          (i[l++] = P.Color.floatToByte(c));
      return l;
    }
    var g = (u - d) / s,
      T = (y - p) / s,
      v = (h - f) / s,
      b = (C - c) / s,
      m = l;
    for (n = 0; n < s; n++)
      (i[m++] = P.Color.floatToByte(d + n * g)),
        (i[m++] = P.Color.floatToByte(p + n * T)),
        (i[m++] = P.Color.floatToByte(f + n * v)),
        (i[m++] = P.Color.floatToByte(c + n * b));
    return m;
  }
  function B(i) {
    var l = (i = e.defaultValue(i, e.defaultValue.EMPTY_OBJECT)).positions,
      n = i.colors,
      s = e.defaultValue(i.colorsPerVertex, !1);
    if (!e.defined(l) || l.length < 2)
      throw new o.DeveloperError('At least two positions are required.');
    if (
      e.defined(n) &&
      ((s && n.length < l.length) || (!s && n.length < l.length - 1))
    )
      throw new o.DeveloperError('colors has an invalid length.');
    (this._positions = l),
      (this._colors = n),
      (this._colorsPerVertex = s),
      (this._arcType = e.defaultValue(i.arcType, v.ArcType.GEODESIC)),
      (this._granularity = e.defaultValue(
        i.granularity,
        r.CesiumMath.RADIANS_PER_DEGREE,
      )),
      (this._ellipsoid = e.defaultValue(i.ellipsoid, a.Ellipsoid.WGS84)),
      (this._workerName = 'createSimplePolylineGeometry');
    var d = 1 + l.length * t.Cartesian3.packedLength;
    (d += e.defined(n) ? 1 + n.length * P.Color.packedLength : 1),
      (this.packedLength = d + a.Ellipsoid.packedLength + 3);
  }
  (B.pack = function (r, i, l) {
    if (!e.defined(r)) throw new o.DeveloperError('value is required');
    if (!e.defined(i)) throw new o.DeveloperError('array is required');
    var n;
    l = e.defaultValue(l, 0);
    var s = r._positions,
      d = s.length;
    for (i[l++] = d, n = 0; n < d; ++n, l += t.Cartesian3.packedLength)
      t.Cartesian3.pack(s[n], i, l);
    var p = r._colors;
    for (
      d = e.defined(p) ? p.length : 0, i[l++] = d, n = 0;
      n < d;
      ++n, l += P.Color.packedLength
    )
      P.Color.pack(p[n], i, l);
    return (
      a.Ellipsoid.pack(r._ellipsoid, i, l),
      (l += a.Ellipsoid.packedLength),
      (i[l++] = r._colorsPerVertex ? 1 : 0),
      (i[l++] = r._arcType),
      (i[l] = r._granularity),
      i
    );
  }),
    (B.unpack = function (r, i, l) {
      if (!e.defined(r)) throw new o.DeveloperError('array is required');
      var n;
      i = e.defaultValue(i, 0);
      var s = r[i++],
        d = new Array(s);
      for (n = 0; n < s; ++n, i += t.Cartesian3.packedLength)
        d[n] = t.Cartesian3.unpack(r, i);
      var p = 0 < (s = r[i++]) ? new Array(s) : void 0;
      for (n = 0; n < s; ++n, i += P.Color.packedLength)
        p[n] = P.Color.unpack(r, i);
      var f = a.Ellipsoid.unpack(r, i);
      i += a.Ellipsoid.packedLength;
      var c = 1 === r[i++],
        u = r[i++],
        y = r[i];
      return e.defined(l)
        ? ((l._positions = d),
          (l._colors = p),
          (l._ellipsoid = f),
          (l._colorsPerVertex = c),
          (l._arcType = u),
          (l._granularity = y),
          l)
        : new B({
            positions: d,
            colors: p,
            ellipsoid: f,
            colorsPerVertex: c,
            arcType: u,
            granularity: y,
          });
    });
  var A = new Array(2),
    w = new Array(2),
    k = {
      positions: A,
      height: w,
      ellipsoid: void 0,
      minDistance: void 0,
      granularity: void 0,
    };
  return (
    (B.createGeometry = function (o) {
      var a,
        l,
        n,
        s,
        c,
        u = o._positions,
        y = o._colors,
        g = o._colorsPerVertex,
        T = o._arcType,
        b = o._granularity,
        m = o._ellipsoid,
        B = r.CesiumMath.chordLength(b, m.maximumRadius),
        D = e.defined(y) && !g,
        G = u.length,
        L = 0;
      if (T === v.ArcType.GEODESIC || T === v.ArcType.RHUMB) {
        var V, S, x;
        x =
          T === v.ArcType.GEODESIC
            ? ((V = r.CesiumMath.chordLength(b, m.maximumRadius)),
              (S = E.PolylinePipeline.numberOfPoints),
              E.PolylinePipeline.generateArc)
            : ((V = b),
              (S = E.PolylinePipeline.numberOfPointsRhumbLine),
              E.PolylinePipeline.generateRhumbArc);
        var I = E.PolylinePipeline.extractHeights(u, m),
          R = k;
        if (
          (T === v.ArcType.GEODESIC ? (R.minDistance = B) : (R.granularity = b),
          (R.ellipsoid = m),
          D)
        ) {
          var O = 0;
          for (a = 0; a < G - 1; a++) O += S(u[a], u[a + 1], V) + 1;
          (l = new Float64Array(3 * O)),
            (s = new Uint8Array(4 * O)),
            (R.positions = A),
            (R.height = w);
          var M = 0;
          for (a = 0; a < G - 1; ++a) {
            (A[0] = u[a]), (A[1] = u[a + 1]), (w[0] = I[a]), (w[1] = I[a + 1]);
            var U = x(R);
            if (e.defined(y)) {
              var q = U.length / 3;
              c = y[a];
              for (var N = 0; N < q; ++N)
                (s[M++] = P.Color.floatToByte(c.red)),
                  (s[M++] = P.Color.floatToByte(c.green)),
                  (s[M++] = P.Color.floatToByte(c.blue)),
                  (s[M++] = P.Color.floatToByte(c.alpha));
            }
            l.set(U, L), (L += U.length);
          }
        } else if (
          ((R.positions = u),
          (R.height = I),
          (l = new Float64Array(x(R))),
          e.defined(y))
        ) {
          for (s = new Uint8Array((l.length / 3) * 4), a = 0; a < G - 1; ++a)
            L = _(u[a], u[a + 1], y[a], y[a + 1], B, s, L);
          var F = y[G - 1];
          (s[L++] = P.Color.floatToByte(F.red)),
            (s[L++] = P.Color.floatToByte(F.green)),
            (s[L++] = P.Color.floatToByte(F.blue)),
            (s[L++] = P.Color.floatToByte(F.alpha));
        }
      } else {
        (n = D ? 2 * G - 2 : G),
          (l = new Float64Array(3 * n)),
          (s = e.defined(y) ? new Uint8Array(4 * n) : void 0);
        var H = 0,
          W = 0;
        for (a = 0; a < G; ++a) {
          var Y = u[a];
          if (
            (D &&
              0 < a &&
              (t.Cartesian3.pack(Y, l, H),
              (H += 3),
              (c = y[a - 1]),
              (s[W++] = P.Color.floatToByte(c.red)),
              (s[W++] = P.Color.floatToByte(c.green)),
              (s[W++] = P.Color.floatToByte(c.blue)),
              (s[W++] = P.Color.floatToByte(c.alpha))),
            D && a === G - 1)
          )
            break;
          t.Cartesian3.pack(Y, l, H),
            (H += 3),
            e.defined(y) &&
              ((c = y[a]),
              (s[W++] = P.Color.floatToByte(c.red)),
              (s[W++] = P.Color.floatToByte(c.green)),
              (s[W++] = P.Color.floatToByte(c.blue)),
              (s[W++] = P.Color.floatToByte(c.alpha)));
        }
      }
      var z = new h.GeometryAttributes();
      (z.position = new p.GeometryAttribute({
        componentDatatype: d.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: l,
      })),
        e.defined(y) &&
          (z.color = new p.GeometryAttribute({
            componentDatatype: d.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 4,
            values: s,
            normalize: !0,
          }));
      var J = 2 * ((n = l.length / 3) - 1),
        j = C.IndexDatatype.createTypedArray(n, J),
        K = 0;
      for (a = 0; a < n - 1; ++a) (j[K++] = a), (j[K++] = a + 1);
      return new p.Geometry({
        attributes: z,
        indices: j,
        primitiveType: f.PrimitiveType.LINES,
        boundingSphere: i.BoundingSphere.fromPoints(u),
      });
    }),
    function (o, r) {
      return (
        e.defined(r) && (o = B.unpack(o, r)),
        (o._ellipsoid = a.Ellipsoid.clone(o._ellipsoid)),
        B.createGeometry(o)
      );
    }
  );
});
