import { useEffect } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import './comm.less';

const ItemTwo = () => {
  const initChart = async () => {
    const data = await axios('./mock/two.json');
    const myChart = echarts.init(document.getElementById('myEchartsTwo'));
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#e6b600',
          },
        },
      },
      legend: {
        data: ['服饰', '数码', '家电', '家居', '日化'],
      },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.data.chartData.day,
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
      },
      series: [
        {
          name: '服饰',
          type: 'line',
          data: data.data.chartData.num.Chemicals,
          smooth: true,
          showSymbol: false,
          stack: 'Total',
          lineStyle: {
            width: 0,
          },
          emphasis: {
            focus: 'series',
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)',
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)',
              },
            ]),
          },
        },
        {
          name: '数码',
          type: 'line',
          data: data.data.chartData.num.Clothes,
          stack: 'Total', //数据堆叠
          smooth: true, //折线图平滑效果 变成曲线图
          showSymbol: false, //   隐藏所有数据点

          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)',
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)',
              },
            ]),
          },
          lineStyle: {
            // 设置线段样式
            width: 0,
          },
          emphasis: {
            //设置高亮的图形样式和标签样式
            focus: 'series', //只显示选中的内容高亮
          },
        },
        {
          name: '家电',
          type: 'line',
          data: data.data.chartData.num.Electrical,
          stack: 'Total', //数据堆叠
          smooth: true, //折线图平滑效果 变成曲线图
          showSymbol: false, //   隐藏所有数据点

          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)',
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)',
              },
            ]),
          },
          lineStyle: {
            // 设置线段样式
            width: 0,
          },
          emphasis: {
            //设置高亮的图形样式和标签样式
            focus: 'series', //只显示选中的内容高亮
          },
        },
        {
          name: '家居',
          type: 'line',
          data: data.data.chartData.num.digit,
          stack: 'Total', //数据堆叠
          smooth: true, //折线图平滑效果 变成曲线图
          showSymbol: false, //   隐藏所有数据点

          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)',
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)',
              },
            ]),
          },
          lineStyle: {
            // 设置线段样式
            width: 0,
          },
          emphasis: {
            //设置高亮的图形样式和标签样式
            focus: 'series', //只显示选中的内容高亮
          },
        },
        {
          name: '日化',
          type: 'line',
          data: data.data.chartData.num.gear,
          stack: 'Total', //数据堆叠
          smooth: true, //折线图平滑效果 变成曲线图
          showSymbol: false, //   隐藏所有数据点

          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 191, 0)',
              },
              {
                offset: 1,
                color: 'rgb(224, 62, 76)',
              },
            ]),
          },
          lineStyle: {
            // 设置线段样式
            width: 0,
          },
          emphasis: {
            //设置高亮的图形样式和标签样式
            focus: 'series', //只显示选中的内容高亮
          },
        },
      ],
    });
  };
  useEffect(() => {
    initChart();
  }, []);
  return (
    <div>
      <h2>周销图</h2>
      <div className="chart" id="myEchartsTwo">
        图表的容器
      </div>
    </div>
  );
};
export default ItemTwo;
