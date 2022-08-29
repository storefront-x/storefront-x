import useMagento from '#ioc/composables/useMagento'
import SubscribeEmailToNewsletter from '#ioc/graphql/mutations/SubscribeEmailToNewsletter'

export default () => {
  const magento = useMagento()

  return async (
    email: string,
  ): Promise<{
    ok: boolean
    statusText: string
  }> => {
    try {
      const { subscribeEmailToNewsletter: response } = await magento.graphql(
        SubscribeEmailToNewsletter().with({ email }),
      )

      return {
        ok: true,
        statusText: response.statusText,
      }
    } catch (e: any) {
      return {
        ok: false,
        statusText: e.message,
      }
    }
  }
}
