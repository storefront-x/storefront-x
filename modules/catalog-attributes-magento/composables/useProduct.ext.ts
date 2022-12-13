import ToProduct from '#ioc/mappers/ToProduct'
import Extension from '#ioc/types/base/Extension'
import { computed } from 'vue'

const useProduct: Extension<typeof ToProduct> =
  (useProduct) =>
  (...args) => {
    // const data = [...args].shift()

    const product = useProduct(...args)
    console.log('data', product, args)
    product.attributes = computed(() => product.value.attributes || [])

    return product
  }

export default useProduct
