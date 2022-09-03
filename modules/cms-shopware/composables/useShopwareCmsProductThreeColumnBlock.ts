import { computed, reactive } from 'vue'
import ToProduct from '#ioc/mappers/ToProduct'

export default (data: any) => {
  const products = computed(() => {
    const products = []
    for (const slot of data.slots) {
      products.push(ToProduct(slot.data.product))
    }
    return products
  })

  return reactive({
    products,
  })
}
