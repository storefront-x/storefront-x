# Introduction

You are reading the documentation for Storefront X e-commerce modular framework.

Our main goal as developers is sustainability for complex projects, coupled with great developer experience supported by a large test-suite. Storefront X is made from the ground up to achieve this goal. We designed a framework with highly modular architecture, in which everything can be extended, overridden or changed. This allows Storefront X to provide application authors with a ton of functionality, while never limiting or slowing down the application development.

**Storefront X improves time-to-market, lowers project costs and increases code reusability.**

## What is Storefront X?

Storefront X (SFX) is a JavaScript framework with modular architecture, built for complex projects in e-commerce or anything you can imagine. It is built around fast and SEO reliable server-side rendering, PWA friendly client side and large amount of ready to use modules, to get you quickly up and running. Storefront X uses Vue 3 with full TypeScript support under the hood, but it doesn't mean, you cannot use your favorite framework with Storefront X like React or SolidJS. Storefront X has a great support for unit tests, integration tests and end-to-end tests, to make development faster, easier and safer.

## What will you get?

With Storefront X, you will get solid architecture for your project. It will allow you to grow without slowing down, it will help you with challenging multidimensionality of your app. Your development will be less stressful, because of a large, ready to use, test-suite. With full support of TypeScript, you will get most from your IDE autocomplete functionality.

## Why not Nuxt?

Our aim is to be an e-commerce framework. Our goal is modularity and speed. Through our long-standing experience with Nuxt, we came to understand, that complex projects need modular architecture, full control of build packages and ability to have multiple build configurations from one repository ( e.g. different frontends in different countries ).

### What is similar?

Storefront X is the same as Nuxt, both are server-side rendered applications. Our framework also uses folder enforced structure, so you can work with `pages` directory as you would work in Nuxt. We also use Vue as our component application framework, but unlike Nuxt, Storefront X can work with other frameworks like React or SolidJS.

### Where we see our advantage?

We've taken the folder abstraction from Nuxt and taken it a step further. Because a complex e-commerce solution needs to work in a multiverse of frontend versions, we added another level of abstraction in the form of modules. For this abstraction to work with small build bundles, we don't import things directly from modules, but from the abstraction folder created at build time. That way we can override, extend and change behaviour with each new module, without code refactoring in existing modules.

<div style="display: flex; justify-content: space-between; align-items: center;">

## Why we use Vite?

<div style="width: 80px">

![Vite](/assets/images/vite-logo.svg)

</div>
</div>

Vite is a fast and efficient frontend build tool that offers improved development experience and quicker time-to-market. It uses an in-memory file system, incremental builds, dynamic imports, a fast development server, and parallel processing to achieve fast build times and real-time updates. Vite is compatible with the Vue framework, and is designed to be modular, allowing for easy customization. We chose Vite for Storefront X because of its speed, efficiency, and modularity, which greatly improves the development experience and speeds up the time to market for any kind of project. Vite also supports modern web standards, hot module reloading, tree-shaking and provides developers with flexibility to use any frontend library or framework they choose.

Vite is a great choice for Storefront X, because it focuses on speed, efficiency, and modularity that we needed to build a fast and responsive framework.

### Speed

In Storefront X we are focusing primarily on speed. Vite provides fast development server, incremental builds (when only files that have changed are rebuilt) and dynamic imports (which allow for faster loading of modules).

### Modular Design

Vite takes a modular approach, allowing developers to choose only the features they need and reducing the size of the final build. This is desirable for Storefront X, because our goal is to minimize the size of the framework and make it easy to customize.

::: tip
You can find more information about modules in the [How it works](/getting-started/how-it-works.html#modules) section.
:::

### Compatibility

Vite is compatible with a wide range of modern JavaScript features, including ES6 modules, and works seamlessly with popular libraries and frameworks, such as React and Vue, which is useful if you choose another JS framework for your project.
