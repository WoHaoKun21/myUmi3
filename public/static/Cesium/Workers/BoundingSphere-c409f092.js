define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './Cartesian4-5af5bb24',
  './RuntimeError-ba10bc3e',
], function (e, t, a, n, r, i, c, o) {
  function u(e) {
    (this._ellipsoid = t.defaultValue(e, i.Ellipsoid.WGS84)),
      (this._semimajorAxis = this._ellipsoid.maximumRadius),
      (this._oneOverSemimajorAxis = 1 / this._semimajorAxis);
  }
  Object.defineProperties(u.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      },
    },
  }),
    (u.prototype.project = function (e, a) {
      var n = this._semimajorAxis,
        i = e.longitude * n,
        c = e.latitude * n,
        o = e.height;
      return t.defined(a)
        ? ((a.x = i), (a.y = c), (a.z = o), a)
        : new r.Cartesian3(i, c, o);
    }),
    (u.prototype.unproject = function (e, n) {
      if (!t.defined(e)) throw new a.DeveloperError('cartesian is required');
      var i = this._oneOverSemimajorAxis,
        c = e.x * i,
        o = e.y * i,
        u = e.z;
      return t.defined(n)
        ? ((n.longitude = c), (n.latitude = o), (n.height = u), n)
        : new r.Cartographic(c, o, u);
    });
  var s = Object.freeze({ OUTSIDE: -1, INTERSECTING: 0, INSIDE: 1 });
  function f(e, a) {
    (this.start = t.defaultValue(e, 0)), (this.stop = t.defaultValue(a, 0));
  }
  function l(e, a, n, r, i, c, o, u, s) {
    (this[0] = t.defaultValue(e, 0)),
      (this[1] = t.defaultValue(r, 0)),
      (this[2] = t.defaultValue(o, 0)),
      (this[3] = t.defaultValue(a, 0)),
      (this[4] = t.defaultValue(i, 0)),
      (this[5] = t.defaultValue(u, 0)),
      (this[6] = t.defaultValue(n, 0)),
      (this[7] = t.defaultValue(c, 0)),
      (this[8] = t.defaultValue(s, 0));
  }
  (l.packedLength = 9),
    (l.pack = function (e, n, r) {
      return (
        a.Check.typeOf.object('value', e),
        a.Check.defined('array', n),
        (r = t.defaultValue(r, 0)),
        (n[r++] = e[0]),
        (n[r++] = e[1]),
        (n[r++] = e[2]),
        (n[r++] = e[3]),
        (n[r++] = e[4]),
        (n[r++] = e[5]),
        (n[r++] = e[6]),
        (n[r++] = e[7]),
        (n[r++] = e[8]),
        n
      );
    }),
    (l.unpack = function (e, n, r) {
      return (
        a.Check.defined('array', e),
        (n = t.defaultValue(n, 0)),
        t.defined(r) || (r = new l()),
        (r[0] = e[n++]),
        (r[1] = e[n++]),
        (r[2] = e[n++]),
        (r[3] = e[n++]),
        (r[4] = e[n++]),
        (r[5] = e[n++]),
        (r[6] = e[n++]),
        (r[7] = e[n++]),
        (r[8] = e[n++]),
        r
      );
    }),
    (l.clone = function (e, a) {
      if (t.defined(e))
        return t.defined(a)
          ? ((a[0] = e[0]),
            (a[1] = e[1]),
            (a[2] = e[2]),
            (a[3] = e[3]),
            (a[4] = e[4]),
            (a[5] = e[5]),
            (a[6] = e[6]),
            (a[7] = e[7]),
            (a[8] = e[8]),
            a)
          : new l(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]);
    }),
    (l.fromArray = function (e, n, r) {
      return (
        a.Check.defined('array', e),
        (n = t.defaultValue(n, 0)),
        t.defined(r) || (r = new l()),
        (r[0] = e[n]),
        (r[1] = e[n + 1]),
        (r[2] = e[n + 2]),
        (r[3] = e[n + 3]),
        (r[4] = e[n + 4]),
        (r[5] = e[n + 5]),
        (r[6] = e[n + 6]),
        (r[7] = e[n + 7]),
        (r[8] = e[n + 8]),
        r
      );
    }),
    (l.fromColumnMajorArray = function (e, t) {
      return a.Check.defined('values', e), l.clone(e, t);
    }),
    (l.fromRowMajorArray = function (e, n) {
      return (
        a.Check.defined('values', e),
        t.defined(n)
          ? ((n[0] = e[0]),
            (n[1] = e[3]),
            (n[2] = e[6]),
            (n[3] = e[1]),
            (n[4] = e[4]),
            (n[5] = e[7]),
            (n[6] = e[2]),
            (n[7] = e[5]),
            (n[8] = e[8]),
            n)
          : new l(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8])
      );
    }),
    (l.fromQuaternion = function (e, n) {
      a.Check.typeOf.object('quaternion', e);
      var r = e.x * e.x,
        i = e.x * e.y,
        c = e.x * e.z,
        o = e.x * e.w,
        u = e.y * e.y,
        s = e.y * e.z,
        f = e.y * e.w,
        C = e.z * e.z,
        h = e.z * e.w,
        d = e.w * e.w,
        y = r - u - C + d,
        p = 2 * (i - h),
        O = 2 * (c + f),
        m = 2 * (i + h),
        b = -r + u - C + d,
        k = 2 * (s - o),
        x = 2 * (c - f),
        j = 2 * (s + o),
        v = -r - u + C + d;
      return t.defined(n)
        ? ((n[0] = y),
          (n[1] = m),
          (n[2] = x),
          (n[3] = p),
          (n[4] = b),
          (n[5] = j),
          (n[6] = O),
          (n[7] = k),
          (n[8] = v),
          n)
        : new l(y, p, O, m, b, k, x, j, v);
    }),
    (l.fromHeadingPitchRoll = function (e, n) {
      a.Check.typeOf.object('headingPitchRoll', e);
      var r = Math.cos(-e.pitch),
        i = Math.cos(-e.heading),
        c = Math.cos(e.roll),
        o = Math.sin(-e.pitch),
        u = Math.sin(-e.heading),
        s = Math.sin(e.roll),
        f = r * i,
        C = -c * u + s * o * i,
        h = s * u + c * o * i,
        d = r * u,
        y = c * i + s * o * u,
        p = -s * i + c * o * u,
        O = -o,
        m = s * r,
        b = c * r;
      return t.defined(n)
        ? ((n[0] = f),
          (n[1] = d),
          (n[2] = O),
          (n[3] = C),
          (n[4] = y),
          (n[5] = m),
          (n[6] = h),
          (n[7] = p),
          (n[8] = b),
          n)
        : new l(f, C, h, d, y, p, O, m, b);
    }),
    (l.fromScale = function (e, n) {
      return (
        a.Check.typeOf.object('scale', e),
        t.defined(n)
          ? ((n[0] = e.x),
            (n[1] = 0),
            (n[2] = 0),
            (n[3] = 0),
            (n[4] = e.y),
            (n[5] = 0),
            (n[6] = 0),
            (n[7] = 0),
            (n[8] = e.z),
            n)
          : new l(e.x, 0, 0, 0, e.y, 0, 0, 0, e.z)
      );
    }),
    (l.fromUniformScale = function (e, n) {
      return (
        a.Check.typeOf.number('scale', e),
        t.defined(n)
          ? ((n[0] = e),
            (n[1] = 0),
            (n[2] = 0),
            (n[3] = 0),
            (n[4] = e),
            (n[5] = 0),
            (n[6] = 0),
            (n[7] = 0),
            (n[8] = e),
            n)
          : new l(e, 0, 0, 0, e, 0, 0, 0, e)
      );
    }),
    (l.fromCrossProduct = function (e, n) {
      return (
        a.Check.typeOf.object('vector', e),
        t.defined(n)
          ? ((n[0] = 0),
            (n[1] = e.z),
            (n[2] = -e.y),
            (n[3] = -e.z),
            (n[4] = 0),
            (n[5] = e.x),
            (n[6] = e.y),
            (n[7] = -e.x),
            (n[8] = 0),
            n)
          : new l(0, -e.z, e.y, e.z, 0, -e.x, -e.y, e.x, 0)
      );
    }),
    (l.fromRotationX = function (e, n) {
      a.Check.typeOf.number('angle', e);
      var r = Math.cos(e),
        i = Math.sin(e);
      return t.defined(n)
        ? ((n[0] = 1),
          (n[1] = 0),
          (n[2] = 0),
          (n[3] = 0),
          (n[4] = r),
          (n[5] = i),
          (n[6] = 0),
          (n[7] = -i),
          (n[8] = r),
          n)
        : new l(1, 0, 0, 0, r, -i, 0, i, r);
    }),
    (l.fromRotationY = function (e, n) {
      a.Check.typeOf.number('angle', e);
      var r = Math.cos(e),
        i = Math.sin(e);
      return t.defined(n)
        ? ((n[0] = r),
          (n[1] = 0),
          (n[2] = -i),
          (n[3] = 0),
          (n[4] = 1),
          (n[5] = 0),
          (n[6] = i),
          (n[7] = 0),
          (n[8] = r),
          n)
        : new l(r, 0, i, 0, 1, 0, -i, 0, r);
    }),
    (l.fromRotationZ = function (e, n) {
      a.Check.typeOf.number('angle', e);
      var r = Math.cos(e),
        i = Math.sin(e);
      return t.defined(n)
        ? ((n[0] = r),
          (n[1] = i),
          (n[2] = 0),
          (n[3] = -i),
          (n[4] = r),
          (n[5] = 0),
          (n[6] = 0),
          (n[7] = 0),
          (n[8] = 1),
          n)
        : new l(r, -i, 0, i, r, 0, 0, 0, 1);
    }),
    (l.toArray = function (e, n) {
      return (
        a.Check.typeOf.object('matrix', e),
        t.defined(n)
          ? ((n[0] = e[0]),
            (n[1] = e[1]),
            (n[2] = e[2]),
            (n[3] = e[3]),
            (n[4] = e[4]),
            (n[5] = e[5]),
            (n[6] = e[6]),
            (n[7] = e[7]),
            (n[8] = e[8]),
            n)
          : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]]
      );
    }),
    (l.getElementIndex = function (e, t) {
      return (
        a.Check.typeOf.number.greaterThanOrEquals('row', t, 0),
        a.Check.typeOf.number.lessThanOrEquals('row', t, 2),
        a.Check.typeOf.number.greaterThanOrEquals('column', e, 0),
        a.Check.typeOf.number.lessThanOrEquals('column', e, 2),
        3 * e + t
      );
    }),
    (l.getColumn = function (e, t, n) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.number.greaterThanOrEquals('index', t, 0),
        a.Check.typeOf.number.lessThanOrEquals('index', t, 2),
        a.Check.typeOf.object('result', n);
      var r = 3 * t,
        i = e[r],
        c = e[r + 1],
        o = e[r + 2];
      return (n.x = i), (n.y = c), (n.z = o), n;
    }),
    (l.setColumn = function (e, t, n, r) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.number.greaterThanOrEquals('index', t, 0),
        a.Check.typeOf.number.lessThanOrEquals('index', t, 2),
        a.Check.typeOf.object('cartesian', n),
        a.Check.typeOf.object('result', r);
      var i = 3 * t;
      return (
        ((r = l.clone(e, r))[i] = n.x), (r[i + 1] = n.y), (r[i + 2] = n.z), r
      );
    }),
    (l.getRow = function (e, t, n) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.number.greaterThanOrEquals('index', t, 0),
        a.Check.typeOf.number.lessThanOrEquals('index', t, 2),
        a.Check.typeOf.object('result', n);
      var r = e[t],
        i = e[t + 3],
        c = e[t + 6];
      return (n.x = r), (n.y = i), (n.z = c), n;
    }),
    (l.setRow = function (e, t, n, r) {
      return (
        a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.number.greaterThanOrEquals('index', t, 0),
        a.Check.typeOf.number.lessThanOrEquals('index', t, 2),
        a.Check.typeOf.object('cartesian', n),
        a.Check.typeOf.object('result', r),
        ((r = l.clone(e, r))[t] = n.x),
        (r[t + 3] = n.y),
        (r[t + 6] = n.z),
        r
      );
    });
  var C = new r.Cartesian3();
  l.getScale = function (e, t) {
    return (
      a.Check.typeOf.object('matrix', e),
      a.Check.typeOf.object('result', t),
      (t.x = r.Cartesian3.magnitude(
        r.Cartesian3.fromElements(e[0], e[1], e[2], C),
      )),
      (t.y = r.Cartesian3.magnitude(
        r.Cartesian3.fromElements(e[3], e[4], e[5], C),
      )),
      (t.z = r.Cartesian3.magnitude(
        r.Cartesian3.fromElements(e[6], e[7], e[8], C),
      )),
      t
    );
  };
  var h = new r.Cartesian3();
  (l.getMaximumScale = function (e) {
    return l.getScale(e, h), r.Cartesian3.maximumComponent(h);
  }),
    (l.multiply = function (e, t, n) {
      a.Check.typeOf.object('left', e),
        a.Check.typeOf.object('right', t),
        a.Check.typeOf.object('result', n);
      var r = e[0] * t[0] + e[3] * t[1] + e[6] * t[2],
        i = e[1] * t[0] + e[4] * t[1] + e[7] * t[2],
        c = e[2] * t[0] + e[5] * t[1] + e[8] * t[2],
        o = e[0] * t[3] + e[3] * t[4] + e[6] * t[5],
        u = e[1] * t[3] + e[4] * t[4] + e[7] * t[5],
        s = e[2] * t[3] + e[5] * t[4] + e[8] * t[5],
        f = e[0] * t[6] + e[3] * t[7] + e[6] * t[8],
        l = e[1] * t[6] + e[4] * t[7] + e[7] * t[8],
        C = e[2] * t[6] + e[5] * t[7] + e[8] * t[8];
      return (
        (n[0] = r),
        (n[1] = i),
        (n[2] = c),
        (n[3] = o),
        (n[4] = u),
        (n[5] = s),
        (n[6] = f),
        (n[7] = l),
        (n[8] = C),
        n
      );
    }),
    (l.add = function (e, t, n) {
      return (
        a.Check.typeOf.object('left', e),
        a.Check.typeOf.object('right', t),
        a.Check.typeOf.object('result', n),
        (n[0] = e[0] + t[0]),
        (n[1] = e[1] + t[1]),
        (n[2] = e[2] + t[2]),
        (n[3] = e[3] + t[3]),
        (n[4] = e[4] + t[4]),
        (n[5] = e[5] + t[5]),
        (n[6] = e[6] + t[6]),
        (n[7] = e[7] + t[7]),
        (n[8] = e[8] + t[8]),
        n
      );
    }),
    (l.subtract = function (e, t, n) {
      return (
        a.Check.typeOf.object('left', e),
        a.Check.typeOf.object('right', t),
        a.Check.typeOf.object('result', n),
        (n[0] = e[0] - t[0]),
        (n[1] = e[1] - t[1]),
        (n[2] = e[2] - t[2]),
        (n[3] = e[3] - t[3]),
        (n[4] = e[4] - t[4]),
        (n[5] = e[5] - t[5]),
        (n[6] = e[6] - t[6]),
        (n[7] = e[7] - t[7]),
        (n[8] = e[8] - t[8]),
        n
      );
    }),
    (l.multiplyByVector = function (e, t, n) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('cartesian', t),
        a.Check.typeOf.object('result', n);
      var r = t.x,
        i = t.y,
        c = t.z,
        o = e[0] * r + e[3] * i + e[6] * c,
        u = e[1] * r + e[4] * i + e[7] * c,
        s = e[2] * r + e[5] * i + e[8] * c;
      return (n.x = o), (n.y = u), (n.z = s), n;
    }),
    (l.multiplyByScalar = function (e, t, n) {
      return (
        a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.number('scalar', t),
        a.Check.typeOf.object('result', n),
        (n[0] = e[0] * t),
        (n[1] = e[1] * t),
        (n[2] = e[2] * t),
        (n[3] = e[3] * t),
        (n[4] = e[4] * t),
        (n[5] = e[5] * t),
        (n[6] = e[6] * t),
        (n[7] = e[7] * t),
        (n[8] = e[8] * t),
        n
      );
    }),
    (l.multiplyByScale = function (e, t, n) {
      return (
        a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('scale', t),
        a.Check.typeOf.object('result', n),
        (n[0] = e[0] * t.x),
        (n[1] = e[1] * t.x),
        (n[2] = e[2] * t.x),
        (n[3] = e[3] * t.y),
        (n[4] = e[4] * t.y),
        (n[5] = e[5] * t.y),
        (n[6] = e[6] * t.z),
        (n[7] = e[7] * t.z),
        (n[8] = e[8] * t.z),
        n
      );
    }),
    (l.negate = function (e, t) {
      return (
        a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('result', t),
        (t[0] = -e[0]),
        (t[1] = -e[1]),
        (t[2] = -e[2]),
        (t[3] = -e[3]),
        (t[4] = -e[4]),
        (t[5] = -e[5]),
        (t[6] = -e[6]),
        (t[7] = -e[7]),
        (t[8] = -e[8]),
        t
      );
    }),
    (l.transpose = function (e, t) {
      a.Check.typeOf.object('matrix', e), a.Check.typeOf.object('result', t);
      var n = e[0],
        r = e[3],
        i = e[6],
        c = e[1],
        o = e[4],
        u = e[7],
        s = e[2],
        f = e[5],
        l = e[8];
      return (
        (t[0] = n),
        (t[1] = r),
        (t[2] = i),
        (t[3] = c),
        (t[4] = o),
        (t[5] = u),
        (t[6] = s),
        (t[7] = f),
        (t[8] = l),
        t
      );
    });
  var d = new r.Cartesian3(1, 1, 1);
  l.getRotation = function (e, t) {
    a.Check.typeOf.object('matrix', e), a.Check.typeOf.object('result', t);
    var n = r.Cartesian3.divideComponents(d, l.getScale(e, h), h);
    return l.multiplyByScale(e, n, t);
  };
  var y = [1, 0, 0],
    p = [2, 2, 1];
  function O(e) {
    for (var t = 0, a = 0; a < 3; ++a) {
      var n = e[l.getElementIndex(p[a], y[a])];
      t += 2 * n * n;
    }
    return Math.sqrt(t);
  }
  function m(e, t) {
    for (var a = n.CesiumMath.EPSILON15, r = 0, i = 1, c = 0; c < 3; ++c) {
      var o = Math.abs(e[l.getElementIndex(p[c], y[c])]);
      r < o && ((i = c), (r = o));
    }
    var u = 1,
      s = 0,
      f = y[i],
      C = p[i];
    if (Math.abs(e[l.getElementIndex(C, f)]) > a) {
      var h,
        d =
          (e[l.getElementIndex(C, C)] - e[l.getElementIndex(f, f)]) /
          2 /
          e[l.getElementIndex(C, f)];
      s =
        (h =
          d < 0
            ? -1 / (-d + Math.sqrt(1 + d * d))
            : 1 / (d + Math.sqrt(1 + d * d))) * (u = 1 / Math.sqrt(1 + h * h));
    }
    return (
      ((t = l.clone(l.IDENTITY, t))[l.getElementIndex(f, f)] = t[
        l.getElementIndex(C, C)
      ] =
        u),
      (t[l.getElementIndex(C, f)] = s),
      (t[l.getElementIndex(f, C)] = -s),
      t
    );
  }
  var b = new l(),
    k = new l();
  function x(e, a, n, r, i, c, o, u, s, f, l, C, h, d, y, p) {
    (this[0] = t.defaultValue(e, 0)),
      (this[1] = t.defaultValue(i, 0)),
      (this[2] = t.defaultValue(s, 0)),
      (this[3] = t.defaultValue(h, 0)),
      (this[4] = t.defaultValue(a, 0)),
      (this[5] = t.defaultValue(c, 0)),
      (this[6] = t.defaultValue(f, 0)),
      (this[7] = t.defaultValue(d, 0)),
      (this[8] = t.defaultValue(n, 0)),
      (this[9] = t.defaultValue(o, 0)),
      (this[10] = t.defaultValue(l, 0)),
      (this[11] = t.defaultValue(y, 0)),
      (this[12] = t.defaultValue(r, 0)),
      (this[13] = t.defaultValue(u, 0)),
      (this[14] = t.defaultValue(C, 0)),
      (this[15] = t.defaultValue(p, 0));
  }
  (l.computeEigenDecomposition = function (e, r) {
    a.Check.typeOf.object('matrix', e);
    var i = n.CesiumMath.EPSILON20,
      c = 0,
      o = 0;
    t.defined(r) || (r = {});
    for (
      var u = (r.unitary = l.clone(l.IDENTITY, r.unitary)),
        s = (r.diagonal = l.clone(e, r.diagonal)),
        f =
          i *
          (function (e) {
            for (var t = 0, a = 0; a < 9; ++a) {
              var n = e[a];
              t += n * n;
            }
            return Math.sqrt(t);
          })(s);
      o < 10 && O(s) > f;

    )
      m(s, b),
        l.transpose(b, k),
        l.multiply(s, b, s),
        l.multiply(k, s, s),
        l.multiply(u, b, u),
        2 < ++c && (++o, (c = 0));
    return r;
  }),
    (l.abs = function (e, t) {
      return (
        a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('result', t),
        (t[0] = Math.abs(e[0])),
        (t[1] = Math.abs(e[1])),
        (t[2] = Math.abs(e[2])),
        (t[3] = Math.abs(e[3])),
        (t[4] = Math.abs(e[4])),
        (t[5] = Math.abs(e[5])),
        (t[6] = Math.abs(e[6])),
        (t[7] = Math.abs(e[7])),
        (t[8] = Math.abs(e[8])),
        t
      );
    }),
    (l.determinant = function (e) {
      a.Check.typeOf.object('matrix', e);
      var t = e[0],
        n = e[3],
        r = e[6],
        i = e[1],
        c = e[4],
        o = e[7],
        u = e[2],
        s = e[5],
        f = e[8];
      return t * (c * f - s * o) + i * (s * r - n * f) + u * (n * o - c * r);
    }),
    (l.inverse = function (e, t) {
      a.Check.typeOf.object('matrix', e), a.Check.typeOf.object('result', t);
      var r = e[0],
        i = e[1],
        c = e[2],
        o = e[3],
        u = e[4],
        s = e[5],
        f = e[6],
        C = e[7],
        h = e[8],
        d = l.determinant(e);
      if (Math.abs(d) <= n.CesiumMath.EPSILON15)
        throw new a.DeveloperError('matrix is not invertible');
      return (
        (t[0] = u * h - C * s),
        (t[1] = C * c - i * h),
        (t[2] = i * s - u * c),
        (t[3] = f * s - o * h),
        (t[4] = r * h - f * c),
        (t[5] = o * c - r * s),
        (t[6] = o * C - f * u),
        (t[7] = f * i - r * C),
        (t[8] = r * u - o * i),
        l.multiplyByScalar(t, 1 / d, t)
      );
    }),
    (l.equals = function (e, a) {
      return (
        e === a ||
        (t.defined(e) &&
          t.defined(a) &&
          e[0] === a[0] &&
          e[1] === a[1] &&
          e[2] === a[2] &&
          e[3] === a[3] &&
          e[4] === a[4] &&
          e[5] === a[5] &&
          e[6] === a[6] &&
          e[7] === a[7] &&
          e[8] === a[8])
      );
    }),
    (l.equalsEpsilon = function (e, n, r) {
      return (
        a.Check.typeOf.number('epsilon', r),
        e === n ||
          (t.defined(e) &&
            t.defined(n) &&
            Math.abs(e[0] - n[0]) <= r &&
            Math.abs(e[1] - n[1]) <= r &&
            Math.abs(e[2] - n[2]) <= r &&
            Math.abs(e[3] - n[3]) <= r &&
            Math.abs(e[4] - n[4]) <= r &&
            Math.abs(e[5] - n[5]) <= r &&
            Math.abs(e[6] - n[6]) <= r &&
            Math.abs(e[7] - n[7]) <= r &&
            Math.abs(e[8] - n[8]) <= r)
      );
    }),
    (l.IDENTITY = Object.freeze(new l(1, 0, 0, 0, 1, 0, 0, 0, 1))),
    (l.ZERO = Object.freeze(new l(0, 0, 0, 0, 0, 0, 0, 0, 0))),
    (l.COLUMN0ROW0 = 0),
    (l.COLUMN0ROW1 = 1),
    (l.COLUMN0ROW2 = 2),
    (l.COLUMN1ROW0 = 3),
    (l.COLUMN1ROW1 = 4),
    (l.COLUMN1ROW2 = 5),
    (l.COLUMN2ROW0 = 6),
    (l.COLUMN2ROW1 = 7),
    (l.COLUMN2ROW2 = 8),
    Object.defineProperties(l.prototype, {
      length: {
        get: function () {
          return l.packedLength;
        },
      },
    }),
    (l.prototype.clone = function (e) {
      return l.clone(this, e);
    }),
    (l.prototype.equals = function (e) {
      return l.equals(this, e);
    }),
    (l.equalsArray = function (e, t, a) {
      return (
        e[0] === t[a] &&
        e[1] === t[a + 1] &&
        e[2] === t[a + 2] &&
        e[3] === t[a + 3] &&
        e[4] === t[a + 4] &&
        e[5] === t[a + 5] &&
        e[6] === t[a + 6] &&
        e[7] === t[a + 7] &&
        e[8] === t[a + 8]
      );
    }),
    (l.prototype.equalsEpsilon = function (e, t) {
      return l.equalsEpsilon(this, e, t);
    }),
    (l.prototype.toString = function () {
      return (
        '(' +
        this[0] +
        ', ' +
        this[3] +
        ', ' +
        this[6] +
        ')\n(' +
        this[1] +
        ', ' +
        this[4] +
        ', ' +
        this[7] +
        ')\n(' +
        this[2] +
        ', ' +
        this[5] +
        ', ' +
        this[8] +
        ')'
      );
    }),
    (x.packedLength = 16),
    (x.pack = function (e, n, r) {
      return (
        a.Check.typeOf.object('value', e),
        a.Check.defined('array', n),
        (r = t.defaultValue(r, 0)),
        (n[r++] = e[0]),
        (n[r++] = e[1]),
        (n[r++] = e[2]),
        (n[r++] = e[3]),
        (n[r++] = e[4]),
        (n[r++] = e[5]),
        (n[r++] = e[6]),
        (n[r++] = e[7]),
        (n[r++] = e[8]),
        (n[r++] = e[9]),
        (n[r++] = e[10]),
        (n[r++] = e[11]),
        (n[r++] = e[12]),
        (n[r++] = e[13]),
        (n[r++] = e[14]),
        (n[r] = e[15]),
        n
      );
    }),
    (x.unpack = function (e, n, r) {
      return (
        a.Check.defined('array', e),
        (n = t.defaultValue(n, 0)),
        t.defined(r) || (r = new x()),
        (r[0] = e[n++]),
        (r[1] = e[n++]),
        (r[2] = e[n++]),
        (r[3] = e[n++]),
        (r[4] = e[n++]),
        (r[5] = e[n++]),
        (r[6] = e[n++]),
        (r[7] = e[n++]),
        (r[8] = e[n++]),
        (r[9] = e[n++]),
        (r[10] = e[n++]),
        (r[11] = e[n++]),
        (r[12] = e[n++]),
        (r[13] = e[n++]),
        (r[14] = e[n++]),
        (r[15] = e[n]),
        r
      );
    }),
    (x.clone = function (e, a) {
      if (t.defined(e))
        return t.defined(a)
          ? ((a[0] = e[0]),
            (a[1] = e[1]),
            (a[2] = e[2]),
            (a[3] = e[3]),
            (a[4] = e[4]),
            (a[5] = e[5]),
            (a[6] = e[6]),
            (a[7] = e[7]),
            (a[8] = e[8]),
            (a[9] = e[9]),
            (a[10] = e[10]),
            (a[11] = e[11]),
            (a[12] = e[12]),
            (a[13] = e[13]),
            (a[14] = e[14]),
            (a[15] = e[15]),
            a)
          : new x(
              e[0],
              e[4],
              e[8],
              e[12],
              e[1],
              e[5],
              e[9],
              e[13],
              e[2],
              e[6],
              e[10],
              e[14],
              e[3],
              e[7],
              e[11],
              e[15],
            );
    }),
    (x.fromArray = x.unpack),
    (x.fromColumnMajorArray = function (e, t) {
      return a.Check.defined('values', e), x.clone(e, t);
    }),
    (x.fromRowMajorArray = function (e, n) {
      return (
        a.Check.defined('values', e),
        t.defined(n)
          ? ((n[0] = e[0]),
            (n[1] = e[4]),
            (n[2] = e[8]),
            (n[3] = e[12]),
            (n[4] = e[1]),
            (n[5] = e[5]),
            (n[6] = e[9]),
            (n[7] = e[13]),
            (n[8] = e[2]),
            (n[9] = e[6]),
            (n[10] = e[10]),
            (n[11] = e[14]),
            (n[12] = e[3]),
            (n[13] = e[7]),
            (n[14] = e[11]),
            (n[15] = e[15]),
            n)
          : new x(
              e[0],
              e[1],
              e[2],
              e[3],
              e[4],
              e[5],
              e[6],
              e[7],
              e[8],
              e[9],
              e[10],
              e[11],
              e[12],
              e[13],
              e[14],
              e[15],
            )
      );
    }),
    (x.fromRotationTranslation = function (e, n, i) {
      return (
        a.Check.typeOf.object('rotation', e),
        (n = t.defaultValue(n, r.Cartesian3.ZERO)),
        t.defined(i)
          ? ((i[0] = e[0]),
            (i[1] = e[1]),
            (i[2] = e[2]),
            (i[3] = 0),
            (i[4] = e[3]),
            (i[5] = e[4]),
            (i[6] = e[5]),
            (i[7] = 0),
            (i[8] = e[6]),
            (i[9] = e[7]),
            (i[10] = e[8]),
            (i[11] = 0),
            (i[12] = n.x),
            (i[13] = n.y),
            (i[14] = n.z),
            (i[15] = 1),
            i)
          : new x(
              e[0],
              e[3],
              e[6],
              n.x,
              e[1],
              e[4],
              e[7],
              n.y,
              e[2],
              e[5],
              e[8],
              n.z,
              0,
              0,
              0,
              1,
            )
      );
    }),
    (x.fromTranslationQuaternionRotationScale = function (e, n, r, i) {
      a.Check.typeOf.object('translation', e),
        a.Check.typeOf.object('rotation', n),
        a.Check.typeOf.object('scale', r),
        t.defined(i) || (i = new x());
      var c = r.x,
        o = r.y,
        u = r.z,
        s = n.x * n.x,
        f = n.x * n.y,
        l = n.x * n.z,
        C = n.x * n.w,
        h = n.y * n.y,
        d = n.y * n.z,
        y = n.y * n.w,
        p = n.z * n.z,
        O = n.z * n.w,
        m = n.w * n.w,
        b = s - h - p + m,
        k = 2 * (f - O),
        j = 2 * (l + y),
        v = 2 * (f + O),
        g = -s + h - p + m,
        w = 2 * (d - C),
        z = 2 * (l - y),
        M = 2 * (d + C),
        E = -s - h + p + m;
      return (
        (i[0] = b * c),
        (i[1] = v * c),
        (i[2] = z * c),
        (i[3] = 0),
        (i[4] = k * o),
        (i[5] = g * o),
        (i[6] = M * o),
        (i[7] = 0),
        (i[8] = j * u),
        (i[9] = w * u),
        (i[10] = E * u),
        (i[11] = 0),
        (i[12] = e.x),
        (i[13] = e.y),
        (i[14] = e.z),
        (i[15] = 1),
        i
      );
    }),
    (x.fromTranslationRotationScale = function (e, t) {
      return (
        a.Check.typeOf.object('translationRotationScale', e),
        x.fromTranslationQuaternionRotationScale(
          e.translation,
          e.rotation,
          e.scale,
          t,
        )
      );
    }),
    (x.fromTranslation = function (e, t) {
      return (
        a.Check.typeOf.object('translation', e),
        x.fromRotationTranslation(l.IDENTITY, e, t)
      );
    }),
    (x.fromScale = function (e, n) {
      return (
        a.Check.typeOf.object('scale', e),
        t.defined(n)
          ? ((n[0] = e.x),
            (n[1] = 0),
            (n[2] = 0),
            (n[3] = 0),
            (n[4] = 0),
            (n[5] = e.y),
            (n[6] = 0),
            (n[7] = 0),
            (n[8] = 0),
            (n[9] = 0),
            (n[10] = e.z),
            (n[11] = 0),
            (n[12] = 0),
            (n[13] = 0),
            (n[14] = 0),
            (n[15] = 1),
            n)
          : new x(e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, e.z, 0, 0, 0, 0, 1)
      );
    }),
    (x.fromUniformScale = function (e, n) {
      return (
        a.Check.typeOf.number('scale', e),
        t.defined(n)
          ? ((n[0] = e),
            (n[1] = 0),
            (n[2] = 0),
            (n[3] = 0),
            (n[4] = 0),
            (n[5] = e),
            (n[6] = 0),
            (n[7] = 0),
            (n[8] = 0),
            (n[9] = 0),
            (n[10] = e),
            (n[11] = 0),
            (n[12] = 0),
            (n[13] = 0),
            (n[14] = 0),
            (n[15] = 1),
            n)
          : new x(e, 0, 0, 0, 0, e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1)
      );
    });
  var j = new r.Cartesian3(),
    v = new r.Cartesian3(),
    g = new r.Cartesian3();
  (x.fromCamera = function (e, n) {
    a.Check.typeOf.object('camera', e);
    var i = e.position,
      c = e.direction,
      o = e.up;
    a.Check.typeOf.object('camera.position', i),
      a.Check.typeOf.object('camera.direction', c),
      a.Check.typeOf.object('camera.up', o),
      r.Cartesian3.normalize(c, j),
      r.Cartesian3.normalize(r.Cartesian3.cross(j, o, v), v),
      r.Cartesian3.normalize(r.Cartesian3.cross(v, j, g), g);
    var u = v.x,
      s = v.y,
      f = v.z,
      l = j.x,
      C = j.y,
      h = j.z,
      d = g.x,
      y = g.y,
      p = g.z,
      O = i.x,
      m = i.y,
      b = i.z,
      k = u * -O + s * -m + f * -b,
      w = d * -O + y * -m + p * -b,
      z = l * O + C * m + h * b;
    return t.defined(n)
      ? ((n[0] = u),
        (n[1] = d),
        (n[2] = -l),
        (n[3] = 0),
        (n[4] = s),
        (n[5] = y),
        (n[6] = -C),
        (n[7] = 0),
        (n[8] = f),
        (n[9] = p),
        (n[10] = -h),
        (n[11] = 0),
        (n[12] = k),
        (n[13] = w),
        (n[14] = z),
        (n[15] = 1),
        n)
      : new x(u, s, f, k, d, y, p, w, -l, -C, -h, z, 0, 0, 0, 1);
  }),
    (x.computePerspectiveFieldOfView = function (e, t, n, r, i) {
      a.Check.typeOf.number.greaterThan('fovY', e, 0),
        a.Check.typeOf.number.lessThan('fovY', e, Math.PI),
        a.Check.typeOf.number.greaterThan('near', n, 0),
        a.Check.typeOf.number.greaterThan('far', r, 0),
        a.Check.typeOf.object('result', i);
      var c = 1 / Math.tan(0.5 * e),
        o = c / t,
        u = (r + n) / (n - r),
        s = (2 * r * n) / (n - r);
      return (
        (i[0] = o),
        (i[1] = 0),
        (i[2] = 0),
        (i[3] = 0),
        (i[4] = 0),
        (i[5] = c),
        (i[6] = 0),
        (i[7] = 0),
        (i[8] = 0),
        (i[9] = 0),
        (i[10] = u),
        (i[11] = -1),
        (i[12] = 0),
        (i[13] = 0),
        (i[14] = s),
        (i[15] = 0),
        i
      );
    }),
    (x.computeOrthographicOffCenter = function (e, t, n, r, i, c, o) {
      a.Check.typeOf.number('left', e),
        a.Check.typeOf.number('right', t),
        a.Check.typeOf.number('bottom', n),
        a.Check.typeOf.number('top', r),
        a.Check.typeOf.number('near', i),
        a.Check.typeOf.number('far', c),
        a.Check.typeOf.object('result', o);
      var u = 1 / (t - e),
        s = 1 / (r - n),
        f = 1 / (c - i),
        l = -(t + e) * u,
        C = -(r + n) * s,
        h = -(c + i) * f;
      return (
        (u *= 2),
        (s *= 2),
        (f *= -2),
        (o[0] = u),
        (o[1] = 0),
        (o[2] = 0),
        (o[3] = 0),
        (o[4] = 0),
        (o[5] = s),
        (o[6] = 0),
        (o[7] = 0),
        (o[8] = 0),
        (o[9] = 0),
        (o[10] = f),
        (o[11] = 0),
        (o[12] = l),
        (o[13] = C),
        (o[14] = h),
        (o[15] = 1),
        o
      );
    }),
    (x.computePerspectiveOffCenter = function (e, t, n, r, i, c, o) {
      a.Check.typeOf.number('left', e),
        a.Check.typeOf.number('right', t),
        a.Check.typeOf.number('bottom', n),
        a.Check.typeOf.number('top', r),
        a.Check.typeOf.number('near', i),
        a.Check.typeOf.number('far', c),
        a.Check.typeOf.object('result', o);
      var u = (2 * i) / (t - e),
        s = (2 * i) / (r - n),
        f = (t + e) / (t - e),
        l = (r + n) / (r - n),
        C = -(c + i) / (c - i),
        h = (-2 * c * i) / (c - i);
      return (
        (o[0] = u),
        (o[1] = 0),
        (o[2] = 0),
        (o[3] = 0),
        (o[4] = 0),
        (o[5] = s),
        (o[6] = 0),
        (o[7] = 0),
        (o[8] = f),
        (o[9] = l),
        (o[10] = C),
        (o[11] = -1),
        (o[12] = 0),
        (o[13] = 0),
        (o[14] = h),
        (o[15] = 0),
        o
      );
    }),
    (x.computeInfinitePerspectiveOffCenter = function (e, t, n, r, i, c) {
      a.Check.typeOf.number('left', e),
        a.Check.typeOf.number('right', t),
        a.Check.typeOf.number('bottom', n),
        a.Check.typeOf.number('top', r),
        a.Check.typeOf.number('near', i),
        a.Check.typeOf.object('result', c);
      var o = (2 * i) / (t - e),
        u = (2 * i) / (r - n),
        s = (t + e) / (t - e),
        f = (r + n) / (r - n),
        l = -2 * i;
      return (
        (c[0] = o),
        (c[1] = 0),
        (c[2] = 0),
        (c[3] = 0),
        (c[4] = 0),
        (c[5] = u),
        (c[6] = 0),
        (c[7] = 0),
        (c[8] = s),
        (c[9] = f),
        (c[10] = -1),
        (c[11] = -1),
        (c[12] = 0),
        (c[13] = 0),
        (c[14] = l),
        (c[15] = 0),
        c
      );
    }),
    (x.computeViewportTransformation = function (e, n, r, i) {
      a.Check.typeOf.object('result', i),
        (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT));
      var c = t.defaultValue(e.x, 0),
        o = t.defaultValue(e.y, 0),
        u = t.defaultValue(e.width, 0),
        s = t.defaultValue(e.height, 0);
      n = t.defaultValue(n, 0);
      var f = 0.5 * u,
        l = 0.5 * s,
        C = 0.5 * ((r = t.defaultValue(r, 1)) - n),
        h = f,
        d = l,
        y = C,
        p = c + f,
        O = o + l,
        m = n + C;
      return (
        (i[0] = h),
        (i[1] = 0),
        (i[2] = 0),
        (i[3] = 0),
        (i[4] = 0),
        (i[5] = d),
        (i[6] = 0),
        (i[7] = 0),
        (i[8] = 0),
        (i[9] = 0),
        (i[10] = y),
        (i[11] = 0),
        (i[12] = p),
        (i[13] = O),
        (i[14] = m),
        (i[15] = 1),
        i
      );
    }),
    (x.computeView = function (e, t, n, i, c) {
      return (
        a.Check.typeOf.object('position', e),
        a.Check.typeOf.object('direction', t),
        a.Check.typeOf.object('up', n),
        a.Check.typeOf.object('right', i),
        a.Check.typeOf.object('result', c),
        (c[0] = i.x),
        (c[1] = n.x),
        (c[2] = -t.x),
        (c[3] = 0),
        (c[4] = i.y),
        (c[5] = n.y),
        (c[6] = -t.y),
        (c[7] = 0),
        (c[8] = i.z),
        (c[9] = n.z),
        (c[10] = -t.z),
        (c[11] = 0),
        (c[12] = -r.Cartesian3.dot(i, e)),
        (c[13] = -r.Cartesian3.dot(n, e)),
        (c[14] = r.Cartesian3.dot(t, e)),
        (c[15] = 1),
        c
      );
    }),
    (x.toArray = function (e, n) {
      return (
        a.Check.typeOf.object('matrix', e),
        t.defined(n)
          ? ((n[0] = e[0]),
            (n[1] = e[1]),
            (n[2] = e[2]),
            (n[3] = e[3]),
            (n[4] = e[4]),
            (n[5] = e[5]),
            (n[6] = e[6]),
            (n[7] = e[7]),
            (n[8] = e[8]),
            (n[9] = e[9]),
            (n[10] = e[10]),
            (n[11] = e[11]),
            (n[12] = e[12]),
            (n[13] = e[13]),
            (n[14] = e[14]),
            (n[15] = e[15]),
            n)
          : [
              e[0],
              e[1],
              e[2],
              e[3],
              e[4],
              e[5],
              e[6],
              e[7],
              e[8],
              e[9],
              e[10],
              e[11],
              e[12],
              e[13],
              e[14],
              e[15],
            ]
      );
    }),
    (x.getElementIndex = function (e, t) {
      return (
        a.Check.typeOf.number.greaterThanOrEquals('row', t, 0),
        a.Check.typeOf.number.lessThanOrEquals('row', t, 3),
        a.Check.typeOf.number.greaterThanOrEquals('column', e, 0),
        a.Check.typeOf.number.lessThanOrEquals('column', e, 3),
        4 * e + t
      );
    }),
    (x.getColumn = function (e, t, n) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.number.greaterThanOrEquals('index', t, 0),
        a.Check.typeOf.number.lessThanOrEquals('index', t, 3),
        a.Check.typeOf.object('result', n);
      var r = 4 * t,
        i = e[r],
        c = e[r + 1],
        o = e[r + 2],
        u = e[r + 3];
      return (n.x = i), (n.y = c), (n.z = o), (n.w = u), n;
    }),
    (x.setColumn = function (e, t, n, r) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.number.greaterThanOrEquals('index', t, 0),
        a.Check.typeOf.number.lessThanOrEquals('index', t, 3),
        a.Check.typeOf.object('cartesian', n),
        a.Check.typeOf.object('result', r);
      var i = 4 * t;
      return (
        ((r = x.clone(e, r))[i] = n.x),
        (r[i + 1] = n.y),
        (r[i + 2] = n.z),
        (r[i + 3] = n.w),
        r
      );
    }),
    (x.setTranslation = function (e, t, n) {
      return (
        a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('translation', t),
        a.Check.typeOf.object('result', n),
        (n[0] = e[0]),
        (n[1] = e[1]),
        (n[2] = e[2]),
        (n[3] = e[3]),
        (n[4] = e[4]),
        (n[5] = e[5]),
        (n[6] = e[6]),
        (n[7] = e[7]),
        (n[8] = e[8]),
        (n[9] = e[9]),
        (n[10] = e[10]),
        (n[11] = e[11]),
        (n[12] = t.x),
        (n[13] = t.y),
        (n[14] = t.z),
        (n[15] = e[15]),
        n
      );
    });
  var w = new r.Cartesian3();
  (x.setScale = function (e, t, n) {
    a.Check.typeOf.object('matrix', e),
      a.Check.typeOf.object('scale', t),
      a.Check.typeOf.object('result', n);
    var i = x.getScale(e, w),
      c = r.Cartesian3.divideComponents(t, i, w);
    return x.multiplyByScale(e, c, n);
  }),
    (x.getRow = function (e, t, n) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.number.greaterThanOrEquals('index', t, 0),
        a.Check.typeOf.number.lessThanOrEquals('index', t, 3),
        a.Check.typeOf.object('result', n);
      var r = e[t],
        i = e[t + 4],
        c = e[t + 8],
        o = e[t + 12];
      return (n.x = r), (n.y = i), (n.z = c), (n.w = o), n;
    }),
    (x.setRow = function (e, t, n, r) {
      return (
        a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.number.greaterThanOrEquals('index', t, 0),
        a.Check.typeOf.number.lessThanOrEquals('index', t, 3),
        a.Check.typeOf.object('cartesian', n),
        a.Check.typeOf.object('result', r),
        ((r = x.clone(e, r))[t] = n.x),
        (r[t + 4] = n.y),
        (r[t + 8] = n.z),
        (r[t + 12] = n.w),
        r
      );
    });
  var z = new r.Cartesian3();
  x.getScale = function (e, t) {
    return (
      a.Check.typeOf.object('matrix', e),
      a.Check.typeOf.object('result', t),
      (t.x = r.Cartesian3.magnitude(
        r.Cartesian3.fromElements(e[0], e[1], e[2], z),
      )),
      (t.y = r.Cartesian3.magnitude(
        r.Cartesian3.fromElements(e[4], e[5], e[6], z),
      )),
      (t.z = r.Cartesian3.magnitude(
        r.Cartesian3.fromElements(e[8], e[9], e[10], z),
      )),
      t
    );
  };
  var M = new r.Cartesian3();
  (x.getMaximumScale = function (e) {
    return x.getScale(e, M), r.Cartesian3.maximumComponent(M);
  }),
    (x.multiply = function (e, t, n) {
      a.Check.typeOf.object('left', e),
        a.Check.typeOf.object('right', t),
        a.Check.typeOf.object('result', n);
      var r = e[0],
        i = e[1],
        c = e[2],
        o = e[3],
        u = e[4],
        s = e[5],
        f = e[6],
        l = e[7],
        C = e[8],
        h = e[9],
        d = e[10],
        y = e[11],
        p = e[12],
        O = e[13],
        m = e[14],
        b = e[15],
        k = t[0],
        x = t[1],
        j = t[2],
        v = t[3],
        g = t[4],
        w = t[5],
        z = t[6],
        M = t[7],
        E = t[8],
        q = t[9],
        R = t[10],
        S = t[11],
        T = t[12],
        V = t[13],
        I = t[14],
        N = t[15],
        L = r * k + u * x + C * j + p * v,
        P = i * k + s * x + h * j + O * v,
        U = c * k + f * x + d * j + m * v,
        B = o * k + l * x + y * j + b * v,
        W = r * g + u * w + C * z + p * M,
        D = i * g + s * w + h * z + O * M,
        A = c * g + f * w + d * z + m * M,
        Z = o * g + l * w + y * z + b * M,
        _ = r * E + u * q + C * R + p * S,
        Y = i * E + s * q + h * R + O * S,
        G = c * E + f * q + d * R + m * S,
        H = o * E + l * q + y * R + b * S,
        Q = r * T + u * V + C * I + p * N,
        X = i * T + s * V + h * I + O * N,
        F = c * T + f * V + d * I + m * N,
        J = o * T + l * V + y * I + b * N;
      return (
        (n[0] = L),
        (n[1] = P),
        (n[2] = U),
        (n[3] = B),
        (n[4] = W),
        (n[5] = D),
        (n[6] = A),
        (n[7] = Z),
        (n[8] = _),
        (n[9] = Y),
        (n[10] = G),
        (n[11] = H),
        (n[12] = Q),
        (n[13] = X),
        (n[14] = F),
        (n[15] = J),
        n
      );
    }),
    (x.add = function (e, t, n) {
      return (
        a.Check.typeOf.object('left', e),
        a.Check.typeOf.object('right', t),
        a.Check.typeOf.object('result', n),
        (n[0] = e[0] + t[0]),
        (n[1] = e[1] + t[1]),
        (n[2] = e[2] + t[2]),
        (n[3] = e[3] + t[3]),
        (n[4] = e[4] + t[4]),
        (n[5] = e[5] + t[5]),
        (n[6] = e[6] + t[6]),
        (n[7] = e[7] + t[7]),
        (n[8] = e[8] + t[8]),
        (n[9] = e[9] + t[9]),
        (n[10] = e[10] + t[10]),
        (n[11] = e[11] + t[11]),
        (n[12] = e[12] + t[12]),
        (n[13] = e[13] + t[13]),
        (n[14] = e[14] + t[14]),
        (n[15] = e[15] + t[15]),
        n
      );
    }),
    (x.subtract = function (e, t, n) {
      return (
        a.Check.typeOf.object('left', e),
        a.Check.typeOf.object('right', t),
        a.Check.typeOf.object('result', n),
        (n[0] = e[0] - t[0]),
        (n[1] = e[1] - t[1]),
        (n[2] = e[2] - t[2]),
        (n[3] = e[3] - t[3]),
        (n[4] = e[4] - t[4]),
        (n[5] = e[5] - t[5]),
        (n[6] = e[6] - t[6]),
        (n[7] = e[7] - t[7]),
        (n[8] = e[8] - t[8]),
        (n[9] = e[9] - t[9]),
        (n[10] = e[10] - t[10]),
        (n[11] = e[11] - t[11]),
        (n[12] = e[12] - t[12]),
        (n[13] = e[13] - t[13]),
        (n[14] = e[14] - t[14]),
        (n[15] = e[15] - t[15]),
        n
      );
    }),
    (x.multiplyTransformation = function (e, t, n) {
      a.Check.typeOf.object('left', e),
        a.Check.typeOf.object('right', t),
        a.Check.typeOf.object('result', n);
      var r = e[0],
        i = e[1],
        c = e[2],
        o = e[4],
        u = e[5],
        s = e[6],
        f = e[8],
        l = e[9],
        C = e[10],
        h = e[12],
        d = e[13],
        y = e[14],
        p = t[0],
        O = t[1],
        m = t[2],
        b = t[4],
        k = t[5],
        x = t[6],
        j = t[8],
        v = t[9],
        g = t[10],
        w = t[12],
        z = t[13],
        M = t[14],
        E = r * p + o * O + f * m,
        q = i * p + u * O + l * m,
        R = c * p + s * O + C * m,
        S = r * b + o * k + f * x,
        T = i * b + u * k + l * x,
        V = c * b + s * k + C * x,
        I = r * j + o * v + f * g,
        N = i * j + u * v + l * g,
        L = c * j + s * v + C * g,
        P = r * w + o * z + f * M + h,
        U = i * w + u * z + l * M + d,
        B = c * w + s * z + C * M + y;
      return (
        (n[0] = E),
        (n[1] = q),
        (n[2] = R),
        (n[3] = 0),
        (n[4] = S),
        (n[5] = T),
        (n[6] = V),
        (n[7] = 0),
        (n[8] = I),
        (n[9] = N),
        (n[10] = L),
        (n[11] = 0),
        (n[12] = P),
        (n[13] = U),
        (n[14] = B),
        (n[15] = 1),
        n
      );
    }),
    (x.multiplyByMatrix3 = function (e, t, n) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('rotation', t),
        a.Check.typeOf.object('result', n);
      var r = e[0],
        i = e[1],
        c = e[2],
        o = e[4],
        u = e[5],
        s = e[6],
        f = e[8],
        l = e[9],
        C = e[10],
        h = t[0],
        d = t[1],
        y = t[2],
        p = t[3],
        O = t[4],
        m = t[5],
        b = t[6],
        k = t[7],
        x = t[8],
        j = r * h + o * d + f * y,
        v = i * h + u * d + l * y,
        g = c * h + s * d + C * y,
        w = r * p + o * O + f * m,
        z = i * p + u * O + l * m,
        M = c * p + s * O + C * m,
        E = r * b + o * k + f * x,
        q = i * b + u * k + l * x,
        R = c * b + s * k + C * x;
      return (
        (n[0] = j),
        (n[1] = v),
        (n[2] = g),
        (n[3] = 0),
        (n[4] = w),
        (n[5] = z),
        (n[6] = M),
        (n[7] = 0),
        (n[8] = E),
        (n[9] = q),
        (n[10] = R),
        (n[11] = 0),
        (n[12] = e[12]),
        (n[13] = e[13]),
        (n[14] = e[14]),
        (n[15] = e[15]),
        n
      );
    }),
    (x.multiplyByTranslation = function (e, t, n) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('translation', t),
        a.Check.typeOf.object('result', n);
      var r = t.x,
        i = t.y,
        c = t.z,
        o = r * e[0] + i * e[4] + c * e[8] + e[12],
        u = r * e[1] + i * e[5] + c * e[9] + e[13],
        s = r * e[2] + i * e[6] + c * e[10] + e[14];
      return (
        (n[0] = e[0]),
        (n[1] = e[1]),
        (n[2] = e[2]),
        (n[3] = e[3]),
        (n[4] = e[4]),
        (n[5] = e[5]),
        (n[6] = e[6]),
        (n[7] = e[7]),
        (n[8] = e[8]),
        (n[9] = e[9]),
        (n[10] = e[10]),
        (n[11] = e[11]),
        (n[12] = o),
        (n[13] = u),
        (n[14] = s),
        (n[15] = e[15]),
        n
      );
    });
  var E = new r.Cartesian3();
  (x.multiplyByUniformScale = function (e, t, n) {
    return (
      a.Check.typeOf.object('matrix', e),
      a.Check.typeOf.number('scale', t),
      a.Check.typeOf.object('result', n),
      (E.x = t),
      (E.y = t),
      (E.z = t),
      x.multiplyByScale(e, E, n)
    );
  }),
    (x.multiplyByScale = function (e, t, n) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('scale', t),
        a.Check.typeOf.object('result', n);
      var r = t.x,
        i = t.y,
        c = t.z;
      return 1 === r && 1 === i && 1 === c
        ? x.clone(e, n)
        : ((n[0] = r * e[0]),
          (n[1] = r * e[1]),
          (n[2] = r * e[2]),
          (n[3] = 0),
          (n[4] = i * e[4]),
          (n[5] = i * e[5]),
          (n[6] = i * e[6]),
          (n[7] = 0),
          (n[8] = c * e[8]),
          (n[9] = c * e[9]),
          (n[10] = c * e[10]),
          (n[11] = 0),
          (n[12] = e[12]),
          (n[13] = e[13]),
          (n[14] = e[14]),
          (n[15] = 1),
          n);
    }),
    (x.multiplyByVector = function (e, t, n) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('cartesian', t),
        a.Check.typeOf.object('result', n);
      var r = t.x,
        i = t.y,
        c = t.z,
        o = t.w,
        u = e[0] * r + e[4] * i + e[8] * c + e[12] * o,
        s = e[1] * r + e[5] * i + e[9] * c + e[13] * o,
        f = e[2] * r + e[6] * i + e[10] * c + e[14] * o,
        l = e[3] * r + e[7] * i + e[11] * c + e[15] * o;
      return (n.x = u), (n.y = s), (n.z = f), (n.w = l), n;
    }),
    (x.multiplyByPointAsVector = function (e, t, n) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('cartesian', t),
        a.Check.typeOf.object('result', n);
      var r = t.x,
        i = t.y,
        c = t.z,
        o = e[0] * r + e[4] * i + e[8] * c,
        u = e[1] * r + e[5] * i + e[9] * c,
        s = e[2] * r + e[6] * i + e[10] * c;
      return (n.x = o), (n.y = u), (n.z = s), n;
    }),
    (x.multiplyByPoint = function (e, t, n) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('cartesian', t),
        a.Check.typeOf.object('result', n);
      var r = t.x,
        i = t.y,
        c = t.z,
        o = e[0] * r + e[4] * i + e[8] * c + e[12],
        u = e[1] * r + e[5] * i + e[9] * c + e[13],
        s = e[2] * r + e[6] * i + e[10] * c + e[14];
      return (n.x = o), (n.y = u), (n.z = s), n;
    }),
    (x.multiplyByScalar = function (e, t, n) {
      return (
        a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.number('scalar', t),
        a.Check.typeOf.object('result', n),
        (n[0] = e[0] * t),
        (n[1] = e[1] * t),
        (n[2] = e[2] * t),
        (n[3] = e[3] * t),
        (n[4] = e[4] * t),
        (n[5] = e[5] * t),
        (n[6] = e[6] * t),
        (n[7] = e[7] * t),
        (n[8] = e[8] * t),
        (n[9] = e[9] * t),
        (n[10] = e[10] * t),
        (n[11] = e[11] * t),
        (n[12] = e[12] * t),
        (n[13] = e[13] * t),
        (n[14] = e[14] * t),
        (n[15] = e[15] * t),
        n
      );
    }),
    (x.multiplyByPlane = function (e, t, n) {
      a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('plane', t),
        a.Check.typeOf.object('result', n);
      var i = new x(),
        o = new x();
      x.inverse(e, i), x.transpose(i, o);
      var u = new c.Cartesian4(t.normal.x, t.normal.y, t.normal.z, t.distance);
      x.multiplyByVector(o, u, u),
        (n.normal.x = u.x),
        (n.normal.y = u.y),
        (n.normal.z = u.z);
      var s = r.Cartesian3.magnitude(n.normal);
      return (
        r.Cartesian3.normalize(n.normal, n.normal), (n.distance = u.w / s), n
      );
    }),
    (x.negate = function (e, t) {
      return (
        a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('result', t),
        (t[0] = -e[0]),
        (t[1] = -e[1]),
        (t[2] = -e[2]),
        (t[3] = -e[3]),
        (t[4] = -e[4]),
        (t[5] = -e[5]),
        (t[6] = -e[6]),
        (t[7] = -e[7]),
        (t[8] = -e[8]),
        (t[9] = -e[9]),
        (t[10] = -e[10]),
        (t[11] = -e[11]),
        (t[12] = -e[12]),
        (t[13] = -e[13]),
        (t[14] = -e[14]),
        (t[15] = -e[15]),
        t
      );
    }),
    (x.transpose = function (e, t) {
      a.Check.typeOf.object('matrix', e), a.Check.typeOf.object('result', t);
      var n = e[1],
        r = e[2],
        i = e[3],
        c = e[6],
        o = e[7],
        u = e[11];
      return (
        (t[0] = e[0]),
        (t[1] = e[4]),
        (t[2] = e[8]),
        (t[3] = e[12]),
        (t[4] = n),
        (t[5] = e[5]),
        (t[6] = e[9]),
        (t[7] = e[13]),
        (t[8] = r),
        (t[9] = c),
        (t[10] = e[10]),
        (t[11] = e[14]),
        (t[12] = i),
        (t[13] = o),
        (t[14] = u),
        (t[15] = e[15]),
        t
      );
    }),
    (x.abs = function (e, t) {
      return (
        a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('result', t),
        (t[0] = Math.abs(e[0])),
        (t[1] = Math.abs(e[1])),
        (t[2] = Math.abs(e[2])),
        (t[3] = Math.abs(e[3])),
        (t[4] = Math.abs(e[4])),
        (t[5] = Math.abs(e[5])),
        (t[6] = Math.abs(e[6])),
        (t[7] = Math.abs(e[7])),
        (t[8] = Math.abs(e[8])),
        (t[9] = Math.abs(e[9])),
        (t[10] = Math.abs(e[10])),
        (t[11] = Math.abs(e[11])),
        (t[12] = Math.abs(e[12])),
        (t[13] = Math.abs(e[13])),
        (t[14] = Math.abs(e[14])),
        (t[15] = Math.abs(e[15])),
        t
      );
    }),
    (x.equals = function (e, a) {
      return (
        e === a ||
        (t.defined(e) &&
          t.defined(a) &&
          e[12] === a[12] &&
          e[13] === a[13] &&
          e[14] === a[14] &&
          e[0] === a[0] &&
          e[1] === a[1] &&
          e[2] === a[2] &&
          e[4] === a[4] &&
          e[5] === a[5] &&
          e[6] === a[6] &&
          e[8] === a[8] &&
          e[9] === a[9] &&
          e[10] === a[10] &&
          e[3] === a[3] &&
          e[7] === a[7] &&
          e[11] === a[11] &&
          e[15] === a[15])
      );
    }),
    (x.equalsEpsilon = function (e, n, r) {
      return (
        a.Check.typeOf.number('epsilon', r),
        e === n ||
          (t.defined(e) &&
            t.defined(n) &&
            Math.abs(e[0] - n[0]) <= r &&
            Math.abs(e[1] - n[1]) <= r &&
            Math.abs(e[2] - n[2]) <= r &&
            Math.abs(e[3] - n[3]) <= r &&
            Math.abs(e[4] - n[4]) <= r &&
            Math.abs(e[5] - n[5]) <= r &&
            Math.abs(e[6] - n[6]) <= r &&
            Math.abs(e[7] - n[7]) <= r &&
            Math.abs(e[8] - n[8]) <= r &&
            Math.abs(e[9] - n[9]) <= r &&
            Math.abs(e[10] - n[10]) <= r &&
            Math.abs(e[11] - n[11]) <= r &&
            Math.abs(e[12] - n[12]) <= r &&
            Math.abs(e[13] - n[13]) <= r &&
            Math.abs(e[14] - n[14]) <= r &&
            Math.abs(e[15] - n[15]) <= r)
      );
    }),
    (x.getTranslation = function (e, t) {
      return (
        a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('result', t),
        (t.x = e[12]),
        (t.y = e[13]),
        (t.z = e[14]),
        t
      );
    }),
    (x.getMatrix3 = function (e, t) {
      return (
        a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('result', t),
        (t[0] = e[0]),
        (t[1] = e[1]),
        (t[2] = e[2]),
        (t[3] = e[4]),
        (t[4] = e[5]),
        (t[5] = e[6]),
        (t[6] = e[8]),
        (t[7] = e[9]),
        (t[8] = e[10]),
        t
      );
    }),
    (x.getRotation = function (e, t) {
      return (
        a.Check.typeOf.object('matrix', e),
        a.Check.typeOf.object('result', t),
        (t[0] = e[0]),
        (t[1] = e[1]),
        (t[2] = e[2]),
        (t[3] = e[4]),
        (t[4] = e[5]),
        (t[5] = e[6]),
        (t[6] = e[8]),
        (t[7] = e[9]),
        (t[8] = e[10]),
        t
      );
    });
  var q = new l(),
    R = new l(),
    S = new c.Cartesian4(),
    T = new c.Cartesian4(0, 0, 0, 1);
  function V(e, a) {
    (this.center = r.Cartesian3.clone(t.defaultValue(e, r.Cartesian3.ZERO))),
      (this.radius = t.defaultValue(a, 0));
  }
  (x.inverse = function (e, t) {
    a.Check.typeOf.object('matrix', e), a.Check.typeOf.object('result', t);
    var r = e[0],
      i = e[4],
      u = e[8],
      s = e[12],
      f = e[1],
      C = e[5],
      h = e[9],
      d = e[13],
      y = e[2],
      p = e[6],
      O = e[10],
      m = e[14],
      b = e[3],
      k = e[7],
      j = e[11],
      v = e[15],
      g = O * v,
      w = m * j,
      z = p * v,
      M = m * k,
      E = p * j,
      V = O * k,
      I = y * v,
      N = m * b,
      L = y * j,
      P = O * b,
      U = y * k,
      B = p * b,
      W = g * C + M * h + E * d - (w * C + z * h + V * d),
      D = w * f + I * h + P * d - (g * f + N * h + L * d),
      A = z * f + N * C + U * d - (M * f + I * C + B * d),
      Z = V * f + L * C + B * h - (E * f + P * C + U * h),
      _ = w * i + z * u + V * s - (g * i + M * u + E * s),
      Y = g * r + N * u + L * s - (w * r + I * u + P * s),
      G = M * r + I * i + B * s - (z * r + N * i + U * s),
      H = E * r + P * i + U * u - (V * r + L * i + B * u),
      Q =
        (g = u * d) * k +
        (M = s * C) * j +
        (E = i * h) * v -
        ((w = s * h) * k + (z = i * d) * j + (V = u * C) * v),
      X =
        w * b +
        (I = r * d) * j +
        (P = u * f) * v -
        (g * b + (N = s * f) * j + (L = r * h) * v),
      F = z * b + N * k + (U = r * C) * v - (M * b + I * k + (B = i * f) * v),
      J = V * b + L * k + B * j - (E * b + P * k + U * j),
      K = z * O + V * m + w * p - (E * m + g * p + M * O),
      $ = L * m + g * y + N * O - (I * O + P * m + w * y),
      ee = I * p + B * m + M * y - (U * m + z * y + N * p),
      te = U * O + E * y + P * p - (L * p + B * O + V * y),
      ae = r * W + i * D + u * A + s * Z;
    if (Math.abs(ae) < n.CesiumMath.EPSILON21) {
      if (
        l.equalsEpsilon(x.getRotation(e, q), R, n.CesiumMath.EPSILON7) &&
        c.Cartesian4.equals(x.getRow(e, 3, S), T)
      )
        return (
          (t[0] = 0),
          (t[1] = 0),
          (t[2] = 0),
          (t[3] = 0),
          (t[4] = 0),
          (t[5] = 0),
          (t[6] = 0),
          (t[7] = 0),
          (t[8] = 0),
          (t[9] = 0),
          (t[10] = 0),
          (t[11] = 0),
          (t[12] = -e[12]),
          (t[13] = -e[13]),
          (t[14] = -e[14]),
          (t[15] = 1),
          t
        );
      throw new o.RuntimeError(
        'matrix is not invertible because its determinate is zero.',
      );
    }
    return (
      (ae = 1 / ae),
      (t[0] = W * ae),
      (t[1] = D * ae),
      (t[2] = A * ae),
      (t[3] = Z * ae),
      (t[4] = _ * ae),
      (t[5] = Y * ae),
      (t[6] = G * ae),
      (t[7] = H * ae),
      (t[8] = Q * ae),
      (t[9] = X * ae),
      (t[10] = F * ae),
      (t[11] = J * ae),
      (t[12] = K * ae),
      (t[13] = $ * ae),
      (t[14] = ee * ae),
      (t[15] = te * ae),
      t
    );
  }),
    (x.inverseTransformation = function (e, t) {
      a.Check.typeOf.object('matrix', e), a.Check.typeOf.object('result', t);
      var n = e[0],
        r = e[1],
        i = e[2],
        c = e[4],
        o = e[5],
        u = e[6],
        s = e[8],
        f = e[9],
        l = e[10],
        C = e[12],
        h = e[13],
        d = e[14],
        y = -n * C - r * h - i * d,
        p = -c * C - o * h - u * d,
        O = -s * C - f * h - l * d;
      return (
        (t[0] = n),
        (t[1] = c),
        (t[2] = s),
        (t[3] = 0),
        (t[4] = r),
        (t[5] = o),
        (t[6] = f),
        (t[7] = 0),
        (t[8] = i),
        (t[9] = u),
        (t[10] = l),
        (t[11] = 0),
        (t[12] = y),
        (t[13] = p),
        (t[14] = O),
        (t[15] = 1),
        t
      );
    }),
    (x.IDENTITY = Object.freeze(
      new x(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
    )),
    (x.ZERO = Object.freeze(
      new x(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    )),
    (x.COLUMN0ROW0 = 0),
    (x.COLUMN0ROW1 = 1),
    (x.COLUMN0ROW2 = 2),
    (x.COLUMN0ROW3 = 3),
    (x.COLUMN1ROW0 = 4),
    (x.COLUMN1ROW1 = 5),
    (x.COLUMN1ROW2 = 6),
    (x.COLUMN1ROW3 = 7),
    (x.COLUMN2ROW0 = 8),
    (x.COLUMN2ROW1 = 9),
    (x.COLUMN2ROW2 = 10),
    (x.COLUMN2ROW3 = 11),
    (x.COLUMN3ROW0 = 12),
    (x.COLUMN3ROW1 = 13),
    (x.COLUMN3ROW2 = 14),
    (x.COLUMN3ROW3 = 15),
    Object.defineProperties(x.prototype, {
      length: {
        get: function () {
          return x.packedLength;
        },
      },
    }),
    (x.prototype.clone = function (e) {
      return x.clone(this, e);
    }),
    (x.prototype.equals = function (e) {
      return x.equals(this, e);
    }),
    (x.equalsArray = function (e, t, a) {
      return (
        e[0] === t[a] &&
        e[1] === t[a + 1] &&
        e[2] === t[a + 2] &&
        e[3] === t[a + 3] &&
        e[4] === t[a + 4] &&
        e[5] === t[a + 5] &&
        e[6] === t[a + 6] &&
        e[7] === t[a + 7] &&
        e[8] === t[a + 8] &&
        e[9] === t[a + 9] &&
        e[10] === t[a + 10] &&
        e[11] === t[a + 11] &&
        e[12] === t[a + 12] &&
        e[13] === t[a + 13] &&
        e[14] === t[a + 14] &&
        e[15] === t[a + 15]
      );
    }),
    (x.prototype.equalsEpsilon = function (e, t) {
      return x.equalsEpsilon(this, e, t);
    }),
    (x.prototype.toString = function () {
      return (
        '(' +
        this[0] +
        ', ' +
        this[4] +
        ', ' +
        this[8] +
        ', ' +
        this[12] +
        ')\n(' +
        this[1] +
        ', ' +
        this[5] +
        ', ' +
        this[9] +
        ', ' +
        this[13] +
        ')\n(' +
        this[2] +
        ', ' +
        this[6] +
        ', ' +
        this[10] +
        ', ' +
        this[14] +
        ')\n(' +
        this[3] +
        ', ' +
        this[7] +
        ', ' +
        this[11] +
        ', ' +
        this[15] +
        ')'
      );
    });
  var I = new r.Cartesian3(),
    N = new r.Cartesian3(),
    L = new r.Cartesian3(),
    P = new r.Cartesian3(),
    U = new r.Cartesian3(),
    B = new r.Cartesian3(),
    W = new r.Cartesian3(),
    D = new r.Cartesian3(),
    A = new r.Cartesian3(),
    Z = new r.Cartesian3(),
    _ = new r.Cartesian3(),
    Y = new r.Cartesian3(),
    G = (4 / 3) * n.CesiumMath.PI;
  V.fromPoints = function (e, a) {
    if ((t.defined(a) || (a = new V()), !t.defined(e) || 0 === e.length))
      return (
        (a.center = r.Cartesian3.clone(r.Cartesian3.ZERO, a.center)),
        (a.radius = 0),
        a
      );
    var n,
      i = r.Cartesian3.clone(e[0], W),
      c = r.Cartesian3.clone(i, I),
      o = r.Cartesian3.clone(i, N),
      u = r.Cartesian3.clone(i, L),
      s = r.Cartesian3.clone(i, P),
      f = r.Cartesian3.clone(i, U),
      l = r.Cartesian3.clone(i, B),
      C = e.length;
    for (n = 1; n < C; n++) {
      r.Cartesian3.clone(e[n], i);
      var h = i.x,
        d = i.y,
        y = i.z;
      h < c.x && r.Cartesian3.clone(i, c),
        h > s.x && r.Cartesian3.clone(i, s),
        d < o.y && r.Cartesian3.clone(i, o),
        d > f.y && r.Cartesian3.clone(i, f),
        y < u.z && r.Cartesian3.clone(i, u),
        y > l.z && r.Cartesian3.clone(i, l);
    }
    var p = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(s, c, D)),
      O = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(f, o, D)),
      m = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(l, u, D)),
      b = c,
      k = s,
      x = p;
    x < O && ((x = O), (b = o), (k = f)), x < m && ((x = m), (b = u), (k = l));
    var j = A;
    (j.x = 0.5 * (b.x + k.x)),
      (j.y = 0.5 * (b.y + k.y)),
      (j.z = 0.5 * (b.z + k.z));
    var v = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(k, j, D)),
      g = Math.sqrt(v),
      w = Z;
    (w.x = c.x), (w.y = o.y), (w.z = u.z);
    var z = _;
    (z.x = s.x), (z.y = f.y), (z.z = l.z);
    var M = r.Cartesian3.midpoint(w, z, Y),
      E = 0;
    for (n = 0; n < C; n++) {
      r.Cartesian3.clone(e[n], i);
      var q = r.Cartesian3.magnitude(r.Cartesian3.subtract(i, M, D));
      E < q && (E = q);
      var R = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(i, j, D));
      if (v < R) {
        var S = Math.sqrt(R);
        v = (g = 0.5 * (g + S)) * g;
        var T = S - g;
        (j.x = (g * j.x + T * i.x) / S),
          (j.y = (g * j.y + T * i.y) / S),
          (j.z = (g * j.z + T * i.z) / S);
      }
    }
    return (
      (a.radius =
        g < E
          ? (r.Cartesian3.clone(j, a.center), g)
          : (r.Cartesian3.clone(M, a.center), E)),
      a
    );
  };
  var H = new u(),
    Q = new r.Cartesian3(),
    X = new r.Cartesian3(),
    F = new r.Cartographic(),
    J = new r.Cartographic();
  (V.fromRectangle2D = function (e, t, a) {
    return V.fromRectangleWithHeights2D(e, t, 0, 0, a);
  }),
    (V.fromRectangleWithHeights2D = function (e, a, n, c, o) {
      if ((t.defined(o) || (o = new V()), !t.defined(e)))
        return (
          (o.center = r.Cartesian3.clone(r.Cartesian3.ZERO, o.center)),
          (o.radius = 0),
          o
        );
      (a = t.defaultValue(a, H)),
        i.Rectangle.southwest(e, F),
        (F.height = n),
        i.Rectangle.northeast(e, J),
        (J.height = c);
      var u = a.project(F, Q),
        s = a.project(J, X),
        f = s.x - u.x,
        l = s.y - u.y,
        C = s.z - u.z;
      o.radius = 0.5 * Math.sqrt(f * f + l * l + C * C);
      var h = o.center;
      return (
        (h.x = u.x + 0.5 * f), (h.y = u.y + 0.5 * l), (h.z = u.z + 0.5 * C), o
      );
    });
  var K = [];
  (V.fromRectangle3D = function (e, a, n, c) {
    if (
      ((a = t.defaultValue(a, i.Ellipsoid.WGS84)),
      (n = t.defaultValue(n, 0)),
      t.defined(c) || (c = new V()),
      !t.defined(e))
    )
      return (
        (c.center = r.Cartesian3.clone(r.Cartesian3.ZERO, c.center)),
        (c.radius = 0),
        c
      );
    var o = i.Rectangle.subsample(e, a, n, K);
    return V.fromPoints(o, c);
  }),
    (V.fromVertices = function (e, n, i, c) {
      if ((t.defined(c) || (c = new V()), !t.defined(e) || 0 === e.length))
        return (
          (c.center = r.Cartesian3.clone(r.Cartesian3.ZERO, c.center)),
          (c.radius = 0),
          c
        );
      (n = t.defaultValue(n, r.Cartesian3.ZERO)),
        (i = t.defaultValue(i, 3)),
        a.Check.typeOf.number.greaterThanOrEquals('stride', i, 3);
      var o = W;
      (o.x = e[0] + n.x), (o.y = e[1] + n.y), (o.z = e[2] + n.z);
      var u,
        s = r.Cartesian3.clone(o, I),
        f = r.Cartesian3.clone(o, N),
        l = r.Cartesian3.clone(o, L),
        C = r.Cartesian3.clone(o, P),
        h = r.Cartesian3.clone(o, U),
        d = r.Cartesian3.clone(o, B),
        y = e.length;
      for (u = 0; u < y; u += i) {
        var p = e[u] + n.x,
          O = e[u + 1] + n.y,
          m = e[u + 2] + n.z;
        (o.x = p),
          (o.y = O),
          (o.z = m),
          p < s.x && r.Cartesian3.clone(o, s),
          p > C.x && r.Cartesian3.clone(o, C),
          O < f.y && r.Cartesian3.clone(o, f),
          O > h.y && r.Cartesian3.clone(o, h),
          m < l.z && r.Cartesian3.clone(o, l),
          m > d.z && r.Cartesian3.clone(o, d);
      }
      var b = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(C, s, D)),
        k = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(h, f, D)),
        x = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(d, l, D)),
        j = s,
        v = C,
        g = b;
      g < k && ((g = k), (j = f), (v = h)),
        g < x && ((g = x), (j = l), (v = d));
      var w = A;
      (w.x = 0.5 * (j.x + v.x)),
        (w.y = 0.5 * (j.y + v.y)),
        (w.z = 0.5 * (j.z + v.z));
      var z = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(v, w, D)),
        M = Math.sqrt(z),
        E = Z;
      (E.x = s.x), (E.y = f.y), (E.z = l.z);
      var q = _;
      (q.x = C.x), (q.y = h.y), (q.z = d.z);
      var R = r.Cartesian3.midpoint(E, q, Y),
        S = 0;
      for (u = 0; u < y; u += i) {
        (o.x = e[u] + n.x), (o.y = e[u + 1] + n.y), (o.z = e[u + 2] + n.z);
        var T = r.Cartesian3.magnitude(r.Cartesian3.subtract(o, R, D));
        S < T && (S = T);
        var G = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(o, w, D));
        if (z < G) {
          var H = Math.sqrt(G);
          z = (M = 0.5 * (M + H)) * M;
          var Q = H - M;
          (w.x = (M * w.x + Q * o.x) / H),
            (w.y = (M * w.y + Q * o.y) / H),
            (w.z = (M * w.z + Q * o.z) / H);
        }
      }
      return (
        (c.radius =
          M < S
            ? (r.Cartesian3.clone(w, c.center), M)
            : (r.Cartesian3.clone(R, c.center), S)),
        c
      );
    }),
    (V.fromEncodedCartesianVertices = function (e, a, n) {
      if (
        (t.defined(n) || (n = new V()),
        !t.defined(e) ||
          !t.defined(a) ||
          e.length !== a.length ||
          0 === e.length)
      )
        return (
          (n.center = r.Cartesian3.clone(r.Cartesian3.ZERO, n.center)),
          (n.radius = 0),
          n
        );
      var i = W;
      (i.x = e[0] + a[0]), (i.y = e[1] + a[1]), (i.z = e[2] + a[2]);
      var c,
        o = r.Cartesian3.clone(i, I),
        u = r.Cartesian3.clone(i, N),
        s = r.Cartesian3.clone(i, L),
        f = r.Cartesian3.clone(i, P),
        l = r.Cartesian3.clone(i, U),
        C = r.Cartesian3.clone(i, B),
        h = e.length;
      for (c = 0; c < h; c += 3) {
        var d = e[c] + a[c],
          y = e[c + 1] + a[c + 1],
          p = e[c + 2] + a[c + 2];
        (i.x = d),
          (i.y = y),
          (i.z = p),
          d < o.x && r.Cartesian3.clone(i, o),
          d > f.x && r.Cartesian3.clone(i, f),
          y < u.y && r.Cartesian3.clone(i, u),
          y > l.y && r.Cartesian3.clone(i, l),
          p < s.z && r.Cartesian3.clone(i, s),
          p > C.z && r.Cartesian3.clone(i, C);
      }
      var O = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(f, o, D)),
        m = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(l, u, D)),
        b = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(C, s, D)),
        k = o,
        x = f,
        j = O;
      j < m && ((j = m), (k = u), (x = l)),
        j < b && ((j = b), (k = s), (x = C));
      var v = A;
      (v.x = 0.5 * (k.x + x.x)),
        (v.y = 0.5 * (k.y + x.y)),
        (v.z = 0.5 * (k.z + x.z));
      var g = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(x, v, D)),
        w = Math.sqrt(g),
        z = Z;
      (z.x = o.x), (z.y = u.y), (z.z = s.z);
      var M = _;
      (M.x = f.x), (M.y = l.y), (M.z = C.z);
      var E = r.Cartesian3.midpoint(z, M, Y),
        q = 0;
      for (c = 0; c < h; c += 3) {
        (i.x = e[c] + a[c]),
          (i.y = e[c + 1] + a[c + 1]),
          (i.z = e[c + 2] + a[c + 2]);
        var R = r.Cartesian3.magnitude(r.Cartesian3.subtract(i, E, D));
        q < R && (q = R);
        var S = r.Cartesian3.magnitudeSquared(r.Cartesian3.subtract(i, v, D));
        if (g < S) {
          var T = Math.sqrt(S);
          g = (w = 0.5 * (w + T)) * w;
          var G = T - w;
          (v.x = (w * v.x + G * i.x) / T),
            (v.y = (w * v.y + G * i.y) / T),
            (v.z = (w * v.z + G * i.z) / T);
        }
      }
      return (
        (n.radius =
          w < q
            ? (r.Cartesian3.clone(v, n.center), w)
            : (r.Cartesian3.clone(E, n.center), q)),
        n
      );
    }),
    (V.fromCornerPoints = function (e, n, i) {
      a.Check.typeOf.object('corner', e),
        a.Check.typeOf.object('oppositeCorner', n),
        t.defined(i) || (i = new V());
      var c = r.Cartesian3.midpoint(e, n, i.center);
      return (i.radius = r.Cartesian3.distance(c, n)), i;
    }),
    (V.fromEllipsoid = function (e, n) {
      return (
        a.Check.typeOf.object('ellipsoid', e),
        t.defined(n) || (n = new V()),
        r.Cartesian3.clone(r.Cartesian3.ZERO, n.center),
        (n.radius = e.maximumRadius),
        n
      );
    });
  var $ = new r.Cartesian3();
  V.fromBoundingSpheres = function (e, a) {
    if ((t.defined(a) || (a = new V()), !t.defined(e) || 0 === e.length))
      return (
        (a.center = r.Cartesian3.clone(r.Cartesian3.ZERO, a.center)),
        (a.radius = 0),
        a
      );
    var n = e.length;
    if (1 === n) return V.clone(e[0], a);
    if (2 === n) return V.union(e[0], e[1], a);
    var i,
      c = [];
    for (i = 0; i < n; i++) c.push(e[i].center);
    var o = (a = V.fromPoints(c, a)).center,
      u = a.radius;
    for (i = 0; i < n; i++) {
      var s = e[i];
      u = Math.max(u, r.Cartesian3.distance(o, s.center, $) + s.radius);
    }
    return (a.radius = u), a;
  };
  var ee = new r.Cartesian3(),
    te = new r.Cartesian3(),
    ae = new r.Cartesian3();
  (V.fromOrientedBoundingBox = function (e, n) {
    a.Check.defined('orientedBoundingBox', e), t.defined(n) || (n = new V());
    var i = e.halfAxes,
      c = l.getColumn(i, 0, ee),
      o = l.getColumn(i, 1, te),
      u = l.getColumn(i, 2, ae);
    return (
      r.Cartesian3.add(c, o, c),
      r.Cartesian3.add(c, u, c),
      (n.center = r.Cartesian3.clone(e.center, n.center)),
      (n.radius = r.Cartesian3.magnitude(c)),
      n
    );
  }),
    (V.clone = function (e, a) {
      if (t.defined(e))
        return t.defined(a)
          ? ((a.center = r.Cartesian3.clone(e.center, a.center)),
            (a.radius = e.radius),
            a)
          : new V(e.center, e.radius);
    }),
    (V.packedLength = 4),
    (V.pack = function (e, n, r) {
      a.Check.typeOf.object('value', e),
        a.Check.defined('array', n),
        (r = t.defaultValue(r, 0));
      var i = e.center;
      return (
        (n[r++] = i.x), (n[r++] = i.y), (n[r++] = i.z), (n[r] = e.radius), n
      );
    }),
    (V.unpack = function (e, n, r) {
      a.Check.defined('array', e),
        (n = t.defaultValue(n, 0)),
        t.defined(r) || (r = new V());
      var i = r.center;
      return (
        (i.x = e[n++]), (i.y = e[n++]), (i.z = e[n++]), (r.radius = e[n]), r
      );
    });
  var ne = new r.Cartesian3(),
    re = new r.Cartesian3();
  V.union = function (e, n, i) {
    a.Check.typeOf.object('left', e),
      a.Check.typeOf.object('right', n),
      t.defined(i) || (i = new V());
    var c = e.center,
      o = e.radius,
      u = n.center,
      s = n.radius,
      f = r.Cartesian3.subtract(u, c, ne),
      l = r.Cartesian3.magnitude(f);
    if (l + s <= o) return e.clone(i), i;
    if (l + o <= s) return n.clone(i), i;
    var C = 0.5 * (o + l + s),
      h = r.Cartesian3.multiplyByScalar(f, (-o + C) / l, re);
    return (
      r.Cartesian3.add(h, c, h),
      r.Cartesian3.clone(h, i.center),
      (i.radius = C),
      i
    );
  };
  var ie = new r.Cartesian3();
  (V.expand = function (e, t, n) {
    a.Check.typeOf.object('sphere', e),
      a.Check.typeOf.object('point', t),
      (n = V.clone(e, n));
    var i = r.Cartesian3.magnitude(r.Cartesian3.subtract(t, n.center, ie));
    return i > n.radius && (n.radius = i), n;
  }),
    (V.intersectPlane = function (e, t) {
      a.Check.typeOf.object('sphere', e), a.Check.typeOf.object('plane', t);
      var n = e.center,
        i = e.radius,
        c = t.normal,
        o = r.Cartesian3.dot(c, n) + t.distance;
      return o < -i ? s.OUTSIDE : o < i ? s.INTERSECTING : s.INSIDE;
    }),
    (V.transform = function (e, n, r) {
      return (
        a.Check.typeOf.object('sphere', e),
        a.Check.typeOf.object('transform', n),
        t.defined(r) || (r = new V()),
        (r.center = x.multiplyByPoint(n, e.center, r.center)),
        (r.radius = x.getMaximumScale(n) * e.radius),
        r
      );
    });
  var ce = new r.Cartesian3();
  (V.distanceSquaredTo = function (e, t) {
    a.Check.typeOf.object('sphere', e), a.Check.typeOf.object('cartesian', t);
    var n = r.Cartesian3.subtract(e.center, t, ce);
    return r.Cartesian3.magnitudeSquared(n) - e.radius * e.radius;
  }),
    (V.transformWithoutScale = function (e, n, r) {
      return (
        a.Check.typeOf.object('sphere', e),
        a.Check.typeOf.object('transform', n),
        t.defined(r) || (r = new V()),
        (r.center = x.multiplyByPoint(n, e.center, r.center)),
        (r.radius = e.radius),
        r
      );
    });
  var oe = new r.Cartesian3();
  V.computePlaneDistances = function (e, n, i, c) {
    a.Check.typeOf.object('sphere', e),
      a.Check.typeOf.object('position', n),
      a.Check.typeOf.object('direction', i),
      t.defined(c) || (c = new f());
    var o = r.Cartesian3.subtract(e.center, n, oe),
      u = r.Cartesian3.dot(i, o);
    return (c.start = u - e.radius), (c.stop = u + e.radius), c;
  };
  for (
    var ue = new r.Cartesian3(),
      se = new r.Cartesian3(),
      fe = new r.Cartesian3(),
      le = new r.Cartesian3(),
      Ce = new r.Cartesian3(),
      he = new r.Cartographic(),
      de = new Array(8),
      ye = 0;
    ye < 8;
    ++ye
  )
    de[ye] = new r.Cartesian3();
  var pe = new u();
  (V.projectTo2D = function (e, n, i) {
    a.Check.typeOf.object('sphere', e);
    var c,
      o = (n = t.defaultValue(n, pe)).ellipsoid,
      u = e.center,
      s = e.radius;
    c = r.Cartesian3.equals(u, r.Cartesian3.ZERO)
      ? r.Cartesian3.clone(r.Cartesian3.UNIT_X, ue)
      : o.geodeticSurfaceNormal(u, ue);
    var f = r.Cartesian3.cross(r.Cartesian3.UNIT_Z, c, se);
    r.Cartesian3.normalize(f, f);
    var l = r.Cartesian3.cross(c, f, fe);
    r.Cartesian3.normalize(l, l),
      r.Cartesian3.multiplyByScalar(c, s, c),
      r.Cartesian3.multiplyByScalar(l, s, l),
      r.Cartesian3.multiplyByScalar(f, s, f);
    var C = r.Cartesian3.negate(l, Ce),
      h = r.Cartesian3.negate(f, le),
      d = de,
      y = d[0];
    r.Cartesian3.add(c, l, y),
      r.Cartesian3.add(y, f, y),
      (y = d[1]),
      r.Cartesian3.add(c, l, y),
      r.Cartesian3.add(y, h, y),
      (y = d[2]),
      r.Cartesian3.add(c, C, y),
      r.Cartesian3.add(y, h, y),
      (y = d[3]),
      r.Cartesian3.add(c, C, y),
      r.Cartesian3.add(y, f, y),
      r.Cartesian3.negate(c, c),
      (y = d[4]),
      r.Cartesian3.add(c, l, y),
      r.Cartesian3.add(y, f, y),
      (y = d[5]),
      r.Cartesian3.add(c, l, y),
      r.Cartesian3.add(y, h, y),
      (y = d[6]),
      r.Cartesian3.add(c, C, y),
      r.Cartesian3.add(y, h, y),
      (y = d[7]),
      r.Cartesian3.add(c, C, y),
      r.Cartesian3.add(y, f, y);
    for (var p = d.length, O = 0; O < p; ++O) {
      var m = d[O];
      r.Cartesian3.add(u, m, m);
      var b = o.cartesianToCartographic(m, he);
      n.project(b, m);
    }
    var k = (u = (i = V.fromPoints(d, i)).center).x,
      x = u.y,
      j = u.z;
    return (u.x = j), (u.y = k), (u.z = x), i;
  }),
    (V.isOccluded = function (e, t) {
      return (
        a.Check.typeOf.object('sphere', e),
        a.Check.typeOf.object('occluder', t),
        !t.isBoundingSphereVisible(e)
      );
    }),
    (V.equals = function (e, a) {
      return (
        e === a ||
        (t.defined(e) &&
          t.defined(a) &&
          r.Cartesian3.equals(e.center, a.center) &&
          e.radius === a.radius)
      );
    }),
    (V.prototype.intersectPlane = function (e) {
      return V.intersectPlane(this, e);
    }),
    (V.prototype.distanceSquaredTo = function (e) {
      return V.distanceSquaredTo(this, e);
    }),
    (V.prototype.computePlaneDistances = function (e, t, a) {
      return V.computePlaneDistances(this, e, t, a);
    }),
    (V.prototype.isOccluded = function (e) {
      return V.isOccluded(this, e);
    }),
    (V.prototype.equals = function (e) {
      return V.equals(this, e);
    }),
    (V.prototype.clone = function (e) {
      return V.clone(this, e);
    }),
    (V.prototype.volume = function () {
      var e = this.radius;
      return G * e * e * e;
    }),
    (e.BoundingSphere = V),
    (e.GeographicProjection = u),
    (e.Intersect = s),
    (e.Interval = f),
    (e.Matrix3 = l),
    (e.Matrix4 = x);
});
