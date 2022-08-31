import path, { parse } from 'node:path'
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
    const pages = {}
    let guards = []

    for (const { module, file } of Object.values(files)) {
      const parsed = path.parse(file)
      const parts = [...parsed.dir.replace(/\\/g, '/').split('/').filter(Boolean), parsed.name]
      const component = this.getPathForFile(module, file)

      if (parsed.name.includes('beforeEnter')) {
        const guardName = parsed.name.split('.')[0]
        const guardIdent = guardName.replace(/-/g, '_')
        guards.push({
          type: 'guard',
          ident: guardIdent,
          key: this.getIdent(parts),
          name: guardName,
          component,
        })
      }

      let _pages = pages
      for (const [i, part] of parts.entries()) {
        if (i === parts.length - 1) {
          _pages[part] = {
            component,
            ident: this.getIdent(parts),
            name: this.getName(parts),
            path: this.getPath(parts),
            priority: this.getPriority(parts),
          }
        } else {
          _pages[part] = _pages[part] ?? {
            children: {},
          }
        }

        _pages = _pages[part].children
      }
    }
    await this.addGuardsToPages(pages, guards)

    console.log('data parsed', pages)

    await this.renderTemplate(this.compiledTemplate, { pages: this._transform(pages), guards })
  }

  addGuardsToPages(pages, guards) {
    const filteredPages = ['$layout', '$404']
    console.log('guards', guards)
    guards.forEach((guard) => {
      Object.entries(pages).forEach(([pageKey, node]) => {
        if ('children' in node) {
          Object.entries(node.children).map(([key, page]) => {
            if (!filteredPages.includes(key) && page.name.includes(guard.name)) {
              page.beforeEnter = guard.ident
              console.log('page', page)
              delete pages[pageKey].children[guard.key]
            }
          })
        } else {
          if (!filteredPages.includes(pageKey) && node.name.includes(guard.name)) {
            node.beforeEnter = guard.ident
            console.log('guard', node)
            delete pages[guard.key]
          }
        }
      })
    })
  }

  _transform(pages) {
    const transformed = []

    const hoistLayouts = (node) => {
      let wasHoisted = false

      const [key, layout] = Object.entries(node).find(([ident]) => ident === '$layout') ?? []

      if (layout) {
        layout.children = node
        delete node[key]

        const _404 = Object.entries(node).find(([ident]) => ident === '$404')?.[1]
        const _index = Object.entries(node).find(([ident]) => ident === 'index')?.[1]

        if (!_index && _404) {
          layout.children.index = {
            ..._404,
            path: _404.path.replace(':pathMatch*', ''),
            priority: 0,
          }
        }

        transformed.push(layout)

        wasHoisted = true
      } else {
        // Do nothing...
      }

      for (const [key, subnode] of Object.entries(node)) {
        if (subnode.children) {
          if (hoistLayouts(subnode.children)) {
            delete node[key]
          }
        }
      }

      return wasHoisted
    }

    const flattenNested = (node) => {
      return Object.values(node.children ?? {}).flatMap((child) => {
        if (!child.component) {
          return flattenNested(child)
        } else {
          return child
        }
      })
    }

    hoistLayouts(pages)

    for (const layout of transformed) {
      layout.children = flattenNested(layout)
    }
    // console.log('transformed pages', transformed[0].children)
    return transformed
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
    if (parts.includes('$404')) return undefined

    return parts.join('/')
  }

  /**
   * @param {string[]} parts
   */
  getPath(parts) {
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
      } else if (part === '$layout') {
        priority += 0
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
   import plugins from './vueRouter/plugins'

  <%_ for (const guard of guards) { _%>
   import <%= guard.ident %> from '<%= guard.component %>'
  <%_ } _%>

  const _routes = [
    <%_ for (const page of pages) { _%>
    {
      path: '<%= page.path %>',
      component: () => import('<%= page.component %>'),
      children: [
      <%_ for (const child of Object.values(page.children).sort((a, b) => a.priority - b.priority)) { _%>
        {
          name: <%- child.name ? "'" + child.name + "'" : 'undefined' %>,
          path: '<%= child.path %>',
          component: () => import('<%= child.component %>'),
          <%- child.beforeEnter ?  "beforeEnter(to:any,from:any,next:any) {"  + child.beforeEnter +"(to, from, next)" + "}," : '' %>
        },
      <%_ } _%>
      ],
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
