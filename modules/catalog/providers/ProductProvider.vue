<template>
  <slot />
</template>

<script setup lang="ts">
import ToProduct from '#ioc/mappers/ToProduct'
import provideProduct from '#ioc/composables/provideProduct'
import { computed, PropType } from 'vue'

const props = defineProps({
  product: {
    type: Object as PropType<ReturnType<typeof ToProduct>>,
    required: true,
  },
})

provideProduct(computed(() => props.product))
</script>
