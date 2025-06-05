import React, { useEffect } from 'react';

let map: any;

const LeafTD: React.FC = () => {
  const initMap = () => {
    if (document.getElementById('leaf_map')) {
      document.getElementById('leaf_map')!.innerHTML = '';
      map = undefined;
    }
    map = L.map('leaf_map', {
      //参考坐标系
      crs: L.CRS.EPSG3857,
      //不添加属性说明控件
      attributionControl: false,
      //显示中心
      center: [40, 116.3],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 12,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
    });
    //添加天地图矢量图层
    const vectorMap = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=e0f2f9897bc755f61438b03804066a32',
      /*天地图密钥*/ {
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180],
        ],
      },
    );
    //添加天地图矢量注记
    const vectorAnnotion = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=e0f2f9897bc755f61438b03804066a32',
      /*天地图密钥*/ {
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180],
        ],
      },
    );
    //添加天地图影像图层
    const imageMap = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=e0f2f9897bc755f61438b03804066a32',
      /*天地图密钥*/ {
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180],
        ],
      },
    );
    //添加天地图影像注记
    const imageAnnotion = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=e0f2f9897bc755f61438b03804066a32',
      /*天地图密钥*/ {
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180],
        ],
      },
    );
    //设置图层组
    const vector = L.layerGroup([vectorMap, vectorAnnotion]);
    const image = L.layerGroup([imageMap, imageAnnotion]);
    const baseLayers = {
      矢量: vector,
      影像: image,
    };
    //初始时加载矢量图层组
    map.addLayer(vector);
    //添加图层组控件
    L.control.layers(baseLayers).addTo(map);
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
export default LeafTD;
