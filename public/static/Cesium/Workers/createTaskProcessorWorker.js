define(['./when-8d13db60'], function (e) {
  return function (r) {
    var n;
    return function (t) {
      var s = t.data,
        a = [],
        i = { id: s.id, result: void 0, error: void 0 };
      return e
        .when(
          (function (r, n, t) {
            try {
              return r(n, t);
            } catch (r) {
              return e.when.reject(r);
            }
          })(r, s.parameters, a),
        )
        .then(function (e) {
          i.result = e;
        })
        .otherwise(function (e) {
          e instanceof Error
            ? (i.error = { name: e.name, message: e.message, stack: e.stack })
            : (i.error = e);
        })
        .always(function () {
          e.defined(n) ||
            (n = e.defaultValue(self.webkitPostMessage, self.postMessage)),
            s.canTransferArrayBuffer || (a.length = 0);
          try {
            n(i, a);
          } catch (r) {
            (i.result = void 0),
              (i.error =
                'postMessage failed with error: ' +
                (function (r) {
                  var n,
                    t = r.name,
                    s = r.message;
                  n =
                    e.defined(t) && e.defined(s) ? t + ': ' + s : r.toString();
                  var a = r.stack;
                  return e.defined(a) && (n += '\n' + a), n;
                })(r) +
                '\n  with responseMessage: ' +
                JSON.stringify(i)),
              n(i);
          }
        });
    };
  };
});
