/*
 * @Author: luckly-qing 1316884089@qq.com
 * @Date: 2023-09-08 14:50:35
 * @LastEditors: luckly-qing 1316884089@qq.com
 * @LastEditTime: 2023-09-08 14:56:51
 * @FilePath: \ps-web\src\components\CommText\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react';
import { Switch, Typography } from 'antd';
import styles from './index.less';

const { Paragraph } = Typography;

interface IAppProps {
  text: string;
  status: boolean;
  noticeId: number | string;
  readMessage: (id: any) => void;
}

interface TextElement extends Element {
  innerText: string;
}

const CommText: React.FunctionComponent<IAppProps> = (props) => {
  const { text, status, noticeId, readMessage } = props;
  const [ellipsis, setEllipsis] = useState(true);
  const [show, setShow] = useState(false);
  const [wrap, setWrap] = useState(false);

  const handleContent = () => {
    const wrap =
      text?.length >
      Math.floor(document.getElementById('txt_box')!.clientWidth / 14);
    setWrap(wrap);
  };

  useEffect(() => {
    handleContent();
  }, []);

  return (
    <div
      className={styles.box}
      id="txt_box"
      onClick={() => {
        status && readMessage(noticeId);
      }}
    >
      <Paragraph
        ellipsis={ellipsis}
        style={{ color: status ? '' : '#8c92a4', cursor: 'pointer' }}
      >
        {text}
      </Paragraph>
      {wrap ? (
        show ? (
          <div
            onClick={() => {
              setEllipsis(true);
              setShow(false);
            }}
            style={{ color: '#778dff', cursor: 'pointer' }}
          >
            收起
          </div>
        ) : (
          <div
            onClick={() => {
              setEllipsis(false);
              setShow(true);
            }}
            style={{ color: '#778dff', cursor: 'pointer' }}
          >
            展开
          </div>
        )
      ) : null}
    </div>
  );
};

export default CommText;
