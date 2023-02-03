import useCookies from '#ioc/composables/useCookies'
import useCurrentLocale from '#ioc/composables/useCurrentLocale'

export default () => {
  const cookies = useCookies()
  const currentLocale = useCurrentLocale()

  const ident = `magento:${currentLocale.value.magentoStore}:customer:id`

  return {
    get: () => cookies.get(ident),
    set: (value: string) => cookies.set(ident, value),
    remove: () => cookies.remove(ident),
  }
}
