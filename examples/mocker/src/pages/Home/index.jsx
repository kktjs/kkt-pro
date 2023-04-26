import { useReactMutation, useReactQuery } from '@kkt/request';
const Home = () => {
  const data = useReactQuery({
    queryKey: ['user'],
    url: '/api/user',
    headerTokenName: 'token2',
    onSuccess: (res) => {
      console.log(888, res);
    },
  });

  const { isLoading, mutateAsync } = useReactMutation({
    url: '/api/login',
    method: 'POST',
    mutationKey: ['login'],
    headerTokenName: 'token2333',
    onSuccess: (res) => {
      // console.log(456, res)
    },
  });

  const a = async () => {
    const result = await mutateAsync({ username: 'admin', password: 'admin' });
    console.log(345, result);
  };

  return <div onClick={a}>登录 {JSON.stringify(isLoading)}</div>;
};
export default Home;
