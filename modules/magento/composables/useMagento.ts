import IS_CLIENT from '#ioc/config/IS_CLIENT'
import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import MAGENTO_GQL_ENDPOINT from '#ioc/config/MAGENTO_GQL_ENDPOINT'

export default () => {
  const URL = IS_CLIENT ? '/_magento' : MAGENTO_URL + MAGENTO_GQL_ENDPOINT

  const headers = () => {
    // TODO: fetch store
    const store = 'b2c_en'

    return {
      'Content-Type': 'application/json',
      ...(store && { Store: store }),
    }
  }

  const graphql = async (gql: any) => {
    const query = gql.toString()
    const variables = gql._bindings

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

  return {
    graphql,
  }
}
