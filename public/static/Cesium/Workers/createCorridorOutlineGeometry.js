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
  './arrayFill-9766fb2e',
  './GeometryOffsetAttribute-999fc023',
  './arrayRemoveDuplicates-2869246d',
  './EllipsoidTangentPlane-9c25b2da',
  './EllipsoidRhumbLine-6ca4b1e6',
  './earcut-2.2.1-b404d9e6',
  './PolygonPipeline-cc78b34e',
  './PolylineVolumeGeometryLibrary-ac3b176f',
  './EllipsoidGeodesic-db2069b3',
  './PolylinePipeline-65700d85',
  './CorridorGeometryLibrary-f6551651',
], function (
  e,
  t,
  i,
  r,
  o,
  a,
  n,
  s,
  l,
  d,
  u,
  p,
  f,
  h,
  c,
  y,
  b,
  g,
  m,
  v,
  A,
  C,
  _,
  E,
  G,
  T,
  P,
  w,
  L,
  D,
) {
  var k = new r.Cartesian3(),
    O = new r.Cartesian3(),
    N = new r.Cartesian3();
  function V(t, i) {
    var o,
      a,
      n,
      s = [],
      l = t.positions,
      p = t.corners,
      f = t.endPositions,
      h = new y.GeometryAttributes(),
      c = 0,
      g = 0,
      m = 0;
    for (a = 0; a < l.length; a += 2)
      (c += n = l[a].length - 3),
        (m += (n / 3) * 4),
        (g += l[a + 1].length - 3);
    for (c += 3, g += 3, a = 0; a < p.length; a++) {
      o = p[a];
      var v = p[a].leftPositions;
      e.defined(v)
        ? (c += n = v.length)
        : (g += n = p[a].rightPositions.length),
        (m += (n / 3) * 2);
    }
    var A,
      C = e.defined(f);
    C && ((c += A = f[0].length - 3), (g += A), (m += 4 * (A /= 3)));
    var _,
      E,
      G,
      T,
      w,
      L,
      V = c + g,
      x = new Float64Array(V),
      H = 0,
      I = V - 1,
      S = A / 2,
      M = b.IndexDatatype.createTypedArray(V / 3, m + 4),
      R = 0;
    if (((M[R++] = H / 3), (M[R++] = (I - 2) / 3), C)) {
      s.push(H / 3), (L = k), (w = O);
      var B = f[0];
      for (a = 0; a < S; a++)
        (L = r.Cartesian3.fromArray(B, 3 * (S - 1 - a), L)),
          (w = r.Cartesian3.fromArray(B, 3 * (S + a), w)),
          D.CorridorGeometryLibrary.addAttribute(x, w, H),
          D.CorridorGeometryLibrary.addAttribute(x, L, void 0, I),
          (T = 1 + (E = H / 3)),
          (G = (_ = (I - 2) / 3) - 1),
          (M[R++] = _),
          (M[R++] = G),
          (M[R++] = E),
          (M[R++] = T),
          (H += 3),
          (I -= 3);
    }
    var F = 0,
      U = l[F++],
      j = l[F++];
    for (
      x.set(U, H),
        x.set(j, I - j.length + 1),
        n = j.length - 3,
        s.push(H / 3, (I - 2) / 3),
        a = 0;
      a < n;
      a += 3
    )
      (T = 1 + (E = H / 3)),
        (G = (_ = (I - 2) / 3) - 1),
        (M[R++] = _),
        (M[R++] = G),
        (M[R++] = E),
        (M[R++] = T),
        (H += 3),
        (I -= 3);
    for (a = 0; a < p.length; a++) {
      var Y,
        q,
        W = (o = p[a]).leftPositions,
        J = o.rightPositions,
        z = N;
      if (e.defined(W)) {
        for (I -= 3, q = G, s.push(T), Y = 0; Y < W.length / 3; Y++)
          (z = r.Cartesian3.fromArray(W, 3 * Y, z)),
            (M[R++] = q - Y - 1),
            (M[R++] = q - Y),
            D.CorridorGeometryLibrary.addAttribute(x, z, void 0, I),
            (I -= 3);
        s.push(q - Math.floor(W.length / 6)),
          i === P.CornerType.BEVELED && s.push((I - 2) / 3 + 1),
          (H += 3);
      } else {
        for (H += 3, q = T, s.push(G), Y = 0; Y < J.length / 3; Y++)
          (z = r.Cartesian3.fromArray(J, 3 * Y, z)),
            (M[R++] = q + Y),
            (M[R++] = q + Y + 1),
            D.CorridorGeometryLibrary.addAttribute(x, z, H),
            (H += 3);
        s.push(q + Math.floor(J.length / 6)),
          i === P.CornerType.BEVELED && s.push(H / 3 - 1),
          (I -= 3);
      }
      for (
        U = l[F++],
          j = l[F++],
          U.splice(0, 3),
          j.splice(j.length - 3, 3),
          x.set(U, H),
          x.set(j, I - j.length + 1),
          n = j.length - 3,
          Y = 0;
        Y < j.length;
        Y += 3
      )
        (E = (T = H / 3) - 1),
          (_ = 1 + (G = (I - 2) / 3)),
          (M[R++] = _),
          (M[R++] = G),
          (M[R++] = E),
          (M[R++] = T),
          (H += 3),
          (I -= 3);
      (H -= 3), (I += 3), s.push(H / 3, (I - 2) / 3);
    }
    if (C) {
      (H += 3), (I -= 3), (L = k), (w = O);
      var K = f[1];
      for (a = 0; a < S; a++)
        (L = r.Cartesian3.fromArray(K, 3 * (A - a - 1), L)),
          (w = r.Cartesian3.fromArray(K, 3 * a, w)),
          D.CorridorGeometryLibrary.addAttribute(x, L, void 0, I),
          D.CorridorGeometryLibrary.addAttribute(x, w, H),
          (E = (T = H / 3) - 1),
          (_ = 1 + (G = (I - 2) / 3)),
          (M[R++] = _),
          (M[R++] = G),
          (M[R++] = E),
          (M[R++] = T),
          (H += 3),
          (I -= 3);
      s.push(H / 3);
    } else s.push(H / 3, (I - 2) / 3);
    return (
      (M[R++] = H / 3),
      (M[R++] = (I - 2) / 3),
      (h.position = new u.GeometryAttribute({
        componentDatatype: d.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: x,
      })),
      { attributes: h, indices: M, wallIndices: s }
    );
  }
  function x(a) {
    var n = (a = e.defaultValue(a, e.defaultValue.EMPTY_OBJECT)).positions,
      s = a.width;
    t.Check.typeOf.object('options.positions', n),
      t.Check.typeOf.number('options.width', s);
    var l = e.defaultValue(a.height, 0),
      d = e.defaultValue(a.extrudedHeight, l);
    (this._positions = n),
      (this._ellipsoid = o.Ellipsoid.clone(
        e.defaultValue(a.ellipsoid, o.Ellipsoid.WGS84),
      )),
      (this._width = s),
      (this._height = Math.max(l, d)),
      (this._extrudedHeight = Math.min(l, d)),
      (this._cornerType = e.defaultValue(a.cornerType, P.CornerType.ROUNDED)),
      (this._granularity = e.defaultValue(
        a.granularity,
        i.CesiumMath.RADIANS_PER_DEGREE,
      )),
      (this._offsetAttribute = a.offsetAttribute),
      (this._workerName = 'createCorridorOutlineGeometry'),
      (this.packedLength =
        1 +
        n.length * r.Cartesian3.packedLength +
        o.Ellipsoid.packedLength +
        6);
  }
  x.pack = function (i, a, n) {
    t.Check.typeOf.object('value', i),
      t.Check.typeOf.object('array', a),
      (n = e.defaultValue(n, 0));
    var s = i._positions,
      l = s.length;
    a[n++] = l;
    for (var d = 0; d < l; ++d, n += r.Cartesian3.packedLength)
      r.Cartesian3.pack(s[d], a, n);
    return (
      o.Ellipsoid.pack(i._ellipsoid, a, n),
      (n += o.Ellipsoid.packedLength),
      (a[n++] = i._width),
      (a[n++] = i._height),
      (a[n++] = i._extrudedHeight),
      (a[n++] = i._cornerType),
      (a[n++] = i._granularity),
      (a[n] = e.defaultValue(i._offsetAttribute, -1)),
      a
    );
  };
  var H = o.Ellipsoid.clone(o.Ellipsoid.UNIT_SPHERE),
    I = {
      positions: void 0,
      ellipsoid: H,
      width: void 0,
      height: void 0,
      extrudedHeight: void 0,
      cornerType: void 0,
      granularity: void 0,
      offsetAttribute: void 0,
    };
  return (
    (x.unpack = function (i, a, n) {
      t.Check.typeOf.object('array', i), (a = e.defaultValue(a, 0));
      for (
        var s = i[a++], l = new Array(s), d = 0;
        d < s;
        ++d, a += r.Cartesian3.packedLength
      )
        l[d] = r.Cartesian3.unpack(i, a);
      var u = o.Ellipsoid.unpack(i, a, H);
      a += o.Ellipsoid.packedLength;
      var p = i[a++],
        f = i[a++],
        h = i[a++],
        c = i[a++],
        y = i[a++],
        b = i[a];
      return e.defined(n)
        ? ((n._positions = l),
          (n._ellipsoid = o.Ellipsoid.clone(u, n._ellipsoid)),
          (n._width = p),
          (n._height = f),
          (n._extrudedHeight = h),
          (n._cornerType = c),
          (n._granularity = y),
          (n._offsetAttribute = -1 === b ? void 0 : b),
          n)
        : ((I.positions = l),
          (I.width = p),
          (I.height = f),
          (I.extrudedHeight = h),
          (I.cornerType = c),
          (I.granularity = y),
          (I.offsetAttribute = -1 === b ? void 0 : b),
          new x(I));
    }),
    (x.createGeometry = function (t) {
      var o = t._positions,
        n = t._width,
        s = t._ellipsoid;
      o = (function (e, t) {
        for (var i = 0; i < e.length; i++)
          e[i] = t.scaleToGeodeticSurface(e[i], e[i]);
        return e;
      })(o, s);
      var l = C.arrayRemoveDuplicates(o, r.Cartesian3.equalsEpsilon);
      if (!(l.length < 2 || n <= 0)) {
        var f,
          h = t._height,
          c = t._extrudedHeight,
          y = !i.CesiumMath.equalsEpsilon(h, c, 0, i.CesiumMath.EPSILON2),
          g = {
            ellipsoid: s,
            positions: l,
            width: n,
            cornerType: t._cornerType,
            granularity: t._granularity,
            saveAttributes: !1,
          };
        if (y)
          (g.height = h),
            (g.extrudedHeight = c),
            (g.offsetAttribute = t._offsetAttribute),
            (f = (function (t) {
              var i = t.ellipsoid,
                r = V(
                  D.CorridorGeometryLibrary.computePositions(t),
                  t.cornerType,
                ),
                o = r.wallIndices,
                a = t.height,
                n = t.extrudedHeight,
                s = r.attributes,
                l = r.indices,
                p = s.position.values,
                f = p.length,
                h = new Float64Array(f);
              h.set(p);
              var c,
                y = new Float64Array(2 * f);
              if (
                ((p = T.PolygonPipeline.scaleToGeodeticHeight(p, a, i)),
                (h = T.PolygonPipeline.scaleToGeodeticHeight(h, n, i)),
                y.set(p),
                y.set(h, f),
                (s.position.values = y),
                (f /= 3),
                e.defined(t.offsetAttribute))
              ) {
                var g = new Uint8Array(2 * f);
                if (t.offsetAttribute === A.GeometryOffsetAttribute.TOP)
                  g = v.arrayFill(g, 1, 0, f);
                else {
                  var m =
                    t.offsetAttribute === A.GeometryOffsetAttribute.NONE
                      ? 0
                      : 1;
                  g = v.arrayFill(g, m);
                }
                s.applyOffset = new u.GeometryAttribute({
                  componentDatatype: d.ComponentDatatype.UNSIGNED_BYTE,
                  componentsPerAttribute: 1,
                  values: g,
                });
              }
              var C = l.length,
                _ = b.IndexDatatype.createTypedArray(
                  y.length / 3,
                  2 * (C + o.length),
                );
              _.set(l);
              var E,
                G,
                P = C;
              for (c = 0; c < C; c += 2) {
                var w = l[c],
                  L = l[c + 1];
                (_[P++] = w + f), (_[P++] = L + f);
              }
              for (c = 0; c < o.length; c++)
                (G = (E = o[c]) + f), (_[P++] = E), (_[P++] = G);
              return { attributes: s, indices: _ };
            })(g));
        else if (
          (((f = V(
            D.CorridorGeometryLibrary.computePositions(g),
            g.cornerType,
          )).attributes.position.values =
            T.PolygonPipeline.scaleToGeodeticHeight(
              f.attributes.position.values,
              h,
              s,
            )),
          e.defined(t._offsetAttribute))
        ) {
          var m = f.attributes.position.values.length,
            _ = new Uint8Array(m / 3),
            E = t._offsetAttribute === A.GeometryOffsetAttribute.NONE ? 0 : 1;
          v.arrayFill(_, E),
            (f.attributes.applyOffset = new u.GeometryAttribute({
              componentDatatype: d.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: _,
            }));
        }
        var G = f.attributes,
          P = a.BoundingSphere.fromVertices(G.position.values, void 0, 3);
        return new u.Geometry({
          attributes: G,
          indices: f.indices,
          primitiveType: p.PrimitiveType.LINES,
          boundingSphere: P,
          offsetAttribute: t._offsetAttribute,
        });
      }
    }),
    function (t, i) {
      return (
        e.defined(i) && (t = x.unpack(t, i)),
        (t._ellipsoid = o.Ellipsoid.clone(t._ellipsoid)),
        x.createGeometry(t)
      );
    }
  );
});
