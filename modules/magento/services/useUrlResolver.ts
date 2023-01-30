import useUrlResolverRepository from '#ioc/repositories/useUrlResolverRepository'
import dynamicPages from '~/.sfx/magento/dynamicPages'
import useResource from '#ioc/composables/useResource'
import useLocalePath from '#ioc/composables/useLocalePath'
import redirect from '#ioc/utils/redirect'

export default () => {
  const urlResolverRepository = useUrlResolverRepository()
  const localePath = useLocalePath()

  return async (
    resolvePath: string,
  ): Promise<{ entityUid: string; /**@deprecated */ id: string; component: any; relativeUrl: string }> => {
    const [data] = await useResource(
      () => resolvePath,
      (routePath) => urlResolverRepository(routePath),
    )

    if (data.value.redirectCode >= 300 && data.value.redirectCode <= 400) {
      redirect(localePath(data.value.relativeUrl), data.value.redirectCode)
    }

    return {
      entityUid: data.value.entityUid,
      id: data.value.id,
      component: dynamicPages[data.value.type as keyof typeof dynamicPages] ?? null,
      relativeUrl: data.value.relativeUrl,
    }
  }
}
