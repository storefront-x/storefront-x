# Catalog

> `@storefront-x/catalog`

Module for e-commerce catalog (products and categories). Requires corresponding integration module (e.g. `@storefront-x/catalog-shopware`) which provides mappers, repositories and integration specific services.

## `useProduct` composable

Wraps data returned by the `ToProduct` mapper with business logic for displaying products. Is used by [`ProductProvider`](#productprovider-provider).

:::tip
Override/extend this composable to add functionality to products.
:::

:::tip
Mutating functionality (adding to cart, adding to favorites, ...) should be in separate composables/services.
:::

## `injectProduct` composable

Used by the components wrapped in [`ProductProvider`](#productprovider-provider).

## `ProductProvider` provider

Provides result of [`useProduct`](#useproduct-composable) composable to be injected in child components.

### Example

```vue
<!-- organisms/ProductListing.vue -->

<template>
  <ProductProvider v-for="product in products" :product="product">
    <ProductTile />
  </ProductProvider>
</template>

<script setup lang="ts">
import ProductProvider from '#ioc/providers/ProductProvider'
import ProductTile from '#ioc/molecules/ProductTile'
import ToProduct from '#ioc/mappers/ToProduct'
import { PropType } from 'vue'

defineProps({
  products: {
    type: Array as PropType<ReturnType<typeof ToProduct>[]>,
    required: true,
  },
})
</script>
```

```vue
<!-- molecules/ProductTile.vue -->

<template>
  <h1>{{ product.name }}</h1>
</template>

<script setup lang="ts">
import injectProduct from '#ioc/composables/injectProduct'

const product = injectProduct()
</script>
```

## `useGetProductById` service

Service for fetching product by its ID, used for example for product detail.

## `useGetCategoryById` service

Service for fetching category by its ID. used for example for category detail.

## `useGetSearchSuggestions` service

Service for fetching search suggestions when customer is typing in search bar.

## `useGetNavigationMenu` service

Service for fetching navigation menu made from categories which can be used as simple menu instead of complex mega-menu.

:::tip
This service should be only called inside `serverInit` store action.
:::

## `CATALOG_PAGE_SIZE` config

Config value which controls how many products per page to display. If there are more products than specified, pagination appears.

```ts
// config/CATALOG_PAGE_SIZE.ts

export default 12
```
