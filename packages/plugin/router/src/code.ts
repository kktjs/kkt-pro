interface CreateTempProps {
  isImportReact: boolean;
  content: string;
  importLazyString: string;
  iconString?: string;
}
/**生成文件模板*/
export const createRouteConfigTemp = (props: CreateTempProps) => {
  const { content, importLazyString = '', isImportReact, iconString = '' } = props;
  return `
${isImportReact ? '' : `import React from "react";`}
${importLazyString}
${iconString}
${content}
`;
};

const Routertype = {
  browser: 'createBrowserRouter',
  hash: 'createHashRouter',
  memory: 'createMemoryRouter',
};

const createRouterFunTemp = (type: 'browser' | 'hash' | 'memory') => `
let router;
let navigate;
export const createRouter = (options) => {
  router = ${Routertype[type]}(options);
  navigate = router.navigate;
  return router
};
export { router,navigate }
`;

/**获取路由入口文件内容*/
export const createIndexRouteTemp = (
  type: 'browser' | 'hash' | 'memory',
  fallbackElement?: string,
  authElement?: string,
) => {
  let importRouter = ``;
  importRouter = `
import React from "react";
import {
  ${Routertype[type]},
  RouterProvider,
} from 'react-router-dom';
import routesConfig from "./config";
`;
  if (fallbackElement) {
    importRouter += `import FallbackElement from "${fallbackElement}";\n`;
  }

  let render = `<RouterProvider router={createRouter(routesConfig)} fallbackElement={${
    fallbackElement ? '<FallbackElement />' : '<div>loading...</div>'
  }} />`;
  if (authElement) {
    importRouter += `import AuthElement from "${authElement}";\n`;
    render = `<AuthElement routes={routesConfig} createRouter={createRouter}>${render}</AuthElement>`;
  }

  return `
${importRouter}
${createRouterFunTemp(type)}
export default ()=>(${render})
`;
};
/**自动生成-获取路由配置数据*/
export const getRouterDataCode = (data: Map<string, string>, outletLayout?: string) => {
  let childCode = '';
  let importCode = '';
  let index = 0;
  let globalCode = '';
  data.forEach((name, routePath, map) => {
    index++;
    const pathStr = routePath.replace('@/pages/', '').replace(/\/index$/, '');
    // 防止名称相同
    const newName = `${name}${index}`;
    importCode += `import ${newName} from "${routePath}";\n`;
    if (pathStr === 'index') {
      childCode += `\t{ index: true, element: <${newName}/>, loader: ${newName}.loader },\n`;
    } else if (pathStr === '*') {
      globalCode += `\t{ path: prefix + "${pathStr}", element: <${newName}/>, loader: ${newName}.loader },\n`;
    } else {
      childCode += `\t{ path: prefix + "${pathStr}", element: <${newName}/>, loader: ${newName}.loader },\n`;
    }
  });
  if (outletLayout) {
    return `import React from "react";\nimport { Outlet } from "react-router-dom"\nimport OutletLayout from "${outletLayout}";\n${importCode}const prefix = PREFIX;\nexport default [\n{\n\tpath:prefix,\n\telement:<OutletLayout ><Outlet/></OutletLayout>,\n\tchildren:[\n\t${childCode}${globalCode}\t]\n}\n]`;
  }
  return `import React from "react";\n${importCode}const prefix = PREFIX;\nexport default [\n${childCode}${globalCode}\n]`;
};
