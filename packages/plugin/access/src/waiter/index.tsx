import { useRoutes } from 'react-router-dom';
import Fn from './fn';
import { RouterWaiterPropsType } from './interface';

const RouterWaiter = (props: RouterWaiterPropsType) => {
  console.log(66666);
  const { routes, onRouteBefore, loading } = props;
  const fn = new Fn({
    routes,
    onRouteBefore,
    loading,
  });
  const reactRoutes = fn.transformRoutes();
  const elements = useRoutes(reactRoutes);

  return elements;
};

export default RouterWaiter;
