# Shopware

Storefront X contains integration for [Shopware 6](https://www.shopware.com/).

General integration code is inside the [`@storefornt-x/shopware`](/modules/shopware) module. Module specific integrations are in modules like `@storefornt-x/catalog-shopware`.

## List of covered features

- Product detail
  - Product info
  - Gallery
- Product listing & product search
  - Sort
  - Filters
  - Pagination
- CMS
- Cart
- Checkout
- Customer account
  - Sign-in, sign-up & password reset
  - Customer management (personal info)
  - Previous orders
  - Address management
- SEO & Meta tags
- Wishlist
- Breadcrumbs
- Cross-sell, up-sell & related products
- Multi-store

## How to configure Shopware endpoint?

To which Shopware BE Storefront X connects is set in the `SHOPWARE_URL` config.

:::warning
You have to override it in your module because default value is not defined.
:::

If you created demo Shopware application, it's already overridden in the demo package:

```ts
// modules/demo-shopware/config/SHOPWARE_URL.ts

export default 'https://storefrontx.shopware.store'
```
