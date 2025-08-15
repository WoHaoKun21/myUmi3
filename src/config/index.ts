import LunarCalendar from 'lunar-calendar';

// 时间戳转多少分钟之前
export function getDateDiff(dateTimeStamp: string) {
  // 时间字符串转时间戳
  const timestamp = new Date(dateTimeStamp).getTime(); // 获取指定时间的时间戳
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  const now = new Date().getTime();
  const diffValue = now - timestamp;
  let result;
  if (diffValue < 0) {
    return;
  }
  const yearC: any = diffValue / year;
  const monthC: any = diffValue / month;
  const weekC: any = diffValue / (7 * day);
  const dayC: any = diffValue / day;
  const hourC: any = diffValue / hour;
  const minC: any = diffValue / minute;
  if (yearC >= 1) {
    result = '' + parseInt(yearC) + '年前';
  } else if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前';
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前';
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前';
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前';
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前';
  } else result = '刚刚';
  return result;
}

// 获取当前时间
export const timeHandel = () => {
  const date = new Date();
  const year = date.getFullYear(); // 年
  const month = date.getMonth() + 1; // 月
  const day = date.getDate(); // 日
  let hour: string | number = date.getHours(); // 时
  hour = hour < 10 ? '0' + hour : hour; // 如果只有一位，则前面补零
  let minute: string | number = date.getMinutes(); // 分
  minute = minute < 10 ? '0' + minute : minute; //补零
  let second: string | number = date.getSeconds(); // 秒
  second = second < 10 ? '0' + second : second; //补零

  const lunar = LunarCalendar.solarToLunar(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
  return {
    solar: `${year}.${month}.${day} ${hour}:${minute}`,
    lunar: `${lunar.lunarMonthName}${lunar.lunarDayName}`,
    second,
  };
};

export class WS {
  url: string;
  prot: string;
  ws: any;
  // 错误消息队列
  errorStack: [];
  // 是否在重连中
  isReconnectionLoading: boolean;
  // 是否是用户手动关闭连接
  isCustomClose: boolean;
  // 延时重连的 id
  timeId: any;

  constructor(url: string, prot = '') {
    this.url = url;
    this.prot = prot;
    this.isCustomClose = false;
    this.isReconnectionLoading = false;
    this.errorStack = [];
    // 开始初始化
    this.createWs();
  }
  // 创建WebScoket，并进行监听
  createWs() {
    this.ws = new WebSocket(this.url);
    if (this.prot) {
      this.ws = new WebSocket(this.url, this.prot);
    }
    // 事件监听
    this.onopen();
    this.onerror();
    this.onclose();
    this.onmessage();
  }

  // 连接成功
  onopen() {
    this.ws.onopen = () => {
      // 发送成功连接之前所发送失败的消息
      this.errorStack.forEach((message) => {
        this.send(message);
      });
      this.errorStack = [];
      this.isReconnectionLoading = false; //
    };
  }
  // 监听失败/建立连接失败
  onerror() {
    this.ws.onerror = () => {
      this.reconnection();
      this.isReconnectionLoading = false;
    };
  }
  // 关闭连接
  onclose() {
    this.ws.onclose = () => {
      // 用户手动关闭的不重连
      if (this.isCustomClose) return;
      this.reconnection();
      this.isReconnectionLoading = false;
    };
  }
  // 接受消息
  onmessage() {
    this.ws.onmessage = () => {};
  }
  // 重新建立连接
  reconnection() {
    // 防止重复
    if (this.isReconnectionLoading) return;
    this.isReconnectionLoading = true; // 连接开始
    clearTimeout(this.timeId);
    this.timeId = setTimeout(() => {
      this.createWs();
    }, 3000);
  }
  // 发送消息
  send(message: never) {
    // 连接失败时的处理
    if (this.ws.readyState !== 1) {
      this.errorStack.push(message);
      return;
    }
    this.ws.send(message);
  }

  // 手动关闭
  close() {
    this.isCustomClose = true;
    this.ws.close();
  }
  // 手动开启
  start() {
    this.isCustomClose = false;
    this.reconnection();
  }

  // 销毁
  destroy() {
    this.close();
    this.ws = null;
    this.errorStack = [];
  }
}
