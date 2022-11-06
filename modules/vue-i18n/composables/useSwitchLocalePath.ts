import useRoute from '#ioc/composables/useRoute'
import useLocalePath from '#ioc/composables/useLocalePath'

export default () => {
  const route = useRoute()
  const localePath = useLocalePath()

  return (targetLocaleName: string): string => {
    return localePath(
      { name: route.name!, query: route.query, hash: route.hash, params: route.params },
      targetLocaleName,
    )
  }
}
