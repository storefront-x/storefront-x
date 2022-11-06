import useMagento from '#ioc/composables/useMagento'
import ToCheckout from '#ioc/mappers/ToCheckout'
import SetGuestEmailOnCart from '#ioc/graphql/mutations/SetGuestEmailOnCart'

export default () => {
  const magento = useMagento()

  return async (cartId: string, email: string) => {
    const { data } = await magento.graphql(SetGuestEmailOnCart().with({ cartId, email }))

    return {
      checkout: ToCheckout(data.setGuestEmailOnCart.cart),
    }
  }
}
