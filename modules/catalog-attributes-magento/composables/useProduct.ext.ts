import ToProductAttribute from '#ioc/mappers/ToProductAttribute'
import Extension from '#ioc/types/base/Extension'
import { computed } from 'vue'

interface Attributes {
  attributes: ReturnType<typeof ToProductAttribute>[]
}

const useProduct: Extension<Attributes> = (useProduct) => (product) => {
  const self = useProduct(product)

  self.attributes = computed(() => product.value.attributes)

  return self
}

export default useProduct
