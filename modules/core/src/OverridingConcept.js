/* eslint-disable @typescript-eslint/no-unused-vars */

//@ts-check

import path from 'node:path'
import chokidar from 'chokidar'
import Dev from './Dev.js'
import Concept from './Concept.js'

/**
 * @typedef {import('@storefront-x/core').Core} Core
 * @typedef {import('@storefront-x/core').Module} Module
 */

export default class OverridingConcept extends Concept {
  /**
   * @param {Core} core
   */
  constructor(core) {
    super(core)

    /** @type {Mod[]} */
    this._mods = []
    /** @type {(() => void)[]} */
    this._watchers = []
  }

  /**
   * @param {Module} module
   */
  async run(module) {
    const mod = new Mod(module)

    this._mods.push(mod)

    try {
      const names = await this.getFiles(this.src(module))

      for (const name of names) {
        mod.files.add(name)
      }
    } catch {
      // Do nothing...
    }

    if (this.core instanceof Dev) {
      this._watchers.push(() => this._watch(mod))
    }
  }

  async after() {
    await this.execute(this._getFiles())

    for (const watcher of this._watchers) {
      await watcher()
    }
  }

  /**
   * @param {Record<string, {module: Module, file: string}>} files
   */
  async execute(files) {
    throw new Error('Unimplemented')
  }

  /**
   * @returns {boolean}
   */
  get executesOnChanges() {
    return false
  }

  /**
   * @returns {Record<string, {module: Module, file: string}>}
   */
  _getFiles() {
    /** @type {Record<string, {module: Module, file: string}>} */
    const files = {}

    for (const mod of this._mods) {
      for (const file of mod.files) {
        files[file] = {
          module: mod.module,
          file,
        }
      }
    }

    return files
  }

  /**
   * @param {Mod} mod
   */
  _watch({ module, files }) {
    const watcher = chokidar.watch(module.join(this.directory), {
      ignoreInitial: true,
      depth: this.recursive ? undefined : 0,
    })

    watcher
      .on('add', async (path) => {
        const file = this._normalizePath(path)

        files.add(file)

        await this.execute(this._getFiles())
      })
      .on('unlink', async (path) => {
        const file = this._normalizePath(path)

        files.delete(file)

        await this.execute(this._getFiles())
      })

    if (this.executesOnChanges) {
      watcher.on('change', async (path) => {
        const file = this._normalizePath(path)

        await this.execute({ [file]: { module, file } })
      })
    }

    this.core.onClose(async () => {
      await watcher.close()
    })
  }

  /**
   * @param {string} _path
   * @returns {string}
   */
  _normalizePath(_path) {
    return path.basename(_path)
  }
}

class Mod {
  /**
   * @param {Module} module
   */
  constructor(module) {
    /** @type {Module} */
    this.module = module
    /** @type {Set<string>} */
    this.files = new Set()
  }
}
