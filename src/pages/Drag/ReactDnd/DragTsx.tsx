import React, { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Button } from 'antd';
import { useDrag } from 'react-dnd';
import type { DragSourceMonitor } from 'react-dnd';

interface IDragTsxProps {
  oneId: string;
  label: string;
  item: Object;
}

const DragTsx: React.FC<IDragTsxProps> = ({ oneId, label, item }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: oneId,
      item: item,
      canDrag: true, // 是否允许拖拽
      collect: (monitor: DragSourceMonitor) => {
        return {
          isDragging: monitor.isDragging(), // 是否正在拖拽
        };
      },
    }),
    [],
  );

  return (
    <Button type="primary" ref={drag} data-color={'#f00'}>
      {label ?? '空'}
    </Button>
  );
};

export default DragTsx;
