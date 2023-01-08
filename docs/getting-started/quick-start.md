# Quick Start

In this section we will introduce how to scaffold a Storefront X application on your local machine. The created project will be using a build setup based on Vite and allow us to use Storefront X modules eco-system.

## Requirements

- [Node](https://nodejs.org/en/) v16+

## Creating your first Storefront X project

With NPM:

```
npm create storefront-x@latest
```

or with Yarn:

```
yarn create storefront-x
```

This command will install and execute `create storefront-x`, the official Storefront X scaffolding tool. You will be presented with prompts to choose what module configuration you want to scaffold ( we have several module setups based on your back-end solution )

```
? Target directory » storefront-x-app
>   Blank application
    Shopware integration
    Magento integration with additional modules (blog, brands, ...)
    Magento Venia integration (experimental)

Scaffolding project in ./<your-project-name>...

✔ Done.

```

Once the project is created, follow the instructions to install dependencies and start the dev server:

```
>   cd storefront-x-app
>   yarn install
>   yarn dev
```

This will create a dev-ready build of your app in the project's [./sfx directory](/essentials/sfx). Behind the scenes Storefront X collects all your files in enabled modules and creates a build directory, we call this process [Bootstrap](/essentials/bootstrap). With each module setup you get a fully functional e-commerce solution with example components.

- The recommended IDE setup is [Visual Studio Code](https://code.visualstudio.com/) + [Volar extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar).
- More information about other e-commerce integrations can be found here [Magento](/integrations/magento) or [Shopware](/integrations/shopware)
- To learn more about the underlying build tool Vite, check out the [Vite docs](https://vitejs.dev/).
- Storefront X is TypeScript ready. All the modules support autocomplete in your IDE.

When you are ready to ship your app to production, run the following:

```
>   yarn build
>   yarn serve
```

This will create a production-ready build of your app in the project's [./sfx/.dist directory](/essentials/sfx). Storefront X builds one directory for client and one for server. Your application is exposed on port 3000. You can find more about build or serve options ( like on what port it runs ) here [CLI](/essentials/cli)

## Configuration

Storefront X has just one configuration file which controls how your application is built `storefront-x.config.js`. This file specifies which modules are enabled and in what order they are loaded.

:::warning
Every time you change `storefront-x.config.js`, you will need to restart development server/rebuild the application.
:::
