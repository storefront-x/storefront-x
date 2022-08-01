# Getting started

Storefront X is platform for rapid development of PWA e-commerce solutions with support for server-side rendering.

## Modules

Storefront X application is made of modules. Modules can represent parts of the application (catalog, checkout, blog, ...), themes (theme-tailwind, theme-magento, ...), functionalities (gtm, partytown, ssr-cache, basic-auth, ...), backend specific integration (catalog-magento, catalog-shopware, ...) and so on. Each module can be turned on/off during build-time and final application si build from turned on modules.

Each module is split into concepts. Concept is something that multiple modules might have in common. For example pages, components, composables and stores. If you are familiar with [Nuxt.js](https://nuxtjs.org/) you might recognize them. For example pages are components from which the router is build and which determine pages that user can visit. So while catalog module might add pages like `/product/:id` and `/category/:id`, the blog module might add `/blog` and `/blog/article/:id` pages.

Both modules and concepts are not set in stone. You can add your own modules and concepts to modify Storefront X so it suits your needs.

:::info
More info how to create and add your own modules and concepts will be described later.
:::

## Overriding

By turning on modules and adding concepts you can add new functionality to Storefront X. By turning off modules, functionality can be removed. So what about modifying existing functionality? **Files with the same name and in the same concept but in different module will override each other.**

Image that Storefront X has module `catalog` with concept `pages` and page `product.vue` : `modules/catalog/pages/product.vue`. This Vue component contains some markup for a product page which you do not like, but turning off the whole catalog module is unacceptable. You override this `product.vue` file by creating your own module, for example `my-theme`, with `product.vue` inside the `pages` concept: `modules/my-theme/pages/product.vue`. If `my-theme` module is loaded after the `catalog` module, it will override it, so `product.vue` from `my-theme` will be used instead of `product.vue` from the `catalog` module.

This system of overriding applies to every module and every concept. To override any file in Storefront X, just create new file in the same directory with the same name but in your own module, and if that module is loaded last, it will override any other module.

## Inversion of Control

Some concepts are overriding without any additional effort (`pages`), while others (`components`, `composables`, `mixins`) require special style of imports.

Imports using absolute paths:

```js
import useProduct from '@storefront-x/catalog/composables/useProduct'
```

or relative paths:

```js
import useProduct from '../composables/useProduct'
```

tell the bundler exactly which file to import. Such imports cannot be overridden. Hence Storefront X provides aliases which allow imports to contain only concept and name of the file but not name of the module. Imports using inversion of control look like this:

```js
import useProduct from '#ioc/composables/useProduct'
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
