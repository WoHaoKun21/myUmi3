import { getMapData } from '@/services';
import React, { useEffect } from 'react';
let map: any;
const MapShape: React.FC = () => {
  const initMap = async () => {
    if (document.getElementById('leaf_map')) {
      document.getElementById('leaf_map')!.innerHTML = '';
      map = undefined;
    }
    // 初始化天地图
    map = L.map('leaf_map', {
      center: [29.516916, 106.522858],
      zoom: 16,
      crs: L.CRS.EPSG4326,
    });

    // 天地图影像图
    L.tileLayer(
      `http://t{s}.tianditu.com/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=e0f2f9897bc755f61438b03804066a32`,
      {
        maxZoom: 17,
        tileSize: 256,
        zoomOffset: 1,
        minZoom: 3,
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      },
    ).addTo(map);
    // 天地图影像注记
    L.tileLayer(
      `http://t{s}.tianditu.com/cia_c/wmts?layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=e0f2f9897bc755f61438b03804066a32`,
      {
        maxZoom: 17,
        tileSize: 256,
        zoomOffset: 1,
        zIndex: 5,
        minZoom: 3,
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      },
    ).addTo(map);

    // https://106.12.220.248:39562/down/kLLqeP92qTsX.dbf
    // https://106.12.220.248:39562/down/M0MU29Gg8oP2.prj
    // https://106.12.220.248:39562/down/sBVc2W63JVT3.sbn
    // https://106.12.220.248:39562/down/bsysor85wLUI.sbx
    // https://106.12.220.248:39562/down/Zb5hVbUncx9R.shp
    // https://106.12.220.248:39562/down/QJDLNQhIrKFV.xml
    // https://106.12.220.248:39562/down/CMl3ovyuYXSI.shx

    const res = await getMapData('X1stgRvmXNrY.zip');
    console.log('压缩数据：', res);

    shp(res)
      .then((geojson: any) => {
        console.log('GeoJSON 加载成功:', geojson);
        const layer = L.geoJSON(geojson, {
          style: { color: 'red', weight: 1 },
        }).addTo(map);
        map.fitBounds(layer.getBounds());
      })
      .catch((err: any) => {
        console.error('加载 shapefile 出错:', err);
        alert('加载 shapefile 出错，请查看控制台');
      });

    shapefile
      .open('https://106.12.220.248:39562/down/X1stgRvmXNrY.zip')
      .then((source: any) =>
        source.read().then(function log(result: any) {
          if (result.done) return;
          console.log(result.value);
          return source.read().then(log);
        }),
      )
      .catch((error: any) => console.error(error.stack));
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div>
      <div
        id="leaf_map"
        style={{
          width: '100%',
          height: 800,
          margin: '0 auto',
          border: '1px solid #f00',
        }}
      />
    </div>
  );
};

export default MapShape;
