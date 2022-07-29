<template>
  <slot />
</template>

<script setup lang="ts">
import useToCartItem from '#ioc/mappers/useToCartItem'
import provideCartItem from '#ioc/composables/provideCartItem'
import { computed, PropType } from 'vue'

const props = defineProps({
  cartItem: {
    type: Object as PropType<ReturnType<ReturnType<typeof useToCartItem>>>,
    required: true,
  },
})

provideCartItem(computed(() => props.cartItem))
</script>
