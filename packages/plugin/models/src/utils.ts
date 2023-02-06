/**
 * 1. 初始获取目录文件地址
 */
import FS from 'fs-extra';
import path from 'path';
import { checkModels } from '@kkt/plugin-pro-utils';

export const getAllFiles = (root: string, temp: string) => {
  const pathList: string[] = [];
  const loop = (parent: string) => {
    const files = FS.readdirSync(parent, { encoding: 'utf-8' });
    if (Array.isArray(files)) {
      files.forEach((filename) => {
        const filedir = path.join(parent, filename);
        const isNoEmty = FS.existsSync(filedir);
        if (!isNoEmty) {
          return;
        }
        const stats = FS.statSync(filedir);
        if (stats) {
          const isFile = stats.isFile(); //是文件
          const isDir = stats.isDirectory(); //是文件夹
          const exFilePath = filedir.replace(root, '');
          if (isFile && /(models|models\/.+).(ts|js)$/.test(exFilePath)) {
            pathList.push(filedir);
          }
          if (isDir && temp !== filedir) {
            loop(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
          }
        }
      });
    }
  };
  loop(root);
  return pathList;
};

export const getSingleModel = (filePath: string, root: string) => {
  const content = FS.readFileSync(filePath, 'utf-8').toString();
  const { isModels, modelNames } = checkModels(content);
  if (isModels) {
    const variableName = filePath
      .replace(root, '')
      .split('/')
      .map((k) => k.replace(/^\S/, (s) => s.toUpperCase()))
      .join('')
      .replace(/\.(ts|js)$/, '');
    return {
      isModel: true,
      filePath,
      modelNames,
      variableName,
    };
  }
  return {
    isModel: false,
    filePath: '',
    isCreateModel: false,
    modelNames: '',
    variableName: '',
  };
};

export const getModelsFiles = (list: string[], root: string) => {
  // 解析数据
  const newModelsData: { filePath: string; modelNames: string; variableName: string }[] = [];
  const newModelsPath: string[] = [];
  /**
   * 1. modelName 文件名或解析文件内容的 name
   */
  list.forEach((filePath) => {
    const { isModel, ...rest } = getSingleModel(filePath, root);
    if (isModel) {
      newModelsData.push({ ...rest });
      newModelsPath.push(rest.filePath);
    }
  });
  return {
    newModelsData,
    newModelsPath,
  };
};
