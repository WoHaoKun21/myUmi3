define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
], function (t, a, i, e, n, s) {
  function h(t, a, i, e, n, s, h) {
    var r,
      d,
      o = ((r = t) * (d = i) * (4 + r * (4 - 3 * d))) / 16;
    return (1 - o) * t * a * (e + o * n * (h + o * s * (2 * h * h - 1)));
  }
  var r = new n.Cartesian3(),
    d = new n.Cartesian3();
  function o(t, a, s, o) {
    var c,
      u,
      M,
      l,
      g,
      _,
      p,
      f,
      C,
      v,
      m,
      H,
      O,
      b,
      q,
      S,
      k,
      w,
      U,
      A,
      R,
      y,
      E,
      P,
      T,
      x = n.Cartesian3.normalize(o.cartographicToCartesian(a, d), r),
      D = n.Cartesian3.normalize(o.cartographicToCartesian(s, d), d);
    i.Check.typeOf.number.greaterThanOrEquals(
      'value',
      Math.abs(Math.abs(n.Cartesian3.angleBetween(x, D)) - Math.PI),
      0.0125,
    ),
      (function (t, a, i, n, s, r, d) {
        var o,
          c,
          u,
          M,
          l,
          g = (a - i) / a,
          _ = r - n,
          p = Math.atan((1 - g) * Math.tan(s)),
          f = Math.atan((1 - g) * Math.tan(d)),
          C = Math.cos(p),
          v = Math.sin(p),
          m = Math.cos(f),
          H = Math.sin(f),
          O = C * m,
          b = C * H,
          q = v * H,
          S = v * m,
          k = _,
          w = e.CesiumMath.TWO_PI,
          U = Math.cos(k),
          A = Math.sin(k);
        do {
          (U = Math.cos(k)), (A = Math.sin(k));
          var R,
            y = b - S * U;
          (u = Math.sqrt(m * m * A * A + y * y)),
            (c = q + O * U),
            (o = Math.atan2(u, c)),
            (w = k),
            (l =
              c -
              (2 * q) /
                (M = 0 === u ? ((R = 0), 1) : 1 - (R = (O * A) / u) * R)),
            isNaN(l) && (l = 0),
            (k = _ + h(g, R, M, o, u, c, l));
        } while (Math.abs(k - w) > e.CesiumMath.EPSILON12);
        var E = (M * (a * a - i * i)) / (i * i),
          P = (E * (256 + E * (E * (74 - 47 * E) - 128))) / 1024,
          T = l * l,
          x =
            i *
            (1 + (E * (4096 + E * (E * (320 - 175 * E) - 768))) / 16384) *
            (o -
              P *
                u *
                (l +
                  (P *
                    (c * (2 * T - 1) -
                      (P * l * (4 * u * u - 3) * (4 * T - 3)) / 6)) /
                    4)),
          D = Math.atan2(m * A, b - S * U),
          I = Math.atan2(C * A, b * U - S);
        (t._distance = x),
          (t._startHeading = D),
          (t._endHeading = I),
          (t._uSquared = E);
      })(
        t,
        o.maximumRadius,
        o.minimumRadius,
        a.longitude,
        a.latitude,
        s.longitude,
        s.latitude,
      ),
      (t._start = n.Cartographic.clone(a, t._start)),
      (t._end = n.Cartographic.clone(s, t._end)),
      (t._start.height = 0),
      (t._end.height = 0),
      (u = (c = t)._uSquared),
      (g =
        ((M = c._ellipsoid.maximumRadius) - (l = c._ellipsoid.minimumRadius)) /
        M),
      (_ = Math.cos(c._startHeading)),
      (p = Math.sin(c._startHeading)),
      (f = (1 - g) * Math.tan(c._start.latitude)),
      (v = (C = 1 / Math.sqrt(1 + f * f)) * f),
      (m = Math.atan2(f, _)),
      (b = 1 - (O = (H = C * p) * H)),
      (q = Math.sqrt(b)),
      (y = 1 - 3 * (S = u / 4) + (35 * (k = S * S)) / 4),
      (E = 1 - 5 * S),
      (P =
        (A =
          1 +
          S -
          (3 * k) / 4 +
          (5 * (w = k * S)) / 4 -
          (175 * (U = k * k)) / 64) *
          m -
        ((R = 1 - S + (15 * k) / 8 - (35 * w) / 8) * Math.sin(2 * m) * S) / 2 -
        (y * Math.sin(4 * m) * k) / 16 -
        (E * Math.sin(6 * m) * w) / 48 -
        (5 * Math.sin(8 * m) * U) / 512),
      ((T = c._constants).a = M),
      (T.b = l),
      (T.f = g),
      (T.cosineHeading = _),
      (T.sineHeading = p),
      (T.tanU = f),
      (T.cosineU = C),
      (T.sineU = v),
      (T.sigma = m),
      (T.sineAlpha = H),
      (T.sineSquaredAlpha = O),
      (T.cosineSquaredAlpha = b),
      (T.cosineAlpha = q),
      (T.u2Over4 = S),
      (T.u4Over16 = k),
      (T.u6Over64 = w),
      (T.u8Over256 = U),
      (T.a0 = A),
      (T.a1 = R),
      (T.a2 = y),
      (T.a3 = E),
      (T.distanceRatio = P);
  }
  function c(t, i, e) {
    var h = a.defaultValue(e, s.Ellipsoid.WGS84);
    (this._ellipsoid = h),
      (this._start = new n.Cartographic()),
      (this._end = new n.Cartographic()),
      (this._constants = {}),
      (this._startHeading = void 0),
      (this._endHeading = void 0),
      (this._distance = void 0),
      (this._uSquared = void 0),
      a.defined(t) && a.defined(i) && o(this, t, i, h);
  }
  Object.defineProperties(c.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      },
    },
    surfaceDistance: {
      get: function () {
        return i.Check.defined('distance', this._distance), this._distance;
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
    startHeading: {
      get: function () {
        return i.Check.defined('distance', this._distance), this._startHeading;
      },
    },
    endHeading: {
      get: function () {
        return i.Check.defined('distance', this._distance), this._endHeading;
      },
    },
  }),
    (c.prototype.setEndPoints = function (t, a) {
      i.Check.defined('start', t),
        i.Check.defined('end', a),
        o(this, t, a, this._ellipsoid);
    }),
    (c.prototype.interpolateUsingFraction = function (t, a) {
      return this.interpolateUsingSurfaceDistance(this._distance * t, a);
    }),
    (c.prototype.interpolateUsingSurfaceDistance = function (t, e) {
      i.Check.defined('distance', this._distance);
      var s = this._constants,
        r = s.distanceRatio + t / s.b,
        d = Math.cos(2 * r),
        o = Math.cos(4 * r),
        c = Math.cos(6 * r),
        u = Math.sin(2 * r),
        M = Math.sin(4 * r),
        l = Math.sin(6 * r),
        g = Math.sin(8 * r),
        _ = r * r,
        p = r * _,
        f = s.u8Over256,
        C = s.u2Over4,
        v = s.u6Over64,
        m = s.u4Over16,
        H =
          (2 * p * f * d) / 3 +
          r *
            (1 -
              C +
              (7 * m) / 4 -
              (15 * v) / 4 +
              (579 * f) / 64 -
              (m - (15 * v) / 4 + (187 * f) / 16) * d -
              ((5 * v) / 4 - (115 * f) / 16) * o -
              (29 * f * c) / 16) +
          (C / 2 - m + (71 * v) / 32 - (85 * f) / 16) * u +
          ((5 * m) / 16 - (5 * v) / 4 + (383 * f) / 96) * M -
          _ * ((v - (11 * f) / 2) * u + (5 * f * M) / 2) +
          ((29 * v) / 96 - (29 * f) / 16) * l +
          (539 * f * g) / 1536,
        O = Math.asin(Math.sin(H) * s.cosineAlpha),
        b = Math.atan((s.a / s.b) * Math.tan(O));
      H -= s.sigma;
      var q = Math.cos(2 * s.sigma + H),
        S = Math.sin(H),
        k = Math.cos(H),
        w = s.cosineU * k,
        U = s.sineU * S,
        A =
          Math.atan2(S * s.sineHeading, w - U * s.cosineHeading) -
          h(s.f, s.sineAlpha, s.cosineSquaredAlpha, H, S, k, q);
      return a.defined(e)
        ? ((e.longitude = this._start.longitude + A),
          (e.latitude = b),
          (e.height = 0),
          e)
        : new n.Cartographic(this._start.longitude + A, b, 0);
    }),
    (t.EllipsoidGeodesic = c);
});
