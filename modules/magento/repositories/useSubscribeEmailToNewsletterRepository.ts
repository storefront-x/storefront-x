import useMagento from '#ioc/composables/useMagento'
import GraphQLError from "#ioc/errors/GraphQLError"
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
      throw new GraphQLError({ message: e.message })
    }
  }
}
