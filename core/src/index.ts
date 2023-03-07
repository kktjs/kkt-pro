import minimist from 'minimist';
import { getLoadConfig } from './utils/getLoadConfig';
import path from 'path';
import fs from 'fs-extra';
import { StartArgs } from 'kkt';
import { overridePaths } from 'kkt/lib/overrides/paths';
import overrideKKTPConfig from '@kkt/plugin-pro-config';
import lessModules from '@kkt/less-modules';
import { staticDocServer } from '@kkt/doc';

function help() {
  console.log('\n  Usage: \x1b[34;1mkktp\x1b[0m [build|watch|doc] [input-file] [--help|h]');
  console.log('\n  Displays help information.');
  console.log('\n  Options:\n');
  console.log('   --version, -v        ', 'Show version number');
  console.log('   --help, -h           ', 'Displays help information.');
  console.log('   --entry, -e          ', 'Document entry address.');
  console.log('   --local              ', 'Local address preview or not.');
  console.log('\n  Example:\n');
  console.log('   $ \x1b[35mkktp\x1b[0m build');
  console.log('   $ \x1b[35mkktp\x1b[0m watch');
  console.log('   $ \x1b[35mkktp\x1b[0m doc');
}
const ROOT_SRC = path.resolve(process.cwd(), 'src');

interface KKTPArgs extends StartArgs {}

(async () => {
  try {
    const args = process.argv.slice(2);
    const argvs: KKTPArgs = minimist(args);
    if (argvs.h || argvs.help) {
      return help();
    }
    if (argvs.v || argvs.version) {
      const { version } = require('../package.json');
      console.log(`\n \x1b[34;1mKKTP\x1b[0m \x1b[32;1mv${version || ''}\x1b[0m\n`);
      return;
    }

    const scriptName = argvs._[0];
    const entry = argvs.e || argvs.entry;

    /**执行渲染文档*/
    if (scriptName === 'doc') {
      const isLocal = argvs.local;
      await staticDocServer(entry, isLocal);
      return;
    }

    /**
     * 获取配置
     * */
    const overrideConfig = await getLoadConfig();
    /**缓存文件夹名称*/
    const cacheDirName = overrideConfig.cacheDirName || '.kktp';
    /**判断自动生成入口配置*/
    const initEntery = overrideConfig.initEntery;

    const ENTRY_CACHE_DIR_PATH = path.resolve(ROOT_SRC, cacheDirName);

    fs.removeSync(ENTRY_CACHE_DIR_PATH);
    const oPaths: { appIndexJs?: string } = {};
    if (initEntery) {
      oPaths.appIndexJs = path.resolve(ENTRY_CACHE_DIR_PATH, 'index.jsx');
      overridePaths(undefined, { ...oPaths });
    }
    const isWatch = /^(watch|start)$/gi.test(scriptName);

    argvs.overridesWebpack = (conf, env, options) => {
      /** 移除入口警告 */
      overridePaths(undefined, { ...oPaths });
      /** 支持 less 文件编译 */
      conf = lessModules(conf, env, options);
      // 是否自动生成入口文件
      if (initEntery) {
        conf.entry = oPaths.appIndexJs;
        fs.ensureFileSync(conf.entry);
      }
      if (argvs['analyzer'] === 1) {
        options['analyzer'] = 1;
      }
      conf = overrideKKTPConfig(overrideConfig, conf, env, options);
      return conf;
    };
    if (scriptName === 'build') {
      await (
        await import('kkt/lib/scripts/build')
      ).default({
        ...argvs,
        overridePaths: { ...oPaths },
      });
    } else if (isWatch) {
      await (
        await import('kkt/lib/scripts/start')
      ).default({
        ...argvs,
        /**
         * 使用 --no-clear-console 调试开发工具，展示日志
         */
        // 'clear-console': false,
        overridePaths: { ...oPaths },
      });
    }
  } catch (error) {
    console.log('\x1b[31m KKT:KKTP:ERROR:\x1b[0m', error);
  }
})();
