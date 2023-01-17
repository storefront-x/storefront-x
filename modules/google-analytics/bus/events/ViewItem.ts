import useProduct from '#ioc/composables/useProduct'

export default interface ViewItem {
  product: ReturnType<typeof useProduct>
}
