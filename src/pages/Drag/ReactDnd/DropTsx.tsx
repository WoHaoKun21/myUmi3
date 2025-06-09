import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { CloseOutlined } from '@ant-design/icons';
import type { DropTargetMonitor } from 'react-dnd';
import { dataList } from './data';
import styles from './index.less';

let len = 0;

interface IDropTsxProps {
  list: any[];
}

const DropTsx: React.FC<IDropTsxProps> = ({ list }) => {
  const [eleList, setEleList] = useState<any[]>(list);
  len = list.length;

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ['line', 'bar', 'pie'],
      // 放置
      drop(_item, monitor) {
        console.log('放置drop：', _item, monitor.getItemType());
        return undefined;
      },
      // 拖拽进入
      collect: (monitor: DropTargetMonitor) => {
        return {
          isOver: monitor.isOver(), //  是否在目标元素上
          canDrop: monitor.canDrop(), // 是否可以拖拽
        };
      },
    }),
    [],
  );

  const opacity = !isOver ? 1 : 0.1;

  return (
    <div ref={drop} style={{ opacity }}>
      <CloseOutlined className={styles.closeIcon} />
      <div id={`chart`} />
    </div>
  );
};

export default DropTsx;
