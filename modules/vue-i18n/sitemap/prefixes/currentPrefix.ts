import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import isEmpty from '#ioc/utils/isEmpty'

export default (url: string) => {
  if (isEmpty(VUE_I18N_LOCALES)) return null

  const codes = VUE_I18N_LOCALES.map((configItem: any) => configItem.name)

  const store = VUE_I18N_LOCALES[getIndexOfCodeFromUrl(url.replace(/^\//, ''), codes)]

  return {
    name: store.name,
    prefix: store.prefix,
    storeCode: store.magentoStore ?? '',
  }
}

const getIndexOfCodeFromUrl = (url: string, matches: any) => {
  for (const [i, match] of matches.entries()) {
    if (url.startsWith(match)) return i
  }

  return 0
}
