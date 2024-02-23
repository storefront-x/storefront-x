import useMagento from '#ioc/composables/useMagento'
import UrlResolver from '#ioc/graphql/queries/UrlResolver'

export default () => {
  const magento = useMagento()

  return async (
    url: string,
  ): Promise<{
    entityUid: string
    /**@deprecated */
    id: string
    type: any
    relativeUrl: string
    redirectCode: number
  }> => {
    const { data } = await magento.graphql(UrlResolver().with({ url }))

    return data.route
  }
}
