import useMagento from '#ioc/composables/useMagento'
import UrlResolver from '#ioc/graphql/queries/UrlResolver'

export default () => {
  const magento = useMagento()

  return async (
    url: string,
  ): Promise<{
    id: string
    type: any
    relativeUrl: string
    redirectCode: number
  }> => {
    const { data } = await magento.graphql(UrlResolver().with({ url }))

    return {
      id: data.urlResolver.entity_uid ?? String(data.urlResolver.id),
      type: data.urlResolver.type,
      relativeUrl: data.urlResolver.relative_url,
      redirectCode: data.urlResolver.redirectCode,
    }
  }
}
