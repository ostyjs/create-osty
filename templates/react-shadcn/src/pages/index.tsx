import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { useActiveUser, useNdk } from 'nostr-hooks';
import { Link, Outlet, createBrowserRouter } from 'react-router-dom';

import { ModeToggle } from '@/shared/components/mode-toggle';
import { Button } from '@/shared/components/ui/button';

import { ActiveUserWidget } from '@/features/active-user-widget';
import { LoginWidget } from '@/features/login-widget';
import { ZapWidget } from '@/features/zap-widget';

const Layout = () => {
  const { ndk } = useNdk();
  const { activeUser } = useActiveUser();

  const sepehr = ndk?.getUser({
    pubkey: '3e294d2fd339bb16a5403a86e3664947dd408c4d87a0066524f8a573ae53ca8e',
  });

  return (
    <>
      <div className="flex flex-col justify-between h-full w-full max-w-screen-md mx-auto">
        <div className="flex justify-between items-center border-b p-2">
          <div>
            <h2>Osty</h2>
          </div>

          <div>{activeUser ? <ActiveUserWidget /> : <LoginWidget />}</div>
        </div>

        <div className="border-b h-full w-full overflow-y-auto">
          <Outlet />
        </div>

        <div className="p-2 flex items-center justify-between">
          <div className="text-xs flex items-center gap-1">
            <span>Made with</span>
            <span className="text-red-500">💜</span>
            <span>by</span>
            <Link to={`/profile/${sepehr?.npub}`} className="hover:underline">
              Sepehr
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {sepehr && (
              <ZapWidget target={sepehr}>
                <Button variant="secondary" size="sm">
                  Buy me a coffee ☕️
                </Button>
              </ZapWidget>
            )}

            <Button variant="outline" size="icon" asChild className="ml-auto">
              <a href="https://github.com/ostyjs/create-osty" target="_blank" rel="noreferrer">
                <GitHubLogoIcon />
              </a>
            </Button>

            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

const HomePage = () => import('./home');
const NotePage = () => import('./note');
const ProfilePage = () => import('./profile');

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
      {
        path: '/note/:noteId',
        async lazy() {
          return { Component: (await NotePage()).NotePage };
        },
      },
      {
        path: '/profile/:npub',
        async lazy() {
          return { Component: (await ProfilePage()).ProfilePage };
        },
      },
    ],
  },
]);
