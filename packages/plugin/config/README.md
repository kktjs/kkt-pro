配置
====

`kktp`内置配置处理包

## 参数

```ts
import webpack from 'webpack';
import { LoaderConfOptions, WebpackConfiguration } from 'kkt';
import { RouterPluginProps } from '@kkt/plugin-pro-router';

export type DefaultDefineType = {};

export type OverrideWebpackType = (
  conf: WebpackConfiguration,
  env: 'development' | 'production',
  options?: LoaderConfOptions | undefined,
) => WebpackConfiguration;

export type PluginsType = (
  | ((this: webpack.Compiler, compiler: webpack.Compiler) => void)
  | webpack.WebpackPluginInstance
  | [string, Record<string, any>]
  | string
)[];

export type KKTPlugins = (
  | OverrideWebpackType
  | {
      loader?: OverrideWebpackType;
      options?: LoaderConfOptions | undefined | Record<string, any>;
    }
  | string
  | [string, Record<string, any>]
)[];

export interface OverrideKKTPConfigProps extends Omit<WebpackConfiguration, 'plugins'> {
  /**
   * 别名
   * 默认系统内置两个别名
   * 1. `@` 指向 src 目录
   * 2. `@@` 指向 src/.kktp 目录
   */
  alias?: Record<string, string | false | string[]>;
  /** 插件 */
  plugins?: PluginsType;
  /** 默认全局变量 define ， 注意：对象的属性值会经过一次 JSON.stringify 转换   */
  define?: Record<string, any> & DefaultDefineType;
  /** kkt plugin  */
  kktPlugins?: KKTPlugins;
  /** 项目前缀 */
  publicPath?: string;
  /** 提供回调函数，更改 webpack 的最终配置。 */
  overrideWebpack?: OverrideWebpackType;
  /** 输出 */
  output?: Omit<WebpackConfiguration['output'], 'publicPath'>;
  /**自动生成文件目录名称**/
  cacheDirName?: string;
  /**自动生成入口文件*/
  initEntery?: boolean;
  /**路由配置*/
  initRoutes?: RouterPluginProps | boolean;
  /**自动生成models集合配置文件*/
  initModel?: boolean;
}

```

## 配置文件

```ts
// .kktrc.ts
export default {
  // ...
  initEntery:true,
  initRoutes:true,
}
```
