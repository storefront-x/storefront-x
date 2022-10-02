import useMagento from '#ioc/composables/useMagento'
import EmailExists from '#ioc/graphql/queries/EmailExists'

export default () => {
  const magento = useMagento()

  return async (email: string) => {
    const { data } = await magento.graphql(EmailExists().with({ email }))

    return {
      emailAvailable: data?.isEmailAvailable?.is_email_available ?? false,
    }
  }
}
