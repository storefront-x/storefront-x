import isEmpty from '#ioc/utils/isEmpty'
import { routes } from '~/.sfx/pages'
import transformators from '~/.sfx/sitemap/transformators'

export default async (_: string, name: string) => {
  const urls = []

  for (const routeParent of routes) {
    for (const routeChild of routeParent.children) {
      if (routeChild.path === '/' || routeChild.path === '/:pathMatch*') {
        continue
      }

      if (isEmpty(transformators)) {
        urls.push({ loc: routeChild.path })
      } else {
        for (const transformator of Object.values(transformators)) {
          const localePath = transformator(name, routeChild.path)
          if (localePath) {
            urls.push({ loc: localePath })
          } else {
            urls.push({ loc: routeChild.path })
          }
        }
      }
    }
  }

  return urls
}
