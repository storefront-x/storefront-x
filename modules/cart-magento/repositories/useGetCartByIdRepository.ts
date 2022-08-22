import useMagento from '#ioc/composables/useMagento'
import GetCart from '#ioc/graphql/queries/GetCart'
import useToCart from '#ioc/mappers/useToCart'

export default () => {
  const magento = useMagento()
  const toCart = useToCart()

  return async (
    id: string,
  ): Promise<{
    cart: ReturnType<typeof toCart>
  }> => {
    const { data } = await magento.graphql(GetCart().with({ cartId: id }))

    return {
      cart: toCart(data.cart),
    }
  }
}
