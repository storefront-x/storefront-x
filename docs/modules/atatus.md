# Atatus

> `@storefront-x/atatus`

This module provides https://www.atatus.com/ integration.

Create account, and setup your project on atatus.

## Atatus RUM

> Atatus documentation about Real User Monitoring [here](https://docs.atatus.com/docs/browser-monitoring/overview.html).

## `ATATUS_RUM_API_KEY` config

You can find Atatus RUM API key in the atatus dashboard when creating project. You need to override it by adding `config/ATATUS_RUM_API_KEY.ts` to your module. To see how overriding works, click [here](../guide/how-it-works.html#overriding).

:::warning
This config variable needs to be overrided, because it doesn't contain any value by default!
:::

```ts
// config/ATATUS_RUM_API_KEY.ts

export default 'YOUR ID HERE'
```

## Atatus APM

> Atatus documentation about Application Performance Monitoring [here](https://docs.atatus.com/docs/application-monitoring/overview.html).

:::info
Because Atatus APM script needs to be run before `express()`, use flag `--require @storefront-x/atatus/apm.js` with your serve script.
:::

## `.env` config

Atatus APM licence key and app name can be found in atatus dashboard, while creating project with Application Performance Monitoring.

:::warning
You need to set .env variables for Atataus APM to work. Place `.env` file in the root of your project.
:::

```ts
// .env

ATATUS_LICENCE_KEY = 'YOUR LICENCE KEY HERE'
ATATUS_APP_NAME = 'YOUR APP NAME HERE'
```
