# Wishlist

> `@storefront-x/wishlist`

Module for e-commerce wishlist. Requires corresponding integration module (e.g. `@storefront-x/wishlist-shopware`).

## `useWishlist` composable

Returns wishlist.

### Example

```vue
<!-- templates/Wishlist.vue -->

<template>
  <Heading>Wishlist</Heading>
  <ProductProvider v-for="item in wishlist.items" :product="item.product">
    <ProductTile />
  </ProductProvider>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import ProductProvider from '#ioc/providers/ProductProvider'
import ProductTile from '#ioc/molecules/ProductTile'
import useWishlist from '#ioc/composables/useWishlist'

const wishlist = useWishlist()
</script>
```

## `useAddToWishlist` service

Adds product to wishlist.

### Example

```vue
<!-- molecules/AddToWishlist.vue -->

<template>
  <Button @click="onClick">Add to wishlist</Button>
</template>

<script setup lang="ts">
import Button from '#ioc/atoms/Button'
import injectProduct from '#ioc/composables/injectProduct'
import useAddToWishlist from '#ioc/services/useAddToWishlist'

const product = injectProduct()
const addToWishlist = useAddToWishlist()

const onClick = async () => {
  await addToWishlist(product)
}
</script>
```

## `useRemoveFromWishlist` service

Removes product from wishlist.

## `useMergeWishlist` service

Merges local wishlist with wishlist of currently signed in customer. Should be called before call to `useGetWishlist` service, so that local wishlist isn't polluted with customer wishlist.

## `useWishlistStore` store

Stores state of the wishlist. Should be initialized in `serverInit` action.
Will set local wishlist to state, if there is currently signed customer, it will get his wishlist and merge it with local one.
