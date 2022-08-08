import Customer from '#ioc/graphql/queries/Customer'
import useMagento from '#ioc/composables/useMagento'
import useToCustomer from '#ioc/mappers/useToCustomer'

export default () => {
  const magento = useMagento()
  const toCustomer = useToCustomer()

  return async (): Promise<{
    customer: ReturnType<typeof toCustomer>
  }> => {
    try {
      const { customer: response } = await magento.graphql(Customer())

      return {
        customer: response?.map(toCustomer) ?? [],
      }
    } catch (e) {
      console.error(e)

      return {
        customer: toCustomer([]),
      }
    }
  }
}
