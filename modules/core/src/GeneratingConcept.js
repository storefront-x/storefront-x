//@ts-check

import path from 'path'
import fs from 'node:fs/promises'
import ejs from 'ejs'
import Dev from './Dev.js'
import OverridingConcept from './OverridingConcept.js'

/**
 * @typedef {import('@storefront-x/core').Core} Core
 * @typedef {import('@storefront-x/core').Module} Module
 */

export default class GeneratingConcept extends OverridingConcept {
  /**
   * @param {Core} core
   */
  constructor(core) {
    super(core)

    this.compiledTemplate = this.compileTemplate(this.template)
  }

  async before() {
    await fs.mkdir(this.dst(), { recursive: true })
  }

  /**
   * @param {Record<string, {module: Module, file: string}>} files
   */
  async execute(files) {
    /** @type {Record<string, any>} */
    const records = {}
    /** @type {Record<string, any>} */
    const recordsClient = {}
    /** @type {Record<string, any>} */
    const recordsServer = {}

    for (const { module, file } of Object.values(files)) {
      const filewithoutExt = file.replace(/\.\w+$/, '').replace(/\\/g, '')

      const record = {
        ident: filewithoutExt,
        importName: filewithoutExt.replace(/[^A-Za-z0-9]/g, ''),
        path: this.getPathForFile(module, file),
      }

      if (this.core instanceof Dev && this.addsHashToImports) {
        const hash = await this.getHashForFile(module, file)

        record.path += `?hash=${hash}`
      }

      if (this.supportsClientServer) {
        if (filewithoutExt.endsWith('.client')) {
          recordsClient[record.ident] = record
        } else if (filewithoutExt.endsWith('.server')) {
          recordsServer[record.ident] = record
        } else {
          recordsClient[record.ident] = record
          recordsServer[record.ident] = record
        }
      } else {
        records[record.ident] = record
      }
    }

    if (this.supportsClientServer) {
      await this.renderTemplate(
        this.compiledTemplate,
        { records: recordsClient },
        { file: path.basename(this.directory) + '.client.ts' },
      )
      await this.renderTemplate(
        this.compiledTemplate,
        { records: recordsServer },
        { file: path.basename(this.directory) + '.server.ts' },
      )
    } else {
      await this.renderTemplate(this.compiledTemplate, { records })
    }
  }

  /**
   * @param {(data: any) => string} template
   * @param {any} data
   * @param { {file?: string } } opts
   * @returns {Promise<void>}
   */
  async renderTemplate(template, data, { file } = {}) {
    const rendered = template(data)

    await fs.writeFile(path.join(this.dst(), file ?? `${path.basename(this.directory)}.${this.extension}`), rendered, {
      encoding: 'utf-8',
    })
  }

  /**
   * @param {string} source
   */
  compileTemplate(source) {
    return ejs.compile(source)
  }

  get template() {
    return `
<%_ for (const item in records) { _%>
import ${
      this.exportAll ? '* as <%= records[item].importName %>' : '<%= records[item].importName %>'
    } from '<%= records[item].path %>'
<%_ } _%>

export default {
<%_ for (const [ident, {importName}] of Object.entries(records)) { _%>
  '<%= ident %>': <%= importName %>,
<%_ } _%>
}
`
  }

  get exportAll() {
    return false
  }

  get supportsClientServer() {
    return false
  }

  get addsHashToImports() {
    return false
  }

  get extension() {
    return 'ts'
  }
}
