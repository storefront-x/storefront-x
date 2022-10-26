import useCurrentLocale from '#ioc/composables/useCurrentLocale'
import useRoute from '#ioc/composables/useRoute'
import useRouter from '#ioc/composables/useRouter'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'

export default () => {
  const route = useRoute()
  const router = useRouter()
  const currentLocale = useCurrentLocale()

  return (targetLocaleName: string): string => {
    const [name] = route.name!.toString().split('__')

    const targetLocale = VUE_I18N_LOCALES.find((l) => l.name === targetLocaleName)!
    const { fullPath } = router.resolve({ ...route, name: `${name}__${targetLocaleName}` })

    if (targetLocale.domain) {
      if (targetLocaleName === currentLocale.value.name) {
        return fullPath
      } else {
        return '//' + targetLocale.domain + fullPath
      }
    } else {
      return fullPath
    }
  }
}
