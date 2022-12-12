import fs from 'node:fs';
/**
 * 如果存在返回匹配的 URL
 * @param fileName some/path/index.{js,jsx}
 */
export function fileExists(fileName: string = '') {
  const [matchStr, extnames] = fileName.match(/{(.*?)}$/);
  let result: boolean | string = false;
  extnames?.split(',').forEach((name) => {
    const filePath = fileName.replace(matchStr, name);
    if (fs.existsSync(filePath)) {
      result = filePath;
    }
  });
  return result;
}
