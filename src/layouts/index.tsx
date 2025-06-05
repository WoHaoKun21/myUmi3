/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useState } from 'react';
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
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layouts;
