import useMagento from '#ioc/composables/useMagento'
import CmsPage from '#ioc/graphql/queries/CmsPage'
import ToCmsPage from '#ioc/mappers/ToCmsPage'
import fromBase64 from '#ioc/utils/string/fromBase64'

export default () => {
  const magento = useMagento()

  return async (
    id: string,
  ): Promise<{
    cmsPage: ReturnType<typeof ToCmsPage>
  }> => {
    const { data } = await magento.graphql(CmsPage().with({ id: fromBase64(id) }))

    return {
      cmsPage: ToCmsPage(data.cmsPage),
    }
  }
}
