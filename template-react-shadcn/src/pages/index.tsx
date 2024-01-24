import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { HomePage } from './home';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomePage />}>
      {
        // ...
      }
    </Route>,
  ),
);
