define(['exports', './when-8d13db60'], function (e, t) {
  function n(e) {
    var t;
    (this.name = 'DeveloperError'), (this.message = e);
    try {
      throw new Error();
    } catch (e) {
      t = e.stack;
    }
    this.stack = t;
  }
  t.defined(Object.create) &&
    ((n.prototype = Object.create(Error.prototype)).constructor = n),
    (n.prototype.toString = function () {
      var e = this.name + ': ' + this.message;
      return t.defined(this.stack) && (e += '\n' + this.stack.toString()), e;
    }),
    (n.throwInstantiationError = function () {
      throw new n(
        'This function defines an interface and should not be called directly.',
      );
    });
  var o = {};
  function r(e, t, n) {
    return 'Expected ' + n + ' to be typeof ' + t + ', actual typeof was ' + e;
  }
  (o.typeOf = {}),
    (o.defined = function (e, o) {
      if (!t.defined(o))
        throw new n(e + ' is required, actual value was undefined');
    }),
    (o.typeOf.func = function (e, t) {
      if ('function' != typeof t) throw new n(r(typeof t, 'function', e));
    }),
    (o.typeOf.string = function (e, t) {
      if ('string' != typeof t) throw new n(r(typeof t, 'string', e));
    }),
    (o.typeOf.number = function (e, t) {
      if ('number' != typeof t) throw new n(r(typeof t, 'number', e));
    }),
    (o.typeOf.number.lessThan = function (e, t, r) {
      if ((o.typeOf.number(e, t), r <= t))
        throw new n(
          'Expected ' + e + ' to be less than ' + r + ', actual value was ' + t,
        );
    }),
    (o.typeOf.number.lessThanOrEquals = function (e, t, r) {
      if ((o.typeOf.number(e, t), r < t))
        throw new n(
          'Expected ' +
            e +
            ' to be less than or equal to ' +
            r +
            ', actual value was ' +
            t,
        );
    }),
    (o.typeOf.number.greaterThan = function (e, t, r) {
      if ((o.typeOf.number(e, t), t <= r))
        throw new n(
          'Expected ' +
            e +
            ' to be greater than ' +
            r +
            ', actual value was ' +
            t,
        );
    }),
    (o.typeOf.number.greaterThanOrEquals = function (e, t, r) {
      if ((o.typeOf.number(e, t), t < r))
        throw new n(
          'Expected ' +
            e +
            ' to be greater than or equal to' +
            r +
            ', actual value was ' +
            t,
        );
    }),
    (o.typeOf.object = function (e, t) {
      if ('object' != typeof t) throw new n(r(typeof t, 'object', e));
    }),
    (o.typeOf.bool = function (e, t) {
      if ('boolean' != typeof t) throw new n(r(typeof t, 'boolean', e));
    }),
    (o.typeOf.number.equals = function (e, t, r, a) {
      if ((o.typeOf.number(e, r), o.typeOf.number(t, a), r !== a))
        throw new n(
          e +
            ' must be equal to ' +
            t +
            ', the actual values are ' +
            r +
            ' and ' +
            a,
        );
    }),
    (e.Check = o),
    (e.DeveloperError = n);
});
