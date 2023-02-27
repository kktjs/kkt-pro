<<<<<<< HEAD
权限配置
====

权限控制，开启 access 配置, 则src目录下自动生成 access文件。可以在业务中根据路径来定制需求。
=======
生成路由配置
====

`kktp`内置插件，用于自动进行生成路由配置。使用此插件需要安装`react-router`和`react-router-dom`依赖包
>>>>>>> c4055fd163ed4d6c7f79265af30fe30aa09f2346

## 参数

```ts
<<<<<<< HEAD
export interface AccessPluginProps {
  access?: string;
=======
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
>>>>>>> c4055fd163ed4d6c7f79265af30fe30aa09f2346
}

```

<<<<<<< HEAD
## access.ts

模拟页面跳转拦截：

```ts
/**
 * access.ts
 * @path: 当前页面地址
 * @return 返回true则通过，返回路由则表示跳转
 */
const routeBefore = (path: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 已登录
      resolve(true)
      
      // 未登录, 跳转到 登录页面
      // resolve('/login')
    }, 2000)
  })
};

export default routeBefore;
=======
## 路由生成方式

**1. 通过配置进行生成路由**

- 约定根目录下`config/routes.(json|js|ts)`为[路由菜单配置](https://reactrouter.com/en/6.8.1/route/route)


- 配合[@uiw-admin/basic-layouts](https://github.com/uiwjs/uiw-admin/tree/yb/packages/basic-layouts)使用。[配置参数](https://github.com/uiwjs/uiw-admin/tree/yb/packages/router-control)


**2. 自动生成路由**

- 约定`src/pages`文件夹为根据生成路由
- 约定`src/pages/index.(js|jsx|tsx)`文件为默认路由
- 约定`src/pages/**/index.(js|jsx|tsx)`文件为对应路由展示页面

## `access`

权限控制，当`src`目录下存在`access.[js|ts]`文件则默认开启。 可以在业务中根据路径来定制需求。

```ts
/**
 * src/access.ts
 * @path: 当前页面地址
*/
const access = async (path: string) => {
  if (path === '/ceshi') {
    return '/403'
  }
  return false;
}

export default access;
>>>>>>> c4055fd163ed4d6c7f79265af30fe30aa09f2346
```

## `kktp`配置文件

```ts
// .kktrc.ts
export default {
<<<<<<< HEAD
  access: true
=======
  // ...
  initRoutes:{
    outletLayout:"@/layout" // 自动生成路由layout布局组件地址
  },
>>>>>>> c4055fd163ed4d6c7f79265af30fe30aa09f2346
}
```
