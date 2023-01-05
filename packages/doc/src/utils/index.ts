import resolvePackagePath from 'resolve-package-path';
import * as path from 'path';

export function getDocsData(str: string = '', isLocal: boolean) {
  let dirPath = str;
  let route = '/';
  if (dirPath?.includes(':')) {
    const arr = dirPath.split(':');
    dirPath = arr[0];
    route = arr[1] || route;
  }
  if (!route.startsWith('/')) {
    route = '/' + route;
  }
  let name = '';
  let pkgPath = '';
  if (isLocal) {
    [, name] = dirPath.match(/^([a-zA-Z\-]+|@[a-zA-Z\-]+\/[a-zA-Z\-]+|(\.|\.\.)\/[a-zA-Z]+)\/?/i);
  } else {
    [, name] = dirPath.match(/^([a-zA-Z\-]+|@[a-zA-Z\-]+\/[a-zA-Z\-]+)\/?/i);
    pkgPath = resolvePackagePath(name, process.cwd());
  }
  const root = path.dirname(pkgPath).replace(new RegExp(`${name.replace('/', path.sep)}$`, 'ig'), '');
  const [repath] = str.replace(name, '').split(':');
  let docRoot = '';
  if (isLocal) {
    docRoot = path.join(process.cwd(), dirPath, repath);
  } else {
    docRoot = path.resolve(path.dirname(pkgPath) + repath);
  }

  return {
    name,
    route,
    dirPath,
    pkgPath,
    root,
    docRoot,
  };
}
