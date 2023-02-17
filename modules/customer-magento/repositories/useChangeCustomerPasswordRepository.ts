import ChangeCustomerPassword from '#ioc/graphql/mutations/ChangeCustomerPassword'
import useMagento from '#ioc/composables/useMagento'
import ToCustomer from '#ioc/mappers/ToCustomer'

export default () => {
  const magento = useMagento()

  return async (
    currentPassword: string,
    newPassword: string,
  ): Promise<{
    customer: ReturnType<typeof ToCustomer> | null
  }> => {
    const { data } = await magento.graphql(ChangeCustomerPassword().with({ currentPassword, newPassword }))

    return {
      customer: data.changeCustomerPassword ? ToCustomer(data.changeCustomerPassword) : null,
    }
  }
}
