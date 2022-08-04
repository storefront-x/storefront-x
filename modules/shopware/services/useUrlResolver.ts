import useAsyncData from '#ioc/composables/useAsyncData'
import useRoute from '#ioc/composables/useRoute'
import useGetSeoUrl from '#ioc/services/useGetSeoUrl'
import dynamicPages from '~/.sfx/shopware/dynamicPages'

export default () => {
  const route = useRoute()
  const getSeoUrl = useGetSeoUrl()

  return async () => {
    const routePath = route.path === '/' ? 'home' : route.path.replace('/', '')

    const { data } = await useAsyncData('UrlResolver', () => getSeoUrl(routePath))

    return {
      id: data.value?.foreignKey,
      component: dynamicPages[data.value?.ident as keyof typeof dynamicPages],
    }
  }
}
