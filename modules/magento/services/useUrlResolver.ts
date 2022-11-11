import useUrlResolverRepository from '#ioc/repositories/useUrlResolverRepository'
import dynamicPages from '~/.sfx/magento/dynamicPages'
import useResource from '#ioc/composables/useResource'
import useRoute from '#ioc/composables/useRoute'

export default () => {
  const urlResolverRepository = useUrlResolverRepository()
  const route = useRoute()
  return async (rawPath: string = route.path): Promise<{ id: string; component: any; relativeUrl: string }> => {
    // console.log({ routeInResolver: rawPath })
    const [data] = await useResource(
      () => rawPath,
      (routePath) => urlResolverRepository(routePath),
    )

    return {
      id: data.value.id,
      component: dynamicPages[data.value.type as keyof typeof dynamicPages],
      relativeUrl: data.value.relativeUrl,
    }
  }
}
