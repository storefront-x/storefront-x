<template>
  <Wishlist />
</template>

<script setup lang="ts">
import Wishlist from '#ioc/templates/Wishlist'
import { onMounted } from 'vue'
import useEmitPageViewLabel from '#ioc/bus/emitters/useEmitPageViewLabel'
import PAGE_LABELS from '#ioc/config/PAGE_LABELS'

const emitPageViewLabel = useEmitPageViewLabel()

onMounted(() => {
  emitPageViewLabel(PAGE_LABELS.WISHLIST)
})
</script>
