<template>
  <FormCheckbox
    type="checkbox"
    :name="checkoutAgreement.name"
    :label="checkoutAgreement.checkboxText"
    validators="required"
  />
</template>

<script setup lang="ts">
import FormCheckbox from '#ioc/molecules/FormCheckbox'
import useToCheckoutAgreement from '#ioc/mappers/useToCheckoutAgreement'
import { PropType } from 'vue'

defineProps({
  checkoutAgreement: {
    type: Object as PropType<ReturnType<ReturnType<typeof useToCheckoutAgreement>>>,
    required: true,
  },
})
</script>
