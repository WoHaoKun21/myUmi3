!(function (t) {
  var e = -2,
    n = [
      0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9,
      9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
      11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
      12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13,
      13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
      13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14,
      14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
      14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
      14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
      14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
      15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 16, 17, 18, 18,
      19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22,
      23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
      24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
      25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,
      26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,
      27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27,
      27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28,
      28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
      28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
      28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
      28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29,
      29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29,
      29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29,
      29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29,
    ];
  function a() {
    var t = this;
    function e(t, e) {
      for (var n = 0; (n |= 1 & t), (t >>>= 1), (n <<= 1), 0 < --e; );
      return n >>> 1;
    }
    t.build_tree = function (n) {
      var a,
        i,
        r,
        _ = t.dyn_tree,
        o = t.stat_desc.static_tree,
        u = t.stat_desc.elems,
        f = -1;
      for (n.heap_len = 0, n.heap_max = 573, a = 0; a < u; a++)
        0 !== _[2 * a]
          ? ((n.heap[++n.heap_len] = f = a), (n.depth[a] = 0))
          : (_[2 * a + 1] = 0);
      for (; n.heap_len < 2; )
        (_[2 * (r = n.heap[++n.heap_len] = f < 2 ? ++f : 0)] = 1),
          (n.depth[r] = 0),
          n.opt_len--,
          o && (n.static_len -= o[2 * r + 1]);
      for (t.max_code = f, a = Math.floor(n.heap_len / 2); 1 <= a; a--)
        n.pqdownheap(_, a);
      for (
        r = u;
        (a = n.heap[1]),
          (n.heap[1] = n.heap[n.heap_len--]),
          n.pqdownheap(_, 1),
          (i = n.heap[1]),
          (n.heap[--n.heap_max] = a),
          (n.heap[--n.heap_max] = i),
          (_[2 * r] = _[2 * a] + _[2 * i]),
          (n.depth[r] = Math.max(n.depth[a], n.depth[i]) + 1),
          (_[2 * a + 1] = _[2 * i + 1] = r),
          (n.heap[1] = r++),
          n.pqdownheap(_, 1),
          2 <= n.heap_len;

      );
      (n.heap[--n.heap_max] = n.heap[1]),
        (function (e) {
          var n,
            a,
            i,
            r,
            _,
            o,
            u = t.dyn_tree,
            f = t.stat_desc.static_tree,
            d = t.stat_desc.extra_bits,
            s = t.stat_desc.extra_base,
            l = t.stat_desc.max_length,
            c = 0;
          for (r = 0; r <= 15; r++) e.bl_count[r] = 0;
          for (
            u[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1;
            n < 573;
            n++
          )
            l < (r = u[2 * u[2 * (a = e.heap[n]) + 1] + 1] + 1) &&
              ((r = l), c++),
              (u[2 * a + 1] = r),
              a > t.max_code ||
                (e.bl_count[r]++,
                (_ = 0),
                s <= a && (_ = d[a - s]),
                (o = u[2 * a]),
                (e.opt_len += o * (r + _)),
                f && (e.static_len += o * (f[2 * a + 1] + _)));
          if (0 !== c) {
            do {
              for (r = l - 1; 0 === e.bl_count[r]; ) r--;
              e.bl_count[r]--,
                (e.bl_count[r + 1] += 2),
                e.bl_count[l]--,
                (c -= 2);
            } while (0 < c);
            for (r = l; 0 !== r; r--)
              for (a = e.bl_count[r]; 0 !== a; )
                (i = e.heap[--n]) > t.max_code ||
                  (u[2 * i + 1] != r &&
                    ((e.opt_len += (r - u[2 * i + 1]) * u[2 * i]),
                    (u[2 * i + 1] = r)),
                  a--);
          }
        })(n),
        (function (t, n, a) {
          var i,
            r,
            _,
            o = [],
            u = 0;
          for (i = 1; i <= 15; i++) o[i] = u = (u + a[i - 1]) << 1;
          for (r = 0; r <= n; r++)
            0 !== (_ = t[2 * r + 1]) && (t[2 * r] = e(o[_]++, _));
        })(_, t.max_code, n.bl_count);
    };
  }
  function i(t, e, n, a, i) {
    var r = this;
    (r.static_tree = t),
      (r.extra_bits = e),
      (r.extra_base = n),
      (r.elems = a),
      (r.max_length = i);
  }
  function r(t, e, n, a, i) {
    var r = this;
    (r.good_length = t),
      (r.max_lazy = e),
      (r.nice_length = n),
      (r.max_chain = a),
      (r.func = i);
  }
  (a._length_code = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13,
    13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17,
    17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19,
    19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
    20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
    25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26,
    26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,
    26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27,
    27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27,
    27, 27, 27, 27, 27, 28,
  ]),
    (a.base_length = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64,
      80, 96, 112, 128, 160, 192, 224, 0,
    ]),
    (a.base_dist = [
      0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512,
      768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384, 24576,
    ]),
    (a.d_code = function (t) {
      return t < 256 ? n[t] : n[256 + (t >>> 7)];
    }),
    (a.extra_lbits = [
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
      5, 5, 5, 0,
    ]),
    (a.extra_dbits = [
      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
      11, 11, 12, 12, 13, 13,
    ]),
    (a.extra_blbits = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7,
    ]),
    (a.bl_order = [
      16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
    ]),
    (i.static_ltree = [
      12, 8, 140, 8, 76, 8, 204, 8, 44, 8, 172, 8, 108, 8, 236, 8, 28, 8, 156,
      8, 92, 8, 220, 8, 60, 8, 188, 8, 124, 8, 252, 8, 2, 8, 130, 8, 66, 8, 194,
      8, 34, 8, 162, 8, 98, 8, 226, 8, 18, 8, 146, 8, 82, 8, 210, 8, 50, 8, 178,
      8, 114, 8, 242, 8, 10, 8, 138, 8, 74, 8, 202, 8, 42, 8, 170, 8, 106, 8,
      234, 8, 26, 8, 154, 8, 90, 8, 218, 8, 58, 8, 186, 8, 122, 8, 250, 8, 6, 8,
      134, 8, 70, 8, 198, 8, 38, 8, 166, 8, 102, 8, 230, 8, 22, 8, 150, 8, 86,
      8, 214, 8, 54, 8, 182, 8, 118, 8, 246, 8, 14, 8, 142, 8, 78, 8, 206, 8,
      46, 8, 174, 8, 110, 8, 238, 8, 30, 8, 158, 8, 94, 8, 222, 8, 62, 8, 190,
      8, 126, 8, 254, 8, 1, 8, 129, 8, 65, 8, 193, 8, 33, 8, 161, 8, 97, 8, 225,
      8, 17, 8, 145, 8, 81, 8, 209, 8, 49, 8, 177, 8, 113, 8, 241, 8, 9, 8, 137,
      8, 73, 8, 201, 8, 41, 8, 169, 8, 105, 8, 233, 8, 25, 8, 153, 8, 89, 8,
      217, 8, 57, 8, 185, 8, 121, 8, 249, 8, 5, 8, 133, 8, 69, 8, 197, 8, 37, 8,
      165, 8, 101, 8, 229, 8, 21, 8, 149, 8, 85, 8, 213, 8, 53, 8, 181, 8, 117,
      8, 245, 8, 13, 8, 141, 8, 77, 8, 205, 8, 45, 8, 173, 8, 109, 8, 237, 8,
      29, 8, 157, 8, 93, 8, 221, 8, 61, 8, 189, 8, 125, 8, 253, 8, 19, 9, 275,
      9, 147, 9, 403, 9, 83, 9, 339, 9, 211, 9, 467, 9, 51, 9, 307, 9, 179, 9,
      435, 9, 115, 9, 371, 9, 243, 9, 499, 9, 11, 9, 267, 9, 139, 9, 395, 9, 75,
      9, 331, 9, 203, 9, 459, 9, 43, 9, 299, 9, 171, 9, 427, 9, 107, 9, 363, 9,
      235, 9, 491, 9, 27, 9, 283, 9, 155, 9, 411, 9, 91, 9, 347, 9, 219, 9, 475,
      9, 59, 9, 315, 9, 187, 9, 443, 9, 123, 9, 379, 9, 251, 9, 507, 9, 7, 9,
      263, 9, 135, 9, 391, 9, 71, 9, 327, 9, 199, 9, 455, 9, 39, 9, 295, 9, 167,
      9, 423, 9, 103, 9, 359, 9, 231, 9, 487, 9, 23, 9, 279, 9, 151, 9, 407, 9,
      87, 9, 343, 9, 215, 9, 471, 9, 55, 9, 311, 9, 183, 9, 439, 9, 119, 9, 375,
      9, 247, 9, 503, 9, 15, 9, 271, 9, 143, 9, 399, 9, 79, 9, 335, 9, 207, 9,
      463, 9, 47, 9, 303, 9, 175, 9, 431, 9, 111, 9, 367, 9, 239, 9, 495, 9, 31,
      9, 287, 9, 159, 9, 415, 9, 95, 9, 351, 9, 223, 9, 479, 9, 63, 9, 319, 9,
      191, 9, 447, 9, 127, 9, 383, 9, 255, 9, 511, 9, 0, 7, 64, 7, 32, 7, 96, 7,
      16, 7, 80, 7, 48, 7, 112, 7, 8, 7, 72, 7, 40, 7, 104, 7, 24, 7, 88, 7, 56,
      7, 120, 7, 4, 7, 68, 7, 36, 7, 100, 7, 20, 7, 84, 7, 52, 7, 116, 7, 3, 8,
      131, 8, 67, 8, 195, 8, 35, 8, 163, 8, 99, 8, 227, 8,
    ]),
    (i.static_dtree = [
      0, 5, 16, 5, 8, 5, 24, 5, 4, 5, 20, 5, 12, 5, 28, 5, 2, 5, 18, 5, 10, 5,
      26, 5, 6, 5, 22, 5, 14, 5, 30, 5, 1, 5, 17, 5, 9, 5, 25, 5, 5, 5, 21, 5,
      13, 5, 29, 5, 3, 5, 19, 5, 11, 5, 27, 5, 7, 5, 23, 5,
    ]),
    (i.static_l_desc = new i(i.static_ltree, a.extra_lbits, 257, 286, 15)),
    (i.static_d_desc = new i(i.static_dtree, a.extra_dbits, 0, 30, 15)),
    (i.static_bl_desc = new i(null, a.extra_blbits, 0, 19, 7));
  var _,
    o = [
      new r(0, 0, 0, 0, 0),
      new r(4, 4, 8, 4, 1),
      new r(4, 5, 16, 8, 1),
      new r(4, 6, 32, 32, 1),
      new r(4, 4, 16, 16, 2),
      new r(8, 16, 32, 32, 2),
      new r(8, 16, 128, 128, 2),
      new r(8, 32, 128, 256, 2),
      new r(32, 128, 258, 1024, 2),
      new r(32, 258, 258, 4096, 2),
    ],
    u = [
      'need dictionary',
      'stream end',
      '',
      '',
      'stream error',
      'data error',
      '',
      'buffer error',
      '',
      '',
    ],
    f = 113,
    d = 666,
    s = 262;
  function l(t, e, n, a) {
    var i = t[2 * e],
      r = t[2 * n];
    return i < r || (i == r && a[e] <= a[n]);
  }
  function c() {
    var t,
      n,
      r,
      _,
      c,
      h,
      p,
      x,
      v,
      b,
      g,
      w,
      m,
      y,
      M,
      A,
      U,
      E,
      k,
      z,
      q,
      D,
      I,
      P,
      S,
      L,
      j,
      B,
      C,
      F,
      G,
      H,
      J,
      K,
      N,
      O,
      Q,
      R,
      T,
      V,
      W,
      X = this,
      Y = new a(),
      Z = new a(),
      $ = new a();
    function tt() {
      var t;
      for (t = 0; t < 286; t++) G[2 * t] = 0;
      for (t = 0; t < 30; t++) H[2 * t] = 0;
      for (t = 0; t < 19; t++) J[2 * t] = 0;
      (G[512] = 1), (X.opt_len = X.static_len = 0), (O = R = 0);
    }
    function et(t, e) {
      var n,
        a,
        i = -1,
        r = t[1],
        _ = 0,
        o = 7,
        u = 4;
      for (
        0 === r && ((o = 138), (u = 3)), t[2 * (e + 1) + 1] = 65535, n = 0;
        n <= e;
        n++
      )
        (a = r),
          (r = t[2 * (n + 1) + 1]),
          (++_ < o && a == r) ||
            (_ < u
              ? (J[2 * a] += _)
              : 0 !== a
              ? (a != i && J[2 * a]++, J[32]++)
              : _ <= 10
              ? J[34]++
              : J[36]++,
            (i = a),
            (u =
              (_ = 0) === r
                ? ((o = 138), 3)
                : a == r
                ? ((o = 6), 3)
                : ((o = 7), 4)));
    }
    function nt(t) {
      X.pending_buf[X.pending++] = t;
    }
    function at(t) {
      nt(255 & t), nt((t >>> 8) & 255);
    }
    function it(t, e) {
      var n,
        a = e;
      16 - a < W
        ? (at((V |= ((n = t) << W) & 65535)),
          (V = n >>> (16 - W)),
          (W += a - 16))
        : ((V |= (t << W) & 65535), (W += a));
    }
    function rt(t, e) {
      var n = 2 * t;
      it(65535 & e[n], 65535 & e[n + 1]);
    }
    function _t(t, e) {
      var n,
        a,
        i = -1,
        r = t[1],
        _ = 0,
        o = 7,
        u = 4;
      for (0 === r && ((o = 138), (u = 3)), n = 0; n <= e; n++)
        if (((a = r), (r = t[2 * (n + 1) + 1]), !(++_ < o && a == r))) {
          if (_ < u) for (; rt(a, J), 0 != --_; );
          else
            0 !== a
              ? (a != i && (rt(a, J), _--), rt(16, J), it(_ - 3, 2))
              : _ <= 10
              ? (rt(17, J), it(_ - 3, 3))
              : (rt(18, J), it(_ - 11, 7));
          (i = a),
            (u =
              (_ = 0) === r
                ? ((o = 138), 3)
                : a == r
                ? ((o = 6), 3)
                : ((o = 7), 4));
        }
    }
    function ot() {
      16 == W
        ? (at(V), (W = V = 0))
        : 8 <= W && (nt(255 & V), (V >>>= 8), (W -= 8));
    }
    function ut(t, e) {
      var n, i, r;
      if (
        ((X.pending_buf[Q + 2 * O] = (t >>> 8) & 255),
        (X.pending_buf[Q + 2 * O + 1] = 255 & t),
        (X.pending_buf[K + O] = 255 & e),
        O++,
        0 === t
          ? G[2 * e]++
          : (R++,
            t--,
            G[2 * (a._length_code[e] + 256 + 1)]++,
            H[2 * a.d_code(t)]++),
        0 == (8191 & O) && 2 < j)
      ) {
        for (n = 8 * O, i = q - U, r = 0; r < 30; r++)
          n += H[2 * r] * (5 + a.extra_dbits[r]);
        if (((n >>>= 3), R < Math.floor(O / 2) && n < Math.floor(i / 2)))
          return !0;
      }
      return O == N - 1;
    }
    function ft(t, e) {
      var n,
        i,
        r,
        _,
        o = 0;
      if (0 !== O)
        for (
          ;
          (n =
            ((X.pending_buf[Q + 2 * o] << 8) & 65280) |
            (255 & X.pending_buf[Q + 2 * o + 1])),
            (i = 255 & X.pending_buf[K + o]),
            o++,
            0 === n
              ? rt(i, t)
              : (rt((r = a._length_code[i]) + 256 + 1, t),
                0 !== (_ = a.extra_lbits[r]) && it((i -= a.base_length[r]), _),
                rt((r = a.d_code(--n)), e),
                0 !== (_ = a.extra_dbits[r]) && it((n -= a.base_dist[r]), _)),
            o < O;

        );
      rt(256, t), (T = t[513]);
    }
    function dt() {
      8 < W ? at(V) : 0 < W && nt(255 & V), (W = V = 0);
    }
    function st(t, e, n) {
      var a, i;
      it(0 + (n ? 1 : 0), 3),
        (a = t),
        (i = e),
        dt(),
        (T = 8),
        at(i),
        at(~i),
        X.pending_buf.set(x.subarray(a, a + i), X.pending),
        (X.pending += i);
    }
    function lt(e) {
      (function (t, e, n) {
        var r,
          _,
          o = 0;
        0 < j
          ? (Y.build_tree(X),
            Z.build_tree(X),
            (o = (function () {
              var t;
              for (
                et(G, Y.max_code), et(H, Z.max_code), $.build_tree(X), t = 18;
                3 <= t && 0 === J[2 * a.bl_order[t] + 1];
                t--
              );
              return (X.opt_len += 3 * (t + 1) + 5 + 5 + 4), t;
            })()),
            (r = (X.opt_len + 3 + 7) >>> 3),
            (_ = (X.static_len + 3 + 7) >>> 3) <= r && (r = _))
          : (r = _ = e + 5),
          e + 4 <= r && -1 != t
            ? st(t, e, n)
            : _ == r
            ? (it(2 + (n ? 1 : 0), 3), ft(i.static_ltree, i.static_dtree))
            : (it(4 + (n ? 1 : 0), 3),
              (function (t, e, n) {
                var i;
                for (
                  it(t - 257, 5), it(e - 1, 5), it(n - 4, 4), i = 0;
                  i < n;
                  i++
                )
                  it(J[2 * a.bl_order[i] + 1], 3);
                _t(G, t - 1), _t(H, e - 1);
              })(Y.max_code + 1, Z.max_code + 1, o + 1),
              ft(G, H)),
          tt(),
          n && dt();
      })(0 <= U ? U : -1, q - U, e),
        (U = q),
        t.flush_pending();
    }
    function ct() {
      var e, n, a, i;
      do {
        if (0 == (i = v - I - q) && 0 === q && 0 === I) i = c;
        else if (-1 == i) i--;
        else if (c + c - s <= q) {
          for (
            x.set(x.subarray(c, c + c), 0), D -= c, q -= c, U -= c, a = e = m;
            (n = 65535 & g[--a]), (g[a] = c <= n ? n - c : 0), 0 != --e;

          );
          for (
            a = e = c;
            (n = 65535 & b[--a]), (b[a] = c <= n ? n - c : 0), 0 != --e;

          );
          i += c;
        }
        if (0 === t.avail_in) return;
        (e = t.read_buf(x, q + I, i)),
          3 <= (I += e) &&
            (w = (((w = 255 & x[q]) << A) ^ (255 & x[q + 1])) & M);
      } while (I < s && 0 !== t.avail_in);
    }
    function ht(t) {
      var e,
        n,
        a = S,
        i = q,
        r = P,
        _ = c - s < q ? q - (c - s) : 0,
        o = F,
        u = p,
        f = q + 258,
        d = x[i + r - 1],
        l = x[i + r];
      C <= P && (a >>= 2), I < o && (o = I);
      do {
        if (
          x[(e = t) + r] == l &&
          x[e + r - 1] == d &&
          x[e] == x[i] &&
          x[++e] == x[i + 1]
        ) {
          (i += 2), e++;
          do {} while (
            x[++i] == x[++e] &&
            x[++i] == x[++e] &&
            x[++i] == x[++e] &&
            x[++i] == x[++e] &&
            x[++i] == x[++e] &&
            x[++i] == x[++e] &&
            x[++i] == x[++e] &&
            x[++i] == x[++e] &&
            i < f
          );
          if (((n = 258 - (f - i)), (i = f - 258), r < n)) {
            if (((D = t), o <= (r = n))) break;
            (d = x[i + r - 1]), (l = x[i + r]);
          }
        }
      } while ((t = 65535 & b[t & u]) > _ && 0 != --a);
      return r <= I ? r : I;
    }
    function pt(t) {
      return (
        (t.total_in = t.total_out = 0),
        (t.msg = null),
        (X.pending = 0),
        (X.pending_out = 0),
        (n = f),
        (_ = 0),
        (Y.dyn_tree = G),
        (Y.stat_desc = i.static_l_desc),
        (Z.dyn_tree = H),
        (Z.stat_desc = i.static_d_desc),
        ($.dyn_tree = J),
        ($.stat_desc = i.static_bl_desc),
        (W = V = 0),
        (T = 8),
        tt(),
        (function () {
          var t;
          for (v = 2 * c, t = g[m - 1] = 0; t < m - 1; t++) g[t] = 0;
          (L = o[j].max_lazy),
            (C = o[j].good_length),
            (F = o[j].nice_length),
            (S = o[j].max_chain),
            (E = P = 2),
            (w = z = I = U = q = 0);
        })(),
        0
      );
    }
    (X.depth = []),
      (X.bl_count = []),
      (X.heap = []),
      (G = []),
      (H = []),
      (J = []),
      (X.pqdownheap = function (t, e) {
        for (
          var n = X.heap, a = n[e], i = e << 1;
          i <= X.heap_len &&
          (i < X.heap_len && l(t, n[i + 1], n[i], X.depth) && i++,
          !l(t, a, n[i], X.depth));

        )
          (n[e] = n[i]), (e = i), (i <<= 1);
        n[e] = a;
      }),
      (X.deflateInit = function (t, n, a, i, _, o) {
        return (
          i || (i = 8),
          _ || (_ = 8),
          o || (o = 0),
          (t.msg = null),
          -1 == n && (n = 6),
          _ < 1 ||
          9 < _ ||
          8 != i ||
          a < 9 ||
          15 < a ||
          n < 0 ||
          9 < n ||
          o < 0 ||
          2 < o
            ? e
            : ((t.dstate = X),
              (p = (c = 1 << (h = a)) - 1),
              (M = (m = 1 << (y = _ + 7)) - 1),
              (A = Math.floor((y + 3 - 1) / 3)),
              (x = new Uint8Array(2 * c)),
              (b = []),
              (g = []),
              (N = 1 << (_ + 6)),
              (X.pending_buf = new Uint8Array(4 * N)),
              (r = 4 * N),
              (Q = Math.floor(N / 2)),
              (K = 3 * N),
              (j = n),
              (B = o),
              pt(t))
        );
      }),
      (X.deflateEnd = function () {
        return 42 != n && n != f && n != d
          ? e
          : ((X.pending_buf = null),
            (x = b = g = null),
            (X.dstate = null),
            n == f ? -3 : 0);
      }),
      (X.deflateParams = function (t, n, a) {
        var i = 0;
        return (
          -1 == n && (n = 6),
          n < 0 || 9 < n || a < 0 || 2 < a
            ? e
            : (o[j].func != o[n].func && 0 !== t.total_in && (i = t.deflate(1)),
              j != n &&
                ((L = o[(j = n)].max_lazy),
                (C = o[j].good_length),
                (F = o[j].nice_length),
                (S = o[j].max_chain)),
              (B = a),
              i)
        );
      }),
      (X.deflateSetDictionary = function (t, a, i) {
        var r,
          _ = i,
          o = 0;
        if (!a || 42 != n) return e;
        if (_ < 3) return 0;
        for (
          c - s < _ && (o = i - (_ = c - s)),
            x.set(a.subarray(o, o + _), 0),
            U = q = _,
            w = (((w = 255 & x[0]) << A) ^ (255 & x[1])) & M,
            r = 0;
          r <= _ - 3;
          r++
        )
          (w = ((w << A) ^ (255 & x[r + 2])) & M),
            (b[r & p] = g[w]),
            (g[w] = r);
        return 0;
      }),
      (X.deflate = function (a, l) {
        var v, y, S, C, F, G;
        if (4 < l || l < 0) return e;
        if (
          !a.next_out ||
          (!a.next_in && 0 !== a.avail_in) ||
          (n == d && 4 != l)
        )
          return (a.msg = u[4]), e;
        if (0 === a.avail_out) return (a.msg = u[7]), -5;
        if (
          ((t = a),
          (C = _),
          (_ = l),
          42 == n &&
            ((y = (8 + ((h - 8) << 4)) << 8),
            3 < (S = ((j - 1) & 255) >> 1) && (S = 3),
            (y |= S << 6),
            0 !== q && (y |= 32),
            (n = f),
            nt(((G = y += 31 - (y % 31)) >> 8) & 255),
            nt(255 & G)),
          0 !== X.pending)
        ) {
          if ((t.flush_pending(), 0 === t.avail_out)) return (_ = -1), 0;
        } else if (0 === t.avail_in && l <= C && 4 != l)
          return (t.msg = u[7]), -5;
        if (n == d && 0 !== t.avail_in) return (a.msg = u[7]), -5;
        if (0 !== t.avail_in || 0 !== I || (0 != l && n != d)) {
          switch (((F = -1), o[j].func)) {
            case 0:
              F = (function (e) {
                var n,
                  a = 65535;
                for (r - 5 < a && (a = r - 5); ; ) {
                  if (I <= 1) {
                    if ((ct(), 0 === I && 0 == e)) return 0;
                    if (0 === I) break;
                  }
                  if (
                    ((q += I),
                    (n = U + a),
                    ((I = 0) === q || n <= q) &&
                      ((I = q - n), (q = n), lt(!1), 0 === t.avail_out))
                  )
                    return 0;
                  if (c - s <= q - U && (lt(!1), 0 === t.avail_out)) return 0;
                }
                return (
                  lt(4 == e),
                  0 === t.avail_out ? (4 == e ? 2 : 0) : 4 == e ? 3 : 1
                );
              })(l);
              break;
            case 1:
              F = (function (e) {
                for (var n, a = 0; ; ) {
                  if (I < s) {
                    if ((ct(), I < s && 0 == e)) return 0;
                    if (0 === I) break;
                  }
                  if (
                    (3 <= I &&
                      ((w = ((w << A) ^ (255 & x[q + 2])) & M),
                      (a = 65535 & g[w]),
                      (b[q & p] = g[w]),
                      (g[w] = q)),
                    0 !== a &&
                      ((q - a) & 65535) <= c - s &&
                      2 != B &&
                      (E = ht(a)),
                    3 <= E)
                  )
                    if (((n = ut(q - D, E - 3)), (I -= E), E <= L && 3 <= I)) {
                      for (
                        E--;
                        (w = ((w << A) ^ (255 & x[2 + ++q])) & M),
                          (a = 65535 & g[w]),
                          (b[q & p] = g[w]),
                          (g[w] = q),
                          0 != --E;

                      );
                      q++;
                    } else
                      (q += E),
                        (E = 0),
                        (w = (((w = 255 & x[q]) << A) ^ (255 & x[q + 1])) & M);
                  else (n = ut(0, 255 & x[q])), I--, q++;
                  if (n && (lt(!1), 0 === t.avail_out)) return 0;
                }
                return (
                  lt(4 == e),
                  0 === t.avail_out ? (4 == e ? 2 : 0) : 4 == e ? 3 : 1
                );
              })(l);
              break;
            case 2:
              F = (function (e) {
                for (var n, a, i = 0; ; ) {
                  if (I < s) {
                    if ((ct(), I < s && 0 == e)) return 0;
                    if (0 === I) break;
                  }
                  if (
                    (3 <= I &&
                      ((w = ((w << A) ^ (255 & x[q + 2])) & M),
                      (i = 65535 & g[w]),
                      (b[q & p] = g[w]),
                      (g[w] = q)),
                    (P = E),
                    (k = D),
                    (E = 2),
                    0 !== i &&
                      P < L &&
                      ((q - i) & 65535) <= c - s &&
                      (2 != B && (E = ht(i)),
                      E <= 5 &&
                        (1 == B || (3 == E && 4096 < q - D)) &&
                        (E = 2)),
                    3 <= P && E <= P)
                  ) {
                    for (
                      a = q + I - 3,
                        n = ut(q - 1 - k, P - 3),
                        I -= P - 1,
                        P -= 2;
                      ++q <= a &&
                        ((w = ((w << A) ^ (255 & x[q + 2])) & M),
                        (i = 65535 & g[w]),
                        (b[q & p] = g[w]),
                        (g[w] = q)),
                        0 != --P;

                    );
                    if (
                      ((z = 0), (E = 2), q++, n && (lt(!1), 0 === t.avail_out))
                    )
                      return 0;
                  } else if (0 !== z) {
                    if (
                      ((n = ut(0, 255 & x[q - 1])) && lt(!1),
                      q++,
                      I--,
                      0 === t.avail_out)
                    )
                      return 0;
                  } else (z = 1), q++, I--;
                }
                return (
                  0 !== z && ((n = ut(0, 255 & x[q - 1])), (z = 0)),
                  lt(4 == e),
                  0 === t.avail_out ? (4 == e ? 2 : 0) : 4 == e ? 3 : 1
                );
              })(l);
          }
          if (((2 != F && 3 != F) || (n = d), 0 == F || 2 == F))
            return 0 === t.avail_out && (_ = -1), 0;
          if (1 == F) {
            if (1 == l)
              it(2, 3),
                rt(256, i.static_ltree),
                ot(),
                1 + T + 10 - W < 9 && (it(2, 3), rt(256, i.static_ltree), ot()),
                (T = 7);
            else if ((st(0, 0, !1), 3 == l)) for (v = 0; v < m; v++) g[v] = 0;
            if ((t.flush_pending(), 0 === t.avail_out)) return (_ = -1), 0;
          }
        }
        return 4 != l ? 0 : 1;
      });
  }
  function h() {
    var t = this;
    (t.next_in_index = 0),
      (t.next_out_index = 0),
      (t.avail_in = 0),
      (t.total_in = 0),
      (t.avail_out = 0),
      (t.total_out = 0);
  }
  function p(t) {
    var e = new h(),
      n = new Uint8Array(512);
    void 0 === t && (t = -1),
      e.deflateInit(t),
      (e.next_out = n),
      (this.append = function (t, a) {
        var i,
          r = [],
          _ = 0,
          o = 0,
          u = 0;
        if (t.length) {
          (e.next_in_index = 0), (e.next_in = t), (e.avail_in = t.length);
          do {
            if (
              ((e.next_out_index = 0), (e.avail_out = 512), 0 != e.deflate(0))
            )
              throw 'deflating: ' + e.msg;
            e.next_out_index &&
              (512 == e.next_out_index
                ? r.push(new Uint8Array(n))
                : r.push(new Uint8Array(n.subarray(0, e.next_out_index)))),
              (u += e.next_out_index),
              a &&
                0 < e.next_in_index &&
                e.next_in_index != _ &&
                (a(e.next_in_index), (_ = e.next_in_index));
          } while (0 < e.avail_in || 0 === e.avail_out);
          return (
            (i = new Uint8Array(u)),
            r.forEach(function (t) {
              i.set(t, o), (o += t.length);
            }),
            i
          );
        }
      }),
      (this.flush = function () {
        var t,
          a,
          i = [],
          r = 0,
          _ = 0;
        do {
          if (
            ((e.next_out_index = 0),
            (e.avail_out = 512),
            1 != (t = e.deflate(4)) && 0 != t)
          )
            throw 'deflating: ' + e.msg;
          0 < 512 - e.avail_out &&
            i.push(new Uint8Array(n.subarray(0, e.next_out_index))),
            (_ += e.next_out_index);
        } while (0 < e.avail_in || 0 === e.avail_out);
        return (
          e.deflateEnd(),
          (a = new Uint8Array(_)),
          i.forEach(function (t) {
            a.set(t, r), (r += t.length);
          }),
          a
        );
      });
  }
  (h.prototype = {
    deflateInit: function (t, e) {
      return (
        (this.dstate = new c()),
        e || (e = 15),
        this.dstate.deflateInit(this, t, e)
      );
    },
    deflate: function (t) {
      return this.dstate ? this.dstate.deflate(this, t) : e;
    },
    deflateEnd: function () {
      if (!this.dstate) return e;
      var t = this.dstate.deflateEnd();
      return (this.dstate = null), t;
    },
    deflateParams: function (t, n) {
      return this.dstate ? this.dstate.deflateParams(this, t, n) : e;
    },
    deflateSetDictionary: function (t, n) {
      return this.dstate ? this.dstate.deflateSetDictionary(this, t, n) : e;
    },
    read_buf: function (t, e, n) {
      var a = this,
        i = a.avail_in;
      return (
        n < i && (i = n),
        0 === i
          ? 0
          : ((a.avail_in -= i),
            t.set(a.next_in.subarray(a.next_in_index, a.next_in_index + i), e),
            (a.next_in_index += i),
            (a.total_in += i),
            i)
      );
    },
    flush_pending: function () {
      var t = this,
        e = t.dstate.pending;
      e > t.avail_out && (e = t.avail_out),
        0 !== e &&
          (t.next_out.set(
            t.dstate.pending_buf.subarray(
              t.dstate.pending_out,
              t.dstate.pending_out + e,
            ),
            t.next_out_index,
          ),
          (t.next_out_index += e),
          (t.dstate.pending_out += e),
          (t.total_out += e),
          (t.avail_out -= e),
          (t.dstate.pending -= e),
          0 === t.dstate.pending && (t.dstate.pending_out = 0));
    },
  }),
    t.zip
      ? (t.zip.Deflater = p)
      : ((_ = new p()),
        t.addEventListener(
          'message',
          function (e) {
            var n = e.data;
            n.init && ((_ = new p(n.level)), t.postMessage({ oninit: !0 })),
              n.append &&
                t.postMessage({
                  onappend: !0,
                  data: _.append(n.data, function (e) {
                    t.postMessage({ progress: !0, current: e });
                  }),
                }),
              n.flush && t.postMessage({ onflush: !0, data: _.flush() });
          },
          !1,
        ));
})(this);
