import path from 'node:path'
import { GeneratingConcept } from '@storefront-x/core'

export default class Pages extends GeneratingConcept {
  get directory() {
    return 'pages'
  }

  get recursive() {
    return true
  }

  /**
   * @param {Record<string, {module: import('@storefront-x/core').Module, file: string}>} files
   */
  async execute(files) {
    const pages = []
    const layouts = []
    let app = null

    for (const { module, file } of Object.values(files)) {
      const parsed = path.parse(file)
      const parts = [...parsed.dir.replace(/\\/g, '/').split('/').filter(Boolean), parsed.name]
      const component = this.getPathForFile(module, file)

      if (file === '$app.vue') {
        app = component
      } else {
        const arr = file.includes('$layout') ? layouts : pages

        arr.push({
          component,
          ident: this.getIdent(parts),
          name: this.getName(parts),
          path: this.getPath(parts),
          readablePath: this.getReadablePath(parts),
          priority: this.getPriority(parts),
        })
      }
    }

    pages.sort((a, z) => a.priority - z.priority)
    layouts.sort((a, z) => a.priority - z.priority)

    await this.renderTemplate(this.compiledTemplate, { pages, layouts, app })
  }

  /**
   * @param {string[]} parts
   */
  getIdent(parts) {
    return parts.join('_').replace(/\/index$/, '')
  }

  /**
   * @param {string[]} parts
   */
  getName(parts) {
    if (parts.includes('$layout')) return undefined
    if (parts.includes('$404')) return 'resolver'

    return parts.join('/')
  }

  /**
   * @param {string[]} parts
   */
  getPath(parts) {
    const path = []

    for (const part of parts) {
      if (part === 'index') {
        // Do nothing...
      } else if (part === '$layout') {
        // Do nothing...
      } else if (part === '$404') {
        path.push('(?<pathMatch>.*)')
      } else {
        path.push(part.replace(/\[(.+?)\]/g, (_, $1) => `(?<${$1}>.+)`))
      }
    }

    return '/^' + '\\/' + path.join('\\/') + '\\/?' + (parts.includes('$layout') ? '/' : '$/')
  }

  getReadablePath(parts) {
    const path = []

    for (const part of parts) {
      if (part === 'index') {
        path.push('')
      } else if (part === '$layout') {
        path.push('')
      } else if (part === '$404') {
        path.push(':pathMatch*')
      } else {
        path.push(part.replace(/\[(.+?)\]/g, (_, $1) => `:${$1}(.+)`))
      }
    }

    return '/' + path.join('/').replace(/\/$/, '')
  }

  /**
   * @param {string[]} parts
   */
  getPriority(parts) {
    let priority = 0

    for (const part of parts) {
      if (part === 'index') {
        priority += 1
      } else if (part === '$layout' && parts.length === 1) {
        priority += 50
      } else if (part === '$404') {
        priority += 9001
      } else {
        priority += 10
      }
    }

    return priority
  }

  get template() {
    return `// generated by Storefront X
import { defineAsyncComponent } from 'vue'
export { default as App } from '<%= app %>'
import plugins from './vueSimpleRouter/plugins'

export const layouts = Object.values(plugins).reduce((layouts, plugin) => plugin(layouts), [
  <%_ for (const layout of layouts) { _%>
  {
    name: <%- layout.name ? "'" + layout.name + "'" : 'undefined' %>,
    path: <%- layout.path %>,
    component: defineAsyncComponent(() => import('<%= layout.component %>')),
  },
  <%_ } _%>
])

export const routes = Object.values(plugins).reduce((routes, plugin) => plugin(routes), [
  <%_ for (const page of pages) { _%>
  {
    name: <%- page.name ? "'" + page.name + "'" : 'undefined' %>,
    path: <%- page.path %>,
    readablePath: <%- "'" + page.readablePath + "'" %>,
    component: defineAsyncComponent(() => import('<%= page.component %>')),
  },
  <%_ } _%>
])
`
  }
}
