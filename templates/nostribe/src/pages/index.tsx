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
  SearchIcon,
  SunIcon,
  TextIcon,
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
import { SearchWidget } from '@/features/search-widget';
import { TrendingNotesWidget } from '@/features/trending-notes-widget';
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
      <div className="h-full w-full max-w-screen-xl mx-auto overflow-hidden grid grid-cols-1 md:grid-cols-12">
        <div
          id="sidebar"
          className="hidden flex-col gap-2 overflow-hidden items-center w-full p-2 border-r md:flex md:col-span-1 xl:items-start xl:col-span-2"
        >
          <Link to="/" className="flex items-center gap-2 p-2">
            <div className="w-8 h-8">
              <img src="/nostribe-64.png" alt="Nostribe" className="w-8 h-8 object-contain" />
            </div>

            <span className="text-lg font-bold hidden xl:block">Nostribe</span>
          </Link>

          <div className="flex flex-col gap-2 items-center xl:w-full xl:items-start">
            <Link
              to="/"
              className="flex items-center gap-2 p-2 transition-colors duration-500 ease-out text-primary/60 hover:text-primary w-full rounded-lg hover:bg-secondary"
            >
              <div>
                <HomeIcon size={24} />
              </div>

              <span className="hidden xl:block">Home</span>
            </Link>

            <Link
              to="/reads"
              className="flex items-center gap-2 p-2 transition-colors duration-500 ease-out text-primary/60 hover:text-primary w-full rounded-lg hover:bg-secondary"
            >
              <div>
                <TextIcon size={24} />
              </div>

              <span className="hidden xl:block">Reads</span>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 p-2 transition-colors duration-500 ease-out text-primary/60 hover:text-primary w-full rounded-lg hover:bg-secondary"
            >
              <div>
                <CompassIcon size={24} />
              </div>

              <span className="hidden xl:block">Explore</span>
            </Link>

            <Link
              to="/messages"
              className="flex items-center gap-2 p-2 transition-colors duration-500 ease-out text-primary/60 hover:text-primary w-full rounded-lg hover:bg-secondary"
            >
              <div>
                <MailIcon size={24} />
              </div>

              <span className="hidden xl:block">Messages</span>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 p-2 transition-colors duration-500 ease-out text-primary/60 hover:text-primary w-full rounded-lg hover:bg-secondary"
            >
              <div>
                <BookmarkIcon size={24} />
              </div>

              <span className="hidden xl:block">Bookmarks</span>
            </Link>

            <Link
              to="/notifications"
              className="flex items-center gap-2 p-2 transition-colors duration-500 ease-out text-primary/60 hover:text-primary w-full rounded-lg hover:bg-secondary"
            >
              <div>
                <BellIcon size={24} />
              </div>

              <span className="hidden xl:block">Notifications</span>
            </Link>

            <SearchWidget>
              <div className="flex items-center gap-2 p-2 transition-colors duration-500 ease-out text-primary/60 hover:text-primary w-full rounded-lg hover:bg-secondary hover:cursor-pointer">
                <div>
                  <SearchIcon size={24} />
                </div>

                <span className="hidden xl:block">Search</span>
              </div>
            </SearchWidget>
          </div>

          <div className="mt-auto w-full">
            <div className="flex flex-col gap-4 w-full items-center">
              {sepehr && (
                <ZapWidget target={sepehr}>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted hover:cursor-pointer">
                    <span className="text-xs hidden xl:block">Buy me a coffee</span>

                    <CoffeeIcon className="w-5 h-5 xl:w-4 xl:h-4" />
                  </div>
                </ZapWidget>
              )}

              <div>{activeUser ? <ActiveUserWidget /> : <LoginWidget />}</div>
            </div>
          </div>
        </div>

        <div
          id="main"
          className="overflow-hidden w-full col-span-12 md:col-span-11 lg:col-span-8 xl:col-span-7"
        >
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

          <div className="h-full w-full pb-28 md:pb-0">
            <Outlet />
          </div>

          <div
            id="controlbar"
            className="fixed overflow-hidden w-full border-t px-4 py-2 bottom-0 z-10 bg-background md:hidden"
          >
            <div className="flex flex-row gap-2 w-full items-center justify-between">
              <Link
                to="/"
                className="flex items-center gap-2 transition-colors duration-500 ease-out text-primary/60 hover:text-primary"
              >
                <div>
                  <HomeIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <Link
                to="/explore"
                className="flex items-center gap-2 transition-colors duration-500 ease-out text-primary/60 hover:text-primary"
              >
                <div>
                  <CompassIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <SearchWidget>
                <div className="flex items-center gap-2 transition-colors duration-500 ease-out text-primary/60 hover:text-primary hover:cursor-pointer">
                  <div>
                    <SearchIcon size={28} strokeWidth={1.4} />
                  </div>
                </div>
              </SearchWidget>

              <Link
                to="/messages"
                className="flex items-center gap-2 transition-colors duration-500 ease-out text-primary/60 hover:text-primary"
              >
                <div>
                  <MailIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <Link
                to="/notifications"
                className="flex items-center gap-2 transition-colors duration-500 ease-out text-primary/60 hover:text-primary"
              >
                <div>
                  <BellIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-2 transition-colors duration-500 ease-out text-primary/60 hover:text-primary">
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

        <div
          id="rightbar"
          className="hidden border-l flex-col gap-2 overflow-hidden items-center p-2 lg:flex lg:col-span-3"
        >
          <TrendingNotesWidget />
        </div>
      </div>
    </>
  );
};

const HomePage = () => import('./home');
const NotePage = () => import('./note');
const ProfilePage = () => import('./profile');
const MessagesPage = () => import('./messages');
const NotificationsPage = () => import('./notifications');
const ReadsPage = () => import('./reads');

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
      {
        path: '/notifications',
        async lazy() {
          return { Component: (await NotificationsPage()).NotificationsPage };
        },
      },
      {
        path: '/reads',
        async lazy() {
          return { Component: (await ReadsPage()).ReadsPage };
        },
      },
    ],
  },
]);
