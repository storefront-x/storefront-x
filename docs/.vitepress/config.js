import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Storefront X',
  description: 'Modular and extendable e-commerce solution',

  lastUpdated: true,

  themeConfig: {
    logo: '/icon.svg',

    socialLinks: [{ icon: 'github', link: 'https://github.com/storefront-x/storefront' }],

    nav: [
      { text: 'Demo', link: 'https://demo.storefrontx.io' },
      { text: 'Blog', link: 'https://www.storefrontx.io/' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Why Storefront X', link: '/guide/why-storefront-x' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'How it works', link: '/guide/how-it-works' },
          { text: 'Contributing', link: '/guide/contributing' },
        ],
      },
      {
        text: 'Modules',
        items: [
          { text: 'Base', link: '/modules/base' },
          { text: 'Vue', link: '/modules/vue' },
          { text: 'Vue Router', link: '/modules/vue-router' },
          { text: 'Vue Head', link: '/modules/vue-head' },
          { text: 'Vue I18n', link: '/modules/vue-i18n' },
          { text: 'Vue Pinia', link: '/modules/vue-pinia' },
          { text: 'Storefront', link: '/modules/storefront' },
          { text: 'Shopware', link: '/modules/shopware' },
          { text: 'Atomic Design', link: '/modules/atomic-design' },
          { text: 'Multicurrency', link: '/modules/multicurrency' },
          { text: 'Catalog', link: '/modules/catalog' },
          { text: 'Cart', link: '/modules/cart' },
          { text: 'Checkout', link: '/modules/checkout' },
          { text: 'Customer', link: '/modules/customer' },
          { text: 'Wishlist', link: '/modules/wishlist' },
          { text: 'Theme Tailwind', link: '/modules/theme-tailwind' },
        ],
      },
      {
        text: 'In-depth',
        items: [
          { text: 'Bootstrap', link: '/in-depth/bootstrap' },
          { text: 'GraphQL', link: '/in-depth/graphql' },
          { text: 'Functionalities', link: '/in-depth/functionalities' },
        ],
      },
    ],
  },
})
