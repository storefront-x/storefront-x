import { inject } from 'vue'
import usePost from '#ioc/composables/usePost'

export default () => inject('$Post') as ReturnType<typeof usePost>
