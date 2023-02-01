# Overriding

Overriding in Storefront-x enables you to change visual or functional behaviour of one module with another module, without modifing original files. Imagine, you want to change the default template of the component or change the default behaviour of the service in some common-module, overriding is perfect match for you.

::: tip
Overriding rules are managed in the `storefront-x.config.js` file based on the position of imported module. File from later module will be used instead of the file from earlier module. If only one module is imported, the file from this module is used.
:::

Overriding is one cool things about Storefront-x. Basic information about overriding can be found in the [How it works](/getting-started/how-it-works#overriding) section.

## How to override?

Imagine, we have a `module-a` with `Logo.vue` component in `/components` concept folder. In basic setup this logo is just a logo, but with `module-b` enabled this logo should lead to homepage as link. The best way, how to do that, is to override the component.

```vue
// module-a/components/Logo.vue

<template>
  <img :src="logo" />
</template>

<script setup lang="ts">
import logo from '#ioc/assets/logo'
</script>
```

We can achieve it by creating a `components` concept folder inside a `module-b` and put a new component file with the same name there.

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

Finally, we need to use `module-b` after `module-a` in the `storefront-x.config.js` file.

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

The example above uses direct child of `components` concept.That is not a limitation, we can also override nested files. We just have to preserve the same path to the file in a new module. Let's look at the example.

```ts [module-a/.../GOOGLE_ANALYTICS_ID.ts]
// module-a/config/googleAnalytics/GOOGLE_ANALYTICS_ID.ts

export default 'G-0123456789'
```

```ts [module-b/.../GOOGLE_ANALYTICS_ID.ts]
// module-b/config/googleAnalytics/GOOGLE_ANALYTICS_ID.ts

export default 'G-9876543210'
```

Google Analytics ID is located in the `config` concept and `googleAnalytics` folder. So, we have to create the same path in the `module-b` and put the new file there.

Then, if we use `module-b` after `module-a` in the `storefront-x.config.js` file, the `GOOGLE_ANALYTICS_ID` from `module-b` will be used instead of the `GOOGLE_ANALYTICS_ID` from `module-a`.

You can find another practical example of overriding in the Cookbook section: [Override component](/cookbook/override-component).

## Which concepts support overriding?

There are many concepts that support overriding. The most common ones are:

- components
- composables
- pages
- templates
- services
- repositories
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
- tests
- cypress
- errors
- i18n
