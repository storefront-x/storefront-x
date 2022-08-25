import UpdateCustomer from '#ioc/graphql/mutations/UpdateCustomer'
import useMagento from '#ioc/composables/useMagento'
import useToCustomer from '#ioc/mappers/useToCustomer'

export default () => {
  const magento = useMagento()
  const toCustomer = useToCustomer()

  return async (
    input: any,
  ): Promise<{
    customer: ReturnType<typeof toCustomer> | null
  }> => {
    const { data } = await magento.graphql(UpdateCustomer().with({ input }))

    return {
      customer: data.updateCustomer.customer ? toCustomer(data.updateCustomer.customer) : null,
    }
  }
}
