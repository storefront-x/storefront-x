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

## Vanilla Magento
This integration works without any additional Magento modules (recommended version 2.4.5).

List of all available features:
- Cart
- Catalog
- Checkout
- CMS
- Customer
- Multi-currency
- Multi-store
- Product Reviews
- Wishlist

You can extend vanilla integration with free SFX modules:
- [Braintree](https://github.com/storefront-x/magento-module-sfx-google-pay-braintree)
- [Product Attriutes](https://github.com/storefront-x/magento-module-product-attributes-graph-ql)
- [Product Alerts](https://github.com/storefront-x/magento-module-product-alerts-graphql)
- [Store config](https://github.com/storefront-x/magento-module-sfx-store-config)
- [Customer](https://github.com/storefront-x/magento-module-customer-graph-ql-extended)
- [Reset password email](https://github.com/storefront-x/magento-module-email-url-extended)

### To install and enable SFX Magento modules use:
#### Install metapackage
```
composer require storefront-x/sfx_core
```

#### Enable module
```
magento module:enable StorefrontX_SfxStoreConfig StorefrontX_ProductAlertsGraphQl StorefrontX_ProductAttributesGraphQl Store
frontX_SfxGooglePayBraintree StorefrontX_EmailURLExtended StorefrontX_StoreConfigGQL
```

#### Upgrade magento
```
magento setup:upgrade
```

## Full-featured Magento

Full-featured Magento integration contains all features which SFX supports. This version requires some Amasty modules which are paid.

List of all available features:
- Blog
- BrainTree
- Shop by Brand
- Cart
- Catalog
- Checkout
- CMS
- Customer account
- Multi-currency
- Multi-store
- Product reviews
- Wishlist
- Product Labels
- Sitemap
- Robots

List of paid modules:
- [Blog Pro](https://amasty.com/blog-pro-for-magento-2.html)
- [Shop by Brand](https://amasty.com/shop-by-brand-for-magento-2.html)
- [Product Labels](https://amasty.com/product-labels-for-magento-2.html)