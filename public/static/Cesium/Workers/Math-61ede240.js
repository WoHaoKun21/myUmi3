define(['exports', './when-8d13db60', './Check-70bec281'], function (e, r, t) {
  var i = function (e) {
    null == e && (e = new Date().getTime()),
      (this.N = 624),
      (this.M = 397),
      (this.MATRIX_A = 2567483615),
      (this.UPPER_MASK = 2147483648),
      (this.LOWER_MASK = 2147483647),
      (this.mt = new Array(this.N)),
      (this.mti = this.N + 1),
      this.init_genrand(e);
  };
  (i.prototype.init_genrand = function (e) {
    for (this.mt[0] = e >>> 0, this.mti = 1; this.mti < this.N; this.mti++)
      (e = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)),
        (this.mt[this.mti] =
          ((1812433253 * ((4294901760 & e) >>> 16)) << 16) +
          1812433253 * (65535 & e) +
          this.mti),
        (this.mt[this.mti] >>>= 0);
  }),
    (i.prototype.genrand_int32 = function () {
      var e,
        r = new Array(0, this.MATRIX_A);
      if (this.mti >= this.N) {
        var t;
        for (
          this.mti == this.N + 1 && this.init_genrand(5489), t = 0;
          t < this.N - this.M;
          t++
        )
          (e =
            (this.mt[t] & this.UPPER_MASK) |
            (this.mt[t + 1] & this.LOWER_MASK)),
            (this.mt[t] = this.mt[t + this.M] ^ (e >>> 1) ^ r[1 & e]);
        for (; t < this.N - 1; t++)
          (e =
            (this.mt[t] & this.UPPER_MASK) |
            (this.mt[t + 1] & this.LOWER_MASK)),
            (this.mt[t] =
              this.mt[t + (this.M - this.N)] ^ (e >>> 1) ^ r[1 & e]);
        (e =
          (this.mt[this.N - 1] & this.UPPER_MASK) |
          (this.mt[0] & this.LOWER_MASK)),
          (this.mt[this.N - 1] = this.mt[this.M - 1] ^ (e >>> 1) ^ r[1 & e]),
          (this.mti = 0);
      }
      return (
        (e = this.mt[this.mti++]),
        (e ^= e >>> 11),
        (e ^= (e << 7) & 2636928640),
        (e ^= (e << 15) & 4022730752),
        (e ^= e >>> 18) >>> 0
      );
    }),
    (i.prototype.random = function () {
      return this.genrand_int32() * (1 / 4294967296);
    });
  var n = {
    Radius: 6378137,
    EPSILON1: 0.1,
    EPSILON2: 0.01,
    EPSILON3: 0.001,
    EPSILON4: 1e-4,
    EPSILON5: 1e-5,
    EPSILON6: 1e-6,
    EPSILON7: 1e-7,
    EPSILON8: 1e-8,
    EPSILON9: 1e-9,
    EPSILON10: 1e-10,
    EPSILON11: 1e-11,
    EPSILON12: 1e-12,
    EPSILON13: 1e-13,
    EPSILON14: 1e-14,
    EPSILON15: 1e-15,
    EPSILON16: 1e-16,
    EPSILON17: 1e-17,
    EPSILON18: 1e-18,
    EPSILON19: 1e-19,
    EPSILON20: 1e-20,
    EPSILON21: 1e-21,
    GRAVITATIONALPARAMETER: 3986004418e5,
    SOLAR_RADIUS: 6955e5,
    LUNAR_RADIUS: 1737400,
    SIXTY_FOUR_KILOBYTES: 65536,
  };
  (n.sign = r.defaultValue(Math.sign, function (e) {
    return 0 == (e = +e) || e != e ? e : 0 < e ? 1 : -1;
  })),
    (n.signNotZero = function (e) {
      return e < 0 ? -1 : 1;
    }),
    (n.toSNorm = function (e, t) {
      return (
        (t = r.defaultValue(t, 255)),
        Math.round((0.5 * n.clamp(e, -1, 1) + 0.5) * t)
      );
    }),
    (n.fromSNorm = function (e, t) {
      return (t = r.defaultValue(t, 255)), (n.clamp(e, 0, t) / t) * 2 - 1;
    }),
    (n.normalize = function (e, r, t) {
      return 0 === (t = Math.max(t - r, 0)) ? 0 : n.clamp((e - r) / t, 0, 1);
    }),
    (n.sinh = r.defaultValue(Math.sinh, function (e) {
      return (Math.exp(e) - Math.exp(-e)) / 2;
    })),
    (n.cosh = r.defaultValue(Math.cosh, function (e) {
      return (Math.exp(e) + Math.exp(-e)) / 2;
    })),
    (n.lerp = function (e, r, t) {
      return (1 - t) * e + t * r;
    }),
    (n.PI = Math.PI),
    (n.ONE_OVER_PI = 1 / Math.PI),
    (n.PI_OVER_TWO = Math.PI / 2),
    (n.PI_OVER_THREE = Math.PI / 3),
    (n.PI_OVER_FOUR = Math.PI / 4),
    (n.PI_OVER_SIX = Math.PI / 6),
    (n.THREE_PI_OVER_TWO = (3 * Math.PI) / 2),
    (n.TWO_PI = 2 * Math.PI),
    (n.ONE_OVER_TWO_PI = 1 / (2 * Math.PI)),
    (n.RADIANS_PER_DEGREE = Math.PI / 180),
    (n.DEGREES_PER_RADIAN = 180 / Math.PI),
    (n.RADIANS_PER_ARCSECOND = n.RADIANS_PER_DEGREE / 3600),
    (n.toRadians = function (e) {
      if (!r.defined(e)) throw new t.DeveloperError('degrees is required.');
      return e * n.RADIANS_PER_DEGREE;
    }),
    (n.toDegrees = function (e) {
      if (!r.defined(e)) throw new t.DeveloperError('radians is required.');
      return e * n.DEGREES_PER_RADIAN;
    }),
    (n.convertLongitudeRange = function (e) {
      if (!r.defined(e)) throw new t.DeveloperError('angle is required.');
      var i = n.TWO_PI,
        o = e - Math.floor(e / i) * i;
      return o < -Math.PI ? o + i : o >= Math.PI ? o - i : o;
    }),
    (n.clampToLatitudeRange = function (e) {
      if (!r.defined(e)) throw new t.DeveloperError('angle is required.');
      return n.clamp(e, -1 * n.PI_OVER_TWO, n.PI_OVER_TWO);
    }),
    (n.negativePiToPi = function (e) {
      if (!r.defined(e)) throw new t.DeveloperError('angle is required.');
      return n.zeroToTwoPi(e + n.PI) - n.PI;
    }),
    (n.zeroToTwoPi = function (e) {
      if (!r.defined(e)) throw new t.DeveloperError('angle is required.');
      var i = n.mod(e, n.TWO_PI);
      return Math.abs(i) < n.EPSILON14 && Math.abs(e) > n.EPSILON14
        ? n.TWO_PI
        : i;
    }),
    (n.mod = function (e, i) {
      if (!r.defined(e)) throw new t.DeveloperError('m is required.');
      if (!r.defined(i)) throw new t.DeveloperError('n is required.');
      return ((e % i) + i) % i;
    }),
    (n.equalsEpsilon = function (e, i, n, o) {
      if (!r.defined(e)) throw new t.DeveloperError('left is required.');
      if (!r.defined(i)) throw new t.DeveloperError('right is required.');
      if (!r.defined(n))
        throw new t.DeveloperError('relativeEpsilon is required.');
      o = r.defaultValue(o, n);
      var a = Math.abs(e - i);
      return a <= o || a <= n * Math.max(Math.abs(e), Math.abs(i));
    }),
    (n.lessThan = function (e, i, n) {
      if (!r.defined(e)) throw new t.DeveloperError('first is required.');
      if (!r.defined(i)) throw new t.DeveloperError('second is required.');
      if (!r.defined(n))
        throw new t.DeveloperError('relativeEpsilon is required.');
      return e - i < -n;
    }),
    (n.lessThanOrEquals = function (e, i, n) {
      if (!r.defined(e)) throw new t.DeveloperError('first is required.');
      if (!r.defined(i)) throw new t.DeveloperError('second is required.');
      if (!r.defined(n))
        throw new t.DeveloperError('relativeEpsilon is required.');
      return e - i < n;
    }),
    (n.greaterThan = function (e, i, n) {
      if (!r.defined(e)) throw new t.DeveloperError('first is required.');
      if (!r.defined(i)) throw new t.DeveloperError('second is required.');
      if (!r.defined(n))
        throw new t.DeveloperError('relativeEpsilon is required.');
      return n < e - i;
    }),
    (n.greaterThanOrEquals = function (e, i, n) {
      if (!r.defined(e)) throw new t.DeveloperError('first is required.');
      if (!r.defined(i)) throw new t.DeveloperError('second is required.');
      if (!r.defined(n))
        throw new t.DeveloperError('relativeEpsilon is required.');
      return -n < e - i;
    });
  var o = [1];
  (n.factorial = function (e) {
    if ('number' != typeof e || e < 0)
      throw new t.DeveloperError(
        'A number greater than or equal to 0 is required.',
      );
    var r = o.length;
    if (r <= e)
      for (var i = o[r - 1], n = r; n <= e; n++) {
        var a = i * n;
        o.push(a), (i = a);
      }
    return o[e];
  }),
    (n.incrementWrap = function (e, i, n) {
      if (((n = r.defaultValue(n, 0)), !r.defined(e)))
        throw new t.DeveloperError('n is required.');
      if (i <= n)
        throw new t.DeveloperError(
          'maximumValue must be greater than minimumValue.',
        );
      return i < ++e && (e = n), e;
    }),
    (n.isPowerOfTwo = function (e) {
      if ('number' != typeof e || e < 0)
        throw new t.DeveloperError(
          'A number greater than or equal to 0 is required.',
        );
      return 0 !== e && 0 == (e & (e - 1));
    }),
    (n.nextPowerOfTwo = function (e) {
      if ('number' != typeof e || e < 0)
        throw new t.DeveloperError(
          'A number greater than or equal to 0 is required.',
        );
      return (
        --e,
        (e |= e >> 1),
        (e |= e >> 2),
        (e |= e >> 4),
        (e |= e >> 8),
        (e |= e >> 16),
        ++e
      );
    }),
    (n.clamp = function (e, i, n) {
      if (!r.defined(e)) throw new t.DeveloperError('value is required');
      if (!r.defined(i)) throw new t.DeveloperError('min is required.');
      if (!r.defined(n)) throw new t.DeveloperError('max is required.');
      return e < i ? i : n < e ? n : e;
    });
  var a = new i();
  (n.setRandomNumberSeed = function (e) {
    if (!r.defined(e)) throw new t.DeveloperError('seed is required.');
    a = new i(e);
  }),
    (n.nextRandomNumber = function () {
      return a.random();
    }),
    (n.randomBetween = function (e, r) {
      return n.nextRandomNumber() * (r - e) + e;
    }),
    (n.acosClamped = function (e) {
      if (!r.defined(e)) throw new t.DeveloperError('value is required.');
      return Math.acos(n.clamp(e, -1, 1));
    }),
    (n.asinClamped = function (e) {
      if (!r.defined(e)) throw new t.DeveloperError('value is required.');
      return Math.asin(n.clamp(e, -1, 1));
    }),
    (n.chordLength = function (e, i) {
      if (!r.defined(e)) throw new t.DeveloperError('angle is required.');
      if (!r.defined(i)) throw new t.DeveloperError('radius is required.');
      return 2 * i * Math.sin(0.5 * e);
    }),
    (n.logBase = function (e, i) {
      if (!r.defined(e)) throw new t.DeveloperError('number is required.');
      if (!r.defined(i)) throw new t.DeveloperError('base is required.');
      return Math.log(e) / Math.log(i);
    }),
    (n.cbrt = r.defaultValue(Math.cbrt, function (e) {
      var r = Math.pow(Math.abs(e), 1 / 3);
      return e < 0 ? -r : r;
    })),
    (n.log2 = r.defaultValue(Math.log2, function (e) {
      return Math.log(e) * Math.LOG2E;
    })),
    (n.fog = function (e, r) {
      var t = e * r;
      return 1 - Math.exp(-t * t);
    }),
    (n.fastApproximateAtan = function (e) {
      return (
        t.Check.typeOf.number('x', e),
        e * (-0.1784 * Math.abs(e) - 0.0663 * e * e + 1.0301)
      );
    }),
    (n.fastApproximateAtan2 = function (e, r) {
      var i, o;
      t.Check.typeOf.number('x', e), t.Check.typeOf.number('y', r);
      var a = Math.abs(e);
      (i = Math.abs(r)), (o = Math.max(a, i));
      var h = (i = Math.min(a, i)) / o;
      if (isNaN(h)) throw new t.DeveloperError('either x or y must be nonzero');
      return (
        (a = n.fastApproximateAtan(h)),
        (a = Math.abs(r) > Math.abs(e) ? n.PI_OVER_TWO - a : a),
        (a = e < 0 ? n.PI - a : a),
        r < 0 ? -a : a
      );
    }),
    (e.CesiumMath = n);
});
