import useAsyncData from '#ioc/composables/useAsyncData'
import useRoute from '#ioc/composables/useRoute'
import useGetSeoUrlRepository from '#ioc/repositories/useGetSeoUrlRepository'
import ensureArray from '#ioc/utils/array/ensureArray'
import dynamicPages from '~/.sfx/shopware/dynamicPages'
import areSamePaths from '#ioc/utils/url/areSamePaths'

export default () => {
  const route = useRoute()
  const getSeoUrlRepository = useGetSeoUrlRepository()

  return async () => {
    const path = ensureArray(route.params?.pathMatch)
    const routePath = path.length ? path.join('/') : 'home'

    const { data } = await useAsyncData('urlResolver', () => getSeoUrlRepository(routePath))

    const redirectTo = areSamePaths(routePath, data.value?.seoPath)

    return {
      id: data.value?.foreignKey,
      component: dynamicPages[data.value?.ident as keyof typeof dynamicPages],
      redirectTo,
    }
  }
}
