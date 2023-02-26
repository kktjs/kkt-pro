import { RouteObject } from 'react-router-dom';

interface MetaType {
  [propName: string]: any;
}

interface FunctionalImportType {
  (): any;
}

interface RoutesType extends Omit<RouteObject, 'children'> {
  redirect?: string;
  meta?: MetaType;
  children?: RoutesType[];
}

type OnRouteBeforeResType = string | void;

interface OnRouteBeforeType {
  (pathname: string): OnRouteBeforeResType | Promise<OnRouteBeforeResType>;
}

interface RouterWaiterPropsType {
  routes: RoutesType[];
  onRouteBefore?: OnRouteBeforeType;
  loading?: JSX.Element;
}

export type {
  RoutesType,
  MetaType,
  OnRouteBeforeType,
  RouterWaiterPropsType,
  FunctionalImportType,
  OnRouteBeforeResType,
};
