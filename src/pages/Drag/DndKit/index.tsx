import React, { useCallback, useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import Draggable from './Drag';
import SrotItem from './SrotItem';
import Item from './Item';
import styles from './index.less';

const DndKit: React.FC = () => {
  const [list, setList] = useState<any[]>(
    Array.from({ length: 10 }, (_, i) => (i + 1).toString()),
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // 事件监听-拖拽开始
  const handleDragStart = (e: any) => {
    console.log(e.activatorEvent);
    const { active } = e;
    if (active.data.current.type === 'sort') {
      setActiveId(e.active.id);
    }
  };

  // 事件监听-拖拽结束
  const handleDragEnd = (e: any) => {
    const { active, over } = e;
    if (active.id !== over?.id && active?.data.current.type === 'sort') {
      // 排序操作
      setList((d) => {
        const oldIndex = d.indexOf(active.id);
        const newIndex = d.indexOf(over!.id);
        return arrayMove(d, oldIndex, newIndex);
      });
    } else if (active?.data.current.type === 'drag') {
      // 添加操作
      setList([...list, list.length + 1]);
    }
    setActiveId(null);
  };

  // 事件监听-拖拽取消
  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className={styles.container}>
        <div className={styles.leftBox}>
          <SortableContext items={list} strategy={rectSortingStrategy}>
            {list.map((id) => (
              <SrotItem key={id} id={id} />
            ))}
          </SortableContext>
          <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
            {activeId ? <Item id={activeId} isDragging /> : null}
          </DragOverlay>
        </div>
        <div className={styles.rightBox}>
          <div>
            <Draggable id="draggable">拖拽元素1</Draggable>
          </div>
          <div>
            <Draggable id="draggable2">拖拽元素2</Draggable>
          </div>
          <div>
            <Draggable id="draggable3">拖拽元素3</Draggable>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default DndKit;
