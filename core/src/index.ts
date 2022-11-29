import minimist from 'minimist';
import { BuildArgs } from 'kkt';

function help() {
  console.log('\n  Usage: \x1b[34;1mkktp\x1b[0m [build|watch] [input-file] [--help|h]');
  console.log('\n  Displays help information.');
  console.log('\n  Options:\n');
  console.log('   --version, -v        ', 'Show version number');
  console.log('   --help, -h           ', 'Displays help information.');
  console.log('\n  Example:\n');
  console.log('   $ \x1b[35mkktp\x1b[0m build');
  console.log('   $ \x1b[35mkktp\x1b[0m watch');
}

interface KKTPArgs extends BuildArgs {}

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
  } catch (error) {
    console.log('\x1b[31m KKT:KKTP:ERROR:\x1b[0m', error);
  }
})();
