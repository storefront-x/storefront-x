import { inject } from 'vue'
import useProduct from '#ioc/composables/useProduct'

export default () => inject('$Product') as ReturnType<typeof useProduct>
