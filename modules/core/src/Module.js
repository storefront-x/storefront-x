//@ts-check

import path from 'node:path'
import module from 'node:module'
import fs from 'node:fs/promises'
import url from 'node:url'
import consola from 'consola'

/**
 * @typedef {import('@storefront-x/core').Core} Core
 * @typedef {import('@storefront-x/core').Concept} Concept
 */

const require = module.createRequire(import.meta.url)

const logger = consola.withTag('core')

export default class Module {
  /**
   * @param {Core} core
   * @param {any} meta
   */
  constructor(core, meta = {}) {
    this.core = core
    this.meta = meta
  }

  /**
   * @returns {Promise<Concept[]>}
   */
  async getConcepts() {
    /** @type {Concept[]} */
    const concepts = []
    /** @type {string[]} */
    const names = []

    try {
      names.push(...(await fs.readdir(this.join('concepts'))))
    } catch {
      // Do nothing...
    }

    for (const name of names) {
      const { default: _Concept } = await import(url.pathToFileURL(this.join('concepts', name)).href)

      const concept = new _Concept(this.core)

      if (process.env.NODE_ENV !== 'test') logger.log('Loaded concept', concept.directory, '-', this.name)

      concepts.push(concept)
    }

    return concepts
  }

  /**
   * @returns {Promise<import('vite').UserConfigExport>}
   */
  async getViteConfig() {
    const path = this.join('vite.config.js')

    try {
      await fs.access(path)
    } catch {
      return {}
    }

    const { default: viteConfig } = await import(url.pathToFileURL(path).href)

    return typeof viteConfig === 'function' ? viteConfig(this.core) : viteConfig
  }

  /**
   * @returns {string}
   */
  get name() {
    return this.meta.name
  }

  get path() {
    if (this.name.startsWith('.')) {
      return path.dirname(require.resolve(path.join(this.core.rootDir, this.name, 'package.json')))
    } else {
      return path.dirname(require.resolve(path.join(this.meta.name, 'package.json')))
    }
  }

  /**
   * @param {string[]} parts
   */
  join(...parts) {
    return path.join(this.path, ...parts)
  }
}
