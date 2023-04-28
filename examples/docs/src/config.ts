export type MenusConfigObject = {
  title?: string;
  path?: string;
  divider?: boolean;
  target?: string;
};

export type menusType = {
  /** 导航菜单名称 */
  title: string;
  /** 导航菜单路由, 对应 config/routes.js 配置路由 */
  path: string;
  /** 对应导航的侧边菜单 */
  child: MenusConfigObject[];
};

export type ConfigType = {
  /** 项目名称 */
  name: string;
  /** 项目github地址 */
  github: string;
  /** 立即上手按钮路由 */
  quickStart: string;
  /** 菜单配置项 */
  menus?: menusType[];
};

/**
 * 项目配置
 */
export const config: ConfigType = {
  name: 'KKT PRO',
  github: 'https://github.com/kktjs/kkt-pro',
  quickStart: '/docs/quick-start',
  menus: [
    {
      title: '教程',
      path: '/docs',
      child: [
        {
          divider: true,
          title: '入门',
        },
        {
          title: '开始使用',
          path: '/docs/quick-start',
        },
      ],
    },
  ],
};
