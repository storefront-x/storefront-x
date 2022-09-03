import ProductReviewMeta from '#ioc/graphql/queries/ProductReviewMeta'
import useMagento from '#ioc/composables/useMagento'
import ToProductReviewMeta from '#ioc/mappers/ToProductReviewMeta'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    productReviewMeta: ReturnType<typeof ToProductReviewMeta>[]
  }> => {
    const { data } = await magento.graphql(ProductReviewMeta())

    return {
      productReviewMeta: data?.productReviewRatingsMetadata?.items?.map(ToProductReviewMeta) ?? [],
    }
  }
}
