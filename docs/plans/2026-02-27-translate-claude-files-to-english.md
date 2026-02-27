# Translate .claude/ Configuration Files to English — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Translate all 13 .claude/ configuration files from Czech to English so the Storefront X framework is accessible to contributors from all countries.

**Architecture:** Sequential translation by category — CLAUDE.md first (establishes terminology), then rules, agents, commands. Each task replaces one file's complete content with the English translation provided in the plan. No logic changes, no structural changes — pure translation.

**Tech Stack:** Plain Markdown files. Verification via grep. Git commits after each file.

**Translation Rules (apply to all tasks):**
- Translate: all prose, section headings, inline comments inside code blocks, YAML frontmatter `description` fields
- Keep unchanged: code blocks (actual code), file paths, CLI commands, URLs, framework class names (`IocConcept`, `GeneratingConcept`, etc.), YAML `name`/`tools`/`color` fields

---

## Task 1: Translate CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Write the translated content**

Replace the entire content of `CLAUDE.md` with:

```markdown
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
```

**Step 2: Verify no Czech words remain**

Run:
```bash
grep -i -E "(Struktura|Klíčové|příkazy|Architektura|konceptů|Bootstrap|Moduly|Správa|závislostí|Verzování|Testování|Konvence|Větev|Systém|Kontejner)" CLAUDE.md | head -20
```
Expected: no output (zero matches)

**Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "chore: translate CLAUDE.md to English"
```

---

## Task 2: Translate .claude/rules/sfx.md

**Files:**
- Modify: `.claude/rules/sfx.md`

**Step 1: Write the translated content**

Replace the entire content of `.claude/rules/sfx.md` with:

```markdown
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
```

**Step 2: Verify no Czech words remain**

Run:
```bash
grep -i -E "(Systém|Struktura|Typy|Klíčové|Konvence|Závislosti|Správa|Verzování|dotčené)" .claude/rules/sfx.md | head -20
```
Expected: no output

**Step 3: Commit**

```bash
git add .claude/rules/sfx.md
git commit -m "chore: translate .claude/rules/sfx.md to English"
```

---

## Task 3: Translate .claude/rules/cowork.md

**Files:**
- Modify: `.claude/rules/cowork.md`

**Step 1: Write the translated content**

Replace the entire content of `.claude/rules/cowork.md` with:

```markdown
# Workflow for Storefront X Framework Development

## General Philosophy

- **Read first** before modifying code — always read the affected files
- Changes must make sense in the context of the entire monorepo — one module can affect many others
- When fixing bugs, look for the root cause, not a workaround

## Git Workflow

```bash
# Always start from main
git checkout main && git pull

# Feature branch
git checkout -b fix/description-of-fix
git checkout -b feat/new-feature
git checkout -b chore/upgrade-vue

# Conventional commits
git commit -m "fix: fix hydration mismatch in vue/composables/useHead"
git commit -m "feat: add OverridingConcept to core"
git commit -m "chore: upgrade vue to 3.5.x"
git commit -m "docs: update concepts section"
```

## Bug Fix Workflow

1. **Understand the problem** — reproduce it on the dev server: `yarn dev --config storefront-x.magento.config.js`
2. **Find affected files** — search in the `modules/` directory
3. **Fix** — minimal changes, no unnecessary refactoring
4. **Verify** — dev server + `yarn lint`
5. **Check impact** — will the change affect other modules?

## Dependency Upgrade Workflow

1. **Find breaking changes** — read the CHANGELOG and migration guide
2. **Update `package.json`** in all affected modules
3. `yarn install`
4. **Fix TypeScript errors** — run `yarn lint` or check IDE
5. **Verify build** — `yarn build --config storefront-x.magento.config.js`
6. **Run tests** — `yarn test:playwright`
7. **Manual test** — `yarn dev --config storefront-x.magento.config.js`

## Documentation Workflow

Documentation is in `docs/` (VitePress). Dev server: `yarn docs:dev`

```bash
yarn docs:dev     # Local preview at http://localhost:5173
yarn docs:build   # Verify the build works
```

## Key Commands

```bash
yarn dev --config storefront-x.magento.config.js   # Demo dev server (main testing method)
yarn build --config storefront-x.magento.config.js # Verify production build
yarn lint                                            # ESLint
yarn test:unit                                       # Vitest unit tests
yarn test:playwright                                 # Playwright e2e tests
yarn docs:dev                                        # VitePress dev server
```

## What Not to Do

- **Don't edit the `.sfx/` directory** — it's generated, changes will be overwritten
- **Don't add dependencies to the root `package.json`** except for shared dev tools
- **Don't change versions in individual `package.json` manually** — versions are managed by Lerna
- **Don't create files unnecessarily** — prefer editing existing ones
```

**Step 2: Verify no Czech words remain**

Run:
```bash
grep -i -E "(Obecná|filozofie|Opravy|Workflow|závislostí|příkazy|Dokumentace|Klíčové|Neměň|Nepřidávej|Neupravuj)" .claude/rules/cowork.md | head -20
```
Expected: no output

**Step 3: Commit**

```bash
git add .claude/rules/cowork.md
git commit -m "chore: translate .claude/rules/cowork.md to English"
```

---

## Task 4: Translate .claude/rules/vue.md

**Files:**
- Modify: `.claude/rules/vue.md`

**Step 1: Write the translated content**

Replace the entire content of `.claude/rules/vue.md` with:

```markdown
# Vue 3 Conventions in the Storefront X Framework

## Components — Composition API

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Imports from the IOC container (in framework context, not in modules themselves)
// import Button from '#ioc/atoms/Button'

const isLoading = ref(false)
const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>

<template>
  <div>
    <slot />
  </div>
</template>
```

## Preferred Style

- **`<script setup lang="ts">`** — for all new components
- **Options API** — only when editing old components that already use it
- **TypeScript** — always, avoid `any`
- **`defineProps` / `defineEmits`** — always with type annotations

```vue
<script setup lang="ts">
const props = defineProps<{
  title: string
  count?: number
}>()

const emit = defineEmits<{
  update: [value: number]
  close: []
}>()
</script>
```

## Composables (use*.ts)

```typescript
// Composable pattern in modules/my-module/composables/useFeature.ts
import { ref, computed } from 'vue'

export default function useFeature() {
  const state = ref<string | null>(null)
  const isReady = computed(() => state.value !== null)

  async function load() {
    // logic
  }

  return { state, isReady, load }
}
```

## Pinia Stores

```typescript
// modules/my-module/stores/useMyStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export default defineStore('myStore', () => {
  const items = ref<Item[]>([])
  const isLoading = ref(false)

  const count = computed(() => items.value.length)

  async function fetchItems() {
    isLoading.value = true
    try {
      // fetch logic
    } finally {
      isLoading.value = false
    }
  }

  function $reset() {
    items.value = []
    isLoading.value = false
  }

  return { items, isLoading, count, fetchItems, $reset }
})
```

## Styling

```vue
<template>
  <div class="bg-white rounded-lg p-4">
    <h2 class="text-lg font-semibold">Title</h2>
  </div>
</template>

<style scoped>
/* Only when Tailwind is not enough */
.component-class {
  @apply bg-primary-500 text-white;
}
</style>
```

## Security

- **Never use `v-html` with untrusted content** — XSS risk
- **Sanitize user input** before rendering

## Common Anti-Patterns

- Directly mutating props — always emit an event
- `v-if` and `v-for` on the same element — wrap in `<template>`
- Missing `:key` in `v-for`
- Complex logic in templates — move to computed or composable
- `v-html` with untrusted content
```

**Step 2: Verify no Czech words remain**

Run:
```bash
grep -i -E "(Preferovaný|styl|pouze|Přímá|mutace|Složitá|logika|Chybějící|Vyhýbej|Nikdy|Bezpečnost)" .claude/rules/vue.md | head -20
```
Expected: no output

**Step 3: Commit**

```bash
git add .claude/rules/vue.md
git commit -m "chore: translate .claude/rules/vue.md to English"
```

---

## Task 5: Translate .claude/rules/tailwind.md

**Files:**
- Modify: `.claude/rules/tailwind.md`

**Step 1: Write the translated content**

Replace the entire content of `.claude/rules/tailwind.md` with:

```markdown
# Tailwind CSS v3 — Conventions in the Storefront X Framework

Tailwind CSS is integrated via the `@storefront-x/theme-tailwind` module (and `theme-tailwind-magento`).

## Core Principles

- **Utility-first** — classes directly in HTML/template, not custom CSS
- **Mobile-first** — start with mobile, scale up via `sm:`, `md:`, `lg:`, `xl:`
- **No custom CSS** when Tailwind covers the case

## Layout

```vue
<template>
  <!-- Container -->
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Flexbox -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex-1">Content</div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>Item</div>
    </div>
  </div>
</template>
```

## Interactive States

```vue
<template>
  <button
    class="
      bg-primary-500 hover:bg-primary-600 active:bg-primary-700
      text-white font-semibold py-2 px-4 rounded-lg
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    "
  >
    Action
  </button>
</template>
```

## Responsive Design

```vue
<template>
  <!-- Show only on certain breakpoints -->
  <div class="block sm:hidden">Mobile only</div>
  <div class="hidden sm:block">Desktop+</div>

  <!-- Responsive typography -->
  <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">Heading</h1>
</template>
```

## Loading and Skeleton States

```vue
<template>
  <!-- Spinner -->
  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />

  <!-- Skeleton -->
  <div class="animate-pulse space-y-2">
    <div class="h-4 bg-gray-200 rounded w-3/4" />
    <div class="h-4 bg-gray-200 rounded w-1/2" />
  </div>
</template>
```

## Accessibility

```vue
<template>
  <!-- Screen reader only -->
  <span class="sr-only">Description for screen reader</span>

  <!-- Skip link -->
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded"
  >
    Skip to content
  </a>
</template>
```

## Configuration (tailwind.config.js)

Find the configuration in `modules/theme-tailwind/`. Projects can override it via their own module.

## Anti-Patterns

- Writing custom CSS when a Tailwind class exists
- Hardcoding colors (`bg-[#ff0000]`) instead of using theme tokens
- Ignoring the mobile-first approach
- Omitting focus states — critical for accessibility
```

**Step 2: Verify no Czech words remain**

Run:
```bash
grep -i -E "(Základní|principy|Interaktivní|Responzivní|Přístupnost|Konfigurace|Psát|Ignorovat|Vynechávat|Hardcodovat)" .claude/rules/tailwind.md | head -20
```
Expected: no output

**Step 3: Commit**

```bash
git add .claude/rules/tailwind.md
git commit -m "chore: translate .claude/rules/tailwind.md to English"
```

---

## Task 6: Translate .claude/rules/e2e.md

**Files:**
- Modify: `.claude/rules/e2e.md`

**Step 1: Write the translated content**

Replace the entire content of `.claude/rules/e2e.md` with:

```markdown
# Playwright E2E Testing — Storefront X Framework

The framework has its own Playwright tests to verify bootstrap functionality, concepts, and integrations.

## Test Structure

```
tests/                              # Global Playwright tests for the framework
modules/core/src/playwright/        # Playwright utilities for the framework
playwright.config.js                # Main Playwright configuration
```

## Running Tests

```bash
yarn test:playwright                # All tests
npx playwright test --ui            # UI mode
npx playwright test path/to/test    # Specific test
npx playwright show-report          # HTML report after testing
```

## Writing Tests

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature name', () => {
  test('description of what the test verifies', async ({ page }) => {
    await page.goto('/')

    await test.step('Step 1 — description', async () => {
      // actions
    })

    await test.step('Step 2 — assertion', async () => {
      await expect(page.locator('[data-cy=element]')).toBeVisible()
    })
  })
})
```

## Selectors — Priority

1. `data-cy` attributes (preferred)
2. Role-based: `page.getByRole('button', { name: '...' })`
3. Text: `page.getByText('...')`
4. CSS selectors (last resort)

## Rules

- **Do not use `page.waitForTimeout()`** — use web-first assertions
- **Isolate tests** — each test must be independent
- **Prefer `await expect(locator).toBeVisible()`** — auto-retry
- **Organize with `test.step()`** — clear structure
```

**Step 2: Verify no Czech words remain**

Run:
```bash
grep -i -E "(Struktura|Spuštění|Psaní|Selektory|Pravidla|Izoluj|Preferuj|Organizuj|ověření)" .claude/rules/e2e.md | head -20
```
Expected: no output

**Step 3: Commit**

```bash
git add .claude/rules/e2e.md
git commit -m "chore: translate .claude/rules/e2e.md to English"
```

---

## Task 7: Translate .claude/agents/codebase-locator.md

**Files:**
- Modify: `.claude/agents/codebase-locator.md`

**Step 1: Write the translated content**

Replace the entire content of `.claude/agents/codebase-locator.md` with:

```markdown
---
name: codebase-locator
description: Searches for files, directories, and components relevant to a specific feature or task in the Storefront X framework monorepo. Use this agent as a "Super Grep/Glob/LS" — whenever you want to search multiple locations or navigate 83 modules.
tools: Grep, Glob, Bash
---

You are a specialist in finding files in the Storefront X framework monorepo. Your task is to locate relevant files and organize them by purpose — not to analyze their content.

## Responsibilities

1. **Find files by topic/feature** — keywords, directory patterns, naming
2. **Categorize results** — Vue components, concepts, composables, stores, tests, configuration
3. **Return structured results** — grouped by purpose, with full paths

## Navigation Priority

Search in this order:

1. **`modules/core/src/`** — bootstrap, concepts, build system
2. **`modules/<feature>/`** — specific feature module (cart, catalog, checkout...)
3. **`modules/vue/`**, **`modules/vue-router/`** etc. — Vue integrations
4. **`modules/theme-tailwind/`** — Tailwind theme
5. **`tests/`** — Playwright tests for the framework
6. **`docs/`** — VitePress documentation
7. **Root files** — `storefront-x.magento.config.js`, `package.json`, `lerna.json`

## File Patterns by Type

- **Concepts**: `modules/*/concepts/*.js`
- **Vue components**: `modules/*/atoms/*.vue`, `modules/*/molecules/*.vue`, `modules/*/organisms/*.vue`
- **Composables**: `modules/*/composables/use*.ts`
- **Pinia stores**: `modules/*/stores/use*.ts`
- **Repositories**: `modules/*/repositories/use*.ts`
- **Server routes**: `modules/*/server/routes/*.ts`
- **Plugins**: `modules/*/plugins/*.ts`
- **Unit tests**: `modules/*/tests/**/*.spec.ts`
- **Playwright tests**: `tests/**/*.spec.ts`
- **Package metadata**: `modules/*/package.json`
- **Configuration**: `storefront-x.*.config.js`

## Output Format

```
## Results for [search term]

### Concepts
- `modules/atomic-design/concepts/Atoms.js` — registers atoms into IOC
- `modules/vue/concepts/Components.js` — Vue components

### Vue Components
#### Atoms
- `modules/theme-tailwind/atoms/Button.vue` — base button

#### Organisms
- `modules/cart/organisms/CartSummary.vue` — cart summary

### Composables
- `modules/vue/composables/useRouter.ts` — Vue Router wrapper

### Stores
- `modules/cart/stores/useCartStore.ts` — cart state

### Tests
- `tests/cart.spec.ts` — Playwright tests for cart

### Configuration
- `storefront-x.magento.config.js` — module list for Magento demo

### Relevant Directories
- `modules/cart/` — contains X files
- `modules/cart-magento/` — contains Y files
```

## Important Guidelines

- **Do not analyze file content** — only report locations
- **Be thorough** — check multiple naming patterns
- **Include counts** — "contains X files" for directories
- **Check both demos** — `demo-magento` and `demo-px` for reference implementations
```

**Step 2: Verify no Czech words remain**

Run:
```bash
grep -i -E "(Odpovědnosti|Navigační|priorita|Vzory|Výstupní|formát|Důležité|pokyny|Buď|Zahrň|Zkontroluj)" .claude/agents/codebase-locator.md | head -20
```
Expected: no output

**Step 3: Commit**

```bash
git add .claude/agents/codebase-locator.md
git commit -m "chore: translate .claude/agents/codebase-locator.md to English"
```

---

## Task 8: Translate .claude/agents/codebase-analyzer.md

**Files:**
- Modify: `.claude/agents/codebase-analyzer.md`

**Step 1: Write the translated content**

Replace the entire content of `.claude/agents/codebase-analyzer.md` with:

```markdown
---
name: codebase-analyzer
description: Analyzes implementation details of the Storefront X framework. Use this agent when you need to understand how concepts, the IOC system, the bootstrap process, or a specific module works. The more detailed the prompt, the better the result.
tools: Read, Grep, Glob, Bash
---

You are a specialist in understanding HOW the code works in the Storefront X framework monorepo. Your task is to analyze implementation details, trace data flows, and explain technical operation with precise file references.

## Responsibilities

1. **Analyze implementation** — read files, identify key classes, methods, and their purpose
2. **Trace data flow** — from config input through bootstrap to generated output
3. **Identify patterns** — how concepts work, how IOC registration works, how modules compose
4. **Document with references** — always cite `file:line`

## Analysis Strategy

### Step 1: Entry Points
- **Bootstrap**: `modules/core/src/Core.js` — orchestrator
- **Concepts**: `modules/core/src/Concept.js`, `IocConcept.js`, `GeneratingConcept.js` etc.
- **CLI**: `modules/core/sfx.js`
- **Specific module**: start with `modules/<module>/concepts/` then `index.js`

### Step 2: Trace the Code
- How the module registers into bootstrap
- How the concept processes files from the module
- What gets generated into the `.sfx/` directory
- How IOC aliases (`#ioc/`) resolve to actual files

### Step 3: Understand Key Logic
- Concept lifecycle: `before()` → `run(module)` → `after()`
- How `IocConcept` registers files
- How `GeneratingConcept` generates `.sfx/` files
- How `ExtendingConcept` allows extensions
- How `OverridingConcept` implements override (last module wins)

## Output Format

```
## Analysis: [Feature/Class/Concept Name]

### Overview
[2-3 sentences about how it works in the SFX framework context]

### Entry Points
- `modules/core/src/Core.js:45` — bootstrap orchestrator
- `modules/vue/concepts/Components.js:1` — Vue component registration into IOC

### Key Implementation

#### 1. [Class/File] (`modules/core/src/IocConcept.js`)
- Inherits from `Concept.js` via `modules/core/src/Concept.js:10`
- Method `run(module)` at line 25 — iterates files in directory
- Generates records for IOC registration

#### 2. [Output] (`.sfx/ioc/atoms.ts`)
- Generated file — re-exports atoms from all modules
- Available via `#ioc/atoms/Button` alias

### Data Flow
1. `sfx dev` runs `Core.js:run()` at line 10
2. Core loads modules from config, calls `concept.before()`
3. For each module: `concept.run(module)` scans the `atoms/` directory
4. `concept.after()` generates `.sfx/ioc/atoms.ts`
5. Vite alias `#ioc` resolves to `.sfx/ioc/`

### Key Patterns
- **Inheritance chain**: `IocConcept extends Concept`
- **Template method pattern**: `before/run/after` lifecycle
- **Code generation**: EJS templates for `.sfx/` files

### Edge Cases and Behavior
- What happens if two modules have a file with the same name
- How override concepts resolve collisions
```

## Important Guidelines

- **Always cite file:line** for every claim
- **Read files in full** before drawing conclusions
- **Trace actual code paths** — don't guess
- **Focus on "how"** — not "what" or "why"
- **Distinguish between source code and generated code** — `.sfx/` is generated

## What Not to Do

- Don't guess about implementation without reading the code
- Don't skip ahead without tracing actual code
- Don't confuse source files with generated files (`.sfx/`)
- Don't give architectural recommendations — only analyze
```

**Step 2: Verify no Czech words remain**

Run:
```bash
grep -i -E "(Odpovědnosti|Strategie|analýzy|Výstupní|Důležité|pokyny|Nehádej|Neskákej|Nepleť|Nedávej)" .claude/agents/codebase-analyzer.md | head -20
```
Expected: no output

**Step 3: Commit**

```bash
git add .claude/agents/codebase-analyzer.md
git commit -m "chore: translate .claude/agents/codebase-analyzer.md to English"
```

---

## Task 9: Translate .claude/agents/codebase-pattern-finder.md

**Files:**
- Modify: `.claude/agents/codebase-pattern-finder.md`

**Step 1: Write the translated content**

Replace the entire content of `.claude/agents/codebase-pattern-finder.md` with:

```markdown
---
name: codebase-pattern-finder
description: Searches for similar implementations, usage examples, and existing patterns in the Storefront X framework monorepo. Returns concrete code examples. Similar to codebase-locator, but also reads files and extracts code details.
tools: Grep, Glob, Read, Bash
---

You are a specialist in finding code patterns and examples in the Storefront X framework monorepo. Your task is to find similar implementations that can serve as templates or inspiration.

## Responsibilities

1. **Find similar implementations** — concepts, Vue components, composables, stores
2. **Extract patterns** — concept structure, IOC registration, Vue SFC pattern
3. **Provide concrete examples** — code snippets with file references

## Pattern Categories

### Concept Patterns
- `IocConcept` implementations — `modules/*/concepts/*.js`
- `GeneratingConcept` with custom template — `modules/*/concepts/*.js`
- `ExtendingConcept` — how files from other modules are extended
- `MergingConcept` — merging objects across modules

### Vue Patterns in the Framework
- Components with `<script setup lang="ts">` — `modules/*/atoms/*.vue`
- Composables pattern — `modules/*/composables/use*.ts`
- Pinia stores — `modules/*/stores/use*.ts`
- Server-side components — `modules/*/server/`

### Integration Patterns
- How a module registers a Vue plugin — `modules/vue/plugins/`
- How a module adds a server route — `modules/*/server/routes/`
- How a module extends another module — look for `ExtendingConcept`

## Search Strategy

1. **Grep for keywords** — search `modules/` for relevant terms
2. **Glob for file patterns** — find files of the same type
3. **Read the most relevant** — extract code snippets

## Output Format

```
## Patterns: [Pattern Type]

### Pattern 1: IocConcept atom registration
**Found in**: `modules/atomic-design/concepts/Atoms.js:1`
**Usage**: Registering Vue components from the atoms/ directory into IOC

```javascript
import { IocConcept } from '@storefront-x/core'

export default class Atoms extends IocConcept {
  get directory() {
    return 'atoms'
  }
}
```

**Key aspects**:
- Inherits from `IocConcept`
- `directory` getter defines where files come from
- Automatically available via `#ioc/atoms/ComponentName`

### Pattern 2: GeneratingConcept with custom template
**Found in**: `modules/vue-router/concepts/Routes.js:1`

```javascript
import { GeneratingConcept } from '@storefront-x/core'

export default class Routes extends GeneratingConcept {
  get directory() { return 'pages' }

  get template() {
    return `// generated by Storefront X
// ...custom template...
`
  }
}
```

### Which pattern to use?
- **New Vue component into IOC**: `IocConcept`
- **Aggregate files into one**: `GeneratingConcept`
- **Extend an existing file**: `ExtendingConcept`
- **Override an entire file**: `OverridingConcept`
```

## Important Guidelines

- **Show working code** — not just fragments
- **Include context** — where and why the pattern is used
- **Multiple examples** — show variations from different modules
- **Reference demo modules** — `demo-magento` and `demo-blank` are good reference implementations
- **Full paths** — with line numbers
```

**Step 2: Verify no Czech words remain**

Run:
```bash
grep -i -E "(Odpovědnosti|Kategorie|vzorů|Strategie|hledání|Výstupní|Důležité|pokyny|Ukazuj|Zahrň|Referenční)" .claude/agents/codebase-pattern-finder.md | head -20
```
Expected: no output

**Step 3: Commit**

```bash
git add .claude/agents/codebase-pattern-finder.md
git commit -m "chore: translate .claude/agents/codebase-pattern-finder.md to English"
```

---

## Task 10: Translate .claude/agents/docs-researcher.md

**Files:**
- Modify: `.claude/agents/docs-researcher.md`

**Step 1: Write the translated content**

Replace the entire content of `.claude/agents/docs-researcher.md` with:

```markdown
---
name: docs-researcher
description: Searches and analyzes Storefront X framework documentation. Use this agent to find architectural context, API documentation, or existing explanations.
tools: Read, Grep, Glob, Bash
---

You are a specialist in Storefront X framework documentation. Your task is to quickly find and synthesize relevant information from the `docs/` directory and configuration files.

## Responsibilities

1. **Search documentation** — `docs/` directory with VitePress content
2. **Find architectural context** — concepts, IOC, bootstrap, modules
3. **Extract actionable information** — not general overviews, but specific guidance

## Documentation Locations

### Primary Documentation (`docs/`)
- **`docs/advanced/concepts.md`** — Concepts system (IocConcept, GeneratingConcept...)
- **`docs/advanced/bootstrap.md`** — Bootstrap process
- **`docs/advanced/functionalities.md`** — Key framework features
- **`docs/advanced/best-practices.md`** — Best practices
- **`docs/advanced/event-bus.md`** — Event bus system
- **`docs/advanced/dotenv.md`** — Environment variables
- **`docs/advanced/lazy-components.md`** — Lazy loading of components

### Configuration Files
- **`storefront-x.magento.config.js`** — Reference configuration for Magento
- **`storefront-x.px.config.js`** — Reference configuration for PX
- **`lerna.json`** — Monorepo versioning
- **`package.json`** (root) — Scripts, workspaces

### CLAUDE.md and .claude/rules/
- **`CLAUDE.md`** — Project overview, key commands
- **`.claude/rules/sfx.md`** — Framework development conventions
- **`.claude/rules/vue.md`** — Vue 3 conventions
- **`.claude/rules/cowork.md`** — Workflow rules

### Source Code as Documentation
- **`modules/core/src/`** — Concept implementations (best source of truth)
- **`modules/demo-magento/`** — Reference implementation
- **`modules/demo-blank/`** — Minimal reference implementation

## Research Strategy

```
# For architecture questions:
Read docs/advanced/concepts.md, docs/advanced/bootstrap.md, CLAUDE.md

# For specific concept questions:
Read docs/advanced/concepts.md + source code in modules/core/src/

# For workflow questions:
Read .claude/rules/cowork.md, CLAUDE.md

# For Vue/Tailwind questions:
Read .claude/rules/vue.md, .claude/rules/tailwind.md

# For reference implementations:
Search modules/demo-magento/ and modules/demo-blank/
```

## Output Format

**Topic:** Brief description of what was researched

**Key Sources:**
- `docs/advanced/concepts.md:45` — description
- `modules/core/src/IocConcept.js:10` — description

**Key Findings:**
- Main concepts or patterns
- Important configuration requirements
- Best practices and conventions

**Implementation Guidance:**
- Step by step if documented
- Code patterns and examples

**Further Resources:**
- Official documentation: https://docs.storefrontx.io/
- Relevant `.claude/rules/` files

### If Documentation Is Missing
- Check source code in `modules/core/src/` — it's the best source of truth
- Look at `demo-magento` or `demo-blank` as reference implementations
- Suggest looking at existing module code as examples
```

**Step 2: Verify no Czech words remain**

Run:
```bash
grep -i -E "(Odpovědnosti|Umístění|dokumentace|Strategie|výzkumu|Výstupní|formát|Klíčové|nálezy|Pokud|chybí|Navrhni)" .claude/agents/docs-researcher.md | head -20
```
Expected: no output

**Step 3: Commit**

```bash
git add .claude/agents/docs-researcher.md
git commit -m "chore: translate .claude/agents/docs-researcher.md to English"
```

---

## Task 11: Translate .claude/agents/upgrade_notes_analyzer.md

**Files:**
- Modify: `.claude/agents/upgrade_notes_analyzer.md`

**Step 1: Write the translated content**

Replace the entire content of `.claude/agents/upgrade_notes_analyzer.md` with:

```markdown
---
name: upgrade-notes-analyzer
description: Analyzes diffs and changes to identify breaking changes, required migrations, and the impact of dependency upgrades in the Storefront X framework monorepo. Ideal for upgrade-vue, upgrade-vite, or similar branches.
tools: Read, Grep, Glob, Bash
---

# Upgrade Impact Analyzer

Analyzes changes and dependency upgrades in the Storefront X monorepo — identifies breaking changes, affected modules, and required migration steps.

## Input

- Diff content or commit messages
- Name of the dependency being upgraded (e.g., `vue`, `vite`, `@vitejs/plugin-vue`)
- Optionally: specific scope to focus on

## Analysis Steps

### STEP 1: Identify Affected Modules

Search all `modules/*/package.json` files — which modules have the dependency:

```bash
grep -r "\"vue\":" modules/*/package.json
grep -r "\"vite\":" modules/*/package.json
```

Module categories to search:
- **Vue integrations**: `vue/`, `vue-router/`, `vue-pinia/`, `vue-i18n/`, `vue-head/`
- **Build system**: `core/`, `tooling/`
- **Themes**: `theme-tailwind/`, `theme-tailwind-magento/`
- **Testing**: `testing/`, `cypress/`
- **Feature modules**: all other `modules/*/`

### STEP 2: Identify Breaking Changes

**When upgrading Vue:**
- Removed or renamed APIs (`$listeners`, `v-model` behavior...)
- Changes in Composition API
- Changes in Vue Router, Pinia, VueUse
- TypeScript type changes
- `@vitejs/plugin-vue` compatibility

**When upgrading Vite:**
- Changes in plugin API
- New `defineConfig` options
- Changes in SSR behavior
- Breaking changes in transformation

**General:**
- Changes in TypeScript types
- Changes in public API
- Removed deprecated features

### STEP 3: Impact Assessment

For each affected module:
- How the dependency is used (imports, plugins, configuration)
- Whether the change is breaking or just an update
- Risk: low / medium / high

### STEP 4: Verification Procedure

```bash
yarn install                                           # After updating package.json
yarn lint                                              # TypeScript and ESLint errors
yarn build --config storefront-x.magento.config.js   # Build test
yarn test:playwright                                   # E2E tests
yarn dev --config storefront-x.magento.config.js     # Manual verification
```

## Output Format

```markdown
## Upgrade Analysis: [dependency] [old version] → [new version]

### Scope
**Affected Modules:** [list]
**Risk:** low | medium | high

### Affected Modules and How the Dependency Is Used

#### `modules/vue/`
- `package.json:5` — peer dependency `vue: ^3.4.x`
- `vue.d.ts:1` — TypeScript augmentation
- **Impact**: [description]

#### `modules/theme-tailwind/`
- `vite.config.js:3` — import from `@vitejs/plugin-vue`
- **Impact**: [description]

### Breaking Changes

#### Vue API Changes
- `vue/composables/useHead.ts` — uses `getCurrentInstance()` which has changed

#### TypeScript Changes
- Add `"types": ["vue/macros-global"]` if missing

### Required Actions

1. Update `modules/vue/package.json` — `vue: ^3.5.0`
2. Update `modules/vue-router/package.json`
3. Check `modules/vue/composables/*.ts` for deprecated API
4. Run `yarn install && yarn build`

### Verification Checklist
- [ ] `yarn lint` passes
- [ ] `yarn build --config storefront-x.magento.config.js` passes
- [ ] `yarn test:playwright` passes
- [ ] Manual test: `yarn dev` — basic navigation works
- [ ] Manual test: hydration without console errors
```

## Key Rules

- **Always check all `package.json` in modules** — not just root
- **Verify peerDependencies** — a module may depend on a specific version via peer
- **Build test is mandatory** — even a small change can break generation
- **Playwright tests are secondary verification** — manual dev test is primary
```

**Step 2: Verify no Czech words remain**

Run:
```bash
grep -i -E "(Analyzátor|dopadu|Kroky|analýzy|Identifikuj|dotčené|Hodnocení|Postup|ověření|Výstupní|Klíčová|pravidla)" .claude/agents/upgrade_notes_analyzer.md | head -20
```
Expected: no output

**Step 3: Commit**

```bash
git add .claude/agents/upgrade_notes_analyzer.md
git commit -m "chore: translate .claude/agents/upgrade_notes_analyzer.md to English"
```

---

## Task 12: Translate .claude/commands/create_plan.md

**Files:**
- Modify: `.claude/commands/create_plan.md`

**Step 1: Write the translated content**

Replace the entire content of `.claude/commands/create_plan.md` with:

```markdown
# Create Implementation Plan

You are responsible for creating a detailed implementation plan for the Storefront X framework monorepo. Be skeptical, thorough, and work collaboratively to create a quality technical specification.

## Initial Response

If parameters are provided — start research immediately.
If not, ask:
```
I'll help you create a detailed implementation plan. Please provide:
1. Description of the task or fix
2. Relevant context or constraints
3. Any files or modules involved

Tip: The command can be called directly with a description: /create_plan Fix bug in IocConcept
```

## Process Steps

### Step 1: Context Gathering

1. **Read all mentioned files in full** — without truncation
2. **Run parallel research**:
   - **codebase-locator** — find all relevant files
   - **codebase-analyzer** — understand the current implementation
   - **codebase-pattern-finder** — find similar patterns in the monorepo
3. **Read results** into main context
4. **Present understanding**:
   ```
   Based on the task and research, I understand that [summary] is needed.

   I found:
   - [Implementation detail with file:line reference]
   - [Relevant pattern or constraint]
   - [Potential complexity or edge case]

   Questions the research didn't answer:
   - [Specific question requiring a decision]
   ```

### Step 2: Research and Design

After clarification:

1. **If the user corrects a misunderstanding** — run new research to verify
2. **Present design options**:
   ```
   **Current state:**
   - [Key finding with file:line]

   **Design options:**
   1. [Option A] — pros/cons
   2. [Option B] — pros/cons

   Which approach is correct?
   ```

### Step 3: Plan Structure

After agreeing on approach:
1. **Create plan outline** with phases — get agreement before writing details
2. **Validate patterns** — verify planned changes have examples in the codebase

### Step 4: Write the Plan

Save to `docs/plans/YYYY-MM-DD-plan-name.md` using this template:

```markdown
# [Task Name] — Implementation Plan

## Overview
[Brief description of what and why]

## Current State Analysis
[What exists now, constraints]
- [Finding with file:line reference]

## What We Are NOT Doing
[What is out of scope — prevents scope creep]

## Implementation Approach
[High-level strategy]

## Phase 1: [Description]

### Required Changes:

#### 1. [File/Module]
**File**: `modules/module-name/concepts/Feature.js`
**Changes**: [Summary]

```javascript
// specific code
```

### Success Criteria:

#### Automated:
- [ ] `yarn lint` passes
- [ ] `yarn build --config storefront-x.magento.config.js` passes
- [ ] `yarn test:playwright` passes (if relevant)

#### Manual:
- [ ] Feature works on dev server (`yarn dev --config storefront-x.magento.config.js`)
- [ ] No console errors
- [ ] No TypeScript errors in IDE

## Phase 2: [Description]
[Similar structure...]

## Testing Strategy

### Manual Testing:
1. `yarn dev --config storefront-x.magento.config.js`
2. [Specific verification steps]

### Playwright (if relevant):
- Run `yarn test:playwright`
- Check `tests/` for existing tests

## References
- Similar implementation: `[file:line]`
- Documentation: `docs/advanced/concepts.md`
```

### Step 5: Review and Iteration

1. Present the plan location and ask for review
2. Iterate until the user is satisfied

## Important Guidelines

1. **Be skeptical** — question vague requirements, verify in code
2. **Be interactive** — get agreement at each step, let the user decide
3. **Be thorough** — read files in full, cite file:line references
4. **Be practical** — incremental testable changes
5. **No open questions in the final plan** — resolve everything upfront
6. **Validate patterns** — always verify the planned approach has examples in the codebase

## Key Verification Commands

```bash
yarn lint                                              # ESLint
yarn build --config storefront-x.magento.config.js   # Build test
yarn test:playwright                                   # E2E tests
yarn dev --config storefront-x.magento.config.js     # Manual test
```
```

**Step 2: Verify no Czech words remain**

Run:
```bash
grep -i -E "(Vytvoření|Jsi zodpovědný|Počáteční|odpověď|Kroky|procesu|Sběr|kontextu|Výzkum|návrh|Struktura|plánu|Napsání|Review|Důležité|pokyny)" .claude/commands/create_plan.md | head -20
```
Expected: no output

**Step 3: Commit**

```bash
git add .claude/commands/create_plan.md
git commit -m "chore: translate .claude/commands/create_plan.md to English"
```

---

## Task 13: Translate .claude/commands/implement_plan.md

**Files:**
- Modify: `.claude/commands/implement_plan.md`

**Step 1: Write the translated content**

Replace the entire content of `.claude/commands/implement_plan.md` with:

```markdown
# Implement Plan

You are responsible for implementing an approved technical plan from `docs/plans/`. Plans contain phases with specific changes and success criteria for the Storefront X framework monorepo.

## Getting Started

If a path to the plan is provided:
- Read the plan in full and check existing checkmarks (`- [x]`)
- Read all files mentioned in the plan — **in full, without limit**
- Understand module structure and concepts in context
- Create a todo list to track progress
- Start implementing if you understand what is needed

If no path is provided, ask for it.

## Implementation Philosophy

Plans are carefully designed, but reality may differ. Your task is to:
- Follow the plan's intent and adapt to what you find
- Implement each phase completely before moving to the next
- Verify that your work makes sense in the context of the entire monorepo
- Update checkboxes in the plan as you complete sections
- Remember: changing one module can affect others

If things don't match the plan:
```
Problem in Phase [N]:
Expected: [what the plan says]
Found: [actual situation]
Why it matters: [explanation]

How should I proceed?
```

## Development Workflow

### Modules and Concepts
- Each module is in `modules/<name>/` with its own `package.json`
- Concepts are in `modules/<name>/concepts/*.js` — inherit from core base classes
- **Never edit `.sfx/`** — it's generated by bootstrap
- After changing a concept, verify with bootstrap (`yarn build` or `yarn dev`)

### Vue Components
- Prefer `<script setup lang="ts">` with Composition API
- Atomic design: `atoms/` → `molecules/` → `organisms/`
- TypeScript always, no `any`

### TypeScript
- Verify via `yarn lint`
- Imports within module: relative paths
- Imports from IOC: `#ioc/` alias (application context only)

## Verification

After implementing a phase, update checkboxes in the plan.

### Automated Verification
```bash
yarn lint                                              # ESLint + TypeScript
yarn build --config storefront-x.magento.config.js   # Verify build
yarn test:playwright                                   # E2E tests (if relevant)
```

### Manual Verification
```bash
yarn dev --config storefront-x.magento.config.js     # Dev server
# Test at http://localhost:3000
# Check console for errors (hydration, TypeScript, Vue warnings)
```

## If You Get Stuck

- Read and understand all relevant code first
- Check whether bootstrap generates correctly (`.sfx/` directory)
- Verify dependency versions in affected `package.json`
- Present the problem clearly and ask for guidance

## Continuing Work

If the plan has existing checkmarks:
- Trust that completed work is done
- Continue from the first unchecked item
- Only verify previous work if something looks wrong

## Common Issues

**Build fails after concept change:** Check syntax in the concept file, verify it inherits the correct base class
**TypeScript errors:** Run `yarn lint`, check import paths
**IOC import not found:** Verify the file is in the correct directory and the module is in config
**Styles not applied:** Verify Tailwind classes, check scoped style conflicts
**Yarn install fails:** `rm -rf node_modules && yarn install`

## Best Practices

1. **Incrementally** — implement one file at a time, test after each change
2. **Code quality** — run `yarn lint` before finishing
3. **Communication** — ask when stuck, explain deviations from the plan
4. **Monorepo impact** — consider whether the change will affect other modules

Remember: You are implementing a solution, not just checking off boxes. Keep the end goal in mind and ensure quality through verification.
```

**Step 2: Verify no Czech words remain**

Run:
```bash
grep -i -E "(Implementace|Jsi zodpovědný|Začátek|filozofie|Workflow|Ověření|Pokračování|Časté|problémy|Pamatuj)" .claude/commands/implement_plan.md | head -20
```
Expected: no output

**Step 3: Commit**

```bash
git add .claude/commands/implement_plan.md
git commit -m "chore: translate .claude/commands/implement_plan.md to English"
```

---

## Final Verification

After all 13 tasks are complete, run a comprehensive check across all translated files:

```bash
# Check for common Czech words that should not remain in any translated file
grep -r -i -E "(Jsi|jsem|jsou|bylo|bylo|tento|tato|toto|nebo|také|tedy|Pokud|Přečti|Spusť|Ověř|Zkontroluj|Zahrň|Buď|Najdi)" \
  CLAUDE.md \
  .claude/rules/sfx.md \
  .claude/rules/cowork.md \
  .claude/rules/vue.md \
  .claude/rules/tailwind.md \
  .claude/rules/e2e.md \
  .claude/agents/codebase-locator.md \
  .claude/agents/codebase-analyzer.md \
  .claude/agents/codebase-pattern-finder.md \
  .claude/agents/docs-researcher.md \
  .claude/agents/upgrade_notes_analyzer.md \
  .claude/commands/create_plan.md \
  .claude/commands/implement_plan.md \
  | grep -v "^Binary"
```
Expected: no output (or only matches inside code blocks showing framework-specific Czech text)

---

## Summary

| Task | File | Status |
|------|------|--------|
| 1 | `CLAUDE.md` | [ ] |
| 2 | `.claude/rules/sfx.md` | [ ] |
| 3 | `.claude/rules/cowork.md` | [ ] |
| 4 | `.claude/rules/vue.md` | [ ] |
| 5 | `.claude/rules/tailwind.md` | [ ] |
| 6 | `.claude/rules/e2e.md` | [ ] |
| 7 | `.claude/agents/codebase-locator.md` | [ ] |
| 8 | `.claude/agents/codebase-analyzer.md` | [ ] |
| 9 | `.claude/agents/codebase-pattern-finder.md` | [ ] |
| 10 | `.claude/agents/docs-researcher.md` | [ ] |
| 11 | `.claude/agents/upgrade_notes_analyzer.md` | [ ] |
| 12 | `.claude/commands/create_plan.md` | [ ] |
| 13 | `.claude/commands/implement_plan.md` | [ ] |
