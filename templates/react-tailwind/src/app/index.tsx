import { NostrHooksContextProvider } from 'nostr-hooks';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/pages';

import './index.css';

export const App = () => {
  return (
    <>
      <NostrHooksContextProvider>
        <RouterProvider router={router} />
      </NostrHooksContextProvider>
    </>
  );
};
