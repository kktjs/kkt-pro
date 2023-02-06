export const createModelsConfigFile = (
  modelsData: { filePath: string; modelNames: string; variableName: string }[],
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
  return `
${importString}
export default {
${modelsString}
}
`;
};
