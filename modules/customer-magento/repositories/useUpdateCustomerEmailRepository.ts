import UpdateCustomerEmail from '#ioc/graphql/mutations/UpdateCustomerEmail'
import useMagento from '#ioc/composables/useMagento'
import useToCustomer from '#ioc/mappers/useToCustomer'

export default () => {
  const magento = useMagento()
  const toCustomer = useToCustomer()

  return async (
    email: string,
    password: string,
  ): Promise<{
    customer: ReturnType<typeof toCustomer> | null
  }> => {
    const { data } = await magento.graphql(UpdateCustomerEmail().with({ email, password }))

    return {
      customer: data.updateCustomerEmail.customer ? toCustomer(data.updateCustomerEmail.customer) : null,
    }
  }
}
