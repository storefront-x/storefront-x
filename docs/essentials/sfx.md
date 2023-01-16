# The .sfx directory

The `.sfx` directory in the root of the project is extremely useful. It is automatically generated during development and production build and it basically contains your whole application, in the exact configuration specified by the `storefront-x.config.js`.

:::tip
Entrypoints to your applications are `entry.client.ts` and `entry.server.ts` files in the `.sfx` directory.
:::

Inside the `.sfx` directory you can see things, like how exactly is the router configured (`.sfx/pages.ts`), which Vue plugins are installed (`.sfx/vue/`) or how IoC container looks like (`.sfx/ioc/`). The `.sfx/ioc/` directory is especially useful, because in Storefront X, IoC container contains a lot of things and you can see all of them in one place - to see all the available components in your application, just open the `.sfx/ioc/components/` directory.
