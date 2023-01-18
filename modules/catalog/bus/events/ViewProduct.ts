import useProduct from '#ioc/composables/useProduct'

export default interface ViewProduct {
  product: ReturnType<typeof useProduct>
}
