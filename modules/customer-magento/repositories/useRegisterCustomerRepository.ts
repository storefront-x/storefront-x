import CreateCustomer from '#ioc/graphql/mutations/CreateCustomer'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (
    data: any,
  ): Promise<{
    email: string
  }> => {
    const { createCustomer: response } = await magento.graphql(CreateCustomer().with(data))

    return {
      email: response?.customer?.email ?? '',
    }
  }
}
