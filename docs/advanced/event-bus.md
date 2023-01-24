# Event Bus

We can emit any type of event to services we choose using the `bus` concept. Bus concept can contains these folders, which we will go through in the next sections:

- `events` - contains type of input parameters data for emit function (eg. `ViewProduct.ts`)
- `listeners` - contains code, which will be called after emit function is run, for example it can send a gtag event to Google Analytics (eg. `useListenViewProduct.ts`)

```
├─ custom_module
│  ├─ bus
│  │  ├─ events
└─ └─ └─ listeners
```

## `bus/events`

If we want emit something, we must have an event created for it. This event is default exported and it should export what's the type of input parameters data inserted into emit function. This is especially useful for correct mapping of input data.

Let's look on the example below:

```ts
// ViewProduct.ts

import useProduct from '#ioc/composables/useProduct'

export default interface ViewProduct {
  product: ReturnType<typeof useProduct>
}
```

This event exports `ViewProduct` interface, with `product` key, and its value, which points to the return type structure of `useProduct` composable. So, based on the event structure above, we will call emit function with object as a parameter in our code, later.

## `bus/listeners`

If we have an event, we probably want to have a listener, which will do some stuff with provided data (for example send some request to external analytic service, like page views count, or which item was added to cart).

We, for example, want to have a product view listener for Google Tag Manager module, and also for Hotjar module. So, we create listener file for two modules (GTM and Hotjar) inside `bus/listeners` folder. **These files will not be overridden**, instead they all will be imported and run after emit event is called in our code. File name of the listener has to follow this structure: `useListen{name-of-the-event}.ts`. So, based on the example above, the listener file should has a name `useListenViewProduct.ts`.

:::tip
Each listener should be used as a composable. <br />
We can use (add) as many listeners as we want.
:::

Let's look on the example, which will use the `ViewProduct` event from example above:

```ts{3,7}
// useListenViewProduct.ts

import ViewProduct from '#ioc/bus/events/ViewProduct'
import PRICE_OFFSET from '#ioc/config/PRICE_OFFSET'

export default () => {
  return ({ product }: ViewProduct) => {
    gtag('event', 'view_item', {
      currency: product.finalPrice?.currency ?? '',
      value: +product.finalPrice.value / PRICE_OFFSET,
      items: [
        {
          item_id: product.sku,
          item_name: product.name,
          // affiliation: 'Google Merchandise Store',
          discount:
            product.finalPrice?.value !== product.regularPrice?.value
              ? (+product.regularPrice.value - +product.finalPrice.value) / PRICE_OFFSET
              : 0,
          item_brand: product.brand?.name ?? '',
          item_category: product.categories?.at(0)?.name ?? '',
          item_category2: product.categories?.at(1)?.name ?? '',
          item_category3: product.categories?.at(2)?.name ?? '',
          item_category4: product.categories?.at(3)?.name ?? '',
          item_category5: product.categories?.at(4)?.name ?? '',
          price: +product.regularPrice.value / PRICE_OFFSET,
        },
      ],
      product_type: product.productType ?? '',
    })
  }
}
```

The file is created as a composable, so it returns function inside an export function. We imported `ViewProduct` event, which we used for type checking of function's input data and correct mapping. Finally, we used `gtag` function for emitting event to external service with parameters the service needs and we want to provide them. And, that's it. Now, we can move on to emit the event itself.

## Emitting events

So, we already have the event and its listener. The last thing to do, is to emit event inside our code (no matter if it is a component or a template file). All we need to do, is to import `useEmit{name-of-the-event}` from `#ioc/bus/emitters/useEmit{name-of-the-event}` as a composable.

If we didn't create a listener for event yet, but we have an event, we still can import emitter.

:::info
In the background, while we are building our application, SFX will go through all event files and create emitter for each of them. The emitter's work is to loop over listeners and run them. If no listener is provided, nothing will happen.
:::

Let's look at the implementation of event and listener we created above, in the `ProductDetail.vue` component:

```vue{6,10,13}
// ProductDetail.vue

<template>...</template>
<script setup>
import injectProduct from '#ioc/composables/injectProduct'
import useEmitViewProduct from '#ioc/bus/emitters/useEmitViewProduct'
import { onMounted } from 'vue'

const product = injectProduct()
const emitViewProduct = useEmitViewProduct()

onMounted(() => {
  emitViewProduct({ product })
})
</script>
```

:::tip
We shouldn't do mapping in the emit function parameters, instead we should move mapping into listener itself.
:::

Now, based on the example above, we emitted `product` which is type of useProduct (defined in the event file). Emit function (`emitViewProduct()`) looped over all assigned listeners and run them.
