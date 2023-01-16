import useCustomerMagentoStore from '#ioc/stores/useCustomerMagentoStore'

export default () => {
  const customerMagento = useCustomerMagentoStore()

  return (request: Request) => {
    const customerId = customerMagento.customerId

    if (customerId) {
      request.headers.set('Authorization', `Bearer ${customerId}`)
    }
  }
}
