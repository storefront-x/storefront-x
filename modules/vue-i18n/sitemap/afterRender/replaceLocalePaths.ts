import VUE_I18N_ROUTE_PATHS from '#ioc/config/VUE_I18N_ROUTE_PATHS'
import Options from '#ioc/types/sitemap/Options'

export default (options: Options, sitemap: string) => {
  const regexp = new RegExp(`${options.host}${options.prefix}(.+?)</loc>`, 'g')

  return sitemap.replaceAll(regexp, (match, $1) => {
    const routePaths = (VUE_I18N_ROUTE_PATHS as any)[$1]

    if (routePaths) {
      return `${options.host}${options.prefix}${routePaths[options.locale!.name]}</loc>`
    } else {
      return match
    }
  })
}
