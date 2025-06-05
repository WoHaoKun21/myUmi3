define(['exports'], function (e) {
  function n(e, n, i) {
    i = i || 2;
    var v,
      u,
      f,
      p,
      h,
      l,
      s,
      c = n && n.length,
      Z = c ? n[0] * i : e.length,
      g = t(e, 0, Z, i, !0),
      d = [];
    if (!g || g.next === g.prev) return d;
    if (
      (c &&
        (g = (function (e, n, x, i) {
          var v,
            u,
            f,
            p = [];
          for (v = 0, u = n.length; v < u; v++)
            (f = t(e, n[v] * i, v < u - 1 ? n[v + 1] * i : e.length, i, !1)) ===
              f.next && (f.steiner = !0),
              p.push(a(f));
          for (p.sort(y), v = 0; v < p.length; v++)
            o(p[v], x), (x = r(x, x.next));
          return x;
        })(e, n, g, i)),
      e.length > 80 * i)
    ) {
      (v = f = e[0]), (u = p = e[1]);
      for (var M = i; M < Z; M += i)
        (h = e[M]) < v && (v = h),
          (l = e[M + 1]) < u && (u = l),
          f < h && (f = h),
          p < l && (p = l);
      s = 0 !== (s = Math.max(f - v, p - u)) ? 1 / s : 0;
    }
    return x(g, d, i, v, u, s), d;
  }
  function t(e, n, t, r, x) {
    var i, v;
    if (x === 0 < m(e, n, t, r))
      for (i = n; i < t; i += r) v = w(i, e[i], e[i + 1], v);
    else for (i = t - r; n <= i; i -= r) v = w(i, e[i], e[i + 1], v);
    return v && s(v, v.next) && (z(v), (v = v.next)), v;
  }
  function r(e, n) {
    if (!e) return e;
    n || (n = e);
    var t,
      r = e;
    do {
      if (
        ((t = !1), r.steiner || (!s(r, r.next) && 0 !== l(r.prev, r, r.next)))
      )
        r = r.next;
      else {
        if ((z(r), (r = n = r.prev) === r.next)) break;
        t = !0;
      }
    } while (t || r !== n);
    return n;
  }
  function x(e, n, t, y, o, a, h) {
    if (e) {
      !h &&
        a &&
        (function (e, n, t, r) {
          for (
            var x = e;
            null === x.z && (x.z = p(x.x, x.y, n, t, r)),
              (x.prevZ = x.prev),
              (x.nextZ = x.next),
              (x = x.next) !== e;

          );
          (x.prevZ.nextZ = null),
            (x.prevZ = null),
            (function (e) {
              var n,
                t,
                r,
                x,
                i,
                v,
                u,
                f,
                y = 1;
              do {
                for (t = e, i = e = null, v = 0; t; ) {
                  for (
                    v++, r = t, n = u = 0;
                    n < y && (u++, (r = r.nextZ));
                    n++
                  );
                  for (f = y; 0 < u || (0 < f && r); )
                    0 !== u && (0 === f || !r || t.z <= r.z)
                      ? ((t = (x = t).nextZ), u--)
                      : ((r = (x = r).nextZ), f--),
                      i ? (i.nextZ = x) : (e = x),
                      (x.prevZ = i),
                      (i = x);
                  t = r;
                }
                (i.nextZ = null), (y *= 2);
              } while (1 < v);
            })(x);
        })(e, y, o, a);
      for (var l, s, c = e; e.prev !== e.next; )
        if (((l = e.prev), (s = e.next), a ? v(e, y, o, a) : i(e)))
          n.push(l.i / t),
            n.push(e.i / t),
            n.push(s.i / t),
            z(e),
            (e = s.next),
            (c = s.next);
        else if ((e = s) === c) {
          h
            ? 1 === h
              ? x((e = u(r(e), n, t)), n, t, y, o, a, 2)
              : 2 === h && f(e, n, t, y, o, a)
            : x(r(e), n, t, y, o, a, 1);
          break;
        }
    }
  }
  function i(e) {
    var n = e.prev,
      t = e,
      r = e.next;
    if (0 <= l(n, t, r)) return !1;
    for (var x = e.next.next; x !== e.prev; ) {
      if (
        h(n.x, n.y, t.x, t.y, r.x, r.y, x.x, x.y) &&
        0 <= l(x.prev, x, x.next)
      )
        return !1;
      x = x.next;
    }
    return !0;
  }
  function v(e, n, t, r) {
    var x = e.prev,
      i = e,
      v = e.next;
    if (0 <= l(x, i, v)) return !1;
    for (
      var u = x.x < i.x ? (x.x < v.x ? x.x : v.x) : i.x < v.x ? i.x : v.x,
        f = x.y < i.y ? (x.y < v.y ? x.y : v.y) : i.y < v.y ? i.y : v.y,
        y = x.x > i.x ? (x.x > v.x ? x.x : v.x) : i.x > v.x ? i.x : v.x,
        o = x.y > i.y ? (x.y > v.y ? x.y : v.y) : i.y > v.y ? i.y : v.y,
        a = p(u, f, n, t, r),
        s = p(y, o, n, t, r),
        c = e.prevZ,
        Z = e.nextZ;
      c && c.z >= a && Z && Z.z <= s;

    ) {
      if (
        c !== e.prev &&
        c !== e.next &&
        h(x.x, x.y, i.x, i.y, v.x, v.y, c.x, c.y) &&
        0 <= l(c.prev, c, c.next)
      )
        return !1;
      if (
        ((c = c.prevZ),
        Z !== e.prev &&
          Z !== e.next &&
          h(x.x, x.y, i.x, i.y, v.x, v.y, Z.x, Z.y) &&
          0 <= l(Z.prev, Z, Z.next))
      )
        return !1;
      Z = Z.nextZ;
    }
    for (; c && c.z >= a; ) {
      if (
        c !== e.prev &&
        c !== e.next &&
        h(x.x, x.y, i.x, i.y, v.x, v.y, c.x, c.y) &&
        0 <= l(c.prev, c, c.next)
      )
        return !1;
      c = c.prevZ;
    }
    for (; Z && Z.z <= s; ) {
      if (
        Z !== e.prev &&
        Z !== e.next &&
        h(x.x, x.y, i.x, i.y, v.x, v.y, Z.x, Z.y) &&
        0 <= l(Z.prev, Z, Z.next)
      )
        return !1;
      Z = Z.nextZ;
    }
    return !0;
  }
  function u(e, n, t) {
    var x = e;
    do {
      var i = x.prev,
        v = x.next.next;
      !s(i, v) &&
        c(i, x, x.next, v) &&
        d(i, v) &&
        d(v, i) &&
        (n.push(i.i / t),
        n.push(x.i / t),
        n.push(v.i / t),
        z(x),
        z(x.next),
        (x = e = v)),
        (x = x.next);
    } while (x !== e);
    return r(x);
  }
  function f(e, n, t, i, v, u) {
    var f,
      y,
      o = e;
    do {
      for (var p = o.next.next; p !== o.prev; ) {
        if (
          o.i !== p.i &&
          ((y = p),
          (f = o).next.i !== y.i &&
            f.prev.i !== y.i &&
            !(function (e, n) {
              var t = e;
              do {
                if (
                  t.i !== e.i &&
                  t.next.i !== e.i &&
                  t.i !== n.i &&
                  t.next.i !== n.i &&
                  c(t, t.next, e, n)
                )
                  return !0;
                t = t.next;
              } while (t !== e);
              return !1;
            })(f, y) &&
            ((d(f, y) &&
              d(y, f) &&
              (function (e, n) {
                for (
                  var t = e, r = !1, x = (e.x + n.x) / 2, i = (e.y + n.y) / 2;
                  t.y > i != t.next.y > i &&
                    t.next.y !== t.y &&
                    x <
                      ((t.next.x - t.x) * (i - t.y)) / (t.next.y - t.y) + t.x &&
                    (r = !r),
                    (t = t.next) !== e;

                );
                return r;
              })(f, y) &&
              (l(f.prev, f, y.prev) || l(f, y.prev, y))) ||
              (s(f, y) &&
                0 < l(f.prev, f, f.next) &&
                0 < l(y.prev, y, y.next))))
        ) {
          var a = M(o, p);
          return (
            (o = r(o, o.next)),
            (a = r(a, a.next)),
            x(o, n, t, i, v, u),
            void x(a, n, t, i, v, u)
          );
        }
        p = p.next;
      }
      o = o.next;
    } while (o !== e);
  }
  function y(e, n) {
    return e.x - n.x;
  }
  function o(e, n) {
    if (
      (n = (function (e, n) {
        var t,
          r = n,
          x = e.x,
          i = e.y,
          v = -1 / 0;
        do {
          if (i <= r.y && i >= r.next.y && r.next.y !== r.y) {
            var u = r.x + ((i - r.y) * (r.next.x - r.x)) / (r.next.y - r.y);
            if (u <= x && v < u) {
              if ((v = u) === x) {
                if (i === r.y) return r;
                if (i === r.next.y) return r.next;
              }
              t = r.x < r.next.x ? r : r.next;
            }
          }
          r = r.next;
        } while (r !== n);
        if (!t) return null;
        if (x === v) return t;
        var f,
          y,
          o,
          p = t,
          a = t.x,
          s = t.y,
          c = 1 / 0;
        for (
          r = t;
          x >= r.x &&
            r.x >= a &&
            x !== r.x &&
            h(i < s ? x : v, i, a, s, i < s ? v : x, i, r.x, r.y) &&
            ((f = Math.abs(i - r.y) / (x - r.x)),
            d(r, e) &&
              (f < c ||
                (f === c &&
                  (r.x > t.x ||
                    (r.x === t.x &&
                      ((o = r),
                      l((y = t).prev, y, o.prev) < 0 &&
                        l(o.next, y, y.next) < 0))))) &&
              ((t = r), (c = f))),
            (r = r.next) !== p;

        );
        return t;
      })(e, n))
    ) {
      var t = M(n, e);
      r(t, t.next);
    }
  }
  function p(e, n, t, r, x) {
    return (
      (e =
        1431655765 &
        ((e =
          858993459 &
          ((e =
            252645135 &
            ((e = 16711935 & ((e = 32767 * (e - t) * x) | (e << 8))) |
              (e << 4))) |
            (e << 2))) |
          (e << 1))) |
      ((n =
        1431655765 &
        ((n =
          858993459 &
          ((n =
            252645135 &
            ((n = 16711935 & ((n = 32767 * (n - r) * x) | (n << 8))) |
              (n << 4))) |
            (n << 2))) |
          (n << 1))) <<
        1)
    );
  }
  function a(e) {
    for (
      var n = e, t = e;
      (n.x < t.x || (n.x === t.x && n.y < t.y)) && (t = n), (n = n.next) !== e;

    );
    return t;
  }
  function h(e, n, t, r, x, i, v, u) {
    return (
      0 <= (x - v) * (n - u) - (e - v) * (i - u) &&
      0 <= (e - v) * (r - u) - (t - v) * (n - u) &&
      0 <= (t - v) * (i - u) - (x - v) * (r - u)
    );
  }
  function l(e, n, t) {
    return (n.y - e.y) * (t.x - n.x) - (n.x - e.x) * (t.y - n.y);
  }
  function s(e, n) {
    return e.x === n.x && e.y === n.y;
  }
  function c(e, n, t, r) {
    var x = g(l(e, n, t)),
      i = g(l(e, n, r)),
      v = g(l(t, r, e)),
      u = g(l(t, r, n));
    return (
      (x !== i && v !== u) ||
      !(0 !== x || !Z(e, t, n)) ||
      !(0 !== i || !Z(e, r, n)) ||
      !(0 !== v || !Z(t, e, r)) ||
      !(0 !== u || !Z(t, n, r))
    );
  }
  function Z(e, n, t) {
    return (
      n.x <= Math.max(e.x, t.x) &&
      n.x >= Math.min(e.x, t.x) &&
      n.y <= Math.max(e.y, t.y) &&
      n.y >= Math.min(e.y, t.y)
    );
  }
  function g(e) {
    return 0 < e ? 1 : e < 0 ? -1 : 0;
  }
  function d(e, n) {
    return l(e.prev, e, e.next) < 0
      ? 0 <= l(e, n, e.next) && 0 <= l(e, e.prev, n)
      : l(e, n, e.prev) < 0 || l(e, e.next, n) < 0;
  }
  function M(e, n) {
    var t = new b(e.i, e.x, e.y),
      r = new b(n.i, n.x, n.y),
      x = e.next,
      i = n.prev;
    return (
      ((e.next = n).prev = e),
      ((t.next = x).prev = t),
      ((r.next = t).prev = r),
      ((i.next = r).prev = i),
      r
    );
  }
  function w(e, n, t, r) {
    var x = new b(e, n, t);
    return (
      r
        ? ((x.next = r.next), ((x.prev = r).next.prev = x), (r.next = x))
        : ((x.prev = x).next = x),
      x
    );
  }
  function z(e) {
    (e.next.prev = e.prev),
      (e.prev.next = e.next),
      e.prevZ && (e.prevZ.nextZ = e.nextZ),
      e.nextZ && (e.nextZ.prevZ = e.prevZ);
  }
  function b(e, n, t) {
    (this.i = e),
      (this.x = n),
      (this.y = t),
      (this.prev = null),
      (this.next = null),
      (this.z = null),
      (this.prevZ = null),
      (this.nextZ = null),
      (this.steiner = !1);
  }
  function m(e, n, t, r) {
    for (var x = 0, i = n, v = t - r; i < t; i += r)
      (x += (e[v] - e[i]) * (e[i + 1] + e[v + 1])), (v = i);
    return x;
  }
  (n.deviation = function (e, n, t, r) {
    var x = n && n.length,
      i = x ? n[0] * t : e.length,
      v = Math.abs(m(e, 0, i, t));
    if (x)
      for (var u = 0, f = n.length; u < f; u++) {
        var y = n[u] * t,
          o = u < f - 1 ? n[u + 1] * t : e.length;
        v -= Math.abs(m(e, y, o, t));
      }
    var p = 0;
    for (u = 0; u < r.length; u += 3) {
      var a = r[u] * t,
        h = r[u + 1] * t,
        l = r[u + 2] * t;
      p += Math.abs(
        (e[a] - e[l]) * (e[h + 1] - e[a + 1]) -
          (e[a] - e[h]) * (e[l + 1] - e[a + 1]),
      );
    }
    return 0 === v && 0 === p ? 0 : Math.abs((p - v) / v);
  }),
    (n.flatten = function (e) {
      for (
        var n = e[0][0].length,
          t = { vertices: [], holes: [], dimensions: n },
          r = 0,
          x = 0;
        x < e.length;
        x++
      ) {
        for (var i = 0; i < e[x].length; i++)
          for (var v = 0; v < n; v++) t.vertices.push(e[x][i][v]);
        0 < x && ((r += e[x - 1].length), t.holes.push(r));
      }
      return t;
    }),
    (e.earcut = n);
});
