import NotifyInStock from '#ioc/graphql/mutations/productAlerts/NotifyInStock'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (productId: string) => {
    await magento.graphql(
      NotifyInStock().with({
        productId,
      }),
    )
  }
}
