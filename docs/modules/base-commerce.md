# Base Commerce

> `@storefront-x/base-commerce`

This module contains general concepts, components, utilities, functionalities and best practices for e-commerce storefronts.

### Data-flow

This module contains multiple concepts establishing general data-flow in Storefront X applications: `repositories/`, `mappers/` and `services/`. Detailed documentation of these concepts can be found later on this page, but generally they work like this:

**Repositories** are responsible for communication with backend. Their job is to abstract away the implementation logic, so they are safe to use and maintain mostly the same interface between backend integrations. They can be found in integration-specific modules (`catalog-magento`, etc.).

**Mappers** are responsible for mapping data between Storefront X and backend integrations. Because different backends return different data, but Storefront X needs data in certain shape, we use mappers to transform data returned from backend to data acceptable by Storefront X. Most of the times, they are used by repositories. They can be found in integration-specific modules (`catalog-magento`, etc.).

**Services** wrap repositories with business and application logic. For example, when logging-in the user, logged-in user only does the network request retrieving customer token. Log-in service will use this token, store it in cookies and reload the application.

:::tip
Use server routes as proxies to decrease number of DNS requests and to improve caching.
:::

## `formatters/money/` concept

Money formatters are responsible for rendering money. Their file name matches the currency they are formatting (`EUR.ts`, `USD.ts`, `CZK.ts`), and they export function which accepts numerical value that needs to be formatted.

Formatters are not manually imported anywhere. Instead, they are used by the [`SfxMoney`](#sfxmoney-component) component.

### Example

```ts
// formatters/money/EUR.ts

export default (value: number) => {
  const sign = value < 0 ? '-' : ''
  const rounded = Math.abs(value.toFixed(2))

  return sign + '€' + rounded
}
```

## `gql/fragments/` IoC concept

IoC concept containing GraphQL fragments.

### Example

```ts
// gql/fragments/Product.ts

import { fragment, field } from '@storefront-x/base-commerce/adapters/GraphQL'

export default (name = 'product') =>
  fragment(name, 'ProductInterface', {
    id: field(),
    sku: field(),
    name: field(),
  })
```

## `gql/mutations/` IoC concept

IoC concept containing GraphQL mutations.

### Example

```ts
// gql/mutations/CreateEmptyCart.ts

import { mutation, field } from '@storefront-x/base-commerce/adapters/GraphQL'

export default () =>
  mutation({
    createEmptyCart: field(),
  })
```

## `gql/queries/` IoC concept

IoC concept containing GraphQL queries.

### Example

```ts
// gql/queries/Product.ts

import { query, field } from '@storefront-x/base-commerce/adapters/GraphQL'
import Cart from '#ioc/gql/fragments/Cart'

export default () =>
  query()
    .variables({
      $cartId: 'String!',
    })
    .fields({
      cart: field('cart')
        .args({
          cart_id: '$cartId',
        })
        .fields({
          ...Cart(),
        }),
    })
```

## `mappers/` IoC concept

IoC concept for mappers.

## `providers/` IoC concept

Providers are used when sharing non-global data/logic between multiple components where prop drilling and composables would be too expensive. Product is great example, because it can appear multiple times on one page (local data), but it is used by a lot of components (ProductTile, AddToCart, etc.).

### Example

```vue
<!-- providers/ProductProvider.vue -->

<template>
  <slot />
</template>

<script setup lang="ts">
import ToProduct from '#ioc/mappers/ToProduct'
import provideProduct from '#ioc/composables/provideProduct'
import { computed, PropType } from 'vue'

const props = defineProps({
  product: {
    type: Object as PropType<ReturnType<typeof ToProduct>>,
    required: true,
  },
})

provideProduct(computed(() => props.product))
</script>
```

```vue
<template>
  <ProductProvider v-for="product in products" :key="product.id" :product="product">
    <ProductTile />
  </ProductProvider>
</template>

<script setup lang="ts">
import ProductProvider from '#ioc/providers/ProductProvider'
import ProductTile from '#ioc/components/ProductTile'

defineProps({
  products: {
    type: Array,
    required: true,
  },
})
</script>
```

```vue
<!-- components/ProductTile.vue -->

<template>
  <h1>{{ product.name }}</h1>
</template>

<script setup lang="ts">
import injectProduct from '#ioc/composables/injectProduct'

const product = injectProduct()
</script>
```

## `repositories/` IoC concept

Repositories are composables (higher-order functions). First function is synchronous and contains calls to other composables. It returns second, asynchronous, function which is responsible for the actual communication with a backend.

It is a good idea to return object from the asynchronous function, to allow for additional values to be returned in a future.

### Example

```ts
// repositories/useGetProductByIdRepository.ts

import ProductDetail from '#ioc/graphql/queries/ProductDetail'
import useMagento from '#ioc/composables/useMagento'
import ToProduct from '#ioc/mappers/ToProduct'

export default () => {
  const magento = useMagento()

  return async (
    id: string,
  ): Promise<{
    product: ReturnType<typeof ToProduct>
  }> => {
    const {
      data: { products },
    } = await magento.graphql(
      ProductDetail().with({
        urlKey: id,
      }),
    )

    return {
      product: ToProduct(products?.items?.find((item: any) => item.url_key === id) || []),
    }
  }
}
```

## `validators/` concept

Validators are functions accepting value they are validating. They are not manually imported, but instead, indirectly used by the [`SfxInput`](#sfxinput-component) component.

### Example

```js
// validators/required.js

export default function required(value) {
  return !!value || this.$t('Required')
}
```

```js
// validators/email.js

import { isEmail } from '@storefront-x/utils/ValidationUtils'

export default function email(value) {
  return isEmail(value) || this.$('Invalid email format')
}
```

```vue
<template>
  <SfxInput name="firstName" validators="required|email" />
</template>

<script setup>
import SfxInput from '#ioc/components/SfxInput'
</script>
```

### Arguments

Validators can also accept arguments. They are comma separated, and they are separated by colon after validator identifier.

```js
// validators/between.js

export default function between(value, min, max) {
  if (value.length < min) return this.$t('At least {0} characters', [min])
  if (value.length > max) return this.$t('At maximum {0} characters', [max])
  return true
}
```

```vue
<template>
  <SfxInput name="firstName" validators="between:3,30" />
</template>

<script setup>
import SfxInput from '#ioc/components/SfxInput'
</script>
```

## `SfxForm` component

Component used for representing forms. It is used in combination with [`SfxInput`](#sfxinput-component).

### Example

```vue
<template>
  <SfxForm @submit="onSubmit">
    <SfxInput name="firstName" validators="required|min:3" />
    <SfxInput name="lastName" validators="required|min:3" />
    <button type="submit">Submit</button>
  </SfxForm>
</template>

<script setup>
import SfxForm from '#ioc/components/SfxForm'
import SfxInput from '#ioc/components/SfxInput'

// onSubmit won't be called unless all validations pass
const onSubmit = ({ firstName, lastName }) => {
  console.log(firstName + ' ' + lastName)
}
</script>
```

## `SfxImage` component

Component for lazy loading and resizing images. `SfxImage` uses image resizer on the server to compress and resize images, to improve loading speed.

### Example

```vue
<template>
  <SfxImage src="/logo.jpg" alt="Logo" :width="100" :height="100" fit="cover" />
</template>

<script setup lang="ts">
import SfxImage from '#ioc/components/SfxImage'
</script>
```

## `SfxInput` component

Component used in `SfxForm`. It is recommended to create your own input component with styles and better markup, which will extend functionality from `SfxInput`.

### Example

```vue
<template>
  <div>
    <Label v-if="label" class="mb-1" :for="prefixedName" :required="isRequired">{{ label }}</Label>

    <Input
      :id="prefixedName"
      class="w-full"
      :value="innerValue"
      :type="type || 'text'"
      :inputmode="inputmode"
      :name="name"
      :autocomplete="autocomplete"
      :color="color"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="onInput"
      @blur="onBlur"
    />

    <Error v-if="showFeedback && isInvalid" :errors="errors" />
  </div>
</template>

<script>
import SfxInput from '#ioc/components/SfxInput'
import Input from '#ioc/atoms/Input'
import Label from '#ioc/atoms/Label'
import Error from '#ioc/atoms/Error'

export default {
  components: {
    Input,
    Label,
    Error,
  },

  extends: SfxInput,

  props: {
    label: {
      type: String,
      default: null,
    },
    autocomplete: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    inputmode: {
      type: String,
      default: '',
    },
  },

  computed: {
    color() {
      if (this.showFeedback && this.isInvalid) return 'red'

      return 'light'
    },
  },
}
</script>
```

## `SfxMoney` component

Component for rendering money. It either renders money directly into an element set by the `el` prop (`<span>` by default), or you can provide it with default slot and render provided HTML.

### Simple usage

```vue
<template>
  <SfxMoney :money="product.finalPrice" />
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import injectProduct from '#ioc/composables/injectProduct'

const product = injectProduct()
</script>
```

### Slot usage

```vue
<template>
  <SfxMoney :money="product.finalPrice" v-slot="{ html }">
    <marquee v-html="`Final offer ${html}!`" />
  </SfxMoney>
</template>

<script setup lang="ts">
import SfxMoney from '#ioc/components/SfxMoney'
import injectProduct from '#ioc/composables/injectProduct'

const product = injectProduct()
</script>
```

## `useBlockBodyFromScrolling` composable

Blocks HTML body from scrolling, when component, in which this composable is used, is mounted. When component is unmounted, body scroll is unblocked.

:::tip
Useful in modals, drawers and other pop-up style components.
:::

### Example

```vue
<!-- atoms/Drawer.vue -->

<template>
  <Teleport to="body">
    <div class="fixed inset-0">
      <slot />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import useBlockBodyFromScrolling from '#ioc/composables/useBlockBodyFromScrolling'

useBlockBodyFromScrolling()
</script>
```

## `useNotifications` composable

Returns list of all currently visible notifications. Should be used by component responsible for drawing list of notifications.

## `useShowNotification` composable

General purpose composable for showing notifications. There are also helper composables for displaying different notification types.

### Example

```vue
<!-- molecules/AddToCart.vue -->

<template>
  <Button @click="onClick">Add to cart</Button>
</template>

<script setup lang="ts">
import Button from '#ioc/atoms/Button'
import injectProduct from '#ioc/composables/injectProduct'
import useAddToCart from '#ioc/services/useAddToCart'
import useShowSuccessNotification from '#ioc/composables/useShowSuccessNotification'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'

const product = injectProduct()
const addToCart = useAddToCart()
const showSuccessNotification = useShowSuccessNotification()
const showErrorNotification = useShowErrorNotification()

const onClick = async () => {
  try {
    await addToCart(product)

    showSuccessNotification('Added to cart', `Product ${product.name} was added to cart`)
  } catch (e) {
    showErrorNotification(e)
  }
}
</script>
```

## `useHideNotification` composable

Composable for hiding notifications. Should be used by component responsible for drawing single notification.

## `useShowSuccessNotification` composable

Helper composable for displaying success notifications.

## `useShowErrorNotification` composable

Helper composable for displaying caught errors.

## `CACHE_ID` config

:::warning
Advanced config!
:::

Every Storefront X request contains `CACHE_ID`, so by changing it, every request will bypass existing cache, fetch new data and cache them. Because `CACHE_ID` is tied to every request, changing it will cause higher server load for a brief time due to higher cache miss rate, until all of the requests are cached again.

## `PRICE_OFFSET` config

:::warning
Advanced config!
:::

Storefront X doesn't store money as float, but instead as natural numbers. `PRICE_OFFSET` is used as multiplier of every money value coming from backend, so that values like 1.99, 2.5 are instead represented as 199 and 250.

## `pageViewLabel` event

Prepared event for labeling the page. More about events and listeners [here](/advanced/event-bus.html).

### Properties

- `label: string` - label of page

### Example

```vue
<!-- pages/index.vue -->

<template>
  <Heading>Homepage</Heading>
</template>

<script setup lang="ts">
import Heading from '#ioc/atoms/Heading'
import { onMounted } from 'vue'
import useEmitPageViewLabel from '#ioc/bus/emitters/useEmitPageViewLabel'
import PAGE_LABELS from '#ioc/config/PAGE_LABELS'

const emitPageViewLabel = useEmitPageViewLabel()

onMounted(() => {
  emitPageViewLabel(PAGE_LABELS.HOMEPAGE)
})
</script>
```

## `PAGE_LABELS` config

Together with `pageViewLabel` event you can use default labels config for diferent page types.

```ts
// config/PAGE_LABELS.ts

export default {
  HOMEPAGE: 'home-page',
  PRODUCT: 'product-detail-page',
  CATEGORY: 'category-detail-page',
  CMS_PAGE: 'cms-page',
  AMASTY_BRAND: 'brand-detail-page',
  AMASTY_BLOG_POST: 'blog-post-detail-page',
  AMASTY_BLOG_CATEGORY: 'blog-category-detail-page',
  WISHLIST: 'wishlist-page',
  CHECKOUT: 'checkout-page',
  ACCOUNT: 'account-page',
  SIGN_IN: 'sign-in-page',
  SIGN_UP: 'sign-up-page',
  SEARCH: 'search-page',
  RESET_PASSWORD: 'reset-password-page',
}
```
