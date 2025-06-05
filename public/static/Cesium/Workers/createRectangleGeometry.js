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
  './EllipsoidRhumbLine-6ca4b1e6',
  './earcut-2.2.1-b404d9e6',
  './PolygonPipeline-cc78b34e',
  './RectangleGeometryLibrary-c89ec784',
], function (
  t,
  e,
  a,
  r,
  n,
  o,
  i,
  s,
  l,
  u,
  c,
  p,
  m,
  d,
  g,
  y,
  f,
  h,
  b,
  v,
  _,
  A,
  w,
  x,
  C,
  R,
  E,
  F,
  G,
  P,
) {
  var D = new r.Cartesian3(),
    V = new r.Cartesian3(),
    L = new r.Cartesian3(),
    M = new r.Cartesian3(),
    O = new n.Rectangle(),
    T = new n.Cartesian2(),
    N = new o.BoundingSphere(),
    k = new o.BoundingSphere();
  function S(t, e) {
    var a = new c.Geometry({
      attributes: new y.GeometryAttributes(),
      primitiveType: p.PrimitiveType.TRIANGLES,
    });
    return (
      (a.attributes.position = new c.GeometryAttribute({
        componentDatatype: u.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: e.positions,
      })),
      t.normal &&
        (a.attributes.normal = new c.GeometryAttribute({
          componentDatatype: u.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: e.normals,
        })),
      t.tangent &&
        (a.attributes.tangent = new c.GeometryAttribute({
          componentDatatype: u.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: e.tangents,
        })),
      t.bitangent &&
        (a.attributes.bitangent = new c.GeometryAttribute({
          componentDatatype: u.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          values: e.bitangents,
        })),
      a
    );
  }
  var I = new r.Cartesian3(),
    H = new r.Cartesian3();
  function z(t, e) {
    var a = t._vertexFormat,
      n = t._ellipsoid,
      i = e.height,
      s = e.width,
      l = e.northCap,
      p = e.southCap,
      m = 0,
      d = i,
      g = i,
      y = 0;
    l && ((g -= m = 1), (y += 1)),
      p && ((d -= 1), (g -= 1), (y += 1)),
      (y += s * g);
    for (
      var f = a.position ? new Float64Array(3 * y) : void 0,
        h = a.st ? new Float32Array(2 * y) : void 0,
        b = 0,
        _ = 0,
        A = D,
        w = T,
        x = Number.MAX_VALUE,
        C = Number.MAX_VALUE,
        R = -Number.MAX_VALUE,
        E = -Number.MAX_VALUE,
        F = m;
      F < d;
      ++F
    )
      for (var G = 0; G < s; ++G)
        P.RectangleGeometryLibrary.computePosition(e, n, a.st, F, G, A, w),
          (f[b++] = A.x),
          (f[b++] = A.y),
          (f[b++] = A.z),
          a.st &&
            ((h[_++] = w.x),
            (h[_++] = w.y),
            (x = Math.min(x, w.x)),
            (C = Math.min(C, w.y)),
            (R = Math.max(R, w.x)),
            (E = Math.max(E, w.y)));
    if (
      (l &&
        (P.RectangleGeometryLibrary.computePosition(e, n, a.st, 0, 0, A, w),
        (f[b++] = A.x),
        (f[b++] = A.y),
        (f[b++] = A.z),
        a.st &&
          ((h[_++] = w.x),
          (h[_++] = w.y),
          (x = w.x),
          (C = w.y),
          (R = w.x),
          (E = w.y))),
      p &&
        (P.RectangleGeometryLibrary.computePosition(e, n, a.st, i - 1, 0, A, w),
        (f[b++] = A.x),
        (f[b++] = A.y),
        (f[b] = A.z),
        a.st &&
          ((h[_++] = w.x),
          (h[_] = w.y),
          (x = Math.min(x, w.x)),
          (C = Math.min(C, w.y)),
          (R = Math.max(R, w.x)),
          (E = Math.max(E, w.y)))),
      a.st && (x < 0 || C < 0 || 1 < R || 1 < E))
    )
      for (var O = 0; O < h.length; O += 2)
        (h[O] = (h[O] - x) / (R - x)), (h[O + 1] = (h[O + 1] - C) / (E - C));
    var N = (function (t, e, a, n) {
        var i = t.length,
          s = e.normal ? new Float32Array(i) : void 0,
          l = e.tangent ? new Float32Array(i) : void 0,
          u = e.bitangent ? new Float32Array(i) : void 0,
          c = 0,
          p = M,
          m = L,
          d = V;
        if (e.normal || e.tangent || e.bitangent)
          for (var g = 0; g < i; g += 3) {
            var y = r.Cartesian3.fromArray(t, g, D),
              f = c + 1,
              h = c + 2;
            (d = a.geodeticSurfaceNormal(y, d)),
              (e.tangent || e.bitangent) &&
                (r.Cartesian3.cross(r.Cartesian3.UNIT_Z, d, m),
                o.Matrix3.multiplyByVector(n, m, m),
                r.Cartesian3.normalize(m, m),
                e.bitangent &&
                  r.Cartesian3.normalize(r.Cartesian3.cross(d, m, p), p)),
              e.normal && ((s[c] = d.x), (s[f] = d.y), (s[h] = d.z)),
              e.tangent && ((l[c] = m.x), (l[f] = m.y), (l[h] = m.z)),
              e.bitangent && ((u[c] = p.x), (u[f] = p.y), (u[h] = p.z)),
              (c += 3);
          }
        return S(e, { positions: t, normals: s, tangents: l, bitangents: u });
      })(f, a, n, e.tangentRotationMatrix),
      k = 6 * (s - 1) * (g - 1);
    l && (k += 3 * (s - 1)), p && (k += 3 * (s - 1));
    var I,
      H = v.IndexDatatype.createTypedArray(y, k),
      z = 0,
      B = 0;
    for (I = 0; I < g - 1; ++I) {
      for (var U = 0; U < s - 1; ++U) {
        var q = z,
          Y = q + s,
          j = Y + 1,
          X = q + 1;
        (H[B++] = q),
          (H[B++] = Y),
          (H[B++] = X),
          (H[B++] = X),
          (H[B++] = Y),
          (H[B++] = j),
          ++z;
      }
      ++z;
    }
    if (l || p) {
      var Q,
        W,
        J = y - 1,
        Z = y - 1;
      if ((l && p && (J = y - 2), (z = 0), l))
        for (I = 0; I < s - 1; I++)
          (W = (Q = z) + 1), (H[B++] = J), (H[B++] = Q), (H[B++] = W), ++z;
      if (p)
        for (z = (g - 1) * s, I = 0; I < s - 1; I++)
          (W = (Q = z) + 1), (H[B++] = Q), (H[B++] = Z), (H[B++] = W), ++z;
    }
    return (
      (N.indices = H),
      a.st &&
        (N.attributes.st = new c.GeometryAttribute({
          componentDatatype: u.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: h,
        })),
      N
    );
  }
  function B(t, e, a, r, n) {
    return (
      (t[e++] = r[a]),
      (t[e++] = r[a + 1]),
      (t[e++] = r[a + 2]),
      (t[e++] = n[a]),
      (t[e++] = n[a + 1]),
      (t[e] = n[a + 2]),
      t
    );
  }
  function U(t, e, a, r) {
    return (
      (t[e++] = r[a]),
      (t[e++] = r[a + 1]),
      (t[e++] = r[a]),
      (t[e] = r[a + 1]),
      t
    );
  }
  var q = new C.VertexFormat();
  var Y = [
      new r.Cartesian3(),
      new r.Cartesian3(),
      new r.Cartesian3(),
      new r.Cartesian3(),
    ],
    j = new r.Cartographic(),
    X = new r.Cartographic();
  function Q(t, e, a, r, o) {
    if (0 === a) return n.Rectangle.clone(t, o);
    var i = P.RectangleGeometryLibrary.computeOptions(t, e, a, 0, O, j),
      s = i.height,
      l = i.width,
      u = Y;
    return (
      P.RectangleGeometryLibrary.computePosition(i, r, !1, 0, 0, u[0]),
      P.RectangleGeometryLibrary.computePosition(i, r, !1, 0, l - 1, u[1]),
      P.RectangleGeometryLibrary.computePosition(i, r, !1, s - 1, 0, u[2]),
      P.RectangleGeometryLibrary.computePosition(i, r, !1, s - 1, l - 1, u[3]),
      n.Rectangle.fromCartesianArray(u, r, o)
    );
  }
  function W(r) {
    var o = (r = t.defaultValue(r, t.defaultValue.EMPTY_OBJECT)).rectangle;
    if (
      (e.Check.typeOf.object('rectangle', o),
      n.Rectangle.validate(o),
      o.north < o.south)
    )
      throw new e.DeveloperError(
        'options.rectangle.north must be greater than or equal to options.rectangle.south',
      );
    var i = t.defaultValue(r.height, 0),
      s = t.defaultValue(r.extrudedHeight, i);
    (this._rectangle = n.Rectangle.clone(o)),
      (this._granularity = t.defaultValue(
        r.granularity,
        a.CesiumMath.RADIANS_PER_DEGREE,
      )),
      (this._ellipsoid = n.Ellipsoid.clone(
        t.defaultValue(r.ellipsoid, n.Ellipsoid.WGS84),
      )),
      (this._surfaceHeight = Math.max(i, s)),
      (this._rotation = t.defaultValue(r.rotation, 0)),
      (this._stRotation = t.defaultValue(r.stRotation, 0)),
      (this._vertexFormat = C.VertexFormat.clone(
        t.defaultValue(r.vertexFormat, C.VertexFormat.DEFAULT),
      )),
      (this._extrudedHeight = Math.min(i, s)),
      (this._shadowVolume = t.defaultValue(r.shadowVolume, !1)),
      (this._workerName = 'createRectangleGeometry'),
      (this._offsetAttribute = r.offsetAttribute),
      (this._rotatedRectangle = void 0),
      (this._textureCoordinateRotationPoints = void 0);
  }
  (W.packedLength =
    n.Rectangle.packedLength +
    n.Ellipsoid.packedLength +
    C.VertexFormat.packedLength +
    7),
    (W.pack = function (a, r, o) {
      return (
        e.Check.typeOf.object('value', a),
        e.Check.defined('array', r),
        (o = t.defaultValue(o, 0)),
        n.Rectangle.pack(a._rectangle, r, o),
        (o += n.Rectangle.packedLength),
        n.Ellipsoid.pack(a._ellipsoid, r, o),
        (o += n.Ellipsoid.packedLength),
        C.VertexFormat.pack(a._vertexFormat, r, o),
        (o += C.VertexFormat.packedLength),
        (r[o++] = a._granularity),
        (r[o++] = a._surfaceHeight),
        (r[o++] = a._rotation),
        (r[o++] = a._stRotation),
        (r[o++] = a._extrudedHeight),
        (r[o++] = a._shadowVolume ? 1 : 0),
        (r[o] = t.defaultValue(a._offsetAttribute, -1)),
        r
      );
    });
  var J = new n.Rectangle(),
    Z = n.Ellipsoid.clone(n.Ellipsoid.UNIT_SPHERE),
    K = {
      rectangle: J,
      ellipsoid: Z,
      vertexFormat: q,
      granularity: void 0,
      height: void 0,
      rotation: void 0,
      stRotation: void 0,
      extrudedHeight: void 0,
      shadowVolume: void 0,
      offsetAttribute: void 0,
    };
  (W.unpack = function (a, r, o) {
    e.Check.defined('array', a), (r = t.defaultValue(r, 0));
    var i = n.Rectangle.unpack(a, r, J);
    r += n.Rectangle.packedLength;
    var s = n.Ellipsoid.unpack(a, r, Z);
    r += n.Ellipsoid.packedLength;
    var l = C.VertexFormat.unpack(a, r, q);
    r += C.VertexFormat.packedLength;
    var u = a[r++],
      c = a[r++],
      p = a[r++],
      m = a[r++],
      d = a[r++],
      g = 1 === a[r++],
      y = a[r];
    return t.defined(o)
      ? ((o._rectangle = n.Rectangle.clone(i, o._rectangle)),
        (o._ellipsoid = n.Ellipsoid.clone(s, o._ellipsoid)),
        (o._vertexFormat = C.VertexFormat.clone(l, o._vertexFormat)),
        (o._granularity = u),
        (o._surfaceHeight = c),
        (o._rotation = p),
        (o._stRotation = m),
        (o._extrudedHeight = d),
        (o._shadowVolume = g),
        (o._offsetAttribute = -1 === y ? void 0 : y),
        o)
      : ((K.granularity = u),
        (K.height = c),
        (K.rotation = p),
        (K.stRotation = m),
        (K.extrudedHeight = d),
        (K.shadowVolume = g),
        (K.offsetAttribute = -1 === y ? void 0 : y),
        new W(K));
  }),
    (W.computeRectangle = function (r, o) {
      var i = (r = t.defaultValue(r, t.defaultValue.EMPTY_OBJECT)).rectangle;
      if (
        (e.Check.typeOf.object('rectangle', i),
        n.Rectangle.validate(i),
        i.north < i.south)
      )
        throw new e.DeveloperError(
          'options.rectangle.north must be greater than or equal to options.rectangle.south',
        );
      var s = t.defaultValue(r.granularity, a.CesiumMath.RADIANS_PER_DEGREE),
        l = t.defaultValue(r.ellipsoid, n.Ellipsoid.WGS84);
      return Q(i, s, t.defaultValue(r.rotation, 0), l, o);
    });
  var $ = new o.Matrix3(),
    tt = new d.Quaternion(),
    et = new r.Cartographic();
  (W.createGeometry = function (e) {
    if (
      !a.CesiumMath.equalsEpsilon(
        e._rectangle.north,
        e._rectangle.south,
        a.CesiumMath.EPSILON10,
      ) &&
      !a.CesiumMath.equalsEpsilon(
        e._rectangle.east,
        e._rectangle.west,
        a.CesiumMath.EPSILON10,
      )
    ) {
      var i = e._rectangle,
        s = e._ellipsoid,
        l = e._rotation,
        p = e._stRotation,
        m = e._vertexFormat,
        g = P.RectangleGeometryLibrary.computeOptions(
          i,
          e._granularity,
          l,
          p,
          O,
          j,
          X,
        ),
        y = $;
      if (0 !== p || 0 !== l) {
        var f = n.Rectangle.center(i, et),
          b = s.geodeticSurfaceNormalCartographic(f, I);
        d.Quaternion.fromAxisAngle(b, -p, tt), o.Matrix3.fromQuaternion(tt, y);
      } else o.Matrix3.clone(o.Matrix3.IDENTITY, y);
      var _,
        A,
        E = e._surfaceHeight,
        F = e._extrudedHeight,
        T = !a.CesiumMath.equalsEpsilon(E, F, 0, a.CesiumMath.EPSILON2);
      if (
        ((g.lonScalar = 1 / e._rectangle.width),
        (g.latScalar = 1 / e._rectangle.height),
        (g.tangentRotationMatrix = y),
        (i = e._rectangle),
        T)
      ) {
        _ = (function (e, n) {
          var o,
            i = e._shadowVolume,
            s = e._offsetAttribute,
            l = e._vertexFormat,
            p = e._extrudedHeight,
            m = e._surfaceHeight,
            d = e._ellipsoid,
            g = n.height,
            y = n.width;
          if (i) {
            var f = C.VertexFormat.clone(l, q);
            (f.normal = !0), (e._vertexFormat = f);
          }
          var b = z(e, n);
          i && (e._vertexFormat = l);
          var _ = G.PolygonPipeline.scaleToGeodeticHeight(
              b.attributes.position.values,
              m,
              d,
              !1,
            ),
            A = (_ = new Float64Array(_)).length,
            E = 2 * A,
            F = new Float64Array(E);
          F.set(_);
          var P = G.PolygonPipeline.scaleToGeodeticHeight(
            b.attributes.position.values,
            p,
            d,
          );
          F.set(P, A), (b.attributes.position.values = F);
          var O,
            T,
            N,
            k = l.normal ? new Float32Array(E) : void 0,
            Y = l.tangent ? new Float32Array(E) : void 0,
            j = l.bitangent ? new Float32Array(E) : void 0,
            X = l.st ? new Float32Array((E / 3) * 2) : void 0;
          if (l.normal) {
            for (T = b.attributes.normal.values, k.set(T), o = 0; o < A; o++)
              T[o] = -T[o];
            k.set(T, A), (b.attributes.normal.values = k);
          }
          if (i) {
            (T = b.attributes.normal.values),
              l.normal || (b.attributes.normal = void 0);
            var Q = new Float32Array(E);
            for (o = 0; o < A; o++) T[o] = -T[o];
            Q.set(T, A),
              (b.attributes.extrudeDirection = new c.GeometryAttribute({
                componentDatatype: u.ComponentDatatype.FLOAT,
                componentsPerAttribute: 3,
                values: Q,
              }));
          }
          var W = t.defined(s);
          if (W) {
            var J = (A / 3) * 2,
              Z = new Uint8Array(J);
            (Z =
              s === x.GeometryOffsetAttribute.TOP
                ? w.arrayFill(Z, 1, 0, J / 2)
                : ((N = s === x.GeometryOffsetAttribute.NONE ? 0 : 1),
                  w.arrayFill(Z, N))),
              (b.attributes.applyOffset = new c.GeometryAttribute({
                componentDatatype: u.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: Z,
              }));
          }
          if (l.tangent) {
            var K = b.attributes.tangent.values;
            for (Y.set(K), o = 0; o < A; o++) K[o] = -K[o];
            Y.set(K, A), (b.attributes.tangent.values = Y);
          }
          if (l.bitangent) {
            var $ = b.attributes.bitangent.values;
            j.set($), j.set($, A), (b.attributes.bitangent.values = j);
          }
          l.st &&
            ((O = b.attributes.st.values),
            X.set(O),
            X.set(O, (A / 3) * 2),
            (b.attributes.st.values = X));
          var tt = b.indices,
            et = tt.length,
            at = A / 3,
            rt = v.IndexDatatype.createTypedArray(E / 3, 2 * et);
          for (rt.set(tt), o = 0; o < et; o += 3)
            (rt[o + et] = tt[o + 2] + at),
              (rt[o + 1 + et] = tt[o + 1] + at),
              (rt[o + 2 + et] = tt[o] + at);
          b.indices = rt;
          var nt = n.northCap,
            ot = n.southCap,
            it = g,
            st = 2,
            lt = 0,
            ut = 4,
            ct = 4;
          nt && ((st -= 1), (it -= 1), (lt += 1), (ut -= 2), (ct -= 1)),
            ot && ((st -= 1), (it -= 1), (lt += 1), (ut -= 2), (ct -= 1));
          var pt = 2 * ((lt += st * y + 2 * it - ut) + ct),
            mt = new Float64Array(3 * pt),
            dt = i ? new Float32Array(3 * pt) : void 0,
            gt = W ? new Uint8Array(pt) : void 0,
            yt = l.st ? new Float32Array(2 * pt) : void 0,
            ft = s === x.GeometryOffsetAttribute.TOP;
          W &&
            !ft &&
            ((N = s === x.GeometryOffsetAttribute.ALL ? 1 : 0),
            (gt = w.arrayFill(gt, N)));
          var ht,
            bt = 0,
            vt = 0,
            _t = 0,
            At = 0,
            wt = y * it;
          for (o = 0; o < wt; o += y)
            (mt = B(mt, bt, (ht = 3 * o), _, P)),
              (bt += 6),
              l.st && ((yt = U(yt, vt, 2 * o, O)), (vt += 4)),
              i &&
                ((_t += 3),
                (dt[_t++] = T[ht]),
                (dt[_t++] = T[ht + 1]),
                (dt[_t++] = T[ht + 2])),
              ft && ((gt[At++] = 1), (At += 1));
          if (ot) {
            var xt = nt ? wt + 1 : wt;
            for (ht = 3 * xt, o = 0; o < 2; o++)
              (mt = B(mt, bt, ht, _, P)),
                (bt += 6),
                l.st && ((yt = U(yt, vt, 2 * xt, O)), (vt += 4)),
                i &&
                  ((_t += 3),
                  (dt[_t++] = T[ht]),
                  (dt[_t++] = T[ht + 1]),
                  (dt[_t++] = T[ht + 2])),
                ft && ((gt[At++] = 1), (At += 1));
          } else
            for (o = wt - y; o < wt; o++)
              (mt = B(mt, bt, (ht = 3 * o), _, P)),
                (bt += 6),
                l.st && ((yt = U(yt, vt, 2 * o, O)), (vt += 4)),
                i &&
                  ((_t += 3),
                  (dt[_t++] = T[ht]),
                  (dt[_t++] = T[ht + 1]),
                  (dt[_t++] = T[ht + 2])),
                ft && ((gt[At++] = 1), (At += 1));
          for (o = wt - 1; 0 < o; o -= y)
            (mt = B(mt, bt, (ht = 3 * o), _, P)),
              (bt += 6),
              l.st && ((yt = U(yt, vt, 2 * o, O)), (vt += 4)),
              i &&
                ((_t += 3),
                (dt[_t++] = T[ht]),
                (dt[_t++] = T[ht + 1]),
                (dt[_t++] = T[ht + 2])),
              ft && ((gt[At++] = 1), (At += 1));
          if (nt) {
            var Ct = wt;
            for (ht = 3 * Ct, o = 0; o < 2; o++)
              (mt = B(mt, bt, ht, _, P)),
                (bt += 6),
                l.st && ((yt = U(yt, vt, 2 * Ct, O)), (vt += 4)),
                i &&
                  ((_t += 3),
                  (dt[_t++] = T[ht]),
                  (dt[_t++] = T[ht + 1]),
                  (dt[_t++] = T[ht + 2])),
                ft && ((gt[At++] = 1), (At += 1));
          } else
            for (o = y - 1; 0 <= o; o--)
              (mt = B(mt, bt, (ht = 3 * o), _, P)),
                (bt += 6),
                l.st && ((yt = U(yt, vt, 2 * o, O)), (vt += 4)),
                i &&
                  ((_t += 3),
                  (dt[_t++] = T[ht]),
                  (dt[_t++] = T[ht + 1]),
                  (dt[_t++] = T[ht + 2])),
                ft && ((gt[At++] = 1), (At += 1));
          var Rt = (function (t, e, n) {
            var o = t.length,
              i = e.normal ? new Float32Array(o) : void 0,
              s = e.tangent ? new Float32Array(o) : void 0,
              l = e.bitangent ? new Float32Array(o) : void 0,
              u = 0,
              c = 0,
              p = 0,
              m = !0,
              d = M,
              g = L,
              y = V;
            if (e.normal || e.tangent || e.bitangent)
              for (var f = 0; f < o; f += 6) {
                var h = r.Cartesian3.fromArray(t, f, D),
                  b = r.Cartesian3.fromArray(t, (f + 6) % o, I);
                if (m) {
                  var v = r.Cartesian3.fromArray(t, (f + 3) % o, H);
                  r.Cartesian3.subtract(b, h, b),
                    r.Cartesian3.subtract(v, h, v),
                    (y = r.Cartesian3.normalize(
                      r.Cartesian3.cross(v, b, y),
                      y,
                    )),
                    (m = !1);
                }
                r.Cartesian3.equalsEpsilon(b, h, a.CesiumMath.EPSILON10) &&
                  (m = !0),
                  (e.tangent || e.bitangent) &&
                    ((d = n.geodeticSurfaceNormal(h, d)),
                    e.tangent &&
                      (g = r.Cartesian3.normalize(
                        r.Cartesian3.cross(d, y, g),
                        g,
                      ))),
                  e.normal &&
                    ((i[u++] = y.x),
                    (i[u++] = y.y),
                    (i[u++] = y.z),
                    (i[u++] = y.x),
                    (i[u++] = y.y),
                    (i[u++] = y.z)),
                  e.tangent &&
                    ((s[c++] = g.x),
                    (s[c++] = g.y),
                    (s[c++] = g.z),
                    (s[c++] = g.x),
                    (s[c++] = g.y),
                    (s[c++] = g.z)),
                  e.bitangent &&
                    ((l[p++] = d.x),
                    (l[p++] = d.y),
                    (l[p++] = d.z),
                    (l[p++] = d.x),
                    (l[p++] = d.y),
                    (l[p++] = d.z));
              }
            return S(e, {
              positions: t,
              normals: i,
              tangents: s,
              bitangents: l,
            });
          })(mt, l, d);
          l.st &&
            (Rt.attributes.st = new c.GeometryAttribute({
              componentDatatype: u.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: yt,
            })),
            i &&
              (Rt.attributes.extrudeDirection = new c.GeometryAttribute({
                componentDatatype: u.ComponentDatatype.FLOAT,
                componentsPerAttribute: 3,
                values: dt,
              })),
            W &&
              (Rt.attributes.applyOffset = new c.GeometryAttribute({
                componentDatatype: u.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: gt,
              }));
          var Et,
            Ft,
            Gt,
            Pt,
            Dt = v.IndexDatatype.createTypedArray(pt, 6 * lt);
          A = mt.length / 3;
          var Vt = 0;
          for (o = 0; o < A - 1; o += 2) {
            Pt = ((Et = o) + 2) % A;
            var Lt = r.Cartesian3.fromArray(mt, 3 * Et, I),
              Mt = r.Cartesian3.fromArray(mt, 3 * Pt, H);
            r.Cartesian3.equalsEpsilon(Lt, Mt, a.CesiumMath.EPSILON10) ||
              ((Gt = (2 + (Ft = (Et + 1) % A)) % A),
              (Dt[Vt++] = Et),
              (Dt[Vt++] = Ft),
              (Dt[Vt++] = Pt),
              (Dt[Vt++] = Pt),
              (Dt[Vt++] = Ft),
              (Dt[Vt++] = Gt));
          }
          return (
            (Rt.indices = Dt),
            (Rt = h.GeometryPipeline.combineInstances([
              new R.GeometryInstance({ geometry: b }),
              new R.GeometryInstance({ geometry: Rt }),
            ]))[0]
          );
        })(e, g);
        var Y = o.BoundingSphere.fromRectangle3D(i, s, E, k),
          Q = o.BoundingSphere.fromRectangle3D(i, s, F, N);
        A = o.BoundingSphere.union(Y, Q);
      } else {
        if (
          (((_ = z(e, g)).attributes.position.values =
            G.PolygonPipeline.scaleToGeodeticHeight(
              _.attributes.position.values,
              E,
              s,
              !1,
            )),
          t.defined(e._offsetAttribute))
        ) {
          var W = _.attributes.position.values.length,
            J = new Uint8Array(W / 3),
            Z = e._offsetAttribute === x.GeometryOffsetAttribute.NONE ? 0 : 1;
          w.arrayFill(J, Z),
            (_.attributes.applyOffset = new c.GeometryAttribute({
              componentDatatype: u.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: J,
            }));
        }
        A = o.BoundingSphere.fromRectangle3D(i, s, E);
      }
      return (
        m.position || delete _.attributes.position,
        new c.Geometry({
          attributes: _.attributes,
          indices: _.indices,
          primitiveType: _.primitiveType,
          boundingSphere: A,
          offsetAttribute: e._offsetAttribute,
        })
      );
    }
  }),
    (W.createShadowVolume = function (t, e, a) {
      var r = t._granularity,
        n = t._ellipsoid,
        o = e(r, n),
        i = a(r, n);
      return new W({
        rectangle: t._rectangle,
        rotation: t._rotation,
        ellipsoid: n,
        stRotation: t._stRotation,
        granularity: r,
        extrudedHeight: i,
        height: o,
        vertexFormat: C.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
      });
    });
  var at = new n.Rectangle(),
    rt = [new n.Cartesian2(), new n.Cartesian2(), new n.Cartesian2()],
    nt = new c.Matrix2(),
    ot = new r.Cartographic();
  return (
    Object.defineProperties(W.prototype, {
      rectangle: {
        get: function () {
          return (
            t.defined(this._rotatedRectangle) ||
              (this._rotatedRectangle = Q(
                this._rectangle,
                this._granularity,
                this._rotation,
                this._ellipsoid,
              )),
            this._rotatedRectangle
          );
        },
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return (
            t.defined(this._textureCoordinateRotationPoints) ||
              (this._textureCoordinateRotationPoints = (function (t) {
                if (0 === t._stRotation) return [0, 0, 0, 1, 1, 0];
                var e = n.Rectangle.clone(t._rectangle, at),
                  a = t._granularity,
                  r = t._ellipsoid,
                  o = Q(e, a, t._rotation - t._stRotation, r, at),
                  i = rt;
                (i[0].x = o.west),
                  (i[0].y = o.south),
                  (i[1].x = o.west),
                  (i[1].y = o.north),
                  (i[2].x = o.east),
                  (i[2].y = o.south);
                for (
                  var s = t.rectangle,
                    l = c.Matrix2.fromRotation(t._stRotation, nt),
                    u = n.Rectangle.center(s, ot),
                    p = 0;
                  p < 3;
                  ++p
                ) {
                  var m = i[p];
                  (m.x -= u.longitude),
                    (m.y -= u.latitude),
                    c.Matrix2.multiplyByVector(l, m, m),
                    (m.x += u.longitude),
                    (m.y += u.latitude),
                    (m.x = (m.x - s.west) / s.width),
                    (m.y = (m.y - s.south) / s.height);
                }
                var d = i[0],
                  g = i[1],
                  y = i[2],
                  f = new Array(6);
                return (
                  n.Cartesian2.pack(d, f),
                  n.Cartesian2.pack(g, f, 2),
                  n.Cartesian2.pack(y, f, 4),
                  f
                );
              })(this)),
            this._textureCoordinateRotationPoints
          );
        },
      },
    }),
    function (e, a) {
      return (
        t.defined(a) && (e = W.unpack(e, a)),
        (e._ellipsoid = n.Ellipsoid.clone(e._ellipsoid)),
        (e._rectangle = n.Rectangle.clone(e._rectangle)),
        W.createGeometry(e)
      );
    }
  );
});
