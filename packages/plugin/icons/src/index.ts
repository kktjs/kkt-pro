import webpack from 'webpack';
import path from 'path';
import FS from 'fs-extra';
import { createIndex, createCss, createIndexTs } from './code';

export const iconModule = [
  {
    test: /\.svg$/,
    loader: 'svg-sprite-loader',
  },
];

class IconsPlugin {
  icons?: boolean;
  /** 入口文件夹位置 */
  tempDir = path.join(process.cwd(), 'src', '.kktp', 'icons');
  /** 生成文件 */
  async createFile() {
    FS.ensureDirSync(this.tempDir);
    FS.writeFile(path.join(this.tempDir, `index.tsx`), createIndex(), {
      encoding: 'utf-8',
      flag: 'w+',
    });
    FS.writeFile(path.join(this.tempDir, `index.css`), createCss(), {
      encoding: 'utf-8',
      flag: 'w+',
    });
    // FS.writeFile(path.join(this.tempDir, `index.d.ts`), createIndexTs(), {
    //   encoding: 'utf-8',
    //   flag: 'w+',
    // });
  }
  apply(compiler: webpack.Compiler) {
    compiler.hooks.afterPlugins.tap('IconsPlugin', () => {
      this.createFile();
    });
  }
}
export default IconsPlugin;
