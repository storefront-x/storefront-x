import useToOrder from '#ioc/mappers/useToOrder'
import { computed, reactive, Ref } from 'vue'

export default (customerOrder: Ref<ReturnType<ReturnType<typeof useToOrder>>>) => {
  const orderNumber = computed(() => customerOrder.value.orderNumber ?? customerOrder.value.number)

  const grandTotal = computed(() => customerOrder.value.amountTotal ?? customerOrder.value.total?.grandTotal)

  const orderDate = computed(() => customerOrder.value.orderDate)

  const status = computed(() => customerOrder.value.status)

  const items = computed(() => customerOrder.value.items)

  return reactive({
    orderNumber,
    grandTotal,
    orderDate,
    status,
    items,
  })
}
