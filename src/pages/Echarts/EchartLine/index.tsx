/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import * as echarts from 'echarts';

let myEchartLine: any;
let myEchartLineDom: any;

let now = new Date(1997, 9, 3);
let oneDay = 24 * 3600 * 1000;
let value = Math.random() * 1000;

// 生成data数据
const randomData = () => {
  now = new Date(+now + oneDay);
  value = value + Math.random() * 21 - 10;
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value),
    ],
  };
};

// ecchart数据
const data: any[] = [];
for (let i = 0; i < 1000; i++) {
  data.push(randomData());
}

const EchartLine: React.FC = () => {
  // 初始化echarts折线
  const initialStateEchart = () => {
    myEchartLineDom = document.getElementById('myEchartLine') as HTMLDivElement;
    myEchartLine = echarts.init(myEchartLineDom);
    const option = {
      title: {
        text: '折线数据',
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          const obj = params[0];
          const date = new Date(obj.name);
          return (
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear() +
            ' : ' +
            obj.value[1]
          );
        },
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'Fake Data',
          type: 'line',
          showSymbol: false,
          data: data,
        },
      ],
    };
    setInterval(function () {
      for (let i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
      }
      myEchartLine.setOption({
        series: [
          {
            data: data,
          },
        ],
      });
    }, 1000);
    myEchartLine.setOption(option);
  };
  useEffect(() => {
    initialStateEchart();
  }, []);
  return (
    <div>
      <div
        id="myEchartLine"
        style={{
          width: 800,
          height: 600,
          border: '1px solid #f00',
          margin: '0 auto',
        }}
      />
    </div>
  );
};

export default EchartLine;
