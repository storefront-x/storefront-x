<template>
  <slot />
</template>

<script setup lang="ts">
import useToProduct from '#ioc/mappers/useToProduct'
import provideProduct from '#ioc/composables/provideProduct'
import { computed, PropType } from 'vue'

const props = defineProps({
  product: {
    type: Object as PropType<ReturnType<ReturnType<typeof useToProduct>>>,
    required: true,
  },
})

provideProduct(computed(() => props.product))
</script>
