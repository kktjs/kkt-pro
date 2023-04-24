import { KktproPageProps } from '@kkt/pro';
import Ceshi from '../Ceshi';

const Home = (props: KktproPageProps) => {
  const { navigate } = props;
  console.log('dddd', props);
  const click = () => {
    navigate?.('/ceshi');
  };
  return (
    <div>
      <button onClick={click}>add route</button>
      <Ceshi a={1} />
    </div>
  );
};
Home.loader = async () => {
  console.log('::进入页面请求API:');
  return { a: 1 };
};
export default Home;
