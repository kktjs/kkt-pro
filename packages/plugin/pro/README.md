包集成管理
====

1. 为了方便把自动生成文件内的数据导出使用
2. 根据使用的`plugin`，导出对应相关包内方法
3. 导出一部分自定义类型

## install

```bash
$ npm install @kkt/pro -D # yarn add @kkt/pro -D
```

## 类型

**KktproRoutesProps**

路由类型

```ts
export interface KktproRoutesProps extends Omit<RouteObject, 'children' | 'element'> {
  /** 名称 */
  name?: string;
  /**  图标 */
  icon?: string | React.ReactNode;
  /** 重定向  当 index===true生效 */
  redirect?: string;
  /** 页面权限, 用于页面校验权限 */
  roles?: string[];
  /** 隐藏主菜单 */
  hiddenMainMenu?: boolean;
  /** 是否隐藏菜单 */
  hideInMenu?: boolean;
  /** 自定义 跳转 */
  // navigate?: (navigate: NavigateFunction) => void;
  navigate?: string;
  /** 控制是否侧边只展示子路由 **/
  side?: boolean;
  /** 是否渲染当前路由 */
  hideRoute?: boolean;
  /** route component */
  element?: string | React.LazyExoticComponent<() => JSX.Element> | JSX.Element;
  /** 子集 路由 */
  children?: KktproRoutesProps[];
}
```

**KktproPageProps**

页面`props`类型

```ts
export interface KktproPageProps extends KktproIProps {
  /** 页面权限 */
  roles?: string;
  navigate: NavigateFunction;
  /** path="/" 路由下的子集路由集合 */ 
  routes: KktproRoutesProps[];
}
```
