import useMagento from '#ioc/composables/useMagento'
import NewsletterError from '#ioc/errors/NewsletterError'
import SubscribeEmailToNewsletter from '#ioc/graphql/mutations/SubscribeEmailToNewsletter'

export default () => {
  const magento = useMagento()

  return async (
    email: string,
  ): Promise<{
    status: string
  }> => {
    try {
      const {
        data: { subscribeEmailToNewsletter: response },
      } = await magento.graphql(SubscribeEmailToNewsletter().with({ email }))

      return {
        status: response.status,
      }
    } catch (e: any) {
      throw new NewsletterError(e.message)
    }
  }
}
