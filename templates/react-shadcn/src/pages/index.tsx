import { Outlet, createBrowserRouter } from 'react-router-dom';

import { LoginModal } from '@/features/login-modal';

const Layout = () => {
  return (
    <>
      <Outlet />

      <LoginModal />
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
