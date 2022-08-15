import useAsyncData from '#ioc/composables/useAsyncData'
import useRoute from '#ioc/composables/useRoute'
import useGetSeoUrlRepository from '#ioc/repositories/useGetSeoUrlRepository'
import dynamicPages from '~/.sfx/shopware/dynamicPages'

export default () => {
  const route = useRoute()
  const getSeoUrlRepository = useGetSeoUrlRepository()

  return async () => {
    const routePath = route.path === '/' ? 'home' : route.path.replace('/', '')

    const { data } = await useAsyncData('urlResolver', () => getSeoUrlRepository(routePath))

    return {
      id: data.value?.foreignKey,
      component: dynamicPages[data.value?.ident as keyof typeof dynamicPages],
    }
  }
}
