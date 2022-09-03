import useShopware from '#ioc/composables/useShopware'
import ToPaymentMethod from '#ioc/mappers/ToPaymentMethod'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    paymentMethods: ReturnType<typeof ToPaymentMethod>[]
  }> => {
    const response: any = await shopware.get('/payment-method')

    return {
      paymentMethods: response.elements.map(ToPaymentMethod),
    }
  }
}
