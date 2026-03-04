<template>
  <BaseLayout />
</template>

<script setup lang="ts">
import BaseLayout from '#ioc/templates/BaseLayout'
import useCustomerVerification from '#ioc/composables/useCustomerVerification'

useCustomerVerification()
</script>
