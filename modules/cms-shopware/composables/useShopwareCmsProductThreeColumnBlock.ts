import { computed, reactive } from 'vue'
import useToProduct from '#ioc/mappers/useToProduct'

export default (data: any) => {
  const toProduct = useToProduct()

  const products = computed(() => {
    const products = []
    for (const slot of data.slots) {
      products.push(toProduct(slot.data.product))
    }
    return products
  })

  return reactive({
    products,
  })
}
