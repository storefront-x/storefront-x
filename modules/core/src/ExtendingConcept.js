//@ts-check

import WatchingConcept from './WatchingConcept.js'

/**
 * @typedef {import('@storefront-x/core').Core} Core
 * @typedef {import('@storefront-x/core').Module} Module
 * @typedef {{module: Module, file: string}} Extension
 */

export default class ExtendingConcept extends WatchingConcept {
  /**
   * @returns {Record<string, {module?: Module, file?: string, filePath?: string, extensions:Extension[]}>}
   */
  processFiles() {
    /** @type {Record<string, {module?: Module, file?: string, filePath?: string, extensions:Extension[]}>} */
    const files = {}

    for (const mod of this._mods) {
      for (const file of mod.files) {
        if (this.ignoredFiles.test(file)) continue

        const isExt = file.includes('.ext')
        const ident = file.replace('.ext', '')

        const obj = {
          module: mod.module,
          file,
          filePath: this.getPathForFile(mod.module, file),
        }

        if (files[ident]) {
          if (isExt) {
            files[ident].extensions.push(obj)
          } else {
            files[ident] = {
              ...obj,
              extensions: files[ident].extensions,
            }
          }
        } else {
          if (isExt) {
            files[ident] = {
              extensions: [obj],
            }
          } else {
            files[ident] = {
              ...obj,
              extensions: [],
            }
          }
        }
      }
    }

    return files
  }
}
