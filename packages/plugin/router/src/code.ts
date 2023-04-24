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
const childRoutes = (routes) => {
  const data = routes.find((item) => item.path === '/')
  if(data && Array.isArray(data.children) && data.children.length){
    return  filterEmptyChildRoutes(data.children);
  }
  return [];
}

let router;
let navigate;
export const createRouter = (routes,options) => {
  router = ${Routertype[type]}(handleRoutes(routes, childRoutes(routes)), options);
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
import React from "react";
import {${Routertype[type]}, RouterProvider} from 'react-router-dom';
import routesConfig from "./config";
import { handleRoutes, filterEmptyChildRoutes } from './utils';
`;

  if (fallbackElement) {
    importRouter += `import FallbackElement from "${fallbackElement}";\n`;
  }

  let render = `<RouterProvider router={createRouter(routesConfig)} fallbackElement={${
    fallbackElement ? '<FallbackElement />' : '<div>loading...</div>'
  }} />`;
  if (routesOutletElement) {
    importRouter += `import RoutesOutletElement from "${routesOutletElement}";\n`;
    render = `<RoutesOutletElement routes={routesConfig} createRouter={createRouter}>${render}</RoutesOutletElement>`;
  }

  return `
${importRouter}

${createRouterFunTemp(type)}
export default ()=>(${render})
`;
};

export const createRouteTsTemp = () => {
  const temp = `export * from 'react-router-dom';\nexport * from 'react-router';`;
  return temp;
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
      globalCode += `\t{ path: prefix + "${pathStr}", element: <${routePath} />, loader: ${newName}.loader },\n`;
    } else if (pathStr === 'index') {
      childCode += `\t{ index: true, element: <Navigate to={prefix + "${pathStr}"} />, loader: ${newName}.loader },\n`;
      childCode += `\t{ path: prefix + "${pathStr}", element: <${newName} />, loader: ${newName}.loader },\n`;
    } else {
      childCode += `\t{ path: prefix + "${pathStr}", element: <${newName} />, loader: ${newName}.loader },\n`;
    }
  });
  if (outletLayout) {
    return `import React from "react";\nimport { Navigate } from "react-router-dom";\nimport { Outlet } from "react-router-dom"\nimport OutletLayout from "${outletLayout}";\n${importCode}// eslint-disable-next-line no-undef\nconst prefix = PREFIX;\nexport default [\n{\n\tpath:prefix,\n\telement:<OutletLayout ><Outlet/></OutletLayout>,\n\tchildren:[\n\t${childCode}${globalCode}\t]\n}\n]`;
  }
  return `import React from "react";\nimport { Navigate } from "react-router-dom";\n${importCode}// eslint-disable-next-line no-undef\nconst prefix = PREFIX;\nexport default [\n${childCode}${globalCode}\n]`;
};

export const creatLoop = (access: boolean, fallbackElement: string) => {
  let fallback = '<></>';
  if (fallbackElement && !access) {
    fallback = '<Fallback />';
  }

  return `
import React from "react";
import { useNavigate } from 'react-router-dom';
${access ? `import Access from '@@/access';` : ''}
${fallbackElement && !access ? `import Fallback from '${fallbackElement}';` : ''}

export const filterEmptyChildRoutes = (routes) => {
  const newRoutes = [];
  routes.forEach((item) => {
    const newItem = { ...item };
    if (newItem.hideRoute) {
      // 隐藏的路由不需要放入
    } else if (Array.isArray(newItem.children)) {
      if (newItem.children.length) {
        newItem.children = filterEmptyChildRoutes(newItem.children);
      }
      if (newItem.children.length) {
        newRoutes.push({ ...newItem });
      }
    } else {
      newRoutes.push({ ...newItem });
    }
  });
  return newRoutes;
};

const Childrens = (props) => {
  const { children, roles = [], routes = [] } = props;
  const navigate = useNavigate();
  return React.cloneElement(children, {
    roles,
    navigate: navigate,
    routes
  })
}

export const handleRoutes = (routes, childRoutes) => {
  return routes.filter(item => !item.hideRoute).map(item => {
    const newItem = { ...item };
    if (Array.isArray(item.children) && item.children.length) {
      newItem.children = handleRoutes(item.children, childRoutes);
    }
    if (item.element) {
      const Element = item.element;
      const ChildElement = <Childrens {...item} routes={childRoutes}>{Element}</Childrens>
      let accessElement;
      if (Array.isArray(item.children) && item.children.length || item.path === '*') {
        accessElement = ChildElement;
      } else {
        ${
          access
            ? `accessElement = <Access {...item} routes={childRoutes}>{Element}</Access>;`
            : `accessElement = ChildElement`
        }
      }
      newItem.element = accessElement;
    }
    return newItem;
  });
}
`;
};
