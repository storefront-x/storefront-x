<template>
  <slot />
</template>

<script setup lang="ts">
import ToCartItem from '#ioc/mappers/ToCartItem'
import provideCartItem from '#ioc/composables/provideCartItem'
import { computed, PropType } from 'vue'

const props = defineProps({
  cartItem: {
    type: Object as PropType<ReturnType<typeof ToCartItem>>,
    required: true,
  },
})

provideCartItem(computed(() => props.cartItem))
</script>
