import VUE_I18N_ROUTE_PATHS from '#ioc/config/VUE_I18N_ROUTE_PATHS'
import isEmpty from '#ioc/utils/isEmpty'

export default (localeCode: string, url: string) => {
  if (isEmpty(VUE_I18N_ROUTE_PATHS)) return null

  for (const [route, routes] of Object.entries(VUE_I18N_ROUTE_PATHS)) {
    if (route === url) {
      return routes[localeCode as keyof typeof routes]
    }
  }

  return null
}
