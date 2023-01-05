# Magento

Storefront X contains integration for [Magento 2](https://www.magento.com/).

General integration code is inside the [`@storefront-x/magento`](/modules/magento) module. Module's specific integrations are in modules, like `@storefront-x/catalog-magento`.

## List of covered features

- Product detail
  - Product info
  - Gallery
  - Reviews
- Product listing & product search
  - Sort
  - Filters
  - Pagination
- CMS
  - Pages
  - Blocks
  - Interactive blocks (products, carousel, banners, ...)
- Cart
- Checkout
  - Shipping methods
    - In-store pickup
    - Packeta
    - Flat rate delivery
  - Payment methods
    - Google Pay
    - Credit card
    - GP webpay
    - Cash on delivery
    - Bank transfer
- Customer account
  - Sign-in, sign-up & password reset
  - Customer management (personal info)
  - Previous orders
  - Address management
  - Downloadable products
- SEO & Meta tags
- Wishlist
- Cross-sell, up-sell & related products
- Breadcrumbs
- Blog
  - Categories
  - Articles
- Shop by brand
- Multi-store
- Multi-currency

## How to configure Magento endpoint?

Use `MAGENTO_URL` config to specify Magento backend endpoint to which Storefront X will connect.

:::warning
You have to override it in your module because default value is not defined.
:::

If you created demo Magento application, it's already overridden in the demo package:

```ts
// modules/demo-magento/config/MAGENTO_URL.ts

export default 'https://be-sfx.demo.magexo.cloud'
```
