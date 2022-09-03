import useShopware from '#ioc/composables/useShopware'
import ToCurrency from '#ioc/mappers/ToCurrency'

export default () => {
  const shopware = useShopware()

  return async (currency: ReturnType<typeof ToCurrency>) => {
    await shopware.patch('/context', {
      currencyId: currency.id,
    })
  }
}
