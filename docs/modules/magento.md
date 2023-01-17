# Magento

> `@storefront-x/magento`

This module provides basic functionality for Magento integration.

## `magento/dynamicPages/` concept

If we want to have pretty urls (`/nivea`, `/playstation-5`, etc.), we need dynamic pages whose type & content is resolved by the backend.

This concept is for components representing dynamic pages resolved by the Magento URL resolver. Their name has to be equal to the `type` value returned by the URL resolver.

- `magento/dynamicPages/PRODUCT.vue` - renders product
- `magento/dynamicPages/CATEGORY.vue` - renders category
- `magento/dynamicPages/CMS_PAGE.vue` - renders cms page

## `magento/beforeRequest/` concept

This concept allows you to hook before every request to Magento. It expects a composable which returns an async function with single parameter `Request`.

### Example

```typescript
// magento/beforeRequest/useLogEveryRequestUrl.ts

export default () => {
  // Here you can use other composables

  return async (request: Request) => {
    console.log(request.url)
  }
}
```

## `magento/afterResponse/` concept

This concept allows you to hook after every response from Magento. It expects a composable which returns an async function with two parameters `Response` and `Request`.

### Example

```typescript
// magento/afterResponse/useLogEveryResponseUrl.ts

export default () => {
  // Here you can use other composables

  return async (response: Response, request: Request) => {
    console.log(response.url)
  }
}
```

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

URL of the Magento instance. You need to override it by adding `config/MAGENTO_URL.ts` to your module. To see how overriding works, click [here](/getting-started/how-it-works.html#overriding).

:::warning
This config variable needs to be overrided, because it doesn't contain any value by default!
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
