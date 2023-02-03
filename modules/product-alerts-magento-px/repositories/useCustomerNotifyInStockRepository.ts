import CustomerNotifyInStock from '#ioc/graphql/mutations/CustomerNotifyInStock'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (productId: string) => {
    await magento.graphql(
      CustomerNotifyInStock().with({
        productId,
      }),
    )
  }
}
