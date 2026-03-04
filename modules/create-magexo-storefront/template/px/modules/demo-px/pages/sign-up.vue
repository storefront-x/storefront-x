<template>
  <SignUp />
</template>

<script setup lang="ts">
import SignUp from '#ioc/templates/SignUp'
import { onMounted } from 'vue'
import useEmitPageViewSignUp from '#ioc/bus/emitters/useEmitPageViewSignUp'

const emitPageViewSignUp = useEmitPageViewSignUp()

onMounted(() => {
  emitPageViewSignUp()
})
</script>
