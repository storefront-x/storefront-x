import useMagento from '#ioc/composables/useMagento'
import GetCheckout from '#ioc/graphql/queries/GetCheckout'
import ToCheckout from '#ioc/mappers/ToCheckout'

export default () => {
  const magento = useMagento()

  return async (cartId: string) => {
    const { data } = await magento.graphql(GetCheckout().with({ cartId }))

    return {
      checkout: ToCheckout(data.cart),
    }
  }
}
