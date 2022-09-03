<template>
  <slot />
</template>

<script setup lang="ts">
import ToOrder from '#ioc/mappers/ToOrder'
import provideCustomerOrders from '#ioc/composables/provideCustomerOrders'
import { computed, PropType } from 'vue'

const props = defineProps({
  customerOrder: {
    type: Object as PropType<ReturnType<typeof ToOrder>>,
    required: true,
    default: () => ({}),
  },
})

provideCustomerOrders(computed(() => props.customerOrder))
</script>
