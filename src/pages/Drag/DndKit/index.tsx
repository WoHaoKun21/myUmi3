import React, { useState } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styles from './index.less';

const DndKit: React.FC = (props) => {
  console.log(props);

  return (
    <div className={styles.container}>
      {/* 放置区域 */}
      <div className={styles.leftBox}>
        <div>
          <CloseOutlined className={styles.closeIcon} />
          <div id={`chart_ 1`}>1</div>
        </div>
        <div>
          <CloseOutlined className={styles.closeIcon} />
          <div id={`chart_ 1`}>2</div>
        </div>
        <div>
          <CloseOutlined className={styles.closeIcon} />
          <div id={`chart_ 1`}>3</div>
        </div>
        <div>
          <CloseOutlined className={styles.closeIcon} />
          <div id={`chart_ 1`}>4</div>
        </div>
      </div>

      {/* 拖拽区域 */}
      <div className={styles.rightBox}>
        <Button type="primary">折线图</Button>
      </div>
    </div>
  );
};

export default DndKit;
