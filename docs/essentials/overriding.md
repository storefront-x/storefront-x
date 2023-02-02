# Overriding

Overriding allows for the easy replacement of parts of SFX, thereby modifying, adding, or removing functionality. For example, you can easily override how adding to cart works, how header/footer looks, how the catalog is displayed etc.

Overriding works in a file-based manner, so basically any file (page, component, service, composable, etc.) can be overridden.

::: tip
Overriding rules are managed in the `storefront-x.config.js` file based on the position of imported module. The file from a later module will be used instead of the file from an earlier module. If only one module is imported, the file from that module will be used.
:::

Because of how overriding works, you can revert to the default setup at any time by disabling the module.

Overriding is a cool thing in Storefront X. Basic information about overriding can be found in the [How it works](/getting-started/how-it-works#overriding) section.

## How to override?

Imagine we have a default `module-a` with the `Header.vue` component in the `/organisms` concept.

By default, this header contains the default setup, but with `module-b` enabled, this header will be overridden to our setup. Let's imagine our company would like to have a fixed menu all the time while scrolling and a different color palette. The best way to achieve this is to override the component.

```vue
// module-a/organisms/Header.vue

<template>
  <header class="bg-white border-b-2 border-primary-400 fixed top-0 md:static z-20 left-0 right-0">
    <HeaderLinks />
    <HeaderMain />
    <HeaderMenu />
  </header>
</template>

<script setup lang="ts">
import HeaderLinks from '#ioc/molecules/HeaderLinks'
import HeaderMain from '#ioc/molecules/HeaderMain'
import HeaderMenu from '#ioc/molecules/HeaderMenu'
</script>
```

We can achieve it by creating the `organisms` concept (directory) inside a `module-b` and put a new file with the same name there.

```vue
// module-b/organisms/Header.vue

<template>
  <header class="bg-white fixed border-b-2 border-slate-500 top-0 z-20 left-0 right-0">
    <section class="bg-slate-200">
      <HeaderLinks />
    </section>
    <HeaderMain />
    <HeaderMenu />
  </header>
</template>

<script setup lang="ts">
import HeaderLinks from '#ioc/molecules/HeaderLinks'
import HeaderMain from '#ioc/molecules/HeaderMain'
import HeaderMenu from '#ioc/molecules/HeaderMenu'
</script>
```

Finally, we have to import `module-b` after `module-a` in the `storefront-x.config.js` file.

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

Vice versa, if we import `module-b` before `module-a`, the component from `module-a` will be used. And if we import only one module (`module-a` or `module-b`), the component from that module will be used. **The modules are independent of each other.**

### Nested files

The example above uses direct child of `organisms` concept. That is not a limitation, we can also override nested files. We just have to preserve the same path to the file in a new module. Let's look at the example, in which we want to change theme color to the one used by our company.

::: code-group

```html [module-a/base/templates/index.html]
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
    <meta name="theme-color" content="#FB923C" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/entry.client.ts"></script>
  </body>
</html>
```

```html [module-b/base/templates/index.html]
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
    <meta name="theme-color" content="#86B049" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/entry.client.ts"></script>
  </body>
</html>
```

:::

`index.html` is located in the `base` concept and `templates` directory. So, we have to create the same path in the `module-b` and put the new file there.

Then, if we use `module-b` after `module-a` in the `storefront-x.config.js` file, the `index.html` from `module-b` will be used instead of the `index.html` from `module-a`.

You can find another practical example of overriding in the Cookbook section: [Override component](/cookbook/override-component).

## Which concepts support overriding?

There are many concepts that support overriding. The most common ones are:

- base
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
