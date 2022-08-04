# Vue I18n

> `@storefront-x/vue-i18n`

Wrapper module around the [vue-i18n](https://www.npmjs.com/package/vue-i18n) library. It extends router to allow for translated routes, locale route prefixes and other functionalities.

It also uses the [@intlify/vite-plugin-vue-i18n](https://www.npmjs.com/package/@intlify/vite-plugin-vue-i18n) library for the `<i18n />` blocks in Vue SFCs.

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

## Example

```vue
<template>
  <RouterLink :to="localePath({ name: 'index' })">Home</RouterLink>
</template>

<script setup lang="ts">
import useLocalePath from '#ioc/composables/useLocalePath'

const localePath = useLocalePath()
</script>
```

## `useSwitchLocalePath` composable

Used for switching between the locales while staying on the current page.

## Example

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

## Example

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
