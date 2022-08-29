import ProductReviewMeta from '#ioc/graphql/queries/ProductReviewMeta'
import useMagento from '#ioc/composables/useMagento'
import useToProductReviewMeta from '#ioc/mappers/useToProductReviewMeta'

export default () => {
  const magento = useMagento()
  const toProductReviewMeta = useToProductReviewMeta()

  return async (): Promise<{
    productReviewMeta: ReturnType<typeof toProductReviewMeta>[]
  }> => {
    const { data } = await magento.graphql(ProductReviewMeta())

    return {
      productReviewMeta: data?.productReviewRatingsMetadata?.items?.map(toProductReviewMeta) ?? [],
    }
  }
}
