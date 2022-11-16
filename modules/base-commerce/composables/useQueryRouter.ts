import useRoute from '#ioc/composables/useRoute'
import useRouter from '#ioc/composables/useRouter'
import objectToQuery from '#ioc/utils/url/objectToQuery'

export default () => {
  const router = useRouter()
  const route = useRoute()

  function pushQuery(query: any, params = {}) {
    router.push({
      query: {
        ...route.query,
        ...query,
      },
      params,
    })
  }

  function getQuery(query: any) {
    return objectToQuery({
      ...route.query,
      ...query,
    })
  }
  return { pushQuery, getQuery }
}
