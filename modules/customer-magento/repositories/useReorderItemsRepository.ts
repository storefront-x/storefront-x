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

    if (data?.reorderItems?.userInputErrors?.length > 0) {
      throw new Error(data.reorderItems.userInputErrors[0].message)
    }

    return {
      cart: ToCart(data.reorderItems.cart),
    }
  }
}
