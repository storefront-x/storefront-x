# Cookie-script

> `@storefront-x/cookie-script`

This module provides https://cookie-script.com/ integration.

Create account, insert your domain, scan page and setup banner in your dashboard.

## `COOKIE_SCRIPT_ID` config

Cookie-script banner ID. You can find it in your cookie-script dashboard. You need to override it by adding `config/COOKIE_SCRIPT_ID.ts` to your module. To see how overriding works, click [here](../guide/how-it-works.html#overriding).

:::warning
This config variable needs to be overrided, because it doesn't contain any value by default!
:::

```ts
// config/COOKIE_SCRIPT_ID.ts

export default 'YOUR ID HERE'
```
