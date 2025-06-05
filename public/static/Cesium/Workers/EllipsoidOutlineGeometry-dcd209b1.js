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
], function (e, i, t, r, a, o, n, s, u, m, f, d, l, c) {
  var p = new a.Cartesian3(1, 1, 1),
    C = Math.cos,
    h = Math.sin;
  function _(e) {
    e = i.defaultValue(e, i.defaultValue.EMPTY_OBJECT);
    var o = i.defaultValue(e.radii, p),
      n = i.defaultValue(e.innerRadii, o),
      s = i.defaultValue(e.minimumClock, 0),
      u = i.defaultValue(e.maximumClock, r.CesiumMath.TWO_PI),
      m = i.defaultValue(e.minimumCone, 0),
      f = i.defaultValue(e.maximumCone, r.CesiumMath.PI),
      d = Math.round(i.defaultValue(e.stackPartitions, 10)),
      l = Math.round(i.defaultValue(e.slicePartitions, 8)),
      C = Math.round(i.defaultValue(e.subdivisions, 128));
    if (d < 1)
      throw new t.DeveloperError(
        'options.stackPartitions cannot be less than 1',
      );
    if (l < 0)
      throw new t.DeveloperError(
        'options.slicePartitions cannot be less than 0',
      );
    if (C < 0)
      throw new t.DeveloperError(
        'options.subdivisions must be greater than or equal to zero.',
      );
    if (
      i.defined(e.offsetAttribute) &&
      e.offsetAttribute === c.GeometryOffsetAttribute.TOP
    )
      throw new t.DeveloperError(
        'GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.',
      );
    (this._radii = a.Cartesian3.clone(o)),
      (this._innerRadii = a.Cartesian3.clone(n)),
      (this._minimumClock = s),
      (this._maximumClock = u),
      (this._minimumCone = m),
      (this._maximumCone = f),
      (this._stackPartitions = d),
      (this._slicePartitions = l),
      (this._subdivisions = C),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = 'createEllipsoidOutlineGeometry');
  }
  (_.packedLength = 2 * a.Cartesian3.packedLength + 8),
    (_.pack = function (e, r, o) {
      if (!i.defined(e)) throw new t.DeveloperError('value is required');
      if (!i.defined(r)) throw new t.DeveloperError('array is required');
      return (
        (o = i.defaultValue(o, 0)),
        a.Cartesian3.pack(e._radii, r, o),
        (o += a.Cartesian3.packedLength),
        a.Cartesian3.pack(e._innerRadii, r, o),
        (o += a.Cartesian3.packedLength),
        (r[o++] = e._minimumClock),
        (r[o++] = e._maximumClock),
        (r[o++] = e._minimumCone),
        (r[o++] = e._maximumCone),
        (r[o++] = e._stackPartitions),
        (r[o++] = e._slicePartitions),
        (r[o++] = e._subdivisions),
        (r[o] = i.defaultValue(e._offsetAttribute, -1)),
        r
      );
    });
  var v = new a.Cartesian3(),
    b = new a.Cartesian3(),
    y = {
      radii: v,
      innerRadii: b,
      minimumClock: void 0,
      maximumClock: void 0,
      minimumCone: void 0,
      maximumCone: void 0,
      stackPartitions: void 0,
      slicePartitions: void 0,
      subdivisions: void 0,
      offsetAttribute: void 0,
    };
  (_.unpack = function (e, r, o) {
    if (!i.defined(e)) throw new t.DeveloperError('array is required');
    r = i.defaultValue(r, 0);
    var n = a.Cartesian3.unpack(e, r, v);
    r += a.Cartesian3.packedLength;
    var s = a.Cartesian3.unpack(e, r, b);
    r += a.Cartesian3.packedLength;
    var u = e[r++],
      m = e[r++],
      f = e[r++],
      d = e[r++],
      l = e[r++],
      c = e[r++],
      p = e[r++],
      C = e[r];
    return i.defined(o)
      ? ((o._radii = a.Cartesian3.clone(n, o._radii)),
        (o._innerRadii = a.Cartesian3.clone(s, o._innerRadii)),
        (o._minimumClock = u),
        (o._maximumClock = m),
        (o._minimumCone = f),
        (o._maximumCone = d),
        (o._stackPartitions = l),
        (o._slicePartitions = c),
        (o._subdivisions = p),
        (o._offsetAttribute = -1 === C ? void 0 : C),
        o)
      : ((y.minimumClock = u),
        (y.maximumClock = m),
        (y.minimumCone = f),
        (y.maximumCone = d),
        (y.stackPartitions = l),
        (y.slicePartitions = c),
        (y.subdivisions = p),
        (y.offsetAttribute = -1 === C ? void 0 : C),
        new _(y));
  }),
    (_.createGeometry = function (e) {
      var t = e._radii;
      if (!(t.x <= 0 || t.y <= 0 || t.z <= 0)) {
        var a = e._innerRadii;
        if (!(a.x <= 0 || a.y <= 0 || a.z <= 0)) {
          var p = e._minimumClock,
            _ = e._maximumClock,
            v = e._minimumCone,
            b = e._maximumCone,
            y = e._subdivisions,
            k = o.Ellipsoid.fromCartesian3(t),
            A = e._slicePartitions + 1,
            w = e._stackPartitions + 1;
          (A = Math.round((A * Math.abs(_ - p)) / r.CesiumMath.TWO_PI)) < 2 &&
            (A = 2),
            (w = Math.round((w * Math.abs(b - v)) / r.CesiumMath.PI)) < 2 &&
              (w = 2);
          var P = 0,
            x = 1,
            E = a.x !== t.x || a.y !== t.y || a.z !== t.z,
            g = !1,
            D = !1;
          E &&
            ((x = 2),
            0 < v && ((g = !0), (P += A)),
            b < Math.PI && ((D = !0), (P += A)));
          var M,
            G,
            O,
            V,
            T = y * x * (w + A),
            z = new Float64Array(3 * T),
            I = 2 * (T + P - (A + w) * x),
            L = d.IndexDatatype.createTypedArray(T, I),
            R = 0,
            N = new Array(w),
            B = new Array(w);
          for (M = 0; M < w; M++)
            (V = v + (M * (b - v)) / (w - 1)), (N[M] = h(V)), (B[M] = C(V));
          var S = new Array(y),
            q = new Array(y);
          for (M = 0; M < y; M++)
            (O = p + (M * (_ - p)) / (y - 1)), (S[M] = h(O)), (q[M] = C(O));
          for (M = 0; M < w; M++)
            for (G = 0; G < y; G++)
              (z[R++] = t.x * N[M] * q[G]),
                (z[R++] = t.y * N[M] * S[G]),
                (z[R++] = t.z * B[M]);
          if (E)
            for (M = 0; M < w; M++)
              for (G = 0; G < y; G++)
                (z[R++] = a.x * N[M] * q[G]),
                  (z[R++] = a.y * N[M] * S[G]),
                  (z[R++] = a.z * B[M]);
          for (N.length = y, B.length = y, M = 0; M < y; M++)
            (V = v + (M * (b - v)) / (y - 1)), (N[M] = h(V)), (B[M] = C(V));
          for (S.length = A, q.length = A, M = 0; M < A; M++)
            (O = p + (M * (_ - p)) / (A - 1)), (S[M] = h(O)), (q[M] = C(O));
          for (M = 0; M < y; M++)
            for (G = 0; G < A; G++)
              (z[R++] = t.x * N[M] * q[G]),
                (z[R++] = t.y * N[M] * S[G]),
                (z[R++] = t.z * B[M]);
          if (E)
            for (M = 0; M < y; M++)
              for (G = 0; G < A; G++)
                (z[R++] = a.x * N[M] * q[G]),
                  (z[R++] = a.y * N[M] * S[G]),
                  (z[R++] = a.z * B[M]);
          for (M = R = 0; M < w * x; M++) {
            var F = M * y;
            for (G = 0; G < y - 1; G++) (L[R++] = F + G), (L[R++] = F + G + 1);
          }
          var U = w * y * x;
          for (M = 0; M < A; M++)
            for (G = 0; G < y - 1; G++)
              (L[R++] = U + M + G * A), (L[R++] = U + M + (G + 1) * A);
          if (E)
            for (U = w * y * x + A * y, M = 0; M < A; M++)
              for (G = 0; G < y - 1; G++)
                (L[R++] = U + M + G * A), (L[R++] = U + M + (G + 1) * A);
          if (E) {
            var W = w * y * x,
              Y = W + y * A;
            if (g) for (M = 0; M < A; M++) (L[R++] = W + M), (L[R++] = Y + M);
            if (D)
              for (W += y * A - A, Y += y * A - A, M = 0; M < A; M++)
                (L[R++] = W + M), (L[R++] = Y + M);
          }
          var J = new f.GeometryAttributes({
            position: new u.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: z,
            }),
          });
          if (i.defined(e._offsetAttribute)) {
            var j = z.length,
              H = new Uint8Array(j / 3),
              K = e._offsetAttribute === c.GeometryOffsetAttribute.NONE ? 0 : 1;
            l.arrayFill(H, K),
              (J.applyOffset = new u.GeometryAttribute({
                componentDatatype: s.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: H,
              }));
          }
          return new u.Geometry({
            attributes: J,
            indices: L,
            primitiveType: m.PrimitiveType.LINES,
            boundingSphere: n.BoundingSphere.fromEllipsoid(k),
            offsetAttribute: e._offsetAttribute,
          });
        }
      }
    }),
    (e.EllipsoidOutlineGeometry = _);
});
