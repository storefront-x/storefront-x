import useMagento from '#ioc/composables/useMagento'
import CmsBlog from '#ioc/graphql/queries/CmsBlog'
import ToCmsPage from '#ioc/mappers/ToCmsPage'

export default () => {
  const magento = useMagento()

  return async (
    identifiers: string[],
  ): Promise<{
    cmsPage: ReturnType<typeof ToCmsPage>
  }> => {
    const { data } = await magento.graphql(CmsBlog().with(identifiers))

    return {
      cmsPage: ToCmsPage(data.cmsPage),
    }
  }
}
