# Magexo Fork Migration — Design

**Date**: 2026-03-04
**Status**: Approved

## Overview

Migration of the Storefront X monorepo to `git@github.com:magexo/storefront-x.git` with npm scope rename `@storefront-x/*` → `@magexo/*` and publishing via GitHub Packages.

## Decisions

| Aspect | Decision |
|---|---|
| **Target repo** | `git@github.com:magexo/storefront-x.git` |
| **NPM scope** | `@storefront-x/*` → `@magexo/*` |
| **Registry** | GitHub Packages (`npm.pkg.github.com`) |
| **Git history** | Preserve full history + tags |
| **First version** | 1.34.0 (continues from 1.33.2) |
| **CI/CD** | Manual first publish, CI/CD deferred |
| **Upstream sync** | None — clean departure |
| **Config filename** | `storefront-x.config.js` (unchanged) |
| **Scaffolding CLI** | `create-magexo-storefront` |
| **Package count** | 80 publishable (79× `@magexo/*` + `create-magexo-storefront`) |
| **Migration approach** | Big Bang rename script + downstream migration script |

## Phase 1: Git Setup

1. Add remote: `git remote add magexo git@github.com:magexo/storefront-x.git`
2. Push full history: `git push magexo main --tags`
3. Create feature branch: `git checkout -b feat/scope-rename`

## Phase 2: Scope Rename (~294 files)

Automated Node.js script `scripts/rename-scope.mjs` with `--dry-run` support.

### 2.1 package.json changes (80 modules)

For each `modules/*/package.json`:
- `name`: `@storefront-x/xyz` → `@magexo/xyz`
- `publishConfig`: add `registry: "https://npm.pkg.github.com"`
- `repository`: add required field for GitHub Packages:
  ```json
  {
    "type": "git",
    "url": "https://github.com/magexo/storefront-x.git",
    "directory": "modules/<module-name>"
  }
  ```
- Dependencies: rename all `@storefront-x/*` references

### 2.2 Source file replace

Global `replaceAll('@storefront-x/', '@magexo/')` in:

| File type | Count |
|---|---|
| Concept files (.js) | ~65 |
| Test files (.js, .ts) | ~76 |
| Core source | ~10 |
| Documentation (.md) | ~50 |
| GitHub Actions (.yml) | ~7 |
| CLAUDE.md + .claude/ rules | ~10 |
| Create templates | ~11 |
| Config files | 2 |

### 2.3 Directory rename

`modules/create-storefront-x/` → `modules/create-magexo-storefront/`

### 2.4 Manual fixes (after script)

Bare `storefront-x` references not handled by the script:
- `create-magexo-storefront/index.js` — default directory name → `magexo-storefront-app`
- `.github/workflows/release.yml` — `create storefront-x` commands
- Root `package.json` — name (`magexo-storefront`), author (`Magexo`), repository URL

### 2.5 Lockfile regeneration

`yarn install` after all changes to regenerate `yarn.lock`.

## Phase 3: Validation

Sequential:
1. `yarn lint`
2. `yarn build --config storefront-x.magento.config.js`
3. `yarn test:unit`
4. `yarn test:playwright`
5. Final grep: verify no `@storefront-x/` references remain in source

## Phase 4: Publish

### Prerequisites
- GitHub org `magexo` has Packages enabled
- GitHub PAT with `write:packages` scope
- npm authenticated: `npm login --scope=@magexo --registry=https://npm.pkg.github.com`

### Steps
1. Push `feat/scope-rename` to magexo remote
2. Create PR → review → merge to `main`
3. `lerna version 1.34.0 --yes` (bumps all 80 packages, creates tag)
4. `lerna publish from-git --registry https://npm.pkg.github.com --yes`
5. Verify at `https://github.com/orgs/magexo/packages`

## Downstream Migration

Standalone script `scripts/migrate-downstream.mjs` for consumer projects:
1. Rewrites `@storefront-x/*` → `@magexo/*` in package.json, config, source files
2. Creates `.npmrc` with GitHub Packages registry config
3. Supports `--dry-run`

### Downstream requirements
1. `.npmrc` in project root:
   ```
   @magexo:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```
2. `GITHUB_TOKEN` environment variable (PAT with `read:packages`)
3. `yarn install` to fetch from GitHub Packages

## What stays unchanged

- `storefront-x.config.js` filename (CLI default, templates)
- `#ioc/` import aliases (no scope in path)
- `lerna.json` structure
- `.yarnrc.yml` (no registry override for monorepo dev)
- `.sfx/` directory (generated, not in git)

## Risks

| Risk | Mitigation |
|---|---|
| Missed `@storefront-x` reference | Automated script + grep validation post-rename |
| Lerna + GitHub Packages incompatibility | Test publish single package before bulk |
| Downstream auth issues | Clear docs + migration script creates `.npmrc` |
| `create-magexo-storefront` dir rename breaks workspaces | Verify `yarn install` after rename |

## File Impact Summary

| Category | Count |
|---|---|
| Module package.json (name rename) | 80 |
| Concept files (import replace) | ~65 |
| Test files (import replace) | ~76 |
| Core source files | ~10 |
| Documentation | ~50 |
| Create templates | ~11 |
| GitHub Actions | ~7 |
| CLAUDE/AI instruction files | ~10 |
| Other source + config | ~14 |
| **Total files modified** | **~294** |
| + yarn.lock (auto-regenerated) | 1 |
