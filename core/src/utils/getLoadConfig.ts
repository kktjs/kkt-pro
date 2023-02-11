import load from 'carefree-proload';
import defaultConfig from './config';
load.use(defaultConfig);
console.log('load', load);
console.log('defaultConfig', defaultConfig);
export const getLoadConfig = async () => {
  console.log('打印---');
  const config = await load('.kktp');
  console.log('f返回--');
  return config.raw;
};
