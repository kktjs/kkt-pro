import pkg from '../package.json';
export default {
  initEntery: true,
  initRoute: {
    autoRoute: true,
    outletLayout: '@/layouts',
  },
  initModel: true,
  define: {
    VERSION: pkg.version,
  },
};
