<template>
  <SignUp />
</template>

<script setup lang="ts">
import SignUp from '#ioc/templates/SignUp'
import { onMounted } from 'vue'
import useEmitPageViewLabel from '#ioc/bus/emitters/useEmitPageViewLabel'
import PAGE_LABELS from '#ioc/config/PAGE_LABELS'

const emitPageViewLabel = useEmitPageViewLabel()

onMounted(() => {
  emitPageViewLabel(PAGE_LABELS.SIGN_UP)
})
</script>
