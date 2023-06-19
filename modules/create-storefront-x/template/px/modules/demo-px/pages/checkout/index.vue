<template>
  <Checkout />
</template>

<script setup lang="ts">
import Checkout from '#ioc/templates/Checkout'
import { onMounted } from 'vue'
import useEmitPageViewLabel from '#ioc/bus/emitters/useEmitPageViewLabel'
import PAGE_LABELS from '#ioc/config/PAGE_LABELS'

const emitPageViewLabel = useEmitPageViewLabel()

onMounted(() => {
  emitPageViewLabel(PAGE_LABELS.CHECKOUT)
})
</script>
