import { routes } from '~/.sfx/pages'

export default async () => {
  const newRoutes = routes.slice(1, -1)

  const urls = []

  for (const route of newRoutes) {
    urls.push({ loc: route.readablePath })
  }

  return urls
}
