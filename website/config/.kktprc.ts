import { mdCodeModulesLoader } from 'markdown-react-code-preview-loader';
import type { WebpackConfiguration, LoaderConfOptions } from 'kkt';
import pkg from '../package.json';

export default {
  initEntery: true,
  initRoutes: {
    fallbackElement: '@/loading',
  },
  initModel: true,
  define: {
    VERSION: pkg.version,
  },
  publicPath: './',
  overrideWebpack: (
    conf: WebpackConfiguration,
    env: 'development' | 'production',
    options: LoaderConfOptions | undefined,
  ) => {
    conf = mdCodeModulesLoader(conf);
    return conf;
  },
};
