import useProduct from '#ioc/composables/useProduct'

export default interface ProductDetail {
  product: ReturnType<typeof useProduct>
}
