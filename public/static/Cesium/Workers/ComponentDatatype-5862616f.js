define([
  'exports',
  './when-8d13db60',
  './Check-70bec281',
  './WebGLConstants-4c11ee5f',
], function (e, r, n, t) {
  var a = {
      BYTE: t.WebGLConstants.BYTE,
      UNSIGNED_BYTE: t.WebGLConstants.UNSIGNED_BYTE,
      SHORT: t.WebGLConstants.SHORT,
      UNSIGNED_SHORT: t.WebGLConstants.UNSIGNED_SHORT,
      INT: t.WebGLConstants.INT,
      UNSIGNED_INT: t.WebGLConstants.UNSIGNED_INT,
      FLOAT: t.WebGLConstants.FLOAT,
      DOUBLE: t.WebGLConstants.DOUBLE,
      getSizeInBytes: function (e) {
        if (!r.defined(e)) throw new n.DeveloperError('value is required.');
        switch (e) {
          case a.BYTE:
            return Int8Array.BYTES_PER_ELEMENT;
          case a.UNSIGNED_BYTE:
            return Uint8Array.BYTES_PER_ELEMENT;
          case a.SHORT:
            return Int16Array.BYTES_PER_ELEMENT;
          case a.UNSIGNED_SHORT:
            return Uint16Array.BYTES_PER_ELEMENT;
          case a.INT:
            return Int32Array.BYTES_PER_ELEMENT;
          case a.UNSIGNED_INT:
            return Uint32Array.BYTES_PER_ELEMENT;
          case a.FLOAT:
            return Float32Array.BYTES_PER_ELEMENT;
          case a.DOUBLE:
            return Float64Array.BYTES_PER_ELEMENT;
          default:
            throw new n.DeveloperError(
              'componentDatatype is not a valid value.',
            );
        }
      },
      fromTypedArray: function (e) {
        return e instanceof Int8Array
          ? a.BYTE
          : e instanceof Uint8Array
          ? a.UNSIGNED_BYTE
          : e instanceof Int16Array
          ? a.SHORT
          : e instanceof Uint16Array
          ? a.UNSIGNED_SHORT
          : e instanceof Int32Array
          ? a.INT
          : e instanceof Uint32Array
          ? a.UNSIGNED_INT
          : e instanceof Float32Array
          ? a.FLOAT
          : e instanceof Float64Array
          ? a.DOUBLE
          : void 0;
      },
      validate: function (e) {
        return (
          r.defined(e) &&
          (e === a.BYTE ||
            e === a.UNSIGNED_BYTE ||
            e === a.SHORT ||
            e === a.UNSIGNED_SHORT ||
            e === a.INT ||
            e === a.UNSIGNED_INT ||
            e === a.FLOAT ||
            e === a.DOUBLE)
        );
      },
      createTypedArray: function (e, t) {
        if (!r.defined(e))
          throw new n.DeveloperError('componentDatatype is required.');
        if (!r.defined(t))
          throw new n.DeveloperError('valuesOrLength is required.');
        switch (e) {
          case a.BYTE:
            return new Int8Array(t);
          case a.UNSIGNED_BYTE:
            return new Uint8Array(t);
          case a.SHORT:
            return new Int16Array(t);
          case a.UNSIGNED_SHORT:
            return new Uint16Array(t);
          case a.INT:
            return new Int32Array(t);
          case a.UNSIGNED_INT:
            return new Uint32Array(t);
          case a.FLOAT:
            return new Float32Array(t);
          case a.DOUBLE:
            return new Float64Array(t);
          default:
            throw new n.DeveloperError(
              'componentDatatype is not a valid value.',
            );
        }
      },
      createArrayBufferView: function (e, t, E, N) {
        if (!r.defined(e))
          throw new n.DeveloperError('componentDatatype is required.');
        if (!r.defined(t)) throw new n.DeveloperError('buffer is required.');
        switch (
          ((E = r.defaultValue(E, 0)),
          (N = r.defaultValue(N, (t.byteLength - E) / a.getSizeInBytes(e))),
          e)
        ) {
          case a.BYTE:
            return new Int8Array(t, E, N);
          case a.UNSIGNED_BYTE:
            return new Uint8Array(t, E, N);
          case a.SHORT:
            return new Int16Array(t, E, N);
          case a.UNSIGNED_SHORT:
            return new Uint16Array(t, E, N);
          case a.INT:
            return new Int32Array(t, E, N);
          case a.UNSIGNED_INT:
            return new Uint32Array(t, E, N);
          case a.FLOAT:
            return new Float32Array(t, E, N);
          case a.DOUBLE:
            return new Float64Array(t, E, N);
          default:
            throw new n.DeveloperError(
              'componentDatatype is not a valid value.',
            );
        }
      },
      fromName: function (e) {
        switch (e) {
          case 'BYTE':
            return a.BYTE;
          case 'UNSIGNED_BYTE':
            return a.UNSIGNED_BYTE;
          case 'SHORT':
            return a.SHORT;
          case 'UNSIGNED_SHORT':
            return a.UNSIGNED_SHORT;
          case 'INT':
            return a.INT;
          case 'UNSIGNED_INT':
            return a.UNSIGNED_INT;
          case 'FLOAT':
            return a.FLOAT;
          case 'DOUBLE':
            return a.DOUBLE;
          default:
            throw new n.DeveloperError('name is not a valid value.');
        }
      },
    },
    E = Object.freeze(a);
  e.ComponentDatatype = E;
});
