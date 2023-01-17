# Vue I18n

> `@storefront-x/vue-i18n`

Wrapper module around the [vue-i18n](https://www.npmjs.com/package/vue-i18n) library. It extends router to allow for translated routes, locale route prefixes and other functionalities.

It also uses the [@intlify/unplugin-vue-i18n](https://www.npmjs.com/package/@intlify/unplugin-vue-i18n) library for the `<i18n />` blocks in Vue SFCs.

## `i18n/messages/` concept

The `i18n/messages` concept allows us to add global translation messages. It contains files with names corresponding to the desired locale (`locale` field in `VUE_I18N_LOCALES`). These files default export object with translations.

This concept is not overriding on the file bases, but instead overriding on the key bases of objects inside the files. This means, that multiple `i18n/messages/en-US.json` files are merged together, instead of overridden.

### Example

```ts
// config/VUE_I18N_LOCALES.ts

import Locale from '#ioc/types/vue-i18n/Locale'

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
] as Locale[]
```

```json
// i18n/messages/en-US.json

{
  "hello": "Hello world!"
}
```

```json
// i18n/messages/cs-CZ.json

{
  "hello": "Ahoj světe!"
}
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

## `i18n/datetimes/` concept

The `i18n/datetimes` concept allows us to add global datetime formats. It contains files with names corresponding to the desired locale (`locale` field in `VUE_I18N_LOCALES`). These files default export object with formats.

This concept is not overriding on the file bases, but instead overriding on the key bases of objects inside the files. This means, that multiple `i18n/datetimes/en-US.ts` files are merged together, instead of overridden. If you have same keys inside objects, later module key is used.

:::warning
If you create new datetimes file with new language, you must have default key inside exported object. There is a fallback on default key, if you don't specify datetime format like "short", etc.
:::

### Example

```ts
// config/VUE_I18N_LOCALES.ts

import Locale from '#ioc/types/vue-i18n/Locale'

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
] as Locale[]
```

```ts
// i18n/datetimes/en-US.ts

export default {
  default: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  short: {
    month: 'short',
    day: 'numeric',
  },
}
```

```ts
// i18n/datetimes/cs-CZ.ts

export default {
  default: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  short: {
    month: 'short',
    day: 'numeric',
  },
}
```

```vue
<template>
  <h1>{{ d(new Date(), 'short') }}</h1>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'

const { d } = useI18n()
</script>
```

## `i18n/numbers/` concept

The `i18n/numbers` concept allows us to add global number formats. It contains files with names corresponding to the desired locale (`locale` field in `VUE_I18N_LOCALES`). These files default export object with formats.

This concept is not overriding on the file bases, but instead overriding on the key bases of objects inside the files. This means, that multiple `i18n/numbers/en-US.ts` files are merged together, instead of overridden. If you have same keys inside objects, later module key is used.

### Example

```ts
// config/VUE_I18N_LOCALES.ts

import Locale from '#ioc/types/vue-i18n/Locale'

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
] as Locale[]
```

```ts
// i18n/numbers/en-US.ts

export default {
  currency: {
    style: 'currency',
    currency: 'USD',
    notation: 'standard',
  },
  decimal: {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  percent: {
    style: 'percent',
    useGrouping: false,
  },
}
```

```ts
// i18n/numbers/cs-CZ.ts

export default {
  currency: {
    style: 'currency',
    currency: 'CZK',
    notation: 'standard',
  },
  decimal: {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  percent: {
    style: 'percent',
    useGrouping: false,
  },
}
```

```vue
<template>
  <h1>{{ n(3500, 'currency') }}</h1>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'

const { n } = useI18n()
</script>
```

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

Used to map route identifiers to concrete routes of the current locale. When the `@storefront-x/i18n` module is enabled, each route now contains locale identifier in it's name, so the old route names no longer work.

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

When targeting the static pages (components found in the `pages/` directory) as a parameter, you can use either the route object, like in the example above, or string containing the name of the route like this.

```typescript
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()

localePath('index') // pages/index.vue
localePath('blog') // pages/blog.vue
localePath('account/addresses') // account/addresses.vue
```

But if the pages is dynamic (resolved from the backend and handled by the `$404.vue` fallback page), use leading slash to indicate, that it is a dynamic page.

```typescript
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()

localePath('/about-us')
localePath('/blog/welcome.html')
```

## `useSwitchLocalePath` composable

Returns path of the current route for specified locale.

### Example

```vue
<template>
  <button @click="onClick">Switch to CZ</button>
</template>

<script setup lang="ts">
import useSwitchLocalePath from '#ioc/composables/useSwitchLocalePath'

const switchLocalePath = useSwitchLocalePath()

const onClick = () => {
  window.location.href = switchLocalePath('cz')
}
</script>
```

## `useCurrentLocale` composable

Returns current locale (object from the `VUE_I18N_LOCALES` array).

### Example

```vue
<script setup>
import useCurrentLocale from '#ioc/composables/useCurrentLocale'

const currentLocale = useCurrentLocale()

// one of the objects from the VUE_I18N_LOCALES array
console.log(currentLocale.value)
</script>
```

## `VUE_I18N_LOCALES` config

Contains array of locales. Each locale has to contain these fields:

- `name` Identifier of the locale. Used for switching locales
- `locale` Language. Used in `<i18n />` blocks
- `prefix` URL prefix that is added to every page
- `domain` Domain for the locale (optional)

:::tip
Any other property will be accessible via the `useCurrentLocale` composable.
:::

### Example

```ts
// config/VUE_I18N_LOCALES.ts
import Locale from '#ioc/types/vue-i18n/Locale'

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
] as Locale[]
```

### Example with multiple domains

```ts
// config/VUE_I18N_LOCALES.ts
import Locale from '#ioc/types/vue-i18n/Locale'

export default [
  {
    name: 'en',
    locale: 'en-US',
    prefix: '/',
    domain: 'my-shop.eu',
  },
  {
    name: 'cz',
    locale: 'cs-CZ',
    prefix: '/',
    domain: 'my-shop.cz',
  },
] as Locale[]
```

:::tip
The `prefix` can either be set to simple `/` (no prefix in the URL), or can be combined with custom domain (prefix: '/cz', domain: 'my-shop<area>.cz')
:::

## `VUE_I18N_ROUTE_PATHS` config

With this config, you can specify paths of pages.

Keys of the exported object correspond with original page URLs you want to remap to different URLs. Keys in those object correspond with locales `name` field in the `VUE_I18N_LOCALES` and values with the new URL.

### Example

```ts
// config/VUE_I18N_LOCALES.ts
import Locale from '#ioc/types/vue-i18n/Locale'

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
] as Locale[]
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

With this setup, the `pages/cart.vue` component will be available on the `/cart` URL in English, or on the `/cz/kosik` URL in Czech.
