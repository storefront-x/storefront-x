import useCustomerMagentoStore from '#ioc/stores/useCustomerMagentoStore'

export default () => {
  const customerMagento = useCustomerMagentoStore()

  return (headers: Record<string, string>): Record<string, string> => {
    const customerId = customerMagento.customerId

    return {
      ...headers,
      ...(customerId && { Authorization: `Bearer ${customerId}` }),
    }
  }
}
