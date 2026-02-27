# Storefront X Framework — Development Rules

## What This Repository Is

This is the **source code of the Storefront X framework itself** — not a project that uses the framework. A monorepo with 83 npm packages (`@storefront-x/*`).

Documentation: https://docs.storefrontx.io/

## Monorepo Structure

```
modules/                    # All npm packages (@storefront-x/*)
├── core/                   # CLI (sfx), build system, base concept classes
│   └── src/
│       ├── Core.js         # Bootstrap orchestrator
│       ├── Concept.js      # Base concept class
│       ├── IocConcept.js
│       ├── GeneratingConcept.js
│       ├── ExtendingConcept.js
│       ├── MergingConcept.js
│       ├── CopyingConcept.js
│       └── OverridingConcept.js
├── vue/                    # Vue 3 integration
├── atomic-design/          # Atomic design concepts
├── theme-tailwind/         # Tailwind CSS theme
└── ...
docs/                       # VitePress documentation
tests/                      # Playwright tests for the framework
```

## Concepts System

Bootstrap process (`sfx dev` / `sfx build`):
1. Loads the module list from `storefront-x.config.js`
2. For each module, loads classes from the `concepts/` directory
3. Runs each concept across each module: `before()` → `run(module)` → `after()`
4. Output is generated into the `.sfx/` directory

### Concept Types

```javascript
// IocConcept — registers files into the IOC container
import { IocConcept } from '@storefront-x/core'
export default class Atoms extends IocConcept {
  get directory() { return 'atoms' }
}

// GeneratingConcept — generates a single file re-exporting everything from modules
import { GeneratingConcept } from '@storefront-x/core'
export default class ServerRoutes extends GeneratingConcept {
  get directory() { return 'server/routes' }
}

// Others: ExtendingConcept, MergingConcept, CopyingConcept, OverridingConcept
```

### IOC Container

`.sfx/ioc/` is a **generated directory** — never edit it manually. Applications import via the `#ioc/` alias:

```typescript
import Button from '#ioc/atoms/Button'
import useCartStore from '#ioc/stores/useCartStore'
import useI18n from '#ioc/composables/useI18n'
```

## Module Structure

```
modules/my-module/
├── package.json       # { "name": "@storefront-x/my-module", "version": "1.32.1" }
├── index.js           # Entry point
├── concepts/          # Concept classes (how the module integrates into bootstrap)
├── atoms/             # Vue components — atom level
├── molecules/         # Vue components — molecule level
├── organisms/         # Vue components — organism level
├── composables/       # Vue composables (use*.ts)
├── stores/            # Pinia stores
├── repositories/      # Data access layer
├── graphql/           # GraphQL queries/mutations
├── server/            # Server-side code (H3 routes, middleware)
├── plugins/           # Vite/Vue plugins
└── tests/             # Unit tests (vitest)
```

## Key Conventions

- **Module order in config matters** — a later module overrides an earlier one (OverridingConcept)
- **TypeScript** — new code in `.ts` and Vue SFC with `<script setup lang="ts">`
- **ESM only** — all packages have `"type": "module"`, no CommonJS
- **No direct cross-module imports** — modules communicate via IOC (`#ioc/`) or concepts
- **Versions are synchronized** — all `package.json` must have the same version as `lerna.json`

## Dependency Management

```bash
yarn workspace @storefront-x/vue add vue@^3.5.0        # Add dependency to a module
yarn workspace @storefront-x/core add -D typescript    # Add dev dependency to a module
yarn add -W -D eslint                                   # Shared root dev dependency
```

## Upgrading Dependencies

When upgrading a shared dependency (e.g., Vue, Vite):
1. Check the migration guide / CHANGELOG of the dependency
2. Update `package.json` in all affected modules
3. `yarn install`
4. `yarn build` — verify the build passes without errors
5. `yarn test:playwright` — run integration tests
6. Manual verification: `yarn dev --config storefront-x.magento.config.js`

For upgrading Vue — affected modules: `vue`, `vue-router`, `vue-pinia`, `vue-i18n`, `vue-head`, `vue-head-vueuse`, `atomic-design`, `theme-tailwind` and all `*-magento` modules.
