# Redirecting

Using redirect you can achieve smooth redirect from server or client side.

### Parameters

- `url: string` - string with target path.
- `status: number` - status which you want to pass together with redirect. Default value is 301, this param is optional.

### Example

```vue
<template>
  <h1>Account</h1>
</template>
<script setup lang="ts">
import redirect from '#ioc/utils/redirect'
// redirect because user is not signed in.
redirect('/login', 301)
</script>
```
