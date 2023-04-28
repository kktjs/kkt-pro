import { Navigate } from 'react-router-dom';

const routeList = [
  {
    path: '/',
    element: '@/components/Layouts/index',
    children: [
      {
        index: true,
        redirect: '/home',
      },
      { path: '/home', element: '@/pages/home' },
      {
        path: '/docs',
        children: [
          {
            index: true,
            redirect: '/docs/quick-start',
          },
          { path: '/docs/quick-start/*', element: '@/pages/quick-start' },
          { path: '/docs/333', element: '@/pages/quick-start' },
        ],
      },
      { path: '*', element: '@uiw-admin/exceptions/esm/Exceptions/404' },
    ],
  },
  { path: '*', element: '@uiw-admin/exceptions/esm/Exceptions/404' },
];

export default routeList;
