import useCompareProductsStore from '#ioc/stores/useCompareProductsStore'
import useGetProductsByIdsRepository from '#ioc/repositories/useGetProductsByIdsRepository'
import useCookies from '#ioc/composables/useCookies'
import ToProduct from '#ioc/mappers/ToProduct'
import COMPARE_PRODUCTS_COOKIE_NAME from '#ioc/config/COMPARE_PRODUCTS_COOKIE_NAME'
import { storeToRefs } from 'pinia'
import { ref, onMounted, watch, onUnmounted } from 'vue'

export default () => {
  const compareProductsStore = useCompareProductsStore()
  const cookies = useCookies()
  const getProductsByIdsRepository = useGetProductsByIdsRepository()
  const comparedProducts = ref([] as ReturnType<typeof ToProduct>[])
  const { items } = storeToRefs(compareProductsStore)

  onMounted(async () => {
    if (compareProductsStore.items.length) {
      const { products } = (await getProductsByIdsRepository(compareProductsStore.items)) as any
      comparedProducts.value.push(
        ...products.sort(
          (a: any, b: any) => compareProductsStore.items.indexOf(a) - compareProductsStore.items.indexOf(b),
        ),
      )
    }
  })

  onUnmounted(() => {
    cookies.remove(COMPARE_PRODUCTS_COOKIE_NAME)
  })

  watch(
    () => items,
    (newItems: any) => {
      if (newItems.value.length < comparedProducts.value.length) {
        const removeIndex = comparedProducts.value.findIndex((p) => !newItems.value.includes(p.sku))
        comparedProducts.value.splice(removeIndex, 1)
      }
    },
    { deep: true },
  )
  return comparedProducts
}
