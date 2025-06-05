define([
  'exports',
  './when-8d13db60',
  './Math-61ede240',
  './Cartographic-f27b0939',
  './Cartesian2-09435a6c',
  './BoundingSphere-c409f092',
  './ComponentDatatype-5862616f',
  './GeometryAttribute-2243653a',
  './PrimitiveType-97893bc7',
  './Transforms-1509c877',
  './GeometryAttributes-aacecde6',
  './GeometryPipeline-8e55e413',
  './IndexDatatype-9435b55f',
  './arrayRemoveDuplicates-2869246d',
  './ArcType-66bc286a',
  './EllipsoidRhumbLine-6ca4b1e6',
  './PolygonPipeline-cc78b34e',
], function (e, t, r, i, a, n, o, s, u, l, h, c, f, p, d, y, g) {
  function v() {
    (this._array = []), (this._offset = 0), (this._length = 0);
  }
  Object.defineProperties(v.prototype, {
    length: {
      get: function () {
        return this._length;
      },
    },
  }),
    (v.prototype.enqueue = function (e) {
      this._array.push(e), this._length++;
    }),
    (v.prototype.dequeue = function () {
      if (0 !== this._length) {
        var e = this._array,
          t = this._offset,
          r = e[t];
        return (
          (e[t] = void 0),
          10 < ++t && 2 * t > e.length && ((this._array = e.slice(t)), (t = 0)),
          (this._offset = t),
          this._length--,
          r
        );
      }
    }),
    (v.prototype.peek = function () {
      if (0 !== this._length) return this._array[this._offset];
    }),
    (v.prototype.contains = function (e) {
      return -1 !== this._array.indexOf(e);
    }),
    (v.prototype.clear = function () {
      this._array.length = this._offset = this._length = 0;
    }),
    (v.prototype.sort = function (e) {
      0 < this._offset &&
        ((this._array = this._array.slice(this._offset)), (this._offset = 0)),
        this._array.sort(e);
    });
  var m = {
      computeHierarchyPackedLength: function (e) {
        for (var r = 0, a = [e]; 0 < a.length; ) {
          var n = a.pop();
          if (t.defined(n)) {
            r += 2;
            var o = n.positions,
              s = n.holes;
            if (
              (t.defined(o) && (r += o.length * i.Cartesian3.packedLength),
              t.defined(s))
            )
              for (var u = s.length, l = 0; l < u; ++l) a.push(s[l]);
          }
        }
        return r;
      },
      packPolygonHierarchy: function (e, r, a) {
        for (var n = [e]; 0 < n.length; ) {
          var o = n.pop();
          if (t.defined(o)) {
            var s = o.positions,
              u = o.holes;
            if (
              ((r[a++] = t.defined(s) ? s.length : 0),
              (r[a++] = t.defined(u) ? u.length : 0),
              t.defined(s))
            )
              for (var l = s.length, h = 0; h < l; ++h, a += 3)
                i.Cartesian3.pack(s[h], r, a);
            if (t.defined(u))
              for (var c = u.length, f = 0; f < c; ++f) n.push(u[f]);
          }
        }
        return a;
      },
      unpackPolygonHierarchy: function (e, t) {
        for (
          var r = e[t++],
            a = e[t++],
            n = new Array(r),
            o = 0 < a ? new Array(a) : void 0,
            s = 0;
          s < r;
          ++s, t += i.Cartesian3.packedLength
        )
          n[s] = i.Cartesian3.unpack(e, t);
        for (var u = 0; u < a; ++u)
          (o[u] = m.unpackPolygonHierarchy(e, t)),
            (t = o[u].startingIndex),
            delete o[u].startingIndex;
        return { positions: n, holes: o, startingIndex: t };
      },
    },
    C = new i.Cartesian3();
  m.subdivideLineCount = function (e, t, a) {
    var n = i.Cartesian3.distance(e, t) / a,
      o = Math.max(0, Math.ceil(r.CesiumMath.log2(n)));
    return Math.pow(2, o);
  };
  var b = new i.Cartographic(),
    w = new i.Cartographic(),
    T = new i.Cartographic(),
    I = new i.Cartesian3();
  (m.subdivideRhumbLineCount = function (e, t, i, a) {
    var n = e.cartesianToCartographic(t, b),
      o = e.cartesianToCartographic(i, w),
      s = new y.EllipsoidRhumbLine(n, o, e).surfaceDistance / a,
      u = Math.max(0, Math.ceil(r.CesiumMath.log2(s)));
    return Math.pow(2, u);
  }),
    (m.subdivideLine = function (e, r, a, n) {
      var o = m.subdivideLineCount(e, r, a),
        s = i.Cartesian3.distance(e, r),
        u = s / o;
      t.defined(n) || (n = []);
      var l = n;
      l.length = 3 * o;
      for (var h, c, f, p, d = 0, y = 0; y < o; y++) {
        var g =
          ((h = e),
          (c = r),
          (f = y * u),
          (p = s),
          i.Cartesian3.subtract(c, h, C),
          i.Cartesian3.multiplyByScalar(C, f / p, C),
          i.Cartesian3.add(h, C, C),
          [C.x, C.y, C.z]);
        (l[d++] = g[0]), (l[d++] = g[1]), (l[d++] = g[2]);
      }
      return l;
    }),
    (m.subdivideRhumbLine = function (e, i, a, n, o) {
      var s = e.cartesianToCartographic(i, b),
        u = e.cartesianToCartographic(a, w),
        l = new y.EllipsoidRhumbLine(s, u, e),
        h = l.surfaceDistance / n,
        c = Math.max(0, Math.ceil(r.CesiumMath.log2(h))),
        f = Math.pow(2, c),
        p = l.surfaceDistance / f;
      t.defined(o) || (o = []);
      var d = o;
      d.length = 3 * f;
      for (var g = 0, v = 0; v < f; v++) {
        var m = l.interpolateUsingSurfaceDistance(v * p, T),
          C = e.cartographicToCartesian(m, I);
        (d[g++] = C.x), (d[g++] = C.y), (d[g++] = C.z);
      }
      return d;
    });
  var E = new i.Cartesian3(),
    P = new i.Cartesian3(),
    x = new i.Cartesian3(),
    _ = new i.Cartesian3();
  (m.scaleToGeodeticHeightExtruded = function (e, r, n, o, s) {
    o = t.defaultValue(o, a.Ellipsoid.WGS84);
    var u = E,
      l = P,
      h = x,
      c = _;
    if (
      t.defined(e) &&
      t.defined(e.attributes) &&
      t.defined(e.attributes.position)
    )
      for (
        var f = e.attributes.position.values, p = f.length / 2, d = 0;
        d < p;
        d += 3
      )
        i.Cartesian3.fromArray(f, d, h),
          o.geodeticSurfaceNormal(h, u),
          (c = o.scaleToGeodeticSurface(h, c)),
          (l = i.Cartesian3.multiplyByScalar(u, n, l)),
          (l = i.Cartesian3.add(c, l, l)),
          (f[d + p] = l.x),
          (f[d + 1 + p] = l.y),
          (f[d + 2 + p] = l.z),
          s && (c = i.Cartesian3.clone(h, c)),
          (l = i.Cartesian3.multiplyByScalar(u, r, l)),
          (l = i.Cartesian3.add(c, l, l)),
          (f[d] = l.x),
          (f[d + 1] = l.y),
          (f[d + 2] = l.z);
    return e;
  }),
    (m.polygonOutlinesFromHierarchy = function (e, r, a) {
      var n,
        o,
        s,
        u = [],
        l = new v();
      for (l.enqueue(e); 0 !== l.length; ) {
        var h = l.dequeue(),
          c = h.positions;
        if (r)
          for (s = c.length, n = 0; n < s; n++)
            a.scaleToGeodeticSurface(c[n], c[n]);
        if (
          !(
            (c = p.arrayRemoveDuplicates(c, i.Cartesian3.equalsEpsilon, !0))
              .length < 3
          )
        ) {
          var f = h.holes ? h.holes.length : 0;
          for (n = 0; n < f; n++) {
            var d = h.holes[n],
              y = d.positions;
            if (r)
              for (s = y.length, o = 0; o < s; ++o)
                a.scaleToGeodeticSurface(y[o], y[o]);
            if (
              !(
                (y = p.arrayRemoveDuplicates(y, i.Cartesian3.equalsEpsilon, !0))
                  .length < 3
              )
            ) {
              u.push(y);
              var g = 0;
              for (
                t.defined(d.holes) && (g = d.holes.length), o = 0;
                o < g;
                o++
              )
                l.enqueue(d.holes[o]);
            }
          }
          u.push(c);
        }
      }
      return u;
    });
  var A = new i.Cartesian3(6378137, 6378137, 6378137);
  m.polygonsFromHierarchy = function (e, a, n, o) {
    var s = [],
      u = [],
      l = new v();
    for (l.enqueue(e); 0 !== l.length; ) {
      var h,
        c,
        f,
        d = l.dequeue(),
        y = d.positions,
        m = d.holes,
        C = y.slice();
      if (n)
        for (c = y.length, h = 0; h < c; h++)
          o.scaleToGeodeticSurface(y[h], C[h]);
      if (
        (t.defined(o) &&
          !i.Cartesian3.equals(o._radii, A) &&
          (f = r.CesiumMath.EPSILON7),
        !(
          (y = p.arrayRemoveDuplicates(C, i.Cartesian3.equalsEpsilon, !0, f))
            .length < 3
        ))
      ) {
        var b = a(y);
        if (t.defined(b)) {
          var w = [],
            T = g.PolygonPipeline.computeWindingOrder2D(b);
          T === g.WindingOrder.CLOCKWISE &&
            (b.reverse(), (y = y.slice().reverse()));
          var I,
            E = y.slice(),
            P = t.defined(m) ? m.length : 0,
            x = [];
          for (h = 0; h < P; h++) {
            var _ = m[h],
              L = _.positions;
            if (n)
              for (c = L.length, I = 0; I < c; ++I)
                o.scaleToGeodeticSurface(L[I], L[I]);
            if (
              !(
                (L = p.arrayRemoveDuplicates(
                  L,
                  i.Cartesian3.equalsEpsilon,
                  !0,
                  r.CesiumMath.EPSILON7,
                )).length < 3
              )
            ) {
              var M = a(L);
              if (t.defined(M)) {
                (T = g.PolygonPipeline.computeWindingOrder2D(M)) ===
                  g.WindingOrder.CLOCKWISE &&
                  (M.reverse(), (L = L.slice().reverse())),
                  x.push(L),
                  w.push(E.length),
                  (E = E.concat(L)),
                  (b = b.concat(M));
                var S = 0;
                for (
                  t.defined(_.holes) && (S = _.holes.length), I = 0;
                  I < S;
                  I++
                )
                  l.enqueue(_.holes[I]);
              }
            }
          }
          s.push({ outerRing: y, holes: x }),
            u.push({ positions: E, positions2D: b, holes: w });
        }
      }
    }
    return { hierarchy: s, polygons: u };
  };
  var L = new a.Cartesian2(),
    M = new i.Cartesian3(),
    S = new l.Quaternion(),
    G = new n.Matrix3();
  (m.computeBoundingRectangle = function (e, r, a, o, s) {
    for (
      var u = l.Quaternion.fromAxisAngle(e, o, S),
        h = n.Matrix3.fromQuaternion(u, G),
        c = Number.POSITIVE_INFINITY,
        f = Number.NEGATIVE_INFINITY,
        p = Number.POSITIVE_INFINITY,
        d = Number.NEGATIVE_INFINITY,
        y = a.length,
        g = 0;
      g < y;
      ++g
    ) {
      var v = i.Cartesian3.clone(a[g], M);
      n.Matrix3.multiplyByVector(h, v, v);
      var m = r(v, L);
      t.defined(m) &&
        ((c = Math.min(c, m.x)),
        (f = Math.max(f, m.x)),
        (p = Math.min(p, m.y)),
        (d = Math.max(d, m.y)));
    }
    return (s.x = c), (s.y = p), (s.width = f - c), (s.height = d - p), s;
  }),
    (m.createGeometryFromPositions = function (e, t, r, i, a, n) {
      var l = g.PolygonPipeline.triangulate(t.positions2D, t.holes);
      l.length < 3 && (l = [0, 1, 2]);
      var h = t.positions;
      if (i) {
        for (var f = h.length, p = new Array(3 * f), y = 0, v = 0; v < f; v++) {
          var m = h[v];
          (p[y++] = m.x), (p[y++] = m.y), (p[y++] = m.z);
        }
        var C = new s.Geometry({
          attributes: {
            position: new s.GeometryAttribute({
              componentDatatype: o.ComponentDatatype.DOUBLE,
              componentsPerAttribute: 3,
              values: p,
            }),
          },
          indices: l,
          primitiveType: u.PrimitiveType.TRIANGLES,
        });
        return a.normal ? c.GeometryPipeline.computeNormal(C) : C;
      }
      return n === d.ArcType.GEODESIC
        ? g.PolygonPipeline.computeSubdivision(e, h, l, r)
        : n === d.ArcType.RHUMB
        ? g.PolygonPipeline.computeRhumbLineSubdivision(e, h, l, r)
        : void 0;
    });
  var D = [],
    N = new i.Cartesian3(),
    R = new i.Cartesian3();
  (m.computeWallGeometry = function (e, t, a, n, l) {
    var c,
      p,
      y,
      g,
      v,
      C = e.length,
      b = 0;
    if (n)
      for (p = 3 * C * 2, c = new Array(2 * p), y = 0; y < C; y++)
        (g = e[y]),
          (v = e[(y + 1) % C]),
          (c[b] = c[b + p] = g.x),
          (c[++b] = c[b + p] = g.y),
          (c[++b] = c[b + p] = g.z),
          (c[++b] = c[b + p] = v.x),
          (c[++b] = c[b + p] = v.y),
          (c[++b] = c[b + p] = v.z),
          ++b;
    else {
      var w = r.CesiumMath.chordLength(a, t.maximumRadius),
        T = 0;
      if (l === d.ArcType.GEODESIC)
        for (y = 0; y < C; y++)
          T += m.subdivideLineCount(e[y], e[(y + 1) % C], w);
      else if (l === d.ArcType.RHUMB)
        for (y = 0; y < C; y++)
          T += m.subdivideRhumbLineCount(t, e[y], e[(y + 1) % C], w);
      for (p = 3 * (T + C), c = new Array(2 * p), y = 0; y < C; y++) {
        var I;
        (g = e[y]),
          (v = e[(y + 1) % C]),
          l === d.ArcType.GEODESIC
            ? (I = m.subdivideLine(g, v, w, D))
            : l === d.ArcType.RHUMB &&
              (I = m.subdivideRhumbLine(t, g, v, w, D));
        for (var E = I.length, P = 0; P < E; ++P, ++b)
          (c[b] = I[P]), (c[b + p] = I[P]);
        (c[b] = v.x),
          (c[b + p] = v.x),
          (c[++b] = v.y),
          (c[b + p] = v.y),
          (c[++b] = v.z),
          (c[b + p] = v.z),
          ++b;
      }
    }
    C = c.length;
    var x = f.IndexDatatype.createTypedArray(C / 3, C - 6 * e.length),
      _ = 0;
    for (C /= 6, y = 0; y < C; y++) {
      var A = y,
        L = A + 1,
        M = A + C,
        S = M + 1;
      (g = i.Cartesian3.fromArray(c, 3 * A, N)),
        (v = i.Cartesian3.fromArray(c, 3 * L, R)),
        i.Cartesian3.equalsEpsilon(
          g,
          v,
          r.CesiumMath.EPSILON10,
          r.CesiumMath.EPSILON10,
        ) ||
          ((x[_++] = A),
          (x[_++] = M),
          (x[_++] = L),
          (x[_++] = L),
          (x[_++] = M),
          (x[_++] = S));
    }
    return new s.Geometry({
      attributes: new h.GeometryAttributes({
        position: new s.GeometryAttribute({
          componentDatatype: o.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: c,
        }),
      }),
      indices: x,
      primitiveType: u.PrimitiveType.TRIANGLES,
    });
  }),
    (e.PolygonGeometryLibrary = m);
});
