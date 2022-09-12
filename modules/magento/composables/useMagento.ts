import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import MAGENTO_GRAPHQL_ENDPOINT from '#ioc/config/MAGENTO_GRAPHQL_ENDPOINT'
import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import objectToQuery from '#ioc/utils/url/objectToQuery'
import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'
import IS_SERVER from '#ioc/config/IS_SERVER'
import useStoreStore from '#ioc/stores/useStoreStore'
import useCurrentLocale from '#ioc/composables/useCurrentLocale'
import GraphQLError from '#ioc/errors/GraphQLError'

interface Options {
  errorHandler?: (err: any) => Promise<void>
}

const URL = IS_SERVER ? MAGENTO_URL : '/_magento'

export default () => {
  const cookie = useCookies()
  const storeStore = useStoreStore()
  const currentLocale = useCurrentLocale()

  const headers = () => {
    const store = currentLocale.value.magentoStore
    const token = cookie.get(MAGENTO_CUSTOMER_COOKIE_NAME)
    const selectedCurrencyCode = storeStore.currency?.code ?? ''

    return {
      'Content-Type': 'application/json',
      ...(store && { Store: store }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(selectedCurrencyCode && { 'Content-Currency': selectedCurrencyCode }),
    }
  }

  const graphql = async (gql: any, opts: Options = {}) => {
    const query = gql.toString()
    const variables = gql.getVariables()

    const _fetch = async (input: RequestInfo, init: RequestInit) => {
      const response = await fetch(input, init)

      if (response.headers.get('content-type') !== 'application/json') {
        throw new Error(await response.text())
      }

      const json = await response.json()

      if (json.errors?.length) {
        for (const error of json.errors) {
          if (opts.errorHandler) {
            await opts.errorHandler(error)
          } else {
            throw new GraphQLError(error)
          }
        }
      }

      return json
    }

    if (gql.isCacheable()) {
      const body = objectToQuery({
        query,
        variables: isNonEmptyObject(variables) ? variables : undefined,
      })

      return await _fetch(`${URL + MAGENTO_GRAPHQL_ENDPOINT}?${body}`, {
        method: 'GET',
        headers: headers(),
      })
    } else {
      const body = JSON.stringify({
        query,
        variables,
      })

      return await _fetch(URL + MAGENTO_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: headers(),
        body,
      })
    }
  }

  return {
    graphql,
  }
}
