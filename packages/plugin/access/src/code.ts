const jsContent = `
import React from 'react';\n
const App = () => (<div>3333</div>);\n
export default;
`;

export const createIndex = () => {
  const jsContent = `
import React from 'react';\n
const App = () => (<div>3333</div>);\n
export default App;
`;
  return jsContent;
};

/**
 * 生成 access 文件
 */
export const createAccess = (isTS?: boolean) => {
  const jsContent = `
/**
 * 路由权限名称，默认access.[js | ts]
 * @path: 当前页面地址
 */
const routeBefore = async (path${isTS ? ': string' : ''}) => {
  return false;
};
export default access;
`;
  return jsContent;
};
