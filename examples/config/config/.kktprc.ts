import pkg from '../package.json';
export default {
  initEntery: true,
  initRoutes: {
    fallbackElement: '@/loading',
  },
  initModel: true,
  define: {
    VERSION: pkg.version,
  },
};
