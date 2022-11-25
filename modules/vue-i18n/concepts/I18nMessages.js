import { WatchingConcept } from '@storefront-x/core'
import path from 'node:path'
import url from 'node:url'

export default class I18nMessages extends WatchingConcept {
  get directory() {
    return 'i18n/messages'
  }
  async execute(files) {
    const records = {}

    for (const { module, file } of Object.values(files)) {
      const { default: fileContents } = await import(url.pathToFileURL(path.join(this.src(module), file)).href)
      const fileWithoutExt = file.replace(/\.\w+$/, '')

      if (!records[fileWithoutExt]) {
        records[fileWithoutExt] = this.mergeDeep({}, fileContents)
      } else {
        records[fileWithoutExt] = this.mergeDeep(records[fileWithoutExt], fileContents)
      }
    }
    for (const recordName of Object.keys(records)) {
      await this.writeFile(
        path.join(this.dst(), path.basename(this.directory), recordName + '.' + this.extension),
        JSON.stringify(records[recordName]),
      )
    }
  }

  processFiles() {
    /** @type {Record<string, {module: Module, file: string}>} */
    const files = {}

    for (const mod of this._mods) {
      for (const file of mod.files) {
        files[`${file}_${mod.module.name}`] = {
          module: mod.module,
          file,
        }
      }
    }

    return files
  }

  get extension() {
    return 'json'
  }

  mergeDeep(target, ...sources) {
    if (!sources.length) return target
    const source = sources.shift()

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) target[key] = {}
          this.mergeDeep(target[key], source[key])
        } else {
          target[key] = source[key]
        }
      }
    }

    return this.mergeDeep(target, ...sources)
  }

  isObject(val) {
    return val === Object(val)
  }
}
