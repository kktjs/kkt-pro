import webpack from 'webpack';
import { LoaderConfOptions, WebpackConfiguration } from 'kkt';
import { RouterPluginProps } from '@kkt/plugin-pro-router';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

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

export type KKTPAnalyze = BundleAnalyzerPlugin['opts'];
export interface OverrideKKTPConfigProps extends Omit<WebpackConfiguration, 'plugins'> {
  /**
   * 别名
   * 默认系统内置两个别名
   * 1. `@` 指向 src 目录
   * 2. `@@` 指向 src/.kktp 目录
   */
  alias?: Record<string, string | false | string[]>;
  /** 是否导出使用 react-query 状态管理器 */
  queryClient?: boolean;
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
  /**
   * 1. 自动生成models集合配置文件
   * 2. 当传递的是字符串的时候，用于自己定义状态管理的引用地址
   */
  initModel?: boolean | string;
  /** 是否开启权限 */
  access?: boolean;
  /** 分析产物构成 */
  analyze?: KKTPAnalyze;
}
