/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import Wave from './Wave';
import styles from './index.less';

interface IBdMapProps {
  title: string;
  type: 'basic' | 'trap';
  imageWidth: number;
  imageHeight: number;
  curWater: number;
  crestElevation: number;
  crestWidthTop: number;
  crestWidthBottom: number;
  deadWater: number;
  markWidthS: number;
  markWidthL: number;
  space: number;
  totalWater: number;
  warnWater: number;
}

let canvas: any; // canvas DOM对象
let ctx: any; // canvas样式对象：2D/3D
let wave: any; // 波长

const DbModel: React.FC<IBdMapProps> = (props) => {
  const {
    type = 'basic',
    title,
    imageWidth, // canvas的宽度
    imageHeight, // canvas的高度
    curWater, // 当前水位——父组件传递：props.curWater
    crestElevation, // 坝顶高程——父组件传递：props.crestElevation
    crestWidthTop, // 大坝顶部宽度——父组件传递：props.crestWidthTop
    crestWidthBottom, // 大坝底部宽度——父组件传递：props.crestWidthBottom
    deadWater, // 死水位——父组件传递：props.deadWater
    markWidthS, // 短刻度长度——父组件传递：props.markWidthS
    markWidthL, // 长刻度长度——父组件传递：props.markWidthL
    space, // 定义刻度间隔——父组件传递：props.space
    totalWater, // 总高度——父组件传递：props.totalWater
    warnWater, // 汛限水位——父组件传递：props.warnWater
  } = props;

  // 初始化操作：canvas的样式/动画初始化
  const initState = () => {
    canvas = document.getElementById('canvas')!;
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    const params = {
      canvasWidth: imageWidth, // 用来当作坐标
      canvasHeight: imageHeight,
      crestElevationHeight: 139, // 大坝高度
      waveHeight: imageHeight,
      x0: 35, // x轴起始位置，整体偏移量
      y0: imageHeight, // y轴起始位置
    };
    wave = new Wave({
      ...params,
      A: 1.5, // 振幅
      W: 1 / 2, // 角频率，越大，则水波密集
      speed: -0.04, // 控制动画速度
      Q: 0, // 表示初相
      colors: ['rgba(75, 142, 244, 0.8)', 'rgba(45, 164,247, 0.5)'], // 波浪颜色
    });
    ctx = canvas.getContext('2d');
    calculateWaveCanvasHeight(params); // 绘制波纹
  };

  useEffect(() => {
    initState(); // 初始化大坝数据
  }, [props]);

  // 计算波纹高度
  const calculateWaveCanvasHeight = (obj: any) => {
    const curWaveHeight = (curWater * obj.canvasHeight) / totalWater;
    wave = new Wave({
      canvasWidth: obj.canvasWidth, // 轴长
      canvasHeight: (obj.canvasHeight - curWaveHeight) * 2, // 轴高
      waveHeight: curWaveHeight, // 水位高（根据当前水位 / 总水位  * 画布高，计算此水位下所占画布高度）
      outCanvasHeight: obj.canvasHeight, // 坐标轴画布高度
      A: 1.5, // 振幅
      W: 1 / 2, // 角频率，越大，则水波密集
      speed: -0.04, // 控制动画速度
      Q: 0, // 表示初相
      colors: ['rgba(75, 142, 244, 0.7)', 'rgba(45, 164,247, 0.4)'], // 波浪坝前/后颜色
      x0: obj.x0,
      y0: obj.y0,
    });
    draw(obj); // 绘制动画效果
  };

  let data: number;
  // 绘制数据图片动画
  const draw = (obj: any) => {
    window.cancelAnimationFrame(data); // 停止动画
    ctx.clearRect(0, 0, obj.canvasWidth, obj.canvasHeight);
    wave.draw(ctx, data); // 绘制水域
    DrawAxis(ctx, obj); // 绘制刻度线和文字
    drawCurrent(ctx, obj); // 绘制当前水位文字
    drawWarning(ctx, obj); // 绘制预警水位/文字
    drawCrestElevation(ctx, obj); // 绘制大坝顶部高度刻度线/文字
    drawDead(ctx, obj); // 绘制死水位高度刻度线/文字
    if (type === 'basic') {
      drawBasicDam(ctx, obj); // 绘制大坝区域
    } else if (type === 'trap') {
      drawTrapDam(ctx, obj); // 绘制梯形大坝区域
    }
    data = window.requestAnimationFrame(() => draw(obj));
  };

  // 刻画x/y坐标轴
  const DrawAxis = (ctx: any, obj: any) => {
    // 绘制x轴
    ctx.beginPath();
    ctx.lineWidth = 1; // 默认为1
    ctx.moveTo(30, obj.y0);
    ctx.lineTo(obj.canvasWidth, obj.y0);
    ctx.stroke();
    // 绘制y轴
    ctx.beginPath();
    // ctx.lineWidth = 1
    ctx.moveTo(obj.x0, obj.y0);
    ctx.lineTo(obj.x0, 0);
    ctx.stroke();
    // 绘制y轴的刻度
    let i = 0;
    ctx.beginPath();
    for (let y = obj.y0 - space; y > 0; y -= space) {
      ctx.moveTo(obj.x0, y);
      if (i % 2 === 0) {
        ctx.lineTo(obj.x0 + markWidthS, y);
      } else {
        ctx.lineTo(obj.x0 + markWidthL, y);
      }
      i++;
    }
    ctx.stroke();
    // 绘制最右垂直虚线
    ctx.beginPath();
    ctx.setLineDash([6, 3]);
    ctx.moveTo(obj.canvasWidth - 2, obj.y0);
    ctx.lineTo(obj.canvasWidth - 2, 0);
    ctx.strokeStyle = '#D4D7D9';
    ctx.stroke();
    ctx.closePath();
    ctx.setLineDash([]);
    // 绘制刻度数字
    drawVerticalAxisLabels(ctx, obj);
  };

  // 绘制垂直坐标文字
  const drawVerticalAxisLabels = (ctx: any, obj: any) => {
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '12px Verdana';
    ctx.fillStyle = '#000';
    for (let i = 1; i < obj.canvasHeight / space; ++i) {
      if (i % 2 === 0) {
        ctx.fillText(
          `${((i * totalWater * space) / obj.canvasHeight).toFixed(1)}`,
          obj.x0 - 10,
          obj.y0 - i * space + 1.5,
        );
      }
    }
  };

  // 绘制当前水位高度和文字
  const drawCurrent = (ctx: any, obj: any) => {
    obj.curWaterHeight =
      obj.canvasHeight - (curWater * obj.canvasHeight) / totalWater;
    drawDashes(ctx, obj.curWaterHeight, 'rgba(75, 142, 244)', obj);
    drawText(
      ctx,
      obj.x0 + 20,
      obj.curWaterHeight - 5,
      'rgba(75, 142, 244)',
      undefined,
      'rgba(75, 142, 244)',
      // curWater,
      `当前水位：${curWater}`,
    );
  };

  // 绘制预警水位线/文字
  const drawWarning = (ctx: any, obj: any) => {
    const warnWaterHeight =
      obj.canvasHeight - (warnWater * obj.canvasHeight) / totalWater;
    drawDashes(ctx, warnWaterHeight, '#FF5E17', obj);
    drawText(
      ctx,
      obj.x0 + 120,
      warnWaterHeight - 5,
      '#FF5E17',
      undefined,
      '#999',
      // warnWater,
      `预警水位：${warnWater}`,
    );
  };

  // 绘制大坝顶部刻度线/文字
  const drawCrestElevation = (ctx: any, obj: any) => {
    // 得到大坝在canvas中的高度
    obj.crestElevationHeight =
      obj.canvasHeight - (crestElevation * obj.canvasHeight) / totalWater;
    drawDashes(ctx, obj.crestElevationHeight, '#214F7C', obj);
    drawText(
      ctx,
      obj.x0 + 60,
      obj.crestElevationHeight - 5,
      '#214F7C',
      undefined,
      '#999',
      `坝顶高度：${crestElevation}`,
    );
  };

  // 绘制死水位高度刻度线/文字
  const drawDead = (ctx: any, obj: any) => {
    obj.deadWaterHeight =
      obj.canvasHeight - (deadWater * obj.canvasHeight) / totalWater;
    drawDashes(ctx, obj.deadWaterHeight, '#A9A9A9', obj);
    drawText(
      ctx,
      obj.x0 + 70,
      obj.deadWaterHeight - 5,
      '#A9A9A9',
      undefined,
      '#999',
      // deadWater,
      `死水位：${deadWater}`,
    );
  };

  // 绘制大坝区域
  const drawBasicDam = (ctx: any, obj: any) => {
    ctx.beginPath();
    // 设置线宽
    ctx.lineWidth = 2;
    ctx.moveTo(imageHeight - crestWidthTop * 1.5, obj.crestElevationHeight); // 上边宽度
    // 大坝左侧观望台
    ctx.lineTo(
      imageHeight - crestWidthTop * 1.5,
      obj.crestElevationHeight - 10,
    );
    ctx.lineTo(
      imageHeight - crestWidthTop * 1.5 + 5,
      obj.crestElevationHeight - 10,
    );
    ctx.lineTo(imageHeight - crestWidthTop * 1.5 + 5, obj.crestElevationHeight); // 左侧观望台
    ctx.lineTo(imageHeight + crestWidthTop * 7, obj.crestElevationHeight); // 上边宽度
    // 大坝右侧观望台
    ctx.lineTo(imageHeight + crestWidthTop * 7, obj.crestElevationHeight - 10);
    ctx.lineTo(
      imageHeight + crestWidthTop * 7 + 5,
      obj.crestElevationHeight - 10,
    );
    ctx.lineTo(imageHeight + crestWidthTop * 7 + 5, obj.crestElevationHeight); // 右侧观望台
    ctx.lineTo(imageHeight * 2, obj.canvasHeight); // 右边侧边
    ctx.lineTo(imageHeight - crestWidthTop * 2, obj.canvasHeight); // 底部边
    ctx.lineTo(imageHeight - crestWidthTop * 1.5, obj.crestElevationHeight); // 左边侧边
    ctx.strokeStyle = '#97A5AE';
    ctx.stroke();
    ctx.fillStyle = '#D5DBDF';
    ctx.fill();
    drawDamDataGuide(ctx, obj, true); // 绘制引导线
    drawDamWater(ctx, obj, true); // 绘制引导线
  };

  // 绘制梯形大坝
  const drawTrapDam = (ctx: any, obj: any) => {
    ctx.beginPath();
    // 设置线宽
    ctx.lineWidth = 2;
    ctx.moveTo(imageHeight - crestWidthTop * 1.5, obj.crestElevationHeight); // 上边宽度
    // 大坝左侧观望台
    ctx.lineTo(
      imageHeight - crestWidthTop * 1.5,
      obj.crestElevationHeight - 10,
    );
    ctx.lineTo(
      imageHeight - crestWidthTop * 1.5 + 5,
      obj.crestElevationHeight - 10,
    );
    ctx.lineTo(imageHeight - crestWidthTop * 1.5 + 5, obj.crestElevationHeight); // 左侧观望台
    ctx.lineTo(imageHeight + crestWidthTop * 7, obj.crestElevationHeight); // 上边宽度
    // 大坝右侧观望台
    ctx.lineTo(imageHeight + crestWidthTop * 7, obj.crestElevationHeight - 10);
    ctx.lineTo(
      imageHeight + crestWidthTop * 7 + 5,
      obj.crestElevationHeight - 10,
    );
    ctx.lineTo(imageHeight + crestWidthTop * 7 + 5, obj.crestElevationHeight); // 右侧观望台
    ctx.lineTo(imageHeight * 2, obj.canvasHeight); // 右边侧边
    ctx.lineTo(imageHeight / 2, obj.canvasHeight); // 底部边
    ctx.lineTo(imageHeight - crestWidthTop * 1.5, obj.crestElevationHeight); // 左边侧边
    ctx.strokeStyle = '#97A5AE';
    ctx.stroke();
    ctx.fillStyle = '#D5DBDF';
    ctx.fill();
    drawDamDataGuide(ctx, obj, false); // 绘制引导线
    drawDamWater(ctx, obj, false); // 绘制引导线
  };

  // 绘制大坝数据指引线
  const drawDamDataGuide = (ctx: any, obj: any, flag: boolean) => {
    ctx.beginPath();
    ctx.setLineDash([5, 4]);
    // 设置线宽
    ctx.lineWidth = 5;
    ctx.moveTo(imageHeight - crestWidthTop * 1.5 + 2, obj.crestElevationHeight); // 起始位置
    ctx.lineTo(imageHeight - crestWidthTop * 1.5 + 2, obj.canvasHeight);
    ctx.strokeStyle = '#000'; // 设置线条颜色
    ctx.stroke(); // 结束绘制

    // 中位引导线
    ctx.beginPath();
    // 设置线宽
    ctx.lineWidth = 1;
    ctx.moveTo(imageHeight + crestWidthTop * 2.7, obj.crestElevationHeight); // 起始位置
    ctx.lineTo(imageHeight + crestWidthTop * 2.7, obj.canvasHeight);
    // ctx.setLineDash([5, 4]);
    ctx.strokeStyle = '#0006'; // 设置线条颜色
    ctx.stroke(); // 结束绘制
    ctx.setLineDash([]);

    // 测压计
    ctx.beginPath();
    if (flag) {
      ctx.moveTo(
        imageHeight + crestWidthTop * 2.7 + 20,
        obj.crestElevationHeight - 10,
      ); // 起始位置
      ctx.lineTo(imageHeight + crestWidthTop * 2.7 + 20, obj.canvasHeight);
    } else {
      ctx.moveTo(
        imageHeight + crestWidthTop * 2,
        obj.crestElevationHeight - 10,
      ); // 起始位置
      ctx.lineTo(imageHeight + crestWidthTop * 2, obj.canvasHeight);
    }
    ctx.strokeStyle = '#0007'; // 设置线条颜色
    ctx.stroke(); // 结束绘制
    // 添加文字
    drawGuideText(
      ctx,
      flag
        ? imageHeight + crestWidthTop * 2.7 + 25
        : imageHeight + crestWidthTop - 20,
      obj.canvasHeight / 1.2,
      'rgba(0, 0, 0)',
      '测压计',
    );
  };

  // 绘制大坝浸润度
  const drawDamWater = (ctx: any, obj: any, flag: boolean) => {
    ctx.beginPath(); // 开始绘制
    // 设置线宽
    ctx.lineWidth = 2;
    if (flag) {
      ctx.moveTo(imageHeight - crestWidthTop * 1.5 - 5, obj.curWaterHeight); // 起始位置
      ctx.lineTo(
        imageHeight + crestWidthTop * 2.7 + 20,
        obj.canvasHeight / 1.2,
      );
      ctx.lineTo(imageHeight + crestWidthTop * 12, obj.canvasHeight);
      ctx.lineTo(imageHeight - crestWidthTop * 2, obj.canvasHeight);
      ctx.lineTo(imageHeight - crestWidthTop * 1.5 - 5, obj.curWaterHeight);
    } else {
      ctx.moveTo(imageHeight - crestWidthTop * 3.7, obj.curWaterHeight); // 起始位置
      ctx.lineTo(imageHeight + crestWidthTop * 2, obj.canvasHeight / 1.15);
      ctx.lineTo(imageHeight + crestWidthTop * 12, obj.canvasHeight);
      ctx.lineTo(imageHeight / 2, obj.canvasHeight);
      ctx.lineTo(imageHeight - crestWidthTop * 3.7, obj.curWaterHeight);
    }
    ctx.strokeStyle = '#f000'; // 设置线条颜色
    ctx.stroke(); // 结束绘制
    ctx.fillStyle = '#86b7f860'; // 填充颜色
    ctx.fill();

    // 添加文字
    drawGuideText(
      ctx,
      imageHeight + crestWidthTop * 7,
      obj.canvasHeight / 1.08,
      'rgba(0, 0, 0)',
      '浸润线',
    );
  };

  // 绘制各种线条
  const drawDashes = (
    ctx: any,
    height: number,
    strokeColor: string,
    obj: any,
  ) => {
    ctx.beginPath();
    // 设置线宽
    ctx.lineWidth = 1;
    // 设置间距（参数为无限数组，虚线的样式会随数组循环）
    ctx.setLineDash([6, 3]);
    // 移动画笔至坐标 x20 y20 的位置
    ctx.moveTo(obj.x0, height);
    // 绘制到坐标 x70, y100 的位置
    ctx.lineTo(obj.canvasWidth, height);
    // 填充颜色
    ctx.strokeStyle = strokeColor;
    // 开始填充
    ctx.stroke();
    ctx.closePath();
    // 切换回实线
    ctx.setLineDash([]);
  };

  // 绘制水位文字
  const drawText = (
    ctx: any,
    x: number,
    y: number,
    fontcolor: string,
    label: string | undefined,
    labelcolor: string,
    value: number | string,
  ) => {
    ctx.beginPath();
    ctx.textBaseline = 'bottom';
    ctx.font = 'bold 12px 微软雅黑';
    if (label) {
      ctx.fillStyle = labelcolor;
      ctx.textAlign = 'start';
      ctx.fillText(label, x + 10, y);
    }
    if (value) {
      ctx.fillStyle = fontcolor;
      ctx.textAlign = 'start';
      // ctx.fillText(`${value}m`, x + 80, y)
      ctx.fillText(`${value}m`, x, y);
    }
    ctx.closePath();
  };

  // 绘制水位文字
  const drawGuideText = (
    ctx: any,
    x: number,
    y: number,
    fontcolor: string,
    value: number | string,
  ) => {
    ctx.beginPath();
    ctx.textBaseline = 'bottom';
    ctx.font = 'bold 12px 微软雅黑';
    ctx.fillStyle = fontcolor;
    ctx.textAlign = 'start';
    ctx.fillText(value, x, y);
    ctx.moveTo(x - 3, y); // 起始位置
    ctx.lineTo(x + 37, y); // 起始位置
    ctx.strokeStyle = '#000'; // 设置线条颜色
    ctx.stroke(); // 结束绘制
    ctx.closePath();
  };

  return (
    <div className={styles.content_tab}>
      {/* legend标题 */}
      <div className={styles.header}>
        <span>{title}</span>
        <div className={styles.lengend}>
          <div className={styles.sishuiwei}>
            <span className={styles.label}>死水位</span>
          </div>
          <div className={styles.xuxian}>
            <span className={styles.label}>汛限水位</span>
          </div>
          <div className={styles.bading}>
            <span className={styles.label}>坝顶高程</span>
          </div>
          <div className={styles.dangqian}>
            <span className={styles.label}>当前水位</span>
          </div>
        </div>
      </div>

      {/* 坝前水位示意图 */}
      <canvas id="canvas" width={imageWidth} height={imageHeight} />

      {/* X轴导航 */}
      <div
        id="panel"
        className={styles.ground}
        style={{
          width: imageWidth,
          backgroundSize: `100% 6px`,
        }}
      />
    </div>
  );
};

export default DbModel;
