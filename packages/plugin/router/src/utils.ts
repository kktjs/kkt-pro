import path from 'path';
import recursive from 'recursive-readdir';
import FS from 'fs-extra';
import { toPascalCase } from '@kkt/plugin-pro-utils';

export const getRouteContent = () => {
  // json > ts > js
  const jsonPath = path.join(process.cwd(), 'config', 'routes.json');
  const tsPath = path.join(process.cwd(), 'config', 'routes.ts');
  const jsPath = path.join(process.cwd(), 'config', 'routes.js');

  let type: 'json' | 'ts' | 'js' = 'json';
  let content = 'export default []';
  if (FS.existsSync(jsonPath)) {
    content = 'export default ' + FS.readFileSync(jsonPath, 'utf-8').toString().trim();
  } else if (FS.existsSync(tsPath)) {
    type = 'ts';
    content = FS.readFileSync(tsPath, 'utf-8').toString().trim();
  } else if (FS.existsSync(jsPath)) {
    type = 'js';
    content = FS.readFileSync(jsPath, 'utf-8').toString().trim();
  }
  return {
    type,
    content,
  };
};

const ignoreFunc = (file: string, stats: FS.Stats) => {
  if (/index.(tsx|js|jsx)$/.test(file) || stats.isDirectory()) {
    return false;
  }
  return true;
};

export const getFilesPath = (currentPath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    recursive(currentPath, [ignoreFunc], (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });
};
