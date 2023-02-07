import webpack from 'webpack';
import fs from 'fs-extra';
import { LoaderConfOptions, WebpackConfiguration } from 'kkt';
import { overridePaths } from 'kkt/lib/overrides/paths';
import path from 'path';
import { OverrideKKTPConfigProps } from './interface';
import { transformationDefineString, getKKTPPlugins, getWebpackPlugins, getInitPlugin } from './utils';
/**
 * @Description: 默认配置
 *
 * 1. 用于简化覆写`kkt`配置
 */
const overrideKKTPConfig = (
  overrideConfigProps: OverrideKKTPConfigProps,
  conf: WebpackConfiguration,
  env: 'development' | 'production',
  options?: LoaderConfOptions,
) => {
  const {
    publicPath: prefix = '/',
    define = {},
    proxySetup,
    plugins = [],
    alias = {},
    kktPlugins,
    overrideWebpack,
    output = {},
    /**自动生成文件目录**/
    tempDirName = '.kktp',
    /**自动生成入口文件*/
    initEntery = false,
    /**路由配置*/
    initRoute = false,
    /**自动生成models集合配置文件*/
    initModel = false,
    ...rest
  } = overrideConfigProps;
  conf.output = { ...conf.output, ...output, publicPath: prefix };
  if (env === 'development') {
    conf.output.publicPath = '/';
  }
  conf.resolve = {
    ...conf.resolve,
    alias: {
      ...conf.resolve?.alias,
      '@': options.paths.appSrc,
      '@@': path.resolve(options.paths.appSrc, '.kktp'),
      ...(alias || {}),
    },
  };
  const publicPath = conf.output.publicPath as string;
  let prefixStr = ((publicPath.startsWith('/') ? publicPath : '/') + '/').replace(/\/+$/, '/');
  prefixStr = prefixStr.endsWith('/') ? prefixStr : prefixStr + '/';
  /**处理kktp plugin**/
  conf = getKKTPPlugins(kktPlugins, conf, env, options);
  /**处理 webpack plugin**/
  const newPlugins = getWebpackPlugins(getInitPlugin(overrideConfigProps));

  // 修复 publicUrlOrPath 指向新的前缀
  // 此举完美的解决了命令启动跳转新路由，路由刷新空白的问题
  overridePaths(undefined, { publicUrlOrPath: prefixStr });
  conf.plugins.push(
    new webpack.DefinePlugin({
      ...transformationDefineString(define || {}),
      PREFIX: JSON.stringify(prefixStr),
    }),
    ...newPlugins,
  );
  /** 约定配置代理 */
  const mockerPath = path.resolve(options.paths.appPath, './mocker/index.js');
  if (proxySetup) {
    conf.proxySetup = proxySetup;
  } else if (fs.existsSync(mockerPath)) {
    conf.proxySetup = (app) => ({
      path: path.resolve('./mocker/index.js'),
    });
  }
  if (overrideWebpack) {
    return overrideWebpack({ ...conf, ...rest }, env, options);
  }
  return conf;
};

export default overrideKKTPConfig;
