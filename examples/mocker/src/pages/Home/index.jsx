import { useReactMutation, useReactQuery } from '@kkt/request';
const Home = () => {
  const data = useReactQuery({
    queryKey: ['user'],
    url: '/api/user',
    onSuccess: (res) => {
      console.log(888, res);
    },
  });

  console.log(3333, data);

  const { isLoading, mutateAsync } = useReactMutation({
    url: '/api/login',
    method: 'POST',
    mutationKey: ['login'],
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
