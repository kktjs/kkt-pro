import pkg from '../package.json';
export default {
  initEntery: true,
  initRoutes: {
    fallbackElement: '@/Loading',
    authElement: '@/Auth',
  },
  initModel: true,
  define: {
    VERSION: pkg.version,
  },
};
