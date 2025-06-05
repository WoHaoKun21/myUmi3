import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
import geoJSON from './city.json';
import mapData from './map';

let myChart: any;
let chartDom: any;

echarts.registerMap('china', { geoJSON });

const planeFly =
  'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

const EchartsMapTwo: React.FC = () => {
  // 初始化Echarts地图
  const initMap = () => {
    myChart?.clear();
    chartDom = document.getElementById('echartMap')!;
    myChart = echarts.init(chartDom);
    const geoCoordMap: any = {};
    // 使用echart的util提供的方法实现数据的遍历
    echarts.util.each(geoJSON.features, (dataItem) => {
      geoCoordMap[dataItem.properties.name] = dataItem.properties.center; // centroid
    });

    // 生成路线图
    const convertLineData = (data: any) => {
      // 生成轨迹线
      const res = [];
      for (let i = 0; i < data.length; i++) {
        const dataItem = data[i];
        const fromCoord = geoCoordMap[dataItem.from];
        const toCoord = geoCoordMap[dataItem.to];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem.from,
            toName: dataItem.to,
            coords: [fromCoord, toCoord],
            value: dataItem.value,
            color: dataItem.color,
          });
        }
      }
      return res;
    };

    // 生成坐标点
    const convertPointData = (data: any) => {
      // 生成指定城市的坐标点
      const res = [];
      for (let i = 0; i < data.length; i++) {
        const dataItem = data[i];
        const toCoord = geoCoordMap[dataItem.to];
        if (toCoord) {
          res.push({
            name: dataItem.to,
            value: toCoord,
            count: dataItem.value, // 数据大小
            // symbolSize: 4, // 标记的大小
            itemStyle: {
              color: dataItem.color,
            },
          });
        }
      }
      return res;
    };

    const option = {
      backgroundColor: '#ffe', // 地图背景色
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow',
        },
        textStyle: {
          fontSize: 12,
        },
        formatter: function (params: any) {
          let returnStr = '';
          if (params.componentSubType === 'effectScatter') {
            returnStr += params.marker;
            returnStr += params.name + '：' + params.data.value;
          } else if (params.componentSubType === 'lines') {
            returnStr += params.marker;
            returnStr += params.data.fromName + ' -> ' + params.data.toName;
            returnStr += '：' + params.data.value;
          }
          return returnStr;
        },
      },
      geo: {
        type: 'map',
        map: 'china',
        roam: true, // 是否开启缩放和漫游
        zoom: 8,
        center: [119.569458, 28.111077],
        scaleLimit: {
          min: 1.7,
        },
        label: {
          // 划入前的字体颜色
          show: true, // 是否显示省份标签
          textStyle: {
            fontSize: 10,
            color: '#1DE9B6', // 字体颜色
          },
          // 划入后的字体颜色
          emphasis: {
            show: true, // 高亮后是否显示省份
            fontSize: 12,
            color: '#fff',
          },
        },
        itemStyle: {
          areaColor: '#0d2553', // 市/区背景颜色
          borderColor: '#366aff',
          borderWidth: 2,
          emphasis: {
            areaColor: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#0D3DA2',
                },
                {
                  offset: 1,
                  color: '#0D3DA2',
                },
              ],
            },
          },
        },
        data: mapData,
      },
      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          markPoint: {
            symbolSize: 1,
          },
          data: convertPointData(mapData),
          symbolSize: 8, // 标记大小，如果在data里面设置，以data里面为准
          showEffectOn: 'render', // 绘制完成后显示特效
          rippleEffect: {
            brushType: 'stroke', // 鼠标划入到标点，有波纹
          },
          hoverAnimation: true, // 鼠标划入标点后的动画
          // 文本显示——指定城市
          label: {
            normal: {
              show: false, // 是否显示城市的名字
              formatter: function (param: any) {
                return param.data.name;
              },
              position: 'right',
              fontSize: 12,
              color: '#333',
            },
            emphasis: {
              show: true,
              // position: 'right',
              fontSize: 12,
              color: '#333',
            },
          },
          // 标点的样式
          itemStyle: {
            normal: {
              color: function (param: any) {
                return param.data.color;
              },
              shadowBlur: 10,
              shadowColor: '#fff',
            },
          },
          zlevel: 1, // 图形的所有图形元素都会被放置到zlevel层上，zlevel层可以通过zlevel属性进行控制。
        },
        {
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 5, // 动画移动时间
            trailLength: 0.2,
            symbol: planeFly, // 图形标记，也可以使用url进行设置
            symbolSize: 10, // 箭头大小
          },
          lineStyle: {
            normal: {
              color: function (param: any) {
                return param.data.color;
              },
              width: 1, // 线条宽度
              opacity: 0.2,
              curveness: 0.3, // 线条弧度
            },
          },
          data: convertLineData(mapData),
        },
      ],
    };
    if (option) myChart.setOption(option, true);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div>
      <div
        id="echartMap"
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
export default EchartsMapTwo;
