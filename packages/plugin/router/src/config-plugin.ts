import path from 'path';
import chokidar from 'chokidar';
import FS from 'fs-extra';
import { checkRoutersFile, analysisRoutersIcon, analysisRoutersLoader } from '@kkt/plugin-pro-utils';
import { getRouteContent } from './utils';
import { createRouteConfigTemp, createIndexRouteTemp, createRouteTsTemp } from './code';
import { RouterPluginProps } from './interface';
import { creatLoop } from './code';

export class ConfigRouterPlugin {
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
  /**生成路由入口ts文件地址**/
  temp_ts_file: string = '';
  /**生成路由配置文件地址**/
  temp_config_file: string = '';
  /**页面加载loading组件地址*/
  fallbackElement?: string = '';
  /**路由权限处理组件**/
  routesOutletElement?: string = '';
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
  routesType?: 'browser' | 'hash' | 'memory' = 'hash';
  /** 路由权限名称，默认auth.[js | ts] */
  accessDirName?: string = 'access';
  /**是否拥有权限校验*/
  access?: boolean;
  // -----------------------自动生成路由-------------------------------
  /**自动生成路由配置*/
  autoRoutes: boolean = false;
  /**自动生成路由layout布局组件地址*/
  outletLayout: string = '';
  /** 入口文件夹位置 */
  rootDir = path.resolve(process.cwd(), 'src');
  /** 约定页面路由文件夹位置 */
  pagesPath = path.resolve(this.rootDir, 'pages');
  /**路由数据*/
  routerData: Map<string, string> = new Map();
  // ------------------------------------------------------
  /**创建路由入口文件*/
  createIndex() {
    const routeTemp = createIndexRouteTemp(this.routesType, this.routesOutletElement);
    if (this.pre_index_content !== routeTemp) {
      this.pre_index_content = routeTemp;
      FS.writeFileSync(this.temp_index_file, routeTemp, { encoding: 'utf-8', flag: 'w+' });
      FS.writeFileSync(this.temp_ts_file, createRouteTsTemp(), { encoding: 'utf-8', flag: 'w+' });
    }
  }
  createUtilsFile() {
    FS.writeFileSync(path.join(this.temp, `utils.jsx`), creatLoop(this.access, this.fallbackElement), {
      encoding: 'utf-8',
      flag: 'w+',
    });
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
}
