# Flash Messages

> `@storefront-x/flash-messages`

Flash messages help you display messages after for example reload.

## `useFlashMessages` composable

Composable used to with methods get/add/remove.

### get Properties

- `ident: string` - name of cookie to get as flash message

### add Properties

- `ident: string` - name of cookie to be set as flash message
- `value: any` - data of message you want to set

### remove Properties

- `ident: string` - name of cookie (flash message) to be removed

### Example

```vue
<template>
  <button @click="visitRestrictedZone">Customer page</button>
</template>
<script setup>
import useFlashMessages from '#ioc/composables/useFlashMessages'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import { onMounted } from 'vue'

const flashMessages = useFlashMessages()
const customerStore = useCustomerStore()
const showErrorNotification = useShowErrorNotification()

const visitRestrictedZone = () => {
  if (!customerStore.customer) {
    flashMessages.add('error-messages', 'Your session expired')
    window.location.reload()
  }
}

onMounted(() => {
  const messages = flashMessages.get('error-messages')
  for (const message of messages) {
    showErrorNotification(message)
  }
})
</script>
```
