# SFX vs. Nuxt

Storefront X and Nuxt have a lot in common. Both are server-side rendered applications with a folder-enforced structure. We fully integrated almost every part of Nuxt into Storefront X, so you can work with `pages`, `composables`, `components`, `assets`, `public` directories as you would work in Nuxt. We also use Vue as our component application framework.

### Folder structure

::: code-group

```md{1,7} [SFX]
├─ module-a
│ ├─ pages/
│ ├─ composables/
│ ├─ components/
│ ├─ assets/
│ └─ public/
├─ module-b
│ ├─ pages/
│ ├─ composables/
│ ├─ components/
│ ├─ assets/
└─└─ public/
```

```md [Nuxt]
├─ pages/
├─ composables/
├─ components/
├─ assets/
└─ public/
```

:::

As you can see at the example above, Storefront X follow the same structure as Nuxt, but unlike Nuxt, Storefront X enables you to create as many modules as you want, which you can then enable/disable in global configuration file. Thanks to [extending](/essentials/extending) and [overriding](/essentials/overriding) in SFX, you are able, for example, to merge pages, override components inherited from other modules, or extend composable functions.

By this approach, you can create a complex e-commerce solution, which is modular, scalable and easy to maintain. By that, we mean that you can create a module for each part of your application (for example specific module which handles global cart - `cart`, cart for integration with Magento - `cart-magento`, `catalog`, `catalog-labels`, `checkout`, or theme styling - `theme-tailwind`, `theme-material`, `theme-bootstrap` etc.) and enable/disable them as you wish. In all of the modules, you can use the same Nuxt structure as it was shown in the example above.

::: tip
You can have as many configuration files as you want, so you can have different configurations for eg. different countries/languages (for example: `storefront-x.en.config.js`, `storefront-x.cz.config.js` etc.). Then, you can build your application with any of created configuration files. Build folder will only contain the modules added in the configuration file.
:::

## Where we see our advantage?

Our aim is to be an e-commerce framework. We are not trying to replace Nuxt. Our goal is modularity and speed for e-commerce solutions. Through our long standing experience with Nuxt, we came to understand, that complex e-commerce projects need modular architecture, full control of build packages and ability to have multiple build configurations from one repository.

We've taken the folder abstraction from Nuxt and taken it a step further. Because a complex e-commerce solution needs to work in a multiverse of frontend versions, we added another level of abstraction in the form of modules. For this abstraction to work with small build bundles, we don't import things directly from modules, but from the abstraction folder created at build time (`#ioc`). That way we can override, extend and change almost every file by creating this file in a new module, without code refactoring in existing modules.

### Difference between Nuxt modules and SFX modules

You can ask yourself, what's difference between Nuxt modules and SFX modules? In SFX, you can use any of the supported modules which were developed and are maintained by the Storefront X community, which means, that these modules are integrated part of SFX (it is for example Pinia store, Tailwind CSS, i18n, Google Tag Manager, etc.) and therefore, they are super-optimized. Unlike Nuxt modules, you can easily override every aspect of the module in your custom created module, which creation is also very simple.

SFX in the base provides the `core`, `base` and `vue` modules, which contain the core functionality, which is required for the application to work. We have also developed modules for e-commerce solutions, which Nuxt does not provide. Instead of using one huge e-commerce module, we splitted it up to the smaller ones (`base-commerce`, `cart`, `catalog`, `checkout`, `customer`, `magento`, `multicurrency`, etc.) which may or may not to be imported, based on the project needs. Thanks to them, you can easily create a complex e-commerce solution, which is modular, scalable and easy to maintain.

## SFX as a modular framework

While Nuxt is a complex framework, it is not a modular one. It is a monolith, which is hard to extend and change. Storefront X is a modular framework, which allows you to change, extend and override any part of the framework, without need to change the core. You can easily create your own modules, which can be used in your application _(look at [Create new module](/cookbook/create-new-module) section)_. You can also use any of the modules, which were already developed and are maintained by the Storefront X community. You just need to install them as a dependencies and add them to the `modules` in the configuration file.

## Key differences

Here are some of the key differences between Storefront X and Nuxt.js 3, both of which are powerful tools for building web applications:

### Purpose

Storefront X is specifically built for e-commerce, while Nuxt.js is a general-purpose framework for building applications with Vue.js. In Storefront X you are able to choose, which framework you want to use, while in Nuxt.js you are limited to Vue.js.

### Architecture

Storefront X is built as a set of modules and concepts that can be used to build any kind of website, especially e-commerce website, while Nuxt.js is a full-fledged framework that provides a complete architecture for building web applications.

### Features

In addition to all Vue.js tools (like routing, i18n, Pinia store), Storefront X provides a set of e-commerce specific features, such as base commerce, catalog, cart and checkout support, while Nuxt.js provides a set of features for building general web applications.

### Customization

Storefront X is designed to be highly customizable and enables you to choose which modules you want to use, and also enables you to create any specific module by which you can extend or override another modules, while Nuxt.js has some modules which are enabled by default, even if you don't need them and the modules cannot be easily overrided.

### Performance

Storefront X is optimized for e-commerce and provides a high-performance front-end for online stores, while Nuxt.js is optimized for a wide range of applications which makes it a bit slower in e-commerce applications than Storefront X.

### Comparison table

|                                 | Nuxt 3 | Storefront X |
| ------------------------------- | :----: | :----------: |
| **General framework**           |   ✅   |      ✅      |
| **Ready for e-commerce**        |   ❌   |      ✅      |
| **Performance**                 |   📈   |      ✅      |
| **SEO**                         |   ✅   |      ✅      |
| **PWA**                         |   ✅   |      ✅      |
| **TypeScript support**          |   ✅   |      ✅      |
| **Security**                    |   ✅   |      ✅      |
| **Modularity**                  |   ❌   |      ✅      |
| **Scalability**                 |   ❌   |      ✅      |
| **Custom selection of modules** |   ❌   |      ✅      |
| **Vue.js support**              |   ✅   |      ✅      |
| **React support**               |   ❌   |      ✅      |
| **Solid.js support**            |   ❌   |      ✅      |
