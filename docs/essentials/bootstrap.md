# Bootstrap

In Storefront X, bootstrap is a process of building the application. Bootstrap is executed when starting the development server (`yarn dev`) or when building the application for production use (`yarn build`). Bootstrap code can be found in the `@storefront-x/core/src/Core.js` class.

Bootstrap then reads list of enabled modules in `storefront-x.config.js` file and starts loading them. For each module, it will look into the `concepts` directory and loads concepts for each module.
After every module and every concept is loaded, it will execute every concept for every module.

:::tip
In development mode, concepts are watching files in respective directories and are re-executed when needed.
:::

Output of the bootstrap process is generated in `.sfx` directory, which contains app entry points (`entry.client.ts` and `entry.server.ts`) and the rest of the files required for fully functional application.
