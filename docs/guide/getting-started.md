# Getting Started

## Installation

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

After entering the project name and selecting a template, the setup wizard will create a new Osty project.
Then you can navigate to the project directory and start the development server:

```sh
$ cd my-awesome-nostr-client
$ npm install
$ npm run dev
```
