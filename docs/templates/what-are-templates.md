# What are Templates?

Templates contain the application files that `create-osty` copies into a new
directory. The generated files belong to your project. Edit them directly to
change the interface, routes, relays, and features.

The CLI currently ships one template: [Nostribe](./nostribe), a React and
TypeScript Nostr client. Vue and Svelte templates are not available in the
current CLI.

```sh
npm create osty@latest my-nostr-app -- --template nostribe
```

The CLI renames the template's `_gitignore` to `.gitignore` and sets the generated
`package.json` name. It then prints the commands to install dependencies and
start development. Run those commands in the generated directory.

See [Getting Started](../guide/getting-started) for the full setup process.
