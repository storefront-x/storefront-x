# Dotenv

## Build-time environment variables

Sometimes, using environment variables for configuration is the right way to go. For these cases, Storefront X supports `.env` files. Variables in the `.env` file has to be prefixed with `SFX_` so that accidental leaks of environment variables to the client bundle are avoided.

Such environment variables are baked-in during build-time, so that dead-code elimination and similar optimizations can be performed. If you want environment variables to be loaded during application start-up, use [run-time environment variables](#run-time-environment-variables).

:::tip
It is a good idea to not use environment variables directly, but uses them inside config files which are then used in the rest of the application.
:::

### Example

1. Create dotenv file in the root of the project - `.env`

```
SFX_SECRET_TOKEN=XXX
```

2. Create config file in your module - `modules/my-module/config/SECRET_TOKEN.ts`

```ts
export default import.meta.env.SFX_SECRET_TOKEN
```

3. Use the config file in your application

```vue
<template>
  <h1>{{ SECRET_TOKEN }}</h1>
</template>

<script setup lang="ts">
import SECRET_TOKEN from '#ioc/config/SECRET_TOKEN'
</script>
```

## Run-time environment variables

You can use Node.js server-only variables which are not baked-in during build-time. This has few consequences:

1. These variables are loaded during application start-up.
2. These variables are not present in the client bundle.
3. These variables do not need to have the `SFX_` prefix.

:::tip
It is recommended to guard the server-only environment variable with the `IS_SERVER`, because browsers do not have the `process` object.
:::

### Example

```ts
// config/MY_VARIABLE.ts

import IS_SERVER from '#ioc/config/IS_SERVER'

export default IS_SERVER ? process.env.MY_VARIABLE : null
```
