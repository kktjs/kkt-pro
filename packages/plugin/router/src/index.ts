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
import { getRouteContent, createRouteConfigTemp, createRouteTemp } from './utils';
import { RouterPluginProps } from './interface';
export * from './interface';

class RouterPlugin {
  /**上一次的路由数据*/
  preString = '';
  /**需要监听的文件目录*/
  cwdConfig = '';
  /**生成缓存文件目录*/
  temp: string = 'src/.kktp';
  /**执行根目录**/
  cwd: string = '';
  tempFile: string = '';
  tempConfigFile: string = '';
  fallbackElement?: string = '';
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

  routeType?: 'browser' | 'hash' = 'hash';

  constructor(props: RouterPluginProps = {}) {
    const tmp = props.tempDir || '.kktp';
    this.routeType = props.routeType || 'hash';
    this.fallbackElement = props.fallbackElement;
    this.cwdConfig = path.resolve(process.cwd(), 'config');
    this.temp = path.resolve(process.cwd(), 'src', tmp, 'routes');
    this.tempFile = path.resolve(process.cwd(), 'src', tmp, 'routes', 'index.jsx');
    this.tempConfigFile = path.resolve(process.cwd(), 'src', tmp, 'routes', 'config.jsx');
    this.cwd = path.resolve(process.cwd());
    this.analysisRoutersIcon = props.analysisRoutersIcon;
    if (!FS.existsSync(this.temp)) {
      FS.ensureDirSync(this.temp);
    }
  }
  /**生成文件*/
  createRoute() {
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
    FS.writeFileSync(this.tempConfigFile, newContent, { encoding: 'utf-8', flag: 'w+' });

    /**生成路由渲染文件*/
    const routeTemp = createRouteTemp(this.routeType, this.fallbackElement);
    FS.writeFileSync(this.tempFile, routeTemp, { encoding: 'utf-8', flag: 'w+' });
  }

  /**判断读取的内容是否与上次一样**/
  JudgeContent() {
    /**读取文件内容*/
    this.contentResult = getRouteContent();
    /**判断上一次和当前读取的内容是否一样*/
    if (this.preString !== this.contentResult.content) {
      // 不相等再进行数据 babel 转换
      this.checkResult = checkRoutersFile(this.contentResult.content);
      if (this.checkResult.isArr) {
        this.preString = this.contentResult.content;
        this.createRoute();
      } else {
        this.preString = 'export default []';
        FS.writeFileSync(this.tempFile, 'export default []', { encoding: 'utf-8', flag: 'w+' });
      }
    }
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.afterPlugins.tap('RouterPlugin', () => {
      // 默认走一次
      this.JudgeContent();
      if (process.env.NODE_ENV === 'development') {
        chokidar
          .watch([this.cwdConfig], {
            cwd: this.cwd,
          })
          .on('all', (event, path) => {
            if (['change', 'add', 'unlink'].includes(event) && /config(\\|\/)routes.(js|json|ts)/.test(path)) {
              this.JudgeContent();
            }
          });
      }
    });
  }
}
export default RouterPlugin;
