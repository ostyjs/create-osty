import { Outlet, createBrowserRouter } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Outlet />
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
