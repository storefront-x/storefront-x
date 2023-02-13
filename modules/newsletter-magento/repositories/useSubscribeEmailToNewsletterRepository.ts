import useMagento from '#ioc/composables/useMagento'
import SubscribeEmailToNewsletter from '#ioc/graphql/mutations/SubscribeEmailToNewsletter'

export default () => {
  const magento = useMagento()

  return async (
    email: string,
  ): Promise<{
    status: string
  }> => {
    const {
      data: { subscribeEmailToNewsletter: response },
    } = await magento.graphql(SubscribeEmailToNewsletter().with({ email }))

    return {
      status: response.status,
    }
  }
}
