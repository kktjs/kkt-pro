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

const createRouterFunTemp = (type: 'browser' | 'hash') => `
let router;
let navigate;
export const createrRouter = (options) => {
  router = ${type === 'browser' ? 'createBrowserRouter' : 'createHashRouter'}(options);
  navigate = router.navigate;
  return router
};
export { router,navigate }
`;

/**获取路由入口文件内容*/
export const createIndexRouteTemp = (type: 'browser' | 'hash', fallbackElement?: string, authElement?: string) => {
  let importRouter = ``;
  importRouter = `
import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import routesConfig from "./config";
`;
  if (fallbackElement) {
    importRouter += `import FallbackElement from "${fallbackElement}";\n`;
  }

  let render = `<RouterProvider router={createrRouter(routesConfig)} fallbackElement={${
    fallbackElement ? '<FallbackElement />' : '<div>loading...</div>'
  }} />`;
  if (authElement) {
    importRouter += `import AuthElement from "${authElement}";\n`;
    render = `<AuthElement routes={routesConfig} createrRouter={createrRouter}>${render}</AuthElement>`;
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
  data.forEach((name, routePath, map) => {
    const pathStr = routePath.replace('@/pages/', '').replace(/\/index$/, '');
    importCode += `import ${name} from "${routePath}";\n`;
    if (pathStr === 'index') {
      childCode += `\t{ index: true, element: <${name}/>, loader: ${name}.loader },\n`;
    } else {
      childCode += `\t{ path: prefix + "${pathStr}", element: <${name}/>, loader: ${name}.loader },\n`;
    }
  });
  if (outletLayout) {
    return `import React from "react";\nimport { Outlet } from "react-router-dom"\nimport OutletLayout from "${outletLayout}";\n${importCode}const prefix = PREFIX;\nexport default [\n{\n\tpath:prefix,\n\telement:<OutletLayout ><Outlet/></OutletLayout>,\n\tchildren:[\n\t${childCode}\t]\n}\n]`;
  }
  return `import React from "react";\n${importCode}const prefix = PREFIX;\nexport default [\n${childCode}\n]`;
};
