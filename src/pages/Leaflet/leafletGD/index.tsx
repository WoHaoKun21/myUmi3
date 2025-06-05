// import React, { useEffect } from 'react';

// let map: any;

// const LeafGD: React.FC = () => {
//   const initMap = () => {
//     if (document.getElementById('leaf_map')) {
//       document.getElementById('leaf_map')!.innerHTML = '';
//       map = undefined;
//     }

//     //地图容器
//     map = L.map('leaf_map', {
//       //参考坐标系
//       crs: L.CRS.EPSG3857,
//       //不添加属性说明控件
//       attributionControl: false,
//       //显示中心
//       center: [40, 116.3],
//       //最小显示等级
//       minZoom: 3,
//       //最大显示等级
//       maxZoom: 17,
//       //当前显示等级
//       zoom: 12,
//       //限制显示地理范围
//       maxBounds: [
//         [-90, -180],
//         [90, 180],
//       ],
//     });

//     const baseLayers = {
//       高德地图: L.tileLayer(
//         'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
//         { subdomains: '1234' },
//       ).addTo(map),
//       高德影像: L.layerGroup([
//         L.tileLayer(
//           'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
//           { subdomains: '1234' },
//         ),
//         L.tileLayer(
//           'http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
//           { subdomains: '1234' },
//         ),
//       ]),
//       // //天地图tk可以换成自己申请的key
//       // "天地图": L.layerGroup([
//       //     L.tileLayer('http://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
//       //     L.tileLayer('http://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] })
//       // ]),
//       // "天地图影像": L.layerGroup([
//       //     L.tileLayer('http://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
//       //     L.tileLayer('http://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] })
//       // ]),
//       // "天地图地形": L.layerGroup([
//       //     L.tileLayer('http://t{s}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
//       //     L.tileLayer('http://t{s}.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=56b81006f361f6406d0e940d2f89a39c', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] })
//       // ]),

//       // "Google地图": L.tileLayer('http://mt1.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile'),
//       // "Google影像": L.layerGroup([
//       //     L.tileLayer('http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&s=Gali'),
//       //     L.tileLayer('http://mt1.google.cn/vt/imgtp=png32&lyrs=h@207000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil')
//       // ]),

//       // "GeoQ ": L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}'),
//       // "GeoQ 藏蓝": L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'),
//       // "GeoQ 灰": L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}')
//     };

//     L.control.layers(baseLayers, {}, { position: 'topright' }).addTo(map);
//   };

//   useEffect(() => {
//     initMap();
//   }, []);

//   return (
//     <div>
//       <div
//         id="leaf_map"
//         style={{
//           width: 800,
//           height: 600,
//           margin: '0 auto',
//           border: '1px solid #f00',
//         }}
//       />
//     </div>
//   );
// };
// export default LeafGD;

import React, { useEffect } from 'react';

let map: any;
const LeafGD: React.FC = () => {
  const initMap = () => {
    if (document.getElementById('leaf_map')) {
      document.getElementById('leaf_map')!.innerHTML = '';
      map = undefined;
    }

    // 高德地图矢量图
    const overlaysVec = {
      高德地图: L.tileLayer(
        'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        {
          maxZoom: 17,
          tileSize: 256,
          minZoom: 3,
          subdomains: '1234',
        },
      ),
    };

    // 高德地图影像图
    const overlaysImg = {
      高德地图影像: L.tileLayer(
        'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        {
          maxZoom: 17,
          tileSize: 256,
          minZoom: 3,
          subdomains: '1234',
        },
      ),
      高德地图影像标注: L.tileLayer(
        'http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
        {
          maxZoom: 17,
          tileSize: 256,
          minZoom: 3,
          subdomains: '1234',
        },
      ),
    };

    const vecLayerCtrl = L.control.layers(null, overlaysVec);
    vecLayerCtrl._layers.forEach((layer: any) => {
      layer.type = 'baseLayer';
    });
    const imgLayerCtrl = L.control.layers(null, overlaysImg);
    imgLayerCtrl._layers.forEach((layer: any) => {
      layer.type = 'baseLayer';
    });

    //地图容器
    map = L.map('leaf_map', {
      //参考坐标系
      crs: L.CRS.EPSG3857,
      layers: Object.values(overlaysImg), // 默认为影像图层
      //不添加属性说明控件
      attributionControl: false,
      //显示中心
      center: [40, 116.3],
      //最小显示等级
      minZoom: 3,
      //最大显示等级
      maxZoom: 17,
      //当前显示等级
      zoom: 12,
      doubleClickZoom: true, //双击放大
      inertia: true, //平移惯性
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
    });
    map._onResize(); //重点,否则地图显示不全
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div>
      <div
        id="leaf_map"
        style={{
          width: 800,
          height: 600,
          margin: '0 auto',
          border: '1px solid #f00',
        }}
      />
    </div>
  );
};
export default LeafGD;
