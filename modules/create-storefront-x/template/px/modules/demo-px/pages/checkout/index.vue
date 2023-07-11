<template>
  <Checkout />
</template>

<script setup lang="ts">
import Checkout from '#ioc/templates/Checkout'
import { onMounted } from 'vue'
import useEmitPageViewCheckout from '#ioc/bus/emitters/useEmitPageViewCheckout'

const emitPageViewCheckout = useEmitPageViewCheckout()

onMounted(() => {
  emitPageViewCheckout()
})
</script>
