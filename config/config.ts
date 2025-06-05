import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  // publicPath: '/dist/',// 静态资源引入路径
  hash: true,
  antd: {},
  dva: { hmr: true },
  // // 自定义layout开启后，这里要关闭
  // layout: {
  //   // https://umijs.org/zh-CN/plugins/plugin-layout
  //   locale: true,
  //   siderWidth: 155,
  // },
  routes,
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  theme: {
    // 用来配置全局的antd样式
    // 'root-entry-name': 'variable', // 全局样式的入口文件
    'primary-color': '#67b1fa', // 全局主色
    'link-color': '#67b1fa', // 链接色
    'success-color': '#60ad82', // 成功色
    'warning-color': '#f1c40f', // 警告色
    'error-color': '#e66d73', // 错误色
    'primary-1': '#eaedff', // 背景色
    'primary-2': '#e4e8fe', // 背景色
    'primary-5': '#67b1fa',
    'primary-color-active': '#67b1fa', // 点击色
    'primary-color-hover': '#67b1fa', // 划入色
    '@font-size': '14px', // 主字号
  },
  esbuild: {}, // 使用esbuild编译，
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    '/api': {
      target: 'http://211.90.240.131:8083/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  manifest: {
    basePath: '/',
  },
  history: {
    type: 'browser',
    options: {
      basename: '/',
      trailingSlash: false, // 关闭自动添加斜杠
    },
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: { type: 'none' },
  // mfsu: {},
  // webpack5: {},
  exportStatic: {},
  // extraPostCSSPlugins: [// 用于配置样式的插件
  //   pxtorem({
  //     rootValue: 192, // 根据设计稿设置
  //     propList: ['*'], //
  //   }),
  // ],
});
