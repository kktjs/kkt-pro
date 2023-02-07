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

export const createRouteTemp = (type: 'browser' | 'hash', fallbackElement?: string) => {
  let importRouter = ``;
  importRouter = `
import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import routesConfig from "./config";\n
`;
  if (fallbackElement) {
    importRouter += `import FallbackElement from "${fallbackElement}";\n`;
  }

  if (type === 'browser') {
    importRouter += `export const router = createBrowserRouter(routesConfig);\n`;
  } else {
    importRouter += `export const router = createHashRouter(routesConfig);\n`;
  }
  const render = `export default ()=> <RouterProvider router={router} fallbackElement={${
    fallbackElement ? '<FallbackElement />' : '<div>loading...</div>'
  }} />`;
  return `
${importRouter}
export const navigate = router.navigate;\n
${render}
`;
};
