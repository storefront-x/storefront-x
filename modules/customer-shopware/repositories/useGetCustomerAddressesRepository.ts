import useShopware from '#ioc/composables/useShopware'
import ToCustomerAddress from '#ioc/mappers/ToCustomerAddress'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    addresses: ReturnType<typeof ToCustomerAddress>[]
  }> => {
    const response = await shopware.post(`/account/list-address`)

    return {
      addresses: response.elements.map(ToCustomerAddress) ?? [],
    }
  }
}
