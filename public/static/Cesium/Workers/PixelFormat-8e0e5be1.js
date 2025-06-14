define(['exports', './WebGLConstants-4c11ee5f'], function (_, t) {
  var n = {
      UNSIGNED_BYTE: t.WebGLConstants.UNSIGNED_BYTE,
      UNSIGNED_SHORT: t.WebGLConstants.UNSIGNED_SHORT,
      UNSIGNED_INT: t.WebGLConstants.UNSIGNED_INT,
      FLOAT: t.WebGLConstants.FLOAT,
      HALF_FLOAT: t.WebGLConstants.HALF_FLOAT_OES,
      UNSIGNED_INT_24_8: t.WebGLConstants.UNSIGNED_INT_24_8,
      UNSIGNED_SHORT_4_4_4_4: t.WebGLConstants.UNSIGNED_SHORT_4_4_4_4,
      UNSIGNED_SHORT_5_5_5_1: t.WebGLConstants.UNSIGNED_SHORT_5_5_5_1,
      UNSIGNED_SHORT_5_6_5: t.WebGLConstants.UNSIGNED_SHORT_5_6_5,
      isPacked: function (_) {
        return (
          _ === n.UNSIGNED_INT_24_8 ||
          _ === n.UNSIGNED_SHORT_4_4_4_4 ||
          _ === n.UNSIGNED_SHORT_5_5_5_1 ||
          _ === n.UNSIGNED_SHORT_5_6_5
        );
      },
      sizeInBytes: function (_) {
        switch (_) {
          case n.UNSIGNED_BYTE:
            return 1;
          case n.UNSIGNED_SHORT:
          case n.UNSIGNED_SHORT_4_4_4_4:
          case n.UNSIGNED_SHORT_5_5_5_1:
          case n.UNSIGNED_SHORT_5_6_5:
          case n.HALF_FLOAT:
            return 2;
          case n.UNSIGNED_INT:
          case n.FLOAT:
          case n.UNSIGNED_INT_24_8:
            return 4;
        }
      },
      validate: function (_) {
        return (
          _ === n.UNSIGNED_BYTE ||
          _ === n.UNSIGNED_SHORT ||
          _ === n.UNSIGNED_INT ||
          _ === n.FLOAT ||
          _ === n.HALF_FLOAT ||
          _ === n.UNSIGNED_INT_24_8 ||
          _ === n.UNSIGNED_SHORT_4_4_4_4 ||
          _ === n.UNSIGNED_SHORT_5_5_5_1 ||
          _ === n.UNSIGNED_SHORT_5_6_5
        );
      },
    },
    e = {
      DEPTH_COMPONENT: t.WebGLConstants.DEPTH_COMPONENT,
      DEPTH_STENCIL: t.WebGLConstants.DEPTH_STENCIL,
      ALPHA: t.WebGLConstants.ALPHA,
      RGB: t.WebGLConstants.RGB,
      RGBA: t.WebGLConstants.RGBA,
      LUMINANCE: t.WebGLConstants.LUMINANCE,
      LUMINANCE_ALPHA: t.WebGLConstants.LUMINANCE_ALPHA,
      RGB_DXT1: t.WebGLConstants.COMPRESSED_RGB_S3TC_DXT1_EXT,
      RGBA_DXT1: t.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT1_EXT,
      RGBA_DXT3: t.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT3_EXT,
      RGBA_DXT5: t.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT5_EXT,
      RGB_PVRTC_4BPPV1: t.WebGLConstants.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
      RGB_PVRTC_2BPPV1: t.WebGLConstants.COMPRESSED_RGB_PVRTC_2BPPV1_IMG,
      RGBA_PVRTC_4BPPV1: t.WebGLConstants.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
      RGBA_PVRTC_2BPPV1: t.WebGLConstants.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,
      RGB_ETC1: t.WebGLConstants.COMPRESSED_RGB_ETC1_WEBGL,
      componentsLength: function (_) {
        switch (_) {
          case e.RGB:
            return 3;
          case e.RGBA:
            return 4;
          case e.LUMINANCE_ALPHA:
            return 2;
          case e.ALPHA:
          case e.LUMINANCE:
          default:
            return 1;
        }
      },
      validate: function (_) {
        return (
          _ === e.DEPTH_COMPONENT ||
          _ === e.DEPTH_STENCIL ||
          _ === e.ALPHA ||
          _ === e.RGB ||
          _ === e.RGBA ||
          _ === e.LUMINANCE ||
          _ === e.LUMINANCE_ALPHA ||
          _ === e.RGB_DXT1 ||
          _ === e.RGBA_DXT1 ||
          _ === e.RGBA_DXT3 ||
          _ === e.RGBA_DXT5 ||
          _ === e.RGB_PVRTC_4BPPV1 ||
          _ === e.RGB_PVRTC_2BPPV1 ||
          _ === e.RGBA_PVRTC_4BPPV1 ||
          _ === e.RGBA_PVRTC_2BPPV1 ||
          _ === e.RGB_ETC1
        );
      },
      isColorFormat: function (_) {
        return (
          _ === e.ALPHA ||
          _ === e.RGB ||
          _ === e.RGBA ||
          _ === e.LUMINANCE ||
          _ === e.LUMINANCE_ALPHA
        );
      },
      isDepthFormat: function (_) {
        return _ === e.DEPTH_COMPONENT || _ === e.DEPTH_STENCIL;
      },
      isCompressedFormat: function (_) {
        return (
          _ === e.RGB_DXT1 ||
          _ === e.RGBA_DXT1 ||
          _ === e.RGBA_DXT3 ||
          _ === e.RGBA_DXT5 ||
          _ === e.RGB_PVRTC_4BPPV1 ||
          _ === e.RGB_PVRTC_2BPPV1 ||
          _ === e.RGBA_PVRTC_4BPPV1 ||
          _ === e.RGBA_PVRTC_2BPPV1 ||
          _ === e.RGB_ETC1
        );
      },
      isDXTFormat: function (_) {
        return (
          _ === e.RGB_DXT1 ||
          _ === e.RGBA_DXT1 ||
          _ === e.RGBA_DXT3 ||
          _ === e.RGBA_DXT5
        );
      },
      isPVRTCFormat: function (_) {
        return (
          _ === e.RGB_PVRTC_4BPPV1 ||
          _ === e.RGB_PVRTC_2BPPV1 ||
          _ === e.RGBA_PVRTC_4BPPV1 ||
          _ === e.RGBA_PVRTC_2BPPV1
        );
      },
      isETC1Format: function (_) {
        return _ === e.RGB_ETC1;
      },
      compressedTextureSizeInBytes: function (_, t, n) {
        switch (_) {
          case e.RGB_DXT1:
          case e.RGBA_DXT1:
          case e.RGB_ETC1:
            return Math.floor((t + 3) / 4) * Math.floor((n + 3) / 4) * 8;
          case e.RGBA_DXT3:
          case e.RGBA_DXT5:
            return Math.floor((t + 3) / 4) * Math.floor((n + 3) / 4) * 16;
          case e.RGB_PVRTC_4BPPV1:
          case e.RGBA_PVRTC_4BPPV1:
            return Math.floor((Math.max(t, 8) * Math.max(n, 8) * 4 + 7) / 8);
          case e.RGB_PVRTC_2BPPV1:
          case e.RGBA_PVRTC_2BPPV1:
            return Math.floor((Math.max(t, 16) * Math.max(n, 8) * 2 + 7) / 8);
          default:
            return 0;
        }
      },
      textureSizeInBytes: function (_, t, T, G) {
        var R = e.componentsLength(_);
        return n.isPacked(t) && (R = 1), R * n.sizeInBytes(t) * T * G;
      },
      alignmentInBytes: function (_, t, n) {
        var T = e.textureSizeInBytes(_, t, n, 1) % 4;
        return 0 === T ? 4 : 2 === T ? 2 : 1;
      },
      createTypedArray: function (_, t, T, G) {
        var R = n.sizeInBytes(t);
        return new (
          R === Uint8Array.BYTES_PER_ELEMENT
            ? Uint8Array
            : R === Uint16Array.BYTES_PER_ELEMENT
            ? Uint16Array
            : R === Float32Array.BYTES_PER_ELEMENT && t === n.FLOAT
            ? Float32Array
            : Uint32Array
        )(e.componentsLength(_) * T * G);
      },
      flipY: function (_, t, n, T, G) {
        if (1 === G) return _;
        for (
          var R = e.createTypedArray(t, n, T, G),
            P = e.componentsLength(t),
            E = T * P,
            N = 0;
          N < G;
          ++N
        )
          for (var s = N * G * P, B = (G - N - 1) * G * P, r = 0; r < E; ++r)
            R[B + r] = _[s + r];
        return R;
      },
    },
    T = Object.freeze(e);
  (_.PixelDatatype = n), (_.PixelFormat = T);
});
