# Dotenv

Sometimes, using environment variables for configuration is the right way to go. For these cases, Storefront X supports `.env` files. Variables in the `.env` file has to be prefixed with `SFX_` so that accidental leaks of environment variables to the client bundle are avoided.

:::tip
It is a good idea to not use environment variables directly, but uses them inside config files which are then used in the rest of the application.
:::

## Example

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
