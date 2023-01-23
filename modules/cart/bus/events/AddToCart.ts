import useProduct from '#ioc/composables/useProduct'

export default interface AddToCart {
  product: ReturnType<typeof useProduct>
  quantity?: number
}
