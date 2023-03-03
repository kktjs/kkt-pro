/**
 * @Description: 状态管理
 *
 * 1. 自动监听和生成`model`引入
 */
import webpack from 'webpack';
import chokidar from 'chokidar';
import path from 'path';
import FS from 'fs-extra';

import { getAllFiles, getModelsFiles, getSingleModel, getExt } from './utils';
import { createModelsConfigFile, createIndex } from './code';

export interface ModelspluginProps {
  cacheDirName?: string;
}

class RematchPlugin {
  root: string = path.join(process.cwd(), 'src');
  temp: string = path.join(process.cwd(), 'src', '.kktp');
  tempDir = path.join(process.cwd(), 'src', '.kktp', 'rematch');
  /**所有model数据存储*/
  modelsData: { filePath: string; modelNames: string; variableName: string }[] = [];
  /**所有model路径存储*/
  modelsPath: string[] = [];
  /**判断是否是存在tsconfig文件配置*/
  isTS: boolean = FS.existsSync(path.join(process.cwd(), 'tsconfig.json'));
  /**记录上一次内容*/
  preConfigString = '';
  preIndexString = '';
  constructor(props: ModelspluginProps = {}) {
    if (props.cacheDirName) {
      this.temp = path.resolve(this.root, props.cacheDirName);
      this.tempDir = path.join(this.temp, 'rematch');
    }
  }
  /**创建文件*/
  createFile() {
    const configContent = createModelsConfigFile(this.modelsData, this.isTS);
    const indexContent = createIndex(this.isTS);
    FS.ensureDirSync(this.tempDir);
    /**判断文件生成是否一样，一样不进行重新生成*/
    if (this.preConfigString !== configContent) {
      this.preConfigString = configContent;
      FS.writeFile(path.join(this.tempDir, `config.${getExt(this.isTS)}`), configContent, {
        encoding: 'utf-8',
        flag: 'w+',
      });
    }
    /**判断文件生成是否一样，一样不进行重新生成*/
    if (this.preIndexString !== indexContent) {
      this.preIndexString = indexContent;
      FS.writeFile(path.join(this.tempDir, `index.${getExt(this.isTS)}`), indexContent, {
        encoding: 'utf-8',
        flag: 'w+',
      });
    }
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
    compiler.hooks.afterPlugins.tap('RematchPlugin', () => {
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
            if (
              ['change', 'add', 'unlink'].includes(event) &&
              /(models|models\/.+).(ts|js)$/.test(pathName) &&
              !/\.d\.ts$/.test(pathName)
            ) {
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
export default RematchPlugin;
