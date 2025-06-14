function setTimeout(e) {
  e();
}
var requirejs, require, define;
'undefined' == typeof self && (self = {}),
  (self.onmessage = function (e) {
    var t = e.data;
    require(t.loaderConfig, [t.workerModule], function (e) {
      (self.onmessage = e), (CESIUM_BASE_URL = t.loaderConfig.baseUrl);
    });
  }),
  (function (global) {
    var req,
      s,
      head,
      baseElement,
      dataMain,
      src,
      interactiveScript,
      currentlyAddingScript,
      mainScript,
      subPath,
      version = '2.1.20',
      commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
      cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
      jsSuffixRegExp = /\.js$/,
      currDirRegExp = /^\.\//,
      op = Object.prototype,
      ostring = op.toString,
      hasOwn = op.hasOwnProperty,
      ap = Array.prototype,
      isBrowser = !(
        'undefined' == typeof window ||
        'undefined' == typeof navigator ||
        !window.document
      ),
      isWebWorker = !isBrowser && 'undefined' != typeof importScripts,
      readyRegExp =
        isBrowser && 'PLAYSTATION 3' === navigator.platform
          ? /^complete$/
          : /^(complete|loaded)$/,
      defContextName = '_',
      isOpera =
        'undefined' != typeof opera && '[object Opera]' === opera.toString(),
      contexts = {},
      cfg = {},
      globalDefQueue = [],
      useInteractive = !1;
    function isFunction(e) {
      return '[object Function]' === ostring.call(e);
    }
    function isArray(e) {
      return '[object Array]' === ostring.call(e);
    }
    function each(e, t) {
      var i;
      if (e) for (i = 0; i < e.length && (!e[i] || !t(e[i], i, e)); i += 1);
    }
    function eachReverse(e, t) {
      var i;
      if (e)
        for (i = e.length - 1; -1 < i && (!e[i] || !t(e[i], i, e)); i -= 1);
    }
    function hasProp(e, t) {
      return hasOwn.call(e, t);
    }
    function getOwn(e, t) {
      return hasProp(e, t) && e[t];
    }
    function eachProp(e, t) {
      var i;
      for (i in e) if (hasProp(e, i) && t(e[i], i)) break;
    }
    function mixin(e, t, i, r) {
      return (
        t &&
          eachProp(t, function (t, n) {
            (!i && hasProp(e, n)) ||
              (!r ||
              'object' != typeof t ||
              !t ||
              isArray(t) ||
              isFunction(t) ||
              t instanceof RegExp
                ? (e[n] = t)
                : (e[n] || (e[n] = {}), mixin(e[n], t, i, r)));
          }),
        e
      );
    }
    function bind(e, t) {
      return function () {
        return t.apply(e, arguments);
      };
    }
    function scripts() {
      return document.getElementsByTagName('script');
    }
    function defaultOnError(e) {
      throw e;
    }
    function getGlobal(e) {
      if (!e) return e;
      var t = global;
      return (
        each(e.split('.'), function (e) {
          t = t[e];
        }),
        t
      );
    }
    function makeError(e, t, i, r) {
      var n = new Error(t + '\nhttp://requirejs.org/docs/errors.html#' + e);
      return (
        (n.requireType = e),
        (n.requireModules = r),
        i && (n.originalError = i),
        n
      );
    }
    if (void 0 === define) {
      if (void 0 !== requirejs) {
        if (isFunction(requirejs)) return;
        (cfg = requirejs), (requirejs = void 0);
      }
      void 0 === require ||
        isFunction(require) ||
        ((cfg = require), (require = void 0)),
        (req = requirejs =
          function (e, t, i, r) {
            var n,
              o,
              a = defContextName;
            return (
              isArray(e) ||
                'string' == typeof e ||
                ((o = e), isArray(t) ? ((e = t), (t = i), (i = r)) : (e = [])),
              o && o.context && (a = o.context),
              (n = getOwn(contexts, a)) ||
                (n = contexts[a] = req.s.newContext(a)),
              o && n.configure(o),
              n.require(e, t, i)
            );
          }),
        (req.config = function (e) {
          return req(e);
        }),
        (req.nextTick =
          void 0 !== setTimeout
            ? function (e) {
                setTimeout(e, 4);
              }
            : function (e) {
                e();
              }),
        require || (require = req),
        (req.version = version),
        (req.jsExtRegExp = /^\/|:|\?|\.js$/),
        (req.isBrowser = isBrowser),
        (s = req.s = { contexts, newContext }),
        req({}),
        each(['toUrl', 'undef', 'defined', 'specified'], function (e) {
          req[e] = function () {
            var t = contexts[defContextName];
            return t.require[e].apply(t, arguments);
          };
        }),
        isBrowser &&
          ((head = s.head = document.getElementsByTagName('head')[0]),
          (baseElement = document.getElementsByTagName('base')[0]),
          baseElement && (head = s.head = baseElement.parentNode)),
        (req.onError = defaultOnError),
        (req.createNode = function (e, t, i) {
          var r = e.xhtml
            ? document.createElementNS(
                'http://www.w3.org/1999/xhtml',
                'html:script',
              )
            : document.createElement('script');
          return (
            (r.type = e.scriptType || 'text/javascript'),
            (r.charset = 'utf-8'),
            (r.async = !0),
            r
          );
        }),
        (req.load = function (e, t, i) {
          var r,
            n = (e && e.config) || {};
          if (isBrowser)
            return (
              (r = req.createNode(n, t, i)),
              n.onNodeCreated && n.onNodeCreated(r, n, t, i),
              r.setAttribute('data-requirecontext', e.contextName),
              r.setAttribute('data-requiremodule', t),
              !r.attachEvent ||
              (r.attachEvent.toString &&
                r.attachEvent.toString().indexOf('[native code') < 0) ||
              isOpera
                ? (r.addEventListener('load', e.onScriptLoad, !1),
                  r.addEventListener('error', e.onScriptError, !1))
                : ((useInteractive = !0),
                  r.attachEvent('onreadystatechange', e.onScriptLoad)),
              (r.src = i),
              (currentlyAddingScript = r),
              baseElement
                ? head.insertBefore(r, baseElement)
                : head.appendChild(r),
              (currentlyAddingScript = null),
              r
            );
          if (isWebWorker)
            try {
              importScripts(i), e.completeLoad(t);
            } catch (r) {
              e.onError(
                makeError(
                  'importscripts',
                  'importScripts failed for ' + t + ' at ' + i,
                  r,
                  [t],
                ),
              );
            }
        }),
        isBrowser &&
          !cfg.skipDataMain &&
          eachReverse(scripts(), function (e) {
            if (
              (head || (head = e.parentNode),
              (dataMain = e.getAttribute('data-main')))
            )
              return (
                (mainScript = dataMain),
                cfg.baseUrl ||
                  ((mainScript = (src = mainScript.split('/')).pop()),
                  (subPath = src.length ? src.join('/') + '/' : './'),
                  (cfg.baseUrl = subPath)),
                (mainScript = mainScript.replace(jsSuffixRegExp, '')),
                req.jsExtRegExp.test(mainScript) && (mainScript = dataMain),
                (cfg.deps = cfg.deps
                  ? cfg.deps.concat(mainScript)
                  : [mainScript]),
                !0
              );
          }),
        (define = function (e, t, i) {
          var r, n;
          'string' != typeof e && ((i = t), (t = e), (e = null)),
            isArray(t) || ((i = t), (t = null)),
            !t &&
              isFunction(i) &&
              ((t = []),
              i.length &&
                (i
                  .toString()
                  .replace(commentRegExp, '')
                  .replace(cjsRequireRegExp, function (e, i) {
                    t.push(i);
                  }),
                (t = (
                  1 === i.length
                    ? ['require']
                    : ['require', 'exports', 'module']
                ).concat(t)))),
            useInteractive &&
              (r = currentlyAddingScript || getInteractiveScript()) &&
              (e || (e = r.getAttribute('data-requiremodule')),
              (n = contexts[r.getAttribute('data-requirecontext')])),
            n
              ? (n.defQueue.push([e, t, i]), (n.defQueueMap[e] = !0))
              : globalDefQueue.push([e, t, i]);
        }),
        (define.amd = { jQuery: !0 }),
        (req.exec = function (text) {
          return eval(text);
        }),
        req(cfg);
    }
    function newContext(e) {
      var t,
        i,
        r,
        n,
        o,
        a = {
          waitSeconds: 7,
          baseUrl: './',
          paths: {},
          bundles: {},
          pkgs: {},
          shim: {},
          config: {},
        },
        s = {},
        u = {},
        c = {},
        d = [],
        p = {},
        f = {},
        l = {},
        h = 1,
        m = 1;
      function g(e, t, i) {
        var r,
          n,
          o,
          s,
          u,
          c,
          d,
          p,
          f,
          l,
          h = t && t.split('/'),
          m = a.map,
          g = m && m['*'];
        if (
          (e &&
            ((c = (e = e.split('/')).length - 1),
            a.nodeIdCompat &&
              jsSuffixRegExp.test(e[c]) &&
              (e[c] = e[c].replace(jsSuffixRegExp, '')),
            '.' === e[0].charAt(0) &&
              h &&
              (e = h.slice(0, h.length - 1).concat(e)),
            (function (e) {
              var t, i;
              for (t = 0; t < e.length; t++)
                if ('.' === (i = e[t])) e.splice(t, 1), (t -= 1);
                else if ('..' === i) {
                  if (
                    0 === t ||
                    (1 === t && '..' === e[2]) ||
                    '..' === e[t - 1]
                  )
                    continue;
                  0 < t && (e.splice(t - 1, 2), (t -= 2));
                }
            })(e),
            (e = e.join('/'))),
          i && m && (h || g))
        ) {
          e: for (o = (n = e.split('/')).length; 0 < o; o -= 1) {
            if (((u = n.slice(0, o).join('/')), h))
              for (s = h.length; 0 < s; s -= 1)
                if (
                  (r = getOwn(m, h.slice(0, s).join('/'))) &&
                  (r = getOwn(r, u))
                ) {
                  (d = r), (p = o);
                  break e;
                }
            !f && g && getOwn(g, u) && ((f = getOwn(g, u)), (l = o));
          }
          !d && f && ((d = f), (p = l)),
            d && (n.splice(0, p, d), (e = n.join('/')));
        }
        return getOwn(a.pkgs, e) || e;
      }
      function v(e) {
        isBrowser &&
          each(scripts(), function (t) {
            if (
              t.getAttribute('data-requiremodule') === e &&
              t.getAttribute('data-requirecontext') === r.contextName
            )
              return t.parentNode.removeChild(t), !0;
          });
      }
      function x(e) {
        var t = getOwn(a.paths, e);
        if (t && isArray(t) && 1 < t.length)
          return (
            t.shift(),
            r.require.undef(e),
            r.makeRequire(null, { skipMap: !0 })([e]),
            !0
          );
      }
      function b(e) {
        var t,
          i = e ? e.indexOf('!') : -1;
        return (
          -1 < i &&
            ((t = e.substring(0, i)), (e = e.substring(i + 1, e.length))),
          [t, e]
        );
      }
      function q(e, t, i, n) {
        var o,
          a,
          s,
          u,
          c = null,
          d = t ? t.name : null,
          f = e,
          l = !0,
          v = '';
        return (
          e || ((l = !1), (e = '_@r' + (h += 1))),
          (c = (u = b(e))[0]),
          (e = u[1]),
          c && ((c = g(c, d, n)), (a = getOwn(p, c))),
          e &&
            (c
              ? (v =
                  a && a.normalize
                    ? a.normalize(e, function (e) {
                        return g(e, d, n);
                      })
                    : -1 === e.indexOf('!')
                    ? g(e, d, n)
                    : e)
              : ((c = (u = b((v = g(e, d, n))))[0]),
                (v = u[1]),
                (i = !0),
                (o = r.nameToUrl(v)))),
          {
            prefix: c,
            name: v,
            parentMap: t,
            unnormalized: !!(s =
              !c || a || i ? '' : '_unnormalized' + (m += 1)),
            url: o,
            originalName: f,
            isDefine: l,
            id: (c ? c + '!' + v : v) + s,
          }
        );
      }
      function E(e) {
        var t = e.id,
          i = getOwn(s, t);
        return i || (i = s[t] = new r.Module(e)), i;
      }
      function w(e, t, i) {
        var r = e.id,
          n = getOwn(s, r);
        !hasProp(p, r) || (n && !n.defineEmitComplete)
          ? (n = E(e)).error && 'error' === t
            ? i(n.error)
            : n.on(t, i)
          : 'defined' === t && i(p[r]);
      }
      function y(e, t) {
        var i = e.requireModules,
          r = !1;
        t
          ? t(e)
          : (each(i, function (t) {
              var i = getOwn(s, t);
              i &&
                ((i.error = e),
                i.events.error && ((r = !0), i.emit('error', e)));
            }),
            r || req.onError(e));
      }
      function S() {
        globalDefQueue.length &&
          (each(globalDefQueue, function (e) {
            var t = e[0];
            'string' == typeof t && (r.defQueueMap[t] = !0), d.push(e);
          }),
          (globalDefQueue = []));
      }
      function k(e) {
        delete s[e], delete u[e];
      }
      function M() {
        var e,
          i,
          n = 1e3 * a.waitSeconds,
          c = n && r.startTime + n < new Date().getTime(),
          d = [],
          f = [],
          l = !1,
          h = !0;
        if (!t) {
          if (
            ((t = !0),
            eachProp(u, function (e) {
              var t = e.map,
                r = t.id;
              if (e.enabled && (t.isDefine || f.push(e), !e.error))
                if (!e.inited && c) x(r) ? (l = i = !0) : (d.push(r), v(r));
                else if (
                  !e.inited &&
                  e.fetched &&
                  t.isDefine &&
                  ((l = !0), !t.prefix)
                )
                  return (h = !1);
            }),
            c && d.length)
          )
            return (
              ((e = makeError(
                'timeout',
                'Load timeout for modules: ' + d,
                null,
                d,
              )).contextName = r.contextName),
              y(e)
            );
          h &&
            each(f, function (e) {
              !(function e(t, i, r) {
                var n = t.map.id;
                t.error
                  ? t.emit('error', t.error)
                  : ((i[n] = !0),
                    each(t.depMaps, function (n, o) {
                      var a = n.id,
                        u = getOwn(s, a);
                      !u ||
                        t.depMatched[o] ||
                        r[a] ||
                        (getOwn(i, a)
                          ? (t.defineDep(o, p[a]), t.check())
                          : e(u, i, r));
                    }),
                    (r[n] = !0));
              })(e, {}, {});
            }),
            (c && !i) ||
              !l ||
              (!isBrowser && !isWebWorker) ||
              o ||
              (o = setTimeout(function () {
                (o = 0), M();
              }, 50)),
            (t = !1);
        }
      }
      function O(e) {
        hasProp(p, e[0]) || E(q(e[0], null, !0)).init(e[1], e[2]);
      }
      function j(e, t, i, r) {
        e.detachEvent && !isOpera
          ? r && e.detachEvent(r, t)
          : e.removeEventListener(i, t, !1);
      }
      function P(e) {
        var t = e.currentTarget || e.srcElement;
        return (
          j(t, r.onScriptLoad, 'load', 'onreadystatechange'),
          j(t, r.onScriptError, 'error'),
          { node: t, id: t && t.getAttribute('data-requiremodule') }
        );
      }
      function R() {
        var e;
        for (S(); d.length; ) {
          if (null === (e = d.shift())[0])
            return y(
              makeError(
                'mismatch',
                'Mismatched anonymous define() module: ' + e[e.length - 1],
              ),
            );
          O(e);
        }
        r.defQueueMap = {};
      }
      return (
        (n = {
          require: function (e) {
            return e.require ? e.require : (e.require = r.makeRequire(e.map));
          },
          exports: function (e) {
            if (((e.usingExports = !0), e.map.isDefine))
              return e.exports
                ? (p[e.map.id] = e.exports)
                : (e.exports = p[e.map.id] = {});
          },
          module: function (e) {
            return e.module
              ? e.module
              : (e.module = {
                  id: e.map.id,
                  uri: e.map.url,
                  config: function () {
                    return getOwn(a.config, e.map.id) || {};
                  },
                  exports: e.exports || (e.exports = {}),
                });
          },
        }),
        ((i = function (e) {
          (this.events = getOwn(c, e.id) || {}),
            (this.map = e),
            (this.shim = getOwn(a.shim, e.id)),
            (this.depExports = []),
            (this.depMaps = []),
            (this.depMatched = []),
            (this.pluginMaps = {}),
            (this.depCount = 0);
        }).prototype = {
          init: function (e, t, i, r) {
            (r = r || {}),
              this.inited ||
                ((this.factory = t),
                i
                  ? this.on('error', i)
                  : this.events.error &&
                    (i = bind(this, function (e) {
                      this.emit('error', e);
                    })),
                (this.depMaps = e && e.slice(0)),
                (this.errback = i),
                (this.inited = !0),
                (this.ignore = r.ignore),
                r.enabled || this.enabled ? this.enable() : this.check());
          },
          defineDep: function (e, t) {
            this.depMatched[e] ||
              ((this.depMatched[e] = !0),
              (this.depCount -= 1),
              (this.depExports[e] = t));
          },
          fetch: function () {
            if (!this.fetched) {
              (this.fetched = !0), (r.startTime = new Date().getTime());
              var e = this.map;
              if (!this.shim) return e.prefix ? this.callPlugin() : this.load();
              r.makeRequire(this.map, { enableBuildCallback: !0 })(
                this.shim.deps || [],
                bind(this, function () {
                  return e.prefix ? this.callPlugin() : this.load();
                }),
              );
            }
          },
          load: function () {
            var e = this.map.url;
            f[e] || ((f[e] = !0), r.load(this.map.id, e));
          },
          check: function () {
            if (this.enabled && !this.enabling) {
              var e,
                t,
                i = this.map.id,
                n = this.depExports,
                o = this.exports,
                a = this.factory;
              if (this.inited) {
                if (this.error) this.emit('error', this.error);
                else if (!this.defining) {
                  if (
                    ((this.defining = !0), this.depCount < 1 && !this.defined)
                  ) {
                    if (isFunction(a)) {
                      if (
                        (this.events.error && this.map.isDefine) ||
                        req.onError !== defaultOnError
                      )
                        try {
                          o = r.execCb(i, a, n, o);
                        } catch (t) {
                          e = t;
                        }
                      else o = r.execCb(i, a, n, o);
                      if (
                        (this.map.isDefine &&
                          void 0 === o &&
                          ((t = this.module)
                            ? (o = t.exports)
                            : this.usingExports && (o = this.exports)),
                        e)
                      )
                        return (
                          (e.requireMap = this.map),
                          (e.requireModules = this.map.isDefine
                            ? [this.map.id]
                            : null),
                          (e.requireType = this.map.isDefine
                            ? 'define'
                            : 'require'),
                          y((this.error = e))
                        );
                    } else o = a;
                    (this.exports = o),
                      this.map.isDefine &&
                        !this.ignore &&
                        ((p[i] = o),
                        req.onResourceLoad &&
                          req.onResourceLoad(r, this.map, this.depMaps)),
                      k(i),
                      (this.defined = !0);
                  }
                  (this.defining = !1),
                    this.defined &&
                      !this.defineEmitted &&
                      ((this.defineEmitted = !0),
                      this.emit('defined', this.exports),
                      (this.defineEmitComplete = !0));
                }
              } else hasProp(r.defQueueMap, i) || this.fetch();
            }
          },
          callPlugin: function () {
            var e = this.map,
              t = e.id,
              i = q(e.prefix);
            this.depMaps.push(i),
              w(
                i,
                'defined',
                bind(this, function (i) {
                  var n,
                    o,
                    u,
                    c = getOwn(l, this.map.id),
                    d = this.map.name,
                    p = this.map.parentMap ? this.map.parentMap.name : null,
                    f = r.makeRequire(e.parentMap, { enableBuildCallback: !0 });
                  return this.map.unnormalized
                    ? (i.normalize &&
                        (d =
                          i.normalize(d, function (e) {
                            return g(e, p, !0);
                          }) || ''),
                      w(
                        (o = q(e.prefix + '!' + d, this.map.parentMap)),
                        'defined',
                        bind(this, function (e) {
                          this.init(
                            [],
                            function () {
                              return e;
                            },
                            null,
                            { enabled: !0, ignore: !0 },
                          );
                        }),
                      ),
                      void (
                        (u = getOwn(s, o.id)) &&
                        (this.depMaps.push(o),
                        this.events.error &&
                          u.on(
                            'error',
                            bind(this, function (e) {
                              this.emit('error', e);
                            }),
                          ),
                        u.enable())
                      ))
                    : c
                    ? ((this.map.url = r.nameToUrl(c)), void this.load())
                    : (((n = bind(this, function (e) {
                        this.init(
                          [],
                          function () {
                            return e;
                          },
                          null,
                          { enabled: !0 },
                        );
                      })).error = bind(this, function (e) {
                        (this.inited = !0),
                          ((this.error = e).requireModules = [t]),
                          eachProp(s, function (e) {
                            0 === e.map.id.indexOf(t + '_unnormalized') &&
                              k(e.map.id);
                          }),
                          y(e);
                      })),
                      (n.fromText = bind(this, function (i, o) {
                        var s = e.name,
                          u = q(s),
                          c = useInteractive;
                        o && (i = o),
                          c && (useInteractive = !1),
                          E(u),
                          hasProp(a.config, t) && (a.config[s] = a.config[t]);
                        try {
                          req.exec(i);
                        } catch (i) {
                          return y(
                            makeError(
                              'fromtexteval',
                              'fromText eval for ' + t + ' failed: ' + i,
                              i,
                              [t],
                            ),
                          );
                        }
                        c && (useInteractive = !0),
                          this.depMaps.push(u),
                          r.completeLoad(s),
                          f([s], n);
                      })),
                      void i.load(e.name, f, n, a));
                }),
              ),
              r.enable(i, this),
              (this.pluginMaps[i.id] = i);
          },
          enable: function () {
            ((u[this.map.id] = this).enabled = !0),
              (this.enabling = !0),
              each(
                this.depMaps,
                bind(this, function (e, t) {
                  var i, o, a;
                  if ('string' == typeof e) {
                    if (
                      ((e = q(
                        e,
                        this.map.isDefine ? this.map : this.map.parentMap,
                        !1,
                        !this.skipMap,
                      )),
                      (this.depMaps[t] = e),
                      (a = getOwn(n, e.id)))
                    )
                      return void (this.depExports[t] = a(this));
                    (this.depCount += 1),
                      w(
                        e,
                        'defined',
                        bind(this, function (e) {
                          this.undefed || (this.defineDep(t, e), this.check());
                        }),
                      ),
                      this.errback
                        ? w(e, 'error', bind(this, this.errback))
                        : this.events.error &&
                          w(
                            e,
                            'error',
                            bind(this, function (e) {
                              this.emit('error', e);
                            }),
                          );
                  }
                  (i = e.id),
                    (o = s[i]),
                    hasProp(n, i) || !o || o.enabled || r.enable(e, this);
                }),
              ),
              eachProp(
                this.pluginMaps,
                bind(this, function (e) {
                  var t = getOwn(s, e.id);
                  t && !t.enabled && r.enable(e, this);
                }),
              ),
              (this.enabling = !1),
              this.check();
          },
          on: function (e, t) {
            var i = this.events[e];
            i || (i = this.events[e] = []), i.push(t);
          },
          emit: function (e, t) {
            each(this.events[e], function (e) {
              e(t);
            }),
              'error' === e && delete this.events[e];
          },
        }),
        ((r = {
          config: a,
          contextName: e,
          registry: s,
          defined: p,
          urlFetched: f,
          defQueue: d,
          defQueueMap: {},
          Module: i,
          makeModuleMap: q,
          nextTick: req.nextTick,
          onError: y,
          configure: function (e) {
            e.baseUrl &&
              '/' !== e.baseUrl.charAt(e.baseUrl.length - 1) &&
              (e.baseUrl += '/');
            var t = a.shim,
              i = { paths: !0, bundles: !0, config: !0, map: !0 };
            eachProp(e, function (e, t) {
              i[t] ? (a[t] || (a[t] = {}), mixin(a[t], e, !0, !0)) : (a[t] = e);
            }),
              e.bundles &&
                eachProp(e.bundles, function (e, t) {
                  each(e, function (e) {
                    e !== t && (l[e] = t);
                  });
                }),
              e.shim &&
                (eachProp(e.shim, function (e, i) {
                  isArray(e) && (e = { deps: e }),
                    (!e.exports && !e.init) ||
                      e.exportsFn ||
                      (e.exportsFn = r.makeShimExports(e)),
                    (t[i] = e);
                }),
                (a.shim = t)),
              e.packages &&
                each(e.packages, function (e) {
                  var t;
                  (t = (e = 'string' == typeof e ? { name: e } : e).name),
                    e.location && (a.paths[t] = e.location),
                    (a.pkgs[t] =
                      e.name +
                      '/' +
                      (e.main || 'main')
                        .replace(currDirRegExp, '')
                        .replace(jsSuffixRegExp, ''));
                }),
              eachProp(s, function (e, t) {
                e.inited || e.map.unnormalized || (e.map = q(t, null, !0));
              }),
              (e.deps || e.callback) && r.require(e.deps || [], e.callback);
          },
          makeShimExports: function (e) {
            return function () {
              var t;
              return (
                e.init && (t = e.init.apply(global, arguments)),
                t || (e.exports && getGlobal(e.exports))
              );
            };
          },
          makeRequire: function (t, i) {
            function o(a, u, c) {
              var d, f;
              return (
                i.enableBuildCallback &&
                  u &&
                  isFunction(u) &&
                  (u.__requireJsBuild = !0),
                'string' == typeof a
                  ? isFunction(u)
                    ? y(makeError('requireargs', 'Invalid require call'), c)
                    : t && hasProp(n, a)
                    ? n[a](s[t.id])
                    : req.get
                    ? req.get(r, a, t, o)
                    : ((d = q(a, t, !1, !0).id),
                      hasProp(p, d)
                        ? p[d]
                        : y(
                            makeError(
                              'notloaded',
                              'Module name "' +
                                d +
                                '" has not been loaded yet for context: ' +
                                e +
                                (t ? '' : '. Use require([])'),
                            ),
                          ))
                  : (R(),
                    r.nextTick(function () {
                      R(),
                        ((f = E(q(null, t))).skipMap = i.skipMap),
                        f.init(a, u, c, { enabled: !0 }),
                        M();
                    }),
                    o)
              );
            }
            return (
              (i = i || {}),
              mixin(o, {
                isBrowser,
                toUrl: function (e) {
                  var i,
                    n = e.lastIndexOf('.'),
                    o = e.split('/')[0];
                  return (
                    -1 !== n &&
                      (!('.' === o || '..' === o) || 1 < n) &&
                      ((i = e.substring(n, e.length)), (e = e.substring(0, n))),
                    r.nameToUrl(g(e, t && t.id, !0), i, !0)
                  );
                },
                defined: function (e) {
                  return hasProp(p, q(e, t, !1, !0).id);
                },
                specified: function (e) {
                  return (
                    (e = q(e, t, !1, !0).id), hasProp(p, e) || hasProp(s, e)
                  );
                },
              }),
              t ||
                (o.undef = function (e) {
                  S();
                  var i = q(e, t, !0),
                    n = getOwn(s, e);
                  (n.undefed = !0),
                    v(e),
                    delete p[e],
                    delete f[i.url],
                    delete c[e],
                    eachReverse(d, function (t, i) {
                      t[0] === e && d.splice(i, 1);
                    }),
                    delete r.defQueueMap[e],
                    n && (n.events.defined && (c[e] = n.events), k(e));
                }),
              o
            );
          },
          enable: function (e) {
            getOwn(s, e.id) && E(e).enable();
          },
          completeLoad: function (e) {
            var t,
              i,
              n,
              o = getOwn(a.shim, e) || {},
              u = o.exports;
            for (S(); d.length; ) {
              if (null === (i = d.shift())[0]) {
                if (((i[0] = e), t)) break;
                t = !0;
              } else i[0] === e && (t = !0);
              O(i);
            }
            if (
              ((r.defQueueMap = {}),
              (n = getOwn(s, e)),
              !t && !hasProp(p, e) && n && !n.inited)
            ) {
              if (!(!a.enforceDefine || (u && getGlobal(u))))
                return x(e)
                  ? void 0
                  : y(
                      makeError('nodefine', 'No define call for ' + e, null, [
                        e,
                      ]),
                    );
              O([e, o.deps || [], o.exportsFn]);
            }
            M();
          },
          nameToUrl: function (e, t, i) {
            var n,
              o,
              s,
              u,
              c,
              d,
              p = getOwn(a.pkgs, e);
            if ((p && (e = p), (d = getOwn(l, e)))) return r.nameToUrl(d, t, i);
            if (req.jsExtRegExp.test(e)) u = e + (t || '');
            else {
              for (n = a.paths, s = (o = e.split('/')).length; 0 < s; s -= 1)
                if ((c = getOwn(n, o.slice(0, s).join('/')))) {
                  isArray(c) && (c = c[0]), o.splice(0, s, c);
                  break;
                }
              (u = o.join('/')),
                (u =
                  ('/' ===
                    (u += t || (/^data\:|\?/.test(u) || i ? '' : '.js')).charAt(
                      0,
                    ) || u.match(/^[\w\+\.\-]+:/)
                    ? ''
                    : a.baseUrl) + u);
            }
            return a.urlArgs
              ? u + (-1 === u.indexOf('?') ? '?' : '&') + a.urlArgs
              : u;
          },
          load: function (e, t) {
            req.load(r, e, t);
          },
          execCb: function (e, t, i, r) {
            return t.apply(r, i);
          },
          onScriptLoad: function (e) {
            if (
              'load' === e.type ||
              readyRegExp.test((e.currentTarget || e.srcElement).readyState)
            ) {
              interactiveScript = null;
              var t = P(e);
              r.completeLoad(t.id);
            }
          },
          onScriptError: function (e) {
            var t = P(e);
            if (!x(t.id))
              return y(
                makeError('scripterror', 'Script error for: ' + t.id, e, [
                  t.id,
                ]),
              );
          },
        }).require = r.makeRequire()),
        r
      );
    }
    function getInteractiveScript() {
      return (
        (interactiveScript && 'interactive' === interactiveScript.readyState) ||
          eachReverse(scripts(), function (e) {
            if ('interactive' === e.readyState) return (interactiveScript = e);
          }),
        interactiveScript
      );
    }
  })(this);
