import Extension from '#ioc/types/base/Extension'
import ToProductLabel from '#ioc/mappers/ToProductLabel'
import { computed } from 'vue'

interface Labels {
  labels: ReturnType<typeof ToProductLabel>[]
}

const useProduct: Extension<Labels> = (useProduct) => (product) => {
  const self = useProduct(product)

  self.labels = computed(() => product.value.labels)

  return self
}

export default useProduct
