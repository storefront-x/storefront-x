import useToOrderItem from '#ioc/mappers/useToOrderItem'
import { computed, reactive } from 'vue'

export default (orderItem: ReturnType<ReturnType<typeof useToOrderItem>>) => {
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
