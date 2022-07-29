//@ts-check

import path from 'node:path'
import fs from 'node:fs/promises'
import OverridingConcept from './OverridingConcept.js'

/**
 * @typedef {import('@storefront-x/core').Module} Module
 */

export default class CopyingConcept extends OverridingConcept {
  async before() {
    await super.before()

    await fs.mkdir(this.dst(), { recursive: true })
  }

  /**
   * @param {Record<string, {module: Module, file: string}>} files
   */
  async execute(files) {
    for (const { module, file } of Object.values(files)) {
      await this.copyFile(path.join(this.src(module), file), path.join(this.dst(), file))
    }
  }

  get executesOnChanges() {
    return true
  }

  /**
   * @returns {string}
   */
  dst() {
    return path.join(this.core.buildDir, this.directory)
  }
}
