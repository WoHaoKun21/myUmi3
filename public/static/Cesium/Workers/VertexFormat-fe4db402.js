define(['exports', './when-8d13db60', './Check-70bec281'], function (e, t, n) {
  function o(e) {
    (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)),
      (this.position = t.defaultValue(e.position, !1)),
      (this.normal = t.defaultValue(e.normal, !1)),
      (this.st = t.defaultValue(e.st, !1)),
      (this.bitangent = t.defaultValue(e.bitangent, !1)),
      (this.tangent = t.defaultValue(e.tangent, !1)),
      (this.color = t.defaultValue(e.color, !1));
  }
  (o.POSITION_ONLY = Object.freeze(new o({ position: !0 }))),
    (o.POSITION_AND_NORMAL = Object.freeze(
      new o({ position: !0, normal: !0 }),
    )),
    (o.POSITION_NORMAL_AND_ST = Object.freeze(
      new o({ position: !0, normal: !0, st: !0 }),
    )),
    (o.POSITION_AND_ST = Object.freeze(new o({ position: !0, st: !0 }))),
    (o.POSITION_AND_COLOR = Object.freeze(new o({ position: !0, color: !0 }))),
    (o.ALL = Object.freeze(
      new o({ position: !0, normal: !0, st: !0, tangent: !0, bitangent: !0 }),
    )),
    (o.DEFAULT = o.POSITION_NORMAL_AND_ST),
    (o.packedLength = 6),
    (o.pack = function (e, o, i) {
      if (!t.defined(e)) throw new n.DeveloperError('value is required');
      if (!t.defined(o)) throw new n.DeveloperError('array is required');
      return (
        (i = t.defaultValue(i, 0)),
        (o[i++] = e.position ? 1 : 0),
        (o[i++] = e.normal ? 1 : 0),
        (o[i++] = e.st ? 1 : 0),
        (o[i++] = e.tangent ? 1 : 0),
        (o[i++] = e.bitangent ? 1 : 0),
        (o[i] = e.color ? 1 : 0),
        o
      );
    }),
    (o.unpack = function (e, i, r) {
      if (!t.defined(e)) throw new n.DeveloperError('array is required');
      return (
        (i = t.defaultValue(i, 0)),
        t.defined(r) || (r = new o()),
        (r.position = 1 === e[i++]),
        (r.normal = 1 === e[i++]),
        (r.st = 1 === e[i++]),
        (r.tangent = 1 === e[i++]),
        (r.bitangent = 1 === e[i++]),
        (r.color = 1 === e[i]),
        r
      );
    }),
    (o.clone = function (e, n) {
      if (t.defined(e))
        return (
          t.defined(n) || (n = new o()),
          (n.position = e.position),
          (n.normal = e.normal),
          (n.st = e.st),
          (n.tangent = e.tangent),
          (n.bitangent = e.bitangent),
          (n.color = e.color),
          n
        );
    }),
    (e.VertexFormat = o);
});
