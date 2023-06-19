<template>
  <SignIn />
</template>

<script setup lang="ts">
import SignIn from '#ioc/templates/SignIn'
import { onMounted } from 'vue'
import useEmitPageViewLabel from '#ioc/bus/emitters/useEmitPageViewLabel'
import PAGE_LABELS from '#ioc/config/PAGE_LABELS'

const emitPageViewLabel = useEmitPageViewLabel()

onMounted(() => {
  emitPageViewLabel(PAGE_LABELS.SIGN_IN)
})
</script>
