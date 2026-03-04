# Magexo Fork Migration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the Storefront X monorepo to `github.com/magexo/storefront-x` with npm scope rename `@storefront-x/*` → `@magexo/*` and GitHub Packages publishing.

**Architecture:** Fork with full git history preserved. A single Node.js rename script handles the bulk (~294 files) in one atomic run. Validation via lint, build, and test suites. First publish via Lerna CLI to GitHub Packages at version 1.34.0. A separate downstream migration script automates consumer project updates.

**Tech Stack:** Node.js (rename scripts), Lerna 6 (versioning/publishing), Yarn 3 workspaces, GitHub Packages npm registry

**Design doc:** `docs/plans/2026-03-04-magexo-migration-design.md`

---

## Task 1: Git Remote Setup and Feature Branch

**Files:**
- None (git operations only)

**Step 1: Add the magexo remote**

```bash
git remote add magexo git@github.com:magexo/storefront-x.git
```

**Step 2: Verify the remote**

Run: `git remote -v`
Expected: Both `origin` (storefront-x/storefront-x) and `magexo` (magexo/storefront-x) listed.

**Step 3: Push full history with tags**

```bash
git push magexo main --tags
```

Expected: All commits and tags pushed. Output shows `main → main` and tag list.

**Step 4: Create the feature branch**

```bash
git checkout -b feat/scope-rename
```

**Step 5: No commit needed** — branch created from main.

---

## Task 2: Write the Rename Script

**Files:**
- Create: `scripts/rename-scope.mjs`

The `scripts/` directory does not exist yet — create it first.

**Step 1: Create the rename script**

Write `scripts/rename-scope.mjs` with this exact content:

```javascript
#!/usr/bin/env node

/**
 * Automated scope rename: @storefront-x/* → @magexo/*
 *
 * What it does:
 * - Renames package.json name, dependencies, publishConfig, repository
 * - Replaces @storefront-x/ → @magexo/ in all source files
 * - Renames create-storefront-x directory → create-magexo-storefront
 *
 * Usage: node scripts/rename-scope.mjs [--dry-run]
 */

import fs from 'node:fs'
import path from 'node:path'

const DRY_RUN = process.argv.includes('--dry-run')
const ROOT = path.resolve(import.meta.dirname, '..')

const OLD_SCOPE = '@storefront-x/'
const NEW_SCOPE = '@magexo/'
const GITHUB_REPO = 'https://github.com/magexo/storefront-x.git'
const GITHUB_PACKAGES_REGISTRY = 'https://npm.pkg.github.com'

const stats = { filesModified: 0, packageJsonUpdated: 0, directoriesRenamed: 0 }

// --- Utilities ---

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
}

function writeFile(filePath, content) {
  if (DRY_RUN) {
    console.log(`  [dry-run] Would write: ${path.relative(ROOT, filePath)}`)
    return
  }
  fs.writeFileSync(filePath, content, 'utf-8')
}

function getAllFiles(dir, extensions, ignore = []) {
  const results = []
  if (!fs.existsSync(dir)) return results

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (ignore.some((i) => fullPath.includes(i))) continue

    if (entry.isDirectory()) {
      results.push(...getAllFiles(fullPath, extensions, ignore))
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath)
    }
  }
  return results
}

// --- Phase 1: Update all package.json files ---

function updatePackageJson(filePath) {
  const raw = readFile(filePath)
  const pkg = JSON.parse(raw)
  let changed = false

  // Rename package name
  if (pkg.name && pkg.name.startsWith(OLD_SCOPE)) {
    pkg.name = pkg.name.replace(OLD_SCOPE, NEW_SCOPE)
    changed = true
  }

  // Special: create-storefront-x → create-magexo-storefront
  if (pkg.name === 'create-storefront-x') {
    pkg.name = 'create-magexo-storefront'
    changed = true
  }

  // Update publishConfig for GitHub Packages
  if (pkg.publishConfig) {
    pkg.publishConfig = {
      access: 'public',
      registry: GITHUB_PACKAGES_REGISTRY,
    }
    changed = true
  }

  // Add repository field (required by GitHub Packages)
  if (!pkg.private && pkg.name) {
    const moduleDirName = path.basename(path.dirname(filePath))
    pkg.repository = {
      type: 'git',
      url: GITHUB_REPO,
      directory: `modules/${moduleDirName}`,
    }
    changed = true
  }

  // Rename dependencies
  for (const depType of ['dependencies', 'devDependencies', 'peerDependencies']) {
    if (pkg[depType]) {
      const newDeps = {}
      for (const [key, value] of Object.entries(pkg[depType])) {
        if (key.startsWith(OLD_SCOPE)) {
          newDeps[key.replace(OLD_SCOPE, NEW_SCOPE)] = value
          changed = true
        } else {
          newDeps[key] = value
        }
      }
      pkg[depType] = newDeps
    }
  }

  if (changed) {
    writeFile(filePath, JSON.stringify(pkg, null, 2) + '\n')
    stats.packageJsonUpdated++
    console.log(`  Updated: ${path.relative(ROOT, filePath)}`)
  }
}

// --- Phase 2: Find-replace in source files ---

function replaceInFile(filePath) {
  const content = readFile(filePath)
  if (!content.includes(OLD_SCOPE)) return

  const newContent = content.replaceAll(OLD_SCOPE, NEW_SCOPE)
  writeFile(filePath, newContent)
  stats.filesModified++
  console.log(`  Replaced: ${path.relative(ROOT, filePath)}`)
}

// --- Phase 3: Directory rename ---

function renameDirectory(oldPath, newPath) {
  if (!fs.existsSync(oldPath)) {
    console.log(`  [skip] Directory not found: ${path.relative(ROOT, oldPath)}`)
    return
  }
  if (DRY_RUN) {
    console.log(`  [dry-run] Would rename: ${path.relative(ROOT, oldPath)} → ${path.relative(ROOT, newPath)}`)
    return
  }
  fs.renameSync(oldPath, newPath)
  stats.directoriesRenamed++
  console.log(`  Renamed: ${path.relative(ROOT, oldPath)} → ${path.relative(ROOT, newPath)}`)
}

// --- Phase 4: Update root package.json ---

function updateRootPackageJson() {
  const filePath = path.join(ROOT, 'package.json')
  const raw = readFile(filePath)
  const pkg = JSON.parse(raw)

  pkg.repository = GITHUB_REPO

  for (const depType of ['dependencies', 'devDependencies']) {
    if (pkg[depType]) {
      const newDeps = {}
      for (const [key, value] of Object.entries(pkg[depType])) {
        if (key.startsWith(OLD_SCOPE)) {
          newDeps[key.replace(OLD_SCOPE, NEW_SCOPE)] = value
        } else {
          newDeps[key] = value
        }
      }
      pkg[depType] = newDeps
    }
  }

  writeFile(filePath, JSON.stringify(pkg, null, 2) + '\n')
  console.log(`  Updated: package.json (root)`)
}

// --- Main ---

function main() {
  console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Storefront X → Magexo scope rename\n`)

  const IGNORE = ['node_modules', '.sfx', '.git', '.yarn', 'yarn.lock']

  // Phase 1: Module package.json files
  console.log('Phase 1: Updating module package.json files...')
  const moduleDirs = fs.readdirSync(path.join(ROOT, 'modules'), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(ROOT, 'modules', d.name))

  for (const moduleDir of moduleDirs) {
    const pkgPath = path.join(moduleDir, 'package.json')
    if (fs.existsSync(pkgPath)) {
      updatePackageJson(pkgPath)
    }
  }

  // Phase 1b: Template package.json files (inside create-storefront-x or create-magexo-storefront)
  const createModuleDir = fs.existsSync(path.join(ROOT, 'modules', 'create-magexo-storefront'))
    ? path.join(ROOT, 'modules', 'create-magexo-storefront')
    : path.join(ROOT, 'modules', 'create-storefront-x')

  const templatePkgs = getAllFiles(path.join(createModuleDir, 'template'), ['package.json'], IGNORE)
  for (const pkgPath of templatePkgs) {
    const raw = readFile(pkgPath)
    if (raw.includes(OLD_SCOPE)) {
      const newContent = raw.replaceAll(OLD_SCOPE, NEW_SCOPE)
      writeFile(pkgPath, newContent)
      stats.filesModified++
      console.log(`  Replaced: ${path.relative(ROOT, pkgPath)}`)
    }
  }

  // Phase 2: Source file find-replace
  console.log('\nPhase 2: Replacing @storefront-x/ in source files...')

  // All source files in modules/ (concepts, tests, src, etc.)
  const moduleSourceFiles = getAllFiles(path.join(ROOT, 'modules'), ['.js', '.ts', '.vue', '.md'], IGNORE)
  for (const f of moduleSourceFiles) {
    // Skip package.json — already handled in Phase 1
    if (f.endsWith('package.json')) continue
    replaceInFile(f)
  }

  // Demo config files
  const demoConfigs = ['storefront-x.magento.config.js', 'storefront-x.px.config.js']
  for (const cfg of demoConfigs) {
    const cfgPath = path.join(ROOT, cfg)
    if (fs.existsSync(cfgPath)) replaceInFile(cfgPath)
  }

  // Documentation
  const docFiles = getAllFiles(path.join(ROOT, 'docs'), ['.md', '.js'], [...IGNORE, 'dist', '.vitepress/cache'])
  for (const f of docFiles) replaceInFile(f)

  // GitHub Actions
  const ghFiles = getAllFiles(path.join(ROOT, '.github'), ['.yml', '.yaml'], IGNORE)
  for (const f of ghFiles) replaceInFile(f)

  // CLAUDE.md and .claude/ rules
  const claudeMd = path.join(ROOT, 'CLAUDE.md')
  if (fs.existsSync(claudeMd)) replaceInFile(claudeMd)
  const claudeFiles = getAllFiles(path.join(ROOT, '.claude'), ['.md'], IGNORE)
  for (const f of claudeFiles) replaceInFile(f)

  // CHANGELOG.md
  const changelog = path.join(ROOT, 'CHANGELOG.md')
  if (fs.existsSync(changelog)) replaceInFile(changelog)

  // Phase 3: Directory rename
  console.log('\nPhase 3: Renaming create-storefront-x directory...')
  renameDirectory(
    path.join(ROOT, 'modules', 'create-storefront-x'),
    path.join(ROOT, 'modules', 'create-magexo-storefront'),
  )

  // Phase 4: Root package.json
  console.log('\nPhase 4: Updating root package.json...')
  updateRootPackageJson()

  // Summary
  console.log(`\n--- Summary ---`)
  console.log(`  Package.json files updated: ${stats.packageJsonUpdated}`)
  console.log(`  Source files modified: ${stats.filesModified}`)
  console.log(`  Directories renamed: ${stats.directoriesRenamed}`)
  if (DRY_RUN) console.log(`\n  This was a dry run. No files were changed.`)
  else console.log(`\n  Done! Run 'yarn install' to regenerate the lockfile.`)
}

main()
```

**Step 2: Verify script syntax**

Run: `node --check scripts/rename-scope.mjs`
Expected: No output (syntax valid).

**Step 3: Commit**

```bash
git add scripts/rename-scope.mjs
git commit -m "chore: add automated scope rename script @storefront-x → @magexo"
```

---

## Task 3: Dry Run the Rename Script

**Files:**
- None modified (dry run only)

**Step 1: Execute dry run**

Run: `node scripts/rename-scope.mjs --dry-run`
Expected: Output listing all files that would be modified. Approximately:
- ~80 package.json updates
- ~200 source file replacements
- 1 directory rename

**Step 2: Review the output**

Verify:
- All 79 `@storefront-x/*` package names listed for rename
- `create-storefront-x` package listed for name change to `create-magexo-storefront`
- Directory rename `create-storefront-x → create-magexo-storefront` listed
- Config files `storefront-x.magento.config.js` and `storefront-x.px.config.js` listed
- No files from `node_modules/`, `.sfx/`, `.git/`, `.yarn/` listed

**Step 3: No commit** — dry run only.

---

## Task 4: Execute the Rename Script

**Files:**
- Modify: ~294 files across the entire monorepo (automated)

**Step 1: Run the script**

Run: `node scripts/rename-scope.mjs`
Expected: All files modified, directory renamed, summary printed.

**Step 2: Verify no `@storefront-x/` references remain in source**

Run: `grep -r "@storefront-x/" --include="*.js" --include="*.ts" --include="*.vue" --include="*.json" --exclude-dir=node_modules --exclude-dir=.sfx --exclude-dir=.git --exclude-dir=.yarn --exclude=yarn.lock . | head -20`

Expected: Zero matches, OR only matches in:
- `CHANGELOG.md` (historical GitHub URLs — OK to keep)
- `docs/plans/` (design docs referencing the migration — OK)

**Step 3: Verify directory renamed**

Run: `ls modules/ | grep -E "create-(storefront-x|magexo)"`
Expected: Only `create-magexo-storefront`

**Step 4: Spot-check a renamed package.json**

Run: `node -e "const p=JSON.parse(require('fs').readFileSync('modules/core/package.json','utf-8')); console.log(JSON.stringify({name:p.name,publishConfig:p.publishConfig,repo:p.repository},null,2))"`

Expected:
```json
{
  "name": "@magexo/core",
  "publishConfig": {
    "access": "public",
    "registry": "https://npm.pkg.github.com"
  },
  "repo": {
    "type": "git",
    "url": "https://github.com/magexo/storefront-x.git",
    "directory": "modules/core"
  }
}
```

**Step 5: Spot-check a renamed config file**

Run: `head -5 storefront-x.magento.config.js`

Expected:
```javascript
export default {
  modules: [
    '@magexo/base',

    '@magexo/vue',
```

**Step 6: Regenerate lockfile**

Run: `yarn install`
Expected: Lockfile regenerated with new package names. No resolution errors.

**Step 7: Commit**

```bash
git add -A
git commit -m "chore: rename npm scope @storefront-x/* → @magexo/*

- Renamed all 80 publishable packages from @storefront-x/* to @magexo/*
- Renamed create-storefront-x to create-magexo-storefront
- Updated publishConfig to target npm.pkg.github.com
- Added repository field to all package.json (required by GitHub Packages)
- Updated all concept imports, test imports, docs, config references
- Regenerated yarn.lock"
```

---

## Task 5: Manual Fixes for Bare `storefront-x` References

The rename script only handles `@storefront-x/` → `@magexo/`. Some files have bare `storefront-x` that need manual attention.

**Files:**
- Modify: `modules/create-magexo-storefront/index.js:83`
- Modify: `.github/workflows/release.yml:26,39`
- Modify: `package.json` (root — lines 2, 6, 7)

**Step 1: Update create-magexo-storefront default directory name**

In `modules/create-magexo-storefront/index.js`, line 83, change:
```javascript
// Before:
initial: 'storefront-x-app',
// After:
initial: 'magexo-storefront-app',
```

**Step 2: Update release.yml workflow**

In `.github/workflows/release.yml`:

Line 26 — change:
```yaml
# Before:
yarn create storefront-x --directory=app --integration=magento
# After:
yarn create magexo-storefront --directory=app --integration=magento
```

Line 39 — change:
```yaml
# Before:
npm create storefront-x@latest -y -- --directory=app --integration=magento
# After:
npm create magexo-storefront@latest -y -- --directory=app --integration=magento
```

**Step 3: Update root package.json metadata**

In root `package.json`:
```json
// Before:
"name": "storefront-x",
"author": "Storefront-x",

// After:
"name": "magexo-storefront",
"author": "Magexo",
```

Note: `"repository"` was already updated by the rename script to `"https://github.com/magexo/storefront-x.git"`.

**Step 4: Verify what stays unchanged (by design)**

These intentionally keep `storefront-x`:
- `storefront-x.config.js` filename in `modules/core/sfx.js` — CLI default config name
- `storefront-x.local.config.js` in `.gitignore`
- `Dockerfile` ARG for config filename
- Config filenames in templates (`storefront-x.config.js`)
- Demo config filenames (`storefront-x.magento.config.js`, `storefront-x.px.config.js`)

**Step 5: Commit**

```bash
git add modules/create-magexo-storefront/index.js .github/workflows/release.yml package.json
git commit -m "chore: update bare storefront-x references for magexo branding"
```

---

## Task 6: Validation — Lint

**Files:**
- None (verification only)

**Step 1: Run ESLint**

Run: `yarn lint`
Expected: Pass with zero errors.

**Step 2: If lint fails — fix broken imports**

Typical issues:
- Missed `@storefront-x/` reference → replace with `@magexo/`
- Unresolved module → rerun `yarn install`

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve lint errors after scope rename"
```

---

## Task 7: Validation — Build

**Files:**
- None (verification only)

**Step 1: Run production build**

Run: `yarn build --config storefront-x.magento.config.js`
Expected: Build completes successfully. Config file references `@magexo/*` module names (updated in Task 4).

**Step 2: If build fails — debug**

Common issues:
- Config still has `@storefront-x/*` names → update config
- Vite can't resolve a module → check `yarn install` was run, check module name in package.json

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build errors after scope rename"
```

---

## Task 8: Validation — Unit Tests

**Files:**
- None (verification only)

**Step 1: Run unit tests**

Run: `yarn test:unit`
Expected: All tests pass.

**Step 2: If tests fail — fix**

Most likely cause: a test file still imports from `@storefront-x/*`. Fix the import.

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve unit test failures after scope rename"
```

---

## Task 9: Validation — Playwright Tests

**Files:**
- None (verification only)

**Step 1: Run Playwright tests**

Run: `yarn test:playwright`
Expected: All tests pass. Tests import from `@magexo/testing` now (renamed in Task 4). The `makeProject` function inside `testing/index.js` imports from `@magexo/core` (also renamed).

**Step 2: If tests fail — fix**

Check:
- `modules/testing/index.js` — verify `@magexo/core` import
- Test files in `modules/*/tests/` — verify module names in `makeProject` configs use `@magexo/*`
- Test files in `tests/` — same check

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve playwright test failures after scope rename"
```

---

## Task 10: Final Grep Validation

**Files:**
- None (verification only)

**Step 1: Search for remaining `@storefront-x/` in source files**

Run: `grep -rn "@storefront-x/" --include="*.js" --include="*.ts" --include="*.vue" --include="*.json" --exclude-dir=node_modules --exclude-dir=.sfx --exclude-dir=.git --exclude-dir=.yarn --exclude=yarn.lock .`

Expected: Zero matches, or only in:
- `CHANGELOG.md` (historical references — OK)
- `docs/plans/` (design/migration docs — OK)

**Step 2: Search for orphaned `create-storefront-x` references**

Run: `grep -rn "create-storefront-x" --exclude-dir=node_modules --exclude-dir=.sfx --exclude-dir=.git --exclude-dir=.yarn --exclude=yarn.lock .`

Expected: Zero matches, or only in CHANGELOG.md / design docs.

**Step 3: Verify all 80 packages have correct names**

Run: `for pkg in modules/*/package.json; do node -e "const p=JSON.parse(require('fs').readFileSync('$pkg','utf-8')); if(p.name && p.name.includes('storefront-x')) console.log('PROBLEM:', p.name, '$pkg')"; done`

Expected: No output (no package still using old scope).

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: clean up remaining @storefront-x references"
```

---

## Task 11: Write Downstream Migration Script

**Files:**
- Create: `scripts/migrate-downstream.mjs`

**Step 1: Write the script**

```javascript
#!/usr/bin/env node

/**
 * Migration script for downstream projects consuming @storefront-x/* packages.
 * Renames all references to @magexo/* and creates .npmrc for GitHub Packages.
 *
 * Usage:
 *   node path/to/migrate-downstream.mjs [--dry-run]
 *
 * Run this in the root of your downstream project.
 */

import fs from 'node:fs'
import path from 'node:path'

const DRY_RUN = process.argv.includes('--dry-run')
const PROJECT_ROOT = process.cwd()
const OLD_SCOPE = '@storefront-x/'
const NEW_SCOPE = '@magexo/'

const stats = { files: 0, packageJson: false, config: false, npmrc: false }

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
}

function writeFile(filePath, content) {
  if (DRY_RUN) {
    console.log(`  [dry-run] Would write: ${path.relative(PROJECT_ROOT, filePath)}`)
    return
  }
  fs.writeFileSync(filePath, content, 'utf-8')
}

function getAllFiles(dir, extensions, ignore = []) {
  const results = []
  if (!fs.existsSync(dir)) return results
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (ignore.some((i) => fullPath.includes(i))) continue
    if (entry.isDirectory()) {
      results.push(...getAllFiles(fullPath, extensions, ignore))
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath)
    }
  }
  return results
}

function replaceInFile(filePath) {
  const content = readFile(filePath)
  if (!content.includes(OLD_SCOPE)) return
  const newContent = content.replaceAll(OLD_SCOPE, NEW_SCOPE)
  writeFile(filePath, newContent)
  stats.files++
  console.log(`  Replaced: ${path.relative(PROJECT_ROOT, filePath)}`)
}

function main() {
  console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Migrating downstream project to @magexo/*\n`)

  // 1. Update package.json
  const pkgPath = path.join(PROJECT_ROOT, 'package.json')
  if (fs.existsSync(pkgPath)) {
    console.log('Updating package.json...')
    const raw = readFile(pkgPath)
    const pkg = JSON.parse(raw)

    for (const depType of ['dependencies', 'devDependencies', 'peerDependencies']) {
      if (pkg[depType]) {
        const newDeps = {}
        for (const [key, value] of Object.entries(pkg[depType])) {
          if (key.startsWith(OLD_SCOPE)) {
            newDeps[key.replace(OLD_SCOPE, NEW_SCOPE)] = value
          } else if (key === 'create-storefront-x') {
            newDeps['create-magexo-storefront'] = value
          } else {
            newDeps[key] = value
          }
        }
        pkg[depType] = newDeps
      }
    }

    writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
    stats.packageJson = true
    console.log('  Updated: package.json')
  }

  // 2. Update storefront-x.config.js
  const configPath = path.join(PROJECT_ROOT, 'storefront-x.config.js')
  if (fs.existsSync(configPath)) {
    console.log('Updating storefront-x.config.js...')
    replaceInFile(configPath)
    stats.config = true
  }

  // 3. Update source files
  console.log('Scanning source files...')
  const sourceFiles = getAllFiles(PROJECT_ROOT, ['.js', '.ts', '.vue'], [
    'node_modules', '.sfx', '.git', '.yarn', 'yarn.lock',
  ])
  for (const f of sourceFiles) replaceInFile(f)

  // 4. Create .npmrc for GitHub Packages
  const npmrcPath = path.join(PROJECT_ROOT, '.npmrc')
  const npmrcContent = `@magexo:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
`
  if (fs.existsSync(npmrcPath)) {
    const existing = readFile(npmrcPath)
    if (!existing.includes('@magexo:registry')) {
      console.log('Appending GitHub Packages config to existing .npmrc...')
      writeFile(npmrcPath, existing.trimEnd() + '\n' + npmrcContent)
      stats.npmrc = true
    } else {
      console.log('.npmrc already configured for @magexo — skipping.')
    }
  } else {
    console.log('Creating .npmrc for GitHub Packages...')
    writeFile(npmrcPath, npmrcContent)
    stats.npmrc = true
  }

  // Summary
  console.log(`\n--- Summary ---`)
  console.log(`  package.json updated: ${stats.packageJson}`)
  console.log(`  storefront-x.config.js updated: ${stats.config}`)
  console.log(`  Source files modified: ${stats.files}`)
  console.log(`  .npmrc created/updated: ${stats.npmrc}`)

  if (DRY_RUN) {
    console.log(`\n  This was a dry run. No files were changed.`)
  } else {
    console.log(`\n  Done! Next steps:`)
    console.log(`  1. Set GITHUB_TOKEN env var (GitHub PAT with read:packages scope)`)
    console.log(`  2. Run: yarn install`)
    console.log(`  3. Verify: yarn build / yarn dev`)
  }
}

main()
```

**Step 2: Verify syntax**

Run: `node --check scripts/migrate-downstream.mjs`
Expected: No output (success).

**Step 3: Commit**

```bash
git add scripts/migrate-downstream.mjs
git commit -m "chore: add downstream migration script for @storefront-x → @magexo"
```

---

## Task 12: Push Feature Branch to Magexo Remote

**Files:**
- None (git only)

**Step 1: Push the feature branch**

```bash
git push magexo feat/scope-rename
```

**Step 2: Verify on GitHub**

Visit `https://github.com/magexo/storefront-x/tree/feat/scope-rename` and confirm the branch exists with all changes.

---

## Task 13: Create PR, Merge, and First Publish (Manual)

This task is performed manually by the team — not automated by Claude.

**Step 1: Create PR on GitHub**

Create a PR from `feat/scope-rename` → `main` on `magexo/storefront-x`.

**Step 2: Review and merge the PR**

**Step 3: Prepare for publishing**

1. Verify GitHub org `magexo` has Packages enabled (Settings → Packages)
2. Create a GitHub PAT with `write:packages` scope
3. Authenticate npm:
   ```bash
   npm login --scope=@magexo --registry=https://npm.pkg.github.com
   ```

**Step 4: Test publish with a single package first**

```bash
cd modules/core
npm publish --registry https://npm.pkg.github.com
```

Expected: `@magexo/core@1.33.2` published to GitHub Packages. Verify at `https://github.com/magexo/storefront-x/packages`.

If it works, delete the test package version from GitHub Packages UI before bulk publish.

**Step 5: Version bump**

```bash
npx lerna version 1.34.0 --yes
```

This bumps all 80 packages to 1.34.0, updates `lerna.json`, creates git tag `v1.34.0`.

**Step 6: Publish all packages**

```bash
npx lerna publish from-git --registry https://npm.pkg.github.com --yes
```

**Step 7: Verify packages**

Visit `https://github.com/orgs/magexo/packages` and confirm all 80 packages are listed at version 1.34.0.

**Step 8: Test downstream consumption**

In a separate test directory:
1. Create `.npmrc`:
   ```
   @magexo:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```
2. `npm init -y`
3. `npm install @magexo/core@1.34.0`
4. Verify it installs from GitHub Packages.

---

## Quick Reference: Task Summary

| Task | Phase | Description | Automated? |
|---|---|---|---|
| 1 | Git Setup | Add remote, push history, create branch | Manual git |
| 2 | Rename | Write rename script | Code |
| 3 | Rename | Dry run | Verify |
| 4 | Rename | Execute script + yarn install | Script |
| 5 | Rename | Manual bare reference fixes | Manual edit |
| 6 | Validate | yarn lint | Verify |
| 7 | Validate | yarn build | Verify |
| 8 | Validate | yarn test:unit | Verify |
| 9 | Validate | yarn test:playwright | Verify |
| 10 | Validate | Final grep check | Verify |
| 11 | Downstream | Write migration script | Code |
| 12 | Publish | Push branch to magexo remote | Manual git |
| 13 | Publish | PR, merge, lerna version + publish | Manual |
