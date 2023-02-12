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
  const { createRouter } = props;

  const newRoutes = useMemo(() => {
    return props.routes.concat([
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ]);
  }, [props.routes]);

  return cloneElement(props.children as JSX.Element, {
    router: createRouter(newRoutes),
  });
};
export default RoutesOutletElement;
