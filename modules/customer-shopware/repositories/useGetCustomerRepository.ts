import useShopware from '#ioc/composables/useShopware'
import useToCustomer from '#ioc/mappers/useToCustomer'

export default () => {
  const shopware = useShopware()
  const toCustomer = useToCustomer()

  return async (): Promise<{
    customer: ReturnType<typeof toCustomer> | null
  }> => {
    const response: any = await shopware.get('/context')

    return {
      customer: response.customer?.guest === false ? toCustomer(response.customer) : null,
    }
  }
}
