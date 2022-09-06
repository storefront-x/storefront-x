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
    console.log('use get crm rep', ToCmsPage(data.cmsBlocks.items[0]))
    return {
      cmsBlock: ToCmsPage(data.cmsBlocks.items[0]),
    }
  }
}
