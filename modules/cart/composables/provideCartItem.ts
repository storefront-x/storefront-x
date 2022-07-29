import { provide } from 'vue'
import useCartItem from '#ioc/composables/useCartItem'

export default (...args: Parameters<typeof useCartItem>) => provide('$CartItem', useCartItem(...args))
