import { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import QTJ2 from '../../../public/static/data/HZ.json';
import { Spin } from 'antd';
import styles from './index.less';
import ReactDOM from 'react-dom';

interface IBdMapProps {}

let map: any;
const stations = [
  {
    lat: 30.305957794189453,
    lng: 120.47985076904297,
    type: 1,
    id: 1,
    name: '美女坝',
  },
  {
    lat: 30.323810577392578,
    lng: 120.44002532958984,
    type: 2,
    id: 2,
    name: '老盐仓',
  },
  {
    lat: 30.271968841552734,
    lng: 120.39024353027344,
    type: 3,
    id: 3,
    name: '盐官站',
  },
  {
    lat: 30.184764862060547,
    lng: 120.32707214355469,
    type: 4,
    id: 4,
    name: '临江码头站',
  },
  {
    lat: 30.093097686767578,
    lng: 120.26081085205078,
    type: 5,
    id: 5,
    name: '大缺口站',
  },
];

const BdMap: React.FC<IBdMapProps> = () => {
  const initMap = () => {
    map = undefined;
    const container = document.getElementById('map'); // 地图挂载点
    if (container) {
      // 清除挂载点里面的内容，防止重复挂载
      container.innerHTML = '';
    }
    console.log(window.createMap);
    //初始化地图
    map = window.createMap(container, {
      maxBound: [
        [0, 40],
        [70, 160],
      ], //最大地图范围
      center: [29.768829345703125, 121.50604248046875], //地图中心点
      minZoom: 5, //最小缩放级别
      zoom: 9, //默认级别
      maskColor: '#FFFFFF00', //遮罩层颜色
      maskOpacity: 0, //遮罩层透明度
      cityColor: '#00FFFF00', //市级边界颜色
      cityOpacity: 0, //市级边界透明度
      cityWidth: 0, //市级边界宽度
      countyColor: '#FF00FF00', //县级边界颜色
      countyOpacity: 0, //县级边界透明度
      countyWidth: 0, //县级边界宽度
      zoomRate: 0.8, //缩放速率，默认1.0，设置为0.5时候，比默认快1倍
      createIcon: createIconHtml, //创建图标方法
      createPopop: createPopopHtml, //创建弹出框方法
      markerClickCallBack: null, //图标单击回调函数，设置该选项后，将不会执行默认单击逻辑
      zoomOffset: {
        y: -0.001, //定位偏移量y，单位度
        x: 0, //定位偏移量x，单位度
      },
    });
    const datas = stations
      ?.map((item: any) => {
        let obj: any = {};
        obj.id = item?.id;
        obj.type = item?.type;
        obj.name = item?.name;
        obj.coord = [item?.lat, item?.lng];
        return obj;
      })
      .filter(Boolean);
    map.addMarkers(datas); // 生成地图图标
  };

  useEffect(() => {
    initMap();
  }, []);

  // 创建icon图标-(站点名, 站点id)
  const createIconHtml = (name: any, id: any, type: any) => {
    console.log('站点数据：', name, id, type);
    return ReactDOMServer.renderToString(
      <div className="cstm-icon-panel">
        {/* <div className="cstm-icon-title">{name}</div> */}
        <div className="cstm-icon-img">
          {type === 0 ? (
            <img src="/address-01.png" />
          ) : type === 1 ? (
            <img src="/address-03.png" />
          ) : type === 2 ? (
            <img src="/address-04.png" />
          ) : type === 3 ? (
            <img src="/address-02.png" />
          ) : (
            <img src="/e_lo.png" />
          )}
        </div>
      </div>,
    );
  };

  function createPopopHtml(id: any) {
    const html = `<div><h1>测试弹出框</h1><h2>测试闸站${id}</h2><h3>其他</h3></div>`;

    return html;
  }

  // 地图区域绘制
  const drawStyle = (data: any) => {
    // 遮罩层样式
    var myStyle = {
      color: '#f00',
      weight: 2,
      opacity: 1,
      fillColor: '#f00',
      fillOpacity: 10,
    };
    let pArray: any = [];
    let pNW = { lat: 59.0, lng: 73.0 };
    let pNE = { lat: 59.0, lng: 136.0 };
    let pSE = { lat: 3.0, lng: 136.0 };
    let pSW = { lat: 3.0, lng: 73.0 };
    pArray.push(pNW);
    pArray.push(pSW);
    pArray.push(pSE);
    pArray.push(pNE);
    pArray.push(pNW);
    // 遍历市或区
    const cityList = data.map((item: any) => {
      L.geoJSON(item, { style: myStyle }); // 对市/区进行样式填充
      return item.features;
    });
    let dataArr: any = [];
    let dataArr2: any = [];
    for (let i = 0; i < cityList.length; i++) {
      cityList[i].map((item: any) => dataArr.push(item.geometry.coordinates));
    }
    for (let j = 0; j < dataArr.length; j++) {
      dataArr[j].map((item: any) => dataArr2.push(item[0]));
    }
    for (let k = 0; k < dataArr2.length; k++) {
      let points: any = [];
      dataArr2[k].map((i: any) => points.push({ lat: i[1], lng: i[0] }));
      pArray = pArray.concat(points);
      pArray.push(pArray[0]); // 用来进行前后连接
    }

    let plyall = L.polygon(pArray, {
      color: '#0000',
      fillColor: '#040F17',
      fillOpacity: 0.8,
    });
    plyall.addTo(map);
  };

  return (
    <div className={styles.container}>
      <div id="map" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default BdMap;
