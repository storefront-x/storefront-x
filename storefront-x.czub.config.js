export default {
  modules: [
    '@storefront-x/base',

    '@storefront-x/vue',
    '@storefront-x/vue-router',
    '@storefront-x/vue-head',
    '@storefront-x/vue-i18n',
    '@storefront-x/vue-pinia',

    '@storefront-x/base-commerce',
    '@storefront-x/atomic-design',
    '@storefront-x/graphql',
    '@storefront-x/cypress',
    '@storefront-x/schema-org',
    '@storefront-x/nprogress',
    '@storefront-x/service-worker',
    '@storefront-x/web-app-manifest',
    '@storefront-x/runtime-config',
    '@storefront-x/flash-messages',
    '@storefront-x/build-time-version',
    ...(process.env.NODE_ENV === 'development' ? ['@storefront-x/request-profiler'] : []),

    '@storefront-x/cart',
    '@storefront-x/catalog',
    '@storefront-x/cms',
    '@storefront-x/customer',
    '@storefront-x/multicurrency',
    '@storefront-x/product-reviews',
    '@storefront-x/product-comparison',
    '@storefront-x/wishlist',

    '@storefront-x/magento',
    '@storefront-x/cart-magento',
    '@storefront-x/catalog-magento',
    '@storefront-x/cms-magento',
    '@storefront-x/customer-magento',
    '@storefront-x/multicurrency-magento',
    '@storefront-x/product-reviews-magento',
    '@storefront-x/product-comparison-magento',
    '@storefront-x/wishlist-magento',
    '@storefront-x/newsletter-magento',

    '@storefront-x/theme-tailwind',
    '@storefront-x/theme-tailwind-magento',

    '@supplo/supplo-checkout-common',
    '@supplo/supplo-one-step-checkout',

    '@czub/czub-common',
  ],
}
