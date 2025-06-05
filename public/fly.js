function initEvent(map) {
  map.myFlyTo = function (
    targetCenter, // 目标中心
    targetZoom, // 放大层级
    options,
    callback,
    offset = {},
  ) {
    options = options || {};
    targetCenter = targetCenter.clone();

    const { x, y } = offset;
    if (!isNaN(x)) {
      targetCenter.lng -= x;
    }
    if (!isNaN(y)) {
      targetCenter.lat -= y;
    }

    if (options.animate === false || !L.Browser.any3d) {
      return map.setView(targetCenter, targetZoom, options);
    }

    map._stop();

    var from = map.project(map.getCenter()),
      to = map.project(targetCenter),
      size = map.getSize(),
      startZoom = map._zoom;

    targetCenter = toLatLng(targetCenter);
    targetZoom = targetZoom === undefined ? startZoom : targetZoom;

    var w0 = Math.max(size.x, size.y),
      w1 = w0 * map.getZoomScale(startZoom, targetZoom),
      u1 = to.distanceTo(from) || 1,
      rho = 1.42,
      rho2 = rho * rho;

    function r(i) {
      var s1 = i ? -1 : 1,
        s2 = i ? w1 : w0,
        t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1,
        b1 = 2 * s2 * rho2 * u1,
        b = t1 / b1,
        sq = Math.sqrt(b * b + 1) - b;

      // workaround for floating point precision bug when sq = 0, log = -Infinite,
      // thus triggering an infinite loop in flyTo
      var log = sq < 0.000000001 ? -18 : Math.log(sq);

      return log;
    }

    function sinh(n) {
      return (Math.exp(n) - Math.exp(-n)) / 2;
    }
    function cosh(n) {
      return (Math.exp(n) + Math.exp(-n)) / 2;
    }
    function tanh(n) {
      return sinh(n) / cosh(n);
    }

    var r0 = r(0);

    function w(s) {
      return w0 * (cosh(r0) / cosh(r0 + rho * s));
    }
    function u(s) {
      return (w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0))) / rho2;
    }

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 1.5);
    }

    var start = Date.now(),
      S = (r(1) - r0) / rho,
      //duration = options.duration ? 1000 * options.duration : 1000 * S * 0.8;
      duration = options.duration ? 1000 * options.duration : 1000 * S;

    if (map.zoomRate) {
      duration = duration * map.zoomRate;
    }

    function frame() {
      var t = (Date.now() - start) / duration,
        s = easeOut(t) * S;

      if (t <= 1) {
        map._flyToFrame = L.Util.requestAnimFrame(frame, map);
        map._move(
          map.unproject(
            from.add(to.subtract(from).multiplyBy(u(s) / u1)),
            startZoom,
          ),
          map.getScaleZoom(w0 / w(s), startZoom),
          { flyTo: true },
        );
      } else {
        map._move(targetCenter, targetZoom)._moveEnd(true);

        if (callback) {
          callback();
        }
      }
    }

    map._moveStart(true, options.noMoveStart);

    frame.call(map);
    return map;
  };

  map.myFlyToBounds = function (bounds, options, callback) {
    let target = map._getBoundsCenterZoom(bounds, options);

    return map.myFlyTo(target.center, target.zoom, options, callback);
  };

  map.addMarkers = function (datas) {
    datas.forEach((item) => {
      const { id, coord, name, type } = item;

      let iconHtml = '';
      if (map.createIcon) {
        iconHtml = map.createIcon(name, id, type);
      }
      const icon = L.divIcon({
        html: iconHtml,
        iconAnchor: [25, 70],
      });
      const layer = L.marker(coord, { icon: icon });
      map.markers.addLayer(layer);

      layer.bsm = id;
      layer.on('click', function (e) {
        console.log(e.target);
        /* let aa=L.latLng(200, 300);
                    console.log(aa); */

        if (map.markerClickCallBack) {
          map.markerClickCallBack(e);
        } else {
          let popopHtml = '';
          if (map.createPopop) {
            popopHtml = map.createPopop(e.target.bsm);
          }
          map.myFlyTo(
            e.latlng,
            17,
            {},
            function () {
              L.popup({
                offset: [0, -60],
              })
                .setLatLng(e.latlng)
                .setContent(popopHtml)
                .openOn(map);
            },
            map.zoomOffset,
          );
        }
      });
    });
  };

  map.zoomToData = function (id) {
    map.closePopup();

    let marker;
    map.eachLayer(function (layer) {
      if (layer.bsm === id) {
        marker = layer;
      }
    });
    if (marker) {
      map.myFlyTo(
        marker.getLatLng(),
        17,
        {},
        function () {
          let popopHtml = '';
          if (map.createPopop) {
            popopHtml = map.createPopop(marker.bsm);
          }

          L.popup({
            offset: [0, -60],
          })
            .setLatLng(marker.getLatLng())
            .setContent(popopHtml)
            .openOn(map);
        },
        map.zoomOffset,
      );

      /* map.myFlyToBounds(map.cityBounds, {}, function () {
                        map.myFlyTo(marker.getLatLng(), 17, {}, function () {
                            let popopHtml = '';
                            if (map.createPopop) {
                                popopHtml = map.createPopop(marker.bsm);
                            }
    
                            L.popup({
                                offset: [0, -60]
                            }).setLatLng(marker.getLatLng()).setContent(popopHtml).openOn(map);
                        }, map.zoomOffset);
                    }); */
    }
  };
}
