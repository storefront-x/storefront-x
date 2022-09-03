import CreateProductReview from '#ioc/graphql/mutations/CreateProductReview'
import useMagento from '#ioc/composables/useMagento'
import ToProductReview from '#ioc/mappers/ToProductReview'
import useProduct from '#ioc/composables/useProduct'

export default () => {
  const magento = useMagento()

  return async (
    product: ReturnType<typeof useProduct>,
    inputData: any,
  ): Promise<{
    review: ReturnType<typeof ToProductReview>
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
      review: ToProductReview(data?.createProductReview?.review) ?? [],
    }
  }
}
