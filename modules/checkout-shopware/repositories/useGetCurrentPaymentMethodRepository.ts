import useShopware from '#ioc/composables/useShopware'
import ToPaymentMethod from '#ioc/mappers/ToPaymentMethod'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    currentPaymentMethod: ReturnType<typeof ToPaymentMethod>
  }> => {
    const response: any = await shopware.get('/context')

    return {
      currentPaymentMethod: ToPaymentMethod(response.paymentMethod),
    }
  }
}
