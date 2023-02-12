export interface RouterPluginProps {
  /**处理图标菜单中图标引入问题*/
  analysisRoutersIcon?: (icons: { name: string; newName: string }[]) => string;
  /**在src目录下生成的临时文件夹名称*/
  cacheDirName?: string;
  /**路由类型*/
  routesType?: 'browser' | 'hash' | 'memory';
  /**页面加载loading组件地址*/
  fallbackElement?: string;
  /**
   * 路由外层包裹组件，可以用于自定义添加路由
   * @deprecated 推荐使用 `routesOutletElement`
   */
  authElement?: string;
  /**路由外层包裹组件，可以用于自定义添加路由**/
  routesOutletElement?: string;
  /**自动生成路由配置*/
  autoRoutes?: boolean;
  /**自动生成路由layout布局组件地址*/
  outletLayout?: string;
}
