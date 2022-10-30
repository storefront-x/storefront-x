import ToProduct from '#ioc/mappers/ToProduct'
import ToProductAttribute from '#ioc/mappers/ToProductLabel'
import { computed, Ref } from 'vue'

export default <T extends (...args: any[]) => any>(useProduct: T) => {
  return (
    product: Ref<ReturnType<typeof ToProduct>>,
  ): ReturnType<T> & { attributes: ReturnType<typeof ToProductAttribute>[] } => {
    const self = useProduct(product)

    self.attributes = computed(() => product.value.attributes || [])

    return self
  }
}
