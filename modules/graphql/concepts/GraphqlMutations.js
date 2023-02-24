import path from 'node:path'
import { IocConcept } from '@storefront-x/core'

/**
 * @typedef {import('@storefront-x/core').Module} Module
 */

export default class GraphqlMutations extends IocConcept {
  get directory() {
    return 'graphql/mutations'
  }

  /**
   * @param {Record<string, {module: Module, file: string}>} files
   */
  async execute(files) {
    const loaders = []

    for (const { module, file, extensions } of Object.values(files)) {
      if (!file) continue

      const fileWithoutExt = file.replace(/\.\w+$/, '')
      const filePath = this.getPathForFile(module, file)
      const gqlName = fileWithoutExt.replace(/[-/.]/g, '_')

      if (extensions.length === 0) {
        loaders.push(
          this.writeFile(
            path.join(this.dst(), `${fileWithoutExt}.ts`),
            `import self from '${filePath}'\nexport default () => self().name('${gqlName}')\n`,
          ),
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
        content += `() => self().name('${gqlName}')`
        for (let i = extensions.length - 1; i >= 0; i--) {
          content += `)`
        }
        content += `\n`

        loaders.push(this.writeFile(path.join(this.dst(), `${fileWithoutExt}.ts`), content))
      }
    }

    await Promise.all(loaders)
  }
}
