import useProduct from '#ioc/composables/useProduct'

export default interface RemoveFromCart {
  product: ReturnType<typeof useProduct>
  quantity?: number
}
