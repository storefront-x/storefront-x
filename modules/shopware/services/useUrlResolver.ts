import useGetSeoUrlRepository from '#ioc/repositories/useGetSeoUrlRepository'
import useResource from '#ioc/composables/useResource'
import arePathsSimilar from '#ioc/utils/url/arePathsSimilar'
import dynamicPages from '~/.sfx/shopware/dynamicPages'
import useRoute from '#ioc/composables/useRoute'

export default () => {
  const getSeoUrlRepository = useGetSeoUrlRepository()
  const route = useRoute()

  return async (resolvePath: string) => {
    const [data] = await useResource(
      () => resolvePath,
      (routePath) => getSeoUrlRepository(routePath),
    )

    return {
      id: data.value?.foreignKey,
      component: dynamicPages[data.value?.ident as keyof typeof dynamicPages],
      redirectTo: arePathsSimilar(route.path, data.value?.seoPath) ? null : data.value?.seoPath,
    }
  }
}
