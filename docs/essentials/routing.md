# Routing

Storefront-X collects all components inside `pages/` directories and creates router out of them. Their relative path to the `pages/` directory and filename determines under which URL they will be accessible (with few exceptions). You can use our custom router as described bellow or [Vue-router ](../modules/vue-router) module.

## Static pages

`pages/index.vue` will be accessible under the root (`/`) URL.

`pages/hello.vue` will be accessible under the `/hello` URL.

`pages/foo/bar.vue` will be accessible under the `/foo/bar` URL.

If none of the pages can be matched, `pages/$404.vue` will be used. More about `$404` can be found [here](#_404).

## Dynamic parameters

Pages can define dynamic parts, that will be matched as [route parameters](https://router.vuejs.org/guide/essentials/dynamic-matching.html).

`pages/hello/[name].vue` will match `/hello/Pat`, `hello/Mat` and similar URLs.

## Layouts

Layouts are set by adding special `$layout.vue` page. This component will set layout for all pages in the same directory and in all of the children directories unless some directory override it with its own layout.

```
pages/
  $layout.vue # layout A
  index.vue # will use layout A
  category.vue # will use layout A
  checkout/
    $layout.vue # layout B
    index.vue # will use layout B
  account/
    index.vue # will use layout A
    orders.vue # will use layout A
```

## Global component

The `$app.vue` component, which can be found in the root of the `pages/` directory is global component wrapping around the whole application. It can be used for apply global styles, or add elements that should be visible on every page and every layout (e.g. global banners).

By default, this component is empty and looks like this:

```vue
<!-- pages/$app.vue -->

<template>
  <SfxAppOutlet />
</template>

<script setup lang="ts">
import SfxAppOutlet from '#ioc/components/SfxAppOutlet'
</script>
```

## `RouterLink` component

This is our custom component working similarly to [`Vue-router RouterLink`](https://router.vuejs.org/api/#to). It can be imported from IoC.

### Props

- `to: string|object` - string with target path or routePath object.
- `exactActiveClass?: string` - classes to be added to link when matched with current route.
- `exactInactiveClass?: string` - classes to be added to link when not matched with current route.

### Example

```vue
<template>
  <RouterLink to="/">Home</RouterLink>
</template>

<script setup lang="ts">
import RouterLink from '#ioc/components/RouterLink'
</script>
```

:::tip
The `RouterLink` component is accessible globally without needing to be imported. Importing it over IoC allows for better intellisense support.
:::

## `SfxLayoutOutlet` component

Used in layouts to define where the page should be rendered.

### Example

```vue
<!-- pages/$layout.vue -->

<template>
  <Header />
  <SfxLayoutOutlet />
  <Footer />
</template>

<script setup lang="ts">
import SfxLayoutOutlet from '#ioc/components/SfxLayoutOutlet'
import Header from '#ioc/components/Header'
import Footer from '#ioc/components/Footer'
</script>
```

## `SfxAppOutlet` component

Used in special `$app.vue` page, to define where the rest of the app should be rendered.

### Example

```vue
<!-- pages/$app.vue -->

<template>
  <div>Global banner!</div>
  <SfxAppOutlet />
</template>

<script setup lang="ts">
import SfxAppOutlet from '#ioc/components/SfxAppOutlet'
import '#ioc/assets/style' // global style
</script>
```

## `useRoute` composable

This is our custom composable inspired by [`Vue-router useRoute`](https://router.vuejs.org/api/index.html#useroute)

### Properties

- `path: string` - current path without query and hash.
- `fullPath: string` - current path with query and hash.
- `params: object` - object of params passed with navigation.
- `query: object` - object of query params passed with navigation.
- `hash: string` - hash passed with navigation

### Example

```vue
<!-- pages/hello/[name].vue -->

<template>
  <h1>{{ route.params.name }}</h1>
</template>

<script setup lang="ts">
import useRoute from '#ioc/composables/useRoute'

const route = useRoute()
</script>
```

## `useRouter` composable

This is our custom composable inspired by [`Vue-router useRouter`](https://router.vuejs.org/api/index.html#userouter).

### Properties

- `push: function` - navigate to passed path or routePath object.
- `replace: function` - navigate without making a record in browser history.
- `resolve: function` - resolve passed path or routePath object to path or fullPath.

### Example

```vue
<template>
  <button @click="onClick">Go to cart.</button>
</template>

<script setup lang="ts">
import useRouter from '#ioc/composables/useRouter'

const router = useRouter()

const onClick = () => {
  router.push('/cart')
}
</script>
```

## $404

This is our custom page component to handle all the unmatched routes. Typically it is used to match unknown paths like products or categories from catalog. You will recieve `router.$pathMatch` as prop passed from `SfxLayoutOutlet.vue`, containing matched path. You can use it for example in `urlResolver` to get copoment to render.

### Example

```vue
<!-- pages/$404.vue -->
<template>
  <Component :is="component" v-if="component" :id="id" :relative-url="relativeUrl" />
  <NotFound v-else />
</template>

<script setup lang="ts">
import NotFound from '#ioc/templates/NotFound'
import useUrlResolver from '#ioc/services/useUrlResolver'

import isArray from '#ioc/utils/isArray'

const urlResover = useUrlResolver()
const props = defineProps({
  pathMatch: { type: String, required: true },
})

const { id, component, relativeUrl } = await urlResover(pathMatch)
</script>
```

## Response status

Using `setResponseStatus` composable you can set response status code.

### Parameter

- `number` - response status to send with SSR response.

### Example

```vue
<template>
  <h1>404 Not Found</h1>
</template>
<script setup lang="ts">
import useSetResponseStatus from '#ioc/composables/useSetResponseStatus'

const setResponseStatus = useSetResponseStatus()

setResponseStatus(404)
</script>
```

## Redirecting

Using `redirect` utility, you can achieve smooth redirect from server or client side.

### Parameters

- `url: string` - string with target path.
- `status?: number` - status, which you want to pass together with redirect. Default value is 301 _(this parameter is optional)_.

### Example

```vue
<template>
  <h1>Account</h1>
</template>
<script setup lang="ts">
import redirect from '#ioc/utils/redirect'
// redirect, because user is not signed in.
redirect('/login', 301)
</script>
```
