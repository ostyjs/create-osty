# Project Structure

The Nostribe template separates application setup, pages, feature widgets, and
shared code.

```text
src/
  main.tsx             # Mounts the React application
  app/                 # Nostr initialization, theme, and application styles
  pages/               # Routes, shared layout, and page components
  features/            # Nostr widgets and their hooks and components
  shared/
    components/        # UI components and theme support
    store/             # Sample Zustand store
    utils/             # Shared helpers
```

## Add a page

Create `src/pages/about/index.tsx`:

```tsx
export const AboutPage = () => <main>About this Nostr application</main>;
```

Import it into `src/pages/index.tsx` and add a child route to the existing layout:

```tsx
import { AboutPage } from './about';

// Add this object to the existing layout's children array:
{ path: '/about', element: <AboutPage /> }
```

Add a `Link` to `/about` in the layout if the page needs a navigation item. Keep
the existing router and `RouterProvider`; you do not need another router.

## Use a UI component

UI components are local source files. For example:

```tsx
import { Button } from '@/shared/components/ui/button';

export const RefreshButton = () => (
  <Button variant="outline" onClick={() => window.location.reload()}>
    Refresh
  </Button>
);
```

The `@/` alias refers to `src/`. Edit the component itself when you need to change
its default appearance or behavior.

## Compose a widget

Widgets combine UI with feature-specific hooks. For example, the template uses
`LoginWidget` from `@/features/login-widget` in its shared layout:

```tsx
import { LoginWidget } from '@/features/login-widget';

export const SignIn = () => <LoginWidget />;
```

Keep page layout in `pages/`. Keep a widget's own hooks and components beside that
widget in `features/`. Reuse `shared/` for code that serves multiple features.

## Manage state

Use React state for local UI state. `src/shared/store/index.ts` provides a small
Zustand store as a starting point for shared application state. Nostr event and
user state is exposed through `nostr-hooks`; inspect an existing widget before
adding a second state layer for the same data.
