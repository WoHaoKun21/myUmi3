import { forwardRef } from 'react';
import type { CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CloseOutlined } from '@ant-design/icons';
import Item from './Item';
import styles from './index.less';

interface DroppableProps {
  id: any;
  isDrag?: boolean;
}

const SrotItem: React.FC<DroppableProps> = ({ id }) => {
  const { isDragging, listeners, setNodeRef, transition, transform } =
    useSortable({
      id,
      data: { type: 'sort' },
    });

  const inlineStyles: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    transformOrigin: '50% 50%',
    opacity: isDragging ? '0.5' : '1',
    cursor: isDragging ? 'grabbing' : 'grab',
    boxShadow: isDragging
      ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
      : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
    transform: isDragging ? 'scale(1.05)' : 'scale(1)',
    transition: transition || undefined,
  };
  const style = { transform: CSS.Transform.toString(transform) };

  return (
    <div ref={setNodeRef} style={{ ...inlineStyles, ...style }} {...listeners}>
      <CloseOutlined className={styles.closeIcon} />
      <div id={`chart`} />
    </div>
  );
};

export default SrotItem;
