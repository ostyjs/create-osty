# Development

## Work on a generated application

The Nostribe `package.json` provides these commands:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Run TypeScript and build the application. |
| `npm run preview` | Preview the built application locally. |
| `npm run lint` | Check TypeScript and React files with ESLint. |
| `npm run format` | Format files with Prettier. This command changes files. |

Run commands from the generated project's directory. Use the corresponding
command for your package manager if you do not use npm.

Keep changes focused. Check the affected routes in the browser, then run the
build and lint commands. Record any failure when reporting a problem.

## Work on create-osty itself

Fork the repository and clone your fork. Install its dependencies:

```sh
git clone https://github.com/YOUR-USERNAME/create-osty.git
cd create-osty
npm install
```

The repository root and a generated application have different scripts:

| Repository command | Purpose |
| --- | --- |
| `npm run build` | Build the CLI from `src/index.ts`. |
| `npm run dev` | Create development stubs for the CLI with unbuild. |
| `npm run docs:dev` | Preview this VitePress documentation. |
| `npm run docs:build` | Build the documentation and check its internal links. |
| `npm run docs:preview` | Preview the built documentation. |

Templates live in `templates/`. Documentation lives in `docs/`. If you change a
template, create a fresh project from it and check that project's behavior.

See the [contribution guide](https://github.com/ostyjs/create-osty/blob/main/CONTRIBUTING.md)
for issue reports and pull requests. Explain what changed and include the checks
you actually ran.
