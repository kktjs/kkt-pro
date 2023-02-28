import { RouteObject } from 'react-router';
import type { Router as RemixRouter } from '@remix-run/router';
import Home from '@/pages/Home';
import About from '@/pages/About';
import { cloneElement, useMemo } from 'react';

interface RoutesOutletElementProps {
  children: React.ReactNode;
  routes: RouteObject[];
  createRouter: (routes: RouteObject[], options?: any) => RemixRouter;
}
const RoutesOutletElement = (props: RoutesOutletElementProps) => {
  // 模拟添加路由
  const newRoutes = useMemo(() => {
    return props.routes.concat([
      {
        path: '/home2',
        element: <Home />,
      },
      {
        path: '/about2',
        element: <About />,
      },
    ]);
  }, [props.routes]);

  return cloneElement(props.children as JSX.Element, {
    routes: newRoutes,
  });
};
export default RoutesOutletElement;
