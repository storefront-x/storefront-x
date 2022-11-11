/* eslint-disable @typescript-eslint/no-empty-function */

import path from 'node:path'
import fs from 'node:fs/promises'
import * as vite from 'vite'
import fetch from 'node-fetch'
import consola from 'consola'
import Module from './Module.js'

/**
 * @typedef {import('@storefront-x/core').Concept} Concept
 */

// Node.js runtime doesn't have fetch method so we polyfill it
global.fetch = fetch

const logger = consola.withTag('core')

export default class Core {
  /**
   * @param {any} config
   * @param {any} argv
   */
  constructor(config = {}, argv = {}) {
    this.config = config
    this.argv = argv

    this.viteConfig = vite.mergeConfig(
      vite.defineConfig({
        cacheDir: path.resolve(this.buildDir, '.vite'),
        envDir: this.rootDir,
        envPrefix: 'SFX_',
        publicDir: false,
      }),
      this.config.vite ?? {},
    )

    /** @type {Module[]} */
    this.modules = []

    /** @type {Concept[]} */
    this.concepts = []

    /** @type {(() => Promise<void>)[]} */
    this.closeHandlers = []
  }

  async bootstrap() {
    if (process.env.NODE_ENV !== 'test') logger.log('Starting bootstrap')

    await this.clearBuildDir()

    await this.loadModules()

    await this.loadConcepts()

    await this.executeConcepts()

    if (process.env.NODE_ENV !== 'test') logger.log('Bootstrap finished')
  }

  /**
   * @param {any} opts
   */
  async handleRequest({ entry, template, req, res, manifest }) {
    const ctx = {
      req,
      res,
      manifest,
      out: {},
    }

    await entry(ctx)

    for (const out of Object.values(ctx.out)) {
      template = await out(template)
    }

    return res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
  }

  /**
   * @param {import('vite').UserConfig} viteConfig
   */
  buildConfig(viteConfig) {
    return vite.mergeConfig(this.viteConfig, viteConfig, true)
  }

  async loadModules() {
    if (process.env.NODE_ENV !== 'test') logger.log('Loading modules')

    for (const name of this.config.modules) {
      const module = new Module(this, {
        name,
      })

      if (process.env.NODE_ENV !== 'test') logger.log('Loaded module', module.name)

      this.viteConfig = vite.mergeConfig(this.viteConfig, await module.getViteConfig())

      this.modules.push(module)
    }

    if (process.env.NODE_ENV !== 'test') logger.log('Modules loaded')
  }

  async loadConcepts() {
    if (process.env.NODE_ENV !== 'test') logger.log('Loading concepts')

    for (const module of this.modules) {
      this.concepts.push(...(await module.getConcepts()))
    }

    if (process.env.NODE_ENV !== 'test') logger.log('Concepts loaded')
  }

  async executeConcepts() {
    if (process.env.NODE_ENV !== 'test') logger.log('Executing concepts')

    for (const concept of this.concepts) {
      await concept.before()
      for (const module of this.modules) {
        await concept.run(module)
      }
      await concept.after()
    }

    if (process.env.NODE_ENV !== 'test') logger.log('Concepts executed')
  }

  async loadViteConfigs() {
    for (const module of this.modules) {
      this.viteConfig = vite.mergeConfig(this.viteConfig, await module.getViteConfig())
    }
  }

  async clearBuildDir() {
    await fs.rm(this.buildDir, { recursive: true, force: true })
  }

  async close() {
    for (const closeHandler of this.closeHandlers) {
      await closeHandler()
    }
  }

  /**
   * @param {() => Promise<void>} closeHandler
   */
  onClose(closeHandler) {
    this.closeHandlers.push(closeHandler)
  }

  get distDir() {
    return path.resolve(this.buildDir, '.dist')
  }

  get buildDir() {
    return path.resolve(this.rootDir, '.sfx')
  }

  get rootDir() {
    return this.config.dir ?? process.cwd()
  }
}
