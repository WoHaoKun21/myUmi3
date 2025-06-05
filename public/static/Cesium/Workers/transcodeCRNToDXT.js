define([
  './when-8d13db60',
  './RuntimeError-ba10bc3e',
  './WebGLConstants-4c11ee5f',
  './createTaskProcessorWorker',
  './CompressedTextureBuffer-21cababf',
  './PixelFormat-8e0e5be1',
], function (e, r, n, t, f, a) {
  var o,
    s,
    i = {};
  (i[0] = a.PixelFormat.RGB_DXT1),
    (i[1] = a.PixelFormat.RGBA_DXT3),
    (i[2] = a.PixelFormat.RGBA_DXT5);
  var u,
    d = 0;
  function c(n, t) {
    var c = n.data,
      l = c.byteLength,
      m = new Uint8Array(c),
      _ = u._malloc(l);
    !(function (e, r, n, t) {
      var f,
        a = n / 4,
        o = t % 4,
        s = new Uint32Array(e.buffer, 0, (t - o) / 4),
        i = new Uint32Array(r.buffer);
      for (f = 0; f < s.length; f++) i[a + f] = s[f];
      for (f = t - o; f < t; f++) r[n + f] = e[f];
    })(m, u.HEAPU8, _, l);
    var b = u._crn_get_dxt_format(_, l),
      p = i[b];
    if (!e.defined(p))
      throw new r.RuntimeError('Unsupported compressed format.');
    var w,
      x = u._crn_get_levels(_, l),
      y = u._crn_get_width(_, l),
      g = u._crn_get_height(_, l),
      h = 0;
    for (w = 0; w < x; ++w)
      h += a.PixelFormat.compressedTextureSizeInBytes(p, y >> w, g >> w);
    if (
      (d < h &&
        (e.defined(o) && u._free(o),
        (o = u._malloc(h)),
        (s = new Uint8Array(u.HEAPU8.buffer, o, h)),
        (d = h)),
      u._crn_decompress(_, l, o, h, 0, x),
      u._free(_),
      e.defaultValue(n.bMipMap, !1))
    ) {
      var v = s.slice(0, h);
      return t.push(v.buffer), new f.CompressedTextureBuffer(p, y, g, v);
    }
    var A = a.PixelFormat.compressedTextureSizeInBytes(p, y, g),
      P = s.subarray(0, A),
      B = new Uint8Array(A);
    return (
      B.set(P, 0), t.push(B.buffer), new f.CompressedTextureBuffer(p, y, g, B)
    );
  }
  function l(e) {
    (u = e), (self.onmessage = t(c)), self.postMessage(!0);
  }
  return function (r) {
    var n = r.data.webAssemblyConfig;
    if (e.defined(n))
      return require([n.modulePath], function (r) {
        e.defined(n.wasmBinaryFile) && (e.defined(r) || (r = self.Module)),
          l(r);
      });
  };
});
