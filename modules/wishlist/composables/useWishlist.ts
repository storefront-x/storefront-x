import useWishlistStore from '#ioc/stores/useWishlistStore'
import useGetProductsByIdsRepository from '#ioc/repositories/useGetProductsByIdsRepository'
import { ref, onMounted, watch } from 'vue'
import ToProduct from '#ioc/mappers/ToProduct'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'
import storeToRefs from '#ioc/utils/vuePinia/storeToRefs'

export default () => {
  const wishlistStore = useWishlistStore()
  const { items } = storeToRefs(wishlistStore)
  const getProductsByIdsRepository = useGetProductsByIdsRepository()
  const wishlistProducts = ref([] as ReturnType<typeof ToProduct>[])

  onMounted(async () => {
    if (wishlistStore.items.length) {
      const initialWishlistProducts = await getProductsFromWishlistItems(wishlistStore.items)
      wishlistProducts.value.push(
        ...initialWishlistProducts.sort((a, b) => wishlistStore.items.indexOf(a) - wishlistStore.items.indexOf(b)),
      )
    }
  })

  watch(
    () => items,
    (newItems) => {
      if (newItems.value.length < wishlistProducts.value.length) {
        const removeIndex = wishlistProducts.value.findIndex((p) => !newItems.value.includes(p.sku))
        wishlistProducts.value.splice(removeIndex, 1)
      }
    },
    { deep: true },
  )

  async function getProductsFromWishlistItems(ids: ReturnType<typeof ToWishlistItem>[]) {
    const { products } = await getProductsByIdsRepository(ids)

    return products
  }

  return { wishlistProducts }
}
