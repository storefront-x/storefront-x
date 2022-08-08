import useShopware from '#ioc/composables/useShopware'

import useCustomerAddress from '#ioc/mappers/useToCustomerAddress'

export default () => {
  const shopware = useShopware()
  const toCustomerAddress = useCustomerAddress()

  return async (): Promise<{
    addresses: ReturnType<typeof toCustomerAddress>[]
  }> => {
    const response = await shopware.post(`/account/list-address`)

    return {
      addresses: response.elements.map(toCustomerAddress) ?? [],
    }
  }
}
