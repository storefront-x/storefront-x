# Google Tag Manager

> `@storefront-x/google-tag-manager`

This module provides https://tagmanager.google.com/ integration.

Create account, and get your Google Tag ID.

## `GOOGLE_TAG_MANAGER_ID` config

Google Tag Manager ID. You can find it in your Tag Manager dashboard. You need to Override it by adding `config/GOOGLE_TAG_MANAGER_ID.ts` to your module. To see how overriding works click [here](../guide/how-it-works.html#overriding)

:::warning
This config variable needs to be overrided because it does not contain any value by default!
:::

```ts
// config/GOOGLE_TAG_MANAGER_ID.ts

export default 'YOUR ID HERE'
```
