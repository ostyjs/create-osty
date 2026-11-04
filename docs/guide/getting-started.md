# Getting Started

## Before you start

Install a supported Node.js LTS release and a package manager. You can use npm,
Yarn, pnpm, or Bun. You also need network access to download dependencies and to
connect the generated application to Nostr relays.

You do not need a Nostr account to create the project or inspect its source.

## Create a project

To create a new Osty project, run the following command:

::: code-group

```sh [npm]
$ npm create osty@latest
```

```sh [yarn]
$ yarn create osty
```

```sh [pnpm]
$ pnpm create osty
```

```sh [bun]
$ bun create osty
```

:::

## Setup Wizard

After running the command above, you will be prompted to enter the project name and select a template.

```
┌
◇ Project name:
│ my-awesome-nostr-client
│
◆ Select a template:
│ ● nostribe
└
```

`nostribe` is the template currently included in the CLI. The wizard copies the
template into your project directory. It does not install dependencies.

You can also supply the directory and template in the command:

```sh
npm create osty@latest my-nostr-app -- --template nostribe
```

The CLI also accepts `-t nostribe`. If the directory already contains files, the
wizard asks whether to remove those files, cancel, or keep them. Choose a new
directory if you want to keep an existing project unchanged.

## Run the application

Navigate to the directory you chose, install dependencies, and start Vite:

```sh
$ cd my-awesome-nostr-client
$ npm install
$ npm run dev
```

Open the local URL printed by Vite. Keep the terminal running while you develop.
Changes to the application source appear in the browser through Vite.

Use the same package manager for installation and later commands. For example,
with pnpm, run `pnpm install` and `pnpm run dev` in the generated directory.

## Make your first change

1. Open `src/pages/home/index.tsx` in the generated project.
2. Change the page content and save the file.
3. Check the page in the browser.
4. Read the [project structure](./project-structure) before adding another feature.

The application initializes its Nostr connection in `src/app/index.tsx`.
See [Nostr integration](./nostr-integration) for relays and signing.

## Check a production build

Run these commands inside the generated project:

```sh
npm run build
npm run preview
```

`build` runs TypeScript and creates the Vite output in `dist/`. `preview` serves
that output locally. It is a preview command, not a production hosting service.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| A script cannot be found | Run it inside the generated project, after installing its dependencies. |
| The requested template is not recognized | Select `nostribe`, the template shipped by this CLI. |
| The interface opens but events do not load | Check the browser console and the relay connection. Some views need an active user and followed accounts. |
| A page works through navigation but fails after a reload on your host | Configure the host to serve `index.html` for application routes. The template uses browser routing. |

For help, include the command, error output, and your Node.js and package-manager
versions in a [GitHub issue](https://github.com/ostyjs/create-osty/issues).
