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
  './VertexFormat-fe4db402',
], function (e, t, a, r, i, n, o, m, s, u, l, f, c, d, p) {
  var C = new i.Cartesian3(),
    y = new i.Cartesian3(),
    h = new i.Cartesian3(),
    v = new i.Cartesian3(),
    _ = new i.Cartesian3(),
    A = new i.Cartesian3(1, 1, 1),
    b = Math.cos,
    x = Math.sin;
  function w(e) {
    e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT);
    var n = t.defaultValue(e.radii, A),
      o = t.defaultValue(e.innerRadii, n),
      m = t.defaultValue(e.minimumClock, 0),
      s = t.defaultValue(e.maximumClock, r.CesiumMath.TWO_PI),
      u = t.defaultValue(e.minimumCone, 0),
      l = t.defaultValue(e.maximumCone, r.CesiumMath.PI),
      f = Math.round(t.defaultValue(e.stackPartitions, 64)),
      c = Math.round(t.defaultValue(e.slicePartitions, 64)),
      d = t.defaultValue(e.vertexFormat, p.VertexFormat.DEFAULT);
    if (c < 3)
      throw new a.DeveloperError(
        'options.slicePartitions cannot be less than three.',
      );
    if (f < 3)
      throw new a.DeveloperError(
        'options.stackPartitions cannot be less than three.',
      );
    (this._radii = i.Cartesian3.clone(n)),
      (this._innerRadii = i.Cartesian3.clone(o)),
      (this._minimumClock = m),
      (this._maximumClock = s),
      (this._minimumCone = u),
      (this._maximumCone = l),
      (this._stackPartitions = f),
      (this._slicePartitions = c),
      (this._vertexFormat = p.VertexFormat.clone(d)),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = 'createEllipsoidGeometry');
  }
  (w.packedLength =
    2 * i.Cartesian3.packedLength + p.VertexFormat.packedLength + 7),
    (w.pack = function (e, r, n) {
      if (!t.defined(e)) throw new a.DeveloperError('value is required');
      if (!t.defined(r)) throw new a.DeveloperError('array is required');
      return (
        (n = t.defaultValue(n, 0)),
        i.Cartesian3.pack(e._radii, r, n),
        (n += i.Cartesian3.packedLength),
        i.Cartesian3.pack(e._innerRadii, r, n),
        (n += i.Cartesian3.packedLength),
        p.VertexFormat.pack(e._vertexFormat, r, n),
        (n += p.VertexFormat.packedLength),
        (r[n++] = e._minimumClock),
        (r[n++] = e._maximumClock),
        (r[n++] = e._minimumCone),
        (r[n++] = e._maximumCone),
        (r[n++] = e._stackPartitions),
        (r[n++] = e._slicePartitions),
        (r[n] = t.defaultValue(e._offsetAttribute, -1)),
        r
      );
    });
  var k,
    P = new i.Cartesian3(),
    F = new i.Cartesian3(),
    g = new p.VertexFormat(),
    V = {
      radii: P,
      innerRadii: F,
      vertexFormat: g,
      minimumClock: void 0,
      maximumClock: void 0,
      minimumCone: void 0,
      maximumCone: void 0,
      stackPartitions: void 0,
      slicePartitions: void 0,
      offsetAttribute: void 0,
    };
  (w.unpack = function (e, r, n) {
    if (!t.defined(e)) throw new a.DeveloperError('array is required');
    r = t.defaultValue(r, 0);
    var o = i.Cartesian3.unpack(e, r, P);
    r += i.Cartesian3.packedLength;
    var m = i.Cartesian3.unpack(e, r, F);
    r += i.Cartesian3.packedLength;
    var s = p.VertexFormat.unpack(e, r, g);
    r += p.VertexFormat.packedLength;
    var u = e[r++],
      l = e[r++],
      f = e[r++],
      c = e[r++],
      d = e[r++],
      C = e[r++],
      y = e[r];
    return t.defined(n)
      ? ((n._radii = i.Cartesian3.clone(o, n._radii)),
        (n._innerRadii = i.Cartesian3.clone(m, n._innerRadii)),
        (n._vertexFormat = p.VertexFormat.clone(s, n._vertexFormat)),
        (n._minimumClock = u),
        (n._maximumClock = l),
        (n._minimumCone = f),
        (n._maximumCone = c),
        (n._stackPartitions = d),
        (n._slicePartitions = C),
        (n._offsetAttribute = -1 === y ? void 0 : y),
        n)
      : ((V.minimumClock = u),
        (V.maximumClock = l),
        (V.minimumCone = f),
        (V.maximumCone = c),
        (V.stackPartitions = d),
        (V.slicePartitions = C),
        (V.offsetAttribute = -1 === y ? void 0 : y),
        new w(V));
  }),
    (w.createGeometry = function (e) {
      var a = e._radii;
      if (!(a.x <= 0 || a.y <= 0 || a.z <= 0)) {
        var p = e._innerRadii;
        if (!(p.x <= 0 || p.y <= 0 || p.z <= 0)) {
          var A,
            w,
            k = e._minimumClock,
            P = e._maximumClock,
            F = e._minimumCone,
            g = e._maximumCone,
            V = e._vertexFormat,
            D = e._slicePartitions + 1,
            M = e._stackPartitions + 1;
          (D = Math.round((D * Math.abs(P - k)) / r.CesiumMath.TWO_PI)) < 2 &&
            (D = 2),
            (M = Math.round((M * Math.abs(g - F)) / r.CesiumMath.PI)) < 2 &&
              (M = 2);
          var T = 0,
            E = [F],
            G = [k];
          for (A = 0; A < M; A++) E.push(F + (A * (g - F)) / (M - 1));
          for (E.push(g), w = 0; w < D; w++)
            G.push(k + (w * (P - k)) / (D - 1));
          G.push(P);
          var L = E.length,
            O = G.length,
            I = 0,
            z = 1,
            N = p.x !== a.x || p.y !== a.y || p.z !== a.z,
            R = !1,
            S = !1,
            U = !1;
          N &&
            ((z = 2),
            0 < F && ((R = !0), (I += D - 1)),
            g < Math.PI && ((S = !0), (I += D - 1)),
            (P - k) % r.CesiumMath.TWO_PI
              ? ((U = !0), (I += 2 * (M - 1) + 1))
              : (I += 1));
          var B = O * L * z,
            W = new Float64Array(3 * B),
            q = c.arrayFill(new Array(B), !1),
            Y = c.arrayFill(new Array(B), !1),
            J = D * M * z,
            X = 6 * (J + I + 1 - (D + M) * z),
            Z = f.IndexDatatype.createTypedArray(J, X),
            j = V.normal ? new Float32Array(3 * B) : void 0,
            H = V.tangent ? new Float32Array(3 * B) : void 0,
            K = V.bitangent ? new Float32Array(3 * B) : void 0,
            Q = V.st ? new Float32Array(2 * B) : void 0,
            $ = new Array(L),
            ee = new Array(L);
          for (A = 0; A < L; A++) ($[A] = x(E[A])), (ee[A] = b(E[A]));
          var te = new Array(O),
            ae = new Array(O);
          for (w = 0; w < O; w++) (ae[w] = b(G[w])), (te[w] = x(G[w]));
          for (A = 0; A < L; A++)
            for (w = 0; w < O; w++)
              (W[T++] = a.x * $[A] * ae[w]),
                (W[T++] = a.y * $[A] * te[w]),
                (W[T++] = a.z * ee[A]);
          var re,
            ie,
            ne,
            oe,
            me = B / 2;
          if (N)
            for (A = 0; A < L; A++)
              for (w = 0; w < O; w++)
                (W[T++] = p.x * $[A] * ae[w]),
                  (W[T++] = p.y * $[A] * te[w]),
                  (W[T++] = p.z * ee[A]),
                  (q[me] = !0),
                  0 < A &&
                    A !== L - 1 &&
                    0 !== w &&
                    w !== O - 1 &&
                    (Y[me] = !0),
                  me++;
          for (T = 0, A = 1; A < L - 2; A++)
            for (re = A * O, ie = (A + 1) * O, w = 1; w < O - 2; w++)
              (Z[T++] = ie + w),
                (Z[T++] = ie + w + 1),
                (Z[T++] = re + w + 1),
                (Z[T++] = ie + w),
                (Z[T++] = re + w + 1),
                (Z[T++] = re + w);
          if (N) {
            var se = L * O;
            for (A = 1; A < L - 2; A++)
              for (
                re = se + A * O, ie = se + (A + 1) * O, w = 1;
                w < O - 2;
                w++
              )
                (Z[T++] = ie + w),
                  (Z[T++] = re + w),
                  (Z[T++] = re + w + 1),
                  (Z[T++] = ie + w),
                  (Z[T++] = re + w + 1),
                  (Z[T++] = ie + w + 1);
          }
          if (N) {
            if (R)
              for (oe = L * O, A = 1; A < O - 2; A++)
                (Z[T++] = A),
                  (Z[T++] = A + 1),
                  (Z[T++] = oe + A + 1),
                  (Z[T++] = A),
                  (Z[T++] = oe + A + 1),
                  (Z[T++] = oe + A);
            if (S)
              for (ne = L * O - O, oe = L * O * z - O, A = 1; A < O - 2; A++)
                (Z[T++] = ne + A + 1),
                  (Z[T++] = ne + A),
                  (Z[T++] = oe + A),
                  (Z[T++] = ne + A + 1),
                  (Z[T++] = oe + A),
                  (Z[T++] = oe + A + 1);
          }
          if (U) {
            for (A = 1; A < L - 2; A++)
              (oe = O * L + O * A),
                (ne = O * A),
                (Z[T++] = oe),
                (Z[T++] = ne + O),
                (Z[T++] = ne),
                (Z[T++] = oe),
                (Z[T++] = oe + O),
                (Z[T++] = ne + O);
            for (A = 1; A < L - 2; A++)
              (oe = O * L + O * (A + 1) - 1),
                (ne = O * (A + 1) - 1),
                (Z[T++] = ne + O),
                (Z[T++] = oe),
                (Z[T++] = ne),
                (Z[T++] = ne + O),
                (Z[T++] = oe + O),
                (Z[T++] = oe);
          }
          var ue = new l.GeometryAttributes();
          V.position &&
            (ue.position = new s.GeometryAttribute({
              componentDatatype: m.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: W,
            }));
          var le,
            fe = 0,
            ce = 0,
            de = 0,
            pe = 0,
            Ce = B / 2,
            ye = n.Ellipsoid.fromCartesian3(a),
            he = n.Ellipsoid.fromCartesian3(p);
          if (V.st || V.normal || V.tangent || V.bitangent) {
            for (A = 0; A < B; A++) {
              le = q[A] ? he : ye;
              var ve = i.Cartesian3.fromArray(W, 3 * A, C),
                _e = le.geodeticSurfaceNormal(ve, y);
              if ((Y[A] && i.Cartesian3.negate(_e, _e), V.st)) {
                var Ae = n.Cartesian2.negate(_e, _);
                (Q[fe++] = Math.atan2(Ae.y, Ae.x) / r.CesiumMath.TWO_PI + 0.5),
                  (Q[fe++] = Math.asin(_e.z) / Math.PI + 0.5);
              }
              if (
                (V.normal &&
                  ((j[ce++] = _e.x), (j[ce++] = _e.y), (j[ce++] = _e.z)),
                V.tangent || V.bitangent)
              ) {
                var be,
                  xe = h,
                  we = 0;
                if (
                  (q[A] && (we = Ce),
                  (be =
                    !R && we <= A && A < we + 2 * O
                      ? i.Cartesian3.UNIT_X
                      : i.Cartesian3.UNIT_Z),
                  i.Cartesian3.cross(be, _e, xe),
                  i.Cartesian3.normalize(xe, xe),
                  V.tangent &&
                    ((H[de++] = xe.x), (H[de++] = xe.y), (H[de++] = xe.z)),
                  V.bitangent)
                ) {
                  var ke = i.Cartesian3.cross(_e, xe, v);
                  i.Cartesian3.normalize(ke, ke),
                    (K[pe++] = ke.x),
                    (K[pe++] = ke.y),
                    (K[pe++] = ke.z);
                }
              }
            }
            V.st &&
              (ue.st = new s.GeometryAttribute({
                componentDatatype: m.ComponentDatatype.FLOAT,
                componentsPerAttribute: 2,
                values: Q,
              })),
              V.normal &&
                (ue.normal = new s.GeometryAttribute({
                  componentDatatype: m.ComponentDatatype.FLOAT,
                  componentsPerAttribute: 3,
                  values: j,
                })),
              V.tangent &&
                (ue.tangent = new s.GeometryAttribute({
                  componentDatatype: m.ComponentDatatype.FLOAT,
                  componentsPerAttribute: 3,
                  values: H,
                })),
              V.bitangent &&
                (ue.bitangent = new s.GeometryAttribute({
                  componentDatatype: m.ComponentDatatype.FLOAT,
                  componentsPerAttribute: 3,
                  values: K,
                }));
          }
          if (t.defined(e._offsetAttribute)) {
            var Pe = W.length,
              Fe = new Uint8Array(Pe / 3),
              ge =
                e._offsetAttribute === d.GeometryOffsetAttribute.NONE ? 0 : 1;
            c.arrayFill(Fe, ge),
              (ue.applyOffset = new s.GeometryAttribute({
                componentDatatype: m.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: Fe,
              }));
          }
          return new s.Geometry({
            attributes: ue,
            indices: Z,
            primitiveType: u.PrimitiveType.TRIANGLES,
            boundingSphere: o.BoundingSphere.fromEllipsoid(ye),
            offsetAttribute: e._offsetAttribute,
          });
        }
      }
    }),
    (w.getUnitEllipsoid = function () {
      return (
        t.defined(k) ||
          (k = w.createGeometry(
            new w({
              radii: new i.Cartesian3(1, 1, 1),
              vertexFormat: p.VertexFormat.POSITION_ONLY,
            }),
          )),
        k
      );
    }),
    (e.EllipsoidGeometry = w);
});
