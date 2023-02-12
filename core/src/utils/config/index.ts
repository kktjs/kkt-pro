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
      if (/\.(js|jsx|ts|tsx?)$/.test(fileName)) {
        const { register } = require('@swc-node/register/register');
        register({
          esModuleInterop: true,
          module: 'esnext',
          format: 'esm',
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        });
      } else if (/\.([cm]ts|tsx?)$/.test(fileName)) {
        const { register } = require('@swc-node/register/register');
        if (fileName.endsWith('.cts')) {
          register({ format: 'cjs', extensions: ['.cts'] });
        } else {
          register({
            esModuleInterop: true,
            module: 'esnext',
            format: 'esm',
            extensions: ['.ts', '.tsx', '.mts'],
          });
        }
      }
    },
  },
];

export default defaultConfig;
