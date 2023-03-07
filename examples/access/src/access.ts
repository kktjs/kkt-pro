/**
 * 白名单
 */
const whiteRoutes = ['/403', '/404', '/login'];

/**
 * 路由拦截，开启 access 配置 自动生成 access文件
 * @path: 当前页面地址
 * @return 返回true则通过，返回路由则表示跳转
 */
const routeBefore = (path: string) => {
  // 如果是白名单直接返回 true
  if (whiteRoutes.includes(path)) return true;

  // 模拟页面跳转接口请求
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 已登录
      resolve(true);

      // 未登录, 跳转到 登录页面
      // resolve('/login')
    }, 0);
  });
};

export default routeBefore;
