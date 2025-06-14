window.cesiumGoogleEarthDbRootParser = function (e) {
  'use strict';
  var r,
    t,
    o = e.Reader,
    a = (e.Writer, e.util),
    n = [],
    i = e.roots.default || (e.roots.default = {});
  return (
    (i.keyhole =
      (((t = {}).dbroot =
        (((r = {}).StringEntryProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.stringId = 0),
            (r.prototype.stringValue = ''),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.StringEntryProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.stringId = e.fixed32();
                    break;
                  case 2:
                    a.stringValue = e.string();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : a.isInteger(e.stringId)
                ? a.isString(e.stringValue)
                  ? null
                  : 'stringValue: string expected'
                : 'stringId: integer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.StringEntryProto) return e;
                var r = new i.keyhole.dbroot.StringEntryProto();
                return (
                  void 0 !== e.stringId &&
                    null !== e.stringId &&
                    (r.stringId = e.stringId >>> 0),
                  void 0 !== e.stringValue &&
                    null !== e.stringValue &&
                    (r.stringValue = String(e.stringValue)),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults && ((t.stringId = 0), (t.stringValue = '')),
                void 0 !== e.stringId &&
                  null !== e.stringId &&
                  e.hasOwnProperty('stringId') &&
                  (t.stringId = e.stringId),
                void 0 !== e.stringValue &&
                  null !== e.stringValue &&
                  e.hasOwnProperty('stringValue') &&
                  (t.stringValue = e.stringValue),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.StringIdOrValueProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.stringId = 0),
            (r.prototype.value = ''),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.StringIdOrValueProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.stringId = e.fixed32();
                    break;
                  case 2:
                    a.value = e.string();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : void 0 === e.stringId || a.isInteger(e.stringId)
                ? void 0 === e.value || a.isString(e.value)
                  ? null
                  : 'value: string expected'
                : 'stringId: integer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.StringIdOrValueProto)
                  return e;
                var r = new i.keyhole.dbroot.StringIdOrValueProto();
                return (
                  void 0 !== e.stringId &&
                    null !== e.stringId &&
                    (r.stringId = e.stringId >>> 0),
                  void 0 !== e.value &&
                    null !== e.value &&
                    (r.value = String(e.value)),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults && ((t.stringId = 0), (t.value = '')),
                void 0 !== e.stringId &&
                  null !== e.stringId &&
                  e.hasOwnProperty('stringId') &&
                  (t.stringId = e.stringId),
                void 0 !== e.value &&
                  null !== e.value &&
                  e.hasOwnProperty('value') &&
                  (t.value = e.value),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.PlanetModelProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.radius = 6378.137),
            (r.prototype.flattening = 0.00335281066474748),
            (r.prototype.elevationBias = 0),
            (r.prototype.negativeAltitudeExponentBias = 0),
            (r.prototype.compressedNegativeAltitudeThreshold = 0),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.PlanetModelProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.radius = e.double();
                    break;
                  case 2:
                    a.flattening = e.double();
                    break;
                  case 4:
                    a.elevationBias = e.double();
                    break;
                  case 5:
                    a.negativeAltitudeExponentBias = e.int32();
                    break;
                  case 6:
                    a.compressedNegativeAltitudeThreshold = e.double();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : void 0 !== e.radius && 'number' != typeof e.radius
                ? 'radius: number expected'
                : void 0 !== e.flattening && 'number' != typeof e.flattening
                ? 'flattening: number expected'
                : void 0 !== e.elevationBias &&
                  'number' != typeof e.elevationBias
                ? 'elevationBias: number expected'
                : void 0 === e.negativeAltitudeExponentBias ||
                  a.isInteger(e.negativeAltitudeExponentBias)
                ? void 0 !== e.compressedNegativeAltitudeThreshold &&
                  'number' != typeof e.compressedNegativeAltitudeThreshold
                  ? 'compressedNegativeAltitudeThreshold: number expected'
                  : null
                : 'negativeAltitudeExponentBias: integer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.PlanetModelProto) return e;
                var r = new i.keyhole.dbroot.PlanetModelProto();
                return (
                  void 0 !== e.radius &&
                    null !== e.radius &&
                    (r.radius = Number(e.radius)),
                  void 0 !== e.flattening &&
                    null !== e.flattening &&
                    (r.flattening = Number(e.flattening)),
                  void 0 !== e.elevationBias &&
                    null !== e.elevationBias &&
                    (r.elevationBias = Number(e.elevationBias)),
                  void 0 !== e.negativeAltitudeExponentBias &&
                    null !== e.negativeAltitudeExponentBias &&
                    (r.negativeAltitudeExponentBias =
                      0 | e.negativeAltitudeExponentBias),
                  void 0 !== e.compressedNegativeAltitudeThreshold &&
                    null !== e.compressedNegativeAltitudeThreshold &&
                    (r.compressedNegativeAltitudeThreshold = Number(
                      e.compressedNegativeAltitudeThreshold,
                    )),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults &&
                  ((t.radius = 6378.137),
                  (t.flattening = 0.00335281066474748),
                  (t.elevationBias = 0),
                  (t.negativeAltitudeExponentBias = 0),
                  (t.compressedNegativeAltitudeThreshold = 0)),
                void 0 !== e.radius &&
                  null !== e.radius &&
                  e.hasOwnProperty('radius') &&
                  (t.radius = e.radius),
                void 0 !== e.flattening &&
                  null !== e.flattening &&
                  e.hasOwnProperty('flattening') &&
                  (t.flattening = e.flattening),
                void 0 !== e.elevationBias &&
                  null !== e.elevationBias &&
                  e.hasOwnProperty('elevationBias') &&
                  (t.elevationBias = e.elevationBias),
                void 0 !== e.negativeAltitudeExponentBias &&
                  null !== e.negativeAltitudeExponentBias &&
                  e.hasOwnProperty('negativeAltitudeExponentBias') &&
                  (t.negativeAltitudeExponentBias =
                    e.negativeAltitudeExponentBias),
                void 0 !== e.compressedNegativeAltitudeThreshold &&
                  null !== e.compressedNegativeAltitudeThreshold &&
                  e.hasOwnProperty('compressedNegativeAltitudeThreshold') &&
                  (t.compressedNegativeAltitudeThreshold =
                    e.compressedNegativeAltitudeThreshold),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.ProviderInfoProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.providerId = 0),
            (r.prototype.copyrightString = null),
            (r.prototype.verticalPixelOffset = -1);
          var t = { 1: 'keyhole.dbroot.StringIdOrValueProto' };
          return (
            n.push(t),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var a = void 0 === r ? e.len : e.pos + r,
                  n = new i.keyhole.dbroot.ProviderInfoProto();
                e.pos < a;

              ) {
                var l = e.uint32();
                switch (l >>> 3) {
                  case 1:
                    n.providerId = e.int32();
                    break;
                  case 2:
                    n.copyrightString = t[1].decode(e, e.uint32());
                    break;
                  case 3:
                    n.verticalPixelOffset = e.int32();
                    break;
                  default:
                    e.skipType(7 & l);
                }
              }
              return n;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if (!a.isInteger(e.providerId))
                return 'providerId: integer expected';
              if (void 0 !== e.copyrightString && null !== e.copyrightString) {
                var r = t[1].verify(e.copyrightString);
                if (r) return 'copyrightString.' + r;
              }
              return void 0 === e.verticalPixelOffset ||
                a.isInteger(e.verticalPixelOffset)
                ? null
                : 'verticalPixelOffset: integer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.ProviderInfoProto) return e;
                var r = new i.keyhole.dbroot.ProviderInfoProto();
                if (
                  (void 0 !== e.providerId &&
                    null !== e.providerId &&
                    (r.providerId = 0 | e.providerId),
                  void 0 !== e.copyrightString && null !== e.copyrightString)
                ) {
                  if ('object' != typeof e.copyrightString)
                    throw TypeError(
                      '.keyhole.dbroot.ProviderInfoProto.copyrightString: object expected',
                    );
                  r.copyrightString = t[1].fromObject(e.copyrightString);
                }
                return (
                  void 0 !== e.verticalPixelOffset &&
                    null !== e.verticalPixelOffset &&
                    (r.verticalPixelOffset = 0 | e.verticalPixelOffset),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var o = {};
              return (
                r.defaults &&
                  ((o.providerId = 0),
                  (o.copyrightString = null),
                  (o.verticalPixelOffset = -1)),
                void 0 !== e.providerId &&
                  null !== e.providerId &&
                  e.hasOwnProperty('providerId') &&
                  (o.providerId = e.providerId),
                void 0 !== e.copyrightString &&
                  null !== e.copyrightString &&
                  e.hasOwnProperty('copyrightString') &&
                  (o.copyrightString = t[1].toObject(e.copyrightString, r)),
                void 0 !== e.verticalPixelOffset &&
                  null !== e.verticalPixelOffset &&
                  e.hasOwnProperty('verticalPixelOffset') &&
                  (o.verticalPixelOffset = e.verticalPixelOffset),
                o
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.PopUpProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.isBalloonStyle = !1),
            (r.prototype.text = null),
            (r.prototype.backgroundColorAbgr = 4294967295),
            (r.prototype.textColorAbgr = 4278190080);
          var t = { 1: 'keyhole.dbroot.StringIdOrValueProto' };
          return (
            n.push(t),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var a = void 0 === r ? e.len : e.pos + r,
                  n = new i.keyhole.dbroot.PopUpProto();
                e.pos < a;

              ) {
                var l = e.uint32();
                switch (l >>> 3) {
                  case 1:
                    n.isBalloonStyle = e.bool();
                    break;
                  case 2:
                    n.text = t[1].decode(e, e.uint32());
                    break;
                  case 3:
                    n.backgroundColorAbgr = e.fixed32();
                    break;
                  case 4:
                    n.textColorAbgr = e.fixed32();
                    break;
                  default:
                    e.skipType(7 & l);
                }
              }
              return n;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if (
                void 0 !== e.isBalloonStyle &&
                'boolean' != typeof e.isBalloonStyle
              )
                return 'isBalloonStyle: boolean expected';
              if (void 0 !== e.text && null !== e.text) {
                var r = t[1].verify(e.text);
                if (r) return 'text.' + r;
              }
              return void 0 === e.backgroundColorAbgr ||
                a.isInteger(e.backgroundColorAbgr)
                ? void 0 === e.textColorAbgr || a.isInteger(e.textColorAbgr)
                  ? null
                  : 'textColorAbgr: integer expected'
                : 'backgroundColorAbgr: integer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.PopUpProto) return e;
                var r = new i.keyhole.dbroot.PopUpProto();
                if (
                  (void 0 !== e.isBalloonStyle &&
                    null !== e.isBalloonStyle &&
                    (r.isBalloonStyle = Boolean(e.isBalloonStyle)),
                  void 0 !== e.text && null !== e.text)
                ) {
                  if ('object' != typeof e.text)
                    throw TypeError(
                      '.keyhole.dbroot.PopUpProto.text: object expected',
                    );
                  r.text = t[1].fromObject(e.text);
                }
                return (
                  void 0 !== e.backgroundColorAbgr &&
                    null !== e.backgroundColorAbgr &&
                    (r.backgroundColorAbgr = e.backgroundColorAbgr >>> 0),
                  void 0 !== e.textColorAbgr &&
                    null !== e.textColorAbgr &&
                    (r.textColorAbgr = e.textColorAbgr >>> 0),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var o = {};
              return (
                r.defaults &&
                  ((o.isBalloonStyle = !1),
                  (o.text = null),
                  (o.backgroundColorAbgr = 4294967295),
                  (o.textColorAbgr = 4278190080)),
                void 0 !== e.isBalloonStyle &&
                  null !== e.isBalloonStyle &&
                  e.hasOwnProperty('isBalloonStyle') &&
                  (o.isBalloonStyle = e.isBalloonStyle),
                void 0 !== e.text &&
                  null !== e.text &&
                  e.hasOwnProperty('text') &&
                  (o.text = t[1].toObject(e.text, r)),
                void 0 !== e.backgroundColorAbgr &&
                  null !== e.backgroundColorAbgr &&
                  e.hasOwnProperty('backgroundColorAbgr') &&
                  (o.backgroundColorAbgr = e.backgroundColorAbgr),
                void 0 !== e.textColorAbgr &&
                  null !== e.textColorAbgr &&
                  e.hasOwnProperty('textColorAbgr') &&
                  (o.textColorAbgr = e.textColorAbgr),
                o
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.StyleAttributeProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.styleId = ''),
            (r.prototype.providerId = 0),
            (r.prototype.polyColorAbgr = 4294967295),
            (r.prototype.lineColorAbgr = 4294967295),
            (r.prototype.lineWidth = 1),
            (r.prototype.labelColorAbgr = 4294967295),
            (r.prototype.labelScale = 1),
            (r.prototype.placemarkIconColorAbgr = 4294967295),
            (r.prototype.placemarkIconScale = 1),
            (r.prototype.placemarkIconPath = null),
            (r.prototype.placemarkIconX = 0),
            (r.prototype.placemarkIconY = 0),
            (r.prototype.placemarkIconWidth = 32),
            (r.prototype.placemarkIconHeight = 32),
            (r.prototype.popUp = null),
            (r.prototype.drawFlag = a.emptyArray);
          var t = {
            9: 'keyhole.dbroot.StringIdOrValueProto',
            14: 'keyhole.dbroot.PopUpProto',
            15: 'keyhole.dbroot.DrawFlagProto',
          };
          return (
            n.push(t),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var a = void 0 === r ? e.len : e.pos + r,
                  n = new i.keyhole.dbroot.StyleAttributeProto();
                e.pos < a;

              ) {
                var l = e.uint32();
                switch (l >>> 3) {
                  case 1:
                    n.styleId = e.string();
                    break;
                  case 3:
                    n.providerId = e.int32();
                    break;
                  case 4:
                    n.polyColorAbgr = e.fixed32();
                    break;
                  case 5:
                    n.lineColorAbgr = e.fixed32();
                    break;
                  case 6:
                    n.lineWidth = e.float();
                    break;
                  case 7:
                    n.labelColorAbgr = e.fixed32();
                    break;
                  case 8:
                    n.labelScale = e.float();
                    break;
                  case 9:
                    n.placemarkIconColorAbgr = e.fixed32();
                    break;
                  case 10:
                    n.placemarkIconScale = e.float();
                    break;
                  case 11:
                    n.placemarkIconPath = t[9].decode(e, e.uint32());
                    break;
                  case 12:
                    n.placemarkIconX = e.int32();
                    break;
                  case 13:
                    n.placemarkIconY = e.int32();
                    break;
                  case 14:
                    n.placemarkIconWidth = e.int32();
                    break;
                  case 15:
                    n.placemarkIconHeight = e.int32();
                    break;
                  case 16:
                    n.popUp = t[14].decode(e, e.uint32());
                    break;
                  case 17:
                    (n.drawFlag && n.drawFlag.length) || (n.drawFlag = []),
                      n.drawFlag.push(t[15].decode(e, e.uint32()));
                    break;
                  default:
                    e.skipType(7 & l);
                }
              }
              return n;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if (!a.isString(e.styleId)) return 'styleId: string expected';
              if (void 0 !== e.providerId && !a.isInteger(e.providerId))
                return 'providerId: integer expected';
              if (void 0 !== e.polyColorAbgr && !a.isInteger(e.polyColorAbgr))
                return 'polyColorAbgr: integer expected';
              if (void 0 !== e.lineColorAbgr && !a.isInteger(e.lineColorAbgr))
                return 'lineColorAbgr: integer expected';
              if (void 0 !== e.lineWidth && 'number' != typeof e.lineWidth)
                return 'lineWidth: number expected';
              if (void 0 !== e.labelColorAbgr && !a.isInteger(e.labelColorAbgr))
                return 'labelColorAbgr: integer expected';
              if (void 0 !== e.labelScale && 'number' != typeof e.labelScale)
                return 'labelScale: number expected';
              if (
                void 0 !== e.placemarkIconColorAbgr &&
                !a.isInteger(e.placemarkIconColorAbgr)
              )
                return 'placemarkIconColorAbgr: integer expected';
              if (
                void 0 !== e.placemarkIconScale &&
                'number' != typeof e.placemarkIconScale
              )
                return 'placemarkIconScale: number expected';
              if (
                void 0 !== e.placemarkIconPath &&
                null !== e.placemarkIconPath &&
                (o = t[9].verify(e.placemarkIconPath))
              )
                return 'placemarkIconPath.' + o;
              if (void 0 !== e.placemarkIconX && !a.isInteger(e.placemarkIconX))
                return 'placemarkIconX: integer expected';
              if (void 0 !== e.placemarkIconY && !a.isInteger(e.placemarkIconY))
                return 'placemarkIconY: integer expected';
              if (
                void 0 !== e.placemarkIconWidth &&
                !a.isInteger(e.placemarkIconWidth)
              )
                return 'placemarkIconWidth: integer expected';
              if (
                void 0 !== e.placemarkIconHeight &&
                !a.isInteger(e.placemarkIconHeight)
              )
                return 'placemarkIconHeight: integer expected';
              if (
                void 0 !== e.popUp &&
                null !== e.popUp &&
                (o = t[14].verify(e.popUp))
              )
                return 'popUp.' + o;
              if (void 0 !== e.drawFlag) {
                if (!Array.isArray(e.drawFlag))
                  return 'drawFlag: array expected';
                for (var r = 0; r < e.drawFlag.length; ++r) {
                  var o;
                  if ((o = t[15].verify(e.drawFlag[r]))) return 'drawFlag.' + o;
                }
              }
              return null;
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.StyleAttributeProto) return e;
                var r = new i.keyhole.dbroot.StyleAttributeProto();
                if (
                  (void 0 !== e.styleId &&
                    null !== e.styleId &&
                    (r.styleId = String(e.styleId)),
                  void 0 !== e.providerId &&
                    null !== e.providerId &&
                    (r.providerId = 0 | e.providerId),
                  void 0 !== e.polyColorAbgr &&
                    null !== e.polyColorAbgr &&
                    (r.polyColorAbgr = e.polyColorAbgr >>> 0),
                  void 0 !== e.lineColorAbgr &&
                    null !== e.lineColorAbgr &&
                    (r.lineColorAbgr = e.lineColorAbgr >>> 0),
                  void 0 !== e.lineWidth &&
                    null !== e.lineWidth &&
                    (r.lineWidth = Number(e.lineWidth)),
                  void 0 !== e.labelColorAbgr &&
                    null !== e.labelColorAbgr &&
                    (r.labelColorAbgr = e.labelColorAbgr >>> 0),
                  void 0 !== e.labelScale &&
                    null !== e.labelScale &&
                    (r.labelScale = Number(e.labelScale)),
                  void 0 !== e.placemarkIconColorAbgr &&
                    null !== e.placemarkIconColorAbgr &&
                    (r.placemarkIconColorAbgr = e.placemarkIconColorAbgr >>> 0),
                  void 0 !== e.placemarkIconScale &&
                    null !== e.placemarkIconScale &&
                    (r.placemarkIconScale = Number(e.placemarkIconScale)),
                  void 0 !== e.placemarkIconPath &&
                    null !== e.placemarkIconPath)
                ) {
                  if ('object' != typeof e.placemarkIconPath)
                    throw TypeError(
                      '.keyhole.dbroot.StyleAttributeProto.placemarkIconPath: object expected',
                    );
                  r.placemarkIconPath = t[9].fromObject(e.placemarkIconPath);
                }
                if (
                  (void 0 !== e.placemarkIconX &&
                    null !== e.placemarkIconX &&
                    (r.placemarkIconX = 0 | e.placemarkIconX),
                  void 0 !== e.placemarkIconY &&
                    null !== e.placemarkIconY &&
                    (r.placemarkIconY = 0 | e.placemarkIconY),
                  void 0 !== e.placemarkIconWidth &&
                    null !== e.placemarkIconWidth &&
                    (r.placemarkIconWidth = 0 | e.placemarkIconWidth),
                  void 0 !== e.placemarkIconHeight &&
                    null !== e.placemarkIconHeight &&
                    (r.placemarkIconHeight = 0 | e.placemarkIconHeight),
                  void 0 !== e.popUp && null !== e.popUp)
                ) {
                  if ('object' != typeof e.popUp)
                    throw TypeError(
                      '.keyhole.dbroot.StyleAttributeProto.popUp: object expected',
                    );
                  r.popUp = t[14].fromObject(e.popUp);
                }
                if (e.drawFlag) {
                  if (!Array.isArray(e.drawFlag))
                    throw TypeError(
                      '.keyhole.dbroot.StyleAttributeProto.drawFlag: array expected',
                    );
                  r.drawFlag = [];
                  for (var o = 0; o < e.drawFlag.length; ++o) {
                    if ('object' != typeof e.drawFlag[o])
                      throw TypeError(
                        '.keyhole.dbroot.StyleAttributeProto.drawFlag: object expected',
                      );
                    r.drawFlag[o] = t[15].fromObject(e.drawFlag[o]);
                  }
                }
                return r;
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var o = {};
              if (
                ((r.arrays || r.defaults) && (o.drawFlag = []),
                r.defaults &&
                  ((o.styleId = ''),
                  (o.providerId = 0),
                  (o.polyColorAbgr = 4294967295),
                  (o.lineColorAbgr = 4294967295),
                  (o.lineWidth = 1),
                  (o.labelColorAbgr = 4294967295),
                  (o.labelScale = 1),
                  (o.placemarkIconColorAbgr = 4294967295),
                  (o.placemarkIconScale = 1),
                  (o.placemarkIconPath = null),
                  (o.placemarkIconX = 0),
                  (o.placemarkIconY = 0),
                  (o.placemarkIconWidth = 32),
                  (o.placemarkIconHeight = 32),
                  (o.popUp = null)),
                void 0 !== e.styleId &&
                  null !== e.styleId &&
                  e.hasOwnProperty('styleId') &&
                  (o.styleId = e.styleId),
                void 0 !== e.providerId &&
                  null !== e.providerId &&
                  e.hasOwnProperty('providerId') &&
                  (o.providerId = e.providerId),
                void 0 !== e.polyColorAbgr &&
                  null !== e.polyColorAbgr &&
                  e.hasOwnProperty('polyColorAbgr') &&
                  (o.polyColorAbgr = e.polyColorAbgr),
                void 0 !== e.lineColorAbgr &&
                  null !== e.lineColorAbgr &&
                  e.hasOwnProperty('lineColorAbgr') &&
                  (o.lineColorAbgr = e.lineColorAbgr),
                void 0 !== e.lineWidth &&
                  null !== e.lineWidth &&
                  e.hasOwnProperty('lineWidth') &&
                  (o.lineWidth = e.lineWidth),
                void 0 !== e.labelColorAbgr &&
                  null !== e.labelColorAbgr &&
                  e.hasOwnProperty('labelColorAbgr') &&
                  (o.labelColorAbgr = e.labelColorAbgr),
                void 0 !== e.labelScale &&
                  null !== e.labelScale &&
                  e.hasOwnProperty('labelScale') &&
                  (o.labelScale = e.labelScale),
                void 0 !== e.placemarkIconColorAbgr &&
                  null !== e.placemarkIconColorAbgr &&
                  e.hasOwnProperty('placemarkIconColorAbgr') &&
                  (o.placemarkIconColorAbgr = e.placemarkIconColorAbgr),
                void 0 !== e.placemarkIconScale &&
                  null !== e.placemarkIconScale &&
                  e.hasOwnProperty('placemarkIconScale') &&
                  (o.placemarkIconScale = e.placemarkIconScale),
                void 0 !== e.placemarkIconPath &&
                  null !== e.placemarkIconPath &&
                  e.hasOwnProperty('placemarkIconPath') &&
                  (o.placemarkIconPath = t[9].toObject(e.placemarkIconPath, r)),
                void 0 !== e.placemarkIconX &&
                  null !== e.placemarkIconX &&
                  e.hasOwnProperty('placemarkIconX') &&
                  (o.placemarkIconX = e.placemarkIconX),
                void 0 !== e.placemarkIconY &&
                  null !== e.placemarkIconY &&
                  e.hasOwnProperty('placemarkIconY') &&
                  (o.placemarkIconY = e.placemarkIconY),
                void 0 !== e.placemarkIconWidth &&
                  null !== e.placemarkIconWidth &&
                  e.hasOwnProperty('placemarkIconWidth') &&
                  (o.placemarkIconWidth = e.placemarkIconWidth),
                void 0 !== e.placemarkIconHeight &&
                  null !== e.placemarkIconHeight &&
                  e.hasOwnProperty('placemarkIconHeight') &&
                  (o.placemarkIconHeight = e.placemarkIconHeight),
                void 0 !== e.popUp &&
                  null !== e.popUp &&
                  e.hasOwnProperty('popUp') &&
                  (o.popUp = t[14].toObject(e.popUp, r)),
                void 0 !== e.drawFlag &&
                  null !== e.drawFlag &&
                  e.hasOwnProperty('drawFlag'))
              ) {
                o.drawFlag = [];
                for (var a = 0; a < e.drawFlag.length; ++a)
                  o.drawFlag[a] = t[15].toObject(e.drawFlag[a], r);
              }
              return o;
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.StyleMapProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.styleMapId = 0),
            (r.prototype.channelId = a.emptyArray),
            (r.prototype.normalStyleAttribute = 0),
            (r.prototype.highlightStyleAttribute = 0),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.StyleMapProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.styleMapId = e.int32();
                    break;
                  case 2:
                    if (
                      ((a.channelId && a.channelId.length) ||
                        (a.channelId = []),
                      2 == (7 & n))
                    )
                      for (var l = e.uint32() + e.pos; e.pos < l; )
                        a.channelId.push(e.int32());
                    else a.channelId.push(e.int32());
                    break;
                  case 3:
                    a.normalStyleAttribute = e.int32();
                    break;
                  case 4:
                    a.highlightStyleAttribute = e.int32();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if (!a.isInteger(e.styleMapId))
                return 'styleMapId: integer expected';
              if (void 0 !== e.channelId) {
                if (!Array.isArray(e.channelId))
                  return 'channelId: array expected';
                for (var r = 0; r < e.channelId.length; ++r)
                  if (!a.isInteger(e.channelId[r]))
                    return 'channelId: integer[] expected';
              }
              return void 0 === e.normalStyleAttribute ||
                a.isInteger(e.normalStyleAttribute)
                ? void 0 === e.highlightStyleAttribute ||
                  a.isInteger(e.highlightStyleAttribute)
                  ? null
                  : 'highlightStyleAttribute: integer expected'
                : 'normalStyleAttribute: integer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.StyleMapProto) return e;
                var r = new i.keyhole.dbroot.StyleMapProto();
                if (
                  (void 0 !== e.styleMapId &&
                    null !== e.styleMapId &&
                    (r.styleMapId = 0 | e.styleMapId),
                  e.channelId)
                ) {
                  if (!Array.isArray(e.channelId))
                    throw TypeError(
                      '.keyhole.dbroot.StyleMapProto.channelId: array expected',
                    );
                  r.channelId = [];
                  for (var t = 0; t < e.channelId.length; ++t)
                    r.channelId[t] = 0 | e.channelId[t];
                }
                return (
                  void 0 !== e.normalStyleAttribute &&
                    null !== e.normalStyleAttribute &&
                    (r.normalStyleAttribute = 0 | e.normalStyleAttribute),
                  void 0 !== e.highlightStyleAttribute &&
                    null !== e.highlightStyleAttribute &&
                    (r.highlightStyleAttribute = 0 | e.highlightStyleAttribute),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              if (
                ((r.arrays || r.defaults) && (t.channelId = []),
                r.defaults &&
                  ((t.styleMapId = 0),
                  (t.normalStyleAttribute = 0),
                  (t.highlightStyleAttribute = 0)),
                void 0 !== e.styleMapId &&
                  null !== e.styleMapId &&
                  e.hasOwnProperty('styleMapId') &&
                  (t.styleMapId = e.styleMapId),
                void 0 !== e.channelId &&
                  null !== e.channelId &&
                  e.hasOwnProperty('channelId'))
              ) {
                t.channelId = [];
                for (var o = 0; o < e.channelId.length; ++o)
                  t.channelId[o] = e.channelId[o];
              }
              return (
                void 0 !== e.normalStyleAttribute &&
                  null !== e.normalStyleAttribute &&
                  e.hasOwnProperty('normalStyleAttribute') &&
                  (t.normalStyleAttribute = e.normalStyleAttribute),
                void 0 !== e.highlightStyleAttribute &&
                  null !== e.highlightStyleAttribute &&
                  e.hasOwnProperty('highlightStyleAttribute') &&
                  (t.highlightStyleAttribute = e.highlightStyleAttribute),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.ZoomRangeProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.minZoom = 0),
            (r.prototype.maxZoom = 0),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.ZoomRangeProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.minZoom = e.int32();
                    break;
                  case 2:
                    a.maxZoom = e.int32();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : a.isInteger(e.minZoom)
                ? a.isInteger(e.maxZoom)
                  ? null
                  : 'maxZoom: integer expected'
                : 'minZoom: integer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.ZoomRangeProto) return e;
                var r = new i.keyhole.dbroot.ZoomRangeProto();
                return (
                  void 0 !== e.minZoom &&
                    null !== e.minZoom &&
                    (r.minZoom = 0 | e.minZoom),
                  void 0 !== e.maxZoom &&
                    null !== e.maxZoom &&
                    (r.maxZoom = 0 | e.maxZoom),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults && ((t.minZoom = 0), (t.maxZoom = 0)),
                void 0 !== e.minZoom &&
                  null !== e.minZoom &&
                  e.hasOwnProperty('minZoom') &&
                  (t.minZoom = e.minZoom),
                void 0 !== e.maxZoom &&
                  null !== e.maxZoom &&
                  e.hasOwnProperty('maxZoom') &&
                  (t.maxZoom = e.maxZoom),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.DrawFlagProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          r.prototype.drawFlagType = 1;
          var t,
            a = { 0: 'keyhole.dbroot.DrawFlagProto.DrawFlagType' };
          return (
            n.push(a),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.DrawFlagProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                if (n >>> 3 == 1) a.drawFlagType = e.uint32();
                else e.skipType(7 & n);
              }
              return a;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              switch (e.drawFlagType) {
                default:
                  return 'drawFlagType: enum value expected';
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
              }
              return null;
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.DrawFlagProto) return e;
                var r = new i.keyhole.dbroot.DrawFlagProto();
                switch (e.drawFlagType) {
                  case 'TYPE_FILL_ONLY':
                  case 1:
                    r.drawFlagType = 1;
                    break;
                  case 'TYPE_OUTLINE_ONLY':
                  case 2:
                    r.drawFlagType = 2;
                    break;
                  case 'TYPE_FILL_AND_OUTLINE':
                  case 3:
                    r.drawFlagType = 3;
                    break;
                  case 'TYPE_ANTIALIASING':
                  case 4:
                    r.drawFlagType = 4;
                    break;
                  case 'TYPE_CENTER_LABEL':
                  case 5:
                    r.drawFlagType = 5;
                }
                return r;
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults &&
                  (t.drawFlagType = r.enums === String ? 'TYPE_FILL_ONLY' : 1),
                void 0 !== e.drawFlagType &&
                  null !== e.drawFlagType &&
                  e.hasOwnProperty('drawFlagType') &&
                  (t.drawFlagType =
                    r.enums === String ? a[0][e.drawFlagType] : e.drawFlagType),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            (r.DrawFlagType =
              (((t = Object.create({})).TYPE_FILL_ONLY = 1),
              (t.TYPE_OUTLINE_ONLY = 2),
              (t.TYPE_FILL_AND_OUTLINE = 3),
              (t.TYPE_ANTIALIASING = 4),
              (t.TYPE_CENTER_LABEL = 5),
              t)),
            r
          );
        })()),
        (r.LayerProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.zoomRange = a.emptyArray),
            (r.prototype.preserveTextLevel = 30),
            (r.prototype.lodBeginTransition = !1),
            (r.prototype.lodEndTransition = !1);
          var t = { 0: 'keyhole.dbroot.ZoomRangeProto' };
          return (
            n.push(t),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var a = void 0 === r ? e.len : e.pos + r,
                  n = new i.keyhole.dbroot.LayerProto();
                e.pos < a;

              ) {
                var l = e.uint32();
                switch (l >>> 3) {
                  case 1:
                    (n.zoomRange && n.zoomRange.length) || (n.zoomRange = []),
                      n.zoomRange.push(t[0].decode(e, e.uint32()));
                    break;
                  case 2:
                    n.preserveTextLevel = e.int32();
                    break;
                  case 4:
                    n.lodBeginTransition = e.bool();
                    break;
                  case 5:
                    n.lodEndTransition = e.bool();
                    break;
                  default:
                    e.skipType(7 & l);
                }
              }
              return n;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if (void 0 !== e.zoomRange) {
                if (!Array.isArray(e.zoomRange))
                  return 'zoomRange: array expected';
                for (var r = 0; r < e.zoomRange.length; ++r) {
                  var o = t[0].verify(e.zoomRange[r]);
                  if (o) return 'zoomRange.' + o;
                }
              }
              return void 0 === e.preserveTextLevel ||
                a.isInteger(e.preserveTextLevel)
                ? void 0 !== e.lodBeginTransition &&
                  'boolean' != typeof e.lodBeginTransition
                  ? 'lodBeginTransition: boolean expected'
                  : void 0 !== e.lodEndTransition &&
                    'boolean' != typeof e.lodEndTransition
                  ? 'lodEndTransition: boolean expected'
                  : null
                : 'preserveTextLevel: integer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.LayerProto) return e;
                var r = new i.keyhole.dbroot.LayerProto();
                if (e.zoomRange) {
                  if (!Array.isArray(e.zoomRange))
                    throw TypeError(
                      '.keyhole.dbroot.LayerProto.zoomRange: array expected',
                    );
                  r.zoomRange = [];
                  for (var o = 0; o < e.zoomRange.length; ++o) {
                    if ('object' != typeof e.zoomRange[o])
                      throw TypeError(
                        '.keyhole.dbroot.LayerProto.zoomRange: object expected',
                      );
                    r.zoomRange[o] = t[0].fromObject(e.zoomRange[o]);
                  }
                }
                return (
                  void 0 !== e.preserveTextLevel &&
                    null !== e.preserveTextLevel &&
                    (r.preserveTextLevel = 0 | e.preserveTextLevel),
                  void 0 !== e.lodBeginTransition &&
                    null !== e.lodBeginTransition &&
                    (r.lodBeginTransition = Boolean(e.lodBeginTransition)),
                  void 0 !== e.lodEndTransition &&
                    null !== e.lodEndTransition &&
                    (r.lodEndTransition = Boolean(e.lodEndTransition)),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var o = {};
              if (
                ((r.arrays || r.defaults) && (o.zoomRange = []),
                r.defaults &&
                  ((o.preserveTextLevel = 30),
                  (o.lodBeginTransition = !1),
                  (o.lodEndTransition = !1)),
                void 0 !== e.zoomRange &&
                  null !== e.zoomRange &&
                  e.hasOwnProperty('zoomRange'))
              ) {
                o.zoomRange = [];
                for (var a = 0; a < e.zoomRange.length; ++a)
                  o.zoomRange[a] = t[0].toObject(e.zoomRange[a], r);
              }
              return (
                void 0 !== e.preserveTextLevel &&
                  null !== e.preserveTextLevel &&
                  e.hasOwnProperty('preserveTextLevel') &&
                  (o.preserveTextLevel = e.preserveTextLevel),
                void 0 !== e.lodBeginTransition &&
                  null !== e.lodBeginTransition &&
                  e.hasOwnProperty('lodBeginTransition') &&
                  (o.lodBeginTransition = e.lodBeginTransition),
                void 0 !== e.lodEndTransition &&
                  null !== e.lodEndTransition &&
                  e.hasOwnProperty('lodEndTransition') &&
                  (o.lodEndTransition = e.lodEndTransition),
                o
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.FolderProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.isExpandable = !0),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.FolderProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                if (n >>> 3 == 1) a.isExpandable = e.bool();
                else e.skipType(7 & n);
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : void 0 !== e.isExpandable &&
                  'boolean' != typeof e.isExpandable
                ? 'isExpandable: boolean expected'
                : null;
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.FolderProto) return e;
                var r = new i.keyhole.dbroot.FolderProto();
                return (
                  void 0 !== e.isExpandable &&
                    null !== e.isExpandable &&
                    (r.isExpandable = Boolean(e.isExpandable)),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults && (t.isExpandable = !0),
                void 0 !== e.isExpandable &&
                  null !== e.isExpandable &&
                  e.hasOwnProperty('isExpandable') &&
                  (t.isExpandable = e.isExpandable),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.RequirementProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.requiredVram = ''),
            (r.prototype.requiredClientVer = ''),
            (r.prototype.probability = ''),
            (r.prototype.requiredUserAgent = ''),
            (r.prototype.requiredClientCapabilities = ''),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.RequirementProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 3:
                    a.requiredVram = e.string();
                    break;
                  case 4:
                    a.requiredClientVer = e.string();
                    break;
                  case 5:
                    a.probability = e.string();
                    break;
                  case 6:
                    a.requiredUserAgent = e.string();
                    break;
                  case 7:
                    a.requiredClientCapabilities = e.string();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : void 0 === e.requiredVram || a.isString(e.requiredVram)
                ? void 0 === e.requiredClientVer ||
                  a.isString(e.requiredClientVer)
                  ? void 0 === e.probability || a.isString(e.probability)
                    ? void 0 === e.requiredUserAgent ||
                      a.isString(e.requiredUserAgent)
                      ? void 0 === e.requiredClientCapabilities ||
                        a.isString(e.requiredClientCapabilities)
                        ? null
                        : 'requiredClientCapabilities: string expected'
                      : 'requiredUserAgent: string expected'
                    : 'probability: string expected'
                  : 'requiredClientVer: string expected'
                : 'requiredVram: string expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.RequirementProto) return e;
                var r = new i.keyhole.dbroot.RequirementProto();
                return (
                  void 0 !== e.requiredVram &&
                    null !== e.requiredVram &&
                    (r.requiredVram = String(e.requiredVram)),
                  void 0 !== e.requiredClientVer &&
                    null !== e.requiredClientVer &&
                    (r.requiredClientVer = String(e.requiredClientVer)),
                  void 0 !== e.probability &&
                    null !== e.probability &&
                    (r.probability = String(e.probability)),
                  void 0 !== e.requiredUserAgent &&
                    null !== e.requiredUserAgent &&
                    (r.requiredUserAgent = String(e.requiredUserAgent)),
                  void 0 !== e.requiredClientCapabilities &&
                    null !== e.requiredClientCapabilities &&
                    (r.requiredClientCapabilities = String(
                      e.requiredClientCapabilities,
                    )),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults &&
                  ((t.requiredVram = ''),
                  (t.requiredClientVer = ''),
                  (t.probability = ''),
                  (t.requiredUserAgent = ''),
                  (t.requiredClientCapabilities = '')),
                void 0 !== e.requiredVram &&
                  null !== e.requiredVram &&
                  e.hasOwnProperty('requiredVram') &&
                  (t.requiredVram = e.requiredVram),
                void 0 !== e.requiredClientVer &&
                  null !== e.requiredClientVer &&
                  e.hasOwnProperty('requiredClientVer') &&
                  (t.requiredClientVer = e.requiredClientVer),
                void 0 !== e.probability &&
                  null !== e.probability &&
                  e.hasOwnProperty('probability') &&
                  (t.probability = e.probability),
                void 0 !== e.requiredUserAgent &&
                  null !== e.requiredUserAgent &&
                  e.hasOwnProperty('requiredUserAgent') &&
                  (t.requiredUserAgent = e.requiredUserAgent),
                void 0 !== e.requiredClientCapabilities &&
                  null !== e.requiredClientCapabilities &&
                  e.hasOwnProperty('requiredClientCapabilities') &&
                  (t.requiredClientCapabilities = e.requiredClientCapabilities),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.LookAtProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.longitude = 0),
            (r.prototype.latitude = 0),
            (r.prototype.range = 0),
            (r.prototype.tilt = 0),
            (r.prototype.heading = 0),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.LookAtProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.longitude = e.float();
                    break;
                  case 2:
                    a.latitude = e.float();
                    break;
                  case 3:
                    a.range = e.float();
                    break;
                  case 4:
                    a.tilt = e.float();
                    break;
                  case 5:
                    a.heading = e.float();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : 'number' != typeof e.longitude
                ? 'longitude: number expected'
                : 'number' != typeof e.latitude
                ? 'latitude: number expected'
                : void 0 !== e.range && 'number' != typeof e.range
                ? 'range: number expected'
                : void 0 !== e.tilt && 'number' != typeof e.tilt
                ? 'tilt: number expected'
                : void 0 !== e.heading && 'number' != typeof e.heading
                ? 'heading: number expected'
                : null;
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.LookAtProto) return e;
                var r = new i.keyhole.dbroot.LookAtProto();
                return (
                  void 0 !== e.longitude &&
                    null !== e.longitude &&
                    (r.longitude = Number(e.longitude)),
                  void 0 !== e.latitude &&
                    null !== e.latitude &&
                    (r.latitude = Number(e.latitude)),
                  void 0 !== e.range &&
                    null !== e.range &&
                    (r.range = Number(e.range)),
                  void 0 !== e.tilt &&
                    null !== e.tilt &&
                    (r.tilt = Number(e.tilt)),
                  void 0 !== e.heading &&
                    null !== e.heading &&
                    (r.heading = Number(e.heading)),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults &&
                  ((t.longitude = 0),
                  (t.latitude = 0),
                  (t.range = 0),
                  (t.tilt = 0),
                  (t.heading = 0)),
                void 0 !== e.longitude &&
                  null !== e.longitude &&
                  e.hasOwnProperty('longitude') &&
                  (t.longitude = e.longitude),
                void 0 !== e.latitude &&
                  null !== e.latitude &&
                  e.hasOwnProperty('latitude') &&
                  (t.latitude = e.latitude),
                void 0 !== e.range &&
                  null !== e.range &&
                  e.hasOwnProperty('range') &&
                  (t.range = e.range),
                void 0 !== e.tilt &&
                  null !== e.tilt &&
                  e.hasOwnProperty('tilt') &&
                  (t.tilt = e.tilt),
                void 0 !== e.heading &&
                  null !== e.heading &&
                  e.hasOwnProperty('heading') &&
                  (t.heading = e.heading),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.NestedFeatureProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.featureType = 1),
            (r.prototype.kmlUrl = null),
            (r.prototype.databaseUrl = ''),
            (r.prototype.layer = null),
            (r.prototype.folder = null),
            (r.prototype.requirement = null),
            (r.prototype.channelId = 0),
            (r.prototype.displayName = null),
            (r.prototype.isVisible = !0),
            (r.prototype.isEnabled = !0),
            (r.prototype.isChecked = !1),
            (r.prototype.layerMenuIconPath = 'icons/773_l.png'),
            (r.prototype.description = null),
            (r.prototype.lookAt = null),
            (r.prototype.assetUuid = ''),
            (r.prototype.isSaveLocked = !0),
            (r.prototype.children = a.emptyArray),
            (r.prototype.clientConfigScriptName = ''),
            (r.prototype.dioramaDataChannelBase = -1),
            (r.prototype.replicaDataChannelBase = -1);
          var t,
            l = {
              0: 'keyhole.dbroot.NestedFeatureProto.FeatureType',
              1: 'keyhole.dbroot.StringIdOrValueProto',
              3: 'keyhole.dbroot.LayerProto',
              4: 'keyhole.dbroot.FolderProto',
              5: 'keyhole.dbroot.RequirementProto',
              7: 'keyhole.dbroot.StringIdOrValueProto',
              12: 'keyhole.dbroot.StringIdOrValueProto',
              13: 'keyhole.dbroot.LookAtProto',
              16: 'keyhole.dbroot.NestedFeatureProto',
            };
          return (
            n.push(l),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.NestedFeatureProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.featureType = e.uint32();
                    break;
                  case 2:
                    a.kmlUrl = l[1].decode(e, e.uint32());
                    break;
                  case 21:
                    a.databaseUrl = e.string();
                    break;
                  case 3:
                    a.layer = l[3].decode(e, e.uint32());
                    break;
                  case 4:
                    a.folder = l[4].decode(e, e.uint32());
                    break;
                  case 5:
                    a.requirement = l[5].decode(e, e.uint32());
                    break;
                  case 6:
                    a.channelId = e.int32();
                    break;
                  case 7:
                    a.displayName = l[7].decode(e, e.uint32());
                    break;
                  case 8:
                    a.isVisible = e.bool();
                    break;
                  case 9:
                    a.isEnabled = e.bool();
                    break;
                  case 10:
                    a.isChecked = e.bool();
                    break;
                  case 11:
                    a.layerMenuIconPath = e.string();
                    break;
                  case 12:
                    a.description = l[12].decode(e, e.uint32());
                    break;
                  case 13:
                    a.lookAt = l[13].decode(e, e.uint32());
                    break;
                  case 15:
                    a.assetUuid = e.string();
                    break;
                  case 16:
                    a.isSaveLocked = e.bool();
                    break;
                  case 17:
                    (a.children && a.children.length) || (a.children = []),
                      a.children.push(l[16].decode(e, e.uint32()));
                    break;
                  case 18:
                    a.clientConfigScriptName = e.string();
                    break;
                  case 19:
                    a.dioramaDataChannelBase = e.int32();
                    break;
                  case 20:
                    a.replicaDataChannelBase = e.int32();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if (void 0 !== e.featureType)
                switch (e.featureType) {
                  default:
                    return 'featureType: enum value expected';
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                }
              if (
                void 0 !== e.kmlUrl &&
                null !== e.kmlUrl &&
                (t = l[1].verify(e.kmlUrl))
              )
                return 'kmlUrl.' + t;
              if (void 0 !== e.databaseUrl && !a.isString(e.databaseUrl))
                return 'databaseUrl: string expected';
              if (
                void 0 !== e.layer &&
                null !== e.layer &&
                (t = l[3].verify(e.layer))
              )
                return 'layer.' + t;
              if (
                void 0 !== e.folder &&
                null !== e.folder &&
                (t = l[4].verify(e.folder))
              )
                return 'folder.' + t;
              if (
                void 0 !== e.requirement &&
                null !== e.requirement &&
                (t = l[5].verify(e.requirement))
              )
                return 'requirement.' + t;
              if (!a.isInteger(e.channelId))
                return 'channelId: integer expected';
              if (
                void 0 !== e.displayName &&
                null !== e.displayName &&
                (t = l[7].verify(e.displayName))
              )
                return 'displayName.' + t;
              if (void 0 !== e.isVisible && 'boolean' != typeof e.isVisible)
                return 'isVisible: boolean expected';
              if (void 0 !== e.isEnabled && 'boolean' != typeof e.isEnabled)
                return 'isEnabled: boolean expected';
              if (void 0 !== e.isChecked && 'boolean' != typeof e.isChecked)
                return 'isChecked: boolean expected';
              if (
                void 0 !== e.layerMenuIconPath &&
                !a.isString(e.layerMenuIconPath)
              )
                return 'layerMenuIconPath: string expected';
              if (
                void 0 !== e.description &&
                null !== e.description &&
                (t = l[12].verify(e.description))
              )
                return 'description.' + t;
              if (
                void 0 !== e.lookAt &&
                null !== e.lookAt &&
                (t = l[13].verify(e.lookAt))
              )
                return 'lookAt.' + t;
              if (void 0 !== e.assetUuid && !a.isString(e.assetUuid))
                return 'assetUuid: string expected';
              if (
                void 0 !== e.isSaveLocked &&
                'boolean' != typeof e.isSaveLocked
              )
                return 'isSaveLocked: boolean expected';
              if (void 0 !== e.children) {
                if (!Array.isArray(e.children))
                  return 'children: array expected';
                for (var r = 0; r < e.children.length; ++r) {
                  var t;
                  if ((t = l[16].verify(e.children[r]))) return 'children.' + t;
                }
              }
              return void 0 === e.clientConfigScriptName ||
                a.isString(e.clientConfigScriptName)
                ? void 0 === e.dioramaDataChannelBase ||
                  a.isInteger(e.dioramaDataChannelBase)
                  ? void 0 === e.replicaDataChannelBase ||
                    a.isInteger(e.replicaDataChannelBase)
                    ? null
                    : 'replicaDataChannelBase: integer expected'
                  : 'dioramaDataChannelBase: integer expected'
                : 'clientConfigScriptName: string expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.NestedFeatureProto) return e;
                var r = new i.keyhole.dbroot.NestedFeatureProto();
                switch (e.featureType) {
                  case 'TYPE_POINT_Z':
                  case 1:
                    r.featureType = 1;
                    break;
                  case 'TYPE_POLYGON_Z':
                  case 2:
                    r.featureType = 2;
                    break;
                  case 'TYPE_LINE_Z':
                  case 3:
                    r.featureType = 3;
                    break;
                  case 'TYPE_TERRAIN':
                  case 4:
                    r.featureType = 4;
                }
                if (void 0 !== e.kmlUrl && null !== e.kmlUrl) {
                  if ('object' != typeof e.kmlUrl)
                    throw TypeError(
                      '.keyhole.dbroot.NestedFeatureProto.kmlUrl: object expected',
                    );
                  r.kmlUrl = l[1].fromObject(e.kmlUrl);
                }
                if (
                  (void 0 !== e.databaseUrl &&
                    null !== e.databaseUrl &&
                    (r.databaseUrl = String(e.databaseUrl)),
                  void 0 !== e.layer && null !== e.layer)
                ) {
                  if ('object' != typeof e.layer)
                    throw TypeError(
                      '.keyhole.dbroot.NestedFeatureProto.layer: object expected',
                    );
                  r.layer = l[3].fromObject(e.layer);
                }
                if (void 0 !== e.folder && null !== e.folder) {
                  if ('object' != typeof e.folder)
                    throw TypeError(
                      '.keyhole.dbroot.NestedFeatureProto.folder: object expected',
                    );
                  r.folder = l[4].fromObject(e.folder);
                }
                if (void 0 !== e.requirement && null !== e.requirement) {
                  if ('object' != typeof e.requirement)
                    throw TypeError(
                      '.keyhole.dbroot.NestedFeatureProto.requirement: object expected',
                    );
                  r.requirement = l[5].fromObject(e.requirement);
                }
                if (
                  (void 0 !== e.channelId &&
                    null !== e.channelId &&
                    (r.channelId = 0 | e.channelId),
                  void 0 !== e.displayName && null !== e.displayName)
                ) {
                  if ('object' != typeof e.displayName)
                    throw TypeError(
                      '.keyhole.dbroot.NestedFeatureProto.displayName: object expected',
                    );
                  r.displayName = l[7].fromObject(e.displayName);
                }
                if (
                  (void 0 !== e.isVisible &&
                    null !== e.isVisible &&
                    (r.isVisible = Boolean(e.isVisible)),
                  void 0 !== e.isEnabled &&
                    null !== e.isEnabled &&
                    (r.isEnabled = Boolean(e.isEnabled)),
                  void 0 !== e.isChecked &&
                    null !== e.isChecked &&
                    (r.isChecked = Boolean(e.isChecked)),
                  void 0 !== e.layerMenuIconPath &&
                    null !== e.layerMenuIconPath &&
                    (r.layerMenuIconPath = String(e.layerMenuIconPath)),
                  void 0 !== e.description && null !== e.description)
                ) {
                  if ('object' != typeof e.description)
                    throw TypeError(
                      '.keyhole.dbroot.NestedFeatureProto.description: object expected',
                    );
                  r.description = l[12].fromObject(e.description);
                }
                if (void 0 !== e.lookAt && null !== e.lookAt) {
                  if ('object' != typeof e.lookAt)
                    throw TypeError(
                      '.keyhole.dbroot.NestedFeatureProto.lookAt: object expected',
                    );
                  r.lookAt = l[13].fromObject(e.lookAt);
                }
                if (
                  (void 0 !== e.assetUuid &&
                    null !== e.assetUuid &&
                    (r.assetUuid = String(e.assetUuid)),
                  void 0 !== e.isSaveLocked &&
                    null !== e.isSaveLocked &&
                    (r.isSaveLocked = Boolean(e.isSaveLocked)),
                  e.children)
                ) {
                  if (!Array.isArray(e.children))
                    throw TypeError(
                      '.keyhole.dbroot.NestedFeatureProto.children: array expected',
                    );
                  r.children = [];
                  for (var t = 0; t < e.children.length; ++t) {
                    if ('object' != typeof e.children[t])
                      throw TypeError(
                        '.keyhole.dbroot.NestedFeatureProto.children: object expected',
                      );
                    r.children[t] = l[16].fromObject(e.children[t]);
                  }
                }
                return (
                  void 0 !== e.clientConfigScriptName &&
                    null !== e.clientConfigScriptName &&
                    (r.clientConfigScriptName = String(
                      e.clientConfigScriptName,
                    )),
                  void 0 !== e.dioramaDataChannelBase &&
                    null !== e.dioramaDataChannelBase &&
                    (r.dioramaDataChannelBase = 0 | e.dioramaDataChannelBase),
                  void 0 !== e.replicaDataChannelBase &&
                    null !== e.replicaDataChannelBase &&
                    (r.replicaDataChannelBase = 0 | e.replicaDataChannelBase),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              if (
                ((r.arrays || r.defaults) && (t.children = []),
                r.defaults &&
                  ((t.featureType = r.enums === String ? 'TYPE_POINT_Z' : 1),
                  (t.kmlUrl = null),
                  (t.databaseUrl = ''),
                  (t.layer = null),
                  (t.folder = null),
                  (t.requirement = null),
                  (t.channelId = 0),
                  (t.displayName = null),
                  (t.isVisible = !0),
                  (t.isEnabled = !0),
                  (t.isChecked = !1),
                  (t.layerMenuIconPath = 'icons/773_l.png'),
                  (t.description = null),
                  (t.lookAt = null),
                  (t.assetUuid = ''),
                  (t.isSaveLocked = !0),
                  (t.clientConfigScriptName = ''),
                  (t.dioramaDataChannelBase = -1),
                  (t.replicaDataChannelBase = -1)),
                void 0 !== e.featureType &&
                  null !== e.featureType &&
                  e.hasOwnProperty('featureType') &&
                  (t.featureType =
                    r.enums === String ? l[0][e.featureType] : e.featureType),
                void 0 !== e.kmlUrl &&
                  null !== e.kmlUrl &&
                  e.hasOwnProperty('kmlUrl') &&
                  (t.kmlUrl = l[1].toObject(e.kmlUrl, r)),
                void 0 !== e.databaseUrl &&
                  null !== e.databaseUrl &&
                  e.hasOwnProperty('databaseUrl') &&
                  (t.databaseUrl = e.databaseUrl),
                void 0 !== e.layer &&
                  null !== e.layer &&
                  e.hasOwnProperty('layer') &&
                  (t.layer = l[3].toObject(e.layer, r)),
                void 0 !== e.folder &&
                  null !== e.folder &&
                  e.hasOwnProperty('folder') &&
                  (t.folder = l[4].toObject(e.folder, r)),
                void 0 !== e.requirement &&
                  null !== e.requirement &&
                  e.hasOwnProperty('requirement') &&
                  (t.requirement = l[5].toObject(e.requirement, r)),
                void 0 !== e.channelId &&
                  null !== e.channelId &&
                  e.hasOwnProperty('channelId') &&
                  (t.channelId = e.channelId),
                void 0 !== e.displayName &&
                  null !== e.displayName &&
                  e.hasOwnProperty('displayName') &&
                  (t.displayName = l[7].toObject(e.displayName, r)),
                void 0 !== e.isVisible &&
                  null !== e.isVisible &&
                  e.hasOwnProperty('isVisible') &&
                  (t.isVisible = e.isVisible),
                void 0 !== e.isEnabled &&
                  null !== e.isEnabled &&
                  e.hasOwnProperty('isEnabled') &&
                  (t.isEnabled = e.isEnabled),
                void 0 !== e.isChecked &&
                  null !== e.isChecked &&
                  e.hasOwnProperty('isChecked') &&
                  (t.isChecked = e.isChecked),
                void 0 !== e.layerMenuIconPath &&
                  null !== e.layerMenuIconPath &&
                  e.hasOwnProperty('layerMenuIconPath') &&
                  (t.layerMenuIconPath = e.layerMenuIconPath),
                void 0 !== e.description &&
                  null !== e.description &&
                  e.hasOwnProperty('description') &&
                  (t.description = l[12].toObject(e.description, r)),
                void 0 !== e.lookAt &&
                  null !== e.lookAt &&
                  e.hasOwnProperty('lookAt') &&
                  (t.lookAt = l[13].toObject(e.lookAt, r)),
                void 0 !== e.assetUuid &&
                  null !== e.assetUuid &&
                  e.hasOwnProperty('assetUuid') &&
                  (t.assetUuid = e.assetUuid),
                void 0 !== e.isSaveLocked &&
                  null !== e.isSaveLocked &&
                  e.hasOwnProperty('isSaveLocked') &&
                  (t.isSaveLocked = e.isSaveLocked),
                void 0 !== e.children &&
                  null !== e.children &&
                  e.hasOwnProperty('children'))
              ) {
                t.children = [];
                for (var o = 0; o < e.children.length; ++o)
                  t.children[o] = l[16].toObject(e.children[o], r);
              }
              return (
                void 0 !== e.clientConfigScriptName &&
                  null !== e.clientConfigScriptName &&
                  e.hasOwnProperty('clientConfigScriptName') &&
                  (t.clientConfigScriptName = e.clientConfigScriptName),
                void 0 !== e.dioramaDataChannelBase &&
                  null !== e.dioramaDataChannelBase &&
                  e.hasOwnProperty('dioramaDataChannelBase') &&
                  (t.dioramaDataChannelBase = e.dioramaDataChannelBase),
                void 0 !== e.replicaDataChannelBase &&
                  null !== e.replicaDataChannelBase &&
                  e.hasOwnProperty('replicaDataChannelBase') &&
                  (t.replicaDataChannelBase = e.replicaDataChannelBase),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            (r.FeatureType =
              (((t = Object.create({})).TYPE_POINT_Z = 1),
              (t.TYPE_POLYGON_Z = 2),
              (t.TYPE_LINE_Z = 3),
              (t.TYPE_TERRAIN = 4),
              t)),
            r
          );
        })()),
        (r.MfeDomainFeaturesProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.countryCode = ''),
            (r.prototype.domainName = ''),
            (r.prototype.supportedFeatures = a.emptyArray);
          var t,
            l = { 2: 'keyhole.dbroot.MfeDomainFeaturesProto.SupportedFeature' };
          return (
            n.push(l),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.MfeDomainFeaturesProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.countryCode = e.string();
                    break;
                  case 2:
                    a.domainName = e.string();
                    break;
                  case 3:
                    if (
                      ((a.supportedFeatures && a.supportedFeatures.length) ||
                        (a.supportedFeatures = []),
                      2 == (7 & n))
                    )
                      for (var l = e.uint32() + e.pos; e.pos < l; )
                        a.supportedFeatures.push(e.uint32());
                    else a.supportedFeatures.push(e.uint32());
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if (!a.isString(e.countryCode))
                return 'countryCode: string expected';
              if (!a.isString(e.domainName))
                return 'domainName: string expected';
              if (void 0 !== e.supportedFeatures) {
                if (!Array.isArray(e.supportedFeatures))
                  return 'supportedFeatures: array expected';
                for (var r = 0; r < e.supportedFeatures.length; ++r)
                  switch (e.supportedFeatures[r]) {
                    default:
                      return 'supportedFeatures: enum value[] expected';
                    case 0:
                    case 1:
                    case 2:
                  }
              }
              return null;
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.MfeDomainFeaturesProto)
                  return e;
                var r = new i.keyhole.dbroot.MfeDomainFeaturesProto();
                if (
                  (void 0 !== e.countryCode &&
                    null !== e.countryCode &&
                    (r.countryCode = String(e.countryCode)),
                  void 0 !== e.domainName &&
                    null !== e.domainName &&
                    (r.domainName = String(e.domainName)),
                  e.supportedFeatures)
                ) {
                  if (!Array.isArray(e.supportedFeatures))
                    throw TypeError(
                      '.keyhole.dbroot.MfeDomainFeaturesProto.supportedFeatures: array expected',
                    );
                  r.supportedFeatures = [];
                  for (var t = 0; t < e.supportedFeatures.length; ++t)
                    switch (e.supportedFeatures[t]) {
                      default:
                        r.supportedFeatures[t] = 0;
                        break;
                      case 'LOCAL_SEARCH':
                      case 1:
                        r.supportedFeatures[t] = 1;
                        break;
                      case 'DRIVING_DIRECTIONS':
                      case 2:
                        r.supportedFeatures[t] = 2;
                    }
                }
                return r;
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              if (
                ((r.arrays || r.defaults) && (t.supportedFeatures = []),
                r.defaults && ((t.countryCode = ''), (t.domainName = '')),
                void 0 !== e.countryCode &&
                  null !== e.countryCode &&
                  e.hasOwnProperty('countryCode') &&
                  (t.countryCode = e.countryCode),
                void 0 !== e.domainName &&
                  null !== e.domainName &&
                  e.hasOwnProperty('domainName') &&
                  (t.domainName = e.domainName),
                void 0 !== e.supportedFeatures &&
                  null !== e.supportedFeatures &&
                  e.hasOwnProperty('supportedFeatures'))
              ) {
                t.supportedFeatures = [];
                for (var o = 0; o < e.supportedFeatures.length; ++o)
                  t.supportedFeatures[o] =
                    r.enums === String
                      ? l[2][e.supportedFeatures[o]]
                      : e.supportedFeatures[o];
              }
              return t;
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            (r.SupportedFeature =
              (((t = Object.create({})).GEOCODING = 0),
              (t.LOCAL_SEARCH = 1),
              (t.DRIVING_DIRECTIONS = 2),
              t)),
            r
          );
        })()),
        (r.ClientOptionsProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.disableDiskCache = !1),
            (r.prototype.disableEmbeddedBrowserVista = !1),
            (r.prototype.drawAtmosphere = !0),
            (r.prototype.drawStars = !0),
            (r.prototype.shaderFilePrefix = ''),
            (r.prototype.useProtobufQuadtreePackets = !1),
            (r.prototype.useExtendedCopyrightIds = !0),
            (r.prototype.precipitationsOptions = null),
            (r.prototype.captureOptions = null),
            (r.prototype.show_2dMapsIcon = !0),
            (r.prototype.disableInternalBrowser = !1),
            (r.prototype.internalBrowserBlacklist = ''),
            (r.prototype.internalBrowserOriginWhitelist = '*'),
            (r.prototype.polarTileMergingLevel = 0),
            (r.prototype.jsBridgeRequestWhitelist = 'http://*.google.com/*'),
            (r.prototype.mapsOptions = null);
          var t = {
            7: 'keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions',
            8: 'keyhole.dbroot.ClientOptionsProto.CaptureOptions',
            15: 'keyhole.dbroot.ClientOptionsProto.MapsOptions',
          };
          return (
            n.push(t),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var a = void 0 === r ? e.len : e.pos + r,
                  n = new i.keyhole.dbroot.ClientOptionsProto();
                e.pos < a;

              ) {
                var l = e.uint32();
                switch (l >>> 3) {
                  case 1:
                    n.disableDiskCache = e.bool();
                    break;
                  case 2:
                    n.disableEmbeddedBrowserVista = e.bool();
                    break;
                  case 3:
                    n.drawAtmosphere = e.bool();
                    break;
                  case 4:
                    n.drawStars = e.bool();
                    break;
                  case 5:
                    n.shaderFilePrefix = e.string();
                    break;
                  case 6:
                    n.useProtobufQuadtreePackets = e.bool();
                    break;
                  case 7:
                    n.useExtendedCopyrightIds = e.bool();
                    break;
                  case 8:
                    n.precipitationsOptions = t[7].decode(e, e.uint32());
                    break;
                  case 9:
                    n.captureOptions = t[8].decode(e, e.uint32());
                    break;
                  case 10:
                    n.show_2dMapsIcon = e.bool();
                    break;
                  case 11:
                    n.disableInternalBrowser = e.bool();
                    break;
                  case 12:
                    n.internalBrowserBlacklist = e.string();
                    break;
                  case 13:
                    n.internalBrowserOriginWhitelist = e.string();
                    break;
                  case 14:
                    n.polarTileMergingLevel = e.int32();
                    break;
                  case 15:
                    n.jsBridgeRequestWhitelist = e.string();
                    break;
                  case 16:
                    n.mapsOptions = t[15].decode(e, e.uint32());
                    break;
                  default:
                    e.skipType(7 & l);
                }
              }
              return n;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : void 0 !== e.disableDiskCache &&
                  'boolean' != typeof e.disableDiskCache
                ? 'disableDiskCache: boolean expected'
                : void 0 !== e.disableEmbeddedBrowserVista &&
                  'boolean' != typeof e.disableEmbeddedBrowserVista
                ? 'disableEmbeddedBrowserVista: boolean expected'
                : void 0 !== e.drawAtmosphere &&
                  'boolean' != typeof e.drawAtmosphere
                ? 'drawAtmosphere: boolean expected'
                : void 0 !== e.drawStars && 'boolean' != typeof e.drawStars
                ? 'drawStars: boolean expected'
                : void 0 === e.shaderFilePrefix ||
                  a.isString(e.shaderFilePrefix)
                ? void 0 !== e.useProtobufQuadtreePackets &&
                  'boolean' != typeof e.useProtobufQuadtreePackets
                  ? 'useProtobufQuadtreePackets: boolean expected'
                  : void 0 !== e.useExtendedCopyrightIds &&
                    'boolean' != typeof e.useExtendedCopyrightIds
                  ? 'useExtendedCopyrightIds: boolean expected'
                  : void 0 !== e.precipitationsOptions &&
                    null !== e.precipitationsOptions &&
                    (r = t[7].verify(e.precipitationsOptions))
                  ? 'precipitationsOptions.' + r
                  : void 0 !== e.captureOptions &&
                    null !== e.captureOptions &&
                    (r = t[8].verify(e.captureOptions))
                  ? 'captureOptions.' + r
                  : void 0 !== e.show_2dMapsIcon &&
                    'boolean' != typeof e.show_2dMapsIcon
                  ? 'show_2dMapsIcon: boolean expected'
                  : void 0 !== e.disableInternalBrowser &&
                    'boolean' != typeof e.disableInternalBrowser
                  ? 'disableInternalBrowser: boolean expected'
                  : void 0 === e.internalBrowserBlacklist ||
                    a.isString(e.internalBrowserBlacklist)
                  ? void 0 === e.internalBrowserOriginWhitelist ||
                    a.isString(e.internalBrowserOriginWhitelist)
                    ? void 0 === e.polarTileMergingLevel ||
                      a.isInteger(e.polarTileMergingLevel)
                      ? void 0 === e.jsBridgeRequestWhitelist ||
                        a.isString(e.jsBridgeRequestWhitelist)
                        ? void 0 !== e.mapsOptions &&
                          null !== e.mapsOptions &&
                          (r = t[15].verify(e.mapsOptions))
                          ? 'mapsOptions.' + r
                          : null
                        : 'jsBridgeRequestWhitelist: string expected'
                      : 'polarTileMergingLevel: integer expected'
                    : 'internalBrowserOriginWhitelist: string expected'
                  : 'internalBrowserBlacklist: string expected'
                : 'shaderFilePrefix: string expected';
              var r;
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.ClientOptionsProto) return e;
                var r = new i.keyhole.dbroot.ClientOptionsProto();
                if (
                  (void 0 !== e.disableDiskCache &&
                    null !== e.disableDiskCache &&
                    (r.disableDiskCache = Boolean(e.disableDiskCache)),
                  void 0 !== e.disableEmbeddedBrowserVista &&
                    null !== e.disableEmbeddedBrowserVista &&
                    (r.disableEmbeddedBrowserVista = Boolean(
                      e.disableEmbeddedBrowserVista,
                    )),
                  void 0 !== e.drawAtmosphere &&
                    null !== e.drawAtmosphere &&
                    (r.drawAtmosphere = Boolean(e.drawAtmosphere)),
                  void 0 !== e.drawStars &&
                    null !== e.drawStars &&
                    (r.drawStars = Boolean(e.drawStars)),
                  void 0 !== e.shaderFilePrefix &&
                    null !== e.shaderFilePrefix &&
                    (r.shaderFilePrefix = String(e.shaderFilePrefix)),
                  void 0 !== e.useProtobufQuadtreePackets &&
                    null !== e.useProtobufQuadtreePackets &&
                    (r.useProtobufQuadtreePackets = Boolean(
                      e.useProtobufQuadtreePackets,
                    )),
                  void 0 !== e.useExtendedCopyrightIds &&
                    null !== e.useExtendedCopyrightIds &&
                    (r.useExtendedCopyrightIds = Boolean(
                      e.useExtendedCopyrightIds,
                    )),
                  void 0 !== e.precipitationsOptions &&
                    null !== e.precipitationsOptions)
                ) {
                  if ('object' != typeof e.precipitationsOptions)
                    throw TypeError(
                      '.keyhole.dbroot.ClientOptionsProto.precipitationsOptions: object expected',
                    );
                  r.precipitationsOptions = t[7].fromObject(
                    e.precipitationsOptions,
                  );
                }
                if (void 0 !== e.captureOptions && null !== e.captureOptions) {
                  if ('object' != typeof e.captureOptions)
                    throw TypeError(
                      '.keyhole.dbroot.ClientOptionsProto.captureOptions: object expected',
                    );
                  r.captureOptions = t[8].fromObject(e.captureOptions);
                }
                if (
                  (void 0 !== e.show_2dMapsIcon &&
                    null !== e.show_2dMapsIcon &&
                    (r.show_2dMapsIcon = Boolean(e.show_2dMapsIcon)),
                  void 0 !== e.disableInternalBrowser &&
                    null !== e.disableInternalBrowser &&
                    (r.disableInternalBrowser = Boolean(
                      e.disableInternalBrowser,
                    )),
                  void 0 !== e.internalBrowserBlacklist &&
                    null !== e.internalBrowserBlacklist &&
                    (r.internalBrowserBlacklist = String(
                      e.internalBrowserBlacklist,
                    )),
                  void 0 !== e.internalBrowserOriginWhitelist &&
                    null !== e.internalBrowserOriginWhitelist &&
                    (r.internalBrowserOriginWhitelist = String(
                      e.internalBrowserOriginWhitelist,
                    )),
                  void 0 !== e.polarTileMergingLevel &&
                    null !== e.polarTileMergingLevel &&
                    (r.polarTileMergingLevel = 0 | e.polarTileMergingLevel),
                  void 0 !== e.jsBridgeRequestWhitelist &&
                    null !== e.jsBridgeRequestWhitelist &&
                    (r.jsBridgeRequestWhitelist = String(
                      e.jsBridgeRequestWhitelist,
                    )),
                  void 0 !== e.mapsOptions && null !== e.mapsOptions)
                ) {
                  if ('object' != typeof e.mapsOptions)
                    throw TypeError(
                      '.keyhole.dbroot.ClientOptionsProto.mapsOptions: object expected',
                    );
                  r.mapsOptions = t[15].fromObject(e.mapsOptions);
                }
                return r;
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var o = {};
              return (
                r.defaults &&
                  ((o.disableDiskCache = !1),
                  (o.disableEmbeddedBrowserVista = !1),
                  (o.drawAtmosphere = !0),
                  (o.drawStars = !0),
                  (o.shaderFilePrefix = ''),
                  (o.useProtobufQuadtreePackets = !1),
                  (o.useExtendedCopyrightIds = !0),
                  (o.precipitationsOptions = null),
                  (o.captureOptions = null),
                  (o.show_2dMapsIcon = !0),
                  (o.disableInternalBrowser = !1),
                  (o.internalBrowserBlacklist = ''),
                  (o.internalBrowserOriginWhitelist = '*'),
                  (o.polarTileMergingLevel = 0),
                  (o.jsBridgeRequestWhitelist = 'http://*.google.com/*'),
                  (o.mapsOptions = null)),
                void 0 !== e.disableDiskCache &&
                  null !== e.disableDiskCache &&
                  e.hasOwnProperty('disableDiskCache') &&
                  (o.disableDiskCache = e.disableDiskCache),
                void 0 !== e.disableEmbeddedBrowserVista &&
                  null !== e.disableEmbeddedBrowserVista &&
                  e.hasOwnProperty('disableEmbeddedBrowserVista') &&
                  (o.disableEmbeddedBrowserVista =
                    e.disableEmbeddedBrowserVista),
                void 0 !== e.drawAtmosphere &&
                  null !== e.drawAtmosphere &&
                  e.hasOwnProperty('drawAtmosphere') &&
                  (o.drawAtmosphere = e.drawAtmosphere),
                void 0 !== e.drawStars &&
                  null !== e.drawStars &&
                  e.hasOwnProperty('drawStars') &&
                  (o.drawStars = e.drawStars),
                void 0 !== e.shaderFilePrefix &&
                  null !== e.shaderFilePrefix &&
                  e.hasOwnProperty('shaderFilePrefix') &&
                  (o.shaderFilePrefix = e.shaderFilePrefix),
                void 0 !== e.useProtobufQuadtreePackets &&
                  null !== e.useProtobufQuadtreePackets &&
                  e.hasOwnProperty('useProtobufQuadtreePackets') &&
                  (o.useProtobufQuadtreePackets = e.useProtobufQuadtreePackets),
                void 0 !== e.useExtendedCopyrightIds &&
                  null !== e.useExtendedCopyrightIds &&
                  e.hasOwnProperty('useExtendedCopyrightIds') &&
                  (o.useExtendedCopyrightIds = e.useExtendedCopyrightIds),
                void 0 !== e.precipitationsOptions &&
                  null !== e.precipitationsOptions &&
                  e.hasOwnProperty('precipitationsOptions') &&
                  (o.precipitationsOptions = t[7].toObject(
                    e.precipitationsOptions,
                    r,
                  )),
                void 0 !== e.captureOptions &&
                  null !== e.captureOptions &&
                  e.hasOwnProperty('captureOptions') &&
                  (o.captureOptions = t[8].toObject(e.captureOptions, r)),
                void 0 !== e.show_2dMapsIcon &&
                  null !== e.show_2dMapsIcon &&
                  e.hasOwnProperty('show_2dMapsIcon') &&
                  (o.show_2dMapsIcon = e.show_2dMapsIcon),
                void 0 !== e.disableInternalBrowser &&
                  null !== e.disableInternalBrowser &&
                  e.hasOwnProperty('disableInternalBrowser') &&
                  (o.disableInternalBrowser = e.disableInternalBrowser),
                void 0 !== e.internalBrowserBlacklist &&
                  null !== e.internalBrowserBlacklist &&
                  e.hasOwnProperty('internalBrowserBlacklist') &&
                  (o.internalBrowserBlacklist = e.internalBrowserBlacklist),
                void 0 !== e.internalBrowserOriginWhitelist &&
                  null !== e.internalBrowserOriginWhitelist &&
                  e.hasOwnProperty('internalBrowserOriginWhitelist') &&
                  (o.internalBrowserOriginWhitelist =
                    e.internalBrowserOriginWhitelist),
                void 0 !== e.polarTileMergingLevel &&
                  null !== e.polarTileMergingLevel &&
                  e.hasOwnProperty('polarTileMergingLevel') &&
                  (o.polarTileMergingLevel = e.polarTileMergingLevel),
                void 0 !== e.jsBridgeRequestWhitelist &&
                  null !== e.jsBridgeRequestWhitelist &&
                  e.hasOwnProperty('jsBridgeRequestWhitelist') &&
                  (o.jsBridgeRequestWhitelist = e.jsBridgeRequestWhitelist),
                void 0 !== e.mapsOptions &&
                  null !== e.mapsOptions &&
                  e.hasOwnProperty('mapsOptions') &&
                  (o.mapsOptions = t[15].toObject(e.mapsOptions, r)),
                o
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            (r.PrecipitationsOptions = (function () {
              function r(e) {
                if (e)
                  for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                    this[r[t]] = e[r[t]];
              }
              (r.prototype.imageUrl = ''),
                (r.prototype.imageExpireTime = 900),
                (r.prototype.maxColorDistance = 20),
                (r.prototype.imageLevel = 5),
                (r.prototype.weatherMapping = a.emptyArray),
                (r.prototype.cloudsLayerUrl = ''),
                (r.prototype.animationDecelerationDelay = 20);
              var t = {
                4: 'keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.WeatherMapping',
              };
              return (
                n.push(t),
                (r.decode = function (e, r) {
                  e instanceof o || (e = o.create(e));
                  for (
                    var a = void 0 === r ? e.len : e.pos + r,
                      n =
                        new i.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions();
                    e.pos < a;

                  ) {
                    var l = e.uint32();
                    switch (l >>> 3) {
                      case 1:
                        n.imageUrl = e.string();
                        break;
                      case 2:
                        n.imageExpireTime = e.int32();
                        break;
                      case 3:
                        n.maxColorDistance = e.int32();
                        break;
                      case 4:
                        n.imageLevel = e.int32();
                        break;
                      case 5:
                        (n.weatherMapping && n.weatherMapping.length) ||
                          (n.weatherMapping = []),
                          n.weatherMapping.push(t[4].decode(e, e.uint32()));
                        break;
                      case 6:
                        n.cloudsLayerUrl = e.string();
                        break;
                      case 7:
                        n.animationDecelerationDelay = e.float();
                        break;
                      default:
                        e.skipType(7 & l);
                    }
                  }
                  return n;
                }),
                (r.verify = function (e) {
                  if ('object' != typeof e || null === e)
                    return 'object expected';
                  if (void 0 !== e.imageUrl && !a.isString(e.imageUrl))
                    return 'imageUrl: string expected';
                  if (
                    void 0 !== e.imageExpireTime &&
                    !a.isInteger(e.imageExpireTime)
                  )
                    return 'imageExpireTime: integer expected';
                  if (
                    void 0 !== e.maxColorDistance &&
                    !a.isInteger(e.maxColorDistance)
                  )
                    return 'maxColorDistance: integer expected';
                  if (void 0 !== e.imageLevel && !a.isInteger(e.imageLevel))
                    return 'imageLevel: integer expected';
                  if (void 0 !== e.weatherMapping) {
                    if (!Array.isArray(e.weatherMapping))
                      return 'weatherMapping: array expected';
                    for (var r = 0; r < e.weatherMapping.length; ++r) {
                      var o = t[4].verify(e.weatherMapping[r]);
                      if (o) return 'weatherMapping.' + o;
                    }
                  }
                  return void 0 === e.cloudsLayerUrl ||
                    a.isString(e.cloudsLayerUrl)
                    ? void 0 !== e.animationDecelerationDelay &&
                      'number' != typeof e.animationDecelerationDelay
                      ? 'animationDecelerationDelay: number expected'
                      : null
                    : 'cloudsLayerUrl: string expected';
                }),
                (r.from = r.fromObject =
                  function (e) {
                    if (
                      e instanceof
                      i.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions
                    )
                      return e;
                    var r =
                      new i.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions();
                    if (
                      (void 0 !== e.imageUrl &&
                        null !== e.imageUrl &&
                        (r.imageUrl = String(e.imageUrl)),
                      void 0 !== e.imageExpireTime &&
                        null !== e.imageExpireTime &&
                        (r.imageExpireTime = 0 | e.imageExpireTime),
                      void 0 !== e.maxColorDistance &&
                        null !== e.maxColorDistance &&
                        (r.maxColorDistance = 0 | e.maxColorDistance),
                      void 0 !== e.imageLevel &&
                        null !== e.imageLevel &&
                        (r.imageLevel = 0 | e.imageLevel),
                      e.weatherMapping)
                    ) {
                      if (!Array.isArray(e.weatherMapping))
                        throw TypeError(
                          '.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.weatherMapping: array expected',
                        );
                      r.weatherMapping = [];
                      for (var o = 0; o < e.weatherMapping.length; ++o) {
                        if ('object' != typeof e.weatherMapping[o])
                          throw TypeError(
                            '.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.weatherMapping: object expected',
                          );
                        r.weatherMapping[o] = t[4].fromObject(
                          e.weatherMapping[o],
                        );
                      }
                    }
                    return (
                      void 0 !== e.cloudsLayerUrl &&
                        null !== e.cloudsLayerUrl &&
                        (r.cloudsLayerUrl = String(e.cloudsLayerUrl)),
                      void 0 !== e.animationDecelerationDelay &&
                        null !== e.animationDecelerationDelay &&
                        (r.animationDecelerationDelay = Number(
                          e.animationDecelerationDelay,
                        )),
                      r
                    );
                  }),
                (r.toObject = function (e, r) {
                  r || (r = {});
                  var o = {};
                  if (
                    ((r.arrays || r.defaults) && (o.weatherMapping = []),
                    r.defaults &&
                      ((o.imageUrl = ''),
                      (o.imageExpireTime = 900),
                      (o.maxColorDistance = 20),
                      (o.imageLevel = 5),
                      (o.cloudsLayerUrl = ''),
                      (o.animationDecelerationDelay = 20)),
                    void 0 !== e.imageUrl &&
                      null !== e.imageUrl &&
                      e.hasOwnProperty('imageUrl') &&
                      (o.imageUrl = e.imageUrl),
                    void 0 !== e.imageExpireTime &&
                      null !== e.imageExpireTime &&
                      e.hasOwnProperty('imageExpireTime') &&
                      (o.imageExpireTime = e.imageExpireTime),
                    void 0 !== e.maxColorDistance &&
                      null !== e.maxColorDistance &&
                      e.hasOwnProperty('maxColorDistance') &&
                      (o.maxColorDistance = e.maxColorDistance),
                    void 0 !== e.imageLevel &&
                      null !== e.imageLevel &&
                      e.hasOwnProperty('imageLevel') &&
                      (o.imageLevel = e.imageLevel),
                    void 0 !== e.weatherMapping &&
                      null !== e.weatherMapping &&
                      e.hasOwnProperty('weatherMapping'))
                  ) {
                    o.weatherMapping = [];
                    for (var a = 0; a < e.weatherMapping.length; ++a)
                      o.weatherMapping[a] = t[4].toObject(
                        e.weatherMapping[a],
                        r,
                      );
                  }
                  return (
                    void 0 !== e.cloudsLayerUrl &&
                      null !== e.cloudsLayerUrl &&
                      e.hasOwnProperty('cloudsLayerUrl') &&
                      (o.cloudsLayerUrl = e.cloudsLayerUrl),
                    void 0 !== e.animationDecelerationDelay &&
                      null !== e.animationDecelerationDelay &&
                      e.hasOwnProperty('animationDecelerationDelay') &&
                      (o.animationDecelerationDelay =
                        e.animationDecelerationDelay),
                    o
                  );
                }),
                (r.prototype.toObject = function (e) {
                  return this.constructor.toObject(this, e);
                }),
                (r.prototype.toJSON = function () {
                  return this.constructor.toObject(this, e.util.toJSONOptions);
                }),
                (r.WeatherMapping = (function () {
                  function r(e) {
                    if (e)
                      for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                        this[r[t]] = e[r[t]];
                  }
                  (r.prototype.colorAbgr = 0),
                    (r.prototype.weatherType = 0),
                    (r.prototype.elongation = 1),
                    (r.prototype.opacity = 0),
                    (r.prototype.fogDensity = 0),
                    (r.prototype.speed0 = 0),
                    (r.prototype.speed1 = 0),
                    (r.prototype.speed2 = 0),
                    (r.prototype.speed3 = 0);
                  var t,
                    l = {
                      1: 'keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.WeatherMapping.WeatherType',
                    };
                  return (
                    n.push(l),
                    (r.decode = function (e, r) {
                      e instanceof o || (e = o.create(e));
                      for (
                        var t = void 0 === r ? e.len : e.pos + r,
                          a =
                            new i.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.WeatherMapping();
                        e.pos < t;

                      ) {
                        var n = e.uint32();
                        switch (n >>> 3) {
                          case 1:
                            a.colorAbgr = e.uint32();
                            break;
                          case 2:
                            a.weatherType = e.uint32();
                            break;
                          case 3:
                            a.elongation = e.float();
                            break;
                          case 4:
                            a.opacity = e.float();
                            break;
                          case 5:
                            a.fogDensity = e.float();
                            break;
                          case 6:
                            a.speed0 = e.float();
                            break;
                          case 7:
                            a.speed1 = e.float();
                            break;
                          case 8:
                            a.speed2 = e.float();
                            break;
                          case 9:
                            a.speed3 = e.float();
                            break;
                          default:
                            e.skipType(7 & n);
                        }
                      }
                      return a;
                    }),
                    (r.verify = function (e) {
                      if ('object' != typeof e || null === e)
                        return 'object expected';
                      if (!a.isInteger(e.colorAbgr))
                        return 'colorAbgr: integer expected';
                      switch (e.weatherType) {
                        default:
                          return 'weatherType: enum value expected';
                        case 0:
                        case 1:
                        case 2:
                      }
                      return void 0 !== e.elongation &&
                        'number' != typeof e.elongation
                        ? 'elongation: number expected'
                        : void 0 !== e.opacity && 'number' != typeof e.opacity
                        ? 'opacity: number expected'
                        : void 0 !== e.fogDensity &&
                          'number' != typeof e.fogDensity
                        ? 'fogDensity: number expected'
                        : void 0 !== e.speed0 && 'number' != typeof e.speed0
                        ? 'speed0: number expected'
                        : void 0 !== e.speed1 && 'number' != typeof e.speed1
                        ? 'speed1: number expected'
                        : void 0 !== e.speed2 && 'number' != typeof e.speed2
                        ? 'speed2: number expected'
                        : void 0 !== e.speed3 && 'number' != typeof e.speed3
                        ? 'speed3: number expected'
                        : null;
                    }),
                    (r.from = r.fromObject =
                      function (e) {
                        if (
                          e instanceof
                          i.keyhole.dbroot.ClientOptionsProto
                            .PrecipitationsOptions.WeatherMapping
                        )
                          return e;
                        var r =
                          new i.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.WeatherMapping();
                        switch (
                          (void 0 !== e.colorAbgr &&
                            null !== e.colorAbgr &&
                            (r.colorAbgr = e.colorAbgr >>> 0),
                          e.weatherType)
                        ) {
                          case 'NO_PRECIPITATION':
                          case 0:
                            r.weatherType = 0;
                            break;
                          case 'RAIN':
                          case 1:
                            r.weatherType = 1;
                            break;
                          case 'SNOW':
                          case 2:
                            r.weatherType = 2;
                        }
                        return (
                          void 0 !== e.elongation &&
                            null !== e.elongation &&
                            (r.elongation = Number(e.elongation)),
                          void 0 !== e.opacity &&
                            null !== e.opacity &&
                            (r.opacity = Number(e.opacity)),
                          void 0 !== e.fogDensity &&
                            null !== e.fogDensity &&
                            (r.fogDensity = Number(e.fogDensity)),
                          void 0 !== e.speed0 &&
                            null !== e.speed0 &&
                            (r.speed0 = Number(e.speed0)),
                          void 0 !== e.speed1 &&
                            null !== e.speed1 &&
                            (r.speed1 = Number(e.speed1)),
                          void 0 !== e.speed2 &&
                            null !== e.speed2 &&
                            (r.speed2 = Number(e.speed2)),
                          void 0 !== e.speed3 &&
                            null !== e.speed3 &&
                            (r.speed3 = Number(e.speed3)),
                          r
                        );
                      }),
                    (r.toObject = function (e, r) {
                      r || (r = {});
                      var t = {};
                      return (
                        r.defaults &&
                          ((t.colorAbgr = 0),
                          (t.weatherType =
                            r.enums === String ? 'NO_PRECIPITATION' : 0),
                          (t.elongation = 1),
                          (t.opacity = 0),
                          (t.fogDensity = 0),
                          (t.speed0 = 0),
                          (t.speed1 = 0),
                          (t.speed2 = 0),
                          (t.speed3 = 0)),
                        void 0 !== e.colorAbgr &&
                          null !== e.colorAbgr &&
                          e.hasOwnProperty('colorAbgr') &&
                          (t.colorAbgr = e.colorAbgr),
                        void 0 !== e.weatherType &&
                          null !== e.weatherType &&
                          e.hasOwnProperty('weatherType') &&
                          (t.weatherType =
                            r.enums === String
                              ? l[1][e.weatherType]
                              : e.weatherType),
                        void 0 !== e.elongation &&
                          null !== e.elongation &&
                          e.hasOwnProperty('elongation') &&
                          (t.elongation = e.elongation),
                        void 0 !== e.opacity &&
                          null !== e.opacity &&
                          e.hasOwnProperty('opacity') &&
                          (t.opacity = e.opacity),
                        void 0 !== e.fogDensity &&
                          null !== e.fogDensity &&
                          e.hasOwnProperty('fogDensity') &&
                          (t.fogDensity = e.fogDensity),
                        void 0 !== e.speed0 &&
                          null !== e.speed0 &&
                          e.hasOwnProperty('speed0') &&
                          (t.speed0 = e.speed0),
                        void 0 !== e.speed1 &&
                          null !== e.speed1 &&
                          e.hasOwnProperty('speed1') &&
                          (t.speed1 = e.speed1),
                        void 0 !== e.speed2 &&
                          null !== e.speed2 &&
                          e.hasOwnProperty('speed2') &&
                          (t.speed2 = e.speed2),
                        void 0 !== e.speed3 &&
                          null !== e.speed3 &&
                          e.hasOwnProperty('speed3') &&
                          (t.speed3 = e.speed3),
                        t
                      );
                    }),
                    (r.prototype.toObject = function (e) {
                      return this.constructor.toObject(this, e);
                    }),
                    (r.prototype.toJSON = function () {
                      return this.constructor.toObject(
                        this,
                        e.util.toJSONOptions,
                      );
                    }),
                    (r.WeatherType =
                      (((t = Object.create({})).NO_PRECIPITATION = 0),
                      (t.RAIN = 1),
                      (t.SNOW = 2),
                      t)),
                    r
                  );
                })()),
                r
              );
            })()),
            (r.CaptureOptions = (function () {
              function r(e) {
                if (e)
                  for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                    this[r[t]] = e[r[t]];
              }
              return (
                (r.prototype.allowSaveAsImage = !0),
                (r.prototype.maxFreeCaptureRes = 2400),
                (r.prototype.maxPremiumCaptureRes = 4800),
                (r.decode = function (e, r) {
                  e instanceof o || (e = o.create(e));
                  for (
                    var t = void 0 === r ? e.len : e.pos + r,
                      a =
                        new i.keyhole.dbroot.ClientOptionsProto.CaptureOptions();
                    e.pos < t;

                  ) {
                    var n = e.uint32();
                    switch (n >>> 3) {
                      case 1:
                        a.allowSaveAsImage = e.bool();
                        break;
                      case 2:
                        a.maxFreeCaptureRes = e.int32();
                        break;
                      case 3:
                        a.maxPremiumCaptureRes = e.int32();
                        break;
                      default:
                        e.skipType(7 & n);
                    }
                  }
                  return a;
                }),
                (r.verify = function (e) {
                  return 'object' != typeof e || null === e
                    ? 'object expected'
                    : void 0 !== e.allowSaveAsImage &&
                      'boolean' != typeof e.allowSaveAsImage
                    ? 'allowSaveAsImage: boolean expected'
                    : void 0 === e.maxFreeCaptureRes ||
                      a.isInteger(e.maxFreeCaptureRes)
                    ? void 0 === e.maxPremiumCaptureRes ||
                      a.isInteger(e.maxPremiumCaptureRes)
                      ? null
                      : 'maxPremiumCaptureRes: integer expected'
                    : 'maxFreeCaptureRes: integer expected';
                }),
                (r.from = r.fromObject =
                  function (e) {
                    if (
                      e instanceof
                      i.keyhole.dbroot.ClientOptionsProto.CaptureOptions
                    )
                      return e;
                    var r =
                      new i.keyhole.dbroot.ClientOptionsProto.CaptureOptions();
                    return (
                      void 0 !== e.allowSaveAsImage &&
                        null !== e.allowSaveAsImage &&
                        (r.allowSaveAsImage = Boolean(e.allowSaveAsImage)),
                      void 0 !== e.maxFreeCaptureRes &&
                        null !== e.maxFreeCaptureRes &&
                        (r.maxFreeCaptureRes = 0 | e.maxFreeCaptureRes),
                      void 0 !== e.maxPremiumCaptureRes &&
                        null !== e.maxPremiumCaptureRes &&
                        (r.maxPremiumCaptureRes = 0 | e.maxPremiumCaptureRes),
                      r
                    );
                  }),
                (r.toObject = function (e, r) {
                  r || (r = {});
                  var t = {};
                  return (
                    r.defaults &&
                      ((t.allowSaveAsImage = !0),
                      (t.maxFreeCaptureRes = 2400),
                      (t.maxPremiumCaptureRes = 4800)),
                    void 0 !== e.allowSaveAsImage &&
                      null !== e.allowSaveAsImage &&
                      e.hasOwnProperty('allowSaveAsImage') &&
                      (t.allowSaveAsImage = e.allowSaveAsImage),
                    void 0 !== e.maxFreeCaptureRes &&
                      null !== e.maxFreeCaptureRes &&
                      e.hasOwnProperty('maxFreeCaptureRes') &&
                      (t.maxFreeCaptureRes = e.maxFreeCaptureRes),
                    void 0 !== e.maxPremiumCaptureRes &&
                      null !== e.maxPremiumCaptureRes &&
                      e.hasOwnProperty('maxPremiumCaptureRes') &&
                      (t.maxPremiumCaptureRes = e.maxPremiumCaptureRes),
                    t
                  );
                }),
                (r.prototype.toObject = function (e) {
                  return this.constructor.toObject(this, e);
                }),
                (r.prototype.toJSON = function () {
                  return this.constructor.toObject(this, e.util.toJSONOptions);
                }),
                r
              );
            })()),
            (r.MapsOptions = (function () {
              function r(e) {
                if (e)
                  for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                    this[r[t]] = e[r[t]];
              }
              return (
                (r.prototype.enableMaps = !1),
                (r.prototype.docsAutoDownloadEnabled = !1),
                (r.prototype.docsAutoDownloadInterval = 0),
                (r.prototype.docsAutoUploadEnabled = !1),
                (r.prototype.docsAutoUploadDelay = 0),
                (r.decode = function (e, r) {
                  e instanceof o || (e = o.create(e));
                  for (
                    var t = void 0 === r ? e.len : e.pos + r,
                      a = new i.keyhole.dbroot.ClientOptionsProto.MapsOptions();
                    e.pos < t;

                  ) {
                    var n = e.uint32();
                    switch (n >>> 3) {
                      case 1:
                        a.enableMaps = e.bool();
                        break;
                      case 2:
                        a.docsAutoDownloadEnabled = e.bool();
                        break;
                      case 3:
                        a.docsAutoDownloadInterval = e.int32();
                        break;
                      case 4:
                        a.docsAutoUploadEnabled = e.bool();
                        break;
                      case 5:
                        a.docsAutoUploadDelay = e.int32();
                        break;
                      default:
                        e.skipType(7 & n);
                    }
                  }
                  return a;
                }),
                (r.verify = function (e) {
                  return 'object' != typeof e || null === e
                    ? 'object expected'
                    : void 0 !== e.enableMaps &&
                      'boolean' != typeof e.enableMaps
                    ? 'enableMaps: boolean expected'
                    : void 0 !== e.docsAutoDownloadEnabled &&
                      'boolean' != typeof e.docsAutoDownloadEnabled
                    ? 'docsAutoDownloadEnabled: boolean expected'
                    : void 0 === e.docsAutoDownloadInterval ||
                      a.isInteger(e.docsAutoDownloadInterval)
                    ? void 0 !== e.docsAutoUploadEnabled &&
                      'boolean' != typeof e.docsAutoUploadEnabled
                      ? 'docsAutoUploadEnabled: boolean expected'
                      : void 0 === e.docsAutoUploadDelay ||
                        a.isInteger(e.docsAutoUploadDelay)
                      ? null
                      : 'docsAutoUploadDelay: integer expected'
                    : 'docsAutoDownloadInterval: integer expected';
                }),
                (r.from = r.fromObject =
                  function (e) {
                    if (
                      e instanceof
                      i.keyhole.dbroot.ClientOptionsProto.MapsOptions
                    )
                      return e;
                    var r =
                      new i.keyhole.dbroot.ClientOptionsProto.MapsOptions();
                    return (
                      void 0 !== e.enableMaps &&
                        null !== e.enableMaps &&
                        (r.enableMaps = Boolean(e.enableMaps)),
                      void 0 !== e.docsAutoDownloadEnabled &&
                        null !== e.docsAutoDownloadEnabled &&
                        (r.docsAutoDownloadEnabled = Boolean(
                          e.docsAutoDownloadEnabled,
                        )),
                      void 0 !== e.docsAutoDownloadInterval &&
                        null !== e.docsAutoDownloadInterval &&
                        (r.docsAutoDownloadInterval =
                          0 | e.docsAutoDownloadInterval),
                      void 0 !== e.docsAutoUploadEnabled &&
                        null !== e.docsAutoUploadEnabled &&
                        (r.docsAutoUploadEnabled = Boolean(
                          e.docsAutoUploadEnabled,
                        )),
                      void 0 !== e.docsAutoUploadDelay &&
                        null !== e.docsAutoUploadDelay &&
                        (r.docsAutoUploadDelay = 0 | e.docsAutoUploadDelay),
                      r
                    );
                  }),
                (r.toObject = function (e, r) {
                  r || (r = {});
                  var t = {};
                  return (
                    r.defaults &&
                      ((t.enableMaps = !1),
                      (t.docsAutoDownloadEnabled = !1),
                      (t.docsAutoDownloadInterval = 0),
                      (t.docsAutoUploadEnabled = !1),
                      (t.docsAutoUploadDelay = 0)),
                    void 0 !== e.enableMaps &&
                      null !== e.enableMaps &&
                      e.hasOwnProperty('enableMaps') &&
                      (t.enableMaps = e.enableMaps),
                    void 0 !== e.docsAutoDownloadEnabled &&
                      null !== e.docsAutoDownloadEnabled &&
                      e.hasOwnProperty('docsAutoDownloadEnabled') &&
                      (t.docsAutoDownloadEnabled = e.docsAutoDownloadEnabled),
                    void 0 !== e.docsAutoDownloadInterval &&
                      null !== e.docsAutoDownloadInterval &&
                      e.hasOwnProperty('docsAutoDownloadInterval') &&
                      (t.docsAutoDownloadInterval = e.docsAutoDownloadInterval),
                    void 0 !== e.docsAutoUploadEnabled &&
                      null !== e.docsAutoUploadEnabled &&
                      e.hasOwnProperty('docsAutoUploadEnabled') &&
                      (t.docsAutoUploadEnabled = e.docsAutoUploadEnabled),
                    void 0 !== e.docsAutoUploadDelay &&
                      null !== e.docsAutoUploadDelay &&
                      e.hasOwnProperty('docsAutoUploadDelay') &&
                      (t.docsAutoUploadDelay = e.docsAutoUploadDelay),
                    t
                  );
                }),
                (r.prototype.toObject = function (e) {
                  return this.constructor.toObject(this, e);
                }),
                (r.prototype.toJSON = function () {
                  return this.constructor.toObject(this, e.util.toJSONOptions);
                }),
                r
              );
            })()),
            r
          );
        })()),
        (r.FetchingOptionsProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.maxRequestsPerQuery = 1),
            (r.prototype.forceMaxRequestsPerQuery = !1),
            (r.prototype.sortBatches = !1),
            (r.prototype.maxDrawable = 2),
            (r.prototype.maxImagery = 2),
            (r.prototype.maxTerrain = 5),
            (r.prototype.maxQuadtree = 5),
            (r.prototype.maxDioramaMetadata = 1),
            (r.prototype.maxDioramaData = 0),
            (r.prototype.maxConsumerFetchRatio = 1),
            (r.prototype.maxProEcFetchRatio = 0),
            (r.prototype.safeOverallQps = 0),
            (r.prototype.safeImageryQps = 0),
            (r.prototype.domainsForHttps = 'google.com gstatic.com'),
            (r.prototype.hostsForHttp = ''),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.FetchingOptionsProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.maxRequestsPerQuery = e.int32();
                    break;
                  case 12:
                    a.forceMaxRequestsPerQuery = e.bool();
                    break;
                  case 13:
                    a.sortBatches = e.bool();
                    break;
                  case 2:
                    a.maxDrawable = e.int32();
                    break;
                  case 3:
                    a.maxImagery = e.int32();
                    break;
                  case 4:
                    a.maxTerrain = e.int32();
                    break;
                  case 5:
                    a.maxQuadtree = e.int32();
                    break;
                  case 6:
                    a.maxDioramaMetadata = e.int32();
                    break;
                  case 7:
                    a.maxDioramaData = e.int32();
                    break;
                  case 8:
                    a.maxConsumerFetchRatio = e.float();
                    break;
                  case 9:
                    a.maxProEcFetchRatio = e.float();
                    break;
                  case 10:
                    a.safeOverallQps = e.float();
                    break;
                  case 11:
                    a.safeImageryQps = e.float();
                    break;
                  case 14:
                    a.domainsForHttps = e.string();
                    break;
                  case 15:
                    a.hostsForHttp = e.string();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : void 0 === e.maxRequestsPerQuery ||
                  a.isInteger(e.maxRequestsPerQuery)
                ? void 0 !== e.forceMaxRequestsPerQuery &&
                  'boolean' != typeof e.forceMaxRequestsPerQuery
                  ? 'forceMaxRequestsPerQuery: boolean expected'
                  : void 0 !== e.sortBatches &&
                    'boolean' != typeof e.sortBatches
                  ? 'sortBatches: boolean expected'
                  : void 0 === e.maxDrawable || a.isInteger(e.maxDrawable)
                  ? void 0 === e.maxImagery || a.isInteger(e.maxImagery)
                    ? void 0 === e.maxTerrain || a.isInteger(e.maxTerrain)
                      ? void 0 === e.maxQuadtree || a.isInteger(e.maxQuadtree)
                        ? void 0 === e.maxDioramaMetadata ||
                          a.isInteger(e.maxDioramaMetadata)
                          ? void 0 === e.maxDioramaData ||
                            a.isInteger(e.maxDioramaData)
                            ? void 0 !== e.maxConsumerFetchRatio &&
                              'number' != typeof e.maxConsumerFetchRatio
                              ? 'maxConsumerFetchRatio: number expected'
                              : void 0 !== e.maxProEcFetchRatio &&
                                'number' != typeof e.maxProEcFetchRatio
                              ? 'maxProEcFetchRatio: number expected'
                              : void 0 !== e.safeOverallQps &&
                                'number' != typeof e.safeOverallQps
                              ? 'safeOverallQps: number expected'
                              : void 0 !== e.safeImageryQps &&
                                'number' != typeof e.safeImageryQps
                              ? 'safeImageryQps: number expected'
                              : void 0 === e.domainsForHttps ||
                                a.isString(e.domainsForHttps)
                              ? void 0 === e.hostsForHttp ||
                                a.isString(e.hostsForHttp)
                                ? null
                                : 'hostsForHttp: string expected'
                              : 'domainsForHttps: string expected'
                            : 'maxDioramaData: integer expected'
                          : 'maxDioramaMetadata: integer expected'
                        : 'maxQuadtree: integer expected'
                      : 'maxTerrain: integer expected'
                    : 'maxImagery: integer expected'
                  : 'maxDrawable: integer expected'
                : 'maxRequestsPerQuery: integer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.FetchingOptionsProto)
                  return e;
                var r = new i.keyhole.dbroot.FetchingOptionsProto();
                return (
                  void 0 !== e.maxRequestsPerQuery &&
                    null !== e.maxRequestsPerQuery &&
                    (r.maxRequestsPerQuery = 0 | e.maxRequestsPerQuery),
                  void 0 !== e.forceMaxRequestsPerQuery &&
                    null !== e.forceMaxRequestsPerQuery &&
                    (r.forceMaxRequestsPerQuery = Boolean(
                      e.forceMaxRequestsPerQuery,
                    )),
                  void 0 !== e.sortBatches &&
                    null !== e.sortBatches &&
                    (r.sortBatches = Boolean(e.sortBatches)),
                  void 0 !== e.maxDrawable &&
                    null !== e.maxDrawable &&
                    (r.maxDrawable = 0 | e.maxDrawable),
                  void 0 !== e.maxImagery &&
                    null !== e.maxImagery &&
                    (r.maxImagery = 0 | e.maxImagery),
                  void 0 !== e.maxTerrain &&
                    null !== e.maxTerrain &&
                    (r.maxTerrain = 0 | e.maxTerrain),
                  void 0 !== e.maxQuadtree &&
                    null !== e.maxQuadtree &&
                    (r.maxQuadtree = 0 | e.maxQuadtree),
                  void 0 !== e.maxDioramaMetadata &&
                    null !== e.maxDioramaMetadata &&
                    (r.maxDioramaMetadata = 0 | e.maxDioramaMetadata),
                  void 0 !== e.maxDioramaData &&
                    null !== e.maxDioramaData &&
                    (r.maxDioramaData = 0 | e.maxDioramaData),
                  void 0 !== e.maxConsumerFetchRatio &&
                    null !== e.maxConsumerFetchRatio &&
                    (r.maxConsumerFetchRatio = Number(e.maxConsumerFetchRatio)),
                  void 0 !== e.maxProEcFetchRatio &&
                    null !== e.maxProEcFetchRatio &&
                    (r.maxProEcFetchRatio = Number(e.maxProEcFetchRatio)),
                  void 0 !== e.safeOverallQps &&
                    null !== e.safeOverallQps &&
                    (r.safeOverallQps = Number(e.safeOverallQps)),
                  void 0 !== e.safeImageryQps &&
                    null !== e.safeImageryQps &&
                    (r.safeImageryQps = Number(e.safeImageryQps)),
                  void 0 !== e.domainsForHttps &&
                    null !== e.domainsForHttps &&
                    (r.domainsForHttps = String(e.domainsForHttps)),
                  void 0 !== e.hostsForHttp &&
                    null !== e.hostsForHttp &&
                    (r.hostsForHttp = String(e.hostsForHttp)),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults &&
                  ((t.maxRequestsPerQuery = 1),
                  (t.forceMaxRequestsPerQuery = !1),
                  (t.sortBatches = !1),
                  (t.maxDrawable = 2),
                  (t.maxImagery = 2),
                  (t.maxTerrain = 5),
                  (t.maxQuadtree = 5),
                  (t.maxDioramaMetadata = 1),
                  (t.maxDioramaData = 0),
                  (t.maxConsumerFetchRatio = 1),
                  (t.maxProEcFetchRatio = 0),
                  (t.safeOverallQps = 0),
                  (t.safeImageryQps = 0),
                  (t.domainsForHttps = 'google.com gstatic.com'),
                  (t.hostsForHttp = '')),
                void 0 !== e.maxRequestsPerQuery &&
                  null !== e.maxRequestsPerQuery &&
                  e.hasOwnProperty('maxRequestsPerQuery') &&
                  (t.maxRequestsPerQuery = e.maxRequestsPerQuery),
                void 0 !== e.forceMaxRequestsPerQuery &&
                  null !== e.forceMaxRequestsPerQuery &&
                  e.hasOwnProperty('forceMaxRequestsPerQuery') &&
                  (t.forceMaxRequestsPerQuery = e.forceMaxRequestsPerQuery),
                void 0 !== e.sortBatches &&
                  null !== e.sortBatches &&
                  e.hasOwnProperty('sortBatches') &&
                  (t.sortBatches = e.sortBatches),
                void 0 !== e.maxDrawable &&
                  null !== e.maxDrawable &&
                  e.hasOwnProperty('maxDrawable') &&
                  (t.maxDrawable = e.maxDrawable),
                void 0 !== e.maxImagery &&
                  null !== e.maxImagery &&
                  e.hasOwnProperty('maxImagery') &&
                  (t.maxImagery = e.maxImagery),
                void 0 !== e.maxTerrain &&
                  null !== e.maxTerrain &&
                  e.hasOwnProperty('maxTerrain') &&
                  (t.maxTerrain = e.maxTerrain),
                void 0 !== e.maxQuadtree &&
                  null !== e.maxQuadtree &&
                  e.hasOwnProperty('maxQuadtree') &&
                  (t.maxQuadtree = e.maxQuadtree),
                void 0 !== e.maxDioramaMetadata &&
                  null !== e.maxDioramaMetadata &&
                  e.hasOwnProperty('maxDioramaMetadata') &&
                  (t.maxDioramaMetadata = e.maxDioramaMetadata),
                void 0 !== e.maxDioramaData &&
                  null !== e.maxDioramaData &&
                  e.hasOwnProperty('maxDioramaData') &&
                  (t.maxDioramaData = e.maxDioramaData),
                void 0 !== e.maxConsumerFetchRatio &&
                  null !== e.maxConsumerFetchRatio &&
                  e.hasOwnProperty('maxConsumerFetchRatio') &&
                  (t.maxConsumerFetchRatio = e.maxConsumerFetchRatio),
                void 0 !== e.maxProEcFetchRatio &&
                  null !== e.maxProEcFetchRatio &&
                  e.hasOwnProperty('maxProEcFetchRatio') &&
                  (t.maxProEcFetchRatio = e.maxProEcFetchRatio),
                void 0 !== e.safeOverallQps &&
                  null !== e.safeOverallQps &&
                  e.hasOwnProperty('safeOverallQps') &&
                  (t.safeOverallQps = e.safeOverallQps),
                void 0 !== e.safeImageryQps &&
                  null !== e.safeImageryQps &&
                  e.hasOwnProperty('safeImageryQps') &&
                  (t.safeImageryQps = e.safeImageryQps),
                void 0 !== e.domainsForHttps &&
                  null !== e.domainsForHttps &&
                  e.hasOwnProperty('domainsForHttps') &&
                  (t.domainsForHttps = e.domainsForHttps),
                void 0 !== e.hostsForHttp &&
                  null !== e.hostsForHttp &&
                  e.hasOwnProperty('hostsForHttp') &&
                  (t.hostsForHttp = e.hostsForHttp),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.TimeMachineOptionsProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.serverUrl = ''),
            (r.prototype.isTimemachine = !1),
            (r.prototype.dwellTimeMs = 500),
            (r.prototype.discoverabilityAltitudeMeters = 15e3),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.TimeMachineOptionsProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.serverUrl = e.string();
                    break;
                  case 2:
                    a.isTimemachine = e.bool();
                    break;
                  case 3:
                    a.dwellTimeMs = e.int32();
                    break;
                  case 4:
                    a.discoverabilityAltitudeMeters = e.int32();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : void 0 === e.serverUrl || a.isString(e.serverUrl)
                ? void 0 !== e.isTimemachine &&
                  'boolean' != typeof e.isTimemachine
                  ? 'isTimemachine: boolean expected'
                  : void 0 === e.dwellTimeMs || a.isInteger(e.dwellTimeMs)
                  ? void 0 === e.discoverabilityAltitudeMeters ||
                    a.isInteger(e.discoverabilityAltitudeMeters)
                    ? null
                    : 'discoverabilityAltitudeMeters: integer expected'
                  : 'dwellTimeMs: integer expected'
                : 'serverUrl: string expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.TimeMachineOptionsProto)
                  return e;
                var r = new i.keyhole.dbroot.TimeMachineOptionsProto();
                return (
                  void 0 !== e.serverUrl &&
                    null !== e.serverUrl &&
                    (r.serverUrl = String(e.serverUrl)),
                  void 0 !== e.isTimemachine &&
                    null !== e.isTimemachine &&
                    (r.isTimemachine = Boolean(e.isTimemachine)),
                  void 0 !== e.dwellTimeMs &&
                    null !== e.dwellTimeMs &&
                    (r.dwellTimeMs = 0 | e.dwellTimeMs),
                  void 0 !== e.discoverabilityAltitudeMeters &&
                    null !== e.discoverabilityAltitudeMeters &&
                    (r.discoverabilityAltitudeMeters =
                      0 | e.discoverabilityAltitudeMeters),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults &&
                  ((t.serverUrl = ''),
                  (t.isTimemachine = !1),
                  (t.dwellTimeMs = 500),
                  (t.discoverabilityAltitudeMeters = 15e3)),
                void 0 !== e.serverUrl &&
                  null !== e.serverUrl &&
                  e.hasOwnProperty('serverUrl') &&
                  (t.serverUrl = e.serverUrl),
                void 0 !== e.isTimemachine &&
                  null !== e.isTimemachine &&
                  e.hasOwnProperty('isTimemachine') &&
                  (t.isTimemachine = e.isTimemachine),
                void 0 !== e.dwellTimeMs &&
                  null !== e.dwellTimeMs &&
                  e.hasOwnProperty('dwellTimeMs') &&
                  (t.dwellTimeMs = e.dwellTimeMs),
                void 0 !== e.discoverabilityAltitudeMeters &&
                  null !== e.discoverabilityAltitudeMeters &&
                  e.hasOwnProperty('discoverabilityAltitudeMeters') &&
                  (t.discoverabilityAltitudeMeters =
                    e.discoverabilityAltitudeMeters),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.AutopiaOptionsProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.metadataServerUrl = 'http://cbk0.google.com/cbk'),
            (r.prototype.depthmapServerUrl = 'http://cbk0.google.com/cbk'),
            (r.prototype.coverageOverlayUrl = ''),
            (r.prototype.maxImageryQps = 0),
            (r.prototype.maxMetadataDepthmapQps = 0),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.AutopiaOptionsProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.metadataServerUrl = e.string();
                    break;
                  case 2:
                    a.depthmapServerUrl = e.string();
                    break;
                  case 3:
                    a.coverageOverlayUrl = e.string();
                    break;
                  case 4:
                    a.maxImageryQps = e.float();
                    break;
                  case 5:
                    a.maxMetadataDepthmapQps = e.float();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : void 0 === e.metadataServerUrl ||
                  a.isString(e.metadataServerUrl)
                ? void 0 === e.depthmapServerUrl ||
                  a.isString(e.depthmapServerUrl)
                  ? void 0 === e.coverageOverlayUrl ||
                    a.isString(e.coverageOverlayUrl)
                    ? void 0 !== e.maxImageryQps &&
                      'number' != typeof e.maxImageryQps
                      ? 'maxImageryQps: number expected'
                      : void 0 !== e.maxMetadataDepthmapQps &&
                        'number' != typeof e.maxMetadataDepthmapQps
                      ? 'maxMetadataDepthmapQps: number expected'
                      : null
                    : 'coverageOverlayUrl: string expected'
                  : 'depthmapServerUrl: string expected'
                : 'metadataServerUrl: string expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.AutopiaOptionsProto) return e;
                var r = new i.keyhole.dbroot.AutopiaOptionsProto();
                return (
                  void 0 !== e.metadataServerUrl &&
                    null !== e.metadataServerUrl &&
                    (r.metadataServerUrl = String(e.metadataServerUrl)),
                  void 0 !== e.depthmapServerUrl &&
                    null !== e.depthmapServerUrl &&
                    (r.depthmapServerUrl = String(e.depthmapServerUrl)),
                  void 0 !== e.coverageOverlayUrl &&
                    null !== e.coverageOverlayUrl &&
                    (r.coverageOverlayUrl = String(e.coverageOverlayUrl)),
                  void 0 !== e.maxImageryQps &&
                    null !== e.maxImageryQps &&
                    (r.maxImageryQps = Number(e.maxImageryQps)),
                  void 0 !== e.maxMetadataDepthmapQps &&
                    null !== e.maxMetadataDepthmapQps &&
                    (r.maxMetadataDepthmapQps = Number(
                      e.maxMetadataDepthmapQps,
                    )),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults &&
                  ((t.metadataServerUrl = 'http://cbk0.google.com/cbk'),
                  (t.depthmapServerUrl = 'http://cbk0.google.com/cbk'),
                  (t.coverageOverlayUrl = ''),
                  (t.maxImageryQps = 0),
                  (t.maxMetadataDepthmapQps = 0)),
                void 0 !== e.metadataServerUrl &&
                  null !== e.metadataServerUrl &&
                  e.hasOwnProperty('metadataServerUrl') &&
                  (t.metadataServerUrl = e.metadataServerUrl),
                void 0 !== e.depthmapServerUrl &&
                  null !== e.depthmapServerUrl &&
                  e.hasOwnProperty('depthmapServerUrl') &&
                  (t.depthmapServerUrl = e.depthmapServerUrl),
                void 0 !== e.coverageOverlayUrl &&
                  null !== e.coverageOverlayUrl &&
                  e.hasOwnProperty('coverageOverlayUrl') &&
                  (t.coverageOverlayUrl = e.coverageOverlayUrl),
                void 0 !== e.maxImageryQps &&
                  null !== e.maxImageryQps &&
                  e.hasOwnProperty('maxImageryQps') &&
                  (t.maxImageryQps = e.maxImageryQps),
                void 0 !== e.maxMetadataDepthmapQps &&
                  null !== e.maxMetadataDepthmapQps &&
                  e.hasOwnProperty('maxMetadataDepthmapQps') &&
                  (t.maxMetadataDepthmapQps = e.maxMetadataDepthmapQps),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.CSIOptionsProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.samplingPercentage = 0),
            (r.prototype.experimentId = ''),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.CSIOptionsProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.samplingPercentage = e.int32();
                    break;
                  case 2:
                    a.experimentId = e.string();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : void 0 === e.samplingPercentage ||
                  a.isInteger(e.samplingPercentage)
                ? void 0 === e.experimentId || a.isString(e.experimentId)
                  ? null
                  : 'experimentId: string expected'
                : 'samplingPercentage: integer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.CSIOptionsProto) return e;
                var r = new i.keyhole.dbroot.CSIOptionsProto();
                return (
                  void 0 !== e.samplingPercentage &&
                    null !== e.samplingPercentage &&
                    (r.samplingPercentage = 0 | e.samplingPercentage),
                  void 0 !== e.experimentId &&
                    null !== e.experimentId &&
                    (r.experimentId = String(e.experimentId)),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults &&
                  ((t.samplingPercentage = 0), (t.experimentId = '')),
                void 0 !== e.samplingPercentage &&
                  null !== e.samplingPercentage &&
                  e.hasOwnProperty('samplingPercentage') &&
                  (t.samplingPercentage = e.samplingPercentage),
                void 0 !== e.experimentId &&
                  null !== e.experimentId &&
                  e.hasOwnProperty('experimentId') &&
                  (t.experimentId = e.experimentId),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.SearchTabProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.isVisible = !1),
            (r.prototype.tabLabel = null),
            (r.prototype.baseUrl = ''),
            (r.prototype.viewportPrefix = ''),
            (r.prototype.inputBox = a.emptyArray),
            (r.prototype.requirement = null);
          var t = {
            1: 'keyhole.dbroot.StringIdOrValueProto',
            4: 'keyhole.dbroot.SearchTabProto.InputBoxInfo',
            5: 'keyhole.dbroot.RequirementProto',
          };
          return (
            n.push(t),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var a = void 0 === r ? e.len : e.pos + r,
                  n = new i.keyhole.dbroot.SearchTabProto();
                e.pos < a;

              ) {
                var l = e.uint32();
                switch (l >>> 3) {
                  case 1:
                    n.isVisible = e.bool();
                    break;
                  case 2:
                    n.tabLabel = t[1].decode(e, e.uint32());
                    break;
                  case 3:
                    n.baseUrl = e.string();
                    break;
                  case 4:
                    n.viewportPrefix = e.string();
                    break;
                  case 5:
                    (n.inputBox && n.inputBox.length) || (n.inputBox = []),
                      n.inputBox.push(t[4].decode(e, e.uint32()));
                    break;
                  case 6:
                    n.requirement = t[5].decode(e, e.uint32());
                    break;
                  default:
                    e.skipType(7 & l);
                }
              }
              return n;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if ('boolean' != typeof e.isVisible)
                return 'isVisible: boolean expected';
              if (
                void 0 !== e.tabLabel &&
                null !== e.tabLabel &&
                (o = t[1].verify(e.tabLabel))
              )
                return 'tabLabel.' + o;
              if (void 0 !== e.baseUrl && !a.isString(e.baseUrl))
                return 'baseUrl: string expected';
              if (void 0 !== e.viewportPrefix && !a.isString(e.viewportPrefix))
                return 'viewportPrefix: string expected';
              if (void 0 !== e.inputBox) {
                if (!Array.isArray(e.inputBox))
                  return 'inputBox: array expected';
                for (var r = 0; r < e.inputBox.length; ++r) {
                  var o;
                  if ((o = t[4].verify(e.inputBox[r]))) return 'inputBox.' + o;
                }
              }
              return void 0 !== e.requirement &&
                null !== e.requirement &&
                (o = t[5].verify(e.requirement))
                ? 'requirement.' + o
                : null;
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.SearchTabProto) return e;
                var r = new i.keyhole.dbroot.SearchTabProto();
                if (
                  (void 0 !== e.isVisible &&
                    null !== e.isVisible &&
                    (r.isVisible = Boolean(e.isVisible)),
                  void 0 !== e.tabLabel && null !== e.tabLabel)
                ) {
                  if ('object' != typeof e.tabLabel)
                    throw TypeError(
                      '.keyhole.dbroot.SearchTabProto.tabLabel: object expected',
                    );
                  r.tabLabel = t[1].fromObject(e.tabLabel);
                }
                if (
                  (void 0 !== e.baseUrl &&
                    null !== e.baseUrl &&
                    (r.baseUrl = String(e.baseUrl)),
                  void 0 !== e.viewportPrefix &&
                    null !== e.viewportPrefix &&
                    (r.viewportPrefix = String(e.viewportPrefix)),
                  e.inputBox)
                ) {
                  if (!Array.isArray(e.inputBox))
                    throw TypeError(
                      '.keyhole.dbroot.SearchTabProto.inputBox: array expected',
                    );
                  r.inputBox = [];
                  for (var o = 0; o < e.inputBox.length; ++o) {
                    if ('object' != typeof e.inputBox[o])
                      throw TypeError(
                        '.keyhole.dbroot.SearchTabProto.inputBox: object expected',
                      );
                    r.inputBox[o] = t[4].fromObject(e.inputBox[o]);
                  }
                }
                if (void 0 !== e.requirement && null !== e.requirement) {
                  if ('object' != typeof e.requirement)
                    throw TypeError(
                      '.keyhole.dbroot.SearchTabProto.requirement: object expected',
                    );
                  r.requirement = t[5].fromObject(e.requirement);
                }
                return r;
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var o = {};
              if (
                ((r.arrays || r.defaults) && (o.inputBox = []),
                r.defaults &&
                  ((o.isVisible = !1),
                  (o.tabLabel = null),
                  (o.baseUrl = ''),
                  (o.viewportPrefix = ''),
                  (o.requirement = null)),
                void 0 !== e.isVisible &&
                  null !== e.isVisible &&
                  e.hasOwnProperty('isVisible') &&
                  (o.isVisible = e.isVisible),
                void 0 !== e.tabLabel &&
                  null !== e.tabLabel &&
                  e.hasOwnProperty('tabLabel') &&
                  (o.tabLabel = t[1].toObject(e.tabLabel, r)),
                void 0 !== e.baseUrl &&
                  null !== e.baseUrl &&
                  e.hasOwnProperty('baseUrl') &&
                  (o.baseUrl = e.baseUrl),
                void 0 !== e.viewportPrefix &&
                  null !== e.viewportPrefix &&
                  e.hasOwnProperty('viewportPrefix') &&
                  (o.viewportPrefix = e.viewportPrefix),
                void 0 !== e.inputBox &&
                  null !== e.inputBox &&
                  e.hasOwnProperty('inputBox'))
              ) {
                o.inputBox = [];
                for (var a = 0; a < e.inputBox.length; ++a)
                  o.inputBox[a] = t[4].toObject(e.inputBox[a], r);
              }
              return (
                void 0 !== e.requirement &&
                  null !== e.requirement &&
                  e.hasOwnProperty('requirement') &&
                  (o.requirement = t[5].toObject(e.requirement, r)),
                o
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            (r.InputBoxInfo = (function () {
              function r(e) {
                if (e)
                  for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                    this[r[t]] = e[r[t]];
              }
              (r.prototype.label = null),
                (r.prototype.queryVerb = ''),
                (r.prototype.queryPrepend = '');
              var t = { 0: 'keyhole.dbroot.StringIdOrValueProto' };
              return (
                n.push(t),
                (r.decode = function (e, r) {
                  e instanceof o || (e = o.create(e));
                  for (
                    var a = void 0 === r ? e.len : e.pos + r,
                      n = new i.keyhole.dbroot.SearchTabProto.InputBoxInfo();
                    e.pos < a;

                  ) {
                    var l = e.uint32();
                    switch (l >>> 3) {
                      case 1:
                        n.label = t[0].decode(e, e.uint32());
                        break;
                      case 2:
                        n.queryVerb = e.string();
                        break;
                      case 3:
                        n.queryPrepend = e.string();
                        break;
                      default:
                        e.skipType(7 & l);
                    }
                  }
                  return n;
                }),
                (r.verify = function (e) {
                  if ('object' != typeof e || null === e)
                    return 'object expected';
                  var r = t[0].verify(e.label);
                  return r
                    ? 'label.' + r
                    : a.isString(e.queryVerb)
                    ? void 0 === e.queryPrepend || a.isString(e.queryPrepend)
                      ? null
                      : 'queryPrepend: string expected'
                    : 'queryVerb: string expected';
                }),
                (r.from = r.fromObject =
                  function (e) {
                    if (
                      e instanceof i.keyhole.dbroot.SearchTabProto.InputBoxInfo
                    )
                      return e;
                    var r = new i.keyhole.dbroot.SearchTabProto.InputBoxInfo();
                    if (void 0 !== e.label && null !== e.label) {
                      if ('object' != typeof e.label)
                        throw TypeError(
                          '.keyhole.dbroot.SearchTabProto.InputBoxInfo.label: object expected',
                        );
                      r.label = t[0].fromObject(e.label);
                    }
                    return (
                      void 0 !== e.queryVerb &&
                        null !== e.queryVerb &&
                        (r.queryVerb = String(e.queryVerb)),
                      void 0 !== e.queryPrepend &&
                        null !== e.queryPrepend &&
                        (r.queryPrepend = String(e.queryPrepend)),
                      r
                    );
                  }),
                (r.toObject = function (e, r) {
                  r || (r = {});
                  var o = {};
                  return (
                    r.defaults &&
                      ((o.label = null),
                      (o.queryVerb = ''),
                      (o.queryPrepend = '')),
                    void 0 !== e.label &&
                      null !== e.label &&
                      e.hasOwnProperty('label') &&
                      (o.label = t[0].toObject(e.label, r)),
                    void 0 !== e.queryVerb &&
                      null !== e.queryVerb &&
                      e.hasOwnProperty('queryVerb') &&
                      (o.queryVerb = e.queryVerb),
                    void 0 !== e.queryPrepend &&
                      null !== e.queryPrepend &&
                      e.hasOwnProperty('queryPrepend') &&
                      (o.queryPrepend = e.queryPrepend),
                    o
                  );
                }),
                (r.prototype.toObject = function (e) {
                  return this.constructor.toObject(this, e);
                }),
                (r.prototype.toJSON = function () {
                  return this.constructor.toObject(this, e.util.toJSONOptions);
                }),
                r
              );
            })()),
            r
          );
        })()),
        (r.CobrandProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.logoUrl = ''),
            (r.prototype.xCoord = null),
            (r.prototype.yCoord = null),
            (r.prototype.tiePoint = 6),
            (r.prototype.screenSize = 0);
          var t,
            l = {
              1: 'keyhole.dbroot.CobrandProto.Coord',
              2: 'keyhole.dbroot.CobrandProto.Coord',
              3: 'keyhole.dbroot.CobrandProto.TiePoint',
            };
          return (
            n.push(l),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.CobrandProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.logoUrl = e.string();
                    break;
                  case 2:
                    a.xCoord = l[1].decode(e, e.uint32());
                    break;
                  case 3:
                    a.yCoord = l[2].decode(e, e.uint32());
                    break;
                  case 4:
                    a.tiePoint = e.uint32();
                    break;
                  case 5:
                    a.screenSize = e.double();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if (!a.isString(e.logoUrl)) return 'logoUrl: string expected';
              var r;
              if (
                void 0 !== e.xCoord &&
                null !== e.xCoord &&
                (r = l[1].verify(e.xCoord))
              )
                return 'xCoord.' + r;
              if (
                void 0 !== e.yCoord &&
                null !== e.yCoord &&
                (r = l[2].verify(e.yCoord))
              )
                return 'yCoord.' + r;
              if (void 0 !== e.tiePoint)
                switch (e.tiePoint) {
                  default:
                    return 'tiePoint: enum value expected';
                  case 0:
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                  case 8:
                }
              return void 0 !== e.screenSize && 'number' != typeof e.screenSize
                ? 'screenSize: number expected'
                : null;
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.CobrandProto) return e;
                var r = new i.keyhole.dbroot.CobrandProto();
                if (
                  (void 0 !== e.logoUrl &&
                    null !== e.logoUrl &&
                    (r.logoUrl = String(e.logoUrl)),
                  void 0 !== e.xCoord && null !== e.xCoord)
                ) {
                  if ('object' != typeof e.xCoord)
                    throw TypeError(
                      '.keyhole.dbroot.CobrandProto.xCoord: object expected',
                    );
                  r.xCoord = l[1].fromObject(e.xCoord);
                }
                if (void 0 !== e.yCoord && null !== e.yCoord) {
                  if ('object' != typeof e.yCoord)
                    throw TypeError(
                      '.keyhole.dbroot.CobrandProto.yCoord: object expected',
                    );
                  r.yCoord = l[2].fromObject(e.yCoord);
                }
                switch (e.tiePoint) {
                  case 'TOP_LEFT':
                  case 0:
                    r.tiePoint = 0;
                    break;
                  case 'TOP_CENTER':
                  case 1:
                    r.tiePoint = 1;
                    break;
                  case 'TOP_RIGHT':
                  case 2:
                    r.tiePoint = 2;
                    break;
                  case 'MID_LEFT':
                  case 3:
                    r.tiePoint = 3;
                    break;
                  case 'MID_CENTER':
                  case 4:
                    r.tiePoint = 4;
                    break;
                  case 'MID_RIGHT':
                  case 5:
                    r.tiePoint = 5;
                    break;
                  case 'BOTTOM_LEFT':
                  case 6:
                    r.tiePoint = 6;
                    break;
                  case 'BOTTOM_CENTER':
                  case 7:
                    r.tiePoint = 7;
                    break;
                  case 'BOTTOM_RIGHT':
                  case 8:
                    r.tiePoint = 8;
                }
                return (
                  void 0 !== e.screenSize &&
                    null !== e.screenSize &&
                    (r.screenSize = Number(e.screenSize)),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults &&
                  ((t.logoUrl = ''),
                  (t.xCoord = null),
                  (t.yCoord = null),
                  (t.tiePoint = r.enums === String ? 'BOTTOM_LEFT' : 6),
                  (t.screenSize = 0)),
                void 0 !== e.logoUrl &&
                  null !== e.logoUrl &&
                  e.hasOwnProperty('logoUrl') &&
                  (t.logoUrl = e.logoUrl),
                void 0 !== e.xCoord &&
                  null !== e.xCoord &&
                  e.hasOwnProperty('xCoord') &&
                  (t.xCoord = l[1].toObject(e.xCoord, r)),
                void 0 !== e.yCoord &&
                  null !== e.yCoord &&
                  e.hasOwnProperty('yCoord') &&
                  (t.yCoord = l[2].toObject(e.yCoord, r)),
                void 0 !== e.tiePoint &&
                  null !== e.tiePoint &&
                  e.hasOwnProperty('tiePoint') &&
                  (t.tiePoint =
                    r.enums === String ? l[3][e.tiePoint] : e.tiePoint),
                void 0 !== e.screenSize &&
                  null !== e.screenSize &&
                  e.hasOwnProperty('screenSize') &&
                  (t.screenSize = e.screenSize),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            (r.Coord = (function () {
              function r(e) {
                if (e)
                  for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                    this[r[t]] = e[r[t]];
              }
              return (
                (r.prototype.value = 0),
                (r.prototype.isRelative = !1),
                (r.decode = function (e, r) {
                  e instanceof o || (e = o.create(e));
                  for (
                    var t = void 0 === r ? e.len : e.pos + r,
                      a = new i.keyhole.dbroot.CobrandProto.Coord();
                    e.pos < t;

                  ) {
                    var n = e.uint32();
                    switch (n >>> 3) {
                      case 1:
                        a.value = e.double();
                        break;
                      case 2:
                        a.isRelative = e.bool();
                        break;
                      default:
                        e.skipType(7 & n);
                    }
                  }
                  return a;
                }),
                (r.verify = function (e) {
                  return 'object' != typeof e || null === e
                    ? 'object expected'
                    : 'number' != typeof e.value
                    ? 'value: number expected'
                    : void 0 !== e.isRelative &&
                      'boolean' != typeof e.isRelative
                    ? 'isRelative: boolean expected'
                    : null;
                }),
                (r.from = r.fromObject =
                  function (e) {
                    if (e instanceof i.keyhole.dbroot.CobrandProto.Coord)
                      return e;
                    var r = new i.keyhole.dbroot.CobrandProto.Coord();
                    return (
                      void 0 !== e.value &&
                        null !== e.value &&
                        (r.value = Number(e.value)),
                      void 0 !== e.isRelative &&
                        null !== e.isRelative &&
                        (r.isRelative = Boolean(e.isRelative)),
                      r
                    );
                  }),
                (r.toObject = function (e, r) {
                  r || (r = {});
                  var t = {};
                  return (
                    r.defaults && ((t.value = 0), (t.isRelative = !1)),
                    void 0 !== e.value &&
                      null !== e.value &&
                      e.hasOwnProperty('value') &&
                      (t.value = e.value),
                    void 0 !== e.isRelative &&
                      null !== e.isRelative &&
                      e.hasOwnProperty('isRelative') &&
                      (t.isRelative = e.isRelative),
                    t
                  );
                }),
                (r.prototype.toObject = function (e) {
                  return this.constructor.toObject(this, e);
                }),
                (r.prototype.toJSON = function () {
                  return this.constructor.toObject(this, e.util.toJSONOptions);
                }),
                r
              );
            })()),
            (r.TiePoint =
              (((t = Object.create({})).TOP_LEFT = 0),
              (t.TOP_CENTER = 1),
              (t.TOP_RIGHT = 2),
              (t.MID_LEFT = 3),
              (t.MID_CENTER = 4),
              (t.MID_RIGHT = 5),
              (t.BOTTOM_LEFT = 6),
              (t.BOTTOM_CENTER = 7),
              (t.BOTTOM_RIGHT = 8),
              t)),
            r
          );
        })()),
        (r.DatabaseDescriptionProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.databaseName = null), (r.prototype.databaseUrl = '');
          var t = { 0: 'keyhole.dbroot.StringIdOrValueProto' };
          return (
            n.push(t),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var a = void 0 === r ? e.len : e.pos + r,
                  n = new i.keyhole.dbroot.DatabaseDescriptionProto();
                e.pos < a;

              ) {
                var l = e.uint32();
                switch (l >>> 3) {
                  case 1:
                    n.databaseName = t[0].decode(e, e.uint32());
                    break;
                  case 2:
                    n.databaseUrl = e.string();
                    break;
                  default:
                    e.skipType(7 & l);
                }
              }
              return n;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if (void 0 !== e.databaseName && null !== e.databaseName) {
                var r = t[0].verify(e.databaseName);
                if (r) return 'databaseName.' + r;
              }
              return a.isString(e.databaseUrl)
                ? null
                : 'databaseUrl: string expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.DatabaseDescriptionProto)
                  return e;
                var r = new i.keyhole.dbroot.DatabaseDescriptionProto();
                if (void 0 !== e.databaseName && null !== e.databaseName) {
                  if ('object' != typeof e.databaseName)
                    throw TypeError(
                      '.keyhole.dbroot.DatabaseDescriptionProto.databaseName: object expected',
                    );
                  r.databaseName = t[0].fromObject(e.databaseName);
                }
                return (
                  void 0 !== e.databaseUrl &&
                    null !== e.databaseUrl &&
                    (r.databaseUrl = String(e.databaseUrl)),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var o = {};
              return (
                r.defaults && ((o.databaseName = null), (o.databaseUrl = '')),
                void 0 !== e.databaseName &&
                  null !== e.databaseName &&
                  e.hasOwnProperty('databaseName') &&
                  (o.databaseName = t[0].toObject(e.databaseName, r)),
                void 0 !== e.databaseUrl &&
                  null !== e.databaseUrl &&
                  e.hasOwnProperty('databaseUrl') &&
                  (o.databaseUrl = e.databaseUrl),
                o
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.ConfigScriptProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.scriptName = ''),
            (r.prototype.scriptData = ''),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.ConfigScriptProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.scriptName = e.string();
                    break;
                  case 2:
                    a.scriptData = e.string();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : a.isString(e.scriptName)
                ? a.isString(e.scriptData)
                  ? null
                  : 'scriptData: string expected'
                : 'scriptName: string expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.ConfigScriptProto) return e;
                var r = new i.keyhole.dbroot.ConfigScriptProto();
                return (
                  void 0 !== e.scriptName &&
                    null !== e.scriptName &&
                    (r.scriptName = String(e.scriptName)),
                  void 0 !== e.scriptData &&
                    null !== e.scriptData &&
                    (r.scriptData = String(e.scriptData)),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults && ((t.scriptName = ''), (t.scriptData = '')),
                void 0 !== e.scriptName &&
                  null !== e.scriptName &&
                  e.hasOwnProperty('scriptName') &&
                  (t.scriptName = e.scriptName),
                void 0 !== e.scriptData &&
                  null !== e.scriptData &&
                  e.hasOwnProperty('scriptData') &&
                  (t.scriptData = e.scriptData),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.SwoopParamsProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.startDistInMeters = 0),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.SwoopParamsProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                if (n >>> 3 == 1) a.startDistInMeters = e.double();
                else e.skipType(7 & n);
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : void 0 !== e.startDistInMeters &&
                  'number' != typeof e.startDistInMeters
                ? 'startDistInMeters: number expected'
                : null;
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.SwoopParamsProto) return e;
                var r = new i.keyhole.dbroot.SwoopParamsProto();
                return (
                  void 0 !== e.startDistInMeters &&
                    null !== e.startDistInMeters &&
                    (r.startDistInMeters = Number(e.startDistInMeters)),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults && (t.startDistInMeters = 0),
                void 0 !== e.startDistInMeters &&
                  null !== e.startDistInMeters &&
                  e.hasOwnProperty('startDistInMeters') &&
                  (t.startDistInMeters = e.startDistInMeters),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.PostingServerProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.name = null),
            (r.prototype.baseUrl = null),
            (r.prototype.postWizardPath = null),
            (r.prototype.fileSubmitPath = null);
          var t = {
            0: 'keyhole.dbroot.StringIdOrValueProto',
            1: 'keyhole.dbroot.StringIdOrValueProto',
            2: 'keyhole.dbroot.StringIdOrValueProto',
            3: 'keyhole.dbroot.StringIdOrValueProto',
          };
          return (
            n.push(t),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var a = void 0 === r ? e.len : e.pos + r,
                  n = new i.keyhole.dbroot.PostingServerProto();
                e.pos < a;

              ) {
                var l = e.uint32();
                switch (l >>> 3) {
                  case 1:
                    n.name = t[0].decode(e, e.uint32());
                    break;
                  case 2:
                    n.baseUrl = t[1].decode(e, e.uint32());
                    break;
                  case 3:
                    n.postWizardPath = t[2].decode(e, e.uint32());
                    break;
                  case 4:
                    n.fileSubmitPath = t[3].decode(e, e.uint32());
                    break;
                  default:
                    e.skipType(7 & l);
                }
              }
              return n;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : void 0 !== e.name &&
                  null !== e.name &&
                  (r = t[0].verify(e.name))
                ? 'name.' + r
                : void 0 !== e.baseUrl &&
                  null !== e.baseUrl &&
                  (r = t[1].verify(e.baseUrl))
                ? 'baseUrl.' + r
                : void 0 !== e.postWizardPath &&
                  null !== e.postWizardPath &&
                  (r = t[2].verify(e.postWizardPath))
                ? 'postWizardPath.' + r
                : void 0 !== e.fileSubmitPath &&
                  null !== e.fileSubmitPath &&
                  (r = t[3].verify(e.fileSubmitPath))
                ? 'fileSubmitPath.' + r
                : null;
              var r;
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.PostingServerProto) return e;
                var r = new i.keyhole.dbroot.PostingServerProto();
                if (void 0 !== e.name && null !== e.name) {
                  if ('object' != typeof e.name)
                    throw TypeError(
                      '.keyhole.dbroot.PostingServerProto.name: object expected',
                    );
                  r.name = t[0].fromObject(e.name);
                }
                if (void 0 !== e.baseUrl && null !== e.baseUrl) {
                  if ('object' != typeof e.baseUrl)
                    throw TypeError(
                      '.keyhole.dbroot.PostingServerProto.baseUrl: object expected',
                    );
                  r.baseUrl = t[1].fromObject(e.baseUrl);
                }
                if (void 0 !== e.postWizardPath && null !== e.postWizardPath) {
                  if ('object' != typeof e.postWizardPath)
                    throw TypeError(
                      '.keyhole.dbroot.PostingServerProto.postWizardPath: object expected',
                    );
                  r.postWizardPath = t[2].fromObject(e.postWizardPath);
                }
                if (void 0 !== e.fileSubmitPath && null !== e.fileSubmitPath) {
                  if ('object' != typeof e.fileSubmitPath)
                    throw TypeError(
                      '.keyhole.dbroot.PostingServerProto.fileSubmitPath: object expected',
                    );
                  r.fileSubmitPath = t[3].fromObject(e.fileSubmitPath);
                }
                return r;
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var o = {};
              return (
                r.defaults &&
                  ((o.name = null),
                  (o.baseUrl = null),
                  (o.postWizardPath = null),
                  (o.fileSubmitPath = null)),
                void 0 !== e.name &&
                  null !== e.name &&
                  e.hasOwnProperty('name') &&
                  (o.name = t[0].toObject(e.name, r)),
                void 0 !== e.baseUrl &&
                  null !== e.baseUrl &&
                  e.hasOwnProperty('baseUrl') &&
                  (o.baseUrl = t[1].toObject(e.baseUrl, r)),
                void 0 !== e.postWizardPath &&
                  null !== e.postWizardPath &&
                  e.hasOwnProperty('postWizardPath') &&
                  (o.postWizardPath = t[2].toObject(e.postWizardPath, r)),
                void 0 !== e.fileSubmitPath &&
                  null !== e.fileSubmitPath &&
                  e.hasOwnProperty('fileSubmitPath') &&
                  (o.fileSubmitPath = t[3].toObject(e.fileSubmitPath, r)),
                o
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.PlanetaryDatabaseProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.url = null), (r.prototype.name = null);
          var t = {
            0: 'keyhole.dbroot.StringIdOrValueProto',
            1: 'keyhole.dbroot.StringIdOrValueProto',
          };
          return (
            n.push(t),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var a = void 0 === r ? e.len : e.pos + r,
                  n = new i.keyhole.dbroot.PlanetaryDatabaseProto();
                e.pos < a;

              ) {
                var l = e.uint32();
                switch (l >>> 3) {
                  case 1:
                    n.url = t[0].decode(e, e.uint32());
                    break;
                  case 2:
                    n.name = t[1].decode(e, e.uint32());
                    break;
                  default:
                    e.skipType(7 & l);
                }
              }
              return n;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : (r = t[0].verify(e.url))
                ? 'url.' + r
                : (r = t[1].verify(e.name))
                ? 'name.' + r
                : null;
              var r;
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.PlanetaryDatabaseProto)
                  return e;
                var r = new i.keyhole.dbroot.PlanetaryDatabaseProto();
                if (void 0 !== e.url && null !== e.url) {
                  if ('object' != typeof e.url)
                    throw TypeError(
                      '.keyhole.dbroot.PlanetaryDatabaseProto.url: object expected',
                    );
                  r.url = t[0].fromObject(e.url);
                }
                if (void 0 !== e.name && null !== e.name) {
                  if ('object' != typeof e.name)
                    throw TypeError(
                      '.keyhole.dbroot.PlanetaryDatabaseProto.name: object expected',
                    );
                  r.name = t[1].fromObject(e.name);
                }
                return r;
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var o = {};
              return (
                r.defaults && ((o.url = null), (o.name = null)),
                void 0 !== e.url &&
                  null !== e.url &&
                  e.hasOwnProperty('url') &&
                  (o.url = t[0].toObject(e.url, r)),
                void 0 !== e.name &&
                  null !== e.name &&
                  e.hasOwnProperty('name') &&
                  (o.name = t[1].toObject(e.name, r)),
                o
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.LogServerProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.url = null),
            (r.prototype.enable = !1),
            (r.prototype.throttlingFactor = 1);
          var t = { 0: 'keyhole.dbroot.StringIdOrValueProto' };
          return (
            n.push(t),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var a = void 0 === r ? e.len : e.pos + r,
                  n = new i.keyhole.dbroot.LogServerProto();
                e.pos < a;

              ) {
                var l = e.uint32();
                switch (l >>> 3) {
                  case 1:
                    n.url = t[0].decode(e, e.uint32());
                    break;
                  case 2:
                    n.enable = e.bool();
                    break;
                  case 3:
                    n.throttlingFactor = e.int32();
                    break;
                  default:
                    e.skipType(7 & l);
                }
              }
              return n;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if (void 0 !== e.url && null !== e.url) {
                var r = t[0].verify(e.url);
                if (r) return 'url.' + r;
              }
              return void 0 !== e.enable && 'boolean' != typeof e.enable
                ? 'enable: boolean expected'
                : void 0 === e.throttlingFactor ||
                  a.isInteger(e.throttlingFactor)
                ? null
                : 'throttlingFactor: integer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.LogServerProto) return e;
                var r = new i.keyhole.dbroot.LogServerProto();
                if (void 0 !== e.url && null !== e.url) {
                  if ('object' != typeof e.url)
                    throw TypeError(
                      '.keyhole.dbroot.LogServerProto.url: object expected',
                    );
                  r.url = t[0].fromObject(e.url);
                }
                return (
                  void 0 !== e.enable &&
                    null !== e.enable &&
                    (r.enable = Boolean(e.enable)),
                  void 0 !== e.throttlingFactor &&
                    null !== e.throttlingFactor &&
                    (r.throttlingFactor = 0 | e.throttlingFactor),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var o = {};
              return (
                r.defaults &&
                  ((o.url = null), (o.enable = !1), (o.throttlingFactor = 1)),
                void 0 !== e.url &&
                  null !== e.url &&
                  e.hasOwnProperty('url') &&
                  (o.url = t[0].toObject(e.url, r)),
                void 0 !== e.enable &&
                  null !== e.enable &&
                  e.hasOwnProperty('enable') &&
                  (o.enable = e.enable),
                void 0 !== e.throttlingFactor &&
                  null !== e.throttlingFactor &&
                  e.hasOwnProperty('throttlingFactor') &&
                  (o.throttlingFactor = e.throttlingFactor),
                o
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.EndSnippetProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.model = null),
            (r.prototype.authServerUrl = null),
            (r.prototype.disableAuthentication = !1),
            (r.prototype.mfeDomains = a.emptyArray),
            (r.prototype.mfeLangParam = 'hl=$5Bhl5D'),
            (r.prototype.adsUrlPatterns = ''),
            (r.prototype.reverseGeocoderUrl = null),
            (r.prototype.reverseGeocoderProtocolVersion = 3),
            (r.prototype.skyDatabaseIsAvailable = !0),
            (r.prototype.skyDatabaseUrl = null),
            (r.prototype.defaultWebPageIntlUrl = null),
            (r.prototype.numStartUpTips = 17),
            (r.prototype.startUpTipsUrl = null),
            (r.prototype.numProStartUpTips = 0),
            (r.prototype.proStartUpTipsUrl = null),
            (r.prototype.startupTipsIntlUrl = null),
            (r.prototype.userGuideIntlUrl = null),
            (r.prototype.supportCenterIntlUrl = null),
            (r.prototype.businessListingIntlUrl = null),
            (r.prototype.supportAnswerIntlUrl = null),
            (r.prototype.supportTopicIntlUrl = null),
            (r.prototype.supportRequestIntlUrl = null),
            (r.prototype.earthIntlUrl = null),
            (r.prototype.addContentUrl = null),
            (r.prototype.sketchupNotInstalledUrl = null),
            (r.prototype.sketchupErrorUrl = null),
            (r.prototype.freeLicenseUrl = null),
            (r.prototype.proLicenseUrl = null),
            (r.prototype.tutorialUrl = null),
            (r.prototype.keyboardShortcutsUrl = null),
            (r.prototype.releaseNotesUrl = null),
            (r.prototype.hideUserData = !1),
            (r.prototype.useGeLogo = !0),
            (r.prototype.dioramaDescriptionUrlBase = null),
            (r.prototype.dioramaDefaultColor = 4291281607),
            (r.prototype.dioramaBlacklistUrl = null),
            (r.prototype.clientOptions = null),
            (r.prototype.fetchingOptions = null),
            (r.prototype.timeMachineOptions = null),
            (r.prototype.csiOptions = null),
            (r.prototype.searchTab = a.emptyArray),
            (r.prototype.cobrandInfo = a.emptyArray),
            (r.prototype.validDatabase = a.emptyArray),
            (r.prototype.configScript = a.emptyArray),
            (r.prototype.deauthServerUrl = null),
            (r.prototype.swoopParameters = null),
            (r.prototype.bbsServerInfo = null),
            (r.prototype.dataErrorServerInfo = null),
            (r.prototype.planetaryDatabase = a.emptyArray),
            (r.prototype.logServer = null),
            (r.prototype.autopiaOptions = null),
            (r.prototype.searchConfig = null),
            (r.prototype.searchInfo = null),
            (r.prototype.elevationServiceBaseUrl =
              'http://maps.google.com/maps/api/elevation/'),
            (r.prototype.elevationProfileQueryDelay = 500),
            (r.prototype.proUpgradeUrl = null),
            (r.prototype.earthCommunityUrl = null),
            (r.prototype.googleMapsUrl = null),
            (r.prototype.sharingUrl = null),
            (r.prototype.privacyPolicyUrl = null),
            (r.prototype.doGplusUserCheck = !1),
            (r.prototype.rocktreeDataProto = null),
            (r.prototype.filmstripConfig = a.emptyArray),
            (r.prototype.showSigninButton = !1),
            (r.prototype.proMeasureUpsellUrl = null),
            (r.prototype.proPrintUpsellUrl = null),
            (r.prototype.starDataProto = null),
            (r.prototype.feedbackUrl = null),
            (r.prototype.oauth2LoginUrl = null);
          var t = {
            0: 'keyhole.dbroot.PlanetModelProto',
            1: 'keyhole.dbroot.StringIdOrValueProto',
            3: 'keyhole.dbroot.MfeDomainFeaturesProto',
            6: 'keyhole.dbroot.StringIdOrValueProto',
            9: 'keyhole.dbroot.StringIdOrValueProto',
            10: 'keyhole.dbroot.StringIdOrValueProto',
            12: 'keyhole.dbroot.StringIdOrValueProto',
            14: 'keyhole.dbroot.StringIdOrValueProto',
            15: 'keyhole.dbroot.StringIdOrValueProto',
            16: 'keyhole.dbroot.StringIdOrValueProto',
            17: 'keyhole.dbroot.StringIdOrValueProto',
            18: 'keyhole.dbroot.StringIdOrValueProto',
            19: 'keyhole.dbroot.StringIdOrValueProto',
            20: 'keyhole.dbroot.StringIdOrValueProto',
            21: 'keyhole.dbroot.StringIdOrValueProto',
            22: 'keyhole.dbroot.StringIdOrValueProto',
            23: 'keyhole.dbroot.StringIdOrValueProto',
            24: 'keyhole.dbroot.StringIdOrValueProto',
            25: 'keyhole.dbroot.StringIdOrValueProto',
            26: 'keyhole.dbroot.StringIdOrValueProto',
            27: 'keyhole.dbroot.StringIdOrValueProto',
            28: 'keyhole.dbroot.StringIdOrValueProto',
            29: 'keyhole.dbroot.StringIdOrValueProto',
            30: 'keyhole.dbroot.StringIdOrValueProto',
            33: 'keyhole.dbroot.StringIdOrValueProto',
            35: 'keyhole.dbroot.StringIdOrValueProto',
            36: 'keyhole.dbroot.ClientOptionsProto',
            37: 'keyhole.dbroot.FetchingOptionsProto',
            38: 'keyhole.dbroot.TimeMachineOptionsProto',
            39: 'keyhole.dbroot.CSIOptionsProto',
            40: 'keyhole.dbroot.SearchTabProto',
            41: 'keyhole.dbroot.CobrandProto',
            42: 'keyhole.dbroot.DatabaseDescriptionProto',
            43: 'keyhole.dbroot.ConfigScriptProto',
            44: 'keyhole.dbroot.StringIdOrValueProto',
            45: 'keyhole.dbroot.SwoopParamsProto',
            46: 'keyhole.dbroot.PostingServerProto',
            47: 'keyhole.dbroot.PostingServerProto',
            48: 'keyhole.dbroot.PlanetaryDatabaseProto',
            49: 'keyhole.dbroot.LogServerProto',
            50: 'keyhole.dbroot.AutopiaOptionsProto',
            51: 'keyhole.dbroot.EndSnippetProto.SearchConfigProto',
            52: 'keyhole.dbroot.EndSnippetProto.SearchInfoProto',
            55: 'keyhole.dbroot.StringIdOrValueProto',
            56: 'keyhole.dbroot.StringIdOrValueProto',
            57: 'keyhole.dbroot.StringIdOrValueProto',
            58: 'keyhole.dbroot.StringIdOrValueProto',
            59: 'keyhole.dbroot.StringIdOrValueProto',
            61: 'keyhole.dbroot.EndSnippetProto.RockTreeDataProto',
            62: 'keyhole.dbroot.EndSnippetProto.FilmstripConfigProto',
            64: 'keyhole.dbroot.StringIdOrValueProto',
            65: 'keyhole.dbroot.StringIdOrValueProto',
            66: 'keyhole.dbroot.EndSnippetProto.StarDataProto',
            67: 'keyhole.dbroot.StringIdOrValueProto',
            68: 'keyhole.dbroot.StringIdOrValueProto',
          };
          return (
            n.push(t),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var a = void 0 === r ? e.len : e.pos + r,
                  n = new i.keyhole.dbroot.EndSnippetProto();
                e.pos < a;

              ) {
                var l = e.uint32();
                switch (l >>> 3) {
                  case 1:
                    n.model = t[0].decode(e, e.uint32());
                    break;
                  case 2:
                    n.authServerUrl = t[1].decode(e, e.uint32());
                    break;
                  case 3:
                    n.disableAuthentication = e.bool();
                    break;
                  case 4:
                    (n.mfeDomains && n.mfeDomains.length) ||
                      (n.mfeDomains = []),
                      n.mfeDomains.push(t[3].decode(e, e.uint32()));
                    break;
                  case 5:
                    n.mfeLangParam = e.string();
                    break;
                  case 6:
                    n.adsUrlPatterns = e.string();
                    break;
                  case 7:
                    n.reverseGeocoderUrl = t[6].decode(e, e.uint32());
                    break;
                  case 8:
                    n.reverseGeocoderProtocolVersion = e.int32();
                    break;
                  case 9:
                    n.skyDatabaseIsAvailable = e.bool();
                    break;
                  case 10:
                    n.skyDatabaseUrl = t[9].decode(e, e.uint32());
                    break;
                  case 11:
                    n.defaultWebPageIntlUrl = t[10].decode(e, e.uint32());
                    break;
                  case 12:
                    n.numStartUpTips = e.int32();
                    break;
                  case 13:
                    n.startUpTipsUrl = t[12].decode(e, e.uint32());
                    break;
                  case 51:
                    n.numProStartUpTips = e.int32();
                    break;
                  case 52:
                    n.proStartUpTipsUrl = t[14].decode(e, e.uint32());
                    break;
                  case 64:
                    n.startupTipsIntlUrl = t[15].decode(e, e.uint32());
                    break;
                  case 14:
                    n.userGuideIntlUrl = t[16].decode(e, e.uint32());
                    break;
                  case 15:
                    n.supportCenterIntlUrl = t[17].decode(e, e.uint32());
                    break;
                  case 16:
                    n.businessListingIntlUrl = t[18].decode(e, e.uint32());
                    break;
                  case 17:
                    n.supportAnswerIntlUrl = t[19].decode(e, e.uint32());
                    break;
                  case 18:
                    n.supportTopicIntlUrl = t[20].decode(e, e.uint32());
                    break;
                  case 19:
                    n.supportRequestIntlUrl = t[21].decode(e, e.uint32());
                    break;
                  case 20:
                    n.earthIntlUrl = t[22].decode(e, e.uint32());
                    break;
                  case 21:
                    n.addContentUrl = t[23].decode(e, e.uint32());
                    break;
                  case 22:
                    n.sketchupNotInstalledUrl = t[24].decode(e, e.uint32());
                    break;
                  case 23:
                    n.sketchupErrorUrl = t[25].decode(e, e.uint32());
                    break;
                  case 24:
                    n.freeLicenseUrl = t[26].decode(e, e.uint32());
                    break;
                  case 25:
                    n.proLicenseUrl = t[27].decode(e, e.uint32());
                    break;
                  case 48:
                    n.tutorialUrl = t[28].decode(e, e.uint32());
                    break;
                  case 49:
                    n.keyboardShortcutsUrl = t[29].decode(e, e.uint32());
                    break;
                  case 50:
                    n.releaseNotesUrl = t[30].decode(e, e.uint32());
                    break;
                  case 26:
                    n.hideUserData = e.bool();
                    break;
                  case 27:
                    n.useGeLogo = e.bool();
                    break;
                  case 28:
                    n.dioramaDescriptionUrlBase = t[33].decode(e, e.uint32());
                    break;
                  case 29:
                    n.dioramaDefaultColor = e.uint32();
                    break;
                  case 53:
                    n.dioramaBlacklistUrl = t[35].decode(e, e.uint32());
                    break;
                  case 30:
                    n.clientOptions = t[36].decode(e, e.uint32());
                    break;
                  case 31:
                    n.fetchingOptions = t[37].decode(e, e.uint32());
                    break;
                  case 32:
                    n.timeMachineOptions = t[38].decode(e, e.uint32());
                    break;
                  case 33:
                    n.csiOptions = t[39].decode(e, e.uint32());
                    break;
                  case 34:
                    (n.searchTab && n.searchTab.length) || (n.searchTab = []),
                      n.searchTab.push(t[40].decode(e, e.uint32()));
                    break;
                  case 35:
                    (n.cobrandInfo && n.cobrandInfo.length) ||
                      (n.cobrandInfo = []),
                      n.cobrandInfo.push(t[41].decode(e, e.uint32()));
                    break;
                  case 36:
                    (n.validDatabase && n.validDatabase.length) ||
                      (n.validDatabase = []),
                      n.validDatabase.push(t[42].decode(e, e.uint32()));
                    break;
                  case 37:
                    (n.configScript && n.configScript.length) ||
                      (n.configScript = []),
                      n.configScript.push(t[43].decode(e, e.uint32()));
                    break;
                  case 38:
                    n.deauthServerUrl = t[44].decode(e, e.uint32());
                    break;
                  case 39:
                    n.swoopParameters = t[45].decode(e, e.uint32());
                    break;
                  case 40:
                    n.bbsServerInfo = t[46].decode(e, e.uint32());
                    break;
                  case 41:
                    n.dataErrorServerInfo = t[47].decode(e, e.uint32());
                    break;
                  case 42:
                    (n.planetaryDatabase && n.planetaryDatabase.length) ||
                      (n.planetaryDatabase = []),
                      n.planetaryDatabase.push(t[48].decode(e, e.uint32()));
                    break;
                  case 43:
                    n.logServer = t[49].decode(e, e.uint32());
                    break;
                  case 44:
                    n.autopiaOptions = t[50].decode(e, e.uint32());
                    break;
                  case 54:
                    n.searchConfig = t[51].decode(e, e.uint32());
                    break;
                  case 45:
                    n.searchInfo = t[52].decode(e, e.uint32());
                    break;
                  case 46:
                    n.elevationServiceBaseUrl = e.string();
                    break;
                  case 47:
                    n.elevationProfileQueryDelay = e.int32();
                    break;
                  case 55:
                    n.proUpgradeUrl = t[55].decode(e, e.uint32());
                    break;
                  case 56:
                    n.earthCommunityUrl = t[56].decode(e, e.uint32());
                    break;
                  case 57:
                    n.googleMapsUrl = t[57].decode(e, e.uint32());
                    break;
                  case 58:
                    n.sharingUrl = t[58].decode(e, e.uint32());
                    break;
                  case 59:
                    n.privacyPolicyUrl = t[59].decode(e, e.uint32());
                    break;
                  case 60:
                    n.doGplusUserCheck = e.bool();
                    break;
                  case 61:
                    n.rocktreeDataProto = t[61].decode(e, e.uint32());
                    break;
                  case 62:
                    (n.filmstripConfig && n.filmstripConfig.length) ||
                      (n.filmstripConfig = []),
                      n.filmstripConfig.push(t[62].decode(e, e.uint32()));
                    break;
                  case 63:
                    n.showSigninButton = e.bool();
                    break;
                  case 65:
                    n.proMeasureUpsellUrl = t[64].decode(e, e.uint32());
                    break;
                  case 66:
                    n.proPrintUpsellUrl = t[65].decode(e, e.uint32());
                    break;
                  case 67:
                    n.starDataProto = t[66].decode(e, e.uint32());
                    break;
                  case 68:
                    n.feedbackUrl = t[67].decode(e, e.uint32());
                    break;
                  case 69:
                    n.oauth2LoginUrl = t[68].decode(e, e.uint32());
                    break;
                  default:
                    e.skipType(7 & l);
                }
              }
              return n;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if (
                void 0 !== e.model &&
                null !== e.model &&
                (o = t[0].verify(e.model))
              )
                return 'model.' + o;
              if (
                void 0 !== e.authServerUrl &&
                null !== e.authServerUrl &&
                (o = t[1].verify(e.authServerUrl))
              )
                return 'authServerUrl.' + o;
              if (
                void 0 !== e.disableAuthentication &&
                'boolean' != typeof e.disableAuthentication
              )
                return 'disableAuthentication: boolean expected';
              if (void 0 !== e.mfeDomains) {
                if (!Array.isArray(e.mfeDomains))
                  return 'mfeDomains: array expected';
                for (var r = 0; r < e.mfeDomains.length; ++r)
                  if ((o = t[3].verify(e.mfeDomains[r])))
                    return 'mfeDomains.' + o;
              }
              if (void 0 !== e.mfeLangParam && !a.isString(e.mfeLangParam))
                return 'mfeLangParam: string expected';
              if (void 0 !== e.adsUrlPatterns && !a.isString(e.adsUrlPatterns))
                return 'adsUrlPatterns: string expected';
              if (
                void 0 !== e.reverseGeocoderUrl &&
                null !== e.reverseGeocoderUrl &&
                (o = t[6].verify(e.reverseGeocoderUrl))
              )
                return 'reverseGeocoderUrl.' + o;
              if (
                void 0 !== e.reverseGeocoderProtocolVersion &&
                !a.isInteger(e.reverseGeocoderProtocolVersion)
              )
                return 'reverseGeocoderProtocolVersion: integer expected';
              if (
                void 0 !== e.skyDatabaseIsAvailable &&
                'boolean' != typeof e.skyDatabaseIsAvailable
              )
                return 'skyDatabaseIsAvailable: boolean expected';
              if (
                void 0 !== e.skyDatabaseUrl &&
                null !== e.skyDatabaseUrl &&
                (o = t[9].verify(e.skyDatabaseUrl))
              )
                return 'skyDatabaseUrl.' + o;
              if (
                void 0 !== e.defaultWebPageIntlUrl &&
                null !== e.defaultWebPageIntlUrl &&
                (o = t[10].verify(e.defaultWebPageIntlUrl))
              )
                return 'defaultWebPageIntlUrl.' + o;
              if (void 0 !== e.numStartUpTips && !a.isInteger(e.numStartUpTips))
                return 'numStartUpTips: integer expected';
              if (
                void 0 !== e.startUpTipsUrl &&
                null !== e.startUpTipsUrl &&
                (o = t[12].verify(e.startUpTipsUrl))
              )
                return 'startUpTipsUrl.' + o;
              if (
                void 0 !== e.numProStartUpTips &&
                !a.isInteger(e.numProStartUpTips)
              )
                return 'numProStartUpTips: integer expected';
              if (
                void 0 !== e.proStartUpTipsUrl &&
                null !== e.proStartUpTipsUrl &&
                (o = t[14].verify(e.proStartUpTipsUrl))
              )
                return 'proStartUpTipsUrl.' + o;
              if (
                void 0 !== e.startupTipsIntlUrl &&
                null !== e.startupTipsIntlUrl &&
                (o = t[15].verify(e.startupTipsIntlUrl))
              )
                return 'startupTipsIntlUrl.' + o;
              if (
                void 0 !== e.userGuideIntlUrl &&
                null !== e.userGuideIntlUrl &&
                (o = t[16].verify(e.userGuideIntlUrl))
              )
                return 'userGuideIntlUrl.' + o;
              if (
                void 0 !== e.supportCenterIntlUrl &&
                null !== e.supportCenterIntlUrl &&
                (o = t[17].verify(e.supportCenterIntlUrl))
              )
                return 'supportCenterIntlUrl.' + o;
              if (
                void 0 !== e.businessListingIntlUrl &&
                null !== e.businessListingIntlUrl &&
                (o = t[18].verify(e.businessListingIntlUrl))
              )
                return 'businessListingIntlUrl.' + o;
              if (
                void 0 !== e.supportAnswerIntlUrl &&
                null !== e.supportAnswerIntlUrl &&
                (o = t[19].verify(e.supportAnswerIntlUrl))
              )
                return 'supportAnswerIntlUrl.' + o;
              if (
                void 0 !== e.supportTopicIntlUrl &&
                null !== e.supportTopicIntlUrl &&
                (o = t[20].verify(e.supportTopicIntlUrl))
              )
                return 'supportTopicIntlUrl.' + o;
              if (
                void 0 !== e.supportRequestIntlUrl &&
                null !== e.supportRequestIntlUrl &&
                (o = t[21].verify(e.supportRequestIntlUrl))
              )
                return 'supportRequestIntlUrl.' + o;
              if (
                void 0 !== e.earthIntlUrl &&
                null !== e.earthIntlUrl &&
                (o = t[22].verify(e.earthIntlUrl))
              )
                return 'earthIntlUrl.' + o;
              if (
                void 0 !== e.addContentUrl &&
                null !== e.addContentUrl &&
                (o = t[23].verify(e.addContentUrl))
              )
                return 'addContentUrl.' + o;
              if (
                void 0 !== e.sketchupNotInstalledUrl &&
                null !== e.sketchupNotInstalledUrl &&
                (o = t[24].verify(e.sketchupNotInstalledUrl))
              )
                return 'sketchupNotInstalledUrl.' + o;
              if (
                void 0 !== e.sketchupErrorUrl &&
                null !== e.sketchupErrorUrl &&
                (o = t[25].verify(e.sketchupErrorUrl))
              )
                return 'sketchupErrorUrl.' + o;
              if (
                void 0 !== e.freeLicenseUrl &&
                null !== e.freeLicenseUrl &&
                (o = t[26].verify(e.freeLicenseUrl))
              )
                return 'freeLicenseUrl.' + o;
              if (
                void 0 !== e.proLicenseUrl &&
                null !== e.proLicenseUrl &&
                (o = t[27].verify(e.proLicenseUrl))
              )
                return 'proLicenseUrl.' + o;
              if (
                void 0 !== e.tutorialUrl &&
                null !== e.tutorialUrl &&
                (o = t[28].verify(e.tutorialUrl))
              )
                return 'tutorialUrl.' + o;
              if (
                void 0 !== e.keyboardShortcutsUrl &&
                null !== e.keyboardShortcutsUrl &&
                (o = t[29].verify(e.keyboardShortcutsUrl))
              )
                return 'keyboardShortcutsUrl.' + o;
              if (
                void 0 !== e.releaseNotesUrl &&
                null !== e.releaseNotesUrl &&
                (o = t[30].verify(e.releaseNotesUrl))
              )
                return 'releaseNotesUrl.' + o;
              if (
                void 0 !== e.hideUserData &&
                'boolean' != typeof e.hideUserData
              )
                return 'hideUserData: boolean expected';
              if (void 0 !== e.useGeLogo && 'boolean' != typeof e.useGeLogo)
                return 'useGeLogo: boolean expected';
              if (
                void 0 !== e.dioramaDescriptionUrlBase &&
                null !== e.dioramaDescriptionUrlBase &&
                (o = t[33].verify(e.dioramaDescriptionUrlBase))
              )
                return 'dioramaDescriptionUrlBase.' + o;
              if (
                void 0 !== e.dioramaDefaultColor &&
                !a.isInteger(e.dioramaDefaultColor)
              )
                return 'dioramaDefaultColor: integer expected';
              if (
                void 0 !== e.dioramaBlacklistUrl &&
                null !== e.dioramaBlacklistUrl &&
                (o = t[35].verify(e.dioramaBlacklistUrl))
              )
                return 'dioramaBlacklistUrl.' + o;
              if (
                void 0 !== e.clientOptions &&
                null !== e.clientOptions &&
                (o = t[36].verify(e.clientOptions))
              )
                return 'clientOptions.' + o;
              if (
                void 0 !== e.fetchingOptions &&
                null !== e.fetchingOptions &&
                (o = t[37].verify(e.fetchingOptions))
              )
                return 'fetchingOptions.' + o;
              if (
                void 0 !== e.timeMachineOptions &&
                null !== e.timeMachineOptions &&
                (o = t[38].verify(e.timeMachineOptions))
              )
                return 'timeMachineOptions.' + o;
              if (
                void 0 !== e.csiOptions &&
                null !== e.csiOptions &&
                (o = t[39].verify(e.csiOptions))
              )
                return 'csiOptions.' + o;
              if (void 0 !== e.searchTab) {
                if (!Array.isArray(e.searchTab))
                  return 'searchTab: array expected';
                for (r = 0; r < e.searchTab.length; ++r)
                  if ((o = t[40].verify(e.searchTab[r])))
                    return 'searchTab.' + o;
              }
              if (void 0 !== e.cobrandInfo) {
                if (!Array.isArray(e.cobrandInfo))
                  return 'cobrandInfo: array expected';
                for (r = 0; r < e.cobrandInfo.length; ++r)
                  if ((o = t[41].verify(e.cobrandInfo[r])))
                    return 'cobrandInfo.' + o;
              }
              if (void 0 !== e.validDatabase) {
                if (!Array.isArray(e.validDatabase))
                  return 'validDatabase: array expected';
                for (r = 0; r < e.validDatabase.length; ++r)
                  if ((o = t[42].verify(e.validDatabase[r])))
                    return 'validDatabase.' + o;
              }
              if (void 0 !== e.configScript) {
                if (!Array.isArray(e.configScript))
                  return 'configScript: array expected';
                for (r = 0; r < e.configScript.length; ++r)
                  if ((o = t[43].verify(e.configScript[r])))
                    return 'configScript.' + o;
              }
              if (
                void 0 !== e.deauthServerUrl &&
                null !== e.deauthServerUrl &&
                (o = t[44].verify(e.deauthServerUrl))
              )
                return 'deauthServerUrl.' + o;
              if (
                void 0 !== e.swoopParameters &&
                null !== e.swoopParameters &&
                (o = t[45].verify(e.swoopParameters))
              )
                return 'swoopParameters.' + o;
              if (
                void 0 !== e.bbsServerInfo &&
                null !== e.bbsServerInfo &&
                (o = t[46].verify(e.bbsServerInfo))
              )
                return 'bbsServerInfo.' + o;
              if (
                void 0 !== e.dataErrorServerInfo &&
                null !== e.dataErrorServerInfo &&
                (o = t[47].verify(e.dataErrorServerInfo))
              )
                return 'dataErrorServerInfo.' + o;
              if (void 0 !== e.planetaryDatabase) {
                if (!Array.isArray(e.planetaryDatabase))
                  return 'planetaryDatabase: array expected';
                for (r = 0; r < e.planetaryDatabase.length; ++r)
                  if ((o = t[48].verify(e.planetaryDatabase[r])))
                    return 'planetaryDatabase.' + o;
              }
              if (
                void 0 !== e.logServer &&
                null !== e.logServer &&
                (o = t[49].verify(e.logServer))
              )
                return 'logServer.' + o;
              if (
                void 0 !== e.autopiaOptions &&
                null !== e.autopiaOptions &&
                (o = t[50].verify(e.autopiaOptions))
              )
                return 'autopiaOptions.' + o;
              if (
                void 0 !== e.searchConfig &&
                null !== e.searchConfig &&
                (o = t[51].verify(e.searchConfig))
              )
                return 'searchConfig.' + o;
              if (
                void 0 !== e.searchInfo &&
                null !== e.searchInfo &&
                (o = t[52].verify(e.searchInfo))
              )
                return 'searchInfo.' + o;
              if (
                void 0 !== e.elevationServiceBaseUrl &&
                !a.isString(e.elevationServiceBaseUrl)
              )
                return 'elevationServiceBaseUrl: string expected';
              if (
                void 0 !== e.elevationProfileQueryDelay &&
                !a.isInteger(e.elevationProfileQueryDelay)
              )
                return 'elevationProfileQueryDelay: integer expected';
              if (
                void 0 !== e.proUpgradeUrl &&
                null !== e.proUpgradeUrl &&
                (o = t[55].verify(e.proUpgradeUrl))
              )
                return 'proUpgradeUrl.' + o;
              if (
                void 0 !== e.earthCommunityUrl &&
                null !== e.earthCommunityUrl &&
                (o = t[56].verify(e.earthCommunityUrl))
              )
                return 'earthCommunityUrl.' + o;
              if (
                void 0 !== e.googleMapsUrl &&
                null !== e.googleMapsUrl &&
                (o = t[57].verify(e.googleMapsUrl))
              )
                return 'googleMapsUrl.' + o;
              if (
                void 0 !== e.sharingUrl &&
                null !== e.sharingUrl &&
                (o = t[58].verify(e.sharingUrl))
              )
                return 'sharingUrl.' + o;
              if (
                void 0 !== e.privacyPolicyUrl &&
                null !== e.privacyPolicyUrl &&
                (o = t[59].verify(e.privacyPolicyUrl))
              )
                return 'privacyPolicyUrl.' + o;
              if (
                void 0 !== e.doGplusUserCheck &&
                'boolean' != typeof e.doGplusUserCheck
              )
                return 'doGplusUserCheck: boolean expected';
              if (
                void 0 !== e.rocktreeDataProto &&
                null !== e.rocktreeDataProto &&
                (o = t[61].verify(e.rocktreeDataProto))
              )
                return 'rocktreeDataProto.' + o;
              if (void 0 !== e.filmstripConfig) {
                if (!Array.isArray(e.filmstripConfig))
                  return 'filmstripConfig: array expected';
                for (r = 0; r < e.filmstripConfig.length; ++r) {
                  var o;
                  if ((o = t[62].verify(e.filmstripConfig[r])))
                    return 'filmstripConfig.' + o;
                }
              }
              return void 0 !== e.showSigninButton &&
                'boolean' != typeof e.showSigninButton
                ? 'showSigninButton: boolean expected'
                : void 0 !== e.proMeasureUpsellUrl &&
                  null !== e.proMeasureUpsellUrl &&
                  (o = t[64].verify(e.proMeasureUpsellUrl))
                ? 'proMeasureUpsellUrl.' + o
                : void 0 !== e.proPrintUpsellUrl &&
                  null !== e.proPrintUpsellUrl &&
                  (o = t[65].verify(e.proPrintUpsellUrl))
                ? 'proPrintUpsellUrl.' + o
                : void 0 !== e.starDataProto &&
                  null !== e.starDataProto &&
                  (o = t[66].verify(e.starDataProto))
                ? 'starDataProto.' + o
                : void 0 !== e.feedbackUrl &&
                  null !== e.feedbackUrl &&
                  (o = t[67].verify(e.feedbackUrl))
                ? 'feedbackUrl.' + o
                : void 0 !== e.oauth2LoginUrl &&
                  null !== e.oauth2LoginUrl &&
                  (o = t[68].verify(e.oauth2LoginUrl))
                ? 'oauth2LoginUrl.' + o
                : null;
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.EndSnippetProto) return e;
                var r = new i.keyhole.dbroot.EndSnippetProto();
                if (void 0 !== e.model && null !== e.model) {
                  if ('object' != typeof e.model)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.model: object expected',
                    );
                  r.model = t[0].fromObject(e.model);
                }
                if (void 0 !== e.authServerUrl && null !== e.authServerUrl) {
                  if ('object' != typeof e.authServerUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.authServerUrl: object expected',
                    );
                  r.authServerUrl = t[1].fromObject(e.authServerUrl);
                }
                if (
                  (void 0 !== e.disableAuthentication &&
                    null !== e.disableAuthentication &&
                    (r.disableAuthentication = Boolean(
                      e.disableAuthentication,
                    )),
                  e.mfeDomains)
                ) {
                  if (!Array.isArray(e.mfeDomains))
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.mfeDomains: array expected',
                    );
                  r.mfeDomains = [];
                  for (var o = 0; o < e.mfeDomains.length; ++o) {
                    if ('object' != typeof e.mfeDomains[o])
                      throw TypeError(
                        '.keyhole.dbroot.EndSnippetProto.mfeDomains: object expected',
                      );
                    r.mfeDomains[o] = t[3].fromObject(e.mfeDomains[o]);
                  }
                }
                if (
                  (void 0 !== e.mfeLangParam &&
                    null !== e.mfeLangParam &&
                    (r.mfeLangParam = String(e.mfeLangParam)),
                  void 0 !== e.adsUrlPatterns &&
                    null !== e.adsUrlPatterns &&
                    (r.adsUrlPatterns = String(e.adsUrlPatterns)),
                  void 0 !== e.reverseGeocoderUrl &&
                    null !== e.reverseGeocoderUrl)
                ) {
                  if ('object' != typeof e.reverseGeocoderUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.reverseGeocoderUrl: object expected',
                    );
                  r.reverseGeocoderUrl = t[6].fromObject(e.reverseGeocoderUrl);
                }
                if (
                  (void 0 !== e.reverseGeocoderProtocolVersion &&
                    null !== e.reverseGeocoderProtocolVersion &&
                    (r.reverseGeocoderProtocolVersion =
                      0 | e.reverseGeocoderProtocolVersion),
                  void 0 !== e.skyDatabaseIsAvailable &&
                    null !== e.skyDatabaseIsAvailable &&
                    (r.skyDatabaseIsAvailable = Boolean(
                      e.skyDatabaseIsAvailable,
                    )),
                  void 0 !== e.skyDatabaseUrl && null !== e.skyDatabaseUrl)
                ) {
                  if ('object' != typeof e.skyDatabaseUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.skyDatabaseUrl: object expected',
                    );
                  r.skyDatabaseUrl = t[9].fromObject(e.skyDatabaseUrl);
                }
                if (
                  void 0 !== e.defaultWebPageIntlUrl &&
                  null !== e.defaultWebPageIntlUrl
                ) {
                  if ('object' != typeof e.defaultWebPageIntlUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.defaultWebPageIntlUrl: object expected',
                    );
                  r.defaultWebPageIntlUrl = t[10].fromObject(
                    e.defaultWebPageIntlUrl,
                  );
                }
                if (
                  (void 0 !== e.numStartUpTips &&
                    null !== e.numStartUpTips &&
                    (r.numStartUpTips = 0 | e.numStartUpTips),
                  void 0 !== e.startUpTipsUrl && null !== e.startUpTipsUrl)
                ) {
                  if ('object' != typeof e.startUpTipsUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.startUpTipsUrl: object expected',
                    );
                  r.startUpTipsUrl = t[12].fromObject(e.startUpTipsUrl);
                }
                if (
                  (void 0 !== e.numProStartUpTips &&
                    null !== e.numProStartUpTips &&
                    (r.numProStartUpTips = 0 | e.numProStartUpTips),
                  void 0 !== e.proStartUpTipsUrl &&
                    null !== e.proStartUpTipsUrl)
                ) {
                  if ('object' != typeof e.proStartUpTipsUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.proStartUpTipsUrl: object expected',
                    );
                  r.proStartUpTipsUrl = t[14].fromObject(e.proStartUpTipsUrl);
                }
                if (
                  void 0 !== e.startupTipsIntlUrl &&
                  null !== e.startupTipsIntlUrl
                ) {
                  if ('object' != typeof e.startupTipsIntlUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.startupTipsIntlUrl: object expected',
                    );
                  r.startupTipsIntlUrl = t[15].fromObject(e.startupTipsIntlUrl);
                }
                if (
                  void 0 !== e.userGuideIntlUrl &&
                  null !== e.userGuideIntlUrl
                ) {
                  if ('object' != typeof e.userGuideIntlUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.userGuideIntlUrl: object expected',
                    );
                  r.userGuideIntlUrl = t[16].fromObject(e.userGuideIntlUrl);
                }
                if (
                  void 0 !== e.supportCenterIntlUrl &&
                  null !== e.supportCenterIntlUrl
                ) {
                  if ('object' != typeof e.supportCenterIntlUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.supportCenterIntlUrl: object expected',
                    );
                  r.supportCenterIntlUrl = t[17].fromObject(
                    e.supportCenterIntlUrl,
                  );
                }
                if (
                  void 0 !== e.businessListingIntlUrl &&
                  null !== e.businessListingIntlUrl
                ) {
                  if ('object' != typeof e.businessListingIntlUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.businessListingIntlUrl: object expected',
                    );
                  r.businessListingIntlUrl = t[18].fromObject(
                    e.businessListingIntlUrl,
                  );
                }
                if (
                  void 0 !== e.supportAnswerIntlUrl &&
                  null !== e.supportAnswerIntlUrl
                ) {
                  if ('object' != typeof e.supportAnswerIntlUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.supportAnswerIntlUrl: object expected',
                    );
                  r.supportAnswerIntlUrl = t[19].fromObject(
                    e.supportAnswerIntlUrl,
                  );
                }
                if (
                  void 0 !== e.supportTopicIntlUrl &&
                  null !== e.supportTopicIntlUrl
                ) {
                  if ('object' != typeof e.supportTopicIntlUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.supportTopicIntlUrl: object expected',
                    );
                  r.supportTopicIntlUrl = t[20].fromObject(
                    e.supportTopicIntlUrl,
                  );
                }
                if (
                  void 0 !== e.supportRequestIntlUrl &&
                  null !== e.supportRequestIntlUrl
                ) {
                  if ('object' != typeof e.supportRequestIntlUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.supportRequestIntlUrl: object expected',
                    );
                  r.supportRequestIntlUrl = t[21].fromObject(
                    e.supportRequestIntlUrl,
                  );
                }
                if (void 0 !== e.earthIntlUrl && null !== e.earthIntlUrl) {
                  if ('object' != typeof e.earthIntlUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.earthIntlUrl: object expected',
                    );
                  r.earthIntlUrl = t[22].fromObject(e.earthIntlUrl);
                }
                if (void 0 !== e.addContentUrl && null !== e.addContentUrl) {
                  if ('object' != typeof e.addContentUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.addContentUrl: object expected',
                    );
                  r.addContentUrl = t[23].fromObject(e.addContentUrl);
                }
                if (
                  void 0 !== e.sketchupNotInstalledUrl &&
                  null !== e.sketchupNotInstalledUrl
                ) {
                  if ('object' != typeof e.sketchupNotInstalledUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.sketchupNotInstalledUrl: object expected',
                    );
                  r.sketchupNotInstalledUrl = t[24].fromObject(
                    e.sketchupNotInstalledUrl,
                  );
                }
                if (
                  void 0 !== e.sketchupErrorUrl &&
                  null !== e.sketchupErrorUrl
                ) {
                  if ('object' != typeof e.sketchupErrorUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.sketchupErrorUrl: object expected',
                    );
                  r.sketchupErrorUrl = t[25].fromObject(e.sketchupErrorUrl);
                }
                if (void 0 !== e.freeLicenseUrl && null !== e.freeLicenseUrl) {
                  if ('object' != typeof e.freeLicenseUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.freeLicenseUrl: object expected',
                    );
                  r.freeLicenseUrl = t[26].fromObject(e.freeLicenseUrl);
                }
                if (void 0 !== e.proLicenseUrl && null !== e.proLicenseUrl) {
                  if ('object' != typeof e.proLicenseUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.proLicenseUrl: object expected',
                    );
                  r.proLicenseUrl = t[27].fromObject(e.proLicenseUrl);
                }
                if (void 0 !== e.tutorialUrl && null !== e.tutorialUrl) {
                  if ('object' != typeof e.tutorialUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.tutorialUrl: object expected',
                    );
                  r.tutorialUrl = t[28].fromObject(e.tutorialUrl);
                }
                if (
                  void 0 !== e.keyboardShortcutsUrl &&
                  null !== e.keyboardShortcutsUrl
                ) {
                  if ('object' != typeof e.keyboardShortcutsUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.keyboardShortcutsUrl: object expected',
                    );
                  r.keyboardShortcutsUrl = t[29].fromObject(
                    e.keyboardShortcutsUrl,
                  );
                }
                if (
                  void 0 !== e.releaseNotesUrl &&
                  null !== e.releaseNotesUrl
                ) {
                  if ('object' != typeof e.releaseNotesUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.releaseNotesUrl: object expected',
                    );
                  r.releaseNotesUrl = t[30].fromObject(e.releaseNotesUrl);
                }
                if (
                  (void 0 !== e.hideUserData &&
                    null !== e.hideUserData &&
                    (r.hideUserData = Boolean(e.hideUserData)),
                  void 0 !== e.useGeLogo &&
                    null !== e.useGeLogo &&
                    (r.useGeLogo = Boolean(e.useGeLogo)),
                  void 0 !== e.dioramaDescriptionUrlBase &&
                    null !== e.dioramaDescriptionUrlBase)
                ) {
                  if ('object' != typeof e.dioramaDescriptionUrlBase)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.dioramaDescriptionUrlBase: object expected',
                    );
                  r.dioramaDescriptionUrlBase = t[33].fromObject(
                    e.dioramaDescriptionUrlBase,
                  );
                }
                if (
                  (void 0 !== e.dioramaDefaultColor &&
                    null !== e.dioramaDefaultColor &&
                    (r.dioramaDefaultColor = e.dioramaDefaultColor >>> 0),
                  void 0 !== e.dioramaBlacklistUrl &&
                    null !== e.dioramaBlacklistUrl)
                ) {
                  if ('object' != typeof e.dioramaBlacklistUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.dioramaBlacklistUrl: object expected',
                    );
                  r.dioramaBlacklistUrl = t[35].fromObject(
                    e.dioramaBlacklistUrl,
                  );
                }
                if (void 0 !== e.clientOptions && null !== e.clientOptions) {
                  if ('object' != typeof e.clientOptions)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.clientOptions: object expected',
                    );
                  r.clientOptions = t[36].fromObject(e.clientOptions);
                }
                if (
                  void 0 !== e.fetchingOptions &&
                  null !== e.fetchingOptions
                ) {
                  if ('object' != typeof e.fetchingOptions)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.fetchingOptions: object expected',
                    );
                  r.fetchingOptions = t[37].fromObject(e.fetchingOptions);
                }
                if (
                  void 0 !== e.timeMachineOptions &&
                  null !== e.timeMachineOptions
                ) {
                  if ('object' != typeof e.timeMachineOptions)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.timeMachineOptions: object expected',
                    );
                  r.timeMachineOptions = t[38].fromObject(e.timeMachineOptions);
                }
                if (void 0 !== e.csiOptions && null !== e.csiOptions) {
                  if ('object' != typeof e.csiOptions)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.csiOptions: object expected',
                    );
                  r.csiOptions = t[39].fromObject(e.csiOptions);
                }
                if (e.searchTab) {
                  if (!Array.isArray(e.searchTab))
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.searchTab: array expected',
                    );
                  for (r.searchTab = [], o = 0; o < e.searchTab.length; ++o) {
                    if ('object' != typeof e.searchTab[o])
                      throw TypeError(
                        '.keyhole.dbroot.EndSnippetProto.searchTab: object expected',
                      );
                    r.searchTab[o] = t[40].fromObject(e.searchTab[o]);
                  }
                }
                if (e.cobrandInfo) {
                  if (!Array.isArray(e.cobrandInfo))
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.cobrandInfo: array expected',
                    );
                  for (
                    r.cobrandInfo = [], o = 0;
                    o < e.cobrandInfo.length;
                    ++o
                  ) {
                    if ('object' != typeof e.cobrandInfo[o])
                      throw TypeError(
                        '.keyhole.dbroot.EndSnippetProto.cobrandInfo: object expected',
                      );
                    r.cobrandInfo[o] = t[41].fromObject(e.cobrandInfo[o]);
                  }
                }
                if (e.validDatabase) {
                  if (!Array.isArray(e.validDatabase))
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.validDatabase: array expected',
                    );
                  for (
                    r.validDatabase = [], o = 0;
                    o < e.validDatabase.length;
                    ++o
                  ) {
                    if ('object' != typeof e.validDatabase[o])
                      throw TypeError(
                        '.keyhole.dbroot.EndSnippetProto.validDatabase: object expected',
                      );
                    r.validDatabase[o] = t[42].fromObject(e.validDatabase[o]);
                  }
                }
                if (e.configScript) {
                  if (!Array.isArray(e.configScript))
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.configScript: array expected',
                    );
                  for (
                    r.configScript = [], o = 0;
                    o < e.configScript.length;
                    ++o
                  ) {
                    if ('object' != typeof e.configScript[o])
                      throw TypeError(
                        '.keyhole.dbroot.EndSnippetProto.configScript: object expected',
                      );
                    r.configScript[o] = t[43].fromObject(e.configScript[o]);
                  }
                }
                if (
                  void 0 !== e.deauthServerUrl &&
                  null !== e.deauthServerUrl
                ) {
                  if ('object' != typeof e.deauthServerUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.deauthServerUrl: object expected',
                    );
                  r.deauthServerUrl = t[44].fromObject(e.deauthServerUrl);
                }
                if (
                  void 0 !== e.swoopParameters &&
                  null !== e.swoopParameters
                ) {
                  if ('object' != typeof e.swoopParameters)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.swoopParameters: object expected',
                    );
                  r.swoopParameters = t[45].fromObject(e.swoopParameters);
                }
                if (void 0 !== e.bbsServerInfo && null !== e.bbsServerInfo) {
                  if ('object' != typeof e.bbsServerInfo)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.bbsServerInfo: object expected',
                    );
                  r.bbsServerInfo = t[46].fromObject(e.bbsServerInfo);
                }
                if (
                  void 0 !== e.dataErrorServerInfo &&
                  null !== e.dataErrorServerInfo
                ) {
                  if ('object' != typeof e.dataErrorServerInfo)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.dataErrorServerInfo: object expected',
                    );
                  r.dataErrorServerInfo = t[47].fromObject(
                    e.dataErrorServerInfo,
                  );
                }
                if (e.planetaryDatabase) {
                  if (!Array.isArray(e.planetaryDatabase))
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.planetaryDatabase: array expected',
                    );
                  for (
                    r.planetaryDatabase = [], o = 0;
                    o < e.planetaryDatabase.length;
                    ++o
                  ) {
                    if ('object' != typeof e.planetaryDatabase[o])
                      throw TypeError(
                        '.keyhole.dbroot.EndSnippetProto.planetaryDatabase: object expected',
                      );
                    r.planetaryDatabase[o] = t[48].fromObject(
                      e.planetaryDatabase[o],
                    );
                  }
                }
                if (void 0 !== e.logServer && null !== e.logServer) {
                  if ('object' != typeof e.logServer)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.logServer: object expected',
                    );
                  r.logServer = t[49].fromObject(e.logServer);
                }
                if (void 0 !== e.autopiaOptions && null !== e.autopiaOptions) {
                  if ('object' != typeof e.autopiaOptions)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.autopiaOptions: object expected',
                    );
                  r.autopiaOptions = t[50].fromObject(e.autopiaOptions);
                }
                if (void 0 !== e.searchConfig && null !== e.searchConfig) {
                  if ('object' != typeof e.searchConfig)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.searchConfig: object expected',
                    );
                  r.searchConfig = t[51].fromObject(e.searchConfig);
                }
                if (void 0 !== e.searchInfo && null !== e.searchInfo) {
                  if ('object' != typeof e.searchInfo)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.searchInfo: object expected',
                    );
                  r.searchInfo = t[52].fromObject(e.searchInfo);
                }
                if (
                  (void 0 !== e.elevationServiceBaseUrl &&
                    null !== e.elevationServiceBaseUrl &&
                    (r.elevationServiceBaseUrl = String(
                      e.elevationServiceBaseUrl,
                    )),
                  void 0 !== e.elevationProfileQueryDelay &&
                    null !== e.elevationProfileQueryDelay &&
                    (r.elevationProfileQueryDelay =
                      0 | e.elevationProfileQueryDelay),
                  void 0 !== e.proUpgradeUrl && null !== e.proUpgradeUrl)
                ) {
                  if ('object' != typeof e.proUpgradeUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.proUpgradeUrl: object expected',
                    );
                  r.proUpgradeUrl = t[55].fromObject(e.proUpgradeUrl);
                }
                if (
                  void 0 !== e.earthCommunityUrl &&
                  null !== e.earthCommunityUrl
                ) {
                  if ('object' != typeof e.earthCommunityUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.earthCommunityUrl: object expected',
                    );
                  r.earthCommunityUrl = t[56].fromObject(e.earthCommunityUrl);
                }
                if (void 0 !== e.googleMapsUrl && null !== e.googleMapsUrl) {
                  if ('object' != typeof e.googleMapsUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.googleMapsUrl: object expected',
                    );
                  r.googleMapsUrl = t[57].fromObject(e.googleMapsUrl);
                }
                if (void 0 !== e.sharingUrl && null !== e.sharingUrl) {
                  if ('object' != typeof e.sharingUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.sharingUrl: object expected',
                    );
                  r.sharingUrl = t[58].fromObject(e.sharingUrl);
                }
                if (
                  void 0 !== e.privacyPolicyUrl &&
                  null !== e.privacyPolicyUrl
                ) {
                  if ('object' != typeof e.privacyPolicyUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.privacyPolicyUrl: object expected',
                    );
                  r.privacyPolicyUrl = t[59].fromObject(e.privacyPolicyUrl);
                }
                if (
                  (void 0 !== e.doGplusUserCheck &&
                    null !== e.doGplusUserCheck &&
                    (r.doGplusUserCheck = Boolean(e.doGplusUserCheck)),
                  void 0 !== e.rocktreeDataProto &&
                    null !== e.rocktreeDataProto)
                ) {
                  if ('object' != typeof e.rocktreeDataProto)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.rocktreeDataProto: object expected',
                    );
                  r.rocktreeDataProto = t[61].fromObject(e.rocktreeDataProto);
                }
                if (e.filmstripConfig) {
                  if (!Array.isArray(e.filmstripConfig))
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.filmstripConfig: array expected',
                    );
                  for (
                    r.filmstripConfig = [], o = 0;
                    o < e.filmstripConfig.length;
                    ++o
                  ) {
                    if ('object' != typeof e.filmstripConfig[o])
                      throw TypeError(
                        '.keyhole.dbroot.EndSnippetProto.filmstripConfig: object expected',
                      );
                    r.filmstripConfig[o] = t[62].fromObject(
                      e.filmstripConfig[o],
                    );
                  }
                }
                if (
                  (void 0 !== e.showSigninButton &&
                    null !== e.showSigninButton &&
                    (r.showSigninButton = Boolean(e.showSigninButton)),
                  void 0 !== e.proMeasureUpsellUrl &&
                    null !== e.proMeasureUpsellUrl)
                ) {
                  if ('object' != typeof e.proMeasureUpsellUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.proMeasureUpsellUrl: object expected',
                    );
                  r.proMeasureUpsellUrl = t[64].fromObject(
                    e.proMeasureUpsellUrl,
                  );
                }
                if (
                  void 0 !== e.proPrintUpsellUrl &&
                  null !== e.proPrintUpsellUrl
                ) {
                  if ('object' != typeof e.proPrintUpsellUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.proPrintUpsellUrl: object expected',
                    );
                  r.proPrintUpsellUrl = t[65].fromObject(e.proPrintUpsellUrl);
                }
                if (void 0 !== e.starDataProto && null !== e.starDataProto) {
                  if ('object' != typeof e.starDataProto)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.starDataProto: object expected',
                    );
                  r.starDataProto = t[66].fromObject(e.starDataProto);
                }
                if (void 0 !== e.feedbackUrl && null !== e.feedbackUrl) {
                  if ('object' != typeof e.feedbackUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.feedbackUrl: object expected',
                    );
                  r.feedbackUrl = t[67].fromObject(e.feedbackUrl);
                }
                if (void 0 !== e.oauth2LoginUrl && null !== e.oauth2LoginUrl) {
                  if ('object' != typeof e.oauth2LoginUrl)
                    throw TypeError(
                      '.keyhole.dbroot.EndSnippetProto.oauth2LoginUrl: object expected',
                    );
                  r.oauth2LoginUrl = t[68].fromObject(e.oauth2LoginUrl);
                }
                return r;
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var o = {};
              if (
                ((r.arrays || r.defaults) &&
                  ((o.mfeDomains = []),
                  (o.searchTab = []),
                  (o.cobrandInfo = []),
                  (o.validDatabase = []),
                  (o.configScript = []),
                  (o.planetaryDatabase = []),
                  (o.filmstripConfig = [])),
                r.defaults &&
                  ((o.model = null),
                  (o.authServerUrl = null),
                  (o.disableAuthentication = !1),
                  (o.mfeLangParam = 'hl=$5Bhl5D'),
                  (o.adsUrlPatterns = ''),
                  (o.reverseGeocoderUrl = null),
                  (o.reverseGeocoderProtocolVersion = 3),
                  (o.skyDatabaseIsAvailable = !0),
                  (o.skyDatabaseUrl = null),
                  (o.defaultWebPageIntlUrl = null),
                  (o.numStartUpTips = 17),
                  (o.startUpTipsUrl = null),
                  (o.numProStartUpTips = 0),
                  (o.proStartUpTipsUrl = null),
                  (o.startupTipsIntlUrl = null),
                  (o.userGuideIntlUrl = null),
                  (o.supportCenterIntlUrl = null),
                  (o.businessListingIntlUrl = null),
                  (o.supportAnswerIntlUrl = null),
                  (o.supportTopicIntlUrl = null),
                  (o.supportRequestIntlUrl = null),
                  (o.earthIntlUrl = null),
                  (o.addContentUrl = null),
                  (o.sketchupNotInstalledUrl = null),
                  (o.sketchupErrorUrl = null),
                  (o.freeLicenseUrl = null),
                  (o.proLicenseUrl = null),
                  (o.tutorialUrl = null),
                  (o.keyboardShortcutsUrl = null),
                  (o.releaseNotesUrl = null),
                  (o.hideUserData = !1),
                  (o.useGeLogo = !0),
                  (o.dioramaDescriptionUrlBase = null),
                  (o.dioramaDefaultColor = 4291281607),
                  (o.dioramaBlacklistUrl = null),
                  (o.clientOptions = null),
                  (o.fetchingOptions = null),
                  (o.timeMachineOptions = null),
                  (o.csiOptions = null),
                  (o.deauthServerUrl = null),
                  (o.swoopParameters = null),
                  (o.bbsServerInfo = null),
                  (o.dataErrorServerInfo = null),
                  (o.logServer = null),
                  (o.autopiaOptions = null),
                  (o.searchConfig = null),
                  (o.searchInfo = null),
                  (o.elevationServiceBaseUrl =
                    'http://maps.google.com/maps/api/elevation/'),
                  (o.elevationProfileQueryDelay = 500),
                  (o.proUpgradeUrl = null),
                  (o.earthCommunityUrl = null),
                  (o.googleMapsUrl = null),
                  (o.sharingUrl = null),
                  (o.privacyPolicyUrl = null),
                  (o.doGplusUserCheck = !1),
                  (o.rocktreeDataProto = null),
                  (o.showSigninButton = !1),
                  (o.proMeasureUpsellUrl = null),
                  (o.proPrintUpsellUrl = null),
                  (o.starDataProto = null),
                  (o.feedbackUrl = null),
                  (o.oauth2LoginUrl = null)),
                void 0 !== e.model &&
                  null !== e.model &&
                  e.hasOwnProperty('model') &&
                  (o.model = t[0].toObject(e.model, r)),
                void 0 !== e.authServerUrl &&
                  null !== e.authServerUrl &&
                  e.hasOwnProperty('authServerUrl') &&
                  (o.authServerUrl = t[1].toObject(e.authServerUrl, r)),
                void 0 !== e.disableAuthentication &&
                  null !== e.disableAuthentication &&
                  e.hasOwnProperty('disableAuthentication') &&
                  (o.disableAuthentication = e.disableAuthentication),
                void 0 !== e.mfeDomains &&
                  null !== e.mfeDomains &&
                  e.hasOwnProperty('mfeDomains'))
              ) {
                o.mfeDomains = [];
                for (var a = 0; a < e.mfeDomains.length; ++a)
                  o.mfeDomains[a] = t[3].toObject(e.mfeDomains[a], r);
              }
              if (
                (void 0 !== e.mfeLangParam &&
                  null !== e.mfeLangParam &&
                  e.hasOwnProperty('mfeLangParam') &&
                  (o.mfeLangParam = e.mfeLangParam),
                void 0 !== e.adsUrlPatterns &&
                  null !== e.adsUrlPatterns &&
                  e.hasOwnProperty('adsUrlPatterns') &&
                  (o.adsUrlPatterns = e.adsUrlPatterns),
                void 0 !== e.reverseGeocoderUrl &&
                  null !== e.reverseGeocoderUrl &&
                  e.hasOwnProperty('reverseGeocoderUrl') &&
                  (o.reverseGeocoderUrl = t[6].toObject(
                    e.reverseGeocoderUrl,
                    r,
                  )),
                void 0 !== e.reverseGeocoderProtocolVersion &&
                  null !== e.reverseGeocoderProtocolVersion &&
                  e.hasOwnProperty('reverseGeocoderProtocolVersion') &&
                  (o.reverseGeocoderProtocolVersion =
                    e.reverseGeocoderProtocolVersion),
                void 0 !== e.skyDatabaseIsAvailable &&
                  null !== e.skyDatabaseIsAvailable &&
                  e.hasOwnProperty('skyDatabaseIsAvailable') &&
                  (o.skyDatabaseIsAvailable = e.skyDatabaseIsAvailable),
                void 0 !== e.skyDatabaseUrl &&
                  null !== e.skyDatabaseUrl &&
                  e.hasOwnProperty('skyDatabaseUrl') &&
                  (o.skyDatabaseUrl = t[9].toObject(e.skyDatabaseUrl, r)),
                void 0 !== e.defaultWebPageIntlUrl &&
                  null !== e.defaultWebPageIntlUrl &&
                  e.hasOwnProperty('defaultWebPageIntlUrl') &&
                  (o.defaultWebPageIntlUrl = t[10].toObject(
                    e.defaultWebPageIntlUrl,
                    r,
                  )),
                void 0 !== e.numStartUpTips &&
                  null !== e.numStartUpTips &&
                  e.hasOwnProperty('numStartUpTips') &&
                  (o.numStartUpTips = e.numStartUpTips),
                void 0 !== e.startUpTipsUrl &&
                  null !== e.startUpTipsUrl &&
                  e.hasOwnProperty('startUpTipsUrl') &&
                  (o.startUpTipsUrl = t[12].toObject(e.startUpTipsUrl, r)),
                void 0 !== e.numProStartUpTips &&
                  null !== e.numProStartUpTips &&
                  e.hasOwnProperty('numProStartUpTips') &&
                  (o.numProStartUpTips = e.numProStartUpTips),
                void 0 !== e.proStartUpTipsUrl &&
                  null !== e.proStartUpTipsUrl &&
                  e.hasOwnProperty('proStartUpTipsUrl') &&
                  (o.proStartUpTipsUrl = t[14].toObject(
                    e.proStartUpTipsUrl,
                    r,
                  )),
                void 0 !== e.startupTipsIntlUrl &&
                  null !== e.startupTipsIntlUrl &&
                  e.hasOwnProperty('startupTipsIntlUrl') &&
                  (o.startupTipsIntlUrl = t[15].toObject(
                    e.startupTipsIntlUrl,
                    r,
                  )),
                void 0 !== e.userGuideIntlUrl &&
                  null !== e.userGuideIntlUrl &&
                  e.hasOwnProperty('userGuideIntlUrl') &&
                  (o.userGuideIntlUrl = t[16].toObject(e.userGuideIntlUrl, r)),
                void 0 !== e.supportCenterIntlUrl &&
                  null !== e.supportCenterIntlUrl &&
                  e.hasOwnProperty('supportCenterIntlUrl') &&
                  (o.supportCenterIntlUrl = t[17].toObject(
                    e.supportCenterIntlUrl,
                    r,
                  )),
                void 0 !== e.businessListingIntlUrl &&
                  null !== e.businessListingIntlUrl &&
                  e.hasOwnProperty('businessListingIntlUrl') &&
                  (o.businessListingIntlUrl = t[18].toObject(
                    e.businessListingIntlUrl,
                    r,
                  )),
                void 0 !== e.supportAnswerIntlUrl &&
                  null !== e.supportAnswerIntlUrl &&
                  e.hasOwnProperty('supportAnswerIntlUrl') &&
                  (o.supportAnswerIntlUrl = t[19].toObject(
                    e.supportAnswerIntlUrl,
                    r,
                  )),
                void 0 !== e.supportTopicIntlUrl &&
                  null !== e.supportTopicIntlUrl &&
                  e.hasOwnProperty('supportTopicIntlUrl') &&
                  (o.supportTopicIntlUrl = t[20].toObject(
                    e.supportTopicIntlUrl,
                    r,
                  )),
                void 0 !== e.supportRequestIntlUrl &&
                  null !== e.supportRequestIntlUrl &&
                  e.hasOwnProperty('supportRequestIntlUrl') &&
                  (o.supportRequestIntlUrl = t[21].toObject(
                    e.supportRequestIntlUrl,
                    r,
                  )),
                void 0 !== e.earthIntlUrl &&
                  null !== e.earthIntlUrl &&
                  e.hasOwnProperty('earthIntlUrl') &&
                  (o.earthIntlUrl = t[22].toObject(e.earthIntlUrl, r)),
                void 0 !== e.addContentUrl &&
                  null !== e.addContentUrl &&
                  e.hasOwnProperty('addContentUrl') &&
                  (o.addContentUrl = t[23].toObject(e.addContentUrl, r)),
                void 0 !== e.sketchupNotInstalledUrl &&
                  null !== e.sketchupNotInstalledUrl &&
                  e.hasOwnProperty('sketchupNotInstalledUrl') &&
                  (o.sketchupNotInstalledUrl = t[24].toObject(
                    e.sketchupNotInstalledUrl,
                    r,
                  )),
                void 0 !== e.sketchupErrorUrl &&
                  null !== e.sketchupErrorUrl &&
                  e.hasOwnProperty('sketchupErrorUrl') &&
                  (o.sketchupErrorUrl = t[25].toObject(e.sketchupErrorUrl, r)),
                void 0 !== e.freeLicenseUrl &&
                  null !== e.freeLicenseUrl &&
                  e.hasOwnProperty('freeLicenseUrl') &&
                  (o.freeLicenseUrl = t[26].toObject(e.freeLicenseUrl, r)),
                void 0 !== e.proLicenseUrl &&
                  null !== e.proLicenseUrl &&
                  e.hasOwnProperty('proLicenseUrl') &&
                  (o.proLicenseUrl = t[27].toObject(e.proLicenseUrl, r)),
                void 0 !== e.tutorialUrl &&
                  null !== e.tutorialUrl &&
                  e.hasOwnProperty('tutorialUrl') &&
                  (o.tutorialUrl = t[28].toObject(e.tutorialUrl, r)),
                void 0 !== e.keyboardShortcutsUrl &&
                  null !== e.keyboardShortcutsUrl &&
                  e.hasOwnProperty('keyboardShortcutsUrl') &&
                  (o.keyboardShortcutsUrl = t[29].toObject(
                    e.keyboardShortcutsUrl,
                    r,
                  )),
                void 0 !== e.releaseNotesUrl &&
                  null !== e.releaseNotesUrl &&
                  e.hasOwnProperty('releaseNotesUrl') &&
                  (o.releaseNotesUrl = t[30].toObject(e.releaseNotesUrl, r)),
                void 0 !== e.hideUserData &&
                  null !== e.hideUserData &&
                  e.hasOwnProperty('hideUserData') &&
                  (o.hideUserData = e.hideUserData),
                void 0 !== e.useGeLogo &&
                  null !== e.useGeLogo &&
                  e.hasOwnProperty('useGeLogo') &&
                  (o.useGeLogo = e.useGeLogo),
                void 0 !== e.dioramaDescriptionUrlBase &&
                  null !== e.dioramaDescriptionUrlBase &&
                  e.hasOwnProperty('dioramaDescriptionUrlBase') &&
                  (o.dioramaDescriptionUrlBase = t[33].toObject(
                    e.dioramaDescriptionUrlBase,
                    r,
                  )),
                void 0 !== e.dioramaDefaultColor &&
                  null !== e.dioramaDefaultColor &&
                  e.hasOwnProperty('dioramaDefaultColor') &&
                  (o.dioramaDefaultColor = e.dioramaDefaultColor),
                void 0 !== e.dioramaBlacklistUrl &&
                  null !== e.dioramaBlacklistUrl &&
                  e.hasOwnProperty('dioramaBlacklistUrl') &&
                  (o.dioramaBlacklistUrl = t[35].toObject(
                    e.dioramaBlacklistUrl,
                    r,
                  )),
                void 0 !== e.clientOptions &&
                  null !== e.clientOptions &&
                  e.hasOwnProperty('clientOptions') &&
                  (o.clientOptions = t[36].toObject(e.clientOptions, r)),
                void 0 !== e.fetchingOptions &&
                  null !== e.fetchingOptions &&
                  e.hasOwnProperty('fetchingOptions') &&
                  (o.fetchingOptions = t[37].toObject(e.fetchingOptions, r)),
                void 0 !== e.timeMachineOptions &&
                  null !== e.timeMachineOptions &&
                  e.hasOwnProperty('timeMachineOptions') &&
                  (o.timeMachineOptions = t[38].toObject(
                    e.timeMachineOptions,
                    r,
                  )),
                void 0 !== e.csiOptions &&
                  null !== e.csiOptions &&
                  e.hasOwnProperty('csiOptions') &&
                  (o.csiOptions = t[39].toObject(e.csiOptions, r)),
                void 0 !== e.searchTab &&
                  null !== e.searchTab &&
                  e.hasOwnProperty('searchTab'))
              )
                for (o.searchTab = [], a = 0; a < e.searchTab.length; ++a)
                  o.searchTab[a] = t[40].toObject(e.searchTab[a], r);
              if (
                void 0 !== e.cobrandInfo &&
                null !== e.cobrandInfo &&
                e.hasOwnProperty('cobrandInfo')
              )
                for (o.cobrandInfo = [], a = 0; a < e.cobrandInfo.length; ++a)
                  o.cobrandInfo[a] = t[41].toObject(e.cobrandInfo[a], r);
              if (
                void 0 !== e.validDatabase &&
                null !== e.validDatabase &&
                e.hasOwnProperty('validDatabase')
              )
                for (
                  o.validDatabase = [], a = 0;
                  a < e.validDatabase.length;
                  ++a
                )
                  o.validDatabase[a] = t[42].toObject(e.validDatabase[a], r);
              if (
                void 0 !== e.configScript &&
                null !== e.configScript &&
                e.hasOwnProperty('configScript')
              )
                for (o.configScript = [], a = 0; a < e.configScript.length; ++a)
                  o.configScript[a] = t[43].toObject(e.configScript[a], r);
              if (
                (void 0 !== e.deauthServerUrl &&
                  null !== e.deauthServerUrl &&
                  e.hasOwnProperty('deauthServerUrl') &&
                  (o.deauthServerUrl = t[44].toObject(e.deauthServerUrl, r)),
                void 0 !== e.swoopParameters &&
                  null !== e.swoopParameters &&
                  e.hasOwnProperty('swoopParameters') &&
                  (o.swoopParameters = t[45].toObject(e.swoopParameters, r)),
                void 0 !== e.bbsServerInfo &&
                  null !== e.bbsServerInfo &&
                  e.hasOwnProperty('bbsServerInfo') &&
                  (o.bbsServerInfo = t[46].toObject(e.bbsServerInfo, r)),
                void 0 !== e.dataErrorServerInfo &&
                  null !== e.dataErrorServerInfo &&
                  e.hasOwnProperty('dataErrorServerInfo') &&
                  (o.dataErrorServerInfo = t[47].toObject(
                    e.dataErrorServerInfo,
                    r,
                  )),
                void 0 !== e.planetaryDatabase &&
                  null !== e.planetaryDatabase &&
                  e.hasOwnProperty('planetaryDatabase'))
              )
                for (
                  o.planetaryDatabase = [], a = 0;
                  a < e.planetaryDatabase.length;
                  ++a
                )
                  o.planetaryDatabase[a] = t[48].toObject(
                    e.planetaryDatabase[a],
                    r,
                  );
              if (
                (void 0 !== e.logServer &&
                  null !== e.logServer &&
                  e.hasOwnProperty('logServer') &&
                  (o.logServer = t[49].toObject(e.logServer, r)),
                void 0 !== e.autopiaOptions &&
                  null !== e.autopiaOptions &&
                  e.hasOwnProperty('autopiaOptions') &&
                  (o.autopiaOptions = t[50].toObject(e.autopiaOptions, r)),
                void 0 !== e.searchConfig &&
                  null !== e.searchConfig &&
                  e.hasOwnProperty('searchConfig') &&
                  (o.searchConfig = t[51].toObject(e.searchConfig, r)),
                void 0 !== e.searchInfo &&
                  null !== e.searchInfo &&
                  e.hasOwnProperty('searchInfo') &&
                  (o.searchInfo = t[52].toObject(e.searchInfo, r)),
                void 0 !== e.elevationServiceBaseUrl &&
                  null !== e.elevationServiceBaseUrl &&
                  e.hasOwnProperty('elevationServiceBaseUrl') &&
                  (o.elevationServiceBaseUrl = e.elevationServiceBaseUrl),
                void 0 !== e.elevationProfileQueryDelay &&
                  null !== e.elevationProfileQueryDelay &&
                  e.hasOwnProperty('elevationProfileQueryDelay') &&
                  (o.elevationProfileQueryDelay = e.elevationProfileQueryDelay),
                void 0 !== e.proUpgradeUrl &&
                  null !== e.proUpgradeUrl &&
                  e.hasOwnProperty('proUpgradeUrl') &&
                  (o.proUpgradeUrl = t[55].toObject(e.proUpgradeUrl, r)),
                void 0 !== e.earthCommunityUrl &&
                  null !== e.earthCommunityUrl &&
                  e.hasOwnProperty('earthCommunityUrl') &&
                  (o.earthCommunityUrl = t[56].toObject(
                    e.earthCommunityUrl,
                    r,
                  )),
                void 0 !== e.googleMapsUrl &&
                  null !== e.googleMapsUrl &&
                  e.hasOwnProperty('googleMapsUrl') &&
                  (o.googleMapsUrl = t[57].toObject(e.googleMapsUrl, r)),
                void 0 !== e.sharingUrl &&
                  null !== e.sharingUrl &&
                  e.hasOwnProperty('sharingUrl') &&
                  (o.sharingUrl = t[58].toObject(e.sharingUrl, r)),
                void 0 !== e.privacyPolicyUrl &&
                  null !== e.privacyPolicyUrl &&
                  e.hasOwnProperty('privacyPolicyUrl') &&
                  (o.privacyPolicyUrl = t[59].toObject(e.privacyPolicyUrl, r)),
                void 0 !== e.doGplusUserCheck &&
                  null !== e.doGplusUserCheck &&
                  e.hasOwnProperty('doGplusUserCheck') &&
                  (o.doGplusUserCheck = e.doGplusUserCheck),
                void 0 !== e.rocktreeDataProto &&
                  null !== e.rocktreeDataProto &&
                  e.hasOwnProperty('rocktreeDataProto') &&
                  (o.rocktreeDataProto = t[61].toObject(
                    e.rocktreeDataProto,
                    r,
                  )),
                void 0 !== e.filmstripConfig &&
                  null !== e.filmstripConfig &&
                  e.hasOwnProperty('filmstripConfig'))
              )
                for (
                  o.filmstripConfig = [], a = 0;
                  a < e.filmstripConfig.length;
                  ++a
                )
                  o.filmstripConfig[a] = t[62].toObject(
                    e.filmstripConfig[a],
                    r,
                  );
              return (
                void 0 !== e.showSigninButton &&
                  null !== e.showSigninButton &&
                  e.hasOwnProperty('showSigninButton') &&
                  (o.showSigninButton = e.showSigninButton),
                void 0 !== e.proMeasureUpsellUrl &&
                  null !== e.proMeasureUpsellUrl &&
                  e.hasOwnProperty('proMeasureUpsellUrl') &&
                  (o.proMeasureUpsellUrl = t[64].toObject(
                    e.proMeasureUpsellUrl,
                    r,
                  )),
                void 0 !== e.proPrintUpsellUrl &&
                  null !== e.proPrintUpsellUrl &&
                  e.hasOwnProperty('proPrintUpsellUrl') &&
                  (o.proPrintUpsellUrl = t[65].toObject(
                    e.proPrintUpsellUrl,
                    r,
                  )),
                void 0 !== e.starDataProto &&
                  null !== e.starDataProto &&
                  e.hasOwnProperty('starDataProto') &&
                  (o.starDataProto = t[66].toObject(e.starDataProto, r)),
                void 0 !== e.feedbackUrl &&
                  null !== e.feedbackUrl &&
                  e.hasOwnProperty('feedbackUrl') &&
                  (o.feedbackUrl = t[67].toObject(e.feedbackUrl, r)),
                void 0 !== e.oauth2LoginUrl &&
                  null !== e.oauth2LoginUrl &&
                  e.hasOwnProperty('oauth2LoginUrl') &&
                  (o.oauth2LoginUrl = t[68].toObject(e.oauth2LoginUrl, r)),
                o
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            (r.SearchConfigProto = (function () {
              function r(e) {
                if (e)
                  for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                    this[r[t]] = e[r[t]];
              }
              (r.prototype.searchServer = a.emptyArray),
                (r.prototype.oneboxService = a.emptyArray),
                (r.prototype.kmlSearchUrl = null),
                (r.prototype.kmlRenderUrl = null),
                (r.prototype.searchHistoryUrl = null),
                (r.prototype.errorPageUrl = null);
              var t = {
                0: 'keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer',
                1: 'keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto',
                2: 'keyhole.dbroot.StringIdOrValueProto',
                3: 'keyhole.dbroot.StringIdOrValueProto',
                4: 'keyhole.dbroot.StringIdOrValueProto',
                5: 'keyhole.dbroot.StringIdOrValueProto',
              };
              return (
                n.push(t),
                (r.decode = function (e, r) {
                  e instanceof o || (e = o.create(e));
                  for (
                    var a = void 0 === r ? e.len : e.pos + r,
                      n =
                        new i.keyhole.dbroot.EndSnippetProto.SearchConfigProto();
                    e.pos < a;

                  ) {
                    var l = e.uint32();
                    switch (l >>> 3) {
                      case 1:
                        (n.searchServer && n.searchServer.length) ||
                          (n.searchServer = []),
                          n.searchServer.push(t[0].decode(e, e.uint32()));
                        break;
                      case 2:
                        (n.oneboxService && n.oneboxService.length) ||
                          (n.oneboxService = []),
                          n.oneboxService.push(t[1].decode(e, e.uint32()));
                        break;
                      case 3:
                        n.kmlSearchUrl = t[2].decode(e, e.uint32());
                        break;
                      case 4:
                        n.kmlRenderUrl = t[3].decode(e, e.uint32());
                        break;
                      case 6:
                        n.searchHistoryUrl = t[4].decode(e, e.uint32());
                        break;
                      case 5:
                        n.errorPageUrl = t[5].decode(e, e.uint32());
                        break;
                      default:
                        e.skipType(7 & l);
                    }
                  }
                  return n;
                }),
                (r.verify = function (e) {
                  if ('object' != typeof e || null === e)
                    return 'object expected';
                  if (void 0 !== e.searchServer) {
                    if (!Array.isArray(e.searchServer))
                      return 'searchServer: array expected';
                    for (var r = 0; r < e.searchServer.length; ++r)
                      if ((o = t[0].verify(e.searchServer[r])))
                        return 'searchServer.' + o;
                  }
                  if (void 0 !== e.oneboxService) {
                    if (!Array.isArray(e.oneboxService))
                      return 'oneboxService: array expected';
                    for (r = 0; r < e.oneboxService.length; ++r)
                      if ((o = t[1].verify(e.oneboxService[r])))
                        return 'oneboxService.' + o;
                  }
                  var o;
                  return void 0 !== e.kmlSearchUrl &&
                    null !== e.kmlSearchUrl &&
                    (o = t[2].verify(e.kmlSearchUrl))
                    ? 'kmlSearchUrl.' + o
                    : void 0 !== e.kmlRenderUrl &&
                      null !== e.kmlRenderUrl &&
                      (o = t[3].verify(e.kmlRenderUrl))
                    ? 'kmlRenderUrl.' + o
                    : void 0 !== e.searchHistoryUrl &&
                      null !== e.searchHistoryUrl &&
                      (o = t[4].verify(e.searchHistoryUrl))
                    ? 'searchHistoryUrl.' + o
                    : void 0 !== e.errorPageUrl &&
                      null !== e.errorPageUrl &&
                      (o = t[5].verify(e.errorPageUrl))
                    ? 'errorPageUrl.' + o
                    : null;
                }),
                (r.from = r.fromObject =
                  function (e) {
                    if (
                      e instanceof
                      i.keyhole.dbroot.EndSnippetProto.SearchConfigProto
                    )
                      return e;
                    var r =
                      new i.keyhole.dbroot.EndSnippetProto.SearchConfigProto();
                    if (e.searchServer) {
                      if (!Array.isArray(e.searchServer))
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.searchServer: array expected',
                        );
                      r.searchServer = [];
                      for (var o = 0; o < e.searchServer.length; ++o) {
                        if ('object' != typeof e.searchServer[o])
                          throw TypeError(
                            '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.searchServer: object expected',
                          );
                        r.searchServer[o] = t[0].fromObject(e.searchServer[o]);
                      }
                    }
                    if (e.oneboxService) {
                      if (!Array.isArray(e.oneboxService))
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.oneboxService: array expected',
                        );
                      for (
                        r.oneboxService = [], o = 0;
                        o < e.oneboxService.length;
                        ++o
                      ) {
                        if ('object' != typeof e.oneboxService[o])
                          throw TypeError(
                            '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.oneboxService: object expected',
                          );
                        r.oneboxService[o] = t[1].fromObject(
                          e.oneboxService[o],
                        );
                      }
                    }
                    if (void 0 !== e.kmlSearchUrl && null !== e.kmlSearchUrl) {
                      if ('object' != typeof e.kmlSearchUrl)
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.kmlSearchUrl: object expected',
                        );
                      r.kmlSearchUrl = t[2].fromObject(e.kmlSearchUrl);
                    }
                    if (void 0 !== e.kmlRenderUrl && null !== e.kmlRenderUrl) {
                      if ('object' != typeof e.kmlRenderUrl)
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.kmlRenderUrl: object expected',
                        );
                      r.kmlRenderUrl = t[3].fromObject(e.kmlRenderUrl);
                    }
                    if (
                      void 0 !== e.searchHistoryUrl &&
                      null !== e.searchHistoryUrl
                    ) {
                      if ('object' != typeof e.searchHistoryUrl)
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.searchHistoryUrl: object expected',
                        );
                      r.searchHistoryUrl = t[4].fromObject(e.searchHistoryUrl);
                    }
                    if (void 0 !== e.errorPageUrl && null !== e.errorPageUrl) {
                      if ('object' != typeof e.errorPageUrl)
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.errorPageUrl: object expected',
                        );
                      r.errorPageUrl = t[5].fromObject(e.errorPageUrl);
                    }
                    return r;
                  }),
                (r.toObject = function (e, r) {
                  r || (r = {});
                  var o = {};
                  if (
                    ((r.arrays || r.defaults) &&
                      ((o.searchServer = []), (o.oneboxService = [])),
                    r.defaults &&
                      ((o.kmlSearchUrl = null),
                      (o.kmlRenderUrl = null),
                      (o.searchHistoryUrl = null),
                      (o.errorPageUrl = null)),
                    void 0 !== e.searchServer &&
                      null !== e.searchServer &&
                      e.hasOwnProperty('searchServer'))
                  ) {
                    o.searchServer = [];
                    for (var a = 0; a < e.searchServer.length; ++a)
                      o.searchServer[a] = t[0].toObject(e.searchServer[a], r);
                  }
                  if (
                    void 0 !== e.oneboxService &&
                    null !== e.oneboxService &&
                    e.hasOwnProperty('oneboxService')
                  )
                    for (
                      o.oneboxService = [], a = 0;
                      a < e.oneboxService.length;
                      ++a
                    )
                      o.oneboxService[a] = t[1].toObject(e.oneboxService[a], r);
                  return (
                    void 0 !== e.kmlSearchUrl &&
                      null !== e.kmlSearchUrl &&
                      e.hasOwnProperty('kmlSearchUrl') &&
                      (o.kmlSearchUrl = t[2].toObject(e.kmlSearchUrl, r)),
                    void 0 !== e.kmlRenderUrl &&
                      null !== e.kmlRenderUrl &&
                      e.hasOwnProperty('kmlRenderUrl') &&
                      (o.kmlRenderUrl = t[3].toObject(e.kmlRenderUrl, r)),
                    void 0 !== e.searchHistoryUrl &&
                      null !== e.searchHistoryUrl &&
                      e.hasOwnProperty('searchHistoryUrl') &&
                      (o.searchHistoryUrl = t[4].toObject(
                        e.searchHistoryUrl,
                        r,
                      )),
                    void 0 !== e.errorPageUrl &&
                      null !== e.errorPageUrl &&
                      e.hasOwnProperty('errorPageUrl') &&
                      (o.errorPageUrl = t[5].toObject(e.errorPageUrl, r)),
                    o
                  );
                }),
                (r.prototype.toObject = function (e) {
                  return this.constructor.toObject(this, e);
                }),
                (r.prototype.toJSON = function () {
                  return this.constructor.toObject(this, e.util.toJSONOptions);
                }),
                (r.SearchServer = (function () {
                  function r(e) {
                    if (e)
                      for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                        this[r[t]] = e[r[t]];
                  }
                  (r.prototype.name = null),
                    (r.prototype.url = null),
                    (r.prototype.type = 0),
                    (r.prototype.htmlTransformUrl = null),
                    (r.prototype.kmlTransformUrl = null),
                    (r.prototype.supplementalUi = null),
                    (r.prototype.suggestion = a.emptyArray),
                    (r.prototype.searchlet = a.emptyArray),
                    (r.prototype.requirements = null),
                    (r.prototype.suggestServer = null);
                  var t,
                    l = {
                      0: 'keyhole.dbroot.StringIdOrValueProto',
                      1: 'keyhole.dbroot.StringIdOrValueProto',
                      2: 'keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.ResultType',
                      3: 'keyhole.dbroot.StringIdOrValueProto',
                      4: 'keyhole.dbroot.StringIdOrValueProto',
                      5: 'keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi',
                      6: 'keyhole.dbroot.StringIdOrValueProto',
                      7: 'keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto',
                      8: 'keyhole.dbroot.RequirementProto',
                      9: 'keyhole.dbroot.StringIdOrValueProto',
                    };
                  return (
                    n.push(l),
                    (r.decode = function (e, r) {
                      e instanceof o || (e = o.create(e));
                      for (
                        var t = void 0 === r ? e.len : e.pos + r,
                          a =
                            new i.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer();
                        e.pos < t;

                      ) {
                        var n = e.uint32();
                        switch (n >>> 3) {
                          case 1:
                            a.name = l[0].decode(e, e.uint32());
                            break;
                          case 2:
                            a.url = l[1].decode(e, e.uint32());
                            break;
                          case 3:
                            a.type = e.uint32();
                            break;
                          case 4:
                            a.htmlTransformUrl = l[3].decode(e, e.uint32());
                            break;
                          case 5:
                            a.kmlTransformUrl = l[4].decode(e, e.uint32());
                            break;
                          case 6:
                            a.supplementalUi = l[5].decode(e, e.uint32());
                            break;
                          case 9:
                            (a.suggestion && a.suggestion.length) ||
                              (a.suggestion = []),
                              a.suggestion.push(l[6].decode(e, e.uint32()));
                            break;
                          case 7:
                            (a.searchlet && a.searchlet.length) ||
                              (a.searchlet = []),
                              a.searchlet.push(l[7].decode(e, e.uint32()));
                            break;
                          case 8:
                            a.requirements = l[8].decode(e, e.uint32());
                            break;
                          case 10:
                            a.suggestServer = l[9].decode(e, e.uint32());
                            break;
                          default:
                            e.skipType(7 & n);
                        }
                      }
                      return a;
                    }),
                    (r.verify = function (e) {
                      if ('object' != typeof e || null === e)
                        return 'object expected';
                      if (
                        void 0 !== e.name &&
                        null !== e.name &&
                        (t = l[0].verify(e.name))
                      )
                        return 'name.' + t;
                      if (
                        void 0 !== e.url &&
                        null !== e.url &&
                        (t = l[1].verify(e.url))
                      )
                        return 'url.' + t;
                      if (void 0 !== e.type)
                        switch (e.type) {
                          default:
                            return 'type: enum value expected';
                          case 0:
                          case 1:
                        }
                      if (
                        void 0 !== e.htmlTransformUrl &&
                        null !== e.htmlTransformUrl &&
                        (t = l[3].verify(e.htmlTransformUrl))
                      )
                        return 'htmlTransformUrl.' + t;
                      if (
                        void 0 !== e.kmlTransformUrl &&
                        null !== e.kmlTransformUrl &&
                        (t = l[4].verify(e.kmlTransformUrl))
                      )
                        return 'kmlTransformUrl.' + t;
                      if (
                        void 0 !== e.supplementalUi &&
                        null !== e.supplementalUi &&
                        (t = l[5].verify(e.supplementalUi))
                      )
                        return 'supplementalUi.' + t;
                      if (void 0 !== e.suggestion) {
                        if (!Array.isArray(e.suggestion))
                          return 'suggestion: array expected';
                        for (var r = 0; r < e.suggestion.length; ++r)
                          if ((t = l[6].verify(e.suggestion[r])))
                            return 'suggestion.' + t;
                      }
                      if (void 0 !== e.searchlet) {
                        if (!Array.isArray(e.searchlet))
                          return 'searchlet: array expected';
                        for (r = 0; r < e.searchlet.length; ++r) {
                          var t;
                          if ((t = l[7].verify(e.searchlet[r])))
                            return 'searchlet.' + t;
                        }
                      }
                      return void 0 !== e.requirements &&
                        null !== e.requirements &&
                        (t = l[8].verify(e.requirements))
                        ? 'requirements.' + t
                        : void 0 !== e.suggestServer &&
                          null !== e.suggestServer &&
                          (t = l[9].verify(e.suggestServer))
                        ? 'suggestServer.' + t
                        : null;
                    }),
                    (r.from = r.fromObject =
                      function (e) {
                        if (
                          e instanceof
                          i.keyhole.dbroot.EndSnippetProto.SearchConfigProto
                            .SearchServer
                        )
                          return e;
                        var r =
                          new i.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer();
                        if (void 0 !== e.name && null !== e.name) {
                          if ('object' != typeof e.name)
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.name: object expected',
                            );
                          r.name = l[0].fromObject(e.name);
                        }
                        if (void 0 !== e.url && null !== e.url) {
                          if ('object' != typeof e.url)
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.url: object expected',
                            );
                          r.url = l[1].fromObject(e.url);
                        }
                        switch (e.type) {
                          case 'RESULT_TYPE_KML':
                          case 0:
                            r.type = 0;
                            break;
                          case 'RESULT_TYPE_XML':
                          case 1:
                            r.type = 1;
                        }
                        if (
                          void 0 !== e.htmlTransformUrl &&
                          null !== e.htmlTransformUrl
                        ) {
                          if ('object' != typeof e.htmlTransformUrl)
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.htmlTransformUrl: object expected',
                            );
                          r.htmlTransformUrl = l[3].fromObject(
                            e.htmlTransformUrl,
                          );
                        }
                        if (
                          void 0 !== e.kmlTransformUrl &&
                          null !== e.kmlTransformUrl
                        ) {
                          if ('object' != typeof e.kmlTransformUrl)
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.kmlTransformUrl: object expected',
                            );
                          r.kmlTransformUrl = l[4].fromObject(
                            e.kmlTransformUrl,
                          );
                        }
                        if (
                          void 0 !== e.supplementalUi &&
                          null !== e.supplementalUi
                        ) {
                          if ('object' != typeof e.supplementalUi)
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.supplementalUi: object expected',
                            );
                          r.supplementalUi = l[5].fromObject(e.supplementalUi);
                        }
                        if (e.suggestion) {
                          if (!Array.isArray(e.suggestion))
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.suggestion: array expected',
                            );
                          r.suggestion = [];
                          for (var t = 0; t < e.suggestion.length; ++t) {
                            if ('object' != typeof e.suggestion[t])
                              throw TypeError(
                                '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.suggestion: object expected',
                              );
                            r.suggestion[t] = l[6].fromObject(e.suggestion[t]);
                          }
                        }
                        if (e.searchlet) {
                          if (!Array.isArray(e.searchlet))
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.searchlet: array expected',
                            );
                          for (
                            r.searchlet = [], t = 0;
                            t < e.searchlet.length;
                            ++t
                          ) {
                            if ('object' != typeof e.searchlet[t])
                              throw TypeError(
                                '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.searchlet: object expected',
                              );
                            r.searchlet[t] = l[7].fromObject(e.searchlet[t]);
                          }
                        }
                        if (
                          void 0 !== e.requirements &&
                          null !== e.requirements
                        ) {
                          if ('object' != typeof e.requirements)
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.requirements: object expected',
                            );
                          r.requirements = l[8].fromObject(e.requirements);
                        }
                        if (
                          void 0 !== e.suggestServer &&
                          null !== e.suggestServer
                        ) {
                          if ('object' != typeof e.suggestServer)
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.suggestServer: object expected',
                            );
                          r.suggestServer = l[9].fromObject(e.suggestServer);
                        }
                        return r;
                      }),
                    (r.toObject = function (e, r) {
                      r || (r = {});
                      var t = {};
                      if (
                        ((r.arrays || r.defaults) &&
                          ((t.suggestion = []), (t.searchlet = [])),
                        r.defaults &&
                          ((t.name = null),
                          (t.url = null),
                          (t.type = r.enums === String ? 'RESULT_TYPE_KML' : 0),
                          (t.htmlTransformUrl = null),
                          (t.kmlTransformUrl = null),
                          (t.supplementalUi = null),
                          (t.requirements = null),
                          (t.suggestServer = null)),
                        void 0 !== e.name &&
                          null !== e.name &&
                          e.hasOwnProperty('name') &&
                          (t.name = l[0].toObject(e.name, r)),
                        void 0 !== e.url &&
                          null !== e.url &&
                          e.hasOwnProperty('url') &&
                          (t.url = l[1].toObject(e.url, r)),
                        void 0 !== e.type &&
                          null !== e.type &&
                          e.hasOwnProperty('type') &&
                          (t.type = r.enums === String ? l[2][e.type] : e.type),
                        void 0 !== e.htmlTransformUrl &&
                          null !== e.htmlTransformUrl &&
                          e.hasOwnProperty('htmlTransformUrl') &&
                          (t.htmlTransformUrl = l[3].toObject(
                            e.htmlTransformUrl,
                            r,
                          )),
                        void 0 !== e.kmlTransformUrl &&
                          null !== e.kmlTransformUrl &&
                          e.hasOwnProperty('kmlTransformUrl') &&
                          (t.kmlTransformUrl = l[4].toObject(
                            e.kmlTransformUrl,
                            r,
                          )),
                        void 0 !== e.supplementalUi &&
                          null !== e.supplementalUi &&
                          e.hasOwnProperty('supplementalUi') &&
                          (t.supplementalUi = l[5].toObject(
                            e.supplementalUi,
                            r,
                          )),
                        void 0 !== e.suggestion &&
                          null !== e.suggestion &&
                          e.hasOwnProperty('suggestion'))
                      ) {
                        t.suggestion = [];
                        for (var o = 0; o < e.suggestion.length; ++o)
                          t.suggestion[o] = l[6].toObject(e.suggestion[o], r);
                      }
                      if (
                        void 0 !== e.searchlet &&
                        null !== e.searchlet &&
                        e.hasOwnProperty('searchlet')
                      )
                        for (
                          t.searchlet = [], o = 0;
                          o < e.searchlet.length;
                          ++o
                        )
                          t.searchlet[o] = l[7].toObject(e.searchlet[o], r);
                      return (
                        void 0 !== e.requirements &&
                          null !== e.requirements &&
                          e.hasOwnProperty('requirements') &&
                          (t.requirements = l[8].toObject(e.requirements, r)),
                        void 0 !== e.suggestServer &&
                          null !== e.suggestServer &&
                          e.hasOwnProperty('suggestServer') &&
                          (t.suggestServer = l[9].toObject(e.suggestServer, r)),
                        t
                      );
                    }),
                    (r.prototype.toObject = function (e) {
                      return this.constructor.toObject(this, e);
                    }),
                    (r.prototype.toJSON = function () {
                      return this.constructor.toObject(
                        this,
                        e.util.toJSONOptions,
                      );
                    }),
                    (r.ResultType =
                      (((t = Object.create({})).RESULT_TYPE_KML = 0),
                      (t.RESULT_TYPE_XML = 1),
                      t)),
                    (r.SupplementalUi = (function () {
                      function r(e) {
                        if (e)
                          for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                            this[r[t]] = e[r[t]];
                      }
                      (r.prototype.url = null),
                        (r.prototype.label = null),
                        (r.prototype.height = 160);
                      var t = {
                        0: 'keyhole.dbroot.StringIdOrValueProto',
                        1: 'keyhole.dbroot.StringIdOrValueProto',
                      };
                      return (
                        n.push(t),
                        (r.decode = function (e, r) {
                          e instanceof o || (e = o.create(e));
                          for (
                            var a = void 0 === r ? e.len : e.pos + r,
                              n =
                                new i.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi();
                            e.pos < a;

                          ) {
                            var l = e.uint32();
                            switch (l >>> 3) {
                              case 1:
                                n.url = t[0].decode(e, e.uint32());
                                break;
                              case 2:
                                n.label = t[1].decode(e, e.uint32());
                                break;
                              case 3:
                                n.height = e.int32();
                                break;
                              default:
                                e.skipType(7 & l);
                            }
                          }
                          return n;
                        }),
                        (r.verify = function (e) {
                          return 'object' != typeof e || null === e
                            ? 'object expected'
                            : void 0 !== e.url &&
                              null !== e.url &&
                              (r = t[0].verify(e.url))
                            ? 'url.' + r
                            : void 0 !== e.label &&
                              null !== e.label &&
                              (r = t[1].verify(e.label))
                            ? 'label.' + r
                            : void 0 === e.height || a.isInteger(e.height)
                            ? null
                            : 'height: integer expected';
                          var r;
                        }),
                        (r.from = r.fromObject =
                          function (e) {
                            if (
                              e instanceof
                              i.keyhole.dbroot.EndSnippetProto.SearchConfigProto
                                .SearchServer.SupplementalUi
                            )
                              return e;
                            var r =
                              new i.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi();
                            if (void 0 !== e.url && null !== e.url) {
                              if ('object' != typeof e.url)
                                throw TypeError(
                                  '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi.url: object expected',
                                );
                              r.url = t[0].fromObject(e.url);
                            }
                            if (void 0 !== e.label && null !== e.label) {
                              if ('object' != typeof e.label)
                                throw TypeError(
                                  '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi.label: object expected',
                                );
                              r.label = t[1].fromObject(e.label);
                            }
                            return (
                              void 0 !== e.height &&
                                null !== e.height &&
                                (r.height = 0 | e.height),
                              r
                            );
                          }),
                        (r.toObject = function (e, r) {
                          r || (r = {});
                          var o = {};
                          return (
                            r.defaults &&
                              ((o.url = null),
                              (o.label = null),
                              (o.height = 160)),
                            void 0 !== e.url &&
                              null !== e.url &&
                              e.hasOwnProperty('url') &&
                              (o.url = t[0].toObject(e.url, r)),
                            void 0 !== e.label &&
                              null !== e.label &&
                              e.hasOwnProperty('label') &&
                              (o.label = t[1].toObject(e.label, r)),
                            void 0 !== e.height &&
                              null !== e.height &&
                              e.hasOwnProperty('height') &&
                              (o.height = e.height),
                            o
                          );
                        }),
                        (r.prototype.toObject = function (e) {
                          return this.constructor.toObject(this, e);
                        }),
                        (r.prototype.toJSON = function () {
                          return this.constructor.toObject(
                            this,
                            e.util.toJSONOptions,
                          );
                        }),
                        r
                      );
                    })()),
                    (r.SearchletProto = (function () {
                      function r(e) {
                        if (e)
                          for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                            this[r[t]] = e[r[t]];
                      }
                      (r.prototype.url = null),
                        (r.prototype.name = null),
                        (r.prototype.requirements = null);
                      var t = {
                        0: 'keyhole.dbroot.StringIdOrValueProto',
                        1: 'keyhole.dbroot.StringIdOrValueProto',
                        2: 'keyhole.dbroot.RequirementProto',
                      };
                      return (
                        n.push(t),
                        (r.decode = function (e, r) {
                          e instanceof o || (e = o.create(e));
                          for (
                            var a = void 0 === r ? e.len : e.pos + r,
                              n =
                                new i.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto();
                            e.pos < a;

                          ) {
                            var l = e.uint32();
                            switch (l >>> 3) {
                              case 1:
                                n.url = t[0].decode(e, e.uint32());
                                break;
                              case 2:
                                n.name = t[1].decode(e, e.uint32());
                                break;
                              case 3:
                                n.requirements = t[2].decode(e, e.uint32());
                                break;
                              default:
                                e.skipType(7 & l);
                            }
                          }
                          return n;
                        }),
                        (r.verify = function (e) {
                          return 'object' != typeof e || null === e
                            ? 'object expected'
                            : void 0 !== e.url &&
                              null !== e.url &&
                              (r = t[0].verify(e.url))
                            ? 'url.' + r
                            : void 0 !== e.name &&
                              null !== e.name &&
                              (r = t[1].verify(e.name))
                            ? 'name.' + r
                            : void 0 !== e.requirements &&
                              null !== e.requirements &&
                              (r = t[2].verify(e.requirements))
                            ? 'requirements.' + r
                            : null;
                          var r;
                        }),
                        (r.from = r.fromObject =
                          function (e) {
                            if (
                              e instanceof
                              i.keyhole.dbroot.EndSnippetProto.SearchConfigProto
                                .SearchServer.SearchletProto
                            )
                              return e;
                            var r =
                              new i.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto();
                            if (void 0 !== e.url && null !== e.url) {
                              if ('object' != typeof e.url)
                                throw TypeError(
                                  '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto.url: object expected',
                                );
                              r.url = t[0].fromObject(e.url);
                            }
                            if (void 0 !== e.name && null !== e.name) {
                              if ('object' != typeof e.name)
                                throw TypeError(
                                  '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto.name: object expected',
                                );
                              r.name = t[1].fromObject(e.name);
                            }
                            if (
                              void 0 !== e.requirements &&
                              null !== e.requirements
                            ) {
                              if ('object' != typeof e.requirements)
                                throw TypeError(
                                  '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto.requirements: object expected',
                                );
                              r.requirements = t[2].fromObject(e.requirements);
                            }
                            return r;
                          }),
                        (r.toObject = function (e, r) {
                          r || (r = {});
                          var o = {};
                          return (
                            r.defaults &&
                              ((o.url = null),
                              (o.name = null),
                              (o.requirements = null)),
                            void 0 !== e.url &&
                              null !== e.url &&
                              e.hasOwnProperty('url') &&
                              (o.url = t[0].toObject(e.url, r)),
                            void 0 !== e.name &&
                              null !== e.name &&
                              e.hasOwnProperty('name') &&
                              (o.name = t[1].toObject(e.name, r)),
                            void 0 !== e.requirements &&
                              null !== e.requirements &&
                              e.hasOwnProperty('requirements') &&
                              (o.requirements = t[2].toObject(
                                e.requirements,
                                r,
                              )),
                            o
                          );
                        }),
                        (r.prototype.toObject = function (e) {
                          return this.constructor.toObject(this, e);
                        }),
                        (r.prototype.toJSON = function () {
                          return this.constructor.toObject(
                            this,
                            e.util.toJSONOptions,
                          );
                        }),
                        r
                      );
                    })()),
                    r
                  );
                })()),
                (r.OneboxServiceProto = (function () {
                  function r(e) {
                    if (e)
                      for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                        this[r[t]] = e[r[t]];
                  }
                  (r.prototype.serviceUrl = null),
                    (r.prototype.requirements = null);
                  var t = {
                    0: 'keyhole.dbroot.StringIdOrValueProto',
                    1: 'keyhole.dbroot.RequirementProto',
                  };
                  return (
                    n.push(t),
                    (r.decode = function (e, r) {
                      e instanceof o || (e = o.create(e));
                      for (
                        var a = void 0 === r ? e.len : e.pos + r,
                          n =
                            new i.keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto();
                        e.pos < a;

                      ) {
                        var l = e.uint32();
                        switch (l >>> 3) {
                          case 1:
                            n.serviceUrl = t[0].decode(e, e.uint32());
                            break;
                          case 2:
                            n.requirements = t[1].decode(e, e.uint32());
                            break;
                          default:
                            e.skipType(7 & l);
                        }
                      }
                      return n;
                    }),
                    (r.verify = function (e) {
                      return 'object' != typeof e || null === e
                        ? 'object expected'
                        : void 0 !== e.serviceUrl &&
                          null !== e.serviceUrl &&
                          (r = t[0].verify(e.serviceUrl))
                        ? 'serviceUrl.' + r
                        : void 0 !== e.requirements &&
                          null !== e.requirements &&
                          (r = t[1].verify(e.requirements))
                        ? 'requirements.' + r
                        : null;
                      var r;
                    }),
                    (r.from = r.fromObject =
                      function (e) {
                        if (
                          e instanceof
                          i.keyhole.dbroot.EndSnippetProto.SearchConfigProto
                            .OneboxServiceProto
                        )
                          return e;
                        var r =
                          new i.keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto();
                        if (void 0 !== e.serviceUrl && null !== e.serviceUrl) {
                          if ('object' != typeof e.serviceUrl)
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto.serviceUrl: object expected',
                            );
                          r.serviceUrl = t[0].fromObject(e.serviceUrl);
                        }
                        if (
                          void 0 !== e.requirements &&
                          null !== e.requirements
                        ) {
                          if ('object' != typeof e.requirements)
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto.requirements: object expected',
                            );
                          r.requirements = t[1].fromObject(e.requirements);
                        }
                        return r;
                      }),
                    (r.toObject = function (e, r) {
                      r || (r = {});
                      var o = {};
                      return (
                        r.defaults &&
                          ((o.serviceUrl = null), (o.requirements = null)),
                        void 0 !== e.serviceUrl &&
                          null !== e.serviceUrl &&
                          e.hasOwnProperty('serviceUrl') &&
                          (o.serviceUrl = t[0].toObject(e.serviceUrl, r)),
                        void 0 !== e.requirements &&
                          null !== e.requirements &&
                          e.hasOwnProperty('requirements') &&
                          (o.requirements = t[1].toObject(e.requirements, r)),
                        o
                      );
                    }),
                    (r.prototype.toObject = function (e) {
                      return this.constructor.toObject(this, e);
                    }),
                    (r.prototype.toJSON = function () {
                      return this.constructor.toObject(
                        this,
                        e.util.toJSONOptions,
                      );
                    }),
                    r
                  );
                })()),
                r
              );
            })()),
            (r.SearchInfoProto = (function () {
              function r(e) {
                if (e)
                  for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                    this[r[t]] = e[r[t]];
              }
              return (
                (r.prototype.defaultUrl = 'http://maps.google.com/maps'),
                (r.prototype.geocodeParam = 'q'),
                (r.decode = function (e, r) {
                  e instanceof o || (e = o.create(e));
                  for (
                    var t = void 0 === r ? e.len : e.pos + r,
                      a =
                        new i.keyhole.dbroot.EndSnippetProto.SearchInfoProto();
                    e.pos < t;

                  ) {
                    var n = e.uint32();
                    switch (n >>> 3) {
                      case 1:
                        a.defaultUrl = e.string();
                        break;
                      case 2:
                        a.geocodeParam = e.string();
                        break;
                      default:
                        e.skipType(7 & n);
                    }
                  }
                  return a;
                }),
                (r.verify = function (e) {
                  return 'object' != typeof e || null === e
                    ? 'object expected'
                    : void 0 === e.defaultUrl || a.isString(e.defaultUrl)
                    ? void 0 === e.geocodeParam || a.isString(e.geocodeParam)
                      ? null
                      : 'geocodeParam: string expected'
                    : 'defaultUrl: string expected';
                }),
                (r.from = r.fromObject =
                  function (e) {
                    if (
                      e instanceof
                      i.keyhole.dbroot.EndSnippetProto.SearchInfoProto
                    )
                      return e;
                    var r =
                      new i.keyhole.dbroot.EndSnippetProto.SearchInfoProto();
                    return (
                      void 0 !== e.defaultUrl &&
                        null !== e.defaultUrl &&
                        (r.defaultUrl = String(e.defaultUrl)),
                      void 0 !== e.geocodeParam &&
                        null !== e.geocodeParam &&
                        (r.geocodeParam = String(e.geocodeParam)),
                      r
                    );
                  }),
                (r.toObject = function (e, r) {
                  r || (r = {});
                  var t = {};
                  return (
                    r.defaults &&
                      ((t.defaultUrl = 'http://maps.google.com/maps'),
                      (t.geocodeParam = 'q')),
                    void 0 !== e.defaultUrl &&
                      null !== e.defaultUrl &&
                      e.hasOwnProperty('defaultUrl') &&
                      (t.defaultUrl = e.defaultUrl),
                    void 0 !== e.geocodeParam &&
                      null !== e.geocodeParam &&
                      e.hasOwnProperty('geocodeParam') &&
                      (t.geocodeParam = e.geocodeParam),
                    t
                  );
                }),
                (r.prototype.toObject = function (e) {
                  return this.constructor.toObject(this, e);
                }),
                (r.prototype.toJSON = function () {
                  return this.constructor.toObject(this, e.util.toJSONOptions);
                }),
                r
              );
            })()),
            (r.RockTreeDataProto = (function () {
              function r(e) {
                if (e)
                  for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                    this[r[t]] = e[r[t]];
              }
              r.prototype.url = null;
              var t = { 0: 'keyhole.dbroot.StringIdOrValueProto' };
              return (
                n.push(t),
                (r.decode = function (e, r) {
                  e instanceof o || (e = o.create(e));
                  for (
                    var a = void 0 === r ? e.len : e.pos + r,
                      n =
                        new i.keyhole.dbroot.EndSnippetProto.RockTreeDataProto();
                    e.pos < a;

                  ) {
                    var l = e.uint32();
                    if (l >>> 3 == 1) n.url = t[0].decode(e, e.uint32());
                    else e.skipType(7 & l);
                  }
                  return n;
                }),
                (r.verify = function (e) {
                  if ('object' != typeof e || null === e)
                    return 'object expected';
                  if (void 0 !== e.url && null !== e.url) {
                    var r = t[0].verify(e.url);
                    if (r) return 'url.' + r;
                  }
                  return null;
                }),
                (r.from = r.fromObject =
                  function (e) {
                    if (
                      e instanceof
                      i.keyhole.dbroot.EndSnippetProto.RockTreeDataProto
                    )
                      return e;
                    var r =
                      new i.keyhole.dbroot.EndSnippetProto.RockTreeDataProto();
                    if (void 0 !== e.url && null !== e.url) {
                      if ('object' != typeof e.url)
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.RockTreeDataProto.url: object expected',
                        );
                      r.url = t[0].fromObject(e.url);
                    }
                    return r;
                  }),
                (r.toObject = function (e, r) {
                  r || (r = {});
                  var o = {};
                  return (
                    r.defaults && (o.url = null),
                    void 0 !== e.url &&
                      null !== e.url &&
                      e.hasOwnProperty('url') &&
                      (o.url = t[0].toObject(e.url, r)),
                    o
                  );
                }),
                (r.prototype.toObject = function (e) {
                  return this.constructor.toObject(this, e);
                }),
                (r.prototype.toJSON = function () {
                  return this.constructor.toObject(this, e.util.toJSONOptions);
                }),
                r
              );
            })()),
            (r.FilmstripConfigProto = (function () {
              function r(e) {
                if (e)
                  for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                    this[r[t]] = e[r[t]];
              }
              (r.prototype.requirements = null),
                (r.prototype.alleycatUrlTemplate = null),
                (r.prototype.fallbackAlleycatUrlTemplate = null),
                (r.prototype.metadataUrlTemplate = null),
                (r.prototype.thumbnailUrlTemplate = null),
                (r.prototype.kmlUrlTemplate = null),
                (r.prototype.featuredToursUrl = null),
                (r.prototype.enableViewportFallback = !1),
                (r.prototype.viewportFallbackDistance = 0),
                (r.prototype.imageryType = a.emptyArray);
              var t = {
                0: 'keyhole.dbroot.RequirementProto',
                1: 'keyhole.dbroot.StringIdOrValueProto',
                2: 'keyhole.dbroot.StringIdOrValueProto',
                3: 'keyhole.dbroot.StringIdOrValueProto',
                4: 'keyhole.dbroot.StringIdOrValueProto',
                5: 'keyhole.dbroot.StringIdOrValueProto',
                6: 'keyhole.dbroot.StringIdOrValueProto',
                9: 'keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto',
              };
              return (
                n.push(t),
                (r.decode = function (e, r) {
                  e instanceof o || (e = o.create(e));
                  for (
                    var a = void 0 === r ? e.len : e.pos + r,
                      n =
                        new i.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto();
                    e.pos < a;

                  ) {
                    var l = e.uint32();
                    switch (l >>> 3) {
                      case 1:
                        n.requirements = t[0].decode(e, e.uint32());
                        break;
                      case 2:
                        n.alleycatUrlTemplate = t[1].decode(e, e.uint32());
                        break;
                      case 9:
                        n.fallbackAlleycatUrlTemplate = t[2].decode(
                          e,
                          e.uint32(),
                        );
                        break;
                      case 3:
                        n.metadataUrlTemplate = t[3].decode(e, e.uint32());
                        break;
                      case 4:
                        n.thumbnailUrlTemplate = t[4].decode(e, e.uint32());
                        break;
                      case 5:
                        n.kmlUrlTemplate = t[5].decode(e, e.uint32());
                        break;
                      case 6:
                        n.featuredToursUrl = t[6].decode(e, e.uint32());
                        break;
                      case 7:
                        n.enableViewportFallback = e.bool();
                        break;
                      case 8:
                        n.viewportFallbackDistance = e.uint32();
                        break;
                      case 10:
                        (n.imageryType && n.imageryType.length) ||
                          (n.imageryType = []),
                          n.imageryType.push(t[9].decode(e, e.uint32()));
                        break;
                      default:
                        e.skipType(7 & l);
                    }
                  }
                  return n;
                }),
                (r.verify = function (e) {
                  if ('object' != typeof e || null === e)
                    return 'object expected';
                  if (
                    void 0 !== e.requirements &&
                    null !== e.requirements &&
                    (o = t[0].verify(e.requirements))
                  )
                    return 'requirements.' + o;
                  if (
                    void 0 !== e.alleycatUrlTemplate &&
                    null !== e.alleycatUrlTemplate &&
                    (o = t[1].verify(e.alleycatUrlTemplate))
                  )
                    return 'alleycatUrlTemplate.' + o;
                  if (
                    void 0 !== e.fallbackAlleycatUrlTemplate &&
                    null !== e.fallbackAlleycatUrlTemplate &&
                    (o = t[2].verify(e.fallbackAlleycatUrlTemplate))
                  )
                    return 'fallbackAlleycatUrlTemplate.' + o;
                  if (
                    void 0 !== e.metadataUrlTemplate &&
                    null !== e.metadataUrlTemplate &&
                    (o = t[3].verify(e.metadataUrlTemplate))
                  )
                    return 'metadataUrlTemplate.' + o;
                  if (
                    void 0 !== e.thumbnailUrlTemplate &&
                    null !== e.thumbnailUrlTemplate &&
                    (o = t[4].verify(e.thumbnailUrlTemplate))
                  )
                    return 'thumbnailUrlTemplate.' + o;
                  if (
                    void 0 !== e.kmlUrlTemplate &&
                    null !== e.kmlUrlTemplate &&
                    (o = t[5].verify(e.kmlUrlTemplate))
                  )
                    return 'kmlUrlTemplate.' + o;
                  if (
                    void 0 !== e.featuredToursUrl &&
                    null !== e.featuredToursUrl &&
                    (o = t[6].verify(e.featuredToursUrl))
                  )
                    return 'featuredToursUrl.' + o;
                  if (
                    void 0 !== e.enableViewportFallback &&
                    'boolean' != typeof e.enableViewportFallback
                  )
                    return 'enableViewportFallback: boolean expected';
                  if (
                    void 0 !== e.viewportFallbackDistance &&
                    !a.isInteger(e.viewportFallbackDistance)
                  )
                    return 'viewportFallbackDistance: integer expected';
                  if (void 0 !== e.imageryType) {
                    if (!Array.isArray(e.imageryType))
                      return 'imageryType: array expected';
                    for (var r = 0; r < e.imageryType.length; ++r) {
                      var o;
                      if ((o = t[9].verify(e.imageryType[r])))
                        return 'imageryType.' + o;
                    }
                  }
                  return null;
                }),
                (r.from = r.fromObject =
                  function (e) {
                    if (
                      e instanceof
                      i.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto
                    )
                      return e;
                    var r =
                      new i.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto();
                    if (void 0 !== e.requirements && null !== e.requirements) {
                      if ('object' != typeof e.requirements)
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.requirements: object expected',
                        );
                      r.requirements = t[0].fromObject(e.requirements);
                    }
                    if (
                      void 0 !== e.alleycatUrlTemplate &&
                      null !== e.alleycatUrlTemplate
                    ) {
                      if ('object' != typeof e.alleycatUrlTemplate)
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.alleycatUrlTemplate: object expected',
                        );
                      r.alleycatUrlTemplate = t[1].fromObject(
                        e.alleycatUrlTemplate,
                      );
                    }
                    if (
                      void 0 !== e.fallbackAlleycatUrlTemplate &&
                      null !== e.fallbackAlleycatUrlTemplate
                    ) {
                      if ('object' != typeof e.fallbackAlleycatUrlTemplate)
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.fallbackAlleycatUrlTemplate: object expected',
                        );
                      r.fallbackAlleycatUrlTemplate = t[2].fromObject(
                        e.fallbackAlleycatUrlTemplate,
                      );
                    }
                    if (
                      void 0 !== e.metadataUrlTemplate &&
                      null !== e.metadataUrlTemplate
                    ) {
                      if ('object' != typeof e.metadataUrlTemplate)
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.metadataUrlTemplate: object expected',
                        );
                      r.metadataUrlTemplate = t[3].fromObject(
                        e.metadataUrlTemplate,
                      );
                    }
                    if (
                      void 0 !== e.thumbnailUrlTemplate &&
                      null !== e.thumbnailUrlTemplate
                    ) {
                      if ('object' != typeof e.thumbnailUrlTemplate)
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.thumbnailUrlTemplate: object expected',
                        );
                      r.thumbnailUrlTemplate = t[4].fromObject(
                        e.thumbnailUrlTemplate,
                      );
                    }
                    if (
                      void 0 !== e.kmlUrlTemplate &&
                      null !== e.kmlUrlTemplate
                    ) {
                      if ('object' != typeof e.kmlUrlTemplate)
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.kmlUrlTemplate: object expected',
                        );
                      r.kmlUrlTemplate = t[5].fromObject(e.kmlUrlTemplate);
                    }
                    if (
                      void 0 !== e.featuredToursUrl &&
                      null !== e.featuredToursUrl
                    ) {
                      if ('object' != typeof e.featuredToursUrl)
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.featuredToursUrl: object expected',
                        );
                      r.featuredToursUrl = t[6].fromObject(e.featuredToursUrl);
                    }
                    if (
                      (void 0 !== e.enableViewportFallback &&
                        null !== e.enableViewportFallback &&
                        (r.enableViewportFallback = Boolean(
                          e.enableViewportFallback,
                        )),
                      void 0 !== e.viewportFallbackDistance &&
                        null !== e.viewportFallbackDistance &&
                        (r.viewportFallbackDistance =
                          e.viewportFallbackDistance >>> 0),
                      e.imageryType)
                    ) {
                      if (!Array.isArray(e.imageryType))
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.imageryType: array expected',
                        );
                      r.imageryType = [];
                      for (var o = 0; o < e.imageryType.length; ++o) {
                        if ('object' != typeof e.imageryType[o])
                          throw TypeError(
                            '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.imageryType: object expected',
                          );
                        r.imageryType[o] = t[9].fromObject(e.imageryType[o]);
                      }
                    }
                    return r;
                  }),
                (r.toObject = function (e, r) {
                  r || (r = {});
                  var o = {};
                  if (
                    ((r.arrays || r.defaults) && (o.imageryType = []),
                    r.defaults &&
                      ((o.requirements = null),
                      (o.alleycatUrlTemplate = null),
                      (o.fallbackAlleycatUrlTemplate = null),
                      (o.metadataUrlTemplate = null),
                      (o.thumbnailUrlTemplate = null),
                      (o.kmlUrlTemplate = null),
                      (o.featuredToursUrl = null),
                      (o.enableViewportFallback = !1),
                      (o.viewportFallbackDistance = 0)),
                    void 0 !== e.requirements &&
                      null !== e.requirements &&
                      e.hasOwnProperty('requirements') &&
                      (o.requirements = t[0].toObject(e.requirements, r)),
                    void 0 !== e.alleycatUrlTemplate &&
                      null !== e.alleycatUrlTemplate &&
                      e.hasOwnProperty('alleycatUrlTemplate') &&
                      (o.alleycatUrlTemplate = t[1].toObject(
                        e.alleycatUrlTemplate,
                        r,
                      )),
                    void 0 !== e.fallbackAlleycatUrlTemplate &&
                      null !== e.fallbackAlleycatUrlTemplate &&
                      e.hasOwnProperty('fallbackAlleycatUrlTemplate') &&
                      (o.fallbackAlleycatUrlTemplate = t[2].toObject(
                        e.fallbackAlleycatUrlTemplate,
                        r,
                      )),
                    void 0 !== e.metadataUrlTemplate &&
                      null !== e.metadataUrlTemplate &&
                      e.hasOwnProperty('metadataUrlTemplate') &&
                      (o.metadataUrlTemplate = t[3].toObject(
                        e.metadataUrlTemplate,
                        r,
                      )),
                    void 0 !== e.thumbnailUrlTemplate &&
                      null !== e.thumbnailUrlTemplate &&
                      e.hasOwnProperty('thumbnailUrlTemplate') &&
                      (o.thumbnailUrlTemplate = t[4].toObject(
                        e.thumbnailUrlTemplate,
                        r,
                      )),
                    void 0 !== e.kmlUrlTemplate &&
                      null !== e.kmlUrlTemplate &&
                      e.hasOwnProperty('kmlUrlTemplate') &&
                      (o.kmlUrlTemplate = t[5].toObject(e.kmlUrlTemplate, r)),
                    void 0 !== e.featuredToursUrl &&
                      null !== e.featuredToursUrl &&
                      e.hasOwnProperty('featuredToursUrl') &&
                      (o.featuredToursUrl = t[6].toObject(
                        e.featuredToursUrl,
                        r,
                      )),
                    void 0 !== e.enableViewportFallback &&
                      null !== e.enableViewportFallback &&
                      e.hasOwnProperty('enableViewportFallback') &&
                      (o.enableViewportFallback = e.enableViewportFallback),
                    void 0 !== e.viewportFallbackDistance &&
                      null !== e.viewportFallbackDistance &&
                      e.hasOwnProperty('viewportFallbackDistance') &&
                      (o.viewportFallbackDistance = e.viewportFallbackDistance),
                    void 0 !== e.imageryType &&
                      null !== e.imageryType &&
                      e.hasOwnProperty('imageryType'))
                  ) {
                    o.imageryType = [];
                    for (var a = 0; a < e.imageryType.length; ++a)
                      o.imageryType[a] = t[9].toObject(e.imageryType[a], r);
                  }
                  return o;
                }),
                (r.prototype.toObject = function (e) {
                  return this.constructor.toObject(this, e);
                }),
                (r.prototype.toJSON = function () {
                  return this.constructor.toObject(this, e.util.toJSONOptions);
                }),
                (r.AlleycatImageryTypeProto = (function () {
                  function r(e) {
                    if (e)
                      for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                        this[r[t]] = e[r[t]];
                  }
                  (r.prototype.imageryTypeId = 0),
                    (r.prototype.imageryTypeLabel = ''),
                    (r.prototype.metadataUrlTemplate = null),
                    (r.prototype.thumbnailUrlTemplate = null),
                    (r.prototype.kmlUrlTemplate = null);
                  var t = {
                    2: 'keyhole.dbroot.StringIdOrValueProto',
                    3: 'keyhole.dbroot.StringIdOrValueProto',
                    4: 'keyhole.dbroot.StringIdOrValueProto',
                  };
                  return (
                    n.push(t),
                    (r.decode = function (e, r) {
                      e instanceof o || (e = o.create(e));
                      for (
                        var a = void 0 === r ? e.len : e.pos + r,
                          n =
                            new i.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto();
                        e.pos < a;

                      ) {
                        var l = e.uint32();
                        switch (l >>> 3) {
                          case 1:
                            n.imageryTypeId = e.int32();
                            break;
                          case 2:
                            n.imageryTypeLabel = e.string();
                            break;
                          case 3:
                            n.metadataUrlTemplate = t[2].decode(e, e.uint32());
                            break;
                          case 4:
                            n.thumbnailUrlTemplate = t[3].decode(e, e.uint32());
                            break;
                          case 5:
                            n.kmlUrlTemplate = t[4].decode(e, e.uint32());
                            break;
                          default:
                            e.skipType(7 & l);
                        }
                      }
                      return n;
                    }),
                    (r.verify = function (e) {
                      return 'object' != typeof e || null === e
                        ? 'object expected'
                        : void 0 === e.imageryTypeId ||
                          a.isInteger(e.imageryTypeId)
                        ? void 0 === e.imageryTypeLabel ||
                          a.isString(e.imageryTypeLabel)
                          ? void 0 !== e.metadataUrlTemplate &&
                            null !== e.metadataUrlTemplate &&
                            (r = t[2].verify(e.metadataUrlTemplate))
                            ? 'metadataUrlTemplate.' + r
                            : void 0 !== e.thumbnailUrlTemplate &&
                              null !== e.thumbnailUrlTemplate &&
                              (r = t[3].verify(e.thumbnailUrlTemplate))
                            ? 'thumbnailUrlTemplate.' + r
                            : void 0 !== e.kmlUrlTemplate &&
                              null !== e.kmlUrlTemplate &&
                              (r = t[4].verify(e.kmlUrlTemplate))
                            ? 'kmlUrlTemplate.' + r
                            : null
                          : 'imageryTypeLabel: string expected'
                        : 'imageryTypeId: integer expected';
                      var r;
                    }),
                    (r.from = r.fromObject =
                      function (e) {
                        if (
                          e instanceof
                          i.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto
                            .AlleycatImageryTypeProto
                        )
                          return e;
                        var r =
                          new i.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto();
                        if (
                          (void 0 !== e.imageryTypeId &&
                            null !== e.imageryTypeId &&
                            (r.imageryTypeId = 0 | e.imageryTypeId),
                          void 0 !== e.imageryTypeLabel &&
                            null !== e.imageryTypeLabel &&
                            (r.imageryTypeLabel = String(e.imageryTypeLabel)),
                          void 0 !== e.metadataUrlTemplate &&
                            null !== e.metadataUrlTemplate)
                        ) {
                          if ('object' != typeof e.metadataUrlTemplate)
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto.metadataUrlTemplate: object expected',
                            );
                          r.metadataUrlTemplate = t[2].fromObject(
                            e.metadataUrlTemplate,
                          );
                        }
                        if (
                          void 0 !== e.thumbnailUrlTemplate &&
                          null !== e.thumbnailUrlTemplate
                        ) {
                          if ('object' != typeof e.thumbnailUrlTemplate)
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto.thumbnailUrlTemplate: object expected',
                            );
                          r.thumbnailUrlTemplate = t[3].fromObject(
                            e.thumbnailUrlTemplate,
                          );
                        }
                        if (
                          void 0 !== e.kmlUrlTemplate &&
                          null !== e.kmlUrlTemplate
                        ) {
                          if ('object' != typeof e.kmlUrlTemplate)
                            throw TypeError(
                              '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto.kmlUrlTemplate: object expected',
                            );
                          r.kmlUrlTemplate = t[4].fromObject(e.kmlUrlTemplate);
                        }
                        return r;
                      }),
                    (r.toObject = function (e, r) {
                      r || (r = {});
                      var o = {};
                      return (
                        r.defaults &&
                          ((o.imageryTypeId = 0),
                          (o.imageryTypeLabel = ''),
                          (o.metadataUrlTemplate = null),
                          (o.thumbnailUrlTemplate = null),
                          (o.kmlUrlTemplate = null)),
                        void 0 !== e.imageryTypeId &&
                          null !== e.imageryTypeId &&
                          e.hasOwnProperty('imageryTypeId') &&
                          (o.imageryTypeId = e.imageryTypeId),
                        void 0 !== e.imageryTypeLabel &&
                          null !== e.imageryTypeLabel &&
                          e.hasOwnProperty('imageryTypeLabel') &&
                          (o.imageryTypeLabel = e.imageryTypeLabel),
                        void 0 !== e.metadataUrlTemplate &&
                          null !== e.metadataUrlTemplate &&
                          e.hasOwnProperty('metadataUrlTemplate') &&
                          (o.metadataUrlTemplate = t[2].toObject(
                            e.metadataUrlTemplate,
                            r,
                          )),
                        void 0 !== e.thumbnailUrlTemplate &&
                          null !== e.thumbnailUrlTemplate &&
                          e.hasOwnProperty('thumbnailUrlTemplate') &&
                          (o.thumbnailUrlTemplate = t[3].toObject(
                            e.thumbnailUrlTemplate,
                            r,
                          )),
                        void 0 !== e.kmlUrlTemplate &&
                          null !== e.kmlUrlTemplate &&
                          e.hasOwnProperty('kmlUrlTemplate') &&
                          (o.kmlUrlTemplate = t[4].toObject(
                            e.kmlUrlTemplate,
                            r,
                          )),
                        o
                      );
                    }),
                    (r.prototype.toObject = function (e) {
                      return this.constructor.toObject(this, e);
                    }),
                    (r.prototype.toJSON = function () {
                      return this.constructor.toObject(
                        this,
                        e.util.toJSONOptions,
                      );
                    }),
                    r
                  );
                })()),
                r
              );
            })()),
            (r.StarDataProto = (function () {
              function r(e) {
                if (e)
                  for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                    this[r[t]] = e[r[t]];
              }
              r.prototype.url = null;
              var t = { 0: 'keyhole.dbroot.StringIdOrValueProto' };
              return (
                n.push(t),
                (r.decode = function (e, r) {
                  e instanceof o || (e = o.create(e));
                  for (
                    var a = void 0 === r ? e.len : e.pos + r,
                      n = new i.keyhole.dbroot.EndSnippetProto.StarDataProto();
                    e.pos < a;

                  ) {
                    var l = e.uint32();
                    if (l >>> 3 == 1) n.url = t[0].decode(e, e.uint32());
                    else e.skipType(7 & l);
                  }
                  return n;
                }),
                (r.verify = function (e) {
                  if ('object' != typeof e || null === e)
                    return 'object expected';
                  if (void 0 !== e.url && null !== e.url) {
                    var r = t[0].verify(e.url);
                    if (r) return 'url.' + r;
                  }
                  return null;
                }),
                (r.from = r.fromObject =
                  function (e) {
                    if (
                      e instanceof
                      i.keyhole.dbroot.EndSnippetProto.StarDataProto
                    )
                      return e;
                    var r =
                      new i.keyhole.dbroot.EndSnippetProto.StarDataProto();
                    if (void 0 !== e.url && null !== e.url) {
                      if ('object' != typeof e.url)
                        throw TypeError(
                          '.keyhole.dbroot.EndSnippetProto.StarDataProto.url: object expected',
                        );
                      r.url = t[0].fromObject(e.url);
                    }
                    return r;
                  }),
                (r.toObject = function (e, r) {
                  r || (r = {});
                  var o = {};
                  return (
                    r.defaults && (o.url = null),
                    void 0 !== e.url &&
                      null !== e.url &&
                      e.hasOwnProperty('url') &&
                      (o.url = t[0].toObject(e.url, r)),
                    o
                  );
                }),
                (r.prototype.toObject = function (e) {
                  return this.constructor.toObject(this, e);
                }),
                (r.prototype.toJSON = function () {
                  return this.constructor.toObject(this, e.util.toJSONOptions);
                }),
                r
              );
            })()),
            r
          );
        })()),
        (r.DbRootRefProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.url = ''),
            (r.prototype.isCritical = !1),
            (r.prototype.requirements = null);
          var t = { 2: 'keyhole.dbroot.RequirementProto' };
          return (
            n.push(t),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var a = void 0 === r ? e.len : e.pos + r,
                  n = new i.keyhole.dbroot.DbRootRefProto();
                e.pos < a;

              ) {
                var l = e.uint32();
                switch (l >>> 3) {
                  case 2:
                    n.url = e.string();
                    break;
                  case 1:
                    n.isCritical = e.bool();
                    break;
                  case 3:
                    n.requirements = t[2].decode(e, e.uint32());
                    break;
                  default:
                    e.skipType(7 & l);
                }
              }
              return n;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if (!a.isString(e.url)) return 'url: string expected';
              if (void 0 !== e.isCritical && 'boolean' != typeof e.isCritical)
                return 'isCritical: boolean expected';
              if (void 0 !== e.requirements && null !== e.requirements) {
                var r = t[2].verify(e.requirements);
                if (r) return 'requirements.' + r;
              }
              return null;
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.DbRootRefProto) return e;
                var r = new i.keyhole.dbroot.DbRootRefProto();
                if (
                  (void 0 !== e.url &&
                    null !== e.url &&
                    (r.url = String(e.url)),
                  void 0 !== e.isCritical &&
                    null !== e.isCritical &&
                    (r.isCritical = Boolean(e.isCritical)),
                  void 0 !== e.requirements && null !== e.requirements)
                ) {
                  if ('object' != typeof e.requirements)
                    throw TypeError(
                      '.keyhole.dbroot.DbRootRefProto.requirements: object expected',
                    );
                  r.requirements = t[2].fromObject(e.requirements);
                }
                return r;
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var o = {};
              return (
                r.defaults &&
                  ((o.url = ''), (o.isCritical = !1), (o.requirements = null)),
                void 0 !== e.url &&
                  null !== e.url &&
                  e.hasOwnProperty('url') &&
                  (o.url = e.url),
                void 0 !== e.isCritical &&
                  null !== e.isCritical &&
                  e.hasOwnProperty('isCritical') &&
                  (o.isCritical = e.isCritical),
                void 0 !== e.requirements &&
                  null !== e.requirements &&
                  e.hasOwnProperty('requirements') &&
                  (o.requirements = t[2].toObject(e.requirements, r)),
                o
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.DatabaseVersionProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          return (
            (r.prototype.quadtreeVersion = 0),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.DatabaseVersionProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                if (n >>> 3 == 1) a.quadtreeVersion = e.uint32();
                else e.skipType(7 & n);
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : a.isInteger(e.quadtreeVersion)
                ? null
                : 'quadtreeVersion: integer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.DatabaseVersionProto)
                  return e;
                var r = new i.keyhole.dbroot.DatabaseVersionProto();
                return (
                  void 0 !== e.quadtreeVersion &&
                    null !== e.quadtreeVersion &&
                    (r.quadtreeVersion = e.quadtreeVersion >>> 0),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults && (t.quadtreeVersion = 0),
                void 0 !== e.quadtreeVersion &&
                  null !== e.quadtreeVersion &&
                  e.hasOwnProperty('quadtreeVersion') &&
                  (t.quadtreeVersion = e.quadtreeVersion),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.DbRootProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.databaseName = null),
            (r.prototype.imageryPresent = !0),
            (r.prototype.protoImagery = !1),
            (r.prototype.terrainPresent = !1),
            (r.prototype.providerInfo = a.emptyArray),
            (r.prototype.nestedFeature = a.emptyArray),
            (r.prototype.styleAttribute = a.emptyArray),
            (r.prototype.styleMap = a.emptyArray),
            (r.prototype.endSnippet = null),
            (r.prototype.translationEntry = a.emptyArray),
            (r.prototype.language = 'en'),
            (r.prototype.version = 5),
            (r.prototype.dbrootReference = a.emptyArray),
            (r.prototype.databaseVersion = null),
            (r.prototype.refreshTimeout = 0);
          var t = {
            0: 'keyhole.dbroot.StringIdOrValueProto',
            4: 'keyhole.dbroot.ProviderInfoProto',
            5: 'keyhole.dbroot.NestedFeatureProto',
            6: 'keyhole.dbroot.StyleAttributeProto',
            7: 'keyhole.dbroot.StyleMapProto',
            8: 'keyhole.dbroot.EndSnippetProto',
            9: 'keyhole.dbroot.StringEntryProto',
            12: 'keyhole.dbroot.DbRootRefProto',
            13: 'keyhole.dbroot.DatabaseVersionProto',
          };
          return (
            n.push(t),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var a = void 0 === r ? e.len : e.pos + r,
                  n = new i.keyhole.dbroot.DbRootProto();
                e.pos < a;

              ) {
                var l = e.uint32();
                switch (l >>> 3) {
                  case 15:
                    n.databaseName = t[0].decode(e, e.uint32());
                    break;
                  case 1:
                    n.imageryPresent = e.bool();
                    break;
                  case 14:
                    n.protoImagery = e.bool();
                    break;
                  case 2:
                    n.terrainPresent = e.bool();
                    break;
                  case 3:
                    (n.providerInfo && n.providerInfo.length) ||
                      (n.providerInfo = []),
                      n.providerInfo.push(t[4].decode(e, e.uint32()));
                    break;
                  case 4:
                    (n.nestedFeature && n.nestedFeature.length) ||
                      (n.nestedFeature = []),
                      n.nestedFeature.push(t[5].decode(e, e.uint32()));
                    break;
                  case 5:
                    (n.styleAttribute && n.styleAttribute.length) ||
                      (n.styleAttribute = []),
                      n.styleAttribute.push(t[6].decode(e, e.uint32()));
                    break;
                  case 6:
                    (n.styleMap && n.styleMap.length) || (n.styleMap = []),
                      n.styleMap.push(t[7].decode(e, e.uint32()));
                    break;
                  case 7:
                    n.endSnippet = t[8].decode(e, e.uint32());
                    break;
                  case 8:
                    (n.translationEntry && n.translationEntry.length) ||
                      (n.translationEntry = []),
                      n.translationEntry.push(t[9].decode(e, e.uint32()));
                    break;
                  case 9:
                    n.language = e.string();
                    break;
                  case 10:
                    n.version = e.int32();
                    break;
                  case 11:
                    (n.dbrootReference && n.dbrootReference.length) ||
                      (n.dbrootReference = []),
                      n.dbrootReference.push(t[12].decode(e, e.uint32()));
                    break;
                  case 13:
                    n.databaseVersion = t[13].decode(e, e.uint32());
                    break;
                  case 16:
                    n.refreshTimeout = e.int32();
                    break;
                  default:
                    e.skipType(7 & l);
                }
              }
              return n;
            }),
            (r.verify = function (e) {
              if ('object' != typeof e || null === e) return 'object expected';
              if (
                void 0 !== e.databaseName &&
                null !== e.databaseName &&
                (o = t[0].verify(e.databaseName))
              )
                return 'databaseName.' + o;
              if (
                void 0 !== e.imageryPresent &&
                'boolean' != typeof e.imageryPresent
              )
                return 'imageryPresent: boolean expected';
              if (
                void 0 !== e.protoImagery &&
                'boolean' != typeof e.protoImagery
              )
                return 'protoImagery: boolean expected';
              if (
                void 0 !== e.terrainPresent &&
                'boolean' != typeof e.terrainPresent
              )
                return 'terrainPresent: boolean expected';
              if (void 0 !== e.providerInfo) {
                if (!Array.isArray(e.providerInfo))
                  return 'providerInfo: array expected';
                for (var r = 0; r < e.providerInfo.length; ++r)
                  if ((o = t[4].verify(e.providerInfo[r])))
                    return 'providerInfo.' + o;
              }
              if (void 0 !== e.nestedFeature) {
                if (!Array.isArray(e.nestedFeature))
                  return 'nestedFeature: array expected';
                for (r = 0; r < e.nestedFeature.length; ++r)
                  if ((o = t[5].verify(e.nestedFeature[r])))
                    return 'nestedFeature.' + o;
              }
              if (void 0 !== e.styleAttribute) {
                if (!Array.isArray(e.styleAttribute))
                  return 'styleAttribute: array expected';
                for (r = 0; r < e.styleAttribute.length; ++r)
                  if ((o = t[6].verify(e.styleAttribute[r])))
                    return 'styleAttribute.' + o;
              }
              if (void 0 !== e.styleMap) {
                if (!Array.isArray(e.styleMap))
                  return 'styleMap: array expected';
                for (r = 0; r < e.styleMap.length; ++r)
                  if ((o = t[7].verify(e.styleMap[r]))) return 'styleMap.' + o;
              }
              if (
                void 0 !== e.endSnippet &&
                null !== e.endSnippet &&
                (o = t[8].verify(e.endSnippet))
              )
                return 'endSnippet.' + o;
              if (void 0 !== e.translationEntry) {
                if (!Array.isArray(e.translationEntry))
                  return 'translationEntry: array expected';
                for (r = 0; r < e.translationEntry.length; ++r)
                  if ((o = t[9].verify(e.translationEntry[r])))
                    return 'translationEntry.' + o;
              }
              if (void 0 !== e.language && !a.isString(e.language))
                return 'language: string expected';
              if (void 0 !== e.version && !a.isInteger(e.version))
                return 'version: integer expected';
              if (void 0 !== e.dbrootReference) {
                if (!Array.isArray(e.dbrootReference))
                  return 'dbrootReference: array expected';
                for (r = 0; r < e.dbrootReference.length; ++r) {
                  var o;
                  if ((o = t[12].verify(e.dbrootReference[r])))
                    return 'dbrootReference.' + o;
                }
              }
              return void 0 !== e.databaseVersion &&
                null !== e.databaseVersion &&
                (o = t[13].verify(e.databaseVersion))
                ? 'databaseVersion.' + o
                : void 0 === e.refreshTimeout || a.isInteger(e.refreshTimeout)
                ? null
                : 'refreshTimeout: integer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.DbRootProto) return e;
                var r = new i.keyhole.dbroot.DbRootProto();
                if (void 0 !== e.databaseName && null !== e.databaseName) {
                  if ('object' != typeof e.databaseName)
                    throw TypeError(
                      '.keyhole.dbroot.DbRootProto.databaseName: object expected',
                    );
                  r.databaseName = t[0].fromObject(e.databaseName);
                }
                if (
                  (void 0 !== e.imageryPresent &&
                    null !== e.imageryPresent &&
                    (r.imageryPresent = Boolean(e.imageryPresent)),
                  void 0 !== e.protoImagery &&
                    null !== e.protoImagery &&
                    (r.protoImagery = Boolean(e.protoImagery)),
                  void 0 !== e.terrainPresent &&
                    null !== e.terrainPresent &&
                    (r.terrainPresent = Boolean(e.terrainPresent)),
                  e.providerInfo)
                ) {
                  if (!Array.isArray(e.providerInfo))
                    throw TypeError(
                      '.keyhole.dbroot.DbRootProto.providerInfo: array expected',
                    );
                  r.providerInfo = [];
                  for (var o = 0; o < e.providerInfo.length; ++o) {
                    if ('object' != typeof e.providerInfo[o])
                      throw TypeError(
                        '.keyhole.dbroot.DbRootProto.providerInfo: object expected',
                      );
                    r.providerInfo[o] = t[4].fromObject(e.providerInfo[o]);
                  }
                }
                if (e.nestedFeature) {
                  if (!Array.isArray(e.nestedFeature))
                    throw TypeError(
                      '.keyhole.dbroot.DbRootProto.nestedFeature: array expected',
                    );
                  for (
                    r.nestedFeature = [], o = 0;
                    o < e.nestedFeature.length;
                    ++o
                  ) {
                    if ('object' != typeof e.nestedFeature[o])
                      throw TypeError(
                        '.keyhole.dbroot.DbRootProto.nestedFeature: object expected',
                      );
                    r.nestedFeature[o] = t[5].fromObject(e.nestedFeature[o]);
                  }
                }
                if (e.styleAttribute) {
                  if (!Array.isArray(e.styleAttribute))
                    throw TypeError(
                      '.keyhole.dbroot.DbRootProto.styleAttribute: array expected',
                    );
                  for (
                    r.styleAttribute = [], o = 0;
                    o < e.styleAttribute.length;
                    ++o
                  ) {
                    if ('object' != typeof e.styleAttribute[o])
                      throw TypeError(
                        '.keyhole.dbroot.DbRootProto.styleAttribute: object expected',
                      );
                    r.styleAttribute[o] = t[6].fromObject(e.styleAttribute[o]);
                  }
                }
                if (e.styleMap) {
                  if (!Array.isArray(e.styleMap))
                    throw TypeError(
                      '.keyhole.dbroot.DbRootProto.styleMap: array expected',
                    );
                  for (r.styleMap = [], o = 0; o < e.styleMap.length; ++o) {
                    if ('object' != typeof e.styleMap[o])
                      throw TypeError(
                        '.keyhole.dbroot.DbRootProto.styleMap: object expected',
                      );
                    r.styleMap[o] = t[7].fromObject(e.styleMap[o]);
                  }
                }
                if (void 0 !== e.endSnippet && null !== e.endSnippet) {
                  if ('object' != typeof e.endSnippet)
                    throw TypeError(
                      '.keyhole.dbroot.DbRootProto.endSnippet: object expected',
                    );
                  r.endSnippet = t[8].fromObject(e.endSnippet);
                }
                if (e.translationEntry) {
                  if (!Array.isArray(e.translationEntry))
                    throw TypeError(
                      '.keyhole.dbroot.DbRootProto.translationEntry: array expected',
                    );
                  for (
                    r.translationEntry = [], o = 0;
                    o < e.translationEntry.length;
                    ++o
                  ) {
                    if ('object' != typeof e.translationEntry[o])
                      throw TypeError(
                        '.keyhole.dbroot.DbRootProto.translationEntry: object expected',
                      );
                    r.translationEntry[o] = t[9].fromObject(
                      e.translationEntry[o],
                    );
                  }
                }
                if (
                  (void 0 !== e.language &&
                    null !== e.language &&
                    (r.language = String(e.language)),
                  void 0 !== e.version &&
                    null !== e.version &&
                    (r.version = 0 | e.version),
                  e.dbrootReference)
                ) {
                  if (!Array.isArray(e.dbrootReference))
                    throw TypeError(
                      '.keyhole.dbroot.DbRootProto.dbrootReference: array expected',
                    );
                  for (
                    r.dbrootReference = [], o = 0;
                    o < e.dbrootReference.length;
                    ++o
                  ) {
                    if ('object' != typeof e.dbrootReference[o])
                      throw TypeError(
                        '.keyhole.dbroot.DbRootProto.dbrootReference: object expected',
                      );
                    r.dbrootReference[o] = t[12].fromObject(
                      e.dbrootReference[o],
                    );
                  }
                }
                if (
                  void 0 !== e.databaseVersion &&
                  null !== e.databaseVersion
                ) {
                  if ('object' != typeof e.databaseVersion)
                    throw TypeError(
                      '.keyhole.dbroot.DbRootProto.databaseVersion: object expected',
                    );
                  r.databaseVersion = t[13].fromObject(e.databaseVersion);
                }
                return (
                  void 0 !== e.refreshTimeout &&
                    null !== e.refreshTimeout &&
                    (r.refreshTimeout = 0 | e.refreshTimeout),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var o = {};
              if (
                ((r.arrays || r.defaults) &&
                  ((o.providerInfo = []),
                  (o.nestedFeature = []),
                  (o.styleAttribute = []),
                  (o.styleMap = []),
                  (o.translationEntry = []),
                  (o.dbrootReference = [])),
                r.defaults &&
                  ((o.databaseName = null),
                  (o.imageryPresent = !0),
                  (o.protoImagery = !1),
                  (o.terrainPresent = !1),
                  (o.endSnippet = null),
                  (o.language = 'en'),
                  (o.version = 5),
                  (o.databaseVersion = null),
                  (o.refreshTimeout = 0)),
                void 0 !== e.databaseName &&
                  null !== e.databaseName &&
                  e.hasOwnProperty('databaseName') &&
                  (o.databaseName = t[0].toObject(e.databaseName, r)),
                void 0 !== e.imageryPresent &&
                  null !== e.imageryPresent &&
                  e.hasOwnProperty('imageryPresent') &&
                  (o.imageryPresent = e.imageryPresent),
                void 0 !== e.protoImagery &&
                  null !== e.protoImagery &&
                  e.hasOwnProperty('protoImagery') &&
                  (o.protoImagery = e.protoImagery),
                void 0 !== e.terrainPresent &&
                  null !== e.terrainPresent &&
                  e.hasOwnProperty('terrainPresent') &&
                  (o.terrainPresent = e.terrainPresent),
                void 0 !== e.providerInfo &&
                  null !== e.providerInfo &&
                  e.hasOwnProperty('providerInfo'))
              ) {
                o.providerInfo = [];
                for (var a = 0; a < e.providerInfo.length; ++a)
                  o.providerInfo[a] = t[4].toObject(e.providerInfo[a], r);
              }
              if (
                void 0 !== e.nestedFeature &&
                null !== e.nestedFeature &&
                e.hasOwnProperty('nestedFeature')
              )
                for (
                  o.nestedFeature = [], a = 0;
                  a < e.nestedFeature.length;
                  ++a
                )
                  o.nestedFeature[a] = t[5].toObject(e.nestedFeature[a], r);
              if (
                void 0 !== e.styleAttribute &&
                null !== e.styleAttribute &&
                e.hasOwnProperty('styleAttribute')
              )
                for (
                  o.styleAttribute = [], a = 0;
                  a < e.styleAttribute.length;
                  ++a
                )
                  o.styleAttribute[a] = t[6].toObject(e.styleAttribute[a], r);
              if (
                void 0 !== e.styleMap &&
                null !== e.styleMap &&
                e.hasOwnProperty('styleMap')
              )
                for (o.styleMap = [], a = 0; a < e.styleMap.length; ++a)
                  o.styleMap[a] = t[7].toObject(e.styleMap[a], r);
              if (
                (void 0 !== e.endSnippet &&
                  null !== e.endSnippet &&
                  e.hasOwnProperty('endSnippet') &&
                  (o.endSnippet = t[8].toObject(e.endSnippet, r)),
                void 0 !== e.translationEntry &&
                  null !== e.translationEntry &&
                  e.hasOwnProperty('translationEntry'))
              )
                for (
                  o.translationEntry = [], a = 0;
                  a < e.translationEntry.length;
                  ++a
                )
                  o.translationEntry[a] = t[9].toObject(
                    e.translationEntry[a],
                    r,
                  );
              if (
                (void 0 !== e.language &&
                  null !== e.language &&
                  e.hasOwnProperty('language') &&
                  (o.language = e.language),
                void 0 !== e.version &&
                  null !== e.version &&
                  e.hasOwnProperty('version') &&
                  (o.version = e.version),
                void 0 !== e.dbrootReference &&
                  null !== e.dbrootReference &&
                  e.hasOwnProperty('dbrootReference'))
              )
                for (
                  o.dbrootReference = [], a = 0;
                  a < e.dbrootReference.length;
                  ++a
                )
                  o.dbrootReference[a] = t[12].toObject(
                    e.dbrootReference[a],
                    r,
                  );
              return (
                void 0 !== e.databaseVersion &&
                  null !== e.databaseVersion &&
                  e.hasOwnProperty('databaseVersion') &&
                  (o.databaseVersion = t[13].toObject(e.databaseVersion, r)),
                void 0 !== e.refreshTimeout &&
                  null !== e.refreshTimeout &&
                  e.hasOwnProperty('refreshTimeout') &&
                  (o.refreshTimeout = e.refreshTimeout),
                o
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            r
          );
        })()),
        (r.EncryptedDbRootProto = (function () {
          function r(e) {
            if (e)
              for (var r = Object.keys(e), t = 0; t < r.length; ++t)
                this[r[t]] = e[r[t]];
          }
          (r.prototype.encryptionType = 0),
            (r.prototype.encryptionData = a.newBuffer([])),
            (r.prototype.dbrootData = a.newBuffer([]));
          var t,
            l = { 0: 'keyhole.dbroot.EncryptedDbRootProto.EncryptionType' };
          return (
            n.push(l),
            (r.decode = function (e, r) {
              e instanceof o || (e = o.create(e));
              for (
                var t = void 0 === r ? e.len : e.pos + r,
                  a = new i.keyhole.dbroot.EncryptedDbRootProto();
                e.pos < t;

              ) {
                var n = e.uint32();
                switch (n >>> 3) {
                  case 1:
                    a.encryptionType = e.uint32();
                    break;
                  case 2:
                    a.encryptionData = e.bytes();
                    break;
                  case 3:
                    a.dbrootData = e.bytes();
                    break;
                  default:
                    e.skipType(7 & n);
                }
              }
              return a;
            }),
            (r.verify = function (e) {
              return 'object' != typeof e || null === e
                ? 'object expected'
                : void 0 !== e.encryptionType && 0 !== e.encryptionType
                ? 'encryptionType: enum value expected'
                : void 0 === e.encryptionData ||
                  (e.encryptionData &&
                    'number' == typeof e.encryptionData.length) ||
                  a.isString(e.encryptionData)
                ? void 0 === e.dbrootData ||
                  (e.dbrootData && 'number' == typeof e.dbrootData.length) ||
                  a.isString(e.dbrootData)
                  ? null
                  : 'dbrootData: buffer expected'
                : 'encryptionData: buffer expected';
            }),
            (r.from = r.fromObject =
              function (e) {
                if (e instanceof i.keyhole.dbroot.EncryptedDbRootProto)
                  return e;
                var r = new i.keyhole.dbroot.EncryptedDbRootProto();
                switch (e.encryptionType) {
                  case 'ENCRYPTION_XOR':
                  case 0:
                    r.encryptionType = 0;
                }
                return (
                  void 0 !== e.encryptionData &&
                    null !== e.encryptionData &&
                    ('string' == typeof e.encryptionData
                      ? a.base64.decode(
                          e.encryptionData,
                          (r.encryptionData = a.newBuffer(
                            a.base64.length(e.encryptionData),
                          )),
                          0,
                        )
                      : e.encryptionData.length &&
                        (r.encryptionData = e.encryptionData)),
                  void 0 !== e.dbrootData &&
                    null !== e.dbrootData &&
                    ('string' == typeof e.dbrootData
                      ? a.base64.decode(
                          e.dbrootData,
                          (r.dbrootData = a.newBuffer(
                            a.base64.length(e.dbrootData),
                          )),
                          0,
                        )
                      : e.dbrootData.length && (r.dbrootData = e.dbrootData)),
                  r
                );
              }),
            (r.toObject = function (e, r) {
              r || (r = {});
              var t = {};
              return (
                r.defaults &&
                  ((t.encryptionType =
                    r.enums === String ? 'ENCRYPTION_XOR' : 0),
                  (t.encryptionData = r.bytes === String ? '' : []),
                  (t.dbrootData = r.bytes === String ? '' : [])),
                void 0 !== e.encryptionType &&
                  null !== e.encryptionType &&
                  e.hasOwnProperty('encryptionType') &&
                  (t.encryptionType =
                    r.enums === String
                      ? l[0][e.encryptionType]
                      : e.encryptionType),
                void 0 !== e.encryptionData &&
                  null !== e.encryptionData &&
                  e.hasOwnProperty('encryptionData') &&
                  (t.encryptionData =
                    r.bytes === String
                      ? a.base64.encode(
                          e.encryptionData,
                          0,
                          e.encryptionData.length,
                        )
                      : r.bytes === Array
                      ? Array.prototype.slice.call(e.encryptionData)
                      : e.encryptionData),
                void 0 !== e.dbrootData &&
                  null !== e.dbrootData &&
                  e.hasOwnProperty('dbrootData') &&
                  (t.dbrootData =
                    r.bytes === String
                      ? a.base64.encode(e.dbrootData, 0, e.dbrootData.length)
                      : r.bytes === Array
                      ? Array.prototype.slice.call(e.dbrootData)
                      : e.dbrootData),
                t
              );
            }),
            (r.prototype.toObject = function (e) {
              return this.constructor.toObject(this, e);
            }),
            (r.prototype.toJSON = function () {
              return this.constructor.toObject(this, e.util.toJSONOptions);
            }),
            (r.EncryptionType =
              (((t = Object.create({})).ENCRYPTION_XOR = 0), t)),
            r
          );
        })()),
        r)),
      t)),
    a.lazyResolve(i, n),
    i.keyhole.dbroot
  );
};
