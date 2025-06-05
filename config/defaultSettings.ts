import type { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // 地址：https://procomponents.ant.design/components/layout
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  footerRender: false,
  colorWeak: false,
  menu: { locale: false },
  title: '水文数据监测平台',
  pwa: false,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
};

export const themeSetting = {
  // '@primary-color': '#437ef9', // 全局主色
  // '@link-color': '#437ef9', // 链接色
  '@success-color': '#60ad82', // 成功色
  '@warning-color': '#f1c40f', // 警告色
  '@error-color': '#e66d73', // 错误色
  '@primary-1': '#eaf3ff', // 背景色
  '@primary-2': '#e4e8fe', // 背景色
  // '@primary-5': '#437ef9',
  // '@primary-color-active': '#437ef9', // 点击色
  // '@primary-color-hover': '#437ef9', // 划入色
  '@font-size-base': '14px', // 主字号
  '@border-radius-base': '2px', // 组件/浮层圆角
  // '@border-color-base': '#d9d9d9', // 边框色
  // '@disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
  // '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
  // '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
  // '@box-shadow-base':
  // '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)', // 浮层阴影
};

export default Settings;
