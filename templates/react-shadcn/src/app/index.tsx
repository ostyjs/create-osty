import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import './index.css';

import { router } from '@/pages';

import { ThemeProvider } from '@/shared/components/theme-provider';
import { Toaster } from '@/shared/components/ui/toaster';

import { useNdk } from '@/shared/hooks';

export const App = () => {
  const { initNdk, ndk, loginFromLocalStorage } = useNdk();

  useEffect(() => {
    initNdk({ explicitRelayUrls: ['wss://nos.lol'] });
  }, [initNdk]);

  useEffect(() => {
    ndk?.connect();
  }, [ndk]);

  useEffect(() => {
    loginFromLocalStorage();
  }, [loginFromLocalStorage]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </>
  );
};
