define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './Math-61ede240',
  './WebGLConstants-4c11ee5f',
], function (e, r, n, t, i) {
  var a = {
      UNSIGNED_BYTE: i.WebGLConstants.UNSIGNED_BYTE,
      UNSIGNED_SHORT: i.WebGLConstants.UNSIGNED_SHORT,
      UNSIGNED_INT: i.WebGLConstants.UNSIGNED_INT,
      getSizeInBytes: function (e) {
        switch (e) {
          case a.UNSIGNED_BYTE:
            return Uint8Array.BYTES_PER_ELEMENT;
          case a.UNSIGNED_SHORT:
            return Uint16Array.BYTES_PER_ELEMENT;
          case a.UNSIGNED_INT:
            return Uint32Array.BYTES_PER_ELEMENT;
        }
        throw new n.DeveloperError(
          'indexDatatype is required and must be a valid IndexDatatype constant.',
        );
      },
      fromSizeInBytes: function (e) {
        switch (e) {
          case 2:
            return a.UNSIGNED_SHORT;
          case 4:
            return a.UNSIGNED_INT;
          case 1:
            return a.UNSIGNED_BYTE;
          default:
            throw new n.DeveloperError(
              'Size in bytes cannot be mapped to an IndexDatatype',
            );
        }
      },
      validate: function (e) {
        return (
          r.defined(e) &&
          (e === a.UNSIGNED_BYTE ||
            e === a.UNSIGNED_SHORT ||
            e === a.UNSIGNED_INT)
        );
      },
      createTypedArray: function (e, i) {
        if (!r.defined(e))
          throw new n.DeveloperError('numberOfVertices is required.');
        return e >= t.CesiumMath.SIXTY_FOUR_KILOBYTES
          ? new Uint32Array(i)
          : new Uint16Array(i);
      },
      createTypedArrayFromArrayBuffer: function (e, i, a, E) {
        if (!r.defined(e))
          throw new n.DeveloperError('numberOfVertices is required.');
        if (!r.defined(i))
          throw new n.DeveloperError('sourceArray is required.');
        if (!r.defined(a))
          throw new n.DeveloperError('byteOffset is required.');
        return e >= t.CesiumMath.SIXTY_FOUR_KILOBYTES
          ? new Uint32Array(i, a, E)
          : new Uint16Array(i, a, E);
      },
    },
    E = Object.freeze(a);
  e.IndexDatatype = E;
});
