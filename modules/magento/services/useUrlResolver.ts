import useUrlResolverRepository from '#ioc/repositories/useUrlResolverRepository'
import dynamicPages from '~/.sfx/magento/dynamicPages'
import useResource from '#ioc/composables/useResource'

export default () => {
  const urlResolverRepository = useUrlResolverRepository()

  return async (resolvePath: string): Promise<{ id: string; component: any; relativeUrl: string }> => {
    const [data] = await useResource(
      () => resolvePath,
      (routePath) => urlResolverRepository(routePath),
    )

    return {
      id: data.value.id,
      component: dynamicPages[data.value.type as keyof typeof dynamicPages],
      relativeUrl: data.value.relativeUrl,
    }
  }
}
