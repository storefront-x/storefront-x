import useMagento from '#ioc/composables/useMagento'
import CustomerCart from '#ioc/graphql/queries/CustomerCart'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    id: string
  }> => {
    const { data } = await magento.graphql(CustomerCart())

    return {
      id: data.customerCart.id,
    }
  }
}
