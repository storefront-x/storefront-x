import NotifyPriceDrops from '#ioc/graphql/mutations/productAlerts/NotifyPriceDrops'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (productId: string) => {
    await magento.graphql(
      NotifyPriceDrops().with({
        productId,
      }),
    )
  }
}
