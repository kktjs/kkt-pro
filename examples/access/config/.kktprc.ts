import pkg from '../package.json';
export default {
  initEntery: true,
  queryClient: true,
  initRoutes: {
    routesOutletElement: '@/routesOutletElement',
    fallbackElement: '@/loading',
  },
  initModel: true,
  define: {
    VERSION: pkg.version,
  },
  access: true,
  analyze: {
    analyzerPort: '2222',
  },
};
