define(['exports', './when-8d13db60'], function (t, e) {
  function i(t, e, i, n, r) {
    (this._format = t),
      (this._width = e),
      (this._height = i),
      (this._buffer = n),
      (this._datatype = r);
  }
  Object.defineProperties(i.prototype, {
    internalFormat: {
      get: function () {
        return this._format;
      },
    },
    width: {
      get: function () {
        return this._width;
      },
    },
    height: {
      get: function () {
        return this._height;
      },
    },
    bufferView: {
      get: function () {
        return this._buffer;
      },
    },
    pixelDatatype: {
      get: function () {
        return this._datatype;
      },
    },
  }),
    (i.clone = function (t) {
      if (e.defined(t))
        return new i(t._format, t._width, t._height, t._buffer, t._datatype);
    }),
    (i.prototype.clone = function () {
      return i.clone(this);
    }),
    (t.CompressedTextureBuffer = i);
});
