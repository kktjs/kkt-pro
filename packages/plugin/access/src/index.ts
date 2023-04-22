import webpack from 'webpack';
import path from 'path';
import FS from 'fs-extra';
import { AccessPluginProps } from './interface';
import { getExt, isFile } from './utils';
import { createIndex, createAccess } from './code';

class AccessPlugin {
  access?: boolean;
  /** 路由权限名称，默认auth.[js | ts] */
  accessDirName?: string = 'access';
  /** 入口文件夹位置 */
  rootDir = path.resolve(process.cwd(), 'src');
  temp: string = path.join(process.cwd(), 'src', '.kktp');
  tempDir = path.join(process.cwd(), 'src', '.kktp', 'access');
  /**判断是否是存在tsconfig文件配置*/
  isTS: boolean = FS.existsSync(path.join(process.cwd(), 'tsconfig.json'));
  fallbackElement?: string;
  constructor(props: AccessPluginProps = {}) {
    this.access = props.access;
    this.fallbackElement = props.fallbackElement;
  }
  /** 生成目录 */
  async createDir() {
    FS.ensureDirSync(this.tempDir);
    FS.writeFile(path.join(this.tempDir, `index.jsx`), createIndex(this.fallbackElement), {
      encoding: 'utf-8',
      flag: 'w+',
    });
  }
  /** 初始获取路径数据 */
  async auto_GetFiles() {
    const accessDirName = this.accessDirName.replace(/(.(js|ts))/, '');
    const isDir = isFile(`${this.rootDir}/${accessDirName}`);
    if (!isDir) {
      FS.writeFile(path.join(this.rootDir, `${this.accessDirName}.${getExt(this.isTS)}`), createAccess(this.isTS), {
        encoding: 'utf-8',
        flag: 'w+',
      });
    }
  }
  apply(compiler: webpack.Compiler) {
    compiler.hooks.afterPlugins.tap('AccessPlugin', () => {
      if (this.access) {
        this.createDir();
        this.tempDir = path.join(this.temp, 'rematch');
        this.auto_GetFiles();
      }
    });
  }
}
export default AccessPlugin;
