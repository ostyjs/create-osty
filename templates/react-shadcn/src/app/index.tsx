import { NostrHooksContextProvider } from 'nostr-hooks';
import { RouterProvider } from 'react-router-dom';

import './index.css';

import { router } from '@/pages';

import { ThemeProvider } from '@/shared/components';

export const App = () => {
  return (
    <>
      <NostrHooksContextProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </NostrHooksContextProvider>
    </>
  );
};
