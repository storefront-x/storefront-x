import Customer from '#ioc/graphql/queries/Customer'
import useMagento from '#ioc/composables/useMagento'
import useToCustomer from '#ioc/mappers/useToCustomer'

export default () => {
  const magento = useMagento()
  const toCustomer = useToCustomer()

  return async (): Promise<{
    customer: ReturnType<typeof toCustomer> | null
  }> => {
    const { data } = await magento.graphql(Customer())

    return {
      customer: data.customer ? toCustomer(data.customer) : null,
    }
  }
}
