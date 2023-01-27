# Overriding

Overriding in SFX is a process when the file with the same name from one module will be used instead of another one. This is useful when you want to change the default behaviour of the original file without modifying it. For example, you want to change the default template of the component or change the default behaviour of the service.

::: tip
Overriding can be managed in the `storefront-x.*.config.js` file based on the position of imported module. File from later imported module will be used instead of the file from earlier imported module. If only one module is imported, the file from this module will be used.
:::

Overriding is one of pillars of SFX. Basic information about overriding can be found in the [How it works](/getting-started/how-it-works#overriding) section.

## How to override?

Imagine, we have a `module-a` with `components` concept inside it that provides a component. We want to change the default behaviour of this component. The best way, how to do that, is to override the component.

```vue
// module-a/components/Logo.vue

<template>
  <img :src="logo" />
</template>

<script setup lang="ts">
import logo from '#ioc/assets/logo'
</script>
```

We can make it by creating a `components` concept inside a `module-b` and put a new component with the same name there.

```vue
// module-b/components/Logo.vue

<template>
  <RouterLink to="/">
    <img :src="logo" />
  </RouterLink>
</template>

<script setup lang="ts">
import logo from '#ioc/assets/logo'
</script>
```

Finally, we import `module-b` after `module-a` in the `storefront-x.*.config.js` file.

```js
// storefront-x.*.config.js

export default {
  modules: [
    // some modules...
    'module-a',
    // some modules...
    'module-b',
    // some modules...
  ],
}
```

The component from `module-b` will be used instead of the component from `module-a`.

Vice versa, if we import `module-b` before `module-a`, the component from `module-a` will be used. And if we import only one module (`module-a` or `module-b`), the component from that module will be used. **The components are independent of each other.**

### Nested files

The example above uses direct child of `components` concept. But, that is not a limitation, we can also override nested files. We just have to preserve the same path to the file in a new module. Let's look at the example.

::: code-group

```ts [module-a/.../GOOGLE_ANALYTICS_ID.ts]
// module-a/config/googleAnalytics/GOOGLE_ANALYTICS_ID.ts

export default 'G-0123456789'
```

```ts [module-b/.../GOOGLE_ANALYTICS_ID.ts]
// module-b/config/googleAnalytics/GOOGLE_ANALYTICS_ID.ts

export default 'G-9876543210'
```

:::

Google Analytics ID is located in the `config` concept and `googleAnalytics` folder. So, we have to create the same path in the `module-b` and put the new file there.

Then, if we import `module-b` after `module-a` in the `storefront-x.*.config.js` file, the `GOOGLE_ANALYTICS_ID` from `module-b` will be used instead of the `GOOGLE_ANALYTICS_ID` from `module-a`.

You can find another practical example of overriding in the Cookbook section: [Override component](/cookbook/override-component).

## Which concepts support overriding?

There are many concepts that support overriding. The most common ones are:

- base
- components
- composables
- pages
- templates
- services
- stores
- config
- atoms
- molecules
- organisms
- vue
- magento
- graphql
- mappers
- providers
- repositories
- tests
- cypress
- errors
