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
  './IntersectionTests-dbfba52c',
  './Plane-2bcb9154',
  './WebMercatorProjection-bc9aa7fe',
  './createTaskProcessorWorker',
  './EllipsoidTangentPlane-9c25b2da',
  './OrientedBoundingBox-7b25e901',
  './TerrainEncoding-3dab0ca0',
], function (e, t, i, a, r, n, s, l, o, f, u, d, c, h, m, g, p, w, x, k, y) {
  var b = Object.freeze({ NONE: 0, LERC: 1 }),
    v = {};
  v.DEFAULT_STRUCTURE = Object.freeze({
    heightScale: 1,
    heightOffset: 0,
    elementsPerHeight: 1,
    stride: 1,
    elementMultiplier: 256,
    isBigEndian: !1,
  });
  var I = new a.Cartesian3(),
    U = new n.Matrix4(),
    T = new a.Cartesian3(),
    M = new a.Cartesian3();
  v.computeVertices = function (s) {
    if (!e.defined(s) || !e.defined(s.heightmap))
      throw new t.DeveloperError('options.heightmap is required.');
    if (!e.defined(s.width) || !e.defined(s.height))
      throw new t.DeveloperError(
        'options.width and options.height are required.',
      );
    if (!e.defined(s.nativeRectangle))
      throw new t.DeveloperError('options.nativeRectangle is required.');
    if (!e.defined(s.skirtHeight))
      throw new t.DeveloperError('options.skirtHeight is required.');
    var l,
      o,
      f,
      u,
      c = Math.cos,
      h = Math.sin,
      m = Math.sqrt,
      g = Math.atan,
      w = Math.exp,
      b = i.CesiumMath.PI_OVER_TWO,
      V = i.CesiumMath.toRadians,
      A = s.heightmap,
      D = s.width,
      B = s.height,
      S = s.skirtHeight,
      P = e.defaultValue(s.isGeographic, !0),
      E = e.defaultValue(s.ellipsoid, r.Ellipsoid.WGS84),
      C = 1 / E.maximumRadius,
      F = s.nativeRectangle,
      L = s.rectangle;
    u = e.defined(L)
      ? ((l = L.west), (o = L.south), (f = L.east), L.north)
      : P
      ? ((l = V(F.west)), (o = V(F.south)), (f = V(F.east)), V(F.north))
      : ((l = F.west * C),
        (o = b - 2 * g(w(-F.south * C))),
        (f = F.east * C),
        b - 2 * g(w(-F.north * C)));
    var O = s.relativeToCenter,
      N = e.defined(O);
    O = N ? O : a.Cartesian3.ZERO;
    var R = e.defaultValue(s.exaggeration, 1),
      z = e.defaultValue(s.includeWebMercatorT, !1),
      H = e.defaultValue(s.structure, v.DEFAULT_STRUCTURE),
      _ = e.defaultValue(H.heightScale, v.DEFAULT_STRUCTURE.heightScale),
      Y = e.defaultValue(H.heightOffset, v.DEFAULT_STRUCTURE.heightOffset),
      W = e.defaultValue(
        H.elementsPerHeight,
        v.DEFAULT_STRUCTURE.elementsPerHeight,
      ),
      X = e.defaultValue(H.stride, v.DEFAULT_STRUCTURE.stride),
      Z = e.defaultValue(
        H.elementMultiplier,
        v.DEFAULT_STRUCTURE.elementMultiplier,
      ),
      j = e.defaultValue(H.isBigEndian, v.DEFAULT_STRUCTURE.isBigEndian),
      q = r.Rectangle.computeWidth(F),
      G = r.Rectangle.computeHeight(F),
      Q = q / (D - 1),
      J = G / (B - 1);
    P || ((q *= C), (G *= C));
    var K,
      $,
      ee = E.radiiSquared,
      te = ee.x,
      ie = ee.y,
      ae = ee.z,
      re = 65536,
      ne = -65536,
      se = d.Transforms.eastNorthUpToFixedFrame(O, E),
      le = n.Matrix4.inverseTransformation(se, U);
    z &&
      ((K = p.WebMercatorProjection.geodeticLatitudeToMercatorAngle(o)),
      ($ =
        1 / (p.WebMercatorProjection.geodeticLatitudeToMercatorAngle(u) - K)));
    var oe = T;
    (oe.x = Number.POSITIVE_INFINITY),
      (oe.y = Number.POSITIVE_INFINITY),
      (oe.z = Number.POSITIVE_INFINITY);
    var fe = M;
    (fe.x = Number.NEGATIVE_INFINITY),
      (fe.y = Number.NEGATIVE_INFINITY),
      (fe.z = Number.NEGATIVE_INFINITY);
    var ue = Number.POSITIVE_INFINITY,
      de = D * B,
      ce = de + (0 < S ? 2 * D + 2 * B : 0),
      he = new Array(ce),
      me = new Array(ce),
      ge = new Array(ce),
      pe = z ? new Array(ce) : [],
      we = 0,
      xe = B,
      ke = 0,
      ye = D;
    0 < S && (--we, ++xe, --ke, ++ye);
    for (var be = we; be < xe; ++be) {
      var ve = be;
      ve < 0 && (ve = 0), B <= ve && (ve = B - 1);
      var Ie = F.north - J * ve,
        Ue = ((Ie = P ? V(Ie) : b - 2 * g(w(-Ie * C))) - o) / (u - o);
      Ue = i.CesiumMath.clamp(Ue, 0, 1);
      var Te = be === we,
        Me = be === xe - 1;
      0 < S && (Te ? (Ie += 1e-5 * G) : Me && (Ie -= 1e-5 * G));
      var Ve,
        Ae = c(Ie),
        De = h(Ie),
        Be = ae * De;
      z &&
        (Ve =
          (p.WebMercatorProjection.geodeticLatitudeToMercatorAngle(Ie) - K) *
          $);
      for (var Se = ke; Se < ye; ++Se) {
        var Pe = Se;
        Pe < 0 && (Pe = 0), D <= Pe && (Pe = D - 1);
        var Ee,
          Ce,
          Fe = ve * (D * X) + Pe * X;
        if (1 === W) Ee = A[Fe];
        else if (((Ee = 0), j))
          for (Ce = 0; Ce < W; ++Ce) Ee = Ee * Z + A[Fe + Ce];
        else for (Ce = W - 1; 0 <= Ce; --Ce) Ee = Ee * Z + A[Fe + Ce];
        (Ee = (Ee * _ + Y) * R),
          (ne = Math.max(ne, Ee)),
          (re = Math.min(re, Ee));
        var Le = F.west + Q * Pe;
        P ? (Le = V(Le)) : (Le *= C);
        var Oe = (Le - l) / (f - l);
        Oe = i.CesiumMath.clamp(Oe, 0, 1);
        var Ne = ve * D + Pe;
        if (0 < S) {
          var Re = Se === ke,
            ze = Se === ye - 1,
            He = Te || Me || Re || ze;
          if ((Te || Me) && (Re || ze)) continue;
          He &&
            ((Ee -= S),
            Re
              ? ((Ne = de + (B - ve - 1)), (Le -= 1e-5 * q))
              : Me
              ? (Ne = de + B + (D - Pe - 1))
              : ze
              ? ((Ne = de + B + D + ve), (Le += 1e-5 * q))
              : Te && (Ne = de + B + D + B + Pe));
        }
        var _e = Ae * c(Le),
          Ye = Ae * h(Le),
          We = te * _e,
          Xe = ie * Ye,
          Ze = 1 / m(We * _e + Xe * Ye + Be * De),
          je = We * Ze,
          qe = Xe * Ze,
          Ge = Be * Ze,
          Qe = new a.Cartesian3();
        (Qe.x = je + _e * Ee),
          (Qe.y = qe + Ye * Ee),
          (Qe.z = Ge + De * Ee),
          (he[Ne] = Qe),
          (me[Ne] = Ee),
          (ge[Ne] = new r.Cartesian2(Oe, Ue)),
          z && (pe[Ne] = Ve),
          n.Matrix4.multiplyByPoint(le, Qe, I),
          a.Cartesian3.minimumByComponent(I, oe, oe),
          a.Cartesian3.maximumByComponent(I, fe, fe),
          (ue = Math.min(ue, Ee));
      }
    }
    var Je,
      Ke,
      $e = n.BoundingSphere.fromPoints(he);
    e.defined(L) && (Je = k.OrientedBoundingBox.fromRectangle(L, re, ne, E)),
      N &&
        (Ke = new y.EllipsoidalOccluder(
          E,
        ).computeHorizonCullingPointPossiblyUnderEllipsoid(O, he, re));
    for (
      var et = new x.AxisAlignedBoundingBox(oe, fe, O),
        tt = new y.TerrainEncoding(et, ue, ne, se, !1, z),
        it = new Float32Array(ce * tt.getStride()),
        at = 0,
        rt = 0;
      rt < ce;
      ++rt
    )
      at = tt.encode(it, at, he[rt], ge[rt], me[rt], void 0, pe[rt]);
    return {
      vertices: it,
      maximumHeight: ne,
      minimumHeight: re,
      encoding: tt,
      boundingSphere3D: $e,
      orientedBoundingBox: Je,
      occludeePointInScaledSpace: Ke,
    };
  };
  var V,
    A,
    D,
    B,
    S,
    P,
    E,
    C,
    F,
    L,
    O,
    N,
    R,
    z,
    H,
    _,
    Y,
    W,
    X,
    Z,
    j = {};
  (V = {
    defaultNoDataValue: -34027999387901484e22,
    decode: function (e, t) {
      var i = (t = t || {}).encodedMaskData || null === t.encodedMaskData,
        a = S(e, t.inputOffset || 0, i),
        r = null !== t.noDataValue ? t.noDataValue : V.defaultNoDataValue,
        n = A(
          a,
          t.pixelType || Float32Array,
          t.encodedMaskData,
          r,
          t.returnMask,
        ),
        s = {
          width: a.width,
          height: a.height,
          pixelData: n.resultPixels,
          minValue: n.minValue,
          maxValue: a.pixels.maxValue,
          noDataValue: r,
        };
      return (
        n.resultMask && (s.maskData = n.resultMask),
        t.returnEncodedMask &&
          a.mask &&
          (s.encodedMaskData = a.mask.bitset ? a.mask.bitset : null),
        t.returnFileInfo &&
          ((s.fileInfo = D(a)),
          t.computeUsedBitDepths && (s.fileInfo.bitDepths = B(a))),
        s
      );
    },
  }),
    (A = function (e, t, i, a, r) {
      var n,
        s,
        l,
        o = 0,
        f = e.pixels.numBlocksX,
        u = e.pixels.numBlocksY,
        d = Math.floor(e.width / f),
        c = Math.floor(e.height / u),
        h = 2 * e.maxZError,
        m = Number.MAX_VALUE;
      (i = i || (e.mask ? e.mask.bitset : null)),
        (s = new t(e.width * e.height)),
        r && i && (l = new Uint8Array(e.width * e.height));
      for (var g, p, w = new Float32Array(d * c), x = 0; x <= u; x++) {
        var k = x !== u ? c : e.height % u;
        if (0 !== k)
          for (var y = 0; y <= f; y++) {
            var b = y !== f ? d : e.width % f;
            if (0 !== b) {
              var v,
                I,
                U,
                T,
                M = x * e.width * c + y * d,
                V = e.width - b,
                A = e.pixels.blocks[o];
              if (
                (A.encoding < 2
                  ? ((v =
                      0 === A.encoding
                        ? A.rawData
                        : (P(
                            A.stuffedData,
                            A.bitsPerPixel,
                            A.numValidPixels,
                            A.offset,
                            h,
                            w,
                            e.pixels.maxValue,
                          ),
                          w)),
                    (I = 0))
                  : (U = 2 === A.encoding ? 0 : A.offset),
                i)
              )
                for (p = 0; p < k; p++) {
                  for (
                    7 & M && ((T = i[M >> 3]), (T <<= 7 & M)), g = 0;
                    g < b;
                    g++
                  )
                    7 & M || (T = i[M >> 3]),
                      (s[M++] =
                        128 & T
                          ? (l && (l[M] = 1),
                            (m = (n = A.encoding < 2 ? v[I++] : U) < m ? n : m),
                            n)
                          : (l && (l[M] = 0), a)),
                      (T <<= 1);
                  M += V;
                }
              else if (A.encoding < 2)
                for (p = 0; p < k; p++) {
                  for (g = 0; g < b; g++)
                    (m = (n = v[I++]) < m ? n : m), (s[M++] = n);
                  M += V;
                }
              else
                for (m = U < m ? U : m, p = 0; p < k; p++) {
                  for (g = 0; g < b; g++) s[M++] = U;
                  M += V;
                }
              if (1 === A.encoding && I !== A.numValidPixels)
                throw 'Block and Mask do not match';
              o++;
            }
          }
      }
      return { resultPixels: s, resultMask: l, minValue: m };
    }),
    (D = function (e) {
      return {
        fileIdentifierString: e.fileIdentifierString,
        fileVersion: e.fileVersion,
        imageType: e.imageType,
        height: e.height,
        width: e.width,
        maxZError: e.maxZError,
        eofOffset: e.eofOffset,
        mask: e.mask
          ? {
              numBlocksX: e.mask.numBlocksX,
              numBlocksY: e.mask.numBlocksY,
              numBytes: e.mask.numBytes,
              maxValue: e.mask.maxValue,
            }
          : null,
        pixels: {
          numBlocksX: e.pixels.numBlocksX,
          numBlocksY: e.pixels.numBlocksY,
          numBytes: e.pixels.numBytes,
          maxValue: e.pixels.maxValue,
          noDataValue: e.noDataValue,
        },
      };
    }),
    (B = function (e) {
      for (
        var t = e.pixels.numBlocksX * e.pixels.numBlocksY, i = {}, a = 0;
        a < t;
        a++
      ) {
        var r = e.pixels.blocks[a];
        0 === r.encoding
          ? (i.float32 = !0)
          : 1 === r.encoding
          ? (i[r.bitsPerPixel] = !0)
          : (i[0] = !0);
      }
      return Object.keys(i);
    }),
    (S = function (e, t, i) {
      var a = {},
        r = new Uint8Array(e, t, 10);
      if (
        ((a.fileIdentifierString = String.fromCharCode.apply(null, r)),
        'CntZImage' !== a.fileIdentifierString.trim())
      )
        throw 'Unexpected file identifier string: ' + a.fileIdentifierString;
      t += 10;
      var n = new DataView(e, t, 24);
      if (
        ((a.fileVersion = n.getInt32(0, !0)),
        (a.imageType = n.getInt32(4, !0)),
        (a.height = n.getUint32(8, !0)),
        (a.width = n.getUint32(12, !0)),
        (a.maxZError = n.getFloat64(16, !0)),
        (t += 24),
        !i)
      )
        if (
          ((n = new DataView(e, t, 16)),
          (a.mask = {}),
          (a.mask.numBlocksY = n.getUint32(0, !0)),
          (a.mask.numBlocksX = n.getUint32(4, !0)),
          (a.mask.numBytes = n.getUint32(8, !0)),
          (a.mask.maxValue = n.getFloat32(12, !0)),
          (t += 16),
          0 < a.mask.numBytes)
        ) {
          var s = new Uint8Array(Math.ceil((a.width * a.height) / 8)),
            l = (n = new DataView(e, t, a.mask.numBytes)).getInt16(0, !0),
            o = 2,
            f = 0;
          do {
            if (0 < l) for (; l--; ) s[f++] = n.getUint8(o++);
            else {
              var u = n.getUint8(o++);
              for (l = -l; l--; ) s[f++] = u;
            }
            (l = n.getInt16(o, !0)), (o += 2);
          } while (o < a.mask.numBytes);
          if (-32768 !== l || f < s.length)
            throw 'Unexpected end of mask RLE encoding';
          (a.mask.bitset = s), (t += a.mask.numBytes);
        } else
          0 == (a.mask.numBytes | a.mask.numBlocksY | a.mask.maxValue) &&
            (a.mask.bitset = new Uint8Array(
              Math.ceil((a.width * a.height) / 8),
            ));
      (n = new DataView(e, t, 16)),
        (a.pixels = {}),
        (a.pixels.numBlocksY = n.getUint32(0, !0)),
        (a.pixels.numBlocksX = n.getUint32(4, !0)),
        (a.pixels.numBytes = n.getUint32(8, !0)),
        (a.pixels.maxValue = n.getFloat32(12, !0)),
        (t += 16);
      var d = a.pixels.numBlocksX,
        c = a.pixels.numBlocksY,
        h = d + (0 < a.width % d ? 1 : 0),
        m = c + (0 < a.height % c ? 1 : 0);
      a.pixels.blocks = new Array(h * m);
      for (var g = 0, p = 0; p < m; p++)
        for (var w = 0; w < h; w++) {
          var x = 0,
            k = e.byteLength - t;
          n = new DataView(e, t, Math.min(10, k));
          var y = {};
          a.pixels.blocks[g++] = y;
          var b = n.getUint8(0);
          if ((x++, (y.encoding = 63 & b), 3 < y.encoding))
            throw 'Invalid block encoding (' + y.encoding + ')';
          if (2 !== y.encoding) {
            if (0 !== b && 2 !== b) {
              if (((b >>= 6), 2 === (y.offsetType = b)))
                (y.offset = n.getInt8(1)), x++;
              else if (1 === b) (y.offset = n.getInt16(1, !0)), (x += 2);
              else {
                if (0 !== b) throw 'Invalid block offset type';
                (y.offset = n.getFloat32(1, !0)), (x += 4);
              }
              if (1 === y.encoding)
                if (
                  ((b = n.getUint8(x)),
                  x++,
                  (y.bitsPerPixel = 63 & b),
                  (b >>= 6),
                  2 === (y.numValidPixelsType = b))
                )
                  (y.numValidPixels = n.getUint8(x)), x++;
                else if (1 === b)
                  (y.numValidPixels = n.getUint16(x, !0)), (x += 2);
                else {
                  if (0 !== b) throw 'Invalid valid pixel count type';
                  (y.numValidPixels = n.getUint32(x, !0)), (x += 4);
                }
            }
            var v;
            if (((t += x), 3 !== y.encoding))
              if (0 === y.encoding) {
                var I = (a.pixels.numBytes - 1) / 4;
                if (I !== Math.floor(I))
                  throw 'uncompressed block has invalid length';
                (v = new ArrayBuffer(4 * I)),
                  new Uint8Array(v).set(new Uint8Array(e, t, 4 * I));
                var U = new Float32Array(v);
                (y.rawData = U), (t += 4 * I);
              } else if (1 === y.encoding) {
                var T = Math.ceil((y.numValidPixels * y.bitsPerPixel) / 8),
                  M = Math.ceil(T / 4);
                (v = new ArrayBuffer(4 * M)),
                  new Uint8Array(v).set(new Uint8Array(e, t, T)),
                  (y.stuffedData = new Uint32Array(v)),
                  (t += T);
              }
          } else t++;
        }
      return (a.eofOffset = t), a;
    }),
    (P = function (e, t, i, a, r, n, s) {
      var l,
        o,
        f,
        u = (1 << t) - 1,
        d = 0,
        c = 0,
        h = Math.ceil((s - a) / r),
        m = 4 * e.length - Math.ceil((t * i) / 8);
      for (e[e.length - 1] <<= 8 * m, l = 0; l < i; l++) {
        if ((0 === c && ((f = e[d++]), (c = 32)), t <= c))
          (o = (f >>> (c - t)) & u), (c -= t);
        else {
          var g = t - c;
          (o = ((f & u) << g) & u), (o += (f = e[d++]) >>> (c = 32 - g));
        }
        n[l] = o < h ? a + o * r : s;
      }
      return n;
    }),
    (Y = V),
    (E = function (e, t, i, a, r, n, s, l) {
      var o,
        f,
        u,
        d,
        c,
        h = (1 << i) - 1,
        m = 0,
        g = 0,
        p = 4 * e.length - Math.ceil((i * a) / 8);
      if (((e[e.length - 1] <<= 8 * p), r))
        for (o = 0; o < a; o++)
          0 === g && ((u = e[m++]), (g = 32)),
            i <= g
              ? ((f = (u >>> (g - i)) & h), (g -= i))
              : ((f = ((u & h) << (d = i - g)) & h),
                (f += (u = e[m++]) >>> (g = 32 - d))),
            (t[o] = r[f]);
      else
        for (c = Math.ceil((l - n) / s), o = 0; o < a; o++)
          0 === g && ((u = e[m++]), (g = 32)),
            i <= g
              ? ((f = (u >>> (g - i)) & h), (g -= i))
              : ((f = ((u & h) << (d = i - g)) & h),
                (f += (u = e[m++]) >>> (g = 32 - d))),
            (t[o] = f < c ? n + f * s : l);
    }),
    (C = function (e, t, i, a, r, n) {
      var s,
        l = (1 << t) - 1,
        o = 0,
        f = 0,
        u = 0,
        d = 0,
        c = 0,
        h = [],
        m = 4 * e.length - Math.ceil((t * i) / 8);
      e[e.length - 1] <<= 8 * m;
      var g = Math.ceil((n - a) / r);
      for (f = 0; f < i; f++)
        0 === d && ((s = e[o++]), (d = 32)),
          t <= d
            ? ((c = (s >>> (d - t)) & l), (d -= t))
            : ((c = ((s & l) << (u = t - d)) & l),
              (c += (s = e[o++]) >>> (d = 32 - u))),
          (h[f] = c < g ? a + c * r : n);
      return h.unshift(a), h;
    }),
    (F = function (e, t, i, a, r, n, s, l) {
      var o,
        f,
        u,
        d,
        c = (1 << i) - 1,
        h = 0,
        m = 0,
        g = 0;
      if (r)
        for (o = 0; o < a; o++)
          0 === m && ((u = e[h++]), (m = 32), (g = 0)),
            i <= m
              ? ((f = (u >>> g) & c), (m -= i), (g += i))
              : ((f = (u >>> g) & c),
                (m = 32 - (d = i - m)),
                (f |= ((u = e[h++]) & ((1 << d) - 1)) << (i - d)),
                (g = d)),
            (t[o] = r[f]);
      else {
        var p = Math.ceil((l - n) / s);
        for (o = 0; o < a; o++)
          0 === m && ((u = e[h++]), (m = 32), (g = 0)),
            i <= m
              ? ((f = (u >>> g) & c), (m -= i), (g += i))
              : ((f = (u >>> g) & c),
                (m = 32 - (d = i - m)),
                (f |= ((u = e[h++]) & ((1 << d) - 1)) << (i - d)),
                (g = d)),
            (t[o] = f < p ? n + f * s : l);
      }
      return t;
    }),
    (L = function (e, t, i, a, r, n) {
      var s,
        l = (1 << t) - 1,
        o = 0,
        f = 0,
        u = 0,
        d = 0,
        c = 0,
        h = 0,
        m = [],
        g = Math.ceil((n - a) / r);
      for (f = 0; f < i; f++)
        0 === d && ((s = e[o++]), (d = 32), (h = 0)),
          t <= d
            ? ((c = (s >>> h) & l), (d -= t), (h += t))
            : ((c = (s >>> h) & l),
              (d = 32 - (u = t - d)),
              (c |= ((s = e[o++]) & ((1 << u) - 1)) << (t - u)),
              (h = u)),
          (m[f] = c < g ? a + c * r : n);
      return m.unshift(a), m;
    }),
    (O = function (e, t, i, a) {
      var r,
        n,
        s,
        l,
        o = (1 << i) - 1,
        f = 0,
        u = 0,
        d = 4 * e.length - Math.ceil((i * a) / 8);
      for (e[e.length - 1] <<= 8 * d, r = 0; r < a; r++)
        0 === u && ((s = e[f++]), (u = 32)),
          i <= u
            ? ((n = (s >>> (u - i)) & o), (u -= i))
            : ((n = ((s & o) << (l = i - u)) & o),
              (n += (s = e[f++]) >>> (u = 32 - l))),
          (t[r] = n);
      return t;
    }),
    (N = function (e, t, i, a) {
      var r,
        n,
        s,
        l,
        o = (1 << i) - 1,
        f = 0,
        u = 0,
        d = 0;
      for (r = 0; r < a; r++)
        0 === u && ((s = e[f++]), (u = 32), (d = 0)),
          i <= u
            ? ((n = (s >>> d) & o), (u -= i), (d += i))
            : ((n = (s >>> d) & o),
              (u = 32 - (l = i - u)),
              (n |= ((s = e[f++]) & ((1 << l) - 1)) << (i - l)),
              (d = l)),
          (t[r] = n);
      return t;
    }),
    (R = {
      HUFFMAN_LUT_BITS_MAX: 12,
      computeChecksumFletcher32: function (e) {
        for (
          var t = 65535, i = 65535, a = e.length, r = Math.floor(a / 2), n = 0;
          r;

        ) {
          var s = 359 <= r ? 359 : r;
          for (r -= s; (t += e[n++] << 8), (i += t += e[n++]), --s; );
          (t = (65535 & t) + (t >>> 16)), (i = (65535 & i) + (i >>> 16));
        }
        return (
          1 & a && (i += t += e[n] << 8),
          (((i = (65535 & i) + (i >>> 16)) << 16) |
            (t = (65535 & t) + (t >>> 16))) >>>
            0
        );
      },
      readHeaderInfo: function (e, t) {
        var i = t.ptr,
          a = new Uint8Array(e, i, 6),
          r = {};
        if (
          ((r.fileIdentifierString = String.fromCharCode.apply(null, a)),
          0 !== r.fileIdentifierString.lastIndexOf('Lerc2', 0))
        )
          throw (
            'Unexpected file identifier string (expect Lerc2 ): ' +
            r.fileIdentifierString
          );
        i += 6;
        var n,
          s = new DataView(e, i, 8),
          l = s.getInt32(0, !0);
        if (
          ((i += 4),
          3 <= (r.fileVersion = l) &&
            ((r.checksum = s.getUint32(4, !0)), (i += 4)),
          (s = new DataView(e, i, 12)),
          (r.height = s.getUint32(0, !0)),
          (r.width = s.getUint32(4, !0)),
          (i += 8),
          4 <= l
            ? ((r.numDims = s.getUint32(8, !0)), (i += 4))
            : (r.numDims = 1),
          (s = new DataView(e, i, 40)),
          (r.numValidPixel = s.getUint32(0, !0)),
          (r.microBlockSize = s.getInt32(4, !0)),
          (r.blobSize = s.getInt32(8, !0)),
          (r.imageType = s.getInt32(12, !0)),
          (r.maxZError = s.getFloat64(16, !0)),
          (r.zMin = s.getFloat64(24, !0)),
          (r.zMax = s.getFloat64(32, !0)),
          (i += 40),
          (t.headerInfo = r),
          (t.ptr = i),
          3 <= l &&
            ((n = 4 <= l ? 52 : 48),
            this.computeChecksumFletcher32(
              new Uint8Array(e, i - n, r.blobSize - 14),
            ) !== r.checksum))
        )
          throw 'Checksum failed.';
        return !0;
      },
      checkMinMaxRanges: function (e, t) {
        var i = t.headerInfo,
          a = this.getDataTypeArray(i.imageType),
          r = i.numDims * this.getDataTypeSize(i.imageType),
          n = this.readSubArray(e, t.ptr, a, r),
          s = this.readSubArray(e, t.ptr + r, a, r);
        t.ptr += 2 * r;
        var l,
          o = !0;
        for (l = 0; l < i.numDims; l++)
          if (n[l] !== s[l]) {
            o = !1;
            break;
          }
        return (i.minValues = n), (i.maxValues = s), o;
      },
      readSubArray: function (e, t, i, a) {
        var r;
        if (i === Uint8Array) r = new Uint8Array(e, t, a);
        else {
          var n = new ArrayBuffer(a);
          new Uint8Array(n).set(new Uint8Array(e, t, a)), (r = new i(n));
        }
        return r;
      },
      readMask: function (e, t) {
        var i,
          a,
          r = t.ptr,
          n = t.headerInfo,
          s = n.width * n.height,
          l = n.numValidPixel,
          o = new DataView(e, r, 4),
          f = {};
        if (
          ((f.numBytes = o.getUint32(0, !0)),
          (r += 4),
          (0 === l || s === l) && 0 !== f.numBytes)
        )
          throw 'invalid mask';
        if (0 === l)
          (i = new Uint8Array(Math.ceil(s / 8))),
            (f.bitset = i),
            (a = new Uint8Array(s)),
            (t.pixels.resultMask = a),
            (r += f.numBytes);
        else if (0 < f.numBytes) {
          i = new Uint8Array(Math.ceil(s / 8));
          var u = (o = new DataView(e, r, f.numBytes)).getInt16(0, !0),
            d = 2,
            c = 0,
            h = 0;
          do {
            if (0 < u) for (; u--; ) i[c++] = o.getUint8(d++);
            else for (h = o.getUint8(d++), u = -u; u--; ) i[c++] = h;
            (u = o.getInt16(d, !0)), (d += 2);
          } while (d < f.numBytes);
          if (-32768 !== u || c < i.length)
            throw 'Unexpected end of mask RLE encoding';
          a = new Uint8Array(s);
          var m = 0,
            g = 0;
          for (g = 0; g < s; g++)
            7 & g ? ((m = i[g >> 3]), (m <<= 7 & g)) : (m = i[g >> 3]),
              128 & m && (a[g] = 1);
          (t.pixels.resultMask = a), (f.bitset = i), (r += f.numBytes);
        }
        return (t.ptr = r), (t.mask = f), !0;
      },
      readDataOneSweep: function (e, t, i) {
        var a,
          r = t.ptr,
          n = t.headerInfo,
          s = n.numDims,
          l = n.width * n.height,
          o = n.imageType,
          f = n.numValidPixel * R.getDataTypeSize(o) * s,
          u = t.pixels.resultMask;
        if (i === Uint8Array) a = new Uint8Array(e, r, f);
        else {
          var d = new ArrayBuffer(f);
          new Uint8Array(d).set(new Uint8Array(e, r, f)), (a = new i(d));
        }
        if (a.length === l * s) t.pixels.resultPixels = a;
        else {
          t.pixels.resultPixels = new i(l * s);
          var c = 0,
            h = 0,
            m = 0,
            g = 0;
          if (1 < s)
            for (m = 0; m < s; m++)
              for (g = m * l, h = 0; h < l; h++)
                u[h] && (t.pixels.resultPixels[g + h] = a[c++]);
          else
            for (h = 0; h < l; h++) u[h] && (t.pixels.resultPixels[h] = a[c++]);
        }
        return (r += f), (t.ptr = r), !0;
      },
      readHuffmanTree: function (e, t) {
        var i = this.HUFFMAN_LUT_BITS_MAX,
          a = new DataView(e, t.ptr, 16);
        if (((t.ptr += 16), a.getInt32(0, !0) < 2))
          throw 'unsupported Huffman version';
        var r = a.getInt32(4, !0),
          n = a.getInt32(8, !0),
          s = a.getInt32(12, !0);
        if (s <= n) return !1;
        var l = new Uint32Array(s - n);
        R.decodeBits(e, t, l);
        var o,
          f,
          u,
          d,
          c = [];
        for (o = n; o < s; o++)
          c[(f = o - (o < r ? 0 : r))] = { first: l[o - n], second: null };
        var h = e.byteLength - t.ptr,
          m = Math.ceil(h / 4),
          g = new ArrayBuffer(4 * m);
        new Uint8Array(g).set(new Uint8Array(e, t.ptr, h));
        var p,
          w = new Uint32Array(g),
          x = 0,
          k = 0;
        for (p = w[0], o = n; o < s; o++)
          0 < (d = c[(f = o - (o < r ? 0 : r))].first) &&
            ((c[f].second = (p << x) >>> (32 - d)),
            d <= 32 - x
              ? 32 === (x += d) && ((x = 0), (p = w[++k]))
              : ((x += d - 32), (p = w[++k]), (c[f].second |= p >>> (32 - x))));
        var y,
          b = 0,
          v = new z();
        for (o = 0; o < c.length; o++)
          void 0 !== c[o] && (b = Math.max(b, c[o].first));
        (y = i <= b ? i : b),
          30 <= b && console.log('WARning, large NUM LUT BITS IS ' + b);
        var I,
          U,
          T,
          M,
          V,
          A = [];
        for (o = n; o < s; o++)
          if (0 < (d = c[(f = o - (o < r ? 0 : r))].first))
            if (((I = [d, f]), d <= y))
              for (
                U = c[f].second << (y - d), T = 1 << (y - d), u = 0;
                u < T;
                u++
              )
                A[U | u] = I;
            else
              for (U = c[f].second, V = v, M = d - 1; 0 <= M; M--)
                (V =
                  (U >>> M) & 1
                    ? (V.right || (V.right = new z()), V.right)
                    : (V.left || (V.left = new z()), V.left)),
                  0 !== M || V.val || (V.val = I[1]);
        return {
          decodeLut: A,
          numBitsLUTQick: y,
          numBitsLUT: b,
          tree: v,
          stuffedData: w,
          srcPtr: k,
          bitPos: x,
        };
      },
      readHuffman: function (e, t, i) {
        var a,
          r,
          n,
          s,
          l,
          o,
          f,
          u,
          d,
          c = t.headerInfo,
          h = c.numDims,
          m = t.headerInfo.height,
          g = t.headerInfo.width,
          p = g * m,
          w = this.readHuffmanTree(e, t),
          x = w.decodeLut,
          k = w.tree,
          y = w.stuffedData,
          b = w.srcPtr,
          v = w.bitPos,
          I = w.numBitsLUTQick,
          U = w.numBitsLUT,
          T = 0 === t.headerInfo.imageType ? 128 : 0,
          M = t.pixels.resultMask,
          V = 0;
        0 < v && (b++, (v = 0));
        var A,
          D = y[b],
          B = 1 === t.encodeMode,
          S = new i(p * h),
          P = S;
        for (A = 0; A < c.numDims; A++) {
          if (
            (1 < h && ((P = new i(S.buffer, p * A, p)), (V = 0)),
            t.headerInfo.numValidPixel === g * m)
          )
            for (o = u = 0; o < m; o++)
              for (f = 0; f < g; f++, u++) {
                if (
                  ((r = 0),
                  (l = s = (D << v) >>> (32 - I)),
                  32 - v < I && (l = s |= y[b + 1] >>> (64 - v - I)),
                  x[l])
                )
                  (r = x[l][1]), (v += x[l][0]);
                else
                  for (
                    l = s = (D << v) >>> (32 - U),
                      32 - v < U && (l = s |= y[b + 1] >>> (64 - v - U)),
                      a = k,
                      d = 0;
                    d < U;
                    d++
                  )
                    if (
                      !(a = (s >>> (U - d - 1)) & 1 ? a.right : a.left).left &&
                      !a.right
                    ) {
                      (r = a.val), (v = v + d + 1);
                      break;
                    }
                32 <= v && ((v -= 32), (D = y[++b])),
                  (n = r - T),
                  B
                    ? ((n += 0 < f ? V : 0 < o ? P[u - g] : V),
                      (n &= 255),
                      (V = P[u] = n))
                    : (P[u] = n);
              }
          else
            for (o = u = 0; o < m; o++)
              for (f = 0; f < g; f++, u++)
                if (M[u]) {
                  if (
                    ((r = 0),
                    (l = s = (D << v) >>> (32 - I)),
                    32 - v < I && (l = s |= y[b + 1] >>> (64 - v - I)),
                    x[l])
                  )
                    (r = x[l][1]), (v += x[l][0]);
                  else
                    for (
                      l = s = (D << v) >>> (32 - U),
                        32 - v < U && (l = s |= y[b + 1] >>> (64 - v - U)),
                        a = k,
                        d = 0;
                      d < U;
                      d++
                    )
                      if (
                        !(a = (s >>> (U - d - 1)) & 1 ? a.right : a.left)
                          .left &&
                        !a.right
                      ) {
                        (r = a.val), (v = v + d + 1);
                        break;
                      }
                  32 <= v && ((v -= 32), (D = y[++b])),
                    (n = r - T),
                    B
                      ? (0 < f && M[u - 1]
                          ? (n += V)
                          : 0 < o && M[u - g]
                          ? (n += P[u - g])
                          : (n += V),
                        (n &= 255),
                        (V = P[u] = n))
                      : (P[u] = n);
                }
          t.ptr = t.ptr + 4 * (b + 1) + (0 < v ? 4 : 0);
        }
        t.pixels.resultPixels = S;
      },
      decodeBits: function (e, t, i, a, r) {
        var n = t.headerInfo,
          s = n.fileVersion,
          l = 0,
          o = 5 <= e.byteLength - t.ptr ? 5 : e.byteLength - t.ptr,
          f = new DataView(e, t.ptr, o),
          u = f.getUint8(0);
        l++;
        var d = u >> 6,
          c = 0 === d ? 4 : 3 - d,
          h = 0 < (32 & u),
          m = 31 & u,
          g = 0;
        if (1 === c) (g = f.getUint8(l)), l++;
        else if (2 === c) (g = f.getUint16(l, !0)), (l += 2);
        else {
          if (4 !== c) throw 'Invalid valid pixel count type';
          (g = f.getUint32(l, !0)), (l += 4);
        }
        var p,
          w,
          x,
          k,
          y,
          b,
          v,
          I,
          U,
          T = 2 * n.maxZError,
          M = 1 < n.numDims ? n.maxValues[r] : n.zMax;
        if (h) {
          for (
            t.counter.lut++,
              I = f.getUint8(l),
              l++,
              k = Math.ceil(((I - 1) * m) / 8),
              y = Math.ceil(k / 4),
              w = new ArrayBuffer(4 * y),
              x = new Uint8Array(w),
              t.ptr += l,
              x.set(new Uint8Array(e, t.ptr, k)),
              v = new Uint32Array(w),
              t.ptr += k,
              U = 0;
            (I - 1) >>> U;

          )
            U++;
          (k = Math.ceil((g * U) / 8)),
            (y = Math.ceil(k / 4)),
            (w = new ArrayBuffer(4 * y)),
            (x = new Uint8Array(w)).set(new Uint8Array(e, t.ptr, k)),
            (p = new Uint32Array(w)),
            (t.ptr += k),
            (b = 3 <= s ? L(v, m, I - 1, a, T, M) : C(v, m, I - 1, a, T, M)),
            3 <= s ? F(p, i, U, g, b) : E(p, i, U, g, b);
        } else
          t.counter.bitstuffer++,
            (U = m),
            (t.ptr += l),
            0 < U &&
              ((k = Math.ceil((g * U) / 8)),
              (y = Math.ceil(k / 4)),
              (w = new ArrayBuffer(4 * y)),
              (x = new Uint8Array(w)).set(new Uint8Array(e, t.ptr, k)),
              (p = new Uint32Array(w)),
              (t.ptr += k),
              3 <= s
                ? null === a
                  ? N(p, i, U, g)
                  : F(p, i, U, g, !1, a, T, M)
                : null === a
                ? O(p, i, U, g)
                : E(p, i, U, g, !1, a, T, M));
      },
      readTiles: function (e, t, i) {
        var a = t.headerInfo,
          r = a.width,
          n = a.height,
          s = a.microBlockSize,
          l = a.imageType,
          o = R.getDataTypeSize(l),
          f = Math.ceil(r / s),
          u = Math.ceil(n / s);
        (t.pixels.numBlocksY = u), (t.pixels.numBlocksX = f);
        var d,
          c,
          h,
          m,
          g,
          p,
          w,
          x,
          k = (t.pixels.ptr = 0),
          y = 0,
          b = 0,
          v = 0,
          I = 0,
          U = 0,
          T = 0,
          M = 0,
          V = 0,
          A = 0,
          D = 0,
          B = 0,
          S = 0,
          P = 0,
          E = 0,
          C = new i(s * s),
          F = n % s || s,
          L = r % s || s,
          O = a.numDims,
          N = t.pixels.resultMask,
          z = t.pixels.resultPixels;
        for (b = 0; b < u; b++)
          for (I = b !== u - 1 ? s : F, v = 0; v < f; v++)
            for (
              A = b * r * s + v * s, D = r - (U = v !== f - 1 ? s : L), x = 0;
              x < O;
              x++
            ) {
              if (
                (1 < O &&
                  (z = new i(
                    t.pixels.resultPixels.buffer,
                    r * n * x * o,
                    r * n,
                  )),
                (T = e.byteLength - t.ptr),
                (c = {}),
                (E = 0),
                E++,
                (V =
                  ((M = (d = new DataView(e, t.ptr, Math.min(10, T))).getUint8(
                    0,
                  )) >>
                    6) &
                  255),
                ((M >> 2) & 15) != (((v * s) >> 3) & 15))
              )
                throw 'integrity issue';
              if (3 < (g = 3 & M))
                throw ((t.ptr += E), 'Invalid block encoding (' + g + ')');
              if (2 !== g)
                if (0 === g) {
                  if (
                    (t.counter.uncompressed++,
                    (t.ptr += E),
                    (B = (B = I * U * o) < (S = e.byteLength - t.ptr) ? B : S),
                    (h = new ArrayBuffer(B % o == 0 ? B : B + o - (B % o))),
                    new Uint8Array(h).set(new Uint8Array(e, t.ptr, B)),
                    (m = new i(h)),
                    (P = 0),
                    N)
                  )
                    for (k = 0; k < I; k++) {
                      for (y = 0; y < U; y++) N[A] && (z[A] = m[P++]), A++;
                      A += D;
                    }
                  else
                    for (k = 0; k < I; k++) {
                      for (y = 0; y < U; y++) z[A++] = m[P++];
                      A += D;
                    }
                  t.ptr += P * o;
                } else if (
                  ((p = R.getDataTypeUsed(l, V)),
                  (w = R.getOnePixel(c, E, p, d)),
                  (E += R.getDataTypeSize(p)),
                  3 === g)
                )
                  if (((t.ptr += E), t.counter.constantoffset++, N))
                    for (k = 0; k < I; k++) {
                      for (y = 0; y < U; y++) N[A] && (z[A] = w), A++;
                      A += D;
                    }
                  else
                    for (k = 0; k < I; k++) {
                      for (y = 0; y < U; y++) z[A++] = w;
                      A += D;
                    }
                else if (
                  ((t.ptr += E), R.decodeBits(e, t, C, w, x), (E = 0), N)
                )
                  for (k = 0; k < I; k++) {
                    for (y = 0; y < U; y++) N[A] && (z[A] = C[E++]), A++;
                    A += D;
                  }
                else
                  for (k = 0; k < I; k++) {
                    for (y = 0; y < U; y++) z[A++] = C[E++];
                    A += D;
                  }
              else t.counter.constant++, (t.ptr += E);
            }
      },
      formatFileInfo: function (e) {
        return {
          fileIdentifierString: e.headerInfo.fileIdentifierString,
          fileVersion: e.headerInfo.fileVersion,
          imageType: e.headerInfo.imageType,
          height: e.headerInfo.height,
          width: e.headerInfo.width,
          numValidPixel: e.headerInfo.numValidPixel,
          microBlockSize: e.headerInfo.microBlockSize,
          blobSize: e.headerInfo.blobSize,
          maxZError: e.headerInfo.maxZError,
          pixelType: R.getPixelType(e.headerInfo.imageType),
          eofOffset: e.eofOffset,
          mask: e.mask ? { numBytes: e.mask.numBytes } : null,
          pixels: {
            numBlocksX: e.pixels.numBlocksX,
            numBlocksY: e.pixels.numBlocksY,
            maxValue: e.headerInfo.zMax,
            minValue: e.headerInfo.zMin,
            noDataValue: e.noDataValue,
          },
        };
      },
      constructConstantSurface: function (e) {
        var t = e.headerInfo.zMax,
          i = e.headerInfo.numDims,
          a = e.headerInfo.height * e.headerInfo.width,
          r = a * i,
          n = 0,
          s = 0,
          l = 0,
          o = e.pixels.resultMask;
        if (o)
          if (1 < i)
            for (n = 0; n < i; n++)
              for (l = n * a, s = 0; s < a; s++)
                o[s] && (e.pixels.resultPixels[l + s] = t);
          else for (s = 0; s < a; s++) o[s] && (e.pixels.resultPixels[s] = t);
        else if (e.pixels.resultPixels.fill) e.pixels.resultPixels.fill(t);
        else for (s = 0; s < r; s++) e.pixels.resultPixels[s] = t;
      },
      getDataTypeArray: function (e) {
        var t;
        switch (e) {
          case 0:
            t = Int8Array;
            break;
          case 1:
            t = Uint8Array;
            break;
          case 2:
            t = Int16Array;
            break;
          case 3:
            t = Uint16Array;
            break;
          case 4:
            t = Int32Array;
            break;
          case 5:
            t = Uint32Array;
            break;
          default:
            t = Float32Array;
            break;
          case 7:
            t = Float64Array;
        }
        return t;
      },
      getPixelType: function (e) {
        var t;
        switch (e) {
          case 0:
            t = 'S8';
            break;
          case 1:
            t = 'U8';
            break;
          case 2:
            t = 'S16';
            break;
          case 3:
            t = 'U16';
            break;
          case 4:
            t = 'S32';
            break;
          case 5:
            t = 'U32';
            break;
          default:
            t = 'F32';
            break;
          case 7:
            t = 'F64';
        }
        return t;
      },
      isValidPixelValue: function (e, t) {
        if (null === t) return !1;
        var i;
        switch (e) {
          case 0:
            i = -128 <= t && t <= 127;
            break;
          case 1:
            i = 0 <= t && t <= 255;
            break;
          case 2:
            i = -32768 <= t && t <= 32767;
            break;
          case 3:
            i = 0 <= t && t <= 65536;
            break;
          case 4:
            i = -2147483648 <= t && t <= 2147483647;
            break;
          case 5:
            i = 0 <= t && t <= 4294967296;
            break;
          case 6:
            i = -34027999387901484e22 <= t && t <= 34027999387901484e22;
            break;
          case 7:
            i = 5e-324 <= t && t <= 17976931348623157e292;
            break;
          default:
            i = !1;
        }
        return i;
      },
      getDataTypeSize: function (e) {
        var t = 0;
        switch (e) {
          case 0:
          case 1:
            t = 1;
            break;
          case 2:
          case 3:
            t = 2;
            break;
          case 4:
          case 5:
          case 6:
            t = 4;
            break;
          case 7:
            t = 8;
            break;
          default:
            t = e;
        }
        return t;
      },
      getDataTypeUsed: function (e, t) {
        var i = e;
        switch (e) {
          case 2:
          case 4:
            i = e - t;
            break;
          case 3:
          case 5:
            i = e - 2 * t;
            break;
          case 6:
            i = 0 === t ? e : 1 === t ? 2 : 1;
            break;
          case 7:
            i = 0 === t ? e : e - 2 * t + 1;
            break;
          default:
            i = e;
        }
        return i;
      },
      getOnePixel: function (e, t, i, a) {
        var r = 0;
        switch (i) {
          case 0:
            r = a.getInt8(t);
            break;
          case 1:
            r = a.getUint8(t);
            break;
          case 2:
            r = a.getInt16(t, !0);
            break;
          case 3:
            r = a.getUint16(t, !0);
            break;
          case 4:
            r = a.getInt32(t, !0);
            break;
          case 5:
            r = a.getUInt32(t, !0);
            break;
          case 6:
            r = a.getFloat32(t, !0);
            break;
          case 7:
            r = a.getFloat64(t, !0);
            break;
          default:
            throw 'the decoder does not understand this pixel type';
        }
        return r;
      },
    }),
    (z = function (e, t, i) {
      (this.val = e), (this.left = t), (this.right = i);
    }),
    (W = {
      decode: function (e, t) {
        var i = (t = t || {}).noDataValue,
          a = 0,
          r = {};
        if (
          ((r.ptr = t.inputOffset || 0),
          (r.pixels = {}),
          R.readHeaderInfo(e, r))
        ) {
          var n = r.headerInfo,
            s = n.fileVersion,
            l = R.getDataTypeArray(n.imageType);
          R.readMask(e, r),
            n.numValidPixel === n.width * n.height ||
              r.pixels.resultMask ||
              (r.pixels.resultMask = t.maskData);
          var o,
            f = n.width * n.height;
          if (
            ((r.pixels.resultPixels = new l(f * n.numDims)),
            (r.counter = {
              onesweep: 0,
              uncompressed: 0,
              lut: 0,
              bitstuffer: 0,
              constant: 0,
              constantoffset: 0,
            }),
            0 !== n.numValidPixel)
          )
            if (n.zMax === n.zMin) R.constructConstantSurface(r);
            else if (4 <= s && R.checkMinMaxRanges(e, r))
              R.constructConstantSurface(r);
            else {
              var u = new DataView(e, r.ptr, 2),
                d = u.getUint8(0);
              if ((r.ptr++, d)) R.readDataOneSweep(e, r, l);
              else if (
                1 < s &&
                n.imageType <= 1 &&
                Math.abs(n.maxZError - 0.5) < 1e-5
              ) {
                var c = u.getUint8(1);
                if ((r.ptr++, 2 < (r.encodeMode = c) || (s < 4 && 1 < c)))
                  throw 'Invalid Huffman flag ' + c;
                c ? R.readHuffman(e, r, l) : R.readTiles(e, r, l);
              } else R.readTiles(e, r, l);
            }
          (r.eofOffset = r.ptr),
            t.inputOffset
              ? ((o = r.headerInfo.blobSize + t.inputOffset - r.ptr),
                1 <= Math.abs(o) &&
                  (r.eofOffset = t.inputOffset + r.headerInfo.blobSize))
              : ((o = r.headerInfo.blobSize - r.ptr),
                1 <= Math.abs(o) && (r.eofOffset = r.headerInfo.blobSize));
          var h = {
            width: n.width,
            height: n.height,
            pixelData: r.pixels.resultPixels,
            minValue: n.zMin,
            maxValue: n.zMax,
            validPixelCount: n.numValidPixel,
            dimCount: n.numDims,
            dimStats: { minValues: n.minValues, maxValues: n.maxValues },
            maskData: r.pixels.resultMask,
          };
          if (r.pixels.resultMask && R.isValidPixelValue(n.imageType, i)) {
            var m = r.pixels.resultMask;
            for (a = 0; a < f; a++) m[a] || (h.pixelData[a] = i);
            h.noDataValue = i;
          }
          return (
            (r.noDataValue = i),
            t.returnFileInfo && (h.fileInfo = R.formatFileInfo(r)),
            h
          );
        }
      },
      getBandCount: function (e) {
        for (
          var t = 0, i = 0, a = { ptr: 0, pixels: {} };
          i < e.byteLength - 58;

        )
          R.readHeaderInfo(e, a),
            (i += a.headerInfo.blobSize),
            t++,
            (a.ptr = i);
        return t;
      },
    }),
    (H = new ArrayBuffer(4)),
    (_ = new Uint8Array(H)),
    (X = (new Uint32Array(H)[0] = 1) === _[0]),
    (Z = {
      decode: function (e, t) {
        if (!X) throw 'Big endian system is not supported.';
        var i,
          a,
          r = (t = t || {}).inputOffset || 0,
          n = new Uint8Array(e, r, 10),
          s = String.fromCharCode.apply(null, n);
        if ('CntZImage' === s.trim()) (i = Y), (a = 1);
        else {
          if ('Lerc2' !== s.substring(0, 5))
            throw 'Unexpected file identifier string: ' + s;
          (i = W), (a = 2);
        }
        for (
          var l,
            o,
            f,
            u,
            d,
            c,
            h = 0,
            m = e.byteLength - 10,
            g = [],
            p = {
              width: 0,
              height: 0,
              pixels: [],
              pixelType: t.pixelType,
              mask: null,
              statistics: [],
            };
          r < m;

        ) {
          var w = i.decode(e, {
            inputOffset: r,
            encodedMaskData: l,
            maskData: f,
            returnMask: 0 === h,
            returnEncodedMask: 0 === h,
            returnFileInfo: !0,
            pixelType: t.pixelType || null,
            noDataValue: t.noDataValue || null,
          });
          (r = w.fileInfo.eofOffset),
            0 === h &&
              ((l = w.encodedMaskData),
              (f = w.maskData),
              (p.width = w.width),
              (p.height = w.height),
              (p.dimCount = w.dimCount || 1),
              (p.pixelType = w.pixelType || w.fileInfo.pixelType),
              (p.mask = w.maskData)),
            1 < a &&
              w.fileInfo.mask &&
              0 < w.fileInfo.mask.numBytes &&
              g.push(w.maskData),
            h++,
            p.pixels.push(w.pixelData),
            p.statistics.push({
              minValue: w.minValue,
              maxValue: w.maxValue,
              noDataValue: w.noDataValue,
              dimStats: w.dimStats,
            });
        }
        if (1 < a && 1 < g.length) {
          for (
            c = p.width * p.height,
              p.bandMasks = g,
              (f = new Uint8Array(c)).set(g[0]),
              u = 1;
            u < g.length;
            u++
          )
            for (o = g[u], d = 0; d < c; d++) f[d] = f[d] & o[d];
          p.maskData = f;
        }
        return p;
      },
    }),
    (j.Lerc = Z);
  var q = j.Lerc;
  return w(function (e, t) {
    if (e.encoding === b.LERC) {
      var i;
      try {
        i = q.decode(e.heightmap);
      } catch (e) {
        throw new l.RuntimeError(e);
      }
      if (i.statistics[0].minValue === Number.MAX_VALUE)
        throw new l.RuntimeError('Invalid tile data');
      (e.heightmap = i.pixels[0]), (e.width = i.width), (e.height = i.height);
    }
    (e.ellipsoid = r.Ellipsoid.clone(e.ellipsoid)),
      (e.rectangle = r.Rectangle.clone(e.rectangle));
    var a = v.computeVertices(e),
      n = a.vertices;
    return (
      t.push(n.buffer),
      {
        vertices: n.buffer,
        numberOfAttributes: a.encoding.getStride(),
        minimumHeight: a.minimumHeight,
        maximumHeight: a.maximumHeight,
        gridWidth: e.width,
        gridHeight: e.height,
        boundingSphere3D: a.boundingSphere3D,
        orientedBoundingBox: a.orientedBoundingBox,
        occludeePointInScaledSpace: a.occludeePointInScaledSpace,
        encoding: a.encoding,
        westIndicesSouthToNorth: a.westIndicesSouthToNorth,
        southIndicesEastToWest: a.southIndicesEastToWest,
        eastIndicesNorthToSouth: a.eastIndicesNorthToSouth,
        northIndicesWestToEast: a.northIndicesWestToEast,
      }
    );
  });
});
