# Why not Nuxt?

Our aim is to be an e-commerce framework. Our goal is modularity and speed. Through our long standing experience with Nuxt, we came to understand, that complex projects need modular architecture, full control of build packages and ease of work in a multiverse of builds from one repository ( like multi-country e-commerce ).

## What is similar?

Storefront X is the same as Nuxt, both are server-side rendered applications. Our framework also uses folder enforced structure, so you can work with `pages` directory as you would work in Nuxt. We also use Vue as our component application framework, but unlike Nuxt, Storefront X can work with other frameworks like React or SolidJS.

## Where we see our advantage?

We've taken the folder abstraction from Nuxt and taken it a step further. Because a complex e-commerce solution needs to work in a multiverse of application versions, we added another level of abstraction in the form of modules. For this abstraction to work with small build bundles, we don't import things directly from modules, but from the abstraction folder created at build time. That way we can override, extend and change behaviour with each new module, without code refactoring in existing modules.
