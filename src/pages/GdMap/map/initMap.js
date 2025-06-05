var opts = {
  subdistrict: 0,
  extensions: 'all',
  level: 'city',
};
//利用行政区查询获取边界构建mask路径
//也可以直接通过经纬度构建mask路径
var district = new AMap.DistrictSearch(opts);
district.search('丽水市', function (status, result) {
  var bounds = result.districtList[0].boundaries;
  var mask = [];
  for (var i = 0; i < bounds.length; i += 1) {
    mask.push([bounds[i]]);
  }
  var map = new AMap.Map('container', {
    mask: mask,
    center: [119.569458, 28.111077],
    viewMode: '3D',
    showLabel: true,
    labelzIndex: 130,
    pitch: 50,
    zoom: 9,
    layers: [
      new AMap.TileLayer.RoadNet({
        //rejectMapMask:true
      }),
      new AMap.TileLayer.Satellite(),
    ],
  });
  //添加描边
  for (var i = 0; i < bounds.length; i += 1) {
    new AMap.Polyline({
      path: bounds[i],
      strokeWeight: 8,
      map: map,
    });
  }
  new AMap.Polygon({
    path: bounds,
    strokeColor: '#f00',
    strokeWeight: 6,
    strokeOpacity: 0.2,
    fillOpacity: 0.4,
    fillColor: '#f00',
    zIndex: 50,
    bubble: true,
  });
});
