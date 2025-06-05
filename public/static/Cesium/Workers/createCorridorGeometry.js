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
  './VertexFormat-fe4db402',
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
  t,
  e,
  r,
  a,
  i,
  o,
  n,
  s,
  l,
  d,
  u,
  m,
  f,
  y,
  c,
  p,
  h,
  g,
  b,
  C,
  v,
  A,
  _,
  w,
  T,
  G,
  E,
  V,
  F,
  L,
  P,
) {
  var x = new a.Cartesian3(),
    N = new a.Cartesian3(),
    D = new a.Cartesian3(),
    M = new a.Cartesian3(),
    O = new a.Cartesian3(),
    I = new a.Cartesian3(),
    k = new a.Cartesian3(),
    S = new a.Cartesian3();
  function R(t, e) {
    for (var r = 0; r < t.length; r++)
      t[r] = e.scaleToGeodeticSurface(t[r], t[r]);
    return t;
  }
  function H(t, e, r, i, o, n) {
    var s = t.normals,
      l = t.tangents,
      d = t.bitangents,
      u = a.Cartesian3.normalize(a.Cartesian3.cross(r, e, k), k);
    n.normal && P.CorridorGeometryLibrary.addAttribute(s, e, i, o),
      n.tangent && P.CorridorGeometryLibrary.addAttribute(l, u, i, o),
      n.bitangent && P.CorridorGeometryLibrary.addAttribute(d, r, i, o);
  }
  function z(e, i, o) {
    var n,
      s,
      l,
      m = e.positions,
      f = e.corners,
      y = e.endPositions,
      c = e.lefts,
      g = e.normals,
      b = new p.GeometryAttributes(),
      C = 0,
      v = 0,
      A = 0;
    for (s = 0; s < m.length; s += 2)
      (C += l = m[s].length - 3), (A += 2 * l), (v += m[s + 1].length - 3);
    for (C += 3, v += 3, s = 0; s < f.length; s++) {
      n = f[s];
      var _ = f[s].leftPositions;
      t.defined(_)
        ? (C += l = _.length)
        : (v += l = f[s].rightPositions.length),
        (A += l);
    }
    var w,
      T = t.defined(y);
    T && ((C += w = y[0].length - 3), (v += w), (A += 6 * (w /= 3)));
    var G,
      E,
      V,
      F,
      L,
      O,
      R = C + v,
      z = new Float64Array(R),
      U = {
        normals: i.normal ? new Float32Array(R) : void 0,
        tangents: i.tangent ? new Float32Array(R) : void 0,
        bitangents: i.bitangent ? new Float32Array(R) : void 0,
      },
      B = 0,
      Y = R - 1,
      W = x,
      q = N,
      J = w / 2,
      j = h.IndexDatatype.createTypedArray(R / 3, A),
      K = 0;
    if (T) {
      (O = D), (L = M);
      var Q = y[0];
      for (
        W = a.Cartesian3.fromArray(g, 0, W),
          q = a.Cartesian3.fromArray(c, 0, q),
          s = 0;
        s < J;
        s++
      )
        (O = a.Cartesian3.fromArray(Q, 3 * (J - 1 - s), O)),
          (L = a.Cartesian3.fromArray(Q, 3 * (J + s), L)),
          P.CorridorGeometryLibrary.addAttribute(z, L, B),
          P.CorridorGeometryLibrary.addAttribute(z, O, void 0, Y),
          H(U, W, q, B, Y, i),
          (F = 1 + (E = B / 3)),
          (V = (G = (Y - 2) / 3) - 1),
          (j[K++] = G),
          (j[K++] = E),
          (j[K++] = V),
          (j[K++] = V),
          (j[K++] = E),
          (j[K++] = F),
          (B += 3),
          (Y -= 3);
    }
    var X,
      Z,
      $ = 0,
      tt = 0,
      et = m[$++],
      rt = m[$++];
    for (
      z.set(et, B),
        z.set(rt, Y - rt.length + 1),
        q = a.Cartesian3.fromArray(c, tt, q),
        l = rt.length - 3,
        s = 0;
      s < l;
      s += 3
    )
      (X = o.geodeticSurfaceNormal(a.Cartesian3.fromArray(et, s, k), k)),
        (Z = o.geodeticSurfaceNormal(a.Cartesian3.fromArray(rt, l - s, S), S)),
        H(
          U,
          (W = a.Cartesian3.normalize(a.Cartesian3.add(X, Z, W), W)),
          q,
          B,
          Y,
          i,
        ),
        (F = 1 + (E = B / 3)),
        (V = (G = (Y - 2) / 3) - 1),
        (j[K++] = G),
        (j[K++] = E),
        (j[K++] = V),
        (j[K++] = V),
        (j[K++] = E),
        (j[K++] = F),
        (B += 3),
        (Y -= 3);
    for (
      X = o.geodeticSurfaceNormal(a.Cartesian3.fromArray(et, l, k), k),
        Z = o.geodeticSurfaceNormal(a.Cartesian3.fromArray(rt, l, S), S),
        W = a.Cartesian3.normalize(a.Cartesian3.add(X, Z, W), W),
        tt += 3,
        s = 0;
      s < f.length;
      s++
    ) {
      var at,
        it,
        ot,
        nt = (n = f[s]).leftPositions,
        st = n.rightPositions,
        lt = I,
        dt = D,
        ut = M;
      if (((W = a.Cartesian3.fromArray(g, tt, W)), t.defined(nt))) {
        for (
          H(U, W, q, void 0, Y, i), Y -= 3, it = F, ot = V, at = 0;
          at < nt.length / 3;
          at++
        )
          (lt = a.Cartesian3.fromArray(nt, 3 * at, lt)),
            (j[K++] = it),
            (j[K++] = ot - at - 1),
            (j[K++] = ot - at),
            P.CorridorGeometryLibrary.addAttribute(z, lt, void 0, Y),
            (dt = a.Cartesian3.fromArray(z, 3 * (ot - at - 1), dt)),
            (ut = a.Cartesian3.fromArray(z, 3 * it, ut)),
            H(
              U,
              W,
              (q = a.Cartesian3.normalize(a.Cartesian3.subtract(dt, ut, q), q)),
              void 0,
              Y,
              i,
            ),
            (Y -= 3);
        (lt = a.Cartesian3.fromArray(z, 3 * it, lt)),
          (dt = a.Cartesian3.subtract(
            a.Cartesian3.fromArray(z, 3 * ot, dt),
            lt,
            dt,
          )),
          (ut = a.Cartesian3.subtract(
            a.Cartesian3.fromArray(z, 3 * (ot - at), ut),
            lt,
            ut,
          )),
          H(
            U,
            W,
            (q = a.Cartesian3.normalize(a.Cartesian3.add(dt, ut, q), q)),
            B,
            void 0,
            i,
          ),
          (B += 3);
      } else {
        for (
          H(U, W, q, B, void 0, i), B += 3, it = V, ot = F, at = 0;
          at < st.length / 3;
          at++
        )
          (lt = a.Cartesian3.fromArray(st, 3 * at, lt)),
            (j[K++] = it),
            (j[K++] = ot + at),
            (j[K++] = ot + at + 1),
            P.CorridorGeometryLibrary.addAttribute(z, lt, B),
            (dt = a.Cartesian3.fromArray(z, 3 * it, dt)),
            (ut = a.Cartesian3.fromArray(z, 3 * (ot + at), ut)),
            H(
              U,
              W,
              (q = a.Cartesian3.normalize(a.Cartesian3.subtract(dt, ut, q), q)),
              B,
              void 0,
              i,
            ),
            (B += 3);
        (lt = a.Cartesian3.fromArray(z, 3 * it, lt)),
          (dt = a.Cartesian3.subtract(
            a.Cartesian3.fromArray(z, 3 * (ot + at), dt),
            lt,
            dt,
          )),
          (ut = a.Cartesian3.subtract(
            a.Cartesian3.fromArray(z, 3 * ot, ut),
            lt,
            ut,
          )),
          H(
            U,
            W,
            (q = a.Cartesian3.normalize(
              a.Cartesian3.negate(a.Cartesian3.add(ut, dt, q), q),
              q,
            )),
            void 0,
            Y,
            i,
          ),
          (Y -= 3);
      }
      for (
        et = m[$++],
          rt = m[$++],
          et.splice(0, 3),
          rt.splice(rt.length - 3, 3),
          z.set(et, B),
          z.set(rt, Y - rt.length + 1),
          l = rt.length - 3,
          tt += 3,
          q = a.Cartesian3.fromArray(c, tt, q),
          at = 0;
        at < rt.length;
        at += 3
      )
        (X = o.geodeticSurfaceNormal(a.Cartesian3.fromArray(et, at, k), k)),
          (Z = o.geodeticSurfaceNormal(
            a.Cartesian3.fromArray(rt, l - at, S),
            S,
          )),
          H(
            U,
            (W = a.Cartesian3.normalize(a.Cartesian3.add(X, Z, W), W)),
            q,
            B,
            Y,
            i,
          ),
          (E = (F = B / 3) - 1),
          (G = 1 + (V = (Y - 2) / 3)),
          (j[K++] = G),
          (j[K++] = E),
          (j[K++] = V),
          (j[K++] = V),
          (j[K++] = E),
          (j[K++] = F),
          (B += 3),
          (Y -= 3);
      (B -= 3), (Y += 3);
    }
    if (
      (H(U, (W = a.Cartesian3.fromArray(g, g.length - 3, W)), q, B, Y, i), T)
    ) {
      (B += 3), (Y -= 3), (O = D), (L = M);
      var mt = y[1];
      for (s = 0; s < J; s++)
        (O = a.Cartesian3.fromArray(mt, 3 * (w - s - 1), O)),
          (L = a.Cartesian3.fromArray(mt, 3 * s, L)),
          P.CorridorGeometryLibrary.addAttribute(z, O, void 0, Y),
          P.CorridorGeometryLibrary.addAttribute(z, L, B),
          H(U, W, q, B, Y, i),
          (E = (F = B / 3) - 1),
          (G = 1 + (V = (Y - 2) / 3)),
          (j[K++] = G),
          (j[K++] = E),
          (j[K++] = V),
          (j[K++] = V),
          (j[K++] = E),
          (j[K++] = F),
          (B += 3),
          (Y -= 3);
    }
    if (
      ((b.position = new u.GeometryAttribute({
        componentDatatype: d.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: z,
      })),
      i.st)
    ) {
      var ft,
        yt,
        ct = new Float32Array((R / 3) * 2),
        pt = 0;
      if (T) {
        (C /= 3), (v /= 3);
        var ht,
          gt = Math.PI / (w + 1);
        (yt = 1 / (C - w + 1)), (ft = 1 / (v - w + 1));
        var bt = w / 2;
        for (s = bt + 1; s < w + 1; s++)
          (ht = r.CesiumMath.PI_OVER_TWO + gt * s),
            (ct[pt++] = ft * (1 + Math.cos(ht))),
            (ct[pt++] = 0.5 * (1 + Math.sin(ht)));
        for (s = 1; s < v - w + 1; s++) (ct[pt++] = s * ft), (ct[pt++] = 0);
        for (s = w; bt < s; s--)
          (ht = r.CesiumMath.PI_OVER_TWO - s * gt),
            (ct[pt++] = 1 - ft * (1 + Math.cos(ht))),
            (ct[pt++] = 0.5 * (1 + Math.sin(ht)));
        for (s = bt; 0 < s; s--)
          (ht = r.CesiumMath.PI_OVER_TWO - gt * s),
            (ct[pt++] = 1 - yt * (1 + Math.cos(ht))),
            (ct[pt++] = 0.5 * (1 + Math.sin(ht)));
        for (s = C - w; 0 < s; s--) (ct[pt++] = s * yt), (ct[pt++] = 1);
        for (s = 1; s < bt + 1; s++)
          (ht = r.CesiumMath.PI_OVER_TWO + gt * s),
            (ct[pt++] = yt * (1 + Math.cos(ht))),
            (ct[pt++] = 0.5 * (1 + Math.sin(ht)));
      } else {
        for (
          yt = 1 / ((C /= 3) - 1), ft = 1 / ((v /= 3) - 1), s = 0;
          s < v;
          s++
        )
          (ct[pt++] = s * ft), (ct[pt++] = 0);
        for (s = C; 0 < s; s--) (ct[pt++] = (s - 1) * yt), (ct[pt++] = 1);
      }
      b.st = new u.GeometryAttribute({
        componentDatatype: d.ComponentDatatype.FLOAT,
        componentsPerAttribute: 2,
        values: ct,
      });
    }
    return (
      i.normal &&
        (b.normal = new u.GeometryAttribute({
          componentDatatype: d.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: U.normals,
        })),
      i.tangent &&
        (b.tangent = new u.GeometryAttribute({
          componentDatatype: d.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: U.tangents,
        })),
      i.bitangent &&
        (b.bitangent = new u.GeometryAttribute({
          componentDatatype: d.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: U.bitangents,
        })),
      { attributes: b, indices: j }
    );
  }
  function U(t, e, r) {
    (r[e++] = t[0]), (r[e++] = t[1]), (r[e++] = t[2]);
    for (var a = 3; a < t.length; a += 3) {
      var i = t[a],
        o = t[a + 1],
        n = t[a + 2];
      (r[e++] = i),
        (r[e++] = o),
        (r[e++] = n),
        (r[e++] = i),
        (r[e++] = o),
        (r[e++] = n);
    }
    return (r[e++] = t[0]), (r[e++] = t[1]), (r[e++] = t[2]), r;
  }
  var B = new a.Cartesian3(),
    Y = new a.Cartesian3(),
    W = new a.Cartographic();
  function q(t, e, r, i, o, n) {
    var s = a.Cartesian3.subtract(e, t, B);
    a.Cartesian3.normalize(s, s);
    var l = r.geodeticSurfaceNormal(t, Y),
      d = a.Cartesian3.cross(s, l, B);
    a.Cartesian3.multiplyByScalar(d, i, d);
    var u = o.latitude,
      m = o.longitude,
      f = n.latitude,
      y = n.longitude;
    a.Cartesian3.add(t, d, Y), r.cartesianToCartographic(Y, W);
    var c = W.latitude,
      p = W.longitude;
    (u = Math.min(u, c)),
      (m = Math.min(m, p)),
      (f = Math.max(f, c)),
      (y = Math.max(y, p)),
      a.Cartesian3.subtract(t, d, Y),
      r.cartesianToCartographic(Y, W),
      (c = W.latitude),
      (p = W.longitude),
      (u = Math.min(u, c)),
      (m = Math.min(m, p)),
      (f = Math.max(f, c)),
      (y = Math.max(y, p)),
      (o.latitude = u),
      (o.longitude = m),
      (n.latitude = f),
      (n.longitude = y);
  }
  var J = new a.Cartesian3(),
    j = new a.Cartesian3(),
    K = new a.Cartographic(),
    Q = new a.Cartographic();
  function X(e, r, o, n, s) {
    e = R(e, r);
    var l = _.arrayRemoveDuplicates(e, a.Cartesian3.equalsEpsilon),
      d = l.length;
    if (d < 2 || o <= 0) return new i.Rectangle();
    var u,
      m,
      f = 0.5 * o;
    if (
      ((K.latitude = Number.POSITIVE_INFINITY),
      (K.longitude = Number.POSITIVE_INFINITY),
      (Q.latitude = Number.NEGATIVE_INFINITY),
      (Q.longitude = Number.NEGATIVE_INFINITY),
      n === V.CornerType.ROUNDED)
    ) {
      var y = l[0];
      a.Cartesian3.subtract(y, l[1], J),
        a.Cartesian3.normalize(J, J),
        a.Cartesian3.multiplyByScalar(J, f, J),
        a.Cartesian3.add(y, J, j),
        r.cartesianToCartographic(j, W),
        (u = W.latitude),
        (m = W.longitude),
        (K.latitude = Math.min(K.latitude, u)),
        (K.longitude = Math.min(K.longitude, m)),
        (Q.latitude = Math.max(Q.latitude, u)),
        (Q.longitude = Math.max(Q.longitude, m));
    }
    for (var c = 0; c < d - 1; ++c) q(l[c], l[c + 1], r, f, K, Q);
    var p = l[d - 1];
    a.Cartesian3.subtract(p, l[d - 2], J),
      a.Cartesian3.normalize(J, J),
      a.Cartesian3.multiplyByScalar(J, f, J),
      a.Cartesian3.add(p, J, j),
      q(p, j, r, f, K, Q),
      n === V.CornerType.ROUNDED &&
        (r.cartesianToCartographic(j, W),
        (u = W.latitude),
        (m = W.longitude),
        (K.latitude = Math.min(K.latitude, u)),
        (K.longitude = Math.min(K.longitude, m)),
        (Q.latitude = Math.max(Q.latitude, u)),
        (Q.longitude = Math.max(Q.longitude, m)));
    var h = t.defined(s) ? s : new i.Rectangle();
    return (
      (h.north = Q.latitude),
      (h.south = K.latitude),
      (h.east = Q.longitude),
      (h.west = K.longitude),
      h
    );
  }
  function Z(o) {
    var n = (o = t.defaultValue(o, t.defaultValue.EMPTY_OBJECT)).positions,
      s = o.width;
    e.Check.defined('options.positions', n),
      e.Check.defined('options.width', s);
    var l = t.defaultValue(o.height, 0),
      d = t.defaultValue(o.extrudedHeight, l);
    (this._positions = n),
      (this._ellipsoid = i.Ellipsoid.clone(
        t.defaultValue(o.ellipsoid, i.Ellipsoid.WGS84),
      )),
      (this._vertexFormat = A.VertexFormat.clone(
        t.defaultValue(o.vertexFormat, A.VertexFormat.DEFAULT),
      )),
      (this._width = s),
      (this._height = Math.max(l, d)),
      (this._extrudedHeight = Math.min(l, d)),
      (this._cornerType = t.defaultValue(o.cornerType, V.CornerType.ROUNDED)),
      (this._granularity = t.defaultValue(
        o.granularity,
        r.CesiumMath.RADIANS_PER_DEGREE,
      )),
      (this._shadowVolume = t.defaultValue(o.shadowVolume, !1)),
      (this._workerName = 'createCorridorGeometry'),
      (this._offsetAttribute = o.offsetAttribute),
      (this._rectangle = void 0),
      (this.packedLength =
        1 +
        n.length * a.Cartesian3.packedLength +
        i.Ellipsoid.packedLength +
        A.VertexFormat.packedLength +
        7);
  }
  Z.pack = function (r, o, n) {
    e.Check.defined('value', r),
      e.Check.defined('array', o),
      (n = t.defaultValue(n, 0));
    var s = r._positions,
      l = s.length;
    o[n++] = l;
    for (var d = 0; d < l; ++d, n += a.Cartesian3.packedLength)
      a.Cartesian3.pack(s[d], o, n);
    return (
      i.Ellipsoid.pack(r._ellipsoid, o, n),
      (n += i.Ellipsoid.packedLength),
      A.VertexFormat.pack(r._vertexFormat, o, n),
      (n += A.VertexFormat.packedLength),
      (o[n++] = r._width),
      (o[n++] = r._height),
      (o[n++] = r._extrudedHeight),
      (o[n++] = r._cornerType),
      (o[n++] = r._granularity),
      (o[n++] = r._shadowVolume ? 1 : 0),
      (o[n] = t.defaultValue(r._offsetAttribute, -1)),
      o
    );
  };
  var $ = i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),
    tt = new A.VertexFormat(),
    et = {
      positions: void 0,
      ellipsoid: $,
      vertexFormat: tt,
      width: void 0,
      height: void 0,
      extrudedHeight: void 0,
      cornerType: void 0,
      granularity: void 0,
      shadowVolume: void 0,
      offsetAttribute: void 0,
    };
  return (
    (Z.unpack = function (r, o, n) {
      e.Check.defined('array', r), (o = t.defaultValue(o, 0));
      for (
        var s = r[o++], l = new Array(s), d = 0;
        d < s;
        ++d, o += a.Cartesian3.packedLength
      )
        l[d] = a.Cartesian3.unpack(r, o);
      var u = i.Ellipsoid.unpack(r, o, $);
      o += i.Ellipsoid.packedLength;
      var m = A.VertexFormat.unpack(r, o, tt);
      o += A.VertexFormat.packedLength;
      var f = r[o++],
        y = r[o++],
        c = r[o++],
        p = r[o++],
        h = r[o++],
        g = 1 === r[o++],
        b = r[o];
      return t.defined(n)
        ? ((n._positions = l),
          (n._ellipsoid = i.Ellipsoid.clone(u, n._ellipsoid)),
          (n._vertexFormat = A.VertexFormat.clone(m, n._vertexFormat)),
          (n._width = f),
          (n._height = y),
          (n._extrudedHeight = c),
          (n._cornerType = p),
          (n._granularity = h),
          (n._shadowVolume = g),
          (n._offsetAttribute = -1 === b ? void 0 : b),
          n)
        : ((et.positions = l),
          (et.width = f),
          (et.height = y),
          (et.extrudedHeight = c),
          (et.cornerType = p),
          (et.granularity = h),
          (et.shadowVolume = g),
          (et.offsetAttribute = -1 === b ? void 0 : b),
          new Z(et));
    }),
    (Z.computeRectangle = function (r, a) {
      var o = (r = t.defaultValue(r, t.defaultValue.EMPTY_OBJECT)).positions,
        n = r.width;
      return (
        e.Check.defined('options.positions', o),
        e.Check.defined('options.width', n),
        X(
          o,
          t.defaultValue(r.ellipsoid, i.Ellipsoid.WGS84),
          n,
          t.defaultValue(r.cornerType, V.CornerType.ROUNDED),
          a,
        )
      );
    }),
    (Z.createGeometry = function (e) {
      var i = e._positions,
        n = e._width,
        s = e._ellipsoid;
      i = R(i, s);
      var l = _.arrayRemoveDuplicates(i, a.Cartesian3.equalsEpsilon);
      if (!(l.length < 2 || n <= 0)) {
        var f,
          y = e._height,
          c = e._extrudedHeight,
          p = !r.CesiumMath.equalsEpsilon(y, c, 0, r.CesiumMath.EPSILON2),
          g = e._vertexFormat,
          b = {
            ellipsoid: s,
            positions: l,
            width: n,
            cornerType: e._cornerType,
            granularity: e._granularity,
            saveAttributes: !0,
          };
        if (p)
          (b.height = y),
            (b.extrudedHeight = c),
            (b.shadowVolume = e._shadowVolume),
            (b.offsetAttribute = e._offsetAttribute),
            (f = (function (e, r) {
              var i = new A.VertexFormat({
                  position: r.position,
                  normal: r.normal || r.bitangent || e.shadowVolume,
                  tangent: r.tangent,
                  bitangent: r.normal || r.bitangent,
                  st: r.st,
                }),
                o = e.ellipsoid,
                n = z(P.CorridorGeometryLibrary.computePositions(e), i, o),
                s = e.height,
                l = e.extrudedHeight,
                m = n.attributes,
                f = n.indices,
                y = m.position.values,
                c = y.length,
                p = new Float64Array(6 * c),
                g = new Float64Array(c);
              g.set(y);
              var b,
                _ = new Float64Array(4 * c);
              (_ = U(
                (y = E.PolygonPipeline.scaleToGeodeticHeight(y, s, o)),
                0,
                _,
              )),
                (_ = U(
                  (g = E.PolygonPipeline.scaleToGeodeticHeight(g, l, o)),
                  2 * c,
                  _,
                )),
                p.set(y),
                p.set(g, c),
                p.set(_, 2 * c),
                (m.position.values = p),
                (m = (function (t, e) {
                  if (!(e.normal || e.tangent || e.bitangent || e.st)) return t;
                  var r,
                    i,
                    o = t.position.values;
                  (e.normal || e.bitangent) &&
                    ((r = t.normal.values), (i = t.bitangent.values));
                  var n,
                    s = t.position.values.length / 18,
                    l = 3 * s,
                    d = 2 * s,
                    u = 2 * l;
                  if (e.normal || e.bitangent || e.tangent) {
                    var m = e.normal ? new Float32Array(6 * l) : void 0,
                      f = e.tangent ? new Float32Array(6 * l) : void 0,
                      y = e.bitangent ? new Float32Array(6 * l) : void 0,
                      c = x,
                      p = N,
                      h = D,
                      g = M,
                      b = O,
                      C = I,
                      v = u;
                    for (n = 0; n < l; n += 3) {
                      var A = v + u;
                      (c = a.Cartesian3.fromArray(o, n, c)),
                        (p = a.Cartesian3.fromArray(o, n + l, p)),
                        (h = a.Cartesian3.fromArray(o, (n + 3) % l, h)),
                        (p = a.Cartesian3.subtract(p, c, p)),
                        (h = a.Cartesian3.subtract(h, c, h)),
                        (g = a.Cartesian3.normalize(
                          a.Cartesian3.cross(p, h, g),
                          g,
                        )),
                        e.normal &&
                          (P.CorridorGeometryLibrary.addAttribute(m, g, A),
                          P.CorridorGeometryLibrary.addAttribute(m, g, A + 3),
                          P.CorridorGeometryLibrary.addAttribute(m, g, v),
                          P.CorridorGeometryLibrary.addAttribute(m, g, v + 3)),
                        (e.tangent || e.bitangent) &&
                          ((C = a.Cartesian3.fromArray(r, n, C)),
                          e.bitangent &&
                            (P.CorridorGeometryLibrary.addAttribute(y, C, A),
                            P.CorridorGeometryLibrary.addAttribute(y, C, A + 3),
                            P.CorridorGeometryLibrary.addAttribute(y, C, v),
                            P.CorridorGeometryLibrary.addAttribute(
                              y,
                              C,
                              v + 3,
                            )),
                          e.tangent &&
                            ((b = a.Cartesian3.normalize(
                              a.Cartesian3.cross(C, g, b),
                              b,
                            )),
                            P.CorridorGeometryLibrary.addAttribute(f, b, A),
                            P.CorridorGeometryLibrary.addAttribute(f, b, A + 3),
                            P.CorridorGeometryLibrary.addAttribute(f, b, v),
                            P.CorridorGeometryLibrary.addAttribute(
                              f,
                              b,
                              v + 3,
                            ))),
                        (v += 6);
                    }
                    if (e.normal) {
                      for (m.set(r), n = 0; n < l; n += 3)
                        (m[n + l] = -r[n]),
                          (m[n + l + 1] = -r[n + 1]),
                          (m[n + l + 2] = -r[n + 2]);
                      t.normal.values = m;
                    } else t.normal = void 0;
                    if (
                      (e.bitangent
                        ? (y.set(i), y.set(i, l), (t.bitangent.values = y))
                        : (t.bitangent = void 0),
                      e.tangent)
                    ) {
                      var _ = t.tangent.values;
                      f.set(_), f.set(_, l), (t.tangent.values = f);
                    }
                  }
                  if (e.st) {
                    var w = t.st.values,
                      T = new Float32Array(6 * d);
                    T.set(w), T.set(w, d);
                    for (var G = 2 * d, E = 0; E < 2; E++) {
                      for (T[G++] = w[0], T[G++] = w[1], n = 2; n < d; n += 2) {
                        var V = w[n],
                          F = w[n + 1];
                        (T[G++] = V), (T[G++] = F), (T[G++] = V), (T[G++] = F);
                      }
                      (T[G++] = w[0]), (T[G++] = w[1]);
                    }
                    t.st.values = T;
                  }
                  return t;
                })(m, r));
              var w = c / 3;
              if (e.shadowVolume) {
                var T = m.normal.values;
                c = T.length;
                var G = new Float32Array(6 * c);
                for (b = 0; b < c; b++) T[b] = -T[b];
                G.set(T, c),
                  (G = U(T, 4 * c, G)),
                  (m.extrudeDirection = new u.GeometryAttribute({
                    componentDatatype: d.ComponentDatatype.FLOAT,
                    componentsPerAttribute: 3,
                    values: G,
                  })),
                  r.normal || (m.normal = void 0);
              }
              if (t.defined(e.offsetAttribute)) {
                var V = new Uint8Array(6 * w);
                if (e.offsetAttribute === v.GeometryOffsetAttribute.TOP)
                  (V = C.arrayFill(V, 1, 0, w)),
                    (V = C.arrayFill(V, 1, 2 * w, 4 * w));
                else {
                  var F =
                    e.offsetAttribute === v.GeometryOffsetAttribute.NONE
                      ? 0
                      : 1;
                  V = C.arrayFill(V, F);
                }
                m.applyOffset = new u.GeometryAttribute({
                  componentDatatype: d.ComponentDatatype.UNSIGNED_BYTE,
                  componentsPerAttribute: 1,
                  values: V,
                });
              }
              var L = f.length,
                k = w + w,
                S = h.IndexDatatype.createTypedArray(
                  p.length / 3,
                  2 * L + 3 * k,
                );
              S.set(f);
              var R,
                H,
                B,
                Y,
                W = L;
              for (b = 0; b < L; b += 3) {
                var q = f[b],
                  J = f[b + 1],
                  j = f[b + 2];
                (S[W++] = j + w), (S[W++] = J + w), (S[W++] = q + w);
              }
              for (b = 0; b < k; b += 2)
                (B = (R = b + k) + 1),
                  (Y = (H = R + k) + 1),
                  (S[W++] = R),
                  (S[W++] = H),
                  (S[W++] = B),
                  (S[W++] = B),
                  (S[W++] = H),
                  (S[W++] = Y);
              return { attributes: m, indices: S };
            })(b, g));
        else if (
          (((f = z(
            P.CorridorGeometryLibrary.computePositions(b),
            g,
            s,
          )).attributes.position.values =
            E.PolygonPipeline.scaleToGeodeticHeight(
              f.attributes.position.values,
              y,
              s,
            )),
          t.defined(e._offsetAttribute))
        ) {
          var w = e._offsetAttribute === v.GeometryOffsetAttribute.NONE ? 0 : 1,
            T = f.attributes.position.values.length,
            G = new Uint8Array(T / 3);
          C.arrayFill(G, w),
            (f.attributes.applyOffset = new u.GeometryAttribute({
              componentDatatype: d.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: G,
            }));
        }
        var V = f.attributes,
          F = o.BoundingSphere.fromVertices(V.position.values, void 0, 3);
        return (
          g.position || (f.attributes.position.values = void 0),
          new u.Geometry({
            attributes: V,
            indices: f.indices,
            primitiveType: m.PrimitiveType.TRIANGLES,
            boundingSphere: F,
            offsetAttribute: e._offsetAttribute,
          })
        );
      }
    }),
    (Z.createShadowVolume = function (t, e, r) {
      var a = t._granularity,
        i = t._ellipsoid,
        o = e(a, i),
        n = r(a, i);
      return new Z({
        positions: t._positions,
        width: t._width,
        cornerType: t._cornerType,
        ellipsoid: i,
        granularity: a,
        extrudedHeight: o,
        height: n,
        vertexFormat: A.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
      });
    }),
    Object.defineProperties(Z.prototype, {
      rectangle: {
        get: function () {
          return (
            t.defined(this._rectangle) ||
              (this._rectangle = X(
                this._positions,
                this._ellipsoid,
                this._width,
                this._cornerType,
              )),
            this._rectangle
          );
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return [0, 0, 0, 1, 1, 0];
        },
      },
    }),
    function (e, r) {
      return (
        t.defined(r) && (e = Z.unpack(e, r)),
        (e._ellipsoid = i.Ellipsoid.clone(e._ellipsoid)),
        Z.createGeometry(e)
      );
    }
  );
});
