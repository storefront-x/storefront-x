import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import VUE_I18N_ROUTE_PATHS from '#ioc/config/VUE_I18N_ROUTE_PATHS'

export default (routes: any) => {
  return routes.map((route: any) => ({
    ...route,
    alias: getAlias(route),
    children: getChildren(route),
  }))
}

const getAlias = (route: any) => {
  const aliases = []
  const isDynamicRoute = route.name && route.name.includes('[')
  const aliasLocaleKey = isDynamicRoute ? `/${route.name}` : route.path
  for (const locale of VUE_I18N_LOCALES) {
    const aliasLocale =
      (VUE_I18N_ROUTE_PATHS as any)[aliasLocaleKey]?.[locale.name]?.replace(
        /\[(.+?)\]/g,
        (_: string, $1: string) => `:${$1}(.+)`,
      ) ?? null
    const aliasPrefix = locale.prefix === '/' ? null : locale.prefix
    const sanitizedRoutePath = route.path
      .toString()
      .split('/^\\/')[1]
      .split('\\/?$/')[0]
      .replace('\\', '')
      .replace('', '/')
    if (aliasLocale && aliasPrefix) {
      aliases.push(createRegExp(`${aliasPrefix}${aliasLocale}`))
    } else if (aliasLocale) {
      aliases.push(createRegExp(`${aliasLocale}`))
    } else if (aliasPrefix) {
      aliases.push(createRegExp(`${aliasPrefix}${sanitizedRoutePath}`))
    }
  }
  return aliases
}
const getChildren = (route: any): any => {
  const newChildren = []

  for (const child of route.children ?? []) {
    newChildren.push({
      ...child,
      alias: getAlias(child),
      children: getChildren(child),
    })
  }

  return newChildren
}

const createRegExp = (string: string) => {
  return new RegExp(`^${string}?$`)
}
