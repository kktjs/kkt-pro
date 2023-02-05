import React from 'react';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import routesConfig from './routesConfig';

const router = createHashRouter(routesConfig);
export const navigate = router.navigate;
export default () => <RouterProvider router={router} fallbackElement={<div>loading...</div>} />;
