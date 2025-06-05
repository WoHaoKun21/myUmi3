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
  './FeatureDetection-7bd32c34',
  './Transforms-1509c877',
  './buildModuleUrl-392763e2',
  './AttributeCompression-75ce15eb',
  './IndexDatatype-9435b55f',
  './IntersectionTests-dbfba52c',
  './Plane-2bcb9154',
  './createTaskProcessorWorker',
  './EllipsoidTangentPlane-9c25b2da',
  './OrientedBoundingBox-7b25e901',
  './TerrainEncoding-3dab0ca0',
], function (e, t, i, n, r, s, h, u, o, a, d, p, f, l, c, g, m, v, x, w, C) {
  var b = function (i, n, r, s, h, u) {
      if (!e.defined(i)) throw new t.DeveloperError('threshold is required.');
      if (!e.defined(n)) throw new t.DeveloperError('keepAbove is required.');
      if (!e.defined(r)) throw new t.DeveloperError('u0 is required.');
      if (!e.defined(s)) throw new t.DeveloperError('u1 is required.');
      if (!e.defined(h)) throw new t.DeveloperError('u2 is required.');
      var o, a, d;
      e.defined(u) ? (u.length = 0) : (u = []),
        (d = n
          ? ((o = r < i), (a = s < i), h < i)
          : ((o = i < r), (a = i < s), i < h));
      var p,
        f,
        l,
        c,
        g,
        m,
        v = o + a + d;
      return (
        1 === v
          ? o
            ? ((p = (i - r) / (s - r)),
              (f = (i - r) / (h - r)),
              u.push(1),
              u.push(2),
              1 !== f && (u.push(-1), u.push(0), u.push(2), u.push(f)),
              1 !== p && (u.push(-1), u.push(0), u.push(1), u.push(p)))
            : a
            ? ((l = (i - s) / (h - s)),
              (c = (i - s) / (r - s)),
              u.push(2),
              u.push(0),
              1 !== c && (u.push(-1), u.push(1), u.push(0), u.push(c)),
              1 !== l && (u.push(-1), u.push(1), u.push(2), u.push(l)))
            : d &&
              ((g = (i - h) / (r - h)),
              (m = (i - h) / (s - h)),
              u.push(0),
              u.push(1),
              1 !== m && (u.push(-1), u.push(2), u.push(1), u.push(m)),
              1 !== g && (u.push(-1), u.push(2), u.push(0), u.push(g)))
          : 2 === v
          ? o || r === i
            ? a || s === i
              ? d ||
                h === i ||
                ((f = (i - r) / (h - r)),
                (l = (i - s) / (h - s)),
                u.push(2),
                u.push(-1),
                u.push(0),
                u.push(2),
                u.push(f),
                u.push(-1),
                u.push(1),
                u.push(2),
                u.push(l))
              : ((m = (i - h) / (s - h)),
                (p = (i - r) / (s - r)),
                u.push(1),
                u.push(-1),
                u.push(2),
                u.push(1),
                u.push(m),
                u.push(-1),
                u.push(0),
                u.push(1),
                u.push(p))
            : ((c = (i - s) / (r - s)),
              (g = (i - h) / (r - h)),
              u.push(0),
              u.push(-1),
              u.push(1),
              u.push(0),
              u.push(c),
              u.push(-1),
              u.push(2),
              u.push(0),
              u.push(g))
          : 3 !== v && (u.push(0), u.push(1), u.push(2)),
        u
      );
    },
    B = 32767,
    y = 16383,
    I = [],
    E = [],
    M = [],
    z = new n.Cartographic(),
    A = new n.Cartesian3(),
    N = [],
    V = [],
    H = [],
    D = [],
    R = [],
    T = new n.Cartesian3(),
    O = new s.BoundingSphere(),
    U = new w.OrientedBoundingBox(),
    F = new r.Cartesian2(),
    P = new n.Cartesian3();
  function S() {
    (this.vertexBuffer = void 0),
      (this.index = void 0),
      (this.first = void 0),
      (this.second = void 0),
      (this.ratio = void 0);
  }
  (S.prototype.clone = function (t) {
    return (
      e.defined(t) || (t = new S()),
      (t.uBuffer = this.uBuffer),
      (t.vBuffer = this.vBuffer),
      (t.heightBuffer = this.heightBuffer),
      (t.normalBuffer = this.normalBuffer),
      (t.index = this.index),
      (t.first = this.first),
      (t.second = this.second),
      (t.ratio = this.ratio),
      t
    );
  }),
    (S.prototype.initializeIndexed = function (e, t, i, n, r) {
      (this.uBuffer = e),
        (this.vBuffer = t),
        (this.heightBuffer = i),
        (this.normalBuffer = n),
        (this.index = r),
        (this.first = void 0),
        (this.second = void 0),
        (this.ratio = void 0);
    }),
    (S.prototype.initializeFromClipResult = function (e, t, i) {
      var n = t + 1;
      return (
        -1 !== e[t]
          ? i[e[t]].clone(this)
          : ((this.vertexBuffer = void 0),
            (this.index = void 0),
            (this.first = i[e[n]]),
            ++n,
            (this.second = i[e[n]]),
            ++n,
            (this.ratio = e[n]),
            ++n),
        n
      );
    }),
    (S.prototype.getKey = function () {
      return this.isIndexed()
        ? this.index
        : JSON.stringify({
            first: this.first.getKey(),
            second: this.second.getKey(),
            ratio: this.ratio,
          });
    }),
    (S.prototype.isIndexed = function () {
      return e.defined(this.index);
    }),
    (S.prototype.getH = function (t, n) {
      if (e.defined(this.index)) return this.heightBuffer[this.index];
      var r = this.first.getH(t, n),
        s = this.second.getH(t, n);
      return 0 === n + (r / B) * t || 0 === n + (s / B) * t
        ? 0
        : i.CesiumMath.lerp(this.first.getH(), this.second.getH(), this.ratio);
    }),
    (S.prototype.getU = function () {
      return e.defined(this.index)
        ? this.uBuffer[this.index]
        : i.CesiumMath.lerp(this.first.getU(), this.second.getU(), this.ratio);
    }),
    (S.prototype.getV = function () {
      return e.defined(this.index)
        ? this.vBuffer[this.index]
        : i.CesiumMath.lerp(this.first.getV(), this.second.getV(), this.ratio);
    });
  var k = new r.Cartesian2(),
    q = -1,
    W = [new n.Cartesian3(), new n.Cartesian3()],
    X = [new n.Cartesian3(), new n.Cartesian3()];
  function K(e, t) {
    var i = W[++q],
      r = X[q];
    return (
      (i = l.AttributeCompression.octDecode(
        e.first.getNormalX(),
        e.first.getNormalY(),
        i,
      )),
      (r = l.AttributeCompression.octDecode(
        e.second.getNormalX(),
        e.second.getNormalY(),
        r,
      )),
      (A = n.Cartesian3.lerp(i, r, e.ratio, A)),
      n.Cartesian3.normalize(A, A),
      l.AttributeCompression.octEncode(A, t),
      --q,
      t
    );
  }
  (S.prototype.getNormalX = function () {
    return e.defined(this.index)
      ? this.normalBuffer[2 * this.index]
      : (k = K(this, k)).x;
  }),
    (S.prototype.getNormalY = function () {
      return e.defined(this.index)
        ? this.normalBuffer[2 * this.index + 1]
        : (k = K(this, k)).y;
    });
  var Y = [];
  function L(t, i, n, r, s, h, u, o, a, d, p) {
    if (0 !== u.length) {
      for (var f = 0, l = 0; l < u.length; )
        l = Y[f++].initializeFromClipResult(u, l, o);
      for (var c = 0; c < f; ++c) {
        var g = Y[c];
        if (g.isIndexed())
          (g.newIndex = h[g.index]),
            (g.uBuffer = t),
            (g.vBuffer = i),
            (g.heightBuffer = n),
            a && (g.normalBuffer = r);
        else {
          var m = g.getKey();
          if (e.defined(h[m])) g.newIndex = h[m];
          else {
            var v = t.length;
            t.push(g.getU()),
              i.push(g.getV()),
              n.push(g.getH(d, p)),
              a && (r.push(g.getNormalX()), r.push(g.getNormalY())),
              (g.newIndex = v),
              (h[m] = v);
          }
        }
      }
      3 === f
        ? (s.push(Y[0].newIndex), s.push(Y[1].newIndex), s.push(Y[2].newIndex))
        : 4 === f &&
          (s.push(Y[0].newIndex),
          s.push(Y[1].newIndex),
          s.push(Y[2].newIndex),
          s.push(Y[0].newIndex),
          s.push(Y[2].newIndex),
          s.push(Y[3].newIndex));
    }
  }
  return (
    Y.push(new S()),
    Y.push(new S()),
    Y.push(new S()),
    Y.push(new S()),
    v(function (e, t) {
      var h = e.isEastChild,
        u = e.isNorthChild,
        o = h ? y : 0,
        a = h ? B : y,
        d = u ? y : 0,
        p = u ? B : y,
        f = N,
        l = V,
        g = H,
        m = R;
      (f.length = 0), (l.length = 0), (g.length = 0), (m.length = 0);
      var v = D;
      v.length = 0;
      var x = {},
        k = e.vertices,
        q = e.indices;
      q = q.subarray(0, e.indexCountWithoutSkirts);
      var W,
        X,
        K,
        Y,
        _,
        G = C.TerrainEncoding.clone(e.encoding),
        J = G.hasVertexNormals,
        Z = e.exaggeration,
        j = 0,
        Q = e.vertexCountWithoutSkirts,
        $ = e.minimumHeight,
        ee = e.maximumHeight,
        te = new Array(Q),
        ie = new Array(Q),
        ne = new Array(Q),
        re = J ? new Array(2 * Q) : void 0;
      for (K = X = 0; X < Q; ++X, K += 2) {
        var se = G.decodeTextureCoordinates(k, X, F);
        if (
          ((W = G.decodeHeight(k, X) / Z),
          (Y = i.CesiumMath.clamp((se.x * B) | 0, 0, B)),
          (_ = i.CesiumMath.clamp((se.y * B) | 0, 0, B)),
          (ne[X] = i.CesiumMath.clamp((((W - $) / (ee - $)) * B) | 0, 0, B)),
          Y < 20 && (Y = 0),
          _ < 20 && (_ = 0),
          B - Y < 20 && (Y = B),
          B - _ < 20 && (_ = B),
          (te[X] = Y),
          (ie[X] = _),
          J)
        ) {
          var he = G.getOctEncodedNormal(k, X, P);
          (re[K] = he.x), (re[K + 1] = he.y);
        }
        ((h && y <= Y) || (!h && Y <= y)) &&
          ((u && y <= _) || (!u && _ <= y)) &&
          ((x[X] = j),
          f.push(Y),
          l.push(_),
          g.push(ne[X]),
          J && (m.push(re[K]), m.push(re[K + 1])),
          ++j);
      }
      var ue = [];
      ue.push(new S()), ue.push(new S()), ue.push(new S());
      var oe,
        ae = [];
      for (
        ae.push(new S()), ae.push(new S()), ae.push(new S()), X = 0;
        X < q.length;
        X += 3
      ) {
        var de = q[X],
          pe = q[X + 1],
          fe = q[X + 2],
          le = te[de],
          ce = te[pe],
          ge = te[fe];
        ue[0].initializeIndexed(te, ie, ne, re, de),
          ue[1].initializeIndexed(te, ie, ne, re, pe),
          ue[2].initializeIndexed(te, ie, ne, re, fe);
        var me = b(y, h, le, ce, ge, I);
        (oe = 0) >= me.length ||
          (oe = ae[0].initializeFromClipResult(me, oe, ue)) >= me.length ||
          (oe = ae[1].initializeFromClipResult(me, oe, ue)) >= me.length ||
          ((oe = ae[2].initializeFromClipResult(me, oe, ue)),
          L(
            f,
            l,
            g,
            m,
            v,
            x,
            b(y, u, ae[0].getV(), ae[1].getV(), ae[2].getV(), E),
            ae,
            J,
            ee,
            $,
          ),
          oe < me.length &&
            (ae[2].clone(ae[1]),
            ae[2].initializeFromClipResult(me, oe, ue),
            L(
              f,
              l,
              g,
              m,
              v,
              x,
              b(y, u, ae[0].getV(), ae[1].getV(), ae[2].getV(), E),
              ae,
              J,
              ee,
              $,
            )));
      }
      var ve = h ? -B : 0,
        xe = u ? -B : 0,
        we = [],
        Ce = [],
        be = [],
        Be = [],
        ye = Number.MAX_VALUE,
        Ie = -ye,
        Ee = M;
      Ee.length = 0;
      var Me = r.Ellipsoid.clone(e.ellipsoid),
        ze = r.Rectangle.clone(e.childRectangle),
        Ae = ze.north,
        Ne = ze.south,
        Ve = ze.east,
        He = ze.west;
      for (Ve < He && (Ve += i.CesiumMath.TWO_PI), X = 0; X < f.length; ++X)
        (Y =
          (Y = Math.round(f[X])) <= o
            ? (we.push(X), 0)
            : a <= Y
            ? (be.push(X), B)
            : 2 * Y + ve),
          (f[X] = Y),
          (_ =
            (_ = Math.round(l[X])) <= d
              ? (Ce.push(X), 0)
              : p <= _
              ? (Be.push(X), B)
              : 2 * _ + xe),
          (l[X] = _),
          (W = i.CesiumMath.lerp($, ee, g[X] / B)) < ye && (ye = W),
          Ie < W && (Ie = W),
          (g[X] = W),
          (z.longitude = i.CesiumMath.lerp(He, Ve, Y / B)),
          (z.latitude = i.CesiumMath.lerp(Ne, Ae, _ / B)),
          (z.height = W),
          Me.cartographicToCartesian(z, A),
          Ee.push(A.x),
          Ee.push(A.y),
          Ee.push(A.z);
      var De = s.BoundingSphere.fromVertices(Ee, n.Cartesian3.ZERO, 3, O),
        Re = w.OrientedBoundingBox.fromRectangle(ze, ye, Ie, Me, U),
        Te = new C.EllipsoidalOccluder(
          Me,
        ).computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(
          De.center,
          Ee,
          3,
          De.center,
          ye,
          T,
        ),
        Oe = Ie - ye,
        Ue = new Uint16Array(f.length + l.length + g.length);
      for (X = 0; X < f.length; ++X) Ue[X] = f[X];
      var Fe = f.length;
      for (X = 0; X < l.length; ++X) Ue[Fe + X] = l[X];
      for (Fe += l.length, X = 0; X < g.length; ++X)
        Ue[Fe + X] = (B * (g[X] - ye)) / Oe;
      var Pe,
        Se = c.IndexDatatype.createTypedArray(f.length, v);
      if (J) {
        var ke = new Uint8Array(m);
        t.push(Ue.buffer, Se.buffer, ke.buffer), (Pe = ke.buffer);
      } else t.push(Ue.buffer, Se.buffer);
      return {
        vertices: Ue.buffer,
        encodedNormals: Pe,
        indices: Se.buffer,
        minimumHeight: ye,
        maximumHeight: Ie,
        westIndices: we,
        southIndices: Ce,
        eastIndices: be,
        northIndices: Be,
        boundingSphere: De,
        orientedBoundingBox: Re,
        horizonOcclusionPoint: Te,
      };
    })
  );
});
