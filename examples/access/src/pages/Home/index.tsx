import { KktproPageProps, useLocation, Icons } from '@kkt/pro';
import Ceshi from '../Ceshi';

const Home = (props: KktproPageProps) => {
  const { navigate } = props;
  console.log(useLocation());
  const click = () => {
    navigate?.('/ceshi');
  };
  return (
    <div>
      <Icons type="add" style={{ width: 50, height: 50 }} />
      <Icons type="https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg" />
      <button onClick={click}>add route</button>
      <Ceshi a={1} />
    </div>
  );
};
export default Home;
