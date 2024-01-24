import { RouterProvider } from 'react-router-dom';

import { router } from '@/pages';

import './index.css';

export const App = () => {
  //

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
