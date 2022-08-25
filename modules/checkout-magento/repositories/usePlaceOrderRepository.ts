import useMagento from '#ioc/composables/useMagento'
import PlaceOrder from '#ioc/graphql/mutations/PlaceOrder'

export default () => {
  const magento = useMagento()

  return async (cartId: string) => {
    const { data } = await magento.graphql(PlaceOrder().with({ cartId }))

    console.log(data)
  }
}
