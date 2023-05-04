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
  browser: 'BrowserRouter',
  hash: 'HashRouter',
  memory: 'MemoryRouter',
};

/**获取路由入口文件内容*/
export const createIndexRouteTemp = (type: 'browser' | 'hash' | 'memory', routesOutletElement?: string) => {
  let importRouter = `
import React from "react";
import { ${Routertype[type]}, useRoutes ,useNavigate} from 'react-router-dom';
import routesConfig from "./config";
import { handleRoutes, filterEmptyChildRoutes } from './utils';
`;

  let render = `<${Routertype[type]}>\n`;
  if (routesOutletElement) {
    importRouter += `import RoutesOutletElement from "${routesOutletElement}";\n`;
    render += `    <RoutesOutletElement routes={routesConfig}><App /></RoutesOutletElement>\n`;
  } else {
    render += `    <App />\n`;
  }
  render += `  </${Routertype[type]}>`;

  return `
${importRouter}
export * from 'react-router-dom';
export * from 'react-router';
const App = (props) => {
  const { routes = routesConfig } = props;
  const navigate = useNavigate();
  const childRoutes = React.useMemo(() => {
    const data = routes.find((item) => item.path === '/')
    if(data && Array.isArray(data.children) && data.children.length){
      return  filterEmptyChildRoutes(data.children);
    }
    return [];
  }, [routes])
  return useRoutes(handleRoutes(routes, childRoutes,navigate));
}
export default ()=>(\n  ${render}\n)
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
    const newNameAll = `${newName}ALL`;
    importCode += `import * as ${newNameAll} from "${routePath}";\n`;

    if (pathStr === '*') {
      globalCode += `\t{ path: prefix + "${pathStr}", element: React.lazy(() => import("${routePath}")), ...${newNameAll}.default },\n`;
    } else if (pathStr === 'index') {
      childCode += `\t{ index: true, element: <Navigate to={prefix + "${pathStr}"} />, ...${newNameAll}.default },\n`;
      childCode += `\t{ path: prefix + "${pathStr}", element: React.lazy(() => import("${routePath}")), ...${newNameAll}.default },\n`;
    } else {
      childCode += `\t{ path: prefix + "${pathStr}", element: React.lazy(() => import("${routePath}")), ...${newNameAll}.default },\n`;
    }
  });
  if (outletLayout) {
    return `import React from "react";\nimport { Navigate } from "react-router-dom";\nimport { Outlet } from "react-router-dom"\nimport OutletLayout from "${outletLayout}";\n${importCode}// eslint-disable-next-line no-undef\nconst prefix = PREFIX;\nexport default [\n{\n\tpath:prefix,\n\telement:<OutletLayout ><Outlet/></OutletLayout>,\n\tchildren:[\n\t${childCode}${globalCode}\t]\n}\n]`;
  }
  return `import React from "react";\nimport { Navigate } from "react-router-dom";\n${importCode}// eslint-disable-next-line no-undef\nconst prefix = PREFIX;\nexport default [\n${childCode}${globalCode}\n]`;
};

export const creatLoop = (access: boolean, fallbackElement: string) => {
  let element = '';
  let fallback = '<></>';
  if (access) {
    element = `if (Array.isArray(item.children) && item.children.length || item.path === '*') {
          newItem.element = element;
        } else {
          newItem.element = ${access ? '<Access>{element}</Access>;' : 'element;'}
        }`;
  } else {
    element = `newItem.element = element;`;
  }
  if (fallbackElement && !access) {
    fallback = '<Fallback />';
  }

  return `
import React from "react";
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

export const handleRoutes = (routes, childRoutes,navigate) => {
  return routes.filter(item => !item.hideRoute).map(item => {
    const newItem = { ...item };
    if (Array.isArray(item.children) && item.children.length) {
      newItem.children = handleRoutes(item.children, childRoutes,navigate);
    }
    if (item.element) {
      const Element = item.element;
      const roles = item.roles || [];
      if (!React.isValidElement(item.element)) {
        const element = (
          <React.Suspense fallback={${fallback}}>
            <Element roles={roles} navigate={navigate} routes={childRoutes} />
          </React.Suspense>
        )
        ${element}
      } else {
        newItem.element = React.cloneElement(Element, {
          roles: roles,
          navigate: navigate,
          routes: childRoutes
        })
      }
    }
    return newItem;
  });
}
`;
};
