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

/**入口模板*/
export const createIndex = (isTS?: boolean) => {
  let importString = `
import {  
  init,
  Models,
  Model,
  RematchRootState,
  RematchDispatch,
} from '@rematch/core';
import loading,{ExtraModelsFromLoading} from '@rematch/loading';
`;
  let storeString = `
export const store = init({
  models,
  plugins: [loading()],
})
`;
  let preTypeString = '';
  let typeString = '';
  if (isTS) {
    importString += `import models,{ ModelsType } from "./config"`;
    preTypeString = `export interface RootModel extends Models<RootModel>,ModelsType {};\nexport type FullModel = ExtraModelsFromLoading<RootModel>`;
    storeString = `export const store = init<RootModel, FullModel>({ models, plugins: [loading()]})`;
    typeString = `export type Store = typeof store;\nexport type AddModel = typeof addModel;\nexport type Dispatch = RematchDispatch<RootModel>;\nexport type RootState = RematchRootState<RootModel, FullModel>;\nexport type ModelDefault<T = any> = Model<RootModel, T>;`;
  } else {
    importString += `import models from "./config"`;
  }

  return `
${importString}
${preTypeString}
${storeString}
export const { dispatch, addModel } = store;
${typeString}
`;
};
