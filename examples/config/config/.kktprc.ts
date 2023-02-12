import pkg from '../package.json';
export default {
  initEntery: true,
  initRoutes: true,
  initModel: true,
  define: {
    VERSION: pkg.version,
  },
};
