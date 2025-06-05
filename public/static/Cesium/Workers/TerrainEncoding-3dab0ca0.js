define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './ComponentDatatype-5862616f',
  './AttributeCompression-75ce15eb',
], function (e, t, i, r, a, n, o, s, c) {
  function m(e, r) {
    i.Check.typeOf.object('ellipsoid', e),
      (this._ellipsoid = e),
      (this._cameraPosition = new a.Cartesian3()),
      (this._cameraPositionInScaledSpace = new a.Cartesian3()),
      (this._distanceToLimbInScaledSpaceSquared = 0),
      t.defined(r) && (this.cameraPosition = r);
  }
  Object.defineProperties(m.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      },
    },
    cameraPosition: {
      get: function () {
        return this._cameraPosition;
      },
      set: function (e) {
        var t = this._ellipsoid.transformPositionToScaledSpace(
            e,
            this._cameraPositionInScaledSpace,
          ),
          i = a.Cartesian3.magnitudeSquared(t) - 1;
        a.Cartesian3.clone(e, this._cameraPosition),
          (this._cameraPositionInScaledSpace = t),
          (this._distanceToLimbInScaledSpaceSquared = i);
      },
    },
  });
  var u = new a.Cartesian3();
  (m.prototype.isPointVisible = function (e) {
    return S(
      this._ellipsoid.transformPositionToScaledSpace(e, u),
      this._cameraPositionInScaledSpace,
      this._distanceToLimbInScaledSpaceSquared,
    );
  }),
    (m.prototype.isScaledSpacePointVisible = function (e) {
      return S(
        e,
        this._cameraPositionInScaledSpace,
        this._distanceToLimbInScaledSpaceSquared,
      );
    });
  var d = new a.Cartesian3();
  (m.prototype.isScaledSpacePointVisiblePossiblyUnderEllipsoid = function (
    e,
    i,
  ) {
    var r,
      a = this._ellipsoid;
    return S(
      e,
      r,
      t.defined(i) && i < 0 && a.minimumRadius > -i
        ? (((r = d).x = this._cameraPosition.x / (a.radii.x + i)),
          (r.y = this._cameraPosition.y / (a.radii.y + i)),
          (r.z = this._cameraPosition.z / (a.radii.z + i)),
          r.x * r.x + r.y * r.y + r.z * r.z - 1)
        : ((r = this._cameraPositionInScaledSpace),
          this._distanceToLimbInScaledSpaceSquared),
    );
  }),
    (m.prototype.computeHorizonCullingPoint = function (e, t, i) {
      return C(this._ellipsoid, e, t, i);
    });
  var l = n.Ellipsoid.clone(n.Ellipsoid.UNIT_SPHERE);
  (m.prototype.computeHorizonCullingPointPossiblyUnderEllipsoid = function (
    e,
    t,
    i,
    r,
  ) {
    return C(f(this._ellipsoid, i, l), e, t, r);
  }),
    (m.prototype.computeHorizonCullingPointFromVertices = function (
      e,
      t,
      i,
      r,
      a,
    ) {
      return y(this._ellipsoid, e, t, i, r, a);
    }),
    (m.prototype.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid =
      function (e, t, i, r, a, n) {
        return y(f(this._ellipsoid, a, l), e, t, i, r, n);
      });
  var p = [];
  m.prototype.computeHorizonCullingPointFromRectangle = function (e, t, r) {
    i.Check.typeOf.object('rectangle', e);
    var s = n.Rectangle.subsample(e, t, 0, p),
      c = o.BoundingSphere.fromPoints(s);
    if (!(a.Cartesian3.magnitude(c.center) < 0.1 * t.minimumRadius))
      return this.computeHorizonCullingPoint(c.center, s, r);
  };
  var h = new a.Cartesian3();
  function f(e, i, r) {
    if (t.defined(i) && i < 0 && e.minimumRadius > -i) {
      var o = a.Cartesian3.fromElements(
        e.radii.x + i,
        e.radii.y + i,
        e.radii.z + i,
        h,
      );
      e = n.Ellipsoid.fromCartesian3(o, r);
    }
    return e;
  }
  function C(e, r, n, o) {
    i.Check.typeOf.object('directionToPoint', r),
      i.Check.defined('positions', n),
      t.defined(o) || (o = new a.Cartesian3());
    for (var s = P(e, r), c = 0, m = 0, u = n.length; m < u; ++m) {
      var d = v(e, n[m], s);
      if (d < 0) return;
      c = Math.max(c, d);
    }
    return M(s, c, o);
  }
  var x = new a.Cartesian3();
  function y(e, r, n, o, s, c) {
    i.Check.typeOf.object('directionToPoint', r),
      i.Check.defined('vertices', n),
      i.Check.typeOf.number('stride', o),
      t.defined(c) || (c = new a.Cartesian3()),
      (o = t.defaultValue(o, 3)),
      (s = t.defaultValue(s, a.Cartesian3.ZERO));
    for (var m = P(e, r), u = 0, d = 0, l = n.length; d < l; d += o) {
      (x.x = n[d] + s.x), (x.y = n[d + 1] + s.y), (x.z = n[d + 2] + s.z);
      var p = v(e, x, m);
      if (p < 0) return;
      u = Math.max(u, p);
    }
    return M(m, u, c);
  }
  function S(e, t, i) {
    var r = t,
      n = i,
      o = a.Cartesian3.subtract(e, r, u),
      s = -a.Cartesian3.dot(o, r);
    return !(n < 0
      ? 0 < s
      : n < s && (s * s) / a.Cartesian3.magnitudeSquared(o) > n);
  }
  var b = new a.Cartesian3(),
    g = new a.Cartesian3();
  function v(e, t, i) {
    var r = e.transformPositionToScaledSpace(t, b),
      n = a.Cartesian3.magnitudeSquared(r),
      o = Math.sqrt(n),
      s = a.Cartesian3.divideByScalar(r, o, g);
    n = Math.max(1, n);
    var c = 1 / (o = Math.max(1, o));
    return (
      1 /
      (a.Cartesian3.dot(s, i) * c -
        a.Cartesian3.magnitude(a.Cartesian3.cross(s, i, s)) *
          (Math.sqrt(n - 1) * c))
    );
  }
  function M(e, t, i) {
    if (!(t <= 0 || t === 1 / 0 || t != t))
      return a.Cartesian3.multiplyByScalar(e, t, i);
  }
  var T = new a.Cartesian3();
  function P(e, t) {
    return a.Cartesian3.equals(t, a.Cartesian3.ZERO)
      ? t
      : (e.transformPositionToScaledSpace(t, T), a.Cartesian3.normalize(T, T));
  }
  var E = Object.freeze({ NONE: 0, BITS12: 1 }),
    z = new a.Cartesian3(),
    N = new a.Cartesian3(),
    I = new n.Cartesian2(),
    B = new o.Matrix4(),
    _ = new o.Matrix4(),
    w = Math.pow(2, 12);
  function A(e, i, r, n, s, c) {
    var m,
      u,
      d,
      l = E.NONE;
    if (t.defined(e) && t.defined(i) && t.defined(r) && t.defined(n)) {
      var p = e.minimum,
        h = e.maximum,
        f = a.Cartesian3.subtract(h, p, N),
        C = r - i;
      (l =
        Math.max(a.Cartesian3.maximumComponent(f), C) < w - 1
          ? E.BITS12
          : E.NONE),
        (l = E.NONE),
        (m = e.center),
        (u = o.Matrix4.inverseTransformation(n, new o.Matrix4()));
      var x = a.Cartesian3.negate(p, z);
      o.Matrix4.multiply(o.Matrix4.fromTranslation(x, B), u, u);
      var y = z;
      (y.x = 1 / f.x),
        (y.y = 1 / f.y),
        (y.z = 1 / f.z),
        o.Matrix4.multiply(o.Matrix4.fromScale(y, B), u, u),
        (d = o.Matrix4.clone(n)),
        o.Matrix4.setTranslation(d, a.Cartesian3.ZERO, d),
        (n = o.Matrix4.clone(n, new o.Matrix4()));
      var S = o.Matrix4.fromTranslation(p, B),
        b = o.Matrix4.fromScale(f, _),
        g = o.Matrix4.multiply(S, b, B);
      o.Matrix4.multiply(n, g, n), o.Matrix4.multiply(d, g, d);
    }
    (this.quantization = l),
      (this.minimumHeight = i),
      (this.maximumHeight = r),
      (this.center = m),
      (this.toScaledENU = u),
      (this.fromScaledENU = n),
      (this.matrix = d),
      (this.hasVertexNormals = s),
      (this.hasWebMercatorT = t.defaultValue(c, !1));
  }
  (A.prototype.encode = function (e, t, i, s, m, u, d) {
    var l = s.x,
      p = s.y;
    if (this.quantization === E.BITS12) {
      ((i = o.Matrix4.multiplyByPoint(this.toScaledENU, i, z)).x =
        r.CesiumMath.clamp(i.x, 0, 1)),
        (i.y = r.CesiumMath.clamp(i.y, 0, 1)),
        (i.z = r.CesiumMath.clamp(i.z, 0, 1));
      var h = this.maximumHeight - this.minimumHeight,
        f = r.CesiumMath.clamp((m - this.minimumHeight) / h, 0, 1);
      n.Cartesian2.fromElements(i.x, i.y, I);
      var C = c.AttributeCompression.compressTextureCoordinates(I);
      n.Cartesian2.fromElements(i.z, f, I);
      var x = c.AttributeCompression.compressTextureCoordinates(I);
      n.Cartesian2.fromElements(l, p, I);
      var y = c.AttributeCompression.compressTextureCoordinates(I);
      if (((e[t++] = C), (e[t++] = x), (e[t++] = y), this.hasWebMercatorT)) {
        n.Cartesian2.fromElements(d, 0, I);
        var S = c.AttributeCompression.compressTextureCoordinates(I);
        e[t++] = S;
      }
    } else
      a.Cartesian3.subtract(i, this.center, z),
        (e[t++] = z.x),
        (e[t++] = z.y),
        (e[t++] = z.z),
        (e[t++] = m),
        (e[t++] = l),
        (e[t++] = p),
        this.hasWebMercatorT && (e[t++] = d);
    return (
      this.hasVertexNormals &&
        (e[t++] = c.AttributeCompression.octPackFloat(u)),
      t
    );
  }),
    (A.prototype.decodePosition = function (e, i, r) {
      if (
        (t.defined(r) || (r = new a.Cartesian3()),
        (i *= this.getStride()),
        this.quantization !== E.BITS12)
      )
        return (
          (r.x = e[i]),
          (r.y = e[i + 1]),
          (r.z = e[i + 2]),
          a.Cartesian3.add(r, this.center, r)
        );
      var n = c.AttributeCompression.decompressTextureCoordinates(e[i], I);
      (r.x = n.x), (r.y = n.y);
      var s = c.AttributeCompression.decompressTextureCoordinates(e[i + 1], I);
      return (r.z = s.x), o.Matrix4.multiplyByPoint(this.fromScaledENU, r, r);
    }),
    (A.prototype.decodeTextureCoordinates = function (e, i, r) {
      return (
        t.defined(r) || (r = new n.Cartesian2()),
        (i *= this.getStride()),
        this.quantization === E.BITS12
          ? c.AttributeCompression.decompressTextureCoordinates(e[i + 2], r)
          : n.Cartesian2.fromElements(e[i + 4], e[i + 5], r)
      );
    }),
    (A.prototype.decodeHeight = function (e, t) {
      return (
        (t *= this.getStride()),
        this.quantization !== E.BITS12
          ? e[t + 3]
          : c.AttributeCompression.decompressTextureCoordinates(e[t + 1], I).y *
              (this.maximumHeight - this.minimumHeight) +
            this.minimumHeight
      );
    }),
    (A.prototype.decodeWebMercatorT = function (e, t) {
      return (
        (t *= this.getStride()),
        this.quantization === E.BITS12
          ? c.AttributeCompression.decompressTextureCoordinates(e[t + 3], I).x
          : e[t + 6]
      );
    }),
    (A.prototype.getOctEncodedNormal = function (e, t, i) {
      var r = e[(t = (t + 1) * this.getStride() - 1)] / 256,
        a = Math.floor(r),
        o = 256 * (r - a);
      return n.Cartesian2.fromElements(a, o, i);
    }),
    (A.prototype.getStride = function () {
      var e;
      if (this.quantization === E.BITS12) e = 3;
      else e = 6;
      return this.hasWebMercatorT && ++e, this.hasVertexNormals && ++e, e;
    });
  var q = { position3DAndHeight: 0, textureCoordAndEncodedNormals: 1 },
    H = { compressed0: 0, compressed1: 1 };
  (A.prototype.getAttributes = function (e) {
    var t,
      i = s.ComponentDatatype.FLOAT,
      r = s.ComponentDatatype.getSizeInBytes(i);
    if (this.quantization === E.NONE) {
      var a = 2;
      return (
        this.hasWebMercatorT && ++a,
        this.hasVertexNormals && ++a,
        [
          {
            index: q.position3DAndHeight,
            vertexBuffer: e,
            componentDatatype: i,
            componentsPerAttribute: 4,
            offsetInBytes: 0,
            strideInBytes: (t = (4 + a) * r),
          },
          {
            index: q.textureCoordAndEncodedNormals,
            vertexBuffer: e,
            componentDatatype: i,
            componentsPerAttribute: a,
            offsetInBytes: 4 * r,
            strideInBytes: t,
          },
        ]
      );
    }
    var n = 3,
      o = 0;
    return (
      (this.hasWebMercatorT || this.hasVertexNormals) && ++n,
      this.hasWebMercatorT && this.hasVertexNormals
        ? [
            {
              index: H.compressed0,
              vertexBuffer: e,
              componentDatatype: i,
              componentsPerAttribute: n,
              offsetInBytes: 0,
              strideInBytes: (t = (n + ++o) * r),
            },
            {
              index: H.compressed1,
              vertexBuffer: e,
              componentDatatype: i,
              componentsPerAttribute: o,
              offsetInBytes: n * r,
              strideInBytes: t,
            },
          ]
        : [
            {
              index: H.compressed0,
              vertexBuffer: e,
              componentDatatype: i,
              componentsPerAttribute: n,
            },
          ]
    );
  }),
    (A.prototype.getAttributeLocations = function () {
      return this.quantization === E.NONE ? q : H;
    }),
    (A.clone = function (e, i) {
      return (
        t.defined(i) || (i = new A()),
        (i.quantization = e.quantization),
        (i.minimumHeight = e.minimumHeight),
        (i.maximumHeight = e.maximumHeight),
        (i.center = a.Cartesian3.clone(e.center)),
        (i.toScaledENU = o.Matrix4.clone(e.toScaledENU)),
        (i.fromScaledENU = o.Matrix4.clone(e.fromScaledENU)),
        (i.matrix = o.Matrix4.clone(e.matrix)),
        (i.hasVertexNormals = e.hasVertexNormals),
        (i.hasWebMercatorT = e.hasWebMercatorT),
        i
      );
    }),
    (e.EllipsoidalOccluder = m),
    (e.TerrainEncoding = A);
});
