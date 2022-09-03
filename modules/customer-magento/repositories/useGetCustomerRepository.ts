import Customer from '#ioc/graphql/queries/Customer'
import useMagento from '#ioc/composables/useMagento'
import ToCustomer from '#ioc/mappers/ToCustomer'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    customer: ReturnType<typeof ToCustomer> | null
  }> => {
    const { data } = await magento.graphql(Customer())

    return {
      customer: data.customer ? ToCustomer(data.customer) : null,
    }
  }
}
