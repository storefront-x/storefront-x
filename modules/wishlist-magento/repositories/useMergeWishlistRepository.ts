import useMagento from '#ioc/composables/useMagento'
import useToProduct from '#ioc/mappers/useToProduct'
import UpdateProductsInWishlist from '#ioc/graphql/mutations/UpdateProductsInWishlist'

export default () => {
  const magento = useMagento()

  return async (products: ReturnType<ReturnType<typeof useToProduct>>[], id: any) => {
    const {
      data: { updateProductsInWishlist },
    } = await magento.graphql(UpdateProductsInWishlist().with({ id, items: products }))

    if (!updateProductsInWishlist) throw new Error()

    return {
      wishlist: updateProductsInWishlist.wishlist,
    }
  }
}
