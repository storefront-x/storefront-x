import useMagento from '#ioc/composables/useMagento'
import useToCheckout from '#ioc/mappers/useToCheckout'
import SetGuestEmailOnCart from '../graphql/mutations/SetGuestEmailOnCart'

export default () => {
  const magento = useMagento()
  const toCheckout = useToCheckout()

  return async (cartId: string, email: string) => {
    const { data } = await magento.graphql(SetGuestEmailOnCart().with({ cartId, email }))

    return {
      checkout: toCheckout(data.setGuestEmailOnCart.cart),
    }
  }
}
