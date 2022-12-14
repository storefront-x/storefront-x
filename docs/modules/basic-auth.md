# Basic Auth

> `@storefront-x/basic-auth`

This module provides basic-auth functionality. For example you want to guard under-construction site with login/pass for your testers and devs. This module has to be placed as the last one in your `storefront-x.config.js`. If you place any module after this one it will not be protected by basic-auth.

## `BASIC_AUTH` config

This config contains allowed credentials as `login:pass`. In case you want to have more accounts in use its `login:pass|login1:pass1`.

:::warning
This config variable needs to be overrided because it does not contain any value by default!
:::

```ts
// config/BASIC_AUTH.ts

export default 'login:pass'
```

## `BASIC_AUTH_REDIRECT_URL` config

This config contains url for your basic-auth page.

:::info
This config is optional. Default value is `'/basic-auth'`
:::

```ts
// config/BASIC_AUTH_REDIRECT_URL.ts

export default '/basic-auth'
```

## `BASIC_AUTH_IP_WHITELIST` config

This config contains array of whitelisted ips as follows `'ip|ip'`

:::info
This config is optional.
:::

```ts
// config/BASIC_AUTH_IP_WHITELIST.ts

export default '192.168.0.9'
```

## `BASIC_AUTH_COOKIE_NAME` config

This config contains basic-auth cookie name.

:::info
This config is optional. Default value is `'basic-auth'`
:::

```ts
// config/BASIC_AUTH_COOKIE_NAME.ts

export default 'my-cookie-auth'
```
