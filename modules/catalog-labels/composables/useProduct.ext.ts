import ToProduct from '#ioc/mappers/ToProduct'
import ToProductLabel from '#ioc/mappers/ToProductLabel'
import { computed, Ref } from 'vue'

export default <T extends (...args: any[]) => any>(useProduct: T) => {
  return (
    product: Ref<ReturnType<typeof ToProduct>>,
  ): ReturnType<T> & { labels: ReturnType<typeof ToProductLabel>[] } => {
    const self = useProduct(product)

    self.labels = computed(() => product.value.productLabels || [])

    return self
  }
}
