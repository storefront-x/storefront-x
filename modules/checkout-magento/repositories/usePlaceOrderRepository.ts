import useMagento from '#ioc/composables/useMagento'
import PlaceOrder from '#ioc/graphql/mutations/PlaceOrder'
import useToOrder from '#ioc/mappers/useToOrder'

export default () => {
  const magento = useMagento()
  const toOrder = useToOrder()

  return async (cartId: string) => {
    const { data } = await magento.graphql(PlaceOrder().with({ cartId }))

    return {
      order: toOrder(data.placeOrder.order),
    }
  }
}
