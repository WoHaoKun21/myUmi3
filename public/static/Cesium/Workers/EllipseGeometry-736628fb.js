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
  './Transforms-1509c877',
  './GeometryAttributes-aacecde6',
  './GeometryPipeline-8e55e413',
  './IndexDatatype-9435b55f',
  './arrayFill-9766fb2e',
  './GeometryOffsetAttribute-999fc023',
  './VertexFormat-fe4db402',
  './EllipseGeometryLibrary-d33811c0',
  './GeometryInstance-9ddb8c73',
], function (e, t, r, a, i, n, o, s, l, u, m, p, c, y, d, f, h, A, x) {
  var g = new i.Cartesian3(),
    b = new i.Cartesian3(),
    v = new i.Cartesian3(),
    _ = new i.Cartesian3(),
    C = new n.Cartesian2(),
    w = new o.Matrix3(),
    M = new o.Matrix3(),
    E = new m.Quaternion(),
    I = new i.Cartesian3(),
    T = new i.Cartesian3(),
    G = new i.Cartesian3(),
    N = new i.Cartographic(),
    P = new i.Cartesian3(),
    F = new n.Cartesian2(),
    D = new n.Cartesian2();
  function V(e, r, a) {
    var u = r.vertexFormat,
      c = r.center,
      y = r.semiMajorAxis,
      h = r.semiMinorAxis,
      x = r.ellipsoid,
      _ = r.stRotation,
      V = a ? (e.length / 3) * 2 : e.length / 3,
      O = r.shadowVolume,
      S = u.st ? new Float32Array(2 * V) : void 0,
      L = u.normal ? new Float32Array(3 * V) : void 0,
      R = u.tangent ? new Float32Array(3 * V) : void 0,
      j = u.bitangent ? new Float32Array(3 * V) : void 0,
      k = O ? new Float32Array(3 * V) : void 0,
      z = 0,
      B = I,
      Y = T,
      H = G,
      U = new o.GeographicProjection(x),
      Q = U.project(x.cartesianToCartographic(c, N), P),
      W = x.scaleToGeodeticSurface(c, g);
    x.geodeticSurfaceNormal(W, W);
    var q = w,
      J = M;
    if (0 !== _) {
      var Z = m.Quaternion.fromAxisAngle(W, _, E);
      (q = o.Matrix3.fromQuaternion(Z, q)),
        (Z = m.Quaternion.fromAxisAngle(W, -_, E)),
        (J = o.Matrix3.fromQuaternion(Z, J));
    } else
      (q = o.Matrix3.clone(o.Matrix3.IDENTITY, q)),
        (J = o.Matrix3.clone(o.Matrix3.IDENTITY, J));
    for (
      var K = n.Cartesian2.fromElements(
          Number.POSITIVE_INFINITY,
          Number.POSITIVE_INFINITY,
          F,
        ),
        X = n.Cartesian2.fromElements(
          Number.NEGATIVE_INFINITY,
          Number.NEGATIVE_INFINITY,
          D,
        ),
        $ = e.length,
        ee = a ? $ : 0,
        te = (ee / 3) * 2,
        re = 0;
      re < $;
      re += 3
    ) {
      var ae = re + 1,
        ie = re + 2,
        ne = i.Cartesian3.fromArray(e, re, g);
      if (u.st) {
        var oe = o.Matrix3.multiplyByVector(q, ne, b),
          se = U.project(x.cartesianToCartographic(oe, N), v);
        i.Cartesian3.subtract(se, Q, se),
          (C.x = (se.x + y) / (2 * y)),
          (C.y = (se.y + h) / (2 * h)),
          (K.x = Math.min(C.x, K.x)),
          (K.y = Math.min(C.y, K.y)),
          (X.x = Math.max(C.x, X.x)),
          (X.y = Math.max(C.y, X.y)),
          a && ((S[z + te] = C.x), (S[z + 1 + te] = C.y)),
          (S[z++] = C.x),
          (S[z++] = C.y);
      }
      (u.normal || u.tangent || u.bitangent || O) &&
        ((B = x.geodeticSurfaceNormal(ne, B)),
        O && ((k[re + ee] = -B.x), (k[ae + ee] = -B.y), (k[ie + ee] = -B.z)),
        (u.normal || u.tangent || u.bitangent) &&
          ((u.tangent || u.bitangent) &&
            ((Y = i.Cartesian3.normalize(
              i.Cartesian3.cross(i.Cartesian3.UNIT_Z, B, Y),
              Y,
            )),
            o.Matrix3.multiplyByVector(J, Y, Y)),
          u.normal &&
            ((L[re] = B.x),
            (L[ae] = B.y),
            (L[ie] = B.z),
            a &&
              ((L[re + ee] = -B.x), (L[ae + ee] = -B.y), (L[ie + ee] = -B.z))),
          u.tangent &&
            ((R[re] = Y.x),
            (R[ae] = Y.y),
            (R[ie] = Y.z),
            a &&
              ((R[re + ee] = -Y.x), (R[ae + ee] = -Y.y), (R[ie + ee] = -Y.z))),
          u.bitangent &&
            ((H = i.Cartesian3.normalize(i.Cartesian3.cross(B, Y, H), H)),
            (j[re] = H.x),
            (j[ae] = H.y),
            (j[ie] = H.z),
            a &&
              ((j[re + ee] = H.x), (j[ae + ee] = H.y), (j[ie + ee] = H.z)))));
    }
    if (u.st) {
      $ = S.length;
      for (var le = 0; le < $; le += 2)
        (S[le] = (S[le] - K.x) / (X.x - K.x)),
          (S[le + 1] = (S[le + 1] - K.y) / (X.y - K.y));
    }
    var ue = new p.GeometryAttributes();
    if (u.position) {
      var me = A.EllipseGeometryLibrary.raisePositionsToHeight(e, r, a);
      ue.position = new l.GeometryAttribute({
        componentDatatype: s.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: me,
      });
    }
    if (
      (u.st &&
        (ue.st = new l.GeometryAttribute({
          componentDatatype: s.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: S,
        })),
      u.normal &&
        (ue.normal = new l.GeometryAttribute({
          componentDatatype: s.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: L,
        })),
      u.tangent &&
        (ue.tangent = new l.GeometryAttribute({
          componentDatatype: s.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: R,
        })),
      u.bitangent &&
        (ue.bitangent = new l.GeometryAttribute({
          componentDatatype: s.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: j,
        })),
      O &&
        (ue.extrudeDirection = new l.GeometryAttribute({
          componentDatatype: s.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: k,
        })),
      a && t.defined(r.offsetAttribute))
    ) {
      var pe = new Uint8Array(V);
      if (r.offsetAttribute === f.GeometryOffsetAttribute.TOP)
        pe = d.arrayFill(pe, 1, 0, V / 2);
      else {
        var ce = r.offsetAttribute === f.GeometryOffsetAttribute.NONE ? 0 : 1;
        pe = d.arrayFill(pe, ce);
      }
      ue.applyOffset = new l.GeometryAttribute({
        componentDatatype: s.ComponentDatatype.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: pe,
      });
    }
    return ue;
  }
  function O(e) {
    var t,
      r,
      a,
      i,
      n,
      o = new Array(e * (e + 1) * 12 - 6),
      s = 0;
    for (a = 1, i = t = 0; i < 3; i++)
      (o[s++] = a++), (o[s++] = t), (o[s++] = a);
    for (i = 2; i < e + 1; ++i) {
      for (
        a = i * (i + 1) - 1,
          t = (i - 1) * i - 1,
          o[s++] = a++,
          o[s++] = t,
          o[s++] = a,
          r = 2 * i,
          n = 0;
        n < r - 1;
        ++n
      )
        (o[s++] = a),
          (o[s++] = t++),
          (o[s++] = t),
          (o[s++] = a++),
          (o[s++] = t),
          (o[s++] = a);
      (o[s++] = a++), (o[s++] = t), (o[s++] = a);
    }
    for (r = 2 * e, ++a, ++t, i = 0; i < r - 1; ++i)
      (o[s++] = a),
        (o[s++] = t++),
        (o[s++] = t),
        (o[s++] = a++),
        (o[s++] = t),
        (o[s++] = a);
    for (
      o[s++] = a,
        o[s++] = t++,
        o[s++] = t,
        o[s++] = a++,
        o[s++] = t++,
        o[s++] = t,
        ++t,
        i = e - 1;
      1 < i;
      --i
    ) {
      for (
        o[s++] = t++, o[s++] = t, o[s++] = a, r = 2 * i, n = 0;
        n < r - 1;
        ++n
      )
        (o[s++] = a),
          (o[s++] = t++),
          (o[s++] = t),
          (o[s++] = a++),
          (o[s++] = t),
          (o[s++] = a);
      (o[s++] = t++), (o[s++] = t++), (o[s++] = a++);
    }
    for (i = 0; i < 3; i++) (o[s++] = t++), (o[s++] = t), (o[s++] = a);
    return o;
  }
  var S = new i.Cartesian3(),
    L = new o.BoundingSphere(),
    R = new o.BoundingSphere();
  function j(e, t, r, o, s, l, u) {
    for (
      var m = A.EllipseGeometryLibrary.computeEllipsePositions(
          {
            center: e,
            semiMajorAxis: t,
            semiMinorAxis: r,
            rotation: o,
            granularity: s,
          },
          !1,
          !0,
        ).outerPositions,
        p = m.length / 3,
        c = new Array(p),
        y = 0;
      y < p;
      ++y
    )
      c[y] = i.Cartesian3.fromArray(m, 3 * y);
    var d = n.Rectangle.fromCartesianArray(c, l, u);
    return (
      d.width > a.CesiumMath.PI &&
        ((d.north =
          0 < d.north
            ? a.CesiumMath.PI_OVER_TWO - a.CesiumMath.EPSILON7
            : d.north),
        (d.south =
          d.south < 0
            ? a.CesiumMath.EPSILON7 - a.CesiumMath.PI_OVER_TWO
            : d.south),
        (d.east = a.CesiumMath.PI),
        (d.west = -a.CesiumMath.PI)),
      d
    );
  }
  function k(e) {
    var o = (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)).center,
      s = t.defaultValue(e.ellipsoid, n.Ellipsoid.WGS84),
      l = e.semiMajorAxis,
      u = e.semiMinorAxis,
      m = t.defaultValue(e.granularity, a.CesiumMath.RADIANS_PER_DEGREE),
      p = t.defaultValue(e.vertexFormat, h.VertexFormat.DEFAULT);
    if (
      (r.Check.defined('options.center', o),
      r.Check.typeOf.number('options.semiMajorAxis', l),
      r.Check.typeOf.number('options.semiMinorAxis', u),
      l < u)
    )
      throw new r.DeveloperError(
        'semiMajorAxis must be greater than or equal to the semiMinorAxis.',
      );
    if (m <= 0)
      throw new r.DeveloperError('granularity must be greater than zero.');
    var c = t.defaultValue(e.height, 0),
      y = t.defaultValue(e.extrudedHeight, c);
    (this._center = i.Cartesian3.clone(o)),
      (this._semiMajorAxis = l),
      (this._semiMinorAxis = u),
      (this._ellipsoid = n.Ellipsoid.clone(s)),
      (this._rotation = t.defaultValue(e.rotation, 0)),
      (this._stRotation = t.defaultValue(e.stRotation, 0)),
      (this._height = Math.max(y, c)),
      (this._granularity = m),
      (this._vertexFormat = h.VertexFormat.clone(p)),
      (this._extrudedHeight = Math.min(y, c)),
      (this._shadowVolume = t.defaultValue(e.shadowVolume, !1)),
      (this._workerName = 'createEllipseGeometry'),
      (this._offsetAttribute = e.offsetAttribute),
      (this._rectangle = void 0),
      (this._textureCoordinateRotationPoints = void 0);
  }
  (k.packedLength =
    i.Cartesian3.packedLength +
    n.Ellipsoid.packedLength +
    h.VertexFormat.packedLength +
    9),
    (k.pack = function (e, a, o) {
      return (
        r.Check.defined('value', e),
        r.Check.defined('array', a),
        (o = t.defaultValue(o, 0)),
        i.Cartesian3.pack(e._center, a, o),
        (o += i.Cartesian3.packedLength),
        n.Ellipsoid.pack(e._ellipsoid, a, o),
        (o += n.Ellipsoid.packedLength),
        h.VertexFormat.pack(e._vertexFormat, a, o),
        (o += h.VertexFormat.packedLength),
        (a[o++] = e._semiMajorAxis),
        (a[o++] = e._semiMinorAxis),
        (a[o++] = e._rotation),
        (a[o++] = e._stRotation),
        (a[o++] = e._height),
        (a[o++] = e._granularity),
        (a[o++] = e._extrudedHeight),
        (a[o++] = e._shadowVolume ? 1 : 0),
        (a[o] = t.defaultValue(e._offsetAttribute, -1)),
        a
      );
    });
  var z = new i.Cartesian3(),
    B = new n.Ellipsoid(),
    Y = new h.VertexFormat(),
    H = {
      center: z,
      ellipsoid: B,
      vertexFormat: Y,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
      rotation: void 0,
      stRotation: void 0,
      height: void 0,
      granularity: void 0,
      extrudedHeight: void 0,
      shadowVolume: void 0,
      offsetAttribute: void 0,
    };
  (k.unpack = function (e, a, o) {
    r.Check.defined('array', e), (a = t.defaultValue(a, 0));
    var s = i.Cartesian3.unpack(e, a, z);
    a += i.Cartesian3.packedLength;
    var l = n.Ellipsoid.unpack(e, a, B);
    a += n.Ellipsoid.packedLength;
    var u = h.VertexFormat.unpack(e, a, Y);
    a += h.VertexFormat.packedLength;
    var m = e[a++],
      p = e[a++],
      c = e[a++],
      y = e[a++],
      d = e[a++],
      f = e[a++],
      A = e[a++],
      x = 1 === e[a++],
      g = e[a];
    return t.defined(o)
      ? ((o._center = i.Cartesian3.clone(s, o._center)),
        (o._ellipsoid = n.Ellipsoid.clone(l, o._ellipsoid)),
        (o._vertexFormat = h.VertexFormat.clone(u, o._vertexFormat)),
        (o._semiMajorAxis = m),
        (o._semiMinorAxis = p),
        (o._rotation = c),
        (o._stRotation = y),
        (o._height = d),
        (o._granularity = f),
        (o._extrudedHeight = A),
        (o._shadowVolume = x),
        (o._offsetAttribute = -1 === g ? void 0 : g),
        o)
      : ((H.height = d),
        (H.extrudedHeight = A),
        (H.granularity = f),
        (H.stRotation = y),
        (H.rotation = c),
        (H.semiMajorAxis = m),
        (H.semiMinorAxis = p),
        (H.shadowVolume = x),
        (H.offsetAttribute = -1 === g ? void 0 : g),
        new k(H));
  }),
    (k.computeRectangle = function (e, i) {
      var o = (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)).center,
        s = t.defaultValue(e.ellipsoid, n.Ellipsoid.WGS84),
        l = e.semiMajorAxis,
        u = e.semiMinorAxis,
        m = t.defaultValue(e.granularity, a.CesiumMath.RADIANS_PER_DEGREE),
        p = t.defaultValue(e.rotation, 0);
      if (
        (r.Check.defined('options.center', o),
        r.Check.typeOf.number('options.semiMajorAxis', l),
        r.Check.typeOf.number('options.semiMinorAxis', u),
        l < u)
      )
        throw new r.DeveloperError(
          'semiMajorAxis must be greater than or equal to the semiMinorAxis.',
        );
      if (m <= 0)
        throw new r.DeveloperError('granularity must be greater than zero.');
      return j(o, l, u, p, m, s, i);
    }),
    (k.createGeometry = function (e) {
      if (!(e._semiMajorAxis <= 0 || e._semiMinorAxis <= 0)) {
        var r = e._height,
          h = e._extrudedHeight,
          M = !a.CesiumMath.equalsEpsilon(r, h, 0, a.CesiumMath.EPSILON2);
        e._center = e._ellipsoid.scaleToGeodeticSurface(e._center, e._center);
        var j,
          k = {
            center: e._center,
            semiMajorAxis: e._semiMajorAxis,
            semiMinorAxis: e._semiMinorAxis,
            ellipsoid: e._ellipsoid,
            rotation: e._rotation,
            height: r,
            granularity: e._granularity,
            vertexFormat: e._vertexFormat,
            stRotation: e._stRotation,
          };
        if (M)
          (k.extrudedHeight = h),
            (k.shadowVolume = e._shadowVolume),
            (k.offsetAttribute = e._offsetAttribute),
            (j = (function (e) {
              var r = e.center,
                a = e.ellipsoid,
                h = e.semiMajorAxis,
                M = i.Cartesian3.multiplyByScalar(
                  a.geodeticSurfaceNormal(r, g),
                  e.height,
                  g,
                );
              (L.center = i.Cartesian3.add(r, M, L.center)),
                (L.radius = h),
                (M = i.Cartesian3.multiplyByScalar(
                  a.geodeticSurfaceNormal(r, M),
                  e.extrudedHeight,
                  M,
                )),
                (R.center = i.Cartesian3.add(r, M, R.center)),
                (R.radius = h);
              var S = A.EllipseGeometryLibrary.computeEllipsePositions(
                  e,
                  !0,
                  !0,
                ),
                j = S.positions,
                k = S.numPts,
                z = S.outerPositions,
                B = o.BoundingSphere.union(L, R),
                Y = V(j, e, !0),
                H = O(k),
                U = H.length;
              H.length = 2 * U;
              for (var Q = j.length / 3, W = 0; W < U; W += 3)
                (H[W + U] = H[W + 2] + Q),
                  (H[W + 1 + U] = H[W + 1] + Q),
                  (H[W + 2 + U] = H[W] + Q);
              var q = y.IndexDatatype.createTypedArray((2 * Q) / 3, H),
                J = new l.Geometry({
                  attributes: Y,
                  indices: q,
                  primitiveType: u.PrimitiveType.TRIANGLES,
                }),
                Z = (function (e, r) {
                  var a = r.vertexFormat,
                    u = r.center,
                    c = r.semiMajorAxis,
                    y = r.semiMinorAxis,
                    h = r.ellipsoid,
                    A = r.height,
                    x = r.extrudedHeight,
                    M = r.stRotation,
                    V = (e.length / 3) * 2,
                    O = new Float64Array(3 * V),
                    S = a.st ? new Float32Array(2 * V) : void 0,
                    L = a.normal ? new Float32Array(3 * V) : void 0,
                    R = a.tangent ? new Float32Array(3 * V) : void 0,
                    j = a.bitangent ? new Float32Array(3 * V) : void 0,
                    k = r.shadowVolume,
                    z = k ? new Float32Array(3 * V) : void 0,
                    B = 0,
                    Y = I,
                    H = T,
                    U = G,
                    Q = new o.GeographicProjection(h),
                    W = Q.project(h.cartesianToCartographic(u, N), P),
                    q = h.scaleToGeodeticSurface(u, g);
                  h.geodeticSurfaceNormal(q, q);
                  for (
                    var J = m.Quaternion.fromAxisAngle(q, M, E),
                      Z = o.Matrix3.fromQuaternion(J, w),
                      K = n.Cartesian2.fromElements(
                        Number.POSITIVE_INFINITY,
                        Number.POSITIVE_INFINITY,
                        F,
                      ),
                      X = n.Cartesian2.fromElements(
                        Number.NEGATIVE_INFINITY,
                        Number.NEGATIVE_INFINITY,
                        D,
                      ),
                      $ = e.length,
                      ee = ($ / 3) * 2,
                      te = 0;
                    te < $;
                    te += 3
                  ) {
                    var re,
                      ae = te + 1,
                      ie = te + 2,
                      ne = i.Cartesian3.fromArray(e, te, g);
                    if (a.st) {
                      var oe = o.Matrix3.multiplyByVector(Z, ne, b),
                        se = Q.project(h.cartesianToCartographic(oe, N), v);
                      i.Cartesian3.subtract(se, W, se),
                        (C.x = (se.x + c) / (2 * c)),
                        (C.y = (se.y + y) / (2 * y)),
                        (K.x = Math.min(C.x, K.x)),
                        (K.y = Math.min(C.y, K.y)),
                        (X.x = Math.max(C.x, X.x)),
                        (X.y = Math.max(C.y, X.y)),
                        (S[B + ee] = C.x),
                        (S[B + 1 + ee] = C.y),
                        (S[B++] = C.x),
                        (S[B++] = C.y);
                    }
                    (ne = h.scaleToGeodeticSurface(ne, ne)),
                      (re = i.Cartesian3.clone(ne, b)),
                      (Y = h.geodeticSurfaceNormal(ne, Y)),
                      k &&
                        ((z[te + $] = -Y.x),
                        (z[ae + $] = -Y.y),
                        (z[ie + $] = -Y.z));
                    var le = i.Cartesian3.multiplyByScalar(Y, A, _);
                    if (
                      ((ne = i.Cartesian3.add(ne, le, ne)),
                      (le = i.Cartesian3.multiplyByScalar(Y, x, le)),
                      (re = i.Cartesian3.add(re, le, re)),
                      a.position &&
                        ((O[te + $] = re.x),
                        (O[ae + $] = re.y),
                        (O[ie + $] = re.z),
                        (O[te] = ne.x),
                        (O[ae] = ne.y),
                        (O[ie] = ne.z)),
                      a.normal || a.tangent || a.bitangent)
                    ) {
                      U = i.Cartesian3.clone(Y, U);
                      var ue = i.Cartesian3.fromArray(e, (te + 3) % $, _);
                      i.Cartesian3.subtract(ue, ne, ue);
                      var me = i.Cartesian3.subtract(re, ne, v);
                      (Y = i.Cartesian3.normalize(
                        i.Cartesian3.cross(me, ue, Y),
                        Y,
                      )),
                        a.normal &&
                          ((L[te] = Y.x),
                          (L[ae] = Y.y),
                          (L[ie] = Y.z),
                          (L[te + $] = Y.x),
                          (L[ae + $] = Y.y),
                          (L[ie + $] = Y.z)),
                        a.tangent &&
                          ((H = i.Cartesian3.normalize(
                            i.Cartesian3.cross(U, Y, H),
                            H,
                          )),
                          (R[te] = H.x),
                          (R[ae] = H.y),
                          (R[ie] = H.z),
                          (R[te + $] = H.x),
                          (R[te + 1 + $] = H.y),
                          (R[te + 2 + $] = H.z)),
                        a.bitangent &&
                          ((j[te] = U.x),
                          (j[ae] = U.y),
                          (j[ie] = U.z),
                          (j[te + $] = U.x),
                          (j[ae + $] = U.y),
                          (j[ie + $] = U.z));
                    }
                  }
                  if (a.st) {
                    $ = S.length;
                    for (var pe = 0; pe < $; pe += 2)
                      (S[pe] = (S[pe] - K.x) / (X.x - K.x)),
                        (S[pe + 1] = (S[pe + 1] - K.y) / (X.y - K.y));
                  }
                  var ce = new p.GeometryAttributes();
                  if (
                    (a.position &&
                      (ce.position = new l.GeometryAttribute({
                        componentDatatype: s.ComponentDatatype.DOUBLE,
                        componentsPerAttribute: 3,
                        values: O,
                      })),
                    a.st &&
                      (ce.st = new l.GeometryAttribute({
                        componentDatatype: s.ComponentDatatype.FLOAT,
                        componentsPerAttribute: 2,
                        values: S,
                      })),
                    a.normal &&
                      (ce.normal = new l.GeometryAttribute({
                        componentDatatype: s.ComponentDatatype.FLOAT,
                        componentsPerAttribute: 3,
                        values: L,
                      })),
                    a.tangent &&
                      (ce.tangent = new l.GeometryAttribute({
                        componentDatatype: s.ComponentDatatype.FLOAT,
                        componentsPerAttribute: 3,
                        values: R,
                      })),
                    a.bitangent &&
                      (ce.bitangent = new l.GeometryAttribute({
                        componentDatatype: s.ComponentDatatype.FLOAT,
                        componentsPerAttribute: 3,
                        values: j,
                      })),
                    k &&
                      (ce.extrudeDirection = new l.GeometryAttribute({
                        componentDatatype: s.ComponentDatatype.FLOAT,
                        componentsPerAttribute: 3,
                        values: z,
                      })),
                    t.defined(r.offsetAttribute))
                  ) {
                    var ye = new Uint8Array(V);
                    if (r.offsetAttribute === f.GeometryOffsetAttribute.TOP)
                      ye = d.arrayFill(ye, 1, 0, V / 2);
                    else {
                      var de =
                        r.offsetAttribute === f.GeometryOffsetAttribute.NONE
                          ? 0
                          : 1;
                      ye = d.arrayFill(ye, de);
                    }
                    ce.applyOffset = new l.GeometryAttribute({
                      componentDatatype: s.ComponentDatatype.UNSIGNED_BYTE,
                      componentsPerAttribute: 1,
                      values: ye,
                    });
                  }
                  return ce;
                })(z, e);
              H = (function (e) {
                for (
                  var t = e.length / 3,
                    r = y.IndexDatatype.createTypedArray(t, 6 * t),
                    a = 0,
                    i = 0;
                  i < t;
                  i++
                ) {
                  var n = i,
                    o = i + t,
                    s = (n + 1) % t,
                    l = s + t;
                  (r[a++] = n),
                    (r[a++] = o),
                    (r[a++] = s),
                    (r[a++] = s),
                    (r[a++] = o),
                    (r[a++] = l);
                }
                return r;
              })(z);
              var K = y.IndexDatatype.createTypedArray((2 * z.length) / 3, H),
                X = new l.Geometry({
                  attributes: Z,
                  indices: K,
                  primitiveType: u.PrimitiveType.TRIANGLES,
                }),
                $ = c.GeometryPipeline.combineInstances([
                  new x.GeometryInstance({ geometry: J }),
                  new x.GeometryInstance({ geometry: X }),
                ]);
              return {
                boundingSphere: B,
                attributes: $[0].attributes,
                indices: $[0].indices,
              };
            })(k));
        else if (
          ((j = (function (e) {
            var t = e.center;
            (S = i.Cartesian3.multiplyByScalar(
              e.ellipsoid.geodeticSurfaceNormal(t, S),
              e.height,
              S,
            )),
              (S = i.Cartesian3.add(t, S, S));
            var r = new o.BoundingSphere(S, e.semiMajorAxis),
              a = A.EllipseGeometryLibrary.computeEllipsePositions(e, !0, !1),
              n = a.positions,
              s = a.numPts,
              l = V(n, e, !1),
              u = O(s);
            return {
              boundingSphere: r,
              attributes: l,
              indices: (u = y.IndexDatatype.createTypedArray(n.length / 3, u)),
            };
          })(k)),
          t.defined(e._offsetAttribute))
        ) {
          var z = j.attributes.position.values.length,
            B = new Uint8Array(z / 3),
            Y = e._offsetAttribute === f.GeometryOffsetAttribute.NONE ? 0 : 1;
          d.arrayFill(B, Y),
            (j.attributes.applyOffset = new l.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: B,
            }));
        }
        return new l.Geometry({
          attributes: j.attributes,
          indices: j.indices,
          primitiveType: u.PrimitiveType.TRIANGLES,
          boundingSphere: j.boundingSphere,
          offsetAttribute: e._offsetAttribute,
        });
      }
    }),
    (k.createShadowVolume = function (e, t, r) {
      var a = e._granularity,
        i = e._ellipsoid,
        n = t(a, i),
        o = r(a, i);
      return new k({
        center: e._center,
        semiMajorAxis: e._semiMajorAxis,
        semiMinorAxis: e._semiMinorAxis,
        ellipsoid: i,
        rotation: e._rotation,
        stRotation: e._stRotation,
        granularity: a,
        extrudedHeight: n,
        height: o,
        vertexFormat: h.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
      });
    }),
    Object.defineProperties(k.prototype, {
      rectangle: {
        get: function () {
          return (
            t.defined(this._rectangle) ||
              (this._rectangle = j(
                this._center,
                this._semiMajorAxis,
                this._semiMinorAxis,
                this._rotation,
                this._granularity,
                this._ellipsoid,
              )),
            this._rectangle
          );
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return (
            t.defined(this._textureCoordinateRotationPoints) ||
              (this._textureCoordinateRotationPoints = (function (e) {
                var t = -e._stRotation;
                if (0 === t) return [0, 0, 0, 1, 1, 0];
                for (
                  var r = A.EllipseGeometryLibrary.computeEllipsePositions(
                      {
                        center: e._center,
                        semiMajorAxis: e._semiMajorAxis,
                        semiMinorAxis: e._semiMinorAxis,
                        rotation: e._rotation,
                        granularity: e._granularity,
                      },
                      !1,
                      !0,
                    ).outerPositions,
                    a = r.length / 3,
                    n = new Array(a),
                    o = 0;
                  o < a;
                  ++o
                )
                  n[o] = i.Cartesian3.fromArray(r, 3 * o);
                var s = e._ellipsoid,
                  u = e.rectangle;
                return l.Geometry._textureCoordinateRotationPoints(n, t, s, u);
              })(this)),
            this._textureCoordinateRotationPoints
          );
        },
      },
    }),
    (e.EllipseGeometry = k);
});
