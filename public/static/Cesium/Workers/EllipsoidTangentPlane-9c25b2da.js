define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './Cartesian4-5af5bb24',
  './Transforms-1509c877',
  './IntersectionTests-dbfba52c',
  './Plane-2bcb9154',
], function (e, n, t, i, a, r, s, o, c, m) {
  function l(e, t, a) {
    (this.minimum = i.Cartesian3.clone(n.defaultValue(e, i.Cartesian3.ZERO))),
      (this.maximum = i.Cartesian3.clone(n.defaultValue(t, i.Cartesian3.ZERO))),
      (a = n.defined(a)
        ? i.Cartesian3.clone(a)
        : i.Cartesian3.midpoint(
            this.minimum,
            this.maximum,
            new i.Cartesian3(),
          )),
      (this.center = a);
  }
  (l.fromPoints = function (e, t) {
    if ((n.defined(t) || (t = new l()), !n.defined(e) || 0 === e.length))
      return (
        (t.minimum = i.Cartesian3.clone(i.Cartesian3.ZERO, t.minimum)),
        (t.maximum = i.Cartesian3.clone(i.Cartesian3.ZERO, t.maximum)),
        (t.center = i.Cartesian3.clone(i.Cartesian3.ZERO, t.center)),
        t
      );
    for (
      var a = e[0].x,
        r = e[0].y,
        s = e[0].z,
        o = e[0].x,
        c = e[0].y,
        m = e[0].z,
        d = e.length,
        u = 1;
      u < d;
      u++
    ) {
      var f = e[u],
        h = f.x,
        C = f.y,
        p = f.z;
      (a = Math.min(h, a)),
        (o = Math.max(h, o)),
        (r = Math.min(C, r)),
        (c = Math.max(C, c)),
        (s = Math.min(p, s)),
        (m = Math.max(p, m));
    }
    var x = t.minimum;
    (x.x = a), (x.y = r), (x.z = s);
    var y = t.maximum;
    return (
      (y.x = o),
      (y.y = c),
      (y.z = m),
      (t.center = i.Cartesian3.midpoint(x, y, t.center)),
      t
    );
  }),
    (l.clone = function (e, t) {
      if (n.defined(e))
        return n.defined(t)
          ? ((t.minimum = i.Cartesian3.clone(e.minimum, t.minimum)),
            (t.maximum = i.Cartesian3.clone(e.maximum, t.maximum)),
            (t.center = i.Cartesian3.clone(e.center, t.center)),
            t)
          : new l(e.minimum, e.maximum, e.center);
    }),
    (l.equals = function (e, t) {
      return (
        e === t ||
        (n.defined(e) &&
          n.defined(t) &&
          i.Cartesian3.equals(e.center, t.center) &&
          i.Cartesian3.equals(e.minimum, t.minimum) &&
          i.Cartesian3.equals(e.maximum, t.maximum))
      );
    });
  var d = new i.Cartesian3();
  (l.intersectPlane = function (e, n) {
    t.Check.defined('box', e),
      t.Check.defined('plane', n),
      (d = i.Cartesian3.subtract(e.maximum, e.minimum, d));
    var a = i.Cartesian3.multiplyByScalar(d, 0.5, d),
      s = n.normal,
      o = a.x * Math.abs(s.x) + a.y * Math.abs(s.y) + a.z * Math.abs(s.z),
      c = i.Cartesian3.dot(e.center, s) + n.distance;
    return 0 < c - o
      ? r.Intersect.INSIDE
      : c + o < 0
      ? r.Intersect.OUTSIDE
      : r.Intersect.INTERSECTING;
  }),
    (l.prototype.clone = function (e) {
      return l.clone(this, e);
    }),
    (l.prototype.intersectPlane = function (e) {
      return l.intersectPlane(this, e);
    }),
    (l.prototype.equals = function (e) {
      return l.equals(this, e);
    });
  var u = new s.Cartesian4();
  function f(e, s) {
    if (
      (t.Check.defined('origin', e),
      (e = (s = n.defaultValue(s, a.Ellipsoid.WGS84)).scaleToGeodeticSurface(
        e,
      )),
      !n.defined(e))
    )
      throw new t.DeveloperError(
        'origin must not be at the center of the ellipsoid.',
      );
    var c = o.Transforms.eastNorthUpToFixedFrame(e, s);
    (this._ellipsoid = s),
      (this._origin = e),
      (this._xAxis = i.Cartesian3.fromCartesian4(r.Matrix4.getColumn(c, 0, u))),
      (this._yAxis = i.Cartesian3.fromCartesian4(r.Matrix4.getColumn(c, 1, u)));
    var l = i.Cartesian3.fromCartesian4(r.Matrix4.getColumn(c, 2, u));
    this._plane = m.Plane.fromPointNormal(e, l);
  }
  Object.defineProperties(f.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      },
    },
    origin: {
      get: function () {
        return this._origin;
      },
    },
    plane: {
      get: function () {
        return this._plane;
      },
    },
    xAxis: {
      get: function () {
        return this._xAxis;
      },
    },
    yAxis: {
      get: function () {
        return this._yAxis;
      },
    },
    zAxis: {
      get: function () {
        return this._plane.normal;
      },
    },
  });
  var h = new l();
  f.fromPoints = function (e, n) {
    return (
      t.Check.defined('cartesians', e), new f(l.fromPoints(e, h).center, n)
    );
  };
  var C = new c.Ray(),
    p = new i.Cartesian3();
  (f.prototype.projectPointOntoPlane = function (e, r) {
    t.Check.defined('cartesian', e);
    var s = C;
    (s.origin = e), i.Cartesian3.normalize(e, s.direction);
    var o = c.IntersectionTests.rayPlane(s, this._plane, p);
    if (
      (n.defined(o) ||
        (i.Cartesian3.negate(s.direction, s.direction),
        (o = c.IntersectionTests.rayPlane(s, this._plane, p))),
      n.defined(o))
    ) {
      var m = i.Cartesian3.subtract(o, this._origin, o),
        l = i.Cartesian3.dot(this._xAxis, m),
        d = i.Cartesian3.dot(this._yAxis, m);
      return n.defined(r) ? ((r.x = l), (r.y = d), r) : new a.Cartesian2(l, d);
    }
  }),
    (f.prototype.projectPointsOntoPlane = function (e, i) {
      t.Check.defined('cartesians', e), n.defined(i) || (i = []);
      for (var a = 0, r = e.length, s = 0; s < r; s++) {
        var o = this.projectPointOntoPlane(e[s], i[a]);
        n.defined(o) && ((i[a] = o), a++);
      }
      return (i.length = a), i;
    }),
    (f.prototype.projectPointToNearestOnPlane = function (e, r) {
      t.Check.defined('cartesian', e), n.defined(r) || (r = new a.Cartesian2());
      var s = C;
      (s.origin = e), i.Cartesian3.clone(this._plane.normal, s.direction);
      var o = c.IntersectionTests.rayPlane(s, this._plane, p);
      n.defined(o) ||
        (i.Cartesian3.negate(s.direction, s.direction),
        (o = c.IntersectionTests.rayPlane(s, this._plane, p)));
      var m = i.Cartesian3.subtract(o, this._origin, o),
        l = i.Cartesian3.dot(this._xAxis, m),
        d = i.Cartesian3.dot(this._yAxis, m);
      return (r.x = l), (r.y = d), r;
    }),
    (f.prototype.projectPointsToNearestOnPlane = function (e, i) {
      t.Check.defined('cartesians', e), n.defined(i) || (i = []);
      var a = e.length;
      i.length = a;
      for (var r = 0; r < a; r++)
        i[r] = this.projectPointToNearestOnPlane(e[r], i[r]);
      return i;
    });
  var x = new i.Cartesian3();
  (f.prototype.projectPointOntoEllipsoid = function (e, a) {
    t.Check.defined('cartesian', e), n.defined(a) || (a = new i.Cartesian3());
    var r = this._ellipsoid,
      s = this._origin,
      o = this._xAxis,
      c = this._yAxis,
      m = x;
    return (
      i.Cartesian3.multiplyByScalar(o, e.x, m),
      (a = i.Cartesian3.add(s, m, a)),
      i.Cartesian3.multiplyByScalar(c, e.y, m),
      i.Cartesian3.add(a, m, a),
      r.scaleToGeocentricSurface(a, a),
      a
    );
  }),
    (f.prototype.projectPointsOntoEllipsoid = function (e, i) {
      t.Check.defined('cartesians', e);
      var a = e.length;
      n.defined(i) ? (i.length = a) : (i = new Array(a));
      for (var r = 0; r < a; ++r)
        i[r] = this.projectPointOntoEllipsoid(e[r], i[r]);
      return i;
    }),
    (e.AxisAlignedBoundingBox = l),
    (e.EllipsoidTangentPlane = f);
});
