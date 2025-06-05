import { useState } from 'react';
import CommModel from '@/components/DbModel';

let flag = true;

const DbModal: React.FC = () => {
  const [stateInfo, setStateInfo] = useState<{
    type: 'basic' | 'trap';
    curWater: number;
    crestElevation: number;
    crestWidthTop: number;
    crestWidthBottom: number;
    deadWater: number;
    imageWidth: number;
    imageHeight: number;
    markWidthS: number;
    markWidthL: number;
    space: number;
    totalWater: number;
    warnWater: number;
  }>({
    type: 'trap',
    curWater: 4, // 当前水位
    crestElevation: 60, // 坝顶高度
    crestWidthTop: 20,
    crestWidthBottom: 160,
    deadWater: 2, // 死水位
    imageWidth: 870, // canvas的宽度
    imageHeight: 325, // canvas的高度
    markWidthS: 3, // 短刻度长度
    markWidthL: 6, // 长刻度长度
    space: 20, // 定义刻度间隔
    totalWater: 70, // 总高度
    warnWater: 4.35, // 汛限水位
  });

  return (
    <div>
      <CommModel
        title="坝前水位示意图"
        type={stateInfo.type}
        imageWidth={stateInfo.imageWidth}
        imageHeight={stateInfo.imageHeight}
        curWater={stateInfo.curWater}
        crestElevation={stateInfo.crestElevation}
        crestWidthTop={stateInfo.crestWidthTop}
        crestWidthBottom={stateInfo.crestWidthBottom}
        deadWater={stateInfo.deadWater}
        markWidthS={stateInfo.markWidthS}
        markWidthL={stateInfo.markWidthL}
        space={stateInfo.space}
        totalWater={stateInfo.totalWater}
        warnWater={stateInfo.warnWater}
      />
      <button
        onClick={() => {
          setStateInfo((d) => ({
            ...d,
            type: flag ? 'basic' : 'trap',
            crestElevation: 12,
            crestWidthTop: 20,
            crestWidthBottom: 60,
            totalWater: 16,
            curWater: 8,
            deadWater: 4,
            warnWater: 9,
          }));

          flag = !flag;
        }}
      >
        按钮
      </button>
    </div>
  );
};

export default DbModal;
