import useMagento from '#ioc/composables/useMagento'
import SubscribeEmailToNewsletter from '#ioc/graphql/mutations/SubscribeEmailToNewsletter'

export default () => {
  const magento = useMagento()

  return async (
    email: string,
  ): Promise<{
    status?: string
    _error?: string
  }> => {
    try {
      const { subscribeEmailToNewsletter: response } = await magento.graphql(
        SubscribeEmailToNewsletter().with({ email }),
      )

      return {
        status: response?.status,
      }
    } catch (e) {
      console.warn(e)
      return {
        _error: e as string,
      }
    }
  }
}
