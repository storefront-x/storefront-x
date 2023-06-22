# Flash Messages

> `@storefront-x/flash-messages`

Flash messages help you display messages after for example reload.

## `useFlashMessages` composable

Composable with methods two methods, get (gets all the messages and clears the cookie) and add.

### add Properties

- `value: any` - data of message you want to set

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
    flashMessages.add('Your session expired')
    window.location.reload()
  }
}

onMounted(() => {
  const messages = flashMessages.get()
  for (const message of messages) {
    showErrorNotification(message)
  }
})
</script>
```
