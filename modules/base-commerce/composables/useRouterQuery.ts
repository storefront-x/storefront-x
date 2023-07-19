import objectToQuery from '#ioc/utils/url/objectToQuery'
import useRouter from '#ioc/composables/useRouter'
import useRoute from '#ioc/composables/useRoute'

interface QueryObject {
  [key: string]: string | number | boolean | null | undefined
}

export default () => {
  const router = useRouter()
  const route = useRoute()

  const pushQuery = (query: QueryObject, params = {}) => {
    router.push({
      query: {
        ...route.query,
        ...query,
      },
      params,
    })
  }

  const getQuery = (query: QueryObject) => {
    return objectToQuery({
      ...route.query,
      ...query,
    })
  }

  return {
    pushQuery,
    getQuery,
  }
}
