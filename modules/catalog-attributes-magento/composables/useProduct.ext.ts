import ToProduct from '#ioc/mappers/ToProduct'
import { computed } from 'vue'

interface Extension<Ext = Record<string, never>> {
  <T extends (...arg: any) => any>(useProduct: T): (...arg: any) => ReturnType<T> & Ext
}

const useProduct: Extension<typeof ToProduct> =
  (useProduct) =>
  (...args) => {
    const data = [...args].shift()

    const product = useProduct(...args)

    product.attributes = computed(() => data.value.attributes || [])

    return product
  }

export default useProduct
