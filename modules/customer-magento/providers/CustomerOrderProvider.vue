<template>
  <slot />
</template>

<script setup lang="ts">
import useToOrder from '#ioc/mappers/useToOrder'
import provideCustomerOrders from '#ioc/composables/provideCustomerOrders'
import { computed, PropType } from 'vue'

const props = defineProps({
  customerOrder: {
    type: Object as PropType<ReturnType<ReturnType<typeof useToOrder>>>,
    required: true,
    default: () => ({}),
  },
})

provideCustomerOrders(computed(() => props.customerOrder))
</script>
