import load from 'carefree-proload';
import rc from '@proload/plugin-rc';
import typescript from '@proload/plugin-typescript';
import json from '@proload/plugin-json';

const defaultPlugin = [
  rc,
  typescript,
  json,
  {
    name: '@proload/plugin-export-js',
    extensions: ['js', 'jsx'],
    async register(fileName: string) {
      // 为了解决 js 文件 使用 export default 导出
      if (/\.(js|jsx?)$/.test(fileName)) {
        const { register } = require('@swc-node/register/register');
        register({ format: 'esm', extensions: ['.js', '.jsx'] });
      }
    },
  },
];
export const getLoadConfig = async () => {
  load.use(defaultPlugin);
  const config = await load('.kktp');
  return config.value;
};
