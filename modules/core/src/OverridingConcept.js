//@ts-check

import WatchingConcept from './WatchingConcept.js'

/**
 * @typedef {import('@storefront-x/core').Core} Core
 * @typedef {import('@storefront-x/core').Module} Module
 */

export default class OverridingConcept extends WatchingConcept {
  /**
   * @returns {Record<string, {module: Module, file: string}>}
   */
  processFiles() {
    /** @type {Record<string, {module: Module, file: string}>} */
    const files = {}

    for (const mod of this._mods) {
      for (const file of mod.files) {
        if (this.ignoredFiles.test(file)) continue

        files[file] = {
          module: mod.module,
          file,
        }
      }
    }

    return files
  }

  get removesDestinationDirectory() {
    return false
  }
}
