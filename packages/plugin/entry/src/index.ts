import path from 'path';
import fs from 'fs-extra';
import webpack, { Compilation, WebpackPluginInstance } from 'webpack';
import { getInitCode, getInitCSSCode } from './code';

type InnerCallback<E, T> = (error?: E | null | false, result?: T) => void;

type InitEntryOptions = {
  /**在src目录下生成的临时文件夹名称*/
  cacheDirName?: string;
  redux?: boolean;
};

const PLUGIN_NAME = 'InitEntryPlugin';

/**
 * 对项目入口文件进行自动生成，取决于是否拥有入口文件
 */
class InitEntry implements WebpackPluginInstance {
  globalCss: boolean = false;
  rootDir = path.resolve(process.cwd(), 'src');
  tempDir = path.resolve(this.rootDir, '.kktp');
  entryCSSPath = path.resolve(this.tempDir, 'index.css');
  entryJSPath = path.resolve(this.tempDir, 'index.jsx');
  globalCSSPath = path.resolve(this.rootDir, 'global.css');
  initGlobalCSSContent = '';
  redux: boolean = false;
  constructor({ cacheDirName, redux = false }: InitEntryOptions = {}) {
    if (cacheDirName) {
      this.tempDir = path.resolve(this.rootDir, cacheDirName);
      this.entryCSSPath = path.resolve(this.tempDir, 'index.css');
      this.entryJSPath = path.resolve(this.tempDir, 'index.jsx');
    }
    this.redux = redux;
  }
  apply(compiler: webpack.Compiler) {
    compiler.hooks.initialize.tap(PLUGIN_NAME, () => {
      this.globalCss = fs.existsSync(this.globalCSSPath);
      this.init();
    });
    compiler.hooks.emit.tapAsync(PLUGIN_NAME, this.emitHandle);
    compiler.hooks.watchRun.tapAsync(PLUGIN_NAME, (comp, callback: InnerCallback<Error, void>) => {
      if (comp.removedFiles && comp.removedFiles.has(this.globalCSSPath)) {
        this.globalCss = false;
        fs.writeFileSync(this.entryCSSPath, this.initGlobalCSSContent);
      }
      if (comp.modifiedFiles && comp.modifiedFiles.has(this.globalCSSPath)) {
        this.globalCss = true;
        this.updateInitCSS();
      }
      callback();
    });
  }
  updateInitCSS = () => {
    let cssText = getInitCSSCode();
    this.initGlobalCSSContent = cssText;
    if (this.globalCss && fs.existsSync(this.globalCSSPath)) {
      cssText = fs.readFileSync(this.globalCSSPath).toString();
    }
    fs.writeFileSync(this.entryCSSPath, cssText);
  };
  init() {
    fs.ensureDirSync(this.tempDir);
    const code = getInitCode({ redux: this.redux });
    fs.writeFileSync(this.entryJSPath, code);
    this.updateInitCSS();
  }
  emitHandle = (compilation: webpack.Compilation, callback: InnerCallback<Error, void>) => {
    this.globalCss = fs.existsSync(this.globalCSSPath);
    compilation.fileDependencies.add(this.globalCSSPath);
    callback();
  };
}

export default InitEntry;
