import useMagento from '#ioc/composables/useMagento'
import PlaceOrder from '#ioc/graphql/mutations/PlaceOrder'
import ToOrder from '#ioc/mappers/ToOrder'

export default () => {
  const magento = useMagento()

  return async (cartId: string) => {
    const { data } = await magento.graphql(PlaceOrder().with({ cartId }))

    return {
      order: ToOrder(data.placeOrder.order),
    }
  }
}
