# How to create a new module

Modules in Storefront X are NPM packages. So they require `package.json` a need to be importable by their identifier. For local development, easiest way is to leverage monorepo functionalities. In root `package.json` file, the `workspaces` fields specifies which directories are scanned for NPM packages. By default, it is a `modules` directory.

## With command

You can use our own command `yarn/npm sfx make module` to create new module. You will be presented with prompts to choose directory, module name, license, description and module access.

Once module with `package.json` is created you can continue to section [Enable module in config](/cookbook/create-new-module.html#enable-module-in-config)

## Manually

First, create a new directory for the module in the `modules` directory and add `package.json`.

> `modules/my-module/package.json`

```json
{
  "name": "my-module",
  "version": "1.0.0",
  "license": "UNLICENSED",
  "type": "module"
}
```

:::tip
Why inside `modules` directory? Storefront X has to be valid NPM package and modules are resolved the same way as the installed NPM packages. In `package.json`, there is a `workspaces` field setting which specifies directories, where NPM/Yarn searches for NPM packages (in addition to `node_modules`).
:::

## Enable module in config

Next, enable the module in `storefront-x.config.js`.

> `storefront-x.config.js`

```js{9}
export default {
  modules: [
    '@storefront-x/base',

    '@storefront-x/vue',
    '@storefront-x/vue-router',
    // other modules

    'my-module',
  ],
}
```

## Install new module

And finally, you need to run `npm install`/`yarn install` so the package manager can discover this newly added NPM package and resolve it. After each modification of `storefront-x.config.js` you need to restart the development server (`yarn dev`) or build the application for production use (`yarn build`).

To test that everything works, we can, for example, add `test` page to our module.

> `modules/my-module/pages/test.vue`

```vue
<template>
  <h1>Hello from my module!</h1>
</template>
```

This page should now be visible under the `/test` URL.
