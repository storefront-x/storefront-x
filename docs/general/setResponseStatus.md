# Setting Response Status

Using composable `useSetResponseStatus.ts` you can set the status code response for your SSR responses.

### Parameters

- `status: number` - status code to be send with your response. This parameter is required.

### Example

```vue
<template>
  <h1>404</h1>
</template>
<script setup lang="ts">
import useSetResponseStatus from '#ioc/composables/useSetResponseStatus'

const setResponseStatus = useSetResponseStatus()

setResponseStatus(404)
</script>
```
