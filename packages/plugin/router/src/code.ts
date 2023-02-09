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

export const createRouteTemp = (type: 'browser' | 'hash', fallbackElement?: string, authElement?: string) => {
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
    render = `<AuthElement routes={routesConfig} createRouter={createrRouter}>${render}</AuthElement>`;
  }

  return `
${importRouter}
${createRouterFunTemp(type)}
export default ()=>(${render})
`;
};
