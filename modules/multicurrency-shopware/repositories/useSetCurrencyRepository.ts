import useShopware from '#ioc/composables/useShopware'
import useToCurrency from '#ioc/mappers/useToCurrency'

export default () => {
  const shopware = useShopware()
  const toCurrency = useToCurrency()

  return async (currency: ReturnType<typeof toCurrency>) => {
    await shopware.patch('/context', {
      currencyId: currency.id,
    })
  }
}
