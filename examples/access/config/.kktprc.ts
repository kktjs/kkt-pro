import pkg from '../package.json';
import path from 'path';

export default {
  initEntery: true,
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
  icons: true,
  // rules: [
  //   {
  //     test: /\.svg$/,
  //     loader: 'svg-sprite-loader',
  //     options: {
  //       // symbolId: 'icon-[name]'
  //     }
  //   }
  // ]
};
