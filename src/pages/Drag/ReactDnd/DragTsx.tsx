import React, { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Button } from 'antd';
import { useDrag } from 'react-dnd';
import type { DragSourceMonitor } from 'react-dnd';

const DragTsx: React.FC<{ oneId: string }> = ({ oneId }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: oneId,
      canDrag: true, // 是否允许拖拽
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(), // 是否正在拖拽
      }),
    }),
    [],
  );

  return (
    <Button type="primary" ref={drag}>
      折线图
    </Button>
  );
};

export default DragTsx;
