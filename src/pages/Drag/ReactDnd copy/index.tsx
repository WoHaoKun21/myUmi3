import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import {
  DragPreviewImage,
  useDrag,
  useDrop,
  useDragDropManager,
  useDragLayer,
} from 'react-dnd';
import * as echarts from 'echarts';
import { CloseOutlined } from '@ant-design/icons';
import { handleChartData } from '@/config';
import img1 from '../../../../public/img1.png';
import { dataList } from './data';
import styles from './index.less';

let len: number;

const ReactDnd: React.FC = (props) => {
  const [eleList, setEleList] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  // 抓取
  const [{ isDragging }, drag] = useDrag(
    {
      type: 'drag',
      item: {
        id: 1,
        name: '张三',
      },
      collect: (monitor: any) => {
        console.log('drag抓取：', monitor);
        return {
          isDragging: monitor.isDragging(),
        };
      },
    },
    [],
  );
  // // 放置
  // const [{ handlerId }, drop] = useDrop({
  //   accept: 'drop',
  //   collect: (monitor) => {
  //     console.log('drop放置：', monitor);
  //     return {
  //       handlerId: monitor.getHandlerId(),
  //     };
  //   },
  //   hover: (item: any, monitor) => {
  //     console.log('item', item, monitor);
  //   },
  // });
  // drag(drop(ref));
  drag(ref);
  console.log('执行：', drag(ref));

  const opacity = isDragging ? 0 : 1;

  // 获取图表数据列表
  const getChartData = async () => {
    const res = await { code: 200, data: dataList, msg: '操作成功' };
    if (res.code === 200) {
      setEleList(res.data || []);
      len = res.data.length;
    } else {
      setEleList([]);
      len = 0;
    }
  };

  // 初始化所有echarts图
  const initChart = (data: any) => {
    const DOM = document.getElementById(`chart_${data.id}`);
    const option = handleChartData(data.data, data.type);
    const chart = echarts.init(DOM);
    chart.setOption(option);
  };

  // 添加一个echarts图
  const addData = (type: 'line' | 'bar' | 'pie') => {
    const obj = {
      id: len + 1,
      type,
      data: [
        { value: Math.ceil(Math.random() * 10 + 20), dataTime: '2025-06-01' },
        { value: Math.ceil(Math.random() * 8 + 20), dataTime: '2025-06-03' },
        { value: Math.ceil(Math.random() * 12 + 20), dataTime: '2025-06-04' },
        { value: Math.ceil(Math.random() * 5 + 20), dataTime: '2025-06-05' },
      ],
    };
    len++;
    setEleList([...eleList, obj]);
  };

  // 删除一个echarts图
  const deleteData = (id: any) => {
    const arr = eleList.filter((o) => o.id !== id);
    setEleList(arr);
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        {eleList.map((o) => {
          setTimeout(() => initChart(o), 100);
          return (
            <div key={o.id}>
              <CloseOutlined
                className={styles.closeIcon}
                onClick={() => deleteData(o.id)}
              />
              <div id={`chart_${o.id}`} />
            </div>
          );
        })}
      </div>
      <div
        ref={ref}
        className={styles.rightBox}
        style={{ opacity }}
        // data-handler-id={handlerId}
      >
        <Button type="primary" onClick={() => addData('line')}>
          折线图
        </Button>
        <Button type="primary" onClick={() => addData('bar')}>
          柱状图
        </Button>
        <Button type="primary">饼状图</Button>
      </div>
    </div>
  );
};

export default ReactDnd;
