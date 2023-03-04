import pkg from './package.json';
export default {
  initEntery: true,
  initRoutes: { autoRoutes: true },
  initModel: '@/hooks',
  // initModel: true,
  define: {
    VERSION: pkg.version,
  },
};
