# Atatus

> `@storefront-x/atatus-client` & `@storefront-x/atatus-server`

This module provides https://www.atatus.com/ integration.

Create account, and setup your project on atatus.

## Client

:::warning
The client module should be enabled after all of the client framework modules (e.g. after all of the `vue` modules).
:::

> Atatus documentation about Real User Monitoring [here](https://docs.atatus.com/docs/browser-monitoring/overview.html).

### `config/atatus-client/ATATUS_RUM_API_KEY` config

You can find Atatus RUM API key in the atatus dashboard when creating project. You need to override it by adding `config/atatus-client/ATATUS_RUM_API_KEY.ts` to your module. To see how overriding works, click [here](/getting-started/how-it-works.html#overriding).

:::warning
This config variable needs to be overrided, because it doesn't contain any value by default!
:::

```ts
// config/atatus-client/ATATUS_RUM_API_KEY.ts

export default 'YOUR ID HERE'
```

## Server

> Atatus documentation about Application Performance Monitoring [here](https://docs.atatus.com/docs/application-monitoring/overview.html).

### `config/atatus-server/ATATUS_LICENCE_KEY` config

Atatus APM licence key and app name can be found in atatus dashboard, while creating project with Application Performance Monitoring. You need to override it by adding `config/atatus-server/ATATUS_LICENCE_KEY.ts` to your module. To see how overriding works, click [here](/getting-started/how-it-works.html#overriding).

:::warning
This config variable needs to be overrided, because it doesn't contain any value by default!
:::

```ts
// config/atatus-server/ATATUS_LICENCE_KEY.ts

export default 'YOUR KEY HERE'
```

### `config/atatus-server/ATATUS_APP_NAME` config

Atatus APM app name can be found in atatus dashboard, while creating project with Application Performance Monitoring. You need to override it by adding `config/atatus-server/ATATUS_APP_NAME.ts` to your module. To see how overriding works, click [here](/getting-started/how-it-works.html#overriding).

:::warning
This config variable needs to be overrided, because it doesn't contain any value by default!
:::

```ts
// config/atatus-server/ATATUS_APP_NAME.ts

export default 'YOUR APP NAME HERE'
```
