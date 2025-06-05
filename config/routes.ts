import type { Route } from '@ant-design/pro-layout/lib/typings';

const routes: Route[] = [
  {
    path: '/',
    component: '@/layouts',
    routes: [
      { path: '/', redirect: '/excel', hideInMenu: true },
      {
        name: '文件批量处理',
        path: '/excel',
        component: './ExcelReader',
        icon: '/comm/home',
      },
      {
        path: '/leaflet',
        name: 'Leflets的使用',
        icon: '/comm/analy',
        routes: [
          {
            path: '/leaflet/tdMap',
            name: 'Leflets加载天地图',
            component: './Leaflet/leafletTD',
          },
          {
            path: '/leaflet/gdMap',
            name: 'Leflets加载高德地图',
            component: './Leaflet/leafletGD',
          },
          {
            path: '/leaflet/bdSwitch',
            name: 'Leflets百度地图图层切换',
            component: './Leaflet/leafletBDSwitch',
          },
        ],
      },
      {
        name: '百度地图',
        path: '/BDMap',
        component: './BDMap',
        icon: '/comm/info',
      },
      {
        path: '/gdMap',
        name: '高德地图',
        icon: '/comm/biaoge',
        routes: [
          {
            path: '/gdMap/inputSearch',
            name: '高德地图',
            component: './GdMap/map',
          },
          {
            path: '/gdMap/gdSate',
            name: '高德卫星图',
            component: './GdMap/gdState',
          },
          {
            path: '/gdMap/trangle',
            name: '高德地图绘制',
            component: './GdMap/gdTrangleMap',
          },
          {
            path: '/gdMap/flyInfoPop',
            name: '飞到信息框',
            component: './GdMap/flyInfoPop',
          },
        ],
      },
      {
        path: '/model',
        name: '3D模型',
        icon: '/comm/data',
        routes: [
          {
            path: '/model/threeJs',
            name: 'ThreeJs的使用',
            component: './Model/ThreeJs',
          },
          {
            path: '/model/orillusion',
            name: 'Orillusion模型',
            component: './Model/OrillusionMode',
          },
        ],
      },
      {
        name: 'Echarts',
        path: '/echarts',
        icon: '/comm/device',
        routes: [
          {
            name: 'Echarts折线走势图',
            path: '/echarts/line',
            component: './Echarts/EchartLine',
          },
          {
            name: 'Echarts折线图',
            path: '/echarts/EchartsLine',
            component: './Echarts/EchartsLine',
          },
          {
            name: '数据编辑',
            path: '/echarts/api',
            component: './Echarts/EchartsAPI',
          },
          {
            name: '大坝模型图',
            path: '/echarts/dbModal',
            component: './Echarts/DbModal',
          },
          {
            name: '3D柱状图',
            path: '/echarts/3DEchartBar',
            component: './Echarts/3DEchartBar',
          },
          {
            name: 'Echarts3D饼状图',
            path: '/echarts/echartPie',
            component: './Echarts/3DEchartPie',
          },
          {
            name: 'Echarts地图',
            path: '/echarts/echartsMap',
            component: './Echarts/EchartsMap',
          },
          {
            name: 'Echarts地图2',
            path: '/echarts/echartsMapTwo',
            component: './Echarts/EchartsMapTwo',
          },
        ],
      },
      {
        name: 'React功能',
        path: '/react',
        icon: '/comm/logo',
        routes: [
          {
            name: 'dva使用',
            path: '/react/dva',
            component: './Dva',
          },
          {
            name: 'react18',
            path: '/react/react18',
            component: './ReactEight/react18',
          },
          {
            name: '新hooks',
            path: '/react/newSwr',
            component: './ReactEight/newSwr',
          },
        ],
      },
      {
        name: 'antd组件',
        path: '/antd',
        icon: '/comm/logo',
        routes: [
          {
            name: '手风琴',
            path: '/antd/collapse',
            component: './Antd/Collapse',
          },
          // {
          //   path: '/antd/sLzj',
          //   name: '示例组件',
          //   component: './Antd/SLzj',
          // },
        ],
      },
      {
        name: 'UI大屏',
        path: '/UIBig',
        component: './UIBig',
        icon: '/comm/monitor',
      },
    ],
  },
];

export default routes;
