import useGetCustomerDownloadableProducts from '#ioc/repositories/useGetCustomerDownloadableProducts'

export default () => {
  const getCustomerDownloadableProducts = useGetCustomerDownloadableProducts()

  return async (...args: Parameters<typeof getCustomerDownloadableProducts>) => {
    return await getCustomerDownloadableProducts(...args)
  }
}
