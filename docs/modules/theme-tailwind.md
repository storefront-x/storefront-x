# Theme Tailwind

> `@storefront-x/theme-tailwind`

Module providing set of components written in Tailwind which can be used as basis for your store.

This theme is specially designed to be extremely flexible and fast at creating new and unique designs. Thanks to [Tailwind](https://tailwindcss.com) and Storefront X modules, you can easily change colors, spacing, fonts and other global configurations or completely override some components.

By itself, this theme does not provide any pages. Instead, pages should be supplied by your implementation theme package, because every application might want different pages.

## `CONTACT_EMAIL` config

Contains contact email displayed in the header.

```ts
// config/CONTACT_EMAIL.ts

export default 'info@storefrontx.io'
```

## `CONTACT_TELEPHONE` config

Contains contact telephone number displayed in the header.

```ts
// config/CONTACT_TELEPHONE.ts

export default '+420 725 562 510'
```
