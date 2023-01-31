# SFX vs. Nuxt

Our aim is to be an e-commerce framework. Our goal is modularity and speed. Through our long standing experience with Nuxt, we came to understand, that complex projects need modular architecture, full control of build packages and ability to have multiple build configurations from one repository (e.g. different frontends in different countries).

## What is similar?

Storefront X is the same as Nuxt, both are server-side rendered applications. Our framework also uses folder enforced structure, so you can work with `pages` directory as you would work in Nuxt. We also use Vue as our component application framework, but unlike Nuxt, Storefront X can work with other frameworks like React or SolidJS.

## Where we see our advantage?

We've taken the folder abstraction from Nuxt and taken it a step further. Because a complex e-commerce solution needs to work in a multiverse of frontend versions, we added another level of abstraction in the form of modules. For this abstraction to work with small build bundles, we don't import things directly from modules, but from the abstraction folder created at build time. That way we can override, extend and change behaviour with each new module, without code refactoring in existing modules.

## SFX as a generated framework

Also, while Nuxt is a complex framework, it is not a modular one. It is a monolith, which is hard to extend and change. Storefront X is a modular framework, which allows you to change, extend and override any part of the framework, because in depth, all custom created concepts are generated into the build folder, as it was explain in the section above. This allows Storefront X to provide application authors with a ton of functionality, while never limiting or slowing down the application development.

## Key differences

Here are some of the key differences between Storefront X and Nuxt.js 3, both of which are powerful tools for building web applications:

### Purpose

Storefront X is specifically built for e-commerce, while Nuxt.js is a general-purpose framework for building applications with Vue.js. In Storefront X you are able to choose, which framework you want to use, while in Nuxt.js you are limited to Vue.js.

### Architecture

Storefront X is built as a set of modules and concepts that can be used to build any kind of website, especially e-commerce website, while Nuxt.js is a full-fledged framework that provides a complete architecture for building web applications.

### Features

In addition to all Vue.js integrated tools (like routing, i18n, Pinia store), Storefront X provides a set of e-commerce specific features, such as product management, catalog, cart and checkout support, while Nuxt.js provides a set of features for building general web applications.

### Customization

Storefront X is designed to be highly customizable and enables you to choose which modules you want to use, and also enables you to create any specific module, while Nuxt.js has some modules which are enabled by default, even if you don't need them.

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
