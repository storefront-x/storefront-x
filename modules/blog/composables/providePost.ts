import { provide } from 'vue'
import usePost from '#ioc/composables/usePost'

export default (...args: Parameters<typeof usePost>) => provide('$Post', usePost(...args))
