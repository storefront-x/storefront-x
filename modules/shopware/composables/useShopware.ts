import SHOPWARE_URL from '#ioc/config/SHOPWARE_URL'
import SHOPWARE_ACCESS_KEY from '#ioc/config/SHOPWARE_ACCESS_KEY'
import IS_SERVER from '#ioc/config/IS_SERVER'
import useShopwareStore from '#ioc/stores/useShopwareStore'
import useCookies from '#ioc/composables/useCookies'
import SHOPWARE_TOKEN_COOKIE_NAME from '#ioc/config/SHOPWARE_TOKEN_COOKIE_NAME'
import SHOPWARE_API_PREFIX from '#ioc/config/SHOPWARE_API_PREFIX'
import ShopwareError from '../ShopwareError'
import useCurrentLocale from '#ioc/composables/useCurrentLocale'

const URL = IS_SERVER ? SHOPWARE_URL : '/_shopware'

export default () => {
  const cookies = useCookies()
  const shopwareStore = useShopwareStore()
  const currentLocale = useCurrentLocale()

  const _fetch = async (url: string, init?: RequestInit) => {
    const response = await fetch(URL + SHOPWARE_API_PREFIX + url, {
      ...init,
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'sw-include-seo-urls': 'true',
        'sw-language-id': currentLocale.value.languageId,
        ...(IS_SERVER && { 'sw-access-key': SHOPWARE_ACCESS_KEY }),
        ...(shopwareStore.token && { 'sw-context-token': shopwareStore.token }),
        ...init?.headers,
      },
    })

    const token = response.headers.get('sw-context-token')
    if (!!token && token !== shopwareStore.token) {
      cookies.set(SHOPWARE_TOKEN_COOKIE_NAME, token, { path: '/' })
      shopwareStore.$patch({ token })
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
      const json: any = await response.json()

      if (json.errors?.length > 0) throw new ShopwareError(json.errors[0])

      return json
    } else if (response.status !== 204) {
      throw new Error(response.statusText)
    }
  }

  const get = async (url: string) => {
    const json: any = await _fetch(url, {
      method: 'GET',
    })

    return json
  }

  const post = async (url: string, body?: any) => {
    const json: any = await _fetch(url, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })

    return json
  }

  const del = async (url: string) => {
    const json: any = await _fetch(url, {
      method: 'DELETE',
    })

    return json
  }

  const patch = async (url: string, body?: any) => {
    const json: any = await _fetch(url, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    })

    return json
  }

  return {
    get,
    post,
    del,
    patch,
  }
}
