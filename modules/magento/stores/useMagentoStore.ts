import defineStore from '#ioc/utils/vuePinia/defineStore'
import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import MAGENTO_GRAPHQL_ENDPOINT from '#ioc/config/MAGENTO_GRAPHQL_ENDPOINT'
import objectToQuery from '#ioc/utils/url/objectToQuery'
import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'
import IS_SERVER from '#ioc/config/IS_SERVER'
import useStoreStore from '#ioc/stores/useStoreStore'
import useCurrentLocale from '#ioc/composables/useCurrentLocale'
import MagentoError from '#ioc/errors/MagentoError'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import errorHandlers from '~/.sfx/magento/errorHandlers'
import beforeRequestClient from '~/.sfx/magento/beforeRequest.client'
import beforeRequestServer from '~/.sfx/magento/beforeRequest.server'
import afterResponseClient from '~/.sfx/magento/afterResponse.client'
import afterResponseServer from '~/.sfx/magento/afterResponse.server'
import { ref } from 'vue'

interface Options {
  headers?: object
  errorHandler?: (err: any) => Promise<void>
}

export default defineStore('magento', () => {
  const isOnCatalog = ref(0)
  const isMiniCartVisible = ref(true)

  const storeStore = useStoreStore()
  const currentLocale = useCurrentLocale()
  const use = (composables: any) => Object.values(composables).map((use: any) => use())

  const bindedErrorHandlers = use(errorHandlers)
  const bindedBeforeRequest = use(IS_CLIENT ? beforeRequestClient : beforeRequestServer)
  const bindedAfterResponse = use(IS_CLIENT ? afterResponseClient : afterResponseServer)

  const URL = IS_SERVER ? MAGENTO_URL : '/_magento'

  const headers = () => {
    const store = currentLocale.value.magentoStore
    const selectedCurrencyCode = storeStore.currency?.code ?? ''

    return {
      'Content-Type': 'application/json',
      ...(store && { Store: store }),
      ...(selectedCurrencyCode && { 'Content-Currency': selectedCurrencyCode }),
    }
  }

  const graphql = async (gql: any, opts: Options = {}) => {
    const query = gql.toString()
    const variables = gql.getVariables()

    const _fetch = async (request: Request) => {
      for (const beforeRequest of bindedBeforeRequest) {
        await beforeRequest(request, {
          gql,
          opts,
        })
      }

      const response = await fetch(request.clone())

      for (const afterResponse of bindedAfterResponse) {
        await afterResponse(response, request, {
          gql,
          opts,
        })
      }

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

      const request = new Request(`${URL}${MAGENTO_GRAPHQL_ENDPOINT}?${body}`, {
        method: 'GET',
        headers: { ...headers(), ...opts.headers },
      })

      return await _fetch(request)
    } else {
      const body = JSON.stringify({
        query,
        variables,
      })

      const request = new Request(`${URL}${MAGENTO_GRAPHQL_ENDPOINT}`, {
        method: 'POST',
        headers: { ...headers(), ...opts.headers },
        body,
      })

      return await _fetch(request)
    }
  }

  return {
    isOnCatalog,
    isMiniCartVisible,
    graphql,
  }
})
