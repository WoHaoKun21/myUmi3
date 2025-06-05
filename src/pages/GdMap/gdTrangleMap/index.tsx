import { useEffect } from 'react';

interface IBdMapProps {}

let map: any;
let polyEditor: any;

const BdMap: React.FC<IBdMapProps> = () => {
  const initMap = () => {
    map = new AMap.Map('container', {
      center: [116.400274, 39.905812],
      zoom: 14,
    });
    const mouseTool = new AMap.MouseTool(map);
    mouseTool.on('draw', function (event) {
      event.obj.getPath().map((i: any) => [i.lng, i.lat]);
      mouseTool.close();
    });
    mouseTool.polygon({
      strokeColor: '#FF33FF',
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillOpacity: 0.4,
      fillColor: '#1791fc',
      zIndex: 50,
    });
  };

  const initMap2 = () => {
    map = new AMap.Map('container', {
      center: [116.400274, 39.905812],
      zoom: 14,
    });
    const path = [
      [116.403322, 39.920255],
      [116.410703, 39.897555],
      [116.402292, 39.892353],
      [116.389846, 39.891365],
    ];
    const polygon = new AMap.Polygon({
      path,
      strokeColor: '#ff0000',
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillOpacity: 0.4,
      fillColor: '#1791fc',
      zIndex: 50,
    });
    map.add(polygon);
    // 缩放地图到合适的视野级别
    map.setFitView([polygon]);
    polyEditor = new AMap.PolyEditor(map, polygon);
    polyEditor.on('addnode', function (event: any) {
      console.log('添加节点：', event);
    });
    polyEditor.on('adjust', function (event: any) {
      console.log('移动节点：', event);
    });
    polyEditor.on('removenode', function (event: any) {
      console.log('移除节点：', event);
    });
    polyEditor.on('end', function (event: any) {
      console.log('绘制结束：', event.target, polygon.getPath());
    });
    polyEditor.open(); // 打开编辑功能
    // polyEditor.close(); // 关闭编辑功能
  };

  useEffect(() => {
    initMap2();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div
        id="container"
        style={{
          width: 1000,
          height: 800,
          border: '1px solid #f00',
          margin: '10px auto',
        }}
      />
      <div className="input-card" style={{ width: 120 }}>
        <button
          className="btn"
          onClick={() => {
            polyEditor.open();
          }}
        >
          开始编辑
        </button>
        <button
          className="btn"
          onClick={() => {
            polyEditor.close();
          }}
        >
          结束编辑
        </button>
      </div>
    </div>
  );
};

export default BdMap;
