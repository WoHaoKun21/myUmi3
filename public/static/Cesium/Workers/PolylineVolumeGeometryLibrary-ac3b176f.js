define([
  'exports',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './Cartesian4-5af5bb24',
  './Transforms-1509c877',
  './EllipsoidTangentPlane-9c25b2da',
  './PolylinePipeline-65700d85',
], function (a, e, r, n, t, i, s, o, l) {
  var C = Object.freeze({ ROUNDED: 0, MITERED: 1, BEVELED: 2 }),
    c = [new r.Cartesian3(), new r.Cartesian3()],
    u = new r.Cartesian3(),
    y = new r.Cartesian3(),
    m = new r.Cartesian3(),
    d = new r.Cartesian3(),
    p = new r.Cartesian3(),
    f = new r.Cartesian3(),
    g = new r.Cartesian3(),
    h = new r.Cartesian3(),
    v = new r.Cartesian3(),
    w = new r.Cartesian3(),
    x = new r.Cartesian3(),
    M = {},
    P = new r.Cartographic();
  function E(a, e) {
    for (var r = new Array(a.length), n = 0; n < a.length; n++) {
      var t = a[n];
      (P = e.cartesianToCartographic(t, P)),
        (r[n] = P.height),
        (a[n] = e.scaleToGeodeticSurface(t, t));
    }
    return r;
  }
  function B(a, e, n, t) {
    var i,
      s = a[0],
      o = a[1],
      l = r.Cartesian3.angleBetween(s, o),
      C = Math.ceil(l / t),
      c = new Array(C);
    if (e === n) {
      for (i = 0; i < C; i++) c[i] = e;
      return c.push(n), c;
    }
    var u = (n - e) / C;
    for (i = 1; i < C; i++) {
      var y = e + i * u;
      c[i] = y;
    }
    return (c[0] = e), c.push(n), c;
  }
  var T = new r.Cartesian3(),
    z = new r.Cartesian3();
  function S(a, e, t, i) {
    var s = new o.EllipsoidTangentPlane(t, i),
      l = s.projectPointOntoPlane(r.Cartesian3.add(t, a, T), T),
      C = s.projectPointOntoPlane(r.Cartesian3.add(t, e, z), z),
      c = n.Cartesian2.angleBetween(l, C);
    return 0 <= C.x * l.y - C.y * l.x ? -c : c;
  }
  var A = new r.Cartesian3(-1, 0, 0),
    b = t.Matrix4.clone(t.Matrix4.IDENTITY),
    D = new t.Matrix4(),
    N = new t.Matrix3(),
    O = t.Matrix3.IDENTITY.clone(),
    V = new r.Cartesian3(),
    R = new i.Cartesian4(),
    I = new r.Cartesian3();
  function L(a, e, n, i, o, l, C, c) {
    var u = V,
      y = R;
    (b = s.Transforms.eastNorthUpToFixedFrame(a, o, b)),
      (u = t.Matrix4.multiplyByPointAsVector(b, A, u));
    var m = S((u = r.Cartesian3.normalize(u, u)), e, a, o);
    (N = t.Matrix3.fromRotationZ(m, N)),
      (I.z = l),
      (b = t.Matrix4.multiplyTransformation(
        b,
        t.Matrix4.fromRotationTranslation(N, I, D),
        b,
      ));
    var d = O;
    d[0] = C;
    for (var p = 0; p < c; p++)
      for (var f = 0; f < n.length; f += 3)
        (y = r.Cartesian3.fromArray(n, f, y)),
          (y = t.Matrix3.multiplyByVector(d, y, y)),
          (y = t.Matrix4.multiplyByPoint(b, y, y)),
          i.push(y.x, y.y, y.z);
    return i;
  }
  function F(a, e, n, i, o, l, C, c, u) {
    var y = V,
      m = R;
    (b = s.Transforms.eastNorthUpToFixedFrame(a, o, b)),
      (y = t.Matrix4.multiplyByPointAsVector(b, A, y));
    var d = S((y = r.Cartesian3.normalize(y, y)), e, a, o);
    (N = t.Matrix3.fromRotationZ(d, N)),
      (I.z = l),
      (b = t.Matrix4.multiplyTransformation(
        b,
        t.Matrix4.fromRotationTranslation(N, I, D),
        b,
      ));
    var p = O;
    p[0] = C;
    for (var f = 0; f < c; f++)
      for (var g = 0; g < n.length; g += 3)
        (m = r.Cartesian3.fromArray(n, g, m)),
          (m = t.Matrix3.multiplyByVector(p, m, m)),
          (m = t.Matrix4.multiplyByPoint(b, m, m)),
          (m = t.Matrix4.multiplyByPoint(u, m, m)),
          i.push(m.x, m.y, m.z);
    return i;
  }
  var G = new r.Cartesian3();
  function U(a, e, n, t, i, s, o) {
    for (var l = 0; l < a.length; l += 3)
      t = L(r.Cartesian3.fromArray(a, l, G), e, n, t, i, s[l / 3], o, 1);
    return t;
  }
  function _(a, e) {
    var r = a.length,
      n = new Array(6 * r),
      t = 0,
      i = e.x + e.width / 2,
      s = e.y + e.height / 2,
      o = a[0];
    (n[t++] = o.x - i), (n[t++] = 0), (n[t++] = o.y - s);
    for (var l = 1; l < r; l++) {
      var C = (o = a[l]).x - i,
        c = o.y - s;
      (n[t++] = C),
        (n[t++] = 0),
        (n[t++] = c),
        (n[t++] = C),
        (n[t++] = 0),
        (n[t++] = c);
    }
    return (o = a[0]), (n[t++] = o.x - i), (n[t++] = 0), (n[t++] = o.y - s), n;
  }
  function j(a, e) {
    for (
      var r = a.length,
        n = new Array(3 * r),
        t = 0,
        i = e.x + e.width / 2,
        s = e.y + e.height / 2,
        o = 0;
      o < r;
      o++
    )
      (n[t++] = a[o].x - i), (n[t++] = 0), (n[t++] = a[o].y - s);
    return n;
  }
  var Q = new s.Quaternion(),
    q = new r.Cartesian3(),
    Y = new t.Matrix3();
  function Z(a, n, i, o, l, c, u, y, m, d) {
    var p,
      f,
      g = r.Cartesian3.angleBetween(
        r.Cartesian3.subtract(n, a, w),
        r.Cartesian3.subtract(i, a, x),
      ),
      h = o === C.BEVELED ? 0 : Math.ceil(g / e.CesiumMath.toRadians(5));
    if (
      ((p = l
        ? t.Matrix3.fromQuaternion(
            s.Quaternion.fromAxisAngle(
              r.Cartesian3.negate(a, w),
              g / (h + 1),
              Q,
            ),
            Y,
          )
        : t.Matrix3.fromQuaternion(
            s.Quaternion.fromAxisAngle(a, g / (h + 1), Q),
            Y,
          )),
      (n = r.Cartesian3.clone(n, q)),
      0 < h)
    )
      for (var v = d ? 2 : 1, M = 0; M < h; M++)
        (n = t.Matrix3.multiplyByVector(p, n, n)),
          (f = r.Cartesian3.subtract(n, a, w)),
          (f = r.Cartesian3.normalize(f, f)),
          l || (f = r.Cartesian3.negate(f, f)),
          (u = L(c.scaleToGeodeticSurface(n, x), f, y, u, c, m, 1, v));
    else
      (f = r.Cartesian3.subtract(n, a, w)),
        (f = r.Cartesian3.normalize(f, f)),
        l || (f = r.Cartesian3.negate(f, f)),
        (u = L(c.scaleToGeodeticSurface(n, x), f, y, u, c, m, 1, 1)),
        (i = r.Cartesian3.clone(i, q)),
        (f = r.Cartesian3.subtract(i, a, w)),
        (f = r.Cartesian3.normalize(f, f)),
        l || (f = r.Cartesian3.negate(f, f)),
        (u = L(c.scaleToGeodeticSurface(i, x), f, y, u, c, m, 1, 1));
    return u;
  }
  (M.removeDuplicatesFromShape = function (a) {
    for (var e = a.length, r = [], t = e - 1, i = 0; i < e; t = i++) {
      var s = a[t],
        o = a[i];
      n.Cartesian2.equals(s, o) || r.push(o);
    }
    return r;
  }),
    (M.angleIsGreaterThanPi = function (a, e, n, t) {
      var i = new o.EllipsoidTangentPlane(n, t),
        s = i.projectPointOntoPlane(r.Cartesian3.add(n, a, T), T),
        l = i.projectPointOntoPlane(r.Cartesian3.add(n, e, z), z);
      return 0 <= l.x * s.y - l.y * s.x;
    });
  var k = new r.Cartesian3(),
    H = new r.Cartesian3();
  (M.computePositions = function (a, n, t, i, s) {
    var o = i._ellipsoid,
      x = E(a, o),
      P = i._granularity,
      T = i._cornerType,
      z = s ? _(n, t) : j(n, t),
      S = s ? j(n, t) : void 0,
      A = t.height / 2,
      b = t.width / 2,
      D = a.length,
      N = [],
      O = s ? [] : void 0,
      V = u,
      R = y,
      I = m,
      F = d,
      G = p,
      Q = f,
      q = g,
      Y = h,
      J = v,
      K = a[0],
      W = a[1];
    (F = o.geodeticSurfaceNormal(K, F)),
      (V = r.Cartesian3.subtract(W, K, V)),
      (V = r.Cartesian3.normalize(V, V)),
      (Y = r.Cartesian3.cross(F, V, Y)),
      (Y = r.Cartesian3.normalize(Y, Y));
    var X,
      $ = x[0],
      aa = x[1];
    s && (O = L(K, Y, S, O, o, $ + A, 1, 1)),
      (J = r.Cartesian3.clone(K, J)),
      (K = W),
      (R = r.Cartesian3.negate(V, R));
    for (var ea = 1; ea < D - 1; ea++) {
      var ra = s ? 2 : 1;
      (W = a[ea + 1]),
        (V = r.Cartesian3.subtract(W, K, V)),
        (V = r.Cartesian3.normalize(V, V)),
        (I = r.Cartesian3.add(V, R, I)),
        (I = r.Cartesian3.normalize(I, I)),
        (F = o.geodeticSurfaceNormal(K, F));
      var na = r.Cartesian3.multiplyByScalar(F, r.Cartesian3.dot(V, F), k);
      r.Cartesian3.subtract(V, na, na), r.Cartesian3.normalize(na, na);
      var ta = r.Cartesian3.multiplyByScalar(F, r.Cartesian3.dot(R, F), H);
      if (
        (r.Cartesian3.subtract(R, ta, ta),
        r.Cartesian3.normalize(ta, ta),
        e.CesiumMath.equalsEpsilon(
          Math.abs(r.Cartesian3.dot(na, ta)),
          1,
          e.CesiumMath.EPSILON7,
        ))
      )
        (N = L(J, Y, z, N, o, $ + A, 1, 1)), (J = K);
      else {
        (I = r.Cartesian3.cross(I, F, I)),
          (I = r.Cartesian3.cross(F, I, I)),
          (I = r.Cartesian3.normalize(I, I));
        var ia =
            1 /
            Math.max(0.25, r.Cartesian3.magnitude(r.Cartesian3.cross(I, R, w))),
          sa = M.angleIsGreaterThanPi(V, R, K, o);
        sa
          ? ((G = r.Cartesian3.add(
              K,
              r.Cartesian3.multiplyByScalar(I, ia * b, I),
              G,
            )),
            (Q = r.Cartesian3.add(
              G,
              r.Cartesian3.multiplyByScalar(Y, b, Q),
              Q,
            )),
            (c[0] = r.Cartesian3.clone(J, c[0])),
            (c[1] = r.Cartesian3.clone(Q, c[1])),
            (X = B(c, $ + A, aa + A, P)),
            (N = U(
              l.PolylinePipeline.generateArc({
                positions: c,
                granularity: P,
                ellipsoid: o,
              }),
              Y,
              z,
              N,
              o,
              X,
              1,
            )),
            (Y = r.Cartesian3.cross(F, V, Y)),
            (Y = r.Cartesian3.normalize(Y, Y)),
            (q = r.Cartesian3.add(
              G,
              r.Cartesian3.multiplyByScalar(Y, b, q),
              q,
            )),
            T === C.ROUNDED || T === C.BEVELED
              ? Z(G, Q, q, T, sa, o, N, z, aa + A, s)
              : (N = L(
                  K,
                  (I = r.Cartesian3.negate(I, I)),
                  z,
                  N,
                  o,
                  aa + A,
                  ia,
                  ra,
                )))
          : ((G = r.Cartesian3.add(
              K,
              r.Cartesian3.multiplyByScalar(I, ia * b, I),
              G,
            )),
            (Q = r.Cartesian3.add(
              G,
              r.Cartesian3.multiplyByScalar(Y, -b, Q),
              Q,
            )),
            (c[0] = r.Cartesian3.clone(J, c[0])),
            (c[1] = r.Cartesian3.clone(Q, c[1])),
            (X = B(c, $ + A, aa + A, P)),
            (N = U(
              l.PolylinePipeline.generateArc({
                positions: c,
                granularity: P,
                ellipsoid: o,
              }),
              Y,
              z,
              N,
              o,
              X,
              1,
            )),
            (Y = r.Cartesian3.cross(F, V, Y)),
            (Y = r.Cartesian3.normalize(Y, Y)),
            (q = r.Cartesian3.add(
              G,
              r.Cartesian3.multiplyByScalar(Y, -b, q),
              q,
            )),
            T === C.ROUNDED || T === C.BEVELED
              ? Z(G, Q, q, T, sa, o, N, z, aa + A, s)
              : (N = L(K, I, z, N, o, aa + A, ia, ra))),
          (J = r.Cartesian3.clone(q, J)),
          (R = r.Cartesian3.negate(V, R));
      }
      ($ = aa), (aa = x[ea + 1]), (K = W);
    }
    (c[0] = r.Cartesian3.clone(J, c[0])),
      (c[1] = r.Cartesian3.clone(K, c[1])),
      (X = B(c, $ + A, aa + A, P)),
      (N = U(
        l.PolylinePipeline.generateArc({
          positions: c,
          granularity: P,
          ellipsoid: o,
        }),
        Y,
        z,
        N,
        o,
        X,
        1,
      )),
      s && (O = L(K, Y, S, O, o, aa + A, 1, 1)),
      (D = N.length);
    var oa = s ? D + O.length : D,
      la = new Float64Array(oa);
    return la.set(N), s && la.set(O, D), la;
  }),
    (M.computeLocalPositions = function (a, n, i, o, x, P) {
      var T = o._ellipsoid,
        z = E(a, T),
        S = o._granularity,
        A = o._cornerType,
        b = x ? _(n, i) : j(n, i),
        D = x ? j(n, i) : void 0,
        N = i.width / 2,
        O = a.length,
        V = [],
        R = x ? [] : void 0,
        I = u,
        L = y,
        Q = m,
        q = d,
        Y = p,
        J = f,
        K = g,
        W = h,
        X = v,
        $ = s.Transforms.eastNorthUpToFixedFrame(P, T, new t.Matrix4()),
        aa = t.Matrix4.inverse($, new t.Matrix4()),
        ea = a[0],
        ra = a[1];
      (q = T.geodeticSurfaceNormal(ea, q)),
        (I = r.Cartesian3.subtract(ra, ea, I)),
        (I = r.Cartesian3.normalize(I, I)),
        (W = r.Cartesian3.cross(q, I, W)),
        (W = r.Cartesian3.normalize(W, W));
      var na,
        ta = z[0],
        ia = z[1];
      x && (R = F(ea, W, D, R, T, ta + 0, 1, 1, aa)),
        (X = r.Cartesian3.clone(ea, X)),
        (ea = ra),
        (L = r.Cartesian3.negate(I, L));
      for (var sa = 1; sa < O - 1; sa++) {
        var oa = x ? 2 : 1;
        (ra = a[sa + 1]),
          (I = r.Cartesian3.subtract(ra, ea, I)),
          (I = r.Cartesian3.normalize(I, I)),
          (Q = r.Cartesian3.add(I, L, Q)),
          (Q = r.Cartesian3.normalize(Q, Q)),
          (q = T.geodeticSurfaceNormal(ea, q));
        var la = r.Cartesian3.multiplyByScalar(q, r.Cartesian3.dot(I, q), k);
        r.Cartesian3.subtract(I, la, la), r.Cartesian3.normalize(la, la);
        var Ca = r.Cartesian3.multiplyByScalar(q, r.Cartesian3.dot(L, q), H);
        if (
          (r.Cartesian3.subtract(L, Ca, Ca),
          r.Cartesian3.normalize(Ca, Ca),
          e.CesiumMath.equalsEpsilon(
            Math.abs(r.Cartesian3.dot(la, Ca)),
            1,
            e.CesiumMath.EPSILON7,
          ))
        )
          (V = F(X, W, b, V, T, ta + 0, 1, 1, aa)), (X = ea);
        else {
          (Q = r.Cartesian3.cross(Q, q, Q)),
            (Q = r.Cartesian3.cross(q, Q, Q)),
            (Q = r.Cartesian3.normalize(Q, Q));
          var ca =
              1 /
              Math.max(
                0.25,
                r.Cartesian3.magnitude(r.Cartesian3.cross(Q, L, w)),
              ),
            ua = M.angleIsGreaterThanPi(I, L, ea, T);
          ua
            ? ((Y = r.Cartesian3.add(
                ea,
                r.Cartesian3.multiplyByScalar(Q, ca * N, Q),
                Y,
              )),
              (J = r.Cartesian3.add(
                Y,
                r.Cartesian3.multiplyByScalar(W, N, J),
                J,
              )),
              (c[0] = r.Cartesian3.clone(X, c[0])),
              (c[1] = r.Cartesian3.clone(J, c[1])),
              (na = B(c, ta + 0, ia + 0, S)),
              (V = U(
                l.PolylinePipeline.generateArc({
                  positions: c,
                  granularity: S,
                  ellipsoid: T,
                }),
                W,
                b,
                V,
                T,
                na,
                1,
                fromEnu,
              )),
              (W = r.Cartesian3.cross(q, I, W)),
              (W = r.Cartesian3.normalize(W, W)),
              (K = r.Cartesian3.add(
                Y,
                r.Cartesian3.multiplyByScalar(W, N, K),
                K,
              )),
              A === C.ROUNDED || A === C.BEVELED
                ? Z(Y, J, K, A, ua, T, V, b, ia + 0, x)
                : (V = F(
                    ea,
                    (Q = r.Cartesian3.negate(Q, Q)),
                    b,
                    V,
                    T,
                    ia + 0,
                    ca,
                    oa,
                    aa,
                  )))
            : ((Y = r.Cartesian3.add(
                ea,
                r.Cartesian3.multiplyByScalar(Q, ca * N, Q),
                Y,
              )),
              (J = r.Cartesian3.add(
                Y,
                r.Cartesian3.multiplyByScalar(W, -N, J),
                J,
              )),
              (c[0] = r.Cartesian3.clone(X, c[0])),
              (c[1] = r.Cartesian3.clone(J, c[1])),
              (na = B(c, ta + 0, ia + 0, S)),
              (V = U(
                l.PolylinePipeline.generateArc({
                  positions: c,
                  granularity: S,
                  ellipsoid: T,
                }),
                W,
                b,
                V,
                T,
                na,
                1,
              )),
              (W = r.Cartesian3.cross(q, I, W)),
              (W = r.Cartesian3.normalize(W, W)),
              (K = r.Cartesian3.add(
                Y,
                r.Cartesian3.multiplyByScalar(W, -N, K),
                K,
              )),
              A === C.ROUNDED || A === C.BEVELED
                ? Z(Y, J, K, A, ua, T, V, b, ia + 0, x)
                : (V = F(ea, Q, b, V, T, ia + 0, ca, oa, aa))),
            (X = r.Cartesian3.clone(K, X)),
            (L = r.Cartesian3.negate(I, L));
        }
        (ta = ia), (ia = z[sa + 1]), (ea = ra);
      }
      (c[0] = r.Cartesian3.clone(X, c[0])),
        (c[1] = r.Cartesian3.clone(ea, c[1])),
        (na = B(c, ta + 0, ia + 0, S)),
        (V = (function (a, e, n, t, i, s, o, l) {
          for (var C = 0; C < a.length; C += 3)
            t = F(
              r.Cartesian3.fromArray(a, C, G),
              e,
              n,
              t,
              i,
              s[C / 3],
              1,
              1,
              l,
            );
          return t;
        })(
          l.PolylinePipeline.generateArc({
            positions: c,
            granularity: S,
            ellipsoid: T,
          }),
          W,
          b,
          V,
          T,
          na,
          0,
          aa,
        )),
        x && (R = F(ea, W, D, R, T, ia + 0, 1, 1, aa)),
        (O = V.length);
      var ya = x ? O + R.length : O,
        ma = new Float64Array(ya);
      return ma.set(V), x && ma.set(R, O), ma;
    }),
    (a.CornerType = C),
    (a.PolylineVolumeGeometryLibrary = M);
});
