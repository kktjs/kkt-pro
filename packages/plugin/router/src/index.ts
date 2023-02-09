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
import { checkRoutersFile, analysisRoutersIcon, analysisRoutersLoader } from '@kkt/plugin-pro-utils';
import { getRouteContent, getFilesPath } from './utils';
import { createRouteConfigTemp, createRouteTemp, getRouterDataCode } from './code';
import { RouterPluginProps } from './interface';
import { toPascalCase } from '@kkt/plugin-pro-utils';
export * from './interface';

class RouterPlugin {
  /**上一次的路由数据*/
  pre_config_content = '';
  /**上一次的入口文件数据*/
  pre_index_content = '';
  /**需要监听的文件目录*/
  route_config_path = path.resolve(process.cwd(), 'config');
  /**生成缓存文件目录*/
  temp: string = path.resolve(process.cwd(), 'src', '.kktp');
  /**生成路由入口文件地址**/
  temp_index_file: string = '';
  /**生成路由配置文件地址**/
  temp_config_file: string = '';
  /**页面加载loading组件地址*/
  fallbackElement?: string = '';
  /**路由权限处理组件**/
  authElement?: string = '';
  /**数据验证结果*/
  checkResult: { isArr: boolean; isImportReact: boolean; code: string } = {
    isArr: false,
    isImportReact: false,
    code: '',
  };
  /**获取数据结果*/
  contentResult: { type: 'json' | 'ts' | 'js'; content: string } = { type: 'json', content: '' };
  /**处理图标菜单中图标引入问题*/
  analysisRoutersIcon?: RouterPluginProps['analysisRoutersIcon'];
  /**路由类型*/
  routeType?: 'browser' | 'hash' = 'hash';

  // -----------------------自动生成路由-------------------------------
  /**自动生成路由配置*/
  autoRoute: boolean = false;
  /**自动生成路由layout布局组件地址*/
  outletLayout: string = '';
  /** 入口文件夹位置 */
  rootDir = path.resolve(process.cwd(), 'src');
  /** 约定页面路由文件夹位置 */
  pagesPath = path.resolve(this.rootDir, 'pages');
  /**路由数据*/
  routerData: Map<string, string> = new Map();
  // ------------------------------------------------------

  constructor(props: RouterPluginProps = {}) {
    const tmp = props.tempDirName || '.kktp';
    this.routeType = props.routeType || 'hash';
    this.fallbackElement = props.fallbackElement;
    this.outletLayout = props.outletLayout;
    this.authElement = props.authElement;
    this.autoRoute = props.autoRoute;

    this.temp = path.resolve(this.rootDir, tmp, 'routes');
    this.temp_index_file = path.resolve(this.rootDir, tmp, 'routes', 'index.jsx');
    this.temp_config_file = path.resolve(this.rootDir, tmp, 'routes', 'config.jsx');
    this.analysisRoutersIcon = props.analysisRoutersIcon;
    if (!FS.existsSync(this.temp)) {
      FS.ensureDirSync(this.temp);
    }
  }
  /**创建路由入口文件*/
  createIndex() {
    const routeTemp = createRouteTemp(this.routeType, this.fallbackElement, this.authElement);
    if (this.pre_index_content !== routeTemp) {
      this.pre_index_content = routeTemp;
      FS.writeFileSync(this.temp_index_file, routeTemp, { encoding: 'utf-8', flag: 'w+' });
    }
  }

  // ------------------------------------ 通过配置生成路由 ----------------------------------------------
  /**生成文件*/
  config_CreateRoute() {
    const newRoutes = analysisRoutersLoader(this.checkResult.code);
    let iconString = '';
    let content = newRoutes.code;
    let isImportReact = this.checkResult.isImportReact;
    let importLazyString = newRoutes.importLazyString;
    if (this.analysisRoutersIcon) {
      const iconResult = analysisRoutersIcon(newRoutes.code);
      iconString = this.analysisRoutersIcon(iconResult.icons);
      content = iconResult.code;
    }
    /**生成配置*/
    const newContent = createRouteConfigTemp({ isImportReact, importLazyString, iconString, content });
    FS.writeFileSync(this.temp_config_file, newContent, { encoding: 'utf-8', flag: 'w+' });
    this.createIndex();
  }
  /**判断读取的内容是否与上次一样**/
  config_JudgeContent() {
    /**读取文件内容*/
    this.contentResult = getRouteContent();
    /**判断上一次和当前读取的内容是否一样*/
    if (this.pre_config_content !== this.contentResult.content) {
      // 不相等再进行数据 babel 转换
      this.checkResult = checkRoutersFile(this.contentResult.content);
      if (this.checkResult.isArr) {
        this.pre_config_content = this.contentResult.content;
        this.config_CreateRoute();
      } else {
        this.pre_config_content = 'export default []';
        FS.writeFileSync(this.temp_config_file, 'export default []', { encoding: 'utf-8', flag: 'w+' });
      }
    }
  }
  /**通过配置进行创建路由配置**/
  config_Watch() {
    // 默认走一次
    this.config_JudgeContent();
    if (process.env.NODE_ENV === 'development') {
      chokidar
        .watch([this.route_config_path], {
          cwd: this.route_config_path,
        })
        .on('all', (event, path) => {
          if (['change', 'add', 'unlink'].includes(event) && /routes.(js|json|ts)/.test(path)) {
            this.config_JudgeContent();
          }
        });
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
      if (this.autoRoute) {
        this.auto_Watch();
      } else {
        this.config_Watch();
      }
    });
  }
}
export default RouterPlugin;
