import { useNostrHooks } from 'nostr-hooks';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/pages';

import './index.css';

export const App = () => {
  useNostrHooks();

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
