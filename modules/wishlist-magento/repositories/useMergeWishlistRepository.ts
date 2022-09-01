import useMagento from '#ioc/composables/useMagento'
import useToProduct from '#ioc/mappers/useToProduct'
import AddProductsToWishlist from '#ioc/graphql/mutations/AddProductsToWishlist'

export default () => {
  const magento = useMagento()

  return async (products: ReturnType<ReturnType<typeof useToProduct>>[], id: any) => {
    const {
      data: { addProductsToWishlist },
    } = await magento.graphql(AddProductsToWishlist().with({ id, items: products }))

    if (!addProductsToWishlist) throw new Error()

    return {
      wishlist: addProductsToWishlist.wishlist,
    }
  }
}
