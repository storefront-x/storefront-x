<template>
  <img :src="logo" alt="Logo" :class="classes" />
</template>
<script setup lang="ts">
import logo from '#ioc/assets/logo'

defineProps({
  classes: {
    type: String,
    default: '',
  },
})
</script>
