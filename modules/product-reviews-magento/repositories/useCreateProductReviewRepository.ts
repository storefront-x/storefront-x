import CreateProductReview from '#ioc/graphql/mutations/CreateProductReview'
import useMagento from '#ioc/composables/useMagento'
import useToProductReview from '#ioc/mappers/useToProductReview'
import useProduct from '#ioc/composables/useProduct'

export default () => {
  const magento = useMagento()
  const toProductReview = useToProductReview()

  return async (
    product: ReturnType<typeof useProduct>,
    inputData: any,
  ): Promise<{
    review: ReturnType<typeof toProductReview>
  }> => {
    const temp = ['nickname', 'summary', 'text']
    const ratings = []
    for (const [key, value] of Object.entries(inputData)) {
      if (temp.includes(key)) continue
      ratings.push({ id: key, value_id: value })
    }

    const { data, _error } = await magento.graphql(
      CreateProductReview().with({
        nickname: inputData.nickname,
        summary: inputData.summary,
        sku: product.sku,
        text: inputData.text,
        ratings,
      }),
    )

    if (_error) {
      throw new Error(_error)
    }

    return {
      review: toProductReview(data?.createProductReview?.review) ?? [],
    }
  }
}
