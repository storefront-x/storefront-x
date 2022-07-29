import { provide } from 'vue'
import useProduct from '#ioc/composables/useProduct'

export default (...args: Parameters<typeof useProduct>) => provide('$Product', useProduct(...args))
