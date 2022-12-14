import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import MAGENTO_GRAPHQL_ENDPOINT from '#ioc/config/MAGENTO_GRAPHQL_ENDPOINT'
import objectToQuery from '#ioc/utils/url/objectToQuery'
import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'
import IS_SERVER from '#ioc/config/IS_SERVER'
import useStoreStore from '#ioc/stores/useStoreStore'
import useCurrentLocale from '#ioc/composables/useCurrentLocale'
import MagentoError from '#ioc/errors/MagentoError'
import errorHandlers from '~/.sfx/magento/errorHandlers'
import useCustomerMagentoStore from '#ioc/stores/useCustomerMagentoStore'

interface Options {
  headers?: object
  errorHandler?: (err: any) => Promise<void>
}

const URL = IS_SERVER ? MAGENTO_URL : '/_magento'

export default () => {
  const storeStore = useStoreStore()
  const customerMagento = useCustomerMagentoStore()
  const currentLocale = useCurrentLocale()
  const bindedErrorHandlers = Object.values(errorHandlers).map((e) => e())

  const headers = () => {
    const store = currentLocale.value.magentoStore
    const customerId = customerMagento.customerId
    const selectedCurrencyCode = storeStore.currency?.code ?? ''

    return {
      'Content-Type': 'application/json',
      ...(store && { Store: store }),
      ...(customerId && { Authorization: `Bearer ${customerId}` }),
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
            for (const errorHandler of bindedErrorHandlers) {
              await errorHandler(error)
            }

            throw new MagentoError(error)
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
        headers: { ...headers(), ...opts.headers },
      })
    } else {
      const body = JSON.stringify({
        query,
        variables,
      })

      return await _fetch(URL + MAGENTO_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { ...headers(), ...opts.headers },
        body,
      })
    }
  }

  return {
    graphql,
  }
}
