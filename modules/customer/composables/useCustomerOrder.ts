import useToOrder from '#ioc/mappers/useToOrder'
import { computed, reactive, Ref } from 'vue'

export default (customerOrder: Ref<ReturnType<ReturnType<typeof useToOrder>>>) => {
  const orderNumber = computed(() => customerOrder.value.orderNumber)

  const grandTotal = computed(() => customerOrder.value.amountTotal)

  const orderDate = computed(() => customerOrder.value.orderDate)

  return reactive({
    orderNumber,
    grandTotal,
    orderDate,
  })
}
