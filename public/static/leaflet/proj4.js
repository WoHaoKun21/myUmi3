!(function (t) {
  if ('object' == typeof exports) module.exports = t();
  else if ('function' == typeof define && define.amd) define(t);
  else {
    var s;
    'undefined' != typeof window
      ? (s = window)
      : 'undefined' != typeof global
      ? (s = global)
      : 'undefined' != typeof self && (s = self),
      (s.proj4 = t());
  }
})(function () {
  return (function t(s, i, a) {
    function h(e, o) {
      if (!i[e]) {
        if (!s[e]) {
          var r = 'function' == typeof require && require;
          if (!o && r) return r(e, !0);
          if (n) return n(e, !0);
          throw new Error("Cannot find module '" + e + "'");
        }
        var c = (i[e] = { exports: {} });
        s[e][0].call(
          c.exports,
          function (t) {
            return h(s[e][1][t] || t);
          },
          c,
          c.exports,
          t,
          s,
          i,
          a,
        );
      }
      return i[e].exports;
    }
    for (
      var n = 'function' == typeof require && require, e = 0;
      e < a.length;
      e++
    )
      h(a[e]);
    return h;
  })(
    {
      1: [
        function (t, s, i) {
          var a = t('mgrs');
          function h(t, s, i) {
            if (!(this instanceof h)) return new h(t, s, i);
            if (Array.isArray(t))
              (this.x = t[0]), (this.y = t[1]), (this.z = t[2] || 0);
            else if ('object' == typeof t)
              (this.x = t.x), (this.y = t.y), (this.z = t.z || 0);
            else if ('string' == typeof t && void 0 === s) {
              var a = t.split(',');
              (this.x = parseFloat(a[0], 10)),
                (this.y = parseFloat(a[1], 10)),
                (this.z = parseFloat(a[2], 10) || 0);
            } else (this.x = t), (this.y = s), (this.z = i || 0);
            console.warn(
              'proj4.Point will be removed in version 3, use proj4.toPoint',
            );
          }
          (h.fromMGRS = function (t) {
            return new h(a.toPoint(t));
          }),
            (h.prototype.toMGRS = function (t) {
              return a.forward([this.x, this.y], t);
            }),
            (s.exports = h);
        },
        { mgrs: 67 },
      ],
      2: [
        function (t, s, i) {
          var a = t('./parseCode'),
            h = t('./extend'),
            n = t('./projections'),
            e = t('./deriveConstants');
          function o(t, s) {
            if (!(this instanceof o)) return new o(t);
            s =
              s ||
              function (t) {
                if (t) throw t;
              };
            var i = a(t);
            if ('object' == typeof i) {
              var n = e(i),
                r = o.projections.get(n.projName);
              r ? (h(this, n), h(this, r), this.init(), s(null, this)) : s(t);
            } else s(t);
          }
          (o.projections = n), o.projections.start(), (s.exports = o);
        },
        {
          './deriveConstants': 33,
          './extend': 34,
          './parseCode': 37,
          './projections': 39,
        },
      ],
      3: [
        function (t, s, i) {
          s.exports = function (t, s, i) {
            var a,
              h,
              n,
              e = i.x,
              o = i.y,
              r = i.z || 0;
            for (n = 0; n < 3; n++)
              if (!s || 2 !== n || void 0 !== i.z)
                switch (
                  (0 === n
                    ? ((a = e), (h = 'x'))
                    : 1 === n
                    ? ((a = o), (h = 'y'))
                    : ((a = r), (h = 'z')),
                  t.axis[n])
                ) {
                  case 'e':
                  case 'n':
                    i[h] = a;
                    break;
                  case 'w':
                  case 's':
                    i[h] = -a;
                    break;
                  case 'u':
                    void 0 !== i[h] && (i.z = a);
                    break;
                  case 'd':
                    void 0 !== i[h] && (i.z = -a);
                    break;
                  default:
                    return null;
                }
            return i;
          };
        },
        {},
      ],
      4: [
        function (t, s, i) {
          var a = Math.PI / 2,
            h = t('./sign');
          s.exports = function (t) {
            return Math.abs(t) < a ? t : t - h(t) * Math.PI;
          };
        },
        { './sign': 21 },
      ],
      5: [
        function (t, s, i) {
          var a = 2 * Math.PI,
            h = t('./sign');
          s.exports = function (t) {
            return Math.abs(t) <= 3.14159265359 ? t : t - h(t) * a;
          };
        },
        { './sign': 21 },
      ],
      6: [
        function (t, s, i) {
          s.exports = function (t) {
            return Math.abs(t) > 1 && (t = t > 1 ? 1 : -1), Math.asin(t);
          };
        },
        {},
      ],
      7: [
        function (t, s, i) {
          s.exports = function (t) {
            return 1 - 0.25 * t * (1 + (t / 16) * (3 + 1.25 * t));
          };
        },
        {},
      ],
      8: [
        function (t, s, i) {
          s.exports = function (t) {
            return 0.375 * t * (1 + 0.25 * t * (1 + 0.46875 * t));
          };
        },
        {},
      ],
      9: [
        function (t, s, i) {
          s.exports = function (t) {
            return 0.05859375 * t * t * (1 + 0.75 * t);
          };
        },
        {},
      ],
      10: [
        function (t, s, i) {
          s.exports = function (t) {
            return t * t * t * (35 / 3072);
          };
        },
        {},
      ],
      11: [
        function (t, s, i) {
          s.exports = function (t, s, i) {
            var a = s * i;
            return t / Math.sqrt(1 - a * a);
          };
        },
        {},
      ],
      12: [
        function (t, s, i) {
          s.exports = function (t, s, i, a, h) {
            var n, e;
            n = t / s;
            for (var o = 0; o < 15; o++)
              if (
                ((n += e =
                  (t -
                    (s * n -
                      i * Math.sin(2 * n) +
                      a * Math.sin(4 * n) -
                      h * Math.sin(6 * n))) /
                  (s -
                    2 * i * Math.cos(2 * n) +
                    4 * a * Math.cos(4 * n) -
                    6 * h * Math.cos(6 * n))),
                Math.abs(e) <= 1e-10)
              )
                return n;
            return NaN;
          };
        },
        {},
      ],
      13: [
        function (t, s, i) {
          var a = Math.PI / 2;
          s.exports = function (t, s) {
            var i = 1 - ((1 - t * t) / (2 * t)) * Math.log((1 - t) / (1 + t));
            if (Math.abs(Math.abs(s) - i) < 1e-6) return s < 0 ? -1 * a : a;
            for (var h, n, e, o, r = Math.asin(0.5 * s), c = 0; c < 30; c++)
              if (
                ((n = Math.sin(r)),
                (e = Math.cos(r)),
                (o = t * n),
                (r += h =
                  (Math.pow(1 - o * o, 2) / (2 * e)) *
                  (s / (1 - t * t) -
                    n / (1 - o * o) +
                    (0.5 / t) * Math.log((1 - o) / (1 + o)))),
                Math.abs(h) <= 1e-10)
              )
                return r;
            return NaN;
          };
        },
        {},
      ],
      14: [
        function (t, s, i) {
          s.exports = function (t, s, i, a, h) {
            return (
              t * h -
              s * Math.sin(2 * h) +
              i * Math.sin(4 * h) -
              a * Math.sin(6 * h)
            );
          };
        },
        {},
      ],
      15: [
        function (t, s, i) {
          s.exports = function (t, s, i) {
            var a = t * s;
            return i / Math.sqrt(1 - a * a);
          };
        },
        {},
      ],
      16: [
        function (t, s, i) {
          var a = Math.PI / 2;
          s.exports = function (t, s) {
            for (
              var i, h, n = 0.5 * t, e = a - 2 * Math.atan(s), o = 0;
              o <= 15;
              o++
            )
              if (
                ((i = t * Math.sin(e)),
                (e += h =
                  a - 2 * Math.atan(s * Math.pow((1 - i) / (1 + i), n)) - e),
                Math.abs(h) <= 1e-10)
              )
                return e;
            return -9999;
          };
        },
        {},
      ],
      17: [
        function (t, s, i) {
          var a = 0.046875,
            h = 0.01953125,
            n = 0.01068115234375;
          s.exports = function (t) {
            var s = [];
            (s[0] = 1 - t * (0.25 + t * (a + t * (h + t * n)))),
              (s[1] = t * (0.75 - t * (a + t * (h + t * n))));
            var i = t * t;
            return (
              (s[2] =
                i *
                (0.46875 -
                  t * (0.013020833333333334 + 0.007120768229166667 * t))),
              (i *= t),
              (s[3] = i * (0.3645833333333333 - 0.005696614583333333 * t)),
              (s[4] = i * t * 0.3076171875),
              s
            );
          };
        },
        {},
      ],
      18: [
        function (t, s, i) {
          var a = t('./pj_mlfn');
          s.exports = function (t, s, i) {
            for (var h = 1 / (1 - s), n = t, e = 20; e; --e) {
              var o = Math.sin(n),
                r = 1 - s * o * o;
              if (
                ((n -= r =
                  (a(n, o, Math.cos(n), i) - t) * (r * Math.sqrt(r)) * h),
                Math.abs(r) < 1e-10)
              )
                return n;
            }
            return n;
          };
        },
        { './pj_mlfn': 19 },
      ],
      19: [
        function (t, s, i) {
          s.exports = function (t, s, i, a) {
            return (
              (i *= s),
              (s *= s),
              a[0] * t - i * (a[1] + s * (a[2] + s * (a[3] + s * a[4])))
            );
          };
        },
        {},
      ],
      20: [
        function (t, s, i) {
          s.exports = function (t, s) {
            var i;
            return t > 1e-7
              ? (1 - t * t) *
                  (s / (1 - (i = t * s) * i) -
                    (0.5 / t) * Math.log((1 - i) / (1 + i)))
              : 2 * s;
          };
        },
        {},
      ],
      21: [
        function (t, s, i) {
          s.exports = function (t) {
            return t < 0 ? -1 : 1;
          };
        },
        {},
      ],
      22: [
        function (t, s, i) {
          s.exports = function (t, s) {
            return Math.pow((1 - t) / (1 + t), s);
          };
        },
        {},
      ],
      23: [
        function (t, s, i) {
          s.exports = function (t) {
            var s = { x: t[0], y: t[1] };
            return (
              t.length > 2 && (s.z = t[2]), t.length > 3 && (s.m = t[3]), s
            );
          };
        },
        {},
      ],
      24: [
        function (t, s, i) {
          var a = Math.PI / 2;
          s.exports = function (t, s, i) {
            var h = t * i,
              n = 0.5 * t;
            return (
              (h = Math.pow((1 - h) / (1 + h), n)), Math.tan(0.5 * (a - s)) / h
            );
          };
        },
        {},
      ],
      25: [
        function (t, s, i) {
          (i.wgs84 = {
            towgs84: '0,0,0',
            ellipse: 'WGS84',
            datumName: 'WGS84',
          }),
            (i.ch1903 = {
              towgs84: '674.374,15.056,405.346',
              ellipse: 'bessel',
              datumName: 'swiss',
            }),
            (i.ggrs87 = {
              towgs84: '-199.87,74.79,246.62',
              ellipse: 'GRS80',
              datumName: 'Greek_Geodetic_Reference_System_1987',
            }),
            (i.nad83 = {
              towgs84: '0,0,0',
              ellipse: 'GRS80',
              datumName: 'North_American_Datum_1983',
            }),
            (i.nad27 = {
              nadgrids: '@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat',
              ellipse: 'clrk66',
              datumName: 'North_American_Datum_1927',
            }),
            (i.potsdam = {
              towgs84: '606.0,23.0,413.0',
              ellipse: 'bessel',
              datumName: 'Potsdam Rauenberg 1950 DHDN',
            }),
            (i.carthage = {
              towgs84: '-263.0,6.0,431.0',
              ellipse: 'clark80',
              datumName: 'Carthage 1934 Tunisia',
            }),
            (i.hermannskogel = {
              towgs84: '653.0,-212.0,449.0',
              ellipse: 'bessel',
              datumName: 'Hermannskogel',
            }),
            (i.ire65 = {
              towgs84: '482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15',
              ellipse: 'mod_airy',
              datumName: 'Ireland 1965',
            }),
            (i.rassadiran = {
              towgs84: '-133.63,-157.5,-158.62',
              ellipse: 'intl',
              datumName: 'Rassadiran',
            }),
            (i.nzgd49 = {
              towgs84: '59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993',
              ellipse: 'intl',
              datumName: 'New Zealand Geodetic Datum 1949',
            }),
            (i.osgb36 = {
              towgs84: '446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894',
              ellipse: 'airy',
              datumName: 'Airy 1830',
            }),
            (i.s_jtsk = {
              towgs84: '589,76,480',
              ellipse: 'bessel',
              datumName: 'S-JTSK (Ferro)',
            }),
            (i.beduaram = {
              towgs84: '-106,-87,188',
              ellipse: 'clrk80',
              datumName: 'Beduaram',
            }),
            (i.gunung_segara = {
              towgs84: '-403,684,41',
              ellipse: 'bessel',
              datumName: 'Gunung Segara Jakarta',
            }),
            (i.rnb72 = {
              towgs84: '106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1',
              ellipse: 'intl',
              datumName: 'Reseau National Belge 1972',
            });
        },
        {},
      ],
      26: [
        function (t, s, i) {
          (i.MERIT = { a: 6378137, rf: 298.257, ellipseName: 'MERIT 1983' }),
            (i.SGS85 = {
              a: 6378136,
              rf: 298.257,
              ellipseName: 'Soviet Geodetic System 85',
            }),
            (i.GRS80 = {
              a: 6378137,
              rf: 298.257222101,
              ellipseName: 'GRS 1980(IUGG, 1980)',
            }),
            (i.IAU76 = { a: 6378140, rf: 298.257, ellipseName: 'IAU 1976' }),
            (i.airy = {
              a: 6377563.396,
              b: 6356256.91,
              ellipseName: 'Airy 1830',
            }),
            (i.APL4 = {
              a: 6378137,
              rf: 298.25,
              ellipseName: 'Appl. Physics. 1965',
            }),
            (i.NWL9D = {
              a: 6378145,
              rf: 298.25,
              ellipseName: 'Naval Weapons Lab., 1965',
            }),
            (i.mod_airy = {
              a: 6377340.189,
              b: 6356034.446,
              ellipseName: 'Modified Airy',
            }),
            (i.andrae = {
              a: 6377104.43,
              rf: 300,
              ellipseName: 'Andrae 1876 (Den., Iclnd.)',
            }),
            (i.aust_SA = {
              a: 6378160,
              rf: 298.25,
              ellipseName: 'Australian Natl & S. Amer. 1969',
            }),
            (i.GRS67 = {
              a: 6378160,
              rf: 298.247167427,
              ellipseName: 'GRS 67(IUGG 1967)',
            }),
            (i.bessel = {
              a: 6377397.155,
              rf: 299.1528128,
              ellipseName: 'Bessel 1841',
            }),
            (i.bess_nam = {
              a: 6377483.865,
              rf: 299.1528128,
              ellipseName: 'Bessel 1841 (Namibia)',
            }),
            (i.clrk66 = {
              a: 6378206.4,
              b: 6356583.8,
              ellipseName: 'Clarke 1866',
            }),
            (i.clrk80 = {
              a: 6378249.145,
              rf: 293.4663,
              ellipseName: 'Clarke 1880 mod.',
            }),
            (i.clrk58 = {
              a: 6378293.645208759,
              rf: 294.2606763692654,
              ellipseName: 'Clarke 1858',
            }),
            (i.CPM = {
              a: 6375738.7,
              rf: 334.29,
              ellipseName: 'Comm. des Poids et Mesures 1799',
            }),
            (i.delmbr = {
              a: 6376428,
              rf: 311.5,
              ellipseName: 'Delambre 1810 (Belgium)',
            }),
            (i.engelis = {
              a: 6378136.05,
              rf: 298.2566,
              ellipseName: 'Engelis 1985',
            }),
            (i.evrst30 = {
              a: 6377276.345,
              rf: 300.8017,
              ellipseName: 'Everest 1830',
            }),
            (i.evrst48 = {
              a: 6377304.063,
              rf: 300.8017,
              ellipseName: 'Everest 1948',
            }),
            (i.evrst56 = {
              a: 6377301.243,
              rf: 300.8017,
              ellipseName: 'Everest 1956',
            }),
            (i.evrst69 = {
              a: 6377295.664,
              rf: 300.8017,
              ellipseName: 'Everest 1969',
            }),
            (i.evrstSS = {
              a: 6377298.556,
              rf: 300.8017,
              ellipseName: 'Everest (Sabah & Sarawak)',
            }),
            (i.fschr60 = {
              a: 6378166,
              rf: 298.3,
              ellipseName: 'Fischer (Mercury Datum) 1960',
            }),
            (i.fschr60m = {
              a: 6378155,
              rf: 298.3,
              ellipseName: 'Fischer 1960',
            }),
            (i.fschr68 = {
              a: 6378150,
              rf: 298.3,
              ellipseName: 'Fischer 1968',
            }),
            (i.helmert = {
              a: 6378200,
              rf: 298.3,
              ellipseName: 'Helmert 1906',
            }),
            (i.hough = { a: 6378270, rf: 297, ellipseName: 'Hough' }),
            (i.intl = {
              a: 6378388,
              rf: 297,
              ellipseName: 'International 1909 (Hayford)',
            }),
            (i.kaula = { a: 6378163, rf: 298.24, ellipseName: 'Kaula 1961' }),
            (i.lerch = { a: 6378139, rf: 298.257, ellipseName: 'Lerch 1979' }),
            (i.mprts = { a: 6397300, rf: 191, ellipseName: 'Maupertius 1738' }),
            (i.new_intl = {
              a: 6378157.5,
              b: 6356772.2,
              ellipseName: 'New International 1967',
            }),
            (i.plessis = {
              a: 6376523,
              rf: 6355863,
              ellipseName: 'Plessis 1817 (France)',
            }),
            (i.krass = {
              a: 6378245,
              rf: 298.3,
              ellipseName: 'Krassovsky, 1942',
            }),
            (i.SEasia = {
              a: 6378155,
              b: 6356773.3205,
              ellipseName: 'Southeast Asia',
            }),
            (i.walbeck = {
              a: 6376896,
              b: 6355834.8467,
              ellipseName: 'Walbeck',
            }),
            (i.WGS60 = { a: 6378165, rf: 298.3, ellipseName: 'WGS 60' }),
            (i.WGS66 = { a: 6378145, rf: 298.25, ellipseName: 'WGS 66' }),
            (i.WGS7 = { a: 6378135, rf: 298.26, ellipseName: 'WGS 72' }),
            (i.WGS84 = {
              a: 6378137,
              rf: 298.257223563,
              ellipseName: 'WGS 84',
            }),
            (i.sphere = {
              a: 6370997,
              b: 6370997,
              ellipseName: 'Normal Sphere (r=6370997)',
            });
        },
        {},
      ],
      27: [
        function (t, s, i) {
          (i.greenwich = 0),
            (i.lisbon = -9.131906111111),
            (i.paris = 2.337229166667),
            (i.bogota = -74.080916666667),
            (i.madrid = -3.687938888889),
            (i.rome = 12.452333333333),
            (i.bern = 7.439583333333),
            (i.jakarta = 106.807719444444),
            (i.ferro = -17.666666666667),
            (i.brussels = 4.367975),
            (i.stockholm = 18.058277777778),
            (i.athens = 23.7163375),
            (i.oslo = 10.722916666667);
        },
        {},
      ],
      28: [
        function (t, s, i) {
          (i.ft = { to_meter: 0.3048 }),
            (i['us-ft'] = { to_meter: 1200 / 3937 });
        },
        {},
      ],
      29: [
        function (t, s, i) {
          var a = t('./Proj'),
            h = t('./transform'),
            n = a('WGS84');
          function e(t, s, i) {
            var a;
            return Array.isArray(i)
              ? ((a = h(t, s, i)),
                3 === i.length ? [a.x, a.y, a.z] : [a.x, a.y])
              : h(t, s, i);
          }
          function o(t) {
            return t instanceof a ? t : t.oProj ? t.oProj : a(t);
          }
          s.exports = function (t, s, i) {
            t = o(t);
            var a,
              h = !1;
            return (
              void 0 === s
                ? ((s = t), (t = n), (h = !0))
                : (void 0 !== s.x || Array.isArray(s)) &&
                  ((i = s), (s = t), (t = n), (h = !0)),
              (s = o(s)),
              i
                ? e(t, s, i)
                : ((a = {
                    forward: function (i) {
                      return e(t, s, i);
                    },
                    inverse: function (i) {
                      return e(s, t, i);
                    },
                  }),
                  h && (a.oProj = s),
                  a)
            );
          };
        },
        { './Proj': 2, './transform': 65 },
      ],
      30: [
        function (t, s, i) {
          var a = Math.PI / 2,
            h = 484813681109536e-20,
            n = 0.3826834323650898,
            e = function (t) {
              if (!(this instanceof e)) return new e(t);
              (this.datum_type = 4),
                t &&
                  (t.datumCode &&
                    'none' === t.datumCode &&
                    (this.datum_type = 5),
                  t.datum_params &&
                    ((this.datum_params = t.datum_params.map(parseFloat)),
                    (0 === this.datum_params[0] &&
                      0 === this.datum_params[1] &&
                      0 === this.datum_params[2]) ||
                      (this.datum_type = 1),
                    this.datum_params.length > 3 &&
                      ((0 === this.datum_params[3] &&
                        0 === this.datum_params[4] &&
                        0 === this.datum_params[5] &&
                        0 === this.datum_params[6]) ||
                        ((this.datum_type = 2),
                        (this.datum_params[3] *= h),
                        (this.datum_params[4] *= h),
                        (this.datum_params[5] *= h),
                        (this.datum_params[6] =
                          this.datum_params[6] / 1e6 + 1)))),
                  (this.datum_type = t.grids ? 3 : this.datum_type),
                  (this.a = t.a),
                  (this.b = t.b),
                  (this.es = t.es),
                  (this.ep2 = t.ep2),
                  3 === this.datum_type && (this.grids = t.grids));
            };
          (e.prototype = {
            compare_datums: function (t) {
              return (
                this.datum_type === t.datum_type &&
                !(this.a !== t.a || Math.abs(this.es - t.es) > 5e-11) &&
                (1 === this.datum_type
                  ? this.datum_params[0] === t.datum_params[0] &&
                    this.datum_params[1] === t.datum_params[1] &&
                    this.datum_params[2] === t.datum_params[2]
                  : 2 === this.datum_type
                  ? this.datum_params[0] === t.datum_params[0] &&
                    this.datum_params[1] === t.datum_params[1] &&
                    this.datum_params[2] === t.datum_params[2] &&
                    this.datum_params[3] === t.datum_params[3] &&
                    this.datum_params[4] === t.datum_params[4] &&
                    this.datum_params[5] === t.datum_params[5] &&
                    this.datum_params[6] === t.datum_params[6]
                  : (3 !== this.datum_type && 3 !== t.datum_type) ||
                    this.nadgrids === t.nadgrids)
              );
            },
            geodetic_to_geocentric: function (t) {
              var s,
                i,
                h,
                n,
                e,
                o,
                r,
                c = t.x,
                l = t.y,
                m = t.z ? t.z : 0;
              if (l < -a && l > -1.001 * a) l = -a;
              else if (l > a && l < 1.001 * a) l = a;
              else if (l < -a || l > a) return null;
              return (
                c > Math.PI && (c -= 2 * Math.PI),
                (e = Math.sin(l)),
                (r = Math.cos(l)),
                (o = e * e),
                (s =
                  ((n = this.a / Math.sqrt(1 - this.es * o)) + m) *
                  r *
                  Math.cos(c)),
                (i = (n + m) * r * Math.sin(c)),
                (h = (n * (1 - this.es) + m) * e),
                (t.x = s),
                (t.y = i),
                (t.z = h),
                0
              );
            },
            geocentric_to_geodetic: function (t) {
              var s,
                i,
                h,
                n,
                e,
                o,
                r,
                c,
                l,
                m,
                u,
                M,
                f,
                p,
                d,
                _,
                y = t.x,
                g = t.y,
                x = t.z ? t.z : 0;
              if (
                ((s = Math.sqrt(y * y + g * g)),
                (i = Math.sqrt(y * y + g * g + x * x)),
                s / this.a < 1e-12)
              ) {
                if (((p = 0), i / this.a < 1e-12))
                  return (d = a), void (_ = -this.b);
              } else p = Math.atan2(g, y);
              (h = x / i),
                (n = s / i),
                (e = 1 / Math.sqrt(1 - this.es * (2 - this.es) * n * n)),
                (c = n * (1 - this.es) * e),
                (l = h * e),
                (f = 0);
              do {
                f++,
                  (_ =
                    s * c +
                    x * l -
                    (r = this.a / Math.sqrt(1 - this.es * l * l)) *
                      (1 - this.es * l * l)),
                  (o = (this.es * r) / (r + _)),
                  (M =
                    (u = h * (e = 1 / Math.sqrt(1 - o * (2 - o) * n * n))) * c -
                    (m = n * (1 - o) * e) * l),
                  (c = m),
                  (l = u);
              } while (M * M > 1e-24 && f < 30);
              return (
                (d = Math.atan(u / Math.abs(m))),
                (t.x = p),
                (t.y = d),
                (t.z = _),
                t
              );
            },
            geocentric_to_geodetic_noniter: function (t) {
              var s,
                i,
                h,
                e,
                o,
                r,
                c,
                l,
                m,
                u,
                M,
                f,
                p,
                d,
                _,
                y,
                g,
                x = t.x,
                b = t.y,
                v = t.z ? t.z : 0;
              if (
                ((x = parseFloat(x)),
                (b = parseFloat(b)),
                (v = parseFloat(v)),
                (g = !1),
                0 !== x)
              )
                s = Math.atan2(b, x);
              else if (b > 0) s = a;
              else if (b < 0) s = -a;
              else if (((g = !0), (s = 0), v > 0)) i = a;
              else {
                if (!(v < 0)) return (i = a), void (h = -this.b);
                i = -a;
              }
              return (
                (o = x * x + b * b),
                (r = 1.0026 * v),
                (f = (e = Math.sqrt(o)) / (l = Math.sqrt(r * r + o))),
                (M = (u = r / l) * u * u),
                (c = v + this.b * this.ep2 * M),
                (y = e - this.a * this.es * f * f * f),
                (p = c / (m = Math.sqrt(c * c + y * y))),
                (d = y / m),
                (_ = this.a / Math.sqrt(1 - this.es * p * p)),
                (h =
                  d >= n
                    ? e / d - _
                    : d <= -n
                    ? e / -d - _
                    : v / p + _ * (this.es - 1)),
                !1 === g && (i = Math.atan(p / d)),
                (t.x = s),
                (t.y = i),
                (t.z = h),
                t
              );
            },
            geocentric_to_wgs84: function (t) {
              if (1 === this.datum_type)
                (t.x += this.datum_params[0]),
                  (t.y += this.datum_params[1]),
                  (t.z += this.datum_params[2]);
              else if (2 === this.datum_type) {
                var s = this.datum_params[0],
                  i = this.datum_params[1],
                  a = this.datum_params[2],
                  h = this.datum_params[3],
                  n = this.datum_params[4],
                  e = this.datum_params[5],
                  o = this.datum_params[6],
                  r = o * (t.x - e * t.y + n * t.z) + s,
                  c = o * (e * t.x + t.y - h * t.z) + i,
                  l = o * (-n * t.x + h * t.y + t.z) + a;
                (t.x = r), (t.y = c), (t.z = l);
              }
            },
            geocentric_from_wgs84: function (t) {
              if (1 === this.datum_type)
                (t.x -= this.datum_params[0]),
                  (t.y -= this.datum_params[1]),
                  (t.z -= this.datum_params[2]);
              else if (2 === this.datum_type) {
                var s = this.datum_params[0],
                  i = this.datum_params[1],
                  a = this.datum_params[2],
                  h = this.datum_params[3],
                  n = this.datum_params[4],
                  e = this.datum_params[5],
                  o = this.datum_params[6],
                  r = (t.x - s) / o,
                  c = (t.y - i) / o,
                  l = (t.z - a) / o;
                (t.x = r + e * c - n * l),
                  (t.y = -e * r + c + h * l),
                  (t.z = n * r - h * c + l);
              }
            },
          }),
            (s.exports = e);
        },
        {},
      ],
      31: [
        function (t, s, i) {
          var a = 6378137,
            h = 0.006694379990141316;
          s.exports = function (t, s, i) {
            var n, e, o;
            function r(t) {
              return 1 === t || 2 === t;
            }
            if (t.compare_datums(s)) return i;
            if (5 === t.datum_type || 5 === s.datum_type) return i;
            var c = t.a,
              l = t.es,
              m = s.a,
              u = s.es,
              M = t.datum_type;
            if (3 === M)
              if (0 === this.apply_gridshift(t, 0, i)) (t.a = a), (t.es = h);
              else {
                if (!t.datum_params) return (t.a = c), (t.es = t.es), i;
                for (n = 1, e = 0, o = t.datum_params.length; e < o; e++)
                  n *= t.datum_params[e];
                if (0 === n) return (t.a = c), (t.es = t.es), i;
                M = t.datum_params.length > 3 ? 2 : 1;
              }
            return (
              3 === s.datum_type && ((s.a = a), (s.es = h)),
              (t.es !== s.es || t.a !== s.a || r(M) || r(s.datum_type)) &&
                (t.geodetic_to_geocentric(i),
                r(t.datum_type) && t.geocentric_to_wgs84(i),
                r(s.datum_type) && s.geocentric_from_wgs84(i),
                s.geocentric_to_geodetic(i)),
              3 === s.datum_type && this.apply_gridshift(s, 1, i),
              (t.a = c),
              (t.es = l),
              (s.a = m),
              (s.es = u),
              i
            );
          };
        },
        {},
      ],
      32: [
        function (t, s, i) {
          var a = t('./global'),
            h = t('./projString'),
            n = t('./wkt');
          function e(t) {
            var s = this;
            if (2 === arguments.length) {
              var i = arguments[1];
              'string' == typeof i
                ? '+' === i.charAt(0)
                  ? (e[t] = h(arguments[1]))
                  : (e[t] = n(arguments[1]))
                : (e[t] = i);
            } else if (1 === arguments.length) {
              if (Array.isArray(t))
                return t.map(function (t) {
                  Array.isArray(t) ? e.apply(s, t) : e(t);
                });
              if ('string' == typeof t) {
                if (t in e) return e[t];
              } else
                'EPSG' in t
                  ? (e['EPSG:' + t.EPSG] = t)
                  : 'ESRI' in t
                  ? (e['ESRI:' + t.ESRI] = t)
                  : 'IAU2000' in t
                  ? (e['IAU2000:' + t.IAU2000] = t)
                  : console.log(t);
              return;
            }
          }
          a(e), (s.exports = e);
        },
        { './global': 35, './projString': 38, './wkt': 66 },
      ],
      33: [
        function (t, s, i) {
          var a = t('./constants/Datum'),
            h = t('./constants/Ellipsoid'),
            n = t('./extend'),
            e = t('./datum');
          s.exports = function (t) {
            if (t.datumCode && 'none' !== t.datumCode) {
              var s = a[t.datumCode];
              s &&
                ((t.datum_params = s.towgs84 ? s.towgs84.split(',') : null),
                (t.ellps = s.ellipse),
                (t.datumName = s.datumName ? s.datumName : t.datumCode));
            }
            if (!t.a) {
              var i = h[t.ellps] ? h[t.ellps] : h.WGS84;
              n(t, i);
            }
            return (
              t.rf && !t.b && (t.b = (1 - 1 / t.rf) * t.a),
              (0 === t.rf || Math.abs(t.a - t.b) < 1e-10) &&
                ((t.sphere = !0), (t.b = t.a)),
              (t.a2 = t.a * t.a),
              (t.b2 = t.b * t.b),
              (t.es = (t.a2 - t.b2) / t.a2),
              (t.e = Math.sqrt(t.es)),
              t.R_A &&
                ((t.a *=
                  1 -
                  t.es *
                    (0.16666666666666666 +
                      t.es *
                        (0.04722222222222222 + 0.022156084656084655 * t.es))),
                (t.a2 = t.a * t.a),
                (t.b2 = t.b * t.b),
                (t.es = 0)),
              (t.ep2 = (t.a2 - t.b2) / t.b2),
              t.k0 || (t.k0 = 1),
              t.axis || (t.axis = 'enu'),
              t.datum || (t.datum = e(t)),
              t
            );
          };
        },
        {
          './constants/Datum': 25,
          './constants/Ellipsoid': 26,
          './datum': 30,
          './extend': 34,
        },
      ],
      34: [
        function (t, s, i) {
          s.exports = function (t, s) {
            var i, a;
            if (((t = t || {}), !s)) return t;
            for (a in s) void 0 !== (i = s[a]) && (t[a] = i);
            return t;
          };
        },
        {},
      ],
      35: [
        function (t, s, i) {
          s.exports = function (t) {
            t(
              'EPSG:4326',
              '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees',
            ),
              t(
                'EPSG:4269',
                '+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees',
              ),
              t(
                'EPSG:3857',
                '+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs',
              ),
              (t.WGS84 = t['EPSG:4326']),
              (t['EPSG:3785'] = t['EPSG:3857']),
              (t.GOOGLE = t['EPSG:3857']),
              (t['EPSG:900913'] = t['EPSG:3857']),
              (t['EPSG:102113'] = t['EPSG:3857']);
          };
        },
        {},
      ],
      36: [
        function (t, s, i) {
          var a = t('./core');
          (a.defaultDatum = 'WGS84'),
            (a.Proj = t('./Proj')),
            (a.WGS84 = new a.Proj('WGS84')),
            (a.Point = t('./Point')),
            (a.toPoint = t('./common/toPoint')),
            (a.defs = t('./defs')),
            (a.transform = t('./transform')),
            (a.mgrs = t('mgrs')),
            (a.version = t('../package.json').version),
            t('./includedProjections')(a),
            (s.exports = a);
        },
        {
          '../package.json': 68,
          './Point': 1,
          './Proj': 2,
          './common/toPoint': 23,
          './core': 29,
          './defs': 32,
          './includedProjections': 'hTEDpn',
          './transform': 65,
          mgrs: 67,
        },
      ],
      37: [
        function (t, s, i) {
          var a = t('./defs'),
            h = t('./wkt'),
            n = t('./projString');
          s.exports = function (t) {
            return (function (t) {
              return 'string' == typeof t;
            })(t)
              ? (function (t) {
                  return t in a;
                })(t)
                ? a[t]
                : (function (t) {
                    return ['GEOGCS', 'GEOCCS', 'PROJCS', 'LOCAL_CS'].reduce(
                      function (s, i) {
                        return s + 1 + t.indexOf(i);
                      },
                      0,
                    );
                  })(t)
                ? h(t)
                : (function (t) {
                    return '+' === t[0];
                  })(t)
                ? n(t)
                : void 0
              : t;
          };
        },
        { './defs': 32, './projString': 38, './wkt': 66 },
      ],
      38: [
        function (t, s, i) {
          var a = 0.017453292519943295,
            h = t('./constants/PrimeMeridian'),
            n = t('./constants/units');
          s.exports = function (t) {
            var s,
              i,
              e,
              o = {},
              r = {};
            t.split('+')
              .map(function (t) {
                return t.trim();
              })
              .filter(function (t) {
                return t;
              })
              .forEach(function (t) {
                var s = t.split('=');
                s.push(!0), (r[s[0].toLowerCase()] = s[1]);
              });
            var c = {
              proj: 'projName',
              datum: 'datumCode',
              rf: function (t) {
                o.rf = parseFloat(t);
              },
              lat_0: function (t) {
                o.lat0 = t * a;
              },
              lat_1: function (t) {
                o.lat1 = t * a;
              },
              lat_2: function (t) {
                o.lat2 = t * a;
              },
              lat_ts: function (t) {
                o.lat_ts = t * a;
              },
              lon_0: function (t) {
                o.long0 = t * a;
              },
              lon_1: function (t) {
                o.long1 = t * a;
              },
              lon_2: function (t) {
                o.long2 = t * a;
              },
              alpha: function (t) {
                o.alpha = parseFloat(t) * a;
              },
              lonc: function (t) {
                o.longc = t * a;
              },
              x_0: function (t) {
                o.x0 = parseFloat(t);
              },
              y_0: function (t) {
                o.y0 = parseFloat(t);
              },
              k_0: function (t) {
                o.k0 = parseFloat(t);
              },
              k: function (t) {
                o.k0 = parseFloat(t);
              },
              a: function (t) {
                o.a = parseFloat(t);
              },
              b: function (t) {
                o.b = parseFloat(t);
              },
              r_a: function () {
                o.R_A = !0;
              },
              zone: function (t) {
                o.zone = parseInt(t, 10);
              },
              south: function () {
                o.utmSouth = !0;
              },
              towgs84: function (t) {
                o.datum_params = t.split(',').map(function (t) {
                  return parseFloat(t);
                });
              },
              to_meter: function (t) {
                o.to_meter = parseFloat(t);
              },
              units: function (t) {
                (o.units = t), n[t] && (o.to_meter = n[t].to_meter);
              },
              from_greenwich: function (t) {
                o.from_greenwich = t * a;
              },
              pm: function (t) {
                o.from_greenwich = (h[t] ? h[t] : parseFloat(t)) * a;
              },
              nadgrids: function (t) {
                '@null' === t ? (o.datumCode = 'none') : (o.nadgrids = t);
              },
              axis: function (t) {
                var s = 'ewnsud';
                3 === t.length &&
                  -1 !== s.indexOf(t.substr(0, 1)) &&
                  -1 !== s.indexOf(t.substr(1, 1)) &&
                  -1 !== s.indexOf(t.substr(2, 1)) &&
                  (o.axis = t);
              },
            };
            for (s in r)
              (i = r[s]),
                s in c
                  ? 'function' == typeof (e = c[s])
                    ? e(i)
                    : (o[e] = i)
                  : (o[s] = i);
            return (
              'string' == typeof o.datumCode &&
                'WGS84' !== o.datumCode &&
                (o.datumCode = o.datumCode.toLowerCase()),
              o
            );
          };
        },
        { './constants/PrimeMeridian': 27, './constants/units': 28 },
      ],
      39: [
        function (t, s, i) {
          var a = [t('./projections/merc'), t('./projections/longlat')],
            h = {},
            n = [];
          function e(t, s) {
            var i = n.length;
            return t.names
              ? ((n[i] = t),
                t.names.forEach(function (t) {
                  h[t.toLowerCase()] = i;
                }),
                this)
              : (console.log(s), !0);
          }
          (i.add = e),
            (i.get = function (t) {
              if (!t) return !1;
              var s = t.toLowerCase();
              return void 0 !== h[s] && n[h[s]] ? n[h[s]] : void 0;
            }),
            (i.start = function () {
              a.forEach(e);
            });
        },
        { './projections/longlat': 51, './projections/merc': 52 },
      ],
      40: [
        function (t, s, i) {
          var a = 1e-10,
            h = t('../common/msfnz'),
            n = t('../common/qsfnz'),
            e = t('../common/adjust_lon'),
            o = t('../common/asinz');
          (i.init = function () {
            Math.abs(this.lat1 + this.lat2) < a ||
              ((this.temp = this.b / this.a),
              (this.es = 1 - Math.pow(this.temp, 2)),
              (this.e3 = Math.sqrt(this.es)),
              (this.sin_po = Math.sin(this.lat1)),
              (this.cos_po = Math.cos(this.lat1)),
              (this.t1 = this.sin_po),
              (this.con = this.sin_po),
              (this.ms1 = h(this.e3, this.sin_po, this.cos_po)),
              (this.qs1 = n(this.e3, this.sin_po, this.cos_po)),
              (this.sin_po = Math.sin(this.lat2)),
              (this.cos_po = Math.cos(this.lat2)),
              (this.t2 = this.sin_po),
              (this.ms2 = h(this.e3, this.sin_po, this.cos_po)),
              (this.qs2 = n(this.e3, this.sin_po, this.cos_po)),
              (this.sin_po = Math.sin(this.lat0)),
              (this.cos_po = Math.cos(this.lat0)),
              (this.t3 = this.sin_po),
              (this.qs0 = n(this.e3, this.sin_po, this.cos_po)),
              Math.abs(this.lat1 - this.lat2) > a
                ? (this.ns0 =
                    (this.ms1 * this.ms1 - this.ms2 * this.ms2) /
                    (this.qs2 - this.qs1))
                : (this.ns0 = this.con),
              (this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1),
              (this.rh =
                (this.a * Math.sqrt(this.c - this.ns0 * this.qs0)) / this.ns0));
          }),
            (i.forward = function (t) {
              var s = t.x,
                i = t.y;
              (this.sin_phi = Math.sin(i)), (this.cos_phi = Math.cos(i));
              var a = n(this.e3, this.sin_phi, this.cos_phi),
                h = (this.a * Math.sqrt(this.c - this.ns0 * a)) / this.ns0,
                o = this.ns0 * e(s - this.long0),
                r = h * Math.sin(o) + this.x0,
                c = this.rh - h * Math.cos(o) + this.y0;
              return (t.x = r), (t.y = c), t;
            }),
            (i.inverse = function (t) {
              var s, i, a, h, n, o;
              return (
                (t.x -= this.x0),
                (t.y = this.rh - t.y + this.y0),
                this.ns0 >= 0
                  ? ((s = Math.sqrt(t.x * t.x + t.y * t.y)), (a = 1))
                  : ((s = -Math.sqrt(t.x * t.x + t.y * t.y)), (a = -1)),
                (h = 0),
                0 !== s && (h = Math.atan2(a * t.x, a * t.y)),
                (a = (s * this.ns0) / this.a),
                this.sphere
                  ? (o = Math.asin((this.c - a * a) / (2 * this.ns0)))
                  : ((i = (this.c - a * a) / this.ns0),
                    (o = this.phi1z(this.e3, i))),
                (n = e(h / this.ns0 + this.long0)),
                (t.x = n),
                (t.y = o),
                t
              );
            }),
            (i.phi1z = function (t, s) {
              var i,
                h,
                n,
                e,
                r = o(0.5 * s);
              if (t < a) return r;
              for (var c = t * t, l = 1; l <= 25; l++)
                if (
                  ((r += e =
                    ((0.5 * (n = 1 - (h = t * (i = Math.sin(r))) * h) * n) /
                      Math.cos(r)) *
                    (s / (1 - c) -
                      i / n +
                      (0.5 / t) * Math.log((1 - h) / (1 + h)))),
                  Math.abs(e) <= 1e-7)
                )
                  return r;
              return null;
            }),
            (i.names = ['Albers_Conic_Equal_Area', 'Albers', 'aea']);
        },
        {
          '../common/adjust_lon': 5,
          '../common/asinz': 6,
          '../common/msfnz': 15,
          '../common/qsfnz': 20,
        },
      ],
      41: [
        function (t, s, i) {
          var a = t('../common/adjust_lon'),
            h = Math.PI / 2,
            n = 1e-10,
            e = t('../common/mlfn'),
            o = t('../common/e0fn'),
            r = t('../common/e1fn'),
            c = t('../common/e2fn'),
            l = t('../common/e3fn'),
            m = t('../common/gN'),
            u = t('../common/asinz'),
            M = t('../common/imlfn');
          (i.init = function () {
            (this.sin_p12 = Math.sin(this.lat0)),
              (this.cos_p12 = Math.cos(this.lat0));
          }),
            (i.forward = function (t) {
              var s,
                i,
                u,
                M,
                f,
                p,
                d,
                _,
                y,
                g,
                x,
                b,
                v,
                w,
                P,
                j,
                C,
                S,
                N,
                q,
                k,
                I,
                E = t.x,
                z = t.y,
                A = Math.sin(t.y),
                O = Math.cos(t.y),
                G = a(E - this.long0);
              return this.sphere
                ? Math.abs(this.sin_p12 - 1) <= n
                  ? ((t.x = this.x0 + this.a * (h - z) * Math.sin(G)),
                    (t.y = this.y0 - this.a * (h - z) * Math.cos(G)),
                    t)
                  : Math.abs(this.sin_p12 + 1) <= n
                  ? ((t.x = this.x0 + this.a * (h + z) * Math.sin(G)),
                    (t.y = this.y0 + this.a * (h + z) * Math.cos(G)),
                    t)
                  : ((S = this.sin_p12 * A + this.cos_p12 * O * Math.cos(G)),
                    (C = (j = Math.acos(S)) / Math.sin(j)),
                    (t.x = this.x0 + this.a * C * O * Math.sin(G)),
                    (t.y =
                      this.y0 +
                      this.a *
                        C *
                        (this.cos_p12 * A - this.sin_p12 * O * Math.cos(G))),
                    t)
                : ((s = o(this.es)),
                  (i = r(this.es)),
                  (u = c(this.es)),
                  (M = l(this.es)),
                  Math.abs(this.sin_p12 - 1) <= n
                    ? ((f = this.a * e(s, i, u, M, h)),
                      (p = this.a * e(s, i, u, M, z)),
                      (t.x = this.x0 + (f - p) * Math.sin(G)),
                      (t.y = this.y0 - (f - p) * Math.cos(G)),
                      t)
                    : Math.abs(this.sin_p12 + 1) <= n
                    ? ((f = this.a * e(s, i, u, M, h)),
                      (p = this.a * e(s, i, u, M, z)),
                      (t.x = this.x0 + (f + p) * Math.sin(G)),
                      (t.y = this.y0 + (f + p) * Math.cos(G)),
                      t)
                    : ((d = A / O),
                      (_ = m(this.a, this.e, this.sin_p12)),
                      (y = m(this.a, this.e, A)),
                      (g = Math.atan(
                        (1 - this.es) * d +
                          (this.es * _ * this.sin_p12) / (y * O),
                      )),
                      (N =
                        0 ===
                        (x = Math.atan2(
                          Math.sin(G),
                          this.cos_p12 * Math.tan(g) -
                            this.sin_p12 * Math.cos(G),
                        ))
                          ? Math.asin(
                              this.cos_p12 * Math.sin(g) -
                                this.sin_p12 * Math.cos(g),
                            )
                          : Math.abs(Math.abs(x) - Math.PI) <= n
                          ? -Math.asin(
                              this.cos_p12 * Math.sin(g) -
                                this.sin_p12 * Math.cos(g),
                            )
                          : Math.asin(
                              (Math.sin(G) * Math.cos(g)) / Math.sin(x),
                            )),
                      (b = (this.e * this.sin_p12) / Math.sqrt(1 - this.es)),
                      (j =
                        _ *
                        N *
                        (1 -
                          ((q = N * N) *
                            (P =
                              (v =
                                (this.e * this.cos_p12 * Math.cos(x)) /
                                Math.sqrt(1 - this.es)) * v) *
                            (1 - P)) /
                            6 +
                          ((k = q * N) / 8) * (w = b * v) * (1 - 2 * P) +
                          ((I = k * N) / 120) *
                            (P * (4 - 7 * P) - 3 * b * b * (1 - 7 * P)) -
                          ((I * N) / 48) * w)),
                      (t.x = this.x0 + j * Math.sin(x)),
                      (t.y = this.y0 + j * Math.cos(x)),
                      t));
            }),
            (i.inverse = function (t) {
              var s,
                i,
                f,
                p,
                d,
                _,
                y,
                g,
                x,
                b,
                v,
                w,
                P,
                j,
                C,
                S,
                N,
                q,
                k,
                I,
                E,
                z;
              if (((t.x -= this.x0), (t.y -= this.y0), this.sphere)) {
                if ((s = Math.sqrt(t.x * t.x + t.y * t.y)) > 2 * h * this.a)
                  return;
                return (
                  (i = s / this.a),
                  (f = Math.sin(i)),
                  (p = Math.cos(i)),
                  (d = this.long0),
                  Math.abs(s) <= n
                    ? (_ = this.lat0)
                    : ((_ = u(p * this.sin_p12 + (t.y * f * this.cos_p12) / s)),
                      (y = Math.abs(this.lat0) - h),
                      (d =
                        Math.abs(y) <= n
                          ? this.lat0 >= 0
                            ? a(this.long0 + Math.atan2(t.x, -t.y))
                            : a(this.long0 - Math.atan2(-t.x, t.y))
                          : a(
                              this.long0 +
                                Math.atan2(
                                  t.x * f,
                                  s * this.cos_p12 * p - t.y * this.sin_p12 * f,
                                ),
                            ))),
                  (t.x = d),
                  (t.y = _),
                  t
                );
              }
              return (
                (g = o(this.es)),
                (x = r(this.es)),
                (b = c(this.es)),
                (v = l(this.es)),
                Math.abs(this.sin_p12 - 1) <= n
                  ? ((w = this.a * e(g, x, b, v, h)),
                    (s = Math.sqrt(t.x * t.x + t.y * t.y)),
                    (_ = M((w - s) / this.a, g, x, b, v)),
                    (d = a(this.long0 + Math.atan2(t.x, -1 * t.y))),
                    (t.x = d),
                    (t.y = _),
                    t)
                  : Math.abs(this.sin_p12 + 1) <= n
                  ? ((w = this.a * e(g, x, b, v, h)),
                    (s = Math.sqrt(t.x * t.x + t.y * t.y)),
                    (_ = M((s - w) / this.a, g, x, b, v)),
                    (d = a(this.long0 + Math.atan2(t.x, t.y))),
                    (t.x = d),
                    (t.y = _),
                    t)
                  : ((s = Math.sqrt(t.x * t.x + t.y * t.y)),
                    (C = Math.atan2(t.x, t.y)),
                    (P = m(this.a, this.e, this.sin_p12)),
                    (S = Math.cos(C)),
                    (q =
                      (-(N = this.e * this.cos_p12 * S) * N) / (1 - this.es)),
                    (k =
                      (3 *
                        this.es *
                        (1 - q) *
                        this.sin_p12 *
                        this.cos_p12 *
                        S) /
                      (1 - this.es)),
                    (z =
                      1 -
                      (q *
                        (E =
                          (I = s / P) -
                          (q * (1 + q) * Math.pow(I, 3)) / 6 -
                          (k * (1 + 3 * q) * Math.pow(I, 4)) / 24) *
                        E) /
                        2 -
                      (I * E * E * E) / 6),
                    (j = Math.asin(
                      this.sin_p12 * Math.cos(E) +
                        this.cos_p12 * Math.sin(E) * S,
                    )),
                    (d = a(
                      this.long0 +
                        Math.asin((Math.sin(C) * Math.sin(E)) / Math.cos(j)),
                    )),
                    (_ = Math.atan(
                      ((1 - (this.es * z * this.sin_p12) / Math.sin(j)) *
                        Math.tan(j)) /
                        (1 - this.es),
                    )),
                    (t.x = d),
                    (t.y = _),
                    t)
              );
            }),
            (i.names = ['Azimuthal_Equidistant', 'aeqd']);
        },
        {
          '../common/adjust_lon': 5,
          '../common/asinz': 6,
          '../common/e0fn': 7,
          '../common/e1fn': 8,
          '../common/e2fn': 9,
          '../common/e3fn': 10,
          '../common/gN': 11,
          '../common/imlfn': 12,
          '../common/mlfn': 14,
        },
      ],
      42: [
        function (t, s, i) {
          var a = t('../common/mlfn'),
            h = t('../common/e0fn'),
            n = t('../common/e1fn'),
            e = t('../common/e2fn'),
            o = t('../common/e3fn'),
            r = t('../common/gN'),
            c = t('../common/adjust_lon'),
            l = t('../common/adjust_lat'),
            m = t('../common/imlfn'),
            u = Math.PI / 2;
          (i.init = function () {
            this.sphere ||
              ((this.e0 = h(this.es)),
              (this.e1 = n(this.es)),
              (this.e2 = e(this.es)),
              (this.e3 = o(this.es)),
              (this.ml0 =
                this.a * a(this.e0, this.e1, this.e2, this.e3, this.lat0)));
          }),
            (i.forward = function (t) {
              var s,
                i,
                h = t.x,
                n = t.y;
              if (((h = c(h - this.long0)), this.sphere))
                (s = this.a * Math.asin(Math.cos(n) * Math.sin(h))),
                  (i =
                    this.a *
                    (Math.atan2(Math.tan(n), Math.cos(h)) - this.lat0));
              else {
                var e = Math.sin(n),
                  o = Math.cos(n),
                  l = r(this.a, this.e, e),
                  m = Math.tan(n) * Math.tan(n),
                  u = h * Math.cos(n),
                  M = u * u,
                  f = (this.es * o * o) / (1 - this.es);
                (s =
                  l * u * (1 - M * m * (1 / 6 - ((8 - m + 8 * f) * M) / 120))),
                  (i =
                    this.a * a(this.e0, this.e1, this.e2, this.e3, n) -
                    this.ml0 +
                    ((l * e) / o) * M * (0.5 + ((5 - m + 6 * f) * M) / 24));
              }
              return (t.x = s + this.x0), (t.y = i + this.y0), t;
            }),
            (i.inverse = function (t) {
              (t.x -= this.x0), (t.y -= this.y0);
              var s,
                i,
                a = t.x / this.a,
                h = t.y / this.a;
              if (this.sphere) {
                var n = h + this.lat0;
                (s = Math.asin(Math.sin(n) * Math.cos(a))),
                  (i = Math.atan2(Math.tan(a), Math.cos(n)));
              } else {
                var e = this.ml0 / this.a + h,
                  o = m(e, this.e0, this.e1, this.e2, this.e3);
                if (Math.abs(Math.abs(o) - u) <= 1e-10)
                  return (t.x = this.long0), (t.y = u), h < 0 && (t.y *= -1), t;
                var M = r(this.a, this.e, Math.sin(o)),
                  f = ((M * M * M) / this.a / this.a) * (1 - this.es),
                  p = Math.pow(Math.tan(o), 2),
                  d = (a * this.a) / M,
                  _ = d * d;
                (s =
                  o -
                  ((M * Math.tan(o)) / f) *
                    d *
                    d *
                    (0.5 - ((1 + 3 * p) * d * d) / 24)),
                  (i =
                    (d * (1 - _ * (p / 3 + ((1 + 3 * p) * p * _) / 15))) /
                    Math.cos(o));
              }
              return (t.x = c(i + this.long0)), (t.y = l(s)), t;
            }),
            (i.names = ['Cassini', 'Cassini_Soldner', 'cass']);
        },
        {
          '../common/adjust_lat': 4,
          '../common/adjust_lon': 5,
          '../common/e0fn': 7,
          '../common/e1fn': 8,
          '../common/e2fn': 9,
          '../common/e3fn': 10,
          '../common/gN': 11,
          '../common/imlfn': 12,
          '../common/mlfn': 14,
        },
      ],
      43: [
        function (t, s, i) {
          var a = t('../common/adjust_lon'),
            h = t('../common/qsfnz'),
            n = t('../common/msfnz'),
            e = t('../common/iqsfnz');
          (i.init = function () {
            this.sphere ||
              (this.k0 = n(
                this.e,
                Math.sin(this.lat_ts),
                Math.cos(this.lat_ts),
              ));
          }),
            (i.forward = function (t) {
              var s,
                i,
                n = t.x,
                e = t.y,
                o = a(n - this.long0);
              if (this.sphere)
                (s = this.x0 + this.a * o * Math.cos(this.lat_ts)),
                  (i =
                    this.y0 + (this.a * Math.sin(e)) / Math.cos(this.lat_ts));
              else {
                var r = h(this.e, Math.sin(e));
                (s = this.x0 + this.a * this.k0 * o),
                  (i = this.y0 + (this.a * r * 0.5) / this.k0);
              }
              return (t.x = s), (t.y = i), t;
            }),
            (i.inverse = function (t) {
              var s, i;
              return (
                (t.x -= this.x0),
                (t.y -= this.y0),
                this.sphere
                  ? ((s = a(this.long0 + t.x / this.a / Math.cos(this.lat_ts))),
                    (i = Math.asin((t.y / this.a) * Math.cos(this.lat_ts))))
                  : ((i = e(this.e, (2 * t.y * this.k0) / this.a)),
                    (s = a(this.long0 + t.x / (this.a * this.k0)))),
                (t.x = s),
                (t.y = i),
                t
              );
            }),
            (i.names = ['cea']);
        },
        {
          '../common/adjust_lon': 5,
          '../common/iqsfnz': 13,
          '../common/msfnz': 15,
          '../common/qsfnz': 20,
        },
      ],
      44: [
        function (t, s, i) {
          var a = t('../common/adjust_lon'),
            h = t('../common/adjust_lat');
          (i.init = function () {
            (this.x0 = this.x0 || 0),
              (this.y0 = this.y0 || 0),
              (this.lat0 = this.lat0 || 0),
              (this.long0 = this.long0 || 0),
              (this.lat_ts = this.lat_ts || 0),
              (this.title =
                this.title || 'Equidistant Cylindrical (Plate Carre)'),
              (this.rc = Math.cos(this.lat_ts));
          }),
            (i.forward = function (t) {
              var s = t.x,
                i = t.y,
                n = a(s - this.long0),
                e = h(i - this.lat0);
              return (
                (t.x = this.x0 + this.a * n * this.rc),
                (t.y = this.y0 + this.a * e),
                t
              );
            }),
            (i.inverse = function (t) {
              var s = t.x,
                i = t.y;
              return (
                (t.x = a(this.long0 + (s - this.x0) / (this.a * this.rc))),
                (t.y = h(this.lat0 + (i - this.y0) / this.a)),
                t
              );
            }),
            (i.names = ['Equirectangular', 'Equidistant_Cylindrical', 'eqc']);
        },
        { '../common/adjust_lat': 4, '../common/adjust_lon': 5 },
      ],
      45: [
        function (t, s, i) {
          var a = t('../common/e0fn'),
            h = t('../common/e1fn'),
            n = t('../common/e2fn'),
            e = t('../common/e3fn'),
            o = t('../common/msfnz'),
            r = t('../common/mlfn'),
            c = t('../common/adjust_lon'),
            l = t('../common/adjust_lat'),
            m = t('../common/imlfn');
          (i.init = function () {
            Math.abs(this.lat1 + this.lat2) < 1e-10 ||
              ((this.lat2 = this.lat2 || this.lat1),
              (this.temp = this.b / this.a),
              (this.es = 1 - Math.pow(this.temp, 2)),
              (this.e = Math.sqrt(this.es)),
              (this.e0 = a(this.es)),
              (this.e1 = h(this.es)),
              (this.e2 = n(this.es)),
              (this.e3 = e(this.es)),
              (this.sinphi = Math.sin(this.lat1)),
              (this.cosphi = Math.cos(this.lat1)),
              (this.ms1 = o(this.e, this.sinphi, this.cosphi)),
              (this.ml1 = r(this.e0, this.e1, this.e2, this.e3, this.lat1)),
              Math.abs(this.lat1 - this.lat2) < 1e-10
                ? (this.ns = this.sinphi)
                : ((this.sinphi = Math.sin(this.lat2)),
                  (this.cosphi = Math.cos(this.lat2)),
                  (this.ms2 = o(this.e, this.sinphi, this.cosphi)),
                  (this.ml2 = r(this.e0, this.e1, this.e2, this.e3, this.lat2)),
                  (this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1))),
              (this.g = this.ml1 + this.ms1 / this.ns),
              (this.ml0 = r(this.e0, this.e1, this.e2, this.e3, this.lat0)),
              (this.rh = this.a * (this.g - this.ml0)));
          }),
            (i.forward = function (t) {
              var s,
                i = t.x,
                a = t.y;
              if (this.sphere) s = this.a * (this.g - a);
              else {
                var h = r(this.e0, this.e1, this.e2, this.e3, a);
                s = this.a * (this.g - h);
              }
              var n = this.ns * c(i - this.long0),
                e = this.x0 + s * Math.sin(n),
                o = this.y0 + this.rh - s * Math.cos(n);
              return (t.x = e), (t.y = o), t;
            }),
            (i.inverse = function (t) {
              var s, i, a, h;
              (t.x -= this.x0),
                (t.y = this.rh - t.y + this.y0),
                this.ns >= 0
                  ? ((i = Math.sqrt(t.x * t.x + t.y * t.y)), (s = 1))
                  : ((i = -Math.sqrt(t.x * t.x + t.y * t.y)), (s = -1));
              var n = 0;
              if ((0 !== i && (n = Math.atan2(s * t.x, s * t.y)), this.sphere))
                return (
                  (h = c(this.long0 + n / this.ns)),
                  (a = l(this.g - i / this.a)),
                  (t.x = h),
                  (t.y = a),
                  t
                );
              var e = this.g - i / this.a;
              return (
                (a = m(e, this.e0, this.e1, this.e2, this.e3)),
                (h = c(this.long0 + n / this.ns)),
                (t.x = h),
                (t.y = a),
                t
              );
            }),
            (i.names = ['Equidistant_Conic', 'eqdc']);
        },
        {
          '../common/adjust_lat': 4,
          '../common/adjust_lon': 5,
          '../common/e0fn': 7,
          '../common/e1fn': 8,
          '../common/e2fn': 9,
          '../common/e3fn': 10,
          '../common/imlfn': 12,
          '../common/mlfn': 14,
          '../common/msfnz': 15,
        },
      ],
      46: [
        function (t, s, i) {
          var a = Math.PI / 4,
            h = t('../common/srat'),
            n = Math.PI / 2;
          (i.init = function () {
            var t = Math.sin(this.lat0),
              s = Math.cos(this.lat0);
            (s *= s),
              (this.rc = Math.sqrt(1 - this.es) / (1 - this.es * t * t)),
              (this.C = Math.sqrt(1 + (this.es * s * s) / (1 - this.es))),
              (this.phic0 = Math.asin(t / this.C)),
              (this.ratexp = 0.5 * this.C * this.e),
              (this.K =
                Math.tan(0.5 * this.phic0 + a) /
                (Math.pow(Math.tan(0.5 * this.lat0 + a), this.C) *
                  h(this.e * t, this.ratexp)));
          }),
            (i.forward = function (t) {
              var s = t.x,
                i = t.y;
              return (
                (t.y =
                  2 *
                    Math.atan(
                      this.K *
                        Math.pow(Math.tan(0.5 * i + a), this.C) *
                        h(this.e * Math.sin(i), this.ratexp),
                    ) -
                  n),
                (t.x = this.C * s),
                t
              );
            }),
            (i.inverse = function (t) {
              for (
                var s = t.x / this.C,
                  i = t.y,
                  e = Math.pow(Math.tan(0.5 * i + a) / this.K, 1 / this.C),
                  o = 20;
                o > 0 &&
                ((i =
                  2 * Math.atan(e * h(this.e * Math.sin(t.y), -0.5 * this.e)) -
                  n),
                !(Math.abs(i - t.y) < 1e-14));
                --o
              )
                t.y = i;
              return o ? ((t.x = s), (t.y = i), t) : null;
            }),
            (i.names = ['gauss']);
        },
        { '../common/srat': 22 },
      ],
      47: [
        function (t, s, i) {
          var a = t('../common/adjust_lon'),
            h = t('../common/asinz');
          (i.init = function () {
            (this.sin_p14 = Math.sin(this.lat0)),
              (this.cos_p14 = Math.cos(this.lat0)),
              (this.infinity_dist = 1e3 * this.a),
              (this.rc = 1);
          }),
            (i.forward = function (t) {
              var s,
                i,
                h,
                n,
                e,
                o,
                r,
                c = t.x,
                l = t.y;
              return (
                (h = a(c - this.long0)),
                (s = Math.sin(l)),
                (i = Math.cos(l)),
                (n = Math.cos(h)),
                (e = this.sin_p14 * s + this.cos_p14 * i * n) > 0 ||
                Math.abs(e) <= 1e-10
                  ? ((o = this.x0 + (1 * this.a * i * Math.sin(h)) / e),
                    (r =
                      this.y0 +
                      (1 * this.a * (this.cos_p14 * s - this.sin_p14 * i * n)) /
                        e))
                  : ((o = this.x0 + this.infinity_dist * i * Math.sin(h)),
                    (r =
                      this.y0 +
                      this.infinity_dist *
                        (this.cos_p14 * s - this.sin_p14 * i * n))),
                (t.x = o),
                (t.y = r),
                t
              );
            }),
            (i.inverse = function (t) {
              var s, i, n, e, o, r;
              return (
                (t.x = (t.x - this.x0) / this.a),
                (t.y = (t.y - this.y0) / this.a),
                (t.x /= this.k0),
                (t.y /= this.k0),
                (s = Math.sqrt(t.x * t.x + t.y * t.y))
                  ? ((e = Math.atan2(s, this.rc)),
                    (i = Math.sin(e)),
                    (n = Math.cos(e)),
                    (r = h(n * this.sin_p14 + (t.y * i * this.cos_p14) / s)),
                    (o = Math.atan2(
                      t.x * i,
                      s * this.cos_p14 * n - t.y * this.sin_p14 * i,
                    )),
                    (o = a(this.long0 + o)))
                  : ((r = this.phic0), (o = 0)),
                (t.x = o),
                (t.y = r),
                t
              );
            }),
            (i.names = ['gnom']);
        },
        { '../common/adjust_lon': 5, '../common/asinz': 6 },
      ],
      48: [
        function (t, s, i) {
          var a = t('../common/adjust_lon');
          (i.init = function () {
            (this.a = 6377397.155),
              (this.es = 0.006674372230614),
              (this.e = Math.sqrt(this.es)),
              this.lat0 || (this.lat0 = 0.863937979737193),
              this.long0 || (this.long0 = 0.4334234309119251),
              this.k0 || (this.k0 = 0.9999),
              (this.s45 = 0.785398163397448),
              (this.s90 = 2 * this.s45),
              (this.fi0 = this.lat0),
              (this.e2 = this.es),
              (this.e = Math.sqrt(this.e2)),
              (this.alfa = Math.sqrt(
                1 + (this.e2 * Math.pow(Math.cos(this.fi0), 4)) / (1 - this.e2),
              )),
              (this.uq = 1.04216856380474),
              (this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa)),
              (this.g = Math.pow(
                (1 + this.e * Math.sin(this.fi0)) /
                  (1 - this.e * Math.sin(this.fi0)),
                (this.alfa * this.e) / 2,
              )),
              (this.k =
                (Math.tan(this.u0 / 2 + this.s45) /
                  Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa)) *
                this.g),
              (this.k1 = this.k0),
              (this.n0 =
                (this.a * Math.sqrt(1 - this.e2)) /
                (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2))),
              (this.s0 = 1.37008346281555),
              (this.n = Math.sin(this.s0)),
              (this.ro0 = (this.k1 * this.n0) / Math.tan(this.s0)),
              (this.ad = this.s90 - this.uq);
          }),
            (i.forward = function (t) {
              var s,
                i,
                h,
                n,
                e,
                o,
                r,
                c = t.x,
                l = t.y,
                m = a(c - this.long0);
              return (
                (s = Math.pow(
                  (1 + this.e * Math.sin(l)) / (1 - this.e * Math.sin(l)),
                  (this.alfa * this.e) / 2,
                )),
                (i =
                  2 *
                  (Math.atan(
                    (this.k * Math.pow(Math.tan(l / 2 + this.s45), this.alfa)) /
                      s,
                  ) -
                    this.s45)),
                (h = -m * this.alfa),
                (n = Math.asin(
                  Math.cos(this.ad) * Math.sin(i) +
                    Math.sin(this.ad) * Math.cos(i) * Math.cos(h),
                )),
                (e = Math.asin((Math.cos(i) * Math.sin(h)) / Math.cos(n))),
                (o = this.n * e),
                (r =
                  (this.ro0 *
                    Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n)) /
                  Math.pow(Math.tan(n / 2 + this.s45), this.n)),
                (t.y = (r * Math.cos(o)) / 1),
                (t.x = (r * Math.sin(o)) / 1),
                this.czech || ((t.y *= -1), (t.x *= -1)),
                t
              );
            }),
            (i.inverse = function (t) {
              var s,
                i,
                a,
                h,
                n,
                e,
                o,
                r = t.x;
              (t.x = t.y),
                (t.y = r),
                this.czech || ((t.y *= -1), (t.x *= -1)),
                (n = Math.sqrt(t.x * t.x + t.y * t.y)),
                (h = Math.atan2(t.y, t.x) / Math.sin(this.s0)),
                (a =
                  2 *
                  (Math.atan(
                    Math.pow(this.ro0 / n, 1 / this.n) *
                      Math.tan(this.s0 / 2 + this.s45),
                  ) -
                    this.s45)),
                (s = Math.asin(
                  Math.cos(this.ad) * Math.sin(a) -
                    Math.sin(this.ad) * Math.cos(a) * Math.cos(h),
                )),
                (i = Math.asin((Math.cos(a) * Math.sin(h)) / Math.cos(s))),
                (t.x = this.long0 - i / this.alfa),
                (e = s),
                (o = 0);
              var c = 0;
              do {
                (t.y =
                  2 *
                  (Math.atan(
                    Math.pow(this.k, -1 / this.alfa) *
                      Math.pow(Math.tan(s / 2 + this.s45), 1 / this.alfa) *
                      Math.pow(
                        (1 + this.e * Math.sin(e)) / (1 - this.e * Math.sin(e)),
                        this.e / 2,
                      ),
                  ) -
                    this.s45)),
                  Math.abs(e - t.y) < 1e-10 && (o = 1),
                  (e = t.y),
                  (c += 1);
              } while (0 === o && c < 15);
              return c >= 15 ? null : t;
            }),
            (i.names = ['Krovak', 'krovak']);
        },
        { '../common/adjust_lon': 5 },
      ],
      49: [
        function (t, s, i) {
          var a = Math.PI / 2,
            h = Math.PI / 4,
            n = 1e-10,
            e = t('../common/qsfnz'),
            o = t('../common/adjust_lon');
          (i.S_POLE = 1),
            (i.N_POLE = 2),
            (i.EQUIT = 3),
            (i.OBLIQ = 4),
            (i.init = function () {
              var t,
                s = Math.abs(this.lat0);
              if (
                (Math.abs(s - a) < n
                  ? (this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE)
                  : Math.abs(s) < n
                  ? (this.mode = this.EQUIT)
                  : (this.mode = this.OBLIQ),
                this.es > 0)
              )
                switch (
                  ((this.qp = e(this.e, 1)),
                  (this.mmf = 0.5 / (1 - this.es)),
                  (this.apa = this.authset(this.es)),
                  this.mode)
                ) {
                  case this.N_POLE:
                  case this.S_POLE:
                    this.dd = 1;
                    break;
                  case this.EQUIT:
                    (this.rq = Math.sqrt(0.5 * this.qp)),
                      (this.dd = 1 / this.rq),
                      (this.xmf = 1),
                      (this.ymf = 0.5 * this.qp);
                    break;
                  case this.OBLIQ:
                    (this.rq = Math.sqrt(0.5 * this.qp)),
                      (t = Math.sin(this.lat0)),
                      (this.sinb1 = e(this.e, t) / this.qp),
                      (this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1)),
                      (this.dd =
                        Math.cos(this.lat0) /
                        (Math.sqrt(1 - this.es * t * t) *
                          this.rq *
                          this.cosb1)),
                      (this.ymf = (this.xmf = this.rq) / this.dd),
                      (this.xmf *= this.dd);
                }
              else
                this.mode === this.OBLIQ &&
                  ((this.sinph0 = Math.sin(this.lat0)),
                  (this.cosph0 = Math.cos(this.lat0)));
            }),
            (i.forward = function (t) {
              var s,
                i,
                r,
                c,
                l,
                m,
                u,
                M,
                f,
                p,
                d = t.x,
                _ = t.y;
              if (((d = o(d - this.long0)), this.sphere)) {
                if (
                  ((l = Math.sin(_)),
                  (p = Math.cos(_)),
                  (r = Math.cos(d)),
                  this.mode === this.OBLIQ || this.mode === this.EQUIT)
                ) {
                  if (
                    (i =
                      this.mode === this.EQUIT
                        ? 1 + p * r
                        : 1 + this.sinph0 * l + this.cosph0 * p * r) <= n
                  )
                    return null;
                  (s = (i = Math.sqrt(2 / i)) * p * Math.sin(d)),
                    (i *=
                      this.mode === this.EQUIT
                        ? l
                        : this.cosph0 * l - this.sinph0 * p * r);
                } else if (
                  this.mode === this.N_POLE ||
                  this.mode === this.S_POLE
                ) {
                  if (
                    (this.mode === this.N_POLE && (r = -r),
                    Math.abs(_ + this.phi0) < n)
                  )
                    return null;
                  (i = h - 0.5 * _),
                    (s =
                      (i =
                        2 *
                        (this.mode === this.S_POLE
                          ? Math.cos(i)
                          : Math.sin(i))) * Math.sin(d)),
                    (i *= r);
                }
              } else {
                switch (
                  ((u = 0),
                  (M = 0),
                  (f = 0),
                  (r = Math.cos(d)),
                  (c = Math.sin(d)),
                  (l = Math.sin(_)),
                  (m = e(this.e, l)),
                  (this.mode !== this.OBLIQ && this.mode !== this.EQUIT) ||
                    ((u = m / this.qp), (M = Math.sqrt(1 - u * u))),
                  this.mode)
                ) {
                  case this.OBLIQ:
                    f = 1 + this.sinb1 * u + this.cosb1 * M * r;
                    break;
                  case this.EQUIT:
                    f = 1 + M * r;
                    break;
                  case this.N_POLE:
                    (f = a + _), (m = this.qp - m);
                    break;
                  case this.S_POLE:
                    (f = _ - a), (m = this.qp + m);
                }
                if (Math.abs(f) < n) return null;
                switch (this.mode) {
                  case this.OBLIQ:
                  case this.EQUIT:
                    (f = Math.sqrt(2 / f)),
                      (i =
                        this.mode === this.OBLIQ
                          ? this.ymf * f * (this.cosb1 * u - this.sinb1 * M * r)
                          : (f = Math.sqrt(2 / (1 + M * r))) * u * this.ymf),
                      (s = this.xmf * f * M * c);
                    break;
                  case this.N_POLE:
                  case this.S_POLE:
                    m >= 0
                      ? ((s = (f = Math.sqrt(m)) * c),
                        (i = r * (this.mode === this.S_POLE ? f : -f)))
                      : (s = i = 0);
                }
              }
              return (
                (t.x = this.a * s + this.x0), (t.y = this.a * i + this.y0), t
              );
            }),
            (i.inverse = function (t) {
              (t.x -= this.x0), (t.y -= this.y0);
              var s,
                i,
                h,
                e,
                r,
                c,
                l,
                m = t.x / this.a,
                u = t.y / this.a;
              if (this.sphere) {
                var M,
                  f = 0,
                  p = 0;
                if ((i = 0.5 * (M = Math.sqrt(m * m + u * u))) > 1) return null;
                switch (
                  ((i = 2 * Math.asin(i)),
                  (this.mode !== this.OBLIQ && this.mode !== this.EQUIT) ||
                    ((p = Math.sin(i)), (f = Math.cos(i))),
                  this.mode)
                ) {
                  case this.EQUIT:
                    (i = Math.abs(M) <= n ? 0 : Math.asin((u * p) / M)),
                      (m *= p),
                      (u = f * M);
                    break;
                  case this.OBLIQ:
                    (i =
                      Math.abs(M) <= n
                        ? this.phi0
                        : Math.asin(
                            f * this.sinph0 + (u * p * this.cosph0) / M,
                          )),
                      (m *= p * this.cosph0),
                      (u = (f - Math.sin(i) * this.sinph0) * M);
                    break;
                  case this.N_POLE:
                    (u = -u), (i = a - i);
                    break;
                  case this.S_POLE:
                    i -= a;
                }
                s =
                  0 !== u ||
                  (this.mode !== this.EQUIT && this.mode !== this.OBLIQ)
                    ? Math.atan2(m, u)
                    : 0;
              } else {
                if (
                  ((l = 0),
                  this.mode === this.OBLIQ || this.mode === this.EQUIT)
                ) {
                  if (
                    ((m /= this.dd),
                    (u *= this.dd),
                    (c = Math.sqrt(m * m + u * u)) < n)
                  )
                    return (t.x = 0), (t.y = this.phi0), t;
                  (e = 2 * Math.asin((0.5 * c) / this.rq)),
                    (h = Math.cos(e)),
                    (m *= e = Math.sin(e)),
                    this.mode === this.OBLIQ
                      ? ((l = h * this.sinb1 + (u * e * this.cosb1) / c),
                        (r = this.qp * l),
                        (u = c * this.cosb1 * h - u * this.sinb1 * e))
                      : ((l = (u * e) / c), (r = this.qp * l), (u = c * h));
                } else if (
                  this.mode === this.N_POLE ||
                  this.mode === this.S_POLE
                ) {
                  if (
                    (this.mode === this.N_POLE && (u = -u),
                    !(r = m * m + u * u))
                  )
                    return (t.x = 0), (t.y = this.phi0), t;
                  (l = 1 - r / this.qp), this.mode === this.S_POLE && (l = -l);
                }
                (s = Math.atan2(m, u)),
                  (i = this.authlat(Math.asin(l), this.apa));
              }
              return (t.x = o(this.long0 + s)), (t.y = i), t;
            }),
            (i.P00 = 0.3333333333333333),
            (i.P01 = 0.17222222222222222),
            (i.P02 = 0.10257936507936508),
            (i.P10 = 0.06388888888888888),
            (i.P11 = 0.0664021164021164),
            (i.P20 = 0.016415012942191543),
            (i.authset = function (t) {
              var s,
                i = [];
              return (
                (i[0] = t * this.P00),
                (s = t * t),
                (i[0] += s * this.P01),
                (i[1] = s * this.P10),
                (s *= t),
                (i[0] += s * this.P02),
                (i[1] += s * this.P11),
                (i[2] = s * this.P20),
                i
              );
            }),
            (i.authlat = function (t, s) {
              var i = t + t;
              return (
                t +
                s[0] * Math.sin(i) +
                s[1] * Math.sin(i + i) +
                s[2] * Math.sin(i + i + i)
              );
            }),
            (i.names = [
              'Lambert Azimuthal Equal Area',
              'Lambert_Azimuthal_Equal_Area',
              'laea',
            ]);
        },
        { '../common/adjust_lon': 5, '../common/qsfnz': 20 },
      ],
      50: [
        function (t, s, i) {
          var a = 1e-10,
            h = t('../common/msfnz'),
            n = t('../common/tsfnz'),
            e = Math.PI / 2,
            o = t('../common/sign'),
            r = t('../common/adjust_lon'),
            c = t('../common/phi2z');
          (i.init = function () {
            if (
              (this.lat2 || (this.lat2 = this.lat1),
              this.k0 || (this.k0 = 1),
              (this.x0 = this.x0 || 0),
              (this.y0 = this.y0 || 0),
              !(Math.abs(this.lat1 + this.lat2) < a))
            ) {
              var t = this.b / this.a;
              this.e = Math.sqrt(1 - t * t);
              var s = Math.sin(this.lat1),
                i = Math.cos(this.lat1),
                e = h(this.e, s, i),
                o = n(this.e, this.lat1, s),
                r = Math.sin(this.lat2),
                c = Math.cos(this.lat2),
                l = h(this.e, r, c),
                m = n(this.e, this.lat2, r),
                u = n(this.e, this.lat0, Math.sin(this.lat0));
              Math.abs(this.lat1 - this.lat2) > a
                ? (this.ns = Math.log(e / l) / Math.log(o / m))
                : (this.ns = s),
                isNaN(this.ns) && (this.ns = s),
                (this.f0 = e / (this.ns * Math.pow(o, this.ns))),
                (this.rh = this.a * this.f0 * Math.pow(u, this.ns)),
                this.title || (this.title = 'Lambert Conformal Conic');
            }
          }),
            (i.forward = function (t) {
              var s = t.x,
                i = t.y;
              Math.abs(2 * Math.abs(i) - Math.PI) <= a &&
                (i = o(i) * (e - 2e-10));
              var h,
                c,
                l = Math.abs(Math.abs(i) - e);
              if (l > a)
                (h = n(this.e, i, Math.sin(i))),
                  (c = this.a * this.f0 * Math.pow(h, this.ns));
              else {
                if ((l = i * this.ns) <= 0) return null;
                c = 0;
              }
              var m = this.ns * r(s - this.long0);
              return (
                (t.x = this.k0 * (c * Math.sin(m)) + this.x0),
                (t.y = this.k0 * (this.rh - c * Math.cos(m)) + this.y0),
                t
              );
            }),
            (i.inverse = function (t) {
              var s,
                i,
                a,
                h,
                n,
                o = (t.x - this.x0) / this.k0,
                l = this.rh - (t.y - this.y0) / this.k0;
              this.ns > 0
                ? ((s = Math.sqrt(o * o + l * l)), (i = 1))
                : ((s = -Math.sqrt(o * o + l * l)), (i = -1));
              var m = 0;
              if (
                (0 !== s && (m = Math.atan2(i * o, i * l)),
                0 !== s || this.ns > 0)
              ) {
                if (
                  ((i = 1 / this.ns),
                  (a = Math.pow(s / (this.a * this.f0), i)),
                  -9999 === (h = c(this.e, a)))
                )
                  return null;
              } else h = -e;
              return (n = r(m / this.ns + this.long0)), (t.x = n), (t.y = h), t;
            }),
            (i.names = [
              'Lambert Tangential Conformal Conic Projection',
              'Lambert_Conformal_Conic',
              'Lambert_Conformal_Conic_2SP',
              'lcc',
            ]);
        },
        {
          '../common/adjust_lon': 5,
          '../common/msfnz': 15,
          '../common/phi2z': 16,
          '../common/sign': 21,
          '../common/tsfnz': 24,
        },
      ],
      51: [
        function (t, s, i) {
          function a(t) {
            return t;
          }
          (i.init = function () {}),
            (i.forward = a),
            (i.inverse = a),
            (i.names = ['longlat', 'identity']);
        },
        {},
      ],
      52: [
        function (t, s, i) {
          var a = t('../common/msfnz'),
            h = Math.PI / 2,
            n = 57.29577951308232,
            e = t('../common/adjust_lon'),
            o = Math.PI / 4,
            r = t('../common/tsfnz'),
            c = t('../common/phi2z');
          (i.init = function () {
            var t = this.b / this.a;
            (this.es = 1 - t * t),
              'x0' in this || (this.x0 = 0),
              'y0' in this || (this.y0 = 0),
              (this.e = Math.sqrt(this.es)),
              this.lat_ts
                ? this.sphere
                  ? (this.k0 = Math.cos(this.lat_ts))
                  : (this.k0 = a(
                      this.e,
                      Math.sin(this.lat_ts),
                      Math.cos(this.lat_ts),
                    ))
                : this.k0 || (this.k ? (this.k0 = this.k) : (this.k0 = 1));
          }),
            (i.forward = function (t) {
              var s,
                i,
                a = t.x,
                c = t.y;
              if (c * n > 90 && c * n < -90 && a * n > 180 && a * n < -180)
                return null;
              if (Math.abs(Math.abs(c) - h) <= 1e-10) return null;
              if (this.sphere)
                (s = this.x0 + this.a * this.k0 * e(a - this.long0)),
                  (i =
                    this.y0 +
                    this.a * this.k0 * Math.log(Math.tan(o + 0.5 * c)));
              else {
                var l = Math.sin(c),
                  m = r(this.e, c, l);
                (s = this.x0 + this.a * this.k0 * e(a - this.long0)),
                  (i = this.y0 - this.a * this.k0 * Math.log(m));
              }
              return (t.x = s), (t.y = i), t;
            }),
            (i.inverse = function (t) {
              var s,
                i,
                a = t.x - this.x0,
                n = t.y - this.y0;
              if (this.sphere)
                i = h - 2 * Math.atan(Math.exp(-n / (this.a * this.k0)));
              else {
                var o = Math.exp(-n / (this.a * this.k0));
                if (-9999 === (i = c(this.e, o))) return null;
              }
              return (
                (s = e(this.long0 + a / (this.a * this.k0))),
                (t.x = s),
                (t.y = i),
                t
              );
            }),
            (i.names = [
              'Mercator',
              'Popular Visualisation Pseudo Mercator',
              'Mercator_1SP',
              'Mercator_Auxiliary_Sphere',
              'merc',
            ]);
        },
        {
          '../common/adjust_lon': 5,
          '../common/msfnz': 15,
          '../common/phi2z': 16,
          '../common/tsfnz': 24,
        },
      ],
      53: [
        function (t, s, i) {
          var a = t('../common/adjust_lon');
          (i.init = function () {}),
            (i.forward = function (t) {
              var s = t.x,
                i = t.y,
                h = a(s - this.long0),
                n = this.x0 + this.a * h,
                e =
                  this.y0 +
                  this.a * Math.log(Math.tan(Math.PI / 4 + i / 2.5)) * 1.25;
              return (t.x = n), (t.y = e), t;
            }),
            (i.inverse = function (t) {
              (t.x -= this.x0), (t.y -= this.y0);
              var s = a(this.long0 + t.x / this.a),
                i =
                  2.5 *
                  (Math.atan(Math.exp((0.8 * t.y) / this.a)) - Math.PI / 4);
              return (t.x = s), (t.y = i), t;
            }),
            (i.names = ['Miller_Cylindrical', 'mill']);
        },
        { '../common/adjust_lon': 5 },
      ],
      54: [
        function (t, s, i) {
          var a = t('../common/adjust_lon');
          (i.init = function () {}),
            (i.forward = function (t) {
              for (
                var s = t.x,
                  i = t.y,
                  h = a(s - this.long0),
                  n = i,
                  e = Math.PI * Math.sin(i),
                  o = 0;
                ;
                o++
              ) {
                var r = -(n + Math.sin(n) - e) / (1 + Math.cos(n));
                if (((n += r), Math.abs(r) < 1e-10)) break;
              }
              (n /= 2), Math.PI / 2 - Math.abs(i) < 1e-10 && (h = 0);
              var c = 0.900316316158 * this.a * h * Math.cos(n) + this.x0,
                l = 1.4142135623731 * this.a * Math.sin(n) + this.y0;
              return (t.x = c), (t.y = l), t;
            }),
            (i.inverse = function (t) {
              var s, i;
              (t.x -= this.x0),
                (t.y -= this.y0),
                (i = t.y / (1.4142135623731 * this.a)),
                Math.abs(i) > 0.999999999999 && (i = 0.999999999999),
                (s = Math.asin(i));
              var h = a(
                this.long0 + t.x / (0.900316316158 * this.a * Math.cos(s)),
              );
              h < -Math.PI && (h = -Math.PI),
                h > Math.PI && (h = Math.PI),
                (i = (2 * s + Math.sin(2 * s)) / Math.PI),
                Math.abs(i) > 1 && (i = 1);
              var n = Math.asin(i);
              return (t.x = h), (t.y = n), t;
            }),
            (i.names = ['Mollweide', 'moll']);
        },
        { '../common/adjust_lon': 5 },
      ],
      55: [
        function (t, s, i) {
          var a = 484813681109536e-20;
          (i.iterations = 1),
            (i.init = function () {
              (this.A = []),
                (this.A[1] = 0.6399175073),
                (this.A[2] = -0.1358797613),
                (this.A[3] = 0.063294409),
                (this.A[4] = -0.02526853),
                (this.A[5] = 0.0117879),
                (this.A[6] = -0.0055161),
                (this.A[7] = 0.0026906),
                (this.A[8] = -0.001333),
                (this.A[9] = 67e-5),
                (this.A[10] = -34e-5),
                (this.B_re = []),
                (this.B_im = []),
                (this.B_re[1] = 0.7557853228),
                (this.B_im[1] = 0),
                (this.B_re[2] = 0.249204646),
                (this.B_im[2] = 0.003371507),
                (this.B_re[3] = -0.001541739),
                (this.B_im[3] = 0.04105856),
                (this.B_re[4] = -0.10162907),
                (this.B_im[4] = 0.01727609),
                (this.B_re[5] = -0.26623489),
                (this.B_im[5] = -0.36249218),
                (this.B_re[6] = -0.6870983),
                (this.B_im[6] = -1.1651967),
                (this.C_re = []),
                (this.C_im = []),
                (this.C_re[1] = 1.3231270439),
                (this.C_im[1] = 0),
                (this.C_re[2] = -0.577245789),
                (this.C_im[2] = -0.007809598),
                (this.C_re[3] = 0.508307513),
                (this.C_im[3] = -0.112208952),
                (this.C_re[4] = -0.15094762),
                (this.C_im[4] = 0.18200602),
                (this.C_re[5] = 1.01418179),
                (this.C_im[5] = 1.64497696),
                (this.C_re[6] = 1.9660549),
                (this.C_im[6] = 2.5127645),
                (this.D = []),
                (this.D[1] = 1.5627014243),
                (this.D[2] = 0.5185406398),
                (this.D[3] = -0.03333098),
                (this.D[4] = -0.1052906),
                (this.D[5] = -0.0368594),
                (this.D[6] = 0.007317),
                (this.D[7] = 0.0122),
                (this.D[8] = 0.00394),
                (this.D[9] = -0.0013);
            }),
            (i.forward = function (t) {
              var s,
                i = t.x,
                h = t.y - this.lat0,
                n = i - this.long0,
                e = (h / a) * 1e-5,
                o = n,
                r = 1,
                c = 0;
              for (s = 1; s <= 10; s++) (r *= e), (c += this.A[s] * r);
              var l,
                m = c,
                u = o,
                M = 1,
                f = 0,
                p = 0,
                d = 0;
              for (s = 1; s <= 6; s++)
                (l = f * m + M * u),
                  (M = M * m - f * u),
                  (f = l),
                  (p = p + this.B_re[s] * M - this.B_im[s] * f),
                  (d = d + this.B_im[s] * M + this.B_re[s] * f);
              return (
                (t.x = d * this.a + this.x0), (t.y = p * this.a + this.y0), t
              );
            }),
            (i.inverse = function (t) {
              var s,
                i,
                h = t.x,
                n = t.y,
                e = h - this.x0,
                o = (n - this.y0) / this.a,
                r = e / this.a,
                c = 1,
                l = 0,
                m = 0,
                u = 0;
              for (s = 1; s <= 6; s++)
                (i = l * o + c * r),
                  (c = c * o - l * r),
                  (l = i),
                  (m = m + this.C_re[s] * c - this.C_im[s] * l),
                  (u = u + this.C_im[s] * c + this.C_re[s] * l);
              for (var M = 0; M < this.iterations; M++) {
                var f,
                  p = m,
                  d = u,
                  _ = o,
                  y = r;
                for (s = 2; s <= 6; s++)
                  (f = d * m + p * u),
                    (p = p * m - d * u),
                    (d = f),
                    (_ += (s - 1) * (this.B_re[s] * p - this.B_im[s] * d)),
                    (y += (s - 1) * (this.B_im[s] * p + this.B_re[s] * d));
                (p = 1), (d = 0);
                var g = this.B_re[1],
                  x = this.B_im[1];
                for (s = 2; s <= 6; s++)
                  (f = d * m + p * u),
                    (p = p * m - d * u),
                    (d = f),
                    (g += s * (this.B_re[s] * p - this.B_im[s] * d)),
                    (x += s * (this.B_im[s] * p + this.B_re[s] * d));
                var b = g * g + x * x;
                (m = (_ * g + y * x) / b), (u = (y * g - _ * x) / b);
              }
              var v = m,
                w = u,
                P = 1,
                j = 0;
              for (s = 1; s <= 9; s++) (P *= v), (j += this.D[s] * P);
              var C = this.lat0 + j * a * 1e5,
                S = this.long0 + w;
              return (t.x = S), (t.y = C), t;
            }),
            (i.names = ['New_Zealand_Map_Grid', 'nzmg']);
        },
        {},
      ],
      56: [
        function (t, s, i) {
          var a = t('../common/tsfnz'),
            h = t('../common/adjust_lon'),
            n = t('../common/phi2z'),
            e = Math.PI / 2,
            o = Math.PI / 4,
            r = 1e-10;
          (i.init = function () {
            (this.no_off = this.no_off || !1),
              (this.no_rot = this.no_rot || !1),
              isNaN(this.k0) && (this.k0 = 1);
            var t = Math.sin(this.lat0),
              s = Math.cos(this.lat0),
              i = this.e * t;
            (this.bl = Math.sqrt(
              1 + (this.es / (1 - this.es)) * Math.pow(s, 4),
            )),
              (this.al =
                (this.a * this.bl * this.k0 * Math.sqrt(1 - this.es)) /
                (1 - i * i));
            var n,
              e,
              o = a(this.e, this.lat0, t),
              r = (this.bl / s) * Math.sqrt((1 - this.es) / (1 - i * i));
            if ((r * r < 1 && (r = 1), isNaN(this.longc))) {
              var c = a(this.e, this.lat1, Math.sin(this.lat1)),
                l = a(this.e, this.lat2, Math.sin(this.lat2));
              this.lat0 >= 0
                ? (this.el = (r + Math.sqrt(r * r - 1)) * Math.pow(o, this.bl))
                : (this.el = (r - Math.sqrt(r * r - 1)) * Math.pow(o, this.bl));
              var m = Math.pow(c, this.bl),
                u = Math.pow(l, this.bl);
              e = 0.5 * ((n = this.el / m) - 1 / n);
              var M = (this.el * this.el - u * m) / (this.el * this.el + u * m),
                f = (u - m) / (u + m),
                p = h(this.long1 - this.long2);
              (this.long0 =
                0.5 * (this.long1 + this.long2) -
                Math.atan((M * Math.tan(0.5 * this.bl * p)) / f) / this.bl),
                (this.long0 = h(this.long0));
              var d = h(this.long1 - this.long0);
              (this.gamma0 = Math.atan(Math.sin(this.bl * d) / e)),
                (this.alpha = Math.asin(r * Math.sin(this.gamma0)));
            } else
              (n =
                this.lat0 >= 0
                  ? r + Math.sqrt(r * r - 1)
                  : r - Math.sqrt(r * r - 1)),
                (this.el = n * Math.pow(o, this.bl)),
                (e = 0.5 * (n - 1 / n)),
                (this.gamma0 = Math.asin(Math.sin(this.alpha) / r)),
                (this.long0 =
                  this.longc - Math.asin(e * Math.tan(this.gamma0)) / this.bl);
            this.no_off
              ? (this.uc = 0)
              : this.lat0 >= 0
              ? (this.uc =
                  (this.al / this.bl) *
                  Math.atan2(Math.sqrt(r * r - 1), Math.cos(this.alpha)))
              : (this.uc =
                  ((-1 * this.al) / this.bl) *
                  Math.atan2(Math.sqrt(r * r - 1), Math.cos(this.alpha)));
          }),
            (i.forward = function (t) {
              var s,
                i,
                n,
                c = t.x,
                l = t.y,
                m = h(c - this.long0);
              if (Math.abs(Math.abs(l) - e) <= r)
                (n = l > 0 ? -1 : 1),
                  (i =
                    (this.al / this.bl) *
                    Math.log(Math.tan(o + n * this.gamma0 * 0.5))),
                  (s = (-1 * n * e * this.al) / this.bl);
              else {
                var u = a(this.e, l, Math.sin(l)),
                  M = this.el / Math.pow(u, this.bl),
                  f = 0.5 * (M - 1 / M),
                  p = 0.5 * (M + 1 / M),
                  d = Math.sin(this.bl * m),
                  _ =
                    (f * Math.sin(this.gamma0) - d * Math.cos(this.gamma0)) / p;
                (i =
                  Math.abs(Math.abs(_) - 1) <= r
                    ? Number.POSITIVE_INFINITY
                    : (0.5 * this.al * Math.log((1 - _) / (1 + _))) / this.bl),
                  (s =
                    Math.abs(Math.cos(this.bl * m)) <= r
                      ? this.al * this.bl * m
                      : (this.al *
                          Math.atan2(
                            f * Math.cos(this.gamma0) +
                              d * Math.sin(this.gamma0),
                            Math.cos(this.bl * m),
                          )) /
                        this.bl);
              }
              return (
                this.no_rot
                  ? ((t.x = this.x0 + s), (t.y = this.y0 + i))
                  : ((s -= this.uc),
                    (t.x =
                      this.x0 +
                      i * Math.cos(this.alpha) +
                      s * Math.sin(this.alpha)),
                    (t.y =
                      this.y0 +
                      s * Math.cos(this.alpha) -
                      i * Math.sin(this.alpha))),
                t
              );
            }),
            (i.inverse = function (t) {
              var s, i;
              this.no_rot
                ? ((i = t.y - this.y0), (s = t.x - this.x0))
                : ((i =
                    (t.x - this.x0) * Math.cos(this.alpha) -
                    (t.y - this.y0) * Math.sin(this.alpha)),
                  (s =
                    (t.y - this.y0) * Math.cos(this.alpha) +
                    (t.x - this.x0) * Math.sin(this.alpha)),
                  (s += this.uc));
              var a = Math.exp((-1 * this.bl * i) / this.al),
                o = 0.5 * (a - 1 / a),
                c = 0.5 * (a + 1 / a),
                l = Math.sin((this.bl * s) / this.al),
                m = (l * Math.cos(this.gamma0) + o * Math.sin(this.gamma0)) / c,
                u = Math.pow(
                  this.el / Math.sqrt((1 + m) / (1 - m)),
                  1 / this.bl,
                );
              return (
                Math.abs(m - 1) < r
                  ? ((t.x = this.long0), (t.y = e))
                  : Math.abs(m + 1) < r
                  ? ((t.x = this.long0), (t.y = -1 * e))
                  : ((t.y = n(this.e, u)),
                    (t.x = h(
                      this.long0 -
                        Math.atan2(
                          o * Math.cos(this.gamma0) - l * Math.sin(this.gamma0),
                          Math.cos((this.bl * s) / this.al),
                        ) /
                          this.bl,
                    ))),
                t
              );
            }),
            (i.names = [
              'Hotine_Oblique_Mercator',
              'Hotine Oblique Mercator',
              'Hotine_Oblique_Mercator_Azimuth_Natural_Origin',
              'Hotine_Oblique_Mercator_Azimuth_Center',
              'omerc',
            ]);
        },
        {
          '../common/adjust_lon': 5,
          '../common/phi2z': 16,
          '../common/tsfnz': 24,
        },
      ],
      57: [
        function (t, s, i) {
          var a = t('../common/e0fn'),
            h = t('../common/e1fn'),
            n = t('../common/e2fn'),
            e = t('../common/e3fn'),
            o = t('../common/adjust_lon'),
            r = t('../common/adjust_lat'),
            c = t('../common/mlfn'),
            l = 1e-10,
            m = t('../common/gN');
          (i.init = function () {
            (this.temp = this.b / this.a),
              (this.es = 1 - Math.pow(this.temp, 2)),
              (this.e = Math.sqrt(this.es)),
              (this.e0 = a(this.es)),
              (this.e1 = h(this.es)),
              (this.e2 = n(this.es)),
              (this.e3 = e(this.es)),
              (this.ml0 =
                this.a * c(this.e0, this.e1, this.e2, this.e3, this.lat0));
          }),
            (i.forward = function (t) {
              var s,
                i,
                a,
                h = t.x,
                n = t.y,
                e = o(h - this.long0);
              if (((a = e * Math.sin(n)), this.sphere))
                Math.abs(n) <= l
                  ? ((s = this.a * e), (i = -1 * this.a * this.lat0))
                  : ((s = (this.a * Math.sin(a)) / Math.tan(n)),
                    (i =
                      this.a *
                      (r(n - this.lat0) + (1 - Math.cos(a)) / Math.tan(n))));
              else if (Math.abs(n) <= l) (s = this.a * e), (i = -1 * this.ml0);
              else {
                var u = m(this.a, this.e, Math.sin(n)) / Math.tan(n);
                (s = u * Math.sin(a)),
                  (i =
                    this.a * c(this.e0, this.e1, this.e2, this.e3, n) -
                    this.ml0 +
                    u * (1 - Math.cos(a)));
              }
              return (t.x = s + this.x0), (t.y = i + this.y0), t;
            }),
            (i.inverse = function (t) {
              var s, i, a, h, n, e, r, m, u;
              if (((a = t.x - this.x0), (h = t.y - this.y0), this.sphere))
                if (Math.abs(h + this.a * this.lat0) <= l)
                  (s = o(a / this.a + this.long0)), (i = 0);
                else {
                  var M;
                  for (
                    e = this.lat0 + h / this.a,
                      r = (a * a) / this.a / this.a + e * e,
                      m = e,
                      n = 20;
                    n;
                    --n
                  )
                    if (
                      ((m += u =
                        (-1 *
                          (e * (m * (M = Math.tan(m)) + 1) -
                            m -
                            0.5 * (m * m + r) * M)) /
                        ((m - e) / M - 1)),
                      Math.abs(u) <= l)
                    ) {
                      i = m;
                      break;
                    }
                  s = o(
                    this.long0 +
                      Math.asin((a * Math.tan(m)) / this.a) / Math.sin(i),
                  );
                }
              else if (Math.abs(h + this.ml0) <= l)
                (i = 0), (s = o(this.long0 + a / this.a));
              else {
                var f, p, d, _, y;
                for (
                  e = (this.ml0 + h) / this.a,
                    r = (a * a) / this.a / this.a + e * e,
                    m = e,
                    n = 20;
                  n;
                  --n
                )
                  if (
                    ((y = this.e * Math.sin(m)),
                    (f = Math.sqrt(1 - y * y) * Math.tan(m)),
                    (p = this.a * c(this.e0, this.e1, this.e2, this.e3, m)),
                    (d =
                      this.e0 -
                      2 * this.e1 * Math.cos(2 * m) +
                      4 * this.e2 * Math.cos(4 * m) -
                      6 * this.e3 * Math.cos(6 * m)),
                    (m -= u =
                      (e * (f * (_ = p / this.a) + 1) -
                        _ -
                        0.5 * f * (_ * _ + r)) /
                      ((this.es * Math.sin(2 * m) * (_ * _ + r - 2 * e * _)) /
                        (4 * f) +
                        (e - _) * (f * d - 2 / Math.sin(2 * m)) -
                        d)),
                    Math.abs(u) <= l)
                  ) {
                    i = m;
                    break;
                  }
                (f =
                  Math.sqrt(1 - this.es * Math.pow(Math.sin(i), 2)) *
                  Math.tan(i)),
                  (s = o(
                    this.long0 + Math.asin((a * f) / this.a) / Math.sin(i),
                  ));
              }
              return (t.x = s), (t.y = i), t;
            }),
            (i.names = ['Polyconic', 'poly']);
        },
        {
          '../common/adjust_lat': 4,
          '../common/adjust_lon': 5,
          '../common/e0fn': 7,
          '../common/e1fn': 8,
          '../common/e2fn': 9,
          '../common/e3fn': 10,
          '../common/gN': 11,
          '../common/mlfn': 14,
        },
      ],
      58: [
        function (t, s, i) {
          var a = t('../common/adjust_lon'),
            h = t('../common/adjust_lat'),
            n = t('../common/pj_enfn'),
            e = t('../common/pj_mlfn'),
            o = t('../common/pj_inv_mlfn'),
            r = Math.PI / 2,
            c = t('../common/asinz');
          (i.init = function () {
            this.sphere
              ? ((this.n = 1),
                (this.m = 0),
                (this.es = 0),
                (this.C_y = Math.sqrt((this.m + 1) / this.n)),
                (this.C_x = this.C_y / (this.m + 1)))
              : (this.en = n(this.es));
          }),
            (i.forward = function (t) {
              var s,
                i,
                h = t.x,
                n = t.y;
              if (((h = a(h - this.long0)), this.sphere)) {
                if (this.m)
                  for (var o = this.n * Math.sin(n), r = 20; r; --r) {
                    var c =
                      (this.m * n + Math.sin(n) - o) / (this.m + Math.cos(n));
                    if (((n -= c), Math.abs(c) < 1e-10)) break;
                  }
                else n = 1 !== this.n ? Math.asin(this.n * Math.sin(n)) : n;
                (s = this.a * this.C_x * h * (this.m + Math.cos(n))),
                  (i = this.a * this.C_y * n);
              } else {
                var l = Math.sin(n),
                  m = Math.cos(n);
                (i = this.a * e(n, l, m, this.en)),
                  (s = (this.a * h * m) / Math.sqrt(1 - this.es * l * l));
              }
              return (t.x = s), (t.y = i), t;
            }),
            (i.inverse = function (t) {
              var s, i, n, e;
              return (
                (t.x -= this.x0),
                (n = t.x / this.a),
                (t.y -= this.y0),
                (s = t.y / this.a),
                this.sphere
                  ? ((s /= this.C_y),
                    (n /= this.C_x * (this.m + Math.cos(s))),
                    this.m
                      ? (s = c((this.m * s + Math.sin(s)) / this.n))
                      : 1 !== this.n && (s = c(Math.sin(s) / this.n)),
                    (n = a(n + this.long0)),
                    (s = h(s)))
                  : ((s = o(t.y / this.a, this.es, this.en)),
                    (e = Math.abs(s)) < r
                      ? ((e = Math.sin(s)),
                        (i =
                          this.long0 +
                          (t.x * Math.sqrt(1 - this.es * e * e)) /
                            (this.a * Math.cos(s))),
                        (n = a(i)))
                      : e - 1e-10 < r && (n = this.long0)),
                (t.x = n),
                (t.y = s),
                t
              );
            }),
            (i.names = ['Sinusoidal', 'sinu']);
        },
        {
          '../common/adjust_lat': 4,
          '../common/adjust_lon': 5,
          '../common/asinz': 6,
          '../common/pj_enfn': 17,
          '../common/pj_inv_mlfn': 18,
          '../common/pj_mlfn': 19,
        },
      ],
      59: [
        function (t, s, i) {
          (i.init = function () {
            var t = this.lat0;
            this.lambda0 = this.long0;
            var s = Math.sin(t),
              i = this.a,
              a = 1 / this.rf,
              h = 2 * a - Math.pow(a, 2),
              n = (this.e = Math.sqrt(h));
            (this.R =
              (this.k0 * i * Math.sqrt(1 - h)) / (1 - h * Math.pow(s, 2))),
              (this.alpha = Math.sqrt(
                1 + (h / (1 - h)) * Math.pow(Math.cos(t), 4),
              )),
              (this.b0 = Math.asin(s / this.alpha));
            var e = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)),
              o = Math.log(Math.tan(Math.PI / 4 + t / 2)),
              r = Math.log((1 + n * s) / (1 - n * s));
            this.K = e - this.alpha * o + ((this.alpha * n) / 2) * r;
          }),
            (i.forward = function (t) {
              var s = Math.log(Math.tan(Math.PI / 4 - t.y / 2)),
                i =
                  (this.e / 2) *
                  Math.log(
                    (1 + this.e * Math.sin(t.y)) / (1 - this.e * Math.sin(t.y)),
                  ),
                a = -this.alpha * (s + i) + this.K,
                h = 2 * (Math.atan(Math.exp(a)) - Math.PI / 4),
                n = this.alpha * (t.x - this.lambda0),
                e = Math.atan(
                  Math.sin(n) /
                    (Math.sin(this.b0) * Math.tan(h) +
                      Math.cos(this.b0) * Math.cos(n)),
                ),
                o = Math.asin(
                  Math.cos(this.b0) * Math.sin(h) -
                    Math.sin(this.b0) * Math.cos(h) * Math.cos(n),
                );
              return (
                (t.y =
                  (this.R / 2) *
                    Math.log((1 + Math.sin(o)) / (1 - Math.sin(o))) +
                  this.y0),
                (t.x = this.R * e + this.x0),
                t
              );
            }),
            (i.inverse = function (t) {
              for (
                var s = t.x - this.x0,
                  i = t.y - this.y0,
                  a = s / this.R,
                  h = 2 * (Math.atan(Math.exp(i / this.R)) - Math.PI / 4),
                  n = Math.asin(
                    Math.cos(this.b0) * Math.sin(h) +
                      Math.sin(this.b0) * Math.cos(h) * Math.cos(a),
                  ),
                  e = Math.atan(
                    Math.sin(a) /
                      (Math.cos(this.b0) * Math.cos(a) -
                        Math.sin(this.b0) * Math.tan(h)),
                  ),
                  o = this.lambda0 + e / this.alpha,
                  r = 0,
                  c = n,
                  l = -1e3,
                  m = 0;
                Math.abs(c - l) > 1e-7;

              ) {
                if (++m > 20) return;
                (r =
                  (1 / this.alpha) *
                    (Math.log(Math.tan(Math.PI / 4 + n / 2)) - this.K) +
                  this.e *
                    Math.log(
                      Math.tan(
                        Math.PI / 4 + Math.asin(this.e * Math.sin(c)) / 2,
                      ),
                    )),
                  (l = c),
                  (c = 2 * Math.atan(Math.exp(r)) - Math.PI / 2);
              }
              return (t.x = o), (t.y = c), t;
            }),
            (i.names = ['somerc']);
        },
        {},
      ],
      60: [
        function (t, s, i) {
          var a = Math.PI / 2,
            h = 1e-10,
            n = t('../common/sign'),
            e = t('../common/msfnz'),
            o = t('../common/tsfnz'),
            r = t('../common/phi2z'),
            c = t('../common/adjust_lon');
          (i.ssfn_ = function (t, s, i) {
            return (
              (s *= i),
              Math.tan(0.5 * (a + t)) * Math.pow((1 - s) / (1 + s), 0.5 * i)
            );
          }),
            (i.init = function () {
              (this.coslat0 = Math.cos(this.lat0)),
                (this.sinlat0 = Math.sin(this.lat0)),
                this.sphere
                  ? 1 === this.k0 &&
                    !isNaN(this.lat_ts) &&
                    Math.abs(this.coslat0) <= h &&
                    (this.k0 = 0.5 * (1 + n(this.lat0) * Math.sin(this.lat_ts)))
                  : (Math.abs(this.coslat0) <= h &&
                      (this.lat0 > 0 ? (this.con = 1) : (this.con = -1)),
                    (this.cons = Math.sqrt(
                      Math.pow(1 + this.e, 1 + this.e) *
                        Math.pow(1 - this.e, 1 - this.e),
                    )),
                    1 === this.k0 &&
                      !isNaN(this.lat_ts) &&
                      Math.abs(this.coslat0) <= h &&
                      (this.k0 =
                        (0.5 *
                          this.cons *
                          e(
                            this.e,
                            Math.sin(this.lat_ts),
                            Math.cos(this.lat_ts),
                          )) /
                        o(
                          this.e,
                          this.con * this.lat_ts,
                          this.con * Math.sin(this.lat_ts),
                        )),
                    (this.ms1 = e(this.e, this.sinlat0, this.coslat0)),
                    (this.X0 =
                      2 *
                        Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) -
                      a),
                    (this.cosX0 = Math.cos(this.X0)),
                    (this.sinX0 = Math.sin(this.X0)));
            }),
            (i.forward = function (t) {
              var s,
                i,
                n,
                e,
                r,
                l,
                m = t.x,
                u = t.y,
                M = Math.sin(u),
                f = Math.cos(u),
                p = c(m - this.long0);
              return Math.abs(Math.abs(m - this.long0) - Math.PI) <= h &&
                Math.abs(u + this.lat0) <= h
                ? ((t.x = NaN), (t.y = NaN), t)
                : this.sphere
                ? ((s =
                    (2 * this.k0) /
                    (1 + this.sinlat0 * M + this.coslat0 * f * Math.cos(p))),
                  (t.x = this.a * s * f * Math.sin(p) + this.x0),
                  (t.y =
                    this.a *
                      s *
                      (this.coslat0 * M - this.sinlat0 * f * Math.cos(p)) +
                    this.y0),
                  t)
                : ((i = 2 * Math.atan(this.ssfn_(u, M, this.e)) - a),
                  (e = Math.cos(i)),
                  (n = Math.sin(i)),
                  Math.abs(this.coslat0) <= h
                    ? ((r = o(this.e, u * this.con, this.con * M)),
                      (l = (2 * this.a * this.k0 * r) / this.cons),
                      (t.x = this.x0 + l * Math.sin(m - this.long0)),
                      (t.y = this.y0 - this.con * l * Math.cos(m - this.long0)),
                      t)
                    : (Math.abs(this.sinlat0) < h
                        ? ((s = (2 * this.a * this.k0) / (1 + e * Math.cos(p))),
                          (t.y = s * n))
                        : ((s =
                            (2 * this.a * this.k0 * this.ms1) /
                            (this.cosX0 *
                              (1 +
                                this.sinX0 * n +
                                this.cosX0 * e * Math.cos(p)))),
                          (t.y =
                            s *
                              (this.cosX0 * n - this.sinX0 * e * Math.cos(p)) +
                            this.y0)),
                      (t.x = s * e * Math.sin(p) + this.x0),
                      t));
            }),
            (i.inverse = function (t) {
              var s, i, n, e, o;
              (t.x -= this.x0), (t.y -= this.y0);
              var l = Math.sqrt(t.x * t.x + t.y * t.y);
              if (this.sphere) {
                var m = 2 * Math.atan(l / (0.5 * this.a * this.k0));
                return (
                  (s = this.long0),
                  (i = this.lat0),
                  l <= h
                    ? ((t.x = s), (t.y = i), t)
                    : ((i = Math.asin(
                        Math.cos(m) * this.sinlat0 +
                          (t.y * Math.sin(m) * this.coslat0) / l,
                      )),
                      (s =
                        Math.abs(this.coslat0) < h
                          ? this.lat0 > 0
                            ? c(this.long0 + Math.atan2(t.x, -1 * t.y))
                            : c(this.long0 + Math.atan2(t.x, t.y))
                          : c(
                              this.long0 +
                                Math.atan2(
                                  t.x * Math.sin(m),
                                  l * this.coslat0 * Math.cos(m) -
                                    t.y * this.sinlat0 * Math.sin(m),
                                ),
                            )),
                      (t.x = s),
                      (t.y = i),
                      t)
                );
              }
              if (Math.abs(this.coslat0) <= h) {
                if (l <= h)
                  return (
                    (i = this.lat0), (s = this.long0), (t.x = s), (t.y = i), t
                  );
                (t.x *= this.con),
                  (t.y *= this.con),
                  (n = (l * this.cons) / (2 * this.a * this.k0)),
                  (i = this.con * r(this.e, n)),
                  (s =
                    this.con *
                    c(this.con * this.long0 + Math.atan2(t.x, -1 * t.y)));
              } else
                (e =
                  2 *
                  Math.atan(
                    (l * this.cosX0) / (2 * this.a * this.k0 * this.ms1),
                  )),
                  (s = this.long0),
                  l <= h
                    ? (o = this.X0)
                    : ((o = Math.asin(
                        Math.cos(e) * this.sinX0 +
                          (t.y * Math.sin(e) * this.cosX0) / l,
                      )),
                      (s = c(
                        this.long0 +
                          Math.atan2(
                            t.x * Math.sin(e),
                            l * this.cosX0 * Math.cos(e) -
                              t.y * this.sinX0 * Math.sin(e),
                          ),
                      ))),
                  (i = -1 * r(this.e, Math.tan(0.5 * (a + o))));
              return (t.x = s), (t.y = i), t;
            }),
            (i.names = [
              'stere',
              'Stereographic_South_Pole',
              'Polar Stereographic (variant B)',
            ]);
        },
        {
          '../common/adjust_lon': 5,
          '../common/msfnz': 15,
          '../common/phi2z': 16,
          '../common/sign': 21,
          '../common/tsfnz': 24,
        },
      ],
      61: [
        function (t, s, i) {
          var a = t('./gauss'),
            h = t('../common/adjust_lon');
          (i.init = function () {
            a.init.apply(this),
              this.rc &&
                ((this.sinc0 = Math.sin(this.phic0)),
                (this.cosc0 = Math.cos(this.phic0)),
                (this.R2 = 2 * this.rc),
                this.title ||
                  (this.title = 'Oblique Stereographic Alternative'));
          }),
            (i.forward = function (t) {
              var s, i, n, e;
              return (
                (t.x = h(t.x - this.long0)),
                a.forward.apply(this, [t]),
                (s = Math.sin(t.y)),
                (i = Math.cos(t.y)),
                (n = Math.cos(t.x)),
                (e =
                  (this.k0 * this.R2) /
                  (1 + this.sinc0 * s + this.cosc0 * i * n)),
                (t.x = e * i * Math.sin(t.x)),
                (t.y = e * (this.cosc0 * s - this.sinc0 * i * n)),
                (t.x = this.a * t.x + this.x0),
                (t.y = this.a * t.y + this.y0),
                t
              );
            }),
            (i.inverse = function (t) {
              var s, i, n, e, o;
              if (
                ((t.x = (t.x - this.x0) / this.a),
                (t.y = (t.y - this.y0) / this.a),
                (t.x /= this.k0),
                (t.y /= this.k0),
                (o = Math.sqrt(t.x * t.x + t.y * t.y)))
              ) {
                var r = 2 * Math.atan2(o, this.R2);
                (s = Math.sin(r)),
                  (i = Math.cos(r)),
                  (e = Math.asin(i * this.sinc0 + (t.y * s * this.cosc0) / o)),
                  (n = Math.atan2(
                    t.x * s,
                    o * this.cosc0 * i - t.y * this.sinc0 * s,
                  ));
              } else (e = this.phic0), (n = 0);
              return (
                (t.x = n),
                (t.y = e),
                a.inverse.apply(this, [t]),
                (t.x = h(t.x + this.long0)),
                t
              );
            }),
            (i.names = [
              'Stereographic_North_Pole',
              'Oblique_Stereographic',
              'Polar_Stereographic',
              'sterea',
              'Oblique Stereographic Alternative',
            ]);
        },
        { '../common/adjust_lon': 5, './gauss': 46 },
      ],
      62: [
        function (t, s, i) {
          var a = t('../common/e0fn'),
            h = t('../common/e1fn'),
            n = t('../common/e2fn'),
            e = t('../common/e3fn'),
            o = t('../common/mlfn'),
            r = t('../common/adjust_lon'),
            c = Math.PI / 2,
            l = t('../common/sign'),
            m = t('../common/asinz');
          (i.init = function () {
            (this.e0 = a(this.es)),
              (this.e1 = h(this.es)),
              (this.e2 = n(this.es)),
              (this.e3 = e(this.es)),
              (this.ml0 =
                this.a * o(this.e0, this.e1, this.e2, this.e3, this.lat0));
          }),
            (i.forward = function (t) {
              var s,
                i,
                a,
                h = t.x,
                n = t.y,
                e = r(h - this.long0),
                c = Math.sin(n),
                l = Math.cos(n);
              if (this.sphere) {
                var m = l * Math.sin(e);
                if (Math.abs(Math.abs(m) - 1) < 1e-10) return 93;
                (i = 0.5 * this.a * this.k0 * Math.log((1 + m) / (1 - m))),
                  (s = Math.acos((l * Math.cos(e)) / Math.sqrt(1 - m * m))),
                  n < 0 && (s = -s),
                  (a = this.a * this.k0 * (s - this.lat0));
              } else {
                var u = l * e,
                  M = Math.pow(u, 2),
                  f = this.ep2 * Math.pow(l, 2),
                  p = Math.tan(n),
                  d = Math.pow(p, 2);
                s = 1 - this.es * Math.pow(c, 2);
                var _ = this.a / Math.sqrt(s),
                  y = this.a * o(this.e0, this.e1, this.e2, this.e3, n);
                (i =
                  this.k0 *
                    _ *
                    u *
                    (1 +
                      (M / 6) *
                        (1 -
                          d +
                          f +
                          (M / 20) *
                            (5 -
                              18 * d +
                              Math.pow(d, 2) +
                              72 * f -
                              58 * this.ep2))) +
                  this.x0),
                  (a =
                    this.k0 *
                      (y -
                        this.ml0 +
                        _ *
                          p *
                          (M *
                            (0.5 +
                              (M / 24) *
                                (5 -
                                  d +
                                  9 * f +
                                  4 * Math.pow(f, 2) +
                                  (M / 30) *
                                    (61 -
                                      58 * d +
                                      Math.pow(d, 2) +
                                      600 * f -
                                      330 * this.ep2))))) +
                    this.y0);
              }
              return (t.x = i), (t.y = a), t;
            }),
            (i.inverse = function (t) {
              var s, i, a, h, n, e;
              if (this.sphere) {
                var o = Math.exp(t.x / (this.a * this.k0)),
                  u = 0.5 * (o - 1 / o),
                  M = this.lat0 + t.y / (this.a * this.k0),
                  f = Math.cos(M);
                (s = Math.sqrt((1 - f * f) / (1 + u * u))),
                  (n = m(s)),
                  M < 0 && (n = -n),
                  (e =
                    0 === u && 0 === f
                      ? this.long0
                      : r(Math.atan2(u, f) + this.long0));
              } else {
                var p = t.x - this.x0,
                  d = t.y - this.y0;
                for (
                  i = s = (this.ml0 + d / this.k0) / this.a, h = 0;
                  (i += a =
                    (s +
                      this.e1 * Math.sin(2 * i) -
                      this.e2 * Math.sin(4 * i) +
                      this.e3 * Math.sin(6 * i)) /
                      this.e0 -
                    i),
                    !(Math.abs(a) <= 1e-10);
                  h++
                )
                  if (h >= 6) return 95;
                if (Math.abs(i) < c) {
                  var _ = Math.sin(i),
                    y = Math.cos(i),
                    g = Math.tan(i),
                    x = this.ep2 * Math.pow(y, 2),
                    b = Math.pow(x, 2),
                    v = Math.pow(g, 2),
                    w = Math.pow(v, 2);
                  s = 1 - this.es * Math.pow(_, 2);
                  var P = this.a / Math.sqrt(s),
                    j = (P * (1 - this.es)) / s,
                    C = p / (P * this.k0),
                    S = Math.pow(C, 2);
                  (n =
                    i -
                    ((P * g * S) / j) *
                      (0.5 -
                        (S / 24) *
                          (5 +
                            3 * v +
                            10 * x -
                            4 * b -
                            9 * this.ep2 -
                            (S / 30) *
                              (61 +
                                90 * v +
                                298 * x +
                                45 * w -
                                252 * this.ep2 -
                                3 * b)))),
                    (e = r(
                      this.long0 +
                        (C *
                          (1 -
                            (S / 6) *
                              (1 +
                                2 * v +
                                x -
                                (S / 20) *
                                  (5 -
                                    2 * x +
                                    28 * v -
                                    3 * b +
                                    8 * this.ep2 +
                                    24 * w)))) /
                          y,
                    ));
                } else (n = c * l(d)), (e = this.long0);
              }
              return (t.x = e), (t.y = n), t;
            }),
            (i.names = ['Transverse_Mercator', 'Transverse Mercator', 'tmerc']);
        },
        {
          '../common/adjust_lon': 5,
          '../common/asinz': 6,
          '../common/e0fn': 7,
          '../common/e1fn': 8,
          '../common/e2fn': 9,
          '../common/e3fn': 10,
          '../common/mlfn': 14,
          '../common/sign': 21,
        },
      ],
      63: [
        function (t, s, i) {
          var a = t('./tmerc');
          (i.dependsOn = 'tmerc'),
            (i.init = function () {
              this.zone &&
                ((this.lat0 = 0),
                (this.long0 =
                  0.017453292519943295 * (6 * Math.abs(this.zone) - 183)),
                (this.x0 = 5e5),
                (this.y0 = this.utmSouth ? 1e7 : 0),
                (this.k0 = 0.9996),
                a.init.apply(this),
                (this.forward = a.forward),
                (this.inverse = a.inverse));
            }),
            (i.names = ['Universal Transverse Mercator System', 'utm']);
        },
        { './tmerc': 62 },
      ],
      64: [
        function (t, s, i) {
          var a = t('../common/adjust_lon'),
            h = Math.PI / 2,
            n = 1e-10,
            e = t('../common/asinz');
          (i.init = function () {
            this.R = this.a;
          }),
            (i.forward = function (t) {
              var s,
                i,
                o = t.x,
                r = t.y,
                c = a(o - this.long0);
              Math.abs(r) <= n && ((s = this.x0 + this.R * c), (i = this.y0));
              var l = e(2 * Math.abs(r / Math.PI));
              (Math.abs(c) <= n || Math.abs(Math.abs(r) - h) <= n) &&
                ((s = this.x0),
                (i =
                  r >= 0
                    ? this.y0 + Math.PI * this.R * Math.tan(0.5 * l)
                    : this.y0 + Math.PI * this.R * -Math.tan(0.5 * l)));
              var m = 0.5 * Math.abs(Math.PI / c - c / Math.PI),
                u = m * m,
                M = Math.sin(l),
                f = Math.cos(l),
                p = f / (M + f - 1),
                d = p * p,
                _ = p * (2 / M - 1),
                y = _ * _,
                g =
                  (Math.PI *
                    this.R *
                    (m * (p - y) +
                      Math.sqrt(u * (p - y) * (p - y) - (y + u) * (d - y)))) /
                  (y + u);
              c < 0 && (g = -g), (s = this.x0 + g);
              var x = u + p;
              return (
                (g =
                  (Math.PI *
                    this.R *
                    (_ * x - m * Math.sqrt((y + u) * (u + 1) - x * x))) /
                  (y + u)),
                (i = r >= 0 ? this.y0 + g : this.y0 - g),
                (t.x = s),
                (t.y = i),
                t
              );
            }),
            (i.inverse = function (t) {
              var s, i, h, e, o, r, c, l, m, u, M, f;
              return (
                (t.x -= this.x0),
                (t.y -= this.y0),
                (M = Math.PI * this.R),
                (o = (h = t.x / M) * h + (e = t.y / M) * e),
                (M =
                  (3 *
                    ((e * e) /
                      (l =
                        -2 * (r = -Math.abs(e) * (1 + o)) +
                        1 +
                        2 * e * e +
                        o * o) +
                      ((2 * (c = r - 2 * e * e + h * h) * c * c) / l / l / l -
                        (9 * r * c) / l / l) /
                        27)) /
                  (m = (r - (c * c) / 3 / l) / l) /
                  (u = 2 * Math.sqrt(-m / 3))),
                Math.abs(M) > 1 && (M = M >= 0 ? 1 : -1),
                (f = Math.acos(M) / 3),
                (i =
                  t.y >= 0
                    ? (-u * Math.cos(f + Math.PI / 3) - c / 3 / l) * Math.PI
                    : -(-u * Math.cos(f + Math.PI / 3) - c / 3 / l) * Math.PI),
                (s =
                  Math.abs(h) < n
                    ? this.long0
                    : a(
                        this.long0 +
                          (Math.PI *
                            (o -
                              1 +
                              Math.sqrt(1 + 2 * (h * h - e * e) + o * o))) /
                            2 /
                            h,
                      )),
                (t.x = s),
                (t.y = i),
                t
              );
            }),
            (i.names = ['Van_der_Grinten_I', 'VanDerGrinten', 'vandg']);
        },
        { '../common/adjust_lon': 5, '../common/asinz': 6 },
      ],
      65: [
        function (t, s, i) {
          var a = 0.017453292519943295,
            h = 57.29577951308232,
            n = t('./datum_transform'),
            e = t('./adjust_axis'),
            o = t('./Proj'),
            r = t('./common/toPoint');
          s.exports = function t(s, i, c) {
            var l;
            function m(t, s) {
              return (
                (1 === t.datum.datum_type || 2 === t.datum.datum_type) &&
                'WGS84' !== s.datumCode
              );
            }
            return (
              Array.isArray(c) && (c = r(c)),
              s.datum &&
                i.datum &&
                (m(s, i) || m(i, s)) &&
                (t(s, (l = new o('WGS84')), c), (s = l)),
              'enu' !== s.axis && e(s, !1, c),
              'longlat' === s.projName
                ? ((c.x *= a), (c.y *= a))
                : (s.to_meter && ((c.x *= s.to_meter), (c.y *= s.to_meter)),
                  s.inverse(c)),
              s.from_greenwich && (c.x += s.from_greenwich),
              (c = n(s.datum, i.datum, c)),
              i.from_greenwich && (c.x -= i.from_greenwich),
              'longlat' === i.projName
                ? ((c.x *= h), (c.y *= h))
                : (i.forward(c),
                  i.to_meter && ((c.x /= i.to_meter), (c.y /= i.to_meter))),
              'enu' !== i.axis && e(i, !0, c),
              c
            );
          };
        },
        {
          './Proj': 2,
          './adjust_axis': 3,
          './common/toPoint': 23,
          './datum_transform': 31,
        },
      ],
      66: [
        function (t, s, i) {
          var a = t('./extend');
          function h(t, s, i) {
            t[s] = i
              .map(function (t) {
                var s = {};
                return n(t, s), s;
              })
              .reduce(function (t, s) {
                return a(t, s);
              }, {});
          }
          function n(t, s) {
            var i;
            Array.isArray(t)
              ? ('PARAMETER' === (i = t.shift()) && (i = t.shift()),
                1 === t.length
                  ? Array.isArray(t[0])
                    ? ((s[i] = {}), n(t[0], s[i]))
                    : (s[i] = t[0])
                  : t.length
                  ? 'TOWGS84' === i
                    ? (s[i] = t)
                    : ((s[i] = {}),
                      ['UNIT', 'PRIMEM', 'VERT_DATUM'].indexOf(i) > -1
                        ? ((s[i] = { name: t[0].toLowerCase(), convert: t[1] }),
                          3 === t.length && (s[i].auth = t[2]))
                        : 'SPHEROID' === i
                        ? ((s[i] = { name: t[0], a: t[1], rf: t[2] }),
                          4 === t.length && (s[i].auth = t[3]))
                        : [
                            'GEOGCS',
                            'GEOCCS',
                            'DATUM',
                            'VERT_CS',
                            'COMPD_CS',
                            'LOCAL_CS',
                            'FITTED_CS',
                            'LOCAL_DATUM',
                          ].indexOf(i) > -1
                        ? ((t[0] = ['name', t[0]]), h(s, i, t))
                        : t.every(function (t) {
                            return Array.isArray(t);
                          })
                        ? h(s, i, t)
                        : n(t, s[i]))
                  : (s[i] = !0))
              : (s[t] = !0);
          }
          function e(t) {
            return 0.017453292519943295 * t;
          }
          s.exports = function (t, s) {
            var i = JSON.parse(
                (',' + t)
                  .replace(/\s*\,\s*([A-Z_0-9]+?)(\[)/g, ',["$1",')
                  .slice(1)
                  .replace(/\s*\,\s*([A-Z_0-9]+?)\]/g, ',"$1"]')
                  .replace(/,\["VERTCS".+/, ''),
              ),
              h = i.shift(),
              o = i.shift();
            i.unshift(['name', o]), i.unshift(['type', h]), i.unshift('output');
            var r = {};
            return (
              n(i, r),
              (function (t) {
                function s(s) {
                  var i = t.to_meter || 1;
                  return parseFloat(s, 10) * i;
                }
                'GEOGCS' === t.type
                  ? (t.projName = 'longlat')
                  : 'LOCAL_CS' === t.type
                  ? ((t.projName = 'identity'), (t.local = !0))
                  : 'object' == typeof t.PROJECTION
                  ? (t.projName = Object.keys(t.PROJECTION)[0])
                  : (t.projName = t.PROJECTION),
                  t.UNIT &&
                    ((t.units = t.UNIT.name.toLowerCase()),
                    'metre' === t.units && (t.units = 'meter'),
                    t.UNIT.convert &&
                      ('GEOGCS' === t.type
                        ? t.DATUM &&
                          t.DATUM.SPHEROID &&
                          (t.to_meter =
                            parseFloat(t.UNIT.convert, 10) * t.DATUM.SPHEROID.a)
                        : (t.to_meter = parseFloat(t.UNIT.convert, 10)))),
                  t.GEOGCS &&
                    (t.GEOGCS.DATUM
                      ? (t.datumCode = t.GEOGCS.DATUM.name.toLowerCase())
                      : (t.datumCode = t.GEOGCS.name.toLowerCase()),
                    'd_' === t.datumCode.slice(0, 2) &&
                      (t.datumCode = t.datumCode.slice(2)),
                    ('new_zealand_geodetic_datum_1949' !== t.datumCode &&
                      'new_zealand_1949' !== t.datumCode) ||
                      (t.datumCode = 'nzgd49'),
                    'wgs_1984' === t.datumCode &&
                      ('Mercator_Auxiliary_Sphere' === t.PROJECTION &&
                        (t.sphere = !0),
                      (t.datumCode = 'wgs84')),
                    '_ferro' === t.datumCode.slice(-6) &&
                      (t.datumCode = t.datumCode.slice(0, -6)),
                    '_jakarta' === t.datumCode.slice(-8) &&
                      (t.datumCode = t.datumCode.slice(0, -8)),
                    ~t.datumCode.indexOf('belge') && (t.datumCode = 'rnb72'),
                    t.GEOGCS.DATUM &&
                      t.GEOGCS.DATUM.SPHEROID &&
                      ((t.ellps = t.GEOGCS.DATUM.SPHEROID.name
                        .replace('_19', '')
                        .replace(/[Cc]larke\_18/, 'clrk')),
                      'international' === t.ellps.toLowerCase().slice(0, 13) &&
                        (t.ellps = 'intl'),
                      (t.a = t.GEOGCS.DATUM.SPHEROID.a),
                      (t.rf = parseFloat(t.GEOGCS.DATUM.SPHEROID.rf, 10))),
                    ~t.datumCode.indexOf('osgb_1936') &&
                      (t.datumCode = 'osgb36')),
                  t.b && !isFinite(t.b) && (t.b = t.a),
                  [
                    ['standard_parallel_1', 'Standard_Parallel_1'],
                    ['standard_parallel_2', 'Standard_Parallel_2'],
                    ['false_easting', 'False_Easting'],
                    ['false_northing', 'False_Northing'],
                    ['central_meridian', 'Central_Meridian'],
                    ['latitude_of_origin', 'Latitude_Of_Origin'],
                    ['latitude_of_origin', 'Central_Parallel'],
                    ['scale_factor', 'Scale_Factor'],
                    ['k0', 'scale_factor'],
                    ['latitude_of_center', 'Latitude_of_center'],
                    ['lat0', 'latitude_of_center', e],
                    ['longitude_of_center', 'Longitude_Of_Center'],
                    ['longc', 'longitude_of_center', e],
                    ['x0', 'false_easting', s],
                    ['y0', 'false_northing', s],
                    ['long0', 'central_meridian', e],
                    ['lat0', 'latitude_of_origin', e],
                    ['lat0', 'standard_parallel_1', e],
                    ['lat1', 'standard_parallel_1', e],
                    ['lat2', 'standard_parallel_2', e],
                    ['alpha', 'azimuth', e],
                    ['srsCode', 'name'],
                  ].forEach(function (s) {
                    return (
                      (i = t),
                      (h = (a = s)[0]),
                      (n = a[1]),
                      void (
                        !(h in i) &&
                        n in i &&
                        ((i[h] = i[n]), 3 === a.length && (i[h] = a[2](i[h])))
                      )
                    );
                    var i, a, h, n;
                  }),
                  t.long0 ||
                    !t.longc ||
                    ('Albers_Conic_Equal_Area' !== t.projName &&
                      'Lambert_Azimuthal_Equal_Area' !== t.projName) ||
                    (t.long0 = t.longc),
                  t.lat_ts ||
                    !t.lat1 ||
                    ('Stereographic_South_Pole' !== t.projName &&
                      'Polar Stereographic (variant B)' !== t.projName) ||
                    ((t.lat0 = e(t.lat1 > 0 ? 90 : -90)), (t.lat_ts = t.lat1));
              })(r.output),
              a(s, r.output)
            );
          };
        },
        { './extend': 34 },
      ],
      67: [
        function (t, s, i) {
          var a = 6,
            h = 'AJSAJS',
            n = 'AFAFAF',
            e = 65,
            o = 73,
            r = 79;
          function c(t) {
            return t * (Math.PI / 180);
          }
          function l(t) {
            return (t / Math.PI) * 180;
          }
          function m(t) {
            var s = t.northing,
              i = t.easting,
              a = t.zoneLetter,
              h = t.zoneNumber;
            if (h < 0 || h > 60) return null;
            var n,
              e,
              o,
              r,
              c,
              u,
              M,
              f,
              p,
              d = 0.9996,
              _ = 6378137,
              y = 0.00669438,
              g = (1 - Math.sqrt(0.99330562)) / (1 + Math.sqrt(0.99330562)),
              x = i - 5e5,
              b = s;
            a < 'N' && (b -= 1e7),
              (M = 6 * (h - 1) - 180 + 3),
              (n = 0.006739496752268451),
              (p =
                (f = b / d / 6367449.145945056) +
                ((3 * g) / 2 - (27 * g * g * g) / 32) * Math.sin(2 * f) +
                ((21 * g * g) / 16 - (55 * g * g * g * g) / 32) *
                  Math.sin(4 * f) +
                ((151 * g * g * g) / 96) * Math.sin(6 * f)),
              (e = _ / Math.sqrt(1 - y * Math.sin(p) * Math.sin(p))),
              (o = Math.tan(p) * Math.tan(p)),
              (r = n * Math.cos(p) * Math.cos(p)),
              (c =
                (0.99330562 * _) /
                Math.pow(1 - y * Math.sin(p) * Math.sin(p), 1.5)),
              (u = x / (e * d));
            var v =
              p -
              ((e * Math.tan(p)) / c) *
                ((u * u) / 2 -
                  ((5 + 3 * o + 10 * r - 4 * r * r - 9 * n) * u * u * u * u) /
                    24 +
                  ((61 +
                    90 * o +
                    298 * r +
                    45 * o * o -
                    1.6983531815716497 -
                    3 * r * r) *
                    u *
                    u *
                    u *
                    u *
                    u *
                    u) /
                    720);
            v = l(v);
            var w,
              P =
                (u -
                  ((1 + 2 * o + r) * u * u * u) / 6 +
                  ((5 - 2 * r + 28 * o - 3 * r * r + 8 * n + 24 * o * o) *
                    u *
                    u *
                    u *
                    u *
                    u) /
                    120) /
                Math.cos(p);
            if (((P = M + l(P)), t.accuracy)) {
              var j = m({
                northing: t.northing + t.accuracy,
                easting: t.easting + t.accuracy,
                zoneLetter: t.zoneLetter,
                zoneNumber: t.zoneNumber,
              });
              w = { top: j.lat, right: j.lon, bottom: v, left: P };
            } else w = { lat: v, lon: P };
            return w;
          }
          function u(t) {
            var s = t % a;
            return 0 === s && (s = a), s;
          }
          function M(t) {
            if (t && 0 === t.length) throw 'MGRSPoint coverting from nothing';
            for (
              var s, i = t.length, a = null, c = '', l = 0;
              !/[A-Z]/.test((s = t.charAt(l)));

            ) {
              if (l >= 2) throw 'MGRSPoint bad conversion from: ' + t;
              (c += s), l++;
            }
            var m = parseInt(c, 10);
            if (0 === l || l + 3 > i)
              throw 'MGRSPoint bad conversion from: ' + t;
            var M = t.charAt(l++);
            if (
              M <= 'A' ||
              'B' === M ||
              'Y' === M ||
              M >= 'Z' ||
              'I' === M ||
              'O' === M
            )
              throw 'MGRSPoint zone letter ' + M + ' not handled: ' + t;
            a = t.substring(l, (l += 2));
            for (
              var p = u(m),
                d = (function (t, s) {
                  for (
                    var i = h.charCodeAt(s - 1), a = 1e5, n = !1;
                    i !== t.charCodeAt(0);

                  ) {
                    if ((++i === o && i++, i === r && i++, i > 90)) {
                      if (n) throw 'Bad character: ' + t;
                      (i = e), (n = !0);
                    }
                    a += 1e5;
                  }
                  return a;
                })(a.charAt(0), p),
                _ = (function (t, s) {
                  if (t > 'V') throw 'MGRSPoint given invalid Northing ' + t;
                  for (
                    var i = n.charCodeAt(s - 1), a = 0, h = !1;
                    i !== t.charCodeAt(0);

                  ) {
                    if ((++i === o && i++, i === r && i++, i > 86)) {
                      if (h) throw 'Bad character: ' + t;
                      (i = e), (h = !0);
                    }
                    a += 1e5;
                  }
                  return a;
                })(a.charAt(1), p);
              _ < f(M);

            )
              _ += 2e6;
            var y = i - l;
            if (y % 2 != 0)
              throw (
                'MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters' +
                t
              );
            var g,
              x,
              b,
              v = y / 2,
              w = 0,
              P = 0;
            return (
              v > 0 &&
                ((g = 1e5 / Math.pow(10, v)),
                (x = t.substring(l, l + v)),
                (w = parseFloat(x) * g),
                (b = t.substring(l + v)),
                (P = parseFloat(b) * g)),
              {
                easting: w + d,
                northing: P + _,
                zoneLetter: M,
                zoneNumber: m,
                accuracy: g,
              }
            );
          }
          function f(t) {
            var s;
            switch (t) {
              case 'C':
                s = 11e5;
                break;
              case 'D':
                s = 2e6;
                break;
              case 'E':
                s = 28e5;
                break;
              case 'F':
                s = 37e5;
                break;
              case 'G':
                s = 46e5;
                break;
              case 'H':
                s = 55e5;
                break;
              case 'J':
                s = 64e5;
                break;
              case 'K':
                s = 73e5;
                break;
              case 'L':
                s = 82e5;
                break;
              case 'M':
                s = 91e5;
                break;
              case 'N':
                s = 0;
                break;
              case 'P':
                s = 8e5;
                break;
              case 'Q':
                s = 17e5;
                break;
              case 'R':
                s = 26e5;
                break;
              case 'S':
                s = 35e5;
                break;
              case 'T':
                s = 44e5;
                break;
              case 'U':
                s = 53e5;
                break;
              case 'V':
                s = 62e5;
                break;
              case 'W':
                s = 7e6;
                break;
              case 'X':
                s = 79e5;
                break;
              default:
                s = -1;
            }
            if (s >= 0) return s;
            throw 'Invalid zone letter: ' + t;
          }
          (i.forward = function (t, s) {
            return (
              (s = s || 5),
              (function (t, s) {
                var i,
                  a,
                  c,
                  l,
                  m,
                  M,
                  f,
                  p,
                  d,
                  _,
                  y,
                  g = '00000' + t.easting,
                  x = '00000' + t.northing;
                return (
                  t.zoneNumber +
                  t.zoneLetter +
                  ((d = t.easting),
                  (_ = t.northing),
                  (y = u(t.zoneNumber)),
                  (i = Math.floor(d / 1e5)),
                  (a = Math.floor(_ / 1e5) % 20),
                  (l = h.charCodeAt((c = y - 1))),
                  (m = n.charCodeAt(c)),
                  (p = !1),
                  (M = l + i - 1) > 90 && ((M = M - 90 + e - 1), (p = !0)),
                  (M === o || (l < o && M > o) || ((M > o || l < o) && p)) &&
                    M++,
                  (M === r || (l < r && M > r) || ((M > r || l < r) && p)) &&
                    ++M === o &&
                    M++,
                  M > 90 && (M = M - 90 + e - 1),
                  (f = m + a) > 86
                    ? ((f = f - 86 + e - 1), (p = !0))
                    : (p = !1),
                  (f === o || (m < o && f > o) || ((f > o || m < o) && p)) &&
                    f++,
                  (f === r || (m < r && f > r) || ((f > r || m < r) && p)) &&
                    ++f === o &&
                    f++,
                  f > 86 && (f = f - 86 + e - 1),
                  String.fromCharCode(M) + String.fromCharCode(f)) +
                  g.substr(g.length - 5, s) +
                  x.substr(x.length - 5, s)
                );
              })(
                (function (t) {
                  var s,
                    i,
                    a,
                    h,
                    n,
                    e,
                    o,
                    r = t.lat,
                    l = t.lon,
                    m = 6378137,
                    u = 0.00669438,
                    M = 0.9996,
                    f = c(r),
                    p = c(l);
                  (o = Math.floor((l + 180) / 6) + 1),
                    180 === l && (o = 60),
                    r >= 56 && r < 64 && l >= 3 && l < 12 && (o = 32),
                    r >= 72 &&
                      r < 84 &&
                      (l >= 0 && l < 9
                        ? (o = 31)
                        : l >= 9 && l < 21
                        ? (o = 33)
                        : l >= 21 && l < 33
                        ? (o = 35)
                        : l >= 33 && l < 42 && (o = 37)),
                    (e = c(6 * (o - 1) - 180 + 3)),
                    (s = 0.006739496752268451),
                    (i = m / Math.sqrt(1 - u * Math.sin(f) * Math.sin(f))),
                    (a = Math.tan(f) * Math.tan(f)),
                    (h = s * Math.cos(f) * Math.cos(f));
                  var d,
                    _,
                    y =
                      M *
                        i *
                        ((n = Math.cos(f) * (p - e)) +
                          ((1 - a + h) * n * n * n) / 6 +
                          ((5 - 18 * a + a * a + 72 * h - 58 * s) *
                            n *
                            n *
                            n *
                            n *
                            n) /
                            120) +
                      5e5,
                    g =
                      M *
                      (m *
                        (0.9983242984503243 * f -
                          0.002514607064228144 * Math.sin(2 * f) +
                          2639046602129982e-21 * Math.sin(4 * f) -
                          3.418046101696858e-9 * Math.sin(6 * f)) +
                        i *
                          Math.tan(f) *
                          ((n * n) / 2 +
                            ((5 - a + 9 * h + 4 * h * h) * n * n * n * n) / 24 +
                            ((61 -
                              58 * a +
                              a * a +
                              600 * h -
                              2.2240339282485886) *
                              n *
                              n *
                              n *
                              n *
                              n *
                              n) /
                              720));
                  return (
                    r < 0 && (g += 1e7),
                    {
                      northing: Math.round(g),
                      easting: Math.round(y),
                      zoneNumber: o,
                      zoneLetter:
                        ((d = r),
                        (_ = 'Z'),
                        84 >= d && d >= 72
                          ? (_ = 'X')
                          : 72 > d && d >= 64
                          ? (_ = 'W')
                          : 64 > d && d >= 56
                          ? (_ = 'V')
                          : 56 > d && d >= 48
                          ? (_ = 'U')
                          : 48 > d && d >= 40
                          ? (_ = 'T')
                          : 40 > d && d >= 32
                          ? (_ = 'S')
                          : 32 > d && d >= 24
                          ? (_ = 'R')
                          : 24 > d && d >= 16
                          ? (_ = 'Q')
                          : 16 > d && d >= 8
                          ? (_ = 'P')
                          : 8 > d && d >= 0
                          ? (_ = 'N')
                          : 0 > d && d >= -8
                          ? (_ = 'M')
                          : -8 > d && d >= -16
                          ? (_ = 'L')
                          : -16 > d && d >= -24
                          ? (_ = 'K')
                          : -24 > d && d >= -32
                          ? (_ = 'J')
                          : -32 > d && d >= -40
                          ? (_ = 'H')
                          : -40 > d && d >= -48
                          ? (_ = 'G')
                          : -48 > d && d >= -56
                          ? (_ = 'F')
                          : -56 > d && d >= -64
                          ? (_ = 'E')
                          : -64 > d && d >= -72
                          ? (_ = 'D')
                          : -72 > d && d >= -80 && (_ = 'C'),
                        _),
                    }
                  );
                })({ lat: t[1], lon: t[0] }),
                s,
              )
            );
          }),
            (i.inverse = function (t) {
              var s = m(M(t.toUpperCase()));
              return s.lat && s.lon
                ? [s.lon, s.lat, s.lon, s.lat]
                : [s.left, s.bottom, s.right, s.top];
            }),
            (i.toPoint = function (t) {
              var s = m(M(t.toUpperCase()));
              return s.lat && s.lon
                ? [s.lon, s.lat]
                : [(s.left + s.right) / 2, (s.top + s.bottom) / 2];
            });
        },
        {},
      ],
      68: [
        function (t, s, i) {
          s.exports = {
            name: 'proj4',
            version: '2.3.14',
            description:
              'Proj4js is a JavaScript library to transform point coordinates from one coordinate system to another, including datum transformations.',
            main: 'lib/index.js',
            directories: { test: 'test', doc: 'docs' },
            scripts: {
              test: './node_modules/istanbul/lib/cli.js test ./node_modules/mocha/bin/_mocha test/test.js',
            },
            repository: {
              type: 'git',
              url: 'git://github.com/proj4js/proj4js.git',
            },
            author: '',
            license: 'MIT',
            jam: {
              main: 'dist/proj4.js',
              include: ['dist/proj4.js', 'README.md', 'AUTHORS', 'LICENSE.md'],
            },
            devDependencies: {
              'grunt-cli': '~0.1.13',
              grunt: '~0.4.2',
              'grunt-contrib-connect': '~0.6.0',
              'grunt-contrib-jshint': '~0.8.0',
              chai: '~1.8.1',
              mocha: '~1.17.1',
              'grunt-mocha-phantomjs': '~0.4.0',
              browserify: '~12.0.1',
              'grunt-browserify': '~4.0.1',
              'grunt-contrib-uglify': '~0.11.1',
              curl: 'git://github.com/cujojs/curl.git',
              istanbul: '~0.2.4',
              tin: '~0.4.0',
            },
            dependencies: { mgrs: '~0.0.2' },
          };
        },
        {},
      ],
      './includedProjections': [
        function (t, s, i) {
          s.exports = t('hTEDpn');
        },
        {},
      ],
      hTEDpn: [
        function (t, s, i) {
          var a = [
            t('./lib/projections/tmerc'),
            t('./lib/projections/utm'),
            t('./lib/projections/sterea'),
            t('./lib/projections/stere'),
            t('./lib/projections/somerc'),
            t('./lib/projections/omerc'),
            t('./lib/projections/lcc'),
            t('./lib/projections/krovak'),
            t('./lib/projections/cass'),
            t('./lib/projections/laea'),
            t('./lib/projections/aea'),
            t('./lib/projections/gnom'),
            t('./lib/projections/cea'),
            t('./lib/projections/eqc'),
            t('./lib/projections/poly'),
            t('./lib/projections/nzmg'),
            t('./lib/projections/mill'),
            t('./lib/projections/sinu'),
            t('./lib/projections/moll'),
            t('./lib/projections/eqdc'),
            t('./lib/projections/vandg'),
            t('./lib/projections/aeqd'),
          ];
          s.exports = function (t) {
            a.forEach(function (s) {
              t.Proj.projections.add(s);
            });
          };
        },
        {
          './lib/projections/aea': 40,
          './lib/projections/aeqd': 41,
          './lib/projections/cass': 42,
          './lib/projections/cea': 43,
          './lib/projections/eqc': 44,
          './lib/projections/eqdc': 45,
          './lib/projections/gnom': 47,
          './lib/projections/krovak': 48,
          './lib/projections/laea': 49,
          './lib/projections/lcc': 50,
          './lib/projections/mill': 53,
          './lib/projections/moll': 54,
          './lib/projections/nzmg': 55,
          './lib/projections/omerc': 56,
          './lib/projections/poly': 57,
          './lib/projections/sinu': 58,
          './lib/projections/somerc': 59,
          './lib/projections/stere': 60,
          './lib/projections/sterea': 61,
          './lib/projections/tmerc': 62,
          './lib/projections/utm': 63,
          './lib/projections/vandg': 64,
        },
      ],
    },
    {},
    [36],
  )(36);
});
