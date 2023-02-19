/**
 * @Description: 路由
 * 功能
 * 1. 单页应用，通过`pages`文件夹自动生成路由
 * 2. 可以通过配置路由文件自动生成符合`react-router 6`的路由配置格式
 */
/**
 * 1. react-router loading中页面展示组件和抛错组件
 */
import webpack from 'webpack';
import path from 'path';
import chokidar from 'chokidar';
import FS from 'fs-extra';
import { getFilesPath } from './utils';
import { getRouterDataCode } from './code';
import { RouterPluginProps } from './interface';
import { toPascalCase } from '@kkt/plugin-pro-utils';
import { ConfigRouterPlugin } from './config-plugin';
export * from './interface';

class RouterPlugin extends ConfigRouterPlugin {
  constructor(props: RouterPluginProps = {}) {
    super();
    const tmp = props.cacheDirName || '.kktp';
    this.routesType = props.routesType || 'hash';
    this.fallbackElement = props.fallbackElement;
    this.outletLayout = props.outletLayout;
    this.routesOutletElement = props.routesOutletElement;
    this.autoRoutes = props.autoRoutes;

    this.temp = path.resolve(this.rootDir, tmp, 'routes');
    this.temp_index_file = path.resolve(this.rootDir, tmp, 'routes', 'index.jsx');
    this.temp_config_file = path.resolve(this.rootDir, tmp, 'routes', 'config.jsx');
    this.analysisRoutersIcon = props.analysisRoutersIcon;
    if (!FS.existsSync(this.temp)) {
      FS.ensureDirSync(this.temp);
    }
  }
  // ------------------------------------ 自动生成路由 ----------------------------------------------
  /**获取路由跳转名称**/
  getRouterPath = (filePath: string) =>
    '@/' +
    filePath.replace(this.rootDir, '').replace(path.extname(filePath), '').replace(/\\/g, '/').replace(/^\//, '');
  /**获取组件名称*/
  getComponentName = (filePath: string) =>
    toPascalCase(path.relative(this.pagesPath, filePath).replace(path.extname(filePath), '').replace(path.sep, ' '));
  /**生成路由信息*/
  auto_getRouteData = (files: string[]) => {
    files.forEach((filePath) => {
      this.routerData.set(this.getRouterPath(filePath), this.getComponentName(filePath));
    });
  };

  /**创建文件**/
  auto_CreateRoute() {
    const configContent = getRouterDataCode(this.routerData, this.outletLayout);
    if (this.pre_config_content !== configContent) {
      this.pre_config_content = configContent;
      /**生成配置*/
      FS.writeFileSync(this.temp_config_file, configContent, { encoding: 'utf-8', flag: 'w+' });
    }
    this.createIndex();
  }
  /**初始获取路径数据*/
  async auto_GetFiles() {
    const files = await getFilesPath(this.pagesPath);
    this.auto_getRouteData(files);
    this.auto_CreateRoute();
  }
  /**新增*/
  auto_Add(pathName: string) {
    this.routerData.set(this.getRouterPath(pathName), this.getComponentName(pathName));
    this.auto_CreateRoute();
  }
  /**删除*/
  auto_unLink(pathName: string) {
    /**直接删除，重新进行生成数据*/
    this.routerData.delete(this.getRouterPath(path.resolve(pathName)));
    this.auto_CreateRoute();
  }
  /**自动生成路由配置*/
  auto_Watch() {
    this.auto_GetFiles();
    if (process.env.NODE_ENV === 'development') {
      const chokidars = chokidar.watch([this.pagesPath], {
        cwd: this.pagesPath,
      });
      chokidars.on('all', (event, file) => {
        if (/index.(js|jsx|tsx)$/.test(file)) {
          if (event === 'unlink') {
            this.auto_unLink(path.resolve(this.pagesPath, file));
          } else if (event === 'add') {
            this.auto_Add(path.resolve(this.pagesPath, file));
          }
        }
      });
    }
  }
  apply(compiler: webpack.Compiler) {
    compiler.hooks.afterPlugins.tap('RouterPlugin', () => {
      if (this.autoRoutes) {
        this.auto_Watch();
      } else {
        this.config_Watch();
      }
    });
  }
}
export default RouterPlugin;
