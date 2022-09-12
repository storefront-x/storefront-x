import useAsyncData from '#ioc/composables/useAsyncData'
import useRoute from '#ioc/composables/useRoute'
import useGetSeoUrlRepository from '#ioc/repositories/useGetSeoUrlRepository'
import ensureArray from '#ioc/utils/array/ensureArray'
import arePathsSimilar from '#ioc/utils/url/arePathsSimilar'
import dynamicPages from '~/.sfx/shopware/dynamicPages'

export default () => {
  const route = useRoute()
  const getSeoUrlRepository = useGetSeoUrlRepository()

  return async () => {
    const path = ensureArray(route.params?.pathMatch).join('/')

    const { data } = await useAsyncData('urlResolver', () => getSeoUrlRepository(path || 'home'))

    return {
      id: data.value?.foreignKey,
      component: dynamicPages[data.value?.ident as keyof typeof dynamicPages],
      redirectTo: arePathsSimilar(path, data.value?.seoPath) ? null : data.value?.seoPath,
    }
  }
}
