define([
  './when-8d13db60',
  './createTaskProcessorWorker',
  './pako_inflate-8ea163f9',
  './unzip-9ad5f9b4',
], function (n, r, e, a) {
  var i = !1;
  if ('undefined' != typeof WebAssembly) {
    a.unzip.onRuntimeInitialized = function () {
      i = !0;
    };
    var t = a.unzip.cwrap('unzip', 'number', [
        'number',
        'number',
        'number',
        'number',
      ]),
      E = a.unzip.cwrap('freePointer', null, ['number']);
  }
  return r(function (n, r) {
    var u,
      f = n.data,
      p = new Uint8Array(f);
    return !0 === i
      ? {
          data: (u = (function (n) {
            var r = 4 * n.length,
              e = a.unzip._malloc(Uint8Array.BYTES_PER_ELEMENT * r),
              i = new Uint8Array(r);
            a.unzip.HEAPU8.set(i, e / Uint8Array.BYTES_PER_ELEMENT);
            var u,
              f = a.unzip._malloc(Uint8Array.BYTES_PER_ELEMENT * n.length);
            for (
              a.unzip.HEAPU8.set(n, f / Uint8Array.BYTES_PER_ELEMENT);
              0 == (u = t(e, r, f, n.length));

            )
              E(e),
                (r *= 4),
                (e = a.unzip._malloc(Uint8Array.BYTES_PER_ELEMENT * r)),
                (i = new Uint8Array(r)),
                a.unzip.HEAPU8.set(i, e / Uint8Array.BYTES_PER_ELEMENT);
            var p = new Uint8Array(a.unzip.HEAPU8.buffer, e, u);
            i = n = null;
            var l = new Uint8Array(p);
            return E(e), E(f), l;
          })(p)),
        }
      : ((u = e.pako.inflate(p).buffer),
        r.push(u),
        { data: new Uint8Array(u) });
  });
});
