# Shopware

> `@storefront-x/shopware`

This module provides basic functionality for Shopware integration.

## `magento/dynamicPages/` concept

If we want to have pretty urls (`/nivea`, `/playstation-5`, etc.), we need dynamic pages whose type & content is resolved by the backend.

This concept is for components representing dynamic pages resolved by the Shopware `/seo-url` endpoint. Their name has to be equal to the `routeName` value returned from the endpoint.

- `magento/dynamicPages/frontend.detail.page.vue` - renders product
- `magento/dynamicPages/frontend.navigation.page.vue` - renders category
- `magento/dynamicPages/frontend.landing.page.vue` - renders cms page

## `useShopware` composable

Used to make API requests to Shopware.

The composable function returns object containing methods for making requests with different HTTP methods:

- `get: (url: string) => any`
- `post: (url: string, body?: any) => any`
- `del: (url: string) => any`
- `patch: (url: string, body?: any) => any`

### Example

```ts
// repositories/useGetProductsByIds.ts

import useShopware from '#ioc/composables/useShopware'
import ToProduct from '#ioc/mappers/ToProduct'

export default () => {
  const shopware = useShopware()

  return async (
    ids: string[],
  ): Promise<{
    products: ReturnType<typeof ToProduct>[]
  }> => {
    const response = await shopware.post(`/product`, {
      ids: ids,
    })

    return {
      products: response.elements.map(ToProduct),
    }
  }
}
```

## `SHOPWARE_URL` config

URL of the Shopware instance.

:::warning
This config variable needs to be overrided, because it doesn't contain any value by default!
:::

```ts
// config/SHOPWARE_URL.ts

export default 'https://my-store.shopware.com'
```

## `SHOPWARE_ACCESS_KEY` config

Access key to your Shopware instance.

URL of the Shopware instance. You need to override it by adding `config/SHOPWARE_ACCESS_KEY.ts` to your module. To see how overriding works, click [here](../guide/how-it-works.html#overriding).

:::warning
This config variable needs to be overrided, because it doesn't contain any value by default!
:::

```ts
// config/SHOPWARE_ACCESS_KEY.ts

export default 'XXXXXX-XXXXXXXXXXXXXXXXXXX'
```

## `SHOPWARE_API_PREFIX` config

Prefix for all API requests.

```ts
// config/SHOPWARE_API_PREFIX.ts

export default '/store-api'
```

## `SHOPWARE_TOKEN_COOKIE_NAME` config

Name of the cookie under which Storefront X stores Shopware context token.

```ts
// config/SHOPWARE_TOKEN_COOKIE_NAME.ts

export default 'shopware:token'
```

## `_shopware` server route

This server route is used as a proxy between Storefront X client requests and Shopware backend.
