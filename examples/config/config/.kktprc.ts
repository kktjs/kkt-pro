import pkg from '../package.json';
export default {
  initEntery: true,
  initRoute: { fallbackElement: '@/Loading' },
  initModel: true,
  define: {
    VERSION: pkg.version,
  },
};
