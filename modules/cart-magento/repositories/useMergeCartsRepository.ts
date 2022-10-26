import useMagento from '#ioc/composables/useMagento'
import ToCart from '#ioc/mappers/ToCart'
import MergeCarts from '#ioc/graphql/mutations/MergeCarts'

export default () => {
  const magento = useMagento()

  return async (
    sourceCartId: string,
    destinationCartId: string,
  ): Promise<{
    cart: ReturnType<typeof ToCart>
  }> => {
    const { data } = await magento.graphql(MergeCarts().with({ source: sourceCartId, destination: destinationCartId }))
    return {
      cart: ToCart(data.mergeCarts),
    }
  }
}
