import useMagento from '#ioc/composables/useMagento'
import CatalogUrlSuffixes from '#ioc/graphql/queries/CatalogUrlSuffixes'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    productUrlSuffix: string
    categoryUrlSuffix: string
  }> => {
    const response = await magento.graphql(CatalogUrlSuffixes())

    const { data } = response

    return {
      productUrlSuffix: data.storeConfig.product_url_suffix ?? '',
      categoryUrlSuffix: data.storeConfig.category_url_suffix ?? '',
    }
  }
}
