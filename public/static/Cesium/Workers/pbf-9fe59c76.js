define(['exports'], function (t) {
  var i = function (t, i, r, e, s) {
      var n,
        o,
        h = 8 * s - e - 1,
        a = (1 << h) - 1,
        u = a >> 1,
        f = -7,
        p = r ? s - 1 : 0,
        d = r ? -1 : 1,
        c = t[i + p];
      for (
        p += d, n = c & ((1 << -f) - 1), c >>= -f, f += h;
        0 < f;
        n = 256 * n + t[i + p], p += d, f -= 8
      );
      for (
        o = n & ((1 << -f) - 1), n >>= -f, f += e;
        0 < f;
        o = 256 * o + t[i + p], p += d, f -= 8
      );
      if (0 === n) n = 1 - u;
      else {
        if (n === a) return o ? NaN : (1 / 0) * (c ? -1 : 1);
        (o += Math.pow(2, e)), (n -= u);
      }
      return (c ? -1 : 1) * o * Math.pow(2, n - e);
    },
    r = function (t, i, r, e, s, n) {
      var o,
        h,
        a,
        u = 8 * n - s - 1,
        f = (1 << u) - 1,
        p = f >> 1,
        d = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        c = e ? 0 : n - 1,
        l = e ? 1 : -1,
        w = i < 0 || (0 === i && 1 / i < 0) ? 1 : 0;
      for (
        i = Math.abs(i),
          isNaN(i) || i === 1 / 0
            ? ((h = isNaN(i) ? 1 : 0), (o = f))
            : ((o = Math.floor(Math.log(i) / Math.LN2)),
              i * (a = Math.pow(2, -o)) < 1 && (o--, (a *= 2)),
              2 <= (i += 1 <= o + p ? d / a : d * Math.pow(2, 1 - p)) * a &&
                (o++, (a /= 2)),
              f <= o + p
                ? ((h = 0), (o = f))
                : 1 <= o + p
                ? ((h = (i * a - 1) * Math.pow(2, s)), (o += p))
                : ((h = i * Math.pow(2, p - 1) * Math.pow(2, s)), (o = 0)));
        8 <= s;
        t[r + c] = 255 & h, c += l, h /= 256, s -= 8
      );
      for (
        o = (o << s) | h, u += s;
        0 < u;
        t[r + c] = 255 & o, c += l, o /= 256, u -= 8
      );
      t[r + c - l] |= 128 * w;
    };
  function e(t) {
    (this.buf =
      ArrayBuffer.isView && ArrayBuffer.isView(t) ? t : new Uint8Array(t || 0)),
      (this.pos = 0),
      (this.type = 0),
      (this.length = this.buf.length);
  }
  (e.Varint = 0), (e.Fixed64 = 1), (e.Bytes = 2), (e.Fixed32 = 5);
  var s = 4294967296,
    n = 1 / s;
  function o(t) {
    return t.type === e.Bytes ? t.readVarint() + t.pos : t.pos + 1;
  }
  function h(t, i, r) {
    return r ? 4294967296 * i + (t >>> 0) : 4294967296 * (i >>> 0) + (t >>> 0);
  }
  function a(t, i, r) {
    var e =
      i <= 16383
        ? 1
        : i <= 2097151
        ? 2
        : i <= 268435455
        ? 3
        : Math.ceil(Math.log(i) / (7 * Math.LN2));
    r.realloc(e);
    for (var s = r.pos - 1; t <= s; s--) r.buf[s + e] = r.buf[s];
  }
  function u(t, i) {
    for (var r = 0; r < t.length; r++) i.writeVarint(t[r]);
  }
  function f(t, i) {
    for (var r = 0; r < t.length; r++) i.writeSVarint(t[r]);
  }
  function p(t, i) {
    for (var r = 0; r < t.length; r++) i.writeFloat(t[r]);
  }
  function d(t, i) {
    for (var r = 0; r < t.length; r++) i.writeDouble(t[r]);
  }
  function c(t, i) {
    for (var r = 0; r < t.length; r++) i.writeBoolean(t[r]);
  }
  function l(t, i) {
    for (var r = 0; r < t.length; r++) i.writeFixed32(t[r]);
  }
  function w(t, i) {
    for (var r = 0; r < t.length; r++) i.writeSFixed32(t[r]);
  }
  function F(t, i) {
    for (var r = 0; r < t.length; r++) i.writeFixed64(t[r]);
  }
  function b(t, i) {
    for (var r = 0; r < t.length; r++) i.writeSFixed64(t[r]);
  }
  function g(t, i) {
    return (t[i] | (t[i + 1] << 8) | (t[i + 2] << 16)) + 16777216 * t[i + 3];
  }
  function v(t, i, r) {
    (t[r] = i),
      (t[r + 1] = i >>> 8),
      (t[r + 2] = i >>> 16),
      (t[r + 3] = i >>> 24);
  }
  function x(t, i) {
    return (t[i] | (t[i + 1] << 8) | (t[i + 2] << 16)) + (t[i + 3] << 24);
  }
  (e.prototype = {
    destroy: function () {
      this.buf = null;
    },
    readFields: function (t, i, r) {
      for (r = r || this.length; this.pos < r; ) {
        var e = this.readVarint(),
          s = e >> 3,
          n = this.pos;
        (this.type = 7 & e), t(s, i, this), this.pos === n && this.skip(e);
      }
      return i;
    },
    readMessage: function (t, i) {
      return this.readFields(t, i, this.readVarint() + this.pos);
    },
    readFixed32: function () {
      var t = g(this.buf, this.pos);
      return (this.pos += 4), t;
    },
    readSFixed32: function () {
      var t = x(this.buf, this.pos);
      return (this.pos += 4), t;
    },
    readFixed64: function () {
      var t = g(this.buf, this.pos) + g(this.buf, this.pos + 4) * s;
      return (this.pos += 8), t;
    },
    readSFixed64: function () {
      var t = g(this.buf, this.pos) + x(this.buf, this.pos + 4) * s;
      return (this.pos += 8), t;
    },
    readFloat: function () {
      var t = i(this.buf, this.pos, !0, 23, 4);
      return (this.pos += 4), t;
    },
    readDouble: function () {
      var t = i(this.buf, this.pos, !0, 52, 8);
      return (this.pos += 8), t;
    },
    readVarint: function (t) {
      var i,
        r,
        e = this.buf;
      return (
        (i = 127 & (r = e[this.pos++])),
        r < 128
          ? i
          : ((i |= (127 & (r = e[this.pos++])) << 7),
            r < 128
              ? i
              : ((i |= (127 & (r = e[this.pos++])) << 14),
                r < 128
                  ? i
                  : ((i |= (127 & (r = e[this.pos++])) << 21),
                    r < 128
                      ? i
                      : (function (t, i, r) {
                          var e,
                            s,
                            n = r.buf;
                          if (((e = (112 & (s = n[r.pos++])) >> 4), s < 128))
                            return h(t, e, i);
                          if (((e |= (127 & (s = n[r.pos++])) << 3), s < 128))
                            return h(t, e, i);
                          if (((e |= (127 & (s = n[r.pos++])) << 10), s < 128))
                            return h(t, e, i);
                          if (((e |= (127 & (s = n[r.pos++])) << 17), s < 128))
                            return h(t, e, i);
                          if (((e |= (127 & (s = n[r.pos++])) << 24), s < 128))
                            return h(t, e, i);
                          if (((e |= (1 & (s = n[r.pos++])) << 31), s < 128))
                            return h(t, e, i);
                          throw new Error(
                            'Expected varint not more than 10 bytes',
                          );
                        })((i |= (15 & (r = e[this.pos])) << 28), t, this))))
      );
    },
    readVarint64: function () {
      return this.readVarint(!0);
    },
    readSVarint: function () {
      var t = this.readVarint();
      return t % 2 == 1 ? (t + 1) / -2 : t / 2;
    },
    readBoolean: function () {
      return Boolean(this.readVarint());
    },
    readString: function () {
      var t = this.readVarint() + this.pos,
        i = (function (t, i, r) {
          for (var e = '', s = i; s < r; ) {
            var n,
              o,
              h,
              a = t[s],
              u = null,
              f = 239 < a ? 4 : 223 < a ? 3 : 191 < a ? 2 : 1;
            if (r < s + f) break;
            1 === f
              ? a < 128 && (u = a)
              : 2 === f
              ? 128 == (192 & (n = t[s + 1])) &&
                (u = ((31 & a) << 6) | (63 & n)) <= 127 &&
                (u = null)
              : 3 === f
              ? ((n = t[s + 1]),
                (o = t[s + 2]),
                128 == (192 & n) &&
                  128 == (192 & o) &&
                  ((u = ((15 & a) << 12) | ((63 & n) << 6) | (63 & o)) <=
                    2047 ||
                    (55296 <= u && u <= 57343)) &&
                  (u = null))
              : 4 === f &&
                ((n = t[s + 1]),
                (o = t[s + 2]),
                (h = t[s + 3]),
                128 == (192 & n) &&
                  128 == (192 & o) &&
                  128 == (192 & h) &&
                  ((u =
                    ((15 & a) << 18) |
                    ((63 & n) << 12) |
                    ((63 & o) << 6) |
                    (63 & h)) <= 65535 ||
                    1114112 <= u) &&
                  (u = null)),
              null === u
                ? ((u = 65533), (f = 1))
                : 65535 < u &&
                  ((u -= 65536),
                  (e += String.fromCharCode(((u >>> 10) & 1023) | 55296)),
                  (u = 56320 | (1023 & u))),
              (e += String.fromCharCode(u)),
              (s += f);
          }
          return e;
        })(this.buf, this.pos, t);
      return (this.pos = t), i;
    },
    readBytes: function () {
      var t = this.readVarint() + this.pos,
        i = this.buf.subarray(this.pos, t);
      return (this.pos = t), i;
    },
    readPackedVarint: function (t, i) {
      var r = o(this);
      for (t = t || []; this.pos < r; ) t.push(this.readVarint(i));
      return t;
    },
    readPackedSVarint: function (t) {
      var i = o(this);
      for (t = t || []; this.pos < i; ) t.push(this.readSVarint());
      return t;
    },
    readPackedBoolean: function (t) {
      var i = o(this);
      for (t = t || []; this.pos < i; ) t.push(this.readBoolean());
      return t;
    },
    readPackedFloat: function (t) {
      var i = o(this);
      for (t = t || []; this.pos < i; ) t.push(this.readFloat());
      return t;
    },
    readPackedDouble: function (t) {
      var i = o(this);
      for (t = t || []; this.pos < i; ) t.push(this.readDouble());
      return t;
    },
    readPackedFixed32: function (t) {
      var i = o(this);
      for (t = t || []; this.pos < i; ) t.push(this.readFixed32());
      return t;
    },
    readPackedSFixed32: function (t) {
      var i = o(this);
      for (t = t || []; this.pos < i; ) t.push(this.readSFixed32());
      return t;
    },
    readPackedFixed64: function (t) {
      var i = o(this);
      for (t = t || []; this.pos < i; ) t.push(this.readFixed64());
      return t;
    },
    readPackedSFixed64: function (t) {
      var i = o(this);
      for (t = t || []; this.pos < i; ) t.push(this.readSFixed64());
      return t;
    },
    skip: function (t) {
      var i = 7 & t;
      if (i === e.Varint) for (; 127 < this.buf[this.pos++]; );
      else if (i === e.Bytes) this.pos = this.readVarint() + this.pos;
      else if (i === e.Fixed32) this.pos += 4;
      else {
        if (i !== e.Fixed64) throw new Error('Unimplemented type: ' + i);
        this.pos += 8;
      }
    },
    writeTag: function (t, i) {
      this.writeVarint((t << 3) | i);
    },
    realloc: function (t) {
      for (var i = this.length || 16; i < this.pos + t; ) i *= 2;
      if (i !== this.length) {
        var r = new Uint8Array(i);
        r.set(this.buf), (this.buf = r), (this.length = i);
      }
    },
    finish: function () {
      return (
        (this.length = this.pos),
        (this.pos = 0),
        this.buf.subarray(0, this.length)
      );
    },
    writeFixed32: function (t) {
      this.realloc(4), v(this.buf, t, this.pos), (this.pos += 4);
    },
    writeSFixed32: function (t) {
      this.realloc(4), v(this.buf, t, this.pos), (this.pos += 4);
    },
    writeFixed64: function (t) {
      this.realloc(8),
        v(this.buf, -1 & t, this.pos),
        v(this.buf, Math.floor(t * n), this.pos + 4),
        (this.pos += 8);
    },
    writeSFixed64: function (t) {
      this.realloc(8),
        v(this.buf, -1 & t, this.pos),
        v(this.buf, Math.floor(t * n), this.pos + 4),
        (this.pos += 8);
    },
    writeVarint: function (t) {
      268435455 < (t = +t || 0) || t < 0
        ? (function (t, i) {
            var r, e, s, n;
            if (
              (0 <= t
                ? ((r = t % 4294967296 | 0), (e = (t / 4294967296) | 0))
                : ((e = ~(-t / 4294967296)),
                  4294967295 ^ (r = ~(-t % 4294967296))
                    ? (r = (r + 1) | 0)
                    : (e = (e + 1) | (r = 0))),
              0x10000000000000000 <= t || t < -0x10000000000000000)
            )
              throw new Error("Given varint doesn't fit into 10 bytes");
            i.realloc(10),
              (s = r),
              ((n = i).buf[n.pos++] = (127 & s) | 128),
              (s >>>= 7),
              (n.buf[n.pos++] = (127 & s) | 128),
              (s >>>= 7),
              (n.buf[n.pos++] = (127 & s) | 128),
              (s >>>= 7),
              (n.buf[n.pos++] = (127 & s) | 128),
              (s >>>= 7),
              (n.buf[n.pos] = 127 & s),
              (function (t, i) {
                var r = (7 & t) << 4;
                (i.buf[i.pos++] |= r | ((t >>>= 3) ? 128 : 0)),
                  t &&
                    ((i.buf[i.pos++] = (127 & t) | ((t >>>= 7) ? 128 : 0)),
                    t &&
                      ((i.buf[i.pos++] = (127 & t) | ((t >>>= 7) ? 128 : 0)),
                      t &&
                        ((i.buf[i.pos++] = (127 & t) | ((t >>>= 7) ? 128 : 0)),
                        t &&
                          ((i.buf[i.pos++] =
                            (127 & t) | ((t >>>= 7) ? 128 : 0)),
                          t && (i.buf[i.pos++] = 127 & t)))));
              })(e, i);
          })(t, this)
        : (this.realloc(4),
          (this.buf[this.pos++] = (127 & t) | (127 < t ? 128 : 0)),
          t <= 127 ||
            ((this.buf[this.pos++] = (127 & (t >>>= 7)) | (127 < t ? 128 : 0)),
            t <= 127 ||
              ((this.buf[this.pos++] =
                (127 & (t >>>= 7)) | (127 < t ? 128 : 0)),
              t <= 127 || (this.buf[this.pos++] = (t >>> 7) & 127))));
    },
    writeSVarint: function (t) {
      this.writeVarint(t < 0 ? 2 * -t - 1 : 2 * t);
    },
    writeBoolean: function (t) {
      this.writeVarint(Boolean(t));
    },
    writeString: function (t) {
      (t = String(t)), this.realloc(4 * t.length), this.pos++;
      var i = this.pos;
      this.pos = (function (t, i, r) {
        for (var e, s, n = 0; n < i.length; n++) {
          if (55295 < (e = i.charCodeAt(n)) && e < 57344) {
            if (!s) {
              56319 < e || n + 1 === i.length
                ? ((t[r++] = 239), (t[r++] = 191), (t[r++] = 189))
                : (s = e);
              continue;
            }
            if (e < 56320) {
              (t[r++] = 239), (t[r++] = 191), (t[r++] = 189), (s = e);
              continue;
            }
            (e = ((s - 55296) << 10) | (e - 56320) | 65536), (s = null);
          } else
            s && ((t[r++] = 239), (t[r++] = 191), (t[r++] = 189), (s = null));
          t[r++] =
            e < 128
              ? e
              : ((t[r++] =
                  e < 2048
                    ? (e >> 6) | 192
                    : ((t[r++] =
                        e < 65536
                          ? (e >> 12) | 224
                          : ((t[r++] = (e >> 18) | 240),
                            ((e >> 12) & 63) | 128)),
                      ((e >> 6) & 63) | 128)),
                (63 & e) | 128);
        }
        return r;
      })(this.buf, t, this.pos);
      var r = this.pos - i;
      128 <= r && a(i, r, this),
        (this.pos = i - 1),
        this.writeVarint(r),
        (this.pos += r);
    },
    writeFloat: function (t) {
      this.realloc(4), r(this.buf, t, this.pos, !0, 23, 4), (this.pos += 4);
    },
    writeDouble: function (t) {
      this.realloc(8), r(this.buf, t, this.pos, !0, 52, 8), (this.pos += 8);
    },
    writeBytes: function (t) {
      var i = t.length;
      this.writeVarint(i), this.realloc(i);
      for (var r = 0; r < i; r++) this.buf[this.pos++] = t[r];
    },
    writeRawMessage: function (t, i) {
      this.pos++;
      var r = this.pos;
      t(i, this);
      var e = this.pos - r;
      128 <= e && a(r, e, this),
        (this.pos = r - 1),
        this.writeVarint(e),
        (this.pos += e);
    },
    writeMessage: function (t, i, r) {
      this.writeTag(t, e.Bytes), this.writeRawMessage(i, r);
    },
    writePackedVarint: function (t, i) {
      this.writeMessage(t, u, i);
    },
    writePackedSVarint: function (t, i) {
      this.writeMessage(t, f, i);
    },
    writePackedBoolean: function (t, i) {
      this.writeMessage(t, c, i);
    },
    writePackedFloat: function (t, i) {
      this.writeMessage(t, p, i);
    },
    writePackedDouble: function (t, i) {
      this.writeMessage(t, d, i);
    },
    writePackedFixed32: function (t, i) {
      this.writeMessage(t, l, i);
    },
    writePackedSFixed32: function (t, i) {
      this.writeMessage(t, w, i);
    },
    writePackedFixed64: function (t, i) {
      this.writeMessage(t, F, i);
    },
    writePackedSFixed64: function (t, i) {
      this.writeMessage(t, b, i);
    },
    writeBytesField: function (t, i) {
      this.writeTag(t, e.Bytes), this.writeBytes(i);
    },
    writeFixed32Field: function (t, i) {
      this.writeTag(t, e.Fixed32), this.writeFixed32(i);
    },
    writeSFixed32Field: function (t, i) {
      this.writeTag(t, e.Fixed32), this.writeSFixed32(i);
    },
    writeFixed64Field: function (t, i) {
      this.writeTag(t, e.Fixed64), this.writeFixed64(i);
    },
    writeSFixed64Field: function (t, i) {
      this.writeTag(t, e.Fixed64), this.writeSFixed64(i);
    },
    writeVarintField: function (t, i) {
      this.writeTag(t, e.Varint), this.writeVarint(i);
    },
    writeSVarintField: function (t, i) {
      this.writeTag(t, e.Varint), this.writeSVarint(i);
    },
    writeStringField: function (t, i) {
      this.writeTag(t, e.Bytes), this.writeString(i);
    },
    writeFloatField: function (t, i) {
      this.writeTag(t, e.Fixed32), this.writeFloat(i);
    },
    writeDoubleField: function (t, i) {
      this.writeTag(t, e.Fixed64), this.writeDouble(i);
    },
    writeBooleanField: function (t, i) {
      this.writeVarintField(t, Boolean(i));
    },
  }),
    (t.Protobuf = e);
});
