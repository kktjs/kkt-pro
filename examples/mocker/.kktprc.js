import pkg from './package.json';
export default {
  initEntery: true,
  initRoute: {
    autoRoute: true,
  },
  define: {
    VERSION: pkg.version,
  },
};
