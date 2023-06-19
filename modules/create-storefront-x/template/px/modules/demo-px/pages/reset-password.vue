<template>
  <ResetPassword />
</template>

<script setup lang="ts">
import ResetPassword from '#ioc/templates/ResetPassword'
import { onMounted } from 'vue'
import useEmitPageViewLabel from '#ioc/bus/emitters/useEmitPageViewLabel'
import PAGE_LABELS from '#ioc/config/PAGE_LABELS'

const emitPageViewLabel = useEmitPageViewLabel()

onMounted(() => {
  emitPageViewLabel(PAGE_LABELS.RESET_PASSWORD)
})
</script>
