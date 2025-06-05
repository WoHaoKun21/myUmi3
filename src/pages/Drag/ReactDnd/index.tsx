import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import * as echarts from 'echarts';
import { dataList } from './data';
import { handleChartData } from '@/config';
import styles from './index.less';

const ReactDnd: React.FC = () => {
  const [eleList, setEleList] = useState<any[]>([]);

  // 获取图表数据列表
  const getChartData = async () => {
    const res = await { code: 200, data: dataList, msg: '操作成功' };
    if (res.code === 200) {
      console.log('请求：', res.data);
      setEleList(res.data || []);
    } else {
      setEleList([]);
    }
  };

  // 初始化所有echarts图
  const initChart = (data: any) => {
    const DOM = document.getElementById(`chart_${data.id}`);
    console.log('数据初始化：', data, data.id, DOM?.innerHTML);
    const option = handleChartData(data.data, data.type);
    const chart = echarts.init(DOM);
    chart.setOption(option);
  };

  // 添加一个echarts图
  const addData = (type: 'line' | 'bar' | 'pie') => {
    const obj = {
      id: eleList.length + 1,
      type: type,
      data: [
        { value: Math.ceil(Math.random() * 10 + 20), dataTime: '2025-06-01' },
        { value: Math.ceil(Math.random() * 8 + 20), dataTime: '2025-06-03' },
        { value: Math.ceil(Math.random() * 12 + 20), dataTime: '2025-06-04' },
        { value: Math.ceil(Math.random() * 5 + 20), dataTime: '2025-06-05' },
      ],
    };
    dataList.push(obj);
    getChartData();
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        {eleList.map((o) => {
          setTimeout(() => initChart(o), 100);
          return <div key={o.id} id={`chart_${o.id}`} />;
        })}
      </div>
      <div className={styles.rightBox}>
        <Button type="primary" onClick={() => addData('line')}>
          折线图
        </Button>
        <Button type="primary">柱状图</Button>
        <Button type="primary">饼状图</Button>
      </div>
    </div>
  );
};

export default ReactDnd;
