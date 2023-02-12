import pkg from '../package.json';
export default {
  initEntery: true,
  initRoutes: {
    fallbackElement: '@/Loading',
    authElement: '@/Auth',
    autoRoutes: true,
    outletLayout: '@/layouts',
  },
  initModel: true,
  define: {
    VERSION: pkg.version,
  },
};
