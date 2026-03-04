<template>
  <SignIn />
</template>

<script setup lang="ts">
import SignIn from '#ioc/templates/SignIn'
import { onMounted } from 'vue'
import useEmitPageViewSignIn from '#ioc/bus/emitters/useEmitPageViewSignIn'

const emitPageViewSignIn = useEmitPageViewSignIn()

onMounted(() => {
  emitPageViewSignIn()
})
</script>
