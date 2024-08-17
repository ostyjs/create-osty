import { Outlet, createBrowserRouter } from 'react-router-dom';

import { LoginModal } from '@/features/login-modal';
import { ZapModal } from '@/features/zap';

const Layout = () => {
  return (
    <>
      <Outlet />

      <LoginModal />
      <ZapModal />
    </>
  );
};

const HomePage = () => import('./home');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        async lazy() {
          return { Component: (await HomePage()).HomePage };
        },
      },
    ],
  },
]);
