define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
], function (e, n, t, i) {
  var r = i.CesiumMath.EPSILON10;
  e.arrayRemoveDuplicates = function (e, i, a, f) {
    if ((t.Check.defined('equalsEpsilon', i), n.defined(e))) {
      (f = n.defaultValue(f, r)), (a = n.defaultValue(a, !1));
      var l,
        u,
        h,
        d = e.length;
      if (d < 2) return e;
      for (l = 1; l < d && !i((u = e[l - 1]), (h = e[l]), f); ++l);
      if (l === d) return a && i(e[0], e[e.length - 1], f) ? e.slice(1) : e;
      for (var s = e.slice(0, l); l < d; ++l)
        i(u, (h = e[l]), f) || (s.push(h), (u = h));
      return a && 1 < s.length && i(s[0], s[s.length - 1], f) && s.shift(), s;
    }
  };
});
