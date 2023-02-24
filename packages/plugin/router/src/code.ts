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
  browser: { create: 'createBrowserRouter', route: 'BrowserRouter' },
  hash: { create: 'createHashRouter', route: 'HashRouter' },
  memory: { create: 'createMemoryRouter', route: 'MemoryRouter' },
};

const createRouterFunTemp = (type: 'browser' | 'hash' | 'memory') => `
let router;
let navigate;
export const createRouter = (routes,options) => {
  router = ${Routertype[type].create}(routes,options);
  navigate = router.navigate;
  return router
};
export { router,navigate }
`;

/**获取路由入口文件内容*/
export const createIndexRouteTemp = (
  type: 'browser' | 'hash' | 'memory',
  fallbackElement?: string,
  routesOutletElement?: string,
) => {
  let importRouter = `
import React, { useMemo, cloneElement } from "react";
import {
  ${Routertype[type].create},
  ${Routertype[type].route},
  useRoutes,
  useLocation,
  Navigate
} from 'react-router-dom';
import routesConfig from "./config";
  `;

  if (fallbackElement) {
    importRouter += `
import FallbackElement from "${fallbackElement}";\n`;
  }

  let App = `
const loopRoutes = (routes, props) => {
  return routes.map(item => {
    const newItem = { ...item };
    if (item.children && item.children.length > 0) {
      newItem.children = loopRoutes(item.children, props)
    }
    if (item.element) {
      newItem.element = cloneElement(item.element, props)
    }
    return newItem;
  })
}\n
const App = () => {
  const location = useLocation();
  const { pathname } = location;
  const routes = useMemo(() => {
    return loopRoutes(routesConfig, {
      routes: routesConfig,
      router: location
    })
  }, []);
  const elements = useRoutes(routes);
  return elements;
}\n`;

  let render = `<${Routertype[type].route}>\n`;

  if (routesOutletElement) {
    importRouter += `import RoutesOutletElement from "${routesOutletElement}";\n`;
    render += `    <RoutesOutletElement routes={routesConfig} createRouter={createRouter}><App /></RoutesOutletElement>\n`;
  } else {
    render += `    <App />\n`;
  }
  render += `  </${Routertype[type].route}>`;

  return `
${importRouter}
${createRouterFunTemp(type)}
${App}
export default ()=>(\n  ${render}\n)
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
    if (pathStr === '*') {
      globalCode += `\t{ path: prefix + "${pathStr}", element: <${newName}/>, loader: ${newName}.loader },\n`;
    } else if (pathStr === 'index') {
      childCode += `\t{ index: true, element: <${newName}/>, loader: ${newName}.loader },\n`;
    } else {
      childCode += `\t{ path: prefix + "${pathStr}", element: <${newName}/>, loader: ${newName}.loader },\n`;
    }
  });
  if (outletLayout) {
    return `import React from "react";\nimport { Outlet } from "react-router-dom"\nimport OutletLayout from "${outletLayout}";\n${importCode}// eslint-disable-next-line no-undef\nconst prefix = PREFIX;\nexport default [\n{\n\tpath:prefix,\n\telement:<OutletLayout ><Outlet/></OutletLayout>,\n\tchildren:[\n\t${childCode}${globalCode}\t]\n}\n]`;
  }
  return `import React from "react";\n${importCode}// eslint-disable-next-line no-undef\nconst prefix = PREFIX;\nexport default [\n${childCode}${globalCode}\n]`;
};
