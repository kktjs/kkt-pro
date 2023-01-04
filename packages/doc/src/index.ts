import minimist from 'minimist';
import { staticDocServer } from './scripts/doc';
export * from './utils';
export * from './scripts/doc';
function help() {
  console.log('\n  Usage: \x1b[34;1mkktd\x1b[0m [doc] [input-file] [--help|h]');
  console.log('\n  Displays help information.');
  console.log('\n  Options:\n');
  console.log('   --version, -v        ', 'Show version number');
  console.log('   --help, -h           ', 'Displays help information.');
  console.log('   --local              ', 'Local address preview or not.');
  console.log('\n  Example:\n');
  console.log('   $ \x1b[35mkktd\x1b[0m doc');
}

export const runDoc = async () => {
  try {
    const args = process.argv.slice(2);
    const argvs = minimist(args);
    if (argvs.h || argvs.help) {
      return help();
    }
    if (argvs.v || argvs.version) {
      const { version } = require('../package.json');
      console.log(`\n \x1b[34;1mKKTD\x1b[0m \x1b[32;1mv${version || ''}\x1b[0m\n`);
      return;
    }
    const entry = argvs._[0];
    const isLocal = argvs.local;
    await staticDocServer(entry, isLocal);
  } catch (error) {
    console.log('\x1b[31m KKT:KKTD:ERROR:\x1b[0m', error);
  }
};
