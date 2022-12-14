import Extension from '#ioc/types/base/Extension'
import { computed } from 'vue'

const useProduct: Extension<any> =
  (useProduct) =>
  (...args) => {
    const product = useProduct(...args)

    product.attributes = computed(() => product.value.attributes || [])

    return product
  }

export default useProduct
