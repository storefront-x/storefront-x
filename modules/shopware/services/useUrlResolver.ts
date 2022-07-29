import useAsyncData from '#ioc/composables/useAsyncData'
import useRoute from '#ioc/composables/useRoute'
import useGetSeoUrl from '#ioc/services/useGetSeoUrl'
import * as dynamicPages from '~/.sfx/dynamicPages'

export default () => {
  const route = useRoute()
  const getSeoUrl = useGetSeoUrl()

  return async () => {
    const { data } = await useAsyncData('UrlResolver', () => getSeoUrl(route.path.replace('/', '')))

    return {
      id: data.value?.foreignKey,
      component: dynamicPages[data.value?.ident as keyof typeof dynamicPages],
    }
  }
}
