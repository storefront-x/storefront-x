import type { RouteLocation } from 'vue-router'
import useRoute from '#ioc/composables/useRoute'
import useRouter from '#ioc/composables/useRouter'

export default () => {
  const route = useRoute()
  const router = useRouter()

  return (targetLocaleName: string): RouteLocation => {
    const [name] = route.name!.toString().split('__')

    return router.resolve({ ...route, name: `${name}__${targetLocaleName}` })
  }
}
