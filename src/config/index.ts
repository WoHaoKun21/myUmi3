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
