import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import classNames from 'classnames';
import styles from './index.less';
import dayjs from 'dayjs';

let myChart: any;
let myChartDOM: any;

const arr: any[] = [];
for (let i = 0; i < 7; i++) {
  const obj: any = {};
  obj.id = i + 1;
  obj.name = `数据${i + 1}`;
  obj.data = Math.floor(Math.random() * 1400);
  arr.push(obj);
}

const EchartsAPI: React.FC = () => {
  const [dataSource, setDataSource] = useState(arr || []);
  const [echartsObj, setEchartsObj] = useState<any>({});

  // 初始化二charts
  const initEchart = (arr: any[]) => {
    const option = {
      xAxis: {
        type: 'category',
        data: arr.map((i) => i.name),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: arr.map((i) => i.data),
          type: 'line',
          smooth: true,
        },
      ],
    };
    myChartDOM = document.getElementById('myChart');
    myChart = echarts.init(myChartDOM);
    option && myChart.setOption(option);

    // 组织echarts在浏览器中的右击默认动作
    document.getElementById('myChart')!.oncontextmenu = function () {
      return false;
    };

    // 监听echart的右击事件
    myChart.on('contextmenu', function (obj: any) {
      const { clientX, clientY } = obj.event.event;
      document.getElementById(
        'rightMenu',
      )!.style.cssText = `display: block;left: ${clientX - 170}px;top: ${
        clientY - 55
      }px`;
      setEchartsObj(obj);
    });

    // 隐藏右击出现的弹框
    document
      .querySelector(`.${styles.container}`)
      ?.addEventListener('click', function () {
        document.getElementById(
          'rightMenu',
        )!.style.cssText = `display: none;left: -9999;top: -9999`;
      });
  };

  useEffect(() => {
    initEchart(dataSource);
  }, []);

  // 新增Echarts数据
  const addEchartData = async () => {
    console.log('新增数据', echartsObj);
  };

  // 编辑Echarts数据
  const editEchartData = async () => {
    const arr = JSON.parse(JSON.stringify(dataSource)) || [];
    // 获取当前对象
    const obj = arr.find(
      (o: any) => o.name === echartsObj.name && o.data === echartsObj.data,
    );
    // 获取下表
    const index = arr.findIndex(
      (o: any) => o.name === echartsObj.name && o.data === echartsObj.data,
    );
    obj.data = 20;
    arr.splice(index, 1, obj);
    setDataSource(arr);
    initEchart(arr);
  };

  // 删除Echarts数据
  const deleteEchartData = async () => {
    const arr = dataSource.filter(
      (o) => o.name !== echartsObj.name && o.data !== echartsObj.data,
    );
    setDataSource(arr);
    initEchart(arr);
  };

  return (
    <div className={styles.container}>
      <h2>Echarts API</h2>
      <div
        id="myChart"
        style={{
          width: 800,
          height: 600,
          margin: '0 auto',
          border: '1px solid #f00',
        }}
      />
      <ul id="rightMenu" className={styles.menu} style={{ display: 'none' }}>
        <li onClick={addEchartData}>增加</li>
        <li onClick={editEchartData}>编辑</li>
        <li onClick={deleteEchartData}>删除</li>
      </ul>
    </div>
  );
};

export default EchartsAPI;
