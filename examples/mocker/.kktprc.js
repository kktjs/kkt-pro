import pkg from './package.json';
export default {
  initEntery: true,
  initRoutes: {
    autoRoutes: true,
  },
  define: {
    VERSION: pkg.version,
  },
};
