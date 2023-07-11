# Event Bus

We can emit any type of event to services we choose using the `bus` concept. Bus concept can contain these directories (we will go through them in the next sections):

- `events` - contains types of input parameters for emit function (eg. `ViewProduct.ts`)
- `listeners` - contains code, which will be called after emit function is run, for example it can send a gtag event to Google Analytics (eg. `useListenViewProduct.ts`)

```
├─ custom_module/
│  ├─ bus/
│  │  ├─ events/
└─ └─ └─ listeners/
```

## `bus/events`

If we want to emit something, we must have an event for it. This event is default exported and it should export description of input parameters of the emit function. This is especially useful for correct mapping of input data.

Let's look at the example below:

```ts
// my-module/bus/events/ViewProduct.ts

import useProduct from '#ioc/composables/useProduct'

export default interface ViewProduct {
  product: ReturnType<typeof useProduct>
}
```

This event exports `ViewProduct` interface, with a `product` key, and its value, which points to the return type structure of `useProduct` composable. So, based on the event structure above, we will call an emit function with an object as a parameter in our code later.

## `bus/listeners`

If we have an event, we probably want to have a listener, which will do some stuff with provided data (for example it will send some request to an external analytic service, like page views counter, or which item was added to a cart).

In this example, we want to have a product view listener for Google Tag Manager module, and also for Hotjar module. So we create a listener file for two modules (GTM and Hotjar) inside `bus/listeners` directory. **These files will not be overridden**, instead they will be imported and run after emit event is called in our code. File name of the listener has to follow this structure: `useListen{name-of-the-event}.ts`. So, based on the example above, the listener file should have a name `useListenViewProduct.ts`.

:::tip
Each listener should be used as a composable. <br />
We can use (add) as many listeners as we want.
:::

Let's look at an example, which will use the `ViewProduct` event from example above:

```ts{3,7}
// my-module/bus/listeners/useListenViewProduct.ts

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

The listener is a composable - a higher order function. We imported `ViewProduct` event, which we used for type checking of functions input data and correct mapping. Finally, we used a `gtag` function for emitting an event to an external service with parameters that the service needs. And, that's it. Now, we can move on to an emitting of an event.

## Emitting events

So, we already have the event and its listener. The last thing to do, is to emit an event inside our code (no matter if it is a component or a template file). All we need to do, is to import `useEmit{name-of-the-event}` from `#ioc/bus/emitters/useEmit{name-of-the-event}` as a composable.

If we didn't create a listener for the event yet, but we have an event, we still can import the emitter.

:::info
In the background, while we are building our application, SFX will go through all event files and create emitter for each of them. The emitter's work is to loop over listeners and run them. If no listener is provided, nothing will happen.
:::

Let's look at the implementation of an event and a listener we created above, in the `ProductDetail.vue` component:

```vue{6,10,13}
// my-module/templates/ProductDetail.vue

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

Now, based on the example above, we emitted a `product` which is type of `useProduct` (defined in the event file). Emit function (`emitViewProduct()`) looped over all assigned listeners and executed them.

## Prepared events

If you use integration with full Magento 2 you have access to prepared events on most common pages. Events trigger onMounted and are listed bellow. They accept `any` as parameter so you can emit everything you need.

- PageViewHomepage
- PageViewCategory
- PageViewProduct
- PageViewCmsPage
- PageViewCheckout
- PageViewAccountHomepage
- PageViewSignUp
- PageViewSignIn
- PageViewResetPassword
- PageViewSearch
- PageViewWishlist
- PageViewBrand
- PageViewBlogPost
- PageViewBlogCategory
