import useMagento from '#ioc/composables/useMagento'
import EmailExists from '#ioc/graphql/queries/EmailExists'

export default () => {
  const magento = useMagento()

  return async (email: string) => {
    const { data } = await magento.graphql(EmailExists().with({ email }))
    console.log('use email', data)
    return {
      emailAvailable: data.is_email_available ?? false,
    }
  }
}
