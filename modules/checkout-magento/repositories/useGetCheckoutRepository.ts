import useMagento from '#ioc/composables/useMagento'
import GetCheckout from '#ioc/graphql/queries/GetCheckout'
import useToCheckout from '#ioc/mappers/useToCheckout'

export default () => {
  const magento = useMagento()
  const toCheckout = useToCheckout()

  return async (cartId: string) => {
    const { data } = await magento.graphql(GetCheckout().with({ cartId }))

    return {
      checkout: toCheckout(data),
    }
  }
}
