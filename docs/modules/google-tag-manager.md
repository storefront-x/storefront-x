# Google Tag Manager

> `@storefront-x/cookie-script`

This module provides https://tagmanager.google.com/ integration.

Create account, and get your Google Tag ID.

## `GOOGLE_TAG_MANAGER_ID` config

Google Tag Manager ID. You can find it in your Tag Manager dashboard.

:::warning
This config variable needs to be overrided because it does not contain any value by default!
:::

```ts
// config/GOOGLE_TAG_MANAGER_ID.ts

export default '${YOUR ID HERE}'
```
