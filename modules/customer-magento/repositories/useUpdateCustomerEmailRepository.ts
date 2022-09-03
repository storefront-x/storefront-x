import UpdateCustomerEmail from '#ioc/graphql/mutations/UpdateCustomerEmail'
import useMagento from '#ioc/composables/useMagento'
import ToCustomer from '#ioc/mappers/ToCustomer'

export default () => {
  const magento = useMagento()

  return async (
    email: string,
    password: string,
  ): Promise<{
    customer: ReturnType<typeof ToCustomer> | null
  }> => {
    const { data } = await magento.graphql(UpdateCustomerEmail().with({ email, password }))

    return {
      customer: data.updateCustomerEmail.customer ? ToCustomer(data.updateCustomerEmail.customer) : null,
    }
  }
}
