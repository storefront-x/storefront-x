import useCurrentLocale from '#ioc/composables/useCurrentLocale'

export default () => {
  const currentLocale = useCurrentLocale()

  return `magento:${currentLocale.value.magentoStore}:cart:id`
}
