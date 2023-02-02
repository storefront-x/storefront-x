import isEmpty from '#ioc/utils/isEmpty'
import { routes } from '~/.sfx/pages'
import localeRoutes from '~/.sfx/sitemap/localeRoutes'

export default async ({ store }: any) => {
  const newRoutes = routes.slice(0, -1)

  const urls = []

  for (const route of newRoutes) {
    if (route.name === 'index') continue

    if (isEmpty(localeRoutes)) {
      urls.push({ loc: route.readablePath })
    } else {
      for (const localeRoute of Object.values(localeRoutes)) {
        const localePath = localeRoute(store.name, route.readablePath)

        if (localePath) {
          urls.push({ loc: localePath })
        } else {
          urls.push({ loc: route.readablePath })
        }
      }
    }
  }

  return urls
}
