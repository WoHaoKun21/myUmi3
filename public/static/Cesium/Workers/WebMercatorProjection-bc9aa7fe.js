define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
], function (e, t, i, a, o, r) {
  function n(e) {
    (this._ellipsoid = t.defaultValue(e, r.Ellipsoid.WGS84)),
      (this._semimajorAxis = this._ellipsoid.maximumRadius),
      (this._oneOverSemimajorAxis = 1 / this._semimajorAxis);
  }
  Object.defineProperties(n.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid;
      },
    },
  }),
    (n.mercatorAngleToGeodeticLatitude = function (e) {
      return a.CesiumMath.PI_OVER_TWO - 2 * Math.atan(Math.exp(-e));
    }),
    (n.geodeticLatitudeToMercatorAngle = function (e) {
      n.MaximumLatitude < e
        ? (e = n.MaximumLatitude)
        : e < -n.MaximumLatitude && (e = -n.MaximumLatitude);
      var t = Math.sin(e);
      return 0.5 * Math.log((1 + t) / (1 - t));
    }),
    (n.MaximumLatitude = n.mercatorAngleToGeodeticLatitude(Math.PI)),
    (n.prototype.project = function (e, i) {
      var a = this._semimajorAxis,
        r = e.longitude * a,
        d = n.geodeticLatitudeToMercatorAngle(e.latitude) * a,
        u = e.height;
      return t.defined(i)
        ? ((i.x = r), (i.y = d), (i.z = u), i)
        : new o.Cartesian3(r, d, u);
    }),
    (n.prototype.unproject = function (e, a) {
      if (!t.defined(e)) throw new i.DeveloperError('cartesian is required');
      var r = this._oneOverSemimajorAxis,
        d = e.x * r,
        u = n.mercatorAngleToGeodeticLatitude(e.y * r),
        s = e.z;
      return t.defined(a)
        ? ((a.longitude = d), (a.latitude = u), (a.height = s), a)
        : new o.Cartographic(d, u, s);
    }),
    (e.WebMercatorProjection = n);
});
