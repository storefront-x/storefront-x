import path from 'node:path'
import WatchingConcept from './WatchingConcept.js'

/**
 * @typedef {import('@storefront-x/core').Module} Module
 */

export default class IocConcept extends WatchingConcept {
  /**
   * @param {Record<string, {module: Module, file: string}>} files
   */
  async execute(files) {
    const loaders = []

    for (const { module, file, extensions } of Object.values(files)) {
      if (!file) continue

      const fileWithoutExt = file.replace(/\.\w+$/, '')
      const filePath = this.getPathForFile(module, file)

      if (extensions.length === 0) {
        loaders.push(
          this.writeFile(path.join(this.dst(), `${fileWithoutExt}.js`), `export { default } from '${filePath}'\n`),
        )
      } else {
        let content = `import self from '${filePath}'\n`
        for (const [i, { module, file }] of extensions.entries()) {
          const filePath = this.getPathForFile(module, file)
          content += `import ext${i} from '${filePath}'\n`
        }
        content += `export default `
        for (let i = extensions.length - 1; i >= 0; i--) {
          content += `ext${i}(`
        }
        content += 'self'
        for (let i = extensions.length - 1; i >= 0; i--) {
          content += `)`
        }
        content += `\n`

        loaders.push(this.writeFile(path.join(this.dst(), `${fileWithoutExt}.js`), content))
      }
    }

    await Promise.all(loaders)
  }

  dst() {
    return path.join(this.core.buildDir, 'ioc', this.directory)
  }

  get recursive() {
    return true
  }

  processFiles() {
    const files = {}

    for (const mod of this._mods) {
      for (const file of mod.files) {
        const isExt = file.includes('.ext')
        const ident = file.replace('.ext', '')

        const obj = {
          module: mod.module,
          file,
        }

        if (files[ident]) {
          if (isExt) {
            files[ident].extensions.push(obj)
          } else {
            files[ident] = {
              module: mod.module,
              file,
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
              module: mod.module,
              file,
              extensions: [],
            }
          }
        }
      }
    }

    return files
  }
}
