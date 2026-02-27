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
