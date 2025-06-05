define([
  './when-8d13db60',
  './Check-70bec281',
  './RuntimeError-ba10bc3e',
  './createTaskProcessorWorker',
  './pako_inflate-8ea163f9',
], function (r, t, e, n, i) {
  function a(r, n) {
    if (a.passThroughDataForTesting) return n;
    t.Check.typeOf.object('key', r), t.Check.typeOf.object('data', n);
    var i = r.byteLength;
    if (0 === i || i % 4 != 0)
      throw new e.RuntimeError(
        'The length of key must be greater than 0 and a multiple of 4.',
      );
    var o = new DataView(n),
      s = o.getUint32(0, !0);
    if (1953029805 === s || 2917034100 === s) return n;
    for (
      var u,
        f = new DataView(r),
        h = 0,
        c = n.byteLength,
        v = c - (c % 8),
        g = i,
        d = 8;
      h < v;

    )
      for (u = d = (d + 8) % 24; h < v && u < g; )
        o.setUint32(h, o.getUint32(h, !0) ^ f.getUint32(u, !0), !0),
          o.setUint32(
            h + 4,
            o.getUint32(h + 4, !0) ^ f.getUint32(u + 4, !0),
            !0,
          ),
          (h += 8),
          (u += 24);
    if (h < c)
      for (g <= u && (u = d = (d + 8) % 24); h < c; )
        o.setUint8(h, o.getUint8(h) ^ f.getUint8(u)), h++, u++;
  }
  function o(r, t) {
    return 0 != (r & t);
  }
  a.passThroughDataForTesting = !1;
  var s = [1, 2, 4, 8];
  function u(r, t, e, n, i, a) {
    (this._bits = r),
      (this.cnodeVersion = t),
      (this.imageryVersion = e),
      (this.terrainVersion = n),
      (this.imageryProvider = i),
      (this.terrainProvider = a),
      (this.ancestorHasTerrain = !1),
      (this.terrainState = void 0);
  }
  (u.clone = function (t, e) {
    return (
      r.defined(e)
        ? ((e._bits = t._bits),
          (e.cnodeVersion = t.cnodeVersion),
          (e.imageryVersion = t.imageryVersion),
          (e.terrainVersion = t.terrainVersion),
          (e.imageryProvider = t.imageryProvider),
          (e.terrainProvider = t.terrainProvider))
        : (e = new u(
            t._bits,
            t.cnodeVersion,
            t.imageryVersion,
            t.terrainVersion,
            t.imageryProvider,
            t.terrainProvider,
          )),
      (e.ancestorHasTerrain = t.ancestorHasTerrain),
      (e.terrainState = t.terrainState),
      e
    );
  }),
    (u.prototype.setParent = function (r) {
      this.ancestorHasTerrain = r.ancestorHasTerrain || this.hasTerrain();
    }),
    (u.prototype.hasSubtree = function () {
      return o(this._bits, 16);
    }),
    (u.prototype.hasImagery = function () {
      return o(this._bits, 64);
    }),
    (u.prototype.hasTerrain = function () {
      return o(this._bits, 128);
    }),
    (u.prototype.hasChildren = function () {
      return o(this._bits, 15);
    }),
    (u.prototype.hasChild = function (r) {
      return o(this._bits, s[r]);
    }),
    (u.prototype.getChildBitmask = function () {
      return 15 & this._bits;
    });
  var f = Uint16Array.BYTES_PER_ELEMENT,
    h = Int32Array.BYTES_PER_ELEMENT,
    c = Uint32Array.BYTES_PER_ELEMENT,
    v = {
      METADATA: 0,
      TERRAIN: 1,
      DBROOT: 2,
      fromString: function (r) {
        return 'Metadata' === r
          ? v.METADATA
          : 'Terrain' === r
          ? v.TERRAIN
          : 'DbRoot' === r
          ? v.DBROOT
          : void 0;
      },
    },
    g = 1953029805;
  return n(function (r, t) {
    var n = v.fromString(r.type),
      o = r.buffer;
    a(r.key, o);
    var s = (function (r) {
      var t = new DataView(r),
        n = 0,
        a = t.getUint32(n, !0);
      if (((n += c), a !== g && 2917034100 !== a))
        throw new e.RuntimeError('Invalid magic');
      var o = t.getUint32(n, a === g);
      n += c;
      var s = new Uint8Array(r, n),
        u = i.pako.inflate(s);
      if (u.length === o) return u;
      throw new e.RuntimeError("Size of packet doesn't match header");
    })(o);
    o = s.buffer;
    var d = s.length;
    switch (n) {
      case v.METADATA:
        return (function (r, t, n) {
          var i = new DataView(r),
            a = 0,
            o = i.getUint32(a, !0);
          if (((a += c), 32301 !== o))
            throw new e.RuntimeError('Invalid magic');
          var s = i.getUint32(a, !0);
          if (((a += c), 1 !== s))
            throw new e.RuntimeError(
              'Invalid data type. Must be 1 for QuadTreePacket',
            );
          var v = i.getUint32(a, !0);
          if (((a += c), 2 !== v))
            throw new e.RuntimeError(
              'Invalid QuadTreePacket version. Only version 2 is supported.',
            );
          var g = i.getInt32(a, !0);
          a += h;
          var d = i.getInt32(a, !0);
          if (((a += h), 32 !== d))
            throw new e.RuntimeError('Invalid instance size.');
          var T = i.getInt32(a, !0);
          a += h;
          var w = i.getInt32(a, !0);
          a += h;
          var p = i.getInt32(a, !0);
          if (T !== g * d + (a += h))
            throw new e.RuntimeError('Invalid dataBufferOffset');
          if (T + w + p !== t)
            throw new e.RuntimeError('Invalid packet offsets');
          for (var y = [], E = 0; E < g; ++E) {
            var l = i.getUint8(a);
            ++a, ++a;
            var m = i.getUint16(a, !0);
            a += f;
            var b = i.getUint16(a, !0);
            a += f;
            var U = i.getUint16(a, !0);
            (a += f), (a += f), (a += f), (a += h), (a += h), (a += 8);
            var R = i.getUint8(a++),
              I = i.getUint8(a++);
            (a += f), y.push(new u(l, m, b, U, R, I));
          }
          var V = [],
            _ = 0,
            A = 0,
            k = y[_++];
          return (
            '' === n ? ++A : (V[n] = k),
            (function r(t, e, n) {
              var i = !1;
              if (4 === n) {
                if (e.hasSubtree()) return;
                i = !0;
              }
              for (var a = 0; a < 4; ++a) {
                var o = t + a.toString();
                if (i) V[o] = null;
                else if (n < 4)
                  if (e.hasChild(a)) {
                    if (_ === g)
                      return void console.log('Incorrect number of instances');
                    var s = y[_++];
                    (V[o] = s), r(o, s, n + 1);
                  } else V[o] = null;
              }
            })(n, k, A),
            V
          );
        })(o, d, r.quadKey);
      case v.TERRAIN:
        return (function (r, t, e) {
          for (var n = new DataView(r), i = 0, a = []; i < t; ) {
            for (var o = i, s = 0; s < 4; ++s) {
              var u = n.getUint32(i, !0);
              (i += c), (i += u);
            }
            var f = r.slice(o, i);
            e.push(f), a.push(f);
          }
          return a;
        })(o, d, t);
      case v.DBROOT:
        return t.push(o), { buffer: o };
    }
  });
});
