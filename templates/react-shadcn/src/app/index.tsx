import { NostrHooksContextProvider } from 'nostr-hooks';
import { RouterProvider } from 'react-router-dom';

import './index.css';

import { router } from '@/pages';

import { ThemeProvider } from '@/shared/components';
import { Toaster } from '@/shared/components/ui/toaster';

export const App = () => {
  return (
    <>
      <NostrHooksContextProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </NostrHooksContextProvider>
    </>
  );
};
