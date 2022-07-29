//@ts-check

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
    /** @type {any[][]} */
    let pages = [[]]
    /** @type {string[]} */
    let paths = []
    let index = 0

    let pathBefore = ''

    for (const { module, file } of Object.values(files)) {
      const parsed = path.parse(file)
      const parts = [...parsed.dir.replace(/\\/g, '/').split('/').filter(Boolean), parsed.name]
      const component = this.getPathForFile(module, file)

      const isNewLayout = parts.includes('$layout') && parts.length > 1
      const isNewFolder = parts[0] === pathBefore

      if (isNewLayout) {
        index++
        if (!pages[index]) pages[index] = []
      }

      if (isNewLayout || isNewFolder) {
        pathBefore = parts[0]

        if (!paths.includes('/' + parts[0])) {
          paths.push('/' + parts[0])
        }

        pages[index].push({
          ident: this.getIdent(parts),
          name: this.getName(parts),
          path: this.getPath(parts.slice(1)),
          priority: this.getPriority(parts),
          component,
        })
      } else {
        if (!paths.includes('/')) {
          paths.push('/')
        }

        pages[0].push({
          ident: this.getIdent(parts),
          name: this.getName(parts),
          path: this.getPath(parts),
          priority: this.getPriority(parts),
          component,
        })
      }
    }

    for (const route of Object.values(pages)) {
      route.sort((a, b) => a.priority - b.priority)
    }

    let layouts = []
    for (const route of Object.values(pages)) {
      for (const item of route) {
        if (item.ident.includes('$layout')) {
          layouts.push(item)
          route.splice(route.indexOf(item), 1)
        }
      }
    }

    await this.renderTemplate(this.compiledTemplate, { pages, layouts, paths })
  }

  /**
   * @param {string[]} parts
   */
  getIdent(parts) {
    return parts.join('_')
  }

  /**
   * @param {string[]} parts
   */
  getName(parts) {
    return parts.join('/')
  }

  /**
   * @param {string[]} parts
   */
  getPath(parts) {
    if (parts[0] === 'index') return ''
    if (parts[0] === '$404') return ':pathMatch(.*)*'

    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === 'index') {
        parts[i] = ''
      }
    }

    const route = parts.map((part) => part.replace(/\[(.+?)\]/g, (_, $1) => `:${$1}(.+)`)).join('/')

    return route
  }

  /**
   * @param {string[]} parts
   */
  getPriority(parts) {
    if (parts[0] === 'index') return 1
    if (parts[0] === '$404') return 9001

    let priority = 10

    for (let part of parts) {
      if (part[0] === '_') {
        priority += 20
      } else {
        priority += 10
      }
    }

    return priority
  }

  get template() {
    return `
    import * as plugins from './vueRouter/plugins'

const _routes = [
  <%_ for (var i = 0; i < pages.length; i++) { _%>
  {
    path: '<%= paths[i] %>',
    component: () => import('<%= layouts[i].component %>'),
    children: [
      <%_ for (const item of pages[i]) { _%>
        { name: '<%= item.name %>', path: '<%= item.path %>', component: () => import('<%= item.component %>'), },
      <%_ } _%>
      ]
  },
  <%_ } _%>
]

let newRoutes = []

for (const plugin of Object.values(plugins) as any) {
  newRoutes = plugin(_routes)
}

export const routes = newRoutes.length ? newRoutes : _routes

`
  }
}
