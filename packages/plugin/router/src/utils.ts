import path from 'path';
import FS from 'fs-extra';

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
