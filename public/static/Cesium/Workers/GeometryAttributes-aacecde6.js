define(['exports', './when-8d13db60'], function (t, n) {
  t.GeometryAttributes = function (t) {
    (t = n.defaultValue(t, n.defaultValue.EMPTY_OBJECT)),
      (this.position = t.position),
      (this.normal = t.normal),
      (this.st = t.st),
      (this.bitangent = t.bitangent),
      (this.tangent = t.tangent),
      (this.color = t.color);
  };
});
