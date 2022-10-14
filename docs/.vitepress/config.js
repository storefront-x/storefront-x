import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Storefront X',
  description: 'Modular and extendable e-commerce solution',

  lastUpdated: true,

  head: [
    [
      'script',
      {},
      `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MLCTGXQ');
    `,
    ],
  ],

  themeConfig: {
    logo: '/icon.svg',

    socialLinks: [
      {
        icon: 'slack',
        link: 'https://join.slack.com/t/storefront-xworkspace/shared_invite/zt-1dwz7npyd-xjW5y02qUJvznFdnNtqN1Q',
      },
      { icon: 'github', link: 'https://github.com/storefront-x/storefront-x' },
    ],

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
          { text: 'Cookbook', link: '/guide/cookbook' },
          { text: 'Contributing', link: '/contributing' },
        ],
      },
      {
        text: 'Integrations',
        items: [
          { text: 'Magento', link: '/integrations/magento' },
          { text: 'Shopware', link: '/integrations/shopware' },
        ],
      },
      {
        text: 'General',
        items: [
          { text: 'CLI', link: '/general/cli' },
          { text: 'Bootstrap', link: '/general/bootstrap' },
          { text: 'The .sfx directory', link: '/general/sfx' },
          { text: 'PWA', link: '/general/pwa' },
          { text: 'Dotenv', link: '/general/dotenv' },
          { text: 'Functionalities', link: '/general/functionalities' },
          { text: 'Best practices', link: '/general/best-practices' },
          { text: 'FAQ', link: '/general/faq' },
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
          { text: 'Base Commerce', link: '/modules/base-commerce' },
          { text: 'Magento', link: '/modules/magento' },
          { text: 'Shopware', link: '/modules/shopware' },
          { text: 'Atomic Design', link: '/modules/atomic-design' },
          { text: 'GraphQL', link: '/modules/graphql' },
          { text: 'Multicurrency', link: '/modules/multicurrency' },
          { text: 'Catalog', link: '/modules/catalog' },
          { text: 'Cart', link: '/modules/cart' },
          { text: 'Checkout', link: '/modules/checkout' },
          { text: 'Customer', link: '/modules/customer' },
          { text: 'Customer Shopware', link: '/modules/customer-shopware' },
          { text: 'CMS Shopware', link: '/modules/cms-shopware' },
          { text: 'Wishlist', link: '/modules/wishlist' },
          { text: 'Theme Tailwind', link: '/modules/theme-tailwind' },
          { text: 'Cookie Script', link: '/modules/cookie-script' },
          { text: 'Google Tag Manager', link: '/modules/google-tag-manager' },
        ],
      },
    ],
  },
})
