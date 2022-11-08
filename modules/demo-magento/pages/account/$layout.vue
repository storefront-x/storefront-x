<template>
  <SfxLayoutOutlet />
</template>

<script setup lang="ts">
import SfxLayoutOutlet from '#ioc/components/SfxLayoutOutlet'
import useCustomerVerification from '#ioc/composables/useCustomerVerification'

const customerVerification = useCustomerVerification()
customerVerification()
</script>
