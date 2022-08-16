import useMagento from '#ioc/composables/useMagento'
import CmsPage from '#ioc/graphql/queries/CmsPage'
import useToCmsPage from '#ioc/mappers/useToCmsPage'
import fromBase64 from '#ioc/utils/string/fromBase64'

export default () => {
  const magento = useMagento()
  const toCmsPage = useToCmsPage()

  return async (
    id: string,
  ): Promise<{
    cmsPage: ReturnType<typeof toCmsPage>
  }> => {
    const { data } = await magento.graphql(CmsPage().with({ id: fromBase64(id) }))

    return {
      cmsPage: toCmsPage(data.cmsPage),
    }
  }
}
