# Storefront X Framework

Storefront X is a modern e-commerce framework for building high-performance PWAs with SSR (server-side rendering). It is published as a monorepo of npm packages (`@storefront-x/*`) that other projects install and use.

- **Website**: https://docs.storefrontx.io/
- **Repo**: https://github.com/storefront-x/storefront-x
- **License**: MIT
- **Version**: 1.32.1 (all modules share the same version)

## Project Structure

```
modules/                    # 83 npm packages (@storefront-x/*)
├── core/                   # CLI (sfx command), build system, Dev/Build/Serve
├── vue/                    # Vue 3 integration
├── vue-router/             # Vue Router
├── vue-pinia/              # Pinia state management
├── vue-i18n/               # i18n
├── atomic-design/          # Atomic design concepts (atoms/molecules/organisms/...)
├── graphql/                # GraphQL client
├── cart/, cart-magento/    # Cart
├── catalog/, catalog-magento/     # Product catalog
├── checkout/, checkout-magento/   # Checkout
├── customer/, customer-magento/   # Customer/account
├── magento/                # Magento 2 integration
├── theme-tailwind/         # Tailwind CSS theme
├── theme-tailwind-magento/ # Tailwind theme for Magento
├── testing/                # Testing utilities
├── tooling/                # Build tooling (ESLint, TypeScript)
├── create-storefront-x/    # Scaffolding tool for new projects
└── ...                     # ~60 more modules
docs/                       # VitePress documentation
tests/                      # Playwright tests for the framework (integration)
storefront-x.magento.config.js  # Demo configuration for Magento
storefront-x.px.config.js      # Demo configuration for PX
```

## Key Commands

```bash
# Development (requires config file)
yarn dev --config storefront-x.magento.config.js   # Magento demo
yarn dev --config storefront-x.px.config.js        # PX demo
yarn build --config storefront-x.magento.config.js # Production build
yarn serve                                          # Start production build

# Testing
yarn test:unit         # Vitest unit tests
yarn test:playwright   # Playwright e2e tests for the framework

# Documentation
yarn docs:dev          # VitePress dev server
yarn docs:build        # Build documentation

# Code
yarn lint              # ESLint check
yarn make              # sfx make (scaffolding)
```

## Framework Architecture

### Modules
Each module in `modules/` is a standalone npm package. Modules can:
- Register IOC items (components, composables, stores)
- Extend the functionality of other modules using concepts
- Add server routes, plugins, pages, server middleware

### Concepts System
Concepts are the core of the SFX architecture. Each module can have a `concepts/` directory with concept classes that define how files from modules are processed during bootstrap.

Key concept types:
- `IocConcept` — Registers files in the IOC container
- `GeneratingConcept` — Generates `.sfx/` files from module files (re-exports)
- `CopyingConcept` — Copies files to the target directory
- `MergingConcept` — Merges object exports across modules
- `ExtendingConcept` — Allows extending/overriding files
- `OverridingConcept` — Last module in order wins (override)

### IOC Container
After bootstrap, `.sfx/ioc/` contains the resolved IOC registrations. Applications import via `#ioc/` aliases:
```typescript
import useI18n from '#ioc/composables/useI18n'
import Button from '#ioc/atoms/Button'
import useCartStore from '#ioc/stores/useCartStore'
```

### Bootstrap Process
`sfx dev` or `sfx build` → loads `storefront-x.config.js` → loads modules in order → runs concepts → generates `.sfx/` directory

## Module Structure

```
modules/my-module/
├── package.json            # npm metadata (@storefront-x/my-module)
├── index.js                # Module entry point
├── concepts/               # Concept classes (define bootstrap behavior)
├── atoms/                  # Atomic design — atomic components
├── molecules/              # Atomic design — molecules
├── organisms/              # Atomic design — organisms
├── composables/            # Vue composables (use*.ts)
├── stores/                 # Pinia stores
├── repositories/           # Data access layer
├── services/               # Business logic
├── graphql/                # GraphQL queries/mutations
├── server/                 # Server-side code (routes, middleware)
├── plugins/                # Vite/Vue plugins
└── tests/                  # Unit tests
```

## Dependency Management

The project uses **Yarn 3** with workspaces and **Lerna** for versioning.

```bash
yarn install                                        # Install all dependencies
yarn workspace @storefront-x/core add <dep>         # Add dependency to a module
```

## Versioning and Release

All modules share the same version (currently `1.32.1`). Lerna manages this centrally. Releases are done via `lerna version`.

## Testing

- **Unit tests**: Vitest, run via `yarn test:unit`
- **E2E tests**: Playwright, run via `yarn test:playwright`
- **Manual testing**: `yarn dev --config storefront-x.magento.config.js` → http://localhost:3000

## Key Conventions

1. **Modules are isolated** — each module has its own `package.json` and depends on its own dependencies
2. **Module order matters** — in `storefront-x.config.js`, a later module overrides an earlier one (for override concepts)
3. **IOC via `#ioc/`** — never import directly from `.sfx/`, always via alias
4. **TypeScript** — all new code is written in TypeScript
5. **Concepts generate code** — never manually edit `.sfx/` files, they are generated

## Current Branch: upgrade-vue

Vue and related dependencies upgrade in progress. When working in this context:
- Check the impact on all modules that use Vue
- Verify breaking changes in the Vue and @vitejs/plugin-vue CHANGELOG
- Run `yarn test:playwright` after major changes
