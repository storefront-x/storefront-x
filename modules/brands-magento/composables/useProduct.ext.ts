import Extension from '#ioc/types/base/Extension'
import { computed } from 'vue'

interface Brand {
  brand: {
    name: string
  }
}

const useProduct: Extension<Brand> = (useProduct) => (product) => {
  const self = useProduct(product)

  self.brand = computed(() => product.value.brand)

  return self
}

export default useProduct
