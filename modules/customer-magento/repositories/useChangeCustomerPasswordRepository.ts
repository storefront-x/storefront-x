import ChangeCustomerPassword from '#ioc/graphql/mutations/ChangeCustomerPassword'
import useMagento from '#ioc/composables/useMagento'
import useToCustomer from '#ioc/mappers/useToCustomer'

export default () => {
  const magento = useMagento()
  const toCustomer = useToCustomer()

  return async (
    currentPassword: string,
    newPassword: string,
  ): Promise<{
    customer: ReturnType<typeof toCustomer> | null
  }> => {
    const { data } = await magento.graphql(ChangeCustomerPassword().with({ currentPassword, newPassword }))

    return {
      customer: data.changeCustomerPassword.customer ? toCustomer(data.changeCustomerPassword.customer) : null,
    }
  }
}
