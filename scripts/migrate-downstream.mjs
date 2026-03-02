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
    'node_modules',
    '.sfx',
    '.git',
    '.yarn',
    'yarn.lock',
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
