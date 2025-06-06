import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { CloseOutlined } from '@ant-design/icons';
import type { DropTargetMonitor } from 'react-dnd';
import { dataList } from './data';
import styles from './index.less';

const DropTsx: React.FC = () => {
  const [eleList, setEleList] = useState<any[]>([]);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ['zzz', 'sss', 'ddd', 'fff', 'rrr'],
      drop(_item, monitor) {
        console.log('放置drop：', _item, monitor.getItemType());
        return undefined;
      },
      collect: (monitor: DropTargetMonitor) => {
        return {
          isOver: monitor.isOver(), //  是否在目标元素上
          canDrop: monitor.canDrop(), // 是否可以拖拽
        };
      },
    }),
    [],
  );

  // 获取图表数据列表
  const getChartData = async () => {
    const res = await { code: 200, data: dataList, msg: '操作成功' };
    if (res.code === 200) {
      setEleList(res.data || []);
    } else {
      setEleList([]);
    }
  };

  const opacity = !isOver ? 1 : 0.1;

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <div ref={drop} style={{ opacity }}>
      <CloseOutlined className={styles.closeIcon} />
      <div id={`chart`} />
    </div>
  );
};

export default DropTsx;
