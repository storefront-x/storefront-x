import useMagento from '#ioc/composables/useMagento'
import SetBillingAddressOnCart from '#ioc/graphql/mutations/SetBillingAddressOnCart'
import useToCheckout from '#ioc/mappers/useToCheckout'

interface Options {
  sameAsShipping?: boolean
}

export default () => {
  const magento = useMagento()
  const toCheckout = useToCheckout()

  return async (cartId: string, address: any, options: Options = {}) => {
    const { data } = await magento.graphql(
      SetBillingAddressOnCart().with({
        cartId,
        address,
        sameAsShipping: options.sameAsShipping,
      }),
    )

    return {
      checkout: toCheckout(data.setBillingAddressOnCart.cart),
    }
  }
}
