import React from 'react';
import styles from './index.less';
import DropTsx from './DropTsx';
import DragTsx from './DragTsx';
import { dataList } from './data';

const ReactDnd: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        <DropTsx list={dataList} />
        <DropTsx list={dataList} />
        <DropTsx list={dataList} />
      </div>
      <div className={styles.rightBox}>
        <DragTsx oneId={'line'} label="折线图" item={{ id: 1 }} />
        <DragTsx oneId={'bar'} label="柱状图" item={{ id: 2 }} />
        <DragTsx oneId={'pie'} label="饼状图" item={{ id: 3 }} />
      </div>
    </div>
  );
};

export default ReactDnd;
