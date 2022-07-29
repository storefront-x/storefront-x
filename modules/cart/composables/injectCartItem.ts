import { inject } from 'vue'
import useCartItem from '#ioc/composables/useCartItem'

export default () => inject('$CartItem') as ReturnType<typeof useCartItem>
