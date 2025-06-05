define(['./when-8d13db60', './createTaskProcessorWorker'], function (e, t) {
  function r(e) {
    return null != e;
  }
  function n(e) {
    var t;
    (this.name = 'DeveloperError'), (this.message = e);
    try {
      throw new Error();
    } catch (e) {
      t = e.stack;
    }
    this.stack = t;
  }
  r(Object.create) &&
    ((n.prototype = Object.create(Error.prototype)).constructor = n),
    (n.prototype.toString = function () {
      var e = this.name + ': ' + this.message;
      return r(this.stack) && (e += '\n' + this.stack.toString()), e;
    }),
    (n.throwInstantiationError = function () {
      throw new n(
        'This function defines an interface and should not be called directly.',
      );
    });
  function c(t) {
    if (!r(t.name)) throw new n('options.name is required.');
    var c = e.when.defer();
    this.dbname = t.name;
    var o = indexedDB.open(this.dbname),
      a = this;
    return (
      (o.onsuccess = function (e) {
        (a.db = e.target.result),
          (a.version = a.db.version),
          r(a.cachestatus) || (a.cachestatus = {}),
          c.resolve(a);
      }),
      (o.onupgradeneeded = function (e) {
        (a.db = e.target.result), (a.version = a.db.version), c.resolve(a);
      }),
      (o.onerror = function (e) {
        (a.db = null),
          c.reject('create database fail, error code : ' + e.target.errorcode);
      }),
      (this.layer = t.layer || null),
      (this.storageType = t.storageType || 'arrayBuffer'),
      (this.creatingTable = !1),
      (this.cachestatus = {}),
      c.promise
    );
  }
  (c.prototype.checkObjectStoreExit = function (e) {
    return !!r(this.db) && this.db.objectStoreNames.contains(e);
  }),
    (c.prototype.createObjectStore = function (t) {
      var n = e.when.defer();
      if (this.creatingTable) n.reject(!1);
      else {
        if (this.db.objectStoreNames.contains(t))
          return n.reject(!1), n.promise;
        this.creatingTable = !0;
        var c = this,
          o = parseInt(c.db.version);
        c.db.close();
        var a = indexedDB.open(c.dbname, o + 1);
        (a.onupgradeneeded = function (e) {
          var o = e.target.result,
            a = (c.db = o).createObjectStore(t, { keyPath: 'id' });
          r(a)
            ? (a.createIndex('value', 'value', { unique: !1 }),
              (c.creatingTable = !1),
              r(c.cachestatus) || (c.cachestatus = {}),
              (c.cachestatus[t] = {}),
              c.db.close(),
              (indexedDB.open(c.dbname).onsuccess = function (e) {
                var t = e.target.result;
                (c.db = t), n.resolve(!0);
              }))
            : ((c.creatingTable = !1), n.reject(!1));
        }),
          (a.onsuccess = function (e) {
            e.target.result.close(), n.resolve(!0);
          }),
          (a.onerror = function (e) {
            (c.creatingTable = !1), n.reject(!1);
          });
      }
      return n.promise;
    }),
    (c.prototype.putElementInDB = function (t, n, c, o) {
      var a,
        s = e.when.defer();
      if (!r(this.db)) return s.reject(!1), s.promise;
      var i = this;
      if (
        r(i.cachestatus[t]) &&
        !r(o) &&
        r(i.cachestatus[t][n]) &&
        (1 === i.cachestatus[t][n] || 2 === i.cachestatus[t][n])
      )
        return s.resolve(!1), s.promise;
      if (this.db.objectStoreNames.contains(t)) {
        var u;
        r(i.cachestatus[t]) || (i.cachestatus[t] = {});
        try {
          u = this.db.transaction([t], 'readwrite');
        } catch (u) {
          return s.reject(null), s.promise;
        }
        if (((a = u.objectStore(t)), r(o)))
          if (o instanceof Array) {
            for (var l = 0, h = o.length; l < h; l++)
              2 !== i.cachestatus[t][o[l].key] &&
                (a.add({ id: o[l].key, value: o[l].value }),
                (i.cachestatus[t][o[l].key] = 2));
            s.resolve(!0);
          } else {
            for (var n in o) isNaN(1 * n) || a.add({ id: n, value: o[n] });
            s.resolve(!0);
          }
        else {
          if (!r(n) || !r(c)) return;
          if (n instanceof Array && c instanceof Array) {
            for (l = 0, h = n.length; l < h; l++)
              2 !== i.cachestatus[t][n[l]] &&
                (a.add({ id: n[l], value: c[l] }),
                (i.cachestatus[t][n[l]] = 2));
            (u.oncomplete = function (e) {
              s.resolve(!0);
            }),
              (u.onerror = function (e) {
                s.reject(!1);
              });
          } else {
            var d = a.add({ id: n, value: c });
            (i.cachestatus[t][n] = 1),
              (d.onsuccess = function (e) {
                (i.cachestatus[t][n] = 2), s.resolve(!0);
              }),
              (d.onerror = function (e) {
                (i.cachestatus[t][n] = 3), s.reject(!1);
              });
          }
        }
      } else
        this.createObjectStore(t).then(
          function (e) {
            var u = i.db.transaction([t], 'readwrite');
            if (((a = u.objectStore(t)), r(o))) {
              for (var l = 0, h = o.length; l < h; l++)
                a.add({ id: o[l].key, value: o[l].value });
              s.resolve(!0);
            } else {
              var d = a.add({ id: n, value: c });
              (d.onsuccess = function (e) {
                s.resolve(!0);
              }),
                (d.onerror = function (e) {
                  s.reject(!1);
                });
            }
          },
          function (e) {
            s.reject(!1);
          },
        );
      return s.promise;
    }),
    (c.prototype.getRangeFromDB = function (t, n) {
      var c,
        o,
        a = e.when.defer();
      if (!r(this.db)) return null;
      if (!this.db.objectStoreNames.contains(t)) return null;
      try {
        c = this.db.transaction([t]);
      } catch (t) {
        return a.reject(null), a.promise;
      }
      try {
        o = c.objectStore(t);
      } catch (t) {
        a.reject(null);
      }
      var s = o.openCursor(IDBKeyRange.bound(n[0], n[1])),
        i = [];
      return (
        (s.onsuccess = function (e) {
          var t = e.target.result;
          r(t) ? (i.push(t.value), t.continue()) : a.resolve(i);
        }),
        (s.onerror = function (e) {
          a.reject(null);
        }),
        a.promise
      );
    }),
    (c.prototype.getElementFromDB = function (t, n) {
      var c,
        o,
        a = e.when.defer();
      if (!r(this.db)) return null;
      if (!this.db.objectStoreNames.contains(t)) return null;
      try {
        c = this.db.transaction([t]);
      } catch (t) {
        return a.reject(null), a.promise;
      }
      try {
        o = c.objectStore(t);
      } catch (t) {
        a.reject(null);
      }
      var s = o.get(n);
      return (
        (s.onsuccess = function (e) {
          r(e.target.result)
            ? a.resolve(e.target.result.value)
            : a.reject(null);
        }),
        (s.onerror = function (e) {
          a.reject(null);
        }),
        a.promise
      );
    }),
    (c.prototype.getAllElementFromDB = function (t) {
      var n,
        c,
        o = e.when.defer();
      if (!r(this.db)) return null;
      if (!this.db.objectStoreNames.contains(t)) return null;
      if (null != this.transaction) n = this.transaction;
      else
        try {
          n = this.db.transaction([t]);
        } catch (t) {
          return o.reject(null), o.promise;
        }
      try {
        c = n.objectStore(t);
      } catch (t) {
        o.reject(null);
      }
      var a = c.getAll();
      return (
        (a.onsuccess = function (e) {
          r(e.target.result) ? o.resolve(e.target.result) : o.reject(null);
        }),
        (a.onerror = function (e) {
          o.reject(null);
        }),
        o.promise
      );
    }),
    (c.prototype.updateElementInDB = function (t, n, c, o) {
      var a = e.when.defer();
      if (!r(this.db)) return a.resolve(!1), a.promise;
      if (!this.db.objectStoreNames.contains(t))
        return a.resolve(!1), a.promise;
      var s,
        i = this.db.transaction([t], 'readwrite');
      try {
        s = i.objectStore(t);
      } catch (t) {
        a.resolve(!1);
      }
      var u = s.get(n);
      return (
        (u.onsuccess = function (e) {
          var t = e.target.result;
          r(t) || (t = { id: n }),
            (t.value = !0 === o ? Object.assign(t.value, c) : c);
          var i = s.put(t);
          (i.onsuccess = function (e) {
            a.resolve(!0);
          }),
            (i.onerror = function (e) {
              a.resolve(!1);
            });
        }),
        (u.onerror = function (e) {
          a.resolve(!1);
        }),
        a.promise
      );
    }),
    (c.prototype.removeElementFromDB = function (t, n) {
      var c = e.when.defer();
      if (!r(this.db)) return c.resolve(!1), c.promise;
      if (!this.db.objectStoreNames.contains(t))
        return c.resolve(!1), c.promise;
      var o,
        a = this.db.transaction([t], 'readwrite');
      try {
        o = a.objectStore(t);
      } catch (t) {
        c.resolve(!1);
      }
      var s = o.delete(n);
      return (
        (s.onerror = function (e) {
          c.resolve(!1);
        }),
        (s.onsuccess = function (e) {
          c.resolve(!0);
        }),
        c.promise
      );
    }),
    (c.prototype.clear = function (t) {
      var n = e.when.defer();
      if (!r(this.db)) return n.resolve(!1), n.promise;
      if (!this.db.objectStoreNames.contains(t))
        return n.resolve(!1), n.promise;
      var c,
        o = this.db.transaction([t], 'readwrite');
      try {
        c = o.objectStore(t);
      } catch (t) {
        n.resolve(!1);
      }
      var a = c.clear();
      return (
        (a.onerror = function (e) {
          n.resolve(!1);
        }),
        (a.onsuccess = function (e) {
          n.resolve(!0);
        }),
        n.promise
      );
    });
  var o = {};
  function a(e, t, r) {
    null === r.scheduler
      ? r.creatingDB ||
        ((r.creatingDB = !0),
        new c({ name: e }).then(function (e) {
          (r.creatingDB = !1),
            (r.scheduler = e).checkObjectStoreExit(t)
              ? (e.putElementInDB(t, null, null, r.cache), (r.cache = []))
              : r.creatingTable ||
                ((r.creatingTable = !0),
                e.createObjectStore(t).then(function () {
                  (r.creatingTable = !1),
                    e.putElementInDB(t, null, null, r.cache),
                    (r.cache = []);
                }));
        }))
      : r.scheduler.checkObjectStoreExit(t)
      ? (r.scheduler.putElementInDB(t, null, null, r.cache), (r.cache = []))
      : r.creatingTable ||
        ((r.creatingTable = !0),
        r.scheduler.createObjectStore(t).then(function () {
          (r.creatingTable = !1),
            r.scheduler.putElementInDB(t, null, null, r.cache),
            (r.cache = []);
        }));
  }
  return t(function (e, t) {
    var r = e.blob,
      n = e.key;
    if (void 0 !== r && void 0 !== n) {
      var c = e.tablename,
        s = e.dbname;
      void 0 === o[(h = s + c)] &&
        (o[h] = {
          cache: [],
          creatingDB: !1,
          scheduler: null,
          creatingTable: !1,
        });
      var i = 50;
      void 0 !== e.reserveCount && (i = e.reserveCount),
        o[h].cache.length < i && o[h].cache.push({ key: n, value: r });
    } else
      for (var u = e.nameArray, l = 0; l < u.length; l++) {
        var h;
        (c = u[l].tablename),
          (s = u[l].dbname),
          void 0 !== o[(h = s + c)] &&
            0 !== Object.keys(o[h].cache).length &&
            a(s, c, o[h]);
      }
  });
});
