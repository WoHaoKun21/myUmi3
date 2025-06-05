define(['exports', './WebGLConstants-4c11ee5f'], function (L, I) {
  var N = {
      POINTS: I.WebGLConstants.POINTS,
      LINES: I.WebGLConstants.LINES,
      LINE_LOOP: I.WebGLConstants.LINE_LOOP,
      LINE_STRIP: I.WebGLConstants.LINE_STRIP,
      TRIANGLES: I.WebGLConstants.TRIANGLES,
      TRIANGLE_STRIP: I.WebGLConstants.TRIANGLE_STRIP,
      TRIANGLE_FAN: I.WebGLConstants.TRIANGLE_FAN,
      validate: function (L) {
        return (
          L === N.POINTS ||
          L === N.LINES ||
          L === N.LINE_LOOP ||
          L === N.LINE_STRIP ||
          L === N.TRIANGLES ||
          L === N.TRIANGLE_STRIP ||
          L === N.TRIANGLE_FAN
        );
      },
    },
    t = Object.freeze(N);
  L.PrimitiveType = t;
});
