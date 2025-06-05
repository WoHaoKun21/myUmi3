define([
  './when-8d13db60',
  './RuntimeError-ba10bc3e',
  './WebGLConstants-4c11ee5f',
  './createTaskProcessorWorker',
  './pako_inflate-8ea163f9',
  './CompressedTextureBuffer-21cababf',
  './PixelFormat-8e0e5be1',
], function (e, r, n, t, a, i, f) {
  var E,
    u,
    o = {};
  (o[0] = f.PixelFormat.RGB_DXT1),
    (o[1] = f.PixelFormat.RGBA_DXT3),
    (o[2] = f.PixelFormat.RGBA_DXT5);
  var s,
    _ = 0;
  function d(n) {
    var t = new DataView(n),
      a = 0,
      d = t.getUint32(a, !0);
    a += Uint32Array.BYTES_PER_ELEMENT;
    var c = t.getUint32(a, !0);
    a += Uint32Array.BYTES_PER_ELEMENT;
    var T = t.getUint32(a, !0);
    a += Uint32Array.BYTES_PER_ELEMENT;
    var y = t.getUint32(a, !0);
    a += Uint32Array.BYTES_PER_ELEMENT;
    var l = t.getUint32(a, !0);
    a += Uint32Array.BYTES_PER_ELEMENT;
    var m = (function (n) {
        var t = n.data,
          a = t.byteLength,
          d = new Uint8Array(t, n.offset),
          c = s._malloc(a);
        !(function (e, r, n, t) {
          var a,
            i = n / 4,
            f = t % 4,
            E = new Uint32Array(e.buffer, 0, (t - f) / 4),
            u = new Uint32Array(r.buffer);
          for (a = 0; a < E.length; a++) u[i + a] = E[a];
          for (a = t - f; a < t; a++) r[n + a] = e[a];
        })(d, s.HEAPU8, c, a);
        var T = s._crn_get_dxt_format(c, a),
          y = o[T];
        if (!e.defined(y))
          throw new r.RuntimeError('Unsupported compressed format.');
        var l,
          m = s._crn_get_levels(c, a),
          U = s._crn_get_width(c, a),
          p = s._crn_get_height(c, a),
          A = 0;
        for (l = 0; l < m; ++l)
          A += f.PixelFormat.compressedTextureSizeInBytes(y, U >> l, p >> l);
        if (
          (_ < A &&
            (e.defined(E) && s._free(E),
            (E = s._malloc(A)),
            (u = new Uint8Array(s.HEAPU8.buffer, E, A)),
            (_ = A)),
          s._crn_decompress(c, a, E, A, 0, m),
          s._free(c),
          e.defaultValue(n.bMipMap, !1))
        ) {
          var B = u.slice(0, A);
          return new i.CompressedTextureBuffer(y, U, p, B);
        }
        var b = f.PixelFormat.compressedTextureSizeInBytes(y, U, p),
          g = u.subarray(0, b),
          w = new Uint8Array(b);
        return w.set(g, 0), new i.CompressedTextureBuffer(y, U, p, w);
      })({ data: n.slice(a, a + l) }).bufferView,
      U = new ArrayBuffer(a + m.byteLength),
      p = new Uint8Array(U),
      A = new Uint32Array(U);
    return (
      (A[(a = 0)] = d),
      (a += Uint32Array.BYTES_PER_ELEMENT),
      (A[1] = c),
      (a += Uint32Array.BYTES_PER_ELEMENT),
      (A[2] = T),
      (a += Uint32Array.BYTES_PER_ELEMENT),
      (A[3] = y),
      (a += Uint32Array.BYTES_PER_ELEMENT),
      (A[4] = m.byteLength),
      (a += Uint32Array.BYTES_PER_ELEMENT),
      p.set(m, a),
      U
    );
  }
  function c(e, r) {
    for (var n = e.data, t = [], i = 0; i < n.length; i++) {
      var f,
        E = n[i];
      try {
        var u = new Uint8Array(E.zipBuffer);
        (f = a.pako.inflate(u).buffer),
          e.isCRN && (f = d(f)),
          r.push(f),
          t.push({ unzipBuffer: f, name: E.name });
      } catch (n) {
        E.unzipLength === E.zippedLength &&
          ((f = E.zipBuffer.buffer),
          e.isCRN && (f = d(f)),
          r.push(f),
          t.push({ unzipBuffer: f, name: E.name }));
        continue;
      }
    }
    return { data: t };
  }
  function T() {
    (self.onmessage = t(c)), self.postMessage(!0);
  }
  return function (r) {
    var n = r.data.webAssemblyConfig;
    if (e.defined(n))
      return require([n.modulePath], function (r) {
        e.defined(n.wasmBinaryFile) && (e.defined(r) || (r = self.Module)),
          (s = r),
          T();
      });
  };
});
