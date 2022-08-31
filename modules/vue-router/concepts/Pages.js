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
    const pages = {}
    let guards = []
    // const names = await this.getFiles(this.src('pages'))
    // console.log('test names', names)
    // console.log('all files', files)
    for (const { module, file } of Object.values(files)) {
      const parsed = path.parse(file)
      // parsed format in node js parse
      // {
      //   root: '/',
      //   dir: '/users/admin/website',
      //   base: 'index.html',
      //   ext: '.html',
      //   name: 'index'
      // }

      const parts = [...parsed.dir.replace(/\\/g, '/').split('/').filter(Boolean), parsed.name]
      const component = this.getPathForFile(module, file)
      // console.log('modules', file, parsed.name)
      // console.log('parts entries', parts)

      if (parsed.name.includes('beforeEnter')) {
        const guardName = parsed.name.split('.')[0]
        guards.push(guardName)
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
    // Object.entries(pages).map(([key, node]) => {
    //   const filteredPages = ['$layout', '$404']
    //   if ('children' in node) {
    //     Object.entries(node.children).map(([key, page]) => {
    //       if (!filteredPages.includes(key)) {
    //         console.log('page page', page)
    //       }
    //     })
    //   } else {
    //     if (!filteredPages.includes(key)) {
    //       console.log('node node', node)
    //     }
    //   }
    // })
    // console.log('pages before transform xx', pages)
    // console.log(guards)
    console.log('guards test', guards)
    await this.addGuards(pages, guards)
    await this.renderTemplate(this.compiledTemplate, { pages: this._transform(pages) })
  }

  checkIf

  addGuards(pages = {}, guards = []) {
    const filteredPages = ['$layout', '$404']
    // let pagesWithGuards = []
    guards.forEach((guard) => {
      let pagesWithGuards = Object.entries(pages).map(([key, node]) => {
        if ('children' in node) {
          return Object.entries(node.children).map(([key, page]) => {
            if (!filteredPages.includes(key) && page.name.includes(guard)) {
              console.log('page page', page, guard)
              page.beforeEnter = guard
              return page
            }
            return page
          })
        } else {
          if (!filteredPages.includes(key) && node.name.includes(guard)) {
            console.log('node node', node, guard)
            node.beforeEnter = guard
            return node
          }
          return node
        }
      })
      console.log('pages with guards', pagesWithGuards)
      // return pages.map((page) => {
      //   if (page.name.includes(guardName)) {
      //     page.beforeEnter = guardName
      //   }
      // })
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
        beforeEnter: <%- child.beforeEnter ? "'" + child.beforeEnter + "'" : 'undefined' %>,
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
