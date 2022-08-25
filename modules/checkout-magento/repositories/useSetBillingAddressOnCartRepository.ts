import useMagento from '#ioc/composables/useMagento'
import SetBillingAddressOnCart from '#ioc/graphql/mutations/SetBillingAddressOnCart'
import useToCheckout from '#ioc/mappers/useToCheckout'

export default () => {
  const magento = useMagento()
  const toCheckout = useToCheckout()

  return async (cartId: string, address: any) => {
    const { data } = await magento.graphql(
      SetBillingAddressOnCart().with({
        cartId,
        address,
        sameAsShipping: true,
      }),
    )

    return {
      checkout: toCheckout(data.setBillingAddressOnCart.cart),
    }
  }
}
