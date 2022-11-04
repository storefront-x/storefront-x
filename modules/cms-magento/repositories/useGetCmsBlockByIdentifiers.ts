import useMagento from '#ioc/composables/useMagento'
import CmsBlock from '#ioc/graphql/queries/CmsBlock'
import ToCmsPage from '#ioc/mappers/ToCmsPage'

export default () => {
  const magento = useMagento()

  return async (
    identifier: string,
  ): Promise<{
    cmsBlock: ReturnType<typeof ToCmsPage>
  }> => {
    const identifiers = []
    identifiers.push(identifier)
    const { data } = await magento.graphql(CmsBlock().with({ identifiers }))

    return {
      cmsBlock: ToCmsPage(data.cmsBlocks.items[0]),
    }
  }
}
