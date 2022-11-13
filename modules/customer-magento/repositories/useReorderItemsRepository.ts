import useMagento from '#ioc/composables/useMagento'
import ReorderItems from '#ioc/graphql/mutations/ReorderItems'
import ToCart from '#ioc/mappers/ToCart'

export default () => {
  const magento = useMagento()

  return async (
    orderNumber: string,
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const { data } = await magento.graphql(
      ReorderItems().with({
        orderNumber,
      }),
    )
    console.log('repo reorderitems', data)
    return {
      cart: ToCart(data.reorderItems.cart),
    }
  }
}
