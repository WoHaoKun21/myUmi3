define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
], function (e, t, n, h, i, r) {
  function a(e, n, h, i) {
    (this.x = t.defaultValue(e, 0)),
      (this.y = t.defaultValue(n, 0)),
      (this.width = t.defaultValue(h, 0)),
      (this.height = t.defaultValue(i, 0));
  }
  (a.packedLength = 4),
    (a.pack = function (e, h, i) {
      return (
        n.Check.typeOf.object('value', e),
        n.Check.defined('array', h),
        (i = t.defaultValue(i, 0)),
        (h[i++] = e.x),
        (h[i++] = e.y),
        (h[i++] = e.width),
        (h[i] = e.height),
        h
      );
    }),
    (a.unpack = function (e, h, i) {
      return (
        n.Check.defined('array', e),
        (h = t.defaultValue(h, 0)),
        t.defined(i) || (i = new a()),
        (i.x = e[h++]),
        (i.y = e[h++]),
        (i.width = e[h++]),
        (i.height = e[h]),
        i
      );
    }),
    (a.fromPoints = function (e, n) {
      if ((t.defined(n) || (n = new a()), !t.defined(e) || 0 === e.length))
        return (n.x = 0), (n.y = 0), (n.width = 0), (n.height = 0), n;
      for (
        var h = e.length, i = e[0].x, r = e[0].y, c = e[0].x, d = e[0].y, u = 1;
        u < h;
        u++
      ) {
        var f = e[u],
          o = f.x,
          y = f.y;
        (i = Math.min(o, i)),
          (c = Math.max(o, c)),
          (r = Math.min(y, r)),
          (d = Math.max(y, d));
      }
      return (n.x = i), (n.y = r), (n.width = c - i), (n.height = d - r), n;
    });
  var c = new r.GeographicProjection(),
    d = new h.Cartographic(),
    u = new h.Cartographic();
  (a.fromRectangle = function (e, n, h) {
    if ((t.defined(h) || (h = new a()), !t.defined(e)))
      return (h.x = 0), (h.y = 0), (h.width = 0), (h.height = 0), h;
    var r = (n = t.defaultValue(n, c)).project(i.Rectangle.southwest(e, d)),
      f = n.project(i.Rectangle.northeast(e, u));
    return (
      i.Cartesian2.subtract(f, r, f),
      (h.x = r.x),
      (h.y = r.y),
      (h.width = f.x),
      (h.height = f.y),
      h
    );
  }),
    (a.clone = function (e, n) {
      if (t.defined(e))
        return t.defined(n)
          ? ((n.x = e.x),
            (n.y = e.y),
            (n.width = e.width),
            (n.height = e.height),
            n)
          : new a(e.x, e.y, e.width, e.height);
    }),
    (a.union = function (e, h, i) {
      n.Check.typeOf.object('left', e),
        n.Check.typeOf.object('right', h),
        t.defined(i) || (i = new a());
      var r = Math.min(e.x, h.x),
        c = Math.min(e.y, h.y),
        d = Math.max(e.x + e.width, h.x + h.width),
        u = Math.max(e.y + e.height, h.y + h.height);
      return (i.x = r), (i.y = c), (i.width = d - r), (i.height = u - c), i;
    }),
    (a.expand = function (e, t, h) {
      n.Check.typeOf.object('rectangle', e),
        n.Check.typeOf.object('point', t),
        (h = a.clone(e, h));
      var i = t.x - h.x,
        r = t.y - h.y;
      return (
        i > h.width ? (h.width = i) : i < 0 && ((h.width -= i), (h.x = t.x)),
        r > h.height ? (h.height = r) : r < 0 && ((h.height -= r), (h.y = t.y)),
        h
      );
    }),
    (a.intersect = function (e, t) {
      n.Check.typeOf.object('left', e), n.Check.typeOf.object('right', t);
      var h = e.x,
        i = e.y,
        a = t.x,
        c = t.y;
      return h > a + t.width ||
        h + e.width < a ||
        i + e.height < c ||
        i > c + t.height
        ? r.Intersect.OUTSIDE
        : r.Intersect.INTERSECTING;
    }),
    (a.equals = function (e, n) {
      return (
        e === n ||
        (t.defined(e) &&
          t.defined(n) &&
          e.x === n.x &&
          e.y === n.y &&
          e.width === n.width &&
          e.height === n.height)
      );
    }),
    (a.prototype.clone = function (e) {
      return a.clone(this, e);
    }),
    (a.prototype.intersect = function (e) {
      return a.intersect(this, e);
    }),
    (a.prototype.equals = function (e) {
      return a.equals(this, e);
    }),
    (e.BoundingRectangle = a);
});
