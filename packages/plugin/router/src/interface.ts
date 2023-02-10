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
