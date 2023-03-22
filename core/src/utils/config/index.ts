import rc from '@proload/plugin-rc';
import json from '@proload/plugin-json';
const defaultConfig = [
  rc,
  json,
  {
    name: '@proload/plugin-export-js',
    extensions: ['js', 'jsx', 'ts', 'tsx', 'cts', 'mts'],
    async register(fileName: string) {
      // 为了解决 js 文件 使用 export default 导出 (配置中使用 import 引入包有点问题)
      const register = require('@babel/register');
      if (/\.(js|jsx|ts|tsx?)$/.test(fileName)) {
        register({
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          presets: ['env'],
          ignore: [/\/(node_modules)\//],
        });
      } else if (/\.([cm]ts|tsx?)$/.test(fileName)) {
        if (fileName.endsWith('.cts')) {
          register({
            format: 'cjs',
            extensions: ['.cts'],
            presets: ['env'],
            ignore: [/\/(node_modules)\//],
          });
        } else {
          register({
            extensions: ['.ts', '.tsx', '.mts'],
            ignore: [/\/(node_modules)\//],
            presets: ['env'],
          });
        }
      }
    },
  },
];

export default defaultConfig;
