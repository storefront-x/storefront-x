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

export default class WatchingConcept extends Concept {
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
    await this.execute(this.processFiles())

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
   * @returns {false|string}
   */
  get executesOnChanges() {
    return false
  }

  processFiles() {
    throw new Error('Unimplemented')
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
        const file = this._normalizePath({ module, path })

        files.add(file)

        await this.execute(this.processFiles())
      })
      .on('unlink', async (path) => {
        const file = this._normalizePath({ module, path })

        files.delete(file)

        await this.execute(this.processFiles())
      })

    if (this.executesOnChanges) {
      watcher.on('change', async (path) => {
        const file = this._normalizePath({ module, path })

        if (this.executesOnChanges === 'change') {
          await this.execute({ [file]: { module, file } })
        } else if (this.executesOnChanges === 'all') {
          await this.execute(this.processFiles())
        } else {
          throw new Error(`Unknown option for ${this.directory}.executesOnChanges. Can be "change" or "all"`)
        }
      })
    }

    this.core.onClose(async () => {
      await watcher.close()
    })
  }

  /**
   * @param {{module:Module,path:string}} options
   * @returns {string}
   */
  _normalizePath(options) {
    return path.relative(options.module.join(this.directory), options.path)
  }

  get removesDestinationDirectory() {
    return false
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
