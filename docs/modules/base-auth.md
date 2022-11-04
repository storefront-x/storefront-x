# Basic auth

> `@storefront-x/basic-auth`

This module provides a basic authentication in production which appears before displaying the landing page of the project.

## `BASIC_AUTH` config

You can add authorized users here.

```ts
// Format: user1:password1|user2:password2

export default 'test:test'
```

## `BASIC_AUTH_IP_WHITELIST` config

You can create a list of whitelisted ip addresses. Not mandatory.

```ts
// Format: ip|ip

export default []
```

## `BASIC_AUTH_REDIRECT_URL` config

Page the unauthorized user will be redirected to. It is the base auth landing page at the location of pages/basic-auth.

```ts
export default '/basic-auth'
```
