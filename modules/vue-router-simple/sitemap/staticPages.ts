import { routes } from '~/.sfx/pages'

export default async ({ store }: any) => {
  const newRoutes = routes.slice(1, -1)
  const storePrefix = store.prefix

  const urls = []

  for (const route of newRoutes) {
    const routePath = route.readablePath.replace('/', '')
    urls.push({ loc: storePrefix + routePath })
  }

  return urls
}
