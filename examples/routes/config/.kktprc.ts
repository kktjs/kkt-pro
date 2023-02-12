import pkg from '../package.json';
export default {
  initEntery: true,
  initRoutes: true,
  define: {
    VERSION: pkg.version,
  },
};
