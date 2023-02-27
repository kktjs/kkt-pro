/**
 * 路由拦截，开启 access 配置 自动生成 access文件
 * @path: 当前页面地址
 * @return 返回true则通过，返回路由则表示跳转
 */
const routeBefore = async (path: string) => {
  console.log(345);
  return true;
};
export default routeBefore;
