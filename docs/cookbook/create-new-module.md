# How to create new module

Modules in Storefront X are NPM packages. So they require `package.json` a need to be importable by their identifier. For local development, easiest way is to leverage monorepo functionalities. In root 'package.json', the `workspaces` fields specifies which directories are scanned for NPM packages. By default, it is a `modules` directory.

First, create new directory for the module in the modules directory and add `package.json`.

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
Why inside `modules` directory? Storefront X have to be valid NPM packages and are resolved the same way as installed NPM packages. In `package.json`, there is a `workspaces` field setting which directories NPM/Yarn searches for NPM packages (in addition to `node_modules`).
:::

Next enable the module in `storefront-x.config.js`.

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

And finally, you need to run `npm install`/`yarn install` so that the package manager can discover this newly added NPM package and resolve it. After each modification of `storefront-x.config.js` you need to restart the development server (`yarn dev`) or build the application for production use (`yarn build`).

To test that everything works, we can for example add test page to our module.

> `modules/my-module/pages/test.vue`

```vue
<template>
  <h1>Hello from my module!</h1>
</template>
```

This page should now be visible under the `/test` URL.
