<template>
  <ResetPassword />
</template>

<script setup lang="ts">
import ResetPassword from '#ioc/templates/ResetPassword'
import { onMounted } from 'vue'
import useEmitPageViewResetPassword from '#ioc/bus/emitters/useEmitPageViewResetPassword'

const emitPageViewResetPassword = useEmitPageViewResetPassword()

onMounted(() => {
  emitPageViewResetPassword()
})
</script>
