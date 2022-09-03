import UpdateCustomer from '#ioc/graphql/mutations/UpdateCustomer'
import useMagento from '#ioc/composables/useMagento'
import ToCustomer from '#ioc/mappers/ToCustomer'

export default () => {
  const magento = useMagento()

  return async (
    input: any,
  ): Promise<{
    customer: ReturnType<typeof ToCustomer> | null
  }> => {
    const { data } = await magento.graphql(UpdateCustomer().with({ input }))

    return {
      customer: data.updateCustomer.customer ? ToCustomer(data.updateCustomer.customer) : null,
    }
  }
}
