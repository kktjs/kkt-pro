import load from 'carefree-proload';
import defaultConfig from './config';
export const getLoadConfig = async () => {
  load.use(defaultConfig);
  const config = await load('.kktp', { mustExist: false });
  return (config || {}).raw || {};
};
