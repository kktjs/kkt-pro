import { LoaderConfOptions, WebpackConfiguration } from 'kkt';

import FS from 'fs-extra';
import path from 'path';

import { DefaultDefineType, PluginsType, KKTPlugins, OverrideKKTPConfigProps } from './interface';
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

export const getKKTPlugins = (
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

/**生成导出文件*/
const createExportField = (pathList: string[], cacheDirName: string, queryClient: boolean) => {
  const contentPath = path.join(process.cwd(), 'src', cacheDirName, 'export.ts');
  let content = pathList
    .map((bod) => {
      if (bod === 'routes') {
        return `
// export * from "./${bod}";
export * from 'react-router-dom';
export * from 'react-router';`;
      }
      return `export * from "./${bod}";`;
    })
    .join('\n');
  if (queryClient) {
    content += `\nexport * from "@kkt/request";\n`;
  }
  FS.ensureFileSync(contentPath);
  FS.writeFileSync(contentPath, content, { flag: 'w+', encoding: 'utf-8' });
};

/**内置插件判断*/
export const getInitPlugin = (props: OverrideKKTPConfigProps, options?: LoaderConfOptions) => {
  const {
    plugins = [],
    /**自动生成文件目录**/
    cacheDirName = '.kktp',
    /**自动生成入口文件*/
    initEntery = false,
    /**路由配置*/
    initRoutes = false,
    /**自动生成models集合配置文件*/
    initModel = false,
    /** 是否添加权限 */
    access = false,
    alias = {},
    /** 分析产物构成 */
    analyze,
    /** 是否导出使用 react-query 状态管理器 */
    queryClient = false,
  } = props;
  const pluginsArr = [...plugins];
  const exportPath = [];
  const newAlias = { ...alias };

  if (initEntery) {
    pluginsArr.push(['@kkt/plugin-pro-entry', { redux: initModel, queryClient, cacheDirName }]);
  }
  if (initRoutes) {
    pluginsArr.push([
      '@kkt/plugin-pro-router',
      typeof initRoutes === 'boolean' ? { cacheDirName } : { ...initRoutes, cacheDirName, access },
    ]);
    exportPath.push('routes');
  }
  if (typeof initModel === 'boolean' && initModel) {
    pluginsArr.push(['@kkt/plugin-pro-rematch', { cacheDirName }]);
    exportPath.push('rematch');
  }
  if (access) {
    const fallbackElement = typeof initRoutes === 'boolean' ? null : initRoutes?.fallbackElement;
    pluginsArr.push(['@kkt/plugin-pro-access', { access, fallbackElement }]);
  }
  /**分析产物*/
  if (options.analyzer && options.analyzer === 1) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    pluginsArr.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 9999,
        openAnalyzer: true,
        ...analyze,
      }),
    );
  }
  createExportField(exportPath, cacheDirName, queryClient);
  /**这是为了解决导出问题*/
  if (!exportPath.length) {
    newAlias['@@/export'] = './export';
  }
  return {
    plugins: pluginsArr,
    isExport: !!exportPath.length,
    newAlias,
  };
};
