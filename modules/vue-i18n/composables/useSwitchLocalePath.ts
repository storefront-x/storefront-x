import useRoute from '#ioc/composables/useRoute'
import useRouter from '#ioc/composables/useRouter'
import useCurrentLocale from './useCurrentLocale'

export default () => {
  const route = useRoute()
  const router = useRouter()
  const currentLocale = useCurrentLocale()

  return (targetLocaleName: string): string => {
    const [name] = route.name!.toString().split('__')

    const domain = currentLocale.value.domain
    const { fullPath } = router.resolve({ ...route, name: `${name}__${targetLocaleName}` })

    if (domain) {
      return '//' + domain + fullPath
    } else {
      return fullPath
    }
  }
}
