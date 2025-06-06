import React from 'react';
import styles from './index.less';
import DropTsx from './DropTsx';
import DragTsx from './DragTsx';

const ReactDnd: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        <DropTsx />
        <DropTsx />
        <DropTsx />
        <DropTsx />
        <DropTsx />
        <DropTsx />
        <DropTsx />
        <DropTsx />
        <DropTsx />
        <DropTsx />
      </div>
      <div className={styles.rightBox}>
        <DragTsx oneId={'zzz'} />
        <DragTsx oneId={'sss'} />
        <DragTsx oneId={'ddd'} />
        <DragTsx oneId={'fff'} />
        <DragTsx oneId={'rrr'} />
      </div>
    </div>
  );
};

export default ReactDnd;
