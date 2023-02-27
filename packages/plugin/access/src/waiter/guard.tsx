import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { OnRouteBeforeType, OnRouteBeforeResType } from './interface';

let temp: JSX.Element | null = null;

const getDataType = (data: any): string => {
  return (Object.prototype.toString.call(data).match(/\s(\w+)\]/) as string[])[1];
};

interface GuardProps {
  element: JSX.Element;
  onRouteBefore?: OnRouteBeforeType;
}

const Guard = ({ element, onRouteBefore }: GuardProps) => {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  if (onRouteBefore) {
    if (temp === element) {
      return element;
    }
    const pathRes = onRouteBefore(pathname);
    if (getDataType(pathRes) === 'Promise') {
      (pathRes as Promise<OnRouteBeforeResType>).then((res: any) => {
        if (res && res !== pathname) {
          navigate(res, { replace: true });
        }
      });
    } else {
      if (pathRes && pathRes !== pathname) {
        element = <Navigate to={pathRes as string} replace={true} />;
      }
    }
  }

  temp = element;
  return element;
};

export default Guard;
