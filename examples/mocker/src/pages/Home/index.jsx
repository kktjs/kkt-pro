import { useReactMutation, useReactQuery, queryClient } from '@kkt/request';
const Home = () => {
  useReactQuery({
    queryKey: ['users'],
    url: '/api/user',
    headerTokenName: 'token2',
    onSuccess: (res) => {
      console.log(888, res);
    },
  });

  const { isLoading, mutateAsync } = useReactMutation({
    url: '/api/login',
    method: 'POST',
    headerTokenName: 'token2333',
    onSuccess: (res) => {
      queryClient.setQueryData(['login'], res);
      // console.log(456, res)
    },
  });

  const onLogin = async () => {
    const result = await mutateAsync({ username: 'admin', password: 'admin' });
    console.log(345, result);
  };

  const onGetData = async () => {
    // const data = await queryClient.getQueryData(['users']);

    // 获取名为 login 的数据
    // const data = await queryClient.getQueryData(['login']);
    // console.log(data)

    // 使名为 users 的查询失效并重新请求
    // await queryClient.invalidateQueries('users');

    // 删除名为 users 的缓存
    await queryClient.removeQueries(['users']);
    const data = await queryClient.getQueryData(['users']);
    console.log(data); // undefault
  };

  return (
    <>
      <div onClick={onLogin}>登录 {JSON.stringify(isLoading)}</div>
      <div onClick={onGetData}>获取登录信息</div>
    </>
  );
};
export default Home;
