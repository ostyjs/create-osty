# Nostribe

Nostribe is the React and TypeScript template included in `create-osty`. It is a
Nostr client that you can use as a starting point for your own application.

## Create it

```sh
npm create osty@latest my-nostr-app -- --template nostribe
cd my-nostr-app
npm install
npm run dev
```

## Included features

| Area | Source directory |
| --- | --- |
| Login and logout | `src/features/login-widget`, `src/features/logout-widget` |
| Notes and feeds | `src/features/note-widget`, `src/features/notes-feed-widget` |
| Profiles | `src/features/user-profile-widget` |
| Messages | `src/features/messages-widget` |
| Notifications | `src/features/notifications-widget` |
| Articles | `src/features/article-widget` |
| Search | `src/features/search-widget` |
| Reactions and zaps | `src/features/reaction-widget`, `src/features/zap-widget` |

The shared layout and route definitions are in `src/pages/index.tsx`. Application
initialization is in `src/app/index.tsx`.

## Customize the template

- Change the layout and navigation in `src/pages/index.tsx`.
- Add a feature under `src/features/` and compose it into a page.
- Edit reusable UI components under `src/shared/components/ui/`.
- Change theme styles in `src/app/index.css`.
- Configure relays in `src/app/index.tsx`.

Start with a focused change. Run the [development checks](../guide/development)
before sharing it. Keep keys and account-specific configuration out of commits.
