import isEmpty from '#ioc/utils/isEmpty'
import { routes } from '~/.sfx/pages'
import transformators from '~/.sfx/sitemap/transformators'

export default async (_: string, name: string) => {
  const newRoutes = routes.slice(0, -1)

  const urls = []

  for (const route of newRoutes) {
    if (route.name === 'index') continue

    if (isEmpty(transformators)) {
      urls.push({ loc: route.readablePath })
    } else {
      for (const transformator of Object.values(transformators)) {
        const localePath = transformator(name, route.readablePath)

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
