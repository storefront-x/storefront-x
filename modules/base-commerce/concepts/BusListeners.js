import { MergingConcept } from '@storefront-x/core'
import path from 'node:path'

export default class BusListeners extends MergingConcept {
  get directory() {
    return 'bus/listeners'
  }

  dst() {
    return path.join(this.core.buildDir, 'bus/listeners')
  }

  async execute(files) {
    /** @type {Record<string, any>} */
    const records = {}

    let id = 0
    let currentFileName = ''

    for (const { module, file } of Object.values(files)) {
      if (currentFileName !== file) {
        id = 0
        currentFileName = file
      }

      const filewithoutExt = file.replace(/\.\w+$/, '').replace(/\\/g, '')

      const record = {
        ident: filewithoutExt,
        importName: 'module' + id,
        path: this.getPathForFile(module, file),
      }

      if (!records[record.ident]) {
        records[record.ident] = [record]
      } else {
        records[record.ident].push(record)
      }

      id++
    }

    for (const item of Object.keys(records)) {
      const data = records[item]

      await this.renderTemplate(this.compiledTemplate, { data })
    }
  }

  async renderTemplate(template, data, { file } = {}) {
    const rendered = template(data)

    await this.writeFile(
      path.join(this.dst(), file ?? `${path.basename(data.data[0].ident)}.${this.extension}`),
      rendered,
    )
  }

  get template() {
    return `// generated by Storefront X
<%_ for (const group of data) { _%>
import use<%= group.importName[0].toUpperCase() + group.importName.slice(1) %> from '<%= group.path %>'
<%_ } _%>

export default () => {
  <%_ for (const group of data) { _%>
  const <%= group.importName %> = use<%= group.importName[0].toUpperCase() + group.importName.slice(1) %>()
  <%_ } _%>

  return [
    <%_ for (const group of data) { _%>
    <%= group.importName %>,
    <%_ } _%>
  ]
}
`
  }
}
