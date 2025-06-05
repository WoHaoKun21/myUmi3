define([
  'exports',
  './Check-70bec281',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './OrientedBoundingBox-7b25e901',
], function (e, n, t, i, r, a) {
  var o = {},
    u = new t.Cartesian3(),
    s = new t.Cartesian3(),
    C = new t.Cartesian3(),
    c = new t.Cartesian3(),
    d = new a.OrientedBoundingBox();
  function l(e, n, r, a, o) {
    var s = t.Cartesian3.subtract(e, n, u),
      C = t.Cartesian3.dot(r, s),
      c = t.Cartesian3.dot(a, s);
    return i.Cartesian2.fromElements(C, c, o);
  }
  (o.validOutline = function (e) {
    n.Check.defined('positions', e);
    var i = a.OrientedBoundingBox.fromPoints(e, d).halfAxes,
      o = r.Matrix3.getColumn(i, 0, s),
      u = r.Matrix3.getColumn(i, 1, C),
      l = r.Matrix3.getColumn(i, 2, c),
      f = t.Cartesian3.magnitude(o),
      g = t.Cartesian3.magnitude(u),
      m = t.Cartesian3.magnitude(l);
    return !((0 === f && (0 === g || 0 === m)) || (0 === g && 0 === m));
  }),
    (o.computeProjectTo2DArguments = function (e, i, o, u) {
      n.Check.defined('positions', e),
        n.Check.defined('centerResult', i),
        n.Check.defined('planeAxis1Result', o),
        n.Check.defined('planeAxis2Result', u);
      var l,
        f,
        g = a.OrientedBoundingBox.fromPoints(e, d),
        m = g.halfAxes,
        x = r.Matrix3.getColumn(m, 0, s),
        h = r.Matrix3.getColumn(m, 1, C),
        p = r.Matrix3.getColumn(m, 2, c),
        B = t.Cartesian3.magnitude(x),
        P = t.Cartesian3.magnitude(h),
        M = t.Cartesian3.magnitude(p),
        k = Math.min(B, P, M);
      return (
        (0 !== B || (0 !== P && 0 !== M)) &&
        (0 !== P || 0 !== M) &&
        ((k !== P && k !== M) || (l = x),
        k === B ? (l = h) : k === M && (f = h),
        (k !== B && k !== P) || (f = p),
        t.Cartesian3.normalize(l, o),
        t.Cartesian3.normalize(f, u),
        t.Cartesian3.clone(g.center, i),
        !0)
      );
    }),
    (o.createProjectPointsTo2DFunction = function (e, n, t) {
      return function (i) {
        for (var r = new Array(i.length), a = 0; a < i.length; a++)
          r[a] = l(i[a], e, n, t);
        return r;
      };
    }),
    (o.createProjectPointTo2DFunction = function (e, n, t) {
      return function (i, r) {
        return l(i, e, n, t, r);
      };
    }),
    (e.CoplanarPolygonGeometryLibrary = o);
});
