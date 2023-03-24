## 路由配置

`kktp`内置插件，用于自动进行生成路由配置。使用此插件需要安装`react-router`和`react-router-dom`依赖包

## 参数

```ts
export interface RouterPluginProps {
  /**处理图标菜单中图标引入问题*/
  analysisRoutersIcon?: (icons: { name: string; newName: string }[]) => string;
  /**
   * @description 在src目录下生成的临时文件夹名称
   * @default .kktp
   * */
  cacheDirName?: string;
  /**
   * @description 路由类型
   * @default "hash"
   */
  routesType?: 'browser' | 'hash' | 'memory';
  /** 路由权限名称，默认查找src目录下access.[js | ts]文件 */
  accessDirName?: string;
  /**页面加载loading组件地址*/
  fallbackElement?: string;
  /**路由外层包裹组件，可以用于自定义添加路由**/
  routesOutletElement?: string;
  /**自动生成路由配置*/
  autoRoutes?: boolean;
  /**自动生成路由layout布局组件地址*/
  outletLayout?: string;
}
```

## 路由生成方式

**1. 通过配置进行生成路由**

- 约定根目录下`config/routes.(json|js|ts)`为[路由菜单配置](https://github.com/kktjs/kkt-pro/tree/dev/packages/plugin/pro#kktproroutesprops)



**2. 自动生成路由**

- 约定`src/pages`文件夹为根据生成路由
- 约定`src/pages/index.(js|jsx|tsx)`文件为默认路由
- 约定`src/pages/**/index.(js|jsx|tsx)`文件为对应路由展示页面

## 页面参数

在`kktp`中，页面内置了`roles`、`navigate`、`routes`。

- `roles` 页面权限，`config/routes.json`菜单上配置了 `roles`，则在页面上获取。

- `navigate` 跳转。

- `routes` 路由`path="/"`路由下的子集路由集合。

```ts
import { KktproPageProps } from '@kkt/pro';

const Page = (props: KktproPageProps) => {
  const { navigate, roles = [], routes = [] } = props;

  return <div />
};
export default Page;
```

## 页面跳转

页面中可直接通过 `navigate` 跳转， 或者通过`react-router-dom`提供的 `useNavigate`来跳转。

```ts
import { KktproPageProps, useNavigate } from '@kkt/pro';

const Page = (props: KktproPageProps) => {
  const { navigate } = props;
  // const navigate = useNavigate();

  const click = () => {
    navigate('/demo');
  };

  return <button onClick={click}>navigate</button>
};
export default Page;
```

## `kktp`配置文件

```ts
// .kktprc.ts
export default {
  // ...
  initRoutes:{
    outletLayout:"@/layout" // 自动生成路由layout布局组件地址
  },
}
```

## License

[MIT © Kenny Wong](https://github.com/jaywcjlove)