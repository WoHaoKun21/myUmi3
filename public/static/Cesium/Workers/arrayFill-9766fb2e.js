define(['exports', './when-8d13db60', './Check-70bec281'], function (e, n, t) {
  e.arrayFill = function (e, a, f, d) {
    if (
      (t.Check.defined('array', e),
      t.Check.defined('value', a),
      n.defined(f) && t.Check.typeOf.number('start', f),
      n.defined(d) && t.Check.typeOf.number('end', d),
      'function' == typeof e.fill)
    )
      return e.fill(a, f, d);
    for (
      var i = e.length >>> 0,
        r = n.defaultValue(f, 0),
        l = r < 0 ? Math.max(i + r, 0) : Math.min(r, i),
        u = n.defaultValue(d, i),
        h = u < 0 ? Math.max(i + u, 0) : Math.min(u, i);
      l < h;

    )
      (e[l] = a), l++;
    return e;
  };
});
