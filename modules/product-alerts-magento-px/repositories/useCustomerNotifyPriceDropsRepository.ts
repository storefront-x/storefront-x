import CustomerNotifyPriceDrops from '#ioc/graphql/mutations/CustomerNotifyPriceDrops'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (productId: string) => {
    await magento.graphql(
      CustomerNotifyPriceDrops().with({
        productId,
      }),
    )
  }
}
