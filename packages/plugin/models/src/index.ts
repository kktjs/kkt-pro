/**
 * @Description: 状态管理
 *
 * 1. 自动监听和生成`model`引入
 */
import webpack from 'webpack';
import chokidar from 'chokidar';
import path from 'path';
import FS from 'fs-extra';

import { getAllFiles, getModelsFiles, getSingleModel } from './utils';
import { createModelsConfigFile } from './code';

export interface ModelspluginProps {
  root?: string;
  tempDir?: string;
}

class Modelsplugin {
  root?: string = path.join(process.cwd(), 'src');
  temp?: string = path.join(process.cwd(), 'src', '.kktp');
  tempFile? = path.join(process.cwd(), 'src', '.kktp', 'models', 'config.js');
  modelsData: { filePath: string; modelNames: string; variableName: string }[] = [];
  modelsPath: string[] = [];
  constructor(props: ModelspluginProps = {}) {
    if (props.root) {
      this.root = props.root;
    }
    if (props.tempDir) {
      this.temp = props.tempDir;
    }
    this.tempFile = path.join(this.temp, 'models', 'config.js');
  }
  /**创建文件*/
  createFile() {
    const content = createModelsConfigFile(this.modelsData);
    FS.ensureFileSync(this.tempFile);
    FS.writeFile(this.tempFile, content, { encoding: 'utf-8', flag: 'w+' });
  }
  /**更新*/
  updateFiles(path: string) {
    // 重新读取内容进行替换
    const fix = this.modelsPath.find((item) => item === path);
    if (fix) {
      const { isModel, ...rest } = getSingleModel(path, this.root);
      if (isModel) {
        this.modelsData = this.modelsData.map((item) => {
          if (item.filePath === path) {
            return { ...rest };
          }
          return item;
        });
        this.createFile();
      } else {
        this.unlinkFiles(path);
      }
    } else {
      const { isModel, ...rest } = getSingleModel(path, this.root);
      if (isModel) {
        this.modelsData.push({ ...rest });
        this.modelsPath.push(rest.filePath);
        this.createFile();
      }
    }
  }

  /**删除*/
  unlinkFiles(path: string) {
    const fix = this.modelsPath.find((item) => item === path);
    if (fix) {
      this.modelsPath = this.modelsPath.filter((itr) => itr !== path);
      this.modelsData = this.modelsData.filter((item) => item.filePath !== path);
      this.createFile();
    }
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.afterPlugins.tap('Modelsplugin', () => {
      const allFiles = getAllFiles(this.root, this.temp);
      const { newModelsData, newModelsPath } = getModelsFiles(allFiles, this.root);
      this.modelsData = newModelsData;
      this.modelsPath = newModelsPath;
      this.createFile();
      if (process.env.NODE_ENV === 'development') {
        chokidar
          .watch(this.root, {
            cwd: this.root,
            ignored: [this.temp],
          })
          .on('all', (event, pathName) => {
            if (['change', 'add', 'unlink'].includes(event) && /(models|models\/.+).(ts|js)$/.test(pathName)) {
              if (event === 'unlink') {
                this.unlinkFiles(path.resolve(this.root, pathName));
              } else {
                this.updateFiles(path.resolve(this.root, pathName));
              }
            }
          });
      }
    });
  }
}
export default Modelsplugin;
