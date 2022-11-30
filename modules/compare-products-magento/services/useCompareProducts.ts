import useCompareProductsStore from '#ioc/stores/useCompareProductsStore'
import useGetProductsByIdsRepository from '#ioc/repositories/useGetProductsByIdsRepository'
import ToProduct from '#ioc/mappers/ToProduct'
import { storeToRefs } from 'pinia'
import { ref, onMounted, watch } from 'vue'

export default () => {
  const compareProductsStore = useCompareProductsStore()
  const { items } = storeToRefs(compareProductsStore)
  const getProductsByIdsRepository = useGetProductsByIdsRepository()
  const comparedProducts = ref([] as ReturnType<typeof ToProduct>[])

  console.log('use SERVICE  compare product items', comparedProducts)
  onMounted(async () => {
    if (compareProductsStore.items.length) {
      const { products } = (await getProductsByIdsRepository(compareProductsStore.items)) as any
      console.log('those are wishlist products', products)
      comparedProducts.value.push(
        ...products.sort(
          (a: any, b: any) => compareProductsStore.items.indexOf(a) - compareProductsStore.items.indexOf(b),
        ),
      )
    }
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
  console.log('compared products before sending', compareProductsStore)
  return comparedProducts
}
