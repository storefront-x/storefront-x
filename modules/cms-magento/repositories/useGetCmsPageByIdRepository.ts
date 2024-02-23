import useMagento from '#ioc/composables/useMagento'
import CmsPage from '#ioc/graphql/queries/CmsPage'
import ToCmsPage from '#ioc/mappers/ToCmsPage'

export default () => {
  const magento = useMagento()

  return async (
    identifier: string,
  ): Promise<{
    cmsPage: ReturnType<typeof ToCmsPage>
  }> => {
    const { data } = await magento.graphql(CmsPage().with({ identifier }))

    return {
      cmsPage: ToCmsPage(data.cmsPage),
    }
  }
}
