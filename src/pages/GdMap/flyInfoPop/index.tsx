/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-loop-func */
import { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import IMG1 from '../../../../public/img1.png';

let map: any;

const BdMap: React.FC = () => {
  const initMap = () => {
    const district = new AMap.DistrictSearch({
      subdistrict: 0,
      extensions: 'all',
      level: 'city',
    });
    district.search('丽水市', function (status: any, result: any) {
      const bounds = result.districtList[0].boundaries;
      const mask = [];
      for (let i = 0; i < bounds.length; i += 1) {
        mask.push([bounds[i]]);
      }
      map = new AMap.Map('container', {
        mask: mask,
        center: [119.569458, 28.111077],
        disableSocket: true,
        viewMode: '3D',
        showLabel: true,
        labelzIndex: 130,
        pitch: 40,
        zoom: 9,
        resizeEnable: true,
        mapStyle: 'amap://styles/blue',
        layers: [
          new AMap.TileLayer.RoadNet({}),
          new AMap.TileLayer.Satellite(),
        ],
      });
      //添加高度面
      const object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
      map.add(object3Dlayer);
      //rgbalet
      const wall = new AMap.Object3D.Wall({
        path: bounds,
        height: -30000,
        color: '#0088ff90',
      });
      wall.transparent = 'both';
      object3Dlayer.add(wall);
      //添加描边
      for (let i = 0; i < bounds.length; i += 1) {
        new AMap.Polyline({
          path: bounds[i],
          strokeColor: '#99ffff',
          strokeWeight: 4,
          map: map,
        });
      }
      const lnglats = [
        [119.922293, 28.451103],
        [120.291939, 28.135247],
        [120.078965, 28.654208],
        [119.27589, 28.5924],
        [119.485292, 28.449937],
        [119.569458, 28.111077],
        [119.067233, 27.618231],
        [119.634669, 27.977247],
        [119.132319, 28.069177],
      ];
      for (let i = 0; i < lnglats.length; i++) {
        // 生成标注图标
        const startIcon = new AMap.Icon({
          image: IMG1,
          size: new AMap.Size(32, 55), // 图片的宽高
          imageSize: new AMap.Size(32, 55), // 图标所用图片大小
          // imageOffset: new AMap.Pixel(-9, -3)// 图标偏移量
        });
        // 生成标注
        const marker: any = new AMap.Marker({
          position: lnglats[i],
          // position: new AMap.LngLat(lnglats[i][0], lnglats[i][1]),
          icon: startIcon,
          offset: new AMap.Pixel(-15, -25),
          map: map,
        });
        // 生成弹框内容
        marker.content = ReactDOMServer.renderToString(
          <div
            id={`pop-${i}`}
            style={{ width: 800, height: 600, border: '1px solid #f00' }}
          >
            弹框内容：{i}
          </div>,
        );
        //注释后打开地图时默认关闭信息窗体
        marker.on('click', newMap);
        AMap.event.addListener(marker, 'click', function (e: any) {
          const infoWindow: any = new AMap.InfoWindow({
            // content: '我是标注内容',
            offset: new AMap.Pixel(0, -30),
          });
          infoWindow.open(map, marker.getPosition());
          infoWindow.setContent(e.target.content);
        });
      }
    });
  };

  //鼠标点击事件,设置地图中心点及放大显示级别
  function newMap(e: any) {
    const position = e.target.getPosition();
    map.setZoomAndCenter(15, [position.lng, position.lat]); // 放大并设置中心位置
    const infoWindow: any = new AMap.InfoWindow({
      offset: new AMap.Pixel(0, -30),
      size: new AMap.Size(800, 600),
    }); // 创建信息框
    infoWindow.open(map, [position.lng, position.lat]);
    infoWindow.setContent(e.target.content);
  }

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div
        id="container"
        style={{
          width: '100%',
          height: '94vh',
        }}
      />
    </div>
  );
};

export default BdMap;
