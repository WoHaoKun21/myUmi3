import { forwardRef } from 'react';
import type { HTMLAttributes, CSSProperties } from 'react';
import styles from './index.less';

type ItemProps = HTMLAttributes<HTMLDivElement> & {
  withOpacity?: boolean;
  isDragging?: boolean;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, withOpacity, isDragging, style, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      transformOrigin: '50% 50%',
      opacity: withOpacity ? '0.5' : '1',
      cursor: isDragging ? 'grabbing' : 'grab',
      boxShadow: isDragging
        ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
        : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
      transform: isDragging ? 'scale(1.05)' : 'scale(1)',
      ...style,
    };

    return (
      <div ref={ref} style={inlineStyles} {...props}>
        {id}
      </div>
    );
  },
);

export default Item;
