import CustomerDownloadableProducts from '#ioc/graphql/queries/CustomerDownloadableProducts'
import useMagento from '#ioc/composables/useMagento'
import useToCustomerDownloadableProduct from '#ioc/mappers/useToCustomerDownloadableProduct'

export default () => {
  const magento = useMagento()
  const toCustomerDownloadableProduct = useToCustomerDownloadableProduct()

  return async (): Promise<{
    downloadableProducts: ReturnType<typeof toCustomerDownloadableProduct>[]
  }> => {
    const { data } = await magento.graphql(CustomerDownloadableProducts())

    return {
      downloadableProducts: data?.customerDownloadableProducts?.items?.map(toCustomerDownloadableProduct) ?? [],
    }
  }
}
