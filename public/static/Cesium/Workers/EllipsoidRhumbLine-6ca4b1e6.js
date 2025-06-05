define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
], function (t, i, e, a, n, s) {
  function h(t, i, e) {
    if (0 === t) return i * e;
    var a = t * t,
      n = a * a,
      s = n * a,
      h = s * a,
      u = h * a,
      r = u * a,
      d = e;
    return (
      i *
      ((1 -
        a / 4 -
        (3 * n) / 64 -
        (5 * s) / 256 -
        (175 * h) / 16384 -
        (441 * u) / 65536 -
        (4851 * r) / 1048576) *
        d -
        ((3 * a) / 8 +
          (3 * n) / 32 +
          (45 * s) / 1024 +
          (105 * h) / 4096 +
          (2205 * u) / 131072 +
          (6237 * r) / 524288) *
          Math.sin(2 * d) +
        ((15 * n) / 256 +
          (45 * s) / 1024 +
          (525 * h) / 16384 +
          (1575 * u) / 65536 +
          (155925 * r) / 8388608) *
          Math.sin(4 * d) -
        ((35 * s) / 3072 +
          (175 * h) / 12288 +
          (3675 * u) / 262144 +
          (13475 * r) / 1048576) *
          Math.sin(6 * d) +
        ((315 * h) / 131072 + (2205 * u) / 524288 + (43659 * r) / 8388608) *
          Math.sin(8 * d) -
        ((693 * u) / 1310720 + (6237 * r) / 5242880) * Math.sin(10 * d) +
        ((1001 * r) / 8388608) * Math.sin(12 * d))
    );
  }
  function u(t, i) {
    if (0 === t)
      return Math.log(Math.tan(0.5 * (a.CesiumMath.PI_OVER_TWO + i)));
    var e = t * Math.sin(i);
    return (
      Math.log(Math.tan(0.5 * (a.CesiumMath.PI_OVER_TWO + i))) -
      (t / 2) * Math.log((1 + e) / (1 - e))
    );
  }
  var r = new n.Cartesian3(),
    d = new n.Cartesian3();
  function o(t, i, s, o) {
    var l = n.Cartesian3.normalize(o.cartographicToCartesian(i, d), r),
      c = n.Cartesian3.normalize(o.cartographicToCartesian(s, d), d);
    e.Check.typeOf.number.greaterThanOrEquals(
      'value',
      Math.abs(Math.abs(n.Cartesian3.angleBetween(l, c)) - Math.PI),
      0.0125,
    );
    var M,
      m,
      _,
      g,
      p,
      f,
      C,
      P = o.maximumRadius,
      v = o.minimumRadius,
      O = P * P,
      E = v * v;
    (t._ellipticitySquared = (O - E) / O),
      (t._ellipticity = Math.sqrt(t._ellipticitySquared)),
      (t._start = n.Cartographic.clone(i, t._start)),
      (t._start.height = 0),
      (t._end = n.Cartographic.clone(s, t._end)),
      (t._end.height = 0),
      (t._heading =
        ((M = t),
        (m = i.longitude),
        (_ = i.latitude),
        (g = s.longitude),
        (p = s.latitude),
        (f = u(M._ellipticity, _)),
        (C = u(M._ellipticity, p)),
        Math.atan2(a.CesiumMath.negativePiToPi(g - m), C - f))),
      (t._distance = (function (t, i, e, n, s, u, r) {
        var d = t._heading,
          o = u - n,
          l = 0;
        if (
          a.CesiumMath.equalsEpsilon(
            Math.abs(d),
            a.CesiumMath.PI_OVER_TWO,
            a.CesiumMath.EPSILON8,
          )
        )
          if (i === e) l = i * Math.cos(s) * a.CesiumMath.negativePiToPi(o);
          else {
            var c = Math.sin(s);
            l =
              (i * Math.cos(s) * a.CesiumMath.negativePiToPi(o)) /
              Math.sqrt(1 - t._ellipticitySquared * c * c);
          }
        else {
          var M = h(t._ellipticity, i, s);
          l = (h(t._ellipticity, i, r) - M) / Math.cos(d);
        }
        return Math.abs(l);
      })(
        t,
        o.maximumRadius,
        o.minimumRadius,
        i.longitude,
        i.latitude,
        s.longitude,
        s.latitude,
      ));
  }
  function l(t, e, s, r, d, o) {
    var l,
      c,
      M,
      m = d * d;
    if (
      Math.abs(a.CesiumMath.PI_OVER_TWO - Math.abs(e)) > a.CesiumMath.EPSILON8
    ) {
      c = (function (t, i, e) {
        var a = t / e;
        if (0 === i) return a;
        var n = a * a,
          s = n * a,
          h = s * a,
          u = i * i,
          r = u * u,
          d = r * u,
          o = d * u,
          l = o * u,
          c = l * u,
          M = Math.sin(2 * a),
          m = Math.cos(2 * a),
          _ = Math.sin(4 * a),
          g = Math.cos(4 * a),
          p = Math.sin(6 * a),
          f = Math.cos(6 * a),
          C = Math.sin(8 * a),
          P = Math.cos(8 * a),
          v = Math.sin(10 * a);
        return (
          a +
          (a * u) / 4 +
          (7 * a * r) / 64 +
          (15 * a * d) / 256 +
          (579 * a * o) / 16384 +
          (1515 * a * l) / 65536 +
          (16837 * a * c) / 1048576 +
          ((3 * a * r) / 16 +
            (45 * a * d) / 256 -
            (a * (32 * n - 561) * o) / 4096 -
            (a * (232 * n - 1677) * l) / 16384 +
            (a * (399985 - 90560 * n + 512 * h) * c) / 5242880) *
            m +
          ((21 * a * d) / 256 +
            (483 * a * o) / 4096 -
            (a * (224 * n - 1969) * l) / 16384 -
            (a * (33152 * n - 112599) * c) / 1048576) *
            g +
          ((151 * a * o) / 4096 +
            (4681 * a * l) / 65536 +
            (1479 * a * c) / 16384 -
            (453 * s * c) / 32768) *
            f +
          ((1097 * a * l) / 65536 + (42783 * a * c) / 1048576) * P +
          ((8011 * a * c) / 1048576) * Math.cos(10 * a) +
          ((3 * u) / 8 +
            (3 * r) / 16 +
            (213 * d) / 2048 -
            (3 * n * d) / 64 +
            (255 * o) / 4096 -
            (33 * n * o) / 512 +
            (20861 * l) / 524288 -
            (33 * n * l) / 512 +
            (h * l) / 1024 +
            (28273 * c) / 1048576 -
            (471 * n * c) / 8192 +
            (9 * h * c) / 4096) *
            M +
          ((21 * r) / 256 +
            (21 * d) / 256 +
            (533 * o) / 8192 -
            (21 * n * o) / 512 +
            (197 * l) / 4096 -
            (315 * n * l) / 4096 +
            (584039 * c) / 16777216 -
            (12517 * n * c) / 131072 +
            (7 * h * c) / 2048) *
            _ +
          ((151 * d) / 6144 +
            (151 * o) / 4096 +
            (5019 * l) / 131072 -
            (453 * n * l) / 16384 +
            (26965 * c) / 786432 -
            (8607 * n * c) / 131072) *
            p +
          ((1097 * o) / 131072 +
            (1097 * l) / 65536 +
            (225797 * c) / 10485760 -
            (1097 * n * c) / 65536) *
            C +
          ((8011 * l) / 2621440 + (8011 * c) / 1048576) * v +
          ((293393 * c) / 251658240) * Math.sin(12 * a)
        );
      })(h(d, r, t.latitude) + s * Math.cos(e), d, r);
      var _ = u(d, t.latitude),
        g = u(d, c);
      (M = Math.tan(e) * (g - _)),
        (l = a.CesiumMath.negativePiToPi(t.longitude + M));
    } else {
      var p;
      if (((c = t.latitude), 0 === d)) p = r * Math.cos(t.latitude);
      else {
        var f = Math.sin(t.latitude);
        p = (r * Math.cos(t.latitude)) / Math.sqrt(1 - m * f * f);
      }
      (M = s / p),
        (l =
          0 < e
            ? a.CesiumMath.negativePiToPi(t.longitude + M)
            : a.CesiumMath.negativePiToPi(t.longitude - M));
    }
    return i.defined(o)
      ? ((o.longitude = l), (o.latitude = c), (o.height = 0), o)
      : new n.Cartographic(l, c, 0);
  }
  function c(t, e, a) {
    var h = i.defaultValue(a, s.Ellipsoid.WGS84);
    (this._ellipsoid = h),
      (this._start = new n.Cartographic()),
      (this._end = new n.Cartographic()),
      (this._heading = void 0),
      (this._distance = void 0),
      (this._ellipticity = void 0),
      (this._ellipticitySquared = void 0),
      i.defined(t) && i.defined(e) && o(this, t, e, h);
  }
  Object.defineProperties(c.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      },
    },
    surfaceDistance: {
      get: function () {
        return e.Check.defined('distance', this._distance), this._distance;
      },
    },
    start: {
      get: function () {
        return this._start;
      },
    },
    end: {
      get: function () {
        return this._end;
      },
    },
    heading: {
      get: function () {
        return e.Check.defined('distance', this._distance), this._heading;
      },
    },
  }),
    (c.fromStartHeadingDistance = function (t, n, h, u, r) {
      e.Check.defined('start', t),
        e.Check.defined('heading', n),
        e.Check.defined('distance', h),
        e.Check.typeOf.number.greaterThan('distance', h, 0);
      var d = i.defaultValue(u, s.Ellipsoid.WGS84),
        o = d.maximumRadius,
        M = d.minimumRadius,
        m = o * o,
        _ = M * M,
        g = Math.sqrt((m - _) / m),
        p = l(t, (n = a.CesiumMath.negativePiToPi(n)), h, d.maximumRadius, g);
      return !i.defined(r) || (i.defined(u) && !u.equals(r.ellipsoid))
        ? new c(t, p, d)
        : (r.setEndPoints(t, p), r);
    }),
    (c.prototype.setEndPoints = function (t, i) {
      e.Check.defined('start', t),
        e.Check.defined('end', i),
        o(this, t, i, this._ellipsoid);
    }),
    (c.prototype.interpolateUsingFraction = function (t, i) {
      return this.interpolateUsingSurfaceDistance(t * this._distance, i);
    }),
    (c.prototype.interpolateUsingSurfaceDistance = function (t, a) {
      if (
        (e.Check.typeOf.number('distance', t),
        !i.defined(this._distance) || 0 === this._distance)
      )
        throw new e.DeveloperError(
          'EllipsoidRhumbLine must have distinct start and end set.',
        );
      return l(
        this._start,
        this._heading,
        t,
        this._ellipsoid.maximumRadius,
        this._ellipticity,
        a,
      );
    }),
    (c.prototype.findIntersectionWithLongitude = function (t, s) {
      if (
        (e.Check.typeOf.number('intersectionLongitude', t),
        !i.defined(this._distance) || 0 === this._distance)
      )
        throw new e.DeveloperError(
          'EllipsoidRhumbLine must have distinct start and end set.',
        );
      var h = this._ellipticity,
        u = this._heading,
        r = Math.abs(u),
        d = this._start;
      if (
        ((t = a.CesiumMath.negativePiToPi(t)),
        a.CesiumMath.equalsEpsilon(
          Math.abs(t),
          Math.PI,
          a.CesiumMath.EPSILON14,
        ) && (t = a.CesiumMath.sign(d.longitude) * Math.PI),
        i.defined(s) || (s = new n.Cartographic()),
        Math.abs(a.CesiumMath.PI_OVER_TWO - r) <= a.CesiumMath.EPSILON8)
      )
        return (s.longitude = t), (s.latitude = d.latitude), (s.height = 0), s;
      if (
        a.CesiumMath.equalsEpsilon(
          Math.abs(a.CesiumMath.PI_OVER_TWO - r),
          a.CesiumMath.PI_OVER_TWO,
          a.CesiumMath.EPSILON8,
        )
      ) {
        if (a.CesiumMath.equalsEpsilon(t, d.longitude, a.CesiumMath.EPSILON12))
          return;
        return (
          (s.longitude = t),
          (s.latitude =
            a.CesiumMath.PI_OVER_TWO *
            a.CesiumMath.sign(a.CesiumMath.PI_OVER_TWO - u)),
          (s.height = 0),
          s
        );
      }
      var o,
        l = d.latitude,
        c = h * Math.sin(l),
        M =
          Math.tan(0.5 * (a.CesiumMath.PI_OVER_TWO + l)) *
          Math.exp((t - d.longitude) / Math.tan(u)),
        m = (1 + c) / (1 - c),
        _ = d.latitude;
      do {
        o = _;
        var g = h * Math.sin(o),
          p = (1 + g) / (1 - g);
        _ =
          2 * Math.atan(M * Math.pow(p / m, h / 2)) - a.CesiumMath.PI_OVER_TWO;
      } while (!a.CesiumMath.equalsEpsilon(_, o, a.CesiumMath.EPSILON12));
      return (s.longitude = t), (s.latitude = _), (s.height = 0), s;
    }),
    (c.prototype.findIntersectionWithLatitude = function (t, s) {
      if (
        (e.Check.typeOf.number('intersectionLatitude', t),
        !i.defined(this._distance) || 0 === this._distance)
      )
        throw new e.DeveloperError(
          'EllipsoidRhumbLine must have distinct start and end set.',
        );
      var h = this._ellipticity,
        r = this._heading,
        d = this._start;
      if (
        !a.CesiumMath.equalsEpsilon(
          Math.abs(r),
          a.CesiumMath.PI_OVER_TWO,
          a.CesiumMath.EPSILON8,
        )
      ) {
        var o = u(h, d.latitude),
          l = u(h, t),
          c = Math.tan(r) * (l - o),
          M = a.CesiumMath.negativePiToPi(d.longitude + c);
        return i.defined(s)
          ? ((s.longitude = M), (s.latitude = t), (s.height = 0), s)
          : new n.Cartographic(M, t, 0);
      }
    }),
    (t.EllipsoidRhumbLine = c);
});
