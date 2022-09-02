import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import VUE_I18N_ROUTE_PATHS from '#ioc/config/VUE_I18N_ROUTE_PATHS'

export default (routes: any) => {
  const newRoutes = []
  for (const route of routes) {
    for (const locale of VUE_I18N_LOCALES) {
      newRoutes.push({
        ...route,
        path: getPath(route.path, locale.prefix, locale.name),
        children: copyChildren(route.children, locale.name, locale.prefix),
      })
    }
  }
  return newRoutes
}

function copyChildren(children: any, name: string, prefix: string): any {
  const newChildren = []

  for (const child of children) {
    newChildren.push({
      ...child,
      name: getName(child.name, name, child.path),
      path: getPath(child.path, prefix, name),
      children: child.children ? copyChildren(child.children, name, prefix) : [],
    })
  }

  return newChildren
}

function getPath(path: string, prefix: string, name: string) {
  // @ts-ignore
  const route = VUE_I18N_ROUTE_PATHS[path.replace('/', '')]?.[name]

  if (route) {
    return '/' + route
  }

  if (prefix === '/') {
    return path
  }

  if (path === '') {
    return path
  }

  if (path.startsWith('/')) {
    return prefix + path
  }

  return prefix + '/' + path
}

function getName(name: string | undefined, localeName: string, path: string) {
  if (name === undefined && path === '/') return `__${localeName}`
  else if (name === undefined) return `all__${localeName}`

  const isIndexPage = name === 'index'
  const isIndexInFolder = name.endsWith('index')

  if (isIndexPage) {
    return `${name.replace('/', '')}__${localeName}`
  }

  if (isIndexInFolder) {
    return `${name.replace('index', '').replace('/', '')}__${localeName}`
  }

  return `${name}__${localeName}`
}
