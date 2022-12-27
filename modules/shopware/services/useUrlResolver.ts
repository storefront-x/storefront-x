import useGetSeoUrlRepository from '#ioc/repositories/useGetSeoUrlRepository'
import useResource from '#ioc/composables/useResource'
import arePathsSimilar from '#ioc/utils/url/arePathsSimilar'
import dynamicPages from '~/.sfx/shopware/dynamicPages'
import useRoute from '#ioc/composables/useRoute'
import redirect from '#ioc/utils/redirect'
import useLocalePath from '#ioc/composables/useLocalePath'

export default () => {
  const getSeoUrlRepository = useGetSeoUrlRepository()
  const route = useRoute()
  const localePath = useLocalePath()

  return async (resolvePath: string) => {
    const [data] = await useResource(
      () => resolvePath,
      (routePath) => getSeoUrlRepository(routePath),
    )
    if (arePathsSimilar(route.path, data.value.seoPath)) {
      return {
        id: data.value?.foreignKey,
        component: dynamicPages[data.value?.ident as keyof typeof dynamicPages],
      }
    } else {
      redirect(localePath(data.value.seoPath), 301)
    }
  }
}
