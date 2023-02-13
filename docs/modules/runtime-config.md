# Runtime Config

> `@storefront-x/runtime-config`

Runtime config module allows you to define config values that are not baked-in during build process. This is useful when you need to set some config value (e.g. API key) during application start-up, or when you need to dynamically change it during runtime.

## How to define runtime config variable

Create new file inside the `runtime/config/` concept directory. It default exports said variable. Name of this file will correspond with name of the runtime config variable,

:::tip
This file is executed only on the server, so it can access server specific context like `process.env`.
:::

### Example

```typescript
// my-module/runtime/config/NODE_ENV.ts

export default process.env.NODE_ENV as string
```

## How to access runtime config variable

Because runtime config variables have access to the server, they can't be imported directly (they would not work on the client). For accessing runtime config variables, there is an `getRuntimeConfigValue` util function which takes name of the runtime config variable as an argument and returns its value.

### Example

```vue
<template>
  <h1>{{ NODE_ENV }}</h1>
</template>

<script setup>
import getRuntimeConfigValue from '#ioc/utils/getRuntimeConfigValue'

const NODE_ENV = getRuntimeConfigValue('NODE_ENV')
</script>
```
