import { GitHubLogoIcon } from '@radix-ui/react-icons';
import {
  ArrowRightIcon,
  BellIcon,
  BookmarkIcon,
  CoffeeIcon,
  CompassIcon,
  HomeIcon,
  MailIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from 'lucide-react';
import { useActiveUser, useNdk } from 'nostr-hooks';
import { Link, Outlet, createBrowserRouter } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { useTheme } from '@/shared/components/theme-provider';

import { ActiveUserWidget } from '@/features/active-user-widget';
import { LoginWidget } from '@/features/login-widget';
import { ZapWidget } from '@/features/zap-widget';

const Layout = () => {
  const { ndk } = useNdk();
  const { activeUser } = useActiveUser();

  const { setTheme, theme } = useTheme();

  const sepehr = ndk?.getUser({
    pubkey: '3e294d2fd339bb16a5403a86e3664947dd408c4d87a0066524f8a573ae53ca8e',
  });

  return (
    <>
      <div className="flex h-full w-full max-w-screen-lg mx-auto overflow-hidden">
        <div
          id="sidebar"
          className="hidden flex-col gap-2 overflow-hidden items-center p-2 border-r w-16 md:flex lg:w-48"
        >
          <Link to="/" className="flex items-center gap-2 p-2 w-full">
            <div className="w-8 h-8">
              <img src="/nostribe-64.png" alt="Nostribe" className="w-8 h-8 object-contain" />
            </div>

            <span className="text-lg font-bold hidden lg:block">Nostribe</span>
          </Link>

          <div className="flex flex-col gap-2 w-full items-center lg:items-start">
            <Link to="/" className="flex items-center gap-2 p-2 rounded-lg w-full hover:bg-muted">
              <div>
                <HomeIcon size={24} />
              </div>

              <span className="hidden lg:block">Home</span>
            </Link>

            <Link to="/" className="flex items-center gap-2 p-2 rounded-lg w-full hover:bg-muted">
              <div>
                <CompassIcon size={24} />
              </div>

              <span className="hidden lg:block">Explore</span>
            </Link>

            <Link
              to="/messages"
              className="flex items-center gap-2 p-2 rounded-lg w-full hover:bg-muted"
            >
              <div>
                <MailIcon size={24} />
              </div>

              <span className="hidden lg:block">Messages</span>
            </Link>

            <Link to="/" className="flex items-center gap-2 p-2 rounded-lg w-full hover:bg-muted">
              <div>
                <BookmarkIcon size={24} />
              </div>

              <span className="hidden lg:block">Bookmarks</span>
            </Link>

            <Link to="/" className="flex items-center gap-2 p-2 rounded-lg w-full hover:bg-muted">
              <div>
                <BellIcon size={24} />
              </div>

              <span className="hidden lg:block">Notifications</span>
            </Link>
          </div>

          <div className="mt-auto w-full">
            <div className="flex flex-col gap-4 w-full items-center">
              {sepehr && (
                <ZapWidget target={sepehr}>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted hover:cursor-pointer">
                    <span className="text-xs hidden lg:block">Buy me a coffee</span>

                    <CoffeeIcon className="w-5 h-5 lg:w-4 lg:h-4" />
                  </div>
                </ZapWidget>
              )}

              <div className="w-full">{activeUser ? <ActiveUserWidget /> : <LoginWidget />}</div>
            </div>
          </div>
        </div>

        <div id="main" className="overflow-hidden w-full">
          <div
            id="navbar"
            className="flex items-center justify-between p-2 border-b w-full bg-background md:hidden"
          >
            <div className="flex items-center gap-2 ">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8">
                  <img src="/nostribe-64.png" alt="Nostribe" className="w-8 h-8 object-contain" />
                </div>

                <span className="text-lg font-bold">Nostribe</span>
              </Link>
            </div>

            <div>{activeUser ? <ActiveUserWidget /> : <LoginWidget />}</div>
          </div>

          <div className="h-full w-full pb-32 md:pb-0">
            <Outlet />
          </div>

          <div
            id="controlbar"
            className="fixed overflow-hidden w-full border-t px-4 py-2 bottom-0 z-10 bg-background md:hidden"
          >
            <div className="flex flex-row gap-2 w-full items-center justify-between">
              <Link to="/" className="flex items-center gap-2 text-primary/60 hover:text-primary">
                <div>
                  <HomeIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <Link
                to="/explore"
                className="flex items-center gap-2 text-primary/60 hover:text-primary"
              >
                <div>
                  <CompassIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <Link
                to="/messages"
                className="flex items-center gap-2 text-primary/60 hover:text-primary"
              >
                <div>
                  <MailIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-2 text-primary/60 hover:text-primary">
                    <MenuIcon size={28} strokeWidth={1.4} />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Button variant="ghost" asChild>
                      <a
                        href="https://osty.dev"
                        target="_blank"
                        rel="noreferrer"
                        className="flex gap-2"
                      >
                        <ArrowRightIcon size={18} />
                        Powered by Osty
                      </a>
                    </Button>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    {theme === 'dark' ? (
                      <Button
                        variant="ghost"
                        className="flex gap-2"
                        onClick={() => setTheme('light')}
                      >
                        <SunIcon size={18} />

                        <span>Switch to light</span>
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        className="flex gap-2"
                        onClick={() => setTheme('dark')}
                      >
                        <MoonIcon size={18} />

                        <span>Switch to dark</span>
                      </Button>
                    )}
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Button variant="ghost" asChild>
                      <a
                        href="https://github.com/ostyjs/create-osty"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2"
                      >
                        <GitHubLogoIcon />

                        <span>GitHub</span>
                      </a>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const HomePage = () => import('./home');
const NotePage = () => import('./note');
const ProfilePage = () => import('./profile');
const MessagesPage = () => import('./messages');

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
      {
        path: '/messages',
        async lazy() {
          return { Component: (await MessagesPage()).MessagesPage };
        },
      },
      {
        path: '/messages/:npub',
        async lazy() {
          return { Component: (await MessagesPage()).MessagesPage };
        },
      },
    ],
  },
]);
