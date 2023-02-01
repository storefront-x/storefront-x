//@ts-check

import path from 'node:path'
import OverridingConcept from './OverridingConcept.js'

/**
 * @typedef {import('@storefront-x/core').Module} Module
 */

export default class CopyingConcept extends OverridingConcept {
  /**
   * @param {Record<string, {module: Module, file: string}>} files
   */
  async execute(files) {
    if (this.removesDestinationDirectory) {
      await this.purgeDst()
    }

    for (const { module, file } of Object.values(files)) {
      if (this.ignoredFiles.test(file)) continue

      await this.copyFile(path.join(this.src(module), file), path.join(this.dst(), file))
    }
  }

  get executesOnChanges() {
    return 'all'
  }

  get removesDestinationDirectory() {
    return true
  }

  /**
   * @returns {string}
   */
  dst() {
    return path.join(this.core.buildDir, this.directory)
  }
}
