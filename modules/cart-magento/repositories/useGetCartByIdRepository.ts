import useMagento from '#ioc/composables/useMagento'
import GetCart from '#ioc/graphql/queries/GetCart'
import ToCart from '#ioc/mappers/ToCart'

export default () => {
  const magento = useMagento()

  return async (
    id: string,
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const { data } = await magento.graphql(GetCart().with({ cartId: id }))

    if (!data.cart) {
      throw new Error('No cart with ID ' + id)
    }

    return {
      cart: ToCart(data.cart),
    }
  }
}
