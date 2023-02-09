import pkg from '../package.json';
export default {
  initEntery: true,
  initRoute: {
    fallbackElement: '@/Loading',
    authElement: '@/Auth',
  },
  initModel: true,
  define: {
    VERSION: pkg.version,
  },
};
