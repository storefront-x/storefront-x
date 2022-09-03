import ToOrderItem from '#ioc/mappers/ToOrderItem'
import { computed, reactive } from 'vue'

export default (orderItem: ReturnType<typeof ToOrderItem>) => {
  const productSku = computed(() => orderItem.productSku ?? '')

  const productUrlPath = computed(() => orderItem.productUrlPath ?? '')

  const productName = computed(() => orderItem.productName)

  const quantityOrdered = computed(() => orderItem.quantityOrdered)

  const productSalePrice = computed(() => orderItem.productSalePrice)

  return reactive({
    productSku,
    productUrlPath,
    productName,
    quantityOrdered,
    productSalePrice,
  })
}
