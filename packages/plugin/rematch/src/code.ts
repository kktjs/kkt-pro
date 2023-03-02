/**创建收集 models 引入文件*/
export const createModelsConfigFile = (
  modelsData: { filePath: string; modelNames: string; variableName: string }[],
  isTS?: boolean,
) => {
  const importString = modelsData
    .map((item) => {
      const { filePath, variableName } = item;
      return `import ${variableName} from "${filePath}";`;
    })
    .join('\n');
  const modelsString = modelsData
    .map((item) => {
      const { modelNames, variableName } = item;
      return `\t${modelNames}:${variableName},`;
    })
    .join('\n');
  const modelsTypeString = modelsData
    .map((item) => {
      const { modelNames, variableName } = item;
      return `\t${modelNames}:typeof ${variableName},`;
    })
    .join('\n');
  return `
${importString}
${isTS ? `export interface ModelsType {${modelsTypeString}} ` : ''}
export default {
${modelsString}
}
`;
};

const jsContent = `
import { init } from '@rematch/core';
import loading  from '@rematch/loading';
import models from "./config"
export const store = init({
  models,
  plugins: [loading()],
})
export const { dispatch, addModel } = store;
`;

const tsContent = `
import {  
  init,
  Models,
  Model,
  RematchRootState,
  RematchDispatch,
} from '@rematch/core';
import loading,{ExtraModelsFromLoading} from '@rematch/loading';
import models,{ ModelsType } from "./config";
export * from 'react-redux';
export interface RootModel extends Models<RootModel>,ModelsType {};
export type FullModel = ExtraModelsFromLoading<RootModel>
export const store = init<RootModel, FullModel>({ models, plugins: [loading()]})
export const { dispatch, addModel } = store;
export type Store = typeof store;
export type AddModel = typeof addModel;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
export type ModelDefault<T = any> = Model<RootModel, T>;
`;

/**入口模板*/
export const createIndex = (isTS?: boolean) => {
  if (isTS) {
    return tsContent;
  }
  return jsContent;
};
