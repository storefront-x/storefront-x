import useMagento from '#ioc/composables/useMagento'
import ResetCustomerPassword from '../graphql/mutations/ResetCustomerPassword'

export default () => {
  const magento = useMagento()

  return async (
    email: string,
    newPassword: string,
    resetPasswordToken: string,
  ): Promise<{
    success: boolean
  }> => {
    const { data } = await magento.graphql(ResetCustomerPassword().with({ email, newPassword, resetPasswordToken }))

    return {
      success: data.resetPassword,
    }
  }
}
