# Google Tag Manager

> `@storefront-x/google-analytics`

This module provides https://developers.google.com/analytics/devguides/collection/ga4 integration.

Create account, and get your Google Analytics Measurement ID.

## `googleAnalytics/GOOGLE_ANALYTICS_ID` config

You can find your Measurement ID in analytics dashboard/admin/data streams. You need to override it by adding `config/googleAnalytics/GOOGLE_ANALYTICS_ID.ts` to your module. To see how overriding works, click [here](/getting-started/how-it-works.html#overriding).

:::warning
This config variable needs to be overrided, because it doesn't contain any value by default!
:::

```ts
// config/googleAnalytics/GOOGLE_ANALYTICS_ID.ts

export default 'YOUR ID HERE'
```
