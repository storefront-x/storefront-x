import useAsyncData from '#ioc/composables/useAsyncData'
import useRoute from '#ioc/composables/useRoute'
import useUrlResolverRepository from '#ioc/repositories/useUrlResolverRepository'
import dynamicPages from '~/.sfx/magento/dynamicPages'

export default () => {
  const route = useRoute()
  const urlResolverRepository = useUrlResolverRepository()

  return async (): Promise<{ id: string; component: any; relativeUrl: string }> => {
    const path = route.params?.pathMatch?.toString().replace(',', '/') || '/'
    const { data } = await useAsyncData('urlResolver', () => urlResolverRepository(path))

    return {
      id: data.value.id,
      component: dynamicPages[data.value.type as keyof typeof dynamicPages],
      relativeUrl: data.value.relativeUrl,
    }
  }
}
