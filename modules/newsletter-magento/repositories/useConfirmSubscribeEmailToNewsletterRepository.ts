import useMagento from '#ioc/composables/useMagento'
import ConfirmSubscribeEmailToNewsletter from '#ioc/graphql/mutations/ConfirmSubscribeEmailToNewsletter'

interface Options {
  id: string
  code: string
}

export default () => {
  const magento = useMagento()

  return async (
    options: Options,
  ): Promise<{
    status: string
  }> => {
    const {
      data: { confirmSubscribeEmailToNewsletter: response },
    } = await magento.graphql(ConfirmSubscribeEmailToNewsletter().with({ id: options.id, code: options.code }))

    return {
      status: response.status,
    }
  }
}
