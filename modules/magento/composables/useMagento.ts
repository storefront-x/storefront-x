import IS_CLIENT from '#ioc/config/IS_CLIENT'
import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import MAGENTO_GQL_ENDPOINT from '#ioc/config/MAGENTO_GQL_ENDPOINT'
import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import objectToQuery from '#ioc/utils/url/objectToQuery'
import isNonEmptyObject from '#ioc/utils/isNonEmptyObject'

export default () => {
  const URL = IS_CLIENT ? '/_magento' : MAGENTO_URL + MAGENTO_GQL_ENDPOINT
  const cookie = useCookies()

  const headers = () => {
    // TODO: fetch store
    const store = 'b2c_en'
    const token = cookie.get(MAGENTO_CUSTOMER_COOKIE_NAME)

    return {
      'Content-Type': 'application/json',
      ...(store && { Store: store }),
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  const graphql = async (gql: any) => {
    const query = gql.toString()
    const variables = gql.bindings

    if (gql.isCacheable()) {
      const body = objectToQuery({
        query,
        variables: isNonEmptyObject(variables) ? variables : undefined,
      })

      const response = await fetch(`${URL}?${body}`, {
        method: 'GET',
        headers: headers(),
      })

      const responseJSON = await response.json()
      return responseJSON.data
    } else {
      const body = JSON.stringify({
        query,
        variables,
      })

      const response = await fetch(URL, {
        method: 'POST',
        headers: headers(),
        body,
      })

      const responseJSON = await response.json()
      return responseJSON.data
    }
  }

  return {
    graphql,
  }
}
