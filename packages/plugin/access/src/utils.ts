import FS from 'fs-extra';

export const getExt = (isTS: boolean) => {
  return isTS ? 'ts' : 'js';
};

export const isFile = (path: string) => {
  let isPath: boolean = false;
  ['ts', 'js'].forEach((item) => {
    const isExists = FS.existsSync(`${path}.${item}`);
    if (isExists) {
      isPath = true;
    }
  });
  return isPath;
};
