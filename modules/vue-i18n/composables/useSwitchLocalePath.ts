import useRoute from '#ioc/composables/useRoute'
import useRouter from '#ioc/composables/useRouter'

export default () => {
  const route = useRoute()
  const router = useRouter()

  return (targetPath: string) => {
    const [name, routeName] = route.name!.toString().split('__')

    if (routeName === targetPath) {
      return ''
    }

    const newRoute = router.resolve({ ...route, name: `${name}__${targetPath}` })

    return newRoute.fullPath
  }
}
