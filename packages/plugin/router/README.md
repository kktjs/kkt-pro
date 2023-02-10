生成路由配置
====

## 参数

```ts

export interface RouterPluginProps {
  /**处理图标菜单中图标引入问题*/
  analysisRoutersIcon?: (icons: { name: string; newName: string }[]) => string;
  /**在src目录下生成的临时文件夹名称*/
  cacheDirName?: string;
  /**路由类型*/
  routeType?: 'browser' | 'hash';
  /**页面加载loading组件地址*/
  fallbackElement?: string;
  /**路由权限处理组件**/
  authElement?: string;
  /**自动生成路由配置*/
  autoRoute?: boolean;
  /**自动生成路由layout布局组件地址*/
  outletLayout?: string;
}

```

## 通过配置进行生成路由

1. 约定根目录下`config/routes.(json|js|ts)`为路由菜单配置

## 自动生成路由

1. 约定`src/pages`文件夹为根据生成路由
2. 约定`src/pages/index.(js|jsx|tsx)`文件为默认路由
3. 约定`src/pages/**/index.(js|jsx|tsx)`文件为对应路由展示页面
