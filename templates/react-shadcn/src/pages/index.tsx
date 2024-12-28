import { Outlet, createBrowserRouter } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const HomePage = () => import('./home');
const NotesFeedPage = () => import('./notes-feed');
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
        path: '/notes/:noteId',
        async lazy() {
          return { Component: (await NotesFeedPage()).NotesFeedPage };
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
