# How it works

Storefront X is made from the ground-up to be maximally flexible. To achieve high flexibility, Storefront X relies heavily on inversion of control, modules and something called concepts.

## Modules

Storefront X applications are made from many modules. These modules are valid NPM packages (have `package.json`) and share similar directory structure with other modules, but they don't have any other restrictions.

These modules might represent anything that should be grouped together - domains (`catalog`, `cart`, `checkout`, `cms`, ...), integrations (`shopware`, `magento`, ...), themes (`theme-tailwind`, `theme-bootstrap`), framework support (`vue`, `vue-router`, ...), functionalities (`ssr-cache`, `simple-auth`, ...), tool support (`gtm`, `partytown`, ...) etc. If you are building e-shop for multiple countries, you can also have general and country specific modules (catalog, catalog-cz, catalog-de, ...). Generally, it's a good idea to hold modules to the single responsibility principle - module should do one thing and should do it well.

Modules can be enabled in the `storefront-x.config.js` config file in the root of your project. This file determines which modules are enabled and in which order they are loaded - which is very important and why is that will be explained later.

## Concepts

Modules alone aren't anything special. That's why Storefront X has something called concepts. Concepts are bits of code that enhance modules with build-time functionalities. During development and production build, concepts (directories inside modules) operate over modules and do some magic - mostly generate code. Because they operate over directories in modules, they enforce same directory structure between modules (convention over configuration).

Concepts aren't set in a stone. They are provided by modules, so by adding a new module, you might add a new concept thus enhancing functionality of Storefront X.

But let's look at the example. One of the most common concepts is `pages` concept provided by the `vue-router` module. This concept scans the `pages` directories in enabled modules and creates file-based router from found components.

```
modules/
  homepage/
    pages/
      index.vue
  catalog/
    pages/
      category.vue
      product.vue
```

In project like this above, application will have three pages. `/` handled by the `index.vue` component, `/category` handled by the `category.vue` component and `/product` handled by the `product.vue` component. It doesn't matter that they came from two different modules. If both of these modules are enabled, final application will have pages from all of them.

Pages isn't the only concept. In Storefront X, there are concepts for basically anything and you are welcome to add new ones.

## Overriding

Again, concepts alone aren't that awesome. What makes them awesome is one crucial thing. **If one concept encounters multiple files with the same name in different modules, it will use the file from later loaded module.** This is why order of loaded modules is important. Later modules have higher priority and win over the modules loaded before them.

```
modules/
  homepage/
    pages/
      index.vue
  catalog/
    pages/
      category.vue
      product.vue
  catalog-cz/
    pages/
      product.vue
```

If we imagine, that these three modules are loaded in this order (`homepage`, `catalog`, `catalog-cz`), final application will use `product.vue` component from the `catalog-cz` module instead of the `catalog` module. And because concepts are executed during build-time, final application bundle won't contain the `product.vue` component from `catalog` module at all. This allows you extreme flexibility while still having performant application with only one restriction - list of enabled modules and their order has to be known during build-time.

## Inversion of Control

If you think about it, there is one problem. What about imports?

```ts
import Button from '../components/Button'
```

With this import we tell the application exactly what file to import from which location, meaning concepts can't do their overriding magic here. That's why Storefront X supplies generic inversion of control concept and inversion of control alias to allow for overriding of imports.

```ts
import Button from '#ioc/components/Button'
```

With this import, we are telling we want file named Button from concept (directory inside module) named components. But we aren't specifying from which module this button should be imported.

```
modules/
  my-theme/
    components/
      Button.vue
  my-theme-christmas/
    components/
      Button.vue
```

We can now have for example a module containing christmas themed components. By enabling this module and building the application, we now have christmas themed application without need to editing existing functional components.

This is such a powerful pattern, that inversion of control concept is the most used concept in Storefront X. Next to components, it can be also used for composables, utility functions, mixins, config, icons, static assets, directives, global stores and many more.

:::warning
Inversion of Control works with default export. So every file handled by such concept has to contain only one thing and it has to be default-exported.
:::

### Extensions

While inversion of control allows overriding existing files, sometimes that might not be something we want. Imagine two modules that add some functionality to products. For example, product labels and product reviews. If we completely override product in those modules, only one feature would remain - one of them would be overridden by the other. We want to extend it, not override it.

Extensions are files with `.ext.*` suffix. They are placed in the concept directory they interact with (extension modifying mixin has to be placed in the `mixins` directory) and their name has to be the same as the file they extend (except the `.ext.*` suffix). So `mixins/IsProduct.js` is extended by `mixins/IsProduct.ext.js` and `gql/fragments/Product.js` is extended by `gql/fragments/Product.ext.js`.

Extensions are special because they don't override each other. If two modules have same extensions with same names, all of the extensions will be applied.

#### Example

Suppose, we have a mixin called `SomeMixin`.

```js
// mixins/SomeMixin.js

export default {
  computed: {
    title() {
      return `Hello, SomeMixin!`
    },
  },
}
```

Now we want to create an extension that adds another computed to it.

```js
// mixins/SomeMixin.ext.js

// 'self' is the mixin we are extending
export default (self) => {
  self.computed.description = function () {
    return 'description for SomeMixin!'
  }

  // extensions return value that will be used instead of default-export from the original file
  return self
}
```
