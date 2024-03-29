/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

//@ts-check

import path from 'node:path'
import fs from 'node:fs/promises'
import crypto from 'node:crypto'

/**
 * @typedef {import('@storefront-x/core').Core} Core
 * @typedef {import('@storefront-x/core').Module} Module
 */

export default class Concept {
  /**
   * @param {Core} core
   */
  constructor(core) {
    this.core = core
  }

  /**
   * @returns {string}
   */
  get directory() {
    throw new Error('Unimplemented')
  }

  /**
   * @returns {boolean}
   */
  get recursive() {
    return false
  }

  async before() {}

  /**
   * @param {Module} module
   */
  async run(module) {}

  async after() {}

  async afterBuild() {}

  /**
   * Returns simple paths of files inside the directory
   * Recursivity is controlled with recursive getter
   *
   * Example output:
   *
   * ['index.vue', 'checkout.vue', 'account/index.vue', 'account/orders.vue']
   *
   * @param {string} directory
   * @returns {Promise<string[]>}
   */
  async getFiles(directory) {
    const dirents = await fs.readdir(directory, { withFileTypes: true })

    const files = await Promise.all(
      dirents.map(async (dirent) => {
        const res = path.resolve(directory, dirent.name)
        if (dirent.isDirectory()) {
          if (this.recursive) {
            const files = await this.getFiles(res)

            return files
              .filter((file) => !this.ignoredFiles.test(file))
              .map((file) => path.join(directory, dirent.name, file))
          } else {
            return []
          }
        } else {
          return res
        }
      }),
    )

    return files.flat().map((file) => file.replace(directory, '').replace(/\\/g, '/').replace(/^\//, ''))
  }

  get ignoredFiles() {
    return /README\.md/
  }

  /**
   * @param {Module} module
   * @param {string} file
   * @returns {string}
   */
  getPathForFile(module, file) {
    return (
      '~/' +
      path
        .relative(this.core.rootDir, module.join(this.directory, file))
        .replace(/\.tsx?$/, '')
        .replace(/\\/g, '/')
    )
  }

  /**
   * @param {Module} module
   * @param {string} file
   * @returns {Promise<string>}
   */
  async getHashForFile(module, file) {
    const content = await fs.readFile(module.join(this.directory, file), { encoding: 'utf-8' })

    return crypto.createHash('md5').update(content).digest('hex').toString()
  }

  /**
   * @param {string} file
   * @param {string} content
   * @returns {Promise<void>}
   */
  async writeFile(file, content) {
    try {
      await fs.stat(path.dirname(file))
    } catch {
      await fs.mkdir(path.dirname(file), { recursive: true })
    }

    await fs.writeFile(file, content, { encoding: 'utf-8' })
  }

  /**
   * @param {string} src
   * @param {string} dst
   * @returns {Promise<void>}
   */
  async copyFile(src, dst) {
    try {
      await fs.stat(path.dirname(dst))
    } catch {
      await fs.mkdir(path.dirname(dst), { recursive: true })
    }

    await fs.copyFile(src, dst)
  }

  async purgeDst() {
    await fs.rm(this.dst(), { recursive: true, force: true })
  }

  /**
   * @param {Module} module
   * @returns {string}
   */
  src(module) {
    return path.join(module.path, this.directory)
  }

  /**
   * @returns {string}
   */
  dst() {
    return path.join(this.core.buildDir, path.dirname(this.directory))
  }
}
