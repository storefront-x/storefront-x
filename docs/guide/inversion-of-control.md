# Inversion of control

## Introduction

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

## Examples

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

## File resolution

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

## Interface

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

## Extensions

While IoC container allows overriding existing files, sometimes that might not be something we want. Imagine two modules that add some functionality to products. For example product labels and product reviews. If we completely override product query in those modules, only one feature would remain - one of them would be overridden by the other. We want to extend it, not override it.

Extensions are files with `.ext.*` suffix. They are placed in the concept directory they interact with (extension modifying mixin is to be placed in the `mixins` directory) and their name has to be the same as the file they extend (except the `.ext` suffix). So `mixins/IsProduct.js` is extended by `mixins/IsProduct.ext.js` and `gql/fragments/Product.js` is extended by `gql/fragments/Product.ext.js`.

Extensions has to export default function which as a first argument take the result of default function exported from the file they are extending - `mixins/IsProduct.js` exports default function that returns the mixins and `mixins/IsProduct.ext.js` exports default function that receives that mixin as first argument. Rest of the extension function arguments are exactly the same as arguments passed to the original (extended) function.

Extension has to return a value. That returned value is used instead of the value returned from the extended file. This way extensions can completely change what is resolved from the IoC container. If there are multiple extensions for one thing, all of the extensions after the first one receive as a first argument value returned from the previous extension and not the original value returned from the extended file.

Extensions are also special. They are special because they do not override each other. If two modules have same extensions with same names, all of the extensions will be applied. If there are multiple extensions, the order in which they are called is not guaranteed.

### Example

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
