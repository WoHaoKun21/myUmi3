define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './Cartesian4-5af5bb24',
  './RuntimeError-ba10bc3e',
  './FeatureDetection-7bd32c34',
  './buildModuleUrl-392763e2',
], function (e, t, r, n, a, i, o, s, l, u, d) {
  function f(e, r, n, a) {
    (this.x = t.defaultValue(e, 0)),
      (this.y = t.defaultValue(r, 0)),
      (this.z = t.defaultValue(n, 0)),
      (this.w = t.defaultValue(a, 0));
  }
  var c = new a.Cartesian3();
  f.fromAxisAngle = function (e, n, i) {
    r.Check.typeOf.object('axis', e), r.Check.typeOf.number('angle', n);
    var o = n / 2,
      s = Math.sin(o),
      l = (c = a.Cartesian3.normalize(e, c)).x * s,
      u = c.y * s,
      d = c.z * s,
      h = Math.cos(o);
    return t.defined(i)
      ? ((i.x = l), (i.y = u), (i.z = d), (i.w = h), i)
      : new f(l, u, d, h);
  };
  var h = [1, 2, 0],
    p = new Array(3);
  f.fromRotationMatrix = function (e, n) {
    var a, i, s, l, u;
    r.Check.typeOf.object('matrix', e);
    var d = e[o.Matrix3.COLUMN0ROW0],
      c = e[o.Matrix3.COLUMN1ROW1],
      w = e[o.Matrix3.COLUMN2ROW2],
      m = d + c + w;
    if (0 < m)
      (u = 0.5 * (a = Math.sqrt(m + 1))),
        (a = 0.5 / a),
        (i = (e[o.Matrix3.COLUMN1ROW2] - e[o.Matrix3.COLUMN2ROW1]) * a),
        (s = (e[o.Matrix3.COLUMN2ROW0] - e[o.Matrix3.COLUMN0ROW2]) * a),
        (l = (e[o.Matrix3.COLUMN0ROW1] - e[o.Matrix3.COLUMN1ROW0]) * a);
    else {
      var y = 0;
      d < c && (y = 1), d < w && c < w && (y = 2);
      var C = h[y],
        x = h[C];
      a = Math.sqrt(
        e[o.Matrix3.getElementIndex(y, y)] -
          e[o.Matrix3.getElementIndex(C, C)] -
          e[o.Matrix3.getElementIndex(x, x)] +
          1,
      );
      var O = p;
      (O[y] = 0.5 * a),
        (a = 0.5 / a),
        (u =
          (e[o.Matrix3.getElementIndex(x, C)] -
            e[o.Matrix3.getElementIndex(C, x)]) *
          a),
        (O[C] =
          (e[o.Matrix3.getElementIndex(C, y)] +
            e[o.Matrix3.getElementIndex(y, C)]) *
          a),
        (O[x] =
          (e[o.Matrix3.getElementIndex(x, y)] +
            e[o.Matrix3.getElementIndex(y, x)]) *
          a),
        (i = -O[0]),
        (s = -O[1]),
        (l = -O[2]);
    }
    return t.defined(n)
      ? ((n.x = i), (n.y = s), (n.z = l), (n.w = u), n)
      : new f(i, s, l, u);
  };
  var w = new f(),
    m = new f(),
    y = new f(),
    C = new f();
  f.fromHeadingPitchRoll = function (e, t) {
    return (
      r.Check.typeOf.object('headingPitchRoll', e),
      (C = f.fromAxisAngle(a.Cartesian3.UNIT_X, e.roll, w)),
      (y = f.fromAxisAngle(a.Cartesian3.UNIT_Y, -e.pitch, t)),
      (t = f.multiply(y, C, y)),
      (m = f.fromAxisAngle(a.Cartesian3.UNIT_Z, -e.heading, w)),
      f.multiply(m, t, t)
    );
  };
  var x = new a.Cartesian3(),
    O = new a.Cartesian3(),
    E = new f(),
    D = new f(),
    v = new f();
  (f.packedLength = 4),
    (f.pack = function (e, n, a) {
      return (
        r.Check.typeOf.object('value', e),
        r.Check.defined('array', n),
        (a = t.defaultValue(a, 0)),
        (n[a++] = e.x),
        (n[a++] = e.y),
        (n[a++] = e.z),
        (n[a] = e.w),
        n
      );
    }),
    (f.unpack = function (e, n, a) {
      return (
        r.Check.defined('array', e),
        (n = t.defaultValue(n, 0)),
        t.defined(a) || (a = new f()),
        (a.x = e[n]),
        (a.y = e[n + 1]),
        (a.z = e[n + 2]),
        (a.w = e[n + 3]),
        a
      );
    }),
    (f.packedInterpolationLength = 3),
    (f.convertPackedArrayForInterpolation = function (e, t, r, n) {
      f.unpack(e, 4 * r, v), f.conjugate(v, v);
      for (var a = 0, i = r - t + 1; a < i; a++) {
        var o = 3 * a;
        f.unpack(e, 4 * (t + a), E),
          f.multiply(E, v, E),
          E.w < 0 && f.negate(E, E),
          f.computeAxis(E, x);
        var s = f.computeAngle(E);
        (n[o] = x.x * s), (n[o + 1] = x.y * s), (n[o + 2] = x.z * s);
      }
    }),
    (f.unpackInterpolationResult = function (e, r, n, i, o) {
      t.defined(o) || (o = new f()), a.Cartesian3.fromArray(e, 0, O);
      var s = a.Cartesian3.magnitude(O);
      return (
        f.unpack(r, 4 * i, D),
        0 === s ? f.clone(f.IDENTITY, E) : f.fromAxisAngle(O, s, E),
        f.multiply(E, D, o)
      );
    }),
    (f.clone = function (e, r) {
      if (t.defined(e))
        return t.defined(r)
          ? ((r.x = e.x), (r.y = e.y), (r.z = e.z), (r.w = e.w), r)
          : new f(e.x, e.y, e.z, e.w);
    }),
    (f.conjugate = function (e, t) {
      return (
        r.Check.typeOf.object('quaternion', e),
        r.Check.typeOf.object('result', t),
        (t.x = -e.x),
        (t.y = -e.y),
        (t.z = -e.z),
        (t.w = e.w),
        t
      );
    }),
    (f.magnitudeSquared = function (e) {
      return (
        r.Check.typeOf.object('quaternion', e),
        e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w
      );
    }),
    (f.magnitude = function (e) {
      return Math.sqrt(f.magnitudeSquared(e));
    }),
    (f.normalize = function (e, t) {
      r.Check.typeOf.object('result', t);
      var n = 1 / f.magnitude(e),
        a = e.x * n,
        i = e.y * n,
        o = e.z * n,
        s = e.w * n;
      return (t.x = a), (t.y = i), (t.z = o), (t.w = s), t;
    }),
    (f.inverse = function (e, t) {
      r.Check.typeOf.object('result', t);
      var n = f.magnitudeSquared(e);
      return (t = f.conjugate(e, t)), f.multiplyByScalar(t, 1 / n, t);
    }),
    (f.add = function (e, t, n) {
      return (
        r.Check.typeOf.object('left', e),
        r.Check.typeOf.object('right', t),
        r.Check.typeOf.object('result', n),
        (n.x = e.x + t.x),
        (n.y = e.y + t.y),
        (n.z = e.z + t.z),
        (n.w = e.w + t.w),
        n
      );
    }),
    (f.subtract = function (e, t, n) {
      return (
        r.Check.typeOf.object('left', e),
        r.Check.typeOf.object('right', t),
        r.Check.typeOf.object('result', n),
        (n.x = e.x - t.x),
        (n.y = e.y - t.y),
        (n.z = e.z - t.z),
        (n.w = e.w - t.w),
        n
      );
    }),
    (f.negate = function (e, t) {
      return (
        r.Check.typeOf.object('quaternion', e),
        r.Check.typeOf.object('result', t),
        (t.x = -e.x),
        (t.y = -e.y),
        (t.z = -e.z),
        (t.w = -e.w),
        t
      );
    }),
    (f.dot = function (e, t) {
      return (
        r.Check.typeOf.object('left', e),
        r.Check.typeOf.object('right', t),
        e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w
      );
    }),
    (f.multiply = function (e, t, n) {
      r.Check.typeOf.object('left', e),
        r.Check.typeOf.object('right', t),
        r.Check.typeOf.object('result', n);
      var a = e.x,
        i = e.y,
        o = e.z,
        s = e.w,
        l = t.x,
        u = t.y,
        d = t.z,
        f = t.w,
        c = s * l + a * f + i * d - o * u,
        h = s * u - a * d + i * f + o * l,
        p = s * d + a * u - i * l + o * f,
        w = s * f - a * l - i * u - o * d;
      return (n.x = c), (n.y = h), (n.z = p), (n.w = w), n;
    }),
    (f.multiplyByVec = function (e, t, r) {
      var n = new a.Cartesian3(),
        i = new a.Cartesian3(),
        o = new a.Cartesian3(e.x, e.y, e.z);
      (n = a.Cartesian3.cross(o, t, n)), (i = a.Cartesian3.cross(o, n, i));
      var s = new a.Cartesian3();
      s = a.Cartesian3.multiplyByScalar(n, 2 * e.w, s);
      var l = new a.Cartesian3();
      return (
        (l = a.Cartesian3.multiplyByScalar(n, 2, l)),
        (r = a.Cartesian3.add(t, s, r)),
        a.Cartesian3.add(r, l, r)
      );
    }),
    (f.multiplyByScalar = function (e, t, n) {
      return (
        r.Check.typeOf.object('quaternion', e),
        r.Check.typeOf.number('scalar', t),
        r.Check.typeOf.object('result', n),
        (n.x = e.x * t),
        (n.y = e.y * t),
        (n.z = e.z * t),
        (n.w = e.w * t),
        n
      );
    }),
    (f.divideByScalar = function (e, t, n) {
      return (
        r.Check.typeOf.object('quaternion', e),
        r.Check.typeOf.number('scalar', t),
        r.Check.typeOf.object('result', n),
        (n.x = e.x / t),
        (n.y = e.y / t),
        (n.z = e.z / t),
        (n.w = e.w / t),
        n
      );
    }),
    (f.computeAxis = function (e, t) {
      r.Check.typeOf.object('quaternion', e),
        r.Check.typeOf.object('result', t);
      var a = e.w;
      if (Math.abs(a - 1) < n.CesiumMath.EPSILON6)
        return (t.x = t.y = t.z = 0), t;
      var i = 1 / Math.sqrt(1 - a * a);
      return (t.x = e.x * i), (t.y = e.y * i), (t.z = e.z * i), t;
    }),
    (f.computeAngle = function (e) {
      return (
        r.Check.typeOf.object('quaternion', e),
        Math.abs(e.w - 1) < n.CesiumMath.EPSILON6 ? 0 : 2 * Math.acos(e.w)
      );
    });
  var _ = new f();
  f.lerp = function (e, t, n, a) {
    return (
      r.Check.typeOf.object('start', e),
      r.Check.typeOf.object('end', t),
      r.Check.typeOf.number('t', n),
      r.Check.typeOf.object('result', a),
      (_ = f.multiplyByScalar(t, n, _)),
      (a = f.multiplyByScalar(e, 1 - n, a)),
      f.add(_, a, a)
    );
  };
  var M = new f(),
    S = new f(),
    T = new f();
  (f.slerp = function (e, t, a, i) {
    r.Check.typeOf.object('start', e),
      r.Check.typeOf.object('end', t),
      r.Check.typeOf.number('t', a),
      r.Check.typeOf.object('result', i);
    var o = f.dot(e, t),
      s = t;
    if (
      (o < 0 && ((o = -o), (s = M = f.negate(t, M))),
      1 - o < n.CesiumMath.EPSILON6)
    )
      return f.lerp(e, s, a, i);
    var l = Math.acos(o);
    return (
      (S = f.multiplyByScalar(e, Math.sin((1 - a) * l), S)),
      (T = f.multiplyByScalar(s, Math.sin(a * l), T)),
      (i = f.add(S, T, i)),
      f.multiplyByScalar(i, 1 / Math.sin(l), i)
    );
  }),
    (f.log = function (e, t) {
      r.Check.typeOf.object('quaternion', e),
        r.Check.typeOf.object('result', t);
      var i = n.CesiumMath.acosClamped(e.w),
        o = 0;
      return (
        0 !== i && (o = i / Math.sin(i)), a.Cartesian3.multiplyByScalar(e, o, t)
      );
    }),
    (f.exp = function (e, t) {
      r.Check.typeOf.object('cartesian', e), r.Check.typeOf.object('result', t);
      var n = a.Cartesian3.magnitude(e),
        i = 0;
      return (
        0 !== n && (i = Math.sin(n) / n),
        (t.x = e.x * i),
        (t.y = e.y * i),
        (t.z = e.z * i),
        (t.w = Math.cos(n)),
        t
      );
    });
  var g = new a.Cartesian3(),
    P = new a.Cartesian3(),
    b = new f(),
    N = new f();
  (f.computeInnerQuadrangle = function (e, t, n, i) {
    r.Check.typeOf.object('q0', e),
      r.Check.typeOf.object('q1', t),
      r.Check.typeOf.object('q2', n),
      r.Check.typeOf.object('result', i);
    var o = f.conjugate(t, b);
    f.multiply(o, n, N);
    var s = f.log(N, g);
    f.multiply(o, e, N);
    var l = f.log(N, P);
    return (
      a.Cartesian3.add(s, l, s),
      a.Cartesian3.multiplyByScalar(s, 0.25, s),
      a.Cartesian3.negate(s, s),
      f.exp(s, b),
      f.multiply(t, b, i)
    );
  }),
    (f.squad = function (e, t, n, a, i, o) {
      r.Check.typeOf.object('q0', e),
        r.Check.typeOf.object('q1', t),
        r.Check.typeOf.object('s0', n),
        r.Check.typeOf.object('s1', a),
        r.Check.typeOf.number('t', i),
        r.Check.typeOf.object('result', o);
      var s = f.slerp(e, t, i, b),
        l = f.slerp(n, a, i, N);
      return f.slerp(s, l, 2 * i * (1 - i), o);
    });
  for (
    var R = new f(),
      I = 1.9011074535173003,
      q = u.FeatureDetection.supportsTypedArrays() ? new Float32Array(8) : [],
      A = u.FeatureDetection.supportsTypedArrays() ? new Float32Array(8) : [],
      U = u.FeatureDetection.supportsTypedArrays() ? new Float32Array(8) : [],
      k = u.FeatureDetection.supportsTypedArrays() ? new Float32Array(8) : [],
      j = 0;
    j < 7;
    ++j
  ) {
    var z = j + 1,
      F = 2 * z + 1;
    (q[j] = 1 / (z * F)), (A[j] = z / F);
  }
  function W(e, t, n) {
    r.Check.defined('array', e),
      r.Check.defined('itemToFind', t),
      r.Check.defined('comparator', n);
    for (var a, i, o = 0, s = e.length - 1; o <= s; )
      if ((i = n(e[(a = ~~((o + s) / 2))], t)) < 0) o = a + 1;
      else {
        if (!(0 < i)) return a;
        s = a - 1;
      }
    return ~(s + 1);
  }
  function L(e, t, r, n, a) {
    (this.xPoleWander = e),
      (this.yPoleWander = t),
      (this.xPoleOffset = r),
      (this.yPoleOffset = n),
      (this.ut1MinusUtc = a);
  }
  function V() {
    var e = arguments,
      t = 0,
      r = e[t++],
      n = function (e, t, r, n) {
        r || (r = ' ');
        var a = e.length >= t ? '' : Array((1 + t - e.length) >>> 0).join(r);
        return n ? e + a : a + e;
      },
      a = function (e, t, r, a, i, o) {
        var s = a - e.length;
        return (
          0 < s &&
            (e =
              r || !i
                ? n(e, a, o, r)
                : e.slice(0, t.length) + n('', s, '0', !0) + e.slice(t.length)),
          e
        );
      },
      i = function (e, t, r, i, o, s, l) {
        var u = e >>> 0;
        return (
          (e =
            (r = (r && u && { 2: '0b', 8: '0', 16: '0x' }[t]) || '') +
            n(u.toString(t), s || 0, '0', !1)),
          a(e, r, i, o, l)
        );
      },
      o = function (e, t, r, n, i, o) {
        return null != n && (e = e.slice(0, n)), a(e, '', t, r, i, o);
      };
    return r.replace(
      /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g,
      function (r, s, l, u, d, f, c) {
        var h, p, w, m, y;
        if ('%%' == r) return '%';
        for (
          var C = !1, x = '', O = !1, E = !1, D = ' ', v = l.length, _ = 0;
          l && _ < v;
          _++
        )
          switch (l.charAt(_)) {
            case ' ':
              x = ' ';
              break;
            case '+':
              x = '+';
              break;
            case '-':
              C = !0;
              break;
            case "'":
              D = l.charAt(_ + 1);
              break;
            case '0':
              O = !0;
              break;
            case '#':
              E = !0;
          }
        if (
          ((u = u
            ? '*' == u
              ? +e[t++]
              : '*' == u.charAt(0)
              ? +e[u.slice(1, -1)]
              : +u
            : 0) < 0 && ((u = -u), (C = !0)),
          !isFinite(u))
        )
          throw new Error('sprintf: (minimum-)width must be finite');
        switch (
          ((f = f
            ? '*' == f
              ? +e[t++]
              : '*' == f.charAt(0)
              ? +e[f.slice(1, -1)]
              : +f
            : -1 < 'fFeE'.indexOf(c)
            ? 6
            : 'd' == c
            ? 0
            : void 0),
          (y = s ? e[s.slice(0, -1)] : e[t++]),
          c)
        ) {
          case 's':
            return o(String(y), C, u, f, O, D);
          case 'c':
            return o(String.fromCharCode(+y), C, u, f, O);
          case 'b':
            return i(y, 2, E, C, u, f, O);
          case 'o':
            return i(y, 8, E, C, u, f, O);
          case 'x':
            return i(y, 16, E, C, u, f, O);
          case 'X':
            return i(y, 16, E, C, u, f, O).toUpperCase();
          case 'u':
            return i(y, 10, E, C, u, f, O);
          case 'i':
          case 'd':
            return (
              (h = +y || 0),
              (y =
                (p = (h = Math.round(h - (h % 1))) < 0 ? '-' : x) +
                n(String(Math.abs(h)), f, '0', !1)),
              a(y, p, C, u, O)
            );
          case 'e':
          case 'E':
          case 'f':
          case 'F':
          case 'g':
          case 'G':
            return (
              (p = (h = +y) < 0 ? '-' : x),
              (w = ['toExponential', 'toFixed', 'toPrecision'][
                'efg'.indexOf(c.toLowerCase())
              ]),
              (m = ['toString', 'toUpperCase']['eEfFgG'.indexOf(c) % 2]),
              (y = p + Math.abs(h)[w](f)),
              a(y, p, C, u, O)[m]()
            );
          default:
            return r;
        }
      },
    );
  }
  function Y(e, t, r, n, a, i, o, s) {
    (this.year = e),
      (this.month = t),
      (this.day = r),
      (this.hour = n),
      (this.minute = a),
      (this.second = i),
      (this.millisecond = o),
      (this.isLeapSecond = s);
  }
  function B(e) {
    if (null === e || isNaN(e))
      throw new r.DeveloperError('year is required and must be a number.');
    return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
  }
  function G(e, t) {
    (this.julianDate = e), (this.offset = t);
  }
  (q[7] = I / 136),
    (A[7] = (8 * I) / 17),
    (f.fastSlerp = function (e, t, n, a) {
      r.Check.typeOf.object('start', e),
        r.Check.typeOf.object('end', t),
        r.Check.typeOf.number('t', n),
        r.Check.typeOf.object('result', a);
      var i,
        o = f.dot(e, t);
      0 <= o ? (i = 1) : ((i = -1), (o = -o));
      for (var s = o - 1, l = 1 - n, u = n * n, d = l * l, c = 7; 0 <= c; --c)
        (U[c] = (q[c] * u - A[c]) * s), (k[c] = (q[c] * d - A[c]) * s);
      var h =
          i *
          n *
          (1 +
            U[0] *
              (1 +
                U[1] *
                  (1 +
                    U[2] *
                      (1 +
                        U[3] *
                          (1 + U[4] * (1 + U[5] * (1 + U[6] * (1 + U[7])))))))),
        p =
          l *
          (1 +
            k[0] *
              (1 +
                k[1] *
                  (1 +
                    k[2] *
                      (1 +
                        k[3] *
                          (1 + k[4] * (1 + k[5] * (1 + k[6] * (1 + k[7])))))))),
        w = f.multiplyByScalar(e, p, R);
      return f.multiplyByScalar(t, h, a), f.add(w, a, a);
    }),
    (f.fastSquad = function (e, t, n, a, i, o) {
      r.Check.typeOf.object('q0', e),
        r.Check.typeOf.object('q1', t),
        r.Check.typeOf.object('s0', n),
        r.Check.typeOf.object('s1', a),
        r.Check.typeOf.number('t', i),
        r.Check.typeOf.object('result', o);
      var s = f.fastSlerp(e, t, i, b),
        l = f.fastSlerp(n, a, i, N);
      return f.fastSlerp(s, l, 2 * i * (1 - i), o);
    }),
    (f.equals = function (e, r) {
      return (
        e === r ||
        (t.defined(e) &&
          t.defined(r) &&
          e.x === r.x &&
          e.y === r.y &&
          e.z === r.z &&
          e.w === r.w)
      );
    }),
    (f.equalsEpsilon = function (e, n, a) {
      return (
        r.Check.typeOf.number('epsilon', a),
        e === n ||
          (t.defined(e) &&
            t.defined(n) &&
            Math.abs(e.x - n.x) <= a &&
            Math.abs(e.y - n.y) <= a &&
            Math.abs(e.z - n.z) <= a &&
            Math.abs(e.w - n.w) <= a)
      );
    }),
    (f.ZERO = Object.freeze(new f(0, 0, 0, 0))),
    (f.IDENTITY = Object.freeze(new f(0, 0, 0, 1))),
    (f.prototype.clone = function (e) {
      return f.clone(this, e);
    }),
    (f.prototype.equals = function (e) {
      return f.equals(this, e);
    }),
    (f.prototype.equalsEpsilon = function (e, t) {
      return f.equalsEpsilon(this, e, t);
    }),
    (f.prototype.toString = function () {
      return '(' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ')';
    });
  var Z = Object.freeze({
      SECONDS_PER_MILLISECOND: 0.001,
      SECONDS_PER_MINUTE: 60,
      MINUTES_PER_HOUR: 60,
      HOURS_PER_DAY: 24,
      SECONDS_PER_HOUR: 3600,
      MINUTES_PER_DAY: 1440,
      SECONDS_PER_DAY: 86400,
      DAYS_PER_JULIAN_CENTURY: 36525,
      PICOSECOND: 1e-9,
      MODIFIED_JULIAN_DATE_DIFFERENCE: 2400000.5,
    }),
    X = Object.freeze({ UTC: 0, TAI: 1 }),
    J = new Y(),
    H = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function $(e, t) {
    return he.compare(e.julianDate, t.julianDate);
  }
  var Q = new G();
  function K(e) {
    Q.julianDate = e;
    var t = he.leapSeconds,
      r = W(t, Q, $);
    r < 0 && (r = ~r), r >= t.length && (r = t.length - 1);
    var n = t[r].offset;
    0 < r &&
      n < he.secondsDifference(t[r].julianDate, e) &&
      (n = t[--r].offset),
      he.addSeconds(e, n, e);
  }
  function ee(e, t) {
    Q.julianDate = e;
    var r = he.leapSeconds,
      n = W(r, Q, $);
    if ((n < 0 && (n = ~n), 0 === n)) return he.addSeconds(e, -r[0].offset, t);
    if (n >= r.length) return he.addSeconds(e, -r[n - 1].offset, t);
    var a = he.secondsDifference(r[n].julianDate, e);
    return 0 === a
      ? he.addSeconds(e, -r[n].offset, t)
      : a <= 1
      ? void 0
      : he.addSeconds(e, -r[--n].offset, t);
  }
  function te(e, t, r) {
    var n = (t / Z.SECONDS_PER_DAY) | 0;
    return (
      (e += n),
      (t -= Z.SECONDS_PER_DAY * n) < 0 && (e--, (t += Z.SECONDS_PER_DAY)),
      (r.dayNumber = e),
      (r.secondsOfDay = t),
      r
    );
  }
  function re(e, t, r, n, a, i, o) {
    var s = ((t - 14) / 12) | 0,
      l = e + 4800 + s,
      u =
        (((1461 * l) / 4) | 0) +
        (((367 * (t - 2 - 12 * s)) / 12) | 0) -
        (((3 * (((l + 100) / 100) | 0)) / 4) | 0) +
        r -
        32075;
    (n -= 12) < 0 && (n += 24);
    var d =
      i +
      (n * Z.SECONDS_PER_HOUR +
        a * Z.SECONDS_PER_MINUTE +
        o * Z.SECONDS_PER_MILLISECOND);
    return 43200 <= d && (u -= 1), [u, d];
  }
  var ne = /^(\d{4})$/,
    ae = /^(\d{4})-(\d{2})$/,
    ie = /^(\d{4})-?(\d{3})$/,
    oe = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,
    se = /^(\d{4})-?(\d{2})-?(\d{2})$/,
    le = /([Z+\-])?(\d{2})?:?(\d{2})?$/,
    ue = /^(\d{2})(\.\d+)?/.source + le.source,
    de = /^(\d{2}):?(\d{2})(\.\d+)?/.source + le.source,
    fe = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + le.source,
    ce = 'Invalid ISO 8601 date.';
  function he(e, r, n) {
    (this.dayNumber = void 0),
      (this.secondsOfDay = void 0),
      (e = t.defaultValue(e, 0)),
      (r = t.defaultValue(r, 0)),
      (n = t.defaultValue(n, X.UTC));
    var a = 0 | e;
    te(a, (r += (e - a) * Z.SECONDS_PER_DAY), this), n === X.UTC && K(this);
  }
  (he.fromGregorianDate = function (e, n) {
    if (!(e instanceof Y))
      throw new r.DeveloperError('date must be a valid GregorianDate.');
    var a = re(
      e.year,
      e.month,
      e.day,
      e.hour,
      e.minute,
      e.second,
      e.millisecond,
    );
    return t.defined(n)
      ? (te(a[0], a[1], n), K(n), n)
      : new he(a[0], a[1], X.UTC);
  }),
    (he.fromDate = function (e, n) {
      if (!(e instanceof Date) || isNaN(e.getTime()))
        throw new r.DeveloperError('date must be a valid JavaScript Date.');
      var a = re(
        e.getUTCFullYear(),
        e.getUTCMonth() + 1,
        e.getUTCDate(),
        e.getUTCHours(),
        e.getUTCMinutes(),
        e.getUTCSeconds(),
        e.getUTCMilliseconds(),
      );
      return t.defined(n)
        ? (te(a[0], a[1], n), K(n), n)
        : new he(a[0], a[1], X.UTC);
    }),
    (he.fromIso8601 = function (e, n) {
      if ('string' != typeof e) throw new r.DeveloperError(ce);
      var a,
        i,
        o,
        s,
        l,
        u = (e = e.replace(',', '.')).split('T'),
        d = 1,
        f = 1,
        c = 0,
        h = 0,
        p = 0,
        w = 0,
        m = u[0],
        y = u[1];
      if (!t.defined(m)) throw new r.DeveloperError(ce);
      if (null !== (u = m.match(se))) {
        if (0 < (s = m.split('-').length - 1) && 2 !== s)
          throw new r.DeveloperError(ce);
        (a = +u[1]), (d = +u[2]), (f = +u[3]);
      } else if (null !== (u = m.match(ae))) (a = +u[1]), (d = +u[2]);
      else if (null !== (u = m.match(ne))) a = +u[1];
      else {
        var C;
        if (null !== (u = m.match(ie))) {
          if (
            ((a = +u[1]),
            (C = +u[2]),
            (o = B(a)),
            C < 1 || (o && 366 < C) || (!o && 365 < C))
          )
            throw new r.DeveloperError(ce);
        } else {
          if (null === (u = m.match(oe))) throw new r.DeveloperError(ce);
          a = +u[1];
          var x = +u[2],
            O = +u[3] || 0;
          if (
            0 < (s = m.split('-').length - 1) &&
            ((!t.defined(u[3]) && 1 !== s) || (t.defined(u[3]) && 2 !== s))
          )
            throw new r.DeveloperError(ce);
          C = 7 * x + O - new Date(Date.UTC(a, 0, 4)).getUTCDay() - 3;
        }
        (i = new Date(Date.UTC(a, 0, 1))).setUTCDate(C),
          (d = i.getUTCMonth() + 1),
          (f = i.getUTCDate());
      }
      if (
        ((o = B(a)),
        d < 1 ||
          12 < d ||
          f < 1 ||
          ((2 !== d || !o) && H[d - 1] < f) ||
          (o && 2 === d && 29 < f))
      )
        throw new r.DeveloperError(ce);
      if (t.defined(y)) {
        if (null !== (u = y.match(fe))) {
          if (0 < (s = y.split(':').length - 1) && 2 !== s && 3 !== s)
            throw new r.DeveloperError(ce);
          (c = +u[1]),
            (h = +u[2]),
            (p = +u[3]),
            (w = 1e3 * +(u[4] || 0)),
            (l = 5);
        } else if (null !== (u = y.match(de))) {
          if (2 < (s = y.split(':').length - 1)) throw new r.DeveloperError(ce);
          (c = +u[1]), (h = +u[2]), (p = 60 * +(u[3] || 0)), (l = 4);
        } else {
          if (null === (u = y.match(ue))) throw new r.DeveloperError(ce);
          (c = +u[1]), (h = 60 * +(u[2] || 0)), (l = 3);
        }
        if (
          60 <= h ||
          61 <= p ||
          24 < c ||
          (24 === c && (0 < h || 0 < p || 0 < w))
        )
          throw new r.DeveloperError(ce);
        var E = u[l],
          D = +u[l + 1],
          v = +(u[l + 2] || 0);
        switch (E) {
          case '+':
            (c -= D), (h -= v);
            break;
          case '-':
            (c += D), (h += v);
            break;
          case 'Z':
            break;
          default:
            h += new Date(Date.UTC(a, d - 1, f, c, h)).getTimezoneOffset();
        }
      }
      var _ = 60 === p;
      for (_ && p--; 60 <= h; ) (h -= 60), c++;
      for (; 24 <= c; ) (c -= 24), f++;
      for (i = o && 2 === d ? 29 : H[d - 1]; i < f; )
        (f -= i),
          12 < ++d && ((d -= 12), a++),
          (i = o && 2 === d ? 29 : H[d - 1]);
      for (; h < 0; ) (h += 60), c--;
      for (; c < 0; ) (c += 24), f--;
      for (; f < 1; )
        --d < 1 && ((d += 12), a--), (f += i = o && 2 === d ? 29 : H[d - 1]);
      var M = re(a, d, f, c, h, p, w);
      return (
        t.defined(n)
          ? (te(M[0], M[1], n), K(n))
          : (n = new he(M[0], M[1], X.UTC)),
        _ && he.addSeconds(n, 1, n),
        n
      );
    }),
    (he.now = function (e) {
      return he.fromDate(new Date(), e);
    });
  var pe = new he(0, 0, X.TAI);
  function we(e) {
    if (
      ((e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)),
      (this._dates = void 0),
      (this._samples = void 0),
      (this._dateColumn = -1),
      (this._xPoleWanderRadiansColumn = -1),
      (this._yPoleWanderRadiansColumn = -1),
      (this._ut1MinusUtcSecondsColumn = -1),
      (this._xCelestialPoleOffsetRadiansColumn = -1),
      (this._yCelestialPoleOffsetRadiansColumn = -1),
      (this._taiMinusUtcSecondsColumn = -1),
      (this._columnCount = 0),
      (this._lastIndex = -1),
      (this._downloadPromise = void 0),
      (this._dataError = void 0),
      (this._addNewLeapSeconds = t.defaultValue(e.addNewLeapSeconds, !0)),
      t.defined(e.data))
    )
      ye(this, e.data);
    else if (t.defined(e.url)) {
      var r = d.Resource.createIfNeeded(e.url),
        n = this;
      this._downloadPromise = t.when(
        r.fetchJson(),
        function (e) {
          ye(n, e);
        },
        function () {
          n._dataError =
            'An error occurred while retrieving the EOP data from the URL ' +
            r.url +
            '.';
        },
      );
    } else
      ye(this, {
        columnNames: [
          'dateIso8601',
          'modifiedJulianDateUtc',
          'xPoleWanderRadians',
          'yPoleWanderRadians',
          'ut1MinusUtcSeconds',
          'lengthOfDayCorrectionSeconds',
          'xCelestialPoleOffsetRadians',
          'yCelestialPoleOffsetRadians',
          'taiMinusUtcSeconds',
        ],
        samples: [],
      });
  }
  function me(e, t) {
    return he.compare(e.julianDate, t);
  }
  function ye(e, r) {
    if (t.defined(r.columnNames))
      if (t.defined(r.samples)) {
        var n = r.columnNames.indexOf('modifiedJulianDateUtc'),
          a = r.columnNames.indexOf('xPoleWanderRadians'),
          i = r.columnNames.indexOf('yPoleWanderRadians'),
          o = r.columnNames.indexOf('ut1MinusUtcSeconds'),
          s = r.columnNames.indexOf('xCelestialPoleOffsetRadians'),
          l = r.columnNames.indexOf('yCelestialPoleOffsetRadians'),
          u = r.columnNames.indexOf('taiMinusUtcSeconds');
        if (n < 0 || a < 0 || i < 0 || o < 0 || s < 0 || l < 0 || u < 0)
          e._dataError =
            'Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns';
        else {
          var d,
            f = (e._samples = r.samples),
            c = (e._dates = []);
          (e._dateColumn = n),
            (e._xPoleWanderRadiansColumn = a),
            (e._yPoleWanderRadiansColumn = i),
            (e._ut1MinusUtcSecondsColumn = o),
            (e._xCelestialPoleOffsetRadiansColumn = s),
            (e._yCelestialPoleOffsetRadiansColumn = l),
            (e._taiMinusUtcSecondsColumn = u),
            (e._columnCount = r.columnNames.length),
            (e._lastIndex = void 0);
          for (
            var h = e._addNewLeapSeconds, p = 0, w = f.length;
            p < w;
            p += e._columnCount
          ) {
            var m = f[p + n],
              y = f[p + u],
              C = new he(m + Z.MODIFIED_JULIAN_DATE_DIFFERENCE, y, X.TAI);
            if ((c.push(C), h)) {
              if (y !== d && t.defined(d)) {
                var x = he.leapSeconds,
                  O = W(x, C, me);
                if (O < 0) {
                  var E = new G(C, y);
                  x.splice(~O, 0, E);
                }
              }
              d = y;
            }
          }
        }
      } else
        e._dataError =
          'Error in loaded EOP data: The samples property is required.';
    else
      e._dataError =
        'Error in loaded EOP data: The columnNames property is required.';
  }
  function Ce(e, t, r, n, a) {
    var i = r * n;
    (a.xPoleWander = t[i + e._xPoleWanderRadiansColumn]),
      (a.yPoleWander = t[i + e._yPoleWanderRadiansColumn]),
      (a.xPoleOffset = t[i + e._xCelestialPoleOffsetRadiansColumn]),
      (a.yPoleOffset = t[i + e._yCelestialPoleOffsetRadiansColumn]),
      (a.ut1MinusUtc = t[i + e._ut1MinusUtcSecondsColumn]);
  }
  function xe(e, t, r) {
    return t + e * (r - t);
  }
  function Oe(e, t, r, n, a, i, o) {
    var s = e._columnCount;
    if (i > t.length - 1)
      return (
        (o.xPoleWander = 0),
        (o.yPoleWander = 0),
        (o.xPoleOffset = 0),
        (o.yPoleOffset = 0),
        (o.ut1MinusUtc = 0),
        o
      );
    var l = t[a],
      u = t[i];
    if (l.equals(u) || n.equals(l)) return Ce(e, r, a, s, o), o;
    if (n.equals(u)) return Ce(e, r, i, s, o), o;
    var d = he.secondsDifference(n, l) / he.secondsDifference(u, l),
      f = a * s,
      c = i * s,
      h = r[f + e._ut1MinusUtcSecondsColumn],
      p = r[c + e._ut1MinusUtcSecondsColumn],
      w = p - h;
    if (0.5 < w || w < -0.5) {
      var m = r[f + e._taiMinusUtcSecondsColumn],
        y = r[c + e._taiMinusUtcSecondsColumn];
      m !== y && (u.equals(n) ? (h = p) : (p -= y - m));
    }
    return (
      (o.xPoleWander = xe(
        d,
        r[f + e._xPoleWanderRadiansColumn],
        r[c + e._xPoleWanderRadiansColumn],
      )),
      (o.yPoleWander = xe(
        d,
        r[f + e._yPoleWanderRadiansColumn],
        r[c + e._yPoleWanderRadiansColumn],
      )),
      (o.xPoleOffset = xe(
        d,
        r[f + e._xCelestialPoleOffsetRadiansColumn],
        r[c + e._xCelestialPoleOffsetRadiansColumn],
      )),
      (o.yPoleOffset = xe(
        d,
        r[f + e._yCelestialPoleOffsetRadiansColumn],
        r[c + e._yCelestialPoleOffsetRadiansColumn],
      )),
      (o.ut1MinusUtc = xe(d, h, p)),
      o
    );
  }
  function Ee(e, r, n) {
    (this.heading = t.defaultValue(e, 0)),
      (this.pitch = t.defaultValue(r, 0)),
      (this.roll = t.defaultValue(n, 0));
  }
  function De(e, t, r) {
    (this.x = e), (this.y = t), (this.s = r);
  }
  function ve(e) {
    (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)),
      (this._xysFileUrlTemplate = d.Resource.createIfNeeded(
        e.xysFileUrlTemplate,
      )),
      (this._interpolationOrder = t.defaultValue(e.interpolationOrder, 9)),
      (this._sampleZeroJulianEphemerisDate = t.defaultValue(
        e.sampleZeroJulianEphemerisDate,
        2442396.5,
      )),
      (this._sampleZeroDateTT = new he(
        this._sampleZeroJulianEphemerisDate,
        0,
        X.TAI,
      )),
      (this._stepSizeDays = t.defaultValue(e.stepSizeDays, 1)),
      (this._samplesPerXysFile = t.defaultValue(e.samplesPerXysFile, 1e3)),
      (this._totalSamples = t.defaultValue(e.totalSamples, 27426)),
      (this._samples = new Array(3 * this._totalSamples)),
      (this._chunkDownloadsInProgress = []);
    for (
      var r = this._interpolationOrder,
        n = (this._denominators = new Array(r + 1)),
        a = (this._xTable = new Array(r + 1)),
        i = Math.pow(this._stepSizeDays, r),
        o = 0;
      o <= r;
      ++o
    ) {
      (n[o] = i), (a[o] = o * this._stepSizeDays);
      for (var s = 0; s <= r; ++s) s !== o && (n[o] *= o - s);
      n[o] = 1 / n[o];
    }
    (this._work = new Array(r + 1)), (this._coef = new Array(r + 1));
  }
  (he.toGregorianDate = function (e, n) {
    if (!t.defined(e)) throw new r.DeveloperError('julianDate is required.');
    var a = !1,
      i = ee(e, pe);
    t.defined(i) || (he.addSeconds(e, -1, pe), (i = ee(pe, pe)), (a = !0));
    var o = i.dayNumber,
      s = i.secondsOfDay;
    43200 <= s && (o += 1);
    var l = (o + 68569) | 0,
      u = ((4 * l) / 146097) | 0,
      d =
        ((4e3 * (1 + (l = (l - (((146097 * u + 3) / 4) | 0)) | 0))) / 1461001) |
        0,
      f = ((80 * (l = (l - (((1461 * d) / 4) | 0) + 31) | 0)) / 2447) | 0,
      c = (l - (((2447 * f) / 80) | 0)) | 0,
      h = (f + 2 - 12 * (l = (f / 11) | 0)) | 0,
      p = (100 * (u - 49) + d + l) | 0,
      w = (s / Z.SECONDS_PER_HOUR) | 0,
      m = s - w * Z.SECONDS_PER_HOUR,
      y = (m / Z.SECONDS_PER_MINUTE) | 0,
      C = 0 | (m -= y * Z.SECONDS_PER_MINUTE),
      x = (m - C) / Z.SECONDS_PER_MILLISECOND;
    return (
      23 < (w += 12) && (w -= 24),
      a && (C += 1),
      t.defined(n)
        ? ((n.year = p),
          (n.month = h),
          (n.day = c),
          (n.hour = w),
          (n.minute = y),
          (n.second = C),
          (n.millisecond = x),
          (n.isLeapSecond = a),
          n)
        : new Y(p, h, c, w, y, C, x, a)
    );
  }),
    (he.toDate = function (e) {
      if (!t.defined(e)) throw new r.DeveloperError('julianDate is required.');
      var n = he.toGregorianDate(e, J),
        a = n.second;
      return (
        n.isLeapSecond && (a -= 1),
        new Date(
          Date.UTC(
            n.year,
            n.month - 1,
            n.day,
            n.hour,
            n.minute,
            a,
            n.millisecond,
          ),
        )
      );
    }),
    (he.toIso8601 = function (e, n) {
      if (!t.defined(e)) throw new r.DeveloperError('julianDate is required.');
      var a = he.toGregorianDate(e, J),
        i = a.year,
        o = a.month,
        s = a.day,
        l = a.hour,
        u = a.minute,
        d = a.second,
        f = a.millisecond;
      return (
        1e4 === i &&
          1 === o &&
          1 === s &&
          0 === l &&
          0 === u &&
          0 === d &&
          0 === f &&
          ((i = 9999), (o = 12), (s = 31), (l = 24)),
        t.defined(n) || 0 === f
          ? t.defined(n) && 0 !== n
            ? V(
                '%04d-%02d-%02dT%02d:%02d:%02d.%sZ',
                i,
                o,
                s,
                l,
                u,
                d,
                (0.01 * f).toFixed(n).replace('.', '').slice(0, n),
              )
            : V('%04d-%02d-%02dT%02d:%02d:%02dZ', i, o, s, l, u, d)
          : V(
              '%04d-%02d-%02dT%02d:%02d:%02d.%sZ',
              i,
              o,
              s,
              l,
              u,
              d,
              (0.01 * f).toString().replace('.', ''),
            )
      );
    }),
    (he.clone = function (e, r) {
      if (t.defined(e))
        return t.defined(r)
          ? ((r.dayNumber = e.dayNumber), (r.secondsOfDay = e.secondsOfDay), r)
          : new he(e.dayNumber, e.secondsOfDay, X.TAI);
    }),
    (he.compare = function (e, n) {
      if (!t.defined(e)) throw new r.DeveloperError('left is required.');
      if (!t.defined(n)) throw new r.DeveloperError('right is required.');
      var a = e.dayNumber - n.dayNumber;
      return 0 !== a ? a : e.secondsOfDay - n.secondsOfDay;
    }),
    (he.equals = function (e, r) {
      return (
        e === r ||
        (t.defined(e) &&
          t.defined(r) &&
          e.dayNumber === r.dayNumber &&
          e.secondsOfDay === r.secondsOfDay)
      );
    }),
    (he.equalsEpsilon = function (e, n, a) {
      if (!t.defined(a)) throw new r.DeveloperError('epsilon is required.');
      return (
        e === n ||
        (t.defined(e) &&
          t.defined(n) &&
          Math.abs(he.secondsDifference(e, n)) <= a)
      );
    }),
    (he.totalDays = function (e) {
      if (!t.defined(e)) throw new r.DeveloperError('julianDate is required.');
      return e.dayNumber + e.secondsOfDay / Z.SECONDS_PER_DAY;
    }),
    (he.secondsDifference = function (e, n) {
      if (!t.defined(e)) throw new r.DeveloperError('left is required.');
      if (!t.defined(n)) throw new r.DeveloperError('right is required.');
      return (
        (e.dayNumber - n.dayNumber) * Z.SECONDS_PER_DAY +
        (e.secondsOfDay - n.secondsOfDay)
      );
    }),
    (he.daysDifference = function (e, n) {
      if (!t.defined(e)) throw new r.DeveloperError('left is required.');
      if (!t.defined(n)) throw new r.DeveloperError('right is required.');
      return (
        e.dayNumber -
        n.dayNumber +
        (e.secondsOfDay - n.secondsOfDay) / Z.SECONDS_PER_DAY
      );
    }),
    (he.computeTaiMinusUtc = function (e) {
      Q.julianDate = e;
      var t = he.leapSeconds,
        r = W(t, Q, $);
      return r < 0 && ((r = ~r), --r < 0 && (r = 0)), t[r].offset;
    }),
    (he.addSeconds = function (e, n, a) {
      if (!t.defined(e)) throw new r.DeveloperError('julianDate is required.');
      if (!t.defined(n)) throw new r.DeveloperError('seconds is required.');
      if (!t.defined(a)) throw new r.DeveloperError('result is required.');
      return te(e.dayNumber, e.secondsOfDay + n, a);
    }),
    (he.addMinutes = function (e, n, a) {
      if (!t.defined(e)) throw new r.DeveloperError('julianDate is required.');
      if (!t.defined(n)) throw new r.DeveloperError('minutes is required.');
      if (!t.defined(a)) throw new r.DeveloperError('result is required.');
      var i = e.secondsOfDay + n * Z.SECONDS_PER_MINUTE;
      return te(e.dayNumber, i, a);
    }),
    (he.addHours = function (e, n, a) {
      if (!t.defined(e)) throw new r.DeveloperError('julianDate is required.');
      if (!t.defined(n)) throw new r.DeveloperError('hours is required.');
      if (!t.defined(a)) throw new r.DeveloperError('result is required.');
      var i = e.secondsOfDay + n * Z.SECONDS_PER_HOUR;
      return te(e.dayNumber, i, a);
    }),
    (he.addDays = function (e, n, a) {
      if (!t.defined(e)) throw new r.DeveloperError('julianDate is required.');
      if (!t.defined(n)) throw new r.DeveloperError('days is required.');
      if (!t.defined(a)) throw new r.DeveloperError('result is required.');
      return te(e.dayNumber + n, e.secondsOfDay, a);
    }),
    (he.lessThan = function (e, t) {
      return he.compare(e, t) < 0;
    }),
    (he.lessThanOrEquals = function (e, t) {
      return he.compare(e, t) <= 0;
    }),
    (he.greaterThan = function (e, t) {
      return 0 < he.compare(e, t);
    }),
    (he.greaterThanOrEquals = function (e, t) {
      return 0 <= he.compare(e, t);
    }),
    (he.prototype.clone = function (e) {
      return he.clone(this, e);
    }),
    (he.prototype.equals = function (e) {
      return he.equals(this, e);
    }),
    (he.prototype.equalsEpsilon = function (e, t) {
      return he.equalsEpsilon(this, e, t);
    }),
    (he.prototype.toString = function () {
      return he.toIso8601(this);
    }),
    (he.leapSeconds = [
      new G(new he(2441317, 43210, X.TAI), 10),
      new G(new he(2441499, 43211, X.TAI), 11),
      new G(new he(2441683, 43212, X.TAI), 12),
      new G(new he(2442048, 43213, X.TAI), 13),
      new G(new he(2442413, 43214, X.TAI), 14),
      new G(new he(2442778, 43215, X.TAI), 15),
      new G(new he(2443144, 43216, X.TAI), 16),
      new G(new he(2443509, 43217, X.TAI), 17),
      new G(new he(2443874, 43218, X.TAI), 18),
      new G(new he(2444239, 43219, X.TAI), 19),
      new G(new he(2444786, 43220, X.TAI), 20),
      new G(new he(2445151, 43221, X.TAI), 21),
      new G(new he(2445516, 43222, X.TAI), 22),
      new G(new he(2446247, 43223, X.TAI), 23),
      new G(new he(2447161, 43224, X.TAI), 24),
      new G(new he(2447892, 43225, X.TAI), 25),
      new G(new he(2448257, 43226, X.TAI), 26),
      new G(new he(2448804, 43227, X.TAI), 27),
      new G(new he(2449169, 43228, X.TAI), 28),
      new G(new he(2449534, 43229, X.TAI), 29),
      new G(new he(2450083, 43230, X.TAI), 30),
      new G(new he(2450630, 43231, X.TAI), 31),
      new G(new he(2451179, 43232, X.TAI), 32),
      new G(new he(2453736, 43233, X.TAI), 33),
      new G(new he(2454832, 43234, X.TAI), 34),
      new G(new he(2456109, 43235, X.TAI), 35),
      new G(new he(2457204, 43236, X.TAI), 36),
      new G(new he(2457754, 43237, X.TAI), 37),
    ]),
    (we.NONE = Object.freeze({
      getPromiseToLoad: function () {
        return t.when();
      },
      compute: function (e, r) {
        return (
          t.defined(r)
            ? ((r.xPoleWander = 0),
              (r.yPoleWander = 0),
              (r.xPoleOffset = 0),
              (r.yPoleOffset = 0),
              (r.ut1MinusUtc = 0))
            : (r = new L(0, 0, 0, 0, 0)),
          r
        );
      },
    })),
    (we.prototype.getPromiseToLoad = function () {
      return t.when(this._downloadPromise);
    }),
    (we.prototype.compute = function (e, r) {
      if (t.defined(this._samples)) {
        if (
          (t.defined(r) || (r = new L(0, 0, 0, 0, 0)),
          0 === this._samples.length)
        )
          return (
            (r.xPoleWander = 0),
            (r.yPoleWander = 0),
            (r.xPoleOffset = 0),
            (r.yPoleOffset = 0),
            (r.ut1MinusUtc = 0),
            r
          );
        var n = this._dates,
          a = this._lastIndex,
          i = 0,
          o = 0;
        if (t.defined(a)) {
          var s = n[a],
            u = n[a + 1],
            d = he.lessThanOrEquals(s, e),
            f = !t.defined(u),
            c = f || he.greaterThanOrEquals(u, e);
          if (d && c)
            return (
              (i = a),
              !f && u.equals(e) && ++i,
              (o = i + 1),
              Oe(this, n, this._samples, e, i, o, r),
              r
            );
        }
        var h = W(n, e, he.compare, this._dateColumn);
        return (
          0 <= h
            ? (h < n.length - 1 && n[h + 1].equals(e) && ++h, (o = i = h))
            : (i = (o = ~h) - 1) < 0 && (i = 0),
          (this._lastIndex = i),
          Oe(this, n, this._samples, e, i, o, r),
          r
        );
      }
      if (t.defined(this._dataError)) throw new l.RuntimeError(this._dataError);
    }),
    (Ee.fromQuaternion = function (e, a) {
      if (!t.defined(e)) throw new r.DeveloperError('quaternion is required');
      t.defined(a) || (a = new Ee());
      var i = 2 * (e.w * e.y - e.z * e.x),
        o = 1 - 2 * (e.x * e.x + e.y * e.y),
        s = 2 * (e.w * e.x + e.y * e.z),
        l = 1 - 2 * (e.y * e.y + e.z * e.z),
        u = 2 * (e.w * e.z + e.x * e.y);
      return (
        (a.heading = -Math.atan2(u, l)),
        (a.roll = Math.atan2(s, o)),
        (a.pitch = -n.CesiumMath.asinClamped(i)),
        a
      );
    }),
    (Ee.fromDegrees = function (e, a, i, o) {
      if (!t.defined(e)) throw new r.DeveloperError('heading is required');
      if (!t.defined(a)) throw new r.DeveloperError('pitch is required');
      if (!t.defined(i)) throw new r.DeveloperError('roll is required');
      return (
        t.defined(o) || (o = new Ee()),
        (o.heading = e * n.CesiumMath.RADIANS_PER_DEGREE),
        (o.pitch = a * n.CesiumMath.RADIANS_PER_DEGREE),
        (o.roll = i * n.CesiumMath.RADIANS_PER_DEGREE),
        o
      );
    }),
    (Ee.clone = function (e, r) {
      if (t.defined(e))
        return t.defined(r)
          ? ((r.heading = e.heading), (r.pitch = e.pitch), (r.roll = e.roll), r)
          : new Ee(e.heading, e.pitch, e.roll);
    }),
    (Ee.equals = function (e, r) {
      return (
        e === r ||
        (t.defined(e) &&
          t.defined(r) &&
          e.heading === r.heading &&
          e.pitch === r.pitch &&
          e.roll === r.roll)
      );
    }),
    (Ee.equalsEpsilon = function (e, r, a, i) {
      return (
        e === r ||
        (t.defined(e) &&
          t.defined(r) &&
          n.CesiumMath.equalsEpsilon(e.heading, r.heading, a, i) &&
          n.CesiumMath.equalsEpsilon(e.pitch, r.pitch, a, i) &&
          n.CesiumMath.equalsEpsilon(e.roll, r.roll, a, i))
      );
    }),
    (Ee.prototype.clone = function (e) {
      return Ee.clone(this, e);
    }),
    (Ee.prototype.equals = function (e) {
      return Ee.equals(this, e);
    }),
    (Ee.prototype.equalsEpsilon = function (e, t, r) {
      return Ee.equalsEpsilon(this, e, t, r);
    }),
    (Ee.prototype.toString = function () {
      return '(' + this.heading + ', ' + this.pitch + ', ' + this.roll + ')';
    });
  var _e = new he(0, 0, X.TAI);
  function Me(e, t, r) {
    var n = _e;
    return (
      (n.dayNumber = t),
      (n.secondsOfDay = r),
      he.daysDifference(n, e._sampleZeroDateTT)
    );
  }
  function Se(e, r) {
    if (e._chunkDownloadsInProgress[r]) return e._chunkDownloadsInProgress[r];
    var n,
      a = t.when.defer();
    e._chunkDownloadsInProgress[r] = a;
    var i = e._xysFileUrlTemplate;
    return (
      (n = t.defined(i)
        ? i.getDerivedResource({ templateValues: { 0: r } })
        : new d.Resource({
            url: d.buildModuleUrl(
              'Assets/IAU2006_XYS/IAU2006_XYS_' + r + '.json',
            ),
          })),
      t.when(n.fetchJson(), function (t) {
        e._chunkDownloadsInProgress[r] = !1;
        for (
          var n = e._samples,
            i = t.samples,
            o = r * e._samplesPerXysFile * 3,
            s = 0,
            l = i.length;
          s < l;
          ++s
        )
          n[o + s] = i[s];
        a.resolve();
      }),
      a.promise
    );
  }
  (ve.prototype.preload = function (e, r, n, a) {
    var i = Me(this, e, r),
      o = Me(this, n, a),
      s = (i / this._stepSizeDays - this._interpolationOrder / 2) | 0;
    s < 0 && (s = 0);
    var l =
      (o / this._stepSizeDays - this._interpolationOrder / 2) |
      (0 + this._interpolationOrder);
    l >= this._totalSamples && (l = this._totalSamples - 1);
    for (
      var u = (s / this._samplesPerXysFile) | 0,
        d = (l / this._samplesPerXysFile) | 0,
        f = [],
        c = u;
      c <= d;
      ++c
    )
      f.push(Se(this, c));
    return t.when.all(f);
  }),
    (ve.prototype.computeXysRadians = function (e, r, n) {
      var a = Me(this, e, r);
      if (!(a < 0)) {
        var i = (a / this._stepSizeDays) | 0;
        if (!(i >= this._totalSamples)) {
          var o = this._interpolationOrder,
            s = i - ((o / 2) | 0);
          s < 0 && (s = 0);
          var l = s + o;
          l >= this._totalSamples &&
            (s = (l = this._totalSamples - 1) - o) < 0 &&
            (s = 0);
          var u = !1,
            d = this._samples;
          if (
            (t.defined(d[3 * s]) ||
              (Se(this, (s / this._samplesPerXysFile) | 0), (u = !0)),
            t.defined(d[3 * l]) ||
              (Se(this, (l / this._samplesPerXysFile) | 0), (u = !0)),
            !u)
          ) {
            t.defined(n)
              ? ((n.x = 0), (n.y = 0), (n.s = 0))
              : (n = new De(0, 0, 0));
            var f,
              c,
              h = a - s * this._stepSizeDays,
              p = this._work,
              w = this._denominators,
              m = this._coef,
              y = this._xTable;
            for (f = 0; f <= o; ++f) p[f] = h - y[f];
            for (f = 0; f <= o; ++f) {
              for (m[f] = 1, c = 0; c <= o; ++c) c !== f && (m[f] *= p[c]);
              m[f] *= w[f];
              var C = 3 * (s + f);
              (n.x += m[f] * d[C++]),
                (n.y += m[f] * d[C++]),
                (n.s += m[f] * d[C]);
            }
            return n;
          }
        }
      }
    });
  var Te = {},
    ge = {
      up: { south: 'east', north: 'west', west: 'south', east: 'north' },
      down: { south: 'west', north: 'east', west: 'north', east: 'south' },
      south: { up: 'west', down: 'east', west: 'down', east: 'up' },
      north: { up: 'east', down: 'west', west: 'up', east: 'down' },
      west: { up: 'north', down: 'south', north: 'down', south: 'up' },
      east: { up: 'south', down: 'north', north: 'up', south: 'down' },
    },
    Pe = {
      north: [-1, 0, 0],
      east: [0, 1, 0],
      up: [0, 0, 1],
      south: [1, 0, 0],
      west: [0, -1, 0],
      down: [0, 0, -1],
    },
    be = {},
    Ne = {
      east: new a.Cartesian3(),
      north: new a.Cartesian3(),
      up: new a.Cartesian3(),
      west: new a.Cartesian3(),
      south: new a.Cartesian3(),
      down: new a.Cartesian3(),
    },
    Re = new a.Cartesian3(),
    Ie = new a.Cartesian3(),
    qe = new a.Cartesian3();
  (Te.localFrameToFixedFrameGenerator = function (e, s) {
    if (!ge.hasOwnProperty(e) || !ge[e].hasOwnProperty(s))
      throw new r.DeveloperError(
        'firstAxis and secondAxis must be east, north, up, west, south or down.',
      );
    var l,
      u = ge[e][s],
      d = e + s;
    return (
      t.defined(be[d])
        ? (l = be[d])
        : ((l = function (l, d, f) {
            if (!t.defined(l))
              throw new r.DeveloperError('origin is required.');
            if (
              (t.defined(f) || (f = new o.Matrix4()),
              a.Cartesian3.equalsEpsilon(
                l,
                a.Cartesian3.ZERO,
                n.CesiumMath.EPSILON14,
              ))
            )
              a.Cartesian3.unpack(Pe[e], 0, Re),
                a.Cartesian3.unpack(Pe[s], 0, Ie),
                a.Cartesian3.unpack(Pe[u], 0, qe);
            else if (
              n.CesiumMath.equalsEpsilon(l.x, 0, n.CesiumMath.EPSILON14) &&
              n.CesiumMath.equalsEpsilon(l.y, 0, n.CesiumMath.EPSILON14)
            ) {
              var c = n.CesiumMath.sign(l.z);
              a.Cartesian3.unpack(Pe[e], 0, Re),
                'east' !== e &&
                  'west' !== e &&
                  a.Cartesian3.multiplyByScalar(Re, c, Re),
                a.Cartesian3.unpack(Pe[s], 0, Ie),
                'east' !== s &&
                  'west' !== s &&
                  a.Cartesian3.multiplyByScalar(Ie, c, Ie),
                a.Cartesian3.unpack(Pe[u], 0, qe),
                'east' !== u &&
                  'west' !== u &&
                  a.Cartesian3.multiplyByScalar(qe, c, qe);
            } else {
              (d = t.defaultValue(d, i.Ellipsoid.WGS84)).geodeticSurfaceNormal(
                l,
                Ne.up,
              );
              var h = Ne.up,
                p = Ne.east;
              (p.x = -l.y),
                (p.y = l.x),
                (p.z = 0),
                a.Cartesian3.normalize(p, Ne.east),
                a.Cartesian3.cross(h, p, Ne.north),
                a.Cartesian3.multiplyByScalar(Ne.up, -1, Ne.down),
                a.Cartesian3.multiplyByScalar(Ne.east, -1, Ne.west),
                a.Cartesian3.multiplyByScalar(Ne.north, -1, Ne.south),
                (Re = Ne[e]),
                (Ie = Ne[s]),
                (qe = Ne[u]);
            }
            return (
              (f[0] = Re.x),
              (f[1] = Re.y),
              (f[2] = Re.z),
              (f[3] = 0),
              (f[4] = Ie.x),
              (f[5] = Ie.y),
              (f[6] = Ie.z),
              (f[7] = 0),
              (f[8] = qe.x),
              (f[9] = qe.y),
              (f[10] = qe.z),
              (f[11] = 0),
              (f[12] = l.x),
              (f[13] = l.y),
              (f[14] = l.z),
              (f[15] = 1),
              f
            );
          }),
          (be[d] = l)),
      l
    );
  }),
    (Te.eastNorthUpToFixedFrame = Te.localFrameToFixedFrameGenerator(
      'east',
      'north',
    )),
    (Te.northEastDownToFixedFrame = Te.localFrameToFixedFrameGenerator(
      'north',
      'east',
    )),
    (Te.northUpEastToFixedFrame = Te.localFrameToFixedFrameGenerator(
      'north',
      'up',
    )),
    (Te.northWestUpToFixedFrame = Te.localFrameToFixedFrameGenerator(
      'north',
      'west',
    ));
  var Ae = new f(),
    Ue = new a.Cartesian3(1, 1, 1),
    ke = new o.Matrix4();
  Te.headingPitchRollToFixedFrame = function (e, n, i, s, l) {
    r.Check.typeOf.object('HeadingPitchRoll', n),
      (s = t.defaultValue(s, Te.eastNorthUpToFixedFrame));
    var u = f.fromHeadingPitchRoll(n, Ae),
      d = o.Matrix4.fromTranslationQuaternionRotationScale(
        a.Cartesian3.ZERO,
        u,
        Ue,
        ke,
      );
    return (l = s(e, i, l)), o.Matrix4.multiply(l, d, l);
  };
  var je = new o.Matrix4(),
    ze = new o.Matrix3();
  Te.headingPitchRollQuaternion = function (e, t, n, a, i) {
    r.Check.typeOf.object('HeadingPitchRoll', t);
    var s = Te.headingPitchRollToFixedFrame(e, t, n, a, je),
      l = o.Matrix4.getMatrix3(s, ze);
    return f.fromRotationMatrix(l, i);
  };
  var Fe = new a.Cartesian3(1, 1, 1),
    We = new a.Cartesian3(),
    Le = new o.Matrix4(),
    Ve = new o.Matrix4(),
    Ye = new o.Matrix3(),
    Be = new f();
  Te.fixedFrameToHeadingPitchRoll = function (e, n, s, l) {
    r.Check.defined('transform', e),
      (n = t.defaultValue(n, i.Ellipsoid.WGS84)),
      (s = t.defaultValue(s, Te.eastNorthUpToFixedFrame)),
      t.defined(l) || (l = new Ee());
    var u = o.Matrix4.getTranslation(e, We);
    if (a.Cartesian3.equals(u, a.Cartesian3.ZERO))
      return (l.heading = 0), (l.pitch = 0), (l.roll = 0), l;
    var d = o.Matrix4.inverseTransformation(s(u, n, Le), Le),
      c = o.Matrix4.setScale(e, Fe, Ve);
    (c = o.Matrix4.setTranslation(c, a.Cartesian3.ZERO, c)),
      (d = o.Matrix4.multiply(d, c, d));
    var h = f.fromRotationMatrix(o.Matrix4.getMatrix3(d, Ye), Be);
    return (h = f.normalize(h, h)), Ee.fromQuaternion(h, l);
  };
  var Ge = n.CesiumMath.TWO_PI / 86400,
    Ze = new he();
  (Te.computeTemeToPseudoFixedMatrix = function (e, a) {
    if (!t.defined(e)) throw new r.DeveloperError('date is required.');
    var i,
      s = (Ze = he.addSeconds(e, -he.computeTaiMinusUtc(e), Ze)).dayNumber,
      l = Ze.secondsOfDay,
      u = s - 2451545,
      d =
        (((24110.54841 +
          (i =
            43200 <= l
              ? (u + 0.5) / Z.DAYS_PER_JULIAN_CENTURY
              : (u - 0.5) / Z.DAYS_PER_JULIAN_CENTURY) *
            (8640184.812866 + i * (0.093104 + -62e-7 * i))) *
          Ge) %
          n.CesiumMath.TWO_PI) +
        (72921158553e-15 + 11772758384668e-32 * (s - 2451545.5)) *
          ((l + 0.5 * Z.SECONDS_PER_DAY) % Z.SECONDS_PER_DAY),
      f = Math.cos(d),
      c = Math.sin(d);
    return t.defined(a)
      ? ((a[0] = f),
        (a[1] = -c),
        (a[2] = 0),
        (a[3] = c),
        (a[4] = f),
        (a[5] = 0),
        (a[6] = 0),
        (a[7] = 0),
        (a[8] = 1),
        a)
      : new o.Matrix3(f, c, 0, -c, f, 0, 0, 0, 1);
  }),
    (Te.iau2006XysData = new ve()),
    (Te.earthOrientationParameters = we.NONE);
  var Xe = 32.184;
  (Te.preloadIcrfFixed = function (e) {
    var r = e.start.dayNumber,
      n = e.start.secondsOfDay + Xe,
      a = e.stop.dayNumber,
      i = e.stop.secondsOfDay + Xe,
      o = Te.iau2006XysData.preload(r, n, a, i),
      s = Te.earthOrientationParameters.getPromiseToLoad();
    return t.when.all([o, s]);
  }),
    (Te.computeIcrfToFixedMatrix = function (e, n) {
      if (!t.defined(e)) throw new r.DeveloperError('date is required.');
      t.defined(n) || (n = new o.Matrix3());
      var a = Te.computeFixedToIcrfMatrix(e, n);
      if (t.defined(a)) return o.Matrix3.transpose(a, n);
    });
  var Je = new De(0, 0, 0),
    He = new L(0, 0, 0, 0, 0, 0),
    $e = new o.Matrix3(),
    Qe = new o.Matrix3();
  Te.computeFixedToIcrfMatrix = function (e, a) {
    if (!t.defined(e)) throw new r.DeveloperError('date is required.');
    t.defined(a) || (a = new o.Matrix3());
    var i = Te.earthOrientationParameters.compute(e, He);
    if (t.defined(i)) {
      var s = e.dayNumber,
        l = e.secondsOfDay + Xe,
        u = Te.iau2006XysData.computeXysRadians(s, l, Je);
      if (t.defined(u)) {
        var d = u.x + i.xPoleOffset,
          f = u.y + i.yPoleOffset,
          c = 1 / (1 + Math.sqrt(1 - d * d - f * f)),
          h = $e;
        (h[0] = 1 - c * d * d),
          (h[3] = -c * d * f),
          (h[6] = d),
          (h[1] = -c * d * f),
          (h[4] = 1 - c * f * f),
          (h[7] = f),
          (h[2] = -d),
          (h[5] = -f),
          (h[8] = 1 - c * (d * d + f * f));
        var p = o.Matrix3.fromRotationZ(-u.s, Qe),
          w = o.Matrix3.multiply(h, p, $e),
          m = e.dayNumber - 2451545,
          y =
            (e.secondsOfDay - he.computeTaiMinusUtc(e) + i.ut1MinusUtc) /
            Z.SECONDS_PER_DAY,
          C = 0.779057273264 + y + 0.00273781191135448 * (m + y);
        C = (C % 1) * n.CesiumMath.TWO_PI;
        var x = o.Matrix3.fromRotationZ(C, Qe),
          O = o.Matrix3.multiply(w, x, $e),
          E = Math.cos(i.xPoleWander),
          D = Math.cos(i.yPoleWander),
          v = Math.sin(i.xPoleWander),
          _ = Math.sin(i.yPoleWander),
          M = s - 2451545 + l / Z.SECONDS_PER_DAY,
          S = (-47e-6 * (M /= 36525) * n.CesiumMath.RADIANS_PER_DEGREE) / 3600,
          T = Math.cos(S),
          g = Math.sin(S),
          P = Qe;
        return (
          (P[0] = E * T),
          (P[1] = E * g),
          (P[2] = v),
          (P[3] = -D * g + _ * v * T),
          (P[4] = D * T + _ * v * g),
          (P[5] = -_ * E),
          (P[6] = -_ * g - D * v * T),
          (P[7] = _ * T - D * v * g),
          (P[8] = D * E),
          o.Matrix3.multiply(O, P, a)
        );
      }
    }
  };
  var Ke = new s.Cartesian4();
  (Te.pointToWindowCoordinates = function (e, t, r, n) {
    return (
      ((n = Te.pointToGLWindowCoordinates(e, t, r, n)).y = 2 * t[5] - n.y), n
    );
  }),
    (Te.pointToGLWindowCoordinates = function (e, n, a, l) {
      if (!t.defined(e))
        throw new r.DeveloperError('modelViewProjectionMatrix is required.');
      if (!t.defined(n))
        throw new r.DeveloperError('viewportTransformation is required.');
      if (!t.defined(a)) throw new r.DeveloperError('point is required.');
      t.defined(l) || (l = new i.Cartesian2());
      var u = Ke;
      return (
        o.Matrix4.multiplyByVector(
          e,
          s.Cartesian4.fromElements(a.x, a.y, a.z, 1, u),
          u,
        ),
        s.Cartesian4.multiplyByScalar(u, 1 / u.w, u),
        o.Matrix4.multiplyByVector(n, u, u),
        i.Cartesian2.fromCartesian4(u, l)
      );
    });
  var et = new a.Cartesian3(),
    tt = new a.Cartesian3(),
    rt = new a.Cartesian3();
  Te.rotationMatrixFromPositionVelocity = function (e, s, l, u) {
    if (!t.defined(e)) throw new r.DeveloperError('position is required.');
    if (!t.defined(s)) throw new r.DeveloperError('velocity is required.');
    var d = t.defaultValue(l, i.Ellipsoid.WGS84).geodeticSurfaceNormal(e, et),
      f = a.Cartesian3.cross(s, d, tt);
    a.Cartesian3.equalsEpsilon(f, a.Cartesian3.ZERO, n.CesiumMath.EPSILON6) &&
      (f = a.Cartesian3.clone(a.Cartesian3.UNIT_X, f));
    var c = a.Cartesian3.cross(f, s, rt);
    return (
      a.Cartesian3.normalize(c, c),
      a.Cartesian3.cross(s, c, f),
      a.Cartesian3.negate(f, f),
      a.Cartesian3.normalize(f, f),
      t.defined(u) || (u = new o.Matrix3()),
      (u[0] = s.x),
      (u[1] = s.y),
      (u[2] = s.z),
      (u[3] = f.x),
      (u[4] = f.y),
      (u[5] = f.z),
      (u[6] = c.x),
      (u[7] = c.y),
      (u[8] = c.z),
      u
    );
  };
  var nt = new o.Matrix4(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
    at = new a.Cartographic(),
    it = new a.Cartesian3(),
    ot = new a.Cartesian3(),
    st = new o.Matrix3(),
    lt = new o.Matrix4(),
    ut = new o.Matrix4();
  (Te.basisTo2D = function (e, n, i) {
    if (!t.defined(e)) throw new r.DeveloperError('projection is required.');
    if (!t.defined(n)) throw new r.DeveloperError('matrix is required.');
    if (!t.defined(i)) throw new r.DeveloperError('result is required.');
    var s = o.Matrix4.getTranslation(n, ot),
      l = e.ellipsoid,
      u = l.cartesianToCartographic(s, at),
      d = e.project(u, it);
    a.Cartesian3.fromElements(d.z, d.x, d.y, d);
    var f = Te.eastNorthUpToFixedFrame(s, l, lt),
      c = o.Matrix4.inverseTransformation(f, ut),
      h = o.Matrix4.getMatrix3(n, st),
      p = o.Matrix4.multiplyByMatrix3(c, h, i);
    return o.Matrix4.multiply(nt, p, i), o.Matrix4.setTranslation(i, d, i), i;
  }),
    (Te.wgs84To2DModelMatrix = function (e, n, i) {
      if (!t.defined(e)) throw new r.DeveloperError('projection is required.');
      if (!t.defined(n)) throw new r.DeveloperError('center is required.');
      if (!t.defined(i)) throw new r.DeveloperError('result is required.');
      var s = e.ellipsoid,
        l = Te.eastNorthUpToFixedFrame(n, s, lt),
        u = o.Matrix4.inverseTransformation(l, ut),
        d = s.cartesianToCartographic(n, at),
        f = e.project(d, it);
      a.Cartesian3.fromElements(f.z, f.x, f.y, f);
      var c = o.Matrix4.fromTranslation(f, lt);
      return o.Matrix4.multiply(nt, u, i), o.Matrix4.multiply(c, i, i), i;
    }),
    (Te.buildUp = function (e, t) {
      var r = t.clone(),
        n = e.clone();
      (n = a.Cartesian3.normalize(n, n)),
        1 <= Math.abs(a.Cartesian3.dot(n, r)) &&
          (n =
            Math.abs(a.Cartesian3.dot(r, a.Cartesian3.UNIT_Y)) < 1
              ? a.Cartesian3.clone(a.Cartesian3.UNIT_Y, n)
              : a.Cartesian3.clone(a.Cartesian3.UNIT_Z, n));
      var i = new a.Cartesian3();
      return (
        a.Cartesian3.cross(n, r, i),
        (i = a.Cartesian3.normalize(i, i)),
        a.Cartesian3.cross(r, i, n),
        a.Cartesian3.normalize(n, n)
      );
    }),
    (Te.getHeading = function (e, t) {
      var r;
      return (
        (r = n.CesiumMath.equalsEpsilon(Math.abs(e.z), 1, n.CesiumMath.EPSILON3)
          ? Math.atan2(t.y, t.x) - n.CesiumMath.PI_OVER_TWO
          : Math.atan2(e.y, e.x) - n.CesiumMath.PI_OVER_TWO),
        n.CesiumMath.TWO_PI - n.CesiumMath.zeroToTwoPi(r)
      );
    }),
    (Te.convertToColumbusCartesian = function (e) {
      var t = new o.GeographicProjection(),
        r = t.ellipsoid,
        n = new a.Cartesian3(),
        i = new a.Cartographic();
      return (
        r.cartesianToCartographic(e, i),
        t.project(i, n),
        a.Cartesian3.fromElements(n.z, n.x, n.y)
      );
    }),
    (Te.convertTo3DCartesian = function (e) {
      var t = new o.GeographicProjection(),
        r = t.ellipsoid,
        n = new a.Cartesian3(),
        i = new a.Cartographic();
      return (
        (n = a.Cartesian3.fromElements(e.y, e.z, e.x)),
        t.unproject(n, i),
        r.cartographicToCartesian(i, n)
      );
    }),
    (e.Quaternion = f),
    (e.Transforms = Te);
});
