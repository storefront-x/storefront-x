import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import VUE_I18N_ROUTE_PATHS from '#ioc/config/VUE_I18N_ROUTE_PATHS'

export default (routes: any) => {
  const newRoutes = []

  for (const route of routes) {
    for (const locale of VUE_I18N_LOCALES) {
      newRoutes.push(processRoute(route, locale))
    }
  }

  return newRoutes
}

const processRoute = (route: any, locale: any) => {
  return {
    ...route,
    name: getName(route, locale),
    path: getPath(route, locale),
    children: getChildren(route, locale),
  }
}

const getName = (route: any, locale: any) => {
  if (route.name === undefined) {
    return undefined
  }

  const isIndexPage = route.name === 'index'
  const isIndexInFolder = route.name.endsWith('index')

  if (isIndexPage) {
    return `${route.name.replace('/', '')}__${locale.name}`
  }

  if (isIndexInFolder) {
    return `${route.name.replace('index', '').replace('/', '')}__${locale.name}`
  }

  return `${route.name}__${locale.name}`
}

const getPath = (route: any, locale: any) => {
  const path = (VUE_I18N_ROUTE_PATHS as any)[route.path]?.[locale.name] ?? route.path

  if (locale.prefix === '/') {
    return path
  } else {
    return locale.prefix + path
  }
}

const getChildren = (route: any, locale: any): any => {
  const newChildren = []

  for (const child of route.children ?? []) {
    newChildren.push({
      ...child,
      name: getName(child, locale),
      path: getPath(child, locale),
      children: getChildren(child, locale),
    })
  }

  return newChildren
}
