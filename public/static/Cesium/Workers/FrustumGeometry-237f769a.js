define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './BoundingSphere-c409f092',
  './Cartesian4-5af5bb24',
  './ComponentDatatype-5862616f',
  './GeometryAttribute-2243653a',
  './PrimitiveType-97893bc7',
  './Transforms-1509c877',
  './GeometryAttributes-aacecde6',
  './Plane-2bcb9154',
  './VertexFormat-fe4db402',
], function (e, t, r, i, a, n, o, s, f, u, h, d, l, p) {
  function c(e) {
    this.planes = t.defaultValue(e, []);
  }
  var m = [new a.Cartesian3(), new a.Cartesian3(), new a.Cartesian3()];
  a.Cartesian3.clone(a.Cartesian3.UNIT_X, m[0]),
    a.Cartesian3.clone(a.Cartesian3.UNIT_Y, m[1]),
    a.Cartesian3.clone(a.Cartesian3.UNIT_Z, m[2]);
  var C = new a.Cartesian3(),
    w = new a.Cartesian3(),
    v = new l.Plane(new a.Cartesian3(1, 0, 0), 0);
  function _(e) {
    (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)),
      (this.left = e.left),
      (this._left = void 0),
      (this.right = e.right),
      (this._right = void 0),
      (this.top = e.top),
      (this._top = void 0),
      (this.bottom = e.bottom),
      (this._bottom = void 0),
      (this.near = t.defaultValue(e.near, 1)),
      (this._near = this.near),
      (this.far = t.defaultValue(e.far, 5e8)),
      (this._far = this.far),
      (this._cullingVolume = new c()),
      (this._orthographicMatrix = new n.Matrix4());
  }
  function y(e) {
    if (
      !(
        t.defined(e.right) &&
        t.defined(e.left) &&
        t.defined(e.top) &&
        t.defined(e.bottom) &&
        t.defined(e.near) &&
        t.defined(e.far)
      )
    )
      throw new r.DeveloperError(
        'right, left, top, bottom, near, or far parameters are not set.',
      );
    if (
      e.top !== e._top ||
      e.bottom !== e._bottom ||
      e.left !== e._left ||
      e.right !== e._right ||
      e.near !== e._near ||
      e.far !== e._far
    ) {
      if (e.left > e.right)
        throw new r.DeveloperError('right must be greater than left.');
      if (e.bottom > e.top)
        throw new r.DeveloperError('top must be greater than bottom.');
      if (e.near <= 0 || e.near > e.far)
        throw new r.DeveloperError(
          'near must be greater than zero and less than far.',
        );
      (e._left = e.left),
        (e._right = e.right),
        (e._top = e.top),
        (e._bottom = e.bottom),
        (e._near = e.near),
        (e._far = e.far),
        (e._orthographicMatrix = n.Matrix4.computeOrthographicOffCenter(
          e.left,
          e.right,
          e.bottom,
          e.top,
          e.near,
          e.far,
          e._orthographicMatrix,
        ));
    }
  }
  (c.fromBoundingSphere = function (e, i) {
    if (!t.defined(e))
      throw new r.DeveloperError('boundingSphere is required.');
    t.defined(i) || (i = new c());
    var n = m.length,
      s = i.planes;
    s.length = 2 * n;
    for (var f = e.center, u = e.radius, h = 0, d = 0; d < n; ++d) {
      var l = m[d],
        p = s[h],
        v = s[h + 1];
      t.defined(p) || (p = s[h] = new o.Cartesian4()),
        t.defined(v) || (v = s[h + 1] = new o.Cartesian4()),
        a.Cartesian3.multiplyByScalar(l, -u, C),
        a.Cartesian3.add(f, C, C),
        (p.x = l.x),
        (p.y = l.y),
        (p.z = l.z),
        (p.w = -a.Cartesian3.dot(l, C)),
        a.Cartesian3.multiplyByScalar(l, u, C),
        a.Cartesian3.add(f, C, C),
        (v.x = -l.x),
        (v.y = -l.y),
        (v.z = -l.z),
        (v.w = -a.Cartesian3.dot(a.Cartesian3.negate(l, w), C)),
        (h += 2);
    }
    return i;
  }),
    (c.prototype.computeVisibility = function (e) {
      if (!t.defined(e))
        throw new r.DeveloperError('boundingVolume is required.');
      for (var i = this.planes, a = !1, o = 0, s = i.length; o < s; ++o) {
        var f = e.intersectPlane(l.Plane.fromCartesian4(i[o], v));
        if (f === n.Intersect.OUTSIDE) return n.Intersect.OUTSIDE;
        f === n.Intersect.INTERSECTING && (a = !0);
      }
      return a ? n.Intersect.INTERSECTING : n.Intersect.INSIDE;
    }),
    (c.prototype.computeVisibilityWithPlaneMask = function (e, i) {
      if (!t.defined(e))
        throw new r.DeveloperError('boundingVolume is required.');
      if (!t.defined(i))
        throw new r.DeveloperError('parentPlaneMask is required.');
      if (i === c.MASK_OUTSIDE || i === c.MASK_INSIDE) return i;
      for (
        var a = c.MASK_INSIDE, o = this.planes, s = 0, f = o.length;
        s < f;
        ++s
      ) {
        var u = s < 31 ? 1 << s : 0;
        if (!(s < 31 && 0 == (i & u))) {
          var h = e.intersectPlane(l.Plane.fromCartesian4(o[s], v));
          if (h === n.Intersect.OUTSIDE) return c.MASK_OUTSIDE;
          h === n.Intersect.INTERSECTING && (a |= u);
        }
      }
      return a;
    }),
    (c.MASK_OUTSIDE = 4294967295),
    (c.MASK_INSIDE = 0),
    (c.MASK_INDETERMINATE = 2147483647),
    Object.defineProperties(_.prototype, {
      projectionMatrix: {
        get: function () {
          return y(this), this._orthographicMatrix;
        },
      },
    });
  var g = new a.Cartesian3(),
    x = new a.Cartesian3(),
    b = new a.Cartesian3(),
    E = new a.Cartesian3();
  function M(e) {
    (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)),
      (this._offCenterFrustum = new _()),
      (this.width = e.width),
      (this._width = void 0),
      (this.aspectRatio = e.aspectRatio),
      (this._aspectRatio = void 0),
      (this.near = t.defaultValue(e.near, 1)),
      (this._near = this.near),
      (this.far = t.defaultValue(e.far, 5e8)),
      (this._far = this.far);
  }
  function D(e) {
    if (
      !(
        t.defined(e.width) &&
        t.defined(e.aspectRatio) &&
        t.defined(e.near) &&
        t.defined(e.far)
      )
    )
      throw new r.DeveloperError(
        'width, aspectRatio, near, or far parameters are not set.',
      );
    var i = e._offCenterFrustum;
    if (
      e.width !== e._width ||
      e.aspectRatio !== e._aspectRatio ||
      e.near !== e._near ||
      e.far !== e._far
    ) {
      if (e.aspectRatio < 0)
        throw new r.DeveloperError('aspectRatio must be positive.');
      if (e.near < 0 || e.near > e.far)
        throw new r.DeveloperError(
          'near must be greater than zero and less than far.',
        );
      (e._aspectRatio = e.aspectRatio),
        (e._width = e.width),
        (e._near = e.near),
        (e._far = e.far);
      var a = 1 / e.aspectRatio;
      (i.right = 0.5 * e.width),
        (i.left = -i.right),
        (i.top = a * i.right),
        (i.bottom = -i.top),
        (i.near = e.near),
        (i.far = e.far);
    }
  }
  function V(e) {
    (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)),
      (this.left = e.left),
      (this._left = void 0),
      (this.right = e.right),
      (this._right = void 0),
      (this.top = e.top),
      (this._top = void 0),
      (this.bottom = e.bottom),
      (this._bottom = void 0),
      (this.near = t.defaultValue(e.near, 1)),
      (this._near = this.near),
      (this.far = t.defaultValue(e.far, 5e8)),
      (this._far = this.far),
      (this._cullingVolume = new c()),
      (this._perspectiveMatrix = new n.Matrix4()),
      (this._infinitePerspective = new n.Matrix4());
  }
  function P(e) {
    if (
      !(
        t.defined(e.right) &&
        t.defined(e.left) &&
        t.defined(e.top) &&
        t.defined(e.bottom) &&
        t.defined(e.near) &&
        t.defined(e.far)
      )
    )
      throw new r.DeveloperError(
        'right, left, top, bottom, near, or far parameters are not set.',
      );
    var i = e.top,
      a = e.bottom,
      o = e.right,
      s = e.left,
      f = e.near,
      u = e.far;
    if (
      i !== e._top ||
      a !== e._bottom ||
      s !== e._left ||
      o !== e._right ||
      f !== e._near ||
      u !== e._far
    ) {
      if (e.near <= 0 || e.near > e.far)
        throw new r.DeveloperError(
          'near must be greater than zero and less than far.',
        );
      (e._left = s),
        (e._right = o),
        (e._top = i),
        (e._bottom = a),
        (e._near = f),
        (e._far = u),
        (e._perspectiveMatrix = n.Matrix4.computePerspectiveOffCenter(
          s,
          o,
          a,
          i,
          f,
          u,
          e._perspectiveMatrix,
        )),
        (e._infinitePerspective = n.Matrix4.computeInfinitePerspectiveOffCenter(
          s,
          o,
          a,
          i,
          f,
          e._infinitePerspective,
        ));
    }
  }
  (_.prototype.computeCullingVolume = function (e, i, n) {
    if (!t.defined(e)) throw new r.DeveloperError('position is required.');
    if (!t.defined(i)) throw new r.DeveloperError('direction is required.');
    if (!t.defined(n)) throw new r.DeveloperError('up is required.');
    var s = this._cullingVolume.planes,
      f = this.top,
      u = this.bottom,
      h = this.right,
      d = this.left,
      l = this.near,
      p = this.far,
      c = a.Cartesian3.cross(i, n, g);
    a.Cartesian3.normalize(c, c);
    var m = x;
    a.Cartesian3.multiplyByScalar(i, l, m), a.Cartesian3.add(e, m, m);
    var C = b;
    a.Cartesian3.multiplyByScalar(c, d, C), a.Cartesian3.add(m, C, C);
    var w = s[0];
    return (
      t.defined(w) || (w = s[0] = new o.Cartesian4()),
      (w.x = c.x),
      (w.y = c.y),
      (w.z = c.z),
      (w.w = -a.Cartesian3.dot(c, C)),
      a.Cartesian3.multiplyByScalar(c, h, C),
      a.Cartesian3.add(m, C, C),
      (w = s[1]),
      t.defined(w) || (w = s[1] = new o.Cartesian4()),
      (w.x = -c.x),
      (w.y = -c.y),
      (w.z = -c.z),
      (w.w = -a.Cartesian3.dot(a.Cartesian3.negate(c, E), C)),
      a.Cartesian3.multiplyByScalar(n, u, C),
      a.Cartesian3.add(m, C, C),
      (w = s[2]),
      t.defined(w) || (w = s[2] = new o.Cartesian4()),
      (w.x = n.x),
      (w.y = n.y),
      (w.z = n.z),
      (w.w = -a.Cartesian3.dot(n, C)),
      a.Cartesian3.multiplyByScalar(n, f, C),
      a.Cartesian3.add(m, C, C),
      (w = s[3]),
      t.defined(w) || (w = s[3] = new o.Cartesian4()),
      (w.x = -n.x),
      (w.y = -n.y),
      (w.z = -n.z),
      (w.w = -a.Cartesian3.dot(a.Cartesian3.negate(n, E), C)),
      (w = s[4]),
      t.defined(w) || (w = s[4] = new o.Cartesian4()),
      (w.x = i.x),
      (w.y = i.y),
      (w.z = i.z),
      (w.w = -a.Cartesian3.dot(i, m)),
      a.Cartesian3.multiplyByScalar(i, p, C),
      a.Cartesian3.add(e, C, C),
      (w = s[5]),
      t.defined(w) || (w = s[5] = new o.Cartesian4()),
      (w.x = -i.x),
      (w.y = -i.y),
      (w.z = -i.z),
      (w.w = -a.Cartesian3.dot(a.Cartesian3.negate(i, E), C)),
      this._cullingVolume
    );
  }),
    (_.prototype.getPixelDimensions = function (e, i, a, n, o) {
      if ((y(this), !t.defined(e) || !t.defined(i)))
        throw new r.DeveloperError(
          'Both drawingBufferWidth and drawingBufferHeight are required.',
        );
      if (e <= 0)
        throw new r.DeveloperError(
          'drawingBufferWidth must be greater than zero.',
        );
      if (i <= 0)
        throw new r.DeveloperError(
          'drawingBufferHeight must be greater than zero.',
        );
      if (!t.defined(a)) throw new r.DeveloperError('distance is required.');
      if (!t.defined(n)) throw new r.DeveloperError('pixelRatio is required.');
      if (n <= 0)
        throw new r.DeveloperError('pixelRatio must be greater than zero.');
      if (!t.defined(o))
        throw new r.DeveloperError('A result object is required.');
      var s = (n * (this.right - this.left)) / e,
        f = (n * (this.top - this.bottom)) / i;
      return (o.x = s), (o.y = f), o;
    }),
    (_.prototype.clone = function (e) {
      return (
        t.defined(e) || (e = new _()),
        (e.left = this.left),
        (e.right = this.right),
        (e.top = this.top),
        (e.bottom = this.bottom),
        (e.near = this.near),
        (e.far = this.far),
        (e._left = void 0),
        (e._right = void 0),
        (e._top = void 0),
        (e._bottom = void 0),
        (e._near = void 0),
        (e._far = void 0),
        e
      );
    }),
    (_.prototype.equals = function (e) {
      return (
        t.defined(e) &&
        e instanceof _ &&
        this.right === e.right &&
        this.left === e.left &&
        this.top === e.top &&
        this.bottom === e.bottom &&
        this.near === e.near &&
        this.far === e.far
      );
    }),
    (_.prototype.equalsEpsilon = function (e, r, a) {
      return (
        e === this ||
        (t.defined(e) &&
          e instanceof _ &&
          i.CesiumMath.equalsEpsilon(this.right, e.right, r, a) &&
          i.CesiumMath.equalsEpsilon(this.left, e.left, r, a) &&
          i.CesiumMath.equalsEpsilon(this.top, e.top, r, a) &&
          i.CesiumMath.equalsEpsilon(this.bottom, e.bottom, r, a) &&
          i.CesiumMath.equalsEpsilon(this.near, e.near, r, a) &&
          i.CesiumMath.equalsEpsilon(this.far, e.far, r, a))
      );
    }),
    (M.packedLength = 4),
    (M.pack = function (e, i, a) {
      return (
        r.Check.typeOf.object('value', e),
        r.Check.defined('array', i),
        (a = t.defaultValue(a, 0)),
        (i[a++] = e.width),
        (i[a++] = e.aspectRatio),
        (i[a++] = e.near),
        (i[a] = e.far),
        i
      );
    }),
    (M.unpack = function (e, i, a) {
      return (
        r.Check.defined('array', e),
        (i = t.defaultValue(i, 0)),
        t.defined(a) || (a = new M()),
        (a.width = e[i++]),
        (a.aspectRatio = e[i++]),
        (a.near = e[i++]),
        (a.far = e[i]),
        a
      );
    }),
    Object.defineProperties(M.prototype, {
      projectionMatrix: {
        get: function () {
          return D(this), this._offCenterFrustum.projectionMatrix;
        },
      },
    }),
    (M.prototype.computeCullingVolume = function (e, t, r) {
      return D(this), this._offCenterFrustum.computeCullingVolume(e, t, r);
    }),
    (M.prototype.getPixelDimensions = function (e, t, r, i, a) {
      return D(this), this._offCenterFrustum.getPixelDimensions(e, t, r, i, a);
    }),
    (M.prototype.clone = function (e) {
      return (
        t.defined(e) || (e = new M()),
        (e.aspectRatio = this.aspectRatio),
        (e.width = this.width),
        (e.near = this.near),
        (e.far = this.far),
        (e._aspectRatio = void 0),
        (e._width = void 0),
        (e._near = void 0),
        (e._far = void 0),
        this._offCenterFrustum.clone(e._offCenterFrustum),
        e
      );
    }),
    (M.prototype.equals = function (e) {
      return (
        !!(t.defined(e) && e instanceof M) &&
        (D(this),
        D(e),
        this.width === e.width &&
          this.aspectRatio === e.aspectRatio &&
          this._offCenterFrustum.equals(e._offCenterFrustum))
      );
    }),
    (M.prototype.equalsEpsilon = function (e, r, a) {
      return (
        !!(t.defined(e) && e instanceof M) &&
        (D(this),
        D(e),
        i.CesiumMath.equalsEpsilon(this.width, e.width, r, a) &&
          i.CesiumMath.equalsEpsilon(this.aspectRatio, e.aspectRatio, r, a) &&
          this._offCenterFrustum.equalsEpsilon(e._offCenterFrustum, r, a))
      );
    }),
    Object.defineProperties(V.prototype, {
      projectionMatrix: {
        get: function () {
          return P(this), this._perspectiveMatrix;
        },
      },
      infiniteProjectionMatrix: {
        get: function () {
          return P(this), this._infinitePerspective;
        },
      },
    });
  var z = new a.Cartesian3(),
    F = new a.Cartesian3(),
    O = new a.Cartesian3(),
    R = new a.Cartesian3();
  function k(e) {
    (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)),
      (this._offCenterFrustum = new V()),
      (this.fov = e.fov),
      (this._fov = void 0),
      (this._fovy = void 0),
      (this._sseDenominator = void 0),
      (this.aspectRatio = e.aspectRatio),
      (this._aspectRatio = void 0),
      (this.near = t.defaultValue(e.near, 1)),
      (this._near = this.near),
      (this.far = t.defaultValue(e.far, 5e8)),
      (this._far = this.far),
      (this.xOffset = t.defaultValue(e.xOffset, 0)),
      (this._xOffset = this.xOffset),
      (this.yOffset = t.defaultValue(e.yOffset, 0)),
      (this._yOffset = this.yOffset),
      (this.reflect = !1);
  }
  function q(e) {
    if (
      !(
        t.defined(e.fov) &&
        t.defined(e.aspectRatio) &&
        t.defined(e.near) &&
        t.defined(e.far)
      )
    )
      throw new r.DeveloperError(
        'fov, aspectRatio, near, or far parameters are not set.',
      );
    var i = e._offCenterFrustum;
    if (
      e.fov !== e._fov ||
      e.aspectRatio !== e._aspectRatio ||
      e.near !== e._near ||
      e.far !== e._far ||
      e.xOffset !== e._xOffset ||
      e.yOffset !== e._yOffset
    ) {
      if (e.fov < 0 || e.fov >= Math.PI)
        throw new r.DeveloperError('fov must be in the range [0, PI).');
      if (e.aspectRatio < 0)
        throw new r.DeveloperError('aspectRatio must be positive.');
      if (e.near < 0 || e.near > e.far)
        throw new r.DeveloperError(
          'near must be greater than zero and less than far.',
        );
      (e._aspectRatio = e.aspectRatio),
        (e._fov = e.fov),
        (e._fovy =
          e.aspectRatio <= 1
            ? e.fov
            : 2 * Math.atan(Math.tan(0.5 * e.fov) / e.aspectRatio)),
        (e._near = e.near),
        (e._far = e.far),
        (e._sseDenominator = 2 * Math.tan(0.5 * e._fovy)),
        (e._xOffset = e.xOffset),
        (e._yOffset = e.yOffset),
        (i.top = e.near * Math.tan(0.5 * e._fovy)),
        (i.bottom = -i.top),
        (i.right = e.aspectRatio * i.top),
        (i.left = -i.right),
        (i.near = e.near),
        (i.far = e.far),
        (i.right += e.xOffset),
        (i.left += e.xOffset),
        (i.top += e.yOffset),
        (i.bottom += e.yOffset);
    }
  }
  (V.prototype.resetProjectionMatrix = function () {
    if (
      !(
        t.defined(this.right) &&
        t.defined(this.left) &&
        t.defined(this.top) &&
        t.defined(this.bottom) &&
        t.defined(this.near) &&
        t.defined(this.far)
      )
    )
      throw new r.DeveloperError(
        'right, left, top, bottom, near, or far parameters are not set.',
      );
    var e = this.top,
      i = this.bottom,
      a = this.right,
      o = this.left,
      s = this.near,
      f = this.far;
    if (this.near <= 0 || this.near > this.far)
      throw new r.DeveloperError(
        'near must be greater than zero and less than far.',
      );
    (this._left = o),
      (this._right = a),
      (this._top = e),
      (this._bottom = i),
      (this._near = s),
      (this._far = f),
      (this._perspectiveMatrix = n.Matrix4.computePerspectiveOffCenter(
        o,
        a,
        i,
        e,
        s,
        f,
        this._perspectiveMatrix,
      )),
      (this._infinitePerspective =
        n.Matrix4.computeInfinitePerspectiveOffCenter(
          o,
          a,
          i,
          e,
          s,
          this._infinitePerspective,
        ));
  }),
    (V.prototype.computeCullingVolume = function (e, i, n, s) {
      if (!t.defined(e)) throw new r.DeveloperError('position is required.');
      if (!t.defined(i)) throw new r.DeveloperError('direction is required.');
      if (!t.defined(n)) throw new r.DeveloperError('up is required.');
      var f = this._cullingVolume.planes,
        u = t.defaultValue(s, 0);
      (u = Math.min(u, 0.5)), (u = Math.max(u, 0));
      var h = this.top + this.top * u,
        d = this.bottom - this.top * u,
        l = this.right + this.right * u,
        p = this.left - this.right * u,
        c = this.near,
        m = this.far,
        C = a.Cartesian3.cross(i, n, z),
        w = F;
      a.Cartesian3.multiplyByScalar(i, c, w), a.Cartesian3.add(e, w, w);
      var v = O;
      a.Cartesian3.multiplyByScalar(i, m, v), a.Cartesian3.add(e, v, v);
      var _ = R;
      a.Cartesian3.multiplyByScalar(C, p, _),
        a.Cartesian3.add(w, _, _),
        a.Cartesian3.subtract(_, e, _),
        a.Cartesian3.normalize(_, _),
        a.Cartesian3.cross(_, n, _),
        a.Cartesian3.normalize(_, _);
      var y = f[0];
      return (
        t.defined(y) || (y = f[0] = new o.Cartesian4()),
        (y.x = _.x),
        (y.y = _.y),
        (y.z = _.z),
        (y.w = -a.Cartesian3.dot(_, e)),
        a.Cartesian3.multiplyByScalar(C, l, _),
        a.Cartesian3.add(w, _, _),
        a.Cartesian3.subtract(_, e, _),
        a.Cartesian3.cross(n, _, _),
        a.Cartesian3.normalize(_, _),
        (y = f[1]),
        t.defined(y) || (y = f[1] = new o.Cartesian4()),
        (y.x = _.x),
        (y.y = _.y),
        (y.z = _.z),
        (y.w = -a.Cartesian3.dot(_, e)),
        a.Cartesian3.multiplyByScalar(n, d, _),
        a.Cartesian3.add(w, _, _),
        a.Cartesian3.subtract(_, e, _),
        a.Cartesian3.cross(C, _, _),
        a.Cartesian3.normalize(_, _),
        (y = f[2]),
        t.defined(y) || (y = f[2] = new o.Cartesian4()),
        (y.x = _.x),
        (y.y = _.y),
        (y.z = _.z),
        (y.w = -a.Cartesian3.dot(_, e)),
        a.Cartesian3.multiplyByScalar(n, h, _),
        a.Cartesian3.add(w, _, _),
        a.Cartesian3.subtract(_, e, _),
        a.Cartesian3.cross(_, C, _),
        a.Cartesian3.normalize(_, _),
        (y = f[3]),
        t.defined(y) || (y = f[3] = new o.Cartesian4()),
        (y.x = _.x),
        (y.y = _.y),
        (y.z = _.z),
        (y.w = -a.Cartesian3.dot(_, e)),
        (y = f[4]),
        t.defined(y) || (y = f[4] = new o.Cartesian4()),
        (y.x = i.x),
        (y.y = i.y),
        (y.z = i.z),
        (y.w = -a.Cartesian3.dot(i, w)),
        a.Cartesian3.negate(i, _),
        (y = f[5]),
        t.defined(y) || (y = f[5] = new o.Cartesian4()),
        (y.x = _.x),
        (y.y = _.y),
        (y.z = _.z),
        (y.w = -a.Cartesian3.dot(_, v)),
        this._cullingVolume
      );
    }),
    (V.prototype.getPixelDimensions = function (e, i, a, n, o) {
      if ((P(this), !t.defined(e) || !t.defined(i)))
        throw new r.DeveloperError(
          'Both drawingBufferWidth and drawingBufferHeight are required.',
        );
      if (e <= 0)
        throw new r.DeveloperError(
          'drawingBufferWidth must be greater than zero.',
        );
      if (i <= 0)
        throw new r.DeveloperError(
          'drawingBufferHeight must be greater than zero.',
        );
      if (!t.defined(a)) throw new r.DeveloperError('distance is required.');
      if (!t.defined(n)) throw new r.DeveloperError('pixelRatio is required');
      if (n <= 0)
        throw new r.DeveloperError('pixelRatio must be greater than zero.');
      if (!t.defined(o))
        throw new r.DeveloperError('A result object is required.');
      var s = 1 / this.near,
        f = this.top * s,
        u = (2 * n * a * f) / i,
        h = (2 * n * a * (f = this.right * s)) / e;
      return (o.x = h), (o.y = u), o;
    }),
    (V.prototype.clone = function (e) {
      return (
        t.defined(e) || (e = new V()),
        (e.right = this.right),
        (e.left = this.left),
        (e.top = this.top),
        (e.bottom = this.bottom),
        (e.near = this.near),
        (e.far = this.far),
        (e._left = void 0),
        (e._right = void 0),
        (e._top = void 0),
        (e._bottom = void 0),
        (e._near = void 0),
        (e._far = void 0),
        e
      );
    }),
    (V.prototype.equals = function (e) {
      return (
        t.defined(e) &&
        e instanceof V &&
        this.right === e.right &&
        this.left === e.left &&
        this.top === e.top &&
        this.bottom === e.bottom &&
        this.near === e.near &&
        this.far === e.far
      );
    }),
    (V.prototype.equalsEpsilon = function (e, r, a) {
      return (
        e === this ||
        (t.defined(e) &&
          e instanceof V &&
          i.CesiumMath.equalsEpsilon(this.right, e.right, r, a) &&
          i.CesiumMath.equalsEpsilon(this.left, e.left, r, a) &&
          i.CesiumMath.equalsEpsilon(this.top, e.top, r, a) &&
          i.CesiumMath.equalsEpsilon(this.bottom, e.bottom, r, a) &&
          i.CesiumMath.equalsEpsilon(this.near, e.near, r, a) &&
          i.CesiumMath.equalsEpsilon(this.far, e.far, r, a))
      );
    }),
    (k.packedLength = 6),
    (k.pack = function (e, i, a) {
      return (
        r.Check.typeOf.object('value', e),
        r.Check.defined('array', i),
        (a = t.defaultValue(a, 0)),
        (i[a++] = e.fov),
        (i[a++] = e.aspectRatio),
        (i[a++] = e.near),
        (i[a++] = e.far),
        (i[a++] = e.xOffset),
        (i[a] = e.yOffset),
        i
      );
    }),
    (k.unpack = function (e, i, a) {
      return (
        r.Check.defined('array', e),
        (i = t.defaultValue(i, 0)),
        t.defined(a) || (a = new k()),
        (a.fov = e[i++]),
        (a.aspectRatio = e[i++]),
        (a.near = e[i++]),
        (a.far = e[i++]),
        (a.xOffset = e[i++]),
        (a.yOffset = e[i]),
        a
      );
    }),
    Object.defineProperties(k.prototype, {
      projectionMatrix: {
        get: function () {
          return (
            q(this),
            this.reflect &&
              (function (e) {
                if (t.defined(e.clipPlane) && t.defined(e.currentViewMatrix)) {
                  var r = e.currentViewMatrix,
                    a = e._offCenterFrustum.projectionMatrix;
                  n.Matrix4.multiplyByPlane(r, e.clipPlane, S),
                    (T.x = (i.CesiumMath.sign(S.normal.x) + a[8]) / a[0]),
                    (T.y = (i.CesiumMath.sign(S.normal.y) + a[9]) / a[5]),
                    (T.z = -1),
                    (T.w = (1 + a[10]) / a[14]),
                    (A.x = S.normal.x),
                    (A.y = S.normal.y),
                    (A.z = S.normal.z),
                    (A.w = S.distance),
                    o.Cartesian4.multiplyByScalar(
                      A,
                      2 / o.Cartesian4.dot(A, T),
                      B,
                    ),
                    (a[2] = B.x),
                    (a[6] = B.y),
                    (a[10] = B.z + 1),
                    (a[14] = B.w);
                }
              })(this),
            this._offCenterFrustum.projectionMatrix
          );
        },
      },
      infiniteProjectionMatrix: {
        get: function () {
          return q(this), this._offCenterFrustum.infiniteProjectionMatrix;
        },
      },
      fovy: {
        get: function () {
          return q(this), this._fovy;
        },
      },
      sseDenominator: {
        get: function () {
          return q(this), this._sseDenominator;
        },
      },
    }),
    (k.prototype.resetProjectionMatrix = function () {
      return this._offCenterFrustum.resetProjectionMatrix();
    }),
    (k.prototype.computeCullingVolume = function (e, t, r, i) {
      return q(this), this._offCenterFrustum.computeCullingVolume(e, t, r, i);
    }),
    (k.prototype.getPixelDimensions = function (e, t, r, i, a) {
      return q(this), this._offCenterFrustum.getPixelDimensions(e, t, r, i, a);
    }),
    (k.prototype.clone = function (e) {
      return (
        t.defined(e) || (e = new k()),
        (e.aspectRatio = this.aspectRatio),
        (e.fov = this.fov),
        (e.near = this.near),
        (e.far = this.far),
        (e.reflect = this.reflect),
        (e.clipPlane = this.clipPlane),
        (e.currentViewMatrix = this.currentViewMatrix),
        (e._aspectRatio = void 0),
        (e._fov = void 0),
        (e._near = void 0),
        (e._far = void 0),
        this._offCenterFrustum.clone(e._offCenterFrustum),
        e
      );
    }),
    (k.prototype.equals = function (e) {
      return (
        !!(t.defined(e) && e instanceof k) &&
        (q(this),
        q(e),
        this.fov === e.fov &&
          this.aspectRatio === e.aspectRatio &&
          this._offCenterFrustum.equals(e._offCenterFrustum))
      );
    }),
    (k.prototype.equalsEpsilon = function (e, r, a) {
      return (
        !!(t.defined(e) && e instanceof k) &&
        (q(this),
        q(e),
        i.CesiumMath.equalsEpsilon(this.fov, e.fov, r, a) &&
          i.CesiumMath.equalsEpsilon(this.aspectRatio, e.aspectRatio, r, a) &&
          this._offCenterFrustum.equalsEpsilon(e._offCenterFrustum, r, a))
      );
    });
  var S = new l.Plane(a.Cartesian3.UNIT_Z, 1),
    T = new o.Cartesian4(),
    A = new o.Cartesian4(),
    B = new o.Cartesian4();
  function I(e) {
    r.Check.typeOf.object('options', e),
      r.Check.typeOf.object('options.frustum', e.frustum),
      r.Check.typeOf.object('options.origin', e.origin),
      r.Check.typeOf.object('options.orientation', e.orientation);
    var i,
      n,
      o = e.frustum,
      s = e.orientation,
      f = e.origin,
      u = t.defaultValue(e.vertexFormat, p.VertexFormat.DEFAULT),
      d = t.defaultValue(e._drawNearPlane, !0);
    o instanceof k
      ? ((i = 0), (n = k.packedLength))
      : o instanceof M && ((i = 1), (n = M.packedLength)),
      (this._frustumType = i),
      (this._frustum = o.clone()),
      (this._origin = a.Cartesian3.clone(f)),
      (this._orientation = h.Quaternion.clone(s)),
      (this._drawNearPlane = d),
      (this._vertexFormat = u),
      (this._workerName = 'createFrustumGeometry'),
      (this.packedLength =
        2 +
        n +
        a.Cartesian3.packedLength +
        h.Quaternion.packedLength +
        p.VertexFormat.packedLength);
  }
  I.pack = function (e, i, n) {
    r.Check.typeOf.object('value', e),
      r.Check.defined('array', i),
      (n = t.defaultValue(n, 0));
    var o = e._frustumType,
      s = e._frustum;
    return (
      0 === (i[n++] = o)
        ? (k.pack(s, i, n), (n += k.packedLength))
        : (M.pack(s, i, n), (n += M.packedLength)),
      a.Cartesian3.pack(e._origin, i, n),
      (n += a.Cartesian3.packedLength),
      h.Quaternion.pack(e._orientation, i, n),
      (n += h.Quaternion.packedLength),
      p.VertexFormat.pack(e._vertexFormat, i, n),
      (i[(n += p.VertexFormat.packedLength)] = e._drawNearPlane ? 1 : 0),
      i
    );
  };
  var j = new k(),
    N = new M(),
    L = new h.Quaternion(),
    G = new a.Cartesian3(),
    U = new p.VertexFormat();
  function Q(e, r, i, a, n, o, s, f) {
    for (var u = (e / 3) * 2, h = 0; h < 4; ++h)
      t.defined(r) && ((r[e] = o.x), (r[e + 1] = o.y), (r[e + 2] = o.z)),
        t.defined(i) && ((i[e] = s.x), (i[e + 1] = s.y), (i[e + 2] = s.z)),
        t.defined(a) && ((a[e] = f.x), (a[e + 1] = f.y), (a[e + 2] = f.z)),
        (e += 3);
    (n[u] = 0),
      (n[u + 1] = 0),
      (n[u + 2] = 1),
      (n[u + 3] = 0),
      (n[u + 4] = 1),
      (n[u + 5] = 1),
      (n[u + 6] = 0),
      (n[u + 7] = 1);
  }
  I.unpack = function (e, i, n) {
    r.Check.defined('array', e), (i = t.defaultValue(i, 0));
    var o,
      s = e[i++];
    0 === s
      ? ((o = k.unpack(e, i, j)), (i += k.packedLength))
      : ((o = M.unpack(e, i, N)), (i += M.packedLength));
    var f = a.Cartesian3.unpack(e, i, G);
    i += a.Cartesian3.packedLength;
    var u = h.Quaternion.unpack(e, i, L);
    i += h.Quaternion.packedLength;
    var d = p.VertexFormat.unpack(e, i, U),
      l = 1 === e[(i += p.VertexFormat.packedLength)];
    if (!t.defined(n))
      return new I({
        frustum: o,
        origin: f,
        orientation: u,
        vertexFormat: d,
        _drawNearPlane: l,
      });
    var c = s === n._frustumType ? n._frustum : void 0;
    return (
      (n._frustum = o.clone(c)),
      (n._frustumType = s),
      (n._origin = a.Cartesian3.clone(f, n._origin)),
      (n._orientation = h.Quaternion.clone(u, n._orientation)),
      (n._vertexFormat = p.VertexFormat.clone(d, n._vertexFormat)),
      (n._drawNearPlane = l),
      n
    );
  };
  var K = new n.Matrix3(),
    W = new n.Matrix4(),
    Y = new n.Matrix4(),
    H = new a.Cartesian3(),
    J = new a.Cartesian3(),
    Z = new a.Cartesian3(),
    X = new a.Cartesian3(),
    $ = new a.Cartesian3(),
    ee = new a.Cartesian3(),
    te = new Array(3),
    re = new Array(4);
  (re[0] = new o.Cartesian4(-1, -1, 1, 1)),
    (re[1] = new o.Cartesian4(1, -1, 1, 1)),
    (re[2] = new o.Cartesian4(1, 1, 1, 1)),
    (re[3] = new o.Cartesian4(-1, 1, 1, 1));
  for (var ie = new Array(4), ae = 0; ae < 4; ++ae) ie[ae] = new o.Cartesian4();
  (I._computeNearFarPlanes = function (e, r, i, s, f, u, h, d) {
    var l = n.Matrix3.fromQuaternion(r, K),
      p = t.defaultValue(u, H),
      c = t.defaultValue(h, J),
      m = t.defaultValue(d, Z);
    (p = n.Matrix3.getColumn(l, 0, p)),
      (c = n.Matrix3.getColumn(l, 1, c)),
      (m = n.Matrix3.getColumn(l, 2, m)),
      a.Cartesian3.normalize(p, p),
      a.Cartesian3.normalize(c, c),
      a.Cartesian3.normalize(m, m),
      a.Cartesian3.negate(p, p);
    var C,
      w,
      v = n.Matrix4.computeView(e, m, c, p, W);
    if (0 === i) {
      var _ = s.projectionMatrix,
        y = n.Matrix4.multiply(_, v, Y);
      w = n.Matrix4.inverse(y, Y);
    } else C = n.Matrix4.inverseTransformation(v, Y);
    t.defined(w)
      ? ((te[0] = s.near), (te[1] = s.far))
      : ((te[0] = 0), (te[1] = s.near), (te[2] = s.far));
    for (var g = 0; g < 2; ++g)
      for (var x = 0; x < 4; ++x) {
        var b = o.Cartesian4.clone(re[x], ie[x]);
        if (t.defined(w)) {
          var E = 1 / (b = n.Matrix4.multiplyByVector(w, b, b)).w;
          a.Cartesian3.multiplyByScalar(b, E, b),
            a.Cartesian3.subtract(b, e, b),
            a.Cartesian3.normalize(b, b);
          var M = a.Cartesian3.dot(m, b);
          a.Cartesian3.multiplyByScalar(b, te[g] / M, b),
            a.Cartesian3.add(b, e, b);
        } else {
          t.defined(s._offCenterFrustum) && (s = s._offCenterFrustum);
          var D = te[g],
            V = te[g + 1];
          (b.x = 0.5 * (b.x * (s.right - s.left) + s.left + s.right)),
            (b.y = 0.5 * (b.y * (s.top - s.bottom) + s.bottom + s.top)),
            (b.z = 0.5 * (b.z * (D - V) - D - V)),
            (b.w = 1),
            n.Matrix4.multiplyByVector(C, b, b);
        }
        (f[12 * g + 3 * x] = b.x),
          (f[12 * g + 3 * x + 1] = b.y),
          (f[12 * g + 3 * x + 2] = b.z);
      }
  }),
    (I.createGeometry = function (e) {
      var r = e._frustumType,
        i = e._frustum,
        o = e._origin,
        h = e._orientation,
        l = e._drawNearPlane,
        p = e._vertexFormat,
        c = l ? 6 : 5,
        m = new Float64Array(72);
      I._computeNearFarPlanes(o, h, r, i, m);
      var C = 24;
      (m[C] = m[12]),
        (m[C + 1] = m[13]),
        (m[C + 2] = m[14]),
        (m[C + 3] = m[0]),
        (m[C + 4] = m[1]),
        (m[C + 5] = m[2]),
        (m[C + 6] = m[9]),
        (m[C + 7] = m[10]),
        (m[C + 8] = m[11]),
        (m[C + 9] = m[21]),
        (m[C + 10] = m[22]),
        (m[C + 11] = m[23]),
        (m[(C += 12)] = m[15]),
        (m[C + 1] = m[16]),
        (m[C + 2] = m[17]),
        (m[C + 3] = m[3]),
        (m[C + 4] = m[4]),
        (m[C + 5] = m[5]),
        (m[C + 6] = m[0]),
        (m[C + 7] = m[1]),
        (m[C + 8] = m[2]),
        (m[C + 9] = m[12]),
        (m[C + 10] = m[13]),
        (m[C + 11] = m[14]),
        (m[(C += 12)] = m[3]),
        (m[C + 1] = m[4]),
        (m[C + 2] = m[5]),
        (m[C + 3] = m[15]),
        (m[C + 4] = m[16]),
        (m[C + 5] = m[17]),
        (m[C + 6] = m[18]),
        (m[C + 7] = m[19]),
        (m[C + 8] = m[20]),
        (m[C + 9] = m[6]),
        (m[C + 10] = m[7]),
        (m[C + 11] = m[8]),
        (m[(C += 12)] = m[6]),
        (m[C + 1] = m[7]),
        (m[C + 2] = m[8]),
        (m[C + 3] = m[18]),
        (m[C + 4] = m[19]),
        (m[C + 5] = m[20]),
        (m[C + 6] = m[21]),
        (m[C + 7] = m[22]),
        (m[C + 8] = m[23]),
        (m[C + 9] = m[9]),
        (m[C + 10] = m[10]),
        (m[C + 11] = m[11]),
        l || (m = m.subarray(12));
      var w = new d.GeometryAttributes({
        position: new f.GeometryAttribute({
          componentDatatype: s.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: m,
        }),
      });
      if (
        t.defined(p.normal) ||
        t.defined(p.tangent) ||
        t.defined(p.bitangent) ||
        t.defined(p.st)
      ) {
        var v = t.defined(p.normal) ? new Float32Array(12 * c) : void 0,
          _ = t.defined(p.tangent) ? new Float32Array(12 * c) : void 0,
          y = t.defined(p.bitangent) ? new Float32Array(12 * c) : void 0,
          g = t.defined(p.st) ? new Float32Array(8 * c) : void 0,
          x = H,
          b = J,
          E = Z,
          M = a.Cartesian3.negate(x, X),
          D = a.Cartesian3.negate(b, $),
          V = a.Cartesian3.negate(E, ee);
        (C = 0),
          l && (Q(C, v, _, y, g, V, x, b), (C += 12)),
          Q(C, v, _, y, g, E, M, b),
          Q((C += 12), v, _, y, g, M, V, b),
          Q((C += 12), v, _, y, g, D, V, M),
          Q((C += 12), v, _, y, g, x, E, b),
          Q((C += 12), v, _, y, g, b, E, M),
          t.defined(v) &&
            (w.normal = new f.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: v,
            })),
          t.defined(_) &&
            (w.tangent = new f.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: _,
            })),
          t.defined(y) &&
            (w.bitangent = new f.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: y,
            })),
          t.defined(g) &&
            (w.st = new f.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: g,
            }));
      }
      for (var P = new Uint16Array(6 * c), z = 0; z < c; ++z) {
        var F = 6 * z,
          O = 4 * z;
        (P[F] = O),
          (P[F + 1] = O + 1),
          (P[F + 2] = O + 2),
          (P[F + 3] = O),
          (P[F + 4] = O + 2),
          (P[F + 5] = O + 3);
      }
      return new f.Geometry({
        attributes: w,
        indices: P,
        primitiveType: u.PrimitiveType.TRIANGLES,
        boundingSphere: n.BoundingSphere.fromVertices(m),
      });
    }),
    (e.FrustumGeometry = I),
    (e.OrthographicFrustum = M),
    (e.PerspectiveFrustum = k);
});
