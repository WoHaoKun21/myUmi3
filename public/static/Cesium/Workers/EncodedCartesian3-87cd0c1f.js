define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Cartographic-f27b0939',
], function (e, n, i, r) {
  function h() {
    (this.high = r.Cartesian3.clone(r.Cartesian3.ZERO)),
      (this.low = r.Cartesian3.clone(r.Cartesian3.ZERO));
  }
  h.encode = function (e, r) {
    var h;
    return (
      i.Check.typeOf.number('value', e),
      n.defined(r) || (r = { high: 0, low: 0 }),
      (r.low =
        0 <= e
          ? ((h = 65536 * Math.floor(e / 65536)), e - (r.high = h))
          : ((h = 65536 * Math.floor(-e / 65536)), (r.high = -h), e + h)),
      r
    );
  };
  var a = { high: 0, low: 0 };
  h.fromCartesian = function (e, r) {
    i.Check.typeOf.object('cartesian', e), n.defined(r) || (r = new h());
    var o = r.high,
      t = r.low;
    return (
      h.encode(e.x, a),
      (o.x = a.high),
      (t.x = a.low),
      h.encode(e.y, a),
      (o.y = a.high),
      (t.y = a.low),
      h.encode(e.z, a),
      (o.z = a.high),
      (t.z = a.low),
      r
    );
  };
  var o = new h();
  (h.writeElements = function (e, n, r) {
    i.Check.defined('cartesianArray', n),
      i.Check.typeOf.number('index', r),
      i.Check.typeOf.number.greaterThanOrEquals('index', r, 0),
      h.fromCartesian(e, o);
    var a = o.high,
      t = o.low;
    (n[r] = a.x),
      (n[r + 1] = a.y),
      (n[r + 2] = a.z),
      (n[r + 3] = t.x),
      (n[r + 4] = t.y),
      (n[r + 5] = t.z);
  }),
    (e.EncodedCartesian3 = h);
});
