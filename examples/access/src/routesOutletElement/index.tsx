import React from 'react';
import { cloneElement, useMemo } from 'react';
import { KktproRoutesProps } from '@kkt/pro';

interface RoutesOutletElementProps {
  children: React.ReactNode;
  routes: KktproRoutesProps[];
  createRouter: (routes: KktproRoutesProps[], options?: any) => any;
}

const RoutesOutletElement = (props: RoutesOutletElementProps) => {
  // const navigate = useNavigate();
  console.log(678, props);

  // 模拟添加路由
  const newRoutes = useMemo(() => {
    return props.routes;
  }, [props.routes]);

  return cloneElement(props.children as JSX.Element, {
    routes: props.createRouter(newRoutes),
  });
};
export default RoutesOutletElement;
