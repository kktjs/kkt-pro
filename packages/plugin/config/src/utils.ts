import { LoaderConfOptions, WebpackConfiguration } from 'kkt';

import { DefaultDefineType, PluginsType, KKTPlugins } from './interface';
/** 全局默认公共参数  */
export const defaultDefine: DefaultDefineType = {};

export const transformationDefineString = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};
  Object.entries(obj).forEach(([key, value]) => {
    result[key] = JSON.stringify(value);
  });
  return result;
};

export const getFunDefault = (path?: string) => {
  if (path) {
    const fun = require(path);
    return fun.default || fun;
  }
  return () => {};
};

export const getWebpackPlugins = (plugins: PluginsType) => {
  // webpack plugin
  const plugin: WebpackConfiguration['plugins'] = [];
  if (Array.isArray(plugins)) {
    plugins.forEach((pathArr) => {
      if (typeof pathArr === 'string') {
        const Cls = getFunDefault(pathArr);
        plugin.push(new Cls());
      } else if (Array.isArray(pathArr)) {
        const [paths, rest] = pathArr;
        const Cls = getFunDefault(paths as string);
        plugin.push(new Cls(rest));
      } else {
        plugin.push(pathArr);
      }
    });
  }
  return plugin;
};

export const getKKTPPlugins = (
  plugins: KKTPlugins,
  conf: WebpackConfiguration,
  env: 'development' | 'production',
  options?: LoaderConfOptions,
) => {
  if (plugins) {
    plugins.forEach((fun) => {
      if (typeof fun === 'string') {
        conf = getFunDefault(fun)(conf, env, options);
      } else if (Array.isArray(fun)) {
        const [paths, rest] = fun;
        conf = getFunDefault(paths)(conf, env, { ...options, ...rest });
      } else if (typeof fun === 'function') {
        conf = fun(conf, env, options);
      } else if (fun && fun.loader) {
        const { loader, options: curOpt } = fun;
        conf = loader(conf, env, { ...(options || {}), ...(curOpt || {}) } as LoaderConfOptions);
      }
    });
  }
  return conf;
};
