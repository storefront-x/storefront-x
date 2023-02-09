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

    algolia: {
      appId: '6DEBL0BL14',
      apiKey: 'eb2c839c3d67249f2167703c57d3a891',
      indexName: 'storefrontx',
    },

    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'Introduction', link: '/getting-started/introduction' },
          { text: 'Quick start', link: '/getting-started/quick-start' },
          { text: 'Simple TODO app', link: '/getting-started/simple-todo-app' },
          { text: 'How it works', link: '/getting-started/how-it-works' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'SFX vs. Nuxt', link: '/getting-started/sfx-vs-nuxt' },
        ],
      },
      {
        text: 'Essentials',
        items: [
          { text: 'CLI', link: '/essentials/cli' },
          { text: 'The .sfx directory', link: '/essentials/sfx' },
          { text: 'Routing', link: '/essentials/routing' },
          { text: 'Overriding', link: '/essentials/overriding' },
          { text: 'Extending', link: '/essentials/extending' },
          { text: 'FAQ', link: '/essentials/faq' },
        ],
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Bootstrap', link: '/advanced/bootstrap' },
          { text: 'Concepts', link: '/advanced/concepts' },
          { text: 'PWA', link: '/advanced/pwa' },
          { text: 'Dotenv', link: '/advanced/dotenv' },
          { text: 'Lazy components', link: '/advanced/lazy-components' },
          { text: 'Functionalities', link: '/advanced/functionalities' },
          { text: 'Event Bus', link: '/advanced/event-bus' },
          { text: 'Best practices', link: '/advanced/best-practices' },
        ],
      },
      {
        text: 'Cookbook',
        items: [
          { text: 'Create new module', link: '/cookbook/create-new-module' },
          { text: 'Override component', link: '/cookbook/override-component' },
          { text: 'Display data from backend', link: '/cookbook/display-data-from-backend' },
          { text: 'IOC concept', link: '/cookbook/ioc-concept' },
          { text: 'Generating concept', link: '/cookbook/generating-concept' },
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
          { text: 'Google Analytics', link: '/modules/google-analytics' },
          { text: 'Google Tag Manager', link: '/modules/google-tag-manager' },
          { text: 'NProgress', link: '/modules/nprogress' },
          { text: 'Atatus', link: '/modules/atatus' },
          { text: 'Cookie Auth', link: '/modules/cookie-auth' },
          { text: 'Sentry', link: '/modules/sentry' },
          { text: 'Runtime Config', link: '/modules/runtime-config' },
        ],
      },
    ],
  },
})
