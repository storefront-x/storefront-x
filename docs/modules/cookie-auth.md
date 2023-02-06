# Cookie Auth

> `@storefront-x/cookie-auth`

This module provides authorization functionality similar to [HTTP basic auth](https://en.wikipedia.org/wiki/Basic_access_authentication), but instead of relying on the `Authorization` header, it uses cookies and it's own login form. This is useful when the basic auth `Authorization` header would clash with some other functionality (Magento uses the `Authorization` header for customer authorization), or when you need more flexibility for designing the login form.

By default, this module uses `cookie-auth` cookie and its value is Base64 encoded `login:password` (same format as basic auth). Thus bypassing this module with CURL is as easy as this command:

```sh
curl --cookie "cookie-auth=dXNlcjpwYXNzd29yZAo=" http://localhost:3000/
```

This module works only in production. It does not guard static assets (JS, CSS, images, ...). It guards server middleware/routes but only in modules enabled before this one.

## Changing the credentials

Credentials are set with the `cookieAuth/credentials` config file. This config contains allowed credentials as `login:pass`. In case you want to have more accounts, separate them with pipe operator like this `login1:pass1|login2:pass2`.

:::warning
This config needs to be overrided, because it doesn't contain any value by default!
:::

```ts
// config/cookieAuth/credentials.ts

export default 'user1:password1'
```

## Styling the login form

If you don't like a visual look of cookie-auth page, you can override it in your module with `pages/cookie-auth/index.vue`. Here is the default implementation:

```vue
<template>
  <h1>Unauthorized</h1>
  <form :action="redirectUrl" method="POST">
    <input type="text" name="username" placeholder="Username" />
    <input type="password" name="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
import redirectUrl from '#ioc/config/cookieAuth/redirectUrl'
</script>
```

## Configuration

### `cookieAuth/allowInDevelopment` config

This config controls if the cookie-auth functionality is enabled during development.

:::info
This config is optional. Default value is `false`
:::

```ts
// config/cookieAuth/allowInDevelopment.ts

export default true
```

### `cookieAuth/cookieName` config

This config contains name of the cookie used for authorization.

:::info
This config is optional. Default value is `'cookie-auth'`
:::

```ts
// config/cookieAuth/cookieName.ts

export default 'cookie-auth'
```

### `cookieAuth/redirectUrl` config

This config contains URL for your cookie-auth page. It has to match

:::info
This config is optional. Default value is `'/cookie-auth'`
:::

```ts
// config/cookieAuth/redirectUrl.ts

export default '/cookie-auth'
```

### `cookieAuth/ipWhitelist` config

This config contains array of whitelisted IP addresses.

:::info
This config is optional.
:::

```ts
// config/cookieAuth/ipWhitelist.ts

export default ['192.168.0.9']
```
