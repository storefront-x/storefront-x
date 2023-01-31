import { routes } from '~/.sfx/pages'

export default async ({ store }: any) => {
  const storePrefix = store.prefix

  const urls = []

  for (const routeParent of routes) {
    for (const routeChild of routeParent.children) {
      if (routeChild.path === '/' || routeChild.path === '/:pathMatch*') {
        continue
      }

      const routePath = routeChild.path.replace('/', '')
      urls.push({ loc: storePrefix + routePath })
    }
  }

  return urls
}
