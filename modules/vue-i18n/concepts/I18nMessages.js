import { WatchingConcept } from '@storefront-x/core'
import path from 'node:path'
import fs from 'node:fs/promises'
import { merge } from 'lodash-es'

export default class I18nMessages extends WatchingConcept {
  get directory() {
    return 'i18n/messages'
  }
  async execute(files) {
    const records = {}

    for (const { module, file } of Object.values(files)) {
      const rawFile = await fs.readFile(path.join(this.src(module), file), { encoding: 'utf-8' })
      const fileWithoutExt = file.replace(/\.\w+$/, '')

      if (!records[fileWithoutExt]) {
        records[fileWithoutExt] = JSON.parse(rawFile)
      } else {
        records[fileWithoutExt] = merge(records[fileWithoutExt], JSON.parse(rawFile))
      }
    }
    for (const recordName of Object.keys(records)) {
      await this.writeFile(
        path.join(this.dst(), path.basename(this.directory), recordName + '.' + this.extension),
        JSON.stringify(records[recordName], null, '  '),
      )
    }
  }

  processFiles() {
    /** @type {Record<string, {module: Module, file: string}>} */
    const files = {}

    for (const mod of this._mods) {
      for (const file of mod.files) {
        if (this.ignoredFiles.test(file)) continue

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
}
