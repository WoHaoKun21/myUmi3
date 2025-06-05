// 类型创建
interface state {
  canvasWidth: number; // 轴长
  canvasHeight: number; // 轴高（总水位所占画布高度）
  waveHeight?: number; // 当前水位所占画布高度
  outCanvasHeight?: number; // 坐标轴画布高度
  A: number;
  W: number;
  speed: number;
  Q: number;
  colors: string[]; // 波浪颜色
  x0: number;
  y0: number;
}

// 创建类
class Wave {
  canvasWidth: number;
  canvasHeight: number | undefined;
  waveHeight: number | undefined;
  A: number;
  W: number;
  speed: number;
  Q: number;
  H: number;
  colors: string[];
  x0: number;
  y0: number;
  constructor(obj: state) {
    const {
      canvasWidth, // 轴长
      canvasHeight = 0, // 轴高（总水位所占画布高度）
      waveHeight, // 当前水位所占画布高度
      outCanvasHeight = 0, // 坐标轴画布高度
      A,
      W,
      speed,
      Q,
      colors, // 波浪颜色
      x0,
      y0,
    } = obj;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.waveHeight = waveHeight;
    this.canvasHeight = outCanvasHeight;
    this.A = A;
    this.W = W;
    this.speed = speed;
    this.Q = Q;
    this.H = canvasHeight / 2 + A; // h表示图像向y轴正方向（向下）平移的长度。此处+A是为了让正弦曲线的高度纠正为最高点，而不是中点
    this.colors = colors;
    this.x0 = x0;
    this.y0 = y0;
  }

  draw(ctx: any) {
    // // 创建渐变
    // const lingrad = ctx.createLinearGradient(0, 0, this.canvasWidth, 0);
    // lingrad.addColorStop(0, this.colors[0]); // 坝前颜色
    // lingrad.addColorStop(1, this.colors[0]); // 坝后颜色
    // 坝前水域创建
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.fillStyle = this.colors[0];
    ctx.lineWidth = 1;
    ctx.moveTo(this.x0, 99999999);
    this.Q += this.speed;

    let afterWater = 0;
    // 调整坝前水位
    for (let x = this.x0; x <= this.canvasWidth / 2; x++) {
      var y = this.A * Math.sin(this.W * x + this.Q) + this.H;
      ctx.lineTo(x, y);
      afterWater = x;
    }
    ctx.lineTo(this.canvasWidth, this.outCanvasHeight);
    ctx.lineTo(this.x0, this.outCanvasHeight);
    ctx.fill();
    ctx.closePath();

    // // 坝后水域创建————————————————————
    // ctx.beginPath();
    // ctx.strokeStyle = '#000';
    // ctx.fillStyle = this.colors[1];
    // ctx.lineWidth = 1;
    // ctx.moveTo(this.x0, 99999999);
    // this.Q += this.speed;
    // // 调整坝后水位
    // for (let x = afterWater; x <= this.canvasWidth; x++) {
    //   var y = this.A * Math.sin(this.W * x + this.Q) + this.H;
    //   ctx.lineTo(x, y + 40);
    // }
    // ctx.lineTo(this.canvasWidth, this.outCanvasHeight);
    // ctx.lineTo(this.x0, this.outCanvasHeight);
    // ctx.fill();
    // ctx.closePath();
  }
  outCanvasHeight(canvasWidth: number, outCanvasHeight: any) {
    console.log(123456789);
    throw new Error('Method not implemented.');
  }
}

export default Wave;
