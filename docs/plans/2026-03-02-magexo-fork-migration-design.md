# Storefront X → Magexo Fork Migration Design

**Date**: 2026-03-02
**Status**: Approved

## Overview

Migration of the Storefront X monorepo to an independent repository under the `magexo` GitHub organization, with npm scope rename from `@storefront-x/*` to `@magexo/*` and publishing via GitHub Packages.

## Decisions

| Aspect | Decision |
|---|---|
| **New remote** | `git@github.com:magexo/storefront-x.git` |
| **NPM scope** | `@storefront-x/*` → `@magexo/*` |
| **Registry** | GitHub Packages (`npm.pkg.github.com`) |
| **Git history** | Preserve full history (fork) |
| **Versioning** | Continue from 1.33.1 (first release: 1.34.0) |
| **Upstream sync** | No — clean departure from storefront-x/storefront-x |
| **Config file** | Keep `storefront-x.config.js` (no rename) |
| **Scaffolding CLI** | `create-magexo-storefront` |
| **Package count** | All 80 publishable packages |
| **Migration approach** | Big Bang rename + migration script for downstream |
| **CI/CD** | Deferred to a later phase |

## Context

### Why GitHub Packages (not npmjs.com)

- The npm organization `magexo` on npmjs.com is owned by another entity — no access available
- GitHub organization `magexo` is owned and controlled by the team
- GitHub Packages binds npm scope to the GitHub org name → `@magexo/*` works
- Private packages are free under the GitHub plan
- GitHub Actions have native access without extra configuration

### Downstream project requirements

Every downstream project consuming `@magexo/*` packages will need:

1. **`.npmrc` file** in project root:
   ```
   @magexo:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```

2. **`GITHUB_TOKEN`** environment variable — a GitHub Personal Access Token with `read:packages` scope

## Phase 1: Git Setup

1. Add new remote: `git remote add magexo git@github.com:magexo/storefront-x.git`
2. Push full history: `git push magexo main --tags`
3. Create feature branch: `git checkout -b feat/scope-rename`
4. All rename work happens on this branch, merged to `main` after validation

## Phase 2: Scope Rename (~250-300 files)

An automated rename script will perform all changes. No manual file editing.

### 2.1 package.json changes (80 modules)

For each `modules/*/package.json`:
- Rename `name`: `@storefront-x/xyz` → `@magexo/xyz`
- Update `publishConfig`:
  ```json
  "publishConfig": {
    "access": "public",
    "registry": "https://npm.pkg.github.com"
  }
  ```
- Add `repository` field (required by GitHub Packages):
  ```json
  "repository": {
    "type": "git",
    "url": "https://github.com/magexo/storefront-x.git",
    "directory": "modules/<module-name>"
  }
  ```
- Update any `dependencies` / `devDependencies` referencing `@storefront-x/*`

### 2.2 Source file changes

Global find-replace `@storefront-x/` → `@magexo/` in:

| File type | Location | Estimated count |
|---|---|---|
| Concept files (`.js`) | `modules/*/concepts/*.js` | 65+ |
| Test files (`.js`, `.ts`) | `modules/*/tests/**` | 40+ |
| Core source files | `modules/core/src/**` | ~10 |
| Testing module | `modules/testing/index.js` | 1 |
| Config files | `storefront-x.*.config.js` | 2 |
| Documentation | `docs/**/*.md` | 20+ |

### 2.3 Module rename: create-storefront-x → create-magexo-storefront

- Rename directory: `modules/create-storefront-x/` → `modules/create-magexo-storefront/`
- Update `package.json` name and bin
- Update all 3 templates inside (`blank`, `magento`, `px`):
  - Template `package.json` — all `@storefront-x/*` → `@magexo/*`
  - Template `storefront-x.config.js` — module names

### 2.4 Root changes

- `package.json` — update dependency references
- `lerna.json` — no changes needed (version stays, workspace glob stays)
- Run `yarn install` to regenerate lockfile

## Phase 3: Validation

Sequential execution:

1. `yarn lint` — verify no broken imports
2. `yarn build --config storefront-x.magento.config.js` — verify production build
3. `yarn test:unit` — unit tests
4. `yarn test:playwright` — integration tests
5. Manual smoke test: `yarn dev --config storefront-x.magento.config.js`

## Phase 4: Migration Script for Downstream Projects

A Node.js CLI script (`migrate-to-magexo`) that automates downstream project migration.

### What it does

1. **package.json** — rewrites all `@storefront-x/*` dependencies to `@magexo/*`
2. **storefront-x.config.js** — rewrites module names
3. **Source files** (`.js`, `.ts`, `.vue`) — replaces imports referencing `@storefront-x/*`
4. **Creates `.npmrc`** — with GitHub Packages registry configuration for `@magexo` scope
5. **Prints summary** of all changes made

### Features

- `--dry-run` mode — shows what would change without modifying files
- Idempotent — safe to run multiple times
- Outputs a migration report

### Downstream migration checklist

After running the script, downstream developers need to:
1. Set up `GITHUB_TOKEN` environment variable (GitHub PAT with `read:packages`)
2. Run `yarn install` to fetch packages from GitHub Packages
3. Verify build: `yarn build` / `yarn dev`

## Phase 5: First Publish

### Prerequisites

1. Verify GitHub org `magexo` has Packages enabled (org settings → Packages)
2. Create a GitHub PAT with `write:packages` scope for publishing
3. Authenticate npm CLI: `npm login --scope=@magexo --registry=https://npm.pkg.github.com`

### Publish steps

1. Merge `feat/scope-rename` into `main`
2. `lerna version 1.34.0` — bumps all 80 packages
3. `lerna publish from-git --registry https://npm.pkg.github.com` — publishes to GitHub Packages
4. Verify at `https://github.com/orgs/magexo/packages`

## Scope Rename — Complete File Impact Analysis

### Direct `@storefront-x/` references

| Category | File pattern | Count | Change type |
|---|---|---|---|
| Module package.json `name` | `modules/*/package.json` | 80 | Scope rename |
| Module package.json deps | `modules/*/package.json` | ~5 | Dependency rename |
| Root package.json | `package.json` | 1 | Dependency rename |
| Concept imports | `modules/*/concepts/*.js` | 65+ | Import path |
| Test imports | `modules/*/tests/**` | 40+ | Import path |
| Core source | `modules/core/src/**` | ~10 | Various references |
| Testing module | `modules/testing/index.js` | 1 | Import path |
| Demo configs | `storefront-x.*.config.js` | 2 | Module names |
| Create templates | `modules/create-storefront-x/template/**` | 3×(pkg+config) | Full rewrite |
| Documentation | `docs/**/*.md` | 20+ | References |
| **Total** | | **~250-300** | |

### Files NOT changed

- `storefront-x.config.js` filename (kept as-is)
- `lerna.json` (version and config unchanged)
- `.yarnrc.yml` (no registry override needed for monorepo development)
- `.sfx/` directory (generated, not in git)
- `#ioc/` import aliases in consumer code (these resolve at build time, no scope in path)

## Risk Assessment

| Risk | Mitigation |
|---|---|
| Missed `@storefront-x` reference | Automated rename script + grep validation after rename |
| GitHub Packages auth issues for downstream | Clear docs + `.npmrc` created by migration script |
| Lerna publish to GitHub Packages incompatibility | Test publish with a single package first |
| Breaking downstream projects | Migration script + `--dry-run` + migration guide |
| `create-magexo-storefront` directory rename breaks workspaces | Update workspace glob if needed, verify `yarn install` |
