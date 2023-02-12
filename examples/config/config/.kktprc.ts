import pkg from '../package.json';
export default {
  initEntery: true,
  initRoutes: {
    routesOutletElement: '@/routesOutletElement',
  },
  initModel: true,
  define: {
    VERSION: pkg.version,
  },
};
