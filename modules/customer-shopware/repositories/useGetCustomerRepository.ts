import useShopware from '#ioc/composables/useShopware'
import ToCustomer from '#ioc/mappers/ToCustomer'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    customer: ReturnType<typeof ToCustomer> | null
  }> => {
    const response: any = await shopware.get('/context')

    return {
      customer: response.customer?.guest === false ? ToCustomer(response.customer) : null,
    }
  }
}
