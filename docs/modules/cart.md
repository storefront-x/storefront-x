# Cart

> `@storefront-x/cart`

Module for e-commerce cart. Requires corresponding integration module (e.g. `@storefront-x/cart-shopware`) which provides mappers, repositories and integration specific services.

## `useCart` composable

Composable for providing presentation logic for cart (prices, taxes, number of items in cart, etc.).

:::tip
Override/extend this composable to add presentation functionality to cart.
:::

:::tip
Mutating functionality (adding to cart, removing from cart, etc.) should be in separate composables/services.
:::

## `useCartItem` composable

Composable for providing presentation logic for cart items (price, quantity, etc.).

:::tip
Override/extend this composable to add presentation functionality to cart items.
:::

:::tip
Mutating functionality (updating quantity, etc.) should be in separate composables/services.
:::

## `injectCartItem` composable

Used by components wrapped in [CartItemProvider](#cartitemprovider-provider) to inject result of [useCartItem](#usecartitem-composable) composable.

## `CartItemProvider` provider

Provides result of [`useCartItem`](#usecartitem-composable) composable to be injected into nested components.

### Example

```vue
<!-- organisms/OrderSummary.vue -->

<template>
  <CartItemProvider v-for="cartItem in cartItems" :cart-item="cartItem">
    <OrderSummaryItem />
  </CartItemProvider>
</template>

<script setup lang="ts">
import CartItemProvider from '#ioc/providers/CartItemProvider'
import OrderSummaryItem from '#ioc/molecules/OrderSummaryItem'
import ToCartItem from '#ioc/mappers/ToCartItem'
import { PropType } from 'vue'

defineProps({
  cartItems: {
    type: Array as PropType<ReturnType<typeof ToCartItem>[]>,
    required: true,
  },
})
</script>
```

```vue
<!-- molecules/OrderSummaryItem.vue -->

<template>
  <h1>{{ cartItem.name }}</h1>
</template>

<script setup lang="ts">
import injectCartItem from '#ioc/composables/injectCartItem'

const cartItem = injectCartItem()
</script>
```

## `useGetCart` service

Returns full state of cart (items, prices, coupons, etc.).

## `useAddToCart` service

Adds product to cart.

## `useRemoveFromCart` service

Removes item from cart.

## `useUpdateCartItem` service

Updates cart item (e.g. changes quantity).

## `useCartStore` store

Used for storing global state. Should be initialized in `serverInit` action in corresponding integration module.
