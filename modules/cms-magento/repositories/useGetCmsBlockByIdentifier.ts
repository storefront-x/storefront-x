import useMagento from '#ioc/composables/useMagento'
import CmsBlock from '#ioc/graphql/queries/CmsBlock'
import ToCmsPage from '#ioc/mappers/ToCmsPage'

export default () => {
  const magento = useMagento()

  return async (
    identifiers: string | string[],
  ): Promise<{
    cmsBlock: ReturnType<typeof ToCmsPage>
  }> => {
    const { data } = await magento.graphql(CmsBlock().with({ identifiers }))

    return {
      cmsBlock: ToCmsPage(data.cmsBlocks.items[0]),
    }
  }
}
