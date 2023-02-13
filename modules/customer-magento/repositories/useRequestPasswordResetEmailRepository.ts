import useMagento from '#ioc/composables/useMagento'
import RequestPasswordResetEmail from '#ioc/graphql/mutations/RequestPasswordResetEmail'

export default () => {
  const magento = useMagento()

  return async (
    email: string,
  ): Promise<{
    success: boolean
  }> => {
    const { data } = await magento.graphql(RequestPasswordResetEmail().with({ email }))

    return {
      success: data.requestPasswordResetEmail,
    }
  }
}
