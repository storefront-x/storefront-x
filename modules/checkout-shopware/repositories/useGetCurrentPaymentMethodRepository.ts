import useShopware from '#ioc/composables/useShopware'
import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'

export default () => {
  const shopware = useShopware()
  const toPaymentMethod = useToPaymentMethod()

  return async (): Promise<{
    currentPaymentMethod: ReturnType<typeof toPaymentMethod>
  }> => {
    const response: any = await shopware.get('/context')

    return {
      currentPaymentMethod: toPaymentMethod(response.paymentMethod),
    }
  }
}
