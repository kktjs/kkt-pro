import pkg from '../package.json';
export default {
  initEntery: true,
  initRoute: {
    fallbackElement: '@/Loading',
    authElement: '@/Auth',
    autoRoute: true,
    outletLayout: '@/layouts',
  },
  initModel: true,
  define: {
    VERSION: pkg.version,
  },
};
