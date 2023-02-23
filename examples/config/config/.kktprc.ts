import pkg from '../package.json';
export default {
  initEntery: true,
  initRoutes: {
    // layouts
    // outletLayout: '@/layouts', // 自动生成路由layout布局组件地址
    // autoRoutes: true,
    // routesOutletElement: '@/routesOutletElement',
  },
  initModel: true,
  define: {
    VERSION: pkg.version,
  },
};
