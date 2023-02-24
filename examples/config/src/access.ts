/**
 * 路由权限名称，默认access.[js | ts]
 * @path: 当前页面地址
 */
const access = async (path: string) => {
  if (path === '/ceshi') {
    return '/403';
  }
  return false;
};

export default access;
