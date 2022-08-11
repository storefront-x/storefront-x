# Shopware

> `@storefront-x/shopware`

This module provides basic functionality for Shopware integration.

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
import useToProduct from '#ioc/mappers/useToProduct'

export default () => {
  const shopware = useShopware()
  const toProduct = useToProduct()

  return async (
    ids: string[],
  ): Promise<{
    products: ReturnType<typeof toProduct>[]
  }> => {
    const response = await shopware.post(`/product`, {
      ids: ids,
    })

    return {
      products: response.elements.map(toProduct),
    }
  }
}
```

## `useShopwareCmsBlock` composable

Used to return styling for parent element in dynamic block.

Every CMS block has its own composable.

### Example

```vue
<!-- shopware/cms/blocks/text-two-column.vue -->

<template>
  <div class="relative bg-center" :style="shopwareCmsBlock.styles">
    <div class="grid grid-cols-2 gap-x-10">
      <slot name="left" />
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useShopwareCmsBlock from '#ioc/composables/useShopwareCmsBlock'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const shopwareCmsBlock = useShopwareCmsBlock(props)
</script>
```

## `SfxShopwareCmsPage` component

Component for rendering CMS blocks and its slots from data fetched from Shopware.

### Example

```vue
<!-- shopware/dynamicPages/frontend.landing.page.vue -->

<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    <SfxShopwareCmsPage :data="data" />
  </Container>
</template>

<script setup lang="ts">
import useGetLandingPage from '#ioc/services/useGetLandingPage'
import SfxShopwareCmsPage from '#ioc/components/SfxShopwareCmsPage'
import useAsyncData from '#ioc/composables/useAsyncData'
import Container from '#ioc/atoms/Container'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const getLandingPage = useGetLandingPage()

const { data } = await useAsyncData('landingPage', () => getLandingPage(props.id))
</script>
```

## `ShopwareCmsBlocks` concept

Concept generates all Shopware dynamic blocks.

CMS blocks must have same name as property 'type' in response from Shopware API.

## `SHOPWARE_URL` config

Url of the Shopware instance.

```ts
// config/SHOPWARE_URL.ts

export default 'https://my-store.shopware.com'
```

## `SHOPWARE_ACCESS_KEY` config

Access key to your Shopware instance.

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

##

## `_shopware` server route

This server route is used as a proxy between Storefront X client requests and Shopware backend.
