define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './ComponentDatatype-5862616f',
  './GeometryAttribute-2243653a',
  './PrimitiveType-97893bc7',
  './GeometryAttributes-aacecde6',
  './IndexDatatype-9435b55f',
  './arrayFill-9766fb2e',
  './GeometryOffsetAttribute-999fc023',
  './VertexFormat-fe4db402',
  './CylinderGeometryLibrary-8c0fda9f',
], function (e, t, r, a, o, n, i, s, u, f, m, d, p, l, y, b) {
  var c = new n.Cartesian2(),
    v = new o.Cartesian3(),
    h = new o.Cartesian3(),
    A = new o.Cartesian3(),
    w = new o.Cartesian3();
  function g(e) {
    var a = (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)).length,
      o = e.topRadius,
      n = e.bottomRadius,
      i = t.defaultValue(e.vertexFormat, y.VertexFormat.DEFAULT),
      s = t.defaultValue(e.slices, 128);
    if (!t.defined(a))
      throw new r.DeveloperError('options.length must be defined.');
    if (!t.defined(o))
      throw new r.DeveloperError('options.topRadius must be defined.');
    if (!t.defined(n))
      throw new r.DeveloperError('options.bottomRadius must be defined.');
    if (s < 3)
      throw new r.DeveloperError(
        'options.slices must be greater than or equal to 3.',
      );
    if (
      t.defined(e.offsetAttribute) &&
      e.offsetAttribute === l.GeometryOffsetAttribute.TOP
    )
      throw new r.DeveloperError(
        'GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.',
      );
    (this._length = a),
      (this._topRadius = o),
      (this._bottomRadius = n),
      (this._vertexFormat = y.VertexFormat.clone(i)),
      (this._slices = s),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = 'createCylinderGeometry');
  }
  (g.packedLength = y.VertexFormat.packedLength + 5),
    (g.pack = function (e, a, o) {
      if (!t.defined(e)) throw new r.DeveloperError('value is required');
      if (!t.defined(a)) throw new r.DeveloperError('array is required');
      return (
        (o = t.defaultValue(o, 0)),
        y.VertexFormat.pack(e._vertexFormat, a, o),
        (o += y.VertexFormat.packedLength),
        (a[o++] = e._length),
        (a[o++] = e._topRadius),
        (a[o++] = e._bottomRadius),
        (a[o++] = e._slices),
        (a[o] = t.defaultValue(e._offsetAttribute, -1)),
        a
      );
    });
  var x,
    _ = new y.VertexFormat(),
    C = {
      vertexFormat: _,
      length: void 0,
      topRadius: void 0,
      bottomRadius: void 0,
      slices: void 0,
      offsetAttribute: void 0,
    };
  (g.unpack = function (e, a, o) {
    if (!t.defined(e)) throw new r.DeveloperError('array is required');
    a = t.defaultValue(a, 0);
    var n = y.VertexFormat.unpack(e, a, _);
    a += y.VertexFormat.packedLength;
    var i = e[a++],
      s = e[a++],
      u = e[a++],
      f = e[a++],
      m = e[a];
    return t.defined(o)
      ? ((o._vertexFormat = y.VertexFormat.clone(n, o._vertexFormat)),
        (o._length = i),
        (o._topRadius = s),
        (o._bottomRadius = u),
        (o._slices = f),
        (o._offsetAttribute = -1 === m ? void 0 : m),
        o)
      : ((C.length = i),
        (C.topRadius = s),
        (C.bottomRadius = u),
        (C.slices = f),
        (C.offsetAttribute = -1 === m ? void 0 : m),
        new g(C));
  }),
    (g.createGeometry = function (e) {
      var r = e._length,
        y = e._topRadius,
        g = e._bottomRadius,
        x = e._vertexFormat,
        _ = e._slices;
      if (!(r <= 0 || y < 0 || g < 0 || (0 === y && 0 === g))) {
        var C,
          F = _ + _,
          D = _ + F,
          G = F + F,
          R = b.CylinderGeometryLibrary.computePositions(r, y, g, _, !0),
          O = x.st ? new Float32Array(2 * G) : void 0,
          T = x.normal ? new Float32Array(3 * G) : void 0,
          V = x.tangent ? new Float32Array(3 * G) : void 0,
          E = x.bitangent ? new Float32Array(3 * G) : void 0,
          L = x.normal || x.tangent || x.bitangent;
        if (L) {
          var P = x.tangent || x.bitangent,
            k = 0,
            M = 0,
            z = 0,
            N = Math.atan2(g - y, r),
            I = v;
          I.z = Math.sin(N);
          var S = Math.cos(N),
            U = A,
            B = h;
          for (C = 0; C < _; C++) {
            var q = (C / _) * a.CesiumMath.TWO_PI,
              Y = S * Math.cos(q),
              Z = S * Math.sin(q);
            L &&
              ((I.x = Y),
              (I.y = Z),
              P &&
                (U = o.Cartesian3.normalize(
                  o.Cartesian3.cross(o.Cartesian3.UNIT_Z, I, U),
                  U,
                )),
              x.normal &&
                ((T[k++] = I.x),
                (T[k++] = I.y),
                (T[k++] = I.z),
                (T[k++] = I.x),
                (T[k++] = I.y),
                (T[k++] = I.z)),
              x.tangent &&
                ((V[M++] = U.x),
                (V[M++] = U.y),
                (V[M++] = U.z),
                (V[M++] = U.x),
                (V[M++] = U.y),
                (V[M++] = U.z)),
              x.bitangent &&
                ((B = o.Cartesian3.normalize(o.Cartesian3.cross(I, U, B), B)),
                (E[z++] = B.x),
                (E[z++] = B.y),
                (E[z++] = B.z),
                (E[z++] = B.x),
                (E[z++] = B.y),
                (E[z++] = B.z)));
          }
          for (C = 0; C < _; C++)
            x.normal && ((T[k++] = 0), (T[k++] = 0), (T[k++] = -1)),
              x.tangent && ((V[M++] = 1), (V[M++] = 0), (V[M++] = 0)),
              x.bitangent && ((E[z++] = 0), (E[z++] = -1), (E[z++] = 0));
          for (C = 0; C < _; C++)
            x.normal && ((T[k++] = 0), (T[k++] = 0), (T[k++] = 1)),
              x.tangent && ((V[M++] = 1), (V[M++] = 0), (V[M++] = 0)),
              x.bitangent && ((E[z++] = 0), (E[z++] = 1), (E[z++] = 0));
        }
        var J = 12 * _ - 12,
          W = d.IndexDatatype.createTypedArray(G, J),
          j = 0,
          H = 0;
        for (C = 0; C < _ - 1; C++)
          (W[j++] = H),
            (W[j++] = H + 2),
            (W[j++] = H + 3),
            (W[j++] = H),
            (W[j++] = H + 3),
            (W[j++] = H + 1),
            (H += 2);
        for (
          W[j++] = F - 2,
            W[j++] = 0,
            W[j++] = 1,
            W[j++] = F - 2,
            W[j++] = 1,
            W[j++] = F - 1,
            C = 1;
          C < _ - 1;
          C++
        )
          (W[j++] = F + C + 1), (W[j++] = F + C), (W[j++] = F);
        for (C = 1; C < _ - 1; C++)
          (W[j++] = D), (W[j++] = D + C), (W[j++] = D + C + 1);
        var K = 0;
        if (x.st) {
          var Q = Math.max(y, g);
          for (C = 0; C < G; C++) {
            var X = o.Cartesian3.fromArray(R, 3 * C, w);
            (O[K++] = (X.x + Q) / (2 * Q)), (O[K++] = (X.y + Q) / (2 * Q));
          }
        }
        var $ = new m.GeometryAttributes();
        x.position &&
          ($.position = new u.GeometryAttribute({
            componentDatatype: s.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: R,
          })),
          x.normal &&
            ($.normal = new u.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: T,
            })),
          x.tangent &&
            ($.tangent = new u.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: V,
            })),
          x.bitangent &&
            ($.bitangent = new u.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: E,
            })),
          x.st &&
            ($.st = new u.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.FLOAT,
              componentsPerAttribute: 2,
              values: O,
            })),
          (c.x = 0.5 * r),
          (c.y = Math.max(g, y));
        var ee = new i.BoundingSphere(
          o.Cartesian3.ZERO,
          n.Cartesian2.magnitude(c),
        );
        if (t.defined(e._offsetAttribute)) {
          r = R.length;
          var te = new Uint8Array(r / 3),
            re = e._offsetAttribute === l.GeometryOffsetAttribute.NONE ? 0 : 1;
          p.arrayFill(te, re),
            ($.applyOffset = new u.GeometryAttribute({
              componentDatatype: s.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: te,
            }));
        }
        return new u.Geometry({
          attributes: $,
          indices: W,
          primitiveType: f.PrimitiveType.TRIANGLES,
          boundingSphere: ee,
          offsetAttribute: e._offsetAttribute,
        });
      }
    }),
    (g.getUnitCylinder = function () {
      return (
        t.defined(x) ||
          (x = g.createGeometry(
            new g({
              topRadius: 1,
              bottomRadius: 1,
              length: 1,
              vertexFormat: y.VertexFormat.POSITION_ONLY,
            }),
          )),
        x
      );
    }),
    (e.CylinderGeometry = g);
});
