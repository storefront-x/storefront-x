import useProduct from '#ioc/composables/useProduct'
import useToCartItem from '#ioc/mappers/useToCartItem'
import { computed, reactive, Ref } from 'vue'

export default (cartItem: Ref<ReturnType<ReturnType<typeof useToCartItem>>>) => {
  const id = computed(() => cartItem.value.id)

  const quantity = computed(() => cartItem.value.quantity)

  const price = computed(() => cartItem.value.price)

  const rowTotal = computed(() => cartItem.value.rowTotal)

  const stackable = computed(() => cartItem.value.stackable)

  const product = useProduct(computed(() => cartItem.value.product))

  return reactive({
    id,
    quantity,
    price,
    rowTotal,
    stackable,
    product,
  })
}
