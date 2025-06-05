import React, { useEffect } from 'react';

let map: any;

const LeafBD: React.FC = () => {
  const initMap = () => {
    if (document.getElementById('leaf_map')) {
      document.getElementById('leaf_map')!.innerHTML = '';
      map = undefined;
    }
    //定义 Baidu 地图类型变量（矢量地图）
    const BaiduMap = L.tileLayer(
      'http://api.map.baidu.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=1&udt=20170314',
      {
        maxZoom: 18,
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        attribution: '百度地图',
      },
    );

    //定义 Baidu 地图类型变量（卫星地图）
    const BaiduSatellite = L.tileLayer(
      'http://shangetu' +
        Math.random() * 10 +
        '.map.bdimg.com/it/u=x={x}&y={y}&z={z}&v=3&t=satellite',
      {
        maxZoom: 18,
        subdomains: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        attribution: '百度地图',
      },
    );

    //定义 Leaflet 地图对象
    map = L.map('leaf_map', {
      center: [22.546798, 114.065154],
      zoom: 14,
      layers: [BaiduMap], //默认底图为矢量地图
    });

    //为切换控件添加底图选项
    const baseMaps = {
      矢量地图: BaiduMap,
      卫星地图: BaiduSatellite,
    };

    //添加切换控件
    L.control.layers(baseMaps).addTo(map);

    var Marker = L.marker([22.546798, 114.065154], {
      //添加图标
      // icon: icon,
      //是否允许鼠标拖动
      draggable: true,
      //添加悬浮名称
      title: '标注',
    }).addTo(map);
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
export default LeafBD;
