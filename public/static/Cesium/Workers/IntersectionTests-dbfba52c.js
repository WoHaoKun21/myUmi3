define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './BoundingSphere-c409f092',
], function (e, r, t, a, i, n) {
  var o = {};
  function s(e, r, t) {
    var i = e + r;
    return a.CesiumMath.sign(e) !== a.CesiumMath.sign(r) &&
      Math.abs(i / Math.max(Math.abs(e), Math.abs(r))) < t
      ? 0
      : i;
  }
  (o.computeDiscriminant = function (e, r, a) {
    if ('number' != typeof e)
      throw new t.DeveloperError('a is a required number.');
    if ('number' != typeof r)
      throw new t.DeveloperError('b is a required number.');
    if ('number' != typeof a)
      throw new t.DeveloperError('c is a required number.');
    return r * r - 4 * e * a;
  }),
    (o.computeRealRoots = function (e, r, i) {
      if ('number' != typeof e)
        throw new t.DeveloperError('a is a required number.');
      if ('number' != typeof r)
        throw new t.DeveloperError('b is a required number.');
      if ('number' != typeof i)
        throw new t.DeveloperError('c is a required number.');
      var n;
      if (0 === e) return 0 === r ? [] : [-i / r];
      if (0 === r) {
        if (0 === i) return [0, 0];
        var o = Math.abs(i),
          u = Math.abs(e);
        if (o < u && o / u < a.CesiumMath.EPSILON14) return [0, 0];
        if (u < o && u / o < a.CesiumMath.EPSILON14) return [];
        if ((n = -i / e) < 0) return [];
        var d = Math.sqrt(n);
        return [-d, d];
      }
      if (0 === i) return (n = -r / e) < 0 ? [n, 0] : [0, n];
      var f = s(r * r, -4 * e * i, a.CesiumMath.EPSILON14);
      if (f < 0) return [];
      var l =
        -0.5 *
        s(r, a.CesiumMath.sign(r) * Math.sqrt(f), a.CesiumMath.EPSILON14);
      return 0 < r ? [l / e, i / l] : [i / l, l / e];
    });
  var u = {};
  function d(e, r, t, a) {
    var i,
      n,
      o = e,
      s = r / 3,
      u = t / 3,
      d = a,
      f = o * u,
      l = s * d,
      h = s * s,
      m = u * u,
      p = o * u - h,
      c = o * d - s * u,
      C = s * d - m,
      w = 4 * p * C - c * c;
    if (w < 0) {
      var v,
        M,
        b,
        g =
          -((b =
            f * m <= h * l
              ? -2 * s * (M = p) + (v = o) * c
              : -(v = d) * c + 2 * u * (M = C)) < 0
            ? -1
            : 1) *
          Math.abs(v) *
          Math.sqrt(-w),
        q = (n = -b + g) / 2,
        E = q < 0 ? -Math.pow(-q, 1 / 3) : Math.pow(q, 1 / 3),
        y = n === g ? -E : -M / E;
      return (
        (i = M <= 0 ? E + y : -b / (E * E + y * y + M)),
        f * m <= h * l ? [(i - s) / o] : [-d / (i + u)]
      );
    }
    var D = p,
      R = -2 * s * p + o * c,
      S = C,
      O = -d * c + 2 * u * C,
      x = Math.sqrt(w),
      P = Math.sqrt(3) / 2,
      N = Math.abs(Math.atan2(o * x, -R) / 3);
    i = 2 * Math.sqrt(-D);
    var L = Math.cos(N);
    n = i * L;
    var I = i * (-L / 2 - P * Math.sin(N)),
      z = 2 * s < n + I ? n - s : I - s,
      T = o,
      U = z / T;
    N = Math.abs(Math.atan2(d * x, -O) / 3);
    var W = -d,
      B =
        (n = (i = 2 * Math.sqrt(-S)) * (L = Math.cos(N))) +
          (I = i * (-L / 2 - P * Math.sin(N))) <
        2 * u
          ? n + u
          : I + u,
      V = W / B,
      Z = -z * B - T * W,
      k = (u * Z - s * (z * W)) / (-s * Z + u * (T * B));
    return U <= k
      ? U <= V
        ? k <= V
          ? [U, k, V]
          : [U, V, k]
        : [V, U, k]
      : U <= V
      ? [k, U, V]
      : k <= V
      ? [k, V, U]
      : [V, k, U];
  }
  (u.computeDiscriminant = function (e, r, a, i) {
    if ('number' != typeof e)
      throw new t.DeveloperError('a is a required number.');
    if ('number' != typeof r)
      throw new t.DeveloperError('b is a required number.');
    if ('number' != typeof a)
      throw new t.DeveloperError('c is a required number.');
    if ('number' != typeof i)
      throw new t.DeveloperError('d is a required number.');
    var n = r * r,
      o = a * a;
    return (
      18 * e * r * a * i +
      n * o -
      e * e * 27 * (i * i) -
      4 * (e * o * a + n * r * i)
    );
  }),
    (u.computeRealRoots = function (e, r, a, i) {
      if ('number' != typeof e)
        throw new t.DeveloperError('a is a required number.');
      if ('number' != typeof r)
        throw new t.DeveloperError('b is a required number.');
      if ('number' != typeof a)
        throw new t.DeveloperError('c is a required number.');
      if ('number' != typeof i)
        throw new t.DeveloperError('d is a required number.');
      var n, s;
      if (0 === e) return o.computeRealRoots(r, a, i);
      if (0 !== r)
        return 0 === a
          ? 0 === i
            ? (s = -r / e) < 0
              ? [s, 0, 0]
              : [0, 0, s]
            : d(e, r, 0, i)
          : 0 === i
          ? 0 === (n = o.computeRealRoots(e, r, a)).length
            ? [0]
            : n[1] <= 0
            ? [n[0], n[1], 0]
            : 0 <= n[0]
            ? [0, n[0], n[1]]
            : [n[0], 0, n[1]]
          : d(e, r, a, i);
      if (0 !== a)
        return 0 === i
          ? 0 === (n = o.computeRealRoots(e, 0, a)).Length
            ? [0]
            : [n[0], 0, n[1]]
          : d(e, 0, a, i);
      if (0 === i) return [0, 0, 0];
      var u = (s = -i / e) < 0 ? -Math.pow(-s, 1 / 3) : Math.pow(s, 1 / 3);
      return [u, u, u];
    });
  var f = {};
  function l(e, r, t, i) {
    var n = e * e,
      s = r - (3 * n) / 8,
      d = t - (r * e) / 2 + (n * e) / 8,
      f = i - (t * e) / 4 + (r * n) / 16 - (3 * n * n) / 256,
      l = u.computeRealRoots(1, 2 * s, s * s - 4 * f, -d * d);
    if (0 < l.length) {
      var h = -e / 4,
        m = l[l.length - 1];
      if (Math.abs(m) < a.CesiumMath.EPSILON14) {
        var p = o.computeRealRoots(1, s, f);
        if (2 === p.length) {
          var c,
            C = p[0],
            w = p[1];
          if (0 <= C && 0 <= w) {
            var v = Math.sqrt(C),
              M = Math.sqrt(w);
            return [h - M, h - v, h + v, h + M];
          }
          if (0 <= C && w < 0) return [h - (c = Math.sqrt(C)), h + c];
          if (C < 0 && 0 <= w) return [h - (c = Math.sqrt(w)), h + c];
        }
        return [];
      }
      if (0 < m) {
        var b = Math.sqrt(m),
          g = (s + m - d / b) / 2,
          q = (s + m + d / b) / 2,
          E = o.computeRealRoots(1, b, g),
          y = o.computeRealRoots(1, -b, q);
        return 0 !== E.length
          ? ((E[0] += h),
            (E[1] += h),
            0 !== y.length
              ? ((y[0] += h),
                (y[1] += h),
                E[1] <= y[0]
                  ? [E[0], E[1], y[0], y[1]]
                  : y[1] <= E[0]
                  ? [y[0], y[1], E[0], E[1]]
                  : E[0] >= y[0] && E[1] <= y[1]
                  ? [y[0], E[0], E[1], y[1]]
                  : y[0] >= E[0] && y[1] <= E[1]
                  ? [E[0], y[0], y[1], E[1]]
                  : E[0] > y[0] && E[0] < y[1]
                  ? [y[0], E[0], y[1], E[1]]
                  : [E[0], y[0], E[1], y[1]])
              : E)
          : 0 !== y.length
          ? ((y[0] += h), (y[1] += h), y)
          : [];
      }
    }
    return [];
  }
  function h(e, r, t, i) {
    var n = e * e,
      s = -2 * r,
      d = t * e + r * r - 4 * i,
      f = n * i - t * r * e + t * t,
      l = u.computeRealRoots(1, s, d, f);
    if (0 < l.length) {
      var h,
        m,
        p,
        c,
        C,
        w,
        v = l[0],
        M = r - v,
        b = M * M,
        g = e / 2,
        q = M / 2,
        E = b - 4 * i,
        y = b + 4 * Math.abs(i),
        D = n - 4 * v,
        R = n + 4 * Math.abs(v);
      if (v < 0 || E * R < D * y) {
        var S = Math.sqrt(D);
        (h = S / 2), (m = 0 === S ? 0 : (e * q - t) / S);
      } else {
        var O = Math.sqrt(E);
        (h = 0 === O ? 0 : (e * q - t) / O), (m = O / 2);
      }
      0 === g && 0 === h
        ? (c = p = 0)
        : a.CesiumMath.sign(g) === a.CesiumMath.sign(h)
        ? (c = v / (p = g + h))
        : (p = v / (c = g - h)),
        0 === q && 0 === m
          ? (w = C = 0)
          : a.CesiumMath.sign(q) === a.CesiumMath.sign(m)
          ? (w = i / (C = q + m))
          : (C = i / (w = q - m));
      var x = o.computeRealRoots(1, p, C),
        P = o.computeRealRoots(1, c, w);
      if (0 !== x.length)
        return 0 !== P.length
          ? x[1] <= P[0]
            ? [x[0], x[1], P[0], P[1]]
            : P[1] <= x[0]
            ? [P[0], P[1], x[0], x[1]]
            : x[0] >= P[0] && x[1] <= P[1]
            ? [P[0], x[0], x[1], P[1]]
            : P[0] >= x[0] && P[1] <= x[1]
            ? [x[0], P[0], P[1], x[1]]
            : x[0] > P[0] && x[0] < P[1]
            ? [P[0], x[0], P[1], x[1]]
            : [x[0], P[0], x[1], P[1]]
          : x;
      if (0 !== P.length) return P;
    }
    return [];
  }
  function m(e, t) {
    (t = i.Cartesian3.clone(r.defaultValue(t, i.Cartesian3.ZERO))),
      i.Cartesian3.equals(t, i.Cartesian3.ZERO) || i.Cartesian3.normalize(t, t),
      (this.origin = i.Cartesian3.clone(r.defaultValue(e, i.Cartesian3.ZERO))),
      (this.direction = t);
  }
  (f.computeDiscriminant = function (e, r, a, i, n) {
    if ('number' != typeof e)
      throw new t.DeveloperError('a is a required number.');
    if ('number' != typeof r)
      throw new t.DeveloperError('b is a required number.');
    if ('number' != typeof a)
      throw new t.DeveloperError('c is a required number.');
    if ('number' != typeof i)
      throw new t.DeveloperError('d is a required number.');
    if ('number' != typeof n)
      throw new t.DeveloperError('e is a required number.');
    var o = e * e,
      s = r * r,
      u = s * r,
      d = a * a,
      f = d * a,
      l = i * i,
      h = l * i,
      m = n * n;
    return (
      s * d * l -
      4 * u * h -
      4 * e * f * l +
      18 * e * r * a * h -
      27 * o * l * l +
      o * e * 256 * (m * n) +
      n *
        (18 * u * a * i -
          4 * s * f +
          16 * e * d * d -
          80 * e * r * d * i -
          6 * e * s * l +
          144 * o * a * l) +
      m * (144 * e * s * a - 27 * s * s - 128 * o * d - 192 * o * r * i)
    );
  }),
    (f.computeRealRoots = function (e, r, i, n, o) {
      if ('number' != typeof e)
        throw new t.DeveloperError('a is a required number.');
      if ('number' != typeof r)
        throw new t.DeveloperError('b is a required number.');
      if ('number' != typeof i)
        throw new t.DeveloperError('c is a required number.');
      if ('number' != typeof n)
        throw new t.DeveloperError('d is a required number.');
      if ('number' != typeof o)
        throw new t.DeveloperError('e is a required number.');
      if (Math.abs(e) < a.CesiumMath.EPSILON15)
        return u.computeRealRoots(r, i, n, o);
      var s = r / e,
        d = i / e,
        f = n / e,
        m = o / e,
        p = s < 0 ? 1 : 0;
      switch (
        ((p += d < 0 ? p + 1 : p),
        (p += f < 0 ? p + 1 : p),
        (p += m < 0 ? p + 1 : p))
      ) {
        case 0:
        case 3:
        case 4:
        case 6:
        case 7:
        case 9:
        case 10:
        case 12:
        case 13:
        case 14:
        case 15:
          return l(s, d, f, m);
        case 1:
        case 2:
        case 5:
        case 8:
        case 11:
          return h(s, d, f, m);
        default:
          return;
      }
    }),
    (m.clone = function (e, t) {
      if (r.defined(e))
        return r.defined(t)
          ? ((t.origin = i.Cartesian3.clone(e.origin)),
            (t.direction = i.Cartesian3.clone(e.direction)),
            t)
          : new m(e.origin, e.direction);
    }),
    (m.getPoint = function (e, a, n) {
      return (
        t.Check.typeOf.object('ray', e),
        t.Check.typeOf.number('t', a),
        r.defined(n) || (n = new i.Cartesian3()),
        (n = i.Cartesian3.multiplyByScalar(e.direction, a, n)),
        i.Cartesian3.add(e.origin, n, n)
      );
    });
  var p = {
      rayPlane: function (e, n, o) {
        if (!r.defined(e)) throw new t.DeveloperError('ray is required.');
        if (!r.defined(n)) throw new t.DeveloperError('plane is required.');
        r.defined(o) || (o = new i.Cartesian3());
        var s = e.origin,
          u = e.direction,
          d = n.normal,
          f = i.Cartesian3.dot(d, u);
        if (!(Math.abs(f) < a.CesiumMath.EPSILON15)) {
          var l = (-n.distance - i.Cartesian3.dot(d, s)) / f;
          if (!(l < 0))
            return (
              (o = i.Cartesian3.multiplyByScalar(u, l, o)),
              i.Cartesian3.add(s, o, o)
            );
        }
      },
    },
    c = new i.Cartesian3(),
    C = new i.Cartesian3(),
    w = new i.Cartesian3(),
    v = new i.Cartesian3(),
    M = new i.Cartesian3();
  (p.rayTriangleParametric = function (e, n, o, s, u) {
    if (!r.defined(e)) throw new t.DeveloperError('ray is required.');
    if (!r.defined(n)) throw new t.DeveloperError('p0 is required.');
    if (!r.defined(o)) throw new t.DeveloperError('p1 is required.');
    if (!r.defined(s)) throw new t.DeveloperError('p2 is required.');
    u = r.defaultValue(u, !1);
    var d,
      f,
      l,
      h,
      m,
      p = e.origin,
      b = e.direction,
      g = i.Cartesian3.subtract(o, n, c),
      q = i.Cartesian3.subtract(s, n, C),
      E = i.Cartesian3.cross(b, q, w),
      y = i.Cartesian3.dot(g, E);
    if (u) {
      if (y < a.CesiumMath.EPSILON6) return;
      if (
        ((d = i.Cartesian3.subtract(p, n, v)),
        (l = i.Cartesian3.dot(d, E)) < 0 || y < l)
      )
        return;
      if (
        ((f = i.Cartesian3.cross(d, g, M)),
        (h = i.Cartesian3.dot(b, f)) < 0 || y < l + h)
      )
        return;
      m = i.Cartesian3.dot(q, f) / y;
    } else {
      if (Math.abs(y) < a.CesiumMath.EPSILON6) return;
      var D = 1 / y;
      if (
        ((d = i.Cartesian3.subtract(p, n, v)),
        (l = i.Cartesian3.dot(d, E) * D) < 0 || 1 < l)
      )
        return;
      if (
        ((f = i.Cartesian3.cross(d, g, M)),
        (h = i.Cartesian3.dot(b, f) * D) < 0 || 1 < l + h)
      )
        return;
      m = i.Cartesian3.dot(q, f) * D;
    }
    return m;
  }),
    (p.rayTriangle = function (e, t, a, n, o, s) {
      var u = p.rayTriangleParametric(e, t, a, n, o);
      if (r.defined(u) && !(u < 0))
        return (
          r.defined(s) || (s = new i.Cartesian3()),
          i.Cartesian3.multiplyByScalar(e.direction, u, s),
          i.Cartesian3.add(e.origin, s, s)
        );
    });
  var b = new m();
  p.lineSegmentTriangle = function (e, a, n, o, s, u, d) {
    if (!r.defined(e)) throw new t.DeveloperError('v0 is required.');
    if (!r.defined(a)) throw new t.DeveloperError('v1 is required.');
    if (!r.defined(n)) throw new t.DeveloperError('p0 is required.');
    if (!r.defined(o)) throw new t.DeveloperError('p1 is required.');
    if (!r.defined(s)) throw new t.DeveloperError('p2 is required.');
    var f = b;
    i.Cartesian3.clone(e, f.origin),
      i.Cartesian3.subtract(a, e, f.direction),
      i.Cartesian3.normalize(f.direction, f.direction);
    var l = p.rayTriangleParametric(f, n, o, s, u);
    if (!(!r.defined(l) || l < 0 || l > i.Cartesian3.distance(e, a)))
      return (
        r.defined(d) || (d = new i.Cartesian3()),
        i.Cartesian3.multiplyByScalar(f.direction, l, d),
        i.Cartesian3.add(f.origin, d, d)
      );
  };
  var g = { root0: 0, root1: 0 };
  function q(e, t, a) {
    r.defined(a) || (a = new n.Interval());
    var o = e.origin,
      s = e.direction,
      u = t.center,
      d = t.radius * t.radius,
      f = i.Cartesian3.subtract(o, u, w),
      l = (function (e, r, t, a) {
        var i = r * r - 4 * e * t;
        if (!(i < 0)) {
          if (0 < i) {
            var n = 1 / (2 * e),
              o = Math.sqrt(i),
              s = (-r + o) * n,
              u = (-r - o) * n;
            return (
              (a.root1 = s < u ? ((a.root0 = s), u) : ((a.root0 = u), s)), a
            );
          }
          var d = -r / (2 * e);
          if (0 !== d) return (a.root0 = a.root1 = d), a;
        }
      })(
        i.Cartesian3.dot(s, s),
        2 * i.Cartesian3.dot(s, f),
        i.Cartesian3.magnitudeSquared(f) - d,
        g,
      );
    if (r.defined(l)) return (a.start = l.root0), (a.stop = l.root1), a;
  }
  p.raySphere = function (e, a, i) {
    if (!r.defined(e)) throw new t.DeveloperError('ray is required.');
    if (!r.defined(a)) throw new t.DeveloperError('sphere is required.');
    if (((i = q(e, a, i)), r.defined(i) && !(i.stop < 0)))
      return (i.start = Math.max(i.start, 0)), i;
  };
  var E = new m();
  p.lineSegmentSphere = function (e, a, n, o) {
    if (!r.defined(e)) throw new t.DeveloperError('p0 is required.');
    if (!r.defined(a)) throw new t.DeveloperError('p1 is required.');
    if (!r.defined(n)) throw new t.DeveloperError('sphere is required.');
    var s = E;
    i.Cartesian3.clone(e, s.origin);
    var u = i.Cartesian3.subtract(a, e, s.direction),
      d = i.Cartesian3.magnitude(u);
    if (
      (i.Cartesian3.normalize(u, u),
      (o = q(s, n, o)),
      !(!r.defined(o) || o.stop < 0 || o.start > d))
    )
      return (
        (o.start = Math.max(o.start, 0)), (o.stop = Math.min(o.stop, d)), o
      );
  };
  var y = new i.Cartesian3(),
    D = new i.Cartesian3();
  function R(e, r, t) {
    var i = e + r;
    return a.CesiumMath.sign(e) !== a.CesiumMath.sign(r) &&
      Math.abs(i / Math.max(Math.abs(e), Math.abs(r))) < t
      ? 0
      : i;
  }
  p.rayEllipsoid = function (e, a) {
    if (!r.defined(e)) throw new t.DeveloperError('ray is required.');
    if (!r.defined(a)) throw new t.DeveloperError('ellipsoid is required.');
    var o,
      s,
      u,
      d,
      f,
      l = a.oneOverRadii,
      h = i.Cartesian3.multiplyComponents(l, e.origin, y),
      m = i.Cartesian3.multiplyComponents(l, e.direction, D),
      p = i.Cartesian3.magnitudeSquared(h),
      c = i.Cartesian3.dot(h, m);
    if (1 < p) {
      if (0 <= c) return;
      var C = c * c;
      if (((o = p - 1), C < (u = (s = i.Cartesian3.magnitudeSquared(m)) * o)))
        return;
      if (u < C) {
        d = c * c - u;
        var w = (f = -c + Math.sqrt(d)) / s,
          v = o / f;
        return w < v ? new n.Interval(w, v) : { start: v, stop: w };
      }
      var M = Math.sqrt(o / s);
      return new n.Interval(M, M);
    }
    return p < 1
      ? ((o = p - 1),
        (d = c * c - (u = (s = i.Cartesian3.magnitudeSquared(m)) * o)),
        (f = -c + Math.sqrt(d)),
        new n.Interval(0, f / s))
      : c < 0
      ? ((s = i.Cartesian3.magnitudeSquared(m)), new n.Interval(0, -c / s))
      : void 0;
  };
  var S = new i.Cartesian3(),
    O = new i.Cartesian3(),
    x = new i.Cartesian3(),
    P = new i.Cartesian3(),
    N = new i.Cartesian3(),
    L = new n.Matrix3(),
    I = new n.Matrix3(),
    z = new n.Matrix3(),
    T = new n.Matrix3(),
    U = new n.Matrix3(),
    W = new n.Matrix3(),
    B = new n.Matrix3(),
    V = new i.Cartesian3(),
    Z = new i.Cartesian3(),
    k = new i.Cartographic();
  p.grazingAltitudeLocation = function (e, s) {
    if (!r.defined(e)) throw new t.DeveloperError('ray is required.');
    if (!r.defined(s)) throw new t.DeveloperError('ellipsoid is required.');
    var u = e.origin,
      d = e.direction;
    if (!i.Cartesian3.equals(u, i.Cartesian3.ZERO)) {
      var l = s.geodeticSurfaceNormal(u, S);
      if (0 <= i.Cartesian3.dot(d, l)) return u;
    }
    var h = r.defined(this.rayEllipsoid(e, s)),
      m = s.transformPositionToScaledSpace(d, S),
      p = i.Cartesian3.normalize(m, m),
      c = i.Cartesian3.mostOrthogonalAxis(m, P),
      C = i.Cartesian3.normalize(i.Cartesian3.cross(c, p, O), O),
      w = i.Cartesian3.normalize(i.Cartesian3.cross(p, C, x), x),
      v = L;
    (v[0] = p.x),
      (v[1] = p.y),
      (v[2] = p.z),
      (v[3] = C.x),
      (v[4] = C.y),
      (v[5] = C.z),
      (v[6] = w.x),
      (v[7] = w.y),
      (v[8] = w.z);
    var M = n.Matrix3.transpose(v, I),
      b = n.Matrix3.fromScale(s.radii, z),
      g = n.Matrix3.fromScale(s.oneOverRadii, T),
      q = U;
    (q[0] = 0),
      (q[1] = -d.z),
      (q[2] = d.y),
      (q[3] = d.z),
      (q[4] = 0),
      (q[5] = -d.x),
      (q[6] = -d.y),
      (q[7] = d.x),
      (q[8] = 0);
    var E,
      y,
      D = n.Matrix3.multiply(n.Matrix3.multiply(M, g, W), q, W),
      A = n.Matrix3.multiply(n.Matrix3.multiply(D, b, B), v, B),
      j = n.Matrix3.multiplyByVector(D, u, N),
      F = (function (e, r, t, s, u) {
        var d,
          l = 1 * (e[n.Matrix3.COLUMN1ROW1] - e[n.Matrix3.COLUMN2ROW2]),
          h =
            1 *
            (0 *
              R(
                e[n.Matrix3.COLUMN1ROW0],
                e[n.Matrix3.COLUMN0ROW1],
                a.CesiumMath.EPSILON15,
              ) +
              r.y),
          m =
            0 * e[n.Matrix3.COLUMN0ROW0] +
            1 * e[n.Matrix3.COLUMN2ROW2] +
            0 * r.x +
            0,
          p =
            1 *
            R(
              e[n.Matrix3.COLUMN2ROW1],
              e[n.Matrix3.COLUMN1ROW2],
              a.CesiumMath.EPSILON15,
            ),
          c =
            1 *
            (0 * R(e[n.Matrix3.COLUMN2ROW0], e[n.Matrix3.COLUMN0ROW2]) + r.z),
          C = [];
        if (0 === c && 0 === p) {
          if (0 === (d = o.computeRealRoots(l, h, m)).length) return C;
          var w = d[0],
            v = Math.sqrt(Math.max(1 - w * w, 0));
          if (
            (C.push(new i.Cartesian3(0, 1 * w, 1 * -v)),
            C.push(new i.Cartesian3(0, 1 * w, 1 * v)),
            2 === d.length)
          ) {
            var M = d[1],
              b = Math.sqrt(Math.max(1 - M * M, 0));
            C.push(new i.Cartesian3(0, 1 * M, 1 * -b)),
              C.push(new i.Cartesian3(0, 1 * M, 1 * b));
          }
          return C;
        }
        var g = c * c,
          q = p * p,
          E = c * p,
          y = l * l + q,
          D = 2 * (h * l + E),
          S = 2 * m * l + h * h - q + g,
          O = 2 * (m * h - E),
          x = m * m - g;
        if (0 === y && 0 === D && 0 === S && 0 === O) return C;
        var P = (d = f.computeRealRoots(y, D, S, O, x)).length;
        if (0 === P) return C;
        for (var N = 0; N < P; ++N) {
          var L = d[N],
            I = L * L,
            z = Math.max(1 - I, 0),
            T = Math.sqrt(z),
            U =
              (a.CesiumMath.sign(l) === a.CesiumMath.sign(m)
                ? R(l * I + m, h * L, a.CesiumMath.EPSILON12)
                : a.CesiumMath.sign(m) === a.CesiumMath.sign(h * L)
                ? R(l * I, h * L + m, a.CesiumMath.EPSILON12)
                : R(l * I + h * L, m, a.CesiumMath.EPSILON12)) *
              R(p * L, c, a.CesiumMath.EPSILON15);
          U < 0
            ? C.push(new i.Cartesian3(0, 1 * L, 1 * T))
            : 0 < U
            ? C.push(new i.Cartesian3(0, 1 * L, 1 * -T))
            : 0 !== T
            ? (C.push(new i.Cartesian3(0, 1 * L, 1 * -T)),
              C.push(new i.Cartesian3(0, 1 * L, 1 * T)),
              ++N)
            : C.push(new i.Cartesian3(0, 1 * L, 1 * T));
        }
        return C;
      })(A, i.Cartesian3.negate(j, S)),
      G = F.length;
    if (0 < G) {
      for (
        var Y = i.Cartesian3.clone(i.Cartesian3.ZERO, Z),
          _ = Number.NEGATIVE_INFINITY,
          H = 0;
        H < G;
        ++H
      ) {
        E = n.Matrix3.multiplyByVector(
          b,
          n.Matrix3.multiplyByVector(v, F[H], V),
          V,
        );
        var J = i.Cartesian3.normalize(i.Cartesian3.subtract(E, u, P), P),
          K = i.Cartesian3.dot(J, d);
        _ < K && ((_ = K), (Y = i.Cartesian3.clone(E, Y)));
      }
      var Q = s.cartesianToCartographic(Y, k);
      return (
        (_ = a.CesiumMath.clamp(_, 0, 1)),
        (y =
          i.Cartesian3.magnitude(i.Cartesian3.subtract(Y, u, P)) *
          Math.sqrt(1 - _ * _)),
        (y = h ? -y : y),
        (Q.height = y),
        s.cartographicToCartesian(Q, new i.Cartesian3())
      );
    }
  };
  var A = new i.Cartesian3();
  (p.lineSegmentPlane = function (e, n, o, s) {
    if (!r.defined(e)) throw new t.DeveloperError('endPoint0 is required.');
    if (!r.defined(n)) throw new t.DeveloperError('endPoint1 is required.');
    if (!r.defined(o)) throw new t.DeveloperError('plane is required.');
    r.defined(s) || (s = new i.Cartesian3());
    var u = i.Cartesian3.subtract(n, e, A),
      d = o.normal,
      f = i.Cartesian3.dot(d, u);
    if (!(Math.abs(f) < a.CesiumMath.EPSILON6)) {
      var l = i.Cartesian3.dot(d, e),
        h = -(o.distance + l) / f;
      if (!(h < 0 || 1 < h))
        return (
          i.Cartesian3.multiplyByScalar(u, h, s), i.Cartesian3.add(e, s, s), s
        );
    }
  }),
    (p.trianglePlaneIntersection = function (e, a, n, o) {
      if (!(r.defined(e) && r.defined(a) && r.defined(n) && r.defined(o)))
        throw new t.DeveloperError('p0, p1, p2, and plane are required.');
      var s,
        u,
        d = o.normal,
        f = o.distance,
        l = i.Cartesian3.dot(d, e) + f < 0,
        h = i.Cartesian3.dot(d, a) + f < 0,
        m = i.Cartesian3.dot(d, n) + f < 0,
        c = 0;
      if (
        ((c += l ? 1 : 0),
        (c += h ? 1 : 0),
        (1 !== (c += m ? 1 : 0) && 2 !== c) ||
          ((s = new i.Cartesian3()), (u = new i.Cartesian3())),
        1 === c)
      ) {
        if (l)
          return (
            p.lineSegmentPlane(e, a, o, s),
            p.lineSegmentPlane(e, n, o, u),
            { positions: [e, a, n, s, u], indices: [0, 3, 4, 1, 2, 4, 1, 4, 3] }
          );
        if (h)
          return (
            p.lineSegmentPlane(a, n, o, s),
            p.lineSegmentPlane(a, e, o, u),
            { positions: [e, a, n, s, u], indices: [1, 3, 4, 2, 0, 4, 2, 4, 3] }
          );
        if (m)
          return (
            p.lineSegmentPlane(n, e, o, s),
            p.lineSegmentPlane(n, a, o, u),
            { positions: [e, a, n, s, u], indices: [2, 3, 4, 0, 1, 4, 0, 4, 3] }
          );
      } else if (2 === c) {
        if (!l)
          return (
            p.lineSegmentPlane(a, e, o, s),
            p.lineSegmentPlane(n, e, o, u),
            { positions: [e, a, n, s, u], indices: [1, 2, 4, 1, 4, 3, 0, 3, 4] }
          );
        if (!h)
          return (
            p.lineSegmentPlane(n, a, o, s),
            p.lineSegmentPlane(e, a, o, u),
            { positions: [e, a, n, s, u], indices: [2, 0, 4, 2, 4, 3, 1, 3, 4] }
          );
        if (!m)
          return (
            p.lineSegmentPlane(e, n, o, s),
            p.lineSegmentPlane(a, n, o, u),
            { positions: [e, a, n, s, u], indices: [0, 1, 4, 0, 4, 3, 2, 3, 4] }
          );
      }
    }),
    (e.IntersectionTests = p),
    (e.Ray = m);
});
