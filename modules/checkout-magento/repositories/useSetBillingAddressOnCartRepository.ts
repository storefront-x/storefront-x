import useMagento from '#ioc/composables/useMagento'
import SetBillingAddressOnCart from '#ioc/graphql/mutations/SetBillingAddressOnCart'
import ToCheckout from '#ioc/mappers/ToCheckout'

interface Options {
  sameAsShipping?: boolean
}

export default () => {
  const magento = useMagento()

  return async (cartId: string, address: any, options: Options = {}) => {
    const { data } = await magento.graphql(
      SetBillingAddressOnCart().with({
        cartId,
        address,
        sameAsShipping: options.sameAsShipping,
      }),
    )

    return {
      checkout: ToCheckout(data.setBillingAddressOnCart.cart),
    }
  }
}
