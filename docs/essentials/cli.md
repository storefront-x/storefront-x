# CLI

Storefront X has its own command-line interface (CLI).

You can run it either directly with package manager (`yarn sfx`) or add helpful scripts to root `package.json`.

```json
{
  "scripts": {
    "dev": "sfx dev",
    "build": "sfx build",
    "serve": "sfx serve"
  }
}
```

Each command has it's own help section, which you can show with the `--help` flag (`yarn dev --help`).

## dev

Starts the development server. It watches the project files and performs hot-module-reloading for better developer experience.

- `--port` set port for the development server
- `--host` set host for the development server
- `--config` set path to the Storefront X configuration file

:::warning
Because development build isn't optimized, initial load might appear to be broken (slow loading, missing styles, etc.). This is a side effect, how Vite serves files to the browser during the development and is non-issue in the production build.
:::

## build

Builds the production bundle. The production bundle can be found in the `.sfx/dist/` directory.

- `--config` set path to the Storefront X configuration file
- `--analyze` show visualization of the build JS bundle
- `--onlyBootstrap` only generate the `.sfx` directory without building the application

## serve

Serves the production bundle.

- `--port` set port for the development server
- `--host` set host for the development server
- `--compression` enable compression of the server output
- `--failOnServerError` show internal server error instead of SPA fallback on server error
