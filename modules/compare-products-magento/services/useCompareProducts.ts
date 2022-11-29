import useCompareProductsStore from '#ioc/stores/useCompareProductsStore'
import { storeToRefs } from 'pinia'

export default () => {
  const compareProductsStore = useCompareProductsStore()
  const { items } = storeToRefs(compareProductsStore)
  console.log('use compare product items', items)

  return items
}
