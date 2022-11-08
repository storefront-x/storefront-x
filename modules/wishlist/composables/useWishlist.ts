import useWishlistStore from '#ioc/stores/useWishlistStore'
import useGetProductsByIdsRepository from '#ioc/repositories/useGetProductsByIdsRepository'
import { ref, onMounted, watch } from 'vue'
import ToProduct from '#ioc/mappers/ToProduct'
import ToWishlistItem from '#ioc/mappers/ToWishlistItem'
import { storeToRefs } from 'pinia'

export default () => {
  const wishlistStore = useWishlistStore()
  const { items } = storeToRefs(wishlistStore)
  const getProductsByIdsRepository = useGetProductsByIdsRepository()
  const wishlistProducts = ref([] as ReturnType<typeof ToProduct>[])

  onMounted(async () => {
    if (wishlistStore.items.length) {
      const initialWishlistProducts = await getProductsFromWishlistItems(wishlistStore.items)
      wishlistProducts.value.push(...initialWishlistProducts)
    }
  })

  watch(
    () => items.value.length,
    async () => {
      const newItems = wishlistStore.items
      const oldItems = wishlistProducts.value.map((p) => p.sku)

      if (newItems.length > oldItems.length) {
        const diference = newItems.filter((x) => !oldItems.includes(x))
        const addWishlistProducts = await getProductsFromWishlistItems(diference)

        wishlistProducts.value.push(...addWishlistProducts)
      } else {
        const diference = oldItems.find((x) => !newItems.includes(x))
        const removeIndex = wishlistProducts.value.findIndex((p) => p.sku === diference)

        wishlistProducts.value.splice(removeIndex, 1)
      }
    },
  )

  async function getProductsFromWishlistItems(ids: ReturnType<typeof ToWishlistItem>[]) {
    const { products } = await getProductsByIdsRepository(ids)

    return products
  }

  return { wishlistProducts }
}
