import CustomerDownloadableProducts from '#ioc/graphql/queries/CustomerDownloadableProducts'
import useMagento from '#ioc/composables/useMagento'
import ToCustomerDownloadableProduct from '#ioc/mappers/ToCustomerDownloadableProduct'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    downloadableProducts: ReturnType<typeof ToCustomerDownloadableProduct>[]
  }> => {
    const { data } = await magento.graphql(CustomerDownloadableProducts())

    return {
      downloadableProducts: data?.customerDownloadableProducts?.items?.map(ToCustomerDownloadableProduct) ?? [],
    }
  }
}
