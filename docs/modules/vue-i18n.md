# Vue I18n

> `@storefront-x/vue-i18n`

Wrapper module around the [vue-i18n](https://www.npmjs.com/package/vue-i18n) library. It extends router to allow for translated routes, locale route prefixes and other functionalities.

It also uses the [@intlify/vite-plugin-vue-i18n](https://www.npmjs.com/package/@intlify/vite-plugin-vue-i18n) library for the `<i18n />` blocks in Vue SFCs.

## `i18n/messages/` concept

The `i18n/messages` concept allows us to add global translation messages. It contains files with names corresponding to the desired locale (`locale` field in `VUE_I18N_LOCALES`). These files default export object with translations.

This concept is not overriding on the file bases, but instead overriding on the key bases of objects inside the files. This means that multiple `i18n/messages/en-US.ts` files are merged together, instead of overridden.

### Example

```ts
// config/VUE_I18N_LOCALES.ts

export default [
  {
    name: 'en',
    locale: 'en-US',
    prefix: '/',
  },
  {
    name: 'cz',
    locale: 'cs-CZ',
    prefix: '/cz',
  },
]
```

```ts
// i18n/messages/en-US.ts

export default [
  hello: "Hello world!"
]
```

```ts
// i18n/messages/cs-CZ.ts

export default [
  hello: "Ahoj světe!"
]
```

```vue
<template>
  <h1>{{ t('hello') }}</h1>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()
</script>
```

:::tip
Try to avoid using global messages and instead use `<i18n>` blocks in Vue components.
:::

## `useI18n` composable

Wrapper around the `useI18n` composable.

:::tip
Use the IoC version instead of direct import from the `vue-i18n` library for better decoupling.
:::

### Example

```vue
<template>
  <h1>{{ t('msg') }}</h1>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'

const { t } = useI18n()
</script>

<i18n lang="yaml">
en-US:
  msg: Hello, World!
cs-CZ:
  msg: Ahoj, Světe!
</i18n>
```

## `useLocalePath` composable

Used to map route identifiers to concrete routes of the current locale. When the `@storefront-x/i18n` module is enabled, each route now contains locale identifier in it's name so the old route names no longer work.

### Example

```vue
<template>
  <RouterLink :to="localePath({ name: 'index' })">Home</RouterLink>
</template>

<script setup lang="ts">
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()
</script>
```

## Static vs dynamic pages

When targeting the static pages (components found in the `pages/` directory), as a parameter, you can use either the route object like in the example above or string containing the name of the route like this.

```typescript
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()

localePath('index') // pages/index.vue
localePath('blog') // pages/blog.vue
localePath('account/addresses') // account/addresses.vue
```

But if the pages is dynamic (resolved from the backend and handled by the `$404.vue` fallback page), use leading slash to indicate that it is an dynamic page.

```typescript
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()

localePath('/about-us')
localePath('/blog/welcome.html')
```

## `useSwitchLocalePath` composable

Used for switching between the locales while staying on the current page.

### Example

```vue
<template>
  <button @click="onClick">Switch to CZ</button>
</template>

<script setup lang="ts">
import useSwitchLocalePath from '#ioc/composables/useSwitchLocalePath'

const switchLocalePath = useSwitchLocalePath()

const onClick = () => {
  switchLocalePath('cz')
}
</script>
```

## `VUE_I18N_LOCALES` config

Contains array of locales. Each locale has to contain these fields:

- `name` Identifier of the locale. Used for switching locales.
- `locale` Language. Used in `<i18n />` blocks.
- `prefix` URL prefix that is added to every page.

### Example

```ts
// config/VUE_I18N_LOCALES.ts

export default [
  {
    name: 'en',
    locale: 'en-US',
    prefix: '/',
  },
  {
    name: 'cz',
    locale: 'cs-CZ',
    prefix: '/cz',
  },
]
```

## `VUE_I18N_ROUTE_PATHS` config

With this config, you can paths of pages.

Keys of the exported object correspond with original page URLs you want to remap to different URLs. Keys in those object correspond with locales `name` field in the `VUE_I18N_LOCALES` and values with the new URL.

### Example

```ts
// config/VUE_I18N_LOCALES.ts

export default [
  {
    name: 'en',
    locale: 'en-US',
    prefix: '/',
  },
  {
    name: 'cz',
    locale: 'cs-CZ',
    prefix: '/cz',
  },
]
```

```ts
// config/VUE_I18N_ROUTE_PATHS.ts

export default {
  '/cart': {
    en: '/cart',
    cz: '/kosik',
  },
}
```

With this setup, the `pages/cart.vue` component will be available on the `/cart` URL in english, or on the `/cz/kosik` URL in czech.
