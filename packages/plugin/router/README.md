生成路由配置
====

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

1. 约定根目录下`config/routes.(json|js|ts)`为路由菜单配置

**2. 自动生成路由**

1. 约定`src/pages`文件夹为根据生成路由
2. 约定`src/pages/index.(js|jsx|tsx)`文件为默认路由
3. 约定`src/pages/**/index.(js|jsx|tsx)`文件为对应路由展示页面

## `kktp`配置文件

```ts
// .kktrc.ts
export default {
  // ...
  initRoutes:{
    outletLayout:"@/layout" // 自动生成路由layout布局组件地址
  },
}
```
