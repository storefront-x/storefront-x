import { inject } from 'vue'
import { useRoute, RouteLocationNormalized } from 'vue-router'

export default (): RouteLocationNormalized => {
  const injected = inject('_route', null)

  if (injected) return injected

  return useRoute()
}
