import React from 'react';

import ComponentsAppAppTsx from '@/app/App.tsx';

export default [
  {
    path: '/',
    element: <ComponentsAppAppTsx />,
    loader: ComponentsAppAppTsx.loader,
  },
];
