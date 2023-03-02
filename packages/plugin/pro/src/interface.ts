import { RouteObject, NavigateFunction } from 'react-router-dom';

export interface KktproKeys {
  [k: string]: any;
}

export interface KktproIProps {
  style?: React.CSSProperties;
  className?: string;
}

/** 路由配置 */
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
  /** route component */
  element?: string | React.LazyExoticComponent<() => JSX.Element> | JSX.Element;
  /** 子集 路由 */
  children?: KktproRoutesProps[];
  /** 是否渲染当前路由 */
  hideRoute?: boolean;
  [k: string]: any;
}

export interface KktproPageProps extends KktproIProps {
  /** 页面权限 */
  roles?: string;
  navigate: NavigateFunction;
  /** path="/" 路由下的子集路由集合 */
  routes: KktproRoutesProps[];
}
