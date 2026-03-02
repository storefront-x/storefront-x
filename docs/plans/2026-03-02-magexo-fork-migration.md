# Magexo Fork Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the Storefront X monorepo to `git@github.com:magexo/storefront-x.git` with npm scope rename `@storefront-x/*` → `@magexo/*` and GitHub Packages publishing.

**Architecture:** Fork with full git history. Automated Node.js rename script handles the bulk of changes (~294 files). A separate downstream migration script automates consumer project migration. Publishing via GitHub Packages (`npm.pkg.github.com`) under the `@magexo` scope tied to the GitHub org.

**Tech Stack:** Node.js (rename scripts), Lerna (versioning/publishing), Yarn 3 workspaces, GitHub Packages npm registry

**Design doc:** `docs/plans/2026-03-02-magexo-fork-migration-design.md`

---

## Task 1: Git Remote Setup

**Files:**
- None (git operations only)

**Step 1: Add the magexo remote**

```bash
git remote add magexo git@github.com:magexo/storefront-x.git
```

**Step 2: Verify the remote was added**

Run: `git remote -v`
Expected: Both `origin` (storefront-x/storefront-x) and `magexo` (magexo/storefront-x) listed.

**Step 3: Push full history with tags to magexo**

```bash
git push magexo main --tags
```

Expected: All commits and tags pushed successfully.

**Step 4: Create the feature branch**

```bash
git checkout -b feat/scope-rename
```

**Step 5: Commit**

No commit needed — branch created from main.

---

## Task 2: Write the Automated Rename Script

This script does all the heavy lifting. It modifies ~294 files in a single run.

**Files:**
- Create: `scripts/rename-scope.mjs`

**Step 1: Write the rename script**

```javascript
#!/usr/bin/env node

/**
 * Automated scope rename script for Storefront X → Magexo migration.
 *
 * Renames:
 * - @storefront-x/* → @magexo/* in all source files
 * - package.json name, dependencies, publishConfig, repository fields
 * - create-storefront-x directory → create-magexo-storefront
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

// --- Phase 1: Rename in all package.json files ---

function updatePackageJson(filePath) {
  const raw = readFile(filePath)
  const pkg = JSON.parse(raw)
  let changed = false

  // Rename the package name
  if (pkg.name && pkg.name.startsWith('@storefront-x/')) {
    pkg.name = pkg.name.replace('@storefront-x/', '@magexo/')
    changed = true
  }

  // Special case: create-storefront-x → create-magexo-storefront
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
        if (key.startsWith('@storefront-x/')) {
          newDeps[key.replace('@storefront-x/', '@magexo/')] = value
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

  if (!content.includes('@storefront-x/')) return

  const newContent = content.replaceAll('@storefront-x/', '@magexo/')
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

  // Update repository URL
  pkg.repository = GITHUB_REPO

  // Rename @storefront-x/* dependencies
  for (const depType of ['dependencies', 'devDependencies']) {
    if (pkg[depType]) {
      const newDeps = {}
      for (const [key, value] of Object.entries(pkg[depType])) {
        if (key.startsWith('@storefront-x/')) {
          newDeps[key.replace('@storefront-x/', '@magexo/')] = value
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

  const templatePkgs = getAllFiles(path.join(createModuleDir, 'template'), ['package.json'])
  for (const pkgPath of templatePkgs) {
    const raw = readFile(pkgPath)
    if (raw.includes('@storefront-x/')) {
      const newContent = raw.replaceAll('@storefront-x/', '@magexo/')
      writeFile(pkgPath, newContent)
      stats.filesModified++
      console.log(`  Replaced: ${path.relative(ROOT, pkgPath)}`)
    }
  }

  // Phase 2: Source file find-replace
  console.log('\nPhase 2: Replacing @storefront-x/ in source files...')
  const sourceExtensions = ['.js', '.ts', '.vue', '.md', '.yml', '.yaml', '.json']
  const ignoreDirs = ['node_modules', '.sfx', '.git', '.yarn', 'yarn.lock']

  // Concept files
  for (const moduleDir of moduleDirs) {
    const conceptFiles = getAllFiles(path.join(moduleDir, 'concepts'), ['.js'], ignoreDirs)
    for (const f of conceptFiles) replaceInFile(f)
  }

  // Test files
  for (const moduleDir of moduleDirs) {
    const testFiles = getAllFiles(path.join(moduleDir, 'tests'), ['.js', '.ts'], ignoreDirs)
    for (const f of testFiles) replaceInFile(f)
  }

  // Core source
  const coreSrcFiles = getAllFiles(path.join(ROOT, 'modules', 'core', 'src'), ['.js', '.ts'], ignoreDirs)
  for (const f of coreSrcFiles) replaceInFile(f)

  // Testing module
  const testingIndex = path.join(ROOT, 'modules', 'testing', 'index.js')
  if (fs.existsSync(testingIndex)) replaceInFile(testingIndex)

  // Sitemap module source
  const sitemapFiles = getAllFiles(path.join(ROOT, 'modules', 'sitemap'), ['.js', '.ts'], [...ignoreDirs, 'concepts', 'tests'])
  for (const f of sitemapFiles) replaceInFile(f)

  // Debug tools module source
  const debugFiles = getAllFiles(path.join(ROOT, 'modules', 'debug-tools'), ['.js', '.ts'], [...ignoreDirs, 'concepts', 'tests'])
  for (const f of debugFiles) replaceInFile(f)

  // Config files in templates
  const templateConfigs = getAllFiles(path.join(createModuleDir, 'template'), ['.js', '.ts'], ignoreDirs)
  for (const f of templateConfigs) replaceInFile(f)

  // Documentation
  const docFiles = getAllFiles(path.join(ROOT, 'docs'), ['.md', '.js'], [...ignoreDirs, 'dist', '.vitepress/cache'])
  for (const f of docFiles) replaceInFile(f)

  // GitHub Actions
  const ghFiles = getAllFiles(path.join(ROOT, '.github'), ['.yml', '.yaml'], ignoreDirs)
  for (const f of ghFiles) replaceInFile(f)

  // CLAUDE.md and .claude/ rules
  const claudeMd = path.join(ROOT, 'CLAUDE.md')
  if (fs.existsSync(claudeMd)) replaceInFile(claudeMd)
  const claudeFiles = getAllFiles(path.join(ROOT, '.claude'), ['.md'], ignoreDirs)
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

**Step 2: Verify the script is syntactically correct**

Run: `node --check scripts/rename-scope.mjs`
Expected: No output (success)

**Step 3: Commit the rename script**

```bash
git add scripts/rename-scope.mjs
git commit -m "chore: add automated scope rename script @storefront-x → @magexo"
```

---

## Task 3: Run the Rename Script (Dry Run)

**Files:**
- None modified (dry run)

**Step 1: Execute the dry run**

Run: `node scripts/rename-scope.mjs --dry-run`
Expected: Output listing all files that would be modified. Approximately 80 package.json updates, 150+ source file replacements, 1 directory rename.

**Step 2: Review the dry-run output**

Verify:
- All 79 `@storefront-x/*` package names are listed for rename
- `create-storefront-x` directory rename is listed
- Concept files (64), test files (76), core source (10), docs (50) are all covered
- No unexpected files listed (e.g., nothing in `node_modules/`, `.sfx/`, `.git/`)

**Step 3: No commit** — dry run only.

---

## Task 4: Execute the Rename Script (Real Run)

**Files:**
- Modify: ~294 files across the entire monorepo (automated)

**Step 1: Run the script for real**

Run: `node scripts/rename-scope.mjs`
Expected: All files modified, directory renamed, summary printed.

**Step 2: Verify no `@storefront-x/` references remain in source files**

Run: `grep -r "@storefront-x/" --include="*.js" --include="*.ts" --include="*.vue" --include="*.json" --exclude-dir=node_modules --exclude-dir=.sfx --exclude-dir=.git --exclude-dir=.yarn --exclude=yarn.lock . | head -20`

Expected: No output (zero matches), OR only matches in files that intentionally reference the old upstream (like CHANGELOG.md GitHub URLs which are OK to keep pointing to the original repo).

**Step 3: Verify the directory was renamed**

Run: `ls modules/ | grep -E "create-(storefront-x|magexo)"`
Expected: Only `create-magexo-storefront` (no `create-storefront-x`)

**Step 4: Verify a sample of renamed package.json files**

Run: `node -e "const p = JSON.parse(require('fs').readFileSync('modules/core/package.json','utf-8')); console.log(p.name, p.publishConfig, p.repository)"`
Expected:
- name: `@magexo/core`
- publishConfig: `{ access: 'public', registry: 'https://npm.pkg.github.com' }`
- repository: `{ type: 'git', url: 'https://github.com/magexo/storefront-x.git', directory: 'modules/core' }`

**Step 5: Regenerate the yarn lockfile**

Run: `yarn install`
Expected: Lockfile regenerated with new package names. No resolution errors.

**Step 6: Commit all changes**

```bash
git add -A
git commit -m "chore: rename npm scope @storefront-x/* → @magexo/* for GitHub Packages

- Renamed all 80 publishable packages from @storefront-x/* to @magexo/*
- Renamed create-storefront-x to create-magexo-storefront
- Updated publishConfig to target npm.pkg.github.com
- Added repository field to all package.json (required by GitHub Packages)
- Updated all concept imports, test imports, docs references
- Regenerated yarn.lock"
```

---

## Task 5: Update Files with Bare `storefront-x` References

Some files reference `storefront-x` outside the `@storefront-x/` scope pattern. These need manual review — the automated script only handles `@storefront-x/` → `@magexo/`.

**Files:**
- Modify: `modules/create-magexo-storefront/index.js` (line 83 — default directory name)
- Modify: `.github/workflows/release.yml` (lines 26, 39 — `create storefront-x` → `create magexo-storefront`)
- Modify: `.gitignore` (line with `storefront-x.local.config.js` — keep as-is per design: config filename stays)
- Modify: `Dockerfile` (line 3 — `storefront-x.config.js` — keep as-is per design)
- Modify: `modules/core/sfx.js` (lines 32, 66 — `storefront-x.config.js` — keep as-is per design)
- Modify: root `package.json` (update `name` to `magexo-storefront` and `author`)

**Step 1: Update `create-magexo-storefront/index.js` default directory**

In `modules/create-magexo-storefront/index.js`, change line 83:
```javascript
// Before:
initial: 'storefront-x-app',
// After:
initial: 'magexo-storefront-app',
```

**Step 2: Update GitHub Actions release workflow**

In `.github/workflows/release.yml`, change the `create storefront-x` commands:
```yaml
# Before (line 26):
yarn create storefront-x --directory=app --integration=magento
# After:
yarn create magexo-storefront --directory=app --integration=magento

# Before (line 39):
npm create storefront-x@latest -y -- --directory=app --integration=magento
# After:
npm create magexo-storefront@latest -y -- --directory=app --integration=magento
```

**Step 3: Update root package.json metadata**

In root `package.json`:
```json
// Before:
"name": "storefront-x",
"repository": "https://github.com/storefront-x/storefront-x",
"author": "Storefront-x",

// After:
"name": "magexo-storefront",
"repository": "https://github.com/magexo/storefront-x",
"author": "Magexo",
```

**Step 4: Verify — what stays unchanged (by design)**

These keep the `storefront-x` name intentionally:
- `storefront-x.config.js` filename in CLI defaults (`modules/core/sfx.js:32,66`) — unchanged per design decision
- `storefront-x.local.config.js` in `.gitignore` — unchanged
- `Dockerfile` default config ARG — unchanged
- Config filenames in templates — unchanged (downstream projects still use `storefront-x.config.js`)

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
Expected: Pass with no errors. If there are errors, they indicate a missed reference in the rename.

**Step 2: If lint fails, fix broken imports**

Check the error messages. Typical issues:
- Missing `@magexo/core` import — the file was missed by the rename script
- Unresolved module — workspace symlinks not updated, rerun `yarn install`

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
Expected: Build completes successfully. The config file uses module names — if the rename script updated the demo configs, they should reference `@magexo/*`.

**NOTE:** The demo config files (`storefront-x.magento.config.js`, `storefront-x.px.config.js`) were reported as not existing in the working tree. If they don't exist, skip this step and proceed to Task 8. The templates in `create-magexo-storefront` were already updated.

**Step 2: If build fails, debug**

Common issues:
- Config file references old `@storefront-x/*` module names → update to `@magexo/*`
- Vite can't resolve a module → check `yarn install` was run

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build errors after scope rename"
```

---

## Task 8: Validation — Tests

**Files:**
- None (verification only)

**Step 1: Run unit tests**

Run: `yarn test:unit`
Expected: All tests pass.

**Step 2: Run Playwright tests**

Run: `yarn test:playwright`
Expected: All tests pass. The test files import from `@magexo/testing` now (renamed by the script). The `makeProject` function inside `testing/index.js` imports from `@magexo/core` (also renamed).

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve test failures after scope rename"
```

---

## Task 9: Write the Downstream Migration Script

**Files:**
- Create: `scripts/migrate-downstream.mjs`

**Step 1: Write the migration script**

```javascript
#!/usr/bin/env node

/**
 * Migration script for downstream projects consuming @storefront-x/* packages.
 * Renames all references to @magexo/* and creates .npmrc for GitHub Packages.
 *
 * Usage:
 *   npx @magexo/core migrate        (future — after publishing)
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
Expected: No output (success)

**Step 3: Commit**

```bash
git add scripts/migrate-downstream.mjs
git commit -m "chore: add downstream migration script for @storefront-x → @magexo"
```

---

## Task 10: Final Grep Validation

**Files:**
- None (verification only)

**Step 1: Search for any remaining `@storefront-x/` references**

Run: `grep -rn "@storefront-x/" --include="*.js" --include="*.ts" --include="*.vue" --include="*.json" --exclude-dir=node_modules --exclude-dir=.sfx --exclude-dir=.git --exclude-dir=.yarn --exclude=yarn.lock .`

Expected: Zero matches, or only in:
- `CHANGELOG.md` (GitHub URLs to original repo — OK)
- `docs/plans/` (design docs referencing the migration — OK)

**Step 2: Search for orphaned `create-storefront-x` references**

Run: `grep -rn "create-storefront-x" --exclude-dir=node_modules --exclude-dir=.sfx --exclude-dir=.git --exclude-dir=.yarn --exclude=yarn.lock .`

Expected: Zero matches, or only in CHANGELOG.md / design docs.

**Step 3: Verify all 80 packages have correct names**

Run: `for pkg in modules/*/package.json; do node -e "const p=JSON.parse(require('fs').readFileSync('$pkg','utf-8')); if(p.name && p.name.includes('storefront-x')) console.log('PROBLEM:', p.name, '$pkg')"; done`

Expected: No output (no package still using old scope).

**Step 4: Fix any remaining references and commit**

```bash
git add -A
git commit -m "fix: clean up remaining @storefront-x references"
```

---

## Task 11: Push Feature Branch to Magexo Remote

**Files:**
- None (git only)

**Step 1: Push the feature branch**

```bash
git push magexo feat/scope-rename
```

**Step 2: Verify on GitHub**

Visit `https://github.com/magexo/storefront-x/tree/feat/scope-rename` and confirm all changes are there.

---

## Task 12: Merge and First Publish (Manual)

This task is performed manually by the team, not automated.

**Step 1: Create PR on GitHub**

Create a PR from `feat/scope-rename` → `main` on `magexo/storefront-x`.

**Step 2: Review and merge**

Review the PR, ensure all CI checks pass, merge to `main`.

**Step 3: Prepare for publishing**

1. Verify GitHub org `magexo` has Packages enabled (Settings → Packages)
2. Create a GitHub PAT with `write:packages` scope
3. Authenticate: `npm login --scope=@magexo --registry=https://npm.pkg.github.com`

**Step 4: Version bump**

```bash
npx lerna version 1.34.0 --yes
```

This bumps all 80 packages to 1.34.0, updates `lerna.json`, creates a git tag.

**Step 5: Publish to GitHub Packages**

```bash
npx lerna publish from-git --registry https://npm.pkg.github.com --yes
```

**Step 6: Verify packages**

Visit `https://github.com/orgs/magexo/packages` and confirm all 80 packages are listed.

**Step 7: Test downstream consumption**

In a test project:
1. Create `.npmrc` with GitHub Packages config
2. `yarn add @magexo/core@1.34.0`
3. Verify it installs from GitHub Packages

---

## Quick Reference: File Counts

| Category | Count |
|---|---|
| Module package.json (name rename) | 80 |
| Concept files (import replace) | 64 |
| Test files (import replace) | 76 |
| Core source files | 10 |
| Documentation (source) | 50 |
| create-storefront-x templates | 11 |
| Other source files | 12 |
| GitHub Actions | 7 |
| Claude/AI instruction files | 10 |
| Root files (package.json, CHANGELOG) | 2 |
| **Total files to modify** | **~294** |
| + yarn.lock (auto-regenerated) | 1 |
| + docs dist (auto-rebuilt) | 115 |
