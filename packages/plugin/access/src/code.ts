const jsContent = `
import React from 'react';\n
const App = () => (<div>3333</div>);\n
export default;
`;

export const createIndex = (fallbackElement?: string) => {
  const loading = fallbackElement ? '<Fallback />' : '<></>';
  const jsContent = `
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RouteAccess from '@/access';
${fallbackElement ? `import Fallback from '${fallbackElement}';` : ''}

const Access = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [isAccess, setIsAccess] = useState(null);
  useEffect(() => {
    setIsAccess(false);
    getAccess()
  }, [pathname]);

  const getAccess = async () => {
    const access = await RouteAccess(pathname);
    if (typeof access === 'string' && access) {
      navigate(access)
    } else if (access) {
      setIsAccess(true)
    }
  }
  if (!isAccess) {
    return ${loading};
  }
  return children;
}

export default Access;

`;
  return jsContent;
};

/**
 * 生成 access 文件
 */
export const createAccess = (isTS?: boolean) => {
  const jsContent = `
/**
 * 路由拦截，开启 access 配置 自动生成 access文件
 * @path: 当前页面地址
 * @return 返回true则通过，返回路由则表示跳转
 */
const routeBefore = async (path${isTS ? ': string' : ''}) => {
  return true;
};
export default routeBefore;
`;
  return jsContent;
};
