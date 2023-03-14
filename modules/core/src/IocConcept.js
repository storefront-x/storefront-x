import path from 'node:path'
import ExtendingConcept from './ExtendingConcept.js'

/**
 * @typedef {import('@storefront-x/core').Module} Module
 * @typedef {{module: Module, file: string}} Extension
 */

export default class IocConcept extends ExtendingConcept {
  /**
   * @param {Record<string, {module: Module, file: string, extensions:Extension[]}>} files
   */
  async execute(files) {
    const loaders = []

    for (const { file, filePath, extensions } of Object.values(files)) {
      if (!file) continue

      const fileWithoutExt = file.replace(/\.\w+$/, '')

      if (extensions.length === 0) {
        loaders.push(
          this.writeFile(path.join(this.dst(), `${fileWithoutExt}.ts`), `export { default } from '${filePath}'\n`),
        )
      } else {
        let content = `import self from '${filePath}'\n`
        for (const [i, { filePath }] of extensions.entries()) {
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

        loaders.push(this.writeFile(path.join(this.dst(), `${fileWithoutExt}.ts`), content))
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
}
