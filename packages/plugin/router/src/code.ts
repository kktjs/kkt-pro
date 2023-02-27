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
import React from "react";
import { ${Routertype[type].create}, ${Routertype[type].route}, useRoutes } from 'react-router-dom';
import routesConfig from "./config";
import { loopRoutes } from './utils';
  `;

  if (fallbackElement) {
    importRouter += `
import FallbackElement from "${fallbackElement}";\n`;
  }

  let App = `
const App = () => {
  return useRoutes(loopRoutes(routesConfig));
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
      globalCode += `\t{ path: prefix + "${pathStr}", element: () => import("${routePath}"), loader: ${newName}.loader },\n`;
    } else if (pathStr === 'index') {
      childCode += `\t{ index: true, element: <Navigate to={prefix + "${pathStr}"} />, loader: ${newName}.loader },\n`;
    } else {
      childCode += `\t{ path: prefix + "${pathStr}", element: () => import("${routePath}"), loader: ${newName}.loader },\n`;
    }
  });
  if (outletLayout) {
    return `import React from "react";\nimport { Outlet } from "react-router-dom"\nimport OutletLayout from "${outletLayout}";\n${importCode}// eslint-disable-next-line no-undef\nconst prefix = PREFIX;\nexport default [\n{\n\tpath:prefix,\n\telement:<OutletLayout ><Outlet/></OutletLayout>,\n\tchildren:[\n\t${childCode}${globalCode}\t]\n}\n]`;
  }
  return `import React from "react";\nimport { Navigate } from "react-router-dom";\n${importCode}// eslint-disable-next-line no-undef\nconst prefix = PREFIX;\nexport default [\n${childCode}${globalCode}\n]`;
};

export const createDynamic = () => {
  const dynamic = `
import React from "react";

export default class DynamicImport extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      Component: null,
    }
  }

  componentDidMount() {
    const { element } = this.props
    this.handlerLoadComponent(element)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.element.toString() !== this.props.element.toString()) {
      this.handlerLoadComponent(this.props.element)
    }
  }

  handlerLoadComponent(element) {
    this.setState({ loading: true })
    element().then(module => module.default || module).then(Component => {
      this.setState({ Component })
    }).catch(err => {
      throw err
    }).finally(() => {
      this.setState({ loading: false })
    })
  }
  render() {
    const { Component, loading } = this.state
    if (loading) {
      return this.props.loading
    }
    return Component ? <Component /> : null
  }
}
  `;
  return dynamic;
};

export const creatUtils = (access: boolean) => {
  let element = '';
  if (access) {
    element = `if (item.children && item.children.length > 0) {
          newItem.element = element;
        } else {
          newItem.element = ${access ? '<Access>{element}</Access>;' : 'element;'}
        }`;
  } else {
    element = `newItem.element = element;`;
  }
  const utils = `
import React from "react";
import DynamicImport from './dynamic';
${access ? `import Access from '@@/access';` : ''}

const getDataType = (data) => {
  return Object.prototype.toString.call(data);
};

export const loopRoutes = (routes) => {
  return routes.map(item => {
    const newItem = { ...item };
    if (item.children && item.children.length > 0) {
      newItem.children = loopRoutes(item.children);
    }
    if (item.element) {
      if (getDataType(item.element) === '[object Function]') {
        const element = <DynamicImport element={item.element} />;
        ${element}
      }
    }
    return newItem;
  })
}
  `;
  return utils;
};
