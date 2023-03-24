export interface MenusConfigObject {
  title?: string;
  path?: string;
}

export const menusConfig: MenusConfigObject[] = [
  { title: '教程' },
  { title: 'kktp', path: '/doc/kktp' },
  { title: '快速上手', path: '/doc/getting-started' },
  { title: 'kkt升级到kktp', path: '/doc/update-kktp' },
  { title: '配置(.kktprc)', path: '/doc/kktp-config' },
  { title: '目录结构', path: '/doc/directory-structure' },
  { title: '路由', path: '/doc/kktp-router' },
  { title: '代理', path: '/doc/proxy' },
  { title: '权限', path: '/doc/access' },
  { title: 'redux', path: '/doc/redux' },
];
