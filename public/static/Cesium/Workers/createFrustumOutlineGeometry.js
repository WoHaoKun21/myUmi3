define([
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './Cartesian4-5af5bb24',
  './RuntimeError-ba10bc3e',
  './WebGLConstants-4c11ee5f',
  './ComponentDatatype-5862616f',
  './GeometryAttribute-2243653a',
  './PrimitiveType-97893bc7',
  './FeatureDetection-7bd32c34',
  './Transforms-1509c877',
  './buildModuleUrl-392763e2',
  './GeometryAttributes-aacecde6',
  './Plane-2bcb9154',
  './VertexFormat-fe4db402',
  './FrustumGeometry-237f769a',
], function (e, t, r, n, a, i, u, o, c, s, p, m, h, f, d, g, k, y, _) {
  function l(r) {
    t.Check.typeOf.object('options', r),
      t.Check.typeOf.object('options.frustum', r.frustum),
      t.Check.typeOf.object('options.origin', r.origin),
      t.Check.typeOf.object('options.orientation', r.orientation);
    var a,
      i,
      u = r.frustum,
      o = r.orientation,
      c = r.origin,
      s = e.defaultValue(r._drawNearPlane, !0);
    u instanceof _.PerspectiveFrustum
      ? ((a = 0), (i = _.PerspectiveFrustum.packedLength))
      : u instanceof _.OrthographicFrustum &&
        ((a = 1), (i = _.OrthographicFrustum.packedLength)),
      (this._frustumType = a),
      (this._frustum = u.clone()),
      (this._origin = n.Cartesian3.clone(c)),
      (this._orientation = f.Quaternion.clone(o)),
      (this._drawNearPlane = s),
      (this._workerName = 'createFrustumOutlineGeometry'),
      (this.packedLength =
        2 + i + n.Cartesian3.packedLength + f.Quaternion.packedLength);
  }
  l.pack = function (r, a, i) {
    t.Check.typeOf.object('value', r),
      t.Check.defined('array', a),
      (i = e.defaultValue(i, 0));
    var u = r._frustumType,
      o = r._frustum;
    return (
      0 === (a[i++] = u)
        ? (_.PerspectiveFrustum.pack(o, a, i),
          (i += _.PerspectiveFrustum.packedLength))
        : (_.OrthographicFrustum.pack(o, a, i),
          (i += _.OrthographicFrustum.packedLength)),
      n.Cartesian3.pack(r._origin, a, i),
      (i += n.Cartesian3.packedLength),
      f.Quaternion.pack(r._orientation, a, i),
      (a[(i += f.Quaternion.packedLength)] = r._drawNearPlane ? 1 : 0),
      a
    );
  };
  var b = new _.PerspectiveFrustum(),
    v = new _.OrthographicFrustum(),
    C = new f.Quaternion(),
    F = new n.Cartesian3();
  return (
    (l.unpack = function (r, a, i) {
      t.Check.defined('array', r), (a = e.defaultValue(a, 0));
      var u,
        o = r[a++];
      0 === o
        ? ((u = _.PerspectiveFrustum.unpack(r, a, b)),
          (a += _.PerspectiveFrustum.packedLength))
        : ((u = _.OrthographicFrustum.unpack(r, a, v)),
          (a += _.OrthographicFrustum.packedLength));
      var c = n.Cartesian3.unpack(r, a, F);
      a += n.Cartesian3.packedLength;
      var s = f.Quaternion.unpack(r, a, C),
        p = 1 === r[(a += f.Quaternion.packedLength)];
      if (!e.defined(i))
        return new l({
          frustum: u,
          origin: c,
          orientation: s,
          _drawNearPlane: p,
        });
      var m = o === i._frustumType ? i._frustum : void 0;
      return (
        (i._frustum = u.clone(m)),
        (i._frustumType = o),
        (i._origin = n.Cartesian3.clone(c, i._origin)),
        (i._orientation = f.Quaternion.clone(s, i._orientation)),
        (i._drawNearPlane = p),
        i
      );
    }),
    (l.createGeometry = function (e) {
      var t = e._frustumType,
        r = e._frustum,
        n = e._origin,
        a = e._orientation,
        u = e._drawNearPlane,
        o = new Float64Array(24);
      _.FrustumGeometry._computeNearFarPlanes(n, a, t, r, o);
      for (
        var c,
          h,
          f = new g.GeometryAttributes({
            position: new p.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: o,
            }),
          }),
          d = u ? 2 : 1,
          k = new Uint16Array(8 * (d + 1)),
          y = u ? 0 : 1;
        y < 2;
        ++y
      )
        (h = 4 * y),
          (k[(c = u ? 8 * y : 0)] = h),
          (k[c + 1] = h + 1),
          (k[c + 2] = h + 1),
          (k[c + 3] = h + 2),
          (k[c + 4] = h + 2),
          (k[c + 5] = h + 3),
          (k[c + 6] = h + 3),
          (k[c + 7] = h);
      for (y = 0; y < 2; ++y)
        (h = 4 * y),
          (k[(c = 8 * (d + y))] = h),
          (k[c + 1] = h + 4),
          (k[c + 2] = h + 1),
          (k[c + 3] = h + 5),
          (k[c + 4] = h + 2),
          (k[c + 5] = h + 6),
          (k[c + 6] = h + 3),
          (k[c + 7] = h + 7);
      return new p.Geometry({
        attributes: f,
        indices: k,
        primitiveType: m.PrimitiveType.LINES,
        boundingSphere: i.BoundingSphere.fromVertices(o),
      });
    }),
    function (t, r) {
      return e.defined(r) && (t = l.unpack(t, r)), l.createGeometry(t);
    }
  );
});
