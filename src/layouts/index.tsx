/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CommMenu from './CommMenu';
import CommHeader from './CommHeader';
import styles from './index.less';

const Layouts: React.FC = ({ children }) => {
  const [showIcon, setShowIcon] = useState(true);

  return (
    <div
      className={styles.container}
      onMouseMove={(e) => {
        if (e.clientX < 175) {
          setShowIcon(true);
        } else {
          setShowIcon(false);
        }
      }}
    >
      <CommHeader />
      <div className={styles.com_info}>
        <CommMenu showIcon={showIcon} />
        <DndProvider backend={HTML5Backend}>
          <div className={styles.content}>{children}</div>
        </DndProvider>
      </div>
    </div>
  );
};

export default Layouts;
