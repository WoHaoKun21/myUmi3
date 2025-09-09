import React, { useEffect, useState } from 'react';
import { timeHandel } from '@/config';
import styles from '../index.less';

const CommHeader: React.FC = () => {
  const [timeObj, setTimeObj] = useState<{ solar: string; lunar: string }>({
    solar: '',
    lunar: '',
  });

  useEffect(() => {
    setTimeObj((o) => ({ ...o, ...timeHandel() }));
    setInterval(() => {
      setTimeObj((o) => ({ ...o, ...timeHandel() }));
    }, 60000);
  }, []);

  const { solar } = timeObj;

  return (
    <div className={styles.header}>
      <div className={styles.header_title}>个人实例化框架</div>
      <div className={styles.header_info}>{solar}</div>
    </div>
  );
};

export default CommHeader;
