import { routes } from '~/.sfx/pages'

export default async () => {
  const urls = []

  for (const routeParent of routes) {
    for (const routeChild of routeParent.children) {
      if (routeChild.path === '/' || routeChild.path === '/:pathMatch*') {
        continue
      }

      urls.push({ loc: routeChild.path })
    }
  }

  return urls
}
