import { mdCodeModulesLoader } from 'markdown-react-code-preview-loader';
import type { WebpackConfiguration, LoaderConfOptions } from 'kkt';
import pkg from '../package.json';
const webpack = require('webpack');

export default {
  initEntery: true,
  initRoutes: true,
  define: {
    VERSION: pkg.version,
  },
  publicPath: './',
  overrideWebpack: (
    conf: WebpackConfiguration,
    env: 'development' | 'production',
    options: LoaderConfOptions | undefined,
  ) => {
    /** https://github.com/uiwjs/react-code-preview/issues/94 */
    conf.module!.exprContextCritical = false;
    conf.module!.exprContextRecursive = false;
    conf = mdCodeModulesLoader(conf);
    return conf;
  },
};
