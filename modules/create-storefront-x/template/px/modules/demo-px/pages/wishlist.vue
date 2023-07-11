<template>
  <Wishlist />
</template>

<script setup lang="ts">
import Wishlist from '#ioc/templates/Wishlist'
import { onMounted } from 'vue'
import useEmitPageViewWishlist from '#ioc/bus/emitters/useEmitPageViewWishlist'

const emitPageViewWishlist = useEmitPageViewWishlist()

onMounted(() => {
  emitPageViewWishlist()
})
</script>
