import path from 'node:path'
import { IocConcept } from '@storefront-x/core'

export default class ServiceWorker extends IocConcept {
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

  getPathForFile(module, file) {
    return path.join('file://', module.join(this.directory, file).replace(/\.ts$/, '').replace(/\\/g, '/'))
  }

  get directory() {
    return 'sw'
  }
}
