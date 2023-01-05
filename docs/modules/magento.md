# Magento

> `@storefront-x/magento`

This module provides basic functionality for Magento integration.

## `magento/dynamicPages/` concept

If we want pretty urls (`/nivea`, `/playstation-5`, ...), we need dynamic pages whose type & content is resolved by the backend.

This concept is for components representing dynamic pages resolved by the Magento URL resolver. Their name has to equal to the `type` value returned by the URL resolver.

- `magento/dynamicPages/PRODUCT.vue` - renders product
- `magento/dynamicPages/CATEGORY.vue` - renders category
- `magento/dynamicPages/CMS_PAGE.vue` - renders cms page

## `useMagento` composable

Used to make API requests to Magento.

The composable returns an object containing methods for making requests to different endpoints:

- `graphql: (graphql: any) => { data: any, errors: any }`

### Example

```ts
// repositories/useGetProductsBySearch.ts

import useMagento from '#ioc/composables/useMagento'
import Products from '#ioc/graphql/queries/Products'
import ToProduct from '#ioc/mappers/ToProduct'

export default () => {
  const magento = useMagento()

  return async (
    search: string,
  ): Promise<{
    products: ReturnType<typeof ToProduct>[]
  }> => {
    const { data } = await magento.graphql(Products().with({ search }))

    return {
      products: data.products.items.map(ToProduct),
    }
  }
}
```

## `MAGENTO_URL` config

URL of the Magento instance. You need to Override it by adding `config/MAGENTO_URL.ts` to your module. To see how overriding works click [here](../getting-started/how-it-works.html#overriding)

:::warning
This config variable needs to be overrided because it does not contain any value by default!
:::

```ts
// config/MAGENTO_URL.ts

export default 'https://my-store.magento.com'
```

## `MAGENTO_GRAPHQL_ENDPOINT` config

Prefix for the GraphQL endpoint.

```ts
// config/MAGENTO_GRAPHQL_ENDPOINT.ts

export default '/graphql'
```

## `_magento` server route

This server route is used as a proxy between Storefront X client requests and Magento backend.
