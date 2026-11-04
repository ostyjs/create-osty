# Nostr Integration

Nostribe uses `nostr-hooks` and Nostr Development Kit (NDK) to connect the React
application to Nostr.

## Relay connections

`src/app/index.tsx` initializes NDK with the template's relay list:

```tsx
initNdk({
  explicitRelayUrls: [
    'wss://nos.lol',
    'wss://relay.primal.net',
    'wss://relay.nostr.band',
  ],
});
```

A separate effect calls `ndk.connect()`. Change `explicitRelayUrls` to use the
relays that suit your application. Relay availability and relay policies can
change. Check connection failures in the browser when events do not arrive.

## Login and signing

`LoginWidget` offers a browser extension, a remote signer, or a secret key. Its
implementation is in `src/features/login-widget/`.

Use a separate development identity when testing publishing and account actions.
Prefer an extension or remote signer when you do not want the application to
handle a private key directly. Never put a private key in source code, a public
environment variable, or a Git commit.

Application startup calls `loginFromLocalStorage()` to restore the previous login.
Review that behavior and the login hooks when changing how your application
handles sessions.

## Events and subscriptions

The notes feed is a working example in
`src/features/notes-feed-widget/hooks/index.ts`. It reads the active user and
their follows, then creates a kind-1 subscription with an author filter. The hook
returns events, loading state, and pagination controls for the widget.

Follow the same separation in a new feature:

1. Define the Nostr filters for the data you need.
2. Keep subscription logic in the feature's hook.
3. Render loading, empty, and populated states in its component.
4. Request more events through the subscription's pagination interface.

The template includes `@nostr-dev-kit/ndk-cache-dexie` as a dependency. A dependency
entry alone does not configure a cache adapter. Check the NDK initialization and
the installed library's API before adding a persistent cache.

## Zaps

`ZapWidget` accepts an NDK event or user as its target. The shared layout contains
an example. A zap can trigger a real Lightning payment. Use a test setup when
developing payment interactions and show the target clearly to the user.

## Further references

- [Nostr protocol specifications](https://github.com/nostr-protocol/nips)
- [NDK](https://github.com/nostr-dev-kit/ndk)
- [nostr-hooks](https://github.com/ostyjs/nostr-hooks)

Match library examples to the versions installed in your project.
