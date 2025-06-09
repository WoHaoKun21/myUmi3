import React, { useState } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styles from './index.less';

let len = 0;
let drapItem: any = null;

const HtmlJS: React.FC = () => {
  const [drap, setDrap] = useState<{
    one: boolean;
    two: boolean;
    three: boolean;
  }>({
    one: true,
    two: true,
    three: true,
  });
  const [dropList, setDropList] = useState<any[]>([]);

  len = dropList.length;

  const getDropData = async (obj: any = {}) => {
    const res = await {
      code: 200,
      msg: '操作成功',
      data: [
        { value: 20, dataTime: '2025-06-01' },
        { value: 12, dataTime: '2025-06-03' },
        { value: 16, dataTime: '2025-06-04' },
        { value: 25, dataTime: '2025-06-05' },
      ],
    };
    if (res.code === 200) {
      const newData = { ...obj, id: len + 1, data: res.data };
      setDropList([...dropList, newData]);
      len += 1;
    } else {
      setDropList([]);
    }
  };

  const { one, two, three } = drap;

  return (
    <div className={styles.container}>
      {/* 放置区域 */}
      <div
        draggable={false}
        className={styles.leftBox}
        // 在放置目标上移动
        onDragOver={(e) => e.preventDefault()} // 阻止默认动作后才会执行拖拽操作
        // 放置到目标位置
        onDrop={(e) => {
          e.preventDefault();
          const classData = e.dataTransfer;
          if (classData.getData('data')) {
            const data = JSON.parse(classData.getData('data'));
            getDropData(data); // 获取指定数据
          }
          if (classData.getData('order') && e.target.id) {
            const data = JSON.parse(classData.getData('order'));
            const start = dropList.findIndex((o) => o.id === data.id);
            const end = dropList.findIndex(
              (o) => o.id === e.target.id.split('_')[1] * 1,
            );
            const newList = [...dropList];
            [newList[start], newList[end]] = [newList[end], newList[start]];
            setDropList(newList);
          }
        }}
      >
        {dropList.map((o, i) => (
          <div
            key={o.id}
            draggable
            onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
              const data = { id: o.id };
              e.dataTransfer.setData('order', JSON.stringify(data));
            }}
          >
            <CloseOutlined className={styles.closeIcon} />
            <div id={`chart_${o.id}`}>{o.id}</div>
          </div>
        ))}
      </div>

      {/* 拖拽区域 */}
      <div className={styles.rightBox}>
        <Button
          type="primary"
          draggable={one}
          // 拖拽开始
          onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
            const data = { label: '折线图', type: 'line' };
            e.dataTransfer.setData('data', JSON.stringify(data));
          }}
        >
          折线图
        </Button>
      </div>
    </div>
  );
};

export default HtmlJS;
