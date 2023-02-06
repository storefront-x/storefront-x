import Options from '#ioc/types/sitemap/Options'
import { routes } from '~/.sfx/pages'

export default async (options: Options) => {
  const newRoutes = routes.slice(0, -1)

  const urls = []

  for (const route of newRoutes) {
    if (route.name === 'index') continue

    urls.push({ loc: route.readablePath })
  }

  return urls
}
