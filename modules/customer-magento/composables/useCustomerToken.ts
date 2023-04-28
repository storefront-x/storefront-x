import useCookies from '#ioc/composables/useCookies'
import useCurrentLocale from '#ioc/composables/useCurrentLocale'

interface Options {
  path?: string
  expires?: Date | undefined
}

export default () => {
  const cookies = useCookies()
  const currentLocale = useCurrentLocale()

  const ident = `magento:${currentLocale.value.magentoStore}:customer:id`

  return {
    get: () => cookies.get(ident),
    set: (value: string, options: Options = {}) => cookies.set(ident, value, { path: '/', ...options }),
    remove: () => cookies.remove(ident),
  }
}
