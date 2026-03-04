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
