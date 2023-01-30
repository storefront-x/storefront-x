import useCurrentLocale from '#ioc/composables/useCurrentLocale'

export default () => {
  const currentLocale = useCurrentLocale()

  const ident = `magento:${currentLocale.value.magentoStore}:cart:id`

  return {
    get: () => localStorage.getItem(ident),
    set: (value: string) => localStorage.setItem(ident, value),
    remove: () => localStorage.removeItem(ident),
  }
}
