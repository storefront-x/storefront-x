import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import VUE_I18N_ROUTE_PATHS from '#ioc/config/VUE_I18N_ROUTE_PATHS'

export default (routes: any) => {
  return routes.map((route: any) => processRoute(route))
}

const processRoute = (route: any) => {
  return {
    ...route,
    alias: getAlias(route),
    children: getChildren(route),
  }
}

const getAlias = (route: any) => {
  const aliases = []
  for (const locale of VUE_I18N_LOCALES) {
    const aliasLocale = (VUE_I18N_ROUTE_PATHS as any)[route.path]?.[locale.name] ?? null
    const aliasPrefix = locale.prefix === '/' ? null : locale.prefix
    if (aliasLocale && aliasPrefix) {
      aliases.push(`${aliasPrefix}${aliasLocale}`)
    } else if (aliasLocale) {
      aliases.push(`${aliasLocale}`)
    } else if (aliasPrefix) {
      aliases.push(`${aliasPrefix}${route.path}`)
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
