/**
 * 路由权限名称，默认access.[js | ts]
 * @path: 当前页面地址
 */
const access = async (path: string) => {
  return false;
};

export default access;
