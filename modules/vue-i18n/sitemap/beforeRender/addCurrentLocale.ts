import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import Options from '#ioc/types/sitemap/Options'
import isEmpty from '#ioc/utils/isEmpty'

export default (options: Options) => {
  if (isEmpty(VUE_I18N_LOCALES)) return null

  const codes = VUE_I18N_LOCALES.map((configItem: any) => configItem.name)

  const locale = VUE_I18N_LOCALES[getIndexOfCodeFromUrl(options.path.replace(/^\//, ''), codes)]

  options.locale = locale
  options.prefix = locale.prefix
}

const getIndexOfCodeFromUrl = (url: string, matches: any) => {
  for (const [i, match] of matches.entries()) {
    if (url.startsWith(match)) return i
  }

  return 0
}
