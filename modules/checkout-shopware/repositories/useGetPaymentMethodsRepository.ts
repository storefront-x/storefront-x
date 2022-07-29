import useShopware from '#ioc/composables/useShopware'
import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'

export default () => {
  const shopware = useShopware()
  const toPaymentMethod = useToPaymentMethod()

  return async (): Promise<{
    paymentMethods: ReturnType<typeof toPaymentMethod>[]
  }> => {
    const response: any = await shopware.get('/payment-method')

    return {
      paymentMethods: response.elements.map(toPaymentMethod),
    }
  }
}
