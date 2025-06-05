define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './PrimitiveType-97893bc7',
  './Transforms-1509c877',
], function (e, t, r, n, a, i, o, u) {
  var c = Object.freeze({ NONE: 0, TRIANGLES: 1, LINES: 2, POLYLINES: 3 });
  function s(e, r, n, a) {
    (this[0] = t.defaultValue(e, 0)),
      (this[1] = t.defaultValue(n, 0)),
      (this[2] = t.defaultValue(r, 0)),
      (this[3] = t.defaultValue(a, 0));
  }
  (s.packedLength = 4),
    (s.pack = function (e, n, a) {
      return (
        r.Check.typeOf.object('value', e),
        r.Check.defined('array', n),
        (a = t.defaultValue(a, 0)),
        (n[a++] = e[0]),
        (n[a++] = e[1]),
        (n[a++] = e[2]),
        (n[a++] = e[3]),
        n
      );
    }),
    (s.unpack = function (e, n, a) {
      return (
        r.Check.defined('array', e),
        (n = t.defaultValue(n, 0)),
        t.defined(a) || (a = new s()),
        (a[0] = e[n++]),
        (a[1] = e[n++]),
        (a[2] = e[n++]),
        (a[3] = e[n++]),
        a
      );
    }),
    (s.clone = function (e, r) {
      if (t.defined(e))
        return t.defined(r)
          ? ((r[0] = e[0]), (r[1] = e[1]), (r[2] = e[2]), (r[3] = e[3]), r)
          : new s(e[0], e[2], e[1], e[3]);
    }),
    (s.fromArray = function (e, n, a) {
      return (
        r.Check.defined('array', e),
        (n = t.defaultValue(n, 0)),
        t.defined(a) || (a = new s()),
        (a[0] = e[n]),
        (a[1] = e[n + 1]),
        (a[2] = e[n + 2]),
        (a[3] = e[n + 3]),
        a
      );
    }),
    (s.fromColumnMajorArray = function (e, t) {
      return r.Check.defined('values', e), s.clone(e, t);
    }),
    (s.fromRowMajorArray = function (e, n) {
      return (
        r.Check.defined('values', e),
        t.defined(n)
          ? ((n[0] = e[0]), (n[1] = e[2]), (n[2] = e[1]), (n[3] = e[3]), n)
          : new s(e[0], e[1], e[2], e[3])
      );
    }),
    (s.fromScale = function (e, n) {
      return (
        r.Check.typeOf.object('scale', e),
        t.defined(n)
          ? ((n[0] = e.x), (n[1] = 0), (n[2] = 0), (n[3] = e.y), n)
          : new s(e.x, 0, 0, e.y)
      );
    }),
    (s.fromUniformScale = function (e, n) {
      return (
        r.Check.typeOf.number('scale', e),
        t.defined(n)
          ? ((n[0] = e), (n[1] = 0), (n[2] = 0), (n[3] = e), n)
          : new s(e, 0, 0, e)
      );
    }),
    (s.fromRotation = function (e, n) {
      r.Check.typeOf.number('angle', e);
      var a = Math.cos(e),
        i = Math.sin(e);
      return t.defined(n)
        ? ((n[0] = a), (n[1] = i), (n[2] = -i), (n[3] = a), n)
        : new s(a, -i, i, a);
    }),
    (s.toArray = function (e, n) {
      return (
        r.Check.typeOf.object('matrix', e),
        t.defined(n)
          ? ((n[0] = e[0]), (n[1] = e[1]), (n[2] = e[2]), (n[3] = e[3]), n)
          : [e[0], e[1], e[2], e[3]]
      );
    }),
    (s.getElementIndex = function (e, t) {
      return (
        r.Check.typeOf.number.greaterThanOrEquals('row', t, 0),
        r.Check.typeOf.number.lessThanOrEquals('row', t, 1),
        r.Check.typeOf.number.greaterThanOrEquals('column', e, 0),
        r.Check.typeOf.number.lessThanOrEquals('column', e, 1),
        2 * e + t
      );
    }),
    (s.getColumn = function (e, t, n) {
      r.Check.typeOf.object('matrix', e),
        r.Check.typeOf.number.greaterThanOrEquals('index', t, 0),
        r.Check.typeOf.number.lessThanOrEquals('index', t, 1),
        r.Check.typeOf.object('result', n);
      var a = 2 * t,
        i = e[a],
        o = e[a + 1];
      return (n.x = i), (n.y = o), n;
    }),
    (s.setColumn = function (e, t, n, a) {
      r.Check.typeOf.object('matrix', e),
        r.Check.typeOf.number.greaterThanOrEquals('index', t, 0),
        r.Check.typeOf.number.lessThanOrEquals('index', t, 1),
        r.Check.typeOf.object('cartesian', n),
        r.Check.typeOf.object('result', a);
      var i = 2 * t;
      return ((a = s.clone(e, a))[i] = n.x), (a[i + 1] = n.y), a;
    }),
    (s.getRow = function (e, t, n) {
      r.Check.typeOf.object('matrix', e),
        r.Check.typeOf.number.greaterThanOrEquals('index', t, 0),
        r.Check.typeOf.number.lessThanOrEquals('index', t, 1),
        r.Check.typeOf.object('result', n);
      var a = e[t],
        i = e[t + 2];
      return (n.x = a), (n.y = i), n;
    }),
    (s.setRow = function (e, t, n, a) {
      return (
        r.Check.typeOf.object('matrix', e),
        r.Check.typeOf.number.greaterThanOrEquals('index', t, 0),
        r.Check.typeOf.number.lessThanOrEquals('index', t, 1),
        r.Check.typeOf.object('cartesian', n),
        r.Check.typeOf.object('result', a),
        ((a = s.clone(e, a))[t] = n.x),
        (a[t + 2] = n.y),
        a
      );
    });
  var f = new a.Cartesian2();
  s.getScale = function (e, t) {
    return (
      r.Check.typeOf.object('matrix', e),
      r.Check.typeOf.object('result', t),
      (t.x = a.Cartesian2.magnitude(a.Cartesian2.fromElements(e[0], e[1], f))),
      (t.y = a.Cartesian2.magnitude(a.Cartesian2.fromElements(e[2], e[3], f))),
      t
    );
  };
  var l = new a.Cartesian2();
  function h(e) {
    (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)),
      r.Check.typeOf.object('options.attributes', e.attributes),
      (this.attributes = e.attributes),
      (this.indices = e.indices),
      (this.primitiveType = t.defaultValue(
        e.primitiveType,
        o.PrimitiveType.TRIANGLES,
      )),
      (this.boundingSphere = e.boundingSphere),
      (this.geometryType = t.defaultValue(e.geometryType, c.NONE)),
      (this.boundingSphereCV = e.boundingSphereCV),
      (this.offsetAttribute = e.offsetAttribute);
  }
  (s.getMaximumScale = function (e) {
    return s.getScale(e, l), a.Cartesian2.maximumComponent(l);
  }),
    (s.multiply = function (e, t, n) {
      r.Check.typeOf.object('left', e),
        r.Check.typeOf.object('right', t),
        r.Check.typeOf.object('result', n);
      var a = e[0] * t[0] + e[2] * t[1],
        i = e[0] * t[2] + e[2] * t[3],
        o = e[1] * t[0] + e[3] * t[1],
        u = e[1] * t[2] + e[3] * t[3];
      return (n[0] = a), (n[1] = o), (n[2] = i), (n[3] = u), n;
    }),
    (s.add = function (e, t, n) {
      return (
        r.Check.typeOf.object('left', e),
        r.Check.typeOf.object('right', t),
        r.Check.typeOf.object('result', n),
        (n[0] = e[0] + t[0]),
        (n[1] = e[1] + t[1]),
        (n[2] = e[2] + t[2]),
        (n[3] = e[3] + t[3]),
        n
      );
    }),
    (s.subtract = function (e, t, n) {
      return (
        r.Check.typeOf.object('left', e),
        r.Check.typeOf.object('right', t),
        r.Check.typeOf.object('result', n),
        (n[0] = e[0] - t[0]),
        (n[1] = e[1] - t[1]),
        (n[2] = e[2] - t[2]),
        (n[3] = e[3] - t[3]),
        n
      );
    }),
    (s.multiplyByVector = function (e, t, n) {
      r.Check.typeOf.object('matrix', e),
        r.Check.typeOf.object('cartesian', t),
        r.Check.typeOf.object('result', n);
      var a = e[0] * t.x + e[2] * t.y,
        i = e[1] * t.x + e[3] * t.y;
      return (n.x = a), (n.y = i), n;
    }),
    (s.multiplyByScalar = function (e, t, n) {
      return (
        r.Check.typeOf.object('matrix', e),
        r.Check.typeOf.number('scalar', t),
        r.Check.typeOf.object('result', n),
        (n[0] = e[0] * t),
        (n[1] = e[1] * t),
        (n[2] = e[2] * t),
        (n[3] = e[3] * t),
        n
      );
    }),
    (s.multiplyByScale = function (e, t, n) {
      return (
        r.Check.typeOf.object('matrix', e),
        r.Check.typeOf.object('scale', t),
        r.Check.typeOf.object('result', n),
        (n[0] = e[0] * t.x),
        (n[1] = e[1] * t.x),
        (n[2] = e[2] * t.y),
        (n[3] = e[3] * t.y),
        n
      );
    }),
    (s.negate = function (e, t) {
      return (
        r.Check.typeOf.object('matrix', e),
        r.Check.typeOf.object('result', t),
        (t[0] = -e[0]),
        (t[1] = -e[1]),
        (t[2] = -e[2]),
        (t[3] = -e[3]),
        t
      );
    }),
    (s.transpose = function (e, t) {
      r.Check.typeOf.object('matrix', e), r.Check.typeOf.object('result', t);
      var n = e[0],
        a = e[2],
        i = e[1],
        o = e[3];
      return (t[0] = n), (t[1] = a), (t[2] = i), (t[3] = o), t;
    }),
    (s.abs = function (e, t) {
      return (
        r.Check.typeOf.object('matrix', e),
        r.Check.typeOf.object('result', t),
        (t[0] = Math.abs(e[0])),
        (t[1] = Math.abs(e[1])),
        (t[2] = Math.abs(e[2])),
        (t[3] = Math.abs(e[3])),
        t
      );
    }),
    (s.equals = function (e, r) {
      return (
        e === r ||
        (t.defined(e) &&
          t.defined(r) &&
          e[0] === r[0] &&
          e[1] === r[1] &&
          e[2] === r[2] &&
          e[3] === r[3])
      );
    }),
    (s.equalsArray = function (e, t, r) {
      return (
        e[0] === t[r] &&
        e[1] === t[r + 1] &&
        e[2] === t[r + 2] &&
        e[3] === t[r + 3]
      );
    }),
    (s.equalsEpsilon = function (e, n, a) {
      return (
        r.Check.typeOf.number('epsilon', a),
        e === n ||
          (t.defined(e) &&
            t.defined(n) &&
            Math.abs(e[0] - n[0]) <= a &&
            Math.abs(e[1] - n[1]) <= a &&
            Math.abs(e[2] - n[2]) <= a &&
            Math.abs(e[3] - n[3]) <= a)
      );
    }),
    (s.IDENTITY = Object.freeze(new s(1, 0, 0, 1))),
    (s.ZERO = Object.freeze(new s(0, 0, 0, 0))),
    (s.COLUMN0ROW0 = 0),
    (s.COLUMN0ROW1 = 1),
    (s.COLUMN1ROW0 = 2),
    (s.COLUMN1ROW1 = 3),
    Object.defineProperties(s.prototype, {
      length: {
        get: function () {
          return s.packedLength;
        },
      },
    }),
    (s.prototype.clone = function (e) {
      return s.clone(this, e);
    }),
    (s.prototype.equals = function (e) {
      return s.equals(this, e);
    }),
    (s.prototype.equalsEpsilon = function (e, t) {
      return s.equalsEpsilon(this, e, t);
    }),
    (s.prototype.toString = function () {
      return (
        '(' + this[0] + ', ' + this[2] + ')\n(' + this[1] + ', ' + this[3] + ')'
      );
    }),
    (h.computeNumberOfVertices = function (e) {
      r.Check.typeOf.object('geometry', e);
      var n = -1;
      for (var a in e.attributes)
        if (
          e.attributes.hasOwnProperty(a) &&
          t.defined(e.attributes[a]) &&
          t.defined(e.attributes[a].values)
        ) {
          var i = e.attributes[a],
            o = i.values.length / i.componentsPerAttribute;
          if (n !== o && -1 !== n)
            throw new r.DeveloperError(
              'All attribute lists must have the same number of attributes.',
            );
          n = o;
        }
      return n;
    });
  var p = new n.Cartographic(),
    y = new n.Cartesian3(),
    b = new i.Matrix4(),
    m = [new n.Cartographic(), new n.Cartographic(), new n.Cartographic()],
    C = [new a.Cartesian2(), new a.Cartesian2(), new a.Cartesian2()],
    d = [new a.Cartesian2(), new a.Cartesian2(), new a.Cartesian2()],
    O = new n.Cartesian3(),
    k = new u.Quaternion(),
    x = new i.Matrix4(),
    w = new s();
  (h._textureCoordinateRotationPoints = function (e, t, r, o) {
    var c,
      f = a.Rectangle.center(o, p),
      l = n.Cartographic.toCartesian(f, r, y),
      h = u.Transforms.eastNorthUpToFixedFrame(l, r, b),
      g = i.Matrix4.inverse(h, b),
      j = C,
      v = m;
    (v[0].longitude = o.west),
      (v[0].latitude = o.south),
      (v[1].longitude = o.west),
      (v[1].latitude = o.north),
      (v[2].longitude = o.east),
      (v[2].latitude = o.south);
    var E = O;
    for (c = 0; c < 3; c++)
      n.Cartographic.toCartesian(v[c], r, E),
        (E = i.Matrix4.multiplyByPointAsVector(g, E, E)),
        (j[c].x = E.x),
        (j[c].y = E.y);
    var T = u.Quaternion.fromAxisAngle(n.Cartesian3.UNIT_Z, -t, k),
      M = i.Matrix3.fromQuaternion(T, x),
      N = e.length,
      A = Number.POSITIVE_INFINITY,
      I = Number.POSITIVE_INFINITY,
      V = Number.NEGATIVE_INFINITY,
      q = Number.NEGATIVE_INFINITY;
    for (c = 0; c < N; c++)
      (E = i.Matrix4.multiplyByPointAsVector(g, e[c], E)),
        (E = i.Matrix3.multiplyByVector(M, E, E)),
        (A = Math.min(A, E.x)),
        (I = Math.min(I, E.y)),
        (V = Math.max(V, E.x)),
        (q = Math.max(q, E.y));
    var P = s.fromRotation(t, w),
      S = d;
    (S[0].x = A),
      (S[0].y = I),
      (S[1].x = A),
      (S[1].y = q),
      (S[2].x = V),
      (S[2].y = I);
    var R = j[0],
      L = j[2].x - R.x,
      B = j[1].y - R.y;
    for (c = 0; c < 3; c++) {
      var D = S[c];
      s.multiplyByVector(P, D, D),
        (D.x = (D.x - R.x) / L),
        (D.y = (D.y - R.y) / B);
    }
    var Y = S[0],
      _ = S[1],
      G = S[2],
      U = new Array(6);
    return (
      a.Cartesian2.pack(Y, U),
      a.Cartesian2.pack(_, U, 2),
      a.Cartesian2.pack(G, U, 4),
      U
    );
  }),
    (e.Geometry = h),
    (e.GeometryAttribute = function (e) {
      if (
        ((e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)),
        !t.defined(e.componentDatatype))
      )
        throw new r.DeveloperError('options.componentDatatype is required.');
      if (!t.defined(e.componentsPerAttribute))
        throw new r.DeveloperError(
          'options.componentsPerAttribute is required.',
        );
      if (e.componentsPerAttribute < 1 || 4 < e.componentsPerAttribute)
        throw new r.DeveloperError(
          'options.componentsPerAttribute must be between 1 and 4.',
        );
      if (!t.defined(e.values))
        throw new r.DeveloperError('options.values is required.');
      (this.componentDatatype = e.componentDatatype),
        (this.componentsPerAttribute = e.componentsPerAttribute),
        (this.normalize = t.defaultValue(e.normalize, !1)),
        (this.values = e.values);
    }),
    (e.GeometryType = c),
    (e.Matrix2 = s);
});
