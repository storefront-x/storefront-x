# Overriding

Overriding allows for the easy replacement of parts of SFX, thereby modifying, adding, or removing functionality. For example, you can easily override how adding to cart works, how header/footer looks, how the catalog is displayed etc.

Overriding works in a file-based manner, so basically any file (page, component, service, composable, etc.) can be overridden.

::: tip
Overriding rules are managed in the `storefront-x.config.js` file based on the position of imported module. The file from a later module will be used instead of the file from an earlier module. If only one module is imported, the file from that module will be used.
:::

Overriding is one of the primary feature that allows Storefront X to be extremely flexible and performant at the same time.

## How to override?

Imagine we have a default `module-a` with the `Header.vue` in the components' directory.

By default, this header contains the default setup, but with `module-b` enabled, this header will be overridden to our setup. Let's imagine our company would like to have a fixed menu all the time while scrolling and a different color palette. The best way to achieve this is to override the component.

```vue
// module-a/components/Header.vue

<template>
  <header class="bg-white border-b-2 border-primary-400 fixed top-0 md:static z-20 left-0 right-0">
    <Logo />
    <SearchBar />
    <MicroCart />
  </header>
</template>

<script setup lang="ts">
import Logo from '#ioc/components/Logo'
import SearchBar from '#ioc/components/SearchBar'
import MicroCart from '#ioc/components/MicroCart'
</script>
```

We can achieve it by creating the `components` concept (directory) inside a `module-b` and put a new file with the same name there.

```vue
// module-b/components/Header.vue

<template>
  <header class="bg-slate-200 fixed border-b-2 border-slate-500 top-0 z-20 left-0 right-0">
    <Logo />
    <SearchBar />
    <MicroCart />
  </header>
</template>

<script setup lang="ts">
import Logo from '#ioc/components/Logo'
import SearchBar from '#ioc/components/SearchBar'
import MicroCart from '#ioc/components/MicroCart'
</script>
```

Finally, we have to import `module-b` after `module-a` in the `storefront-x.config.js` file.

```js
// storefront-x.config.js

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

The example above uses direct child of `components` concept. That is not a limitation, we can also override nested files. We just have to preserve the same path to the file in a new module. Let's look at the example, in which we want to change default copyright text.

::: code-group

```vue [module-a/components/app/Footer.vue]
<template>
  <section class="footer">
    <Logo />
    <div class="text-center">Copyright 2013-2023 Magento, Inc. All rights reserved.</div>
    <BackToTop />
  </section>
</template>

<script setup>
import Logo from '#ioc/components/Logo'
import CopyrightInfo from '#ioc/components/CopyrightInfo'
import BackToTop from '#ioc/components/BackToTop'
</script>
```

```vue [module-b/components/app/Footer.vue]
<template>
  <section class="footer">
    <Logo />
    <div class="text-center">Copyright 2013-2023 Our Test Company, a.s. All rights reserved.</div>
    <BackToTop />
  </section>
</template>

<script setup>
import Logo from '#ioc/components/Logo'
import CopyrightInfo from '#ioc/components/CopyrightInfo'
import BackToTop from '#ioc/components/BackToTop'
</script>
```

:::

`Footer.vue` is located in the `components` concept and `app` directory. So, we have to create the same path in the `module-b` and put the new file there.

Then, if we use `module-b` after `module-a` in the `storefront-x.config.js` file, the `Footer.vue` from `module-b` will be used instead of the `Footer.vue` from `module-a`.

You can find another practical example of overriding in the Cookbook section: [Override component](/cookbook/override-component).

## Which concepts support overriding?

There are many concepts that support overriding. The most common ones are:

- **components** (contains `*.vue` components)
- **composables** (contains `*.{js,ts}` composable functions)
- **pages** (contains `*.vue` pages, look at the [Routing](/essentials/routing) section)
- **mappers** (contains `*.{js,ts}` mappers - files for mapping data from backend - look at the [Display data from backend](/cookbook/display-data-from-backend#_1-create-a-new-mapper) section)
- **repositories** (contains `*.{js,ts}` repositories - files for communication with backend - look at the [Display data from backend](/cookbook/display-data-from-backend#_2-create-new-repository) section)
- **services** (contains `*.{js,ts}` services - files that contain business logic - look at the [Display data from backend](/cookbook/display-data-from-backend#_3-create-a-new-service) section)
- **stores** (contains `*.{js,ts}` Pinia stores - look at the [Vue Pinia](/modules/vue-pinia) section)
- **config** (contains `*.{js,ts}` configuration files)
- **graphql** (contains `*.{js,ts}` GraphQL queries, mutations and fragments)
- **providers** (contains `*.{js,ts}` providers - look at the [Providers IoC concept](/modules/base-commerce#providers-ioc-concept))
- **tests** (contains `*.js` unit or Playwright tests - look at the [Running tests](/contributing#running-tests) section)
- **cypress** (contains `*.js` Cypress tests - look at the [Cypress tests](/contributing#cypress-tests) section)
- **errors** (contains `*.{js,ts}` error mapper classes)
- **i18n** (contains `*.{js,ts,json}` translation files - look at the [Vue I18n](/modules/vue-i18n) section)
