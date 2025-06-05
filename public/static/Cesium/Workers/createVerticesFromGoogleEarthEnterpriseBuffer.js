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
], function (e, t, i, a, r, n, o, s, u, h, c, d, l, g, m, p, v, I, E, f, C) {
  var T = Uint16Array.BYTES_PER_ELEMENT,
    M = Int32Array.BYTES_PER_ELEMENT,
    b = Uint32Array.BYTES_PER_ELEMENT,
    N = Float32Array.BYTES_PER_ELEMENT,
    x = Float64Array.BYTES_PER_ELEMENT;
  function S(t, a, r) {
    r = e.defaultValue(r, i.CesiumMath);
    for (var n = t.length, o = 0; o < n; ++o)
      if (r.equalsEpsilon(t[o], a, i.CesiumMath.EPSILON12)) return o;
    return -1;
  }
  var w = new a.Cartographic(),
    P = new a.Cartesian3(),
    B = new a.Cartesian3(),
    y = new a.Cartesian3(),
    A = new n.Matrix4();
  function R(t, o, s, u, h, c, d, l, g, m) {
    for (var p = d.length, v = 0; v < p; ++v) {
      var I = d[v],
        E = I.cartographic,
        f = I.index,
        C = t.length,
        T = E.longitude,
        M = E.latitude;
      M = i.CesiumMath.clamp(
        M,
        -i.CesiumMath.PI_OVER_TWO,
        i.CesiumMath.PI_OVER_TWO,
      );
      var b = E.height - c.skirtHeight;
      (c.hMin = Math.min(c.hMin, b)),
        a.Cartographic.fromRadians(T, M, b, w),
        g && (w.longitude += l),
        g
          ? v === p - 1
            ? (w.latitude += m)
            : 0 === v && (w.latitude -= m)
          : (w.latitude += l);
      var N = c.ellipsoid.cartographicToCartesian(w);
      t.push(N),
        o.push(b),
        s.push(r.Cartesian2.clone(s[f])),
        0 < u.length && u.push(u[f]),
        n.Matrix4.multiplyByPoint(c.toENU, N, P);
      var x = c.minimum,
        S = c.maximum;
      a.Cartesian3.minimumByComponent(P, x, x),
        a.Cartesian3.maximumByComponent(P, S, S);
      var B = c.lastBorderPoint;
      if (e.defined(B)) {
        var y = B.index;
        h.push(y, C - 1, C, C, f, y);
      }
      c.lastBorderPoint = I;
    }
  }
  return I(function (t, o) {
    (t.ellipsoid = r.Ellipsoid.clone(t.ellipsoid)),
      (t.rectangle = r.Rectangle.clone(t.rectangle));
    var u = (function (t, o, u, h, c, l, g, m, p, I) {
        var _, F, W, O, U, Y;
        Y = e.defined(h)
          ? ((_ = h.west),
            (F = h.south),
            (W = h.east),
            (O = h.north),
            (U = h.width),
            h.height)
          : ((_ = i.CesiumMath.toRadians(c.west)),
            (F = i.CesiumMath.toRadians(c.south)),
            (W = i.CesiumMath.toRadians(c.east)),
            (O = i.CesiumMath.toRadians(c.north)),
            (U = i.CesiumMath.toRadians(h.width)),
            i.CesiumMath.toRadians(h.height));
        var k,
          V,
          H = [F, O],
          L = [_, W],
          D = d.Transforms.eastNorthUpToFixedFrame(o, u),
          G = n.Matrix4.inverseTransformation(D, A);
        m &&
          ((k = v.WebMercatorProjection.geodeticLatitudeToMercatorAngle(F)),
          (V =
            1 /
            (v.WebMercatorProjection.geodeticLatitudeToMercatorAngle(O) - k)));
        var j = new DataView(t),
          z = Number.POSITIVE_INFINITY,
          q = Number.NEGATIVE_INFINITY,
          J = B;
        (J.x = Number.POSITIVE_INFINITY),
          (J.y = Number.POSITIVE_INFINITY),
          (J.z = Number.POSITIVE_INFINITY);
        var K = y;
        (K.x = Number.NEGATIVE_INFINITY),
          (K.y = Number.NEGATIVE_INFINITY),
          (K.z = Number.NEGATIVE_INFINITY);
        var Q,
          X,
          Z = 0,
          $ = 0,
          ee = 0;
        for (X = 0; X < 4; ++X) {
          var te = Z;
          (Q = j.getUint32(te, !0)), (te += b);
          var ie = i.CesiumMath.toRadians(180 * j.getFloat64(te, !0));
          (te += x), -1 === S(L, ie) && L.push(ie);
          var ae = i.CesiumMath.toRadians(180 * j.getFloat64(te, !0));
          (te += x), -1 === S(H, ae) && H.push(ae), (te += 2 * x);
          var re = j.getInt32(te, !0);
          (te += M),
            ($ += re),
            (ee += 3 * (re = j.getInt32(te, !0))),
            (Z += Q + b);
        }
        var ne = [],
          oe = [],
          se = new Array($),
          ue = new Array($),
          he = new Array($),
          ce = m ? new Array($) : [],
          de = new Array(ee),
          le = [],
          ge = [],
          me = [],
          pe = [],
          ve = 0,
          Ie = 0;
        for (X = Z = 0; X < 4; ++X) {
          Q = j.getUint32(Z, !0);
          var Ee = (Z += b),
            fe = i.CesiumMath.toRadians(180 * j.getFloat64(Z, !0));
          Z += x;
          var Ce = i.CesiumMath.toRadians(180 * j.getFloat64(Z, !0));
          Z += x;
          var Te = i.CesiumMath.toRadians(180 * j.getFloat64(Z, !0)),
            Me = 0.5 * Te;
          Z += x;
          var be = i.CesiumMath.toRadians(180 * j.getFloat64(Z, !0)),
            Ne = 0.5 * be;
          Z += x;
          var xe = j.getInt32(Z, !0);
          Z += M;
          var Se = j.getInt32(Z, !0);
          (Z += M), (Z += M);
          for (var we = new Array(xe), Pe = 0; Pe < xe; ++Pe) {
            var Be = fe + j.getUint8(Z++) * Te;
            w.longitude = Be;
            var ye = Ce + j.getUint8(Z++) * be;
            w.latitude = ye;
            var Ae = j.getFloat32(Z, !0);
            if (
              ((Z += N),
              0 !== Ae && Ae < I && (Ae *= -Math.pow(2, p)),
              (Ae *= 6371010 * l),
              (w.height = Ae),
              -1 !== S(L, Be) || -1 !== S(H, ye))
            ) {
              var Re = S(ne, w, a.Cartographic);
              if (-1 !== Re) {
                we[Pe] = oe[Re];
                continue;
              }
              ne.push(a.Cartographic.clone(w)), oe.push(ve);
            }
            (we[Pe] = ve),
              Math.abs(Be - _) < Me
                ? le.push({ index: ve, cartographic: a.Cartographic.clone(w) })
                : Math.abs(Be - W) < Me
                ? me.push({ index: ve, cartographic: a.Cartographic.clone(w) })
                : Math.abs(ye - F) < Ne
                ? ge.push({ index: ve, cartographic: a.Cartographic.clone(w) })
                : Math.abs(ye - O) < Ne &&
                  pe.push({ index: ve, cartographic: a.Cartographic.clone(w) }),
              (z = Math.min(Ae, z)),
              (q = Math.max(Ae, q)),
              (he[ve] = Ae);
            var _e = u.cartographicToCartesian(w);
            (se[ve] = _e),
              m &&
                (ce[ve] =
                  (v.WebMercatorProjection.geodeticLatitudeToMercatorAngle(ye) -
                    k) *
                  V),
              n.Matrix4.multiplyByPoint(G, _e, P),
              a.Cartesian3.minimumByComponent(P, J, J),
              a.Cartesian3.maximumByComponent(P, K, K);
            var Fe = (Be - _) / (W - _);
            Fe = i.CesiumMath.clamp(Fe, 0, 1);
            var We = (ye - F) / (O - F);
            (We = i.CesiumMath.clamp(We, 0, 1)),
              (ue[ve] = new r.Cartesian2(Fe, We)),
              ++ve;
          }
          for (var Oe = 3 * Se, Ue = 0; Ue < Oe; ++Ue, ++Ie)
            (de[Ie] = we[j.getUint16(Z, !0)]), (Z += T);
          if (Q !== Z - Ee) throw new s.RuntimeError('Invalid terrain tile.');
        }
        (se.length = ve),
          (ue.length = ve),
          (he.length = ve),
          m && (ce.length = ve);
        var Ye = ve,
          ke = Ie,
          Ve = {
            hMin: z,
            lastBorderPoint: void 0,
            skirtHeight: g,
            toENU: G,
            ellipsoid: u,
            minimum: J,
            maximum: K,
          };
        le.sort(function (e, t) {
          return t.cartographic.latitude - e.cartographic.latitude;
        }),
          ge.sort(function (e, t) {
            return e.cartographic.longitude - t.cartographic.longitude;
          }),
          me.sort(function (e, t) {
            return e.cartographic.latitude - t.cartographic.latitude;
          }),
          pe.sort(function (e, t) {
            return t.cartographic.longitude - e.cartographic.longitude;
          });
        var He = 1e-5;
        if (
          (R(se, he, ue, ce, de, Ve, le, -He * U, !0, -He * Y),
          R(se, he, ue, ce, de, Ve, ge, -He * Y, !1),
          R(se, he, ue, ce, de, Ve, me, He * U, !0, He * Y),
          R(se, he, ue, ce, de, Ve, pe, He * Y, !1),
          0 < le.length && 0 < pe.length)
        ) {
          var Le = le[0].index,
            De = Ye,
            Ge = pe[pe.length - 1].index,
            je = se.length - 1;
          de.push(Ge, je, De, De, Le, Ge);
        }
        $ = se.length;
        var ze,
          qe = n.BoundingSphere.fromPoints(se);
        e.defined(h) && (ze = f.OrientedBoundingBox.fromRectangle(h, z, q, u));
        for (
          var Je = new C.EllipsoidalOccluder(
              u,
            ).computeHorizonCullingPointPossiblyUnderEllipsoid(o, se, z),
            Ke = new E.AxisAlignedBoundingBox(J, K, o),
            Qe = new C.TerrainEncoding(Ke, Ve.hMin, q, D, !1, m),
            Xe = new Float32Array($ * Qe.getStride()),
            Ze = 0,
            $e = 0;
          $e < $;
          ++$e
        )
          Ze = Qe.encode(Xe, Ze, se[$e], ue[$e], he[$e], void 0, ce[$e]);
        var et = le
            .map(function (e) {
              return e.index;
            })
            .reverse(),
          tt = ge
            .map(function (e) {
              return e.index;
            })
            .reverse(),
          it = me
            .map(function (e) {
              return e.index;
            })
            .reverse(),
          at = pe
            .map(function (e) {
              return e.index;
            })
            .reverse();
        return (
          tt.unshift(it[it.length - 1]),
          tt.push(et[0]),
          at.unshift(et[et.length - 1]),
          at.push(it[0]),
          {
            vertices: Xe,
            indices: new Uint16Array(de),
            maximumHeight: q,
            minimumHeight: z,
            encoding: Qe,
            boundingSphere3D: qe,
            orientedBoundingBox: ze,
            occludeePointInScaledSpace: Je,
            vertexCountWithoutSkirts: Ye,
            indexCountWithoutSkirts: ke,
            westIndicesSouthToNorth: et,
            southIndicesEastToWest: tt,
            eastIndicesNorthToSouth: it,
            northIndicesWestToEast: at,
          }
        );
      })(
        t.buffer,
        t.relativeToCenter,
        t.ellipsoid,
        t.rectangle,
        t.nativeRectangle,
        t.exaggeration,
        t.skirtHeight,
        t.includeWebMercatorT,
        t.negativeAltitudeExponentBias,
        t.negativeElevationThreshold,
      ),
      h = u.vertices;
    o.push(h.buffer);
    var c = u.indices;
    return (
      o.push(c.buffer),
      {
        vertices: h.buffer,
        indices: c.buffer,
        numberOfAttributes: u.encoding.getStride(),
        minimumHeight: u.minimumHeight,
        maximumHeight: u.maximumHeight,
        boundingSphere3D: u.boundingSphere3D,
        orientedBoundingBox: u.orientedBoundingBox,
        occludeePointInScaledSpace: u.occludeePointInScaledSpace,
        encoding: u.encoding,
        vertexCountWithoutSkirts: u.vertexCountWithoutSkirts,
        indexCountWithoutSkirts: u.indexCountWithoutSkirts,
        westIndicesSouthToNorth: u.westIndicesSouthToNorth,
        southIndicesEastToWest: u.southIndicesEastToWest,
        eastIndicesNorthToSouth: u.eastIndicesNorthToSouth,
        northIndicesWestToEast: u.northIndicesWestToEast,
      }
    );
  });
});
