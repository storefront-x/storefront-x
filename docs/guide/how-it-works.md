# How it works

## Modules

Storefront X application is made of modules. Modules can represent parts of the application (`catalog`, `checkout`, `blog`, ...), themes (`theme-tailwind`, `theme-bootstrap`, ...), functionalities (`gtm`, `partytown`, `ssr-cache`, `basic-auth`, ...), backend specific integration (`catalog-magento`, `catalog-shopware`, ...) and so on. Each module can be turned on/off during build-time and final application si build from turned on modules.

Each module is split into concepts. Concept is something that multiple modules might have in common. For example pages, components, composables and stores. If you are familiar with [Nuxt.js](https://nuxtjs.org/) you might recognize them. For example pages are components from which the router is build and which determine pages that user can visit. So while catalog module might add pages like `/product/:id` and `/category/:id`, the blog module might add `/blog` and `/blog/article/:id` pages.

Both modules and concepts are not set in stone. You can add your own modules and concepts to modify Storefront X so it suits your needs.

:::info
More info how to create and add your own modules and concepts will be described later.
:::

## Overriding

By turning on modules and adding concepts you can add new functionality to Storefront X. By turning off modules, functionality can be removed. So what about modifying existing functionality? **Files with the same name and in the same concept but in different module will override each other.**

Image that Storefront X has module `catalog` with concept `pages` and page `product.vue` : `modules/catalog/pages/product.vue`. This Vue component contains some markup for a product page which you do not like, but turning off the whole catalog module is unacceptable. You override this `product.vue` file by creating your own module, for example `my-theme`, with `product.vue` inside the `pages` concept: `modules/my-theme/pages/product.vue`. If `my-theme` module is loaded after the `catalog` module, it will override it, so `product.vue` from `my-theme` will be used instead of `product.vue` from the `catalog` module.

This system of overriding applies to every module and every concept. To override any file in Storefront X, just create new file in the same directory with the same name but in your own module, and if that module is loaded last, it will override any other module.

## Inversion of control

Storefront X relies heavily on inversion of control. Basically it means that code doesn't specify from where to get its dependencies. It only specifies what dependencies it has and the rest is someone elses job. In JavaScript you can often see imports like:

```js
import Bar from '../foo/Bar'
```

or:

```js
import Baz from '@foo/bar/Baz'
```

Both of these imports say exactly from where `Bar` and `Baz` should be retrieved. Most of the times, this is OK, but importing dependencies like this falls short when it comes to extendability.

Storefront X provides quite a lot of functionality by default. Components, composables, GraphQL queries & mutations, repositories, mappers, mixins, ... They are generally designed to fit most of the use cases, but sometimes a custom e-shop may require some custom feature which Storefront X doesn't account for. This feature for example requires some extra data for every product. The e-shop could create its own GraphQL query, repository, mapper and mixin but that's a lot of work and all of the already existing code would still be using the old component, composable, repository, mapper, ... so it's not even a good solution. So we need a mechanism to extend/override core components of Storefront X.

By changing imports so that they no longer say from which module/directory the file is coming from, we can hot-swap imported files during build. For example old GraphQL product detail query can be swapped for a new one which fetches some new custom data. Imports using this mechanism look like `#ioc/concept/thing`, where `concept` is name of the concept from which the imported file is coming from and `thing` is the think I'm trying to import. So if I want to import `useProduct` composable, I do it like this:

```js
import useProduct from '#ioc/composables/useProduct
```

### Examples

- GraphQL queries:

```js
import CategoryDetail from '#ioc/gql/queries/CategoryDetail'
```

- GraphQL mutations:

```js
import UpdateCartItem from '#ioc/gql/mutations/UpdateCartItem'
```

- Repositories:

```js
import useGetCategoryDetailById from '#ioc/repositories/useGetCategoryDetailById'`
```

- Mappers:

```js
import useToCategory from '#ioc/mappers/useToCategory'
```

- Composables:

```js
import useCategory from '#ioc/mixins/useCategory'
```

### File resolution

If module/directory is no longer part of the import, how does it know which file to import? Let's take for example this import:

```js
import useCategory from '#ioc/composables/useCategory'
```

It goes through all of the enabled modules and looks for file `useCategory.*` in the `composables` concepts (directories). If it finds only one `useCategory` file, it uses that one. If there are multiple files with the same name, it chooses the file from module that is loaded last.

Let's look at an example:

- modules
  - catalog
    - repositories
      - useGetCategoryById.js
    - composables
      - useCategory.js
  - theme
    - repositories
      - useGetCategoryById.js

Importing `useCategory` composables in project like this will return `useCategory.js` from the module catalog because it's the only one. Importing `useGetCategoryById` repository will return `useGetCategoryById.js` from the theme module because it's loaded after catalog module and so it overrides it.

:::warning
Because file names have to be unique (when overriding is not desired) and more descriptive (no module name), pay more attention to their naming.
:::

:::tip
Overrides are hot-reloaded during development.
:::

### Interface

Everything that is imported using inversion of control has to have default export. Named exports aren't supported.

Good convention is also for the default export to be a function. That way circular dependencies can be resolved (mixin A.js imports mixin B.js which imports mixin A.js). This is not required though.

```js
// mixins/IsProduct.js
export default () => ({
  computed: {
    id() {
      return this.product.id || ''
    },

    sku() {
      return this.product.sku || ''
    },

    // ...
  },
})
```

```js
// mixins/IsConfigurableProduct.js
import IsProduct from '#ioc/mixins/IsProduct'

export default () => ({
  mixins: [IsProduct()],

  sku() {
    return this.variant.sku || this.product.sku || ''
  },

  // ...
})
```

### Extensions

While IoC container allows overriding existing files, sometimes that might not be something we want. Imagine two modules that add some functionality to products. For example product labels and product reviews. If we completely override product query in those modules, only one feature would remain - one of them would be overridden by the other. We want to extend it, not override it.

Extensions are files with `.ext.*` suffix. They are placed in the concept directory they interact with (extension modifying mixin is to be placed in the `mixins` directory) and their name has to be the same as the file they extend (except the `.ext` suffix). So `mixins/IsProduct.js` is extended by `mixins/IsProduct.ext.js` and `gql/fragments/Product.js` is extended by `gql/fragments/Product.ext.js`.

Extensions has to export default function which as a first argument take the result of default function exported from the file they are extending - `mixins/IsProduct.js` exports default function that returns the mixins and `mixins/IsProduct.ext.js` exports default function that receives that mixin as first argument. Rest of the extension function arguments are exactly the same as arguments passed to the original (extended) function.

Extension has to return a value. That returned value is used instead of the value returned from the extended file. This way extensions can completely change what is resolved from the IoC container. If there are multiple extensions for one thing, all of the extensions after the first one receive as a first argument value returned from the previous extension and not the original value returned from the extended file.

Extensions are also special. They are special because they do not override each other. If two modules have same extensions with same names, all of the extensions will be applied. If there are multiple extensions, the order in which they are called is not guaranteed.

#### Example

Suppose we have a mixin called SomeMixin.

```js
// mixins/SomeMixin.js

export default (name) => ({
  computed: {
    title() {
      return `Hello, ${name}!`
    },
  },
})
```

Now we want to create extension that adds another computed to it.

```js
// mixins/SomeMixin.ext.js

// 'self' is the result of the exported function from the mixin
// 'name' is the sane value as in the original mixin
export default (self, name) => {
  self.computed.description = function () {
    return `Custom description for ${name}`
  }

  // extension has to return value that is supposed to be used instead of the original one
  return self
}
```

## Examples of modules

By default Storefront X provides many modules. Here are some of the the most common:

- `@storefront-x/base` contains base functionality required for ans Storefront X applications.
- `@storefront-x/vue` allows Storefront X applications to use the Vue.js framework. This means that Storefront X can use different frameworks, but Vue is currently the main choice.
- `@storefront-x/vue-router` adds the `pages` concept to allow splitting the application into multiple pages.
- `@storefront-x/vue-head` adds support for adding page meta data like `<title>`.
- `@storefront-x/vue-i18n` adds support for internationalization - multiple languages.
- `@storefront-x/vue-pinia` allows using the [Pinia](https://pinia.vuejs.org/) library for global state management.
- `@storefront-x/base-commerce` includes components and best practices recommended for every Storefront X application.
- `@storefront-x/magento` Magento integration.
- `@storefront-x/shopware` Shopware integration.
- `@storefront-x/catalog`, `@storefront-x/cart`, `@storefront-x/checkout`, `@storefront-x/blog`, ... contain generic, domain specific code.
- `@storefront-x/catalog-magento`, `@storefront-x/cart-magento`, `@storefront-x/checkout-magento`, `@storefront-x/blog-magento`, ... contain mappings from Magento to its respective generic modules.

## Examples of concepts

Storefront X modules contain many different concepts. Here are some of the most common:

- `config` - configuration files.
- `gql` - GraphQL queries/mutations/fragments.
- `pages` - components that form the application router.
- `composables` - Vue 3 functions containing the application logic.
- `repositories` - composables communicating with backend.
- `mappers` - composables mapping data between backend and frontend.
- `services` - composables wrapping repositories with business logic
- `public` - serves static files.
- `stores` - global state management.
- `server/routes` & `server/middleware` - functions execute on the server side.

## Summary

Storefront X is built on top [Vite](https://vitejs.dev/). It is composed of multiple modules and every module is composed of multiple concepts. Files inside concepts will override files with the same name, in the same concepts but in modules loaded before them.
