/*
 * @Author: zhang-ruqing 1316884089@qq.com
 * @Date: 2023-11-13 09:21:30
 * @LastEditors: zhang-ruqing 1316884089@qq.com
 * @LastEditTime: 2023-11-15 16:55:08
 * @FilePath: \xysk-web\src\components\dPTitlePages\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './index.less';

function DpTitlePages(props: any) {
  const { title, sx } = props;
  return (
    <div className="titleDpTitle">
      <img src={`/daPing/icon-sfx${sx}.png`} alt="" />
      <div className="titleBoxPAges">{title}</div>
    </div>
  );
}

export default DpTitlePages;
