import isEmpty from '#ioc/utils/isEmpty'
import { routes } from '~/.sfx/pages'
import localeRoutes from '~/.sfx/sitemap/localeRoutes'

export default async ({ store }: any) => {
  const urls = []

  for (const routeParent of routes) {
    for (const routeChild of routeParent.children) {
      if (routeChild.path === '/' || routeChild.path === '/:pathMatch*') {
        continue
      }

      if (isEmpty(localeRoutes)) {
        urls.push({ loc: routeChild.path })
      } else {
        for (const localeRoute of Object.values(localeRoutes)) {
          const localePath = localeRoute(store.name, routeChild.path)
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
