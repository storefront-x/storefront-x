import useAsyncData from '#ioc/composables/useAsyncData'
import useRoute from '#ioc/composables/useRoute'
import useGetSeoUrlRepository from '#ioc/repositories/useGetSeoUrlRepository'
import ensureArray from '#ioc/utils/array/ensureArray'
import dynamicPages from '~/.sfx/shopware/dynamicPages'

export default () => {
  const route = useRoute()
  const getSeoUrlRepository = useGetSeoUrlRepository()

  return async () => {
    const arr = ['detail', 'navigation']
    const path = ensureArray(route.params?.pathMatch)
    const contains = arr.some((element) => {
      if (path.includes(element)) {
        return true
      }
      return false
    })
    const routePath = path.length ? (contains ? path.slice(1, path.length).join('/') : path.join('/')) : 'home'

    const { data } = await useAsyncData('urlResolver', () => getSeoUrlRepository(routePath.replace('#', '')))

    return {
      id: data.value?.foreignKey,
      component: dynamicPages[data.value?.ident as keyof typeof dynamicPages],
      seoPath: data.value?.seoPath,
    }
  }
}
