# Getting started

Storefront X is platform for rapid development of PWA e-commerce solutions with support for server-side rendering.

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

Then follow the prompts!

## Configuration

The most important file in the Storefront X project is `storefront-x.config.js`. This files specifies which modules are enabled and which order they are loaded.

:::warning
Every time you change `storefront-x.config.js`, you will need to restart development server/rebuild the application.
:::
